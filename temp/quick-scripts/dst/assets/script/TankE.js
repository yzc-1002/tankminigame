
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
        _this._currentSpeed = 0; //当前移动速度
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
    Tank.prototype._getWillPosition = function (currPosition, dir, speed) {
        var dis = dir.mul(speed);
        return currPosition.add(dis);
    };
    Tank.prototype._getConfigValue = function (key, defaultValue) {
        var value = this._config ? this._config[key] : null;
        return value == null ? defaultValue : value;
    };
    Tank.prototype._getFrameValue = function (key, defaultValue, dt) {
        return this._getConfigValue(key, defaultValue) * dt * 60;
    };
    Tank.prototype._turnDirTo = function (targetDir, dt) {
        if (!targetDir || targetDir.magSqr() <= 0) {
            return;
        }
        var fromAngle = Utils_1.Utils.vectorsToDegress(this._dir);
        var toAngle = Utils_1.Utils.vectorsToDegress(targetDir);
        var disAngle = toAngle - fromAngle;
        if (disAngle > 180) {
            fromAngle = fromAngle + 360;
            disAngle = toAngle - fromAngle;
        }
        else if (disAngle < -180) {
            fromAngle = fromAngle - 360;
            disAngle = toAngle - fromAngle;
        }
        var maxTurnAngle = this._getFrameValue("AngularSpeed", 10, dt);
        if (maxTurnAngle <= 0 || Math.abs(disAngle) <= maxTurnAngle) {
            this._dir = targetDir.normalize();
            return;
        }
        var nextAngle = fromAngle + (disAngle > 0 ? maxTurnAngle : -maxTurnAngle);
        this._dir = Utils_1.Utils.degressToVectors(Utils_1.Utils.correctionAngle(nextAngle));
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
    Tank.prototype._refreshAngle = function (dt, smoothBody) {
        if (dt === void 0) { dt = 1 / 60; }
        if (smoothBody === void 0) { smoothBody = true; }
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
        var maxTurnAngle = this._getFrameValue("AngularSpeed", 10, dt);
        if (smoothBody == false || maxTurnAngle <= 0) {
            this._fire._lyBg.angle = toAngle;
        }
        else if (disAngle > maxTurnAngle) {
            this._fire._lyBg.angle = this._fire._lyBg.angle + maxTurnAngle;
        }
        else if (disAngle < -maxTurnAngle) {
            this._fire._lyBg.angle = this._fire._lyBg.angle - maxTurnAngle;
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
        if (this._map && this._map.playLightScreenShake) {
            this._map.playLightScreenShake();
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxUYW5rRS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDNUIsMENBQTBDO0FBQ3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBCLHdCQUFhO0lBQXZDO1FBQUEscUVBeVRDO1FBdFRHLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLFNBQVM7UUFDVCxXQUFLLEdBQVMsRUFBRSxDQUFDLENBQVcsSUFBSTtRQUNoQyxhQUFPLEdBQU8sRUFBRSxDQUFDLENBQVcsUUFBUTtRQUNwQyxVQUFJLEdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3BDLGdCQUFVLEdBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxNQUFNO1FBQ2xDLFlBQU0sR0FBUSxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ2xDLG1CQUFhLEdBQUcsQ0FBQyxDQUFDLENBQVUsUUFBUTtRQUNwQyxVQUFJLEdBQVUsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUV6QyxTQUFHLEdBQVcsQ0FBQyxDQUFDLENBQVksTUFBTTtRQUNsQyxZQUFNLEdBQVEsQ0FBQyxDQUFDLENBQVksUUFBUTtRQUNwQyxVQUFJLEdBQVUsQ0FBQyxDQUFDLENBQVksS0FBSztRQUNqQyxVQUFJLEdBQVUsQ0FBQyxDQUFDLENBQVksSUFBSTtRQUNoQyxhQUFPLEdBQU8sRUFBRSxDQUFDO1FBRWpCLGVBQVMsR0FBSyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ2xDLGdCQUFVLEdBQUksSUFBSSxDQUFDOztJQWlTdkIsQ0FBQztJQS9SRyxxQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsYUFBYTtJQUNiLHFCQUFNLEdBQU4sVUFBTyxHQUFHO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVE7SUFDUiwwQkFBVyxHQUFYLFVBQVksUUFBUTtRQUFwQixpQkF5QkM7UUF4QkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXhDLElBQUk7UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUNwQyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ3pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO2lCQUNHO2dCQUNBLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJO1FBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDeEMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLFlBQVksR0FBRyxLQUFJLENBQUMsU0FBUyxFQUFFO2dCQUM3QyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN4QjtpQkFDRztnQkFDQSxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxVQUFVO0lBQ1Ysd0JBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsVUFBVTtJQUNWLCtCQUFnQixHQUFoQixVQUFpQixZQUFZLEVBQUUsR0FBRyxFQUFFLEtBQUs7UUFDckMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELDhCQUFlLEdBQWYsVUFBZ0IsR0FBRyxFQUFFLFlBQVk7UUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3BELE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDaEQsQ0FBQztJQUVELDZCQUFjLEdBQWQsVUFBZSxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUU7UUFDaEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCx5QkFBVSxHQUFWLFVBQVcsU0FBUyxFQUFFLEVBQUU7UUFDcEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3ZDLE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxHQUFHLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQUksUUFBUSxHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFFbkMsSUFBSSxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLFNBQVMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQzVCLFFBQVEsR0FBRyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO2FBQ0ksSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDdEIsU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDNUIsUUFBUSxHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUM7U0FDbEM7UUFFRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxZQUFZLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxFQUFFO1lBQ3pELElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xDLE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGFBQWE7SUFDYiwwQkFBVyxHQUFYLFVBQVksQ0FBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsYUFBYTtRQUNsQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFbEIsUUFBUTtRQUNSLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUI7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QixJQUFJLE9BQU8sR0FBRyxhQUFLLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7YUFDRztZQUNBLE9BQU87WUFDUCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xEO1NBQ0o7UUFFRCxRQUFRO1FBQ1IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssRUFBQztnQkFDdkUsT0FBTyxPQUFPLENBQUM7YUFDbEI7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxrREFBa0Q7SUFDbEQsdUNBQXdCLEdBQXhCLFVBQXlCLENBQUMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLGFBQWE7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksYUFBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsMkJBQVksR0FBWixVQUFhLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxFQUFDLE9BQU87UUFDbkMsSUFBSSxFQUFFLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFJLGtCQUFrQjtRQUNsRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25DLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUksaUJBQWlCO1FBRWxFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLE1BQU0sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEgsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25GLElBQUksTUFBTSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixJQUFJLFlBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztZQUNuQyxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLGNBQWMsR0FBRyxZQUFZLEVBQUU7b0JBQzdDLElBQUksU0FBTyxHQUFHLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBQ2xFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBTyxDQUFDLENBQUM7b0JBQ3RCLGNBQWMsR0FBRyxJQUFJLENBQUM7aUJBQ3pCO3FCQUNJLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxjQUFjLEdBQUcsWUFBWSxFQUFFO29CQUNsRCxJQUFJLFNBQU8sR0FBRyxhQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUNsRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQU8sQ0FBQyxDQUFDO29CQUN0QixjQUFjLEdBQUcsSUFBSSxDQUFDO2lCQUN6QjthQUNKO1lBQ0QsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCO0lBRUwsQ0FBQztJQUVELHNEQUFzRDtJQUN0RCxpQ0FBa0IsR0FBbEIsVUFBbUIsT0FBTyxFQUFDLE1BQU0sRUFBQyxRQUFRO1FBQ3RDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTlCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsU0FBUyxFQUFFO2dCQUN0QyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsU0FBUyxFQUFFO2dCQUN0QyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QztTQUNKO2FBQ0ksSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsU0FBUyxFQUFFO2dCQUN0QyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsU0FBUyxFQUFFO2dCQUN0QyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QztTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7SUFDUiw0QkFBYSxHQUFiLFVBQWMsRUFBVyxFQUFFLFVBQWlCO1FBQTlCLG1CQUFBLEVBQUEsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUFFLDJCQUFBLEVBQUEsaUJBQWlCO1FBQ3hDLGNBQWM7UUFDZCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLFFBQVEsR0FBRyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBRW5DLGtDQUFrQztRQUNsQyxJQUFJLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDaEIsU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDNUIsUUFBUSxHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUM7U0FDbEM7YUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUN0QixTQUFTLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUM1QixRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFVBQVUsSUFBSSxLQUFLLElBQUksWUFBWSxJQUFJLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1NBQ3BDO2FBQ0ksSUFBSSxRQUFRLEdBQUcsWUFBWSxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1NBQ2xFO2FBQ0ksSUFBSSxRQUFRLEdBQUcsQ0FBQyxZQUFZLEVBQUU7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDbEU7YUFDRztZQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDcEM7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFHdkUsUUFBUTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXpFLENBQUM7SUFFRCxRQUFRO0lBQ1Isb0JBQUssR0FBTCxVQUFNLE1BQU07UUFDUix5QkFBeUI7UUFFekIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsR0FBRSxDQUFDLENBQUM7WUFDVCw4QkFBOEI7U0FDakM7YUFDRztZQUNBLElBQUksQ0FBQyxHQUFFLENBQUMsQ0FBQztTQUNaO1FBQ0QsTUFBTTtRQUNOLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQUM7UUFFOUIsUUFBUTtRQUNSLElBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUFDO1FBRWxDLFlBQVk7UUFDWixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsY0FBYztRQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQsWUFBWTtJQUNaLHdCQUFTLEdBQVQ7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDeEQsQ0FBQztJQUVELE1BQU07SUFDTixzQkFBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEIsMkJBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFyVEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNTO0lBTnBCLElBQUk7UUFEaEIsT0FBTztPQUNLLElBQUksQ0F5VGhCO0lBQUQsV0FBQztDQXpURCxBQXlUQyxDQXpUeUIsNkJBQWEsR0F5VHRDO0FBelRZLG9CQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuLy/nvZHpobXlrqLmnI0gaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9rZWZ1Lmh0bWxcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgVGFuayBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBidWxsZXRQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBib29tUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8v56e75YqoLOeisOaSnuajgOa1i1xyXG4gICAgX2NhbXAgICAgICAgPSBcIlwiOyAgICAgICAgICAgLy/pmLXokKVcclxuICAgIF9yYWRpdXMgICAgID0gMTA7ICAgICAgICAgICAvL+eisOaSnuajgOa1i+WNiuW+hFxyXG4gICAgX2RpciAgICAgICAgPSBjYy52MigxLDApOyAgIC8v5b2T5YmN6KGM6L+b5pa55ZCRXHJcbiAgICBfYmFycmVsRGlyICA9IGNjLnYyKDEsMCk7ICAgLy/ngq7nrqHmlrnlkJFcclxuICAgIF9yYXRpbyAgICAgID0gMDsgICAgICAgICAgICAvL+W9k+WJjemAn+eOh1xyXG4gICAgX2N1cnJlbnRTcGVlZCA9IDA7ICAgICAgICAgIC8v5b2T5YmN56e75Yqo6YCf5bqmXHJcbiAgICBfbWFwICAgICAgICA9IG51bGw7ICAgICAgICAgLy90aWxlIG1hcCDoioLngrlcclxuXHJcbiAgICBfaHAgICAgICAgICA9IDA7ICAgICAgICAgICAgLy/lvZPliY3ooYDph49cclxuICAgIF9tYXhIcCAgICAgID0gMDsgICAgICAgICAgICAvL+acgOWkp+ihgOmHj+ihgOmHj1xyXG4gICAgX2F0ayAgICAgICAgPSAwOyAgICAgICAgICAgIC8v5pS75Ye75YqbXHJcbiAgICBfZGVmICAgICAgICA9IDA7ICAgICAgICAgICAgLy/pmLLlvqFcclxuICAgIF9jb25maWc6YW55ID0ge307XHJcblxyXG4gICAgX3RhbmtUeXBlICAgPSAxOyAgICAgICAgICAgIC8v5Z2m5YWL57G75Z6LXHJcbiAgICBfY3VycmVudEJnICA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLm5vZGVbXCIkQ2lyY2xlQ29sbGlkZXJcIl0ucmFkaXVzO1xyXG4gICAgICAgIHRoaXMuX2RpciA9IFV0aWxzLmRlZ3Jlc3NUb1ZlY3RvcnModGhpcy5fZmlyZS5fbHlCZy5hbmdsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iuvue9rnRpbGVkIG1hcFxyXG4gICAgc2V0TWFwKG1hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/orr7nva7lnablhYvnsbvlnotcclxuICAgIHNldFRhbmtUeXBlKHRhbmtUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fdGFua1R5cGUgPSB0YW5rVHlwZTtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB5eXAuY29uZmlnLlRhbmtbdGhpcy5fdGFua1R5cGVdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5fY29uZmlnXCIsdGhpcy5fY29uZmlnKVxyXG5cclxuICAgICAgICAvL+eCrui6q1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQmdcIiArIHRoaXMuX3RhbmtUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v54Ku562SXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQmFycmVsXCIgKyB0aGlzLl90YW5rVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50QmcgPSBjaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5qOA5rWL5Y2K5b6EXHJcbiAgICBnZXRSYWRpdXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueOqeWutueahOaWsOS9jee9rlxyXG4gICAgX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIGRpciwgc3BlZWQpIHtcclxuICAgICAgICBsZXQgZGlzID0gZGlyLm11bChzcGVlZCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJQb3NpdGlvbi5hZGQoZGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q29uZmlnVmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWdba2V5XSA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0RnJhbWVWYWx1ZShrZXksIGRlZmF1bHRWYWx1ZSwgZHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q29uZmlnVmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUpICogZHQgKiA2MDtcclxuICAgIH1cclxuXHJcbiAgICBfdHVybkRpclRvKHRhcmdldERpciwgZHQpIHtcclxuICAgICAgICBpZiAoIXRhcmdldERpciB8fCB0YXJnZXREaXIubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZnJvbUFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xyXG4gICAgICAgIGxldCB0b0FuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0YXJnZXREaXIpO1xyXG4gICAgICAgIGxldCBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcblxyXG4gICAgICAgIGlmIChkaXNBbmdsZSA+IDE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgKyAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzQW5nbGUgPCAtMTgwKSB7XHJcbiAgICAgICAgICAgIGZyb21BbmdsZSA9IGZyb21BbmdsZSAtIDM2MDtcclxuICAgICAgICAgICAgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1heFR1cm5BbmdsZSA9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBbmd1bGFyU3BlZWRcIiwgMTAsIGR0KTtcclxuICAgICAgICBpZiAobWF4VHVybkFuZ2xlIDw9IDAgfHwgTWF0aC5hYnMoZGlzQW5nbGUpIDw9IG1heFR1cm5BbmdsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXIgPSB0YXJnZXREaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0QW5nbGUgPSBmcm9tQW5nbGUgKyAoZGlzQW5nbGUgPiAwID8gbWF4VHVybkFuZ2xlIDogLW1heFR1cm5BbmdsZSk7XHJcbiAgICAgICAgdGhpcy5fZGlyID0gVXRpbHMuZGVncmVzc1RvVmVjdG9ycyhVdGlscy5jb3JyZWN0aW9uQW5nbGUobmV4dEFuZ2xlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOiOt+WPlueisOaSnuWQjueahOWwneivleaWueWQkVxyXG4gICAgX2dldFRlc3REaXIoUCxyYWRpdXMsZGlyLGNvbGxpZGVySXRlbXMpe1xyXG4gICAgICAgIGxldCB0ZXN0RGlycyA9IFtdO1xyXG5cclxuICAgICAgICAvL+iOt+WPluWwneivleaWueWQkVxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwiZW5lbXlcIikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsIDMwICogaSk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwgLTMwICogaSk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8v5oyJ5pyA5LyY6I635Y+WXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sbGlkZXJJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVySXRlbSA9IGNvbGxpZGVySXRlbXNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRUZXN0RGlycyhQLGRpcixjb2xsaWRlckl0ZW0sdGVzdERpcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+ajgOa1i+WwneivleaWueWQkVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdERpcnMubGVuZ3RoOyBpKyspIHsgXHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gdGVzdERpcnNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaXJjbGVQYXNzQ29sbGlkZXJJdGVtcyhQLHJhZGl1cyx0ZXN0RGlyLGNvbGxpZGVySXRlbXMpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0RGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eCuXDkuLrlnIblv4MscmFkaXVz5Li65Y2K5b6ELOaWueWQkWRpcueahOWchizmmK/lkKbkvJrnu4/ov4djb2xsaWRlckl0ZW1z5Lit55qE5LiA5p2h57q/5q61XHJcbiAgICBfY2lyY2xlUGFzc0NvbGxpZGVySXRlbXMoUCxyYWRpdXMsZGlyLGNvbGxpZGVySXRlbXMpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sbGlkZXJJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXJJdGVtID0gY29sbGlkZXJJdGVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBBID0gY29sbGlkZXJJdGVtLmNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXJJdGVtLmNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXJJdGVtLmNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXJJdGVtLmNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5jaXJjbGVQYXNzTGluZShQLHJhZGl1cyxkaXIsQSxCKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WwhOe6v+i1t+Wni+eCuVAs5pa55ZCRZGlyLOS4jue6v+autUFCKGNvbGxpZGVySXRlbee7hOaIkCnnorDmkp7lkI7nmoTlsJ3or5XmlrnlkJHliJfooahcclxuICAgIF9nZXRUZXN0RGlycyhQLGRpcixjb2xsaWRlckl0ZW0scmV0RGlycyl7XHJcbiAgICAgICAgbGV0IFAxID0gY29sbGlkZXJJdGVtLnBvaW50OyAgICAvL2NvbGxpZGVy5LiK6Led56a7UOacgOi/keeahOeCuVxyXG4gICAgICAgIGxldCBkaXJQUDEgPSBQMS5zdWIoUCkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IHJhZGlhblBQMSA9IGNjLnYyKGRpclBQMSkuc2lnbkFuZ2xlKGRpcik7ICAgIC8vIOaxguaWueWQkeWQkemHj+S4juWvueavlOWQkemHj+mXtOeahOW8p+W6plxyXG5cclxuICAgICAgICBsZXQgYmFzZURpciA9IGRpcjtcclxuICAgICAgICBsZXQgbWF4RGlyID0gcmFkaWFuUFAxID4gMCA/IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIDkwKSA6IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIC05MCk7XHJcbiAgICAgICAgbGV0IHBhcmFsbGVsRGVncmVlID0gdGhpcy5fZ2V0UGFyYWxsZWxEZWdyZWUoYmFzZURpcixtYXhEaXIsY29sbGlkZXJJdGVtLmNvbGxpZGVyKTtcclxuICAgICAgICBsZXQgc3ltYm9sID0gcmFkaWFuUFAxID4gMCA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXREZWdyZWUgPSBpICogMTUgKiBzeW1ib2w7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbGxlbERlZ3JlZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN5bWJvbCA+IDAgJiYgcGFyYWxsZWxEZWdyZWUgPCBvZmZzZXREZWdyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIHBhcmFsbGVsRGVncmVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXREaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsZWxEZWdyZWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3ltYm9sIDwgMCAmJiBwYXJhbGxlbERlZ3JlZSA+IG9mZnNldERlZ3JlZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoYmFzZURpciwgcGFyYWxsZWxEZWdyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxlbERlZ3JlZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCBvZmZzZXREZWdyZWUpO1xyXG4gICAgICAgICAgICByZXREaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluW5s+ihjOS6jmNvbGxpZGVyLOS4lOWMheWQq+WcqGJhc2VEZWdyZWUsbWF4RGVncmVl55qE6KeS5bqmKOebuOWvuWJhc2VEaXIpXHJcbiAgICBfZ2V0UGFyYWxsZWxEZWdyZWUoYmFzZURpcixtYXhEaXIsY29sbGlkZXIpe1xyXG4gICAgICAgIGxldCBBID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgIGxldCBBQiA9IEIuc3ViKEEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCBCQSA9IEEuc3ViKEIpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICBsZXQgcmFkaWFuTWF4ID0gbWF4RGlyLnNpZ25BbmdsZShiYXNlRGlyKTtcclxuICAgICAgICBsZXQgcmFkaWFuQUIgPSBBQi5zaWduQW5nbGUoYmFzZURpcik7XHJcbiAgICAgICAgbGV0IHJhZGlhbkJBID0gQkEuc2lnbkFuZ2xlKGJhc2VEaXIpO1xyXG5cclxuICAgICAgICBpZiAocmFkaWFuTWF4ID4gMCkge1xyXG4gICAgICAgICAgICBpZiAocmFkaWFuQUIgPiAwICYmIHJhZGlhbkFCIDwgcmFkaWFuTWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5BQik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJhZGlhbkJBID4gMCAmJiByYWRpYW5CQSA8IHJhZGlhbk1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuQkEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJhZGlhbk1heCA8IDApIHtcclxuICAgICAgICAgICAgaWYgKHJhZGlhbkFCIDwgMCAmJiByYWRpYW5BQiA+IHJhZGlhbk1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuQUIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYWRpYW5CQSA8IDAgJiYgcmFkaWFuQkEgPiByYWRpYW5NYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhbkJBKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liLfmlrDnjqnlrrbop5LluqZcclxuICAgIF9yZWZyZXNoQW5nbGUoZHQgPSAxIC8gNjAsIHNtb290aEJvZHkgPSB0cnVlKXtcclxuICAgICAgICAvL+WKqOaAgeS/ruaUuXBsYXllcuinkuW6plxyXG4gICAgICAgIGxldCBmcm9tQW5nbGUgPSB0aGlzLl9maXJlLl9seUJnLmFuZ2xlO1xyXG4gICAgICAgIGxldCB0b0FuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xyXG4gICAgICAgIGxldCBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcblxyXG4gICAgICAgIC8v5L2/5b2T5YmN6KeS5bqm5ZKM55uu5qCH6KeS5bqm5aSE5LqO5ZCM5LiA5Liq57u05bqmLOS7peS+v+eul+WHuuadpeeahOWBj+enu+inkuW6puaYr+acgOWwj+eahFxyXG4gICAgICAgIGlmIChkaXNBbmdsZSA+IDE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgKyAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzQW5nbGUgPCAtMTgwKSB7XHJcbiAgICAgICAgICAgIGZyb21BbmdsZSA9IGZyb21BbmdsZSAtIDM2MDtcclxuICAgICAgICAgICAgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1heFR1cm5BbmdsZSA9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBbmd1bGFyU3BlZWRcIiwgMTAsIGR0KTtcclxuICAgICAgICBpZiAoc21vb3RoQm9keSA9PSBmYWxzZSB8fCBtYXhUdXJuQW5nbGUgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJnLmFuZ2xlID0gdG9BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzQW5nbGUgPiBtYXhUdXJuQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgKyBtYXhUdXJuQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLW1heFR1cm5BbmdsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJnLmFuZ2xlID0gdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSAtIG1heFR1cm5BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRvQW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S/ruato+inkuW6puWcqC0xODB+MTgw6IyD5Zu05YaFXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IFV0aWxzLmNvcnJlY3Rpb25BbmdsZSh0aGlzLl9maXJlLl9seUJnLmFuZ2xlKTtcclxuXHJcblxyXG4gICAgICAgIC8v6LCD5pW054Ku566h6KeS5bqmXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2JhcnJlbERpcik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6KKr5pS75Ye75YiwKClcclxuICAgIGJlSGl0KGRhbWFnZSl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiZW5lbXkgYmVoaXRcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgbGV0IGE9IDE7XHJcbiAgICAgICAgICAgIC8vIGRhbWFnZSA9IDEwMDAwMDAwMDAwMDAwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgYT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/orqHnrpfkvKTlrrNcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XHJcbiAgICAgICAgaWYgKGRhbWFnZSA8IDApIHsgZGFtYWdlID0gMDt9XHJcblxyXG4gICAgICAgIC8v6K6h566X5pyA5paw6KGA6YePXHJcbiAgICAgICAgdGhpcy5faHAgLT0gZGFtYWdlO1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHsgdGhpcy5faHAgPSAwO31cclxuICAgICAgICBcclxuICAgICAgICAvL+iuoeeul+ihgOmHj+adoeaYvuekuueZvuWIhueZvlxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ooYDph4/nrYnkuo4wLOi/m+WFpeatu+S6oemAu+i+kVxyXG4gICAgICAgIGlmICh0aGlzLl9ocCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/orqHnrpfooYDph4/mnaHmmL7npLrnmb7liIbnmb5cclxuICAgIHJlZnJlc2hIcCgpe1xyXG4gICAgICAgIGxldCBwZXJjZW50ID0gdGhpcy5faHAvdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSBwZXJjZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5omn6KGM5q275LqhXHJcbiAgICBkb0RlYXRoKCl7XHJcbiAgICAgICAgbGV0IGJvb20gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJvb21QcmVmYWIpO1xyXG4gICAgICAgIGJvb20ucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBib29tLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGJvb20uekluZGV4ID0gMTAwMDtcclxuXHJcbiAgICAgICAgbGV0IGFuaSA9IGJvb20uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgYW5pLnBsYXkoXCJib29tMlwiKTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJvb21cIik7XHJcbiAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=