
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
        var config = yyp.config.Bullet[this._bulletType];
        this._damage += config.ATK * (this._bulletLevel + 1);
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
        if (type == 99 && this._currenBullet) {
            this._currenBullet.setScale(0.85);
            this._currenBullet.color = cc.color(255, 90, 60, 255);
            this._currenBullet.opacity = 255;
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
                    //销毁
                    this.doDestroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRFLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTRCLDBCQUFhO0lBQXpDO1FBQUEscUVBdWdCQztRQXJnQkcsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ3RDLGtCQUFZLEdBQU0sQ0FBQyxDQUFDLENBQVksTUFBTTtRQUN0QyxVQUFJLEdBQWMsSUFBSSxDQUFDLENBQVMsYUFBYTtRQUM3QyxVQUFJLEdBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3hDLFlBQU0sR0FBWSxDQUFDLENBQUM7UUFDcEIsY0FBUSxHQUFVLEVBQUUsQ0FBQyxDQUFXLElBQUk7UUFDcEMsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFZLEtBQUs7UUFDckMsa0JBQVksR0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFXLE1BQU07UUFDdEMsV0FBSyxHQUFhLEVBQUUsQ0FBQyxDQUFXLGtCQUFrQjtRQUNsRCxhQUFPLEdBQVcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFXLEdBQU8sUUFBUSxDQUFDLENBQUssbUJBQW1CO1FBQ25ELG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQUssSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQU8sQ0FBQyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUksQ0FBQyxDQUFDO1FBQ3BCLG1CQUFhLEdBQUssRUFBRSxDQUFDO1FBQ3JCLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0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QyxVQUFVLEdBQUcsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQy9FLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO1FBQ3BFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLGFBQWEsR0FBRyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxHQUFH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QyxDQUFDO29CQUM1QyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxNQUFNLEdBQUcsUUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7aUJBQy9FO2dCQUNELE1BQU07YUFDVDtTQUNKO0lBQ0wsQ0FBQzs7SUFyZ0JRLE1BQU07UUFEbEIsT0FBTztPQUNLLE1BQU0sQ0F1Z0JsQjtJQUFELGFBQUM7Q0F2Z0JELEFBdWdCQyxDQXZnQjJCLDZCQUFhLEdBdWdCeEM7QUF2Z0JZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vL+engeacieWHveaVsCzor7fkvb/nlKgnXyflvIDlpLRcclxuLy/or7fkv67mlLknTmV3Q2xhc3MnID0+IOiHquW3seeahOexu+WQjVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgX2J1bGxldFR5cGUgICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgX2J1bGxldExldmVsICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueetiee6p1xyXG4gICAgX21hcCAgICAgICAgICAgID0gbnVsbDsgICAgICAgICAvL3RpbGUgbWFwIOiKgueCuVxyXG4gICAgX2RpciAgICAgICAgICAgID0gY2MudjIoMSwwKTsgICAvL+W9k+WJjeihjOi/m+aWueWQkVxyXG4gICAgX3NwZWVkICAgICAgICAgID0gNTtcclxuICAgIF9ndW5zaG90ICAgICAgICA9IDEwOyAgICAgICAgICAgLy/lsITnqItcclxuICAgIF9kYW1hZ2UgICAgICAgICA9IDA7ICAgICAgICAgICAgLy/mlLvlh7vliptcclxuICAgIF9kZXN0cm95VGltZSAgICA9IC0xOyAgICAgICAgICAgLy/plIDmr4Hml7bpl7RcclxuICAgIF9jYW1wICAgICAgICAgICA9IFwiXCI7ICAgICAgICAgICAvL+mYteiQpShwbGF5ZXIvZW5lbXkpXHJcbiAgICBfaW5HYW1lICAgICAgICAgPSBmYWxzZTtcclxuICAgIF9kYW1hZ2VUeXBlICAgICA9IFwibm9ybWFsXCI7ICAgICAvL+S8pOWus+exu+Weiyhub3JtYWwvY3JpdClcclxuICAgIF9tdXRhdGlvblR5cGUgICA9IFwiXCI7XHJcbiAgICBfbXV0YXRpb25EYXRhICAgPSBudWxsO1xyXG4gICAgX2JvdW5jZUxlZnQgICAgID0gMDtcclxuICAgIF9wZW5ldHJhdGVMZWZ0ICA9IDA7XHJcbiAgICBfaGl0VGFyZ2V0SWRzICAgPSB7fTtcclxuICAgIF9wb3J0YWxJZ25vcmVJZCA9IFwiXCI7XHJcbiAgICBfcG9ydGFsSWdub3JlVGltZSA9IDA7XHJcbiAgICBfY2VudHJpZnVnYWxTdGF0ZSA9IG51bGw7XHJcbiAgICBfY2VudHJpZnVnYWxVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgX2N1cnJlbkJ1bGxldCAgID0gbnVsbDtcclxuICAgIF9pc1N0b3AgICAgICAgICA9IGZhbHNlO1xyXG5cclxuICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcclxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5zY2FsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblrZDlvLko5pa55ZCRL+WwhOeoiy/kvKTlrrPlgLwv6YCf5bqmL+mYteiQpS/lvZPliY3lhbPljaEpXHJcbiAgICBpbml0QnVsbGV0KGRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLGxldmVsSWQsYnVsbGV0VHlwZSA9IG51bGwsIG11dGF0aW9uRGF0YSA9IG51bGwpe1xyXG4gICAgICAgIHRoaXMuX2RpciA9IGRpcjtcclxuICAgICAgICB0aGlzLl9ndW5zaG90ID0gZ3Vuc2hvdDtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSA9IGF0aztcclxuICAgICAgICB0aGlzLl9jYW1wID0gY2FtcDtcclxuICAgICAgICB0aGlzLl9kYW1hZ2VUeXBlID0gXCJub3JtYWxcIjtcclxuICAgICAgICB0aGlzLl9kZXN0cm95VGltZSA9IHRoaXMuX2d1bnNob3QvdGhpcy5fc3BlZWQvNjA7XHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25UeXBlID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9tdXRhdGlvbkRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2JvdW5jZUxlZnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3BlbmV0cmF0ZUxlZnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2hpdFRhcmdldElkcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZUlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jZW50cmlmdWdhbFVzZWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgICAgIGlmIChjYW1wID09IFwiZW5lbXlcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TGV2ZWwgPSBsZXZlbElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChidWxsZXRUeXBlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IGJ1bGxldFR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldExldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfYnVsbGV0XyR7dGhpcy5fYnVsbGV0VHlwZX1fYCwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9jdXJyZW50X2J1bGxldF90eXBlX1wiLDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRMZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX2J1bGxldF8ke3RoaXMuX2J1bGxldFR5cGV9X2AsMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WtkOW8ueadgOWus+WKoOaIkO+8iOaatOWHu+amgueOh++8iVxyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkJ1bGxldFt0aGlzLl9idWxsZXRUeXBlXTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UgKz0gY29uZmlnLkFUSyoodGhpcy5fYnVsbGV0TGV2ZWwrMSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1wID09IFwicGxheWVyXCIgJiYgTWF0aC5yYW5kb20oKSA8IDAuMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UgKj0gMjtcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlVHlwZSA9IFwiY3JpdFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5HYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldEJ1bGxldFR5cGUodGhpcy5fYnVsbGV0VHlwZSk7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlNdXRhdGlvbkRhdGEobXV0YXRpb25EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdWxsZXRUeXBlKHR5cGUpe1xyXG4gICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8v5a2Q5by5XHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lICE9IFwiX3NwckJ1bGxldFwiICsgdGhpcy5fYnVsbGV0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQgPSBjaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0ID0gdGhpcy5fY3JlYXRlRGVmYXVsdEJ1bGxldCh0eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09IDk5ICYmIHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2V0U2NhbGUoMC44NSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDYwLCAyNTUpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/osIPmlbTlrZDlvLnop5LluqZcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpLTkwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYXBwbHlNdXRhdGlvbkRhdGEobXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbXAgIT0gXCJwbGF5ZXJcIiB8fCAhbXV0YXRpb25EYXRhIHx8ICFtdXRhdGlvbkRhdGEuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbXV0YXRpb25UeXBlID0gbXV0YXRpb25EYXRhLmlkO1xyXG4gICAgICAgIHRoaXMuX211dGF0aW9uRGF0YSA9IG11dGF0aW9uRGF0YTtcclxuICAgICAgICB0aGlzLl9ib3VuY2VMZWZ0ID0gbXV0YXRpb25EYXRhLmJvdW5jZUNvdW50IHx8IDA7XHJcbiAgICAgICAgdGhpcy5fcGVuZXRyYXRlTGVmdCA9IG11dGF0aW9uRGF0YS5wZW5ldHJhdGVDb3VudCB8fCAwO1xyXG5cclxuICAgICAgICBpZiAobXV0YXRpb25EYXRhLmRhbWFnZVJhdGlvICYmIG11dGF0aW9uRGF0YS5kYW1hZ2VSYXRpbyAhPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZSAqPSBtdXRhdGlvbkRhdGEuZGFtYWdlUmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoTXV0YXRpb25WaXN1YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaE11dGF0aW9uVmlzdWFsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY3VycmVuQnVsbGV0IHx8ICF0aGlzLl9tdXRhdGlvbkRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5fbXV0YXRpb25EYXRhLnNjYWxlIHx8IDE7XHJcbiAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWCA9IE1hdGguYWJzKHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVgpICogc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSA9IE1hdGguYWJzKHRoaXMuX2N1cnJlbkJ1bGxldC5zY2FsZVkpICogc2NhbGU7XHJcbiAgICAgICAgaWYgKHRoaXMuX211dGF0aW9uRGF0YS5jb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuY29sb3IgPSB0aGlzLl9tdXRhdGlvbkRhdGEuY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEZWZhdWx0QnVsbGV0KHR5cGUpIHtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gbmV3IGNjLk5vZGUoXCJfc3ByQnVsbGV0XCIgKyB0eXBlKTtcclxuICAgICAgICBidWxsZXQucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJ1bGxldC5zZXRDb250ZW50U2l6ZSg3MCwgNzApO1xyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGJ1bGxldC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PSA5OSkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDU1LCAzNSwgMjQwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI4KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIzMCwgMTIwLCAyMzApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTMpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGJ1bGxldC5zY2FsZSA9IDEuNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDAsIDAsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva50aWxlZCBtYXBcclxuICAgIHNldE1hcChtYXApIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IHRydWUgJiYgdGhpcy5faXNTdG9wID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VudHJpZnVnYWxTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDZW50cmlmdWdhbE1vdGlvbihkdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcG9ydGFsSWdub3JlVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZUlkID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/mm7TmlrDkvY3nva5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VyclBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3aWxsUG9zaXRpb24gPSBjdXJyUG9zaXRpb24uYWRkKGNjLnYzKHRoaXMuX2Rpci5tdWwodGhpcy5fc3BlZWQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHdpbGxQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcC5pc01hcCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAudHJ5RW50ZXJDZW50cmlmdWdhbFJpbmcgJiYgdGhpcy5fbWFwLnRyeUVudGVyQ2VudHJpZnVnYWxSaW5nKHRoaXMsIGN1cnJQb3NpdGlvbiwgd2lsbFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLnRyeVRlbGVwb3J0QnVsbGV0ICYmIHRoaXMuX21hcC50cnlUZWxlcG9ydEJ1bGxldCh0aGlzLCBjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJQb3NpdGlvbiA9IHdpbGxQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lrZDlvLnlkozlnablhYvmo4DmtYtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpdFRhbmsgPSB0aGlzLl9tYXAuYnVsbGV0RW5lbXlDb2xsaXNpb25UZXN0KHdpbGxQb3NpdGlvbix0aGlzLl9jYW1wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhpdFRhbmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUhpdFRhbmsoaGl0VGFuayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5a2Q5by55ZKM6Zqc56KN54mp5qOA5rWLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXJTZWdtZW50ID0gdGhpcy5fbWFwLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fbWFwLmdldEJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uU2VnbWVudChjdXJyUG9zaXRpb24sIHdpbGxQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLl9tYXAuYnVsbGV0T2JzdGFjbGVDb2xsaXNpb25UZXN0KGN1cnJQb3NpdGlvbix3aWxsUG9zaXRpb24pID8ge30gOiBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlclNlZ21lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU9ic3RhY2xlQ29sbGlzaW9uKGN1cnJQb3NpdGlvbiwgY29sbGlkZXJTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgVxyXG4gICAgZG9EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5faXNTdG9wID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v54iG54K45Yqo55S7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsMC41LDAuNSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8v6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVIaXRUYW5rKGhpdFRhbmspIHtcclxuICAgICAgICBsZXQgdGFyZ2V0SWQgPSBoaXRUYW5rLnV1aWQgfHwgaGl0VGFua1tcIl9pZFwiXSB8fCBoaXRUYW5rLm5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX211dGF0aW9uVHlwZSA9PSBcInBlbmV0cmF0ZVwiICYmIHRoaXMuX2hpdFRhcmdldElkc1t0YXJnZXRJZF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGl0VGFuay5zY3JpcHQuYmVIaXQodGhpcy5fZGFtYWdlLCB0aGlzLl9kYW1hZ2VUeXBlKTtcclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcInBsYXllclwiICYmIHRoaXMuX2RhbWFnZVR5cGUgPT0gXCJjcml0XCJcclxuICAgICAgICAgICAgJiYgdGhpcy5fbWFwLnBsYXlQbGF5ZXJDcml0RmVlZGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlQbGF5ZXJDcml0RmVlZGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tdXRhdGlvblR5cGUgPT0gXCJwZW5ldHJhdGVcIiAmJiB0aGlzLl9wZW5ldHJhdGVMZWZ0ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaXRUYXJnZXRJZHNbdGFyZ2V0SWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcGVuZXRyYXRlTGVmdC0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGVuZXRyYXRlTGVmdCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kb0Rlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlT2JzdGFjbGVDb2xsaXNpb24oY3VyclBvc2l0aW9uLCBjb2xsaWRlclNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXV0YXRpb25UeXBlID09IFwiYm91bmNlXCIgJiYgdGhpcy5fYm91bmNlTGVmdCA+IDAgJiYgY29sbGlkZXJTZWdtZW50ICYmIGNvbGxpZGVyU2VnbWVudC5BICYmIGNvbGxpZGVyU2VnbWVudC5CKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5jZUxlZnQtLTtcclxuICAgICAgICAgICAgdGhpcy5fZGlyID0gdGhpcy5fcmVmbGVjdERpcmVjdGlvbkJ5U2VnbWVudCh0aGlzLl9kaXIsIGNvbGxpZGVyU2VnbWVudC5BLCBjb2xsaWRlclNlZ21lbnQuQik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKSAtIDkwO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY3VyclBvc2l0aW9uLmFkZChjYy52Myh0aGlzLl9kaXIubXVsKE1hdGgubWF4KDYsIHRoaXMuX3NwZWVkICogMC43NSkpKSkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZsZWN0RGlyZWN0aW9uQnlTZWdtZW50KGRpciwgQSwgQikge1xyXG4gICAgICAgIGxldCB3YWxsRGlyID0gQi5zdWIoQSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IG5vcm1hbCA9IGNjLnYyKC13YWxsRGlyLnksIHdhbGxEaXIueCkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IGRvdCA9IGRpci5kb3Qobm9ybWFsKTtcclxuICAgICAgICBsZXQgcmVmbGVjdERpciA9IGRpci5zdWIobm9ybWFsLm11bCgyICogZG90KSk7XHJcbiAgICAgICAgaWYgKHJlZmxlY3REaXIubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlyLm11bCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWZsZWN0RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBvcnRhbElnbm9yZUlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3J0YWxJZ25vcmVJZDtcclxuICAgIH1cclxuXHJcbiAgICB0ZWxlcG9ydEJ5UG9ydGFsKHBvcywgaWdub3JlUG9ydGFsSWQgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKHBvcykpO1xyXG4gICAgICAgIHRoaXMuX3BvcnRhbElnbm9yZUlkID0gaWdub3JlUG9ydGFsSWQgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLl9wb3J0YWxJZ25vcmVUaW1lID0gMC4wODtcclxuICAgIH1cclxuXHJcbiAgICBoYXNVc2VkQ2VudHJpZnVnYWxSaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50cmlmdWdhbFVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJDZW50cmlmdWdhbFJpbmcocmluZ0RhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2VudHJpZnVnYWxVc2VkIHx8IHRoaXMuX2NlbnRyaWZ1Z2FsU3RhdGUgfHwgIXJpbmdEYXRhIHx8ICFyaW5nRGF0YS5jZW50ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNlbnRlciA9IGNjLnYyKHJpbmdEYXRhLmNlbnRlcik7XHJcbiAgICAgICAgbGV0IGNlbnRlclRvQnVsbGV0ID0gY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKS5zdWIoY2VudGVyKTtcclxuICAgICAgICBpZiAoY2VudGVyVG9CdWxsZXQubWFnU3FyKCkgPD0gMSkge1xyXG4gICAgICAgICAgICBjZW50ZXJUb0J1bGxldCA9IHRoaXMuX2RpciAmJiB0aGlzLl9kaXIubWFnU3FyKCkgPiAwXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2Rpci5ub3JtYWxpemUoKS5tdWwoLShyaW5nRGF0YS5vcmJpdFJhZGl1cyB8fCA3MikpXHJcbiAgICAgICAgICAgICAgICA6IGNjLnYyKC0ocmluZ0RhdGEub3JiaXRSYWRpdXMgfHwgNzIpLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdGFydEFuZ2xlID0gTWF0aC5hdGFuMihjZW50ZXJUb0J1bGxldC55LCBjZW50ZXJUb0J1bGxldC54KTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uU2lnbiA9IHJpbmdEYXRhLmRpcmVjdGlvblNpZ24gPT0gbnVsbCA/IC0xIDogcmluZ0RhdGEuZGlyZWN0aW9uU2lnbjtcclxuICAgICAgICBsZXQgcm90YXRlQW5nbGUgPSBNYXRoLmFicyhyaW5nRGF0YS5yb3RhdGVBbmdsZSA9PSBudWxsID8gTWF0aC5QSSAqIDAuNSA6IHJpbmdEYXRhLnJvdGF0ZUFuZ2xlKTtcclxuICAgICAgICBsZXQgb3JiaXRSYWRpdXMgPSByaW5nRGF0YS5vcmJpdFJhZGl1cyB8fCBNYXRoLm1heCg2NCwgY2VudGVyVG9CdWxsZXQubWFnKCkpO1xyXG4gICAgICAgIGxldCBhbmd1bGFyU3BlZWQgPSByaW5nRGF0YS5hbmd1bGFyU3BlZWQgfHwgTWF0aC5QSSAqIDQuMjtcclxuXHJcbiAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgICAgIG9yYml0UmFkaXVzOiBvcmJpdFJhZGl1cyxcclxuICAgICAgICAgICAgc3RhcnRBbmdsZTogc3RhcnRBbmdsZSxcclxuICAgICAgICAgICAgY3VycmVudEFuZ2xlOiBzdGFydEFuZ2xlLFxyXG4gICAgICAgICAgICBtb3ZlZEFuZ2xlOiAwLFxyXG4gICAgICAgICAgICByb3RhdGVBbmdsZTogcm90YXRlQW5nbGUsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvblNpZ246IGRpcmVjdGlvblNpZ24gPj0gMCA/IDEgOiAtMSxcclxuICAgICAgICAgICAgYW5ndWxhclNwZWVkOiBhbmd1bGFyU3BlZWQsXHJcbiAgICAgICAgICAgIHNwZWVkQm9vc3Q6IHJpbmdEYXRhLnNwZWVkQm9vc3QgfHwgMS44NSxcclxuICAgICAgICAgICAgZGFtYWdlQm9vc3Q6IHJpbmdEYXRhLmRhbWFnZUJvb3N0IHx8IDEuNyxcclxuICAgICAgICAgICAgcmFkaXVzRXhwYW5kOiByaW5nRGF0YS5yYWRpdXNFeHBhbmQgfHwgMTgsXHJcbiAgICAgICAgICAgIGNvbG9yOiByaW5nRGF0YS5jb2xvciB8fCBjYy5jb2xvcigyNTUsIDE2NSwgOTAsIDI1NSksXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zcGF3bkNlbnRyaWZ1Z2FsRW50ZXJGeCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVDZW50cmlmdWdhbE1vdGlvbihkdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9jZW50cmlmdWdhbFN0YXRlO1xyXG4gICAgICAgIHN0YXRlLm1vdmVkQW5nbGUgKz0gc3RhdGUuYW5ndWxhclNwZWVkICogZHQ7XHJcbiAgICAgICAgaWYgKHN0YXRlLm1vdmVkQW5nbGUgPiBzdGF0ZS5yb3RhdGVBbmdsZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5tb3ZlZEFuZ2xlID0gc3RhdGUucm90YXRlQW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0ZS5jdXJyZW50QW5nbGUgPSBzdGF0ZS5zdGFydEFuZ2xlICsgc3RhdGUuZGlyZWN0aW9uU2lnbiAqIHN0YXRlLm1vdmVkQW5nbGU7XHJcbiAgICAgICAgbGV0IGFuZ2xlUHJvZ3Jlc3MgPSBzdGF0ZS5yb3RhdGVBbmdsZSA+IDAgPyBzdGF0ZS5tb3ZlZEFuZ2xlIC8gc3RhdGUucm90YXRlQW5nbGUgOiAxO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSBzdGF0ZS5vcmJpdFJhZGl1cyArIHN0YXRlLnJhZGl1c0V4cGFuZCAqIGFuZ2xlUHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IG9yYml0UG9zID0gc3RhdGUuY2VudGVyLmFkZChjYy52MihNYXRoLmNvcyhzdGF0ZS5jdXJyZW50QW5nbGUpLCBNYXRoLnNpbihzdGF0ZS5jdXJyZW50QW5nbGUpKS5tdWwocmFkaXVzKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKG9yYml0UG9zKSk7XHJcblxyXG4gICAgICAgIGxldCB0YW5nZW50RGlyID0gc3RhdGUuZGlyZWN0aW9uU2lnbiA+IDBcclxuICAgICAgICAgICAgPyBjYy52MigtTWF0aC5zaW4oc3RhdGUuY3VycmVudEFuZ2xlKSwgTWF0aC5jb3Moc3RhdGUuY3VycmVudEFuZ2xlKSlcclxuICAgICAgICAgICAgOiBjYy52MihNYXRoLnNpbihzdGF0ZS5jdXJyZW50QW5nbGUpLCAtTWF0aC5jb3Moc3RhdGUuY3VycmVudEFuZ2xlKSk7XHJcbiAgICAgICAgaWYgKHRhbmdlbnREaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHRhbmdlbnREaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKSAtIDkwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9yYml0U2NhbGUgPSAxICsgMC4yNCAqIGFuZ2xlUHJvZ3Jlc3M7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbkJ1bGxldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQuc2NhbGVYID0gb3JiaXRTY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LnNjYWxlWSA9IG9yYml0U2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5jb2xvciA9IHN0YXRlLmNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXRlLm1vdmVkQW5nbGUgPj0gc3RhdGUucm90YXRlQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VudHJpZnVnYWxTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2FsVXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwZWVkICo9IHN0YXRlLnNwZWVkQm9vc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZSAqPSBzdGF0ZS5kYW1hZ2VCb29zdDtcclxuICAgICAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgKj0gMS4zNTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYzKG9yYml0UG9zLmFkZCh0aGlzLl9kaXIubXVsKE1hdGgubWF4KDE4LCB0aGlzLl9zcGVlZCAqIDAuNjUpKSkpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3Bhd25DZW50cmlmdWdhbFJlbGVhc2VGeChzdGF0ZS5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zcGF3bkNlbnRyaWZ1Z2FsRW50ZXJGeCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXAuc3Bhd25DZW50cmlmdWdhbFJpbmdGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NwYXduQ2VudHJpZnVnYWxSZWxlYXNlRngoY29sb3IpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLnNwYXduQ2VudHJpZnVnYWxSaW5nRngpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXAuc3Bhd25DZW50cmlmdWdhbFJpbmdGeChjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLCB0cnVlLCBjb2xvciwgdGhpcy5fZGlyLCB0aGlzLl9zcGVlZCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIC8v5Yib5bu65a2Q5by5XHJcbiAgICBzdGF0aWMgY3JlYXRlQnVsbGV0KHBvcyxkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxidWxsZXRUeXBlID0gbnVsbCwgbXV0YXRpb25EYXRhID0gbnVsbCl7XHJcbiAgICAgICAgc3BlZWQgPSAoY2FtcCA9PSBcImVuZW15XCIpID8gc3BlZWQqMC44IDogc3BlZWQ7XHJcblxyXG4gICAgICAgIGxldCBidWxsZXQgPSBjYy5pbnN0YW50aWF0ZShtYXAuYnVsbGV0UHJlZmFiKTtcclxuICAgICAgICBidWxsZXQucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICBidWxsZXQuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYnVsbGV0LnpJbmRleCA9IDUwMDA7XHJcbiAgICAgICAgYnVsbGV0LnNjcmlwdC5pbml0QnVsbGV0KGRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLG1hcC5fbGV2ZWxJZCxidWxsZXRUeXBlLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgYnVsbGV0LnNjcmlwdC5zZXRNYXAobWFwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/liJvlu7rlrZDlvLko57G75Z6LL+S9jee9ri/mlrnlkJEv54Ku566h6ZW/5bqmL+WwhOeoiy/mlLvlh7vlipsv55uu5qCH6Zi16JClKVxyXG4gICAgc3RhdGljIGNyZWF0ZUJ1bGxldEV4KGJ1bGxldFR5cGUscG9zLGRpcix3aXBlTGVuLGd1bnNob3QsYXRrLGNhbXAscGFyZW50Tm9kZSxtYXAsc3BlZWQgPSA4LG11dGF0aW9uRGF0YSA9IG51bGwpe1xyXG4gICAgICAgIGd1bnNob3QgPSBndW5zaG90IC0gd2lwZUxlbjtcclxuICAgICAgICBsZXQgYmRpciA9IGRpcjtcclxuICAgICAgICBsZXQgYnBvcyA9IHBvcztcclxuICAgICAgICBsZXQgYnVsbGV0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgc3dpdGNoKGJ1bGxldFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgYmRpciA9IGJkaXI7XHJcbiAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gMi41KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsbnVsbCxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNDp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDcuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwLG51bGwsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDEyLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxudWxsLG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDk5OntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqOTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssMyxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmRpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwzNippKTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLDEuNSxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=