
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
var OIL_SHELL_BULLET_TYPE = 100;
var OIL_SHELL_MAX_COUNT = 1;
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
        _this._oilShellCount = 0;
        _this._bulletMutationType = "";
        _this._bulletMutationData = null;
        _this._bulletMutationEffectNode = null;
        _this._moveEffectId = -1;
        _this._lowHpHeartbeatEffectId = -1;
        _this._lowHpScreenEffect = null;
        _this._shootInputDir = cc.v2(1, 0); //射击摇杆目标方向
        _this._frameInput = null; //网络帧输入(多人)
        _this._multiplayerMode = false; //多人模式(禁用本地摇杆)
        _this._energyLevel = 1; //局内能量等级
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
        this._oilShellCount = 0;
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
        yyp.eventCenter.on('oil-shell-trigger', this._doOilShellTrigger, this); //焦油弹发射
        yyp.eventCenter.on('trigger-sacrifice', this._doSacrifice, this); //献祭按钮
        yyp.eventCenter.on('trigger-cover-action', this._doCoverAction, this); //掩体吸附/分离
        yyp.eventCenter.on('trigger-skill', this._doSkill, this); //触发技能
    };
    //销毁事件
    Player.prototype._destroyEvent = function () {
        yyp.eventCenter.off('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.off('joy-stick-shoot', this._doShootJoyStick, this); //射击摇杆事件
        yyp.eventCenter.off('charge-cannon-press', this._doChargeCannonPress, this); //蓄力炮按下
        yyp.eventCenter.off('charge-cannon-release', this._doChargeCannonRelease, this); //蓄力炮松开
        yyp.eventCenter.off('oil-shell-trigger', this._doOilShellTrigger, this); //焦油弹发射
        yyp.eventCenter.off('trigger-sacrifice', this._doSacrifice, this); //献祭按钮
        yyp.eventCenter.off('trigger-cover-action', this._doCoverAction, this); //掩体吸附/分离
        yyp.eventCenter.off('trigger-skill', this._doSkill, this); //触发技能
    };
    //摇杆事件
    Player.prototype._doJoyStick = function (event) {
        if (this._multiplayerMode)
            return;
        if (this._inGame) {
            if (event.dir && event.dir.magSqr() > 0) {
                this._moveInputDir = event.dir; //方向
            }
            this._moveInputRatio = event.ratio; //速率
        }
    };
    //射击摇杆事件
    Player.prototype._doShootJoyStick = function (event) {
        if (this._multiplayerMode)
            return;
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
    //网络帧输入(多人模式)
    Player.prototype.setFrameInput = function (inputs) {
        this._frameInput = inputs;
        var dir = cc.v2(0, 0);
        if (inputs.up)
            dir.y += 1;
        if (inputs.down)
            dir.y -= 1;
        if (inputs.left)
            dir.x -= 1;
        if (inputs.right)
            dir.x += 1;
        if (dir.magSqr() > 0) {
            this._moveInputDir = dir.normalize();
            this._moveInputRatio = 1;
            this._barrelDir = this._moveInputDir;
        }
        else {
            this._moveInputRatio = 0;
        }
        if (inputs.fire) {
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
    Player.prototype._doOilShellTrigger = function () {
        if (this._inGame == false) {
            return;
        }
        if (this._oilShellCount <= 0) {
            this._refreshSkillButtonMode();
            return;
        }
        this._fireOilShell();
    };
    Player.prototype._doCoverAction = function () {
        if (this._inGame == false || !this._map || !this._map.tryToggleCoverTestAttachment) {
            return;
        }
        this._map.tryToggleCoverTestAttachment(this);
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
            else if (skillId == 4) {
                this._gainOilShell();
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
        //多人模式：在setFrameInput显式调用前拒绝一切移动
        if (this._multiplayerMode) {
            if (this._frameInput === null)
                return;
            if (!this._frameInput.up && !this._frameInput.down && !this._frameInput.left && !this._frameInput.right) {
                this._moveInputRatio = 0;
                this._currentSpeed = 0;
            }
        }
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
        var terrainFactor = this._map && this._map.getTerrainSpeedFactor
            ? this._map.getTerrainSpeedFactor(this.node.position, this._radius)
            : 1;
        var maxSpeed = this._getConfigValue("Speed", 0) * this._moveSpeedScale * terrainFactor;
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
            //多人模式：未有帧输入前，完全不处理任何逻辑
            if (this._multiplayerMode && this._frameInput === null) {
                this._bulletCodeTime += dt; // 仍需累计冷却避免首帧就能连射
                return;
            }
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
            if (this._map && this._map.syncAttachedCoverTestCover) {
                this._map.syncAttachedCoverTestCover(this);
            }
            if (this._map && this._map.refreshCoverTestButton) {
                this._map.refreshCoverTestButton(this);
            }
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
    Player.prototype._showOilPickupFeedback = function () {
        var badge = new cc.Node("_oilPickupReady");
        badge.parent = this.node;
        badge.setPosition(0, this._radius + 48);
        badge.opacity = 0;
        badge.scale = 0.7;
        badge.zIndex = 320;
        var graphics = badge.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(78, 52, 26, 235);
        graphics.roundRect(-68, -18, 136, 36, 12);
        graphics.fill();
        graphics.lineWidth = 3;
        graphics.strokeColor = cc.color(255, 205, 122, 235);
        graphics.roundRect(-68, -18, 136, 36, 12);
        graphics.stroke();
        var labelNode = new cc.Node("_oilPickupReadyLabel");
        labelNode.parent = badge;
        labelNode.setContentSize(124, 28);
        labelNode.color = cc.color(255, 232, 172, 255);
        var label = labelNode.addComponent(cc.Label);
        label.string = "焦油弹就绪";
        label.fontSize = 20;
        label.lineHeight = 24;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        badge.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.12), cc.scaleTo(0.12, 1.02), cc.moveBy(0.12, 0, 12)), cc.delayTime(0.6), cc.spawn(cc.fadeOut(0.2), cc.moveBy(0.2, 0, 16)), cc.removeSelf()));
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
        if (bulletType == OIL_SHELL_BULLET_TYPE) {
            return cc.color(130, 92, 52, 220);
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
    Player.prototype._gainOilShell = function () {
        if (this._chargeCannonCharging) {
            this._resetChargeCannon();
        }
        this._oilShellCount = Math.min(OIL_SHELL_MAX_COUNT, this._oilShellCount + 1);
        this._refreshSkillButtonMode();
        this._showOilPickupFeedback();
    };
    Player.prototype._fireOilShell = function () {
        var wipeLen = this._getBarrelMuzzleDistance(8);
        BulletE_1.Bullet.createBulletEx(OIL_SHELL_BULLET_TYPE, this.node.position, this._barrelDir, wipeLen, this._config.AttackRadius * 1.8, 0, this._camp, this.node.parent, this._map, 10);
        this._oilShellCount = Math.max(0, this._oilShellCount - 1);
        this._refreshSkillButtonMode();
        this._playShootGlow(OIL_SHELL_BULLET_TYPE, { effectColor: cc.color(130, 92, 52, 220) });
        if (this._map && this._map.playLightScreenShake) {
            this._map.playLightScreenShake();
        }
        MusicManager_1.MusicManager.playEffect("shoot");
    };
    Player.prototype._refreshSkillButtonMode = function () {
        yyp.eventCenter.emit("skill-button-mode", { mode: this._oilShellCount > 0 ? "oil" : "charge" });
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
        if (this._map && this._map.forceDetachCoverTestFromPlayer) {
            this._map.forceDetachCoverTestFromPlayer(this);
        }
        this._stopLowHpPlayerFeedback();
        this._stopMoveEffect();
        this._oilShellCount = 0;
        this._refreshSkillButtonMode();
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
        this._refreshSkillButtonMode();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUM5QixJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxJQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUNwQyxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNqQyxJQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUNuQyxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUN0QyxJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUNqQyxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUNsQyxJQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztB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LENBQUMsVUFBVSxDQUFDO1FBQ3RDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM3RCxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV6RCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDN0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQy9CLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUMzRCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV6RCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDN0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQzNELFVBQVUsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXpELFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDM0IsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUN0QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ25CLEVBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsdUNBQXNCLEdBQXRCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbEIsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFbkIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEQsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXBELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdkIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUN0QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDakIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUNmLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDeEIsRUFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQ0FBMEIsR0FBMUIsVUFBMkIsTUFBTTtRQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN4QyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM3QyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN0QixFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNsQixFQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDN0MsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdEIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNoQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FDeEIsRUFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQ25CLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUNyQixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FDckIsQ0FBQztRQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVELHlDQUF3QixHQUF4QixVQUF5QixNQUFNO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNoRCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNsQixLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsYUFBYSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDNUIsYUFBYSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdkIsSUFBSSxjQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDckQsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDOUIsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzdELFVBQVUsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXpELElBQUksU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakMsVUFBVSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDekIsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDM0IsVUFBVSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDN0QsVUFBVSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFekQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN2QixFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQ2YsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDekIsRUFDRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUNsQixFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDekIsRUFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBNEIsR0FBNUI7UUFDSSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLE9BQU87U0FDVjtRQUVELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDekQsSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDM0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO1FBRXhDLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxhQUFhLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0osYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVyQixJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO1FBQy9ELGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFckIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3pDLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUN2QixFQUNELEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUN2QixDQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELDBDQUF5QixHQUF6QjtRQUNJLElBQUksSUFBSSxDQUFDLHlCQUF5QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDOUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUVELG1DQUFrQixHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRTtTQUNKO2FBQ0c7WUFDQSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsZ0NBQWUsR0FBZjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7WUFDekIsMkJBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBQ0QsZ0JBQWdCO0lBQ2hCLGtDQUFpQixHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQsNEJBQTRCO0lBQzVCLHlCQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hHLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDL0YsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNoRixnQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUssSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO1lBQ25GLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDL0M7UUFFRCwrREFBK0Q7UUFDL0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRTtZQUN6QiwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxtQ0FBa0IsR0FBbEIsVUFBbUIsVUFBVSxFQUFFLFlBQVk7UUFDdkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGtDQUFpQixHQUFqQjtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDeEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN4QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFckUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQ3BCLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQ3BFLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQzVELENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlDQUFnQixHQUFoQixVQUFpQixVQUFVLEVBQUUsWUFBWTtRQUNyQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3hDLE9BQU87U0FDVjtRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDMUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwRixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFD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SUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPO0lBQ1AscUNBQW9CLEdBQXBCO1FBQ0ksT0FBTyxhQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQXBsRFEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQXNsRGxCO0lBQUQsYUFBQztDQXRsREQsQUFzbERDLENBdGxEMkIsWUFBSSxHQXNsRC9CO0FBdGxEWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFua30gZnJvbSBcIi4vVGFua0VcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcbmltcG9ydCB7QnVsbGV0fSBmcm9tIFwiLi9CdWxsZXRFXCI7XG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xuaW1wb3J0IFNES01hbmFnZXIgZnJvbSBcIi4vc2RrL3Nkay9TREtNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuY29uc3QgUExBWUVSX1NIT09UX0lOVEVSVkFMID0gMC4zNTtcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9NQVggPSAzO1xuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkgPSAwLjg7XG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTCA9IDAuNjtcbmNvbnN0IFBMQVlFUl9QQUlEX1NIT1RfSFBfQ09TVCA9IDUgKiAoMSAtIDAuMSk7XG5jb25zdCBQTEFZRVJfRVhQX0JBU0UgPSAzMDtcbmNvbnN0IFBMQVlFUl9FWFBfU1RFUCA9IDE1O1xuY29uc3QgQ0hBUkdFX0NBTk5PTl9CVUxMRVRfVFlQRSA9IDk5O1xuY29uc3QgT0lMX1NIRUxMX0JVTExFVF9UWVBFID0gMTAwO1xuY29uc3QgT0lMX1NIRUxMX01BWF9DT1VOVCA9IDE7XG5jb25zdCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0lOID0gMC4yO1xuY29uc3QgTE9XX0hQX1NDUkVFTl9GTEFTSF9PVVQgPSAwLjU7XG5jb25zdCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0xPT1AgPSAzO1xuY29uc3QgU0hPT1RfUkVDT0lMX0RJU1RBTkNFID0gMTA7XG5jb25zdCBTSE9PVF9SRUNPSUxfT1VUX1RJTUUgPSAwLjA0O1xuY29uc3QgU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FID0gMC4xMTtcbmNvbnN0IFNIT09UX0ZMQVNIX0ZBREVfSU4gPSAwLjAyO1xuY29uc3QgU0hPT1RfRkxBU0hfRkFERV9PVVQgPSAwLjA3O1xuY29uc3QgU0FDUklGSUNFX0hQX1JBVElPID0gMC41O1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFRhbmsge1xuXG4gICAgLy/lhoXpg6jlj5jph49cbiAgICBfbGV2ZWwgICAgICAgICAgPSAxOyAgICAgICAgLy/njqnlrrbnrYnnuqdcblxuICAgIF9idWxsZXRDb2RlVGltZSA9IDA7ICAgICAgICAvL+WwhOWHu+WGt+WNtOaXtumXtFxuXG4gICAgX2lzSGlnaEJ1bGxldCAgID0gZmFsc2U7ICAgIC8v5LiJ5Y+R6auY6aKR5a2Q5by5XG5cbiAgICBfc2tpbGwyVGltZSAgICAgPSAwOyAgICAgICAgLy/mioDog70yKOi2hee6p+WtkOW8uSnliankvZnml7bpl7RcbiAgICBfc2tpbGwzVGltZSAgICAgPSAwOyAgICAgICAgLy/mioDog70zKOaXoOaVjOmYsuW+oSnliankvZnml7bpl7RcblxuICAgIF9pbkdhbWUgICAgICAgICA9IGZhbHNlOyAgICAvL+WcqOa4uOaIj+S4reS4reS9v+eUqFxuICAgIF92aWV3TW9kZSAgICAgICA9IGZhbHNlOyAgICAvL+WxleekuuaooeW8j1xuICAgIF9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYOyAgLy/lvZPliY3lhY3otLnlrZDlvLnmlbDph49cbiAgICBfc3RvcEZpcmVUaW1lID0gMDsgICAgICAgICAgLy/lgZzngavorqHml7ZcbiAgICBfZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDsgLy/lhY3otLnlrZDlvLnmgaLlpI3orqHml7ZcbiAgICBfbW92ZUlucHV0RGlyID0gY2MudjIoMSwgMCk7IC8v56e75Yqo5pGH5p2G55uu5qCH5pa55ZCRXG4gICAgX21vdmVJbnB1dFJhdGlvID0gMDsgICAgICAgIC8v56e75Yqo5pGH5p2G55uu5qCH6YCf546HXG4gICAgX21vdmVTcGVlZFNjYWxlID0gMTsgICAgICAgIC8v5bGA5YaF56e76YCf5YCN546HXG4gICAgX2VuZXJneUxldmVsID0gMTsgICAgICAgICAgIC8v5bGA5YaF6IO96YeP562J57qnXG4gICAgX2VuZXJneUV4cCA9IDA7ICAgICAgICAgICAgIC8v5b2T5YmN57uP6aqMXG4gICAgX2VuZXJneU5lZWRFeHAgPSBQTEFZRVJfRVhQX0JBU0U7IC8v5Y2H57qn5omA6ZyA57uP6aqMXG4gICAgX2NoYXJnZUNhbm5vblRpbWUgPSAwOyAgICAgIC8v6JOE5Yqb54Ku6JOE5Yqb5pe26Ze0XG4gICAgX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7ICAgIC8v6JOE5Yqb54Ku5Ya35Y20XG4gICAgX2NoYXJnZUNhbm5vbkNvb2xkb3duID0gMDsgIC8v6JOE5Yqb54Ku5Ya35Y205oC75pe26ZW/XG4gICAgX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XG4gICAgX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XG4gICAgX2NoYXJnZUVmZmVjdE5vZGUgPSBudWxsO1xuICAgIF9vaWxTaGVsbENvdW50ID0gMDtcbiAgICBfYnVsbGV0TXV0YXRpb25UeXBlID0gXCJcIjtcbiAgICBfYnVsbGV0TXV0YXRpb25EYXRhID0gbnVsbDtcbiAgICBfYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcbiAgICBfbW92ZUVmZmVjdElkID0gLTE7XG4gICAgX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSAtMTtcbiAgICBfbG93SHBTY3JlZW5FZmZlY3QgPSBudWxsO1xuICAgIF9zaG9vdElucHV0RGlyID0gY2MudjIoMSwgMCk7ICAgLy/lsITlh7vmkYfmnYbnm67moIfmlrnlkJFcbiAgICBfZnJhbWVJbnB1dCA9IG51bGw7ICAgICAgICAgICAgIC8v572R57uc5bin6L6T5YWlKOWkmuS6uilcbiAgICBfbXVsdGlwbGF5ZXJNb2RlID0gZmFsc2U7ICAgICAgIC8v5aSa5Lq65qih5byPKOemgeeUqOacrOWcsOaRh+adhilcbiAgICBfZW5lcmd5TGV2ZWwgPSAxOyAgICAgICAgICAgLy/lsYDlhoXog73ph4/nrYnnuqdcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICBcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XG5cbiAgICAgICAgLy/liJ3lp4vljJZVSVxuICAgICAgICB0aGlzLl9pbml0VUkoKTtcblxuICAgICAgICAvL+WIneWni+WMluaOpeaUtuS6i+S7tlxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcbiAgICB9XG5cbiAgICAvL+WIneWni+WMluWPmOmHj1xuICAgIF9pbml0VmFyaWFibGUoKSB7XG4gICAgICAgIHRoaXMuX2NhbXAgPSBcInBsYXllclwiOyAgLy/pmLXokKVcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gdGhpcy5fcmFkaXVzICogMjsgICAgLy/njqnlrrbnmoTnorDmkp7mo4DmtYvojIPlm7QqMlxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IFBMQVlFUl9TSE9PVF9JTlRFUlZBTDtcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50ID0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWDtcbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gdGhpcy5fZGlyO1xuICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDA7XG4gICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgPSAwO1xuICAgICAgICB0aGlzLl9lbmVyZ3lOZWVkRXhwID0gdGhpcy5fZ2V0RW5lcmd5TmVlZEV4cCgpO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9vaWxTaGVsbENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25UeXBlID0gXCJcIjtcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbW92ZUVmZmVjdElkID0gLTE7XG4gICAgICAgIHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSAtMTtcbiAgICAgICAgdGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG9vdElucHV0RGlyID0gdGhpcy5fYmFycmVsRGlyO1xuICAgIH1cblxuICAgIC8v6K6+572u5Z2m5YWL57G75Z6LXG4gICAgc2V0UGxheWVyVHlwZSh0YW5rVHlwZSxwbGF5ZXJMZXZlbCkge1xuICAgICAgICBzdXBlci5zZXRUYW5rVHlwZSh0YW5rVHlwZSk7XG4gICAgICAgIFxuICAgICAgICAvL+iuoeeul+eOqeWutuihgOmHjyDmlLvlh7tcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBwbGF5ZXJMZXZlbDtcbiAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9tYXhIcCA9IHRoaXMuX2NvbmZpZy5IUCAqICh0aGlzLl9sZXZlbCsxKTtcbiAgICAgICAgdGhpcy5fYXRrID0gdGhpcy5fY29uZmlnLkFUSyAqICh0aGlzLl9sZXZlbCsxKTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XG4gICAgfVxuXG4gICAgLy/liJ3lp4vljJZVSVxuICAgIF9pbml0VUkoKXtcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BBcm1vdXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcbiAgICAgICAgdGhpcy5faW5pdEVuZXJneVVJKCk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xuICAgIH1cblxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XG4gICAgX2luaXRFdmVudCgpIHtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdqb3ktc3RpY2snLHRoaXMuX2RvSm95U3RpY2ssdGhpcyk7ICAgICAgLy/mkYfmnYbkuovku7ZcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdqb3ktc3RpY2stc2hvb3QnLHRoaXMuX2RvU2hvb3RKb3lTdGljayx0aGlzKTsgLy/lsITlh7vmkYfmnYbkuovku7ZcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjaGFyZ2UtY2Fubm9uLXByZXNzJyx0aGlzLl9kb0NoYXJnZUNhbm5vblByZXNzLHRoaXMpOyAvL+iThOWKm+eCruaMieS4i1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2NoYXJnZS1jYW5ub24tcmVsZWFzZScsdGhpcy5fZG9DaGFyZ2VDYW5ub25SZWxlYXNlLHRoaXMpOyAvL+iThOWKm+eCruadvuW8gFxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ29pbC1zaGVsbC10cmlnZ2VyJyx0aGlzLl9kb09pbFNoZWxsVHJpZ2dlcix0aGlzKTsgLy/nhKbmsrnlvLnlj5HlsIRcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCd0cmlnZ2VyLXNhY3JpZmljZScsdGhpcy5fZG9TYWNyaWZpY2UsdGhpcyk7IC8v54yu56Wt5oyJ6ZKuXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndHJpZ2dlci1jb3Zlci1hY3Rpb24nLHRoaXMuX2RvQ292ZXJBY3Rpb24sdGhpcyk7IC8v5o6p5L2T5ZC46ZmEL+WIhuemu1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItc2tpbGwnLHRoaXMuX2RvU2tpbGwsdGhpcyk7ICAgICAvL+inpuWPkeaKgOiDvVxuICAgIH1cbiAgICAgICBcbiAgICAvL+mUgOavgeS6i+S7tlxuICAgIF9kZXN0cm95RXZlbnQoKSB7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2pveS1zdGljaycsdGhpcy5fZG9Kb3lTdGljayx0aGlzKTsgICAgIC8v5pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2pveS1zdGljay1zaG9vdCcsdGhpcy5fZG9TaG9vdEpveVN0aWNrLHRoaXMpOyAvL+WwhOWHu+aRh+adhuS6i+S7tlxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjaGFyZ2UtY2Fubm9uLXByZXNzJyx0aGlzLl9kb0NoYXJnZUNhbm5vblByZXNzLHRoaXMpOyAvL+iThOWKm+eCruaMieS4i1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjaGFyZ2UtY2Fubm9uLXJlbGVhc2UnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZSx0aGlzKTsgLy/ok4Tlipvngq7mnb7lvIBcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignb2lsLXNoZWxsLXRyaWdnZXInLHRoaXMuX2RvT2lsU2hlbGxUcmlnZ2VyLHRoaXMpOyAvL+eEpuayueW8ueWPkeWwhFxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd0cmlnZ2VyLXNhY3JpZmljZScsdGhpcy5fZG9TYWNyaWZpY2UsdGhpcyk7IC8v54yu56Wt5oyJ6ZKuXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItY292ZXItYWN0aW9uJyx0aGlzLl9kb0NvdmVyQWN0aW9uLHRoaXMpOyAvL+aOqeS9k+WQuOmZhC/liIbnprtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndHJpZ2dlci1za2lsbCcsdGhpcy5fZG9Ta2lsbCx0aGlzKTsgICAgLy/op6blj5HmioDog71cbiAgICB9XG4gICAgXG4gICAgLy/mkYfmnYbkuovku7ZcbiAgICBfZG9Kb3lTdGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5kaXIgJiYgZXZlbnQuZGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVJbnB1dERpciA9IGV2ZW50LmRpcjsgICAgICAvL+aWueWQkVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSBldmVudC5yYXRpbzsgIC8v6YCf546HXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+WwhOWHu+aRh+adhuS6i+S7tlxuICAgIF9kb1Nob290Sm95U3RpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGlmIChldmVudC5kaXIgJiYgZXZlbnQuZGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RJbnB1dERpciA9IGV2ZW50LmRpcjtcbiAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IGV2ZW50LmRpcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuZmlyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdHJ5RmlyZU9uY2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v572R57uc5bin6L6T5YWlKOWkmuS6uuaooeW8jylcbiAgICBzZXRGcmFtZUlucHV0KGlucHV0cykge1xuICAgICAgICB0aGlzLl9mcmFtZUlucHV0ID0gaW5wdXRzO1xuICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMCk7XG4gICAgICAgIGlmIChpbnB1dHMudXApIGRpci55ICs9IDE7XG4gICAgICAgIGlmIChpbnB1dHMuZG93bikgZGlyLnkgLT0gMTtcbiAgICAgICAgaWYgKGlucHV0cy5sZWZ0KSBkaXIueCAtPSAxO1xuICAgICAgICBpZiAoaW5wdXRzLnJpZ2h0KSBkaXIueCArPSAxO1xuICAgICAgICBpZiAoZGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gZGlyLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAxO1xuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fbW92ZUlucHV0RGlyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dHMuZmlyZSkge1xuICAgICAgICAgICAgdGhpcy5fdHJ5RmlyZU9uY2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kb0NoYXJnZUNhbm5vblByZXNzKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID4gMCB8fCB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faGlkZUNoYXJnZUVmZmVjdCgpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwge3Byb2dyZXNzOiAwfSk7XG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlQ2Fubm9uXCIpO1xuICAgIH1cblxuICAgIF9kb0NoYXJnZUNhbm5vblJlbGVhc2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSB8fCB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlQ2hhcmdlQ2Fubm9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXNldENoYXJnZUNhbm5vbigpO1xuICAgIH1cblxuICAgIF9kb1NhY3JpZmljZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKTtcbiAgICB9XG5cbiAgICBfZG9PaWxTaGVsbFRyaWdnZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZU9pbFNoZWxsKCk7XG4gICAgfVxuXG4gICAgX2RvQ292ZXJBY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLnRyeVRvZ2dsZUNvdmVyVGVzdEF0dGFjaG1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXAudHJ5VG9nZ2xlQ292ZXJUZXN0QXR0YWNobWVudCh0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgLy/op6blj5HmioDog71cbiAgICBfZG9Ta2lsbChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XG4gICAgICAgICAgICBsZXQgc2tpbGxJZCA9IGV2ZW50LnNraWxsSWQ7ICAgIC8v5pa55ZCRXG4gICAgICAgICAgICAvLyBjYy5sb2coXCLop6blj5HkuobmioDog70gXCIsc2tpbGxJZCk7XG4gICAgICAgICAgICBpZiAoc2tpbGxJZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6dGhpcy5fY29uZmlnLkNvaW4vMTAscG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLm5vZGUpfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVuZXJneSh0aGlzLl9tYXhIcCAvIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSArPSAxNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgKz0gMTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nYWluT2lsU2hlbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XG4gICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XG4gICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XG4gICAgICAgIHRoaXMuX2hpZGVCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xuICAgIH1cblxuICAgIC8v5Yi35paw546p5a625L2N572uXG4gICAgX3JlZnJlc2hQb3NpdGlvbihkdCkge1xuICAgICAgICAvL+WkmuS6uuaooeW8j++8muWcqHNldEZyYW1lSW5wdXTmmL7lvI/osIPnlKjliY3mi5Lnu53kuIDliIfnp7vliqhcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lSW5wdXQgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZnJhbWVJbnB1dC51cCAmJiAhdGhpcy5fZnJhbWVJbnB1dC5kb3duICYmICF0aGlzLl9mcmFtZUlucHV0LmxlZnQgJiYgIXRoaXMuX2ZyYW1lSW5wdXQucmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWZyZXNoTW92ZVNwZWVkKGR0KTtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbW92ZUlucHV0UmF0aW8gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl90dXJuRGlyVG8odGhpcy5fbW92ZUlucHV0RGlyLCBkdCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VyclBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuXG4gICAgICAgIC8v56Kw5pKe5rWL6K+VXG4gICAgICAgIGxldCB3aWxsUG9zaXRpb24gPSB0aGlzLl9nZXRXaWxsUG9zaXRpb24oY3VyclBvc2l0aW9uLCB0aGlzLl9kaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XG4gICAgICAgIGxldCBjb2xsaWRlckl0ZW1zID0gdGhpcy5fbWFwLnRlc3RDb2xsaWRlcnMod2lsbFBvc2l0aW9uLCB0aGlzLl9yYWRpdXMpO1xuICAgICAgICBpZiAoY29sbGlkZXJJdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gdGhpcy5fZ2V0VGVzdERpcihjdXJyUG9zaXRpb24sIHRoaXMuX3JhZGl1cywgdGhpcy5fZGlyLCBjb2xsaWRlckl0ZW1zKTtcbiAgICAgICAgICAgIGlmICh0ZXN0RGlyKSB7XG4gICAgICAgICAgICAgICAgd2lsbFBvc2l0aW9uID0gdGhpcy5fZ2V0V2lsbFBvc2l0aW9uKGN1cnJQb3NpdGlvbiwgdGVzdERpciwgdGhpcy5fY3VycmVudFNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aWxsUG9zaXRpb24gPSB0aGlzLl9tYXAuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHdpbGxQb3NpdGlvbiwgdGhpcy5fcmFkaXVzKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHdpbGxQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hNb3ZlU3BlZWQoZHQpIHtcbiAgICAgICAgbGV0IHRlcnJhaW5GYWN0b3IgPSB0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmdldFRlcnJhaW5TcGVlZEZhY3RvclxuICAgICAgICAgICAgPyB0aGlzLl9tYXAuZ2V0VGVycmFpblNwZWVkRmFjdG9yKHRoaXMubm9kZS5wb3NpdGlvbiwgdGhpcy5fcmFkaXVzKVxuICAgICAgICAgICAgOiAxO1xuICAgICAgICBsZXQgbWF4U3BlZWQgPSB0aGlzLl9nZXRDb25maWdWYWx1ZShcIlNwZWVkXCIsIDApICogdGhpcy5fbW92ZVNwZWVkU2NhbGUgKiB0ZXJyYWluRmFjdG9yO1xuICAgICAgICBsZXQgdGFyZ2V0U3BlZWQgPSB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA+IDAgPyBtYXhTcGVlZCAqIHRoaXMuX21vdmVJbnB1dFJhdGlvIDogMDtcblxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCArPSB0aGlzLl9nZXRGcmFtZVZhbHVlKFwiQWNjZWxlcmF0aW9uXCIsIG1heFNwZWVkLCBkdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkID4gdGFyZ2V0U3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSB0YXJnZXRTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiB0YXJnZXRTcGVlZCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkIC09IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJEZWNlbGVyYXRpb25cIiwgbWF4U3BlZWQsIGR0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPCB0YXJnZXRTcGVlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IHRhcmdldFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkRW5lcmd5KHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVjb3ZlckhwID0gdGhpcy5fbWF4SHAgLSB0aGlzLl9ocDtcbiAgICAgICAgaWYgKHJlY292ZXJIcCA+IDApIHtcbiAgICAgICAgICAgIGxldCBhZGRIcCA9IE1hdGgubWluKHJlY292ZXJIcCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5faHAgKz0gYWRkSHA7XG4gICAgICAgICAgICB2YWx1ZSAtPSBhZGRIcDtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRFbmVyZ3lFeHAodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XG4gICAgfVxuXG4gICAgX3RyeVNhY3JpZmljZUhwRm9yRW5lcmd5KCkge1xuICAgICAgICBpZiAodGhpcy5faHAgPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd1NhY3JpZmljZVRpcChcIuihgOmHj+i/h+S9jizml6Dms5XnjK7npa1cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF4U2FjcmlmaWNlSHAgPSB0aGlzLl9ocCAtIDE7XG4gICAgICAgIGxldCBzYWNyaWZpY2VIcCA9IE1hdGgubWluKHRoaXMuX2hwICogU0FDUklGSUNFX0hQX1JBVElPLCBtYXhTYWNyaWZpY2VIcCk7XG4gICAgICAgIGlmIChzYWNyaWZpY2VIcCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93U2FjcmlmaWNlVGlwKFwi5b2T5YmN5peg5rOV54yu56WtXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faHAgLT0gc2FjcmlmaWNlSHA7XG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG5cbiAgICAgICAgdGhpcy5fYWRkRW5lcmd5RXhwKHNhY3JpZmljZUhwKTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XG4gICAgICAgIHRoaXMuX3BsYXlTYWNyaWZpY2VGZWVkYmFjaygpO1xuICAgIH1cblxuICAgIF9hZGRFbmVyZ3lFeHAoZXhwKSB7XG4gICAgICAgIHRoaXMuX2VuZXJneUV4cCArPSBleHA7XG4gICAgICAgIHdoaWxlICh0aGlzLl9lbmVyZ3lFeHAgPj0gdGhpcy5fZW5lcmd5TmVlZEV4cCkge1xuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RXhwIC09IHRoaXMuX2VuZXJneU5lZWRFeHA7XG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lMZXZlbCsrO1xuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TmVlZEV4cCA9IHRoaXMuX2dldEVuZXJneU5lZWRFeHAoKTtcbiAgICAgICAgICAgIHRoaXMuX2xldmVsVXBCeUVuZXJneSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldEVuZXJneU5lZWRFeHAoKSB7XG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcbiAgICAgICAgbGV0IGJhc2UgPSBjb25maWcuRXhwQmFzZSA9PSBudWxsID8gUExBWUVSX0VYUF9CQVNFIDogY29uZmlnLkV4cEJhc2U7XG4gICAgICAgIGxldCBzdGVwID0gY29uZmlnLkV4cFN0ZXAgPT0gbnVsbCA/IFBMQVlFUl9FWFBfU1RFUCA6IGNvbmZpZy5FeHBTdGVwO1xuICAgICAgICByZXR1cm4gYmFzZSArICh0aGlzLl9lbmVyZ3lMZXZlbCAtIDEpICogc3RlcDtcbiAgICB9XG5cbiAgICBfbGV2ZWxVcEJ5RW5lcmd5KCkge1xuICAgICAgICBsZXQgY29uZmlnID0geXlwLmNvbmZpZy5FbmVyZ3kgfHwge307XG4gICAgICAgIGxldCBocEFkZCA9IGNvbmZpZy5MZXZlbEhwQWRkID09IG51bGwgPyBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHRoaXMuX2NvbmZpZy5IUCAqIDAuMykpIDogY29uZmlnLkxldmVsSHBBZGQ7XG4gICAgICAgIGxldCBhdGtBZGQgPSBjb25maWcuTGV2ZWxBdGtBZGQgPT0gbnVsbCA/IHRoaXMuX2NvbmZpZy5BVEsgKiAwLjIgOiBjb25maWcuTGV2ZWxBdGtBZGQ7XG5cbiAgICAgICAgdGhpcy5fbWF4SHAgKz0gaHBBZGQ7XG4gICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHA7XG4gICAgICAgIHRoaXMuX2F0ayArPSBhdGtBZGQ7XG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgfVxuXG4gICAgX2luaXRFbmVyZ3lVSSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9saWZlYmFyIHx8IHRoaXMuX2ZpcmUuX2xiSHBMZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxldmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiSHBMZXZlbFwiKTtcbiAgICAgICAgbGV2ZWxOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX2xpZmViYXI7XG4gICAgICAgIGxldmVsTm9kZS5zZXRQb3NpdGlvbigtMzQsIDApO1xuICAgICAgICBsZXZlbE5vZGUuc2V0Q29udGVudFNpemUoMzYsIDI0KTtcbiAgICAgICAgbGV2ZWxOb2RlLnpJbmRleCA9IDEwO1xuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IGxldmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsZXZlbExhYmVsLmZvbnRTaXplID0gMTg7XG4gICAgICAgIGxldmVsTGFiZWwubGluZUhlaWdodCA9IDIwO1xuICAgICAgICBsZXZlbExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxldmVsTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsZXZlbE5vZGVbXCIkTGFiZWxcIl0gPSBsZXZlbExhYmVsO1xuICAgICAgICB0aGlzLl9maXJlLl9sYkhwTGV2ZWwgPSBsZXZlbE5vZGU7XG5cbiAgICAgICAgbGV0IGV4cE5vZGUgPSBuZXcgY2MuTm9kZShcIl9leHBCYXJcIik7XG4gICAgICAgIGV4cE5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fbGlmZWJhcjtcbiAgICAgICAgZXhwTm9kZS5zZXRQb3NpdGlvbigtMzQsIDApO1xuICAgICAgICBleHBOb2RlLnNldENvbnRlbnRTaXplKDQ0LCA0NCk7XG4gICAgICAgIGV4cE5vZGUuekluZGV4ID0gMDtcblxuICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZShcIl9leHBCZ1wiKTtcbiAgICAgICAgYmcucGFyZW50ID0gZXhwTm9kZTtcbiAgICAgICAgbGV0IGJnR3JhcGhpY3MgPSBiZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBiZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig1MCwgNjgsIDc1LCAyMjApO1xuICAgICAgICBiZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCAxOCk7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlKCk7XG5cbiAgICAgICAgbGV0IGJhciA9IG5ldyBjYy5Ob2RlKFwiX2V4cFByb2dyZXNzXCIpO1xuICAgICAgICBiYXIucGFyZW50ID0gZXhwTm9kZTtcbiAgICAgICAgbGV0IGJhckdyYXBoaWNzID0gYmFyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGJhckdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGJhckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoOTAsIDI1NSwgMTQwLCAyNTUpO1xuICAgICAgICB0aGlzLl9maXJlLl9leHBCYXIgPSBleHBOb2RlO1xuICAgICAgICB0aGlzLl9maXJlLl9leHBQcm9ncmVzcyA9IGJhcjtcbiAgICAgICAgYmFyW1wiJEdyYXBoaWNzXCJdID0gYmFyR3JhcGhpY3M7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hFbmVyZ3lVSSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2xiSHBMZXZlbCAmJiB0aGlzLl9maXJlLl9sYkhwTGV2ZWwuJExhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9sYkhwTGV2ZWwuJExhYmVsLnN0cmluZyA9IHRoaXMuX2VuZXJneUxldmVsLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MgJiYgdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MuJEdyYXBoaWNzKSB7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLl9lbmVyZ3lOZWVkRXhwID4gMCA/IHRoaXMuX2VuZXJneUV4cCAvIHRoaXMuX2VuZXJneU5lZWRFeHAgOiAwO1xuICAgICAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MuJEdyYXBoaWNzO1xuICAgICAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XG4gICAgICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDkwLCAyNTUsIDE0MCwgMjU1KTtcbiAgICAgICAgICAgIGdyYXBoaWNzLmFyYygwLCAwLCAxOCwgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBNYXRoLlBJICogMiAqIHByb2dyZXNzLCBmYWxzZSk7XG4gICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9maXJlLl9leHBCYXIgJiYgdGhpcy5fZmlyZS5fZXhwQmFyLiRQcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fZXhwQmFyLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHRoaXMuX2VuZXJneU5lZWRFeHAgPiAwID8gdGhpcy5fZW5lcmd5RXhwIC8gdGhpcy5fZW5lcmd5TmVlZEV4cCA6IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2hvd1NhY3JpZmljZVRpcCh0ZXh0KSB7XG4gICAgICAgIGxldCBjaGFubmVsID0gU0RLTWFuYWdlci5nZXRDaGFubmVsKCk7XG4gICAgICAgIGlmIChjaGFubmVsICYmIGNoYW5uZWwuc2hvd1RvYXN0KSB7XG4gICAgICAgICAgICBjaGFubmVsLnNob3dUb2FzdCh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY2MubG9nKHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BsYXlTYWNyaWZpY2VGZWVkYmFjaygpIHtcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcblxuICAgICAgICBsZXQgd2F2ZSA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZVdhdmVcIik7XG4gICAgICAgIHdhdmUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB3YXZlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICB3YXZlLnpJbmRleCA9IDI4NjtcbiAgICAgICAgd2F2ZS5vcGFjaXR5ID0gMjEwO1xuICAgICAgICB3YXZlLnNjYWxlID0gMC43MjtcbiAgICAgICAgbGV0IHdhdmVHcmFwaGljcyA9IHdhdmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDc7XG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgODgsIDgyLCAyMzUpO1xuICAgICAgICB3YXZlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE2KTtcbiAgICAgICAgd2F2ZUdyYXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICB3YXZlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNiwgMi4zKSxcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjYpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlR2xvd1wiKTtcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgICAgIGdsb3cuekluZGV4ID0gMjg1O1xuICAgICAgICBnbG93Lm9wYWNpdHkgPSAwO1xuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA3MiwgNjgsIDcwKTtcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAyMCk7XG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMSwgMTkwKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMS4yMilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTgpLFxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS43OClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KXtcblxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XG4gICAgICAgICAgICAvL+WkmuS6uuaooeW8j++8muacquacieW4p+i+k+WFpeWJje+8jOWujOWFqOS4jeWkhOeQhuS7u+S9lemAu+i+kVxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9mcmFtZUlucHV0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7IC8vIOS7jemcgOe0r+iuoeWGt+WNtOmBv+WFjemmluW4p+WwseiDvei/nuWwhFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAuX3BhdXNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZyZWVCdWxsZXRSZWNvdmVyKGR0KTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNoYXJnZUNhbm5vbihkdCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxvd0hwVmlzdWFsKGR0KTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvd0hwUGxheWVyRmVlZGJhY2soKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy/njqnlrrblkozmioDog71pY29uLOeisOaSnuajgOa1i1xuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXllclNraWxsSWNvbkNvbGxpc2lvblRlc3QoKTtcblxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFBvc2l0aW9uKGR0KTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hNb3ZlRWZmZWN0KCk7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQmFycmVsRGlyKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQW5nbGUoZHQsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnN5bmNBdHRhY2hlZENvdmVyVGVzdENvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwLnN5bmNBdHRhY2hlZENvdmVyVGVzdENvdmVyKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucmVmcmVzaENvdmVyVGVzdEJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9MijotoXnuqflrZDlvLkpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSA9IHRoaXMuX3NraWxsMlRpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsMlRpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSB0aGlzLl9za2lsbDJUaW1lID4gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9Myjml6DmlYzpmLLlvqEpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSA9IHRoaXMuX3NraWxsM1RpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsM1RpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICBcbiAgICAgICAgICAgIC8v5pi+56S66ZOg55SyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICAgICAgICAgIHRoaXMuX2RlZiA9IHRoaXMuX3NraWxsM1RpbWUgPiAwID8gMTAwMDAwMDAgOiAwO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuX3ZpZXdNb2RlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5fZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3ModGhpcy5fZGlyLC0wLjUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xuICAgICAgICAgICAgdGhpcy5zaG9vdGluZyhkdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldFRlc3RVcGdyYWRlQ2hvaWNlcygpIHtcbiAgICAgICAgbGV0IGhwQWRkID0gTWF0aC5tYXgoMjUsIE1hdGgucm91bmQodGhpcy5fbWF4SHAgKiAwLjIyKSk7XG4gICAgICAgIGxldCBhdGtBZGQgPSBNYXRoLm1heCg4LCBNYXRoLnJvdW5kKHRoaXMuX2F0ayAqIDAuMTgpKTtcbiAgICAgICAgbGV0IHNwZWVkQWRkID0gMTg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJocFwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuijheeUsuW8uuWMllwiLFxuICAgICAgICAgICAgICAgIGRlc2M6IFwi55Sf5ZG95LiK6ZmQ5o+Q5Y2H5bm256uL5Yi75Zue5ruhXCIsXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJIUFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBocEFkZCxcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGhwQWRkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMjAsIDI1NSwgMTcwLCAyNTUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhdGtcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLngavlipvlvLrljJZcIixcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuaUu+WHu+WKm+aPkOWNhywg6L6T5Ye65pu06auYXCIsXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJBVEtcIixcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgYXRrQWRkLFxuICAgICAgICAgICAgICAgIGFtb3VudDogYXRrQWRkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigyNTUsIDE4NSwgOTAsIDI1NSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInNwZWVkXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5o6o6L+b5by65YyWXCIsXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnp7vliqjpgJ/luqbmj5DljYcsIOi1sOS9jeabtOeBtea0u1wiLFxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiU1BEXCIsXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIHNwZWVkQWRkICsgXCIlXCIsXG4gICAgICAgICAgICAgICAgYW1vdW50OiBzcGVlZEFkZCxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMTEwLCAyMTAsIDI1NSwgMjU1KSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJib3VuY2VcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLlj43lvLnlrZDlvLlcIixcbiAgICAgICAgICAgICAgICBkZXNjOiBcIueisOWimeWQjuiHquWKqOWPjeW8uTHmrKFcIixcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIuWPjVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCJ4MVwiLFxuICAgICAgICAgICAgICAgIGJvdW5jZUNvdW50OiAxLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcig5MCwgMTgwLCAyNTUsIDI1NSksXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDkwLCAxODAsIDI1NSwgMjEwKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicGVuZXRyYXRlXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi56m/6YCP5a2Q5by5XCIsXG4gICAgICAgICAgICAgICAgZGVzYzogXCLov57nu63nqb/pgI8z5Liq55uu5qCH5ZCO5raI5aSxXCIsXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCLnqb9cIixcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwieDNcIixcbiAgICAgICAgICAgICAgICBwZW5ldHJhdGVDb3VudDogMyxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCA5MiwgOTIsIDI1NSksXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDI1NSwgOTIsIDkyLCAyMTApLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJoZWF2eVwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIumHjeeCruWtkOW8uVwiLFxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Lyk5a6z5o+Q5Y2HNjAlLCDlrZDlvLnmm7TlpKdcIixcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIumHjVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrNjAlXCIsXG4gICAgICAgICAgICAgICAgZGFtYWdlUmF0aW86IDEuNixcbiAgICAgICAgICAgICAgICBzY2FsZTogMS4zNSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCAyMTAsIDkwLCAyNTUpLFxuICAgICAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjYy5jb2xvcigyNTUsIDIxMCwgOTAsIDIxMCksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlKSB7XG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFjaG9pY2UuaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaG9pY2UuaWQgPT0gXCJocFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXhIcCArPSBjaG9pY2UuYW1vdW50O1xuICAgICAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9tYXhIcDtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hvaWNlLmlkID09IFwiYXRrXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0ayArPSBjaG9pY2UuYW1vdW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNob2ljZS5pZCA9PSBcInNwZWVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlICs9IGNob2ljZS5hbW91bnQgLyAxMDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zaG93VXBncmFkZUZsb2F0KGNob2ljZSk7XG4gICAgICAgIHRoaXMuX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKTtcbiAgICB9XG5cbiAgICBhcHBseVRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZShjaG9pY2UpIHtcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIWNob2ljZS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25UeXBlID0gY2hvaWNlLmlkO1xuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEgPSB7XG4gICAgICAgICAgICBpZDogY2hvaWNlLmlkLFxuICAgICAgICAgICAgdGl0bGU6IGNob2ljZS50aXRsZSxcbiAgICAgICAgICAgIHNob3J0TGFiZWw6IGNob2ljZS5zaG9ydExhYmVsLFxuICAgICAgICAgICAgdmFsdWVUZXh0OiBjaG9pY2UudmFsdWVUZXh0LFxuICAgICAgICAgICAgYm91bmNlQ291bnQ6IGNob2ljZS5ib3VuY2VDb3VudCB8fCAwLFxuICAgICAgICAgICAgcGVuZXRyYXRlQ291bnQ6IGNob2ljZS5wZW5ldHJhdGVDb3VudCB8fCAwLFxuICAgICAgICAgICAgZGFtYWdlUmF0aW86IGNob2ljZS5kYW1hZ2VSYXRpbyB8fCAxLFxuICAgICAgICAgICAgc2NhbGU6IGNob2ljZS5zY2FsZSB8fCAxLFxuICAgICAgICAgICAgY29sb3I6IGNob2ljZS5jb2xvcixcbiAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjaG9pY2UuZWZmZWN0Q29sb3IgfHwgY2hvaWNlLmNvbG9yLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3Nob3dCdWxsZXRNdXRhdGlvbk1lZGFsKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xuICAgICAgICB0aGlzLl9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XG4gICAgfVxuXG4gICAgX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKTtcbiAgICAgICAgZGF0YS5jb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5jb2xvcjtcbiAgICAgICAgZGF0YS5lZmZlY3RDb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgX3Nob3dVcGdyYWRlRmxvYXQoY2hvaWNlKSB7XG4gICAgICAgIGlmICghdGhpcy5ub2RlLnBhcmVudCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZsb2F0Tm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVGbG9hdFwiKTtcbiAgICAgICAgZmxvYXROb2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIGZsb2F0Tm9kZS5zZXRQb3NpdGlvbihjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxMTAsIDApKTtcbiAgICAgICAgZmxvYXROb2RlLnpJbmRleCA9IDY1MDA7XG4gICAgICAgIGZsb2F0Tm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgZmxvYXROb2RlLnNjYWxlID0gMC44MjtcblxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQmFkZ2VcIik7XG4gICAgICAgIGJhZGdlLnBhcmVudCA9IGZsb2F0Tm9kZTtcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oLTQ0LCA0KTtcbiAgICAgICAgbGV0IGJhZGdlR3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNob2ljZS5jb2xvcjtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjQpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5saW5lV2lkdGggPSAzO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjQpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGxldCBiYWRnZUxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVCYWRnZUxhYmVsXCIpO1xuICAgICAgICBiYWRnZUxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcbiAgICAgICAgYmFkZ2VMYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNTQsIDMyKTtcbiAgICAgICAgbGV0IGJhZGdlTGFiZWwgPSBiYWRnZUxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBiYWRnZUxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xuICAgICAgICBiYWRnZUxhYmVsLmZvbnRTaXplID0gY2hvaWNlLnNob3J0TGFiZWwubGVuZ3RoID4gMiA/IDE1IDogMTg7XG4gICAgICAgIGJhZGdlTGFiZWwubGluZUhlaWdodCA9IDIwO1xuICAgICAgICBiYWRnZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGJhZGdlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIGxldCB2YWx1ZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVmFsdWVcIik7XG4gICAgICAgIHZhbHVlTm9kZS5wYXJlbnQgPSBmbG9hdE5vZGU7XG4gICAgICAgIHZhbHVlTm9kZS5zZXRQb3NpdGlvbigyMiwgOCk7XG4gICAgICAgIHZhbHVlTm9kZS5jb2xvciA9IGNob2ljZS5jb2xvcjtcbiAgICAgICAgdmFsdWVOb2RlLnNldENvbnRlbnRTaXplKDE3MCwgMzgpO1xuICAgICAgICBsZXQgdmFsdWVMYWJlbCA9IHZhbHVlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB2YWx1ZUxhYmVsLnN0cmluZyA9IGNob2ljZS52YWx1ZVRleHQ7XG4gICAgICAgIHZhbHVlTGFiZWwuZm9udFNpemUgPSAzNDtcbiAgICAgICAgdmFsdWVMYWJlbC5saW5lSGVpZ2h0ID0gMzg7XG4gICAgICAgIHZhbHVlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ7XG4gICAgICAgIHZhbHVlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIGxldCB0aXRsZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVGl0bGVcIik7XG4gICAgICAgIHRpdGxlTm9kZS5wYXJlbnQgPSBmbG9hdE5vZGU7XG4gICAgICAgIHRpdGxlTm9kZS5zZXRQb3NpdGlvbigxNiwgLTI0KTtcbiAgICAgICAgdGl0bGVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcbiAgICAgICAgdGl0bGVOb2RlLnNldENvbnRlbnRTaXplKDIyMCwgMjgpO1xuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IGNob2ljZS50aXRsZTtcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDIwO1xuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAyNDtcbiAgICAgICAgdGl0bGVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcbiAgICAgICAgdGl0bGVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XG5cbiAgICAgICAgZmxvYXROb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDQpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxOClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC41NSwgMCwgNzIpLFxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC41NSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgX3Nob3dPaWxQaWNrdXBGZWVkYmFjaygpIHtcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfb2lsUGlja3VwUmVhZHlcIik7XG4gICAgICAgIGJhZGdlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oMCwgdGhpcy5fcmFkaXVzICsgNDgpO1xuICAgICAgICBiYWRnZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgYmFkZ2Uuc2NhbGUgPSAwLjc7XG4gICAgICAgIGJhZGdlLnpJbmRleCA9IDMyMDtcblxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3OCwgNTIsIDI2LCAyMzUpO1xuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTY4LCAtMTgsIDEzNiwgMzYsIDEyKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjA1LCAxMjIsIDIzNSk7XG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtNjgsIC0xOCwgMTM2LCAzNiwgMTIpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcblxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfb2lsUGlja3VwUmVhZHlMYWJlbFwiKTtcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTI0LCAyOCk7XG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjMyLCAxNzIsIDI1NSk7XG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIueEpuayueW8ueWwsee7qlwiO1xuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDIwO1xuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcblxuICAgICAgICBiYWRnZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjAyKSxcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNiksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMiksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMiwgMCwgMTYpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIF9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKGNob2ljZSkge1xuICAgICAgICBsZXQgd2F2ZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVXYXZlXCIpO1xuICAgICAgICB3YXZlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgd2F2ZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgd2F2ZS56SW5kZXggPSAyODA7XG4gICAgICAgIHdhdmUub3BhY2l0eSA9IDIyMDtcbiAgICAgICAgd2F2ZS5zY2FsZSA9IDAuNTU7XG4gICAgICAgIGxldCB3YXZlR3JhcGhpY3MgPSB3YXZlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIHdhdmVHcmFwaGljcy5saW5lV2lkdGggPSA4O1xuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjaG9pY2UuY29sb3I7XG4gICAgICAgIHdhdmVHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTgpO1xuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIHdhdmUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjMsIDMuMiksXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjMpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUdsb3dcIik7XG4gICAgICAgIGdsb3cucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBnbG93LnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICBnbG93LnpJbmRleCA9IDI3NTtcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMDtcbiAgICAgICAgZ2xvdy5zY2FsZSA9IDAuNzU7XG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihjaG9pY2UuY29sb3IuciwgY2hvaWNlLmNvbG9yLmcsIGNob2ljZS5jb2xvci5iLCA5MCk7XG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjYpO1xuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEyLCAxODApLFxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4yOClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTgpLFxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS44KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxuICAgICAgICApKTtcblxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKDkzMDEpO1xuICAgICAgICBsZXQgcHVuY2ggPSBjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjA4KSxcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLCAxKVxuICAgICAgICApO1xuICAgICAgICBwdW5jaC5zZXRUYWcoOTMwMSk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24ocHVuY2gpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zaG93QnVsbGV0TXV0YXRpb25NZWRhbChjaG9pY2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWVkYWwgPSBuZXcgY2MuTm9kZShcIl9idWxsZXRNdXRhdGlvbk1lZGFsXCIpO1xuICAgICAgICBtZWRhbC5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xuICAgICAgICBtZWRhbC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxMTIsIDApKTtcbiAgICAgICAgbWVkYWwuekluZGV4ID0gNjYwMDtcbiAgICAgICAgbWVkYWwub3BhY2l0eSA9IDA7XG4gICAgICAgIG1lZGFsLnNjYWxlID0gMC44ODtcblxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl9tZWRhbEJhZGdlXCIpO1xuICAgICAgICBiYWRnZS5wYXJlbnQgPSBtZWRhbDtcbiAgICAgICAgbGV0IGJhZGdlR3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNob2ljZS5jb2xvcjtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5saW5lV2lkdGggPSAzO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGxldCBiYWRnZUxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsQmFkZ2VMYWJlbFwiKTtcbiAgICAgICAgYmFkZ2VMYWJlbE5vZGUucGFyZW50ID0gYmFkZ2U7XG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDUyLCAzMik7XG4gICAgICAgIGxldCBiYWRnZUxhYmVsID0gYmFkZ2VMYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgYmFkZ2VMYWJlbC5zdHJpbmcgPSBjaG9pY2Uuc2hvcnRMYWJlbDtcbiAgICAgICAgYmFkZ2VMYWJlbC5mb250U2l6ZSA9IDIyO1xuICAgICAgICBiYWRnZUxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcbiAgICAgICAgYmFkZ2VMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBiYWRnZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcblxuICAgICAgICBsZXQgdGl0bGVOb2RlID0gbmV3IGNjLk5vZGUoXCJfbWVkYWxUaXRsZVwiKTtcbiAgICAgICAgdGl0bGVOb2RlLnBhcmVudCA9IG1lZGFsO1xuICAgICAgICB0aXRsZU5vZGUuc2V0UG9zaXRpb24oMCwgLTQ4KTtcbiAgICAgICAgdGl0bGVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjM1KTtcbiAgICAgICAgdGl0bGVOb2RlLnNldENvbnRlbnRTaXplKDIyMCwgMzIpO1xuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IGNob2ljZS50aXRsZTtcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDIyO1xuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcbiAgICAgICAgdGl0bGVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcblxuICAgICAgICBtZWRhbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjAyKSxcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTYpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEuODgpLFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjM1KSxcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4zNSwgMCwgMzQpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIF9yZWZyZXNoQnVsbGV0TXV0YXRpb25FZmZlY3QoKSB7XG4gICAgICAgIHRoaXMuX2hpZGVCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xuICAgICAgICBpZiAoIXRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XG4gICAgICAgIGxldCBlZmZlY3QgPSBuZXcgY2MuTm9kZShcIl9idWxsZXRNdXRhdGlvbk11enpsZUVmZmVjdFwiKTtcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IGJhcnJlbE5vZGU7XG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLl9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKC0yKSkpO1xuICAgICAgICBlZmZlY3QuekluZGV4ID0gOTY7XG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IGVmZmVjdDtcblxuICAgICAgICBsZXQgb3V0ZXIgPSBuZXcgY2MuTm9kZShcIl9tdXp6bGVPdXRlclwiKTtcbiAgICAgICAgb3V0ZXIucGFyZW50ID0gZWZmZWN0O1xuICAgICAgICBsZXQgb3V0ZXJHcmFwaGljcyA9IG91dGVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIG91dGVyR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IodGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yLnIsIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvci5nLCB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3IuYiwgOTApO1xuICAgICAgICBvdXRlckdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNik7XG4gICAgICAgIG91dGVyR3JhcGhpY3MuZmlsbCgpO1xuXG4gICAgICAgIGxldCBpbm5lciA9IG5ldyBjYy5Ob2RlKFwiX211enpsZUlubmVyXCIpO1xuICAgICAgICBpbm5lci5wYXJlbnQgPSBlZmZlY3Q7XG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsQ29sb3IgPSB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3I7XG4gICAgICAgIGlubmVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDgpO1xuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGwoKTtcblxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjIsIDEuMjIpLFxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjIyLCAyMjApXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIyLCAwLjkpLFxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjIyLCAxNTApXG4gICAgICAgICAgICApXG4gICAgICAgICkpKTtcbiAgICB9XG5cbiAgICBfaGlkZUJ1bGxldE11dGF0aW9uRWZmZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hNb3ZlRWZmZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21vdmVFZmZlY3RJZCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlRWZmZWN0SWQgPSBNdXNpY01hbmFnZXIucGxheUxvb3BFZmZlY3QoXCJ0YW5rTW92ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zdG9wTW92ZUVmZmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vdmVFZmZlY3RJZCA+PSAwKSB7XG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuc3RvcEVmZmVjdCh0aGlzLl9tb3ZlRWZmZWN0SWQpO1xuICAgICAgICAgICAgdGhpcy5fbW92ZUVmZmVjdElkID0gLTE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g54Ku566h5Y+q6Lef6ZqP5Y+z5L6n5Y+R5bCE5pGH5p2G5pa55ZCRXG4gICAgX3JlZnJlc2hCYXJyZWxEaXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaG9vdElucHV0RGlyICYmIHRoaXMuX3Nob290SW5wdXREaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9zaG9vdElucHV0RGlyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8g5Y+z5L6n5oyJ6ZKu5oqs6LW35pe255u05o6l5Y+R5bCE5LiA5Y+RLCDkuI3otbDmjInkvY/mjIHnu63lj5HlsITpgLvovpFcbiAgICBmaXJlT25jZSgpIHtcbiAgICAgICAgbGV0IHR5cGUgPSAodGhpcy5fdmlld01vZGUgfHwgdGhpcy5fc2tpbGwyVGltZSA+IDApID8gdGhpcy5fY29uZmlnLkJUeXBlMiA6IHRoaXMuX2NvbmZpZy5CVHlwZTE7XG4gICAgICAgIGxldCBhdHRhY2tSYWRpdXMgPSB0aGlzLl92aWV3TW9kZSA/IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAwLjggOnRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXM7XG4gICAgICAgIGxldCBtdXRhdGlvbkRhdGEgPSB0aGlzLl92aWV3TW9kZSA/IG51bGwgOiB0aGlzLl9nZXRDdXJyZW50QnVsbGV0TXV0YXRpb25EYXRhKCk7XG4gICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeCh0eXBlLHRoaXMubm9kZS5wb3NpdGlvbix0aGlzLl9iYXJyZWxEaXIsdGhpcy5fZmlyZS5fbHlCYXJyZWwuaGVpZ2h0KzIwLGF0dGFja1JhZGl1cyx0aGlzLl9hdGssdGhpcy5fY2FtcCx0aGlzLm5vZGUucGFyZW50LHRoaXMuX21hcCw4LG11dGF0aW9uRGF0YSk7XG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmlzU2hvb3RFZmZlY3RUZXN0TW9kZSAmJiB0aGlzLl9tYXAuaXNTaG9vdEVmZmVjdFRlc3RNb2RlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYXlTaG9vdEZlZWRiYWNrKHR5cGUsIG11dGF0aW9uRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGlmICh0aGlzLl92aWV3TW9kZSA9PSBmYWxzZSAmJiB0aGlzLl9tYXAuZW5lbXlDb3VudCgpID4gMCkge1xuICAgICAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGxheVNob290RmVlZGJhY2soYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XG4gICAgICAgIHRoaXMuX3BsYXlCYXJyZWxSZWNvaWwoKTtcbiAgICAgICAgdGhpcy5fcGxheU11enpsZUZsYXNoKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSk7XG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcbiAgICAgICAgdGhpcy5fcGxheVNob290U2hha2UoKTtcbiAgICB9XG5cbiAgICBfcGxheUJhcnJlbFJlY29pbCgpIHtcbiAgICAgICAgbGV0IHJlY29pbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgKHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fbHlCYXJyZWwpO1xuICAgICAgICBpZiAoIXJlY29pbE5vZGUgfHwgIWNjLmlzVmFsaWQocmVjb2lsTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHJlY29pbE5vZGUucGFyZW50O1xuICAgICAgICBpZiAoIXBhcmVudE5vZGUgfHwgIWNjLmlzVmFsaWQocGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYXNlUG9zID0gcmVjb2lsTm9kZVtcIl9zaG9vdEJhc2VQb3NcIl07XG4gICAgICAgIGlmICghYmFzZVBvcykge1xuICAgICAgICAgICAgYmFzZVBvcyA9IGNjLnYzKHJlY29pbE5vZGUucG9zaXRpb24pO1xuICAgICAgICAgICAgcmVjb2lsTm9kZVtcIl9zaG9vdEJhc2VQb3NcIl0gPSBjYy52MyhiYXNlUG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYXNlV29ybGRQb3MgPSBwYXJlbnROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihiYXNlUG9zKTtcbiAgICAgICAgbGV0IHJlY29pbERpciA9IHRoaXMuX2JhcnJlbERpciAmJiB0aGlzLl9iYXJyZWxEaXIubWFnU3FyKCkgPiAwID8gdGhpcy5fYmFycmVsRGlyLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XG4gICAgICAgIGxldCByZWNvaWxXb3JsZFBvcyA9IGNjLnYyKGJhc2VXb3JsZFBvcykuc3ViKHJlY29pbERpci5tdWwoU0hPT1RfUkVDT0lMX0RJU1RBTkNFKSk7XG4gICAgICAgIGxldCByZWNvaWxMb2NhbFBvcyA9IHBhcmVudE5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocmVjb2lsV29ybGRQb3MpO1xuXG4gICAgICAgIHJlY29pbE5vZGUuc3RvcEFjdGlvbkJ5VGFnKDkwMDQpO1xuICAgICAgICByZWNvaWxOb2RlLnNldFBvc2l0aW9uKGJhc2VQb3MpO1xuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICBjYy5tb3ZlVG8oU0hPT1RfUkVDT0lMX09VVF9USU1FLCByZWNvaWxMb2NhbFBvcy54LCByZWNvaWxMb2NhbFBvcy55KSxcbiAgICAgICAgICAgIGNjLm1vdmVUbyhTSE9PVF9SRUNPSUxfUkVUVVJOX1RJTUUsIGJhc2VQb3MueCwgYmFzZVBvcy55KVxuICAgICAgICApO1xuICAgICAgICBhY3Rpb24uc2V0VGFnKDkwMDQpO1xuICAgICAgICByZWNvaWxOb2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgIH1cblxuICAgIF9wbGF5TXV6emxlRmxhc2goYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xuICAgICAgICBpZiAoIWJhcnJlbE5vZGUgfHwgIWNjLmlzVmFsaWQoYmFycmVsTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlZmZlY3RDb2xvciA9IHRoaXMuX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcbiAgICAgICAgbGV0IGZsYXNoID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVGbGFzaFwiKTtcbiAgICAgICAgZmxhc2gucGFyZW50ID0gYmFycmVsTm9kZTtcbiAgICAgICAgZmxhc2guc2V0UG9zaXRpb24oY2MudjModGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbig2KSkpO1xuICAgICAgICBmbGFzaC56SW5kZXggPSAxMTU7XG4gICAgICAgIGZsYXNoLm9wYWNpdHkgPSAwO1xuICAgICAgICBmbGFzaC5zY2FsZVggPSAwLjI4O1xuICAgICAgICBmbGFzaC5zY2FsZVkgPSAwLjcyO1xuXG4gICAgICAgIGxldCBjb25lID0gbmV3IGNjLk5vZGUoXCJfZmxhc2hDb25lXCIpO1xuICAgICAgICBjb25lLnBhcmVudCA9IGZsYXNoO1xuICAgICAgICBsZXQgY29uZUdyYXBoaWNzID0gY29uZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBjb25lR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoZWZmZWN0Q29sb3IuciwgZWZmZWN0Q29sb3IuZywgZWZmZWN0Q29sb3IuYiwgMjEwKTtcbiAgICAgICAgY29uZUdyYXBoaWNzLm1vdmVUbygwLCAzNik7XG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oLTE3LCA4KTtcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygtNywgLTgpO1xuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKDAsIDQpO1xuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKDcsIC04KTtcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygxNywgOCk7XG4gICAgICAgIGNvbmVHcmFwaGljcy5jbG9zZSgpO1xuICAgICAgICBjb25lR3JhcGhpY3MuZmlsbCgpO1xuXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfZmxhc2hDb3JlXCIpO1xuICAgICAgICBjb3JlLnBhcmVudCA9IGZsYXNoO1xuICAgICAgICBsZXQgY29yZUdyYXBoaWNzID0gY29yZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTAsIDIyMCwgMjM1KTtcbiAgICAgICAgY29yZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxMSk7XG4gICAgICAgIGNvcmVHcmFwaGljcy5maWxsKCk7XG5cbiAgICAgICAgZmxhc2gucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDI1NSksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhTSE9PVF9GTEFTSF9GQURFX0lOLCAxLjEsIDEuMTgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dChTSE9PVF9GTEFTSF9GQURFX09VVCksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhTSE9PVF9GTEFTSF9GQURFX09VVCwgMC41NSwgMS42NSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgX3BsYXlTaG9vdEdsb3coYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XG4gICAgICAgIGxldCBlZmZlY3RDb2xvciA9IHRoaXMuX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcblxuICAgICAgICBpZiAoIXRoaXMubm9kZS5wYXJlbnQgfHwgIWNjLmlzVmFsaWQodGhpcy5ub2RlLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtdXp6bGVHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVHbG93XCIpO1xuICAgICAgICBtdXp6bGVHbG93LnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIG11enpsZUdsb3cuc2V0UG9zaXRpb24oY2MudjModGhpcy5fZ2V0QmFycmVsTXV6emxlUG9zaXRpb24oMCkpKTtcbiAgICAgICAgbXV6emxlR2xvdy56SW5kZXggPSAyODU7XG4gICAgICAgIG11enpsZUdsb3cub3BhY2l0eSA9IDA7XG4gICAgICAgIG11enpsZUdsb3cuc2NhbGUgPSAwLjU7XG4gICAgICAgIGxldCBtdXp6bGVHbG93R3JhcGhpY3MgPSBtdXp6bGVHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIG11enpsZUdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihlZmZlY3RDb2xvci5yLCBlZmZlY3RDb2xvci5nLCBlZmZlY3RDb2xvci5iLCA5NSk7XG4gICAgICAgIG11enpsZUdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBtdXp6bGVHbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjAzLCAyMTApLFxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wMywgMS4wNSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYy5zcGF3bihcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMSksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuNjUpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuXG4gICAgICAgIGxldCBib2R5R2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3Nob290Qm9keUdsb3dcIik7XG4gICAgICAgIGJvZHlHbG93LnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgYm9keUdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgICAgIGJvZHlHbG93LnpJbmRleCA9IDI2MDtcbiAgICAgICAgYm9keUdsb3cub3BhY2l0eSA9IDA7XG4gICAgICAgIGJvZHlHbG93LnNjYWxlID0gMC43NTtcbiAgICAgICAgbGV0IGJvZHlHbG93R3JhcGhpY3MgPSBib2R5R2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBib2R5R2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDcwKTtcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjgpO1xuICAgICAgICBib2R5R2xvd0dyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgYm9keUdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDQsIDE1MCksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA0LCAxLjA4KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNjLnNwYXduKFxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xMiksXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjM4KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBfcGxheVNob290U2hha2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRTaG9vdEVmZmVjdENvbG9yKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xuICAgICAgICBpZiAobXV0YXRpb25EYXRhICYmIG11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIG11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnVsbGV0VHlwZSA9PSBPSUxfU0hFTExfQlVMTEVUX1RZUEUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5jb2xvcigxMzAsIDkyLCA1MiwgMjIwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnVsbGV0VHlwZSA9PSB0aGlzLl9jb25maWcuQlR5cGUyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MuY29sb3IoMTIwLCAyMjUsIDI1NSwgMjMwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2MuY29sb3IoMjU1LCAyMDUsIDk1LCAyMzApO1xuICAgIH1cblxuICAgIF91cGRhdGVDaGFyZ2VDYW5ub24oZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAtPSBkdDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBjb29sZG93blByb2dyZXNzID0gMSAtIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAvIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB7cHJvZ3Jlc3M6IGNvb2xkb3duUHJvZ3Jlc3N9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duID0gMDtcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lICs9IGR0O1xuICAgICAgICBsZXQgbmVlZFRpbWUgPSB0aGlzLl9nZXRDaGFyZ2VDb25maWcoXCJUaW1lXCIsIDUpO1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lIC8gbmVlZFRpbWU7XG4gICAgICAgIGlmIChwcm9ncmVzcyA+IDEpIHtcbiAgICAgICAgICAgIHByb2dyZXNzID0gMTtcbiAgICAgICAgfVxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwge3Byb2dyZXNzOiBwcm9ncmVzc30pO1xuXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9PSBmYWxzZSAmJiB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID49IG5lZWRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9zaG93Q2hhcmdlRWZmZWN0KCk7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwge30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2ZpcmVDaGFyZ2VDYW5ub24oKSB7XG4gICAgICAgIGxldCBhdHRhY2tSYWRpdXMgPSB0aGlzLl9nZXRDaGFyZ2VDb25maWcoXCJBdHRhY2tSYWRpdXNcIiwgdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAqIDEuNCk7XG4gICAgICAgIGxldCBhdGtSYXRpbyA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkF0a1JhdGlvXCIsIDMpO1xuICAgICAgICBsZXQgc3BlZWQgPSB0aGlzLl9nZXRDaGFyZ2VDb25maWcoXCJTcGVlZFwiLCAxMik7XG4gICAgICAgIGxldCB3aXBlTGVuID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlRGlzdGFuY2UoMTIpO1xuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgoQ0hBUkdFX0NBTk5PTl9CVUxMRVRfVFlQRSwgdGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9iYXJyZWxEaXIsIHdpcGVMZW4sIGF0dGFja1JhZGl1cywgdGhpcy5fYXRrICogYXRrUmF0aW8sIHRoaXMuX2NhbXAsIHRoaXMubm9kZS5wYXJlbnQsIHRoaXMuX21hcCwgc3BlZWQpO1xuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImNoYXJnZVNob290XCIpO1xuICAgICAgICB0aGlzLl9zaGFrZVNjcmVlbigpO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkNvb2xkb3duXCIsIDgpO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPSB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93bjtcbiAgICB9XG5cbiAgICBfZ2Fpbk9pbFNoZWxsKCkge1xuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IE1hdGgubWluKE9JTF9TSEVMTF9NQVhfQ09VTlQsIHRoaXMuX29pbFNoZWxsQ291bnQgKyAxKTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xuICAgICAgICB0aGlzLl9zaG93T2lsUGlja3VwRmVlZGJhY2soKTtcbiAgICB9XG5cbiAgICBfZmlyZU9pbFNoZWxsKCkge1xuICAgICAgICBsZXQgd2lwZUxlbiA9IHRoaXMuX2dldEJhcnJlbE11enpsZURpc3RhbmNlKDgpO1xuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgoT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX2JhcnJlbERpciwgd2lwZUxlbiwgdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAqIDEuOCwgMCwgdGhpcy5fY2FtcCwgdGhpcy5ub2RlLnBhcmVudCwgdGhpcy5fbWFwLCAxMCk7XG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBNYXRoLm1heCgwLCB0aGlzLl9vaWxTaGVsbENvdW50IC0gMSk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhPSUxfU0hFTExfQlVMTEVUX1RZUEUsIHtlZmZlY3RDb2xvcjogY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCl9KTtcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xuICAgICAgICB9XG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKSB7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIiwge21vZGU6IHRoaXMuX29pbFNoZWxsQ291bnQgPiAwID8gXCJvaWxcIiA6IFwiY2hhcmdlXCJ9KTtcbiAgICB9XG5cbiAgICBfZ2V0Q2hhcmdlQ29uZmlnKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGxldCBmdWxsS2V5ID0gXCJDaGFyZ2VcIiArIGtleTtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnW2Z1bGxLZXldIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICBfcmVzZXRDaGFyZ2VDYW5ub24oKSB7XG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9oaWRlQ2hhcmdlRWZmZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPD0gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIsIHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zaG93Q2hhcmdlRWZmZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcbiAgICAgICAgbGV0IGVmZmVjdCA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZU11enpsZUVmZmVjdFwiKTtcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IGJhcnJlbE5vZGU7XG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLl9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKDQpKSk7XG4gICAgICAgIGVmZmVjdC56SW5kZXggPSAxMDA7XG5cbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZWZmZWN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNDAsIDIwLCAxODApO1xuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTgpO1xuICAgICAgICBncmFwaGljcy5maWxsKCk7XG5cbiAgICAgICAgZWZmZWN0LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAxLjM1KSxcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNSwgMC45KVxuICAgICAgICApKSk7XG4gICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgPSBlZmZlY3Q7XG4gICAgfVxuXG4gICAgX2hpZGVDaGFyZ2VFZmZlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIF9zaGFrZVNjcmVlbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5ub2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWFwTm9kZSA9IHRoaXMuX21hcC5ub2RlO1xuICAgICAgICBsZXQgb3JpZ2luID0gbWFwTm9kZS5wb3NpdGlvbjtcbiAgICAgICAgbWFwTm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAwMSk7XG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAwKSxcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCAtOCwgMCksXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgNCwgMyksXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgMCwgLTMpLFxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBtYXBOb2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBhY3Rpb24uc2V0VGFnKDkwMDEpO1xuICAgICAgICBtYXBOb2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICBVdGlscy52aWJyYXRlKCk7XG4gICAgfVxuXG4gICAgX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oZXh0cmFPZmZzZXQgPSAwKSB7XG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xuICAgICAgICBsZXQgYW5jaG9yWSA9IGJhcnJlbE5vZGUuYW5jaG9yWSA9PSBudWxsID8gMC41IDogYmFycmVsTm9kZS5hbmNob3JZO1xuICAgICAgICByZXR1cm4gY2MudjIoMCwgYmFycmVsTm9kZS5oZWlnaHQgKiAoMSAtIGFuY2hvclkpICsgZXh0cmFPZmZzZXQpO1xuICAgIH1cblxuICAgIF9nZXRCYXJyZWxNdXp6bGVQb3NpdGlvbihleHRyYU9mZnNldCA9IDApIHtcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XG4gICAgICAgIGxldCBsb2NhbFBvcyA9IHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oZXh0cmFPZmZzZXQpO1xuICAgICAgICBsZXQgd29ybGRQb3MgPSBiYXJyZWxOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihsb2NhbFBvcyk7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcbiAgICB9XG5cbiAgICBfZ2V0QmFycmVsTXV6emxlRGlzdGFuY2UoZXh0cmFPZmZzZXQgPSAwKSB7XG4gICAgICAgIGxldCBtdXp6bGVQb3MgPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVQb3NpdGlvbihleHRyYU9mZnNldCk7XG4gICAgICAgIHJldHVybiBtdXp6bGVQb3Muc3ViKHRoaXMubm9kZS5wb3NpdGlvbikubWFnKCk7XG4gICAgfVxuXG4gICAgX3RyeUZpcmVPbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5fYnVsbGV0Q29kZVRpbWUgPCBQTEFZRVJfU0hPT1RfSU5URVJWQUwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPD0gMCAmJiB0aGlzLl9jYW5Ob3RBZmZvcmRQYWlkQnVsbGV0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dMb3dIcFNob290VGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XG4gICAgICAgIHRoaXMuZmlyZU9uY2UoKTtcblxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50LS07XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29uc3VtZUhwRm9yUGFpZEJ1bGxldCgpO1xuICAgIH1cblxuICAgIF9jYW5Ob3RBZmZvcmRQYWlkQnVsbGV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHAgPD0gUExBWUVSX1BBSURfU0hPVF9IUF9DT1NUO1xuICAgIH1cblxuICAgIF9zaG93TG93SHBTaG9vdFRpcCgpIHtcbiAgICAgICAgbGV0IGNoYW5uZWwgPSBTREtNYW5hZ2VyLmdldENoYW5uZWwoKTtcbiAgICAgICAgaWYgKGNoYW5uZWwgJiYgY2hhbm5lbC5zaG93VG9hc3QpIHtcbiAgICAgICAgICAgIGNoYW5uZWwuc2hvd1RvYXN0KFwi6KGA6YeP6L+H5L2OLOaXoOazleWPkeWwhOWtkOW8uVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY2MubG9nKFwi6KGA6YeP6L+H5L2OLOaXoOazleWPkeWwhOWtkOW8uVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jb25zdW1lSHBGb3JQYWlkQnVsbGV0KCkge1xuICAgICAgICB0aGlzLl9ocCAtPSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgICAgIGlmICh0aGlzLl9ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v546p5a625Y+X5Ye75LiN6aOY5Lyk5a6z5pWw5a2XLCDnlKjljLrliKvkuo7mlYzkurrnmoTok53oibLpl6rlhYnooajnjrBcbiAgICBiZUhpdChkYW1hZ2Upe1xuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XG4gICAgICAgIGlmIChkYW1hZ2UgPCAwKSB7XG4gICAgICAgICAgICBkYW1hZ2UgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faHAgLT0gZGFtYWdlO1xuICAgICAgICBpZiAodGhpcy5faHAgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xuICAgICAgICB0aGlzLl9zaG93UGxheWVySGl0RWZmZWN0KCk7XG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKSB7XG4gICAgICAgIGxldCBlZmZlY3QgPSBuZXcgY2MuTm9kZShcIl9wbGF5ZXJIaXRFZmZlY3RcIik7XG4gICAgICAgIGVmZmVjdC5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDMwMDtcblxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBlZmZlY3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig4MCwgMjEwLCAyNTUsIDIzMCk7XG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxNik7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3MCwgMTcwLCAyNTUsIDU1KTtcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDEwKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xuXG4gICAgICAgIGVmZmVjdC5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBlZmZlY3Quc2NhbGUgPSAwLjY1O1xuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjE4LCAxLjI1KSxcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xOCwgNjApXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEpLFxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIF91cGRhdGVMb3dIcFBsYXllckZlZWRiYWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luR2FtZSB8fCAhdGhpcy5pc0xvd0hwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zdGFydExvd0hwU2NyZWVuRWZmZWN0KCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0TG93SHBIZWFydGJlYXRTb3VuZCgpO1xuICAgIH1cblxuICAgIF9zdGFydExvd0hwSGVhcnRiZWF0U291bmQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID49IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSBNdXNpY01hbmFnZXIucGxheUxvb3BFZmZlY3QoXCJoZWFydGJlYXRcIik7XG4gICAgfVxuXG4gICAgX3N0b3BMb3dIcEhlYXJ0YmVhdFNvdW5kKCkge1xuICAgICAgICBpZiAodGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA+PSAwKSB7XG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuc3RvcEVmZmVjdCh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkKTtcbiAgICAgICAgICAgIHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zdGFydExvd0hwU2NyZWVuRWZmZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlZmZlY3RSb290ID0gbmV3IGNjLk5vZGUoXCJfbG93SHBTY3JlZW5FZmZlY3RcIik7XG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5fbWFwICYmIHRoaXMuX21hcC5ub2RlICYmIHRoaXMuX21hcC5ub2RlLnBhcmVudCA/IHRoaXMuX21hcC5ub2RlLnBhcmVudCA6IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIGVmZmVjdFJvb3QucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgZWZmZWN0Um9vdC5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgZWZmZWN0Um9vdC56SW5kZXggPSAxNjAwO1xuICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCA9IGVmZmVjdFJvb3Q7XG5cbiAgICAgICAgbGV0IGJvcmRlck5vZGUgPSBuZXcgY2MuTm9kZShcIl9sb3dIcEJvcmRlclwiKTtcbiAgICAgICAgYm9yZGVyTm9kZS5wYXJlbnQgPSBlZmZlY3RSb290O1xuICAgICAgICBib3JkZXJOb2RlLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgIGxldCBjcmVhdGVFZGdlID0gZnVuY3Rpb24obmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICAgICAgbGV0IGVkZ2UgPSBuZXcgY2MuTm9kZShuYW1lKTtcbiAgICAgICAgICAgIGVkZ2UucGFyZW50ID0gYm9yZGVyTm9kZTtcbiAgICAgICAgICAgIGVkZ2Uuc2V0UG9zaXRpb24oeCwgeSk7XG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSBlZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDYwLCA2MCwgMjU1KTtcbiAgICAgICAgICAgIGdyYXBoaWNzLnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICAgICAgcmV0dXJuIGVkZ2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgY3JlYXRlRWRnZShcIl90b3BFZGdlXCIsIDAsIDM1MSwgMTI4MCwgMTgpO1xuICAgICAgICBjcmVhdGVFZGdlKFwiX2JvdHRvbUVkZ2VcIiwgMCwgLTM1MSwgMTI4MCwgMTgpO1xuICAgICAgICBjcmVhdGVFZGdlKFwiX2xlZnRFZGdlXCIsIC02MzEsIDAsIDE4LCA3MjApO1xuICAgICAgICBjcmVhdGVFZGdlKFwiX3JpZ2h0RWRnZVwiLCA2MzEsIDAsIDE4LCA3MjApO1xuXG4gICAgICAgIGxldCBpZGxlVGltZSA9IE1hdGgubWF4KDAsIExPV19IUF9TQ1JFRU5fRkxBU0hfTE9PUCAtIExPV19IUF9TQ1JFRU5fRkxBU0hfSU4gLSBMT1dfSFBfU0NSRUVOX0ZMQVNIX09VVCk7XG4gICAgICAgIGJvcmRlck5vZGUucnVuQWN0aW9uKFxuICAgICAgICAgICAgY2MucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKExPV19IUF9TQ1JFRU5fRkxBU0hfSU4sIDIxMCksXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhMT1dfSFBfU0NSRUVOX0ZMQVNIX09VVCwgMCksXG4gICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShpZGxlVGltZSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgX2Rlc3Ryb3lMb3dIcFNjcmVlbkVmZmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ICYmIGNjLmlzVmFsaWQodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QpKSB7XG4gICAgICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgPSBudWxsO1xuICAgIH1cblxuICAgIF9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpIHtcbiAgICAgICAgdGhpcy5fc3RvcExvd0hwSGVhcnRiZWF0U291bmQoKTtcbiAgICAgICAgdGhpcy5fZGVzdHJveUxvd0hwU2NyZWVuRWZmZWN0KCk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUZyZWVCdWxsZXRSZWNvdmVyKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lICs9IGR0O1xuICAgICAgICBpZiAodGhpcy5fc3RvcEZpcmVUaW1lIDwgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lICs9IGR0O1xuICAgICAgICB3aGlsZSAodGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID49IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMXG4gICAgICAgICAgICAmJiB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgLT0gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUw7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCkge1xuICAgICAgICBsZXQgYnVsbGV0QmFycyA9IFtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMSxcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMixcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMyxcbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHJlY292ZXJQcm9ncmVzcyA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8IFBMQVlFUl9GUkVFX0JVTExFVF9NQVhcbiAgICAgICAgICAgICYmIHRoaXMuX3N0b3BGaXJlVGltZSA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSkge1xuICAgICAgICAgICAgcmVjb3ZlclByb2dyZXNzID0gdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lIC8gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUw7XG4gICAgICAgICAgICBpZiAocmVjb3ZlclByb2dyZXNzID4gMSkge1xuICAgICAgICAgICAgICAgIHJlY292ZXJQcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWxsZXRCYXJzLmZvckVhY2goKGJhck5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJhck5vZGUgfHwgIWJhck5vZGUuJFByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggPCB0aGlzLl9mcmVlQnVsbGV0Q291bnQpIHtcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PSB0aGlzLl9mcmVlQnVsbGV0Q291bnQgJiYgcmVjb3ZlclByb2dyZXNzID4gMCkge1xuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gcmVjb3ZlclByb2dyZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5bCE5Ye7XG4gICAgc2hvb3RpbmcoZHQpe1xuICAgICAgICBsZXQganVkZ2VDRCA9IHRoaXMuX3NraWxsMlRpbWUgPiAwID8gdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lLzQgOiB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWU7XG5cbiAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA+PSBqdWRnZUNEKSB7XG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZU9uY2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL+aJp+ihjOatu+S6oVxuICAgIGRvRGVhdGgoKXtcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuZm9yY2VEZXRhY2hDb3ZlclRlc3RGcm9tUGxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAuZm9yY2VEZXRhY2hDb3ZlclRlc3RGcm9tUGxheWVyKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XG4gICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XG4gICAgICAgIHN1cGVyLmRvRGVhdGgoKTtcbiAgICAgICAgXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwicGxheWVyLWRlYXRoXCIse30pO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpOyBcbiAgICAgICAgLy8g54iG54K45pWI5p6cXG4gICAgICAgIC8vIOaYvuekuue7k+adn+eVjOmdolxuICAgIH1cblxuICAgIGRlYnVnU2V0TG93SHAoKSB7XG4gICAgICAgIGxldCBocCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IodGhpcy5fbWF4SHAgKiAwLjEyKSk7XG4gICAgICAgIGlmIChocCA+PSB0aGlzLl9tYXhIcCkge1xuICAgICAgICAgICAgaHAgPSBNYXRoLm1heCgxLCB0aGlzLl9tYXhIcCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgfVxuXG4gICAgc2V0SW5HYW1lKCl7XG4gICAgICAgIHRoaXMuX2luR2FtZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xuICAgIH1cbiAgICBcbiAgICAvL+iOt+WPlueisOaSnuahhlxuICAgIGdldFBsYXllckJvdW5kaW5nQm94KCl7XG4gICAgICAgIHJldHVybiBVdGlscy5nZXRXb3JsZEJvdW5kaW5nQm94KHRoaXMuX2N1cnJlbnRCZyk7XG4gICAgfVxuXG4gICAgc2V0Vmlld01vZGUoKXtcbiAgICAgICAgdGhpcy5fdmlld01vZGUgPSB0cnVlO1xuICAgIH1cblxufVxuIl19