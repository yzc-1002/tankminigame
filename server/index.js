const WebSocket = require('ws');
const http = require('http');

const PORT = 2567;
const TICK_RATE = 20;
const TICK_INTERVAL = 1000 / TICK_RATE;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
const START_DELAY = 3;
const MAX_PENDING_INPUTS = 10;
const SPAWN_SLOT_COUNT = 8;

const ROOM_STATE = {
  WAITING: 'waiting',
  COUNTDOWN: 'countdown',
  RUNNING: 'running',
  ENDED: 'ended',
};

// ---------- Room (single room) ----------
const room = {
  id: 'room1',
  state: ROOM_STATE.WAITING,
  players: [],
  currentFrame: 0,
  tickTimer: null,
  startCountdown: null,
  countdownRemaining: 0,
  bullets: {},
  winnerPlayerId: -1,
  spawnSlots: [],
};

function isSocketOpen(ws) {
  return ws && ws.readyState === WebSocket.OPEN;
}

function getConnectedPlayers() {
  return room.players.filter((p) => !p.disconnected && isSocketOpen(p));
}

function getAlivePlayers() {
  return room.players.filter((p) => !p.dead && !p.disconnected && isSocketOpen(p));
}

function getRoomStatePayload(extra = {}) {
  return {
    type: 'roomState',
    roomId: room.id,
    state: room.state,
    playerCount: getConnectedPlayers().length,
    minPlayers: MIN_PLAYERS,
    maxPlayers: MAX_PLAYERS,
    countdown: room.countdownRemaining,
    currentFrame: room.currentFrame,
    winnerPlayerId: room.winnerPlayerId,
    ...extra,
  };
}

function broadcast(json) {
  const data = JSON.stringify(json);
  room.players.forEach((p) => {
    if (isSocketOpen(p)) {
      p.send(data);
    }
  });
}

function broadcastRoomState(extra = {}) {
  const payload = getRoomStatePayload(extra);
  broadcast(payload);
  if (room.state === ROOM_STATE.WAITING || room.state === ROOM_STATE.COUNTDOWN) {
    broadcast({
      type: 'playerCount',
      count: payload.playerCount,
      max: MAX_PLAYERS,
      min: MIN_PLAYERS,
    });
  }
  if (room.state === ROOM_STATE.COUNTDOWN) {
    broadcast({
      type: 'countdown',
      seconds: room.countdownRemaining,
    });
  }
}

function syncLobbyPlayerIds() {
  room.players.forEach((p, index) => {
    p.playerId = index;
  });
}

function shuffle(array) {
  const list = array.slice();
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
}

function assignSpawnSlots(playerCount) {
  const slots = [];
  for (let i = 0; i < SPAWN_SLOT_COUNT; i++) {
    slots.push(i);
  }
  return shuffle(slots).slice(0, playerCount);
}

function stopTickLoop() {
  if (room.tickTimer) {
    clearInterval(room.tickTimer);
    room.tickTimer = null;
  }
}

function stopCountdown() {
  if (room.startCountdown) {
    clearInterval(room.startCountdown);
    room.startCountdown = null;
  }
  room.countdownRemaining = 0;
}

function maybeResetRoomWhenEmpty() {
  if (getConnectedPlayers().length === 0) {
    resetRoom();
  }
}

function cancelCountdown() {
  if (room.state !== ROOM_STATE.COUNTDOWN) {
    return;
  }
  stopCountdown();
  room.state = ROOM_STATE.WAITING;
  room.winnerPlayerId = -1;
  console.log('[Room] Countdown cancelled, back to waiting');
  broadcastRoomState();
}

function maybeStartCountdown() {
  if (room.state !== ROOM_STATE.WAITING) {
    return;
  }
  if (getConnectedPlayers().length < MIN_PLAYERS) {
    return;
  }
  startGameCountdown();
}

