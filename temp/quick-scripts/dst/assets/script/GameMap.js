
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/GameMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d08c+OFxdNxoRhDPzv8dMo', 'GameMap');
// script/GameMap.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var LocalizedData_1 = require("./base/LocalizedData");
var EnergyItem_1 = require("./EnergyItem");
var EnergyEgg_1 = require("./EnergyEgg");
var MusicManager_1 = require("./base/MusicManager");
var RippleShockwave_1 = require("./effect/RippleShockwave");
var OilPickup_1 = require("./OilPickup");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
var Analytics_1 = require("./ad/Analytics");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KILL_STREAK_WINDOW = 20;
var KILL_BROADCAST_MAX_VISIBLE = 3;
var KILL_BROADCAST_SLOT_HEIGHT = 64;
var KILL_BROADCAST_DURATION = 2.2;
var OIL_SPILL_DURATION = 10;
var OIL_SPILL_RADIUS = 120;
var OIL_SPILL_SLOW_FACTOR = 0.52;
var TAR_SPILL_RADIUS = 120;
var TAR_PICKUP_SINGLEPLAYER_INTERVAL = 6;
var OIL_SPILL_FRAME_UUID = "53a52397-be71-4b1e-bd93-96c5b9a7f2ce";
var COVER_TEST_FRAME_UUID = "f27215a4-32b0-4a3c-b87d-69a3dc03e37a";
var ENERGY_EGG_FRAME_UUID = "5c9b12c3-9fd1-4472-b633-d31d7ce29bf2";
var TREE_GREEN_LARGE_FRAME_UUID = "8d3f2edb-e27b-4029-af69-6c0bb54a056d";
var KILL_TEST_VICTIM_NAMES = ["疾风号", "黑虎机", "钢牙炮手", "赤焰战车", "重锤坦克"];
var KILL_BADGE_FRAME_UUIDS = {
    1: "91b6ef23-19f3-4d75-9e4c-4ee246eee6f7",
    2: "58a666b7-ae8d-4622-82c3-03d89b76627b",
    3: "e957568c-29a0-4e89-84d5-38cd02496537",
    4: "eff4de59-56d1-4ded-a05b-0fbe8c81adff",
    5: "fbdd351f-3d96-4823-9e4a-ea213085f9b7"
};
var KILL_BADGE_TINTS = {
    1: [255, 255, 255],
    2: [205, 127, 50],
    3: [220, 232, 242],
    4: [255, 215, 0],
    5: [186, 102, 255]
};
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
var GameMap = /** @class */ (function (_super) {
    __extends(GameMap, _super);
    function GameMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tree01Prefab = null;
        _this.tree02Prefab = null;
        _this.mountain01Prefab = null;
        _this.mountain02Prefab = null;
        _this.mountain03Prefab = null;
        _this.bulletPrefab = null;
        _this.enemyPrefab = null;
        _this.playerPrefab = null;
        _this.skillPrefab = null;
        _this.energyPrefab = null;
        //内部变量
        _this._tiledMap = null; //Tiled Map
        _this._tmGroup = null; //普通层
        _this._tmObj = null; //对象层(障碍物)
        _this._tmBorn = null; //对象层(出生点)
        _this._tmDecal = null; //地表贴花层(地图与坦克之间)
        _this._tmSize = null; //地图尺寸
        _this._tileSize = null; //瓦片尺寸
        _this._colliders = []; //碰撞检测列表
        _this._checkList = {}; //A*检测列表
        _this._logicArea = []; //逻辑碰撞分区
        _this._player = null; //玩家
        _this._enemys = []; //敌人列表
        _this._playerBornPos = null; //player出生点
        _this._enemyBornPos = []; //敌人出生点列表
        _this._bornCdTime = 0; //敌人生成间隔时间
        _this._bornEnemyCount = 0; //已经出生的敌人数量
        _this._deathEnemyCount = 0; //已经死亡的敌人数量
        _this._maxEnemyCount = 0; //最大敌人数量
        _this._timeMaxEnemyCount = 0; //同屏最大敌人数量
        _this._skills = []; //随机生成的技能
        _this._energys = []; //地图上的能量
        _this._energyCdTime = 0; //能量生成间隔时间
        _this._tarPickupCdTime = 0; //单机焦油拾取物生成间隔
        _this._pause = false; //是否处于暂停状态
        _this._gaming = false; //是否处于游戏中 
        _this._killEffectTestMode = false; //击杀效果测试模式
        _this._killBroadcastTestMode = false; //击杀广播测试模式
        _this._playerHitTestMode = false; //受击测试模式
        _this._upgradeTestMode = false; //升级测试模式
        _this._shootEffectTestMode = false; //子弹射击测试模式
        _this._portalTestMode = false; //传送门测试模式
        _this._centrifugalRingTestMode = false; //离心力圈测试模式
        _this._coverTestMode = false; //掩体测试模式
        _this._energyEggTestMode = false; //能量蛋收藏测试模式
        _this._damageDoubleTestMode = false; //伤害翻倍区域测试模式
        _this._damageDoubleAreaData = null;
        _this._speedDoubleTestMode = false; //速度翻倍区域测试模式
        _this._speedDoubleAreaData = null;
        _this._spreadBulletTestMode = false; //子弹扩散区域测试模式
        _this._spreadBulletAreaData = null;
        _this._bounceObstacleTestMode = false; //子弹反弹障碍测试模式
        _this._bounceObstacles = [];
        _this._blackHoleTestMode = false; //黑洞区域测试模式
        _this._blackHoleAreaData = null;
        _this._clusterBombTestMode = false; //集束炸弹测试模式
        _this._multiplayerMode = false; //多人模式
        _this._multiplayerPlayers = []; //多人玩家列表
        _this._multiplayerBullets = {}; //多人同步子弹
        _this._multiplayerEnergyMap = {}; //多人同步能量
        _this._multiplayerEnergyEggMap = {}; //多人同步能量蛋
        _this._multiplayerSpecialEventMap = {};
        _this._multiplayerTarPickupMap = {};
        _this._multiplayerTarSpillMap = {};
        _this._multiplayerSafeZone = null;
        _this._multiplayerSafeZoneNode = null;
        _this._pendingTarThrowMap = {};
        _this._localPlayerId = 0; //本地玩家ID
        _this._multiplayerSpawnSlots = []; //多人出生槽位
        _this._levelId = 1; //当前关卡id
        _this._levelConfig = null; //当前关卡配置
        _this._roamFlg = false; //漫游标记
        _this._roamDir = cc.v2(1, 0); //漫游方向
        _this._playerLastPos = 0;
        _this._rippleDistortionEffect = null;
        _this._rippleCaptureCamera = null;
        _this._rippleCaptureCameraNode = null;
        _this._killBroadcastLayer = null;
        _this._killBroadcastEntries = [];
        _this._killBadgeLayer = null;
        _this._killBadgeActiveNode = null;
        _this._killBadgeFrames = {};
        _this._killBadgeLoading = {};
        _this._killStreakCount = 0;
        _this._killStreakRemain = 0;
        _this._portalPairs = [];
        _this._centrifugalRingData = null;
        _this._oilSpills = [];
        _this._oilShellPreviewNode = null;
        _this._oilSpillFrame = null;
        _this._oilSpillFrameLoading = false;
        _this._oilSpillFrameCallbacks = [];
        _this._coverTestCovers = [];
        _this._coverTestFrame = null;
        _this._coverTestFrameLoading = false;
        _this._coverTestFrameCallbacks = [];
        _this._coverTestEnemy = null;
        _this._energyEggFrame = null;
        _this._energyEggFrameLoading = false;
        _this._energyEggFrameCallbacks = [];
        _this._energyEggBushFrame = null;
        _this._energyEggBushFrameLoading = false;
        _this._energyEggBushFrameCallbacks = [];
        _this._energyEggs = [];
        _this._energyEggBushes = [];
        return _this;
    }
    //加载完成
    GameMap.prototype.onLoad = function () {
        //开启碰撞监听
        // cc.director.getCollisionManager().enabled = true;
        // //开启绘制碰撞组件的形状
        // cc.director.getCollisionManager().enabledDebugDraw  = true;
        // // 显示碰撞组件的包围盒
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        //初始化变量
        this._initVariable();
        //初始化事件
        this._initEvent();
        //初始化tiled map 的对象(障碍物)
        this._initTmObstacle();
        //初始化tiled map 的对象(出生点)
        this._initTmBorn();
        this._preloadRippleDistortionEffect();
        this._preloadKillBroadcastBadgeFrames();
        this._preloadOilSpillFrame();
        this._preloadCoverTestFrame();
        this._preloadEnergyEggFrame();
        this._preloadEnergyEggBushFrame();
    };
    GameMap.prototype.onDestroy = function () {
        this._destroyRippleCaptureResources();
        this._destroyKillBroadcastUi();
        this._destroyKillBadgeUi();
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    GameMap.prototype._initVariable = function () {
        this._tiledMap = this.node["$TiledMap"];
        this._tmGroup = this._fire._tmLayerGroup.$TiledLayer;
        // this._fire._tmLayerGroup.active = false;
        this._tmObj = this._fire._tmLayerObstacle.$TiledObjectGroup;
        this._tmBorn = this._fire._tmLayerBorn.$TiledObjectGroup;
        this._tmDecal = this._ensureDecalLayer();
        this._tmSize = this.node.getContentSize();
        // this._tmSize = new cc.Size(this._tiledMap.getMapSize().width * this._tiledMap.getTileSize().width, this._tiledMap.getMapSize().height * this._tiledMap.getTileSize().height);
        this._tileSize = this._tiledMap.getTileSize();
    };
    GameMap.prototype._ensureDecalLayer = function () {
        if (this._fire._tmLayerDecal && cc.isValid(this._fire._tmLayerDecal)) {
            return this._fire._tmLayerDecal;
        }
        var layer = new cc.Node("_tmLayerDecal");
        layer.parent = this.node;
        layer.setContentSize(this.node.getContentSize());
        layer.setAnchorPoint(0.5, 0.5);
        layer.setPosition(0, 0);
        var obstacleIndex = this._fire._tmLayerObstacle ? this._fire._tmLayerObstacle.getSiblingIndex() : this.node.childrenCount;
        layer.setSiblingIndex(Math.max(0, obstacleIndex));
        this._fire._tmLayerDecal = layer;
        return layer;
    };
    //初始化事件
    GameMap.prototype._initEvent = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    };
    //销毁事件
    GameMap.prototype._destroyEvent = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    };
    //初始化tiled map 的对象(障碍物)
    GameMap.prototype._initTmObstacle = function () {
        var _startTime = (new Date()).valueOf();
        var objects = this._tmObj.getObjects();
        console.log("objects11", objects);
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            //获取位置
            var tiledPos = cc.v2(obj.offset.x + obj.width / 2, obj.offset.y + obj.height / 2);
            var offset = this._tilePosToGamePos(tiledPos);
            if (obj.name != "") {
                var obstacle = void 0;
                if (obj.name == "tree01") {
                    obstacle = cc.instantiate(this.tree01Prefab);
                }
                else if (obj.name == "tree02") {
                    obstacle = cc.instantiate(this.tree02Prefab);
                }
                else if (obj.name == "mountain01") {
                    obstacle = cc.instantiate(this.mountain01Prefab);
                }
                else if (obj.name == "mountain02") {
                    obstacle = cc.instantiate(this.mountain02Prefab);
                }
                else if (obj.name == "mountain03") {
                    obstacle = cc.instantiate(this.mountain03Prefab);
                }
                obstacle.parent = this._fire._tmLayerObstacle;
                obstacle.position = cc.v3(offset);
                obstacle.zIndex = this.judgezIndex(offset.y);
            }
            for (var j = 0; j < obj.polylinePoints.length - 1; j++) {
                var start = obj.polylinePoints[j];
                var end = obj.polylinePoints[j + 1];
                //创建collider line
                var collider = this.node.addComponent(cc.PolygonCollider);
                collider.offset = offset;
                collider.tag = obj.name;
                collider.points[0] = cc.v2(start);
                collider.points[1] = cc.v2(end);
                collider.points.splice(2, 2);
                this._colliders.push(collider);
            }
        }
        var _endTime = (new Date()).valueOf();
        var cost = _endTime - _startTime;
        // cc.log("++++++++++++_initTmObstacle time1 ",cost);
        _startTime = (new Date()).valueOf();
        /////////////////////
        var logicWidth = this._tmSize.width / 4;
        var logicHeight = this._tmSize.height / 4;
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 6; y++) {
                var area = [];
                area.x = x * logicWidth - this._tmSize.width / 2;
                area.y = y * logicHeight - this._tmSize.height / 2;
                area.width = logicWidth;
                area.height = logicHeight;
                var rect = new cc.Rect(area.x - 10, area.y - 10, logicWidth + 20, logicHeight + 20);
                for (var i = 0; i < this._colliders.length; i++) {
                    var collider = this._colliders[i];
                    var A = collider.offset.add(collider.points[0]);
                    var B = collider.offset.add(collider.points[1]);
                    if (this._lineInRect(A, B, rect)) {
                        area.push({ A: A, B: B });
                    }
                }
                this._logicArea.push(area);
            }
        }
        /////////////////////
        _endTime = (new Date()).valueOf();
        cost = _endTime - _startTime;
        // cc.log("++++++++++++_initTmObstacle time2 ",cost);
    };
    //初始化tiled map 的对象(出生点)
    GameMap.prototype._initTmBorn = function () {
        var objects = this._tmBorn.getObjects();
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            var offset = this._tilePosToGamePos(obj.offset);
            if (obj.name == "player") {
                this._playerBornPos = offset;
            }
            else {
                var tile = this.gamePosToTile(offset);
                var pos = cc.v3(this.tileToGamePos(tile));
                this._enemyBornPos.push(pos);
                // this._tmGroup.setTileGIDAt(5, tile); 
            }
        }
    };
    GameMap.prototype.start = function () {
        var _startTime = (new Date()).valueOf();
        this._checkList = this.initCheckList();
        var _endTime = (new Date()).valueOf();
        var cost = _endTime - _startTime;
        // cc.log("+cost time ",cost);
    };
    //生成player
    GameMap.prototype.createPlayer = function () {
        var playerType = LocalizedData_1.LocalizedData.getIntItem("_current_player_type_", 1);
        var playerLevel = LocalizedData_1.LocalizedData.getIntItem("_player_" + playerType + "_", 1);
        this._player = cc.instantiate(this.playerPrefab);
        this._player.parent = this._fire._tmLayerObstacle;
        this._player.position = this._playerBornPos;
        this._player.script.setMap(this);
        this._player.script.setPlayerType(playerType, playerLevel);
        this._player.script.setInGame();
    };
    //生成一个敌人
    GameMap.prototype.createEnemy = function () {
        if (this.isTestMode()) {
            return;
        }
        //随机精英怪
        var ememyType = 11;
        var random = Math.random() * 100;
        if (random < 4) {
            ememyType = 12;
        }
        if (random < 1) {
            ememyType = 13;
        }
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = this._enemyBornPos[Math.floor(Math.random() * this._enemyBornPos.length)];
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(ememyType, this._levelId);
        this._enemys.push(enemy);
    };
    //生成一个受击测试敌人
    GameMap.prototype.createPlayerHitTestEnemy = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        var pos = cc.v2(this._player.position).add(cc.v2(230, 0));
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 80));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._config = Object.assign({}, enemy.script._config);
        enemy.script._config.AttackRadius = 520;
        enemy.script._config.BulletCodeTime = 0.45;
        enemy.script._bulletCodeTime = enemy.script._config.BulletCodeTime;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
    };
    //生成一个残血测试敌人
    GameMap.prototype.createKillEffectTestEnemy = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        var pos = cc.v2(this._player.position).add(cc.v2(260, 0));
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 80));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 1;
        enemy.script.refreshHp();
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
    };
    GameMap.prototype.createKillBroadcastTestEnemies = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        var count = 5;
        var radius = 260;
        for (var i = 0; i < count; i++) {
            var enemy = cc.instantiate(this.enemyPrefab);
            enemy.parent = this._fire._tmLayerObstacle;
            var angle = Math.PI * 2 * i / count - Math.PI * 0.5;
            var pos = cc.v2(this._player.position).add(cc.v2(Math.cos(angle) * radius, Math.sin(angle) * radius));
            enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
            enemy.script.setMap(this);
            enemy.script.setTarget(this._player);
            enemy.script.setEnemyType(11, this._levelId);
            enemy.script._hp = 1;
            enemy.script.refreshHp();
            enemy.script.enabled = false;
            enemy["_killVictimName"] = KILL_TEST_VICTIM_NAMES[i] || ("敌方" + (i + 1) + "号");
            enemy.zIndex = this.judgezIndex(enemy.y);
            this._enemys.push(enemy);
        }
    };
    //生成一个残血状态展示敌人
    GameMap.prototype.createLowHpTestEnemy = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        var pos = cc.v2(this._player.position).add(cc.v2(260, 0));
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 80));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._config = Object.assign({}, enemy.script._config);
        enemy.script._config.AttackRadius = 9999;
        enemy.script._config.BulletCodeTime = 1.2;
        enemy.script._bulletCodeTime = enemy.script._config.BulletCodeTime;
        enemy.script._hp = Math.max(1, Math.floor(enemy.script._maxHp * 0.18));
        if (enemy.script._hp >= enemy.script._maxHp) {
            enemy.script._hp = Math.max(1, enemy.script._maxHp - 1);
        }
        enemy.script.refreshHp();
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
    };
    //生成一个射击特效测试木桩
    GameMap.prototype.createShootEffectTestEnemy = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        var pos = cc.v2(this._player.position).add(cc.v2(320, 0));
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._config = Object.assign({}, enemy.script._config);
        enemy.script._hp = 99999;
        enemy.script._maxHp = 99999;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
    };
    GameMap.prototype.createPortalTestEnemy = function (pos) {
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 1;
        enemy.script._maxHp = 1;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype._clearPortalTestNodes = function () {
        this._portalPairs = [];
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (!cc.isValid(child)) {
                continue;
            }
            if (child.name == "_portalGateA"
                || child.name == "_portalGateB"
                || child.name == "_portalLinkFx"
                || child.name == "_portalHintLabel"
                || child.name == "_portalWarpFx") {
                child.destroy();
            }
        }
    };
    GameMap.prototype._createPortalGate = function (name, pos, color, labelText) {
        var gate = new cc.Node(name);
        gate.parent = this._fire._tmLayerObstacle;
        gate.setPosition(cc.v3(pos));
        gate.zIndex = 5600;
        var ring = gate.addComponent(cc.Graphics);
        ring.lineWidth = 8;
        ring.strokeColor = color;
        ring.circle(0, 0, 42);
        ring.stroke();
        ring.lineWidth = 3;
        ring.strokeColor = cc.color(255, 255, 255, 180);
        ring.circle(0, 0, 26);
        ring.stroke();
        ring.fillColor = cc.color(color.r, color.g, color.b, 34);
        ring.circle(0, 0, 36);
        ring.fill();
        var glow = new cc.Node("_portalGlow");
        glow.parent = gate;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(color.r, color.g, color.b, 72);
        glowGraphics.circle(0, 0, 54);
        glowGraphics.fill();
        glow.opacity = 140;
        glow.scale = 0.88;
        glow.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(0.45, 1.08), cc.fadeTo(0.45, 225)), cc.spawn(cc.scaleTo(0.45, 0.88), cc.fadeTo(0.45, 110)))));
        var labelNode = new cc.Node("_portalLabel");
        labelNode.parent = gate;
        labelNode.setPosition(0, 0);
        labelNode.setContentSize(80, 48);
        var label = labelNode.addComponent(cc.Label);
        label.string = labelText;
        label.fontSize = 28;
        label.lineHeight = 32;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return gate;
    };
    GameMap.prototype._createPortalHintLabel = function (pos) {
        var hint = new cc.Node("_portalHintLabel");
        hint.parent = this._fire._tmLayerObstacle;
        hint.setPosition(cc.v3(pos.x, pos.y + 74, 0));
        hint.zIndex = 5605;
        hint.opacity = 220;
        hint.color = cc.color(230, 245, 255, 255);
        hint.setContentSize(320, 34);
        var label = hint.addComponent(cc.Label);
        label.string = "向 A 门开火，子弹会从 B 门穿出";
        label.fontSize = 22;
        label.lineHeight = 26;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return hint;
    };
    GameMap.prototype._createPortalLinkFx = function (fromPos, toPos) {
        var fx = new cc.Node("_portalLinkFx");
        fx.parent = this._fire._tmLayerObstacle;
        fx.zIndex = 5400;
        var graphics = fx.addComponent(cc.Graphics);
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(110, 255, 245, 120);
        graphics.moveTo(fromPos.x, fromPos.y);
        graphics.lineTo(toPos.x, toPos.y);
        graphics.stroke();
        fx.opacity = 120;
        fx.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.35, 210), cc.fadeTo(0.35, 90))));
        return fx;
    };
    GameMap.prototype.createPortalTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        this._clearPortalTestNodes();
        var playerPos = cc.v2(this._player.position);
        var entryPos = this.clampMapInnerPosition(playerPos.add(cc.v2(220, 0)), 90);
        var exitPos = this.clampMapInnerPosition(playerPos.add(cc.v2(-140, 180)), 90);
        var enemyPos = this.clampMapInnerPosition(exitPos.add(cc.v2(280, 0)), 90);
        this._createPortalGate("_portalGateA", entryPos, cc.color(90, 215, 255, 255), "A");
        this._createPortalGate("_portalGateB", exitPos, cc.color(255, 120, 220, 255), "B");
        this._createPortalLinkFx(entryPos, exitPos);
        this._createPortalHintLabel(entryPos);
        this.createPortalTestEnemy(enemyPos);
        this._portalPairs.push({
            id: "portalA",
            pos: entryPos,
            radius: 44,
            exitId: "portalB",
            exitPos: exitPos
        });
        this._portalPairs.push({
            id: "portalB",
            pos: exitPos,
            radius: 44,
            exitId: "portalA",
            exitPos: entryPos
        });
    };
    GameMap.prototype._spawnPortalWarpFx = function (pos, color) {
        var fx = new cc.Node("_portalWarpFx");
        fx.parent = this._fire._tmLayerObstacle;
        fx.setPosition(cc.v3(pos));
        fx.zIndex = 5700;
        fx.opacity = 220;
        fx.scale = 0.35;
        var graphics = fx.addComponent(cc.Graphics);
        graphics.lineWidth = 6;
        graphics.strokeColor = color;
        graphics.circle(0, 0, 26);
        graphics.stroke();
        graphics.lineWidth = 3;
        graphics.strokeColor = cc.color(255, 255, 255, 210);
        graphics.circle(0, 0, 14);
        graphics.stroke();
        fx.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.16, 1.7), cc.fadeOut(0.16)), cc.removeSelf()));
    };
    GameMap.prototype._clearCentrifugalRingTestNodes = function () {
        this._centrifugalRingData = null;
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (!cc.isValid(child)) {
                continue;
            }
            if (child.name == "_centrifugalRing"
                || child.name == "_centrifugalRingHint"
                || child.name == "_centrifugalRingGuide"
                || child.name == "_centrifugalRingFx") {
                child.destroy();
            }
        }
    };
    GameMap.prototype._createCentrifugalRingNode = function (pos, radius, color) {
        var ring = new cc.Node("_centrifugalRing");
        ring.parent = this._fire._tmLayerObstacle;
        ring.setPosition(cc.v3(pos));
        ring.zIndex = 5650;
        var glow = new cc.Node("_ringGlow");
        glow.parent = ring;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(color.r, color.g, color.b, 40);
        glowGraphics.circle(0, 0, radius + 26);
        glowGraphics.fill();
        glow.opacity = 160;
        glow.scale = 0.84;
        glow.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(0.45, 1.06), cc.fadeTo(0.45, 220)), cc.spawn(cc.scaleTo(0.45, 0.84), cc.fadeTo(0.45, 120)))));
        var graphics = ring.addComponent(cc.Graphics);
        graphics.lineWidth = 8;
        graphics.strokeColor = color;
        graphics.circle(0, 0, radius);
        graphics.stroke();
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(255, 246, 220, 180);
        graphics.circle(0, 0, radius - 15);
        graphics.stroke();
        graphics.fillColor = cc.color(color.r, color.g, color.b, 24);
        graphics.circle(0, 0, radius - 6);
        graphics.fill();
        for (var i = 0; i < 3; i++) {
            var arc = new cc.Node("_ringArc" + i);
            arc.parent = ring;
            arc.angle = i * 120;
            var arcGraphics = arc.addComponent(cc.Graphics);
            arcGraphics.lineWidth = 6;
            arcGraphics.strokeColor = cc.color(255, 255, 255, 220);
            arcGraphics.arc(0, 0, radius + 6, -Math.PI * 0.2, Math.PI * 0.32, false);
            arcGraphics.stroke();
        }
        ring.runAction(cc.repeatForever(cc.rotateBy(1.2, -180)));
        return ring;
    };
    GameMap.prototype._createCentrifugalRingGuide = function (fromPos, toPos) {
        var guide = new cc.Node("_centrifugalRingGuide");
        guide.parent = this._fire._tmLayerObstacle;
        guide.zIndex = 5500;
        var graphics = guide.addComponent(cc.Graphics);
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(255, 184, 112, 120);
        graphics.moveTo(fromPos.x, fromPos.y);
        graphics.lineTo(toPos.x, toPos.y);
        graphics.stroke();
        guide.opacity = 120;
        guide.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.3, 210), cc.fadeTo(0.3, 90))));
        return guide;
    };
    GameMap.prototype._createCentrifugalRingHint = function (pos) {
        var hint = new cc.Node("_centrifugalRingHint");
        hint.parent = this._fire._tmLayerObstacle;
        hint.setPosition(cc.v3(pos.x, pos.y + 100, 0));
        hint.zIndex = 5660;
        hint.opacity = 225;
        hint.color = cc.color(255, 235, 205, 255);
        hint.setContentSize(420, 58);
        var label = hint.addComponent(cc.Label);
        label.string = "直线射入离心力圈，子弹会绕圈加速后甩出";
        label.fontSize = 22;
        label.lineHeight = 28;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return hint;
    };
    GameMap.prototype.createCentrifugalRingTestEnemy = function (pos) {
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 99999;
        enemy.script._maxHp = 99999;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype.createCentrifugalRingTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        this._clearCentrifugalRingTestNodes();
        var playerPos = cc.v2(this._player.position);
        var center = this.clampMapInnerPosition(playerPos.add(cc.v2(220, 0)), 120);
        var radius = 82;
        var enemyPos = this.clampMapInnerPosition(center.add(cc.v2(310, 92)), 100);
        var color = cc.color(255, 170, 96, 255);
        this._createCentrifugalRingNode(center, radius, color);
        this._createCentrifugalRingGuide(playerPos, center);
        this._createCentrifugalRingHint(center);
        this.createCentrifugalRingTestEnemy(enemyPos);
        this._centrifugalRingData = {
            id: "centrifugalA",
            center: center,
            triggerRadius: radius - 10,
            orbitRadius: radius + 2,
            rotateAngle: Math.PI * 0.52,
            angularSpeed: Math.PI * 5.2,
            directionSign: -1,
            speedBoost: 1.95,
            damageBoost: 1.8,
            radiusExpand: 24,
            color: color,
        };
    };
    GameMap.prototype.spawnCentrifugalRingFx = function (pos, isRelease, color, dir, speed) {
        if (isRelease === void 0) { isRelease = false; }
        if (color === void 0) { color = null; }
        if (dir === void 0) { dir = null; }
        if (speed === void 0) { speed = 0; }
        var fx = new cc.Node("_centrifugalRingFx");
        fx.parent = this._fire._tmLayerObstacle;
        fx.setPosition(cc.v3(pos));
        fx.zIndex = 5690;
        fx.opacity = 220;
        fx.scale = isRelease ? 0.45 : 0.32;
        var effectColor = color || cc.color(255, 170, 96, 255);
        var graphics = fx.addComponent(cc.Graphics);
        graphics.lineWidth = isRelease ? 7 : 5;
        graphics.strokeColor = effectColor;
        graphics.circle(0, 0, isRelease ? 26 : 18);
        graphics.stroke();
        graphics.lineWidth = 3;
        graphics.strokeColor = cc.color(255, 255, 255, 210);
        graphics.circle(0, 0, isRelease ? 12 : 8);
        graphics.stroke();
        if (isRelease && dir && dir.magSqr() > 0) {
            var tail = new cc.Node("_centrifugalRingFxTail");
            tail.parent = fx;
            tail.angle = Utils_1.Utils.vectorsToDegress(dir) - 90;
            var tailGraphics = tail.addComponent(cc.Graphics);
            tailGraphics.fillColor = cc.color(effectColor.r, effectColor.g, effectColor.b, 160);
            tailGraphics.moveTo(0, 34 + Math.min(28, speed * 0.6));
            tailGraphics.lineTo(-10, 8);
            tailGraphics.lineTo(10, 8);
            tailGraphics.close();
            tailGraphics.fill();
        }
        fx.runAction(cc.sequence(cc.spawn(cc.scaleTo(isRelease ? 0.18 : 0.12, isRelease ? 1.8 : 1.35), cc.fadeOut(isRelease ? 0.18 : 0.12)), cc.removeSelf()));
    };
    GameMap.prototype._clearDamageDoubleTestNodes = function () {
        this._damageDoubleAreaData = null;
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (!cc.isValid(child)) {
                continue;
            }
            if (child.name == "_damageDoubleArea" || child.name == "_damageDoubleFx") {
                child.destroy();
            }
        }
    };
    GameMap.prototype._createDamageDoubleAreaNode = function (pos, radius, color) {
        var area = new cc.Node("_damageDoubleArea");
        area.parent = this._fire._tmLayerObstacle;
        area.setPosition(cc.v3(pos));
        area.zIndex = 5650;
        var glow = new cc.Node("_damageDoubleGlow");
        glow.parent = area;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(255, 0, 0, 35);
        glowGraphics.circle(0, 0, radius + 20);
        glowGraphics.fill();
        glow.opacity = 160;
        glow.scale = 0.85;
        glow.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(0.5, 1.08), cc.fadeTo(0.5, 220)), cc.spawn(cc.scaleTo(0.5, 0.85), cc.fadeTo(0.5, 120)))));
        var graphics = area.addComponent(cc.Graphics);
        graphics.lineWidth = 6;
        graphics.strokeColor = cc.color(255, 30, 30, 255);
        graphics.circle(0, 0, radius);
        graphics.stroke();
        graphics.fillColor = cc.color(255, 0, 0, 30);
        graphics.circle(0, 0, radius - 4);
        graphics.fill();
        var innerRing = new cc.Node("_damageDoubleInnerRing");
        innerRing.parent = area;
        var innerGraphics = innerRing.addComponent(cc.Graphics);
        innerGraphics.lineWidth = 3;
        innerGraphics.strokeColor = cc.color(255, 100, 100, 150);
        var segments = 24;
        var dashLen = Math.PI * 2 / segments;
        for (var i = 0; i < segments; i += 2) {
            var startAngle = i * dashLen;
            var endAngle = (i + 1) * dashLen;
            innerGraphics.arc(0, 0, radius - 12, startAngle, endAngle, false);
            innerGraphics.stroke();
        }
        innerRing.runAction(cc.repeatForever(cc.rotateBy(2.0, 90)));
        var labelNode = new cc.Node("_damageDoubleLabel");
        labelNode.parent = area;
        labelNode.setContentSize(140, 48);
        labelNode.color = cc.color(255, 255, 60, 255);
        var label = labelNode.addComponent(cc.Label);
        label.string = "x2";
        label.fontSize = 34;
        label.lineHeight = 40;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var hint = new cc.Node("_damageDoubleHint");
        hint.parent = area;
        hint.setPosition(cc.v2(0, radius + 36));
        hint.setContentSize(300, 40);
        hint.color = cc.color(255, 220, 220, 220);
        var hintLabel = hint.addComponent(cc.Label);
        hintLabel.string = "子弹穿过 伤害x2 体积增大";
        hintLabel.fontSize = 20;
        hintLabel.lineHeight = 26;
        hintLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        hintLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return area;
    };
    GameMap.prototype.createDamageDoubleTestEnemy = function (pos) {
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 99999;
        enemy.script._maxHp = 99999;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype.createDamageDoubleTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        this._clearDamageDoubleTestNodes();
        var playerPos = cc.v2(this._player.position);
        var center = this.clampMapInnerPosition(playerPos.add(cc.v2(220, 0)), 100);
        var radius = 60;
        var color = cc.color(255, 40, 40, 255);
        var enemyPos = this.clampMapInnerPosition(center.add(cc.v2(radius + 40, 0)), 90);
        this._createDamageDoubleAreaNode(center, radius, color);
        this.createDamageDoubleTestEnemy(enemyPos);
        this._damageDoubleAreaData = {
            center: center,
            radius: radius,
            damageMultiplier: 2,
            scaleMultiplier: 1.5,
        };
    };
    GameMap.prototype.tryEnterDamageDoubleArea = function (bullet, fromPos, toPos) {
        if (!this._damageDoubleTestMode || !bullet || !this._damageDoubleAreaData) {
            return false;
        }
        if (bullet.hasUsedDamageDoubleArea && bullet.hasUsedDamageDoubleArea()) {
            return false;
        }
        var area = this._damageDoubleAreaData;
        if (this._distancePointToSegment(area.center, cc.v2(fromPos), cc.v2(toPos)) > area.radius) {
            return false;
        }
        return bullet.enterDamageDoubleArea ? bullet.enterDamageDoubleArea(area) : false;
    };
    GameMap.prototype.spawnDamageDoubleFx = function (pos) {
        var fx = new cc.Node("_damageDoubleFx");
        fx.parent = this._fire._tmLayerObstacle;
        fx.setPosition(cc.v3(pos));
        fx.zIndex = 5700;
        fx.opacity = 220;
        fx.scale = 0.4;
        var graphics = fx.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(255, 50, 50, 180);
        graphics.circle(0, 0, 20);
        graphics.fill();
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(255, 200, 50, 220);
        graphics.circle(0, 0, 26);
        graphics.stroke();
        fx.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.2, 1.6), cc.fadeOut(0.2)), cc.removeSelf()));
    };
    GameMap.prototype._clearSpeedDoubleTestNodes = function () {
        this._speedDoubleAreaData = null;
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (!cc.isValid(child)) {
                continue;
            }
            if (child.name == "_speedDoubleArea" || child.name == "_speedDoubleFx") {
                child.destroy();
            }
        }
    };
    GameMap.prototype._createSpeedDoubleAreaNode = function (pos, radius, color) {
        var area = new cc.Node("_speedDoubleArea");
        area.parent = this._fire._tmLayerObstacle;
        area.setPosition(cc.v3(pos));
        area.zIndex = 5650;
        var glow = new cc.Node("_speedDoubleGlow");
        glow.parent = area;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(0, 80, 255, 35);
        glowGraphics.circle(0, 0, radius + 20);
        glowGraphics.fill();
        glow.opacity = 160;
        glow.scale = 0.85;
        glow.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(0.5, 1.08), cc.fadeTo(0.5, 220)), cc.spawn(cc.scaleTo(0.5, 0.85), cc.fadeTo(0.5, 120)))));
        var graphics = area.addComponent(cc.Graphics);
        graphics.lineWidth = 6;
        graphics.strokeColor = cc.color(30, 130, 255, 255);
        graphics.circle(0, 0, radius);
        graphics.stroke();
        graphics.fillColor = cc.color(0, 80, 255, 30);
        graphics.circle(0, 0, radius - 4);
        graphics.fill();
        var innerRing = new cc.Node("_speedDoubleInnerRing");
        innerRing.parent = area;
        var innerGraphics = innerRing.addComponent(cc.Graphics);
        innerGraphics.lineWidth = 3;
        innerGraphics.strokeColor = cc.color(100, 180, 255, 150);
        var segments = 24;
        var dashLen = Math.PI * 2 / segments;
        for (var i = 0; i < segments; i += 2) {
            var startAngle = i * dashLen;
            var endAngle = (i + 1) * dashLen;
            innerGraphics.arc(0, 0, radius - 12, startAngle, endAngle, false);
            innerGraphics.stroke();
        }
        innerRing.runAction(cc.repeatForever(cc.rotateBy(2.0, -90)));
        var labelNode = new cc.Node("_speedDoubleLabel");
        labelNode.parent = area;
        labelNode.setContentSize(140, 48);
        labelNode.color = cc.color(100, 200, 255, 255);
        var label = labelNode.addComponent(cc.Label);
        label.string = "x2";
        label.fontSize = 34;
        label.lineHeight = 40;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var hint = new cc.Node("_speedDoubleHint");
        hint.parent = area;
        hint.setPosition(cc.v2(0, radius + 36));
        hint.setContentSize(300, 40);
        hint.color = cc.color(200, 220, 255, 220);
        var hintLabel = hint.addComponent(cc.Label);
        hintLabel.string = "子弹穿过 速度x3";
        hintLabel.fontSize = 20;
        hintLabel.lineHeight = 26;
        hintLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        hintLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return area;
    };
    GameMap.prototype.createSpeedDoubleTestEnemy = function (pos) {
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 99999;
        enemy.script._maxHp = 99999;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype.createSpeedDoubleTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        this._clearSpeedDoubleTestNodes();
        var playerPos = cc.v2(this._player.position);
        var center = this.clampMapInnerPosition(playerPos.add(cc.v2(220, 0)), 100);
        var radius = 60;
        var color = cc.color(30, 130, 255, 255);
        var enemyPos = this.clampMapInnerPosition(center.add(cc.v2(radius + 40, 0)), 90);
        this._createSpeedDoubleAreaNode(center, radius, color);
        this.createSpeedDoubleTestEnemy(enemyPos);
        this._speedDoubleAreaData = {
            center: center,
            radius: radius,
            speedMultiplier: 3,
        };
    };
    GameMap.prototype.tryEnterSpeedDoubleArea = function (bullet, fromPos, toPos) {
        if (!this._speedDoubleTestMode || !bullet || !this._speedDoubleAreaData) {
            return false;
        }
        if (bullet.hasUsedSpeedDoubleArea && bullet.hasUsedSpeedDoubleArea()) {
            return false;
        }
        var area = this._speedDoubleAreaData;
        if (this._distancePointToSegment(area.center, cc.v2(fromPos), cc.v2(toPos)) > area.radius) {
            return false;
        }
        return bullet.enterSpeedDoubleArea ? bullet.enterSpeedDoubleArea(area) : false;
    };
    GameMap.prototype.spawnSpeedDoubleFx = function (pos) {
        var fx = new cc.Node("_speedDoubleFx");
        fx.parent = this._fire._tmLayerObstacle;
        fx.setPosition(cc.v3(pos));
        fx.zIndex = 5700;
        fx.opacity = 220;
        fx.scale = 0.4;
        var graphics = fx.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(50, 150, 255, 180);
        graphics.circle(0, 0, 20);
        graphics.fill();
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(100, 200, 255, 220);
        graphics.circle(0, 0, 26);
        graphics.stroke();
        fx.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.2, 1.6), cc.fadeOut(0.2)), cc.removeSelf()));
    };
    GameMap.prototype._clearSpreadBulletTestNodes = function () {
        this._spreadBulletAreaData = null;
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (!cc.isValid(child)) {
                continue;
            }
            if (child.name == "_spreadBulletArea" || child.name == "_spreadBulletFx") {
                child.destroy();
            }
        }
    };
    GameMap.prototype._createSpreadBulletAreaNode = function (pos, radius, color) {
        var area = new cc.Node("_spreadBulletArea");
        area.parent = this._fire._tmLayerObstacle;
        area.setPosition(cc.v3(pos));
        area.zIndex = 5650;
        var glow = new cc.Node("_spreadBulletGlow");
        glow.parent = area;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(0, 200, 80, 35);
        glowGraphics.circle(0, 0, radius + 20);
        glowGraphics.fill();
        glow.opacity = 160;
        glow.scale = 0.85;
        glow.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(0.5, 1.08), cc.fadeTo(0.5, 220)), cc.spawn(cc.scaleTo(0.5, 0.85), cc.fadeTo(0.5, 120)))));
        var graphics = area.addComponent(cc.Graphics);
        graphics.lineWidth = 6;
        graphics.strokeColor = cc.color(30, 230, 100, 255);
        graphics.circle(0, 0, radius);
        graphics.stroke();
        graphics.fillColor = cc.color(0, 200, 80, 30);
        graphics.circle(0, 0, radius - 4);
        graphics.fill();
        var innerRing = new cc.Node("_spreadBulletInnerRing");
        innerRing.parent = area;
        var innerGraphics = innerRing.addComponent(cc.Graphics);
        innerGraphics.lineWidth = 3;
        innerGraphics.strokeColor = cc.color(100, 255, 150, 150);
        var segments = 24;
        var dashLen = Math.PI * 2 / segments;
        for (var i = 0; i < segments; i += 2) {
            var startAngle = i * dashLen;
            var endAngle = (i + 1) * dashLen;
            innerGraphics.arc(0, 0, radius - 12, startAngle, endAngle, false);
            innerGraphics.stroke();
        }
        innerRing.runAction(cc.repeatForever(cc.rotateBy(2.0, 60)));
        var labelNode = new cc.Node("_spreadBulletLabel");
        labelNode.parent = area;
        labelNode.setContentSize(140, 48);
        labelNode.color = cc.color(100, 255, 140, 255);
        var label = labelNode.addComponent(cc.Label);
        label.string = "x3";
        label.fontSize = 34;
        label.lineHeight = 40;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var hint = new cc.Node("_spreadBulletHint");
        hint.parent = area;
        hint.setPosition(cc.v2(0, radius + 36));
        hint.setContentSize(300, 40);
        hint.color = cc.color(200, 255, 220, 220);
        var hintLabel = hint.addComponent(cc.Label);
        hintLabel.string = "子弹穿过 1变3";
        hintLabel.fontSize = 20;
        hintLabel.lineHeight = 26;
        hintLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        hintLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return area;
    };
    GameMap.prototype.createSpreadBulletTestEnemy = function (pos) {
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 99999;
        enemy.script._maxHp = 99999;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype.createSpreadBulletTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        this._clearSpreadBulletTestNodes();
        var playerPos = cc.v2(this._player.position);
        var center = this.clampMapInnerPosition(playerPos.add(cc.v2(220, 0)), 100);
        var radius = 60;
        var color = cc.color(30, 230, 100, 255);
        var enemyPos = this.clampMapInnerPosition(center.add(cc.v2(200, 0)), 90);
        this._createSpreadBulletAreaNode(center, radius, color);
        this.createSpreadBulletTestEnemy(enemyPos);
        this._spreadBulletAreaData = {
            center: center,
            radius: radius,
            spreadCount: 2,
            spreadAngle: 20,
            _splitTriggered: false,
        };
    };
    GameMap.prototype.tryEnterSpreadBulletArea = function (bullet, fromPos, toPos) {
        if (!this._spreadBulletTestMode || !bullet || !this._spreadBulletAreaData) {
            return false;
        }
        var area = this._spreadBulletAreaData;
        if (area._splitTriggered) {
            return false;
        }
        if (this._distancePointToSegment(area.center, cc.v2(fromPos), cc.v2(toPos)) > area.radius) {
            return false;
        }
        area._splitTriggered = true;
        return bullet.enterSpreadBulletArea ? bullet.enterSpreadBulletArea(area) : false;
    };
    GameMap.prototype.spawnSpreadBulletFx = function (pos) {
        var fx = new cc.Node("_spreadBulletFx");
        fx.parent = this._fire._tmLayerObstacle;
        fx.setPosition(cc.v3(pos));
        fx.zIndex = 5700;
        fx.opacity = 220;
        fx.scale = 0.4;
        var graphics = fx.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(50, 230, 100, 180);
        graphics.circle(0, 0, 20);
        graphics.fill();
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(100, 255, 150, 220);
        graphics.circle(0, 0, 26);
        graphics.stroke();
        fx.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.2, 1.6), cc.fadeOut(0.2)), cc.removeSelf()));
    };
    GameMap.prototype._clearBounceObstacleTestNodes = function () {
        this._bounceObstacles = [];
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (!cc.isValid(child)) {
                continue;
            }
            if (child.name.indexOf("_bounceObstacle") == 0) {
                child.destroy();
            }
        }
    };
    GameMap.prototype._createBounceCircleObstacle = function (pos, radius) {
        var node = new cc.Node("_bounceObstacleCircle");
        node.parent = this._fire._tmLayerObstacle;
        node.setPosition(cc.v3(pos));
        node.zIndex = 5600;
        var graphics = node.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(255, 120, 180, 60);
        graphics.circle(0, 0, radius);
        graphics.fill();
        graphics.lineWidth = 5;
        graphics.strokeColor = cc.color(255, 80, 180, 255);
        graphics.circle(0, 0, radius);
        graphics.stroke();
        this._bounceObstacles.push({
            type: "circle",
            center: cc.v2(pos),
            radius: radius,
            node: node,
        });
        return node;
    };
    GameMap.prototype._createBounceLineObstacle = function (fromPos, toPos) {
        var node = new cc.Node("_bounceObstacleLine");
        node.parent = this._fire._tmLayerObstacle;
        node.zIndex = 5600;
        var graphics = node.addComponent(cc.Graphics);
        graphics.lineWidth = 8;
        graphics.strokeColor = cc.color(255, 80, 180, 255);
        graphics.moveTo(fromPos.x, fromPos.y);
        graphics.lineTo(toPos.x, toPos.y);
        graphics.stroke();
        var A = cc.v2(fromPos);
        var B = cc.v2(toPos);
        var dir = B.sub(A).normalize();
        var normal = cc.v2(-dir.y, dir.x);
        this._bounceObstacles.push({
            type: "line",
            A: A,
            B: B,
            normal: normal,
            node: node,
        });
        return node;
    };
    GameMap.prototype.createBounceObstacleTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        this._clearBounceObstacleTestNodes();
        var playerPos = cc.v2(this._player.position);
        this._createBounceCircleObstacle(this.clampMapInnerPosition(playerPos.add(cc.v2(180, 40)), 80), 36);
        this._createBounceCircleObstacle(this.clampMapInnerPosition(playerPos.add(cc.v2(180, -50)), 80), 28);
        this._createBounceLineObstacle(this.clampMapInnerPosition(playerPos.add(cc.v2(320, -80)), 60), this.clampMapInnerPosition(playerPos.add(cc.v2(320, 80)), 60));
        var enemyPos = this.clampMapInnerPosition(playerPos.add(cc.v2(480, 0)), 90);
        this.createBounceObstacleTestEnemy(enemyPos);
    };
    GameMap.prototype.createBounceObstacleTestEnemy = function (pos) {
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 99999;
        enemy.script._maxHp = 99999;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype.tryBounceBulletOnObstacle = function (bullet, fromPos, toPos) {
        if (!this._bounceObstacleTestMode || !bullet || this._bounceObstacles.length == 0) {
            return false;
        }
        var from = cc.v2(fromPos);
        var to = cc.v2(toPos);
        var dirBullet = to.sub(from);
        for (var i = 0; i < this._bounceObstacles.length; i++) {
            var obstacle = this._bounceObstacles[i];
            if (obstacle.type == "circle") {
                var center = obstacle.center;
                var radius = obstacle.radius;
                var AC = center.sub(from);
                var lenSqr = dirBullet.magSqr();
                if (lenSqr <= 0)
                    continue;
                var t = AC.dot(dirBullet) / lenSqr;
                t = cc.misc.clampf(t, 0, 1);
                var closest = from.add(dirBullet.mul(t));
                var dist = center.sub(closest).mag();
                if (dist >= radius)
                    continue;
                // Surface normal points from center outward to the hit point on circumference
                var surfaceNormal = closest.sub(center).normalize();
                if (surfaceNormal.magSqr() <= 0) {
                    surfaceNormal = cc.v2(1, 0);
                }
                // surfaceNormal should point toward the incoming bullet
                var dot = bullet._dir.dot(surfaceNormal);
                if (dot > 0) {
                    surfaceNormal = surfaceNormal.mul(-1);
                    dot = -dot;
                }
                var reflectDir = bullet._dir.sub(surfaceNormal.mul(2 * dot));
                bullet._dir = reflectDir.normalize();
                bullet.node.angle = Utils_1.Utils.vectorsToDegress(bullet._dir) - 90;
                // Place bullet on the circumference at the hit point, then push outward
                var hitPoint = center.add(closest.sub(center).normalize().mul(radius));
                bullet.node.setPosition(cc.v3(hitPoint.add(bullet._dir.mul(8))));
                return true;
            }
            else if (obstacle.type == "line") {
                var A = obstacle.A;
                var B = obstacle.B;
                var dirObstacle = B.sub(A);
                // Cross product to check segment intersection
                var denom = dirBullet.x * dirObstacle.y - dirBullet.y * dirObstacle.x;
                if (Math.abs(denom) < 0.0001)
                    continue;
                var t1 = ((A.x - from.x) * dirObstacle.y - (A.y - from.y) * dirObstacle.x) / denom;
                var t2 = ((A.x - from.x) * dirBullet.y - (A.y - from.y) * dirBullet.x) / denom;
                if (t1 < 0 || t1 > 1 || t2 < 0 || t2 > 1)
                    continue;
                var normal = obstacle.normal;
                var dot = bullet._dir.dot(normal);
                if (dot > 0) {
                    normal = normal.mul(-1);
                    dot = -dot;
                }
                var reflectDir = bullet._dir.sub(normal.mul(2 * dot));
                bullet._dir = reflectDir.normalize();
                bullet.node.angle = Utils_1.Utils.vectorsToDegress(bullet._dir) - 90;
                bullet.node.setPosition(cc.v3(from.add(bullet._dir.mul(8))));
                return true;
            }
        }
        return false;
    };
    GameMap.prototype._clearBlackHoleTestNodes = function () {
        this._blackHoleAreaData = null;
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (!cc.isValid(child)) {
                continue;
            }
            if (child.name == "_blackHoleArea" || child.name == "_blackHoleFx") {
                child.destroy();
            }
        }
    };
    GameMap.prototype._createBlackHoleAreaNode = function (pos, radius, destroyRadius, color) {
        var area = new cc.Node("_blackHoleArea");
        area.parent = this._fire._tmLayerObstacle;
        area.setPosition(cc.v3(pos));
        area.zIndex = 5650;
        // Outer glow
        var glow = new cc.Node("_blackHoleGlow");
        glow.parent = area;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(60, 20, 100, 25);
        glowGraphics.circle(0, 0, radius + 30);
        glowGraphics.fill();
        glow.opacity = 140;
        glow.scale = 0.82;
        glow.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(0.8, 1.12), cc.fadeTo(0.8, 210)), cc.spawn(cc.scaleTo(0.8, 0.82), cc.fadeTo(0.8, 110)))));
        // Outer ring
        var graphics = area.addComponent(cc.Graphics);
        graphics.lineWidth = 5;
        graphics.strokeColor = cc.color(100, 40, 180, 200);
        graphics.circle(0, 0, radius);
        graphics.stroke();
        graphics.fillColor = cc.color(40, 10, 80, 35);
        graphics.circle(0, 0, radius - 3);
        graphics.fill();
        // Inner accretion disk rings
        var ringCount = 4;
        for (var i = 0; i < ringCount; i++) {
            var ringRadius = radius - (radius - destroyRadius) * (i + 1) / (ringCount + 1);
            var ringNode = new cc.Node("_blackHoleRing" + i);
            ringNode.parent = area;
            var ringGraphics = ringNode.addComponent(cc.Graphics);
            ringGraphics.lineWidth = 3 - i * 0.5;
            var alpha = 180 - i * 35;
            ringGraphics.strokeColor = cc.color(120, 50, 200, alpha);
            ringGraphics.circle(0, 0, ringRadius);
            ringGraphics.stroke();
            ringNode.runAction(cc.repeatForever(cc.rotateBy(1.5 + i * 0.3, 90 + i * 30)));
        }
        // Dark core
        var core = new cc.Node("_blackHoleCore");
        core.parent = area;
        var coreGraphics = core.addComponent(cc.Graphics);
        coreGraphics.fillColor = cc.color(0, 0, 0, 220);
        coreGraphics.circle(0, 0, destroyRadius);
        coreGraphics.fill();
        coreGraphics.lineWidth = 2;
        coreGraphics.strokeColor = cc.color(180, 100, 255, 100);
        coreGraphics.circle(0, 0, destroyRadius);
        coreGraphics.stroke();
        // Label
        var labelNode = new cc.Node("_blackHoleLabel");
        labelNode.parent = area;
        labelNode.setContentSize(140, 48);
        labelNode.color = cc.color(180, 120, 255, 220);
        var label = labelNode.addComponent(cc.Label);
        label.string = "黑洞";
        label.fontSize = 30;
        label.lineHeight = 36;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        // Hint
        var hint = new cc.Node("_blackHoleHint");
        hint.parent = area;
        hint.setPosition(cc.v2(0, radius + 36));
        hint.setContentSize(320, 40);
        hint.color = cc.color(200, 180, 255, 200);
        var hintLabel = hint.addComponent(cc.Label);
        hintLabel.string = "子弹靠近会被吸引吞噬";
        hintLabel.fontSize = 20;
        hintLabel.lineHeight = 26;
        hintLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        hintLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return area;
    };
    GameMap.prototype.createBlackHoleTestEnemy = function (pos) {
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 90));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._hp = 99999;
        enemy.script._maxHp = 99999;
        enemy.script.refreshHp();
        enemy.script.enabled = false;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype.createBlackHoleTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        this._clearBlackHoleTestNodes();
        var playerPos = cc.v2(this._player.position);
        var center = this.clampMapInnerPosition(playerPos.add(cc.v2(300, 0)), 120);
        var radius = 100;
        var destroyRadius = 14;
        var color = cc.color(80, 30, 160, 200);
        var enemyPos = this.clampMapInnerPosition(center.add(cc.v2(280, 100)), 90);
        this._createBlackHoleAreaNode(center, radius, destroyRadius, color);
        this.createBlackHoleTestEnemy(enemyPos);
        this._blackHoleAreaData = {
            center: center,
            radius: radius,
            destroyRadius: destroyRadius,
            gravityStrength: 160,
        };
    };
    GameMap.prototype.tryEnterBlackHoleArea = function (bullet, fromPos, toPos) {
        if (!this._blackHoleTestMode || !bullet || !this._blackHoleAreaData) {
            return false;
        }
        var pos = cc.v2(bullet.node.position);
        var dist = pos.sub(this._blackHoleAreaData.center).mag();
        return dist < this._blackHoleAreaData.radius;
    };
    GameMap.prototype.spawnBlackHoleSwallowFx = function (pos) {
        var fx = new cc.Node("_blackHoleFx");
        fx.parent = this._fire._tmLayerObstacle;
        fx.setPosition(cc.v3(pos));
        fx.zIndex = 5700;
        fx.opacity = 220;
        var graphics = fx.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(80, 30, 160, 180);
        graphics.circle(0, 0, 10);
        graphics.fill();
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(180, 100, 255, 200);
        graphics.circle(0, 0, 18);
        graphics.stroke();
        fx.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.25, 0), cc.fadeOut(0.25)), cc.removeSelf()));
    };
    GameMap.prototype.createClusterBombTestEnemies = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        var playerPos = cc.v2(this._player.position);
        var startPos = playerPos.add(cc.v2(500, -120));
        var cols = 4;
        var rows = 3;
        var spacingX = 80;
        var spacingY = 70;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                var pos = this.clampMapInnerPosition(cc.v2(startPos.x + c * spacingX, startPos.y + r * spacingY), 50);
                var enemy = cc.instantiate(this.enemyPrefab);
                enemy.parent = this._fire._tmLayerObstacle;
                enemy.position = cc.v3(pos);
                enemy.script.setMap(this);
                enemy.script.setTarget(this._player);
                enemy.script.setEnemyType(11, this._levelId);
                enemy.script._hp = 30;
                enemy.script._maxHp = 30;
                enemy.script.refreshHp();
                enemy.script.enabled = false;
                enemy.zIndex = this.judgezIndex(enemy.y);
                this._enemys.push(enemy);
            }
        }
    };
    GameMap.prototype.createClusterBombTestSetup = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        // Override player's bullet type to fire cluster bombs
        var playerScript = this._player.script;
        if (playerScript._config) {
            playerScript._config.BType1 = 101;
            playerScript._config.BType2 = 101;
        }
        this.createClusterBombTestEnemies();
    };
    GameMap.prototype._getTestEffectPreviewPos = function () {
        var basePos = this._player && cc.isValid(this._player)
            ? cc.v2(this._player.position)
            : (this._playerBornPos ? cc.v2(this._playerBornPos) : cc.v2(0, 0));
        return this.clampMapInnerPosition(basePos.add(cc.v2(180, 96)), 120);
    };
    GameMap.prototype._preloadRippleDistortionEffect = function () {
        var _this = this;
        if (cc.dynamicAtlasManager) {
            cc.dynamicAtlasManager.enabled = false;
        }
        cc.loader.loadRes("shader/ripple-distortion", cc.EffectAsset, function (err, effectAsset) {
            if (err) {
                console.warn("load ripple distortion effect failed", err);
                return;
            }
            _this._rippleDistortionEffect = effectAsset;
        });
    };
    GameMap.prototype._destroyRippleCaptureResources = function () {
        if (this._rippleCaptureCamera) {
            this._rippleCaptureCamera.targetTexture = null;
        }
        if (this._rippleCaptureCameraNode && cc.isValid(this._rippleCaptureCameraNode)) {
            this._rippleCaptureCameraNode.destroy();
        }
        this._rippleCaptureCamera = null;
        this._rippleCaptureCameraNode = null;
    };
    GameMap.prototype._getRippleCaptureCamera = function () {
        if (this._rippleCaptureCamera && cc.isValid(this._rippleCaptureCamera.node)) {
            return this._rippleCaptureCamera;
        }
        var parentNode = this.node.parent;
        if (!parentNode || !cc.isValid(parentNode)) {
            return null;
        }
        var cameraNode = new cc.Node("_rippleCaptureCamera");
        cameraNode.parent = parentNode;
        cameraNode.setPosition(0, 0);
        cameraNode.zIndex = -9999;
        var camera = cameraNode.addComponent(cc.Camera);
        camera.enabled = true;
        camera.ortho = true;
        camera.alignWithScreen = true;
        camera.depth = -999;
        camera.cullingMask = 0xffffffff;
        camera.backgroundColor = cc.color(0, 0, 0, 0);
        camera.clearFlags = 0;
        this._rippleCaptureCameraNode = cameraNode;
        this._rippleCaptureCamera = camera;
        return camera;
    };
    GameMap.prototype._captureRippleScreenFrame = function () {
        var camera = this._getRippleCaptureCamera();
        if (!camera) {
            return null;
        }
        var viewportSize = this._getViewportSize();
        var renderTexture = new cc.RenderTexture();
        var gl = cc.game._renderContext;
        if (!gl) {
            return null;
        }
        renderTexture.initWithSize(Math.ceil(viewportSize.width), Math.ceil(viewportSize.height), gl.STENCIL_INDEX8);
        camera.targetTexture = renderTexture;
        camera.render(cc.director.getScene());
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(renderTexture);
        return {
            spriteFrame: spriteFrame,
            renderTexture: renderTexture,
            viewportSize: viewportSize,
        };
    };
    GameMap.prototype._getRippleCenterUv = function (overlayNode, worldPos, viewportSize) {
        if (!overlayNode || !cc.isValid(overlayNode)) {
            return cc.v2(0.5, 0.5);
        }
        var localPos = overlayNode.convertToNodeSpaceAR(worldPos);
        var normalizedX = (localPos.x + viewportSize.width * 0.5) / Math.max(1, viewportSize.width);
        var normalizedY = (localPos.y + viewportSize.height * 0.5) / Math.max(1, viewportSize.height);
        return cc.v2(cc.misc.clampf(normalizedX, 0, 1), cc.misc.clampf(1 - normalizedY, 0, 1));
    };
    GameMap.prototype._spawnDistortionRippleAt = function (pos) {
        if (!this._rippleDistortionEffect) {
            this._preloadRippleDistortionEffect();
            return;
        }
        var capture = this._captureRippleScreenFrame();
        if (!capture || !capture.spriteFrame || !capture.renderTexture) {
            return;
        }
        var screenParent = this.node.parent;
        if (!screenParent || !cc.isValid(screenParent)) {
            return;
        }
        var overlay = new cc.Node("_explosionDistortionRipple");
        overlay.parent = screenParent;
        overlay.setContentSize(capture.viewportSize);
        overlay.setPosition(0, 0);
        overlay.zIndex = 1500;
        var sprite = overlay.addComponent(cc.Sprite);
        sprite.spriteFrame = capture.spriteFrame;
        var material = cc.Material.create(this._rippleDistortionEffect, 0);
        material.define("USE_TEXTURE", true, 0);
        material.setProperty("texture", capture.renderTexture);
        var materialVariant = cc.MaterialVariant.create(material, sprite);
        sprite.setMaterial(0, materialVariant);
        var worldPos = this._fire._tmLayerObstacle.convertToWorldSpaceAR(cc.v2(pos));
        var center = this._getRippleCenterUv(overlay, worldPos, capture.viewportSize);
        var ripple = overlay.addComponent(RippleShockwave_1.default);
        ripple.init(null, sprite, materialVariant, center, capture.viewportSize, capture.spriteFrame, capture.renderTexture, 0.34);
    };
    GameMap.prototype.playKillExplosionEffectAt = function (pos) {
        this._spawnDistortionRippleAt(pos);
        this._spawnExplosionStarburstAt(pos);
        this._spawnExplosionGlowAt(pos, 0.36);
        this._spawnExplosionCoreBurstAt(pos, 0.22);
        this._spawnTransparentShockwaveAt(pos, 76, 380, 0, 0.34, 180, 10);
        this._spawnTransparentShockwaveAt(pos, 38, 220, 0.04, 0.24, 135, 6);
        MusicManager_1.MusicManager.playEffect("boom");
        this.playLightScreenShake();
    };
    GameMap.prototype._spawnExplosionStarburstAt = function (pos) {
        var burst = new cc.Node("_explosionStarburst");
        burst.parent = this._fire._tmLayerObstacle;
        burst.setPosition(cc.v3(pos));
        burst.zIndex = 6055;
        burst.opacity = 255;
        burst.scale = 0.45;
        var rayConfigs = [
            { angle: 0, length: 170, width: 18, alpha: 160 },
            { angle: 45, length: 140, width: 14, alpha: 150 },
            { angle: 90, length: 175, width: 18, alpha: 165 },
            { angle: 135, length: 142, width: 14, alpha: 150 },
        ];
        for (var i = 0; i < rayConfigs.length; i++) {
            var config = rayConfigs[i];
            var ray = new cc.Node("_explosionRay" + i);
            ray.parent = burst;
            ray.angle = config.angle;
            var graphics = ray.addComponent(cc.Graphics);
            graphics.fillColor = cc.color(255, 255, 255, config.alpha);
            graphics.moveTo(0, config.length);
            graphics.lineTo(-config.width, config.length * 0.24);
            graphics.lineTo(0, 12);
            graphics.lineTo(config.width, config.length * 0.24);
            graphics.close();
            graphics.fill();
        }
        var hotCross = new cc.Node("_explosionHotCross");
        hotCross.parent = burst;
        var crossGraphics = hotCross.addComponent(cc.Graphics);
        crossGraphics.fillColor = cc.color(255, 240, 180, 150);
        crossGraphics.rect(-112, -5, 224, 10);
        crossGraphics.rect(-5, -112, 10, 224);
        crossGraphics.fill();
        burst.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.08, 1.08), cc.fadeTo(0.08, 220)), cc.spawn(cc.scaleTo(0.16, 1.55), cc.fadeOut(0.16)), cc.removeSelf()));
    };
    GameMap.prototype._spawnExplosionGlowAt = function (pos, strength) {
        if (strength === void 0) { strength = 0.3; }
        var glow = new cc.Node("_explosionGlow");
        glow.parent = this._fire._tmLayerObstacle;
        glow.setPosition(cc.v3(pos));
        glow.zIndex = 6050;
        glow.opacity = 0;
        glow.scale = 0.35;
        var graphics = glow.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(255, 248, 220, Math.floor(125 * strength));
        graphics.circle(0, 0, 108);
        graphics.fill();
        graphics.fillColor = cc.color(255, 210, 120, Math.floor(95 * strength));
        graphics.circle(0, 0, 70);
        graphics.fill();
        glow.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.04, 210), cc.scaleTo(0.04, 1)), cc.spawn(cc.fadeOut(0.18), cc.scaleTo(0.18, 1.52)), cc.removeSelf()));
    };
    GameMap.prototype._spawnExplosionCoreBurstAt = function (pos, duration) {
        if (duration === void 0) { duration = 0.28; }
        var core = new cc.Node("_explosionCoreBurst");
        core.parent = this._fire._tmLayerObstacle;
        core.setPosition(cc.v3(pos));
        core.zIndex = 6060;
        core.opacity = 255;
        core.scale = 0.2;
        var outer = new cc.Node("_explosionOuterCore");
        outer.parent = core;
        var outerGraphics = outer.addComponent(cc.Graphics);
        outerGraphics.fillColor = cc.color(255, 244, 196, 170);
        outerGraphics.circle(0, 0, 76);
        outerGraphics.fill();
        var inner = new cc.Node("_explosionInnerCore");
        inner.parent = core;
        var innerGraphics = inner.addComponent(cc.Graphics);
        innerGraphics.fillColor = cc.color(255, 255, 255, 240);
        innerGraphics.circle(0, 0, 34);
        innerGraphics.fill();
        core.runAction(cc.sequence(cc.spawn(cc.scaleTo(duration * 0.42, 1.16), cc.fadeTo(duration * 0.42, 255)), cc.spawn(cc.scaleTo(duration * 0.58, 1.85), cc.fadeOut(duration * 0.58)), cc.removeSelf()));
    };
    GameMap.prototype._spawnTransparentShockwaveAt = function (pos, startRadius, endRadius, delay, duration, alpha, lineWidth) {
        if (startRadius === void 0) { startRadius = 72; }
        if (endRadius === void 0) { endRadius = 340; }
        if (delay === void 0) { delay = 0; }
        if (duration === void 0) { duration = 0.42; }
        if (alpha === void 0) { alpha = 170; }
        if (lineWidth === void 0) { lineWidth = 8; }
        var wave = new cc.Node("_explosionShockwave");
        wave.parent = this._fire._tmLayerObstacle;
        wave.setPosition(cc.v3(pos));
        wave.zIndex = 6058;
        wave.opacity = alpha;
        wave.scale = 1;
        var graphics = wave.addComponent(cc.Graphics);
        graphics.lineWidth = lineWidth;
        graphics.strokeColor = cc.color(255, 255, 255, alpha);
        graphics.circle(0, 0, startRadius);
        graphics.stroke();
        var endScale = startRadius > 0 ? endRadius / startRadius : 1;
        var playAction = cc.sequence(cc.spawn(cc.scaleTo(duration, endScale), cc.fadeOut(duration)), cc.removeSelf());
        if (delay > 0) {
            wave.runAction(cc.sequence(cc.delayTime(delay), playAction));
        }
        else {
            wave.runAction(playAction);
        }
    };
    GameMap.prototype._playWhiteScreenFlash = function (maxOpacity, fadeIn, fadeOut) {
        if (maxOpacity === void 0) { maxOpacity = 180; }
        if (fadeIn === void 0) { fadeIn = 0.04; }
        if (fadeOut === void 0) { fadeOut = 0.2; }
        var parentNode = this.node.parent;
        if (!parentNode || !cc.isValid(parentNode)) {
            return;
        }
        var size = this._getViewportSize();
        var flash = new cc.Node("_screenFlashWhite");
        flash.parent = parentNode;
        flash.setContentSize(size);
        flash.setPosition(0, 0);
        flash.zIndex = 1700;
        flash.opacity = 0;
        var graphics = flash.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(255, 255, 255, 255);
        graphics.rect(-size.width / 2, -size.height / 2, size.width, size.height);
        graphics.fill();
        flash.runAction(cc.sequence(cc.fadeTo(fadeIn, maxOpacity), cc.fadeOut(fadeOut), cc.removeSelf()));
    };
    GameMap.prototype._getScreenOverlayRoot = function () {
        var parentNode = this.node.parent;
        if (parentNode && cc.isValid(parentNode)) {
            return parentNode;
        }
        return Utils_1.Utils.getCurrentSceneCanvas();
    };
    GameMap.prototype._ensureKillBroadcastLayer = function () {
        if (this._killBroadcastLayer && cc.isValid(this._killBroadcastLayer)) {
            return this._killBroadcastLayer;
        }
        var root = this._getScreenOverlayRoot();
        if (!root || !cc.isValid(root)) {
            return null;
        }
        var layer = new cc.Node("_killBroadcastLayer");
        layer.parent = root;
        layer.setContentSize(this._getViewportSize());
        layer.setPosition(0, 0);
        layer.zIndex = 1850;
        this._killBroadcastLayer = layer;
        return layer;
    };
    GameMap.prototype._ensureKillBadgeLayer = function () {
        if (this._killBadgeLayer && cc.isValid(this._killBadgeLayer)) {
            return this._killBadgeLayer;
        }
        var root = this._getScreenOverlayRoot();
        if (!root || !cc.isValid(root)) {
            return null;
        }
        var layer = new cc.Node("_killBadgeLayer");
        layer.parent = root;
        layer.setContentSize(this._getViewportSize());
        layer.setPosition(0, 0);
        layer.zIndex = 1860;
        this._killBadgeLayer = layer;
        return layer;
    };
    GameMap.prototype._destroyKillBroadcastUi = function () {
        this._killBroadcastEntries = [];
        if (this._killBroadcastLayer && cc.isValid(this._killBroadcastLayer)) {
            this._killBroadcastLayer.destroy();
        }
        this._killBroadcastLayer = null;
    };
    GameMap.prototype._destroyKillBadgeUi = function () {
        if (this._killBadgeLayer && cc.isValid(this._killBadgeLayer)) {
            this._killBadgeLayer.destroy();
        }
        this._killBadgeLayer = null;
        this._killBadgeActiveNode = null;
    };
    GameMap.prototype._resetKillBroadcastRuntime = function () {
        this._killStreakCount = 0;
        this._killStreakRemain = 0;
        this._destroyKillBroadcastUi();
        this._destroyKillBadgeUi();
    };
    GameMap.prototype._preloadKillBroadcastBadgeFrames = function () {
        for (var i = 1; i <= 5; i++) {
            this._loadKillBadgeFrame(i);
        }
    };
    GameMap.prototype._loadKillBadgeFrame = function (streak, callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var uuid = KILL_BADGE_FRAME_UUIDS[streak];
        if (!uuid || !cc.assetManager || !cc.assetManager.loadAny) {
            if (callback) {
                callback(null);
            }
            return;
        }
        if (this._killBadgeFrames[streak]) {
            if (callback) {
                callback(this._killBadgeFrames[streak]);
            }
            return;
        }
        if (this._killBadgeLoading[streak]) {
            if (callback) {
                this._killBadgeLoading[streak].push(callback);
            }
            return;
        }
        this._killBadgeLoading[streak] = callback ? [callback] : [];
        cc.assetManager.loadAny({ uuid: uuid }, function (err, asset) {
            var spriteFrame = null;
            if (!err && asset) {
                spriteFrame = asset instanceof cc.SpriteFrame ? asset : asset;
                _this._killBadgeFrames[streak] = spriteFrame;
            }
            var callbacks = _this._killBadgeLoading[streak] || [];
            delete _this._killBadgeLoading[streak];
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](spriteFrame);
            }
        });
    };
    GameMap.prototype._preloadOilSpillFrame = function () {
        if (!OIL_SPILL_FRAME_UUID || !cc.assetManager || !cc.assetManager.loadAny) {
            return;
        }
        this._loadOilSpillFrame();
    };
    GameMap.prototype._loadOilSpillFrame = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (this._oilSpillFrame) {
            if (callback) {
                callback(this._oilSpillFrame);
            }
            return;
        }
        if (callback) {
            this._oilSpillFrameCallbacks.push(callback);
        }
        if (this._oilSpillFrameLoading) {
            return;
        }
        this._oilSpillFrameLoading = true;
        cc.assetManager.loadAny({ uuid: OIL_SPILL_FRAME_UUID }, function (err, asset) {
            _this._oilSpillFrameLoading = false;
            if (!err && asset) {
                _this._oilSpillFrame = asset instanceof cc.SpriteFrame ? asset : asset;
            }
            var callbacks = _this._oilSpillFrameCallbacks.slice();
            _this._oilSpillFrameCallbacks = [];
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](_this._oilSpillFrame);
            }
        });
    };
    GameMap.prototype._preloadCoverTestFrame = function () {
        if (!COVER_TEST_FRAME_UUID || !cc.assetManager || !cc.assetManager.loadAny) {
            return;
        }
        this._loadCoverTestFrame();
    };
    GameMap.prototype._loadCoverTestFrame = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (this._coverTestFrame) {
            if (callback) {
                callback(this._coverTestFrame);
            }
            return;
        }
        if (callback) {
            this._coverTestFrameCallbacks.push(callback);
        }
        if (this._coverTestFrameLoading) {
            return;
        }
        this._coverTestFrameLoading = true;
        cc.assetManager.loadAny({ uuid: COVER_TEST_FRAME_UUID }, function (err, asset) {
            _this._coverTestFrameLoading = false;
            if (!err && asset) {
                _this._coverTestFrame = asset instanceof cc.SpriteFrame ? asset : asset;
            }
            var callbacks = _this._coverTestFrameCallbacks.slice();
            _this._coverTestFrameCallbacks = [];
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](_this._coverTestFrame);
            }
        });
    };
    GameMap.prototype._preloadEnergyEggFrame = function () {
        if (!ENERGY_EGG_FRAME_UUID || !cc.assetManager || !cc.assetManager.loadAny) {
            return;
        }
        this._loadEnergyEggFrame();
    };
    GameMap.prototype._loadEnergyEggFrame = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (this._energyEggFrame) {
            if (callback) {
                callback(this._energyEggFrame);
            }
            return;
        }
        if (callback) {
            this._energyEggFrameCallbacks.push(callback);
        }
        if (this._energyEggFrameLoading) {
            return;
        }
        this._energyEggFrameLoading = true;
        cc.assetManager.loadAny({ uuid: ENERGY_EGG_FRAME_UUID }, function (err, asset) {
            _this._energyEggFrameLoading = false;
            if (!err && asset) {
                _this._energyEggFrame = asset instanceof cc.SpriteFrame ? asset : asset;
            }
            var callbacks = _this._energyEggFrameCallbacks.slice();
            _this._energyEggFrameCallbacks = [];
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](_this._energyEggFrame);
            }
        });
    };
    GameMap.prototype._preloadEnergyEggBushFrame = function () {
        if (!TREE_GREEN_LARGE_FRAME_UUID || !cc.assetManager || !cc.assetManager.loadAny) {
            return;
        }
        this._loadEnergyEggBushFrame();
    };
    GameMap.prototype._loadEnergyEggBushFrame = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (this._energyEggBushFrame) {
            if (callback) {
                callback(this._energyEggBushFrame);
            }
            return;
        }
        if (callback) {
            this._energyEggBushFrameCallbacks.push(callback);
        }
        if (this._energyEggBushFrameLoading) {
            return;
        }
        this._energyEggBushFrameLoading = true;
        cc.assetManager.loadAny({ uuid: TREE_GREEN_LARGE_FRAME_UUID }, function (err, asset) {
            _this._energyEggBushFrameLoading = false;
            if (!err && asset) {
                _this._energyEggBushFrame = asset instanceof cc.SpriteFrame ? asset : asset;
            }
            var callbacks = _this._energyEggBushFrameCallbacks.slice();
            _this._energyEggBushFrameCallbacks = [];
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](_this._energyEggBushFrame);
            }
        });
    };
    GameMap.prototype._getKillBadgeColor = function (streak) {
        var color = KILL_BADGE_TINTS[streak] || KILL_BADGE_TINTS[1];
        return cc.color(color[0], color[1], color[2], 255);
    };
    GameMap.prototype._createKillBroadcastEntry = function (text) {
        var layer = this._ensureKillBroadcastLayer();
        if (!layer) {
            return null;
        }
        var entry = new cc.Node("_killBroadcastEntry");
        entry.parent = layer;
        entry.setContentSize(438, 56);
        entry.opacity = 0;
        entry["_expireAt"] = Date.now() + Math.floor(KILL_BROADCAST_DURATION * 1000);
        entry["_isExiting"] = false;
        var bg = entry.addComponent(cc.Graphics);
        bg.fillColor = cc.color(16, 20, 28, 220);
        bg.roundRect(-219, -28, 438, 56, 16);
        bg.fill();
        bg.strokeColor = cc.color(255, 186, 82, 220);
        bg.lineWidth = 2;
        bg.roundRect(-219, -28, 438, 56, 16);
        bg.stroke();
        var tagNode = new cc.Node("_lbBroadcastTag");
        tagNode.parent = entry;
        tagNode.setContentSize(100, 40);
        tagNode.setPosition(-160, 0);
        var tagLabel = tagNode.addComponent(cc.Label);
        tagLabel.string = "房间广播";
        tagLabel.fontSize = 22;
        tagLabel.lineHeight = 26;
        tagLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        tagLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        tagNode.color = cc.color(255, 214, 122, 255);
        var split = new cc.Node("_broadcastSplit");
        split.parent = entry;
        split.setPosition(-98, 0);
        var splitGraphics = split.addComponent(cc.Graphics);
        splitGraphics.lineWidth = 2;
        splitGraphics.strokeColor = cc.color(255, 255, 255, 60);
        splitGraphics.moveTo(0, -16);
        splitGraphics.lineTo(0, 16);
        splitGraphics.stroke();
        var labelNode = new cc.Node("_lbBroadcastText");
        labelNode.parent = entry;
        labelNode.setContentSize(236, 40);
        labelNode.setPosition(64, 0);
        var label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = 24;
        label.lineHeight = 28;
        label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        labelNode.color = cc.color(255, 255, 255, 255);
        return entry;
    };
    GameMap.prototype._layoutKillBroadcastEntries = function (fast, newEntry) {
        if (fast === void 0) { fast = false; }
        if (newEntry === void 0) { newEntry = null; }
        var layer = this._ensureKillBroadcastLayer();
        if (!layer) {
            return;
        }
        var size = this._getViewportSize();
        layer.setContentSize(size);
        var topY = Math.min(size.height / 2 - 120, (yyp.safeTopBottom || size.height / 2) - 96);
        var rightX = size.width / 2 - 246;
        var duration = fast ? 0.12 : 0.2;
        for (var i = 0; i < this._killBroadcastEntries.length; i++) {
            var entry = this._killBroadcastEntries[i];
            if (!cc.isValid(entry)) {
                continue;
            }
            var slot = this._killBroadcastEntries.length - 1 - i;
            var targetX = rightX;
            var targetY = topY - slot * KILL_BROADCAST_SLOT_HEIGHT;
            entry.stopAllActions();
            if (entry == newEntry) {
                entry.setPosition(targetX + 24, targetY - 18);
                entry.runAction(cc.spawn(cc.moveTo(duration, targetX, targetY), cc.fadeTo(duration, 255)));
            }
            else {
                entry.runAction(cc.spawn(cc.moveTo(duration, targetX, targetY), cc.fadeTo(duration, 255)));
            }
        }
    };
    GameMap.prototype._removeKillBroadcastEntry = function (entry, fast) {
        if (fast === void 0) { fast = false; }
        if (!entry || !cc.isValid(entry) || entry["_isExiting"]) {
            return;
        }
        entry["_isExiting"] = true;
        var index = this._killBroadcastEntries.indexOf(entry);
        if (index >= 0) {
            this._killBroadcastEntries.splice(index, 1);
        }
        var duration = fast ? 0.12 : 0.18;
        entry.stopAllActions();
        entry.runAction(cc.sequence(cc.spawn(cc.moveBy(duration, 28, 18), cc.fadeOut(duration)), cc.removeSelf()));
        this._layoutKillBroadcastEntries(true);
    };
    GameMap.prototype._pushKillBroadcast = function (text) {
        var entry = this._createKillBroadcastEntry(text);
        if (!entry) {
            return;
        }
        var fastExpireAt = Date.now() + 900;
        for (var i = 0; i < this._killBroadcastEntries.length; i++) {
            var oldEntry = this._killBroadcastEntries[i];
            if (oldEntry && cc.isValid(oldEntry) && !oldEntry["_isExiting"]) {
                oldEntry["_expireAt"] = Math.min(oldEntry["_expireAt"], fastExpireAt);
            }
        }
        this._killBroadcastEntries.push(entry);
        while (this._killBroadcastEntries.length > KILL_BROADCAST_MAX_VISIBLE) {
            var removed = this._killBroadcastEntries.shift();
            this._removeKillBroadcastEntry(removed, true);
        }
        this._layoutKillBroadcastEntries(true, entry);
    };
    GameMap.prototype._updateKillBroadcastEntries = function () {
        if (this._killBroadcastEntries.length <= 0) {
            return;
        }
        var now = Date.now();
        var entries = this._killBroadcastEntries.slice();
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (!cc.isValid(entry)) {
                var index = this._killBroadcastEntries.indexOf(entry);
                if (index >= 0) {
                    this._killBroadcastEntries.splice(index, 1);
                }
                continue;
            }
            if (!entry["_isExiting"] && now >= entry["_expireAt"]) {
                this._removeKillBroadcastEntry(entry, false);
            }
        }
    };
    GameMap.prototype._spawnKillBadgeLightning = function (parentNode, color) {
        for (var i = 0; i < 3; i++) {
            var lightning = new cc.Node("_killBadgeLightning" + i);
            lightning.parent = parentNode;
            lightning.setPosition(-80 + i * 80, 10 + Math.random() * 26);
            lightning.angle = -10 + Math.random() * 20;
            lightning.opacity = 0;
            var graphics = lightning.addComponent(cc.Graphics);
            graphics.lineWidth = 6;
            graphics.strokeColor = cc.color(color.r, color.g, color.b, 235);
            graphics.moveTo(-8, 42);
            graphics.lineTo(12, 10);
            graphics.lineTo(-2, 10);
            graphics.lineTo(14, -30);
            graphics.stroke();
            lightning.runAction(cc.sequence(cc.fadeTo(0.04, 255), cc.delayTime(0.08 + i * 0.03), cc.fadeOut(0.12)));
        }
    };
    GameMap.prototype._showKillBadgeStamp = function (streak) {
        var _this = this;
        var layer = this._ensureKillBadgeLayer();
        if (!layer) {
            return;
        }
        if (this._killBadgeActiveNode && cc.isValid(this._killBadgeActiveNode)) {
            this._killBadgeActiveNode.stopAllActions();
            this._killBadgeActiveNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.08, 1.1), cc.fadeOut(0.08)), cc.removeSelf()));
        }
        var badge = new cc.Node("_killBadgeStamp");
        badge.parent = layer;
        badge.setPosition(0, 12);
        badge.zIndex = 1;
        badge.opacity = 0;
        badge.scale = 1.42;
        badge.angle = -12;
        this._killBadgeActiveNode = badge;
        var color = this._getKillBadgeColor(streak);
        var glow = new cc.Node("_killBadgeGlow");
        glow.parent = badge;
        glow.opacity = 180;
        glow.scale = 0.8;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(color.r, color.g, color.b, streak >= 5 ? 88 : 56);
        glowGraphics.circle(0, 0, 128);
        glowGraphics.fill();
        glowGraphics.strokeColor = cc.color(255, 255, 255, 145);
        glowGraphics.lineWidth = 6;
        glowGraphics.circle(0, 0, 114);
        glowGraphics.stroke();
        var flash = new cc.Node("_killBadgeFlash");
        flash.parent = badge;
        flash.opacity = 180;
        var flashGraphics = flash.addComponent(cc.Graphics);
        flashGraphics.fillColor = cc.color(255, 255, 255, 95);
        flashGraphics.rect(-150, -12, 300, 24);
        flashGraphics.rect(-12, -120, 24, 240);
        flashGraphics.fill();
        var spriteNode = new cc.Node("_killBadgeSprite");
        spriteNode.parent = badge;
        spriteNode.setContentSize(360, 240);
        var sprite = spriteNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        spriteNode.color = color;
        if (streak >= 5) {
            this._spawnKillBadgeLightning(badge, color);
        }
        this._loadKillBadgeFrame(streak, function (spriteFrame) {
            if (sprite && cc.isValid(sprite) && spriteFrame) {
                sprite.spriteFrame = spriteFrame;
            }
        });
        badge.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.08, 255), cc.scaleTo(0.08, 0.92), cc.rotateTo(0.08, -2)), cc.spawn(cc.scaleTo(0.14, 1.03), cc.rotateTo(0.14, 0)), cc.delayTime(0.52), cc.spawn(cc.fadeOut(0.24), cc.scaleTo(0.24, 1.12)), cc.callFunc(function () {
            if (_this._killBadgeActiveNode == badge) {
                _this._killBadgeActiveNode = null;
            }
        }), cc.removeSelf()));
    };
    GameMap.prototype._recordKillStreak = function () {
        if (this._killStreakRemain > 0) {
            this._killStreakCount += 1;
        }
        else {
            this._killStreakCount = 1;
        }
        this._killStreakCount = Math.min(5, this._killStreakCount);
        this._killStreakRemain = KILL_STREAK_WINDOW;
        return this._killStreakCount;
    };
    //生成一个敌人
    GameMap.prototype.deleteEnemy = function (delEnemy) {
        for (var i = 0; i < this._enemys.length; i++) {
            var enemy = this._enemys[i];
            if (enemy == delEnemy) {
                if (this._killEffectTestMode || this._killBroadcastTestMode) {
                    this._deathEnemyCount += 1;
                    this._enemys.splice(i, 1);
                    yyp.eventCenter.emit("current-enemycount", { enemycount: Math.max(0, this._maxEnemyCount - this._deathEnemyCount) });
                    break;
                }
                this.createSkillIcon(delEnemy.position);
                this._deathEnemyCount += 1;
                yyp.eventCenter.emit("current-enemycount", { enemycount: this._maxEnemyCount - this._deathEnemyCount });
                this._enemys.splice(i, 1);
                break;
            }
        }
    };
    //获取敌人数量
    GameMap.prototype.enemyCount = function () {
        return this._enemys.length;
    };
    //生成一个技能icon
    GameMap.prototype.createSkillIcon = function (pos) {
        if (Math.random() < 0.06) {
            var skill = cc.instantiate(this.skillPrefab);
            skill.parent = this._fire._tmLayerObstacle;
            skill.position = pos;
            skill.script.setInGame();
            skill.zIndex = this.judgezIndex(skill.y);
            this._skills.push(skill);
        }
    };
    GameMap.prototype._getEnergyConfig = function (key, defaultValue) {
        var config = yyp.config.Energy || {};
        var value = config[key];
        return value == null ? defaultValue : value;
    };
    //随机生成一个能量
    GameMap.prototype.createEnergy = function () {
        var tile = this._getRandomPassableTile();
        if (tile == null) {
            return;
        }
        var energy = this.energyPrefab ? cc.instantiate(this.energyPrefab) : this._createDefaultEnergy();
        energy.parent = this._fire._tmLayerObstacle;
        energy.position = cc.v3(this.tileToGamePos(tile));
        energy.zIndex = this.judgezIndex(energy.y);
        var energyScript = energy.getComponent(EnergyItem_1.EnergyItem) || energy.addComponent(EnergyItem_1.EnergyItem);
        var value = this._getEnergyConfig("Value", 10);
        var lifeTime = this._getEnergyConfig("LifeTime", 12);
        energyScript.init(value, lifeTime);
        this._energys.push(energy);
    };
    GameMap.prototype.createEnergyAt = function (pos) {
        var energy = this.energyPrefab ? cc.instantiate(this.energyPrefab) : this._createDefaultEnergy();
        energy.parent = this._fire._tmLayerObstacle;
        energy.position = cc.v3(pos);
        energy.zIndex = this.judgezIndex(energy.y);
        var energyScript = energy.getComponent(EnergyItem_1.EnergyItem) || energy.addComponent(EnergyItem_1.EnergyItem);
        energyScript.init(this._getEnergyConfig("Value", 10), this._getEnergyConfig("LifeTime", 12));
        this._energys.push(energy);
        return energy;
    };
    GameMap.prototype.createEnergyAtForMultiplayer = function (energyData) {
        if (!energyData) {
            return null;
        }
        var pos = cc.v2(energyData.x || 0, energyData.y || 0);
        var energy = this.energyPrefab ? cc.instantiate(this.energyPrefab) : this._createDefaultEnergy();
        energy.parent = this._fire._tmLayerObstacle;
        energy.position = cc.v3(pos);
        energy.zIndex = this.judgezIndex(energy.y);
        energy["__energyId"] = energyData.id;
        var energyScript = energy.getComponent(EnergyItem_1.EnergyItem) || energy.addComponent(EnergyItem_1.EnergyItem);
        energyScript.init(energyData.value == null ? this._getEnergyConfig("Value", 10) : energyData.value, 999999);
        this._energys.push(energy);
        this._multiplayerEnergyMap[energyData.id] = energy;
        return energy;
    };
    GameMap.prototype.createEnergyEggTestSetup = function () {
        var _this = this;
        var setup = this._getEnergyEggTestSetupPositions();
        this.spawnEnergyEggBush(setup.bushPos, 94);
        this.spawnEnergyEggAt(setup.eggPos, {
            lifeTime: 10,
            radius: 34,
            energyCount: 18,
            energyScatterRadius: 136
        });
        this.node.runAction(cc.sequence(cc.delayTime(0.45), cc.callFunc(function () {
            _this._showPlayerBubble("把能量蛋推进草丛");
        })));
    };
    GameMap.prototype._getEnergyEggTestSetupPositions = function () {
        var basePos = this._player && cc.isValid(this._player)
            ? cc.v2(this._player.position)
            : cc.v2(this._playerBornPos || cc.v2(0, 0));
        var dirs = [
            cc.v2(1, 0),
            cc.v2(0.82, 0.32),
            cc.v2(0.82, -0.32),
            cc.v2(0.2, 1),
        ];
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i].normalize();
            var eggPos = this.clampMapInnerPosition(basePos.add(dir.mul(150)), 68);
            var bushPos = this.clampMapInnerPosition(basePos.add(dir.mul(300)), 96);
            if (this.testColliders(eggPos, 38).length > 0 || this.testColliders(bushPos, 52).length > 0) {
                continue;
            }
            return {
                eggPos: eggPos,
                bushPos: bushPos,
            };
        }
        return {
            eggPos: this.clampMapInnerPosition(basePos.add(cc.v2(150, 0)), 68),
            bushPos: this.clampMapInnerPosition(basePos.add(cc.v2(300, 0)), 96),
        };
    };
    GameMap.prototype.spawnEnergyEggBush = function (pos, radius) {
        if (radius === void 0) { radius = 94; }
        if (!this._fire._tmLayerObstacle) {
            return null;
        }
        var root = new cc.Node("_energyEggBush");
        root.parent = this._fire._tmLayerObstacle;
        root.setPosition(cc.v3(pos));
        root.zIndex = this.judgezIndex(pos.y) + 2;
        var shadow = new cc.Node("_energyEggBushShadow");
        shadow.parent = root;
        shadow.setPosition(0, -14);
        var shadowGraphics = shadow.addComponent(cc.Graphics);
        shadowGraphics.fillColor = cc.color(0, 0, 0, 60);
        shadowGraphics.ellipse(0, 0, radius * 0.62, radius * 0.22);
        shadowGraphics.fill();
        var spriteNode = new cc.Node("_energyEggBushSprite");
        spriteNode.parent = root;
        spriteNode.setPosition(0, 8);
        spriteNode.setContentSize(radius * 1.95, radius * 1.95);
        var sprite = spriteNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this._loadEnergyEggBushFrame(function (spriteFrame) {
            if (sprite && cc.isValid(sprite) && spriteFrame) {
                sprite.spriteFrame = spriteFrame;
            }
        });
        var bush = {
            node: root,
            radius: radius,
        };
        this._energyEggBushes.push(bush);
        return bush;
    };
    GameMap.prototype.spawnEnergyEggAt = function (pos, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (!this._fire._tmLayerObstacle) {
            return null;
        }
        var root = new cc.Node("EnergyEgg");
        root.parent = this._fire._tmLayerObstacle;
        root.setPosition(cc.v3(pos));
        root.zIndex = this.judgezIndex(pos.y) + 1;
        var eggScript = root.addComponent(EnergyEgg_1.EnergyEgg);
        var egg = {
            node: root,
            script: eggScript,
            eggId: options.eggId == null ? null : options.eggId,
            radius: options.radius == null ? 34 : options.radius,
            energyCount: options.energyCount == null ? 16 : options.energyCount,
            energyScatterRadius: options.energyScatterRadius == null ? 130 : options.energyScatterRadius,
            burstDone: false,
        };
        var matureCallback = options.hasOwnProperty("onMature")
            ? options.onMature
            : function () {
                _this._handleEnergyEggMature(egg);
            };
        eggScript.init({
            lifeTime: options.lifeTime == null ? 10 : options.lifeTime,
            radius: egg.radius,
            autoMature: options.autoMature,
            onMature: matureCallback
        });
        this._loadEnergyEggFrame(function (spriteFrame) {
            if (eggScript && cc.isValid(eggScript)) {
                eggScript.setSpriteFrame(spriteFrame);
            }
        });
        this._energyEggs.push(egg);
        return egg;
    };
    GameMap.prototype._createMultiplayerBurstEnergy = function (origin, energyData) {
        if (!energyData || energyData.id == null) {
            return null;
        }
        var energy = this.createEnergyAtForMultiplayer(energyData);
        if (!energy || !cc.isValid(energy)) {
            return null;
        }
        var fromPos = origin ? cc.v2(origin) : cc.v2(energy.position);
        energy.setPosition(cc.v3(fromPos));
        energy.scale = 0.18;
        energy.runAction(cc.spawn(cc.scaleTo(0.32, 1), cc.jumpTo(0.38, cc.v2(energyData.x, energyData.y), 42 + Math.random() * 18, 1)));
        return energy;
    };
    GameMap.prototype._spawnMultiplayerEnergyEgg = function (eggData) {
        if (!eggData || eggData.id == null) {
            return null;
        }
        var exist = this._multiplayerEnergyEggMap[eggData.id];
        if (exist && exist.node && cc.isValid(exist.node)) {
            return exist;
        }
        var egg = this.spawnEnergyEggAt(cc.v2(eggData.x || 0, eggData.y || 0), {
            eggId: eggData.id,
            lifeTime: eggData.remainTime == null ? 10 : eggData.remainTime,
            radius: eggData.radius == null ? 34 : eggData.radius,
            energyCount: eggData.energyCount == null ? 16 : eggData.energyCount,
            energyScatterRadius: eggData.energyScatterRadius == null ? 130 : eggData.energyScatterRadius,
            autoMature: false,
            onMature: null,
        });
        if (!egg) {
            return null;
        }
        if (eggData.mature) {
            egg.script.forceMature();
            egg.burstDone = true;
        }
        this._multiplayerEnergyEggMap[eggData.id] = egg;
        return egg;
    };
    GameMap.prototype._moveMultiplayerEnergyEgg = function (payload) {
        if (!payload || payload.eggId == null) {
            return;
        }
        var egg = this._multiplayerEnergyEggMap[payload.eggId];
        if (!egg || !egg.node || !cc.isValid(egg.node)) {
            return;
        }
        var nextPos = cc.v2(payload.x || 0, payload.y || 0);
        egg.node.setPosition(cc.v3(nextPos));
        egg.node.zIndex = this.judgezIndex(nextPos.y) + 1;
    };
    GameMap.prototype._matureMultiplayerEnergyEgg = function (payload) {
        if (!payload || payload.eggId == null) {
            return;
        }
        var egg = this._multiplayerEnergyEggMap[payload.eggId];
        if (!egg) {
            egg = this._spawnMultiplayerEnergyEgg({
                id: payload.eggId,
                x: payload.x,
                y: payload.y,
                mature: true,
                radius: payload.radius,
                energyCount: payload.energyCount,
                energyScatterRadius: payload.energyScatterRadius,
                remainTime: 0,
            });
        }
        if (!egg || !egg.script) {
            return;
        }
        var origin = cc.v2(payload.x == null ? egg.node.x : payload.x, payload.y == null ? egg.node.y : payload.y);
        egg.node.setPosition(cc.v3(origin));
        if (!egg.script.isMature()) {
            egg.script.forceMature();
        }
        egg.burstDone = true;
        var energies = Array.isArray(payload.energies) ? payload.energies : [];
        for (var i = 0; i < energies.length; i++) {
            this._createMultiplayerBurstEnergy(origin, energies[i]);
        }
        this.playKillExplosionEffectAt(origin);
    };
    GameMap.prototype._removeMultiplayerEnergyEgg = function (eggId) {
        if (eggId == null) {
            return;
        }
        var egg = this._multiplayerEnergyEggMap[eggId];
        delete this._multiplayerEnergyEggMap[eggId];
        if (!egg) {
            return;
        }
        for (var i = this._energyEggs.length - 1; i >= 0; i--) {
            if (this._energyEggs[i] === egg) {
                this._energyEggs.splice(i, 1);
                break;
            }
        }
        if (egg.node && cc.isValid(egg.node)) {
            egg.node.destroy();
        }
    };
    GameMap.prototype._handleEnergyEggMature = function (egg) {
        var _this = this;
        if (!egg || egg.burstDone || !egg.node || !cc.isValid(egg.node)) {
            return;
        }
        egg.burstDone = true;
        var origin = cc.v2(egg.node.position);
        var count = egg.energyCount || 16;
        var scatterRadius = egg.energyScatterRadius || 130;
        for (var i = 0; i < count; i++) {
            var angle = Math.PI * 2 * i / count + Math.random() * 0.42;
            var distance = 40 + Math.random() * scatterRadius;
            var targetPos = this.clampMapInnerPosition(origin.add(cc.v2(Math.cos(angle) * distance, Math.sin(angle) * distance)), 42);
            if (this.testColliders(targetPos, 18).length > 0) {
                targetPos = this.clampMapInnerPosition(origin.add(cc.v2(Math.cos(angle) * 42, Math.sin(angle) * 42)), 42);
            }
            var energy = this.createEnergyAt(origin);
            energy.scale = 0.18;
            energy.runAction(cc.spawn(cc.scaleTo(0.32, 1), cc.jumpTo(0.36 + Math.random() * 0.08, targetPos, 42 + Math.random() * 18, 1)));
        }
        this.playKillExplosionEffectAt(origin);
        if (this._player && cc.isValid(this._player)) {
            this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                _this._showPlayerBubble("成熟了, 回来收能量");
            })));
        }
    };
    GameMap.prototype.spawnOilTestPickup = function (pos) {
        if (pos === void 0) { pos = null; }
        if (!this._fire._tmLayerObstacle) {
            return null;
        }
        var pickup = new cc.Node("OilPickup");
        pickup.parent = this._fire._tmLayerObstacle;
        pickup.addComponent(OilPickup_1.OilPickup);
        pickup.position = cc.v3(pos || this._getOilTestPickupPos());
        pickup.zIndex = this.judgezIndex(pickup.y);
        pickup.script.setInGame(18);
        this._skills.push(pickup);
        return pickup;
    };
    GameMap.prototype.spawnTarPickupAt = function (pos, pickupId) {
        if (pickupId === void 0) { pickupId = null; }
        if (!this._fire._tmLayerObstacle) {
            return null;
        }
        var pickup = new cc.Node("OilPickup");
        pickup.parent = this._fire._tmLayerObstacle;
        pickup.addComponent(OilPickup_1.OilPickup);
        pickup.position = cc.v3(pos || this._getOilTestPickupPos());
        pickup.zIndex = this.judgezIndex(pickup.y);
        pickup.script.setInGame(18);
        if (pickupId != null) {
            pickup["__tarPickupId"] = pickupId;
        }
        this._skills.push(pickup);
        return pickup;
    };
    GameMap.prototype.createCoverTestEnemy = function () {
        if (!this._player || !cc.isValid(this._player)) {
            return null;
        }
        var enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = cc.v3(this._getCoverTestEnemyPos());
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11, this._levelId);
        enemy.script._config = Object.assign({}, enemy.script._config);
        enemy.script._config.AttackRadius = 880;
        enemy.script._config.BulletCodeTime = 0.32;
        enemy.script._config.Speed = 0;
        enemy.script._bulletCodeTime = enemy.script._config.BulletCodeTime;
        enemy.script._codeTime = 99999;
        enemy.script._walkPaths = [];
        enemy.script._willPos = null;
        enemy.stopAllActions();
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._coverTestEnemy = enemy;
        this._enemys.push(enemy);
        return enemy;
    };
    GameMap.prototype._getCoverTestEnemyPos = function () {
        var playerPos = this._player && cc.isValid(this._player)
            ? cc.v2(this._player.position)
            : cc.v2(this._playerBornPos || cc.v2(0, 0));
        var dirs = [
            cc.v2(1, 0.12),
            cc.v2(1, -0.16),
            cc.v2(0.86, 0.38),
            cc.v2(0.86, -0.38),
        ];
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i].normalize();
            var pos = this.clampMapInnerPosition(playerPos.add(dir.mul(420 + i * 20)), 86);
            if (this.testColliders(pos, 52).length == 0 && this.lineLinePassColliders(pos, playerPos) == false) {
                return pos;
            }
        }
        return this.clampMapInnerPosition(playerPos.add(cc.v2(420, 0)), 86);
    };
    GameMap.prototype.spawnCoverTestCovers = function (count) {
        if (count === void 0) { count = 6; }
        this._coverTestCovers = [];
        var playerPos = this._player && cc.isValid(this._player)
            ? cc.v2(this._player.position)
            : cc.v2(this._playerBornPos || cc.v2(0, 0));
        for (var i = 0; i < count; i++) {
            this._createCoverTestCover(this._getCoverTestCoverSpawnPos(playerPos, i, count));
        }
    };
    GameMap.prototype._getCoverTestCoverSpawnPos = function (playerPos, index, count) {
        for (var i = 0; i < 24; i++) {
            var baseAngle = Math.PI * 2 * ((index + i * 0.37) % count) / count;
            var angle = baseAngle + (Math.random() - 0.5) * 0.9;
            var distance = 110 + Math.random() * 180;
            var pos = cc.v2(playerPos).add(cc.v2(Math.cos(angle) * distance, Math.sin(angle) * distance));
            pos = this.clampMapInnerPosition(pos, 48);
            if (this.testColliders(pos, 38).length > 0) {
                continue;
            }
            if (pos.sub(playerPos).mag() < 90) {
                continue;
            }
            if (this._coverTestEnemy && cc.isValid(this._coverTestEnemy) && pos.sub(this._coverTestEnemy.position).mag() < 120) {
                continue;
            }
            var blocked = false;
            for (var j = 0; j < this._coverTestCovers.length; j++) {
                var cover = this._coverTestCovers[j];
                if (cover && cover.node && cc.isValid(cover.node) && pos.sub(cover.node.position).mag() < 86) {
                    blocked = true;
                    break;
                }
            }
            if (!blocked) {
                return pos;
            }
        }
        return this.clampMapInnerPosition(playerPos.add(cc.v2(140 + index * 18, index % 2 == 0 ? 90 : -90)), 48);
    };
    GameMap.prototype._createCoverTestCover = function (pos) {
        if (!this._fire._tmLayerObstacle) {
            return null;
        }
        var root = new cc.Node("_coverTestCrate");
        root.parent = this._fire._tmLayerObstacle;
        root.setPosition(cc.v3(pos));
        root.zIndex = this.judgezIndex(pos.y) + 1;
        var shadow = new cc.Node("_coverTestCrateShadow");
        shadow.parent = root;
        shadow.setPosition(0, -9);
        var shadowGraphics = shadow.addComponent(cc.Graphics);
        shadowGraphics.fillColor = cc.color(0, 0, 0, 68);
        shadowGraphics.ellipse(0, 0, 24, 12);
        shadowGraphics.fill();
        var spriteNode = new cc.Node("_coverSprite");
        spriteNode.parent = root;
        spriteNode.setContentSize(70, 70);
        var sprite = spriteNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this._loadCoverTestFrame(function (spriteFrame) {
            if (sprite && cc.isValid(sprite) && spriteFrame) {
                sprite.spriteFrame = spriteFrame;
            }
        });
        var crack = new cc.Node("_coverCrack");
        crack.parent = root;
        crack.zIndex = 2;
        crack["$Graphics"] = crack.addComponent(cc.Graphics);
        var hpNode = new cc.Node("_coverHp");
        hpNode.parent = root;
        hpNode.setPosition(0, 48);
        hpNode.color = cc.color(255, 243, 214, 255);
        var hpLabel = hpNode.addComponent(cc.Label);
        hpLabel.fontSize = 20;
        hpLabel.lineHeight = 22;
        hpLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        hpLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var cover = {
            node: root,
            radius: 34,
            hp: 5,
            maxHp: 5,
            attached: false,
            owner: null,
            attachOffset: cc.v2(0, 0),
        };
        root["__coverTestData"] = cover;
        root["$Crack"] = crack;
        root["$HpLabel"] = hpLabel;
        this._coverTestCovers.push(cover);
        this._refreshCoverTestCoverVisual(cover);
        return cover;
    };
    GameMap.prototype._refreshCoverTestCoverVisual = function (cover) {
        if (!cover || !cover.node || !cc.isValid(cover.node)) {
            return;
        }
        var lostHp = cover.maxHp - cover.hp;
        var spriteNode = cover.node.getChildByName("_coverSprite");
        if (spriteNode) {
            spriteNode.scale = 1 - lostHp * 0.03;
            spriteNode.color = cc.color(255, 255 - lostHp * 14, 255 - lostHp * 22, 255);
        }
        if (cover.node["$HpLabel"]) {
            cover.node["$HpLabel"].string = cover.hp + "/" + cover.maxHp;
        }
        if (cover.node["$Crack"] && cover.node["$Crack"]["$Graphics"]) {
            var graphics = cover.node["$Crack"]["$Graphics"];
            graphics.clear();
            if (lostHp > 0) {
                graphics.lineWidth = 2 + Math.min(2, lostHp * 0.35);
                graphics.strokeColor = cc.color(70, 42, 18, 220);
                graphics.moveTo(-10, 18);
                graphics.lineTo(-4, 7);
                graphics.lineTo(-11, -7);
                graphics.stroke();
                if (lostHp >= 2) {
                    graphics.moveTo(6, 17);
                    graphics.lineTo(1, 1);
                    graphics.lineTo(11, -12);
                    graphics.stroke();
                }
                if (lostHp >= 4) {
                    graphics.moveTo(-18, 2);
                    graphics.lineTo(-4, -5);
                    graphics.lineTo(8, -20);
                    graphics.stroke();
                }
            }
        }
    };
    GameMap.prototype._getOilTestPickupPos = function () {
        var basePos = this._player && cc.isValid(this._player)
            ? cc.v2(this._player.position)
            : cc.v2(this._playerBornPos || cc.v2(0, 0));
        var candidateDirs = [
            cc.v2(0, 1),
            cc.v2(1, 0),
            cc.v2(-1, 0),
            cc.v2(0, -1),
        ];
        for (var i = 0; i < candidateDirs.length; i++) {
            var pos = this.clampMapInnerPosition(basePos.add(candidateDirs[i].mul(150)), 70);
            if (this.testColliders(pos, 42).length == 0) {
                return pos;
            }
        }
        return this.clampMapInnerPosition(basePos.add(cc.v2(0, 120)), 70);
    };
    GameMap.prototype._createDefaultEnergy = function () {
        var energy = new cc.Node("EnergyItem");
        energy.addComponent(EnergyItem_1.EnergyItem);
        return energy;
    };
    GameMap.prototype._getRandomPassableTile = function () {
        var keys = Object.keys(this._checkList);
        if (keys.length == 0) {
            return null;
        }
        for (var i = 0; i < 20; i++) {
            var item = this._checkList[keys[Math.floor(Math.random() * keys.length)]];
            if (item && this._isEnergyTileEmpty(item)) {
                return cc.v2(item.x, item.y);
            }
        }
        return null;
    };
    GameMap.prototype._isEnergyTileEmpty = function (tile) {
        var pos = this.tileToGamePos(tile);
        var minDistance = this._getEnergyConfig("MinDistance", 120);
        if (this._player && cc.isValid(this._player)) {
            var playerLen = pos.sub(this._player.position).mag();
            if (playerLen < minDistance) {
                return false;
            }
        }
        for (var i = 0; i < this._energys.length; i++) {
            var energy = this._energys[i];
            if (cc.isValid(energy)) {
                var len = pos.sub(energy.position).mag();
                if (len < minDistance) {
                    return false;
                }
            }
        }
        return true;
    };
    GameMap.prototype.getMultiplayerEnergySpawnPoints = function (limit) {
        if (limit === void 0) { limit = 256; }
        var keys = Object.keys(this._checkList || {});
        if (keys.length <= 0) {
            return [];
        }
        var result = [];
        var step = Math.max(1, Math.floor(keys.length / limit));
        for (var i = 0; i < keys.length; i += step) {
            var item = this._checkList[keys[i]];
            if (!item) {
                continue;
            }
            var pos = this.tileToGamePos(cc.v2(item.x, item.y));
            result.push({
                x: Math.round(pos.x),
                y: Math.round(pos.y),
            });
            if (result.length >= limit) {
                break;
            }
        }
        return result;
    };
    GameMap.prototype.getMultiplayerMapBounds = function () {
        return {
            halfWidth: Math.round(this._tmSize.width / 2),
            halfHeight: Math.round(this._tmSize.height / 2),
        };
    };
    GameMap.prototype.getMultiplayerSpawnCandidates = function () {
        var candidates = this._getMultiplayerSpawnCandidates();
        var result = [];
        for (var i = 0; i < candidates.length; i++) {
            var pos = candidates[i];
            if (!pos) {
                continue;
            }
            result.push({
                x: Math.round(pos.x),
                y: Math.round(pos.y),
            });
        }
        return result;
    };
    //获取最近的敌人
    GameMap.prototype.getNearEnemy = function () {
        var ret = null;
        var retLen = 0;
        for (var i = 0; i < this._enemys.length; i++) {
            var enemy = this._enemys[i];
            var enemyPos = cc.v2(enemy.position);
            var playerPos = cc.v2(this._player.position);
            var len = enemyPos.sub(playerPos).mag();
            if (ret == null || len < retLen) {
                ret = enemy;
                retLen = len;
            }
        }
        return ret;
    };
    //在同一个tile,还有其他敌人
    GameMap.prototype.isHaveOtherEnemy = function (enemy) {
        for (var i = 0; i < this._enemys.length; i++) {
            var otherEnemy = this._enemys[i];
            if (otherEnemy != enemy) {
                var tile = this.gamePosToTile(enemy.position);
                var otherTile = this.gamePosToTile(otherEnemy.position);
                if (tile.x == otherTile.x && tile.y == otherTile.y) {
                    return true;
                }
            }
        }
        return false;
    };
    //按下
    GameMap.prototype._onTouchStart = function (event) {
        var a = 1;
        // let point = this.node.convertToNodeSpaceAR(event.getLocation());
        // let tile = this.gamePosToTile(point);
    };
    GameMap.prototype.resetMap = function () {
        for (var row = 0; row < this._tiledMap.getMapSize().width; row++) {
            for (var col = 0; col < this._tiledMap.getMapSize().height; col++) {
                this._tmGroup.setTileGIDAt(1, cc.v2(row, col));
            }
        }
    };
    //tiled map坐标转换为游戏坐标
    GameMap.prototype._tilePosToGamePos = function (tiledPos) {
        var pos = cc.v2(tiledPos.x, this._tmSize.height - tiledPos.y);
        pos.x = pos.x - this._tmSize.width / 2;
        pos.y = pos.y - this._tmSize.height / 2;
        return pos;
    };
    //tile坐标转换为游戏坐标
    GameMap.prototype.tileToGamePos = function (tile) {
        var x = tile.x * this._tileSize.width + this._tileSize.width / 2;
        var y = tile.y * this._tileSize.height + this._tileSize.height / 2;
        return this._tilePosToGamePos(cc.v2(x, y));
    };
    //游戏坐标转换为tiled map坐标
    GameMap.prototype._gamePosToTilePos = function (gamePos) {
        var pos = cc.v2(gamePos);
        pos.x = pos.x + this._tmSize.width / 2;
        pos.y = pos.y + this._tmSize.height / 2;
        pos.y = this._tmSize.height - pos.y;
        return pos;
    };
    //游戏坐标转换为tile坐标
    GameMap.prototype.gamePosToTile = function (gamePos) {
        var tilePos = this._gamePosToTilePos(gamePos);
        var x = Math.floor(tilePos.x / this._tileSize.width);
        var y = Math.floor(tilePos.y / this._tileSize.height);
        return cc.v2(x, y);
    };
    //初始化A*检测列表
    GameMap.prototype.initCheckList = function () {
        var ret = {};
        for (var x = 0; x < this._tiledMap.getMapSize().width; x++) {
            for (var y = 0; y < this._tiledMap.getMapSize().height; y++) {
                var pos = this.tileToGamePos(cc.v2(x, y));
                if (this.testColliders(pos, 50).length == 0) {
                    var item = {};
                    item.x = x;
                    item.y = y;
                    item.G = 0;
                    item.H = 0;
                    item.father = null;
                    item.passable = {};
                    ret[x + "_" + y] = item;
                    // this._tmGroup.setTileGIDAt(3, cc.v2(x,y));
                }
            }
        }
        for (var x = 0; x < this._tiledMap.getMapSize().width; x++) {
            for (var y = 0; y < this._tiledMap.getMapSize().height; y++) {
                var item = ret[x + "_" + y];
                var pos = this.tileToGamePos(cc.v2(x, y));
                if (item) {
                    for (var newx = x - 1; newx <= x + 1; newx++) {
                        for (var newy = y - 1; newy <= y + 1; newy++) {
                            var newItem = ret[newx + "_" + newy];
                            var newPassableItem = item.passable[newx + "_" + newy];
                            if ((x != newx || y != newy) && newItem && newPassableItem == null) {
                                var newpos = this.tileToGamePos(cc.v2(newx, newy));
                                if (this.circleCirclePassColliders(pos, newpos, 50) == false) {
                                    item.passable[newx + "_" + newy] = 1;
                                    newItem.passable[x + "_" + y] = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        return ret;
    };
    //获取A*检测列表
    GameMap.prototype.getCheckList = function () {
        var objString = JSON.stringify(this._checkList);
        return JSON.parse(objString);
    };
    //获取pos所在tile,最近的可通行tile
    GameMap.prototype.getPassableTile = function (tile, referTile) {
        //判断自己
        // if (this._checkList[tile.x + "_" + tile.y]) {
        //     return tile;
        // }
        //判断一环
        var retTile = null;
        var retLen = 0;
        for (var x = -1; x <= 1; x++) {
            for (var y = -1; y <= 1; y++) {
                if (x != 0 || y != 0) {
                    var newx = tile.x + x;
                    var newy = tile.y + y;
                    var newtile = this._checkList[newx + "_" + newy];
                    if (newtile) {
                        var len = (referTile.x - newx) * (referTile.x - newx) + (referTile.y - newy) * (referTile.y - newy);
                        if (retTile == null || len < retLen) {
                            retTile = newtile;
                            retLen = len;
                        }
                    }
                }
            }
        }
        if (retTile) {
            return retTile;
        }
        //判断二环
        retTile = null;
        retLen = 0;
        for (var x = -2; x <= 2; x++) {
            for (var y = -2; y <= 2; y++) {
                if (x == -2 || x == 2 || y == -2 || y == 2) {
                    var newx = tile.x + x;
                    var newy = tile.y + y;
                    var newtile = this._checkList[newx + "_" + newy];
                    if (newtile) {
                        var len = (referTile.x - newx) * (referTile.x - newx) + (referTile.y - newy) * (referTile.y - newy);
                        if (retTile == null || len < retLen) {
                            retTile = newtile;
                            retLen = len;
                        }
                    }
                }
            }
        }
        if (retTile) {
            return retTile;
        }
        return tile;
    };
    //获取pos所在tile,最近的可通行tile
    GameMap.prototype.getPassableTileEx = function (tile) {
        //判断一环
        var retTiles = [];
        for (var x = -2; x <= 2; x++) {
            for (var y = -2; y <= 2; y++) {
                if (x != 0 || y != 0) {
                    var newx = tile.x + x;
                    var newy = tile.y + y;
                    var newtile = this._checkList[newx + "_" + newy];
                    if (newtile) {
                        retTiles.push(newtile);
                    }
                }
            }
        }
        if (retTiles.length > 0) {
            var index = Math.floor(Math.random() * retTiles.length);
            return retTiles[index];
        }
        return tile;
    };
    // 线段PP1,是否会经过colliders中的一条线段
    GameMap.prototype.lineLinePassColliders = function (P, P1) {
        for (var i = 0; i < this._colliders.length; i++) {
            var collider = this._colliders[i];
            var A = collider.offset.add(collider.points[0]);
            var B = collider.offset.add(collider.points[1]);
            if (Utils_1.Utils.linePassLine(P, P1, A, B)) {
                return true;
            }
        }
        return false;
    };
    // 点P,P1为圆心,radius为半径的圆,是否会经过colliders中的一条线段
    GameMap.prototype.circleCirclePassColliders = function (P, P1, radius) {
        for (var i = 0; i < this._colliders.length; i++) {
            var collider = this._colliders[i];
            var A = collider.offset.add(collider.points[0]);
            var B = collider.offset.add(collider.points[1]);
            if (Utils_1.Utils.circleCirclePassLine(P, P1, radius, A, B)) {
                return true;
            }
        }
        return false;
    };
    //碰撞测试(以点P为圆心,半径为radius的圆,是否和colliders中的线段相交)
    GameMap.prototype.testColliders = function (P, radius) {
        var colliderItems = [];
        for (var key in this._colliders) {
            if (this._colliders.hasOwnProperty(key)) {
                var collider = this._colliders[key];
                var A = collider.offset.add(collider.points[0]);
                var B = collider.offset.add(collider.points[1]);
                var colliderItem = Utils_1.Utils.getPointLineShortestInfo(P, A, B);
                if (colliderItem.len <= radius) {
                    colliderItem.collider = collider;
                    colliderItems.push(colliderItem);
                }
            }
        }
        return colliderItems;
    };
    //每帧调用
    GameMap.prototype.update = function (dt) {
        if (this._pause)
            return;
        this._updateKillBroadcastEntries();
        this._updateOilSpills(dt);
        this._updateEnergyEggTest();
        if (this._killStreakRemain > 0) {
            this._killStreakRemain -= dt;
            if (this._killStreakRemain <= 0) {
                this._killStreakRemain = 0;
                this._killStreakCount = 0;
            }
        }
        if (this._gaming) {
            this._bornCdTime += dt;
            if (this.isTestMode() == false &&
                this._bornCdTime > 1 &&
                this._enemys.length < this._timeMaxEnemyCount &&
                this._bornEnemyCount < this._maxEnemyCount) {
                this._bornCdTime = 0;
                this.createEnemy();
                this._bornEnemyCount += 1;
            }
            //地图滚动
            this.rollMap();
            if (this.isTestMode() == false) {
                this._updateEnergy(dt);
                this._updateSinglePlayerTarPickup(dt);
            }
            if (this._player && cc.isValid(this._player)) {
                this._playerLastPos = this._player.position;
            }
        }
        else {
            if (this._roamFlg) {
                var roamPosition = cc.v2(this.node.position).add(this._roamDir);
                roamPosition = this._correctMapPosition(roamPosition);
                if (roamPosition.x == this.node.x && roamPosition.y == this.node.y) {
                    this._roamDir.x = Math.floor(Math.random() * 3) - 1;
                    this._roamDir.y = Math.floor(Math.random() * 3) - 1;
                }
                else {
                    this.node.x = roamPosition.x;
                    this.node.y = roamPosition.y;
                }
            }
        }
    };
    GameMap.prototype._updateOilSpills = function (dt) {
        for (var i = this._oilSpills.length - 1; i >= 0; i--) {
            var spill = this._oilSpills[i];
            if (!spill || !spill.node || !cc.isValid(spill.node)) {
                this._oilSpills.splice(i, 1);
                continue;
            }
            spill.lifeTime -= dt;
            if (spill.lifeTime <= 0) {
                spill.node.destroy();
                this._oilSpills.splice(i, 1);
                continue;
            }
            var fadeStart = Math.min(2.2, spill.duration * 0.3);
            var opacity = 255;
            if (spill.lifeTime < fadeStart) {
                opacity = Math.floor(255 * (spill.lifeTime / fadeStart));
            }
            spill.node.opacity = Math.max(0, opacity);
            spill.node.zIndex = this.judgezIndex(spill.node.y) - 2;
        }
    };
    //地图滚动
    GameMap.prototype.rollMap = function () {
        if (this._player && cc.isValid(this._player)) {
            var ret = this._correctMapPosition(cc.v2(-this._player.x, -this._player.y));
            this.node.x = ret.x;
            this.node.y = ret.y;
        }
    };
    GameMap.prototype.spawnOilSpill = function (pos, options) {
        if (options === void 0) { options = {}; }
        if (!this._tmDecal || !cc.isValid(this._tmDecal)) {
            return null;
        }
        var spillPos = this.clampMapInnerPosition(cc.v2(pos), 68);
        var radius = options.radius || OIL_SPILL_RADIUS;
        var duration = options.duration || OIL_SPILL_DURATION;
        var slowFactor = options.slowFactor || OIL_SPILL_SLOW_FACTOR;
        var root = new cc.Node("_oilSpill");
        root.parent = this._tmDecal;
        root.setPosition(cc.v3(spillPos));
        root.zIndex = this.judgezIndex(spillPos.y) - 2;
        var spriteNode = new cc.Node("_oilSpillSprite");
        spriteNode.parent = root;
        spriteNode.opacity = 228;
        spriteNode.setContentSize(radius * 2.15, radius * 2.15);
        var sprite = spriteNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        spriteNode.color = cc.color(80, 56, 30, 228);
        this._loadOilSpillFrame(function (spriteFrame) {
            if (sprite && cc.isValid(sprite) && spriteFrame) {
                sprite.spriteFrame = spriteFrame;
            }
        });
        var rim = new cc.Node("_oilSpillRim");
        rim.parent = root;
        var rimGraphics = rim.addComponent(cc.Graphics);
        rimGraphics.lineWidth = 5;
        rimGraphics.strokeColor = cc.color(145, 104, 62, 135);
        rimGraphics.circle(0, 0, radius * 0.9);
        rimGraphics.stroke();
        var core = new cc.Node("_oilSpillCore");
        core.parent = root;
        var coreGraphics = core.addComponent(cc.Graphics);
        coreGraphics.fillColor = cc.color(26, 18, 14, 110);
        coreGraphics.circle(0, 0, radius * 0.72);
        coreGraphics.fill();
        var splash = new cc.Node("_oilSpillSplash");
        splash.parent = root;
        splash.opacity = 0;
        splash.scale = 0.45;
        var splashGraphics = splash.addComponent(cc.Graphics);
        splashGraphics.lineWidth = 7;
        splashGraphics.strokeColor = cc.color(188, 142, 86, 160);
        splashGraphics.circle(0, 0, radius * 0.58);
        splashGraphics.stroke();
        splash.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.1, 220), cc.scaleTo(0.1, 1.12)), cc.spawn(cc.fadeOut(0.24), cc.scaleTo(0.24, 1.55)), cc.removeSelf()));
        var spill = {
            node: root,
            radius: radius,
            slowFactor: slowFactor,
            lifeTime: duration,
            duration: duration,
        };
        this._oilSpills.push(spill);
        return root;
    };
    GameMap.prototype.showOilShellPreview = function (fromPos, toPos, options) {
        if (options === void 0) { options = {}; }
        this.hideOilShellPreview();
        if (!this._tmDecal || !cc.isValid(this._tmDecal) || !fromPos || !toPos) {
            return;
        }
        var root = new cc.Node("_oilShellPreview");
        root.parent = this._tmDecal;
        root.zIndex = 4000;
        this._oilShellPreviewNode = root;
        var line = new cc.Node("_oilShellPreviewLine");
        line.parent = root;
        var graphics = line.addComponent(cc.Graphics);
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(190, 150, 92, 220);
        var start = cc.v2(fromPos);
        var end = cc.v2(toPos);
        var control = start.add(end).mul(0.5).add(cc.v2(0, options.radius || 110));
        graphics.moveTo(start.x, start.y);
        for (var i = 1; i <= 18; i++) {
            var t = i / 18;
            var inv = 1 - t;
            var point = start.mul(inv * inv).add(control.mul(2 * inv * t)).add(end.mul(t * t));
            graphics.lineTo(point.x, point.y);
        }
        graphics.stroke();
        var target = new cc.Node("_oilShellPreviewTarget");
        target.parent = root;
        target.setPosition(cc.v3(end));
        var targetGraphics = target.addComponent(cc.Graphics);
        var areaRadius = options.areaRadius || OIL_SPILL_RADIUS;
        targetGraphics.lineWidth = 4;
        targetGraphics.strokeColor = cc.color(115, 88, 54, 220);
        targetGraphics.circle(0, 0, areaRadius * 0.92);
        targetGraphics.stroke();
        targetGraphics.fillColor = cc.color(24, 20, 18, 55);
        targetGraphics.circle(0, 0, areaRadius * 0.72);
        targetGraphics.fill();
    };
    GameMap.prototype.hideOilShellPreview = function () {
        if (this._oilShellPreviewNode && cc.isValid(this._oilShellPreviewNode)) {
            this._oilShellPreviewNode.destroy();
        }
        this._oilShellPreviewNode = null;
    };
    GameMap.prototype.playOilShellThrow = function (fromPos, toPos, options) {
        if (options === void 0) { options = {}; }
        if (!this._fire._tmLayerObstacle || !fromPos || !toPos) {
            if (options && options.onLand) {
                options.onLand();
            }
            return;
        }
        var shell = new cc.Node("_oilThrowShell");
        shell.parent = this._fire._tmLayerObstacle;
        shell.setPosition(cc.v3(fromPos));
        shell.zIndex = 5200;
        var graphics = shell.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(70, 48, 28, 235);
        graphics.circle(0, 0, 18);
        graphics.fill();
        graphics.fillColor = cc.color(24, 18, 14, 220);
        graphics.circle(-6, 2, 7);
        graphics.fill();
        graphics.circle(7, -3, 8);
        graphics.fill();
        var start = cc.v2(fromPos);
        var end = cc.v2(toPos);
        var control = start.add(end).mul(0.5).add(cc.v2(0, options.arcHeight || 110));
        var duration = 0.28;
        var self = this;
        var tData = { value: 0 };
        shell.runAction(cc.sequence(cc.spawn(cc.rotateBy(duration, 220), cc.sequence(cc.callFunc(function () {
            shell["__throwScheduler"] = function () {
                tData.value += 1 / Math.max(1, Math.floor(duration * 60));
                if (tData.value > 1) {
                    tData.value = 1;
                }
                var t = tData.value;
                var inv = 1 - t;
                var point = start.mul(inv * inv).add(control.mul(2 * inv * t)).add(end.mul(t * t));
                shell.setPosition(cc.v3(point));
                shell.zIndex = 5200;
            };
            self.schedule(shell["__throwScheduler"], 0);
        }), cc.delayTime(duration))), cc.callFunc(function () {
            if (shell["__throwScheduler"]) {
                self.unschedule(shell["__throwScheduler"]);
            }
            shell.destroy();
            if (options && options.onLand) {
                options.onLand();
            }
        })));
    };
    GameMap.prototype.getTerrainSpeedFactor = function (pos, radius) {
        if (radius === void 0) { radius = 0; }
        var factor = 1;
        var checkPos = cc.v2(pos);
        for (var i = this._oilSpills.length - 1; i >= 0; i--) {
            var spill = this._oilSpills[i];
            if (!spill || !spill.node || !cc.isValid(spill.node)) {
                this._oilSpills.splice(i, 1);
                continue;
            }
            var limit = spill.radius + radius * 0.35;
            if (checkPos.sub(spill.node.position).mag() <= limit) {
                factor = Math.min(factor, spill.slowFactor);
            }
        }
        return factor;
    };
    GameMap.prototype._updateEnergyEggTest = function () {
        if (this._energyEggs.length <= 0 && this._energyEggBushes.length <= 0) {
            return;
        }
        for (var i = this._energyEggBushes.length - 1; i >= 0; i--) {
            var bush = this._energyEggBushes[i];
            if (!bush || !bush.node || !cc.isValid(bush.node)) {
                this._energyEggBushes.splice(i, 1);
                continue;
            }
            bush.node.zIndex = this.judgezIndex(bush.node.y) + 2;
        }
        for (var i = this._energyEggs.length - 1; i >= 0; i--) {
            var egg = this._energyEggs[i];
            if (!egg || !egg.node || !cc.isValid(egg.node) || !egg.script) {
                this._energyEggs.splice(i, 1);
                continue;
            }
            var hidden = false;
            for (var j = 0; j < this._energyEggBushes.length; j++) {
                var bush = this._energyEggBushes[j];
                if (!bush || !bush.node || !cc.isValid(bush.node)) {
                    continue;
                }
                if (cc.v2(egg.node.position).sub(bush.node.position).mag() <= bush.radius * 0.78) {
                    hidden = true;
                    break;
                }
            }
            egg.script.setHiddenInBush(hidden);
            egg.node.zIndex = this.judgezIndex(egg.node.y) + 1;
        }
        if (this._multiplayerMode) {
            return;
        }
        if (this._player && cc.isValid(this._player) && this._player.script) {
            this._pushEnergyEggsByPlayer(this._player.script);
        }
    };
    GameMap.prototype._pushEnergyEggsByPlayer = function (player) {
        if (!player || !player.node || !cc.isValid(player.node) || player._currentSpeed <= 0.25) {
            return;
        }
        var playerPos = cc.v2(player.node.position);
        var playerDir = player._dir && player._dir.magSqr() > 0 ? cc.v2(player._dir).normalize() : cc.v2(1, 0);
        var playerRadius = player.getRadius ? player.getRadius() : 38;
        for (var i = 0; i < this._energyEggs.length; i++) {
            var egg = this._energyEggs[i];
            if (!egg || !egg.node || !cc.isValid(egg.node) || !egg.script) {
                continue;
            }
            var eggPos = cc.v2(egg.node.position);
            var offset = eggPos.sub(playerPos);
            var minDistance = playerRadius * 0.48 + egg.script.getRadius() + 8;
            if (offset.mag() > minDistance) {
                continue;
            }
            var pushDir = offset.magSqr() > 9 ? offset.normalize() : playerDir;
            if (pushDir.dot(playerDir) < -0.2) {
                continue;
            }
            var pushDistance = Math.max(1.6, player._currentSpeed * (egg.script.isMature() ? 0.42 : 0.62));
            var nextPos = this.clampMapInnerPosition(eggPos.add(pushDir.mul(pushDistance)), egg.script.getRadius() + 8);
            if (this.testColliders(nextPos, egg.script.getRadius() + 3).length > 0) {
                continue;
            }
            if (this._isEnergyEggBlockedByOtherEgg(egg, nextPos)) {
                continue;
            }
            egg.node.setPosition(cc.v3(nextPos));
            egg.node.zIndex = this.judgezIndex(nextPos.y) + 1;
        }
    };
    GameMap.prototype._isEnergyEggBlockedByOtherEgg = function (currentEgg, nextPos) {
        for (var i = 0; i < this._energyEggs.length; i++) {
            var other = this._energyEggs[i];
            if (other == currentEgg || !other || !other.node || !cc.isValid(other.node) || !other.script) {
                continue;
            }
            var limit = currentEgg.script.getRadius() + other.script.getRadius() + 8;
            if (cc.v2(other.node.position).sub(nextPos).mag() < limit) {
                return true;
            }
        }
        return false;
    };
    GameMap.prototype._getViewportSize = function () {
        var canvas = Utils_1.Utils.getCurrentSceneCanvas();
        if (canvas && cc.isValid(canvas)) {
            return canvas.getContentSize();
        }
        var visibleSize = cc.view.getVisibleSize();
        if (visibleSize && visibleSize.width > 0 && visibleSize.height > 0) {
            return visibleSize;
        }
        if (yyp.gameFrameSize) {
            return yyp.gameFrameSize;
        }
        return cc.winSize;
    };
    GameMap.prototype.clampMapInnerPosition = function (pos, padding) {
        if (padding === void 0) { padding = 0; }
        var ret = cc.v2(pos);
        var halfWidth = Math.max(0, this._tmSize.width / 2 - padding);
        var halfHeight = Math.max(0, this._tmSize.height / 2 - padding);
        if (ret.x < -halfWidth) {
            ret.x = -halfWidth;
        }
        if (ret.x > halfWidth) {
            ret.x = halfWidth;
        }
        if (ret.y < -halfHeight) {
            ret.y = -halfHeight;
        }
        if (ret.y > halfHeight) {
            ret.y = halfHeight;
        }
        return ret;
    };
    GameMap.prototype._correctMapPosition = function (ret) {
        var viewportSize = this._getViewportSize();
        var x = Math.max(0, (this._tmSize.width - viewportSize.width) / 2);
        var y = Math.max(0, (this._tmSize.height - viewportSize.height) / 2);
        var minPos = cc.v2(-x, -y);
        var maxPos = cc.v2(x, y);
        if (ret.x < minPos.x) {
            ret.x = minPos.x;
        }
        if (ret.x > maxPos.x) {
            ret.x = maxPos.x;
        }
        if (ret.y < minPos.y) {
            ret.y = minPos.y;
        }
        if (ret.y > maxPos.y) {
            ret.y = maxPos.y;
        }
        return ret;
    };
    //线段与矩形相交或者包含在矩形里面
    GameMap.prototype._lineInRect = function (A, B, rect) {
        if ((A.x >= rect.x && A.x <= rect.x + rect.width && A.y >= rect.y && A.y <= rect.y + rect.height) ||
            (B.x >= rect.x && B.x <= rect.x + rect.width && B.y >= rect.y && B.y <= rect.y + rect.height) ||
            cc.Intersection.lineRect(A, B, rect)) {
            return true;
        }
        return false;
    };
    //子弹,障碍物碰撞检测
    GameMap.prototype.bulletObstacleCollisionTest = function (P, P1) {
        return this.getBulletObstacleCollisionSegment(P, P1) != null;
    };
    GameMap.prototype.getBulletObstacleCollisionSegment = function (P, P1) {
        //获取碰撞区
        var currArea = null;
        for (var i = 0; i < this._logicArea.length; i++) {
            var area = this._logicArea[i];
            if (P.x >= area.x && P.x <= area.x + area.width && P.y >= area.y && P.y <= area.y + area.height) {
                currArea = area;
                break;
            }
        }
        if (currArea) {
            for (var i = 0; i < currArea.length; i++) {
                var A = currArea[i].A;
                var B = currArea[i].B;
                if (cc.Intersection.lineLine(P, P1, A, B)) {
                    return { A: A, B: B };
                }
            }
        }
        else {
            // cc.log("未找到碰撞分区")
        }
        return null;
    };
    GameMap.prototype._distancePointToSegment = function (point, A, B) {
        var AB = B.sub(A);
        var lenSqr = AB.magSqr();
        if (lenSqr <= 0) {
            return point.sub(A).mag();
        }
        var t = point.sub(A).dot(AB) / lenSqr;
        t = cc.misc.clampf(t, 0, 1);
        var projection = A.add(AB.mul(t));
        return point.sub(projection).mag();
    };
    GameMap.prototype._cleanupInvalidCoverTestCovers = function () {
        for (var i = this._coverTestCovers.length - 1; i >= 0; i--) {
            var cover = this._coverTestCovers[i];
            if (!cover || !cover.node || !cc.isValid(cover.node)) {
                this._coverTestCovers.splice(i, 1);
            }
        }
    };
    GameMap.prototype._getAttachedCoverTestCover = function (player) {
        if (player === void 0) { player = null; }
        this._cleanupInvalidCoverTestCovers();
        var ownerNode = player && player.node ? player.node : null;
        for (var i = 0; i < this._coverTestCovers.length; i++) {
            var cover = this._coverTestCovers[i];
            if (cover && cover.attached) {
                if (!ownerNode || cover.owner == ownerNode) {
                    return cover;
                }
            }
        }
        return null;
    };
    GameMap.prototype._getNearestAttachableCover = function (player) {
        if (!player || !player.node || !cc.isValid(player.node)) {
            return null;
        }
        this._cleanupInvalidCoverTestCovers();
        var playerPos = cc.v2(player.node.position);
        var nearest = null;
        var nearestLen = 0;
        for (var i = 0; i < this._coverTestCovers.length; i++) {
            var cover = this._coverTestCovers[i];
            if (!cover || !cover.node || !cc.isValid(cover.node) || cover.attached) {
                continue;
            }
            var len = playerPos.sub(cover.node.position).mag();
            if (len <= 110 && (nearest == null || len < nearestLen)) {
                nearest = cover;
                nearestLen = len;
            }
        }
        return nearest;
    };
    GameMap.prototype.refreshCoverTestButton = function (player) {
        if (!this._coverTestMode || !player || !player.node || !cc.isValid(player.node)) {
            yyp.eventCenter.emit("cover-button-state", { visible: false });
            return;
        }
        var attached = this._getAttachedCoverTestCover(player);
        if (attached) {
            yyp.eventCenter.emit("cover-button-state", { visible: true, mode: "detach" });
            return;
        }
        var nearest = this._getNearestAttachableCover(player);
        yyp.eventCenter.emit("cover-button-state", { visible: !!nearest, mode: "attach" });
    };
    GameMap.prototype.tryToggleCoverTestAttachment = function (player) {
        if (!this._coverTestMode || !player || !player.node || !cc.isValid(player.node)) {
            return false;
        }
        var attached = this._getAttachedCoverTestCover(player);
        if (attached) {
            this._detachCoverTestCover(attached);
            this.refreshCoverTestButton(player);
            return true;
        }
        var nearest = this._getNearestAttachableCover(player);
        if (!nearest) {
            if (player._showSacrificeTip) {
                player._showSacrificeTip("靠近掩体后才能吸附");
            }
            this.refreshCoverTestButton(player);
            return false;
        }
        this._attachCoverTestCover(nearest, player);
        this.refreshCoverTestButton(player);
        return true;
    };
    GameMap.prototype._attachCoverTestCover = function (cover, player) {
        if (!cover || !cover.node || !cc.isValid(cover.node) || !player || !player.node || !cc.isValid(player.node)) {
            return;
        }
        var offset = cc.v2(cover.node.position).sub(player.node.position);
        if (offset.magSqr() <= 25) {
            offset = player._dir && player._dir.magSqr() > 0 ? player._dir.normalize().mul(70) : cc.v2(70, 0);
        }
        else {
            offset = offset.normalize().mul(Math.max(60, Math.min(84, offset.mag())));
        }
        cover.attached = true;
        cover.owner = player.node;
        cover.attachOffset = offset;
        this.syncAttachedCoverTestCover(player);
    };
    GameMap.prototype._detachCoverTestCover = function (cover) {
        if (!cover) {
            return;
        }
        cover.attached = false;
        cover.owner = null;
    };
    GameMap.prototype.forceDetachCoverTestFromPlayer = function (player) {
        var attached = this._getAttachedCoverTestCover(player);
        if (attached) {
            this._detachCoverTestCover(attached);
        }
        yyp.eventCenter.emit("cover-button-state", { visible: false });
    };
    GameMap.prototype.syncAttachedCoverTestCover = function (player) {
        if (!this._coverTestMode || !player || !player.node || !cc.isValid(player.node)) {
            return;
        }
        var cover = this._getAttachedCoverTestCover(player);
        if (!cover || !cover.attachOffset) {
            return;
        }
        var pos = cc.v2(player.node.position).add(cover.attachOffset);
        pos = this.clampMapInnerPosition(pos, cover.radius + 6);
        cover.node.setPosition(cc.v3(pos));
        cover.node.zIndex = this.judgezIndex(pos.y) + 1;
    };
    GameMap.prototype.tryHandleCoverBulletCollision = function (fromPos, toPos, bullet) {
        if (!this._coverTestMode || !bullet || bullet._camp != "enemy") {
            return false;
        }
        this._cleanupInvalidCoverTestCovers();
        var hitCover = null;
        var hitLen = 0;
        for (var i = 0; i < this._coverTestCovers.length; i++) {
            var cover = this._coverTestCovers[i];
            if (!cover || !cover.node || !cc.isValid(cover.node)) {
                continue;
            }
            var distance = this._distancePointToSegment(cc.v2(cover.node.position), cc.v2(fromPos), cc.v2(toPos));
            if (distance <= cover.radius + 4) {
                var len = cc.v2(cover.node.position).sub(fromPos).magSqr();
                if (hitCover == null || len < hitLen) {
                    hitCover = cover;
                    hitLen = len;
                }
            }
        }
        if (!hitCover) {
            return false;
        }
        this._damageCoverTestCover(hitCover, bullet);
        return true;
    };
    GameMap.prototype._damageCoverTestCover = function (cover, bullet) {
        if (bullet === void 0) { bullet = null; }
        if (!cover || !cover.node || !cc.isValid(cover.node)) {
            return;
        }
        cover.hp = Math.max(0, cover.hp - 1);
        this._refreshCoverTestCoverVisual(cover);
        this._playCoverTestHitEffect(cover);
        if (bullet) {
            if (bullet.doDestroy) {
                bullet.doDestroy();
            }
            else if (bullet.node && cc.isValid(bullet.node)) {
                bullet.node.destroy();
            }
        }
        if (cover.hp <= 0) {
            this._breakCoverTestCover(cover);
        }
        else if (this._player && cc.isValid(this._player) && this._player.script && this._coverTestMode) {
            this.refreshCoverTestButton(this._player.script);
        }
    };
    GameMap.prototype._playCoverTestHitEffect = function (cover) {
        var flash = new cc.Node("_coverHitFx");
        flash.parent = cover.node;
        flash.opacity = 190;
        flash.scale = 0.72;
        var graphics = flash.addComponent(cc.Graphics);
        graphics.lineWidth = 4;
        graphics.strokeColor = cc.color(255, 220, 160, 220);
        graphics.rect(-24, -24, 48, 48);
        graphics.stroke();
        flash.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.08, 1.12), cc.fadeOut(0.08)), cc.removeSelf()));
    };
    GameMap.prototype._breakCoverTestCover = function (cover) {
        if (!cover || !cover.node || !cc.isValid(cover.node)) {
            return;
        }
        var breakPos = cc.v2(cover.node.position);
        this._detachCoverTestCover(cover);
        for (var i = 0; i < 6; i++) {
            var shard = new cc.Node("_coverShard");
            shard.parent = this._fire._tmLayerObstacle;
            shard.setPosition(cc.v3(breakPos));
            shard.zIndex = this.judgezIndex(breakPos.y) + 3;
            var graphics = shard.addComponent(cc.Graphics);
            graphics.fillColor = cc.color(158 + Math.floor(Math.random() * 32), 112, 68, 240);
            graphics.rect(-5, -5, 10, 10);
            graphics.fill();
            var angle = Math.PI * 2 * i / 6 + Math.random() * 0.4;
            var distance = 26 + Math.random() * 22;
            shard.runAction(cc.sequence(cc.spawn(cc.moveBy(0.22, Math.cos(angle) * distance, Math.sin(angle) * distance + 10), cc.rotateBy(0.22, 150 + Math.random() * 180), cc.fadeOut(0.22)), cc.removeSelf()));
        }
        cover.node.destroy();
        this._cleanupInvalidCoverTestCovers();
        if (this._player && cc.isValid(this._player) && this._player.script) {
            this.refreshCoverTestButton(this._player.script);
        }
    };
    GameMap.prototype.tryTeleportBullet = function (bullet, fromPos, toPos) {
        if (!this._portalTestMode || !bullet || !this._portalPairs || this._portalPairs.length == 0) {
            return false;
        }
        var ignorePortalId = bullet.getPortalIgnoreId ? bullet.getPortalIgnoreId() : "";
        for (var i = 0; i < this._portalPairs.length; i++) {
            var portal = this._portalPairs[i];
            if (portal.id == ignorePortalId) {
                continue;
            }
            if (this._distancePointToSegment(portal.pos, cc.v2(fromPos), cc.v2(toPos)) > portal.radius) {
                continue;
            }
            var exitOffset = bullet._dir && bullet._dir.magSqr() > 0
                ? bullet._dir.normalize().mul(portal.radius + Math.max(16, bullet._speed * 1.8))
                : cc.v2(portal.radius + 18, 0);
            var exitPos = this.clampMapInnerPosition(portal.exitPos.add(exitOffset), 40);
            if (bullet.teleportByPortal) {
                bullet.teleportByPortal(exitPos, portal.exitId);
            }
            this._spawnPortalWarpFx(portal.pos, cc.color(110, 255, 245, 255));
            this._spawnPortalWarpFx(portal.exitPos, cc.color(255, 120, 220, 255));
            return true;
        }
        return false;
    };
    GameMap.prototype.tryEnterCentrifugalRing = function (bullet, fromPos, toPos) {
        if (!this._centrifugalRingTestMode || !bullet || !this._centrifugalRingData) {
            return false;
        }
        if (bullet.hasUsedCentrifugalRing && bullet.hasUsedCentrifugalRing()) {
            return false;
        }
        var ring = this._centrifugalRingData;
        if (this._distancePointToSegment(ring.center, cc.v2(fromPos), cc.v2(toPos)) > ring.triggerRadius) {
            return false;
        }
        return bullet.enterCentrifugalRing ? bullet.enterCentrifugalRing(ring) : false;
    };
    //子弹,碰撞检测
    GameMap.prototype.bulletEnemyCollisionTest = function (P, camp, ownerPlayerId) {
        if (ownerPlayerId === void 0) { ownerPlayerId = -1; }
        if (this._multiplayerMode && camp == "player") {
            for (var i = 0; i < this._multiplayerPlayers.length; i++) {
                var player = this._multiplayerPlayers[i];
                if (!player || !cc.isValid(player) || i == ownerPlayerId) {
                    continue;
                }
                var len = P.sub(player.position).mag();
                var radius = player.script.getRadius();
                if (len < radius) {
                    return player;
                }
            }
            return null;
        }
        if (camp == "player") {
            for (var i = 0; i < this._enemys.length; i++) {
                var enemy = this._enemys[i];
                var len = P.sub(enemy.position).mag();
                var radius = enemy.script.getRadius();
                if (len < radius) {
                    return enemy;
                }
            }
        }
        else {
            if (this._player && cc.isValid(this._player)) {
                var len = P.sub(this._player.position).mag();
                var radius = this._player.script.getRadius();
                if (len < radius) {
                    return this._player;
                }
            }
        }
        return null;
    };
    //玩家和技能icon,碰撞检测
    GameMap.prototype.playerSkillIconCollisionTest = function () {
        for (var i = 0; i < this._skills.length; i++) {
            var skill = this._skills[i];
            if (cc.isValid(skill)) {
                var playerRect = this._player.script.getPlayerBoundingBox();
                var skillRect = skill.script.getSkillBoundingBox();
                if (cc.Intersection.rectRect(playerRect, skillRect)) {
                    if (this._multiplayerMode && skill["__tarPickupId"] != null) {
                        yyp.eventCenter.emit("multiplayer-tar-pickup", {
                            pickupId: skill["__tarPickupId"],
                        });
                        return;
                    }
                    skill.script.emitSkill();
                    this._skills.splice(i, 1);
                    skill.destroy();
                    return;
                }
            }
            else {
                this._skills.splice(i, 1);
            }
        }
        this.playerEnergyCollisionTest();
    };
    //玩家和能量,碰撞检测
    GameMap.prototype.playerEnergyCollisionTest = function () {
        for (var i = 0; i < this._energys.length; i++) {
            var energy = this._energys[i];
            if (cc.isValid(energy)) {
                var energyScript = energy.getComponent(EnergyItem_1.EnergyItem);
                if (!energyScript) {
                    this._energys.splice(i, 1);
                    energy.destroy();
                    return;
                }
                var playerRect = this._player.script.getPlayerBoundingBox();
                var energyRect = energyScript.getEnergyBoundingBox();
                if (cc.Intersection.rectRect(playerRect, energyRect)) {
                    if (this._multiplayerMode) {
                        var energyId = energy["__energyId"];
                        yyp.eventCenter.emit("multiplayer-energy-pickup", {
                            energyId: energyId,
                        });
                    }
                    else {
                        this._player.script.addEnergy(energyScript.getValue());
                        this._energys.splice(i, 1);
                        energy.destroy();
                    }
                    return;
                }
            }
            else {
                this._energys.splice(i, 1);
            }
        }
    };
    GameMap.prototype._updateEnergy = function (dt) {
        for (var i = this._energys.length - 1; i >= 0; i--) {
            if (!cc.isValid(this._energys[i])) {
                this._energys.splice(i, 1);
            }
        }
        this._energyCdTime += dt;
        var interval = this._getEnergyConfig("BornInterval", 4);
        var maxCount = this._getEnergyConfig("MaxCount", 6);
        if (this._energyCdTime < interval || this._energys.length >= maxCount) {
            return;
        }
        this._energyCdTime = 0;
        this.createEnergy();
    };
    GameMap.prototype._updateSinglePlayerTarPickup = function (dt) {
        if (this._multiplayerMode || !this._gaming || !this._player || !cc.isValid(this._player)) {
            return;
        }
        for (var i = this._skills.length - 1; i >= 0; i--) {
            var skill = this._skills[i];
            if (!cc.isValid(skill)) {
                this._skills.splice(i, 1);
                continue;
            }
            if (skill.name == "OilPickup") {
                return;
            }
        }
        this._tarPickupCdTime += dt;
        if (this._tarPickupCdTime < TAR_PICKUP_SINGLEPLAYER_INTERVAL) {
            return;
        }
        this._tarPickupCdTime = 0;
        this.spawnTarPickupAt(this._getOilTestPickupPos());
    };
    //计算zIndex
    GameMap.prototype.judgezIndex = function (y) {
        return this._tmSize.height - Math.floor(y);
    };
    //开始游戏
    GameMap.prototype.startGame = function (func) {
        //获取关卡数据
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = this._levelConfig.EnemyCount * this._levelId;
        this._timeMaxEnemyCount = this._levelConfig.Max + Math.floor(this._levelId / 5);
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: this._maxEnemyCount });
        this._roamFlg = false;
        this._tarPickupCdTime = TAR_PICKUP_SINGLEPLAYER_INTERVAL - 1.2;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self._gaming = true;
            func();
        })));
        Analytics_1.Analytics.getInstance().eventEx('start_game', { "level": this._levelId });
    };
    GameMap.prototype.startKillEffectTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = true;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createKillEffectTestEnemy();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startKillBroadcastTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = true;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 5;
        this._timeMaxEnemyCount = 5;
        this._bornEnemyCount = 5;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 5 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createKillBroadcastTestEnemies();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startPlayerHitTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = true;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createPlayerHitTestEnemy();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startUpgradeTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = true;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 0;
        this._timeMaxEnemyCount = 0;
        this._bornEnemyCount = 0;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 0 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startShootEffectTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = true;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createShootEffectTestEnemy();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startPortalTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = true;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createPortalTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startCentrifugalRingTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = true;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createCentrifugalRingTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startCoverTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = true;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createCoverTestEnemy();
            self.spawnCoverTestCovers(6);
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startEnergyEggTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._energyEggTestMode = true;
        this._maxEnemyCount = 0;
        this._timeMaxEnemyCount = 0;
        this._bornEnemyCount = 0;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 0 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createEnergyEggTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startDamageDoubleTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = true;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createDamageDoubleTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startSpeedDoubleTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = true;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createSpeedDoubleTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startSpreadBulletTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._spreadBulletTestMode = true;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createSpreadBulletTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startBounceObstacleTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = true;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createBounceObstacleTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startBlackHoleTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._clusterBombTestMode = false;
        this._blackHoleTestMode = true;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 1 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createBlackHoleTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.startClusterBombTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._resetKillBroadcastRuntime();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = true;
        this._maxEnemyCount = 12;
        this._timeMaxEnemyCount = 12;
        this._bornEnemyCount = 12;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid", { levelid: this._levelId });
        yyp.eventCenter.emit("current-enemycount", { enemycount: 12 });
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            self.createPlayer();
            self.createClusterBombTestSetup();
            self._gaming = true;
            func();
        })));
    };
    GameMap.prototype.isTestMode = function () {
        return this._killEffectTestMode || this._killBroadcastTestMode || this._playerHitTestMode || this._upgradeTestMode || this._shootEffectTestMode || this._portalTestMode || this._centrifugalRingTestMode || this._coverTestMode || this._energyEggTestMode || this._damageDoubleTestMode || this._speedDoubleTestMode || this._spreadBulletTestMode || this._bounceObstacleTestMode || this._blackHoleTestMode || this._clusterBombTestMode;
    };
    GameMap.prototype.isShootEffectTestMode = function () {
        return this._shootEffectTestMode;
    };
    GameMap.prototype.isKillEffectTestMode = function () {
        return this._killEffectTestMode;
    };
    GameMap.prototype.isKillBroadcastTestMode = function () {
        return this._killBroadcastTestMode;
    };
    GameMap.prototype.handleKillEffectTestEnemyDeath = function (enemyNode) {
        var _this = this;
        if (!enemyNode || !cc.isValid(enemyNode)) {
            return;
        }
        var deathPos = cc.v2(enemyNode.position);
        this.deleteEnemy(enemyNode);
        if (enemyNode.script) {
            enemyNode.script.enabled = false;
        }
        enemyNode.stopAllActions();
        this._showKillSkull(deathPos);
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            _this._showPlayerBubble("就这？");
        })));
        var self = this;
        this.node.runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(function () {
            self.playKillExplosionEffectAt(deathPos);
            if (self._player && cc.isValid(self._player) && self._player.script
                && self._player.script._spawnDeathAftermathAt) {
                self._player.script._spawnDeathAftermathAt(deathPos, self._fire._tmLayerObstacle);
            }
            self._dropTestEnergy(deathPos);
            if (cc.isValid(enemyNode)) {
                enemyNode.destroy();
            }
        })));
    };
    GameMap.prototype.handleKillBroadcastTestEnemyDeath = function (enemyNode) {
        if (!enemyNode || !cc.isValid(enemyNode)) {
            return;
        }
        var deathPos = cc.v2(enemyNode.position);
        var victimName = enemyNode["_killVictimName"] || "敌方坦克";
        var streak = this._recordKillStreak();
        this.deleteEnemy(enemyNode);
        if (enemyNode.script) {
            enemyNode.script.enabled = false;
        }
        enemyNode.stopAllActions();
        this._showKillSkull(deathPos);
        this._pushKillBroadcast("我击杀了" + victimName);
        this._showKillBadgeStamp(streak);
        if (streak >= 5) {
            this._showPlayerBubble("我在carry");
        }
        var self = this;
        this.node.runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(function () {
            self.playKillExplosionEffectAt(deathPos);
            if (self._player && cc.isValid(self._player) && self._player.script
                && self._player.script._spawnDeathAftermathAt) {
                self._player.script._spawnDeathAftermathAt(deathPos, self._fire._tmLayerObstacle);
            }
            if (cc.isValid(enemyNode)) {
                enemyNode.destroy();
            }
        })));
    };
    GameMap.prototype._showKillSkull = function (pos) {
        var skull = new cc.Node("_killSkull");
        skull.parent = this._fire._tmLayerObstacle;
        skull.setPosition(cc.v3(pos.x, pos.y + 85, 0));
        skull.zIndex = 6000;
        skull.opacity = 0;
        skull.scale = 1;
        var label = skull.addComponent(cc.Label);
        label.string = "💀";
        label.fontSize = 48;
        label.lineHeight = 52;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        skull.runAction(cc.sequence(cc.spawn(cc.moveBy(0.1, 0, 34), cc.fadeTo(0.1, 255), cc.scaleTo(0.1, 0.5)), cc.delayTime(0.3), cc.fadeOut(0.1), cc.removeSelf()));
    };
    GameMap.prototype._dropTestEnergy = function (pos) {
        var fromPos = cc.v2(pos);
        var toPos = this.clampMapInnerPosition(fromPos.add(cc.v2(70, 35)), 40);
        var energy = this.createEnergyAt(fromPos);
        energy.scale = 0.2;
        energy.runAction(cc.spawn(cc.scaleTo(0.28, 1), cc.jumpTo(0.35, toPos, 42, 1)));
    };
    GameMap.prototype._showPlayerBubble = function (text) {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }
        var bubble = new cc.Node("_killBubble");
        bubble.parent = this._fire._tmLayerObstacle;
        bubble.setPosition(cc.v3(this._player.x, this._player.y + 105, 0));
        bubble.zIndex = 6000;
        var bg = bubble.addComponent(cc.Graphics);
        bg.fillColor = cc.color(255, 255, 255, 235);
        bg.roundRect(-58, -24, 116, 48, 12);
        bg.fill();
        bg.strokeColor = cc.color(40, 40, 40, 240);
        bg.lineWidth = 2;
        bg.roundRect(-58, -24, 116, 48, 12);
        bg.stroke();
        var labelNode = new cc.Node("_lbBubble");
        labelNode.parent = bubble;
        labelNode.setContentSize(116, 48);
        var label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = 24;
        label.lineHeight = 28;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        labelNode.color = cc.color(20, 20, 20);
        bubble.runAction(cc.sequence(cc.spawn(cc.moveBy(0.15, 0, 12), cc.fadeIn(0.15)), cc.delayTime(1), cc.fadeOut(0.25), cc.removeSelf()));
    };
    GameMap.prototype._shakeMap = function () {
        var _this = this;
        var origin = cc.v3(this.node.position);
        this.node.stopActionByTag(9101);
        var action = cc.sequence(cc.moveBy(0.03, 4, 0), cc.moveBy(0.03, -8, 0), cc.moveBy(0.03, 4, 3), cc.moveBy(0.03, 0, -3), cc.callFunc(function () {
            _this.node.setPosition(origin);
        }));
        action.setTag(9101);
        this.node.runAction(action);
    };
    GameMap.prototype.playPlayerCritFeedback = function () {
        var _this = this;
        var origin = cc.v3(this.node.position);
        this.node.stopActionByTag(9102);
        var action = cc.sequence(cc.moveBy(0.02, 2, 0), cc.moveBy(0.02, -4, 0), cc.moveBy(0.02, 2, 1), cc.moveBy(0.02, 0, -1), cc.callFunc(function () {
            _this.node.setPosition(origin);
        }));
        action.setTag(9102);
        this.node.runAction(action);
    };
    GameMap.prototype.playLightScreenShake = function () {
        var _this = this;
        var origin = cc.v3(this.node.position);
        this.node.stopActionByTag(9103);
        var action = cc.sequence(cc.moveBy(0.02, 2, 0), cc.moveBy(0.02, -4, 0), cc.moveBy(0.02, 2, 1), cc.moveBy(0.02, 0, -1), cc.callFunc(function () {
            _this.node.setPosition(origin);
        }));
        action.setTag(9103);
        this.node.runAction(action);
    };
    //设置结束
    GameMap.prototype.setFinish = function () {
        this._gaming = false;
    };
    GameMap.prototype.cleanMap = function () {
        this.node.stopAllActions();
        this._gaming = false;
        this._pause = false;
        this._multiplayerMode = false;
        this._multiplayerPlayers = [];
        this._multiplayerBullets = {};
        this._multiplayerSpecialEventMap = {};
        this._multiplayerSpawnSlots = [];
        this._multiplayerSafeZone = null;
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._resetKillBroadcastRuntime();
        this._clearPortalTestNodes();
        this._clearCentrifugalRingTestNodes();
        this._clearDamageDoubleTestNodes();
        this._clearSpeedDoubleTestNodes();
        this._clearSpreadBulletTestNodes();
        this._clearBounceObstacleTestNodes();
        this._clearBlackHoleTestNodes();
        this._clearMultiplayerSafeZoneNode();
        if (this._player && cc.isValid(this._player)) {
            this._player.destroy();
            this._player = null;
        }
        for (var i = 0; i < this._enemys.length; i++) {
            var enemy = this._enemys[i];
            enemy.destroy();
        }
        this._enemys = [];
        for (var i = 0; i < this._skills.length; i++) {
            var skill = this._skills[i];
            if (cc.isValid(skill)) {
                skill.destroy();
            }
        }
        this._skills = [];
        for (var i = 0; i < this._energys.length; i++) {
            var energy = this._energys[i];
            if (cc.isValid(energy)) {
                energy.destroy();
            }
        }
        this._energys = [];
        for (var i = 0; i < this._oilSpills.length; i++) {
            var spill = this._oilSpills[i];
            if (spill && spill.node && cc.isValid(spill.node)) {
                spill.node.destroy();
            }
        }
        this._oilSpills = [];
        this.hideOilShellPreview();
        this._coverTestCovers = [];
        this._coverTestEnemy = null;
        for (var i = 0; i < this._energyEggs.length; i++) {
            var egg = this._energyEggs[i];
            if (egg && egg.node && cc.isValid(egg.node)) {
                egg.node.destroy();
            }
        }
        this._energyEggs = [];
        for (var i = 0; i < this._energyEggBushes.length; i++) {
            var bush = this._energyEggBushes[i];
            if (bush && bush.node && cc.isValid(bush.node)) {
                bush.node.destroy();
            }
        }
        this._energyEggBushes = [];
        yyp.eventCenter.emit("cover-button-state", { visible: false });
        this._bornEnemyCount = 0;
        this._deathEnemyCount = 0;
        this._maxEnemyCount = 0;
        this._timeMaxEnemyCount = 0;
        this._energyCdTime = 0;
        this._roamFlg = true;
        this._clearRuntimeMapNodes();
    };
    GameMap.prototype._clearRuntimeMapNodes = function () {
        if (this._tmDecal && cc.isValid(this._tmDecal)) {
            var decalChildren = this._tmDecal.children.slice();
            for (var i = 0; i < decalChildren.length; i++) {
                var child = decalChildren[i];
                if (cc.isValid(child)) {
                    child.destroy();
                }
            }
        }
        var runtimeNames = {
            "Player": true,
            "Enemy": true,
            "Bullet": true,
            "Boom": true,
            "SkillIcon": true,
            "OilPickup": true,
            "EnergyItem": true,
            "_killSkull": true,
            "_killBubble": true,
            "_upgradeFloat": true,
            "_bulletMutationMedal": true,
            "_portalGateA": true,
            "_portalGateB": true,
            "_portalLinkFx": true,
            "_portalHintLabel": true,
            "_portalWarpFx": true,
            "_centrifugalRing": true,
            "_centrifugalRingHint": true,
            "_centrifugalRingGuide": true,
            "_centrifugalRingFx": true,
            "_oilSpill": true,
            "_coverTestCrate": true,
            "_coverTestCrateShadow": true,
            "_coverHitFx": true,
            "_coverShard": true,
            "EnergyEgg": true,
            "_energyEggBush": true,
            "_energyEggBushShadow": true,
            "_energyEggLeaf": true,
            "_energyEggBushCore": true,
            "_damageDoubleArea": true,
            "_damageDoubleFx": true,
            "_speedDoubleArea": true,
            "_speedDoubleFx": true,
            "_spreadBulletArea": true,
            "_spreadBulletFx": true,
            "_bounceObstacleCircle": true,
            "_bounceObstacleLine": true,
            "_blackHoleArea": true,
            "_blackHoleFx": true
        };
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (cc.isValid(child) && runtimeNames[child.name]) {
                child.destroy();
            }
        }
    };
    GameMap.prototype._getMultiplayerSpawnCandidates = function () {
        var result = [];
        if (this._playerBornPos) {
            result.push(cc.v2(this._playerBornPos));
        }
        for (var i = 0; i < this._enemyBornPos.length; i++) {
            var pos = this._enemyBornPos[i];
            if (pos) {
                result.push(cc.v2(pos));
            }
        }
        return result;
    };
    GameMap.prototype._resolveMultiplayerSpawnPosition = function (playerIdx, playerCount) {
        var candidates = this._getMultiplayerSpawnCandidates();
        if (candidates.length <= 0) {
            var spawnOffset = cc.v2((playerIdx - (playerCount - 1) / 2) * 180, 0);
            return this.clampMapInnerPosition(this._playerBornPos.add(spawnOffset), 60);
        }
        var slot = this._multiplayerSpawnSlots[playerIdx];
        var index = slot == null ? playerIdx : slot;
        var candidate = candidates[index % candidates.length];
        return this.clampMapInnerPosition(candidate, 80);
    };
    GameMap.prototype.createMultiplayerPlayer = function (playerIdx, playerCount, playerState) {
        if (playerState === void 0) { playerState = null; }
        var playerType = playerState && playerState.tankType != null
            ? playerState.tankType
            : LocalizedData_1.LocalizedData.getIntItem("_current_player_type_", 1);
        var playerLevel = playerState && playerState.playerLevel != null
            ? playerState.playerLevel
            : LocalizedData_1.LocalizedData.getIntItem("_player_" + playerType + "_", 1);
        var player = cc.instantiate(this.playerPrefab);
        player.parent = this._fire._tmLayerObstacle;
        player.zIndex = 100;
        var spawnPos = this._resolveMultiplayerSpawnPosition(playerIdx, playerCount);
        player.position = cc.v3(spawnPos);
        player.script.setMap(this);
        player.script.setPlayerType(playerType, playerLevel);
        player.script.setInGame();
        player.script._multiplayerPlayerId = playerIdx;
        player["__multiplayerPlayerId"] = playerIdx;
        // Mark remote players (no UI controls)
        if (playerIdx !== this._localPlayerId) {
            player.script._multiplayerRemote = true;
        }
        player.script._multiplayerMode = true;
        if (playerState && player.script.syncMultiplayerState) {
            player.script.syncMultiplayerState(playerState);
        }
        // Visually distinguish players: P0=green tint, P1=blue tint
        var colorTint = playerIdx === this._localPlayerId ? cc.color(180, 255, 180, 255) : cc.color(160, 200, 255, 255);
        var tryNames = ['_sprBg1', '_sprBg2', '_sprBg3', '_sprBg4', '_sprBg'];
        tryNames.forEach(function (name) {
            var fireRefs = player["_fire"];
            var n = fireRefs ? fireRefs[name] : null;
            if (n && cc.isValid(n)) {
                try {
                    n.color = colorTint;
                }
                catch (e) { }
            }
        });
        if (player.script && player.script.setMultiplayerDisplayName) {
            player.script.setMultiplayerDisplayName("player" + (playerIdx + 1), playerIdx === this._localPlayerId);
        }
        this._multiplayerPlayers[playerIdx] = player;
        if (playerIdx === this._localPlayerId) {
            this._player = player;
        }
        return player;
    };
    GameMap.prototype.startMultiplayerGame = function (playerCount, localPlayerId, spawnSlots, energies, players, specialEvents, tarPickups, tarSpills, safeZone, onReady) {
        this._multiplayerMode = true;
        this._multiplayerPlayers = [];
        this._multiplayerBullets = {};
        this._multiplayerEnergyMap = {};
        this._multiplayerEnergyEggMap = {};
        this._multiplayerSpecialEventMap = {};
        this._multiplayerTarPickupMap = {};
        this._multiplayerTarSpillMap = {};
        this._multiplayerSafeZone = null;
        this._multiplayerSafeZoneNode = null;
        this._pendingTarThrowMap = {};
        this._localPlayerId = localPlayerId == null ? 0 : localPlayerId;
        this._multiplayerSpawnSlots = spawnSlots ? spawnSlots.slice() : [];
        var playerStates = Array.isArray(players) ? players : [];
        var initialSpecialEvents = Array.isArray(specialEvents) ? specialEvents : [];
        var initialTarPickups = Array.isArray(tarPickups) ? tarPickups : [];
        var initialTarSpills = Array.isArray(tarSpills) ? tarSpills : [];
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._clearAllTestNodes();
        this._killEffectTestMode = false;
        this._killBroadcastTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
        this._portalTestMode = false;
        this._centrifugalRingTestMode = false;
        this._coverTestMode = false;
        this._energyEggTestMode = false;
        this._damageDoubleTestMode = false;
        this._speedDoubleTestMode = false;
        this._spreadBulletTestMode = false;
        this._bounceObstacleTestMode = false;
        this._blackHoleTestMode = false;
        this._clusterBombTestMode = false;
        this._roamFlg = false;
        var will = this._correctMapPosition(cc.v2(-this._playerBornPos.x, -this._playerBornPos.y));
        var self = this;
        this.node.runAction(cc.sequence(cc.moveTo(0.2, will), cc.callFunc(function () {
            for (var i = 0; i < playerCount; i++) {
                self.createMultiplayerPlayer(i, playerCount, playerStates[i] || null);
            }
            var initialEnergies = energies || [];
            for (var i = 0; i < initialEnergies.length; i++) {
                self.onMultiplayerEnergySpawn(initialEnergies[i]);
            }
            for (var i = 0; i < initialSpecialEvents.length; i++) {
                self._applyMultiplayerSpecialEventSpawn(initialSpecialEvents[i]);
            }
            for (var i = 0; i < initialTarPickups.length; i++) {
                self._spawnMultiplayerTarPickup(initialTarPickups[i]);
            }
            for (var i = 0; i < initialTarSpills.length; i++) {
                self._spawnMultiplayerTarSpill(initialTarSpills[i]);
            }
            self._applyMultiplayerSafeZoneState(safeZone || null);
            self._gaming = true;
            // Center camera on local player immediately
            self._centerOnLocalPlayer();
            if (onReady)
                onReady();
        })));
    };
    GameMap.prototype.simulateFrame = function (frameData) {
        if (!this._multiplayerMode)
            return;
        var commands = frameData && Array.isArray(frameData.commands) ? frameData.commands : [];
        this._applyMultiplayerFrameCommands(commands);
        this._centerOnLocalPlayer();
    };
    GameMap.prototype._applyMultiplayerFrameCommands = function (commands) {
        for (var i = 0; i < commands.length; i++) {
            var command = commands[i];
            if (!command || !command.type) {
                continue;
            }
            if (command.type === "hudState" || command.type === "announcement" || command.type === "matchResult") {
                continue;
            }
            if (command.type === "playerInput") {
                var player = this._multiplayerPlayers[command.playerId];
                if (player && cc.isValid(player) && player.script && player.script.setFrameInput) {
                    player.script.setFrameInput(command.inputs || {});
                }
            }
            else if (command.type === "playerState") {
                var player = this._multiplayerPlayers[command.playerId];
                if (player && cc.isValid(player) && player.script && player.script.syncMultiplayerState) {
                    player.script.syncMultiplayerState(command);
                }
            }
            else if (command.type === "playerHit") {
                this.applyMultiplayerHit(command);
            }
            else if (command.type === "energySpawn") {
                this.onMultiplayerEnergySpawn(command.energy);
            }
            else if (command.type === "energyConsume") {
                this.onMultiplayerEnergyRemove(command.energyId);
            }
            else if (command.type === "playerUpgrade") {
                this.onMultiplayerPlayerUpgrade(command);
            }
            else if (command.type === "energyEggSpawn") {
                this._spawnMultiplayerEnergyEgg(command.egg);
            }
            else if (command.type === "energyEggMove") {
                this._moveMultiplayerEnergyEgg(command);
            }
            else if (command.type === "energyEggMature") {
                this._matureMultiplayerEnergyEgg(command);
            }
            else if (command.type === "energyEggRemove") {
                this._removeMultiplayerEnergyEgg(command.eggId);
            }
            else if (command.type === "specialEventSpawn") {
                this._applyMultiplayerSpecialEventSpawn(command.event);
            }
            else if (command.type === "specialEventRemove") {
                this._applyMultiplayerSpecialEventRemove(command.eventId, command.eventType);
            }
            else if (command.type === "tarPickupSpawn") {
                this._spawnMultiplayerTarPickup(command.pickup);
            }
            else if (command.type === "tarPickupRemove") {
                this._removeMultiplayerTarPickup(command.pickupId);
            }
            else if (command.type === "tarThrow") {
                this._playMultiplayerTarThrow(command);
            }
            else if (command.type === "tarSpillSpawn") {
                this._spawnMultiplayerTarSpill(command.spill);
            }
            else if (command.type === "tarSpillRemove") {
                this._removeMultiplayerTarSpill(command.spillId);
            }
            else if (command.type === "safeZoneState") {
                this._applyMultiplayerSafeZoneState(command.safeZone);
            }
            else if (command.type === "safeZoneDamage") {
                this._applyMultiplayerSafeZoneDamage(command);
            }
        }
    };
    GameMap.prototype._spawnMultiplayerTarPickup = function (pickupData) {
        if (!this._multiplayerMode || !pickupData || pickupData.id == null) {
            return;
        }
        if (this._multiplayerTarPickupMap[pickupData.id] && cc.isValid(this._multiplayerTarPickupMap[pickupData.id])) {
            return;
        }
        var pickup = this.spawnTarPickupAt(cc.v2(pickupData.x || 0, pickupData.y || 0), pickupData.id);
        if (pickup) {
            this._multiplayerTarPickupMap[pickupData.id] = pickup;
        }
    };
    GameMap.prototype._removeMultiplayerTarPickup = function (pickupId) {
        if (pickupId == null) {
            return;
        }
        var pickup = this._multiplayerTarPickupMap[pickupId];
        delete this._multiplayerTarPickupMap[pickupId];
        if (!pickup) {
            return;
        }
        for (var i = this._skills.length - 1; i >= 0; i--) {
            if (this._skills[i] === pickup) {
                this._skills.splice(i, 1);
                break;
            }
        }
        if (cc.isValid(pickup)) {
            pickup.destroy();
        }
    };
    GameMap.prototype._spawnMultiplayerTarSpill = function (spillData) {
        if (!this._multiplayerMode || !spillData || spillData.id == null) {
            return;
        }
        var pendingThrow = this._pendingTarThrowMap[spillData.id];
        if (pendingThrow) {
            pendingThrow.spillData = spillData;
            return;
        }
        if (this._multiplayerTarSpillMap[spillData.id] && cc.isValid(this._multiplayerTarSpillMap[spillData.id])) {
            return;
        }
        var node = this.spawnOilSpill(cc.v2(spillData.x || 0, spillData.y || 0), {
            radius: spillData.radius,
            duration: spillData.remainTime || spillData.duration,
            slowFactor: spillData.slowFactor,
        });
        if (node) {
            node["__tarSpillId"] = spillData.id;
            this._multiplayerTarSpillMap[spillData.id] = node;
        }
    };
    GameMap.prototype._removeMultiplayerTarSpill = function (spillId) {
        if (spillId == null) {
            return;
        }
        var node = this._multiplayerTarSpillMap[spillId];
        delete this._multiplayerTarSpillMap[spillId];
        for (var i = this._oilSpills.length - 1; i >= 0; i--) {
            var spill = this._oilSpills[i];
            if (spill && spill.node === node) {
                this._oilSpills.splice(i, 1);
                break;
            }
        }
        if (node && cc.isValid(node)) {
            node.destroy();
        }
    };
    GameMap.prototype._playMultiplayerTarThrow = function (command) {
        if (!command || !command.from || !command.to) {
            return;
        }
        if (command.spillId != null) {
            this._pendingTarThrowMap[command.spillId] = this._pendingTarThrowMap[command.spillId] || {};
        }
        var self = this;
        this.playOilShellThrow(cc.v2(command.from), cc.v2(command.to), {
            areaRadius: TAR_SPILL_RADIUS,
            arcHeight: 110,
            onLand: function () {
                if (command.spillId == null) {
                    return;
                }
                var pendingThrow = self._pendingTarThrowMap[command.spillId];
                if (pendingThrow && pendingThrow.spillData) {
                    var spillData = pendingThrow.spillData;
                    delete self._pendingTarThrowMap[command.spillId];
                    self._spawnMultiplayerTarSpill(spillData);
                }
                else {
                    delete self._pendingTarThrowMap[command.spillId];
                }
            }
        });
    };
    GameMap.prototype.onMultiplayerEnergySpawn = function (energyData) {
        if (!this._multiplayerMode || !energyData || energyData.id == null) {
            return;
        }
        if (this._multiplayerEnergyMap[energyData.id] && cc.isValid(this._multiplayerEnergyMap[energyData.id])) {
            return;
        }
        this.createEnergyAtForMultiplayer(energyData);
    };
    GameMap.prototype.onMultiplayerEnergyRemove = function (energyId) {
        if (!this._multiplayerMode || energyId == null) {
            return;
        }
        var energy = this._multiplayerEnergyMap[energyId];
        delete this._multiplayerEnergyMap[energyId];
        if (!energy) {
            return;
        }
        for (var i = this._energys.length - 1; i >= 0; i--) {
            if (this._energys[i] === energy) {
                this._energys.splice(i, 1);
                break;
            }
        }
        if (cc.isValid(energy)) {
            energy.destroy();
        }
    };
    GameMap.prototype.onMultiplayerPlayerUpgrade = function (payload) {
        // 升级表现统一由玩家状态同步触发，避免消息先后顺序导致丢表现或重复表现。
    };
    GameMap.prototype.isMultiplayerMode = function () {
        return this._multiplayerMode;
    };
    GameMap.prototype.getLocalPlayerId = function () {
        return this._localPlayerId;
    };
    GameMap.prototype.registerMultiplayerBullet = function (bulletId, bulletNode) {
        if (!this._multiplayerMode || !bulletId || !bulletNode) {
            return;
        }
        this._multiplayerBullets[bulletId] = bulletNode;
    };
    GameMap.prototype.unregisterMultiplayerBullet = function (bulletId, bulletNode) {
        if (bulletNode === void 0) { bulletNode = null; }
        if (!bulletId || !this._multiplayerBullets[bulletId]) {
            return;
        }
        if (!bulletNode || this._multiplayerBullets[bulletId] === bulletNode) {
            delete this._multiplayerBullets[bulletId];
        }
    };
    GameMap.prototype.reportMultiplayerBulletHit = function (bulletId, targetPlayerId) {
        if (!this._multiplayerMode || !bulletId || targetPlayerId == null || targetPlayerId < 0) {
            return;
        }
        yyp.eventCenter.emit("multiplayer-hit", {
            id: bulletId,
            tgid: targetPlayerId,
            hp: -1,
            damage: -1,
        });
    };
    GameMap.prototype.applyMultiplayerHit = function (hitData) {
        if (!this._multiplayerMode || !hitData || !hitData.id) {
            return;
        }
        var bullet = this._multiplayerBullets[hitData.id];
        if (bullet && cc.isValid(bullet) && bullet.script && bullet.script.doDestroy) {
            bullet.script.doDestroy();
        }
        this.unregisterMultiplayerBullet(hitData.id, bullet);
        var targetPlayer = this._multiplayerPlayers[hitData.tgid];
        if (!targetPlayer || !cc.isValid(targetPlayer) || !targetPlayer.script || !targetPlayer.script.applyMultiplayerHit) {
            return;
        }
        targetPlayer.script.applyMultiplayerHit(hitData.damage, hitData.hp);
    };
    GameMap.prototype._applyMultiplayerSpecialEventSpawn = function (eventData) {
        if (!this._multiplayerMode || !eventData || !eventData.id || !eventData.type) {
            return;
        }
        this._multiplayerSpecialEventMap[eventData.id] = eventData;
        if (eventData.type === "portal") {
            this._applyMultiplayerPortalEvent(eventData);
        }
        else if (eventData.type === "damageDouble") {
            this._applyMultiplayerDamageDoubleEvent(eventData);
        }
        else if (eventData.type === "speedDouble") {
            this._applyMultiplayerSpeedDoubleEvent(eventData);
        }
        else if (eventData.type === "blackHole") {
            this._applyMultiplayerBlackHoleEvent(eventData);
        }
    };
    GameMap.prototype._applyMultiplayerSpecialEventRemove = function (eventId, eventType) {
        if (eventType === void 0) { eventType = ""; }
        if (!this._multiplayerMode) {
            return;
        }
        if (eventId != null && this._multiplayerSpecialEventMap[eventId]) {
            delete this._multiplayerSpecialEventMap[eventId];
        }
        if (eventType === "portal") {
            this._portalTestMode = false;
            this._clearPortalTestNodes();
        }
        else if (eventType === "damageDouble") {
            this._damageDoubleTestMode = false;
            this._clearDamageDoubleTestNodes();
        }
        else if (eventType === "speedDouble") {
            this._speedDoubleTestMode = false;
            this._clearSpeedDoubleTestNodes();
        }
        else if (eventType === "blackHole") {
            this._blackHoleTestMode = false;
            this._clearBlackHoleTestNodes();
        }
    };
    GameMap.prototype._applyMultiplayerSafeZoneDamage = function (command) {
        if (!this._multiplayerMode || !command || command.playerId == null) {
            return;
        }
        var targetPlayer = this._multiplayerPlayers[command.playerId];
        if (!targetPlayer || !cc.isValid(targetPlayer) || !targetPlayer.script || !targetPlayer.script.applyMultiplayerHit) {
            return;
        }
        targetPlayer.script.applyMultiplayerHit(command.damage || 0, command.hp);
    };
    GameMap.prototype._applyMultiplayerSafeZoneState = function (safeZone) {
        if (!this._multiplayerMode) {
            return;
        }
        if (!safeZone) {
            this._multiplayerSafeZone = null;
            this._clearMultiplayerSafeZoneNode();
            return;
        }
        this._multiplayerSafeZone = {
            centerX: safeZone.centerX == null ? 0 : safeZone.centerX,
            centerY: safeZone.centerY == null ? 0 : safeZone.centerY,
            startRadius: safeZone.startRadius == null ? 0 : safeZone.startRadius,
            targetRadius: safeZone.targetRadius == null ? 0 : safeZone.targetRadius,
            radius: safeZone.radius == null ? 0 : safeZone.radius,
            startDelay: safeZone.startDelay == null ? 60 : safeZone.startDelay,
            shrinkDuration: safeZone.shrinkDuration == null ? 45 : safeZone.shrinkDuration,
            damageInterval: safeZone.damageInterval == null ? 1 : safeZone.damageInterval,
            damagePerTick: safeZone.damagePerTick == null ? 0 : safeZone.damagePerTick,
            active: !!safeZone.active,
            shrinking: !!safeZone.shrinking,
            finished: !!safeZone.finished,
            progress: safeZone.progress == null ? 0 : safeZone.progress,
            waitRemaining: safeZone.waitRemaining == null ? 0 : safeZone.waitRemaining,
            shrinkRemaining: safeZone.shrinkRemaining == null ? 0 : safeZone.shrinkRemaining,
        };
        this._renderMultiplayerSafeZone();
    };
    GameMap.prototype._clearMultiplayerSafeZoneNode = function () {
        if (this._multiplayerSafeZoneNode && cc.isValid(this._multiplayerSafeZoneNode)) {
            this._multiplayerSafeZoneNode.destroy();
        }
        this._multiplayerSafeZoneNode = null;
    };
    GameMap.prototype._renderMultiplayerSafeZone = function () {
        if (!this._multiplayerSafeZone) {
            this._clearMultiplayerSafeZoneNode();
            return;
        }
        var safeZone = this._multiplayerSafeZone;
        var radius = Math.max(0, safeZone.radius || 0);
        if (radius <= 0) {
            this._clearMultiplayerSafeZoneNode();
            return;
        }
        var center = this.clampMapInnerPosition(cc.v2(safeZone.centerX || 0, safeZone.centerY || 0), 0);
        this._clearMultiplayerSafeZoneNode();
        var root = new cc.Node("_safeZoneRoot");
        root.parent = this._fire._tmLayerObstacle;
        root.setPosition(cc.v3(center));
        root.zIndex = 5600;
        var outerGlow = new cc.Node("_safeZoneGlow");
        outerGlow.parent = root;
        var glowGraphics = outerGlow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(90, 170, 255, safeZone.active ? 18 : 8);
        glowGraphics.circle(0, 0, radius + 18);
        glowGraphics.fill();
        var ring = new cc.Node("_safeZoneRing");
        ring.parent = root;
        var ringGraphics = ring.addComponent(cc.Graphics);
        ringGraphics.lineWidth = 8;
        ringGraphics.strokeColor = safeZone.finished ? cc.color(255, 120, 120, 245) : cc.color(120, 210, 255, 235);
        ringGraphics.circle(0, 0, radius);
        ringGraphics.stroke();
        ringGraphics.lineWidth = 2;
        ringGraphics.strokeColor = cc.color(255, 255, 255, safeZone.active ? 170 : 90);
        ringGraphics.circle(0, 0, Math.max(6, radius - 8));
        ringGraphics.stroke();
        var labelNode = new cc.Node("_safeZoneLabel");
        labelNode.parent = root;
        labelNode.setPosition(0, radius + 42);
        var label = labelNode.addComponent(cc.Label);
        if (!safeZone.active) {
            label.string = "缩圈倒计时 " + Math.max(0, Math.ceil(safeZone.waitRemaining || 0)) + "s";
        }
        else if (safeZone.shrinking) {
            label.string = "安全区缩小中 " + Math.max(0, Math.ceil(safeZone.shrinkRemaining || 0)) + "s";
        }
        else if (safeZone.finished) {
            label.string = "最终安全区";
        }
        else {
            label.string = "安全区";
        }
        label.fontSize = 22;
        label.lineHeight = 24;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        labelNode.color = safeZone.finished ? cc.color(255, 210, 210, 255) : cc.color(220, 245, 255, 255);
        this._multiplayerSafeZoneNode = root;
    };
    GameMap.prototype._applyMultiplayerPortalEvent = function (eventData) {
        if (!eventData.entryPos || !eventData.exitPos) {
            return;
        }
        this._portalTestMode = true;
        this._clearPortalTestNodes();
        var entryPos = this.clampMapInnerPosition(cc.v2(eventData.entryPos), 90);
        var exitPos = this.clampMapInnerPosition(cc.v2(eventData.exitPos), 90);
        this._createPortalGate("_portalGateA", entryPos, cc.color(90, 215, 255, 255), "A");
        this._createPortalGate("_portalGateB", exitPos, cc.color(255, 120, 220, 255), "B");
        this._createPortalLinkFx(entryPos, exitPos);
        this._createPortalHintLabel(entryPos);
        this._portalPairs.push({
            id: "portalA",
            pos: entryPos,
            radius: eventData.radius == null ? 44 : eventData.radius,
            exitId: "portalB",
            exitPos: exitPos,
            eventId: eventData.id
        });
        this._portalPairs.push({
            id: "portalB",
            pos: exitPos,
            radius: eventData.radius == null ? 44 : eventData.radius,
            exitId: "portalA",
            exitPos: entryPos,
            eventId: eventData.id
        });
    };
    GameMap.prototype._applyMultiplayerDamageDoubleEvent = function (eventData) {
        if (!eventData.center) {
            return;
        }
        this._damageDoubleTestMode = true;
        this._clearDamageDoubleTestNodes();
        var center = this.clampMapInnerPosition(cc.v2(eventData.center), 100);
        var radius = eventData.radius == null ? 60 : eventData.radius;
        this._createDamageDoubleAreaNode(center, radius, cc.color(255, 40, 40, 255));
        this._damageDoubleAreaData = {
            center: center,
            radius: radius,
            damageMultiplier: eventData.damageMultiplier == null ? 2 : eventData.damageMultiplier,
            scaleMultiplier: eventData.scaleMultiplier == null ? 1.5 : eventData.scaleMultiplier,
            eventId: eventData.id,
        };
    };
    GameMap.prototype._applyMultiplayerSpeedDoubleEvent = function (eventData) {
        if (!eventData.center) {
            return;
        }
        this._speedDoubleTestMode = true;
        this._clearSpeedDoubleTestNodes();
        var center = this.clampMapInnerPosition(cc.v2(eventData.center), 100);
        var radius = eventData.radius == null ? 60 : eventData.radius;
        this._createSpeedDoubleAreaNode(center, radius, cc.color(30, 130, 255, 255));
        this._speedDoubleAreaData = {
            center: center,
            radius: radius,
            speedMultiplier: eventData.speedMultiplier == null ? 3 : eventData.speedMultiplier,
            eventId: eventData.id,
        };
    };
    GameMap.prototype._applyMultiplayerBlackHoleEvent = function (eventData) {
        if (!eventData.center) {
            return;
        }
        this._blackHoleTestMode = true;
        this._clearBlackHoleTestNodes();
        var center = this.clampMapInnerPosition(cc.v2(eventData.center), 120);
        var radius = eventData.radius == null ? 100 : eventData.radius;
        var destroyRadius = eventData.destroyRadius == null ? 14 : eventData.destroyRadius;
        this._createBlackHoleAreaNode(center, radius, destroyRadius, cc.color(80, 30, 160, 200));
        this._blackHoleAreaData = {
            center: center,
            radius: radius,
            destroyRadius: destroyRadius,
            gravityStrength: eventData.gravityStrength == null ? 160 : eventData.gravityStrength,
            eventId: eventData.id,
        };
    };
    GameMap.prototype._centerOnLocalPlayer = function () {
        if (!this._multiplayerMode)
            return;
        var player = this._multiplayerPlayers[this._localPlayerId];
        if (!player || !cc.isValid(player))
            return;
        var pos = player.position;
        if (!pos)
            return;
        var will = this._correctMapPosition(cc.v2(-pos.x, -pos.y));
        this.node.setPosition(will);
    };
    GameMap.prototype._clearAllTestNodes = function () {
        this._clearPortalTestNodes();
        this._clearCentrifugalRingTestNodes();
        this._clearDamageDoubleTestNodes();
        this._clearSpeedDoubleTestNodes();
        this._clearSpreadBulletTestNodes();
        this._clearBounceObstacleTestNodes();
        this._clearBlackHoleTestNodes();
    };
    GameMap.prototype.isMap = function () {
        return true;
    };
    //复活
    GameMap.prototype.revive = function () {
        this.createPlayer();
        this._player.position = this._playerLastPos;
        for (var i = 0; i < this._enemys.length; i++) {
            var enemy = this._enemys[i];
            enemy.script.setTarget(this._player);
        }
    };
    GameMap.prototype.pause = function () {
        this._pause = true;
    };
    GameMap.prototype.resume = function () {
        this._pause = false;
    };
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "tree01Prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "tree02Prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "mountain01Prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "mountain02Prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "mountain03Prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "bulletPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "enemyPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "playerPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "skillPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMap.prototype, "energyPrefab", void 0);
    GameMap = __decorate([
        ccclass
    ], GameMap);
    return GameMap;
}(BaseComponent_1.BaseComponent));
exports.GameMap = GameMap;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUNuRCwyQ0FBd0M7QUFDeEMseUNBQXNDO0FBQ3RDLG9EQUFtRDtBQUNuRCw0REFBdUQ7QUFDdkQseUNBQXNDO0FBQ3RDLDhCQUE4QjtBQUM5Qiw0Q0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyw0Q0FBeUM7QUFDbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsSUFBTSwwQkFBMEIsR0FBRyxDQUFDLENBQUM7QUFDckMsSUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFDdEMsSUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUM7QUFDcEMsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7QUFDN0IsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7QUFDN0IsSUFBTSxnQ0FBZ0MsR0FBRyxDQUFDLENBQUM7QUFDM0MsSUFBTSxvQkFBb0IsR0FBRyxzQ0FBc0MsQ0FBQztBQUNwRSxJQUFNLHFCQUFxQixHQUFHLHNDQUFzQyxDQUFDO0FBQ3JFLElBQU0scUJBQXFCLEdBQUcsc0NBQXNDLENBQUM7QUFDckUsSUFBTSwyQkFBMkIsR0FBRyxzQ0FBc0MsQ0FBQztBQUMzRSxJQUFNLHNCQUFzQixHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RFLElBQU0sc0JBQXNCLEdBQUc7SUFDM0Is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UUFDMUQsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsdUNBQXFCLEdBQXJCLFVBQXNCLEdBQUc7UUFDckIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQzNDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENB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QUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2QjtRQUVELEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDcEIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUMzRCxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FDdEMsRUFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBMkIsR0FBM0I7UUFDSSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lB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LEVBQUUsQ0FBQztRQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdEcsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0MsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixLQUFLLENBQUMsTUFBTSxHQUFH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QVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFWixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDMUIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEQsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDcEQsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN4QixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsTUFB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TUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVwQixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsWUFBWSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0UsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV0QixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENB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QUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDbUI7SUE5QjlCLE9BQU87UUFEbkIsT0FBTztPQUNLLE9BQU8sQ0FzcU1uQjtJQUFELGNBQUM7Q0F0cU1ELEFBc3FNQyxDQXRxTTRCLDZCQUFhLEdBc3FNekM7QUF0cU1ZLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5pbXBvcnQge0VuZXJneUl0ZW19IGZyb20gXCIuL0VuZXJneUl0ZW1cIjtcclxuaW1wb3J0IHtFbmVyZ3lFZ2d9IGZyb20gXCIuL0VuZXJneUVnZ1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQgUmlwcGxlU2hvY2t3YXZlIGZyb20gXCIuL2VmZmVjdC9SaXBwbGVTaG9ja3dhdmVcIjtcclxuaW1wb3J0IHtPaWxQaWNrdXB9IGZyb20gXCIuL09pbFBpY2t1cFwiO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuLy/nvZHpobXlrqLmnI0gaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9rZWZ1Lmh0bWxcclxuaW1wb3J0IHtBbmFseXRpY3N9IGZyb20gXCIuL2FkL0FuYWx5dGljc1wiO1xyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuY29uc3QgS0lMTF9TVFJFQUtfV0lORE9XID0gMjA7XHJcbmNvbnN0IEtJTExfQlJPQURDQVNUX01BWF9WSVNJQkxFID0gMztcclxuY29uc3QgS0lMTF9CUk9BRENBU1RfU0xPVF9IRUlHSFQgPSA2NDtcclxuY29uc3QgS0lMTF9CUk9BRENBU1RfRFVSQVRJT04gPSAyLjI7XHJcbmNvbnN0IE9JTF9TUElMTF9EVVJBVElPTiA9IDEwO1xyXG5jb25zdCBPSUxfU1BJTExfUkFESVVTID0gMTIwO1xyXG5jb25zdCBPSUxfU1BJTExfU0xPV19GQUNUT1IgPSAwLjUyO1xyXG5jb25zdCBUQVJfU1BJTExfUkFESVVTID0gMTIwO1xyXG5jb25zdCBUQVJfUElDS1VQX1NJTkdMRVBMQVlFUl9JTlRFUlZBTCA9IDY7XHJcbmNvbnN0IE9JTF9TUElMTF9GUkFNRV9VVUlEID0gXCI1M2E1MjM5Ny1iZTcxLTRiMWUtYmQ5My05NmM1YjlhN2YyY2VcIjtcclxuY29uc3QgQ09WRVJfVEVTVF9GUkFNRV9VVUlEID0gXCJmMjcyMTVhNC0zMmIwLTRhM2MtYjg3ZC02OWEzZGMwM2UzN2FcIjtcclxuY29uc3QgRU5FUkdZX0VHR19GUkFNRV9VVUlEID0gXCI1YzliMTJjMy05ZmQxLTQ0NzItYjYzMy1kMzFkN2NlMjliZjJcIjtcclxuY29uc3QgVFJFRV9HUkVFTl9MQVJHRV9GUkFNRV9VVUlEID0gXCI4ZDNmMmVkYi1lMjdiLTQwMjktYWY2OS02YzBiYjU0YTA1NmRcIjtcclxuY29uc3QgS0lMTF9URVNUX1ZJQ1RJTV9OQU1FUyA9IFtcIueWvumjjuWPt1wiLCBcIum7keiZjuaculwiLCBcIumSoueJmeeCruaJi1wiLCBcIui1pOeEsOaImOi9plwiLCBcIumHjemUpOWdpuWFi1wiXTtcclxuY29uc3QgS0lMTF9CQURHRV9GUkFNRV9VVUlEUyA9IHtcclxuICAgIDE6IFwiOTFiNmVmMjMtMTlmMy00ZDc1LTllNGMtNGVlMjQ2ZWVlNmY3XCIsXHJcbiAgICAyOiBcIjU4YTY2NmI3LWFlOGQtNDYyMi04MmMzLTAzZDg5Yjc2NjI3YlwiLFxyXG4gICAgMzogXCJlOTU3NTY4Yy0yOWEwLTRlODktODRkNS0zOGNkMDI0OTY1MzdcIixcclxuICAgIDQ6IFwiZWZmNGRlNTktNTZkMS00ZGVkLWEwNWItMGZiZThjODFhZGZmXCIsXHJcbiAgICA1OiBcImZiZGQzNTFmLTNkOTYtNDgyMy05ZTRhLWVhMjEzMDg1ZjliN1wiXHJcbn07XHJcbmNvbnN0IEtJTExfQkFER0VfVElOVFMgPSB7XHJcbiAgICAxOiBbMjU1LCAyNTUsIDI1NV0sXHJcbiAgICAyOiBbMjA1LCAxMjcsIDUwXSxcclxuICAgIDM6IFsyMjAsIDIzMiwgMjQyXSxcclxuICAgIDQ6IFsyNTUsIDIxNSwgMF0sXHJcbiAgICA1OiBbMTg2LCAxMDIsIDI1NV1cclxufTtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBHYW1lTWFwIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRyZWUwMVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRyZWUwMlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbW91bnRhaW4wMVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG1vdW50YWluMDJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBtb3VudGFpbjAzUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIGVuZW15UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIHNraWxsUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIGVuZXJneVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+WGhemDqOWPmOmHj1xyXG4gICAgX3RpbGVkTWFwICAgPSBudWxsOyAgICAgLy9UaWxlZCBNYXBcclxuICAgIF90bUdyb3VwICAgID0gbnVsbDsgICAgIC8v5pmu6YCa5bGCXHJcbiAgICBfdG1PYmogICAgICA9IG51bGw7ICAgICAvL+WvueixoeWxgijpmpznoo3niakpXHJcbiAgICBfdG1Cb3JuICAgICA9IG51bGw7ICAgICAvL+WvueixoeWxgijlh7rnlJ/ngrkpXHJcbiAgICBfdG1EZWNhbCAgICA9IG51bGw7ICAgICAvL+WcsOihqOi0tOiKseWxgijlnLDlm77kuI7lnablhYvkuYvpl7QpXHJcbiAgICBfdG1TaXplICAgICA9IG51bGw7ICAgICAvL+WcsOWbvuWwuuWvuFxyXG4gICAgX3RpbGVTaXplICAgPSBudWxsOyAgICAgLy/nk6bniYflsLrlr7hcclxuXHJcbiAgICBfY29sbGlkZXJzICA9IFtdOyAgICAgICAvL+eisOaSnuajgOa1i+WIl+ihqFxyXG4gICAgX2NoZWNrTGlzdCAgPSB7fTsgICAgICAgLy9BKuajgOa1i+WIl+ihqFxyXG4gICAgX2xvZ2ljQXJlYSAgPSBbXTsgICAgICAgLy/pgLvovpHnorDmkp7liIbljLpcclxuXHJcbiAgICBfcGxheWVyICAgICAgICAgICAgID0gbnVsbDsgICAgIC8v546p5a62XHJcbiAgICBfZW5lbXlzICAgICAgICAgICAgID0gW107ICAgICAgIC8v5pWM5Lq65YiX6KGoXHJcbiAgICBfcGxheWVyQm9yblBvcyAgICAgID0gbnVsbDsgICAgIC8vcGxheWVy5Ye655Sf54K5XHJcbiAgICBfZW5lbXlCb3JuUG9zICAgICAgID0gW107ICAgICAgIC8v5pWM5Lq65Ye655Sf54K55YiX6KGoXHJcbiAgICBfYm9ybkNkVGltZSAgICAgICAgID0gMDsgICAgICAgIC8v5pWM5Lq655Sf5oiQ6Ze06ZqU5pe26Ze0XHJcbiAgICBfYm9ybkVuZW15Q291bnQgICAgID0gMDsgICAgICAgIC8v5bey57uP5Ye655Sf55qE5pWM5Lq65pWw6YePXHJcbiAgICBfZGVhdGhFbmVteUNvdW50ICAgID0gMDsgICAgICAgIC8v5bey57uP5q275Lqh55qE5pWM5Lq65pWw6YePXHJcbiAgICBfbWF4RW5lbXlDb3VudCAgICAgID0gMDsgICAgICAgIC8v5pyA5aSn5pWM5Lq65pWw6YePXHJcbiAgICBfdGltZU1heEVuZW15Q291bnQgID0gMDsgICAgICAgIC8v5ZCM5bGP5pyA5aSn5pWM5Lq65pWw6YePXHJcbiAgICBfc2tpbGxzICAgICAgICAgICAgID0gW107ICAgICAgIC8v6ZqP5py655Sf5oiQ55qE5oqA6IO9XHJcbiAgICBfZW5lcmd5cyAgICAgICAgICAgID0gW107ICAgICAgIC8v5Zyw5Zu+5LiK55qE6IO96YePXHJcbiAgICBfZW5lcmd5Q2RUaW1lICAgICAgID0gMDsgICAgICAgIC8v6IO96YeP55Sf5oiQ6Ze06ZqU5pe26Ze0XHJcbiAgICBfdGFyUGlja3VwQ2RUaW1lICAgID0gMDsgICAgICAgIC8v5Y2V5py654Sm5rK55ou+5Y+W54mp55Sf5oiQ6Ze06ZqUXHJcblxyXG4gICAgX3BhdXNlICAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5aSE5LqO5pqC5YGc54q25oCBXHJcbiAgICBfZ2FtaW5nICAgICAgICAgPSBmYWxzZTsgICAgLy/mmK/lkKblpITkuo7muLjmiI/kuK0gXHJcbiAgICBfa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7IC8v5Ye75p2A5pWI5p6c5rWL6K+V5qih5byPXHJcbiAgICBfa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7IC8v5Ye75p2A5bm/5pKt5rWL6K+V5qih5byPXHJcbiAgICBfcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTsgLy/lj5flh7vmtYvor5XmqKHlvI9cclxuICAgIF91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTsgLy/ljYfnuqfmtYvor5XmqKHlvI9cclxuICAgIF9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7IC8v5a2Q5by55bCE5Ye75rWL6K+V5qih5byPXHJcbiAgICBfcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTsgLy/kvKDpgIHpl6jmtYvor5XmqKHlvI9cclxuICAgIF9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlOyAvL+emu+W/g+WKm+WciOa1i+ivleaooeW8j1xyXG4gICAgX2NvdmVyVGVzdE1vZGUgPSBmYWxzZTsgLy/mjqnkvZPmtYvor5XmqKHlvI9cclxuICAgIF9lbmVyZ3lFZ2dUZXN0TW9kZSA9IGZhbHNlOyAvL+iDvemHj+ibi+aUtuiXj+a1i+ivleaooeW8j1xyXG4gICAgX2RhbWFnZURvdWJsZVRlc3RNb2RlID0gZmFsc2U7IC8v5Lyk5a6z57+75YCN5Yy65Z+f5rWL6K+V5qih5byPXHJcbiAgICBfZGFtYWdlRG91YmxlQXJlYURhdGEgPSBudWxsO1xyXG4gICAgX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTsgLy/pgJ/luqbnv7vlgI3ljLrln5/mtYvor5XmqKHlvI9cclxuICAgIF9zcGVlZERvdWJsZUFyZWFEYXRhID0gbnVsbDtcclxuICAgIF9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlOyAvL+WtkOW8ueaJqeaVo+WMuuWfn+a1i+ivleaooeW8j1xyXG4gICAgX3NwcmVhZEJ1bGxldEFyZWFEYXRhID0gbnVsbDtcclxuICAgIF9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7IC8v5a2Q5by55Y+N5by56Zqc56KN5rWL6K+V5qih5byPXHJcbiAgICBfYm91bmNlT2JzdGFjbGVzID0gW107XHJcbiAgICBfYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTsgLy/pu5HmtJ7ljLrln5/mtYvor5XmqKHlvI9cclxuICAgIF9ibGFja0hvbGVBcmVhRGF0YSA9IG51bGw7XHJcbiAgICBfY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlOyAvL+mbhuadn+eCuOW8uea1i+ivleaooeW8j1xyXG4gICAgX211bHRpcGxheWVyTW9kZSA9IGZhbHNlOyAvL+WkmuS6uuaooeW8j1xyXG4gICAgX211bHRpcGxheWVyUGxheWVycyA9IFtdOyAvL+WkmuS6uueOqeWutuWIl+ihqFxyXG4gICAgX211bHRpcGxheWVyQnVsbGV0cyA9IHt9OyAvL+WkmuS6uuWQjOatpeWtkOW8uVxyXG4gICAgX211bHRpcGxheWVyRW5lcmd5TWFwID0ge307IC8v5aSa5Lq65ZCM5q2l6IO96YePXHJcbiAgICBfbXVsdGlwbGF5ZXJFbmVyZ3lFZ2dNYXAgPSB7fTsgLy/lpJrkurrlkIzmraXog73ph4/om4tcclxuICAgIF9tdWx0aXBsYXllclNwZWNpYWxFdmVudE1hcCA9IHt9O1xyXG4gICAgX211bHRpcGxheWVyVGFyUGlja3VwTWFwID0ge307XHJcbiAgICBfbXVsdGlwbGF5ZXJUYXJTcGlsbE1hcCA9IHt9O1xyXG4gICAgX211bHRpcGxheWVyU2FmZVpvbmUgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyU2FmZVpvbmVOb2RlID0gbnVsbDtcclxuICAgIF9wZW5kaW5nVGFyVGhyb3dNYXAgPSB7fTtcclxuICAgIF9sb2NhbFBsYXllcklkID0gMDsgICAgICAgLy/mnKzlnLDnjqnlrrZJRFxyXG4gICAgX211bHRpcGxheWVyU3Bhd25TbG90cyA9IFtdOyAvL+WkmuS6uuWHuueUn+anveS9jVxyXG4gICAgX2xldmVsSWQgICAgICAgID0gMTsgICAgICAgIC8v5b2T5YmN5YWz5Y2haWRcclxuICAgIF9sZXZlbENvbmZpZyAgICA9IG51bGw7ICAgICAvL+W9k+WJjeWFs+WNoemFjee9rlxyXG5cclxuICAgIF9yb2FtRmxnICAgICAgICA9IGZhbHNlOyAgICAgICAgICAvL+a8q+a4uOagh+iusFxyXG4gICAgX3JvYW1EaXIgICAgICAgID0gY2MudjIoMSwwKTsgICAgIC8v5ryr5ri45pa55ZCRXHJcblxyXG4gICAgX3BsYXllckxhc3RQb3MgID0gMDtcclxuICAgIF9yaXBwbGVEaXN0b3J0aW9uRWZmZWN0ID0gbnVsbDtcclxuICAgIF9yaXBwbGVDYXB0dXJlQ2FtZXJhID0gbnVsbDtcclxuICAgIF9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSA9IG51bGw7XHJcbiAgICBfa2lsbEJyb2FkY2FzdExheWVyID0gbnVsbDtcclxuICAgIF9raWxsQnJvYWRjYXN0RW50cmllcyA9IFtdO1xyXG4gICAgX2tpbGxCYWRnZUxheWVyID0gbnVsbDtcclxuICAgIF9raWxsQmFkZ2VBY3RpdmVOb2RlID0gbnVsbDtcclxuICAgIF9raWxsQmFkZ2VGcmFtZXMgPSB7fTtcclxuICAgIF9raWxsQmFkZ2VMb2FkaW5nID0ge307XHJcbiAgICBfa2lsbFN0cmVha0NvdW50ID0gMDtcclxuICAgIF9raWxsU3RyZWFrUmVtYWluID0gMDtcclxuICAgIF9wb3J0YWxQYWlycyA9IFtdO1xyXG4gICAgX2NlbnRyaWZ1Z2FsUmluZ0RhdGEgPSBudWxsO1xyXG4gICAgX29pbFNwaWxscyA9IFtdO1xyXG4gICAgX29pbFNoZWxsUHJldmlld05vZGUgPSBudWxsO1xyXG4gICAgX29pbFNwaWxsRnJhbWUgPSBudWxsO1xyXG4gICAgX29pbFNwaWxsRnJhbWVMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBfb2lsU3BpbGxGcmFtZUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgX2NvdmVyVGVzdENvdmVycyA9IFtdO1xyXG4gICAgX2NvdmVyVGVzdEZyYW1lID0gbnVsbDtcclxuICAgIF9jb3ZlclRlc3RGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgIF9jb3ZlclRlc3RGcmFtZUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgX2NvdmVyVGVzdEVuZW15ID0gbnVsbDtcclxuICAgIF9lbmVyZ3lFZ2dGcmFtZSA9IG51bGw7XHJcbiAgICBfZW5lcmd5RWdnRnJhbWVMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBfZW5lcmd5RWdnRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgIF9lbmVyZ3lFZ2dCdXNoRnJhbWUgPSBudWxsO1xyXG4gICAgX2VuZXJneUVnZ0J1c2hGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgIF9lbmVyZ3lFZ2dCdXNoRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgIF9lbmVyZ3lFZ2dzID0gW107XHJcbiAgICBfZW5lcmd5RWdnQnVzaGVzID0gW107XHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/lvIDlkK/norDmkp7nm5HlkKxcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIC8v5byA5ZCv57uY5Yi256Kw5pKe57uE5Lu255qE5b2i54q2XHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gLy8g5pi+56S656Kw5pKe57uE5Lu255qE5YyF5Zu055uSXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREcmF3Qm91bmRpbmdCb3ggPSB0cnVlO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo6Zqc56KN54mpKVxyXG4gICAgICAgIHRoaXMuX2luaXRUbU9ic3RhY2xlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOWHuueUn+eCuSlcclxuICAgICAgICB0aGlzLl9pbml0VG1Cb3JuKCk7XHJcbiAgICAgICAgdGhpcy5fcHJlbG9hZFJpcHBsZURpc3RvcnRpb25FZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkS2lsbEJyb2FkY2FzdEJhZGdlRnJhbWVzKCk7XHJcbiAgICAgICAgdGhpcy5fcHJlbG9hZE9pbFNwaWxsRnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkQ292ZXJUZXN0RnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkRW5lcmd5RWdnRnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkRW5lcmd5RWdnQnVzaEZyYW1lKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9kZXN0cm95UmlwcGxlQ2FwdHVyZVJlc291cmNlcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWxsQnJvYWRjYXN0VWkoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lsbEJhZGdlVWkoKTtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl90aWxlZE1hcCA9IHRoaXMubm9kZVtcIiRUaWxlZE1hcFwiXTtcclxuICAgICAgICB0aGlzLl90bUdyb3VwID0gdGhpcy5fZmlyZS5fdG1MYXllckdyb3VwLiRUaWxlZExheWVyO1xyXG4gICAgICAgIC8vIHRoaXMuX2ZpcmUuX3RtTGF5ZXJHcm91cC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90bU9iaiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS4kVGlsZWRPYmplY3RHcm91cDtcclxuICAgICAgICB0aGlzLl90bUJvcm4gPSB0aGlzLl9maXJlLl90bUxheWVyQm9ybi4kVGlsZWRPYmplY3RHcm91cDtcclxuICAgICAgICB0aGlzLl90bURlY2FsID0gdGhpcy5fZW5zdXJlRGVjYWxMYXllcigpO1xyXG4gICAgICAgIHRoaXMuX3RtU2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuX3RtU2l6ZSA9IG5ldyBjYy5TaXplKHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS53aWR0aCAqIHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCkud2lkdGgsIHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQgKiB0aGlzLl90aWxlZE1hcC5nZXRUaWxlU2l6ZSgpLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fdGlsZVNpemUgPSB0aGlzLl90aWxlZE1hcC5nZXRUaWxlU2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9lbnN1cmVEZWNhbExheWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl90bUxheWVyRGVjYWwgJiYgY2MuaXNWYWxpZCh0aGlzLl9maXJlLl90bUxheWVyRGVjYWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maXJlLl90bUxheWVyRGVjYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgY2MuTm9kZShcIl90bUxheWVyRGVjYWxcIik7XHJcbiAgICAgICAgbGF5ZXIucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICBsYXllci5zZXRBbmNob3JQb2ludCgwLjUsIDAuNSk7XHJcbiAgICAgICAgbGF5ZXIuc2V0UG9zaXRpb24oMCwgMCk7XHJcblxyXG4gICAgICAgIGxldCBvYnN0YWNsZUluZGV4ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlID8gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmdldFNpYmxpbmdJbmRleCgpIDogdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgbGF5ZXIuc2V0U2libGluZ0luZGV4KE1hdGgubWF4KDAsIG9ic3RhY2xlSW5kZXgpKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90bUxheWVyRGVjYWwgPSBsYXllcjtcclxuICAgICAgICByZXR1cm4gbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOmanOeijeeJqSlcclxuICAgIF9pbml0VG1PYnN0YWNsZSgpe1xyXG4gICAgICAgIGxldCBfc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtT2JqLmdldE9iamVjdHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9iamVjdHMxMVwiLG9iamVjdHMpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/ojrflj5bkvY3nva5cclxuICAgICAgICAgICAgbGV0IHRpbGVkUG9zID0gY2MudjIob2JqLm9mZnNldC54ICsgb2JqLndpZHRoLzIsIG9iai5vZmZzZXQueSArIG9iai5oZWlnaHQvMik7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLl90aWxlUG9zVG9HYW1lUG9zKHRpbGVkUG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoubmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDFQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDJQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJtb3VudGFpbjAxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnN0YWNsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW91bnRhaW4wMVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoubmFtZSA9PSBcIm1vdW50YWluMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb3VudGFpbjAyUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai5uYW1lID09IFwibW91bnRhaW4wM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vdW50YWluMDNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wb3NpdGlvbiA9IGNjLnYzKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG9mZnNldC55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoucG9seWxpbmVQb2ludHMubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBvYmoucG9seWxpbmVQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gb2JqLnBvbHlsaW5lUG9pbnRzW2orMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5Yib5bu6Y29sbGlkZXIgbGluZVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIudGFnID0gb2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMF0gPSBjYy52MihzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMV0gPSBjYy52MihlbmQpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzLnNwbGljZSgyLDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sbGlkZXJzLnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrKysrKysrKysrKytfaW5pdFRtT2JzdGFjbGUgdGltZTEgXCIsY29zdCk7XHJcbiAgICAgICAgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGxldCBsb2dpY1dpZHRoID0gdGhpcy5fdG1TaXplLndpZHRoLzQ7XHJcbiAgICAgICAgbGV0IGxvZ2ljSGVpZ2h0ID0gdGhpcy5fdG1TaXplLmhlaWdodC80O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgNDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNjsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhOmFueSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgYXJlYS54ID0geCpsb2dpY1dpZHRoLXRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgYXJlYS55ID0geSpsb2dpY0hlaWdodC10aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgICAgICBhcmVhLndpZHRoID0gbG9naWNXaWR0aDtcclxuICAgICAgICAgICAgICAgIGFyZWEuaGVpZ2h0ID0gbG9naWNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBuZXcgY2MuUmVjdChhcmVhLngtMTAsYXJlYS55LTEwLGxvZ2ljV2lkdGgrMjAsbG9naWNIZWlnaHQrMjApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVJblJlY3QoQSxCLHJlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEucHVzaCh7QTpBLEI6Qn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2ljQXJlYS5wdXNoKGFyZWEpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGNvc3QgPSBfZW5kVGltZSAtIF9zdGFydFRpbWU7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiKysrKysrKysrKysrX2luaXRUbU9ic3RhY2xlIHRpbWUyIFwiLGNvc3QpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo5Ye655Sf54K5KVxyXG4gICAgX2luaXRUbUJvcm4oKXtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtQm9ybi5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhvYmoub2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKG9iai5uYW1lID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckJvcm5Qb3MgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gY2MudjModGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlCb3JuUG9zLnB1c2gocG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDUsIHRpbGUpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMaXN0ID0gdGhpcy5pbml0Q2hlY2tMaXN0KCk7XHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrY29zdCB0aW1lIFwiLGNvc3QpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eUn+aIkHBsYXllclxyXG4gICAgY3JlYXRlUGxheWVyKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJUeXBlID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2N1cnJlbnRfcGxheWVyX3R5cGVfXCIsMSk7XHJcbiAgICAgICAgbGV0IHBsYXllckxldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfcGxheWVyXyR7cGxheWVyVHlwZX1fYCwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiKTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wb3NpdGlvbiA9IHRoaXMuX3BsYXllckJvcm5Qb3M7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRQbGF5ZXJUeXBlKHBsYXllclR5cGUscGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGNyZWF0ZUVuZW15KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+maj+acuueyvuiLseaAqlxyXG4gICAgICAgIGxldCBlbWVteVR5cGUgPSAxMTtcclxuICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5yYW5kb20oKSoxMDA7XHJcbiAgICAgICAgaWYgKHJhbmRvbSA8IDQpIHsgZW1lbXlUeXBlID0gMTI7IH1cclxuICAgICAgICBpZiAocmFuZG9tIDwgMSkgIHsgZW1lbXlUeXBlID0gMTM7IH1cclxuXHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gdGhpcy5fZW5lbXlCb3JuUG9zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLl9lbmVteUJvcm5Qb3MubGVuZ3RoKV07XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZShlbWVteVR5cGUsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5Y+X5Ye75rWL6K+V5pWM5Lq6XHJcbiAgICBjcmVhdGVQbGF5ZXJIaXRUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDIzMCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQXR0YWNrUmFkaXVzID0gNTIwO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lID0gMC40NTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmrovooYDmtYvor5XmlYzkurpcclxuICAgIGNyZWF0ZUtpbGxFZmZlY3RUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDI2MCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDE7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUtpbGxCcm9hZGNhc3RUZXN0RW5lbWllcygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDU7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDI2MDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSAqIDIgKiBpIC8gY291bnQgLSBNYXRoLlBJICogMC41O1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzLCBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXMpKTtcclxuICAgICAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSAxO1xyXG4gICAgICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVuZW15W1wiX2tpbGxWaWN0aW1OYW1lXCJdID0gS0lMTF9URVNUX1ZJQ1RJTV9OQU1FU1tpXSB8fCAoXCLmlYzmlrlcIiArIChpICsgMSkgKyBcIuWPt1wiKTtcclxuICAgICAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quaui+ihgOeKtuaAgeWxleekuuaVjOS6ulxyXG4gICAgY3JlYXRlTG93SHBUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDI2MCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQXR0YWNrUmFkaXVzID0gOTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5CdWxsZXRDb2RlVGltZSA9IDEuMjtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoZW5lbXkuc2NyaXB0Ll9tYXhIcCAqIDAuMTgpKTtcclxuICAgICAgICBpZiAoZW5lbXkuc2NyaXB0Ll9ocCA+PSBlbmVteS5zY3JpcHQuX21heEhwKSB7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSBNYXRoLm1heCgxLCBlbmVteS5zY3JpcHQuX21heEhwIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quWwhOWHu+eJueaViOa1i+ivleacqOahqVxyXG4gICAgY3JlYXRlU2hvb3RFZmZlY3RUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDMyMCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgZW5lbXkuc2NyaXB0Ll9jb25maWcpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUG9ydGFsVGVzdEVuZW15KHBvcykge1xyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVteS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgOTApKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gMTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gMTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyUG9ydGFsVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFBhaXJzID0gW107XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT0gXCJfcG9ydGFsR2F0ZUFcIlxyXG4gICAgICAgICAgICAgICAgfHwgY2hpbGQubmFtZSA9PSBcIl9wb3J0YWxHYXRlQlwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX3BvcnRhbExpbmtGeFwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX3BvcnRhbEhpbnRMYWJlbFwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX3BvcnRhbFdhcnBGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVBvcnRhbEdhdGUobmFtZSwgcG9zLCBjb2xvciwgbGFiZWxUZXh0KSB7XHJcbiAgICAgICAgbGV0IGdhdGUgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBnYXRlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBnYXRlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGdhdGUuekluZGV4ID0gNTYwMDtcclxuXHJcbiAgICAgICAgbGV0IHJpbmcgPSBnYXRlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgcmluZy5saW5lV2lkdGggPSA4O1xyXG4gICAgICAgIHJpbmcuc3Ryb2tlQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICByaW5nLmNpcmNsZSgwLCAwLCA0Mik7XHJcbiAgICAgICAgcmluZy5zdHJva2UoKTtcclxuICAgICAgICByaW5nLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgcmluZy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDE4MCk7XHJcbiAgICAgICAgcmluZy5jaXJjbGUoMCwgMCwgMjYpO1xyXG4gICAgICAgIHJpbmcuc3Ryb2tlKCk7XHJcbiAgICAgICAgcmluZy5maWxsQ29sb3IgPSBjYy5jb2xvcihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCAzNCk7XHJcbiAgICAgICAgcmluZy5jaXJjbGUoMCwgMCwgMzYpO1xyXG4gICAgICAgIHJpbmcuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3BvcnRhbEdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSBnYXRlO1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIDcyKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDU0KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE0MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44ODtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMS4wOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMjI1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMC44OCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMTEwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfcG9ydGFsTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGdhdGU7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg4MCwgNDgpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IGxhYmVsVGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI4O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAzMjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVBvcnRhbEhpbnRMYWJlbChwb3MpIHtcclxuICAgICAgICBsZXQgaGludCA9IG5ldyBjYy5Ob2RlKFwiX3BvcnRhbEhpbnRMYWJlbFwiKTtcclxuICAgICAgICBoaW50LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBoaW50LnNldFBvc2l0aW9uKGNjLnYzKHBvcy54LCBwb3MueSArIDc0LCAwKSk7XHJcbiAgICAgICAgaGludC56SW5kZXggPSA1NjA1O1xyXG4gICAgICAgIGhpbnQub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjMwLCAyNDUsIDI1NSwgMjU1KTtcclxuICAgICAgICBoaW50LnNldENvbnRlbnRTaXplKDMyMCwgMzQpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuWQkSBBIOmXqOW8gOeBq++8jOWtkOW8ueS8muS7jiBCIOmXqOepv+WHulwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBoaW50O1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVQb3J0YWxMaW5rRngoZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9wb3J0YWxMaW5rRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU0MDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGZ4LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDExMCwgMjU1LCAyNDUsIDEyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubW92ZVRvKGZyb21Qb3MueCwgZnJvbVBvcy55KTtcclxuICAgICAgICBncmFwaGljcy5saW5lVG8odG9Qb3MueCwgdG9Qb3MueSk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDEyMDtcclxuICAgICAgICBmeC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZVRvKDAuMzUsIDIxMCksXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbygwLjM1LCA5MClcclxuICAgICAgICApKSk7XHJcbiAgICAgICAgcmV0dXJuIGZ4O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBvcnRhbFRlc3RTZXR1cCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NsZWFyUG9ydGFsVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBlbnRyeVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMjIwLCAwKSksIDkwKTtcclxuICAgICAgICBsZXQgZXhpdFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoLTE0MCwgMTgwKSksIDkwKTtcclxuICAgICAgICBsZXQgZW5lbXlQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihleGl0UG9zLmFkZChjYy52MigyODAsIDApKSwgOTApO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVQb3J0YWxHYXRlKFwiX3BvcnRhbEdhdGVBXCIsIGVudHJ5UG9zLCBjYy5jb2xvcig5MCwgMjE1LCAyNTUsIDI1NSksIFwiQVwiKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVQb3J0YWxHYXRlKFwiX3BvcnRhbEdhdGVCXCIsIGV4aXRQb3MsIGNjLmNvbG9yKDI1NSwgMTIwLCAyMjAsIDI1NSksIFwiQlwiKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVQb3J0YWxMaW5rRngoZW50cnlQb3MsIGV4aXRQb3MpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbEhpbnRMYWJlbChlbnRyeVBvcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQb3J0YWxUZXN0RW5lbXkoZW5lbXlQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9wb3J0YWxQYWlycy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IFwicG9ydGFsQVwiLFxyXG4gICAgICAgICAgICBwb3M6IGVudHJ5UG9zLFxyXG4gICAgICAgICAgICByYWRpdXM6IDQ0LFxyXG4gICAgICAgICAgICBleGl0SWQ6IFwicG9ydGFsQlwiLFxyXG4gICAgICAgICAgICBleGl0UG9zOiBleGl0UG9zXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsUGFpcnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBcInBvcnRhbEJcIixcclxuICAgICAgICAgICAgcG9zOiBleGl0UG9zLFxyXG4gICAgICAgICAgICByYWRpdXM6IDQ0LFxyXG4gICAgICAgICAgICBleGl0SWQ6IFwicG9ydGFsQVwiLFxyXG4gICAgICAgICAgICBleGl0UG9zOiBlbnRyeVBvc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3blBvcnRhbFdhcnBGeChwb3MsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfcG9ydGFsV2FycEZ4XCIpO1xyXG4gICAgICAgIGZ4LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBmeC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBmeC56SW5kZXggPSA1NzAwO1xyXG4gICAgICAgIGZ4Lm9wYWNpdHkgPSAyMjA7XHJcbiAgICAgICAgZnguc2NhbGUgPSAwLjM1O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjYpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNCk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTYsIDEuNyksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckNlbnRyaWZ1Z2FsUmluZ1Rlc3ROb2RlcygpIHtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9jZW50cmlmdWdhbFJpbmdcIlxyXG4gICAgICAgICAgICAgICAgfHwgY2hpbGQubmFtZSA9PSBcIl9jZW50cmlmdWdhbFJpbmdIaW50XCJcclxuICAgICAgICAgICAgICAgIHx8IGNoaWxkLm5hbWUgPT0gXCJfY2VudHJpZnVnYWxSaW5nR3VpZGVcIlxyXG4gICAgICAgICAgICAgICAgfHwgY2hpbGQubmFtZSA9PSBcIl9jZW50cmlmdWdhbFJpbmdGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ05vZGUocG9zLCByYWRpdXMsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHJpbmcgPSBuZXcgY2MuTm9kZShcIl9jZW50cmlmdWdhbFJpbmdcIik7XHJcbiAgICAgICAgcmluZy5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcmluZy5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICByaW5nLnpJbmRleCA9IDU2NTA7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfcmluZ0dsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSByaW5nO1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIDQwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyArIDI2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE2MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44NDtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMS4wNiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMjIwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMC44NCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMTIwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSByaW5nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI0NiwgMjIwLCAxODApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSAxNSk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgMjQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSA2KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmMgPSBuZXcgY2MuTm9kZShcIl9yaW5nQXJjXCIgKyBpKTtcclxuICAgICAgICAgICAgYXJjLnBhcmVudCA9IHJpbmc7XHJcbiAgICAgICAgICAgIGFyYy5hbmdsZSA9IGkgKiAxMjA7XHJcbiAgICAgICAgICAgIGxldCBhcmNHcmFwaGljcyA9IGFyYy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljcy5saW5lV2lkdGggPSA2O1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgICAgIGFyY0dyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMgKyA2LCAtTWF0aC5QSSAqIDAuMiwgTWF0aC5QSSAqIDAuMzIsIGZhbHNlKTtcclxuICAgICAgICAgICAgYXJjR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJpbmcucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMS4yLCAtMTgwKSkpO1xyXG4gICAgICAgIHJldHVybiByaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVDZW50cmlmdWdhbFJpbmdHdWlkZShmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGxldCBndWlkZSA9IG5ldyBjYy5Ob2RlKFwiX2NlbnRyaWZ1Z2FsUmluZ0d1aWRlXCIpO1xyXG4gICAgICAgIGd1aWRlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBndWlkZS56SW5kZXggPSA1NTAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBndWlkZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDE4NCwgMTEyLCAxMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLm1vdmVUbyhmcm9tUG9zLngsIGZyb21Qb3MueSk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVRvKHRvUG9zLngsIHRvUG9zLnkpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGd1aWRlLm9wYWNpdHkgPSAxMjA7XHJcbiAgICAgICAgZ3VpZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbygwLjMsIDIxMCksXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbygwLjMsIDkwKVxyXG4gICAgICAgICkpKTtcclxuICAgICAgICByZXR1cm4gZ3VpZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ0hpbnQocG9zKSB7XHJcbiAgICAgICAgbGV0IGhpbnQgPSBuZXcgY2MuTm9kZShcIl9jZW50cmlmdWdhbFJpbmdIaW50XCIpO1xyXG4gICAgICAgIGhpbnQucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGhpbnQuc2V0UG9zaXRpb24oY2MudjMocG9zLngsIHBvcy55ICsgMTAwLCAwKSk7XHJcbiAgICAgICAgaGludC56SW5kZXggPSA1NjYwO1xyXG4gICAgICAgIGhpbnQub3BhY2l0eSA9IDIyNTtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjU1LCAyMzUsIDIwNSwgMjU1KTtcclxuICAgICAgICBoaW50LnNldENvbnRlbnRTaXplKDQyMCwgNTgpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuebtOe6v+WwhOWFpeemu+W/g+WKm+WciO+8jOWtkOW8ueS8mue7leWciOWKoOmAn+WQjueUqeWHulwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI4O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBoaW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNlbnRyaWZ1Z2FsUmluZ1Rlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2VudHJpZnVnYWxSaW5nVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJDZW50cmlmdWdhbFJpbmdUZXN0Tm9kZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMjIwLCAwKSksIDEyMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDgyO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNlbnRlci5hZGQoY2MudjIoMzEwLCA5MikpLCAxMDApO1xyXG4gICAgICAgIGxldCBjb2xvciA9IGNjLmNvbG9yKDI1NSwgMTcwLCA5NiwgMjU1KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2VudHJpZnVnYWxSaW5nTm9kZShjZW50ZXIsIHJhZGl1cywgY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ0d1aWRlKHBsYXllclBvcywgY2VudGVyKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVDZW50cmlmdWdhbFJpbmdIaW50KGNlbnRlcik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDZW50cmlmdWdhbFJpbmdUZXN0RW5lbXkoZW5lbXlQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdEYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogXCJjZW50cmlmdWdhbEFcIixcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIHRyaWdnZXJSYWRpdXM6IHJhZGl1cyAtIDEwLFxyXG4gICAgICAgICAgICBvcmJpdFJhZGl1czogcmFkaXVzICsgMixcclxuICAgICAgICAgICAgcm90YXRlQW5nbGU6IE1hdGguUEkgKiAwLjUyLFxyXG4gICAgICAgICAgICBhbmd1bGFyU3BlZWQ6IE1hdGguUEkgKiA1LjIsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvblNpZ246IC0xLFxyXG4gICAgICAgICAgICBzcGVlZEJvb3N0OiAxLjk1LFxyXG4gICAgICAgICAgICBkYW1hZ2VCb29zdDogMS44LFxyXG4gICAgICAgICAgICByYWRpdXNFeHBhbmQ6IDI0LFxyXG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KHBvcywgaXNSZWxlYXNlID0gZmFsc2UsIGNvbG9yID0gbnVsbCwgZGlyID0gbnVsbCwgc3BlZWQgPSAwKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfY2VudHJpZnVnYWxSaW5nRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU2OTA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBmeC5zY2FsZSA9IGlzUmVsZWFzZSA/IDAuNDUgOiAwLjMyO1xyXG5cclxuICAgICAgICBsZXQgZWZmZWN0Q29sb3IgPSBjb2xvciB8fCBjYy5jb2xvcigyNTUsIDE3MCwgOTYsIDI1NSk7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSBpc1JlbGVhc2UgPyA3IDogNTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGVmZmVjdENvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCBpc1JlbGVhc2UgPyAyNiA6IDE4KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjEwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgaXNSZWxlYXNlID8gMTIgOiA4KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzUmVsZWFzZSAmJiBkaXIgJiYgZGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdGFpbCA9IG5ldyBjYy5Ob2RlKFwiX2NlbnRyaWZ1Z2FsUmluZ0Z4VGFpbFwiKTtcclxuICAgICAgICAgICAgdGFpbC5wYXJlbnQgPSBmeDtcclxuICAgICAgICAgICAgdGFpbC5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3MoZGlyKSAtIDkwO1xyXG4gICAgICAgICAgICBsZXQgdGFpbEdyYXBoaWNzID0gdGFpbC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoZWZmZWN0Q29sb3IuciwgZWZmZWN0Q29sb3IuZywgZWZmZWN0Q29sb3IuYiwgMTYwKTtcclxuICAgICAgICAgICAgdGFpbEdyYXBoaWNzLm1vdmVUbygwLCAzNCArIE1hdGgubWluKDI4LCBzcGVlZCAqIDAuNikpO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MubGluZVRvKC0xMCwgOCk7XHJcbiAgICAgICAgICAgIHRhaWxHcmFwaGljcy5saW5lVG8oMTAsIDgpO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGFpbEdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGlzUmVsZWFzZSA/IDAuMTggOiAwLjEyLCBpc1JlbGVhc2UgPyAxLjggOiAxLjM1KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoaXNSZWxlYXNlID8gMC4xOCA6IDAuMTIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckRhbWFnZURvdWJsZVRlc3ROb2RlcygpIHtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVBcmVhRGF0YSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT0gXCJfZGFtYWdlRG91YmxlQXJlYVwiIHx8IGNoaWxkLm5hbWUgPT0gXCJfZGFtYWdlRG91YmxlRnhcIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEYW1hZ2VEb3VibGVBcmVhTm9kZShwb3MsIHJhZGl1cywgY29sb3IpIHtcclxuICAgICAgICBsZXQgYXJlYSA9IG5ldyBjYy5Ob2RlKFwiX2RhbWFnZURvdWJsZUFyZWFcIik7XHJcbiAgICAgICAgYXJlYS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgYXJlYS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBhcmVhLnpJbmRleCA9IDU2NTA7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAwLCAwLCAzNSk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgKyAyMCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAxNjA7XHJcbiAgICAgICAgZ2xvdy5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMS4wOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAyMjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjUsIDAuODUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwgMTIwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBhcmVhLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMzAsIDMwLCAyNTUpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMCwgMCwgMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSA0KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lclJpbmcgPSBuZXcgY2MuTm9kZShcIl9kYW1hZ2VEb3VibGVJbm5lclJpbmdcIik7XHJcbiAgICAgICAgaW5uZXJSaW5nLnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBpbm5lclJpbmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMTAwLCAxMDAsIDE1MCk7XHJcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gMjQ7XHJcbiAgICAgICAgbGV0IGRhc2hMZW4gPSBNYXRoLlBJICogMiAvIHNlZ21lbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHM7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IGkgKiBkYXNoTGVuO1xyXG4gICAgICAgICAgICBsZXQgZW5kQW5nbGUgPSAoaSArIDEpICogZGFzaExlbjtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzIC0gMTIsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlubmVyUmluZy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgyLjAsIDkwKSkpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDE0MCwgNDgpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCA2MCwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIngyXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlSGludFwiKTtcclxuICAgICAgICBoaW50LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgaGludC5zZXRQb3NpdGlvbihjYy52MigwLCByYWRpdXMgKyAzNikpO1xyXG4gICAgICAgIGhpbnQuc2V0Q29udGVudFNpemUoMzAwLCA0MCk7XHJcbiAgICAgICAgaGludC5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjIwLCAyMjAsIDIyMCk7XHJcbiAgICAgICAgbGV0IGhpbnRMYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBoaW50TGFiZWwuc3RyaW5nID0gXCLlrZDlvLnnqb/ov4cg5Lyk5a6zeDIg5L2T56ev5aKe5aSnXCI7XHJcbiAgICAgICAgaGludExhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgaGludExhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBoaW50TGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBoaW50TGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICByZXR1cm4gYXJlYTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEYW1hZ2VEb3VibGVUZXN0RW5lbXkocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURhbWFnZURvdWJsZVRlc3RTZXR1cCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NsZWFyRGFtYWdlRG91YmxlVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDIyMCwgMCkpLCAxMDApO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSA2MDtcclxuICAgICAgICBsZXQgY29sb3IgPSBjYy5jb2xvcigyNTUsIDQwLCA0MCwgMjU1KTtcclxuICAgICAgICBsZXQgZW5lbXlQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihjZW50ZXIuYWRkKGNjLnYyKHJhZGl1cyArIDQwLCAwKSksIDkwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlRGFtYWdlRG91YmxlQXJlYU5vZGUoY2VudGVyLCByYWRpdXMsIGNvbG9yKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZURhbWFnZURvdWJsZVRlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIGRhbWFnZU11bHRpcGxpZXI6IDIsXHJcbiAgICAgICAgICAgIHNjYWxlTXVsdGlwbGllcjogMS41LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJEYW1hZ2VEb3VibGVBcmVhKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2RhbWFnZURvdWJsZVRlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1bGxldC5oYXNVc2VkRGFtYWdlRG91YmxlQXJlYSAmJiBidWxsZXQuaGFzVXNlZERhbWFnZURvdWJsZUFyZWEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXJlYSA9IHRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kaXN0YW5jZVBvaW50VG9TZWdtZW50KGFyZWEuY2VudGVyLCBjYy52Mihmcm9tUG9zKSwgY2MudjIodG9Qb3MpKSA+IGFyZWEucmFkaXVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJEYW1hZ2VEb3VibGVBcmVhID8gYnVsbGV0LmVudGVyRGFtYWdlRG91YmxlQXJlYShhcmVhKSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduRGFtYWdlRG91YmxlRngocG9zKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU3MDA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBmeC5zY2FsZSA9IDAuNDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDUwLCA1MCwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMDAsIDUwLCAyMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyNik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwgMS42KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJTcGVlZERvdWJsZVRlc3ROb2RlcygpIHtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZUFyZWFEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9zcGVlZERvdWJsZUFyZWFcIiB8fCBjaGlsZC5uYW1lID09IFwiX3NwZWVkRG91YmxlRnhcIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVTcGVlZERvdWJsZUFyZWFOb2RlKHBvcywgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBhcmVhID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVBcmVhXCIpO1xyXG4gICAgICAgIGFyZWEucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGFyZWEuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYXJlYS56SW5kZXggPSA1NjUwO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3NwZWVkRG91YmxlR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgODAsIDI1NSwgMzUpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICsgMjApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMTYwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjg1O1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjUsIDEuMDgpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwgMjIwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC41LCAwLjg1KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjUsIDEyMClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpKTtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYXJlYS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigzMCwgMTMwLCAyNTUsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgODAsIDI1NSwgMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSA0KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lclJpbmcgPSBuZXcgY2MuTm9kZShcIl9zcGVlZERvdWJsZUlubmVyUmluZ1wiKTtcclxuICAgICAgICBpbm5lclJpbmcucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyUmluZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpbm5lckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCAxODAsIDI1NSwgMTUwKTtcclxuICAgICAgICBsZXQgc2VnbWVudHMgPSAyNDtcclxuICAgICAgICBsZXQgZGFzaExlbiA9IE1hdGguUEkgKiAyIC8gc2VnbWVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlID0gaSAqIGRhc2hMZW47XHJcbiAgICAgICAgICAgIGxldCBlbmRBbmdsZSA9IChpICsgMSkgKiBkYXNoTGVuO1xyXG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMgLSAxMiwgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5uZXJSaW5nLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDIuMCwgLTkwKSkpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTQwLCA0OCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMTAwLCAyMDAsIDI1NSwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIngyXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVIaW50XCIpO1xyXG4gICAgICAgIGhpbnQucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBoaW50LnNldFBvc2l0aW9uKGNjLnYyKDAsIHJhZGl1cyArIDM2KSk7XHJcbiAgICAgICAgaGludC5zZXRDb250ZW50U2l6ZSgzMDAsIDQwKTtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjAwLCAyMjAsIDI1NSwgMjIwKTtcclxuICAgICAgICBsZXQgaGludExhYmVsID0gaGludC5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGhpbnRMYWJlbC5zdHJpbmcgPSBcIuWtkOW8ueepv+i/hyDpgJ/luqZ4M1wiO1xyXG4gICAgICAgIGhpbnRMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGhpbnRMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgaGludExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgaGludExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFyZWE7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3BlZWREb3VibGVUZXN0RW5lbXkocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNwZWVkRG91YmxlVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcGVlZERvdWJsZVRlc3ROb2RlcygpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigyMjAsIDApKSwgMTAwKTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gNjA7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gY2MuY29sb3IoMzAsIDEzMCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNlbnRlci5hZGQoY2MudjIocmFkaXVzICsgNDAsIDApKSwgOTApO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVTcGVlZERvdWJsZUFyZWFOb2RlKGNlbnRlciwgcmFkaXVzLCBjb2xvcik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTcGVlZERvdWJsZVRlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlQXJlYURhdGEgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgc3BlZWRNdWx0aXBsaWVyOiAzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJTcGVlZERvdWJsZUFyZWEoYnVsbGV0LCBmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSB8fCAhYnVsbGV0IHx8ICF0aGlzLl9zcGVlZERvdWJsZUFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1bGxldC5oYXNVc2VkU3BlZWREb3VibGVBcmVhICYmIGJ1bGxldC5oYXNVc2VkU3BlZWREb3VibGVBcmVhKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyZWEgPSB0aGlzLl9zcGVlZERvdWJsZUFyZWFEYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kaXN0YW5jZVBvaW50VG9TZWdtZW50KGFyZWEuY2VudGVyLCBjYy52Mihmcm9tUG9zKSwgY2MudjIodG9Qb3MpKSA+IGFyZWEucmFkaXVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJTcGVlZERvdWJsZUFyZWEgPyBidWxsZXQuZW50ZXJTcGVlZERvdWJsZUFyZWEoYXJlYSkgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3blNwZWVkRG91YmxlRngocG9zKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVGeFwiKTtcclxuICAgICAgICBmeC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZnguc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZnguekluZGV4ID0gNTcwMDtcclxuICAgICAgICBmeC5vcGFjaXR5ID0gMjIwO1xyXG4gICAgICAgIGZ4LnNjYWxlID0gMC40O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDUwLCAxNTAsIDI1NSwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCAyMDAsIDI1NSwgMjIwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjYpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBmeC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDEuNiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyU3ByZWFkQnVsbGV0VGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldEFyZWFEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9zcHJlYWRCdWxsZXRBcmVhXCIgfHwgY2hpbGQubmFtZSA9PSBcIl9zcHJlYWRCdWxsZXRGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVNwcmVhZEJ1bGxldEFyZWFOb2RlKHBvcywgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBhcmVhID0gbmV3IGNjLk5vZGUoXCJfc3ByZWFkQnVsbGV0QXJlYVwiKTtcclxuICAgICAgICBhcmVhLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBhcmVhLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGFyZWEuekluZGV4ID0gNTY1MDtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9zcHJlYWRCdWxsZXRHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAyMDAsIDgwLCAzNSk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgKyAyMCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAxNjA7XHJcbiAgICAgICAgZ2xvdy5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMS4wOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAyMjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjUsIDAuODUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwgMTIwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBhcmVhLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDMwLCAyMzAsIDEwMCwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAyMDAsIDgwLCAzMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyUmluZyA9IG5ldyBjYy5Ob2RlKFwiX3NwcmVhZEJ1bGxldElubmVyUmluZ1wiKTtcclxuICAgICAgICBpbm5lclJpbmcucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyUmluZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpbm5lckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCAyNTUsIDE1MCwgMTUwKTtcclxuICAgICAgICBsZXQgc2VnbWVudHMgPSAyNDtcclxuICAgICAgICBsZXQgZGFzaExlbiA9IE1hdGguUEkgKiAyIC8gc2VnbWVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlID0gaSAqIGRhc2hMZW47XHJcbiAgICAgICAgICAgIGxldCBlbmRBbmdsZSA9IChpICsgMSkgKiBkYXNoTGVuO1xyXG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMgLSAxMiwgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5uZXJSaW5nLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDIuMCwgNjApKSk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zcHJlYWRCdWxsZXRMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTQwLCA0OCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMTAwLCAyNTUsIDE0MCwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIngzXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfc3ByZWFkQnVsbGV0SGludFwiKTtcclxuICAgICAgICBoaW50LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgaGludC5zZXRQb3NpdGlvbihjYy52MigwLCByYWRpdXMgKyAzNikpO1xyXG4gICAgICAgIGhpbnQuc2V0Q29udGVudFNpemUoMzAwLCA0MCk7XHJcbiAgICAgICAgaGludC5jb2xvciA9IGNjLmNvbG9yKDIwMCwgMjU1LCAyMjAsIDIyMCk7XHJcbiAgICAgICAgbGV0IGhpbnRMYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBoaW50TGFiZWwuc3RyaW5nID0gXCLlrZDlvLnnqb/ov4cgMeWPmDNcIjtcclxuICAgICAgICBoaW50TGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBoaW50TGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGhpbnRMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGhpbnRMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIHJldHVybiBhcmVhO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNwcmVhZEJ1bGxldFRlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3ByZWFkQnVsbGV0VGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcHJlYWRCdWxsZXRUZXN0Tm9kZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMjIwLCAwKSksIDEwMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDYwO1xyXG4gICAgICAgIGxldCBjb2xvciA9IGNjLmNvbG9yKDMwLCAyMzAsIDEwMCwgMjU1KTtcclxuICAgICAgICBsZXQgZW5lbXlQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihjZW50ZXIuYWRkKGNjLnYyKDIwMCwgMCkpLCA5MCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVNwcmVhZEJ1bGxldEFyZWFOb2RlKGNlbnRlciwgcmFkaXVzLCBjb2xvcik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTcHJlYWRCdWxsZXRUZXN0RW5lbXkoZW5lbXlQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRBcmVhRGF0YSA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBzcHJlYWRDb3VudDogMixcclxuICAgICAgICAgICAgc3ByZWFkQW5nbGU6IDIwLFxyXG4gICAgICAgICAgICBfc3BsaXRUcmlnZ2VyZWQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJTcHJlYWRCdWxsZXRBcmVhKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX3NwcmVhZEJ1bGxldEFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcmVhID0gdGhpcy5fc3ByZWFkQnVsbGV0QXJlYURhdGE7XHJcbiAgICAgICAgaWYgKGFyZWEuX3NwbGl0VHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQoYXJlYS5jZW50ZXIsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gYXJlYS5yYWRpdXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXJlYS5fc3BsaXRUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJTcHJlYWRCdWxsZXRBcmVhID8gYnVsbGV0LmVudGVyU3ByZWFkQnVsbGV0QXJlYShhcmVhKSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduU3ByZWFkQnVsbGV0RngocG9zKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfc3ByZWFkQnVsbGV0RnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU3MDA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBmeC5zY2FsZSA9IDAuNDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig1MCwgMjMwLCAxMDAsIDE4MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDIwKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDEwMCwgMjU1LCAxNTAsIDIyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI2KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgZngucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLCAxLjYpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckJvdW5jZU9ic3RhY2xlVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlcyA9IFtdO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lLmluZGV4T2YoXCJfYm91bmNlT2JzdGFjbGVcIikgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVCb3VuY2VDaXJjbGVPYnN0YWNsZShwb3MsIHJhZGl1cykge1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoXCJfYm91bmNlT2JzdGFjbGVDaXJjbGVcIik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDU2MDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDEyMCwgMTgwLCA2MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDgwLCAxODAsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlcy5wdXNoKHtcclxuICAgICAgICAgICAgdHlwZTogXCJjaXJjbGVcIixcclxuICAgICAgICAgICAgY2VudGVyOiBjYy52Mihwb3MpLFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUJvdW5jZUxpbmVPYnN0YWNsZShmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoXCJfYm91bmNlT2JzdGFjbGVMaW5lXCIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIG5vZGUuekluZGV4ID0gNTYwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gbm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDgwLCAxODAsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MubW92ZVRvKGZyb21Qb3MueCwgZnJvbVBvcy55KTtcclxuICAgICAgICBncmFwaGljcy5saW5lVG8odG9Qb3MueCwgdG9Qb3MueSk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBBID0gY2MudjIoZnJvbVBvcyk7XHJcbiAgICAgICAgbGV0IEIgPSBjYy52Mih0b1Bvcyk7XHJcbiAgICAgICAgbGV0IGRpciA9IEIuc3ViKEEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCBub3JtYWwgPSBjYy52MigtZGlyLnksIGRpci54KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVzLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlOiBcImxpbmVcIixcclxuICAgICAgICAgICAgQTogQSxcclxuICAgICAgICAgICAgQjogQixcclxuICAgICAgICAgICAgbm9ybWFsOiBub3JtYWwsXHJcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJCb3VuY2VPYnN0YWNsZVRlc3ROb2RlcygpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQm91bmNlQ2lyY2xlT2JzdGFjbGUodGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigxODAsIDQwKSksIDgwKSwgMzYpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUJvdW5jZUNpcmNsZU9ic3RhY2xlKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMTgwLCAtNTApKSwgODApLCAyOCk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQm91bmNlTGluZU9ic3RhY2xlKFxyXG4gICAgICAgICAgICB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDMyMCwgLTgwKSksIDYwKSxcclxuICAgICAgICAgICAgdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigzMjAsIDgwKSksIDYwKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoNDgwLCAwKSksIDkwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdEVuZW15KGVuZW15UG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCb3VuY2VPYnN0YWNsZVRlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZShidWxsZXQsIGZyb21Qb3MsIHRvUG9zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlIHx8ICFidWxsZXQgfHwgdGhpcy5fYm91bmNlT2JzdGFjbGVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmcm9tID0gY2MudjIoZnJvbVBvcyk7XHJcbiAgICAgICAgbGV0IHRvID0gY2MudjIodG9Qb3MpO1xyXG4gICAgICAgIGxldCBkaXJCdWxsZXQgPSB0by5zdWIoZnJvbSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYm91bmNlT2JzdGFjbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnN0YWNsZSA9IHRoaXMuX2JvdW5jZU9ic3RhY2xlc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYnN0YWNsZS50eXBlID09IFwiY2lyY2xlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjZW50ZXIgPSBvYnN0YWNsZS5jZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gb2JzdGFjbGUucmFkaXVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IEFDID0gY2VudGVyLnN1Yihmcm9tKTtcclxuICAgICAgICAgICAgICAgIGxldCBsZW5TcXIgPSBkaXJCdWxsZXQubWFnU3FyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuU3FyIDw9IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSBBQy5kb3QoZGlyQnVsbGV0KSAvIGxlblNxcjtcclxuICAgICAgICAgICAgICAgIHQgPSBjYy5taXNjLmNsYW1wZih0LCAwLCAxKTtcclxuICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0ID0gZnJvbS5hZGQoZGlyQnVsbGV0Lm11bCh0KSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IGNlbnRlci5zdWIoY2xvc2VzdCkubWFnKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPj0gcmFkaXVzKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdXJmYWNlIG5vcm1hbCBwb2ludHMgZnJvbSBjZW50ZXIgb3V0d2FyZCB0byB0aGUgaGl0IHBvaW50IG9uIGNpcmN1bWZlcmVuY2VcclxuICAgICAgICAgICAgICAgIGxldCBzdXJmYWNlTm9ybWFsID0gY2xvc2VzdC5zdWIoY2VudGVyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdXJmYWNlTm9ybWFsLm1hZ1NxcigpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXJmYWNlTm9ybWFsID0gY2MudjIoMSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc3VyZmFjZU5vcm1hbCBzaG91bGQgcG9pbnQgdG93YXJkIHRoZSBpbmNvbWluZyBidWxsZXRcclxuICAgICAgICAgICAgICAgIGxldCBkb3QgPSBidWxsZXQuX2Rpci5kb3Qoc3VyZmFjZU5vcm1hbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG90ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cmZhY2VOb3JtYWwgPSBzdXJmYWNlTm9ybWFsLm11bCgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90ID0gLWRvdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVmbGVjdERpciA9IGJ1bGxldC5fZGlyLnN1YihzdXJmYWNlTm9ybWFsLm11bCgyICogZG90KSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuX2RpciA9IHJlZmxlY3REaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3MoYnVsbGV0Ll9kaXIpIC0gOTA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUGxhY2UgYnVsbGV0IG9uIHRoZSBjaXJjdW1mZXJlbmNlIGF0IHRoZSBoaXQgcG9pbnQsIHRoZW4gcHVzaCBvdXR3YXJkXHJcbiAgICAgICAgICAgICAgICBsZXQgaGl0UG9pbnQgPSBjZW50ZXIuYWRkKGNsb3Nlc3Quc3ViKGNlbnRlcikubm9ybWFsaXplKCkubXVsKHJhZGl1cykpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuc2V0UG9zaXRpb24oY2MudjMoaGl0UG9pbnQuYWRkKGJ1bGxldC5fZGlyLm11bCg4KSkpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9ic3RhY2xlLnR5cGUgPT0gXCJsaW5lXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBBID0gb2JzdGFjbGUuQTtcclxuICAgICAgICAgICAgICAgIGxldCBCID0gb2JzdGFjbGUuQjtcclxuICAgICAgICAgICAgICAgIGxldCBkaXJPYnN0YWNsZSA9IEIuc3ViKEEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyb3NzIHByb2R1Y3QgdG8gY2hlY2sgc2VnbWVudCBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgICAgIGxldCBkZW5vbSA9IGRpckJ1bGxldC54ICogZGlyT2JzdGFjbGUueSAtIGRpckJ1bGxldC55ICogZGlyT2JzdGFjbGUueDtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZW5vbSkgPCAwLjAwMDEpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0MSA9ICgoQS54IC0gZnJvbS54KSAqIGRpck9ic3RhY2xlLnkgLSAoQS55IC0gZnJvbS55KSAqIGRpck9ic3RhY2xlLngpIC8gZGVub207XHJcbiAgICAgICAgICAgICAgICBsZXQgdDIgPSAoKEEueCAtIGZyb20ueCkgKiBkaXJCdWxsZXQueSAtIChBLnkgLSBmcm9tLnkpICogZGlyQnVsbGV0LngpIC8gZGVub207XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHQxIDwgMCB8fCB0MSA+IDEgfHwgdDIgPCAwIHx8IHQyID4gMSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5vcm1hbCA9IG9ic3RhY2xlLm5vcm1hbDtcclxuICAgICAgICAgICAgICAgIGxldCBkb3QgPSBidWxsZXQuX2Rpci5kb3Qobm9ybWFsKTtcclxuICAgICAgICAgICAgICAgIGlmIChkb3QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsID0gbm9ybWFsLm11bCgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90ID0gLWRvdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVmbGVjdERpciA9IGJ1bGxldC5fZGlyLnN1Yihub3JtYWwubXVsKDIgKiBkb3QpKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5fZGlyID0gcmVmbGVjdERpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyhidWxsZXQuX2RpcikgLSA5MDtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKGZyb20uYWRkKGJ1bGxldC5fZGlyLm11bCg4KSkpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyQmxhY2tIb2xlVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZUFyZWFEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9ibGFja0hvbGVBcmVhXCIgfHwgY2hpbGQubmFtZSA9PSBcIl9ibGFja0hvbGVGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUJsYWNrSG9sZUFyZWFOb2RlKHBvcywgcmFkaXVzLCBkZXN0cm95UmFkaXVzLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBhcmVhID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlQXJlYVwiKTtcclxuICAgICAgICBhcmVhLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBhcmVhLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGFyZWEuekluZGV4ID0gNTY1MDtcclxuXHJcbiAgICAgICAgLy8gT3V0ZXIgZ2xvd1xyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNjAsIDIwLCAxMDAsIDI1KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyArIDMwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE0MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44MjtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC44LCAxLjEyKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjgsIDIxMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuOCwgMC44MiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC44LCAxMTApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKSk7XHJcblxyXG4gICAgICAgIC8vIE91dGVyIHJpbmdcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBhcmVhLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDEwMCwgNDAsIDE4MCwgMjAwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig0MCwgMTAsIDgwLCAzNSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDMpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgLy8gSW5uZXIgYWNjcmV0aW9uIGRpc2sgcmluZ3NcclxuICAgICAgICBsZXQgcmluZ0NvdW50ID0gNDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJpbmdDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByaW5nUmFkaXVzID0gcmFkaXVzIC0gKHJhZGl1cyAtIGRlc3Ryb3lSYWRpdXMpICogKGkgKyAxKSAvIChyaW5nQ291bnQgKyAxKTtcclxuICAgICAgICAgICAgbGV0IHJpbmdOb2RlID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlUmluZ1wiICsgaSk7XHJcbiAgICAgICAgICAgIHJpbmdOb2RlLnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgICAgIGxldCByaW5nR3JhcGhpY3MgPSByaW5nTm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICByaW5nR3JhcGhpY3MubGluZVdpZHRoID0gMyAtIGkgKiAwLjU7XHJcbiAgICAgICAgICAgIGxldCBhbHBoYSA9IDE4MCAtIGkgKiAzNTtcclxuICAgICAgICAgICAgcmluZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTIwLCA1MCwgMjAwLCBhbHBoYSk7XHJcbiAgICAgICAgICAgIHJpbmdHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmluZ1JhZGl1cyk7XHJcbiAgICAgICAgICAgIHJpbmdHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICAgICAgcmluZ05vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMS41ICsgaSAqIDAuMywgOTAgKyBpICogMzApKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEYXJrIGNvcmVcclxuICAgICAgICBsZXQgY29yZSA9IG5ldyBjYy5Ob2RlKFwiX2JsYWNrSG9sZUNvcmVcIik7XHJcbiAgICAgICAgY29yZS5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGxldCBjb3JlR3JhcGhpY3MgPSBjb3JlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDIyMCk7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCBkZXN0cm95UmFkaXVzKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDE4MCwgMTAwLCAyNTUsIDEwMCk7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCBkZXN0cm95UmFkaXVzKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIC8vIExhYmVsXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2JsYWNrSG9sZUxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgxNDAsIDQ4KTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigxODAsIDEyMCwgMjU1LCAyMjApO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi6buR5rSeXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzMDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMzY7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIC8vIEhpbnRcclxuICAgICAgICBsZXQgaGludCA9IG5ldyBjYy5Ob2RlKFwiX2JsYWNrSG9sZUhpbnRcIik7XHJcbiAgICAgICAgaGludC5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGhpbnQuc2V0UG9zaXRpb24oY2MudjIoMCwgcmFkaXVzICsgMzYpKTtcclxuICAgICAgICBoaW50LnNldENvbnRlbnRTaXplKDMyMCwgNDApO1xyXG4gICAgICAgIGhpbnQuY29sb3IgPSBjYy5jb2xvcigyMDAsIDE4MCwgMjU1LCAyMDApO1xyXG4gICAgICAgIGxldCBoaW50TGFiZWwgPSBoaW50LmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgaGludExhYmVsLnN0cmluZyA9IFwi5a2Q5by56Z2g6L+R5Lya6KKr5ZC45byV5ZCe5ZmsXCI7XHJcbiAgICAgICAgaGludExhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgaGludExhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBoaW50TGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBoaW50TGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICByZXR1cm4gYXJlYTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCbGFja0hvbGVUZXN0RW5lbXkocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJsYWNrSG9sZVRlc3RTZXR1cCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NsZWFyQmxhY2tIb2xlVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDMwMCwgMCkpLCAxMjApO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSAxMDA7XHJcbiAgICAgICAgbGV0IGRlc3Ryb3lSYWRpdXMgPSAxNDtcclxuICAgICAgICBsZXQgY29sb3IgPSBjYy5jb2xvcig4MCwgMzAsIDE2MCwgMjAwKTtcclxuICAgICAgICBsZXQgZW5lbXlQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihjZW50ZXIuYWRkKGNjLnYyKDI4MCwgMTAwKSksIDkwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQmxhY2tIb2xlQXJlYU5vZGUoY2VudGVyLCByYWRpdXMsIGRlc3Ryb3lSYWRpdXMsIGNvbG9yKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJsYWNrSG9sZVRlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZUFyZWFEYXRhID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIGRlc3Ryb3lSYWRpdXM6IGRlc3Ryb3lSYWRpdXMsXHJcbiAgICAgICAgICAgIGdyYXZpdHlTdHJlbmd0aDogMTYwLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJCbGFja0hvbGVBcmVhKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX2JsYWNrSG9sZUFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb3MgPSBjYy52MihidWxsZXQubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGRpc3QgPSBwb3Muc3ViKHRoaXMuX2JsYWNrSG9sZUFyZWFEYXRhLmNlbnRlcikubWFnKCk7XHJcbiAgICAgICAgcmV0dXJuIGRpc3QgPCB0aGlzLl9ibGFja0hvbGVBcmVhRGF0YS5yYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25CbGFja0hvbGVTd2FsbG93RngocG9zKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU3MDA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig4MCwgMzAsIDE2MCwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTgwLCAxMDAsIDI1NSwgMjAwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTgpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBmeC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAwKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yNSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2x1c3RlckJvbWJUZXN0RW5lbWllcygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBzdGFydFBvcyA9IHBsYXllclBvcy5hZGQoY2MudjIoNTAwLCAtMTIwKSk7XHJcbiAgICAgICAgbGV0IGNvbHMgPSA0O1xyXG4gICAgICAgIGxldCByb3dzID0gMztcclxuICAgICAgICBsZXQgc3BhY2luZ1ggPSA4MDtcclxuICAgICAgICBsZXQgc3BhY2luZ1kgPSA3MDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCByb3dzOyByKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjb2xzOyBjKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihjYy52MihzdGFydFBvcy54ICsgYyAqIHNwYWNpbmdYLCBzdGFydFBvcy55ICsgciAqIHNwYWNpbmdZKSwgNTApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5wb3NpdGlvbiA9IGNjLnYzKHBvcyk7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gMzA7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gMzA7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5zY3JpcHQuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDbHVzdGVyQm9tYlRlc3RTZXR1cCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE92ZXJyaWRlIHBsYXllcidzIGJ1bGxldCB0eXBlIHRvIGZpcmUgY2x1c3RlciBib21ic1xyXG4gICAgICAgIGxldCBwbGF5ZXJTY3JpcHQgPSB0aGlzLl9wbGF5ZXIuc2NyaXB0O1xyXG4gICAgICAgIGlmIChwbGF5ZXJTY3JpcHQuX2NvbmZpZykge1xyXG4gICAgICAgICAgICBwbGF5ZXJTY3JpcHQuX2NvbmZpZy5CVHlwZTEgPSAxMDE7XHJcbiAgICAgICAgICAgIHBsYXllclNjcmlwdC5fY29uZmlnLkJUeXBlMiA9IDEwMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2x1c3RlckJvbWJUZXN0RW5lbWllcygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRUZXN0RWZmZWN0UHJldmlld1BvcygpIHtcclxuICAgICAgICBsZXQgYmFzZVBvcyA9IHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcilcclxuICAgICAgICAgICAgPyBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pXHJcbiAgICAgICAgICAgIDogKHRoaXMuX3BsYXllckJvcm5Qb3MgPyBjYy52Mih0aGlzLl9wbGF5ZXJCb3JuUG9zKSA6IGNjLnYyKDAsIDApKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoY2MudjIoMTgwLCA5NikpLCAxMjApO1xyXG4gICAgfVxyXG5cclxuICAgIF9wcmVsb2FkUmlwcGxlRGlzdG9ydGlvbkVmZmVjdCgpIHtcclxuICAgICAgICBpZiAoY2MuZHluYW1pY0F0bGFzTWFuYWdlcikge1xyXG4gICAgICAgICAgICBjYy5keW5hbWljQXRsYXNNYW5hZ2VyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJzaGFkZXIvcmlwcGxlLWRpc3RvcnRpb25cIiwgY2MuRWZmZWN0QXNzZXQsIChlcnIsIGVmZmVjdEFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImxvYWQgcmlwcGxlIGRpc3RvcnRpb24gZWZmZWN0IGZhaWxlZFwiLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JpcHBsZURpc3RvcnRpb25FZmZlY3QgPSBlZmZlY3RBc3NldDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveVJpcHBsZUNhcHR1cmVSZXNvdXJjZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JpcHBsZUNhcHR1cmVDYW1lcmEpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYS50YXJnZXRUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3JpcHBsZUNhcHR1cmVDYW1lcmFOb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYU5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JpcHBsZUNhcHR1cmVDYW1lcmFOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYU5vZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRSaXBwbGVDYXB0dXJlQ2FtZXJhKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhICYmIGNjLmlzVmFsaWQodGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYS5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBpZiAoIXBhcmVudE5vZGUgfHwgIWNjLmlzVmFsaWQocGFyZW50Tm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FtZXJhTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3JpcHBsZUNhcHR1cmVDYW1lcmFcIik7XHJcbiAgICAgICAgY2FtZXJhTm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIGNhbWVyYU5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgY2FtZXJhTm9kZS56SW5kZXggPSAtOTk5OTtcclxuICAgICAgICBsZXQgY2FtZXJhID0gY2FtZXJhTm9kZS5hZGRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgICBjYW1lcmEuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgY2FtZXJhLm9ydGhvID0gdHJ1ZTtcclxuICAgICAgICBjYW1lcmEuYWxpZ25XaXRoU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICBjYW1lcmEuZGVwdGggPSAtOTk5O1xyXG4gICAgICAgIGNhbWVyYS5jdWxsaW5nTWFzayA9IDB4ZmZmZmZmZmY7XHJcbiAgICAgICAgY2FtZXJhLmJhY2tncm91bmRDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDApO1xyXG4gICAgICAgIGNhbWVyYS5jbGVhckZsYWdzID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYU5vZGUgPSBjYW1lcmFOb2RlO1xyXG4gICAgICAgIHRoaXMuX3JpcHBsZUNhcHR1cmVDYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgcmV0dXJuIGNhbWVyYTtcclxuICAgIH1cclxuXHJcbiAgICBfY2FwdHVyZVJpcHBsZVNjcmVlbkZyYW1lKCkge1xyXG4gICAgICAgIGxldCBjYW1lcmEgPSB0aGlzLl9nZXRSaXBwbGVDYXB0dXJlQ2FtZXJhKCk7XHJcbiAgICAgICAgaWYgKCFjYW1lcmEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmlld3BvcnRTaXplID0gdGhpcy5fZ2V0Vmlld3BvcnRTaXplKCk7XHJcbiAgICAgICAgbGV0IHJlbmRlclRleHR1cmUgPSBuZXcgY2MuUmVuZGVyVGV4dHVyZSgpO1xyXG4gICAgICAgIGxldCBnbCA9IChjYy5nYW1lIGFzIGFueSkuX3JlbmRlckNvbnRleHQ7XHJcbiAgICAgICAgaWYgKCFnbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyVGV4dHVyZS5pbml0V2l0aFNpemUoTWF0aC5jZWlsKHZpZXdwb3J0U2l6ZS53aWR0aCksIE1hdGguY2VpbCh2aWV3cG9ydFNpemUuaGVpZ2h0KSwgZ2wuU1RFTkNJTF9JTkRFWDgpO1xyXG4gICAgICAgIGNhbWVyYS50YXJnZXRUZXh0dXJlID0gcmVuZGVyVGV4dHVyZTtcclxuICAgICAgICBjYW1lcmEucmVuZGVyKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkpO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoKTtcclxuICAgICAgICBzcHJpdGVGcmFtZS5zZXRUZXh0dXJlKHJlbmRlclRleHR1cmUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNwcml0ZUZyYW1lOiBzcHJpdGVGcmFtZSxcclxuICAgICAgICAgICAgcmVuZGVyVGV4dHVyZTogcmVuZGVyVGV4dHVyZSxcclxuICAgICAgICAgICAgdmlld3BvcnRTaXplOiB2aWV3cG9ydFNpemUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0UmlwcGxlQ2VudGVyVXYob3ZlcmxheU5vZGUsIHdvcmxkUG9zLCB2aWV3cG9ydFNpemUpIHtcclxuICAgICAgICBpZiAoIW92ZXJsYXlOb2RlIHx8ICFjYy5pc1ZhbGlkKG92ZXJsYXlOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudjIoMC41LCAwLjUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxvY2FsUG9zID0gb3ZlcmxheU5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIGxldCBub3JtYWxpemVkWCA9IChsb2NhbFBvcy54ICsgdmlld3BvcnRTaXplLndpZHRoICogMC41KSAvIE1hdGgubWF4KDEsIHZpZXdwb3J0U2l6ZS53aWR0aCk7XHJcbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRZID0gKGxvY2FsUG9zLnkgKyB2aWV3cG9ydFNpemUuaGVpZ2h0ICogMC41KSAvIE1hdGgubWF4KDEsIHZpZXdwb3J0U2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiBjYy52MihcclxuICAgICAgICAgICAgY2MubWlzYy5jbGFtcGYobm9ybWFsaXplZFgsIDAsIDEpLFxyXG4gICAgICAgICAgICBjYy5taXNjLmNsYW1wZigxIC0gbm9ybWFsaXplZFksIDAsIDEpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25EaXN0b3J0aW9uUmlwcGxlQXQocG9zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9yaXBwbGVEaXN0b3J0aW9uRWZmZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZWxvYWRSaXBwbGVEaXN0b3J0aW9uRWZmZWN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYXB0dXJlID0gdGhpcy5fY2FwdHVyZVJpcHBsZVNjcmVlbkZyYW1lKCk7XHJcbiAgICAgICAgaWYgKCFjYXB0dXJlIHx8ICFjYXB0dXJlLnNwcml0ZUZyYW1lIHx8ICFjYXB0dXJlLnJlbmRlclRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcmVlblBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKCFzY3JlZW5QYXJlbnQgfHwgIWNjLmlzVmFsaWQoc2NyZWVuUGFyZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3ZlcmxheSA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbkRpc3RvcnRpb25SaXBwbGVcIik7XHJcbiAgICAgICAgb3ZlcmxheS5wYXJlbnQgPSBzY3JlZW5QYXJlbnQ7XHJcbiAgICAgICAgb3ZlcmxheS5zZXRDb250ZW50U2l6ZShjYXB0dXJlLnZpZXdwb3J0U2l6ZSk7XHJcbiAgICAgICAgb3ZlcmxheS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBvdmVybGF5LnpJbmRleCA9IDE1MDA7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGUgPSBvdmVybGF5LmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IGNhcHR1cmUuc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gY2MuTWF0ZXJpYWwuY3JlYXRlKHRoaXMuX3JpcHBsZURpc3RvcnRpb25FZmZlY3QsIDApO1xyXG4gICAgICAgIG1hdGVyaWFsLmRlZmluZShcIlVTRV9URVhUVVJFXCIsIHRydWUsIDApO1xyXG4gICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwidGV4dHVyZVwiLCBjYXB0dXJlLnJlbmRlclRleHR1cmUpO1xyXG5cclxuICAgICAgICBsZXQgbWF0ZXJpYWxWYXJpYW50ID0gY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZShtYXRlcmlhbCwgc3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2V0TWF0ZXJpYWwoMCwgbWF0ZXJpYWxWYXJpYW50KTtcclxuXHJcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52Mihwb3MpKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5fZ2V0UmlwcGxlQ2VudGVyVXYob3ZlcmxheSwgd29ybGRQb3MsIGNhcHR1cmUudmlld3BvcnRTaXplKTtcclxuXHJcbiAgICAgICAgbGV0IHJpcHBsZSA9IG92ZXJsYXkuYWRkQ29tcG9uZW50KFJpcHBsZVNob2Nrd2F2ZSk7XHJcbiAgICAgICAgcmlwcGxlLmluaXQoXHJcbiAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgIHNwcml0ZSxcclxuICAgICAgICAgICAgbWF0ZXJpYWxWYXJpYW50LFxyXG4gICAgICAgICAgICBjZW50ZXIsXHJcbiAgICAgICAgICAgIGNhcHR1cmUudmlld3BvcnRTaXplLFxyXG4gICAgICAgICAgICBjYXB0dXJlLnNwcml0ZUZyYW1lLFxyXG4gICAgICAgICAgICBjYXB0dXJlLnJlbmRlclRleHR1cmUsXHJcbiAgICAgICAgICAgIDAuMzRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlLaWxsRXhwbG9zaW9uRWZmZWN0QXQocG9zKSB7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25EaXN0b3J0aW9uUmlwcGxlQXQocG9zKTtcclxuICAgICAgICB0aGlzLl9zcGF3bkV4cGxvc2lvblN0YXJidXJzdEF0KHBvcyk7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25FeHBsb3Npb25HbG93QXQocG9zLCAwLjM2KTtcclxuICAgICAgICB0aGlzLl9zcGF3bkV4cGxvc2lvbkNvcmVCdXJzdEF0KHBvcywgMC4yMik7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25UcmFuc3BhcmVudFNob2Nrd2F2ZUF0KHBvcywgNzYsIDM4MCwgMCwgMC4zNCwgMTgwLCAxMCk7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25UcmFuc3BhcmVudFNob2Nrd2F2ZUF0KHBvcywgMzgsIDIyMCwgMC4wNCwgMC4yNCwgMTM1LCA2KTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJvb21cIik7XHJcbiAgICAgICAgdGhpcy5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkV4cGxvc2lvblN0YXJidXJzdEF0KHBvcykge1xyXG4gICAgICAgIGxldCBidXJzdCA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvblN0YXJidXJzdFwiKTtcclxuICAgICAgICBidXJzdC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgYnVyc3Quc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYnVyc3QuekluZGV4ID0gNjA1NTtcclxuICAgICAgICBidXJzdC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGJ1cnN0LnNjYWxlID0gMC40NTtcclxuXHJcbiAgICAgICAgbGV0IHJheUNvbmZpZ3MgPSBbXHJcbiAgICAgICAgICAgIHthbmdsZTogMCwgbGVuZ3RoOiAxNzAsIHdpZHRoOiAxOCwgYWxwaGE6IDE2MH0sXHJcbiAgICAgICAgICAgIHthbmdsZTogNDUsIGxlbmd0aDogMTQwLCB3aWR0aDogMTQsIGFscGhhOiAxNTB9LFxyXG4gICAgICAgICAgICB7YW5nbGU6IDkwLCBsZW5ndGg6IDE3NSwgd2lkdGg6IDE4LCBhbHBoYTogMTY1fSxcclxuICAgICAgICAgICAge2FuZ2xlOiAxMzUsIGxlbmd0aDogMTQyLCB3aWR0aDogMTQsIGFscGhhOiAxNTB9LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXlDb25maWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSByYXlDb25maWdzW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmF5ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uUmF5XCIgKyBpKTtcclxuICAgICAgICAgICAgcmF5LnBhcmVudCA9IGJ1cnN0O1xyXG4gICAgICAgICAgICByYXkuYW5nbGUgPSBjb25maWcuYW5nbGU7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSByYXkuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgY29uZmlnLmFscGhhKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKDAsIGNvbmZpZy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oLWNvbmZpZy53aWR0aCwgY29uZmlnLmxlbmd0aCAqIDAuMjQpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oMCwgMTIpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oY29uZmlnLndpZHRoLCBjb25maWcubGVuZ3RoICogMC4yNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBob3RDcm9zcyA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbkhvdENyb3NzXCIpO1xyXG4gICAgICAgIGhvdENyb3NzLnBhcmVudCA9IGJ1cnN0O1xyXG4gICAgICAgIGxldCBjcm9zc0dyYXBoaWNzID0gaG90Q3Jvc3MuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjcm9zc0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQwLCAxODAsIDE1MCk7XHJcbiAgICAgICAgY3Jvc3NHcmFwaGljcy5yZWN0KC0xMTIsIC01LCAyMjQsIDEwKTtcclxuICAgICAgICBjcm9zc0dyYXBoaWNzLnJlY3QoLTUsIC0xMTIsIDEwLCAyMjQpO1xyXG4gICAgICAgIGNyb3NzR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBidXJzdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA4LCAxLjA4KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjA4LCAyMjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjE2LCAxLjU1KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xNilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduRXhwbG9zaW9uR2xvd0F0KHBvcywgc3RyZW5ndGggPSAwLjMpIHtcclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbkdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZ2xvdy5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBnbG93LnpJbmRleCA9IDYwNTA7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC4zNTtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQ4LCAyMjAsIE1hdGguZmxvb3IoMTI1ICogc3RyZW5ndGgpKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTA4KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyMTAsIDEyMCwgTWF0aC5mbG9vcig5NSAqIHN0cmVuZ3RoKSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDcwKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjA0LCAyMTApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA0LCAxKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xOCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuNTIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkV4cGxvc2lvbkNvcmVCdXJzdEF0KHBvcywgZHVyYXRpb24gPSAwLjI4KSB7XHJcbiAgICAgICAgbGV0IGNvcmUgPSBuZXcgY2MuTm9kZShcIl9leHBsb3Npb25Db3JlQnVyc3RcIik7XHJcbiAgICAgICAgY29yZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgY29yZS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBjb3JlLnpJbmRleCA9IDYwNjA7XHJcbiAgICAgICAgY29yZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGNvcmUuc2NhbGUgPSAwLjI7XHJcblxyXG4gICAgICAgIGxldCBvdXRlciA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbk91dGVyQ29yZVwiKTtcclxuICAgICAgICBvdXRlci5wYXJlbnQgPSBjb3JlO1xyXG4gICAgICAgIGxldCBvdXRlckdyYXBoaWNzID0gb3V0ZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQ0LCAxOTYsIDE3MCk7XHJcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgNzYpO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgaW5uZXIgPSBuZXcgY2MuTm9kZShcIl9leHBsb3Npb25Jbm5lckNvcmVcIik7XHJcbiAgICAgICAgaW5uZXIucGFyZW50ID0gY29yZTtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNDApO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDM0KTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgY29yZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbiAqIDAuNDIsIDEuMTYpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKGR1cmF0aW9uICogMC40MiwgMjU1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24gKiAwLjU4LCAxLjg1KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoZHVyYXRpb24gKiAwLjU4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25UcmFuc3BhcmVudFNob2Nrd2F2ZUF0KHBvcywgc3RhcnRSYWRpdXMgPSA3MiwgZW5kUmFkaXVzID0gMzQwLCBkZWxheSA9IDAsIGR1cmF0aW9uID0gMC40MiwgYWxwaGEgPSAxNzAsIGxpbmVXaWR0aCA9IDgpIHtcclxuICAgICAgICBsZXQgd2F2ZSA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvblNob2Nrd2F2ZVwiKTtcclxuICAgICAgICB3YXZlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICB3YXZlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIHdhdmUuekluZGV4ID0gNjA1ODtcclxuICAgICAgICB3YXZlLm9wYWNpdHkgPSBhbHBoYTtcclxuICAgICAgICB3YXZlLnNjYWxlID0gMTtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gd2F2ZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIGFscGhhKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgc3RhcnRSYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgZW5kU2NhbGUgPSBzdGFydFJhZGl1cyA+IDAgPyBlbmRSYWRpdXMgLyBzdGFydFJhZGl1cyA6IDE7XHJcbiAgICAgICAgbGV0IHBsYXlBY3Rpb24gPSBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uLCBlbmRTY2FsZSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KGR1cmF0aW9uKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHdhdmUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkZWxheSksIHBsYXlBY3Rpb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgd2F2ZS5ydW5BY3Rpb24ocGxheUFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5V2hpdGVTY3JlZW5GbGFzaChtYXhPcGFjaXR5ID0gMTgwLCBmYWRlSW4gPSAwLjA0LCBmYWRlT3V0ID0gMC4yKSB7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50Tm9kZSB8fCAhY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpO1xyXG4gICAgICAgIGxldCBmbGFzaCA9IG5ldyBjYy5Ob2RlKFwiX3NjcmVlbkZsYXNoV2hpdGVcIik7XHJcbiAgICAgICAgZmxhc2gucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICBmbGFzaC5zZXRDb250ZW50U2l6ZShzaXplKTtcclxuICAgICAgICBmbGFzaC5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBmbGFzaC56SW5kZXggPSAxNzAwO1xyXG4gICAgICAgIGZsYXNoLm9wYWNpdHkgPSAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmbGFzaC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MucmVjdCgtc2l6ZS53aWR0aCAvIDIsIC1zaXplLmhlaWdodCAvIDIsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGZsYXNoLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZVRvKGZhZGVJbiwgbWF4T3BhY2l0eSksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoZmFkZU91dCksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTY3JlZW5PdmVybGF5Um9vdCgpIHtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKHBhcmVudE5vZGUgJiYgY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLmdldEN1cnJlbnRTY2VuZUNhbnZhcygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9lbnN1cmVLaWxsQnJvYWRjYXN0TGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5fZ2V0U2NyZWVuT3ZlcmxheVJvb3QoKTtcclxuICAgICAgICBpZiAoIXJvb3QgfHwgIWNjLmlzVmFsaWQocm9vdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgY2MuTm9kZShcIl9raWxsQnJvYWRjYXN0TGF5ZXJcIik7XHJcbiAgICAgICAgbGF5ZXIucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBsYXllci5zZXRDb250ZW50U2l6ZSh0aGlzLl9nZXRWaWV3cG9ydFNpemUoKSk7XHJcbiAgICAgICAgbGF5ZXIuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgbGF5ZXIuekluZGV4ID0gMTg1MDtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0TGF5ZXIgPSBsYXllcjtcclxuICAgICAgICByZXR1cm4gbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZUtpbGxCYWRnZUxheWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VMYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX2tpbGxCYWRnZUxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fa2lsbEJhZGdlTGF5ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMuX2dldFNjcmVlbk92ZXJsYXlSb290KCk7XHJcbiAgICAgICAgaWYgKCFyb290IHx8ICFjYy5pc1ZhbGlkKHJvb3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxheWVyID0gbmV3IGNjLk5vZGUoXCJfa2lsbEJhZGdlTGF5ZXJcIik7XHJcbiAgICAgICAgbGF5ZXIucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBsYXllci5zZXRDb250ZW50U2l6ZSh0aGlzLl9nZXRWaWV3cG9ydFNpemUoKSk7XHJcbiAgICAgICAgbGF5ZXIuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgbGF5ZXIuekluZGV4ID0gMTg2MDtcclxuICAgICAgICB0aGlzLl9raWxsQmFkZ2VMYXllciA9IGxheWVyO1xyXG4gICAgICAgIHJldHVybiBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUtpbGxCcm9hZGNhc3RVaSgpIHtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQnJvYWRjYXN0TGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9raWxsQnJvYWRjYXN0TGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllci5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllciA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2Rlc3Ryb3lLaWxsQmFkZ2VVaSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fa2lsbEJhZGdlTGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9raWxsQmFkZ2VMYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbEJhZGdlTGF5ZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9raWxsQmFkZ2VMYXllciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKSB7XHJcbiAgICAgICAgdGhpcy5fa2lsbFN0cmVha0NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9raWxsU3RyZWFrUmVtYWluID0gMDtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lsbEJyb2FkY2FzdFVpKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpbGxCYWRnZVVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZWxvYWRLaWxsQnJvYWRjYXN0QmFkZ2VGcmFtZXMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRLaWxsQmFkZ2VGcmFtZShpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRLaWxsQmFkZ2VGcmFtZShzdHJlYWssIGNhbGxiYWNrID0gbnVsbCkge1xyXG4gICAgICAgIGxldCB1dWlkID0gS0lMTF9CQURHRV9GUkFNRV9VVUlEU1tzdHJlYWtdO1xyXG4gICAgICAgIGlmICghdXVpZCB8fCAhY2MuYXNzZXRNYW5hZ2VyIHx8ICFjYy5hc3NldE1hbmFnZXIubG9hZEFueSkge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VGcmFtZXNbc3RyZWFrXSkge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX2tpbGxCYWRnZUZyYW1lc1tzdHJlYWtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fa2lsbEJhZGdlTG9hZGluZ1tzdHJlYWtdKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fa2lsbEJhZGdlTG9hZGluZ1tzdHJlYWtdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2tpbGxCYWRnZUxvYWRpbmdbc3RyZWFrXSA9IGNhbGxiYWNrID8gW2NhbGxiYWNrXSA6IFtdO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHt1dWlkOiB1dWlkfSwgKGVyciwgYXNzZXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKCFlcnIgJiYgYXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUZyYW1lID0gYXNzZXQgaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IGFzc2V0IDogYXNzZXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VGcmFtZXNbc3RyZWFrXSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLl9raWxsQmFkZ2VMb2FkaW5nW3N0cmVha10gfHwgW107XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9raWxsQmFkZ2VMb2FkaW5nW3N0cmVha107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0oc3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZWxvYWRPaWxTcGlsbEZyYW1lKCkge1xyXG4gICAgICAgIGlmICghT0lMX1NQSUxMX0ZSQU1FX1VVSUQgfHwgIWNjLmFzc2V0TWFuYWdlciB8fCAhY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2FkT2lsU3BpbGxGcmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkT2lsU3BpbGxGcmFtZShjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fb2lsU3BpbGxGcmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX29pbFNwaWxsRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9vaWxTcGlsbEZyYW1lQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fb2lsU3BpbGxGcmFtZUxvYWRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb2lsU3BpbGxGcmFtZUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHt1dWlkOiBPSUxfU1BJTExfRlJBTUVfVVVJRH0sIChlcnIsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNwaWxsRnJhbWVMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghZXJyICYmIGFzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vaWxTcGlsbEZyYW1lID0gYXNzZXQgaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IGFzc2V0IDogYXNzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX29pbFNwaWxsRnJhbWVDYWxsYmFja3Muc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxGcmFtZUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldKHRoaXMuX29pbFNwaWxsRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZWxvYWRDb3ZlclRlc3RGcmFtZSgpIHtcclxuICAgICAgICBpZiAoIUNPVkVSX1RFU1RfRlJBTUVfVVVJRCB8fCAhY2MuYXNzZXRNYW5hZ2VyIHx8ICFjYy5hc3NldE1hbmFnZXIubG9hZEFueSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWRDb3ZlclRlc3RGcmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkQ292ZXJUZXN0RnJhbWUoY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvdmVyVGVzdEZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fY292ZXJUZXN0RnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9jb3ZlclRlc3RGcmFtZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvdmVyVGVzdEZyYW1lTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RGcmFtZUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHt1dWlkOiBDT1ZFUl9URVNUX0ZSQU1FX1VVSUR9LCAoZXJyLCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb3ZlclRlc3RGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFlcnIgJiYgYXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lID0gYXNzZXQgaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IGFzc2V0IDogYXNzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2NvdmVyVGVzdEZyYW1lQ2FsbGJhY2tzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0odGhpcy5fY292ZXJUZXN0RnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZWxvYWRFbmVyZ3lFZ2dGcmFtZSgpIHtcclxuICAgICAgICBpZiAoIUVORVJHWV9FR0dfRlJBTUVfVVVJRCB8fCAhY2MuYXNzZXRNYW5hZ2VyIHx8ICFjYy5hc3NldE1hbmFnZXIubG9hZEFueSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWRFbmVyZ3lFZ2dGcmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkRW5lcmd5RWdnRnJhbWUoY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUVnZ0ZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fZW5lcmd5RWdnRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dGcmFtZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUVnZ0ZyYW1lTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dGcmFtZUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHt1dWlkOiBFTkVSR1lfRUdHX0ZSQU1FX1VVSUR9LCAoZXJyLCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFlcnIgJiYgYXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lID0gYXNzZXQgaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IGFzc2V0IDogYXNzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2VuZXJneUVnZ0ZyYW1lQ2FsbGJhY2tzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0odGhpcy5fZW5lcmd5RWdnRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZWxvYWRFbmVyZ3lFZ2dCdXNoRnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKCFUUkVFX0dSRUVOX0xBUkdFX0ZSQU1FX1VVSUQgfHwgIWNjLmFzc2V0TWFuYWdlciB8fCAhY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2FkRW5lcmd5RWdnQnVzaEZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRFbmVyZ3lFZ2dCdXNoRnJhbWUoY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZUxvYWRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IFRSRUVfR1JFRU5fTEFSR0VfRlJBTUVfVVVJRH0sIChlcnIsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFlcnIgJiYgYXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZSA9IGFzc2V0IGluc3RhbmNlb2YgY2MuU3ByaXRlRnJhbWUgPyBhc3NldCA6IGFzc2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLl9lbmVyZ3lFZ2dCdXNoRnJhbWVDYWxsYmFja3Muc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0odGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRLaWxsQmFkZ2VDb2xvcihzdHJlYWspIHtcclxuICAgICAgICBsZXQgY29sb3IgPSBLSUxMX0JBREdFX1RJTlRTW3N0cmVha10gfHwgS0lMTF9CQURHRV9USU5UU1sxXTtcclxuICAgICAgICByZXR1cm4gY2MuY29sb3IoY29sb3JbMF0sIGNvbG9yWzFdLCBjb2xvclsyXSwgMjU1KTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlS2lsbEJyb2FkY2FzdEVudHJ5KHRleHQpIHtcclxuICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9lbnN1cmVLaWxsQnJvYWRjYXN0TGF5ZXIoKTtcclxuICAgICAgICBpZiAoIWxheWVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVudHJ5ID0gbmV3IGNjLk5vZGUoXCJfa2lsbEJyb2FkY2FzdEVudHJ5XCIpO1xyXG4gICAgICAgIGVudHJ5LnBhcmVudCA9IGxheWVyO1xyXG4gICAgICAgIGVudHJ5LnNldENvbnRlbnRTaXplKDQzOCwgNTYpO1xyXG4gICAgICAgIGVudHJ5Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGVudHJ5W1wiX2V4cGlyZUF0XCJdID0gRGF0ZS5ub3coKSArIE1hdGguZmxvb3IoS0lMTF9CUk9BRENBU1RfRFVSQVRJT04gKiAxMDAwKTtcclxuICAgICAgICBlbnRyeVtcIl9pc0V4aXRpbmdcIl0gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGJnID0gZW50cnkuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiZy5maWxsQ29sb3IgPSBjYy5jb2xvcigxNiwgMjAsIDI4LCAyMjApO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtMjE5LCAtMjgsIDQzOCwgNTYsIDE2KTtcclxuICAgICAgICBiZy5maWxsKCk7XHJcbiAgICAgICAgYmcuc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDE4NiwgODIsIDIyMCk7XHJcbiAgICAgICAgYmcubGluZVdpZHRoID0gMjtcclxuICAgICAgICBiZy5yb3VuZFJlY3QoLTIxOSwgLTI4LCA0MzgsIDU2LCAxNik7XHJcbiAgICAgICAgYmcuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCB0YWdOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJCcm9hZGNhc3RUYWdcIik7XHJcbiAgICAgICAgdGFnTm9kZS5wYXJlbnQgPSBlbnRyeTtcclxuICAgICAgICB0YWdOb2RlLnNldENvbnRlbnRTaXplKDEwMCwgNDApO1xyXG4gICAgICAgIHRhZ05vZGUuc2V0UG9zaXRpb24oLTE2MCwgMCk7XHJcbiAgICAgICAgbGV0IHRhZ0xhYmVsID0gdGFnTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRhZ0xhYmVsLnN0cmluZyA9IFwi5oi/6Ze05bm/5pKtXCI7XHJcbiAgICAgICAgdGFnTGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICB0YWdMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgdGFnTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0YWdMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgdGFnTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjE0LCAxMjIsIDI1NSk7XHJcblxyXG4gICAgICAgIGxldCBzcGxpdCA9IG5ldyBjYy5Ob2RlKFwiX2Jyb2FkY2FzdFNwbGl0XCIpO1xyXG4gICAgICAgIHNwbGl0LnBhcmVudCA9IGVudHJ5O1xyXG4gICAgICAgIHNwbGl0LnNldFBvc2l0aW9uKC05OCwgMCk7XHJcbiAgICAgICAgbGV0IHNwbGl0R3JhcGhpY3MgPSBzcGxpdC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHNwbGl0R3JhcGhpY3MubGluZVdpZHRoID0gMjtcclxuICAgICAgICBzcGxpdEdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgNjApO1xyXG4gICAgICAgIHNwbGl0R3JhcGhpY3MubW92ZVRvKDAsIC0xNik7XHJcbiAgICAgICAgc3BsaXRHcmFwaGljcy5saW5lVG8oMCwgMTYpO1xyXG4gICAgICAgIHNwbGl0R3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9sYkJyb2FkY2FzdFRleHRcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGVudHJ5O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgyMzYsIDQwKTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24oNjQsIDApO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyNDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjg7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgcmV0dXJuIGVudHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIF9sYXlvdXRLaWxsQnJvYWRjYXN0RW50cmllcyhmYXN0ID0gZmFsc2UsIG5ld0VudHJ5ID0gbnVsbCkge1xyXG4gICAgICAgIGxldCBsYXllciA9IHRoaXMuX2Vuc3VyZUtpbGxCcm9hZGNhc3RMYXllcigpO1xyXG4gICAgICAgIGlmICghbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9nZXRWaWV3cG9ydFNpemUoKTtcclxuICAgICAgICBsYXllci5zZXRDb250ZW50U2l6ZShzaXplKTtcclxuICAgICAgICBsZXQgdG9wWSA9IE1hdGgubWluKHNpemUuaGVpZ2h0IC8gMiAtIDEyMCwgKHl5cC5zYWZlVG9wQm90dG9tIHx8IHNpemUuaGVpZ2h0IC8gMikgLSA5Nik7XHJcbiAgICAgICAgbGV0IHJpZ2h0WCA9IHNpemUud2lkdGggLyAyIC0gMjQ2O1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGZhc3QgPyAwLjEyIDogMC4yO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoZW50cnkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLmxlbmd0aCAtIDEgLSBpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0WCA9IHJpZ2h0WDtcclxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSB0b3BZIC0gc2xvdCAqIEtJTExfQlJPQURDQVNUX1NMT1RfSEVJR0hUO1xyXG4gICAgICAgICAgICBlbnRyeS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBpZiAoZW50cnkgPT0gbmV3RW50cnkpIHtcclxuICAgICAgICAgICAgICAgIGVudHJ5LnNldFBvc2l0aW9uKHRhcmdldFggKyAyNCwgdGFyZ2V0WSAtIDE4KTtcclxuICAgICAgICAgICAgICAgIGVudHJ5LnJ1bkFjdGlvbihjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24sIHRhcmdldFgsIHRhcmdldFkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhkdXJhdGlvbiwgMjU1KVxyXG4gICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGVudHJ5LnJ1bkFjdGlvbihjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24sIHRhcmdldFgsIHRhcmdldFkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhkdXJhdGlvbiwgMjU1KVxyXG4gICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3JlbW92ZUtpbGxCcm9hZGNhc3RFbnRyeShlbnRyeSwgZmFzdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKCFlbnRyeSB8fCAhY2MuaXNWYWxpZChlbnRyeSkgfHwgZW50cnlbXCJfaXNFeGl0aW5nXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudHJ5W1wiX2lzRXhpdGluZ1wiXSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMuaW5kZXhPZihlbnRyeSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGZhc3QgPyAwLjEyIDogMC4xODtcclxuICAgICAgICBlbnRyeS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGVudHJ5LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoZHVyYXRpb24sIDI4LCAxOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KGR1cmF0aW9uKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRLaWxsQnJvYWRjYXN0RW50cmllcyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBfcHVzaEtpbGxCcm9hZGNhc3QodGV4dCkge1xyXG4gICAgICAgIGxldCBlbnRyeSA9IHRoaXMuX2NyZWF0ZUtpbGxCcm9hZGNhc3RFbnRyeSh0ZXh0KTtcclxuICAgICAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmYXN0RXhwaXJlQXQgPSBEYXRlLm5vdygpICsgOTAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9sZEVudHJ5ID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChvbGRFbnRyeSAmJiBjYy5pc1ZhbGlkKG9sZEVudHJ5KSAmJiAhb2xkRW50cnlbXCJfaXNFeGl0aW5nXCJdKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRFbnRyeVtcIl9leHBpcmVBdFwiXSA9IE1hdGgubWluKG9sZEVudHJ5W1wiX2V4cGlyZUF0XCJdLCBmYXN0RXhwaXJlQXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5wdXNoKGVudHJ5KTtcclxuICAgICAgICB3aGlsZSAodGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoID4gS0lMTF9CUk9BRENBU1RfTUFYX1ZJU0lCTEUpIHtcclxuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVLaWxsQnJvYWRjYXN0RW50cnkocmVtb3ZlZCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xheW91dEtpbGxCcm9hZGNhc3RFbnRyaWVzKHRydWUsIGVudHJ5KTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlS2lsbEJyb2FkY2FzdEVudHJpZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGxldCBlbnRyaWVzID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMuc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gZW50cmllc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGVudHJ5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMuaW5kZXhPZihlbnRyeSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWVudHJ5W1wiX2lzRXhpdGluZ1wiXSAmJiBub3cgPj0gZW50cnlbXCJfZXhwaXJlQXRcIl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUtpbGxCcm9hZGNhc3RFbnRyeShlbnRyeSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bktpbGxCYWRnZUxpZ2h0bmluZyhwYXJlbnROb2RlLCBjb2xvcikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsaWdodG5pbmcgPSBuZXcgY2MuTm9kZShcIl9raWxsQmFkZ2VMaWdodG5pbmdcIiArIGkpO1xyXG4gICAgICAgICAgICBsaWdodG5pbmcucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgbGlnaHRuaW5nLnNldFBvc2l0aW9uKC04MCArIGkgKiA4MCwgMTAgKyBNYXRoLnJhbmRvbSgpICogMjYpO1xyXG4gICAgICAgICAgICBsaWdodG5pbmcuYW5nbGUgPSAtMTAgKyBNYXRoLnJhbmRvbSgpICogMjA7XHJcbiAgICAgICAgICAgIGxpZ2h0bmluZy5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGdyYXBoaWNzID0gbGlnaHRuaW5nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgMjM1KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKC04LCA0Mik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygxMiwgMTApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oLTIsIDEwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDE0LCAtMzApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICAgICAgbGlnaHRuaW5nLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjA0LCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMDggKyBpICogMC4wMyksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTIpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0tpbGxCYWRnZVN0YW1wKHN0cmVhaykge1xyXG4gICAgICAgIGxldCBsYXllciA9IHRoaXMuX2Vuc3VyZUtpbGxCYWRnZUxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFsYXllcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX2tpbGxCYWRnZUFjdGl2ZU5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2tpbGxCYWRnZUFjdGl2ZU5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDgsIDEuMSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjA4KVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYWRnZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCYWRnZVN0YW1wXCIpO1xyXG4gICAgICAgIGJhZGdlLnBhcmVudCA9IGxheWVyO1xyXG4gICAgICAgIGJhZGdlLnNldFBvc2l0aW9uKDAsIDEyKTtcclxuICAgICAgICBiYWRnZS56SW5kZXggPSAxO1xyXG4gICAgICAgIGJhZGdlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJhZGdlLnNjYWxlID0gMS40MjtcclxuICAgICAgICBiYWRnZS5hbmdsZSA9IC0xMjtcclxuICAgICAgICB0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlID0gYmFkZ2U7XHJcblxyXG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuX2dldEtpbGxCYWRnZUNvbG9yKHN0cmVhayk7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfa2lsbEJhZGdlR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE4MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44O1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIHN0cmVhayA+PSA1ID8gODggOiA1Nik7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMjgpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMTQ1KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDExNCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgZmxhc2ggPSBuZXcgY2MuTm9kZShcIl9raWxsQmFkZ2VGbGFzaFwiKTtcclxuICAgICAgICBmbGFzaC5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBmbGFzaC5vcGFjaXR5ID0gMTgwO1xyXG4gICAgICAgIGxldCBmbGFzaEdyYXBoaWNzID0gZmxhc2guYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBmbGFzaEdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDk1KTtcclxuICAgICAgICBmbGFzaEdyYXBoaWNzLnJlY3QoLTE1MCwgLTEyLCAzMDAsIDI0KTtcclxuICAgICAgICBmbGFzaEdyYXBoaWNzLnJlY3QoLTEyLCAtMTIwLCAyNCwgMjQwKTtcclxuICAgICAgICBmbGFzaEdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHNwcml0ZU5vZGUgPSBuZXcgY2MuTm9kZShcIl9raWxsQmFkZ2VTcHJpdGVcIik7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBzcHJpdGVOb2RlLnNldENvbnRlbnRTaXplKDM2MCwgMjQwKTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gc3ByaXRlTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHNwcml0ZU5vZGUuY29sb3IgPSBjb2xvcjtcclxuXHJcbiAgICAgICAgaWYgKHN0cmVhayA+PSA1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwYXduS2lsbEJhZGdlTGlnaHRuaW5nKGJhZGdlLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb2FkS2lsbEJhZGdlRnJhbWUoc3RyZWFrLCAoc3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwcml0ZSAmJiBjYy5pc1ZhbGlkKHNwcml0ZSkgJiYgc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGJhZGdlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4wOCwgMjU1KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMC45MiksXHJcbiAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbygwLjA4LCAtMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTQsIDEuMDMpLFxyXG4gICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4xNCwgMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNTIpLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yNCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjQsIDEuMTIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlID09IGJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVjb3JkS2lsbFN0cmVhaygpIHtcclxuICAgICAgICBpZiAodGhpcy5fa2lsbFN0cmVha1JlbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbFN0cmVha0NvdW50ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2tpbGxTdHJlYWtDb3VudCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2tpbGxTdHJlYWtDb3VudCA9IE1hdGgubWluKDUsIHRoaXMuX2tpbGxTdHJlYWtDb3VudCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbFN0cmVha1JlbWFpbiA9IEtJTExfU1RSRUFLX1dJTkRPVztcclxuICAgICAgICByZXR1cm4gdGhpcy5fa2lsbFN0cmVha0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5pWM5Lq6XHJcbiAgICBkZWxldGVFbmVteShkZWxFbmVteSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgaWYgKGVuZW15ID09IGRlbEVuZW15KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlIHx8IHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCArPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6TWF0aC5tYXgoMCwgdGhpcy5fbWF4RW5lbXlDb3VudCAtIHRoaXMuX2RlYXRoRW5lbXlDb3VudCl9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNraWxsSWNvbihkZWxFbmVteS5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ICs9MTtcclxuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6dGhpcy5fbWF4RW5lbXlDb3VudCAtIHRoaXMuX2RlYXRoRW5lbXlDb3VudH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pWM5Lq65pWw6YePXHJcbiAgICBlbmVteUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmVteXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5oqA6IO9aWNvblxyXG4gICAgY3JlYXRlU2tpbGxJY29uKHBvcykge1xyXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wNikge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGwgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNraWxsUHJlZmFiKTtcclxuICAgICAgICAgICAgc2tpbGwucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgICAgICBza2lsbC5wb3NpdGlvbiA9IHBvcztcclxuICAgICAgICAgICAgc2tpbGwuc2NyaXB0LnNldEluR2FtZSgpO1xyXG4gICAgICAgICAgICBza2lsbC56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHNraWxsLnkpO1xyXG4gICAgICAgICAgICB0aGlzLl9za2lsbHMucHVzaChza2lsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRFbmVyZ3lDb25maWcoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBsZXQgY29uZmlnID0geXlwLmNvbmZpZy5FbmVyZ3kgfHwge307XHJcbiAgICAgICAgbGV0IHZhbHVlID0gY29uZmlnW2tleV07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+maj+acuueUn+aIkOS4gOS4quiDvemHj1xyXG4gICAgY3JlYXRlRW5lcmd5KCkge1xyXG4gICAgICAgIGxldCB0aWxlID0gdGhpcy5fZ2V0UmFuZG9tUGFzc2FibGVUaWxlKCk7XHJcbiAgICAgICAgaWYgKHRpbGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5lbmVyZ3lQcmVmYWIgPyBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZXJneVByZWZhYikgOiB0aGlzLl9jcmVhdGVEZWZhdWx0RW5lcmd5KCk7XHJcbiAgICAgICAgZW5lcmd5LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVyZ3kucG9zaXRpb24gPSBjYy52Myh0aGlzLnRpbGVUb0dhbWVQb3ModGlsZSkpO1xyXG4gICAgICAgIGVuZXJneS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZXJneS55KTtcclxuXHJcbiAgICAgICAgbGV0IGVuZXJneVNjcmlwdCA9IGVuZXJneS5nZXRDb21wb25lbnQoRW5lcmd5SXRlbSkgfHwgZW5lcmd5LmFkZENvbXBvbmVudChFbmVyZ3lJdGVtKTtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJWYWx1ZVwiLCAxMCk7XHJcbiAgICAgICAgbGV0IGxpZmVUaW1lID0gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiTGlmZVRpbWVcIiwgMTIpO1xyXG4gICAgICAgIGVuZXJneVNjcmlwdC5pbml0KHZhbHVlLCBsaWZlVGltZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneXMucHVzaChlbmVyZ3kpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUVuZXJneUF0KHBvcykge1xyXG4gICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLmVuZXJneVByZWZhYiA/IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lcmd5UHJlZmFiKSA6IHRoaXMuX2NyZWF0ZURlZmF1bHRFbmVyZ3koKTtcclxuICAgICAgICBlbmVyZ3kucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZXJneS5wb3NpdGlvbiA9IGNjLnYzKHBvcyk7XHJcbiAgICAgICAgZW5lcmd5LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lcmd5LnkpO1xyXG5cclxuICAgICAgICBsZXQgZW5lcmd5U2NyaXB0ID0gZW5lcmd5LmdldENvbXBvbmVudChFbmVyZ3lJdGVtKSB8fCBlbmVyZ3kuYWRkQ29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgIGVuZXJneVNjcmlwdC5pbml0KHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIlZhbHVlXCIsIDEwKSwgdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiTGlmZVRpbWVcIiwgMTIpKTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lzLnB1c2goZW5lcmd5KTtcclxuICAgICAgICByZXR1cm4gZW5lcmd5O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUVuZXJneUF0Rm9yTXVsdGlwbGF5ZXIoZW5lcmd5RGF0YSkge1xyXG4gICAgICAgIGlmICghZW5lcmd5RGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKGVuZXJneURhdGEueCB8fCAwLCBlbmVyZ3lEYXRhLnkgfHwgMCk7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuZW5lcmd5UHJlZmFiID8gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVyZ3lQcmVmYWIpIDogdGhpcy5fY3JlYXRlRGVmYXVsdEVuZXJneSgpO1xyXG4gICAgICAgIGVuZXJneS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lcmd5LnBvc2l0aW9uID0gY2MudjMocG9zKTtcclxuICAgICAgICBlbmVyZ3kuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVyZ3kueSk7XHJcbiAgICAgICAgZW5lcmd5W1wiX19lbmVyZ3lJZFwiXSA9IGVuZXJneURhdGEuaWQ7XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pIHx8IGVuZXJneS5hZGRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgZW5lcmd5U2NyaXB0LmluaXQoZW5lcmd5RGF0YS52YWx1ZSA9PSBudWxsID8gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiVmFsdWVcIiwgMTApIDogZW5lcmd5RGF0YS52YWx1ZSwgOTk5OTk5KTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lzLnB1c2goZW5lcmd5KTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckVuZXJneU1hcFtlbmVyZ3lEYXRhLmlkXSA9IGVuZXJneTtcclxuICAgICAgICByZXR1cm4gZW5lcmd5O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUVuZXJneUVnZ1Rlc3RTZXR1cCgpIHtcclxuICAgICAgICBsZXQgc2V0dXAgPSB0aGlzLl9nZXRFbmVyZ3lFZ2dUZXN0U2V0dXBQb3NpdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnNwYXduRW5lcmd5RWdnQnVzaChzZXR1cC5idXNoUG9zLCA5NCk7XHJcbiAgICAgICAgdGhpcy5zcGF3bkVuZXJneUVnZ0F0KHNldHVwLmVnZ1Bvcywge1xyXG4gICAgICAgICAgICBsaWZlVGltZTogMTAsXHJcbiAgICAgICAgICAgIHJhZGl1czogMzQsXHJcbiAgICAgICAgICAgIGVuZXJneUNvdW50OiAxOCxcclxuICAgICAgICAgICAgZW5lcmd5U2NhdHRlclJhZGl1czogMTM2XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNDUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93UGxheWVyQnViYmxlKFwi5oqK6IO96YeP6JuL5o6o6L+b6I2J5LibXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRFbmVyZ3lFZ2dUZXN0U2V0dXBQb3NpdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IGJhc2VQb3MgPSB0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpXHJcbiAgICAgICAgICAgID8gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICA6IGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MgfHwgY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIGxldCBkaXJzID0gW1xyXG4gICAgICAgICAgICBjYy52MigxLCAwKSxcclxuICAgICAgICAgICAgY2MudjIoMC44MiwgMC4zMiksXHJcbiAgICAgICAgICAgIGNjLnYyKDAuODIsIC0wLjMyKSxcclxuICAgICAgICAgICAgY2MudjIoMC4yLCAxKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGlyID0gZGlyc1tpXS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgbGV0IGVnZ1BvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGJhc2VQb3MuYWRkKGRpci5tdWwoMTUwKSksIDY4KTtcclxuICAgICAgICAgICAgbGV0IGJ1c2hQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihiYXNlUG9zLmFkZChkaXIubXVsKDMwMCkpLCA5Nik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDb2xsaWRlcnMoZWdnUG9zLCAzOCkubGVuZ3RoID4gMCB8fCB0aGlzLnRlc3RDb2xsaWRlcnMoYnVzaFBvcywgNTIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBlZ2dQb3M6IGVnZ1BvcyxcclxuICAgICAgICAgICAgICAgIGJ1c2hQb3M6IGJ1c2hQb3MsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlZ2dQb3M6IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGJhc2VQb3MuYWRkKGNjLnYyKDE1MCwgMCkpLCA2OCksXHJcbiAgICAgICAgICAgIGJ1c2hQb3M6IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGJhc2VQb3MuYWRkKGNjLnYyKDMwMCwgMCkpLCA5NiksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3bkVuZXJneUVnZ0J1c2gocG9zLCByYWRpdXMgPSA5NCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgY2MuTm9kZShcIl9lbmVyZ3lFZ2dCdXNoXCIpO1xyXG4gICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgcm9vdC56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHBvcy55KSArIDI7XHJcblxyXG4gICAgICAgIGxldCBzaGFkb3cgPSBuZXcgY2MuTm9kZShcIl9lbmVyZ3lFZ2dCdXNoU2hhZG93XCIpO1xyXG4gICAgICAgIHNoYWRvdy5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNoYWRvdy5zZXRQb3NpdGlvbigwLCAtMTQpO1xyXG4gICAgICAgIGxldCBzaGFkb3dHcmFwaGljcyA9IHNoYWRvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHNoYWRvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDYwKTtcclxuICAgICAgICBzaGFkb3dHcmFwaGljcy5lbGxpcHNlKDAsIDAsIHJhZGl1cyAqIDAuNjIsIHJhZGl1cyAqIDAuMjIpO1xyXG4gICAgICAgIHNoYWRvd0dyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHNwcml0ZU5vZGUgPSBuZXcgY2MuTm9kZShcIl9lbmVyZ3lFZ2dCdXNoU3ByaXRlXCIpO1xyXG4gICAgICAgIHNwcml0ZU5vZGUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBzcHJpdGVOb2RlLnNldFBvc2l0aW9uKDAsIDgpO1xyXG4gICAgICAgIHNwcml0ZU5vZGUuc2V0Q29udGVudFNpemUocmFkaXVzICogMS45NSwgcmFkaXVzICogMS45NSk7XHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IHNwcml0ZU5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcclxuICAgICAgICB0aGlzLl9sb2FkRW5lcmd5RWdnQnVzaEZyYW1lKChzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlICYmIGNjLmlzVmFsaWQoc3ByaXRlKSAmJiBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGJ1c2g6YW55ID0ge1xyXG4gICAgICAgICAgICBub2RlOiByb290LFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ0J1c2hlcy5wdXNoKGJ1c2gpO1xyXG4gICAgICAgIHJldHVybiBidXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduRW5lcmd5RWdnQXQocG9zLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgY2MuTm9kZShcIkVuZXJneUVnZ1wiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICByb290LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIHJvb3QuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChwb3MueSkgKyAxO1xyXG5cclxuICAgICAgICBsZXQgZWdnU2NyaXB0ID0gcm9vdC5hZGRDb21wb25lbnQoRW5lcmd5RWdnKTtcclxuICAgICAgICBsZXQgZWdnOmFueSA9IHtcclxuICAgICAgICAgICAgbm9kZTogcm9vdCxcclxuICAgICAgICAgICAgc2NyaXB0OiBlZ2dTY3JpcHQsXHJcbiAgICAgICAgICAgIGVnZ0lkOiBvcHRpb25zLmVnZ0lkID09IG51bGwgPyBudWxsIDogb3B0aW9ucy5lZ2dJZCxcclxuICAgICAgICAgICAgcmFkaXVzOiBvcHRpb25zLnJhZGl1cyA9PSBudWxsID8gMzQgOiBvcHRpb25zLnJhZGl1cyxcclxuICAgICAgICAgICAgZW5lcmd5Q291bnQ6IG9wdGlvbnMuZW5lcmd5Q291bnQgPT0gbnVsbCA/IDE2IDogb3B0aW9ucy5lbmVyZ3lDb3VudCxcclxuICAgICAgICAgICAgZW5lcmd5U2NhdHRlclJhZGl1czogb3B0aW9ucy5lbmVyZ3lTY2F0dGVyUmFkaXVzID09IG51bGwgPyAxMzAgOiBvcHRpb25zLmVuZXJneVNjYXR0ZXJSYWRpdXMsXHJcbiAgICAgICAgICAgIGJ1cnN0RG9uZTogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgbWF0dXJlQ2FsbGJhY2sgPSBvcHRpb25zLmhhc093blByb3BlcnR5KFwib25NYXR1cmVcIilcclxuICAgICAgICAgICAgPyBvcHRpb25zLm9uTWF0dXJlXHJcbiAgICAgICAgICAgIDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlRW5lcmd5RWdnTWF0dXJlKGVnZyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgZWdnU2NyaXB0LmluaXQoe1xyXG4gICAgICAgICAgICBsaWZlVGltZTogb3B0aW9ucy5saWZlVGltZSA9PSBudWxsID8gMTAgOiBvcHRpb25zLmxpZmVUaW1lLFxyXG4gICAgICAgICAgICByYWRpdXM6IGVnZy5yYWRpdXMsXHJcbiAgICAgICAgICAgIGF1dG9NYXR1cmU6IG9wdGlvbnMuYXV0b01hdHVyZSxcclxuICAgICAgICAgICAgb25NYXR1cmU6IG1hdHVyZUNhbGxiYWNrXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbG9hZEVuZXJneUVnZ0ZyYW1lKChzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWdnU2NyaXB0ICYmIGNjLmlzVmFsaWQoZWdnU2NyaXB0KSkge1xyXG4gICAgICAgICAgICAgICAgZWdnU2NyaXB0LnNldFNwcml0ZUZyYW1lKHNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ3MucHVzaChlZ2cpO1xyXG4gICAgICAgIHJldHVybiBlZ2c7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZU11bHRpcGxheWVyQnVyc3RFbmVyZ3kob3JpZ2luLCBlbmVyZ3lEYXRhKSB7XHJcbiAgICAgICAgaWYgKCFlbmVyZ3lEYXRhIHx8IGVuZXJneURhdGEuaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuY3JlYXRlRW5lcmd5QXRGb3JNdWx0aXBsYXllcihlbmVyZ3lEYXRhKTtcclxuICAgICAgICBpZiAoIWVuZXJneSB8fCAhY2MuaXNWYWxpZChlbmVyZ3kpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZnJvbVBvcyA9IG9yaWdpbiA/IGNjLnYyKG9yaWdpbikgOiBjYy52MihlbmVyZ3kucG9zaXRpb24pO1xyXG4gICAgICAgIGVuZXJneS5zZXRQb3NpdGlvbihjYy52Myhmcm9tUG9zKSk7XHJcbiAgICAgICAgZW5lcmd5LnNjYWxlID0gMC4xODtcclxuICAgICAgICBlbmVyZ3kucnVuQWN0aW9uKGNjLnNwYXduKFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMzIsIDEpLFxyXG4gICAgICAgICAgICBjYy5qdW1wVG8oMC4zOCwgY2MudjIoZW5lcmd5RGF0YS54LCBlbmVyZ3lEYXRhLnkpLCA0MiArIE1hdGgucmFuZG9tKCkgKiAxOCwgMSlcclxuICAgICAgICApKTtcclxuICAgICAgICByZXR1cm4gZW5lcmd5O1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bk11bHRpcGxheWVyRW5lcmd5RWdnKGVnZ0RhdGEpIHtcclxuICAgICAgICBpZiAoIWVnZ0RhdGEgfHwgZWdnRGF0YS5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXhpc3QgPSB0aGlzLl9tdWx0aXBsYXllckVuZXJneUVnZ01hcFtlZ2dEYXRhLmlkXTtcclxuICAgICAgICBpZiAoZXhpc3QgJiYgZXhpc3Qubm9kZSAmJiBjYy5pc1ZhbGlkKGV4aXN0Lm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVnZyA9IHRoaXMuc3Bhd25FbmVyZ3lFZ2dBdChjYy52MihlZ2dEYXRhLnggfHwgMCwgZWdnRGF0YS55IHx8IDApLCB7XHJcbiAgICAgICAgICAgIGVnZ0lkOiBlZ2dEYXRhLmlkLFxyXG4gICAgICAgICAgICBsaWZlVGltZTogZWdnRGF0YS5yZW1haW5UaW1lID09IG51bGwgPyAxMCA6IGVnZ0RhdGEucmVtYWluVGltZSxcclxuICAgICAgICAgICAgcmFkaXVzOiBlZ2dEYXRhLnJhZGl1cyA9PSBudWxsID8gMzQgOiBlZ2dEYXRhLnJhZGl1cyxcclxuICAgICAgICAgICAgZW5lcmd5Q291bnQ6IGVnZ0RhdGEuZW5lcmd5Q291bnQgPT0gbnVsbCA/IDE2IDogZWdnRGF0YS5lbmVyZ3lDb3VudCxcclxuICAgICAgICAgICAgZW5lcmd5U2NhdHRlclJhZGl1czogZWdnRGF0YS5lbmVyZ3lTY2F0dGVyUmFkaXVzID09IG51bGwgPyAxMzAgOiBlZ2dEYXRhLmVuZXJneVNjYXR0ZXJSYWRpdXMsXHJcbiAgICAgICAgICAgIGF1dG9NYXR1cmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBvbk1hdHVyZTogbnVsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWVnZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVnZ0RhdGEubWF0dXJlKSB7XHJcbiAgICAgICAgICAgIGVnZy5zY3JpcHQuZm9yY2VNYXR1cmUoKTtcclxuICAgICAgICAgICAgZWdnLmJ1cnN0RG9uZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwW2VnZ0RhdGEuaWRdID0gZWdnO1xyXG4gICAgICAgIHJldHVybiBlZ2c7XHJcbiAgICB9XHJcblxyXG4gICAgX21vdmVNdWx0aXBsYXllckVuZXJneUVnZyhwYXlsb2FkKSB7XHJcbiAgICAgICAgaWYgKCFwYXlsb2FkIHx8IHBheWxvYWQuZWdnSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlZ2cgPSB0aGlzLl9tdWx0aXBsYXllckVuZXJneUVnZ01hcFtwYXlsb2FkLmVnZ0lkXTtcclxuICAgICAgICBpZiAoIWVnZyB8fCAhZWdnLm5vZGUgfHwgIWNjLmlzVmFsaWQoZWdnLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5leHRQb3MgPSBjYy52MihwYXlsb2FkLnggfHwgMCwgcGF5bG9hZC55IHx8IDApO1xyXG4gICAgICAgIGVnZy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKG5leHRQb3MpKTtcclxuICAgICAgICBlZ2cubm9kZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG5leHRQb3MueSkgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIF9tYXR1cmVNdWx0aXBsYXllckVuZXJneUVnZyhwYXlsb2FkKSB7XHJcbiAgICAgICAgaWYgKCFwYXlsb2FkIHx8IHBheWxvYWQuZWdnSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlZ2cgPSB0aGlzLl9tdWx0aXBsYXllckVuZXJneUVnZ01hcFtwYXlsb2FkLmVnZ0lkXTtcclxuICAgICAgICBpZiAoIWVnZykge1xyXG4gICAgICAgICAgICBlZ2cgPSB0aGlzLl9zcGF3bk11bHRpcGxheWVyRW5lcmd5RWdnKHtcclxuICAgICAgICAgICAgICAgIGlkOiBwYXlsb2FkLmVnZ0lkLFxyXG4gICAgICAgICAgICAgICAgeDogcGF5bG9hZC54LFxyXG4gICAgICAgICAgICAgICAgeTogcGF5bG9hZC55LFxyXG4gICAgICAgICAgICAgICAgbWF0dXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiBwYXlsb2FkLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgIGVuZXJneUNvdW50OiBwYXlsb2FkLmVuZXJneUNvdW50LFxyXG4gICAgICAgICAgICAgICAgZW5lcmd5U2NhdHRlclJhZGl1czogcGF5bG9hZC5lbmVyZ3lTY2F0dGVyUmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgcmVtYWluVGltZTogMCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZWdnIHx8ICFlZ2cuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYyKHBheWxvYWQueCA9PSBudWxsID8gZWdnLm5vZGUueCA6IHBheWxvYWQueCwgcGF5bG9hZC55ID09IG51bGwgPyBlZ2cubm9kZS55IDogcGF5bG9hZC55KTtcclxuICAgICAgICBlZ2cubm9kZS5zZXRQb3NpdGlvbihjYy52MyhvcmlnaW4pKTtcclxuICAgICAgICBpZiAoIWVnZy5zY3JpcHQuaXNNYXR1cmUoKSkge1xyXG4gICAgICAgICAgICBlZ2cuc2NyaXB0LmZvcmNlTWF0dXJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVnZy5idXJzdERvbmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBlbmVyZ2llcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZC5lbmVyZ2llcykgPyBwYXlsb2FkLmVuZXJnaWVzIDogW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmVyZ2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVNdWx0aXBsYXllckJ1cnN0RW5lcmd5KG9yaWdpbiwgZW5lcmdpZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBsYXlLaWxsRXhwbG9zaW9uRWZmZWN0QXQob3JpZ2luKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlTXVsdGlwbGF5ZXJFbmVyZ3lFZ2coZWdnSWQpIHtcclxuICAgICAgICBpZiAoZWdnSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlZ2cgPSB0aGlzLl9tdWx0aXBsYXllckVuZXJneUVnZ01hcFtlZ2dJZF07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwW2VnZ0lkXTtcclxuICAgICAgICBpZiAoIWVnZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbmVyZ3lFZ2dzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbmVyZ3lFZ2dzW2ldID09PSBlZ2cpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVnZy5ub2RlICYmIGNjLmlzVmFsaWQoZWdnLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIGVnZy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUVuZXJneUVnZ01hdHVyZShlZ2cpIHtcclxuICAgICAgICBpZiAoIWVnZyB8fCBlZ2cuYnVyc3REb25lIHx8ICFlZ2cubm9kZSB8fCAhY2MuaXNWYWxpZChlZ2cubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWdnLmJ1cnN0RG9uZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYyKGVnZy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgY291bnQgPSBlZ2cuZW5lcmd5Q291bnQgfHwgMTY7XHJcbiAgICAgICAgbGV0IHNjYXR0ZXJSYWRpdXMgPSBlZ2cuZW5lcmd5U2NhdHRlclJhZGl1cyB8fCAxMzA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkgKiAyICogaSAvIGNvdW50ICsgTWF0aC5yYW5kb20oKSAqIDAuNDI7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IDQwICsgTWF0aC5yYW5kb20oKSAqIHNjYXR0ZXJSYWRpdXM7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihvcmlnaW4uYWRkKGNjLnYyKE1hdGguY29zKGFuZ2xlKSAqIGRpc3RhbmNlLCBNYXRoLnNpbihhbmdsZSkgKiBkaXN0YW5jZSkpLCA0Mik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDb2xsaWRlcnModGFyZ2V0UG9zLCAxOCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ob3JpZ2luLmFkZChjYy52MihNYXRoLmNvcyhhbmdsZSkgKiA0MiwgTWF0aC5zaW4oYW5nbGUpICogNDIpKSwgNDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLmNyZWF0ZUVuZXJneUF0KG9yaWdpbik7XHJcbiAgICAgICAgICAgIGVuZXJneS5zY2FsZSA9IDAuMTg7XHJcbiAgICAgICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMzIsIDEpLFxyXG4gICAgICAgICAgICAgICAgY2MuanVtcFRvKDAuMzYgKyBNYXRoLnJhbmRvbSgpICogMC4wOCwgdGFyZ2V0UG9zLCA0MiArIE1hdGgucmFuZG9tKCkgKiAxOCwgMSlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChvcmlnaW4pO1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4yKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93UGxheWVyQnViYmxlKFwi5oiQ54af5LqGLCDlm57mnaXmlLbog73ph49cIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25PaWxUZXN0UGlja3VwKHBvcyA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwaWNrdXAgPSBuZXcgY2MuTm9kZShcIk9pbFBpY2t1cFwiKTtcclxuICAgICAgICBwaWNrdXAucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHBpY2t1cC5hZGRDb21wb25lbnQoT2lsUGlja3VwKTtcclxuICAgICAgICBwaWNrdXAucG9zaXRpb24gPSBjYy52Myhwb3MgfHwgdGhpcy5fZ2V0T2lsVGVzdFBpY2t1cFBvcygpKTtcclxuICAgICAgICBwaWNrdXAuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChwaWNrdXAueSk7XHJcbiAgICAgICAgcGlja3VwLnNjcmlwdC5zZXRJbkdhbWUoMTgpO1xyXG4gICAgICAgIHRoaXMuX3NraWxscy5wdXNoKHBpY2t1cCk7XHJcbiAgICAgICAgcmV0dXJuIHBpY2t1cDtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3blRhclBpY2t1cEF0KHBvcywgcGlja3VwSWQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwaWNrdXAgPSBuZXcgY2MuTm9kZShcIk9pbFBpY2t1cFwiKTtcclxuICAgICAgICBwaWNrdXAucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHBpY2t1cC5hZGRDb21wb25lbnQoT2lsUGlja3VwKTtcclxuICAgICAgICBwaWNrdXAucG9zaXRpb24gPSBjYy52Myhwb3MgfHwgdGhpcy5fZ2V0T2lsVGVzdFBpY2t1cFBvcygpKTtcclxuICAgICAgICBwaWNrdXAuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChwaWNrdXAueSk7XHJcbiAgICAgICAgcGlja3VwLnNjcmlwdC5zZXRJbkdhbWUoMTgpO1xyXG4gICAgICAgIGlmIChwaWNrdXBJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBpY2t1cFtcIl9fdGFyUGlja3VwSWRcIl0gPSBwaWNrdXBJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2tpbGxzLnB1c2gocGlja3VwKTtcclxuICAgICAgICByZXR1cm4gcGlja3VwO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvdmVyVGVzdEVuZW15KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLl9nZXRDb3ZlclRlc3RFbmVteVBvcygpKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGVuZW15LnNjcmlwdC5fY29uZmlnKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5BdHRhY2tSYWRpdXMgPSA4ODA7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWUgPSAwLjMyO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLlNwZWVkID0gMDtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb2RlVGltZSA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fd2Fsa1BhdGhzID0gW107XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll93aWxsUG9zID0gbnVsbDtcclxuICAgICAgICBlbmVteS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0RW5lbXkgPSBlbmVteTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDb3ZlclRlc3RFbmVteVBvcygpIHtcclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gdGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKVxyXG4gICAgICAgICAgICA/IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbilcclxuICAgICAgICAgICAgOiBjYy52Mih0aGlzLl9wbGF5ZXJCb3JuUG9zIHx8IGNjLnYyKDAsIDApKTtcclxuICAgICAgICBsZXQgZGlycyA9IFtcclxuICAgICAgICAgICAgY2MudjIoMSwgMC4xMiksXHJcbiAgICAgICAgICAgIGNjLnYyKDEsIC0wLjE2KSxcclxuICAgICAgICAgICAgY2MudjIoMC44NiwgMC4zOCksXHJcbiAgICAgICAgICAgIGNjLnYyKDAuODYsIC0wLjM4KSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGlyID0gZGlyc1tpXS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoZGlyLm11bCg0MjAgKyBpICogMjApKSwgODYpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcywgNTIpLmxlbmd0aCA9PSAwICYmIHRoaXMubGluZUxpbmVQYXNzQ29sbGlkZXJzKHBvcywgcGxheWVyUG9zKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52Mig0MjAsIDApKSwgODYpO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduQ292ZXJUZXN0Q292ZXJzKGNvdW50ID0gNikge1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdENvdmVycyA9IFtdO1xyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSB0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpXHJcbiAgICAgICAgICAgID8gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICA6IGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MgfHwgY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVDb3ZlclRlc3RDb3Zlcih0aGlzLl9nZXRDb3ZlclRlc3RDb3ZlclNwYXduUG9zKHBsYXllclBvcywgaSwgY291bnQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldENvdmVyVGVzdENvdmVyU3Bhd25Qb3MocGxheWVyUG9zLCBpbmRleCwgY291bnQpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJhc2VBbmdsZSA9IE1hdGguUEkgKiAyICogKChpbmRleCArIGkgKiAwLjM3KSAlIGNvdW50KSAvIGNvdW50O1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBiYXNlQW5nbGUgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjk7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IDExMCArIE1hdGgucmFuZG9tKCkgKiAxODA7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBjYy52MihwbGF5ZXJQb3MpLmFkZChjYy52MihNYXRoLmNvcyhhbmdsZSkgKiBkaXN0YW5jZSwgTWF0aC5zaW4oYW5nbGUpICogZGlzdGFuY2UpKTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA0OCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDb2xsaWRlcnMocG9zLCAzOCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvcy5zdWIocGxheWVyUG9zKS5tYWcoKSA8IDkwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY292ZXJUZXN0RW5lbXkgJiYgY2MuaXNWYWxpZCh0aGlzLl9jb3ZlclRlc3RFbmVteSkgJiYgcG9zLnN1Yih0aGlzLl9jb3ZlclRlc3RFbmVteS5wb3NpdGlvbikubWFnKCkgPCAxMjApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2NvdmVyVGVzdENvdmVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdmVyICYmIGNvdmVyLm5vZGUgJiYgY2MuaXNWYWxpZChjb3Zlci5ub2RlKSAmJiBwb3Muc3ViKGNvdmVyLm5vZGUucG9zaXRpb24pLm1hZygpIDwgODYpIHtcclxuICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDE0MCArIGluZGV4ICogMTgsIGluZGV4ICUgMiA9PSAwID8gOTAgOiAtOTApKSwgNDgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVDb3ZlclRlc3RDb3Zlcihwb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb290ID0gbmV3IGNjLk5vZGUoXCJfY292ZXJUZXN0Q3JhdGVcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICByb290LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgocG9zLnkpICsgMTtcclxuXHJcbiAgICAgICAgbGV0IHNoYWRvdyA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyVGVzdENyYXRlU2hhZG93XCIpO1xyXG4gICAgICAgIHNoYWRvdy5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNoYWRvdy5zZXRQb3NpdGlvbigwLCAtOSk7XHJcbiAgICAgICAgbGV0IHNoYWRvd0dyYXBoaWNzID0gc2hhZG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgc2hhZG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgNjgpO1xyXG4gICAgICAgIHNoYWRvd0dyYXBoaWNzLmVsbGlwc2UoMCwgMCwgMjQsIDEyKTtcclxuICAgICAgICBzaGFkb3dHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVOb2RlID0gbmV3IGNjLk5vZGUoXCJfY292ZXJTcHJpdGVcIik7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNwcml0ZU5vZGUuc2V0Q29udGVudFNpemUoNzAsIDcwKTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gc3ByaXRlTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHRoaXMuX2xvYWRDb3ZlclRlc3RGcmFtZSgoc3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwcml0ZSAmJiBjYy5pc1ZhbGlkKHNwcml0ZSkgJiYgc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBjcmFjayA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyQ3JhY2tcIik7XHJcbiAgICAgICAgY3JhY2sucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBjcmFjay56SW5kZXggPSAyO1xyXG4gICAgICAgIGNyYWNrW1wiJEdyYXBoaWNzXCJdID0gY3JhY2suYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgbGV0IGhwTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVySHBcIik7XHJcbiAgICAgICAgaHBOb2RlLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgaHBOb2RlLnNldFBvc2l0aW9uKDAsIDQ4KTtcclxuICAgICAgICBocE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI0MywgMjE0LCAyNTUpO1xyXG4gICAgICAgIGxldCBocExhYmVsID0gaHBOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgaHBMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGhwTGFiZWwubGluZUhlaWdodCA9IDIyO1xyXG4gICAgICAgIGhwTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBocExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IGNvdmVyOmFueSA9IHtcclxuICAgICAgICAgICAgbm9kZTogcm9vdCxcclxuICAgICAgICAgICAgcmFkaXVzOiAzNCxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIG1heEhwOiA1LFxyXG4gICAgICAgICAgICBhdHRhY2hlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG93bmVyOiBudWxsLFxyXG4gICAgICAgICAgICBhdHRhY2hPZmZzZXQ6IGNjLnYyKDAsIDApLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcm9vdFtcIl9fY292ZXJUZXN0RGF0YVwiXSA9IGNvdmVyO1xyXG4gICAgICAgIHJvb3RbXCIkQ3JhY2tcIl0gPSBjcmFjaztcclxuICAgICAgICByb290W1wiJEhwTGFiZWxcIl0gPSBocExhYmVsO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdENvdmVycy5wdXNoKGNvdmVyKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQ292ZXJUZXN0Q292ZXJWaXN1YWwoY292ZXIpO1xyXG4gICAgICAgIHJldHVybiBjb3ZlcjtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaENvdmVyVGVzdENvdmVyVmlzdWFsKGNvdmVyKSB7XHJcbiAgICAgICAgaWYgKCFjb3ZlciB8fCAhY292ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChjb3Zlci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9zdEhwID0gY292ZXIubWF4SHAgLSBjb3Zlci5ocDtcclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IGNvdmVyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJfY292ZXJTcHJpdGVcIik7XHJcbiAgICAgICAgaWYgKHNwcml0ZU5vZGUpIHtcclxuICAgICAgICAgICAgc3ByaXRlTm9kZS5zY2FsZSA9IDEgLSBsb3N0SHAgKiAwLjAzO1xyXG4gICAgICAgICAgICBzcHJpdGVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUgLSBsb3N0SHAgKiAxNCwgMjU1IC0gbG9zdEhwICogMjIsIDI1NSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3Zlci5ub2RlW1wiJEhwTGFiZWxcIl0pIHtcclxuICAgICAgICAgICAgY292ZXIubm9kZVtcIiRIcExhYmVsXCJdLnN0cmluZyA9IGNvdmVyLmhwICsgXCIvXCIgKyBjb3Zlci5tYXhIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdmVyLm5vZGVbXCIkQ3JhY2tcIl0gJiYgY292ZXIubm9kZVtcIiRDcmFja1wiXVtcIiRHcmFwaGljc1wiXSkge1xyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSBjb3Zlci5ub2RlW1wiJENyYWNrXCJdW1wiJEdyYXBoaWNzXCJdO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAobG9zdEhwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMiArIE1hdGgubWluKDIsIGxvc3RIcCAqIDAuMzUpO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig3MCwgNDIsIDE4LCAyMjApO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKC0xMCwgMTgpO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKC00LCA3KTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtMTEsIC03KTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvc3RIcCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKDYsIDE3KTtcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lVG8oMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDExLCAtMTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvc3RIcCA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKC0xOCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKC00LCAtNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDgsIC0yMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldE9pbFRlc3RQaWNrdXBQb3MoKSB7XHJcbiAgICAgICAgbGV0IGJhc2VQb3MgPSB0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpXHJcbiAgICAgICAgICAgID8gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICA6IGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MgfHwgY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGVEaXJzID0gW1xyXG4gICAgICAgICAgICBjYy52MigwLCAxKSxcclxuICAgICAgICAgICAgY2MudjIoMSwgMCksXHJcbiAgICAgICAgICAgIGNjLnYyKC0xLCAwKSxcclxuICAgICAgICAgICAgY2MudjIoMCwgLTEpLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVEaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihiYXNlUG9zLmFkZChjYW5kaWRhdGVEaXJzW2ldLm11bCgxNTApKSwgNzApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcywgNDIpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihiYXNlUG9zLmFkZChjYy52MigwLCAxMjApKSwgNzApO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEZWZhdWx0RW5lcmd5KCkge1xyXG4gICAgICAgIGxldCBlbmVyZ3kgPSBuZXcgY2MuTm9kZShcIkVuZXJneUl0ZW1cIik7XHJcbiAgICAgICAgZW5lcmd5LmFkZENvbXBvbmVudChFbmVyZ3lJdGVtKTtcclxuICAgICAgICByZXR1cm4gZW5lcmd5O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRSYW5kb21QYXNzYWJsZVRpbGUoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jaGVja0xpc3QpO1xyXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fY2hlY2tMaXN0W2tleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtICYmIHRoaXMuX2lzRW5lcmd5VGlsZUVtcHR5KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MudjIoaXRlbS54LCBpdGVtLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfaXNFbmVyZ3lUaWxlRW1wdHkodGlsZSkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3ModGlsZSk7XHJcbiAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiTWluRGlzdGFuY2VcIiwgMTIwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgbGV0IHBsYXllckxlbiA9IHBvcy5zdWIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgaWYgKHBsYXllckxlbiA8IG1pbkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5fZW5lcmd5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lcmd5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IHBvcy5zdWIoZW5lcmd5LnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPCBtaW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXVsdGlwbGF5ZXJFbmVyZ3lTcGF3blBvaW50cyhsaW1pdCA9IDI1Nikge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY2hlY2tMaXN0IHx8IHt9KTtcclxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHN0ZXAgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKGtleXMubGVuZ3RoIC8gbGltaXQpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9jaGVja0xpc3Rba2V5c1tpXV07XHJcbiAgICAgICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52MihpdGVtLngsIGl0ZW0ueSkpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB4OiBNYXRoLnJvdW5kKHBvcy54KSxcclxuICAgICAgICAgICAgICAgIHk6IE1hdGgucm91bmQocG9zLnkpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXVsdGlwbGF5ZXJNYXBCb3VuZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFsZldpZHRoOiBNYXRoLnJvdW5kKHRoaXMuX3RtU2l6ZS53aWR0aCAvIDIpLFxyXG4gICAgICAgICAgICBoYWxmSGVpZ2h0OiBNYXRoLnJvdW5kKHRoaXMuX3RtU2l6ZS5oZWlnaHQgLyAyKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldE11bHRpcGxheWVyU3Bhd25DYW5kaWRhdGVzKCkge1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGVzID0gdGhpcy5fZ2V0TXVsdGlwbGF5ZXJTcGF3bkNhbmRpZGF0ZXMoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBjYW5kaWRhdGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXBvcykge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgeDogTWF0aC5yb3VuZChwb3MueCksXHJcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHBvcy55KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmnIDov5HnmoTmlYzkurpcclxuICAgIGdldE5lYXJFbmVteSgpIHtcclxuICAgICAgICBsZXQgcmV0ID0gbnVsbDtcclxuICAgICAgICBsZXQgcmV0TGVuID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3MgPSBjYy52MihlbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gZW5lbXlQb3Muc3ViKHBsYXllclBvcykubWFnKClcclxuICAgICAgICAgICAgaWYgKHJldCA9PSBudWxsIHx8IGxlbiA8IHJldExlbikge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gZW5lbXk7XHJcbiAgICAgICAgICAgICAgICByZXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Zyo5ZCM5LiA5LiqdGlsZSzov5jmnInlhbbku5bmlYzkurpcclxuICAgIGlzSGF2ZU90aGVyRW5lbXkoZW5lbXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb3RoZXJFbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgaWYgKG90aGVyRW5lbXkgIT0gZW5lbXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKGVuZW15LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBvdGhlclRpbGUgPSB0aGlzLmdhbWVQb3NUb1RpbGUob3RoZXJFbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS54ID09IG90aGVyVGlsZS54ICYmIHRpbGUueSA9PSBvdGhlclRpbGUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oyJ5LiLXHJcbiAgICBfb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGEgPTE7XHJcbiAgICAgICAgLy8gbGV0IHBvaW50ID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIC8vIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKHBvaW50KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc2V0TWFwKCkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkud2lkdGg7IHJvdysrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG1Hcm91cC5zZXRUaWxlR0lEQXQoMSwgY2MudjIocm93LGNvbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdGlsZWQgbWFw5Z2Q5qCH6L2s5o2i5Li65ri45oiP5Z2Q5qCHXHJcbiAgICBfdGlsZVBvc1RvR2FtZVBvcyh0aWxlZFBvcykge1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52Mih0aWxlZFBvcy54LCB0aGlzLl90bVNpemUuaGVpZ2h0IC0gdGlsZWRQb3MueSk7XHJcbiAgICAgICAgcG9zLnggPSBwb3MueCAtIHRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgIHBvcy55ID0gcG9zLnkgLSB0aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcblxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy90aWxl5Z2Q5qCH6L2s5o2i5Li65ri45oiP5Z2Q5qCHXHJcbiAgICB0aWxlVG9HYW1lUG9zKHRpbGUpIHtcclxuICAgICAgICBsZXQgeCA9IHRpbGUueCAqIHRoaXMuX3RpbGVTaXplLndpZHRoICsgdGhpcy5fdGlsZVNpemUud2lkdGgvMjtcclxuICAgICAgICBsZXQgeSA9IHRpbGUueSAqIHRoaXMuX3RpbGVTaXplLmhlaWdodCArIHRoaXMuX3RpbGVTaXplLmhlaWdodC8yO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhjYy52Mih4LHkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WdkOagh+i9rOaNouS4unRpbGVkIG1hcOWdkOagh1xyXG4gICAgX2dhbWVQb3NUb1RpbGVQb3MoZ2FtZVBvcykge1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52MihnYW1lUG9zKTtcclxuICAgICAgICBwb3MueCA9IHBvcy54ICsgdGhpcy5fdG1TaXplLndpZHRoLzI7XHJcbiAgICAgICAgcG9zLnkgPSBwb3MueSArIHRoaXMuX3RtU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICBwb3MueSA9IHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSBwb3MueTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WdkOagh+i9rOaNouS4unRpbGXlnZDmoIdcclxuICAgIGdhbWVQb3NUb1RpbGUoZ2FtZVBvcykge1xyXG4gICAgICAgIGxldCB0aWxlUG9zID0gdGhpcy5fZ2FtZVBvc1RvVGlsZVBvcyhnYW1lUG9zKTtcclxuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IodGlsZVBvcy54IC8gdGhpcy5fdGlsZVNpemUud2lkdGgpO1xyXG4gICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcih0aWxlUG9zLnkgLyB0aGlzLl90aWxlU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4LCB5KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/liJ3lp4vljJZBKuajgOa1i+WIl+ihqFxyXG4gICAgaW5pdENoZWNrTGlzdCAoKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52Mih4LCB5KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcyw1MCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA6IGFueT0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS54ID0geDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnkgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uRyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5IID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmZhdGhlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXNzYWJsZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldFt4K1wiX1wiK3ldID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl90bUdyb3VwLnNldFRpbGVHSURBdCgzLCBjYy52Mih4LHkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkud2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSByZXRbeCtcIl9cIit5XTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3MoY2MudjIoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXd4ID0geC0xOyBuZXd4IDw9IHgrMTsgbmV3eCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3eSA9IHktMTsgbmV3eSA8PSB5KzE7IG5ld3krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHJldFtuZXd4K1wiX1wiK25ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Bhc3NhYmxlSXRlbSA9IGl0ZW0ucGFzc2FibGVbbmV3eCtcIl9cIituZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoeCAhPSBuZXd4IHx8IHkgIT0gbmV3eSkgJiYgbmV3SXRlbSAmJiBuZXdQYXNzYWJsZUl0ZW0gPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3BvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52MihuZXd4LCBuZXd5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2lyY2xlQ2lyY2xlUGFzc0NvbGxpZGVycyhwb3MsbmV3cG9zLDUwKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnBhc3NhYmxlW25ld3grXCJfXCIrbmV3eV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLnBhc3NhYmxlW3grXCJfXCIreV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlkEq5qOA5rWL5YiX6KGoXHJcbiAgICBnZXRDaGVja0xpc3QgKCkge1xyXG4gICAgICAgIHZhciBvYmpTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9jaGVja0xpc3QpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKG9ialN0cmluZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+WcG9z5omA5ZyodGlsZSzmnIDov5HnmoTlj6/pgJrooYx0aWxlXHJcbiAgICBnZXRQYXNzYWJsZVRpbGUgKHRpbGUscmVmZXJUaWxlKSB7XHJcbiAgICAgICAgLy/liKTmlq3oh6rlt7FcclxuICAgICAgICAvLyBpZiAodGhpcy5fY2hlY2tMaXN0W3RpbGUueCArIFwiX1wiICsgdGlsZS55XSkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdGlsZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat5LiA546vXHJcbiAgICAgICAgbGV0IHJldFRpbGUgPSBudWxsO1xyXG4gICAgICAgIGxldCByZXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4Kyspe1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gLTE7IHkgPD0gMTsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGlmICh4ICE9IDAgfHwgeSE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eCA9IHRpbGUueCArIHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSB0aWxlLnkgKyB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd0aWxlID0gdGhpcy5fY2hlY2tMaXN0W25ld3ggKyBcIl9cIiArIG5ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXd0aWxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlbiA9IChyZWZlclRpbGUueC1uZXd4KSoocmVmZXJUaWxlLngtbmV3eCkgKyAocmVmZXJUaWxlLnktbmV3eSkqKHJlZmVyVGlsZS55LW5ld3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VGlsZSA9PSBudWxsIHx8IGxlbiA8IHJldExlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0VGlsZSA9IG5ld3RpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldFRpbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldFRpbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreS6jOeOr1xyXG4gICAgICAgIHJldFRpbGUgPSBudWxsO1xyXG4gICAgICAgIHJldExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IC0yOyB4IDw9IDI7IHgrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMjsgeSA8PSAyOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKHggPT0gLTIgfHwgeCA9PSAyIHx8IHkgPT0gLTIgfHwgeSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSAocmVmZXJUaWxlLngtbmV3eCkqKHJlZmVyVGlsZS54LW5ld3gpICsgKHJlZmVyVGlsZS55LW5ld3kpKihyZWZlclRpbGUueS1uZXd5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFRpbGUgPT0gbnVsbCB8fCBsZW4gPCByZXRMZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGUgPSBuZXd0aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXRUaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRUaWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5Zwb3PmiYDlnKh0aWxlLOacgOi/keeahOWPr+mAmuihjHRpbGVcclxuICAgIGdldFBhc3NhYmxlVGlsZUV4ICh0aWxlKSB7XHJcbiAgICAgICAgLy/liKTmlq3kuIDnjq9cclxuICAgICAgICBsZXQgcmV0VGlsZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gLTI7IHggPD0gMjsgeCsrKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0yOyB5IDw9IDI7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGVzLnB1c2gobmV3dGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmV0VGlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcmV0VGlsZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldFRpbGVzW2luZGV4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOe6v+autVBQMSzmmK/lkKbkvJrnu4/ov4djb2xsaWRlcnPkuK3nmoTkuIDmnaHnur/mrrVcclxuICAgIGxpbmVMaW5lUGFzc0NvbGxpZGVycyhQLFAxKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlcnNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5saW5lUGFzc0xpbmUoUCxQMSxBLEIpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g54K5UCxQMeS4uuWchuW/gyxyYWRpdXPkuLrljYrlvoTnmoTlnIYs5piv5ZCm5Lya57uP6L+HY29sbGlkZXJz5Lit55qE5LiA5p2h57q/5q61XHJcbiAgICBjaXJjbGVDaXJjbGVQYXNzQ29sbGlkZXJzKFAsUDEscmFkaXVzKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlcnNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5jaXJjbGVDaXJjbGVQYXNzTGluZShQLFAxLHJhZGl1cyxBLEIpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/norDmkp7mtYvor5Uo5Lul54K5UOS4uuWchuW/gyzljYrlvoTkuLpyYWRpdXPnmoTlnIYs5piv5ZCm5ZKMY29sbGlkZXJz5Lit55qE57q/5q6155u45LqkKVxyXG4gICAgdGVzdENvbGxpZGVycyhQLCByYWRpdXMpe1xyXG4gICAgICAgIGxldCBjb2xsaWRlckl0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fY29sbGlkZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xsaWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2tleV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBBID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXJJdGVtID0gVXRpbHMuZ2V0UG9pbnRMaW5lU2hvcnRlc3RJbmZvKFAsIEEsIEIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJJdGVtLmxlbiA8PSByYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckl0ZW0uY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckl0ZW1zLnB1c2goY29sbGlkZXJJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVySXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXVzZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVLaWxsQnJvYWRjYXN0RW50cmllcygpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU9pbFNwaWxscyhkdCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRW5lcmd5RWdnVGVzdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsU3RyZWFrUmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsU3RyZWFrUmVtYWluIC09IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fa2lsbFN0cmVha1JlbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9raWxsU3RyZWFrUmVtYWluID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tpbGxTdHJlYWtDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Rlc3RNb2RlKCkgPT0gZmFsc2UgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPiAxICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmVteXMubGVuZ3RoIDwgdGhpcy5fdGltZU1heEVuZW15Q291bnQgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50IDwgdGhpcy5fbWF4RW5lbXlDb3VudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8v5Zyw5Zu+5rua5YqoXHJcbiAgICAgICAgICAgIHRoaXMucm9sbE1hcCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUZXN0TW9kZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVFbmVyZ3koZHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2luZ2xlUGxheWVyVGFyUGlja3VwKGR0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckxhc3RQb3MgPSB0aGlzLl9wbGF5ZXIucG9zaXRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcm9hbUZsZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvYW1Qb3NpdGlvbiA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuYWRkKHRoaXMuX3JvYW1EaXIpO1xyXG4gICAgICAgICAgICAgICAgcm9hbVBvc2l0aW9uID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKHJvYW1Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9hbVBvc2l0aW9uLnggPT0gdGhpcy5ub2RlLnggJiYgcm9hbVBvc2l0aW9uLnkgPT0gdGhpcy5ub2RlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb2FtRGlyLnggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyktMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb2FtRGlyLnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyktMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggPSByb2FtUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSA9IHJvYW1Qb3NpdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVPaWxTcGlsbHMoZHQpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fb2lsU3BpbGxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGlsbCA9IHRoaXMuX29pbFNwaWxsc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzcGlsbCB8fCAhc3BpbGwubm9kZSB8fCAhY2MuaXNWYWxpZChzcGlsbC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzcGlsbC5saWZlVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYgKHNwaWxsLmxpZmVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHNwaWxsLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZmFkZVN0YXJ0ID0gTWF0aC5taW4oMi4yLCBzcGlsbC5kdXJhdGlvbiAqIDAuMyk7XHJcbiAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBpZiAoc3BpbGwubGlmZVRpbWUgPCBmYWRlU3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBNYXRoLmZsb29yKDI1NSAqIChzcGlsbC5saWZlVGltZSAvIGZhZGVTdGFydCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwaWxsLm5vZGUub3BhY2l0eSA9IE1hdGgubWF4KDAsIG9wYWNpdHkpO1xyXG4gICAgICAgICAgICBzcGlsbC5ub2RlLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc3BpbGwubm9kZS55KSAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Zyw5Zu+5rua5YqoXHJcbiAgICByb2xsTWFwKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgbGV0IHJldCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyLngsLXRoaXMuX3BsYXllci55KSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gcmV0Lng7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gcmV0Lnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNwYXduT2lsU3BpbGwocG9zLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdG1EZWNhbCB8fCAhY2MuaXNWYWxpZCh0aGlzLl90bURlY2FsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzcGlsbFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKHBvcyksIDY4KTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gb3B0aW9ucy5yYWRpdXMgfHwgT0lMX1NQSUxMX1JBRElVUztcclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uIHx8IE9JTF9TUElMTF9EVVJBVElPTjtcclxuICAgICAgICBsZXQgc2xvd0ZhY3RvciA9IG9wdGlvbnMuc2xvd0ZhY3RvciB8fCBPSUxfU1BJTExfU0xPV19GQUNUT1I7XHJcblxyXG4gICAgICAgIGxldCByb290ID0gbmV3IGNjLk5vZGUoXCJfb2lsU3BpbGxcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLl90bURlY2FsO1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24oY2MudjMoc3BpbGxQb3MpKTtcclxuICAgICAgICByb290LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc3BpbGxQb3MueSkgLSAyO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX29pbFNwaWxsU3ByaXRlXCIpO1xyXG4gICAgICAgIHNwcml0ZU5vZGUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBzcHJpdGVOb2RlLm9wYWNpdHkgPSAyMjg7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5zZXRDb250ZW50U2l6ZShyYWRpdXMgKiAyLjE1LCByYWRpdXMgKiAyLjE1KTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gc3ByaXRlTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHNwcml0ZU5vZGUuY29sb3IgPSBjYy5jb2xvcig4MCwgNTYsIDMwLCAyMjgpO1xyXG4gICAgICAgIHRoaXMuX2xvYWRPaWxTcGlsbEZyYW1lKChzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlICYmIGNjLmlzVmFsaWQoc3ByaXRlKSAmJiBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHJpbSA9IG5ldyBjYy5Ob2RlKFwiX29pbFNwaWxsUmltXCIpO1xyXG4gICAgICAgIHJpbS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxldCByaW1HcmFwaGljcyA9IHJpbS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHJpbUdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgcmltR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxNDUsIDEwNCwgNjIsIDEzNSk7XHJcbiAgICAgICAgcmltR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAqIDAuOSk7XHJcbiAgICAgICAgcmltR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfb2lsU3BpbGxDb3JlXCIpO1xyXG4gICAgICAgIGNvcmUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBsZXQgY29yZUdyYXBoaWNzID0gY29yZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNiwgMTgsIDE0LCAxMTApO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICogMC43Mik7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHNwbGFzaCA9IG5ldyBjYy5Ob2RlKFwiX29pbFNwaWxsU3BsYXNoXCIpO1xyXG4gICAgICAgIHNwbGFzaC5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNwbGFzaC5vcGFjaXR5ID0gMDtcclxuICAgICAgICBzcGxhc2guc2NhbGUgPSAwLjQ1O1xyXG4gICAgICAgIGxldCBzcGxhc2hHcmFwaGljcyA9IHNwbGFzaC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHNwbGFzaEdyYXBoaWNzLmxpbmVXaWR0aCA9IDc7XHJcbiAgICAgICAgc3BsYXNoR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxODgsIDE0MiwgODYsIDE2MCk7XHJcbiAgICAgICAgc3BsYXNoR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAqIDAuNTgpO1xyXG4gICAgICAgIHNwbGFzaEdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIHNwbGFzaC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMSwgMjIwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjEyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yNCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjQsIDEuNTUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgc3BpbGwgPSB7XHJcbiAgICAgICAgICAgIG5vZGU6IHJvb3QsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBzbG93RmFjdG9yOiBzbG93RmFjdG9yLFxyXG4gICAgICAgICAgICBsaWZlVGltZTogZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX29pbFNwaWxscy5wdXNoKHNwaWxsKTtcclxuICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxuXHJcbiAgICBzaG93T2lsU2hlbGxQcmV2aWV3KGZyb21Qb3MsIHRvUG9zLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuaGlkZU9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgICAgIGlmICghdGhpcy5fdG1EZWNhbCB8fCAhY2MuaXNWYWxpZCh0aGlzLl90bURlY2FsKSB8fCAhZnJvbVBvcyB8fCAhdG9Qb3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiX29pbFNoZWxsUHJldmlld1wiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRoaXMuX3RtRGVjYWw7XHJcbiAgICAgICAgcm9vdC56SW5kZXggPSA0MDAwO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld05vZGUgPSByb290O1xyXG5cclxuICAgICAgICBsZXQgbGluZSA9IG5ldyBjYy5Ob2RlKFwiX29pbFNoZWxsUHJldmlld0xpbmVcIik7XHJcbiAgICAgICAgbGluZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGxpbmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTkwLCAxNTAsIDkyLCAyMjApO1xyXG4gICAgICAgIGxldCBzdGFydCA9IGNjLnYyKGZyb21Qb3MpO1xyXG4gICAgICAgIGxldCBlbmQgPSBjYy52Mih0b1Bvcyk7XHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBzdGFydC5hZGQoZW5kKS5tdWwoMC41KS5hZGQoY2MudjIoMCwgb3B0aW9ucy5yYWRpdXMgfHwgMTEwKSk7XHJcbiAgICAgICAgZ3JhcGhpY3MubW92ZVRvKHN0YXJ0LngsIHN0YXJ0LnkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDE4OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHQgPSBpIC8gMTg7XHJcbiAgICAgICAgICAgIGxldCBpbnYgPSAxIC0gdDtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gc3RhcnQubXVsKGludiAqIGludikuYWRkKGNvbnRyb2wubXVsKDIgKiBpbnYgKiB0KSkuYWRkKGVuZC5tdWwodCAqIHQpKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IG5ldyBjYy5Ob2RlKFwiX29pbFNoZWxsUHJldmlld1RhcmdldFwiKTtcclxuICAgICAgICB0YXJnZXQucGFyZW50ID0gcm9vdDtcclxuICAgICAgICB0YXJnZXQuc2V0UG9zaXRpb24oY2MudjMoZW5kKSk7XHJcbiAgICAgICAgbGV0IHRhcmdldEdyYXBoaWNzID0gdGFyZ2V0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbGV0IGFyZWFSYWRpdXMgPSBvcHRpb25zLmFyZWFSYWRpdXMgfHwgT0lMX1NQSUxMX1JBRElVUztcclxuICAgICAgICB0YXJnZXRHcmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIHRhcmdldEdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTE1LCA4OCwgNTQsIDIyMCk7XHJcbiAgICAgICAgdGFyZ2V0R3JhcGhpY3MuY2lyY2xlKDAsIDAsIGFyZWFSYWRpdXMgKiAwLjkyKTtcclxuICAgICAgICB0YXJnZXRHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB0YXJnZXRHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNCwgMjAsIDE4LCA1NSk7XHJcbiAgICAgICAgdGFyZ2V0R3JhcGhpY3MuY2lyY2xlKDAsIDAsIGFyZWFSYWRpdXMgKiAwLjcyKTtcclxuICAgICAgICB0YXJnZXRHcmFwaGljcy5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZU9pbFNoZWxsUHJldmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fb2lsU2hlbGxQcmV2aWV3Tm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX29pbFNoZWxsUHJldmlld05vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld05vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdOb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5T2lsU2hlbGxUaHJvdyhmcm9tUG9zLCB0b1Bvcywgb3B0aW9uczogYW55ID0ge30pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSB8fCAhZnJvbVBvcyB8fCAhdG9Qb3MpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbkxhbmQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMub25MYW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2hlbGwgPSBuZXcgY2MuTm9kZShcIl9vaWxUaHJvd1NoZWxsXCIpO1xyXG4gICAgICAgIHNoZWxsLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBzaGVsbC5zZXRQb3NpdGlvbihjYy52Myhmcm9tUG9zKSk7XHJcbiAgICAgICAgc2hlbGwuekluZGV4ID0gNTIwMDtcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBzaGVsbC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDcwLCA0OCwgMjgsIDIzNSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjQsIDE4LCAxNCwgMjIwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoLTYsIDIsIDcpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoNywgLTMsIDgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gY2MudjIoZnJvbVBvcyk7XHJcbiAgICAgICAgbGV0IGVuZCA9IGNjLnYyKHRvUG9zKTtcclxuICAgICAgICBsZXQgY29udHJvbCA9IHN0YXJ0LmFkZChlbmQpLm11bCgwLjUpLmFkZChjYy52MigwLCBvcHRpb25zLmFyY0hlaWdodCB8fCAxMTApKTtcclxuICAgICAgICBsZXQgZHVyYXRpb24gPSAwLjI4O1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdERhdGEgPSB7IHZhbHVlOiAwIH07XHJcbiAgICAgICAgc2hlbGwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KGR1cmF0aW9uLCAyMjApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGVsbFtcIl9fdGhyb3dTY2hlZHVsZXJcIl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0RGF0YS52YWx1ZSArPSAxIC8gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihkdXJhdGlvbiAqIDYwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodERhdGEudmFsdWUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdERhdGEudmFsdWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSB0RGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnYgPSAxIC0gdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IHN0YXJ0Lm11bChpbnYgKiBpbnYpLmFkZChjb250cm9sLm11bCgyICogaW52ICogdCkpLmFkZChlbmQubXVsKHQgKiB0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGVsbC5zZXRQb3NpdGlvbihjYy52Myhwb2ludCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hlbGwuekluZGV4ID0gNTIwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY2hlZHVsZShzaGVsbFtcIl9fdGhyb3dTY2hlZHVsZXJcIl0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShkdXJhdGlvbilcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNoZWxsW1wiX190aHJvd1NjaGVkdWxlclwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudW5zY2hlZHVsZShzaGVsbFtcIl9fdGhyb3dTY2hlZHVsZXJcIl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2hlbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbkxhbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uTGFuZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRlcnJhaW5TcGVlZEZhY3Rvcihwb3MsIHJhZGl1cyA9IDApIHtcclxuICAgICAgICBsZXQgZmFjdG9yID0gMTtcclxuICAgICAgICBsZXQgY2hlY2tQb3MgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9vaWxTcGlsbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IHNwaWxsID0gdGhpcy5fb2lsU3BpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXNwaWxsIHx8ICFzcGlsbC5ub2RlIHx8ICFjYy5pc1ZhbGlkKHNwaWxsLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vaWxTcGlsbHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsaW1pdCA9IHNwaWxsLnJhZGl1cyArIHJhZGl1cyAqIDAuMzU7XHJcbiAgICAgICAgICAgIGlmIChjaGVja1Bvcy5zdWIoc3BpbGwubm9kZS5wb3NpdGlvbikubWFnKCkgPD0gbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGZhY3RvciA9IE1hdGgubWluKGZhY3Rvciwgc3BpbGwuc2xvd0ZhY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlRW5lcmd5RWdnVGVzdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdncy5sZW5ndGggPD0gMCAmJiB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VuZXJneUVnZ0J1c2hlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgYnVzaCA9IHRoaXMuX2VuZXJneUVnZ0J1c2hlc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFidXNoIHx8ICFidXNoLm5vZGUgfHwgIWNjLmlzVmFsaWQoYnVzaC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1c2gubm9kZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGJ1c2gubm9kZS55KSArIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZW5lcmd5RWdncy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgZWdnID0gdGhpcy5fZW5lcmd5RWdnc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFlZ2cgfHwgIWVnZy5ub2RlIHx8ICFjYy5pc1ZhbGlkKGVnZy5ub2RlKSB8fCAhZWdnLnNjcmlwdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdncy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2VuZXJneUVnZ0J1c2hlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1c2ggPSB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJ1c2ggfHwgIWJ1c2gubm9kZSB8fCAhY2MuaXNWYWxpZChidXNoLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MudjIoZWdnLm5vZGUucG9zaXRpb24pLnN1YihidXNoLm5vZGUucG9zaXRpb24pLm1hZygpIDw9IGJ1c2gucmFkaXVzICogMC43OCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWdnLnNjcmlwdC5zZXRIaWRkZW5JbkJ1c2goaGlkZGVuKTtcclxuICAgICAgICAgICAgZWdnLm5vZGUuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlZ2cubm9kZS55KSArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpICYmIHRoaXMuX3BsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHVzaEVuZXJneUVnZ3NCeVBsYXllcih0aGlzLl9wbGF5ZXIuc2NyaXB0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3B1c2hFbmVyZ3lFZ2dzQnlQbGF5ZXIocGxheWVyKSB7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIgfHwgIXBsYXllci5ub2RlIHx8ICFjYy5pc1ZhbGlkKHBsYXllci5ub2RlKSB8fCBwbGF5ZXIuX2N1cnJlbnRTcGVlZCA8PSAwLjI1KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52MihwbGF5ZXIubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHBsYXllckRpciA9IHBsYXllci5fZGlyICYmIHBsYXllci5fZGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHBsYXllci5fZGlyKS5ub3JtYWxpemUoKSA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIGxldCBwbGF5ZXJSYWRpdXMgPSBwbGF5ZXIuZ2V0UmFkaXVzID8gcGxheWVyLmdldFJhZGl1cygpIDogMzg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lFZ2dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZ2cgPSB0aGlzLl9lbmVyZ3lFZ2dzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWVnZyB8fCAhZWdnLm5vZGUgfHwgIWNjLmlzVmFsaWQoZWdnLm5vZGUpIHx8ICFlZ2cuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGVnZ1BvcyA9IGNjLnYyKGVnZy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGVnZ1Bvcy5zdWIocGxheWVyUG9zKTtcclxuICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gcGxheWVyUmFkaXVzICogMC40OCArIGVnZy5zY3JpcHQuZ2V0UmFkaXVzKCkgKyA4O1xyXG4gICAgICAgICAgICBpZiAob2Zmc2V0Lm1hZygpID4gbWluRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcHVzaERpciA9IG9mZnNldC5tYWdTcXIoKSA+IDkgPyBvZmZzZXQubm9ybWFsaXplKCkgOiBwbGF5ZXJEaXI7XHJcbiAgICAgICAgICAgIGlmIChwdXNoRGlyLmRvdChwbGF5ZXJEaXIpIDwgLTAuMikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwdXNoRGlzdGFuY2UgPSBNYXRoLm1heCgxLjYsIHBsYXllci5fY3VycmVudFNwZWVkICogKGVnZy5zY3JpcHQuaXNNYXR1cmUoKSA/IDAuNDIgOiAwLjYyKSk7XHJcbiAgICAgICAgICAgIGxldCBuZXh0UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oZWdnUG9zLmFkZChwdXNoRGlyLm11bChwdXNoRGlzdGFuY2UpKSwgZWdnLnNjcmlwdC5nZXRSYWRpdXMoKSArIDgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKG5leHRQb3MsIGVnZy5zY3JpcHQuZ2V0UmFkaXVzKCkgKyAzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNFbmVyZ3lFZ2dCbG9ja2VkQnlPdGhlckVnZyhlZ2csIG5leHRQb3MpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWdnLm5vZGUuc2V0UG9zaXRpb24oY2MudjMobmV4dFBvcykpO1xyXG4gICAgICAgICAgICBlZ2cubm9kZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG5leHRQb3MueSkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaXNFbmVyZ3lFZ2dCbG9ja2VkQnlPdGhlckVnZyhjdXJyZW50RWdnLCBuZXh0UG9zKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lFZ2dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvdGhlciA9IHRoaXMuX2VuZXJneUVnZ3NbaV07XHJcbiAgICAgICAgICAgIGlmIChvdGhlciA9PSBjdXJyZW50RWdnIHx8ICFvdGhlciB8fCAhb3RoZXIubm9kZSB8fCAhY2MuaXNWYWxpZChvdGhlci5ub2RlKSB8fCAhb3RoZXIuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGltaXQgPSBjdXJyZW50RWdnLnNjcmlwdC5nZXRSYWRpdXMoKSArIG90aGVyLnNjcmlwdC5nZXRSYWRpdXMoKSArIDg7XHJcbiAgICAgICAgICAgIGlmIChjYy52MihvdGhlci5ub2RlLnBvc2l0aW9uKS5zdWIobmV4dFBvcykubWFnKCkgPCBsaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRWaWV3cG9ydFNpemUoKSB7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IFV0aWxzLmdldEN1cnJlbnRTY2VuZUNhbnZhcygpO1xyXG4gICAgICAgIGlmIChjYW52YXMgJiYgY2MuaXNWYWxpZChjYW52YXMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpc2libGVTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xyXG4gICAgICAgIGlmICh2aXNpYmxlU2l6ZSAmJiB2aXNpYmxlU2l6ZS53aWR0aCA+IDAgJiYgdmlzaWJsZVNpemUuaGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlzaWJsZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5eXAuZ2FtZUZyYW1lU2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4geXlwLmdhbWVGcmFtZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy53aW5TaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIHBhZGRpbmcgPSAwKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IGNjLnYyKHBvcyk7XHJcbiAgICAgICAgbGV0IGhhbGZXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMuX3RtU2l6ZS53aWR0aCAvIDIgLSBwYWRkaW5nKTtcclxuICAgICAgICBsZXQgaGFsZkhlaWdodCA9IE1hdGgubWF4KDAsIHRoaXMuX3RtU2l6ZS5oZWlnaHQgLyAyIC0gcGFkZGluZyk7XHJcblxyXG4gICAgICAgIGlmIChyZXQueCA8IC1oYWxmV2lkdGgpIHtcclxuICAgICAgICAgICAgcmV0LnggPSAtaGFsZldpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnggPiBoYWxmV2lkdGgpIHtcclxuICAgICAgICAgICAgcmV0LnggPSBoYWxmV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueSA8IC1oYWxmSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldC55ID0gLWhhbGZIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueSA+IGhhbGZIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSBoYWxmSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgX2NvcnJlY3RNYXBQb3NpdGlvbihyZXQpe1xyXG4gICAgICAgIGxldCB2aWV3cG9ydFNpemUgPSB0aGlzLl9nZXRWaWV3cG9ydFNpemUoKTtcclxuICAgICAgICBsZXQgeCA9IE1hdGgubWF4KDAsICh0aGlzLl90bVNpemUud2lkdGggLSB2aWV3cG9ydFNpemUud2lkdGgpIC8gMik7XHJcbiAgICAgICAgbGV0IHkgPSBNYXRoLm1heCgwLCAodGhpcy5fdG1TaXplLmhlaWdodCAtIHZpZXdwb3J0U2l6ZS5oZWlnaHQpIC8gMik7XHJcbiAgICAgICAgbGV0IG1pblBvcyA9IGNjLnYyKC14LC15KTtcclxuICAgICAgICBsZXQgbWF4UG9zID0gY2MudjIoeCx5KTtcclxuXHJcbiAgICAgICAgaWYgKHJldC54IDwgbWluUG9zLngpIHtcclxuICAgICAgICAgICAgcmV0LnggPSBtaW5Qb3MueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC54ID4gbWF4UG9zLngpIHtcclxuICAgICAgICAgICAgcmV0LnggPSBtYXhQb3MueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55IDwgbWluUG9zLnkpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSBtaW5Qb3MueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55ID4gbWF4UG9zLnkpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSBtYXhQb3MueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nur/mrrXkuI7nn6nlvaLnm7jkuqTmiJbogIXljIXlkKvlnKjnn6nlvaLph4zpnaJcclxuICAgIF9saW5lSW5SZWN0KEEsQixyZWN0KXtcclxuICAgICAgICBpZiAoKEEueCA+PSByZWN0LnggJiYgQS54IDw9IHJlY3QueCArIHJlY3Qud2lkdGggJiYgQS55ID49IHJlY3QueSAmJiBBLnkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQpIHx8XHJcbiAgICAgICAgICAgIChCLnggPj0gcmVjdC54ICYmIEIueCA8PSByZWN0LnggKyByZWN0LndpZHRoICYmIEIueSA+PSByZWN0LnkgJiYgQi55IDw9IHJlY3QueSArIHJlY3QuaGVpZ2h0KSB8fFxyXG4gICAgICAgICAgICBjYy5JbnRlcnNlY3Rpb24ubGluZVJlY3QoQSxCLHJlY3QpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WtkOW8uSzpmpznoo3niannorDmkp7mo4DmtYtcclxuICAgIGJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uVGVzdChQLFAxKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoUCwgUDEpICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50KFAsIFAxKSB7XHJcbiAgICAgICAgLy/ojrflj5bnorDmkp7ljLpcclxuICAgICAgICBsZXQgY3VyckFyZWEgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbG9naWNBcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5fbG9naWNBcmVhW2ldO1xyXG4gICAgICAgICAgICBpZiAoUC54ID49IGFyZWEueCAmJiBQLnggPD0gYXJlYS54ICsgYXJlYS53aWR0aCAmJiBQLnkgPj0gYXJlYS55ICYmIFAueSA8PSBhcmVhLnkgKyBhcmVhLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgY3VyckFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyQXJlYSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJBcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgQSA9IGN1cnJBcmVhW2ldLkE7XHJcbiAgICAgICAgICAgICAgICBsZXQgQiA9IGN1cnJBcmVhW2ldLkI7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLmxpbmVMaW5lKFAsUDEsQSxCKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7QTogQSwgQjogQn07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwi5pyq5om+5Yiw56Kw5pKe5YiG5Yy6XCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9kaXN0YW5jZVBvaW50VG9TZWdtZW50KHBvaW50LCBBLCBCKSB7XHJcbiAgICAgICAgbGV0IEFCID0gQi5zdWIoQSk7XHJcbiAgICAgICAgbGV0IGxlblNxciA9IEFCLm1hZ1NxcigpO1xyXG4gICAgICAgIGlmIChsZW5TcXIgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9pbnQuc3ViKEEpLm1hZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHQgPSBwb2ludC5zdWIoQSkuZG90KEFCKSAvIGxlblNxcjtcclxuICAgICAgICB0ID0gY2MubWlzYy5jbGFtcGYodCwgMCwgMSk7XHJcbiAgICAgICAgbGV0IHByb2plY3Rpb24gPSBBLmFkZChBQi5tdWwodCkpO1xyXG4gICAgICAgIHJldHVybiBwb2ludC5zdWIocHJvamVjdGlvbikubWFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFudXBJbnZhbGlkQ292ZXJUZXN0Q292ZXJzKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllciA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9jbGVhbnVwSW52YWxpZENvdmVyVGVzdENvdmVycygpO1xyXG4gICAgICAgIGxldCBvd25lck5vZGUgPSBwbGF5ZXIgJiYgcGxheWVyLm5vZGUgPyBwbGF5ZXIubm9kZSA6IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY292ZXIgJiYgY292ZXIuYXR0YWNoZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb3duZXJOb2RlIHx8IGNvdmVyLm93bmVyID09IG93bmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3ZlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0TmVhcmVzdEF0dGFjaGFibGVDb3ZlcihwbGF5ZXIpIHtcclxuICAgICAgICBpZiAoIXBsYXllciB8fCAhcGxheWVyLm5vZGUgfHwgIWNjLmlzVmFsaWQocGxheWVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYW51cEludmFsaWRDb3ZlclRlc3RDb3ZlcnMoKTtcclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIocGxheWVyLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBuZWFyZXN0ID0gbnVsbDtcclxuICAgICAgICBsZXQgbmVhcmVzdExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpIHx8IGNvdmVyLmF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGVuID0gcGxheWVyUG9zLnN1Yihjb3Zlci5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgaWYgKGxlbiA8PSAxMTAgJiYgKG5lYXJlc3QgPT0gbnVsbCB8fCBsZW4gPCBuZWFyZXN0TGVuKSkge1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdCA9IGNvdmVyO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdExlbiA9IGxlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmVhcmVzdDtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHBsYXllcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fY292ZXJUZXN0TW9kZSB8fCAhcGxheWVyIHx8ICFwbGF5ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChwbGF5ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXR0YWNoZWQgPSB0aGlzLl9nZXRBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllcik7XHJcbiAgICAgICAgaWYgKGF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6dHJ1ZSwgbW9kZTpcImRldGFjaFwifSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZWFyZXN0ID0gdGhpcy5fZ2V0TmVhcmVzdEF0dGFjaGFibGVDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ISFuZWFyZXN0LCBtb2RlOlwiYXR0YWNoXCJ9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlUb2dnbGVDb3ZlclRlc3RBdHRhY2htZW50KHBsYXllcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fY292ZXJUZXN0TW9kZSB8fCAhcGxheWVyIHx8ICFwbGF5ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChwbGF5ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGF0dGFjaGVkID0gdGhpcy5fZ2V0QXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIGlmIChhdHRhY2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXRhY2hDb3ZlclRlc3RDb3ZlcihhdHRhY2hlZCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaENvdmVyVGVzdEJ1dHRvbihwbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZWFyZXN0ID0gdGhpcy5fZ2V0TmVhcmVzdEF0dGFjaGFibGVDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIGlmICghbmVhcmVzdCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLl9zaG93U2FjcmlmaWNlVGlwKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuX3Nob3dTYWNyaWZpY2VUaXAoXCLpnaDov5HmjqnkvZPlkI7miY3og73lkLjpmYRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2F0dGFjaENvdmVyVGVzdENvdmVyKG5lYXJlc3QsIHBsYXllcik7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHBsYXllcik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgX2F0dGFjaENvdmVyVGVzdENvdmVyKGNvdmVyLCBwbGF5ZXIpIHtcclxuICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpIHx8ICFwbGF5ZXIgfHwgIXBsYXllci5ub2RlIHx8ICFjYy5pc1ZhbGlkKHBsYXllci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0ID0gY2MudjIoY292ZXIubm9kZS5wb3NpdGlvbikuc3ViKHBsYXllci5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBpZiAob2Zmc2V0Lm1hZ1NxcigpIDw9IDI1KSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHBsYXllci5fZGlyICYmIHBsYXllci5fZGlyLm1hZ1NxcigpID4gMCA/IHBsYXllci5fZGlyLm5vcm1hbGl6ZSgpLm11bCg3MCkgOiBjYy52Mig3MCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldC5ub3JtYWxpemUoKS5tdWwoTWF0aC5tYXgoNjAsIE1hdGgubWluKDg0LCBvZmZzZXQubWFnKCkpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3Zlci5hdHRhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgY292ZXIub3duZXIgPSBwbGF5ZXIubm9kZTtcclxuICAgICAgICBjb3Zlci5hdHRhY2hPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5zeW5jQXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXRhY2hDb3ZlclRlc3RDb3Zlcihjb3Zlcikge1xyXG4gICAgICAgIGlmICghY292ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb3Zlci5hdHRhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvdmVyLm93bmVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmb3JjZURldGFjaENvdmVyVGVzdEZyb21QbGF5ZXIocGxheWVyKSB7XHJcbiAgICAgICAgbGV0IGF0dGFjaGVkID0gdGhpcy5fZ2V0QXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIGlmIChhdHRhY2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXRhY2hDb3ZlclRlc3RDb3ZlcihhdHRhY2hlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgIH1cclxuXHJcbiAgICBzeW5jQXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvdmVyVGVzdE1vZGUgfHwgIXBsYXllciB8fCAhcGxheWVyLm5vZGUgfHwgIWNjLmlzVmFsaWQocGxheWVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3ZlciA9IHRoaXMuX2dldEF0dGFjaGVkQ292ZXJUZXN0Q292ZXIocGxheWVyKTtcclxuICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5hdHRhY2hPZmZzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHBsYXllci5ub2RlLnBvc2l0aW9uKS5hZGQoY292ZXIuYXR0YWNoT2Zmc2V0KTtcclxuICAgICAgICBwb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIGNvdmVyLnJhZGl1cyArIDYpO1xyXG4gICAgICAgIGNvdmVyLm5vZGUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgY292ZXIubm9kZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHBvcy55KSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5SGFuZGxlQ292ZXJCdWxsZXRDb2xsaXNpb24oZnJvbVBvcywgdG9Qb3MsIGJ1bGxldCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY292ZXJUZXN0TW9kZSB8fCAhYnVsbGV0IHx8IGJ1bGxldC5fY2FtcCAhPSBcImVuZW15XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYW51cEludmFsaWRDb3ZlclRlc3RDb3ZlcnMoKTtcclxuICAgICAgICBsZXQgaGl0Q292ZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBoaXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY292ZXJUZXN0Q292ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3ZlciA9IHRoaXMuX2NvdmVyVGVzdENvdmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFjb3ZlciB8fCAhY292ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChjb3Zlci5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gdGhpcy5fZGlzdGFuY2VQb2ludFRvU2VnbWVudChjYy52Mihjb3Zlci5ub2RlLnBvc2l0aW9uKSwgY2MudjIoZnJvbVBvcyksIGNjLnYyKHRvUG9zKSk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBjb3Zlci5yYWRpdXMgKyA0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gY2MudjIoY292ZXIubm9kZS5wb3NpdGlvbikuc3ViKGZyb21Qb3MpLm1hZ1NxcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpdENvdmVyID09IG51bGwgfHwgbGVuIDwgaGl0TGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGl0Q292ZXIgPSBjb3ZlcjtcclxuICAgICAgICAgICAgICAgICAgICBoaXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaGl0Q292ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlQ292ZXJUZXN0Q292ZXIoaGl0Q292ZXIsIGJ1bGxldCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgX2RhbWFnZUNvdmVyVGVzdENvdmVyKGNvdmVyLCBidWxsZXQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKCFjb3ZlciB8fCAhY292ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChjb3Zlci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3Zlci5ocCA9IE1hdGgubWF4KDAsIGNvdmVyLmhwIC0gMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaENvdmVyVGVzdENvdmVyVmlzdWFsKGNvdmVyKTtcclxuICAgICAgICB0aGlzLl9wbGF5Q292ZXJUZXN0SGl0RWZmZWN0KGNvdmVyKTtcclxuICAgICAgICBpZiAoYnVsbGV0KSB7XHJcbiAgICAgICAgICAgIGlmIChidWxsZXQuZG9EZXN0cm95KSB7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuZG9EZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYnVsbGV0Lm5vZGUgJiYgY2MuaXNWYWxpZChidWxsZXQubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdmVyLmhwIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYnJlYWtDb3ZlclRlc3RDb3Zlcihjb3Zlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikgJiYgdGhpcy5fcGxheWVyLnNjcmlwdCAmJiB0aGlzLl9jb3ZlclRlc3RNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaENvdmVyVGVzdEJ1dHRvbih0aGlzLl9wbGF5ZXIuc2NyaXB0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlDb3ZlclRlc3RIaXRFZmZlY3QoY292ZXIpIHtcclxuICAgICAgICBsZXQgZmxhc2ggPSBuZXcgY2MuTm9kZShcIl9jb3ZlckhpdEZ4XCIpO1xyXG4gICAgICAgIGZsYXNoLnBhcmVudCA9IGNvdmVyLm5vZGU7XHJcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDE5MDtcclxuICAgICAgICBmbGFzaC5zY2FsZSA9IDAuNzI7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZmxhc2guYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMjAsIDE2MCwgMjIwKTtcclxuICAgICAgICBncmFwaGljcy5yZWN0KC0yNCwgLTI0LCA0OCwgNDgpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGZsYXNoLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDgsIDEuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjA4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfYnJlYWtDb3ZlclRlc3RDb3Zlcihjb3Zlcikge1xyXG4gICAgICAgIGlmICghY292ZXIgfHwgIWNvdmVyLm5vZGUgfHwgIWNjLmlzVmFsaWQoY292ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJyZWFrUG9zID0gY2MudjIoY292ZXIubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoQ292ZXJUZXN0Q292ZXIoY292ZXIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaGFyZCA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyU2hhcmRcIik7XHJcbiAgICAgICAgICAgIHNoYXJkLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICAgICAgc2hhcmQuc2V0UG9zaXRpb24oY2MudjMoYnJlYWtQb3MpKTtcclxuICAgICAgICAgICAgc2hhcmQuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChicmVha1Bvcy55KSArIDM7XHJcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IHNoYXJkLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDE1OCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMyKSwgMTEyLCA2OCwgMjQwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MucmVjdCgtNSwgLTUsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSAqIDIgKiBpIC8gNiArIE1hdGgucmFuZG9tKCkgKiAwLjQ7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IDI2ICsgTWF0aC5yYW5kb20oKSAqIDIyO1xyXG4gICAgICAgICAgICBzaGFyZC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yMiwgTWF0aC5jb3MoYW5nbGUpICogZGlzdGFuY2UsIE1hdGguc2luKGFuZ2xlKSAqIGRpc3RhbmNlICsgMTApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KDAuMjIsIDE1MCArIE1hdGgucmFuZG9tKCkgKiAxODApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yMilcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3Zlci5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9jbGVhbnVwSW52YWxpZENvdmVyVGVzdENvdmVycygpO1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpICYmIHRoaXMuX3BsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHRoaXMuX3BsYXllci5zY3JpcHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cnlUZWxlcG9ydEJ1bGxldChidWxsZXQsIGZyb21Qb3MsIHRvUG9zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wb3J0YWxUZXN0TW9kZSB8fCAhYnVsbGV0IHx8ICF0aGlzLl9wb3J0YWxQYWlycyB8fCB0aGlzLl9wb3J0YWxQYWlycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaWdub3JlUG9ydGFsSWQgPSBidWxsZXQuZ2V0UG9ydGFsSWdub3JlSWQgPyBidWxsZXQuZ2V0UG9ydGFsSWdub3JlSWQoKSA6IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wb3J0YWxQYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcG9ydGFsID0gdGhpcy5fcG9ydGFsUGFpcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChwb3J0YWwuaWQgPT0gaWdub3JlUG9ydGFsSWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXN0YW5jZVBvaW50VG9TZWdtZW50KHBvcnRhbC5wb3MsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gcG9ydGFsLnJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBleGl0T2Zmc2V0ID0gYnVsbGV0Ll9kaXIgJiYgYnVsbGV0Ll9kaXIubWFnU3FyKCkgPiAwXHJcbiAgICAgICAgICAgICAgICA/IGJ1bGxldC5fZGlyLm5vcm1hbGl6ZSgpLm11bChwb3J0YWwucmFkaXVzICsgTWF0aC5tYXgoMTYsIGJ1bGxldC5fc3BlZWQgKiAxLjgpKVxyXG4gICAgICAgICAgICAgICAgOiBjYy52Mihwb3J0YWwucmFkaXVzICsgMTgsIDApO1xyXG4gICAgICAgICAgICBsZXQgZXhpdFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcnRhbC5leGl0UG9zLmFkZChleGl0T2Zmc2V0KSwgNDApO1xyXG4gICAgICAgICAgICBpZiAoYnVsbGV0LnRlbGVwb3J0QnlQb3J0YWwpIHtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC50ZWxlcG9ydEJ5UG9ydGFsKGV4aXRQb3MsIHBvcnRhbC5leGl0SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NwYXduUG9ydGFsV2FycEZ4KHBvcnRhbC5wb3MsIGNjLmNvbG9yKDExMCwgMjU1LCAyNDUsIDI1NSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGF3blBvcnRhbFdhcnBGeChwb3J0YWwuZXhpdFBvcywgY2MuY29sb3IoMjU1LCAxMjAsIDIyMCwgMjU1KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeUVudGVyQ2VudHJpZnVnYWxSaW5nKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX2NlbnRyaWZ1Z2FsUmluZ0RhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnVsbGV0Lmhhc1VzZWRDZW50cmlmdWdhbFJpbmcgJiYgYnVsbGV0Lmhhc1VzZWRDZW50cmlmdWdhbFJpbmcoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmluZyA9IHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ0RhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQocmluZy5jZW50ZXIsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gcmluZy50cmlnZ2VyUmFkaXVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJDZW50cmlmdWdhbFJpbmcgPyBidWxsZXQuZW50ZXJDZW50cmlmdWdhbFJpbmcocmluZykgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5a2Q5by5LOeisOaSnuajgOa1i1xyXG4gICAgYnVsbGV0RW5lbXlDb2xsaXNpb25UZXN0KFAsY2FtcCwgb3duZXJQbGF5ZXJJZCA9IC0xKXtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmIGNhbXAgPT0gXCJwbGF5ZXJcIikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX211bHRpcGxheWVyUGxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX211bHRpcGxheWVyUGxheWVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHBsYXllcikgfHwgaSA9PSBvd25lclBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gUC5zdWIocGxheWVyLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSBwbGF5ZXIuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FtcCA9PSBcInBsYXllclwiKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBQLnN1YihlbmVteS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gZW5lbXkuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmVteTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IFAuc3ViKHRoaXMuX3BsYXllci5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRSYWRpdXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPCByYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXHJcbiAgICBwbGF5ZXJTa2lsbEljb25Db2xsaXNpb25UZXN0KCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9za2lsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsID0gdGhpcy5fc2tpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChza2lsbCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZWN0ID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRQbGF5ZXJCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraWxsUmVjdCA9IHNraWxsLnNjcmlwdC5nZXRTa2lsbEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHBsYXllclJlY3Qsc2tpbGxSZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUgJiYgc2tpbGxbXCJfX3RhclBpY2t1cElkXCJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJtdWx0aXBsYXllci10YXItcGlja3VwXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY2t1cElkOiBza2lsbFtcIl9fdGFyUGlja3VwSWRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9za2lsbHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGxzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBsYXllckVuZXJneUNvbGxpc2lvblRlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWSjOiDvemHjyznorDmkp7mo4DmtYtcclxuICAgIHBsYXllckVuZXJneUNvbGxpc2lvblRlc3QoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX2VuZXJneXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbmVyZ3lTY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVyZ3lzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZWN0ID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRQbGF5ZXJCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZXJneVJlY3QgPSBlbmVyZ3lTY3JpcHQuZ2V0RW5lcmd5Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3QocGxheWVyUmVjdCwgZW5lcmd5UmVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVyZ3lJZCA9IGVuZXJneVtcIl9fZW5lcmd5SWRcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwibXVsdGlwbGF5ZXItZW5lcmd5LXBpY2t1cFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmVyZ3lJZDogZW5lcmd5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIuc2NyaXB0LmFkZEVuZXJneShlbmVyZ3lTY3JpcHQuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUVuZXJneShkdCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbmVyZ3lzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl9lbmVyZ3lzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneUNkVGltZSArPSBkdDtcclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJCb3JuSW50ZXJ2YWxcIiwgNCk7XHJcbiAgICAgICAgbGV0IG1heENvdW50ID0gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiTWF4Q291bnRcIiwgNik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUNkVGltZSA8IGludGVydmFsIHx8IHRoaXMuX2VuZXJneXMubGVuZ3RoID49IG1heENvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneUNkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFbmVyZ3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlU2luZ2xlUGxheWVyVGFyUGlja3VwKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSB8fCAhdGhpcy5fZ2FtaW5nIHx8ICF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9za2lsbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsID0gdGhpcy5fc2tpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoc2tpbGwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lsbHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNraWxsLm5hbWUgPT0gXCJPaWxQaWNrdXBcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl90YXJQaWNrdXBDZFRpbWUgKz0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhclBpY2t1cENkVGltZSA8IFRBUl9QSUNLVVBfU0lOR0xFUExBWUVSX0lOVEVSVkFMKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGFyUGlja3VwQ2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnNwYXduVGFyUGlja3VwQXQodGhpcy5fZ2V0T2lsVGVzdFBpY2t1cFBvcygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul3pJbmRleFxyXG4gICAganVkZ2V6SW5kZXgoeSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSBNYXRoLmZsb29yKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5ri45oiPXHJcbiAgICBzdGFydEdhbWUoZnVuYyl7XHJcbiAgICAgICAgLy/ojrflj5blhbPljaHmlbDmja5cclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gdGhpcy5fbGV2ZWxDb25maWcuRW5lbXlDb3VudCAqIHRoaXMuX2xldmVsSWQ7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSB0aGlzLl9sZXZlbENvbmZpZy5NYXggKyBNYXRoLmZsb29yKHRoaXMuX2xldmVsSWQvNSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90YXJQaWNrdXBDZFRpbWUgPSBUQVJfUElDS1VQX1NJTkdMRVBMQVlFUl9JTlRFUlZBTCAtIDEuMjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ3N0YXJ0X2dhbWUnLHtcImxldmVsXCI6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0S2lsbEVmZmVjdFRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVLaWxsRWZmZWN0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0S2lsbEJyb2FkY2FzdFRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDU7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSA1O1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gNTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6NX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVLaWxsQnJvYWRjYXN0VGVzdEVuZW1pZXMoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRQbGF5ZXJIaXRUZXN0R2FtZShmdW5jKXtcclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OjF9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVySGl0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNob290RWZmZWN0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNob290RWZmZWN0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0UG9ydGFsVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBvcnRhbFRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydENlbnRyaWZ1Z2FsUmluZ1Rlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDZW50cmlmdWdhbFJpbmdUZXN0U2V0dXAoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRDb3ZlclRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDb3ZlclRlc3RFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zcGF3bkNvdmVyVGVzdENvdmVycyg2KTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRFbmVyZ3lFZ2dUZXN0R2FtZShmdW5jKXtcclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OjB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlRW5lcmd5RWdnVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGFtYWdlRG91YmxlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZURhbWFnZURvdWJsZVRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNwZWVkRG91YmxlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNwZWVkRG91YmxlVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U3ByZWFkQnVsbGV0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNwcmVhZEJ1bGxldFRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEJvdW5jZU9ic3RhY2xlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QmxhY2tIb2xlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZUJsYWNrSG9sZVRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydENsdXN0ZXJCb21iVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTI7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxMjtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDEyO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxMn0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDbHVzdGVyQm9tYlRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Rlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgfHwgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlIHx8IHRoaXMuX3BsYXllckhpdFRlc3RNb2RlIHx8IHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSB8fCB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlIHx8IHRoaXMuX3BvcnRhbFRlc3RNb2RlIHx8IHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlIHx8IHRoaXMuX2NvdmVyVGVzdE1vZGUgfHwgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgfHwgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgfHwgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSB8fCB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSB8fCB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlIHx8IHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlIHx8IHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTaG9vdEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzS2lsbEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNLaWxsQnJvYWRjYXN0VGVzdE1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLaWxsRWZmZWN0VGVzdEVuZW15RGVhdGgoZW5lbXlOb2RlKSB7XHJcbiAgICAgICAgaWYgKCFlbmVteU5vZGUgfHwgIWNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVhdGhQb3MgPSBjYy52MihlbmVteU5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRW5lbXkoZW5lbXlOb2RlKTtcclxuICAgICAgICBpZiAoZW5lbXlOb2RlLnNjcmlwdCkge1xyXG4gICAgICAgICAgICBlbmVteU5vZGUuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5lbXlOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd0tpbGxTa3VsbChkZWF0aFBvcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93UGxheWVyQnViYmxlKFwi5bCx6L+Z77yfXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMTUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5S2lsbEV4cGxvc2lvbkVmZmVjdEF0KGRlYXRoUG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZChzZWxmLl9wbGF5ZXIpICYmIHNlbGYuX3BsYXllci5zY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAmJiBzZWxmLl9wbGF5ZXIuc2NyaXB0Ll9zcGF3bkRlYXRoQWZ0ZXJtYXRoQXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9wbGF5ZXIuc2NyaXB0Ll9zcGF3bkRlYXRoQWZ0ZXJtYXRoQXQoZGVhdGhQb3MsIHNlbGYuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kcm9wVGVzdEVuZXJneShkZWF0aFBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChlbmVteU5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLaWxsQnJvYWRjYXN0VGVzdEVuZW15RGVhdGgoZW5lbXlOb2RlKSB7XHJcbiAgICAgICAgaWYgKCFlbmVteU5vZGUgfHwgIWNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVhdGhQb3MgPSBjYy52MihlbmVteU5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCB2aWN0aW1OYW1lID0gZW5lbXlOb2RlW1wiX2tpbGxWaWN0aW1OYW1lXCJdIHx8IFwi5pWM5pa55Z2m5YWLXCI7XHJcbiAgICAgICAgbGV0IHN0cmVhayA9IHRoaXMuX3JlY29yZEtpbGxTdHJlYWsoKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZUVuZW15KGVuZW15Tm9kZSk7XHJcbiAgICAgICAgaWYgKGVuZW15Tm9kZS5zY3JpcHQpIHtcclxuICAgICAgICAgICAgZW5lbXlOb2RlLnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZW15Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dLaWxsU2t1bGwoZGVhdGhQb3MpO1xyXG4gICAgICAgIHRoaXMuX3B1c2hLaWxsQnJvYWRjYXN0KFwi5oiR5Ye75p2A5LqGXCIgKyB2aWN0aW1OYW1lKTtcclxuICAgICAgICB0aGlzLl9zaG93S2lsbEJhZGdlU3RhbXAoc3RyZWFrKTtcclxuICAgICAgICBpZiAoc3RyZWFrID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckJ1YmJsZShcIuaIkeWcqGNhcnJ5XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjE1KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChkZWF0aFBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fcGxheWVyICYmIGNjLmlzVmFsaWQoc2VsZi5fcGxheWVyKSAmJiBzZWxmLl9wbGF5ZXIuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KGRlYXRoUG9zLCBzZWxmLl9maXJlLl90bUxheWVyT2JzdGFjbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dLaWxsU2t1bGwocG9zKSB7XHJcbiAgICAgICAgbGV0IHNrdWxsID0gbmV3IGNjLk5vZGUoXCJfa2lsbFNrdWxsXCIpO1xyXG4gICAgICAgIHNrdWxsLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBza3VsbC5zZXRQb3NpdGlvbihjYy52Myhwb3MueCwgcG9zLnkgKyA4NSwgMCkpO1xyXG4gICAgICAgIHNrdWxsLnpJbmRleCA9IDYwMDA7XHJcbiAgICAgICAgc2t1bGwub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgc2t1bGwuc2NhbGUgPSAxO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IHNrdWxsLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLwn5KAXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSA0ODtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNTI7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgc2t1bGwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEsIDAsIDM0KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMC41KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4zKSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfZHJvcFRlc3RFbmVyZ3kocG9zKSB7XHJcbiAgICAgICAgbGV0IGZyb21Qb3MgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGxldCB0b1BvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGZyb21Qb3MuYWRkKGNjLnYyKDcwLCAzNSkpLCA0MCk7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuY3JlYXRlRW5lcmd5QXQoZnJvbVBvcyk7XHJcbiAgICAgICAgZW5lcmd5LnNjYWxlID0gMC4yO1xyXG4gICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yOCwgMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygwLjM1LCB0b1BvcywgNDIsIDEpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQbGF5ZXJCdWJibGUodGV4dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1YmJsZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCdWJibGVcIik7XHJcbiAgICAgICAgYnViYmxlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBidWJibGUuc2V0UG9zaXRpb24oY2MudjModGhpcy5fcGxheWVyLngsIHRoaXMuX3BsYXllci55ICsgMTA1LCAwKSk7XHJcbiAgICAgICAgYnViYmxlLnpJbmRleCA9IDYwMDA7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IGJ1YmJsZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC01OCwgLTI0LCAxMTYsIDQ4LCAxMik7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG4gICAgICAgIGJnLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNDAsIDQwLCA0MCwgMjQwKTtcclxuICAgICAgICBiZy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtNTgsIC0yNCwgMTE2LCA0OCwgMTIpO1xyXG4gICAgICAgIGJnLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJCdWJibGVcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ1YmJsZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTE2LCA0OCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyMCwgMjAsIDIwKTtcclxuXHJcbiAgICAgICAgYnViYmxlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oY2MubW92ZUJ5KDAuMTUsIDAsIDEyKSwgY2MuZmFkZUluKDAuMTUpKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjUpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2hha2VNYXAoKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAxKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDMpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgMCwgLTMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAyKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIC00LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDIsIDEpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMCwgLTEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlMaWdodFNjcmVlblNoYWtlKCkge1xyXG4gICAgICAgIGxldCBvcmlnaW4gPSBjYy52Myh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTEwMyk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMiwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAtNCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAxKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDAsIC0xKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDkxMDMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rue7k+adn1xyXG4gICAgc2V0RmluaXNoKCl7XHJcbiAgICAgICAgdGhpcy5fZ2FtaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYW5NYXAoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9nYW1pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyUGxheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyU3BlY2lhbEV2ZW50TWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTcGF3blNsb3RzID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTYWZlWm9uZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9jbGVhclBvcnRhbFRlc3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQ2VudHJpZnVnYWxSaW5nVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJEYW1hZ2VEb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhclNwZWVkRG91YmxlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcHJlYWRCdWxsZXRUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhckJvdW5jZU9ic3RhY2xlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJCbGFja0hvbGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhck11bHRpcGxheWVyU2FmZVpvbmVOb2RlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpe1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGVuZW15LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2tpbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbCA9IHRoaXMuX3NraWxsc1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoc2tpbGwpKSB7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2tpbGxzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5fZW5lcmd5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lcmd5KSkge1xyXG4gICAgICAgICAgICAgICAgZW5lcmd5LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbmVyZ3lzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vaWxTcGlsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNwaWxsID0gdGhpcy5fb2lsU3BpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoc3BpbGwgJiYgc3BpbGwubm9kZSAmJiBjYy5pc1ZhbGlkKHNwaWxsLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBzcGlsbC5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vaWxTcGlsbHMgPSBbXTtcclxuICAgICAgICB0aGlzLmhpZGVPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RFbmVteSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lFZ2dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZ2cgPSB0aGlzLl9lbmVyZ3lFZ2dzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZWdnICYmIGVnZy5ub2RlICYmIGNjLmlzVmFsaWQoZWdnLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBlZ2cubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5RWdnQnVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidXNoID0gdGhpcy5fZW5lcmd5RWdnQnVzaGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYnVzaCAmJiBidXNoLm5vZGUgJiYgY2MuaXNWYWxpZChidXNoLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBidXNoLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ0J1c2hlcyA9IFtdO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUNkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJSdW50aW1lTWFwTm9kZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJSdW50aW1lTWFwTm9kZXMoKXtcclxuICAgICAgICBpZiAodGhpcy5fdG1EZWNhbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3RtRGVjYWwpKSB7XHJcbiAgICAgICAgICAgIGxldCBkZWNhbENoaWxkcmVuID0gdGhpcy5fdG1EZWNhbC5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlY2FsQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IGRlY2FsQ2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBydW50aW1lTmFtZXMgPSB7XHJcbiAgICAgICAgICAgIFwiUGxheWVyXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiRW5lbXlcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJCdWxsZXRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJCb29tXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiU2tpbGxJY29uXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiT2lsUGlja3VwXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiRW5lcmd5SXRlbVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9raWxsU2t1bGxcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfa2lsbEJ1YmJsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl91cGdyYWRlRmxvYXRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfYnVsbGV0TXV0YXRpb25NZWRhbFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9wb3J0YWxHYXRlQVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9wb3J0YWxHYXRlQlwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9wb3J0YWxMaW5rRnhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfcG9ydGFsSGludExhYmVsXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3BvcnRhbFdhcnBGeFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jZW50cmlmdWdhbFJpbmdcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY2VudHJpZnVnYWxSaW5nSGludFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jZW50cmlmdWdhbFJpbmdHdWlkZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jZW50cmlmdWdhbFJpbmdGeFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9vaWxTcGlsbFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jb3ZlclRlc3RDcmF0ZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jb3ZlclRlc3RDcmF0ZVNoYWRvd1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jb3ZlckhpdEZ4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NvdmVyU2hhcmRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJFbmVyZ3lFZ2dcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfZW5lcmd5RWdnQnVzaFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9lbmVyZ3lFZ2dCdXNoU2hhZG93XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2VuZXJneUVnZ0xlYWZcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfZW5lcmd5RWdnQnVzaENvcmVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfZGFtYWdlRG91YmxlQXJlYVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9kYW1hZ2VEb3VibGVGeFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9zcGVlZERvdWJsZUFyZWFcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfc3BlZWREb3VibGVGeFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9zcHJlYWRCdWxsZXRBcmVhXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3NwcmVhZEJ1bGxldEZ4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2JvdW5jZU9ic3RhY2xlQ2lyY2xlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2JvdW5jZU9ic3RhY2xlTGluZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9ibGFja0hvbGVBcmVhXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2JsYWNrSG9sZUZ4XCI6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGNoaWxkKSAmJiBydW50aW1lTmFtZXNbY2hpbGQubmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX2dldE11bHRpcGxheWVyU3Bhd25DYW5kaWRhdGVzKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5fcGxheWVyQm9yblBvcykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChjYy52Mih0aGlzLl9wbGF5ZXJCb3JuUG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlCb3JuUG9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLl9lbmVteUJvcm5Qb3NbaV07XHJcbiAgICAgICAgICAgIGlmIChwb3MpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNjLnYyKHBvcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc29sdmVNdWx0aXBsYXllclNwYXduUG9zaXRpb24ocGxheWVySWR4LCBwbGF5ZXJDb3VudCkge1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGVzID0gdGhpcy5fZ2V0TXVsdGlwbGF5ZXJTcGF3bkNhbmRpZGF0ZXMoKTtcclxuICAgICAgICBpZiAoY2FuZGlkYXRlcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICBsZXQgc3Bhd25PZmZzZXQgPSBjYy52MigocGxheWVySWR4IC0gKHBsYXllckNvdW50IC0gMSkgLyAyKSAqIDE4MCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbih0aGlzLl9wbGF5ZXJCb3JuUG9zLmFkZChzcGF3bk9mZnNldCksIDYwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzbG90ID0gdGhpcy5fbXVsdGlwbGF5ZXJTcGF3blNsb3RzW3BsYXllcklkeF07XHJcbiAgICAgICAgbGV0IGluZGV4ID0gc2xvdCA9PSBudWxsID8gcGxheWVySWR4IDogc2xvdDtcclxuICAgICAgICBsZXQgY2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpbmRleCAlIGNhbmRpZGF0ZXMubGVuZ3RoXTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2FuZGlkYXRlLCA4MCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTXVsdGlwbGF5ZXJQbGF5ZXIocGxheWVySWR4LCBwbGF5ZXJDb3VudCwgcGxheWVyU3RhdGUgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHBsYXllclR5cGUgPSBwbGF5ZXJTdGF0ZSAmJiBwbGF5ZXJTdGF0ZS50YW5rVHlwZSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gcGxheWVyU3RhdGUudGFua1R5cGVcclxuICAgICAgICAgICAgOiBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfY3VycmVudF9wbGF5ZXJfdHlwZV9cIiwxKTtcclxuICAgICAgICBsZXQgcGxheWVyTGV2ZWwgPSBwbGF5ZXJTdGF0ZSAmJiBwbGF5ZXJTdGF0ZS5wbGF5ZXJMZXZlbCAhPSBudWxsXHJcbiAgICAgICAgICAgID8gcGxheWVyU3RhdGUucGxheWVyTGV2ZWxcclxuICAgICAgICAgICAgOiBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9wbGF5ZXJfJHtwbGF5ZXJUeXBlfV9gLCAxKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiKTtcclxuICAgICAgICBwbGF5ZXIucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHBsYXllci56SW5kZXggPSAxMDA7XHJcblxyXG4gICAgICAgIGxldCBzcGF3blBvcyA9IHRoaXMuX3Jlc29sdmVNdWx0aXBsYXllclNwYXduUG9zaXRpb24ocGxheWVySWR4LCBwbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgcGxheWVyLnBvc2l0aW9uID0gY2MudjMoc3Bhd25Qb3MpO1xyXG4gICAgICAgIHBsYXllci5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIHBsYXllci5zY3JpcHQuc2V0UGxheWVyVHlwZShwbGF5ZXJUeXBlLCBwbGF5ZXJMZXZlbCk7XHJcbiAgICAgICAgcGxheWVyLnNjcmlwdC5zZXRJbkdhbWUoKTtcclxuICAgICAgICBwbGF5ZXIuc2NyaXB0Ll9tdWx0aXBsYXllclBsYXllcklkID0gcGxheWVySWR4O1xyXG4gICAgICAgIHBsYXllcltcIl9fbXVsdGlwbGF5ZXJQbGF5ZXJJZFwiXSA9IHBsYXllcklkeDtcclxuXHJcbiAgICAgICAgLy8gTWFyayByZW1vdGUgcGxheWVycyAobm8gVUkgY29udHJvbHMpXHJcbiAgICAgICAgaWYgKHBsYXllcklkeCAhPT0gdGhpcy5fbG9jYWxQbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2NyaXB0Ll9tdWx0aXBsYXllclJlbW90ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXllci5zY3JpcHQuX211bHRpcGxheWVyTW9kZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHBsYXllclN0YXRlICYmIHBsYXllci5zY3JpcHQuc3luY011bHRpcGxheWVyU3RhdGUpIHtcclxuICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5zeW5jTXVsdGlwbGF5ZXJTdGF0ZShwbGF5ZXJTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWaXN1YWxseSBkaXN0aW5ndWlzaCBwbGF5ZXJzOiBQMD1ncmVlbiB0aW50LCBQMT1ibHVlIHRpbnRcclxuICAgICAgICBsZXQgY29sb3JUaW50ID0gcGxheWVySWR4ID09PSB0aGlzLl9sb2NhbFBsYXllcklkID8gY2MuY29sb3IoMTgwLCAyNTUsIDE4MCwgMjU1KSA6IGNjLmNvbG9yKDE2MCwgMjAwLCAyNTUsIDI1NSk7XHJcbiAgICAgICAgbGV0IHRyeU5hbWVzID0gWydfc3ByQmcxJywgJ19zcHJCZzInLCAnX3NwckJnMycsICdfc3ByQmc0JywgJ19zcHJCZyddO1xyXG4gICAgICAgIHRyeU5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaXJlUmVmcyA9IHBsYXllcltcIl9maXJlXCJdO1xyXG4gICAgICAgICAgICBsZXQgbiA9IGZpcmVSZWZzID8gZmlyZVJlZnNbbmFtZV0gOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAobiAmJiBjYy5pc1ZhbGlkKG4pKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkgeyBuLmNvbG9yID0gY29sb3JUaW50OyB9IGNhdGNoIChlKSB7fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHBsYXllci5zY3JpcHQgJiYgcGxheWVyLnNjcmlwdC5zZXRNdWx0aXBsYXllckRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5zY3JpcHQuc2V0TXVsdGlwbGF5ZXJEaXNwbGF5TmFtZShcInBsYXllclwiICsgKHBsYXllcklkeCArIDEpLCBwbGF5ZXJJZHggPT09IHRoaXMuX2xvY2FsUGxheWVySWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJzW3BsYXllcklkeF0gPSBwbGF5ZXI7XHJcbiAgICAgICAgaWYgKHBsYXllcklkeCA9PT0gdGhpcy5fbG9jYWxQbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRNdWx0aXBsYXllckdhbWUocGxheWVyQ291bnQsIGxvY2FsUGxheWVySWQsIHNwYXduU2xvdHMsIGVuZXJnaWVzLCBwbGF5ZXJzLCBzcGVjaWFsRXZlbnRzLCB0YXJQaWNrdXBzLCB0YXJTcGlsbHMsIHNhZmVab25lLCBvblJlYWR5KSB7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclBsYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldHMgPSB7fTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckVuZXJneU1hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTcGVjaWFsRXZlbnRNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclBpY2t1cE1hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyU3BpbGxNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclNhZmVab25lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclNhZmVab25lTm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcGVuZGluZ1RhclRocm93TWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fbG9jYWxQbGF5ZXJJZCA9IGxvY2FsUGxheWVySWQgPT0gbnVsbCA/IDAgOiBsb2NhbFBsYXllcklkO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyU3Bhd25TbG90cyA9IHNwYXduU2xvdHMgPyBzcGF3blNsb3RzLnNsaWNlKCkgOiBbXTtcclxuICAgICAgICBsZXQgcGxheWVyU3RhdGVzID0gQXJyYXkuaXNBcnJheShwbGF5ZXJzKSA/IHBsYXllcnMgOiBbXTtcclxuICAgICAgICBsZXQgaW5pdGlhbFNwZWNpYWxFdmVudHMgPSBBcnJheS5pc0FycmF5KHNwZWNpYWxFdmVudHMpID8gc3BlY2lhbEV2ZW50cyA6IFtdO1xyXG4gICAgICAgIGxldCBpbml0aWFsVGFyUGlja3VwcyA9IEFycmF5LmlzQXJyYXkodGFyUGlja3VwcykgPyB0YXJQaWNrdXBzIDogW107XHJcbiAgICAgICAgbGV0IGluaXRpYWxUYXJTcGlsbHMgPSBBcnJheS5pc0FycmF5KHRhclNwaWxscykgPyB0YXJTcGlsbHMgOiBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQWxsVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsIC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMiwgd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlTXVsdGlwbGF5ZXJQbGF5ZXIoaSwgcGxheWVyQ291bnQsIHBsYXllclN0YXRlc1tpXSB8fCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsRW5lcmdpZXMgPSBlbmVyZ2llcyB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbEVuZXJnaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbk11bHRpcGxheWVyRW5lcmd5U3Bhd24oaW5pdGlhbEVuZXJnaWVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbFNwZWNpYWxFdmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9hcHBseU11bHRpcGxheWVyU3BlY2lhbEV2ZW50U3Bhd24oaW5pdGlhbFNwZWNpYWxFdmVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsVGFyUGlja3Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3NwYXduTXVsdGlwbGF5ZXJUYXJQaWNrdXAoaW5pdGlhbFRhclBpY2t1cHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsVGFyU3BpbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc3Bhd25NdWx0aXBsYXllclRhclNwaWxsKGluaXRpYWxUYXJTcGlsbHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYXBwbHlNdWx0aXBsYXllclNhZmVab25lU3RhdGUoc2FmZVpvbmUgfHwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2VudGVyIGNhbWVyYSBvbiBsb2NhbCBwbGF5ZXIgaW1tZWRpYXRlbHlcclxuICAgICAgICAgICAgICAgIHNlbGYuX2NlbnRlck9uTG9jYWxQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChvblJlYWR5KSBvblJlYWR5KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2ltdWxhdGVGcmFtZShmcmFtZURhdGEpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBjb21tYW5kcyA9IGZyYW1lRGF0YSAmJiBBcnJheS5pc0FycmF5KGZyYW1lRGF0YS5jb21tYW5kcykgPyBmcmFtZURhdGEuY29tbWFuZHMgOiBbXTtcclxuICAgICAgICB0aGlzLl9hcHBseU11bHRpcGxheWVyRnJhbWVDb21tYW5kcyhjb21tYW5kcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NlbnRlck9uTG9jYWxQbGF5ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBfYXBwbHlNdWx0aXBsYXllckZyYW1lQ29tbWFuZHMoY29tbWFuZHMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb21tYW5kID0gY29tbWFuZHNbaV07XHJcbiAgICAgICAgICAgIGlmICghY29tbWFuZCB8fCAhY29tbWFuZC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSBcImh1ZFN0YXRlXCIgfHwgY29tbWFuZC50eXBlID09PSBcImFubm91bmNlbWVudFwiIHx8IGNvbW1hbmQudHlwZSA9PT0gXCJtYXRjaFJlc3VsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSBcInBsYXllcklucHV0XCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9tdWx0aXBsYXllclBsYXllcnNbY29tbWFuZC5wbGF5ZXJJZF07XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyICYmIGNjLmlzVmFsaWQocGxheWVyKSAmJiBwbGF5ZXIuc2NyaXB0ICYmIHBsYXllci5zY3JpcHQuc2V0RnJhbWVJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5zY3JpcHQuc2V0RnJhbWVJbnB1dChjb21tYW5kLmlucHV0cyB8fCB7fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcInBsYXllclN0YXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9tdWx0aXBsYXllclBsYXllcnNbY29tbWFuZC5wbGF5ZXJJZF07XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyICYmIGNjLmlzVmFsaWQocGxheWVyKSAmJiBwbGF5ZXIuc2NyaXB0ICYmIHBsYXllci5zY3JpcHQuc3luY011bHRpcGxheWVyU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LnN5bmNNdWx0aXBsYXllclN0YXRlKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJwbGF5ZXJIaXRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseU11bHRpcGxheWVySGl0KGNvbW1hbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJlbmVyZ3lTcGF3blwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTXVsdGlwbGF5ZXJFbmVyZ3lTcGF3bihjb21tYW5kLmVuZXJneSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcImVuZXJneUNvbnN1bWVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk11bHRpcGxheWVyRW5lcmd5UmVtb3ZlKGNvbW1hbmQuZW5lcmd5SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJwbGF5ZXJVcGdyYWRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NdWx0aXBsYXllclBsYXllclVwZ3JhZGUoY29tbWFuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcImVuZXJneUVnZ1NwYXduXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwYXduTXVsdGlwbGF5ZXJFbmVyZ3lFZ2coY29tbWFuZC5lZ2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJlbmVyZ3lFZ2dNb3ZlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVNdWx0aXBsYXllckVuZXJneUVnZyhjb21tYW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09IFwiZW5lcmd5RWdnTWF0dXJlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdHVyZU11bHRpcGxheWVyRW5lcmd5RWdnKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJlbmVyZ3lFZ2dSZW1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlTXVsdGlwbGF5ZXJFbmVyZ3lFZ2coY29tbWFuZC5lZ2dJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcInNwZWNpYWxFdmVudFNwYXduXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5TXVsdGlwbGF5ZXJTcGVjaWFsRXZlbnRTcGF3bihjb21tYW5kLmV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09IFwic3BlY2lhbEV2ZW50UmVtb3ZlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5TXVsdGlwbGF5ZXJTcGVjaWFsRXZlbnRSZW1vdmUoY29tbWFuZC5ldmVudElkLCBjb21tYW5kLmV2ZW50VHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcInRhclBpY2t1cFNwYXduXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwYXduTXVsdGlwbGF5ZXJUYXJQaWNrdXAoY29tbWFuZC5waWNrdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJ0YXJQaWNrdXBSZW1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlTXVsdGlwbGF5ZXJUYXJQaWNrdXAoY29tbWFuZC5waWNrdXBJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcInRhclRocm93XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlNdWx0aXBsYXllclRhclRocm93KGNvbW1hbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJ0YXJTcGlsbFNwYXduXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwYXduTXVsdGlwbGF5ZXJUYXJTcGlsbChjb21tYW5kLnNwaWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09IFwidGFyU3BpbGxSZW1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlTXVsdGlwbGF5ZXJUYXJTcGlsbChjb21tYW5kLnNwaWxsSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJzYWZlWm9uZVN0YXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5TXVsdGlwbGF5ZXJTYWZlWm9uZVN0YXRlKGNvbW1hbmQuc2FmZVpvbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJzYWZlWm9uZURhbWFnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseU11bHRpcGxheWVyU2FmZVpvbmVEYW1hZ2UoY29tbWFuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduTXVsdGlwbGF5ZXJUYXJQaWNrdXAocGlja3VwRGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFwaWNrdXBEYXRhIHx8IHBpY2t1cERhdGEuaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllclRhclBpY2t1cE1hcFtwaWNrdXBEYXRhLmlkXSAmJiBjYy5pc1ZhbGlkKHRoaXMuX211bHRpcGxheWVyVGFyUGlja3VwTWFwW3BpY2t1cERhdGEuaWRdKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwaWNrdXAgPSB0aGlzLnNwYXduVGFyUGlja3VwQXQoY2MudjIocGlja3VwRGF0YS54IHx8IDAsIHBpY2t1cERhdGEueSB8fCAwKSwgcGlja3VwRGF0YS5pZCk7XHJcbiAgICAgICAgaWYgKHBpY2t1cCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclBpY2t1cE1hcFtwaWNrdXBEYXRhLmlkXSA9IHBpY2t1cDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3JlbW92ZU11bHRpcGxheWVyVGFyUGlja3VwKHBpY2t1cElkKSB7XHJcbiAgICAgICAgaWYgKHBpY2t1cElkID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGlja3VwID0gdGhpcy5fbXVsdGlwbGF5ZXJUYXJQaWNrdXBNYXBbcGlja3VwSWRdO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9tdWx0aXBsYXllclRhclBpY2t1cE1hcFtwaWNrdXBJZF07XHJcbiAgICAgICAgaWYgKCFwaWNrdXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fc2tpbGxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9za2lsbHNbaV0gPT09IHBpY2t1cCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGxzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYy5pc1ZhbGlkKHBpY2t1cCkpIHtcclxuICAgICAgICAgICAgcGlja3VwLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduTXVsdGlwbGF5ZXJUYXJTcGlsbChzcGlsbERhdGEpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCAhc3BpbGxEYXRhIHx8IHNwaWxsRGF0YS5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBlbmRpbmdUaHJvdyA9IHRoaXMuX3BlbmRpbmdUYXJUaHJvd01hcFtzcGlsbERhdGEuaWRdO1xyXG4gICAgICAgIGlmIChwZW5kaW5nVGhyb3cpIHtcclxuICAgICAgICAgICAgcGVuZGluZ1Rocm93LnNwaWxsRGF0YSA9IHNwaWxsRGF0YTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJUYXJTcGlsbE1hcFtzcGlsbERhdGEuaWRdICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJUYXJTcGlsbE1hcFtzcGlsbERhdGEuaWRdKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5zcGF3bk9pbFNwaWxsKGNjLnYyKHNwaWxsRGF0YS54IHx8IDAsIHNwaWxsRGF0YS55IHx8IDApLCB7XHJcbiAgICAgICAgICAgIHJhZGl1czogc3BpbGxEYXRhLnJhZGl1cyxcclxuICAgICAgICAgICAgZHVyYXRpb246IHNwaWxsRGF0YS5yZW1haW5UaW1lIHx8IHNwaWxsRGF0YS5kdXJhdGlvbixcclxuICAgICAgICAgICAgc2xvd0ZhY3Rvcjogc3BpbGxEYXRhLnNsb3dGYWN0b3IsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgbm9kZVtcIl9fdGFyU3BpbGxJZFwiXSA9IHNwaWxsRGF0YS5pZDtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJTcGlsbE1hcFtzcGlsbERhdGEuaWRdID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3JlbW92ZU11bHRpcGxheWVyVGFyU3BpbGwoc3BpbGxJZCkge1xyXG4gICAgICAgIGlmIChzcGlsbElkID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX211bHRpcGxheWVyVGFyU3BpbGxNYXBbc3BpbGxJZF07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX211bHRpcGxheWVyVGFyU3BpbGxNYXBbc3BpbGxJZF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX29pbFNwaWxscy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgc3BpbGwgPSB0aGlzLl9vaWxTcGlsbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChzcGlsbCAmJiBzcGlsbC5ub2RlID09PSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vaWxTcGlsbHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgY2MuaXNWYWxpZChub2RlKSkge1xyXG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlNdWx0aXBsYXllclRhclRocm93KGNvbW1hbmQpIHtcclxuICAgICAgICBpZiAoIWNvbW1hbmQgfHwgIWNvbW1hbmQuZnJvbSB8fCAhY29tbWFuZC50bykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLnNwaWxsSWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nVGFyVGhyb3dNYXBbY29tbWFuZC5zcGlsbElkXSA9IHRoaXMuX3BlbmRpbmdUYXJUaHJvd01hcFtjb21tYW5kLnNwaWxsSWRdIHx8IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5wbGF5T2lsU2hlbGxUaHJvdyhjYy52Mihjb21tYW5kLmZyb20pLCBjYy52Mihjb21tYW5kLnRvKSwge1xyXG4gICAgICAgICAgICBhcmVhUmFkaXVzOiBUQVJfU1BJTExfUkFESVVTLFxyXG4gICAgICAgICAgICBhcmNIZWlnaHQ6IDExMCxcclxuICAgICAgICAgICAgb25MYW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5zcGlsbElkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVuZGluZ1Rocm93ID0gc2VsZi5fcGVuZGluZ1RhclRocm93TWFwW2NvbW1hbmQuc3BpbGxJZF07XHJcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ1Rocm93ICYmIHBlbmRpbmdUaHJvdy5zcGlsbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BpbGxEYXRhID0gcGVuZGluZ1Rocm93LnNwaWxsRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc2VsZi5fcGVuZGluZ1RhclRocm93TWFwW2NvbW1hbmQuc3BpbGxJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc3Bhd25NdWx0aXBsYXllclRhclNwaWxsKHNwaWxsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLl9wZW5kaW5nVGFyVGhyb3dNYXBbY29tbWFuZC5zcGlsbElkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTXVsdGlwbGF5ZXJFbmVyZ3lTcGF3bihlbmVyZ3lEYXRhKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgIWVuZXJneURhdGEgfHwgZW5lcmd5RGF0YS5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyRW5lcmd5TWFwW2VuZXJneURhdGEuaWRdICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJFbmVyZ3lNYXBbZW5lcmd5RGF0YS5pZF0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFbmVyZ3lBdEZvck11bHRpcGxheWVyKGVuZXJneURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTXVsdGlwbGF5ZXJFbmVyZ3lSZW1vdmUoZW5lcmd5SWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCBlbmVyZ3lJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX211bHRpcGxheWVyRW5lcmd5TWFwW2VuZXJneUlkXTtcclxuICAgICAgICBkZWxldGUgdGhpcy5fbXVsdGlwbGF5ZXJFbmVyZ3lNYXBbZW5lcmd5SWRdO1xyXG4gICAgICAgIGlmICghZW5lcmd5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VuZXJneXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2VuZXJneXNbaV0gPT09IGVuZXJneSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2MuaXNWYWxpZChlbmVyZ3kpKSB7XHJcbiAgICAgICAgICAgIGVuZXJneS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTXVsdGlwbGF5ZXJQbGF5ZXJVcGdyYWRlKHBheWxvYWQpIHtcclxuICAgICAgICAvLyDljYfnuqfooajnjrDnu5/kuIDnlLHnjqnlrrbnirbmgIHlkIzmraXop6blj5HvvIzpgb/lhY3mtojmga/lhYjlkI7pobrluo/lr7zoh7TkuKLooajnjrDmiJbph43lpI3ooajnjrDjgIJcclxuICAgIH1cclxuXHJcbiAgICBpc011bHRpcGxheWVyTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGF5ZXJNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvY2FsUGxheWVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsUGxheWVySWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldChidWxsZXRJZCwgYnVsbGV0Tm9kZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFidWxsZXRJZCB8fCAhYnVsbGV0Tm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0c1tidWxsZXRJZF0gPSBidWxsZXROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHVucmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldChidWxsZXRJZCwgYnVsbGV0Tm9kZSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIWJ1bGxldElkIHx8ICF0aGlzLl9tdWx0aXBsYXllckJ1bGxldHNbYnVsbGV0SWRdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFidWxsZXROb2RlIHx8IHRoaXMuX211bHRpcGxheWVyQnVsbGV0c1tidWxsZXRJZF0gPT09IGJ1bGxldE5vZGUpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX211bHRpcGxheWVyQnVsbGV0c1tidWxsZXRJZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcG9ydE11bHRpcGxheWVyQnVsbGV0SGl0KGJ1bGxldElkLCB0YXJnZXRQbGF5ZXJJZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFidWxsZXRJZCB8fCB0YXJnZXRQbGF5ZXJJZCA9PSBudWxsIHx8IHRhcmdldFBsYXllcklkIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwibXVsdGlwbGF5ZXItaGl0XCIsIHtcclxuICAgICAgICAgICAgaWQ6IGJ1bGxldElkLFxyXG4gICAgICAgICAgICB0Z2lkOiB0YXJnZXRQbGF5ZXJJZCxcclxuICAgICAgICAgICAgaHA6IC0xLFxyXG4gICAgICAgICAgICBkYW1hZ2U6IC0xLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5TXVsdGlwbGF5ZXJIaXQoaGl0RGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFoaXREYXRhIHx8ICFoaXREYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBidWxsZXQgPSB0aGlzLl9tdWx0aXBsYXllckJ1bGxldHNbaGl0RGF0YS5pZF07XHJcbiAgICAgICAgaWYgKGJ1bGxldCAmJiBjYy5pc1ZhbGlkKGJ1bGxldCkgJiYgYnVsbGV0LnNjcmlwdCAmJiBidWxsZXQuc2NyaXB0LmRvRGVzdHJveSkge1xyXG4gICAgICAgICAgICBidWxsZXQuc2NyaXB0LmRvRGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldChoaXREYXRhLmlkLCBidWxsZXQpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0UGxheWVyID0gdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJzW2hpdERhdGEudGdpZF07XHJcbiAgICAgICAgaWYgKCF0YXJnZXRQbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGFyZ2V0UGxheWVyKSB8fCAhdGFyZ2V0UGxheWVyLnNjcmlwdCB8fCAhdGFyZ2V0UGxheWVyLnNjcmlwdC5hcHBseU11bHRpcGxheWVySGl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0UGxheWVyLnNjcmlwdC5hcHBseU11bHRpcGxheWVySGl0KGhpdERhdGEuZGFtYWdlLCBoaXREYXRhLmhwKTtcclxuICAgIH1cclxuXHJcbiAgICBfYXBwbHlNdWx0aXBsYXllclNwZWNpYWxFdmVudFNwYXduKGV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFldmVudERhdGEgfHwgIWV2ZW50RGF0YS5pZCB8fCAhZXZlbnREYXRhLnR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclNwZWNpYWxFdmVudE1hcFtldmVudERhdGEuaWRdID0gZXZlbnREYXRhO1xyXG4gICAgICAgIGlmIChldmVudERhdGEudHlwZSA9PT0gXCJwb3J0YWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9hcHBseU11bHRpcGxheWVyUG9ydGFsRXZlbnQoZXZlbnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnREYXRhLnR5cGUgPT09IFwiZGFtYWdlRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwbHlNdWx0aXBsYXllckRhbWFnZURvdWJsZUV2ZW50KGV2ZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50RGF0YS50eXBlID09PSBcInNwZWVkRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwbHlNdWx0aXBsYXllclNwZWVkRG91YmxlRXZlbnQoZXZlbnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnREYXRhLnR5cGUgPT09IFwiYmxhY2tIb2xlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwbHlNdWx0aXBsYXllckJsYWNrSG9sZUV2ZW50KGV2ZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyU3BlY2lhbEV2ZW50UmVtb3ZlKGV2ZW50SWQsIGV2ZW50VHlwZSA9IFwiXCIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudElkICE9IG51bGwgJiYgdGhpcy5fbXVsdGlwbGF5ZXJTcGVjaWFsRXZlbnRNYXBbZXZlbnRJZF0pIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX211bHRpcGxheWVyU3BlY2lhbEV2ZW50TWFwW2V2ZW50SWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnRUeXBlID09PSBcInBvcnRhbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyUG9ydGFsVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50VHlwZSA9PT0gXCJkYW1hZ2VEb3VibGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhckRhbWFnZURvdWJsZVRlc3ROb2RlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudFR5cGUgPT09IFwic3BlZWREb3VibGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU3BlZWREb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnRUeXBlID09PSBcImJsYWNrSG9sZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQmxhY2tIb2xlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyU2FmZVpvbmVEYW1hZ2UoY29tbWFuZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFjb21tYW5kIHx8IGNvbW1hbmQucGxheWVySWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0YXJnZXRQbGF5ZXIgPSB0aGlzLl9tdWx0aXBsYXllclBsYXllcnNbY29tbWFuZC5wbGF5ZXJJZF07XHJcbiAgICAgICAgaWYgKCF0YXJnZXRQbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGFyZ2V0UGxheWVyKSB8fCAhdGFyZ2V0UGxheWVyLnNjcmlwdCB8fCAhdGFyZ2V0UGxheWVyLnNjcmlwdC5hcHBseU11bHRpcGxheWVySGl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0UGxheWVyLnNjcmlwdC5hcHBseU11bHRpcGxheWVySGl0KGNvbW1hbmQuZGFtYWdlIHx8IDAsIGNvbW1hbmQuaHApO1xyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyU2FmZVpvbmVTdGF0ZShzYWZlWm9uZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFzYWZlWm9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllclNhZmVab25lID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY2xlYXJNdWx0aXBsYXllclNhZmVab25lTm9kZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyU2FmZVpvbmUgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlclg6IHNhZmVab25lLmNlbnRlclggPT0gbnVsbCA/IDAgOiBzYWZlWm9uZS5jZW50ZXJYLFxyXG4gICAgICAgICAgICBjZW50ZXJZOiBzYWZlWm9uZS5jZW50ZXJZID09IG51bGwgPyAwIDogc2FmZVpvbmUuY2VudGVyWSxcclxuICAgICAgICAgICAgc3RhcnRSYWRpdXM6IHNhZmVab25lLnN0YXJ0UmFkaXVzID09IG51bGwgPyAwIDogc2FmZVpvbmUuc3RhcnRSYWRpdXMsXHJcbiAgICAgICAgICAgIHRhcmdldFJhZGl1czogc2FmZVpvbmUudGFyZ2V0UmFkaXVzID09IG51bGwgPyAwIDogc2FmZVpvbmUudGFyZ2V0UmFkaXVzLFxyXG4gICAgICAgICAgICByYWRpdXM6IHNhZmVab25lLnJhZGl1cyA9PSBudWxsID8gMCA6IHNhZmVab25lLnJhZGl1cyxcclxuICAgICAgICAgICAgc3RhcnREZWxheTogc2FmZVpvbmUuc3RhcnREZWxheSA9PSBudWxsID8gNjAgOiBzYWZlWm9uZS5zdGFydERlbGF5LFxyXG4gICAgICAgICAgICBzaHJpbmtEdXJhdGlvbjogc2FmZVpvbmUuc2hyaW5rRHVyYXRpb24gPT0gbnVsbCA/IDQ1IDogc2FmZVpvbmUuc2hyaW5rRHVyYXRpb24sXHJcbiAgICAgICAgICAgIGRhbWFnZUludGVydmFsOiBzYWZlWm9uZS5kYW1hZ2VJbnRlcnZhbCA9PSBudWxsID8gMSA6IHNhZmVab25lLmRhbWFnZUludGVydmFsLFxyXG4gICAgICAgICAgICBkYW1hZ2VQZXJUaWNrOiBzYWZlWm9uZS5kYW1hZ2VQZXJUaWNrID09IG51bGwgPyAwIDogc2FmZVpvbmUuZGFtYWdlUGVyVGljayxcclxuICAgICAgICAgICAgYWN0aXZlOiAhIXNhZmVab25lLmFjdGl2ZSxcclxuICAgICAgICAgICAgc2hyaW5raW5nOiAhIXNhZmVab25lLnNocmlua2luZyxcclxuICAgICAgICAgICAgZmluaXNoZWQ6ICEhc2FmZVpvbmUuZmluaXNoZWQsXHJcbiAgICAgICAgICAgIHByb2dyZXNzOiBzYWZlWm9uZS5wcm9ncmVzcyA9PSBudWxsID8gMCA6IHNhZmVab25lLnByb2dyZXNzLFxyXG4gICAgICAgICAgICB3YWl0UmVtYWluaW5nOiBzYWZlWm9uZS53YWl0UmVtYWluaW5nID09IG51bGwgPyAwIDogc2FmZVpvbmUud2FpdFJlbWFpbmluZyxcclxuICAgICAgICAgICAgc2hyaW5rUmVtYWluaW5nOiBzYWZlWm9uZS5zaHJpbmtSZW1haW5pbmcgPT0gbnVsbCA/IDAgOiBzYWZlWm9uZS5zaHJpbmtSZW1haW5pbmcsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9yZW5kZXJNdWx0aXBsYXllclNhZmVab25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyTXVsdGlwbGF5ZXJTYWZlWm9uZU5vZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyU2FmZVpvbmVOb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJTYWZlWm9uZU5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyU2FmZVpvbmVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTYWZlWm9uZU5vZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZW5kZXJNdWx0aXBsYXllclNhZmVab25lKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJTYWZlWm9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhck11bHRpcGxheWVyU2FmZVpvbmVOb2RlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNhZmVab25lID0gdGhpcy5fbXVsdGlwbGF5ZXJTYWZlWm9uZTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gTWF0aC5tYXgoMCwgc2FmZVpvbmUucmFkaXVzIHx8IDApO1xyXG4gICAgICAgIGlmIChyYWRpdXMgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhck11bHRpcGxheWVyU2FmZVpvbmVOb2RlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKHNhZmVab25lLmNlbnRlclggfHwgMCwgc2FmZVpvbmUuY2VudGVyWSB8fCAwKSwgMCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJNdWx0aXBsYXllclNhZmVab25lTm9kZSgpO1xyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiX3NhZmVab25lUm9vdFwiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICByb290LnNldFBvc2l0aW9uKGNjLnYzKGNlbnRlcikpO1xyXG4gICAgICAgIHJvb3QuekluZGV4ID0gNTYwMDtcclxuXHJcbiAgICAgICAgbGV0IG91dGVyR2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3NhZmVab25lR2xvd1wiKTtcclxuICAgICAgICBvdXRlckdsb3cucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gb3V0ZXJHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDkwLCAxNzAsIDI1NSwgc2FmZVpvbmUuYWN0aXZlID8gMTggOiA4KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyArIDE4KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgcmluZyA9IG5ldyBjYy5Ob2RlKFwiX3NhZmVab25lUmluZ1wiKTtcclxuICAgICAgICByaW5nLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgbGV0IHJpbmdHcmFwaGljcyA9IHJpbmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICByaW5nR3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICByaW5nR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBzYWZlWm9uZS5maW5pc2hlZCA/IGNjLmNvbG9yKDI1NSwgMTIwLCAxMjAsIDI0NSkgOiBjYy5jb2xvcigxMjAsIDIxMCwgMjU1LCAyMzUpO1xyXG4gICAgICAgIHJpbmdHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICByaW5nR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgcmluZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgICAgcmluZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgc2FmZVpvbmUuYWN0aXZlID8gMTcwIDogOTApO1xyXG4gICAgICAgIHJpbmdHcmFwaGljcy5jaXJjbGUoMCwgMCwgTWF0aC5tYXgoNiwgcmFkaXVzIC0gOCkpO1xyXG4gICAgICAgIHJpbmdHcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3NhZmVab25lTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKDAsIHJhZGl1cyArIDQyKTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBpZiAoIXNhZmVab25lLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIue8qeWciOWAkuiuoeaXtiBcIiArIE1hdGgubWF4KDAsIE1hdGguY2VpbChzYWZlWm9uZS53YWl0UmVtYWluaW5nIHx8IDApKSArIFwic1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzYWZlWm9uZS5zaHJpbmtpbmcpIHtcclxuICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLlronlhajljLrnvKnlsI/kuK0gXCIgKyBNYXRoLm1heCgwLCBNYXRoLmNlaWwoc2FmZVpvbmUuc2hyaW5rUmVtYWluaW5nIHx8IDApKSArIFwic1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzYWZlWm9uZS5maW5pc2hlZCkge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuacgOe7iOWuieWFqOWMulwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLlronlhajljLpcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gc2FmZVpvbmUuZmluaXNoZWQgPyBjYy5jb2xvcigyNTUsIDIxMCwgMjEwLCAyNTUpIDogY2MuY29sb3IoMjIwLCAyNDUsIDI1NSwgMjU1KTtcclxuXHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTYWZlWm9uZU5vZGUgPSByb290O1xyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyUG9ydGFsRXZlbnQoZXZlbnREYXRhKSB7XHJcbiAgICAgICAgaWYgKCFldmVudERhdGEuZW50cnlQb3MgfHwgIWV2ZW50RGF0YS5leGl0UG9zKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyUG9ydGFsVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgbGV0IGVudHJ5UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2MudjIoZXZlbnREYXRhLmVudHJ5UG9zKSwgOTApO1xyXG4gICAgICAgIGxldCBleGl0UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2MudjIoZXZlbnREYXRhLmV4aXRQb3MpLCA5MCk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlUG9ydGFsR2F0ZShcIl9wb3J0YWxHYXRlQVwiLCBlbnRyeVBvcywgY2MuY29sb3IoOTAsIDIxNSwgMjU1LCAyNTUpLCBcIkFcIik7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlUG9ydGFsR2F0ZShcIl9wb3J0YWxHYXRlQlwiLCBleGl0UG9zLCBjYy5jb2xvcigyNTUsIDEyMCwgMjIwLCAyNTUpLCBcIkJcIik7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlUG9ydGFsTGlua0Z4KGVudHJ5UG9zLCBleGl0UG9zKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVQb3J0YWxIaW50TGFiZWwoZW50cnlQb3MpO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFBhaXJzLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogXCJwb3J0YWxBXCIsXHJcbiAgICAgICAgICAgIHBvczogZW50cnlQb3MsXHJcbiAgICAgICAgICAgIHJhZGl1czogZXZlbnREYXRhLnJhZGl1cyA9PSBudWxsID8gNDQgOiBldmVudERhdGEucmFkaXVzLFxyXG4gICAgICAgICAgICBleGl0SWQ6IFwicG9ydGFsQlwiLFxyXG4gICAgICAgICAgICBleGl0UG9zOiBleGl0UG9zLFxyXG4gICAgICAgICAgICBldmVudElkOiBldmVudERhdGEuaWRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxQYWlycy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IFwicG9ydGFsQlwiLFxyXG4gICAgICAgICAgICBwb3M6IGV4aXRQb3MsXHJcbiAgICAgICAgICAgIHJhZGl1czogZXZlbnREYXRhLnJhZGl1cyA9PSBudWxsID8gNDQgOiBldmVudERhdGEucmFkaXVzLFxyXG4gICAgICAgICAgICBleGl0SWQ6IFwicG9ydGFsQVwiLFxyXG4gICAgICAgICAgICBleGl0UG9zOiBlbnRyeVBvcyxcclxuICAgICAgICAgICAgZXZlbnRJZDogZXZlbnREYXRhLmlkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FwcGx5TXVsdGlwbGF5ZXJEYW1hZ2VEb3VibGVFdmVudChldmVudERhdGEpIHtcclxuICAgICAgICBpZiAoIWV2ZW50RGF0YS5jZW50ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJEYW1hZ2VEb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2MudjIoZXZlbnREYXRhLmNlbnRlciksIDEwMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IGV2ZW50RGF0YS5yYWRpdXMgPT0gbnVsbCA/IDYwIDogZXZlbnREYXRhLnJhZGl1cztcclxuICAgICAgICB0aGlzLl9jcmVhdGVEYW1hZ2VEb3VibGVBcmVhTm9kZShjZW50ZXIsIHJhZGl1cywgY2MuY29sb3IoMjU1LCA0MCwgNDAsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIGRhbWFnZU11bHRpcGxpZXI6IGV2ZW50RGF0YS5kYW1hZ2VNdWx0aXBsaWVyID09IG51bGwgPyAyIDogZXZlbnREYXRhLmRhbWFnZU11bHRpcGxpZXIsXHJcbiAgICAgICAgICAgIHNjYWxlTXVsdGlwbGllcjogZXZlbnREYXRhLnNjYWxlTXVsdGlwbGllciA9PSBudWxsID8gMS41IDogZXZlbnREYXRhLnNjYWxlTXVsdGlwbGllcixcclxuICAgICAgICAgICAgZXZlbnRJZDogZXZlbnREYXRhLmlkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2FwcGx5TXVsdGlwbGF5ZXJTcGVlZERvdWJsZUV2ZW50KGV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmICghZXZlbnREYXRhLmNlbnRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyU3BlZWREb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2MudjIoZXZlbnREYXRhLmNlbnRlciksIDEwMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IGV2ZW50RGF0YS5yYWRpdXMgPT0gbnVsbCA/IDYwIDogZXZlbnREYXRhLnJhZGl1cztcclxuICAgICAgICB0aGlzLl9jcmVhdGVTcGVlZERvdWJsZUFyZWFOb2RlKGNlbnRlciwgcmFkaXVzLCBjYy5jb2xvcigzMCwgMTMwLCAyNTUsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlQXJlYURhdGEgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgc3BlZWRNdWx0aXBsaWVyOiBldmVudERhdGEuc3BlZWRNdWx0aXBsaWVyID09IG51bGwgPyAzIDogZXZlbnREYXRhLnNwZWVkTXVsdGlwbGllcixcclxuICAgICAgICAgICAgZXZlbnRJZDogZXZlbnREYXRhLmlkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2FwcGx5TXVsdGlwbGF5ZXJCbGFja0hvbGVFdmVudChldmVudERhdGEpIHtcclxuICAgICAgICBpZiAoIWV2ZW50RGF0YS5jZW50ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJCbGFja0hvbGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2MudjIoZXZlbnREYXRhLmNlbnRlciksIDEyMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IGV2ZW50RGF0YS5yYWRpdXMgPT0gbnVsbCA/IDEwMCA6IGV2ZW50RGF0YS5yYWRpdXM7XHJcbiAgICAgICAgbGV0IGRlc3Ryb3lSYWRpdXMgPSBldmVudERhdGEuZGVzdHJveVJhZGl1cyA9PSBudWxsID8gMTQgOiBldmVudERhdGEuZGVzdHJveVJhZGl1cztcclxuICAgICAgICB0aGlzLl9jcmVhdGVCbGFja0hvbGVBcmVhTm9kZShjZW50ZXIsIHJhZGl1cywgZGVzdHJveVJhZGl1cywgY2MuY29sb3IoODAsIDMwLCAxNjAsIDIwMCkpO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZUFyZWFEYXRhID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIGRlc3Ryb3lSYWRpdXM6IGRlc3Ryb3lSYWRpdXMsXHJcbiAgICAgICAgICAgIGdyYXZpdHlTdHJlbmd0aDogZXZlbnREYXRhLmdyYXZpdHlTdHJlbmd0aCA9PSBudWxsID8gMTYwIDogZXZlbnREYXRhLmdyYXZpdHlTdHJlbmd0aCxcclxuICAgICAgICAgICAgZXZlbnRJZDogZXZlbnREYXRhLmlkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2NlbnRlck9uTG9jYWxQbGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUpIHJldHVybjtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJzW3RoaXMuX2xvY2FsUGxheWVySWRdO1xyXG4gICAgICAgIGlmICghcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHBsYXllcikpIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zID0gcGxheWVyLnBvc2l0aW9uO1xyXG4gICAgICAgIGlmICghcG9zKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXBvcy54LCAtcG9zLnkpKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24od2lsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyQWxsVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX2NsZWFyUG9ydGFsVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJDZW50cmlmdWdhbFJpbmdUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhckRhbWFnZURvdWJsZVRlc3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyU3BlZWREb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhclNwcmVhZEJ1bGxldFRlc3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQm91bmNlT2JzdGFjbGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhckJsYWNrSG9sZVRlc3ROb2RlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTWFwKCl7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lpI3mtLtcclxuICAgIHJldml2ZSgpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnBvc2l0aW9uID0gdGhpcy5fcGxheWVyTGFzdFBvcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKXtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdW1lKCl7XHJcbiAgICAgICAgdGhpcy5fcGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=