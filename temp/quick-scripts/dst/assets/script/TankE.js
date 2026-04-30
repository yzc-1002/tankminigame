
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
var DEATH_AFTERMATH_DURATION = 5;
var DEATH_AFTERMATH_FADE_IN = 0.12;
var DEATH_AFTERMATH_FADE_OUT = 0.45;
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
    Tank.prototype._spawnDeathAftermathAt = function (pos, parentNode) {
        if (parentNode === void 0) { parentNode = null; }
        var targetParent = parentNode;
        if (!targetParent || !cc.isValid(targetParent)) {
            targetParent = this._getDeathAftermathParent();
        }
        if (!targetParent || !cc.isValid(targetParent)) {
            return;
        }
        var root = new cc.Node("_deathAftermath");
        root.parent = targetParent;
        root.setPosition(cc.v3(pos));
        root.zIndex = this._getDeathAftermathZIndex(pos.y);
        var scorch = this._createDeathScorchNode();
        scorch.parent = root;
        var flameRoot = new cc.Node("_deathFlameRoot");
        flameRoot.parent = root;
        flameRoot.zIndex = 2;
        for (var i = 0; i < 4; i++) {
            this._createDeathFlame(flameRoot, i);
        }
        var smokeRoot = new cc.Node("_deathSmokeRoot");
        smokeRoot.parent = root;
        smokeRoot.zIndex = 3;
        for (var i = 0; i < 3; i++) {
            this._createDeathSmoke(smokeRoot, i);
        }
        root.runAction(cc.sequence(cc.delayTime(DEATH_AFTERMATH_DURATION), cc.removeSelf()));
    };
    Tank.prototype._getDeathAftermathParent = function () {
        if (this._map && this._map._fire && this._map._fire._tmLayerObstacle
            && cc.isValid(this._map._fire._tmLayerObstacle)) {
            return this._map._fire._tmLayerObstacle;
        }
        if (this.node.parent && cc.isValid(this.node.parent)) {
            return this.node.parent;
        }
        return null;
    };
    Tank.prototype._getDeathAftermathZIndex = function (y) {
        if (this._map && this._map.judgezIndex) {
            return this._map.judgezIndex(y) - 2;
        }
        return this.node.zIndex - 2;
    };
    Tank.prototype._createDeathScorchNode = function () {
        var scorch = new cc.Node("_deathScorch");
        scorch.opacity = 0;
        scorch.angle = Math.random() * 360;
        var main = new cc.Node("_deathScorchMain");
        main.parent = scorch;
        main.scaleX = 1.9;
        main.scaleY = 0.95;
        var mainGraphics = main.addComponent(cc.Graphics);
        mainGraphics.fillColor = cc.color(28, 24, 24, 155);
        mainGraphics.circle(0, 0, 26);
        mainGraphics.fill();
        var side = new cc.Node("_deathScorchSide");
        side.parent = scorch;
        side.setPosition(18, -6);
        side.scaleX = 1.2;
        side.scaleY = 0.7;
        var sideGraphics = side.addComponent(cc.Graphics);
        sideGraphics.fillColor = cc.color(20, 18, 18, 100);
        sideGraphics.circle(0, 0, 18);
        sideGraphics.fill();
        scorch.runAction(cc.sequence(cc.fadeTo(DEATH_AFTERMATH_FADE_IN, 210), cc.delayTime(DEATH_AFTERMATH_DURATION - DEATH_AFTERMATH_FADE_IN - DEATH_AFTERMATH_FADE_OUT), cc.fadeOut(DEATH_AFTERMATH_FADE_OUT)));
        return scorch;
    };
    Tank.prototype._createDeathFlame = function (parentNode, index) {
        var wrapper = new cc.Node("_deathFlameWrap" + index);
        wrapper.parent = parentNode;
        wrapper.opacity = 0;
        wrapper.setPosition((index - 1.5) * 14 + (Math.random() - 0.5) * 8, -2 + Math.random() * 10);
        var flame = new cc.Node("_deathFlame" + index);
        flame.parent = wrapper;
        flame.scale = 0.8 + Math.random() * 0.3;
        var outer = flame.addComponent(cc.Graphics);
        outer.fillColor = cc.color(255, 110 + Math.floor(Math.random() * 40), 40, 220);
        outer.moveTo(0, 26);
        outer.bezierCurveTo(12, 14, 14, -2, 0, -16);
        outer.bezierCurveTo(-14, -2, -12, 14, 0, 26);
        outer.fill();
        outer.fillColor = cc.color(255, 220, 110, 235);
        outer.moveTo(0, 16);
        outer.bezierCurveTo(6, 10, 8, 0, 0, -10);
        outer.bezierCurveTo(-8, 0, -6, 10, 0, 16);
        outer.fill();
        var swayX = (Math.random() - 0.5) * 8;
        var baseScale = flame.scale;
        flame.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.moveTo(0.24, swayX, 3 + Math.random() * 4), cc.scaleTo(0.24, baseScale * 1.08)), cc.spawn(cc.moveTo(0.28, -swayX * 0.45, -1), cc.scaleTo(0.28, baseScale * 0.92)))));
        wrapper.runAction(cc.sequence(cc.delayTime(index * 0.04), cc.fadeTo(0.1, 255), cc.delayTime(DEATH_AFTERMATH_DURATION - 0.8 - index * 0.04), cc.fadeOut(0.35)));
    };
    Tank.prototype._createDeathSmoke = function (parentNode, index) {
        var smoke = new cc.Node("_deathSmoke" + index);
        smoke.parent = parentNode;
        smoke.opacity = 0;
        smoke.scale = 0.55 + Math.random() * 0.15;
        smoke.setPosition((Math.random() - 0.5) * 16, 12 + index * 4);
        var graphics = smoke.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(65, 65, 65, 120);
        graphics.circle(0, 0, 11 + Math.random() * 3);
        graphics.fill();
        var driftX = (Math.random() - 0.5) * 28;
        var driftY = 36 + Math.random() * 14;
        smoke.runAction(cc.sequence(cc.delayTime(index * 0.22), cc.spawn(cc.fadeTo(0.12, 160), cc.moveBy(0.12, cc.v2(0, 4))), cc.spawn(cc.moveBy(1.15 + Math.random() * 0.2, cc.v2(driftX, driftY)), cc.scaleTo(1.15 + Math.random() * 0.2, smoke.scale * 1.7), cc.fadeOut(1.15 + Math.random() * 0.2)), cc.removeSelf()));
    };
    //执行死亡
    Tank.prototype.doDeath = function () {
        this._stopLowHpBarEffect();
        this._clearLowHpSmoke();
        Utils_1.Utils.vibrate();
        if (this._map && this._map.playKillExplosionEffectAt) {
            this._map.playKillExplosionEffectAt(cc.v2(this.node.position));
        }
        else {
            MusicManager_1.MusicManager.playEffect("boom");
            if (this._map && this._map.playLightScreenShake) {
                this._map.playLightScreenShake();
            }
        }
        this._spawnDeathAftermathAt(this.node.position);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxUYW5rRS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDNUIsMENBQTBDO0FBQ3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQzFDLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUN6QixJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQztBQUNyQyxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUd0QztJQUEwQix3QkFBYTtJQUF2QztRQUFBLHFFQXltQkM7UUF0bUJHLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLFNBQVM7UUFDVCxXQUFLLEdBQVMsRUFBRSxDQUFDLENBQVcsSUFBSTtRQUNoQyxhQUFPLEdBQU8sRUFBRSxDQUFDLENBQVcsUUFBUTtRQUNwQyxVQUFJLEdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3BDLGdCQUFVLEdBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxNQUFNO1FBQ2xDLFlBQU0sR0FBUSxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ2xDLG1CQUFhLEdBQUcsQ0FBQyxDQUFDLENBQVUsUUFBUTtRQUNwQyxVQUFJLEdBQVUsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUV6QyxTQUFHLEdBQVcsQ0FBQyxDQUFDLENBQVksTUFBTTtRQUNsQyxZQUFNLEdBQVEsQ0FBQyxDQUFDLENBQVksUUFBUTtR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LEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFYixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM1QixLQUFLLENBQUMsU0FBUyxDQUNYLEVBQUUsQ0FBQyxhQUFhLENBQ1osRUFBRSxDQUFDLFFBQVEsQ0FDUCxFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUM3QyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQ3JDLEVBQ0QsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUks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LHNCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixhQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNsRTthQUNHO1lBQ0EsMkJBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUNwQztTQUNKO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQXJtQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNTO0lBTnBCLElBQUk7UUFEaEIsT0FBTztPQUNLLElBQUksQ0F5bUJoQjtJQUFELFdBQUM7Q0F6bUJELEFBeW1CQyxDQXptQnlCLDZCQUFhLEdBeW1CdEM7QUF6bUJZLG9CQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuLy/nvZHpobXlrqLmnI0gaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9rZWZ1Lmh0bWxcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IExPV19IUF9SQVRJTyA9IDAuMjtcclxuY29uc3QgREVBVEhfQUZURVJNQVRIX0RVUkFUSU9OID0gNTtcclxuY29uc3QgREVBVEhfQUZURVJNQVRIX0ZBREVfSU4gPSAwLjEyO1xyXG5jb25zdCBERUFUSF9BRlRFUk1BVEhfRkFERV9PVVQgPSAwLjQ1O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFRhbmsgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYm9vbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+enu+WKqCznorDmkp7mo4DmtYtcclxuICAgIF9jYW1wICAgICAgID0gXCJcIjsgICAgICAgICAgIC8v6Zi16JClXHJcbiAgICBfcmFkaXVzICAgICA9IDEwOyAgICAgICAgICAgLy/norDmkp7mo4DmtYvljYrlvoRcclxuICAgIF9kaXIgICAgICAgID0gY2MudjIoMSwwKTsgICAvL+W9k+WJjeihjOi/m+aWueWQkVxyXG4gICAgX2JhcnJlbERpciAgPSBjYy52MigxLDApOyAgIC8v54Ku566h5pa55ZCRXHJcbiAgICBfcmF0aW8gICAgICA9IDA7ICAgICAgICAgICAgLy/lvZPliY3pgJ/njodcclxuICAgIF9jdXJyZW50U3BlZWQgPSAwOyAgICAgICAgICAvL+W9k+WJjeenu+WKqOmAn+W6plxyXG4gICAgX21hcCAgICAgICAgPSBudWxsOyAgICAgICAgIC8vdGlsZSBtYXAg6IqC54K5XHJcblxyXG4gICAgX2hwICAgICAgICAgPSAwOyAgICAgICAgICAgIC8v5b2T5YmN6KGA6YePXHJcbiAgICBfbWF4SHAgICAgICA9IDA7ICAgICAgICAgICAgLy/mnIDlpKfooYDph4/ooYDph49cclxuICAgIF9hdGsgICAgICAgID0gMDsgICAgICAgICAgICAvL+aUu+WHu+WKm1xyXG4gICAgX2RlZiAgICAgICAgPSAwOyAgICAgICAgICAgIC8v6Ziy5b6hXHJcbiAgICBfY29uZmlnOmFueSA9IHt9O1xyXG5cclxuICAgIF90YW5rVHlwZSAgID0gMTsgICAgICAgICAgICAvL+WdpuWFi+exu+Wei1xyXG4gICAgX2N1cnJlbnRCZyAgPSBudWxsO1xyXG4gICAgX2xvd0hwQmFyQmFzZVBvc2l0aW9uID0gbnVsbDtcclxuICAgIF9sb3dIcEJhckZ4UGxheWluZyA9IGZhbHNlO1xyXG4gICAgX2xvd0hwU21va2VSb290ID0gbnVsbDtcclxuICAgIF9sb3dIcFNtb2tlVGltZSA9IDA7XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLm5vZGVbXCIkQ2lyY2xlQ29sbGlkZXJcIl0ucmFkaXVzO1xyXG4gICAgICAgIHRoaXMuX2RpciA9IFV0aWxzLmRlZ3Jlc3NUb1ZlY3RvcnModGhpcy5fZmlyZS5fbHlCZy5hbmdsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iuvue9rnRpbGVkIG1hcFxyXG4gICAgc2V0TWFwKG1hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/orr7nva7lnablhYvnsbvlnotcclxuICAgIHNldFRhbmtUeXBlKHRhbmtUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fdGFua1R5cGUgPSB0YW5rVHlwZTtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB5eXAuY29uZmlnLlRhbmtbdGhpcy5fdGFua1R5cGVdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5fY29uZmlnXCIsdGhpcy5fY29uZmlnKVxyXG5cclxuICAgICAgICAvL+eCrui6q1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQmdcIiArIHRoaXMuX3RhbmtUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v54Ku562SXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQmFycmVsXCIgKyB0aGlzLl90YW5rVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50QmcgPSBjaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5qOA5rWL5Y2K5b6EXHJcbiAgICBnZXRSYWRpdXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueOqeWutueahOaWsOS9jee9rlxyXG4gICAgX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIGRpciwgc3BlZWQpIHtcclxuICAgICAgICBsZXQgZGlzID0gZGlyLm11bChzcGVlZCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJQb3NpdGlvbi5hZGQoZGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q29uZmlnVmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWdba2V5XSA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0RnJhbWVWYWx1ZShrZXksIGRlZmF1bHRWYWx1ZSwgZHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q29uZmlnVmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUpICogZHQgKiA2MDtcclxuICAgIH1cclxuXHJcbiAgICBfdHVybkRpclRvKHRhcmdldERpciwgZHQpIHtcclxuICAgICAgICBpZiAoIXRhcmdldERpciB8fCB0YXJnZXREaXIubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZnJvbUFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xyXG4gICAgICAgIGxldCB0b0FuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0YXJnZXREaXIpO1xyXG4gICAgICAgIGxldCBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcblxyXG4gICAgICAgIGlmIChkaXNBbmdsZSA+IDE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgKyAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzQW5nbGUgPCAtMTgwKSB7XHJcbiAgICAgICAgICAgIGZyb21BbmdsZSA9IGZyb21BbmdsZSAtIDM2MDtcclxuICAgICAgICAgICAgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1heFR1cm5BbmdsZSA9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBbmd1bGFyU3BlZWRcIiwgMTAsIGR0KTtcclxuICAgICAgICBpZiAobWF4VHVybkFuZ2xlIDw9IDAgfHwgTWF0aC5hYnMoZGlzQW5nbGUpIDw9IG1heFR1cm5BbmdsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXIgPSB0YXJnZXREaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0QW5nbGUgPSBmcm9tQW5nbGUgKyAoZGlzQW5nbGUgPiAwID8gbWF4VHVybkFuZ2xlIDogLW1heFR1cm5BbmdsZSk7XHJcbiAgICAgICAgdGhpcy5fZGlyID0gVXRpbHMuZGVncmVzc1RvVmVjdG9ycyhVdGlscy5jb3JyZWN0aW9uQW5nbGUobmV4dEFuZ2xlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOiOt+WPlueisOaSnuWQjueahOWwneivleaWueWQkVxyXG4gICAgX2dldFRlc3REaXIoUCxyYWRpdXMsZGlyLGNvbGxpZGVySXRlbXMpe1xyXG4gICAgICAgIGxldCB0ZXN0RGlycyA9IFtdO1xyXG5cclxuICAgICAgICAvL+iOt+WPluWwneivleaWueWQkVxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwiZW5lbXlcIikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsIDMwICogaSk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwgLTMwICogaSk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8v5oyJ5pyA5LyY6I635Y+WXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sbGlkZXJJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVySXRlbSA9IGNvbGxpZGVySXRlbXNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRUZXN0RGlycyhQLGRpcixjb2xsaWRlckl0ZW0sdGVzdERpcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+ajgOa1i+WwneivleaWueWQkVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdERpcnMubGVuZ3RoOyBpKyspIHsgXHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gdGVzdERpcnNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaXJjbGVQYXNzQ29sbGlkZXJJdGVtcyhQLHJhZGl1cyx0ZXN0RGlyLGNvbGxpZGVySXRlbXMpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0RGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eCuXDkuLrlnIblv4MscmFkaXVz5Li65Y2K5b6ELOaWueWQkWRpcueahOWchizmmK/lkKbkvJrnu4/ov4djb2xsaWRlckl0ZW1z5Lit55qE5LiA5p2h57q/5q61XHJcbiAgICBfY2lyY2xlUGFzc0NvbGxpZGVySXRlbXMoUCxyYWRpdXMsZGlyLGNvbGxpZGVySXRlbXMpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sbGlkZXJJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXJJdGVtID0gY29sbGlkZXJJdGVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBBID0gY29sbGlkZXJJdGVtLmNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXJJdGVtLmNvbGxpZGVyLnBvaW50c1swXSk7XHJcbiAgICAgICAgICAgIGxldCBCID0gY29sbGlkZXJJdGVtLmNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXJJdGVtLmNvbGxpZGVyLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5jaXJjbGVQYXNzTGluZShQLHJhZGl1cyxkaXIsQSxCKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WwhOe6v+i1t+Wni+eCuVAs5pa55ZCRZGlyLOS4jue6v+autUFCKGNvbGxpZGVySXRlbee7hOaIkCnnorDmkp7lkI7nmoTlsJ3or5XmlrnlkJHliJfooahcclxuICAgIF9nZXRUZXN0RGlycyhQLGRpcixjb2xsaWRlckl0ZW0scmV0RGlycyl7XHJcbiAgICAgICAgbGV0IFAxID0gY29sbGlkZXJJdGVtLnBvaW50OyAgICAvL2NvbGxpZGVy5LiK6Led56a7UOacgOi/keeahOeCuVxyXG4gICAgICAgIGxldCBkaXJQUDEgPSBQMS5zdWIoUCkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IHJhZGlhblBQMSA9IGNjLnYyKGRpclBQMSkuc2lnbkFuZ2xlKGRpcik7ICAgIC8vIOaxguaWueWQkeWQkemHj+S4juWvueavlOWQkemHj+mXtOeahOW8p+W6plxyXG5cclxuICAgICAgICBsZXQgYmFzZURpciA9IGRpcjtcclxuICAgICAgICBsZXQgbWF4RGlyID0gcmFkaWFuUFAxID4gMCA/IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIDkwKSA6IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIC05MCk7XHJcbiAgICAgICAgbGV0IHBhcmFsbGVsRGVncmVlID0gdGhpcy5fZ2V0UGFyYWxsZWxEZWdyZWUoYmFzZURpcixtYXhEaXIsY29sbGlkZXJJdGVtLmNvbGxpZGVyKTtcclxuICAgICAgICBsZXQgc3ltYm9sID0gcmFkaWFuUFAxID4gMCA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXREZWdyZWUgPSBpICogMTUgKiBzeW1ib2w7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbGxlbERlZ3JlZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN5bWJvbCA+IDAgJiYgcGFyYWxsZWxEZWdyZWUgPCBvZmZzZXREZWdyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIHBhcmFsbGVsRGVncmVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXREaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsZWxEZWdyZWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3ltYm9sIDwgMCAmJiBwYXJhbGxlbERlZ3JlZSA+IG9mZnNldERlZ3JlZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoYmFzZURpciwgcGFyYWxsZWxEZWdyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxlbERlZ3JlZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCBvZmZzZXREZWdyZWUpO1xyXG4gICAgICAgICAgICByZXREaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluW5s+ihjOS6jmNvbGxpZGVyLOS4lOWMheWQq+WcqGJhc2VEZWdyZWUsbWF4RGVncmVl55qE6KeS5bqmKOebuOWvuWJhc2VEaXIpXHJcbiAgICBfZ2V0UGFyYWxsZWxEZWdyZWUoYmFzZURpcixtYXhEaXIsY29sbGlkZXIpe1xyXG4gICAgICAgIGxldCBBID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgIGxldCBCID0gY29sbGlkZXIub2Zmc2V0LmFkZChjb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgIGxldCBBQiA9IEIuc3ViKEEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCBCQSA9IEEuc3ViKEIpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICBsZXQgcmFkaWFuTWF4ID0gbWF4RGlyLnNpZ25BbmdsZShiYXNlRGlyKTtcclxuICAgICAgICBsZXQgcmFkaWFuQUIgPSBBQi5zaWduQW5nbGUoYmFzZURpcik7XHJcbiAgICAgICAgbGV0IHJhZGlhbkJBID0gQkEuc2lnbkFuZ2xlKGJhc2VEaXIpO1xyXG5cclxuICAgICAgICBpZiAocmFkaWFuTWF4ID4gMCkge1xyXG4gICAgICAgICAgICBpZiAocmFkaWFuQUIgPiAwICYmIHJhZGlhbkFCIDwgcmFkaWFuTWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5BQik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJhZGlhbkJBID4gMCAmJiByYWRpYW5CQSA8IHJhZGlhbk1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuQkEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJhZGlhbk1heCA8IDApIHtcclxuICAgICAgICAgICAgaWYgKHJhZGlhbkFCIDwgMCAmJiByYWRpYW5BQiA+IHJhZGlhbk1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuQUIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYWRpYW5CQSA8IDAgJiYgcmFkaWFuQkEgPiByYWRpYW5NYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhbkJBKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liLfmlrDnjqnlrrbop5LluqZcclxuICAgIF9yZWZyZXNoQW5nbGUoZHQgPSAxIC8gNjAsIHNtb290aEJvZHkgPSB0cnVlKXtcclxuICAgICAgICAvL+WKqOaAgeS/ruaUuXBsYXllcuinkuW6plxyXG4gICAgICAgIGxldCBmcm9tQW5nbGUgPSB0aGlzLl9maXJlLl9seUJnLmFuZ2xlO1xyXG4gICAgICAgIGxldCB0b0FuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xyXG4gICAgICAgIGxldCBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcblxyXG4gICAgICAgIC8v5L2/5b2T5YmN6KeS5bqm5ZKM55uu5qCH6KeS5bqm5aSE5LqO5ZCM5LiA5Liq57u05bqmLOS7peS+v+eul+WHuuadpeeahOWBj+enu+inkuW6puaYr+acgOWwj+eahFxyXG4gICAgICAgIGlmIChkaXNBbmdsZSA+IDE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgKyAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzQW5nbGUgPCAtMTgwKSB7XHJcbiAgICAgICAgICAgIGZyb21BbmdsZSA9IGZyb21BbmdsZSAtIDM2MDtcclxuICAgICAgICAgICAgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1heFR1cm5BbmdsZSA9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBbmd1bGFyU3BlZWRcIiwgMTAsIGR0KTtcclxuICAgICAgICBpZiAoc21vb3RoQm9keSA9PSBmYWxzZSB8fCBtYXhUdXJuQW5nbGUgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJnLmFuZ2xlID0gdG9BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzQW5nbGUgPiBtYXhUdXJuQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgKyBtYXhUdXJuQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLW1heFR1cm5BbmdsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJnLmFuZ2xlID0gdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSAtIG1heFR1cm5BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRvQW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S/ruato+inkuW6puWcqC0xODB+MTgw6IyD5Zu05YaFXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IFV0aWxzLmNvcnJlY3Rpb25BbmdsZSh0aGlzLl9maXJlLl9seUJnLmFuZ2xlKTtcclxuXHJcblxyXG4gICAgICAgIC8v6LCD5pW054Ku566h6KeS5bqmXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2JhcnJlbERpcik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6KKr5pS75Ye75YiwKClcclxuICAgIGJlSGl0KGRhbWFnZSl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiZW5lbXkgYmVoaXRcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICAgICAgbGV0IGE9IDE7XHJcbiAgICAgICAgICAgIC8vIGRhbWFnZSA9IDEwMDAwMDAwMDAwMDAwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgYT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/orqHnrpfkvKTlrrNcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XHJcbiAgICAgICAgaWYgKGRhbWFnZSA8IDApIHsgZGFtYWdlID0gMDt9XHJcblxyXG4gICAgICAgIC8v6K6h566X5pyA5paw6KGA6YePXHJcbiAgICAgICAgdGhpcy5faHAgLT0gZGFtYWdlO1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHsgdGhpcy5faHAgPSAwO31cclxuICAgICAgICBcclxuICAgICAgICAvL+iuoeeul+ihgOmHj+adoeaYvuekuueZvuWIhueZvlxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ooYDph4/nrYnkuo4wLOi/m+WFpeatu+S6oemAu+i+kVxyXG4gICAgICAgIGlmICh0aGlzLl9ocCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/orqHnrpfooYDph4/mnaHmmL7npLrnmb7liIbnmb5cclxuICAgIHJlZnJlc2hIcCgpe1xyXG4gICAgICAgIGxldCBwZXJjZW50ID0gdGhpcy5faHAvdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSBwZXJjZW50O1xyXG4gICAgICAgIHRoaXMuX3N5bmNMb3dIcFZpc3VhbFN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNMb3dIcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHAgPiAwICYmIHRoaXMuX21heEhwID4gMCAmJiB0aGlzLl9ocCAvIHRoaXMuX21heEhwIDw9IExPV19IUF9SQVRJTztcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVMb3dIcFZpc3VhbChkdCkge1xyXG4gICAgICAgIHRoaXMuX3N5bmNMb3dIcFZpc3VhbFN0YXRlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNMb3dIcCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvd0hwU21va2UoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhckxvd0hwU21va2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3N5bmNMb3dIcFZpc3VhbFN0YXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG93SHAoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydExvd0hwQmFyRWZmZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcEJhckVmZmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRMb3dIcEJhckVmZmVjdCgpIHtcclxuICAgICAgICBsZXQgbGlmZWJhciA9IHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fbGlmZWJhcjtcclxuICAgICAgICBpZiAoIWxpZmViYXIgfHwgIWNjLmlzVmFsaWQobGlmZWJhcikgfHwgdGhpcy5fbG93SHBCYXJGeFBsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG93SHBCYXJGeFBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2xvd0hwQmFyQmFzZVBvc2l0aW9uID0gY2MudjMobGlmZWJhci5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IGJhc2VQb3MgPSB0aGlzLl9sb3dIcEJhckJhc2VQb3NpdGlvbjtcclxuICAgICAgICBsaWZlYmFyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgbGlmZWJhci5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGxpZmViYXIucG9zaXRpb24gPSBiYXNlUG9zO1xyXG4gICAgICAgIGxpZmViYXIucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjIsIDEzNSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMDUsIGJhc2VQb3MueCArIDQsIGJhc2VQb3MueSArIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMDUsIGJhc2VQb3MueCAtIDQsIGJhc2VQb3MueSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMDUsIGJhc2VQb3MueCArIDIsIGJhc2VQb3MueSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC4wNSwgYmFzZVBvcy54LCBiYXNlUG9zLnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjUsIDI1NSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0b3BMb3dIcEJhckVmZmVjdCgpIHtcclxuICAgICAgICBsZXQgbGlmZWJhciA9IHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fbGlmZWJhcjtcclxuICAgICAgICBpZiAoIWxpZmViYXIgfHwgIWNjLmlzVmFsaWQobGlmZWJhcikpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG93SHBCYXJGeFBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlmZWJhci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGxpZmViYXIub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBCYXJCYXNlUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgbGlmZWJhci5wb3NpdGlvbiA9IHRoaXMuX2xvd0hwQmFyQmFzZVBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb3dIcEJhckZ4UGxheWluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVMb3dIcFNtb2tlKGR0KSB7XHJcbiAgICAgICAgdGhpcy5fbG93SHBTbW9rZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwU21va2VUaW1lIDwgMC4zMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb3dIcFNtb2tlVGltZSA9IDA7XHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLl9lbnN1cmVMb3dIcFNtb2tlUm9vdCgpO1xyXG4gICAgICAgIGlmICghcm9vdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc21va2UgPSBuZXcgY2MuTm9kZShcIl9sb3dIcFNtb2tlXCIpO1xyXG4gICAgICAgIHNtb2tlLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgc21va2UuekluZGV4ID0gODA7XHJcbiAgICAgICAgc21va2Uub3BhY2l0eSA9IDExMDtcclxuICAgICAgICBzbW9rZS5wb3NpdGlvbiA9IGNjLnYzKChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDE4LCAxMiArIE1hdGgucmFuZG9tKCkgKiA4KTtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gc21va2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigxMjAsIDEyMCwgMTIwLCAxNzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCA3ICsgTWF0aC5yYW5kb20oKSAqIDQpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGRyaWZ0WCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIwO1xyXG4gICAgICAgIGxldCBkcmlmdFkgPSAzMiArIE1hdGgucmFuZG9tKCkgKiAxNDtcclxuICAgICAgICBzbW9rZS5zY2FsZSA9IDAuNTUgKyBNYXRoLnJhbmRvbSgpICogMC4yO1xyXG4gICAgICAgIHNtb2tlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMS4xLCBkcmlmdFgsIGRyaWZ0WSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbygxLjEsIDEuMjUgKyBNYXRoLnJhbmRvbSgpICogMC4yNSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZU91dCgxLjEpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIF9lbnN1cmVMb3dIcFNtb2tlUm9vdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBTbW9rZVJvb3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9sb3dIcFNtb2tlUm9vdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvd0hwU21va2VSb290O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG93SHBTbW9rZVJvb3QgPSBuZXcgY2MuTm9kZShcIl9sb3dIcFNtb2tlUm9vdFwiKTtcclxuICAgICAgICB0aGlzLl9sb3dIcFNtb2tlUm9vdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgdGhpcy5fbG93SHBTbW9rZVJvb3Quc2V0UG9zaXRpb24oMCwgNCk7XHJcbiAgICAgICAgdGhpcy5fbG93SHBTbW9rZVJvb3QuekluZGV4ID0gOTA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvd0hwU21va2VSb290O1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckxvd0hwU21va2UoKSB7XHJcbiAgICAgICAgdGhpcy5fbG93SHBTbW9rZVRpbWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcFNtb2tlUm9vdCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2xvd0hwU21va2VSb290KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb3dIcFNtb2tlUm9vdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvd0hwU21va2VSb290ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25EZWF0aEFmdGVybWF0aEF0KHBvcywgcGFyZW50Tm9kZSA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAoIXRhcmdldFBhcmVudCB8fCAhY2MuaXNWYWxpZCh0YXJnZXRQYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFBhcmVudCA9IHRoaXMuX2dldERlYXRoQWZ0ZXJtYXRoUGFyZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGFyZ2V0UGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRhcmdldFBhcmVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgY2MuTm9kZShcIl9kZWF0aEFmdGVybWF0aFwiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRhcmdldFBhcmVudDtcclxuICAgICAgICByb290LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIHJvb3QuekluZGV4ID0gdGhpcy5fZ2V0RGVhdGhBZnRlcm1hdGhaSW5kZXgocG9zLnkpO1xyXG5cclxuICAgICAgICBsZXQgc2NvcmNoID0gdGhpcy5fY3JlYXRlRGVhdGhTY29yY2hOb2RlKCk7XHJcbiAgICAgICAgc2NvcmNoLnBhcmVudCA9IHJvb3Q7XHJcblxyXG4gICAgICAgIGxldCBmbGFtZVJvb3QgPSBuZXcgY2MuTm9kZShcIl9kZWF0aEZsYW1lUm9vdFwiKTtcclxuICAgICAgICBmbGFtZVJvb3QucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBmbGFtZVJvb3QuekluZGV4ID0gMjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVEZWF0aEZsYW1lKGZsYW1lUm9vdCwgaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc21va2VSb290ID0gbmV3IGNjLk5vZGUoXCJfZGVhdGhTbW9rZVJvb3RcIik7XHJcbiAgICAgICAgc21va2VSb290LnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgc21va2VSb290LnpJbmRleCA9IDM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlRGVhdGhTbW9rZShzbW9rZVJvb3QsIGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcm9vdC5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKERFQVRIX0FGVEVSTUFUSF9EVVJBVElPTiksXHJcbiAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldERlYXRoQWZ0ZXJtYXRoUGFyZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLl9maXJlICYmIHRoaXMuX21hcC5fZmlyZS5fdG1MYXllck9ic3RhY2xlXHJcbiAgICAgICAgICAgICYmIGNjLmlzVmFsaWQodGhpcy5fbWFwLl9maXJlLl90bUxheWVyT2JzdGFjbGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXAuX2ZpcmUuX3RtTGF5ZXJPYnN0YWNsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQgJiYgY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldERlYXRoQWZ0ZXJtYXRoWkluZGV4KHkpIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5qdWRnZXpJbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHkpIC0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS56SW5kZXggLSAyO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEZWF0aFNjb3JjaE5vZGUoKSB7XHJcbiAgICAgICAgbGV0IHNjb3JjaCA9IG5ldyBjYy5Ob2RlKFwiX2RlYXRoU2NvcmNoXCIpO1xyXG4gICAgICAgIHNjb3JjaC5vcGFjaXR5ID0gMDtcclxuICAgICAgICBzY29yY2guYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogMzYwO1xyXG5cclxuICAgICAgICBsZXQgbWFpbiA9IG5ldyBjYy5Ob2RlKFwiX2RlYXRoU2NvcmNoTWFpblwiKTtcclxuICAgICAgICBtYWluLnBhcmVudCA9IHNjb3JjaDtcclxuICAgICAgICBtYWluLnNjYWxlWCA9IDEuOTtcclxuICAgICAgICBtYWluLnNjYWxlWSA9IDAuOTU7XHJcbiAgICAgICAgbGV0IG1haW5HcmFwaGljcyA9IG1haW4uYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBtYWluR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjgsIDI0LCAyNCwgMTU1KTtcclxuICAgICAgICBtYWluR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI2KTtcclxuICAgICAgICBtYWluR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc2lkZSA9IG5ldyBjYy5Ob2RlKFwiX2RlYXRoU2NvcmNoU2lkZVwiKTtcclxuICAgICAgICBzaWRlLnBhcmVudCA9IHNjb3JjaDtcclxuICAgICAgICBzaWRlLnNldFBvc2l0aW9uKDE4LCAtNik7XHJcbiAgICAgICAgc2lkZS5zY2FsZVggPSAxLjI7XHJcbiAgICAgICAgc2lkZS5zY2FsZVkgPSAwLjc7XHJcbiAgICAgICAgbGV0IHNpZGVHcmFwaGljcyA9IHNpZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBzaWRlR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjAsIDE4LCAxOCwgMTAwKTtcclxuICAgICAgICBzaWRlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE4KTtcclxuICAgICAgICBzaWRlR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBzY29yY2gucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhERUFUSF9BRlRFUk1BVEhfRkFERV9JTiwgMjEwKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShERUFUSF9BRlRFUk1BVEhfRFVSQVRJT04gLSBERUFUSF9BRlRFUk1BVEhfRkFERV9JTiAtIERFQVRIX0FGVEVSTUFUSF9GQURFX09VVCksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KERFQVRIX0FGVEVSTUFUSF9GQURFX09VVClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHNjb3JjaDtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlRGVhdGhGbGFtZShwYXJlbnROb2RlLCBpbmRleCkge1xyXG4gICAgICAgIGxldCB3cmFwcGVyID0gbmV3IGNjLk5vZGUoXCJfZGVhdGhGbGFtZVdyYXBcIiArIGluZGV4KTtcclxuICAgICAgICB3cmFwcGVyLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgd3JhcHBlci5vcGFjaXR5ID0gMDtcclxuICAgICAgICB3cmFwcGVyLnNldFBvc2l0aW9uKChpbmRleCAtIDEuNSkgKiAxNCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDgsIC0yICsgTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgICAgbGV0IGZsYW1lID0gbmV3IGNjLk5vZGUoXCJfZGVhdGhGbGFtZVwiICsgaW5kZXgpO1xyXG4gICAgICAgIGZsYW1lLnBhcmVudCA9IHdyYXBwZXI7XHJcbiAgICAgICAgZmxhbWUuc2NhbGUgPSAwLjggKyBNYXRoLnJhbmRvbSgpICogMC4zO1xyXG5cclxuICAgICAgICBsZXQgb3V0ZXIgPSBmbGFtZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG91dGVyLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMTEwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNDApLCA0MCwgMjIwKTtcclxuICAgICAgICBvdXRlci5tb3ZlVG8oMCwgMjYpO1xyXG4gICAgICAgIG91dGVyLmJlemllckN1cnZlVG8oMTIsIDE0LCAxNCwgLTIsIDAsIC0xNik7XHJcbiAgICAgICAgb3V0ZXIuYmV6aWVyQ3VydmVUbygtMTQsIC0yLCAtMTIsIDE0LCAwLCAyNik7XHJcbiAgICAgICAgb3V0ZXIuZmlsbCgpO1xyXG4gICAgICAgIG91dGVyLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjIwLCAxMTAsIDIzNSk7XHJcbiAgICAgICAgb3V0ZXIubW92ZVRvKDAsIDE2KTtcclxuICAgICAgICBvdXRlci5iZXppZXJDdXJ2ZVRvKDYsIDEwLCA4LCAwLCAwLCAtMTApO1xyXG4gICAgICAgIG91dGVyLmJlemllckN1cnZlVG8oLTgsIDAsIC02LCAxMCwgMCwgMTYpO1xyXG4gICAgICAgIG91dGVyLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHN3YXlYID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogODtcclxuICAgICAgICBsZXQgYmFzZVNjYWxlID0gZmxhbWUuc2NhbGU7XHJcbiAgICAgICAgZmxhbWUucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjI0LCBzd2F5WCwgMyArIE1hdGgucmFuZG9tKCkgKiA0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI0LCBiYXNlU2NhbGUgKiAxLjA4KVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjI4LCAtc3dheVggKiAwLjQ1LCAtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yOCwgYmFzZVNjYWxlICogMC45MilcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB3cmFwcGVyLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoaW5kZXggKiAwLjA0KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoREVBVEhfQUZURVJNQVRIX0RVUkFUSU9OIC0gMC44IC0gaW5kZXggKiAwLjA0KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4zNSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZURlYXRoU21va2UocGFyZW50Tm9kZSwgaW5kZXgpIHtcclxuICAgICAgICBsZXQgc21va2UgPSBuZXcgY2MuTm9kZShcIl9kZWF0aFNtb2tlXCIgKyBpbmRleCk7XHJcbiAgICAgICAgc21va2UucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICBzbW9rZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBzbW9rZS5zY2FsZSA9IDAuNTUgKyBNYXRoLnJhbmRvbSgpICogMC4xNTtcclxuICAgICAgICBzbW9rZS5zZXRQb3NpdGlvbigoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxNiwgMTIgKyBpbmRleCAqIDQpO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBzbW9rZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDY1LCA2NSwgNjUsIDEyMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDExICsgTWF0aC5yYW5kb20oKSAqIDMpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGRyaWZ0WCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI4O1xyXG4gICAgICAgIGxldCBkcmlmdFkgPSAzNiArIE1hdGgucmFuZG9tKCkgKiAxNDtcclxuICAgICAgICBzbW9rZS5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGluZGV4ICogMC4yMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xMiwgMTYwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgY2MudjIoMCwgNCkpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KDEuMTUgKyBNYXRoLnJhbmRvbSgpICogMC4yLCBjYy52MihkcmlmdFgsIGRyaWZ0WSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMS4xNSArIE1hdGgucmFuZG9tKCkgKiAwLjIsIHNtb2tlLnNjYWxlICogMS43KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDEuMTUgKyBNYXRoLnJhbmRvbSgpICogMC4yKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aJp+ihjOatu+S6oVxyXG4gICAgZG9EZWF0aCgpe1xyXG4gICAgICAgIHRoaXMuX3N0b3BMb3dIcEJhckVmZmVjdCgpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyTG93SHBTbW9rZSgpO1xyXG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5S2lsbEV4cGxvc2lvbkVmZmVjdEF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5S2lsbEV4cGxvc2lvbkVmZmVjdEF0KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJvb21cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zcGF3bkRlYXRoQWZ0ZXJtYXRoQXQodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgIH1cclxufVxyXG4iXX0=