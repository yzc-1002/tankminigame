"use strict";
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