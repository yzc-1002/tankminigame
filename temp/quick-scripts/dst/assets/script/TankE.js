
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/TankE.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d4625LDClId779nLg+yGmj', 'TankE');
// script/TankE.ts

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
exports.Tank = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var MusicManager_1 = require("./base/MusicManager");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tank = /** @class */ (function (_super) {
    __extends(Tank, _super);
    function Tank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.boomPrefab = null;
        //移动,碰撞检测
        _this._camp = ""; //阵营
        _this._radius = 10; //碰撞检测半径
        _this._dir = cc.v2(1, 0); //当前行进方向
        _this._barrelDir = cc.v2(1, 0); //炮管方向
        _this._ratio = 0; //当前速率
        _this._map = null; //tile map 节点
        _this._hp = 0; //当前血量
        _this._maxHp = 0; //最大血量血量
        _this._atk = 0; //攻击力
        _this._def = 0; //防御
        _this._config = {};
        _this._tankType = 1; //坦克类型
        _this._currentBg = null;
        return _this;
    }
    Tank.prototype.onLoad = function () {
        this._radius = this.node["$CircleCollider"].radius;
        this._dir = Utils_1.Utils.degressToVectors(this._fire._lyBg.angle);
        this._barrelDir = this._dir;
    };
    //设置tiled map
    Tank.prototype.setMap = function (map) {
        this._map = map;
    };
    //设置坦克类型
    Tank.prototype.setTankType = function (tankType) {
        var _this = this;
        this._tankType = tankType;
        this._config = yyp.config.Tank[this._tankType];
        console.log("this._config", this._config);
        //炮身
        this._fire._lyBg.children.forEach(function (child) {
            if (child.name != "_sprBg" + _this._tankType) {
                child.active = false;
            }
            else {
                child.active = true;
            }
        });
        //炮筒
        this._fire._lyBarrel.children.forEach(function (child) {
            if (child.name != "_sprBarrel" + _this._tankType) {
                child.active = false;
            }
            else {
                child.active = true;
                _this._currentBg = child;
            }
        });
    };
    //获取碰撞检测半径
    Tank.prototype.getRadius = function () {
        return this._radius;
    };
    //获取玩家的新位置
    Tank.prototype._getWillPosition = function (currPosition, dir, ratio) {
        var dis = dir.mul(ratio * this._config.Speed);
        return currPosition.add(dis);
    };
    // 获取碰撞后的尝试方向
    Tank.prototype._getTestDir = function (P, radius, dir, colliderItems) {
        var testDirs = [];
        //获取尝试方向
        if (this._camp == "enemy") {
            for (var i = 1; i < 6; i++) {
                var testDir = Utils_1.Utils.vectorsRotateDegress(dir, 30 * i);
                testDirs.push(testDir);
            }
            for (var i = 1; i < 7; i++) {
                var testDir = Utils_1.Utils.vectorsRotateDegress(dir, -30 * i);
                testDirs.push(testDir);
            }
        }
        else {
            //按最优获取
            for (var i = 0; i < colliderItems.length; i++) {
                var colliderItem = colliderItems[i];
                this._getTestDirs(P, dir, colliderItem, testDirs);
            }
        }
        //检测尝试方向
        for (var i = 0; i < testDirs.length; i++) {
            var testDir = testDirs[i];
            if (this._circlePassColliderItems(P, radius, testDir, colliderItems) == false) {
                return testDir;
            }
        }
        return null;
    };
    //点p为圆心,radius为半径,方向dir的圆,是否会经过colliderItems中的一条线段
    Tank.prototype._circlePassColliderItems = function (P, radius, dir, colliderItems) {
        for (var i = 0; i < colliderItems.length; i++) {
            var colliderItem = colliderItems[i];
            var A = colliderItem.collider.offset.add(colliderItem.collider.points[0]);
            var B = colliderItem.collider.offset.add(colliderItem.collider.points[1]);
            if (Utils_1.Utils.circlePassLine(P, radius, dir, A, B)) {
                return true;
            }
        }
        return false;
    };
    //射线起始点P,方向dir,与线段AB(colliderItem组成)碰撞后的尝试方向列表
    Tank.prototype._getTestDirs = function (P, dir, colliderItem, retDirs) {
        var P1 = colliderItem.point; //collider上距离P最近的点
        var dirPP1 = P1.sub(P).normalize();
        var radianPP1 = cc.v2(dirPP1).signAngle(dir); // 求方向向量与对比向量间的弧度
        var baseDir = dir;
        var maxDir = radianPP1 > 0 ? Utils_1.Utils.vectorsRotateDegress(baseDir, 90) : Utils_1.Utils.vectorsRotateDegress(baseDir, -90);
        var parallelDegree = this._getParallelDegree(baseDir, maxDir, colliderItem.collider);
        var symbol = radianPP1 > 0 ? 1 : -1;
        for (var i = 1; i <= 6; i++) {
            var offsetDegree = i * 15 * symbol;
            if (parallelDegree) {
                if (symbol > 0 && parallelDegree < offsetDegree) {
                    var testDir_1 = Utils_1.Utils.vectorsRotateDegress(baseDir, parallelDegree);
                    retDirs.push(testDir_1);
                    parallelDegree = null;
                }
                else if (symbol < 0 && parallelDegree > offsetDegree) {
                    var testDir_2 = Utils_1.Utils.vectorsRotateDegress(baseDir, parallelDegree);
                    retDirs.push(testDir_2);
                    parallelDegree = null;
                }
            }
            var testDir = Utils_1.Utils.vectorsRotateDegress(baseDir, offsetDegree);
            retDirs.push(testDir);
        }
    };
    //获取平行于collider,且包含在baseDegree,maxDegree的角度(相对baseDir)
    Tank.prototype._getParallelDegree = function (baseDir, maxDir, collider) {
        var A = collider.offset.add(collider.points[0]);
        var B = collider.offset.add(collider.points[1]);
        var AB = B.sub(A).normalize();
        var BA = A.sub(B).normalize();
        var radianMax = maxDir.signAngle(baseDir);
        var radianAB = AB.signAngle(baseDir);
        var radianBA = BA.signAngle(baseDir);
        if (radianMax > 0) {
            if (radianAB > 0 && radianAB < radianMax) {
                return -cc.misc.radiansToDegrees(radianAB);
            }
            if (radianBA > 0 && radianBA < radianMax) {
                return -cc.misc.radiansToDegrees(radianBA);
            }
        }
        else if (radianMax < 0) {
            if (radianAB < 0 && radianAB > radianMax) {
                return -cc.misc.radiansToDegrees(radianAB);
            }
            if (radianBA < 0 && radianBA > radianMax) {
                return -cc.misc.radiansToDegrees(radianBA);
            }
        }
        return null;
    };
    //刷新玩家角度
    Tank.prototype._refreshAngle = function () {
        //动态修改player角度
        var fromAngle = this._fire._lyBg.angle;
        var toAngle = Utils_1.Utils.vectorsToDegress(this._dir);
        var disAngle = toAngle - fromAngle;
        //使当前角度和目标角度处于同一个维度,以便算出来的偏移角度是最小的
        if (disAngle > 180) {
            fromAngle = fromAngle + 360;
            disAngle = toAngle - fromAngle;
        }
        else if (disAngle < -180) {
            fromAngle = fromAngle - 360;
            disAngle = toAngle - fromAngle;
        }
        //每帧最多只向目标角度旋转10度
        if (disAngle > 10) {
            this._fire._lyBg.angle = this._fire._lyBg.angle + 10;
        }
        else if (disAngle < -10) {
            this._fire._lyBg.angle = this._fire._lyBg.angle - 10;
        }
        else {
            this._fire._lyBg.angle = toAngle;
        }
        //修正角度在-180~180范围内
        this._fire._lyBg.angle = Utils_1.Utils.correctionAngle(this._fire._lyBg.angle);
        //调整炮管角度
        this._fire._lyBarrel.angle = Utils_1.Utils.vectorsToDegress(this._barrelDir);
    };
    //被攻击到()
    Tank.prototype.beHit = function (damage) {
        // cc.log("enemy behit");
        if (this._camp == "player") {
            var a = 1;
            // damage = 10000000000000000;
        }
        else {
            var a = 1;
        }
        //计算伤害
        damage = damage - this._def;
        if (damage < 0) {
            damage = 0;
        }
        //计算最新血量
        this._hp -= damage;
        if (this._hp < 0) {
            this._hp = 0;
        }
        //计算血量条显示百分百
        this.refreshHp();
        //血量等于0,进入死亡逻辑
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    //计算血量条显示百分百
    Tank.prototype.refreshHp = function () {
        var percent = this._hp / this._maxHp;
        this._fire._lifebar.$ProgressBar.progress = percent;
    };
    //执行死亡
    Tank.prototype.doDeath = function () {
        var boom = cc.instantiate(this.boomPrefab);
        boom.parent = this.node.parent;
        boom.position = this.node.position;
        boom.zIndex = 1000;
        var ani = boom.getComponent(cc.Animation);
        ani.play("boom2");
        MusicManager_1.MusicManager.playEffect("boom");
        Utils_1.Utils.vibrate();
    };
    __decorate([
        property(cc.Prefab)
    ], Tank.prototype, "bulletPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Tank.prototype, "boomPrefab", void 0);
    Tank = __decorate([
        ccclass
    ], Tank);
    return Tank;
}(BaseComponent_1.BaseComponent));
exports.Tank = Tank;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxUYW5rRS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDNUIsMENBQTBDO0FBQ3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBCLHdCQUFhO0lBQXZDO1FBQUEscUVBNlFDO1FBMVFHLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLFNBQVM7UUFDVCxXQUFLLEdBQVMsRUFBRSxDQUFDLENBQVcsSUFBSTtRQUNoQyxhQUFPLEdBQU8sRUFBRSxDQUFDLENBQVcsUUFBUTtRQUNwQyxVQUFJLEdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3BDLGdCQUFVLEdBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxNQUFNO1FBQ2xDLFlBQU0sR0FBUSxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ2xDLFVBQUksR0FBVSxJQUFJLENBQUMsQ0FBUyxhQUFhO1FBRXpDLFNBQUcsR0FBVyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ2xDLFlBQU0sR0FBUSxDQUFDLENBQUMsQ0FBWSxRQUFRO1FBQ3BDLFVBQUksR0FBVSxDQUFDLENBQUMsQ0FBWSxLQUFLO1FBQ2pDLFVBQUksR0FBVSxDQUFDLENBQUMsQ0FBWSxJQUFJO1FBQ2hDLGFBQU8sR0FBTyxFQUFFLENBQUM7UUFFakIsZUFBUyxHQUFLLENBQUMsQ0FBQyxDQUFZLE1BQU07UUFDbEMsZ0JBQVUsR0FBSSxJQUFJLENBQUM7O0lBc1B2QixD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RUQsTUFBTTtJQUNOLHNCQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQiwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxhQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQXpRRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ1M7SUFOcEIsSUFBSTtRQURoQixPQUFPO09BQ0ssSUFBSSxDQTZRaEI7SUFBRCxXQUFDO0NBN1FELEFBNlFDLENBN1F5Qiw2QkFBYSxHQTZRdEM7QUE3UVksb0JBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XHJcbi8v55S15a2Q6YKu5Lu2cHVoYWxza2lqc2VtZW5AZ21haWwuY29tXHJcbi8v5rqQ56CB572R56uZIOW8gHZwbuWFqOWxgOaooeW8j+aJk+W8gCBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL1xyXG4vL+eUteaKpWh0dHBzOi8vdC5tZS9nYW1lY29kZTk5OVxyXG4vL+e9kemhteWuouacjSBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL2tlZnUuaHRtbFxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBUYW5rIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJvb21QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/np7vliqgs56Kw5pKe5qOA5rWLXHJcbiAgICBfY2FtcCAgICAgICA9IFwiXCI7ICAgICAgICAgICAvL+mYteiQpVxyXG4gICAgX3JhZGl1cyAgICAgPSAxMDsgICAgICAgICAgIC8v56Kw5pKe5qOA5rWL5Y2K5b6EXHJcbiAgICBfZGlyICAgICAgICA9IGNjLnYyKDEsMCk7ICAgLy/lvZPliY3ooYzov5vmlrnlkJFcclxuICAgIF9iYXJyZWxEaXIgID0gY2MudjIoMSwwKTsgICAvL+eCrueuoeaWueWQkVxyXG4gICAgX3JhdGlvICAgICAgPSAwOyAgICAgICAgICAgIC8v5b2T5YmN6YCf546HXHJcbiAgICBfbWFwICAgICAgICA9IG51bGw7ICAgICAgICAgLy90aWxlIG1hcCDoioLngrlcclxuXHJcbiAgICBfaHAgICAgICAgICA9IDA7ICAgICAgICAgICAgLy/lvZPliY3ooYDph49cclxuICAgIF9tYXhIcCAgICAgID0gMDsgICAgICAgICAgICAvL+acgOWkp+ihgOmHj+ihgOmHj1xyXG4gICAgX2F0ayAgICAgICAgPSAwOyAgICAgICAgICAgIC8v5pS75Ye75YqbXHJcbiAgICBfZGVmICAgICAgICA9IDA7ICAgICAgICAgICAgLy/pmLLlvqFcclxuICAgIF9jb25maWc6YW55ID0ge307XHJcblxyXG4gICAgX3RhbmtUeXBlICAgPSAxOyAgICAgICAgICAgIC8v5Z2m5YWL57G75Z6LXHJcbiAgICBfY3VycmVudEJnICA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLm5vZGVbXCIkQ2lyY2xlQ29sbGlkZXJcIl0ucmFkaXVzO1xyXG4gICAgICAgIHRoaXMuX2RpciA9IFV0aWxzLmRlZ3Jlc3NUb1ZlY3RvcnModGhpcy5fZmlyZS5fbHlCZy5hbmdsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iuvue9rnRpbGVkIG1hcFxyXG4gICAgc2V0TWFwKG1hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/orr7nva7lnablhYvnsbvlnotcclxuICAgIHNldFRhbmtUeXBlKHRhbmtUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fdGFua1R5cGUgPSB0YW5rVHlwZTtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB5eXAuY29uZmlnLlRhbmtbdGhpcy5fdGFua1R5cGVdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5fY29uZmlnXCIsdGhpcy5fY29uZmlnKVxyXG5cclxuICAgICAgICAvL+eCrui6q1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQmdcIiArIHRoaXMuX3RhbmtUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v54Ku562SXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQmFycmVsXCIgKyB0aGlzLl90YW5rVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50QmcgPSBjaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5qOA5rWL5Y2K5b6EXHJcbiAgICBnZXRSYWRpdXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueOqeWutueahOaWsOS9jee9rlxyXG4gICAgX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIGRpciwgcmF0aW8pIHtcclxuICAgICAgICBsZXQgZGlzID0gZGlyLm11bChyYXRpbyAqIHRoaXMuX2NvbmZpZy5TcGVlZCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJQb3NpdGlvbi5hZGQoZGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8g6I635Y+W56Kw5pKe5ZCO55qE5bCd6K+V5pa55ZCRXHJcbiAgICBfZ2V0VGVzdERpcihQLHJhZGl1cyxkaXIsY29sbGlkZXJJdGVtcyl7XHJcbiAgICAgICAgbGV0IHRlc3REaXJzID0gW107XHJcblxyXG4gICAgICAgIC8v6I635Y+W5bCd6K+V5pa55ZCRXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbXAgPT0gXCJlbmVteVwiKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwgMzAgKiBpKTtcclxuICAgICAgICAgICAgICAgIHRlc3REaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLCAtMzAgKiBpKTtcclxuICAgICAgICAgICAgICAgIHRlc3REaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy/mjInmnIDkvJjojrflj5ZcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xsaWRlckl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXJJdGVtID0gY29sbGlkZXJJdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldFRlc3REaXJzKFAsZGlyLGNvbGxpZGVySXRlbSx0ZXN0RGlycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5qOA5rWL5bCd6K+V5pa55ZCRXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXN0RGlycy5sZW5ndGg7IGkrKykgeyBcclxuICAgICAgICAgICAgbGV0IHRlc3REaXIgPSB0ZXN0RGlyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NpcmNsZVBhc3NDb2xsaWRlckl0ZW1zKFAscmFkaXVzLHRlc3REaXIsY29sbGlkZXJJdGVtcykgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3REaXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v54K5cOS4uuWchuW/gyxyYWRpdXPkuLrljYrlvoQs5pa55ZCRZGly55qE5ZyGLOaYr+WQpuS8mue7j+i/h2NvbGxpZGVySXRlbXPkuK3nmoTkuIDmnaHnur/mrrVcclxuICAgIF9jaXJjbGVQYXNzQ29sbGlkZXJJdGVtcyhQLHJhZGl1cyxkaXIsY29sbGlkZXJJdGVtcyl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xsaWRlckl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xsaWRlckl0ZW0gPSBjb2xsaWRlckl0ZW1zW2ldO1xyXG5cclxuICAgICAgICAgICAgbGV0IEEgPSBjb2xsaWRlckl0ZW0uY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlckl0ZW0uY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgbGV0IEIgPSBjb2xsaWRlckl0ZW0uY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlckl0ZW0uY29sbGlkZXIucG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgaWYgKFV0aWxzLmNpcmNsZVBhc3NMaW5lKFAscmFkaXVzLGRpcixBLEIpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5bCE57q/6LW35aeL54K5UCzmlrnlkJFkaXIs5LiO57q/5q61QUIoY29sbGlkZXJJdGVt57uE5oiQKeeisOaSnuWQjueahOWwneivleaWueWQkeWIl+ihqFxyXG4gICAgX2dldFRlc3REaXJzKFAsZGlyLGNvbGxpZGVySXRlbSxyZXREaXJzKXtcclxuICAgICAgICBsZXQgUDEgPSBjb2xsaWRlckl0ZW0ucG9pbnQ7ICAgIC8vY29sbGlkZXLkuIrot53nprtQ5pyA6L+R55qE54K5XHJcbiAgICAgICAgbGV0IGRpclBQMSA9IFAxLnN1YihQKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgcmFkaWFuUFAxID0gY2MudjIoZGlyUFAxKS5zaWduQW5nbGUoZGlyKTsgICAgLy8g5rGC5pa55ZCR5ZCR6YeP5LiO5a+55q+U5ZCR6YeP6Ze055qE5byn5bqmXHJcblxyXG4gICAgICAgIGxldCBiYXNlRGlyID0gZGlyO1xyXG4gICAgICAgIGxldCBtYXhEaXIgPSByYWRpYW5QUDEgPiAwID8gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoYmFzZURpciwgOTApIDogVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoYmFzZURpciwgLTkwKTtcclxuICAgICAgICBsZXQgcGFyYWxsZWxEZWdyZWUgPSB0aGlzLl9nZXRQYXJhbGxlbERlZ3JlZShiYXNlRGlyLG1heERpcixjb2xsaWRlckl0ZW0uY29sbGlkZXIpO1xyXG4gICAgICAgIGxldCBzeW1ib2wgPSByYWRpYW5QUDEgPiAwID8gMSA6IC0xO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9mZnNldERlZ3JlZSA9IGkgKiAxNSAqIHN5bWJvbDtcclxuICAgICAgICAgICAgaWYgKHBhcmFsbGVsRGVncmVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sID4gMCAmJiBwYXJhbGxlbERlZ3JlZSA8IG9mZnNldERlZ3JlZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoYmFzZURpciwgcGFyYWxsZWxEZWdyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxlbERlZ3JlZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzeW1ib2wgPCAwICYmIHBhcmFsbGVsRGVncmVlID4gb2Zmc2V0RGVncmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCBwYXJhbGxlbERlZ3JlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGVsRGVncmVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIG9mZnNldERlZ3JlZSk7XHJcbiAgICAgICAgICAgIHJldERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5bmz6KGM5LqOY29sbGlkZXIs5LiU5YyF5ZCr5ZyoYmFzZURlZ3JlZSxtYXhEZWdyZWXnmoTop5LluqYo55u45a+5YmFzZURpcilcclxuICAgIF9nZXRQYXJhbGxlbERlZ3JlZShiYXNlRGlyLG1heERpcixjb2xsaWRlcil7XHJcbiAgICAgICAgbGV0IEEgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgbGV0IEIgPSBjb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgbGV0IEFCID0gQi5zdWIoQSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IEJBID0gQS5zdWIoQikubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgIGxldCByYWRpYW5NYXggPSBtYXhEaXIuc2lnbkFuZ2xlKGJhc2VEaXIpO1xyXG4gICAgICAgIGxldCByYWRpYW5BQiA9IEFCLnNpZ25BbmdsZShiYXNlRGlyKTtcclxuICAgICAgICBsZXQgcmFkaWFuQkEgPSBCQS5zaWduQW5nbGUoYmFzZURpcik7XHJcblxyXG4gICAgICAgIGlmIChyYWRpYW5NYXggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChyYWRpYW5BQiA+IDAgJiYgcmFkaWFuQUIgPCByYWRpYW5NYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhbkFCKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmFkaWFuQkEgPiAwICYmIHJhZGlhbkJBIDwgcmFkaWFuTWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5CQSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmFkaWFuTWF4IDwgMCkge1xyXG4gICAgICAgICAgICBpZiAocmFkaWFuQUIgPCAwICYmIHJhZGlhbkFCID4gcmFkaWFuTWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5BQik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJhZGlhbkJBIDwgMCAmJiByYWRpYW5CQSA+IHJhZGlhbk1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuQkEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIt+aWsOeOqeWutuinkuW6plxyXG4gICAgX3JlZnJlc2hBbmdsZSgpe1xyXG4gICAgICAgIC8v5Yqo5oCB5L+u5pS5cGxheWVy6KeS5bqmXHJcbiAgICAgICAgbGV0IGZyb21BbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGU7XHJcbiAgICAgICAgbGV0IHRvQW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2Rpcik7XHJcbiAgICAgICAgbGV0IGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuXHJcbiAgICAgICAgLy/kvb/lvZPliY3op5Lluqblkoznm67moIfop5LluqblpITkuo7lkIzkuIDkuKrnu7TluqYs5Lul5L6/566X5Ye65p2l55qE5YGP56e76KeS5bqm5piv5pyA5bCP55qEXHJcbiAgICAgICAgaWYgKGRpc0FuZ2xlID4gMTgwKSB7XHJcbiAgICAgICAgICAgIGZyb21BbmdsZSA9IGZyb21BbmdsZSArIDM2MDtcclxuICAgICAgICAgICAgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkaXNBbmdsZSA8IC0xODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlIC0gMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+avj+W4p+acgOWkmuWPquWQkeebruagh+inkuW6puaXi+i9rDEw5bqmXHJcbiAgICAgICAgaWYgKGRpc0FuZ2xlID4gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUrMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLTEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgPSB0aGlzLl9maXJlLl9seUJnLmFuZ2xlLTEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJnLmFuZ2xlID0gdG9BbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5L+u5q2j6KeS5bqm5ZyoLTE4MH4xODDojIPlm7TlhoVcclxuICAgICAgICB0aGlzLl9maXJlLl9seUJnLmFuZ2xlID0gVXRpbHMuY29ycmVjdGlvbkFuZ2xlKHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUpO1xyXG5cclxuXHJcbiAgICAgICAgLy/osIPmlbTngq7nrqHop5LluqZcclxuICAgICAgICB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fYmFycmVsRGlyKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ooqvmlLvlh7vliLAoKVxyXG4gICAgYmVIaXQoZGFtYWdlKXtcclxuICAgICAgICAvLyBjYy5sb2coXCJlbmVteSBiZWhpdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbXAgPT0gXCJwbGF5ZXJcIikge1xyXG4gICAgICAgICAgICBsZXQgYT0gMTtcclxuICAgICAgICAgICAgLy8gZGFtYWdlID0gMTAwMDAwMDAwMDAwMDAwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBhPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iuoeeul+S8pOWus1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSAtIHRoaXMuX2RlZjtcclxuICAgICAgICBpZiAoZGFtYWdlIDwgMCkgeyBkYW1hZ2UgPSAwO31cclxuXHJcbiAgICAgICAgLy/orqHnrpfmnIDmlrDooYDph49cclxuICAgICAgICB0aGlzLl9ocCAtPSBkYW1hZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkgeyB0aGlzLl9ocCA9IDA7fVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6K6h566X6KGA6YeP5p2h5pi+56S655m+5YiG55m+XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+ihgOmHj+etieS6jjAs6L+b5YWl5q275Lqh6YC76L6RXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iuoeeul+ihgOmHj+adoeaYvuekuueZvuWIhueZvlxyXG4gICAgcmVmcmVzaEhwKCl7XHJcbiAgICAgICAgbGV0IHBlcmNlbnQgPSB0aGlzLl9ocC90aGlzLl9tYXhIcDtcclxuICAgICAgICB0aGlzLl9maXJlLl9saWZlYmFyLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHBlcmNlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/miafooYzmrbvkuqFcclxuICAgIGRvRGVhdGgoKXtcclxuICAgICAgICBsZXQgYm9vbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYm9vbVByZWZhYik7XHJcbiAgICAgICAgYm9vbS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGJvb20ucG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgYm9vbS56SW5kZXggPSAxMDAwO1xyXG5cclxuICAgICAgICBsZXQgYW5pID0gYm9vbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBhbmkucGxheShcImJvb20yXCIpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYm9vbVwiKTtcclxuICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19