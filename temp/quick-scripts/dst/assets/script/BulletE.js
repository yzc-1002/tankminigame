
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
        _this._networkBulletId = "";
        _this._ownerPlayerId = -1;
        _this._multiplayerHitReported = false;
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
        if (this._map && this._map.unregisterMultiplayerBullet && this._networkBulletId) {
            this._map.unregisterMultiplayerBullet(this._networkBulletId, this.node);
        }
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
        this._networkBulletId = "";
        this._ownerPlayerId = -1;
        this._multiplayerHitReported = false;
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
    Bullet.prototype.setMultiplayerMeta = function (bulletId, ownerPlayerId) {
        this._networkBulletId = bulletId || "";
        this._ownerPlayerId = ownerPlayerId == null ? -1 : ownerPlayerId;
        this._multiplayerHitReported = false;
        if (this._map && this._map.registerMultiplayerBullet && this._networkBulletId) {
            this._map.registerMultiplayerBullet(this._networkBulletId, this.node);
        }
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
                            var hitTank = this._map.bulletEnemyCollisionTest(willPosition, this._camp, this._ownerPlayerId);
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
        if (this._isStop) {
            return;
        }
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
        if (this._isStop) {
            return;
        }
        this._isStop = true;
        this.node.destroy();
    };
    Bullet.prototype._handleHitTank = function (hitTank) {
        var targetId = hitTank.uuid || hitTank["_id"] || hitTank.name;
        if (this._map
            && this._map.isMultiplayerMode
            && this._map.isMultiplayerMode()
            && hitTank.script
            && hitTank.script._multiplayerMode) {
            var targetPlayerId = hitTank.script._multiplayerPlayerId;
            if (!this._multiplayerHitReported
                && this._networkBulletId
                && this._map.getLocalPlayerId
                && this._ownerPlayerId == this._map.getLocalPlayerId()
                && this._map.reportMultiplayerBulletHit
                && targetPlayerId != null
                && targetPlayerId >= 0) {
                this._multiplayerHitReported = true;
                this._map.reportMultiplayerBulletHit(this._networkBulletId, targetPlayerId);
            }
            this.doDestroy();
            return;
        }
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
    Bullet.createBullet = function (pos, dir, gunshot, atk, speed, camp, parentNode, map, bulletType, mutationData, networkMeta) {
        if (bulletType === void 0) { bulletType = null; }
        if (mutationData === void 0) { mutationData = null; }
        if (networkMeta === void 0) { networkMeta = null; }
        speed = (camp == "enemy") ? speed * 0.8 : speed;
        var bullet = cc.instantiate(map.bulletPrefab);
        bullet.parent = parentNode;
        bullet.setPosition(cc.v3(pos));
        bullet.zIndex = 5000;
        bullet.script.initBullet(dir, gunshot, atk, speed, camp, map._levelId, bulletType, mutationData);
        bullet.script.setMap(map);
        if (networkMeta && bullet.script.setMultiplayerMeta) {
            bullet.script.setMultiplayerMeta(networkMeta.bulletId, networkMeta.ownerPlayerId);
        }
        return bullet;
    };
    //创建子弹(类型/位置/方向/炮管长度/射程/攻击力/目标阵营)
    Bullet.createBulletEx = function (bulletType, pos, dir, wipeLen, gunshot, atk, camp, parentNode, map, speed, mutationData, networkMeta) {
        if (speed === void 0) { speed = 8; }
        if (mutationData === void 0) { mutationData = null; }
        if (networkMeta === void 0) { networkMeta = null; }
        gunshot = gunshot - wipeLen;
        var bdir = dir;
        var bpos = pos;
        var bullet = null;
        switch (bulletType) {
            case 1: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData, networkMeta);
                break;
            }
            case 2: {
                for (var i = 0; i <= 1; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 2.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData, networkMeta);
                }
                break;
            }
            case 3: {
                for (var i = 0; i <= 2; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData, networkMeta);
                }
                break;
            }
            case 4: {
                for (var i = 0; i <= 3; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 7.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData, networkMeta);
                }
                break;
            }
            case 5: {
                for (var i = 0; i <= 5; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 12.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, null, mutationData, networkMeta);
                }
                break;
            }
            case 99: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, bulletType, mutationData, networkMeta);
                break;
            }
            case 100: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, bulletType, mutationData, networkMeta);
                break;
            }
            case 101: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, bulletType, mutationData, networkMeta);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRFLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTRCLDBCQUFhO0lBQXpDO1FBQUEscUVBMnlCQztRQXp5QkcsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ3RDLGtCQUFZLEdBQU0sQ0FBQyxDQUFDLENBQVksTUFBTTtRQUN0QyxVQUFJLEdBQWMsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUM3QyxVQUFJLEdBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3hDLFlBQU0sR0FBWSxDQUFDLENBQUM7UUFDcEIsY0FBUSxHQUFVLEVBQUUsQ0FBQyxDQUFXLElBQUk7UUFDcEMsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFZLEtBQUs7UUFDckMsa0JBQVksR0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFXLE1BQU07UUFDdEMsV0FBSyxHQUFhLEVBQUUsQ0FBQyxDQUFXLGtCQUFrQjtRQUNsRCxhQUFPLEdBQVcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFXLEdBQU8sUUFBUSxDQUFDLENBQUssbUJBQW1CO1FBQ25ELG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQUssSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQU8sQ0FBQyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUksQ0FBQyxDQUFDO1FBQ3BCLG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0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Q3RDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztTQUN4QztRQUVELEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDL0UsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7UUFDcEUsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUV2QyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FB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QyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDekMsTUFBTSxHQUFHLFFBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM3RTtnQkFDRCxNQUFNO2FBQ1Q7WUFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFBO2dCQUNKLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pCLElBQUksR0FBRyxhQUFLLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDekMsTUFBTSxHQUFHLFFBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMvRTtnQkFDRCxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7O0lBenlCUSxNQUFNO1FBRGxCLE9BQU87T0FDSyxNQUFNLENBMnlCbEI7SUFBRCxhQUFDO0NBM3lCRCxBQTJ5QkMsQ0EzeUIyQiw2QkFBYSxHQTJ5QnhDO0FBM3lCWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHtMb2NhbGl6ZWREYXRhfSBmcm9tIFwiLi9iYXNlL0xvY2FsaXplZERhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLy/np4HmnInlh73mlbAs6K+35L2/55SoJ18n5byA5aS0XHJcbi8v6K+35L+u5pS5J05ld0NsYXNzJyA9PiDoh6rlt7HnmoTnsbvlkI1cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEJ1bGxldCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIF9idWxsZXRUeXBlICAgICA9IDE7ICAgICAgICAgICAgLy/lrZDlvLnnsbvlnotcclxuICAgIF9idWxsZXRMZXZlbCAgICA9IDE7ICAgICAgICAgICAgLy/lrZDlvLnnrYnnuqdcclxuICAgIF9tYXAgICAgICAgICAgICA9IG51bGw7ICAgICAgICAgLy90aWxlIG1hcCDoioLngrlcclxuICAgIF9kaXIgICAgICAgICAgICA9IGNjLnYyKDEsMCk7ICAgLy/lvZPliY3ooYzov5vmlrnlkJFcclxuICAgIF9zcGVlZCAgICAgICAgICA9IDU7XHJcbiAgICBfZ3Vuc2hvdCAgICAgICAgPSAxMDsgICAgICAgICAgIC8v5bCE56iLXHJcbiAgICBfZGFtYWdlICAgICAgICAgPSAwOyAgICAgICAgICAgIC8v5pS75Ye75YqbXHJcbiAgICBfZGVzdHJveVRpbWUgICAgPSAtMTsgICAgICAgICAgIC8v6ZSA5q+B5pe26Ze0XHJcbiAgICBfY2FtcCAgICAgICAgICAgPSBcIlwiOyAgICAgICAgICAgLy/pmLXokKUocGxheWVyL2VuZW15KVxyXG4gICAgX2luR2FtZSAgICAgICAgID0gZmFsc2U7XHJcbiAgICBfZGFtYWdlVHlwZSAgICAgPSBcIm5vcm1hbFwiOyAgICAgLy/kvKTlrrPnsbvlnosobm9ybWFsL2NyaXQpXHJcbiAgICBfbXV0YXRpb25UeXBlICAgPSBcIlwiO1xyXG4gICAgX211dGF0aW9uRGF0YSAgID0gbnVsbDtcclxuICAgIF9ib3VuY2VMZWZ0ICAgICA9IDA7XHJcbiAgICBfcGVuZXRyYXRlTGVmdCAgPSAwO1xyXG4gICAgX2hpdFRhcmdldElkcyAgID0ge307XHJcbiAgICBfcG9ydGFsSWdub3JlSWQgPSBcIlwiO1xyXG4gICAgX3BvcnRhbElnbm9yZVRpbWUgPSAwO1xyXG4gICAgX2NlbnRyaWZ1Z2FsU3RhdGUgPSBudWxsO1xyXG4gICAgX2NlbnRyaWZ1Z2FsVXNlZCA9IGZhbHNlO1xyXG4gICAgX2RhbWFnZURvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgIF9zcGVlZERvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgIF9zcHJlYWRCdWxsZXRVc2VkID0gZmFsc2U7XHJcbiAgICBfaXNDbHVzdGVyQm9tYiA9IGZhbHNlO1xyXG4gICAgX2NsdXN0ZXJCb21iRGlzdGFuY2UgPSAwO1xyXG4gICAgX2NsdXN0ZXJCb21iU3BsaXREaXN0YW5jZSA9IDA7XHJcbiAgICBfbmV0d29ya0J1bGxldElkICAgPSBcIlwiO1xyXG4gICAgX293bmVyUGxheWVySWQgICAgID0gLTE7XHJcbiAgICBfbXVsdGlwbGF5ZXJIaXRSZXBvcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgIF9jdXJyZW5CdWxsZXQgICA9IG51bGw7XHJcbiAgICBfaXNTdG9wICAgICAgICAgPSBmYWxzZTtcclxuXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnVucmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldCAmJiB0aGlzLl9uZXR3b3JrQnVsbGV0SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnVucmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldCh0aGlzLl9uZXR3b3JrQnVsbGV0SWQsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uc2NhbGUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5a2Q5by5KOaWueWQkS/lsITnqIsv5Lyk5a6z5YC8L+mAn+W6pi/pmLXokKUv5b2T5YmN5YWz5Y2hKVxyXG4gICAgaW5pdEJ1bGxldChkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxsZXZlbElkLGJ1bGxldFR5cGUgPSBudWxsLCBtdXRhdGlvbkRhdGEgPSBudWxsKXtcclxuICAgICAgICB0aGlzLl9kaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5fZ3Vuc2hvdCA9IGd1bnNob3Q7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UgPSBhdGs7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IGNhbXA7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlVHlwZSA9IFwibm9ybWFsXCI7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgPSB0aGlzLl9ndW5zaG90L3RoaXMuX3NwZWVkLzYwO1xyXG4gICAgICAgIHRoaXMuX211dGF0aW9uVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25EYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9ib3VuY2VMZWZ0ID0gMDtcclxuICAgICAgICB0aGlzLl9wZW5ldHJhdGVMZWZ0ID0gMDtcclxuICAgICAgICB0aGlzLl9oaXRUYXJnZXRJZHMgPSB7fTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVJZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxVc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlRG91YmxlVXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc0NsdXN0ZXJCb21iID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJEaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJTcGxpdERpc3RhbmNlID0gMDtcclxuICAgICAgICB0aGlzLl9uZXR3b3JrQnVsbGV0SWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX293bmVyUGxheWVySWQgPSAtMTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFJlcG9ydGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5a2Q5by557G75Z6LXHJcbiAgICAgICAgaWYgKGNhbXAgPT0gXCJlbmVteVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRMZXZlbCA9IGxldmVsSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGJ1bGxldFR5cGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gYnVsbGV0VHlwZTtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9idWxsZXRfJHt0aGlzLl9idWxsZXRUeXBlfV9gLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2N1cnJlbnRfYnVsbGV0X3R5cGVfXCIsMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldExldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfYnVsbGV0XyR7dGhpcy5fYnVsbGV0VHlwZX1fYCwxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5a2Q5by55p2A5a6z5Yqg5oiQ77yI5pq05Ye75qaC546H77yJXHJcbiAgICAgICAgbGV0IGJ1bGxldENvbmZpZ3MgPSB5eXAuY29uZmlnICYmIHl5cC5jb25maWcuQnVsbGV0ID8geXlwLmNvbmZpZy5CdWxsZXQgOiB7fTtcclxuICAgICAgICBsZXQgY29uZmlnID0gYnVsbGV0Q29uZmlnc1t0aGlzLl9idWxsZXRUeXBlXTtcclxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5BVEsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKz0gY29uZmlnLkFUSyAqICh0aGlzLl9idWxsZXRMZXZlbCArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbXAgPT0gXCJwbGF5ZXJcIiAmJiBNYXRoLnJhbmRvbSgpIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZSAqPSAyO1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2VUeXBlID0gXCJjcml0XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbkdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0QnVsbGV0VHlwZSh0aGlzLl9idWxsZXRUeXBlKTtcclxuICAgICAgICB0aGlzLl9hcHBseU11dGF0aW9uRGF0YShtdXRhdGlvbkRhdGEpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0VHlwZSA9PSAxMDEpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNDbHVzdGVyQm9tYiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYlNwbGl0RGlzdGFuY2UgPSB0aGlzLl9ndW5zaG90ICogMC42NTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnVsbGV0VHlwZSh0eXBlKXtcclxuICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQgPSBudWxsO1xyXG5cclxuICAgICAgICAvL+WtkOW8uVxyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSAhPSBcIl9zcHJCdWxsZXRcIiArIHRoaXMuX2J1bGxldFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0ID0gY2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldCA9IHRoaXMuX2NyZWF0ZURlZmF1bHRCdWxsZXQodHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKHR5cGUgPT0gOTkgfHwgdHlwZSA9PSAxMDApICYmIHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zZXRTY2FsZSgxLjA1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IGNjLmNvbG9yKDg1LCA1OCwgMzAsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQub3BhY2l0eSA9IDI0MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNldFNjYWxlKDAuODUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gY2MuY29sb3IoMjU1LCA5MCwgNjAsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+iwg+aVtOWtkOW8ueinkuW6plxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpciktOTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11dGF0aW9uRGF0YShtdXRhdGlvbkRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2FtcCAhPSBcInBsYXllclwiIHx8ICFtdXRhdGlvbkRhdGEgfHwgIW11dGF0aW9uRGF0YS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tdXRhdGlvblR5cGUgPSBtdXRhdGlvbkRhdGEuaWQ7XHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25EYXRhID0gbXV0YXRpb25EYXRhO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZUxlZnQgPSBtdXRhdGlvbkRhdGEuYm91bmNlQ291bnQgfHwgMDtcclxuICAgICAgICB0aGlzLl9wZW5ldHJhdGVMZWZ0ID0gbXV0YXRpb25EYXRhLnBlbmV0cmF0ZUNvdW50IHx8IDA7XHJcblxyXG4gICAgICAgIGlmIChtdXRhdGlvbkRhdGEuZGFtYWdlUmF0aW8gJiYgbXV0YXRpb25EYXRhLmRhbWFnZVJhdGlvICE9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlICo9IG11dGF0aW9uRGF0YS5kYW1hZ2VSYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hNdXRhdGlvblZpc3VhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoTXV0YXRpb25WaXN1YWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW5CdWxsZXQgfHwgIXRoaXMuX211dGF0aW9uRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLl9tdXRhdGlvbkRhdGEuc2NhbGUgfHwgMTtcclxuICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYID0gTWF0aC5hYnModGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCkgKiBzY2FsZTtcclxuICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZID0gTWF0aC5hYnModGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSkgKiBzY2FsZTtcclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25EYXRhLmNvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IHRoaXMuX211dGF0aW9uRGF0YS5jb2xvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZURlZmF1bHRCdWxsZXQodHlwZSkge1xyXG4gICAgICAgIGxldCBidWxsZXQgPSBuZXcgY2MuTm9kZShcIl9zcHJCdWxsZXRcIiArIHR5cGUpO1xyXG4gICAgICAgIGJ1bGxldC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYnVsbGV0LnNldENvbnRlbnRTaXplKDcwLCA3MCk7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYnVsbGV0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09IDk5KSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNTUsIDM1LCAyNDApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjMwLCAxMjAsIDIzMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlID0gMS40O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3MCwgNDgsIDI4LCAyMzUpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjIpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI0LCAxOCwgMTQsIDIyMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgtOCwgMywgOSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDEwLCAtNCwgMTEpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGJ1bGxldC5zY2FsZSA9IDEuMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAxMDEpIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjAwLCAxNDAsIDMwLCAyNDApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjIpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMDAsIDUwLCAyMjApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMjIpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAxODAsIDQwLCAyMDApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGJ1bGxldC5zY2FsZSA9IDEuMztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDAsIDAsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva50aWxlZCBtYXBcclxuICAgIHNldE1hcChtYXApIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXVsdGlwbGF5ZXJNZXRhKGJ1bGxldElkLCBvd25lclBsYXllcklkKSB7XHJcbiAgICAgICAgdGhpcy5fbmV0d29ya0J1bGxldElkID0gYnVsbGV0SWQgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLl9vd25lclBsYXllcklkID0gb3duZXJQbGF5ZXJJZCA9PSBudWxsID8gLTEgOiBvd25lclBsYXllcklkO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySGl0UmVwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5yZWdpc3Rlck11bHRpcGxheWVyQnVsbGV0ICYmIHRoaXMuX25ldHdvcmtCdWxsZXRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldCh0aGlzLl9uZXR3b3JrQnVsbGV0SWQsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5q+P5bin6LCD55SoXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSB0cnVlICYmIHRoaXMuX2lzU3RvcCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGVzdHJveVRpbWUgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVzdHJveVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWxsZXRUeXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYW5kT2lsU3BpbGwodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzQ2x1c3RlckJvbWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3Bhd25DbHVzdGVyU3ViQnVsbGV0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95SW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZW50cmlmdWdhbFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNlbnRyaWZ1Z2FsTW90aW9uKGR0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3J0YWxJZ25vcmVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlSWQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+abtOaWsOS9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyUG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpbGxQb3NpdGlvbiA9IGN1cnJQb3NpdGlvbi5hZGQoY2MudjModGhpcy5fZGlyLm11bCh0aGlzLl9zcGVlZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24od2lsbFBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/pu5HmtJ7lvJXliptcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5fYmxhY2tIb2xlVGVzdE1vZGUgJiYgdGhpcy5fbWFwLl9ibGFja0hvbGVBcmVhRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmhEYXRhID0gdGhpcy5fbWFwLl9ibGFja0hvbGVBcmVhRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldFBvcyA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b0NlbnRlciA9IGJoRGF0YS5jZW50ZXIuc3ViKGJ1bGxldFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gdG9DZW50ZXIubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmhEYXRhLnJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiaERhdGEuZGVzdHJveVJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAuc3Bhd25CbGFja0hvbGVTd2FsbG93RngpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduQmxhY2tIb2xlU3dhbGxvd0Z4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwdWxsRGlyID0gdG9DZW50ZXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoID0gYmhEYXRhLmdyYXZpdHlTdHJlbmd0aCAvIE1hdGgubWF4KGRpc3QsIDgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX2Rpci5hZGQocHVsbERpci5tdWwoc3RyZW5ndGggKiBkdCkpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKSAtIDkwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+mbhuadn+eCuOW8ue+8mumjnuihjOS4reS4jeeisOaSnu+8jOWIsOi+vui3neemu+WQjuWIhuijglxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJCb21iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iRGlzdGFuY2UgKz0gdGhpcy5fc3BlZWQgKiBkdCAqIDYwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2x1c3RlckJvbWJEaXN0YW5jZSA+PSB0aGlzLl9jbHVzdGVyQm9tYlNwbGl0RGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwYXduQ2x1c3RlclN1YkJ1bGxldHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX21hcC5pc01hcCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5RW50ZXJEYW1hZ2VEb3VibGVBcmVhICYmIHRoaXMuX21hcC50cnlFbnRlckRhbWFnZURvdWJsZUFyZWEodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5RW50ZXJTcGVlZERvdWJsZUFyZWEgJiYgdGhpcy5fbWFwLnRyeUVudGVyU3BlZWREb3VibGVBcmVhKHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUVudGVyU3ByZWFkQnVsbGV0QXJlYSAmJiB0aGlzLl9tYXAudHJ5RW50ZXJTcHJlYWRCdWxsZXRBcmVhKHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUVudGVyQ2VudHJpZnVnYWxSaW5nICYmIHRoaXMuX21hcC50cnlFbnRlckNlbnRyaWZ1Z2FsUmluZyh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlUZWxlcG9ydEJ1bGxldCAmJiB0aGlzLl9tYXAudHJ5VGVsZXBvcnRCdWxsZXQodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsUG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyUG9zaXRpb24gPSB3aWxsUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWxsZXRUeXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyU2VnbWVudCA9IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5fbWFwLmJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uVGVzdChjdXJyUG9zaXRpb24sd2lsbFBvc2l0aW9uKSA/IHt9IDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJTZWdtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYW5kT2lsU3BpbGwoY3VyclBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95SW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlIYW5kbGVDb3ZlckJ1bGxldENvbGxpc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21hcC50cnlIYW5kbGVDb3ZlckJ1bGxldENvbGxpc2lvbihjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbiwgdGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WtkOW8ueWSjOWdpuWFi+ajgOa1i1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpdFRhbmsgPSB0aGlzLl9tYXAuYnVsbGV0RW5lbXlDb2xsaXNpb25UZXN0KHdpbGxQb3NpdGlvbiwgdGhpcy5fY2FtcCwgdGhpcy5fb3duZXJQbGF5ZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0VGFuaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUhpdFRhbmsoaGl0VGFuayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5a2Q5by55ZKM6Zqc56KN54mp5qOA5rWLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyU2VnbWVudCA9IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9tYXAuZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50KGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLl9tYXAuYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KGN1cnJQb3NpdGlvbix3aWxsUG9zaXRpb24pID8ge30gOiBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJTZWdtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlT2JzdGFjbGVDb2xsaXNpb24oY3VyclBvc2l0aW9uLCBjb2xsaWRlclNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9tYXAudHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9tYXAudHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZSh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm91bmNlZCBvZmYgcGluayBvYnN0YWNsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgVxyXG4gICAgZG9EZXN0cm95KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU3RvcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lzU3RvcCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL+eIhueCuOWKqOeUu1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4yKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLDAuNSwwLjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvL+mUgOavgVxyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1N0b3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc1N0b3AgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUhpdFRhbmsoaGl0VGFuaykge1xyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IGhpdFRhbmsudXVpZCB8fCBoaXRUYW5rW1wiX2lkXCJdIHx8IGhpdFRhbmsubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwXHJcbiAgICAgICAgICAgICYmIHRoaXMuX21hcC5pc011bHRpcGxheWVyTW9kZVxyXG4gICAgICAgICAgICAmJiB0aGlzLl9tYXAuaXNNdWx0aXBsYXllck1vZGUoKVxyXG4gICAgICAgICAgICAmJiBoaXRUYW5rLnNjcmlwdFxyXG4gICAgICAgICAgICAmJiBoaXRUYW5rLnNjcmlwdC5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQbGF5ZXJJZCA9IGhpdFRhbmsuc2NyaXB0Ll9tdWx0aXBsYXllclBsYXllcklkO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVySGl0UmVwb3J0ZWRcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuX25ldHdvcmtCdWxsZXRJZFxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFwLmdldExvY2FsUGxheWVySWRcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuX293bmVyUGxheWVySWQgPT0gdGhpcy5fbWFwLmdldExvY2FsUGxheWVySWQoKVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFwLnJlcG9ydE11bHRpcGxheWVyQnVsbGV0SGl0XHJcbiAgICAgICAgICAgICAgICAmJiB0YXJnZXRQbGF5ZXJJZCAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAmJiB0YXJnZXRQbGF5ZXJJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFJlcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5yZXBvcnRNdWx0aXBsYXllckJ1bGxldEhpdCh0aGlzLl9uZXR3b3JrQnVsbGV0SWQsIHRhcmdldFBsYXllcklkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvblR5cGUgPT0gXCJwZW5ldHJhdGVcIiAmJiB0aGlzLl9oaXRUYXJnZXRJZHNbdGFyZ2V0SWRdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhpdFRhbmsuc2NyaXB0LmJlSGl0KHRoaXMuX2RhbWFnZSwgdGhpcy5fZGFtYWdlVHlwZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbXAgPT0gXCJwbGF5ZXJcIiAmJiB0aGlzLl9kYW1hZ2VUeXBlID09IFwiY3JpdFwiXHJcbiAgICAgICAgICAgICYmIHRoaXMuX21hcC5wbGF5UGxheWVyQ3JpdEZlZWRiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5UGxheWVyQ3JpdEZlZWRiYWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25UeXBlID09IFwicGVuZXRyYXRlXCIgJiYgdGhpcy5fcGVuZXRyYXRlTGVmdCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5faGl0VGFyZ2V0SWRzW3RhcmdldElkXSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlbmV0cmF0ZUxlZnQtLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BlbmV0cmF0ZUxlZnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZG9EZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZU9ic3RhY2xlQ29sbGlzaW9uKGN1cnJQb3NpdGlvbiwgY29sbGlkZXJTZWdtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211dGF0aW9uVHlwZSA9PSBcImJvdW5jZVwiICYmIHRoaXMuX2JvdW5jZUxlZnQgPiAwICYmIGNvbGxpZGVyU2VnbWVudCAmJiBjb2xsaWRlclNlZ21lbnQuQSAmJiBjb2xsaWRlclNlZ21lbnQuQikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuY2VMZWZ0LS07XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX3JlZmxlY3REaXJlY3Rpb25CeVNlZ21lbnQodGhpcy5fZGlyLCBjb2xsaWRlclNlZ21lbnQuQSwgY29sbGlkZXJTZWdtZW50LkIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpcikgLSA5MDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGN1cnJQb3NpdGlvbi5hZGQoY2MudjModGhpcy5fZGlyLm11bChNYXRoLm1heCg2LCB0aGlzLl9zcGVlZCAqIDAuNzUpKSkpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfbGFuZE9pbFNwaWxsKHBvcykge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwoY2MudjIocG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZWZsZWN0RGlyZWN0aW9uQnlTZWdtZW50KGRpciwgQSwgQikge1xyXG4gICAgICAgIGxldCB3YWxsRGlyID0gQi5zdWIoQSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IG5vcm1hbCA9IGNjLnYyKC13YWxsRGlyLnksIHdhbGxEaXIueCkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IGRvdCA9IGRpci5kb3Qobm9ybWFsKTtcclxuICAgICAgICBsZXQgcmVmbGVjdERpciA9IGRpci5zdWIobm9ybWFsLm11bCgyICogZG90KSk7XHJcbiAgICAgICAgaWYgKHJlZmxlY3REaXIubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlyLm11bCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWZsZWN0RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBvcnRhbElnbm9yZUlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3J0YWxJZ25vcmVJZDtcclxuICAgIH1cclxuXHJcbiAgICB0ZWxlcG9ydEJ5UG9ydGFsKHBvcywgaWdub3JlUG9ydGFsSWQgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZUlkID0gaWdub3JlUG9ydGFsSWQgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID0gMC4wODtcclxuICAgIH1cclxuXHJcbiAgICBoYXNVc2VkQ2VudHJpZnVnYWxSaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50cmlmdWdhbFVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzVXNlZERhbWFnZURvdWJsZUFyZWEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhbWFnZURvdWJsZVVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJEYW1hZ2VEb3VibGVBcmVhKGFyZWFEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhbWFnZURvdWJsZVVzZWQgfHwgIWFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSAqPSAoYXJlYURhdGEuZGFtYWdlTXVsdGlwbGllciB8fCAyKTtcclxuXHJcbiAgICAgICAgbGV0IHNjYWxlVXAgPSBhcmVhRGF0YS5zY2FsZU11bHRpcGxpZXIgfHwgMS41O1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCA9IE1hdGguYWJzKHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVgpICogc2NhbGVVcDtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSA9IE1hdGguYWJzKHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkpICogc2NhbGVVcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduRGFtYWdlRG91YmxlRngpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduRGFtYWdlRG91YmxlRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNVc2VkU3BlZWREb3VibGVBcmVhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZERvdWJsZVVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJTcGVlZERvdWJsZUFyZWEoYXJlYURhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3BlZWREb3VibGVVc2VkIHx8ICFhcmVhRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVVzZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzcGVlZE11bCA9IGFyZWFEYXRhLnNwZWVkTXVsdGlwbGllciB8fCAzO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkICo9IHNwZWVkTXVsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IGNjLmNvbG9yKDgwLCAxODAsIDI1NSwgMjU1KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduU3BlZWREb3VibGVGeCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25TcGVlZERvdWJsZUZ4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzVXNlZFNwcmVhZEJ1bGxldEFyZWEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJTcHJlYWRCdWxsZXRBcmVhKGFyZWFEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQgfHwgIWFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NwcmVhZEJ1bGxldFVzZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzcHJlYWRBbmdsZSA9IGFyZWFEYXRhLnNwcmVhZEFuZ2xlIHx8IDIwO1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBsZXQgbWFwID0gdGhpcy5fbWFwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAoaSA9PSAwID8gLTEgOiAxKSAqIHNwcmVhZEFuZ2xlO1xyXG4gICAgICAgICAgICBsZXQgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKHRoaXMuX2RpciwgYW5nbGUpO1xyXG4gICAgICAgICAgICBsZXQgYnBvcyA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuYWRkKGJkaXIubXVsKDEyKSk7XHJcbiAgICAgICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcywgYmRpciwgdGhpcy5fZ3Vuc2hvdCwgdGhpcy5fZGFtYWdlLCB0aGlzLl9zcGVlZCwgdGhpcy5fY2FtcCwgcGFyZW50Tm9kZSwgbWFwLCB0aGlzLl9idWxsZXRUeXBlLCB0aGlzLl9tdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3Bhd25TcHJlYWRCdWxsZXRGeCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25TcHJlYWRCdWxsZXRGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyQ2VudHJpZnVnYWxSaW5nKHJpbmdEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZCB8fCB0aGlzLl9jZW50cmlmdWdhbFN0YXRlIHx8ICFyaW5nRGF0YSB8fCAhcmluZ0RhdGEuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjZW50ZXIgPSBjYy52MihyaW5nRGF0YS5jZW50ZXIpO1xyXG4gICAgICAgIGxldCBjZW50ZXJUb0J1bGxldCA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuc3ViKGNlbnRlcik7XHJcbiAgICAgICAgaWYgKGNlbnRlclRvQnVsbGV0Lm1hZ1NxcigpIDw9IDEpIHtcclxuICAgICAgICAgICAgY2VudGVyVG9CdWxsZXQgPSB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLm1hZ1NxcigpID4gMFxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9kaXIubm9ybWFsaXplKCkubXVsKC0ocmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgNzIpKVxyXG4gICAgICAgICAgICAgICAgOiBjYy52MigtKHJpbmdEYXRhLm9yYml0UmFkaXVzIHx8IDcyKSwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IE1hdGguYXRhbjIoY2VudGVyVG9CdWxsZXQueSwgY2VudGVyVG9CdWxsZXQueCk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvblNpZ24gPSByaW5nRGF0YS5kaXJlY3Rpb25TaWduID09IG51bGwgPyAtMSA6IHJpbmdEYXRhLmRpcmVjdGlvblNpZ247XHJcbiAgICAgICAgbGV0IHJvdGF0ZUFuZ2xlID0gTWF0aC5hYnMocmluZ0RhdGEucm90YXRlQW5nbGUgPT0gbnVsbCA/IE1hdGguUEkgKiAwLjUgOiByaW5nRGF0YS5yb3RhdGVBbmdsZSk7XHJcbiAgICAgICAgbGV0IG9yYml0UmFkaXVzID0gcmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgTWF0aC5tYXgoNjQsIGNlbnRlclRvQnVsbGV0Lm1hZygpKTtcclxuICAgICAgICBsZXQgYW5ndWxhclNwZWVkID0gcmluZ0RhdGEuYW5ndWxhclNwZWVkIHx8IE1hdGguUEkgKiA0LjI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICBvcmJpdFJhZGl1czogb3JiaXRSYWRpdXMsXHJcbiAgICAgICAgICAgIHN0YXJ0QW5nbGU6IHN0YXJ0QW5nbGUsXHJcbiAgICAgICAgICAgIGN1cnJlbnRBbmdsZTogc3RhcnRBbmdsZSxcclxuICAgICAgICAgICAgbW92ZWRBbmdsZTogMCxcclxuICAgICAgICAgICAgcm90YXRlQW5nbGU6IHJvdGF0ZUFuZ2xlLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb25TaWduOiBkaXJlY3Rpb25TaWduID49IDAgPyAxIDogLTEsXHJcbiAgICAgICAgICAgIGFuZ3VsYXJTcGVlZDogYW5ndWxhclNwZWVkLFxyXG4gICAgICAgICAgICBzcGVlZEJvb3N0OiByaW5nRGF0YS5zcGVlZEJvb3N0IHx8IDEuODUsXHJcbiAgICAgICAgICAgIGRhbWFnZUJvb3N0OiByaW5nRGF0YS5kYW1hZ2VCb29zdCB8fCAxLjcsXHJcbiAgICAgICAgICAgIHJhZGl1c0V4cGFuZDogcmluZ0RhdGEucmFkaXVzRXhwYW5kIHx8IDE4LFxyXG4gICAgICAgICAgICBjb2xvcjogcmluZ0RhdGEuY29sb3IgfHwgY2MuY29sb3IoMjU1LCAxNjUsIDkwLCAyNTUpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fc3Bhd25DZW50cmlmdWdhbEVudGVyRngoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlQ2VudHJpZnVnYWxNb3Rpb24oZHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fY2VudHJpZnVnYWxTdGF0ZTtcclxuICAgICAgICBzdGF0ZS5tb3ZlZEFuZ2xlICs9IHN0YXRlLmFuZ3VsYXJTcGVlZCAqIGR0O1xyXG4gICAgICAgIGlmIChzdGF0ZS5tb3ZlZEFuZ2xlID4gc3RhdGUucm90YXRlQW5nbGUpIHtcclxuICAgICAgICAgICAgc3RhdGUubW92ZWRBbmdsZSA9IHN0YXRlLnJvdGF0ZUFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGUuY3VycmVudEFuZ2xlID0gc3RhdGUuc3RhcnRBbmdsZSArIHN0YXRlLmRpcmVjdGlvblNpZ24gKiBzdGF0ZS5tb3ZlZEFuZ2xlO1xyXG4gICAgICAgIGxldCBhbmdsZVByb2dyZXNzID0gc3RhdGUucm90YXRlQW5nbGUgPiAwID8gc3RhdGUubW92ZWRBbmdsZSAvIHN0YXRlLnJvdGF0ZUFuZ2xlIDogMTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gc3RhdGUub3JiaXRSYWRpdXMgKyBzdGF0ZS5yYWRpdXNFeHBhbmQgKiBhbmdsZVByb2dyZXNzO1xyXG4gICAgICAgIGxldCBvcmJpdFBvcyA9IHN0YXRlLmNlbnRlci5hZGQoY2MudjIoTWF0aC5jb3Moc3RhdGUuY3VycmVudEFuZ2xlKSwgTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSkubXVsKHJhZGl1cykpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MyhvcmJpdFBvcykpO1xyXG5cclxuICAgICAgICBsZXQgdGFuZ2VudERpciA9IHN0YXRlLmRpcmVjdGlvblNpZ24gPiAwXHJcbiAgICAgICAgICAgID8gY2MudjIoLU1hdGguc2luKHN0YXRlLmN1cnJlbnRBbmdsZSksIE1hdGguY29zKHN0YXRlLmN1cnJlbnRBbmdsZSkpXHJcbiAgICAgICAgICAgIDogY2MudjIoTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSwgLU1hdGguY29zKHN0YXRlLmN1cnJlbnRBbmdsZSkpO1xyXG4gICAgICAgIGlmICh0YW5nZW50RGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXIgPSB0YW5nZW50RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpcikgLSA5MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvcmJpdFNjYWxlID0gMSArIDAuMjQgKiBhbmdsZVByb2dyZXNzO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCA9IG9yYml0U2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkgPSBvcmJpdFNjYWxlO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuY29sb3IgPSBzdGF0ZS5jb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZS5tb3ZlZEFuZ2xlID49IHN0YXRlLnJvdGF0ZUFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGVlZCAqPSBzdGF0ZS5zcGVlZEJvb3N0O1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gc3RhdGUuZGFtYWdlQm9vc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lUaW1lICo9IDEuMzU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MyhvcmJpdFBvcy5hZGQodGhpcy5fZGlyLm11bChNYXRoLm1heCgxOCwgdGhpcy5fc3BlZWQgKiAwLjY1KSkpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwYXduQ2VudHJpZnVnYWxSZWxlYXNlRngoc3RhdGUuY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25DZW50cmlmdWdhbEVudGVyRngoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkNlbnRyaWZ1Z2FsUmVsZWFzZUZ4KGNvbG9yKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSwgdHJ1ZSwgY29sb3IsIHRoaXMuX2RpciwgdGhpcy5fc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkNsdXN0ZXJTdWJCdWxsZXRzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFwKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDg7XHJcbiAgICAgICAgbGV0IHNwcmVhZEFuZ2xlID0gNDU7XHJcbiAgICAgICAgbGV0IHN0YXJ0QW5nbGUgPSAtKHNwcmVhZEFuZ2xlIC8gMik7XHJcbiAgICAgICAgbGV0IHN0ZXAgPSBzcHJlYWRBbmdsZSAvIChjb3VudCAtIDEpO1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgc3ViR3Vuc2hvdCA9IHRoaXMuX2d1bnNob3QgKiAwLjQ7XHJcbiAgICAgICAgbGV0IHN1YkRhbWFnZSA9IHRoaXMuX2RhbWFnZSAqIDAuNTtcclxuICAgICAgICBsZXQgc3ViU3BlZWQgPSB0aGlzLl9zcGVlZCAqIDEuMjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHN0YXJ0QW5nbGUgKyBpICogc3RlcDtcclxuICAgICAgICAgICAgbGV0IGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyh0aGlzLl9kaXIsIGFuZ2xlKTtcclxuICAgICAgICAgICAgbGV0IGJwb3MgPSBwb3MuYWRkKGJkaXIubXVsKDE2KSk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAoaSAtIChjb3VudCAtIDEpIC8gMikgKiA2O1xyXG4gICAgICAgICAgICBicG9zID0gYnBvcy5hZGQoY2MudjIoLWJkaXIueSwgYmRpci54KS5tdWwob2Zmc2V0KSk7XHJcbiAgICAgICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcywgYmRpciwgc3ViR3Vuc2hvdCwgc3ViRGFtYWdlLCBzdWJTcGVlZCwgdGhpcy5fY2FtcCwgcGFyZW50Tm9kZSwgdGhpcy5fbWFwLCBudWxsLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJvlu7rlrZDlvLlcclxuICAgIHN0YXRpYyBjcmVhdGVCdWxsZXQocG9zLGRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLGJ1bGxldFR5cGUgPSBudWxsLCBtdXRhdGlvbkRhdGEgPSBudWxsLCBuZXR3b3JrTWV0YSA9IG51bGwpe1xyXG4gICAgICAgIHNwZWVkID0gKGNhbXAgPT0gXCJlbmVteVwiKSA/IHNwZWVkKjAuOCA6IHNwZWVkO1xyXG5cclxuICAgICAgICBsZXQgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUobWFwLmJ1bGxldFByZWZhYik7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgYnVsbGV0LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGJ1bGxldC56SW5kZXggPSA1MDAwO1xyXG4gICAgICAgIGJ1bGxldC5zY3JpcHQuaW5pdEJ1bGxldChkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxtYXAuX2xldmVsSWQsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIGJ1bGxldC5zY3JpcHQuc2V0TWFwKG1hcCk7XHJcbiAgICAgICAgaWYgKG5ldHdvcmtNZXRhICYmIGJ1bGxldC5zY3JpcHQuc2V0TXVsdGlwbGF5ZXJNZXRhKSB7XHJcbiAgICAgICAgICAgIGJ1bGxldC5zY3JpcHQuc2V0TXVsdGlwbGF5ZXJNZXRhKG5ldHdvcmtNZXRhLmJ1bGxldElkLCBuZXR3b3JrTWV0YS5vd25lclBsYXllcklkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yib5bu65a2Q5by5KOexu+Weiy/kvY3nva4v5pa55ZCRL+eCrueuoemVv+W6pi/lsITnqIsv5pS75Ye75YqbL+ebruagh+mYteiQpSlcclxuICAgIHN0YXRpYyBjcmVhdGVCdWxsZXRFeChidWxsZXRUeXBlLHBvcyxkaXIsd2lwZUxlbixndW5zaG90LGF0ayxjYW1wLHBhcmVudE5vZGUsbWFwLHNwZWVkID0gOCxtdXRhdGlvbkRhdGEgPSBudWxsLCBuZXR3b3JrTWV0YSA9IG51bGwpe1xyXG4gICAgICAgIGd1bnNob3QgPSBndW5zaG90IC0gd2lwZUxlbjtcclxuICAgICAgICBsZXQgYmRpciA9IGRpcjtcclxuICAgICAgICBsZXQgYnBvcyA9IHBvcztcclxuICAgICAgICBsZXQgYnVsbGV0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgc3dpdGNoKGJ1bGxldFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgYmRpciA9IGJkaXI7XHJcbiAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSxuZXR3b3JrTWV0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gMi41KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEsbmV0d29ya01ldGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhLG5ldHdvcmtNZXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNDp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDcuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhLG5ldHdvcmtNZXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDEyLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSxuZXR3b3JrTWV0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDk5OntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEsbmV0d29ya01ldGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMDA6e1xyXG4gICAgICAgICAgICAgICAgYmRpciA9IGJkaXI7XHJcbiAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxidWxsZXRUeXBlLG11dGF0aW9uRGF0YSxuZXR3b3JrTWV0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEwMTp7XHJcbiAgICAgICAgICAgICAgICBiZGlyID0gYmRpcjtcclxuICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLGJ1bGxldFR5cGUsbXV0YXRpb25EYXRhLG5ldHdvcmtNZXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTE6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjkwKTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLDMsY2FtcCxwYXJlbnROb2RlLG1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEyOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsMzYqaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0aywxLjUsY2FtcCxwYXJlbnROb2RlLG1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19