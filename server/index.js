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
const PLAYER_SHOOT_INTERVAL = 0.35;
const PLAYER_FREE_BULLET_MAX = 3;
const PLAYER_FREE_BULLET_RECOVER_DELAY = 0.8;
const PLAYER_FREE_BULLET_RECOVER_INTERVAL = 0.6;
const PLAYER_PAID_SHOT_HP_COST = 5 * (1 - 0.1);
const MULTIPLAYER_DEFAULT_TANK_TYPE = 1;
const MULTIPLAYER_FIXED_PLAYER_LEVEL = 1;
const MULTIPLAYER_FIXED_BASE_HP = 100;
const MULTIPLAYER_FIXED_BASE_ATK = 10;
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
const SPECIAL_EVENT_DURATION = 120;
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
const TAR_PICKUP_LIFETIME = 120;
const TAR_SPILL_DURATION = 10;
const TAR_SPILL_RADIUS = 120;
const TAR_SPILL_SLOW_FACTOR = 0.52;
const BLACK_HOLE_PICKUP_MAX_COUNT = 1;
const BLACK_HOLE_PICKUP_START_DELAY = 8;
const BLACK_HOLE_PICKUP_RESPAWN_MIN = 14;
const BLACK_HOLE_PICKUP_RESPAWN_MAX = 20;
const BLACK_HOLE_PICKUP_RADIUS = 42;
const BLACK_HOLE_PICKUP_TOUCH_RADIUS = 92;
const BLACK_HOLE_PICKUP_LIFETIME = 120;
const BLACK_HOLE_ZONE_DURATION = 8;
const BLACK_HOLE_ZONE_RADIUS = 100;
const BLACK_HOLE_ZONE_DESTROY_RADIUS = 14;
const BLACK_HOLE_ZONE_GRAVITY = 160;
const SAFE_ZONE_START_PADDING = 80;
const SAFE_ZONE_FIXED_RADIUS_RATIO = 0.86;
const SAFE_ZONE_MIN_RADIUS = 140;
const SAFE_ZONE_DAMAGE_INTERVAL = 1;
const SAFE_ZONE_DAMAGE_PER_TICK = 4;
const SAFE_ZONE_POISON_START_SECONDS = 270;
const SAFE_ZONE_POISON_DAMAGE_PERCENT = 0.05;
const SAFE_ZONE_WARNING_SECONDS = 10;
const FINAL_STAGE_ALIVE_THRESHOLD = 2;
const MULTIPLAYER_BUSH_COUNT = 10;
const MULTIPLAYER_BUSH_RADIUS = 94;
const MULTIPLAYER_BUSH_MIN_GAP = 220;
const MULTIPLAYER_BUSH_SPAWN_PADDING = 120;
const MULTIPLAYER_BUSH_MIN_SPAWN_DISTANCE = 210;
const MULTIPLAYER_INITIAL_PICKUP_COUNT = 5;
const MULTIPLAYER_INITIAL_SPECIAL_EVENT_COUNT = 5;
const MULTIPLAYER_COVER_COUNT = 6;
const MULTIPLAYER_COVER_RADIUS = 34;
const MULTIPLAYER_COVER_HP = 5;
const MULTIPLAYER_COVER_MIN_GAP = 86;
const MULTIPLAYER_COVER_MIN_PLAYER_DISTANCE = 120;
const MULTIPLAYER_COVER_ATTACH_DISTANCE = 110;
const MULTIPLAYER_COVER_ATTACH_MIN_OFFSET = 60;
const MULTIPLAYER_COVER_ATTACH_MAX_OFFSET = 84;

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
  bushSpawnPoints: [],
  bushes: [],
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
  activeSpecialEvents: [],
  tarPickups: [],
  nextTarPickupId: 1,
  tarPickupSpawnCd: 0,
  tarSpills: [],
  nextTarSpillId: 1,
  blackHolePickups: [],
  nextBlackHolePickupId: 1,
  blackHolePickupSpawnCd: 0,
  blackHoleZones: [],
  nextBlackHoleZoneId: 1,
  covers: [],
  nextCoverId: 1,
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
    blackHoleAmmoCount: 0,
    freeBulletCount: PLAYER_FREE_BULLET_MAX,
    stopFireTime: 0,
    freeBulletRecoverTime: 0,
    shotCooldownRemaining: 0,
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
  player.blackHoleAmmoCount = state.blackHoleAmmoCount;
  player.freeBulletCount = state.freeBulletCount;
  player.stopFireTime = state.stopFireTime;
  player.freeBulletRecoverTime = state.freeBulletRecoverTime;
  player.shotCooldownRemaining = state.shotCooldownRemaining;
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
  player.blackHoleAmmoCount = state.blackHoleAmmoCount;
  player.freeBulletCount = state.freeBulletCount;
  player.stopFireTime = state.stopFireTime;
  player.freeBulletRecoverTime = state.freeBulletRecoverTime;
  player.shotCooldownRemaining = state.shotCooldownRemaining;
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

function sanitizeBushes(list) {
  if (!Array.isArray(list)) {
    return [];
  }
  const result = [];
  const used = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item || typeof item !== 'object') {
      continue;
    }
    const id = item.id == null ? result.length + 1 : Number(item.id);
    const x = Number(item.x);
    const y = Number(item.y);
    const radius = Number(item.radius);
    if (!Number.isFinite(id) || !Number.isFinite(x) || !Number.isFinite(y)) {
      continue;
    }
    const key = `${Math.round(x)}:${Math.round(y)}`;
    if (used[key]) {
      continue;
    }
    used[key] = true;
    const point = clampPointToBounds({ x, y }, MULTIPLAYER_BUSH_SPAWN_PADDING);
    result.push({
      id,
      x: Math.round(point.x),
      y: Math.round(point.y),
      radius: Number.isFinite(radius) && radius > 24 ? Math.round(radius) : MULTIPLAYER_BUSH_RADIUS,
    });
  }
  return result;
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
    poisonWarningAnnounced: false,
    poisonStartedAnnounced: false,
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
    Math.floor(startRadius * SAFE_ZONE_FIXED_RADIUS_RATIO)
  );
  return {
    centerX: 0,
    centerY: 0,
    startRadius,
    targetRadius: Math.min(startRadius, targetRadius),
    radius: Math.min(startRadius, targetRadius),
    startDelay: 0,
    shrinkDuration: 0,
    damageInterval: SAFE_ZONE_DAMAGE_INTERVAL,
    damagePerTick: SAFE_ZONE_DAMAGE_PER_TICK,
    damagePercent: 0,
    damageMode: 'outsideFlat',
    poisonStartTime: SAFE_ZONE_POISON_START_SECONDS,
    poisonActive: false,
    active: true,
    shrinking: false,
    finished: false,
    progress: 1,
    phase: 'safe',
  };
}

