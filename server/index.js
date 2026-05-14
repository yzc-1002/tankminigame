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
const ENERGY_BORN_INTERVAL = 4;
const ENERGY_MAX_COUNT = 6;
const ENERGY_VALUE = 12;
const ENERGY_EGG_MIDGAME_SECONDS = 15;
const ENERGY_EGG_MATURE_TIME = 10;
const ENERGY_EGG_RADIUS = 34;
const ENERGY_EGG_PUSH_MARGIN = 8;
const ENERGY_EGG_MAX_COUNT = 2;
const ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MIN = 1;
const ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MAX = 2;
const ENERGY_EGG_BURST_COUNT = 12;
const ENERGY_EGG_BURST_SCATTER_RADIUS = 136;
const PLAYER_DEFAULT_RADIUS = 38;
const PLAYER_DIR_FALLBACK = { x: 1, y: 0 };
const PLAYER_EXP_BASE = 30;
const PLAYER_EXP_STEP = 15;
const PLAYER_LEVEL_HP_ADD = 5;
const PLAYER_LEVEL_DAMAGE_ADD = 0.5;
const PLAYER_LEVEL_SPEED_ADD = 18;

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
  energies: [],
  nextEnergyId: 1,
  energySpawnCd: 0,
  energySpawnPoints: [],
  mapBounds: {
    halfWidth: 1400,
    halfHeight: 900,
  },
  spawnCandidates: [],
  energyEggs: [],
  nextEnergyEggId: 1,
  elapsedSeconds: 0,
  energyEggMidgamePlan: 0,
  energyEggMidgameSpawned: 0,
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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getPlayerEnergyNeedExp(player) {
  return PLAYER_EXP_BASE + Math.max(0, (player.energyLevel || 1) - 1) * PLAYER_EXP_STEP;
}

function createPlayerState(setup = {}) {
  const tankType = setup.tankType == null ? 1 : setup.tankType;
  const playerLevel = setup.playerLevel == null ? 1 : setup.playerLevel;
  const baseHp = setup.baseHp == null ? 100 : setup.baseHp;
  const baseAtk = setup.baseAtk == null ? 5 : setup.baseAtk;
  const baseSpeed = setup.baseSpeed == null ? 4 : setup.baseSpeed;
  return {
    tankType,
    playerLevel,
    baseHp,
    baseAtk,
    baseSpeed,
    hp: baseHp,
    maxHp: baseHp,
    atk: baseAtk,
    moveSpeedScale: 1,
    energyLevel: 1,
    energyExp: 0,
    energyNeedExp: PLAYER_EXP_BASE,
  };
}

function applyPlayerSetup(player, setup = {}) {
  const state = createPlayerState(setup);
  player.tankType = state.tankType;
  player.playerLevel = state.playerLevel;
  player.baseHp = state.baseHp;
  player.baseAtk = state.baseAtk;
  player.baseSpeed = state.baseSpeed;
  player.hp = state.hp;
  player.maxHp = state.maxHp;
  player.atk = state.atk;
  player.moveSpeedScale = state.moveSpeedScale;
  player.energyLevel = state.energyLevel;
  player.energyExp = state.energyExp;
  player.energyNeedExp = state.energyNeedExp;
}

function resetPlayerRuntimeState(player) {
  const state = createPlayerState({
    tankType: player.tankType,
    playerLevel: player.playerLevel,
    baseHp: player.baseHp,
    baseAtk: player.baseAtk,
    baseSpeed: player.baseSpeed,
  });
  player.hp = state.hp;
  player.maxHp = state.maxHp;
  player.atk = state.atk;
  player.moveSpeedScale = state.moveSpeedScale;
  player.energyLevel = state.energyLevel;
  player.energyExp = state.energyExp;
  player.energyNeedExp = state.energyNeedExp;
}

function sanitizeSpawnPoints(points) {
  if (!Array.isArray(points)) {
    return [];
  }
  const result = [];
  const used = {};
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (!point) {
      continue;
    }
    const x = Number(point.x);
    const y = Number(point.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      continue;
    }
    const key = `${Math.round(x)}_${Math.round(y)}`;
    if (used[key]) {
      continue;
    }
    used[key] = true;
    result.push({
      x,
      y,
    });
    if (result.length >= 512) {
      break;
    }
  }
  return result;
}

