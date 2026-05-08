
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/BulletE.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '57473eDU7tGaJ4TPSJC4Ori', 'BulletE');
// script/BulletE.ts

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
exports.Bullet = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var LocalizedData_1 = require("./base/LocalizedData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bulletType = 1; //子弹类型
        _this._bulletLevel = 1; //子弹等级
        _this._map = null; //tile map 节点
        _this._dir = cc.v2(1, 0); //当前行进方向
        _this._speed = 5;
        _this._gunshot = 10; //射程
        _this._damage = 0; //攻击力
        _this._destroyTime = -1; //销毁时间
        _this._camp = ""; //阵营(player/enemy)
        _this._inGame = false;
        _this._damageType = "normal"; //伤害类型(normal/crit)
        _this._mutationType = "";
        _this._mutationData = null;
        _this._bounceLeft = 0;
        _this._penetrateLeft = 0;
        _this._hitTargetIds = {};
        _this._portalIgnoreId = "";
        _this._portalIgnoreTime = 0;
        _this._centrifugalState = null;
        _this._centrifugalUsed = false;
        _this._damageDoubleUsed = false;
        _this._speedDoubleUsed = false;
        _this._spreadBulletUsed = false;
        _this._currenBullet = null;
        _this._isStop = false;
        return _this;
    }
    Bullet_1 = Bullet;
    //加载完成
    Bullet.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化事件
        this._initEvent();
    };
    Bullet.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    Bullet.prototype._initVariable = function () {
        this._fire._sprBoom.active = false;
        this._fire._sprBoom.opacity = 0;
        this._fire._sprBoom.scale = 0;
    };
    //初始化事件
    Bullet.prototype._initEvent = function () {
    };
    //销毁事件
    Bullet.prototype._destroyEvent = function () {
    };
    //初始化子弹(方向/射程/伤害值/速度/阵营/当前关卡)
    Bullet.prototype.initBullet = function (dir, gunshot, atk, speed, camp, levelId, bulletType, mutationData) {
        if (bulletType === void 0) { bulletType = null; }
        if (mutationData === void 0) { mutationData = null; }
        this._dir = dir;
        this._gunshot = gunshot;
        this._speed = speed;
        this._damage = atk;
        this._camp = camp;
        this._damageType = "normal";
        this._destroyTime = this._gunshot / this._speed / 60;
        this._mutationType = "";
        this._mutationData = null;
        this._bounceLeft = 0;
        this._penetrateLeft = 0;
        this._hitTargetIds = {};
        this._portalIgnoreId = "";
        this._portalIgnoreTime = 0;
        this._centrifugalState = null;
        this._centrifugalUsed = false;
        this._damageDoubleUsed = false;
        this._speedDoubleUsed = false;
        this._spreadBulletUsed = false;
        //子弹类型
        if (camp == "enemy") {
            this._bulletType = 0;
            this._bulletLevel = levelId;
        }
        else if (bulletType != null) {
            this._bulletType = bulletType;
            this._bulletLevel = LocalizedData_1.LocalizedData.getIntItem("_bullet_" + this._bulletType + "_", 1);
        }
        else {
            this._bulletType = LocalizedData_1.LocalizedData.getIntItem("_current_bullet_type_", 1);
            this._bulletLevel = LocalizedData_1.LocalizedData.getIntItem("_bullet_" + this._bulletType + "_", 1);
        }
        //子弹杀害加成（暴击概率）
        var bulletConfigs = yyp.config && yyp.config.Bullet ? yyp.config.Bullet : {};
        var config = bulletConfigs[this._bulletType];
        if (config && config.ATK != null) {
            this._damage += config.ATK * (this._bulletLevel + 1);
        }
        if (this._camp == "player" && Math.random() < 0.1) {
            this._damage *= 2;
            this._damageType = "crit";
        }
        this._inGame = true;
        this.setBulletType(this._bulletType);
        this._applyMutationData(mutationData);
    };
    Bullet.prototype.setBulletType = function (type) {
        var _this = this;
        this._bulletType = type;
        this._currenBullet = null;
        //子弹
        this.node.children.forEach(function (child) {
            if (child.name != "_sprBullet" + _this._bulletType) {
                child.active = false;
            }
            else {
                child.active = true;
                _this._currenBullet = child;
            }
        });
        if (this._currenBullet == null) {
            this._currenBullet = this._createDefaultBullet(type);
        }
        if ((type == 99 || type == 100) && this._currenBullet) {
            if (type == 100) {
                this._currenBullet.setScale(1.05);
                this._currenBullet.color = cc.color(85, 58, 30, 255);
                this._currenBullet.opacity = 240;
            }
            else {
                this._currenBullet.setScale(0.85);
                this._currenBullet.color = cc.color(255, 90, 60, 255);
                this._currenBullet.opacity = 255;
            }
        }
        //调整子弹角度
        if (this._inGame) {
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir) - 90;
        }
    };
    Bullet.prototype._applyMutationData = function (mutationData) {
        if (this._camp != "player" || !mutationData || !mutationData.id) {
            return;
        }
        this._mutationType = mutationData.id;
        this._mutationData = mutationData;
        this._bounceLeft = mutationData.bounceCount || 0;
        this._penetrateLeft = mutationData.penetrateCount || 0;
        if (mutationData.damageRatio && mutationData.damageRatio != 1) {
            this._damage *= mutationData.damageRatio;
        }
        this._refreshMutationVisual();
    };
    Bullet.prototype._refreshMutationVisual = function () {
        if (!this._currenBullet || !this._mutationData) {
            return;
        }
        var scale = this._mutationData.scale || 1;
        this._currenBullet.scaleX = Math.abs(this._currenBullet.scaleX) * scale;
        this._currenBullet.scaleY = Math.abs(this._currenBullet.scaleY) * scale;
        if (this._mutationData.color) {
            this._currenBullet.color = this._mutationData.color;
        }
    };
    Bullet.prototype._createDefaultBullet = function (type) {
        var bullet = new cc.Node("_sprBullet" + type);
        bullet.parent = this.node;
        bullet.setContentSize(70, 70);
        var graphics = bullet.addComponent(cc.Graphics);
        if (type == 99) {
            graphics.fillColor = cc.color(255, 55, 35, 240);
            graphics.circle(0, 0, 28);
            graphics.fill();
            graphics.fillColor = cc.color(255, 230, 120, 230);
            graphics.circle(0, 0, 13);
            graphics.fill();
            bullet.scale = 1.4;
        }
        else if (type == 100) {
            graphics.fillColor = cc.color(70, 48, 28, 235);
            graphics.circle(0, 0, 22);
            graphics.fill();
            graphics.fillColor = cc.color(24, 18, 14, 220);
            graphics.circle(-8, 3, 9);
            graphics.fill();
            graphics.circle(10, -4, 11);
            graphics.fill();
            bullet.scale = 1.2;
        }
        else {
            graphics.fillColor = cc.color(255, 240, 0, 240);
            graphics.circle(0, 0, 14);
            graphics.fill();
        }
        return bullet;
    };
    //设置tiled map
    Bullet.prototype.setMap = function (map) {
        this._map = map;
    };
    Bullet.prototype.start = function () {
    };
    //每帧调用
    Bullet.prototype.update = function (dt) {
        if (this._inGame == true && this._isStop == false) {
            if (this._destroyTime != -1) {
                this._destroyTime -= dt;
                if (this._destroyTime <= 0) {
                    if (this._bulletType == 100) {
                        this._landOilSpill(this.node.position);
                        this._destroyImmediately();
                    }
                    else {
                        //销毁
                        this.doDestroy();
                    }
                }
                else {
                    if (this._centrifugalState) {
                        this._updateCentrifugalMotion(dt);
                        return;
                    }
                    if (this._portalIgnoreTime > 0) {
                        this._portalIgnoreTime -= dt;
                        if (this._portalIgnoreTime <= 0) {
                            this._portalIgnoreTime = 0;
                            this._portalIgnoreId = "";
                        }
                    }
                    //更新位置
                    var currPosition = this.node.position;
                    var willPosition = currPosition.add(cc.v3(this._dir.mul(this._speed)));
                    this.node.setPosition(willPosition);
                    if (this._map.isMap()) {
                        if (this._map.tryEnterDamageDoubleArea && this._map.tryEnterDamageDoubleArea(this, currPosition, willPosition)) {
                            return;
                        }
                        if (this._map.tryEnterSpeedDoubleArea && this._map.tryEnterSpeedDoubleArea(this, currPosition, willPosition)) {
                            return;
                        }
                        if (this._map.tryEnterSpreadBulletArea && this._map.tryEnterSpreadBulletArea(this, currPosition, willPosition)) {
                            return;
                        }
                        if (this._map.tryEnterCentrifugalRing && this._map.tryEnterCentrifugalRing(this, currPosition, willPosition)) {
                            return;
                        }
                        if (this._map.tryTeleportBullet && this._map.tryTeleportBullet(this, currPosition, willPosition)) {
                            willPosition = this.node.position;
                            currPosition = willPosition;
                        }
                        if (this._bulletType == 100) {
                            var colliderSegment = this._map.getBulletObstacleCollisionSegment
                                ? this._map.getBulletObstacleCollisionSegment(currPosition, willPosition)
                                : (this._map.bulletObstacleCollisionTest(currPosition, willPosition) ? {} : null);
                            if (colliderSegment) {
                                this._landOilSpill(currPosition);
                                this._destroyImmediately();
                            }
                        }
                        else {
                            if (this._map.tryHandleCoverBulletCollision
                                && this._map.tryHandleCoverBulletCollision(currPosition, willPosition, this)) {
                                return;
                            }
                            //子弹和坦克检测
                            var hitTank = this._map.bulletEnemyCollisionTest(willPosition, this._camp);
                            if (hitTank) {
                                this._handleHitTank(hitTank);
                            }
                            else {
                                //子弹和障碍物检测
                                var colliderSegment = this._map.getBulletObstacleCollisionSegment
                                    ? this._map.getBulletObstacleCollisionSegment(currPosition, willPosition)
                                    : (this._map.bulletObstacleCollisionTest(currPosition, willPosition) ? {} : null);
                                if (colliderSegment) {
                                    this._handleObstacleCollision(currPosition, colliderSegment);
                                }
                                else if (this._map.tryBounceBulletOnObstacle
                                    && this._map.tryBounceBulletOnObstacle(this, currPosition, willPosition)) {
                                    // bounced off pink obstacle
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    //销毁
    Bullet.prototype.doDestroy = function () {
        this._isStop = true;
        if (this._currenBullet) {
            this._currenBullet.active = false;
        }
        this._fire._sprBoom.active = true;
        //爆炸动画
        var self = this;
        this._fire._sprBoom.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.2, 0.5, 0.5)), cc.callFunc(function () {
            //销毁
            self.node.destroy();
        })));
    };
    Bullet.prototype._destroyImmediately = function () {
        this._isStop = true;
        this.node.destroy();
    };
    Bullet.prototype._handleHitTank = function (hitTank) {
        var targetId = hitTank.uuid || hitTank["_id"] || hitTank.name;
        if (this._mutationType == "penetrate" && this._hitTargetIds[targetId]) {
            return;
        }
        hitTank.script.beHit(this._damage, this._damageType);
        if (this._camp == "player" && this._damageType == "crit"
            && this._map.playPlayerCritFeedback) {
            this._map.playPlayerCritFeedback();
        }
        if (this._mutationType == "penetrate" && this._penetrateLeft > 0) {
            this._hitTargetIds[targetId] = true;
            this._penetrateLeft--;
            if (this._penetrateLeft > 0) {
                return;
            }
        }
        this.doDestroy();
    };
    Bullet.prototype._handleObstacleCollision = function (currPosition, colliderSegment) {
        if (this._mutationType == "bounce" && this._bounceLeft > 0 && colliderSegment && colliderSegment.A && colliderSegment.B) {
            this._bounceLeft--;
            this._dir = this._reflectDirectionBySegment(this._dir, colliderSegment.A, colliderSegment.B);
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir) - 90;
            this.node.setPosition(currPosition.add(cc.v3(this._dir.mul(Math.max(6, this._speed * 0.75)))));
            return;
        }
        this.doDestroy();
    };
    Bullet.prototype._landOilSpill = function (pos) {
        if (this._map && this._map.spawnOilSpill) {
            this._map.spawnOilSpill(cc.v2(pos));
        }
    };
    Bullet.prototype._reflectDirectionBySegment = function (dir, A, B) {
        var wallDir = B.sub(A).normalize();
        var normal = cc.v2(-wallDir.y, wallDir.x).normalize();
        var dot = dir.dot(normal);
        var reflectDir = dir.sub(normal.mul(2 * dot));
        if (reflectDir.magSqr() <= 0) {
            return dir.mul(-1);
        }
        return reflectDir.normalize();
    };
    Bullet.prototype.getPortalIgnoreId = function () {
        return this._portalIgnoreId;
    };
    Bullet.prototype.teleportByPortal = function (pos, ignorePortalId) {
        if (ignorePortalId === void 0) { ignorePortalId = ""; }
        this.node.setPosition(cc.v3(pos));
        this._portalIgnoreId = ignorePortalId || "";
        this._portalIgnoreTime = 0.08;
    };
    Bullet.prototype.hasUsedCentrifugalRing = function () {
        return this._centrifugalUsed;
    };
    Bullet.prototype.hasUsedDamageDoubleArea = function () {
        return this._damageDoubleUsed;
    };
    Bullet.prototype.enterDamageDoubleArea = function (areaData) {
        if (this._damageDoubleUsed || !areaData) {
            return false;
        }
        this._damageDoubleUsed = true;
        this._damage *= (areaData.damageMultiplier || 2);
        var scaleUp = areaData.scaleMultiplier || 1.5;
        if (this._currenBullet) {
            this._currenBullet.scaleX = Math.abs(this._currenBullet.scaleX) * scaleUp;
            this._currenBullet.scaleY = Math.abs(this._currenBullet.scaleY) * scaleUp;
        }
        if (this._map && this._map.spawnDamageDoubleFx) {
            this._map.spawnDamageDoubleFx(cc.v2(this.node.position));
        }
        return true;
    };
    Bullet.prototype.hasUsedSpeedDoubleArea = function () {
        return this._speedDoubleUsed;
    };
    Bullet.prototype.enterSpeedDoubleArea = function (areaData) {
        if (this._speedDoubleUsed || !areaData) {
            return false;
        }
        this._speedDoubleUsed = true;
        var speedMul = areaData.speedMultiplier || 3;
        this._speed *= speedMul;
        if (this._currenBullet) {
            this._currenBullet.color = cc.color(80, 180, 255, 255);
        }
        if (this._map && this._map.spawnSpeedDoubleFx) {
            this._map.spawnSpeedDoubleFx(cc.v2(this.node.position));
        }
        return true;
    };
    Bullet.prototype.hasUsedSpreadBulletArea = function () {
        return this._spreadBulletUsed;
    };
    Bullet.prototype.enterSpreadBulletArea = function (areaData) {
        if (this._spreadBulletUsed || !areaData) {
            return false;
        }
        this._spreadBulletUsed = true;
        var spreadAngle = areaData.spreadAngle || 20;
        var parentNode = this.node.parent;
        var map = this._map;
        for (var i = 0; i < 2; i++) {
            var angle = (i == 0 ? -1 : 1) * spreadAngle;
            var bdir = Utils_1.Utils.vectorsRotateDegress(this._dir, angle);
            var bpos = cc.v2(this.node.position).add(bdir.mul(12));
            Bullet_1.createBullet(bpos, bdir, this._gunshot, this._damage, this._speed, this._camp, parentNode, map, this._bulletType, this._mutationData);
        }
        if (this._map && this._map.spawnSpreadBulletFx) {
            this._map.spawnSpreadBulletFx(cc.v2(this.node.position));
        }
        return true;
    };
    Bullet.prototype.enterCentrifugalRing = function (ringData) {
        if (this._centrifugalUsed || this._centrifugalState || !ringData || !ringData.center) {
            return false;
        }
        var center = cc.v2(ringData.center);
        var centerToBullet = cc.v2(this.node.position).sub(center);
        if (centerToBullet.magSqr() <= 1) {
            centerToBullet = this._dir && this._dir.magSqr() > 0
                ? this._dir.normalize().mul(-(ringData.orbitRadius || 72))
                : cc.v2(-(ringData.orbitRadius || 72), 0);
        }
        var startAngle = Math.atan2(centerToBullet.y, centerToBullet.x);
        var directionSign = ringData.directionSign == null ? -1 : ringData.directionSign;
        var rotateAngle = Math.abs(ringData.rotateAngle == null ? Math.PI * 0.5 : ringData.rotateAngle);
        var orbitRadius = ringData.orbitRadius || Math.max(64, centerToBullet.mag());
        var angularSpeed = ringData.angularSpeed || Math.PI * 4.2;
        this._centrifugalState = {
            center: center,
            orbitRadius: orbitRadius,
            startAngle: startAngle,
            currentAngle: startAngle,
            movedAngle: 0,
            rotateAngle: rotateAngle,
            directionSign: directionSign >= 0 ? 1 : -1,
            angularSpeed: angularSpeed,
            speedBoost: ringData.speedBoost || 1.85,
            damageBoost: ringData.damageBoost || 1.7,
            radiusExpand: ringData.radiusExpand || 18,
            color: ringData.color || cc.color(255, 165, 90, 255),
        };
        this._spawnCentrifugalEnterFx();
        return true;
    };
    Bullet.prototype._updateCentrifugalMotion = function (dt) {
        if (!this._centrifugalState) {
            return;
        }
        var state = this._centrifugalState;
        state.movedAngle += state.angularSpeed * dt;
        if (state.movedAngle > state.rotateAngle) {
            state.movedAngle = state.rotateAngle;
        }
        state.currentAngle = state.startAngle + state.directionSign * state.movedAngle;
        var angleProgress = state.rotateAngle > 0 ? state.movedAngle / state.rotateAngle : 1;
        var radius = state.orbitRadius + state.radiusExpand * angleProgress;
        var orbitPos = state.center.add(cc.v2(Math.cos(state.currentAngle), Math.sin(state.currentAngle)).mul(radius));
        this.node.setPosition(cc.v3(orbitPos));
        var tangentDir = state.directionSign > 0
            ? cc.v2(-Math.sin(state.currentAngle), Math.cos(state.currentAngle))
            : cc.v2(Math.sin(state.currentAngle), -Math.cos(state.currentAngle));
        if (tangentDir.magSqr() > 0) {
            this._dir = tangentDir.normalize();
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir) - 90;
        }
        var orbitScale = 1 + 0.24 * angleProgress;
        if (this._currenBullet) {
            this._currenBullet.scaleX = orbitScale;
            this._currenBullet.scaleY = orbitScale;
            this._currenBullet.color = state.color;
        }
        if (state.movedAngle >= state.rotateAngle) {
            this._centrifugalState = null;
            this._centrifugalUsed = true;
            this._speed *= state.speedBoost;
            this._damage *= state.damageBoost;
            this._destroyTime *= 1.35;
            this.node.setPosition(cc.v3(orbitPos.add(this._dir.mul(Math.max(18, this._speed * 0.65)))));
            this._spawnCentrifugalReleaseFx(state.color);
        }
    };
    Bullet.prototype._spawnCentrifugalEnterFx = function () {
        if (!this._map || !this._map.spawnCentrifugalRingFx) {
            return;
        }
        this._map.spawnCentrifugalRingFx(cc.v2(this.node.position), false);
    };
    Bullet.prototype._spawnCentrifugalReleaseFx = function (color) {
        if (!this._map || !this._map.spawnCentrifugalRingFx) {
            return;
        }
        this._map.spawnCentrifugalRingFx(cc.v2(this.node.position), true, color, this._dir, this._speed);
    };
    //创建子弹
    Bullet.createBullet = function (pos, dir, gunshot, atk, speed, camp, parentNode, map, bulletType, mutationData) {
        if (bulletType === void 0) { bulletType = null; }
        if (mutationData === void 0) { mutationData = null; }
        speed = (camp == "enemy") ? speed * 0.8 : speed;
        var bullet = cc.instantiate(map.bulletPrefab);
        bullet.parent = parentNode;
        bullet.setPosition(cc.v3(pos));
        bullet.zIndex = 5000;
        bullet.script.initBullet(dir, gunshot, atk, speed, camp, map._levelId, bulletType, mutationData);
        bullet.script.setMap(map);
        return bullet;
    };
    //创建子弹(类型/位置/方向/炮管长度/射程/攻击力/目标阵营)
    Bullet.createBulletEx = function (bulletType, pos, dir, wipeLen, gunshot, atk, camp, parentNode, map, speed, mutationData) {
        if (speed === void 0) { speed = 8; }
        if (mutationData === void 0) { mutationData = null; }
        gunshot = gunshot - wipeLen;
        var bdir = dir;
        var bpos = pos;
        var bullet = null;
        switch (bulletType) {
            case 1: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData);
                break;
            }
            case 2: {
                for (var i = 0; i <= 1; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 2.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData);
                }
                break;
            }
            case 3: {
                for (var i = 0; i <= 2; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData);
                }
                break;
            }
            case 4: {
                for (var i = 0; i <= 3; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 7.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData);
                }
                break;
            }
            case 5: {
                for (var i = 0; i <= 5; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 12.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData);
                }
                break;
            }
            case 99: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, bulletType, mutationData);
                break;
            }
            case 100: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, bulletType, mutationData);
                break;
            }
            case 11: {
                for (var i = 0; i <= 3; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 90);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, 3, camp, parentNode, map);
                }
                break;
            }
            case 12: {
                for (var i = 0; i < 10; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, 36 * i);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, 1.5, camp, parentNode, map);
                }
                break;
            }
        }
    };
    var Bullet_1;
    Bullet = Bullet_1 = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(BaseComponent_1.BaseComponent));
