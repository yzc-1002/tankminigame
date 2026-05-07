
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRFLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTRCLDBCQUFhO0lBQXpDO1FBQUEscUVBa2tCQztRQWhrQkcsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ3RDLGtCQUFZLEdBQU0sQ0FBQyxDQUFDLENBQVksTUFBTTtRQUN0QyxVQUFJLEdBQWMsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUM3QyxVQUFJLEdBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3hDLFlBQU0sR0FBWSxDQUFDLENBQUM7UUFDcEIsY0FBUSxHQUFVLEVBQUUsQ0FBQyxDQUFXLElBQUk7UUFDcEMsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFZLEtBQUs7UUFDckMsa0JBQVksR0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFXLE1BQU07UUFDdEMsV0FBSyxHQUFhLEVBQUUsQ0FBQyxDQUFXLGtCQUFrQjtRQUNsRCxhQUFPLEdBQVcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFXLEdBQU8sUUFBUSxDQUFDLENBQUssbUJBQW1CO1FBQ25ELG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQUssSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQU8sQ0FBQyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUksQ0FBQyxDQUFDO1FBQ3BCLG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0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SyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDNUMsSUFBSSxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDdEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1NBQ3hDO1FBRUQsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMvRSxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztRQUNwRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxhQUFhLEdBQUcsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FB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YXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vL+engeacieWHveaVsCzor7fkvb/nlKgnXyflvIDlpLRcclxuLy/or7fkv67mlLknTmV3Q2xhc3MnID0+IOiHquW3seeahOexu+WQjVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgX2J1bGxldFR5cGUgICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgX2J1bGxldExldmVsICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueetiee6p1xyXG4gICAgX21hcCAgICAgICAgICAgID0gbnVsbDsgICAgICAgICAvL3RpbGUgbWFwIOiKgueCuVxyXG4gICAgX2RpciAgICAgICAgICAgID0gY2MudjIoMSwwKTsgICAvL+W9k+WJjeihjOi/m+aWueWQkVxyXG4gICAgX3NwZWVkICAgICAgICAgID0gNTtcclxuICAgIF9ndW5zaG90ICAgICAgICA9IDEwOyAgICAgICAgICAgLy/lsITnqItcclxuICAgIF9kYW1hZ2UgICAgICAgICA9IDA7ICAgICAgICAgICAgLy/mlLvlh7vliptcclxuICAgIF9kZXN0cm95VGltZSAgICA9IC0xOyAgICAgICAgICAgLy/plIDmr4Hml7bpl7RcclxuICAgIF9jYW1wICAgICAgICAgICA9IFwiXCI7ICAgICAgICAgICAvL+mYteiQpShwbGF5ZXIvZW5lbXkpXHJcbiAgICBfaW5HYW1lICAgICAgICAgPSBmYWxzZTtcclxuICAgIF9kYW1hZ2VUeXBlICAgICA9IFwibm9ybWFsXCI7ICAgICAvL+S8pOWus+exu+Weiyhub3JtYWwvY3JpdClcclxuICAgIF9tdXRhdGlvblR5cGUgICA9IFwiXCI7XHJcbiAgICBfbXV0YXRpb25EYXRhICAgPSBudWxsO1xyXG4gICAgX2JvdW5jZUxlZnQgICAgID0gMDtcclxuICAgIF9wZW5ldHJhdGVMZWZ0ICA9IDA7XHJcbiAgICBfaGl0VGFyZ2V0SWRzICAgPSB7fTtcclxuICAgIF9wb3J0YWxJZ25vcmVJZCA9IFwiXCI7XHJcbiAgICBfcG9ydGFsSWdub3JlVGltZSA9IDA7XHJcbiAgICBfY2VudHJpZnVnYWxTdGF0ZSA9IG51bGw7XHJcbiAgICBfY2VudHJpZnVnYWxVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgX2N1cnJlbkJ1bGxldCAgID0gbnVsbDtcclxuICAgIF9pc1N0b3AgICAgICAgICA9IGZhbHNlO1xyXG5cclxuICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcclxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5zY2FsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblrZDlvLko5pa55ZCRL+WwhOeoiy/kvKTlrrPlgLwv6YCf5bqmL+mYteiQpS/lvZPliY3lhbPljaEpXHJcbiAgICBpbml0QnVsbGV0KGRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLGxldmVsSWQsYnVsbGV0VHlwZSA9IG51bGwsIG11dGF0aW9uRGF0YSA9IG51bGwpe1xyXG4gICAgICAgIHRoaXMuX2RpciA9IGRpcjtcclxuICAgICAgICB0aGlzLl9ndW5zaG90ID0gZ3Vuc2hvdDtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSA9IGF0aztcclxuICAgICAgICB0aGlzLl9jYW1wID0gY2FtcDtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VUeXBlID0gXCJub3JtYWxcIjtcclxuICAgICAgICB0aGlzLl9kZXN0cm95VGltZSA9IHRoaXMuX2d1bnNob3QvdGhpcy5fc3BlZWQvNjA7XHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25UeXBlID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9tdXRhdGlvbkRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZUxlZnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3BlbmV0cmF0ZUxlZnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2hpdFRhcmdldElkcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZUlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFVzZWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgICAgIGlmIChjYW1wID09IFwiZW5lbXlcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TGV2ZWwgPSBsZXZlbElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChidWxsZXRUeXBlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IGJ1bGxldFR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldExldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfYnVsbGV0XyR7dGhpcy5fYnVsbGV0VHlwZX1fYCwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9jdXJyZW50X2J1bGxldF90eXBlX1wiLDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRMZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX2J1bGxldF8ke3RoaXMuX2J1bGxldFR5cGV9X2AsMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WtkOW8ueadgOWus+WKoOaIkO+8iOaatOWHu+amgueOh++8iVxyXG4gICAgICAgIGxldCBidWxsZXRDb25maWdzID0geXlwLmNvbmZpZyAmJiB5eXAuY29uZmlnLkJ1bGxldCA/IHl5cC5jb25maWcuQnVsbGV0IDoge307XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IGJ1bGxldENvbmZpZ3NbdGhpcy5fYnVsbGV0VHlwZV07XHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuQVRLICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlICs9IGNvbmZpZy5BVEsgKiAodGhpcy5fYnVsbGV0TGV2ZWwgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwicGxheWVyXCIgJiYgTWF0aC5yYW5kb20oKSA8IDAuMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gMjtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlVHlwZSA9IFwiY3JpdFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5HYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldEJ1bGxldFR5cGUodGhpcy5fYnVsbGV0VHlwZSk7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlNdXRhdGlvbkRhdGEobXV0YXRpb25EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdWxsZXRUeXBlKHR5cGUpe1xyXG4gICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8v5a2Q5by5XHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lICE9IFwiX3NwckJ1bGxldFwiICsgdGhpcy5fYnVsbGV0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQgPSBjaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0ID0gdGhpcy5fY3JlYXRlRGVmYXVsdEJ1bGxldCh0eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgodHlwZSA9PSA5OSB8fCB0eXBlID09IDEwMCkgJiYgdGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNldFNjYWxlKDEuMDUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gY2MuY29sb3IoODUsIDU4LCAzMCwgMjU1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5vcGFjaXR5ID0gMjQwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2V0U2NhbGUoMC44NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuY29sb3IgPSBjYy5jb2xvcigyNTUsIDkwLCA2MCwgMjU1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6LCD5pW05a2Q5by56KeS5bqmXHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKS05MDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2FwcGx5TXV0YXRpb25EYXRhKG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wICE9IFwicGxheWVyXCIgfHwgIW11dGF0aW9uRGF0YSB8fCAhbXV0YXRpb25EYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX211dGF0aW9uVHlwZSA9IG11dGF0aW9uRGF0YS5pZDtcclxuICAgICAgICB0aGlzLl9tdXRhdGlvbkRhdGEgPSBtdXRhdGlvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5fYm91bmNlTGVmdCA9IG11dGF0aW9uRGF0YS5ib3VuY2VDb3VudCB8fCAwO1xyXG4gICAgICAgIHRoaXMuX3BlbmV0cmF0ZUxlZnQgPSBtdXRhdGlvbkRhdGEucGVuZXRyYXRlQ291bnQgfHwgMDtcclxuXHJcbiAgICAgICAgaWYgKG11dGF0aW9uRGF0YS5kYW1hZ2VSYXRpbyAmJiBtdXRhdGlvbkRhdGEuZGFtYWdlUmF0aW8gIT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gbXV0YXRpb25EYXRhLmRhbWFnZVJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE11dGF0aW9uVmlzdWFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNdXRhdGlvblZpc3VhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbkJ1bGxldCB8fCAhdGhpcy5fbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX211dGF0aW9uRGF0YS5zY2FsZSB8fCAxO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVggPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYKSAqIHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkgPSBNYXRoLmFicyh0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVZKSAqIHNjYWxlO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvbkRhdGEuY29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gdGhpcy5fbXV0YXRpb25EYXRhLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlRGVmYXVsdEJ1bGxldCh0eXBlKSB7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IG5ldyBjYy5Ob2RlKFwiX3NwckJ1bGxldFwiICsgdHlwZSk7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBidWxsZXQuc2V0Q29udGVudFNpemUoNzAsIDcwKTtcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidWxsZXQuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gOTkpIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA1NSwgMzUsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyMzAsIDEyMCwgMjMwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDEzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBidWxsZXQuc2NhbGUgPSAxLjQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDcwLCA0OCwgMjgsIDIzNSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyMik7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjQsIDE4LCAxNCwgMjIwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKC04LCAzLCA5KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMTAsIC00LCAxMSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlID0gMS4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI0MCwgMCwgMjQwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE0KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rnRpbGVkIG1hcFxyXG4gICAgc2V0TWFwKG1hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+avj+W4p+iwg+eUqFxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gdHJ1ZSAmJiB0aGlzLl9pc1N0b3AgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3lUaW1lICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95VGltZSAtPSBkdDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3lUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVsbGV0VHlwZSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFuZE9pbFNwaWxsKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mUgOavgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2VudHJpZnVnYWxNb3Rpb24oZHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcG9ydGFsSWdub3JlVGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BvcnRhbElnbm9yZVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVJZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v5pu05paw5L2N572uXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lsbFBvc2l0aW9uID0gY3VyclBvc2l0aW9uLmFkZChjYy52Myh0aGlzLl9kaXIubXVsKHRoaXMuX3NwZWVkKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAuaXNNYXAoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeUVudGVyQ2VudHJpZnVnYWxSaW5nICYmIHRoaXMuX21hcC50cnlFbnRlckNlbnRyaWZ1Z2FsUmluZyh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlUZWxlcG9ydEJ1bGxldCAmJiB0aGlzLl9tYXAudHJ5VGVsZXBvcnRCdWxsZXQodGhpcywgY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsUG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyUG9zaXRpb24gPSB3aWxsUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWxsZXRUeXBlID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyU2VnbWVudCA9IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5fbWFwLmJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uVGVzdChjdXJyUG9zaXRpb24sd2lsbFBvc2l0aW9uKSA/IHt9IDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXJTZWdtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYW5kT2lsU3BpbGwoY3VyclBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95SW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC50cnlIYW5kbGVDb3ZlckJ1bGxldENvbGxpc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21hcC50cnlIYW5kbGVDb3ZlckJ1bGxldENvbGxpc2lvbihjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbiwgdGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WtkOW8ueWSjOWdpuWFi+ajgOa1i1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpdFRhbmsgPSB0aGlzLl9tYXAuYnVsbGV0RW5lbXlDb2xsaXNpb25UZXN0KHdpbGxQb3NpdGlvbix0aGlzLl9jYW1wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoaXRUYW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlSGl0VGFuayhoaXRUYW5rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lrZDlvLnlkozpmpznoo3nianmo4DmtYtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXJTZWdtZW50ID0gdGhpcy5fbWFwLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX21hcC5nZXRCdWxsZXRPYnN0YWNsZUNvbGxpc2lvblNlZ21lbnQoY3VyclBvc2l0aW9uLCB3aWxsUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMuX21hcC5idWxsZXRPYnN0YWNsZUNvbGxpc2lvblRlc3QoY3VyclBvc2l0aW9uLHdpbGxQb3NpdGlvbikgPyB7fSA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlclNlZ21lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVPYnN0YWNsZUNvbGxpc2lvbihjdXJyUG9zaXRpb24sIGNvbGxpZGVyU2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+BXHJcbiAgICBkb0Rlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLl9pc1N0b3AgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy/niIbngrjliqjnlLtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwwLjUsMC41KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2Rlc3Ryb3lJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICB0aGlzLl9pc1N0b3AgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUhpdFRhbmsoaGl0VGFuaykge1xyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IGhpdFRhbmsudXVpZCB8fCBoaXRUYW5rW1wiX2lkXCJdIHx8IGhpdFRhbmsubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25UeXBlID09IFwicGVuZXRyYXRlXCIgJiYgdGhpcy5faGl0VGFyZ2V0SWRzW3RhcmdldElkXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaXRUYW5rLnNjcmlwdC5iZUhpdCh0aGlzLl9kYW1hZ2UsIHRoaXMuX2RhbWFnZVR5cGUpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwicGxheWVyXCIgJiYgdGhpcy5fZGFtYWdlVHlwZSA9PSBcImNyaXRcIlxyXG4gICAgICAgICAgICAmJiB0aGlzLl9tYXAucGxheVBsYXllckNyaXRGZWVkYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheVBsYXllckNyaXRGZWVkYmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX211dGF0aW9uVHlwZSA9PSBcInBlbmV0cmF0ZVwiICYmIHRoaXMuX3BlbmV0cmF0ZUxlZnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpdFRhcmdldElkc1t0YXJnZXRJZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9wZW5ldHJhdGVMZWZ0LS07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wZW5ldHJhdGVMZWZ0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVPYnN0YWNsZUNvbGxpc2lvbihjdXJyUG9zaXRpb24sIGNvbGxpZGVyU2VnbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvblR5cGUgPT0gXCJib3VuY2VcIiAmJiB0aGlzLl9ib3VuY2VMZWZ0ID4gMCAmJiBjb2xsaWRlclNlZ21lbnQgJiYgY29sbGlkZXJTZWdtZW50LkEgJiYgY29sbGlkZXJTZWdtZW50LkIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmNlTGVmdC0tO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXIgPSB0aGlzLl9yZWZsZWN0RGlyZWN0aW9uQnlTZWdtZW50KHRoaXMuX2RpciwgY29sbGlkZXJTZWdtZW50LkEsIGNvbGxpZGVyU2VnbWVudC5CKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpIC0gOTA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjdXJyUG9zaXRpb24uYWRkKGNjLnYzKHRoaXMuX2Rpci5tdWwoTWF0aC5tYXgoNiwgdGhpcy5fc3BlZWQgKiAwLjc1KSkpKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZG9EZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xhbmRPaWxTcGlsbChwb3MpIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zcGF3bk9pbFNwaWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3bk9pbFNwaWxsKGNjLnYyKHBvcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVmbGVjdERpcmVjdGlvbkJ5U2VnbWVudChkaXIsIEEsIEIpIHtcclxuICAgICAgICBsZXQgd2FsbERpciA9IEIuc3ViKEEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCBub3JtYWwgPSBjYy52Migtd2FsbERpci55LCB3YWxsRGlyLngpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCBkb3QgPSBkaXIuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgbGV0IHJlZmxlY3REaXIgPSBkaXIuc3ViKG5vcm1hbC5tdWwoMiAqIGRvdCkpO1xyXG4gICAgICAgIGlmIChyZWZsZWN0RGlyLm1hZ1NxcigpIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpci5tdWwoLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVmbGVjdERpci5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQb3J0YWxJZ25vcmVJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9ydGFsSWdub3JlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGVsZXBvcnRCeVBvcnRhbChwb3MsIGlnbm9yZVBvcnRhbElkID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52Myhwb3MpKTtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVJZCA9IGlnbm9yZVBvcnRhbElkIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fcG9ydGFsSWdub3JlVGltZSA9IDAuMDg7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzVXNlZENlbnRyaWZ1Z2FsUmluZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2VudHJpZnVnYWxVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyQ2VudHJpZnVnYWxSaW5nKHJpbmdEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZCB8fCB0aGlzLl9jZW50cmlmdWdhbFN0YXRlIHx8ICFyaW5nRGF0YSB8fCAhcmluZ0RhdGEuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjZW50ZXIgPSBjYy52MihyaW5nRGF0YS5jZW50ZXIpO1xyXG4gICAgICAgIGxldCBjZW50ZXJUb0J1bGxldCA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuc3ViKGNlbnRlcik7XHJcbiAgICAgICAgaWYgKGNlbnRlclRvQnVsbGV0Lm1hZ1NxcigpIDw9IDEpIHtcclxuICAgICAgICAgICAgY2VudGVyVG9CdWxsZXQgPSB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLm1hZ1NxcigpID4gMFxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9kaXIubm9ybWFsaXplKCkubXVsKC0ocmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgNzIpKVxyXG4gICAgICAgICAgICAgICAgOiBjYy52MigtKHJpbmdEYXRhLm9yYml0UmFkaXVzIHx8IDcyKSwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IE1hdGguYXRhbjIoY2VudGVyVG9CdWxsZXQueSwgY2VudGVyVG9CdWxsZXQueCk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvblNpZ24gPSByaW5nRGF0YS5kaXJlY3Rpb25TaWduID09IG51bGwgPyAtMSA6IHJpbmdEYXRhLmRpcmVjdGlvblNpZ247XHJcbiAgICAgICAgbGV0IHJvdGF0ZUFuZ2xlID0gTWF0aC5hYnMocmluZ0RhdGEucm90YXRlQW5nbGUgPT0gbnVsbCA/IE1hdGguUEkgKiAwLjUgOiByaW5nRGF0YS5yb3RhdGVBbmdsZSk7XHJcbiAgICAgICAgbGV0IG9yYml0UmFkaXVzID0gcmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgTWF0aC5tYXgoNjQsIGNlbnRlclRvQnVsbGV0Lm1hZygpKTtcclxuICAgICAgICBsZXQgYW5ndWxhclNwZWVkID0gcmluZ0RhdGEuYW5ndWxhclNwZWVkIHx8IE1hdGguUEkgKiA0LjI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICBvcmJpdFJhZGl1czogb3JiaXRSYWRpdXMsXHJcbiAgICAgICAgICAgIHN0YXJ0QW5nbGU6IHN0YXJ0QW5nbGUsXHJcbiAgICAgICAgICAgIGN1cnJlbnRBbmdsZTogc3RhcnRBbmdsZSxcclxuICAgICAgICAgICAgbW92ZWRBbmdsZTogMCxcclxuICAgICAgICAgICAgcm90YXRlQW5nbGU6IHJvdGF0ZUFuZ2xlLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb25TaWduOiBkaXJlY3Rpb25TaWduID49IDAgPyAxIDogLTEsXHJcbiAgICAgICAgICAgIGFuZ3VsYXJTcGVlZDogYW5ndWxhclNwZWVkLFxyXG4gICAgICAgICAgICBzcGVlZEJvb3N0OiByaW5nRGF0YS5zcGVlZEJvb3N0IHx8IDEuODUsXHJcbiAgICAgICAgICAgIGRhbWFnZUJvb3N0OiByaW5nRGF0YS5kYW1hZ2VCb29zdCB8fCAxLjcsXHJcbiAgICAgICAgICAgIHJhZGl1c0V4cGFuZDogcmluZ0RhdGEucmFkaXVzRXhwYW5kIHx8IDE4LFxyXG4gICAgICAgICAgICBjb2xvcjogcmluZ0RhdGEuY29sb3IgfHwgY2MuY29sb3IoMjU1LCAxNjUsIDkwLCAyNTUpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fc3Bhd25DZW50cmlmdWdhbEVudGVyRngoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlQ2VudHJpZnVnYWxNb3Rpb24oZHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fY2VudHJpZnVnYWxTdGF0ZTtcclxuICAgICAgICBzdGF0ZS5tb3ZlZEFuZ2xlICs9IHN0YXRlLmFuZ3VsYXJTcGVlZCAqIGR0O1xyXG4gICAgICAgIGlmIChzdGF0ZS5tb3ZlZEFuZ2xlID4gc3RhdGUucm90YXRlQW5nbGUpIHtcclxuICAgICAgICAgICAgc3RhdGUubW92ZWRBbmdsZSA9IHN0YXRlLnJvdGF0ZUFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGUuY3VycmVudEFuZ2xlID0gc3RhdGUuc3RhcnRBbmdsZSArIHN0YXRlLmRpcmVjdGlvblNpZ24gKiBzdGF0ZS5tb3ZlZEFuZ2xlO1xyXG4gICAgICAgIGxldCBhbmdsZVByb2dyZXNzID0gc3RhdGUucm90YXRlQW5nbGUgPiAwID8gc3RhdGUubW92ZWRBbmdsZSAvIHN0YXRlLnJvdGF0ZUFuZ2xlIDogMTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gc3RhdGUub3JiaXRSYWRpdXMgKyBzdGF0ZS5yYWRpdXNFeHBhbmQgKiBhbmdsZVByb2dyZXNzO1xyXG4gICAgICAgIGxldCBvcmJpdFBvcyA9IHN0YXRlLmNlbnRlci5hZGQoY2MudjIoTWF0aC5jb3Moc3RhdGUuY3VycmVudEFuZ2xlKSwgTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSkubXVsKHJhZGl1cykpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MyhvcmJpdFBvcykpO1xyXG5cclxuICAgICAgICBsZXQgdGFuZ2VudERpciA9IHN0YXRlLmRpcmVjdGlvblNpZ24gPiAwXHJcbiAgICAgICAgICAgID8gY2MudjIoLU1hdGguc2luKHN0YXRlLmN1cnJlbnRBbmdsZSksIE1hdGguY29zKHN0YXRlLmN1cnJlbnRBbmdsZSkpXHJcbiAgICAgICAgICAgIDogY2MudjIoTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSwgLU1hdGguY29zKHN0YXRlLmN1cnJlbnRBbmdsZSkpO1xyXG4gICAgICAgIGlmICh0YW5nZW50RGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXIgPSB0YW5nZW50RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpcikgLSA5MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvcmJpdFNjYWxlID0gMSArIDAuMjQgKiBhbmdsZVByb2dyZXNzO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCA9IG9yYml0U2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkgPSBvcmJpdFNjYWxlO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuY29sb3IgPSBzdGF0ZS5jb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZS5tb3ZlZEFuZ2xlID49IHN0YXRlLnJvdGF0ZUFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGVlZCAqPSBzdGF0ZS5zcGVlZEJvb3N0O1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gc3RhdGUuZGFtYWdlQm9vc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lUaW1lICo9IDEuMzU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MyhvcmJpdFBvcy5hZGQodGhpcy5fZGlyLm11bChNYXRoLm1heCgxOCwgdGhpcy5fc3BlZWQgKiAwLjY1KSkpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwYXduQ2VudHJpZnVnYWxSZWxlYXNlRngoc3RhdGUuY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3Bhd25DZW50cmlmdWdhbEVudGVyRngoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkNlbnRyaWZ1Z2FsUmVsZWFzZUZ4KGNvbG9yKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5zcGF3bkNlbnRyaWZ1Z2FsUmluZ0Z4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSwgdHJ1ZSwgY29sb3IsIHRoaXMuX2RpciwgdGhpcy5fc3BlZWQpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL+WIm+W7uuWtkOW8uVxyXG4gICAgc3RhdGljIGNyZWF0ZUJ1bGxldChwb3MsZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSA9IG51bGwsIG11dGF0aW9uRGF0YSA9IG51bGwpe1xyXG4gICAgICAgIHNwZWVkID0gKGNhbXAgPT0gXCJlbmVteVwiKSA/IHNwZWVkKjAuOCA6IHNwZWVkO1xyXG5cclxuICAgICAgICBsZXQgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUobWFwLmJ1bGxldFByZWZhYik7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgYnVsbGV0LnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIGJ1bGxldC56SW5kZXggPSA1MDAwO1xyXG4gICAgICAgIGJ1bGxldC5zY3JpcHQuaW5pdEJ1bGxldChkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxtYXAuX2xldmVsSWQsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIGJ1bGxldC5zY3JpcHQuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yib5bu65a2Q5by5KOexu+Weiy/kvY3nva4v5pa55ZCRL+eCrueuoemVv+W6pi/lsITnqIsv5pS75Ye75YqbL+ebruagh+mYteiQpSlcclxuICAgIHN0YXRpYyBjcmVhdGVCdWxsZXRFeChidWxsZXRUeXBlLHBvcyxkaXIsd2lwZUxlbixndW5zaG90LGF0ayxjYW1wLHBhcmVudE5vZGUsbWFwLHNwZWVkID0gOCxtdXRhdGlvbkRhdGEgPSBudWxsKXtcclxuICAgICAgICBndW5zaG90ID0gZ3Vuc2hvdCAtIHdpcGVMZW47XHJcbiAgICAgICAgbGV0IGJkaXIgPSBkaXI7XHJcbiAgICAgICAgbGV0IGJwb3MgPSBwb3M7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IG51bGw7XHJcblxyXG4gICAgICAgIHN3aXRjaChidWxsZXRUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDIuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDQ6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSA3LjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDU6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpcixpKjUgLSAxMi41KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA5OTp7XHJcbiAgICAgICAgICAgICAgICBiZGlyID0gYmRpcjtcclxuICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLGJ1bGxldFR5cGUsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqOTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssMyxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwzNippKTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLDEuNSxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=