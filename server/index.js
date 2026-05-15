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
const MULTIPLAYER_DEFAULT_TANK_TYPE = 1;
const MULTIPLAYER_FIXED_PLAYER_LEVEL = 1;
const MULTIPLAYER_FIXED_BASE_HP = 20;
const MULTIPLAYER_FIXED_BASE_ATK = 6;
const MULTIPLAYER_FIXED_BASE_SPEED = 5;
const MULTIPLAYER_FIXED_ATTACK_RADIUS = 400;
const PLAYER_EXP_BASE = 30;
const PLAYER_EXP_STEP = 15;
const PLAYER_LEVEL_HP_ADD = 5;
const PLAYER_LEVEL_DAMAGE_ADD = 0.5;
const PLAYER_LEVEL_SPEED_ADD = 18;
const SPECIAL_EVENT_START_DELAY = 8;
const SPECIAL_EVENT_RESPAWN_MIN = 12;
const SPECIAL_EVENT_RESPAWN_MAX = 20;
const SPECIAL_EVENT_DURATION = 14;
const SPECIAL_EVENT_MIN_PLAYER_DISTANCE = 180;
const SPECIAL_EVENT_MIN_ENERGY_DISTANCE = 170;
const SPECIAL_EVENT_MIN_EGG_DISTANCE = 220;
const SPECIAL_EVENT_PORTAL_RADIUS = 44;
const SPECIAL_EVENT_PORTAL_PAIR_MIN = 360;
const SPECIAL_EVENT_PORTAL_PAIR_MAX = 780;
const SPECIAL_EVENT_DAMAGE_RADIUS = 60;
const SPECIAL_EVENT_SPEED_RADIUS = 60;
const SPECIAL_EVENT_BLACK_HOLE_RADIUS = 100;
const SPECIAL_EVENT_BLACK_HOLE_DESTROY_RADIUS = 14;
const TAR_PICKUP_MAX_COUNT = 1;
const TAR_PICKUP_START_DELAY = 1;
const TAR_PICKUP_RESPAWN_MIN = 10;
const TAR_PICKUP_RESPAWN_MAX = 16;
const TAR_PICKUP_RADIUS = 42;
const TAR_PICKUP_TOUCH_RADIUS = 92;
const TAR_SPILL_DURATION = 10;
const TAR_SPILL_RADIUS = 120;
const TAR_SPILL_SLOW_FACTOR = 0.52;
const SAFE_ZONE_START_DELAY = 60;
const SAFE_ZONE_SHRINK_DURATION = 45;
const SAFE_ZONE_START_PADDING = 80;
const SAFE_ZONE_FINAL_RADIUS_RATIO = 0.42;
const SAFE_ZONE_MIN_RADIUS = 140;
const SAFE_ZONE_DAMAGE_INTERVAL = 1;
const SAFE_ZONE_DAMAGE_PER_TICK = 4;
const SAFE_ZONE_WARNING_SECONDS = 10;
const FINAL_STAGE_ALIVE_THRESHOLD = 2;

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
  nextSpecialEventId: 1,
  specialEventSpawnCd: 0,
  activeSpecialEvent: null,
  tarPickups: [],
  nextTarPickupId: 1,
  tarPickupSpawnCd: 0,
  tarSpills: [],
  nextTarSpillId: 1,
  safeZone: null,
  matchFlow: null,
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
  const tankType = MULTIPLAYER_DEFAULT_TANK_TYPE;
  const playerLevel = MULTIPLAYER_FIXED_PLAYER_LEVEL;
  const baseHp = MULTIPLAYER_FIXED_BASE_HP;
  const baseAtk = MULTIPLAYER_FIXED_BASE_ATK;
  const baseSpeed = MULTIPLAYER_FIXED_BASE_SPEED;
  return {
    tankType,
    playerLevel,
    baseHp,
    baseAtk,
    baseSpeed,
    baseAttackRadius: MULTIPLAYER_FIXED_ATTACK_RADIUS,
    hp: baseHp,
    maxHp: baseHp,
    atk: baseAtk,
    moveSpeedScale: 1,
    energyLevel: 1,
    energyExp: 0,
    energyNeedExp: PLAYER_EXP_BASE,
    tarAmmoCount: 0,
  };
}

function applyPlayerSetup(player, setup = {}) {
  const state = createPlayerState(setup);
  player.tankType = state.tankType;
  player.playerLevel = state.playerLevel;
  player.baseHp = state.baseHp;
  player.baseAtk = state.baseAtk;
  player.baseSpeed = state.baseSpeed;
  player.baseAttackRadius = state.baseAttackRadius;
  player.hp = state.hp;
  player.maxHp = state.maxHp;
  player.atk = state.atk;
  player.moveSpeedScale = state.moveSpeedScale;
  player.energyLevel = state.energyLevel;
  player.energyExp = state.energyExp;
  player.energyNeedExp = state.energyNeedExp;
  player.tarAmmoCount = state.tarAmmoCount;
}

