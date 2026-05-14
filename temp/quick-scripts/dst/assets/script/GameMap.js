
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
        this._multiplayerPlayers[playerIdx] = player;
        if (playerIdx === this._localPlayerId) {
            this._player = player;
        }
        return player;
    };
    GameMap.prototype.startMultiplayerGame = function (playerCount, localPlayerId, spawnSlots, energies, players, specialEvents, onReady) {
        this._multiplayerMode = true;
        this._multiplayerPlayers = [];
        this._multiplayerBullets = {};
        this._multiplayerEnergyMap = {};
        this._multiplayerEnergyEggMap = {};
        this._multiplayerSpecialEventMap = {};
        this._localPlayerId = localPlayerId == null ? 0 : localPlayerId;
        this._multiplayerSpawnSlots = spawnSlots ? spawnSlots.slice() : [];
        var playerStates = Array.isArray(players) ? players : [];
        var initialSpecialEvents = Array.isArray(specialEvents) ? specialEvents : [];
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
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUNuRCwyQ0FBd0M7QUFDeEMseUNBQXNDO0FBQ3RDLG9EQUFtRDtBQUNuRCw0REFBdUQ7QUFDdkQseUNBQXNDO0FBQ3RDLDhCQUE4QjtBQUM5Qiw0Q0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyw0Q0FBeUM7QUFDbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsSUFBTSwwQkFBMEIsR0FBRyxDQUFDLENBQUM7QUFDckMsSUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFDdEMsSUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUM7QUFDcEMsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7QUFDN0IsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxvQkFBb0IsR0FBRyxzQ0FBc0MsQ0FBQztBQUNwRSxJQUFNLHFCQUFxQixHQUFHLHNDQUFzQyxDQUFDO0FBQ3JFLElBQU0scUJBQXFCLEdBQUcsc0NBQXNDLENBQUM7QUFDckUsSUFBTSwyQkFBMkIsR0FBRyxzQ0FBc0MsQ0FBQztBQUMzRSxJQUFNLHNCQUFzQixHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RFLElBQU0sc0JBQXNCLEdBQUc7SUFDM0IsQ0FBQyxFQUFFLHNDQUFzQztJQUN6QyxDQUFDLEVBQUUsc0NBQXNDO0lBQ3pDLENBQUMsRUFBRSxzQ0FBc0M7SUFD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QUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsNENBQTBCLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUVsQyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFH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QUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkcsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQzNELFNBQVM7YUFDWjtZQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLElBQUksV0FBVyxHQUFHLFlBQVksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkUsSUFBSSxNQUFNLENBQUMsR0FBRyxF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QyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNwRCxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV2QyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3hCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDakQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDZixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNoQixFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQkFBUyxHQUFUO1FBQUEsaUJBY0M7UUFiRyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDcEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNyQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNyQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDdEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNSLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3Q0FBc0IsR0FBdEI7UUFBQSxpQkFjQztRQWJHLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUNwQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN0QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUN0QixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ1IsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELHNDQUFvQixHQUFwQjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQ3BCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDckIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDckIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDUixLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTTtJQUNOLDJCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsMEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDdkI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNuQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNwQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDcEI7U0FDSjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEI7U0FDSjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN0QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkI7U0FDSjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELHVDQUFxQixHQUFyQjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25CLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDbkI7YUFDSjtTQUNKO1FBRUQsSUFBSSxZQUFZLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsY0FBYyxFQUFFLElBQUk7WUFDcEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsZUFBZSxFQUFFLElBQUk7WUFDckIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixlQUFlLEVBQUUsSUFBSTtZQUNyQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsdUJBQXVCLEVBQUUsSUFBSTtZQUM3QixvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsdUJBQXVCLEVBQUUsSUFBSTtZQUM3QixhQUFhLEVBQUUsSUFBSTtZQUNuQixhQUFhLEVBQUUsSUFBSTtZQUNuQixXQUFXLEVBQUUsSUFBSTtZQUNqQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLG1CQUFtQixFQUFFLElBQUk7WUFDekIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLHVCQUF1QixFQUFFLElBQUk7WUFDN0IscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGNBQWMsRUFBRSxJQUFJO1NBQ3ZCLENBQUM7UUFDRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9DLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNuQjtTQUNKO0lBQ0wsQ0FBQztJQUVELGdEQUE4QixHQUE5QjtRQUNJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0I7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxrREFBZ0MsR0FBaEMsVUFBaUMsU0FBUyxFQUFFLFdBQVc7UUFDbkQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDdkQsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN4QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMvRTtRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM1QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHlDQUF1QixHQUF2QixVQUF3QixTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQWtCO1FBQWxCLDRCQUFBLEVBQUEsa0JBQWtCO1FBQzlELElBQUksVUFBVSxHQUFHLFdBQVcsSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLElBQUk7WUFDeEQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRO1lBQ3RCLENBQUMsQ0FBQyw2QkFBYSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLFdBQVcsR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLFdBQVcsSUFBSSxJQUFJO1lBQzVELENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVztZQUN6QixDQUFDLENBQUMsNkJBQWEsQ0FBQyxVQUFVLENBQUMsYUFBVyxVQUFVLE1BQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU1RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFDNUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLENBQUM7UUFDL0MsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsU0FBUyxDQUFDO1FBRTVDLHVDQUF1QztRQUN2QyxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQzNDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDdEMsSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTtZQUNuRCxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsNERBQTREO1FBQzVELElBQUksU0FBUyxHQUFHLFNBQVMsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hILElBQUksUUFBUSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2pCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUk7b0JBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7aUJBQUU7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTthQUM1QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUM3QyxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELHNDQUFvQixHQUFwQixVQUFxQixXQUFXLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPO1FBQ2xHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDaEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbkUsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDekQsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUU3RSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsNkJBQWEsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFFbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDM0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQ3BCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDUixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7YUFDekU7WUFDRCxJQUFJLGVBQWUsR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckQ7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxJQUFJLENBQUMsa0NBQWtDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRTtZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLDRDQUE0QztZQUM1QyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLE9BQU87Z0JBQUUsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQ0wsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtCQUFhLEdBQWIsVUFBYyxTQUFTO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsT0FBTztRQUNuQyxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4RixJQUFJLENBQUMsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGdEQUE4QixHQUE5QixVQUErQixRQUFRO1FBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDM0IsU0FBUzthQUNaO1lBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtnQkFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxNQUFNLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO29CQUM5RSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUNyRDthQUNKO2lCQUNJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7Z0JBQ3JDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hELElBQUksTUFBTSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO29CQUNyRixNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMvQzthQUNKO2lCQUNJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNyQztpQkFDSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pEO2lCQUNJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEQ7aUJBQ0ksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGVBQWUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzVDO2lCQUNJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoRDtpQkFDSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssZUFBZSxFQUFFO2dCQUN2QyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0M7aUJBQ0ksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFO2dCQUN6QyxJQUFJLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDN0M7aUJBQ0ksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFO2dCQUN6QyxJQUFJLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25EO2lCQUNJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxtQkFBbUIsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxRDtpQkFDSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssb0JBQW9CLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoRjtTQUNKO0lBQ0wsQ0FBQztJQUVELDBDQUF3QixHQUF4QixVQUF5QixVQUFVO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDaEUsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3BHLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMkNBQXlCLEdBQXpCLFVBQTBCLFFBQVE7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQzVDLE9BQU87U0FDVjtRQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRCw0Q0FBMEIsR0FBMUIsVUFBMkIsT0FBTztRQUM5QixzQ0FBc0M7SUFDMUMsQ0FBQztJQUVELG1DQUFpQixHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQ0FBZ0IsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELDJDQUF5QixHQUF6QixVQUEwQixRQUFRLEVBQUUsVUFBVTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDcEQsQ0FBQztJQUVELDZDQUEyQixHQUEzQixVQUE0QixRQUFRLEVBQUUsVUFBaUI7UUFBakIsMkJBQUEsRUFBQSxpQkFBaUI7UUFDbkQsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDbEUsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsNENBQTBCLEdBQTFCLFVBQTJCLFFBQVEsRUFBRSxjQUFjO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxRQUFRLElBQUksY0FBYyxJQUFJLElBQUksSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO1lBQ3JGLE9BQU87U0FDVjtRQUNELEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3BDLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLGNBQWM7WUFDcEIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNOLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQW1CLEdBQW5CLFVBQW9CLE9BQU87UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDbkQsT0FBTztTQUNWO1FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFJLE1BQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDMUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXJELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtZQUNoSCxPQUFPO1NBQ1Y7UUFDRCxZQUFZLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxvREFBa0MsR0FBbEMsVUFBbUMsU0FBUztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDMUUsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDM0QsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEQ7YUFDSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0RDthQUNJLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JEO2FBQ0ksSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUNyQyxJQUFJLENBQUMsK0JBQStCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0lBRUQscURBQW1DLEdBQW5DLFVBQW9DLE9BQU8sRUFBRSxTQUFjO1FBQWQsMEJBQUEsRUFBQSxjQUFjO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5RCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQzthQUNJLElBQUksU0FBUyxLQUFLLGNBQWMsRUFBRTtZQUNuQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1NBQ3RDO2FBQ0ksSUFBSSxTQUFTLEtBQUssYUFBYSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7U0FDckM7YUFDSSxJQUFJLFNBQVMsS0FBSyxXQUFXLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRCw4Q0FBNEIsR0FBNUIsVUFBNkIsU0FBUztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDM0MsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDbkIsRUFBRSxFQUFFLFNBQVM7WUFDYixHQUFHLEVBQUUsUUFBUTtZQUNiLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUN4RCxNQUFNLEVBQUUsU0FBUztZQUNqQixPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDbkIsRUFBRSxFQUFFLFNBQVM7WUFDYixHQUFHLEVBQUUsT0FBTztZQUNaLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUN4RCxNQUFNLEVBQUUsU0FBUztZQUNqQixPQUFPLEVBQUUsUUFBUTtZQUNqQixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7U0FDeEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9EQUFrQyxHQUFsQyxVQUFtQyxTQUFTO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RFLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDOUQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxxQkFBcUIsR0FBRztZQUN6QixNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxNQUFNO1lBQ2QsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCO1lBQ3JGLGVBQWUsRUFBRSxTQUFTLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZTtZQUNwRixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7U0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRCxtREFBaUMsR0FBakMsVUFBa0MsU0FBUztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQzlELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsb0JBQW9CLEdBQUc7WUFDeEIsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsTUFBTTtZQUNkLGVBQWUsRUFBRSxTQUFTLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZTtZQUNsRixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7U0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRCxpREFBK0IsR0FBL0IsVUFBZ0MsU0FBUztRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQy9ELElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDbkYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsa0JBQWtCLEdBQUc7WUFDdEIsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsTUFBTTtZQUNkLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGVBQWUsRUFBRSxTQUFTLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZTtZQUNwRixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7U0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRCxzQ0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtZQUFFLE9BQU87UUFDbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQzNDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPO1FBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxvQ0FBa0IsR0FBbEI7UUFDSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsdUJBQUssR0FBTDtRQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO0lBQ0osd0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELHdCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBL3ZMRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNtQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNtQjtJQTlCOUIsT0FBTztRQURuQixPQUFPO09BQ0ssT0FBTyxDQW13TG5CO0lBQUQsY0FBQztDQW53TEQsQUFtd0xDLENBbndMNEIsNkJBQWEsR0Ftd0x6QztBQW53TFksMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcbmltcG9ydCB7RW5lcmd5SXRlbX0gZnJvbSBcIi4vRW5lcmd5SXRlbVwiO1xyXG5pbXBvcnQge0VuZXJneUVnZ30gZnJvbSBcIi4vRW5lcmd5RWdnXCI7XHJcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XHJcbmltcG9ydCBSaXBwbGVTaG9ja3dhdmUgZnJvbSBcIi4vZWZmZWN0L1JpcHBsZVNob2Nrd2F2ZVwiO1xyXG5pbXBvcnQge09pbFBpY2t1cH0gZnJvbSBcIi4vT2lsUGlja3VwXCI7XHJcbi8v55S15a2Q6YKu5Lu2cHVoYWxza2lqc2VtZW5AZ21haWwuY29tXHJcbi8v5rqQ56CB572R56uZIOW8gHZwbuWFqOWxgOaooeW8j+aJk+W8gCBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL1xyXG4vL+eUteaKpWh0dHBzOi8vdC5tZS9nYW1lY29kZTk5OVxyXG4vL+e9kemhteWuouacjSBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL2tlZnUuaHRtbFxyXG5pbXBvcnQge0FuYWx5dGljc30gZnJvbSBcIi4vYWQvQW5hbHl0aWNzXCI7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBLSUxMX1NUUkVBS19XSU5ET1cgPSAyMDtcclxuY29uc3QgS0lMTF9CUk9BRENBU1RfTUFYX1ZJU0lCTEUgPSAzO1xyXG5jb25zdCBLSUxMX0JST0FEQ0FTVF9TTE9UX0hFSUdIVCA9IDY0O1xyXG5jb25zdCBLSUxMX0JST0FEQ0FTVF9EVVJBVElPTiA9IDIuMjtcclxuY29uc3QgT0lMX1NQSUxMX0RVUkFUSU9OID0gMTA7XHJcbmNvbnN0IE9JTF9TUElMTF9SQURJVVMgPSAxMjA7XHJcbmNvbnN0IE9JTF9TUElMTF9TTE9XX0ZBQ1RPUiA9IDAuNTI7XHJcbmNvbnN0IE9JTF9TUElMTF9GUkFNRV9VVUlEID0gXCI1M2E1MjM5Ny1iZTcxLTRiMWUtYmQ5My05NmM1YjlhN2YyY2VcIjtcclxuY29uc3QgQ09WRVJfVEVTVF9GUkFNRV9VVUlEID0gXCJmMjcyMTVhNC0zMmIwLTRhM2MtYjg3ZC02OWEzZGMwM2UzN2FcIjtcclxuY29uc3QgRU5FUkdZX0VHR19GUkFNRV9VVUlEID0gXCI1YzliMTJjMy05ZmQxLTQ0NzItYjYzMy1kMzFkN2NlMjliZjJcIjtcclxuY29uc3QgVFJFRV9HUkVFTl9MQVJHRV9GUkFNRV9VVUlEID0gXCI4ZDNmMmVkYi1lMjdiLTQwMjktYWY2OS02YzBiYjU0YTA1NmRcIjtcclxuY29uc3QgS0lMTF9URVNUX1ZJQ1RJTV9OQU1FUyA9IFtcIueWvumjjuWPt1wiLCBcIum7keiZjuaculwiLCBcIumSoueJmeeCruaJi1wiLCBcIui1pOeEsOaImOi9plwiLCBcIumHjemUpOWdpuWFi1wiXTtcclxuY29uc3QgS0lMTF9CQURHRV9GUkFNRV9VVUlEUyA9IHtcclxuICAgIDE6IFwiOTFiNmVmMjMtMTlmMy00ZDc1LTllNGMtNGVlMjQ2ZWVlNmY3XCIsXHJcbiAgICAyOiBcIjU4YTY2NmI3LWFlOGQtNDYyMi04MmMzLTAzZDg5Yjc2NjI3YlwiLFxyXG4gICAgMzogXCJlOTU3NTY4Yy0yOWEwLTRlODktODRkNS0zOGNkMDI0OTY1MzdcIixcclxuICAgIDQ6IFwiZWZmNGRlNTktNTZkMS00ZGVkLWEwNWItMGZiZThjODFhZGZmXCIsXHJcbiAgICA1OiBcImZiZGQzNTFmLTNkOTYtNDgyMy05ZTRhLWVhMjEzMDg1ZjliN1wiXHJcbn07XHJcbmNvbnN0IEtJTExfQkFER0VfVElOVFMgPSB7XHJcbiAgICAxOiBbMjU1LCAyNTUsIDI1NV0sXHJcbiAgICAyOiBbMjA1LCAxMjcsIDUwXSxcclxuICAgIDM6IFsyMjAsIDIzMiwgMjQyXSxcclxuICAgIDQ6IFsyNTUsIDIxNSwgMF0sXHJcbiAgICA1OiBbMTg2LCAxMDIsIDI1NV1cclxufTtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBHYW1lTWFwIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRyZWUwMVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRyZWUwMlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbW91bnRhaW4wMVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG1vdW50YWluMDJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBtb3VudGFpbjAzUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIGVuZW15UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIHNraWxsUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIGVuZXJneVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+WGhemDqOWPmOmHj1xyXG4gICAgX3RpbGVkTWFwICAgPSBudWxsOyAgICAgLy9UaWxlZCBNYXBcclxuICAgIF90bUdyb3VwICAgID0gbnVsbDsgICAgIC8v5pmu6YCa5bGCXHJcbiAgICBfdG1PYmogICAgICA9IG51bGw7ICAgICAvL+WvueixoeWxgijpmpznoo3niakpXHJcbiAgICBfdG1Cb3JuICAgICA9IG51bGw7ICAgICAvL+WvueixoeWxgijlh7rnlJ/ngrkpXHJcbiAgICBfdG1EZWNhbCAgICA9IG51bGw7ICAgICAvL+WcsOihqOi0tOiKseWxgijlnLDlm77kuI7lnablhYvkuYvpl7QpXHJcbiAgICBfdG1TaXplICAgICA9IG51bGw7ICAgICAvL+WcsOWbvuWwuuWvuFxyXG4gICAgX3RpbGVTaXplICAgPSBudWxsOyAgICAgLy/nk6bniYflsLrlr7hcclxuXHJcbiAgICBfY29sbGlkZXJzICA9IFtdOyAgICAgICAvL+eisOaSnuajgOa1i+WIl+ihqFxyXG4gICAgX2NoZWNrTGlzdCAgPSB7fTsgICAgICAgLy9BKuajgOa1i+WIl+ihqFxyXG4gICAgX2xvZ2ljQXJlYSAgPSBbXTsgICAgICAgLy/pgLvovpHnorDmkp7liIbljLpcclxuXHJcbiAgICBfcGxheWVyICAgICAgICAgICAgID0gbnVsbDsgICAgIC8v546p5a62XHJcbiAgICBfZW5lbXlzICAgICAgICAgICAgID0gW107ICAgICAgIC8v5pWM5Lq65YiX6KGoXHJcbiAgICBfcGxheWVyQm9yblBvcyAgICAgID0gbnVsbDsgICAgIC8vcGxheWVy5Ye655Sf54K5XHJcbiAgICBfZW5lbXlCb3JuUG9zICAgICAgID0gW107ICAgICAgIC8v5pWM5Lq65Ye655Sf54K55YiX6KGoXHJcbiAgICBfYm9ybkNkVGltZSAgICAgICAgID0gMDsgICAgICAgIC8v5pWM5Lq655Sf5oiQ6Ze06ZqU5pe26Ze0XHJcbiAgICBfYm9ybkVuZW15Q291bnQgICAgID0gMDsgICAgICAgIC8v5bey57uP5Ye655Sf55qE5pWM5Lq65pWw6YePXHJcbiAgICBfZGVhdGhFbmVteUNvdW50ICAgID0gMDsgICAgICAgIC8v5bey57uP5q275Lqh55qE5pWM5Lq65pWw6YePXHJcbiAgICBfbWF4RW5lbXlDb3VudCAgICAgID0gMDsgICAgICAgIC8v5pyA5aSn5pWM5Lq65pWw6YePXHJcbiAgICBfdGltZU1heEVuZW15Q291bnQgID0gMDsgICAgICAgIC8v5ZCM5bGP5pyA5aSn5pWM5Lq65pWw6YePXHJcbiAgICBfc2tpbGxzICAgICAgICAgICAgID0gW107ICAgICAgIC8v6ZqP5py655Sf5oiQ55qE5oqA6IO9XHJcbiAgICBfZW5lcmd5cyAgICAgICAgICAgID0gW107ICAgICAgIC8v5Zyw5Zu+5LiK55qE6IO96YePXHJcbiAgICBfZW5lcmd5Q2RUaW1lICAgICAgID0gMDsgICAgICAgIC8v6IO96YeP55Sf5oiQ6Ze06ZqU5pe26Ze0XHJcblxyXG4gICAgX3BhdXNlICAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5aSE5LqO5pqC5YGc54q25oCBXHJcbiAgICBfZ2FtaW5nICAgICAgICAgPSBmYWxzZTsgICAgLy/mmK/lkKblpITkuo7muLjmiI/kuK0gXHJcbiAgICBfa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7IC8v5Ye75p2A5pWI5p6c5rWL6K+V5qih5byPXHJcbiAgICBfa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7IC8v5Ye75p2A5bm/5pKt5rWL6K+V5qih5byPXHJcbiAgICBfcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTsgLy/lj5flh7vmtYvor5XmqKHlvI9cclxuICAgIF91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTsgLy/ljYfnuqfmtYvor5XmqKHlvI9cclxuICAgIF9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7IC8v5a2Q5by55bCE5Ye75rWL6K+V5qih5byPXHJcbiAgICBfcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTsgLy/kvKDpgIHpl6jmtYvor5XmqKHlvI9cclxuICAgIF9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlOyAvL+emu+W/g+WKm+WciOa1i+ivleaooeW8j1xyXG4gICAgX2NvdmVyVGVzdE1vZGUgPSBmYWxzZTsgLy/mjqnkvZPmtYvor5XmqKHlvI9cclxuICAgIF9lbmVyZ3lFZ2dUZXN0TW9kZSA9IGZhbHNlOyAvL+iDvemHj+ibi+aUtuiXj+a1i+ivleaooeW8j1xyXG4gICAgX2RhbWFnZURvdWJsZVRlc3RNb2RlID0gZmFsc2U7IC8v5Lyk5a6z57+75YCN5Yy65Z+f5rWL6K+V5qih5byPXHJcbiAgICBfZGFtYWdlRG91YmxlQXJlYURhdGEgPSBudWxsO1xyXG4gICAgX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTsgLy/pgJ/luqbnv7vlgI3ljLrln5/mtYvor5XmqKHlvI9cclxuICAgIF9zcGVlZERvdWJsZUFyZWFEYXRhID0gbnVsbDtcclxuICAgIF9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlOyAvL+WtkOW8ueaJqeaVo+WMuuWfn+a1i+ivleaooeW8j1xyXG4gICAgX3NwcmVhZEJ1bGxldEFyZWFEYXRhID0gbnVsbDtcclxuICAgIF9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7IC8v5a2Q5by55Y+N5by56Zqc56KN5rWL6K+V5qih5byPXHJcbiAgICBfYm91bmNlT2JzdGFjbGVzID0gW107XHJcbiAgICBfYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTsgLy/pu5HmtJ7ljLrln5/mtYvor5XmqKHlvI9cclxuICAgIF9ibGFja0hvbGVBcmVhRGF0YSA9IG51bGw7XHJcbiAgICBfY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlOyAvL+mbhuadn+eCuOW8uea1i+ivleaooeW8j1xyXG4gICAgX211bHRpcGxheWVyTW9kZSA9IGZhbHNlOyAvL+WkmuS6uuaooeW8j1xyXG4gICAgX211bHRpcGxheWVyUGxheWVycyA9IFtdOyAvL+WkmuS6uueOqeWutuWIl+ihqFxyXG4gICAgX211bHRpcGxheWVyQnVsbGV0cyA9IHt9OyAvL+WkmuS6uuWQjOatpeWtkOW8uVxyXG4gICAgX211bHRpcGxheWVyRW5lcmd5TWFwID0ge307IC8v5aSa5Lq65ZCM5q2l6IO96YePXHJcbiAgICBfbXVsdGlwbGF5ZXJFbmVyZ3lFZ2dNYXAgPSB7fTsgLy/lpJrkurrlkIzmraXog73ph4/om4tcclxuICAgIF9tdWx0aXBsYXllclNwZWNpYWxFdmVudE1hcCA9IHt9O1xyXG4gICAgX2xvY2FsUGxheWVySWQgPSAwOyAgICAgICAvL+acrOWcsOeOqeWutklEXHJcbiAgICBfbXVsdGlwbGF5ZXJTcGF3blNsb3RzID0gW107IC8v5aSa5Lq65Ye655Sf5qe95L2NXHJcbiAgICBfbGV2ZWxJZCAgICAgICAgPSAxOyAgICAgICAgLy/lvZPliY3lhbPljaFpZFxyXG4gICAgX2xldmVsQ29uZmlnICAgID0gbnVsbDsgICAgIC8v5b2T5YmN5YWz5Y2h6YWN572uXHJcblxyXG4gICAgX3JvYW1GbGcgICAgICAgID0gZmFsc2U7ICAgICAgICAgIC8v5ryr5ri45qCH6K6wXHJcbiAgICBfcm9hbURpciAgICAgICAgPSBjYy52MigxLDApOyAgICAgLy/mvKvmuLjmlrnlkJFcclxuXHJcbiAgICBfcGxheWVyTGFzdFBvcyAgPSAwO1xyXG4gICAgX3JpcHBsZURpc3RvcnRpb25FZmZlY3QgPSBudWxsO1xyXG4gICAgX3JpcHBsZUNhcHR1cmVDYW1lcmEgPSBudWxsO1xyXG4gICAgX3JpcHBsZUNhcHR1cmVDYW1lcmFOb2RlID0gbnVsbDtcclxuICAgIF9raWxsQnJvYWRjYXN0TGF5ZXIgPSBudWxsO1xyXG4gICAgX2tpbGxCcm9hZGNhc3RFbnRyaWVzID0gW107XHJcbiAgICBfa2lsbEJhZGdlTGF5ZXIgPSBudWxsO1xyXG4gICAgX2tpbGxCYWRnZUFjdGl2ZU5vZGUgPSBudWxsO1xyXG4gICAgX2tpbGxCYWRnZUZyYW1lcyA9IHt9O1xyXG4gICAgX2tpbGxCYWRnZUxvYWRpbmcgPSB7fTtcclxuICAgIF9raWxsU3RyZWFrQ291bnQgPSAwO1xyXG4gICAgX2tpbGxTdHJlYWtSZW1haW4gPSAwO1xyXG4gICAgX3BvcnRhbFBhaXJzID0gW107XHJcbiAgICBfY2VudHJpZnVnYWxSaW5nRGF0YSA9IG51bGw7XHJcbiAgICBfb2lsU3BpbGxzID0gW107XHJcbiAgICBfb2lsU3BpbGxGcmFtZSA9IG51bGw7XHJcbiAgICBfb2lsU3BpbGxGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgIF9vaWxTcGlsbEZyYW1lQ2FsbGJhY2tzID0gW107XHJcbiAgICBfY292ZXJUZXN0Q292ZXJzID0gW107XHJcbiAgICBfY292ZXJUZXN0RnJhbWUgPSBudWxsO1xyXG4gICAgX2NvdmVyVGVzdEZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgX2NvdmVyVGVzdEZyYW1lQ2FsbGJhY2tzID0gW107XHJcbiAgICBfY292ZXJUZXN0RW5lbXkgPSBudWxsO1xyXG4gICAgX2VuZXJneUVnZ0ZyYW1lID0gbnVsbDtcclxuICAgIF9lbmVyZ3lFZ2dGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgIF9lbmVyZ3lFZ2dGcmFtZUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgX2VuZXJneUVnZ0J1c2hGcmFtZSA9IG51bGw7XHJcbiAgICBfZW5lcmd5RWdnQnVzaEZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgX2VuZXJneUVnZ0J1c2hGcmFtZUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgX2VuZXJneUVnZ3MgPSBbXTtcclxuICAgIF9lbmVyZ3lFZ2dCdXNoZXMgPSBbXTtcclxuXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL+W8gOWQr+eisOaSnuebkeWQrFxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gLy/lvIDlkK/nu5jliLbnorDmkp7nu4Tku7bnmoTlvaLnirZcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyAgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAvLyDmmL7npLrnorDmkp7nu4Tku7bnmoTljIXlm7Tnm5JcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyWdGlsZWQgbWFwIOeahOWvueixoSjpmpznoo3niakpXHJcbiAgICAgICAgdGhpcy5faW5pdFRtT2JzdGFjbGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo5Ye655Sf54K5KVxyXG4gICAgICAgIHRoaXMuX2luaXRUbUJvcm4oKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkUmlwcGxlRGlzdG9ydGlvbkVmZmVjdCgpO1xyXG4gICAgICAgIHRoaXMuX3ByZWxvYWRLaWxsQnJvYWRjYXN0QmFkZ2VGcmFtZXMoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkT2lsU3BpbGxGcmFtZSgpO1xyXG4gICAgICAgIHRoaXMuX3ByZWxvYWRDb3ZlclRlc3RGcmFtZSgpO1xyXG4gICAgICAgIHRoaXMuX3ByZWxvYWRFbmVyZ3lFZ2dGcmFtZSgpO1xyXG4gICAgICAgIHRoaXMuX3ByZWxvYWRFbmVyZ3lFZ2dCdXNoRnJhbWUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lSaXBwbGVDYXB0dXJlUmVzb3VyY2VzKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpbGxCcm9hZGNhc3RVaSgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWxsQmFkZ2VVaSgpO1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX3RpbGVkTWFwID0gdGhpcy5ub2RlW1wiJFRpbGVkTWFwXCJdO1xyXG4gICAgICAgIHRoaXMuX3RtR3JvdXAgPSB0aGlzLl9maXJlLl90bUxheWVyR3JvdXAuJFRpbGVkTGF5ZXI7XHJcbiAgICAgICAgLy8gdGhpcy5fZmlyZS5fdG1MYXllckdyb3VwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RtT2JqID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLiRUaWxlZE9iamVjdEdyb3VwO1xyXG4gICAgICAgIHRoaXMuX3RtQm9ybiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJCb3JuLiRUaWxlZE9iamVjdEdyb3VwO1xyXG4gICAgICAgIHRoaXMuX3RtRGVjYWwgPSB0aGlzLl9lbnN1cmVEZWNhbExheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fdG1TaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgLy8gdGhpcy5fdG1TaXplID0gbmV3IGNjLlNpemUodGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoICogdGhpcy5fdGlsZWRNYXAuZ2V0VGlsZVNpemUoKS53aWR0aCwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodCAqIHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCkuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl90aWxlU2l6ZSA9IHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZURlY2FsTGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3RtTGF5ZXJEZWNhbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2ZpcmUuX3RtTGF5ZXJEZWNhbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcmUuX3RtTGF5ZXJEZWNhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsYXllciA9IG5ldyBjYy5Ob2RlKFwiX3RtTGF5ZXJEZWNhbFwiKTtcclxuICAgICAgICBsYXllci5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgbGF5ZXIuc2V0Q29udGVudFNpemUodGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgIGxheWVyLnNldEFuY2hvclBvaW50KDAuNSwgMC41KTtcclxuICAgICAgICBsYXllci5zZXRQb3NpdGlvbigwLCAwKTtcclxuXHJcbiAgICAgICAgbGV0IG9ic3RhY2xlSW5kZXggPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUgPyB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuZ2V0U2libGluZ0luZGV4KCkgOiB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBsYXllci5zZXRTaWJsaW5nSW5kZXgoTWF0aC5tYXgoMCwgb2JzdGFjbGVJbmRleCkpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RtTGF5ZXJEZWNhbCA9IGxheWVyO1xyXG4gICAgICAgIHJldHVybiBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgX2luaXRFdmVudCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo6Zqc56KN54mpKVxyXG4gICAgX2luaXRUbU9ic3RhY2xlKCl7XHJcbiAgICAgICAgbGV0IF9zdGFydFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGxldCBvYmplY3RzID0gdGhpcy5fdG1PYmouZ2V0T2JqZWN0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2JqZWN0czExXCIsb2JqZWN0cylcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IG9iamVjdHNbaV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+iOt+WPluS9jee9rlxyXG4gICAgICAgICAgICBsZXQgdGlsZWRQb3MgPSBjYy52MihvYmoub2Zmc2V0LnggKyBvYmoud2lkdGgvMiwgb2JqLm9mZnNldC55ICsgb2JqLmhlaWdodC8yKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuX3RpbGVQb3NUb0dhbWVQb3ModGlsZWRQb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5uYW1lICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvYnN0YWNsZTtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubmFtZSA9PSBcInRyZWUwMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRyZWUwMVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoubmFtZSA9PSBcInRyZWUwMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRyZWUwMlByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoubmFtZSA9PSBcIm1vdW50YWluMDFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb3VudGFpbjAxUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai5uYW1lID09IFwibW91bnRhaW4wMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vdW50YWluMDJQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJtb3VudGFpbjAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnN0YWNsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW91bnRhaW4wM1ByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG9ic3RhY2xlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICAgICAgICAgIG9ic3RhY2xlLnBvc2l0aW9uID0gY2MudjMob2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIG9ic3RhY2xlLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgob2Zmc2V0LnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9iai5wb2x5bGluZVBvaW50cy5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IG9iai5wb2x5bGluZVBvaW50c1tqXTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmQgPSBvYmoucG9seWxpbmVQb2ludHNbaisxXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/liJvlu7pjb2xsaWRlciBsaW5lXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLlBvbHlnb25Db2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci50YWcgPSBvYmoubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLnBvaW50c1swXSA9IGNjLnYyKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLnBvaW50c1sxXSA9IGNjLnYyKGVuZCk7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHMuc3BsaWNlKDIsMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xsaWRlcnMucHVzaChjb2xsaWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGxldCBjb3N0ID0gX2VuZFRpbWUgLSBfc3RhcnRUaW1lO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIisrKysrKysrKysrK19pbml0VG1PYnN0YWNsZSB0aW1lMSBcIixjb3N0KTtcclxuICAgICAgICBfc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgbGV0IGxvZ2ljV2lkdGggPSB0aGlzLl90bVNpemUud2lkdGgvNDtcclxuICAgICAgICBsZXQgbG9naWNIZWlnaHQgPSB0aGlzLl90bVNpemUuaGVpZ2h0LzQ7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCA0OyB4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCA2OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGFyZWE6YW55ID0gW107XHJcbiAgICAgICAgICAgICAgICBhcmVhLnggPSB4KmxvZ2ljV2lkdGgtdGhpcy5fdG1TaXplLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICBhcmVhLnkgPSB5KmxvZ2ljSGVpZ2h0LXRoaXMuX3RtU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICAgICAgICAgIGFyZWEud2lkdGggPSBsb2dpY1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXJlYS5oZWlnaHQgPSBsb2dpY0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjdCA9IG5ldyBjYy5SZWN0KGFyZWEueC0xMCxhcmVhLnktMTAsbG9naWNXaWR0aCsyMCxsb2dpY0hlaWdodCsyMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sbGlkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgQiA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGluZUluUmVjdChBLEIscmVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5wdXNoKHtBOkEsQjpCfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9naWNBcmVhLnB1c2goYXJlYSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICBfZW5kVGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrKysrKysrKysrKytfaW5pdFRtT2JzdGFjbGUgdGltZTIgXCIsY29zdCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWdGlsZWQgbWFwIOeahOWvueixoSjlh7rnlJ/ngrkpXHJcbiAgICBfaW5pdFRtQm9ybigpe1xyXG4gICAgICAgIGxldCBvYmplY3RzID0gdGhpcy5fdG1Cb3JuLmdldE9iamVjdHMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IG9iamVjdHNbaV07XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLl90aWxlUG9zVG9HYW1lUG9zKG9iai5vZmZzZXQpO1xyXG4gICAgICAgICAgICBpZiAob2JqLm5hbWUgPT0gXCJwbGF5ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyQm9yblBvcyA9IG9mZnNldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLmdhbWVQb3NUb1RpbGUob2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSBjYy52Myh0aGlzLnRpbGVUb0dhbWVQb3ModGlsZSkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmVteUJvcm5Qb3MucHVzaChwb3MpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fdG1Hcm91cC5zZXRUaWxlR0lEQXQoNSwgdGlsZSk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGxldCBfc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICB0aGlzLl9jaGVja0xpc3QgPSB0aGlzLmluaXRDaGVja0xpc3QoKTtcclxuICAgICAgICBsZXQgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGxldCBjb3N0ID0gX2VuZFRpbWUgLSBfc3RhcnRUaW1lO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIitjb3N0IHRpbWUgXCIsY29zdCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v55Sf5oiQcGxheWVyXHJcbiAgICBjcmVhdGVQbGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllclR5cGUgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfY3VycmVudF9wbGF5ZXJfdHlwZV9cIiwxKTtcclxuICAgICAgICBsZXQgcGxheWVyTGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9wbGF5ZXJfJHtwbGF5ZXJUeXBlfV9gLCAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGxheWVyID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnBvc2l0aW9uID0gdGhpcy5fcGxheWVyQm9yblBvcztcclxuICAgICAgICB0aGlzLl9wbGF5ZXIuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIuc2NyaXB0LnNldFBsYXllclR5cGUocGxheWVyVHlwZSxwbGF5ZXJMZXZlbCk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRJbkdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quaVjOS6ulxyXG4gICAgY3JlYXRlRW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNUZXN0TW9kZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6ZqP5py657K+6Iux5oCqXHJcbiAgICAgICAgbGV0IGVtZW15VHlwZSA9IDExO1xyXG4gICAgICAgIGxldCByYW5kb20gPSBNYXRoLnJhbmRvbSgpKjEwMDtcclxuICAgICAgICBpZiAocmFuZG9tIDwgNCkgeyBlbWVteVR5cGUgPSAxMjsgfVxyXG4gICAgICAgIGlmIChyYW5kb20gPCAxKSAgeyBlbWVteVR5cGUgPSAxMzsgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSB0aGlzLl9lbmVteUJvcm5Qb3NbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuX2VuZW15Qm9yblBvcy5sZW5ndGgpXTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKGVtZW15VHlwZSx0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrlj5flh7vmtYvor5XmlYzkurpcclxuICAgIGNyZWF0ZVBsYXllckhpdFRlc3RFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoMjMwLCAwKSk7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDgwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSx0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGVuZW15LnNjcmlwdC5fY29uZmlnKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5BdHRhY2tSYWRpdXMgPSA1MjA7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWUgPSAwLjQ1O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fYnVsbGV0Q29kZVRpbWUgPSBlbmVteS5zY3JpcHQuX2NvbmZpZy5CdWxsZXRDb2RlVGltZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quaui+ihgOa1i+ivleaVjOS6ulxyXG4gICAgY3JlYXRlS2lsbEVmZmVjdFRlc3RFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoMjYwLCAwKSk7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDgwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSx0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gMTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlS2lsbEJyb2FkY2FzdFRlc3RFbmVtaWVzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gNTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gMjYwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJICogMiAqIGkgLyBjb3VudCAtIE1hdGguUEkgKiAwLjU7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pLmFkZChjYy52MihNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXMsIE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cykpO1xyXG4gICAgICAgICAgICBlbmVteS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgOTApKTtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDE7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZW5lbXlbXCJfa2lsbFZpY3RpbU5hbWVcIl0gPSBLSUxMX1RFU1RfVklDVElNX05BTUVTW2ldIHx8IChcIuaVjOaWuVwiICsgKGkgKyAxKSArIFwi5Y+3XCIpO1xyXG4gICAgICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5q6L6KGA54q25oCB5bGV56S65pWM5Lq6XHJcbiAgICBjcmVhdGVMb3dIcFRlc3RFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoMjYwLCAwKSk7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDgwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSx0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGVuZW15LnNjcmlwdC5fY29uZmlnKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5BdHRhY2tSYWRpdXMgPSA5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lID0gMS4yO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fYnVsbGV0Q29kZVRpbWUgPSBlbmVteS5zY3JpcHQuX2NvbmZpZy5CdWxsZXRDb2RlVGltZTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihlbmVteS5zY3JpcHQuX21heEhwICogMC4xOCkpO1xyXG4gICAgICAgIGlmIChlbmVteS5zY3JpcHQuX2hwID49IGVuZW15LnNjcmlwdC5fbWF4SHApIHtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IE1hdGgubWF4KDEsIGVuZW15LnNjcmlwdC5fbWF4SHAgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5bCE5Ye754m55pWI5rWL6K+V5pyo5qGpXHJcbiAgICBjcmVhdGVTaG9vdEVmZmVjdFRlc3RFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoMzIwLCAwKSk7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQb3J0YWxUZXN0RW5lbXkocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSAxO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSAxO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgIHJldHVybiBlbmVteTtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJQb3J0YWxUZXN0Tm9kZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsUGFpcnMgPSBbXTtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9wb3J0YWxHYXRlQVwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX3BvcnRhbEdhdGVCXCJcclxuICAgICAgICAgICAgICAgIHx8IGNoaWxkLm5hbWUgPT0gXCJfcG9ydGFsTGlua0Z4XCJcclxuICAgICAgICAgICAgICAgIHx8IGNoaWxkLm5hbWUgPT0gXCJfcG9ydGFsSGludExhYmVsXCJcclxuICAgICAgICAgICAgICAgIHx8IGNoaWxkLm5hbWUgPT0gXCJfcG9ydGFsV2FycEZ4XCIpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlUG9ydGFsR2F0ZShuYW1lLCBwb3MsIGNvbG9yLCBsYWJlbFRleHQpIHtcclxuICAgICAgICBsZXQgZ2F0ZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgIGdhdGUucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGdhdGUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZ2F0ZS56SW5kZXggPSA1NjAwO1xyXG5cclxuICAgICAgICBsZXQgcmluZyA9IGdhdGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICByaW5nLmxpbmVXaWR0aCA9IDg7XHJcbiAgICAgICAgcmluZy5zdHJva2VDb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHJpbmcuY2lyY2xlKDAsIDAsIDQyKTtcclxuICAgICAgICByaW5nLnN0cm9rZSgpO1xyXG4gICAgICAgIHJpbmcubGluZVdpZHRoID0gMztcclxuICAgICAgICByaW5nLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMTgwKTtcclxuICAgICAgICByaW5nLmNpcmNsZSgwLCAwLCAyNik7XHJcbiAgICAgICAgcmluZy5zdHJva2UoKTtcclxuICAgICAgICByaW5nLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIDM0KTtcclxuICAgICAgICByaW5nLmNpcmNsZSgwLCAwLCAzNik7XHJcbiAgICAgICAgcmluZy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfcG9ydGFsR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGdhdGU7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgNzIpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgNTQpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMTQwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjg4O1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjQ1LCAxLjA4KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjQ1LCAyMjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjQ1LCAwLjg4KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjQ1LCAxMTApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKSk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9wb3J0YWxMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gZ2F0ZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDgwLCA0OCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gbGFiZWxUZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjg7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDMyO1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICByZXR1cm4gZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlUG9ydGFsSGludExhYmVsKHBvcykge1xyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfcG9ydGFsSGludExhYmVsXCIpO1xyXG4gICAgICAgIGhpbnQucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGhpbnQuc2V0UG9zaXRpb24oY2MudjMocG9zLngsIHBvcy55ICsgNzQsIDApKTtcclxuICAgICAgICBoaW50LnpJbmRleCA9IDU2MDU7XHJcbiAgICAgICAgaGludC5vcGFjaXR5ID0gMjIwO1xyXG4gICAgICAgIGhpbnQuY29sb3IgPSBjYy5jb2xvcigyMzAsIDI0NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGhpbnQuc2V0Q29udGVudFNpemUoMzIwLCAzNCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gaGludC5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi5ZCRIEEg6Zeo5byA54Gr77yM5a2Q5by55Lya5LuOIEIg6Zeo56m/5Ye6XCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgcmV0dXJuIGhpbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVBvcnRhbExpbmtGeChmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGxldCBmeCA9IG5ldyBjYy5Ob2RlKFwiX3BvcnRhbExpbmtGeFwiKTtcclxuICAgICAgICBmeC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZnguekluZGV4ID0gNTQwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTEwLCAyNTUsIDI0NSwgMTIwKTtcclxuICAgICAgICBncmFwaGljcy5tb3ZlVG8oZnJvbVBvcy54LCBmcm9tUG9zLnkpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVUbyh0b1Bvcy54LCB0b1Bvcy55KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBmeC5vcGFjaXR5ID0gMTIwO1xyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlVG8oMC4zNSwgMjEwKSxcclxuICAgICAgICAgICAgY2MuZmFkZVRvKDAuMzUsIDkwKVxyXG4gICAgICAgICkpKTtcclxuICAgICAgICByZXR1cm4gZng7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUG9ydGFsVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJQb3J0YWxUZXN0Tm9kZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGVudHJ5UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigyMjAsIDApKSwgOTApO1xyXG4gICAgICAgIGxldCBleGl0UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigtMTQwLCAxODApKSwgOTApO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGV4aXRQb3MuYWRkKGNjLnYyKDI4MCwgMCkpLCA5MCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbEdhdGUoXCJfcG9ydGFsR2F0ZUFcIiwgZW50cnlQb3MsIGNjLmNvbG9yKDkwLCAyMTUsIDI1NSwgMjU1KSwgXCJBXCIpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbEdhdGUoXCJfcG9ydGFsR2F0ZUJcIiwgZXhpdFBvcywgY2MuY29sb3IoMjU1LCAxMjAsIDIyMCwgMjU1KSwgXCJCXCIpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbExpbmtGeChlbnRyeVBvcywgZXhpdFBvcyk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlUG9ydGFsSGludExhYmVsKGVudHJ5UG9zKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVBvcnRhbFRlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BvcnRhbFBhaXJzLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogXCJwb3J0YWxBXCIsXHJcbiAgICAgICAgICAgIHBvczogZW50cnlQb3MsXHJcbiAgICAgICAgICAgIHJhZGl1czogNDQsXHJcbiAgICAgICAgICAgIGV4aXRJZDogXCJwb3J0YWxCXCIsXHJcbiAgICAgICAgICAgIGV4aXRQb3M6IGV4aXRQb3NcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxQYWlycy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IFwicG9ydGFsQlwiLFxyXG4gICAgICAgICAgICBwb3M6IGV4aXRQb3MsXHJcbiAgICAgICAgICAgIHJhZGl1czogNDQsXHJcbiAgICAgICAgICAgIGV4aXRJZDogXCJwb3J0YWxBXCIsXHJcbiAgICAgICAgICAgIGV4aXRQb3M6IGVudHJ5UG9zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduUG9ydGFsV2FycEZ4KHBvcywgY29sb3IpIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9wb3J0YWxXYXJwRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU3MDA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBmeC5zY2FsZSA9IDAuMzU7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGZ4LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyNik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIxMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE0KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgZngucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xNiwgMS43KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xNilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyQ2VudHJpZnVnYWxSaW5nVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lID09IFwiX2NlbnRyaWZ1Z2FsUmluZ1wiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX2NlbnRyaWZ1Z2FsUmluZ0hpbnRcIlxyXG4gICAgICAgICAgICAgICAgfHwgY2hpbGQubmFtZSA9PSBcIl9jZW50cmlmdWdhbFJpbmdHdWlkZVwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX2NlbnRyaWZ1Z2FsUmluZ0Z4XCIpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlQ2VudHJpZnVnYWxSaW5nTm9kZShwb3MsIHJhZGl1cywgY29sb3IpIHtcclxuICAgICAgICBsZXQgcmluZyA9IG5ldyBjYy5Ob2RlKFwiX2NlbnRyaWZ1Z2FsUmluZ1wiKTtcclxuICAgICAgICByaW5nLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICByaW5nLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIHJpbmcuekluZGV4ID0gNTY1MDtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9yaW5nR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IHJpbmc7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgNDApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICsgMjYpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMTYwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjg0O1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjQ1LCAxLjA2KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjQ1LCAyMjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjQ1LCAwLjg0KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjQ1LCAxMjApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKSk7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IHJpbmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA4O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQ2LCAyMjAsIDE4MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDE1KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCAyNCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDYpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFyYyA9IG5ldyBjYy5Ob2RlKFwiX3JpbmdBcmNcIiArIGkpO1xyXG4gICAgICAgICAgICBhcmMucGFyZW50ID0gcmluZztcclxuICAgICAgICAgICAgYXJjLmFuZ2xlID0gaSAqIDEyMDtcclxuICAgICAgICAgICAgbGV0IGFyY0dyYXBoaWNzID0gYXJjLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIGFyY0dyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XHJcbiAgICAgICAgICAgIGFyY0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcclxuICAgICAgICAgICAgYXJjR3JhcGhpY3MuYXJjKDAsIDAsIHJhZGl1cyArIDYsIC1NYXRoLlBJICogMC4yLCBNYXRoLlBJICogMC4zMiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmluZy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgxLjIsIC0xODApKSk7XHJcbiAgICAgICAgcmV0dXJuIHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ0d1aWRlKGZyb21Qb3MsIHRvUG9zKSB7XHJcbiAgICAgICAgbGV0IGd1aWRlID0gbmV3IGNjLk5vZGUoXCJfY2VudHJpZnVnYWxSaW5nR3VpZGVcIik7XHJcbiAgICAgICAgZ3VpZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGd1aWRlLnpJbmRleCA9IDU1MDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGd1aWRlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMTg0LCAxMTIsIDEyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubW92ZVRvKGZyb21Qb3MueCwgZnJvbVBvcy55KTtcclxuICAgICAgICBncmFwaGljcy5saW5lVG8odG9Qb3MueCwgdG9Qb3MueSk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3VpZGUub3BhY2l0eSA9IDEyMDtcclxuICAgICAgICBndWlkZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZVRvKDAuMywgMjEwKSxcclxuICAgICAgICAgICAgY2MuZmFkZVRvKDAuMywgOTApXHJcbiAgICAgICAgKSkpO1xyXG4gICAgICAgIHJldHVybiBndWlkZTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlQ2VudHJpZnVnYWxSaW5nSGludChwb3MpIHtcclxuICAgICAgICBsZXQgaGludCA9IG5ldyBjYy5Ob2RlKFwiX2NlbnRyaWZ1Z2FsUmluZ0hpbnRcIik7XHJcbiAgICAgICAgaGludC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgaGludC5zZXRQb3NpdGlvbihjYy52Myhwb3MueCwgcG9zLnkgKyAxMDAsIDApKTtcclxuICAgICAgICBoaW50LnpJbmRleCA9IDU2NjA7XHJcbiAgICAgICAgaGludC5vcGFjaXR5ID0gMjI1O1xyXG4gICAgICAgIGhpbnQuY29sb3IgPSBjYy5jb2xvcigyNTUsIDIzNSwgMjA1LCAyNTUpO1xyXG4gICAgICAgIGhpbnQuc2V0Q29udGVudFNpemUoNDIwLCA1OCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gaGludC5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi55u057q/5bCE5YWl56a75b+D5Yqb5ZyI77yM5a2Q5by55Lya57uV5ZyI5Yqg6YCf5ZCO55Sp5Ye6XCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjg7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgcmV0dXJuIGhpbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2VudHJpZnVnYWxSaW5nVGVzdEVuZW15KHBvcykge1xyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVteS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgOTApKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9tYXhIcCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgIHJldHVybiBlbmVteTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDZW50cmlmdWdhbFJpbmdUZXN0U2V0dXAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jbGVhckNlbnRyaWZ1Z2FsUmluZ1Rlc3ROb2RlcygpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigyMjAsIDApKSwgMTIwKTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gODI7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2VudGVyLmFkZChjYy52MigzMTAsIDkyKSksIDEwMCk7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gY2MuY29sb3IoMjU1LCAxNzAsIDk2LCAyNTUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVDZW50cmlmdWdhbFJpbmdOb2RlKGNlbnRlciwgcmFkaXVzLCBjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2VudHJpZnVnYWxSaW5nR3VpZGUocGxheWVyUG9zLCBjZW50ZXIpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ0hpbnQoY2VudGVyKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNlbnRyaWZ1Z2FsUmluZ1Rlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ0RhdGEgPSB7XHJcbiAgICAgICAgICAgIGlkOiBcImNlbnRyaWZ1Z2FsQVwiLFxyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgdHJpZ2dlclJhZGl1czogcmFkaXVzIC0gMTAsXHJcbiAgICAgICAgICAgIG9yYml0UmFkaXVzOiByYWRpdXMgKyAyLFxyXG4gICAgICAgICAgICByb3RhdGVBbmdsZTogTWF0aC5QSSAqIDAuNTIsXHJcbiAgICAgICAgICAgIGFuZ3VsYXJTcGVlZDogTWF0aC5QSSAqIDUuMixcclxuICAgICAgICAgICAgZGlyZWN0aW9uU2lnbjogLTEsXHJcbiAgICAgICAgICAgIHNwZWVkQm9vc3Q6IDEuOTUsXHJcbiAgICAgICAgICAgIGRhbWFnZUJvb3N0OiAxLjgsXHJcbiAgICAgICAgICAgIHJhZGl1c0V4cGFuZDogMjQsXHJcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduQ2VudHJpZnVnYWxSaW5nRngocG9zLCBpc1JlbGVhc2UgPSBmYWxzZSwgY29sb3IgPSBudWxsLCBkaXIgPSBudWxsLCBzcGVlZCA9IDApIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9jZW50cmlmdWdhbFJpbmdGeFwiKTtcclxuICAgICAgICBmeC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZnguc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZnguekluZGV4ID0gNTY5MDtcclxuICAgICAgICBmeC5vcGFjaXR5ID0gMjIwO1xyXG4gICAgICAgIGZ4LnNjYWxlID0gaXNSZWxlYXNlID8gMC40NSA6IDAuMzI7XHJcblxyXG4gICAgICAgIGxldCBlZmZlY3RDb2xvciA9IGNvbG9yIHx8IGNjLmNvbG9yKDI1NSwgMTcwLCA5NiwgMjU1KTtcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IGlzUmVsZWFzZSA/IDcgOiA1O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gZWZmZWN0Q29sb3I7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIGlzUmVsZWFzZSA/IDI2IDogMTgpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCBpc1JlbGVhc2UgPyAxMiA6IDgpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBpZiAoaXNSZWxlYXNlICYmIGRpciAmJiBkaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB0YWlsID0gbmV3IGNjLk5vZGUoXCJfY2VudHJpZnVnYWxSaW5nRnhUYWlsXCIpO1xyXG4gICAgICAgICAgICB0YWlsLnBhcmVudCA9IGZ4O1xyXG4gICAgICAgICAgICB0YWlsLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyhkaXIpIC0gOTA7XHJcbiAgICAgICAgICAgIGxldCB0YWlsR3JhcGhpY3MgPSB0YWlsLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIHRhaWxHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihlZmZlY3RDb2xvci5yLCBlZmZlY3RDb2xvci5nLCBlZmZlY3RDb2xvci5iLCAxNjApO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MubW92ZVRvKDAsIDM0ICsgTWF0aC5taW4oMjgsIHNwZWVkICogMC42KSk7XHJcbiAgICAgICAgICAgIHRhaWxHcmFwaGljcy5saW5lVG8oLTEwLCA4KTtcclxuICAgICAgICAgICAgdGFpbEdyYXBoaWNzLmxpbmVUbygxMCwgOCk7XHJcbiAgICAgICAgICAgIHRhaWxHcmFwaGljcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZngucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oaXNSZWxlYXNlID8gMC4xOCA6IDAuMTIsIGlzUmVsZWFzZSA/IDEuOCA6IDEuMzUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dChpc1JlbGVhc2UgPyAwLjE4IDogMC4xMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyRGFtYWdlRG91YmxlVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9kYW1hZ2VEb3VibGVBcmVhXCIgfHwgY2hpbGQubmFtZSA9PSBcIl9kYW1hZ2VEb3VibGVGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZURhbWFnZURvdWJsZUFyZWFOb2RlKHBvcywgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBhcmVhID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlQXJlYVwiKTtcclxuICAgICAgICBhcmVhLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBhcmVhLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGFyZWEuekluZGV4ID0gNTY1MDtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9kYW1hZ2VEb3VibGVHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDAsIDAsIDM1KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyArIDIwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE2MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44NTtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC41LCAxLjA4KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjUsIDIyMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMC44NSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAxMjApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKSk7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGFyZWEuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA2O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAzMCwgMzAsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAwLCAwLCAzMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyUmluZyA9IG5ldyBjYy5Ob2RlKFwiX2RhbWFnZURvdWJsZUlubmVyUmluZ1wiKTtcclxuICAgICAgICBpbm5lclJpbmcucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyUmluZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpbm5lckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAxMDAsIDEwMCwgMTUwKTtcclxuICAgICAgICBsZXQgc2VnbWVudHMgPSAyNDtcclxuICAgICAgICBsZXQgZGFzaExlbiA9IE1hdGguUEkgKiAyIC8gc2VnbWVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlID0gaSAqIGRhc2hMZW47XHJcbiAgICAgICAgICAgIGxldCBlbmRBbmdsZSA9IChpICsgMSkgKiBkYXNoTGVuO1xyXG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMgLSAxMiwgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5uZXJSaW5nLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDIuMCwgOTApKSk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9kYW1hZ2VEb3VibGVMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTQwLCA0OCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDYwLCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwieDJcIjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDM0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSA0MDtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IGhpbnQgPSBuZXcgY2MuTm9kZShcIl9kYW1hZ2VEb3VibGVIaW50XCIpO1xyXG4gICAgICAgIGhpbnQucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBoaW50LnNldFBvc2l0aW9uKGNjLnYyKDAsIHJhZGl1cyArIDM2KSk7XHJcbiAgICAgICAgaGludC5zZXRDb250ZW50U2l6ZSgzMDAsIDQwKTtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjU1LCAyMjAsIDIyMCwgMjIwKTtcclxuICAgICAgICBsZXQgaGludExhYmVsID0gaGludC5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGhpbnRMYWJlbC5zdHJpbmcgPSBcIuWtkOW8ueepv+i/hyDkvKTlrrN4MiDkvZPnp6/lop7lpKdcIjtcclxuICAgICAgICBoaW50TGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBoaW50TGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGhpbnRMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGhpbnRMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIHJldHVybiBhcmVhO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURhbWFnZURvdWJsZVRlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRGFtYWdlRG91YmxlVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJEYW1hZ2VEb3VibGVUZXN0Tm9kZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMjIwLCAwKSksIDEwMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDYwO1xyXG4gICAgICAgIGxldCBjb2xvciA9IGNjLmNvbG9yKDI1NSwgNDAsIDQwLCAyNTUpO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNlbnRlci5hZGQoY2MudjIocmFkaXVzICsgNDAsIDApKSwgOTApO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVEYW1hZ2VEb3VibGVBcmVhTm9kZShjZW50ZXIsIHJhZGl1cywgY29sb3IpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRGFtYWdlRG91YmxlVGVzdEVuZW15KGVuZW15UG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlQXJlYURhdGEgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgZGFtYWdlTXVsdGlwbGllcjogMixcclxuICAgICAgICAgICAgc2NhbGVNdWx0aXBsaWVyOiAxLjUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlFbnRlckRhbWFnZURvdWJsZUFyZWEoYnVsbGV0LCBmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgfHwgIWJ1bGxldCB8fCAhdGhpcy5fZGFtYWdlRG91YmxlQXJlYURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnVsbGV0Lmhhc1VzZWREYW1hZ2VEb3VibGVBcmVhICYmIGJ1bGxldC5oYXNVc2VkRGFtYWdlRG91YmxlQXJlYSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcmVhID0gdGhpcy5fZGFtYWdlRG91YmxlQXJlYURhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQoYXJlYS5jZW50ZXIsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gYXJlYS5yYWRpdXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldC5lbnRlckRhbWFnZURvdWJsZUFyZWEgPyBidWxsZXQuZW50ZXJEYW1hZ2VEb3VibGVBcmVhKGFyZWEpIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25EYW1hZ2VEb3VibGVGeChwb3MpIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9kYW1hZ2VEb3VibGVGeFwiKTtcclxuICAgICAgICBmeC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZnguc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZnguekluZGV4ID0gNTcwMDtcclxuICAgICAgICBmeC5vcGFjaXR5ID0gMjIwO1xyXG4gICAgICAgIGZ4LnNjYWxlID0gMC40O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNTAsIDUwLCAxODApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIwMCwgNTAsIDIyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI2KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgZngucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLCAxLjYpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhclNwZWVkRG91YmxlVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlQXJlYURhdGEgPSBudWxsO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lID09IFwiX3NwZWVkRG91YmxlQXJlYVwiIHx8IGNoaWxkLm5hbWUgPT0gXCJfc3BlZWREb3VibGVGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVNwZWVkRG91YmxlQXJlYU5vZGUocG9zLCByYWRpdXMsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBuZXcgY2MuTm9kZShcIl9zcGVlZERvdWJsZUFyZWFcIik7XHJcbiAgICAgICAgYXJlYS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgYXJlYS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBhcmVhLnpJbmRleCA9IDU2NTA7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCA4MCwgMjU1LCAzNSk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgKyAyMCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAxNjA7XHJcbiAgICAgICAgZ2xvdy5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMS4wOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAyMjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjUsIDAuODUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwgMTIwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBhcmVhLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDMwLCAxMzAsIDI1NSwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCA4MCwgMjU1LCAzMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyUmluZyA9IG5ldyBjYy5Ob2RlKFwiX3NwZWVkRG91YmxlSW5uZXJSaW5nXCIpO1xyXG4gICAgICAgIGlubmVyUmluZy5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXJSaW5nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxMDAsIDE4MCwgMjU1LCAxNTApO1xyXG4gICAgICAgIGxldCBzZWdtZW50cyA9IDI0O1xyXG4gICAgICAgIGxldCBkYXNoTGVuID0gTWF0aC5QSSAqIDIgLyBzZWdtZW50cztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGUgPSBpICogZGFzaExlbjtcclxuICAgICAgICAgICAgbGV0IGVuZEFuZ2xlID0gKGkgKyAxKSAqIGRhc2hMZW47XHJcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuYXJjKDAsIDAsIHJhZGl1cyAtIDEyLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbm5lclJpbmcucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMi4wLCAtOTApKSk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zcGVlZERvdWJsZUxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgxNDAsIDQ4KTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigxMDAsIDIwMCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwieDJcIjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDM0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSA0MDtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IGhpbnQgPSBuZXcgY2MuTm9kZShcIl9zcGVlZERvdWJsZUhpbnRcIik7XHJcbiAgICAgICAgaGludC5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGhpbnQuc2V0UG9zaXRpb24oY2MudjIoMCwgcmFkaXVzICsgMzYpKTtcclxuICAgICAgICBoaW50LnNldENvbnRlbnRTaXplKDMwMCwgNDApO1xyXG4gICAgICAgIGhpbnQuY29sb3IgPSBjYy5jb2xvcigyMDAsIDIyMCwgMjU1LCAyMjApO1xyXG4gICAgICAgIGxldCBoaW50TGFiZWwgPSBoaW50LmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgaGludExhYmVsLnN0cmluZyA9IFwi5a2Q5by556m/6L+HIOmAn+W6pngzXCI7XHJcbiAgICAgICAgaGludExhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgaGludExhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBoaW50TGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBoaW50TGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICByZXR1cm4gYXJlYTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTcGVlZERvdWJsZVRlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3BlZWREb3VibGVUZXN0U2V0dXAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jbGVhclNwZWVkRG91YmxlVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDIyMCwgMCkpLCAxMDApO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSA2MDtcclxuICAgICAgICBsZXQgY29sb3IgPSBjYy5jb2xvcigzMCwgMTMwLCAyNTUsIDI1NSk7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2VudGVyLmFkZChjYy52MihyYWRpdXMgKyA0MCwgMCkpLCA5MCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVNwZWVkRG91YmxlQXJlYU5vZGUoY2VudGVyLCByYWRpdXMsIGNvbG9yKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVNwZWVkRG91YmxlVGVzdEVuZW15KGVuZW15UG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3BlZWREb3VibGVBcmVhRGF0YSA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBzcGVlZE11bHRpcGxpZXI6IDMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlFbnRlclNwZWVkRG91YmxlQXJlYShidWxsZXQsIGZyb21Qb3MsIHRvUG9zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX3NwZWVkRG91YmxlQXJlYURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnVsbGV0Lmhhc1VzZWRTcGVlZERvdWJsZUFyZWEgJiYgYnVsbGV0Lmhhc1VzZWRTcGVlZERvdWJsZUFyZWEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXJlYSA9IHRoaXMuX3NwZWVkRG91YmxlQXJlYURhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQoYXJlYS5jZW50ZXIsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gYXJlYS5yYWRpdXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldC5lbnRlclNwZWVkRG91YmxlQXJlYSA/IGJ1bGxldC5lbnRlclNwZWVkRG91YmxlQXJlYShhcmVhKSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduU3BlZWREb3VibGVGeChwb3MpIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9zcGVlZERvdWJsZUZ4XCIpO1xyXG4gICAgICAgIGZ4LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBmeC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBmeC56SW5kZXggPSA1NzAwO1xyXG4gICAgICAgIGZ4Lm9wYWNpdHkgPSAyMjA7XHJcbiAgICAgICAgZnguc2NhbGUgPSAwLjQ7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGZ4LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNTAsIDE1MCwgMjU1LCAxODApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxMDAsIDIwMCwgMjU1LCAyMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyNik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwgMS42KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJTcHJlYWRCdWxsZXRUZXN0Tm9kZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0QXJlYURhdGEgPSBudWxsO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lID09IFwiX3NwcmVhZEJ1bGxldEFyZWFcIiB8fCBjaGlsZC5uYW1lID09IFwiX3NwcmVhZEJ1bGxldEZ4XCIpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlU3ByZWFkQnVsbGV0QXJlYU5vZGUocG9zLCByYWRpdXMsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBuZXcgY2MuTm9kZShcIl9zcHJlYWRCdWxsZXRBcmVhXCIpO1xyXG4gICAgICAgIGFyZWEucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGFyZWEuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYXJlYS56SW5kZXggPSA1NjUwO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3NwcmVhZEJ1bGxldEdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDIwMCwgODAsIDM1KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyArIDIwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE2MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44NTtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC41LCAxLjA4KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjUsIDIyMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMC44NSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAxMjApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKSk7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGFyZWEuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA2O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMzAsIDIzMCwgMTAwLCAyNTUpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDIwMCwgODAsIDMwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzIC0gNCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgaW5uZXJSaW5nID0gbmV3IGNjLk5vZGUoXCJfc3ByZWFkQnVsbGV0SW5uZXJSaW5nXCIpO1xyXG4gICAgICAgIGlubmVyUmluZy5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXJSaW5nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxMDAsIDI1NSwgMTUwLCAxNTApO1xyXG4gICAgICAgIGxldCBzZWdtZW50cyA9IDI0O1xyXG4gICAgICAgIGxldCBkYXNoTGVuID0gTWF0aC5QSSAqIDIgLyBzZWdtZW50cztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGUgPSBpICogZGFzaExlbjtcclxuICAgICAgICAgICAgbGV0IGVuZEFuZ2xlID0gKGkgKyAxKSAqIGRhc2hMZW47XHJcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuYXJjKDAsIDAsIHJhZGl1cyAtIDEyLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbm5lclJpbmcucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMi4wLCA2MCkpKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3NwcmVhZEJ1bGxldExhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBhcmVhO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgxNDAsIDQ4KTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigxMDAsIDI1NSwgMTQwLCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwieDNcIjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDM0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSA0MDtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IGhpbnQgPSBuZXcgY2MuTm9kZShcIl9zcHJlYWRCdWxsZXRIaW50XCIpO1xyXG4gICAgICAgIGhpbnQucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBoaW50LnNldFBvc2l0aW9uKGNjLnYyKDAsIHJhZGl1cyArIDM2KSk7XHJcbiAgICAgICAgaGludC5zZXRDb250ZW50U2l6ZSgzMDAsIDQwKTtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjAwLCAyNTUsIDIyMCwgMjIwKTtcclxuICAgICAgICBsZXQgaGludExhYmVsID0gaGludC5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGhpbnRMYWJlbC5zdHJpbmcgPSBcIuWtkOW8ueepv+i/hyAx5Y+YM1wiO1xyXG4gICAgICAgIGhpbnRMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGhpbnRMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgaGludExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgaGludExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFyZWE7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3ByZWFkQnVsbGV0VGVzdEVuZW15KHBvcykge1xyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVteS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgOTApKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9tYXhIcCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgIHJldHVybiBlbmVteTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTcHJlYWRCdWxsZXRUZXN0U2V0dXAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jbGVhclNwcmVhZEJ1bGxldFRlc3ROb2RlcygpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigyMjAsIDApKSwgMTAwKTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gNjA7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gY2MuY29sb3IoMzAsIDIzMCwgMTAwLCAyNTUpO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNlbnRlci5hZGQoY2MudjIoMjAwLCAwKSksIDkwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlU3ByZWFkQnVsbGV0QXJlYU5vZGUoY2VudGVyLCByYWRpdXMsIGNvbG9yKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVNwcmVhZEJ1bGxldFRlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldEFyZWFEYXRhID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIHNwcmVhZENvdW50OiAyLFxyXG4gICAgICAgICAgICBzcHJlYWRBbmdsZTogMjAsXHJcbiAgICAgICAgICAgIF9zcGxpdFRyaWdnZXJlZDogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlFbnRlclNwcmVhZEJ1bGxldEFyZWEoYnVsbGV0LCBmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgfHwgIWJ1bGxldCB8fCAhdGhpcy5fc3ByZWFkQnVsbGV0QXJlYURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyZWEgPSB0aGlzLl9zcHJlYWRCdWxsZXRBcmVhRGF0YTtcclxuICAgICAgICBpZiAoYXJlYS5fc3BsaXRUcmlnZ2VyZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZGlzdGFuY2VQb2ludFRvU2VnbWVudChhcmVhLmNlbnRlciwgY2MudjIoZnJvbVBvcyksIGNjLnYyKHRvUG9zKSkgPiBhcmVhLnJhZGl1cykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcmVhLl9zcGxpdFRyaWdnZXJlZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldC5lbnRlclNwcmVhZEJ1bGxldEFyZWEgPyBidWxsZXQuZW50ZXJTcHJlYWRCdWxsZXRBcmVhKGFyZWEpIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25TcHJlYWRCdWxsZXRGeChwb3MpIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9zcHJlYWRCdWxsZXRGeFwiKTtcclxuICAgICAgICBmeC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZnguc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZnguekluZGV4ID0gNTcwMDtcclxuICAgICAgICBmeC5vcGFjaXR5ID0gMjIwO1xyXG4gICAgICAgIGZ4LnNjYWxlID0gMC40O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDUwLCAyMzAsIDEwMCwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCAyNTUsIDE1MCwgMjIwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjYpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBmeC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDEuNiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyQm91bmNlT2JzdGFjbGVUZXN0Tm9kZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVzID0gW107XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUuaW5kZXhPZihcIl9ib3VuY2VPYnN0YWNsZVwiKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUJvdW5jZUNpcmNsZU9ic3RhY2xlKHBvcywgcmFkaXVzKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZShcIl9ib3VuY2VPYnN0YWNsZUNpcmNsZVwiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIG5vZGUuekluZGV4ID0gNTYwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gbm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMTIwLCAxODAsIDYwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgODAsIDE4MCwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVzLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlOiBcImNpcmNsZVwiLFxyXG4gICAgICAgICAgICBjZW50ZXI6IGNjLnYyKHBvcyksXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBub2RlOiBub2RlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlQm91bmNlTGluZU9ic3RhY2xlKGZyb21Qb3MsIHRvUG9zKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZShcIl9ib3VuY2VPYnN0YWNsZUxpbmVcIik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSA1NjAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBub2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgODAsIDE4MCwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5tb3ZlVG8oZnJvbVBvcy54LCBmcm9tUG9zLnkpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVUbyh0b1Bvcy54LCB0b1Bvcy55KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IEEgPSBjYy52Mihmcm9tUG9zKTtcclxuICAgICAgICBsZXQgQiA9IGNjLnYyKHRvUG9zKTtcclxuICAgICAgICBsZXQgZGlyID0gQi5zdWIoQSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IG5vcm1hbCA9IGNjLnYyKC1kaXIueSwgZGlyLngpO1xyXG5cclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwibGluZVwiLFxyXG4gICAgICAgICAgICBBOiBBLFxyXG4gICAgICAgICAgICBCOiBCLFxyXG4gICAgICAgICAgICBub3JtYWw6IG5vcm1hbCxcclxuICAgICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQm91bmNlT2JzdGFjbGVUZXN0U2V0dXAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jbGVhckJvdW5jZU9ic3RhY2xlVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVCb3VuY2VDaXJjbGVPYnN0YWNsZSh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDE4MCwgNDApKSwgODApLCAzNik7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQm91bmNlQ2lyY2xlT2JzdGFjbGUodGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigxODAsIC01MCkpLCA4MCksIDI4KTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVCb3VuY2VMaW5lT2JzdGFjbGUoXHJcbiAgICAgICAgICAgIHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMzIwLCAtODApKSwgNjApLFxyXG4gICAgICAgICAgICB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDMyMCwgODApKSwgNjApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbGV0IGVuZW15UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52Mig0ODAsIDApKSwgOTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQm91bmNlT2JzdGFjbGVUZXN0RW5lbXkoZW5lbXlQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdEVuZW15KHBvcykge1xyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVteS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgOTApKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9tYXhIcCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgIHJldHVybiBlbmVteTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlCb3VuY2VCdWxsZXRPbk9ic3RhY2xlKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgfHwgIWJ1bGxldCB8fCB0aGlzLl9ib3VuY2VPYnN0YWNsZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZyb20gPSBjYy52Mihmcm9tUG9zKTtcclxuICAgICAgICBsZXQgdG8gPSBjYy52Mih0b1Bvcyk7XHJcbiAgICAgICAgbGV0IGRpckJ1bGxldCA9IHRvLnN1Yihmcm9tKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ib3VuY2VPYnN0YWNsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9ic3RhY2xlID0gdGhpcy5fYm91bmNlT2JzdGFjbGVzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9ic3RhY2xlLnR5cGUgPT0gXCJjaXJjbGVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbnRlciA9IG9ic3RhY2xlLmNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSBvYnN0YWNsZS5yYWRpdXM7XHJcbiAgICAgICAgICAgICAgICBsZXQgQUMgPSBjZW50ZXIuc3ViKGZyb20pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlblNxciA9IGRpckJ1bGxldC5tYWdTcXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZW5TcXIgPD0gMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IEFDLmRvdChkaXJCdWxsZXQpIC8gbGVuU3FyO1xyXG4gICAgICAgICAgICAgICAgdCA9IGNjLm1pc2MuY2xhbXBmKHQsIDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3QgPSBmcm9tLmFkZChkaXJCdWxsZXQubXVsKHQpKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gY2VudGVyLnN1YihjbG9zZXN0KS5tYWcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+PSByYWRpdXMpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cmZhY2Ugbm9ybWFsIHBvaW50cyBmcm9tIGNlbnRlciBvdXR3YXJkIHRvIHRoZSBoaXQgcG9pbnQgb24gY2lyY3VtZmVyZW5jZVxyXG4gICAgICAgICAgICAgICAgbGV0IHN1cmZhY2VOb3JtYWwgPSBjbG9zZXN0LnN1YihjZW50ZXIpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1cmZhY2VOb3JtYWwubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cmZhY2VOb3JtYWwgPSBjYy52MigxLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzdXJmYWNlTm9ybWFsIHNob3VsZCBwb2ludCB0b3dhcmQgdGhlIGluY29taW5nIGJ1bGxldFxyXG4gICAgICAgICAgICAgICAgbGV0IGRvdCA9IGJ1bGxldC5fZGlyLmRvdChzdXJmYWNlTm9ybWFsKTtcclxuICAgICAgICAgICAgICAgIGlmIChkb3QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VyZmFjZU5vcm1hbCA9IHN1cmZhY2VOb3JtYWwubXVsKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBkb3QgPSAtZG90O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZWZsZWN0RGlyID0gYnVsbGV0Ll9kaXIuc3ViKHN1cmZhY2VOb3JtYWwubXVsKDIgKiBkb3QpKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5fZGlyID0gcmVmbGVjdERpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyhidWxsZXQuX2RpcikgLSA5MDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQbGFjZSBidWxsZXQgb24gdGhlIGNpcmN1bWZlcmVuY2UgYXQgdGhlIGhpdCBwb2ludCwgdGhlbiBwdXNoIG91dHdhcmRcclxuICAgICAgICAgICAgICAgIGxldCBoaXRQb2ludCA9IGNlbnRlci5hZGQoY2xvc2VzdC5zdWIoY2VudGVyKS5ub3JtYWxpemUoKS5tdWwocmFkaXVzKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5zZXRQb3NpdGlvbihjYy52MyhoaXRQb2ludC5hZGQoYnVsbGV0Ll9kaXIubXVsKDgpKSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JzdGFjbGUudHlwZSA9PSBcImxpbmVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IEEgPSBvYnN0YWNsZS5BO1xyXG4gICAgICAgICAgICAgICAgbGV0IEIgPSBvYnN0YWNsZS5CO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpck9ic3RhY2xlID0gQi5zdWIoQSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3Jvc3MgcHJvZHVjdCB0byBjaGVjayBzZWdtZW50IGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlbm9tID0gZGlyQnVsbGV0LnggKiBkaXJPYnN0YWNsZS55IC0gZGlyQnVsbGV0LnkgKiBkaXJPYnN0YWNsZS54O1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbm9tKSA8IDAuMDAwMSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHQxID0gKChBLnggLSBmcm9tLngpICogZGlyT2JzdGFjbGUueSAtIChBLnkgLSBmcm9tLnkpICogZGlyT2JzdGFjbGUueCkgLyBkZW5vbTtcclxuICAgICAgICAgICAgICAgIGxldCB0MiA9ICgoQS54IC0gZnJvbS54KSAqIGRpckJ1bGxldC55IC0gKEEueSAtIGZyb20ueSkgKiBkaXJCdWxsZXQueCkgLyBkZW5vbTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodDEgPCAwIHx8IHQxID4gMSB8fCB0MiA8IDAgfHwgdDIgPiAxKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbm9ybWFsID0gb2JzdGFjbGUubm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvdCA9IGJ1bGxldC5fZGlyLmRvdChub3JtYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvdCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBub3JtYWwgPSBub3JtYWwubXVsKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBkb3QgPSAtZG90O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZWZsZWN0RGlyID0gYnVsbGV0Ll9kaXIuc3ViKG5vcm1hbC5tdWwoMiAqIGRvdCkpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Ll9kaXIgPSByZWZsZWN0RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKGJ1bGxldC5fZGlyKSAtIDkwO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuc2V0UG9zaXRpb24oY2MudjMoZnJvbS5hZGQoYnVsbGV0Ll9kaXIubXVsKDgpKSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJCbGFja0hvbGVUZXN0Tm9kZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlQXJlYURhdGEgPSBudWxsO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lID09IFwiX2JsYWNrSG9sZUFyZWFcIiB8fCBjaGlsZC5uYW1lID09IFwiX2JsYWNrSG9sZUZ4XCIpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlQmxhY2tIb2xlQXJlYU5vZGUocG9zLCByYWRpdXMsIGRlc3Ryb3lSYWRpdXMsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBuZXcgY2MuTm9kZShcIl9ibGFja0hvbGVBcmVhXCIpO1xyXG4gICAgICAgIGFyZWEucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGFyZWEuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYXJlYS56SW5kZXggPSA1NjUwO1xyXG5cclxuICAgICAgICAvLyBPdXRlciBnbG93XHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9ibGFja0hvbGVHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig2MCwgMjAsIDEwMCwgMjUpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICsgMzApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMTQwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjgyO1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjgsIDEuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuOCwgMjEwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC44LCAwLjgyKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjgsIDExMClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpKTtcclxuXHJcbiAgICAgICAgLy8gT3V0ZXIgcmluZ1xyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGFyZWEuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCA0MCwgMTgwLCAyMDApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDQwLCAxMCwgODAsIDM1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzIC0gMyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICAvLyBJbm5lciBhY2NyZXRpb24gZGlzayByaW5nc1xyXG4gICAgICAgIGxldCByaW5nQ291bnQgPSA0O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmluZ0NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJpbmdSYWRpdXMgPSByYWRpdXMgLSAocmFkaXVzIC0gZGVzdHJveVJhZGl1cykgKiAoaSArIDEpIC8gKHJpbmdDb3VudCArIDEpO1xyXG4gICAgICAgICAgICBsZXQgcmluZ05vZGUgPSBuZXcgY2MuTm9kZShcIl9ibGFja0hvbGVSaW5nXCIgKyBpKTtcclxuICAgICAgICAgICAgcmluZ05vZGUucGFyZW50ID0gYXJlYTtcclxuICAgICAgICAgICAgbGV0IHJpbmdHcmFwaGljcyA9IHJpbmdOb2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIHJpbmdHcmFwaGljcy5saW5lV2lkdGggPSAzIC0gaSAqIDAuNTtcclxuICAgICAgICAgICAgbGV0IGFscGhhID0gMTgwIC0gaSAqIDM1O1xyXG4gICAgICAgICAgICByaW5nR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxMjAsIDUwLCAyMDAsIGFscGhhKTtcclxuICAgICAgICAgICAgcmluZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCByaW5nUmFkaXVzKTtcclxuICAgICAgICAgICAgcmluZ0dyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICByaW5nTm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgxLjUgKyBpICogMC4zLCA5MCArIGkgKiAzMCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERhcmsgY29yZVxyXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlQ29yZVwiKTtcclxuICAgICAgICBjb3JlLnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGNvcmVHcmFwaGljcyA9IGNvcmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMjIwKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIGRlc3Ryb3lSYWRpdXMpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTgwLCAxMDAsIDI1NSwgMTAwKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIGRlc3Ryb3lSYWRpdXMpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgLy8gTGFiZWxcclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDE0MCwgNDgpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDE4MCwgMTIwLCAyNTUsIDIyMCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLpu5HmtJ5cIjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDMwO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAzNjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgLy8gSGludFxyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlSGludFwiKTtcclxuICAgICAgICBoaW50LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgaGludC5zZXRQb3NpdGlvbihjYy52MigwLCByYWRpdXMgKyAzNikpO1xyXG4gICAgICAgIGhpbnQuc2V0Q29udGVudFNpemUoMzIwLCA0MCk7XHJcbiAgICAgICAgaGludC5jb2xvciA9IGNjLmNvbG9yKDIwMCwgMTgwLCAyNTUsIDIwMCk7XHJcbiAgICAgICAgbGV0IGhpbnRMYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBoaW50TGFiZWwuc3RyaW5nID0gXCLlrZDlvLnpnaDov5HkvJrooqvlkLjlvJXlkJ7lmaxcIjtcclxuICAgICAgICBoaW50TGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBoaW50TGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGhpbnRMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGhpbnRMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIHJldHVybiBhcmVhO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJsYWNrSG9sZVRlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQmxhY2tIb2xlVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJCbGFja0hvbGVUZXN0Tm9kZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMzAwLCAwKSksIDEyMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDEwMDtcclxuICAgICAgICBsZXQgZGVzdHJveVJhZGl1cyA9IDE0O1xyXG4gICAgICAgIGxldCBjb2xvciA9IGNjLmNvbG9yKDgwLCAzMCwgMTYwLCAyMDApO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNlbnRlci5hZGQoY2MudjIoMjgwLCAxMDApKSwgOTApO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVCbGFja0hvbGVBcmVhTm9kZShjZW50ZXIsIHJhZGl1cywgZGVzdHJveVJhZGl1cywgY29sb3IpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQmxhY2tIb2xlVGVzdEVuZW15KGVuZW15UG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlQXJlYURhdGEgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgZGVzdHJveVJhZGl1czogZGVzdHJveVJhZGl1cyxcclxuICAgICAgICAgICAgZ3Jhdml0eVN0cmVuZ3RoOiAxNjAsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlFbnRlckJsYWNrSG9sZUFyZWEoYnVsbGV0LCBmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGlmICghdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgfHwgIWJ1bGxldCB8fCAhdGhpcy5fYmxhY2tIb2xlQXJlYURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKGJ1bGxldC5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgZGlzdCA9IHBvcy5zdWIodGhpcy5fYmxhY2tIb2xlQXJlYURhdGEuY2VudGVyKS5tYWcoKTtcclxuICAgICAgICByZXR1cm4gZGlzdCA8IHRoaXMuX2JsYWNrSG9sZUFyZWFEYXRhLnJhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICBzcGF3bkJsYWNrSG9sZVN3YWxsb3dGeChwb3MpIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9ibGFja0hvbGVGeFwiKTtcclxuICAgICAgICBmeC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZnguc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZnguekluZGV4ID0gNTcwMDtcclxuICAgICAgICBmeC5vcGFjaXR5ID0gMjIwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDgwLCAzMCwgMTYwLCAxODApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxODAsIDEwMCwgMjU1LCAyMDApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxOCk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjUsIDApLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjI1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDbHVzdGVyQm9tYlRlc3RFbmVtaWVzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gcGxheWVyUG9zLmFkZChjYy52Mig1MDAsIC0xMjApKTtcclxuICAgICAgICBsZXQgY29scyA9IDQ7XHJcbiAgICAgICAgbGV0IHJvd3MgPSAzO1xyXG4gICAgICAgIGxldCBzcGFjaW5nWCA9IDgwO1xyXG4gICAgICAgIGxldCBzcGFjaW5nWSA9IDcwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHJvd3M7IHIrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNvbHM7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKHN0YXJ0UG9zLnggKyBjICogc3BhY2luZ1gsIHN0YXJ0UG9zLnkgKyByICogc3BhY2luZ1kpLCA1MCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICAgICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjMocG9zKTtcclxuICAgICAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICAgICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSAzMDtcclxuICAgICAgICAgICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSAzMDtcclxuICAgICAgICAgICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICAgICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNsdXN0ZXJCb21iVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3ZlcnJpZGUgcGxheWVyJ3MgYnVsbGV0IHR5cGUgdG8gZmlyZSBjbHVzdGVyIGJvbWJzXHJcbiAgICAgICAgbGV0IHBsYXllclNjcmlwdCA9IHRoaXMuX3BsYXllci5zY3JpcHQ7XHJcbiAgICAgICAgaWYgKHBsYXllclNjcmlwdC5fY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHBsYXllclNjcmlwdC5fY29uZmlnLkJUeXBlMSA9IDEwMTtcclxuICAgICAgICAgICAgcGxheWVyU2NyaXB0Ll9jb25maWcuQlR5cGUyID0gMTAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDbHVzdGVyQm9tYlRlc3RFbmVtaWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFRlc3RFZmZlY3RQcmV2aWV3UG9zKCkge1xyXG4gICAgICAgIGxldCBiYXNlUG9zID0gdGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKVxyXG4gICAgICAgICAgICA/IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbilcclxuICAgICAgICAgICAgOiAodGhpcy5fcGxheWVyQm9yblBvcyA/IGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MpIDogY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihiYXNlUG9zLmFkZChjYy52MigxODAsIDk2KSksIDEyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZWxvYWRSaXBwbGVEaXN0b3J0aW9uRWZmZWN0KCkge1xyXG4gICAgICAgIGlmIChjYy5keW5hbWljQXRsYXNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInNoYWRlci9yaXBwbGUtZGlzdG9ydGlvblwiLCBjYy5FZmZlY3RBc3NldCwgKGVyciwgZWZmZWN0QXNzZXQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwibG9hZCByaXBwbGUgZGlzdG9ydGlvbiBlZmZlY3QgZmFpbGVkXCIsIGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmlwcGxlRGlzdG9ydGlvbkVmZmVjdCA9IGVmZmVjdEFzc2V0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95UmlwcGxlQ2FwdHVyZVJlc291cmNlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhLnRhcmdldFRleHR1cmUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYU5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFJpcHBsZUNhcHR1cmVDYW1lcmEoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JpcHBsZUNhcHR1cmVDYW1lcmEgJiYgY2MuaXNWYWxpZCh0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50Tm9kZSB8fCAhY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYW1lcmFOb2RlID0gbmV3IGNjLk5vZGUoXCJfcmlwcGxlQ2FwdHVyZUNhbWVyYVwiKTtcclxuICAgICAgICBjYW1lcmFOb2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgY2FtZXJhTm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBjYW1lcmFOb2RlLnpJbmRleCA9IC05OTk5O1xyXG4gICAgICAgIGxldCBjYW1lcmEgPSBjYW1lcmFOb2RlLmFkZENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgICAgIGNhbWVyYS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBjYW1lcmEub3J0aG8gPSB0cnVlO1xyXG4gICAgICAgIGNhbWVyYS5hbGlnbldpdGhTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIGNhbWVyYS5kZXB0aCA9IC05OTk7XHJcbiAgICAgICAgY2FtZXJhLmN1bGxpbmdNYXNrID0gMHhmZmZmZmZmZjtcclxuICAgICAgICBjYW1lcmEuYmFja2dyb3VuZENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgY2FtZXJhLmNsZWFyRmxhZ3MgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSA9IGNhbWVyYU5vZGU7XHJcbiAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICByZXR1cm4gY2FtZXJhO1xyXG4gICAgfVxyXG5cclxuICAgIF9jYXB0dXJlUmlwcGxlU2NyZWVuRnJhbWUoKSB7XHJcbiAgICAgICAgbGV0IGNhbWVyYSA9IHRoaXMuX2dldFJpcHBsZUNhcHR1cmVDYW1lcmEoKTtcclxuICAgICAgICBpZiAoIWNhbWVyYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2aWV3cG9ydFNpemUgPSB0aGlzLl9nZXRWaWV3cG9ydFNpemUoKTtcclxuICAgICAgICBsZXQgcmVuZGVyVGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgbGV0IGdsID0gKGNjLmdhbWUgYXMgYW55KS5fcmVuZGVyQ29udGV4dDtcclxuICAgICAgICBpZiAoIWdsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXJUZXh0dXJlLmluaXRXaXRoU2l6ZShNYXRoLmNlaWwodmlld3BvcnRTaXplLndpZHRoKSwgTWF0aC5jZWlsKHZpZXdwb3J0U2l6ZS5oZWlnaHQpLCBnbC5TVEVOQ0lMX0lOREVYOCk7XHJcbiAgICAgICAgY2FtZXJhLnRhcmdldFRleHR1cmUgPSByZW5kZXJUZXh0dXJlO1xyXG4gICAgICAgIGNhbWVyYS5yZW5kZXIoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKSk7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSgpO1xyXG4gICAgICAgIHNwcml0ZUZyYW1lLnNldFRleHR1cmUocmVuZGVyVGV4dHVyZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3ByaXRlRnJhbWU6IHNwcml0ZUZyYW1lLFxyXG4gICAgICAgICAgICByZW5kZXJUZXh0dXJlOiByZW5kZXJUZXh0dXJlLFxyXG4gICAgICAgICAgICB2aWV3cG9ydFNpemU6IHZpZXdwb3J0U2l6ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRSaXBwbGVDZW50ZXJVdihvdmVybGF5Tm9kZSwgd29ybGRQb3MsIHZpZXdwb3J0U2l6ZSkge1xyXG4gICAgICAgIGlmICghb3ZlcmxheU5vZGUgfHwgIWNjLmlzVmFsaWQob3ZlcmxheU5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy52MigwLjUsIDAuNSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9jYWxQb3MgPSBvdmVybGF5Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRYID0gKGxvY2FsUG9zLnggKyB2aWV3cG9ydFNpemUud2lkdGggKiAwLjUpIC8gTWF0aC5tYXgoMSwgdmlld3BvcnRTaXplLndpZHRoKTtcclxuICAgICAgICBsZXQgbm9ybWFsaXplZFkgPSAobG9jYWxQb3MueSArIHZpZXdwb3J0U2l6ZS5oZWlnaHQgKiAwLjUpIC8gTWF0aC5tYXgoMSwgdmlld3BvcnRTaXplLmhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKFxyXG4gICAgICAgICAgICBjYy5taXNjLmNsYW1wZihub3JtYWxpemVkWCwgMCwgMSksXHJcbiAgICAgICAgICAgIGNjLm1pc2MuY2xhbXBmKDEgLSBub3JtYWxpemVkWSwgMCwgMSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkRpc3RvcnRpb25SaXBwbGVBdChwb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3JpcHBsZURpc3RvcnRpb25FZmZlY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJlbG9hZFJpcHBsZURpc3RvcnRpb25FZmZlY3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNhcHR1cmUgPSB0aGlzLl9jYXB0dXJlUmlwcGxlU2NyZWVuRnJhbWUoKTtcclxuICAgICAgICBpZiAoIWNhcHR1cmUgfHwgIWNhcHR1cmUuc3ByaXRlRnJhbWUgfHwgIWNhcHR1cmUucmVuZGVyVGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2NyZWVuUGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBpZiAoIXNjcmVlblBhcmVudCB8fCAhY2MuaXNWYWxpZChzY3JlZW5QYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvdmVybGF5ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uRGlzdG9ydGlvblJpcHBsZVwiKTtcclxuICAgICAgICBvdmVybGF5LnBhcmVudCA9IHNjcmVlblBhcmVudDtcclxuICAgICAgICBvdmVybGF5LnNldENvbnRlbnRTaXplKGNhcHR1cmUudmlld3BvcnRTaXplKTtcclxuICAgICAgICBvdmVybGF5LnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIG92ZXJsYXkuekluZGV4ID0gMTUwMDtcclxuXHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IG92ZXJsYXkuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gY2FwdHVyZS5zcHJpdGVGcmFtZTtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSBjYy5NYXRlcmlhbC5jcmVhdGUodGhpcy5fcmlwcGxlRGlzdG9ydGlvbkVmZmVjdCwgMCk7XHJcbiAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKFwiVVNFX1RFWFRVUkVcIiwgdHJ1ZSwgMCk7XHJcbiAgICAgICAgbWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJ0ZXh0dXJlXCIsIGNhcHR1cmUucmVuZGVyVGV4dHVyZSk7XHJcblxyXG4gICAgICAgIGxldCBtYXRlcmlhbFZhcmlhbnQgPSBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCBzcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zZXRNYXRlcmlhbCgwLCBtYXRlcmlhbFZhcmlhbnQpO1xyXG5cclxuICAgICAgICBsZXQgd29ybGRQb3MgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKHBvcykpO1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLl9nZXRSaXBwbGVDZW50ZXJVdihvdmVybGF5LCB3b3JsZFBvcywgY2FwdHVyZS52aWV3cG9ydFNpemUpO1xyXG5cclxuICAgICAgICBsZXQgcmlwcGxlID0gb3ZlcmxheS5hZGRDb21wb25lbnQoUmlwcGxlU2hvY2t3YXZlKTtcclxuICAgICAgICByaXBwbGUuaW5pdChcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgc3ByaXRlLFxyXG4gICAgICAgICAgICBtYXRlcmlhbFZhcmlhbnQsXHJcbiAgICAgICAgICAgIGNlbnRlcixcclxuICAgICAgICAgICAgY2FwdHVyZS52aWV3cG9ydFNpemUsXHJcbiAgICAgICAgICAgIGNhcHR1cmUuc3ByaXRlRnJhbWUsXHJcbiAgICAgICAgICAgIGNhcHR1cmUucmVuZGVyVGV4dHVyZSxcclxuICAgICAgICAgICAgMC4zNFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChwb3MpIHtcclxuICAgICAgICB0aGlzLl9zcGF3bkRpc3RvcnRpb25SaXBwbGVBdChwb3MpO1xyXG4gICAgICAgIHRoaXMuX3NwYXduRXhwbG9zaW9uU3RhcmJ1cnN0QXQocG9zKTtcclxuICAgICAgICB0aGlzLl9zcGF3bkV4cGxvc2lvbkdsb3dBdChwb3MsIDAuMzYpO1xyXG4gICAgICAgIHRoaXMuX3NwYXduRXhwbG9zaW9uQ29yZUJ1cnN0QXQocG9zLCAwLjIyKTtcclxuICAgICAgICB0aGlzLl9zcGF3blRyYW5zcGFyZW50U2hvY2t3YXZlQXQocG9zLCA3NiwgMzgwLCAwLCAwLjM0LCAxODAsIDEwKTtcclxuICAgICAgICB0aGlzLl9zcGF3blRyYW5zcGFyZW50U2hvY2t3YXZlQXQocG9zLCAzOCwgMjIwLCAwLjA0LCAwLjI0LCAxMzUsIDYpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYm9vbVwiKTtcclxuICAgICAgICB0aGlzLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduRXhwbG9zaW9uU3RhcmJ1cnN0QXQocG9zKSB7XHJcbiAgICAgICAgbGV0IGJ1cnN0ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uU3RhcmJ1cnN0XCIpO1xyXG4gICAgICAgIGJ1cnN0LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBidXJzdC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBidXJzdC56SW5kZXggPSA2MDU1O1xyXG4gICAgICAgIGJ1cnN0Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgYnVyc3Quc2NhbGUgPSAwLjQ1O1xyXG5cclxuICAgICAgICBsZXQgcmF5Q29uZmlncyA9IFtcclxuICAgICAgICAgICAge2FuZ2xlOiAwLCBsZW5ndGg6IDE3MCwgd2lkdGg6IDE4LCBhbHBoYTogMTYwfSxcclxuICAgICAgICAgICAge2FuZ2xlOiA0NSwgbGVuZ3RoOiAxNDAsIHdpZHRoOiAxNCwgYWxwaGE6IDE1MH0sXHJcbiAgICAgICAgICAgIHthbmdsZTogOTAsIGxlbmd0aDogMTc1LCB3aWR0aDogMTgsIGFscGhhOiAxNjV9LFxyXG4gICAgICAgICAgICB7YW5nbGU6IDEzNSwgbGVuZ3RoOiAxNDIsIHdpZHRoOiAxNCwgYWxwaGE6IDE1MH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJheUNvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHJheUNvbmZpZ3NbaV07XHJcbiAgICAgICAgICAgIGxldCByYXkgPSBuZXcgY2MuTm9kZShcIl9leHBsb3Npb25SYXlcIiArIGkpO1xyXG4gICAgICAgICAgICByYXkucGFyZW50ID0gYnVyc3Q7XHJcbiAgICAgICAgICAgIHJheS5hbmdsZSA9IGNvbmZpZy5hbmdsZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IHJheS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCBjb25maWcuYWxwaGEpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8oMCwgY29uZmlnLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtY29uZmlnLndpZHRoLCBjb25maWcubGVuZ3RoICogMC4yNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygwLCAxMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyhjb25maWcud2lkdGgsIGNvbmZpZy5sZW5ndGggKiAwLjI0KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhvdENyb3NzID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uSG90Q3Jvc3NcIik7XHJcbiAgICAgICAgaG90Q3Jvc3MucGFyZW50ID0gYnVyc3Q7XHJcbiAgICAgICAgbGV0IGNyb3NzR3JhcGhpY3MgPSBob3RDcm9zcy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGNyb3NzR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDAsIDE4MCwgMTUwKTtcclxuICAgICAgICBjcm9zc0dyYXBoaWNzLnJlY3QoLTExMiwgLTUsIDIyNCwgMTApO1xyXG4gICAgICAgIGNyb3NzR3JhcGhpY3MucmVjdCgtNSwgLTExMiwgMTAsIDIyNCk7XHJcbiAgICAgICAgY3Jvc3NHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGJ1cnN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDgsIDEuMDgpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDgsIDIyMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTYsIDEuNTUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjE2KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25FeHBsb3Npb25HbG93QXQocG9zLCBzdHJlbmd0aCA9IDAuMykge1xyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBnbG93LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGdsb3cuekluZGV4ID0gNjA1MDtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjM1O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDgsIDIyMCwgTWF0aC5mbG9vcigxMjUgKiBzdHJlbmd0aCkpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMDgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIxMCwgMTIwLCBNYXRoLmZsb29yKDk1ICogc3RyZW5ndGgpKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgNzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDQsIDIxMCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDQsIDEpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjE4KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS41MilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduRXhwbG9zaW9uQ29yZUJ1cnN0QXQocG9zLCBkdXJhdGlvbiA9IDAuMjgpIHtcclxuICAgICAgICBsZXQgY29yZSA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbkNvcmVCdXJzdFwiKTtcclxuICAgICAgICBjb3JlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBjb3JlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGNvcmUuekluZGV4ID0gNjA2MDtcclxuICAgICAgICBjb3JlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgY29yZS5zY2FsZSA9IDAuMjtcclxuXHJcbiAgICAgICAgbGV0IG91dGVyID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uT3V0ZXJDb3JlXCIpO1xyXG4gICAgICAgIG91dGVyLnBhcmVudCA9IGNvcmU7XHJcbiAgICAgICAgbGV0IG91dGVyR3JhcGhpY3MgPSBvdXRlci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDQsIDE5NiwgMTcwKTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmNpcmNsZSgwLCAwLCA3Nik7XHJcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lciA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbklubmVyQ29yZVwiKTtcclxuICAgICAgICBpbm5lci5wYXJlbnQgPSBjb3JlO1xyXG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI0MCk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgMzQpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBjb3JlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uICogMC40MiwgMS4xNiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oZHVyYXRpb24gKiAwLjQyLCAyNTUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbiAqIDAuNTgsIDEuODUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dChkdXJhdGlvbiAqIDAuNTgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3blRyYW5zcGFyZW50U2hvY2t3YXZlQXQocG9zLCBzdGFydFJhZGl1cyA9IDcyLCBlbmRSYWRpdXMgPSAzNDAsIGRlbGF5ID0gMCwgZHVyYXRpb24gPSAwLjQyLCBhbHBoYSA9IDE3MCwgbGluZVdpZHRoID0gOCkge1xyXG4gICAgICAgIGxldCB3YXZlID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uU2hvY2t3YXZlXCIpO1xyXG4gICAgICAgIHdhdmUucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHdhdmUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgd2F2ZS56SW5kZXggPSA2MDU4O1xyXG4gICAgICAgIHdhdmUub3BhY2l0eSA9IGFscGhhO1xyXG4gICAgICAgIHdhdmUuc2NhbGUgPSAxO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSB3YXZlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgYWxwaGEpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCBzdGFydFJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBlbmRTY2FsZSA9IHN0YXJ0UmFkaXVzID4gMCA/IGVuZFJhZGl1cyAvIHN0YXJ0UmFkaXVzIDogMTtcclxuICAgICAgICBsZXQgcGxheUFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24sIGVuZFNjYWxlKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoZHVyYXRpb24pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKGRlbGF5KSwgcGxheUFjdGlvbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB3YXZlLnJ1bkFjdGlvbihwbGF5QWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlXaGl0ZVNjcmVlbkZsYXNoKG1heE9wYWNpdHkgPSAxODAsIGZhZGVJbiA9IDAuMDQsIGZhZGVPdXQgPSAwLjIpIHtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKCFwYXJlbnROb2RlIHx8ICFjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzaXplID0gdGhpcy5fZ2V0Vmlld3BvcnRTaXplKCk7XHJcbiAgICAgICAgbGV0IGZsYXNoID0gbmV3IGNjLk5vZGUoXCJfc2NyZWVuRmxhc2hXaGl0ZVwiKTtcclxuICAgICAgICBmbGFzaC5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIGZsYXNoLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgIGZsYXNoLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGZsYXNoLnpJbmRleCA9IDE3MDA7XHJcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGZsYXNoLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5yZWN0KC1zaXplLndpZHRoIC8gMiwgLXNpemUuaGVpZ2h0IC8gMiwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZmxhc2gucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlVG8oZmFkZUluLCBtYXhPcGFjaXR5KSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dChmYWRlT3V0KSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNjcmVlbk92ZXJsYXlSb290KCkge1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBpZiAocGFyZW50Tm9kZSAmJiBjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVXRpbHMuZ2V0Q3VycmVudFNjZW5lQ2FudmFzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZUtpbGxCcm9hZGNhc3RMYXllcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fa2lsbEJyb2FkY2FzdExheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fa2lsbEJyb2FkY2FzdExheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fa2lsbEJyb2FkY2FzdExheWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLl9nZXRTY3JlZW5PdmVybGF5Um9vdCgpO1xyXG4gICAgICAgIGlmICghcm9vdCB8fCAhY2MuaXNWYWxpZChyb290KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsYXllciA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCcm9hZGNhc3RMYXllclwiKTtcclxuICAgICAgICBsYXllci5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpKTtcclxuICAgICAgICBsYXllci5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBsYXllci56SW5kZXggPSAxODUwO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllciA9IGxheWVyO1xyXG4gICAgICAgIHJldHVybiBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBfZW5zdXJlS2lsbEJhZGdlTGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCYWRnZUxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fa2lsbEJhZGdlTGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9raWxsQmFkZ2VMYXllcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5fZ2V0U2NyZWVuT3ZlcmxheVJvb3QoKTtcclxuICAgICAgICBpZiAoIXJvb3QgfHwgIWNjLmlzVmFsaWQocm9vdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgY2MuTm9kZShcIl9raWxsQmFkZ2VMYXllclwiKTtcclxuICAgICAgICBsYXllci5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpKTtcclxuICAgICAgICBsYXllci5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBsYXllci56SW5kZXggPSAxODYwO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCYWRnZUxheWVyID0gbGF5ZXI7XHJcbiAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95S2lsbEJyb2FkY2FzdFVpKCkge1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdExheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdExheWVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUtpbGxCYWRnZVVpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VMYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX2tpbGxCYWRnZUxheWVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VMYXllci5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2tpbGxCYWRnZUxheWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpIHtcclxuICAgICAgICB0aGlzLl9raWxsU3RyZWFrQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2tpbGxTdHJlYWtSZW1haW4gPSAwO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWxsQnJvYWRjYXN0VWkoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lsbEJhZGdlVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZEtpbGxCcm9hZGNhc3RCYWRnZUZyYW1lcygpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZEtpbGxCYWRnZUZyYW1lKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbG9hZEtpbGxCYWRnZUZyYW1lKHN0cmVhaywgY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHV1aWQgPSBLSUxMX0JBREdFX0ZSQU1FX1VVSURTW3N0cmVha107XHJcbiAgICAgICAgaWYgKCF1dWlkIHx8ICFjYy5hc3NldE1hbmFnZXIgfHwgIWNjLmFzc2V0TWFuYWdlci5sb2FkQW55KSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCYWRnZUZyYW1lc1tzdHJlYWtdKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fa2lsbEJhZGdlRnJhbWVzW3N0cmVha10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VMb2FkaW5nW3N0cmVha10pIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VMb2FkaW5nW3N0cmVha10ucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fa2lsbEJhZGdlTG9hZGluZ1tzdHJlYWtdID0gY2FsbGJhY2sgPyBbY2FsbGJhY2tdIDogW107XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IHV1aWR9LCAoZXJyLCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tpbGxCYWRnZUZyYW1lc1tzdHJlYWtdID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2tpbGxCYWRnZUxvYWRpbmdbc3RyZWFrXSB8fCBbXTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2tpbGxCYWRnZUxvYWRpbmdbc3RyZWFrXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXShzcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZE9pbFNwaWxsRnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKCFPSUxfU1BJTExfRlJBTUVfVVVJRCB8fCAhY2MuYXNzZXRNYW5hZ2VyIHx8ICFjYy5hc3NldE1hbmFnZXIubG9hZEFueSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWRPaWxTcGlsbEZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRPaWxTcGlsbEZyYW1lKGNhbGxiYWNrID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTcGlsbEZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fb2lsU3BpbGxGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNwaWxsRnJhbWVDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTcGlsbEZyYW1lTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vaWxTcGlsbEZyYW1lTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IE9JTF9TUElMTF9GUkFNRV9VVUlEfSwgKGVyciwgYXNzZXQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFlcnIgJiYgYXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29pbFNwaWxsRnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fb2lsU3BpbGxGcmFtZUNhbGxiYWNrcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9vaWxTcGlsbEZyYW1lQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0odGhpcy5fb2lsU3BpbGxGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZENvdmVyVGVzdEZyYW1lKCkge1xyXG4gICAgICAgIGlmICghQ09WRVJfVEVTVF9GUkFNRV9VVUlEIHx8ICFjYy5hc3NldE1hbmFnZXIgfHwgIWNjLmFzc2V0TWFuYWdlci5sb2FkQW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZENvdmVyVGVzdEZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRDb3ZlclRlc3RGcmFtZShjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fY292ZXJUZXN0RnJhbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9jb3ZlclRlc3RGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY292ZXJUZXN0RnJhbWVMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IENPVkVSX1RFU1RfRlJBTUVfVVVJRH0sIChlcnIsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY292ZXJUZXN0RnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fY292ZXJUZXN0RnJhbWVDYWxsYmFja3Muc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fY292ZXJUZXN0RnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSh0aGlzLl9jb3ZlclRlc3RGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZEVuZXJneUVnZ0ZyYW1lKCkge1xyXG4gICAgICAgIGlmICghRU5FUkdZX0VHR19GUkFNRV9VVUlEIHx8ICFjYy5hc3NldE1hbmFnZXIgfHwgIWNjLmFzc2V0TWFuYWdlci5sb2FkQW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZEVuZXJneUVnZ0ZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRFbmVyZ3lFZ2dGcmFtZShjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnRnJhbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9lbmVyZ3lFZ2dGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnRnJhbWVMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IEVORVJHWV9FR0dfRlJBTUVfVVVJRH0sIChlcnIsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnRnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fZW5lcmd5RWdnRnJhbWVDYWxsYmFja3Muc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSh0aGlzLl9lbmVyZ3lFZ2dGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZEVuZXJneUVnZ0J1c2hGcmFtZSgpIHtcclxuICAgICAgICBpZiAoIVRSRUVfR1JFRU5fTEFSR0VfRlJBTUVfVVVJRCB8fCAhY2MuYXNzZXRNYW5hZ2VyIHx8ICFjYy5hc3NldE1hbmFnZXIubG9hZEFueSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWRFbmVyZ3lFZ2dCdXNoRnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfbG9hZEVuZXJneUVnZ0J1c2hGcmFtZShjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dCdXNoRnJhbWVMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh7dXVpZDogVFJFRV9HUkVFTl9MQVJHRV9GUkFNRV9VVUlEfSwgKGVyciwgYXNzZXQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lID0gYXNzZXQgaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IGFzc2V0IDogYXNzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZUNhbGxiYWNrcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dCdXNoRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSh0aGlzLl9lbmVyZ3lFZ2dCdXNoRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEtpbGxCYWRnZUNvbG9yKHN0cmVhaykge1xyXG4gICAgICAgIGxldCBjb2xvciA9IEtJTExfQkFER0VfVElOVFNbc3RyZWFrXSB8fCBLSUxMX0JBREdFX1RJTlRTWzFdO1xyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcihjb2xvclswXSwgY29sb3JbMV0sIGNvbG9yWzJdLCAyNTUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVLaWxsQnJvYWRjYXN0RW50cnkodGV4dCkge1xyXG4gICAgICAgIGxldCBsYXllciA9IHRoaXMuX2Vuc3VyZUtpbGxCcm9hZGNhc3RMYXllcigpO1xyXG4gICAgICAgIGlmICghbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW50cnkgPSBuZXcgY2MuTm9kZShcIl9raWxsQnJvYWRjYXN0RW50cnlcIik7XHJcbiAgICAgICAgZW50cnkucGFyZW50ID0gbGF5ZXI7XHJcbiAgICAgICAgZW50cnkuc2V0Q29udGVudFNpemUoNDM4LCA1Nik7XHJcbiAgICAgICAgZW50cnkub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZW50cnlbXCJfZXhwaXJlQXRcIl0gPSBEYXRlLm5vdygpICsgTWF0aC5mbG9vcihLSUxMX0JST0FEQ0FTVF9EVVJBVElPTiAqIDEwMDApO1xyXG4gICAgICAgIGVudHJ5W1wiX2lzRXhpdGluZ1wiXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgYmcgPSBlbnRyeS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDE2LCAyMCwgMjgsIDIyMCk7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC0yMTksIC0yOCwgNDM4LCA1NiwgMTYpO1xyXG4gICAgICAgIGJnLmZpbGwoKTtcclxuICAgICAgICBiZy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMTg2LCA4MiwgMjIwKTtcclxuICAgICAgICBiZy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtMjE5LCAtMjgsIDQzOCwgNTYsIDE2KTtcclxuICAgICAgICBiZy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHRhZ05vZGUgPSBuZXcgY2MuTm9kZShcIl9sYkJyb2FkY2FzdFRhZ1wiKTtcclxuICAgICAgICB0YWdOb2RlLnBhcmVudCA9IGVudHJ5O1xyXG4gICAgICAgIHRhZ05vZGUuc2V0Q29udGVudFNpemUoMTAwLCA0MCk7XHJcbiAgICAgICAgdGFnTm9kZS5zZXRQb3NpdGlvbigtMTYwLCAwKTtcclxuICAgICAgICBsZXQgdGFnTGFiZWwgPSB0YWdOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGFnTGFiZWwuc3RyaW5nID0gXCLmiL/pl7Tlub/mkq1cIjtcclxuICAgICAgICB0YWdMYWJlbC5mb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIHRhZ0xhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICB0YWdMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHRhZ0xhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0YWdOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyMTQsIDEyMiwgMjU1KTtcclxuXHJcbiAgICAgICAgbGV0IHNwbGl0ID0gbmV3IGNjLk5vZGUoXCJfYnJvYWRjYXN0U3BsaXRcIik7XHJcbiAgICAgICAgc3BsaXQucGFyZW50ID0gZW50cnk7XHJcbiAgICAgICAgc3BsaXQuc2V0UG9zaXRpb24oLTk4LCAwKTtcclxuICAgICAgICBsZXQgc3BsaXRHcmFwaGljcyA9IHNwbGl0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgc3BsaXRHcmFwaGljcy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIHNwbGl0R3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCA2MCk7XHJcbiAgICAgICAgc3BsaXRHcmFwaGljcy5tb3ZlVG8oMCwgLTE2KTtcclxuICAgICAgICBzcGxpdEdyYXBoaWNzLmxpbmVUbygwLCAxNik7XHJcbiAgICAgICAgc3BsaXRHcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiQnJvYWRjYXN0VGV4dFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gZW50cnk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDIzNiwgNDApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbig2NCwgMCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xheW91dEtpbGxCcm9hZGNhc3RFbnRyaWVzKGZhc3QgPSBmYWxzZSwgbmV3RW50cnkgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fZW5zdXJlS2lsbEJyb2FkY2FzdExheWVyKCk7XHJcbiAgICAgICAgaWYgKCFsYXllcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpO1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgIGxldCB0b3BZID0gTWF0aC5taW4oc2l6ZS5oZWlnaHQgLyAyIC0gMTIwLCAoeXlwLnNhZmVUb3BCb3R0b20gfHwgc2l6ZS5oZWlnaHQgLyAyKSAtIDk2KTtcclxuICAgICAgICBsZXQgcmlnaHRYID0gc2l6ZS53aWR0aCAvIDIgLSAyNDY7XHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZmFzdCA/IDAuMTIgOiAwLjI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXNbaV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChlbnRyeSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoIC0gMSAtIGk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRYID0gcmlnaHRYO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0WSA9IHRvcFkgLSBzbG90ICogS0lMTF9CUk9BRENBU1RfU0xPVF9IRUlHSFQ7XHJcbiAgICAgICAgICAgIGVudHJ5LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeSA9PSBuZXdFbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgZW50cnkuc2V0UG9zaXRpb24odGFyZ2V0WCArIDI0LCB0YXJnZXRZIC0gMTgpO1xyXG4gICAgICAgICAgICAgICAgZW50cnkucnVuQWN0aW9uKGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbiwgdGFyZ2V0WCwgdGFyZ2V0WSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKGR1cmF0aW9uLCAyNTUpXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZW50cnkucnVuQWN0aW9uKGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbiwgdGFyZ2V0WCwgdGFyZ2V0WSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKGR1cmF0aW9uLCAyNTUpXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlS2lsbEJyb2FkY2FzdEVudHJ5KGVudHJ5LCBmYXN0ID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIWVudHJ5IHx8ICFjYy5pc1ZhbGlkKGVudHJ5KSB8fCBlbnRyeVtcIl9pc0V4aXRpbmdcIl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnlbXCJfaXNFeGl0aW5nXCJdID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5pbmRleE9mKGVudHJ5KTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZmFzdCA/IDAuMTIgOiAwLjE4O1xyXG4gICAgICAgIGVudHJ5LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgZW50cnkucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkdXJhdGlvbiwgMjgsIDE4KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoZHVyYXRpb24pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dEtpbGxCcm9hZGNhc3RFbnRyaWVzKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wdXNoS2lsbEJyb2FkY2FzdCh0ZXh0KSB7XHJcbiAgICAgICAgbGV0IGVudHJ5ID0gdGhpcy5fY3JlYXRlS2lsbEJyb2FkY2FzdEVudHJ5KHRleHQpO1xyXG4gICAgICAgIGlmICghZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZhc3RFeHBpcmVBdCA9IERhdGUubm93KCkgKyA5MDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2xkRW50cnkgPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllc1tpXTtcclxuICAgICAgICAgICAgaWYgKG9sZEVudHJ5ICYmIGNjLmlzVmFsaWQob2xkRW50cnkpICYmICFvbGRFbnRyeVtcIl9pc0V4aXRpbmdcIl0pIHtcclxuICAgICAgICAgICAgICAgIG9sZEVudHJ5W1wiX2V4cGlyZUF0XCJdID0gTWF0aC5taW4ob2xkRW50cnlbXCJfZXhwaXJlQXRcIl0sIGZhc3RFeHBpcmVBdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLnB1c2goZW50cnkpO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5sZW5ndGggPiBLSUxMX0JST0FEQ0FTVF9NQVhfVklTSUJMRSkge1xyXG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUtpbGxCcm9hZGNhc3RFbnRyeShyZW1vdmVkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0S2lsbEJyb2FkY2FzdEVudHJpZXModHJ1ZSwgZW50cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVLaWxsQnJvYWRjYXN0RW50cmllcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoZW50cnkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5pbmRleE9mKGVudHJ5KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZW50cnlbXCJfaXNFeGl0aW5nXCJdICYmIG5vdyA+PSBlbnRyeVtcIl9leHBpcmVBdFwiXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlS2lsbEJyb2FkY2FzdEVudHJ5KGVudHJ5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduS2lsbEJhZGdlTGlnaHRuaW5nKHBhcmVudE5vZGUsIGNvbG9yKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGxpZ2h0bmluZyA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCYWRnZUxpZ2h0bmluZ1wiICsgaSk7XHJcbiAgICAgICAgICAgIGxpZ2h0bmluZy5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBsaWdodG5pbmcuc2V0UG9zaXRpb24oLTgwICsgaSAqIDgwLCAxMCArIE1hdGgucmFuZG9tKCkgKiAyNik7XHJcbiAgICAgICAgICAgIGxpZ2h0bmluZy5hbmdsZSA9IC0xMCArIE1hdGgucmFuZG9tKCkgKiAyMDtcclxuICAgICAgICAgICAgbGlnaHRuaW5nLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSBsaWdodG5pbmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCAyMzUpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8oLTgsIDQyKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDEyLCAxMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtMiwgMTApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oMTQsIC0zMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICBsaWdodG5pbmcucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDQsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4wOCArIGkgKiAwLjAzKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xMilcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93S2lsbEJhZGdlU3RhbXAoc3RyZWFrKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fZW5zdXJlS2lsbEJhZGdlTGF5ZXIoKTtcclxuICAgICAgICBpZiAoIWxheWVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMS4xKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMDgpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfa2lsbEJhZGdlU3RhbXBcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gbGF5ZXI7XHJcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oMCwgMTIpO1xyXG4gICAgICAgIGJhZGdlLnpJbmRleCA9IDE7XHJcbiAgICAgICAgYmFkZ2Uub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgYmFkZ2Uuc2NhbGUgPSAxLjQyO1xyXG4gICAgICAgIGJhZGdlLmFuZ2xlID0gLTEyO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCYWRnZUFjdGl2ZU5vZGUgPSBiYWRnZTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5fZ2V0S2lsbEJhZGdlQ29sb3Ioc3RyZWFrKTtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9raWxsQmFkZ2VHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gYmFkZ2U7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMTgwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjg7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgc3RyZWFrID49IDUgPyA4OCA6IDU2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDEyOCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93R3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAxNDUpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5saW5lV2lkdGggPSA2O1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgMTE0KTtcclxuICAgICAgICBnbG93R3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBmbGFzaCA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCYWRnZUZsYXNoXCIpO1xyXG4gICAgICAgIGZsYXNoLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGZsYXNoLm9wYWNpdHkgPSAxODA7XHJcbiAgICAgICAgbGV0IGZsYXNoR3JhcGhpY3MgPSBmbGFzaC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgOTUpO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MucmVjdCgtMTUwLCAtMTIsIDMwMCwgMjQpO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MucmVjdCgtMTIsIC0xMjAsIDI0LCAyNDApO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCYWRnZVNwcml0ZVwiKTtcclxuICAgICAgICBzcHJpdGVOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIHNwcml0ZU5vZGUuc2V0Q29udGVudFNpemUoMzYwLCAyNDApO1xyXG4gICAgICAgIGxldCBzcHJpdGUgPSBzcHJpdGVOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgICAgc3ByaXRlTm9kZS5jb2xvciA9IGNvbG9yO1xyXG5cclxuICAgICAgICBpZiAoc3RyZWFrID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Bhd25LaWxsQmFkZ2VMaWdodG5pbmcoYmFkZ2UsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvYWRLaWxsQmFkZ2VGcmFtZShzdHJlYWssIChzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlICYmIGNjLmlzVmFsaWQoc3ByaXRlKSAmJiBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYmFkZ2UucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjA4LCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA4LCAwLjkyKSxcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMDgsIC0yKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xNCwgMS4wMyksXHJcbiAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbygwLjE0LCAwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC41MiksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjI0KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNCwgMS4xMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2tpbGxCYWRnZUFjdGl2ZU5vZGUgPT0gYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWNvcmRLaWxsU3RyZWFrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsU3RyZWFrUmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsU3RyZWFrQ291bnQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbFN0cmVha0NvdW50ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fa2lsbFN0cmVha0NvdW50ID0gTWF0aC5taW4oNSwgdGhpcy5fa2lsbFN0cmVha0NvdW50KTtcclxuICAgICAgICB0aGlzLl9raWxsU3RyZWFrUmVtYWluID0gS0lMTF9TVFJFQUtfV0lORE9XO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsU3RyZWFrQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGRlbGV0ZUVuZW15KGRlbEVuZW15KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZW5lbXkgPT0gZGVsRW5lbXkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgfHwgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ICs9MTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVteXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDpNYXRoLm1heCgwLCB0aGlzLl9tYXhFbmVteUNvdW50IC0gdGhpcy5fZGVhdGhFbmVteUNvdW50KX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2tpbGxJY29uKGRlbEVuZW15LnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgKz0xO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50IC0gdGhpcy5fZGVhdGhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlYzkurrmlbDph49cclxuICAgIGVuZW15Q291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZW15cy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmioDog71pY29uXHJcbiAgICBjcmVhdGVTa2lsbEljb24ocG9zKSB7XHJcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjA2KSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBza2lsbC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgIHNraWxsLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICBza2lsbC5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICAgICAgICAgIHNraWxsLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc2tpbGwueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEVuZXJneUNvbmZpZyhrZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBjb25maWdba2V5XTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZqP5py655Sf5oiQ5LiA5Liq6IO96YePXHJcbiAgICBjcmVhdGVFbmVyZ3koKSB7XHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl9nZXRSYW5kb21QYXNzYWJsZVRpbGUoKTtcclxuICAgICAgICBpZiAodGlsZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLmVuZXJneVByZWZhYiA/IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lcmd5UHJlZmFiKSA6IHRoaXMuX2NyZWF0ZURlZmF1bHRFbmVyZ3koKTtcclxuICAgICAgICBlbmVyZ3kucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZXJneS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMudGlsZVRvR2FtZVBvcyh0aWxlKSk7XHJcbiAgICAgICAgZW5lcmd5LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lcmd5LnkpO1xyXG5cclxuICAgICAgICBsZXQgZW5lcmd5U2NyaXB0ID0gZW5lcmd5LmdldENvbXBvbmVudChFbmVyZ3lJdGVtKSB8fCBlbmVyZ3kuYWRkQ29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIlZhbHVlXCIsIDEwKTtcclxuICAgICAgICBsZXQgbGlmZVRpbWUgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJMaWZlVGltZVwiLCAxMik7XHJcbiAgICAgICAgZW5lcmd5U2NyaXB0LmluaXQodmFsdWUsIGxpZmVUaW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZW5lcmd5cy5wdXNoKGVuZXJneSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRW5lcmd5QXQocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuZW5lcmd5UHJlZmFiID8gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVyZ3lQcmVmYWIpIDogdGhpcy5fY3JlYXRlRGVmYXVsdEVuZXJneSgpO1xyXG4gICAgICAgIGVuZXJneS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lcmd5LnBvc2l0aW9uID0gY2MudjMocG9zKTtcclxuICAgICAgICBlbmVyZ3kuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVyZ3kueSk7XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pIHx8IGVuZXJneS5hZGRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgZW5lcmd5U2NyaXB0LmluaXQodGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiVmFsdWVcIiwgMTApLCB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJMaWZlVGltZVwiLCAxMikpO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneXMucHVzaChlbmVyZ3kpO1xyXG4gICAgICAgIHJldHVybiBlbmVyZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRW5lcmd5QXRGb3JNdWx0aXBsYXllcihlbmVyZ3lEYXRhKSB7XHJcbiAgICAgICAgaWYgKCFlbmVyZ3lEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG9zID0gY2MudjIoZW5lcmd5RGF0YS54IHx8IDAsIGVuZXJneURhdGEueSB8fCAwKTtcclxuICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5lbmVyZ3lQcmVmYWIgPyBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZXJneVByZWZhYikgOiB0aGlzLl9jcmVhdGVEZWZhdWx0RW5lcmd5KCk7XHJcbiAgICAgICAgZW5lcmd5LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVyZ3kucG9zaXRpb24gPSBjYy52Myhwb3MpO1xyXG4gICAgICAgIGVuZXJneS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZXJneS55KTtcclxuICAgICAgICBlbmVyZ3lbXCJfX2VuZXJneUlkXCJdID0gZW5lcmd5RGF0YS5pZDtcclxuXHJcbiAgICAgICAgbGV0IGVuZXJneVNjcmlwdCA9IGVuZXJneS5nZXRDb21wb25lbnQoRW5lcmd5SXRlbSkgfHwgZW5lcmd5LmFkZENvbXBvbmVudChFbmVyZ3lJdGVtKTtcclxuICAgICAgICBlbmVyZ3lTY3JpcHQuaW5pdChlbmVyZ3lEYXRhLnZhbHVlID09IG51bGwgPyB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJWYWx1ZVwiLCAxMCkgOiBlbmVyZ3lEYXRhLnZhbHVlLCA5OTk5OTkpO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneXMucHVzaChlbmVyZ3kpO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRW5lcmd5TWFwW2VuZXJneURhdGEuaWRdID0gZW5lcmd5O1xyXG4gICAgICAgIHJldHVybiBlbmVyZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRW5lcmd5RWdnVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGxldCBzZXR1cCA9IHRoaXMuX2dldEVuZXJneUVnZ1Rlc3RTZXR1cFBvc2l0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc3Bhd25FbmVyZ3lFZ2dCdXNoKHNldHVwLmJ1c2hQb3MsIDk0KTtcclxuICAgICAgICB0aGlzLnNwYXduRW5lcmd5RWdnQXQoc2V0dXAuZWdnUG9zLCB7XHJcbiAgICAgICAgICAgIGxpZmVUaW1lOiAxMCxcclxuICAgICAgICAgICAgcmFkaXVzOiAzNCxcclxuICAgICAgICAgICAgZW5lcmd5Q291bnQ6IDE4LFxyXG4gICAgICAgICAgICBlbmVyZ3lTY2F0dGVyUmFkaXVzOiAxMzZcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC40NSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJCdWJibGUoXCLmiorog73ph4/om4vmjqjov5vojYnkuJtcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEVuZXJneUVnZ1Rlc3RTZXR1cFBvc2l0aW9ucygpIHtcclxuICAgICAgICBsZXQgYmFzZVBvcyA9IHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcilcclxuICAgICAgICAgICAgPyBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pXHJcbiAgICAgICAgICAgIDogY2MudjIodGhpcy5fcGxheWVyQm9yblBvcyB8fCBjYy52MigwLCAwKSk7XHJcbiAgICAgICAgbGV0IGRpcnMgPSBbXHJcbiAgICAgICAgICAgIGNjLnYyKDEsIDApLFxyXG4gICAgICAgICAgICBjYy52MigwLjgyLCAwLjMyKSxcclxuICAgICAgICAgICAgY2MudjIoMC44MiwgLTAuMzIpLFxyXG4gICAgICAgICAgICBjYy52MigwLjIsIDEpLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXIgPSBkaXJzW2ldLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgZWdnUG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoZGlyLm11bCgxNTApKSwgNjgpO1xyXG4gICAgICAgICAgICBsZXQgYnVzaFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGJhc2VQb3MuYWRkKGRpci5tdWwoMzAwKSksIDk2KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdENvbGxpZGVycyhlZ2dQb3MsIDM4KS5sZW5ndGggPiAwIHx8IHRoaXMudGVzdENvbGxpZGVycyhidXNoUG9zLCA1MikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVnZ1BvczogZWdnUG9zLFxyXG4gICAgICAgICAgICAgICAgYnVzaFBvczogYnVzaFBvcyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVnZ1BvczogdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoY2MudjIoMTUwLCAwKSksIDY4KSxcclxuICAgICAgICAgICAgYnVzaFBvczogdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoY2MudjIoMzAwLCAwKSksIDk2KSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduRW5lcmd5RWdnQnVzaChwb3MsIHJhZGl1cyA9IDk0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiX2VuZXJneUVnZ0J1c2hcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICByb290LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgocG9zLnkpICsgMjtcclxuXHJcbiAgICAgICAgbGV0IHNoYWRvdyA9IG5ldyBjYy5Ob2RlKFwiX2VuZXJneUVnZ0J1c2hTaGFkb3dcIik7XHJcbiAgICAgICAgc2hhZG93LnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgc2hhZG93LnNldFBvc2l0aW9uKDAsIC0xNCk7XHJcbiAgICAgICAgbGV0IHNoYWRvd0dyYXBoaWNzID0gc2hhZG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgc2hhZG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgNjApO1xyXG4gICAgICAgIHNoYWRvd0dyYXBoaWNzLmVsbGlwc2UoMCwgMCwgcmFkaXVzICogMC42MiwgcmFkaXVzICogMC4yMik7XHJcbiAgICAgICAgc2hhZG93R3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2VuZXJneUVnZ0J1c2hTcHJpdGVcIik7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNwcml0ZU5vZGUuc2V0UG9zaXRpb24oMCwgOCk7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5zZXRDb250ZW50U2l6ZShyYWRpdXMgKiAxLjk1LCByYWRpdXMgKiAxLjk1KTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gc3ByaXRlTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHRoaXMuX2xvYWRFbmVyZ3lFZ2dCdXNoRnJhbWUoKHNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcHJpdGUgJiYgY2MuaXNWYWxpZChzcHJpdGUpICYmIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgYnVzaDphbnkgPSB7XHJcbiAgICAgICAgICAgIG5vZGU6IHJvb3QsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaGVzLnB1c2goYnVzaCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1c2g7XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25FbmVyZ3lFZ2dBdChwb3MsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiRW5lcmd5RWdnXCIpO1xyXG4gICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgcm9vdC56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHBvcy55KSArIDE7XHJcblxyXG4gICAgICAgIGxldCBlZ2dTY3JpcHQgPSByb290LmFkZENvbXBvbmVudChFbmVyZ3lFZ2cpO1xyXG4gICAgICAgIGxldCBlZ2c6YW55ID0ge1xyXG4gICAgICAgICAgICBub2RlOiByb290LFxyXG4gICAgICAgICAgICBzY3JpcHQ6IGVnZ1NjcmlwdCxcclxuICAgICAgICAgICAgZWdnSWQ6IG9wdGlvbnMuZWdnSWQgPT0gbnVsbCA/IG51bGwgOiBvcHRpb25zLmVnZ0lkLFxyXG4gICAgICAgICAgICByYWRpdXM6IG9wdGlvbnMucmFkaXVzID09IG51bGwgPyAzNCA6IG9wdGlvbnMucmFkaXVzLFxyXG4gICAgICAgICAgICBlbmVyZ3lDb3VudDogb3B0aW9ucy5lbmVyZ3lDb3VudCA9PSBudWxsID8gMTYgOiBvcHRpb25zLmVuZXJneUNvdW50LFxyXG4gICAgICAgICAgICBlbmVyZ3lTY2F0dGVyUmFkaXVzOiBvcHRpb25zLmVuZXJneVNjYXR0ZXJSYWRpdXMgPT0gbnVsbCA/IDEzMCA6IG9wdGlvbnMuZW5lcmd5U2NhdHRlclJhZGl1cyxcclxuICAgICAgICAgICAgYnVyc3REb25lOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBtYXR1cmVDYWxsYmFjayA9IG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJvbk1hdHVyZVwiKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMub25NYXR1cmVcclxuICAgICAgICAgICAgOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVFbmVyZ3lFZ2dNYXR1cmUoZWdnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBlZ2dTY3JpcHQuaW5pdCh7XHJcbiAgICAgICAgICAgIGxpZmVUaW1lOiBvcHRpb25zLmxpZmVUaW1lID09IG51bGwgPyAxMCA6IG9wdGlvbnMubGlmZVRpbWUsXHJcbiAgICAgICAgICAgIHJhZGl1czogZWdnLnJhZGl1cyxcclxuICAgICAgICAgICAgYXV0b01hdHVyZTogb3B0aW9ucy5hdXRvTWF0dXJlLFxyXG4gICAgICAgICAgICBvbk1hdHVyZTogbWF0dXJlQ2FsbGJhY2tcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sb2FkRW5lcmd5RWdnRnJhbWUoKHNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlZ2dTY3JpcHQgJiYgY2MuaXNWYWxpZChlZ2dTY3JpcHQpKSB7XHJcbiAgICAgICAgICAgICAgICBlZ2dTY3JpcHQuc2V0U3ByaXRlRnJhbWUoc3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdncy5wdXNoKGVnZyk7XHJcbiAgICAgICAgcmV0dXJuIGVnZztcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlTXVsdGlwbGF5ZXJCdXJzdEVuZXJneShvcmlnaW4sIGVuZXJneURhdGEpIHtcclxuICAgICAgICBpZiAoIWVuZXJneURhdGEgfHwgZW5lcmd5RGF0YS5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5jcmVhdGVFbmVyZ3lBdEZvck11bHRpcGxheWVyKGVuZXJneURhdGEpO1xyXG4gICAgICAgIGlmICghZW5lcmd5IHx8ICFjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmcm9tUG9zID0gb3JpZ2luID8gY2MudjIob3JpZ2luKSA6IGNjLnYyKGVuZXJneS5wb3NpdGlvbik7XHJcbiAgICAgICAgZW5lcmd5LnNldFBvc2l0aW9uKGNjLnYzKGZyb21Qb3MpKTtcclxuICAgICAgICBlbmVyZ3kuc2NhbGUgPSAwLjE4O1xyXG4gICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4zMiwgMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygwLjM4LCBjYy52MihlbmVyZ3lEYXRhLngsIGVuZXJneURhdGEueSksIDQyICsgTWF0aC5yYW5kb20oKSAqIDE4LCAxKVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIHJldHVybiBlbmVyZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduTXVsdGlwbGF5ZXJFbmVyZ3lFZ2coZWdnRGF0YSkge1xyXG4gICAgICAgIGlmICghZWdnRGF0YSB8fCBlZ2dEYXRhLmlkID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBleGlzdCA9IHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwW2VnZ0RhdGEuaWRdO1xyXG4gICAgICAgIGlmIChleGlzdCAmJiBleGlzdC5ub2RlICYmIGNjLmlzVmFsaWQoZXhpc3Qubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZWdnID0gdGhpcy5zcGF3bkVuZXJneUVnZ0F0KGNjLnYyKGVnZ0RhdGEueCB8fCAwLCBlZ2dEYXRhLnkgfHwgMCksIHtcclxuICAgICAgICAgICAgZWdnSWQ6IGVnZ0RhdGEuaWQsXHJcbiAgICAgICAgICAgIGxpZmVUaW1lOiBlZ2dEYXRhLnJlbWFpblRpbWUgPT0gbnVsbCA/IDEwIDogZWdnRGF0YS5yZW1haW5UaW1lLFxyXG4gICAgICAgICAgICByYWRpdXM6IGVnZ0RhdGEucmFkaXVzID09IG51bGwgPyAzNCA6IGVnZ0RhdGEucmFkaXVzLFxyXG4gICAgICAgICAgICBlbmVyZ3lDb3VudDogZWdnRGF0YS5lbmVyZ3lDb3VudCA9PSBudWxsID8gMTYgOiBlZ2dEYXRhLmVuZXJneUNvdW50LFxyXG4gICAgICAgICAgICBlbmVyZ3lTY2F0dGVyUmFkaXVzOiBlZ2dEYXRhLmVuZXJneVNjYXR0ZXJSYWRpdXMgPT0gbnVsbCA/IDEzMCA6IGVnZ0RhdGEuZW5lcmd5U2NhdHRlclJhZGl1cyxcclxuICAgICAgICAgICAgYXV0b01hdHVyZTogZmFsc2UsXHJcbiAgICAgICAgICAgIG9uTWF0dXJlOiBudWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghZWdnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWdnRGF0YS5tYXR1cmUpIHtcclxuICAgICAgICAgICAgZWdnLnNjcmlwdC5mb3JjZU1hdHVyZSgpO1xyXG4gICAgICAgICAgICBlZ2cuYnVyc3REb25lID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJFbmVyZ3lFZ2dNYXBbZWdnRGF0YS5pZF0gPSBlZ2c7XHJcbiAgICAgICAgcmV0dXJuIGVnZztcclxuICAgIH1cclxuXHJcbiAgICBfbW92ZU11bHRpcGxheWVyRW5lcmd5RWdnKHBheWxvYWQpIHtcclxuICAgICAgICBpZiAoIXBheWxvYWQgfHwgcGF5bG9hZC5lZ2dJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVnZyA9IHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwW3BheWxvYWQuZWdnSWRdO1xyXG4gICAgICAgIGlmICghZWdnIHx8ICFlZ2cubm9kZSB8fCAhY2MuaXNWYWxpZChlZ2cubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV4dFBvcyA9IGNjLnYyKHBheWxvYWQueCB8fCAwLCBwYXlsb2FkLnkgfHwgMCk7XHJcbiAgICAgICAgZWdnLm5vZGUuc2V0UG9zaXRpb24oY2MudjMobmV4dFBvcykpO1xyXG4gICAgICAgIGVnZy5ub2RlLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgobmV4dFBvcy55KSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgX21hdHVyZU11bHRpcGxheWVyRW5lcmd5RWdnKHBheWxvYWQpIHtcclxuICAgICAgICBpZiAoIXBheWxvYWQgfHwgcGF5bG9hZC5lZ2dJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVnZyA9IHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwW3BheWxvYWQuZWdnSWRdO1xyXG4gICAgICAgIGlmICghZWdnKSB7XHJcbiAgICAgICAgICAgIGVnZyA9IHRoaXMuX3NwYXduTXVsdGlwbGF5ZXJFbmVyZ3lFZ2coe1xyXG4gICAgICAgICAgICAgICAgaWQ6IHBheWxvYWQuZWdnSWQsXHJcbiAgICAgICAgICAgICAgICB4OiBwYXlsb2FkLngsXHJcbiAgICAgICAgICAgICAgICB5OiBwYXlsb2FkLnksXHJcbiAgICAgICAgICAgICAgICBtYXR1cmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IHBheWxvYWQucmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgZW5lcmd5Q291bnQ6IHBheWxvYWQuZW5lcmd5Q291bnQsXHJcbiAgICAgICAgICAgICAgICBlbmVyZ3lTY2F0dGVyUmFkaXVzOiBwYXlsb2FkLmVuZXJneVNjYXR0ZXJSYWRpdXMsXHJcbiAgICAgICAgICAgICAgICByZW1haW5UaW1lOiAwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFlZ2cgfHwgIWVnZy5zY3JpcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3JpZ2luID0gY2MudjIocGF5bG9hZC54ID09IG51bGwgPyBlZ2cubm9kZS54IDogcGF5bG9hZC54LCBwYXlsb2FkLnkgPT0gbnVsbCA/IGVnZy5ub2RlLnkgOiBwYXlsb2FkLnkpO1xyXG4gICAgICAgIGVnZy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKG9yaWdpbikpO1xyXG4gICAgICAgIGlmICghZWdnLnNjcmlwdC5pc01hdHVyZSgpKSB7XHJcbiAgICAgICAgICAgIGVnZy5zY3JpcHQuZm9yY2VNYXR1cmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWdnLmJ1cnN0RG9uZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGVuZXJnaWVzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkLmVuZXJnaWVzKSA/IHBheWxvYWQuZW5lcmdpZXMgOiBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZXJnaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU11bHRpcGxheWVyQnVyc3RFbmVyZ3kob3JpZ2luLCBlbmVyZ2llc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChvcmlnaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZW1vdmVNdWx0aXBsYXllckVuZXJneUVnZyhlZ2dJZCkge1xyXG4gICAgICAgIGlmIChlZ2dJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVnZyA9IHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwW2VnZ0lkXTtcclxuICAgICAgICBkZWxldGUgdGhpcy5fbXVsdGlwbGF5ZXJFbmVyZ3lFZ2dNYXBbZWdnSWRdO1xyXG4gICAgICAgIGlmICghZWdnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VuZXJneUVnZ3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2VuZXJneUVnZ3NbaV0gPT09IGVnZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdncy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWdnLm5vZGUgJiYgY2MuaXNWYWxpZChlZ2cubm9kZSkpIHtcclxuICAgICAgICAgICAgZWdnLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlRW5lcmd5RWdnTWF0dXJlKGVnZykge1xyXG4gICAgICAgIGlmICghZWdnIHx8IGVnZy5idXJzdERvbmUgfHwgIWVnZy5ub2RlIHx8ICFjYy5pc1ZhbGlkKGVnZy5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlZ2cuYnVyc3REb25lID0gdHJ1ZTtcclxuICAgICAgICBsZXQgb3JpZ2luID0gY2MudjIoZWdnLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBjb3VudCA9IGVnZy5lbmVyZ3lDb3VudCB8fCAxNjtcclxuICAgICAgICBsZXQgc2NhdHRlclJhZGl1cyA9IGVnZy5lbmVyZ3lTY2F0dGVyUmFkaXVzIHx8IDEzMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSAqIDIgKiBpIC8gY291bnQgKyBNYXRoLnJhbmRvbSgpICogMC40MjtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gNDAgKyBNYXRoLnJhbmRvbSgpICogc2NhdHRlclJhZGl1cztcclxuICAgICAgICAgICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKG9yaWdpbi5hZGQoY2MudjIoTWF0aC5jb3MoYW5nbGUpICogZGlzdGFuY2UsIE1hdGguc2luKGFuZ2xlKSAqIGRpc3RhbmNlKSksIDQyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdENvbGxpZGVycyh0YXJnZXRQb3MsIDE4KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihvcmlnaW4uYWRkKGNjLnYyKE1hdGguY29zKGFuZ2xlKSAqIDQyLCBNYXRoLnNpbihhbmdsZSkgKiA0MikpLCA0Mik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuY3JlYXRlRW5lcmd5QXQob3JpZ2luKTtcclxuICAgICAgICAgICAgZW5lcmd5LnNjYWxlID0gMC4xODtcclxuICAgICAgICAgICAgZW5lcmd5LnJ1bkFjdGlvbihjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4zMiwgMSksXHJcbiAgICAgICAgICAgICAgICBjYy5qdW1wVG8oMC4zNiArIE1hdGgucmFuZG9tKCkgKiAwLjA4LCB0YXJnZXRQb3MsIDQyICsgTWF0aC5yYW5kb20oKSAqIDE4LCAxKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5S2lsbEV4cGxvc2lvbkVmZmVjdEF0KG9yaWdpbik7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjIpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJCdWJibGUoXCLmiJDnhp/kuoYsIOWbnuadpeaUtuiDvemHj1wiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzcGF3bk9pbFRlc3RQaWNrdXAocG9zID0gbnVsbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBpY2t1cCA9IG5ldyBjYy5Ob2RlKFwiT2lsUGlja3VwXCIpO1xyXG4gICAgICAgIHBpY2t1cC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcGlja3VwLmFkZENvbXBvbmVudChPaWxQaWNrdXApO1xyXG4gICAgICAgIHBpY2t1cC5wb3NpdGlvbiA9IGNjLnYzKHBvcyB8fCB0aGlzLl9nZXRPaWxUZXN0UGlja3VwUG9zKCkpO1xyXG4gICAgICAgIHBpY2t1cC56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHBpY2t1cC55KTtcclxuICAgICAgICBwaWNrdXAuc2NyaXB0LnNldEluR2FtZSgxOCk7XHJcbiAgICAgICAgdGhpcy5fc2tpbGxzLnB1c2gocGlja3VwKTtcclxuICAgICAgICByZXR1cm4gcGlja3VwO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvdmVyVGVzdEVuZW15KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLl9nZXRDb3ZlclRlc3RFbmVteVBvcygpKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGVuZW15LnNjcmlwdC5fY29uZmlnKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5BdHRhY2tSYWRpdXMgPSA4ODA7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWUgPSAwLjMyO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLlNwZWVkID0gMDtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb2RlVGltZSA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fd2Fsa1BhdGhzID0gW107XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll93aWxsUG9zID0gbnVsbDtcclxuICAgICAgICBlbmVteS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0RW5lbXkgPSBlbmVteTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDb3ZlclRlc3RFbmVteVBvcygpIHtcclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gdGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKVxyXG4gICAgICAgICAgICA/IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbilcclxuICAgICAgICAgICAgOiBjYy52Mih0aGlzLl9wbGF5ZXJCb3JuUG9zIHx8IGNjLnYyKDAsIDApKTtcclxuICAgICAgICBsZXQgZGlycyA9IFtcclxuICAgICAgICAgICAgY2MudjIoMSwgMC4xMiksXHJcbiAgICAgICAgICAgIGNjLnYyKDEsIC0wLjE2KSxcclxuICAgICAgICAgICAgY2MudjIoMC44NiwgMC4zOCksXHJcbiAgICAgICAgICAgIGNjLnYyKDAuODYsIC0wLjM4KSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGlyID0gZGlyc1tpXS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoZGlyLm11bCg0MjAgKyBpICogMjApKSwgODYpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcywgNTIpLmxlbmd0aCA9PSAwICYmIHRoaXMubGluZUxpbmVQYXNzQ29sbGlkZXJzKHBvcywgcGxheWVyUG9zKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52Mig0MjAsIDApKSwgODYpO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduQ292ZXJUZXN0Q292ZXJzKGNvdW50ID0gNikge1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdENvdmVycyA9IFtdO1xyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSB0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpXHJcbiAgICAgICAgICAgID8gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICA6IGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MgfHwgY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVDb3ZlclRlc3RDb3Zlcih0aGlzLl9nZXRDb3ZlclRlc3RDb3ZlclNwYXduUG9zKHBsYXllclBvcywgaSwgY291bnQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldENvdmVyVGVzdENvdmVyU3Bhd25Qb3MocGxheWVyUG9zLCBpbmRleCwgY291bnQpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJhc2VBbmdsZSA9IE1hdGguUEkgKiAyICogKChpbmRleCArIGkgKiAwLjM3KSAlIGNvdW50KSAvIGNvdW50O1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBiYXNlQW5nbGUgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjk7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IDExMCArIE1hdGgucmFuZG9tKCkgKiAxODA7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBjYy52MihwbGF5ZXJQb3MpLmFkZChjYy52MihNYXRoLmNvcyhhbmdsZSkgKiBkaXN0YW5jZSwgTWF0aC5zaW4oYW5nbGUpICogZGlzdGFuY2UpKTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA0OCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDb2xsaWRlcnMocG9zLCAzOCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvcy5zdWIocGxheWVyUG9zKS5tYWcoKSA8IDkwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY292ZXJUZXN0RW5lbXkgJiYgY2MuaXNWYWxpZCh0aGlzLl9jb3ZlclRlc3RFbmVteSkgJiYgcG9zLnN1Yih0aGlzLl9jb3ZlclRlc3RFbmVteS5wb3NpdGlvbikubWFnKCkgPCAxMjApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2NvdmVyVGVzdENvdmVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdmVyICYmIGNvdmVyLm5vZGUgJiYgY2MuaXNWYWxpZChjb3Zlci5ub2RlKSAmJiBwb3Muc3ViKGNvdmVyLm5vZGUucG9zaXRpb24pLm1hZygpIDwgODYpIHtcclxuICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDE0MCArIGluZGV4ICogMTgsIGluZGV4ICUgMiA9PSAwID8gOTAgOiAtOTApKSwgNDgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVDb3ZlclRlc3RDb3Zlcihwb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb290ID0gbmV3IGNjLk5vZGUoXCJfY292ZXJUZXN0Q3JhdGVcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICByb290LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgocG9zLnkpICsgMTtcclxuXHJcbiAgICAgICAgbGV0IHNoYWRvdyA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyVGVzdENyYXRlU2hhZG93XCIpO1xyXG4gICAgICAgIHNoYWRvdy5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNoYWRvdy5zZXRQb3NpdGlvbigwLCAtOSk7XHJcbiAgICAgICAgbGV0IHNoYWRvd0dyYXBoaWNzID0gc2hhZG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgc2hhZG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgNjgpO1xyXG4gICAgICAgIHNoYWRvd0dyYXBoaWNzLmVsbGlwc2UoMCwgMCwgMjQsIDEyKTtcclxuICAgICAgICBzaGFkb3dHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVOb2RlID0gbmV3IGNjLk5vZGUoXCJfY292ZXJTcHJpdGVcIik7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNwcml0ZU5vZGUuc2V0Q29udGVudFNpemUoNzAsIDcwKTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gc3ByaXRlTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHRoaXMuX2xvYWRDb3ZlclRlc3RGcmFtZSgoc3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwcml0ZSAmJiBjYy5pc1ZhbGlkKHNwcml0ZSkgJiYgc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBjcmFjayA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyQ3JhY2tcIik7XHJcbiAgICAgICAgY3JhY2sucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBjcmFjay56SW5kZXggPSAyO1xyXG4gICAgICAgIGNyYWNrW1wiJEdyYXBoaWNzXCJdID0gY3JhY2suYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgbGV0IGhwTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVySHBcIik7XHJcbiAgICAgICAgaHBOb2RlLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgaHBOb2RlLnNldFBvc2l0aW9uKDAsIDQ4KTtcclxuICAgICAgICBocE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI0MywgMjE0LCAyNTUpO1xyXG4gICAgICAgIGxldCBocExhYmVsID0gaHBOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgaHBMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGhwTGFiZWwubGluZUhlaWdodCA9IDIyO1xyXG4gICAgICAgIGhwTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBocExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IGNvdmVyOmFueSA9IHtcclxuICAgICAgICAgICAgbm9kZTogcm9vdCxcclxuICAgICAgICAgICAgcmFkaXVzOiAzNCxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIG1heEhwOiA1LFxyXG4gICAgICAgICAgICBhdHRhY2hlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG93bmVyOiBudWxsLFxyXG4gICAgICAgICAgICBhdHRhY2hPZmZzZXQ6IGNjLnYyKDAsIDApLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcm9vdFtcIl9fY292ZXJUZXN0RGF0YVwiXSA9IGNvdmVyO1xyXG4gICAgICAgIHJvb3RbXCIkQ3JhY2tcIl0gPSBjcmFjaztcclxuICAgICAgICByb290W1wiJEhwTGFiZWxcIl0gPSBocExhYmVsO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdENvdmVycy5wdXNoKGNvdmVyKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQ292ZXJUZXN0Q292ZXJWaXN1YWwoY292ZXIpO1xyXG4gICAgICAgIHJldHVybiBjb3ZlcjtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaENvdmVyVGVzdENvdmVyVmlzdWFsKGNvdmVyKSB7XHJcbiAgICAgICAgaWYgKCFjb3ZlciB8fCAhY292ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChjb3Zlci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9zdEhwID0gY292ZXIubWF4SHAgLSBjb3Zlci5ocDtcclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IGNvdmVyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJfY292ZXJTcHJpdGVcIik7XHJcbiAgICAgICAgaWYgKHNwcml0ZU5vZGUpIHtcclxuICAgICAgICAgICAgc3ByaXRlTm9kZS5zY2FsZSA9IDEgLSBsb3N0SHAgKiAwLjAzO1xyXG4gICAgICAgICAgICBzcHJpdGVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUgLSBsb3N0SHAgKiAxNCwgMjU1IC0gbG9zdEhwICogMjIsIDI1NSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3Zlci5ub2RlW1wiJEhwTGFiZWxcIl0pIHtcclxuICAgICAgICAgICAgY292ZXIubm9kZVtcIiRIcExhYmVsXCJdLnN0cmluZyA9IGNvdmVyLmhwICsgXCIvXCIgKyBjb3Zlci5tYXhIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdmVyLm5vZGVbXCIkQ3JhY2tcIl0gJiYgY292ZXIubm9kZVtcIiRDcmFja1wiXVtcIiRHcmFwaGljc1wiXSkge1xyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSBjb3Zlci5ub2RlW1wiJENyYWNrXCJdW1wiJEdyYXBoaWNzXCJdO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAobG9zdEhwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMiArIE1hdGgubWluKDIsIGxvc3RIcCAqIDAuMzUpO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig3MCwgNDIsIDE4LCAyMjApO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKC0xMCwgMTgpO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKC00LCA3KTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtMTEsIC03KTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvc3RIcCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKDYsIDE3KTtcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lVG8oMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDExLCAtMTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvc3RIcCA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKC0xOCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKC00LCAtNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDgsIC0yMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldE9pbFRlc3RQaWNrdXBQb3MoKSB7XHJcbiAgICAgICAgbGV0IGJhc2VQb3MgPSB0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpXHJcbiAgICAgICAgICAgID8gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICA6IGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MgfHwgY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGVEaXJzID0gW1xyXG4gICAgICAgICAgICBjYy52MigwLCAxKSxcclxuICAgICAgICAgICAgY2MudjIoMSwgMCksXHJcbiAgICAgICAgICAgIGNjLnYyKC0xLCAwKSxcclxuICAgICAgICAgICAgY2MudjIoMCwgLTEpLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVEaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihiYXNlUG9zLmFkZChjYW5kaWRhdGVEaXJzW2ldLm11bCgxNTApKSwgNzApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcywgNDIpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihiYXNlUG9zLmFkZChjYy52MigwLCAxMjApKSwgNzApO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEZWZhdWx0RW5lcmd5KCkge1xyXG4gICAgICAgIGxldCBlbmVyZ3kgPSBuZXcgY2MuTm9kZShcIkVuZXJneUl0ZW1cIik7XHJcbiAgICAgICAgZW5lcmd5LmFkZENvbXBvbmVudChFbmVyZ3lJdGVtKTtcclxuICAgICAgICByZXR1cm4gZW5lcmd5O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRSYW5kb21QYXNzYWJsZVRpbGUoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jaGVja0xpc3QpO1xyXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fY2hlY2tMaXN0W2tleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtICYmIHRoaXMuX2lzRW5lcmd5VGlsZUVtcHR5KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MudjIoaXRlbS54LCBpdGVtLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfaXNFbmVyZ3lUaWxlRW1wdHkodGlsZSkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3ModGlsZSk7XHJcbiAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiTWluRGlzdGFuY2VcIiwgMTIwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgbGV0IHBsYXllckxlbiA9IHBvcy5zdWIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgaWYgKHBsYXllckxlbiA8IG1pbkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5fZW5lcmd5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lcmd5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IHBvcy5zdWIoZW5lcmd5LnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPCBtaW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXVsdGlwbGF5ZXJFbmVyZ3lTcGF3blBvaW50cyhsaW1pdCA9IDI1Nikge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY2hlY2tMaXN0IHx8IHt9KTtcclxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHN0ZXAgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKGtleXMubGVuZ3RoIC8gbGltaXQpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9jaGVja0xpc3Rba2V5c1tpXV07XHJcbiAgICAgICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52MihpdGVtLngsIGl0ZW0ueSkpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB4OiBNYXRoLnJvdW5kKHBvcy54KSxcclxuICAgICAgICAgICAgICAgIHk6IE1hdGgucm91bmQocG9zLnkpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXVsdGlwbGF5ZXJNYXBCb3VuZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFsZldpZHRoOiBNYXRoLnJvdW5kKHRoaXMuX3RtU2l6ZS53aWR0aCAvIDIpLFxyXG4gICAgICAgICAgICBoYWxmSGVpZ2h0OiBNYXRoLnJvdW5kKHRoaXMuX3RtU2l6ZS5oZWlnaHQgLyAyKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldE11bHRpcGxheWVyU3Bhd25DYW5kaWRhdGVzKCkge1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGVzID0gdGhpcy5fZ2V0TXVsdGlwbGF5ZXJTcGF3bkNhbmRpZGF0ZXMoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBjYW5kaWRhdGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXBvcykge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgeDogTWF0aC5yb3VuZChwb3MueCksXHJcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHBvcy55KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmnIDov5HnmoTmlYzkurpcclxuICAgIGdldE5lYXJFbmVteSgpIHtcclxuICAgICAgICBsZXQgcmV0ID0gbnVsbDtcclxuICAgICAgICBsZXQgcmV0TGVuID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3MgPSBjYy52MihlbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gZW5lbXlQb3Muc3ViKHBsYXllclBvcykubWFnKClcclxuICAgICAgICAgICAgaWYgKHJldCA9PSBudWxsIHx8IGxlbiA8IHJldExlbikge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gZW5lbXk7XHJcbiAgICAgICAgICAgICAgICByZXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Zyo5ZCM5LiA5LiqdGlsZSzov5jmnInlhbbku5bmlYzkurpcclxuICAgIGlzSGF2ZU90aGVyRW5lbXkoZW5lbXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb3RoZXJFbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgaWYgKG90aGVyRW5lbXkgIT0gZW5lbXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKGVuZW15LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBvdGhlclRpbGUgPSB0aGlzLmdhbWVQb3NUb1RpbGUob3RoZXJFbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS54ID09IG90aGVyVGlsZS54ICYmIHRpbGUueSA9PSBvdGhlclRpbGUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oyJ5LiLXHJcbiAgICBfb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGEgPTE7XHJcbiAgICAgICAgLy8gbGV0IHBvaW50ID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIC8vIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKHBvaW50KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc2V0TWFwKCkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkud2lkdGg7IHJvdysrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG1Hcm91cC5zZXRUaWxlR0lEQXQoMSwgY2MudjIocm93LGNvbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdGlsZWQgbWFw5Z2Q5qCH6L2s5o2i5Li65ri45oiP5Z2Q5qCHXHJcbiAgICBfdGlsZVBvc1RvR2FtZVBvcyh0aWxlZFBvcykge1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52Mih0aWxlZFBvcy54LCB0aGlzLl90bVNpemUuaGVpZ2h0IC0gdGlsZWRQb3MueSk7XHJcbiAgICAgICAgcG9zLnggPSBwb3MueCAtIHRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgIHBvcy55ID0gcG9zLnkgLSB0aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcblxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy90aWxl5Z2Q5qCH6L2s5o2i5Li65ri45oiP5Z2Q5qCHXHJcbiAgICB0aWxlVG9HYW1lUG9zKHRpbGUpIHtcclxuICAgICAgICBsZXQgeCA9IHRpbGUueCAqIHRoaXMuX3RpbGVTaXplLndpZHRoICsgdGhpcy5fdGlsZVNpemUud2lkdGgvMjtcclxuICAgICAgICBsZXQgeSA9IHRpbGUueSAqIHRoaXMuX3RpbGVTaXplLmhlaWdodCArIHRoaXMuX3RpbGVTaXplLmhlaWdodC8yO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhjYy52Mih4LHkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WdkOagh+i9rOaNouS4unRpbGVkIG1hcOWdkOagh1xyXG4gICAgX2dhbWVQb3NUb1RpbGVQb3MoZ2FtZVBvcykge1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52MihnYW1lUG9zKTtcclxuICAgICAgICBwb3MueCA9IHBvcy54ICsgdGhpcy5fdG1TaXplLndpZHRoLzI7XHJcbiAgICAgICAgcG9zLnkgPSBwb3MueSArIHRoaXMuX3RtU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICBwb3MueSA9IHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSBwb3MueTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WdkOagh+i9rOaNouS4unRpbGXlnZDmoIdcclxuICAgIGdhbWVQb3NUb1RpbGUoZ2FtZVBvcykge1xyXG4gICAgICAgIGxldCB0aWxlUG9zID0gdGhpcy5fZ2FtZVBvc1RvVGlsZVBvcyhnYW1lUG9zKTtcclxuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IodGlsZVBvcy54IC8gdGhpcy5fdGlsZVNpemUud2lkdGgpO1xyXG4gICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcih0aWxlUG9zLnkgLyB0aGlzLl90aWxlU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4LCB5KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/liJ3lp4vljJZBKuajgOa1i+WIl+ihqFxyXG4gICAgaW5pdENoZWNrTGlzdCAoKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52Mih4LCB5KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcyw1MCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA6IGFueT0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS54ID0geDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnkgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uRyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5IID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmZhdGhlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXNzYWJsZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldFt4K1wiX1wiK3ldID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl90bUdyb3VwLnNldFRpbGVHSURBdCgzLCBjYy52Mih4LHkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkud2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSByZXRbeCtcIl9cIit5XTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3MoY2MudjIoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXd4ID0geC0xOyBuZXd4IDw9IHgrMTsgbmV3eCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3eSA9IHktMTsgbmV3eSA8PSB5KzE7IG5ld3krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHJldFtuZXd4K1wiX1wiK25ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Bhc3NhYmxlSXRlbSA9IGl0ZW0ucGFzc2FibGVbbmV3eCtcIl9cIituZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoeCAhPSBuZXd4IHx8IHkgIT0gbmV3eSkgJiYgbmV3SXRlbSAmJiBuZXdQYXNzYWJsZUl0ZW0gPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3BvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52MihuZXd4LCBuZXd5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2lyY2xlQ2lyY2xlUGFzc0NvbGxpZGVycyhwb3MsbmV3cG9zLDUwKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnBhc3NhYmxlW25ld3grXCJfXCIrbmV3eV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLnBhc3NhYmxlW3grXCJfXCIreV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlkEq5qOA5rWL5YiX6KGoXHJcbiAgICBnZXRDaGVja0xpc3QgKCkge1xyXG4gICAgICAgIHZhciBvYmpTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9jaGVja0xpc3QpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKG9ialN0cmluZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+WcG9z5omA5ZyodGlsZSzmnIDov5HnmoTlj6/pgJrooYx0aWxlXHJcbiAgICBnZXRQYXNzYWJsZVRpbGUgKHRpbGUscmVmZXJUaWxlKSB7XHJcbiAgICAgICAgLy/liKTmlq3oh6rlt7FcclxuICAgICAgICAvLyBpZiAodGhpcy5fY2hlY2tMaXN0W3RpbGUueCArIFwiX1wiICsgdGlsZS55XSkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdGlsZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat5LiA546vXHJcbiAgICAgICAgbGV0IHJldFRpbGUgPSBudWxsO1xyXG4gICAgICAgIGxldCByZXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4Kyspe1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gLTE7IHkgPD0gMTsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGlmICh4ICE9IDAgfHwgeSE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eCA9IHRpbGUueCArIHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSB0aWxlLnkgKyB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd0aWxlID0gdGhpcy5fY2hlY2tMaXN0W25ld3ggKyBcIl9cIiArIG5ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXd0aWxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlbiA9IChyZWZlclRpbGUueC1uZXd4KSoocmVmZXJUaWxlLngtbmV3eCkgKyAocmVmZXJUaWxlLnktbmV3eSkqKHJlZmVyVGlsZS55LW5ld3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VGlsZSA9PSBudWxsIHx8IGxlbiA8IHJldExlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0VGlsZSA9IG5ld3RpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldFRpbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldFRpbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreS6jOeOr1xyXG4gICAgICAgIHJldFRpbGUgPSBudWxsO1xyXG4gICAgICAgIHJldExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IC0yOyB4IDw9IDI7IHgrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMjsgeSA8PSAyOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKHggPT0gLTIgfHwgeCA9PSAyIHx8IHkgPT0gLTIgfHwgeSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSAocmVmZXJUaWxlLngtbmV3eCkqKHJlZmVyVGlsZS54LW5ld3gpICsgKHJlZmVyVGlsZS55LW5ld3kpKihyZWZlclRpbGUueS1uZXd5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFRpbGUgPT0gbnVsbCB8fCBsZW4gPCByZXRMZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGUgPSBuZXd0aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXRUaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRUaWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5Zwb3PmiYDlnKh0aWxlLOacgOi/keeahOWPr+mAmuihjHRpbGVcclxuICAgIGdldFBhc3NhYmxlVGlsZUV4ICh0aWxlKSB7XHJcbiAgICAgICAgLy/liKTmlq3kuIDnjq9cclxuICAgICAgICBsZXQgcmV0VGlsZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gLTI7IHggPD0gMjsgeCsrKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0yOyB5IDw9IDI7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGVzLnB1c2gobmV3dGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmV0VGlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcmV0VGlsZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldFRpbGVzW2luZGV4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOe6v+autVBQMSzmmK/lkKbkvJrnu4/ov4djb2xsaWRlcnPkuK3nmoTkuIDmnaHnur/mrrVcclxuICAgIGxpbmVMaW5lUGFzc0NvbGxpZGVycyhQLFAxKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlcnNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5saW5lUGFzc0xpbmUoUCxQMSxBLEIpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g54K5UCxQMeS4uuWchuW/gyxyYWRpdXPkuLrljYrlvoTnmoTlnIYs5piv5ZCm5Lya57uP6L+HY29sbGlkZXJz5Lit55qE5LiA5p2h57q/5q61XHJcbiAgICBjaXJjbGVDaXJjbGVQYXNzQ29sbGlkZXJzKFAsUDEscmFkaXVzKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlcnNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5jaXJjbGVDaXJjbGVQYXNzTGluZShQLFAxLHJhZGl1cyxBLEIpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/norDmkp7mtYvor5Uo5Lul54K5UOS4uuWchuW/gyzljYrlvoTkuLpyYWRpdXPnmoTlnIYs5piv5ZCm5ZKMY29sbGlkZXJz5Lit55qE57q/5q6155u45LqkKVxyXG4gICAgdGVzdENvbGxpZGVycyhQLCByYWRpdXMpe1xyXG4gICAgICAgIGxldCBjb2xsaWRlckl0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fY29sbGlkZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xsaWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2tleV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBBID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXJJdGVtID0gVXRpbHMuZ2V0UG9pbnRMaW5lU2hvcnRlc3RJbmZvKFAsIEEsIEIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJJdGVtLmxlbiA8PSByYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckl0ZW0uY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckl0ZW1zLnB1c2goY29sbGlkZXJJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVySXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXVzZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVLaWxsQnJvYWRjYXN0RW50cmllcygpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU9pbFNwaWxscyhkdCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRW5lcmd5RWdnVGVzdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsU3RyZWFrUmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsU3RyZWFrUmVtYWluIC09IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fa2lsbFN0cmVha1JlbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9raWxsU3RyZWFrUmVtYWluID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tpbGxTdHJlYWtDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Rlc3RNb2RlKCkgPT0gZmFsc2UgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPiAxICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmVteXMubGVuZ3RoIDwgdGhpcy5fdGltZU1heEVuZW15Q291bnQgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50IDwgdGhpcy5fbWF4RW5lbXlDb3VudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8v5Zyw5Zu+5rua5YqoXHJcbiAgICAgICAgICAgIHRoaXMucm9sbE1hcCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUZXN0TW9kZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVFbmVyZ3koZHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyTGFzdFBvcyA9IHRoaXMuX3BsYXllci5wb3NpdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb2FtRmxnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9hbVBvc2l0aW9uID0gY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKS5hZGQodGhpcy5fcm9hbURpcik7XHJcbiAgICAgICAgICAgICAgICByb2FtUG9zaXRpb24gPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24ocm9hbVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2FtUG9zaXRpb24ueCA9PSB0aGlzLm5vZGUueCAmJiByb2FtUG9zaXRpb24ueSA9PSB0aGlzLm5vZGUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvYW1EaXIueCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKS0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvYW1EaXIueSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKS0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCA9IHJvYW1Qb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ID0gcm9hbVBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZU9pbFNwaWxscyhkdCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9vaWxTcGlsbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IHNwaWxsID0gdGhpcy5fb2lsU3BpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXNwaWxsIHx8ICFzcGlsbC5ub2RlIHx8ICFjYy5pc1ZhbGlkKHNwaWxsLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vaWxTcGlsbHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNwaWxsLmxpZmVUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICBpZiAoc3BpbGwubGlmZVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3BpbGwubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vaWxTcGlsbHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmYWRlU3RhcnQgPSBNYXRoLm1pbigyLjIsIHNwaWxsLmR1cmF0aW9uICogMC4zKTtcclxuICAgICAgICAgICAgbGV0IG9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIGlmIChzcGlsbC5saWZlVGltZSA8IGZhZGVTdGFydCkge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eSA9IE1hdGguZmxvb3IoMjU1ICogKHNwaWxsLmxpZmVUaW1lIC8gZmFkZVN0YXJ0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3BpbGwubm9kZS5vcGFjaXR5ID0gTWF0aC5tYXgoMCwgb3BhY2l0eSk7XHJcbiAgICAgICAgICAgIHNwaWxsLm5vZGUuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChzcGlsbC5ub2RlLnkpIC0gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnLDlm77mu5rliqhcclxuICAgIHJvbGxNYXAoKXtcclxuICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXIueCwtdGhpcy5fcGxheWVyLnkpKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSByZXQueDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSByZXQueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25PaWxTcGlsbChwb3MsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90bURlY2FsIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3RtRGVjYWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwaWxsUG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oY2MudjIocG9zKSwgNjgpO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSBvcHRpb25zLnJhZGl1cyB8fCBPSUxfU1BJTExfUkFESVVTO1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgT0lMX1NQSUxMX0RVUkFUSU9OO1xyXG4gICAgICAgIGxldCBzbG93RmFjdG9yID0gb3B0aW9ucy5zbG93RmFjdG9yIHx8IE9JTF9TUElMTF9TTE9XX0ZBQ1RPUjtcclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgY2MuTm9kZShcIl9vaWxTcGlsbFwiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRoaXMuX3RtRGVjYWw7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbihjYy52MyhzcGlsbFBvcykpO1xyXG4gICAgICAgIHJvb3QuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChzcGlsbFBvcy55KSAtIDI7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVOb2RlID0gbmV3IGNjLk5vZGUoXCJfb2lsU3BpbGxTcHJpdGVcIik7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNwcml0ZU5vZGUub3BhY2l0eSA9IDIyODtcclxuICAgICAgICBzcHJpdGVOb2RlLnNldENvbnRlbnRTaXplKHJhZGl1cyAqIDIuMTUsIHJhZGl1cyAqIDIuMTUpO1xyXG4gICAgICAgIGxldCBzcHJpdGUgPSBzcHJpdGVOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgICAgc3ByaXRlTm9kZS5jb2xvciA9IGNjLmNvbG9yKDgwLCA1NiwgMzAsIDIyOCk7XHJcbiAgICAgICAgdGhpcy5fbG9hZE9pbFNwaWxsRnJhbWUoKHNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcHJpdGUgJiYgY2MuaXNWYWxpZChzcHJpdGUpICYmIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcmltID0gbmV3IGNjLk5vZGUoXCJfb2lsU3BpbGxSaW1cIik7XHJcbiAgICAgICAgcmltLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgbGV0IHJpbUdyYXBoaWNzID0gcmltLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgcmltR3JhcGhpY3MubGluZVdpZHRoID0gNTtcclxuICAgICAgICByaW1HcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDE0NSwgMTA0LCA2MiwgMTM1KTtcclxuICAgICAgICByaW1HcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICogMC45KTtcclxuICAgICAgICByaW1HcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGNvcmUgPSBuZXcgY2MuTm9kZShcIl9vaWxTcGlsbENvcmVcIik7XHJcbiAgICAgICAgY29yZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxldCBjb3JlR3JhcGhpY3MgPSBjb3JlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI2LCAxOCwgMTQsIDExMCk7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgKiAwLjcyKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc3BsYXNoID0gbmV3IGNjLk5vZGUoXCJfb2lsU3BpbGxTcGxhc2hcIik7XHJcbiAgICAgICAgc3BsYXNoLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgc3BsYXNoLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHNwbGFzaC5zY2FsZSA9IDAuNDU7XHJcbiAgICAgICAgbGV0IHNwbGFzaEdyYXBoaWNzID0gc3BsYXNoLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgc3BsYXNoR3JhcGhpY3MubGluZVdpZHRoID0gNztcclxuICAgICAgICBzcGxhc2hHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDE4OCwgMTQyLCA4NiwgMTYwKTtcclxuICAgICAgICBzcGxhc2hHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICogMC41OCk7XHJcbiAgICAgICAgc3BsYXNoR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgc3BsYXNoLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xLCAyMjApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuMTIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjI0KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNCwgMS41NSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIGxldCBzcGlsbCA9IHtcclxuICAgICAgICAgICAgbm9kZTogcm9vdCxcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIHNsb3dGYWN0b3I6IHNsb3dGYWN0b3IsXHJcbiAgICAgICAgICAgIGxpZmVUaW1lOiBkdXJhdGlvbixcclxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fb2lsU3BpbGxzLnB1c2goc3BpbGwpO1xyXG4gICAgICAgIHJldHVybiByb290O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRlcnJhaW5TcGVlZEZhY3Rvcihwb3MsIHJhZGl1cyA9IDApIHtcclxuICAgICAgICBsZXQgZmFjdG9yID0gMTtcclxuICAgICAgICBsZXQgY2hlY2tQb3MgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9vaWxTcGlsbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IHNwaWxsID0gdGhpcy5fb2lsU3BpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXNwaWxsIHx8ICFzcGlsbC5ub2RlIHx8ICFjYy5pc1ZhbGlkKHNwaWxsLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vaWxTcGlsbHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsaW1pdCA9IHNwaWxsLnJhZGl1cyArIHJhZGl1cyAqIDAuMzU7XHJcbiAgICAgICAgICAgIGlmIChjaGVja1Bvcy5zdWIoc3BpbGwubm9kZS5wb3NpdGlvbikubWFnKCkgPD0gbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGZhY3RvciA9IE1hdGgubWluKGZhY3Rvciwgc3BpbGwuc2xvd0ZhY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlRW5lcmd5RWdnVGVzdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdncy5sZW5ndGggPD0gMCAmJiB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VuZXJneUVnZ0J1c2hlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgYnVzaCA9IHRoaXMuX2VuZXJneUVnZ0J1c2hlc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFidXNoIHx8ICFidXNoLm5vZGUgfHwgIWNjLmlzVmFsaWQoYnVzaC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1c2gubm9kZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGJ1c2gubm9kZS55KSArIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZW5lcmd5RWdncy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgZWdnID0gdGhpcy5fZW5lcmd5RWdnc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFlZ2cgfHwgIWVnZy5ub2RlIHx8ICFjYy5pc1ZhbGlkKGVnZy5ub2RlKSB8fCAhZWdnLnNjcmlwdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdncy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2VuZXJneUVnZ0J1c2hlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1c2ggPSB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJ1c2ggfHwgIWJ1c2gubm9kZSB8fCAhY2MuaXNWYWxpZChidXNoLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MudjIoZWdnLm5vZGUucG9zaXRpb24pLnN1YihidXNoLm5vZGUucG9zaXRpb24pLm1hZygpIDw9IGJ1c2gucmFkaXVzICogMC43OCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWdnLnNjcmlwdC5zZXRIaWRkZW5JbkJ1c2goaGlkZGVuKTtcclxuICAgICAgICAgICAgZWdnLm5vZGUuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlZ2cubm9kZS55KSArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpICYmIHRoaXMuX3BsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHVzaEVuZXJneUVnZ3NCeVBsYXllcih0aGlzLl9wbGF5ZXIuc2NyaXB0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3B1c2hFbmVyZ3lFZ2dzQnlQbGF5ZXIocGxheWVyKSB7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIgfHwgIXBsYXllci5ub2RlIHx8ICFjYy5pc1ZhbGlkKHBsYXllci5ub2RlKSB8fCBwbGF5ZXIuX2N1cnJlbnRTcGVlZCA8PSAwLjI1KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52MihwbGF5ZXIubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHBsYXllckRpciA9IHBsYXllci5fZGlyICYmIHBsYXllci5fZGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHBsYXllci5fZGlyKS5ub3JtYWxpemUoKSA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIGxldCBwbGF5ZXJSYWRpdXMgPSBwbGF5ZXIuZ2V0UmFkaXVzID8gcGxheWVyLmdldFJhZGl1cygpIDogMzg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lFZ2dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZ2cgPSB0aGlzLl9lbmVyZ3lFZ2dzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWVnZyB8fCAhZWdnLm5vZGUgfHwgIWNjLmlzVmFsaWQoZWdnLm5vZGUpIHx8ICFlZ2cuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGVnZ1BvcyA9IGNjLnYyKGVnZy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGVnZ1Bvcy5zdWIocGxheWVyUG9zKTtcclxuICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gcGxheWVyUmFkaXVzICogMC40OCArIGVnZy5zY3JpcHQuZ2V0UmFkaXVzKCkgKyA4O1xyXG4gICAgICAgICAgICBpZiAob2Zmc2V0Lm1hZygpID4gbWluRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcHVzaERpciA9IG9mZnNldC5tYWdTcXIoKSA+IDkgPyBvZmZzZXQubm9ybWFsaXplKCkgOiBwbGF5ZXJEaXI7XHJcbiAgICAgICAgICAgIGlmIChwdXNoRGlyLmRvdChwbGF5ZXJEaXIpIDwgLTAuMikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwdXNoRGlzdGFuY2UgPSBNYXRoLm1heCgxLjYsIHBsYXllci5fY3VycmVudFNwZWVkICogKGVnZy5zY3JpcHQuaXNNYXR1cmUoKSA/IDAuNDIgOiAwLjYyKSk7XHJcbiAgICAgICAgICAgIGxldCBuZXh0UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oZWdnUG9zLmFkZChwdXNoRGlyLm11bChwdXNoRGlzdGFuY2UpKSwgZWdnLnNjcmlwdC5nZXRSYWRpdXMoKSArIDgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKG5leHRQb3MsIGVnZy5zY3JpcHQuZ2V0UmFkaXVzKCkgKyAzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNFbmVyZ3lFZ2dCbG9ja2VkQnlPdGhlckVnZyhlZ2csIG5leHRQb3MpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWdnLm5vZGUuc2V0UG9zaXRpb24oY2MudjMobmV4dFBvcykpO1xyXG4gICAgICAgICAgICBlZ2cubm9kZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG5leHRQb3MueSkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaXNFbmVyZ3lFZ2dCbG9ja2VkQnlPdGhlckVnZyhjdXJyZW50RWdnLCBuZXh0UG9zKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lFZ2dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvdGhlciA9IHRoaXMuX2VuZXJneUVnZ3NbaV07XHJcbiAgICAgICAgICAgIGlmIChvdGhlciA9PSBjdXJyZW50RWdnIHx8ICFvdGhlciB8fCAhb3RoZXIubm9kZSB8fCAhY2MuaXNWYWxpZChvdGhlci5ub2RlKSB8fCAhb3RoZXIuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGltaXQgPSBjdXJyZW50RWdnLnNjcmlwdC5nZXRSYWRpdXMoKSArIG90aGVyLnNjcmlwdC5nZXRSYWRpdXMoKSArIDg7XHJcbiAgICAgICAgICAgIGlmIChjYy52MihvdGhlci5ub2RlLnBvc2l0aW9uKS5zdWIobmV4dFBvcykubWFnKCkgPCBsaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRWaWV3cG9ydFNpemUoKSB7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IFV0aWxzLmdldEN1cnJlbnRTY2VuZUNhbnZhcygpO1xyXG4gICAgICAgIGlmIChjYW52YXMgJiYgY2MuaXNWYWxpZChjYW52YXMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpc2libGVTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xyXG4gICAgICAgIGlmICh2aXNpYmxlU2l6ZSAmJiB2aXNpYmxlU2l6ZS53aWR0aCA+IDAgJiYgdmlzaWJsZVNpemUuaGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlzaWJsZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5eXAuZ2FtZUZyYW1lU2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4geXlwLmdhbWVGcmFtZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy53aW5TaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIHBhZGRpbmcgPSAwKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IGNjLnYyKHBvcyk7XHJcbiAgICAgICAgbGV0IGhhbGZXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMuX3RtU2l6ZS53aWR0aCAvIDIgLSBwYWRkaW5nKTtcclxuICAgICAgICBsZXQgaGFsZkhlaWdodCA9IE1hdGgubWF4KDAsIHRoaXMuX3RtU2l6ZS5oZWlnaHQgLyAyIC0gcGFkZGluZyk7XHJcblxyXG4gICAgICAgIGlmIChyZXQueCA8IC1oYWxmV2lkdGgpIHtcclxuICAgICAgICAgICAgcmV0LnggPSAtaGFsZldpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnggPiBoYWxmV2lkdGgpIHtcclxuICAgICAgICAgICAgcmV0LnggPSBoYWxmV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueSA8IC1oYWxmSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldC55ID0gLWhhbGZIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueSA+IGhhbGZIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSBoYWxmSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgX2NvcnJlY3RNYXBQb3NpdGlvbihyZXQpe1xyXG4gICAgICAgIGxldCB2aWV3cG9ydFNpemUgPSB0aGlzLl9nZXRWaWV3cG9ydFNpemUoKTtcclxuICAgICAgICBsZXQgeCA9IE1hdGgubWF4KDAsICh0aGlzLl90bVNpemUud2lkdGggLSB2aWV3cG9ydFNpemUud2lkdGgpIC8gMik7XHJcbiAgICAgICAgbGV0IHkgPSBNYXRoLm1heCgwLCAodGhpcy5fdG1TaXplLmhlaWdodCAtIHZpZXdwb3J0U2l6ZS5oZWlnaHQpIC8gMik7XHJcbiAgICAgICAgbGV0IG1pblBvcyA9IGNjLnYyKC14LC15KTtcclxuICAgICAgICBsZXQgbWF4UG9zID0gY2MudjIoeCx5KTtcclxuXHJcbiAgICAgICAgaWYgKHJldC54IDwgbWluUG9zLngpIHtcclxuICAgICAgICAgICAgcmV0LnggPSBtaW5Qb3MueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC54ID4gbWF4UG9zLngpIHtcclxuICAgICAgICAgICAgcmV0LnggPSBtYXhQb3MueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55IDwgbWluUG9zLnkpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSBtaW5Qb3MueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55ID4gbWF4UG9zLnkpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSBtYXhQb3MueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nur/mrrXkuI7nn6nlvaLnm7jkuqTmiJbogIXljIXlkKvlnKjnn6nlvaLph4zpnaJcclxuICAgIF9saW5lSW5SZWN0KEEsQixyZWN0KXtcclxuICAgICAgICBpZiAoKEEueCA+PSByZWN0LnggJiYgQS54IDw9IHJlY3QueCArIHJlY3Qud2lkdGggJiYgQS55ID49IHJlY3QueSAmJiBBLnkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQpIHx8XHJcbiAgICAgICAgICAgIChCLnggPj0gcmVjdC54ICYmIEIueCA8PSByZWN0LnggKyByZWN0LndpZHRoICYmIEIueSA+PSByZWN0LnkgJiYgQi55IDw9IHJlY3QueSArIHJlY3QuaGVpZ2h0KSB8fFxyXG4gICAgICAgICAgICBjYy5JbnRlcnNlY3Rpb24ubGluZVJlY3QoQSxCLHJlY3QpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WtkOW8uSzpmpznoo3niannorDmkp7mo4DmtYtcclxuICAgIGJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uVGVzdChQLFAxKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoUCwgUDEpICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50KFAsIFAxKSB7XHJcbiAgICAgICAgLy/ojrflj5bnorDmkp7ljLpcclxuICAgICAgICBsZXQgY3VyckFyZWEgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbG9naWNBcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5fbG9naWNBcmVhW2ldO1xyXG4gICAgICAgICAgICBpZiAoUC54ID49IGFyZWEueCAmJiBQLnggPD0gYXJlYS54ICsgYXJlYS53aWR0aCAmJiBQLnkgPj0gYXJlYS55ICYmIFAueSA8PSBhcmVhLnkgKyBhcmVhLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgY3VyckFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyQXJlYSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJBcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgQSA9IGN1cnJBcmVhW2ldLkE7XHJcbiAgICAgICAgICAgICAgICBsZXQgQiA9IGN1cnJBcmVhW2ldLkI7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLmxpbmVMaW5lKFAsUDEsQSxCKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7QTogQSwgQjogQn07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwi5pyq5om+5Yiw56Kw5pKe5YiG5Yy6XCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9kaXN0YW5jZVBvaW50VG9TZWdtZW50KHBvaW50LCBBLCBCKSB7XHJcbiAgICAgICAgbGV0IEFCID0gQi5zdWIoQSk7XHJcbiAgICAgICAgbGV0IGxlblNxciA9IEFCLm1hZ1NxcigpO1xyXG4gICAgICAgIGlmIChsZW5TcXIgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9pbnQuc3ViKEEpLm1hZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHQgPSBwb2ludC5zdWIoQSkuZG90KEFCKSAvIGxlblNxcjtcclxuICAgICAgICB0ID0gY2MubWlzYy5jbGFtcGYodCwgMCwgMSk7XHJcbiAgICAgICAgbGV0IHByb2plY3Rpb24gPSBBLmFkZChBQi5tdWwodCkpO1xyXG4gICAgICAgIHJldHVybiBwb2ludC5zdWIocHJvamVjdGlvbikubWFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFudXBJbnZhbGlkQ292ZXJUZXN0Q292ZXJzKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllciA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9jbGVhbnVwSW52YWxpZENvdmVyVGVzdENvdmVycygpO1xyXG4gICAgICAgIGxldCBvd25lck5vZGUgPSBwbGF5ZXIgJiYgcGxheWVyLm5vZGUgPyBwbGF5ZXIubm9kZSA6IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY292ZXIgJiYgY292ZXIuYXR0YWNoZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb3duZXJOb2RlIHx8IGNvdmVyLm93bmVyID09IG93bmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3ZlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0TmVhcmVzdEF0dGFjaGFibGVDb3ZlcihwbGF5ZXIpIHtcclxuICAgICAgICBpZiAoIXBsYXllciB8fCAhcGxheWVyLm5vZGUgfHwgIWNjLmlzVmFsaWQocGxheWVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYW51cEludmFsaWRDb3ZlclRlc3RDb3ZlcnMoKTtcclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIocGxheWVyLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBuZWFyZXN0ID0gbnVsbDtcclxuICAgICAgICBsZXQgbmVhcmVzdExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpIHx8IGNvdmVyLmF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGVuID0gcGxheWVyUG9zLnN1Yihjb3Zlci5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgaWYgKGxlbiA8PSAxMTAgJiYgKG5lYXJlc3QgPT0gbnVsbCB8fCBsZW4gPCBuZWFyZXN0TGVuKSkge1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdCA9IGNvdmVyO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdExlbiA9IGxlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmVhcmVzdDtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHBsYXllcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fY292ZXJUZXN0TW9kZSB8fCAhcGxheWVyIHx8ICFwbGF5ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChwbGF5ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXR0YWNoZWQgPSB0aGlzLl9nZXRBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllcik7XHJcbiAgICAgICAgaWYgKGF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6dHJ1ZSwgbW9kZTpcImRldGFjaFwifSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZWFyZXN0ID0gdGhpcy5fZ2V0TmVhcmVzdEF0dGFjaGFibGVDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ISFuZWFyZXN0LCBtb2RlOlwiYXR0YWNoXCJ9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlUb2dnbGVDb3ZlclRlc3RBdHRhY2htZW50KHBsYXllcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fY292ZXJUZXN0TW9kZSB8fCAhcGxheWVyIHx8ICFwbGF5ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChwbGF5ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGF0dGFjaGVkID0gdGhpcy5fZ2V0QXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIGlmIChhdHRhY2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXRhY2hDb3ZlclRlc3RDb3ZlcihhdHRhY2hlZCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaENvdmVyVGVzdEJ1dHRvbihwbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZWFyZXN0ID0gdGhpcy5fZ2V0TmVhcmVzdEF0dGFjaGFibGVDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIGlmICghbmVhcmVzdCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLl9zaG93U2FjcmlmaWNlVGlwKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuX3Nob3dTYWNyaWZpY2VUaXAoXCLpnaDov5HmjqnkvZPlkI7miY3og73lkLjpmYRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2F0dGFjaENvdmVyVGVzdENvdmVyKG5lYXJlc3QsIHBsYXllcik7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHBsYXllcik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgX2F0dGFjaENvdmVyVGVzdENvdmVyKGNvdmVyLCBwbGF5ZXIpIHtcclxuICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpIHx8ICFwbGF5ZXIgfHwgIXBsYXllci5ub2RlIHx8ICFjYy5pc1ZhbGlkKHBsYXllci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0ID0gY2MudjIoY292ZXIubm9kZS5wb3NpdGlvbikuc3ViKHBsYXllci5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBpZiAob2Zmc2V0Lm1hZ1NxcigpIDw9IDI1KSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHBsYXllci5fZGlyICYmIHBsYXllci5fZGlyLm1hZ1NxcigpID4gMCA/IHBsYXllci5fZGlyLm5vcm1hbGl6ZSgpLm11bCg3MCkgOiBjYy52Mig3MCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldC5ub3JtYWxpemUoKS5tdWwoTWF0aC5tYXgoNjAsIE1hdGgubWluKDg0LCBvZmZzZXQubWFnKCkpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3Zlci5hdHRhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgY292ZXIub3duZXIgPSBwbGF5ZXIubm9kZTtcclxuICAgICAgICBjb3Zlci5hdHRhY2hPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5zeW5jQXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXRhY2hDb3ZlclRlc3RDb3Zlcihjb3Zlcikge1xyXG4gICAgICAgIGlmICghY292ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb3Zlci5hdHRhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvdmVyLm93bmVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmb3JjZURldGFjaENvdmVyVGVzdEZyb21QbGF5ZXIocGxheWVyKSB7XHJcbiAgICAgICAgbGV0IGF0dGFjaGVkID0gdGhpcy5fZ2V0QXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIGlmIChhdHRhY2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXRhY2hDb3ZlclRlc3RDb3ZlcihhdHRhY2hlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgIH1cclxuXHJcbiAgICBzeW5jQXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvdmVyVGVzdE1vZGUgfHwgIXBsYXllciB8fCAhcGxheWVyLm5vZGUgfHwgIWNjLmlzVmFsaWQocGxheWVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3ZlciA9IHRoaXMuX2dldEF0dGFjaGVkQ292ZXJUZXN0Q292ZXIocGxheWVyKTtcclxuICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5hdHRhY2hPZmZzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHBsYXllci5ub2RlLnBvc2l0aW9uKS5hZGQoY292ZXIuYXR0YWNoT2Zmc2V0KTtcclxuICAgICAgICBwb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIGNvdmVyLnJhZGl1cyArIDYpO1xyXG4gICAgICAgIGNvdmVyLm5vZGUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgY292ZXIubm9kZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHBvcy55KSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5SGFuZGxlQ292ZXJCdWxsZXRDb2xsaXNpb24oZnJvbVBvcywgdG9Qb3MsIGJ1bGxldCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY292ZXJUZXN0TW9kZSB8fCAhYnVsbGV0IHx8IGJ1bGxldC5fY2FtcCAhPSBcImVuZW15XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYW51cEludmFsaWRDb3ZlclRlc3RDb3ZlcnMoKTtcclxuICAgICAgICBsZXQgaGl0Q292ZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBoaXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY292ZXJUZXN0Q292ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3ZlciA9IHRoaXMuX2NvdmVyVGVzdENvdmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFjb3ZlciB8fCAhY292ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChjb3Zlci5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gdGhpcy5fZGlzdGFuY2VQb2ludFRvU2VnbWVudChjYy52Mihjb3Zlci5ub2RlLnBvc2l0aW9uKSwgY2MudjIoZnJvbVBvcyksIGNjLnYyKHRvUG9zKSk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBjb3Zlci5yYWRpdXMgKyA0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gY2MudjIoY292ZXIubm9kZS5wb3NpdGlvbikuc3ViKGZyb21Qb3MpLm1hZ1NxcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpdENvdmVyID09IG51bGwgfHwgbGVuIDwgaGl0TGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGl0Q292ZXIgPSBjb3ZlcjtcclxuICAgICAgICAgICAgICAgICAgICBoaXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaGl0Q292ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlQ292ZXJUZXN0Q292ZXIoaGl0Q292ZXIsIGJ1bGxldCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgX2RhbWFnZUNvdmVyVGVzdENvdmVyKGNvdmVyLCBidWxsZXQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKCFjb3ZlciB8fCAhY292ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChjb3Zlci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3Zlci5ocCA9IE1hdGgubWF4KDAsIGNvdmVyLmhwIC0gMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaENvdmVyVGVzdENvdmVyVmlzdWFsKGNvdmVyKTtcclxuICAgICAgICB0aGlzLl9wbGF5Q292ZXJUZXN0SGl0RWZmZWN0KGNvdmVyKTtcclxuICAgICAgICBpZiAoYnVsbGV0KSB7XHJcbiAgICAgICAgICAgIGlmIChidWxsZXQuZG9EZXN0cm95KSB7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuZG9EZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYnVsbGV0Lm5vZGUgJiYgY2MuaXNWYWxpZChidWxsZXQubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdmVyLmhwIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYnJlYWtDb3ZlclRlc3RDb3Zlcihjb3Zlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikgJiYgdGhpcy5fcGxheWVyLnNjcmlwdCAmJiB0aGlzLl9jb3ZlclRlc3RNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaENvdmVyVGVzdEJ1dHRvbih0aGlzLl9wbGF5ZXIuc2NyaXB0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlDb3ZlclRlc3RIaXRFZmZlY3QoY292ZXIpIHtcclxuICAgICAgICBsZXQgZmxhc2ggPSBuZXcgY2MuTm9kZShcIl9jb3ZlckhpdEZ4XCIpO1xyXG4gICAgICAgIGZsYXNoLnBhcmVudCA9IGNvdmVyLm5vZGU7XHJcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDE5MDtcclxuICAgICAgICBmbGFzaC5zY2FsZSA9IDAuNzI7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZmxhc2guYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMjAsIDE2MCwgMjIwKTtcclxuICAgICAgICBncmFwaGljcy5yZWN0KC0yNCwgLTI0LCA0OCwgNDgpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGZsYXNoLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDgsIDEuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjA4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfYnJlYWtDb3ZlclRlc3RDb3Zlcihjb3Zlcikge1xyXG4gICAgICAgIGlmICghY292ZXIgfHwgIWNvdmVyLm5vZGUgfHwgIWNjLmlzVmFsaWQoY292ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJyZWFrUG9zID0gY2MudjIoY292ZXIubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoQ292ZXJUZXN0Q292ZXIoY292ZXIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaGFyZCA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyU2hhcmRcIik7XHJcbiAgICAgICAgICAgIHNoYXJkLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICAgICAgc2hhcmQuc2V0UG9zaXRpb24oY2MudjMoYnJlYWtQb3MpKTtcclxuICAgICAgICAgICAgc2hhcmQuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChicmVha1Bvcy55KSArIDM7XHJcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IHNoYXJkLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDE1OCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMyKSwgMTEyLCA2OCwgMjQwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MucmVjdCgtNSwgLTUsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSAqIDIgKiBpIC8gNiArIE1hdGgucmFuZG9tKCkgKiAwLjQ7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IDI2ICsgTWF0aC5yYW5kb20oKSAqIDIyO1xyXG4gICAgICAgICAgICBzaGFyZC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yMiwgTWF0aC5jb3MoYW5nbGUpICogZGlzdGFuY2UsIE1hdGguc2luKGFuZ2xlKSAqIGRpc3RhbmNlICsgMTApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KDAuMjIsIDE1MCArIE1hdGgucmFuZG9tKCkgKiAxODApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yMilcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3Zlci5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9jbGVhbnVwSW52YWxpZENvdmVyVGVzdENvdmVycygpO1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpICYmIHRoaXMuX3BsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHRoaXMuX3BsYXllci5zY3JpcHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cnlUZWxlcG9ydEJ1bGxldChidWxsZXQsIGZyb21Qb3MsIHRvUG9zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wb3J0YWxUZXN0TW9kZSB8fCAhYnVsbGV0IHx8ICF0aGlzLl9wb3J0YWxQYWlycyB8fCB0aGlzLl9wb3J0YWxQYWlycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaWdub3JlUG9ydGFsSWQgPSBidWxsZXQuZ2V0UG9ydGFsSWdub3JlSWQgPyBidWxsZXQuZ2V0UG9ydGFsSWdub3JlSWQoKSA6IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wb3J0YWxQYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcG9ydGFsID0gdGhpcy5fcG9ydGFsUGFpcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChwb3J0YWwuaWQgPT0gaWdub3JlUG9ydGFsSWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXN0YW5jZVBvaW50VG9TZWdtZW50KHBvcnRhbC5wb3MsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gcG9ydGFsLnJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBleGl0T2Zmc2V0ID0gYnVsbGV0Ll9kaXIgJiYgYnVsbGV0Ll9kaXIubWFnU3FyKCkgPiAwXHJcbiAgICAgICAgICAgICAgICA/IGJ1bGxldC5fZGlyLm5vcm1hbGl6ZSgpLm11bChwb3J0YWwucmFkaXVzICsgTWF0aC5tYXgoMTYsIGJ1bGxldC5fc3BlZWQgKiAxLjgpKVxyXG4gICAgICAgICAgICAgICAgOiBjYy52Mihwb3J0YWwucmFkaXVzICsgMTgsIDApO1xyXG4gICAgICAgICAgICBsZXQgZXhpdFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcnRhbC5leGl0UG9zLmFkZChleGl0T2Zmc2V0KSwgNDApO1xyXG4gICAgICAgICAgICBpZiAoYnVsbGV0LnRlbGVwb3J0QnlQb3J0YWwpIHtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC50ZWxlcG9ydEJ5UG9ydGFsKGV4aXRQb3MsIHBvcnRhbC5leGl0SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NwYXduUG9ydGFsV2FycEZ4KHBvcnRhbC5wb3MsIGNjLmNvbG9yKDExMCwgMjU1LCAyNDUsIDI1NSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGF3blBvcnRhbFdhcnBGeChwb3J0YWwuZXhpdFBvcywgY2MuY29sb3IoMjU1LCAxMjAsIDIyMCwgMjU1KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeUVudGVyQ2VudHJpZnVnYWxSaW5nKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX2NlbnRyaWZ1Z2FsUmluZ0RhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnVsbGV0Lmhhc1VzZWRDZW50cmlmdWdhbFJpbmcgJiYgYnVsbGV0Lmhhc1VzZWRDZW50cmlmdWdhbFJpbmcoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmluZyA9IHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ0RhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQocmluZy5jZW50ZXIsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gcmluZy50cmlnZ2VyUmFkaXVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJDZW50cmlmdWdhbFJpbmcgPyBidWxsZXQuZW50ZXJDZW50cmlmdWdhbFJpbmcocmluZykgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5a2Q5by5LOeisOaSnuajgOa1i1xyXG4gICAgYnVsbGV0RW5lbXlDb2xsaXNpb25UZXN0KFAsY2FtcCwgb3duZXJQbGF5ZXJJZCA9IC0xKXtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmIGNhbXAgPT0gXCJwbGF5ZXJcIikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX211bHRpcGxheWVyUGxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX211bHRpcGxheWVyUGxheWVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHBsYXllcikgfHwgaSA9PSBvd25lclBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gUC5zdWIocGxheWVyLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSBwbGF5ZXIuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FtcCA9PSBcInBsYXllclwiKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBQLnN1YihlbmVteS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gZW5lbXkuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmVteTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IFAuc3ViKHRoaXMuX3BsYXllci5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRSYWRpdXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPCByYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXHJcbiAgICBwbGF5ZXJTa2lsbEljb25Db2xsaXNpb25UZXN0KCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9za2lsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsID0gdGhpcy5fc2tpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChza2lsbCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZWN0ID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRQbGF5ZXJCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraWxsUmVjdCA9IHNraWxsLnNjcmlwdC5nZXRTa2lsbEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHBsYXllclJlY3Qsc2tpbGxSZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9za2lsbHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGxzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBsYXllckVuZXJneUNvbGxpc2lvblRlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWSjOiDvemHjyznorDmkp7mo4DmtYtcclxuICAgIHBsYXllckVuZXJneUNvbGxpc2lvblRlc3QoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX2VuZXJneXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbmVyZ3lTY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVyZ3lzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZWN0ID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRQbGF5ZXJCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZXJneVJlY3QgPSBlbmVyZ3lTY3JpcHQuZ2V0RW5lcmd5Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3QocGxheWVyUmVjdCwgZW5lcmd5UmVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVyZ3lJZCA9IGVuZXJneVtcIl9fZW5lcmd5SWRcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwibXVsdGlwbGF5ZXItZW5lcmd5LXBpY2t1cFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmVyZ3lJZDogZW5lcmd5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIuc2NyaXB0LmFkZEVuZXJneShlbmVyZ3lTY3JpcHQuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUVuZXJneShkdCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbmVyZ3lzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl9lbmVyZ3lzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneUNkVGltZSArPSBkdDtcclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJCb3JuSW50ZXJ2YWxcIiwgNCk7XHJcbiAgICAgICAgbGV0IG1heENvdW50ID0gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiTWF4Q291bnRcIiwgNik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUNkVGltZSA8IGludGVydmFsIHx8IHRoaXMuX2VuZXJneXMubGVuZ3RoID49IG1heENvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneUNkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFbmVyZ3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul3pJbmRleFxyXG4gICAganVkZ2V6SW5kZXgoeSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSBNYXRoLmZsb29yKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5ri45oiPXHJcbiAgICBzdGFydEdhbWUoZnVuYyl7XHJcbiAgICAgICAgLy/ojrflj5blhbPljaHmlbDmja5cclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gdGhpcy5fbGV2ZWxDb25maWcuRW5lbXlDb3VudCAqIHRoaXMuX2xldmVsSWQ7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSB0aGlzLl9sZXZlbENvbmZpZy5NYXggKyBNYXRoLmZsb29yKHRoaXMuX2xldmVsSWQvNSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ3N0YXJ0X2dhbWUnLHtcImxldmVsXCI6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0S2lsbEVmZmVjdFRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVLaWxsRWZmZWN0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0S2lsbEJyb2FkY2FzdFRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDU7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSA1O1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gNTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6NX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVLaWxsQnJvYWRjYXN0VGVzdEVuZW1pZXMoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRQbGF5ZXJIaXRUZXN0R2FtZShmdW5jKXtcclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OjF9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVySGl0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNob290RWZmZWN0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNob290RWZmZWN0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0UG9ydGFsVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBvcnRhbFRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydENlbnRyaWZ1Z2FsUmluZ1Rlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDZW50cmlmdWdhbFJpbmdUZXN0U2V0dXAoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRDb3ZlclRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDb3ZlclRlc3RFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zcGF3bkNvdmVyVGVzdENvdmVycyg2KTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRFbmVyZ3lFZ2dUZXN0R2FtZShmdW5jKXtcclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OjB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlRW5lcmd5RWdnVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGFtYWdlRG91YmxlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZURhbWFnZURvdWJsZVRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNwZWVkRG91YmxlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNwZWVkRG91YmxlVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U3ByZWFkQnVsbGV0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNwcmVhZEJ1bGxldFRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEJvdW5jZU9ic3RhY2xlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QmxhY2tIb2xlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZUJsYWNrSG9sZVRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydENsdXN0ZXJCb21iVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTI7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxMjtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDEyO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxMn0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDbHVzdGVyQm9tYlRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Rlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgfHwgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlIHx8IHRoaXMuX3BsYXllckhpdFRlc3RNb2RlIHx8IHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSB8fCB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlIHx8IHRoaXMuX3BvcnRhbFRlc3RNb2RlIHx8IHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlIHx8IHRoaXMuX2NvdmVyVGVzdE1vZGUgfHwgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgfHwgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgfHwgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSB8fCB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSB8fCB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlIHx8IHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlIHx8IHRoaXMuX2NsdXN0ZXJCb21iVGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTaG9vdEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzS2lsbEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNLaWxsQnJvYWRjYXN0VGVzdE1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLaWxsRWZmZWN0VGVzdEVuZW15RGVhdGgoZW5lbXlOb2RlKSB7XHJcbiAgICAgICAgaWYgKCFlbmVteU5vZGUgfHwgIWNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVhdGhQb3MgPSBjYy52MihlbmVteU5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRW5lbXkoZW5lbXlOb2RlKTtcclxuICAgICAgICBpZiAoZW5lbXlOb2RlLnNjcmlwdCkge1xyXG4gICAgICAgICAgICBlbmVteU5vZGUuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5lbXlOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd0tpbGxTa3VsbChkZWF0aFBvcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93UGxheWVyQnViYmxlKFwi5bCx6L+Z77yfXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMTUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5S2lsbEV4cGxvc2lvbkVmZmVjdEF0KGRlYXRoUG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZChzZWxmLl9wbGF5ZXIpICYmIHNlbGYuX3BsYXllci5zY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAmJiBzZWxmLl9wbGF5ZXIuc2NyaXB0Ll9zcGF3bkRlYXRoQWZ0ZXJtYXRoQXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9wbGF5ZXIuc2NyaXB0Ll9zcGF3bkRlYXRoQWZ0ZXJtYXRoQXQoZGVhdGhQb3MsIHNlbGYuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kcm9wVGVzdEVuZXJneShkZWF0aFBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChlbmVteU5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLaWxsQnJvYWRjYXN0VGVzdEVuZW15RGVhdGgoZW5lbXlOb2RlKSB7XHJcbiAgICAgICAgaWYgKCFlbmVteU5vZGUgfHwgIWNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVhdGhQb3MgPSBjYy52MihlbmVteU5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCB2aWN0aW1OYW1lID0gZW5lbXlOb2RlW1wiX2tpbGxWaWN0aW1OYW1lXCJdIHx8IFwi5pWM5pa55Z2m5YWLXCI7XHJcbiAgICAgICAgbGV0IHN0cmVhayA9IHRoaXMuX3JlY29yZEtpbGxTdHJlYWsoKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZUVuZW15KGVuZW15Tm9kZSk7XHJcbiAgICAgICAgaWYgKGVuZW15Tm9kZS5zY3JpcHQpIHtcclxuICAgICAgICAgICAgZW5lbXlOb2RlLnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZW15Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dLaWxsU2t1bGwoZGVhdGhQb3MpO1xyXG4gICAgICAgIHRoaXMuX3B1c2hLaWxsQnJvYWRjYXN0KFwi5oiR5Ye75p2A5LqGXCIgKyB2aWN0aW1OYW1lKTtcclxuICAgICAgICB0aGlzLl9zaG93S2lsbEJhZGdlU3RhbXAoc3RyZWFrKTtcclxuICAgICAgICBpZiAoc3RyZWFrID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckJ1YmJsZShcIuaIkeWcqGNhcnJ5XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjE1KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChkZWF0aFBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fcGxheWVyICYmIGNjLmlzVmFsaWQoc2VsZi5fcGxheWVyKSAmJiBzZWxmLl9wbGF5ZXIuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KGRlYXRoUG9zLCBzZWxmLl9maXJlLl90bUxheWVyT2JzdGFjbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dLaWxsU2t1bGwocG9zKSB7XHJcbiAgICAgICAgbGV0IHNrdWxsID0gbmV3IGNjLk5vZGUoXCJfa2lsbFNrdWxsXCIpO1xyXG4gICAgICAgIHNrdWxsLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBza3VsbC5zZXRQb3NpdGlvbihjYy52Myhwb3MueCwgcG9zLnkgKyA4NSwgMCkpO1xyXG4gICAgICAgIHNrdWxsLnpJbmRleCA9IDYwMDA7XHJcbiAgICAgICAgc2t1bGwub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgc2t1bGwuc2NhbGUgPSAxO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IHNrdWxsLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLwn5KAXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSA0ODtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNTI7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgc2t1bGwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEsIDAsIDM0KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMC41KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4zKSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfZHJvcFRlc3RFbmVyZ3kocG9zKSB7XHJcbiAgICAgICAgbGV0IGZyb21Qb3MgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGxldCB0b1BvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGZyb21Qb3MuYWRkKGNjLnYyKDcwLCAzNSkpLCA0MCk7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuY3JlYXRlRW5lcmd5QXQoZnJvbVBvcyk7XHJcbiAgICAgICAgZW5lcmd5LnNjYWxlID0gMC4yO1xyXG4gICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yOCwgMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygwLjM1LCB0b1BvcywgNDIsIDEpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQbGF5ZXJCdWJibGUodGV4dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1YmJsZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCdWJibGVcIik7XHJcbiAgICAgICAgYnViYmxlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBidWJibGUuc2V0UG9zaXRpb24oY2MudjModGhpcy5fcGxheWVyLngsIHRoaXMuX3BsYXllci55ICsgMTA1LCAwKSk7XHJcbiAgICAgICAgYnViYmxlLnpJbmRleCA9IDYwMDA7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IGJ1YmJsZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC01OCwgLTI0LCAxMTYsIDQ4LCAxMik7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG4gICAgICAgIGJnLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNDAsIDQwLCA0MCwgMjQwKTtcclxuICAgICAgICBiZy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtNTgsIC0yNCwgMTE2LCA0OCwgMTIpO1xyXG4gICAgICAgIGJnLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJCdWJibGVcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ1YmJsZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTE2LCA0OCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyMCwgMjAsIDIwKTtcclxuXHJcbiAgICAgICAgYnViYmxlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oY2MubW92ZUJ5KDAuMTUsIDAsIDEyKSwgY2MuZmFkZUluKDAuMTUpKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjUpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2hha2VNYXAoKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAxKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDMpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgMCwgLTMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAyKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIC00LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDIsIDEpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMCwgLTEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlMaWdodFNjcmVlblNoYWtlKCkge1xyXG4gICAgICAgIGxldCBvcmlnaW4gPSBjYy52Myh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTEwMyk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMiwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAtNCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAxKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDAsIC0xKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDkxMDMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rue7k+adn1xyXG4gICAgc2V0RmluaXNoKCl7XHJcbiAgICAgICAgdGhpcy5fZ2FtaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYW5NYXAoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9nYW1pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyUGxheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyU3BlY2lhbEV2ZW50TWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTcGF3blNsb3RzID0gW107XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9jbGVhclBvcnRhbFRlc3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQ2VudHJpZnVnYWxSaW5nVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJEYW1hZ2VEb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhclNwZWVkRG91YmxlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcHJlYWRCdWxsZXRUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhckJvdW5jZU9ic3RhY2xlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJCbGFja0hvbGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXllciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgZW5lbXkuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbmVteXMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9za2lsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsID0gdGhpcy5fc2tpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChza2lsbCkpIHtcclxuICAgICAgICAgICAgICAgIHNraWxsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9za2lsbHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLl9lbmVyZ3lzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChlbmVyZ3kpKSB7XHJcbiAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuZXJneXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29pbFNwaWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3BpbGwgPSB0aGlzLl9vaWxTcGlsbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChzcGlsbCAmJiBzcGlsbC5ub2RlICYmIGNjLmlzVmFsaWQoc3BpbGwubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHNwaWxsLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29pbFNwaWxscyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdENvdmVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdEVuZW15ID0gbnVsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneUVnZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVnZyA9IHRoaXMuX2VuZXJneUVnZ3NbaV07XHJcbiAgICAgICAgICAgIGlmIChlZ2cgJiYgZWdnLm5vZGUgJiYgY2MuaXNWYWxpZChlZ2cubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGVnZy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ1c2ggPSB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChidXNoICYmIGJ1c2gubm9kZSAmJiBjYy5pc1ZhbGlkKGJ1c2gubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGJ1c2gubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaGVzID0gW107XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5Q2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jbGVhclJ1bnRpbWVNYXBOb2RlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhclJ1bnRpbWVNYXBOb2Rlcygpe1xyXG4gICAgICAgIGlmICh0aGlzLl90bURlY2FsICYmIGNjLmlzVmFsaWQodGhpcy5fdG1EZWNhbCkpIHtcclxuICAgICAgICAgICAgbGV0IGRlY2FsQ2hpbGRyZW4gPSB0aGlzLl90bURlY2FsLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVjYWxDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gZGVjYWxDaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJ1bnRpbWVOYW1lcyA9IHtcclxuICAgICAgICAgICAgXCJQbGF5ZXJcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJFbmVteVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkJ1bGxldFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkJvb21cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJTa2lsbEljb25cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJPaWxQaWNrdXBcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJFbmVyZ3lJdGVtXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2tpbGxTa3VsbFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9raWxsQnViYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3VwZ3JhZGVGbG9hdFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9idWxsZXRNdXRhdGlvbk1lZGFsXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3BvcnRhbEdhdGVBXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3BvcnRhbEdhdGVCXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3BvcnRhbExpbmtGeFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9wb3J0YWxIaW50TGFiZWxcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfcG9ydGFsV2FycEZ4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NlbnRyaWZ1Z2FsUmluZ1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jZW50cmlmdWdhbFJpbmdIaW50XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NlbnRyaWZ1Z2FsUmluZ0d1aWRlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NlbnRyaWZ1Z2FsUmluZ0Z4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX29pbFNwaWxsXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NvdmVyVGVzdENyYXRlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NvdmVyVGVzdENyYXRlU2hhZG93XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NvdmVySGl0RnhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY292ZXJTaGFyZFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkVuZXJneUVnZ1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9lbmVyZ3lFZ2dCdXNoXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2VuZXJneUVnZ0J1c2hTaGFkb3dcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfZW5lcmd5RWdnTGVhZlwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9lbmVyZ3lFZ2dCdXNoQ29yZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9kYW1hZ2VEb3VibGVBcmVhXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2RhbWFnZURvdWJsZUZ4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3NwZWVkRG91YmxlQXJlYVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9zcGVlZERvdWJsZUZ4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3NwcmVhZEJ1bGxldEFyZWFcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfc3ByZWFkQnVsbGV0RnhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfYm91bmNlT2JzdGFjbGVDaXJjbGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfYm91bmNlT2JzdGFjbGVMaW5lXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2JsYWNrSG9sZUFyZWFcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfYmxhY2tIb2xlRnhcIjogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoY2hpbGQpICYmIHJ1bnRpbWVOYW1lc1tjaGlsZC5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfZ2V0TXVsdGlwbGF5ZXJTcGF3bkNhbmRpZGF0ZXMoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXJCb3JuUG9zKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteUJvcm5Qb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMuX2VuZW15Qm9yblBvc1tpXTtcclxuICAgICAgICAgICAgaWYgKHBvcykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2MudjIocG9zKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBfcmVzb2x2ZU11bHRpcGxheWVyU3Bhd25Qb3NpdGlvbihwbGF5ZXJJZHgsIHBsYXllckNvdW50KSB7XHJcbiAgICAgICAgbGV0IGNhbmRpZGF0ZXMgPSB0aGlzLl9nZXRNdWx0aXBsYXllclNwYXduQ2FuZGlkYXRlcygpO1xyXG4gICAgICAgIGlmIChjYW5kaWRhdGVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGF3bk9mZnNldCA9IGNjLnYyKChwbGF5ZXJJZHggLSAocGxheWVyQ291bnQgLSAxKSAvIDIpICogMTgwLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHRoaXMuX3BsYXllckJvcm5Qb3MuYWRkKHNwYXduT2Zmc2V0KSwgNjApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNsb3QgPSB0aGlzLl9tdWx0aXBsYXllclNwYXduU2xvdHNbcGxheWVySWR4XTtcclxuICAgICAgICBsZXQgaW5kZXggPSBzbG90ID09IG51bGwgPyBwbGF5ZXJJZHggOiBzbG90O1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2luZGV4ICUgY2FuZGlkYXRlcy5sZW5ndGhdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihjYW5kaWRhdGUsIDgwKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVNdWx0aXBsYXllclBsYXllcihwbGF5ZXJJZHgsIHBsYXllckNvdW50LCBwbGF5ZXJTdGF0ZSA9IG51bGwpIHtcclxuICAgICAgICBsZXQgcGxheWVyVHlwZSA9IHBsYXllclN0YXRlICYmIHBsYXllclN0YXRlLnRhbmtUeXBlICE9IG51bGxcclxuICAgICAgICAgICAgPyBwbGF5ZXJTdGF0ZS50YW5rVHlwZVxyXG4gICAgICAgICAgICA6IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9jdXJyZW50X3BsYXllcl90eXBlX1wiLDEpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJMZXZlbCA9IHBsYXllclN0YXRlICYmIHBsYXllclN0YXRlLnBsYXllckxldmVsICE9IG51bGxcclxuICAgICAgICAgICAgPyBwbGF5ZXJTdGF0ZS5wbGF5ZXJMZXZlbFxyXG4gICAgICAgICAgICA6IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX3BsYXllcl8ke3BsYXllclR5cGV9X2AsIDEpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWVyID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWIpO1xyXG4gICAgICAgIHBsYXllci5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcGxheWVyLnpJbmRleCA9IDEwMDtcclxuXHJcbiAgICAgICAgbGV0IHNwYXduUG9zID0gdGhpcy5fcmVzb2x2ZU11bHRpcGxheWVyU3Bhd25Qb3NpdGlvbihwbGF5ZXJJZHgsIHBsYXllckNvdW50KTtcclxuICAgICAgICBwbGF5ZXIucG9zaXRpb24gPSBjYy52MyhzcGF3blBvcyk7XHJcbiAgICAgICAgcGxheWVyLnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgcGxheWVyLnNjcmlwdC5zZXRQbGF5ZXJUeXBlKHBsYXllclR5cGUsIHBsYXllckxldmVsKTtcclxuICAgICAgICBwbGF5ZXIuc2NyaXB0LnNldEluR2FtZSgpO1xyXG4gICAgICAgIHBsYXllci5zY3JpcHQuX211bHRpcGxheWVyUGxheWVySWQgPSBwbGF5ZXJJZHg7XHJcbiAgICAgICAgcGxheWVyW1wiX19tdWx0aXBsYXllclBsYXllcklkXCJdID0gcGxheWVySWR4O1xyXG5cclxuICAgICAgICAvLyBNYXJrIHJlbW90ZSBwbGF5ZXJzIChubyBVSSBjb250cm9scylcclxuICAgICAgICBpZiAocGxheWVySWR4ICE9PSB0aGlzLl9sb2NhbFBsYXllcklkKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5zY3JpcHQuX211bHRpcGxheWVyUmVtb3RlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGxheWVyLnNjcmlwdC5fbXVsdGlwbGF5ZXJNb2RlID0gdHJ1ZTtcclxuICAgICAgICBpZiAocGxheWVyU3RhdGUgJiYgcGxheWVyLnNjcmlwdC5zeW5jTXVsdGlwbGF5ZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LnN5bmNNdWx0aXBsYXllclN0YXRlKHBsYXllclN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpc3VhbGx5IGRpc3Rpbmd1aXNoIHBsYXllcnM6IFAwPWdyZWVuIHRpbnQsIFAxPWJsdWUgdGludFxyXG4gICAgICAgIGxldCBjb2xvclRpbnQgPSBwbGF5ZXJJZHggPT09IHRoaXMuX2xvY2FsUGxheWVySWQgPyBjYy5jb2xvcigxODAsIDI1NSwgMTgwLCAyNTUpIDogY2MuY29sb3IoMTYwLCAyMDAsIDI1NSwgMjU1KTtcclxuICAgICAgICBsZXQgdHJ5TmFtZXMgPSBbJ19zcHJCZzEnLCAnX3NwckJnMicsICdfc3ByQmczJywgJ19zcHJCZzQnLCAnX3NwckJnJ107XHJcbiAgICAgICAgdHJ5TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICAgICAgbGV0IGZpcmVSZWZzID0gcGxheWVyW1wiX2ZpcmVcIl07XHJcbiAgICAgICAgICAgIGxldCBuID0gZmlyZVJlZnMgPyBmaXJlUmVmc1tuYW1lXSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChuICYmIGNjLmlzVmFsaWQobikpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7IG4uY29sb3IgPSBjb2xvclRpbnQ7IH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJzW3BsYXllcklkeF0gPSBwbGF5ZXI7XHJcbiAgICAgICAgaWYgKHBsYXllcklkeCA9PT0gdGhpcy5fbG9jYWxQbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRNdWx0aXBsYXllckdhbWUocGxheWVyQ291bnQsIGxvY2FsUGxheWVySWQsIHNwYXduU2xvdHMsIGVuZXJnaWVzLCBwbGF5ZXJzLCBzcGVjaWFsRXZlbnRzLCBvblJlYWR5KSB7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclBsYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldHMgPSB7fTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckVuZXJneU1hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRW5lcmd5RWdnTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTcGVjaWFsRXZlbnRNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9sb2NhbFBsYXllcklkID0gbG9jYWxQbGF5ZXJJZCA9PSBudWxsID8gMCA6IGxvY2FsUGxheWVySWQ7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTcGF3blNsb3RzID0gc3Bhd25TbG90cyA/IHNwYXduU2xvdHMuc2xpY2UoKSA6IFtdO1xyXG4gICAgICAgIGxldCBwbGF5ZXJTdGF0ZXMgPSBBcnJheS5pc0FycmF5KHBsYXllcnMpID8gcGxheWVycyA6IFtdO1xyXG4gICAgICAgIGxldCBpbml0aWFsU3BlY2lhbEV2ZW50cyA9IEFycmF5LmlzQXJyYXkoc3BlY2lhbEV2ZW50cykgPyBzcGVjaWFsRXZlbnRzIDogW107XHJcblxyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9jbGVhckFsbFRlc3ROb2RlcygpO1xyXG5cclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlRlc3RNb2RlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LCAtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsIHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZU11bHRpcGxheWVyUGxheWVyKGksIHBsYXllckNvdW50LCBwbGF5ZXJTdGF0ZXNbaV0gfHwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbEVuZXJnaWVzID0gZW5lcmdpZXMgfHwgW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYWxFbmVyZ2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25NdWx0aXBsYXllckVuZXJneVNwYXduKGluaXRpYWxFbmVyZ2llc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYWxTcGVjaWFsRXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fYXBwbHlNdWx0aXBsYXllclNwZWNpYWxFdmVudFNwYXduKGluaXRpYWxTcGVjaWFsRXZlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBDZW50ZXIgY2FtZXJhIG9uIGxvY2FsIHBsYXllciBpbW1lZGlhdGVseVxyXG4gICAgICAgICAgICAgICAgc2VsZi5fY2VudGVyT25Mb2NhbFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9uUmVhZHkpIG9uUmVhZHkoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzaW11bGF0ZUZyYW1lKGZyYW1lRGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGNvbW1hbmRzID0gZnJhbWVEYXRhICYmIEFycmF5LmlzQXJyYXkoZnJhbWVEYXRhLmNvbW1hbmRzKSA/IGZyYW1lRGF0YS5jb21tYW5kcyA6IFtdO1xyXG4gICAgICAgIHRoaXMuX2FwcGx5TXVsdGlwbGF5ZXJGcmFtZUNvbW1hbmRzKGNvbW1hbmRzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2VudGVyT25Mb2NhbFBsYXllcigpO1xyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyRnJhbWVDb21tYW5kcyhjb21tYW5kcykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbW1hbmQgPSBjb21tYW5kc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFjb21tYW5kIHx8ICFjb21tYW5kLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT09IFwicGxheWVySW5wdXRcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX211bHRpcGxheWVyUGxheWVyc1tjb21tYW5kLnBsYXllcklkXTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgY2MuaXNWYWxpZChwbGF5ZXIpICYmIHBsYXllci5zY3JpcHQgJiYgcGxheWVyLnNjcmlwdC5zZXRGcmFtZUlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5zZXRGcmFtZUlucHV0KGNvbW1hbmQuaW5wdXRzIHx8IHt9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09IFwicGxheWVyU3RhdGVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX211bHRpcGxheWVyUGxheWVyc1tjb21tYW5kLnBsYXllcklkXTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgY2MuaXNWYWxpZChwbGF5ZXIpICYmIHBsYXllci5zY3JpcHQgJiYgcGxheWVyLnNjcmlwdC5zeW5jTXVsdGlwbGF5ZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5zY3JpcHQuc3luY011bHRpcGxheWVyU3RhdGUoY29tbWFuZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcInBsYXllckhpdFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5TXVsdGlwbGF5ZXJIaXQoY29tbWFuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcImVuZXJneVNwYXduXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NdWx0aXBsYXllckVuZXJneVNwYXduKGNvbW1hbmQuZW5lcmd5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09IFwiZW5lcmd5Q29uc3VtZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTXVsdGlwbGF5ZXJFbmVyZ3lSZW1vdmUoY29tbWFuZC5lbmVyZ3lJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcInBsYXllclVwZ3JhZGVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk11bHRpcGxheWVyUGxheWVyVXBncmFkZShjb21tYW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09IFwiZW5lcmd5RWdnU3Bhd25cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3Bhd25NdWx0aXBsYXllckVuZXJneUVnZyhjb21tYW5kLmVnZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcImVuZXJneUVnZ01vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZU11bHRpcGxheWVyRW5lcmd5RWdnKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJlbmVyZ3lFZ2dNYXR1cmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0dXJlTXVsdGlwbGF5ZXJFbmVyZ3lFZ2coY29tbWFuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSBcImVuZXJneUVnZ1JlbW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVNdWx0aXBsYXllckVuZXJneUVnZyhjb21tYW5kLmVnZ0lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09IFwic3BlY2lhbEV2ZW50U3Bhd25cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlNdWx0aXBsYXllclNwZWNpYWxFdmVudFNwYXduKGNvbW1hbmQuZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJzcGVjaWFsRXZlbnRSZW1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlNdWx0aXBsYXllclNwZWNpYWxFdmVudFJlbW92ZShjb21tYW5kLmV2ZW50SWQsIGNvbW1hbmQuZXZlbnRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk11bHRpcGxheWVyRW5lcmd5U3Bhd24oZW5lcmd5RGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFlbmVyZ3lEYXRhIHx8IGVuZXJneURhdGEuaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckVuZXJneU1hcFtlbmVyZ3lEYXRhLmlkXSAmJiBjYy5pc1ZhbGlkKHRoaXMuX211bHRpcGxheWVyRW5lcmd5TWFwW2VuZXJneURhdGEuaWRdKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRlRW5lcmd5QXRGb3JNdWx0aXBsYXllcihlbmVyZ3lEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk11bHRpcGxheWVyRW5lcmd5UmVtb3ZlKGVuZXJneUlkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgZW5lcmd5SWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLl9tdWx0aXBsYXllckVuZXJneU1hcFtlbmVyZ3lJZF07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX211bHRpcGxheWVyRW5lcmd5TWFwW2VuZXJneUlkXTtcclxuICAgICAgICBpZiAoIWVuZXJneSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbmVyZ3lzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbmVyZ3lzW2ldID09PSBlbmVyZ3kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lcmd5KSkge1xyXG4gICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk11bHRpcGxheWVyUGxheWVyVXBncmFkZShwYXlsb2FkKSB7XHJcbiAgICAgICAgLy8g5Y2H57qn6KGo546w57uf5LiA55Sx546p5a6254q25oCB5ZCM5q2l6Kem5Y+R77yM6YG/5YWN5raI5oGv5YWI5ZCO6aG65bqP5a+86Ie05Lii6KGo546w5oiW6YeN5aSN6KGo546w44CCXHJcbiAgICB9XHJcblxyXG4gICAgaXNNdWx0aXBsYXllck1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpcGxheWVyTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMb2NhbFBsYXllcklkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFBsYXllcklkO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyTXVsdGlwbGF5ZXJCdWxsZXQoYnVsbGV0SWQsIGJ1bGxldE5vZGUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCAhYnVsbGV0SWQgfHwgIWJ1bGxldE5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldHNbYnVsbGV0SWRdID0gYnVsbGV0Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICB1bnJlZ2lzdGVyTXVsdGlwbGF5ZXJCdWxsZXQoYnVsbGV0SWQsIGJ1bGxldE5vZGUgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKCFidWxsZXRJZCB8fCAhdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRzW2J1bGxldElkXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYnVsbGV0Tm9kZSB8fCB0aGlzLl9tdWx0aXBsYXllckJ1bGxldHNbYnVsbGV0SWRdID09PSBidWxsZXROb2RlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9tdWx0aXBsYXllckJ1bGxldHNbYnVsbGV0SWRdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBvcnRNdWx0aXBsYXllckJ1bGxldEhpdChidWxsZXRJZCwgdGFyZ2V0UGxheWVySWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCAhYnVsbGV0SWQgfHwgdGFyZ2V0UGxheWVySWQgPT0gbnVsbCB8fCB0YXJnZXRQbGF5ZXJJZCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm11bHRpcGxheWVyLWhpdFwiLCB7XHJcbiAgICAgICAgICAgIGlkOiBidWxsZXRJZCxcclxuICAgICAgICAgICAgdGdpZDogdGFyZ2V0UGxheWVySWQsXHJcbiAgICAgICAgICAgIGhwOiAtMSxcclxuICAgICAgICAgICAgZGFtYWdlOiAtMSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseU11bHRpcGxheWVySGl0KGhpdERhdGEpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCAhaGl0RGF0YSB8fCAhaGl0RGF0YS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRzW2hpdERhdGEuaWRdO1xyXG4gICAgICAgIGlmIChidWxsZXQgJiYgY2MuaXNWYWxpZChidWxsZXQpICYmIGJ1bGxldC5zY3JpcHQgJiYgYnVsbGV0LnNjcmlwdC5kb0Rlc3Ryb3kpIHtcclxuICAgICAgICAgICAgYnVsbGV0LnNjcmlwdC5kb0Rlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyTXVsdGlwbGF5ZXJCdWxsZXQoaGl0RGF0YS5pZCwgYnVsbGV0KTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldFBsYXllciA9IHRoaXMuX211bHRpcGxheWVyUGxheWVyc1toaXREYXRhLnRnaWRdO1xyXG4gICAgICAgIGlmICghdGFyZ2V0UGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRhcmdldFBsYXllcikgfHwgIXRhcmdldFBsYXllci5zY3JpcHQgfHwgIXRhcmdldFBsYXllci5zY3JpcHQuYXBwbHlNdWx0aXBsYXllckhpdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldFBsYXllci5zY3JpcHQuYXBwbHlNdWx0aXBsYXllckhpdChoaXREYXRhLmRhbWFnZSwgaGl0RGF0YS5ocCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FwcGx5TXVsdGlwbGF5ZXJTcGVjaWFsRXZlbnRTcGF3bihldmVudERhdGEpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCAhZXZlbnREYXRhIHx8ICFldmVudERhdGEuaWQgfHwgIWV2ZW50RGF0YS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTcGVjaWFsRXZlbnRNYXBbZXZlbnREYXRhLmlkXSA9IGV2ZW50RGF0YTtcclxuICAgICAgICBpZiAoZXZlbnREYXRhLnR5cGUgPT09IFwicG9ydGFsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwbHlNdWx0aXBsYXllclBvcnRhbEV2ZW50KGV2ZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50RGF0YS50eXBlID09PSBcImRhbWFnZURvdWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5TXVsdGlwbGF5ZXJEYW1hZ2VEb3VibGVFdmVudChldmVudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudERhdGEudHlwZSA9PT0gXCJzcGVlZERvdWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5TXVsdGlwbGF5ZXJTcGVlZERvdWJsZUV2ZW50KGV2ZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50RGF0YS50eXBlID09PSBcImJsYWNrSG9sZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5TXVsdGlwbGF5ZXJCbGFja0hvbGVFdmVudChldmVudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYXBwbHlNdWx0aXBsYXllclNwZWNpYWxFdmVudFJlbW92ZShldmVudElkLCBldmVudFR5cGUgPSBcIlwiKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnRJZCAhPSBudWxsICYmIHRoaXMuX211bHRpcGxheWVyU3BlY2lhbEV2ZW50TWFwW2V2ZW50SWRdKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9tdWx0aXBsYXllclNwZWNpYWxFdmVudE1hcFtldmVudElkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gXCJwb3J0YWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhclBvcnRhbFRlc3ROb2RlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudFR5cGUgPT09IFwiZGFtYWdlRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fY2xlYXJEYW1hZ2VEb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnRUeXBlID09PSBcInNwZWVkRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhclNwZWVkRG91YmxlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50VHlwZSA9PT0gXCJibGFja0hvbGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9ibGFja0hvbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhckJsYWNrSG9sZVRlc3ROb2RlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYXBwbHlNdWx0aXBsYXllclBvcnRhbEV2ZW50KGV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmICghZXZlbnREYXRhLmVudHJ5UG9zIHx8ICFldmVudERhdGEuZXhpdFBvcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jbGVhclBvcnRhbFRlc3ROb2RlcygpO1xyXG4gICAgICAgIGxldCBlbnRyeVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKGV2ZW50RGF0YS5lbnRyeVBvcyksIDkwKTtcclxuICAgICAgICBsZXQgZXhpdFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKGV2ZW50RGF0YS5leGl0UG9zKSwgOTApO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbEdhdGUoXCJfcG9ydGFsR2F0ZUFcIiwgZW50cnlQb3MsIGNjLmNvbG9yKDkwLCAyMTUsIDI1NSwgMjU1KSwgXCJBXCIpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbEdhdGUoXCJfcG9ydGFsR2F0ZUJcIiwgZXhpdFBvcywgY2MuY29sb3IoMjU1LCAxMjAsIDIyMCwgMjU1KSwgXCJCXCIpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbExpbmtGeChlbnRyeVBvcywgZXhpdFBvcyk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlUG9ydGFsSGludExhYmVsKGVudHJ5UG9zKTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxQYWlycy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IFwicG9ydGFsQVwiLFxyXG4gICAgICAgICAgICBwb3M6IGVudHJ5UG9zLFxyXG4gICAgICAgICAgICByYWRpdXM6IGV2ZW50RGF0YS5yYWRpdXMgPT0gbnVsbCA/IDQ0IDogZXZlbnREYXRhLnJhZGl1cyxcclxuICAgICAgICAgICAgZXhpdElkOiBcInBvcnRhbEJcIixcclxuICAgICAgICAgICAgZXhpdFBvczogZXhpdFBvcyxcclxuICAgICAgICAgICAgZXZlbnRJZDogZXZlbnREYXRhLmlkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsUGFpcnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBcInBvcnRhbEJcIixcclxuICAgICAgICAgICAgcG9zOiBleGl0UG9zLFxyXG4gICAgICAgICAgICByYWRpdXM6IGV2ZW50RGF0YS5yYWRpdXMgPT0gbnVsbCA/IDQ0IDogZXZlbnREYXRhLnJhZGl1cyxcclxuICAgICAgICAgICAgZXhpdElkOiBcInBvcnRhbEFcIixcclxuICAgICAgICAgICAgZXhpdFBvczogZW50cnlQb3MsXHJcbiAgICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50RGF0YS5pZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyRGFtYWdlRG91YmxlRXZlbnQoZXZlbnREYXRhKSB7XHJcbiAgICAgICAgaWYgKCFldmVudERhdGEuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyRGFtYWdlRG91YmxlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKGV2ZW50RGF0YS5jZW50ZXIpLCAxMDApO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSBldmVudERhdGEucmFkaXVzID09IG51bGwgPyA2MCA6IGV2ZW50RGF0YS5yYWRpdXM7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlRGFtYWdlRG91YmxlQXJlYU5vZGUoY2VudGVyLCByYWRpdXMsIGNjLmNvbG9yKDI1NSwgNDAsIDQwLCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVBcmVhRGF0YSA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBkYW1hZ2VNdWx0aXBsaWVyOiBldmVudERhdGEuZGFtYWdlTXVsdGlwbGllciA9PSBudWxsID8gMiA6IGV2ZW50RGF0YS5kYW1hZ2VNdWx0aXBsaWVyLFxyXG4gICAgICAgICAgICBzY2FsZU11bHRpcGxpZXI6IGV2ZW50RGF0YS5zY2FsZU11bHRpcGxpZXIgPT0gbnVsbCA/IDEuNSA6IGV2ZW50RGF0YS5zY2FsZU11bHRpcGxpZXIsXHJcbiAgICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50RGF0YS5pZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyU3BlZWREb3VibGVFdmVudChldmVudERhdGEpIHtcclxuICAgICAgICBpZiAoIWV2ZW50RGF0YS5jZW50ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jbGVhclNwZWVkRG91YmxlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKGV2ZW50RGF0YS5jZW50ZXIpLCAxMDApO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSBldmVudERhdGEucmFkaXVzID09IG51bGwgPyA2MCA6IGV2ZW50RGF0YS5yYWRpdXM7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlU3BlZWREb3VibGVBcmVhTm9kZShjZW50ZXIsIHJhZGl1cywgY2MuY29sb3IoMzAsIDEzMCwgMjU1LCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZUFyZWFEYXRhID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIHNwZWVkTXVsdGlwbGllcjogZXZlbnREYXRhLnNwZWVkTXVsdGlwbGllciA9PSBudWxsID8gMyA6IGV2ZW50RGF0YS5zcGVlZE11bHRpcGxpZXIsXHJcbiAgICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50RGF0YS5pZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVyQmxhY2tIb2xlRXZlbnQoZXZlbnREYXRhKSB7XHJcbiAgICAgICAgaWYgKCFldmVudERhdGEuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQmxhY2tIb2xlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKGV2ZW50RGF0YS5jZW50ZXIpLCAxMjApO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSBldmVudERhdGEucmFkaXVzID09IG51bGwgPyAxMDAgOiBldmVudERhdGEucmFkaXVzO1xyXG4gICAgICAgIGxldCBkZXN0cm95UmFkaXVzID0gZXZlbnREYXRhLmRlc3Ryb3lSYWRpdXMgPT0gbnVsbCA/IDE0IDogZXZlbnREYXRhLmRlc3Ryb3lSYWRpdXM7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQmxhY2tIb2xlQXJlYU5vZGUoY2VudGVyLCByYWRpdXMsIGRlc3Ryb3lSYWRpdXMsIGNjLmNvbG9yKDgwLCAzMCwgMTYwLCAyMDApKTtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVBcmVhRGF0YSA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBkZXN0cm95UmFkaXVzOiBkZXN0cm95UmFkaXVzLFxyXG4gICAgICAgICAgICBncmF2aXR5U3RyZW5ndGg6IGV2ZW50RGF0YS5ncmF2aXR5U3RyZW5ndGggPT0gbnVsbCA/IDE2MCA6IGV2ZW50RGF0YS5ncmF2aXR5U3RyZW5ndGgsXHJcbiAgICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50RGF0YS5pZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9jZW50ZXJPbkxvY2FsUGxheWVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX211bHRpcGxheWVyUGxheWVyc1t0aGlzLl9sb2NhbFBsYXllcklkXTtcclxuICAgICAgICBpZiAoIXBsYXllciB8fCAhY2MuaXNWYWxpZChwbGF5ZXIpKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBvcyA9IHBsYXllci5wb3NpdGlvbjtcclxuICAgICAgICBpZiAoIXBvcykgcmV0dXJuO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC1wb3MueCwgLXBvcy55KSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHdpbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckFsbFRlc3ROb2RlcygpIHtcclxuICAgICAgICB0aGlzLl9jbGVhclBvcnRhbFRlc3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQ2VudHJpZnVnYWxSaW5nVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJEYW1hZ2VEb3VibGVUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhclNwZWVkRG91YmxlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcHJlYWRCdWxsZXRUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhckJvdW5jZU9ic3RhY2xlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJCbGFja0hvbGVUZXN0Tm9kZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc01hcCgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aSN5rS7XHJcbiAgICByZXZpdmUoKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wb3NpdGlvbiA9IHRoaXMuX3BsYXllckxhc3RQb3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCl7XHJcbiAgICAgICAgdGhpcy5fcGF1c2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3VtZSgpe1xyXG4gICAgICAgIHRoaXMuX3BhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19