function sanitizeMapBounds(bounds) {
  if (!bounds || typeof bounds !== 'object') {
    return null;
  }
  const halfWidth = Number(bounds.halfWidth);
  const halfHeight = Number(bounds.halfHeight);
  if (!Number.isFinite(halfWidth) || !Number.isFinite(halfHeight) || halfWidth <= 0 || halfHeight <= 0) {
    return null;
  }
  return {
    halfWidth,
    halfHeight,
  };
}

function sanitizePlayerSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    return null;
  }
  const x = Number(snapshot.x);
  const y = Number(snapshot.y);
  const dirX = Number(snapshot.dirX);
  const dirY = Number(snapshot.dirY);
  const speed = Number(snapshot.speed);
  const radius = Number(snapshot.radius);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }
  const dirLen = Math.sqrt((Number.isFinite(dirX) ? dirX : 0) ** 2 + (Number.isFinite(dirY) ? dirY : 0) ** 2);
  return {
    x,
    y,
    dirX: dirLen > 0.001 ? dirX / dirLen : PLAYER_DIR_FALLBACK.x,
    dirY: dirLen > 0.001 ? dirY / dirLen : PLAYER_DIR_FALLBACK.y,
    speed: Number.isFinite(speed) ? Math.max(0, speed) : 0,
    radius: Number.isFinite(radius) ? Math.max(16, radius) : PLAYER_DEFAULT_RADIUS,
  };
}

function distanceSqr(a, b) {
  const dx = (a.x || 0) - (b.x || 0);
  const dy = (a.y || 0) - (b.y || 0);
  return dx * dx + dy * dy;
}

function clampPointToBounds(point, padding = 0) {
  const bounds = room.mapBounds || { halfWidth: 1400, halfHeight: 900 };
  return {
    x: clamp(point.x, -bounds.halfWidth + padding, bounds.halfWidth - padding),
    y: clamp(point.y, -bounds.halfHeight + padding, bounds.halfHeight - padding),
  };
}

function getSpawnPositionBySlot(slot) {
  const list = room.spawnCandidates || [];
  if (list.length <= 0) {
    return { x: 0, y: 0 };
  }
  const index = slot == null ? 0 : slot % list.length;
  return list[index] || list[0];
}

function syncPlayerSpawnPosition(player) {
  const pos = getSpawnPositionBySlot(player.spawnSlot);
  player.posX = pos.x;
  player.posY = pos.y;
  player.dirX = PLAYER_DIR_FALLBACK.x;
  player.dirY = PLAYER_DIR_FALLBACK.y;
  player.lastSnapshot = null;
}

function getPlayerRuntimePosition(player) {
  if (!player) {
    return { x: 0, y: 0 };
  }
  if (player.lastSnapshot) {
    return {
      x: player.lastSnapshot.x,
      y: player.lastSnapshot.y,
    };
  }
  return {
    x: Number.isFinite(player.posX) ? player.posX : 0,
    y: Number.isFinite(player.posY) ? player.posY : 0,
  };
}

function getPlayerRuntimeDir(player) {
  if (player && player.lastSnapshot) {
    return {
      x: player.lastSnapshot.dirX,
      y: player.lastSnapshot.dirY,
    };
  }
  return {
    x: Number.isFinite(player && player.dirX) ? player.dirX : PLAYER_DIR_FALLBACK.x,
    y: Number.isFinite(player && player.dirY) ? player.dirY : PLAYER_DIR_FALLBACK.y,
  };
}