// ---------- Tick ----------
function tick() {
  if (room.state !== ROOM_STATE.RUNNING) {
    return;
  }

  const frame = ++room.currentFrame;

  room.players.forEach((p) => {
    if (p.dead || p.disconnected) {
      p.pendingInputs.length = 0;
      return;
    }
    for (let i = 0; i < p.pendingInputs.length; i++) {
      const entry = p.pendingInputs[i];
      if (!entry || !entry.inputs) {
        continue;
      }

      const inputs = entry.inputs;
      if (inputs.fire && inputs.fire.id) {
        room.bullets[inputs.fire.id] = {
          id: inputs.fire.id,
          playerId: p.playerId,
          damage: 5,
        };
      }

      if (inputs.hit && inputs.hit.id) {
        const bullet = room.bullets[inputs.hit.id];
        const targetPlayer = room.players[inputs.hit.tgid];
        if (!bullet || !targetPlayer || targetPlayer.dead) {
          continue;
        }
        targetPlayer.hp -= bullet.damage;
        if (targetPlayer.hp < 0) {
          targetPlayer.hp = 0;
        }
        inputs.hit.damage = bullet.damage;
        inputs.hit.hp = targetPlayer.hp;
        if (targetPlayer.hp <= 0) {
          targetPlayer.dead = true;
        }
        delete room.bullets[inputs.hit.id];
      }
    }
  });

  const frameInputs = room.players.map((p) => {
    let inputs = {
      up: !!(p.lastInputs && p.lastInputs.up),
      down: !!(p.lastInputs && p.lastInputs.down),
      left: !!(p.lastInputs && p.lastInputs.left),
      right: !!(p.lastInputs && p.lastInputs.right),
      fire: false,
      hit: false,
    };

    while (p.pendingInputs.length > 0) {
      const entry = p.pendingInputs.shift();
      if (!entry || !entry.inputs) {
        continue;
      }

      const src = entry.inputs;
      inputs.up = !!src.up;
      inputs.down = !!src.down;
      inputs.left = !!src.left;
      inputs.right = !!src.right;
      if (src.fire) {
        inputs.fire = src.fire;
      }
      if (src.hit) {
        inputs.hit = src.hit;
      }
    }

    p.lastInputs = {
      up: inputs.up,
      down: inputs.down,
      left: inputs.left,
      right: inputs.right,
    };

    return {
      playerId: p.playerId,
      inputs,
      hp: p.hp,
      maxHp: p.maxHp,
      dead: p.dead,
      disconnected: !!p.disconnected,
    };
  });

  broadcast({ type: 'frame', frame, inputs: frameInputs });
  evaluateMatchEnd();
}

function evaluateMatchEnd() {
  if (room.state !== ROOM_STATE.RUNNING) {
    return;
  }

  const alivePlayers = getAlivePlayers();
  if (alivePlayers.length > 1) {
    return;
  }

  const winnerPlayerId = alivePlayers.length === 1 ? alivePlayers[0].playerId : -1;
  endMatch(winnerPlayerId);
}

function endMatch(winnerPlayerId) {
  if (room.state !== ROOM_STATE.RUNNING) {
    return;
  }

  stopTickLoop();
  room.state = ROOM_STATE.ENDED;
  room.winnerPlayerId = winnerPlayerId;

  const payload = {
    type: 'gameEnded',
    roomId: room.id,
    winnerPlayerId,
    players: room.players.map((p) => ({
      playerId: p.playerId,
      hp: p.hp,
      maxHp: p.maxHp,
      dead: p.dead,
      disconnected: !!p.disconnected,
      spawnSlot: p.spawnSlot,
    })),
  };

  broadcastRoomState();
  broadcast(payload);
  console.log(`[Room] Game ended. winner=${winnerPlayerId}`);
}

// ---------- Start game countdown ----------
function startGameCountdown() {
  if (room.state !== ROOM_STATE.WAITING) {
    return;
  }

  syncLobbyPlayerIds();
  room.state = ROOM_STATE.COUNTDOWN;
  room.currentFrame = 0;
  room.winnerPlayerId = -1;
  room.countdownRemaining = START_DELAY;
  broadcastRoomState();
  console.log(`[Room] Game starting in ${room.countdownRemaining}s`);

  room.startCountdown = setInterval(() => {
    if (getConnectedPlayers().length < MIN_PLAYERS) {
      cancelCountdown();
      return;
    }

    room.countdownRemaining--;
    if (room.countdownRemaining > 0) {
      broadcastRoomState();
      console.log(`[Room] ${room.countdownRemaining}...`);
      return;
    }

    stopCountdown();
    startGame();
  }, 1000);
}

