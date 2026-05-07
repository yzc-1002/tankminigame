
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
var LOW_HP_SCREEN_FLASH_IN = 0.2;
var LOW_HP_SCREEN_FLASH_OUT = 0.5;
var LOW_HP_SCREEN_FLASH_LOOP = 3;
var SHOOT_RECOIL_DISTANCE = 10;
var SHOOT_RECOIL_OUT_TIME = 0.04;
var SHOOT_RECOIL_RETURN_TIME = 0.11;
var SHOOT_FLASH_FADE_IN = 0.02;
var SHOOT_FLASH_FADE_OUT = 0.07;
var SACRIFICE_HP_RATIO = 0.5;
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
        _this._moveSpeedScale = 1; //局内移速倍率
        _this._energyLevel = 1; //局内能量等级
        _this._energyExp = 0; //当前经验
        _this._energyNeedExp = PLAYER_EXP_BASE; //升级所需经验
        _this._chargeCannonTime = 0; //蓄力炮蓄力时间
        _this._chargeCannonCdTime = 0; //蓄力炮冷却
        _this._chargeCannonCooldown = 0; //蓄力炮冷却总时长
        _this._chargeCannonCharging = false;
        _this._chargeCannonReady = false;
        _this._chargeEffectNode = null;
        _this._bulletMutationType = "";
        _this._bulletMutationData = null;
        _this._bulletMutationEffectNode = null;
        _this._moveEffectId = -1;
        _this._lowHpHeartbeatEffectId = -1;
        _this._lowHpScreenEffect = null;
        _this._shootInputDir = cc.v2(1, 0); //射击摇杆目标方向
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
        this._moveSpeedScale = 1;
        this._energyLevel = 1;
        this._energyExp = 0;
        this._energyNeedExp = this._getEnergyNeedExp();
        this._chargeCannonTime = 0;
        this._chargeCannonCdTime = 0;
        this._chargeCannonCooldown = 0;
        this._chargeCannonCharging = false;
        this._chargeCannonReady = false;
        this._bulletMutationType = "";
        this._bulletMutationData = null;
        this._bulletMutationEffectNode = null;
        this._moveEffectId = -1;
        this._lowHpHeartbeatEffectId = -1;
        this._lowHpScreenEffect = null;
        this._shootInputDir = this._barrelDir;
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
        yyp.eventCenter.on('trigger-sacrifice', this._doSacrifice, this); //献祭按钮
        yyp.eventCenter.on('trigger-skill', this._doSkill, this); //触发技能
    };
    //销毁事件
    Player.prototype._destroyEvent = function () {
        yyp.eventCenter.off('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.off('joy-stick-shoot', this._doShootJoyStick, this); //射击摇杆事件
        yyp.eventCenter.off('charge-cannon-press', this._doChargeCannonPress, this); //蓄力炮按下
        yyp.eventCenter.off('charge-cannon-release', this._doChargeCannonRelease, this); //蓄力炮松开
        yyp.eventCenter.off('trigger-sacrifice', this._doSacrifice, this); //献祭按钮
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
        if (event.dir && event.dir.magSqr() > 0) {
            this._shootInputDir = event.dir;
            this._barrelDir = event.dir;
        }
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
    Player.prototype._doSacrifice = function () {
        if (this._inGame == false) {
            return;
        }
        this._trySacrificeHpForEnergy();
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
        this._stopLowHpPlayerFeedback();
        this._hideBulletMutationEffect();
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
        var maxSpeed = this._getConfigValue("Speed", 0) * this._moveSpeedScale;
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
    Player.prototype._trySacrificeHpForEnergy = function () {
        if (this._hp <= 1) {
            this._showSacrificeTip("血量过低,无法献祭");
            return;
        }
        var maxSacrificeHp = this._hp - 1;
        var sacrificeHp = Math.min(this._hp * SACRIFICE_HP_RATIO, maxSacrificeHp);
        if (sacrificeHp <= 0) {
            this._showSacrificeTip("当前无法献祭");
            return;
        }
        this._hp -= sacrificeHp;
        this.refreshHp();
        this._addEnergyExp(sacrificeHp);
        this._refreshEnergyUI();
        this._playSacrificeFeedback();
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
    Player.prototype._showSacrificeTip = function (text) {
        var channel = SDKManager_1.default.getChannel();
        if (channel && channel.showToast) {
            channel.showToast(text);
        }
        else {
            cc.log(text);
        }
    };
    Player.prototype._playSacrificeFeedback = function () {
        MusicManager_1.MusicManager.playEffect("playerHit");
        Utils_1.Utils.vibrate();
        var wave = new cc.Node("_sacrificeWave");
        wave.parent = this.node;
        wave.setPosition(0, 0);
        wave.zIndex = 286;
        wave.opacity = 210;
        wave.scale = 0.72;
        var waveGraphics = wave.addComponent(cc.Graphics);
        waveGraphics.lineWidth = 7;
        waveGraphics.strokeColor = cc.color(255, 88, 82, 235);
        waveGraphics.circle(0, 0, this._radius + 16);
        waveGraphics.stroke();
        wave.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.26, 2.3), cc.fadeOut(0.26)), cc.removeSelf()));
        var glow = new cc.Node("_sacrificeGlow");
        glow.parent = this.node;
        glow.setPosition(0, 0);
        glow.zIndex = 285;
        glow.opacity = 0;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(255, 72, 68, 70);
        glowGraphics.circle(0, 0, this._radius + 20);
        glowGraphics.fill();
        glow.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.1, 190), cc.scaleTo(0.1, 1.22)), cc.spawn(cc.fadeOut(0.18), cc.scaleTo(0.18, 1.78)), cc.removeSelf()));
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
            this.updateLowHpVisual(dt);
            this._updateLowHpPlayerFeedback();
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
            this._stopLowHpPlayerFeedback();
            this._stopMoveEffect();
            this._dir = Utils_1.Utils.vectorsRotateDegress(this._dir, -0.5);
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir);
            this._barrelDir = this._dir;
            this.shooting(dt);
        }
        else {
            this._stopLowHpPlayerFeedback();
            this._stopMoveEffect();
        }
    };
    Player.prototype.getTestUpgradeChoices = function () {
        var hpAdd = Math.max(25, Math.round(this._maxHp * 0.22));
        var atkAdd = Math.max(8, Math.round(this._atk * 0.18));
        var speedAdd = 18;
        return [
            {
                id: "hp",
                title: "装甲强化",
                desc: "生命上限提升并立刻回满",
                shortLabel: "HP",
                valueText: "+" + hpAdd,
                amount: hpAdd,
                color: cc.color(120, 255, 170, 255),
            },
            {
                id: "atk",
                title: "火力强化",
                desc: "攻击力提升, 输出更高",
                shortLabel: "ATK",
                valueText: "+" + atkAdd,
                amount: atkAdd,
                color: cc.color(255, 185, 90, 255),
            },
            {
                id: "speed",
                title: "推进强化",
                desc: "移动速度提升, 走位更灵活",
                shortLabel: "SPD",
                valueText: "+" + speedAdd + "%",
                amount: speedAdd,
                color: cc.color(110, 210, 255, 255),
            },
        ];
    };
    Player.prototype.getTestBulletMutationChoices = function () {
        return [
            {
                id: "bounce",
                title: "反弹子弹",
                desc: "碰墙后自动反弹1次",
                shortLabel: "反",
                valueText: "x1",
                bounceCount: 1,
                color: cc.color(90, 180, 255, 255),
                effectColor: cc.color(90, 180, 255, 210),
            },
            {
                id: "penetrate",
                title: "穿透子弹",
                desc: "连续穿透3个目标后消失",
                shortLabel: "穿",
                valueText: "x3",
                penetrateCount: 3,
                color: cc.color(255, 92, 92, 255),
                effectColor: cc.color(255, 92, 92, 210),
            },
            {
                id: "heavy",
                title: "重炮子弹",
                desc: "伤害提升60%, 子弹更大",
                shortLabel: "重",
                valueText: "+60%",
                damageRatio: 1.6,
                scale: 1.35,
                color: cc.color(255, 210, 90, 255),
                effectColor: cc.color(255, 210, 90, 210),
            },
        ];
    };
    Player.prototype.applyTestUpgradeChoice = function (choice) {
        if (!choice || !choice.id) {
            return;
        }
        if (choice.id == "hp") {
            this._maxHp += choice.amount;
            this._hp = this._maxHp;
            this.refreshHp();
        }
        else if (choice.id == "atk") {
            this._atk += choice.amount;
        }
        else if (choice.id == "speed") {
            this._moveSpeedScale += choice.amount / 100;
        }
        this._showUpgradeFloat(choice);
        this._playUpgradeSelectFeedback(choice);
    };
    Player.prototype.applyTestBulletMutationChoice = function (choice) {
        if (!choice || !choice.id) {
            return;
        }
        this._bulletMutationType = choice.id;
        this._bulletMutationData = {
            id: choice.id,
            title: choice.title,
            shortLabel: choice.shortLabel,
            valueText: choice.valueText,
            bounceCount: choice.bounceCount || 0,
            penetrateCount: choice.penetrateCount || 0,
            damageRatio: choice.damageRatio || 1,
            scale: choice.scale || 1,
            color: choice.color,
            effectColor: choice.effectColor || choice.color,
        };
        this._showBulletMutationMedal(this._bulletMutationData);
        this._refreshBulletMutationEffect();
        this._playUpgradeSelectFeedback(this._bulletMutationData);
    };
    Player.prototype._getCurrentBulletMutationData = function () {
        if (!this._bulletMutationData) {
            return null;
        }
        var data = Object.assign({}, this._bulletMutationData);
        data.color = this._bulletMutationData.color;
        data.effectColor = this._bulletMutationData.effectColor;
        return data;
    };
    Player.prototype._showUpgradeFloat = function (choice) {
        if (!this.node.parent || !cc.isValid(this.node.parent)) {
            return;
        }
        var floatNode = new cc.Node("_upgradeFloat");
        floatNode.parent = this.node.parent;
        floatNode.setPosition(cc.v3(this.node.x, this.node.y + 110, 0));
        floatNode.zIndex = 6500;
        floatNode.opacity = 0;
        floatNode.scale = 0.82;
        var badge = new cc.Node("_upgradeBadge");
        badge.parent = floatNode;
        badge.setPosition(-44, 4);
        var badgeGraphics = badge.addComponent(cc.Graphics);
        badgeGraphics.fillColor = choice.color;
        badgeGraphics.circle(0, 0, 24);
        badgeGraphics.fill();
        badgeGraphics.lineWidth = 3;
        badgeGraphics.strokeColor = cc.color(255, 255, 255, 220);
        badgeGraphics.circle(0, 0, 24);
        badgeGraphics.stroke();
        var badgeLabelNode = new cc.Node("_upgradeBadgeLabel");
        badgeLabelNode.parent = badge;
        badgeLabelNode.setContentSize(54, 32);
        var badgeLabel = badgeLabelNode.addComponent(cc.Label);
        badgeLabel.string = choice.shortLabel;
        badgeLabel.fontSize = choice.shortLabel.length > 2 ? 15 : 18;
        badgeLabel.lineHeight = 20;
        badgeLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        badgeLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var valueNode = new cc.Node("_upgradeValue");
        valueNode.parent = floatNode;
        valueNode.setPosition(22, 8);
        valueNode.color = choice.color;
        valueNode.setContentSize(170, 38);
        var valueLabel = valueNode.addComponent(cc.Label);
        valueLabel.string = choice.valueText;
        valueLabel.fontSize = 34;
        valueLabel.lineHeight = 38;
        valueLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        valueLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var titleNode = new cc.Node("_upgradeTitle");
        titleNode.parent = floatNode;
        titleNode.setPosition(16, -24);
        titleNode.color = cc.color(255, 255, 255, 220);
        titleNode.setContentSize(220, 28);
        var titleLabel = titleNode.addComponent(cc.Label);
        titleLabel.string = choice.title;
        titleLabel.fontSize = 20;
        titleLabel.lineHeight = 24;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        floatNode.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.12), cc.scaleTo(0.12, 1.04), cc.moveBy(0.12, 0, 18)), cc.spawn(cc.moveBy(0.55, 0, 72), cc.fadeOut(0.55)), cc.removeSelf()));
    };
    Player.prototype._playUpgradeSelectFeedback = function (choice) {
        var wave = new cc.Node("_upgradeWave");
        wave.parent = this.node;
        wave.setPosition(0, 0);
        wave.zIndex = 280;
        wave.opacity = 220;
        wave.scale = 0.55;
        var waveGraphics = wave.addComponent(cc.Graphics);
        waveGraphics.lineWidth = 8;
        waveGraphics.strokeColor = choice.color;
        waveGraphics.circle(0, 0, this._radius + 18);
        waveGraphics.stroke();
        wave.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.3, 3.2), cc.fadeOut(0.3)), cc.removeSelf()));
        var glow = new cc.Node("_upgradeGlow");
        glow.parent = this.node;
        glow.setPosition(0, 0);
        glow.zIndex = 275;
        glow.opacity = 0;
        glow.scale = 0.75;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(choice.color.r, choice.color.g, choice.color.b, 90);
        glowGraphics.circle(0, 0, this._radius + 26);
        glowGraphics.fill();
        glow.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.12, 180), cc.scaleTo(0.12, 1.28)), cc.spawn(cc.fadeOut(0.18), cc.scaleTo(0.18, 1.8)), cc.removeSelf()));
        this.node.stopActionByTag(9301);
        var punch = cc.sequence(cc.scaleTo(0.1, 1.08), cc.scaleTo(0.2, 1));
        punch.setTag(9301);
        this.node.runAction(punch);
        if (this._map && this._map.playLightScreenShake) {
            this._map.playLightScreenShake();
        }
    };
    Player.prototype._showBulletMutationMedal = function (choice) {
        if (!this.node.parent || !cc.isValid(this.node.parent)) {
            return;
        }
        var medal = new cc.Node("_bulletMutationMedal");
        medal.parent = this.node.parent;
        medal.setPosition(cc.v3(this.node.x, this.node.y + 112, 0));
        medal.zIndex = 6600;
        medal.opacity = 0;
        medal.scale = 0.88;
        var badge = new cc.Node("_medalBadge");
        badge.parent = medal;
        var badgeGraphics = badge.addComponent(cc.Graphics);
        badgeGraphics.fillColor = choice.color;
        badgeGraphics.circle(0, 0, 28);
        badgeGraphics.fill();
        badgeGraphics.lineWidth = 3;
        badgeGraphics.strokeColor = cc.color(255, 255, 255, 220);
        badgeGraphics.circle(0, 0, 28);
        badgeGraphics.stroke();
        var badgeLabelNode = new cc.Node("_medalBadgeLabel");
        badgeLabelNode.parent = badge;
        badgeLabelNode.setContentSize(52, 32);
        var badgeLabel = badgeLabelNode.addComponent(cc.Label);
        badgeLabel.string = choice.shortLabel;
        badgeLabel.fontSize = 22;
        badgeLabel.lineHeight = 26;
        badgeLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        badgeLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var titleNode = new cc.Node("_medalTitle");
        titleNode.parent = medal;
        titleNode.setPosition(0, -48);
        titleNode.color = cc.color(255, 255, 255, 235);
        titleNode.setContentSize(220, 32);
        var titleLabel = titleNode.addComponent(cc.Label);
        titleLabel.string = choice.title;
        titleLabel.fontSize = 22;
        titleLabel.lineHeight = 26;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        medal.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.12), cc.scaleTo(0.12, 1.02), cc.moveBy(0.12, 0, 16)), cc.delayTime(1.88), cc.spawn(cc.fadeOut(0.35), cc.moveBy(0.35, 0, 34)), cc.removeSelf()));
    };
    Player.prototype._refreshBulletMutationEffect = function () {
        this._hideBulletMutationEffect();
        if (!this._bulletMutationData) {
            return;
        }
        var barrelNode = this._currentBg || this._fire._lyBarrel;
        var effect = new cc.Node("_bulletMutationMuzzleEffect");
        effect.parent = barrelNode;
        effect.setPosition(cc.v3(this._getBarrelMuzzleLocalPosition(-2)));
        effect.zIndex = 96;
        this._bulletMutationEffectNode = effect;
        var outer = new cc.Node("_muzzleOuter");
        outer.parent = effect;
        var outerGraphics = outer.addComponent(cc.Graphics);
        outerGraphics.fillColor = cc.color(this._bulletMutationData.effectColor.r, this._bulletMutationData.effectColor.g, this._bulletMutationData.effectColor.b, 90);
        outerGraphics.circle(0, 0, 16);
        outerGraphics.fill();
        var inner = new cc.Node("_muzzleInner");
        inner.parent = effect;
        var innerGraphics = inner.addComponent(cc.Graphics);
        innerGraphics.fillColor = this._bulletMutationData.effectColor;
        innerGraphics.circle(0, 0, 8);
        innerGraphics.fill();
        effect.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(0.22, 1.22), cc.fadeTo(0.22, 220)), cc.spawn(cc.scaleTo(0.22, 0.9), cc.fadeTo(0.22, 150)))));
    };
    Player.prototype._hideBulletMutationEffect = function () {
        if (this._bulletMutationEffectNode && cc.isValid(this._bulletMutationEffectNode)) {
            this._bulletMutationEffectNode.stopAllActions();
            this._bulletMutationEffectNode.destroy();
        }
        this._bulletMutationEffectNode = null;
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
    // 炮管只跟随右侧发射摇杆方向
    Player.prototype._refreshBarrelDir = function () {
        if (this._shootInputDir && this._shootInputDir.magSqr() > 0) {
            this._barrelDir = this._shootInputDir;
        }
    };
    // 右侧按钮抬起时直接发射一发, 不走按住持续发射逻辑
    Player.prototype.fireOnce = function () {
        var type = (this._viewMode || this._skill2Time > 0) ? this._config.BType2 : this._config.BType1;
        var attackRadius = this._viewMode ? this._config.AttackRadius * 0.8 : this._config.AttackRadius;
        var mutationData = this._viewMode ? null : this._getCurrentBulletMutationData();
        BulletE_1.Bullet.createBulletEx(type, this.node.position, this._barrelDir, this._fire._lyBarrel.height + 20, attackRadius, this._atk, this._camp, this.node.parent, this._map, 8, mutationData);
        if (this._map && this._map.isShootEffectTestMode && this._map.isShootEffectTestMode()) {
            this._playShootFeedback(type, mutationData);
        }
        // if (this._viewMode == false && this._map.enemyCount() > 0) {
        if (this._viewMode == false) {
            MusicManager_1.MusicManager.playEffect("shoot");
        }
    };
    Player.prototype._playShootFeedback = function (bulletType, mutationData) {
        this._playBarrelRecoil();
        this._playMuzzleFlash(bulletType, mutationData);
        this._playShootGlow(bulletType, mutationData);
        this._playShootShake();
    };
    Player.prototype._playBarrelRecoil = function () {
        var recoilNode = this._currentBg || (this._fire && this._fire._lyBarrel);
        if (!recoilNode || !cc.isValid(recoilNode)) {
            return;
        }
        var parentNode = recoilNode.parent;
        if (!parentNode || !cc.isValid(parentNode)) {
            return;
        }
        var basePos = recoilNode["_shootBasePos"];
        if (!basePos) {
            basePos = cc.v3(recoilNode.position);
            recoilNode["_shootBasePos"] = cc.v3(basePos);
        }
        var baseWorldPos = parentNode.convertToWorldSpaceAR(basePos);
        var recoilDir = this._barrelDir && this._barrelDir.magSqr() > 0 ? this._barrelDir.normalize() : cc.v2(1, 0);
        var recoilWorldPos = cc.v2(baseWorldPos).sub(recoilDir.mul(SHOOT_RECOIL_DISTANCE));
        var recoilLocalPos = parentNode.convertToNodeSpaceAR(recoilWorldPos);
        recoilNode.stopActionByTag(9004);
        recoilNode.setPosition(basePos);
        var action = cc.sequence(cc.moveTo(SHOOT_RECOIL_OUT_TIME, recoilLocalPos.x, recoilLocalPos.y), cc.moveTo(SHOOT_RECOIL_RETURN_TIME, basePos.x, basePos.y));
        action.setTag(9004);
        recoilNode.runAction(action);
    };
    Player.prototype._playMuzzleFlash = function (bulletType, mutationData) {
        var barrelNode = this._currentBg || this._fire._lyBarrel;
        if (!barrelNode || !cc.isValid(barrelNode)) {
            return;
        }
        var effectColor = this._getShootEffectColor(bulletType, mutationData);
        var flash = new cc.Node("_shootMuzzleFlash");
        flash.parent = barrelNode;
        flash.setPosition(cc.v3(this._getBarrelMuzzleLocalPosition(6)));
        flash.zIndex = 115;
        flash.opacity = 0;
        flash.scaleX = 0.28;
        flash.scaleY = 0.72;
        var cone = new cc.Node("_flashCone");
        cone.parent = flash;
        var coneGraphics = cone.addComponent(cc.Graphics);
        coneGraphics.fillColor = cc.color(effectColor.r, effectColor.g, effectColor.b, 210);
        coneGraphics.moveTo(0, 36);
        coneGraphics.lineTo(-17, 8);
        coneGraphics.lineTo(-7, -8);
        coneGraphics.lineTo(0, 4);
        coneGraphics.lineTo(7, -8);
        coneGraphics.lineTo(17, 8);
        coneGraphics.close();
        coneGraphics.fill();
        var core = new cc.Node("_flashCore");
        core.parent = flash;
        var coreGraphics = core.addComponent(cc.Graphics);
        coreGraphics.fillColor = cc.color(255, 250, 220, 235);
        coreGraphics.circle(0, 0, 11);
        coreGraphics.fill();
        flash.runAction(cc.sequence(cc.spawn(cc.fadeTo(SHOOT_FLASH_FADE_IN, 255), cc.scaleTo(SHOOT_FLASH_FADE_IN, 1.1, 1.18)), cc.spawn(cc.fadeOut(SHOOT_FLASH_FADE_OUT), cc.scaleTo(SHOOT_FLASH_FADE_OUT, 0.55, 1.65)), cc.removeSelf()));
    };
    Player.prototype._playShootGlow = function (bulletType, mutationData) {
        var effectColor = this._getShootEffectColor(bulletType, mutationData);
        if (!this.node.parent || !cc.isValid(this.node.parent)) {
            return;
        }
        var muzzleGlow = new cc.Node("_shootMuzzleGlow");
        muzzleGlow.parent = this.node.parent;
        muzzleGlow.setPosition(cc.v3(this._getBarrelMuzzlePosition(0)));
        muzzleGlow.zIndex = 285;
        muzzleGlow.opacity = 0;
        muzzleGlow.scale = 0.5;
        var muzzleGlowGraphics = muzzleGlow.addComponent(cc.Graphics);
        muzzleGlowGraphics.fillColor = cc.color(effectColor.r, effectColor.g, effectColor.b, 95);
        muzzleGlowGraphics.circle(0, 0, 28);
        muzzleGlowGraphics.fill();
        muzzleGlow.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.03, 210), cc.scaleTo(0.03, 1.05)), cc.spawn(cc.fadeOut(0.1), cc.scaleTo(0.1, 1.65)), cc.removeSelf()));
        var bodyGlow = new cc.Node("_shootBodyGlow");
        bodyGlow.parent = this.node;
        bodyGlow.setPosition(0, 0);
        bodyGlow.zIndex = 260;
        bodyGlow.opacity = 0;
        bodyGlow.scale = 0.75;
        var bodyGlowGraphics = bodyGlow.addComponent(cc.Graphics);
        bodyGlowGraphics.fillColor = cc.color(effectColor.r, effectColor.g, effectColor.b, 70);
        bodyGlowGraphics.circle(0, 0, this._radius + 28);
        bodyGlowGraphics.fill();
        bodyGlow.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.04, 150), cc.scaleTo(0.04, 1.08)), cc.spawn(cc.fadeOut(0.12), cc.scaleTo(0.12, 1.38)), cc.removeSelf()));
    };
    Player.prototype._playShootShake = function () {
        if (this._map && this._map.playLightScreenShake) {
            this._map.playLightScreenShake();
        }
    };
    Player.prototype._getShootEffectColor = function (bulletType, mutationData) {
        if (mutationData && mutationData.effectColor) {
            return mutationData.effectColor;
        }
        if (bulletType == this._config.BType2) {
            return cc.color(120, 225, 255, 230);
        }
        return cc.color(255, 205, 95, 230);
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
    Player.prototype._updateLowHpPlayerFeedback = function () {
        if (!this._inGame || !this.isLowHp()) {
            this._stopLowHpPlayerFeedback();
            return;
        }
        this._startLowHpScreenEffect();
        this._startLowHpHeartbeatSound();
    };
    Player.prototype._startLowHpHeartbeatSound = function () {
        if (this._lowHpHeartbeatEffectId >= 0) {
            return;
        }
        this._lowHpHeartbeatEffectId = MusicManager_1.MusicManager.playLoopEffect("heartbeat");
    };
    Player.prototype._stopLowHpHeartbeatSound = function () {
        if (this._lowHpHeartbeatEffectId >= 0) {
            MusicManager_1.MusicManager.stopEffect(this._lowHpHeartbeatEffectId);
            this._lowHpHeartbeatEffectId = -1;
        }
    };
    Player.prototype._startLowHpScreenEffect = function () {
        if (this._lowHpScreenEffect && cc.isValid(this._lowHpScreenEffect)) {
            return;
        }
        var effectRoot = new cc.Node("_lowHpScreenEffect");
        var parentNode = this._map && this._map.node && this._map.node.parent ? this._map.node.parent : this.node.parent;
        effectRoot.parent = parentNode;
        effectRoot.setPosition(0, 0);
        effectRoot.zIndex = 1600;
        this._lowHpScreenEffect = effectRoot;
        var borderNode = new cc.Node("_lowHpBorder");
        borderNode.parent = effectRoot;
        borderNode.opacity = 0;
        var createEdge = function (name, x, y, width, height) {
            var edge = new cc.Node(name);
            edge.parent = borderNode;
            edge.setPosition(x, y);
            var graphics = edge.addComponent(cc.Graphics);
            graphics.fillColor = cc.color(255, 60, 60, 255);
            graphics.rect(-width / 2, -height / 2, width, height);
            graphics.fill();
            return edge;
        };
        createEdge("_topEdge", 0, 351, 1280, 18);
        createEdge("_bottomEdge", 0, -351, 1280, 18);
        createEdge("_leftEdge", -631, 0, 18, 720);
        createEdge("_rightEdge", 631, 0, 18, 720);
        var idleTime = Math.max(0, LOW_HP_SCREEN_FLASH_LOOP - LOW_HP_SCREEN_FLASH_IN - LOW_HP_SCREEN_FLASH_OUT);
        borderNode.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(LOW_HP_SCREEN_FLASH_IN, 210), cc.fadeTo(LOW_HP_SCREEN_FLASH_OUT, 0), cc.delayTime(idleTime))));
    };
    Player.prototype._destroyLowHpScreenEffect = function () {
        if (this._lowHpScreenEffect && cc.isValid(this._lowHpScreenEffect)) {
            this._lowHpScreenEffect.destroy();
        }
        this._lowHpScreenEffect = null;
    };
    Player.prototype._stopLowHpPlayerFeedback = function () {
        this._stopLowHpHeartbeatSound();
        this._destroyLowHpScreenEffect();
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
        this._stopLowHpPlayerFeedback();
        this._stopMoveEffect();
        _super.prototype.doDeath.call(this);
        yyp.eventCenter.emit("player-death", {});
        this.node.destroy();
        // 爆炸效果
        // 显示结束界面
    };
    Player.prototype.debugSetLowHp = function () {
        var hp = Math.max(1, Math.floor(this._maxHp * 0.12));
        if (hp >= this._maxHp) {
            hp = Math.max(1, this._maxHp - 1);
        }
        this._hp = hp;
        this.refreshHp();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxJQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUNwQyxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNqQyxJQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUNuQyxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUN0QyxJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUNqQyxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUNsQyxJQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztBQUcvQjtJQUE0QiwwQkFBSTtJQUFoQztRQUFBLHFFQSs3Q0M7UUE3N0NHLE1BQU07UUFDTixZQUFNLEdBQVksQ0FB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LEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM3RCxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV6RCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDN0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQy9CLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUMzRCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV6RCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDN0IsU0FBUyxDQUFDLFdB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QUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxL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OlsiaW1wb3J0IHtUYW5rfSBmcm9tIFwiLi9UYW5rRVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xuaW1wb3J0IHtCdWxsZXR9IGZyb20gXCIuL0J1bGxldEVcIjtcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XG5pbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi9zZGsvc2RrL1NES01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBQTEFZRVJfU0hPT1RfSU5URVJWQUwgPSAwLjM1O1xuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX01BWCA9IDM7XG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSA9IDAuODtcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMID0gMC42O1xuY29uc3QgUExBWUVSX1BBSURfU0hPVF9IUF9DT1NUID0gNSAqICgxIC0gMC4xKTtcbmNvbnN0IFBMQVlFUl9FWFBfQkFTRSA9IDMwO1xuY29uc3QgUExBWUVSX0VYUF9TVEVQID0gMTU7XG5jb25zdCBDSEFSR0VfQ0FOTk9OX0JVTExFVF9UWVBFID0gOTk7XG5jb25zdCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0lOID0gMC4yO1xuY29uc3QgTE9XX0hQX1NDUkVFTl9GTEFTSF9PVVQgPSAwLjU7XG5jb25zdCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0xPT1AgPSAzO1xuY29uc3QgU0hPT1RfUkVDT0lMX0RJU1RBTkNFID0gMTA7XG5jb25zdCBTSE9PVF9SRUNPSUxfT1VUX1RJTUUgPSAwLjA0O1xuY29uc3QgU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FID0gMC4xMTtcbmNvbnN0IFNIT09UX0ZMQVNIX0ZBREVfSU4gPSAwLjAyO1xuY29uc3QgU0hPT1RfRkxBU0hfRkFERV9PVVQgPSAwLjA3O1xuY29uc3QgU0FDUklGSUNFX0hQX1JBVElPID0gMC41O1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFRhbmsge1xuXG4gICAgLy/lhoXpg6jlj5jph49cbiAgICBfbGV2ZWwgICAgICAgICAgPSAxOyAgICAgICAgLy/njqnlrrbnrYnnuqdcblxuICAgIF9idWxsZXRDb2RlVGltZSA9IDA7ICAgICAgICAvL+WwhOWHu+WGt+WNtOaXtumXtFxuXG4gICAgX2lzSGlnaEJ1bGxldCAgID0gZmFsc2U7ICAgIC8v5LiJ5Y+R6auY6aKR5a2Q5by5XG5cbiAgICBfc2tpbGwyVGltZSAgICAgPSAwOyAgICAgICAgLy/mioDog70yKOi2hee6p+WtkOW8uSnliankvZnml7bpl7RcbiAgICBfc2tpbGwzVGltZSAgICAgPSAwOyAgICAgICAgLy/mioDog70zKOaXoOaVjOmYsuW+oSnliankvZnml7bpl7RcblxuICAgIF9pbkdhbWUgICAgICAgICA9IGZhbHNlOyAgICAvL+WcqOa4uOaIj+S4reS4reS9v+eUqFxuICAgIF92aWV3TW9kZSAgICAgICA9IGZhbHNlOyAgICAvL+WxleekuuaooeW8j1xuICAgIF9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYOyAgLy/lvZPliY3lhY3otLnlrZDlvLnmlbDph49cbiAgICBfc3RvcEZpcmVUaW1lID0gMDsgICAgICAgICAgLy/lgZzngavorqHml7ZcbiAgICBfZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDsgLy/lhY3otLnlrZDlvLnmgaLlpI3orqHml7ZcbiAgICBfbW92ZUlucHV0RGlyID0gY2MudjIoMSwgMCk7IC8v56e75Yqo5pGH5p2G55uu5qCH5pa55ZCRXG4gICAgX21vdmVJbnB1dFJhdGlvID0gMDsgICAgICAgIC8v56e75Yqo5pGH5p2G55uu5qCH6YCf546HXG4gICAgX21vdmVTcGVlZFNjYWxlID0gMTsgICAgICAgIC8v5bGA5YaF56e76YCf5YCN546HXG4gICAgX2VuZXJneUxldmVsID0gMTsgICAgICAgICAgIC8v5bGA5YaF6IO96YeP562J57qnXG4gICAgX2VuZXJneUV4cCA9IDA7ICAgICAgICAgICAgIC8v5b2T5YmN57uP6aqMXG4gICAgX2VuZXJneU5lZWRFeHAgPSBQTEFZRVJfRVhQX0JBU0U7IC8v5Y2H57qn5omA6ZyA57uP6aqMXG4gICAgX2NoYXJnZUNhbm5vblRpbWUgPSAwOyAgICAgIC8v6JOE5Yqb54Ku6JOE5Yqb5pe26Ze0XG4gICAgX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7ICAgIC8v6JOE5Yqb54Ku5Ya35Y20XG4gICAgX2NoYXJnZUNhbm5vbkNvb2xkb3duID0gMDsgIC8v6JOE5Yqb54Ku5Ya35Y205oC75pe26ZW/XG4gICAgX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XG4gICAgX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XG4gICAgX2NoYXJnZUVmZmVjdE5vZGUgPSBudWxsO1xuICAgIF9idWxsZXRNdXRhdGlvblR5cGUgPSBcIlwiO1xuICAgIF9idWxsZXRNdXRhdGlvbkRhdGEgPSBudWxsO1xuICAgIF9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUgPSBudWxsO1xuICAgIF9tb3ZlRWZmZWN0SWQgPSAtMTtcbiAgICBfbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IC0xO1xuICAgIF9sb3dIcFNjcmVlbkVmZmVjdCA9IG51bGw7XG4gICAgX3Nob290SW5wdXREaXIgPSBjYy52MigxLCAwKTsgICAvL+WwhOWHu+aRh+adhuebruagh+aWueWQkVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIFxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcblxuICAgICAgICAvL+WIneWni+WMllVJXG4gICAgICAgIHRoaXMuX2luaXRVSSgpO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xuICAgIH1cblxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwicGxheWVyXCI7ICAvL+mYteiQpVxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLl9yYWRpdXMgKiAyOyAgICAvL+eOqeWutueahOeisOaSnuajgOa1i+iMg+WbtCoyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gUExBWUVSX1NIT09UX0lOVEVSVkFMO1xuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYO1xuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSB0aGlzLl9kaXI7XG4gICAgICAgIHRoaXMuX21vdmVJbnB1dFJhdGlvID0gMDtcbiAgICAgICAgdGhpcy5fbW92ZVNwZWVkU2NhbGUgPSAxO1xuICAgICAgICB0aGlzLl9lbmVyZ3lMZXZlbCA9IDE7XG4gICAgICAgIHRoaXMuX2VuZXJneUV4cCA9IDA7XG4gICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSB0aGlzLl9nZXRFbmVyZ3lOZWVkRXhwKCk7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IDA7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uVHlwZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IC0xO1xuICAgICAgICB0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID0gLTE7XG4gICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvb3RJbnB1dERpciA9IHRoaXMuX2JhcnJlbERpcjtcbiAgICB9XG5cbiAgICAvL+iuvue9ruWdpuWFi+exu+Wei1xuICAgIHNldFBsYXllclR5cGUodGFua1R5cGUscGxheWVyTGV2ZWwpIHtcbiAgICAgICAgc3VwZXIuc2V0VGFua1R5cGUodGFua1R5cGUpO1xuICAgICAgICBcbiAgICAgICAgLy/orqHnrpfnjqnlrrbooYDph48g5pS75Ye7XG4gICAgICAgIHRoaXMuX2xldmVsID0gcGxheWVyTGV2ZWw7XG4gICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHAgPSB0aGlzLl9jb25maWcuSFAgKiAodGhpcy5fbGV2ZWwrMSk7XG4gICAgICAgIHRoaXMuX2F0ayA9IHRoaXMuX2NvbmZpZy5BVEsgKiAodGhpcy5fbGV2ZWwrMSk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xuICAgIH1cblxuICAgIC8v5Yid5aeL5YyWVUlcbiAgICBfaW5pdFVJKCl7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwQXJtb3VyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BTa2lsbDMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgICAgIHRoaXMuX2luaXRFbmVyZ3lVSSgpO1xuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcbiAgICB9XG5cbiAgICAvL+WIneWni+WMluaOpeaUtuS6i+S7tlxuICAgIF9pbml0RXZlbnQoKSB7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgIC8v5pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrLXNob290Jyx0aGlzLl9kb1Nob290Sm95U3RpY2ssdGhpcyk7IC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignY2hhcmdlLWNhbm5vbi1wcmVzcycsdGhpcy5fZG9DaGFyZ2VDYW5ub25QcmVzcyx0aGlzKTsgLy/ok4Tlipvngq7mjInkuItcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjaGFyZ2UtY2Fubm9uLXJlbGVhc2UnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZSx0aGlzKTsgLy/ok4Tlipvngq7mnb7lvIBcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCd0cmlnZ2VyLXNhY3JpZmljZScsdGhpcy5fZG9TYWNyaWZpY2UsdGhpcyk7IC8v54yu56Wt5oyJ6ZKuXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndHJpZ2dlci1za2lsbCcsdGhpcy5fZG9Ta2lsbCx0aGlzKTsgICAgIC8v6Kem5Y+R5oqA6IO9XG4gICAgfVxuICAgICAgIFxuICAgIC8v6ZSA5q+B5LqL5Lu2XG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgLy/mkYfmnYbkuovku7ZcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignam95LXN0aWNrLXNob290Jyx0aGlzLl9kb1Nob290Sm95U3RpY2ssdGhpcyk7IC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2NoYXJnZS1jYW5ub24tcHJlc3MnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUHJlc3MsdGhpcyk7IC8v6JOE5Yqb54Ku5oyJ5LiLXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2NoYXJnZS1jYW5ub24tcmVsZWFzZScsdGhpcy5fZG9DaGFyZ2VDYW5ub25SZWxlYXNlLHRoaXMpOyAvL+iThOWKm+eCruadvuW8gFxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd0cmlnZ2VyLXNhY3JpZmljZScsdGhpcy5fZG9TYWNyaWZpY2UsdGhpcyk7IC8v54yu56Wt5oyJ6ZKuXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItc2tpbGwnLHRoaXMuX2RvU2tpbGwsdGhpcyk7ICAgIC8v6Kem5Y+R5oqA6IO9XG4gICAgfVxuICAgIFxuICAgIC8v5pGH5p2G5LqL5Lu2XG4gICAgX2RvSm95U3RpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gZXZlbnQuZGlyOyAgICAgIC8v5pa55ZCRXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IGV2ZW50LnJhdGlvOyAgLy/pgJ/njodcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgX2RvU2hvb3RKb3lTdGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGlmIChldmVudC5kaXIgJiYgZXZlbnQuZGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RJbnB1dERpciA9IGV2ZW50LmRpcjtcbiAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IGV2ZW50LmRpcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuZmlyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdHJ5RmlyZU9uY2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kb0NoYXJnZUNhbm5vblByZXNzKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID4gMCB8fCB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faGlkZUNoYXJnZUVmZmVjdCgpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwge3Byb2dyZXNzOiAwfSk7XG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlQ2Fubm9uXCIpO1xuICAgIH1cblxuICAgIF9kb0NoYXJnZUNhbm5vblJlbGVhc2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSB8fCB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlQ2hhcmdlQ2Fubm9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXNldENoYXJnZUNhbm5vbigpO1xuICAgIH1cblxuICAgIF9kb1NhY3JpZmljZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKTtcbiAgICB9XG4gICAgXG4gICAgLy/op6blj5HmioDog71cbiAgICBfZG9Ta2lsbChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XG4gICAgICAgICAgICBsZXQgc2tpbGxJZCA9IGV2ZW50LnNraWxsSWQ7ICAgIC8v5pa55ZCRXG4gICAgICAgICAgICAvLyBjYy5sb2coXCLop6blj5HkuobmioDog70gXCIsc2tpbGxJZCk7XG4gICAgICAgICAgICBpZiAoc2tpbGxJZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6dGhpcy5fY29uZmlnLkNvaW4vMTAscG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLm5vZGUpfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVuZXJneSh0aGlzLl9tYXhIcCAvIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSArPSAxNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgKz0gMTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xuICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xuICAgICAgICB0aGlzLl9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcbiAgICB9XG5cbiAgICAvL+WIt+aWsOeOqeWutuS9jee9rlxuICAgIF9yZWZyZXNoUG9zaXRpb24oZHQpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaE1vdmVTcGVlZChkdCk7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdHVybkRpclRvKHRoaXMuX21vdmVJbnB1dERpciwgZHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcblxuICAgICAgICAvL+eisOaSnua1i+ivlVxuICAgICAgICBsZXQgd2lsbFBvc2l0aW9uID0gdGhpcy5fZ2V0V2lsbFBvc2l0aW9uKGN1cnJQb3NpdGlvbiwgdGhpcy5fZGlyLCB0aGlzLl9jdXJyZW50U3BlZWQpO1xuICAgICAgICBsZXQgY29sbGlkZXJJdGVtcyA9IHRoaXMuX21hcC50ZXN0Q29sbGlkZXJzKHdpbGxQb3NpdGlvbiwgdGhpcy5fcmFkaXVzKTtcbiAgICAgICAgaWYgKGNvbGxpZGVySXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBsZXQgdGVzdERpciA9IHRoaXMuX2dldFRlc3REaXIoY3VyclBvc2l0aW9uLCB0aGlzLl9yYWRpdXMsIHRoaXMuX2RpciwgY29sbGlkZXJJdGVtcyk7XG4gICAgICAgICAgICBpZiAodGVzdERpcikge1xuICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRlc3REaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2lsbFBvc2l0aW9uID0gdGhpcy5fbWFwLmNsYW1wTWFwSW5uZXJQb3NpdGlvbih3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xuICAgIH1cblxuICAgIF9yZWZyZXNoTW92ZVNwZWVkKGR0KSB7XG4gICAgICAgIGxldCBtYXhTcGVlZCA9IHRoaXMuX2dldENvbmZpZ1ZhbHVlKFwiU3BlZWRcIiwgMCkgKiB0aGlzLl9tb3ZlU3BlZWRTY2FsZTtcbiAgICAgICAgbGV0IHRhcmdldFNwZWVkID0gdGhpcy5fbW92ZUlucHV0UmF0aW8gPiAwID8gbWF4U3BlZWQgKiB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA6IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA8IHRhcmdldFNwZWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgKz0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkFjY2VsZXJhdGlvblwiLCBtYXhTcGVlZCwgZHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IHRhcmdldFNwZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gdGFyZ2V0U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fY3VycmVudFNwZWVkID4gdGFyZ2V0U3BlZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCAtPSB0aGlzLl9nZXRGcmFtZVZhbHVlKFwiRGVjZWxlcmF0aW9uXCIsIG1heFNwZWVkLCBkdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSB0YXJnZXRTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEVuZXJneSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlY292ZXJIcCA9IHRoaXMuX21heEhwIC0gdGhpcy5faHA7XG4gICAgICAgIGlmIChyZWNvdmVySHAgPiAwKSB7XG4gICAgICAgICAgICBsZXQgYWRkSHAgPSBNYXRoLm1pbihyZWNvdmVySHAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX2hwICs9IGFkZEhwO1xuICAgICAgICAgICAgdmFsdWUgLT0gYWRkSHA7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkRW5lcmd5RXhwKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xuICAgIH1cblxuICAgIF90cnlTYWNyaWZpY2VIcEZvckVuZXJneSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTYWNyaWZpY2VUaXAoXCLooYDph4/ov4fkvY4s5peg5rOV54yu56WtXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1heFNhY3JpZmljZUhwID0gdGhpcy5faHAgLSAxO1xuICAgICAgICBsZXQgc2FjcmlmaWNlSHAgPSBNYXRoLm1pbih0aGlzLl9ocCAqIFNBQ1JJRklDRV9IUF9SQVRJTywgbWF4U2FjcmlmaWNlSHApO1xuICAgICAgICBpZiAoc2FjcmlmaWNlSHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd1NhY3JpZmljZVRpcChcIuW9k+WJjeaXoOazleeMruelrVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hwIC09IHNhY3JpZmljZUhwO1xuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xuXG4gICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cChzYWNyaWZpY2VIcCk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xuICAgICAgICB0aGlzLl9wbGF5U2FjcmlmaWNlRmVlZGJhY2soKTtcbiAgICB9XG5cbiAgICBfYWRkRW5lcmd5RXhwKGV4cCkge1xuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgKz0gZXhwO1xuICAgICAgICB3aGlsZSAodGhpcy5fZW5lcmd5RXhwID49IHRoaXMuX2VuZXJneU5lZWRFeHApIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUV4cCAtPSB0aGlzLl9lbmVyZ3lOZWVkRXhwO1xuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwrKztcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSB0aGlzLl9nZXRFbmVyZ3lOZWVkRXhwKCk7XG4gICAgICAgICAgICB0aGlzLl9sZXZlbFVwQnlFbmVyZ3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRFbmVyZ3lOZWVkRXhwKCkge1xuICAgICAgICBsZXQgY29uZmlnID0geXlwLmNvbmZpZy5FbmVyZ3kgfHwge307XG4gICAgICAgIGxldCBiYXNlID0gY29uZmlnLkV4cEJhc2UgPT0gbnVsbCA/IFBMQVlFUl9FWFBfQkFTRSA6IGNvbmZpZy5FeHBCYXNlO1xuICAgICAgICBsZXQgc3RlcCA9IGNvbmZpZy5FeHBTdGVwID09IG51bGwgPyBQTEFZRVJfRVhQX1NURVAgOiBjb25maWcuRXhwU3RlcDtcbiAgICAgICAgcmV0dXJuIGJhc2UgKyAodGhpcy5fZW5lcmd5TGV2ZWwgLSAxKSAqIHN0ZXA7XG4gICAgfVxuXG4gICAgX2xldmVsVXBCeUVuZXJneSgpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IHl5cC5jb25maWcuRW5lcmd5IHx8IHt9O1xuICAgICAgICBsZXQgaHBBZGQgPSBjb25maWcuTGV2ZWxIcEFkZCA9PSBudWxsID8gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcih0aGlzLl9jb25maWcuSFAgKiAwLjMpKSA6IGNvbmZpZy5MZXZlbEhwQWRkO1xuICAgICAgICBsZXQgYXRrQWRkID0gY29uZmlnLkxldmVsQXRrQWRkID09IG51bGwgPyB0aGlzLl9jb25maWcuQVRLICogMC4yIDogY29uZmlnLkxldmVsQXRrQWRkO1xuXG4gICAgICAgIHRoaXMuX21heEhwICs9IGhwQWRkO1xuICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX21heEhwO1xuICAgICAgICB0aGlzLl9hdGsgKz0gYXRrQWRkO1xuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xuICAgIH1cblxuICAgIF9pbml0RW5lcmd5VUkoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fbGlmZWJhciB8fCB0aGlzLl9maXJlLl9sYkhwTGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZXZlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9sYkhwTGV2ZWxcIik7XG4gICAgICAgIGxldmVsTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9saWZlYmFyO1xuICAgICAgICBsZXZlbE5vZGUuc2V0UG9zaXRpb24oLTM0LCAwKTtcbiAgICAgICAgbGV2ZWxOb2RlLnNldENvbnRlbnRTaXplKDM2LCAyNCk7XG4gICAgICAgIGxldmVsTm9kZS56SW5kZXggPSAxMDtcbiAgICAgICAgbGV0IGxldmVsTGFiZWwgPSBsZXZlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGV2ZWxMYWJlbC5mb250U2l6ZSA9IDE4O1xuICAgICAgICBsZXZlbExhYmVsLmxpbmVIZWlnaHQgPSAyMDtcbiAgICAgICAgbGV2ZWxMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsZXZlbExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgbGV2ZWxOb2RlW1wiJExhYmVsXCJdID0gbGV2ZWxMYWJlbDtcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJIcExldmVsID0gbGV2ZWxOb2RlO1xuXG4gICAgICAgIGxldCBleHBOb2RlID0gbmV3IGNjLk5vZGUoXCJfZXhwQmFyXCIpO1xuICAgICAgICBleHBOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX2xpZmViYXI7XG4gICAgICAgIGV4cE5vZGUuc2V0UG9zaXRpb24oLTM0LCAwKTtcbiAgICAgICAgZXhwTm9kZS5zZXRDb250ZW50U2l6ZSg0NCwgNDQpO1xuICAgICAgICBleHBOb2RlLnpJbmRleCA9IDA7XG5cbiAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoXCJfZXhwQmdcIik7XG4gICAgICAgIGJnLnBhcmVudCA9IGV4cE5vZGU7XG4gICAgICAgIGxldCBiZ0dyYXBoaWNzID0gYmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgYmdHcmFwaGljcy5saW5lV2lkdGggPSA1O1xuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNTAsIDY4LCA3NSwgMjIwKTtcbiAgICAgICAgYmdHcmFwaGljcy5jaXJjbGUoMCwgMCwgMTgpO1xuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGxldCBiYXIgPSBuZXcgY2MuTm9kZShcIl9leHBQcm9ncmVzc1wiKTtcbiAgICAgICAgYmFyLnBhcmVudCA9IGV4cE5vZGU7XG4gICAgICAgIGxldCBiYXJHcmFwaGljcyA9IGJhci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBiYXJHcmFwaGljcy5saW5lV2lkdGggPSA1O1xuICAgICAgICBiYXJHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDkwLCAyNTUsIDE0MCwgMjU1KTtcbiAgICAgICAgdGhpcy5fZmlyZS5fZXhwQmFyID0gZXhwTm9kZTtcbiAgICAgICAgdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MgPSBiYXI7XG4gICAgICAgIGJhcltcIiRHcmFwaGljc1wiXSA9IGJhckdyYXBoaWNzO1xuICAgIH1cblxuICAgIF9yZWZyZXNoRW5lcmd5VUkoKSB7XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9sYkhwTGV2ZWwgJiYgdGhpcy5fZmlyZS5fbGJIcExldmVsLiRMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGJIcExldmVsLiRMYWJlbC5zdHJpbmcgPSB0aGlzLl9lbmVyZ3lMZXZlbC50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzICYmIHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzLiRHcmFwaGljcykge1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5fZW5lcmd5TmVlZEV4cCA+IDAgPyB0aGlzLl9lbmVyZ3lFeHAgLyB0aGlzLl9lbmVyZ3lOZWVkRXhwIDogMDtcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzLiRHcmFwaGljcztcbiAgICAgICAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA1O1xuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig5MCwgMjU1LCAxNDAsIDI1NSk7XG4gICAgICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgMTgsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiBwcm9ncmVzcywgZmFsc2UpO1xuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fZmlyZS5fZXhwQmFyICYmIHRoaXMuX2ZpcmUuX2V4cEJhci4kUHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2V4cEJhci4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLl9lbmVyZ3lOZWVkRXhwID4gMCA/IHRoaXMuX2VuZXJneUV4cCAvIHRoaXMuX2VuZXJneU5lZWRFeHAgOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Nob3dTYWNyaWZpY2VUaXAodGV4dCkge1xuICAgICAgICBsZXQgY2hhbm5lbCA9IFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpO1xuICAgICAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnNob3dUb2FzdCkge1xuICAgICAgICAgICAgY2hhbm5lbC5zaG93VG9hc3QodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNjLmxvZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wbGF5U2FjcmlmaWNlRmVlZGJhY2soKSB7XG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xuICAgICAgICBVdGlscy52aWJyYXRlKCk7XG5cbiAgICAgICAgbGV0IHdhdmUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VXYXZlXCIpO1xuICAgICAgICB3YXZlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgd2F2ZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgd2F2ZS56SW5kZXggPSAyODY7XG4gICAgICAgIHdhdmUub3BhY2l0eSA9IDIxMDtcbiAgICAgICAgd2F2ZS5zY2FsZSA9IDAuNzI7XG4gICAgICAgIGxldCB3YXZlR3JhcGhpY3MgPSB3YXZlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIHdhdmVHcmFwaGljcy5saW5lV2lkdGggPSA3O1xuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDg4LCA4MiwgMjM1KTtcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxNik7XG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2UoKTtcbiAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjYsIDIuMyksXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjI2KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxuICAgICAgICApKTtcblxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZUdsb3dcIik7XG4gICAgICAgIGdsb3cucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBnbG93LnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICBnbG93LnpJbmRleCA9IDI4NTtcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMDtcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNzIsIDY4LCA3MCk7XG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjApO1xuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEsIDE5MCksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuMjIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjE4KSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuNzgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCl7XG5cbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hcC5fcGF1c2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0O1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlRnJlZUJ1bGxldFJlY292ZXIoZHQpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2hhcmdlQ2Fubm9uKGR0KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTG93SHBWaXN1YWwoZHQpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheWVyU2tpbGxJY29uQ29sbGlzaW9uVGVzdCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoUG9zaXRpb24oZHQpO1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaE1vdmVFZmZlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hCYXJyZWxEaXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hBbmdsZShkdCwgZmFsc2UpO1xuICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9MijotoXnuqflrZDlvLkpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSA9IHRoaXMuX3NraWxsMlRpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsMlRpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSB0aGlzLl9za2lsbDJUaW1lID4gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9Myjml6DmlYzpmLLlvqEpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSA9IHRoaXMuX3NraWxsM1RpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsM1RpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICBcbiAgICAgICAgICAgIC8v5pi+56S66ZOg55SyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICAgICAgICAgIHRoaXMuX2RlZiA9IHRoaXMuX3NraWxsM1RpbWUgPiAwID8gMTAwMDAwMDAgOiAwO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuX3ZpZXdNb2RlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5fZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3ModGhpcy5fZGlyLC0wLjUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xuICAgICAgICAgICAgdGhpcy5zaG9vdGluZyhkdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldFRlc3RVcGdyYWRlQ2hvaWNlcygpIHtcbiAgICAgICAgbGV0IGhwQWRkID0gTWF0aC5tYXgoMjUsIE1hdGgucm91bmQodGhpcy5fbWF4SHAgKiAwLjIyKSk7XG4gICAgICAgIGxldCBhdGtBZGQgPSBNYXRoLm1heCg4LCBNYXRoLnJvdW5kKHRoaXMuX2F0ayAqIDAuMTgpKTtcbiAgICAgICAgbGV0IHNwZWVkQWRkID0gMTg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJocFwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuijheeUsuW8uuWMllwiLFxuICAgICAgICAgICAgICAgIGRlc2M6IFwi55Sf5ZG95LiK6ZmQ5o+Q5Y2H5bm256uL5Yi75Zue5ruhXCIsXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJIUFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBocEFkZCxcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGhwQWRkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMjAsIDI1NSwgMTcwLCAyNTUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhdGtcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLngavlipvlvLrljJZcIixcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuaUu+WHu+WKm+aPkOWNhywg6L6T5Ye65pu06auYXCIsXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJBVEtcIixcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgYXRrQWRkLFxuICAgICAgICAgICAgICAgIGFtb3VudDogYXRrQWRkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigyNTUsIDE4NSwgOTAsIDI1NSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInNwZWVkXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5o6o6L+b5by65YyWXCIsXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnp7vliqjpgJ/luqbmj5DljYcsIOi1sOS9jeabtOeBtea0u1wiLFxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiU1BEXCIsXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIHNwZWVkQWRkICsgXCIlXCIsXG4gICAgICAgICAgICAgICAgYW1vdW50OiBzcGVlZEFkZCxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMTEwLCAyMTAsIDI1NSwgMjU1KSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJib3VuY2VcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLlj43lvLnlrZDlvLlcIixcbiAgICAgICAgICAgICAgICBkZXNjOiBcIueisOWimeWQjuiHquWKqOWPjeW8uTHmrKFcIixcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIuWPjVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCJ4MVwiLFxuICAgICAgICAgICAgICAgIGJvdW5jZUNvdW50OiAxLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcig5MCwgMTgwLCAyNTUsIDI1NSksXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDkwLCAxODAsIDI1NSwgMjEwKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicGVuZXRyYXRlXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi56m/6YCP5a2Q5by5XCIsXG4gICAgICAgICAgICAgICAgZGVzYzogXCLov57nu63nqb/pgI8z5Liq55uu5qCH5ZCO5raI5aSxXCIsXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCLnqb9cIixcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwieDNcIixcbiAgICAgICAgICAgICAgICBwZW5ldHJhdGVDb3VudDogMyxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCA5MiwgOTIsIDI1NSksXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDI1NSwgOTIsIDkyLCAyMTApLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJoZWF2eVwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIumHjeeCruWtkOW8uVwiLFxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Lyk5a6z5o+Q5Y2HNjAlLCDlrZDlvLnmm7TlpKdcIixcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIumHjVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrNjAlXCIsXG4gICAgICAgICAgICAgICAgZGFtYWdlUmF0aW86IDEuNixcbiAgICAgICAgICAgICAgICBzY2FsZTogMS4zNSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCAyMTAsIDkwLCAyNTUpLFxuICAgICAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjYy5jb2xvcigyNTUsIDIxMCwgOTAsIDIxMCksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlKSB7XG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFjaG9pY2UuaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaG9pY2UuaWQgPT0gXCJocFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXhIcCArPSBjaG9pY2UuYW1vdW50O1xuICAgICAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9tYXhIcDtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hvaWNlLmlkID09IFwiYXRrXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0ayArPSBjaG9pY2UuYW1vdW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNob2ljZS5pZCA9PSBcInNwZWVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlICs9IGNob2ljZS5hbW91bnQgLyAxMDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zaG93VXBncmFkZUZsb2F0KGNob2ljZSk7XG4gICAgICAgIHRoaXMuX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKTtcbiAgICB9XG5cbiAgICBhcHBseVRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZShjaG9pY2UpIHtcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIWNob2ljZS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25UeXBlID0gY2hvaWNlLmlkO1xuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEgPSB7XG4gICAgICAgICAgICBpZDogY2hvaWNlLmlkLFxuICAgICAgICAgICAgdGl0bGU6IGNob2ljZS50aXRsZSxcbiAgICAgICAgICAgIHNob3J0TGFiZWw6IGNob2ljZS5zaG9ydExhYmVsLFxuICAgICAgICAgICAgdmFsdWVUZXh0OiBjaG9pY2UudmFsdWVUZXh0LFxuICAgICAgICAgICAgYm91bmNlQ291bnQ6IGNob2ljZS5ib3VuY2VDb3VudCB8fCAwLFxuICAgICAgICAgICAgcGVuZXRyYXRlQ291bnQ6IGNob2ljZS5wZW5ldHJhdGVDb3VudCB8fCAwLFxuICAgICAgICAgICAgZGFtYWdlUmF0aW86IGNob2ljZS5kYW1hZ2VSYXRpbyB8fCAxLFxuICAgICAgICAgICAgc2NhbGU6IGNob2ljZS5zY2FsZSB8fCAxLFxuICAgICAgICAgICAgY29sb3I6IGNob2ljZS5jb2xvcixcbiAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjaG9pY2UuZWZmZWN0Q29sb3IgfHwgY2hvaWNlLmNvbG9yLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3Nob3dCdWxsZXRNdXRhdGlvbk1lZGFsKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xuICAgICAgICB0aGlzLl9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XG4gICAgfVxuXG4gICAgX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKTtcbiAgICAgICAgZGF0YS5jb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5jb2xvcjtcbiAgICAgICAgZGF0YS5lZmZlY3RDb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgX3Nob3dVcGdyYWRlRmxvYXQoY2hvaWNlKSB7XG4gICAgICAgIGlmICghdGhpcy5ub2RlLnBhcmVudCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZsb2F0Tm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVGbG9hdFwiKTtcbiAgICAgICAgZmxvYXROb2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIGZsb2F0Tm9kZS5zZXRQb3NpdGlvbihjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxMTAsIDApKTtcbiAgICAgICAgZmxvYXROb2RlLnpJbmRleCA9IDY1MDA7XG4gICAgICAgIGZsb2F0Tm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgZmxvYXROb2RlLnNjYWxlID0gMC44MjtcblxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQmFkZ2VcIik7XG4gICAgICAgIGJhZGdlLnBhcmVudCA9IGZsb2F0Tm9kZTtcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oLTQ0LCA0KTtcbiAgICAgICAgbGV0IGJhZGdlR3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNob2ljZS5jb2xvcjtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjQpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5saW5lV2lkdGggPSAzO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjQpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGxldCBiYWRnZUxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVCYWRnZUxhYmVsXCIpO1xuICAgICAgICBiYWRnZUxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcbiAgICAgICAgYmFkZ2VMYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNTQsIDMyKTtcbiAgICAgICAgbGV0IGJhZGdlTGFiZWwgPSBiYWRnZUxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBiYWRnZUxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xuICAgICAgICBiYWRnZUxhYmVsLmZvbnRTaXplID0gY2hvaWNlLnNob3J0TGFiZWwubGVuZ3RoID4gMiA/IDE1IDogMTg7XG4gICAgICAgIGJhZGdlTGFiZWwubGluZUhlaWdodCA9IDIwO1xuICAgICAgICBiYWRnZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGJhZGdlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIGxldCB2YWx1ZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVmFsdWVcIik7XG4gICAgICAgIHZhbHVlTm9kZS5wYXJlbnQgPSBmbG9hdE5vZGU7XG4gICAgICAgIHZhbHVlTm9kZS5zZXRQb3NpdGlvbigyMiwgOCk7XG4gICAgICAgIHZhbHVlTm9kZS5jb2xvciA9IGNob2ljZS5jb2xvcjtcbiAgICAgICAgdmFsdWVOb2RlLnNldENvbnRlbnRTaXplKDE3MCwgMzgpO1xuICAgICAgICBsZXQgdmFsdWVMYWJlbCA9IHZhbHVlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB2YWx1ZUxhYmVsLnN0cmluZyA9IGNob2ljZS52YWx1ZVRleHQ7XG4gICAgICAgIHZhbHVlTGFiZWwuZm9udFNpemUgPSAzNDtcbiAgICAgICAgdmFsdWVMYWJlbC5saW5lSGVpZ2h0ID0gMzg7XG4gICAgICAgIHZhbHVlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ7XG4gICAgICAgIHZhbHVlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIGxldCB0aXRsZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVGl0bGVcIik7XG4gICAgICAgIHRpdGxlTm9kZS5wYXJlbnQgPSBmbG9hdE5vZGU7XG4gICAgICAgIHRpdGxlTm9kZS5zZXRQb3NpdGlvbigxNiwgLTI0KTtcbiAgICAgICAgdGl0bGVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcbiAgICAgICAgdGl0bGVOb2RlLnNldENvbnRlbnRTaXplKDIyMCwgMjgpO1xuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IGNob2ljZS50aXRsZTtcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDIwO1xuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAyNDtcbiAgICAgICAgdGl0bGVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcbiAgICAgICAgdGl0bGVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XG5cbiAgICAgICAgZmxvYXROb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDQpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxOClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC41NSwgMCwgNzIpLFxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC41NSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKSB7XG4gICAgICAgIGxldCB3YXZlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZVdhdmVcIik7XG4gICAgICAgIHdhdmUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB3YXZlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICB3YXZlLnpJbmRleCA9IDI4MDtcbiAgICAgICAgd2F2ZS5vcGFjaXR5ID0gMjIwO1xuICAgICAgICB3YXZlLnNjYWxlID0gMC41NTtcbiAgICAgICAgbGV0IHdhdmVHcmFwaGljcyA9IHdhdmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxOCk7XG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2UoKTtcbiAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMywgMy4yKSxcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG5cbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlR2xvd1wiKTtcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgICAgIGdsb3cuekluZGV4ID0gMjc1O1xuICAgICAgICBnbG93Lm9wYWNpdHkgPSAwO1xuICAgICAgICBnbG93LnNjYWxlID0gMC43NTtcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNob2ljZS5jb2xvci5yLCBjaG9pY2UuY29sb3IuZywgY2hvaWNlLmNvbG9yLmIsIDkwKTtcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAyNik7XG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMTIsIDE4MCksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjI4KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xOCksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjE4LCAxLjgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTMwMSk7XG4gICAgICAgIGxldCBwdW5jaCA9IGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuMDgpLFxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDEpXG4gICAgICAgICk7XG4gICAgICAgIHB1bmNoLnNldFRhZyg5MzAxKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihwdW5jaCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Nob3dCdWxsZXRNdXRhdGlvbk1lZGFsKGNob2ljZSkge1xuICAgICAgICBpZiAoIXRoaXMubm9kZS5wYXJlbnQgfHwgIWNjLmlzVmFsaWQodGhpcy5ub2RlLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZWRhbCA9IG5ldyBjYy5Ob2RlKFwiX2J1bGxldE11dGF0aW9uTWVkYWxcIik7XG4gICAgICAgIG1lZGFsLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIG1lZGFsLnNldFBvc2l0aW9uKGNjLnYzKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSArIDExMiwgMCkpO1xuICAgICAgICBtZWRhbC56SW5kZXggPSA2NjAwO1xuICAgICAgICBtZWRhbC5vcGFjaXR5ID0gMDtcbiAgICAgICAgbWVkYWwuc2NhbGUgPSAwLjg4O1xuXG4gICAgICAgIGxldCBiYWRnZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsQmFkZ2VcIik7XG4gICAgICAgIGJhZGdlLnBhcmVudCA9IG1lZGFsO1xuICAgICAgICBsZXQgYmFkZ2VHcmFwaGljcyA9IGJhZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbENvbG9yID0gY2hvaWNlLmNvbG9yO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlKCk7XG5cbiAgICAgICAgbGV0IGJhZGdlTGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbWVkYWxCYWRnZUxhYmVsXCIpO1xuICAgICAgICBiYWRnZUxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcbiAgICAgICAgYmFkZ2VMYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNTIsIDMyKTtcbiAgICAgICAgbGV0IGJhZGdlTGFiZWwgPSBiYWRnZUxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBiYWRnZUxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xuICAgICAgICBiYWRnZUxhYmVsLmZvbnRTaXplID0gMjI7XG4gICAgICAgIGJhZGdlTGFiZWwubGluZUhlaWdodCA9IDI2O1xuICAgICAgICBiYWRnZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGJhZGdlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIGxldCB0aXRsZU5vZGUgPSBuZXcgY2MuTm9kZShcIl9tZWRhbFRpdGxlXCIpO1xuICAgICAgICB0aXRsZU5vZGUucGFyZW50ID0gbWVkYWw7XG4gICAgICAgIHRpdGxlTm9kZS5zZXRQb3NpdGlvbigwLCAtNDgpO1xuICAgICAgICB0aXRsZU5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMzUpO1xuICAgICAgICB0aXRsZU5vZGUuc2V0Q29udGVudFNpemUoMjIwLCAzMik7XG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gdGl0bGVOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnRpdGxlO1xuICAgICAgICB0aXRsZUxhYmVsLmZvbnRTaXplID0gMjI7XG4gICAgICAgIHRpdGxlTGFiZWwubGluZUhlaWdodCA9IDI2O1xuICAgICAgICB0aXRsZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIHRpdGxlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIG1lZGFsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDIpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxNilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMS44OCksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMzUpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjM1LCAwLCAzNClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hCdWxsZXRNdXRhdGlvbkVmZmVjdCgpIHtcbiAgICAgICAgdGhpcy5faGlkZUJ1bGxldE11dGF0aW9uRWZmZWN0KCk7XG4gICAgICAgIGlmICghdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcbiAgICAgICAgbGV0IGVmZmVjdCA9IG5ldyBjYy5Ob2RlKFwiX2J1bGxldE11dGF0aW9uTXV6emxlRWZmZWN0XCIpO1xuICAgICAgICBlZmZlY3QucGFyZW50ID0gYmFycmVsTm9kZTtcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oLTIpKSk7XG4gICAgICAgIGVmZmVjdC56SW5kZXggPSA5NjtcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gZWZmZWN0O1xuXG4gICAgICAgIGxldCBvdXRlciA9IG5ldyBjYy5Ob2RlKFwiX211enpsZU91dGVyXCIpO1xuICAgICAgICBvdXRlci5wYXJlbnQgPSBlZmZlY3Q7XG4gICAgICAgIGxldCBvdXRlckdyYXBoaWNzID0gb3V0ZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcih0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3IuciwgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yLmcsIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvci5iLCA5MCk7XG4gICAgICAgIG91dGVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE2KTtcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5maWxsKCk7XG5cbiAgICAgICAgbGV0IGlubmVyID0gbmV3IGNjLk5vZGUoXCJfbXV6emxlSW5uZXJcIik7XG4gICAgICAgIGlubmVyLnBhcmVudCA9IGVmZmVjdDtcbiAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBpbm5lci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGxDb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcbiAgICAgICAgaW5uZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgOCk7XG4gICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbCgpO1xuXG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yMiwgMS4yMiksXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMjIsIDIyMClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjIsIDAuOSksXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMjIsIDE1MClcbiAgICAgICAgICAgIClcbiAgICAgICAgKSkpO1xuICAgIH1cblxuICAgIF9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICBfcmVmcmVzaE1vdmVFZmZlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW92ZUVmZmVjdElkIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IE11c2ljTWFuYWdlci5wbGF5TG9vcEVmZmVjdChcInRhbmtNb3ZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3N0b3BNb3ZlRWZmZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fbW92ZUVmZmVjdElkID49IDApIHtcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5zdG9wRWZmZWN0KHRoaXMuX21vdmVFZmZlY3RJZCk7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlRWZmZWN0SWQgPSAtMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDngq7nrqHlj6rot5/pmo/lj7Pkvqflj5HlsITmkYfmnYbmlrnlkJFcbiAgICBfcmVmcmVzaEJhcnJlbERpcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Nob290SW5wdXREaXIgJiYgdGhpcy5fc2hvb3RJbnB1dERpci5tYWdTcXIoKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IHRoaXMuX3Nob290SW5wdXREaXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDlj7PkvqfmjInpkq7miqzotbfml7bnm7TmjqXlj5HlsITkuIDlj5EsIOS4jei1sOaMieS9j+aMgee7reWPkeWwhOmAu+i+kVxuICAgIGZpcmVPbmNlKCkge1xuICAgICAgICBsZXQgdHlwZSA9ICh0aGlzLl92aWV3TW9kZSB8fCB0aGlzLl9za2lsbDJUaW1lID4gMCkgPyB0aGlzLl9jb25maWcuQlR5cGUyIDogdGhpcy5fY29uZmlnLkJUeXBlMTtcbiAgICAgICAgbGV0IGF0dGFja1JhZGl1cyA9IHRoaXMuX3ZpZXdNb2RlID8gdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAqIDAuOCA6dGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cztcbiAgICAgICAgbGV0IG11dGF0aW9uRGF0YSA9IHRoaXMuX3ZpZXdNb2RlID8gbnVsbCA6IHRoaXMuX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKTtcbiAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KHR5cGUsdGhpcy5ub2RlLnBvc2l0aW9uLHRoaXMuX2JhcnJlbERpcix0aGlzLl9maXJlLl9seUJhcnJlbC5oZWlnaHQrMjAsYXR0YWNrUmFkaXVzLHRoaXMuX2F0ayx0aGlzLl9jYW1wLHRoaXMubm9kZS5wYXJlbnQsdGhpcy5fbWFwLDgsbXV0YXRpb25EYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuaXNTaG9vdEVmZmVjdFRlc3RNb2RlICYmIHRoaXMuX21hcC5pc1Nob290RWZmZWN0VGVzdE1vZGUoKSkge1xuICAgICAgICAgICAgdGhpcy5fcGxheVNob290RmVlZGJhY2sodHlwZSwgbXV0YXRpb25EYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlICYmIHRoaXMuX21hcC5lbmVteUNvdW50KCkgPiAwKSB7XG4gICAgICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJzaG9vdFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wbGF5U2hvb3RGZWVkYmFjayhidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpIHtcbiAgICAgICAgdGhpcy5fcGxheUJhcnJlbFJlY29pbCgpO1xuICAgICAgICB0aGlzLl9wbGF5TXV6emxlRmxhc2goYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xuICAgICAgICB0aGlzLl9wbGF5U2hvb3RTaGFrZSgpO1xuICAgIH1cblxuICAgIF9wbGF5QmFycmVsUmVjb2lsKCkge1xuICAgICAgICBsZXQgcmVjb2lsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl9seUJhcnJlbCk7XG4gICAgICAgIGlmICghcmVjb2lsTm9kZSB8fCAhY2MuaXNWYWxpZChyZWNvaWxOb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gcmVjb2lsTm9kZS5wYXJlbnQ7XG4gICAgICAgIGlmICghcGFyZW50Tm9kZSB8fCAhY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJhc2VQb3MgPSByZWNvaWxOb2RlW1wiX3Nob290QmFzZVBvc1wiXTtcbiAgICAgICAgaWYgKCFiYXNlUG9zKSB7XG4gICAgICAgICAgICBiYXNlUG9zID0gY2MudjMocmVjb2lsTm9kZS5wb3NpdGlvbik7XG4gICAgICAgICAgICByZWNvaWxOb2RlW1wiX3Nob290QmFzZVBvc1wiXSA9IGNjLnYzKGJhc2VQb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJhc2VXb3JsZFBvcyA9IHBhcmVudE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGJhc2VQb3MpO1xuICAgICAgICBsZXQgcmVjb2lsRGlyID0gdGhpcy5fYmFycmVsRGlyICYmIHRoaXMuX2JhcnJlbERpci5tYWdTcXIoKSA+IDAgPyB0aGlzLl9iYXJyZWxEaXIubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcbiAgICAgICAgbGV0IHJlY29pbFdvcmxkUG9zID0gY2MudjIoYmFzZVdvcmxkUG9zKS5zdWIocmVjb2lsRGlyLm11bChTSE9PVF9SRUNPSUxfRElTVEFOQ0UpKTtcbiAgICAgICAgbGV0IHJlY29pbExvY2FsUG9zID0gcGFyZW50Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihyZWNvaWxXb3JsZFBvcyk7XG5cbiAgICAgICAgcmVjb2lsTm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAwNCk7XG4gICAgICAgIHJlY29pbE5vZGUuc2V0UG9zaXRpb24oYmFzZVBvcyk7XG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLm1vdmVUbyhTSE9PVF9SRUNPSUxfT1VUX1RJTUUsIHJlY29pbExvY2FsUG9zLngsIHJlY29pbExvY2FsUG9zLnkpLFxuICAgICAgICAgICAgY2MubW92ZVRvKFNIT09UX1JFQ09JTF9SRVRVUk5fVElNRSwgYmFzZVBvcy54LCBiYXNlUG9zLnkpXG4gICAgICAgICk7XG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwNCk7XG4gICAgICAgIHJlY29pbE5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgfVxuXG4gICAgX3BsYXlNdXp6bGVGbGFzaChidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpIHtcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XG4gICAgICAgIGlmICghYmFycmVsTm9kZSB8fCAhY2MuaXNWYWxpZChiYXJyZWxOb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVmZmVjdENvbG9yID0gdGhpcy5fZ2V0U2hvb3RFZmZlY3RDb2xvcihidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xuICAgICAgICBsZXQgZmxhc2ggPSBuZXcgY2MuTm9kZShcIl9zaG9vdE11enpsZUZsYXNoXCIpO1xuICAgICAgICBmbGFzaC5wYXJlbnQgPSBiYXJyZWxOb2RlO1xuICAgICAgICBmbGFzaC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLl9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKDYpKSk7XG4gICAgICAgIGZsYXNoLnpJbmRleCA9IDExNTtcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDA7XG4gICAgICAgIGZsYXNoLnNjYWxlWCA9IDAuMjg7XG4gICAgICAgIGZsYXNoLnNjYWxlWSA9IDAuNzI7XG5cbiAgICAgICAgbGV0IGNvbmUgPSBuZXcgY2MuTm9kZShcIl9mbGFzaENvbmVcIik7XG4gICAgICAgIGNvbmUucGFyZW50ID0gZmxhc2g7XG4gICAgICAgIGxldCBjb25lR3JhcGhpY3MgPSBjb25lLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGNvbmVHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihlZmZlY3RDb2xvci5yLCBlZmZlY3RDb2xvci5nLCBlZmZlY3RDb2xvci5iLCAyMTApO1xuICAgICAgICBjb25lR3JhcGhpY3MubW92ZVRvKDAsIDM2KTtcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygtMTcsIDgpO1xuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKC03LCAtOCk7XG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oMCwgNCk7XG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oNywgLTgpO1xuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKDE3LCA4KTtcbiAgICAgICAgY29uZUdyYXBoaWNzLmNsb3NlKCk7XG4gICAgICAgIGNvbmVHcmFwaGljcy5maWxsKCk7XG5cbiAgICAgICAgbGV0IGNvcmUgPSBuZXcgY2MuTm9kZShcIl9mbGFzaENvcmVcIik7XG4gICAgICAgIGNvcmUucGFyZW50ID0gZmxhc2g7XG4gICAgICAgIGxldCBjb3JlR3JhcGhpY3MgPSBjb3JlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGNvcmVHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1MCwgMjIwLCAyMzUpO1xuICAgICAgICBjb3JlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDExKTtcbiAgICAgICAgY29yZUdyYXBoaWNzLmZpbGwoKTtcblxuICAgICAgICBmbGFzaC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oU0hPT1RfRkxBU0hfRkFERV9JTiwgMjU1KSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDEuMSwgMS4xOClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KFNIT09UX0ZMQVNIX0ZBREVfT1VUKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKFNIT09UX0ZMQVNIX0ZBREVfT1VULCAwLjU1LCAxLjY1KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBfcGxheVNob290R2xvdyhidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpIHtcbiAgICAgICAgbGV0IGVmZmVjdENvbG9yID0gdGhpcy5fZ2V0U2hvb3RFZmZlY3RDb2xvcihidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xuXG4gICAgICAgIGlmICghdGhpcy5ub2RlLnBhcmVudCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG11enpsZUdsb3cgPSBuZXcgY2MuTm9kZShcIl9zaG9vdE11enpsZUdsb3dcIik7XG4gICAgICAgIG11enpsZUdsb3cucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcbiAgICAgICAgbXV6emxlR2xvdy5zZXRQb3NpdGlvbihjYy52Myh0aGlzLl9nZXRCYXJyZWxNdXp6bGVQb3NpdGlvbigwKSkpO1xuICAgICAgICBtdXp6bGVHbG93LnpJbmRleCA9IDI4NTtcbiAgICAgICAgbXV6emxlR2xvdy5vcGFjaXR5ID0gMDtcbiAgICAgICAgbXV6emxlR2xvdy5zY2FsZSA9IDAuNTtcbiAgICAgICAgbGV0IG11enpsZUdsb3dHcmFwaGljcyA9IG11enpsZUdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgbXV6emxlR2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDk1KTtcbiAgICAgICAgbXV6emxlR2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XG4gICAgICAgIG11enpsZUdsb3dHcmFwaGljcy5maWxsKCk7XG4gICAgICAgIG11enpsZUdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDMsIDIxMCksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjAzLCAxLjA1KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMS42NSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG5cbiAgICAgICAgbGV0IGJvZHlHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RCb2R5R2xvd1wiKTtcbiAgICAgICAgYm9keUdsb3cucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBib2R5R2xvdy5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgYm9keUdsb3cuekluZGV4ID0gMjYwO1xuICAgICAgICBib2R5R2xvdy5vcGFjaXR5ID0gMDtcbiAgICAgICAgYm9keUdsb3cuc2NhbGUgPSAwLjc1O1xuICAgICAgICBsZXQgYm9keUdsb3dHcmFwaGljcyA9IGJvZHlHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGJvZHlHbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoZWZmZWN0Q29sb3IuciwgZWZmZWN0Q29sb3IuZywgZWZmZWN0Q29sb3IuYiwgNzApO1xuICAgICAgICBib2R5R2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAyOCk7XG4gICAgICAgIGJvZHlHbG93R3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBib2R5R2xvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4wNCwgMTUwKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDQsIDEuMDgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEyKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMzgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIF9wbGF5U2hvb3RTaGFrZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XG4gICAgICAgIGlmIChtdXRhdGlvbkRhdGEgJiYgbXV0YXRpb25EYXRhLmVmZmVjdENvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbXV0YXRpb25EYXRhLmVmZmVjdENvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWxsZXRUeXBlID09IHRoaXMuX2NvbmZpZy5CVHlwZTIpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5jb2xvcigxMjAsIDIyNSwgMjU1LCAyMzApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYy5jb2xvcigyNTUsIDIwNSwgOTUsIDIzMCk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUNoYXJnZUNhbm5vbihkdCkge1xuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIC09IGR0O1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvb2xkb3duUHJvZ3Jlc3MgPSAxIC0gdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIC8gdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd247XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNvb2xkb3duXCIsIHtwcm9ncmVzczogY29vbGRvd25Qcm9ncmVzc30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgKz0gZHQ7XG4gICAgICAgIGxldCBuZWVkVGltZSA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIlRpbWVcIiwgNSk7XG4gICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgLyBuZWVkVGltZTtcbiAgICAgICAgaWYgKHByb2dyZXNzID4gMSkge1xuICAgICAgICAgICAgcHJvZ3Jlc3MgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IHByb2dyZXNzfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID09IGZhbHNlICYmIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPj0gbmVlZFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dDaGFyZ2VFZmZlY3QoKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZmlyZUNoYXJnZUNhbm5vbigpIHtcbiAgICAgICAgbGV0IGF0dGFja1JhZGl1cyA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkF0dGFja1JhZGl1c1wiLCB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICogMS40KTtcbiAgICAgICAgbGV0IGF0a1JhdGlvID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQXRrUmF0aW9cIiwgMyk7XG4gICAgICAgIGxldCBzcGVlZCA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIlNwZWVkXCIsIDEyKTtcbiAgICAgICAgbGV0IHdpcGVMZW4gPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZSgxMik7XG4gICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeChDSEFSR0VfQ0FOTk9OX0JVTExFVF9UWVBFLCB0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX2JhcnJlbERpciwgd2lwZUxlbiwgYXR0YWNrUmFkaXVzLCB0aGlzLl9hdGsgKiBhdGtSYXRpbywgdGhpcy5fY2FtcCwgdGhpcy5ub2RlLnBhcmVudCwgdGhpcy5fbWFwLCBzcGVlZCk7XG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlU2hvb3RcIik7XG4gICAgICAgIHRoaXMuX3NoYWtlU2NyZWVuKCk7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQ29vbGRvd25cIiwgOCk7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xuICAgIH1cblxuICAgIF9nZXRDaGFyZ2VDb25maWcoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgbGV0IGZ1bGxLZXkgPSBcIkNoYXJnZVwiICsga2V5O1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWdbZnVsbEtleV0gOiBudWxsO1xuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xuICAgIH1cblxuICAgIF9yZXNldENoYXJnZUNhbm5vbigpIHtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hpZGVDaGFyZ2VFZmZlY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8PSAwKSB7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwge30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Nob3dDaGFyZ2VFZmZlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlTXV6emxlRWZmZWN0XCIpO1xuICAgICAgICBlZmZlY3QucGFyZW50ID0gYmFycmVsTm9kZTtcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oNCkpKTtcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDEwMDtcblxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBlZmZlY3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA0MCwgMjAsIDE4MCk7XG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxOCk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcblxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjUsIDEuMzUpLFxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAwLjkpXG4gICAgICAgICkpKTtcbiAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSA9IGVmZmVjdDtcbiAgICB9XG5cbiAgICBfaGlkZUNoYXJnZUVmZmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgX3NoYWtlU2NyZWVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLm5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXBOb2RlID0gdGhpcy5fbWFwLm5vZGU7XG4gICAgICAgIGxldCBvcmlnaW4gPSBtYXBOb2RlLnBvc2l0aW9uO1xuICAgICAgICBtYXBOb2RlLnN0b3BBY3Rpb25CeVRhZyg5MDAxKTtcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDApLFxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAzKSxcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCAwLCAtMyksXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG1hcE5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwMSk7XG4gICAgICAgIG1hcE5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcbiAgICB9XG5cbiAgICBfZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbihleHRyYU9mZnNldCA9IDApIHtcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XG4gICAgICAgIGxldCBhbmNob3JZID0gYmFycmVsTm9kZS5hbmNob3JZID09IG51bGwgPyAwLjUgOiBiYXJyZWxOb2RlLmFuY2hvclk7XG4gICAgICAgIHJldHVybiBjYy52MigwLCBiYXJyZWxOb2RlLmhlaWdodCAqICgxIC0gYW5jaG9yWSkgKyBleHRyYU9mZnNldCk7XG4gICAgfVxuXG4gICAgX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKGV4dHJhT2Zmc2V0ID0gMCkge1xuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcbiAgICAgICAgbGV0IGxvY2FsUG9zID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbihleHRyYU9mZnNldCk7XG4gICAgICAgIGxldCB3b3JsZFBvcyA9IGJhcnJlbE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGxvY2FsUG9zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xuICAgIH1cblxuICAgIF9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZShleHRyYU9mZnNldCA9IDApIHtcbiAgICAgICAgbGV0IG11enpsZVBvcyA9IHRoaXMuX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKGV4dHJhT2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIG11enpsZVBvcy5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcbiAgICB9XG5cbiAgICBfdHJ5RmlyZU9uY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA8IFBMQVlFUl9TSE9PVF9JTlRFUlZBTCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8PSAwICYmIHRoaXMuX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0xvd0hwU2hvb3RUaXAoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcbiAgICAgICAgdGhpcy5maXJlT25jZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQtLTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb25zdW1lSHBGb3JQYWlkQnVsbGV0KCk7XG4gICAgfVxuXG4gICAgX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocCA8PSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XG4gICAgfVxuXG4gICAgX3Nob3dMb3dIcFNob290VGlwKCkge1xuICAgICAgICBsZXQgY2hhbm5lbCA9IFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpO1xuICAgICAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnNob3dUb2FzdCkge1xuICAgICAgICAgICAgY2hhbm5lbC5zaG93VG9hc3QoXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjYy5sb2coXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NvbnN1bWVIcEZvclBhaWRCdWxsZXQoKSB7XG4gICAgICAgIHRoaXMuX2hwIC09IFBMQVlFUl9QQUlEX1NIT1RfSFBfQ09TVDtcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5faHAgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/njqnlrrblj5flh7vkuI3po5jkvKTlrrPmlbDlrZcsIOeUqOWMuuWIq+S6juaVjOS6uueahOiTneiJsumXquWFieihqOeOsFxuICAgIGJlSGl0KGRhbWFnZSl7XG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSAtIHRoaXMuX2RlZjtcbiAgICAgICAgaWYgKGRhbWFnZSA8IDApIHtcbiAgICAgICAgICAgIGRhbWFnZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ocCAtPSBkYW1hZ2U7XG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKTtcbiAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcblxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2hvd1BsYXllckhpdEVmZmVjdCgpIHtcbiAgICAgICAgbGV0IGVmZmVjdCA9IG5ldyBjYy5Ob2RlKFwiX3BsYXllckhpdEVmZmVjdFwiKTtcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICBlZmZlY3QuekluZGV4ID0gMzAwO1xuXG4gICAgICAgIGxldCBncmFwaGljcyA9IGVmZmVjdC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA4O1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDgwLCAyMTAsIDI1NSwgMjMwKTtcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE2KTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDcwLCAxNzAsIDI1NSwgNTUpO1xuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTApO1xuICAgICAgICBncmFwaGljcy5maWxsKCk7XG5cbiAgICAgICAgZWZmZWN0Lm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIGVmZmVjdC5zY2FsZSA9IDAuNjU7XG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuMjUpLFxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjE4LCA2MClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMSksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUxvd0hwUGxheWVyRmVlZGJhY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5HYW1lIHx8ICF0aGlzLmlzTG93SHAoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3N0YXJ0TG93SHBTY3JlZW5FZmZlY3QoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRMb3dIcEhlYXJ0YmVhdFNvdW5kKCk7XG4gICAgfVxuXG4gICAgX3N0YXJ0TG93SHBIZWFydGJlYXRTb3VuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IE11c2ljTWFuYWdlci5wbGF5TG9vcEVmZmVjdChcImhlYXJ0YmVhdFwiKTtcbiAgICB9XG5cbiAgICBfc3RvcExvd0hwSGVhcnRiZWF0U291bmQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID49IDApIHtcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5zdG9wRWZmZWN0KHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQpO1xuICAgICAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3N0YXJ0TG93SHBTY3JlZW5FZmZlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVmZmVjdFJvb3QgPSBuZXcgY2MuTm9kZShcIl9sb3dIcFNjcmVlbkVmZmVjdFwiKTtcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLm5vZGUgJiYgdGhpcy5fbWFwLm5vZGUucGFyZW50ID8gdGhpcy5fbWFwLm5vZGUucGFyZW50IDogdGhpcy5ub2RlLnBhcmVudDtcbiAgICAgICAgZWZmZWN0Um9vdC5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICBlZmZlY3RSb290LnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICBlZmZlY3RSb290LnpJbmRleCA9IDE2MDA7XG4gICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ID0gZWZmZWN0Um9vdDtcblxuICAgICAgICBsZXQgYm9yZGVyTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xvd0hwQm9yZGVyXCIpO1xuICAgICAgICBib3JkZXJOb2RlLnBhcmVudCA9IGVmZmVjdFJvb3Q7XG4gICAgICAgIGJvcmRlck5vZGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgbGV0IGNyZWF0ZUVkZ2UgPSBmdW5jdGlvbihuYW1lLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgZWRnZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xuICAgICAgICAgICAgZWRnZS5wYXJlbnQgPSBib3JkZXJOb2RlO1xuICAgICAgICAgICAgZWRnZS5zZXRQb3NpdGlvbih4LCB5KTtcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IGVkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNjAsIDYwLCAyNTUpO1xuICAgICAgICAgICAgZ3JhcGhpY3MucmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XG4gICAgICAgICAgICByZXR1cm4gZWRnZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjcmVhdGVFZGdlKFwiX3RvcEVkZ2VcIiwgMCwgMzUxLCAxMjgwLCAxOCk7XG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfYm90dG9tRWRnZVwiLCAwLCAtMzUxLCAxMjgwLCAxOCk7XG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfbGVmdEVkZ2VcIiwgLTYzMSwgMCwgMTgsIDcyMCk7XG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfcmlnaHRFZGdlXCIsIDYzMSwgMCwgMTgsIDcyMCk7XG5cbiAgICAgICAgbGV0IGlkbGVUaW1lID0gTWF0aC5tYXgoMCwgTE9XX0hQX1NDUkVFTl9GTEFTSF9MT09QIC0gTE9XX0hQX1NDUkVFTl9GTEFTSF9JTiAtIExPV19IUF9TQ1JFRU5fRkxBU0hfT1VUKTtcbiAgICAgICAgYm9yZGVyTm9kZS5ydW5BY3Rpb24oXG4gICAgICAgICAgICBjYy5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oTE9XX0hQX1NDUkVFTl9GTEFTSF9JTiwgMjEwKSxcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKExPV19IUF9TQ1JFRU5fRkxBU0hfT1VULCAwKSxcbiAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGlkbGVUaW1lKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBfZGVzdHJveUxvd0hwU2NyZWVuRWZmZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCA9IG51bGw7XG4gICAgfVxuXG4gICAgX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCkge1xuICAgICAgICB0aGlzLl9zdG9wTG93SHBIZWFydGJlYXRTb3VuZCgpO1xuICAgICAgICB0aGlzLl9kZXN0cm95TG93SHBTY3JlZW5FZmZlY3QoKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlRnJlZUJ1bGxldFJlY292ZXIoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLl9zdG9wRmlyZVRpbWUgPCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgKz0gZHQ7XG4gICAgICAgIHdoaWxlICh0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUxcbiAgICAgICAgICAgICYmIHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSAtPSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTDtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcbiAgICB9XG5cbiAgICBfcmVmcmVzaEZyZWVCdWxsZXRCYXIoKSB7XG4gICAgICAgIGxldCBidWxsZXRCYXJzID0gW1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5femlkYW5iYXIxLFxuICAgICAgICAgICAgdGhpcy5fZmlyZS5femlkYW5iYXIyLFxuICAgICAgICAgICAgdGhpcy5fZmlyZS5femlkYW5iYXIzLFxuICAgICAgICBdO1xuICAgICAgICBsZXQgcmVjb3ZlclByb2dyZXNzID0gMDtcblxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50IDwgUExBWUVSX0ZSRUVfQlVMTEVUX01BWFxuICAgICAgICAgICAgJiYgdGhpcy5fc3RvcEZpcmVUaW1lID49IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0RFTEFZKSB7XG4gICAgICAgICAgICByZWNvdmVyUHJvZ3Jlc3MgPSB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgLyBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTDtcbiAgICAgICAgICAgIGlmIChyZWNvdmVyUHJvZ3Jlc3MgPiAxKSB7XG4gICAgICAgICAgICAgICAgcmVjb3ZlclByb2dyZXNzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJ1bGxldEJhcnMuZm9yRWFjaCgoYmFyTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICghYmFyTm9kZSB8fCAhYmFyTm9kZS4kUHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuX2ZyZWVCdWxsZXRDb3VudCkge1xuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09IHRoaXMuX2ZyZWVCdWxsZXRDb3VudCAmJiByZWNvdmVyUHJvZ3Jlc3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgYmFyTm9kZS4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSByZWNvdmVyUHJvZ3Jlc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/lsITlh7tcbiAgICBzaG9vdGluZyhkdCl7XG4gICAgICAgIGxldCBqdWRnZUNEID0gdGhpcy5fc2tpbGwyVGltZSA+IDAgPyB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWUvNCA6IHRoaXMuX2NvbmZpZy5CdWxsZXRDb2RlVGltZTtcblxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldENvZGVUaW1lID49IGp1ZGdlQ0QpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcblxuICAgICAgICAgICAgdGhpcy5maXJlT25jZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8v5omn6KGM5q275LqhXG4gICAgZG9EZWF0aCgpe1xuICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xuICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICBzdXBlci5kb0RlYXRoKCk7XG4gICAgICAgIFxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInBsYXllci1kZWF0aFwiLHt9KTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTsgXG4gICAgICAgIC8vIOeIhueCuOaViOaenFxuICAgICAgICAvLyDmmL7npLrnu5PmnZ/nlYzpnaJcbiAgICB9XG5cbiAgICBkZWJ1Z1NldExvd0hwKCkge1xuICAgICAgICBsZXQgaHAgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHRoaXMuX21heEhwICogMC4xMikpO1xuICAgICAgICBpZiAoaHAgPj0gdGhpcy5fbWF4SHApIHtcbiAgICAgICAgICAgIGhwID0gTWF0aC5tYXgoMSwgdGhpcy5fbWF4SHAgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xuICAgIH1cblxuICAgIHNldEluR2FtZSgpe1xuICAgICAgICB0aGlzLl9pbkdhbWUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9maXJlLl9saWZlYmFyLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8v6I635Y+W56Kw5pKe5qGGXG4gICAgZ2V0UGxheWVyQm91bmRpbmdCb3goKXtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmdldFdvcmxkQm91bmRpbmdCb3godGhpcy5fY3VycmVudEJnKTtcbiAgICB9XG5cbiAgICBzZXRWaWV3TW9kZSgpe1xuICAgICAgICB0aGlzLl92aWV3TW9kZSA9IHRydWU7XG4gICAgfVxuXG59XG4iXX0=