function chooseEnergySpawnPoint(minMargin = 520, avoidEggs = true) {
  if (room.energySpawnPoints.length > 0) {
    const available = room.energySpawnPoints.filter((point) => {
      for (let i = 0; i < room.energies.length; i++) {
        const energy = room.energies[i];
        if (energy && Math.sqrt(distanceSqr(energy, point)) < minMargin) {
          return false;
        }
      }
      if (avoidEggs) {
        for (let i = 0; i < room.energyEggs.length; i++) {
          const egg = room.energyEggs[i];
          if (egg && !egg.removed && Math.sqrt(distanceSqr(egg, point)) < minMargin * 0.85) {
            return false;
          }
        }
      }
      return true;
    });
    const source = available.length > 0 ? available : room.energySpawnPoints;
    return source[Math.floor(Math.random() * source.length)] || null;
  }
  return null;
}

function createRandomEnergy() {
  const margin = 520;
  const spawnPoint = chooseEnergySpawnPoint(margin, true);
  return {
    id: room.nextEnergyId++,
    x: spawnPoint ? spawnPoint.x : Math.floor(Math.random() * 2800) - 1400,
    y: spawnPoint ? spawnPoint.y : Math.floor(Math.random() * 1800) - 900,
    value: ENERGY_VALUE,
    radius: 36,
    margin,
  };
}

function spawnEnergy() {
  if (room.energies.length >= ENERGY_MAX_COUNT) {
    return null;
  }
  const energy = createRandomEnergy();
  room.energies.push(energy);
  return energy;
}

function appendFrameCommand(frameCommands, command) {
  if (!frameCommands || !command) {
    return;
  }
  frameCommands.push(command);
}

function buildPlayerStateCommand(player) {
  return {
    type: 'playerState',
    playerId: player.playerId,
    hp: player.hp,
    maxHp: player.maxHp,
    atk: player.atk,
    moveSpeedScale: player.moveSpeedScale,
    energyLevel: player.energyLevel,
    energyExp: player.energyExp,
    energyNeedExp: player.energyNeedExp,
    dead: !!player.dead,
    disconnected: !!player.disconnected,
  };
}

function spawnEnergyInFrame(frameCommands) {
  const energy = spawnEnergy();
  if (energy) {
    appendFrameCommand(frameCommands, {
      type: 'energySpawn',
      energy,
    });
  }
  return energy;
}

function createEnergyAtPosition(x, y, value = ENERGY_VALUE) {
  const point = clampPointToBounds({ x, y }, 42);
  const energy = {
    id: room.nextEnergyId++,
    x: point.x,
    y: point.y,
    value,
    radius: 36,
    margin: 520,
  };
  room.energies.push(energy);
  return energy;
}

function createEnergyEgg(point) {
  if (!point) {
    return null;
  }
  const pos = clampPointToBounds(point, ENERGY_EGG_RADIUS + 8);
  return {
    id: room.nextEnergyEggId++,
    x: pos.x,
    y: pos.y,
    radius: ENERGY_EGG_RADIUS,
    remainTime: ENERGY_EGG_MATURE_TIME,
    mature: false,
    removed: false,
    energyCount: ENERGY_EGG_BURST_COUNT,
    energyScatterRadius: ENERGY_EGG_BURST_SCATTER_RADIUS,
  };
}

function isEggSpawnPointAvailable(point) {
  if (!point) {
    return false;
  }
  for (let i = 0; i < room.energies.length; i++) {
    const energy = room.energies[i];
    if (energy && Math.sqrt(distanceSqr(energy, point)) < 180) {
      return false;
    }
  }
  for (let i = 0; i < room.energyEggs.length; i++) {
    const egg = room.energyEggs[i];
    if (egg && !egg.removed && Math.sqrt(distanceSqr(egg, point)) < 220) {
      return false;
    }
  }
  for (let i = 0; i < room.players.length; i++) {
    const player = room.players[i];
    if (!player || player.dead || player.disconnected) {
      continue;
    }
    const pos = getPlayerRuntimePosition(player);
    if (Math.sqrt(distanceSqr(pos, point)) < 160) {
      return false;
    }
  }
  return true;
}

