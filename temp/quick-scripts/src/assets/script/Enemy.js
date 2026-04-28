"use strict";
cc._RF.push(module, 'a390bEFdQhHgKb2+9eEUbUa', 'Enemy');
// script/Enemy.ts

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
exports.Enemy = void 0;
var TankE_1 = require("./TankE");
var Utils_1 = require("./base/Utils");
var BulletE_1 = require("./BulletE");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DAMAGE_FLOAT_FADE_IN_TIME = 0.18;
var DAMAGE_FLOAT_HOLD_TIME = 0.5;
var DAMAGE_FLOAT_FADE_OUT_TIME = 0.2;
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        //敌人类型
        // @property()
        // enemyType: number = 1;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //内部变量
        _this._bulletCodeTime = 1; //射击冷却时间
        _this._target = null; //攻击目标
        // A*
        _this._walkPaths = []; //行走列表
        _this._willPos = null; //
        _this._codeTime = 0.5; //冷却时间
        return _this;
    }
    Enemy.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //初始化UI
        this._initUI();
        //初始化变量
        this._initVariable();
    };
    //初始化变量
    Enemy.prototype._initVariable = function () {
        this._camp = "enemy"; //阵营
    };
    //初始化UI
    Enemy.prototype._initUI = function () {
        if (this._fire._hpLab) {
            this._fire._hpLab.active = false;
        }
    };
    //设置敌人类型
    Enemy.prototype.setEnemyType = function (tankType, levleId) {
        _super.prototype.setTankType.call(this, tankType);
        //计算敌人血量 攻击
        this._hp = this._maxHp = this._config.HP * (levleId + 1);
        this._atk = this._config.ATK * (levleId + 1);
    };
    //设置目标
    Enemy.prototype.setTarget = function (target) {
        this._target = target;
    };
    //设置冷却时间
    Enemy.prototype._resetCodeTime = function () {
        this._codeTime = Math.random() * 0.5 + 0.3;
    };
    ///////////////////// A* /////////////////////
    Enemy.prototype.findPath = function (_startTime) {
        this._walkPaths = [];
        // this._map.resetMap();
        var starTile = this._map.gamePosToTile(this.node.position);
        var endTile = this._map.gamePosToTile(this._target.position);
        endTile = this._map.getPassableTileEx(endTile);
        if (starTile && endTile && (starTile.x != endTile.x || starTile.y != endTile.y)) {
            var checkList = this._map.getCheckList(); //检查列表
            var openList = []; //待判断列表
            var closeList = []; //关闭列表
            var endItem = this.getEndItem(starTile, endTile, checkList, openList, closeList);
            if (endItem) {
                var walkPaths = [];
                while (endItem) {
                    walkPaths.unshift(endItem);
                    endItem = endItem.father;
                }
                this._walkPaths = walkPaths;
            }
            checkList = {};
            openList = closeList = [];
        }
    };
    Enemy.prototype.getEndItem = function (starTile, endTile, checkList, openList, closeList) {
        var starItem = this.getCheckItem(starTile.x, starTile.y, checkList);
        this.addToList(starItem, openList);
        while (openList.length > 0) {
            var checkItem = openList.shift(); //返回第一个值(第一个值肯定最小)
            this.addToList(checkItem, closeList); //加入关闭列表
            // cc.log(checkItem.x, checkItem.y);
            // checkItem所在位置/目标位置小于攻击半径 且 他们之前没有障碍物,说明已经找到了最终的位置
            if (endTile.x == checkItem.x && endTile.y == checkItem.y) {
                return checkItem;
            }
            else {
                //把周围的加进来
                var newItems = [];
                for (var x = -1; x <= 1; x++) {
                    for (var y = -1; y <= 1; y++) {
                        var newx = checkItem.x + x;
                        var newy = checkItem.y + y;
                        if (x != 0 || y != 0) {
                            newItems.push({ x: newx, y: newy });
                        }
                    }
                }
                for (var i = 0; i < 10; i++) {
                    var index = Math.floor(Math.random() * newItems.length);
                    var item = newItems.splice(index, 1);
                    newItems.push(item[0]);
                }
                for (var i = 0; i < newItems.length; i++) {
                    var newx = newItems[i].x;
                    var newy = newItems[i].y;
                    var newItem = this.getCheckItem(newx, newy, checkList);
                    if (newItem) {
                        var passableItem = checkItem.passable[newx + "_" + newy];
                        if (passableItem) {
                            // newItem.G = ((x==0||y==0) ? 10 : 14) + checkItem.G;
                            // newItem.H = Math.sqrt((endTile.x-newItem.x)*(endTile.x-newItem.x)*100 + (endTile.y-newItem.y)*(endTile.y-newItem.y)*100);
                            newItem.father = checkItem;
                            this.addToList(newItem, openList);
                            this.sortOpenList(openList);
                        }
                        else {
                            checkList[newItem.x, newItem.y] = newItem;
                        }
                    }
                }
            }
            if (openList.length == 0) {
                // cc.log("no find path ,return ",checkItem.x,checkItem.y);
                return checkItem;
            }
        }
        return null;
    };
    //在列表中拿出指定item
    Enemy.prototype.getCheckItem = function (x, y, list) {
        var item = list[x + "_" + y];
        delete list[x + "_" + y];
        return item;
    };
    //在列表中拿出指定item
    Enemy.prototype.getItem = function (x, y, list) {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.x == x && item.y == y) {
                list.splice(i, 1);
                return item;
            }
        }
        return null;
    };
    //对Open列表排序,G+H最小的拍在前面
    Enemy.prototype.sortOpenList = function (list) {
        function sortNumber(a, b) {
            return (a.G + a.H) - (b.G + b.H);
        }
        list.sort(sortNumber);
    };
    // 添加item到列表
    Enemy.prototype.addToList = function (item, list) {
        list.push(item);
    };
    ///////////////////// A* /////////////////////
    Enemy.prototype.update = function (dt) {
        if (this._map._pause)
            return;
        this._codeTime -= dt;
        if (this._target && cc.isValid(this._target)) {
            var fromPos = cc.v2(this.node.position);
            var targetPos = cc.v2(this._target.position);
            var len = targetPos.sub(fromPos).mag();
            if (this._walkPaths.length > 0) {
                if (this._willPos == null) {
                    //检测是否遇到目标
                    if (len <= this._config.AttackRadius && this._map.isHaveOtherEnemy(this.node) == false && this._map.lineLinePassColliders(fromPos, targetPos) == false) {
                        //遇到目标,停下,清空还没有走的路径
                        this._resetCodeTime();
                        this.node.stopAllActions();
                        this._walkPaths = [];
                    }
                    else {
                        //没有遇到目标,继续前进
                        var walkItem = this._walkPaths[0];
                        this._willPos = this._map.tileToGamePos(cc.v2(walkItem.x, walkItem.y));
                        if (this._willPos.equals(fromPos)) {
                            this._walkPaths.shift();
                            this._willPos = null;
                        }
                        else {
                            this._dir = this._willPos.sub(fromPos).normalize();
                            var time = this._willPos.sub(fromPos).mag() / this._config.Speed;
                            var self_1 = this;
                            this.node.runAction(cc.sequence(cc.moveTo(time / 60, this._willPos), cc.callFunc(function () {
                                // cc.log("走完了一节 ",walkItem.x,walkItem.y);
                                self_1._walkPaths.shift();
                                self_1._willPos = null;
                            })));
                        }
                    }
                }
            }
            else {
                if (this._codeTime <= 0) {
                    this._resetCodeTime();
                    //检测是否遇到目标
                    if (len <= this._config.AttackRadius && this._map.lineLinePassColliders(fromPos, targetPos) == false) {
                        //遇到目标,什么都不做,停在原地
                        // this._dir = targetPos.sub(fromPos).normalize();
                    }
                    else {
                        //没有遇到目标,重新寻路
                        var _startTime = (new Date()).valueOf();
                        this.findPath(_startTime);
                        // if (this._walkPaths.length == 0) {
                        //     this._dir = targetPos.sub(fromPos).normalize();
                        // }
                        var _endTime = (new Date()).valueOf();
                        var cost = _endTime - _startTime;
                        // cc.log("+coste time ",cost);
                    }
                }
            }
            //计算炮管方向
            if (this._tankType == 12) {
                this._barrelDir = Utils_1.Utils.vectorsRotateDegress(this._barrelDir, 0.2);
            }
            else {
                this._barrelDir = targetPos.sub(fromPos).normalize();
            }
            if (this._dir.x == 0 && this._dir.y == 0) {
                var a = 1;
            }
            this._refreshAngle();
            //射击
            if (len <= this._config.AttackRadius) {
                this.shooting(dt);
            }
        }
        this.node.zIndex = this._map.judgezIndex(this.node.y);
    };
    //射击
    Enemy.prototype.shooting = function (dt) {
        this._bulletCodeTime += dt;
        if (this._bulletCodeTime >= this._config.BulletCodeTime) {
            this._bulletCodeTime = 0;
            //创建子弹
            BulletE_1.Bullet.createBulletEx(this._config.BType1, this.node.position, this._barrelDir, this._fire._lyBarrel.height, this._config.AttackRadius, this._atk, this._camp, this.node.parent, this._map);
        }
    };
    //被攻击到
    Enemy.prototype.beHit = function (damage, damageType) {
        if (damageType === void 0) { damageType = "normal"; }
        var finalDamage = damage - this._def;
        if (finalDamage < 0) {
            finalDamage = 0;
        }
        var showDamage = finalDamage;
        if (showDamage > this._hp) {
            showDamage = this._hp;
        }
        this._hp -= finalDamage;
        if (this._hp < 0) {
            this._hp = 0;
        }
        this.refreshHp();
        if (showDamage > 0) {
            this._showDamageFloat(showDamage, damageType);
        }
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    Enemy.prototype._showDamageFloat = function (damage, damageType) {
        if (!this._fire._hpLab || !this._fire._hpLab.$Label) {
            return;
        }
        var hpLab = cc.instantiate(this._fire._hpLab);
        hpLab.parent = this.node;
        hpLab.active = true;
        hpLab.opacity = 0;
        hpLab.scale = 0.4;
        hpLab.angle = 0;
        hpLab.position = this._fire._hpLab.position.add(cc.v3((Math.random() - 0.5) * 24, 0, 0));
        hpLab.zIndex = 200;
        var label = hpLab.$Label || hpLab.getComponent(cc.Label);
        var damageText = this._formatDamageText(damage);
        var isCrit = damageType == "crit";
        label.string = isCrit ? "暴击-" + damageText : "-" + damageText;
        label.fontSize = isCrit ? 46 : 40;
        label.lineHeight = isCrit ? 46 : 40;
        hpLab.color = isCrit ? cc.color(255, 210, 60) : cc.color(255, 80, 80);
        hpLab.runAction(cc.sequence(cc.spawn(cc.fadeTo(DAMAGE_FLOAT_FADE_IN_TIME, 255), cc.scaleTo(DAMAGE_FLOAT_FADE_IN_TIME, isCrit ? 1.25 : 1), cc.moveBy(DAMAGE_FLOAT_FADE_IN_TIME, cc.v2(0, 18))), cc.delayTime(DAMAGE_FLOAT_HOLD_TIME), cc.spawn(cc.fadeTo(DAMAGE_FLOAT_FADE_OUT_TIME, 0), cc.scaleTo(DAMAGE_FLOAT_FADE_OUT_TIME, 0.65), cc.moveBy(DAMAGE_FLOAT_FADE_OUT_TIME, cc.v2(0, 12))), cc.callFunc(function () {
            hpLab.destroy();
        })));
    };
    Enemy.prototype._formatDamageText = function (damage) {
        var value = Math.round(damage * 10) / 10;
        if (Math.abs(value - Math.round(value)) < 0.001) {
            return "" + Math.round(value);
        }
        return value.toFixed(1);
    };
    //执行死亡
    Enemy.prototype.doDeath = function () {
        _super.prototype.doDeath.call(this);
        yyp.eventCenter.emit('add-coin', { count: this._config.Coin, position: Utils_1.Utils.getWorldPosition(this.node) });
        this._map.deleteEnemy(this.node);
        this.node.destroy();
    };
    Enemy = __decorate([
        ccclass
    ], Enemy);
    return Enemy;
}(TankE_1.Tank));
exports.Enemy = Enemy;

cc._RF.pop();