function buildSafeZoneStateCommand() {
  if (!room.safeZone) {
    room.safeZone = createSafeZoneState();
  }
  const safeZone = room.safeZone;
  const elapsed = Math.max(0, room.elapsedSeconds);
  const poisonRemaining = Math.max(0, (safeZone.poisonStartTime || 0) - elapsed);
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
      damagePercent: safeZone.damagePercent || 0,
      damageMode: safeZone.damageMode || 'outsideFlat',
      poisonStartTime: safeZone.poisonStartTime || 0,
      poisonRemaining,
      poisonActive: !!safeZone.poisonActive,
      active: !!safeZone.active,
      shrinking: !!safeZone.shrinking,
      finished: !!safeZone.finished,
      progress: safeZone.progress,
      waitRemaining: 0,
      shrinkRemaining: 0,
      phase: safeZone.phase || 'safe',
    },
  };
}

function getPreferredSpawnSafeZone() {
  if (!room.safeZone) {
    room.safeZone = createSafeZoneState();
  }
  const safeZone = room.safeZone;
  let radius = 0;
  if (safeZone.active && Number.isFinite(safeZone.radius) && safeZone.radius > 0) {
    radius = safeZone.radius;
  } else if (Number.isFinite(safeZone.targetRadius) && safeZone.targetRadius > 0) {
    radius = safeZone.targetRadius;
  } else if (Number.isFinite(safeZone.startRadius) && safeZone.startRadius > 0) {
    radius = safeZone.startRadius;
  }
  if (!Number.isFinite(radius) || radius <= 0) {
    return null;
  }
  return {
    centerX: Number.isFinite(safeZone.centerX) ? safeZone.centerX : 0,
    centerY: Number.isFinite(safeZone.centerY) ? safeZone.centerY : 0,
    radius,
  };
}

function isPointInsidePreferredSafeZone(point, padding = 0) {
  if (!point) {
    return false;
  }
  const zone = getPreferredSpawnSafeZone();
  if (!zone) {
    return true;
  }
  const allowRadius = zone.radius - Math.max(0, padding);
  if (allowRadius <= 0) {
    return false;
  }
  const dx = (point.x || 0) - zone.centerX;
  const dy = (point.y || 0) - zone.centerY;
  return dx * dx + dy * dy <= allowRadius * allowRadius;
}

function filterPointsInsidePreferredSafeZone(points, padding = 0) {
  if (!Array.isArray(points) || points.length <= 0) {
    return [];
  }
  const preferred = points.filter((point) => isPointInsidePreferredSafeZone(point, padding));
  return preferred.length > 0 ? preferred : points.slice();
}