function resetPlayerRuntimeState(player) {
  const state = createPlayerState({
    tankType: player.tankType,
    playerLevel: player.playerLevel,
    baseHp: player.baseHp,
    baseAtk: player.baseAtk,
    baseSpeed: player.baseSpeed,
    baseAttackRadius: player.baseAttackRadius,
  });
  player.hp = state.hp;
  player.maxHp = state.maxHp;
  player.atk = state.atk;
  player.moveSpeedScale = state.moveSpeedScale;
  player.energyLevel = state.energyLevel;
  player.energyExp = state.energyExp;
  player.energyNeedExp = state.energyNeedExp;
  player.tarAmmoCount = state.tarAmmoCount;
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

function sanitizeAimInput(aim) {
  if (!aim || typeof aim !== 'object') {
    return null;
  }
  const x = Number(aim.x);
  const y = Number(aim.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }
  const len = Math.sqrt(x * x + y * y);
  if (len <= 0.001) {
    return null;
  }
  return {
    x: x / len,
    y: y / len,
  };
}

function createMatchFlowState() {
  return {
    openingAnnounced: false,
    energyEggAnnounced: false,
    safeZoneWarningAnnounced: false,
    safeZoneStartedAnnounced: false,
    finalCircleAnnounced: false,
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

function createSafeZoneState(bounds = room.mapBounds) {
  const halfWidth = Math.max(0, Number(bounds && bounds.halfWidth) || 0);
  const halfHeight = Math.max(0, Number(bounds && bounds.halfHeight) || 0);
  const startRadiusBase = Math.min(halfWidth, halfHeight);
  const startRadius = Math.max(
    SAFE_ZONE_MIN_RADIUS,
    Math.floor(Math.max(0, startRadiusBase - SAFE_ZONE_START_PADDING))
  );
  const targetRadius = Math.max(
    SAFE_ZONE_MIN_RADIUS,
    Math.floor(startRadius * SAFE_ZONE_FINAL_RADIUS_RATIO)
  );
  return {
    centerX: 0,
    centerY: 0,
    startRadius,
    targetRadius: Math.min(startRadius, targetRadius),
    radius: startRadius,
    startDelay: SAFE_ZONE_START_DELAY,
    shrinkDuration: SAFE_ZONE_SHRINK_DURATION,
    damageInterval: SAFE_ZONE_DAMAGE_INTERVAL,
    damagePerTick: SAFE_ZONE_DAMAGE_PER_TICK,
    active: false,
    shrinking: false,
    finished: false,
    progress: 0,
  };
}

function buildSafeZoneStateCommand() {
  if (!room.safeZone) {
    room.safeZone = createSafeZoneState();
  }
  const safeZone = room.safeZone;
  const waitRemaining = Math.max(0, safeZone.startDelay - Math.max(0, room.elapsedSeconds));
  const shrinkRemaining = safeZone.finished
    ? 0
    : Math.max(0, safeZone.shrinkDuration - Math.max(0, room.elapsedSeconds - safeZone.startDelay));
  return {
    type: 'safeZoneState',
    safeZone: {
      centerX: safeZone.centerX,
      centerY: safeZone.centerY,
      startRadius: safeZone.startRadius,
      targetRadius: safeZone.targetRadius,
      radius: safeZone.radius,
      startDelay: safeZone.startDelay,
      shrinkDuration: safeZone.shrinkDuration,
      damageInterval: safeZone.damageInterval,
      damagePerTick: safeZone.damagePerTick,
      active: !!safeZone.active,
      shrinking: !!safeZone.shrinking,
      finished: !!safeZone.finished,
      progress: safeZone.progress,
      waitRemaining,
      shrinkRemaining,
    },
  };
}

function appendAnnouncement(frameCommands, payload) {
  if (!payload || !payload.text) {
    return;
  }
  appendFrameCommand(frameCommands, {
    type: 'announcement',
    id: payload.id || '',
    text: payload.text,
    subText: payload.subText || '',
    style: payload.style || 'info',
    duration: Number.isFinite(payload.duration) ? payload.duration : 2.2,
  });
}

function buildHudStateCommand() {
  if (!room.safeZone) {
    room.safeZone = createSafeZoneState();
  }
  if (!room.matchFlow) {
    room.matchFlow = createMatchFlowState();
  }
  const aliveCount = getAlivePlayers().length;
  const totalPlayers = room.players.filter((player) => player && !player.disconnected).length;
  const safeZone = room.safeZone;
  const energyEggWaitRemaining = room.energyEggMidgameSpawned < room.energyEggMidgamePlan
    ? Math.max(0, ENERGY_EGG_MIDGAME_SECONDS - Math.max(0, room.elapsedSeconds))
    : 0;
  let phaseKey = 'opening';
  let phaseText = '开局发育';
  let secondaryText = '';

  if (aliveCount <= 1) {
    phaseKey = 'settlement';
    phaseText = '本局结束';
  } else if (safeZone.finished) {
    phaseKey = 'final';
    phaseText = '决赛圈';
    secondaryText = '安全区已收缩至最终范围';
  } else if (safeZone.shrinking) {
    phaseKey = 'shrink';
    phaseText = '缩圈中';
    secondaryText = `安全区收缩 ${Math.max(0, Math.ceil(safeZone.shrinkDuration - Math.max(0, room.elapsedSeconds - safeZone.startDelay)))}s`;
  } else if (safeZone.active) {
    phaseKey = 'safe';
    phaseText = '安全区锁定';
  } else {
    secondaryText = energyEggWaitRemaining > 0
      ? `能量蛋刷新 ${Math.max(0, Math.ceil(energyEggWaitRemaining))}s`
      : `缩圈倒计时 ${Math.max(0, Math.ceil(safeZone.startDelay - Math.max(0, room.elapsedSeconds)))}s`;
  }

  if (!secondaryText && !safeZone.active) {
    secondaryText = `缩圈倒计时 ${Math.max(0, Math.ceil(safeZone.startDelay - Math.max(0, room.elapsedSeconds)))}s`;
  }
  if (!secondaryText && safeZone.shrinking) {
    secondaryText = `安全区收缩 ${Math.max(0, Math.ceil(safeZone.shrinkDuration - Math.max(0, room.elapsedSeconds - safeZone.startDelay)))}s`;
  }

  return {
    type: 'hudState',
    hud: {
      elapsedSeconds: room.elapsedSeconds,
      aliveCount,
      totalPlayers,
      phaseKey,
      phaseText,
      secondaryText,
      energyEggWaitRemaining,
      safeZone: {
        active: !!safeZone.active,
        shrinking: !!safeZone.shrinking,
        finished: !!safeZone.finished,
        waitRemaining: Math.max(0, safeZone.startDelay - Math.max(0, room.elapsedSeconds)),
        shrinkRemaining: safeZone.finished
          ? 0
          : Math.max(0, safeZone.shrinkDuration - Math.max(0, room.elapsedSeconds - safeZone.startDelay)),
        radius: safeZone.radius,
        targetRadius: safeZone.targetRadius,
      },
    },
  };
}

function updateMatchAnnouncements(frameCommands) {
  if (!room.matchFlow) {
    room.matchFlow = createMatchFlowState();
  }
  if (!room.safeZone) {
    room.safeZone = createSafeZoneState();
  }
  const flow = room.matchFlow;
  const safeZone = room.safeZone;
  const aliveCount = getAlivePlayers().length;

  if (!flow.openingAnnounced) {
    flow.openingAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'opening',
      text: '战斗开始',
      subText: '收集能量，准备进入缩圈',
      style: 'notice',
      duration: 2.2,
    });
  }

  if (!flow.energyEggAnnounced && room.energyEggMidgameSpawned > 0) {
    flow.energyEggAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'energyEgg',
      text: '能量蛋已刷新',
      subText: '推动争夺，成熟后会爆出大量能量',
      style: 'event',
      duration: 2.6,
    });
  }

  const waitRemaining = Math.max(0, safeZone.startDelay - Math.max(0, room.elapsedSeconds));
  if (!flow.safeZoneWarningAnnounced && !safeZone.active && waitRemaining > 0 && waitRemaining <= SAFE_ZONE_WARNING_SECONDS) {
    flow.safeZoneWarningAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'safeZoneWarning',
      text: '缩圈预警',
      subText: '请尽快向地图中心靠拢',
      style: 'warning',
      duration: 2.3,
    });
  }

  if (!flow.safeZoneStartedAnnounced && safeZone.shrinking) {
    flow.safeZoneStartedAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'safeZoneStart',
      text: '开始缩圈',
      subText: '圈外会持续掉血',
      style: 'warning',
      duration: 2.4,
    });
  }

  if (!flow.finalCircleAnnounced && (safeZone.finished || (safeZone.active && aliveCount <= FINAL_STAGE_ALIVE_THRESHOLD))) {
    flow.finalCircleAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'finalCircle',
      text: '决赛圈',
      subText: aliveCount > 0 ? `剩余 ${aliveCount} 名玩家，准备决胜` : '所有玩家已出局',
      style: 'danger',
      duration: 2.8,
    });
  }
}

