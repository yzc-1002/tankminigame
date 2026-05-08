
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
        _this._isClusterBomb = false;
        _this._clusterBombDistance = 0;
        _this._clusterBombSplitDistance = 0;
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
        this._isClusterBomb = false;
        this._clusterBombDistance = 0;
        this._clusterBombSplitDistance = 0;
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
        if (this._bulletType == 101) {
            this._isClusterBomb = true;
            this._clusterBombDistance = 0;
            this._clusterBombSplitDistance = this._gunshot * 0.65;
        }
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
        else if (type == 101) {
            graphics.fillColor = cc.color(200, 140, 30, 240);
            graphics.circle(0, 0, 22);
            graphics.fill();
            graphics.lineWidth = 3;
            graphics.strokeColor = cc.color(255, 200, 50, 220);
            graphics.circle(0, 0, 22);
            graphics.stroke();
            graphics.fillColor = cc.color(255, 180, 40, 200);
            graphics.circle(0, 0, 10);
            graphics.fill();
            bullet.scale = 1.3;
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
                    else if (this._isClusterBomb) {
                        this._spawnClusterSubBullets();
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
                    //黑洞引力
                    if (this._map && this._map._blackHoleTestMode && this._map._blackHoleAreaData) {
                        var bhData = this._map._blackHoleAreaData;
                        var bulletPos = cc.v2(this.node.position);
                        var toCenter = bhData.center.sub(bulletPos);
                        var dist = toCenter.mag();
                        if (dist < bhData.radius) {
                            if (dist < bhData.destroyRadius) {
                                if (this._map.spawnBlackHoleSwallowFx) {
                                    this._map.spawnBlackHoleSwallowFx(cc.v2(this.node.position));
                                }
                                this.doDestroy();
                                return;
                            }
                            else {
                                var pullDir = toCenter.normalize();
                                var strength = bhData.gravityStrength / Math.max(dist, 8);
                                this._dir = this._dir.add(pullDir.mul(strength * dt)).normalize();
                                this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir) - 90;
                            }
                        }
                    }
                    //集束炸弹：飞行中不碰撞，到达距离后分裂
                    if (this._isClusterBomb) {
                        this._clusterBombDistance += this._speed * dt * 60;
                        if (this._clusterBombDistance >= this._clusterBombSplitDistance) {
                            this._spawnClusterSubBullets();
                            this._destroyImmediately();
                            return;
                        }
                    }
                    else if (this._map.isMap()) {
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
    Bullet.prototype._spawnClusterSubBullets = function () {
        if (!this._map)
            return;
        var count = 8;
        var spreadAngle = 45;
        var startAngle = -(spreadAngle / 2);
        var step = spreadAngle / (count - 1);
        var parentNode = this.node.parent;
        var pos = cc.v2(this.node.position);
        var subGunshot = this._gunshot * 0.4;
        var subDamage = this._damage * 0.5;
        var subSpeed = this._speed * 1.2;
        for (var i = 0; i < count; i++) {
            var angle = startAngle + i * step;
            var bdir = Utils_1.Utils.vectorsRotateDegress(this._dir, angle);
            var bpos = pos.add(bdir.mul(16));
            var offset = (i - (count - 1) / 2) * 6;
            bpos = bpos.add(cc.v2(-bdir.y, bdir.x).mul(offset));
            Bullet_1.createBullet(bpos, bdir, subGunshot, subDamage, subSpeed, this._camp, parentNode, this._map, null, null);
        }
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
            case 101: {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRFLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTRCLDBCQUFhO0lBQXpDO1FBQUEscUVBNnZCQztRQTN2QkcsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ3RDLGtCQUFZLEdBQU0sQ0FBQyxDQUFDLENBQVksTUFBTTtRQUN0QyxVQUFJLEdBQWMsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUM3QyxVQUFJLEdBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3hDLFlBQU0sR0FBWSxDQUFDLENBQUM7UUFDcEIsY0FBUSxHQUFVLEVBQUUsQ0FBQyxDQUFXLElBQUk7UUFDcEMsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFZLEtBQUs7UUFDckMsa0JBQVksR0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFXLE1BQU07UUFDdEMsV0FBSyxHQUFhLEVBQUUsQ0FBQyxDQUFXLGtCQUFrQjtRQUNsRCxhQUFPLEdBQVcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFXLEdBQU8sUUFBUSxDQUFDLENBQUssbUJBQW1CO1FBQ25ELG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQUssSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQU8sQ0FBQyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUksQ0FBQyxDQUFDO1FBQ3BCLG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0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QUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRCxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDWixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUN0QjthQUNJLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNsQixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUN0QjthQUNJLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNsQixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUN2QixRQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUN0QjthQUNHO1lBQ0EsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMs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R0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sR0FBRyxRQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0U7Z0JBQ0QsTUFBTTthQUNUO1lBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDSixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6QixJQUFJLEdBQUcsYUFBSyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sR0FBRyxRQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztpQkFDL0U7Z0JBQ0QsTUFBTTthQUNUO1NBQ0o7SUFDTCxDQUFDOztJQTN2QlEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQTZ2QmxCO0lBQUQsYUFBQztDQTd2QkQsQUE2dkJDLENBN3ZCMkIsNkJBQWEsR0E2dkJ4QztBQTd2Qlksd0JBQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBfYnVsbGV0VHlwZSAgICAgPSAxOyAgICAgICAgICAgIC8v5a2Q5by557G75Z6LXHJcbiAgICBfYnVsbGV0TGV2ZWwgICAgPSAxOyAgICAgICAgICAgIC8v5a2Q5by5562J57qnXHJcbiAgICBfbWFwICAgICAgICAgICAgPSBudWxsOyAgICAgICAgIC8vdGlsZSBtYXAg6IqC54K5XHJcbiAgICBfZGlyICAgICAgICAgICAgPSBjYy52MigxLDApOyAgIC8v5b2T5YmN6KGM6L+b5pa55ZCRXHJcbiAgICBfc3BlZWQgICAgICAgICAgPSA1O1xyXG4gICAgX2d1bnNob3QgICAgICAgID0gMTA7ICAgICAgICAgICAvL+WwhOeoi1xyXG4gICAgX2RhbWFnZSAgICAgICAgID0gMDsgICAgICAgICAgICAvL+aUu+WHu+WKm1xyXG4gICAgX2Rlc3Ryb3lUaW1lICAgID0gLTE7ICAgICAgICAgICAvL+mUgOavgeaXtumXtFxyXG4gICAgX2NhbXAgICAgICAgICAgID0gXCJcIjsgICAgICAgICAgIC8v6Zi16JClKHBsYXllci9lbmVteSlcclxuICAgIF9pbkdhbWUgICAgICAgICA9IGZhbHNlO1xyXG4gICAgX2RhbWFnZVR5cGUgICAgID0gXCJub3JtYWxcIjsgICAgIC8v5Lyk5a6z57G75Z6LKG5vcm1hbC9jcml0KVxyXG4gICAgX211dGF0aW9uVHlwZSAgID0gXCJcIjtcclxuICAgIF9tdXRhdGlvbkRhdGEgICA9IG51bGw7XHJcbiAgICBfYm91bmNlTGVmdCAgICAgPSAwO1xyXG4gICAgX3BlbmV0cmF0ZUxlZnQgID0gMDtcclxuICAgIF9oaXRUYXJnZXRJZHMgICA9IHt9O1xyXG4gICAgX3BvcnRhbElnbm9yZUlkID0gXCJcIjtcclxuICAgIF9wb3J0YWxJZ25vcmVUaW1lID0gMDtcclxuICAgIF9jZW50cmlmdWdhbFN0YXRlID0gbnVsbDtcclxuICAgIF9jZW50cmlmdWdhbFVzZWQgPSBmYWxzZTtcclxuICAgIF9kYW1hZ2VEb3VibGVVc2VkID0gZmFsc2U7XHJcbiAgICBfc3BlZWREb3VibGVVc2VkID0gZmFsc2U7XHJcbiAgICBfc3ByZWFkQnVsbGV0VXNlZCA9IGZhbHNlO1xyXG4gICAgX2lzQ2x1c3RlckJvbWIgPSBmYWxzZTtcclxuICAgIF9jbHVzdGVyQm9tYkRpc3RhbmNlID0gMDtcclxuICAgIF9jbHVzdGVyQm9tYlNwbGl0RGlzdGFuY2UgPSAwO1xyXG5cclxuICAgIF9jdXJyZW5CdWxsZXQgICA9IG51bGw7XHJcbiAgICBfaXNTdG9wICAgICAgICAgPSBmYWxzZTtcclxuXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uc2NhbGUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5a2Q5by5KOaWueWQkS/lsITnqIsv5Lyk5a6z5YC8L+mAn+W6pi/pmLXokKUv5b2T5YmN5YWz5Y2hKVxyXG4gICAgaW5pdEJ1bGxldChkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxsZXZlbElkLGJ1bGxldFR5cGUgPSBudWxsLCBtdXRhdGlvbkRhdGEgPSBudWxsKXtcclxuICAgICAgICB0aGlzLl9kaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5fZ3Vuc2hvdCA9IGd1bnNob3Q7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UgPSBhdGs7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IGNhbXA7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlVHlwZSA9IFwibm9ybWFsXCI7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgPSB0aGlzLl9ndW5zaG90L3RoaXMuX3NwZWVkLzYwO1xyXG4gICAgICAgIHRoaXMuX211dGF0aW9uVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25EYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9ib3VuY2VMZWZ0ID0gMDtcclxuICAgICAgICB0aGlzLl9wZW5ldHJhdGVMZWZ0ID0gMDtcclxuICAgICAgICB0aGlzLl9oaXRUYXJnZXRJZHMgPSB7fTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVJZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxVc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc0NsdXN0ZXJCb21iID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJEaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJTcGxpdERpc3RhbmNlID0gMDtcclxuXHJcbiAgICAgICAgLy/lrZDlvLnnsbvlnotcclxuICAgICAgICBpZiAoY2FtcCA9PSBcImVuZW15XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldExldmVsID0gbGV2ZWxJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYnVsbGV0VHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSBidWxsZXRUeXBlO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRMZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX2J1bGxldF8ke3RoaXMuX2J1bGxldFR5cGV9X2AsMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfY3VycmVudF9idWxsZXRfdHlwZV9cIiwxKTtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9idWxsZXRfJHt0aGlzLl9idWxsZXRUeXBlfV9gLDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lrZDlvLnmnYDlrrPliqDmiJDvvIjmmrTlh7vmpoLnjofvvIlcclxuICAgICAgICBsZXQgYnVsbGV0Q29uZmlncyA9IHl5cC5jb25maWcgJiYgeXlwLmNvbmZpZy5CdWxsZXQgPyB5eXAuY29uZmlnLkJ1bGxldCA6IHt9O1xyXG4gICAgICAgIGxldCBjb25maWcgPSBidWxsZXRDb25maWdzW3RoaXMuX2J1bGxldFR5cGVdO1xyXG4gICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLkFUSyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZSArPSBjb25maWcuQVRLICogKHRoaXMuX2J1bGxldExldmVsICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcInBsYXllclwiICYmIE1hdGgucmFuZG9tKCkgPCAwLjEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlICo9IDI7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZVR5cGUgPSBcImNyaXRcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRCdWxsZXRUeXBlKHRoaXMuX2J1bGxldFR5cGUpO1xyXG4gICAgICAgIHRoaXMuX2FwcGx5TXV0YXRpb25EYXRhKG11dGF0aW9uRGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRUeXBlID09IDEwMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0NsdXN0ZXJCb21iID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJEaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iU3BsaXREaXN0YW5jZSA9IHRoaXMuX2d1bnNob3QgKiAwLjY1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRCdWxsZXRUeXBlKHR5cGUpe1xyXG4gICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8v5a2Q5by5XHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lICE9IFwiX3NwckJ1bGxldFwiICsgdGhpcy5fYnVsbGV0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQgPSBjaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0ID0gdGhpcy5fY3JlYXRlRGVmYXVsdEJ1bGxldCh0eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgodHlwZSA9PSA5OSB8fCB0eXBlID09IDEwMCkgJiYgdGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNldFNjYWxlKDEuMDUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gY2MuY29sb3IoODUsIDU4LCAzMCwgMjU1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5vcGFjaXR5ID0gMjQwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2V0U2NhbGUoMC44NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuY29sb3IgPSBjYy5jb2xvcigyNTUsIDkwLCA2MCwgMjU1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6LCD5pW05a2Q5by56KeS5bqmXHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKS05MDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2FwcGx5TXV0YXRpb25EYXRhKG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wICE9IFwicGxheWVyXCIgfHwgIW11dGF0aW9uRGF0YSB8fCAhbXV0YXRpb25EYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX211dGF0aW9uVHlwZSA9IG11dGF0aW9uRGF0YS5pZDtcclxuICAgICAgICB0aGlzLl9tdXRhdGlvbkRhdGEgPSBtdXRhdGlvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlTGVmdCA9IG11dGF0aW9uRGF0YS5ib3VuY2VDb3VudCB8fCAwO1xyXG4gICAgICAgIHRoaXMuX3BlbmV0cmF0ZUxlZnQgPSBtdXRhdGlvbkRhdGEucGVuZXRyYXRlQ291bnQgfHwgMDtcclxuXHJcbiAgICAgICAgaWYgKG11dGF0aW9uRGF0YS5kYW1hZ2VSYXRpbyAmJiBtdXRhdGlvbkRhdGEuZGFtYWdlUmF0aW8gIT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gbXV0YXRpb25EYXRhLmRhbWFnZVJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE11dGF0aW9uVmlzdWFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNdXRhdGlvblZpc3VhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbkJ1bGxldCB8fCAhdGhpcy5fbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX211dGF0aW9uRGF0YS5zY2FsZSB8fCAxO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVggPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYKSAqIHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkgPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZKSAqIHNjYWxlO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvbkRhdGEuY29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gdGhpcy5fbXV0YXRpb25EYXRhLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlRGVmYXVsdEJ1bGxldCh0eXBlKSB7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IG5ldyBjYy5Ob2RlKFwiX3NwckJ1bGxldFwiICsgdHlwZSk7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBidWxsZXQuc2V0Q29udGVudFNpemUoNzAsIDcwKTtcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidWxsZXQuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gOTkpIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA1NSwgMzUsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyMzAsIDEyMCwgMjMwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDEzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBidWxsZXQuc2NhbGUgPSAxLjQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDcwLCA0OCwgMjgsIDIzNSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjQsIDE4LCAxNCwgMjIwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKC04LCAzLCA5KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMTAsIC00LCAxMSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlID0gMS4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDEwMSkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyMDAsIDE0MCwgMzAsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIwMCwgNTAsIDIyMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDE4MCwgNDAsIDIwMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlID0gMS4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI0MCwgMCwgMjQwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE0KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rnRpbGVkIG1hcFxyXG4gICAgc2V0TWFwKG1hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+avj+W4p+iwg+eUqFxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gdHJ1ZSAmJiB0aGlzLl9pc1N0b3AgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3lUaW1lICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95VGltZSAtPSBkdDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3lUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVsbGV0VHlwZSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFuZE9pbFNwaWxsKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0NsdXN0ZXJCb21iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwYXduQ2x1c3RlclN1YkJ1bGxldHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9EZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VudHJpZnVnYWxTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDZW50cmlmdWdhbE1vdGlvbihkdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcG9ydGFsSWdub3JlVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZUlkID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/mm7TmlrDkvY3nva5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VyclBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3aWxsUG9zaXRpb24gPSBjdXJyUG9zaXRpb24uYWRkKGNjLnYzKHRoaXMuX2Rpci5tdWwodGhpcy5fc3BlZWQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHdpbGxQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v6buR5rSe5byV5YqbXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuX2JsYWNrSG9sZVRlc3RNb2RlICYmIHRoaXMuX21hcC5fYmxhY2tIb2xlQXJlYURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJoRGF0YSA9IHRoaXMuX21hcC5fYmxhY2tIb2xlQXJlYURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWxsZXRQb3MgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9DZW50ZXIgPSBiaERhdGEuY2VudGVyLnN1YihidWxsZXRQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IHRvQ2VudGVyLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IGJoRGF0YS5yYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmhEYXRhLmRlc3Ryb3lSYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnNwYXduQmxhY2tIb2xlU3dhbGxvd0Z4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3bkJsYWNrSG9sZVN3YWxsb3dGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHVsbERpciA9IHRvQ2VudGVyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJlbmd0aCA9IGJoRGF0YS5ncmF2aXR5U3RyZW5ndGggLyBNYXRoLm1heChkaXN0LCA4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXIgPSB0aGlzLl9kaXIuYWRkKHB1bGxEaXIubXVsKHN0cmVuZ3RoICogZHQpKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpcikgLSA5MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/pm4bmnZ/ngrjlvLnvvJrpo57ooYzkuK3kuI3norDmkp7vvIzliLDovr7ot53nprvlkI7liIboo4JcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyQm9tYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYkRpc3RhbmNlICs9IHRoaXMuX3NwZWVkICogZHQgKiA2MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NsdXN0ZXJCb21iRGlzdGFuY2UgPj0gdGhpcy5fY2x1c3RlckJvbWJTcGxpdERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGF3bkNsdXN0ZXJTdWJCdWxsZXRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95SW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9tYXAuaXNNYXAoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUVudGVyRGFtYWdlRG91YmxlQXJlYSAmJiB0aGlzLl9tYXAudHJ5RW50ZXJEYW1hZ2VEb3VibGVBcmVhKHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUVudGVyU3BlZWREb3VibGVBcmVhICYmIHRoaXMuX21hcC50cnlFbnRlclNwZWVkRG91YmxlQXJlYSh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlFbnRlclNwcmVhZEJ1bGxldEFyZWEgJiYgdGhpcy5fbWFwLnRyeUVudGVyU3ByZWFkQnVsbGV0QXJlYSh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlFbnRlckNlbnRyaWZ1Z2FsUmluZyAmJiB0aGlzLl9tYXAudHJ5RW50ZXJDZW50cmlmdWdhbFJpbmcodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5VGVsZXBvcnRCdWxsZXQgJiYgdGhpcy5fbWFwLnRyeVRlbGVwb3J0QnVsbGV0KHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbFBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyclBvc2l0aW9uID0gd2lsbFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVsbGV0VHlwZSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlclNlZ21lbnQgPSB0aGlzLl9tYXAuZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9tYXAuZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50KGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMuX21hcC5idWxsZXRPYnN0YWNsZUNvbGxpc2lvblRlc3QoY3VyclBvc2l0aW9uLHdpbGxQb3NpdGlvbikgPyB7fSA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyU2VnbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFuZE9pbFNwaWxsKGN1cnJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5SGFuZGxlQ292ZXJCdWxsZXRDb2xsaXNpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9tYXAudHJ5SGFuZGxlQ292ZXJCdWxsZXRDb2xsaXNpb24oY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24sIHRoaXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lrZDlvLnlkozlnablhYvmo4DmtYtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaXRUYW5rID0gdGhpcy5fbWFwLmJ1bGxldEVuZW15Q29sbGlzaW9uVGVzdCh3aWxsUG9zaXRpb24sdGhpcy5fY2FtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0VGFuaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUhpdFRhbmsoaGl0VGFuayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5a2Q5by55ZKM6Zqc56KN54mp5qOA5rWLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyU2VnbWVudCA9IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9tYXAuZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50KGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLl9tYXAuYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KGN1cnJQb3NpdGlvbix3aWxsUG9zaXRpb24pID8ge30gOiBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJTZWdtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlT2JzdGFjbGVDb2xsaXNpb24oY3VyclBvc2l0aW9uLCBjb2xsaWRlclNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9tYXAudHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9tYXAudHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZSh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm91bmNlZCBvZmYgcGluayBvYnN0YWNsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgVxyXG4gICAgZG9EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5faXNTdG9wID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v54iG54K45Yqo55S7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsMC41LDAuNSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8v6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95SW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgdGhpcy5faXNTdG9wID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVIaXRUYW5rKGhpdFRhbmspIHtcclxuICAgICAgICBsZXQgdGFyZ2V0SWQgPSBoaXRUYW5rLnV1aWQgfHwgaGl0VGFua1tcIl9pZFwiXSB8fCBoaXRUYW5rLm5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX211dGF0aW9uVHlwZSA9PSBcInBlbmV0cmF0ZVwiICYmIHRoaXMuX2hpdFRhcmdldElkc1t0YXJnZXRJZF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGl0VGFuay5zY3JpcHQuYmVIaXQodGhpcy5fZGFtYWdlLCB0aGlzLl9kYW1hZ2VUeXBlKTtcclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcInBsYXllclwiICYmIHRoaXMuX2RhbWFnZVR5cGUgPT0gXCJjcml0XCJcclxuICAgICAgICAgICAgJiYgdGhpcy5fbWFwLnBsYXlQbGF5ZXJDcml0RmVlZGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvblR5cGUgPT0gXCJwZW5ldHJhdGVcIiAmJiB0aGlzLl9wZW5ldHJhdGVMZWZ0ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaXRUYXJnZXRJZHNbdGFyZ2V0SWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcGVuZXRyYXRlTGVmdC0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGVuZXRyYXRlTGVmdCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlT2JzdGFjbGVDb2xsaXNpb24oY3VyclBvc2l0aW9uLCBjb2xsaWRlclNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25UeXBlID09IFwiYm91bmNlXCIgJiYgdGhpcy5fYm91bmNlTGVmdCA+IDAgJiYgY29sbGlkZXJTZWdtZW50ICYmIGNvbGxpZGVyU2VnbWVudC5BICYmIGNvbGxpZGVyU2VnbWVudC5CKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5jZUxlZnQtLTtcclxuICAgICAgICAgICAgdGhpcy5fZGlyID0gdGhpcy5fcmVmbGVjdERpcmVjdGlvbkJ5U2VnbWVudCh0aGlzLl9kaXIsIGNvbGxpZGVyU2VnbWVudC5BLCBjb2xsaWRlclNlZ21lbnQuQik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKSAtIDkwO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY3VyclBvc2l0aW9uLmFkZChjYy52Myh0aGlzLl9kaXIubXVsKE1hdGgubWF4KDYsIHRoaXMuX3NwZWVkICogMC43NSkpKSkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9sYW5kT2lsU3BpbGwocG9zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3Bhd25PaWxTcGlsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25PaWxTcGlsbChjYy52Mihwb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZmxlY3REaXJlY3Rpb25CeVNlZ21lbnQoZGlyLCBBLCBCKSB7XHJcbiAgICAgICAgbGV0IHdhbGxEaXIgPSBCLnN1YihBKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgbm9ybWFsID0gY2MudjIoLXdhbGxEaXIueSwgd2FsbERpci54KS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgZG90ID0gZGlyLmRvdChub3JtYWwpO1xyXG4gICAgICAgIGxldCByZWZsZWN0RGlyID0gZGlyLnN1Yihub3JtYWwubXVsKDIgKiBkb3QpKTtcclxuICAgICAgICBpZiAocmVmbGVjdERpci5tYWdTcXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaXIubXVsKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlZmxlY3REaXIubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9ydGFsSWdub3JlSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcnRhbElnbm9yZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIHRlbGVwb3J0QnlQb3J0YWwocG9zLCBpZ25vcmVQb3J0YWxJZCA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlSWQgPSBpZ25vcmVQb3J0YWxJZCB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPSAwLjA4O1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1VzZWRDZW50cmlmdWdhbFJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNVc2VkRGFtYWdlRG91YmxlQXJlYSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGFtYWdlRG91YmxlVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlckRhbWFnZURvdWJsZUFyZWEoYXJlYURhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGFtYWdlRG91YmxlVXNlZCB8fCAhYXJlYURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlICo9IChhcmVhRGF0YS5kYW1hZ2VNdWx0aXBsaWVyIHx8IDIpO1xyXG5cclxuICAgICAgICBsZXQgc2NhbGVVcCA9IGFyZWFEYXRhLnNjYWxlTXVsdGlwbGllciB8fCAxLjU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYID0gTWF0aC5hYnModGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCkgKiBzY2FsZVVwO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZID0gTWF0aC5hYnModGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSkgKiBzY2FsZVVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3Bhd25EYW1hZ2VEb3VibGVGeCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25EYW1hZ2VEb3VibGVGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1VzZWRTcGVlZERvdWJsZUFyZWEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkRG91YmxlVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlclNwZWVkRG91YmxlQXJlYShhcmVhRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zcGVlZERvdWJsZVVzZWQgfHwgIWFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVXNlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNwZWVkTXVsID0gYXJlYURhdGEuc3BlZWRNdWx0aXBsaWVyIHx8IDM7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgKj0gc3BlZWRNdWw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gY2MuY29sb3IoODAsIDE4MCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3Bhd25TcGVlZERvdWJsZUZ4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3blNwZWVkRG91YmxlRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNVc2VkU3ByZWFkQnVsbGV0QXJlYSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ByZWFkQnVsbGV0VXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlclNwcmVhZEJ1bGxldEFyZWEoYXJlYURhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ByZWFkQnVsbGV0VXNlZCB8fCAhYXJlYURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3ByZWFkQnVsbGV0VXNlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNwcmVhZEFuZ2xlID0gYXJlYURhdGEuc3ByZWFkQW5nbGUgfHwgMjA7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9tYXA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IChpID09IDAgPyAtMSA6IDEpICogc3ByZWFkQW5nbGU7XHJcbiAgICAgICAgICAgIGxldCBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3ModGhpcy5fZGlyLCBhbmdsZSk7XHJcbiAgICAgICAgICAgIGxldCBicG9zID0gY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKS5hZGQoYmRpci5tdWwoMTIpKTtcclxuICAgICAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLCBiZGlyLCB0aGlzLl9ndW5zaG90LCB0aGlzLl9kYW1hZ2UsIHRoaXMuX3NwZWVkLCB0aGlzLl9jYW1wLCBwYXJlbnROb2RlLCBtYXAsIHRoaXMuX2J1bGxldFR5cGUsIHRoaXMuX211dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zcGF3blNwcmVhZEJ1bGxldEZ4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3blNwcmVhZEJ1bGxldEZ4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJDZW50cmlmdWdhbFJpbmcocmluZ0RhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2VudHJpZnVnYWxVc2VkIHx8IHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgfHwgIXJpbmdEYXRhIHx8ICFyaW5nRGF0YS5jZW50ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNlbnRlciA9IGNjLnYyKHJpbmdEYXRhLmNlbnRlcik7XHJcbiAgICAgICAgbGV0IGNlbnRlclRvQnVsbGV0ID0gY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKS5zdWIoY2VudGVyKTtcclxuICAgICAgICBpZiAoY2VudGVyVG9CdWxsZXQubWFnU3FyKCkgPD0gMSkge1xyXG4gICAgICAgICAgICBjZW50ZXJUb0J1bGxldCA9IHRoaXMuX2RpciAmJiB0aGlzLl9kaXIubWFnU3FyKCkgPiAwXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2Rpci5ub3JtYWxpemUoKS5tdWwoLShyaW5nRGF0YS5vcmJpdFJhZGl1cyB8fCA3MikpXHJcbiAgICAgICAgICAgICAgICA6IGNjLnYyKC0ocmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgNzIpLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdGFydEFuZ2xlID0gTWF0aC5hdGFuMihjZW50ZXJUb0J1bGxldC55LCBjZW50ZXJUb0J1bGxldC54KTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uU2lnbiA9IHJpbmdEYXRhLmRpcmVjdGlvblNpZ24gPT0gbnVsbCA/IC0xIDogcmluZ0RhdGEuZGlyZWN0aW9uU2lnbjtcclxuICAgICAgICBsZXQgcm90YXRlQW5nbGUgPSBNYXRoLmFicyhyaW5nRGF0YS5yb3RhdGVBbmdsZSA9PSBudWxsID8gTWF0aC5QSSAqIDAuNSA6IHJpbmdEYXRhLnJvdGF0ZUFuZ2xlKTtcclxuICAgICAgICBsZXQgb3JiaXRSYWRpdXMgPSByaW5nRGF0YS5vcmJpdFJhZGl1cyB8fCBNYXRoLm1heCg2NCwgY2VudGVyVG9CdWxsZXQubWFnKCkpO1xyXG4gICAgICAgIGxldCBhbmd1bGFyU3BlZWQgPSByaW5nRGF0YS5hbmd1bGFyU3BlZWQgfHwgTWF0aC5QSSAqIDQuMjtcclxuXHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIG9yYml0UmFkaXVzOiBvcmJpdFJhZGl1cyxcclxuICAgICAgICAgICAgc3RhcnRBbmdsZTogc3RhcnRBbmdsZSxcclxuICAgICAgICAgICAgY3VycmVudEFuZ2xlOiBzdGFydEFuZ2xlLFxyXG4gICAgICAgICAgICBtb3ZlZEFuZ2xlOiAwLFxyXG4gICAgICAgICAgICByb3RhdGVBbmdsZTogcm90YXRlQW5nbGUsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvblNpZ246IGRpcmVjdGlvblNpZ24gPj0gMCA/IDEgOiAtMSxcclxuICAgICAgICAgICAgYW5ndWxhclNwZWVkOiBhbmd1bGFyU3BlZWQsXHJcbiAgICAgICAgICAgIHNwZWVkQm9vc3Q6IHJpbmdEYXRhLnNwZWVkQm9vc3QgfHwgMS44NSxcclxuICAgICAgICAgICAgZGFtYWdlQm9vc3Q6IHJpbmdEYXRhLmRhbWFnZUJvb3N0IHx8IDEuNyxcclxuICAgICAgICAgICAgcmFkaXVzRXhwYW5kOiByaW5nRGF0YS5yYWRpdXNFeHBhbmQgfHwgMTgsXHJcbiAgICAgICAgICAgIGNvbG9yOiByaW5nRGF0YS5jb2xvciB8fCBjYy5jb2xvcigyNTUsIDE2NSwgOTAsIDI1NSksXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zcGF3bkNlbnRyaWZ1Z2FsRW50ZXJGeCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVDZW50cmlmdWdhbE1vdGlvbihkdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9jZW50cmlmdWdhbFN0YXRlO1xyXG4gICAgICAgIHN0YXRlLm1vdmVkQW5nbGUgKz0gc3RhdGUuYW5ndWxhclNwZWVkICogZHQ7XHJcbiAgICAgICAgaWYgKHN0YXRlLm1vdmVkQW5nbGUgPiBzdGF0ZS5yb3RhdGVBbmdsZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5tb3ZlZEFuZ2xlID0gc3RhdGUucm90YXRlQW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0ZS5jdXJyZW50QW5nbGUgPSBzdGF0ZS5zdGFydEFuZ2xlICsgc3RhdGUuZGlyZWN0aW9uU2lnbiAqIHN0YXRlLm1vdmVkQW5nbGU7XHJcbiAgICAgICAgbGV0IGFuZ2xlUHJvZ3Jlc3MgPSBzdGF0ZS5yb3RhdGVBbmdsZSA+IDAgPyBzdGF0ZS5tb3ZlZEFuZ2xlIC8gc3RhdGUucm90YXRlQW5nbGUgOiAxO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSBzdGF0ZS5vcmJpdFJhZGl1cyArIHN0YXRlLnJhZGl1c0V4cGFuZCAqIGFuZ2xlUHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IG9yYml0UG9zID0gc3RhdGUuY2VudGVyLmFkZChjYy52MihNYXRoLmNvcyhzdGF0ZS5jdXJyZW50QW5nbGUpLCBNYXRoLnNpbihzdGF0ZS5jdXJyZW50QW5nbGUpKS5tdWwocmFkaXVzKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKG9yYml0UG9zKSk7XHJcblxyXG4gICAgICAgIGxldCB0YW5nZW50RGlyID0gc3RhdGUuZGlyZWN0aW9uU2lnbiA+IDBcclxuICAgICAgICAgICAgPyBjYy52MigtTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSwgTWF0aC5jb3Moc3RhdGUuY3VycmVudEFuZ2xlKSlcclxuICAgICAgICAgICAgOiBjYy52MihNYXRoLnNpbihzdGF0ZS5jdXJyZW50QW5nbGUpLCAtTWF0aC5jb3Moc3RhdGUuY3VycmVudEFuZ2xlKSk7XHJcbiAgICAgICAgaWYgKHRhbmdlbnREaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHRhbmdlbnREaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKSAtIDkwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9yYml0U2NhbGUgPSAxICsgMC4yNCAqIGFuZ2xlUHJvZ3Jlc3M7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYID0gb3JiaXRTY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSA9IG9yYml0U2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IHN0YXRlLmNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXRlLm1vdmVkQW5nbGUgPj0gc3RhdGUucm90YXRlQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwZWVkICo9IHN0YXRlLnNwZWVkQm9vc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZSAqPSBzdGF0ZS5kYW1hZ2VCb29zdDtcclxuICAgICAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgKj0gMS4zNTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKG9yYml0UG9zLmFkZCh0aGlzLl9kaXIubXVsKE1hdGgubWF4KDE4LCB0aGlzLl9zcGVlZCAqIDAuNjUpKSkpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3Bhd25DZW50cmlmdWdhbFJlbGVhc2VGeChzdGF0ZS5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkNlbnRyaWZ1Z2FsRW50ZXJGeCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXAuc3Bhd25DZW50cmlmdWdhbFJpbmdGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduQ2VudHJpZnVnYWxSZWxlYXNlRngoY29sb3IpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXAuc3Bhd25DZW50cmlmdWdhbFJpbmdGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLCB0cnVlLCBjb2xvciwgdGhpcy5fZGlyLCB0aGlzLl9zcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduQ2x1c3RlclN1YkJ1bGxldHMoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXApIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gODtcclxuICAgICAgICBsZXQgc3ByZWFkQW5nbGUgPSA0NTtcclxuICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IC0oc3ByZWFkQW5nbGUgLyAyKTtcclxuICAgICAgICBsZXQgc3RlcCA9IHNwcmVhZEFuZ2xlIC8gKGNvdW50IC0gMSk7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBzdWJHdW5zaG90ID0gdGhpcy5fZ3Vuc2hvdCAqIDAuNDtcclxuICAgICAgICBsZXQgc3ViRGFtYWdlID0gdGhpcy5fZGFtYWdlICogMC41O1xyXG4gICAgICAgIGxldCBzdWJTcGVlZCA9IHRoaXMuX3NwZWVkICogMS4yO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gc3RhcnRBbmdsZSArIGkgKiBzdGVwO1xyXG4gICAgICAgICAgICBsZXQgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKHRoaXMuX2RpciwgYW5nbGUpO1xyXG4gICAgICAgICAgICBsZXQgYnBvcyA9IHBvcy5hZGQoYmRpci5tdWwoMTYpKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IChpIC0gKGNvdW50IC0gMSkgLyAyKSAqIDY7XHJcbiAgICAgICAgICAgIGJwb3MgPSBicG9zLmFkZChjYy52MigtYmRpci55LCBiZGlyLngpLm11bChvZmZzZXQpKTtcclxuICAgICAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLCBiZGlyLCBzdWJHdW5zaG90LCBzdWJEYW1hZ2UsIHN1YlNwZWVkLCB0aGlzLl9jYW1wLCBwYXJlbnROb2RlLCB0aGlzLl9tYXAsIG51bGwsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuWtkOW8uVxuICAgIHN0YXRpYyBjcmVhdGVCdWxsZXQocG9zLGRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLGJ1bGxldFR5cGUgPSBudWxsLCBtdXRhdGlvbkRhdGEgPSBudWxsKXtcclxuICAgICAgICBzcGVlZCA9IChjYW1wID09IFwiZW5lbXlcIikgPyBzcGVlZCowLjggOiBzcGVlZDtcclxuXHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKG1hcC5idWxsZXRQcmVmYWIpO1xyXG4gICAgICAgIGJ1bGxldC5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIGJ1bGxldC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBidWxsZXQuekluZGV4ID0gNTAwMDtcclxuICAgICAgICBidWxsZXQuc2NyaXB0LmluaXRCdWxsZXQoZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAsbWFwLl9sZXZlbElkLGJ1bGxldFR5cGUsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICBidWxsZXQuc2NyaXB0LnNldE1hcChtYXApO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVsbGV0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WIm+W7uuWtkOW8uSjnsbvlnosv5L2N572uL+aWueWQkS/ngq7nrqHplb/luqYv5bCE56iLL+aUu+WHu+WKmy/nm67moIfpmLXokKUpXHJcbiAgICBzdGF0aWMgY3JlYXRlQnVsbGV0RXgoYnVsbGV0VHlwZSxwb3MsZGlyLHdpcGVMZW4sZ3Vuc2hvdCxhdGssY2FtcCxwYXJlbnROb2RlLG1hcCxzcGVlZCA9IDgsbXV0YXRpb25EYXRhID0gbnVsbCl7XHJcbiAgICAgICAgZ3Vuc2hvdCA9IGd1bnNob3QgLSB3aXBlTGVuO1xyXG4gICAgICAgIGxldCBiZGlyID0gZGlyO1xyXG4gICAgICAgIGxldCBicG9zID0gcG9zO1xyXG4gICAgICAgIGxldCBidWxsZXQgPSBudWxsO1xyXG5cclxuICAgICAgICBzd2l0Y2goYnVsbGV0VHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICBiZGlyID0gYmRpcjtcclxuICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSAyLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSA1KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gNy41KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA1OntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gMTIuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgOTk6e1xyXG4gICAgICAgICAgICAgICAgYmRpciA9IGJkaXI7XHJcbiAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxidWxsZXRUeXBlLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEwMDp7XHJcbiAgICAgICAgICAgICAgICBiZGlyID0gYmRpcjtcclxuICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLGJ1bGxldFR5cGUsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAxOntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqOTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssMyxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwzNippKTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLDEuNSxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=