function startGame() {
  syncLobbyPlayerIds();
  room.currentFrame = 0;
  room.state = ROOM_STATE.RUNNING;
  room.bullets = {};
  room.winnerPlayerId = -1;
  room.spawnSlots = assignSpawnSlots(room.players.length);

  room.players.forEach((p, index) => {
    p.pendingInputs = [];
    p.lastInputs = { up: false, down: false, left: false, right: false };
    p.disconnected = false;
    p.dead = false;
    p.hp = 100;
    p.maxHp = 100;
    p.spawnSlot = room.spawnSlots[index];
  });

  broadcastRoomState({ spawnSlots: room.spawnSlots });
  room.players.forEach((p) => {
    if (!isSocketOpen(p)) {
      return;
    }
    p.send(JSON.stringify({
      type: 'gameStart',
      playerId: p.playerId,
      roomId: room.id,
      tickRate: TICK_RATE,
      playerCount: room.players.length,
      spawnSlots: room.spawnSlots,
    }));
  });

  console.log(`[Room] Game started with ${room.players.length} players`);
  room.tickTimer = setInterval(tick, TICK_INTERVAL);
}

function removeWaitingPlayer(ws) {
  room.players = room.players.filter((p) => p !== ws);
  syncLobbyPlayerIds();
  broadcastRoomState();
  if (getConnectedPlayers().length < MIN_PLAYERS) {
    cancelCountdown();
  }
}

// ---------- WebSocket ----------
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('MiniTank Frame Sync Server v3');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log(`[Server] New connection (current state: ${room.state})`);

  ws.pendingInputs = [];
  ws.lastInputs = { up: false, down: false, left: false, right: false };
  ws.disconnected = false;
  ws.dead = false;
  ws.playerId = -1;
  ws.hp = 100;
  ws.maxHp = 100;
  ws.spawnSlot = -1;

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      handleMessage(ws, msg);
    } catch (e) {
      console.warn('[Server] Invalid message:', e.message);
    }
  });

  ws.on('close', () => {
    console.log(`[Server] Player ${ws.playerId} disconnected`);
    ws.disconnected = true;

    if (room.state === ROOM_STATE.WAITING || room.state === ROOM_STATE.COUNTDOWN) {
      removeWaitingPlayer(ws);
      maybeResetRoomWhenEmpty();
      return;
    }

    if (room.state === ROOM_STATE.RUNNING) {
      ws.dead = true;
      evaluateMatchEnd();
    }

    maybeResetRoomWhenEmpty();
  });

  if (room.state === ROOM_STATE.RUNNING || room.state === ROOM_STATE.ENDED) {
    ws.send(JSON.stringify({ type: 'error', message: 'Room is not joinable right now' }));
    ws.close();
    return;
  }

  if (room.players.length >= MAX_PLAYERS) {
    ws.send(JSON.stringify({ type: 'error', message: 'Room full' }));
    ws.close();
    return;
  }

  room.players.push(ws);
  syncLobbyPlayerIds();

  ws.send(JSON.stringify({
    type: 'joined',
    roomId: room.id,
    playerId: ws.playerId,
    playerCount: getConnectedPlayers().length,
    minPlayers: MIN_PLAYERS,
    maxPlayers: MAX_PLAYERS,
    state: room.state,
  }));

  console.log(`[Room] Player ${ws.playerId} joined (${getConnectedPlayers().length}/${MAX_PLAYERS})`);
  broadcastRoomState();
  maybeStartCountdown();
});

function handleMessage(ws, msg) {
  switch (msg.type) {
    case 'input': {
      if (room.state !== ROOM_STATE.RUNNING || ws.dead || ws.disconnected) {
        return;
      }
      ws.pendingInputs.push({
        frame: msg.frame || 0,
        inputs: msg.inputs || {},
      });
      while (ws.pendingInputs.length > MAX_PENDING_INPUTS) {
        ws.pendingInputs.shift();
      }
      break;
    }
    case 'ping': {
      if (isSocketOpen(ws)) {
        ws.send(JSON.stringify({ type: 'pong' }));
      }
      break;
    }
  }
}

function resetRoom() {
  stopTickLoop();
  stopCountdown();
  room.players = [];
  room.state = ROOM_STATE.WAITING;
  room.currentFrame = 0;
  room.bullets = {};
  room.winnerPlayerId = -1;
  room.spawnSlots = [];
  console.log('[Room] Reset');
}

server.listen(PORT, () => {
  console.log('MiniTank Frame Sync Server v3');
  console.log(`Port: ${PORT}`);
  console.log(`Tick rate: ${TICK_RATE}Hz (${TICK_INTERVAL}ms)`);
  console.log(`Players: ${MIN_PLAYERS}-${MAX_PLAYERS}`);
  console.log(`Start delay: ${START_DELAY}s`);
});