function buildMatchResultCommand(winnerPlayerId) {
  return {
    type: 'matchResult',
    winnerPlayerId,
    text: winnerPlayerId >= 0 ? `玩家 ${winnerPlayerId + 1} 获胜` : '本局平局',
    duration: 3,
  };
}

function updateSafeZoneState(frameCommands) {
  if (!room.safeZone) {
    room.safeZone = createSafeZoneState();
  }
  const safeZone = room.safeZone;
  const elapsed = Math.max(0, room.elapsedSeconds);
  const shrinkElapsed = elapsed - safeZone.startDelay;
  if (shrinkElapsed <= 0) {
    safeZone.active = false;
    safeZone.shrinking = false;
    safeZone.finished = false;
    safeZone.progress = 0;
    safeZone.radius = safeZone.startRadius;
  } else if (shrinkElapsed >= safeZone.shrinkDuration) {
    safeZone.active = true;
    safeZone.shrinking = false;
    safeZone.finished = true;
    safeZone.progress = 1;
    safeZone.radius = safeZone.targetRadius;
  } else {
    const progress = clamp(shrinkElapsed / safeZone.shrinkDuration, 0, 1);
    safeZone.active = true;
    safeZone.shrinking = true;
    safeZone.finished = false;
    safeZone.progress = progress;
    safeZone.radius = safeZone.startRadius - (safeZone.startRadius - safeZone.targetRadius) * progress;
  }
  appendFrameCommand(frameCommands, buildSafeZoneStateCommand());
}

