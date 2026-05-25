
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
        _this._hasBounced = false;
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
        _this._multiplayerEventReported = {};
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
        this._hasBounced = false;
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
        this._multiplayerEventReported = {};
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
        this._hasBounced = false;
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
        this._multiplayerEventReported = {};
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
                    if (this._map && this._map._blackHoleAreaData) {
                        var bhData = this._map._blackHoleAreaData;
                        var bulletPos = cc.v2(this.node.position);
                        var toCenter = bhData.center.sub(bulletPos);
                        var dist = toCenter.mag();
                        if (dist < bhData.radius) {
                            if (dist < bhData.destroyRadius) {
                                if (this._map.spawnBlackHoleSwallowFx) {
                                    this._map.spawnBlackHoleSwallowFx(cc.v2(this.node.position));
                                }
                                this._reportMultiplayerEvent("blackHole", bhData.eventId || "", "swallow");
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
        var hitDamage = this._damage;
        if (this._hasBounced && hitTank.script && hitTank.script._camp == "player") {
            hitDamage *= 2;
        }
        hitTank.script.beHit(hitDamage, this._damageType);
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
            this._hasBounced = true;
            this._dir = this._reflectDirectionBySegment(this._dir, colliderSegment.A, colliderSegment.B);
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir) - 90;
            this.node.setPosition(currPosition.add(cc.v3(this._dir.mul(Math.max(6, this._speed * 0.75)))));
            this._reportMultiplayerEvent("bounce", String(this._bounceLeft));
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
        this._reportMultiplayerEvent("portal", ignorePortalId || "");
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
        this._reportMultiplayerEvent("damageDouble", areaData.eventId || "");
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
        this._reportMultiplayerEvent("speedDouble", areaData.eventId || "");
        return true;
    };
    Bullet.prototype._reportMultiplayerEvent = function (type, eventId, reason) {
        if (eventId === void 0) { eventId = ""; }
        if (reason === void 0) { reason = ""; }
        if (!this._networkBulletId || !type) {
            return;
        }
        var reportKey = type + ":" + (eventId || "");
        if (this._multiplayerEventReported[reportKey]) {
            return;
        }
        this._multiplayerEventReported[reportKey] = true;
        yyp.eventCenter.emit("multiplayer-bullet-event", {
            type: type,
            bulletId: this._networkBulletId,
            eventId: eventId || "",
            reason: reason || "",
        });
    };
    Bullet.prototype.applyMultiplayerBounce = function (bounceLeft) {
        if (bounceLeft === void 0) { bounceLeft = null; }
        if (this._isStop || this._mutationType != "bounce") {
            return false;
        }
        if (bounceLeft != null && Number.isFinite(bounceLeft)) {
            this._bounceLeft = Math.max(0, bounceLeft);
        }
        else if (this._bounceLeft > 0) {
            this._bounceLeft--;
        }
        else {
            return false;
        }
        this._hasBounced = true;
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
        if (speed === void 0) { speed = 16; }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRFLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTRCLDBCQUFhO0lBQXpDO1FBQUEscUVBNjFCQztRQTMxQkcsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ3RDLGtCQUFZLEdBQU0sQ0FBQyxDQUFDLENBQVksTUFBTTtRQUN0QyxVQUFJLEdBQWMsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUM3QyxVQUFJLEdBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3hDLFlBQU0sR0FBWSxDQUFDLENBQUM7UUFDcEIsY0FBUSxHQUFVLEVBQUUsQ0FBQyxDQUFXLElBQUk7UUFDcEMsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFZLEtBQUs7UUFDckMsa0JBQVksR0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFXLE1BQU07UUFDdEMsV0FBSyxHQUFhLEVBQUUsQ0FBQyxDQUFXLGtCQUFrQjtRQUNsRCxhQUFPLEdBQVcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFXLEdBQU8sUUFBUSxDQUFDLENBQUssbUJBQW1CO1FBQ25ELG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQUssSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQU8sQ0FBQyxDQUFDO1FBQ3BCLGlCQUFXLEdBQU8sS0FBSyxDQUFDO1FBQ3hCLG9CQUFjLEdBQUksQ0FBQyxDQUFDO1FBQ3BCLG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JC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QUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ3RCO2FBQ0ksSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1lBQ2xCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ3RCO2FBQ0ksSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1lBQ2xCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNqRCxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFD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LEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQy9FLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO1FBQ3BFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLGFBQWEsR0FBRyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMs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QUM7b0JBQ3pDLE1BQU0sR0FBRyxRQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0U7Z0JBQ0QsTUFBTTthQUNUO1lBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDSixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6QixJQUFJLEdBQUcsYUFBSyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sR0FBRyxRQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztpQkFDL0U7Z0JBQ0QsTUFBTTthQUNUO1NBQ0o7SUFDTCxDQUFDOztJQTMxQlEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQTYxQmxCO0lBQUQsYUFBQztDQTcxQkQsQUE2MUJDLENBNzFCMkIsNkJBQWEsR0E2MUJ4QztBQTcxQlksd0JBQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBfYnVsbGV0VHlwZSAgICAgPSAxOyAgICAgICAgICAgIC8v5a2Q5by557G75Z6LXHJcbiAgICBfYnVsbGV0TGV2ZWwgICAgPSAxOyAgICAgICAgICAgIC8v5a2Q5by5562J57qnXHJcbiAgICBfbWFwICAgICAgICAgICAgPSBudWxsOyAgICAgICAgIC8vdGlsZSBtYXAg6IqC54K5XHJcbiAgICBfZGlyICAgICAgICAgICAgPSBjYy52MigxLDApOyAgIC8v5b2T5YmN6KGM6L+b5pa55ZCRXHJcbiAgICBfc3BlZWQgICAgICAgICAgPSA1O1xyXG4gICAgX2d1bnNob3QgICAgICAgID0gMTA7ICAgICAgICAgICAvL+WwhOeoi1xyXG4gICAgX2RhbWFnZSAgICAgICAgID0gMDsgICAgICAgICAgICAvL+aUu+WHu+WKm1xyXG4gICAgX2Rlc3Ryb3lUaW1lICAgID0gLTE7ICAgICAgICAgICAvL+mUgOavgeaXtumXtFxyXG4gICAgX2NhbXAgICAgICAgICAgID0gXCJcIjsgICAgICAgICAgIC8v6Zi16JClKHBsYXllci9lbmVteSlcclxuICAgIF9pbkdhbWUgICAgICAgICA9IGZhbHNlO1xyXG4gICAgX2RhbWFnZVR5cGUgICAgID0gXCJub3JtYWxcIjsgICAgIC8v5Lyk5a6z57G75Z6LKG5vcm1hbC9jcml0KVxyXG4gICAgX211dGF0aW9uVHlwZSAgID0gXCJcIjtcclxuICAgIF9tdXRhdGlvbkRhdGEgICA9IG51bGw7XHJcbiAgICBfYm91bmNlTGVmdCAgICAgPSAwO1xyXG4gICAgX2hhc0JvdW5jZWQgICAgID0gZmFsc2U7XHJcbiAgICBfcGVuZXRyYXRlTGVmdCAgPSAwO1xyXG4gICAgX2hpdFRhcmdldElkcyAgID0ge307XHJcbiAgICBfcG9ydGFsSWdub3JlSWQgPSBcIlwiO1xyXG4gICAgX3BvcnRhbElnbm9yZVRpbWUgPSAwO1xyXG4gICAgX2NlbnRyaWZ1Z2FsU3RhdGUgPSBudWxsO1xyXG4gICAgX2NlbnRyaWZ1Z2FsVXNlZCA9IGZhbHNlO1xyXG4gICAgX2RhbWFnZURvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgIF9zcGVlZERvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgIF9zcHJlYWRCdWxsZXRVc2VkID0gZmFsc2U7XHJcbiAgICBfaXNDbHVzdGVyQm9tYiA9IGZhbHNlO1xyXG4gICAgX2NsdXN0ZXJCb21iRGlzdGFuY2UgPSAwO1xyXG4gICAgX2NsdXN0ZXJCb21iU3BsaXREaXN0YW5jZSA9IDA7XHJcbiAgICBfbmV0d29ya0J1bGxldElkICAgPSBcIlwiO1xyXG4gICAgX293bmVyUGxheWVySWQgICAgID0gLTE7XHJcbiAgICBfbXVsdGlwbGF5ZXJIaXRSZXBvcnRlZCA9IGZhbHNlO1xyXG4gICAgX211bHRpcGxheWVyRXZlbnRSZXBvcnRlZCA9IHt9O1xyXG5cclxuICAgIF9jdXJyZW5CdWxsZXQgICA9IG51bGw7XHJcbiAgICBfaXNTdG9wICAgICAgICAgPSBmYWxzZTtcclxuXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnVucmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldCAmJiB0aGlzLl9uZXR3b3JrQnVsbGV0SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnVucmVnaXN0ZXJNdWx0aXBsYXllckJ1bGxldCh0aGlzLl9uZXR3b3JrQnVsbGV0SWQsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uc2NhbGUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5a2Q5by5KOaWueWQkS/lsITnqIsv5Lyk5a6z5YC8L+mAn+W6pi/pmLXokKUv5b2T5YmN5YWz5Y2hKVxyXG4gICAgaW5pdEJ1bGxldChkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxsZXZlbElkLGJ1bGxldFR5cGUgPSBudWxsLCBtdXRhdGlvbkRhdGEgPSBudWxsKXtcclxuICAgICAgICB0aGlzLl9kaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5fZ3Vuc2hvdCA9IGd1bnNob3Q7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UgPSBhdGs7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IGNhbXA7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlVHlwZSA9IFwibm9ybWFsXCI7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgPSB0aGlzLl9ndW5zaG90L3RoaXMuX3NwZWVkLzYwO1xyXG4gICAgICAgIHRoaXMuX211dGF0aW9uVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25EYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9ib3VuY2VMZWZ0ID0gMDtcclxuICAgICAgICB0aGlzLl9oYXNCb3VuY2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGVuZXRyYXRlTGVmdCA9IDA7XHJcbiAgICAgICAgdGhpcy5faGl0VGFyZ2V0SWRzID0ge307XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZURvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcGVlZERvdWJsZVVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRVc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNDbHVzdGVyQm9tYiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iU3BsaXREaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fbmV0d29ya0J1bGxldElkID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9vd25lclBsYXllcklkID0gLTE7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIaXRSZXBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRXZlbnRSZXBvcnRlZCA9IHt9O1xyXG5cclxuICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgICAgIGlmIChjYW1wID09IFwiZW5lbXlcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TGV2ZWwgPSBsZXZlbElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChidWxsZXRUeXBlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IGJ1bGxldFR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldExldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfYnVsbGV0XyR7dGhpcy5fYnVsbGV0VHlwZX1fYCwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9jdXJyZW50X2J1bGxldF90eXBlX1wiLDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRMZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX2J1bGxldF8ke3RoaXMuX2J1bGxldFR5cGV9X2AsMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WtkOW8ueadgOWus+WKoOaIkO+8iOaatOWHu+amgueOh++8iVxyXG4gICAgICAgIGxldCBidWxsZXRDb25maWdzID0geXlwLmNvbmZpZyAmJiB5eXAuY29uZmlnLkJ1bGxldCA/IHl5cC5jb25maWcuQnVsbGV0IDoge307XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IGJ1bGxldENvbmZpZ3NbdGhpcy5fYnVsbGV0VHlwZV07XHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuQVRLICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlICs9IGNvbmZpZy5BVEsgKiAodGhpcy5fYnVsbGV0TGV2ZWwgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwicGxheWVyXCIgJiYgTWF0aC5yYW5kb20oKSA8IDAuMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gMjtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlVHlwZSA9IFwiY3JpdFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5HYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldEJ1bGxldFR5cGUodGhpcy5fYnVsbGV0VHlwZSk7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlNdXRhdGlvbkRhdGEobXV0YXRpb25EYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldFR5cGUgPT0gMTAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQ2x1c3RlckJvbWIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9jbHVzdGVyQm9tYkRpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fY2x1c3RlckJvbWJTcGxpdERpc3RhbmNlID0gdGhpcy5fZ3Vuc2hvdCAqIDAuNjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJ1bGxldFR5cGUodHlwZSl7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy/lrZDlvLlcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQnVsbGV0XCIgKyB0aGlzLl9idWxsZXRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldCA9IGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQgPSB0aGlzLl9jcmVhdGVEZWZhdWx0QnVsbGV0KHR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCh0eXBlID09IDk5IHx8IHR5cGUgPT0gMTAwKSAmJiB0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2V0U2NhbGUoMS4wNSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuY29sb3IgPSBjYy5jb2xvcig4NSwgNTgsIDMwLCAyNTUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0Lm9wYWNpdHkgPSAyNDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zZXRTY2FsZSgwLjg1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDYwLCAyNTUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/osIPmlbTlrZDlvLnop5LluqZcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpLTkwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYXBwbHlNdXRhdGlvbkRhdGEobXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbXAgIT0gXCJwbGF5ZXJcIiB8fCAhbXV0YXRpb25EYXRhIHx8ICFtdXRhdGlvbkRhdGEuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25UeXBlID0gbXV0YXRpb25EYXRhLmlkO1xyXG4gICAgICAgIHRoaXMuX211dGF0aW9uRGF0YSA9IG11dGF0aW9uRGF0YTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VMZWZ0ID0gbXV0YXRpb25EYXRhLmJvdW5jZUNvdW50IHx8IDA7XHJcbiAgICAgICAgdGhpcy5faGFzQm91bmNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BlbmV0cmF0ZUxlZnQgPSBtdXRhdGlvbkRhdGEucGVuZXRyYXRlQ291bnQgfHwgMDtcclxuXHJcbiAgICAgICAgaWYgKG11dGF0aW9uRGF0YS5kYW1hZ2VSYXRpbyAmJiBtdXRhdGlvbkRhdGEuZGFtYWdlUmF0aW8gIT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gbXV0YXRpb25EYXRhLmRhbWFnZVJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE11dGF0aW9uVmlzdWFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNdXRhdGlvblZpc3VhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbkJ1bGxldCB8fCAhdGhpcy5fbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX211dGF0aW9uRGF0YS5zY2FsZSB8fCAxO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVggPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYKSAqIHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkgPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZKSAqIHNjYWxlO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvbkRhdGEuY29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gdGhpcy5fbXV0YXRpb25EYXRhLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlRGVmYXVsdEJ1bGxldCh0eXBlKSB7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IG5ldyBjYy5Ob2RlKFwiX3NwckJ1bGxldFwiICsgdHlwZSk7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBidWxsZXQuc2V0Q29udGVudFNpemUoNzAsIDcwKTtcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidWxsZXQuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gOTkpIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA1NSwgMzUsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyMzAsIDEyMCwgMjMwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDEzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBidWxsZXQuc2NhbGUgPSAxLjQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDcwLCA0OCwgMjgsIDIzNSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjQsIDE4LCAxNCwgMjIwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKC04LCAzLCA5KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMTAsIC00LCAxMSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlID0gMS4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDEwMSkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyMDAsIDE0MCwgMzAsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIwMCwgNTAsIDIyMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDE4MCwgNDAsIDIwMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlID0gMS4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI0MCwgMCwgMjQwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE0KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rnRpbGVkIG1hcFxyXG4gICAgc2V0TWFwKG1hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRNdWx0aXBsYXllck1ldGEoYnVsbGV0SWQsIG93bmVyUGxheWVySWQpIHtcclxuICAgICAgICB0aGlzLl9uZXR3b3JrQnVsbGV0SWQgPSBidWxsZXRJZCB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuX293bmVyUGxheWVySWQgPSBvd25lclBsYXllcklkID09IG51bGwgPyAtMSA6IG93bmVyUGxheWVySWQ7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIaXRSZXBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRXZlbnRSZXBvcnRlZCA9IHt9O1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnJlZ2lzdGVyTXVsdGlwbGF5ZXJCdWxsZXQgJiYgdGhpcy5fbmV0d29ya0J1bGxldElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5yZWdpc3Rlck11bHRpcGxheWVyQnVsbGV0KHRoaXMuX25ldHdvcmtCdWxsZXRJZCwgdGhpcy5ub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IHRydWUgJiYgdGhpcy5faXNTdG9wID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1bGxldFR5cGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhbmRPaWxTcGlsbCh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95SW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faXNDbHVzdGVyQm9tYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGF3bkNsdXN0ZXJTdWJCdWxsZXRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mUgOavgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2VudHJpZnVnYWxNb3Rpb24oZHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcG9ydGFsSWdub3JlVGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVJZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v5pu05paw5L2N572uXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lsbFBvc2l0aW9uID0gY3VyclBvc2l0aW9uLmFkZChjYy52Myh0aGlzLl9kaXIubXVsKHRoaXMuX3NwZWVkKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+m7kea0nuW8leWKm1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLl9ibGFja0hvbGVBcmVhRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmhEYXRhID0gdGhpcy5fbWFwLl9ibGFja0hvbGVBcmVhRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldFBvcyA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b0NlbnRlciA9IGJoRGF0YS5jZW50ZXIuc3ViKGJ1bGxldFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gdG9DZW50ZXIubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmhEYXRhLnJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiaERhdGEuZGVzdHJveVJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAuc3Bhd25CbGFja0hvbGVTd2FsbG93RngpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduQmxhY2tIb2xlU3dhbGxvd0Z4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRNdWx0aXBsYXllckV2ZW50KFwiYmxhY2tIb2xlXCIsIGJoRGF0YS5ldmVudElkIHx8IFwiXCIsIFwic3dhbGxvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwdWxsRGlyID0gdG9DZW50ZXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoID0gYmhEYXRhLmdyYXZpdHlTdHJlbmd0aCAvIE1hdGgubWF4KGRpc3QsIDgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX2Rpci5hZGQocHVsbERpci5tdWwoc3RyZW5ndGggKiBkdCkpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKSAtIDkwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+mbhuadn+eCuOW8ue+8mumjnuihjOS4reS4jeeisOaSnu+8jOWIsOi+vui3neemu+WQjuWIhuijglxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJCb21iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsdXN0ZXJCb21iRGlzdGFuY2UgKz0gdGhpcy5fc3BlZWQgKiBkdCAqIDYwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2x1c3RlckJvbWJEaXN0YW5jZSA+PSB0aGlzLl9jbHVzdGVyQm9tYlNwbGl0RGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwYXduQ2x1c3RlclN1YkJ1bGxldHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX21hcC5pc01hcCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5RW50ZXJEYW1hZ2VEb3VibGVBcmVhICYmIHRoaXMuX21hcC50cnlFbnRlckRhbWFnZURvdWJsZUFyZWEodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5RW50ZXJTcGVlZERvdWJsZUFyZWEgJiYgdGhpcy5fbWFwLnRyeUVudGVyU3BlZWREb3VibGVBcmVhKHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUVudGVyU3ByZWFkQnVsbGV0QXJlYSAmJiB0aGlzLl9tYXAudHJ5RW50ZXJTcHJlYWRCdWxsZXRBcmVhKHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUVudGVyQ2VudHJpZnVnYWxSaW5nICYmIHRoaXMuX21hcC50cnlFbnRlckNlbnRyaWZ1Z2FsUmluZyh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlUZWxlcG9ydEJ1bGxldCAmJiB0aGlzLl9tYXAudHJ5VGVsZXBvcnRCdWxsZXQodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsUG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyUG9zaXRpb24gPSB3aWxsUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWxsZXRUeXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyU2VnbWVudCA9IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5fbWFwLmJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uVGVzdChjdXJyUG9zaXRpb24sd2lsbFBvc2l0aW9uKSA/IHt9IDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJTZWdtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYW5kT2lsU3BpbGwoY3VyclBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95SW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlIYW5kbGVDb3ZlckJ1bGxldENvbGxpc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21hcC50cnlIYW5kbGVDb3ZlckJ1bGxldENvbGxpc2lvbihjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbiwgdGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WtkOW8ueWSjOWdpuWFi+ajgOa1i1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpdFRhbmsgPSB0aGlzLl9tYXAuYnVsbGV0RW5lbXlDb2xsaXNpb25UZXN0KHdpbGxQb3NpdGlvbiwgdGhpcy5fY2FtcCwgdGhpcy5fb3duZXJQbGF5ZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0VGFuaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUhpdFRhbmsoaGl0VGFuayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5a2Q5by55ZKM6Zqc56KN54mp5qOA5rWLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyU2VnbWVudCA9IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9tYXAuZ2V0QnVsbGV0T2JzdGFjbGVDb2xsaXNpb25TZWdtZW50KGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLl9tYXAuYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KGN1cnJQb3NpdGlvbix3aWxsUG9zaXRpb24pID8ge30gOiBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJTZWdtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlT2JzdGFjbGVDb2xsaXNpb24oY3VyclBvc2l0aW9uLCBjb2xsaWRlclNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9tYXAudHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9tYXAudHJ5Qm91bmNlQnVsbGV0T25PYnN0YWNsZSh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm91bmNlZCBvZmYgcGluayBvYnN0YWNsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgVxyXG4gICAgZG9EZXN0cm95KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU3RvcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lzU3RvcCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL+eIhueCuOWKqOeUu1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4yKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLDAuNSwwLjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvL+mUgOavgVxyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1N0b3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc1N0b3AgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUhpdFRhbmsoaGl0VGFuaykge1xyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IGhpdFRhbmsudXVpZCB8fCBoaXRUYW5rW1wiX2lkXCJdIHx8IGhpdFRhbmsubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwXHJcbiAgICAgICAgICAgICYmIHRoaXMuX21hcC5pc011bHRpcGxheWVyTW9kZVxyXG4gICAgICAgICAgICAmJiB0aGlzLl9tYXAuaXNNdWx0aXBsYXllck1vZGUoKVxyXG4gICAgICAgICAgICAmJiBoaXRUYW5rLnNjcmlwdFxyXG4gICAgICAgICAgICAmJiBoaXRUYW5rLnNjcmlwdC5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQbGF5ZXJJZCA9IGhpdFRhbmsuc2NyaXB0Ll9tdWx0aXBsYXllclBsYXllcklkO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVySGl0UmVwb3J0ZWRcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuX25ldHdvcmtCdWxsZXRJZFxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFwLmdldExvY2FsUGxheWVySWRcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuX293bmVyUGxheWVySWQgPT0gdGhpcy5fbWFwLmdldExvY2FsUGxheWVySWQoKVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFwLnJlcG9ydE11bHRpcGxheWVyQnVsbGV0SGl0XHJcbiAgICAgICAgICAgICAgICAmJiB0YXJnZXRQbGF5ZXJJZCAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAmJiB0YXJnZXRQbGF5ZXJJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFJlcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5yZXBvcnRNdWx0aXBsYXllckJ1bGxldEhpdCh0aGlzLl9uZXR3b3JrQnVsbGV0SWQsIHRhcmdldFBsYXllcklkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvblR5cGUgPT0gXCJwZW5ldHJhdGVcIiAmJiB0aGlzLl9oaXRUYXJnZXRJZHNbdGFyZ2V0SWRdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBoaXREYW1hZ2UgPSB0aGlzLl9kYW1hZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0JvdW5jZWQgJiYgaGl0VGFuay5zY3JpcHQgJiYgaGl0VGFuay5zY3JpcHQuX2NhbXAgPT0gXCJwbGF5ZXJcIikge1xyXG4gICAgICAgICAgICBoaXREYW1hZ2UgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaGl0VGFuay5zY3JpcHQuYmVIaXQoaGl0RGFtYWdlLCB0aGlzLl9kYW1hZ2VUeXBlKTtcclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcInBsYXllclwiICYmIHRoaXMuX2RhbWFnZVR5cGUgPT0gXCJjcml0XCJcclxuICAgICAgICAgICAgJiYgdGhpcy5fbWFwLnBsYXlQbGF5ZXJDcml0RmVlZGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvblR5cGUgPT0gXCJwZW5ldHJhdGVcIiAmJiB0aGlzLl9wZW5ldHJhdGVMZWZ0ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaXRUYXJnZXRJZHNbdGFyZ2V0SWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcGVuZXRyYXRlTGVmdC0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGVuZXRyYXRlTGVmdCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlT2JzdGFjbGVDb2xsaXNpb24oY3VyclBvc2l0aW9uLCBjb2xsaWRlclNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25UeXBlID09IFwiYm91bmNlXCIgJiYgdGhpcy5fYm91bmNlTGVmdCA+IDAgJiYgY29sbGlkZXJTZWdtZW50ICYmIGNvbGxpZGVyU2VnbWVudC5BICYmIGNvbGxpZGVyU2VnbWVudC5CKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5jZUxlZnQtLTtcclxuICAgICAgICAgICAgdGhpcy5faGFzQm91bmNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX3JlZmxlY3REaXJlY3Rpb25CeVNlZ21lbnQodGhpcy5fZGlyLCBjb2xsaWRlclNlZ21lbnQuQSwgY29sbGlkZXJTZWdtZW50LkIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpcikgLSA5MDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGN1cnJQb3NpdGlvbi5hZGQoY2MudjModGhpcy5fZGlyLm11bChNYXRoLm1heCg2LCB0aGlzLl9zcGVlZCAqIDAuNzUpKSkpKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVwb3J0TXVsdGlwbGF5ZXJFdmVudChcImJvdW5jZVwiLCBTdHJpbmcodGhpcy5fYm91bmNlTGVmdCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9sYW5kT2lsU3BpbGwocG9zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3Bhd25PaWxTcGlsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25PaWxTcGlsbChjYy52Mihwb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZmxlY3REaXJlY3Rpb25CeVNlZ21lbnQoZGlyLCBBLCBCKSB7XHJcbiAgICAgICAgbGV0IHdhbGxEaXIgPSBCLnN1YihBKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgbm9ybWFsID0gY2MudjIoLXdhbGxEaXIueSwgd2FsbERpci54KS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgZG90ID0gZGlyLmRvdChub3JtYWwpO1xyXG4gICAgICAgIGxldCByZWZsZWN0RGlyID0gZGlyLnN1Yihub3JtYWwubXVsKDIgKiBkb3QpKTtcclxuICAgICAgICBpZiAocmVmbGVjdERpci5tYWdTcXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaXIubXVsKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlZmxlY3REaXIubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9ydGFsSWdub3JlSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcnRhbElnbm9yZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIHRlbGVwb3J0QnlQb3J0YWwocG9zLCBpZ25vcmVQb3J0YWxJZCA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlSWQgPSBpZ25vcmVQb3J0YWxJZCB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPSAwLjA4O1xyXG4gICAgICAgIHRoaXMuX3JlcG9ydE11bHRpcGxheWVyRXZlbnQoXCJwb3J0YWxcIiwgaWdub3JlUG9ydGFsSWQgfHwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzVXNlZENlbnRyaWZ1Z2FsUmluZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2VudHJpZnVnYWxVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1VzZWREYW1hZ2VEb3VibGVBcmVhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYW1hZ2VEb3VibGVVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyRGFtYWdlRG91YmxlQXJlYShhcmVhRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYW1hZ2VEb3VibGVVc2VkIHx8ICFhcmVhRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYW1hZ2VEb3VibGVVc2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gKGFyZWFEYXRhLmRhbWFnZU11bHRpcGxpZXIgfHwgMik7XHJcblxyXG4gICAgICAgIGxldCBzY2FsZVVwID0gYXJlYURhdGEuc2NhbGVNdWx0aXBsaWVyIHx8IDEuNTtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVggPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYKSAqIHNjYWxlVXA7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkgPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZKSAqIHNjYWxlVXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zcGF3bkRhbWFnZURvdWJsZUZ4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3bkRhbWFnZURvdWJsZUZ4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZXBvcnRNdWx0aXBsYXllckV2ZW50KFwiZGFtYWdlRG91YmxlXCIsIGFyZWFEYXRhLmV2ZW50SWQgfHwgXCJcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1VzZWRTcGVlZERvdWJsZUFyZWEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkRG91YmxlVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlclNwZWVkRG91YmxlQXJlYShhcmVhRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zcGVlZERvdWJsZVVzZWQgfHwgIWFyZWFEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NwZWVkRG91YmxlVXNlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNwZWVkTXVsID0gYXJlYURhdGEuc3BlZWRNdWx0aXBsaWVyIHx8IDM7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgKj0gc3BlZWRNdWw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gY2MuY29sb3IoODAsIDE4MCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3Bhd25TcGVlZERvdWJsZUZ4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3blNwZWVkRG91YmxlRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlcG9ydE11bHRpcGxheWVyRXZlbnQoXCJzcGVlZERvdWJsZVwiLCBhcmVhRGF0YS5ldmVudElkIHx8IFwiXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVwb3J0TXVsdGlwbGF5ZXJFdmVudCh0eXBlLCBldmVudElkID0gXCJcIiwgcmVhc29uID0gXCJcIikge1xyXG4gICAgICAgIGlmICghdGhpcy5fbmV0d29ya0J1bGxldElkIHx8ICF0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlcG9ydEtleSA9IHR5cGUgKyBcIjpcIiArIChldmVudElkIHx8IFwiXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckV2ZW50UmVwb3J0ZWRbcmVwb3J0S2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRXZlbnRSZXBvcnRlZFtyZXBvcnRLZXldID0gdHJ1ZTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm11bHRpcGxheWVyLWJ1bGxldC1ldmVudFwiLCB7XHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIGJ1bGxldElkOiB0aGlzLl9uZXR3b3JrQnVsbGV0SWQsXHJcbiAgICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50SWQgfHwgXCJcIixcclxuICAgICAgICAgICAgcmVhc29uOiByZWFzb24gfHwgXCJcIixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseU11bHRpcGxheWVyQm91bmNlKGJvdW5jZUxlZnQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU3RvcCB8fCB0aGlzLl9tdXRhdGlvblR5cGUgIT0gXCJib3VuY2VcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib3VuY2VMZWZ0ICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKGJvdW5jZUxlZnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5jZUxlZnQgPSBNYXRoLm1heCgwLCBib3VuY2VMZWZ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fYm91bmNlTGVmdCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmNlTGVmdC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hhc0JvdW5jZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1VzZWRTcHJlYWRCdWxsZXRBcmVhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcHJlYWRCdWxsZXRVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyU3ByZWFkQnVsbGV0QXJlYShhcmVhRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zcHJlYWRCdWxsZXRVc2VkIHx8ICFhcmVhRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zcHJlYWRCdWxsZXRVc2VkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc3ByZWFkQW5nbGUgPSBhcmVhRGF0YS5zcHJlYWRBbmdsZSB8fCAyMDtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMuX21hcDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gKGkgPT0gMCA/IC0xIDogMSkgKiBzcHJlYWRBbmdsZTtcclxuICAgICAgICAgICAgbGV0IGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyh0aGlzLl9kaXIsIGFuZ2xlKTtcclxuICAgICAgICAgICAgbGV0IGJwb3MgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLmFkZChiZGlyLm11bCgxMikpO1xyXG4gICAgICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsIGJkaXIsIHRoaXMuX2d1bnNob3QsIHRoaXMuX2RhbWFnZSwgdGhpcy5fc3BlZWQsIHRoaXMuX2NhbXAsIHBhcmVudE5vZGUsIG1hcCwgdGhpcy5fYnVsbGV0VHlwZSwgdGhpcy5fbXV0YXRpb25EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduU3ByZWFkQnVsbGV0RngpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduU3ByZWFkQnVsbGV0RngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlckNlbnRyaWZ1Z2FsUmluZyhyaW5nRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jZW50cmlmdWdhbFVzZWQgfHwgdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSB8fCAhcmluZ0RhdGEgfHwgIXJpbmdEYXRhLmNlbnRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2VudGVyID0gY2MudjIocmluZ0RhdGEuY2VudGVyKTtcclxuICAgICAgICBsZXQgY2VudGVyVG9CdWxsZXQgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLnN1YihjZW50ZXIpO1xyXG4gICAgICAgIGlmIChjZW50ZXJUb0J1bGxldC5tYWdTcXIoKSA8PSAxKSB7XHJcbiAgICAgICAgICAgIGNlbnRlclRvQnVsbGV0ID0gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci5tYWdTcXIoKSA+IDBcclxuICAgICAgICAgICAgICAgID8gdGhpcy5fZGlyLm5vcm1hbGl6ZSgpLm11bCgtKHJpbmdEYXRhLm9yYml0UmFkaXVzIHx8IDcyKSlcclxuICAgICAgICAgICAgICAgIDogY2MudjIoLShyaW5nRGF0YS5vcmJpdFJhZGl1cyB8fCA3MiksIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0QW5nbGUgPSBNYXRoLmF0YW4yKGNlbnRlclRvQnVsbGV0LnksIGNlbnRlclRvQnVsbGV0LngpO1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb25TaWduID0gcmluZ0RhdGEuZGlyZWN0aW9uU2lnbiA9PSBudWxsID8gLTEgOiByaW5nRGF0YS5kaXJlY3Rpb25TaWduO1xyXG4gICAgICAgIGxldCByb3RhdGVBbmdsZSA9IE1hdGguYWJzKHJpbmdEYXRhLnJvdGF0ZUFuZ2xlID09IG51bGwgPyBNYXRoLlBJICogMC41IDogcmluZ0RhdGEucm90YXRlQW5nbGUpO1xyXG4gICAgICAgIGxldCBvcmJpdFJhZGl1cyA9IHJpbmdEYXRhLm9yYml0UmFkaXVzIHx8IE1hdGgubWF4KDY0LCBjZW50ZXJUb0J1bGxldC5tYWcoKSk7XHJcbiAgICAgICAgbGV0IGFuZ3VsYXJTcGVlZCA9IHJpbmdEYXRhLmFuZ3VsYXJTcGVlZCB8fCBNYXRoLlBJICogNC4yO1xyXG5cclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFN0YXRlID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgICAgb3JiaXRSYWRpdXM6IG9yYml0UmFkaXVzLFxyXG4gICAgICAgICAgICBzdGFydEFuZ2xlOiBzdGFydEFuZ2xlLFxyXG4gICAgICAgICAgICBjdXJyZW50QW5nbGU6IHN0YXJ0QW5nbGUsXHJcbiAgICAgICAgICAgIG1vdmVkQW5nbGU6IDAsXHJcbiAgICAgICAgICAgIHJvdGF0ZUFuZ2xlOiByb3RhdGVBbmdsZSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uU2lnbjogZGlyZWN0aW9uU2lnbiA+PSAwID8gMSA6IC0xLFxyXG4gICAgICAgICAgICBhbmd1bGFyU3BlZWQ6IGFuZ3VsYXJTcGVlZCxcclxuICAgICAgICAgICAgc3BlZWRCb29zdDogcmluZ0RhdGEuc3BlZWRCb29zdCB8fCAxLjg1LFxyXG4gICAgICAgICAgICBkYW1hZ2VCb29zdDogcmluZ0RhdGEuZGFtYWdlQm9vc3QgfHwgMS43LFxyXG4gICAgICAgICAgICByYWRpdXNFeHBhbmQ6IHJpbmdEYXRhLnJhZGl1c0V4cGFuZCB8fCAxOCxcclxuICAgICAgICAgICAgY29sb3I6IHJpbmdEYXRhLmNvbG9yIHx8IGNjLmNvbG9yKDI1NSwgMTY1LCA5MCwgMjU1KSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3NwYXduQ2VudHJpZnVnYWxFbnRlckZ4KCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUNlbnRyaWZ1Z2FsTW90aW9uKGR0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jZW50cmlmdWdhbFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGU7XHJcbiAgICAgICAgc3RhdGUubW92ZWRBbmdsZSArPSBzdGF0ZS5hbmd1bGFyU3BlZWQgKiBkdDtcclxuICAgICAgICBpZiAoc3RhdGUubW92ZWRBbmdsZSA+IHN0YXRlLnJvdGF0ZUFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLm1vdmVkQW5nbGUgPSBzdGF0ZS5yb3RhdGVBbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRlLmN1cnJlbnRBbmdsZSA9IHN0YXRlLnN0YXJ0QW5nbGUgKyBzdGF0ZS5kaXJlY3Rpb25TaWduICogc3RhdGUubW92ZWRBbmdsZTtcclxuICAgICAgICBsZXQgYW5nbGVQcm9ncmVzcyA9IHN0YXRlLnJvdGF0ZUFuZ2xlID4gMCA/IHN0YXRlLm1vdmVkQW5nbGUgLyBzdGF0ZS5yb3RhdGVBbmdsZSA6IDE7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IHN0YXRlLm9yYml0UmFkaXVzICsgc3RhdGUucmFkaXVzRXhwYW5kICogYW5nbGVQcm9ncmVzcztcclxuICAgICAgICBsZXQgb3JiaXRQb3MgPSBzdGF0ZS5jZW50ZXIuYWRkKGNjLnYyKE1hdGguY29zKHN0YXRlLmN1cnJlbnRBbmdsZSksIE1hdGguc2luKHN0YXRlLmN1cnJlbnRBbmdsZSkpLm11bChyYWRpdXMpKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2MudjMob3JiaXRQb3MpKTtcclxuXHJcbiAgICAgICAgbGV0IHRhbmdlbnREaXIgPSBzdGF0ZS5kaXJlY3Rpb25TaWduID4gMFxyXG4gICAgICAgICAgICA/IGNjLnYyKC1NYXRoLnNpbihzdGF0ZS5jdXJyZW50QW5nbGUpLCBNYXRoLmNvcyhzdGF0ZS5jdXJyZW50QW5nbGUpKVxyXG4gICAgICAgICAgICA6IGNjLnYyKE1hdGguc2luKHN0YXRlLmN1cnJlbnRBbmdsZSksIC1NYXRoLmNvcyhzdGF0ZS5jdXJyZW50QW5nbGUpKTtcclxuICAgICAgICBpZiAodGFuZ2VudERpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlyID0gdGFuZ2VudERpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpIC0gOTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3JiaXRTY2FsZSA9IDEgKyAwLjI0ICogYW5nbGVQcm9ncmVzcztcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVggPSBvcmJpdFNjYWxlO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZID0gb3JiaXRTY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gc3RhdGUuY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdGUubW92ZWRBbmdsZSA+PSBzdGF0ZS5yb3RhdGVBbmdsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFN0YXRlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxVc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3BlZWQgKj0gc3RhdGUuc3BlZWRCb29zdDtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlICo9IHN0YXRlLmRhbWFnZUJvb3N0O1xyXG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95VGltZSAqPSAxLjM1O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2MudjMob3JiaXRQb3MuYWRkKHRoaXMuX2Rpci5tdWwoTWF0aC5tYXgoMTgsIHRoaXMuX3NwZWVkICogMC42NSkpKSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGF3bkNlbnRyaWZ1Z2FsUmVsZWFzZUZ4KHN0YXRlLmNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduQ2VudHJpZnVnYWxFbnRlckZ4KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFwIHx8ICF0aGlzLl9tYXAuc3Bhd25DZW50cmlmdWdhbFJpbmdGeCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbiksIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25DZW50cmlmdWdhbFJlbGVhc2VGeChjb2xvcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFwIHx8ICF0aGlzLl9tYXAuc3Bhd25DZW50cmlmdWdhbFJpbmdGeCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbiksIHRydWUsIGNvbG9yLCB0aGlzLl9kaXIsIHRoaXMuX3NwZWVkKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25DbHVzdGVyU3ViQnVsbGV0cygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgY291bnQgPSA4O1xyXG4gICAgICAgIGxldCBzcHJlYWRBbmdsZSA9IDQ1O1xyXG4gICAgICAgIGxldCBzdGFydEFuZ2xlID0gLShzcHJlYWRBbmdsZSAvIDIpO1xyXG4gICAgICAgIGxldCBzdGVwID0gc3ByZWFkQW5nbGUgLyAoY291bnQgLSAxKTtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHN1Ykd1bnNob3QgPSB0aGlzLl9ndW5zaG90ICogMC40O1xyXG4gICAgICAgIGxldCBzdWJEYW1hZ2UgPSB0aGlzLl9kYW1hZ2UgKiAwLjU7XHJcbiAgICAgICAgbGV0IHN1YlNwZWVkID0gdGhpcy5fc3BlZWQgKiAxLjI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBzdGFydEFuZ2xlICsgaSAqIHN0ZXA7XHJcbiAgICAgICAgICAgIGxldCBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3ModGhpcy5fZGlyLCBhbmdsZSk7XHJcbiAgICAgICAgICAgIGxldCBicG9zID0gcG9zLmFkZChiZGlyLm11bCgxNikpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gKGkgLSAoY291bnQgLSAxKSAvIDIpICogNjtcclxuICAgICAgICAgICAgYnBvcyA9IGJwb3MuYWRkKGNjLnYyKC1iZGlyLnksIGJkaXIueCkubXVsKG9mZnNldCkpO1xyXG4gICAgICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsIGJkaXIsIHN1Ykd1bnNob3QsIHN1YkRhbWFnZSwgc3ViU3BlZWQsIHRoaXMuX2NhbXAsIHBhcmVudE5vZGUsIHRoaXMuX21hcCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu65a2Q5by5XHJcbiAgICBzdGF0aWMgY3JlYXRlQnVsbGV0KHBvcyxkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxidWxsZXRUeXBlID0gbnVsbCwgbXV0YXRpb25EYXRhID0gbnVsbCwgbmV0d29ya01ldGEgPSBudWxsKXtcclxuICAgICAgICBzcGVlZCA9IChjYW1wID09IFwiZW5lbXlcIikgPyBzcGVlZCowLjggOiBzcGVlZDtcclxuXHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKG1hcC5idWxsZXRQcmVmYWIpO1xyXG4gICAgICAgIGJ1bGxldC5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIGJ1bGxldC5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICBidWxsZXQuekluZGV4ID0gNTAwMDtcclxuICAgICAgICBidWxsZXQuc2NyaXB0LmluaXRCdWxsZXQoZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAsbWFwLl9sZXZlbElkLGJ1bGxldFR5cGUsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICBidWxsZXQuc2NyaXB0LnNldE1hcChtYXApO1xyXG4gICAgICAgIGlmIChuZXR3b3JrTWV0YSAmJiBidWxsZXQuc2NyaXB0LnNldE11bHRpcGxheWVyTWV0YSkge1xyXG4gICAgICAgICAgICBidWxsZXQuc2NyaXB0LnNldE11bHRpcGxheWVyTWV0YShuZXR3b3JrTWV0YS5idWxsZXRJZCwgbmV0d29ya01ldGEub3duZXJQbGF5ZXJJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYnVsbGV0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WIm+W7uuWtkOW8uSjnsbvlnosv5L2N572uL+aWueWQkS/ngq7nrqHplb/luqYv5bCE56iLL+aUu+WHu+WKmy/nm67moIfpmLXokKUpXHJcbiAgICBzdGF0aWMgY3JlYXRlQnVsbGV0RXgoYnVsbGV0VHlwZSxwb3MsZGlyLHdpcGVMZW4sZ3Vuc2hvdCxhdGssY2FtcCxwYXJlbnROb2RlLG1hcCxzcGVlZCA9IDE2LG11dGF0aW9uRGF0YSA9IG51bGwsIG5ldHdvcmtNZXRhID0gbnVsbCl7XHJcbiAgICAgICAgZ3Vuc2hvdCA9IGd1bnNob3QgLSB3aXBlTGVuO1xyXG4gICAgICAgIGxldCBiZGlyID0gZGlyO1xyXG4gICAgICAgIGxldCBicG9zID0gcG9zO1xyXG4gICAgICAgIGxldCBidWxsZXQgPSBudWxsO1xyXG5cclxuICAgICAgICBzd2l0Y2goYnVsbGV0VHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICBiZGlyID0gYmRpcjtcclxuICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhLG5ldHdvcmtNZXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSAyLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSxuZXR3b3JrTWV0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSA1KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEsbmV0d29ya01ldGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gNy41KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEsbmV0d29ya01ldGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA1OntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gMTIuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhLG5ldHdvcmtNZXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgOTk6e1xyXG4gICAgICAgICAgICAgICAgYmRpciA9IGJkaXI7XHJcbiAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxidWxsZXRUeXBlLG11dGF0aW9uRGF0YSxuZXR3b3JrTWV0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEwMDp7XHJcbiAgICAgICAgICAgICAgICBiZGlyID0gYmRpcjtcclxuICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLGJ1bGxldFR5cGUsbXV0YXRpb25EYXRhLG5ldHdvcmtNZXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAxOntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEsbmV0d29ya01ldGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqOTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssMyxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwzNippKTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLDEuNSxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=