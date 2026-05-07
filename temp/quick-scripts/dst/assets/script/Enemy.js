
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
        _this._moveAction = null;
        _this._moveSpeedFactor = 1;
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
        this._updateMoveActionSpeed();
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
                        this._moveAction = null;
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
                            var moveSequence = cc.sequence(cc.moveTo(time / 60, this._willPos), cc.callFunc(function () {
                                // cc.log("走完了一节 ",walkItem.x,walkItem.y);
                                self_1._walkPaths.shift();
                                self_1._willPos = null;
                                self_1._moveAction = null;
                                self_1._moveSpeedFactor = 1;
                            }));
                            this._moveSpeedFactor = this._getTerrainSpeedFactor();
                            this._moveAction = cc.speed(moveSequence, this._moveSpeedFactor);
                            this.node.runAction(this._moveAction);
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
    Enemy.prototype._getTerrainSpeedFactor = function () {
        if (!this._map || !this._map.getTerrainSpeedFactor) {
            return 1;
        }
        return this._map.getTerrainSpeedFactor(this.node.position, this._radius);
    };
    Enemy.prototype._updateMoveActionSpeed = function () {
        if (!this._moveAction || !this._moveAction.setSpeed) {
            return;
        }
        var nextFactor = this._getTerrainSpeedFactor();
        if (Math.abs(nextFactor - this._moveSpeedFactor) < 0.02) {
            return;
        }
        this._moveSpeedFactor = nextFactor;
        this._moveAction.setSpeed(nextFactor);
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
        if (this._map && this._map.isKillBroadcastTestMode && this._map.isKillBroadcastTestMode()) {
            this._map.handleKillBroadcastTestEnemyDeath(this.node);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxFbmVteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTZCO0FBQzdCLHNDQUFtQztBQUNuQyxxQ0FBaUM7QUFFM0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUM7QUFDdkMsSUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUM7QUFDbkMsSUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUM7QUFHdkM7SUFBMkIseUJBQUk7SUFBL0I7UUFFSSxNQUFNO1FBQ04sY0FBYztRQUNkLHlCQUF5QjtRQUo3QixxRUF3YkM7UUFsYkcsTUFBTTtRQUNOLHFCQUFlLEdBQUcsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUNwQyxhQUFPLEdBQVcsSUFBSSxDQUFDLENBQUssTUFBTTtRQUVsQyxLQUFLO1FBQ0wsZ0JBQVUsR0FBUSxFQUFFLENBQUMsQ0FBTyxNQUFNO1FBQ2xDLGNBQVEsR0FBVSxJQUFJLENBQUMsQ0FBSyxFQUFFO1FBQzlCLGVBQVMsR0FBUyxHQUFHLENBQUMsQ0FBTSxNQUFNO1FBQ2xDLGlCQUFXLEdBQU8sSUFBSSxDQUFDO1FBQ3ZCLHNCQUFnQixHQUFHLENBQUMsQ0FBQzs7SUF5YXpCLENBQUM7SUF2YUcsc0JBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBRWYsT0FBTztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUVkLE9BQU87UUFDUCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELE9BQU87SUFDUCw2QkFBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBRSxJQUFJO0lBQy9CLENBQUM7SUFFRCxPQUFPO0lBQ1AsdUJBQU8sR0FBUDtR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XCIuL1RhbmtFXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHtCdWxsZXR9IGZyb20gXCIuL0J1bGxldEVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBEQU1BR0VfRkxPQVRfRkFERV9JTl9USU1FID0gMC4xODtcclxuY29uc3QgREFNQUdFX0ZMT0FUX0hPTERfVElNRSA9IDAuNTtcclxuY29uc3QgREFNQUdFX0ZMT0FUX0ZBREVfT1VUX1RJTUUgPSAwLjI7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgRW5lbXkgZXh0ZW5kcyBUYW5rIHtcclxuXHJcbiAgICAvL+aVjOS6uuexu+Wei1xyXG4gICAgLy8gQHByb3BlcnR5KClcclxuICAgIC8vIGVuZW15VHlwZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvL+WGhemDqOWPmOmHj1xyXG4gICAgX2J1bGxldENvZGVUaW1lID0gMTsgICAgICAgIC8v5bCE5Ye75Ya35Y205pe26Ze0XHJcbiAgICBfdGFyZ2V0ICAgICAgICAgPSBudWxsOyAgICAgLy/mlLvlh7vnm67moIdcclxuXHJcbiAgICAvLyBBKlxyXG4gICAgX3dhbGtQYXRocyAgICAgID0gW107ICAgICAgIC8v6KGM6LWw5YiX6KGoXHJcbiAgICBfd2lsbFBvcyAgICAgICAgPSBudWxsOyAgICAgLy9cclxuICAgIF9jb2RlVGltZSAgICAgICA9IDAuNTsgICAgICAvL+WGt+WNtOaXtumXtFxyXG4gICAgX21vdmVBY3Rpb24gICAgID0gbnVsbDtcclxuICAgIF9tb3ZlU3BlZWRGYWN0b3IgPSAxO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZVSVxyXG4gICAgICAgIHRoaXMuX2luaXRVSSgpXHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwiZW5lbXlcIjsgIC8v6Zi16JClXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9ocExhYikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9ocExhYi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7mlYzkurrnsbvlnotcclxuICAgIHNldEVuZW15VHlwZSh0YW5rVHlwZSxsZXZsZUlkKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VGFua1R5cGUodGFua1R5cGUpO1xyXG5cclxuICAgICAgICAvL+iuoeeul+aVjOS6uuihgOmHjyDmlLvlh7tcclxuICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX21heEhwID0gdGhpcy5fY29uZmlnLkhQKihsZXZsZUlkKzEpO1xyXG4gICAgICAgIHRoaXMuX2F0ayA9IHRoaXMuX2NvbmZpZy5BVEsqKGxldmxlSWQrMSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7nm67moIdcclxuICAgIHNldFRhcmdldCAodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfSAgXHJcblxyXG4gICAgLy/orr7nva7lhrfljbTml7bpl7RcclxuICAgIF9yZXNldENvZGVUaW1lICgpIHtcclxuICAgICAgICB0aGlzLl9jb2RlVGltZSA9IE1hdGgucmFuZG9tKCkqMC41ICsgMC4zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8gQSogLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICBmaW5kUGF0aCAoX3N0YXJ0VGltZSkge1xyXG4gICAgICAgIHRoaXMuX3dhbGtQYXRocyA9IFtdO1xyXG4gICAgICAgIC8vIHRoaXMuX21hcC5yZXNldE1hcCgpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHN0YXJUaWxlID0gdGhpcy5fbWFwLmdhbWVQb3NUb1RpbGUodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgZW5kVGlsZSA9IHRoaXMuX21hcC5nYW1lUG9zVG9UaWxlKHRoaXMuX3RhcmdldC5wb3NpdGlvbik7XHJcbiAgICAgICAgZW5kVGlsZSA9IHRoaXMuX21hcC5nZXRQYXNzYWJsZVRpbGVFeChlbmRUaWxlKTtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJUaWxlICYmIGVuZFRpbGUgJiYgKHN0YXJUaWxlLnggIT0gZW5kVGlsZS54IHx8IHN0YXJUaWxlLnkgIT0gZW5kVGlsZS55KSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoZWNrTGlzdCA9IHRoaXMuX21hcC5nZXRDaGVja0xpc3QoKTsgICAvL+ajgOafpeWIl+ihqFxyXG4gICAgICAgICAgICBsZXQgb3Blbkxpc3QgPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5b6F5Yik5pat5YiX6KGoXHJcbiAgICAgICAgICAgIGxldCBjbG9zZUxpc3QgPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgLy/lhbPpl63liJfooahcclxuXHJcbiAgICAgICAgICAgIGxldCBlbmRJdGVtID0gdGhpcy5nZXRFbmRJdGVtKHN0YXJUaWxlLGVuZFRpbGUsY2hlY2tMaXN0LG9wZW5MaXN0LGNsb3NlTGlzdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZW5kSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhbGtQYXRocyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoZW5kSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Fsa1BhdGhzLnVuc2hpZnQoZW5kSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kSXRlbSA9IGVuZEl0ZW0uZmF0aGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YWxrUGF0aHMgPSB3YWxrUGF0aHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hlY2tMaXN0ID0ge307XHJcbiAgICAgICAgICAgIG9wZW5MaXN0ID0gY2xvc2VMaXN0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZEl0ZW0oc3RhclRpbGUsZW5kVGlsZSxjaGVja0xpc3Qsb3Blbkxpc3QsY2xvc2VMaXN0KXtcclxuICAgICAgICBsZXQgc3Rhckl0ZW0gPSB0aGlzLmdldENoZWNrSXRlbShzdGFyVGlsZS54LCBzdGFyVGlsZS55LCBjaGVja0xpc3QpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9MaXN0KHN0YXJJdGVtLG9wZW5MaXN0KTtcclxuXHJcbiAgICAgICAgd2hpbGUob3Blbkxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBjaGVja0l0ZW0gPSBvcGVuTGlzdC5zaGlmdCgpOyAgICAgLy/ov5Tlm57nrKzkuIDkuKrlgLwo56ys5LiA5Liq5YC86IKv5a6a5pyA5bCPKVxyXG4gICAgICAgICAgICB0aGlzLmFkZFRvTGlzdChjaGVja0l0ZW0sY2xvc2VMaXN0KTsgIC8v5Yqg5YWl5YWz6Zet5YiX6KGoXHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhjaGVja0l0ZW0ueCwgY2hlY2tJdGVtLnkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY2hlY2tJdGVt5omA5Zyo5L2N572uL+ebruagh+S9jee9ruWwj+S6juaUu+WHu+WNiuW+hCDkuJQg5LuW5Lus5LmL5YmN5rKh5pyJ6Zqc56KN54mpLOivtOaYjuW3sue7j+aJvuWIsOS6huacgOe7iOeahOS9jee9rlxyXG4gICAgICAgICAgICBpZiAoZW5kVGlsZS54ID09IGNoZWNrSXRlbS54ICYmIGVuZFRpbGUueSA9PSBjaGVja0l0ZW0ueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrSXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy/miorlkajlm7TnmoTliqDov5vmnaVcclxuICAgICAgICAgICAgICAgIGxldCBuZXdJdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IC0xOyB4IDw9IDE7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gY2hlY2tJdGVtLngreDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSBjaGVja0l0ZW0ueSt5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SXRlbXMucHVzaCh7eDpuZXd4LHk6bmV3eX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpuZXdJdGVtcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3SXRlbXMuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1zLnB1c2goaXRlbVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXd4ID0gbmV3SXRlbXNbaV0ueDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eSA9IG5ld0l0ZW1zW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSB0aGlzLmdldENoZWNrSXRlbShuZXd4LCBuZXd5LCBjaGVja0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXNzYWJsZUl0ZW0gPSBjaGVja0l0ZW0ucGFzc2FibGVbbmV3eCArIFwiX1wiICsgbmV3eV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXNzYWJsZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5ld0l0ZW0uRyA9ICgoeD09MHx8eT09MCkgPyAxMCA6IDE0KSArIGNoZWNrSXRlbS5HO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3SXRlbS5IID0gTWF0aC5zcXJ0KChlbmRUaWxlLngtbmV3SXRlbS54KSooZW5kVGlsZS54LW5ld0l0ZW0ueCkqMTAwICsgKGVuZFRpbGUueS1uZXdJdGVtLnkpKihlbmRUaWxlLnktbmV3SXRlbS55KSoxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5mYXRoZXIgPSBjaGVja0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRvTGlzdChuZXdJdGVtLG9wZW5MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydE9wZW5MaXN0KG9wZW5MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXN0W25ld0l0ZW0ueCxuZXdJdGVtLnldID0gbmV3SXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wZW5MaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJubyBmaW5kIHBhdGggLHJldHVybiBcIixjaGVja0l0ZW0ueCxjaGVja0l0ZW0ueSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hlY2tJdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WcqOWIl+ihqOS4reaLv+WHuuaMh+Wumml0ZW1cclxuICAgIGdldENoZWNrSXRlbSAoeCx5LGxpc3QpIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGxpc3RbeCArIFwiX1wiICsgeV07XHJcbiAgICAgICAgZGVsZXRlIGxpc3RbeCArIFwiX1wiICsgeV07XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Zyo5YiX6KGo5Lit5ou/5Ye65oyH5a6aaXRlbVxyXG4gICAgZ2V0SXRlbSAoeCx5LGxpc3QpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS54ID09IHggJiYgaXRlbS55ID09IHkpIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WvuU9wZW7liJfooajmjpLluo8sRytI5pyA5bCP55qE5ouN5Zyo5YmN6Z2iXHJcbiAgICBzb3J0T3Blbkxpc3QobGlzdCl7XHJcbiAgICAgICAgZnVuY3Rpb24gc29ydE51bWJlcihhLCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChhLkcrYS5IKSAtIChiLkcrYi5IKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdC5zb3J0KHNvcnROdW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOa3u+WKoGl0ZW3liLDliJfooahcclxuICAgIGFkZFRvTGlzdChpdGVtLGxpc3Qpe1xyXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8gQSogLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcC5fcGF1c2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVMb3dIcFZpc3VhbChkdCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTW92ZUFjdGlvblNwZWVkKCk7XHJcbiAgICAgICAgdGhpcy5fY29kZVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3RhcmdldCkpIHtcclxuICAgICAgICAgICAgbGV0IGZyb21Qb3MgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zID0gY2MudjIodGhpcy5fdGFyZ2V0LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IHRhcmdldFBvcy5zdWIoZnJvbVBvcykubWFnKClcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3dhbGtQYXRocy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2lsbFBvcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy/mo4DmtYvmmK/lkKbpgYfliLDnm67moIdcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuIDw9IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgJiYgdGhpcy5fbWFwLmlzSGF2ZU90aGVyRW5lbXkodGhpcy5ub2RlKSA9PSBmYWxzZSAmJiB0aGlzLl9tYXAubGluZUxpbmVQYXNzQ29sbGlkZXJzKGZyb21Qb3MsdGFyZ2V0UG9zKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mBh+WIsOebruaghyzlgZzkuIss5riF56m66L+Y5rKh5pyJ6LWw55qE6Lev5b6EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q29kZVRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vdmVBY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWxrUGF0aHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/msqHmnInpgYfliLDnm67moIcs57un57ut5YmN6L+bXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3YWxrSXRlbSA9IHRoaXMuX3dhbGtQYXRoc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lsbFBvcyA9IHRoaXMuX21hcC50aWxlVG9HYW1lUG9zKGNjLnYyKHdhbGtJdGVtLngsIHdhbGtJdGVtLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aWxsUG9zLmVxdWFscyhmcm9tUG9zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2Fsa1BhdGhzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWxsUG9zID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlyID0gdGhpcy5fd2lsbFBvcy5zdWIoZnJvbVBvcykubm9ybWFsaXplKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lID0gdGhpcy5fd2lsbFBvcy5zdWIoZnJvbVBvcykubWFnKCkvdGhpcy5fY29uZmlnLlNwZWVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVTZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0aW1lLzYwLHRoaXMuX3dpbGxQb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIui1sOWujOS6huS4gOiKgiBcIix3YWxrSXRlbS54LHdhbGtJdGVtLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl93YWxrUGF0aHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fd2lsbFBvcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX21vdmVBY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9tb3ZlU3BlZWRGYWN0b3IgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW92ZVNwZWVkRmFjdG9yID0gdGhpcy5fZ2V0VGVycmFpblNwZWVkRmFjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlQWN0aW9uID0gY2Muc3BlZWQobW92ZVNlcXVlbmNlLCB0aGlzLl9tb3ZlU3BlZWRGYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbih0aGlzLl9tb3ZlQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29kZVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q29kZVRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+ajgOa1i+aYr+WQpumBh+WIsOebruagh1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAmJiB0aGlzLl9tYXAubGluZUxpbmVQYXNzQ29sbGlkZXJzKGZyb21Qb3MsdGFyZ2V0UG9zKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mBh+WIsOebruaghyzku4DkuYjpg73kuI3lgZos5YGc5Zyo5Y6f5ZywXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2RpciA9IHRhcmdldFBvcy5zdWIoZnJvbVBvcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5rKh5pyJ6YGH5Yiw55uu5qCHLOmHjeaWsOWvu+i3r1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFBhdGgoX3N0YXJ0VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLl93YWxrUGF0aHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX2RpciA9IHRhcmdldFBvcy5zdWIoZnJvbVBvcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvc3QgPSBfZW5kVGltZSAtIF9zdGFydFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIitjb3N0ZSB0aW1lIFwiLGNvc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/orqHnrpfngq7nrqHmlrnlkJFcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RhbmtUeXBlID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyh0aGlzLl9iYXJyZWxEaXIsMC4yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGFyZ2V0UG9zLnN1Yihmcm9tUG9zKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rpci54ID09IDAgJiYgdGhpcy5fZGlyLnkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGE9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEFuZ2xlKCk7XHJcblxyXG4gICAgICAgICAgICAvL+WwhOWHu1xyXG4gICAgICAgICAgICBpZiAobGVuIDw9IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RpbmcoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcclxuICAgIH0gIFxyXG5cclxuICAgIF9nZXRUZXJyYWluU3BlZWRGYWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5nZXRUZXJyYWluU3BlZWRGYWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuZ2V0VGVycmFpblNwZWVkRmFjdG9yKHRoaXMubm9kZS5wb3NpdGlvbiwgdGhpcy5fcmFkaXVzKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTW92ZUFjdGlvblNwZWVkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbW92ZUFjdGlvbiB8fCAhdGhpcy5fbW92ZUFjdGlvbi5zZXRTcGVlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXh0RmFjdG9yID0gdGhpcy5fZ2V0VGVycmFpblNwZWVkRmFjdG9yKCk7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKG5leHRGYWN0b3IgLSB0aGlzLl9tb3ZlU3BlZWRGYWN0b3IpIDwgMC4wMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21vdmVTcGVlZEZhY3RvciA9IG5leHRGYWN0b3I7XHJcbiAgICAgICAgdGhpcy5fbW92ZUFjdGlvbi5zZXRTcGVlZChuZXh0RmFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhOWHu1xyXG4gICAgc2hvb3RpbmcoZHQpe1xyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA+PSB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/liJvlu7rlrZDlvLlcclxuICAgICAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KHRoaXMuX2NvbmZpZy5CVHlwZTEsdGhpcy5ub2RlLnBvc2l0aW9uLHRoaXMuX2JhcnJlbERpcix0aGlzLl9maXJlLl9seUJhcnJlbC5oZWlnaHQsdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyx0aGlzLl9hdGssdGhpcy5fY2FtcCx0aGlzLm5vZGUucGFyZW50LHRoaXMuX21hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6KKr5pS75Ye75YiwXHJcbiAgICBiZUhpdChkYW1hZ2UsIGRhbWFnZVR5cGUgPSBcIm5vcm1hbFwiKXtcclxuICAgICAgICBsZXQgZmluYWxEYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XHJcbiAgICAgICAgaWYgKGZpbmFsRGFtYWdlIDwgMCkge1xyXG4gICAgICAgICAgICBmaW5hbERhbWFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2hvd0RhbWFnZSA9IGZpbmFsRGFtYWdlO1xyXG4gICAgICAgIGlmIChzaG93RGFtYWdlID4gdGhpcy5faHApIHtcclxuICAgICAgICAgICAgc2hvd0RhbWFnZSA9IHRoaXMuX2hwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faHAgLT0gZmluYWxEYW1hZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dFbmVteUhpdEVmZmVjdCgpO1xyXG4gICAgICAgIGlmIChzaG93RGFtYWdlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93RGFtYWdlRmxvYXQoc2hvd0RhbWFnZSwgZGFtYWdlVHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dFbmVteUhpdEVmZmVjdCgpIHtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfZW5lbXlIaXRFZmZlY3RcIik7XHJcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDMwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZWZmZWN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgODAsIDYwLCAyMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxNik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA2MCwgNDAsIDU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgZWZmZWN0LnNjYWxlID0gMC42NTtcclxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS4yNSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xOCwgNjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dEYW1hZ2VGbG9hdChkYW1hZ2UsIGRhbWFnZVR5cGUpe1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5faHBMYWIgfHwgIXRoaXMuX2ZpcmUuX2hwTGFiLiRMYWJlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaHBMYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLl9maXJlLl9ocExhYik7XHJcbiAgICAgICAgaHBMYWIucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGhwTGFiLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaHBMYWIub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgaHBMYWIuc2NhbGUgPSAwLjQ7XHJcbiAgICAgICAgaHBMYWIuYW5nbGUgPSAwO1xyXG4gICAgICAgIGhwTGFiLnBvc2l0aW9uID0gdGhpcy5fZmlyZS5faHBMYWIucG9zaXRpb24uYWRkKGNjLnYzKChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI0LCAwLCAwKSk7XHJcbiAgICAgICAgaHBMYWIuekluZGV4ID0gMjAwO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBocExhYi4kTGFiZWwgfHwgaHBMYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgZGFtYWdlVGV4dCA9IHRoaXMuX2Zvcm1hdERhbWFnZVRleHQoZGFtYWdlKTtcclxuICAgICAgICBsZXQgaXNDcml0ID0gZGFtYWdlVHlwZSA9PSBcImNyaXRcIjtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBpc0NyaXQgPyBcIvCflKXmmrTlh7stXCIgKyBkYW1hZ2VUZXh0IDogXCItXCIgKyBkYW1hZ2VUZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gaXNDcml0ID8gNTQgOiA0MDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gaXNDcml0ID8gNTggOiA0MDtcclxuICAgICAgICBocExhYi5jb2xvciA9IGlzQ3JpdCA/IGNjLmNvbG9yKDI1NSwgMjEwLCA2MCkgOiBjYy5jb2xvcigyNTUsIDgwLCA4MCk7XHJcblxyXG4gICAgICAgIGhwTGFiLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oREFNQUdFX0ZMT0FUX0ZBREVfSU5fVElNRSwgMjU1KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKERBTUFHRV9GTE9BVF9GQURFX0lOX1RJTUUsIGlzQ3JpdCA/IDEuMjUgOiAxKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoREFNQUdFX0ZMT0FUX0ZBREVfSU5fVElNRSwgY2MudjIoMCwgMTgpKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShEQU1BR0VfRkxPQVRfSE9MRF9USU1FKSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhEQU1BR0VfRkxPQVRfRkFERV9PVVRfVElNRSwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhEQU1BR0VfRkxPQVRfRkFERV9PVVRfVElNRSwgMC42NSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KERBTUFHRV9GTE9BVF9GQURFX09VVF9USU1FLCBjYy52MigwLCAxMikpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBocExhYi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBfZm9ybWF0RGFtYWdlVGV4dChkYW1hZ2Upe1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgucm91bmQoZGFtYWdlICogMTApIC8gMTA7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZhbHVlIC0gTWF0aC5yb3VuZCh2YWx1ZSkpIDwgMC4wMDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBNYXRoLnJvdW5kKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/miafooYzmrbvkuqFcclxuICAgIGRvRGVhdGgoKXtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5pc0tpbGxFZmZlY3RUZXN0TW9kZSAmJiB0aGlzLl9tYXAuaXNLaWxsRWZmZWN0VGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuaGFuZGxlS2lsbEVmZmVjdFRlc3RFbmVteURlYXRoKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuaXNLaWxsQnJvYWRjYXN0VGVzdE1vZGUgJiYgdGhpcy5fbWFwLmlzS2lsbEJyb2FkY2FzdFRlc3RNb2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmhhbmRsZUtpbGxCcm9hZGNhc3RUZXN0RW5lbXlEZWF0aCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlci5kb0RlYXRoKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6dGhpcy5fY29uZmlnLkNvaW4scG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLm5vZGUpfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZUVuZW15KHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTsgXHJcbiAgICB9XHJcbn1cclxuIl19