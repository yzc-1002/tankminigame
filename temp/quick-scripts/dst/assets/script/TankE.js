
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
var LOW_HP_RATIO = 0.2;
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
        _this._lowHpBarBasePosition = null;
        _this._lowHpBarFxPlaying = false;
        _this._lowHpSmokeRoot = null;
        _this._lowHpSmokeTime = 0;
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
        this._syncLowHpVisualState();
    };
    Tank.prototype.isLowHp = function () {
        return this._hp > 0 && this._maxHp > 0 && this._hp / this._maxHp <= LOW_HP_RATIO;
    };
    Tank.prototype.updateLowHpVisual = function (dt) {
        this._syncLowHpVisualState();
        if (this.isLowHp()) {
            this._updateLowHpSmoke(dt);
        }
        else {
            this._clearLowHpSmoke();
        }
    };
    Tank.prototype._syncLowHpVisualState = function () {
        if (this.isLowHp()) {
            this._startLowHpBarEffect();
        }
        else {
            this._stopLowHpBarEffect();
        }
    };
    Tank.prototype._startLowHpBarEffect = function () {
        var lifebar = this._fire && this._fire._lifebar;
        if (!lifebar || !cc.isValid(lifebar) || this._lowHpBarFxPlaying) {
            return;
        }
        this._lowHpBarFxPlaying = true;
        this._lowHpBarBasePosition = cc.v3(lifebar.position);
        var basePos = this._lowHpBarBasePosition;
        lifebar.stopAllActions();
        lifebar.opacity = 255;
        lifebar.position = basePos;
        lifebar.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.fadeTo(0.2, 135), cc.sequence(cc.moveTo(0.05, basePos.x + 4, basePos.y + 1), cc.moveTo(0.05, basePos.x - 4, basePos.y - 1), cc.moveTo(0.05, basePos.x + 2, basePos.y), cc.moveTo(0.05, basePos.x, basePos.y))), cc.fadeTo(0.5, 255), cc.delayTime(0.3))));
    };
    Tank.prototype._stopLowHpBarEffect = function () {
        var lifebar = this._fire && this._fire._lifebar;
        if (!lifebar || !cc.isValid(lifebar)) {
            this._lowHpBarFxPlaying = false;
            return;
        }
        lifebar.stopAllActions();
        lifebar.opacity = 255;
        if (this._lowHpBarBasePosition) {
            lifebar.position = this._lowHpBarBasePosition;
        }
        this._lowHpBarFxPlaying = false;
    };
    Tank.prototype._updateLowHpSmoke = function (dt) {
        this._lowHpSmokeTime += dt;
        if (this._lowHpSmokeTime < 0.32) {
            return;
        }
        this._lowHpSmokeTime = 0;
        var root = this._ensureLowHpSmokeRoot();
        if (!root) {
            return;
        }
        var smoke = new cc.Node("_lowHpSmoke");
        smoke.parent = root;
        smoke.zIndex = 80;
        smoke.opacity = 110;
        smoke.position = cc.v3((Math.random() - 0.5) * 18, 12 + Math.random() * 8);
        var graphics = smoke.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(120, 120, 120, 170);
        graphics.circle(0, 0, 7 + Math.random() * 4);
        graphics.fill();
        var driftX = (Math.random() - 0.5) * 20;
        var driftY = 32 + Math.random() * 14;
        smoke.scale = 0.55 + Math.random() * 0.2;
        smoke.runAction(cc.sequence(cc.spawn(cc.moveBy(1.1, driftX, driftY), cc.scaleTo(1.1, 1.25 + Math.random() * 0.25), cc.fadeOut(1.1)), cc.removeSelf()));
    };
    Tank.prototype._ensureLowHpSmokeRoot = function () {
        if (this._lowHpSmokeRoot && cc.isValid(this._lowHpSmokeRoot)) {
            return this._lowHpSmokeRoot;
        }
        this._lowHpSmokeRoot = new cc.Node("_lowHpSmokeRoot");
        this._lowHpSmokeRoot.parent = this.node;
        this._lowHpSmokeRoot.setPosition(0, 4);
        this._lowHpSmokeRoot.zIndex = 90;
        return this._lowHpSmokeRoot;
    };
    Tank.prototype._clearLowHpSmoke = function () {
        this._lowHpSmokeTime = 0;
        if (this._lowHpSmokeRoot && cc.isValid(this._lowHpSmokeRoot)) {
            this._lowHpSmokeRoot.destroy();
        }
        this._lowHpSmokeRoot = null;
    };
    //执行死亡
    Tank.prototype.doDeath = function () {
        this._stopLowHpBarEffect();
        this._clearLowHpSmoke();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxUYW5rRS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDNUIsMENBQTBDO0FBQ3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQzFDLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUd6QjtJQUEwQix3QkFBYTtJQUF2QztRQUFBLHFFQStiQztRQTViRyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUU3QixTQUFTO1FBQ1QsV0FBSyxHQUFTLEVBQUUsQ0FBQyxDQUFXLElBQUk7UUFDaEMsYUFBTyxHQUFPLEVBQUUsQ0FBQyxDQUFXLFFBQVE7UUFDcEMsVUFBSSxHQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUcsUUFBUTtRQUNwQyxnQkFBVSxHQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUcsTUFBTTtRQUNsQyxZQUFNLEdBQVEsQ0FBQyxDQUFDLENBQVksTUFBTTtRQUNsQyxtQkFBYSxHQUFHLENBQUMsQ0FBQyxDQUFVLFFBQVE7UUFDcEMsVUFBSSxHQUFVLElBQUksQ0FBQyxDQUFTLGFBQWE7UUFFekMsU0FBRyxHQUFXLENBQUMsQ0FBQyxDQUFZLE1BQU07UUFDbEMsWUFBTSxHQUFRLENBQUMsQ0FBQyxDQUFZLFFBQVE7UUFDcEMsVUFBSSxHQUFVLENBQUMsQ0FBQyxDQUFZLEtBQUs7UUFDakMsVUFBSSxHQUFVLENBQUMsQ0FBQyxDQUFZLElBQUk7UUFDaEMsYUFBTyxHQUFPLEVBQUUsQ0FBQztRQUVq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QUFDLE1BQU0sQ0FBQzs4Q0FDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNTO0lBTnBCLElBQUk7UUFEaEIsT0FBTztPQUNLLElBQUksQ0ErYmhCO0lBQUQsV0FBQztDQS9iRCxBQStiQyxDQS9ieUIsNkJBQWEsR0ErYnRDO0FBL2JZLG9CQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuLy/nvZHpobXlrqLmnI0gaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9rZWZ1Lmh0bWxcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IExPV19IUF9SQVRJTyA9IDAuMjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBUYW5rIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJvb21QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/np7vliqgs56Kw5pKe5qOA5rWLXHJcbiAgICBfY2FtcCAgICAgICA9IFwiXCI7ICAgICAgICAgICAvL+mYteiQpVxyXG4gICAgX3JhZGl1cyAgICAgPSAxMDsgICAgICAgICAgIC8v56Kw5pKe5qOA5rWL5Y2K5b6EXHJcbiAgICBfZGlyICAgICAgICA9IGNjLnYyKDEsMCk7ICAgLy/lvZPliY3ooYzov5vmlrnlkJFcclxuICAgIF9iYXJyZWxEaXIgID0gY2MudjIoMSwwKTsgICAvL+eCrueuoeaWueWQkVxyXG4gICAgX3JhdGlvICAgICAgPSAwOyAgICAgICAgICAgIC8v5b2T5YmN6YCf546HXHJcbiAgICBfY3VycmVudFNwZWVkID0gMDsgICAgICAgICAgLy/lvZPliY3np7vliqjpgJ/luqZcclxuICAgIF9tYXAgICAgICAgID0gbnVsbDsgICAgICAgICAvL3RpbGUgbWFwIOiKgueCuVxyXG5cclxuICAgIF9ocCAgICAgICAgID0gMDsgICAgICAgICAgICAvL+W9k+WJjeihgOmHj1xyXG4gICAgX21heEhwICAgICAgPSAwOyAgICAgICAgICAgIC8v5pyA5aSn6KGA6YeP6KGA6YePXHJcbiAgICBfYXRrICAgICAgICA9IDA7ICAgICAgICAgICAgLy/mlLvlh7vliptcclxuICAgIF9kZWYgICAgICAgID0gMDsgICAgICAgICAgICAvL+mYsuW+oVxyXG4gICAgX2NvbmZpZzphbnkgPSB7fTtcclxuXHJcbiAgICBfdGFua1R5cGUgICA9IDE7ICAgICAgICAgICAgLy/lnablhYvnsbvlnotcclxuICAgIF9jdXJyZW50QmcgID0gbnVsbDtcclxuICAgIF9sb3dIcEJhckJhc2VQb3NpdGlvbiA9IG51bGw7XHJcbiAgICBfbG93SHBCYXJGeFBsYXlpbmcgPSBmYWxzZTtcclxuICAgIF9sb3dIcFNtb2tlUm9vdCA9IG51bGw7XHJcbiAgICBfbG93SHBTbW9rZVRpbWUgPSAwO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gdGhpcy5ub2RlW1wiJENpcmNsZUNvbGxpZGVyXCJdLnJhZGl1cztcclxuICAgICAgICB0aGlzLl9kaXIgPSBVdGlscy5kZWdyZXNzVG9WZWN0b3JzKHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUpO1xyXG4gICAgICAgIHRoaXMuX2JhcnJlbERpciA9IHRoaXMuX2RpcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/orr7nva50aWxlZCBtYXBcclxuICAgIHNldE1hcChtYXApIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K6+572u5Z2m5YWL57G75Z6LXHJcbiAgICBzZXRUYW5rVHlwZSh0YW5rVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX3RhbmtUeXBlID0gdGFua1R5cGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0geXlwLmNvbmZpZy5UYW5rW3RoaXMuX3RhbmtUeXBlXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuX2NvbmZpZ1wiLHRoaXMuX2NvbmZpZylcclxuXHJcbiAgICAgICAgLy/ngq7ouqtcclxuICAgICAgICB0aGlzLl9maXJlLl9seUJnLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lICE9IFwiX3NwckJnXCIgKyB0aGlzLl90YW5rVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvL+eCruetklxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lICE9IFwiX3NwckJhcnJlbFwiICsgdGhpcy5fdGFua1R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEJnID0gY2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueisOaSnuajgOa1i+WNiuW+hFxyXG4gICAgZ2V0UmFkaXVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bnjqnlrrbnmoTmlrDkvY3nva5cclxuICAgIF9nZXRXaWxsUG9zaXRpb24oY3VyclBvc2l0aW9uLCBkaXIsIHNwZWVkKSB7XHJcbiAgICAgICAgbGV0IGRpcyA9IGRpci5tdWwoc3BlZWQpO1xyXG4gICAgICAgIHJldHVybiBjdXJyUG9zaXRpb24uYWRkKGRpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldENvbmZpZ1ZhbHVlKGtleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnW2tleV0gOiBudWxsO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEZyYW1lVmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUsIGR0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENvbmZpZ1ZhbHVlKGtleSwgZGVmYXVsdFZhbHVlKSAqIGR0ICogNjA7XHJcbiAgICB9XHJcblxyXG4gICAgX3R1cm5EaXJUbyh0YXJnZXREaXIsIGR0KSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXREaXIgfHwgdGFyZ2V0RGlyLm1hZ1NxcigpIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZyb21BbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKTtcclxuICAgICAgICBsZXQgdG9BbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGFyZ2V0RGlyKTtcclxuICAgICAgICBsZXQgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG5cclxuICAgICAgICBpZiAoZGlzQW5nbGUgPiAxODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlICsgMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLTE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgLSAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXhUdXJuQW5nbGUgPSB0aGlzLl9nZXRGcmFtZVZhbHVlKFwiQW5ndWxhclNwZWVkXCIsIDEwLCBkdCk7XHJcbiAgICAgICAgaWYgKG1heFR1cm5BbmdsZSA8PSAwIHx8IE1hdGguYWJzKGRpc0FuZ2xlKSA8PSBtYXhUdXJuQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlyID0gdGFyZ2V0RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV4dEFuZ2xlID0gZnJvbUFuZ2xlICsgKGRpc0FuZ2xlID4gMCA/IG1heFR1cm5BbmdsZSA6IC1tYXhUdXJuQW5nbGUpO1xyXG4gICAgICAgIHRoaXMuX2RpciA9IFV0aWxzLmRlZ3Jlc3NUb1ZlY3RvcnMoVXRpbHMuY29ycmVjdGlvbkFuZ2xlKG5leHRBbmdsZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDojrflj5bnorDmkp7lkI7nmoTlsJ3or5XmlrnlkJFcclxuICAgIF9nZXRUZXN0RGlyKFAscmFkaXVzLGRpcixjb2xsaWRlckl0ZW1zKXtcclxuICAgICAgICBsZXQgdGVzdERpcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy/ojrflj5blsJ3or5XmlrnlkJFcclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcImVuZW15XCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLCAzMCAqIGkpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsIC0zMCAqIGkpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvL+aMieacgOS8mOiOt+WPllxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbGxpZGVySXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlckl0ZW0gPSBjb2xsaWRlckl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0VGVzdERpcnMoUCxkaXIsY29sbGlkZXJJdGVtLHRlc3REaXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mo4DmtYvlsJ3or5XmlrnlkJFcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlc3REaXJzLmxlbmd0aDsgaSsrKSB7IFxyXG4gICAgICAgICAgICBsZXQgdGVzdERpciA9IHRlc3REaXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2lyY2xlUGFzc0NvbGxpZGVySXRlbXMoUCxyYWRpdXMsdGVzdERpcixjb2xsaWRlckl0ZW1zKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdERpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ngrlw5Li65ZyG5b+DLHJhZGl1c+S4uuWNiuW+hCzmlrnlkJFkaXLnmoTlnIYs5piv5ZCm5Lya57uP6L+HY29sbGlkZXJJdGVtc+S4reeahOS4gOadoee6v+autVxyXG4gICAgX2NpcmNsZVBhc3NDb2xsaWRlckl0ZW1zKFAscmFkaXVzLGRpcixjb2xsaWRlckl0ZW1zKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbGxpZGVySXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGVySXRlbSA9IGNvbGxpZGVySXRlbXNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVySXRlbS5jb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVySXRlbS5jb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgICAgICBsZXQgQiA9IGNvbGxpZGVySXRlbS5jb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVySXRlbS5jb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMuY2lyY2xlUGFzc0xpbmUoUCxyYWRpdXMsZGlyLEEsQikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lsITnur/otbflp4vngrlQLOaWueWQkWRpcizkuI7nur/mrrVBQihjb2xsaWRlckl0ZW3nu4TmiJAp56Kw5pKe5ZCO55qE5bCd6K+V5pa55ZCR5YiX6KGoXHJcbiAgICBfZ2V0VGVzdERpcnMoUCxkaXIsY29sbGlkZXJJdGVtLHJldERpcnMpe1xyXG4gICAgICAgIGxldCBQMSA9IGNvbGxpZGVySXRlbS5wb2ludDsgICAgLy9jb2xsaWRlcuS4iui3neemu1DmnIDov5HnmoTngrlcclxuICAgICAgICBsZXQgZGlyUFAxID0gUDEuc3ViKFApLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCByYWRpYW5QUDEgPSBjYy52MihkaXJQUDEpLnNpZ25BbmdsZShkaXIpOyAgICAvLyDmsYLmlrnlkJHlkJHph4/kuI7lr7nmr5TlkJHph4/pl7TnmoTlvKfluqZcclxuXHJcbiAgICAgICAgbGV0IGJhc2VEaXIgPSBkaXI7XHJcbiAgICAgICAgbGV0IG1heERpciA9IHJhZGlhblBQMSA+IDAgPyBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCA5MCkgOiBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCAtOTApO1xyXG4gICAgICAgIGxldCBwYXJhbGxlbERlZ3JlZSA9IHRoaXMuX2dldFBhcmFsbGVsRGVncmVlKGJhc2VEaXIsbWF4RGlyLGNvbGxpZGVySXRlbS5jb2xsaWRlcik7XHJcbiAgICAgICAgbGV0IHN5bWJvbCA9IHJhZGlhblBQMSA+IDAgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0RGVncmVlID0gaSAqIDE1ICogc3ltYm9sO1xyXG4gICAgICAgICAgICBpZiAocGFyYWxsZWxEZWdyZWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzeW1ib2wgPiAwICYmIHBhcmFsbGVsRGVncmVlIDwgb2Zmc2V0RGVncmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCBwYXJhbGxlbERlZ3JlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGVsRGVncmVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN5bWJvbCA8IDAgJiYgcGFyYWxsZWxEZWdyZWUgPiBvZmZzZXREZWdyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIHBhcmFsbGVsRGVncmVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXREaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsZWxEZWdyZWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoYmFzZURpciwgb2Zmc2V0RGVncmVlKTtcclxuICAgICAgICAgICAgcmV0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blubPooYzkuo5jb2xsaWRlcizkuJTljIXlkKvlnKhiYXNlRGVncmVlLG1heERlZ3JlZeeahOinkuW6pijnm7jlr7liYXNlRGlyKVxyXG4gICAgX2dldFBhcmFsbGVsRGVncmVlKGJhc2VEaXIsbWF4RGlyLGNvbGxpZGVyKXtcclxuICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICBsZXQgQiA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzFdKTtcclxuICAgICAgICBsZXQgQUIgPSBCLnN1YihBKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgQkEgPSBBLnN1YihCKS5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhZGlhbk1heCA9IG1heERpci5zaWduQW5nbGUoYmFzZURpcik7XHJcbiAgICAgICAgbGV0IHJhZGlhbkFCID0gQUIuc2lnbkFuZ2xlKGJhc2VEaXIpO1xyXG4gICAgICAgIGxldCByYWRpYW5CQSA9IEJBLnNpZ25BbmdsZShiYXNlRGlyKTtcclxuXHJcbiAgICAgICAgaWYgKHJhZGlhbk1heCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHJhZGlhbkFCID4gMCAmJiByYWRpYW5BQiA8IHJhZGlhbk1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuQUIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYWRpYW5CQSA+IDAgJiYgcmFkaWFuQkEgPCByYWRpYW5NYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhbkJBKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyYWRpYW5NYXggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChyYWRpYW5BQiA8IDAgJiYgcmFkaWFuQUIgPiByYWRpYW5NYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhbkFCKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmFkaWFuQkEgPCAwICYmIHJhZGlhbkJBID4gcmFkaWFuTWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5CQSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yi35paw546p5a626KeS5bqmXHJcbiAgICBfcmVmcmVzaEFuZ2xlKGR0ID0gMSAvIDYwLCBzbW9vdGhCb2R5ID0gdHJ1ZSl7XHJcbiAgICAgICAgLy/liqjmgIHkv67mlLlwbGF5ZXLop5LluqZcclxuICAgICAgICBsZXQgZnJvbUFuZ2xlID0gdGhpcy5fZmlyZS5fbHlCZy5hbmdsZTtcclxuICAgICAgICBsZXQgdG9BbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKTtcclxuICAgICAgICBsZXQgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG5cclxuICAgICAgICAvL+S9v+W9k+WJjeinkuW6puWSjOebruagh+inkuW6puWkhOS6juWQjOS4gOS4que7tOW6pizku6Xkvr/nrpflh7rmnaXnmoTlgY/np7vop5LluqbmmK/mnIDlsI/nmoRcclxuICAgICAgICBpZiAoZGlzQW5nbGUgPiAxODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlICsgMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLTE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgLSAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXhUdXJuQW5nbGUgPSB0aGlzLl9nZXRGcmFtZVZhbHVlKFwiQW5ndWxhclNwZWVkXCIsIDEwLCBkdCk7XHJcbiAgICAgICAgaWYgKHNtb290aEJvZHkgPT0gZmFsc2UgfHwgbWF4VHVybkFuZ2xlIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRvQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlID4gbWF4VHVybkFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgPSB0aGlzLl9maXJlLl9seUJnLmFuZ2xlICsgbWF4VHVybkFuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkaXNBbmdsZSA8IC1tYXhUdXJuQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgLSBtYXhUdXJuQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgPSB0b0FuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kv67mraPop5LluqblnKgtMTgwfjE4MOiMg+WbtOWGhVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgPSBVdGlscy5jb3JyZWN0aW9uQW5nbGUodGhpcy5fZmlyZS5fbHlCZy5hbmdsZSk7XHJcblxyXG5cclxuICAgICAgICAvL+iwg+aVtOeCrueuoeinkuW6plxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9iYXJyZWxEaXIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iiq+aUu+WHu+WIsCgpXHJcbiAgICBiZUhpdChkYW1hZ2Upe1xyXG4gICAgICAgIC8vIGNjLmxvZyhcImVuZW15IGJlaGl0XCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcInBsYXllclwiKSB7XHJcbiAgICAgICAgICAgIGxldCBhPSAxO1xyXG4gICAgICAgICAgICAvLyBkYW1hZ2UgPSAxMDAwMDAwMDAwMDAwMDAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGE9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6K6h566X5Lyk5a6zXHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlIC0gdGhpcy5fZGVmO1xyXG4gICAgICAgIGlmIChkYW1hZ2UgPCAwKSB7IGRhbWFnZSA9IDA7fVxyXG5cclxuICAgICAgICAvL+iuoeeul+acgOaWsOihgOmHj1xyXG4gICAgICAgIHRoaXMuX2hwIC09IGRhbWFnZTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPCAwKSB7IHRoaXMuX2hwID0gMDt9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/orqHnrpfooYDph4/mnaHmmL7npLrnmb7liIbnmb5cclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6KGA6YeP562J5LqOMCzov5vlhaXmrbvkuqHpgLvovpFcclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K6h566X6KGA6YeP5p2h5pi+56S655m+5YiG55m+XHJcbiAgICByZWZyZXNoSHAoKXtcclxuICAgICAgICBsZXQgcGVyY2VudCA9IHRoaXMuX2hwL3RoaXMuX21heEhwO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gcGVyY2VudDtcclxuICAgICAgICB0aGlzLl9zeW5jTG93SHBWaXN1YWxTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTG93SHAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwID4gMCAmJiB0aGlzLl9tYXhIcCA+IDAgJiYgdGhpcy5faHAgLyB0aGlzLl9tYXhIcCA8PSBMT1dfSFBfUkFUSU87XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTG93SHBWaXN1YWwoZHQpIHtcclxuICAgICAgICB0aGlzLl9zeW5jTG93SHBWaXN1YWxTdGF0ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG93SHAoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMb3dIcFNtb2tlKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fY2xlYXJMb3dIcFNtb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zeW5jTG93SHBWaXN1YWxTdGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0xvd0hwKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRMb3dIcEJhckVmZmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTG93SHBCYXJFZmZlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0TG93SHBCYXJFZmZlY3QoKSB7XHJcbiAgICAgICAgbGV0IGxpZmViYXIgPSB0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX2xpZmViYXI7XHJcbiAgICAgICAgaWYgKCFsaWZlYmFyIHx8ICFjYy5pc1ZhbGlkKGxpZmViYXIpIHx8IHRoaXMuX2xvd0hwQmFyRnhQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvd0hwQmFyRnhQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9sb3dIcEJhckJhc2VQb3NpdGlvbiA9IGNjLnYzKGxpZmViYXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBiYXNlUG9zID0gdGhpcy5fbG93SHBCYXJCYXNlUG9zaXRpb247XHJcbiAgICAgICAgbGlmZWJhci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGxpZmViYXIub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBsaWZlYmFyLnBvc2l0aW9uID0gYmFzZVBvcztcclxuICAgICAgICBsaWZlYmFyLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2MucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4yLCAxMzUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjA1LCBiYXNlUG9zLnggKyA0LCBiYXNlUG9zLnkgKyAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjA1LCBiYXNlUG9zLnggLSA0LCBiYXNlUG9zLnkgLSAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjA1LCBiYXNlUG9zLnggKyAyLCBiYXNlUG9zLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMDUsIGJhc2VQb3MueCwgYmFzZVBvcy55KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC41LCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjMpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdG9wTG93SHBCYXJFZmZlY3QoKSB7XHJcbiAgICAgICAgbGV0IGxpZmViYXIgPSB0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX2xpZmViYXI7XHJcbiAgICAgICAgaWYgKCFsaWZlYmFyIHx8ICFjYy5pc1ZhbGlkKGxpZmViYXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvd0hwQmFyRnhQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpZmViYXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBsaWZlYmFyLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwQmFyQmFzZVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGxpZmViYXIucG9zaXRpb24gPSB0aGlzLl9sb3dIcEJhckJhc2VQb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG93SHBCYXJGeFBsYXlpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTG93SHBTbW9rZShkdCkge1xyXG4gICAgICAgIHRoaXMuX2xvd0hwU21va2VUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcFNtb2tlVGltZSA8IDAuMzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG93SHBTbW9rZVRpbWUgPSAwO1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5fZW5zdXJlTG93SHBTbW9rZVJvb3QoKTtcclxuICAgICAgICBpZiAoIXJvb3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNtb2tlID0gbmV3IGNjLk5vZGUoXCJfbG93SHBTbW9rZVwiKTtcclxuICAgICAgICBzbW9rZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHNtb2tlLnpJbmRleCA9IDgwO1xyXG4gICAgICAgIHNtb2tlLm9wYWNpdHkgPSAxMTA7XHJcbiAgICAgICAgc21va2UucG9zaXRpb24gPSBjYy52MygoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxOCwgMTIgKyBNYXRoLnJhbmRvbSgpICogOCk7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IHNtb2tlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMTIwLCAxMjAsIDEyMCwgMTcwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgNyArIE1hdGgucmFuZG9tKCkgKiA0KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBkcmlmdFggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyMDtcclxuICAgICAgICBsZXQgZHJpZnRZID0gMzIgKyBNYXRoLnJhbmRvbSgpICogMTQ7XHJcbiAgICAgICAgc21va2Uuc2NhbGUgPSAwLjU1ICsgTWF0aC5yYW5kb20oKSAqIDAuMjtcclxuICAgICAgICBzbW9rZS5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KDEuMSwgZHJpZnRYLCBkcmlmdFkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMS4xLCAxLjI1ICsgTWF0aC5yYW5kb20oKSAqIDAuMjUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMS4xKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBfZW5zdXJlTG93SHBTbW9rZVJvb3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwU21va2VSb290ICYmIGNjLmlzVmFsaWQodGhpcy5fbG93SHBTbW9rZVJvb3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb3dIcFNtb2tlUm9vdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvd0hwU21va2VSb290ID0gbmV3IGNjLk5vZGUoXCJfbG93SHBTbW9rZVJvb3RcIik7XHJcbiAgICAgICAgdGhpcy5fbG93SHBTbW9rZVJvb3QucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHRoaXMuX2xvd0hwU21va2VSb290LnNldFBvc2l0aW9uKDAsIDQpO1xyXG4gICAgICAgIHRoaXMuX2xvd0hwU21va2VSb290LnpJbmRleCA9IDkwO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb3dIcFNtb2tlUm9vdDtcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJMb3dIcFNtb2tlKCkge1xyXG4gICAgICAgIHRoaXMuX2xvd0hwU21va2VUaW1lID0gMDtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBTbW9rZVJvb3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9sb3dIcFNtb2tlUm9vdCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG93SHBTbW9rZVJvb3QuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb3dIcFNtb2tlUm9vdCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/miafooYzmrbvkuqFcclxuICAgIGRvRGVhdGgoKXtcclxuICAgICAgICB0aGlzLl9zdG9wTG93SHBCYXJFZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9jbGVhckxvd0hwU21va2UoKTtcclxuICAgICAgICBsZXQgYm9vbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYm9vbVByZWZhYik7XHJcbiAgICAgICAgYm9vbS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGJvb20ucG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgYm9vbS56SW5kZXggPSAxMDAwO1xyXG5cclxuICAgICAgICBsZXQgYW5pID0gYm9vbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBhbmkucGxheShcImJvb20yXCIpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYm9vbVwiKTtcclxuICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==