function chooseRandomPreferredSafePoint(padding = 0) {
  const zone = getPreferredSpawnSafeZone();
  if (!zone) {
    return clampPointToBounds({
      x: Math.floor(Math.random() * 2800) - 1400,
      y: Math.floor(Math.random() * 1800) - 900,
    }, padding);
  }
  const limitRadius = Math.max(0, zone.radius - Math.max(0, padding));
  if (limitRadius <= 1) {
    return clampPointToBounds({ x: zone.centerX, y: zone.centerY }, padding);
  }
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.sqrt(Math.random()) * limitRadius;
  return clampPointToBounds({
    x: zone.centerX + Math.cos(angle) * distance,
    y: zone.centerY + Math.sin(angle) * distance,
  }, padding);
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
  const poisonRemaining = Math.max(0, (safeZone.poisonStartTime || 0) - Math.max(0, room.elapsedSeconds));
  let phaseKey = 'opening';
  let phaseText = '开局发育';
  let secondaryText = '';

  if (aliveCount <= 1) {
    phaseKey = 'settlement';
    phaseText = '本局结束';
  } else if (safeZone.poisonActive) {
    phaseKey = 'poison';
    phaseText = '毒区爆发';
    secondaryText = `全图掉血 ${Math.max(1, Math.round((safeZone.damagePercent || 0) * 100))}%/s`;
  } else if (safeZone.active) {
    phaseKey = 'safe';
    phaseText = aliveCount <= FINAL_STAGE_ALIVE_THRESHOLD ? '中心决战' : '中心安全区';
    secondaryText = `毒区爆发 ${Math.max(0, Math.ceil(poisonRemaining))}s`;
  } else {
    secondaryText = energyEggWaitRemaining > 0
      ? `能量蛋刷新 ${Math.max(0, Math.ceil(energyEggWaitRemaining))}s`
      : `毒区爆发 ${Math.max(0, Math.ceil(poisonRemaining))}s`;
  }

  if (!secondaryText && !safeZone.poisonActive) {
    secondaryText = `毒区爆发 ${Math.max(0, Math.ceil(poisonRemaining))}s`;
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
        poisonActive: !!safeZone.poisonActive,
        waitRemaining: 0,
        shrinkRemaining: 0,
        poisonRemaining,
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
      subText: '中心安全区已锁定，尽快向地图中央集结',
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

  const poisonRemaining = Math.max(0, (safeZone.poisonStartTime || 0) - Math.max(0, room.elapsedSeconds));
  if (!flow.poisonWarningAnnounced && !safeZone.poisonActive && poisonRemaining > 0 && poisonRemaining <= SAFE_ZONE_WARNING_SECONDS) {
    flow.poisonWarningAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'poisonWarning',
      text: '毒区预警',
      subText: `${Math.max(0, Math.ceil(poisonRemaining))} 秒后安全区消失`,
      style: 'warning',
      duration: 2.3,
    });
  }

  if (!flow.poisonStartedAnnounced && safeZone.poisonActive) {
    flow.poisonStartedAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'poisonStart',
      text: '毒区爆发',
      subText: `所有玩家每秒损失 ${Math.max(1, Math.round((safeZone.damagePercent || 0) * 100))}% 最大生命`,
      style: 'warning',
      duration: 2.4,
    });
  }

  if (!flow.finalCircleAnnounced && !safeZone.poisonActive && safeZone.active && aliveCount <= FINAL_STAGE_ALIVE_THRESHOLD) {
    flow.finalCircleAnnounced = true;
    appendAnnouncement(frameCommands, {
      id: 'finalCircle',
      text: '决胜阶段',
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
  const wasPoisonActive = !!safeZone.poisonActive;
  if (elapsed >= (safeZone.poisonStartTime || 0)) {
    safeZone.poisonActive = true;
    safeZone.active = false;
    safeZone.shrinking = false;
    safeZone.finished = false;
    safeZone.progress = 1;
    safeZone.radius = 0;
    safeZone.damagePerTick = 0;
    safeZone.damagePercent = SAFE_ZONE_POISON_DAMAGE_PERCENT;
    safeZone.damageMode = 'globalPercentMaxHp';
    safeZone.phase = 'poison';
  } else {
    safeZone.poisonActive = false;
    safeZone.active = true;
    safeZone.shrinking = false;
    safeZone.finished = false;
    safeZone.progress = 1;
    safeZone.radius = safeZone.targetRadius;
    safeZone.damagePerTick = SAFE_ZONE_DAMAGE_PER_TICK;
    safeZone.damagePercent = 0;
    safeZone.damageMode = 'outsideFlat';
    safeZone.phase = 'safe';
  }
  if (!wasPoisonActive && safeZone.poisonActive) {
    room.players.forEach((player) => {
      if (player) {
        player.safeZoneDamageCd = safeZone.damageInterval || SAFE_ZONE_DAMAGE_INTERVAL;
      }
    });
  }
  appendFrameCommand(frameCommands, buildSafeZoneStateCommand());
}

function getPlayerRuntimeRadius(player) {
  if (player && player.lastSnapshot && Number.isFinite(player.lastSnapshot.radius)) {
    return Math.max(16, player.lastSnapshot.radius);
  }
  return PLAYER_DEFAULT_RADIUS;
}

function getBushById(bushId) {
  if (bushId == null) {
    return null;
  }
  for (let i = 0; i < room.bushes.length; i++) {
    const bush = room.bushes[i];
    if (bush && bush.id === bushId) {
      return bush;
    }
  }
  return null;
}

function findBushContainingPlayer(player) {
  if (!player || player.dead || player.disconnected) {
    return null;
  }
  const pos = getPlayerRuntimePosition(player);
  const playerRadius = getPlayerRuntimeRadius(player);
  for (let i = 0; i < room.bushes.length; i++) {
    const bush = room.bushes[i];
    if (!bush) {
      continue;
    }
    const hideRadius = Math.max(24, (bush.radius || MULTIPLAYER_BUSH_RADIUS) - playerRadius * 0.22);
    if (distanceSqr(pos, bush) <= hideRadius * hideRadius) {
      return bush;
    }
  }
  return null;
}

function buildInitialBushes() {
  const source = Array.isArray(room.bushSpawnPoints) && room.bushSpawnPoints.length > 0
    ? shuffle(filterPointsInsidePreferredSafeZone(room.bushSpawnPoints, MULTIPLAYER_BUSH_RADIUS + 12))
    : [];
  const result = [];
  const spawnPositions = room.players.map((player) => getSpawnPositionBySlot(player.spawnSlot));
  for (let i = 0; i < source.length; i++) {
    const point = source[i];
    if (!point) {
      continue;
    }

    let blocked = false;
    for (let j = 0; j < spawnPositions.length; j++) {
      const spawnPos = spawnPositions[j];
      if (spawnPos && Math.sqrt(distanceSqr(spawnPos, point)) < MULTIPLAYER_BUSH_MIN_SPAWN_DISTANCE) {
        blocked = true;
        break;
      }
    }
    if (blocked) {
      continue;
    }

    for (let j = 0; j < result.length; j++) {
      const bush = result[j];
      if (Math.sqrt(distanceSqr(bush, point)) < MULTIPLAYER_BUSH_MIN_GAP) {
        blocked = true;
        break;
      }
    }
    if (blocked) {
      continue;
    }

    const pos = clampPointToBounds(point, MULTIPLAYER_BUSH_SPAWN_PADDING);
    result.push({
      id: result.length + 1,
      x: Math.round(pos.x),
      y: Math.round(pos.y),
      radius: MULTIPLAYER_BUSH_RADIUS,
    });
    if (result.length >= MULTIPLAYER_BUSH_COUNT) {
      break;
    }
  }
  return result;
}

function createCoverState(point) {
  if (!point) {
    return null;
  }
  const pos = clampPointToBounds(point, MULTIPLAYER_COVER_RADIUS + 10);
  return {
    id: room.nextCoverId++,
    x: Math.round(pos.x),
    y: Math.round(pos.y),
    radius: MULTIPLAYER_COVER_RADIUS,
    hp: MULTIPLAYER_COVER_HP,
    maxHp: MULTIPLAYER_COVER_HP,
    attached: false,
    ownerPlayerId: null,
    attachOffsetX: 0,
    attachOffsetY: 0,
  };
}

function getCoverById(coverId) {
  if (coverId == null) {
    return null;
  }
  for (let i = 0; i < room.covers.length; i++) {
    const cover = room.covers[i];
    if (cover && cover.id === coverId) {
      return cover;
    }
  }
  return null;
}

function getAttachedCoverByPlayer(player) {
  if (!player) {
    return null;
  }
  for (let i = 0; i < room.covers.length; i++) {
    const cover = room.covers[i];
    if (cover && cover.attached && cover.ownerPlayerId === player.playerId) {
      return cover;
    }
  }
  return null;
}

function buildCoverSyncCommand(cover) {
  if (!cover) {
    return null;
  }
  return {
    type: 'coverSync',
    cover: {
      id: cover.id,
      x: cover.x,
      y: cover.y,
      radius: cover.radius,
      hp: cover.hp,
      maxHp: cover.maxHp,
      attached: !!cover.attached,
      ownerPlayerId: cover.ownerPlayerId == null ? null : cover.ownerPlayerId,
      attachOffsetX: Number.isFinite(cover.attachOffsetX) ? cover.attachOffsetX : 0,
      attachOffsetY: Number.isFinite(cover.attachOffsetY) ? cover.attachOffsetY : 0,
    },
  };
}

function appendAllCoverSyncCommands(frameCommands) {
  for (let i = 0; i < room.covers.length; i++) {
    appendFrameCommand(frameCommands, buildCoverSyncCommand(room.covers[i]));
  }
}

function isCoverSpawnPointAvailable(point, result) {
  if (!point || !isPointInsidePreferredSafeZone(point, MULTIPLAYER_COVER_RADIUS + 8)) {
    return false;
  }
  for (let i = 0; i < room.players.length; i++) {
    const player = room.players[i];
    if (!player) {
      continue;
    }
    const spawnPos = getSpawnPositionBySlot(player.spawnSlot);
    if (spawnPos && Math.sqrt(distanceSqr(spawnPos, point)) < MULTIPLAYER_COVER_MIN_PLAYER_DISTANCE) {
      return false;
    }
  }
  const covers = Array.isArray(result) ? result : [];
  for (let i = 0; i < covers.length; i++) {
    const cover = covers[i];
    if (cover && Math.sqrt(distanceSqr(cover, point)) < MULTIPLAYER_COVER_MIN_GAP) {
      return false;
    }
  }
  return true;
}

function buildInitialCovers() {
  const source = Array.isArray(room.energySpawnPoints) && room.energySpawnPoints.length > 0
    ? shuffle(filterPointsInsidePreferredSafeZone(room.energySpawnPoints, MULTIPLAYER_COVER_RADIUS + 12))
    : shuffle(filterPointsInsidePreferredSafeZone(room.spawnCandidates || [], MULTIPLAYER_COVER_RADIUS + 12));
  const result = [];
  for (let i = 0; i < source.length; i++) {
    const point = source[i];
    if (!isCoverSpawnPointAvailable(point, result)) {
      continue;
    }
    const cover = createCoverState(point);
    if (cover) {
      result.push(cover);
      if (result.length >= MULTIPLAYER_COVER_COUNT) {
        return result;
      }
    }
  }
  let attempts = 0;
  while (result.length < MULTIPLAYER_COVER_COUNT && attempts < MULTIPLAYER_COVER_COUNT * 12) {
    attempts++;
    const point = chooseRandomPreferredSafePoint(MULTIPLAYER_COVER_RADIUS + 12);
    if (!isCoverSpawnPointAvailable(point, result)) {
      continue;
    }
    const cover = createCoverState(point);
    if (cover) {
      result.push(cover);
    }
  }
  return result;
}

function syncAttachedCoversFromPlayers() {
  for (let i = 0; i < room.covers.length; i++) {
    const cover = room.covers[i];
    if (!cover || !cover.attached || cover.ownerPlayerId == null) {
      continue;
    }
    const player = room.players[cover.ownerPlayerId];
    if (!player || player.dead || player.disconnected) {
      cover.attached = false;
      cover.ownerPlayerId = null;
      cover.attachOffsetX = 0;
      cover.attachOffsetY = 0;
      continue;
    }
    const playerPos = getPlayerRuntimePosition(player);
    const pos = clampPointToBounds({
      x: playerPos.x + (cover.attachOffsetX || 0),
      y: playerPos.y + (cover.attachOffsetY || 0),
    }, (cover.radius || MULTIPLAYER_COVER_RADIUS) + 6);
    cover.x = pos.x;
    cover.y = pos.y;
  }
}

function tryToggleCoverByPlayer(player, frameCommands) {
  if (!player || player.dead || player.disconnected) {
    return false;
  }
  const attached = getAttachedCoverByPlayer(player);
  if (attached) {
    attached.attached = false;
    attached.ownerPlayerId = null;
    attached.attachOffsetX = 0;
    attached.attachOffsetY = 0;
    appendFrameCommand(frameCommands, buildCoverSyncCommand(attached));
    return true;
  }
  const playerPos = getPlayerRuntimePosition(player);
  let nearest = null;
  let nearestLen = 0;
  for (let i = 0; i < room.covers.length; i++) {
    const cover = room.covers[i];
    if (!cover || cover.attached || cover.hp <= 0) {
      continue;
    }
    const len = Math.sqrt(distanceSqr(playerPos, cover));
    if (len <= MULTIPLAYER_COVER_ATTACH_DISTANCE && (nearest == null || len < nearestLen)) {
      nearest = cover;
      nearestLen = len;
    }
  }
  if (!nearest) {
    return false;
  }
  let offsetX = nearest.x - playerPos.x;
  let offsetY = nearest.y - playerPos.y;
  let len = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
  if (!Number.isFinite(len) || len <= 5) {
    const dir = getPlayerRuntimeDir(player);
    offsetX = dir.x;
    offsetY = dir.y;
    len = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
  }
  if (!Number.isFinite(len) || len <= 0.0001) {
    offsetX = 1;
    offsetY = 0;
    len = 1;
  }
  const offsetDistance = clamp(len, MULTIPLAYER_COVER_ATTACH_MIN_OFFSET, MULTIPLAYER_COVER_ATTACH_MAX_OFFSET);
  nearest.attachOffsetX = Number(((offsetX / len) * offsetDistance).toFixed(3));
  nearest.attachOffsetY = Number(((offsetY / len) * offsetDistance).toFixed(3));
  nearest.attached = true;
  nearest.ownerPlayerId = player.playerId;
  syncAttachedCoversFromPlayers();
  appendFrameCommand(frameCommands, buildCoverSyncCommand(nearest));
  return true;
}

function applySafeZoneDamageToPlayer(player, frameCommands) {
  if (!player || player.dead || player.disconnected || !room.safeZone) {
    if (player) {
      player.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;
    }
    return;
  }
  const safeZone = room.safeZone;
  let shouldDamage = false;
  if (safeZone.poisonActive) {
    shouldDamage = true;
  } else if (safeZone.active && safeZone.radius > 0) {
    const pos = getPlayerRuntimePosition(player);
    const playerRadius = getPlayerRuntimeRadius(player);
    const dx = pos.x - safeZone.centerX;
    const dy = pos.y - safeZone.centerY;
    const allowedRadius = Math.max(0, safeZone.radius - playerRadius * 0.35);
    shouldDamage = dx * dx + dy * dy > allowedRadius * allowedRadius;
  }
  if (!shouldDamage) {
    player.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;
    return;
  }

  if (!Number.isFinite(player.safeZoneDamageCd) || player.safeZoneDamageCd <= 0) {
    player.safeZoneDamageCd = SAFE_ZONE_DAMAGE_INTERVAL;
  }
  player.safeZoneDamageCd -= TICK_INTERVAL / 1000;
  while (player.safeZoneDamageCd <= 0 && !player.dead) {
    player.safeZoneDamageCd += SAFE_ZONE_DAMAGE_INTERVAL;
    let damage = safeZone.damagePerTick;
    if (safeZone.poisonActive) {
      const maxHp = Number.isFinite(player.maxHp) && player.maxHp > 0
        ? player.maxHp
        : MULTIPLAYER_FIXED_BASE_HP;
      damage = Math.max(1, Math.ceil(maxHp * (safeZone.damagePercent || SAFE_ZONE_POISON_DAMAGE_PERCENT)));
    }
    if (!Number.isFinite(damage) || damage <= 0) {
      continue;
    }
    player.hp -= damage;
    if (player.hp < 0) {
      player.hp = 0;
    }
    appendFrameCommand(frameCommands, {
      type: 'safeZoneDamage',
      playerId: player.playerId,
      damage,
      hp: player.hp,
      damageMode: safeZone.damageMode || 'outsideFlat',
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
    const safeCandidates = filterPointsInsidePreferredSafeZone(room.energySpawnPoints, 42);
    const available = safeCandidates.filter((point) => {
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
    const source = available.length > 0 ? available : safeCandidates;
    return source[Math.floor(Math.random() * source.length)] || null;
  }
  return chooseRandomPreferredSafePoint(42);
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
  for (let i = 0; i < room.blackHolePickups.length; i++) {
    const pickup = room.blackHolePickups[i];
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
  const safeCandidates = filterPointsInsidePreferredSafeZone(candidates, TAR_PICKUP_RADIUS + 12);
  const preferred = [];
  const fallback = [];
  for (let i = 0; i < safeCandidates.length; i++) {
    const point = clampPointToBounds(safeCandidates[i], TAR_PICKUP_RADIUS + 12);
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
  return chooseRandomPreferredSafePoint(TAR_PICKUP_RADIUS + 12);
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
    remainTime: TAR_PICKUP_LIFETIME,
    removed: false,
  };
}

function createBlackHolePickup(point) {
  if (!point) {
    return null;
  }
  const pos = clampPointToBounds(point, BLACK_HOLE_PICKUP_RADIUS + 12);
  return {
    id: room.nextBlackHolePickupId++,
    x: pos.x,
    y: pos.y,
    radius: BLACK_HOLE_PICKUP_RADIUS,
    remainTime: BLACK_HOLE_PICKUP_LIFETIME,
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
      remainTime: pickup.remainTime,
    },
  });
  return pickup;
}

function spawnBlackHolePickupInFrame(frameCommands) {
  const aliveCount = room.blackHolePickups.filter((pickup) => pickup && !pickup.removed).length;
  if (aliveCount >= BLACK_HOLE_PICKUP_MAX_COUNT) {
    return null;
  }
  const pickup = createBlackHolePickup(chooseTarPickupSpawnPoint());
  if (!pickup) {
    return null;
  }
  room.blackHolePickups.push(pickup);
  appendFrameCommand(frameCommands, {
    type: 'blackHolePickupSpawn',
    pickup: {
      id: pickup.id,
      x: pickup.x,
      y: pickup.y,
      radius: pickup.radius,
      remainTime: pickup.remainTime,
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

function removeBlackHolePickupInFrame(pickupId, frameCommands, reason = 'pickup') {
  const index = room.blackHolePickups.findIndex((item) => item && item.id === pickupId && !item.removed);
  if (index < 0) {
    return null;
  }
  const pickup = room.blackHolePickups[index];
  pickup.removed = true;
  room.blackHolePickups.splice(index, 1);
  appendFrameCommand(frameCommands, {
    type: 'blackHolePickupRemove',
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

function tryConsumeBlackHolePickup(player, pickupId, frameCommands) {
  if (!player || player.dead || player.disconnected || pickupId == null) {
    return false;
  }
  if ((player.blackHoleAmmoCount || 0) >= 1) {
    return false;
  }
  const pickup = room.blackHolePickups.find((item) => item && item.id === pickupId && !item.removed);
  if (!pickup) {
    return false;
  }
  const playerPos = getPlayerRuntimePosition(player);
  if (Math.sqrt(distanceSqr(playerPos, pickup)) > BLACK_HOLE_PICKUP_TOUCH_RADIUS) {
    return false;
  }
  if (!removeBlackHolePickupInFrame(pickupId, frameCommands, 'pickup')) {
    return false;
  }
  player.blackHoleAmmoCount = 1;
  room.blackHolePickupSpawnCd = randomBetween(BLACK_HOLE_PICKUP_RESPAWN_MIN, BLACK_HOLE_PICKUP_RESPAWN_MAX);
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

function createBlackHoleZone(point) {
  if (!point) {
    return null;
  }
  const pos = clampPointToBounds(point, BLACK_HOLE_ZONE_RADIUS + 20);
  return {
    id: room.nextBlackHoleZoneId++,
    x: pos.x,
    y: pos.y,
    radius: BLACK_HOLE_ZONE_RADIUS,
    destroyRadius: BLACK_HOLE_ZONE_DESTROY_RADIUS,
    gravityStrength: BLACK_HOLE_ZONE_GRAVITY,
    duration: BLACK_HOLE_ZONE_DURATION,
    remainTime: BLACK_HOLE_ZONE_DURATION,
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

function spawnBlackHoleZoneInFrame(zone, player, frameCommands) {
  if (!zone) {
    return null;
  }
  room.blackHoleZones.push(zone);
  appendFrameCommand(frameCommands, {
    type: 'blackHoleZoneSpawn',
    zone: {
      id: zone.id,
      x: zone.x,
      y: zone.y,
      radius: zone.radius,
      destroyRadius: zone.destroyRadius,
      gravityStrength: zone.gravityStrength,
      duration: zone.duration,
      remainTime: zone.remainTime,
      ownerPlayerId: player ? player.playerId : -1,
    },
  });
  return zone;
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

function removeBlackHoleZoneInFrame(zoneId, frameCommands, reason = 'timeout') {
  const zone = room.blackHoleZones.find((item) => item && item.id === zoneId && !item.removed);
  if (!zone) {
    return;
  }
  zone.removed = true;
  appendFrameCommand(frameCommands, {
    type: 'blackHoleZoneRemove',
    zoneId,
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

function tryThrowBlackHoleByPlayer(player, throwPayload, frameCommands) {
  if (!player || player.dead || player.disconnected || !throwPayload) {
    return false;
  }
  if ((player.blackHoleAmmoCount || 0) <= 0) {
    return false;
  }
  const playerPos = getPlayerRuntimePosition(player);
  const attackRadius = Number.isFinite(player.baseAttackRadius) && player.baseAttackRadius > 0
    ? player.baseAttackRadius
    : 420;
  const runtimeDir = getPlayerRuntimeDir(player);
  const normalized = Number.isFinite(throwPayload.dirX) && Number.isFinite(throwPayload.dirY)
    ? { x: throwPayload.dirX, y: throwPayload.dirY }
    : runtimeDir;
  const ratio = Number.isFinite(throwPayload.ratio) ? clamp(throwPayload.ratio, 0, 1) : 1;
  const throwDistance = Math.max(30, attackRadius * ratio);
  const target = clampPointToBounds({
    x: playerPos.x + normalized.x * throwDistance,
    y: playerPos.y + normalized.y * throwDistance,
  }, BLACK_HOLE_ZONE_RADIUS + 20);
  const zone = createBlackHoleZone(target);
  if (!zone) {
    return false;
  }
  player.blackHoleAmmoCount = 0;
  appendFrameCommand(frameCommands, {
    type: 'blackHoleThrow',
    playerId: player.playerId,
    from: {
      x: playerPos.x,
      y: playerPos.y,
    },
    to: {
      x: zone.x,
      y: zone.y,
    },
    zoneId: zone.id,
    flightTime: 0.28,
  });
  spawnBlackHoleZoneInFrame(zone, player, frameCommands);
  return true;
}

function updateTarPickupSpawns(frameCommands) {
  for (let i = room.tarPickups.length - 1; i >= 0; i--) {
    const pickup = room.tarPickups[i];
    if (!pickup || pickup.removed) {
      continue;
    }
    if (Number.isFinite(pickup.remainTime)) {
      pickup.remainTime -= TICK_INTERVAL / 1000;
      if (pickup.remainTime <= 0) {
        pickup.remainTime = 0;
        removeTarPickupInFrame(pickup.id, frameCommands, 'timeout');
      }
    }
  }
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

function updateBlackHolePickupSpawns(frameCommands) {
  for (let i = room.blackHolePickups.length - 1; i >= 0; i--) {
    const pickup = room.blackHolePickups[i];
    if (!pickup || pickup.removed) {
      continue;
    }
    if (Number.isFinite(pickup.remainTime)) {
      pickup.remainTime -= TICK_INTERVAL / 1000;
      if (pickup.remainTime <= 0) {
        pickup.remainTime = 0;
        removeBlackHolePickupInFrame(pickup.id, frameCommands, 'timeout');
      }
    }
  }
  const aliveCount = room.blackHolePickups.filter((pickup) => pickup && !pickup.removed).length;
  if (aliveCount >= BLACK_HOLE_PICKUP_MAX_COUNT) {
    return;
  }
  if (room.elapsedSeconds < BLACK_HOLE_PICKUP_START_DELAY) {
    return;
  }
  if (room.blackHolePickupSpawnCd > 0) {
    room.blackHolePickupSpawnCd -= TICK_INTERVAL / 1000;
    return;
  }
  if (room.players.some((player) => (player && !player.dead && !player.disconnected && (player.blackHoleAmmoCount || 0) > 0))) {
    room.blackHolePickupSpawnCd = 1;
    return;
  }
  spawnBlackHolePickupInFrame(frameCommands);
  room.blackHolePickupSpawnCd = randomBetween(BLACK_HOLE_PICKUP_RESPAWN_MIN, BLACK_HOLE_PICKUP_RESPAWN_MAX);
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

function updateBlackHoleZones(frameCommands) {
  for (let i = 0; i < room.blackHoleZones.length; i++) {
    const zone = room.blackHoleZones[i];
    if (!zone || zone.removed) {
      continue;
    }
    zone.remainTime -= TICK_INTERVAL / 1000;
    if (zone.remainTime <= 0) {
      zone.remainTime = 0;
      removeBlackHoleZoneInFrame(zone.id, frameCommands, 'timeout');
    }
  }
  room.blackHoleZones = room.blackHoleZones.filter((zone) => zone && !zone.removed);
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
  const points = filterPointsInsidePreferredSafeZone(getSpecialEventSpawnSources(), padding);
  if (points.length > 0) {
    const preferred = points.filter((point) => isSpecialEventPointAvailable(point, padding));
    const source = preferred.length > 0 ? preferred : points;
    const picked = pickOne(source);
    if (picked) {
      return clampPointToBounds({ x: picked.x, y: picked.y }, padding);
    }
  }
  return chooseRandomPreferredSafePoint(padding);
}

function choosePortalPair() {
  const entry = chooseSpecialEventPoint(SPECIAL_EVENT_PORTAL_RADIUS + 40);
  const points = filterPointsInsidePreferredSafeZone(getSpecialEventSpawnSources(), SPECIAL_EVENT_PORTAL_RADIUS + 40);
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
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = randomBetween(SPECIAL_EVENT_PORTAL_PAIR_MIN, SPECIAL_EVENT_PORTAL_PAIR_MAX);
      const point = clampPointToBounds({
        x: entry.x + Math.cos(angle) * distance,
        y: entry.y + Math.sin(angle) * distance,
      }, SPECIAL_EVENT_PORTAL_RADIUS + 40);
      if (isPointInsidePreferredSafeZone(point, SPECIAL_EVENT_PORTAL_RADIUS + 40)) {
        exit = point;
        break;
      }
    }
  }
  if (!exit) {
    exit = chooseRandomPreferredSafePoint(SPECIAL_EVENT_PORTAL_RADIUS + 40);
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

function spawnSpecialEventInFrame(frameCommands, maxActiveCount = 1, preferredType = '') {
  if (room.activeSpecialEvents.length >= maxActiveCount) {
    return null;
  }
  const eventTypes = ['portal', 'damageDouble', 'speedDouble'];
  const eventType = preferredType && eventTypes.indexOf(preferredType) >= 0
    ? preferredType
    : pickOne(eventTypes);
  const eventData = buildSpecialEventPayload(eventType);
  eventData.remainTime = eventData.duration;
  room.activeSpecialEvents.push(eventData);
  appendFrameCommand(frameCommands, {
    type: 'specialEventSpawn',
    event: eventData,
  });
  return eventData;
}

function removeSpecialEventInFrame(eventId, frameCommands, reason = 'timeout') {
  const index = room.activeSpecialEvents.findIndex((item) => item && item.id === eventId);
  if (index < 0) {
    return;
  }
  const active = room.activeSpecialEvents[index];
  room.activeSpecialEvents.splice(index, 1);
  if (room.activeSpecialEvents.length <= 0) {
    room.specialEventSpawnCd = randomBetween(SPECIAL_EVENT_RESPAWN_MIN, SPECIAL_EVENT_RESPAWN_MAX);
  }
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
  for (let i = room.activeSpecialEvents.length - 1; i >= 0; i--) {
    const eventData = room.activeSpecialEvents[i];
    if (!eventData) {
      room.activeSpecialEvents.splice(i, 1);
      continue;
    }
    eventData.remainTime -= TICK_INTERVAL / 1000;
    if (eventData.remainTime <= 0) {
      eventData.remainTime = 0;
      removeSpecialEventInFrame(eventData.id, frameCommands, 'timeout');
    }
  }
  if (room.activeSpecialEvents.length > 0) {
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

function spawnInitialMatchPickups() {
  const total = Math.max(0, MULTIPLAYER_INITIAL_PICKUP_COUNT);
  for (let i = 0; i < total; i++) {
    if (i % 2 === 0) {
      const pickup = createTarPickup(chooseTarPickupSpawnPoint());
      if (pickup) {
        room.tarPickups.push(pickup);
      }
    } else {
      const pickup = createBlackHolePickup(chooseTarPickupSpawnPoint());
      if (pickup) {
        room.blackHolePickups.push(pickup);
      }
    }
  }
}

function spawnInitialSpecialEvents() {
  const initialTypes = ['portal', 'damageDouble', 'speedDouble'];
  const total = Math.max(0, MULTIPLAYER_INITIAL_SPECIAL_EVENT_COUNT);
  for (let i = 0; i < total; i++) {
    const preferredType = initialTypes[i % initialTypes.length];
    spawnSpecialEventInFrame(null, total, preferredType);
  }
}

function buildPlayerStateCommand(player) {
  const bush = findBushContainingPlayer(player);
  player.inBush = !!bush;
  player.bushId = bush ? bush.id : null;
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
    blackHoleAmmoCount: player.blackHoleAmmoCount || 0,
    freeBulletCount: clamp(Math.round(player.freeBulletCount || 0), 0, PLAYER_FREE_BULLET_MAX),
    stopFireTime: Math.max(0, player.stopFireTime || 0),
    freeBulletRecoverTime: Math.max(0, player.freeBulletRecoverTime || 0),
    shotCooldownRemaining: Math.max(0, player.shotCooldownRemaining || 0),
    inBush: !!player.inBush,
    bushId: player.bushId == null ? null : player.bushId,
    dead: !!player.dead,
    disconnected: !!player.disconnected,
  };
}

function tickPlayerFireState(player) {
  if (!player) {
    return;
  }
  player.shotCooldownRemaining = Math.max(0, (player.shotCooldownRemaining || 0) - TICK_INTERVAL / 1000);
  if ((player.freeBulletCount || 0) >= PLAYER_FREE_BULLET_MAX) {
    player.stopFireTime = 0;
    player.freeBulletRecoverTime = 0;
    player.freeBulletCount = PLAYER_FREE_BULLET_MAX;
    return;
  }
  player.stopFireTime = Math.max(0, (player.stopFireTime || 0) + TICK_INTERVAL / 1000);
  if (player.stopFireTime < PLAYER_FREE_BULLET_RECOVER_DELAY) {
    player.freeBulletRecoverTime = 0;
    return;
  }
  player.freeBulletRecoverTime = Math.max(0, (player.freeBulletRecoverTime || 0) + TICK_INTERVAL / 1000);
  while (player.freeBulletRecoverTime >= PLAYER_FREE_BULLET_RECOVER_INTERVAL
    && player.freeBulletCount < PLAYER_FREE_BULLET_MAX) {
    player.freeBulletRecoverTime -= PLAYER_FREE_BULLET_RECOVER_INTERVAL;
    player.freeBulletCount += 1;
  }
  if (player.freeBulletCount >= PLAYER_FREE_BULLET_MAX) {
    player.freeBulletCount = PLAYER_FREE_BULLET_MAX;
    player.freeBulletRecoverTime = 0;
  }
}

function buildPlayerFireStateCommand(player, paidShot = false) {
  return {
    type: 'playerFireState',
    playerId: player.playerId,
    hp: player.hp,
    maxHp: player.maxHp,
    freeBulletCount: clamp(Math.round(player.freeBulletCount || 0), 0, PLAYER_FREE_BULLET_MAX),
    stopFireTime: Math.max(0, player.stopFireTime || 0),
    freeBulletRecoverTime: Math.max(0, player.freeBulletRecoverTime || 0),
    shotCooldownRemaining: Math.max(0, player.shotCooldownRemaining || 0),
    paidShot: !!paidShot,
  };
}

function canPlayerAffordPaidBullet(player) {
  return !!player && Number(player.hp) > PLAYER_PAID_SHOT_HP_COST;
}

function tryFireByPlayer(player, fireInput, frameCommands) {
  if (!player || player.dead || player.disconnected || !fireInput || !fireInput.id) {
    return null;
  }
  if ((player.shotCooldownRemaining || 0) > 0) {
    return null;
  }
  if ((player.freeBulletCount || 0) <= 0 && !canPlayerAffordPaidBullet(player)) {
    return null;
  }

  let paidShot = false;
  if ((player.freeBulletCount || 0) > 0) {
    player.freeBulletCount -= 1;
  } else {
    paidShot = true;
    player.hp -= PLAYER_PAID_SHOT_HP_COST;
    if (player.hp < 0) {
      player.hp = 0;
    }
  }
  player.stopFireTime = 0;
  player.freeBulletRecoverTime = 0;
  player.shotCooldownRemaining = PLAYER_SHOOT_INTERVAL;

  room.bullets[fireInput.id] = {
    id: fireInput.id,
    playerId: player.playerId,
    damage: player.atk == null ? 5 : player.atk,
  };

  appendFrameCommand(frameCommands, buildPlayerFireStateCommand(player, paidShot));
  return {
    id: fireInput.id,
    type: fireInput.type,
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
  const candidates = filterPointsInsidePreferredSafeZone(room.energySpawnPoints || [], ENERGY_EGG_RADIUS + 8);
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
  return chooseRandomPreferredSafePoint(ENERGY_EGG_RADIUS + 8);
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
      throwBlackHole: false,
      toggleCover: false,
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

    tickPlayerFireState(p);
    inputs.up = !!(p.lastInputs && p.lastInputs.up);
    inputs.down = !!(p.lastInputs && p.lastInputs.down);
    inputs.left = !!(p.lastInputs && p.lastInputs.left);
    inputs.right = !!(p.lastInputs && p.lastInputs.right);
    inputs.aim = p.lastInputs && p.lastInputs.aim ? p.lastInputs.aim : null;
    let pendingFire = null;

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
        pendingFire = src.fire;
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
      if (src.pickupBlackHoleId != null) {
        tryConsumeBlackHolePickup(p, src.pickupBlackHoleId, eventCommands);
      }
      if (src.throwTar) {
        inputs.throwTar = src.throwTar;
      }
      if (src.throwBlackHole) {
        inputs.throwBlackHole = src.throwBlackHole;
      }
      if (src.toggleCover) {
        inputs.toggleCover = true;
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

    const acceptedFire = tryFireByPlayer(p, pendingFire, eventCommands);
    if (acceptedFire) {
      inputs.fire = acceptedFire;
    }

    if (inputs.throwTar) {
      tryThrowTarByPlayer(p, sanitizeThrowTarPayload(inputs.throwTar), eventCommands);
    }
    if (inputs.throwBlackHole) {
      tryThrowBlackHoleByPlayer(p, sanitizeThrowTarPayload(inputs.throwBlackHole), eventCommands);
    }
    syncAttachedCoversFromPlayers();
    if (inputs.toggleCover) {
      tryToggleCoverByPlayer(p, eventCommands);
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
  appendAllCoverSyncCommands(frameCommands);
  updateSpecialEvents(frameCommands);
  updateTarPickupSpawns(frameCommands);
  updateBlackHolePickupSpawns(frameCommands);
  updateTarSpills(frameCommands);
  updateBlackHoleZones(frameCommands);
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
  room.activeSpecialEvents = [];
  room.tarPickups = [];
  room.nextTarPickupId = 1;
  room.tarPickupSpawnCd = 0;
  room.tarSpills = [];
  room.nextTarSpillId = 1;
  room.blackHolePickups = [];
  room.nextBlackHolePickupId = 1;
  room.blackHolePickupSpawnCd = 0;
  room.blackHoleZones = [];
  room.nextBlackHoleZoneId = 1;
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
  room.bushes = buildInitialBushes();
  room.covers = buildInitialCovers();

  for (let i = 0; i < Math.min(ENERGY_MAX_COUNT, 3); i++) {
    spawnEnergy();
  }
  spawnInitialMatchPickups();
  spawnInitialSpecialEvents();

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
      specialEvents: room.activeSpecialEvents.slice(),
      tarPickups: room.tarPickups,
      tarSpills: room.tarSpills,
      blackHolePickups: room.blackHolePickups,
      blackHoleZones: room.blackHoleZones,
      bushes: room.bushes,
      covers: room.covers,
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
        blackHoleAmmoCount: player.blackHoleAmmoCount || 0,
        freeBulletCount: clamp(Math.round(player.freeBulletCount || 0), 0, PLAYER_FREE_BULLET_MAX),
        stopFireTime: Math.max(0, player.stopFireTime || 0),
        freeBulletRecoverTime: Math.max(0, player.freeBulletRecoverTime || 0),
        shotCooldownRemaining: Math.max(0, player.shotCooldownRemaining || 0),
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
      if (Array.isArray(msg.payload && msg.payload.bushSpawnPoints) && msg.payload.bushSpawnPoints.length > 0) {
        room.bushSpawnPoints = sanitizeSpawnPoints(msg.payload.bushSpawnPoints);
      }
      if (Array.isArray(msg.payload && msg.payload.bushes) && msg.payload.bushes.length > 0) {
        room.bushes = sanitizeBushes(msg.payload.bushes);
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
  room.bushSpawnPoints = [];
  room.bushes = [];
  room.covers = [];
  room.nextCoverId = 1;
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
  room.activeSpecialEvents = [];
  room.tarPickups = [];
  room.nextTarPickupId = 1;
  room.tarPickupSpawnCd = 0;
  room.tarSpills = [];
  room.nextTarSpillId = 1;
  room.blackHolePickups = [];
  room.nextBlackHolePickupId = 1;
  room.blackHolePickupSpawnCd = 0;
  room.blackHoleZones = [];
  room.nextBlackHoleZoneId = 1;
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
