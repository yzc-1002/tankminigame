
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
        this.updateLowHpVisual(dt);
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
        this._showEnemyHitEffect();
        if (showDamage > 0) {
            this._showDamageFloat(showDamage, damageType);
        }
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    Enemy.prototype._showEnemyHitEffect = function () {
        var effect = new cc.Node("_enemyHitEffect");
        effect.parent = this.node;
        effect.setPosition(0, 0);
        effect.zIndex = 300;
        var graphics = effect.addComponent(cc.Graphics);
        graphics.lineWidth = 8;
        graphics.strokeColor = cc.color(255, 80, 60, 230);
        graphics.circle(0, 0, this._radius + 16);
        graphics.stroke();
        graphics.fillColor = cc.color(255, 60, 40, 55);
        graphics.circle(0, 0, this._radius + 10);
        graphics.fill();
        effect.opacity = 255;
        effect.scale = 0.65;
        effect.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.18, 1.25), cc.fadeTo(0.18, 60)), cc.fadeOut(0.1), cc.removeSelf()));
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
        label.string = isCrit ? "🔥暴击-" + damageText : "-" + damageText;
        label.fontSize = isCrit ? 54 : 40;
        label.lineHeight = isCrit ? 58 : 40;
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
        if (this._map && this._map.isKillEffectTestMode && this._map.isKillEffectTestMode()) {
            this._map.handleKillEffectTestEnemyDeath(this.node);
            return;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxFbmVteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTZCO0FBQzdCLHNDQUFtQztBQUNuQyxxQ0FBaUM7QUFFM0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUM7QUFDdkMsSUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUM7QUFDbkMsSUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUM7QUFHdkM7SUFBMkIseUJBQUk7SUFBL0I7UUFFSSxNQUFNO1FBQ04sY0FBYztRQUNkLHlCQUF5QjtRQUo3QixxRUF3WkM7UUFsWkcsTUFBTTtRQUNOLHFCQUFlLEdBQUcsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUNwQyxhQUFPLEdBQVcsSUFBSSxDQUFDLENBQUssTUFBTTtRQUVsQyxLQUFLO1FBQ0wsZ0JBQVUsR0FBUSxFQUFFLENBQUMsQ0FBTyxNQUFNO1FBQ2xDLGNBQVEsR0FBVSxJQUFJLENBQUMsQ0FBSyxFQUFFO1FBQzlCLGVBQVMsR0FBUyxHQUFHLENBQUMsQ0FBTSxNQUFNOztJQTJZdEMsQ0FBQztJQXpZRyxzQkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRWQsT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTztJQUNQLDZCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFFLElBQUk7SUFDL0IsQ0FBQztJQUVELE9BQU87SUFDUCx1QkFBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNuQixJQUFJLENBQUMs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QUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNsQixLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekYsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFbkIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQUcsVUFBVSxJQUFJLE1BQU0sQ0FBQztRQUNsQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUNoRSxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV0RSxLQUFLLENBQUMsU0FBUyxDQUNYLEVBQUUsQ0FBQyxRQUFRLENBQ1AsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsQ0FBQyxFQUN6QyxFQUFFLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDeEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUNyRCxFQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsRUFDcEMsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxFQUN4QyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxFQUM1QyxFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQ3RELEVBQ0QsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNSLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FDTCxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsaUNBQWlCLEdBQWpCLFVBQWtCLE1BQU07UUFDcEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRTtZQUM3QyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNO0lBQ04sdUJBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRTtZQUNqRixJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxPQUFPO1NBQ1Y7UUFFRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUVoQixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUF2WlEsS0FBSztRQURqQixPQUFPO09BQ0ssS0FBSyxDQXdaakI7SUFBRCxZQUFDO0NBeFpELEFBd1pDLENBeFowQixZQUFJLEdBd1o5QjtBQXhaWSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFua30gZnJvbSBcIi4vVGFua0VcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0J1bGxldH0gZnJvbSBcIi4vQnVsbGV0RVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IERBTUFHRV9GTE9BVF9GQURFX0lOX1RJTUUgPSAwLjE4O1xyXG5jb25zdCBEQU1BR0VfRkxPQVRfSE9MRF9USU1FID0gMC41O1xyXG5jb25zdCBEQU1BR0VfRkxPQVRfRkFERV9PVVRfVElNRSA9IDAuMjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBFbmVteSBleHRlbmRzIFRhbmsge1xyXG5cclxuICAgIC8v5pWM5Lq657G75Z6LXHJcbiAgICAvLyBAcHJvcGVydHkoKVxyXG4gICAgLy8gZW5lbXlUeXBlOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8v5YaF6YOo5Y+Y6YePXHJcbiAgICBfYnVsbGV0Q29kZVRpbWUgPSAxOyAgICAgICAgLy/lsITlh7vlhrfljbTml7bpl7RcclxuICAgIF90YXJnZXQgICAgICAgICA9IG51bGw7ICAgICAvL+aUu+WHu+ebruagh1xyXG5cclxuICAgIC8vIEEqXHJcbiAgICBfd2Fsa1BhdGhzICAgICAgPSBbXTsgICAgICAgLy/ooYzotbDliJfooahcclxuICAgIF93aWxsUG9zICAgICAgICA9IG51bGw7ICAgICAvL1xyXG4gICAgX2NvZGVUaW1lICAgICAgID0gMC41OyAgICAgIC8v5Ya35Y205pe26Ze0XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKClcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9jYW1wID0gXCJlbmVteVwiOyAgLy/pmLXokKVcclxuICAgIH1cclxuICAgICAgXHJcbiAgICAvL+WIneWni+WMllVJXHJcbiAgICBfaW5pdFVJKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2hwTGFiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2hwTGFiLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruaVjOS6uuexu+Wei1xyXG4gICAgc2V0RW5lbXlUeXBlKHRhbmtUeXBlLGxldmxlSWQpIHtcclxuICAgICAgICBzdXBlci5zZXRUYW5rVHlwZSh0YW5rVHlwZSk7XHJcblxyXG4gICAgICAgIC8v6K6h566X5pWM5Lq66KGA6YePIOaUu+WHu1xyXG4gICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHAgPSB0aGlzLl9jb25maWcuSFAqKGxldmxlSWQrMSk7XHJcbiAgICAgICAgdGhpcy5fYXRrID0gdGhpcy5fY29uZmlnLkFUSyoobGV2bGVJZCsxKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruebruagh1xyXG4gICAgc2V0VGFyZ2V0ICh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9ICBcclxuXHJcbiAgICAvL+iuvue9ruWGt+WNtOaXtumXtFxyXG4gICAgX3Jlc2V0Q29kZVRpbWUgKCkge1xyXG4gICAgICAgIHRoaXMuX2NvZGVUaW1lID0gTWF0aC5yYW5kb20oKSowLjUgKyAwLjM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLyBBKiAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIGZpbmRQYXRoIChfc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgdGhpcy5fd2Fsa1BhdGhzID0gW107XHJcbiAgICAgICAgLy8gdGhpcy5fbWFwLnJlc2V0TWFwKCk7XHJcblxyXG5cclxuICAgICAgICBsZXQgc3RhclRpbGUgPSB0aGlzLl9tYXAuZ2FtZVBvc1RvVGlsZSh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBlbmRUaWxlID0gdGhpcy5fbWFwLmdhbWVQb3NUb1RpbGUodGhpcy5fdGFyZ2V0LnBvc2l0aW9uKTtcclxuICAgICAgICBlbmRUaWxlID0gdGhpcy5fbWFwLmdldFBhc3NhYmxlVGlsZUV4KGVuZFRpbGUpO1xyXG5cclxuICAgICAgICBpZiAoc3RhclRpbGUgJiYgZW5kVGlsZSAmJiAoc3RhclRpbGUueCAhPSBlbmRUaWxlLnggfHwgc3RhclRpbGUueSAhPSBlbmRUaWxlLnkpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hlY2tMaXN0ID0gdGhpcy5fbWFwLmdldENoZWNrTGlzdCgpOyAgIC8v5qOA5p+l5YiX6KGoXHJcbiAgICAgICAgICAgIGxldCBvcGVuTGlzdCA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lvoXliKTmlq3liJfooahcclxuICAgICAgICAgICAgbGV0IGNsb3NlTGlzdCA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreWIl+ihqFxyXG5cclxuICAgICAgICAgICAgbGV0IGVuZEl0ZW0gPSB0aGlzLmdldEVuZEl0ZW0oc3RhclRpbGUsZW5kVGlsZSxjaGVja0xpc3Qsb3Blbkxpc3QsY2xvc2VMaXN0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChlbmRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2Fsa1BhdGhzID0gW107XHJcbiAgICAgICAgICAgICAgICB3aGlsZShlbmRJdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICB3YWxrUGF0aHMudW5zaGlmdChlbmRJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmRJdGVtID0gZW5kSXRlbS5mYXRoZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhbGtQYXRocyA9IHdhbGtQYXRocztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGVja0xpc3QgPSB7fTtcclxuICAgICAgICAgICAgb3Blbkxpc3QgPSBjbG9zZUxpc3QgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RW5kSXRlbShzdGFyVGlsZSxlbmRUaWxlLGNoZWNrTGlzdCxvcGVuTGlzdCxjbG9zZUxpc3Qpe1xyXG4gICAgICAgIGxldCBzdGFySXRlbSA9IHRoaXMuZ2V0Q2hlY2tJdGVtKHN0YXJUaWxlLngsIHN0YXJUaWxlLnksIGNoZWNrTGlzdCk7XHJcbiAgICAgICAgdGhpcy5hZGRUb0xpc3Qoc3Rhckl0ZW0sb3Blbkxpc3QpO1xyXG5cclxuICAgICAgICB3aGlsZShvcGVuTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IGNoZWNrSXRlbSA9IG9wZW5MaXN0LnNoaWZ0KCk7ICAgICAvL+i/lOWbnuesrOS4gOS4quWAvCjnrKzkuIDkuKrlgLzogq/lrprmnIDlsI8pXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVG9MaXN0KGNoZWNrSXRlbSxjbG9zZUxpc3QpOyAgLy/liqDlhaXlhbPpl63liJfooahcclxuICAgICAgICAgICAgLy8gY2MubG9nKGNoZWNrSXRlbS54LCBjaGVja0l0ZW0ueSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjaGVja0l0ZW3miYDlnKjkvY3nva4v55uu5qCH5L2N572u5bCP5LqO5pS75Ye75Y2K5b6EIOS4lCDku5bku6zkuYvliY3msqHmnInpmpznoo3niaks6K+05piO5bey57uP5om+5Yiw5LqG5pyA57uI55qE5L2N572uXHJcbiAgICAgICAgICAgIGlmIChlbmRUaWxlLnggPT0gY2hlY2tJdGVtLnggJiYgZW5kVGlsZS55ID09IGNoZWNrSXRlbS55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hlY2tJdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+aKiuWRqOWbtOeahOWKoOi/m+adpVxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gLTE7IHggPD0gMTsgeCsrKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gLTE7IHkgPD0gMTsgeSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSBjaGVja0l0ZW0ueCt4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IGNoZWNrSXRlbS55K3k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICE9IDAgfHwgeSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJdGVtcy5wdXNoKHt4Om5ld3gseTpuZXd5fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm5ld0l0ZW1zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXdJdGVtcy5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbXMucHVzaChpdGVtWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3ggPSBuZXdJdGVtc1tpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gbmV3SXRlbXNbaV0ueTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHRoaXMuZ2V0Q2hlY2tJdGVtKG5ld3gsIG5ld3ksIGNoZWNrTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhc3NhYmxlSXRlbSA9IGNoZWNrSXRlbS5wYXNzYWJsZVtuZXd4ICsgXCJfXCIgKyBuZXd5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3NhYmxlSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3SXRlbS5HID0gKCh4PT0wfHx5PT0wKSA/IDEwIDogMTQpICsgY2hlY2tJdGVtLkc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdJdGVtLkggPSBNYXRoLnNxcnQoKGVuZFRpbGUueC1uZXdJdGVtLngpKihlbmRUaWxlLngtbmV3SXRlbS54KSoxMDAgKyAoZW5kVGlsZS55LW5ld0l0ZW0ueSkqKGVuZFRpbGUueS1uZXdJdGVtLnkpKjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLmZhdGhlciA9IGNoZWNrSXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9MaXN0KG5ld0l0ZW0sb3Blbkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0T3Blbkxpc3Qob3Blbkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpc3RbbmV3SXRlbS54LG5ld0l0ZW0ueV0gPSBuZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3Blbkxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIm5vIGZpbmQgcGF0aCAscmV0dXJuIFwiLGNoZWNrSXRlbS54LGNoZWNrSXRlbS55KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGVja0l0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Zyo5YiX6KGo5Lit5ou/5Ye65oyH5a6aaXRlbVxyXG4gICAgZ2V0Q2hlY2tJdGVtICh4LHksbGlzdCkge1xyXG4gICAgICAgIGxldCBpdGVtID0gbGlzdFt4ICsgXCJfXCIgKyB5XTtcclxuICAgICAgICBkZWxldGUgbGlzdFt4ICsgXCJfXCIgKyB5XTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnKjliJfooajkuK3mi7/lh7rmjIflrpppdGVtXHJcbiAgICBnZXRJdGVtICh4LHksbGlzdCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnggPT0geCAmJiBpdGVtLnkgPT0geSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a+5T3BlbuWIl+ihqOaOkuW6jyxHK0jmnIDlsI/nmoTmi43lnKjliY3pnaJcclxuICAgIHNvcnRPcGVuTGlzdChsaXN0KXtcclxuICAgICAgICBmdW5jdGlvbiBzb3J0TnVtYmVyKGEsIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEuRythLkgpIC0gKGIuRytiLkgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0LnNvcnQoc29ydE51bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5re75YqgaXRlbeWIsOWIl+ihqFxyXG4gICAgYWRkVG9MaXN0KGl0ZW0sbGlzdCl7XHJcbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLyBBKiAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fbWFwLl9wYXVzZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUxvd0hwVmlzdWFsKGR0KTtcclxuICAgICAgICB0aGlzLl9jb2RlVGltZSAtPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0ICYmIGNjLmlzVmFsaWQodGhpcy5fdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBsZXQgZnJvbVBvcyA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MgPSBjYy52Mih0aGlzLl90YXJnZXQucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gdGFyZ2V0UG9zLnN1Yihmcm9tUG9zKS5tYWcoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fd2Fsa1BhdGhzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aWxsUG9zID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL+ajgOa1i+aYr+WQpumBh+WIsOebruagh1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAmJiB0aGlzLl9tYXAuaXNIYXZlT3RoZXJFbmVteSh0aGlzLm5vZGUpID09IGZhbHNlICYmIHRoaXMuX21hcC5saW5lTGluZVBhc3NDb2xsaWRlcnMoZnJvbVBvcyx0YXJnZXRQb3MpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YGH5Yiw55uu5qCHLOWBnOS4iyzmuIXnqbrov5jmsqHmnInotbDnmoTot6/lvoRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRDb2RlVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2Fsa1BhdGhzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5rKh5pyJ6YGH5Yiw55uu5qCHLOe7p+e7reWJjei/m1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2Fsa0l0ZW0gPSB0aGlzLl93YWxrUGF0aHNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpbGxQb3MgPSB0aGlzLl9tYXAudGlsZVRvR2FtZVBvcyhjYy52Mih3YWxrSXRlbS54LCB3YWxrSXRlbS55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2lsbFBvcy5lcXVhbHMoZnJvbVBvcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhbGtQYXRocy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lsbFBvcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX3dpbGxQb3Muc3ViKGZyb21Qb3MpLm5vcm1hbGl6ZSgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGltZSA9IHRoaXMuX3dpbGxQb3Muc3ViKGZyb21Qb3MpLm1hZygpL3RoaXMuX2NvbmZpZy5TcGVlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKHRpbWUvNjAsdGhpcy5fd2lsbFBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwi6LWw5a6M5LqG5LiA6IqCIFwiLHdhbGtJdGVtLngsd2Fsa0l0ZW0ueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3dhbGtQYXRocy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl93aWxsUG9zID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvZGVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldENvZGVUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mo4DmtYvmmK/lkKbpgYfliLDnm67moIdcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuIDw9IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgJiYgdGhpcy5fbWFwLmxpbmVMaW5lUGFzc0NvbGxpZGVycyhmcm9tUG9zLHRhcmdldFBvcykgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/pgYfliLDnm67moIcs5LuA5LmI6YO95LiN5YGaLOWBnOWcqOWOn+WcsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9kaXIgPSB0YXJnZXRQb3Muc3ViKGZyb21Qb3MpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ayoeaciemBh+WIsOebruaghyzph43mlrDlr7vot69cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9zdGFydFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRQYXRoKF9zdGFydFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5fd2Fsa1BhdGhzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9kaXIgPSB0YXJnZXRQb3Muc3ViKGZyb21Qb3MpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfZW5kVGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3N0ID0gX2VuZFRpbWUgLSBfc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCIrY29zdGUgdGltZSBcIixjb3N0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v6K6h566X54Ku566h5pa55ZCRXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90YW5rVHlwZSA9PSAxMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3ModGhpcy5fYmFycmVsRGlyLDAuMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IHRhcmdldFBvcy5zdWIoZnJvbVBvcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXIueCA9PSAwICYmIHRoaXMuX2Rpci55ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBhPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hBbmdsZSgpO1xyXG5cclxuICAgICAgICAgICAgLy/lsITlh7tcclxuICAgICAgICAgICAgaWYgKGxlbiA8PSB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290aW5nKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IHRoaXMuX21hcC5qdWRnZXpJbmRleCh0aGlzLm5vZGUueSk7XHJcbiAgICB9ICBcclxuXHJcbiAgICAvL+WwhOWHu1xyXG4gICAgc2hvb3RpbmcoZHQpe1xyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA+PSB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/liJvlu7rlrZDlvLlcclxuICAgICAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KHRoaXMuX2NvbmZpZy5CVHlwZTEsdGhpcy5ub2RlLnBvc2l0aW9uLHRoaXMuX2JhcnJlbERpcix0aGlzLl9maXJlLl9seUJhcnJlbC5oZWlnaHQsdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyx0aGlzLl9hdGssdGhpcy5fY2FtcCx0aGlzLm5vZGUucGFyZW50LHRoaXMuX21hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6KKr5pS75Ye75YiwXHJcbiAgICBiZUhpdChkYW1hZ2UsIGRhbWFnZVR5cGUgPSBcIm5vcm1hbFwiKXtcclxuICAgICAgICBsZXQgZmluYWxEYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XHJcbiAgICAgICAgaWYgKGZpbmFsRGFtYWdlIDwgMCkge1xyXG4gICAgICAgICAgICBmaW5hbERhbWFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2hvd0RhbWFnZSA9IGZpbmFsRGFtYWdlO1xyXG4gICAgICAgIGlmIChzaG93RGFtYWdlID4gdGhpcy5faHApIHtcclxuICAgICAgICAgICAgc2hvd0RhbWFnZSA9IHRoaXMuX2hwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faHAgLT0gZmluYWxEYW1hZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dFbmVteUhpdEVmZmVjdCgpO1xyXG4gICAgICAgIGlmIChzaG93RGFtYWdlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93RGFtYWdlRmxvYXQoc2hvd0RhbWFnZSwgZGFtYWdlVHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dFbmVteUhpdEVmZmVjdCgpIHtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfZW5lbXlIaXRFZmZlY3RcIik7XHJcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDMwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZWZmZWN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgODAsIDYwLCAyMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxNik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA2MCwgNDAsIDU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgZWZmZWN0LnNjYWxlID0gMC42NTtcclxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS4yNSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xOCwgNjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dEYW1hZ2VGbG9hdChkYW1hZ2UsIGRhbWFnZVR5cGUpe1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5faHBMYWIgfHwgIXRoaXMuX2ZpcmUuX2hwTGFiLiRMYWJlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaHBMYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLl9maXJlLl9ocExhYik7XHJcbiAgICAgICAgaHBMYWIucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGhwTGFiLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaHBMYWIub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgaHBMYWIuc2NhbGUgPSAwLjQ7XHJcbiAgICAgICAgaHBMYWIuYW5nbGUgPSAwO1xyXG4gICAgICAgIGhwTGFiLnBvc2l0aW9uID0gdGhpcy5fZmlyZS5faHBMYWIucG9zaXRpb24uYWRkKGNjLnYzKChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI0LCAwLCAwKSk7XHJcbiAgICAgICAgaHBMYWIuekluZGV4ID0gMjAwO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBocExhYi4kTGFiZWwgfHwgaHBMYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgZGFtYWdlVGV4dCA9IHRoaXMuX2Zvcm1hdERhbWFnZVRleHQoZGFtYWdlKTtcclxuICAgICAgICBsZXQgaXNDcml0ID0gZGFtYWdlVHlwZSA9PSBcImNyaXRcIjtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBpc0NyaXQgPyBcIvCflKXmmrTlh7stXCIgKyBkYW1hZ2VUZXh0IDogXCItXCIgKyBkYW1hZ2VUZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gaXNDcml0ID8gNTQgOiA0MDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gaXNDcml0ID8gNTggOiA0MDtcclxuICAgICAgICBocExhYi5jb2xvciA9IGlzQ3JpdCA/IGNjLmNvbG9yKDI1NSwgMjEwLCA2MCkgOiBjYy5jb2xvcigyNTUsIDgwLCA4MCk7XHJcblxyXG4gICAgICAgIGhwTGFiLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oREFNQUdFX0ZMT0FUX0ZBREVfSU5fVElNRSwgMjU1KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKERBTUFHRV9GTE9BVF9GQURFX0lOX1RJTUUsIGlzQ3JpdCA/IDEuMjUgOiAxKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoREFNQUdFX0ZMT0FUX0ZBREVfSU5fVElNRSwgY2MudjIoMCwgMTgpKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShEQU1BR0VfRkxPQVRfSE9MRF9USU1FKSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhEQU1BR0VfRkxPQVRfRkFERV9PVVRfVElNRSwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhEQU1BR0VfRkxPQVRfRkFERV9PVVRfVElNRSwgMC42NSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KERBTUFHRV9GTE9BVF9GQURFX09VVF9USU1FLCBjYy52MigwLCAxMikpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBocExhYi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBfZm9ybWF0RGFtYWdlVGV4dChkYW1hZ2Upe1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgucm91bmQoZGFtYWdlICogMTApIC8gMTA7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZhbHVlIC0gTWF0aC5yb3VuZCh2YWx1ZSkpIDwgMC4wMDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBNYXRoLnJvdW5kKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/miafooYzmrbvkuqFcclxuICAgIGRvRGVhdGgoKXtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5pc0tpbGxFZmZlY3RUZXN0TW9kZSAmJiB0aGlzLl9tYXAuaXNLaWxsRWZmZWN0VGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuaGFuZGxlS2lsbEVmZmVjdFRlc3RFbmVteURlYXRoKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyLmRvRGVhdGgoKTtcclxuICAgICAgICBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgnYWRkLWNvaW4nLHtjb3VudDp0aGlzLl9jb25maWcuQ29pbixwb3NpdGlvbjpVdGlscy5nZXRXb3JsZFBvc2l0aW9uKHRoaXMubm9kZSl9KTtcclxuICAgICAgICB0aGlzLl9tYXAuZGVsZXRlRW5lbXkodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpOyBcclxuICAgIH1cclxufVxyXG4iXX0=