
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
        _this._pause = false; //是否处于暂停状态
        _this._gaming = false; //是否处于游戏中 
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
    //生成一个敌人
    GameMap.prototype.deleteEnemy = function (delEnemy) {
        for (var i = 0; i < this._enemys.length; i++) {
            var enemy = this._enemys[i];
            if (enemy == delEnemy) {
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
            if (this._bornCdTime > 1 &&
                this._enemys.length < this._timeMaxEnemyCount &&
                this._bornEnemyCount < this._maxEnemyCount) {
                this._bornCdTime = 0;
                this.createEnemy();
                this._bornEnemyCount += 1;
            }
            //地图滚动
            this.rollMap();
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
    GameMap.prototype._correctMapPosition = function (ret) {
        var x = (this._tmSize.width - yyp.gameFrameSize.width) / 2;
        var y = (this._tmSize.height - yyp.gameFrameSize.height) / 2;
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
    //设置结束
    GameMap.prototype.setFinish = function () {
        this._gaming = false;
    };
    GameMap.prototype.cleanMap = function () {
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
        this._bornEnemyCount = 0;
        this._deathEnemyCount = 0;
        this._maxEnemyCount = 0;
        this._timeMaxEnemyCount = 0;
        this._roamFlg = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUNuRCw4QkFBOEI7QUFDOUIsNENBQTRDO0FBQzVDLDRCQUE0QjtBQUM1QiwwQ0FBMEM7QUFDMUMsNENBQXlDO0FBQ25DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDLGVBQWU7QUFDZix3QkFBd0I7QUFFeEI7SUFBNkIsMkJBQWE7SUFBMUM7UUFBQSxxRUEweUJDO1FBdnlCRyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixzQkFBZ0IsR0FBYyxJQUFJLENBQUM7UUFHbkMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBR25DLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUduQyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUd2QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUV0QyxNQUFNO1FBQ04sZUFBUyxHQUFLLElBQUksQ0FBQyxDQUFLLFdBQVc7UUFDbkMsY0FBUSxHQUFNLElBQUksQ0FBQyxDQUFLLEtBQUs7UUFDN0IsWUFBTSxHQUFRLElBQUksQ0FBQyxDQUFLLFVBQVU7UUFDbEMsYUFBTyxHQUFPLElBQUksQ0FBQyxDQUFLLFVBQVU7UUFDbEMsYUFBTyxHQUFPLElBQUksQ0FBQyxDQUFLLE1BQU07UUFDOUIsZUFBUyxHQUFLLElBQUksQ0FBQyxDQUFLLE1BQU07UUFFOUIsZ0JBQVUsR0FBSSxFQUFFLENBQUMsQ0FBTyxRQUFRO1FBQ2hDLGdCQUFVLEdBQUksRUFBRSxDQUFDLENBQU8sUUFBUTtRQUNoQyxn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QUMsTUFBTSxDQUFDO2lEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNtQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNrQjtJQTNCN0IsT0FBTztRQURuQixPQUFPO09BQ0ssT0FBTyxDQTB5Qm5CO0lBQUQsY0FBQztDQTF5QkQsQUEweUJDLENBMXlCNEIsNkJBQWEsR0EweUJ6QztBQTF5QlksMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcbi8v55S15a2Q6YKu5Lu2cHVoYWxza2lqc2VtZW5AZ21haWwuY29tXHJcbi8v5rqQ56CB572R56uZIOW8gHZwbuWFqOWxgOaooeW8j+aJk+W8gCBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL1xyXG4vL+eUteaKpWh0dHBzOi8vdC5tZS9nYW1lY29kZTk5OVxyXG4vL+e9kemhteWuouacjSBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL2tlZnUuaHRtbFxyXG5pbXBvcnQge0FuYWx5dGljc30gZnJvbSBcIi4vYWQvQW5hbHl0aWNzXCI7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLy/np4HmnInlh73mlbAs6K+35L2/55SoJ18n5byA5aS0XHJcbi8v6K+35L+u5pS5J05ld0NsYXNzJyA9PiDoh6rlt7HnmoTnsbvlkI1cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEdhbWVNYXAgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgdHJlZTAxUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgdHJlZTAyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBtb3VudGFpbjAxUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbW91bnRhaW4wMlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG1vdW50YWluMDNQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBidWxsZXRQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgZW5lbXlQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIHBsYXllclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgc2tpbGxQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/lhoXpg6jlj5jph49cclxuICAgIF90aWxlZE1hcCAgID0gbnVsbDsgICAgIC8vVGlsZWQgTWFwXHJcbiAgICBfdG1Hcm91cCAgICA9IG51bGw7ICAgICAvL+aZrumAmuWxglxyXG4gICAgX3RtT2JqICAgICAgPSBudWxsOyAgICAgLy/lr7nosaHlsYIo6Zqc56KN54mpKVxyXG4gICAgX3RtQm9ybiAgICAgPSBudWxsOyAgICAgLy/lr7nosaHlsYIo5Ye655Sf54K5KVxyXG4gICAgX3RtU2l6ZSAgICAgPSBudWxsOyAgICAgLy/lnLDlm77lsLrlr7hcclxuICAgIF90aWxlU2l6ZSAgID0gbnVsbDsgICAgIC8v55Om54mH5bC65a+4XHJcblxyXG4gICAgX2NvbGxpZGVycyAgPSBbXTsgICAgICAgLy/norDmkp7mo4DmtYvliJfooahcclxuICAgIF9jaGVja0xpc3QgID0ge307ICAgICAgIC8vQSrmo4DmtYvliJfooahcclxuICAgIF9sb2dpY0FyZWEgID0gW107ICAgICAgIC8v6YC76L6R56Kw5pKe5YiG5Yy6XHJcblxyXG4gICAgX3BsYXllciAgICAgICAgICAgICA9IG51bGw7ICAgICAvL+eOqeWutlxyXG4gICAgX2VuZW15cyAgICAgICAgICAgICA9IFtdOyAgICAgICAvL+aVjOS6uuWIl+ihqFxyXG4gICAgX3BsYXllckJvcm5Qb3MgICAgICA9IG51bGw7ICAgICAvL3BsYXllcuWHuueUn+eCuVxyXG4gICAgX2VuZW15Qm9yblBvcyAgICAgICA9IFtdOyAgICAgICAvL+aVjOS6uuWHuueUn+eCueWIl+ihqFxyXG4gICAgX2Jvcm5DZFRpbWUgICAgICAgICA9IDA7ICAgICAgICAvL+aVjOS6uueUn+aIkOmXtOmalOaXtumXtFxyXG4gICAgX2Jvcm5FbmVteUNvdW50ICAgICA9IDA7ICAgICAgICAvL+W3sue7j+WHuueUn+eahOaVjOS6uuaVsOmHj1xyXG4gICAgX2RlYXRoRW5lbXlDb3VudCAgICA9IDA7ICAgICAgICAvL+W3sue7j+atu+S6oeeahOaVjOS6uuaVsOmHj1xyXG4gICAgX21heEVuZW15Q291bnQgICAgICA9IDA7ICAgICAgICAvL+acgOWkp+aVjOS6uuaVsOmHj1xyXG4gICAgX3RpbWVNYXhFbmVteUNvdW50ICA9IDA7ICAgICAgICAvL+WQjOWxj+acgOWkp+aVjOS6uuaVsOmHj1xyXG4gICAgX3NraWxscyAgICAgICAgICAgICA9IFtdOyAgICAgICAvL+maj+acuueUn+aIkOeahOaKgOiDvVxyXG5cclxuICAgIF9wYXVzZSAgICAgICAgICA9IGZhbHNlOyAgICAvL+aYr+WQpuWkhOS6juaaguWBnOeKtuaAgVxyXG4gICAgX2dhbWluZyAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5aSE5LqO5ri45oiP5LitIFxyXG4gICAgX2xldmVsSWQgICAgICAgID0gMTsgICAgICAgIC8v5b2T5YmN5YWz5Y2haWRcclxuICAgIF9sZXZlbENvbmZpZyAgICA9IG51bGw7ICAgICAvL+W9k+WJjeWFs+WNoemFjee9rlxyXG5cclxuICAgIF9yb2FtRmxnICAgICAgICA9IGZhbHNlOyAgICAgICAgICAvL+a8q+a4uOagh+iusFxyXG4gICAgX3JvYW1EaXIgICAgICAgID0gY2MudjIoMSwwKTsgICAgIC8v5ryr5ri45pa55ZCRXHJcblxyXG4gICAgX3BsYXllckxhc3RQb3MgID0gMDtcclxuXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL+W8gOWQr+eisOaSnuebkeWQrFxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gLy/lvIDlkK/nu5jliLbnorDmkp7nu4Tku7bnmoTlvaLnirZcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyAgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAvLyDmmL7npLrnorDmkp7nu4Tku7bnmoTljIXlm7Tnm5JcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyWdGlsZWQgbWFwIOeahOWvueixoSjpmpznoo3niakpXHJcbiAgICAgICAgdGhpcy5faW5pdFRtT2JzdGFjbGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo5Ye655Sf54K5KVxyXG4gICAgICAgIHRoaXMuX2luaXRUbUJvcm4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX3RpbGVkTWFwID0gdGhpcy5ub2RlW1wiJFRpbGVkTWFwXCJdO1xyXG4gICAgICAgIHRoaXMuX3RtR3JvdXAgPSB0aGlzLl9maXJlLl90bUxheWVyR3JvdXAuJFRpbGVkTGF5ZXI7XHJcbiAgICAgICAgLy8gdGhpcy5fZmlyZS5fdG1MYXllckdyb3VwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RtT2JqID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlLiRUaWxlZE9iamVjdEdyb3VwO1xyXG4gICAgICAgIHRoaXMuX3RtQm9ybiA9IHRoaXMuX2ZpcmUuX3RtTGF5ZXJCb3JuLiRUaWxlZE9iamVjdEdyb3VwO1xyXG4gICAgICAgIHRoaXMuX3RtU2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuX3RtU2l6ZSA9IG5ldyBjYy5TaXplKHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS53aWR0aCAqIHRoaXMuX3RpbGVkTWFwLmdldFRpbGVTaXplKCkud2lkdGgsIHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQgKiB0aGlzLl90aWxlZE1hcC5nZXRUaWxlU2l6ZSgpLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fdGlsZVNpemUgPSB0aGlzLl90aWxlZE1hcC5nZXRUaWxlU2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWdGlsZWQgbWFwIOeahOWvueixoSjpmpznoo3niakpXHJcbiAgICBfaW5pdFRtT2JzdGFjbGUoKXtcclxuICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgbGV0IG9iamVjdHMgPSB0aGlzLl90bU9iai5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/ojrflj5bkvY3nva5cclxuICAgICAgICAgICAgbGV0IHRpbGVkUG9zID0gY2MudjIob2JqLm9mZnNldC54ICsgb2JqLndpZHRoLzIsIG9iai5vZmZzZXQueSArIG9iai5oZWlnaHQvMik7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLl90aWxlUG9zVG9HYW1lUG9zKHRpbGVkUG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoubmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDFQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJ0cmVlMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy50cmVlMDJQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLm5hbWUgPT0gXCJtb3VudGFpbjAxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnN0YWNsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW91bnRhaW4wMVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoubmFtZSA9PSBcIm1vdW50YWluMDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic3RhY2xlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb3VudGFpbjAyUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai5uYW1lID09IFwibW91bnRhaW4wM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzdGFjbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vdW50YWluMDNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS5wb3NpdGlvbiA9IGNjLnYzKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZS56SW5kZXggPSB0aGlzLmp1ZGdlekluZGV4KG9mZnNldC55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoucG9seWxpbmVQb2ludHMubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBvYmoucG9seWxpbmVQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gb2JqLnBvbHlsaW5lUG9pbnRzW2orMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5Yib5bu6Y29sbGlkZXIgbGluZVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIudGFnID0gb2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMF0gPSBjYy52MihzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbMV0gPSBjYy52MihlbmQpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzLnNwbGljZSgyLDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sbGlkZXJzLnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrKysrKysrKysrKytfaW5pdFRtT2JzdGFjbGUgdGltZTEgXCIsY29zdCk7XHJcbiAgICAgICAgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGxldCBsb2dpY1dpZHRoID0gdGhpcy5fdG1TaXplLndpZHRoLzQ7XHJcbiAgICAgICAgbGV0IGxvZ2ljSGVpZ2h0ID0gdGhpcy5fdG1TaXplLmhlaWdodC80O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgNDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNjsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhOmFueSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgYXJlYS54ID0geCpsb2dpY1dpZHRoLXRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgYXJlYS55ID0geSpsb2dpY0hlaWdodC10aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgICAgICBhcmVhLndpZHRoID0gbG9naWNXaWR0aDtcclxuICAgICAgICAgICAgICAgIGFyZWEuaGVpZ2h0ID0gbG9naWNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBuZXcgY2MuUmVjdChhcmVhLngtMTAsYXJlYS55LTEwLGxvZ2ljV2lkdGgrMjAsbG9naWNIZWlnaHQrMjApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVJblJlY3QoQSxCLHJlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEucHVzaCh7QTpBLEI6Qn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2ljQXJlYS5wdXNoKGFyZWEpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIGNvc3QgPSBfZW5kVGltZSAtIF9zdGFydFRpbWU7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiKysrKysrKysrKysrX2luaXRUbU9ic3RhY2xlIHRpbWUyIFwiLGNvc3QpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlnRpbGVkIG1hcCDnmoTlr7nosaEo5Ye655Sf54K5KVxyXG4gICAgX2luaXRUbUJvcm4oKXtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuX3RtQm9ybi5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBvYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhvYmoub2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKG9iai5uYW1lID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckJvcm5Qb3MgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gY2MudjModGhpcy50aWxlVG9HYW1lUG9zKHRpbGUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlCb3JuUG9zLnB1c2gocG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RtR3JvdXAuc2V0VGlsZUdJREF0KDUsIHRpbGUpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMaXN0ID0gdGhpcy5pbml0Q2hlY2tMaXN0KCk7XHJcbiAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAvLyBjYy5sb2coXCIrY29zdCB0aW1lIFwiLGNvc3QpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eUn+aIkHBsYXllclxyXG4gICAgY3JlYXRlUGxheWVyKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJUeXBlID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2N1cnJlbnRfcGxheWVyX3R5cGVfXCIsMSk7XHJcbiAgICAgICAgbGV0IHBsYXllckxldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfcGxheWVyXyR7cGxheWVyVHlwZX1fYCwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiKTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIucGFyZW50ID0gdGhpcy5fZmlyZS5fdG1MYXllck9ic3RhY2xlO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5wb3NpdGlvbiA9IHRoaXMuX3BsYXllckJvcm5Qb3M7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRNYXAodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnNjcmlwdC5zZXRQbGF5ZXJUeXBlKHBsYXllclR5cGUscGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllci5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGNyZWF0ZUVuZW15KCkge1xyXG4gICAgICAgIC8v6ZqP5py657K+6Iux5oCqXHJcbiAgICAgICAgbGV0IGVtZW15VHlwZSA9IDExO1xyXG4gICAgICAgIGxldCByYW5kb20gPSBNYXRoLnJhbmRvbSgpKjEwMDtcclxuICAgICAgICBpZiAocmFuZG9tIDwgNCkgeyBlbWVteVR5cGUgPSAxMjsgfVxyXG4gICAgICAgIGlmIChyYW5kb20gPCAxKSAgeyBlbWVteVR5cGUgPSAxMzsgfVxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuICAgICAgICBlbmVteS5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgZW5lbXkucG9zaXRpb24gPSB0aGlzLl9lbmVteUJvcm5Qb3NbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuX2VuZW15Qm9yblBvcy5sZW5ndGgpXTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICBlbmVteS5zY3JpcHQuc2V0RW5lbXlUeXBlKGVtZW15VHlwZSx0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICB0aGlzLl9lbmVteXMucHVzaChlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmlYzkurpcclxuICAgIGRlbGV0ZUVuZW15KGRlbEVuZW15KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZW5lbXkgPT0gZGVsRW5lbXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2tpbGxJY29uKGRlbEVuZW15LnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWF0aEVuZW15Q291bnQgKz0xO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50IC0gdGhpcy5fZGVhdGhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlYzkurrmlbDph49cclxuICAgIGVuZW15Q291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZW15cy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJDkuIDkuKrmioDog71pY29uXHJcbiAgICBjcmVhdGVTa2lsbEljb24ocG9zKSB7XHJcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjA2KSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBza2lsbC5wYXJlbnQgPSB0aGlzLl9maXJlLl90bUxheWVyT2JzdGFjbGU7XHJcbiAgICAgICAgICAgIHNraWxsLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICBza2lsbC5zY3JpcHQuc2V0SW5HYW1lKCk7XHJcbiAgICAgICAgICAgIHNraWxsLnpJbmRleCA9IHRoaXMuanVkZ2V6SW5kZXgoc2tpbGwueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmnIDov5HnmoTmlYzkurpcclxuICAgIGdldE5lYXJFbmVteSgpIHtcclxuICAgICAgICBsZXQgcmV0ID0gbnVsbDtcclxuICAgICAgICBsZXQgcmV0TGVuID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3MgPSBjYy52MihlbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLl9wbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gZW5lbXlQb3Muc3ViKHBsYXllclBvcykubWFnKClcclxuICAgICAgICAgICAgaWYgKHJldCA9PSBudWxsIHx8IGxlbiA8IHJldExlbikge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gZW5lbXk7XHJcbiAgICAgICAgICAgICAgICByZXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Zyo5ZCM5LiA5LiqdGlsZSzov5jmnInlhbbku5bmlYzkurpcclxuICAgIGlzSGF2ZU90aGVyRW5lbXkoZW5lbXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb3RoZXJFbmVteSA9IHRoaXMuX2VuZW15c1tpXTtcclxuICAgICAgICAgICAgaWYgKG90aGVyRW5lbXkgIT0gZW5lbXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKGVuZW15LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBvdGhlclRpbGUgPSB0aGlzLmdhbWVQb3NUb1RpbGUob3RoZXJFbmVteS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS54ID09IG90aGVyVGlsZS54ICYmIHRpbGUueSA9PSBvdGhlclRpbGUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oyJ5LiLXHJcbiAgICBfb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGEgPTE7XHJcbiAgICAgICAgLy8gbGV0IHBvaW50ID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIC8vIGxldCB0aWxlID0gdGhpcy5nYW1lUG9zVG9UaWxlKHBvaW50KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc2V0TWFwKCkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkud2lkdGg7IHJvdysrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG1Hcm91cC5zZXRUaWxlR0lEQXQoMSwgY2MudjIocm93LGNvbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdGlsZWQgbWFw5Z2Q5qCH6L2s5o2i5Li65ri45oiP5Z2Q5qCHXHJcbiAgICBfdGlsZVBvc1RvR2FtZVBvcyh0aWxlZFBvcykge1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52Mih0aWxlZFBvcy54LCB0aGlzLl90bVNpemUuaGVpZ2h0IC0gdGlsZWRQb3MueSk7XHJcbiAgICAgICAgcG9zLnggPSBwb3MueCAtIHRoaXMuX3RtU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgIHBvcy55ID0gcG9zLnkgLSB0aGlzLl90bVNpemUuaGVpZ2h0LzI7XHJcblxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy90aWxl5Z2Q5qCH6L2s5o2i5Li65ri45oiP5Z2Q5qCHXHJcbiAgICB0aWxlVG9HYW1lUG9zKHRpbGUpIHtcclxuICAgICAgICBsZXQgeCA9IHRpbGUueCAqIHRoaXMuX3RpbGVTaXplLndpZHRoICsgdGhpcy5fdGlsZVNpemUud2lkdGgvMjtcclxuICAgICAgICBsZXQgeSA9IHRpbGUueSAqIHRoaXMuX3RpbGVTaXplLmhlaWdodCArIHRoaXMuX3RpbGVTaXplLmhlaWdodC8yO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZVBvc1RvR2FtZVBvcyhjYy52Mih4LHkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WdkOagh+i9rOaNouS4unRpbGVkIG1hcOWdkOagh1xyXG4gICAgX2dhbWVQb3NUb1RpbGVQb3MoZ2FtZVBvcykge1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52MihnYW1lUG9zKTtcclxuICAgICAgICBwb3MueCA9IHBvcy54ICsgdGhpcy5fdG1TaXplLndpZHRoLzI7XHJcbiAgICAgICAgcG9zLnkgPSBwb3MueSArIHRoaXMuX3RtU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICBwb3MueSA9IHRoaXMuX3RtU2l6ZS5oZWlnaHQgLSBwb3MueTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WdkOagh+i9rOaNouS4unRpbGXlnZDmoIdcclxuICAgIGdhbWVQb3NUb1RpbGUoZ2FtZVBvcykge1xyXG4gICAgICAgIGxldCB0aWxlUG9zID0gdGhpcy5fZ2FtZVBvc1RvVGlsZVBvcyhnYW1lUG9zKTtcclxuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IodGlsZVBvcy54IC8gdGhpcy5fdGlsZVNpemUud2lkdGgpO1xyXG4gICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcih0aWxlUG9zLnkgLyB0aGlzLl90aWxlU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4LCB5KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/liJ3lp4vljJZBKuajgOa1i+WIl+ihqFxyXG4gICAgaW5pdENoZWNrTGlzdCAoKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52Mih4LCB5KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0Q29sbGlkZXJzKHBvcyw1MCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA6IGFueT0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS54ID0geDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnkgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uRyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5IID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmZhdGhlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXNzYWJsZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldFt4K1wiX1wiK3ldID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl90bUdyb3VwLnNldFRpbGVHSURBdCgzLCBjYy52Mih4LHkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLl90aWxlZE1hcC5nZXRNYXBTaXplKCkud2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuX3RpbGVkTWFwLmdldE1hcFNpemUoKS5oZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSByZXRbeCtcIl9cIit5XTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLnRpbGVUb0dhbWVQb3MoY2MudjIoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXd4ID0geC0xOyBuZXd4IDw9IHgrMTsgbmV3eCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3eSA9IHktMTsgbmV3eSA8PSB5KzE7IG5ld3krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHJldFtuZXd4K1wiX1wiK25ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Bhc3NhYmxlSXRlbSA9IGl0ZW0ucGFzc2FibGVbbmV3eCtcIl9cIituZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoeCAhPSBuZXd4IHx8IHkgIT0gbmV3eSkgJiYgbmV3SXRlbSAmJiBuZXdQYXNzYWJsZUl0ZW0gPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3BvcyA9IHRoaXMudGlsZVRvR2FtZVBvcyhjYy52MihuZXd4LCBuZXd5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2lyY2xlQ2lyY2xlUGFzc0NvbGxpZGVycyhwb3MsbmV3cG9zLDUwKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnBhc3NhYmxlW25ld3grXCJfXCIrbmV3eV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLnBhc3NhYmxlW3grXCJfXCIreV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlkEq5qOA5rWL5YiX6KGoXHJcbiAgICBnZXRDaGVja0xpc3QgKCkge1xyXG4gICAgICAgIHZhciBvYmpTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9jaGVja0xpc3QpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKG9ialN0cmluZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+WcG9z5omA5ZyodGlsZSzmnIDov5HnmoTlj6/pgJrooYx0aWxlXHJcbiAgICBnZXRQYXNzYWJsZVRpbGUgKHRpbGUscmVmZXJUaWxlKSB7XHJcbiAgICAgICAgLy/liKTmlq3oh6rlt7FcclxuICAgICAgICAvLyBpZiAodGhpcy5fY2hlY2tMaXN0W3RpbGUueCArIFwiX1wiICsgdGlsZS55XSkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdGlsZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat5LiA546vXHJcbiAgICAgICAgbGV0IHJldFRpbGUgPSBudWxsO1xyXG4gICAgICAgIGxldCByZXRMZW4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4Kyspe1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gLTE7IHkgPD0gMTsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGlmICh4ICE9IDAgfHwgeSE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eCA9IHRpbGUueCArIHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSB0aWxlLnkgKyB5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd0aWxlID0gdGhpcy5fY2hlY2tMaXN0W25ld3ggKyBcIl9cIiArIG5ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXd0aWxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlbiA9IChyZWZlclRpbGUueC1uZXd4KSoocmVmZXJUaWxlLngtbmV3eCkgKyAocmVmZXJUaWxlLnktbmV3eSkqKHJlZmVyVGlsZS55LW5ld3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VGlsZSA9PSBudWxsIHx8IGxlbiA8IHJldExlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0VGlsZSA9IG5ld3RpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRMZW4gPSBsZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldFRpbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldFRpbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreS6jOeOr1xyXG4gICAgICAgIHJldFRpbGUgPSBudWxsO1xyXG4gICAgICAgIHJldExlbiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IC0yOyB4IDw9IDI7IHgrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMjsgeSA8PSAyOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKHggPT0gLTIgfHwgeCA9PSAyIHx8IHkgPT0gLTIgfHwgeSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSAocmVmZXJUaWxlLngtbmV3eCkqKHJlZmVyVGlsZS54LW5ld3gpICsgKHJlZmVyVGlsZS55LW5ld3kpKihyZWZlclRpbGUueS1uZXd5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFRpbGUgPT0gbnVsbCB8fCBsZW4gPCByZXRMZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGUgPSBuZXd0aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0TGVuID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXRUaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRUaWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5Zwb3PmiYDlnKh0aWxlLOacgOi/keeahOWPr+mAmuihjHRpbGVcclxuICAgIGdldFBhc3NhYmxlVGlsZUV4ICh0aWxlKSB7XHJcbiAgICAgICAgLy/liKTmlq3kuIDnjq9cclxuICAgICAgICBsZXQgcmV0VGlsZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gLTI7IHggPD0gMjsgeCsrKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0yOyB5IDw9IDI7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSB0aWxlLnggKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gdGlsZS55ICsgeTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3dGlsZSA9IHRoaXMuX2NoZWNrTGlzdFtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3dGlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFRpbGVzLnB1c2gobmV3dGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmV0VGlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcmV0VGlsZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldFRpbGVzW2luZGV4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOe6v+autVBQMSzmmK/lkKbkvJrnu4/ov4djb2xsaWRlcnPkuK3nmoTkuIDmnaHnur/mrrVcclxuICAgIGxpbmVMaW5lUGFzc0NvbGxpZGVycyhQLFAxKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlcnNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5saW5lUGFzc0xpbmUoUCxQMSxBLEIpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g54K5UCxQMeS4uuWchuW/gyxyYWRpdXPkuLrljYrlvoTnmoTlnIYs5piv5ZCm5Lya57uP6L+HY29sbGlkZXJz5Lit55qE5LiA5p2h57q/5q61XHJcbiAgICBjaXJjbGVDaXJjbGVQYXNzQ29sbGlkZXJzKFAsUDEscmFkaXVzKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbGxpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlcnNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5jaXJjbGVDaXJjbGVQYXNzTGluZShQLFAxLHJhZGl1cyxBLEIpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/norDmkp7mtYvor5Uo5Lul54K5UOS4uuWchuW/gyzljYrlvoTkuLpyYWRpdXPnmoTlnIYs5piv5ZCm5ZKMY29sbGlkZXJz5Lit55qE57q/5q6155u45LqkKVxyXG4gICAgdGVzdENvbGxpZGVycyhQLCByYWRpdXMpe1xyXG4gICAgICAgIGxldCBjb2xsaWRlckl0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fY29sbGlkZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xsaWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJzW2tleV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBBID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXJJdGVtID0gVXRpbHMuZ2V0UG9pbnRMaW5lU2hvcnRlc3RJbmZvKFAsIEEsIEIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJJdGVtLmxlbiA8PSByYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckl0ZW0uY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckl0ZW1zLnB1c2goY29sbGlkZXJJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVySXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXVzZSkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9nYW1pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9ybkNkVGltZSArPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Jvcm5DZFRpbWUgPiAxICYmIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlzLmxlbmd0aCA8IHRoaXMuX3RpbWVNYXhFbmVteUNvdW50ICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA8IHRoaXMuX21heEVuZW15Q291bnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3JuQ2RUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRW5lbXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jvcm5FbmVteUNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvL+WcsOWbvua7muWKqFxyXG4gICAgICAgICAgICB0aGlzLnJvbGxNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJMYXN0UG9zID0gdGhpcy5fcGxheWVyLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JvYW1GbGcpIHtcclxuICAgICAgICAgICAgICAgIGxldCByb2FtUG9zaXRpb24gPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLmFkZCh0aGlzLl9yb2FtRGlyKTtcclxuICAgICAgICAgICAgICAgIHJvYW1Qb3NpdGlvbiA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihyb2FtUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvYW1Qb3NpdGlvbi54ID09IHRoaXMubm9kZS54ICYmIHJvYW1Qb3NpdGlvbi55ID09IHRoaXMubm9kZS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9hbURpci54ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9hbURpci55ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ID0gcm9hbVBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSByb2FtUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WcsOWbvua7muWKqFxyXG4gICAgcm9sbE1hcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSB0aGlzLl9jb3JyZWN0TWFwUG9zaXRpb24oY2MudjIoLXRoaXMuX3BsYXllci54LC10aGlzLl9wbGF5ZXIueSkpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHJldC54O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHJldC55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX2NvcnJlY3RNYXBQb3NpdGlvbihyZXQpe1xyXG4gICAgICAgIGxldCB4ID0gKHRoaXMuX3RtU2l6ZS53aWR0aC15eXAuZ2FtZUZyYW1lU2l6ZS53aWR0aCkvMjtcclxuICAgICAgICBsZXQgeSA9ICh0aGlzLl90bVNpemUuaGVpZ2h0LXl5cC5nYW1lRnJhbWVTaXplLmhlaWdodCkvMjtcclxuICAgICAgICBsZXQgbWluUG9zID0gY2MudjIoLXgsLXkpO1xyXG4gICAgICAgIGxldCBtYXhQb3MgPSBjYy52Mih4LHkpO1xyXG5cclxuICAgICAgICBpZiAocmV0LnggPCBtaW5Qb3MueCkge1xyXG4gICAgICAgICAgICByZXQueCA9IG1pblBvcy54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnggPiBtYXhQb3MueCkge1xyXG4gICAgICAgICAgICByZXQueCA9IG1heFBvcy54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPCBtaW5Qb3MueSkge1xyXG4gICAgICAgICAgICByZXQueSA9IG1pblBvcy55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0LnkgPiBtYXhQb3MueSkge1xyXG4gICAgICAgICAgICByZXQueSA9IG1heFBvcy55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+e6v+auteS4juefqeW9ouebuOS6pOaIluiAheWMheWQq+WcqOefqeW9oumHjOmdolxyXG4gICAgX2xpbmVJblJlY3QoQSxCLHJlY3Qpe1xyXG4gICAgICAgIGlmICgoQS54ID49IHJlY3QueCAmJiBBLnggPD0gcmVjdC54ICsgcmVjdC53aWR0aCAmJiBBLnkgPj0gcmVjdC55ICYmIEEueSA8PSByZWN0LnkgKyByZWN0LmhlaWdodCkgfHxcclxuICAgICAgICAgICAgKEIueCA+PSByZWN0LnggJiYgQi54IDw9IHJlY3QueCArIHJlY3Qud2lkdGggJiYgQi55ID49IHJlY3QueSAmJiBCLnkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQpIHx8XHJcbiAgICAgICAgICAgIGNjLkludGVyc2VjdGlvbi5saW5lUmVjdChBLEIscmVjdCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Q5by5LOmanOeijeeJqeeisOaSnuajgOa1i1xyXG4gICAgYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KFAsUDEpe1xyXG4gICAgICAgIC8v6I635Y+W56Kw5pKe5Yy6XHJcbiAgICAgICAgbGV0IGN1cnJBcmVhID0gbnVsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xvZ2ljQXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IHRoaXMuX2xvZ2ljQXJlYVtpXTtcclxuICAgICAgICAgICAgaWYgKFAueCA+PSBhcmVhLnggJiYgUC54IDw9IGFyZWEueCArIGFyZWEud2lkdGggJiYgUC55ID49IGFyZWEueSAmJiBQLnkgPD0gYXJlYS55ICsgYXJlYS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJBcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VyckFyZWEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyQXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IEEgPSBjdXJyQXJlYVtpXS5BO1xyXG4gICAgICAgICAgICAgICAgbGV0IEIgPSBjdXJyQXJlYVtpXS5CO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5saW5lTGluZShQLFAxLEEsQikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCLmnKrmib7liLDnorDmkp7liIbljLpcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy/lrZDlvLks56Kw5pKe5qOA5rWLXHJcbiAgICBidWxsZXRFbmVteUNvbGxpc2lvblRlc3QoUCxjYW1wKXtcclxuICAgICAgICBpZiAoY2FtcCA9PSBcInBsYXllclwiKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW5lbXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSBQLnN1YihlbmVteS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gZW5lbXkuc2NyaXB0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmVteTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWVyICYmIGNjLmlzVmFsaWQodGhpcy5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IFAuc3ViKHRoaXMuX3BsYXllci5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRSYWRpdXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPCByYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXHJcbiAgICBwbGF5ZXJTa2lsbEljb25Db2xsaXNpb25UZXN0KCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9za2lsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsID0gdGhpcy5fc2tpbGxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChza2lsbCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZWN0ID0gdGhpcy5fcGxheWVyLnNjcmlwdC5nZXRQbGF5ZXJCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraWxsUmVjdCA9IHNraWxsLnNjcmlwdC5nZXRTa2lsbEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHBsYXllclJlY3Qsc2tpbGxSZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9za2lsbHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGxzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6K6h566XekluZGV4XHJcbiAgICBqdWRnZXpJbmRleCh5KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG1TaXplLmhlaWdodCAtIE1hdGguZmxvb3IoeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmuLjmiI9cclxuICAgIHN0YXJ0R2FtZShmdW5jKXtcclxuICAgICAgICAvL+iOt+WPluWFs+WNoeaVsOaNrlxyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnID0geXlwLmNvbmZpZy5MZXZlbFswXTtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwxKTtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gdGhpcy5fbGV2ZWxDb25maWcuRW5lbXlDb3VudCAqIHRoaXMuX2xldmVsSWQ7XHJcbiAgICAgICAgdGhpcy5fdGltZU1heEVuZW15Q291bnQgPSB0aGlzLl9sZXZlbENvbmZpZy5NYXggKyBNYXRoLmZsb29yKHRoaXMuX2xldmVsSWQvNSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWxldmVsaWRcIix7bGV2ZWxpZDp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjdXJyZW50LWVuZW15Y291bnRcIix7ZW5lbXljb3VudDp0aGlzLl9tYXhFbmVteUNvdW50fSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvYW1GbGcgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgd2lsbCA9IHRoaXMuX2NvcnJlY3RNYXBQb3NpdGlvbihjYy52MigtdGhpcy5fcGxheWVyQm9yblBvcy54LC10aGlzLl9wbGF5ZXJCb3JuUG9zLnkpKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKDAuMix3aWxsKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9nYW1pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ3N0YXJ0X2dhbWUnLHtcImxldmVsXCI6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u57uT5p2fXHJcbiAgICBzZXRGaW5pc2goKXtcclxuICAgICAgICB0aGlzLl9nYW1pbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhbk1hcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgY2MuaXNWYWxpZCh0aGlzLl9wbGF5ZXIpKXtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbmVteXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fZW5lbXlzW2ldO1xyXG4gICAgICAgICAgICBlbmVteS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuZW15cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NraWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGwgPSB0aGlzLl9za2lsbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHNraWxsKSkge1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NraWxscyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9ib3JuRW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVhdGhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9tYXhFbmVteUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTWF4RW5lbXlDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcm9hbUZsZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzTWFwKCl7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lpI3mtLtcclxuICAgIHJldml2ZSgpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyLnBvc2l0aW9uID0gdGhpcy5fcGxheWVyTGFzdFBvcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VuZW15cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLl9lbmVteXNbaV07XHJcbiAgICAgICAgICAgIGVuZW15LnNjcmlwdC5zZXRUYXJnZXQodGhpcy5fcGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKXtcclxuICAgICAgICB0aGlzLl9wYXVzZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdW1lKCl7XHJcbiAgICAgICAgdGhpcy5fcGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=