function getPlayerRuntimeRadius(player) {
  if (player && player.lastSnapshot && Number.isFinite(player.lastSnapshot.radius)) {
    return Math.max(16, player.lastSnapshot.radius);
  }
  return PLAYER_DEFAULT_RADIUS;
}

function applySafeZoneDamageToPlayer(player, frameCommands) {
  if (!player || player.dead || player.disconnected || !room.safeZone || !room.safeZone.active) {
    if (player) {
      player.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;
    }
    return;
  }
  const safeZone = room.safeZone;
  const pos = getPlayerRuntimePosition(player);
  const playerRadius = getPlayerRuntimeRadius(player);
  const dx = pos.x - safeZone.centerX;
  const dy = pos.y - safeZone.centerY;
  const allowedRadius = Math.max(0, safeZone.radius - playerRadius * 0.35);
  const outside = dx * dx + dy * dy > allowedRadius * allowedRadius;
  if (!outside) {
    player.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;
    return;
  }

  if (!Number.isFinite(player.safeZoneDamageCd) || player.safeZoneDamageCd <= 0) {
    player.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;
  }
  player.safeZoneDamageCd -= TICK_INTERVAL / 1000;
  while (player.safeZoneDamageCd <= 0 && !player.dead) {
    player.safeZoneDamageCd += SAFE_ZONE_DAMAGE_INTERVAL;
    player.hp -= safeZone.damagePerTick;
    if (player.hp < 0) {
      player.hp = 0;
    }
    appendFrameCommand(frameCommands, {
      type: 'safeZoneDamage',
      playerId: player.playerId,
      damage: safeZone.damagePerTick,
      hp: player.hp,
    });
    if (player.hp <= 0) {
      player.dead = true;
    }
  }
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

function isTarPickupPointAvailable(point) {
  if (!point) {
    return false;
  }
  for (let i = 0; i < room.tarPickups.length; i++) {
    const pickup = room.tarPickups[i];
    if (pickup && !pickup.removed && Math.sqrt(distanceSqr(pickup, point)) < 180) {
      return false;
    }
  }
  for (let i = 0; i < room.tarSpills.length; i++) {
    const spill = room.tarSpills[i];
    if (spill && !spill.removed && Math.sqrt(distanceSqr(spill, point)) < spill.radius + 90) {
      return false;
    }
  }
  for (let i = 0; i < room.energies.length; i++) {
    const energy = room.energies[i];
    if (energy && Math.sqrt(distanceSqr(energy, point)) < 130) {
      return false;
    }
  }
  for (let i = 0; i < room.energyEggs.length; i++) {
    const egg = room.energyEggs[i];
    if (egg && !egg.removed && Math.sqrt(distanceSqr(egg, point)) < 160) {
      return false;
    }
  }
  for (let i = 0; i < room.players.length; i++) {
    const player = room.players[i];
    if (!player || player.dead || player.disconnected) {
      continue;
    }
    if (Math.sqrt(distanceSqr(getPlayerRuntimePosition(player), point)) < 160) {
      return false;
    }
  }
  return true;
}

function chooseTarPickupSpawnPoint() {
  const candidates = getSpecialEventSpawnSources();
  const preferred = [];
  const fallback = [];
  for (let i = 0; i < candidates.length; i++) {
    const point = clampPointToBounds(candidates[i], TAR_PICKUP_RADIUS + 12);
    if (isTarPickupPointAvailable(point)) {
      preferred.push(point);
    } else {
      fallback.push(point);
    }
  }
  const source = preferred.length > 0 ? preferred : fallback;
  if (source.length > 0) {
    return pickOne(source);
  }
  return clampPointToBounds({
    x: Math.floor(Math.random() * 2800) - 1400,
    y: Math.floor(Math.random() * 1800) - 900,
  }, TAR_PICKUP_RADIUS + 12);
}

function createTarPickup(point) {
  if (!point) {
    return null;
  }
  const pos = clampPointToBounds(point, TAR_PICKUP_RADIUS + 12);
  return {
    id: room.nextTarPickupId++,
    x: pos.x,
    y: pos.y,
    radius: TAR_PICKUP_RADIUS,
    removed: false,
  };
}

function spawnTarPickupInFrame(frameCommands) {
  const aliveCount = room.tarPickups.filter((pickup) => pickup && !pickup.removed).length;
  if (aliveCount >= TAR_PICKUP_MAX_COUNT) {
    return null;
  }
  const pickup = createTarPickup(chooseTarPickupSpawnPoint());
  if (!pickup) {
    return null;
  }
  room.tarPickups.push(pickup);
  appendFrameCommand(frameCommands, {
    type: 'tarPickupSpawn',
    pickup: {
      id: pickup.id,
      x: pickup.x,
      y: pickup.y,
      radius: pickup.radius,
    },
  });
  return pickup;
}

function removeTarPickupInFrame(pickupId, frameCommands, reason = 'pickup') {
  const index = room.tarPickups.findIndex((item) => item && item.id === pickupId && !item.removed);
  if (index < 0) {
    return null;
  }
  const pickup = room.tarPickups[index];
  pickup.removed = true;
  room.tarPickups.splice(index, 1);
  appendFrameCommand(frameCommands, {
    type: 'tarPickupRemove',
    pickupId,
    reason,
  });
  return pickup;
}

function tryConsumeTarPickup(player, pickupId, frameCommands) {
  if (!player || player.dead || player.disconnected || pickupId == null) {
    return false;
  }
  if ((player.tarAmmoCount || 0) >= 1) {
    return false;
  }
  const pickup = room.tarPickups.find((item) => item && item.id === pickupId && !item.removed);
  if (!pickup) {
    return false;
  }
  const playerPos = getPlayerRuntimePosition(player);
  if (Math.sqrt(distanceSqr(playerPos, pickup)) > TAR_PICKUP_TOUCH_RADIUS) {
    return false;
  }
  if (!removeTarPickupInFrame(pickupId, frameCommands, 'pickup')) {
    return false;
  }
  player.tarAmmoCount = 1;
  room.tarPickupSpawnCd = randomBetween(TAR_PICKUP_RESPAWN_MIN, TAR_PICKUP_RESPAWN_MAX);
  return true;
}

function sanitizeThrowTarPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }
  const dirX = Number(payload.dirX);
  const dirY = Number(payload.dirY);
  const ratio = Number(payload.ratio);
  if (!Number.isFinite(dirX) || !Number.isFinite(dirY)) {
    return null;
  }
  const len = Math.sqrt(dirX * dirX + dirY * dirY);
  if (len <= 0.0001) {
    return null;
  }
  return {
    dirX: dirX / len,
    dirY: dirY / len,
    ratio: Number.isFinite(ratio) ? clamp(ratio, 0, 1) : 1,
  };
}