exports.Bullet = Bullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRFLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTRCLDBCQUFhO0lBQXpDO1FBQUEscUVBcXFCQztRQW5xQkcsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ3RDLGtCQUFZLEdBQU0sQ0FBQyxDQUFDLENBQVksTUFBTTtRQUN0QyxVQUFJLEdBQWMsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUM3QyxVQUFJLEdBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3hDLFlBQU0sR0FBWSxDQUFDLENBQUM7UUFDcEIsY0FBUSxHQUFVLEVBQUUsQ0FBQyxDQUFXLElBQUk7UUFDcEMsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFZLEtBQUs7UUFDckMsa0JBQVksR0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFXLE1BQU07UUFDdEMsV0FBSyxHQUFhLEVBQUUsQ0FBQyxDQUFXLGtCQUFrQjtRQUNsRCxhQUFPLEdBQVcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFXLEdBQU8sUUFBUSxDQUFDLENBQUssbUJBQW1CO1FBQ25ELG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQUssSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQU8sQ0FBQyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUksQ0FBQyxDQUFDO1FBQ3BCLG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0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QUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDekIsSUFBSSxHQUFHLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxNQUFNLEdBQUcsUUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7aUJBQy9FO2dCQUNELE1BQU07YUFDVDtTQUNKO0lBQ0wsQ0FBQzs7SUFucUJRLE1BQU07UUFEbEIsT0FBTztPQUNLLE1BQU0sQ0FxcUJsQjtJQUFELGFBQUM7Q0FycUJELEFBcXFCQyxDQXJxQjJCLDZCQUFhLEdBcXFCeEM7QUFycUJZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vL+engeacieWHveaVsCzor7fkvb/nlKgnXyflvIDlpLRcclxuLy/or7fkv67mlLknTmV3Q2xhc3MnID0+IOiHquW3seeahOexu+WQjVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgX2J1bGxldFR5cGUgICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgX2J1bGxldExldmVsICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueetiee6p1xyXG4gICAgX21hcCAgICAgICAgICAgID0gbnVsbDsgICAgICAgICAvL3RpbGUgbWFwIOiKgueCuVxyXG4gICAgX2RpciAgICAgICAgICAgID0gY2MudjIoMSwwKTsgICAvL+W9k+WJjeihjOi/m+aWueWQkVxyXG4gICAgX3NwZWVkICAgICAgICAgID0gNTtcclxuICAgIF9ndW5zaG90ICAgICAgICA9IDEwOyAgICAgICAgICAgLy/lsITnqItcclxuICAgIF9kYW1hZ2UgICAgICAgICA9IDA7ICAgICAgICAgICAgLy/mlLvlh7vliptcclxuICAgIF9kZXN0cm95VGltZSAgICA9IC0xOyAgICAgICAgICAgLy/plIDmr4Hml7bpl7RcclxuICAgIF9jYW1wICAgICAgICAgICA9IFwiXCI7ICAgICAgICAgICAvL+mYteiQpShwbGF5ZXIvZW5lbXkpXHJcbiAgICBfaW5HYW1lICAgICAgICAgPSBmYWxzZTtcclxuICAgIF9kYW1hZ2VUeXBlICAgICA9IFwibm9ybWFsXCI7ICAgICAvL+S8pOWus+exu+Weiyhub3JtYWwvY3JpdClcclxuICAgIF9tdXRhdGlvblR5cGUgICA9IFwiXCI7XHJcbiAgICBfbXV0YXRpb25EYXRhICAgPSBudWxsO1xyXG4gICAgX2JvdW5jZUxlZnQgICAgID0gMDtcclxuICAgIF9wZW5ldHJhdGVMZWZ0ICA9IDA7XHJcbiAgICBfaGl0VGFyZ2V0SWRzICAgPSB7fTtcclxuICAgIF9wb3J0YWxJZ25vcmVJZCA9IFwiXCI7XHJcbiAgICBfcG9ydGFsSWdub3JlVGltZSA9IDA7XHJcbiAgICBfY2VudHJpZnVnYWxTdGF0ZSA9IG51bGw7XHJcbiAgICBfY2VudHJpZnVnYWxVc2VkID0gZmFsc2U7XHJcbiAgICBfZGFtYWdlRG91YmxlVXNlZCA9IGZhbHNlO1xyXG4gICAgX3NwZWVkRG91YmxlVXNlZCA9IGZhbHNlO1xyXG4gICAgX3NwcmVhZEJ1bGxldFVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBfY3VycmVuQnVsbGV0ICAgPSBudWxsO1xyXG4gICAgX2lzU3RvcCAgICAgICAgID0gZmFsc2U7XHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLnNjYWxlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgX2luaXRFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWtkOW8uSjmlrnlkJEv5bCE56iLL+S8pOWus+WAvC/pgJ/luqYv6Zi16JClL+W9k+WJjeWFs+WNoSlcclxuICAgIGluaXRCdWxsZXQoZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAsbGV2ZWxJZCxidWxsZXRUeXBlID0gbnVsbCwgbXV0YXRpb25EYXRhID0gbnVsbCl7XHJcbiAgICAgICAgdGhpcy5fZGlyID0gZGlyO1xyXG4gICAgICAgIHRoaXMuX2d1bnNob3QgPSBndW5zaG90O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlID0gYXRrO1xyXG4gICAgICAgIHRoaXMuX2NhbXAgPSBjYW1wO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZVR5cGUgPSBcIm5vcm1hbFwiO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lUaW1lID0gdGhpcy5fZ3Vuc2hvdC90aGlzLl9zcGVlZC82MDtcclxuICAgICAgICB0aGlzLl9tdXRhdGlvblR5cGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX211dGF0aW9uRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlTGVmdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcGVuZXRyYXRlTGVmdCA9IDA7XHJcbiAgICAgICAgdGhpcy5faGl0VGFyZ2V0SWRzID0ge307XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRVc2VkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lrZDlvLnnsbvlnotcclxuICAgICAgICBpZiAoY2FtcCA9PSBcImVuZW15XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldExldmVsID0gbGV2ZWxJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYnVsbGV0VHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSBidWxsZXRUeXBlO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRMZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX2J1bGxldF8ke3RoaXMuX2J1bGxldFR5cGV9X2AsMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfY3VycmVudF9idWxsZXRfdHlwZV9cIiwxKTtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9idWxsZXRfJHt0aGlzLl9idWxsZXRUeXBlfV9gLDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lrZDlvLnmnYDlrrPliqDmiJDvvIjmmrTlh7vmpoLnjofvvIlcclxuICAgICAgICBsZXQgYnVsbGV0Q29uZmlncyA9IHl5cC5jb25maWcgJiYgeXlwLmNvbmZpZy5CdWxsZXQgPyB5eXAuY29uZmlnLkJ1bGxldCA6IHt9O1xyXG4gICAgICAgIGxldCBjb25maWcgPSBidWxsZXRDb25maWdzW3RoaXMuX2J1bGxldFR5cGVdO1xyXG4gICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLkFUSyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZSArPSBjb25maWcuQVRLICogKHRoaXMuX2J1bGxldExldmVsICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcInBsYXllclwiICYmIE1hdGgucmFuZG9tKCkgPCAwLjEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlICo9IDI7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZVR5cGUgPSBcImNyaXRcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRCdWxsZXRUeXBlKHRoaXMuX2J1bGxldFR5cGUpO1xyXG4gICAgICAgIHRoaXMuX2FwcGx5TXV0YXRpb25EYXRhKG11dGF0aW9uRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnVsbGV0VHlwZSh0eXBlKXtcclxuICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQgPSBudWxsO1xyXG5cclxuICAgICAgICAvL+WtkOW8uVxyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSAhPSBcIl9zcHJCdWxsZXRcIiArIHRoaXMuX2J1bGxldFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0ID0gY2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldCA9IHRoaXMuX2NyZWF0ZURlZmF1bHRCdWxsZXQodHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKHR5cGUgPT0gOTkgfHwgdHlwZSA9PSAxMDApICYmIHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zZXRTY2FsZSgxLjA1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IGNjLmNvbG9yKDg1LCA1OCwgMzAsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQub3BhY2l0eSA9IDI0MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNldFNjYWxlKDAuODUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gY2MuY29sb3IoMjU1LCA5MCwgNjAsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+iwg+aVtOWtkOW8ueinkuW6plxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpciktOTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11dGF0aW9uRGF0YShtdXRhdGlvbkRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2FtcCAhPSBcInBsYXllclwiIHx8ICFtdXRhdGlvbkRhdGEgfHwgIW11dGF0aW9uRGF0YS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tdXRhdGlvblR5cGUgPSBtdXRhdGlvbkRhdGEuaWQ7XHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25EYXRhID0gbXV0YXRpb25EYXRhO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZUxlZnQgPSBtdXRhdGlvbkRhdGEuYm91bmNlQ291bnQgfHwgMDtcclxuICAgICAgICB0aGlzLl9wZW5ldHJhdGVMZWZ0ID0gbXV0YXRpb25EYXRhLnBlbmV0cmF0ZUNvdW50IHx8IDA7XHJcblxyXG4gICAgICAgIGlmIChtdXRhdGlvbkRhdGEuZGFtYWdlUmF0aW8gJiYgbXV0YXRpb25EYXRhLmRhbWFnZVJhdGlvICE9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlICo9IG11dGF0aW9uRGF0YS5kYW1hZ2VSYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hNdXRhdGlvblZpc3VhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoTXV0YXRpb25WaXN1YWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW5CdWxsZXQgfHwgIXRoaXMuX211dGF0aW9uRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLl9tdXRhdGlvbkRhdGEuc2NhbGUgfHwgMTtcclxuICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYID0gTWF0aC5hYnModGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCkgKiBzY2FsZTtcclxuICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZID0gTWF0aC5hYnModGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSkgKiBzY2FsZTtcclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25EYXRhLmNvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IHRoaXMuX211dGF0aW9uRGF0YS5jb2xvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZURlZmF1bHRCdWxsZXQodHlwZSkge1xyXG4gICAgICAgIGxldCBidWxsZXQgPSBuZXcgY2MuTm9kZShcIl9zcHJCdWxsZXRcIiArIHR5cGUpO1xyXG4gICAgICAgIGJ1bGxldC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYnVsbGV0LnNldENvbnRlbnRTaXplKDcwLCA3MCk7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYnVsbGV0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09IDk5KSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNTUsIDM1LCAyNDApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjMwLCAxMjAsIDIzMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlID0gMS40O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3MCwgNDgsIDI4LCAyMzUpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjIpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI0LCAxOCwgMTQsIDIyMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgtOCwgMywgOSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDEwLCAtNCwgMTEpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGJ1bGxldC5zY2FsZSA9IDEuMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDAsIDAsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva50aWxlZCBtYXBcclxuICAgIHNldE1hcChtYXApIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IHRydWUgJiYgdGhpcy5faXNTdG9wID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1bGxldFR5cGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhbmRPaWxTcGlsbCh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95SW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZW50cmlmdWdhbFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNlbnRyaWZ1Z2FsTW90aW9uKGR0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3J0YWxJZ25vcmVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlSWQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+abtOaWsOS9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyUG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpbGxQb3NpdGlvbiA9IGN1cnJQb3NpdGlvbi5hZGQoY2MudjModGhpcy5fZGlyLm11bCh0aGlzLl9zcGVlZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24od2lsbFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLmlzTWFwKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlFbnRlckRhbWFnZURvdWJsZUFyZWEgJiYgdGhpcy5fbWFwLnRyeUVudGVyRGFtYWdlRG91YmxlQXJlYSh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlFbnRlclNwZWVkRG91YmxlQXJlYSAmJiB0aGlzLl9tYXAudHJ5RW50ZXJTcGVlZERvdWJsZUFyZWEodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5RW50ZXJTcHJlYWRCdWxsZXRBcmVhICYmIHRoaXMuX21hcC50cnlFbnRlclNwcmVhZEJ1bGxldEFyZWEodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5RW50ZXJDZW50cmlmdWdhbFJpbmcgJiYgdGhpcy5fbWFwLnRyeUVudGVyQ2VudHJpZnVnYWxSaW5nKHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeVRlbGVwb3J0QnVsbGV0ICYmIHRoaXMuX21hcC50cnlUZWxlcG9ydEJ1bGxldCh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJQb3NpdGlvbiA9IHdpbGxQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1bGxldFR5cGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXJTZWdtZW50ID0gdGhpcy5fbWFwLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fbWFwLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudChjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLl9tYXAuYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KGN1cnJQb3NpdGlvbix3aWxsUG9zaXRpb24pID8ge30gOiBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlclNlZ21lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhbmRPaWxTcGlsbChjdXJyUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUhhbmRsZUNvdmVyQnVsbGV0Q29sbGlzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFwLnRyeUhhbmRsZUNvdmVyQnVsbGV0Q29sbGlzaW9uKGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uLCB0aGlzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5a2Q5by55ZKM5Z2m5YWL5qOA5rWLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGl0VGFuayA9IHRoaXMuX21hcC5idWxsZXRFbmVteUNvbGxpc2lvblRlc3Qod2lsbFBvc2l0aW9uLHRoaXMuX2NhbXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhpdFRhbmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVIaXRUYW5rKGhpdFRhbmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WtkOW8ueWSjOmanOeijeeJqeajgOa1i1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlclNlZ21lbnQgPSB0aGlzLl9tYXAuZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fbWFwLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudChjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5fbWFwLmJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uVGVzdChjdXJyUG9zaXRpb24sd2lsbFBvc2l0aW9uKSA/IHt9IDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyU2VnbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU9ic3RhY2xlQ29sbGlzaW9uKGN1cnJQb3NpdGlvbiwgY29sbGlkZXJTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fbWFwLnRyeUJvdW5jZUJ1bGxldE9uT2JzdGFjbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFwLnRyeUJvdW5jZUJ1bGxldE9uT2JzdGFjbGUodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJvdW5jZWQgb2ZmIHBpbmsgb2JzdGFjbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4FcclxuICAgIGRvRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuX2lzU3RvcCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL+eIhueCuOWKqOeUu1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4yKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLDAuNSwwLjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvL+mUgOavgVxyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIHRoaXMuX2lzU3RvcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlSGl0VGFuayhoaXRUYW5rKSB7XHJcbiAgICAgICAgbGV0IHRhcmdldElkID0gaGl0VGFuay51dWlkIHx8IGhpdFRhbmtbXCJfaWRcIl0gfHwgaGl0VGFuay5uYW1lO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvblR5cGUgPT0gXCJwZW5ldHJhdGVcIiAmJiB0aGlzLl9oaXRUYXJnZXRJZHNbdGFyZ2V0SWRdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhpdFRhbmsuc2NyaXB0LmJlSGl0KHRoaXMuX2RhbWFnZSwgdGhpcy5fZGFtYWdlVHlwZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbXAgPT0gXCJwbGF5ZXJcIiAmJiB0aGlzLl9kYW1hZ2VUeXBlID09IFwiY3JpdFwiXHJcbiAgICAgICAgICAgICYmIHRoaXMuX21hcC5wbGF5UGxheWVyQ3JpdEZlZWRiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5UGxheWVyQ3JpdEZlZWRiYWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25UeXBlID09IFwicGVuZXRyYXRlXCIgJiYgdGhpcy5fcGVuZXRyYXRlTGVmdCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5faGl0VGFyZ2V0SWRzW3RhcmdldElkXSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlbmV0cmF0ZUxlZnQtLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BlbmV0cmF0ZUxlZnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZG9EZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZU9ic3RhY2xlQ29sbGlzaW9uKGN1cnJQb3NpdGlvbiwgY29sbGlkZXJTZWdtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211dGF0aW9uVHlwZSA9PSBcImJvdW5jZVwiICYmIHRoaXMuX2JvdW5jZUxlZnQgPiAwICYmIGNvbGxpZGVyU2VnbWVudCAmJiBjb2xsaWRlclNlZ21lbnQuQSAmJiBjb2xsaWRlclNlZ21lbnQuQikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuY2VMZWZ0LS07XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX3JlZmxlY3REaXJlY3Rpb25CeVNlZ21lbnQodGhpcy5fZGlyLCBjb2xsaWRlclNlZ21lbnQuQSwgY29sbGlkZXJTZWdtZW50LkIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpcikgLSA5MDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGN1cnJQb3NpdGlvbi5hZGQoY2MudjModGhpcy5fZGlyLm11bChNYXRoLm1heCg2LCB0aGlzLl9zcGVlZCAqIDAuNzUpKSkpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfbGFuZE9pbFNwaWxsKHBvcykge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwoY2MudjIocG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZWZsZWN0RGlyZWN0aW9uQnlTZWdtZW50KGRpciwgQSwgQikge1xyXG4gICAgICAgIGxldCB3YWxsRGlyID0gQi5zdWIoQSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IG5vcm1hbCA9IGNjLnYyKC13YWxsRGlyLnksIHdhbGxEaXIueCkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IGRvdCA9IGRpci5kb3Qobm9ybWFsKTtcclxuICAgICAgICBsZXQgcmVmbGVjdERpciA9IGRpci5zdWIobm9ybWFsLm11bCgyICogZG90KSk7XHJcbiAgICAgICAgaWYgKHJlZmxlY3REaXIubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlyLm11bCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWZsZWN0RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBvcnRhbElnbm9yZUlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3J0YWxJZ25vcmVJZDtcclxuICAgIH1cclxuXHJcbiAgICB0ZWxlcG9ydEJ5UG9ydGFsKHBvcywgaWdub3JlUG9ydGFsSWQgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZUlkID0gaWdub3JlUG9ydGFsSWQgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID0gMC4wODtcclxuICAgIH1cclxuXHJcbiAgICBoYXNVc2VkQ2VudHJpZnVnYWxSaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50cmlmdWdhbFVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzVXNlZERhbWFnZURvdWJsZUFyZWEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhbWFnZURvdWJsZVVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJEYW1hZ2VEb3VibGVBcmVhKGFyZWFEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhbWFnZURvdWJsZVVzZWQgfHwgIWFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSAqPSAoYXJlYURhdGEuZGFtYWdlTXVsdGlwbGllciB8fCAyKTtcclxuXHJcbiAgICAgICAgbGV0IHNjYWxlVXAgPSBhcmVhRGF0YS5zY2FsZU11bHRpcGxpZXIgfHwgMS41O1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCA9IE1hdGguYWJzKHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVgpICogc2NhbGVVcDtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSA9IE1hdGguYWJzKHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkpICogc2NhbGVVcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduRGFtYWdlRG91YmxlRngpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduRGFtYWdlRG91YmxlRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNVc2VkU3BlZWREb3VibGVBcmVhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZERvdWJsZVVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJTcGVlZERvdWJsZUFyZWEoYXJlYURhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3BlZWREb3VibGVVc2VkIHx8ICFhcmVhRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVVzZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzcGVlZE11bCA9IGFyZWFEYXRhLnNwZWVkTXVsdGlwbGllciB8fCAzO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkICo9IHNwZWVkTXVsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IGNjLmNvbG9yKDgwLCAxODAsIDI1NSwgMjU1KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduU3BlZWREb3VibGVGeCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25TcGVlZERvdWJsZUZ4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzVXNlZFNwcmVhZEJ1bGxldEFyZWEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJTcHJlYWRCdWxsZXRBcmVhKGFyZWFEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQgfHwgIWFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzcHJlYWRBbmdsZSA9IGFyZWFEYXRhLnNwcmVhZEFuZ2xlIHx8IDIwO1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBsZXQgbWFwID0gdGhpcy5fbWFwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAoaSA9PSAwID8gLTEgOiAxKSAqIHNwcmVhZEFuZ2xlO1xyXG4gICAgICAgICAgICBsZXQgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKHRoaXMuX2RpciwgYW5nbGUpO1xyXG4gICAgICAgICAgICBsZXQgYnBvcyA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuYWRkKGJkaXIubXVsKDEyKSk7XHJcbiAgICAgICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcywgYmRpciwgdGhpcy5fZ3Vuc2hvdCwgdGhpcy5fZGFtYWdlLCB0aGlzLl9zcGVlZCwgdGhpcy5fY2FtcCwgcGFyZW50Tm9kZSwgbWFwLCB0aGlzLl9idWxsZXRUeXBlLCB0aGlzLl9tdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3Bhd25TcHJlYWRCdWxsZXRGeCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25TcHJlYWRCdWxsZXRGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyQ2VudHJpZnVnYWxSaW5nKHJpbmdEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZCB8fCB0aGlzLl9jZW50cmlmdWdhbFN0YXRlIHx8ICFyaW5nRGF0YSB8fCAhcmluZ0RhdGEuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjZW50ZXIgPSBjYy52MihyaW5nRGF0YS5jZW50ZXIpO1xyXG4gICAgICAgIGxldCBjZW50ZXJUb0J1bGxldCA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuc3ViKGNlbnRlcik7XHJcbiAgICAgICAgaWYgKGNlbnRlclRvQnVsbGV0Lm1hZ1NxcigpIDw9IDEpIHtcclxuICAgICAgICAgICAgY2VudGVyVG9CdWxsZXQgPSB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLm1hZ1NxcigpID4gMFxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9kaXIubm9ybWFsaXplKCkubXVsKC0ocmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgNzIpKVxyXG4gICAgICAgICAgICAgICAgOiBjYy52MigtKHJpbmdEYXRhLm9yYml0UmFkaXVzIHx8IDcyKSwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IE1hdGguYXRhbjIoY2VudGVyVG9CdWxsZXQueSwgY2VudGVyVG9CdWxsZXQueCk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvblNpZ24gPSByaW5nRGF0YS5kaXJlY3Rpb25TaWduID09IG51bGwgPyAtMSA6IHJpbmdEYXRhLmRpcmVjdGlvblNpZ247XHJcbiAgICAgICAgbGV0IHJvdGF0ZUFuZ2xlID0gTWF0aC5hYnMocmluZ0RhdGEucm90YXRlQW5nbGUgPT0gbnVsbCA/IE1hdGguUEkgKiAwLjUgOiByaW5nRGF0YS5yb3RhdGVBbmdsZSk7XHJcbiAgICAgICAgbGV0IG9yYml0UmFkaXVzID0gcmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgTWF0aC5tYXgoNjQsIGNlbnRlclRvQnVsbGV0Lm1hZygpKTtcclxuICAgICAgICBsZXQgYW5ndWxhclNwZWVkID0gcmluZ0RhdGEuYW5ndWxhclNwZWVkIHx8IE1hdGguUEkgKiA0LjI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICBvcmJpdFJhZGl1czogb3JiaXRSYWRpdXMsXHJcbiAgICAgICAgICAgIHN0YXJ0QW5nbGU6IHN0YXJ0QW5nbGUsXHJcbiAgICAgICAgICAgIGN1cnJlbnRBbmdsZTogc3RhcnRBbmdsZSxcclxuICAgICAgICAgICAgbW92ZWRBbmdsZTogMCxcclxuICAgICAgICAgICAgcm90YXRlQW5nbGU6IHJvdGF0ZUFuZ2xlLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb25TaWduOiBkaXJlY3Rpb25TaWduID49IDAgPyAxIDogLTEsXHJcbiAgICAgICAgICAgIGFuZ3VsYXJTcGVlZDogYW5ndWxhclNwZWVkLFxyXG4gICAgICAgICAgICBzcGVlZEJvb3N0OiByaW5nRGF0YS5zcGVlZEJvb3N0IHx8IDEuODUsXHJcbiAgICAgICAgICAgIGRhbWFnZUJvb3N0OiByaW5nRGF0YS5kYW1hZ2VCb29zdCB8fCAxLjcsXHJcbiAgICAgICAgICAgIHJhZGl1c0V4cGFuZDogcmluZ0RhdGEucmFkaXVzRXhwYW5kIHx8IDE4LFxyXG4gICAgICAgICAgICBjb2xvcjogcmluZ0RhdGEuY29sb3IgfHwgY2MuY29sb3IoMjU1LCAxNjUsIDkwLCAyNTUpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fc3Bhd25DZW50cmlmdWdhbEVudGVyRngoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlQ2VudHJpZnVnYWxNb3Rpb24oZHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fY2VudHJpZnVnYWxTdGF0ZTtcclxuICAgICAgICBzdGF0ZS5tb3ZlZEFuZ2xlICs9IHN0YXRlLmFuZ3VsYXJTcGVlZCAqIGR0O1xyXG4gICAgICAgIGlmIChzdGF0ZS5tb3ZlZEFuZ2xlID4gc3RhdGUucm90YXRlQW5nbGUpIHtcclxuICAgICAgICAgICAgc3RhdGUubW92ZWRBbmdsZSA9IHN0YXRlLnJvdGF0ZUFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGUuY3VycmVudEFuZ2xlID0gc3RhdGUuc3RhcnRBbmdsZSArIHN0YXRlLmRpcmVjdGlvblNpZ24gKiBzdGF0ZS5tb3ZlZEFuZ2xlO1xyXG4gICAgICAgIGxldCBhbmdsZVByb2dyZXNzID0gc3RhdGUucm90YXRlQW5nbGUgPiAwID8gc3RhdGUubW92ZWRBbmdsZSAvIHN0YXRlLnJvdGF0ZUFuZ2xlIDogMTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gc3RhdGUub3JiaXRSYWRpdXMgKyBzdGF0ZS5yYWRpdXNFeHBhbmQgKiBhbmdsZVByb2dyZXNzO1xyXG4gICAgICAgIGxldCBvcmJpdFBvcyA9IHN0YXRlLmNlbnRlci5hZGQoY2MudjIoTWF0aC5jb3Moc3RhdGUuY3VycmVudEFuZ2xlKSwgTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSkubXVsKHJhZGl1cykpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MyhvcmJpdFBvcykpO1xyXG5cclxuICAgICAgICBsZXQgdGFuZ2VudERpciA9IHN0YXRlLmRpcmVjdGlvblNpZ24gPiAwXHJcbiAgICAgICAgICAgID8gY2MudjIoLU1hdGguc2luKHN0YXRlLmN1cnJlbnRBbmdsZSksIE1hdGguY29zKHN0YXRlLmN1cnJlbnRBbmdsZSkpXHJcbiAgICAgICAgICAgIDogY2MudjIoTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSwgLU1hdGguY29zKHN0YXRlLmN1cnJlbnRBbmdsZSkpO1xyXG4gICAgICAgIGlmICh0YW5nZW50RGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXIgPSB0YW5nZW50RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpcikgLSA5MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvcmJpdFNjYWxlID0gMSArIDAuMjQgKiBhbmdsZVByb2dyZXNzO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCA9IG9yYml0U2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkgPSBvcmJpdFNjYWxlO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuY29sb3IgPSBzdGF0ZS5jb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZS5tb3ZlZEFuZ2xlID49IHN0YXRlLnJvdGF0ZUFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGVlZCAqPSBzdGF0ZS5zcGVlZEJvb3N0O1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gc3RhdGUuZGFtYWdlQm9vc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lUaW1lICo9IDEuMzU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MyhvcmJpdFBvcy5hZGQodGhpcy5fZGlyLm11bChNYXRoLm1heCgxOCwgdGhpcy5fc3BlZWQgKiAwLjY1KSkpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwYXduQ2VudHJpZnVnYWxSZWxlYXNlRngoc3RhdGUuY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25DZW50cmlmdWdhbEVudGVyRngoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkNlbnRyaWZ1Z2FsUmVsZWFzZUZ4KGNvbG9yKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSwgdHJ1ZSwgY29sb3IsIHRoaXMuX2RpciwgdGhpcy5fc3BlZWQpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL+WIm+W7uuWtkOW8uVxyXG4gICAgc3RhdGljIGNyZWF0ZUJ1bGxldChwb3MsZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSA9IG51bGwsIG11dGF0aW9uRGF0YSA9IG51bGwpe1xyXG4gICAgICAgIHNwZWVkID0gKGNhbXAgPT0gXCJlbmVteVwiKSA/IHNwZWVkKjAuOCA6IHNwZWVkO1xyXG5cclxuICAgICAgICBsZXQgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUobWFwLmJ1bGxldFByZWZhYik7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgYnVsbGV0LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGJ1bGxldC56SW5kZXggPSA1MDAwO1xyXG4gICAgICAgIGJ1bGxldC5zY3JpcHQuaW5pdEJ1bGxldChkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxtYXAuX2xldmVsSWQsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIGJ1bGxldC5zY3JpcHQuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yib5bu65a2Q5by5KOexu+Weiy/kvY3nva4v5pa55ZCRL+eCrueuoemVv+W6pi/lsITnqIsv5pS75Ye75YqbL+ebruagh+mYteiQpSlcclxuICAgIHN0YXRpYyBjcmVhdGVCdWxsZXRFeChidWxsZXRUeXBlLHBvcyxkaXIsd2lwZUxlbixndW5zaG90LGF0ayxjYW1wLHBhcmVudE5vZGUsbWFwLHNwZWVkID0gOCxtdXRhdGlvbkRhdGEgPSBudWxsKXtcclxuICAgICAgICBndW5zaG90ID0gZ3Vuc2hvdCAtIHdpcGVMZW47XHJcbiAgICAgICAgbGV0IGJkaXIgPSBkaXI7XHJcbiAgICAgICAgbGV0IGJwb3MgPSBwb3M7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IG51bGw7XHJcblxyXG4gICAgICAgIHN3aXRjaChidWxsZXRUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDIuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDQ6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSA3LjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDU6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSAxMi41KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA5OTp7XHJcbiAgICAgICAgICAgICAgICBiZGlyID0gYmRpcjtcclxuICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLGJ1bGxldFR5cGUsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqOTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssMyxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwzNippKTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLDEuNSxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=