function chooseEnergyEggSpawnPoint() {
  const candidates = room.energySpawnPoints || [];
  const preferred = [];
  const fallback = [];
  for (let i = 0; i < candidates.length; i++) {
    const point = candidates[i];
    if (!point) {
      continue;
    }
    if (isEggSpawnPointAvailable(point)) {
      preferred.push(point);
    } else {
      fallback.push(point);
    }
  }
  const source = preferred.length > 0 ? preferred : fallback;
  if (source.length > 0) {
    return source[Math.floor(Math.random() * source.length)];
  }
  return clampPointToBounds({
    x: Math.floor(Math.random() * 2800) - 1400,
    y: Math.floor(Math.random() * 1800) - 900,
  }, ENERGY_EGG_RADIUS + 8);
}

function spawnEnergyEggInFrame(frameCommands) {
  const aliveEggCount = room.energyEggs.filter((egg) => egg && !egg.removed).length;
  if (aliveEggCount >= ENERGY_EGG_MAX_COUNT) {
    return null;
  }
  if (room.energyEggMidgameSpawned >= room.energyEggMidgamePlan) {
    return null;
  }
  const egg = createEnergyEgg(chooseEnergyEggSpawnPoint());
  if (!egg) {
    return null;
  }
  room.energyEggs.push(egg);
  room.energyEggMidgameSpawned += 1;
  appendFrameCommand(frameCommands, {
    type: 'energyEggSpawn',
    egg: {
      id: egg.id,
      x: egg.x,
      y: egg.y,
      radius: egg.radius,
      remainTime: egg.remainTime,
      mature: false,
      energyCount: egg.energyCount,
      energyScatterRadius: egg.energyScatterRadius,
    },
  });
  return egg;
}

function isEggBlockedByOtherEgg(currentEgg, nextPos) {
  for (let i = 0; i < room.energyEggs.length; i++) {
    const other = room.energyEggs[i];
    if (!other || other.removed || other.id === currentEgg.id) {
      continue;
    }
    const limit = currentEgg.radius + other.radius + ENERGY_EGG_PUSH_MARGIN;
    if (Math.sqrt(distanceSqr(other, nextPos)) < limit) {
      return true;
    }
  }
  return false;
}

function tryPushEnergyEggByPlayer(egg, player, frameCommands) {
  if (!egg || egg.removed || !player || player.dead || player.disconnected || !player.lastSnapshot) {
    return;
  }
  const snapshot = player.lastSnapshot;
  if (snapshot.speed <= 0.25) {
    return;
  }
  const playerPos = getPlayerRuntimePosition(player);
  const offset = {
    x: egg.x - playerPos.x,
    y: egg.y - playerPos.y,
  };
  const offsetLen = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
  const playerRadius = snapshot.radius || PLAYER_DEFAULT_RADIUS;
  const minDistance = playerRadius * 0.48 + egg.radius + 8;
  if (offsetLen > minDistance) {
    return;
  }

  const playerDir = getPlayerRuntimeDir(player);
  let pushDir = offsetLen > 3
    ? { x: offset.x / offsetLen, y: offset.y / offsetLen }
    : playerDir;
  const dot = pushDir.x * playerDir.x + pushDir.y * playerDir.y;
  if (dot < -0.2) {
    return;
  }

  const pushDistance = Math.max(1.6, snapshot.speed * (egg.mature ? 0.42 : 0.62));
  const nextPos = clampPointToBounds({
    x: egg.x + pushDir.x * pushDistance,
    y: egg.y + pushDir.y * pushDistance,
  }, egg.radius + 8);
  if (isEggBlockedByOtherEgg(egg, nextPos)) {
    return;
  }
  if (Math.abs(nextPos.x - egg.x) < 0.01 && Math.abs(nextPos.y - egg.y) < 0.01) {
    return;
  }

  egg.x = nextPos.x;
  egg.y = nextPos.y;
  appendFrameCommand(frameCommands, {
    type: 'energyEggMove',
    eggId: egg.id,
    x: egg.x,
    y: egg.y,
  });
}

function updateEnergyEggPushes(frameCommands) {
  for (let i = 0; i < room.energyEggs.length; i++) {
    const egg = room.energyEggs[i];
    if (!egg || egg.removed) {
      continue;
    }
    for (let j = 0; j < room.players.length; j++) {
      tryPushEnergyEggByPlayer(egg, room.players[j], frameCommands);
    }
  }
}

