const WebSocket = require('ws');
const http = require('http');

const PORT = 2567;
const TICK_RATE = 20;
const TICK_INTERVAL = 1000 / TICK_RATE;
const MAX_PLAYERS = 4;
const START_DELAY = 3;
const MAX_PENDING_INPUTS = 10;

// ---------- Room (single room) ----------
const room = {
  id: 'room1',
  players: [],
  currentFrame: 0,
  tickTimer: null,
  gameStarted: false,
  startCountdown: null,
  bullets:{},
};

function broadcast(json) {
  const data = JSON.stringify(json);
  room.players.forEach(p => {
    if (p.readyState === WebSocket.OPEN) p.send(data);
  });
}

// ---------- Tick ----------
function tick() {
  const frame = ++room.currentFrame;

  // Collect latest input per player; use default (all false) if none new
  // const NEUTRAL = { up: false, down: false, left: false, right: false, fire: {id:-1, type:1}, hit: {id: -1, tgid: 0, hp: -1, damage: -1} };
  const NEUTRAL = { up: false, down: false, left: false, right: false, fire: false, hit: false };
  room.players.forEach(p => {
    for (let i = 0; i < p.pendingInputs.length; i++) {
      const entry = p.pendingInputs[i];
      if (entry && entry.inputs) {
        let inputs = entry.inputs;
        console.log("inputs", inputs);
        if (!p.dead && inputs.fire){
          console.log("hit", inputs.hit);
          room.bullets[inputs.fire.id] = {
            id: inputs.fire.id,
            playerId: p.playerId,
            damage: 5, //todo
          };
        }
        if (!p.dead && inputs.hit){
          console.log("hit", inputs.hit);
          if (room.bullets[inputs.hit.id] && room.players[inputs.hit.tgid]){
            const tg_p = room.players[inputs.hit.tgid]
            tg_p.hp -= room.bullets[inputs.hit.id].damage;
            inputs.hit.damage = room.bullets[inputs.hit.id].damage;
            inputs.hit.hp = tg_p.hp;
            if (tg_p.hp <= 0){
              tg_p.hp = 0;
              inputs.hit.hp = 0;
              tg_p.dead = true;
            }
          }
        }
      }
    }
  });
  // const frameInputs = room.players.map(p => {
  //   let inputs = Object.assign({}, NEUTRAL);
  //   while (p.pendingInputs.length > 0) {
  //     const entry = p.pendingInputs.shift();
  //     if (entry && entry.inputs) {
  //       inputs = entry.inputs;
  //     }
  //   }
  //   return {
  //     playerId: p.playerId,
  //     inputs: inputs,
  //     dead: p.dead,
  //     disconnected: p.disconnected || false,
  //   };
  // });
  const frameInputs = room.players.map(p => {
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
      if (!entry || !entry.inputs) continue;
  
      const src = entry.inputs;
  
      // 持续态：移动方向要覆盖并记住
      inputs.up = !!src.up;
      inputs.down = !!src.down;
      inputs.left = !!src.left;
      inputs.right = !!src.right;
  
      // 瞬时态：只在这一帧生效，不能记住
      if (src.fire) inputs.fire = src.fire;
      if (src.hit) inputs.hit = src.hit;
    }
  
    // 只记住移动状态，千万不要把 fire/hit 记进去
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
      disconnected: p.disconnected || false,
    };
  });
  // console.log("frameInputs", frameInputs);
  broadcast({ type: 'frame', frame, inputs: frameInputs });
}

// ---------- Start game countdown ----------
function startGameCountdown() {
  if (room.gameStarted) return;
  room.gameStarted = true;
  room.currentFrame = 0;

  // Assign player IDs
  room.players.forEach((p, i) => {
    p.playerId = i;
  });

  // Countdown
  let countdown = START_DELAY;
  broadcast({ type: 'countdown', seconds: countdown });
  console.log(`[Room] Game starting in ${countdown}s`);

  room.startCountdown = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      broadcast({ type: 'countdown', seconds: countdown });
      console.log(`[Room] ${countdown}...`);
    } else {
      clearInterval(room.startCountdown);
      room.startCountdown = null;
      // Send gameStart
      room.players.forEach(p => {
        p.pendingInputs = [];
        p.lastInputs = { up: false, down: false, left: false, right: false, fire: false };
        p.disconnected = false;
        if (p.readyState === WebSocket.OPEN) {
          p.send(JSON.stringify({
            type: 'gameStart',
            playerId: p.playerId,
            roomId: room.id,
            tickRate: TICK_RATE,
            playerCount: room.players.length,
          }));
        }
      });
      console.log(`[Room] Game started with ${room.players.length} players`);
      // Start tick loop
      room.tickTimer = setInterval(tick, TICK_INTERVAL);
    }
  }, 1000);
}

// ---------- WebSocket ----------
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('MiniTank Frame Sync Server v2');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log(`[Server] New connection (total: ${room.players.length + 1})`);

  ws.pendingInputs = [];
  ws.lastInputs = { up: false, down: false, left: false, right: false, fire: false };
  ws.disconnected = false;
  ws.playerId = -1;
  ws.hp = 100; // 初始血量
  ws.maxHp = 100;
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
    // Keep the player in the list, mark as disconnected
    // If all players disconnected, reset room
    const anyAlive = room.players.some(p => !p.disconnected && p.readyState === WebSocket.OPEN);
    if (!anyAlive) {
      resetRoom();
    }
  });

  // Handle join
  if (room.gameStarted) {
    ws.send(JSON.stringify({ type: 'error', message: 'Game already in progress' }));
    ws.close();
    return;
  }

  if (room.players.length >= MAX_PLAYERS) {
    ws.send(JSON.stringify({ type: 'error', message: 'Room full' }));
    ws.close();
    return;
  }

  ws.playerId = room.players.length;
  room.players.push(ws);

  ws.send(JSON.stringify({
    type: 'joined',
    roomId: room.id,
    playerId: ws.playerId,
    playerCount: room.players.length,
    maxPlayers: MAX_PLAYERS,
  }));

  broadcast({
    type: 'playerCount',
    count: room.players.length,
    max: MAX_PLAYERS,
  });

  console.log(`[Room] Player ${ws.playerId} joined (${room.players.length}/${MAX_PLAYERS})`);

  // Auto-start at 2 players
  if (room.players.length >= 2 && !room.gameStarted) {
    startGameCountdown();
  }
});

function handleMessage(ws, msg) {
  switch (msg.type) {
    case 'input': {
      ws.pendingInputs.push({
        frame: msg.frame || 0,
        inputs: msg.inputs || {},
      });
      // Prevent unbounded growth
      while (ws.pendingInputs.length > MAX_PENDING_INPUTS) {
        ws.pendingInputs.shift();
      }
      break;
    }
    case 'ping': {
      ws.send(JSON.stringify({ type: 'pong' }));
      break;
    }
  }
}

function resetRoom() {
  if (room.tickTimer) {
    clearInterval(room.tickTimer);
    room.tickTimer = null;
  }
  if (room.startCountdown) {
    clearInterval(room.startCountdown);
    room.startCountdown = null;
  }
  room.players = [];
  room.gameStarted = false;
  room.currentFrame = 0;
  console.log('[Room] Reset');
}

server.listen(PORT, () => {
  console.log(`MiniTank Frame Sync Server v2`);
  console.log(`Port: ${PORT}`);
  console.log(`Tick rate: ${TICK_RATE}Hz (${TICK_INTERVAL}ms)`);
  console.log(`Max players: ${MAX_PLAYERS}`);
  console.log(`Start delay: ${START_DELAY}s`);
});
