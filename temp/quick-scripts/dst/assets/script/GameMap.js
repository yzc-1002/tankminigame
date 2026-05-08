
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
            radius: options.radius == null ? 34 : options.radius,
            energyCount: options.energyCount == null ? 16 : options.energyCount,
            energyScatterRadius: options.energyScatterRadius == null ? 130 : options.energyScatterRadius,
            burstDone: false,
        };
        eggScript.init({
            lifeTime: options.lifeTime == null ? 10 : options.lifeTime,
            radius: egg.radius,
            onMature: function () {
                _this._handleEnergyEggMature(egg);
            }
        });
        this._loadEnergyEggFrame(function (spriteFrame) {
            if (eggScript && cc.isValid(eggScript)) {
                eggScript.setSpriteFrame(spriteFrame);
            }
        });
        this._energyEggs.push(egg);
        return egg;
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
    GameMap.prototype.bulletEnemyCollisionTest = function (P, camp) {
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
                    this._player.script.addEnergy(energyScript.getValue());
                    this._energys.splice(i, 1);
                    energy.destroy();
                    return;
                }
            }
            else {
                this._energys.splice(i, 1);
            }
        }
    };
    GameMap.prototype._updateEnergy = function (dt) {
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
    GameMap.prototype.isTestMode = function () {
        return this._killEffectTestMode || this._killBroadcastTestMode || this._playerHitTestMode || this._upgradeTestMode || this._shootEffectTestMode || this._portalTestMode || this._centrifugalRingTestMode || this._coverTestMode || this._energyEggTestMode || this._damageDoubleTestMode || this._speedDoubleTestMode || this._spreadBulletTestMode || this._bounceObstacleTestMode;
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
        this._resetKillBroadcastRuntime();
        this._clearPortalTestNodes();
        this._clearCentrifugalRingTestNodes();
        this._clearDamageDoubleTestNodes();
        this._clearSpeedDoubleTestNodes();
        this._clearSpreadBulletTestNodes();
        this._clearBounceObstacleTestNodes();
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
            "_bounceObstacleLine": true
        };
        var children = this._fire._tmLayerObstacle.children.slice();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (cc.isValid(child) && runtimeNames[child.name]) {
                child.destroy();
            }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUNuRCwyQ0FBd0M7QUFDeEMseUNBQXNDO0FBQ3RDLG9EQUFtRDtBQUNuRCw0REFBdUQ7QUFDdkQseUNBQXNDO0FBQ3RDLDhCQUE4QjtBQUM5Qiw0Q0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyw0Q0FBeUM7QUFDbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsSUFBTSwwQkFBMEIsR0FBRyxDQUFDLENBQUM7QUFDckMsSUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFDdEMsSUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUM7QUFDcEMsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7QUFDN0IsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxvQkFBb0IsR0FBRyxzQ0FBc0MsQ0FBQztBQUNwRSxJQUFNLHFCQUFxQixHQUFHLHNDQUFzQyxDQUFDO0FBQ3JFLElBQU0scUJBQXFCLEdBQUcsc0NBQXNDLENBQUM7QUFDckUsSUFBTSwyQkFBMkIsR0FBRyxzQ0FBc0MsQ0FBQztBQUMzRSxJQUFNLHNCQUFzQixHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RFLElBQU0sc0JBQXNCLEdBQUc7SUFDM0IsQ0FBQyxFQUFFLHNDQUFzQztJQUN6QyxDQUFDLEVBQUUsc0NBQXNDO0lBQ3pDLENBQUMsRUFBRSxzQ0FBc0M7SUFD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LEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQzNDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDcEQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0RyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUM3QixLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUks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QyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxL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QUcsSUFBSSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVuQyxJQUFJLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsUUFBUSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDbkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWxCLElBQUksU0FBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3RDLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FB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YUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1RCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEQsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFcEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxF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RyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUU7WUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDdEI7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxxQ0FBbUIsR0FBbkIsVUFBb0IsR0FBRztRQUNuQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEIsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLENBQUMsQ0FB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LEVBQUUsQ0FBQyxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDckIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDUixLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsd0NBQXNCLEdBQXRCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDcEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNyQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNyQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDdEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNSLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxD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SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDbUI7SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDbUI7SUE5QjlCLE9BQU87UUFEbkIsT0FBTztPQUNLLE9BQU8sQ0E4eEpuQjtJQUFELGNBQUM7Q0E5eEpELEFBOHhKQyxDQTl4SjRCLDZCQUFhLEdBOHhKekM7QUE5eEpZLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5pbXBvcnQge0VuZXJneUl0ZW19IGZyb20gXCIuL0VuZXJneUl0ZW1cIjtcclxuaW1wb3J0IHtFbmVyZ3lFZ2d9IGZyb20gXCIuL0VuZXJneUVnZ1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQgUmlwcGxlU2hvY2t3YXZlIGZyb20gXCIuL2VmZmVjdC9SaXBwbGVTaG9ja3dhdmVcIjtcclxuaW1wb3J0IHtPaWxQaWNrdXB9IGZyb20gXCIuL09pbFBpY2t1cFwiO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuLy/nvZHpobXlrqLmnI0gaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9rZWZ1Lmh0bWxcclxuaW1wb3J0IHtBbmFseXRpY3N9IGZyb20gXCIuL2FkL0FuYWx5dGljc1wiO1xyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuY29uc3QgS0lMTF9TVFJFQUtfV0lORE9XID0gMjA7XHJcbmNvbnN0IEtJTExfQlJPQURDQVNUX01BWF9WSVNJQkxFID0gMztcclxuY29uc3QgS0lMTF9CUk9BRENBU1RfU0xPVF9IRUlHSFQgPSA2NDtcclxuY29uc3QgS0lMTF9CUk9BRENBU1RfRFVSQVRJT04gPSAyLjI7XHJcbmNvbnN0IE9JTF9TUElMTF9EVVJBVElPTiA9IDEwO1xyXG5jb25zdCBPSUxfU1BJTExfUkFESVVTID0gMTIwO1xyXG5jb25zdCBPSUxfU1BJTExfU0xPV19GQUNUT1IgPSAwLjUyO1xyXG5jb25zdCBPSUxfU1BJTExfRlJBTUVfVVVJRCA9IFwiNTNhNTIzOTctYmU3MS00YjFlLWJkOTMtOTZjNWI5YTdmMmNlXCI7XHJcbmNvbnN0IENPVkVSX1RFU1RfRlJBTUVfVVVJRCA9IFwiZjI3MjE1YTQtMzJiMC00YTNjLWI4N2QtNjlhM2RjMDNlMzdhXCI7XHJcbmNvbnN0IEVORVJHWV9FR0dfRlJBTUVfVVVJRCA9IFwiNWM5YjEyYzMtOWZkMS00NDcyLWI2MzMtZDMxZDdjZTI5YmYyXCI7XHJcbmNvbnN0IFRSRUVfR1JFRU5fTEFSR0VfRlJBTUVfVVVJRCA9IFwiOGQzZjJlZGItZTI3Yi00MDI5LWFmNjktNmMwYmI1NGEwNTZkXCI7XHJcbmNvbnN0IEtJTExfVEVTVF9WSUNUSU1fTkFNRVMgPSBbXCLnlr7po47lj7dcIiwgXCLpu5HomY7mnLpcIiwgXCLpkqLniZnngq7miYtcIiwgXCLotaTnhLDmiJjovaZcIiwgXCLph43plKTlnablhYtcIl07XHJcbmNvbnN0IEtJTExfQkFER0VfRlJBTUVfVVVJRFMgPSB7XHJcbiAgICAxOiBcIjkxYjZlZjIzLTE5ZjMtNGQ3NS05ZTRjLTRlZTI0NmVlZTZmN1wiLFxyXG4gICAgMjogXCI1OGE2NjZiNy1hZThkLTQ2MjItODJjMy0wM2Q4OWI3NjYyN2JcIixcclxuICAgIDM6IFwiZTk1NzU2OGMtMjlhMC00ZTg5LTg0ZDUtMzhjZDAyNDk2NTM3XCIsXHJcbiAgICA0OiBcImVmZjRkZTU5LTU2ZDEtNGRlZC1hMDViLTBmYmU4YzgxYWRmZlwiLFxyXG4gICAgNTogXCJmYmRkMzUxZi0zZDk2LTQ4MjMtOWU0YS1lYTIxMzA4NWY5YjdcIlxyXG59O1xyXG5jb25zdCBLSUxMX0JBREdFX1RJTlRTID0ge1xyXG4gICAgMTogWzI1NSwgMjU1LCAyNTVdLFxyXG4gICAgMjogWzIwNSwgMTI3LCA1MF0sXHJcbiAgICAzOiBbMjIwLCAyMzIsIDI0Ml0sXHJcbiAgICA0OiBbMjU1LCAyMTUsIDBdLFxyXG4gICAgNTogWzE4NiwgMTAyLCAyNTVdXHJcbn07XHJcblxyXG4vL+engeacieWHveaVsCzor7fkvb/nlKgnXyflvIDlpLRcclxuLy/or7fkv67mlLknTmV3Q2xhc3MnID0+IOiHquW3seeahOexu+WQjVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgR2FtZU1hcCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0cmVlMDFQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0cmVlMDJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG1vdW50YWluMDFQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBtb3VudGFpbjAyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbW91bnRhaW4wM1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBlbmVteVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgcGxheWVyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBza2lsbFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBlbmVyZ3lQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/lhoXpg6jlj5jph49cclxuICAgIF90aWxlZE1hcCAgID0gbnVsbDsgICAgIC8vVGlsZWQgTWFwXHJcbiAgICBfdG1Hcm91cCAgICA9IG51bGw7ICAgICAvL+aZrumAmuWxglxyXG4gICAgX3RtT2JqICAgICAgPSBudWxsOyAgICAgLy/lr7nosaHlsYIo6Zqc56KN54mpKVxyXG4gICAgX3RtQm9ybiAgICAgPSBudWxsOyAgICAgLy/lr7nosaHlsYIo5Ye655Sf54K5KVxyXG4gICAgX3RtRGVjYWwgICAgPSBudWxsOyAgICAgLy/lnLDooajotLToirHlsYIo5Zyw5Zu+5LiO5Z2m5YWL5LmL6Ze0KVxyXG4gICAgX3RtU2l6ZSAgICAgPSBudWxsOyAgICAgLy/lnLDlm77lsLrlr7hcclxuICAgIF90aWxlU2l6ZSAgID0gbnVsbDsgICAgIC8v55Om54mH5bC65a+4XHJcblxyXG4gICAgX2NvbGxpZGVycyAgPSBbXTsgICAgICAgLy/norDmkp7mo4DmtYvliJfooahcclxuICAgIF9jaGVja0xpc3QgID0ge307ICAgICAgIC8vQSrmo4DmtYvliJfooahcclxuICAgIF9sb2dpY0FyZWEgID0gW107ICAgICAgIC8v6YC76L6R56Kw5pKe5YiG5Yy6XHJcblxyXG4gICAgX3BsYXllciAgICAgICAgICAgICA9IG51bGw7ICAgICAvL+eOqeWutlxyXG4gICAgX2VuZW15cyAgICAgICAgICAgICA9IFtdOyAgICAgICAvL+aVjOS6uuWIl+ihqFxyXG4gICAgX3BsYXllckJvcm5Qb3MgICAgICA9IG51bGw7ICAgICAvL3BsYXllcuWHuueUn+eCuVxyXG4gICAgX2VuZW15Qm9yblBvcyAgICAgICA9IFtdOyAgICAgICAvL+aVjOS6uuWHuueUn+eCueWIl+ihqFxyXG4gICAgX2Jvcm5DZFRpbWUgICAgICAgICA9IDA7ICAgICAgICAvL+aVjOS6uueUn+aIkOmXtOmalOaXtumXtFxyXG4gICAgX2Jvcm5FbmVteUNvdW50ICAgICA9IDA7ICAgICAgICAvL+W3sue7j+WHuueUn+eahOaVjOS6uuaVsOmHj1xyXG4gICAgX2RlYXRoRW5lbXlDb3VudCAgICA9IDA7ICAgICAgICAvL+W3sue7j+atu+S6oeeahOaVjOS6uuaVsOmHj1xyXG4gICAgX21heEVuZW15Q291bnQgICAgICA9IDA7ICAgICAgICAvL+acgOWkp+aVjOS6uuaVsOmHj1xyXG4gICAgX3RpbWVNYXhFbmVteUNvdW50ICA9IDA7ICAgICAgICAvL+WQjOWxj+acgOWkp+aVjOS6uuaVsOmHj1xyXG4gICAgX3NraWxscyAgICAgICAgICAgICA9IFtdOyAgICAgICAvL+maj+acuueUn+aIkOeahOaKgOiDvVxyXG4gICAgX2VuZXJneXMgICAgICAgICAgICA9IFtdOyAgICAgICAvL+WcsOWbvuS4iueahOiDvemHj1xyXG4gICAgX2VuZXJneUNkVGltZSAgICAgICA9IDA7ICAgICAgICAvL+iDvemHj+eUn+aIkOmXtOmalOaXtumXtFxyXG5cclxuICAgIF9wYXVzZSAgICAgICAgICA9IGZhbHNlOyAgICAvL+aYr+WQpuWkhOS6juaaguWBnOeKtuaAgVxyXG4gICAgX2dhbWluZyAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5aSE5LqO5ri45oiP5LitIFxyXG4gICAgX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlOyAvL+WHu+adgOaViOaenOa1i+ivleaooeW8j1xyXG4gICAgX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlOyAvL+WHu+adgOW5v+aSrea1i+ivleaooeW8j1xyXG4gICAgX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7IC8v5Y+X5Ye75rWL6K+V5qih5byPXHJcbiAgICBfdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7IC8v5Y2H57qn5rWL6K+V5qih5byPXHJcbiAgICBfc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlOyAvL+WtkOW8ueWwhOWHu+a1i+ivleaooeW8j1xyXG4gICAgX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7IC8v5Lyg6YCB6Zeo5rWL6K+V5qih5byPXHJcbiAgICBfY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTsgLy/nprvlv4PlipvlnIjmtYvor5XmqKHlvI9cclxuICAgIF9jb3ZlclRlc3RNb2RlID0gZmFsc2U7IC8v5o6p5L2T5rWL6K+V5qih5byPXHJcbiAgICBfZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTsgLy/og73ph4/om4vmlLbol4/mtYvor5XmqKHlvI9cclxuICAgIF9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlOyAvL+S8pOWus+e/u+WAjeWMuuWfn+a1i+ivleaooeW8j1xyXG4gICAgX2RhbWFnZURvdWJsZUFyZWFEYXRhID0gbnVsbDtcclxuICAgIF9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7IC8v6YCf5bqm57+75YCN5Yy65Z+f5rWL6K+V5qih5byPXHJcbiAgICBfc3BlZWREb3VibGVBcmVhRGF0YSA9IG51bGw7XHJcbiAgICBfc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTsgLy/lrZDlvLnmianmlaPljLrln5/mtYvor5XmqKHlvI9cclxuICAgIF9zcHJlYWRCdWxsZXRBcmVhRGF0YSA9IG51bGw7XHJcbiAgICBfYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlOyAvL+WtkOW8ueWPjeW8uemanOeijea1i+ivleaooeW8j1xyXG4gICAgX2JvdW5jZU9ic3RhY2xlcyA9IFtdO1xyXG4gICAgX2xldmVsSWQgICAgICAgID0gMTsgICAgICAgIC8v5b2T5YmN5YWz5Y2haWRcclxuICAgIF9sZXZlbENvbmZpZyAgICA9IG51bGw7ICAgICAvL+W9k+WJjeWFs+WNoemFjee9rlxyXG5cclxuICAgIF9yb2FtRmxnICAgICAgICA9IGZhbHNlOyAgICAgICAgICAvL+a8q+a4uOagh+iusFxyXG4gICAgX3JvYW1EaXIgICAgICAgID0gY2MudjIoMSwwKTsgICAgIC8v5ryr5ri45pa55ZCRXHJcblxyXG4gICAgX3BsYXllckxhc3RQb3MgID0gMDtcclxuICAgIF9yaXBwbGVEaXN0b3J0aW9uRWZmZWN0ID0gbnVsbDtcclxuICAgIF9yaXBwbGVDYXB0dXJlQ2FtZXJhID0gbnVsbDtcclxuICAgIF9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSA9IG51bGw7XHJcbiAgICBfa2lsbEJyb2FkY2FzdExheWVyID0gbnVsbDtcclxuICAgIF9raWxsQnJvYWRjYXN0RW50cmllcyA9IFtdO1xyXG4gICAgX2tpbGxCYWRnZUxheWVyID0gbnVsbDtcclxuICAgIF9raWxsQmFkZ2VBY3RpdmVOb2RlID0gbnVsbDtcclxuICAgIF9raWxsQmFkZ2VGcmFtZXMgPSB7fTtcclxuICAgIF9raWxsQmFkZ2VMb2FkaW5nID0ge307XHJcbiAgICBfa2lsbFN0cmVha0NvdW50ID0gMDtcclxuICAgIF9raWxsU3RyZWFrUmVtYWluID0gMDtcclxuICAgIF9wb3J0YWxQYWlycyA9IFtdO1xyXG4gICAgX2NlbnRyaWZ1Z2FsUmluZ0RhdGEgPSBudWxsO1xyXG4gICAgX29pbFNwaWxscyA9IFtdO1xyXG4gICAgX29pbFNwaWxsRnJhbWUgPSBudWxsO1xyXG4gICAgX29pbFNwaWxsRnJhbWVMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBfb2lsU3BpbGxGcmFtZUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgX2NvdmVyVGVzdENvdmVycyA9IFtdO1xyXG4gICAgX2NvdmVyVGVzdEZyYW1lID0gbnVsbDtcclxuICAgIF9jb3ZlclRlc3RGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgIF9jb3ZlclRlc3RGcmFtZUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgX2NvdmVyVGVzdEVuZW15ID0gbnVsbDtcclxuICAgIF9lbmVyZ3lFZ2dGcmFtZSA9IG51bGw7XHJcbiAgICBfZW5lcmd5RWdnRnJhbWVMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBfZW5lcmd5RWdnRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgIF9lbmVyZ3lFZ2dCdXNoRnJhbWUgPSBudWxsO1xyXG4gICAgX2VuZXJneUVnZ0J1c2hGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgIF9lbmVyZ3lFZ2dCdXNoRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgIF9lbmVyZ3lFZ2dzID0gW107XHJcbiAgICBfZW5lcmd5RWdnQnVzaGVzID0gW107XHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/lvIDlkK/norDmkp7nm5HlkKxcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIC8v5byA5ZCv57uY5Yi256Kw5pKe57uE5Lu255qE5b2i54q2XHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gLy8g5pi+56S656Kw5pKe57uE5Lu255qE5YyF5Zu055uSXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREcmF3Qm91bmRpbmdCb3ggPSB0cnVlO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo6Zqc56KN54mpKVxyXG4gICAgICAgIHRoaXMuX2luaXRUbU9ic3RhY2xlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOWHuueUn+eCuSlcclxuICAgICAgICB0aGlzLl9pbml0VG1Cb3JuKCk7XHJcbiAgICAgICAgdGhpcy5fcHJlbG9hZFJpcHBsZURpc3RvcnRpb25FZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkS2lsbEJyb2FkY2FzdEJhZGdlRnJhbWVzKCk7XHJcbiAgICAgICAgdGhpcy5fcHJlbG9hZE9pbFNwaWxsRnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkQ292ZXJUZXN0RnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkRW5lcmd5RWdnRnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9wcmVsb2FkRW5lcmd5RWdnQnVzaEZyYW1lKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9kZXN0cm95UmlwcGxlQ2FwdHVyZVJlc291cmNlcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWxsQnJvYWRjYXN0VWkoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lsbEJhZGdlVWkoKTtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl90aWxlZE1hcCA9IHRoaXMubm9kZVtcIiRUaWxlZE1hcFwiXTtcclxuICAgICAgICB0aGlzLl90bUdyb3VwID0gdGhpcy5fZmlyZS5fdG1MYXllckdyb3VwLiRUaWxlZExheWVyO1xyXG4gICAgICAgIC8vIHRoaXMuX2ZpcmUuX3RtTGF5ZXJHcm91cC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90bU9iaiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS4kVGlsZWRPYmplY3RHcm91cDtcclxuICAgICAgICB0aGlzLl90bUJvcm4gPSB0aGlzLl9maXJlLl90bUxheWVyQm9ybi4kVGlsZWRPYmplY3RHcm91cDtcclxuICAgICAgICB0aGlzLl90bURlY2FsID0gdGhpcy5fZW5zdXJlRGVjYWxMYXllcigpO1xyXG4gICAgICAgIHRoaXMuX3RtU2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuX3RtU2l6ZSA9IG5ldyBjYy5TaXplKHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS53aWR0aCAqIHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCkud2lkdGgsIHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQgKiB0aGlzLl90aWxlZE1hcC5nZXRUaWxlU2l6ZSgpLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fdGlsZVNpemUgPSB0aGlzLl90aWxlZE1hcC5nZXRUaWxlU2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9lbnN1cmVEZWNhbExheWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl90bUxheWVyRGVjYWwgJiYgY2MuaXNWYWxpZCh0aGlzLl9maXJlLl90bUxheWVyRGVjYWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maXJlLl90bUxheWVyRGVjYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgY2MuTm9kZShcIl90bUxheWVyRGVjYWxcIik7XHJcbiAgICAgICAgbGF5ZXIucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICBsYXllci5zZXRBbmNob3JQb2ludCgwLjUsIDAuNSk7XHJcbiAgICAgICAgbGF5ZXIuc2V0UG9zaXRpb24oMCwgMCk7XHJcblxyXG4gICAgICAgIGxldCBvYnN0YWNsZUluZGV4ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlID8gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmdldFNpYmxpbmdJbmRleCgpIDogdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgbGF5ZXIuc2V0U2libGluZ0luZGV4KE1hdGgubWF4KDAsIG9ic3RhY2xlSW5kZXgpKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90bUxheWVyRGVjYWwgPSBsYXllcjtcclxuICAgICAgICByZXR1cm4gbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOmanOeijeeJqSlcclxuICAgIF9pbml0VG1PYnN0YWNsZSgpe1xyXG4gICAgICAgIGxldCBfc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtT2JqLmdldE9iamVjdHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9iamVjdHMxMVwiLG9iamVjdHMpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/ojrflj5bkvY3nva5cclxuICAgICAgICAgICAgbGV0IHRpbGVkUG9zID0gY2MudjIob2JqLm9mZnNldC54ICsgb2JqLndpZHRoLzIsIG9iai5vZmZzZXQueSArIG9iai5oZWlnaHQvMik7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLl90aWxlUG9zVG9HYW1lUG9zKHRpbGVkUG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoubmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDFQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDJQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJtb3VudGFpbjAxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnN0YWNsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW91bnRhaW4wMVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoubmFtZSA9PSBcIm1vdW50YWluMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb3VudGFpbjAyUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai5uYW1lID09IFwibW91bnRhaW4wM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vdW50YWluMDNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wb3NpdGlvbiA9IGNjLnYzKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG9mZnNldC55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoucG9seWxpbmVQb2ludHMubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBvYmoucG9seWxpbmVQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gb2JqLnBvbHlsaW5lUG9pbnRzW2orMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5Yib5bu6Y29sbGlkZXIgbGluZVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIudGFnID0gb2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMF0gPSBjYy52MihzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMV0gPSBjYy52MihlbmQpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzLnNwbGljZSgyLDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sbGlkZXJzLnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrKysrKysrKysrKytfaW5pdFRtT2JzdGFjbGUgdGltZTEgXCIsY29zdCk7XHJcbiAgICAgICAgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGxldCBsb2dpY1dpZHRoID0gdGhpcy5fdG1TaXplLndpZHRoLzQ7XHJcbiAgICAgICAgbGV0IGxvZ2ljSGVpZ2h0ID0gdGhpcy5fdG1TaXplLmhlaWdodC80O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgNDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNjsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhOmFueSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgYXJlYS54ID0geCpsb2dpY1dpZHRoLXRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgYXJlYS55ID0geSpsb2dpY0hlaWdodC10aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgICAgICBhcmVhLndpZHRoID0gbG9naWNXaWR0aDtcclxuICAgICAgICAgICAgICAgIGFyZWEuaGVpZ2h0ID0gbG9naWNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBuZXcgY2MuUmVjdChhcmVhLngtMTAsYXJlYS55LTEwLGxvZ2ljV2lkdGgrMjAsbG9naWNIZWlnaHQrMjApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVJblJlY3QoQSxCLHJlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEucHVzaCh7QTpBLEI6Qn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2ljQXJlYS5wdXNoKGFyZWEpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGNvc3QgPSBfZW5kVGltZSAtIF9zdGFydFRpbWU7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiKysrKysrKysrKysrX2luaXRUbU9ic3RhY2xlIHRpbWUyIFwiLGNvc3QpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo5Ye655Sf54K5KVxyXG4gICAgX2luaXRUbUJvcm4oKXtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtQm9ybi5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhvYmoub2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKG9iai5uYW1lID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckJvcm5Qb3MgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gY2MudjModGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlCb3JuUG9zLnB1c2gocG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDUsIHRpbGUpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMaXN0ID0gdGhpcy5pbml0Q2hlY2tMaXN0KCk7XHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrY29zdCB0aW1lIFwiLGNvc3QpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eUn+aIkHBsYXllclxyXG4gICAgY3JlYXRlUGxheWVyKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJUeXBlID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2N1cnJlbnRfcGxheWVyX3R5cGVfXCIsMSk7XHJcbiAgICAgICAgbGV0IHBsYXllckxldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfcGxheWVyXyR7cGxheWVyVHlwZX1fYCwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiKTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wb3NpdGlvbiA9IHRoaXMuX3BsYXllckJvcm5Qb3M7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRQbGF5ZXJUeXBlKHBsYXllclR5cGUscGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGNyZWF0ZUVuZW15KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+maj+acuueyvuiLseaAqlxyXG4gICAgICAgIGxldCBlbWVteVR5cGUgPSAxMTtcclxuICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5yYW5kb20oKSoxMDA7XHJcbiAgICAgICAgaWYgKHJhbmRvbSA8IDQpIHsgZW1lbXlUeXBlID0gMTI7IH1cclxuICAgICAgICBpZiAocmFuZG9tIDwgMSkgIHsgZW1lbXlUeXBlID0gMTM7IH1cclxuXHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gdGhpcy5fZW5lbXlCb3JuUG9zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLl9lbmVteUJvcm5Qb3MubGVuZ3RoKV07XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZShlbWVteVR5cGUsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5Y+X5Ye75rWL6K+V5pWM5Lq6XHJcbiAgICBjcmVhdGVQbGF5ZXJIaXRUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDIzMCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQXR0YWNrUmFkaXVzID0gNTIwO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lID0gMC40NTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmrovooYDmtYvor5XmlYzkurpcclxuICAgIGNyZWF0ZUtpbGxFZmZlY3RUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDI2MCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDE7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUtpbGxCcm9hZGNhc3RUZXN0RW5lbWllcygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDU7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDI2MDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSAqIDIgKiBpIC8gY291bnQgLSBNYXRoLlBJICogMC41O1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzLCBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXMpKTtcclxuICAgICAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSAxO1xyXG4gICAgICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVuZW15W1wiX2tpbGxWaWN0aW1OYW1lXCJdID0gS0lMTF9URVNUX1ZJQ1RJTV9OQU1FU1tpXSB8fCAoXCLmlYzmlrlcIiArIChpICsgMSkgKyBcIuWPt1wiKTtcclxuICAgICAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quaui+ihgOeKtuaAgeWxleekuuaVjOS6ulxyXG4gICAgY3JlYXRlTG93SHBUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDI2MCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQXR0YWNrUmFkaXVzID0gOTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5CdWxsZXRDb2RlVGltZSA9IDEuMjtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoZW5lbXkuc2NyaXB0Ll9tYXhIcCAqIDAuMTgpKTtcclxuICAgICAgICBpZiAoZW5lbXkuc2NyaXB0Ll9ocCA+PSBlbmVteS5zY3JpcHQuX21heEhwKSB7XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSBNYXRoLm1heCgxLCBlbmVteS5zY3JpcHQuX21heEhwIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZW15LnNjcmlwdC5yZWZyZXNoSHAoKTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quWwhOWHu+eJueaViOa1i+ivleacqOahqVxyXG4gICAgY3JlYXRlU2hvb3RFZmZlY3RUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDMyMCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgZW5lbXkuc2NyaXB0Ll9jb25maWcpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUG9ydGFsVGVzdEVuZW15KHBvcykge1xyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVteS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgOTApKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKDExLCB0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gMTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gMTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyUG9ydGFsVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFBhaXJzID0gW107XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT0gXCJfcG9ydGFsR2F0ZUFcIlxyXG4gICAgICAgICAgICAgICAgfHwgY2hpbGQubmFtZSA9PSBcIl9wb3J0YWxHYXRlQlwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX3BvcnRhbExpbmtGeFwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX3BvcnRhbEhpbnRMYWJlbFwiXHJcbiAgICAgICAgICAgICAgICB8fCBjaGlsZC5uYW1lID09IFwiX3BvcnRhbFdhcnBGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVBvcnRhbEdhdGUobmFtZSwgcG9zLCBjb2xvciwgbGFiZWxUZXh0KSB7XHJcbiAgICAgICAgbGV0IGdhdGUgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBnYXRlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBnYXRlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGdhdGUuekluZGV4ID0gNTYwMDtcclxuXHJcbiAgICAgICAgbGV0IHJpbmcgPSBnYXRlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgcmluZy5saW5lV2lkdGggPSA4O1xyXG4gICAgICAgIHJpbmcuc3Ryb2tlQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICByaW5nLmNpcmNsZSgwLCAwLCA0Mik7XHJcbiAgICAgICAgcmluZy5zdHJva2UoKTtcclxuICAgICAgICByaW5nLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgcmluZy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDE4MCk7XHJcbiAgICAgICAgcmluZy5jaXJjbGUoMCwgMCwgMjYpO1xyXG4gICAgICAgIHJpbmcuc3Ryb2tlKCk7XHJcbiAgICAgICAgcmluZy5maWxsQ29sb3IgPSBjYy5jb2xvcihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCAzNCk7XHJcbiAgICAgICAgcmluZy5jaXJjbGUoMCwgMCwgMzYpO1xyXG4gICAgICAgIHJpbmcuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3BvcnRhbEdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSBnYXRlO1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIDcyKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDU0KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE0MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44ODtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMS4wOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMjI1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMC44OCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMTEwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfcG9ydGFsTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGdhdGU7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg4MCwgNDgpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IGxhYmVsVGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI4O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAzMjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVBvcnRhbEhpbnRMYWJlbChwb3MpIHtcclxuICAgICAgICBsZXQgaGludCA9IG5ldyBjYy5Ob2RlKFwiX3BvcnRhbEhpbnRMYWJlbFwiKTtcclxuICAgICAgICBoaW50LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBoaW50LnNldFBvc2l0aW9uKGNjLnYzKHBvcy54LCBwb3MueSArIDc0LCAwKSk7XHJcbiAgICAgICAgaGludC56SW5kZXggPSA1NjA1O1xyXG4gICAgICAgIGhpbnQub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjMwLCAyNDUsIDI1NSwgMjU1KTtcclxuICAgICAgICBoaW50LnNldENvbnRlbnRTaXplKDMyMCwgMzQpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuWQkSBBIOmXqOW8gOeBq++8jOWtkOW8ueS8muS7jiBCIOmXqOepv+WHulwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBoaW50O1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVQb3J0YWxMaW5rRngoZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBsZXQgZnggPSBuZXcgY2MuTm9kZShcIl9wb3J0YWxMaW5rRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU0MDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGZ4LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDExMCwgMjU1LCAyNDUsIDEyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubW92ZVRvKGZyb21Qb3MueCwgZnJvbVBvcy55KTtcclxuICAgICAgICBncmFwaGljcy5saW5lVG8odG9Qb3MueCwgdG9Qb3MueSk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDEyMDtcclxuICAgICAgICBmeC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZVRvKDAuMzUsIDIxMCksXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbygwLjM1LCA5MClcclxuICAgICAgICApKSk7XHJcbiAgICAgICAgcmV0dXJuIGZ4O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBvcnRhbFRlc3RTZXR1cCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NsZWFyUG9ydGFsVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBlbnRyeVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMjIwLCAwKSksIDkwKTtcclxuICAgICAgICBsZXQgZXhpdFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoLTE0MCwgMTgwKSksIDkwKTtcclxuICAgICAgICBsZXQgZW5lbXlQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihleGl0UG9zLmFkZChjYy52MigyODAsIDApKSwgOTApO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVQb3J0YWxHYXRlKFwiX3BvcnRhbEdhdGVBXCIsIGVudHJ5UG9zLCBjYy5jb2xvcig5MCwgMjE1LCAyNTUsIDI1NSksIFwiQVwiKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVQb3J0YWxHYXRlKFwiX3BvcnRhbEdhdGVCXCIsIGV4aXRQb3MsIGNjLmNvbG9yKDI1NSwgMTIwLCAyMjAsIDI1NSksIFwiQlwiKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVQb3J0YWxMaW5rRngoZW50cnlQb3MsIGV4aXRQb3MpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvcnRhbEhpbnRMYWJlbChlbnRyeVBvcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQb3J0YWxUZXN0RW5lbXkoZW5lbXlQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9wb3J0YWxQYWlycy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IFwicG9ydGFsQVwiLFxyXG4gICAgICAgICAgICBwb3M6IGVudHJ5UG9zLFxyXG4gICAgICAgICAgICByYWRpdXM6IDQ0LFxyXG4gICAgICAgICAgICBleGl0SWQ6IFwicG9ydGFsQlwiLFxyXG4gICAgICAgICAgICBleGl0UG9zOiBleGl0UG9zXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsUGFpcnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBcInBvcnRhbEJcIixcclxuICAgICAgICAgICAgcG9zOiBleGl0UG9zLFxyXG4gICAgICAgICAgICByYWRpdXM6IDQ0LFxyXG4gICAgICAgICAgICBleGl0SWQ6IFwicG9ydGFsQVwiLFxyXG4gICAgICAgICAgICBleGl0UG9zOiBlbnRyeVBvc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3blBvcnRhbFdhcnBGeChwb3MsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfcG9ydGFsV2FycEZ4XCIpO1xyXG4gICAgICAgIGZ4LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBmeC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBmeC56SW5kZXggPSA1NzAwO1xyXG4gICAgICAgIGZ4Lm9wYWNpdHkgPSAyMjA7XHJcbiAgICAgICAgZnguc2NhbGUgPSAwLjM1O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjYpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNCk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTYsIDEuNyksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckNlbnRyaWZ1Z2FsUmluZ1Rlc3ROb2RlcygpIHtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9jZW50cmlmdWdhbFJpbmdcIlxyXG4gICAgICAgICAgICAgICAgfHwgY2hpbGQubmFtZSA9PSBcIl9jZW50cmlmdWdhbFJpbmdIaW50XCJcclxuICAgICAgICAgICAgICAgIHx8IGNoaWxkLm5hbWUgPT0gXCJfY2VudHJpZnVnYWxSaW5nR3VpZGVcIlxyXG4gICAgICAgICAgICAgICAgfHwgY2hpbGQubmFtZSA9PSBcIl9jZW50cmlmdWdhbFJpbmdGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ05vZGUocG9zLCByYWRpdXMsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHJpbmcgPSBuZXcgY2MuTm9kZShcIl9jZW50cmlmdWdhbFJpbmdcIik7XHJcbiAgICAgICAgcmluZy5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcmluZy5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICByaW5nLnpJbmRleCA9IDU2NTA7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfcmluZ0dsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSByaW5nO1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIDQwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyArIDI2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDE2MDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC44NDtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMS4wNiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMjIwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC40NSwgMC44NCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC40NSwgMTIwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSByaW5nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI0NiwgMjIwLCAxODApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSAxNSk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgMjQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSA2KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmMgPSBuZXcgY2MuTm9kZShcIl9yaW5nQXJjXCIgKyBpKTtcclxuICAgICAgICAgICAgYXJjLnBhcmVudCA9IHJpbmc7XHJcbiAgICAgICAgICAgIGFyYy5hbmdsZSA9IGkgKiAxMjA7XHJcbiAgICAgICAgICAgIGxldCBhcmNHcmFwaGljcyA9IGFyYy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljcy5saW5lV2lkdGggPSA2O1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgICAgIGFyY0dyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMgKyA2LCAtTWF0aC5QSSAqIDAuMiwgTWF0aC5QSSAqIDAuMzIsIGZhbHNlKTtcclxuICAgICAgICAgICAgYXJjR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJpbmcucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMS4yLCAtMTgwKSkpO1xyXG4gICAgICAgIHJldHVybiByaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVDZW50cmlmdWdhbFJpbmdHdWlkZShmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGxldCBndWlkZSA9IG5ldyBjYy5Ob2RlKFwiX2NlbnRyaWZ1Z2FsUmluZ0d1aWRlXCIpO1xyXG4gICAgICAgIGd1aWRlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBndWlkZS56SW5kZXggPSA1NTAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBndWlkZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDE4NCwgMTEyLCAxMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLm1vdmVUbyhmcm9tUG9zLngsIGZyb21Qb3MueSk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVRvKHRvUG9zLngsIHRvUG9zLnkpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGd1aWRlLm9wYWNpdHkgPSAxMjA7XHJcbiAgICAgICAgZ3VpZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbygwLjMsIDIxMCksXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbygwLjMsIDkwKVxyXG4gICAgICAgICkpKTtcclxuICAgICAgICByZXR1cm4gZ3VpZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ0hpbnQocG9zKSB7XHJcbiAgICAgICAgbGV0IGhpbnQgPSBuZXcgY2MuTm9kZShcIl9jZW50cmlmdWdhbFJpbmdIaW50XCIpO1xyXG4gICAgICAgIGhpbnQucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGhpbnQuc2V0UG9zaXRpb24oY2MudjMocG9zLngsIHBvcy55ICsgMTAwLCAwKSk7XHJcbiAgICAgICAgaGludC56SW5kZXggPSA1NjYwO1xyXG4gICAgICAgIGhpbnQub3BhY2l0eSA9IDIyNTtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjU1LCAyMzUsIDIwNSwgMjU1KTtcclxuICAgICAgICBoaW50LnNldENvbnRlbnRTaXplKDQyMCwgNTgpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuebtOe6v+WwhOWFpeemu+W/g+WKm+WciO+8jOWtkOW8ueS8mue7leWciOWKoOmAn+WQjueUqeWHulwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI4O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBoaW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNlbnRyaWZ1Z2FsUmluZ1Rlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2VudHJpZnVnYWxSaW5nVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJDZW50cmlmdWdhbFJpbmdUZXN0Tm9kZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMjIwLCAwKSksIDEyMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDgyO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNlbnRlci5hZGQoY2MudjIoMzEwLCA5MikpLCAxMDApO1xyXG4gICAgICAgIGxldCBjb2xvciA9IGNjLmNvbG9yKDI1NSwgMTcwLCA5NiwgMjU1KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2VudHJpZnVnYWxSaW5nTm9kZShjZW50ZXIsIHJhZGl1cywgY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUNlbnRyaWZ1Z2FsUmluZ0d1aWRlKHBsYXllclBvcywgY2VudGVyKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVDZW50cmlmdWdhbFJpbmdIaW50KGNlbnRlcik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDZW50cmlmdWdhbFJpbmdUZXN0RW5lbXkoZW5lbXlQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdEYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogXCJjZW50cmlmdWdhbEFcIixcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIHRyaWdnZXJSYWRpdXM6IHJhZGl1cyAtIDEwLFxyXG4gICAgICAgICAgICBvcmJpdFJhZGl1czogcmFkaXVzICsgMixcclxuICAgICAgICAgICAgcm90YXRlQW5nbGU6IE1hdGguUEkgKiAwLjUyLFxyXG4gICAgICAgICAgICBhbmd1bGFyU3BlZWQ6IE1hdGguUEkgKiA1LjIsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvblNpZ246IC0xLFxyXG4gICAgICAgICAgICBzcGVlZEJvb3N0OiAxLjk1LFxyXG4gICAgICAgICAgICBkYW1hZ2VCb29zdDogMS44LFxyXG4gICAgICAgICAgICByYWRpdXNFeHBhbmQ6IDI0LFxyXG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KHBvcywgaXNSZWxlYXNlID0gZmFsc2UsIGNvbG9yID0gbnVsbCwgZGlyID0gbnVsbCwgc3BlZWQgPSAwKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfY2VudHJpZnVnYWxSaW5nRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU2OTA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBmeC5zY2FsZSA9IGlzUmVsZWFzZSA/IDAuNDUgOiAwLjMyO1xyXG5cclxuICAgICAgICBsZXQgZWZmZWN0Q29sb3IgPSBjb2xvciB8fCBjYy5jb2xvcigyNTUsIDE3MCwgOTYsIDI1NSk7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSBpc1JlbGVhc2UgPyA3IDogNTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGVmZmVjdENvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCBpc1JlbGVhc2UgPyAyNiA6IDE4KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjEwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgaXNSZWxlYXNlID8gMTIgOiA4KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzUmVsZWFzZSAmJiBkaXIgJiYgZGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdGFpbCA9IG5ldyBjYy5Ob2RlKFwiX2NlbnRyaWZ1Z2FsUmluZ0Z4VGFpbFwiKTtcclxuICAgICAgICAgICAgdGFpbC5wYXJlbnQgPSBmeDtcclxuICAgICAgICAgICAgdGFpbC5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3MoZGlyKSAtIDkwO1xyXG4gICAgICAgICAgICBsZXQgdGFpbEdyYXBoaWNzID0gdGFpbC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoZWZmZWN0Q29sb3IuciwgZWZmZWN0Q29sb3IuZywgZWZmZWN0Q29sb3IuYiwgMTYwKTtcclxuICAgICAgICAgICAgdGFpbEdyYXBoaWNzLm1vdmVUbygwLCAzNCArIE1hdGgubWluKDI4LCBzcGVlZCAqIDAuNikpO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MubGluZVRvKC0xMCwgOCk7XHJcbiAgICAgICAgICAgIHRhaWxHcmFwaGljcy5saW5lVG8oMTAsIDgpO1xyXG4gICAgICAgICAgICB0YWlsR3JhcGhpY3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGFpbEdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGlzUmVsZWFzZSA/IDAuMTggOiAwLjEyLCBpc1JlbGVhc2UgPyAxLjggOiAxLjM1KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoaXNSZWxlYXNlID8gMC4xOCA6IDAuMTIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckRhbWFnZURvdWJsZVRlc3ROb2RlcygpIHtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVBcmVhRGF0YSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT0gXCJfZGFtYWdlRG91YmxlQXJlYVwiIHx8IGNoaWxkLm5hbWUgPT0gXCJfZGFtYWdlRG91YmxlRnhcIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEYW1hZ2VEb3VibGVBcmVhTm9kZShwb3MsIHJhZGl1cywgY29sb3IpIHtcclxuICAgICAgICBsZXQgYXJlYSA9IG5ldyBjYy5Ob2RlKFwiX2RhbWFnZURvdWJsZUFyZWFcIik7XHJcbiAgICAgICAgYXJlYS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgYXJlYS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBhcmVhLnpJbmRleCA9IDU2NTA7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAwLCAwLCAzNSk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgKyAyMCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAxNjA7XHJcbiAgICAgICAgZ2xvdy5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMS4wOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAyMjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjUsIDAuODUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwgMTIwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBhcmVhLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMzAsIDMwLCAyNTUpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMCwgMCwgMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSA0KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lclJpbmcgPSBuZXcgY2MuTm9kZShcIl9kYW1hZ2VEb3VibGVJbm5lclJpbmdcIik7XHJcbiAgICAgICAgaW5uZXJSaW5nLnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBpbm5lclJpbmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMTAwLCAxMDAsIDE1MCk7XHJcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gMjQ7XHJcbiAgICAgICAgbGV0IGRhc2hMZW4gPSBNYXRoLlBJICogMiAvIHNlZ21lbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHM7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IGkgKiBkYXNoTGVuO1xyXG4gICAgICAgICAgICBsZXQgZW5kQW5nbGUgPSAoaSArIDEpICogZGFzaExlbjtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzIC0gMTIsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlubmVyUmluZy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgyLjAsIDkwKSkpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDE0MCwgNDgpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCA2MCwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIngyXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlSGludFwiKTtcclxuICAgICAgICBoaW50LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgaGludC5zZXRQb3NpdGlvbihjYy52MigwLCByYWRpdXMgKyAzNikpO1xyXG4gICAgICAgIGhpbnQuc2V0Q29udGVudFNpemUoMzAwLCA0MCk7XHJcbiAgICAgICAgaGludC5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjIwLCAyMjAsIDIyMCk7XHJcbiAgICAgICAgbGV0IGhpbnRMYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBoaW50TGFiZWwuc3RyaW5nID0gXCLlrZDlvLnnqb/ov4cg5Lyk5a6zeDIg5L2T56ev5aKe5aSnXCI7XHJcbiAgICAgICAgaGludExhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgaGludExhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBoaW50TGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBoaW50TGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICByZXR1cm4gYXJlYTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEYW1hZ2VEb3VibGVUZXN0RW5lbXkocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURhbWFnZURvdWJsZVRlc3RTZXR1cCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NsZWFyRGFtYWdlRG91YmxlVGVzdE5vZGVzKCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDIyMCwgMCkpLCAxMDApO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSA2MDtcclxuICAgICAgICBsZXQgY29sb3IgPSBjYy5jb2xvcigyNTUsIDQwLCA0MCwgMjU1KTtcclxuICAgICAgICBsZXQgZW5lbXlQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihjZW50ZXIuYWRkKGNjLnYyKHJhZGl1cyArIDQwLCAwKSksIDkwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlRGFtYWdlRG91YmxlQXJlYU5vZGUoY2VudGVyLCByYWRpdXMsIGNvbG9yKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZURhbWFnZURvdWJsZVRlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgICAgIGRhbWFnZU11bHRpcGxpZXI6IDIsXHJcbiAgICAgICAgICAgIHNjYWxlTXVsdGlwbGllcjogMS41LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJEYW1hZ2VEb3VibGVBcmVhKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2RhbWFnZURvdWJsZVRlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1bGxldC5oYXNVc2VkRGFtYWdlRG91YmxlQXJlYSAmJiBidWxsZXQuaGFzVXNlZERhbWFnZURvdWJsZUFyZWEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXJlYSA9IHRoaXMuX2RhbWFnZURvdWJsZUFyZWFEYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kaXN0YW5jZVBvaW50VG9TZWdtZW50KGFyZWEuY2VudGVyLCBjYy52Mihmcm9tUG9zKSwgY2MudjIodG9Qb3MpKSA+IGFyZWEucmFkaXVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJEYW1hZ2VEb3VibGVBcmVhID8gYnVsbGV0LmVudGVyRGFtYWdlRG91YmxlQXJlYShhcmVhKSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduRGFtYWdlRG91YmxlRngocG9zKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfZGFtYWdlRG91YmxlRnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU3MDA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBmeC5zY2FsZSA9IDAuNDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDUwLCA1MCwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMDAsIDUwLCAyMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyNik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGZ4LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwgMS42KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJTcGVlZERvdWJsZVRlc3ROb2RlcygpIHtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZUFyZWFEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9zcGVlZERvdWJsZUFyZWFcIiB8fCBjaGlsZC5uYW1lID09IFwiX3NwZWVkRG91YmxlRnhcIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVTcGVlZERvdWJsZUFyZWFOb2RlKHBvcywgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBhcmVhID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVBcmVhXCIpO1xyXG4gICAgICAgIGFyZWEucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGFyZWEuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYXJlYS56SW5kZXggPSA1NjUwO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3NwZWVkRG91YmxlR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgODAsIDI1NSwgMzUpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICsgMjApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMTYwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjg1O1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjUsIDEuMDgpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwgMjIwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC41LCAwLjg1KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjUsIDEyMClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpKTtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYXJlYS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigzMCwgMTMwLCAyNTUsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgODAsIDI1NSwgMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSA0KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lclJpbmcgPSBuZXcgY2MuTm9kZShcIl9zcGVlZERvdWJsZUlubmVyUmluZ1wiKTtcclxuICAgICAgICBpbm5lclJpbmcucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyUmluZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpbm5lckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCAxODAsIDI1NSwgMTUwKTtcclxuICAgICAgICBsZXQgc2VnbWVudHMgPSAyNDtcclxuICAgICAgICBsZXQgZGFzaExlbiA9IE1hdGguUEkgKiAyIC8gc2VnbWVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlID0gaSAqIGRhc2hMZW47XHJcbiAgICAgICAgICAgIGxldCBlbmRBbmdsZSA9IChpICsgMSkgKiBkYXNoTGVuO1xyXG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMgLSAxMiwgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5uZXJSaW5nLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDIuMCwgLTkwKSkpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTQwLCA0OCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMTAwLCAyMDAsIDI1NSwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIngyXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVIaW50XCIpO1xyXG4gICAgICAgIGhpbnQucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBoaW50LnNldFBvc2l0aW9uKGNjLnYyKDAsIHJhZGl1cyArIDM2KSk7XHJcbiAgICAgICAgaGludC5zZXRDb250ZW50U2l6ZSgzMDAsIDQwKTtcclxuICAgICAgICBoaW50LmNvbG9yID0gY2MuY29sb3IoMjAwLCAyMjAsIDI1NSwgMjIwKTtcclxuICAgICAgICBsZXQgaGludExhYmVsID0gaGludC5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGhpbnRMYWJlbC5zdHJpbmcgPSBcIuWtkOW8ueepv+i/hyDpgJ/luqZ4M1wiO1xyXG4gICAgICAgIGhpbnRMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGhpbnRMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgaGludExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgaGludExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFyZWE7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3BlZWREb3VibGVUZXN0RW5lbXkocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA5MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsIHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5faHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX21heEhwID0gOTk5OTk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNwZWVkRG91YmxlVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcGVlZERvdWJsZVRlc3ROb2RlcygpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigyMjAsIDApKSwgMTAwKTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gNjA7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gY2MuY29sb3IoMzAsIDEzMCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNlbnRlci5hZGQoY2MudjIocmFkaXVzICsgNDAsIDApKSwgOTApO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVTcGVlZERvdWJsZUFyZWFOb2RlKGNlbnRlciwgcmFkaXVzLCBjb2xvcik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTcGVlZERvdWJsZVRlc3RFbmVteShlbmVteVBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlQXJlYURhdGEgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgc3BlZWRNdWx0aXBsaWVyOiAzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJTcGVlZERvdWJsZUFyZWEoYnVsbGV0LCBmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSB8fCAhYnVsbGV0IHx8ICF0aGlzLl9zcGVlZERvdWJsZUFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1bGxldC5oYXNVc2VkU3BlZWREb3VibGVBcmVhICYmIGJ1bGxldC5oYXNVc2VkU3BlZWREb3VibGVBcmVhKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyZWEgPSB0aGlzLl9zcGVlZERvdWJsZUFyZWFEYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kaXN0YW5jZVBvaW50VG9TZWdtZW50KGFyZWEuY2VudGVyLCBjYy52Mihmcm9tUG9zKSwgY2MudjIodG9Qb3MpKSA+IGFyZWEucmFkaXVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJTcGVlZERvdWJsZUFyZWEgPyBidWxsZXQuZW50ZXJTcGVlZERvdWJsZUFyZWEoYXJlYSkgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3blNwZWVkRG91YmxlRngocG9zKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfc3BlZWREb3VibGVGeFwiKTtcclxuICAgICAgICBmeC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZnguc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZnguekluZGV4ID0gNTcwMDtcclxuICAgICAgICBmeC5vcGFjaXR5ID0gMjIwO1xyXG4gICAgICAgIGZ4LnNjYWxlID0gMC40O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmeC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDUwLCAxNTAsIDI1NSwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCAyMDAsIDI1NSwgMjIwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjYpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBmeC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDEuNiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyU3ByZWFkQnVsbGV0VGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldEFyZWFEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBcIl9zcHJlYWRCdWxsZXRBcmVhXCIgfHwgY2hpbGQubmFtZSA9PSBcIl9zcHJlYWRCdWxsZXRGeFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVNwcmVhZEJ1bGxldEFyZWFOb2RlKHBvcywgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBhcmVhID0gbmV3IGNjLk5vZGUoXCJfc3ByZWFkQnVsbGV0QXJlYVwiKTtcclxuICAgICAgICBhcmVhLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBhcmVhLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGFyZWEuekluZGV4ID0gNTY1MDtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9zcHJlYWRCdWxsZXRHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAyMDAsIDgwLCAzNSk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgKyAyMCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAxNjA7XHJcbiAgICAgICAgZ2xvdy5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMS4wOCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAyMjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjUsIDAuODUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwgMTIwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBhcmVhLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDMwLCAyMzAsIDEwMCwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAyMDAsIDgwLCAzMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyUmluZyA9IG5ldyBjYy5Ob2RlKFwiX3NwcmVhZEJ1bGxldElubmVyUmluZ1wiKTtcclxuICAgICAgICBpbm5lclJpbmcucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyUmluZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpbm5lckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTAwLCAyNTUsIDE1MCwgMTUwKTtcclxuICAgICAgICBsZXQgc2VnbWVudHMgPSAyNDtcclxuICAgICAgICBsZXQgZGFzaExlbiA9IE1hdGguUEkgKiAyIC8gc2VnbWVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlID0gaSAqIGRhc2hMZW47XHJcbiAgICAgICAgICAgIGxldCBlbmRBbmdsZSA9IChpICsgMSkgKiBkYXNoTGVuO1xyXG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMgLSAxMiwgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5uZXJSaW5nLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDIuMCwgNjApKSk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zcHJlYWRCdWxsZXRMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYXJlYTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTQwLCA0OCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMTAwLCAyNTUsIDE0MCwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIngzXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCBoaW50ID0gbmV3IGNjLk5vZGUoXCJfc3ByZWFkQnVsbGV0SGludFwiKTtcclxuICAgICAgICBoaW50LnBhcmVudCA9IGFyZWE7XHJcbiAgICAgICAgaGludC5zZXRQb3NpdGlvbihjYy52MigwLCByYWRpdXMgKyAzNikpO1xyXG4gICAgICAgIGhpbnQuc2V0Q29udGVudFNpemUoMzAwLCA0MCk7XHJcbiAgICAgICAgaGludC5jb2xvciA9IGNjLmNvbG9yKDIwMCwgMjU1LCAyMjAsIDIyMCk7XHJcbiAgICAgICAgbGV0IGhpbnRMYWJlbCA9IGhpbnQuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBoaW50TGFiZWwuc3RyaW5nID0gXCLlrZDlvLnnqb/ov4cgMeWPmDNcIjtcclxuICAgICAgICBoaW50TGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBoaW50TGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGhpbnRMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGhpbnRMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIHJldHVybiBhcmVhO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNwcmVhZEJ1bGxldFRlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3ByZWFkQnVsbGV0VGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcHJlYWRCdWxsZXRUZXN0Tm9kZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMjIwLCAwKSksIDEwMCk7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IDYwO1xyXG4gICAgICAgIGxldCBjb2xvciA9IGNjLmNvbG9yKDMwLCAyMzAsIDEwMCwgMjU1KTtcclxuICAgICAgICBsZXQgZW5lbXlQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihjZW50ZXIuYWRkKGNjLnYyKDIwMCwgMCkpLCA5MCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVNwcmVhZEJ1bGxldEFyZWFOb2RlKGNlbnRlciwgcmFkaXVzLCBjb2xvcik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTcHJlYWRCdWxsZXRUZXN0RW5lbXkoZW5lbXlQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRBcmVhRGF0YSA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBzcHJlYWRDb3VudDogMixcclxuICAgICAgICAgICAgc3ByZWFkQW5nbGU6IDIwLFxyXG4gICAgICAgICAgICBfc3BsaXRUcmlnZ2VyZWQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJTcHJlYWRCdWxsZXRBcmVhKGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX3NwcmVhZEJ1bGxldEFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcmVhID0gdGhpcy5fc3ByZWFkQnVsbGV0QXJlYURhdGE7XHJcbiAgICAgICAgaWYgKGFyZWEuX3NwbGl0VHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQoYXJlYS5jZW50ZXIsIGNjLnYyKGZyb21Qb3MpLCBjYy52Mih0b1BvcykpID4gYXJlYS5yYWRpdXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXJlYS5fc3BsaXRUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBidWxsZXQuZW50ZXJTcHJlYWRCdWxsZXRBcmVhID8gYnVsbGV0LmVudGVyU3ByZWFkQnVsbGV0QXJlYShhcmVhKSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduU3ByZWFkQnVsbGV0RngocG9zKSB7XHJcbiAgICAgICAgbGV0IGZ4ID0gbmV3IGNjLk5vZGUoXCJfc3ByZWFkQnVsbGV0RnhcIik7XHJcbiAgICAgICAgZngucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGZ4LnpJbmRleCA9IDU3MDA7XHJcbiAgICAgICAgZngub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICBmeC5zY2FsZSA9IDAuNDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZnguYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig1MCwgMjMwLCAxMDAsIDE4MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDIwKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDEwMCwgMjU1LCAxNTAsIDIyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI2KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgZngucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLCAxLjYpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckJvdW5jZU9ic3RhY2xlVGVzdE5vZGVzKCkge1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlcyA9IFtdO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZS5jaGlsZHJlbi5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lLmluZGV4T2YoXCJfYm91bmNlT2JzdGFjbGVcIikgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVCb3VuY2VDaXJjbGVPYnN0YWNsZShwb3MsIHJhZGl1cykge1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoXCJfYm91bmNlT2JzdGFjbGVDaXJjbGVcIik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDU2MDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDEyMCwgMTgwLCA2MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDgwLCAxODAsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlcy5wdXNoKHtcclxuICAgICAgICAgICAgdHlwZTogXCJjaXJjbGVcIixcclxuICAgICAgICAgICAgY2VudGVyOiBjYy52Mihwb3MpLFxyXG4gICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZUJvdW5jZUxpbmVPYnN0YWNsZShmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoXCJfYm91bmNlT2JzdGFjbGVMaW5lXCIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIG5vZGUuekluZGV4ID0gNTYwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gbm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDgwLCAxODAsIDI1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MubW92ZVRvKGZyb21Qb3MueCwgZnJvbVBvcy55KTtcclxuICAgICAgICBncmFwaGljcy5saW5lVG8odG9Qb3MueCwgdG9Qb3MueSk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBBID0gY2MudjIoZnJvbVBvcyk7XHJcbiAgICAgICAgbGV0IEIgPSBjYy52Mih0b1Bvcyk7XHJcbiAgICAgICAgbGV0IGRpciA9IEIuc3ViKEEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCBub3JtYWwgPSBjYy52MigtZGlyLnksIGRpci54KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVzLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlOiBcImxpbmVcIixcclxuICAgICAgICAgICAgQTogQSxcclxuICAgICAgICAgICAgQjogQixcclxuICAgICAgICAgICAgbm9ybWFsOiBub3JtYWwsXHJcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xlYXJCb3VuY2VPYnN0YWNsZVRlc3ROb2RlcygpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQm91bmNlQ2lyY2xlT2JzdGFjbGUodGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigxODAsIDQwKSksIDgwKSwgMzYpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUJvdW5jZUNpcmNsZU9ic3RhY2xlKHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoMTgwLCAtNTApKSwgODApLCAyOCk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQm91bmNlTGluZU9ic3RhY2xlKFxyXG4gICAgICAgICAgICB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGNjLnYyKDMyMCwgLTgwKSksIDYwKSxcclxuICAgICAgICAgICAgdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigzMjAsIDgwKSksIDYwKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGxldCBlbmVteVBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoNDgwLCAwKSksIDkwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdEVuZW15KGVuZW15UG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCb3VuY2VPYnN0YWNsZVRlc3RFbmVteShwb3MpIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZShidWxsZXQsIGZyb21Qb3MsIHRvUG9zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlIHx8ICFidWxsZXQgfHwgdGhpcy5fYm91bmNlT2JzdGFjbGVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmcm9tID0gY2MudjIoZnJvbVBvcyk7XHJcbiAgICAgICAgbGV0IHRvID0gY2MudjIodG9Qb3MpO1xyXG4gICAgICAgIGxldCBkaXJCdWxsZXQgPSB0by5zdWIoZnJvbSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYm91bmNlT2JzdGFjbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnN0YWNsZSA9IHRoaXMuX2JvdW5jZU9ic3RhY2xlc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYnN0YWNsZS50eXBlID09IFwiY2lyY2xlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjZW50ZXIgPSBvYnN0YWNsZS5jZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gb2JzdGFjbGUucmFkaXVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IEFDID0gY2VudGVyLnN1Yihmcm9tKTtcclxuICAgICAgICAgICAgICAgIGxldCBsZW5TcXIgPSBkaXJCdWxsZXQubWFnU3FyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuU3FyIDw9IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSBBQy5kb3QoZGlyQnVsbGV0KSAvIGxlblNxcjtcclxuICAgICAgICAgICAgICAgIHQgPSBjYy5taXNjLmNsYW1wZih0LCAwLCAxKTtcclxuICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0ID0gZnJvbS5hZGQoZGlyQnVsbGV0Lm11bCh0KSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IGNlbnRlci5zdWIoY2xvc2VzdCkubWFnKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPj0gcmFkaXVzKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdXJmYWNlIG5vcm1hbCBwb2ludHMgZnJvbSBjZW50ZXIgb3V0d2FyZCB0byB0aGUgaGl0IHBvaW50IG9uIGNpcmN1bWZlcmVuY2VcclxuICAgICAgICAgICAgICAgIGxldCBzdXJmYWNlTm9ybWFsID0gY2xvc2VzdC5zdWIoY2VudGVyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdXJmYWNlTm9ybWFsLm1hZ1NxcigpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXJmYWNlTm9ybWFsID0gY2MudjIoMSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc3VyZmFjZU5vcm1hbCBzaG91bGQgcG9pbnQgdG93YXJkIHRoZSBpbmNvbWluZyBidWxsZXRcclxuICAgICAgICAgICAgICAgIGxldCBkb3QgPSBidWxsZXQuX2Rpci5kb3Qoc3VyZmFjZU5vcm1hbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG90ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cmZhY2VOb3JtYWwgPSBzdXJmYWNlTm9ybWFsLm11bCgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90ID0gLWRvdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVmbGVjdERpciA9IGJ1bGxldC5fZGlyLnN1YihzdXJmYWNlTm9ybWFsLm11bCgyICogZG90KSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuX2RpciA9IHJlZmxlY3REaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3MoYnVsbGV0Ll9kaXIpIC0gOTA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUGxhY2UgYnVsbGV0IG9uIHRoZSBjaXJjdW1mZXJlbmNlIGF0IHRoZSBoaXQgcG9pbnQsIHRoZW4gcHVzaCBvdXR3YXJkXHJcbiAgICAgICAgICAgICAgICBsZXQgaGl0UG9pbnQgPSBjZW50ZXIuYWRkKGNsb3Nlc3Quc3ViKGNlbnRlcikubm9ybWFsaXplKCkubXVsKHJhZGl1cykpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuc2V0UG9zaXRpb24oY2MudjMoaGl0UG9pbnQuYWRkKGJ1bGxldC5fZGlyLm11bCg4KSkpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9ic3RhY2xlLnR5cGUgPT0gXCJsaW5lXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBBID0gb2JzdGFjbGUuQTtcclxuICAgICAgICAgICAgICAgIGxldCBCID0gb2JzdGFjbGUuQjtcclxuICAgICAgICAgICAgICAgIGxldCBkaXJPYnN0YWNsZSA9IEIuc3ViKEEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyb3NzIHByb2R1Y3QgdG8gY2hlY2sgc2VnbWVudCBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgICAgIGxldCBkZW5vbSA9IGRpckJ1bGxldC54ICogZGlyT2JzdGFjbGUueSAtIGRpckJ1bGxldC55ICogZGlyT2JzdGFjbGUueDtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZW5vbSkgPCAwLjAwMDEpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0MSA9ICgoQS54IC0gZnJvbS54KSAqIGRpck9ic3RhY2xlLnkgLSAoQS55IC0gZnJvbS55KSAqIGRpck9ic3RhY2xlLngpIC8gZGVub207XHJcbiAgICAgICAgICAgICAgICBsZXQgdDIgPSAoKEEueCAtIGZyb20ueCkgKiBkaXJCdWxsZXQueSAtIChBLnkgLSBmcm9tLnkpICogZGlyQnVsbGV0LngpIC8gZGVub207XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHQxIDwgMCB8fCB0MSA+IDEgfHwgdDIgPCAwIHx8IHQyID4gMSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5vcm1hbCA9IG9ic3RhY2xlLm5vcm1hbDtcclxuICAgICAgICAgICAgICAgIGxldCBkb3QgPSBidWxsZXQuX2Rpci5kb3Qobm9ybWFsKTtcclxuICAgICAgICAgICAgICAgIGlmIChkb3QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsID0gbm9ybWFsLm11bCgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90ID0gLWRvdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVmbGVjdERpciA9IGJ1bGxldC5fZGlyLnN1Yihub3JtYWwubXVsKDIgKiBkb3QpKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5fZGlyID0gcmVmbGVjdERpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyhidWxsZXQuX2RpcikgLSA5MDtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKGZyb20uYWRkKGJ1bGxldC5fZGlyLm11bCg4KSkpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFRlc3RFZmZlY3RQcmV2aWV3UG9zKCkge1xyXG4gICAgICAgIGxldCBiYXNlUG9zID0gdGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKVxyXG4gICAgICAgICAgICA/IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbilcclxuICAgICAgICAgICAgOiAodGhpcy5fcGxheWVyQm9yblBvcyA/IGNjLnYyKHRoaXMuX3BsYXllckJvcm5Qb3MpIDogY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihiYXNlUG9zLmFkZChjYy52MigxODAsIDk2KSksIDEyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZWxvYWRSaXBwbGVEaXN0b3J0aW9uRWZmZWN0KCkge1xyXG4gICAgICAgIGlmIChjYy5keW5hbWljQXRsYXNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInNoYWRlci9yaXBwbGUtZGlzdG9ydGlvblwiLCBjYy5FZmZlY3RBc3NldCwgKGVyciwgZWZmZWN0QXNzZXQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwibG9hZCByaXBwbGUgZGlzdG9ydGlvbiBlZmZlY3QgZmFpbGVkXCIsIGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmlwcGxlRGlzdG9ydGlvbkVmZmVjdCA9IGVmZmVjdEFzc2V0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95UmlwcGxlQ2FwdHVyZVJlc291cmNlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhLnRhcmdldFRleHR1cmUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYU5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFJpcHBsZUNhcHR1cmVDYW1lcmEoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JpcHBsZUNhcHR1cmVDYW1lcmEgJiYgY2MuaXNWYWxpZCh0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50Tm9kZSB8fCAhY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYW1lcmFOb2RlID0gbmV3IGNjLk5vZGUoXCJfcmlwcGxlQ2FwdHVyZUNhbWVyYVwiKTtcclxuICAgICAgICBjYW1lcmFOb2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgY2FtZXJhTm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBjYW1lcmFOb2RlLnpJbmRleCA9IC05OTk5O1xyXG4gICAgICAgIGxldCBjYW1lcmEgPSBjYW1lcmFOb2RlLmFkZENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgICAgIGNhbWVyYS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBjYW1lcmEub3J0aG8gPSB0cnVlO1xyXG4gICAgICAgIGNhbWVyYS5hbGlnbldpdGhTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIGNhbWVyYS5kZXB0aCA9IC05OTk7XHJcbiAgICAgICAgY2FtZXJhLmN1bGxpbmdNYXNrID0gMHhmZmZmZmZmZjtcclxuICAgICAgICBjYW1lcmEuYmFja2dyb3VuZENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgY2FtZXJhLmNsZWFyRmxhZ3MgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9yaXBwbGVDYXB0dXJlQ2FtZXJhTm9kZSA9IGNhbWVyYU5vZGU7XHJcbiAgICAgICAgdGhpcy5fcmlwcGxlQ2FwdHVyZUNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICByZXR1cm4gY2FtZXJhO1xyXG4gICAgfVxyXG5cclxuICAgIF9jYXB0dXJlUmlwcGxlU2NyZWVuRnJhbWUoKSB7XHJcbiAgICAgICAgbGV0IGNhbWVyYSA9IHRoaXMuX2dldFJpcHBsZUNhcHR1cmVDYW1lcmEoKTtcclxuICAgICAgICBpZiAoIWNhbWVyYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2aWV3cG9ydFNpemUgPSB0aGlzLl9nZXRWaWV3cG9ydFNpemUoKTtcclxuICAgICAgICBsZXQgcmVuZGVyVGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgbGV0IGdsID0gKGNjLmdhbWUgYXMgYW55KS5fcmVuZGVyQ29udGV4dDtcclxuICAgICAgICBpZiAoIWdsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXJUZXh0dXJlLmluaXRXaXRoU2l6ZShNYXRoLmNlaWwodmlld3BvcnRTaXplLndpZHRoKSwgTWF0aC5jZWlsKHZpZXdwb3J0U2l6ZS5oZWlnaHQpLCBnbC5TVEVOQ0lMX0lOREVYOCk7XHJcbiAgICAgICAgY2FtZXJhLnRhcmdldFRleHR1cmUgPSByZW5kZXJUZXh0dXJlO1xyXG4gICAgICAgIGNhbWVyYS5yZW5kZXIoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKSk7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSgpO1xyXG4gICAgICAgIHNwcml0ZUZyYW1lLnNldFRleHR1cmUocmVuZGVyVGV4dHVyZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3ByaXRlRnJhbWU6IHNwcml0ZUZyYW1lLFxyXG4gICAgICAgICAgICByZW5kZXJUZXh0dXJlOiByZW5kZXJUZXh0dXJlLFxyXG4gICAgICAgICAgICB2aWV3cG9ydFNpemU6IHZpZXdwb3J0U2l6ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRSaXBwbGVDZW50ZXJVdihvdmVybGF5Tm9kZSwgd29ybGRQb3MsIHZpZXdwb3J0U2l6ZSkge1xyXG4gICAgICAgIGlmICghb3ZlcmxheU5vZGUgfHwgIWNjLmlzVmFsaWQob3ZlcmxheU5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy52MigwLjUsIDAuNSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9jYWxQb3MgPSBvdmVybGF5Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRYID0gKGxvY2FsUG9zLnggKyB2aWV3cG9ydFNpemUud2lkdGggKiAwLjUpIC8gTWF0aC5tYXgoMSwgdmlld3BvcnRTaXplLndpZHRoKTtcclxuICAgICAgICBsZXQgbm9ybWFsaXplZFkgPSAobG9jYWxQb3MueSArIHZpZXdwb3J0U2l6ZS5oZWlnaHQgKiAwLjUpIC8gTWF0aC5tYXgoMSwgdmlld3BvcnRTaXplLmhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKFxyXG4gICAgICAgICAgICBjYy5taXNjLmNsYW1wZihub3JtYWxpemVkWCwgMCwgMSksXHJcbiAgICAgICAgICAgIGNjLm1pc2MuY2xhbXBmKDEgLSBub3JtYWxpemVkWSwgMCwgMSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkRpc3RvcnRpb25SaXBwbGVBdChwb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3JpcHBsZURpc3RvcnRpb25FZmZlY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJlbG9hZFJpcHBsZURpc3RvcnRpb25FZmZlY3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNhcHR1cmUgPSB0aGlzLl9jYXB0dXJlUmlwcGxlU2NyZWVuRnJhbWUoKTtcclxuICAgICAgICBpZiAoIWNhcHR1cmUgfHwgIWNhcHR1cmUuc3ByaXRlRnJhbWUgfHwgIWNhcHR1cmUucmVuZGVyVGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2NyZWVuUGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBpZiAoIXNjcmVlblBhcmVudCB8fCAhY2MuaXNWYWxpZChzY3JlZW5QYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvdmVybGF5ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uRGlzdG9ydGlvblJpcHBsZVwiKTtcclxuICAgICAgICBvdmVybGF5LnBhcmVudCA9IHNjcmVlblBhcmVudDtcclxuICAgICAgICBvdmVybGF5LnNldENvbnRlbnRTaXplKGNhcHR1cmUudmlld3BvcnRTaXplKTtcclxuICAgICAgICBvdmVybGF5LnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIG92ZXJsYXkuekluZGV4ID0gMTUwMDtcclxuXHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IG92ZXJsYXkuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gY2FwdHVyZS5zcHJpdGVGcmFtZTtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSBjYy5NYXRlcmlhbC5jcmVhdGUodGhpcy5fcmlwcGxlRGlzdG9ydGlvbkVmZmVjdCwgMCk7XHJcbiAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKFwiVVNFX1RFWFRVUkVcIiwgdHJ1ZSwgMCk7XHJcbiAgICAgICAgbWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJ0ZXh0dXJlXCIsIGNhcHR1cmUucmVuZGVyVGV4dHVyZSk7XHJcblxyXG4gICAgICAgIGxldCBtYXRlcmlhbFZhcmlhbnQgPSBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCBzcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zZXRNYXRlcmlhbCgwLCBtYXRlcmlhbFZhcmlhbnQpO1xyXG5cclxuICAgICAgICBsZXQgd29ybGRQb3MgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKHBvcykpO1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLl9nZXRSaXBwbGVDZW50ZXJVdihvdmVybGF5LCB3b3JsZFBvcywgY2FwdHVyZS52aWV3cG9ydFNpemUpO1xyXG5cclxuICAgICAgICBsZXQgcmlwcGxlID0gb3ZlcmxheS5hZGRDb21wb25lbnQoUmlwcGxlU2hvY2t3YXZlKTtcclxuICAgICAgICByaXBwbGUuaW5pdChcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgc3ByaXRlLFxyXG4gICAgICAgICAgICBtYXRlcmlhbFZhcmlhbnQsXHJcbiAgICAgICAgICAgIGNlbnRlcixcclxuICAgICAgICAgICAgY2FwdHVyZS52aWV3cG9ydFNpemUsXHJcbiAgICAgICAgICAgIGNhcHR1cmUuc3ByaXRlRnJhbWUsXHJcbiAgICAgICAgICAgIGNhcHR1cmUucmVuZGVyVGV4dHVyZSxcclxuICAgICAgICAgICAgMC4zNFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChwb3MpIHtcclxuICAgICAgICB0aGlzLl9zcGF3bkRpc3RvcnRpb25SaXBwbGVBdChwb3MpO1xyXG4gICAgICAgIHRoaXMuX3NwYXduRXhwbG9zaW9uU3RhcmJ1cnN0QXQocG9zKTtcclxuICAgICAgICB0aGlzLl9zcGF3bkV4cGxvc2lvbkdsb3dBdChwb3MsIDAuMzYpO1xyXG4gICAgICAgIHRoaXMuX3NwYXduRXhwbG9zaW9uQ29yZUJ1cnN0QXQocG9zLCAwLjIyKTtcclxuICAgICAgICB0aGlzLl9zcGF3blRyYW5zcGFyZW50U2hvY2t3YXZlQXQocG9zLCA3NiwgMzgwLCAwLCAwLjM0LCAxODAsIDEwKTtcclxuICAgICAgICB0aGlzLl9zcGF3blRyYW5zcGFyZW50U2hvY2t3YXZlQXQocG9zLCAzOCwgMjIwLCAwLjA0LCAwLjI0LCAxMzUsIDYpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYm9vbVwiKTtcclxuICAgICAgICB0aGlzLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduRXhwbG9zaW9uU3RhcmJ1cnN0QXQocG9zKSB7XHJcbiAgICAgICAgbGV0IGJ1cnN0ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uU3RhcmJ1cnN0XCIpO1xyXG4gICAgICAgIGJ1cnN0LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBidXJzdC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBidXJzdC56SW5kZXggPSA2MDU1O1xyXG4gICAgICAgIGJ1cnN0Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgYnVyc3Quc2NhbGUgPSAwLjQ1O1xyXG5cclxuICAgICAgICBsZXQgcmF5Q29uZmlncyA9IFtcclxuICAgICAgICAgICAge2FuZ2xlOiAwLCBsZW5ndGg6IDE3MCwgd2lkdGg6IDE4LCBhbHBoYTogMTYwfSxcclxuICAgICAgICAgICAge2FuZ2xlOiA0NSwgbGVuZ3RoOiAxNDAsIHdpZHRoOiAxNCwgYWxwaGE6IDE1MH0sXHJcbiAgICAgICAgICAgIHthbmdsZTogOTAsIGxlbmd0aDogMTc1LCB3aWR0aDogMTgsIGFscGhhOiAxNjV9LFxyXG4gICAgICAgICAgICB7YW5nbGU6IDEzNSwgbGVuZ3RoOiAxNDIsIHdpZHRoOiAxNCwgYWxwaGE6IDE1MH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJheUNvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHJheUNvbmZpZ3NbaV07XHJcbiAgICAgICAgICAgIGxldCByYXkgPSBuZXcgY2MuTm9kZShcIl9leHBsb3Npb25SYXlcIiArIGkpO1xyXG4gICAgICAgICAgICByYXkucGFyZW50ID0gYnVyc3Q7XHJcbiAgICAgICAgICAgIHJheS5hbmdsZSA9IGNvbmZpZy5hbmdsZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IHJheS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCBjb25maWcuYWxwaGEpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8oMCwgY29uZmlnLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtY29uZmlnLndpZHRoLCBjb25maWcubGVuZ3RoICogMC4yNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygwLCAxMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyhjb25maWcud2lkdGgsIGNvbmZpZy5sZW5ndGggKiAwLjI0KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhvdENyb3NzID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uSG90Q3Jvc3NcIik7XHJcbiAgICAgICAgaG90Q3Jvc3MucGFyZW50ID0gYnVyc3Q7XHJcbiAgICAgICAgbGV0IGNyb3NzR3JhcGhpY3MgPSBob3RDcm9zcy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGNyb3NzR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDAsIDE4MCwgMTUwKTtcclxuICAgICAgICBjcm9zc0dyYXBoaWNzLnJlY3QoLTExMiwgLTUsIDIyNCwgMTApO1xyXG4gICAgICAgIGNyb3NzR3JhcGhpY3MucmVjdCgtNSwgLTExMiwgMTAsIDIyNCk7XHJcbiAgICAgICAgY3Jvc3NHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGJ1cnN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDgsIDEuMDgpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDgsIDIyMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTYsIDEuNTUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjE2KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25FeHBsb3Npb25HbG93QXQocG9zLCBzdHJlbmd0aCA9IDAuMykge1xyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBnbG93LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGdsb3cuekluZGV4ID0gNjA1MDtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjM1O1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDgsIDIyMCwgTWF0aC5mbG9vcigxMjUgKiBzdHJlbmd0aCkpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMDgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIxMCwgMTIwLCBNYXRoLmZsb29yKDk1ICogc3RyZW5ndGgpKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgNzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDQsIDIxMCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDQsIDEpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjE4KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS41MilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduRXhwbG9zaW9uQ29yZUJ1cnN0QXQocG9zLCBkdXJhdGlvbiA9IDAuMjgpIHtcclxuICAgICAgICBsZXQgY29yZSA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbkNvcmVCdXJzdFwiKTtcclxuICAgICAgICBjb3JlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBjb3JlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGNvcmUuekluZGV4ID0gNjA2MDtcclxuICAgICAgICBjb3JlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgY29yZS5zY2FsZSA9IDAuMjtcclxuXHJcbiAgICAgICAgbGV0IG91dGVyID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uT3V0ZXJDb3JlXCIpO1xyXG4gICAgICAgIG91dGVyLnBhcmVudCA9IGNvcmU7XHJcbiAgICAgICAgbGV0IG91dGVyR3JhcGhpY3MgPSBvdXRlci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDQsIDE5NiwgMTcwKTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmNpcmNsZSgwLCAwLCA3Nik7XHJcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lciA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbklubmVyQ29yZVwiKTtcclxuICAgICAgICBpbm5lci5wYXJlbnQgPSBjb3JlO1xyXG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI0MCk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgMzQpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBjb3JlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uICogMC40MiwgMS4xNiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oZHVyYXRpb24gKiAwLjQyLCAyNTUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbiAqIDAuNTgsIDEuODUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dChkdXJhdGlvbiAqIDAuNTgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3blRyYW5zcGFyZW50U2hvY2t3YXZlQXQocG9zLCBzdGFydFJhZGl1cyA9IDcyLCBlbmRSYWRpdXMgPSAzNDAsIGRlbGF5ID0gMCwgZHVyYXRpb24gPSAwLjQyLCBhbHBoYSA9IDE3MCwgbGluZVdpZHRoID0gOCkge1xyXG4gICAgICAgIGxldCB3YXZlID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uU2hvY2t3YXZlXCIpO1xyXG4gICAgICAgIHdhdmUucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHdhdmUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgd2F2ZS56SW5kZXggPSA2MDU4O1xyXG4gICAgICAgIHdhdmUub3BhY2l0eSA9IGFscGhhO1xyXG4gICAgICAgIHdhdmUuc2NhbGUgPSAxO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSB3YXZlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgYWxwaGEpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCBzdGFydFJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBlbmRTY2FsZSA9IHN0YXJ0UmFkaXVzID4gMCA/IGVuZFJhZGl1cyAvIHN0YXJ0UmFkaXVzIDogMTtcclxuICAgICAgICBsZXQgcGxheUFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24sIGVuZFNjYWxlKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoZHVyYXRpb24pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKGRlbGF5KSwgcGxheUFjdGlvbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB3YXZlLnJ1bkFjdGlvbihwbGF5QWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlXaGl0ZVNjcmVlbkZsYXNoKG1heE9wYWNpdHkgPSAxODAsIGZhZGVJbiA9IDAuMDQsIGZhZGVPdXQgPSAwLjIpIHtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKCFwYXJlbnROb2RlIHx8ICFjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzaXplID0gdGhpcy5fZ2V0Vmlld3BvcnRTaXplKCk7XHJcbiAgICAgICAgbGV0IGZsYXNoID0gbmV3IGNjLk5vZGUoXCJfc2NyZWVuRmxhc2hXaGl0ZVwiKTtcclxuICAgICAgICBmbGFzaC5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIGZsYXNoLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgIGZsYXNoLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGZsYXNoLnpJbmRleCA9IDE3MDA7XHJcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGZsYXNoLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5yZWN0KC1zaXplLndpZHRoIC8gMiwgLXNpemUuaGVpZ2h0IC8gMiwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZmxhc2gucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlVG8oZmFkZUluLCBtYXhPcGFjaXR5KSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dChmYWRlT3V0KSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNjcmVlbk92ZXJsYXlSb290KCkge1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBpZiAocGFyZW50Tm9kZSAmJiBjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVXRpbHMuZ2V0Q3VycmVudFNjZW5lQ2FudmFzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZUtpbGxCcm9hZGNhc3RMYXllcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fa2lsbEJyb2FkY2FzdExheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fa2lsbEJyb2FkY2FzdExheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fa2lsbEJyb2FkY2FzdExheWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLl9nZXRTY3JlZW5PdmVybGF5Um9vdCgpO1xyXG4gICAgICAgIGlmICghcm9vdCB8fCAhY2MuaXNWYWxpZChyb290KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsYXllciA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCcm9hZGNhc3RMYXllclwiKTtcclxuICAgICAgICBsYXllci5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpKTtcclxuICAgICAgICBsYXllci5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBsYXllci56SW5kZXggPSAxODUwO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllciA9IGxheWVyO1xyXG4gICAgICAgIHJldHVybiBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBfZW5zdXJlS2lsbEJhZGdlTGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCYWRnZUxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fa2lsbEJhZGdlTGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9raWxsQmFkZ2VMYXllcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5fZ2V0U2NyZWVuT3ZlcmxheVJvb3QoKTtcclxuICAgICAgICBpZiAoIXJvb3QgfHwgIWNjLmlzVmFsaWQocm9vdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgY2MuTm9kZShcIl9raWxsQmFkZ2VMYXllclwiKTtcclxuICAgICAgICBsYXllci5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpKTtcclxuICAgICAgICBsYXllci5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBsYXllci56SW5kZXggPSAxODYwO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCYWRnZUxheWVyID0gbGF5ZXI7XHJcbiAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95S2lsbEJyb2FkY2FzdFVpKCkge1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX2tpbGxCcm9hZGNhc3RMYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdExheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdExheWVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUtpbGxCYWRnZVVpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VMYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX2tpbGxCYWRnZUxheWVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VMYXllci5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2tpbGxCYWRnZUxheWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpIHtcclxuICAgICAgICB0aGlzLl9raWxsU3RyZWFrQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2tpbGxTdHJlYWtSZW1haW4gPSAwO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWxsQnJvYWRjYXN0VWkoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lsbEJhZGdlVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZEtpbGxCcm9hZGNhc3RCYWRnZUZyYW1lcygpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZEtpbGxCYWRnZUZyYW1lKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbG9hZEtpbGxCYWRnZUZyYW1lKHN0cmVhaywgY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHV1aWQgPSBLSUxMX0JBREdFX0ZSQU1FX1VVSURTW3N0cmVha107XHJcbiAgICAgICAgaWYgKCF1dWlkIHx8ICFjYy5hc3NldE1hbmFnZXIgfHwgIWNjLmFzc2V0TWFuYWdlci5sb2FkQW55KSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2tpbGxCYWRnZUZyYW1lc1tzdHJlYWtdKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fa2lsbEJhZGdlRnJhbWVzW3N0cmVha10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VMb2FkaW5nW3N0cmVha10pIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VMb2FkaW5nW3N0cmVha10ucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fa2lsbEJhZGdlTG9hZGluZ1tzdHJlYWtdID0gY2FsbGJhY2sgPyBbY2FsbGJhY2tdIDogW107XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IHV1aWR9LCAoZXJyLCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tpbGxCYWRnZUZyYW1lc1tzdHJlYWtdID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2tpbGxCYWRnZUxvYWRpbmdbc3RyZWFrXSB8fCBbXTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2tpbGxCYWRnZUxvYWRpbmdbc3RyZWFrXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXShzcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZE9pbFNwaWxsRnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKCFPSUxfU1BJTExfRlJBTUVfVVVJRCB8fCAhY2MuYXNzZXRNYW5hZ2VyIHx8ICFjYy5hc3NldE1hbmFnZXIubG9hZEFueSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWRPaWxTcGlsbEZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRPaWxTcGlsbEZyYW1lKGNhbGxiYWNrID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTcGlsbEZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fb2lsU3BpbGxGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNwaWxsRnJhbWVDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTcGlsbEZyYW1lTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vaWxTcGlsbEZyYW1lTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IE9JTF9TUElMTF9GUkFNRV9VVUlEfSwgKGVyciwgYXNzZXQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxGcmFtZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFlcnIgJiYgYXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29pbFNwaWxsRnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fb2lsU3BpbGxGcmFtZUNhbGxiYWNrcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9vaWxTcGlsbEZyYW1lQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0odGhpcy5fb2lsU3BpbGxGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZENvdmVyVGVzdEZyYW1lKCkge1xyXG4gICAgICAgIGlmICghQ09WRVJfVEVTVF9GUkFNRV9VVUlEIHx8ICFjYy5hc3NldE1hbmFnZXIgfHwgIWNjLmFzc2V0TWFuYWdlci5sb2FkQW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZENvdmVyVGVzdEZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRDb3ZlclRlc3RGcmFtZShjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fY292ZXJUZXN0RnJhbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9jb3ZlclRlc3RGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY292ZXJUZXN0RnJhbWVMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IENPVkVSX1RFU1RfRlJBTUVfVVVJRH0sIChlcnIsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVGVzdEZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY292ZXJUZXN0RnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fY292ZXJUZXN0RnJhbWVDYWxsYmFja3Muc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fY292ZXJUZXN0RnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSh0aGlzLl9jb3ZlclRlc3RGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZEVuZXJneUVnZ0ZyYW1lKCkge1xyXG4gICAgICAgIGlmICghRU5FUkdZX0VHR19GUkFNRV9VVUlEIHx8ICFjYy5hc3NldE1hbmFnZXIgfHwgIWNjLmFzc2V0TWFuYWdlci5sb2FkQW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZEVuZXJneUVnZ0ZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRFbmVyZ3lFZ2dGcmFtZShjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnRnJhbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9lbmVyZ3lFZ2dGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnRnJhbWVMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoe3V1aWQ6IEVORVJHWV9FR0dfRlJBTUVfVVVJRH0sIChlcnIsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0ZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnRnJhbWUgPSBhc3NldCBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lID8gYXNzZXQgOiBhc3NldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fZW5lcmd5RWdnRnJhbWVDYWxsYmFja3Muc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSh0aGlzLl9lbmVyZ3lFZ2dGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlbG9hZEVuZXJneUVnZ0J1c2hGcmFtZSgpIHtcclxuICAgICAgICBpZiAoIVRSRUVfR1JFRU5fTEFSR0VfRlJBTUVfVVVJRCB8fCAhY2MuYXNzZXRNYW5hZ2VyIHx8ICFjYy5hc3NldE1hbmFnZXIubG9hZEFueSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWRFbmVyZ3lFZ2dCdXNoRnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfbG9hZEVuZXJneUVnZ0J1c2hGcmFtZShjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dCdXNoRnJhbWVMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh7dXVpZDogVFJFRV9HUkVFTl9MQVJHRV9GUkFNRV9VVUlEfSwgKGVyciwgYXNzZXQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaEZyYW1lID0gYXNzZXQgaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IGFzc2V0IDogYXNzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2VuZXJneUVnZ0J1c2hGcmFtZUNhbGxiYWNrcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dCdXNoRnJhbWVDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSh0aGlzLl9lbmVyZ3lFZ2dCdXNoRnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEtpbGxCYWRnZUNvbG9yKHN0cmVhaykge1xyXG4gICAgICAgIGxldCBjb2xvciA9IEtJTExfQkFER0VfVElOVFNbc3RyZWFrXSB8fCBLSUxMX0JBREdFX1RJTlRTWzFdO1xyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcihjb2xvclswXSwgY29sb3JbMV0sIGNvbG9yWzJdLCAyNTUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVLaWxsQnJvYWRjYXN0RW50cnkodGV4dCkge1xyXG4gICAgICAgIGxldCBsYXllciA9IHRoaXMuX2Vuc3VyZUtpbGxCcm9hZGNhc3RMYXllcigpO1xyXG4gICAgICAgIGlmICghbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW50cnkgPSBuZXcgY2MuTm9kZShcIl9raWxsQnJvYWRjYXN0RW50cnlcIik7XHJcbiAgICAgICAgZW50cnkucGFyZW50ID0gbGF5ZXI7XHJcbiAgICAgICAgZW50cnkuc2V0Q29udGVudFNpemUoNDM4LCA1Nik7XHJcbiAgICAgICAgZW50cnkub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZW50cnlbXCJfZXhwaXJlQXRcIl0gPSBEYXRlLm5vdygpICsgTWF0aC5mbG9vcihLSUxMX0JST0FEQ0FTVF9EVVJBVElPTiAqIDEwMDApO1xyXG4gICAgICAgIGVudHJ5W1wiX2lzRXhpdGluZ1wiXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgYmcgPSBlbnRyeS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDE2LCAyMCwgMjgsIDIyMCk7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC0yMTksIC0yOCwgNDM4LCA1NiwgMTYpO1xyXG4gICAgICAgIGJnLmZpbGwoKTtcclxuICAgICAgICBiZy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMTg2LCA4MiwgMjIwKTtcclxuICAgICAgICBiZy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtMjE5LCAtMjgsIDQzOCwgNTYsIDE2KTtcclxuICAgICAgICBiZy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHRhZ05vZGUgPSBuZXcgY2MuTm9kZShcIl9sYkJyb2FkY2FzdFRhZ1wiKTtcclxuICAgICAgICB0YWdOb2RlLnBhcmVudCA9IGVudHJ5O1xyXG4gICAgICAgIHRhZ05vZGUuc2V0Q29udGVudFNpemUoMTAwLCA0MCk7XHJcbiAgICAgICAgdGFnTm9kZS5zZXRQb3NpdGlvbigtMTYwLCAwKTtcclxuICAgICAgICBsZXQgdGFnTGFiZWwgPSB0YWdOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGFnTGFiZWwuc3RyaW5nID0gXCLmiL/pl7Tlub/mkq1cIjtcclxuICAgICAgICB0YWdMYWJlbC5mb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIHRhZ0xhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICB0YWdMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHRhZ0xhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0YWdOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyMTQsIDEyMiwgMjU1KTtcclxuXHJcbiAgICAgICAgbGV0IHNwbGl0ID0gbmV3IGNjLk5vZGUoXCJfYnJvYWRjYXN0U3BsaXRcIik7XHJcbiAgICAgICAgc3BsaXQucGFyZW50ID0gZW50cnk7XHJcbiAgICAgICAgc3BsaXQuc2V0UG9zaXRpb24oLTk4LCAwKTtcclxuICAgICAgICBsZXQgc3BsaXRHcmFwaGljcyA9IHNwbGl0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgc3BsaXRHcmFwaGljcy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIHNwbGl0R3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCA2MCk7XHJcbiAgICAgICAgc3BsaXRHcmFwaGljcy5tb3ZlVG8oMCwgLTE2KTtcclxuICAgICAgICBzcGxpdEdyYXBoaWNzLmxpbmVUbygwLCAxNik7XHJcbiAgICAgICAgc3BsaXRHcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiQnJvYWRjYXN0VGV4dFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gZW50cnk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDIzNiwgNDApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbig2NCwgMCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xheW91dEtpbGxCcm9hZGNhc3RFbnRyaWVzKGZhc3QgPSBmYWxzZSwgbmV3RW50cnkgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fZW5zdXJlS2lsbEJyb2FkY2FzdExheWVyKCk7XHJcbiAgICAgICAgaWYgKCFsYXllcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpO1xyXG4gICAgICAgIGxheWVyLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgIGxldCB0b3BZID0gTWF0aC5taW4oc2l6ZS5oZWlnaHQgLyAyIC0gMTIwLCAoeXlwLnNhZmVUb3BCb3R0b20gfHwgc2l6ZS5oZWlnaHQgLyAyKSAtIDk2KTtcclxuICAgICAgICBsZXQgcmlnaHRYID0gc2l6ZS53aWR0aCAvIDIgLSAyNDY7XHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZmFzdCA/IDAuMTIgOiAwLjI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXNbaV07XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChlbnRyeSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoIC0gMSAtIGk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRYID0gcmlnaHRYO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0WSA9IHRvcFkgLSBzbG90ICogS0lMTF9CUk9BRENBU1RfU0xPVF9IRUlHSFQ7XHJcbiAgICAgICAgICAgIGVudHJ5LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeSA9PSBuZXdFbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgZW50cnkuc2V0UG9zaXRpb24odGFyZ2V0WCArIDI0LCB0YXJnZXRZIC0gMTgpO1xyXG4gICAgICAgICAgICAgICAgZW50cnkucnVuQWN0aW9uKGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbiwgdGFyZ2V0WCwgdGFyZ2V0WSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKGR1cmF0aW9uLCAyNTUpXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZW50cnkucnVuQWN0aW9uKGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbiwgdGFyZ2V0WCwgdGFyZ2V0WSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKGR1cmF0aW9uLCAyNTUpXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlS2lsbEJyb2FkY2FzdEVudHJ5KGVudHJ5LCBmYXN0ID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIWVudHJ5IHx8ICFjYy5pc1ZhbGlkKGVudHJ5KSB8fCBlbnRyeVtcIl9pc0V4aXRpbmdcIl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnlbXCJfaXNFeGl0aW5nXCJdID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5pbmRleE9mKGVudHJ5KTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZmFzdCA/IDAuMTIgOiAwLjE4O1xyXG4gICAgICAgIGVudHJ5LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgZW50cnkucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkdXJhdGlvbiwgMjgsIDE4KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoZHVyYXRpb24pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dEtpbGxCcm9hZGNhc3RFbnRyaWVzKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wdXNoS2lsbEJyb2FkY2FzdCh0ZXh0KSB7XHJcbiAgICAgICAgbGV0IGVudHJ5ID0gdGhpcy5fY3JlYXRlS2lsbEJyb2FkY2FzdEVudHJ5KHRleHQpO1xyXG4gICAgICAgIGlmICghZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZhc3RFeHBpcmVBdCA9IERhdGUubm93KCkgKyA5MDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2xkRW50cnkgPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllc1tpXTtcclxuICAgICAgICAgICAgaWYgKG9sZEVudHJ5ICYmIGNjLmlzVmFsaWQob2xkRW50cnkpICYmICFvbGRFbnRyeVtcIl9pc0V4aXRpbmdcIl0pIHtcclxuICAgICAgICAgICAgICAgIG9sZEVudHJ5W1wiX2V4cGlyZUF0XCJdID0gTWF0aC5taW4ob2xkRW50cnlbXCJfZXhwaXJlQXRcIl0sIGZhc3RFeHBpcmVBdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLnB1c2goZW50cnkpO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5sZW5ndGggPiBLSUxMX0JST0FEQ0FTVF9NQVhfVklTSUJMRSkge1xyXG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IHRoaXMuX2tpbGxCcm9hZGNhc3RFbnRyaWVzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUtpbGxCcm9hZGNhc3RFbnRyeShyZW1vdmVkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0S2lsbEJyb2FkY2FzdEVudHJpZXModHJ1ZSwgZW50cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVLaWxsQnJvYWRjYXN0RW50cmllcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgbGV0IGVudHJpZXMgPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5zbGljZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQoZW50cnkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9raWxsQnJvYWRjYXN0RW50cmllcy5pbmRleE9mKGVudHJ5KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdEVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZW50cnlbXCJfaXNFeGl0aW5nXCJdICYmIG5vdyA+PSBlbnRyeVtcIl9leHBpcmVBdFwiXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlS2lsbEJyb2FkY2FzdEVudHJ5KGVudHJ5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduS2lsbEJhZGdlTGlnaHRuaW5nKHBhcmVudE5vZGUsIGNvbG9yKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGxpZ2h0bmluZyA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCYWRnZUxpZ2h0bmluZ1wiICsgaSk7XHJcbiAgICAgICAgICAgIGxpZ2h0bmluZy5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBsaWdodG5pbmcuc2V0UG9zaXRpb24oLTgwICsgaSAqIDgwLCAxMCArIE1hdGgucmFuZG9tKCkgKiAyNik7XHJcbiAgICAgICAgICAgIGxpZ2h0bmluZy5hbmdsZSA9IC0xMCArIE1hdGgucmFuZG9tKCkgKiAyMDtcclxuICAgICAgICAgICAgbGlnaHRuaW5nLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSBsaWdodG5pbmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCAyMzUpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8oLTgsIDQyKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDEyLCAxMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtMiwgMTApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oMTQsIC0zMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICBsaWdodG5pbmcucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDQsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4wOCArIGkgKiAwLjAzKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xMilcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93S2lsbEJhZGdlU3RhbXAoc3RyZWFrKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fZW5zdXJlS2lsbEJhZGdlTGF5ZXIoKTtcclxuICAgICAgICBpZiAoIWxheWVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbEJhZGdlQWN0aXZlTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMS4xKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMDgpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfa2lsbEJhZGdlU3RhbXBcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gbGF5ZXI7XHJcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oMCwgMTIpO1xyXG4gICAgICAgIGJhZGdlLnpJbmRleCA9IDE7XHJcbiAgICAgICAgYmFkZ2Uub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgYmFkZ2Uuc2NhbGUgPSAxLjQyO1xyXG4gICAgICAgIGJhZGdlLmFuZ2xlID0gLTEyO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCYWRnZUFjdGl2ZU5vZGUgPSBiYWRnZTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5fZ2V0S2lsbEJhZGdlQ29sb3Ioc3RyZWFrKTtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9raWxsQmFkZ2VHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gYmFkZ2U7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMTgwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjg7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgc3RyZWFrID49IDUgPyA4OCA6IDU2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDEyOCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93R3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAxNDUpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5saW5lV2lkdGggPSA2O1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgMTE0KTtcclxuICAgICAgICBnbG93R3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBmbGFzaCA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCYWRnZUZsYXNoXCIpO1xyXG4gICAgICAgIGZsYXNoLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGZsYXNoLm9wYWNpdHkgPSAxODA7XHJcbiAgICAgICAgbGV0IGZsYXNoR3JhcGhpY3MgPSBmbGFzaC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgOTUpO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MucmVjdCgtMTUwLCAtMTIsIDMwMCwgMjQpO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MucmVjdCgtMTIsIC0xMjAsIDI0LCAyNDApO1xyXG4gICAgICAgIGZsYXNoR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCYWRnZVNwcml0ZVwiKTtcclxuICAgICAgICBzcHJpdGVOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIHNwcml0ZU5vZGUuc2V0Q29udGVudFNpemUoMzYwLCAyNDApO1xyXG4gICAgICAgIGxldCBzcHJpdGUgPSBzcHJpdGVOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgICAgc3ByaXRlTm9kZS5jb2xvciA9IGNvbG9yO1xyXG5cclxuICAgICAgICBpZiAoc3RyZWFrID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Bhd25LaWxsQmFkZ2VMaWdodG5pbmcoYmFkZ2UsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvYWRLaWxsQmFkZ2VGcmFtZShzdHJlYWssIChzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlICYmIGNjLmlzVmFsaWQoc3ByaXRlKSAmJiBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYmFkZ2UucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjA4LCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA4LCAwLjkyKSxcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMDgsIC0yKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xNCwgMS4wMyksXHJcbiAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbygwLjE0LCAwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC41MiksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjI0KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNCwgMS4xMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2tpbGxCYWRnZUFjdGl2ZU5vZGUgPT0gYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9raWxsQmFkZ2VBY3RpdmVOb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWNvcmRLaWxsU3RyZWFrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9raWxsU3RyZWFrUmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9raWxsU3RyZWFrQ291bnQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbFN0cmVha0NvdW50ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fa2lsbFN0cmVha0NvdW50ID0gTWF0aC5taW4oNSwgdGhpcy5fa2lsbFN0cmVha0NvdW50KTtcclxuICAgICAgICB0aGlzLl9raWxsU3RyZWFrUmVtYWluID0gS0lMTF9TVFJFQUtfV0lORE9XO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsU3RyZWFrQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGRlbGV0ZUVuZW15KGRlbEVuZW15KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZW5lbXkgPT0gZGVsRW5lbXkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgfHwgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ICs9MTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVteXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDpNYXRoLm1heCgwLCB0aGlzLl9tYXhFbmVteUNvdW50IC0gdGhpcy5fZGVhdGhFbmVteUNvdW50KX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2tpbGxJY29uKGRlbEVuZW15LnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgKz0xO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50IC0gdGhpcy5fZGVhdGhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlYzkurrmlbDph49cclxuICAgIGVuZW15Q291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZW15cy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmioDog71pY29uXHJcbiAgICBjcmVhdGVTa2lsbEljb24ocG9zKSB7XHJcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjA2KSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBza2lsbC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgIHNraWxsLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICBza2lsbC5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICAgICAgICAgIHNraWxsLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc2tpbGwueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEVuZXJneUNvbmZpZyhrZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBjb25maWdba2V5XTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZqP5py655Sf5oiQ5LiA5Liq6IO96YePXHJcbiAgICBjcmVhdGVFbmVyZ3koKSB7XHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl9nZXRSYW5kb21QYXNzYWJsZVRpbGUoKTtcclxuICAgICAgICBpZiAodGlsZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLmVuZXJneVByZWZhYiA/IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lcmd5UHJlZmFiKSA6IHRoaXMuX2NyZWF0ZURlZmF1bHRFbmVyZ3koKTtcclxuICAgICAgICBlbmVyZ3kucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZXJneS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMudGlsZVRvR2FtZVBvcyh0aWxlKSk7XHJcbiAgICAgICAgZW5lcmd5LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lcmd5LnkpO1xyXG5cclxuICAgICAgICBsZXQgZW5lcmd5U2NyaXB0ID0gZW5lcmd5LmdldENvbXBvbmVudChFbmVyZ3lJdGVtKSB8fCBlbmVyZ3kuYWRkQ29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIlZhbHVlXCIsIDEwKTtcclxuICAgICAgICBsZXQgbGlmZVRpbWUgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJMaWZlVGltZVwiLCAxMik7XHJcbiAgICAgICAgZW5lcmd5U2NyaXB0LmluaXQodmFsdWUsIGxpZmVUaW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZW5lcmd5cy5wdXNoKGVuZXJneSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRW5lcmd5QXQocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuZW5lcmd5UHJlZmFiID8gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVyZ3lQcmVmYWIpIDogdGhpcy5fY3JlYXRlRGVmYXVsdEVuZXJneSgpO1xyXG4gICAgICAgIGVuZXJneS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lcmd5LnBvc2l0aW9uID0gY2MudjMocG9zKTtcclxuICAgICAgICBlbmVyZ3kuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVyZ3kueSk7XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pIHx8IGVuZXJneS5hZGRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgZW5lcmd5U2NyaXB0LmluaXQodGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiVmFsdWVcIiwgMTApLCB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJMaWZlVGltZVwiLCAxMikpO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneXMucHVzaChlbmVyZ3kpO1xyXG4gICAgICAgIHJldHVybiBlbmVyZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRW5lcmd5RWdnVGVzdFNldHVwKCkge1xyXG4gICAgICAgIGxldCBzZXR1cCA9IHRoaXMuX2dldEVuZXJneUVnZ1Rlc3RTZXR1cFBvc2l0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc3Bhd25FbmVyZ3lFZ2dCdXNoKHNldHVwLmJ1c2hQb3MsIDk0KTtcclxuICAgICAgICB0aGlzLnNwYXduRW5lcmd5RWdnQXQoc2V0dXAuZWdnUG9zLCB7XHJcbiAgICAgICAgICAgIGxpZmVUaW1lOiAxMCxcclxuICAgICAgICAgICAgcmFkaXVzOiAzNCxcclxuICAgICAgICAgICAgZW5lcmd5Q291bnQ6IDE4LFxyXG4gICAgICAgICAgICBlbmVyZ3lTY2F0dGVyUmFkaXVzOiAxMzZcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC40NSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJCdWJibGUoXCLmiorog73ph4/om4vmjqjov5vojYnkuJtcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEVuZXJneUVnZ1Rlc3RTZXR1cFBvc2l0aW9ucygpIHtcclxuICAgICAgICBsZXQgYmFzZVBvcyA9IHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcilcclxuICAgICAgICAgICAgPyBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pXHJcbiAgICAgICAgICAgIDogY2MudjIodGhpcy5fcGxheWVyQm9yblBvcyB8fCBjYy52MigwLCAwKSk7XHJcbiAgICAgICAgbGV0IGRpcnMgPSBbXHJcbiAgICAgICAgICAgIGNjLnYyKDEsIDApLFxyXG4gICAgICAgICAgICBjYy52MigwLjgyLCAwLjMyKSxcclxuICAgICAgICAgICAgY2MudjIoMC44MiwgLTAuMzIpLFxyXG4gICAgICAgICAgICBjYy52MigwLjIsIDEpLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXIgPSBkaXJzW2ldLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgZWdnUG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoZGlyLm11bCgxNTApKSwgNjgpO1xyXG4gICAgICAgICAgICBsZXQgYnVzaFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGJhc2VQb3MuYWRkKGRpci5tdWwoMzAwKSksIDk2KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdENvbGxpZGVycyhlZ2dQb3MsIDM4KS5sZW5ndGggPiAwIHx8IHRoaXMudGVzdENvbGxpZGVycyhidXNoUG9zLCA1MikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVnZ1BvczogZWdnUG9zLFxyXG4gICAgICAgICAgICAgICAgYnVzaFBvczogYnVzaFBvcyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVnZ1BvczogdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoY2MudjIoMTUwLCAwKSksIDY4KSxcclxuICAgICAgICAgICAgYnVzaFBvczogdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoY2MudjIoMzAwLCAwKSksIDk2KSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNwYXduRW5lcmd5RWdnQnVzaChwb3MsIHJhZGl1cyA9IDk0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiX2VuZXJneUVnZ0J1c2hcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICByb290LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgocG9zLnkpICsgMjtcclxuXHJcbiAgICAgICAgbGV0IHNoYWRvdyA9IG5ldyBjYy5Ob2RlKFwiX2VuZXJneUVnZ0J1c2hTaGFkb3dcIik7XHJcbiAgICAgICAgc2hhZG93LnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgc2hhZG93LnNldFBvc2l0aW9uKDAsIC0xNCk7XHJcbiAgICAgICAgbGV0IHNoYWRvd0dyYXBoaWNzID0gc2hhZG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgc2hhZG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgNjApO1xyXG4gICAgICAgIHNoYWRvd0dyYXBoaWNzLmVsbGlwc2UoMCwgMCwgcmFkaXVzICogMC42MiwgcmFkaXVzICogMC4yMik7XHJcbiAgICAgICAgc2hhZG93R3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2VuZXJneUVnZ0J1c2hTcHJpdGVcIik7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNwcml0ZU5vZGUuc2V0UG9zaXRpb24oMCwgOCk7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5zZXRDb250ZW50U2l6ZShyYWRpdXMgKiAxLjk1LCByYWRpdXMgKiAxLjk1KTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gc3ByaXRlTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHRoaXMuX2xvYWRFbmVyZ3lFZ2dCdXNoRnJhbWUoKHNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcHJpdGUgJiYgY2MuaXNWYWxpZChzcHJpdGUpICYmIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgYnVzaDphbnkgPSB7XHJcbiAgICAgICAgICAgIG5vZGU6IHJvb3QsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnQnVzaGVzLnB1c2goYnVzaCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1c2g7XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25FbmVyZ3lFZ2dBdChwb3MsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiRW5lcmd5RWdnXCIpO1xyXG4gICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgcm9vdC56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHBvcy55KSArIDE7XHJcblxyXG4gICAgICAgIGxldCBlZ2dTY3JpcHQgPSByb290LmFkZENvbXBvbmVudChFbmVyZ3lFZ2cpO1xyXG4gICAgICAgIGxldCBlZ2c6YW55ID0ge1xyXG4gICAgICAgICAgICBub2RlOiByb290LFxyXG4gICAgICAgICAgICBzY3JpcHQ6IGVnZ1NjcmlwdCxcclxuICAgICAgICAgICAgcmFkaXVzOiBvcHRpb25zLnJhZGl1cyA9PSBudWxsID8gMzQgOiBvcHRpb25zLnJhZGl1cyxcclxuICAgICAgICAgICAgZW5lcmd5Q291bnQ6IG9wdGlvbnMuZW5lcmd5Q291bnQgPT0gbnVsbCA/IDE2IDogb3B0aW9ucy5lbmVyZ3lDb3VudCxcclxuICAgICAgICAgICAgZW5lcmd5U2NhdHRlclJhZGl1czogb3B0aW9ucy5lbmVyZ3lTY2F0dGVyUmFkaXVzID09IG51bGwgPyAxMzAgOiBvcHRpb25zLmVuZXJneVNjYXR0ZXJSYWRpdXMsXHJcbiAgICAgICAgICAgIGJ1cnN0RG9uZTogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBlZ2dTY3JpcHQuaW5pdCh7XHJcbiAgICAgICAgICAgIGxpZmVUaW1lOiBvcHRpb25zLmxpZmVUaW1lID09IG51bGwgPyAxMCA6IG9wdGlvbnMubGlmZVRpbWUsXHJcbiAgICAgICAgICAgIHJhZGl1czogZWdnLnJhZGl1cyxcclxuICAgICAgICAgICAgb25NYXR1cmU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUVuZXJneUVnZ01hdHVyZShlZ2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbG9hZEVuZXJneUVnZ0ZyYW1lKChzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWdnU2NyaXB0ICYmIGNjLmlzVmFsaWQoZWdnU2NyaXB0KSkge1xyXG4gICAgICAgICAgICAgICAgZWdnU2NyaXB0LnNldFNwcml0ZUZyYW1lKHNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ3MucHVzaChlZ2cpO1xyXG4gICAgICAgIHJldHVybiBlZ2c7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUVuZXJneUVnZ01hdHVyZShlZ2cpIHtcclxuICAgICAgICBpZiAoIWVnZyB8fCBlZ2cuYnVyc3REb25lIHx8ICFlZ2cubm9kZSB8fCAhY2MuaXNWYWxpZChlZ2cubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWdnLmJ1cnN0RG9uZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYyKGVnZy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgY291bnQgPSBlZ2cuZW5lcmd5Q291bnQgfHwgMTY7XHJcbiAgICAgICAgbGV0IHNjYXR0ZXJSYWRpdXMgPSBlZ2cuZW5lcmd5U2NhdHRlclJhZGl1cyB8fCAxMzA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkgKiAyICogaSAvIGNvdW50ICsgTWF0aC5yYW5kb20oKSAqIDAuNDI7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IDQwICsgTWF0aC5yYW5kb20oKSAqIHNjYXR0ZXJSYWRpdXM7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihvcmlnaW4uYWRkKGNjLnYyKE1hdGguY29zKGFuZ2xlKSAqIGRpc3RhbmNlLCBNYXRoLnNpbihhbmdsZSkgKiBkaXN0YW5jZSkpLCA0Mik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDb2xsaWRlcnModGFyZ2V0UG9zLCAxOCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ob3JpZ2luLmFkZChjYy52MihNYXRoLmNvcyhhbmdsZSkgKiA0MiwgTWF0aC5zaW4oYW5nbGUpICogNDIpKSwgNDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLmNyZWF0ZUVuZXJneUF0KG9yaWdpbik7XHJcbiAgICAgICAgICAgIGVuZXJneS5zY2FsZSA9IDAuMTg7XHJcbiAgICAgICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMzIsIDEpLFxyXG4gICAgICAgICAgICAgICAgY2MuanVtcFRvKDAuMzYgKyBNYXRoLnJhbmRvbSgpICogMC4wOCwgdGFyZ2V0UG9zLCA0MiArIE1hdGgucmFuZG9tKCkgKiAxOCwgMSlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChvcmlnaW4pO1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4yKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93UGxheWVyQnViYmxlKFwi5oiQ54af5LqGLCDlm57mnaXmlLbog73ph49cIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3Bhd25PaWxUZXN0UGlja3VwKHBvcyA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwaWNrdXAgPSBuZXcgY2MuTm9kZShcIk9pbFBpY2t1cFwiKTtcclxuICAgICAgICBwaWNrdXAucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHBpY2t1cC5hZGRDb21wb25lbnQoT2lsUGlja3VwKTtcclxuICAgICAgICBwaWNrdXAucG9zaXRpb24gPSBjYy52Myhwb3MgfHwgdGhpcy5fZ2V0T2lsVGVzdFBpY2t1cFBvcygpKTtcclxuICAgICAgICBwaWNrdXAuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChwaWNrdXAueSk7XHJcbiAgICAgICAgcGlja3VwLnNjcmlwdC5zZXRJbkdhbWUoMTgpO1xyXG4gICAgICAgIHRoaXMuX3NraWxscy5wdXNoKHBpY2t1cCk7XHJcbiAgICAgICAgcmV0dXJuIHBpY2t1cDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDb3ZlclRlc3RFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5fZ2V0Q292ZXJUZXN0RW5lbXlQb3MoKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQXR0YWNrUmFkaXVzID0gODgwO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lID0gMC4zMjtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5TcGVlZCA9IDA7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9idWxsZXRDb2RlVGltZSA9IGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29kZVRpbWUgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX3dhbGtQYXRocyA9IFtdO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fd2lsbFBvcyA9IG51bGw7XHJcbiAgICAgICAgZW5lbXkuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdEVuZW15ID0gZW5lbXk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgIHJldHVybiBlbmVteTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q292ZXJUZXN0RW5lbXlQb3MoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcilcclxuICAgICAgICAgICAgPyBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pXHJcbiAgICAgICAgICAgIDogY2MudjIodGhpcy5fcGxheWVyQm9yblBvcyB8fCBjYy52MigwLCAwKSk7XHJcbiAgICAgICAgbGV0IGRpcnMgPSBbXHJcbiAgICAgICAgICAgIGNjLnYyKDEsIDAuMTIpLFxyXG4gICAgICAgICAgICBjYy52MigxLCAtMC4xNiksXHJcbiAgICAgICAgICAgIGNjLnYyKDAuODYsIDAuMzgpLFxyXG4gICAgICAgICAgICBjYy52MigwLjg2LCAtMC4zOCksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRpciA9IGRpcnNbaV0ubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwbGF5ZXJQb3MuYWRkKGRpci5tdWwoNDIwICsgaSAqIDIwKSksIDg2KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdENvbGxpZGVycyhwb3MsIDUyKS5sZW5ndGggPT0gMCAmJiB0aGlzLmxpbmVMaW5lUGFzc0NvbGxpZGVycyhwb3MsIHBsYXllclBvcykgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBsYXllclBvcy5hZGQoY2MudjIoNDIwLCAwKSksIDg2KTtcclxuICAgIH1cclxuXHJcbiAgICBzcGF3bkNvdmVyVGVzdENvdmVycyhjb3VudCA9IDYpIHtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMgPSBbXTtcclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gdGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKVxyXG4gICAgICAgICAgICA/IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbilcclxuICAgICAgICAgICAgOiBjYy52Mih0aGlzLl9wbGF5ZXJCb3JuUG9zIHx8IGNjLnYyKDAsIDApKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlQ292ZXJUZXN0Q292ZXIodGhpcy5fZ2V0Q292ZXJUZXN0Q292ZXJTcGF3blBvcyhwbGF5ZXJQb3MsIGksIGNvdW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDb3ZlclRlc3RDb3ZlclNwYXduUG9zKHBsYXllclBvcywgaW5kZXgsIGNvdW50KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBiYXNlQW5nbGUgPSBNYXRoLlBJICogMiAqICgoaW5kZXggKyBpICogMC4zNykgJSBjb3VudCkgLyBjb3VudDtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gYmFzZUFuZ2xlICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC45O1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSAxMTAgKyBNYXRoLnJhbmRvbSgpICogMTgwO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gY2MudjIocGxheWVyUG9zKS5hZGQoY2MudjIoTWF0aC5jb3MoYW5nbGUpICogZGlzdGFuY2UsIE1hdGguc2luKGFuZ2xlKSAqIGRpc3RhbmNlKSk7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgNDgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcywgMzgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwb3Muc3ViKHBsYXllclBvcykubWFnKCkgPCA5MCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvdmVyVGVzdEVuZW15ICYmIGNjLmlzVmFsaWQodGhpcy5fY292ZXJUZXN0RW5lbXkpICYmIHBvcy5zdWIodGhpcy5fY292ZXJUZXN0RW5lbXkucG9zaXRpb24pLm1hZygpIDwgMTIwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGJsb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb3ZlciA9IHRoaXMuX2NvdmVyVGVzdENvdmVyc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb3ZlciAmJiBjb3Zlci5ub2RlICYmIGNjLmlzVmFsaWQoY292ZXIubm9kZSkgJiYgcG9zLnN1Yihjb3Zlci5ub2RlLnBvc2l0aW9uKS5tYWcoKSA8IDg2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFibG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocGxheWVyUG9zLmFkZChjYy52MigxNDAgKyBpbmRleCAqIDE4LCBpbmRleCAlIDIgPT0gMCA/IDkwIDogLTkwKSksIDQ4KTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlQ292ZXJUZXN0Q292ZXIocG9zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyVGVzdENyYXRlXCIpO1xyXG4gICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgcm9vdC56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KHBvcy55KSArIDE7XHJcblxyXG4gICAgICAgIGxldCBzaGFkb3cgPSBuZXcgY2MuTm9kZShcIl9jb3ZlclRlc3RDcmF0ZVNoYWRvd1wiKTtcclxuICAgICAgICBzaGFkb3cucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBzaGFkb3cuc2V0UG9zaXRpb24oMCwgLTkpO1xyXG4gICAgICAgIGxldCBzaGFkb3dHcmFwaGljcyA9IHNoYWRvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHNoYWRvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDY4KTtcclxuICAgICAgICBzaGFkb3dHcmFwaGljcy5lbGxpcHNlKDAsIDAsIDI0LCAxMik7XHJcbiAgICAgICAgc2hhZG93R3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVyU3ByaXRlXCIpO1xyXG4gICAgICAgIHNwcml0ZU5vZGUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBzcHJpdGVOb2RlLnNldENvbnRlbnRTaXplKDcwLCA3MCk7XHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IHNwcml0ZU5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcclxuICAgICAgICB0aGlzLl9sb2FkQ292ZXJUZXN0RnJhbWUoKHNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcHJpdGUgJiYgY2MuaXNWYWxpZChzcHJpdGUpICYmIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgY3JhY2sgPSBuZXcgY2MuTm9kZShcIl9jb3ZlckNyYWNrXCIpO1xyXG4gICAgICAgIGNyYWNrLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgY3JhY2suekluZGV4ID0gMjtcclxuICAgICAgICBjcmFja1tcIiRHcmFwaGljc1wiXSA9IGNyYWNrLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgIGxldCBocE5vZGUgPSBuZXcgY2MuTm9kZShcIl9jb3ZlckhwXCIpO1xyXG4gICAgICAgIGhwTm9kZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGhwTm9kZS5zZXRQb3NpdGlvbigwLCA0OCk7XHJcbiAgICAgICAgaHBOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNDMsIDIxNCwgMjU1KTtcclxuICAgICAgICBsZXQgaHBMYWJlbCA9IGhwTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGhwTGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBocExhYmVsLmxpbmVIZWlnaHQgPSAyMjtcclxuICAgICAgICBocExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgaHBMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCBjb3ZlcjphbnkgPSB7XHJcbiAgICAgICAgICAgIG5vZGU6IHJvb3QsXHJcbiAgICAgICAgICAgIHJhZGl1czogMzQsXHJcbiAgICAgICAgICAgIGhwOiA1LFxyXG4gICAgICAgICAgICBtYXhIcDogNSxcclxuICAgICAgICAgICAgYXR0YWNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBvd25lcjogbnVsbCxcclxuICAgICAgICAgICAgYXR0YWNoT2Zmc2V0OiBjYy52MigwLCAwKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJvb3RbXCJfX2NvdmVyVGVzdERhdGFcIl0gPSBjb3ZlcjtcclxuICAgICAgICByb290W1wiJENyYWNrXCJdID0gY3JhY2s7XHJcbiAgICAgICAgcm9vdFtcIiRIcExhYmVsXCJdID0gaHBMYWJlbDtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMucHVzaChjb3Zlcik7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaENvdmVyVGVzdENvdmVyVmlzdWFsKGNvdmVyKTtcclxuICAgICAgICByZXR1cm4gY292ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hDb3ZlclRlc3RDb3ZlclZpc3VhbChjb3Zlcikge1xyXG4gICAgICAgIGlmICghY292ZXIgfHwgIWNvdmVyLm5vZGUgfHwgIWNjLmlzVmFsaWQoY292ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxvc3RIcCA9IGNvdmVyLm1heEhwIC0gY292ZXIuaHA7XHJcbiAgICAgICAgbGV0IHNwcml0ZU5vZGUgPSBjb3Zlci5ub2RlLmdldENoaWxkQnlOYW1lKFwiX2NvdmVyU3ByaXRlXCIpO1xyXG4gICAgICAgIGlmIChzcHJpdGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHNwcml0ZU5vZGUuc2NhbGUgPSAxIC0gbG9zdEhwICogMC4wMztcclxuICAgICAgICAgICAgc3ByaXRlTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1IC0gbG9zdEhwICogMTQsIDI1NSAtIGxvc3RIcCAqIDIyLCAyNTUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY292ZXIubm9kZVtcIiRIcExhYmVsXCJdKSB7XHJcbiAgICAgICAgICAgIGNvdmVyLm5vZGVbXCIkSHBMYWJlbFwiXS5zdHJpbmcgPSBjb3Zlci5ocCArIFwiL1wiICsgY292ZXIubWF4SHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3Zlci5ub2RlW1wiJENyYWNrXCJdICYmIGNvdmVyLm5vZGVbXCIkQ3JhY2tcIl1bXCIkR3JhcGhpY3NcIl0pIHtcclxuICAgICAgICAgICAgbGV0IGdyYXBoaWNzID0gY292ZXIubm9kZVtcIiRDcmFja1wiXVtcIiRHcmFwaGljc1wiXTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKGxvc3RIcCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDIgKyBNYXRoLm1pbigyLCBsb3N0SHAgKiAwLjM1KTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNzAsIDQyLCAxOCwgMjIwKTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLm1vdmVUbygtMTAsIDE4KTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtNCwgNyk7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lVG8oLTExLCAtNyk7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb3N0SHAgPj0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLm1vdmVUbyg2LCAxNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygxMSwgLTEyKTtcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3N0SHAgPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLm1vdmVUbygtMTgsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbygtNCwgLTUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyg4LCAtMjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRPaWxUZXN0UGlja3VwUG9zKCkge1xyXG4gICAgICAgIGxldCBiYXNlUG9zID0gdGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKVxyXG4gICAgICAgICAgICA/IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbilcclxuICAgICAgICAgICAgOiBjYy52Mih0aGlzLl9wbGF5ZXJCb3JuUG9zIHx8IGNjLnYyKDAsIDApKTtcclxuICAgICAgICBsZXQgY2FuZGlkYXRlRGlycyA9IFtcclxuICAgICAgICAgICAgY2MudjIoMCwgMSksXHJcbiAgICAgICAgICAgIGNjLnYyKDEsIDApLFxyXG4gICAgICAgICAgICBjYy52MigtMSwgMCksXHJcbiAgICAgICAgICAgIGNjLnYyKDAsIC0xKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlRGlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoY2FuZGlkYXRlRGlyc1tpXS5tdWwoMTUwKSksIDcwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdENvbGxpZGVycyhwb3MsIDQyKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24oYmFzZVBvcy5hZGQoY2MudjIoMCwgMTIwKSksIDcwKTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlRGVmYXVsdEVuZXJneSgpIHtcclxuICAgICAgICBsZXQgZW5lcmd5ID0gbmV3IGNjLk5vZGUoXCJFbmVyZ3lJdGVtXCIpO1xyXG4gICAgICAgIGVuZXJneS5hZGRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZXJneTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0UmFuZG9tUGFzc2FibGVUaWxlKCkge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY2hlY2tMaXN0KTtcclxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2NoZWNrTGlzdFtrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV1dO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAmJiB0aGlzLl9pc0VuZXJneVRpbGVFbXB0eShpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLnYyKGl0ZW0ueCwgaXRlbS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2lzRW5lcmd5VGlsZUVtcHR5KHRpbGUpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpO1xyXG4gICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIk1pbkRpc3RhbmNlXCIsIDEyMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJMZW4gPSBwb3Muc3ViKHRoaXMuX3BsYXllci5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJMZW4gPCBtaW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX2VuZXJneXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBwb3Muc3ViKGVuZXJneS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgbWluRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pyA6L+R55qE5pWM5Lq6XHJcbiAgICBnZXROZWFyRW5lbXkoKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHJldExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGVuZW15UG9zID0gY2MudjIoZW5lbXkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IGVuZW15UG9zLnN1YihwbGF5ZXJQb3MpLm1hZygpXHJcbiAgICAgICAgICAgIGlmIChyZXQgPT0gbnVsbCB8fCBsZW4gPCByZXRMZW4pIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IGVuZW15O1xyXG4gICAgICAgICAgICAgICAgcmV0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WcqOWQjOS4gOS4qnRpbGUs6L+Y5pyJ5YW25LuW5pWM5Lq6XHJcbiAgICBpc0hhdmVPdGhlckVuZW15KGVuZW15KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG90aGVyRW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGlmIChvdGhlckVuZW15ICE9IGVuZW15KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMuZ2FtZVBvc1RvVGlsZShlbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3RoZXJUaWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKG90aGVyRW5lbXkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUueCA9PSBvdGhlclRpbGUueCAmJiB0aWxlLnkgPT0gb3RoZXJUaWxlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aMieS4i1xyXG4gICAgX29uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgICAgIGxldCBhID0xO1xyXG4gICAgICAgIC8vIGxldCBwb2ludCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAvLyBsZXQgdGlsZSA9IHRoaXMuZ2FtZVBvc1RvVGlsZShwb2ludCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXNldE1hcCgpIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoOyByb3crKykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodDsgY29sKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDEsIGNjLnYyKHJvdyxjb2wpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3RpbGVkIG1hcOWdkOagh+i9rOaNouS4uua4uOaIj+WdkOagh1xyXG4gICAgX3RpbGVQb3NUb0dhbWVQb3ModGlsZWRQb3MpIHtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGlsZWRQb3MueCwgdGhpcy5fdG1TaXplLmhlaWdodCAtIHRpbGVkUG9zLnkpO1xyXG4gICAgICAgIHBvcy54ID0gcG9zLnggLSB0aGlzLl90bVNpemUud2lkdGgvMjtcclxuICAgICAgICBwb3MueSA9IHBvcy55IC0gdGhpcy5fdG1TaXplLmhlaWdodC8yO1xyXG5cclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGlsZeWdkOagh+i9rOaNouS4uua4uOaIj+WdkOagh1xyXG4gICAgdGlsZVRvR2FtZVBvcyh0aWxlKSB7XHJcbiAgICAgICAgbGV0IHggPSB0aWxlLnggKiB0aGlzLl90aWxlU2l6ZS53aWR0aCArIHRoaXMuX3RpbGVTaXplLndpZHRoLzI7XHJcbiAgICAgICAgbGV0IHkgPSB0aWxlLnkgKiB0aGlzLl90aWxlU2l6ZS5oZWlnaHQgKyB0aGlzLl90aWxlU2l6ZS5oZWlnaHQvMjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVQb3NUb0dhbWVQb3MoY2MudjIoeCx5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/muLjmiI/lnZDmoIfovazmjaLkuLp0aWxlZCBtYXDlnZDmoIdcclxuICAgIF9nYW1lUG9zVG9UaWxlUG9zKGdhbWVQb3MpIHtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIoZ2FtZVBvcyk7XHJcbiAgICAgICAgcG9zLnggPSBwb3MueCArIHRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgIHBvcy55ID0gcG9zLnkgKyB0aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgcG9zLnkgPSB0aGlzLl90bVNpemUuaGVpZ2h0IC0gcG9zLnk7XHJcblxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy/muLjmiI/lnZDmoIfovazmjaLkuLp0aWxl5Z2Q5qCHXHJcbiAgICBnYW1lUG9zVG9UaWxlKGdhbWVQb3MpIHtcclxuICAgICAgICBsZXQgdGlsZVBvcyA9IHRoaXMuX2dhbWVQb3NUb1RpbGVQb3MoZ2FtZVBvcyk7XHJcbiAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKHRpbGVQb3MueCAvIHRoaXMuX3RpbGVTaXplLndpZHRoKTtcclxuICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IodGlsZVBvcy55IC8gdGhpcy5fdGlsZVNpemUuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yid5aeL5YyWQSrmo4DmtYvliJfooahcclxuICAgIGluaXRDaGVja0xpc3QgKCkge1xyXG4gICAgICAgIGxldCByZXQgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3MoY2MudjIoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVzdENvbGxpZGVycyhwb3MsNTApLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gOiBhbnk9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ueCA9IHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS55ID0geTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLkcgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uSCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mYXRoZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFzc2FibGUgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICByZXRbeCtcIl9cIit5XSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fdG1Hcm91cC5zZXRUaWxlR0lEQXQoMywgY2MudjIoeCx5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gcmV0W3grXCJfXCIreV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gdGhpcy50aWxlVG9HYW1lUG9zKGNjLnYyKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3eCA9IHgtMTsgbmV3eCA8PSB4KzE7IG5ld3grKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG5ld3kgPSB5LTE7IG5ld3kgPD0geSsxOyBuZXd5Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSByZXRbbmV3eCtcIl9cIituZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdQYXNzYWJsZUl0ZW0gPSBpdGVtLnBhc3NhYmxlW25ld3grXCJfXCIrbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHggIT0gbmV3eCB8fCB5ICE9IG5ld3kpICYmIG5ld0l0ZW0gJiYgbmV3UGFzc2FibGVJdGVtID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3MoY2MudjIobmV3eCwgbmV3eSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNpcmNsZUNpcmNsZVBhc3NDb2xsaWRlcnMocG9zLG5ld3Bvcyw1MCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXNzYWJsZVtuZXd4K1wiX1wiK25ld3ldID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5wYXNzYWJsZVt4K1wiX1wiK3ldID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5ZBKuajgOa1i+WIl+ihqFxyXG4gICAgZ2V0Q2hlY2tMaXN0ICgpIHtcclxuICAgICAgICB2YXIgb2JqU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fY2hlY2tMaXN0KTtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShvYmpTdHJpbmcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iOt+WPlnBvc+aJgOWcqHRpbGUs5pyA6L+R55qE5Y+v6YCa6KGMdGlsZVxyXG4gICAgZ2V0UGFzc2FibGVUaWxlICh0aWxlLHJlZmVyVGlsZSkge1xyXG4gICAgICAgIC8v5Yik5pat6Ieq5bexXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX2NoZWNrTGlzdFt0aWxlLnggKyBcIl9cIiArIHRpbGUueV0pIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHRpbGU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvL+WIpOaWreS4gOeOr1xyXG4gICAgICAgIGxldCByZXRUaWxlID0gbnVsbDtcclxuICAgICAgICBsZXQgcmV0TGVuID0gMDtcclxuICAgICAgICBmb3IgKGxldCB4ID0gLTE7IHggPD0gMTsgeCsrKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSAocmVmZXJUaWxlLngtbmV3eCkqKHJlZmVyVGlsZS54LW5ld3gpICsgKHJlZmVyVGlsZS55LW5ld3kpKihyZWZlclRpbGUueS1uZXd5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFRpbGUgPT0gbnVsbCB8fCBsZW4gPCByZXRMZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGUgPSBuZXd0aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXRUaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRUaWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/liKTmlq3kuoznjq9cclxuICAgICAgICByZXRUaWxlID0gbnVsbDtcclxuICAgICAgICByZXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAtMjsgeCA8PSAyOyB4Kyspe1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gLTI7IHkgPD0gMjsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGlmICh4ID09IC0yIHx8IHggPT0gMiB8fCB5ID09IC0yIHx8IHkgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gdGlsZS54ICsgeDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IHRpbGUueSArIHk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3RpbGUgPSB0aGlzLl9jaGVja0xpc3RbbmV3eCArIFwiX1wiICsgbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld3RpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0gKHJlZmVyVGlsZS54LW5ld3gpKihyZWZlclRpbGUueC1uZXd4KSArIChyZWZlclRpbGUueS1uZXd5KSoocmVmZXJUaWxlLnktbmV3eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRUaWxlID09IG51bGwgfHwgbGVuIDwgcmV0TGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRUaWxlID0gbmV3dGlsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldExlbiA9IGxlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0VGlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0VGlsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+WcG9z5omA5ZyodGlsZSzmnIDov5HnmoTlj6/pgJrooYx0aWxlXHJcbiAgICBnZXRQYXNzYWJsZVRpbGVFeCAodGlsZSkge1xyXG4gICAgICAgIC8v5Yik5pat5LiA546vXHJcbiAgICAgICAgbGV0IHJldFRpbGVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IC0yOyB4IDw9IDI7IHgrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMjsgeSA8PSAyOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKHggIT0gMCB8fCB5IT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gdGlsZS54ICsgeDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IHRpbGUueSArIHk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3RpbGUgPSB0aGlzLl9jaGVja0xpc3RbbmV3eCArIFwiX1wiICsgbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld3RpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRUaWxlcy5wdXNoKG5ld3RpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJldFRpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJldFRpbGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRUaWxlc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDnur/mrrVQUDEs5piv5ZCm5Lya57uP6L+HY29sbGlkZXJz5Lit55qE5LiA5p2h57q/5q61XHJcbiAgICBsaW5lTGluZVBhc3NDb2xsaWRlcnMoUCxQMSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2xsaWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMubGluZVBhc3NMaW5lKFAsUDEsQSxCKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOeCuVAsUDHkuLrlnIblv4MscmFkaXVz5Li65Y2K5b6E55qE5ZyGLOaYr+WQpuS8mue7j+i/h2NvbGxpZGVyc+S4reeahOS4gOadoee6v+autVxyXG4gICAgY2lyY2xlQ2lyY2xlUGFzc0NvbGxpZGVycyhQLFAxLHJhZGl1cyl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2xsaWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMuY2lyY2xlQ2lyY2xlUGFzc0xpbmUoUCxQMSxyYWRpdXMsQSxCKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v56Kw5pKe5rWL6K+VKOS7peeCuVDkuLrlnIblv4Ms5Y2K5b6E5Li6cmFkaXVz55qE5ZyGLOaYr+WQpuWSjGNvbGxpZGVyc+S4reeahOe6v+auteebuOS6pClcclxuICAgIHRlc3RDb2xsaWRlcnMoUCwgcmFkaXVzKXtcclxuICAgICAgICBsZXQgY29sbGlkZXJJdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2NvbGxpZGVycykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29sbGlkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1trZXldO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVySXRlbSA9IFV0aWxzLmdldFBvaW50TGluZVNob3J0ZXN0SW5mbyhQLCBBLCBCKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVySXRlbS5sZW4gPD0gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJJdGVtLmNvbGxpZGVyID0gY29sbGlkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJJdGVtcy5wdXNoKGNvbGxpZGVySXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlckl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5q+P5bin6LCD55SoXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGF1c2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlS2lsbEJyb2FkY2FzdEVudHJpZXMoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVPaWxTcGlsbHMoZHQpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUVuZXJneUVnZ1Rlc3QoKTtcclxuICAgICAgICBpZiAodGhpcy5fa2lsbFN0cmVha1JlbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fa2lsbFN0cmVha1JlbWFpbiAtPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2tpbGxTdHJlYWtSZW1haW4gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fa2lsbFN0cmVha1JlbWFpbiA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9raWxsU3RyZWFrQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9nYW1pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9ybkNkVGltZSArPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUZXN0TW9kZSgpID09IGZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID4gMSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLmxlbmd0aCA8IHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA8IHRoaXMuX21heEVuZW15Q291bnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRW5lbXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvL+WcsOWbvua7muWKqFxyXG4gICAgICAgICAgICB0aGlzLnJvbGxNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVGVzdE1vZGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlRW5lcmd5KGR0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckxhc3RQb3MgPSB0aGlzLl9wbGF5ZXIucG9zaXRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcm9hbUZsZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvYW1Qb3NpdGlvbiA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuYWRkKHRoaXMuX3JvYW1EaXIpO1xyXG4gICAgICAgICAgICAgICAgcm9hbVBvc2l0aW9uID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKHJvYW1Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9hbVBvc2l0aW9uLnggPT0gdGhpcy5ub2RlLnggJiYgcm9hbVBvc2l0aW9uLnkgPT0gdGhpcy5ub2RlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb2FtRGlyLnggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyktMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb2FtRGlyLnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyktMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggPSByb2FtUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSA9IHJvYW1Qb3NpdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVPaWxTcGlsbHMoZHQpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fb2lsU3BpbGxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGlsbCA9IHRoaXMuX29pbFNwaWxsc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzcGlsbCB8fCAhc3BpbGwubm9kZSB8fCAhY2MuaXNWYWxpZChzcGlsbC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzcGlsbC5saWZlVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYgKHNwaWxsLmxpZmVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHNwaWxsLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZmFkZVN0YXJ0ID0gTWF0aC5taW4oMi4yLCBzcGlsbC5kdXJhdGlvbiAqIDAuMyk7XHJcbiAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBpZiAoc3BpbGwubGlmZVRpbWUgPCBmYWRlU3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBNYXRoLmZsb29yKDI1NSAqIChzcGlsbC5saWZlVGltZSAvIGZhZGVTdGFydCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwaWxsLm5vZGUub3BhY2l0eSA9IE1hdGgubWF4KDAsIG9wYWNpdHkpO1xyXG4gICAgICAgICAgICBzcGlsbC5ub2RlLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc3BpbGwubm9kZS55KSAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Zyw5Zu+5rua5YqoXHJcbiAgICByb2xsTWFwKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgbGV0IHJldCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyLngsLXRoaXMuX3BsYXllci55KSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gcmV0Lng7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gcmV0Lnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNwYXduT2lsU3BpbGwocG9zLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdG1EZWNhbCB8fCAhY2MuaXNWYWxpZCh0aGlzLl90bURlY2FsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzcGlsbFBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGNjLnYyKHBvcyksIDY4KTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gb3B0aW9ucy5yYWRpdXMgfHwgT0lMX1NQSUxMX1JBRElVUztcclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uIHx8IE9JTF9TUElMTF9EVVJBVElPTjtcclxuICAgICAgICBsZXQgc2xvd0ZhY3RvciA9IG9wdGlvbnMuc2xvd0ZhY3RvciB8fCBPSUxfU1BJTExfU0xPV19GQUNUT1I7XHJcblxyXG4gICAgICAgIGxldCByb290ID0gbmV3IGNjLk5vZGUoXCJfb2lsU3BpbGxcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLl90bURlY2FsO1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24oY2MudjMoc3BpbGxQb3MpKTtcclxuICAgICAgICByb290LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc3BpbGxQb3MueSkgLSAyO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX29pbFNwaWxsU3ByaXRlXCIpO1xyXG4gICAgICAgIHNwcml0ZU5vZGUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBzcHJpdGVOb2RlLm9wYWNpdHkgPSAyMjg7XHJcbiAgICAgICAgc3ByaXRlTm9kZS5zZXRDb250ZW50U2l6ZShyYWRpdXMgKiAyLjE1LCByYWRpdXMgKiAyLjE1KTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gc3ByaXRlTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHNwcml0ZU5vZGUuY29sb3IgPSBjYy5jb2xvcig4MCwgNTYsIDMwLCAyMjgpO1xyXG4gICAgICAgIHRoaXMuX2xvYWRPaWxTcGlsbEZyYW1lKChzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlICYmIGNjLmlzVmFsaWQoc3ByaXRlKSAmJiBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHJpbSA9IG5ldyBjYy5Ob2RlKFwiX29pbFNwaWxsUmltXCIpO1xyXG4gICAgICAgIHJpbS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIGxldCByaW1HcmFwaGljcyA9IHJpbS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHJpbUdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgcmltR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxNDUsIDEwNCwgNjIsIDEzNSk7XHJcbiAgICAgICAgcmltR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAqIDAuOSk7XHJcbiAgICAgICAgcmltR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfb2lsU3BpbGxDb3JlXCIpO1xyXG4gICAgICAgIGNvcmUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBsZXQgY29yZUdyYXBoaWNzID0gY29yZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNiwgMTgsIDE0LCAxMTApO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzICogMC43Mik7XHJcbiAgICAgICAgY29yZUdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHNwbGFzaCA9IG5ldyBjYy5Ob2RlKFwiX29pbFNwaWxsU3BsYXNoXCIpO1xyXG4gICAgICAgIHNwbGFzaC5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNwbGFzaC5vcGFjaXR5ID0gMDtcclxuICAgICAgICBzcGxhc2guc2NhbGUgPSAwLjQ1O1xyXG4gICAgICAgIGxldCBzcGxhc2hHcmFwaGljcyA9IHNwbGFzaC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHNwbGFzaEdyYXBoaWNzLmxpbmVXaWR0aCA9IDc7XHJcbiAgICAgICAgc3BsYXNoR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigxODgsIDE0MiwgODYsIDE2MCk7XHJcbiAgICAgICAgc3BsYXNoR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAqIDAuNTgpO1xyXG4gICAgICAgIHNwbGFzaEdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIHNwbGFzaC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMSwgMjIwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjEyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yNCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjQsIDEuNTUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgc3BpbGwgPSB7XHJcbiAgICAgICAgICAgIG5vZGU6IHJvb3QsXHJcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICBzbG93RmFjdG9yOiBzbG93RmFjdG9yLFxyXG4gICAgICAgICAgICBsaWZlVGltZTogZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX29pbFNwaWxscy5wdXNoKHNwaWxsKTtcclxuICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXJyYWluU3BlZWRGYWN0b3IocG9zLCByYWRpdXMgPSAwKSB7XHJcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XHJcbiAgICAgICAgbGV0IGNoZWNrUG9zID0gY2MudjIocG9zKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fb2lsU3BpbGxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGlsbCA9IHRoaXMuX29pbFNwaWxsc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzcGlsbCB8fCAhc3BpbGwubm9kZSB8fCAhY2MuaXNWYWxpZChzcGlsbC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2lsU3BpbGxzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbGltaXQgPSBzcGlsbC5yYWRpdXMgKyByYWRpdXMgKiAwLjM1O1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tQb3Muc3ViKHNwaWxsLm5vZGUucG9zaXRpb24pLm1hZygpIDw9IGxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICBmYWN0b3IgPSBNYXRoLm1pbihmYWN0b3IsIHNwaWxsLnNsb3dGYWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUVuZXJneUVnZ1Rlc3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUVnZ3MubGVuZ3RoIDw9IDAgJiYgdGhpcy5fZW5lcmd5RWdnQnVzaGVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGJ1c2ggPSB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXNbaV07XHJcbiAgICAgICAgICAgIGlmICghYnVzaCB8fCAhYnVzaC5ub2RlIHx8ICFjYy5pc1ZhbGlkKGJ1c2gubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ0J1c2hlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidXNoLm5vZGUuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChidXNoLm5vZGUueSkgKyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VuZXJneUVnZ3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGVnZyA9IHRoaXMuX2VuZXJneUVnZ3NbaV07XHJcbiAgICAgICAgICAgIGlmICghZWdnIHx8ICFlZ2cubm9kZSB8fCAhY2MuaXNWYWxpZChlZ2cubm9kZSkgfHwgIWVnZy5zY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneUVnZ3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBoaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBidXNoID0gdGhpcy5fZW5lcmd5RWdnQnVzaGVzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFidXNoIHx8ICFidXNoLm5vZGUgfHwgIWNjLmlzVmFsaWQoYnVzaC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnYyKGVnZy5ub2RlLnBvc2l0aW9uKS5zdWIoYnVzaC5ub2RlLnBvc2l0aW9uKS5tYWcoKSA8PSBidXNoLnJhZGl1cyAqIDAuNzgpIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVnZy5zY3JpcHQuc2V0SGlkZGVuSW5CdXNoKGhpZGRlbik7XHJcbiAgICAgICAgICAgIGVnZy5ub2RlLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZWdnLm5vZGUueSkgKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikgJiYgdGhpcy5fcGxheWVyLnNjcmlwdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wdXNoRW5lcmd5RWdnc0J5UGxheWVyKHRoaXMuX3BsYXllci5zY3JpcHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcHVzaEVuZXJneUVnZ3NCeVBsYXllcihwbGF5ZXIpIHtcclxuICAgICAgICBpZiAoIXBsYXllciB8fCAhcGxheWVyLm5vZGUgfHwgIWNjLmlzVmFsaWQocGxheWVyLm5vZGUpIHx8IHBsYXllci5fY3VycmVudFNwZWVkIDw9IDAuMjUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHBsYXllci5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgcGxheWVyRGlyID0gcGxheWVyLl9kaXIgJiYgcGxheWVyLl9kaXIubWFnU3FyKCkgPiAwID8gY2MudjIocGxheWVyLl9kaXIpLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgbGV0IHBsYXllclJhZGl1cyA9IHBsYXllci5nZXRSYWRpdXMgPyBwbGF5ZXIuZ2V0UmFkaXVzKCkgOiAzODtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneUVnZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVnZyA9IHRoaXMuX2VuZXJneUVnZ3NbaV07XHJcbiAgICAgICAgICAgIGlmICghZWdnIHx8ICFlZ2cubm9kZSB8fCAhY2MuaXNWYWxpZChlZ2cubm9kZSkgfHwgIWVnZy5zY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZWdnUG9zID0gY2MudjIoZWdnLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gZWdnUG9zLnN1YihwbGF5ZXJQb3MpO1xyXG4gICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSBwbGF5ZXJSYWRpdXMgKiAwLjQ4ICsgZWdnLnNjcmlwdC5nZXRSYWRpdXMoKSArIDg7XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXQubWFnKCkgPiBtaW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwdXNoRGlyID0gb2Zmc2V0Lm1hZ1NxcigpID4gOSA/IG9mZnNldC5ub3JtYWxpemUoKSA6IHBsYXllckRpcjtcclxuICAgICAgICAgICAgaWYgKHB1c2hEaXIuZG90KHBsYXllckRpcikgPCAtMC4yKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHB1c2hEaXN0YW5jZSA9IE1hdGgubWF4KDEuNiwgcGxheWVyLl9jdXJyZW50U3BlZWQgKiAoZWdnLnNjcmlwdC5pc01hdHVyZSgpID8gMC40MiA6IDAuNjIpKTtcclxuICAgICAgICAgICAgbGV0IG5leHRQb3MgPSB0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihlZ2dQb3MuYWRkKHB1c2hEaXIubXVsKHB1c2hEaXN0YW5jZSkpLCBlZ2cuc2NyaXB0LmdldFJhZGl1cygpICsgOCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDb2xsaWRlcnMobmV4dFBvcywgZWdnLnNjcmlwdC5nZXRSYWRpdXMoKSArIDMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0VuZXJneUVnZ0Jsb2NrZWRCeU90aGVyRWdnKGVnZywgbmV4dFBvcykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlZ2cubm9kZS5zZXRQb3NpdGlvbihjYy52MyhuZXh0UG9zKSk7XHJcbiAgICAgICAgICAgIGVnZy5ub2RlLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgobmV4dFBvcy55KSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9pc0VuZXJneUVnZ0Jsb2NrZWRCeU90aGVyRWdnKGN1cnJlbnRFZ2csIG5leHRQb3MpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneUVnZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG90aGVyID0gdGhpcy5fZW5lcmd5RWdnc1tpXTtcclxuICAgICAgICAgICAgaWYgKG90aGVyID09IGN1cnJlbnRFZ2cgfHwgIW90aGVyIHx8ICFvdGhlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKG90aGVyLm5vZGUpIHx8ICFvdGhlci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBsaW1pdCA9IGN1cnJlbnRFZ2cuc2NyaXB0LmdldFJhZGl1cygpICsgb3RoZXIuc2NyaXB0LmdldFJhZGl1cygpICsgODtcclxuICAgICAgICAgICAgaWYgKGNjLnYyKG90aGVyLm5vZGUucG9zaXRpb24pLnN1YihuZXh0UG9zKS5tYWcoKSA8IGxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFZpZXdwb3J0U2l6ZSgpIHtcclxuICAgICAgICBsZXQgY2FudmFzID0gVXRpbHMuZ2V0Q3VycmVudFNjZW5lQ2FudmFzKCk7XHJcbiAgICAgICAgaWYgKGNhbnZhcyAmJiBjYy5pc1ZhbGlkKGNhbnZhcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmlzaWJsZVNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XHJcbiAgICAgICAgaWYgKHZpc2libGVTaXplICYmIHZpc2libGVTaXplLndpZHRoID4gMCAmJiB2aXNpYmxlU2l6ZS5oZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aXNpYmxlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHl5cC5nYW1lRnJhbWVTaXplKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5eXAuZ2FtZUZyYW1lU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLndpblNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgcGFkZGluZyA9IDApIHtcclxuICAgICAgICBsZXQgcmV0ID0gY2MudjIocG9zKTtcclxuICAgICAgICBsZXQgaGFsZldpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy5fdG1TaXplLndpZHRoIC8gMiAtIHBhZGRpbmcpO1xyXG4gICAgICAgIGxldCBoYWxmSGVpZ2h0ID0gTWF0aC5tYXgoMCwgdGhpcy5fdG1TaXplLmhlaWdodCAvIDIgLSBwYWRkaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKHJldC54IDwgLWhhbGZXaWR0aCkge1xyXG4gICAgICAgICAgICByZXQueCA9IC1oYWxmV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueCA+IGhhbGZXaWR0aCkge1xyXG4gICAgICAgICAgICByZXQueCA9IGhhbGZXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55IDwgLWhhbGZIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSAtaGFsZkhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55ID4gaGFsZkhlaWdodCkge1xyXG4gICAgICAgICAgICByZXQueSA9IGhhbGZIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfY29ycmVjdE1hcFBvc2l0aW9uKHJldCl7XHJcbiAgICAgICAgbGV0IHZpZXdwb3J0U2l6ZSA9IHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpO1xyXG4gICAgICAgIGxldCB4ID0gTWF0aC5tYXgoMCwgKHRoaXMuX3RtU2l6ZS53aWR0aCAtIHZpZXdwb3J0U2l6ZS53aWR0aCkgLyAyKTtcclxuICAgICAgICBsZXQgeSA9IE1hdGgubWF4KDAsICh0aGlzLl90bVNpemUuaGVpZ2h0IC0gdmlld3BvcnRTaXplLmhlaWdodCkgLyAyKTtcclxuICAgICAgICBsZXQgbWluUG9zID0gY2MudjIoLXgsLXkpO1xyXG4gICAgICAgIGxldCBtYXhQb3MgPSBjYy52Mih4LHkpO1xyXG5cclxuICAgICAgICBpZiAocmV0LnggPCBtaW5Qb3MueCkge1xyXG4gICAgICAgICAgICByZXQueCA9IG1pblBvcy54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnggPiBtYXhQb3MueCkge1xyXG4gICAgICAgICAgICByZXQueCA9IG1heFBvcy54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPCBtaW5Qb3MueSkge1xyXG4gICAgICAgICAgICByZXQueSA9IG1pblBvcy55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPiBtYXhQb3MueSkge1xyXG4gICAgICAgICAgICByZXQueSA9IG1heFBvcy55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+e6v+auteS4juefqeW9ouebuOS6pOaIluiAheWMheWQq+WcqOefqeW9oumHjOmdolxyXG4gICAgX2xpbmVJblJlY3QoQSxCLHJlY3Qpe1xyXG4gICAgICAgIGlmICgoQS54ID49IHJlY3QueCAmJiBBLnggPD0gcmVjdC54ICsgcmVjdC53aWR0aCAmJiBBLnkgPj0gcmVjdC55ICYmIEEueSA8PSByZWN0LnkgKyByZWN0LmhlaWdodCkgfHxcclxuICAgICAgICAgICAgKEIueCA+PSByZWN0LnggJiYgQi54IDw9IHJlY3QueCArIHJlY3Qud2lkdGggJiYgQi55ID49IHJlY3QueSAmJiBCLnkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQpIHx8XHJcbiAgICAgICAgICAgIGNjLkludGVyc2VjdGlvbi5saW5lUmVjdChBLEIscmVjdCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Q5by5LOmanOeijeeJqeeisOaSnuajgOa1i1xyXG4gICAgYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KFAsUDEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudChQLCBQMSkgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoUCwgUDEpIHtcclxuICAgICAgICAvL+iOt+WPlueisOaSnuWMulxyXG4gICAgICAgIGxldCBjdXJyQXJlYSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9sb2dpY0FyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSB0aGlzLl9sb2dpY0FyZWFbaV07XHJcbiAgICAgICAgICAgIGlmIChQLnggPj0gYXJlYS54ICYmIFAueCA8PSBhcmVhLnggKyBhcmVhLndpZHRoICYmIFAueSA+PSBhcmVhLnkgJiYgUC55IDw9IGFyZWEueSArIGFyZWEuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyQXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJBcmVhKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VyckFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBBID0gY3VyckFyZWFbaV0uQTtcclxuICAgICAgICAgICAgICAgIGxldCBCID0gY3VyckFyZWFbaV0uQjtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ubGluZUxpbmUoUCxQMSxBLEIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtBOiBBLCBCOiBCfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCLmnKrmib7liLDnorDmkp7liIbljLpcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQocG9pbnQsIEEsIEIpIHtcclxuICAgICAgICBsZXQgQUIgPSBCLnN1YihBKTtcclxuICAgICAgICBsZXQgbGVuU3FyID0gQUIubWFnU3FyKCk7XHJcbiAgICAgICAgaWYgKGxlblNxciA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb2ludC5zdWIoQSkubWFnKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdCA9IHBvaW50LnN1YihBKS5kb3QoQUIpIC8gbGVuU3FyO1xyXG4gICAgICAgIHQgPSBjYy5taXNjLmNsYW1wZih0LCAwLCAxKTtcclxuICAgICAgICBsZXQgcHJvamVjdGlvbiA9IEEuYWRkKEFCLm11bCh0KSk7XHJcbiAgICAgICAgcmV0dXJuIHBvaW50LnN1Yihwcm9qZWN0aW9uKS5tYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYW51cEludmFsaWRDb3ZlclRlc3RDb3ZlcnMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2NvdmVyVGVzdENvdmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgY292ZXIgPSB0aGlzLl9jb3ZlclRlc3RDb3ZlcnNbaV07XHJcbiAgICAgICAgICAgIGlmICghY292ZXIgfHwgIWNvdmVyLm5vZGUgfHwgIWNjLmlzVmFsaWQoY292ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvdmVyVGVzdENvdmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEF0dGFjaGVkQ292ZXJUZXN0Q292ZXIocGxheWVyID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX2NsZWFudXBJbnZhbGlkQ292ZXJUZXN0Q292ZXJzKCk7XHJcbiAgICAgICAgbGV0IG93bmVyTm9kZSA9IHBsYXllciAmJiBwbGF5ZXIubm9kZSA/IHBsYXllci5ub2RlIDogbnVsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvdmVyVGVzdENvdmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY292ZXIgPSB0aGlzLl9jb3ZlclRlc3RDb3ZlcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChjb3ZlciAmJiBjb3Zlci5hdHRhY2hlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvd25lck5vZGUgfHwgY292ZXIub3duZXIgPT0gb3duZXJOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdmVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXROZWFyZXN0QXR0YWNoYWJsZUNvdmVyKHBsYXllcikge1xyXG4gICAgICAgIGlmICghcGxheWVyIHx8ICFwbGF5ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChwbGF5ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jbGVhbnVwSW52YWxpZENvdmVyVGVzdENvdmVycygpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52MihwbGF5ZXIubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IG5lYXJlc3QgPSBudWxsO1xyXG4gICAgICAgIGxldCBuZWFyZXN0TGVuID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvdmVyVGVzdENvdmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY292ZXIgPSB0aGlzLl9jb3ZlclRlc3RDb3ZlcnNbaV07XHJcbiAgICAgICAgICAgIGlmICghY292ZXIgfHwgIWNvdmVyLm5vZGUgfHwgIWNjLmlzVmFsaWQoY292ZXIubm9kZSkgfHwgY292ZXIuYXR0YWNoZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSBwbGF5ZXJQb3Muc3ViKGNvdmVyLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICBpZiAobGVuIDw9IDExMCAmJiAobmVhcmVzdCA9PSBudWxsIHx8IGxlbiA8IG5lYXJlc3RMZW4pKSB7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0ID0gY292ZXI7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZWFyZXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hDb3ZlclRlc3RCdXR0b24ocGxheWVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb3ZlclRlc3RNb2RlIHx8ICFwbGF5ZXIgfHwgIXBsYXllci5ub2RlIHx8ICFjYy5pc1ZhbGlkKHBsYXllci5ub2RlKSkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhdHRhY2hlZCA9IHRoaXMuX2dldEF0dGFjaGVkQ292ZXJUZXN0Q292ZXIocGxheWVyKTtcclxuICAgICAgICBpZiAoYXR0YWNoZWQpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTp0cnVlLCBtb2RlOlwiZGV0YWNoXCJ9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5lYXJlc3QgPSB0aGlzLl9nZXROZWFyZXN0QXR0YWNoYWJsZUNvdmVyKHBsYXllcik7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTohIW5lYXJlc3QsIG1vZGU6XCJhdHRhY2hcIn0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeVRvZ2dsZUNvdmVyVGVzdEF0dGFjaG1lbnQocGxheWVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb3ZlclRlc3RNb2RlIHx8ICFwbGF5ZXIgfHwgIXBsYXllci5ub2RlIHx8ICFjYy5pc1ZhbGlkKHBsYXllci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXR0YWNoZWQgPSB0aGlzLl9nZXRBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllcik7XHJcbiAgICAgICAgaWYgKGF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RldGFjaENvdmVyVGVzdENvdmVyKGF0dGFjaGVkKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5lYXJlc3QgPSB0aGlzLl9nZXROZWFyZXN0QXR0YWNoYWJsZUNvdmVyKHBsYXllcik7XHJcbiAgICAgICAgaWYgKCFuZWFyZXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuX3Nob3dTYWNyaWZpY2VUaXApIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5fc2hvd1NhY3JpZmljZVRpcChcIumdoOi/keaOqeS9k+WQjuaJjeiDveWQuOmZhFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hDb3ZlclRlc3RCdXR0b24ocGxheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYXR0YWNoQ292ZXJUZXN0Q292ZXIobmVhcmVzdCwgcGxheWVyKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hDb3ZlclRlc3RCdXR0b24ocGxheWVyKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfYXR0YWNoQ292ZXJUZXN0Q292ZXIoY292ZXIsIHBsYXllcikge1xyXG4gICAgICAgIGlmICghY292ZXIgfHwgIWNvdmVyLm5vZGUgfHwgIWNjLmlzVmFsaWQoY292ZXIubm9kZSkgfHwgIXBsYXllciB8fCAhcGxheWVyLm5vZGUgfHwgIWNjLmlzVmFsaWQocGxheWVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXQgPSBjYy52Mihjb3Zlci5ub2RlLnBvc2l0aW9uKS5zdWIocGxheWVyLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGlmIChvZmZzZXQubWFnU3FyKCkgPD0gMjUpIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gcGxheWVyLl9kaXIgJiYgcGxheWVyLl9kaXIubWFnU3FyKCkgPiAwID8gcGxheWVyLl9kaXIubm9ybWFsaXplKCkubXVsKDcwKSA6IGNjLnYyKDcwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0Lm5vcm1hbGl6ZSgpLm11bChNYXRoLm1heCg2MCwgTWF0aC5taW4oODQsIG9mZnNldC5tYWcoKSkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvdmVyLmF0dGFjaGVkID0gdHJ1ZTtcclxuICAgICAgICBjb3Zlci5vd25lciA9IHBsYXllci5ub2RlO1xyXG4gICAgICAgIGNvdmVyLmF0dGFjaE9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICB0aGlzLnN5bmNBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgX2RldGFjaENvdmVyVGVzdENvdmVyKGNvdmVyKSB7XHJcbiAgICAgICAgaWYgKCFjb3Zlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvdmVyLmF0dGFjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgY292ZXIub3duZXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlRGV0YWNoQ292ZXJUZXN0RnJvbVBsYXllcihwbGF5ZXIpIHtcclxuICAgICAgICBsZXQgYXR0YWNoZWQgPSB0aGlzLl9nZXRBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllcik7XHJcbiAgICAgICAgaWYgKGF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RldGFjaENvdmVyVGVzdENvdmVyKGF0dGFjaGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN5bmNBdHRhY2hlZENvdmVyVGVzdENvdmVyKHBsYXllcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fY292ZXJUZXN0TW9kZSB8fCAhcGxheWVyIHx8ICFwbGF5ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChwbGF5ZXIubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fZ2V0QXR0YWNoZWRDb3ZlclRlc3RDb3ZlcihwbGF5ZXIpO1xyXG4gICAgICAgIGlmICghY292ZXIgfHwgIWNvdmVyLmF0dGFjaE9mZnNldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9zID0gY2MudjIocGxheWVyLm5vZGUucG9zaXRpb24pLmFkZChjb3Zlci5hdHRhY2hPZmZzZXQpO1xyXG4gICAgICAgIHBvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgY292ZXIucmFkaXVzICsgNik7XHJcbiAgICAgICAgY292ZXIubm9kZS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBjb3Zlci5ub2RlLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgocG9zLnkpICsgMTtcclxuICAgIH1cclxuXHJcbiAgICB0cnlIYW5kbGVDb3ZlckJ1bGxldENvbGxpc2lvbihmcm9tUG9zLCB0b1BvcywgYnVsbGV0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb3ZlclRlc3RNb2RlIHx8ICFidWxsZXQgfHwgYnVsbGV0Ll9jYW1wICE9IFwiZW5lbXlcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jbGVhbnVwSW52YWxpZENvdmVyVGVzdENvdmVycygpO1xyXG4gICAgICAgIGxldCBoaXRDb3ZlciA9IG51bGw7XHJcbiAgICAgICAgbGV0IGhpdExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb3ZlclRlc3RDb3ZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyID0gdGhpcy5fY292ZXJUZXN0Q292ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0aGlzLl9kaXN0YW5jZVBvaW50VG9TZWdtZW50KGNjLnYyKGNvdmVyLm5vZGUucG9zaXRpb24pLCBjYy52Mihmcm9tUG9zKSwgY2MudjIodG9Qb3MpKTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGNvdmVyLnJhZGl1cyArIDQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBjYy52Mihjb3Zlci5ub2RlLnBvc2l0aW9uKS5zdWIoZnJvbVBvcykubWFnU3FyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGl0Q292ZXIgPT0gbnVsbCB8fCBsZW4gPCBoaXRMZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBoaXRDb3ZlciA9IGNvdmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpdExlbiA9IGxlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFoaXRDb3Zlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYW1hZ2VDb3ZlclRlc3RDb3ZlcihoaXRDb3ZlciwgYnVsbGV0KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfZGFtYWdlQ292ZXJUZXN0Q292ZXIoY292ZXIsIGJ1bGxldCA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIWNvdmVyIHx8ICFjb3Zlci5ub2RlIHx8ICFjYy5pc1ZhbGlkKGNvdmVyLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvdmVyLmhwID0gTWF0aC5tYXgoMCwgY292ZXIuaHAgLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQ292ZXJUZXN0Q292ZXJWaXN1YWwoY292ZXIpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlDb3ZlclRlc3RIaXRFZmZlY3QoY292ZXIpO1xyXG4gICAgICAgIGlmIChidWxsZXQpIHtcclxuICAgICAgICAgICAgaWYgKGJ1bGxldC5kb0Rlc3Ryb3kpIHtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5kb0Rlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChidWxsZXQubm9kZSAmJiBjYy5pc1ZhbGlkKGJ1bGxldC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY292ZXIuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9icmVha0NvdmVyVGVzdENvdmVyKGNvdmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSAmJiB0aGlzLl9wbGF5ZXIuc2NyaXB0ICYmIHRoaXMuX2NvdmVyVGVzdE1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHRoaXMuX3BsYXllci5zY3JpcHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcGxheUNvdmVyVGVzdEhpdEVmZmVjdChjb3Zlcikge1xyXG4gICAgICAgIGxldCBmbGFzaCA9IG5ldyBjYy5Ob2RlKFwiX2NvdmVySGl0RnhcIik7XHJcbiAgICAgICAgZmxhc2gucGFyZW50ID0gY292ZXIubm9kZTtcclxuICAgICAgICBmbGFzaC5vcGFjaXR5ID0gMTkwO1xyXG4gICAgICAgIGZsYXNoLnNjYWxlID0gMC43MjtcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBmbGFzaC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIyMCwgMTYwLCAyMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLnJlY3QoLTI0LCAtMjQsIDQ4LCA0OCk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZmxhc2gucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wOCwgMS4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMDgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9icmVha0NvdmVyVGVzdENvdmVyKGNvdmVyKSB7XHJcbiAgICAgICAgaWYgKCFjb3ZlciB8fCAhY292ZXIubm9kZSB8fCAhY2MuaXNWYWxpZChjb3Zlci5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnJlYWtQb3MgPSBjYy52Mihjb3Zlci5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLl9kZXRhY2hDb3ZlclRlc3RDb3Zlcihjb3Zlcik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNoYXJkID0gbmV3IGNjLk5vZGUoXCJfY292ZXJTaGFyZFwiKTtcclxuICAgICAgICAgICAgc2hhcmQucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgICAgICBzaGFyZC5zZXRQb3NpdGlvbihjYy52MyhicmVha1BvcykpO1xyXG4gICAgICAgICAgICBzaGFyZC56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGJyZWFrUG9zLnkpICsgMztcclxuICAgICAgICAgICAgbGV0IGdyYXBoaWNzID0gc2hhcmQuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMTU4ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzIpLCAxMTIsIDY4LCAyNDApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5yZWN0KC01LCAtNSwgMTAsIDEwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJICogMiAqIGkgLyA2ICsgTWF0aC5yYW5kb20oKSAqIDAuNDtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gMjYgKyBNYXRoLnJhbmRvbSgpICogMjI7XHJcbiAgICAgICAgICAgIHNoYXJkLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjIyLCBNYXRoLmNvcyhhbmdsZSkgKiBkaXN0YW5jZSwgTWF0aC5zaW4oYW5nbGUpICogZGlzdGFuY2UgKyAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlQnkoMC4yMiwgMTUwICsgTWF0aC5yYW5kb20oKSAqIDE4MCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIyKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvdmVyLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFudXBJbnZhbGlkQ292ZXJUZXN0Q292ZXJzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikgJiYgdGhpcy5fcGxheWVyLnNjcmlwdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hDb3ZlclRlc3RCdXR0b24odGhpcy5fcGxheWVyLnNjcmlwdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyeVRlbGVwb3J0QnVsbGV0KGJ1bGxldCwgZnJvbVBvcywgdG9Qb3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BvcnRhbFRlc3RNb2RlIHx8ICFidWxsZXQgfHwgIXRoaXMuX3BvcnRhbFBhaXJzIHx8IHRoaXMuX3BvcnRhbFBhaXJzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpZ25vcmVQb3J0YWxJZCA9IGJ1bGxldC5nZXRQb3J0YWxJZ25vcmVJZCA/IGJ1bGxldC5nZXRQb3J0YWxJZ25vcmVJZCgpIDogXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BvcnRhbFBhaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3J0YWwgPSB0aGlzLl9wb3J0YWxQYWlyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHBvcnRhbC5pZCA9PSBpZ25vcmVQb3J0YWxJZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3RhbmNlUG9pbnRUb1NlZ21lbnQocG9ydGFsLnBvcywgY2MudjIoZnJvbVBvcyksIGNjLnYyKHRvUG9zKSkgPiBwb3J0YWwucmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGV4aXRPZmZzZXQgPSBidWxsZXQuX2RpciAmJiBidWxsZXQuX2Rpci5tYWdTcXIoKSA+IDBcclxuICAgICAgICAgICAgICAgID8gYnVsbGV0Ll9kaXIubm9ybWFsaXplKCkubXVsKHBvcnRhbC5yYWRpdXMgKyBNYXRoLm1heCgxNiwgYnVsbGV0Ll9zcGVlZCAqIDEuOCkpXHJcbiAgICAgICAgICAgICAgICA6IGNjLnYyKHBvcnRhbC5yYWRpdXMgKyAxOCwgMCk7XHJcbiAgICAgICAgICAgIGxldCBleGl0UG9zID0gdGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9ydGFsLmV4aXRQb3MuYWRkKGV4aXRPZmZzZXQpLCA0MCk7XHJcbiAgICAgICAgICAgIGlmIChidWxsZXQudGVsZXBvcnRCeVBvcnRhbCkge1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnRlbGVwb3J0QnlQb3J0YWwoZXhpdFBvcywgcG9ydGFsLmV4aXRJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3Bhd25Qb3J0YWxXYXJwRngocG9ydGFsLnBvcywgY2MuY29sb3IoMTEwLCAyNTUsIDI0NSwgMjU1KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwYXduUG9ydGFsV2FycEZ4KHBvcnRhbC5leGl0UG9zLCBjYy5jb2xvcigyNTUsIDEyMCwgMjIwLCAyNTUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5RW50ZXJDZW50cmlmdWdhbFJpbmcoYnVsbGV0LCBmcm9tUG9zLCB0b1Bvcykge1xyXG4gICAgICAgIGlmICghdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgfHwgIWJ1bGxldCB8fCAhdGhpcy5fY2VudHJpZnVnYWxSaW5nRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXQuaGFzVXNlZENlbnRyaWZ1Z2FsUmluZyAmJiBidWxsZXQuaGFzVXNlZENlbnRyaWZ1Z2FsUmluZygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByaW5nID0gdGhpcy5fY2VudHJpZnVnYWxSaW5nRGF0YTtcclxuICAgICAgICBpZiAodGhpcy5fZGlzdGFuY2VQb2ludFRvU2VnbWVudChyaW5nLmNlbnRlciwgY2MudjIoZnJvbVBvcyksIGNjLnYyKHRvUG9zKSkgPiByaW5nLnRyaWdnZXJSYWRpdXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldC5lbnRlckNlbnRyaWZ1Z2FsUmluZyA/IGJ1bGxldC5lbnRlckNlbnRyaWZ1Z2FsUmluZyhyaW5nKSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy/lrZDlvLks56Kw5pKe5qOA5rWLXHJcbiAgICBidWxsZXRFbmVteUNvbGxpc2lvblRlc3QoUCxjYW1wKXtcclxuICAgICAgICBpZiAoY2FtcCA9PSBcInBsYXllclwiKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBQLnN1YihlbmVteS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gZW5lbXkuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmVteTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IFAuc3ViKHRoaXMuX3BsYXllci5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRSYWRpdXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPCByYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXHJcbiAgICBwbGF5ZXJTa2lsbEljb25Db2xsaXNpb25UZXN0KCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9za2lsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsID0gdGhpcy5fc2tpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChza2lsbCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZWN0ID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRQbGF5ZXJCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraWxsUmVjdCA9IHNraWxsLnNjcmlwdC5nZXRTa2lsbEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHBsYXllclJlY3Qsc2tpbGxSZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9za2lsbHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGxzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBsYXllckVuZXJneUNvbGxpc2lvblRlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWSjOiDvemHjyznorDmkp7mo4DmtYtcclxuICAgIHBsYXllckVuZXJneUNvbGxpc2lvblRlc3QoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX2VuZXJneXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbmVyZ3lTY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVyZ3lzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZWN0ID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRQbGF5ZXJCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZXJneVJlY3QgPSBlbmVyZ3lTY3JpcHQuZ2V0RW5lcmd5Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3QocGxheWVyUmVjdCwgZW5lcmd5UmVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIuc2NyaXB0LmFkZEVuZXJneShlbmVyZ3lTY3JpcHQuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lcmd5LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUVuZXJneShkdCkge1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUNkVGltZSArPSBkdDtcclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJCb3JuSW50ZXJ2YWxcIiwgNCk7XHJcbiAgICAgICAgbGV0IG1heENvdW50ID0gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiTWF4Q291bnRcIiwgNik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUNkVGltZSA8IGludGVydmFsIHx8IHRoaXMuX2VuZXJneXMubGVuZ3RoID49IG1heENvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZXJneUNkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFbmVyZ3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul3pJbmRleFxyXG4gICAganVkZ2V6SW5kZXgoeSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSBNYXRoLmZsb29yKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5ri45oiPXHJcbiAgICBzdGFydEdhbWUoZnVuYyl7XHJcbiAgICAgICAgLy/ojrflj5blhbPljaHmlbDmja5cclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gdGhpcy5fbGV2ZWxDb25maWcuRW5lbXlDb3VudCAqIHRoaXMuX2xldmVsSWQ7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSB0aGlzLl9sZXZlbENvbmZpZy5NYXggKyBNYXRoLmZsb29yKHRoaXMuX2xldmVsSWQvNSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ3N0YXJ0X2dhbWUnLHtcImxldmVsXCI6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0S2lsbEVmZmVjdFRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVLaWxsRWZmZWN0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0S2lsbEJyb2FkY2FzdFRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDU7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSA1O1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gNTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6NX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVLaWxsQnJvYWRjYXN0VGVzdEVuZW1pZXMoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRQbGF5ZXJIaXRUZXN0R2FtZShmdW5jKXtcclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3BlZWREb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OjF9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVySGl0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNob290RWZmZWN0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNob290RWZmZWN0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0UG9ydGFsVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBvcnRhbFRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydENlbnRyaWZ1Z2FsUmluZ1Rlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDZW50cmlmdWdhbFJpbmdUZXN0U2V0dXAoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRDb3ZlclRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fa2lsbEJyb2FkY2FzdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFJpbmdUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDb3ZlclRlc3RFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zcGF3bkNvdmVyVGVzdENvdmVycyg2KTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRFbmVyZ3lFZ2dUZXN0R2FtZShmdW5jKXtcclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRLaWxsQnJvYWRjYXN0UnVudGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OjB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlRW5lcmd5RWdnVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGFtYWdlRG91YmxlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZURhbWFnZURvdWJsZVRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNwZWVkRG91YmxlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNwZWVkRG91YmxlVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U3ByZWFkQnVsbGV0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlT2JzdGFjbGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVNwcmVhZEJ1bGxldFRlc3RTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEJvdW5jZU9ic3RhY2xlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0S2lsbEJyb2FkY2FzdFJ1bnRpbWUoKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsUmluZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ1Rlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VPYnN0YWNsZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZUJvdW5jZU9ic3RhY2xlVGVzdFNldHVwKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVGVzdE1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSB8fCB0aGlzLl9raWxsQnJvYWRjYXN0VGVzdE1vZGUgfHwgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgfHwgdGhpcy5fdXBncmFkZVRlc3RNb2RlIHx8IHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGUgfHwgdGhpcy5fcG9ydGFsVGVzdE1vZGUgfHwgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgfHwgdGhpcy5fY292ZXJUZXN0TW9kZSB8fCB0aGlzLl9lbmVyZ3lFZ2dUZXN0TW9kZSB8fCB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSB8fCB0aGlzLl9zcGVlZERvdWJsZVRlc3RNb2RlIHx8IHRoaXMuX3NwcmVhZEJ1bGxldFRlc3RNb2RlIHx8IHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTaG9vdEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzS2lsbEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNLaWxsQnJvYWRjYXN0VGVzdE1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLaWxsRWZmZWN0VGVzdEVuZW15RGVhdGgoZW5lbXlOb2RlKSB7XHJcbiAgICAgICAgaWYgKCFlbmVteU5vZGUgfHwgIWNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVhdGhQb3MgPSBjYy52MihlbmVteU5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRW5lbXkoZW5lbXlOb2RlKTtcclxuICAgICAgICBpZiAoZW5lbXlOb2RlLnNjcmlwdCkge1xyXG4gICAgICAgICAgICBlbmVteU5vZGUuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5lbXlOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd0tpbGxTa3VsbChkZWF0aFBvcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93UGxheWVyQnViYmxlKFwi5bCx6L+Z77yfXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMTUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5S2lsbEV4cGxvc2lvbkVmZmVjdEF0KGRlYXRoUG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZChzZWxmLl9wbGF5ZXIpICYmIHNlbGYuX3BsYXllci5zY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAmJiBzZWxmLl9wbGF5ZXIuc2NyaXB0Ll9zcGF3bkRlYXRoQWZ0ZXJtYXRoQXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9wbGF5ZXIuc2NyaXB0Ll9zcGF3bkRlYXRoQWZ0ZXJtYXRoQXQoZGVhdGhQb3MsIHNlbGYuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kcm9wVGVzdEVuZXJneShkZWF0aFBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChlbmVteU5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLaWxsQnJvYWRjYXN0VGVzdEVuZW15RGVhdGgoZW5lbXlOb2RlKSB7XHJcbiAgICAgICAgaWYgKCFlbmVteU5vZGUgfHwgIWNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVhdGhQb3MgPSBjYy52MihlbmVteU5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCB2aWN0aW1OYW1lID0gZW5lbXlOb2RlW1wiX2tpbGxWaWN0aW1OYW1lXCJdIHx8IFwi5pWM5pa55Z2m5YWLXCI7XHJcbiAgICAgICAgbGV0IHN0cmVhayA9IHRoaXMuX3JlY29yZEtpbGxTdHJlYWsoKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZUVuZW15KGVuZW15Tm9kZSk7XHJcbiAgICAgICAgaWYgKGVuZW15Tm9kZS5zY3JpcHQpIHtcclxuICAgICAgICAgICAgZW5lbXlOb2RlLnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZW15Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dLaWxsU2t1bGwoZGVhdGhQb3MpO1xyXG4gICAgICAgIHRoaXMuX3B1c2hLaWxsQnJvYWRjYXN0KFwi5oiR5Ye75p2A5LqGXCIgKyB2aWN0aW1OYW1lKTtcclxuICAgICAgICB0aGlzLl9zaG93S2lsbEJhZGdlU3RhbXAoc3RyZWFrKTtcclxuICAgICAgICBpZiAoc3RyZWFrID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckJ1YmJsZShcIuaIkeWcqGNhcnJ5XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjE1KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChkZWF0aFBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fcGxheWVyICYmIGNjLmlzVmFsaWQoc2VsZi5fcGxheWVyKSAmJiBzZWxmLl9wbGF5ZXIuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KGRlYXRoUG9zLCBzZWxmLl9maXJlLl90bUxheWVyT2JzdGFjbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dLaWxsU2t1bGwocG9zKSB7XHJcbiAgICAgICAgbGV0IHNrdWxsID0gbmV3IGNjLk5vZGUoXCJfa2lsbFNrdWxsXCIpO1xyXG4gICAgICAgIHNrdWxsLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBza3VsbC5zZXRQb3NpdGlvbihjYy52Myhwb3MueCwgcG9zLnkgKyA4NSwgMCkpO1xyXG4gICAgICAgIHNrdWxsLnpJbmRleCA9IDYwMDA7XHJcbiAgICAgICAgc2t1bGwub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgc2t1bGwuc2NhbGUgPSAxO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IHNrdWxsLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLwn5KAXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSA0ODtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNTI7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgc2t1bGwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEsIDAsIDM0KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMC41KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4zKSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfZHJvcFRlc3RFbmVyZ3kocG9zKSB7XHJcbiAgICAgICAgbGV0IGZyb21Qb3MgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGxldCB0b1BvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGZyb21Qb3MuYWRkKGNjLnYyKDcwLCAzNSkpLCA0MCk7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuY3JlYXRlRW5lcmd5QXQoZnJvbVBvcyk7XHJcbiAgICAgICAgZW5lcmd5LnNjYWxlID0gMC4yO1xyXG4gICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yOCwgMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygwLjM1LCB0b1BvcywgNDIsIDEpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQbGF5ZXJCdWJibGUodGV4dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1YmJsZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCdWJibGVcIik7XHJcbiAgICAgICAgYnViYmxlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBidWJibGUuc2V0UG9zaXRpb24oY2MudjModGhpcy5fcGxheWVyLngsIHRoaXMuX3BsYXllci55ICsgMTA1LCAwKSk7XHJcbiAgICAgICAgYnViYmxlLnpJbmRleCA9IDYwMDA7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IGJ1YmJsZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC01OCwgLTI0LCAxMTYsIDQ4LCAxMik7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG4gICAgICAgIGJnLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNDAsIDQwLCA0MCwgMjQwKTtcclxuICAgICAgICBiZy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtNTgsIC0yNCwgMTE2LCA0OCwgMTIpO1xyXG4gICAgICAgIGJnLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJCdWJibGVcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ1YmJsZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTE2LCA0OCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyMCwgMjAsIDIwKTtcclxuXHJcbiAgICAgICAgYnViYmxlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oY2MubW92ZUJ5KDAuMTUsIDAsIDEyKSwgY2MuZmFkZUluKDAuMTUpKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjUpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2hha2VNYXAoKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAxKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDMpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgMCwgLTMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAyKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIC00LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDIsIDEpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMCwgLTEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlMaWdodFNjcmVlblNoYWtlKCkge1xyXG4gICAgICAgIGxldCBvcmlnaW4gPSBjYy52Myh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTEwMyk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMiwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAtNCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAxKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDAsIC0xKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDkxMDMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rue7k+adn1xyXG4gICAgc2V0RmluaXNoKCl7XHJcbiAgICAgICAgdGhpcy5fZ2FtaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYW5NYXAoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9nYW1pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxCcm9hZGNhc3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxSaW5nVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlclRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RWdnVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZU9ic3RhY2xlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yZXNldEtpbGxCcm9hZGNhc3RSdW50aW1lKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJQb3J0YWxUZXN0Tm9kZXMoKTtcclxuICAgICAgICB0aGlzLl9jbGVhckNlbnRyaWZ1Z2FsUmluZ1Rlc3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyRGFtYWdlRG91YmxlVGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJTcGVlZERvdWJsZVRlc3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyU3ByZWFkQnVsbGV0VGVzdE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJCb3VuY2VPYnN0YWNsZVRlc3ROb2RlcygpO1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKXtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBlbmVteS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuZW15cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NraWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGwgPSB0aGlzLl9za2lsbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHNraWxsKSkge1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NraWxscyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX2VuZXJneXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgICAgIGVuZXJneS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb2lsU3BpbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGlsbCA9IHRoaXMuX29pbFNwaWxsc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNwaWxsICYmIHNwaWxsLm5vZGUgJiYgY2MuaXNWYWxpZChzcGlsbC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgc3BpbGwubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2lsU3BpbGxzID0gW107XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0Q292ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fY292ZXJUZXN0RW5lbXkgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5RWdncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZWdnID0gdGhpcy5fZW5lcmd5RWdnc1tpXTtcclxuICAgICAgICAgICAgaWYgKGVnZyAmJiBlZ2cubm9kZSAmJiBjYy5pc1ZhbGlkKGVnZy5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgZWdnLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuZXJneUVnZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneUVnZ0J1c2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYnVzaCA9IHRoaXMuX2VuZXJneUVnZ0J1c2hlc1tpXTtcclxuICAgICAgICAgICAgaWYgKGJ1c2ggJiYgYnVzaC5ub2RlICYmIGNjLmlzVmFsaWQoYnVzaC5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgYnVzaC5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbmVyZ3lFZ2dCdXNoZXMgPSBbXTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lDZFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyUnVudGltZU1hcE5vZGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyUnVudGltZU1hcE5vZGVzKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RtRGVjYWwgJiYgY2MuaXNWYWxpZCh0aGlzLl90bURlY2FsKSkge1xyXG4gICAgICAgICAgICBsZXQgZGVjYWxDaGlsZHJlbiA9IHRoaXMuX3RtRGVjYWwuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWNhbENoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBkZWNhbENoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcnVudGltZU5hbWVzID0ge1xyXG4gICAgICAgICAgICBcIlBsYXllclwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkVuZW15XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiQnVsbGV0XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiQm9vbVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIlNraWxsSWNvblwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIk9pbFBpY2t1cFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkVuZXJneUl0ZW1cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfa2lsbFNrdWxsXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2tpbGxCdWJibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfdXBncmFkZUZsb2F0XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2J1bGxldE11dGF0aW9uTWVkYWxcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfcG9ydGFsR2F0ZUFcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfcG9ydGFsR2F0ZUJcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfcG9ydGFsTGlua0Z4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3BvcnRhbEhpbnRMYWJlbFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9wb3J0YWxXYXJwRnhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY2VudHJpZnVnYWxSaW5nXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2NlbnRyaWZ1Z2FsUmluZ0hpbnRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY2VudHJpZnVnYWxSaW5nR3VpZGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY2VudHJpZnVnYWxSaW5nRnhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfb2lsU3BpbGxcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY292ZXJUZXN0Q3JhdGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY292ZXJUZXN0Q3JhdGVTaGFkb3dcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfY292ZXJIaXRGeFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9jb3ZlclNoYXJkXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiRW5lcmd5RWdnXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2VuZXJneUVnZ0J1c2hcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfZW5lcmd5RWdnQnVzaFNoYWRvd1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9lbmVyZ3lFZ2dMZWFmXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2VuZXJneUVnZ0J1c2hDb3JlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2RhbWFnZURvdWJsZUFyZWFcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfZGFtYWdlRG91YmxlRnhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfc3BlZWREb3VibGVBcmVhXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3NwZWVkRG91YmxlRnhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfc3ByZWFkQnVsbGV0QXJlYVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9zcHJlYWRCdWxsZXRGeFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9ib3VuY2VPYnN0YWNsZUNpcmNsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9ib3VuY2VPYnN0YWNsZUxpbmVcIjogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLmNoaWxkcmVuLnNsaWNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoY2hpbGQpICYmIHJ1bnRpbWVOYW1lc1tjaGlsZC5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc01hcCgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aSN5rS7XHJcbiAgICByZXZpdmUoKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wb3NpdGlvbiA9IHRoaXMuX3BsYXllckxhc3RQb3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCl7XHJcbiAgICAgICAgdGhpcy5fcGF1c2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3VtZSgpe1xyXG4gICAgICAgIHRoaXMuX3BhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19