function burstEnergyEggInFrame(egg, frameCommands) {
  if (!egg || egg.removed || egg.mature) {
    return;
  }
  egg.mature = true;
  const origin = { x: egg.x, y: egg.y };
  const energies = [];
  for (let i = 0; i < egg.energyCount; i++) {
    const angle = Math.PI * 2 * i / egg.energyCount + Math.random() * 0.42;
    const distance = 40 + Math.random() * egg.energyScatterRadius;
    const point = clampPointToBounds({
      x: origin.x + Math.cos(angle) * distance,
      y: origin.y + Math.sin(angle) * distance,
    }, 42);
    energies.push(createEnergyAtPosition(point.x, point.y, ENERGY_VALUE));
  }
  appendFrameCommand(frameCommands, {
    type: 'energyEggMature',
    eggId: egg.id,
    x: origin.x,
    y: origin.y,
    radius: egg.radius,
    energyCount: egg.energyCount,
    energyScatterRadius: egg.energyScatterRadius,
    energies,
  });
  egg.removed = true;
  appendFrameCommand(frameCommands, {
    type: 'energyEggRemove',
    eggId: egg.id,
  });
}

function updateEnergyEggs(frameCommands) {
  room.elapsedSeconds += TICK_INTERVAL / 1000;
  if (room.elapsedSeconds >= ENERGY_EGG_MIDGAME_SECONDS && room.energyEggMidgameSpawned < room.energyEggMidgamePlan) {
    spawnEnergyEggInFrame(frameCommands);
  }

  updateEnergyEggPushes(frameCommands);

  for (let i = 0; i < room.energyEggs.length; i++) {
    const egg = room.energyEggs[i];
    if (!egg || egg.removed) {
      continue;
    }
    egg.remainTime -= TICK_INTERVAL / 1000;
    if (egg.remainTime <= 0) {
      egg.remainTime = 0;
      burstEnergyEggInFrame(egg, frameCommands);
    }
  }

  room.energyEggs = room.energyEggs.filter((egg) => egg && !egg.removed);
}

function removeEnergyById(energyId) {
  const index = room.energies.findIndex((item) => item && item.id === energyId);
  if (index < 0) {
    return null;
  }
  const energy = room.energies[index];
  room.energies.splice(index, 1);
  return energy;
}

function removeEnergyInFrame(energyId, frameCommands) {
  const energy = removeEnergyById(energyId);
  return energy;
}

function pickRandomUpgrade(player) {
  const choices = [
    {
      id: 'hp',
      amount: PLAYER_LEVEL_HP_ADD,
    },
    {
      id: 'atk',
      amount: PLAYER_LEVEL_DAMAGE_ADD,
    },
    {
      id: 'speed',
      amount: PLAYER_LEVEL_SPEED_ADD,
    },
  ];
  const choice = choices[Math.floor(Math.random() * choices.length)];
  if (choice.id === 'hp') {
    player.maxHp += choice.amount;
    player.hp = player.maxHp;
  } else if (choice.id === 'atk') {
    player.atk += choice.amount;
  } else if (choice.id === 'speed') {
    player.moveSpeedScale += choice.amount / 100;
  }
  return choice;
}

function addPlayerEnergy(player, value) {
  if (!player || value <= 0) {
    return null;
  }

  let remain = value;
  const upgrades = [];
  const recoverHp = Math.max(0, player.maxHp - player.hp);
  if (recoverHp > 0) {
    const addHp = Math.min(recoverHp, remain);
    player.hp += addHp;
    remain -= addHp;
  }

  if (remain > 0) {
    player.energyExp += remain;
    while (player.energyExp >= player.energyNeedExp) {
      player.energyExp -= player.energyNeedExp;
      player.energyLevel += 1;
      const upgrade = pickRandomUpgrade(player);
      upgrades.push({
        playerId: player.playerId,
        type: upgrade.id,
        amount: upgrade.amount,
        energyLevel: player.energyLevel,
      });
      player.energyNeedExp = getPlayerEnergyNeedExp(player);
    }
  }

  return upgrades;
}