function createTarSpill(point) {
  if (!point) {
    return null;
  }
  const pos = clampPointToBounds(point, TAR_SPILL_RADIUS * 0.55);
  return {
    id: room.nextTarSpillId++,
    x: pos.x,
    y: pos.y,
    radius: TAR_SPILL_RADIUS,
    duration: TAR_SPILL_DURATION,
    remainTime: TAR_SPILL_DURATION,
    slowFactor: TAR_SPILL_SLOW_FACTOR,
    removed: false,
  };
}

function spawnTarSpillInFrame(spill, player, frameCommands) {
  if (!spill) {
    return null;
  }
  room.tarSpills.push(spill);
  appendFrameCommand(frameCommands, {
    type: 'tarSpillSpawn',
    spill: {
      id: spill.id,
      x: spill.x,
      y: spill.y,
      radius: spill.radius,
      duration: spill.duration,
      remainTime: spill.remainTime,
      slowFactor: spill.slowFactor,
      ownerPlayerId: player ? player.playerId : -1,
    },
  });
  return spill;
}

function removeTarSpillInFrame(spillId, frameCommands, reason = 'timeout') {
  const spill = room.tarSpills.find((item) => item && item.id === spillId && !item.removed);
  if (!spill) {
    return;
  }
  spill.removed = true;
  appendFrameCommand(frameCommands, {
    type: 'tarSpillRemove',
    spillId,
    reason,
  });
}

function tryThrowTarByPlayer(player, throwTar, frameCommands) {
  if (!player || player.dead || player.disconnected || !throwTar) {
    return false;
  }
  if ((player.tarAmmoCount || 0) <= 0) {
    return false;
  }
  const playerPos = getPlayerRuntimePosition(player);
  const attackRadius = Number.isFinite(player.baseAttackRadius) && player.baseAttackRadius > 0
    ? player.baseAttackRadius
    : 420;
  const runtimeDir = getPlayerRuntimeDir(player);
  const normalized = Number.isFinite(throwTar.dirX) && Number.isFinite(throwTar.dirY)
    ? { x: throwTar.dirX, y: throwTar.dirY }
    : runtimeDir;
  const ratio = Number.isFinite(throwTar.ratio) ? clamp(throwTar.ratio, 0, 1) : 1;
  const throwDistance = Math.max(30, attackRadius * ratio);
  const target = clampPointToBounds({
    x: playerPos.x + normalized.x * throwDistance,
    y: playerPos.y + normalized.y * throwDistance,
  }, TAR_SPILL_RADIUS * 0.55);
  const spill = createTarSpill(target);
  if (!spill) {
    return false;
  }
  player.tarAmmoCount = 0;
  appendFrameCommand(frameCommands, {
    type: 'tarThrow',
    playerId: player.playerId,
    from: {
      x: playerPos.x,
      y: playerPos.y,
    },
    to: {
      x: spill.x,
      y: spill.y,
    },
    spillId: spill.id,
    flightTime: 0.28,
  });
  spawnTarSpillInFrame(spill, player, frameCommands);
  return true;
}

