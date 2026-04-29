
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e97ecu80ttNFr9kT3GtI0W3', 'Player');
// script/Player.ts

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
exports.Player = void 0;
var TankE_1 = require("./TankE");
var Utils_1 = require("./base/Utils");
var BulletE_1 = require("./BulletE");
var MusicManager_1 = require("./base/MusicManager");
var SDKManager_1 = require("./sdk/sdk/SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PLAYER_SHOOT_INTERVAL = 0.35;
var PLAYER_FREE_BULLET_MAX = 3;
var PLAYER_FREE_BULLET_RECOVER_DELAY = 0.8;
var PLAYER_FREE_BULLET_RECOVER_INTERVAL = 0.6;
var PLAYER_PAID_SHOT_HP_COST = 5 * (1 - 0.1);
var PLAYER_EXP_BASE = 30;
var PLAYER_EXP_STEP = 15;
var CHARGE_CANNON_BULLET_TYPE = 99;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //内部变量
        _this._level = 1; //玩家等级
        _this._bulletCodeTime = 0; //射击冷却时间
        _this._isHighBullet = false; //三发高频子弹
        _this._skill2Time = 0; //技能2(超级子弹)剩余时间
        _this._skill3Time = 0; //技能3(无敌防御)剩余时间
        _this._inGame = false; //在游戏中中使用
        _this._viewMode = false; //展示模式
        _this._freeBulletCount = PLAYER_FREE_BULLET_MAX; //当前免费子弹数量
        _this._stopFireTime = 0; //停火计时
        _this._freeBulletRecoverTime = 0; //免费子弹恢复计时
        _this._moveInputDir = cc.v2(1, 0); //移动摇杆目标方向
        _this._moveInputRatio = 0; //移动摇杆目标速率
        _this._energyLevel = 1; //局内能量等级
        _this._energyExp = 0; //当前经验
        _this._energyNeedExp = PLAYER_EXP_BASE; //升级所需经验
        _this._chargeCannonTime = 0; //蓄力炮蓄力时间
        _this._chargeCannonCdTime = 0; //蓄力炮冷却
        _this._chargeCannonCooldown = 0; //蓄力炮冷却总时长
        _this._chargeCannonCharging = false;
        _this._chargeCannonReady = false;
        _this._chargeEffectNode = null;
        _this._moveEffectId = -1;
        return _this;
    }
    Player.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化接收事件
        this._initEvent();
    };
    //初始化变量
    Player.prototype._initVariable = function () {
        this._camp = "player"; //阵营
        this._radius = this._radius * 2; //玩家的碰撞检测范围*2
        this._bulletCodeTime = PLAYER_SHOOT_INTERVAL;
        this._freeBulletCount = PLAYER_FREE_BULLET_MAX;
        this._stopFireTime = 0;
        this._freeBulletRecoverTime = 0;
        this._currentSpeed = 0;
        this._moveInputDir = this._dir;
        this._moveInputRatio = 0;
        this._energyLevel = 1;
        this._energyExp = 0;
        this._energyNeedExp = this._getEnergyNeedExp();
        this._chargeCannonTime = 0;
        this._chargeCannonCdTime = 0;
        this._chargeCannonCooldown = 0;
        this._chargeCannonCharging = false;
        this._chargeCannonReady = false;
        this._moveEffectId = -1;
    };
    //设置坦克类型
    Player.prototype.setPlayerType = function (tankType, playerLevel) {
        _super.prototype.setTankType.call(this, tankType);
        //计算玩家血量 攻击
        this._level = playerLevel;
        this._hp = this._maxHp = this._config.HP * (this._level + 1);
        this._atk = this._config.ATK * (this._level + 1);
        this._refreshEnergyUI();
    };
    //初始化UI
    Player.prototype._initUI = function () {
        this._fire._lifebar.active = false;
        this._fire._spArmour.active = false;
        this._fire._spSkill2.active = false;
        this._fire._spSkill3.active = false;
        this._refreshFreeBulletBar();
        this._initEnergyUI();
        this._refreshEnergyUI();
    };
    //初始化接收事件
    Player.prototype._initEvent = function () {
        yyp.eventCenter.on('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.on('joy-stick-shoot', this._doShootJoyStick, this); //射击摇杆事件
        yyp.eventCenter.on('charge-cannon-press', this._doChargeCannonPress, this); //蓄力炮按下
        yyp.eventCenter.on('charge-cannon-release', this._doChargeCannonRelease, this); //蓄力炮松开
        yyp.eventCenter.on('trigger-skill', this._doSkill, this); //触发技能
    };
    //销毁事件
    Player.prototype._destroyEvent = function () {
        yyp.eventCenter.off('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.off('joy-stick-shoot', this._doShootJoyStick, this); //射击摇杆事件
        yyp.eventCenter.off('charge-cannon-press', this._doChargeCannonPress, this); //蓄力炮按下
        yyp.eventCenter.off('charge-cannon-release', this._doChargeCannonRelease, this); //蓄力炮松开
        yyp.eventCenter.off('trigger-skill', this._doSkill, this); //触发技能
    };
    //摇杆事件
    Player.prototype._doJoyStick = function (event) {
        if (this._inGame) {
            if (event.dir && event.dir.magSqr() > 0) {
                this._moveInputDir = event.dir; //方向
            }
            this._moveInputRatio = event.ratio; //速率
        }
    };
    //射击摇杆事件
    Player.prototype._doShootJoyStick = function (event) {
        if (this._inGame == false)
            return;
        if (event.fire === true) {
            this._tryFireOnce();
        }
    };
    Player.prototype._doChargeCannonPress = function (event) {
        if (this._inGame == false || this._chargeCannonCdTime > 0 || this._chargeCannonCharging) {
            return;
        }
        this._chargeCannonTime = 0;
        this._chargeCannonCharging = true;
        this._chargeCannonReady = false;
        this._hideChargeEffect();
        yyp.eventCenter.emit("charge-cannon-progress", { progress: 0 });
        MusicManager_1.MusicManager.playEffect("chargeCannon");
    };
    Player.prototype._doChargeCannonRelease = function (event) {
        if (this._inGame == false || this._chargeCannonCharging == false) {
            return;
        }
        if (this._chargeCannonReady) {
            this._fireChargeCannon();
        }
        this._resetChargeCannon();
    };
    //触发技能
    Player.prototype._doSkill = function (event) {
        if (this._inGame) {
            var skillId = event.skillId; //方向
            // cc.log("触发了技能 ",skillId);
            if (skillId == 0) {
                yyp.eventCenter.emit('add-coin', { count: this._config.Coin / 10, position: Utils_1.Utils.getWorldPosition(this.node) });
            }
            else if (skillId == 1) {
                this.addEnergy(this._maxHp / 2);
            }
            else if (skillId == 2) {
                this._skill2Time += 15;
            }
            else if (skillId == 3) {
                this._skill3Time += 15;
            }
        }
    };
    Player.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
        this._stopMoveEffect();
    };
    //刷新玩家位置
    Player.prototype._refreshPosition = function (dt) {
        this._refreshMoveSpeed(dt);
        if (this._currentSpeed <= 0) {
            return;
        }
        if (this._moveInputRatio > 0) {
            this._turnDirTo(this._moveInputDir, dt);
        }
        var currPosition = this.node.position;
        //碰撞测试
        var willPosition = this._getWillPosition(currPosition, this._dir, this._currentSpeed);
        var colliderItems = this._map.testColliders(willPosition, this._radius);
        if (colliderItems.length > 0) {
            var testDir = this._getTestDir(currPosition, this._radius, this._dir, colliderItems);
            if (testDir) {
                willPosition = this._getWillPosition(currPosition, testDir, this._currentSpeed);
            }
            else {
                this._currentSpeed = 0;
                return;
            }
        }
        willPosition = this._map.clampMapInnerPosition(willPosition, this._radius);
        this.node.setPosition(willPosition);
    };
    Player.prototype._refreshMoveSpeed = function (dt) {
        var maxSpeed = this._getConfigValue("Speed", 0);
        var targetSpeed = this._moveInputRatio > 0 ? maxSpeed * this._moveInputRatio : 0;
        if (this._currentSpeed < targetSpeed) {
            this._currentSpeed += this._getFrameValue("Acceleration", maxSpeed, dt);
            if (this._currentSpeed > targetSpeed) {
                this._currentSpeed = targetSpeed;
            }
        }
        else if (this._currentSpeed > targetSpeed) {
            this._currentSpeed -= this._getFrameValue("Deceleration", maxSpeed, dt);
            if (this._currentSpeed < targetSpeed) {
                this._currentSpeed = targetSpeed;
            }
        }
    };
    Player.prototype.addEnergy = function (value) {
        if (value <= 0) {
            return;
        }
        var recoverHp = this._maxHp - this._hp;
        if (recoverHp > 0) {
            var addHp = Math.min(recoverHp, value);
            this._hp += addHp;
            value -= addHp;
            this.refreshHp();
        }
        if (value > 0) {
            this._addEnergyExp(value);
        }
        this._refreshEnergyUI();
    };
    Player.prototype._addEnergyExp = function (exp) {
        this._energyExp += exp;
        while (this._energyExp >= this._energyNeedExp) {
            this._energyExp -= this._energyNeedExp;
            this._energyLevel++;
            this._energyNeedExp = this._getEnergyNeedExp();
            this._levelUpByEnergy();
        }
    };
    Player.prototype._getEnergyNeedExp = function () {
        var config = yyp.config.Energy || {};
        var base = config.ExpBase == null ? PLAYER_EXP_BASE : config.ExpBase;
        var step = config.ExpStep == null ? PLAYER_EXP_STEP : config.ExpStep;
        return base + (this._energyLevel - 1) * step;
    };
    Player.prototype._levelUpByEnergy = function () {
        var config = yyp.config.Energy || {};
        var hpAdd = config.LevelHpAdd == null ? Math.max(1, Math.floor(this._config.HP * 0.3)) : config.LevelHpAdd;
        var atkAdd = config.LevelAtkAdd == null ? this._config.ATK * 0.2 : config.LevelAtkAdd;
        this._maxHp += hpAdd;
        this._hp = this._maxHp;
        this._atk += atkAdd;
        this.refreshHp();
    };
    Player.prototype._initEnergyUI = function () {
        if (!this._fire._lifebar || this._fire._lbHpLevel) {
            return;
        }
        var levelNode = new cc.Node("_lbHpLevel");
        levelNode.parent = this._fire._lifebar;
        levelNode.setPosition(-34, 0);
        levelNode.setContentSize(36, 24);
        levelNode.zIndex = 10;
        var levelLabel = levelNode.addComponent(cc.Label);
        levelLabel.fontSize = 18;
        levelLabel.lineHeight = 20;
        levelLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        levelLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        levelNode["$Label"] = levelLabel;
        this._fire._lbHpLevel = levelNode;
        var expNode = new cc.Node("_expBar");
        expNode.parent = this._fire._lifebar;
        expNode.setPosition(-34, 0);
        expNode.setContentSize(44, 44);
        expNode.zIndex = 0;
        var bg = new cc.Node("_expBg");
        bg.parent = expNode;
        var bgGraphics = bg.addComponent(cc.Graphics);
        bgGraphics.lineWidth = 5;
        bgGraphics.strokeColor = cc.color(50, 68, 75, 220);
        bgGraphics.circle(0, 0, 18);
        bgGraphics.stroke();
        var bar = new cc.Node("_expProgress");
        bar.parent = expNode;
        var barGraphics = bar.addComponent(cc.Graphics);
        barGraphics.lineWidth = 5;
        barGraphics.strokeColor = cc.color(90, 255, 140, 255);
        this._fire._expBar = expNode;
        this._fire._expProgress = bar;
        bar["$Graphics"] = barGraphics;
    };
    Player.prototype._refreshEnergyUI = function () {
        if (this._fire._lbHpLevel && this._fire._lbHpLevel.$Label) {
            this._fire._lbHpLevel.$Label.string = this._energyLevel.toString();
        }
        if (this._fire._expProgress && this._fire._expProgress.$Graphics) {
            var progress = this._energyNeedExp > 0 ? this._energyExp / this._energyNeedExp : 0;
            var graphics = this._fire._expProgress.$Graphics;
            graphics.clear();
            graphics.lineWidth = 5;
            graphics.strokeColor = cc.color(90, 255, 140, 255);
            graphics.arc(0, 0, 18, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress, false);
            graphics.stroke();
        }
        else if (this._fire._expBar && this._fire._expBar.$ProgressBar) {
            this._fire._expBar.$ProgressBar.progress = this._energyNeedExp > 0 ? this._energyExp / this._energyNeedExp : 0;
        }
    };
    Player.prototype.update = function (dt) {
        if (this._inGame) {
            if (this._map._pause) {
                this._stopMoveEffect();
                return;
            }
            this._bulletCodeTime += dt;
            this._updateFreeBulletRecover(dt);
            this._updateChargeCannon(dt);
            //玩家和技能icon,碰撞检测
            this._map.playerSkillIconCollisionTest();
            this._refreshPosition(dt);
            this._refreshMoveEffect();
            this._refreshBarrelDir();
            this._refreshAngle(dt, false);
            // 技能2(超级子弹)
            this._skill2Time -= dt;
            this._skill2Time = this._skill2Time < 0 ? 0 : this._skill2Time;
            this._fire._spSkill2.active = this._skill2Time > 0;
            // 技能3(无敌防御)
            this._skill3Time -= dt;
            this._skill3Time = this._skill3Time < 0 ? 0 : this._skill3Time;
            this._fire._spSkill3.active = this._skill3Time > 0;
            //显示铠甲
            this._fire._spArmour.active = this._skill3Time > 0;
            this._def = this._skill3Time > 0 ? 10000000 : 0;
            this.node.zIndex = this._map.judgezIndex(this.node.y);
        }
        else if (this._viewMode) {
            this._stopMoveEffect();
            this._dir = Utils_1.Utils.vectorsRotateDegress(this._dir, -0.5);
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir);
            this._barrelDir = this._dir;
            this.shooting(dt);
        }
        else {
            this._stopMoveEffect();
        }
    };
    Player.prototype._refreshMoveEffect = function () {
        if (this._currentSpeed > 0) {
            if (this._moveEffectId < 0) {
                this._moveEffectId = MusicManager_1.MusicManager.playLoopEffect("tankMove");
            }
        }
        else {
            this._stopMoveEffect();
        }
    };
    Player.prototype._stopMoveEffect = function () {
        if (this._moveEffectId >= 0) {
            MusicManager_1.MusicManager.stopEffect(this._moveEffectId);
            this._moveEffectId = -1;
        }
    };
    // 炮管始终跟随坦克整体方向
    Player.prototype._refreshBarrelDir = function () {
        this._barrelDir = this._dir;
    };
    // 右侧按钮抬起时直接发射一发, 不走按住持续发射逻辑
    Player.prototype.fireOnce = function () {
        var type = (this._viewMode || this._skill2Time > 0) ? this._config.BType2 : this._config.BType1;
        var attackRadius = this._viewMode ? this._config.AttackRadius * 0.8 : this._config.AttackRadius;
        BulletE_1.Bullet.createBulletEx(type, this.node.position, this._barrelDir, this._fire._lyBarrel.height + 20, attackRadius, this._atk, this._camp, this.node.parent, this._map);
        if (this._viewMode == false && this._map.enemyCount() > 0) {
            MusicManager_1.MusicManager.playEffect("shoot");
        }
    };
    Player.prototype._updateChargeCannon = function (dt) {
        if (this._chargeCannonCdTime > 0) {
            this._chargeCannonCdTime -= dt;
            if (this._chargeCannonCdTime < 0) {
                this._chargeCannonCdTime = 0;
            }
            if (this._chargeCannonCooldown > 0) {
                var cooldownProgress = 1 - this._chargeCannonCdTime / this._chargeCannonCooldown;
                yyp.eventCenter.emit("charge-cannon-cooldown", { progress: cooldownProgress });
            }
            if (this._chargeCannonCdTime == 0) {
                this._chargeCannonCooldown = 0;
                yyp.eventCenter.emit("charge-cannon-clear", {});
            }
        }
        if (this._chargeCannonCharging == false) {
            return;
        }
        this._chargeCannonTime += dt;
        var needTime = this._getChargeConfig("Time", 5);
        var progress = this._chargeCannonTime / needTime;
        if (progress > 1) {
            progress = 1;
        }
        yyp.eventCenter.emit("charge-cannon-progress", { progress: progress });
        if (this._chargeCannonReady == false && this._chargeCannonTime >= needTime) {
            this._chargeCannonReady = true;
            this._showChargeEffect();
            yyp.eventCenter.emit("charge-cannon-ready", {});
        }
    };
    Player.prototype._fireChargeCannon = function () {
        var attackRadius = this._getChargeConfig("AttackRadius", this._config.AttackRadius * 1.4);
        var atkRatio = this._getChargeConfig("AtkRatio", 3);
        var speed = this._getChargeConfig("Speed", 12);
        var wipeLen = this._getBarrelMuzzleDistance(12);
        BulletE_1.Bullet.createBulletEx(CHARGE_CANNON_BULLET_TYPE, this.node.position, this._barrelDir, wipeLen, attackRadius, this._atk * atkRatio, this._camp, this.node.parent, this._map, speed);
        MusicManager_1.MusicManager.playEffect("chargeShoot");
        this._shakeScreen();
        this._chargeCannonCooldown = this._getChargeConfig("Cooldown", 8);
        this._chargeCannonCdTime = this._chargeCannonCooldown;
    };
    Player.prototype._getChargeConfig = function (key, defaultValue) {
        var fullKey = "Charge" + key;
        var value = this._config ? this._config[fullKey] : null;
        return value == null ? defaultValue : value;
    };
    Player.prototype._resetChargeCannon = function () {
        this._chargeCannonTime = 0;
        this._chargeCannonCharging = false;
        this._chargeCannonReady = false;
        this._hideChargeEffect();
        if (this._chargeCannonCdTime <= 0) {
            yyp.eventCenter.emit("charge-cannon-clear", {});
        }
    };
    Player.prototype._showChargeEffect = function () {
        if (this._chargeEffectNode && cc.isValid(this._chargeEffectNode)) {
            this._chargeEffectNode.active = true;
            return;
        }
        var barrelNode = this._currentBg || this._fire._lyBarrel;
        var effect = new cc.Node("_chargeMuzzleEffect");
        effect.parent = barrelNode;
        effect.setPosition(cc.v3(this._getBarrelMuzzleLocalPosition(4)));
        effect.zIndex = 100;
        var graphics = effect.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(255, 40, 20, 180);
        graphics.circle(0, 0, 18);
        graphics.fill();
        effect.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.25, 1.35), cc.scaleTo(0.25, 0.9))));
        this._chargeEffectNode = effect;
    };
    Player.prototype._hideChargeEffect = function () {
        if (this._chargeEffectNode && cc.isValid(this._chargeEffectNode)) {
            this._chargeEffectNode.stopAllActions();
            this._chargeEffectNode.destroy();
        }
        this._chargeEffectNode = null;
    };
    Player.prototype._shakeScreen = function () {
        if (!this._map || !this._map.node) {
            return;
        }
        var mapNode = this._map.node;
        var origin = mapNode.position;
        mapNode.stopActionByTag(9001);
        var action = cc.sequence(cc.moveBy(0.03, 4, 0), cc.moveBy(0.03, -8, 0), cc.moveBy(0.03, 4, 3), cc.moveBy(0.03, 0, -3), cc.callFunc(function () {
            mapNode.setPosition(origin);
        }));
        action.setTag(9001);
        mapNode.runAction(action);
        Utils_1.Utils.vibrate();
    };
    Player.prototype._getBarrelMuzzleLocalPosition = function (extraOffset) {
        if (extraOffset === void 0) { extraOffset = 0; }
        var barrelNode = this._currentBg || this._fire._lyBarrel;
        var anchorY = barrelNode.anchorY == null ? 0.5 : barrelNode.anchorY;
        return cc.v2(0, barrelNode.height * (1 - anchorY) + extraOffset);
    };
    Player.prototype._getBarrelMuzzlePosition = function (extraOffset) {
        if (extraOffset === void 0) { extraOffset = 0; }
        var barrelNode = this._currentBg || this._fire._lyBarrel;
        var localPos = this._getBarrelMuzzleLocalPosition(extraOffset);
        var worldPos = barrelNode.convertToWorldSpaceAR(localPos);
        return this.node.parent.convertToNodeSpaceAR(worldPos);
    };
    Player.prototype._getBarrelMuzzleDistance = function (extraOffset) {
        if (extraOffset === void 0) { extraOffset = 0; }
        var muzzlePos = this._getBarrelMuzzlePosition(extraOffset);
        return muzzlePos.sub(this.node.position).mag();
    };
    Player.prototype._tryFireOnce = function () {
        if (this._bulletCodeTime < PLAYER_SHOOT_INTERVAL) {
            return;
        }
        if (this._freeBulletCount <= 0 && this._canNotAffordPaidBullet()) {
            this._showLowHpShootTip();
            return;
        }
        this._bulletCodeTime = 0;
        this._stopFireTime = 0;
        this._freeBulletRecoverTime = 0;
        this.fireOnce();
        if (this._freeBulletCount > 0) {
            this._freeBulletCount--;
            this._refreshFreeBulletBar();
            return;
        }
        this._consumeHpForPaidBullet();
    };
    Player.prototype._canNotAffordPaidBullet = function () {
        return this._hp <= PLAYER_PAID_SHOT_HP_COST;
    };
    Player.prototype._showLowHpShootTip = function () {
        var channel = SDKManager_1.default.getChannel();
        if (channel && channel.showToast) {
            channel.showToast("血量过低,无法发射子弹");
        }
        else {
            cc.log("血量过低,无法发射子弹");
        }
    };
    Player.prototype._consumeHpForPaidBullet = function () {
        this._hp -= PLAYER_PAID_SHOT_HP_COST;
        if (this._hp < 0) {
            this._hp = 0;
        }
        this.refreshHp();
        if (this._hp <= 0) {
            this.doDeath();
        }
    };
    //玩家受击不飘伤害数字, 用区别于敌人的蓝色闪光表现
    Player.prototype.beHit = function (damage) {
        damage = damage - this._def;
        if (damage < 0) {
            damage = 0;
        }
        this._hp -= damage;
        if (this._hp < 0) {
            this._hp = 0;
        }
        this.refreshHp();
        this._showPlayerHitEffect();
        Utils_1.Utils.vibrate();
        MusicManager_1.MusicManager.playEffect("playerHit");
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    Player.prototype._showPlayerHitEffect = function () {
        var effect = new cc.Node("_playerHitEffect");
        effect.parent = this.node;
        effect.setPosition(0, 0);
        effect.zIndex = 300;
        var graphics = effect.addComponent(cc.Graphics);
        graphics.lineWidth = 8;
        graphics.strokeColor = cc.color(80, 210, 255, 230);
        graphics.circle(0, 0, this._radius + 16);
        graphics.stroke();
        graphics.fillColor = cc.color(70, 170, 255, 55);
        graphics.circle(0, 0, this._radius + 10);
        graphics.fill();
        effect.opacity = 255;
        effect.scale = 0.65;
        effect.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.18, 1.25), cc.fadeTo(0.18, 60)), cc.fadeOut(0.1), cc.removeSelf()));
    };
    Player.prototype._updateFreeBulletRecover = function (dt) {
        if (this._freeBulletCount >= PLAYER_FREE_BULLET_MAX) {
            this._stopFireTime = 0;
            this._freeBulletRecoverTime = 0;
            this._refreshFreeBulletBar();
            return;
        }
        this._stopFireTime += dt;
        if (this._stopFireTime < PLAYER_FREE_BULLET_RECOVER_DELAY) {
            this._freeBulletRecoverTime = 0;
            this._refreshFreeBulletBar();
            return;
        }
        this._freeBulletRecoverTime += dt;
        while (this._freeBulletRecoverTime >= PLAYER_FREE_BULLET_RECOVER_INTERVAL
            && this._freeBulletCount < PLAYER_FREE_BULLET_MAX) {
            this._freeBulletRecoverTime -= PLAYER_FREE_BULLET_RECOVER_INTERVAL;
            this._freeBulletCount++;
        }
        if (this._freeBulletCount >= PLAYER_FREE_BULLET_MAX) {
            this._freeBulletRecoverTime = 0;
        }
        this._refreshFreeBulletBar();
    };
    Player.prototype._refreshFreeBulletBar = function () {
        var _this = this;
        var bulletBars = [
            this._fire._zidanbar1,
            this._fire._zidanbar2,
            this._fire._zidanbar3,
        ];
        var recoverProgress = 0;
        if (this._freeBulletCount < PLAYER_FREE_BULLET_MAX
            && this._stopFireTime >= PLAYER_FREE_BULLET_RECOVER_DELAY) {
            recoverProgress = this._freeBulletRecoverTime / PLAYER_FREE_BULLET_RECOVER_INTERVAL;
            if (recoverProgress > 1) {
                recoverProgress = 1;
            }
        }
        bulletBars.forEach(function (barNode, index) {
            if (!barNode || !barNode.$ProgressBar) {
                return;
            }
            if (index < _this._freeBulletCount) {
                barNode.$ProgressBar.progress = 1;
            }
            else if (index == _this._freeBulletCount && recoverProgress > 0) {
                barNode.$ProgressBar.progress = recoverProgress;
            }
            else {
                barNode.$ProgressBar.progress = 0;
            }
        });
    };
    //射击
    Player.prototype.shooting = function (dt) {
        var judgeCD = this._skill2Time > 0 ? this._config.BulletCodeTime / 4 : this._config.BulletCodeTime;
        this._bulletCodeTime += dt;
        if (this._bulletCodeTime >= judgeCD) {
            this._bulletCodeTime = 0;
            this.fireOnce();
        }
    };
    //执行死亡
    Player.prototype.doDeath = function () {
        this._stopMoveEffect();
        _super.prototype.doDeath.call(this);
        yyp.eventCenter.emit("player-death", {});
        this.node.destroy();
        // 爆炸效果
        // 显示结束界面
    };
    Player.prototype.setInGame = function () {
        this._inGame = true;
        this._fire._lifebar.active = true;
    };
    //获取碰撞框
    Player.prototype.getPlayerBoundingBox = function () {
        return Utils_1.Utils.getWorldBoundingBox(this._currentBg);
    };
    Player.prototype.setViewMode = function () {
        this._viewMode = true;
    };
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(TankE_1.Tank));
exports.Player = Player;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUdyQztJQUE0QiwwQkFBSTtJQUFoQztRQUFBLHFFQTB1QkM7UUF4dUJHLE1BQU07UUFDTixZQUFNLEdBQVksQ0FBQyxDQUFDLENBQVEsTUFBTTtRQUVsQyxxQkFBZSxHQUFHLENBQUMsQ0FBQyxDQUFRLFFBQVE7UUFFcEMsbUJBQWEsR0FBSyxLQUFLLENBQUMsQ0FBSSxRQUFRO1FBRXBDLGlCQUFXLEdBQU8sQ0FBQyxDQUFDLENBQVEsZUFBZTtRQUMzQyxpQkFBVyxHQUFPLENBQUMsQ0FBQyxDQUFRLGVBQWU7UUFFM0MsYUFBTyxHQUFXLEtBQUssQ0FBQyxDQUFJLFNBQVM7UUFDckMsZUFBUyxHQUFTLEtBQUssQ0FBQyxDQUFJLE1BQU07UUFDbEMsc0JBQWdCLEdBQUcsc0JBQXNCLENBQUMsQ0FBRSxVQUFVO1FBQ3RELG1CQUFhLEdBQUcsQ0FB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LE9BQU8sRUFBRTtZQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUV6QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQsTUFBTTtJQUNOLHdCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFFaEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsT0FBTztRQUNQLFNBQVM7SUFDYixDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELE9BQU87SUFDUCxxQ0FBb0IsR0FBcEI7UUFDSSxPQUFPLGFBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBenVCUSxNQUFNO1FBRGxCLE9BQU87T0FDSyxNQUFNLENBMHVCbEI7SUFBRCxhQUFDO0NBMXVCRCxBQTB1QkMsQ0ExdUIyQixZQUFJLEdBMHVCL0I7QUExdUJZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYW5rfSBmcm9tIFwiLi9UYW5rRVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xuaW1wb3J0IHtCdWxsZXR9IGZyb20gXCIuL0J1bGxldEVcIjtcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XG5pbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi9zZGsvc2RrL1NES01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBQTEFZRVJfU0hPT1RfSU5URVJWQUwgPSAwLjM1O1xuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX01BWCA9IDM7XG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSA9IDAuODtcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMID0gMC42O1xuY29uc3QgUExBWUVSX1BBSURfU0hPVF9IUF9DT1NUID0gNSAqICgxIC0gMC4xKTtcbmNvbnN0IFBMQVlFUl9FWFBfQkFTRSA9IDMwO1xuY29uc3QgUExBWUVSX0VYUF9TVEVQID0gMTU7XG5jb25zdCBDSEFSR0VfQ0FOTk9OX0JVTExFVF9UWVBFID0gOTk7XG5cbkBjY2NsYXNzXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgVGFuayB7XG5cbiAgICAvL+WGhemDqOWPmOmHj1xuICAgIF9sZXZlbCAgICAgICAgICA9IDE7ICAgICAgICAvL+eOqeWutuetiee6p1xuXG4gICAgX2J1bGxldENvZGVUaW1lID0gMDsgICAgICAgIC8v5bCE5Ye75Ya35Y205pe26Ze0XG5cbiAgICBfaXNIaWdoQnVsbGV0ICAgPSBmYWxzZTsgICAgLy/kuInlj5Hpq5jpopHlrZDlvLlcblxuICAgIF9za2lsbDJUaW1lICAgICA9IDA7ICAgICAgICAvL+aKgOiDvTIo6LaF57qn5a2Q5by5KeWJqeS9meaXtumXtFxuICAgIF9za2lsbDNUaW1lICAgICA9IDA7ICAgICAgICAvL+aKgOiDvTMo5peg5pWM6Ziy5b6hKeWJqeS9meaXtumXtFxuXG4gICAgX2luR2FtZSAgICAgICAgID0gZmFsc2U7ICAgIC8v5Zyo5ri45oiP5Lit5Lit5L2/55SoXG4gICAgX3ZpZXdNb2RlICAgICAgID0gZmFsc2U7ICAgIC8v5bGV56S65qih5byPXG4gICAgX2ZyZWVCdWxsZXRDb3VudCA9IFBMQVlFUl9GUkVFX0JVTExFVF9NQVg7ICAvL+W9k+WJjeWFjei0ueWtkOW8ueaVsOmHj1xuICAgIF9zdG9wRmlyZVRpbWUgPSAwOyAgICAgICAgICAvL+WBnOeBq+iuoeaXtlxuICAgIF9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwOyAvL+WFjei0ueWtkOW8ueaBouWkjeiuoeaXtlxuICAgIF9tb3ZlSW5wdXREaXIgPSBjYy52MigxLCAwKTsgLy/np7vliqjmkYfmnYbnm67moIfmlrnlkJFcbiAgICBfbW92ZUlucHV0UmF0aW8gPSAwOyAgICAgICAgLy/np7vliqjmkYfmnYbnm67moIfpgJ/njodcbiAgICBfZW5lcmd5TGV2ZWwgPSAxOyAgICAgICAgICAgLy/lsYDlhoXog73ph4/nrYnnuqdcbiAgICBfZW5lcmd5RXhwID0gMDsgICAgICAgICAgICAgLy/lvZPliY3nu4/pqoxcbiAgICBfZW5lcmd5TmVlZEV4cCA9IFBMQVlFUl9FWFBfQkFTRTsgLy/ljYfnuqfmiYDpnIDnu4/pqoxcbiAgICBfY2hhcmdlQ2Fubm9uVGltZSA9IDA7ICAgICAgLy/ok4Tlipvngq7ok4Tlipvml7bpl7RcbiAgICBfY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDsgICAgLy/ok4Tlipvngq7lhrfljbRcbiAgICBfY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwOyAgLy/ok4Tlipvngq7lhrfljbTmgLvml7bplb9cbiAgICBfY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSBmYWxzZTtcbiAgICBfY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcbiAgICBfY2hhcmdlRWZmZWN0Tm9kZSA9IG51bGw7XG4gICAgX21vdmVFZmZlY3RJZCA9IC0xO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIFxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcblxuICAgICAgICAvL+WIneWni+WMllVJXG4gICAgICAgIHRoaXMuX2luaXRVSSgpO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xuICAgIH1cblxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwicGxheWVyXCI7ICAvL+mYteiQpVxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLl9yYWRpdXMgKiAyOyAgICAvL+eOqeWutueahOeisOaSnuajgOa1i+iMg+WbtCoyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gUExBWUVSX1NIT09UX0lOVEVSVkFMO1xuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYO1xuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSB0aGlzLl9kaXI7XG4gICAgICAgIHRoaXMuX21vdmVJbnB1dFJhdGlvID0gMDtcbiAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgPSAwO1xuICAgICAgICB0aGlzLl9lbmVyZ3lOZWVkRXhwID0gdGhpcy5fZ2V0RW5lcmd5TmVlZEV4cCgpO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tb3ZlRWZmZWN0SWQgPSAtMTtcbiAgICB9XG5cbiAgICAvL+iuvue9ruWdpuWFi+exu+Wei1xuICAgIHNldFBsYXllclR5cGUodGFua1R5cGUscGxheWVyTGV2ZWwpIHtcbiAgICAgICAgc3VwZXIuc2V0VGFua1R5cGUodGFua1R5cGUpO1xuICAgICAgICBcbiAgICAgICAgLy/orqHnrpfnjqnlrrbooYDph48g5pS75Ye7XG4gICAgICAgIHRoaXMuX2xldmVsID0gcGxheWVyTGV2ZWw7XG4gICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHAgPSB0aGlzLl9jb25maWcuSFAgKiAodGhpcy5fbGV2ZWwrMSk7XG4gICAgICAgIHRoaXMuX2F0ayA9IHRoaXMuX2NvbmZpZy5BVEsgKiAodGhpcy5fbGV2ZWwrMSk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xuICAgIH1cblxuICAgIC8v5Yid5aeL5YyWVUlcbiAgICBfaW5pdFVJKCl7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwQXJtb3VyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BTa2lsbDMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgICAgIHRoaXMuX2luaXRFbmVyZ3lVSSgpO1xuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcbiAgICB9XG5cbiAgICAvL+WIneWni+WMluaOpeaUtuS6i+S7tlxuICAgIF9pbml0RXZlbnQoKSB7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgIC8v5pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrLXNob290Jyx0aGlzLl9kb1Nob290Sm95U3RpY2ssdGhpcyk7IC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignY2hhcmdlLWNhbm5vbi1wcmVzcycsdGhpcy5fZG9DaGFyZ2VDYW5ub25QcmVzcyx0aGlzKTsgLy/ok4Tlipvngq7mjInkuItcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjaGFyZ2UtY2Fubm9uLXJlbGVhc2UnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZSx0aGlzKTsgLy/ok4Tlipvngq7mnb7lvIBcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCd0cmlnZ2VyLXNraWxsJyx0aGlzLl9kb1NraWxsLHRoaXMpOyAgICAgLy/op6blj5HmioDog71cbiAgICB9XG4gICAgICAgXG4gICAgLy/plIDmr4Hkuovku7ZcbiAgICBfZGVzdHJveUV2ZW50KCkge1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdqb3ktc3RpY2snLHRoaXMuX2RvSm95U3RpY2ssdGhpcyk7ICAgICAvL+aRh+adhuS6i+S7tlxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdqb3ktc3RpY2stc2hvb3QnLHRoaXMuX2RvU2hvb3RKb3lTdGljayx0aGlzKTsgLy/lsITlh7vmkYfmnYbkuovku7ZcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY2hhcmdlLWNhbm5vbi1wcmVzcycsdGhpcy5fZG9DaGFyZ2VDYW5ub25QcmVzcyx0aGlzKTsgLy/ok4Tlipvngq7mjInkuItcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY2hhcmdlLWNhbm5vbi1yZWxlYXNlJyx0aGlzLl9kb0NoYXJnZUNhbm5vblJlbGVhc2UsdGhpcyk7IC8v6JOE5Yqb54Ku5p2+5byAXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItc2tpbGwnLHRoaXMuX2RvU2tpbGwsdGhpcyk7ICAgIC8v6Kem5Y+R5oqA6IO9XG4gICAgfVxuICAgIFxuICAgIC8v5pGH5p2G5LqL5Lu2XG4gICAgX2RvSm95U3RpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gZXZlbnQuZGlyOyAgICAgIC8v5pa55ZCRXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IGV2ZW50LnJhdGlvOyAgLy/pgJ/njodcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgX2RvU2hvb3RKb3lTdGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGlmIChldmVudC5maXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl90cnlGaXJlT25jZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2RvQ2hhcmdlQ2Fubm9uUHJlc3MoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSB8fCB0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPiAwIHx8IHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9oaWRlQ2hhcmdlRWZmZWN0KCk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IDB9KTtcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJjaGFyZ2VDYW5ub25cIik7XG4gICAgfVxuXG4gICAgX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlIHx8IHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFyZ2VDYW5ub24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XG4gICAgfVxuICAgIFxuICAgIC8v6Kem5Y+R5oqA6IO9XG4gICAgX2RvU2tpbGwoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xuICAgICAgICAgICAgbGV0IHNraWxsSWQgPSBldmVudC5za2lsbElkOyAgICAvL+aWueWQkVxuICAgICAgICAgICAgLy8gY2MubG9nKFwi6Kem5Y+R5LqG5oqA6IO9IFwiLHNraWxsSWQpO1xuICAgICAgICAgICAgaWYgKHNraWxsSWQgPT0gMCkge1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KCdhZGQtY29pbicse2NvdW50OnRoaXMuX2NvbmZpZy5Db2luLzEwLHBvc2l0aW9uOlV0aWxzLmdldFdvcmxkUG9zaXRpb24odGhpcy5ub2RlKX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFbmVyZ3kodGhpcy5fbWF4SHAgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsMlRpbWUgKz0gMTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lICs9IDE1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICAvL+mUgOavgeS6i+S7tlxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcbiAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcbiAgICB9XG5cbiAgICAvL+WIt+aWsOeOqeWutuS9jee9rlxuICAgIF9yZWZyZXNoUG9zaXRpb24oZHQpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaE1vdmVTcGVlZChkdCk7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdHVybkRpclRvKHRoaXMuX21vdmVJbnB1dERpciwgZHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcblxuICAgICAgICAvL+eisOaSnua1i+ivlVxuICAgICAgICBsZXQgd2lsbFBvc2l0aW9uID0gdGhpcy5fZ2V0V2lsbFBvc2l0aW9uKGN1cnJQb3NpdGlvbiwgdGhpcy5fZGlyLCB0aGlzLl9jdXJyZW50U3BlZWQpO1xuICAgICAgICBsZXQgY29sbGlkZXJJdGVtcyA9IHRoaXMuX21hcC50ZXN0Q29sbGlkZXJzKHdpbGxQb3NpdGlvbiwgdGhpcy5fcmFkaXVzKTtcbiAgICAgICAgaWYgKGNvbGxpZGVySXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBsZXQgdGVzdERpciA9IHRoaXMuX2dldFRlc3REaXIoY3VyclBvc2l0aW9uLCB0aGlzLl9yYWRpdXMsIHRoaXMuX2RpciwgY29sbGlkZXJJdGVtcyk7XG4gICAgICAgICAgICBpZiAodGVzdERpcikge1xuICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRlc3REaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2lsbFBvc2l0aW9uID0gdGhpcy5fbWFwLmNsYW1wTWFwSW5uZXJQb3NpdGlvbih3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xuICAgIH1cblxuICAgIF9yZWZyZXNoTW92ZVNwZWVkKGR0KSB7XG4gICAgICAgIGxldCBtYXhTcGVlZCA9IHRoaXMuX2dldENvbmZpZ1ZhbHVlKFwiU3BlZWRcIiwgMCk7XG4gICAgICAgIGxldCB0YXJnZXRTcGVlZCA9IHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCA/IG1heFNwZWVkICogdGhpcy5fbW92ZUlucHV0UmF0aW8gOiAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPCB0YXJnZXRTcGVlZCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkICs9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBY2NlbGVyYXRpb25cIiwgbWF4U3BlZWQsIGR0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiB0YXJnZXRTcGVlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IHRhcmdldFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IHRhcmdldFNwZWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgLT0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkRlY2VsZXJhdGlvblwiLCBtYXhTcGVlZCwgZHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA8IHRhcmdldFNwZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gdGFyZ2V0U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRFbmVyZ3kodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWNvdmVySHAgPSB0aGlzLl9tYXhIcCAtIHRoaXMuX2hwO1xuICAgICAgICBpZiAocmVjb3ZlckhwID4gMCkge1xuICAgICAgICAgICAgbGV0IGFkZEhwID0gTWF0aC5taW4ocmVjb3ZlckhwLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9ocCArPSBhZGRIcDtcbiAgICAgICAgICAgIHZhbHVlIC09IGFkZEhwO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcbiAgICB9XG5cbiAgICBfYWRkRW5lcmd5RXhwKGV4cCkge1xuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgKz0gZXhwO1xuICAgICAgICB3aGlsZSAodGhpcy5fZW5lcmd5RXhwID49IHRoaXMuX2VuZXJneU5lZWRFeHApIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUV4cCAtPSB0aGlzLl9lbmVyZ3lOZWVkRXhwO1xuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwrKztcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSB0aGlzLl9nZXRFbmVyZ3lOZWVkRXhwKCk7XG4gICAgICAgICAgICB0aGlzLl9sZXZlbFVwQnlFbmVyZ3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRFbmVyZ3lOZWVkRXhwKCkge1xuICAgICAgICBsZXQgY29uZmlnID0geXlwLmNvbmZpZy5FbmVyZ3kgfHwge307XG4gICAgICAgIGxldCBiYXNlID0gY29uZmlnLkV4cEJhc2UgPT0gbnVsbCA/IFBMQVlFUl9FWFBfQkFTRSA6IGNvbmZpZy5FeHBCYXNlO1xuICAgICAgICBsZXQgc3RlcCA9IGNvbmZpZy5FeHBTdGVwID09IG51bGwgPyBQTEFZRVJfRVhQX1NURVAgOiBjb25maWcuRXhwU3RlcDtcbiAgICAgICAgcmV0dXJuIGJhc2UgKyAodGhpcy5fZW5lcmd5TGV2ZWwgLSAxKSAqIHN0ZXA7XG4gICAgfVxuXG4gICAgX2xldmVsVXBCeUVuZXJneSgpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IHl5cC5jb25maWcuRW5lcmd5IHx8IHt9O1xuICAgICAgICBsZXQgaHBBZGQgPSBjb25maWcuTGV2ZWxIcEFkZCA9PSBudWxsID8gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcih0aGlzLl9jb25maWcuSFAgKiAwLjMpKSA6IGNvbmZpZy5MZXZlbEhwQWRkO1xuICAgICAgICBsZXQgYXRrQWRkID0gY29uZmlnLkxldmVsQXRrQWRkID09IG51bGwgPyB0aGlzLl9jb25maWcuQVRLICogMC4yIDogY29uZmlnLkxldmVsQXRrQWRkO1xuXG4gICAgICAgIHRoaXMuX21heEhwICs9IGhwQWRkO1xuICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX21heEhwO1xuICAgICAgICB0aGlzLl9hdGsgKz0gYXRrQWRkO1xuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xuICAgIH1cblxuICAgIF9pbml0RW5lcmd5VUkoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fbGlmZWJhciB8fCB0aGlzLl9maXJlLl9sYkhwTGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZXZlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9sYkhwTGV2ZWxcIik7XG4gICAgICAgIGxldmVsTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9saWZlYmFyO1xuICAgICAgICBsZXZlbE5vZGUuc2V0UG9zaXRpb24oLTM0LCAwKTtcbiAgICAgICAgbGV2ZWxOb2RlLnNldENvbnRlbnRTaXplKDM2LCAyNCk7XG4gICAgICAgIGxldmVsTm9kZS56SW5kZXggPSAxMDtcbiAgICAgICAgbGV0IGxldmVsTGFiZWwgPSBsZXZlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGV2ZWxMYWJlbC5mb250U2l6ZSA9IDE4O1xuICAgICAgICBsZXZlbExhYmVsLmxpbmVIZWlnaHQgPSAyMDtcbiAgICAgICAgbGV2ZWxMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsZXZlbExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgbGV2ZWxOb2RlW1wiJExhYmVsXCJdID0gbGV2ZWxMYWJlbDtcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJIcExldmVsID0gbGV2ZWxOb2RlO1xuXG4gICAgICAgIGxldCBleHBOb2RlID0gbmV3IGNjLk5vZGUoXCJfZXhwQmFyXCIpO1xuICAgICAgICBleHBOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX2xpZmViYXI7XG4gICAgICAgIGV4cE5vZGUuc2V0UG9zaXRpb24oLTM0LCAwKTtcbiAgICAgICAgZXhwTm9kZS5zZXRDb250ZW50U2l6ZSg0NCwgNDQpO1xuICAgICAgICBleHBOb2RlLnpJbmRleCA9IDA7XG5cbiAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoXCJfZXhwQmdcIik7XG4gICAgICAgIGJnLnBhcmVudCA9IGV4cE5vZGU7XG4gICAgICAgIGxldCBiZ0dyYXBoaWNzID0gYmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgYmdHcmFwaGljcy5saW5lV2lkdGggPSA1O1xuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNTAsIDY4LCA3NSwgMjIwKTtcbiAgICAgICAgYmdHcmFwaGljcy5jaXJjbGUoMCwgMCwgMTgpO1xuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGxldCBiYXIgPSBuZXcgY2MuTm9kZShcIl9leHBQcm9ncmVzc1wiKTtcbiAgICAgICAgYmFyLnBhcmVudCA9IGV4cE5vZGU7XG4gICAgICAgIGxldCBiYXJHcmFwaGljcyA9IGJhci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBiYXJHcmFwaGljcy5saW5lV2lkdGggPSA1O1xuICAgICAgICBiYXJHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDkwLCAyNTUsIDE0MCwgMjU1KTtcbiAgICAgICAgdGhpcy5fZmlyZS5fZXhwQmFyID0gZXhwTm9kZTtcbiAgICAgICAgdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MgPSBiYXI7XG4gICAgICAgIGJhcltcIiRHcmFwaGljc1wiXSA9IGJhckdyYXBoaWNzO1xuICAgIH1cblxuICAgIF9yZWZyZXNoRW5lcmd5VUkoKSB7XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9sYkhwTGV2ZWwgJiYgdGhpcy5fZmlyZS5fbGJIcExldmVsLiRMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGJIcExldmVsLiRMYWJlbC5zdHJpbmcgPSB0aGlzLl9lbmVyZ3lMZXZlbC50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzICYmIHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzLiRHcmFwaGljcykge1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5fZW5lcmd5TmVlZEV4cCA+IDAgPyB0aGlzLl9lbmVyZ3lFeHAgLyB0aGlzLl9lbmVyZ3lOZWVkRXhwIDogMDtcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzLiRHcmFwaGljcztcbiAgICAgICAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA1O1xuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig5MCwgMjU1LCAxNDAsIDI1NSk7XG4gICAgICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgMTgsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiBwcm9ncmVzcywgZmFsc2UpO1xuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fZmlyZS5fZXhwQmFyICYmIHRoaXMuX2ZpcmUuX2V4cEJhci4kUHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2V4cEJhci4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLl9lbmVyZ3lOZWVkRXhwID4gMCA/IHRoaXMuX2VuZXJneUV4cCAvIHRoaXMuX2VuZXJneU5lZWRFeHAgOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KXtcblxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwLl9wYXVzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVGcmVlQnVsbGV0UmVjb3ZlcihkdCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDaGFyZ2VDYW5ub24oZHQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheWVyU2tpbGxJY29uQ29sbGlzaW9uVGVzdCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoUG9zaXRpb24oZHQpO1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaE1vdmVFZmZlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hCYXJyZWxEaXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hBbmdsZShkdCwgZmFsc2UpO1xuICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9MijotoXnuqflrZDlvLkpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSA9IHRoaXMuX3NraWxsMlRpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsMlRpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSB0aGlzLl9za2lsbDJUaW1lID4gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9Myjml6DmlYzpmLLlvqEpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSA9IHRoaXMuX3NraWxsM1RpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsM1RpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICBcbiAgICAgICAgICAgIC8v5pi+56S66ZOg55SyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICAgICAgICAgIHRoaXMuX2RlZiA9IHRoaXMuX3NraWxsM1RpbWUgPiAwID8gMTAwMDAwMDAgOiAwO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuX3ZpZXdNb2RlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XG4gICAgICAgICAgICB0aGlzLl9kaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyh0aGlzLl9kaXIsLTAuNSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2Rpcik7XG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9kaXI7XG4gICAgICAgICAgICB0aGlzLnNob290aW5nKGR0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBfcmVmcmVzaE1vdmVFZmZlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW92ZUVmZmVjdElkIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IE11c2ljTWFuYWdlci5wbGF5TG9vcEVmZmVjdChcInRhbmtNb3ZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3N0b3BNb3ZlRWZmZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fbW92ZUVmZmVjdElkID49IDApIHtcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5zdG9wRWZmZWN0KHRoaXMuX21vdmVFZmZlY3RJZCk7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlRWZmZWN0SWQgPSAtMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDngq7nrqHlp4vnu4jot5/pmo/lnablhYvmlbTkvZPmlrnlkJFcbiAgICBfcmVmcmVzaEJhcnJlbERpcigpIHtcbiAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xuICAgIH1cblxuICAgIC8vIOWPs+S+p+aMiemSruaKrOi1t+aXtuebtOaOpeWPkeWwhOS4gOWPkSwg5LiN6LWw5oyJ5L2P5oyB57ut5Y+R5bCE6YC76L6RXG4gICAgZmlyZU9uY2UoKSB7XG4gICAgICAgIGxldCB0eXBlID0gKHRoaXMuX3ZpZXdNb2RlIHx8IHRoaXMuX3NraWxsMlRpbWUgPiAwKSA/IHRoaXMuX2NvbmZpZy5CVHlwZTIgOiB0aGlzLl9jb25maWcuQlR5cGUxO1xuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fdmlld01vZGUgPyB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICogMC44IDp0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzO1xuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgodHlwZSx0aGlzLm5vZGUucG9zaXRpb24sdGhpcy5fYmFycmVsRGlyLHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCsyMCxhdHRhY2tSYWRpdXMsdGhpcy5fYXRrLHRoaXMuX2NhbXAsdGhpcy5ub2RlLnBhcmVudCx0aGlzLl9tYXApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlICYmIHRoaXMuX21hcC5lbmVteUNvdW50KCkgPiAwKSB7XG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZUNoYXJnZUNhbm5vbihkdCkge1xuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIC09IGR0O1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvb2xkb3duUHJvZ3Jlc3MgPSAxIC0gdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIC8gdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd247XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNvb2xkb3duXCIsIHtwcm9ncmVzczogY29vbGRvd25Qcm9ncmVzc30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgKz0gZHQ7XG4gICAgICAgIGxldCBuZWVkVGltZSA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIlRpbWVcIiwgNSk7XG4gICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgLyBuZWVkVGltZTtcbiAgICAgICAgaWYgKHByb2dyZXNzID4gMSkge1xuICAgICAgICAgICAgcHJvZ3Jlc3MgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IHByb2dyZXNzfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID09IGZhbHNlICYmIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPj0gbmVlZFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dDaGFyZ2VFZmZlY3QoKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZmlyZUNoYXJnZUNhbm5vbigpIHtcbiAgICAgICAgbGV0IGF0dGFja1JhZGl1cyA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkF0dGFja1JhZGl1c1wiLCB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICogMS40KTtcbiAgICAgICAgbGV0IGF0a1JhdGlvID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQXRrUmF0aW9cIiwgMyk7XG4gICAgICAgIGxldCBzcGVlZCA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIlNwZWVkXCIsIDEyKTtcbiAgICAgICAgbGV0IHdpcGVMZW4gPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZSgxMik7XG4gICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeChDSEFSR0VfQ0FOTk9OX0JVTExFVF9UWVBFLCB0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX2JhcnJlbERpciwgd2lwZUxlbiwgYXR0YWNrUmFkaXVzLCB0aGlzLl9hdGsgKiBhdGtSYXRpbywgdGhpcy5fY2FtcCwgdGhpcy5ub2RlLnBhcmVudCwgdGhpcy5fbWFwLCBzcGVlZCk7XG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlU2hvb3RcIik7XG4gICAgICAgIHRoaXMuX3NoYWtlU2NyZWVuKCk7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQ29vbGRvd25cIiwgOCk7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xuICAgIH1cblxuICAgIF9nZXRDaGFyZ2VDb25maWcoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgbGV0IGZ1bGxLZXkgPSBcIkNoYXJnZVwiICsga2V5O1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWdbZnVsbEtleV0gOiBudWxsO1xuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xuICAgIH1cblxuICAgIF9yZXNldENoYXJnZUNhbm5vbigpIHtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hpZGVDaGFyZ2VFZmZlY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8PSAwKSB7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwge30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Nob3dDaGFyZ2VFZmZlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlTXV6emxlRWZmZWN0XCIpO1xuICAgICAgICBlZmZlY3QucGFyZW50ID0gYmFycmVsTm9kZTtcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oNCkpKTtcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDEwMDtcblxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBlZmZlY3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA0MCwgMjAsIDE4MCk7XG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxOCk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcblxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjUsIDEuMzUpLFxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAwLjkpXG4gICAgICAgICkpKTtcbiAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSA9IGVmZmVjdDtcbiAgICB9XG5cbiAgICBfaGlkZUNoYXJnZUVmZmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgX3NoYWtlU2NyZWVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLm5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXBOb2RlID0gdGhpcy5fbWFwLm5vZGU7XG4gICAgICAgIGxldCBvcmlnaW4gPSBtYXBOb2RlLnBvc2l0aW9uO1xuICAgICAgICBtYXBOb2RlLnN0b3BBY3Rpb25CeVRhZyg5MDAxKTtcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDApLFxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAzKSxcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCAwLCAtMyksXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG1hcE5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwMSk7XG4gICAgICAgIG1hcE5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcbiAgICB9XG5cbiAgICBfZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbihleHRyYU9mZnNldCA9IDApIHtcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XG4gICAgICAgIGxldCBhbmNob3JZID0gYmFycmVsTm9kZS5hbmNob3JZID09IG51bGwgPyAwLjUgOiBiYXJyZWxOb2RlLmFuY2hvclk7XG4gICAgICAgIHJldHVybiBjYy52MigwLCBiYXJyZWxOb2RlLmhlaWdodCAqICgxIC0gYW5jaG9yWSkgKyBleHRyYU9mZnNldCk7XG4gICAgfVxuXG4gICAgX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKGV4dHJhT2Zmc2V0ID0gMCkge1xuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcbiAgICAgICAgbGV0IGxvY2FsUG9zID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbihleHRyYU9mZnNldCk7XG4gICAgICAgIGxldCB3b3JsZFBvcyA9IGJhcnJlbE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGxvY2FsUG9zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xuICAgIH1cblxuICAgIF9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZShleHRyYU9mZnNldCA9IDApIHtcbiAgICAgICAgbGV0IG11enpsZVBvcyA9IHRoaXMuX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKGV4dHJhT2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIG11enpsZVBvcy5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcbiAgICB9XG5cbiAgICBfdHJ5RmlyZU9uY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA8IFBMQVlFUl9TSE9PVF9JTlRFUlZBTCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8PSAwICYmIHRoaXMuX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0xvd0hwU2hvb3RUaXAoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcbiAgICAgICAgdGhpcy5maXJlT25jZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQtLTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb25zdW1lSHBGb3JQYWlkQnVsbGV0KCk7XG4gICAgfVxuXG4gICAgX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocCA8PSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XG4gICAgfVxuXG4gICAgX3Nob3dMb3dIcFNob290VGlwKCkge1xuICAgICAgICBsZXQgY2hhbm5lbCA9IFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpO1xuICAgICAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnNob3dUb2FzdCkge1xuICAgICAgICAgICAgY2hhbm5lbC5zaG93VG9hc3QoXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjYy5sb2coXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NvbnN1bWVIcEZvclBhaWRCdWxsZXQoKSB7XG4gICAgICAgIHRoaXMuX2hwIC09IFBMQVlFUl9QQUlEX1NIT1RfSFBfQ09TVDtcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5faHAgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/njqnlrrblj5flh7vkuI3po5jkvKTlrrPmlbDlrZcsIOeUqOWMuuWIq+S6juaVjOS6uueahOiTneiJsumXquWFieihqOeOsFxuICAgIGJlSGl0KGRhbWFnZSl7XG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSAtIHRoaXMuX2RlZjtcbiAgICAgICAgaWYgKGRhbWFnZSA8IDApIHtcbiAgICAgICAgICAgIGRhbWFnZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ocCAtPSBkYW1hZ2U7XG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKTtcbiAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcblxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2hvd1BsYXllckhpdEVmZmVjdCgpIHtcbiAgICAgICAgbGV0IGVmZmVjdCA9IG5ldyBjYy5Ob2RlKFwiX3BsYXllckhpdEVmZmVjdFwiKTtcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICBlZmZlY3QuekluZGV4ID0gMzAwO1xuXG4gICAgICAgIGxldCBncmFwaGljcyA9IGVmZmVjdC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA4O1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDgwLCAyMTAsIDI1NSwgMjMwKTtcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE2KTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDcwLCAxNzAsIDI1NSwgNTUpO1xuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTApO1xuICAgICAgICBncmFwaGljcy5maWxsKCk7XG5cbiAgICAgICAgZWZmZWN0Lm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIGVmZmVjdC5zY2FsZSA9IDAuNjU7XG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuMjUpLFxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjE4LCA2MClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMSksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUZyZWVCdWxsZXRSZWNvdmVyKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lICs9IGR0O1xuICAgICAgICBpZiAodGhpcy5fc3RvcEZpcmVUaW1lIDwgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lICs9IGR0O1xuICAgICAgICB3aGlsZSAodGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID49IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMXG4gICAgICAgICAgICAmJiB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgLT0gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUw7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCkge1xuICAgICAgICBsZXQgYnVsbGV0QmFycyA9IFtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMSxcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMixcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMyxcbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHJlY292ZXJQcm9ncmVzcyA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8IFBMQVlFUl9GUkVFX0JVTExFVF9NQVhcbiAgICAgICAgICAgICYmIHRoaXMuX3N0b3BGaXJlVGltZSA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSkge1xuICAgICAgICAgICAgcmVjb3ZlclByb2dyZXNzID0gdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lIC8gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUw7XG4gICAgICAgICAgICBpZiAocmVjb3ZlclByb2dyZXNzID4gMSkge1xuICAgICAgICAgICAgICAgIHJlY292ZXJQcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWxsZXRCYXJzLmZvckVhY2goKGJhck5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJhck5vZGUgfHwgIWJhck5vZGUuJFByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggPCB0aGlzLl9mcmVlQnVsbGV0Q291bnQpIHtcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PSB0aGlzLl9mcmVlQnVsbGV0Q291bnQgJiYgcmVjb3ZlclByb2dyZXNzID4gMCkge1xuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gcmVjb3ZlclByb2dyZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5bCE5Ye7XG4gICAgc2hvb3RpbmcoZHQpe1xuICAgICAgICBsZXQganVkZ2VDRCA9IHRoaXMuX3NraWxsMlRpbWUgPiAwID8gdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lLzQgOiB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWU7XG5cbiAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA+PSBqdWRnZUNEKSB7XG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZU9uY2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL+aJp+ihjOatu+S6oVxuICAgIGRvRGVhdGgoKXtcbiAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcbiAgICAgICAgc3VwZXIuZG9EZWF0aCgpO1xuICAgICAgICBcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJwbGF5ZXItZGVhdGhcIix7fSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7IFxuICAgICAgICAvLyDniIbngrjmlYjmnpxcbiAgICAgICAgLy8g5pi+56S657uT5p2f55WM6Z2iXG4gICAgfVxuXG4gICAgc2V0SW5HYW1lKCl7XG4gICAgICAgIHRoaXMuX2luR2FtZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgLy/ojrflj5bnorDmkp7moYZcbiAgICBnZXRQbGF5ZXJCb3VuZGluZ0JveCgpe1xuICAgICAgICByZXR1cm4gVXRpbHMuZ2V0V29ybGRCb3VuZGluZ0JveCh0aGlzLl9jdXJyZW50QmcpO1xuICAgIH1cblxuICAgIHNldFZpZXdNb2RlKCl7XG4gICAgICAgIHRoaXMuX3ZpZXdNb2RlID0gdHJ1ZTtcbiAgICB9XG59XG4iXX0=