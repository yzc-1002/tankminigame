
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxFbmVteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTZCO0FBQzdCLHNDQUFtQztBQUNuQyxxQ0FBaUM7QUFFM0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkIseUJBQUk7SUFBL0I7UUFFSSxNQUFNO1FBQ04sY0FBYztRQUNkLHlCQUF5QjtRQUo3QixxRUFzU0M7UUFoU0csTUFBTTtRQUNOLHFCQUFlLEdBQUcsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUNwQyxhQUFPLEdBQVcsSUFBSSxDQUFDLENBQUssTUFBTTtRQUVsQyxLQUFLO1FBQ0wsZ0JBQVUsR0FBUSxFQUFFLENBQUMsQ0FBTyxNQUFNO1FBQ2xDLGNBQVEsR0FBVSxJQUFJLENBQUMsQ0FBSyxFQUFFO1FBQzlCLGVBQVMsR0FBUyxHQUFHLENBQUMsQ0FBTSxNQUFNOztJQXlSdEMsQ0FBQztJQXZSRyxzQkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRWQsT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTztJQUNQLDZCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFFLElBQUk7SUFDL0IsQ0FBQztJQUVELE9BQU87SUFDUCx1QkFBTyxHQUFQO0lBQ0EsQ0FBQztJQUVELFFBQVE7SUFDUiw0QkFBWSxHQUFaLFVBQWEsUUFBUSxFQUFDLE9BQU87UUFDekIsaUJBQU0sV0FBVyxZQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLFdBQVc7UUFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxD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ZSxJQUFJLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFFekIsTUFBTTtZQUNOLGdCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkw7SUFDTCxDQUFDO0lBRUQsTUFBTTtJQUNOLHVCQUFPLEdBQVA7UUFDSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUVoQixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFyU1EsS0FBSztRQURqQixPQUFPO09BQ0ssS0FBSyxDQXNTakI7SUFBRCxZQUFDO0NBdFNELEFBc1NDLENBdFMwQixZQUFJLEdBc1M5QjtBQXRTWSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFua30gZnJvbSBcIi4vVGFua0VcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0J1bGxldH0gZnJvbSBcIi4vQnVsbGV0RVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgRW5lbXkgZXh0ZW5kcyBUYW5rIHtcclxuXHJcbiAgICAvL+aVjOS6uuexu+Wei1xyXG4gICAgLy8gQHByb3BlcnR5KClcclxuICAgIC8vIGVuZW15VHlwZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvL+WGhemDqOWPmOmHj1xyXG4gICAgX2J1bGxldENvZGVUaW1lID0gMTsgICAgICAgIC8v5bCE5Ye75Ya35Y205pe26Ze0XHJcbiAgICBfdGFyZ2V0ICAgICAgICAgPSBudWxsOyAgICAgLy/mlLvlh7vnm67moIdcclxuXHJcbiAgICAvLyBBKlxyXG4gICAgX3dhbGtQYXRocyAgICAgID0gW107ICAgICAgIC8v6KGM6LWw5YiX6KGoXHJcbiAgICBfd2lsbFBvcyAgICAgICAgPSBudWxsOyAgICAgLy9cclxuICAgIF9jb2RlVGltZSAgICAgICA9IDAuNTsgICAgICAvL+WGt+WNtOaXtumXtFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZVSVxyXG4gICAgICAgIHRoaXMuX2luaXRVSSgpXHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwiZW5lbXlcIjsgIC8v6Zi16JClXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpe1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5pWM5Lq657G75Z6LXHJcbiAgICBzZXRFbmVteVR5cGUodGFua1R5cGUsbGV2bGVJZCkge1xyXG4gICAgICAgIHN1cGVyLnNldFRhbmtUeXBlKHRhbmtUeXBlKTtcclxuXHJcbiAgICAgICAgLy/orqHnrpfmlYzkurrooYDph48g5pS75Ye7XHJcbiAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9tYXhIcCA9IHRoaXMuX2NvbmZpZy5IUCoobGV2bGVJZCsxKTtcclxuICAgICAgICB0aGlzLl9hdGsgPSB0aGlzLl9jb25maWcuQVRLKihsZXZsZUlkKzEpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u55uu5qCHXHJcbiAgICBzZXRUYXJnZXQgKHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcclxuICAgIH0gIFxyXG5cclxuICAgIC8v6K6+572u5Ya35Y205pe26Ze0XHJcbiAgICBfcmVzZXRDb2RlVGltZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fY29kZVRpbWUgPSBNYXRoLnJhbmRvbSgpKjAuNSArIDAuMztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEEqIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgZmluZFBhdGggKF9zdGFydFRpbWUpIHtcclxuICAgICAgICB0aGlzLl93YWxrUGF0aHMgPSBbXTtcclxuICAgICAgICAvLyB0aGlzLl9tYXAucmVzZXRNYXAoKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBzdGFyVGlsZSA9IHRoaXMuX21hcC5nYW1lUG9zVG9UaWxlKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGVuZFRpbGUgPSB0aGlzLl9tYXAuZ2FtZVBvc1RvVGlsZSh0aGlzLl90YXJnZXQucG9zaXRpb24pO1xyXG4gICAgICAgIGVuZFRpbGUgPSB0aGlzLl9tYXAuZ2V0UGFzc2FibGVUaWxlRXgoZW5kVGlsZSk7XHJcblxyXG4gICAgICAgIGlmIChzdGFyVGlsZSAmJiBlbmRUaWxlICYmIChzdGFyVGlsZS54ICE9IGVuZFRpbGUueCB8fCBzdGFyVGlsZS55ICE9IGVuZFRpbGUueSkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja0xpc3QgPSB0aGlzLl9tYXAuZ2V0Q2hlY2tMaXN0KCk7ICAgLy/mo4Dmn6XliJfooahcclxuICAgICAgICAgICAgbGV0IG9wZW5MaXN0ID0gW107ICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W+heWIpOaWreWIl+ihqFxyXG4gICAgICAgICAgICBsZXQgY2xvc2VMaXN0ID0gW107ICAgICAgICAgICAgICAgICAgICAgICAgIC8v5YWz6Zet5YiX6KGoXHJcblxyXG4gICAgICAgICAgICBsZXQgZW5kSXRlbSA9IHRoaXMuZ2V0RW5kSXRlbShzdGFyVGlsZSxlbmRUaWxlLGNoZWNrTGlzdCxvcGVuTGlzdCxjbG9zZUxpc3QpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGVuZEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCB3YWxrUGF0aHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHdoaWxlKGVuZEl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGtQYXRocy51bnNoaWZ0KGVuZEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZEl0ZW0gPSBlbmRJdGVtLmZhdGhlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Fsa1BhdGhzID0gd2Fsa1BhdGhzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoZWNrTGlzdCA9IHt9O1xyXG4gICAgICAgICAgICBvcGVuTGlzdCA9IGNsb3NlTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbmRJdGVtKHN0YXJUaWxlLGVuZFRpbGUsY2hlY2tMaXN0LG9wZW5MaXN0LGNsb3NlTGlzdCl7XHJcbiAgICAgICAgbGV0IHN0YXJJdGVtID0gdGhpcy5nZXRDaGVja0l0ZW0oc3RhclRpbGUueCwgc3RhclRpbGUueSwgY2hlY2tMaXN0KTtcclxuICAgICAgICB0aGlzLmFkZFRvTGlzdChzdGFySXRlbSxvcGVuTGlzdCk7XHJcblxyXG4gICAgICAgIHdoaWxlKG9wZW5MaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tJdGVtID0gb3Blbkxpc3Quc2hpZnQoKTsgICAgIC8v6L+U5Zue56ys5LiA5Liq5YC8KOesrOS4gOS4quWAvOiCr+WumuacgOWwjylcclxuICAgICAgICAgICAgdGhpcy5hZGRUb0xpc3QoY2hlY2tJdGVtLGNsb3NlTGlzdCk7ICAvL+WKoOWFpeWFs+mXreWIl+ihqFxyXG4gICAgICAgICAgICAvLyBjYy5sb2coY2hlY2tJdGVtLngsIGNoZWNrSXRlbS55KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNoZWNrSXRlbeaJgOWcqOS9jee9ri/nm67moIfkvY3nva7lsI/kuo7mlLvlh7vljYrlvoQg5LiUIOS7luS7rOS5i+WJjeayoeaciemanOeijeeJqSzor7TmmI7lt7Lnu4/mib7liLDkuobmnIDnu4jnmoTkvY3nva5cclxuICAgICAgICAgICAgaWYgKGVuZFRpbGUueCA9PSBjaGVja0l0ZW0ueCAmJiBlbmRUaWxlLnkgPT0gY2hlY2tJdGVtLnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGVja0l0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5oqK5ZGo5Zu055qE5Yqg6L+b5p2lXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMTsgeSA8PSAxOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eCA9IGNoZWNrSXRlbS54K3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXd5ID0gY2hlY2tJdGVtLnkreTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggIT0gMCB8fCB5ICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1zLnB1c2goe3g6bmV3eCx5Om5ld3l9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbmV3SXRlbXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ld0l0ZW1zLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtcy5wdXNoKGl0ZW1bMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3eCA9IG5ld0l0ZW1zW2ldLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3kgPSBuZXdJdGVtc1tpXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdJdGVtID0gdGhpcy5nZXRDaGVja0l0ZW0obmV3eCwgbmV3eSwgY2hlY2tMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFzc2FibGVJdGVtID0gY2hlY2tJdGVtLnBhc3NhYmxlW25ld3ggKyBcIl9cIiArIG5ld3ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2FibGVJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdJdGVtLkcgPSAoKHg9PTB8fHk9PTApID8gMTAgOiAxNCkgKyBjaGVja0l0ZW0uRztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5ld0l0ZW0uSCA9IE1hdGguc3FydCgoZW5kVGlsZS54LW5ld0l0ZW0ueCkqKGVuZFRpbGUueC1uZXdJdGVtLngpKjEwMCArIChlbmRUaWxlLnktbmV3SXRlbS55KSooZW5kVGlsZS55LW5ld0l0ZW0ueSkqMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0uZmF0aGVyID0gY2hlY2tJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUb0xpc3QobmV3SXRlbSxvcGVuTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRPcGVuTGlzdChvcGVuTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGlzdFtuZXdJdGVtLngsbmV3SXRlbS55XSA9IG5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcGVuTGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwibm8gZmluZCBwYXRoICxyZXR1cm4gXCIsY2hlY2tJdGVtLngsY2hlY2tJdGVtLnkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrSXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnKjliJfooajkuK3mi7/lh7rmjIflrpppdGVtXHJcbiAgICBnZXRDaGVja0l0ZW0gKHgseSxsaXN0KSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBsaXN0W3ggKyBcIl9cIiArIHldO1xyXG4gICAgICAgIGRlbGV0ZSBsaXN0W3ggKyBcIl9cIiArIHldO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WcqOWIl+ihqOS4reaLv+WHuuaMh+Wumml0ZW1cclxuICAgIGdldEl0ZW0gKHgseSxsaXN0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ueCA9PSB4ICYmIGl0ZW0ueSA9PSB5KSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lr7lPcGVu5YiX6KGo5o6S5bqPLEcrSOacgOWwj+eahOaLjeWcqOWJjemdolxyXG4gICAgc29ydE9wZW5MaXN0KGxpc3Qpe1xyXG4gICAgICAgIGZ1bmN0aW9uIHNvcnROdW1iZXIoYSwgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYS5HK2EuSCkgLSAoYi5HK2IuSCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpc3Quc29ydChzb3J0TnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmt7vliqBpdGVt5Yiw5YiX6KGoXHJcbiAgICBhZGRUb0xpc3QoaXRlbSxsaXN0KXtcclxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEEqIC8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAuX3BhdXNlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2NvZGVUaW1lIC09IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl90YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIGxldCBmcm9tUG9zID0gY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldFBvcyA9IGNjLnYyKHRoaXMuX3RhcmdldC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSB0YXJnZXRQb3Muc3ViKGZyb21Qb3MpLm1hZygpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl93YWxrUGF0aHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpbGxQb3MgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5qOA5rWL5piv5ZCm6YGH5Yiw55uu5qCHXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8PSB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICYmIHRoaXMuX21hcC5pc0hhdmVPdGhlckVuZW15KHRoaXMubm9kZSkgPT0gZmFsc2UgJiYgdGhpcy5fbWFwLmxpbmVMaW5lUGFzc0NvbGxpZGVycyhmcm9tUG9zLHRhcmdldFBvcykgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/pgYfliLDnm67moIcs5YGc5LiLLOa4heepuui/mOayoeaciei1sOeahOi3r+W+hFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldENvZGVUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWxrUGF0aHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/msqHmnInpgYfliLDnm67moIcs57un57ut5YmN6L+bXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3YWxrSXRlbSA9IHRoaXMuX3dhbGtQYXRoc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lsbFBvcyA9IHRoaXMuX21hcC50aWxlVG9HYW1lUG9zKGNjLnYyKHdhbGtJdGVtLngsIHdhbGtJdGVtLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aWxsUG9zLmVxdWFscyhmcm9tUG9zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2Fsa1BhdGhzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWxsUG9zID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlyID0gdGhpcy5fd2lsbFBvcy5zdWIoZnJvbVBvcykubm9ybWFsaXplKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lID0gdGhpcy5fd2lsbFBvcy5zdWIoZnJvbVBvcykubWFnKCkvdGhpcy5fY29uZmlnLlNwZWVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8odGltZS82MCx0aGlzLl93aWxsUG9zKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCLotbDlrozkuobkuIDoioIgXCIsd2Fsa0l0ZW0ueCx3YWxrSXRlbS55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fd2Fsa1BhdGhzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3dpbGxQb3MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29kZVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q29kZVRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+ajgOa1i+aYr+WQpumBh+WIsOebruagh1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAmJiB0aGlzLl9tYXAubGluZUxpbmVQYXNzQ29sbGlkZXJzKGZyb21Qb3MsdGFyZ2V0UG9zKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mBh+WIsOebruaghyzku4DkuYjpg73kuI3lgZos5YGc5Zyo5Y6f5ZywXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2RpciA9IHRhcmdldFBvcy5zdWIoZnJvbVBvcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5rKh5pyJ6YGH5Yiw55uu5qCHLOmHjeaWsOWvu+i3r1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX3N0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFBhdGgoX3N0YXJ0VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLl93YWxrUGF0aHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX2RpciA9IHRhcmdldFBvcy5zdWIoZnJvbVBvcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9lbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvc3QgPSBfZW5kVGltZSAtIF9zdGFydFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIitjb3N0ZSB0aW1lIFwiLGNvc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/orqHnrpfngq7nrqHmlrnlkJFcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RhbmtUeXBlID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyh0aGlzLl9iYXJyZWxEaXIsMC4yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGFyZ2V0UG9zLnN1Yihmcm9tUG9zKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rpci54ID09IDAgJiYgdGhpcy5fZGlyLnkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGE9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEFuZ2xlKCk7XHJcblxyXG4gICAgICAgICAgICAvL+WwhOWHu1xyXG4gICAgICAgICAgICBpZiAobGVuIDw9IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RpbmcoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcclxuICAgIH0gIFxyXG5cclxuICAgIC8v5bCE5Ye7XHJcbiAgICBzaG9vdGluZyhkdCl7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldENvZGVUaW1lID49IHRoaXMuX2NvbmZpZy5CdWxsZXRDb2RlVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+WIm+W7uuWtkOW8uVxyXG4gICAgICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgodGhpcy5fY29uZmlnLkJUeXBlMSx0aGlzLm5vZGUucG9zaXRpb24sdGhpcy5fYmFycmVsRGlyLHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCx0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzLHRoaXMuX2F0ayx0aGlzLl9jYW1wLHRoaXMubm9kZS5wYXJlbnQsdGhpcy5fbWFwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/miafooYzmrbvkuqFcclxuICAgIGRvRGVhdGgoKXtcclxuICAgICAgICBzdXBlci5kb0RlYXRoKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6dGhpcy5fY29uZmlnLkNvaW4scG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLm5vZGUpfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZUVuZW15KHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTsgXHJcbiAgICB9XHJcbn1cclxuIl19