function tryConsumeEnergy(player, energyId, frameCommands) {
  if (!player || player.dead || player.disconnected || energyId == null) {
    return false;
  }
  const energy = removeEnergyInFrame(energyId, frameCommands);
  if (!energy) {
    return false;
  }
  appendFrameCommand(frameCommands, {
    type: 'energyConsume',
    playerId: player.playerId,
    energyId,
    value: energy.value,
  });
  const upgrades = addPlayerEnergy(player, energy.value) || [];
  if (upgrades.length > 0) {
    upgrades.forEach((upgrade) => {
      appendFrameCommand(frameCommands, {
        type: 'playerUpgrade',
        ...upgrade,
      });
    });
  }
  return true;
}

function updateEnergySpawns(frameCommands) {
  room.energySpawnCd += TICK_INTERVAL / 1000;
  if (room.energySpawnCd < ENERGY_BORN_INTERVAL) {
    return;
  }
  room.energySpawnCd = 0;
  spawnEnergyInFrame(frameCommands);
}

function initMatchEnergyEggPlan() {
  room.energyEggMidgamePlan = ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MIN;
  if (ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MAX > ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MIN) {
    room.energyEggMidgamePlan += Math.floor(Math.random() * (ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MAX - ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MIN + 1));
  }
  room.energyEggMidgamePlan = clamp(room.energyEggMidgamePlan, ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MIN, ENERGY_EGG_MIDGAME_SPAWN_TOTAL_MAX);
  room.energyEggMidgameSpawned = 0;
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
  const frameCommands = [];
  const playerInputCommands = [];
  const eventCommands = [];
  const stateCommands = [];
  updateEnergySpawns(frameCommands);

  room.players.forEach((p) => {
    let inputs = {
      up: false,
      down: false,
      left: false,
      right: false,
      fire: false,
      hit: false,
    };

    if (p.dead || p.disconnected) {
      p.pendingInputs.length = 0;
      p.lastInputs = {
        up: false,
        down: false,
        left: false,
        right: false,
      };
      appendFrameCommand(playerInputCommands, {
        type: 'playerInput',
        playerId: p.playerId,
        inputs,
      });
      appendFrameCommand(stateCommands, buildPlayerStateCommand(p));
      return;
    }

    inputs.up = !!(p.lastInputs && p.lastInputs.up);
    inputs.down = !!(p.lastInputs && p.lastInputs.down);
    inputs.left = !!(p.lastInputs && p.lastInputs.left);
    inputs.right = !!(p.lastInputs && p.lastInputs.right);

    for (let i = 0; i < p.pendingInputs.length; i++) {
      const entry = p.pendingInputs[i];
      if (!entry || !entry.inputs) {
        continue;
      }

      const src = entry.inputs;
      inputs.up = !!src.up;
      inputs.down = !!src.down;
      inputs.left = !!src.left;
      inputs.right = !!src.right;
      if (src.fire && src.fire.id) {
        inputs.fire = src.fire;
        room.bullets[src.fire.id] = {
          id: src.fire.id,
          playerId: p.playerId,
          damage: p.atk == null ? 5 : p.atk,
        };
      }

      if (src.hit) {
        inputs.hit = src.hit;
      }

      if (src.pickupEnergyId != null) {
        tryConsumeEnergy(p, src.pickupEnergyId, eventCommands);
      }
      if (src.playerSnapshot) {
        p.lastSnapshot = sanitizePlayerSnapshot(src.playerSnapshot);
        if (p.lastSnapshot) {
          p.posX = p.lastSnapshot.x;
          p.posY = p.lastSnapshot.y;
          p.dirX = p.lastSnapshot.dirX;
          p.dirY = p.lastSnapshot.dirY;
        }
      }

      if (src.hit && src.hit.id) {
        const bullet = room.bullets[src.hit.id];
        const targetPlayer = room.players[src.hit.tgid];
        if (!bullet || !targetPlayer || targetPlayer.dead) {
          continue;
        }
        targetPlayer.hp -= bullet.damage;
        if (targetPlayer.hp < 0) {
          targetPlayer.hp = 0;
        }
        const hitCommand = {
          type: 'playerHit',
          id: src.hit.id,
          tgid: src.hit.tgid,
          damage: bullet.damage,
          hp: targetPlayer.hp,
        };
        if (targetPlayer.hp <= 0) {
          targetPlayer.dead = true;
        }
        delete room.bullets[src.hit.id];
        appendFrameCommand(eventCommands, hitCommand);
      }
    }

    p.lastInputs = {
      up: inputs.up,
      down: inputs.down,
      left: inputs.left,
      right: inputs.right,
    };
    p.pendingInputs.length = 0;
    appendFrameCommand(playerInputCommands, {
      type: 'playerInput',
      playerId: p.playerId,
      inputs,
    });
    appendFrameCommand(stateCommands, buildPlayerStateCommand(p));
  });

  updateEnergyEggs(frameCommands);

  broadcast({
    type: 'frame',
    frame,
    commands: frameCommands.concat(playerInputCommands, eventCommands, stateCommands),
  });
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
  room.energies = [];
  room.nextEnergyId = 1;
  room.energySpawnCd = 0;
  room.energyEggs = [];
  room.nextEnergyEggId = 1;
  room.elapsedSeconds = 0;
  initMatchEnergyEggPlan();

  room.players.forEach((p, index) => {
    p.pendingInputs = [];
    p.lastInputs = { up: false, down: false, left: false, right: false };
    p.disconnected = false;
    p.dead = false;
    resetPlayerRuntimeState(p);
    p.spawnSlot = room.spawnSlots[index];
    syncPlayerSpawnPosition(p);
  });

  for (let i = 0; i < Math.min(ENERGY_MAX_COUNT, 3); i++) {
    spawnEnergy();
  }

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
      energies: room.energies,
      players: room.players.map((player) => ({
        playerId: player.playerId,
        tankType: player.tankType,
        playerLevel: player.playerLevel,
        hp: player.hp,
        maxHp: player.maxHp,
        atk: player.atk,
        moveSpeedScale: player.moveSpeedScale,
        energyLevel: player.energyLevel,
        energyExp: player.energyExp,
        energyNeedExp: player.energyNeedExp,
        dead: !!player.dead,
      })),
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
  applyPlayerSetup(ws);
  ws.spawnSlot = -1;
  ws.posX = 0;
  ws.posY = 0;
  ws.dirX = PLAYER_DIR_FALLBACK.x;
  ws.dirY = PLAYER_DIR_FALLBACK.y;
  ws.lastSnapshot = null;

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
    case 'playerSetup': {
      applyPlayerSetup(ws, msg.payload || {});
      if (Array.isArray(msg.payload && msg.payload.energySpawnPoints) && msg.payload.energySpawnPoints.length > 0) {
        room.energySpawnPoints = sanitizeSpawnPoints(msg.payload.energySpawnPoints);
      }
      if (Array.isArray(msg.payload && msg.payload.spawnCandidates) && msg.payload.spawnCandidates.length > 0) {
        room.spawnCandidates = sanitizeSpawnPoints(msg.payload.spawnCandidates);
      }
      const bounds = sanitizeMapBounds(msg.payload && msg.payload.mapBounds);
      if (bounds) {
        room.mapBounds = bounds;
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
  room.energies = [];
  room.nextEnergyId = 1;
  room.energySpawnCd = 0;
  room.energySpawnPoints = [];
  room.spawnCandidates = [];
  room.mapBounds = {
    halfWidth: 1400,
    halfHeight: 900,
  };
  room.energyEggs = [];
  room.nextEnergyEggId = 1;
  room.elapsedSeconds = 0;
  room.energyEggMidgamePlan = 0;
  room.energyEggMidgameSpawned = 0;
  console.log('[Room] Reset');
}

server.listen(PORT, () => {
  console.log('MiniTank Frame Sync Server v3');
  console.log(`Port: ${PORT}`);
  console.log(`Tick rate: ${TICK_RATE}Hz (${TICK_INTERVAL}ms)`);
  console.log(`Players: ${MIN_PLAYERS}-${MAX_PLAYERS}`);
  console.log(`Start delay: ${START_DELAY}s`);
});