function updateTarPickupSpawns(frameCommands) {
  const aliveCount = room.tarPickups.filter((pickup) => pickup && !pickup.removed).length;
  if (aliveCount >= TAR_PICKUP_MAX_COUNT) {
    return;
  }
  if (room.elapsedSeconds < TAR_PICKUP_START_DELAY) {
    return;
  }
  if (room.tarPickupSpawnCd > 0) {
    room.tarPickupSpawnCd -= TICK_INTERVAL / 1000;
    return;
  }
  if (room.players.some((player) => (player && !player.dead && !player.disconnected && (player.tarAmmoCount || 0) > 0))) {
    room.tarPickupSpawnCd = 1;
    return;
  }
  spawnTarPickupInFrame(frameCommands);
  room.tarPickupSpawnCd = randomBetween(TAR_PICKUP_RESPAWN_MIN, TAR_PICKUP_RESPAWN_MAX);
}

function updateTarSpills(frameCommands) {
  for (let i = 0; i < room.tarSpills.length; i++) {
    const spill = room.tarSpills[i];
    if (!spill || spill.removed) {
      continue;
    }
    spill.remainTime -= TICK_INTERVAL / 1000;
    if (spill.remainTime <= 0) {
      spill.remainTime = 0;
      removeTarSpillInFrame(spill.id, frameCommands, 'timeout');
    }
  }
  room.tarSpills = room.tarSpills.filter((spill) => spill && !spill.removed);
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

function randomBetween(min, max) {
  if (max <= min) {
    return min;
  }
  return min + Math.random() * (max - min);
}

function pickOne(list) {
  if (!Array.isArray(list) || list.length <= 0) {
    return null;
  }
  return list[Math.floor(Math.random() * list.length)] || null;
}

function getSpecialEventSpawnSources() {
  if (Array.isArray(room.energySpawnPoints) && room.energySpawnPoints.length > 0) {
    return room.energySpawnPoints;
  }
  if (Array.isArray(room.spawnCandidates) && room.spawnCandidates.length > 0) {
    return room.spawnCandidates;
  }
  return [];
}

function isSpecialEventPointAvailable(point, padding = 90) {
  if (!point) {
    return false;
  }
  for (let i = 0; i < room.players.length; i++) {
    const player = room.players[i];
    if (!player || player.dead || player.disconnected) {
      continue;
    }
    if (Math.sqrt(distanceSqr(getPlayerRuntimePosition(player), point)) < SPECIAL_EVENT_MIN_PLAYER_DISTANCE) {
      return false;
    }
  }
  for (let i = 0; i < room.energies.length; i++) {
    const energy = room.energies[i];
    if (energy && Math.sqrt(distanceSqr(energy, point)) < SPECIAL_EVENT_MIN_ENERGY_DISTANCE) {
      return false;
    }
  }
  for (let i = 0; i < room.energyEggs.length; i++) {
    const egg = room.energyEggs[i];
    if (egg && !egg.removed && Math.sqrt(distanceSqr(egg, point)) < SPECIAL_EVENT_MIN_EGG_DISTANCE) {
      return false;
    }
  }
  const clamped = clampPointToBounds(point, padding);
  return Math.abs(clamped.x - point.x) < 0.01 && Math.abs(clamped.y - point.y) < 0.01;
}

function chooseSpecialEventPoint(padding = 90) {
  const points = getSpecialEventSpawnSources();
  if (points.length > 0) {
    const preferred = points.filter((point) => isSpecialEventPointAvailable(point, padding));
    const source = preferred.length > 0 ? preferred : points;
    const picked = pickOne(source);
    if (picked) {
      return clampPointToBounds({ x: picked.x, y: picked.y }, padding);
    }
  }
  return clampPointToBounds({
    x: Math.floor(Math.random() * 2800) - 1400,
    y: Math.floor(Math.random() * 1800) - 900,
  }, padding);
}

function choosePortalPair() {
  const entry = chooseSpecialEventPoint(SPECIAL_EVENT_PORTAL_RADIUS + 40);
  const points = getSpecialEventSpawnSources();
  const candidates = [];
  for (let i = 0; i < points.length; i++) {
    const point = clampPointToBounds(points[i], SPECIAL_EVENT_PORTAL_RADIUS + 40);
    const dist = Math.sqrt(distanceSqr(entry, point));
    if (dist >= SPECIAL_EVENT_PORTAL_PAIR_MIN && dist <= SPECIAL_EVENT_PORTAL_PAIR_MAX) {
      candidates.push(point);
    }
  }
  let exit = candidates.length > 0 ? pickOne(candidates) : null;
  if (!exit) {
    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(SPECIAL_EVENT_PORTAL_PAIR_MIN, SPECIAL_EVENT_PORTAL_PAIR_MAX);
    exit = clampPointToBounds({
      x: entry.x + Math.cos(angle) * distance,
      y: entry.y + Math.sin(angle) * distance,
    }, SPECIAL_EVENT_PORTAL_RADIUS + 40);
  }
  return {
    entryPos: entry,
    exitPos: exit,
  };
}

function buildSpecialEventPayload(eventType) {
  const id = `evt_${room.nextSpecialEventId++}`;
  if (eventType === 'portal') {
    const pair = choosePortalPair();
    return {
      id,
      type: eventType,
      duration: SPECIAL_EVENT_DURATION,
      radius: SPECIAL_EVENT_PORTAL_RADIUS,
      entryPos: pair.entryPos,
      exitPos: pair.exitPos,
    };
  }
  if (eventType === 'damageDouble') {
    return {
      id,
      type: eventType,
      duration: SPECIAL_EVENT_DURATION,
      center: chooseSpecialEventPoint(SPECIAL_EVENT_DAMAGE_RADIUS + 40),
      radius: SPECIAL_EVENT_DAMAGE_RADIUS,
      damageMultiplier: 2,
      scaleMultiplier: 1.5,
    };
  }
  if (eventType === 'speedDouble') {
    return {
      id,
      type: eventType,
      duration: SPECIAL_EVENT_DURATION,
      center: chooseSpecialEventPoint(SPECIAL_EVENT_SPEED_RADIUS + 40),
      radius: SPECIAL_EVENT_SPEED_RADIUS,
      speedMultiplier: 3,
    };
  }
  return {
    id,
    type: 'blackHole',
    duration: SPECIAL_EVENT_DURATION,
    center: chooseSpecialEventPoint(SPECIAL_EVENT_BLACK_HOLE_RADIUS + 40),
    radius: SPECIAL_EVENT_BLACK_HOLE_RADIUS,
    destroyRadius: SPECIAL_EVENT_BLACK_HOLE_DESTROY_RADIUS,
    gravityStrength: 160,
  };
}

function spawnSpecialEventInFrame(frameCommands) {
  if (room.activeSpecialEvent) {
    return null;
  }
  const eventTypes = ['portal', 'damageDouble', 'speedDouble', 'blackHole'];
  const eventData = buildSpecialEventPayload(pickOne(eventTypes));
  eventData.remainTime = eventData.duration;
  room.activeSpecialEvent = eventData;
  appendFrameCommand(frameCommands, {
    type: 'specialEventSpawn',
    event: eventData,
  });
  return eventData;
}

function removeSpecialEventInFrame(frameCommands, reason = 'timeout') {
  if (!room.activeSpecialEvent) {
    return;
  }
  const active = room.activeSpecialEvent;
  room.activeSpecialEvent = null;
  room.specialEventSpawnCd = randomBetween(SPECIAL_EVENT_RESPAWN_MIN, SPECIAL_EVENT_RESPAWN_MAX);
  appendFrameCommand(frameCommands, {
    type: 'specialEventRemove',
    eventId: active.id,
    eventType: active.type,
    reason,
  });
}

function applyBulletEventToServerState(player, bulletEvent) {
  if (!player || !bulletEvent || !bulletEvent.bulletId) {
    return;
  }
  const bullet = room.bullets[bulletEvent.bulletId];
  if (!bullet || bullet.playerId !== player.playerId) {
    return;
  }
  if (!bullet.eventStates) {
    bullet.eventStates = {};
  }
  const eventType = bulletEvent.type;
  const stateKey = eventType + ':' + (bulletEvent.eventId || '');
  if (bullet.eventStates[stateKey]) {
    return;
  }
  bullet.eventStates[stateKey] = true;
  if (eventType === 'damageDouble') {
    bullet.damage *= 2;
  } else if (eventType === 'blackHole') {
    bullet.destroyed = true;
  }
}

function updateSpecialEvents(frameCommands) {
  if (room.activeSpecialEvent) {
    room.activeSpecialEvent.remainTime -= TICK_INTERVAL / 1000;
    if (room.activeSpecialEvent.remainTime <= 0) {
      room.activeSpecialEvent.remainTime = 0;
      removeSpecialEventInFrame(frameCommands, 'timeout');
    }
    return;
  }
  if (room.elapsedSeconds < SPECIAL_EVENT_START_DELAY) {
    return;
  }
  if (room.specialEventSpawnCd > 0) {
    room.specialEventSpawnCd -= TICK_INTERVAL / 1000;
    return;
  }
  spawnSpecialEventInFrame(frameCommands);
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
    tarAmmoCount: player.tarAmmoCount || 0,
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
  room.elapsedSeconds += TICK_INTERVAL / 1000;
  updateSafeZoneState(frameCommands);
  updateEnergySpawns(frameCommands);

  room.players.forEach((p) => {
    let inputs = {
      up: false,
      down: false,
      left: false,
      right: false,
      aim: null,
      fire: false,
      hit: false,
      throwTar: false,
    };

    if (p.dead || p.disconnected) {
      p.pendingInputs.length = 0;
      p.lastInputs = {
        up: false,
        down: false,
        left: false,
        right: false,
        aim: null,
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
    inputs.aim = p.lastInputs && p.lastInputs.aim ? p.lastInputs.aim : null;

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
      const aim = sanitizeAimInput(src.aim);
      if (aim) {
        inputs.aim = aim;
      }
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

      if (Array.isArray(src.bulletEvents) && src.bulletEvents.length > 0) {
        for (let eventIndex = 0; eventIndex < src.bulletEvents.length; eventIndex++) {
          applyBulletEventToServerState(p, src.bulletEvents[eventIndex]);
        }
      }

      if (src.pickupEnergyId != null) {
        tryConsumeEnergy(p, src.pickupEnergyId, eventCommands);
      }
      if (src.pickupTarId != null) {
        tryConsumeTarPickup(p, src.pickupTarId, eventCommands);
      }
      if (src.throwTar) {
        inputs.throwTar = src.throwTar;
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
        if (!bullet || bullet.destroyed || !targetPlayer || targetPlayer.dead) {
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

    if (inputs.throwTar) {
      tryThrowTarByPlayer(p, sanitizeThrowTarPayload(inputs.throwTar), eventCommands);
    }
    applySafeZoneDamageToPlayer(p, eventCommands);

    p.lastInputs = {
      up: inputs.up,
      down: inputs.down,
      left: inputs.left,
      right: inputs.right,
      aim: inputs.aim,
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
  updateSpecialEvents(frameCommands);
  updateTarPickupSpawns(frameCommands);
  updateTarSpills(frameCommands);
  updateMatchAnnouncements(frameCommands);
  appendFrameCommand(frameCommands, buildHudStateCommand());
  const winnerPlayerId = getMatchWinnerPlayerId();
  if (winnerPlayerId !== null) {
    appendFrameCommand(eventCommands, buildMatchResultCommand(winnerPlayerId));
  }

  broadcast({
    type: 'frame',
    frame,
    commands: frameCommands.concat(playerInputCommands, eventCommands, stateCommands),
  });
  if (winnerPlayerId !== null) {
    endMatch(winnerPlayerId);
  }
}

function getMatchWinnerPlayerId() {
  if (room.state !== ROOM_STATE.RUNNING) {
    return null;
  }

  const alivePlayers = getAlivePlayers();
  if (alivePlayers.length > 1) {
    return null;
  }

  return alivePlayers.length === 1 ? alivePlayers[0].playerId : -1;
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
  room.nextSpecialEventId = 1;
  room.specialEventSpawnCd = 0;
  room.activeSpecialEvent = null;
  room.tarPickups = [];
  room.nextTarPickupId = 1;
  room.tarPickupSpawnCd = 0;
  room.tarSpills = [];
  room.nextTarSpillId = 1;
  room.safeZone = createSafeZoneState(room.mapBounds);
  room.matchFlow = createMatchFlowState();
  initMatchEnergyEggPlan();

  room.players.forEach((p, index) => {
    p.pendingInputs = [];
    p.lastInputs = { up: false, down: false, left: false, right: false, aim: null };
    p.disconnected = false;
    p.dead = false;
    p.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;
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
      specialEvents: room.activeSpecialEvent ? [room.activeSpecialEvent] : [],
      tarPickups: room.tarPickups,
      tarSpills: room.tarSpills,
      safeZone: room.safeZone,
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
        tarAmmoCount: player.tarAmmoCount || 0,
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
  ws.lastInputs = { up: false, down: false, left: false, right: false, aim: null };
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
  ws.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;

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
      const attackRadius = Number(msg.payload && msg.payload.baseAttackRadius);
      if (Number.isFinite(attackRadius) && attackRadius > 0) {
        ws.baseAttackRadius = attackRadius;
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
  room.nextSpecialEventId = 1;
  room.specialEventSpawnCd = 0;
  room.activeSpecialEvent = null;
  room.tarPickups = [];
  room.nextTarPickupId = 1;
  room.tarPickupSpawnCd = 0;
  room.tarSpills = [];
  room.nextTarSpillId = 1;
  room.safeZone = createSafeZoneState(room.mapBounds);
  room.matchFlow = createMatchFlowState();
  console.log('[Room] Reset');
}

server.listen(PORT, () => {
  console.log('MiniTank Frame Sync Server v3');
  console.log(`Port: ${PORT}`);
  console.log(`Tick rate: ${TICK_RATE}Hz (${TICK_INTERVAL}ms)`);
  console.log(`Players: ${MIN_PLAYERS}-${MAX_PLAYERS}`);
  console.log(`Start delay: ${START_DELAY}s`);
});
