
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
var MusicManager_1 = require("./base/MusicManager");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
var Analytics_1 = require("./ad/Analytics");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
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
        _this._playerHitTestMode = false; //受击测试模式
        _this._upgradeTestMode = false; //升级测试模式
        _this._shootEffectTestMode = false; //子弹射击测试模式
        _this._levelId = 1; //当前关卡id
        _this._levelConfig = null; //当前关卡配置
        _this._roamFlg = false; //漫游标记
        _this._roamDir = cc.v2(1, 0); //漫游方向
        _this._playerLastPos = 0;
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
    };
    GameMap.prototype.onDestroy = function () {
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
        this._tmSize = this.node.getContentSize();
        // this._tmSize = new cc.Size(this._tiledMap.getMapSize().width * this._tiledMap.getTileSize().width, this._tiledMap.getMapSize().height * this._tiledMap.getTileSize().height);
        this._tileSize = this._tiledMap.getTileSize();
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
    GameMap.prototype._getTestEffectPreviewPos = function () {
        var basePos = this._player && cc.isValid(this._player)
            ? cc.v2(this._player.position)
            : (this._playerBornPos ? cc.v2(this._playerBornPos) : cc.v2(0, 0));
        return this.clampMapInnerPosition(basePos.add(cc.v2(180, 96)), 120);
    };
    GameMap.prototype.playKillExplosionEffectAt = function (pos) {
        // this._playWhiteScreenFlash(190, 0.05, 0.24);
        this._spawnExplosionStarburstAt(pos);
        this._spawnExplosionGlowAt(pos, 0.36);
        this._spawnExplosionCoreBurstAt(pos, 0.3);
        this._spawnTransparentShockwaveAt(pos, 76, 380, 0, 0.48, 180, 10);
        this._spawnTransparentShockwaveAt(pos, 38, 220, 0.06, 0.36, 135, 6);
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
        burst.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1.08), cc.fadeTo(0.1, 220)), cc.spawn(cc.scaleTo(0.22, 1.55), cc.fadeOut(0.22)), cc.removeSelf()));
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
        glow.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.05, 210), cc.scaleTo(0.05, 1)), cc.spawn(cc.fadeOut(0.24), cc.scaleTo(0.24, 1.52)), cc.removeSelf()));
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
    //生成一个敌人
    GameMap.prototype.deleteEnemy = function (delEnemy) {
        for (var i = 0; i < this._enemys.length; i++) {
            var enemy = this._enemys[i];
            if (enemy == delEnemy) {
                if (this._killEffectTestMode) {
                    this._deathEnemyCount += 1;
                    this._enemys.splice(i, 1);
                    yyp.eventCenter.emit("current-enemycount", { enemycount: 0 });
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
    //地图滚动
    GameMap.prototype.rollMap = function () {
        if (this._player && cc.isValid(this._player)) {
            var ret = this._correctMapPosition(cc.v2(-this._player.x, -this._player.y));
            this.node.x = ret.x;
            this.node.y = ret.y;
        }
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
        this._killEffectTestMode = false;
        this._playerHitTestMode = false;
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
        this._killEffectTestMode = true;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
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
    GameMap.prototype.startPlayerHitTestGame = function (func) {
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._killEffectTestMode = false;
        this._playerHitTestMode = true;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
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
        this._killEffectTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = true;
        this._shootEffectTestMode = false;
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
        this._killEffectTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = true;
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
    GameMap.prototype.isTestMode = function () {
        return this._killEffectTestMode || this._playerHitTestMode || this._upgradeTestMode || this._shootEffectTestMode;
    };
    GameMap.prototype.isShootEffectTestMode = function () {
        return this._shootEffectTestMode;
    };
    GameMap.prototype.isKillEffectTestMode = function () {
        return this._killEffectTestMode;
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
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._shootEffectTestMode = false;
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
        this._bornEnemyCount = 0;
        this._deathEnemyCount = 0;
        this._maxEnemyCount = 0;
        this._timeMaxEnemyCount = 0;
        this._energyCdTime = 0;
        this._roamFlg = true;
        this._clearRuntimeMapNodes();
    };
    GameMap.prototype._clearRuntimeMapNodes = function () {
        var runtimeNames = {
            "Player": true,
            "Enemy": true,
            "Bullet": true,
            "Boom": true,
            "SkillIcon": true,
            "EnergyItem": true,
            "_killSkull": true,
            "_killBubble": true,
            "_upgradeFloat": true,
            "_bulletMutationMedal": true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUNuRCwyQ0FBd0M7QUFDeEMsb0RBQW1EO0FBQ25ELDhCQUE4QjtBQUM5Qiw0Q0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyw0Q0FBeUM7QUFDbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsZUFBZTtBQUNmLHdCQUF3QjtBQUV4QjtJQUE2QiwyQkFBYTtJQUExQztRQUFBLHFFQXFrREM7UUFsa0RHLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUduQyxzQkFBZ0IsR0FBYyxJQUFJLENBQUM7UUFHbkMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBR25DLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRXZDLE1BQU07UUFDTixlQUFTLEdBQUssSUFBSSxDQUFDLENBQUssV0FBVztRQUNuQyxjQUFRLEdBQU0sSUFBSSxDQUFDLENBQUssS0FBSztRQUM3QixZQUFNLEdBQVEsSUFBSSxDQUFDLENBQUssVUFBVTtRQUNsQyxhQUFPLEdBQU8sSUFBSSxDQUFDLENBQUssVUFBVTtRQUNsQyxhQUFPLEdBQU8sSUFBSSxDQUFDLENBQUssTUFBTTtRQUM5QixlQUFTLEdBQUssSUFBSSxDQUFDLENBQUssTUFBTTtRQUU5QixnQkFBVSxHQUFJLEVBQUUsQ0FBQyxD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QUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztTQUN0QjtRQUNELElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUU7WUFDbkIsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7U0FDckI7UUFDRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDckIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztTQUN2QjtRQUNELElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUU7WUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDdEI7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxxQ0FBbUIsR0FBbkIsVUFBb0IsR0FBRztRQUNuQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEIsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDbEIs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LFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFWixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDMUIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEQsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDcEQsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN4QixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMs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QUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELHdCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBamtERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNtQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNtQjtJQTlCOUIsT0FBTztRQURuQixPQUFPO09BQ0ssT0FBTyxDQXFrRG5CO0lBQUQsY0FBQztDQXJrREQsQUFxa0RDLENBcmtENEIsNkJBQWEsR0Fxa0R6QztBQXJrRFksMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcbmltcG9ydCB7RW5lcmd5SXRlbX0gZnJvbSBcIi4vRW5lcmd5SXRlbVwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuLy/nvZHpobXlrqLmnI0gaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9rZWZ1Lmh0bWxcclxuaW1wb3J0IHtBbmFseXRpY3N9IGZyb20gXCIuL2FkL0FuYWx5dGljc1wiO1xyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBHYW1lTWFwIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRyZWUwMVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRyZWUwMlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbW91bnRhaW4wMVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG1vdW50YWluMDJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBtb3VudGFpbjAzUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIGVuZW15UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIHNraWxsUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIGVuZXJneVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+WGhemDqOWPmOmHj1xyXG4gICAgX3RpbGVkTWFwICAgPSBudWxsOyAgICAgLy9UaWxlZCBNYXBcclxuICAgIF90bUdyb3VwICAgID0gbnVsbDsgICAgIC8v5pmu6YCa5bGCXHJcbiAgICBfdG1PYmogICAgICA9IG51bGw7ICAgICAvL+WvueixoeWxgijpmpznoo3niakpXHJcbiAgICBfdG1Cb3JuICAgICA9IG51bGw7ICAgICAvL+WvueixoeWxgijlh7rnlJ/ngrkpXHJcbiAgICBfdG1TaXplICAgICA9IG51bGw7ICAgICAvL+WcsOWbvuWwuuWvuFxyXG4gICAgX3RpbGVTaXplICAgPSBudWxsOyAgICAgLy/nk6bniYflsLrlr7hcclxuXHJcbiAgICBfY29sbGlkZXJzICA9IFtdOyAgICAgICAvL+eisOaSnuajgOa1i+WIl+ihqFxyXG4gICAgX2NoZWNrTGlzdCAgPSB7fTsgICAgICAgLy9BKuajgOa1i+WIl+ihqFxyXG4gICAgX2xvZ2ljQXJlYSAgPSBbXTsgICAgICAgLy/pgLvovpHnorDmkp7liIbljLpcclxuXHJcbiAgICBfcGxheWVyICAgICAgICAgICAgID0gbnVsbDsgICAgIC8v546p5a62XHJcbiAgICBfZW5lbXlzICAgICAgICAgICAgID0gW107ICAgICAgIC8v5pWM5Lq65YiX6KGoXHJcbiAgICBfcGxheWVyQm9yblBvcyAgICAgID0gbnVsbDsgICAgIC8vcGxheWVy5Ye655Sf54K5XHJcbiAgICBfZW5lbXlCb3JuUG9zICAgICAgID0gW107ICAgICAgIC8v5pWM5Lq65Ye655Sf54K55YiX6KGoXHJcbiAgICBfYm9ybkNkVGltZSAgICAgICAgID0gMDsgICAgICAgIC8v5pWM5Lq655Sf5oiQ6Ze06ZqU5pe26Ze0XHJcbiAgICBfYm9ybkVuZW15Q291bnQgICAgID0gMDsgICAgICAgIC8v5bey57uP5Ye655Sf55qE5pWM5Lq65pWw6YePXHJcbiAgICBfZGVhdGhFbmVteUNvdW50ICAgID0gMDsgICAgICAgIC8v5bey57uP5q275Lqh55qE5pWM5Lq65pWw6YePXHJcbiAgICBfbWF4RW5lbXlDb3VudCAgICAgID0gMDsgICAgICAgIC8v5pyA5aSn5pWM5Lq65pWw6YePXHJcbiAgICBfdGltZU1heEVuZW15Q291bnQgID0gMDsgICAgICAgIC8v5ZCM5bGP5pyA5aSn5pWM5Lq65pWw6YePXHJcbiAgICBfc2tpbGxzICAgICAgICAgICAgID0gW107ICAgICAgIC8v6ZqP5py655Sf5oiQ55qE5oqA6IO9XHJcbiAgICBfZW5lcmd5cyAgICAgICAgICAgID0gW107ICAgICAgIC8v5Zyw5Zu+5LiK55qE6IO96YePXHJcbiAgICBfZW5lcmd5Q2RUaW1lICAgICAgID0gMDsgICAgICAgIC8v6IO96YeP55Sf5oiQ6Ze06ZqU5pe26Ze0XHJcblxyXG4gICAgX3BhdXNlICAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5aSE5LqO5pqC5YGc54q25oCBXHJcbiAgICBfZ2FtaW5nICAgICAgICAgPSBmYWxzZTsgICAgLy/mmK/lkKblpITkuo7muLjmiI/kuK0gXHJcbiAgICBfa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7IC8v5Ye75p2A5pWI5p6c5rWL6K+V5qih5byPXHJcbiAgICBfcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTsgLy/lj5flh7vmtYvor5XmqKHlvI9cclxuICAgIF91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTsgLy/ljYfnuqfmtYvor5XmqKHlvI9cclxuICAgIF9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7IC8v5a2Q5by55bCE5Ye75rWL6K+V5qih5byPXHJcbiAgICBfbGV2ZWxJZCAgICAgICAgPSAxOyAgICAgICAgLy/lvZPliY3lhbPljaFpZFxyXG4gICAgX2xldmVsQ29uZmlnICAgID0gbnVsbDsgICAgIC8v5b2T5YmN5YWz5Y2h6YWN572uXHJcblxyXG4gICAgX3JvYW1GbGcgICAgICAgID0gZmFsc2U7ICAgICAgICAgIC8v5ryr5ri45qCH6K6wXHJcbiAgICBfcm9hbURpciAgICAgICAgPSBjYy52MigxLDApOyAgICAgLy/mvKvmuLjmlrnlkJFcclxuXHJcbiAgICBfcGxheWVyTGFzdFBvcyAgPSAwO1xyXG5cclxuICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5byA5ZCv56Kw5pKe55uR5ZCsXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAvL+W8gOWQr+e7mOWItueisOaSnue7hOS7tueahOW9oueKtlxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ICA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIC8vIOaYvuekuueisOaSnue7hOS7tueahOWMheWbtOebklxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOmanOeijeeJqSlcclxuICAgICAgICB0aGlzLl9pbml0VG1PYnN0YWNsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyWdGlsZWQgbWFwIOeahOWvueixoSjlh7rnlJ/ngrkpXHJcbiAgICAgICAgdGhpcy5faW5pdFRtQm9ybigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcclxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fdGlsZWRNYXAgPSB0aGlzLm5vZGVbXCIkVGlsZWRNYXBcIl07XHJcbiAgICAgICAgdGhpcy5fdG1Hcm91cCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJHcm91cC4kVGlsZWRMYXllcjtcclxuICAgICAgICAvLyB0aGlzLl9maXJlLl90bUxheWVyR3JvdXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdG1PYmogPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuJFRpbGVkT2JqZWN0R3JvdXA7XHJcbiAgICAgICAgdGhpcy5fdG1Cb3JuID0gdGhpcy5fZmlyZS5fdG1MYXllckJvcm4uJFRpbGVkT2JqZWN0R3JvdXA7XHJcbiAgICAgICAgdGhpcy5fdG1TaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgLy8gdGhpcy5fdG1TaXplID0gbmV3IGNjLlNpemUodGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoICogdGhpcy5fdGlsZWRNYXAuZ2V0VGlsZVNpemUoKS53aWR0aCwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodCAqIHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCkuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl90aWxlU2l6ZSA9IHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOmanOeijeeJqSlcclxuICAgIF9pbml0VG1PYnN0YWNsZSgpe1xyXG4gICAgICAgIGxldCBfc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtT2JqLmdldE9iamVjdHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9iamVjdHMxMVwiLG9iamVjdHMpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/ojrflj5bkvY3nva5cclxuICAgICAgICAgICAgbGV0IHRpbGVkUG9zID0gY2MudjIob2JqLm9mZnNldC54ICsgb2JqLndpZHRoLzIsIG9iai5vZmZzZXQueSArIG9iai5oZWlnaHQvMik7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLl90aWxlUG9zVG9HYW1lUG9zKHRpbGVkUG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoubmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDFQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDJQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJtb3VudGFpbjAxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnN0YWNsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW91bnRhaW4wMVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoubmFtZSA9PSBcIm1vdW50YWluMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb3VudGFpbjAyUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai5uYW1lID09IFwibW91bnRhaW4wM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vdW50YWluMDNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wb3NpdGlvbiA9IGNjLnYzKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG9mZnNldC55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoucG9seWxpbmVQb2ludHMubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBvYmoucG9seWxpbmVQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gb2JqLnBvbHlsaW5lUG9pbnRzW2orMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5Yib5bu6Y29sbGlkZXIgbGluZVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIudGFnID0gb2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMF0gPSBjYy52MihzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMV0gPSBjYy52MihlbmQpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzLnNwbGljZSgyLDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sbGlkZXJzLnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrKysrKysrKysrKytfaW5pdFRtT2JzdGFjbGUgdGltZTEgXCIsY29zdCk7XHJcbiAgICAgICAgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGxldCBsb2dpY1dpZHRoID0gdGhpcy5fdG1TaXplLndpZHRoLzQ7XHJcbiAgICAgICAgbGV0IGxvZ2ljSGVpZ2h0ID0gdGhpcy5fdG1TaXplLmhlaWdodC80O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgNDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNjsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhOmFueSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgYXJlYS54ID0geCpsb2dpY1dpZHRoLXRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgYXJlYS55ID0geSpsb2dpY0hlaWdodC10aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgICAgICBhcmVhLndpZHRoID0gbG9naWNXaWR0aDtcclxuICAgICAgICAgICAgICAgIGFyZWEuaGVpZ2h0ID0gbG9naWNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBuZXcgY2MuUmVjdChhcmVhLngtMTAsYXJlYS55LTEwLGxvZ2ljV2lkdGgrMjAsbG9naWNIZWlnaHQrMjApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVJblJlY3QoQSxCLHJlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEucHVzaCh7QTpBLEI6Qn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2ljQXJlYS5wdXNoKGFyZWEpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGNvc3QgPSBfZW5kVGltZSAtIF9zdGFydFRpbWU7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiKysrKysrKysrKysrX2luaXRUbU9ic3RhY2xlIHRpbWUyIFwiLGNvc3QpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo5Ye655Sf54K5KVxyXG4gICAgX2luaXRUbUJvcm4oKXtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtQm9ybi5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhvYmoub2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKG9iai5uYW1lID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckJvcm5Qb3MgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gY2MudjModGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlCb3JuUG9zLnB1c2gocG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDUsIHRpbGUpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMaXN0ID0gdGhpcy5pbml0Q2hlY2tMaXN0KCk7XHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrY29zdCB0aW1lIFwiLGNvc3QpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eUn+aIkHBsYXllclxyXG4gICAgY3JlYXRlUGxheWVyKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJUeXBlID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2N1cnJlbnRfcGxheWVyX3R5cGVfXCIsMSk7XHJcbiAgICAgICAgbGV0IHBsYXllckxldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfcGxheWVyXyR7cGxheWVyVHlwZX1fYCwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiKTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wb3NpdGlvbiA9IHRoaXMuX3BsYXllckJvcm5Qb3M7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRQbGF5ZXJUeXBlKHBsYXllclR5cGUscGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGNyZWF0ZUVuZW15KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+maj+acuueyvuiLseaAqlxyXG4gICAgICAgIGxldCBlbWVteVR5cGUgPSAxMTtcclxuICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5yYW5kb20oKSoxMDA7XHJcbiAgICAgICAgaWYgKHJhbmRvbSA8IDQpIHsgZW1lbXlUeXBlID0gMTI7IH1cclxuICAgICAgICBpZiAocmFuZG9tIDwgMSkgIHsgZW1lbXlUeXBlID0gMTM7IH1cclxuXHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gdGhpcy5fZW5lbXlCb3JuUG9zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLl9lbmVteUJvcm5Qb3MubGVuZ3RoKV07XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZShlbWVteVR5cGUsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5Y+X5Ye75rWL6K+V5pWM5Lq6XHJcbiAgICBjcmVhdGVQbGF5ZXJIaXRUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDIzMCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQXR0YWNrUmFkaXVzID0gNTIwO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lID0gMC40NTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmrovooYDmtYvor5XmlYzkurpcclxuICAgIGNyZWF0ZUtpbGxFZmZlY3RUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDI2MCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDE7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5q6L6KGA54q25oCB5bGV56S65pWM5Lq6XHJcbiAgICBjcmVhdGVMb3dIcFRlc3RFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoMjYwLCAwKSk7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDgwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSx0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGVuZW15LnNjcmlwdC5fY29uZmlnKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2NvbmZpZy5BdHRhY2tSYWRpdXMgPSA5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lID0gMS4yO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fYnVsbGV0Q29kZVRpbWUgPSBlbmVteS5zY3JpcHQuX2NvbmZpZy5CdWxsZXRDb2RlVGltZTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2hwID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihlbmVteS5zY3JpcHQuX21heEhwICogMC4xOCkpO1xyXG4gICAgICAgIGlmIChlbmVteS5zY3JpcHQuX2hwID49IGVuZW15LnNjcmlwdC5fbWF4SHApIHtcclxuICAgICAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IE1hdGgubWF4KDEsIGVuZW15LnNjcmlwdC5fbWF4SHAgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5bCE5Ye754m55pWI5rWL6K+V5pyo5qGpXHJcbiAgICBjcmVhdGVTaG9vdEVmZmVjdFRlc3RFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVteSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lbXlQcmVmYWIpO1xyXG4gICAgICAgIGVuZW15LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5hZGQoY2MudjIoMzIwLCAwKSk7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSBjYy52Myh0aGlzLmNsYW1wTWFwSW5uZXJQb3NpdGlvbihwb3MsIDkwKSk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZSgxMSwgdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDk5OTk5O1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fbWF4SHAgPSA5OTk5OTtcclxuICAgICAgICBlbmVteS5zY3JpcHQucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlbmVteS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZW15LnkpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15cy5wdXNoKGVuZW15KTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0VGVzdEVmZmVjdFByZXZpZXdQb3MoKSB7XHJcbiAgICAgICAgbGV0IGJhc2VQb3MgPSB0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpXHJcbiAgICAgICAgICAgID8gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICA6ICh0aGlzLl9wbGF5ZXJCb3JuUG9zID8gY2MudjIodGhpcy5fcGxheWVyQm9yblBvcykgOiBjYy52MigwLCAwKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGJhc2VQb3MuYWRkKGNjLnYyKDE4MCwgOTYpKSwgMTIwKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5S2lsbEV4cGxvc2lvbkVmZmVjdEF0KHBvcykge1xyXG4gICAgICAgIC8vIHRoaXMuX3BsYXlXaGl0ZVNjcmVlbkZsYXNoKDE5MCwgMC4wNSwgMC4yNCk7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25FeHBsb3Npb25TdGFyYnVyc3RBdChwb3MpO1xyXG4gICAgICAgIHRoaXMuX3NwYXduRXhwbG9zaW9uR2xvd0F0KHBvcywgMC4zNik7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25FeHBsb3Npb25Db3JlQnVyc3RBdChwb3MsIDAuMyk7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25UcmFuc3BhcmVudFNob2Nrd2F2ZUF0KHBvcywgNzYsIDM4MCwgMCwgMC40OCwgMTgwLCAxMCk7XHJcbiAgICAgICAgdGhpcy5fc3Bhd25UcmFuc3BhcmVudFNob2Nrd2F2ZUF0KHBvcywgMzgsIDIyMCwgMC4wNiwgMC4zNiwgMTM1LCA2KTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJvb21cIik7XHJcbiAgICAgICAgdGhpcy5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkV4cGxvc2lvblN0YXJidXJzdEF0KHBvcykge1xyXG4gICAgICAgIGxldCBidXJzdCA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvblN0YXJidXJzdFwiKTtcclxuICAgICAgICBidXJzdC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgYnVyc3Quc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYnVyc3QuekluZGV4ID0gNjA1NTtcclxuICAgICAgICBidXJzdC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGJ1cnN0LnNjYWxlID0gMC40NTtcclxuXHJcbiAgICAgICAgbGV0IHJheUNvbmZpZ3MgPSBbXHJcbiAgICAgICAgICAgIHthbmdsZTogMCwgbGVuZ3RoOiAxNzAsIHdpZHRoOiAxOCwgYWxwaGE6IDE2MH0sXHJcbiAgICAgICAgICAgIHthbmdsZTogNDUsIGxlbmd0aDogMTQwLCB3aWR0aDogMTQsIGFscGhhOiAxNTB9LFxyXG4gICAgICAgICAgICB7YW5nbGU6IDkwLCBsZW5ndGg6IDE3NSwgd2lkdGg6IDE4LCBhbHBoYTogMTY1fSxcclxuICAgICAgICAgICAge2FuZ2xlOiAxMzUsIGxlbmd0aDogMTQyLCB3aWR0aDogMTQsIGFscGhhOiAxNTB9LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXlDb25maWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSByYXlDb25maWdzW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmF5ID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uUmF5XCIgKyBpKTtcclxuICAgICAgICAgICAgcmF5LnBhcmVudCA9IGJ1cnN0O1xyXG4gICAgICAgICAgICByYXkuYW5nbGUgPSBjb25maWcuYW5nbGU7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSByYXkuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgY29uZmlnLmFscGhhKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKDAsIGNvbmZpZy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oLWNvbmZpZy53aWR0aCwgY29uZmlnLmxlbmd0aCAqIDAuMjQpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oMCwgMTIpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oY29uZmlnLndpZHRoLCBjb25maWcubGVuZ3RoICogMC4yNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBob3RDcm9zcyA9IG5ldyBjYy5Ob2RlKFwiX2V4cGxvc2lvbkhvdENyb3NzXCIpO1xyXG4gICAgICAgIGhvdENyb3NzLnBhcmVudCA9IGJ1cnN0O1xyXG4gICAgICAgIGxldCBjcm9zc0dyYXBoaWNzID0gaG90Q3Jvc3MuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjcm9zc0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQwLCAxODAsIDE1MCk7XHJcbiAgICAgICAgY3Jvc3NHcmFwaGljcy5yZWN0KC0xMTIsIC01LCAyMjQsIDEwKTtcclxuICAgICAgICBjcm9zc0dyYXBoaWNzLnJlY3QoLTUsIC0xMTIsIDEwLCAyMjQpO1xyXG4gICAgICAgIGNyb3NzR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBidXJzdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuMDgpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMSwgMjIwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yMiwgMS41NSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkV4cGxvc2lvbkdsb3dBdChwb3MsIHN0cmVuZ3RoID0gMC4zKSB7XHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9leHBsb3Npb25HbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGdsb3cuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgZ2xvdy56SW5kZXggPSA2MDUwO1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZ2xvdy5zY2FsZSA9IDAuMzU7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI0OCwgMjIwLCBNYXRoLmZsb29yKDEyNSAqIHN0cmVuZ3RoKSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDEwOCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjEwLCAxMjAsIE1hdGguZmxvb3IoOTUgKiBzdHJlbmd0aCkpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCA3MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4wNSwgMjEwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNSwgMSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjQpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI0LCAxLjUyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25FeHBsb3Npb25Db3JlQnVyc3RBdChwb3MsIGR1cmF0aW9uID0gMC4yOCkge1xyXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uQ29yZUJ1cnN0XCIpO1xyXG4gICAgICAgIGNvcmUucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGNvcmUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgY29yZS56SW5kZXggPSA2MDYwO1xyXG4gICAgICAgIGNvcmUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBjb3JlLnNjYWxlID0gMC4yO1xyXG5cclxuICAgICAgICBsZXQgb3V0ZXIgPSBuZXcgY2MuTm9kZShcIl9leHBsb3Npb25PdXRlckNvcmVcIik7XHJcbiAgICAgICAgb3V0ZXIucGFyZW50ID0gY29yZTtcclxuICAgICAgICBsZXQgb3V0ZXJHcmFwaGljcyA9IG91dGVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI0NCwgMTk2LCAxNzApO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDc2KTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyID0gbmV3IGNjLk5vZGUoXCJfZXhwbG9zaW9uSW5uZXJDb3JlXCIpO1xyXG4gICAgICAgIGlubmVyLnBhcmVudCA9IGNvcmU7XHJcbiAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBpbm5lci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjQwKTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmNpcmNsZSgwLCAwLCAzNCk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGNvcmUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24gKiAwLjQyLCAxLjE2KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhkdXJhdGlvbiAqIDAuNDIsIDI1NSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uICogMC41OCwgMS44NSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KGR1cmF0aW9uICogMC41OClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduVHJhbnNwYXJlbnRTaG9ja3dhdmVBdChwb3MsIHN0YXJ0UmFkaXVzID0gNzIsIGVuZFJhZGl1cyA9IDM0MCwgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDAuNDIsIGFscGhhID0gMTcwLCBsaW5lV2lkdGggPSA4KSB7XHJcbiAgICAgICAgbGV0IHdhdmUgPSBuZXcgY2MuTm9kZShcIl9leHBsb3Npb25TaG9ja3dhdmVcIik7XHJcbiAgICAgICAgd2F2ZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgd2F2ZS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICB3YXZlLnpJbmRleCA9IDYwNTg7XHJcbiAgICAgICAgd2F2ZS5vcGFjaXR5ID0gYWxwaGE7XHJcbiAgICAgICAgd2F2ZS5zY2FsZSA9IDE7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IHdhdmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCBhbHBoYSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHN0YXJ0UmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGVuZFNjYWxlID0gc3RhcnRSYWRpdXMgPiAwID8gZW5kUmFkaXVzIC8gc3RhcnRSYWRpdXMgOiAxO1xyXG4gICAgICAgIGxldCBwbGF5QWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbiwgZW5kU2NhbGUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dChkdXJhdGlvbilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICB3YXZlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoZGVsYXkpLCBwbGF5QWN0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHdhdmUucnVuQWN0aW9uKHBsYXlBY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcGxheVdoaXRlU2NyZWVuRmxhc2gobWF4T3BhY2l0eSA9IDE4MCwgZmFkZUluID0gMC4wNCwgZmFkZU91dCA9IDAuMikge1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBpZiAoIXBhcmVudE5vZGUgfHwgIWNjLmlzVmFsaWQocGFyZW50Tm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9nZXRWaWV3cG9ydFNpemUoKTtcclxuICAgICAgICBsZXQgZmxhc2ggPSBuZXcgY2MuTm9kZShcIl9zY3JlZW5GbGFzaFdoaXRlXCIpO1xyXG4gICAgICAgIGZsYXNoLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgZmxhc2guc2V0Q29udGVudFNpemUoc2l6ZSk7XHJcbiAgICAgICAgZmxhc2guc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZmxhc2guekluZGV4ID0gMTcwMDtcclxuICAgICAgICBmbGFzaC5vcGFjaXR5ID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZmxhc2guYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGdyYXBoaWNzLnJlY3QoLXNpemUud2lkdGggLyAyLCAtc2l6ZS5oZWlnaHQgLyAyLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBmbGFzaC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbyhmYWRlSW4sIG1heE9wYWNpdHkpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KGZhZGVPdXQpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quaVjOS6ulxyXG4gICAgZGVsZXRlRW5lbXkoZGVsRW5lbXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGlmIChlbmVteSA9PSBkZWxFbmVteSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCArPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2tpbGxJY29uKGRlbEVuZW15LnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgKz0xO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50IC0gdGhpcy5fZGVhdGhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlYzkurrmlbDph49cclxuICAgIGVuZW15Q291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZW15cy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmioDog71pY29uXHJcbiAgICBjcmVhdGVTa2lsbEljb24ocG9zKSB7XHJcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjA2KSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBza2lsbC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgIHNraWxsLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICBza2lsbC5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICAgICAgICAgIHNraWxsLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc2tpbGwueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEVuZXJneUNvbmZpZyhrZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBjb25maWdba2V5XTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZqP5py655Sf5oiQ5LiA5Liq6IO96YePXHJcbiAgICBjcmVhdGVFbmVyZ3koKSB7XHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl9nZXRSYW5kb21QYXNzYWJsZVRpbGUoKTtcclxuICAgICAgICBpZiAodGlsZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLmVuZXJneVByZWZhYiA/IGNjLmluc3RhbnRpYXRlKHRoaXMuZW5lcmd5UHJlZmFiKSA6IHRoaXMuX2NyZWF0ZURlZmF1bHRFbmVyZ3koKTtcclxuICAgICAgICBlbmVyZ3kucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZXJneS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMudGlsZVRvR2FtZVBvcyh0aWxlKSk7XHJcbiAgICAgICAgZW5lcmd5LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lcmd5LnkpO1xyXG5cclxuICAgICAgICBsZXQgZW5lcmd5U2NyaXB0ID0gZW5lcmd5LmdldENvbXBvbmVudChFbmVyZ3lJdGVtKSB8fCBlbmVyZ3kuYWRkQ29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIlZhbHVlXCIsIDEwKTtcclxuICAgICAgICBsZXQgbGlmZVRpbWUgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJMaWZlVGltZVwiLCAxMik7XHJcbiAgICAgICAgZW5lcmd5U2NyaXB0LmluaXQodmFsdWUsIGxpZmVUaW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZW5lcmd5cy5wdXNoKGVuZXJneSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRW5lcmd5QXQocG9zKSB7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuZW5lcmd5UHJlZmFiID8gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVyZ3lQcmVmYWIpIDogdGhpcy5fY3JlYXRlRGVmYXVsdEVuZXJneSgpO1xyXG4gICAgICAgIGVuZXJneS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lcmd5LnBvc2l0aW9uID0gY2MudjMocG9zKTtcclxuICAgICAgICBlbmVyZ3kuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVyZ3kueSk7XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pIHx8IGVuZXJneS5hZGRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgZW5lcmd5U2NyaXB0LmluaXQodGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiVmFsdWVcIiwgMTApLCB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJMaWZlVGltZVwiLCAxMikpO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneXMucHVzaChlbmVyZ3kpO1xyXG4gICAgICAgIHJldHVybiBlbmVyZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZURlZmF1bHRFbmVyZ3koKSB7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IG5ldyBjYy5Ob2RlKFwiRW5lcmd5SXRlbVwiKTtcclxuICAgICAgICBlbmVyZ3kuYWRkQ29tcG9uZW50KEVuZXJneUl0ZW0pO1xyXG4gICAgICAgIHJldHVybiBlbmVyZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFJhbmRvbVBhc3NhYmxlVGlsZSgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2NoZWNrTGlzdCk7XHJcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9jaGVja0xpc3Rba2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzLmxlbmd0aCldXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgdGhpcy5faXNFbmVyZ3lUaWxlRW1wdHkoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy52MihpdGVtLngsIGl0ZW0ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc0VuZXJneVRpbGVFbXB0eSh0aWxlKSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyh0aWxlKTtcclxuICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJNaW5EaXN0YW5jZVwiLCAxMjApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyTGVuID0gcG9zLnN1Yih0aGlzLl9wbGF5ZXIucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyTGVuIDwgbWluRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVyZ3lzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmVyZ3kgPSB0aGlzLl9lbmVyZ3lzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChlbmVyZ3kpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gcG9zLnN1YihlbmVyZ3kucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IG1pbkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluacgOi/keeahOaVjOS6ulxyXG4gICAgZ2V0TmVhckVuZW15KCkge1xyXG4gICAgICAgIGxldCByZXQgPSBudWxsO1xyXG4gICAgICAgIGxldCByZXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcyA9IGNjLnYyKGVuZW15LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHBsYXllclBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSBlbmVteVBvcy5zdWIocGxheWVyUG9zKS5tYWcoKVxyXG4gICAgICAgICAgICBpZiAocmV0ID09IG51bGwgfHwgbGVuIDwgcmV0TGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBlbmVteTtcclxuICAgICAgICAgICAgICAgIHJldExlbiA9IGxlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lnKjlkIzkuIDkuKp0aWxlLOi/mOacieWFtuS7luaVjOS6ulxyXG4gICAgaXNIYXZlT3RoZXJFbmVteShlbmVteSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvdGhlckVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAob3RoZXJFbmVteSAhPSBlbmVteSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLmdhbWVQb3NUb1RpbGUoZW5lbXkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG90aGVyVGlsZSA9IHRoaXMuZ2FtZVBvc1RvVGlsZShvdGhlckVuZW15LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLnggPT0gb3RoZXJUaWxlLnggJiYgdGlsZS55ID09IG90aGVyVGlsZS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mjInkuItcclxuICAgIF9vblRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICBsZXQgYSA9MTtcclxuICAgICAgICAvLyBsZXQgcG9pbnQgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgLy8gbGV0IHRpbGUgPSB0aGlzLmdhbWVQb3NUb1RpbGUocG9pbnQpO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVzZXRNYXAoKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS53aWR0aDsgcm93KyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQ7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90bUdyb3VwLnNldFRpbGVHSURBdCgxLCBjYy52Mihyb3csY29sKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy90aWxlZCBtYXDlnZDmoIfovazmjaLkuLrmuLjmiI/lnZDmoIdcclxuICAgIF90aWxlUG9zVG9HYW1lUG9zKHRpbGVkUG9zKSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRpbGVkUG9zLngsIHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSB0aWxlZFBvcy55KTtcclxuICAgICAgICBwb3MueCA9IHBvcy54IC0gdGhpcy5fdG1TaXplLndpZHRoLzI7XHJcbiAgICAgICAgcG9zLnkgPSBwb3MueSAtIHRoaXMuX3RtU2l6ZS5oZWlnaHQvMjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICAvL3RpbGXlnZDmoIfovazmjaLkuLrmuLjmiI/lnZDmoIdcclxuICAgIHRpbGVUb0dhbWVQb3ModGlsZSkge1xyXG4gICAgICAgIGxldCB4ID0gdGlsZS54ICogdGhpcy5fdGlsZVNpemUud2lkdGggKyB0aGlzLl90aWxlU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgIGxldCB5ID0gdGlsZS55ICogdGhpcy5fdGlsZVNpemUuaGVpZ2h0ICsgdGhpcy5fdGlsZVNpemUuaGVpZ2h0LzI7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlUG9zVG9HYW1lUG9zKGNjLnYyKHgseSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5ri45oiP5Z2Q5qCH6L2s5o2i5Li6dGlsZWQgbWFw5Z2Q5qCHXHJcbiAgICBfZ2FtZVBvc1RvVGlsZVBvcyhnYW1lUG9zKSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKGdhbWVQb3MpO1xyXG4gICAgICAgIHBvcy54ID0gcG9zLnggKyB0aGlzLl90bVNpemUud2lkdGgvMjtcclxuICAgICAgICBwb3MueSA9IHBvcy55ICsgdGhpcy5fdG1TaXplLmhlaWdodC8yO1xyXG4gICAgICAgIHBvcy55ID0gdGhpcy5fdG1TaXplLmhlaWdodCAtIHBvcy55O1xyXG5cclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5ri45oiP5Z2Q5qCH6L2s5o2i5Li6dGlsZeWdkOagh1xyXG4gICAgZ2FtZVBvc1RvVGlsZShnYW1lUG9zKSB7XHJcbiAgICAgICAgbGV0IHRpbGVQb3MgPSB0aGlzLl9nYW1lUG9zVG9UaWxlUG9zKGdhbWVQb3MpO1xyXG4gICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcih0aWxlUG9zLnggLyB0aGlzLl90aWxlU2l6ZS53aWR0aCk7XHJcbiAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKHRpbGVQb3MueSAvIHRoaXMuX3RpbGVTaXplLmhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WIneWni+WMlkEq5qOA5rWL5YiX6KGoXHJcbiAgICBpbml0Q2hlY2tMaXN0ICgpIHtcclxuICAgICAgICBsZXQgcmV0ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkud2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gdGhpcy50aWxlVG9HYW1lUG9zKGNjLnYyKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDb2xsaWRlcnMocG9zLDUwKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtIDogYW55PSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnggPSB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ueSA9IHk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5HID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLkggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmF0aGVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhc3NhYmxlID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0W3grXCJfXCIreV0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDMsIGNjLnYyKHgseSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHJldFt4K1wiX1wiK3ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52Mih4LCB5KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG5ld3ggPSB4LTE7IG5ld3ggPD0geCsxOyBuZXd4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXd5ID0geS0xOyBuZXd5IDw9IHkrMTsgbmV3eSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdJdGVtID0gcmV0W25ld3grXCJfXCIrbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UGFzc2FibGVJdGVtID0gaXRlbS5wYXNzYWJsZVtuZXd4K1wiX1wiK25ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh4ICE9IG5ld3ggfHwgeSAhPSBuZXd5KSAmJiBuZXdJdGVtICYmIG5ld1Bhc3NhYmxlSXRlbSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3cG9zID0gdGhpcy50aWxlVG9HYW1lUG9zKGNjLnYyKG5ld3gsIG5ld3kpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaXJjbGVDaXJjbGVQYXNzQ29sbGlkZXJzKHBvcyxuZXdwb3MsNTApID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFzc2FibGVbbmV3eCtcIl9cIituZXd5XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0ucGFzc2FibGVbeCtcIl9cIit5XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+WQSrmo4DmtYvliJfooahcclxuICAgIGdldENoZWNrTGlzdCAoKSB7XHJcbiAgICAgICAgdmFyIG9ialN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHRoaXMuX2NoZWNrTGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uob2JqU3RyaW5nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ojrflj5Zwb3PmiYDlnKh0aWxlLOacgOi/keeahOWPr+mAmuihjHRpbGVcclxuICAgIGdldFBhc3NhYmxlVGlsZSAodGlsZSxyZWZlclRpbGUpIHtcclxuICAgICAgICAvL+WIpOaWreiHquW3sVxyXG4gICAgICAgIC8vIGlmICh0aGlzLl9jaGVja0xpc3RbdGlsZS54ICsgXCJfXCIgKyB0aWxlLnldKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0aWxlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy/liKTmlq3kuIDnjq9cclxuICAgICAgICBsZXQgcmV0VGlsZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHJldExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IC0xOyB4IDw9IDE7IHgrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMTsgeSA8PSAxOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKHggIT0gMCB8fCB5IT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gdGlsZS54ICsgeDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IHRpbGUueSArIHk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3RpbGUgPSB0aGlzLl9jaGVja0xpc3RbbmV3eCArIFwiX1wiICsgbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld3RpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0gKHJlZmVyVGlsZS54LW5ld3gpKihyZWZlclRpbGUueC1uZXd4KSArIChyZWZlclRpbGUueS1uZXd5KSoocmVmZXJUaWxlLnktbmV3eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRUaWxlID09IG51bGwgfHwgbGVuIDwgcmV0TGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRUaWxlID0gbmV3dGlsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldExlbiA9IGxlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0VGlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0VGlsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat5LqM546vXHJcbiAgICAgICAgcmV0VGlsZSA9IG51bGw7XHJcbiAgICAgICAgcmV0TGVuID0gMDtcclxuICAgICAgICBmb3IgKGxldCB4ID0gLTI7IHggPD0gMjsgeCsrKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0yOyB5IDw9IDI7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCA9PSAtMiB8fCB4ID09IDIgfHwgeSA9PSAtMiB8fCB5ID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eCA9IHRpbGUueCArIHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSB0aWxlLnkgKyB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd0aWxlID0gdGhpcy5fY2hlY2tMaXN0W25ld3ggKyBcIl9cIiArIG5ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXd0aWxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlbiA9IChyZWZlclRpbGUueC1uZXd4KSoocmVmZXJUaWxlLngtbmV3eCkgKyAocmVmZXJUaWxlLnktbmV3eSkqKHJlZmVyVGlsZS55LW5ld3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VGlsZSA9PSBudWxsIHx8IGxlbiA8IHJldExlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0VGlsZSA9IG5ld3RpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldFRpbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldFRpbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlnBvc+aJgOWcqHRpbGUs5pyA6L+R55qE5Y+v6YCa6KGMdGlsZVxyXG4gICAgZ2V0UGFzc2FibGVUaWxlRXggKHRpbGUpIHtcclxuICAgICAgICAvL+WIpOaWreS4gOeOr1xyXG4gICAgICAgIGxldCByZXRUaWxlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAtMjsgeCA8PSAyOyB4Kyspe1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gLTI7IHkgPD0gMjsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGlmICh4ICE9IDAgfHwgeSE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eCA9IHRpbGUueCArIHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSB0aWxlLnkgKyB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd0aWxlID0gdGhpcy5fY2hlY2tMaXN0W25ld3ggKyBcIl9cIiArIG5ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXd0aWxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0VGlsZXMucHVzaChuZXd0aWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXRUaWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyZXRUaWxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0VGlsZXNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g57q/5q61UFAxLOaYr+WQpuS8mue7j+i/h2NvbGxpZGVyc+S4reeahOS4gOadoee6v+autVxyXG4gICAgbGluZUxpbmVQYXNzQ29sbGlkZXJzKFAsUDEpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sbGlkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBBID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgICAgICBsZXQgQiA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgaWYgKFV0aWxzLmxpbmVQYXNzTGluZShQLFAxLEEsQikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDngrlQLFAx5Li65ZyG5b+DLHJhZGl1c+S4uuWNiuW+hOeahOWchizmmK/lkKbkvJrnu4/ov4djb2xsaWRlcnPkuK3nmoTkuIDmnaHnur/mrrVcclxuICAgIGNpcmNsZUNpcmNsZVBhc3NDb2xsaWRlcnMoUCxQMSxyYWRpdXMpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sbGlkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBBID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgICAgICBsZXQgQiA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgaWYgKFV0aWxzLmNpcmNsZUNpcmNsZVBhc3NMaW5lKFAsUDEscmFkaXVzLEEsQikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eisOaSnua1i+ivlSjku6XngrlQ5Li65ZyG5b+DLOWNiuW+hOS4unJhZGl1c+eahOWchizmmK/lkKblkoxjb2xsaWRlcnPkuK3nmoTnur/mrrXnm7jkuqQpXHJcbiAgICB0ZXN0Q29sbGlkZXJzKFAsIHJhZGl1cyl7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVySXRlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9jb2xsaWRlcnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbGxpZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlcnNba2V5XTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgQiA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlckl0ZW0gPSBVdGlscy5nZXRQb2ludExpbmVTaG9ydGVzdEluZm8oUCwgQSwgQik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlckl0ZW0ubGVuIDw9IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVySXRlbS5jb2xsaWRlciA9IGNvbGxpZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVySXRlbXMucHVzaChjb2xsaWRlckl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGlkZXJJdGVtcztcclxuICAgIH1cclxuXHJcbiAgICAvL+avj+W4p+iwg+eUqFxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhdXNlKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Rlc3RNb2RlKCkgPT0gZmFsc2UgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPiAxICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmVteXMubGVuZ3RoIDwgdGhpcy5fdGltZU1heEVuZW15Q291bnQgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50IDwgdGhpcy5fbWF4RW5lbXlDb3VudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8v5Zyw5Zu+5rua5YqoXHJcbiAgICAgICAgICAgIHRoaXMucm9sbE1hcCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUZXN0TW9kZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVFbmVyZ3koZHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyTGFzdFBvcyA9IHRoaXMuX3BsYXllci5wb3NpdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb2FtRmxnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9hbVBvc2l0aW9uID0gY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKS5hZGQodGhpcy5fcm9hbURpcik7XHJcbiAgICAgICAgICAgICAgICByb2FtUG9zaXRpb24gPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24ocm9hbVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2FtUG9zaXRpb24ueCA9PSB0aGlzLm5vZGUueCAmJiByb2FtUG9zaXRpb24ueSA9PSB0aGlzLm5vZGUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvYW1EaXIueCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKS0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvYW1EaXIueSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKS0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCA9IHJvYW1Qb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ID0gcm9hbVBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnLDlm77mu5rliqhcclxuICAgIHJvbGxNYXAoKXtcclxuICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXIueCwtdGhpcy5fcGxheWVyLnkpKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSByZXQueDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSByZXQueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFZpZXdwb3J0U2l6ZSgpIHtcclxuICAgICAgICBsZXQgY2FudmFzID0gVXRpbHMuZ2V0Q3VycmVudFNjZW5lQ2FudmFzKCk7XHJcbiAgICAgICAgaWYgKGNhbnZhcyAmJiBjYy5pc1ZhbGlkKGNhbnZhcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmlzaWJsZVNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XHJcbiAgICAgICAgaWYgKHZpc2libGVTaXplICYmIHZpc2libGVTaXplLndpZHRoID4gMCAmJiB2aXNpYmxlU2l6ZS5oZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aXNpYmxlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHl5cC5nYW1lRnJhbWVTaXplKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5eXAuZ2FtZUZyYW1lU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLndpblNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhbXBNYXBJbm5lclBvc2l0aW9uKHBvcywgcGFkZGluZyA9IDApIHtcclxuICAgICAgICBsZXQgcmV0ID0gY2MudjIocG9zKTtcclxuICAgICAgICBsZXQgaGFsZldpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy5fdG1TaXplLndpZHRoIC8gMiAtIHBhZGRpbmcpO1xyXG4gICAgICAgIGxldCBoYWxmSGVpZ2h0ID0gTWF0aC5tYXgoMCwgdGhpcy5fdG1TaXplLmhlaWdodCAvIDIgLSBwYWRkaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKHJldC54IDwgLWhhbGZXaWR0aCkge1xyXG4gICAgICAgICAgICByZXQueCA9IC1oYWxmV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueCA+IGhhbGZXaWR0aCkge1xyXG4gICAgICAgICAgICByZXQueCA9IGhhbGZXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55IDwgLWhhbGZIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0LnkgPSAtaGFsZkhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC55ID4gaGFsZkhlaWdodCkge1xyXG4gICAgICAgICAgICByZXQueSA9IGhhbGZIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfY29ycmVjdE1hcFBvc2l0aW9uKHJldCl7XHJcbiAgICAgICAgbGV0IHZpZXdwb3J0U2l6ZSA9IHRoaXMuX2dldFZpZXdwb3J0U2l6ZSgpO1xyXG4gICAgICAgIGxldCB4ID0gTWF0aC5tYXgoMCwgKHRoaXMuX3RtU2l6ZS53aWR0aCAtIHZpZXdwb3J0U2l6ZS53aWR0aCkgLyAyKTtcclxuICAgICAgICBsZXQgeSA9IE1hdGgubWF4KDAsICh0aGlzLl90bVNpemUuaGVpZ2h0IC0gdmlld3BvcnRTaXplLmhlaWdodCkgLyAyKTtcclxuICAgICAgICBsZXQgbWluUG9zID0gY2MudjIoLXgsLXkpO1xyXG4gICAgICAgIGxldCBtYXhQb3MgPSBjYy52Mih4LHkpO1xyXG5cclxuICAgICAgICBpZiAocmV0LnggPCBtaW5Qb3MueCkge1xyXG4gICAgICAgICAgICByZXQueCA9IG1pblBvcy54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnggPiBtYXhQb3MueCkge1xyXG4gICAgICAgICAgICByZXQueCA9IG1heFBvcy54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPCBtaW5Qb3MueSkge1xyXG4gICAgICAgICAgICByZXQueSA9IG1pblBvcy55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPiBtYXhQb3MueSkge1xyXG4gICAgICAgICAgICByZXQueSA9IG1heFBvcy55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+e6v+auteS4juefqeW9ouebuOS6pOaIluiAheWMheWQq+WcqOefqeW9oumHjOmdolxyXG4gICAgX2xpbmVJblJlY3QoQSxCLHJlY3Qpe1xyXG4gICAgICAgIGlmICgoQS54ID49IHJlY3QueCAmJiBBLnggPD0gcmVjdC54ICsgcmVjdC53aWR0aCAmJiBBLnkgPj0gcmVjdC55ICYmIEEueSA8PSByZWN0LnkgKyByZWN0LmhlaWdodCkgfHxcclxuICAgICAgICAgICAgKEIueCA+PSByZWN0LnggJiYgQi54IDw9IHJlY3QueCArIHJlY3Qud2lkdGggJiYgQi55ID49IHJlY3QueSAmJiBCLnkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQpIHx8XHJcbiAgICAgICAgICAgIGNjLkludGVyc2VjdGlvbi5saW5lUmVjdChBLEIscmVjdCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Q5by5LOmanOeijeeJqeeisOaSnuajgOa1i1xyXG4gICAgYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KFAsUDEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudChQLCBQMSkgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoUCwgUDEpIHtcclxuICAgICAgICAvL+iOt+WPlueisOaSnuWMulxyXG4gICAgICAgIGxldCBjdXJyQXJlYSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9sb2dpY0FyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSB0aGlzLl9sb2dpY0FyZWFbaV07XHJcbiAgICAgICAgICAgIGlmIChQLnggPj0gYXJlYS54ICYmIFAueCA8PSBhcmVhLnggKyBhcmVhLndpZHRoICYmIFAueSA+PSBhcmVhLnkgJiYgUC55IDw9IGFyZWEueSArIGFyZWEuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyQXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJBcmVhKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VyckFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBBID0gY3VyckFyZWFbaV0uQTtcclxuICAgICAgICAgICAgICAgIGxldCBCID0gY3VyckFyZWFbaV0uQjtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ubGluZUxpbmUoUCxQMSxBLEIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtBOiBBLCBCOiBCfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCLmnKrmib7liLDnorDmkp7liIbljLpcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvL+WtkOW8uSznorDmkp7mo4DmtYtcclxuICAgIGJ1bGxldEVuZW15Q29sbGlzaW9uVGVzdChQLGNhbXApe1xyXG4gICAgICAgIGlmIChjYW1wID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IFAuc3ViKGVuZW15LnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSBlbmVteS5zY3JpcHQuZ2V0UmFkaXVzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgcmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gUC5zdWIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSB0aGlzLl9wbGF5ZXIuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wbGF5ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625ZKM5oqA6IO9aWNvbiznorDmkp7mo4DmtYtcclxuICAgIHBsYXllclNraWxsSWNvbkNvbGxpc2lvblRlc3QoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NraWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGwgPSB0aGlzLl9za2lsbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHNraWxsKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclJlY3QgPSB0aGlzLl9wbGF5ZXIuc2NyaXB0LmdldFBsYXllckJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2tpbGxSZWN0ID0gc2tpbGwuc2NyaXB0LmdldFNraWxsQm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3QocGxheWVyUmVjdCxza2lsbFJlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuc2NyaXB0LmVtaXRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxscy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lsbHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGxheWVyRW5lcmd5Q29sbGlzaW9uVGVzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625ZKM6IO96YePLOeisOaSnuajgOa1i1xyXG4gICAgcGxheWVyRW5lcmd5Q29sbGlzaW9uVGVzdCgpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5fZW5lcmd5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lcmd5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZXJneVNjcmlwdCA9IGVuZXJneS5nZXRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVuZXJneVNjcmlwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZXJneS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclJlY3QgPSB0aGlzLl9wbGF5ZXIuc2NyaXB0LmdldFBsYXllckJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lcmd5UmVjdCA9IGVuZXJneVNjcmlwdC5nZXRFbmVyZ3lCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChwbGF5ZXJSZWN0LCBlbmVyZ3lSZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllci5zY3JpcHQuYWRkRW5lcmd5KGVuZXJneVNjcmlwdC5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVyZ3lzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlRW5lcmd5KGR0KSB7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5Q2RUaW1lICs9IGR0O1xyXG4gICAgICAgIGxldCBpbnRlcnZhbCA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIkJvcm5JbnRlcnZhbFwiLCA0KTtcclxuICAgICAgICBsZXQgbWF4Q291bnQgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJNYXhDb3VudFwiLCA2KTtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5Q2RUaW1lIDwgaW50ZXJ2YWwgfHwgdGhpcy5fZW5lcmd5cy5sZW5ndGggPj0gbWF4Q291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZW5lcmd5Q2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmNyZWF0ZUVuZXJneSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6h566XekluZGV4XHJcbiAgICBqdWRnZXpJbmRleCh5KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG1TaXplLmhlaWdodCAtIE1hdGguZmxvb3IoeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmuLjmiI9cclxuICAgIHN0YXJ0R2FtZShmdW5jKXtcclxuICAgICAgICAvL+iOt+WPluWFs+WNoeaVsOaNrlxyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSB0aGlzLl9sZXZlbENvbmZpZy5FbmVteUNvdW50ICogdGhpcy5fbGV2ZWxJZDtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IHRoaXMuX2xldmVsQ29uZmlnLk1heCArIE1hdGguZmxvb3IodGhpcy5fbGV2ZWxJZC81KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OnRoaXMuX21heEVuZW15Q291bnR9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICAgICAgQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnRFeCgnc3RhcnRfZ2FtZScse1wibGV2ZWxcIjp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRLaWxsRWZmZWN0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVLaWxsRWZmZWN0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0UGxheWVySGl0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXJIaXRUZXN0RW5lbXkoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNob290RWZmZWN0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVTaG9vdEVmZmVjdFRlc3RFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Rlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgfHwgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgfHwgdGhpcy5fdXBncmFkZVRlc3RNb2RlIHx8IHRoaXMuX3Nob290RWZmZWN0VGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTaG9vdEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9vdEVmZmVjdFRlc3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzS2lsbEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlS2lsbEVmZmVjdFRlc3RFbmVteURlYXRoKGVuZW15Tm9kZSkge1xyXG4gICAgICAgIGlmICghZW5lbXlOb2RlIHx8ICFjYy5pc1ZhbGlkKGVuZW15Tm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRlYXRoUG9zID0gY2MudjIoZW5lbXlOb2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZUVuZW15KGVuZW15Tm9kZSk7XHJcbiAgICAgICAgaWYgKGVuZW15Tm9kZS5zY3JpcHQpIHtcclxuICAgICAgICAgICAgZW5lbXlOb2RlLnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZW15Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dLaWxsU2t1bGwoZGVhdGhQb3MpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckJ1YmJsZShcIuWwsei/me+8n1wiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjE1KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheUtpbGxFeHBsb3Npb25FZmZlY3RBdChkZWF0aFBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fcGxheWVyICYmIGNjLmlzVmFsaWQoc2VsZi5fcGxheWVyKSAmJiBzZWxmLl9wbGF5ZXIuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fcGxheWVyLnNjcmlwdC5fc3Bhd25EZWF0aEFmdGVybWF0aEF0KGRlYXRoUG9zLCBzZWxmLl9maXJlLl90bUxheWVyT2JzdGFjbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5fZHJvcFRlc3RFbmVyZ3koZGVhdGhQb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lbXlOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dLaWxsU2t1bGwocG9zKSB7XHJcbiAgICAgICAgbGV0IHNrdWxsID0gbmV3IGNjLk5vZGUoXCJfa2lsbFNrdWxsXCIpO1xyXG4gICAgICAgIHNrdWxsLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBza3VsbC5zZXRQb3NpdGlvbihjYy52Myhwb3MueCwgcG9zLnkgKyA4NSwgMCkpO1xyXG4gICAgICAgIHNrdWxsLnpJbmRleCA9IDYwMDA7XHJcbiAgICAgICAgc2t1bGwub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgc2t1bGwuc2NhbGUgPSAxO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IHNrdWxsLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLwn5KAXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSA0ODtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNTI7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgc2t1bGwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEsIDAsIDM0KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMC41KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4zKSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfZHJvcFRlc3RFbmVyZ3kocG9zKSB7XHJcbiAgICAgICAgbGV0IGZyb21Qb3MgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGxldCB0b1BvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGZyb21Qb3MuYWRkKGNjLnYyKDcwLCAzNSkpLCA0MCk7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuY3JlYXRlRW5lcmd5QXQoZnJvbVBvcyk7XHJcbiAgICAgICAgZW5lcmd5LnNjYWxlID0gMC4yO1xyXG4gICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yOCwgMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygwLjM1LCB0b1BvcywgNDIsIDEpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQbGF5ZXJCdWJibGUodGV4dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1YmJsZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCdWJibGVcIik7XHJcbiAgICAgICAgYnViYmxlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBidWJibGUuc2V0UG9zaXRpb24oY2MudjModGhpcy5fcGxheWVyLngsIHRoaXMuX3BsYXllci55ICsgMTA1LCAwKSk7XHJcbiAgICAgICAgYnViYmxlLnpJbmRleCA9IDYwMDA7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IGJ1YmJsZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC01OCwgLTI0LCAxMTYsIDQ4LCAxMik7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG4gICAgICAgIGJnLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNDAsIDQwLCA0MCwgMjQwKTtcclxuICAgICAgICBiZy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtNTgsIC0yNCwgMTE2LCA0OCwgMTIpO1xyXG4gICAgICAgIGJnLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJCdWJibGVcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ1YmJsZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTE2LCA0OCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyMCwgMjAsIDIwKTtcclxuXHJcbiAgICAgICAgYnViYmxlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oY2MubW92ZUJ5KDAuMTUsIDAsIDEyKSwgY2MuZmFkZUluKDAuMTUpKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjUpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2hha2VNYXAoKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAxKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDMpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgMCwgLTMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAyKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIC00LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDIsIDEpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMCwgLTEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlMaWdodFNjcmVlblNoYWtlKCkge1xyXG4gICAgICAgIGxldCBvcmlnaW4gPSBjYy52Myh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTEwMyk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMiwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAtNCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAxKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDAsIC0xKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDkxMDMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rue7k+adn1xyXG4gICAgc2V0RmluaXNoKCl7XHJcbiAgICAgICAgdGhpcy5fZ2FtaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYW5NYXAoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9nYW1pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKXtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBlbmVteS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuZW15cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NraWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGwgPSB0aGlzLl9za2lsbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHNraWxsKSkge1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NraWxscyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX2VuZXJneXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgICAgIGVuZXJneS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5cyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5Q2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jbGVhclJ1bnRpbWVNYXBOb2RlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhclJ1bnRpbWVNYXBOb2Rlcygpe1xyXG4gICAgICAgIGxldCBydW50aW1lTmFtZXMgPSB7XHJcbiAgICAgICAgICAgIFwiUGxheWVyXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiRW5lbXlcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJCdWxsZXRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJCb29tXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiU2tpbGxJY29uXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiRW5lcmd5SXRlbVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9raWxsU2t1bGxcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfa2lsbEJ1YmJsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl91cGdyYWRlRmxvYXRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJfYnVsbGV0TXV0YXRpb25NZWRhbFwiOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChjaGlsZCkgJiYgcnVudGltZU5hbWVzW2NoaWxkLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzTWFwKCl7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lpI3mtLtcclxuICAgIHJldml2ZSgpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnBvc2l0aW9uID0gdGhpcy5fcGxheWVyTGFzdFBvcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKXtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdW1lKCl7XHJcbiAgICAgICAgdGhpcy5fcGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=