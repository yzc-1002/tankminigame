
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
                    return true;
                }
            }
        }
        else {
            // cc.log("未找到碰撞分区")
        }
        return false;
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
    GameMap.prototype.isTestMode = function () {
        return this._killEffectTestMode || this._playerHitTestMode || this._upgradeTestMode;
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
            self._showKillExplosion(deathPos);
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
    GameMap.prototype._showKillExplosion = function (pos) {
        var boom = cc.instantiate(this._player.script.boomPrefab);
        boom.parent = this._fire._tmLayerObstacle;
        boom.position = cc.v3(pos);
        boom.zIndex = 6000;
        var ani = boom.getComponent(cc.Animation);
        if (ani) {
            ani.play("boom2");
        }
        boom.runAction(cc.sequence(cc.delayTime(0.8), cc.removeSelf()));
        MusicManager_1.MusicManager.playEffect("boom");
        this.playLightScreenShake();
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
            "_upgradeFloat": true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUNuRCwyQ0FBd0M7QUFDeEMsb0RBQW1EO0FBQ25ELDhCQUE4QjtBQUM5Qiw0Q0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyw0Q0FBeUM7QUFDbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsZUFBZTtBQUNmLHdCQUF3QjtBQUV4QjtJQUE2QiwyQkFBYTtJQUExQztRQUFBLHFFQXN6Q0M7UUFuekNHLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUduQyxzQkFBZ0IsR0FBYyxJQUFJLENBQUM7UUFHbkMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBR25DLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRXZDLE1BQU07UUFDTixlQUFTLEdBQUssSUFBSSxDQUFDLENBQUssV0FBVztRQUNuQyxjQUFRLEdBQU0sSUFBSSxDQUFDLENBQUssS0FBSztRQUM3QixZQUFNLEdBQVEsSUFBSSxDQUFDLENBQUssVUFBVTtRQUNsQyxhQUFPLEdBQU8sSUFBSSxDQUFDLENBQUssVUFBVTtRQUNsQyxhQUFPLEdBQU8sSUFBSSxDQUFDLENBQUssTUFBTTtRQUM5QixlQUFTLEdBQUssSUFBSSxDQUFDLENBQUssTUFBTTtRQUU5QixnQkFBVSxHQUFJLEVBQUUsQ0FBQyxD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QUksVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUVoRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztTQUN0QjtRQUNELElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUU7WUFDbkIsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7U0FDckI7UUFDRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDckIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztTQUN2QjtRQUNELElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUU7WUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDdEI7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxxQ0FBbUIsR0FBbkIsVUFBb0IsR0FBRztRQUNuQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdB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QyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDbUI7SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDbUI7SUE5QjlCLE9BQU87UUFEbkIsT0FBTztPQUNLLE9BQU8sQ0FzekNuQjtJQUFELGNBQUM7Q0F0ekNELEFBc3pDQyxDQXR6QzRCLDZCQUFhLEdBc3pDekM7QUF0ekNZLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5pbXBvcnQge0VuZXJneUl0ZW19IGZyb20gXCIuL0VuZXJneUl0ZW1cIjtcclxuaW1wb3J0IHsgTXVzaWNNYW5hZ2VyIH0gZnJvbSBcIi4vYmFzZS9NdXNpY01hbmFnZXJcIjtcclxuLy/nlLXlrZDpgq7ku7ZwdWhhbHNraWpzZW1lbkBnbWFpbC5jb21cclxuLy/mupDnoIHnvZHnq5kg5byAdnBu5YWo5bGA5qih5byP5omT5byAIGh0dHA6Ly93ZWIzaW5jdWJhdG9ycy5jb20vXHJcbi8v55S15oqlaHR0cHM6Ly90Lm1lL2dhbWVjb2RlOTk5XHJcbi8v572R6aG15a6i5pyNIGh0dHA6Ly93ZWIzaW5jdWJhdG9ycy5jb20va2VmdS5odG1sXHJcbmltcG9ydCB7QW5hbHl0aWNzfSBmcm9tIFwiLi9hZC9BbmFseXRpY3NcIjtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vL+engeacieWHveaVsCzor7fkvb/nlKgnXyflvIDlpLRcclxuLy/or7fkv67mlLknTmV3Q2xhc3MnID0+IOiHquW3seeahOexu+WQjVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgR2FtZU1hcCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0cmVlMDFQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0cmVlMDJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG1vdW50YWluMDFQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBtb3VudGFpbjAyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbW91bnRhaW4wM1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBlbmVteVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgcGxheWVyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBza2lsbFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBlbmVyZ3lQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/lhoXpg6jlj5jph49cclxuICAgIF90aWxlZE1hcCAgID0gbnVsbDsgICAgIC8vVGlsZWQgTWFwXHJcbiAgICBfdG1Hcm91cCAgICA9IG51bGw7ICAgICAvL+aZrumAmuWxglxyXG4gICAgX3RtT2JqICAgICAgPSBudWxsOyAgICAgLy/lr7nosaHlsYIo6Zqc56KN54mpKVxyXG4gICAgX3RtQm9ybiAgICAgPSBudWxsOyAgICAgLy/lr7nosaHlsYIo5Ye655Sf54K5KVxyXG4gICAgX3RtU2l6ZSAgICAgPSBudWxsOyAgICAgLy/lnLDlm77lsLrlr7hcclxuICAgIF90aWxlU2l6ZSAgID0gbnVsbDsgICAgIC8v55Om54mH5bC65a+4XHJcblxyXG4gICAgX2NvbGxpZGVycyAgPSBbXTsgICAgICAgLy/norDmkp7mo4DmtYvliJfooahcclxuICAgIF9jaGVja0xpc3QgID0ge307ICAgICAgIC8vQSrmo4DmtYvliJfooahcclxuICAgIF9sb2dpY0FyZWEgID0gW107ICAgICAgIC8v6YC76L6R56Kw5pKe5YiG5Yy6XHJcblxyXG4gICAgX3BsYXllciAgICAgICAgICAgICA9IG51bGw7ICAgICAvL+eOqeWutlxyXG4gICAgX2VuZW15cyAgICAgICAgICAgICA9IFtdOyAgICAgICAvL+aVjOS6uuWIl+ihqFxyXG4gICAgX3BsYXllckJvcm5Qb3MgICAgICA9IG51bGw7ICAgICAvL3BsYXllcuWHuueUn+eCuVxyXG4gICAgX2VuZW15Qm9yblBvcyAgICAgICA9IFtdOyAgICAgICAvL+aVjOS6uuWHuueUn+eCueWIl+ihqFxyXG4gICAgX2Jvcm5DZFRpbWUgICAgICAgICA9IDA7ICAgICAgICAvL+aVjOS6uueUn+aIkOmXtOmalOaXtumXtFxyXG4gICAgX2Jvcm5FbmVteUNvdW50ICAgICA9IDA7ICAgICAgICAvL+W3sue7j+WHuueUn+eahOaVjOS6uuaVsOmHj1xyXG4gICAgX2RlYXRoRW5lbXlDb3VudCAgICA9IDA7ICAgICAgICAvL+W3sue7j+atu+S6oeeahOaVjOS6uuaVsOmHj1xyXG4gICAgX21heEVuZW15Q291bnQgICAgICA9IDA7ICAgICAgICAvL+acgOWkp+aVjOS6uuaVsOmHj1xyXG4gICAgX3RpbWVNYXhFbmVteUNvdW50ICA9IDA7ICAgICAgICAvL+WQjOWxj+acgOWkp+aVjOS6uuaVsOmHj1xyXG4gICAgX3NraWxscyAgICAgICAgICAgICA9IFtdOyAgICAgICAvL+maj+acuueUn+aIkOeahOaKgOiDvVxyXG4gICAgX2VuZXJneXMgICAgICAgICAgICA9IFtdOyAgICAgICAvL+WcsOWbvuS4iueahOiDvemHj1xyXG4gICAgX2VuZXJneUNkVGltZSAgICAgICA9IDA7ICAgICAgICAvL+iDvemHj+eUn+aIkOmXtOmalOaXtumXtFxyXG5cclxuICAgIF9wYXVzZSAgICAgICAgICA9IGZhbHNlOyAgICAvL+aYr+WQpuWkhOS6juaaguWBnOeKtuaAgVxyXG4gICAgX2dhbWluZyAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5aSE5LqO5ri45oiP5LitIFxyXG4gICAgX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlOyAvL+WHu+adgOaViOaenOa1i+ivleaooeW8j1xyXG4gICAgX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7IC8v5Y+X5Ye75rWL6K+V5qih5byPXHJcbiAgICBfdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7IC8v5Y2H57qn5rWL6K+V5qih5byPXHJcbiAgICBfbGV2ZWxJZCAgICAgICAgPSAxOyAgICAgICAgLy/lvZPliY3lhbPljaFpZFxyXG4gICAgX2xldmVsQ29uZmlnICAgID0gbnVsbDsgICAgIC8v5b2T5YmN5YWz5Y2h6YWN572uXHJcblxyXG4gICAgX3JvYW1GbGcgICAgICAgID0gZmFsc2U7ICAgICAgICAgIC8v5ryr5ri45qCH6K6wXHJcbiAgICBfcm9hbURpciAgICAgICAgPSBjYy52MigxLDApOyAgICAgLy/mvKvmuLjmlrnlkJFcclxuXHJcbiAgICBfcGxheWVyTGFzdFBvcyAgPSAwO1xyXG5cclxuICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5byA5ZCv56Kw5pKe55uR5ZCsXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAvL+W8gOWQr+e7mOWItueisOaSnue7hOS7tueahOW9oueKtlxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ICA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIC8vIOaYvuekuueisOaSnue7hOS7tueahOWMheWbtOebklxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOmanOeijeeJqSlcclxuICAgICAgICB0aGlzLl9pbml0VG1PYnN0YWNsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyWdGlsZWQgbWFwIOeahOWvueixoSjlh7rnlJ/ngrkpXHJcbiAgICAgICAgdGhpcy5faW5pdFRtQm9ybigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcclxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fdGlsZWRNYXAgPSB0aGlzLm5vZGVbXCIkVGlsZWRNYXBcIl07XHJcbiAgICAgICAgdGhpcy5fdG1Hcm91cCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJHcm91cC4kVGlsZWRMYXllcjtcclxuICAgICAgICAvLyB0aGlzLl9maXJlLl90bUxheWVyR3JvdXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdG1PYmogPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuJFRpbGVkT2JqZWN0R3JvdXA7XHJcbiAgICAgICAgdGhpcy5fdG1Cb3JuID0gdGhpcy5fZmlyZS5fdG1MYXllckJvcm4uJFRpbGVkT2JqZWN0R3JvdXA7XHJcbiAgICAgICAgdGhpcy5fdG1TaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgLy8gdGhpcy5fdG1TaXplID0gbmV3IGNjLlNpemUodGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoICogdGhpcy5fdGlsZWRNYXAuZ2V0VGlsZVNpemUoKS53aWR0aCwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodCAqIHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCkuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl90aWxlU2l6ZSA9IHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZ0aWxlZCBtYXAg55qE5a+56LGhKOmanOeijeeJqSlcclxuICAgIF9pbml0VG1PYnN0YWNsZSgpe1xyXG4gICAgICAgIGxldCBfc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtT2JqLmdldE9iamVjdHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9iamVjdHMxMVwiLG9iamVjdHMpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/ojrflj5bkvY3nva5cclxuICAgICAgICAgICAgbGV0IHRpbGVkUG9zID0gY2MudjIob2JqLm9mZnNldC54ICsgb2JqLndpZHRoLzIsIG9iai5vZmZzZXQueSArIG9iai5oZWlnaHQvMik7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLl90aWxlUG9zVG9HYW1lUG9zKHRpbGVkUG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoubmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDFQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDJQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJtb3VudGFpbjAxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnN0YWNsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW91bnRhaW4wMVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoubmFtZSA9PSBcIm1vdW50YWluMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb3VudGFpbjAyUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai5uYW1lID09IFwibW91bnRhaW4wM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vdW50YWluMDNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wb3NpdGlvbiA9IGNjLnYzKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG9mZnNldC55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoucG9seWxpbmVQb2ludHMubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBvYmoucG9seWxpbmVQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gb2JqLnBvbHlsaW5lUG9pbnRzW2orMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5Yib5bu6Y29sbGlkZXIgbGluZVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIudGFnID0gb2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMF0gPSBjYy52MihzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMV0gPSBjYy52MihlbmQpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzLnNwbGljZSgyLDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sbGlkZXJzLnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrKysrKysrKysrKytfaW5pdFRtT2JzdGFjbGUgdGltZTEgXCIsY29zdCk7XHJcbiAgICAgICAgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGxldCBsb2dpY1dpZHRoID0gdGhpcy5fdG1TaXplLndpZHRoLzQ7XHJcbiAgICAgICAgbGV0IGxvZ2ljSGVpZ2h0ID0gdGhpcy5fdG1TaXplLmhlaWdodC80O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgNDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNjsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhOmFueSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgYXJlYS54ID0geCpsb2dpY1dpZHRoLXRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgYXJlYS55ID0geSpsb2dpY0hlaWdodC10aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgICAgICBhcmVhLndpZHRoID0gbG9naWNXaWR0aDtcclxuICAgICAgICAgICAgICAgIGFyZWEuaGVpZ2h0ID0gbG9naWNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBuZXcgY2MuUmVjdChhcmVhLngtMTAsYXJlYS55LTEwLGxvZ2ljV2lkdGgrMjAsbG9naWNIZWlnaHQrMjApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVJblJlY3QoQSxCLHJlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEucHVzaCh7QTpBLEI6Qn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2ljQXJlYS5wdXNoKGFyZWEpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGNvc3QgPSBfZW5kVGltZSAtIF9zdGFydFRpbWU7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiKysrKysrKysrKysrX2luaXRUbU9ic3RhY2xlIHRpbWUyIFwiLGNvc3QpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo5Ye655Sf54K5KVxyXG4gICAgX2luaXRUbUJvcm4oKXtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtQm9ybi5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhvYmoub2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKG9iai5uYW1lID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckJvcm5Qb3MgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gY2MudjModGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlCb3JuUG9zLnB1c2gocG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDUsIHRpbGUpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMaXN0ID0gdGhpcy5pbml0Q2hlY2tMaXN0KCk7XHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrY29zdCB0aW1lIFwiLGNvc3QpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eUn+aIkHBsYXllclxyXG4gICAgY3JlYXRlUGxheWVyKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJUeXBlID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2N1cnJlbnRfcGxheWVyX3R5cGVfXCIsMSk7XHJcbiAgICAgICAgbGV0IHBsYXllckxldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfcGxheWVyXyR7cGxheWVyVHlwZX1fYCwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiKTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wb3NpdGlvbiA9IHRoaXMuX3BsYXllckJvcm5Qb3M7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRQbGF5ZXJUeXBlKHBsYXllclR5cGUscGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGNyZWF0ZUVuZW15KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+maj+acuueyvuiLseaAqlxyXG4gICAgICAgIGxldCBlbWVteVR5cGUgPSAxMTtcclxuICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5yYW5kb20oKSoxMDA7XHJcbiAgICAgICAgaWYgKHJhbmRvbSA8IDQpIHsgZW1lbXlUeXBlID0gMTI7IH1cclxuICAgICAgICBpZiAocmFuZG9tIDwgMSkgIHsgZW1lbXlUeXBlID0gMTM7IH1cclxuXHJcbiAgICAgICAgbGV0IGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVteVByZWZhYik7XHJcbiAgICAgICAgZW5lbXkucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gdGhpcy5fZW5lbXlCb3JuUG9zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLl9lbmVteUJvcm5Qb3MubGVuZ3RoKV07XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldE1hcCh0aGlzKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0VGFyZ2V0KHRoaXMuX3BsYXllcik7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldEVuZW15VHlwZShlbWVteVR5cGUsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5Y+X5Ye75rWL6K+V5pWM5Lq6XHJcbiAgICBjcmVhdGVQbGF5ZXJIaXRUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDIzMCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBlbmVteS5zY3JpcHQuX2NvbmZpZyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9jb25maWcuQXR0YWNrUmFkaXVzID0gNTIwO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5fY29uZmlnLkJ1bGxldENvZGVUaW1lID0gMC40NTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuX2J1bGxldENvZGVUaW1lID0gZW5lbXkuc2NyaXB0Ll9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcbiAgICAgICAgZW5lbXkuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVteS55KTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmrovooYDmtYvor5XmlYzkurpcclxuICAgIGNyZWF0ZUtpbGxFZmZlY3RUZXN0RW5lbXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMuX3BsYXllci5wb3NpdGlvbikuYWRkKGNjLnYyKDI2MCwgMCkpO1xyXG4gICAgICAgIGVuZW15LnBvc2l0aW9uID0gY2MudjModGhpcy5jbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCA4MCkpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnNldFRhcmdldCh0aGlzLl9wbGF5ZXIpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRFbmVteVR5cGUoMTEsdGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0Ll9ocCA9IDE7XHJcbiAgICAgICAgZW5lbXkuc2NyaXB0LnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGVuZW15LnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoZW5lbXkueSk7XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzLnB1c2goZW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQ5LiA5Liq5pWM5Lq6XHJcbiAgICBkZWxldGVFbmVteShkZWxFbmVteSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgaWYgKGVuZW15ID09IGRlbEVuZW15KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ICs9MTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVteXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDowfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTa2lsbEljb24oZGVsRW5lbXkucG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCArPTE7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OnRoaXMuX21heEVuZW15Q291bnQgLSB0aGlzLl9kZWF0aEVuZW15Q291bnR9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmVteXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaVjOS6uuaVsOmHj1xyXG4gICAgZW5lbXlDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5lbXlzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkOS4gOS4quaKgOiDvWljb25cclxuICAgIGNyZWF0ZVNraWxsSWNvbihwb3MpIHtcclxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMDYpIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsID0gY2MuaW5zdGFudGlhdGUodGhpcy5za2lsbFByZWZhYik7XHJcbiAgICAgICAgICAgIHNraWxsLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICAgICAgc2tpbGwucG9zaXRpb24gPSBwb3M7XHJcbiAgICAgICAgICAgIHNraWxsLnNjcmlwdC5zZXRJbkdhbWUoKTtcclxuICAgICAgICAgICAgc2tpbGwuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChza2lsbC55KTtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGxzLnB1c2goc2tpbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZ2V0RW5lcmd5Q29uZmlnKGtleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHl5cC5jb25maWcuRW5lcmd5IHx8IHt9O1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGNvbmZpZ1trZXldO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pmo/mnLrnlJ/miJDkuIDkuKrog73ph49cclxuICAgIGNyZWF0ZUVuZXJneSgpIHtcclxuICAgICAgICBsZXQgdGlsZSA9IHRoaXMuX2dldFJhbmRvbVBhc3NhYmxlVGlsZSgpO1xyXG4gICAgICAgIGlmICh0aWxlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuZW5lcmd5UHJlZmFiID8gY2MuaW5zdGFudGlhdGUodGhpcy5lbmVyZ3lQcmVmYWIpIDogdGhpcy5fY3JlYXRlRGVmYXVsdEVuZXJneSgpO1xyXG4gICAgICAgIGVuZXJneS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lcmd5LnBvc2l0aW9uID0gY2MudjModGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpKTtcclxuICAgICAgICBlbmVyZ3kuekluZGV4ID0gdGhpcy5qdWRnZXpJbmRleChlbmVyZ3kueSk7XHJcblxyXG4gICAgICAgIGxldCBlbmVyZ3lTY3JpcHQgPSBlbmVyZ3kuZ2V0Q29tcG9uZW50KEVuZXJneUl0ZW0pIHx8IGVuZXJneS5hZGRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fZ2V0RW5lcmd5Q29uZmlnKFwiVmFsdWVcIiwgMTApO1xyXG4gICAgICAgIGxldCBsaWZlVGltZSA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIkxpZmVUaW1lXCIsIDEyKTtcclxuICAgICAgICBlbmVyZ3lTY3JpcHQuaW5pdCh2YWx1ZSwgbGlmZVRpbWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9lbmVyZ3lzLnB1c2goZW5lcmd5KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVFbmVyZ3lBdChwb3MpIHtcclxuICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5lbmVyZ3lQcmVmYWIgPyBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZXJneVByZWZhYikgOiB0aGlzLl9jcmVhdGVEZWZhdWx0RW5lcmd5KCk7XHJcbiAgICAgICAgZW5lcmd5LnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBlbmVyZ3kucG9zaXRpb24gPSBjYy52Myhwb3MpO1xyXG4gICAgICAgIGVuZXJneS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KGVuZXJneS55KTtcclxuXHJcbiAgICAgICAgbGV0IGVuZXJneVNjcmlwdCA9IGVuZXJneS5nZXRDb21wb25lbnQoRW5lcmd5SXRlbSkgfHwgZW5lcmd5LmFkZENvbXBvbmVudChFbmVyZ3lJdGVtKTtcclxuICAgICAgICBlbmVyZ3lTY3JpcHQuaW5pdCh0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJWYWx1ZVwiLCAxMCksIHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIkxpZmVUaW1lXCIsIDEyKSk7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5cy5wdXNoKGVuZXJneSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZXJneTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlRGVmYXVsdEVuZXJneSgpIHtcclxuICAgICAgICBsZXQgZW5lcmd5ID0gbmV3IGNjLk5vZGUoXCJFbmVyZ3lJdGVtXCIpO1xyXG4gICAgICAgIGVuZXJneS5hZGRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZXJneTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0UmFuZG9tUGFzc2FibGVUaWxlKCkge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY2hlY2tMaXN0KTtcclxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2NoZWNrTGlzdFtrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV1dO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAmJiB0aGlzLl9pc0VuZXJneVRpbGVFbXB0eShpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLnYyKGl0ZW0ueCwgaXRlbS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2lzRW5lcmd5VGlsZUVtcHR5KHRpbGUpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpO1xyXG4gICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIk1pbkRpc3RhbmNlXCIsIDEyMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJMZW4gPSBwb3Muc3ViKHRoaXMuX3BsYXllci5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJMZW4gPCBtaW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZXJneXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuX2VuZXJneXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZXJneSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBwb3Muc3ViKGVuZXJneS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgbWluRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pyA6L+R55qE5pWM5Lq6XHJcbiAgICBnZXROZWFyRW5lbXkoKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHJldExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGVuZW15UG9zID0gY2MudjIoZW5lbXkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyUG9zID0gY2MudjIodGhpcy5fcGxheWVyLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IGVuZW15UG9zLnN1YihwbGF5ZXJQb3MpLm1hZygpXHJcbiAgICAgICAgICAgIGlmIChyZXQgPT0gbnVsbCB8fCBsZW4gPCByZXRMZW4pIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IGVuZW15O1xyXG4gICAgICAgICAgICAgICAgcmV0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WcqOWQjOS4gOS4qnRpbGUs6L+Y5pyJ5YW25LuW5pWM5Lq6XHJcbiAgICBpc0hhdmVPdGhlckVuZW15KGVuZW15KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG90aGVyRW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGlmIChvdGhlckVuZW15ICE9IGVuZW15KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMuZ2FtZVBvc1RvVGlsZShlbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3RoZXJUaWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKG90aGVyRW5lbXkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUueCA9PSBvdGhlclRpbGUueCAmJiB0aWxlLnkgPT0gb3RoZXJUaWxlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aMieS4i1xyXG4gICAgX29uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgICAgIGxldCBhID0xO1xyXG4gICAgICAgIC8vIGxldCBwb2ludCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAvLyBsZXQgdGlsZSA9IHRoaXMuZ2FtZVBvc1RvVGlsZShwb2ludCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXNldE1hcCgpIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoOyByb3crKykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodDsgY29sKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDEsIGNjLnYyKHJvdyxjb2wpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3RpbGVkIG1hcOWdkOagh+i9rOaNouS4uua4uOaIj+WdkOagh1xyXG4gICAgX3RpbGVQb3NUb0dhbWVQb3ModGlsZWRQb3MpIHtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGlsZWRQb3MueCwgdGhpcy5fdG1TaXplLmhlaWdodCAtIHRpbGVkUG9zLnkpO1xyXG4gICAgICAgIHBvcy54ID0gcG9zLnggLSB0aGlzLl90bVNpemUud2lkdGgvMjtcclxuICAgICAgICBwb3MueSA9IHBvcy55IC0gdGhpcy5fdG1TaXplLmhlaWdodC8yO1xyXG5cclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGlsZeWdkOagh+i9rOaNouS4uua4uOaIj+WdkOagh1xyXG4gICAgdGlsZVRvR2FtZVBvcyh0aWxlKSB7XHJcbiAgICAgICAgbGV0IHggPSB0aWxlLnggKiB0aGlzLl90aWxlU2l6ZS53aWR0aCArIHRoaXMuX3RpbGVTaXplLndpZHRoLzI7XHJcbiAgICAgICAgbGV0IHkgPSB0aWxlLnkgKiB0aGlzLl90aWxlU2l6ZS5oZWlnaHQgKyB0aGlzLl90aWxlU2l6ZS5oZWlnaHQvMjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVQb3NUb0dhbWVQb3MoY2MudjIoeCx5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/muLjmiI/lnZDmoIfovazmjaLkuLp0aWxlZCBtYXDlnZDmoIdcclxuICAgIF9nYW1lUG9zVG9UaWxlUG9zKGdhbWVQb3MpIHtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIoZ2FtZVBvcyk7XHJcbiAgICAgICAgcG9zLnggPSBwb3MueCArIHRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgIHBvcy55ID0gcG9zLnkgKyB0aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgcG9zLnkgPSB0aGlzLl90bVNpemUuaGVpZ2h0IC0gcG9zLnk7XHJcblxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy/muLjmiI/lnZDmoIfovazmjaLkuLp0aWxl5Z2Q5qCHXHJcbiAgICBnYW1lUG9zVG9UaWxlKGdhbWVQb3MpIHtcclxuICAgICAgICBsZXQgdGlsZVBvcyA9IHRoaXMuX2dhbWVQb3NUb1RpbGVQb3MoZ2FtZVBvcyk7XHJcbiAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKHRpbGVQb3MueCAvIHRoaXMuX3RpbGVTaXplLndpZHRoKTtcclxuICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IodGlsZVBvcy55IC8gdGhpcy5fdGlsZVNpemUuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yid5aeL5YyWQSrmo4DmtYvliJfooahcclxuICAgIGluaXRDaGVja0xpc3QgKCkge1xyXG4gICAgICAgIGxldCByZXQgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3MoY2MudjIoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVzdENvbGxpZGVycyhwb3MsNTApLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gOiBhbnk9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ueCA9IHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS55ID0geTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLkcgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uSCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mYXRoZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFzc2FibGUgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICByZXRbeCtcIl9cIit5XSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fdG1Hcm91cC5zZXRUaWxlR0lEQXQoMywgY2MudjIoeCx5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gcmV0W3grXCJfXCIreV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gdGhpcy50aWxlVG9HYW1lUG9zKGNjLnYyKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3eCA9IHgtMTsgbmV3eCA8PSB4KzE7IG5ld3grKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG5ld3kgPSB5LTE7IG5ld3kgPD0geSsxOyBuZXd5Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSByZXRbbmV3eCtcIl9cIituZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdQYXNzYWJsZUl0ZW0gPSBpdGVtLnBhc3NhYmxlW25ld3grXCJfXCIrbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHggIT0gbmV3eCB8fCB5ICE9IG5ld3kpICYmIG5ld0l0ZW0gJiYgbmV3UGFzc2FibGVJdGVtID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3MoY2MudjIobmV3eCwgbmV3eSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNpcmNsZUNpcmNsZVBhc3NDb2xsaWRlcnMocG9zLG5ld3Bvcyw1MCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXNzYWJsZVtuZXd4K1wiX1wiK25ld3ldID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5wYXNzYWJsZVt4K1wiX1wiK3ldID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5ZBKuajgOa1i+WIl+ihqFxyXG4gICAgZ2V0Q2hlY2tMaXN0ICgpIHtcclxuICAgICAgICB2YXIgb2JqU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fY2hlY2tMaXN0KTtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShvYmpTdHJpbmcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iOt+WPlnBvc+aJgOWcqHRpbGUs5pyA6L+R55qE5Y+v6YCa6KGMdGlsZVxyXG4gICAgZ2V0UGFzc2FibGVUaWxlICh0aWxlLHJlZmVyVGlsZSkge1xyXG4gICAgICAgIC8v5Yik5pat6Ieq5bexXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX2NoZWNrTGlzdFt0aWxlLnggKyBcIl9cIiArIHRpbGUueV0pIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHRpbGU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvL+WIpOaWreS4gOeOr1xyXG4gICAgICAgIGxldCByZXRUaWxlID0gbnVsbDtcclxuICAgICAgICBsZXQgcmV0TGVuID0gMDtcclxuICAgICAgICBmb3IgKGxldCB4ID0gLTE7IHggPD0gMTsgeCsrKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSAocmVmZXJUaWxlLngtbmV3eCkqKHJlZmVyVGlsZS54LW5ld3gpICsgKHJlZmVyVGlsZS55LW5ld3kpKihyZWZlclRpbGUueS1uZXd5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFRpbGUgPT0gbnVsbCB8fCBsZW4gPCByZXRMZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGUgPSBuZXd0aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXRUaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRUaWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/liKTmlq3kuoznjq9cclxuICAgICAgICByZXRUaWxlID0gbnVsbDtcclxuICAgICAgICByZXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAtMjsgeCA8PSAyOyB4Kyspe1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gLTI7IHkgPD0gMjsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGlmICh4ID09IC0yIHx8IHggPT0gMiB8fCB5ID09IC0yIHx8IHkgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gdGlsZS54ICsgeDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IHRpbGUueSArIHk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3RpbGUgPSB0aGlzLl9jaGVja0xpc3RbbmV3eCArIFwiX1wiICsgbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld3RpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0gKHJlZmVyVGlsZS54LW5ld3gpKihyZWZlclRpbGUueC1uZXd4KSArIChyZWZlclRpbGUueS1uZXd5KSoocmVmZXJUaWxlLnktbmV3eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRUaWxlID09IG51bGwgfHwgbGVuIDwgcmV0TGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRUaWxlID0gbmV3dGlsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldExlbiA9IGxlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0VGlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0VGlsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+WcG9z5omA5ZyodGlsZSzmnIDov5HnmoTlj6/pgJrooYx0aWxlXHJcbiAgICBnZXRQYXNzYWJsZVRpbGVFeCAodGlsZSkge1xyXG4gICAgICAgIC8v5Yik5pat5LiA546vXHJcbiAgICAgICAgbGV0IHJldFRpbGVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IC0yOyB4IDw9IDI7IHgrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMjsgeSA8PSAyOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKHggIT0gMCB8fCB5IT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gdGlsZS54ICsgeDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IHRpbGUueSArIHk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3RpbGUgPSB0aGlzLl9jaGVja0xpc3RbbmV3eCArIFwiX1wiICsgbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld3RpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRUaWxlcy5wdXNoKG5ld3RpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJldFRpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJldFRpbGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRUaWxlc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDnur/mrrVQUDEs5piv5ZCm5Lya57uP6L+HY29sbGlkZXJz5Lit55qE5LiA5p2h57q/5q61XHJcbiAgICBsaW5lTGluZVBhc3NDb2xsaWRlcnMoUCxQMSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2xsaWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMubGluZVBhc3NMaW5lKFAsUDEsQSxCKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOeCuVAsUDHkuLrlnIblv4MscmFkaXVz5Li65Y2K5b6E55qE5ZyGLOaYr+WQpuS8mue7j+i/h2NvbGxpZGVyc+S4reeahOS4gOadoee6v+autVxyXG4gICAgY2lyY2xlQ2lyY2xlUGFzc0NvbGxpZGVycyhQLFAxLHJhZGl1cyl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2xsaWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMuY2lyY2xlQ2lyY2xlUGFzc0xpbmUoUCxQMSxyYWRpdXMsQSxCKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v56Kw5pKe5rWL6K+VKOS7peeCuVDkuLrlnIblv4Ms5Y2K5b6E5Li6cmFkaXVz55qE5ZyGLOaYr+WQpuWSjGNvbGxpZGVyc+S4reeahOe6v+auteebuOS6pClcclxuICAgIHRlc3RDb2xsaWRlcnMoUCwgcmFkaXVzKXtcclxuICAgICAgICBsZXQgY29sbGlkZXJJdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2NvbGxpZGVycykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29sbGlkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1trZXldO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVySXRlbSA9IFV0aWxzLmdldFBvaW50TGluZVNob3J0ZXN0SW5mbyhQLCBBLCBCKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVySXRlbS5sZW4gPD0gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJJdGVtLmNvbGxpZGVyID0gY29sbGlkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJJdGVtcy5wdXNoKGNvbGxpZGVySXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlckl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5q+P5bin6LCD55SoXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGF1c2UpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZ2FtaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVGVzdE1vZGUoKSA9PSBmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA+IDEgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15cy5sZW5ndGggPCB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPCB0aGlzLl9tYXhFbmVteUNvdW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy/lnLDlm77mu5rliqhcclxuICAgICAgICAgICAgdGhpcy5yb2xsTWFwKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Rlc3RNb2RlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUVuZXJneShkdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJMYXN0UG9zID0gdGhpcy5fcGxheWVyLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JvYW1GbGcpIHtcclxuICAgICAgICAgICAgICAgIGxldCByb2FtUG9zaXRpb24gPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLmFkZCh0aGlzLl9yb2FtRGlyKTtcclxuICAgICAgICAgICAgICAgIHJvYW1Qb3NpdGlvbiA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihyb2FtUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvYW1Qb3NpdGlvbi54ID09IHRoaXMubm9kZS54ICYmIHJvYW1Qb3NpdGlvbi55ID09IHRoaXMubm9kZS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9hbURpci54ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9hbURpci55ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ID0gcm9hbVBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSByb2FtUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WcsOWbvua7muWKqFxyXG4gICAgcm9sbE1hcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllci54LC10aGlzLl9wbGF5ZXIueSkpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHJldC54O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHJldC55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Vmlld3BvcnRTaXplKCkge1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBVdGlscy5nZXRDdXJyZW50U2NlbmVDYW52YXMoKTtcclxuICAgICAgICBpZiAoY2FudmFzICYmIGNjLmlzVmFsaWQoY2FudmFzKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FudmFzLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2aXNpYmxlU2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcclxuICAgICAgICBpZiAodmlzaWJsZVNpemUgJiYgdmlzaWJsZVNpemUud2lkdGggPiAwICYmIHZpc2libGVTaXplLmhlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpc2libGVTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeXlwLmdhbWVGcmFtZVNpemUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHl5cC5nYW1lRnJhbWVTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2Mud2luU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFtcE1hcElubmVyUG9zaXRpb24ocG9zLCBwYWRkaW5nID0gMCkge1xyXG4gICAgICAgIGxldCByZXQgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGxldCBoYWxmV2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLl90bVNpemUud2lkdGggLyAyIC0gcGFkZGluZyk7XHJcbiAgICAgICAgbGV0IGhhbGZIZWlnaHQgPSBNYXRoLm1heCgwLCB0aGlzLl90bVNpemUuaGVpZ2h0IC8gMiAtIHBhZGRpbmcpO1xyXG5cclxuICAgICAgICBpZiAocmV0LnggPCAtaGFsZldpZHRoKSB7XHJcbiAgICAgICAgICAgIHJldC54ID0gLWhhbGZXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldC54ID4gaGFsZldpZHRoKSB7XHJcbiAgICAgICAgICAgIHJldC54ID0gaGFsZldpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPCAtaGFsZkhlaWdodCkge1xyXG4gICAgICAgICAgICByZXQueSA9IC1oYWxmSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPiBoYWxmSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldC55ID0gaGFsZkhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9jb3JyZWN0TWFwUG9zaXRpb24ocmV0KXtcclxuICAgICAgICBsZXQgdmlld3BvcnRTaXplID0gdGhpcy5fZ2V0Vmlld3BvcnRTaXplKCk7XHJcbiAgICAgICAgbGV0IHggPSBNYXRoLm1heCgwLCAodGhpcy5fdG1TaXplLndpZHRoIC0gdmlld3BvcnRTaXplLndpZHRoKSAvIDIpO1xyXG4gICAgICAgIGxldCB5ID0gTWF0aC5tYXgoMCwgKHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSB2aWV3cG9ydFNpemUuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgIGxldCBtaW5Qb3MgPSBjYy52MigteCwteSk7XHJcbiAgICAgICAgbGV0IG1heFBvcyA9IGNjLnYyKHgseSk7XHJcblxyXG4gICAgICAgIGlmIChyZXQueCA8IG1pblBvcy54KSB7XHJcbiAgICAgICAgICAgIHJldC54ID0gbWluUG9zLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueCA+IG1heFBvcy54KSB7XHJcbiAgICAgICAgICAgIHJldC54ID0gbWF4UG9zLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueSA8IG1pblBvcy55KSB7XHJcbiAgICAgICAgICAgIHJldC55ID0gbWluUG9zLnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXQueSA+IG1heFBvcy55KSB7XHJcbiAgICAgICAgICAgIHJldC55ID0gbWF4UG9zLnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v57q/5q615LiO55+p5b2i55u45Lqk5oiW6ICF5YyF5ZCr5Zyo55+p5b2i6YeM6Z2iXHJcbiAgICBfbGluZUluUmVjdChBLEIscmVjdCl7XHJcbiAgICAgICAgaWYgKChBLnggPj0gcmVjdC54ICYmIEEueCA8PSByZWN0LnggKyByZWN0LndpZHRoICYmIEEueSA+PSByZWN0LnkgJiYgQS55IDw9IHJlY3QueSArIHJlY3QuaGVpZ2h0KSB8fFxyXG4gICAgICAgICAgICAoQi54ID49IHJlY3QueCAmJiBCLnggPD0gcmVjdC54ICsgcmVjdC53aWR0aCAmJiBCLnkgPj0gcmVjdC55ICYmIEIueSA8PSByZWN0LnkgKyByZWN0LmhlaWdodCkgfHxcclxuICAgICAgICAgICAgY2MuSW50ZXJzZWN0aW9uLmxpbmVSZWN0KEEsQixyZWN0KSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lrZDlvLks6Zqc56KN54mp56Kw5pKe5qOA5rWLXHJcbiAgICBidWxsZXRPYnN0YWNsZUNvbGxpc2lvblRlc3QoUCxQMSl7XHJcbiAgICAgICAgLy/ojrflj5bnorDmkp7ljLpcclxuICAgICAgICBsZXQgY3VyckFyZWEgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbG9naWNBcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5fbG9naWNBcmVhW2ldO1xyXG4gICAgICAgICAgICBpZiAoUC54ID49IGFyZWEueCAmJiBQLnggPD0gYXJlYS54ICsgYXJlYS53aWR0aCAmJiBQLnkgPj0gYXJlYS55ICYmIFAueSA8PSBhcmVhLnkgKyBhcmVhLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgY3VyckFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyQXJlYSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJBcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgQSA9IGN1cnJBcmVhW2ldLkE7XHJcbiAgICAgICAgICAgICAgICBsZXQgQiA9IGN1cnJBcmVhW2ldLkI7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLmxpbmVMaW5lKFAsUDEsQSxCKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIuacquaJvuWIsOeisOaSnuWIhuWMulwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvL+WtkOW8uSznorDmkp7mo4DmtYtcclxuICAgIGJ1bGxldEVuZW15Q29sbGlzaW9uVGVzdChQLGNhbXApe1xyXG4gICAgICAgIGlmIChjYW1wID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IFAuc3ViKGVuZW15LnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSBlbmVteS5zY3JpcHQuZ2V0UmFkaXVzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgcmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZW15O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gUC5zdWIodGhpcy5fcGxheWVyLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSB0aGlzLl9wbGF5ZXIuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wbGF5ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625ZKM5oqA6IO9aWNvbiznorDmkp7mo4DmtYtcclxuICAgIHBsYXllclNraWxsSWNvbkNvbGxpc2lvblRlc3QoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NraWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGwgPSB0aGlzLl9za2lsbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHNraWxsKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclJlY3QgPSB0aGlzLl9wbGF5ZXIuc2NyaXB0LmdldFBsYXllckJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2tpbGxSZWN0ID0gc2tpbGwuc2NyaXB0LmdldFNraWxsQm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3QocGxheWVyUmVjdCxza2lsbFJlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuc2NyaXB0LmVtaXRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxscy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lsbHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGxheWVyRW5lcmd5Q29sbGlzaW9uVGVzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625ZKM6IO96YePLOeisOaSnuajgOa1i1xyXG4gICAgcGxheWVyRW5lcmd5Q29sbGlzaW9uVGVzdCgpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5fZW5lcmd5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lcmd5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZXJneVNjcmlwdCA9IGVuZXJneS5nZXRDb21wb25lbnQoRW5lcmd5SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVuZXJneVNjcmlwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZXJneXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZXJneS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclJlY3QgPSB0aGlzLl9wbGF5ZXIuc2NyaXB0LmdldFBsYXllckJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lcmd5UmVjdCA9IGVuZXJneVNjcmlwdC5nZXRFbmVyZ3lCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChwbGF5ZXJSZWN0LCBlbmVyZ3lSZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllci5zY3JpcHQuYWRkRW5lcmd5KGVuZXJneVNjcmlwdC5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVyZ3lzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVyZ3kuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lcmd5cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlRW5lcmd5KGR0KSB7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5Q2RUaW1lICs9IGR0O1xyXG4gICAgICAgIGxldCBpbnRlcnZhbCA9IHRoaXMuX2dldEVuZXJneUNvbmZpZyhcIkJvcm5JbnRlcnZhbFwiLCA0KTtcclxuICAgICAgICBsZXQgbWF4Q291bnQgPSB0aGlzLl9nZXRFbmVyZ3lDb25maWcoXCJNYXhDb3VudFwiLCA2KTtcclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5Q2RUaW1lIDwgaW50ZXJ2YWwgfHwgdGhpcy5fZW5lcmd5cy5sZW5ndGggPj0gbWF4Q291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZW5lcmd5Q2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmNyZWF0ZUVuZXJneSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6h566XekluZGV4XHJcbiAgICBqdWRnZXpJbmRleCh5KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG1TaXplLmhlaWdodCAtIE1hdGguZmxvb3IoeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmuLjmiI9cclxuICAgIHN0YXJ0R2FtZShmdW5jKXtcclxuICAgICAgICAvL+iOt+WPluWFs+WNoeaVsOaNrlxyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSB0aGlzLl9sZXZlbENvbmZpZy5FbmVteUNvdW50ICogdGhpcy5fbGV2ZWxJZDtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IHRoaXMuX2xldmVsQ29uZmlnLk1heCArIE1hdGguZmxvb3IodGhpcy5fbGV2ZWxJZC81KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OnRoaXMuX21heEVuZW15Q291bnR9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICAgICAgQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnRFeCgnc3RhcnRfZ2FtZScse1wibGV2ZWxcIjp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRLaWxsRWZmZWN0VGVzdEdhbWUoZnVuYyl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbGV2ZWwxX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlVGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fYm9ybkVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RlYXRoRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9ybkNkVGltZSA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDoxfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZUtpbGxFZmZlY3RUZXN0RW5lbXkoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2dhbWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRQbGF5ZXJIaXRUZXN0R2FtZShmdW5jKXtcclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZyA9IHl5cC5jb25maWcuTGV2ZWxbMF07XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fa2lsbEVmZmVjdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDE7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtbGV2ZWxpZFwiLHtsZXZlbGlkOnRoaXMuX2xldmVsSWR9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImN1cnJlbnQtZW5lbXljb3VudFwiLHtlbmVteWNvdW50OjF9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB3aWxsID0gdGhpcy5fY29ycmVjdE1hcFBvc2l0aW9uKGNjLnYyKC10aGlzLl9wbGF5ZXJCb3JuUG9zLngsLXRoaXMuX3BsYXllckJvcm5Qb3MueSkpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLHdpbGwpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVySGl0VGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmMpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJIaXRUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVUZXN0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fbWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jvcm5DZFRpbWUgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1sZXZlbGlkXCIse2xldmVsaWQ6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY3VycmVudC1lbmVteWNvdW50XCIse2VuZW15Y291bnQ6MH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9yb2FtRmxnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdpbGwgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllckJvcm5Qb3MueCwtdGhpcy5fcGxheWVyQm9yblBvcy55KSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjIsd2lsbCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZ2FtaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Rlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGUgfHwgdGhpcy5fcGxheWVySGl0VGVzdE1vZGUgfHwgdGhpcy5fdXBncmFkZVRlc3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzS2lsbEVmZmVjdFRlc3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9raWxsRWZmZWN0VGVzdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlS2lsbEVmZmVjdFRlc3RFbmVteURlYXRoKGVuZW15Tm9kZSkge1xyXG4gICAgICAgIGlmICghZW5lbXlOb2RlIHx8ICFjYy5pc1ZhbGlkKGVuZW15Tm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRlYXRoUG9zID0gY2MudjIoZW5lbXlOb2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZUVuZW15KGVuZW15Tm9kZSk7XHJcbiAgICAgICAgaWYgKGVuZW15Tm9kZS5zY3JpcHQpIHtcclxuICAgICAgICAgICAgZW5lbXlOb2RlLnNjcmlwdC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZW15Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dLaWxsU2t1bGwoZGVhdGhQb3MpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckJ1YmJsZShcIuWwsei/me+8n1wiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjE1KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3Nob3dLaWxsRXhwbG9zaW9uKGRlYXRoUG9zKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2Ryb3BUZXN0RW5lcmd5KGRlYXRoUG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKGVuZW15Tm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93S2lsbFNrdWxsKHBvcykge1xyXG4gICAgICAgIGxldCBza3VsbCA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxTa3VsbFwiKTtcclxuICAgICAgICBza3VsbC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgc2t1bGwuc2V0UG9zaXRpb24oY2MudjMocG9zLngsIHBvcy55ICsgODUsIDApKTtcclxuICAgICAgICBza3VsbC56SW5kZXggPSA2MDAwO1xyXG4gICAgICAgIHNrdWxsLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHNrdWxsLnNjYWxlID0gMTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBza3VsbC5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi8J+SgFwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gNDg7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDUyO1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHNrdWxsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xLCAwLCAzNCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xLCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDAuNSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMyksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dLaWxsRXhwbG9zaW9uKHBvcykge1xyXG4gICAgICAgIGxldCBib29tID0gY2MuaW5zdGFudGlhdGUodGhpcy5fcGxheWVyLnNjcmlwdC5ib29tUHJlZmFiKTtcclxuICAgICAgICBib29tLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBib29tLnBvc2l0aW9uID0gY2MudjMocG9zKTtcclxuICAgICAgICBib29tLnpJbmRleCA9IDYwMDA7XHJcbiAgICAgICAgbGV0IGFuaSA9IGJvb20uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgaWYgKGFuaSkge1xyXG4gICAgICAgICAgICBhbmkucGxheShcImJvb20yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib29tLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC44KSwgY2MucmVtb3ZlU2VsZigpKSk7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJib29tXCIpO1xyXG4gICAgICAgIHRoaXMucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBfZHJvcFRlc3RFbmVyZ3kocG9zKSB7XHJcbiAgICAgICAgbGV0IGZyb21Qb3MgPSBjYy52Mihwb3MpO1xyXG4gICAgICAgIGxldCB0b1BvcyA9IHRoaXMuY2xhbXBNYXBJbm5lclBvc2l0aW9uKGZyb21Qb3MuYWRkKGNjLnYyKDcwLCAzNSkpLCA0MCk7XHJcbiAgICAgICAgbGV0IGVuZXJneSA9IHRoaXMuY3JlYXRlRW5lcmd5QXQoZnJvbVBvcyk7XHJcbiAgICAgICAgZW5lcmd5LnNjYWxlID0gMC4yO1xyXG4gICAgICAgIGVuZXJneS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yOCwgMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygwLjM1LCB0b1BvcywgNDIsIDEpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQbGF5ZXJCdWJibGUodGV4dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1YmJsZSA9IG5ldyBjYy5Ob2RlKFwiX2tpbGxCdWJibGVcIik7XHJcbiAgICAgICAgYnViYmxlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICBidWJibGUuc2V0UG9zaXRpb24oY2MudjModGhpcy5fcGxheWVyLngsIHRoaXMuX3BsYXllci55ICsgMTA1LCAwKSk7XHJcbiAgICAgICAgYnViYmxlLnpJbmRleCA9IDYwMDA7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IGJ1YmJsZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC01OCwgLTI0LCAxMTYsIDQ4LCAxMik7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG4gICAgICAgIGJnLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNDAsIDQwLCA0MCwgMjQwKTtcclxuICAgICAgICBiZy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtNTgsIC0yNCwgMTE2LCA0OCwgMTIpO1xyXG4gICAgICAgIGJnLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJCdWJibGVcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ1YmJsZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTE2LCA0OCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyMCwgMjAsIDIwKTtcclxuXHJcbiAgICAgICAgYnViYmxlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oY2MubW92ZUJ5KDAuMTUsIDAsIDEyKSwgY2MuZmFkZUluKDAuMTUpKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjUpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2hha2VNYXAoKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAxKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDMpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgMCwgLTMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyg5MTAyKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIC00LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDIsIDEpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMCwgLTEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTEwMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlMaWdodFNjcmVlblNoYWtlKCkge1xyXG4gICAgICAgIGxldCBvcmlnaW4gPSBjYy52Myh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTEwMyk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMiwgMiwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAtNCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAyLCAyLCAxKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDIsIDAsIC0xKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDkxMDMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rue7k+adn1xyXG4gICAgc2V0RmluaXNoKCl7XHJcbiAgICAgICAgdGhpcy5fZ2FtaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYW5NYXAoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9nYW1pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2tpbGxFZmZlY3RUZXN0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckhpdFRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZVRlc3RNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciAmJiBjYy5pc1ZhbGlkKHRoaXMuX3BsYXllcikpe1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGVuZW15LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5lbXlzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2tpbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbCA9IHRoaXMuX3NraWxsc1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoc2tpbGwpKSB7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2tpbGxzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lcmd5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lcmd5ID0gdGhpcy5fZW5lcmd5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoZW5lcmd5KSkge1xyXG4gICAgICAgICAgICAgICAgZW5lcmd5LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbmVyZ3lzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lDZFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyUnVudGltZU1hcE5vZGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFyUnVudGltZU1hcE5vZGVzKCl7XHJcbiAgICAgICAgbGV0IHJ1bnRpbWVOYW1lcyA9IHtcclxuICAgICAgICAgICAgXCJQbGF5ZXJcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJFbmVteVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkJ1bGxldFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkJvb21cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJTa2lsbEljb25cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJFbmVyZ3lJdGVtXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX2tpbGxTa3VsbFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIl9raWxsQnViYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiX3VwZ3JhZGVGbG9hdFwiOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGUuY2hpbGRyZW4uc2xpY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChjaGlsZCkgJiYgcnVudGltZU5hbWVzW2NoaWxkLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzTWFwKCl7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lpI3mtLtcclxuICAgIHJldml2ZSgpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnBvc2l0aW9uID0gdGhpcy5fcGxheWVyTGFzdFBvcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKXtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdW1lKCl7XHJcbiAgICAgICAgdGhpcy5fcGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=