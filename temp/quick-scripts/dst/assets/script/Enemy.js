
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Enemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxFbmVteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTZCO0FBQzdCLHNDQUFtQztBQUNuQyxxQ0FBaUM7QUFFM0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUM7QUFDdkMsSUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUM7QUFDbkMsSUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUM7QUFHdkM7SUFBMkIseUJBQUk7SUFBL0I7UUFFSSxNQUFNO1FBQ04sY0FBYztRQUNkLHlCQUF5QjtRQUo3QixxRUFzWEM7UUFoWEcsTUFBTTtRQUNOLHFCQUFlLEdBQUcsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUNwQyxhQUFPLEdBQVcsSUFBSSxDQUFDLENBQUssTUFBTTtRQUVsQyxLQUFLO1FBQ0wsZ0JBQVUsR0FBUSxFQUFFLENBQUMsQ0FBTyxNQUFNO1FBQ2xDLGNBQVEsR0FBVSxJQUFJLENBQUMsQ0FBSyxFQUFFO1FBQzlCLGVBQVMsR0FBUyxHQUFHLENBQUMsQ0FBTSxNQUFNOztJQXlXdEMsQ0FBQztJQXZXRyxzQkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRWQsT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTztJQUNQLDZCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFFLElBQUk7SUFDL0IsQ0FBQztJQUVELE9BQU87SUFDUCx1QkFBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNuQixJQUFJLENBQUMs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QUMsQ0FBQztRQUN0RyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBclhRLEtBQUs7UUFEakIsT0FBTztPQUNLLEtBQUssQ0FzWGpCO0lBQUQsWUFBQztDQXRYRCxBQXNYQyxDQXRYMEIsWUFBSSxHQXNYOUI7QUF0WFksc0JBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Rhbmt9IGZyb20gXCIuL1RhbmtFXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHtCdWxsZXR9IGZyb20gXCIuL0J1bGxldEVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBEQU1BR0VfRkxPQVRfRkFERV9JTl9USU1FID0gMC4xODtcclxuY29uc3QgREFNQUdFX0ZMT0FUX0hPTERfVElNRSA9IDAuNTtcclxuY29uc3QgREFNQUdFX0ZMT0FUX0ZBREVfT1VUX1RJTUUgPSAwLjI7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgRW5lbXkgZXh0ZW5kcyBUYW5rIHtcclxuXHJcbiAgICAvL+aVjOS6uuexu+Wei1xyXG4gICAgLy8gQHByb3BlcnR5KClcclxuICAgIC8vIGVuZW15VHlwZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvL+WGhemDqOWPmOmHj1xyXG4gICAgX2J1bGxldENvZGVUaW1lID0gMTsgICAgICAgIC8v5bCE5Ye75Ya35Y205pe26Ze0XHJcbiAgICBfdGFyZ2V0ICAgICAgICAgPSBudWxsOyAgICAgLy/mlLvlh7vnm67moIdcclxuXHJcbiAgICAvLyBBKlxyXG4gICAgX3dhbGtQYXRocyAgICAgID0gW107ICAgICAgIC8v6KGM6LWw5YiX6KGoXHJcbiAgICBfd2lsbFBvcyAgICAgICAgPSBudWxsOyAgICAgLy9cclxuICAgIF9jb2RlVGltZSAgICAgICA9IDAuNTsgICAgICAvL+WGt+WNtOaXtumXtFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZVSVxyXG4gICAgICAgIHRoaXMuX2luaXRVSSgpXHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwiZW5lbXlcIjsgIC8v6Zi16JClXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9ocExhYikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9ocExhYi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7mlYzkurrnsbvlnotcclxuICAgIHNldEVuZW15VHlwZSh0YW5rVHlwZSxsZXZsZUlkKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VGFua1R5cGUodGFua1R5cGUpO1xyXG5cclxuICAgICAgICAvL+iuoeeul+aVjOS6uuihgOmHjyDmlLvlh7tcclxuICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX21heEhwID0gdGhpcy5fY29uZmlnLkhQKihsZXZsZUlkKzEpO1xyXG4gICAgICAgIHRoaXMuX2F0ayA9IHRoaXMuX2NvbmZpZy5BVEsqKGxldmxlSWQrMSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7nm67moIdcclxuICAgIHNldFRhcmdldCAodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfSAgXHJcblxyXG4gICAgLy/orr7nva7lhrfljbTml7bpl7RcclxuICAgIF9yZXNldENvZGVUaW1lICgpIHtcclxuICAgICAgICB0aGlzLl9jb2RlVGltZSA9IE1hdGgucmFuZG9tKCkqMC41ICsgMC4zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8gQSogLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICBmaW5kUGF0aCAoX3N0YXJ0VGltZSkge1xyXG4gICAgICAgIHRoaXMuX3dhbGtQYXRocyA9IFtdO1xyXG4gICAgICAgIC8vIHRoaXMuX21hcC5yZXNldE1hcCgpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHN0YXJUaWxlID0gdGhpcy5fbWFwLmdhbWVQb3NUb1RpbGUodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgZW5kVGlsZSA9IHRoaXMuX21hcC5nYW1lUG9zVG9UaWxlKHRoaXMuX3RhcmdldC5wb3NpdGlvbik7XHJcbiAgICAgICAgZW5kVGlsZSA9IHRoaXMuX21hcC5nZXRQYXNzYWJsZVRpbGVFeChlbmRUaWxlKTtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJUaWxlICYmIGVuZFRpbGUgJiYgKHN0YXJUaWxlLnggIT0gZW5kVGlsZS54IHx8IHN0YXJUaWxlLnkgIT0gZW5kVGlsZS55KSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoZWNrTGlzdCA9IHRoaXMuX21hcC5nZXRDaGVja0xpc3QoKTsgICAvL+ajgOafpeWIl+ihqFxyXG4gICAgICAgICAgICBsZXQgb3Blbkxpc3QgPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5b6F5Yik5pat5YiX6KGoXHJcbiAgICAgICAgICAgIGxldCBjbG9zZUxpc3QgPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgLy/lhbPpl63liJfooahcclxuXHJcbiAgICAgICAgICAgIGxldCBlbmRJdGVtID0gdGhpcy5nZXRFbmRJdGVtKHN0YXJUaWxlLGVuZFRpbGUsY2hlY2tMaXN0LG9wZW5MaXN0LGNsb3NlTGlzdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZW5kSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhbGtQYXRocyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoZW5kSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Fsa1BhdGhzLnVuc2hpZnQoZW5kSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kSXRlbSA9IGVuZEl0ZW0uZmF0aGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YWxrUGF0aHMgPSB3YWxrUGF0aHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hlY2tMaXN0ID0ge307XHJcbiAgICAgICAgICAgIG9wZW5MaXN0ID0gY2xvc2VMaXN0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZEl0ZW0oc3RhclRpbGUsZW5kVGlsZSxjaGVja0xpc3Qsb3Blbkxpc3QsY2xvc2VMaXN0KXtcclxuICAgICAgICBsZXQgc3Rhckl0ZW0gPSB0aGlzLmdldENoZWNrSXRlbShzdGFyVGlsZS54LCBzdGFyVGlsZS55LCBjaGVja0xpc3QpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9MaXN0KHN0YXJJdGVtLG9wZW5MaXN0KTtcclxuXHJcbiAgICAgICAgd2hpbGUob3Blbkxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBjaGVja0l0ZW0gPSBvcGVuTGlzdC5zaGlmdCgpOyAgICAgLy/ov5Tlm57nrKzkuIDkuKrlgLwo56ys5LiA5Liq5YC86IKv5a6a5pyA5bCPKVxyXG4gICAgICAgICAgICB0aGlzLmFkZFRvTGlzdChjaGVja0l0ZW0sY2xvc2VMaXN0KTsgIC8v5Yqg5YWl5YWz6Zet5YiX6KGoXHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhjaGVja0l0ZW0ueCwgY2hlY2tJdGVtLnkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY2hlY2tJdGVt5omA5Zyo5L2N572uL+ebruagh+S9jee9ruWwj+S6juaUu+WHu+WNiuW+hCDkuJQg5LuW5Lus5LmL5YmN5rKh5pyJ6Zqc56KN54mpLOivtOaYjuW3sue7j+aJvuWIsOS6huacgOe7iOeahOS9jee9rlxyXG4gICAgICAgICAgICBpZiAoZW5kVGlsZS54ID09IGNoZWNrSXRlbS54ICYmIGVuZFRpbGUueSA9PSBjaGVja0l0ZW0ueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrSXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy/miorlkajlm7TnmoTliqDov5vmnaVcclxuICAgICAgICAgICAgICAgIGxldCBuZXdJdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IC0xOyB4IDw9IDE7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gY2hlY2tJdGVtLngreDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSBjaGVja0l0ZW0ueSt5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SXRlbXMucHVzaCh7eDpuZXd4LHk6bmV3eX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpuZXdJdGVtcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3SXRlbXMuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1zLnB1c2goaXRlbVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gbmV3SXRlbXNbaV0ueDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IG5ld0l0ZW1zW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSB0aGlzLmdldENoZWNrSXRlbShuZXd4LCBuZXd5LCBjaGVja0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXNzYWJsZUl0ZW0gPSBjaGVja0l0ZW0ucGFzc2FibGVbbmV3eCArIFwiX1wiICsgbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXNzYWJsZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5ld0l0ZW0uRyA9ICgoeD09MHx8eT09MCkgPyAxMCA6IDE0KSArIGNoZWNrSXRlbS5HO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3SXRlbS5IID0gTWF0aC5zcXJ0KChlbmRUaWxlLngtbmV3SXRlbS54KSooZW5kVGlsZS54LW5ld0l0ZW0ueCkqMTAwICsgKGVuZFRpbGUueS1uZXdJdGVtLnkpKihlbmRUaWxlLnktbmV3SXRlbS55KSoxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5mYXRoZXIgPSBjaGVja0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRvTGlzdChuZXdJdGVtLG9wZW5MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydE9wZW5MaXN0KG9wZW5MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXN0W25ld0l0ZW0ueCxuZXdJdGVtLnldID0gbmV3SXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wZW5MaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJubyBmaW5kIHBhdGggLHJldHVybiBcIixjaGVja0l0ZW0ueCxjaGVja0l0ZW0ueSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hlY2tJdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WcqOWIl+ihqOS4reaLv+WHuuaMh+Wumml0ZW1cclxuICAgIGdldENoZWNrSXRlbSAoeCx5LGxpc3QpIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGxpc3RbeCArIFwiX1wiICsgeV07XHJcbiAgICAgICAgZGVsZXRlIGxpc3RbeCArIFwiX1wiICsgeV07XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Zyo5YiX6KGo5Lit5ou/5Ye65oyH5a6aaXRlbVxyXG4gICAgZ2V0SXRlbSAoeCx5LGxpc3QpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS54ID09IHggJiYgaXRlbS55ID09IHkpIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WvuU9wZW7liJfooajmjpLluo8sRytI5pyA5bCP55qE5ouN5Zyo5YmN6Z2iXHJcbiAgICBzb3J0T3Blbkxpc3QobGlzdCl7XHJcbiAgICAgICAgZnVuY3Rpb24gc29ydE51bWJlcihhLCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChhLkcrYS5IKSAtIChiLkcrYi5IKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdC5zb3J0KHNvcnROdW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOa3u+WKoGl0ZW3liLDliJfooahcclxuICAgIGFkZFRvTGlzdChpdGVtLGxpc3Qpe1xyXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8gQSogLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcC5fcGF1c2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fY29kZVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3RhcmdldCkpIHtcclxuICAgICAgICAgICAgbGV0IGZyb21Qb3MgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zID0gY2MudjIodGhpcy5fdGFyZ2V0LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IHRhcmdldFBvcy5zdWIoZnJvbVBvcykubWFnKClcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3dhbGtQYXRocy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2lsbFBvcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy/mo4DmtYvmmK/lkKbpgYfliLDnm67moIdcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuIDw9IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgJiYgdGhpcy5fbWFwLmlzSGF2ZU90aGVyRW5lbXkodGhpcy5ub2RlKSA9PSBmYWxzZSAmJiB0aGlzLl9tYXAubGluZUxpbmVQYXNzQ29sbGlkZXJzKGZyb21Qb3MsdGFyZ2V0UG9zKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mBh+WIsOebruaghyzlgZzkuIss5riF56m66L+Y5rKh5pyJ6LWw55qE6Lev5b6EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q29kZVRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhbGtQYXRocyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ayoeaciemBh+WIsOebruaghyznu6fnu63liY3ov5tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdhbGtJdGVtID0gdGhpcy5fd2Fsa1BhdGhzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWxsUG9zID0gdGhpcy5fbWFwLnRpbGVUb0dhbWVQb3MoY2MudjIod2Fsa0l0ZW0ueCwgd2Fsa0l0ZW0ueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpbGxQb3MuZXF1YWxzKGZyb21Qb3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWxrUGF0aHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpbGxQb3MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXIgPSB0aGlzLl93aWxsUG9zLnN1Yihmcm9tUG9zKS5ub3JtYWxpemUoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWUgPSB0aGlzLl93aWxsUG9zLnN1Yihmcm9tUG9zKS5tYWcoKS90aGlzLl9jb25maWcuU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0aW1lLzYwLHRoaXMuX3dpbGxQb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIui1sOWujOS6huS4gOiKgiBcIix3YWxrSXRlbS54LHdhbGtJdGVtLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl93YWxrUGF0aHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fd2lsbFBvcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb2RlVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRDb2RlVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5qOA5rWL5piv5ZCm6YGH5Yiw55uu5qCHXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8PSB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICYmIHRoaXMuX21hcC5saW5lTGluZVBhc3NDb2xsaWRlcnMoZnJvbVBvcyx0YXJnZXRQb3MpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YGH5Yiw55uu5qCHLOS7gOS5iOmDveS4jeWBmizlgZzlnKjljp/lnLBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fZGlyID0gdGFyZ2V0UG9zLnN1Yihmcm9tUG9zKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/msqHmnInpgYfliLDnm67moIcs6YeN5paw5a+76LevXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kUGF0aChfc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuX3dhbGtQYXRocy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fZGlyID0gdGFyZ2V0UG9zLnN1Yihmcm9tUG9zKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2VuZFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29zdCA9IF9lbmRUaW1lIC0gX3N0YXJ0VGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiK2Nvc3RlIHRpbWUgXCIsY29zdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+iuoeeul+eCrueuoeaWueWQkVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGFua1R5cGUgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKHRoaXMuX2JhcnJlbERpciwwLjIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0YXJnZXRQb3Muc3ViKGZyb21Qb3MpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGlyLnggPT0gMCAmJiB0aGlzLl9kaXIueSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQW5nbGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8v5bCE5Ye7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPD0gdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdGluZyhkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB0aGlzLl9tYXAuanVkZ2V6SW5kZXgodGhpcy5ub2RlLnkpO1xyXG4gICAgfSAgXHJcblxyXG4gICAgLy/lsITlh7tcclxuICAgIHNob290aW5nKGR0KXtcclxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0Q29kZVRpbWUgPj0gdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5Yib5bu65a2Q5by5XHJcbiAgICAgICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeCh0aGlzLl9jb25maWcuQlR5cGUxLHRoaXMubm9kZS5wb3NpdGlvbix0aGlzLl9iYXJyZWxEaXIsdGhpcy5fZmlyZS5fbHlCYXJyZWwuaGVpZ2h0LHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMsdGhpcy5fYXRrLHRoaXMuX2NhbXAsdGhpcy5ub2RlLnBhcmVudCx0aGlzLl9tYXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iiq+aUu+WHu+WIsFxyXG4gICAgYmVIaXQoZGFtYWdlLCBkYW1hZ2VUeXBlID0gXCJub3JtYWxcIil7XHJcbiAgICAgICAgbGV0IGZpbmFsRGFtYWdlID0gZGFtYWdlIC0gdGhpcy5fZGVmO1xyXG4gICAgICAgIGlmIChmaW5hbERhbWFnZSA8IDApIHtcclxuICAgICAgICAgICAgZmluYWxEYW1hZ2UgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNob3dEYW1hZ2UgPSBmaW5hbERhbWFnZTtcclxuICAgICAgICBpZiAoc2hvd0RhbWFnZSA+IHRoaXMuX2hwKSB7XHJcbiAgICAgICAgICAgIHNob3dEYW1hZ2UgPSB0aGlzLl9ocDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hwIC09IGZpbmFsRGFtYWdlO1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5faHAgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgICAgICBpZiAoc2hvd0RhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0RhbWFnZUZsb2F0KHNob3dEYW1hZ2UsIGRhbWFnZVR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93RGFtYWdlRmxvYXQoZGFtYWdlLCBkYW1hZ2VUeXBlKXtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2hwTGFiIHx8ICF0aGlzLl9maXJlLl9ocExhYi4kTGFiZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhwTGFiID0gY2MuaW5zdGFudGlhdGUodGhpcy5fZmlyZS5faHBMYWIpO1xyXG4gICAgICAgIGhwTGFiLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBocExhYi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGhwTGFiLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGhwTGFiLnNjYWxlID0gMC40O1xyXG4gICAgICAgIGhwTGFiLmFuZ2xlID0gMDtcclxuICAgICAgICBocExhYi5wb3NpdGlvbiA9IHRoaXMuX2ZpcmUuX2hwTGFiLnBvc2l0aW9uLmFkZChjYy52MygoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyNCwgMCwgMCkpO1xyXG4gICAgICAgIGhwTGFiLnpJbmRleCA9IDIwMDtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gaHBMYWIuJExhYmVsIHx8IGhwTGFiLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGV0IGRhbWFnZVRleHQgPSB0aGlzLl9mb3JtYXREYW1hZ2VUZXh0KGRhbWFnZSk7XHJcbiAgICAgICAgbGV0IGlzQ3JpdCA9IGRhbWFnZVR5cGUgPT0gXCJjcml0XCI7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gaXNDcml0ID8gXCLmmrTlh7stXCIgKyBkYW1hZ2VUZXh0IDogXCItXCIgKyBkYW1hZ2VUZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gaXNDcml0ID8gNDYgOiA0MDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gaXNDcml0ID8gNDYgOiA0MDtcclxuICAgICAgICBocExhYi5jb2xvciA9IGlzQ3JpdCA/IGNjLmNvbG9yKDI1NSwgMjEwLCA2MCkgOiBjYy5jb2xvcigyNTUsIDgwLCA4MCk7XHJcblxyXG4gICAgICAgIGhwTGFiLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oREFNQUdFX0ZMT0FUX0ZBREVfSU5fVElNRSwgMjU1KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKERBTUFHRV9GTE9BVF9GQURFX0lOX1RJTUUsIGlzQ3JpdCA/IDEuMjUgOiAxKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoREFNQUdFX0ZMT0FUX0ZBREVfSU5fVElNRSwgY2MudjIoMCwgMTgpKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShEQU1BR0VfRkxPQVRfSE9MRF9USU1FKSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhEQU1BR0VfRkxPQVRfRkFERV9PVVRfVElNRSwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhEQU1BR0VfRkxPQVRfRkFERV9PVVRfVElNRSwgMC42NSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KERBTUFHRV9GTE9BVF9GQURFX09VVF9USU1FLCBjYy52MigwLCAxMikpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBocExhYi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBfZm9ybWF0RGFtYWdlVGV4dChkYW1hZ2Upe1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgucm91bmQoZGFtYWdlICogMTApIC8gMTA7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZhbHVlIC0gTWF0aC5yb3VuZCh2YWx1ZSkpIDwgMC4wMDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBNYXRoLnJvdW5kKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/miafooYzmrbvkuqFcclxuICAgIGRvRGVhdGgoKXtcclxuICAgICAgICBzdXBlci5kb0RlYXRoKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6dGhpcy5fY29uZmlnLkNvaW4scG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLm5vZGUpfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZUVuZW15KHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTsgXHJcbiAgICB9XHJcbn1cclxuIl19