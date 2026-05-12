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
  const NEUTRAL = { up: false, down: false, left: false, right: false, fire: false };
  const frameInputs = room.players.map(p => {
    let inputs = Object.assign({}, NEUTRAL);
    while (p.pendingInputs.length > 0) {
      const entry = p.pendingInputs.shift();
      if (entry && entry.inputs) inputs = entry.inputs;
    }
    return {
      playerId: p.playerId,
      inputs: inputs,
      disconnected: p.disconnected || false,
    };
  });

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
