
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
var OIL_THROW_PREVIEW_ARC_HEIGHT = 110;
var OIL_THROW_AREA_RADIUS = 120;
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
        _this._oilShellPreviewing = false;
        _this._oilShellPreviewTarget = null;
        _this._oilShellAimDir = cc.v2(1, 0);
        _this._oilShellAimRatio = 1;
        _this._bulletMutationType = "";
        _this._bulletMutationData = null;
        _this._bulletMutationEffectNode = null;
        _this._moveEffectId = -1;
        _this._lowHpHeartbeatEffectId = -1;
        _this._lowHpScreenEffect = null;
        _this._shootInputDir = cc.v2(1, 0); //射击摇杆目标方向
        _this._localPreviewBarrelDir = null; //本地联机玩家炮管预览方向(仅表现层)
        _this._frameInput = null; //网络帧输入(多人)
        _this._multiplayerMode = false; //多人模式(禁用本地摇杆)
        _this._multiplayerRemote = false; //多人远端玩家
        _this._multiplayerPlayerId = -1; //多人玩家ID
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
        this._oilShellPreviewing = false;
        this._oilShellPreviewTarget = null;
        this._oilShellAimDir = this._barrelDir && this._barrelDir.magSqr() > 0 ? cc.v2(this._barrelDir).normalize() : cc.v2(1, 0);
        this._oilShellAimRatio = 1;
        this._bulletMutationType = "";
        this._bulletMutationData = null;
        this._bulletMutationEffectNode = null;
        this._moveEffectId = -1;
        this._lowHpHeartbeatEffectId = -1;
        this._lowHpScreenEffect = null;
        this._shootInputDir = this._barrelDir;
        this._localPreviewBarrelDir = null;
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
    Player.prototype.getMultiplayerSetupPayload = function () {
        return {
            tankType: this._tankType,
            playerLevel: this._level,
            baseHp: this._maxHp,
            baseAtk: this._atk,
            baseSpeed: this._getConfigValue("Speed", 0),
        };
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
        if (this._oilShellPreviewing)
            return;
        if (event.dir && event.dir.magSqr() > 0) {
            this._shootInputDir = event.dir;
            this._barrelDir = event.dir;
        }
        if (event.fire === true) {
            this._tryFireOnce();
        }
    };
    Player.prototype.updateMultiplayerLocalAimPreview = function (dir) {
        if (!this._multiplayerMode || this._multiplayerRemote) {
            return;
        }
        if (!dir || dir.magSqr() <= 0) {
            return;
        }
        this._localPreviewBarrelDir = cc.v2(dir).normalize();
    };
    //网络帧输入(多人模式)
    Player.prototype.setFrameInput = function (inputs) {
        this._frameInput = inputs;
        if (inputs && inputs.throwTar) {
            this._oilShellAimRatio = Number.isFinite(inputs.throwTar.ratio) ? Math.max(0, Math.min(1, inputs.throwTar.ratio)) : this._oilShellAimRatio;
            if (Number.isFinite(inputs.throwTar.dirX) && Number.isFinite(inputs.throwTar.dirY)) {
                var tarDir = cc.v2(inputs.throwTar.dirX, inputs.throwTar.dirY);
                if (tarDir.magSqr() > 0.0001) {
                    this._oilShellAimDir = tarDir.normalize();
                }
            }
        }
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
        }
        else {
            this._moveInputRatio = 0;
        }
        if (inputs.aim && Number.isFinite(inputs.aim.x) && Number.isFinite(inputs.aim.y)) {
            var aimDir = cc.v2(inputs.aim.x, inputs.aim.y);
            if (aimDir.magSqr() > 0.0001) {
                this._shootInputDir = aimDir.normalize();
                this._barrelDir = this._shootInputDir;
            }
        }
        // console.log("setFrameInput---inputs",inputs)
        if (inputs.fire) {
            this._fireByMultiplayerCommand(inputs.fire);
        }
    };
    Player.prototype.getMultiplayerFireType = function () {
        return (this._skill2Time > 0) ? this._config.BType2 : this._config.BType1;
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
    Player.prototype._doOilShellTrigger = function (event) {
        if (event === void 0) { event = null; }
        if (this._inGame == false) {
            return;
        }
        if (this._oilShellCount <= 0) {
            this._refreshSkillButtonMode();
            return;
        }
        var pressed = !!(event && event.pressed === true);
        var aiming = !!(event && event.aiming === true);
        var release = !!(event && event.release === true);
        var cancelled = !!(event && event.cancelled === true);
        if (pressed) {
            this._startOilShellPreview();
            return;
        }
        if (aiming) {
            this._updateOilShellAim(event);
            return;
        }
        if (release) {
            this._commitOilShellThrow();
            return;
        }
        if (cancelled) {
            this._cancelOilShellPreview();
        }
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
        var choices = this._buildEnergyUpgradeChoices();
        if (!choices || choices.length <= 0) {
            return;
        }
        var index = Math.floor(Math.random() * choices.length);
        this.applyTestUpgradeChoice(choices[index]);
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
    Player.prototype._ensureMultiplayerNameUI = function () {
        if (!this._fire._lifebar || this._fire._lbPlayerName) {
            return;
        }
        var nameNode = new cc.Node("_lbPlayerName");
        nameNode.parent = this._fire._lifebar;
        nameNode.setPosition(0, 26);
        nameNode.setContentSize(120, 24);
        nameNode.zIndex = 12;
        var nameLabel = nameNode.addComponent(cc.Label);
        nameLabel.fontSize = 18;
        nameLabel.lineHeight = 20;
        nameLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        nameLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        nameNode.color = cc.color(255, 255, 255, 255);
        nameNode["$Label"] = nameLabel;
        this._fire._lbPlayerName = nameNode;
    };
    Player.prototype.setMultiplayerDisplayName = function (name, isLocal) {
        if (isLocal === void 0) { isLocal = false; }
        this._ensureMultiplayerNameUI();
        if (!this._fire._lbPlayerName || !this._fire._lbPlayerName.$Label) {
            return;
        }
        var showName = name || "";
        this._fire._lbPlayerName.$Label.string = showName;
        this._fire._lbPlayerName.color = isLocal ? cc.color(180, 255, 180, 255) : cc.color(210, 230, 255, 255);
        this._fire._lbPlayerName.active = showName.length > 0;
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
            if (this._oilShellPreviewing) {
                this._refreshOilShellPreview();
            }
            this._refreshMoveEffect();
            this._refreshBarrelDir();
            this._refreshAngle(dt, false);
            this._refreshDisplayBarrelAngle(dt);
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
    Player.prototype._buildEnergyUpgradeChoices = function () {
        var config = yyp.config.Energy || {};
        var hpAdd = config.LevelHpAdd == null ? Math.max(25, Math.round(this._maxHp * 0.22)) : config.LevelHpAdd;
        var atkAdd = config.LevelDamageAdd == null
            ? (config.LevelAtkAdd == null ? Math.max(8, Math.round(this._atk * 0.18)) : config.LevelAtkAdd)
            : config.LevelDamageAdd;
        var speedAdd = config.LevelSpeedAdd == null ? 18 : config.LevelSpeedAdd;
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
    Player.prototype.getTestUpgradeChoices = function () {
        return this._buildEnergyUpgradeChoices();
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
    Player.prototype.showUpgradeToast = function (choice) {
        if (!choice || !this.node || !cc.isValid(this.node)) {
            return;
        }
        var toast = new cc.Node("_upgradeToast");
        toast.parent = this.node;
        toast.setPosition(0, this._radius + 76);
        toast.zIndex = 360;
        toast.opacity = 0;
        toast.scale = 0.88;
        var bg = toast.addComponent(cc.Graphics);
        bg.fillColor = cc.color(20, 24, 34, 228);
        bg.roundRect(-110, -20, 220, 40, 14);
        bg.fill();
        bg.lineWidth = 3;
        bg.strokeColor = choice.color;
        bg.roundRect(-110, -20, 220, 40, 14);
        bg.stroke();
        var labelNode = new cc.Node("_upgradeToastLabel");
        labelNode.parent = toast;
        labelNode.setContentSize(204, 30);
        labelNode.color = cc.color(255, 255, 255, 255);
        var label = labelNode.addComponent(cc.Label);
        label.string = choice.title + " " + choice.valueText;
        label.fontSize = 18;
        label.lineHeight = 22;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        toast.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.12), cc.scaleTo(0.12, 1), cc.moveBy(0.12, 0, 10)), cc.delayTime(0.7), cc.spawn(cc.fadeOut(0.22), cc.moveBy(0.22, 0, 18)), cc.removeSelf()));
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
    Player.prototype._getDisplayBarrelDir = function () {
        if (this._multiplayerMode && !this._multiplayerRemote && this._localPreviewBarrelDir && this._localPreviewBarrelDir.magSqr() > 0) {
            return this._localPreviewBarrelDir;
        }
        return this._barrelDir;
    };
    Player.prototype._refreshDisplayBarrelAngle = function (dt) {
        if (dt === void 0) { dt = 1 / 60; }
        if (!this._multiplayerMode || this._multiplayerRemote) {
            return;
        }
        var displayDir = this._getDisplayBarrelDir();
        if (!displayDir || displayDir.magSqr() <= 0) {
            return;
        }
        var fromAngle = this._fire._lyBarrel.angle;
        var toAngle = Utils_1.Utils.vectorsToDegress(displayDir);
        var disAngle = toAngle - fromAngle;
        if (disAngle > 180) {
            fromAngle = fromAngle + 360;
            disAngle = toAngle - fromAngle;
        }
        else if (disAngle < -180) {
            fromAngle = fromAngle - 360;
            disAngle = toAngle - fromAngle;
        }
        var maxTurnAngle = this._getFrameValue("AngularSpeed", 10, dt) * 1.6;
        if (maxTurnAngle <= 0 || Math.abs(disAngle) <= maxTurnAngle) {
            this._fire._lyBarrel.angle = toAngle;
        }
        else {
            this._fire._lyBarrel.angle = this._fire._lyBarrel.angle + (disAngle > 0 ? maxTurnAngle : -maxTurnAngle);
        }
        this._fire._lyBarrel.angle = Utils_1.Utils.correctionAngle(this._fire._lyBarrel.angle);
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
    Player.prototype._fireByMultiplayerCommand = function (fireData) {
        if (!fireData) {
            return;
        }
        var type = fireData.type || this.getMultiplayerFireType();
        var attackRadius = this._config.AttackRadius;
        var mutationData = this._getCurrentBulletMutationData();
        var networkMeta = {
            bulletId: fireData.id,
            ownerPlayerId: this._multiplayerPlayerId,
        };
        BulletE_1.Bullet.createBulletEx(type, this.node.position, this._barrelDir, this._fire._lyBarrel.height + 20, attackRadius, this._atk, this._camp, this.node.parent, this._map, 8, mutationData, networkMeta);
        if (!this._multiplayerRemote) {
            this._playShootFeedback(type, mutationData);
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
    Player.prototype._startOilShellPreview = function () {
        if (this._oilShellCount <= 0 || !this._map) {
            return;
        }
        this._oilShellPreviewing = true;
        var defaultDir = this._barrelDir && this._barrelDir.magSqr() > 0 ? cc.v2(this._barrelDir).normalize() : cc.v2(1, 0);
        this._oilShellAimDir = defaultDir;
        this._oilShellAimRatio = 1;
        this._refreshOilShellPreview();
    };
    Player.prototype._cancelOilShellPreview = function () {
        this._oilShellPreviewing = false;
        this._oilShellPreviewTarget = null;
        if (this._map && this._map.hideOilShellPreview) {
            this._map.hideOilShellPreview();
        }
    };
    Player.prototype._commitOilShellThrow = function () {
        if (!this._oilShellPreviewing || this._oilShellCount <= 0) {
            this._cancelOilShellPreview();
            return;
        }
        var target = this._oilShellPreviewTarget || this._getOilShellThrowTarget();
        var aimDir = cc.v2(this._oilShellAimDir || this._barrelDir || cc.v2(1, 0));
        if (aimDir.magSqr() > 0) {
            aimDir = aimDir.normalize();
        }
        else {
            aimDir = cc.v2(1, 0);
        }
        var aimRatio = Math.max(0, Math.min(1, this._oilShellAimRatio == null ? 1 : this._oilShellAimRatio));
        this._cancelOilShellPreview();
        if (!target) {
            return;
        }
        if (this._multiplayerMode && !this._multiplayerRemote) {
            yyp.eventCenter.emit("multiplayer-throw-tar", {
                dirX: Number(aimDir.x.toFixed(4)),
                dirY: Number(aimDir.y.toFixed(4)),
                ratio: Number(aimRatio.toFixed(4)),
            });
            return;
        }
        this._throwOilShellAt(target);
    };
    Player.prototype._getOilShellThrowTarget = function () {
        var attackRadius = this._config && this._config.AttackRadius != null ? this._config.AttackRadius : 420;
        var dir = this._oilShellAimDir && this._oilShellAimDir.magSqr() > 0 ? cc.v2(this._oilShellAimDir).normalize() : cc.v2(1, 0);
        var ratio = Math.max(0, Math.min(1, this._oilShellAimRatio == null ? 1 : this._oilShellAimRatio));
        var target = cc.v2(this.node.position).add(dir.mul(attackRadius * ratio));
        return this._map && this._map.clampMapInnerPosition
            ? this._map.clampMapInnerPosition(target, OIL_THROW_AREA_RADIUS * 0.55)
            : target;
    };
    Player.prototype._updateOilShellAim = function (event) {
        if (!this._oilShellPreviewing) {
            return;
        }
        if (event && event.dir && event.dir.magSqr && event.dir.magSqr() > 0.0001) {
            this._oilShellAimDir = cc.v2(event.dir).normalize();
        }
        if (event && Number.isFinite(event.ratio)) {
            this._oilShellAimRatio = Math.max(0, Math.min(1, Number(event.ratio)));
        }
        this._refreshOilShellPreview();
    };
    Player.prototype._refreshOilShellPreview = function () {
        if (!this._oilShellPreviewing || !this._map) {
            return;
        }
        this._oilShellPreviewTarget = this._getOilShellThrowTarget();
        if (this._map.showOilShellPreview && this._oilShellPreviewTarget) {
            this._map.showOilShellPreview(this.node.position, this._oilShellPreviewTarget, {
                radius: OIL_THROW_PREVIEW_ARC_HEIGHT,
                areaRadius: OIL_THROW_AREA_RADIUS,
            });
        }
    };
    Player.prototype._throwOilShellAt = function (target) {
        var _this = this;
        if (!target || this._oilShellCount <= 0) {
            return;
        }
        this._oilShellCount = Math.max(0, this._oilShellCount - 1);
        this._refreshSkillButtonMode();
        if (this._map && this._map.playOilShellThrow) {
            this._map.playOilShellThrow(this.node.position, target, {
                areaRadius: OIL_THROW_AREA_RADIUS,
                arcHeight: OIL_THROW_PREVIEW_ARC_HEIGHT,
                onLand: function () {
                    if (_this._map && _this._map.spawnOilSpill) {
                        _this._map.spawnOilSpill(target);
                    }
                }
            });
        }
        else {
            this._fireOilShell();
        }
        this._playShootGlow(OIL_SHELL_BULLET_TYPE, { effectColor: cc.color(130, 92, 52, 220) });
        if (this._map && this._map.playLightScreenShake) {
            this._map.playLightScreenShake();
        }
        MusicManager_1.MusicManager.playEffect("shoot");
    };
    Player.prototype._refreshSkillButtonMode = function () {
        if (this._multiplayerMode && this._multiplayerRemote) {
            return;
        }
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
    Player.prototype.applyMultiplayerHit = function (damage, hp) {
        if (!this._multiplayerMode) {
            this.beHit(damage);
            return;
        }
        var nextHp = hp;
        if (nextHp == null || nextHp < 0) {
            nextHp = this._hp - Math.max(0, damage || 0);
        }
        if (nextHp < 0) {
            nextHp = 0;
        }
        var didTakeDamage = nextHp < this._hp;
        this._hp = nextHp;
        this.refreshHp();
        if (didTakeDamage) {
            this._showPlayerHitEffect();
            if (!this._multiplayerRemote) {
                Utils_1.Utils.vibrate();
                MusicManager_1.MusicManager.playEffect("playerHit");
            }
        }
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    Player.prototype.syncMultiplayerHp = function (hp, maxHp) {
        if (maxHp === void 0) { maxHp = null; }
        if (!this._multiplayerMode) {
            return;
        }
        if (maxHp != null && maxHp > 0) {
            this._maxHp = maxHp;
        }
        if (hp == null) {
            return;
        }
        var nextHp = hp;
        if (nextHp < 0) {
            nextHp = 0;
        }
        if (this._maxHp > 0 && nextHp > this._maxHp) {
            nextHp = this._maxHp;
        }
        var didTakeDamage = nextHp < this._hp;
        this._hp = nextHp;
        this.refreshHp();
        if (didTakeDamage) {
            this._showPlayerHitEffect();
            if (!this._multiplayerRemote) {
                Utils_1.Utils.vibrate();
                MusicManager_1.MusicManager.playEffect("playerHit");
            }
        }
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    Player.prototype.syncMultiplayerState = function (state) {
        if (!this._multiplayerMode || !state) {
            return;
        }
        var prevHp = this._hp;
        var prevMaxHp = this._maxHp;
        var prevAtk = this._atk;
        var prevMoveSpeedScale = this._moveSpeedScale;
        var prevEnergyLevel = this._energyLevel;
        if (state.maxHp != null && state.maxHp > 0) {
            this._maxHp = state.maxHp;
        }
        if (state.hp != null) {
            var nextHp = state.hp;
            if (nextHp < 0) {
                nextHp = 0;
            }
            if (this._maxHp > 0 && nextHp > this._maxHp) {
                nextHp = this._maxHp;
            }
            this._hp = nextHp;
        }
        if (state.atk != null) {
            this._atk = state.atk;
        }
        if (state.moveSpeedScale != null && state.moveSpeedScale > 0) {
            this._moveSpeedScale = state.moveSpeedScale;
        }
        if (state.tarAmmoCount != null) {
            var nextTarAmmoCount = Math.max(0, state.tarAmmoCount);
            if (nextTarAmmoCount != this._oilShellCount) {
                this._oilShellCount = nextTarAmmoCount;
                this._refreshSkillButtonMode();
            }
        }
        if (state.energyLevel != null && state.energyLevel > 0) {
            this._energyLevel = state.energyLevel;
        }
        if (state.energyExp != null) {
            this._energyExp = Math.max(0, state.energyExp);
        }
        if (state.energyNeedExp != null && state.energyNeedExp > 0) {
            this._energyNeedExp = state.energyNeedExp;
        }
        if (this._energyLevel > prevEnergyLevel) {
            var choice = this._buildUpgradeChoiceFromStateDelta(prevMaxHp, prevAtk, prevMoveSpeedScale);
            if (choice) {
                this._showUpgradeFloat(choice);
                this._playUpgradeSelectFeedback(choice);
                this.showUpgradeToast(choice);
            }
        }
        var didTakeDamage = this._hp < prevHp;
        this.refreshHp();
        this._refreshEnergyUI();
        if (didTakeDamage) {
            this._showPlayerHitEffect();
            if (!this._multiplayerRemote) {
                Utils_1.Utils.vibrate();
                MusicManager_1.MusicManager.playEffect("playerHit");
            }
        }
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    Player.prototype._buildUpgradeChoiceFromStateDelta = function (prevMaxHp, prevAtk, prevMoveSpeedScale) {
        var hpDelta = this._maxHp - prevMaxHp;
        var atkDelta = this._atk - prevAtk;
        var speedRatioDelta = this._moveSpeedScale - prevMoveSpeedScale;
        var speedDelta = Math.round(speedRatioDelta * 100);
        if (hpDelta > 0) {
            return {
                id: "hp",
                title: "装甲强化",
                desc: "生命上限提升并立刻回满",
                shortLabel: "HP",
                valueText: "+" + hpDelta,
                amount: hpDelta,
                color: cc.color(120, 255, 170, 255),
            };
        }
        if (atkDelta > 0) {
            return {
                id: "atk",
                title: "火力强化",
                desc: "攻击力提升, 输出更高",
                shortLabel: "ATK",
                valueText: "+" + atkDelta,
                amount: atkDelta,
                color: cc.color(255, 185, 90, 255),
            };
        }
        if (speedDelta > 0) {
            return {
                id: "speed",
                title: "推进强化",
                desc: "移动速度提升, 走位更灵活",
                shortLabel: "SPD",
                valueText: "+" + speedDelta + "%",
                amount: speedDelta,
                color: cc.color(110, 210, 255, 255),
            };
        }
        return null;
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
        this._cancelOilShellPreview();
        this._refreshSkillButtonMode();
        _super.prototype.doDeath.call(this);
        if (this._multiplayerMode) {
            yyp.eventCenter.emit("multiplayer-player-death", {
                playerId: this._multiplayerPlayerId,
                isLocal: !this._multiplayerRemote
            });
        }
        else {
            yyp.eventCenter.emit("player-death", {});
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUM5QixJQUFNLDRCQUE0QixHQUFHLEdBQUcsQ0FBQztBQUN6QyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxJQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUNwQyxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNqQyxJQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUNuQyxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUN0QyxJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQztB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RUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVwQixLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3ZCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENB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QUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBM21FUSxNQUFNO1FBRGxCLE9BQU87T0FDSyxNQUFNLENBNm1FbEI7SUFBRCxhQUFDO0NBN21FRCxBQTZtRUMsQ0E3bUUyQixZQUFJLEdBNm1FL0I7QUE3bUVZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYW5rfSBmcm9tIFwiLi9UYW5rRVwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7QnVsbGV0fSBmcm9tIFwiLi9CdWxsZXRFXCI7XHJcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTREtNYW5hZ2VyIGZyb20gXCIuL3Nkay9zZGsvU0RLTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IFBMQVlFUl9TSE9PVF9JTlRFUlZBTCA9IDAuMzU7XHJcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9NQVggPSAzO1xyXG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSA9IDAuODtcclxuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUwgPSAwLjY7XHJcbmNvbnN0IFBMQVlFUl9QQUlEX1NIT1RfSFBfQ09TVCA9IDUgKiAoMSAtIDAuMSk7XHJcbmNvbnN0IFBMQVlFUl9FWFBfQkFTRSA9IDMwO1xyXG5jb25zdCBQTEFZRVJfRVhQX1NURVAgPSAxNTtcclxuY29uc3QgQ0hBUkdFX0NBTk5PTl9CVUxMRVRfVFlQRSA9IDk5O1xyXG5jb25zdCBPSUxfU0hFTExfQlVMTEVUX1RZUEUgPSAxMDA7XHJcbmNvbnN0IE9JTF9TSEVMTF9NQVhfQ09VTlQgPSAxO1xyXG5jb25zdCBPSUxfVEhST1dfUFJFVklFV19BUkNfSEVJR0hUID0gMTEwO1xyXG5jb25zdCBPSUxfVEhST1dfQVJFQV9SQURJVVMgPSAxMjA7XHJcbmNvbnN0IExPV19IUF9TQ1JFRU5fRkxBU0hfSU4gPSAwLjI7XHJcbmNvbnN0IExPV19IUF9TQ1JFRU5fRkxBU0hfT1VUID0gMC41O1xyXG5jb25zdCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0xPT1AgPSAzO1xyXG5jb25zdCBTSE9PVF9SRUNPSUxfRElTVEFOQ0UgPSAxMDtcclxuY29uc3QgU0hPT1RfUkVDT0lMX09VVF9USU1FID0gMC4wNDtcclxuY29uc3QgU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FID0gMC4xMTtcclxuY29uc3QgU0hPT1RfRkxBU0hfRkFERV9JTiA9IDAuMDI7XHJcbmNvbnN0IFNIT09UX0ZMQVNIX0ZBREVfT1VUID0gMC4wNztcclxuY29uc3QgU0FDUklGSUNFX0hQX1JBVElPID0gMC41O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFRhbmsge1xyXG5cclxuICAgIC8v5YaF6YOo5Y+Y6YePXHJcbiAgICBfbGV2ZWwgICAgICAgICAgPSAxOyAgICAgICAgLy/njqnlrrbnrYnnuqdcclxuXHJcbiAgICBfYnVsbGV0Q29kZVRpbWUgPSAwOyAgICAgICAgLy/lsITlh7vlhrfljbTml7bpl7RcclxuXHJcbiAgICBfaXNIaWdoQnVsbGV0ICAgPSBmYWxzZTsgICAgLy/kuInlj5Hpq5jpopHlrZDlvLlcclxuXHJcbiAgICBfc2tpbGwyVGltZSAgICAgPSAwOyAgICAgICAgLy/mioDog70yKOi2hee6p+WtkOW8uSnliankvZnml7bpl7RcclxuICAgIF9za2lsbDNUaW1lICAgICA9IDA7ICAgICAgICAvL+aKgOiDvTMo5peg5pWM6Ziy5b6hKeWJqeS9meaXtumXtFxyXG5cclxuICAgIF9pbkdhbWUgICAgICAgICA9IGZhbHNlOyAgICAvL+WcqOa4uOaIj+S4reS4reS9v+eUqFxyXG4gICAgX3ZpZXdNb2RlICAgICAgID0gZmFsc2U7ICAgIC8v5bGV56S65qih5byPXHJcbiAgICBfZnJlZUJ1bGxldENvdW50ID0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWDsgIC8v5b2T5YmN5YWN6LS55a2Q5by55pWw6YePXHJcbiAgICBfc3RvcEZpcmVUaW1lID0gMDsgICAgICAgICAgLy/lgZzngavorqHml7ZcclxuICAgIF9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwOyAvL+WFjei0ueWtkOW8ueaBouWkjeiuoeaXtlxyXG4gICAgX21vdmVJbnB1dERpciA9IGNjLnYyKDEsIDApOyAvL+enu+WKqOaRh+adhuebruagh+aWueWQkVxyXG4gICAgX21vdmVJbnB1dFJhdGlvID0gMDsgICAgICAgIC8v56e75Yqo5pGH5p2G55uu5qCH6YCf546HXHJcbiAgICBfbW92ZVNwZWVkU2NhbGUgPSAxOyAgICAgICAgLy/lsYDlhoXnp7vpgJ/lgI3njodcclxuICAgIF9lbmVyZ3lMZXZlbCA9IDE7ICAgICAgICAgICAvL+WxgOWGheiDvemHj+etiee6p1xyXG4gICAgX2VuZXJneUV4cCA9IDA7ICAgICAgICAgICAgIC8v5b2T5YmN57uP6aqMXHJcbiAgICBfZW5lcmd5TmVlZEV4cCA9IFBMQVlFUl9FWFBfQkFTRTsgLy/ljYfnuqfmiYDpnIDnu4/pqoxcclxuICAgIF9jaGFyZ2VDYW5ub25UaW1lID0gMDsgICAgICAvL+iThOWKm+eCruiThOWKm+aXtumXtFxyXG4gICAgX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7ICAgIC8v6JOE5Yqb54Ku5Ya35Y20XHJcbiAgICBfY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwOyAgLy/ok4Tlipvngq7lhrfljbTmgLvml7bplb9cclxuICAgIF9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IGZhbHNlO1xyXG4gICAgX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XHJcbiAgICBfY2hhcmdlRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICBfb2lsU2hlbGxDb3VudCA9IDA7XHJcbiAgICBfb2lsU2hlbGxQcmV2aWV3aW5nID0gZmFsc2U7XHJcbiAgICBfb2lsU2hlbGxQcmV2aWV3VGFyZ2V0ID0gbnVsbDtcclxuICAgIF9vaWxTaGVsbEFpbURpciA9IGNjLnYyKDEsIDApO1xyXG4gICAgX29pbFNoZWxsQWltUmF0aW8gPSAxO1xyXG4gICAgX2J1bGxldE11dGF0aW9uVHlwZSA9IFwiXCI7XHJcbiAgICBfYnVsbGV0TXV0YXRpb25EYXRhID0gbnVsbDtcclxuICAgIF9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUgPSBudWxsO1xyXG4gICAgX21vdmVFZmZlY3RJZCA9IC0xO1xyXG4gICAgX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSAtMTtcclxuICAgIF9sb3dIcFNjcmVlbkVmZmVjdCA9IG51bGw7XHJcbiAgICBfc2hvb3RJbnB1dERpciA9IGNjLnYyKDEsIDApOyAgIC8v5bCE5Ye75pGH5p2G55uu5qCH5pa55ZCRXHJcbiAgICBfbG9jYWxQcmV2aWV3QmFycmVsRGlyID0gbnVsbDsgICAvL+acrOWcsOiBlOacuueOqeWutueCrueuoemihOiniOaWueWQkSjku4XooajnjrDlsYIpXHJcbiAgICBfZnJhbWVJbnB1dCA9IG51bGw7ICAgICAgICAgICAgIC8v572R57uc5bin6L6T5YWlKOWkmuS6uilcclxuICAgIF9tdWx0aXBsYXllck1vZGUgPSBmYWxzZTsgICAgICAgLy/lpJrkurrmqKHlvI8o56aB55So5pys5Zyw5pGH5p2GKVxyXG4gICAgX211bHRpcGxheWVyUmVtb3RlID0gZmFsc2U7ICAgICAvL+WkmuS6uui/nOerr+eOqeWutlxyXG4gICAgX211bHRpcGxheWVyUGxheWVySWQgPSAtMTsgICAgICAvL+WkmuS6uueOqeWutklEXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwicGxheWVyXCI7ICAvL+mYteiQpVxyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHRoaXMuX3JhZGl1cyAqIDI7ICAgIC8v546p5a6255qE56Kw5pKe5qOA5rWL6IyD5Zu0KjJcclxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IFBMQVlFUl9TSE9PVF9JTlRFUlZBTDtcclxuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYO1xyXG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuX21vdmVJbnB1dERpciA9IHRoaXMuX2RpcjtcclxuICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5fbW92ZVNwZWVkU2NhbGUgPSAxO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUxldmVsID0gMTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgPSAwO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSB0aGlzLl9nZXRFbmVyZ3lOZWVkRXhwKCk7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1EaXIgPSB0aGlzLl9iYXJyZWxEaXIgJiYgdGhpcy5fYmFycmVsRGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHRoaXMuX2JhcnJlbERpcikubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID0gMTtcclxuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvblR5cGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9tb3ZlRWZmZWN0SWQgPSAtMTtcclxuICAgICAgICB0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Nob290SW5wdXREaXIgPSB0aGlzLl9iYXJyZWxEaXI7XHJcbiAgICAgICAgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWdpuWFi+exu+Wei1xyXG4gICAgc2V0UGxheWVyVHlwZSh0YW5rVHlwZSxwbGF5ZXJMZXZlbCkge1xyXG4gICAgICAgIHN1cGVyLnNldFRhbmtUeXBlKHRhbmtUeXBlKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+iuoeeul+eOqeWutuihgOmHjyDmlLvlh7tcclxuICAgICAgICB0aGlzLl9sZXZlbCA9IHBsYXllckxldmVsO1xyXG4gICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHAgPSB0aGlzLl9jb25maWcuSFAgKiAodGhpcy5fbGV2ZWwrMSk7XHJcbiAgICAgICAgdGhpcy5fYXRrID0gdGhpcy5fY29uZmlnLkFUSyAqICh0aGlzLl9sZXZlbCsxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNdWx0aXBsYXllclNldHVwUGF5bG9hZCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YW5rVHlwZTogdGhpcy5fdGFua1R5cGUsXHJcbiAgICAgICAgICAgIHBsYXllckxldmVsOiB0aGlzLl9sZXZlbCxcclxuICAgICAgICAgICAgYmFzZUhwOiB0aGlzLl9tYXhIcCxcclxuICAgICAgICAgICAgYmFzZUF0azogdGhpcy5fYXRrLFxyXG4gICAgICAgICAgICBiYXNlU3BlZWQ6IHRoaXMuX2dldENvbmZpZ1ZhbHVlKFwiU3BlZWRcIiwgMCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMllVJXHJcbiAgICBfaW5pdFVJKCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgICAgIHRoaXMuX2luaXRFbmVyZ3lVSSgpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgIC8v5pGH5p2G5LqL5Lu2XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdqb3ktc3RpY2stc2hvb3QnLHRoaXMuX2RvU2hvb3RKb3lTdGljayx0aGlzKTsgLy/lsITlh7vmkYfmnYbkuovku7ZcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2NoYXJnZS1jYW5ub24tcHJlc3MnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUHJlc3MsdGhpcyk7IC8v6JOE5Yqb54Ku5oyJ5LiLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjaGFyZ2UtY2Fubm9uLXJlbGVhc2UnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZSx0aGlzKTsgLy/ok4Tlipvngq7mnb7lvIBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ29pbC1zaGVsbC10cmlnZ2VyJyx0aGlzLl9kb09pbFNoZWxsVHJpZ2dlcix0aGlzKTsgLy/nhKbmsrnlvLnlj5HlsIRcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItc2FjcmlmaWNlJyx0aGlzLl9kb1NhY3JpZmljZSx0aGlzKTsgLy/njK7npa3mjInpkq5cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItY292ZXItYWN0aW9uJyx0aGlzLl9kb0NvdmVyQWN0aW9uLHRoaXMpOyAvL+aOqeS9k+WQuOmZhC/liIbnprtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItc2tpbGwnLHRoaXMuX2RvU2tpbGwsdGhpcyk7ICAgICAvL+inpuWPkeaKgOiDvVxyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdqb3ktc3RpY2snLHRoaXMuX2RvSm95U3RpY2ssdGhpcyk7ICAgICAvL+aRh+adhuS6i+S7tlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2pveS1zdGljay1zaG9vdCcsdGhpcy5fZG9TaG9vdEpveVN0aWNrLHRoaXMpOyAvL+WwhOWHu+aRh+adhuS6i+S7tlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2NoYXJnZS1jYW5ub24tcHJlc3MnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUHJlc3MsdGhpcyk7IC8v6JOE5Yqb54Ku5oyJ5LiLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY2hhcmdlLWNhbm5vbi1yZWxlYXNlJyx0aGlzLl9kb0NoYXJnZUNhbm5vblJlbGVhc2UsdGhpcyk7IC8v6JOE5Yqb54Ku5p2+5byAXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignb2lsLXNoZWxsLXRyaWdnZXInLHRoaXMuX2RvT2lsU2hlbGxUcmlnZ2VyLHRoaXMpOyAvL+eEpuayueW8ueWPkeWwhFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItc2FjcmlmaWNlJyx0aGlzLl9kb1NhY3JpZmljZSx0aGlzKTsgLy/njK7npa3mjInpkq5cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd0cmlnZ2VyLWNvdmVyLWFjdGlvbicsdGhpcy5fZG9Db3ZlckFjdGlvbix0aGlzKTsgLy/mjqnkvZPlkLjpmYQv5YiG56a7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndHJpZ2dlci1za2lsbCcsdGhpcy5fZG9Ta2lsbCx0aGlzKTsgICAgLy/op6blj5HmioDog71cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mkYfmnYbkuovku7ZcclxuICAgIF9kb0pveVN0aWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSBldmVudC5kaXI7ICAgICAgLy/mlrnlkJFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IGV2ZW50LnJhdGlvOyAgLy/pgJ/njodcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsITlh7vmkYfmnYbkuovku7ZcclxuICAgIF9kb1Nob290Sm95U3RpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHJldHVybjtcclxuICAgICAgICBpZiAoZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvb3RJbnB1dERpciA9IGV2ZW50LmRpcjtcclxuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gZXZlbnQuZGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuZmlyZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90cnlGaXJlT25jZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNdWx0aXBsYXllckxvY2FsQWltUHJldmlldyhkaXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGlyIHx8IGRpci5tYWdTcXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyID0gY2MudjIoZGlyKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+e9kee7nOW4p+i+k+WFpSjlpJrkurrmqKHlvI8pXHJcbiAgICBzZXRGcmFtZUlucHV0KGlucHV0cykge1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lSW5wdXQgPSBpbnB1dHM7XHJcbiAgICAgICAgaWYgKGlucHV0cyAmJiBpbnB1dHMudGhyb3dUYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1SYXRpbyA9IE51bWJlci5pc0Zpbml0ZShpbnB1dHMudGhyb3dUYXIucmF0aW8pID8gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgaW5wdXRzLnRocm93VGFyLnJhdGlvKSkgOiB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvO1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGlucHV0cy50aHJvd1Rhci5kaXJYKSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLnRocm93VGFyLmRpclkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyRGlyID0gY2MudjIoaW5wdXRzLnRocm93VGFyLmRpclgsIGlucHV0cy50aHJvd1Rhci5kaXJZKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJEaXIubWFnU3FyKCkgPiAwLjAwMDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbURpciA9IHRhckRpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgaWYgKGlucHV0cy51cCkgZGlyLnkgKz0gMTtcclxuICAgICAgICBpZiAoaW5wdXRzLmRvd24pIGRpci55IC09IDE7XHJcbiAgICAgICAgaWYgKGlucHV0cy5sZWZ0KSBkaXIueCAtPSAxO1xyXG4gICAgICAgIGlmIChpbnB1dHMucmlnaHQpIGRpci54ICs9IDE7XHJcbiAgICAgICAgaWYgKGRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gZGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5wdXRzLmFpbSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLmFpbS54KSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLmFpbS55KSkge1xyXG4gICAgICAgICAgICBsZXQgYWltRGlyID0gY2MudjIoaW5wdXRzLmFpbS54LCBpbnB1dHMuYWltLnkpO1xyXG4gICAgICAgICAgICBpZiAoYWltRGlyLm1hZ1NxcigpID4gMC4wMDAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9vdElucHV0RGlyID0gYWltRGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fc2hvb3RJbnB1dERpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNldEZyYW1lSW5wdXQtLS1pbnB1dHNcIixpbnB1dHMpXHJcbiAgICAgICAgaWYgKGlucHV0cy5maXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVCeU11bHRpcGxheWVyQ29tbWFuZChpbnB1dHMuZmlyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE11bHRpcGxheWVyRmlyZVR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9za2lsbDJUaW1lID4gMCkgPyB0aGlzLl9jb25maWcuQlR5cGUyIDogdGhpcy5fY29uZmlnLkJUeXBlMTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9DaGFyZ2VDYW5ub25QcmVzcyhldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID4gMCB8fCB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9oaWRlQ2hhcmdlRWZmZWN0KCk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLXByb2dyZXNzXCIsIHtwcm9ncmVzczogMH0pO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlQ2Fubm9uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9kb0NoYXJnZUNhbm5vblJlbGVhc2UoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlIHx8IHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlQ2hhcmdlQ2Fubm9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZXNldENoYXJnZUNhbm5vbigpO1xyXG4gICAgfVxyXG5cclxuICAgIF9kb1NhY3JpZmljZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3RyeVNhY3JpZmljZUhwRm9yRW5lcmd5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2RvT2lsU2hlbGxUcmlnZ2VyKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJlc3NlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LnByZXNzZWQgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCBhaW1pbmcgPSAhIShldmVudCAmJiBldmVudC5haW1pbmcgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCByZWxlYXNlID0gISEoZXZlbnQgJiYgZXZlbnQucmVsZWFzZSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LmNhbmNlbGxlZCA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHByZXNzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWltaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU9pbFNoZWxsQWltKGV2ZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVsZWFzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21taXRPaWxTaGVsbFRocm93KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2RvQ292ZXJBY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSB8fCAhdGhpcy5fbWFwIHx8ICF0aGlzLl9tYXAudHJ5VG9nZ2xlQ292ZXJUZXN0QXR0YWNobWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcC50cnlUb2dnbGVDb3ZlclRlc3RBdHRhY2htZW50KHRoaXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+inpuWPkeaKgOiDvVxyXG4gICAgX2RvU2tpbGwoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbElkID0gZXZlbnQuc2tpbGxJZDsgICAgLy/mlrnlkJFcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwi6Kem5Y+R5LqG5oqA6IO9IFwiLHNraWxsSWQpO1xyXG4gICAgICAgICAgICBpZiAoc2tpbGxJZCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgnYWRkLWNvaW4nLHtjb3VudDp0aGlzLl9jb25maWcuQ29pbi8xMCxwb3NpdGlvbjpVdGlscy5nZXRXb3JsZFBvc2l0aW9uKHRoaXMubm9kZSl9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRW5lcmd5KHRoaXMuX21heEhwIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lICs9IDE1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSArPSAxNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PaWxTaGVsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICB0aGlzLl9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIt+aWsOeOqeWutuS9jee9rlxyXG4gICAgX3JlZnJlc2hQb3NpdGlvbihkdCkge1xyXG4gICAgICAgIC8v5aSa5Lq65qih5byP77ya5Zyoc2V0RnJhbWVJbnB1dOaYvuW8j+iwg+eUqOWJjeaLkue7neS4gOWIh+enu+WKqFxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lSW5wdXQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9mcmFtZUlucHV0LnVwICYmICF0aGlzLl9mcmFtZUlucHV0LmRvd24gJiYgIXRoaXMuX2ZyYW1lSW5wdXQubGVmdCAmJiAhdGhpcy5fZnJhbWVJbnB1dC5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZWZyZXNoTW92ZVNwZWVkKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90dXJuRGlyVG8odGhpcy5fbW92ZUlucHV0RGlyLCBkdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VyclBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICAvL+eisOaSnua1i+ivlVxyXG4gICAgICAgIGxldCB3aWxsUG9zaXRpb24gPSB0aGlzLl9nZXRXaWxsUG9zaXRpb24oY3VyclBvc2l0aW9uLCB0aGlzLl9kaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVySXRlbXMgPSB0aGlzLl9tYXAudGVzdENvbGxpZGVycyh3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XHJcbiAgICAgICAgaWYgKGNvbGxpZGVySXRlbXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gdGhpcy5fZ2V0VGVzdERpcihjdXJyUG9zaXRpb24sIHRoaXMuX3JhZGl1cywgdGhpcy5fZGlyLCBjb2xsaWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHRlc3REaXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRlc3REaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX21hcC5jbGFtcE1hcElubmVyUG9zaXRpb24od2lsbFBvc2l0aW9uLCB0aGlzLl9yYWRpdXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoTW92ZVNwZWVkKGR0KSB7XHJcbiAgICAgICAgbGV0IHRlcnJhaW5GYWN0b3IgPSB0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmdldFRlcnJhaW5TcGVlZEZhY3RvclxyXG4gICAgICAgICAgICA/IHRoaXMuX21hcC5nZXRUZXJyYWluU3BlZWRGYWN0b3IodGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9yYWRpdXMpXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBsZXQgbWF4U3BlZWQgPSB0aGlzLl9nZXRDb25maWdWYWx1ZShcIlNwZWVkXCIsIDApICogdGhpcy5fbW92ZVNwZWVkU2NhbGUgKiB0ZXJyYWluRmFjdG9yO1xyXG4gICAgICAgIGxldCB0YXJnZXRTcGVlZCA9IHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCA/IG1heFNwZWVkICogdGhpcy5fbW92ZUlucHV0UmF0aW8gOiAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkICs9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBY2NlbGVyYXRpb25cIiwgbWF4U3BlZWQsIGR0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IHRhcmdldFNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSB0YXJnZXRTcGVlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiB0YXJnZXRTcGVlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgLT0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkRlY2VsZXJhdGlvblwiLCBtYXhTcGVlZCwgZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IHRhcmdldFNwZWVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEVuZXJneSh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNvdmVySHAgPSB0aGlzLl9tYXhIcCAtIHRoaXMuX2hwO1xyXG4gICAgICAgIGlmIChyZWNvdmVySHAgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGRIcCA9IE1hdGgubWluKHJlY292ZXJIcCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9ocCArPSBhZGRIcDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gYWRkSHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1NhY3JpZmljZVRpcChcIuihgOmHj+i/h+S9jizml6Dms5XnjK7npa1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXhTYWNyaWZpY2VIcCA9IHRoaXMuX2hwIC0gMTtcclxuICAgICAgICBsZXQgc2FjcmlmaWNlSHAgPSBNYXRoLm1pbih0aGlzLl9ocCAqIFNBQ1JJRklDRV9IUF9SQVRJTywgbWF4U2FjcmlmaWNlSHApO1xyXG4gICAgICAgIGlmIChzYWNyaWZpY2VIcCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTYWNyaWZpY2VUaXAoXCLlvZPliY3ml6Dms5XnjK7npa1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hwIC09IHNhY3JpZmljZUhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cChzYWNyaWZpY2VIcCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheVNhY3JpZmljZUZlZWRiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FkZEVuZXJneUV4cChleHApIHtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgKz0gZXhwO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9lbmVyZ3lFeHAgPj0gdGhpcy5fZW5lcmd5TmVlZEV4cCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgLT0gdGhpcy5fZW5lcmd5TmVlZEV4cDtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwrKztcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TmVlZEV4cCA9IHRoaXMuX2dldEVuZXJneU5lZWRFeHAoKTtcclxuICAgICAgICAgICAgdGhpcy5fbGV2ZWxVcEJ5RW5lcmd5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRFbmVyZ3lOZWVkRXhwKCkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgYmFzZSA9IGNvbmZpZy5FeHBCYXNlID09IG51bGwgPyBQTEFZRVJfRVhQX0JBU0UgOiBjb25maWcuRXhwQmFzZTtcclxuICAgICAgICBsZXQgc3RlcCA9IGNvbmZpZy5FeHBTdGVwID09IG51bGwgPyBQTEFZRVJfRVhQX1NURVAgOiBjb25maWcuRXhwU3RlcDtcclxuICAgICAgICByZXR1cm4gYmFzZSArICh0aGlzLl9lbmVyZ3lMZXZlbCAtIDEpICogc3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBfbGV2ZWxVcEJ5RW5lcmd5KCkge1xyXG4gICAgICAgIGxldCBjaG9pY2VzID0gdGhpcy5fYnVpbGRFbmVyZ3lVcGdyYWRlQ2hvaWNlcygpO1xyXG4gICAgICAgIGlmICghY2hvaWNlcyB8fCBjaG9pY2VzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNob2ljZXMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlc1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0RW5lcmd5VUkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9saWZlYmFyIHx8IHRoaXMuX2ZpcmUuX2xiSHBMZXZlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGV2ZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJIcExldmVsXCIpO1xyXG4gICAgICAgIGxldmVsTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9saWZlYmFyO1xyXG4gICAgICAgIGxldmVsTm9kZS5zZXRQb3NpdGlvbigtMzQsIDApO1xyXG4gICAgICAgIGxldmVsTm9kZS5zZXRDb250ZW50U2l6ZSgzNiwgMjQpO1xyXG4gICAgICAgIGxldmVsTm9kZS56SW5kZXggPSAxMDtcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IGxldmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZm9udFNpemUgPSAxODtcclxuICAgICAgICBsZXZlbExhYmVsLmxpbmVIZWlnaHQgPSAyMDtcclxuICAgICAgICBsZXZlbExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGV2ZWxOb2RlW1wiJExhYmVsXCJdID0gbGV2ZWxMYWJlbDtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYkhwTGV2ZWwgPSBsZXZlbE5vZGU7XHJcblxyXG4gICAgICAgIGxldCBleHBOb2RlID0gbmV3IGNjLk5vZGUoXCJfZXhwQmFyXCIpO1xyXG4gICAgICAgIGV4cE5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fbGlmZWJhcjtcclxuICAgICAgICBleHBOb2RlLnNldFBvc2l0aW9uKC0zNCwgMCk7XHJcbiAgICAgICAgZXhwTm9kZS5zZXRDb250ZW50U2l6ZSg0NCwgNDQpO1xyXG4gICAgICAgIGV4cE5vZGUuekluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoXCJfZXhwQmdcIik7XHJcbiAgICAgICAgYmcucGFyZW50ID0gZXhwTm9kZTtcclxuICAgICAgICBsZXQgYmdHcmFwaGljcyA9IGJnLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmdHcmFwaGljcy5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig1MCwgNjgsIDc1LCAyMjApO1xyXG4gICAgICAgIGJnR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE4KTtcclxuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgYmFyID0gbmV3IGNjLk5vZGUoXCJfZXhwUHJvZ3Jlc3NcIik7XHJcbiAgICAgICAgYmFyLnBhcmVudCA9IGV4cE5vZGU7XHJcbiAgICAgICAgbGV0IGJhckdyYXBoaWNzID0gYmFyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmFyR3JhcGhpY3MubGluZVdpZHRoID0gNTtcclxuICAgICAgICBiYXJHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDkwLCAyNTUsIDE0MCwgMjU1KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9leHBCYXIgPSBleHBOb2RlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzID0gYmFyO1xyXG4gICAgICAgIGJhcltcIiRHcmFwaGljc1wiXSA9IGJhckdyYXBoaWNzO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoRW5lcmd5VUkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2xiSHBMZXZlbCAmJiB0aGlzLl9maXJlLl9sYkhwTGV2ZWwuJExhYmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2xiSHBMZXZlbC4kTGFiZWwuc3RyaW5nID0gdGhpcy5fZW5lcmd5TGV2ZWwudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9leHBQcm9ncmVzcyAmJiB0aGlzLl9maXJlLl9leHBQcm9ncmVzcy4kR3JhcGhpY3MpIHtcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5fZW5lcmd5TmVlZEV4cCA+IDAgPyB0aGlzLl9lbmVyZ3lFeHAgLyB0aGlzLl9lbmVyZ3lOZWVkRXhwIDogMDtcclxuICAgICAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MuJEdyYXBoaWNzO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDkwLCAyNTUsIDE0MCwgMjU1KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuYXJjKDAsIDAsIDE4LCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogcHJvZ3Jlc3MsIGZhbHNlKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2ZpcmUuX2V4cEJhciAmJiB0aGlzLl9maXJlLl9leHBCYXIuJFByb2dyZXNzQmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2V4cEJhci4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLl9lbmVyZ3lOZWVkRXhwID4gMCA/IHRoaXMuX2VuZXJneUV4cCAvIHRoaXMuX2VuZXJneU5lZWRFeHAgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZW5zdXJlTXVsdGlwbGF5ZXJOYW1lVUkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9saWZlYmFyIHx8IHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmFtZU5vZGUgPSBuZXcgY2MuTm9kZShcIl9sYlBsYXllck5hbWVcIik7XHJcbiAgICAgICAgbmFtZU5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fbGlmZWJhcjtcclxuICAgICAgICBuYW1lTm9kZS5zZXRQb3NpdGlvbigwLCAyNik7XHJcbiAgICAgICAgbmFtZU5vZGUuc2V0Q29udGVudFNpemUoMTIwLCAyNCk7XHJcbiAgICAgICAgbmFtZU5vZGUuekluZGV4ID0gMTI7XHJcbiAgICAgICAgbGV0IG5hbWVMYWJlbCA9IG5hbWVOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbmFtZUxhYmVsLmZvbnRTaXplID0gMTg7XHJcbiAgICAgICAgbmFtZUxhYmVsLmxpbmVIZWlnaHQgPSAyMDtcclxuICAgICAgICBuYW1lTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBuYW1lTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIG5hbWVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICBuYW1lTm9kZVtcIiRMYWJlbFwiXSA9IG5hbWVMYWJlbDtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYlBsYXllck5hbWUgPSBuYW1lTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNdWx0aXBsYXllckRpc3BsYXlOYW1lKG5hbWUsIGlzTG9jYWwgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuX2Vuc3VyZU11bHRpcGxheWVyTmFtZVVJKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9sYlBsYXllck5hbWUgfHwgIXRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZS4kTGFiZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNob3dOYW1lID0gbmFtZSB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZS4kTGFiZWwuc3RyaW5nID0gc2hvd05hbWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lLmNvbG9yID0gaXNMb2NhbCA/IGNjLmNvbG9yKDE4MCwgMjU1LCAxODAsIDI1NSkgOiBjYy5jb2xvcigyMTAsIDIzMCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZS5hY3RpdmUgPSBzaG93TmFtZS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93U2FjcmlmaWNlVGlwKHRleHQpIHtcclxuICAgICAgICBsZXQgY2hhbm5lbCA9IFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpO1xyXG4gICAgICAgIGlmIChjaGFubmVsICYmIGNoYW5uZWwuc2hvd1RvYXN0KSB7XHJcbiAgICAgICAgICAgIGNoYW5uZWwuc2hvd1RvYXN0KHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYy5sb2codGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5U2FjcmlmaWNlRmVlZGJhY2soKSB7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XHJcbiAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xyXG5cclxuICAgICAgICBsZXQgd2F2ZSA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZVdhdmVcIik7XHJcbiAgICAgICAgd2F2ZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgd2F2ZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB3YXZlLnpJbmRleCA9IDI4NjtcclxuICAgICAgICB3YXZlLm9wYWNpdHkgPSAyMTA7XHJcbiAgICAgICAgd2F2ZS5zY2FsZSA9IDAuNzI7XHJcbiAgICAgICAgbGV0IHdhdmVHcmFwaGljcyA9IHdhdmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICB3YXZlR3JhcGhpY3MubGluZVdpZHRoID0gNztcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDg4LCA4MiwgMjM1KTtcclxuICAgICAgICB3YXZlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE2KTtcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI2LCAyLjMpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjI2KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZ2xvdy56SW5kZXggPSAyODU7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDcyLCA2OCwgNzApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMSwgMTkwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjIyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xOCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuNzgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCl7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcclxuICAgICAgICAgICAgLy/lpJrkurrmqKHlvI/vvJrmnKrmnInluKfovpPlhaXliY3vvIzlrozlhajkuI3lpITnkIbku7vkvZXpgLvovpFcclxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9mcmFtZUlucHV0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDsgLy8g5LuN6ZyA57Sv6K6h5Ya35Y206YG/5YWN6aaW5bin5bCx6IO96L+e5bCEXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcC5fcGF1c2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZyZWVCdWxsZXRSZWNvdmVyKGR0KTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2hhcmdlQ2Fubm9uKGR0KTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMb3dIcFZpc3VhbChkdCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v546p5a625ZKM5oqA6IO9aWNvbiznorDmkp7mo4DmtYtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXllclNraWxsSWNvbkNvbGxpc2lvblRlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hQb3NpdGlvbihkdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQmFycmVsRGlyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hBbmdsZShkdCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRGlzcGxheUJhcnJlbEFuZ2xlKGR0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3luY0F0dGFjaGVkQ292ZXJUZXN0Q292ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5zeW5jQXR0YWNoZWRDb3ZlclRlc3RDb3Zlcih0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXAucmVmcmVzaENvdmVyVGVzdEJ1dHRvbih0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIOaKgOiDvTIo6LaF57qn5a2Q5by5KVxyXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lID0gdGhpcy5fc2tpbGwyVGltZSA8IDAgPyAwIDogdGhpcy5fc2tpbGwyVGltZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3BTa2lsbDIuYWN0aXZlID0gdGhpcy5fc2tpbGwyVGltZSA+IDA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyDmioDog70zKOaXoOaVjOmYsuW+oSlcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSA9IHRoaXMuX3NraWxsM1RpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsM1RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwzLmFjdGl2ZSA9IHRoaXMuX3NraWxsM1RpbWUgPiAwO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8v5pi+56S66ZOg55SyXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwQXJtb3VyLmFjdGl2ZSA9IHRoaXMuX3NraWxsM1RpbWUgPiAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWYgPSB0aGlzLl9za2lsbDNUaW1lID4gMCA/IDEwMDAwMDAwIDogMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB0aGlzLl9tYXAuanVkZ2V6SW5kZXgodGhpcy5ub2RlLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX3ZpZXdNb2RlKXtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3ModGhpcy5fZGlyLC0wLjUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IHRoaXMuX2RpcjtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdGluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZEVuZXJneVVwZ3JhZGVDaG9pY2VzKCkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgaHBBZGQgPSBjb25maWcuTGV2ZWxIcEFkZCA9PSBudWxsID8gTWF0aC5tYXgoMjUsIE1hdGgucm91bmQodGhpcy5fbWF4SHAgKiAwLjIyKSkgOiBjb25maWcuTGV2ZWxIcEFkZDtcclxuICAgICAgICBsZXQgYXRrQWRkID0gY29uZmlnLkxldmVsRGFtYWdlQWRkID09IG51bGxcclxuICAgICAgICAgICAgPyAoY29uZmlnLkxldmVsQXRrQWRkID09IG51bGwgPyBNYXRoLm1heCg4LCBNYXRoLnJvdW5kKHRoaXMuX2F0ayAqIDAuMTgpKSA6IGNvbmZpZy5MZXZlbEF0a0FkZClcclxuICAgICAgICAgICAgOiBjb25maWcuTGV2ZWxEYW1hZ2VBZGQ7XHJcbiAgICAgICAgbGV0IHNwZWVkQWRkID0gY29uZmlnLkxldmVsU3BlZWRBZGQgPT0gbnVsbCA/IDE4IDogY29uZmlnLkxldmVsU3BlZWRBZGQ7XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImhwXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLoo4XnlLLlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi55Sf5ZG95LiK6ZmQ5o+Q5Y2H5bm256uL5Yi75Zue5ruhXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIkhQXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgaHBBZGQsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGhwQWRkLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDEyMCwgMjU1LCAxNzAsIDI1NSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImF0a1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi54Gr5Yqb5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuaUu+WHu+WKm+aPkOWNhywg6L6T5Ye65pu06auYXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIkFUS1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIGF0a0FkZCxcclxuICAgICAgICAgICAgICAgIGFtb3VudDogYXRrQWRkLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDI1NSwgMTg1LCA5MCwgMjU1KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwic3BlZWRcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaOqOi/m+W8uuWMllwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnp7vliqjpgJ/luqbmj5DljYcsIOi1sOS9jeabtOeBtea0u1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJTUERcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBzcGVlZEFkZCArIFwiJVwiLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBzcGVlZEFkZCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMTAsIDIxMCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVzdFVwZ3JhZGVDaG9pY2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWlsZEVuZXJneVVwZ3JhZGVDaG9pY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlcygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJib3VuY2VcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWPjeW8ueWtkOW8uVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnorDlopnlkI7oh6rliqjlj43lvLkx5qyhXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIuWPjVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIngxXCIsXHJcbiAgICAgICAgICAgICAgICBib3VuY2VDb3VudDogMSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcig5MCwgMTgwLCAyNTUsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBlZmZlY3RDb2xvcjogY2MuY29sb3IoOTAsIDE4MCwgMjU1LCAyMTApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJwZW5ldHJhdGVcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuepv+mAj+WtkOW8uVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLov57nu63nqb/pgI8z5Liq55uu5qCH5ZCO5raI5aSxXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIuepv1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIngzXCIsXHJcbiAgICAgICAgICAgICAgICBwZW5ldHJhdGVDb3VudDogMyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigyNTUsIDkyLCA5MiwgMjU1KSxcclxuICAgICAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjYy5jb2xvcigyNTUsIDkyLCA5MiwgMjEwKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiaGVhdnlcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIumHjeeCruWtkOW8uVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLkvKTlrrPmj5DljYc2MCUsIOWtkOW8ueabtOWkp1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCLph41cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrNjAlXCIsXHJcbiAgICAgICAgICAgICAgICBkYW1hZ2VSYXRpbzogMS42LFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDEuMzUsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCAyMTAsIDkwLCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDI1NSwgMjEwLCA5MCwgMjEwKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIWNob2ljZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hvaWNlLmlkID09IFwiaHBcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhIcCArPSBjaG9pY2UuYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX21heEhwO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjaG9pY2UuaWQgPT0gXCJhdGtcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9hdGsgKz0gY2hvaWNlLmFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2hvaWNlLmlkID09IFwic3BlZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlU3BlZWRTY2FsZSArPSBjaG9pY2UuYW1vdW50IC8gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2hvd1VwZ3JhZGVGbG9hdChjaG9pY2UpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseVRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZShjaG9pY2UpIHtcclxuICAgICAgICBpZiAoIWNob2ljZSB8fCAhY2hvaWNlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uVHlwZSA9IGNob2ljZS5pZDtcclxuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgIGlkOiBjaG9pY2UuaWQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBjaG9pY2UudGl0bGUsXHJcbiAgICAgICAgICAgIHNob3J0TGFiZWw6IGNob2ljZS5zaG9ydExhYmVsLFxyXG4gICAgICAgICAgICB2YWx1ZVRleHQ6IGNob2ljZS52YWx1ZVRleHQsXHJcbiAgICAgICAgICAgIGJvdW5jZUNvdW50OiBjaG9pY2UuYm91bmNlQ291bnQgfHwgMCxcclxuICAgICAgICAgICAgcGVuZXRyYXRlQ291bnQ6IGNob2ljZS5wZW5ldHJhdGVDb3VudCB8fCAwLFxyXG4gICAgICAgICAgICBkYW1hZ2VSYXRpbzogY2hvaWNlLmRhbWFnZVJhdGlvIHx8IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiBjaG9pY2Uuc2NhbGUgfHwgMSxcclxuICAgICAgICAgICAgY29sb3I6IGNob2ljZS5jb2xvcixcclxuICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNob2ljZS5lZmZlY3RDb2xvciB8fCBjaG9pY2UuY29sb3IsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2hvd0J1bGxldE11dGF0aW9uTWVkYWwodGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgZGF0YS5jb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5jb2xvcjtcclxuICAgICAgICBkYXRhLmVmZmVjdENvbG9yID0gdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93VXBncmFkZUZsb2F0KGNob2ljZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlLnBhcmVudCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZmxvYXROb2RlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUZsb2F0XCIpO1xyXG4gICAgICAgIGZsb2F0Tm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGZsb2F0Tm9kZS5zZXRQb3NpdGlvbihjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxMTAsIDApKTtcclxuICAgICAgICBmbG9hdE5vZGUuekluZGV4ID0gNjUwMDtcclxuICAgICAgICBmbG9hdE5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZmxvYXROb2RlLnNjYWxlID0gMC44MjtcclxuXHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUJhZGdlXCIpO1xyXG4gICAgICAgIGJhZGdlLnBhcmVudCA9IGZsb2F0Tm9kZTtcclxuICAgICAgICBiYWRnZS5zZXRQb3NpdGlvbigtNDQsIDQpO1xyXG4gICAgICAgIGxldCBiYWRnZUdyYXBoaWNzID0gYmFkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyNCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI0KTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgYmFkZ2VMYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQmFkZ2VMYWJlbFwiKTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg1NCwgMzIpO1xyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsID0gYmFkZ2VMYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBiYWRnZUxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuZm9udFNpemUgPSBjaG9pY2Uuc2hvcnRMYWJlbC5sZW5ndGggPiAyID8gMTUgOiAxODtcclxuICAgICAgICBiYWRnZUxhYmVsLmxpbmVIZWlnaHQgPSAyMDtcclxuICAgICAgICBiYWRnZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVmFsdWVcIik7XHJcbiAgICAgICAgdmFsdWVOb2RlLnBhcmVudCA9IGZsb2F0Tm9kZTtcclxuICAgICAgICB2YWx1ZU5vZGUuc2V0UG9zaXRpb24oMjIsIDgpO1xyXG4gICAgICAgIHZhbHVlTm9kZS5jb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICB2YWx1ZU5vZGUuc2V0Q29udGVudFNpemUoMTcwLCAzOCk7XHJcbiAgICAgICAgbGV0IHZhbHVlTGFiZWwgPSB2YWx1ZU5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB2YWx1ZUxhYmVsLnN0cmluZyA9IGNob2ljZS52YWx1ZVRleHQ7XHJcbiAgICAgICAgdmFsdWVMYWJlbC5mb250U2l6ZSA9IDM0O1xyXG4gICAgICAgIHZhbHVlTGFiZWwubGluZUhlaWdodCA9IDM4O1xyXG4gICAgICAgIHZhbHVlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ7XHJcbiAgICAgICAgdmFsdWVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVGl0bGVcIik7XHJcbiAgICAgICAgdGl0bGVOb2RlLnBhcmVudCA9IGZsb2F0Tm9kZTtcclxuICAgICAgICB0aXRsZU5vZGUuc2V0UG9zaXRpb24oMTYsIC0yNCk7XHJcbiAgICAgICAgdGl0bGVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcclxuICAgICAgICB0aXRsZU5vZGUuc2V0Q29udGVudFNpemUoMjIwLCAyOCk7XHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWwgPSB0aXRsZU5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IGNob2ljZS50aXRsZTtcclxuICAgICAgICB0aXRsZUxhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcclxuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgZmxvYXROb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDQpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDE4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjU1LCAwLCA3MiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuNTUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVcGdyYWRlVG9hc3QoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIXRoaXMubm9kZSB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b2FzdCA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVUb2FzdFwiKTtcclxuICAgICAgICB0b2FzdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgdG9hc3Quc2V0UG9zaXRpb24oMCwgdGhpcy5fcmFkaXVzICsgNzYpO1xyXG4gICAgICAgIHRvYXN0LnpJbmRleCA9IDM2MDtcclxuICAgICAgICB0b2FzdC5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0b2FzdC5zY2FsZSA9IDAuODg7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IHRvYXN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmcuZmlsbENvbG9yID0gY2MuY29sb3IoMjAsIDI0LCAzNCwgMjI4KTtcclxuICAgICAgICBiZy5yb3VuZFJlY3QoLTExMCwgLTIwLCAyMjAsIDQwLCAxNCk7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG4gICAgICAgIGJnLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgYmcuc3Ryb2tlQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC0xMTAsIC0yMCwgMjIwLCA0MCwgMTQpO1xyXG4gICAgICAgIGJnLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZVRvYXN0TGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHRvYXN0O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgyMDQsIDMwKTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IGNob2ljZS50aXRsZSArIFwiIFwiICsgY2hvaWNlLnZhbHVlVGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDE4O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyMjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgdG9hc3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjcpLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yMiwgMCwgMTgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93T2lsUGlja3VwRmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfb2lsUGlja3VwUmVhZHlcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJhZGdlLnNldFBvc2l0aW9uKDAsIHRoaXMuX3JhZGl1cyArIDQ4KTtcclxuICAgICAgICBiYWRnZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBiYWRnZS5zY2FsZSA9IDAuNztcclxuICAgICAgICBiYWRnZS56SW5kZXggPSAzMjA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGJhZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNzgsIDUyLCAyNiwgMjM1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTY4LCAtMTgsIDEzNiwgMzYsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjA1LCAxMjIsIDIzNSk7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC02OCwgLTE4LCAxMzYsIDM2LCAxMik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9vaWxQaWNrdXBSZWFkeUxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTI0LCAyOCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyMzIsIDE3MiwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIueEpuayueW8ueWwsee7qlwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBiYWRnZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjAyKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNiksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMiwgMCwgMTYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKGNob2ljZSkge1xyXG4gICAgICAgIGxldCB3YXZlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZVdhdmVcIik7XHJcbiAgICAgICAgd2F2ZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgd2F2ZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB3YXZlLnpJbmRleCA9IDI4MDtcclxuICAgICAgICB3YXZlLm9wYWNpdHkgPSAyMjA7XHJcbiAgICAgICAgd2F2ZS5zY2FsZSA9IDAuNTU7XHJcbiAgICAgICAgbGV0IHdhdmVHcmFwaGljcyA9IHdhdmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICB3YXZlR3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxOCk7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIHdhdmUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4zLCAzLjIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjMpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZ2xvdy56SW5kZXggPSAyNzU7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC43NTtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihjaG9pY2UuY29sb3IuciwgY2hvaWNlLmNvbG9yLmcsIGNob2ljZS5jb2xvci5iLCA5MCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAyNik7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xMiwgMTgwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4yOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTgpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjE4LCAxLjgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKDkzMDEpO1xyXG4gICAgICAgIGxldCBwdW5jaCA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMS4wOCksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLCAxKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcHVuY2guc2V0VGFnKDkzMDEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24ocHVuY2gpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dCdWxsZXRNdXRhdGlvbk1lZGFsKGNob2ljZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlLnBhcmVudCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWVkYWwgPSBuZXcgY2MuTm9kZShcIl9idWxsZXRNdXRhdGlvbk1lZGFsXCIpO1xyXG4gICAgICAgIG1lZGFsLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgbWVkYWwuc2V0UG9zaXRpb24oY2MudjModGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgMTEyLCAwKSk7XHJcbiAgICAgICAgbWVkYWwuekluZGV4ID0gNjYwMDtcclxuICAgICAgICBtZWRhbC5vcGFjaXR5ID0gMDtcclxuICAgICAgICBtZWRhbC5zY2FsZSA9IDAuODg7XHJcblxyXG4gICAgICAgIGxldCBiYWRnZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsQmFkZ2VcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gbWVkYWw7XHJcbiAgICAgICAgbGV0IGJhZGdlR3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbENvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI4KTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsQmFkZ2VMYWJlbFwiKTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg1MiwgMzIpO1xyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsID0gYmFkZ2VMYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBiYWRnZUxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICBiYWRnZUxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBiYWRnZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZU5vZGUgPSBuZXcgY2MuTm9kZShcIl9tZWRhbFRpdGxlXCIpO1xyXG4gICAgICAgIHRpdGxlTm9kZS5wYXJlbnQgPSBtZWRhbDtcclxuICAgICAgICB0aXRsZU5vZGUuc2V0UG9zaXRpb24oMCwgLTQ4KTtcclxuICAgICAgICB0aXRsZU5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMzUpO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRDb250ZW50U2l6ZSgyMjAsIDMyKTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnRpdGxlO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICB0aXRsZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgdGl0bGVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIG1lZGFsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDE2KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMS44OCksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjM1KSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjM1LCAwLCAzNClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hCdWxsZXRNdXRhdGlvbkVmZmVjdCgpIHtcclxuICAgICAgICB0aGlzLl9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfYnVsbGV0TXV0YXRpb25NdXp6bGVFZmZlY3RcIik7XHJcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IGJhcnJlbE5vZGU7XHJcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oLTIpKSk7XHJcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDk2O1xyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IGVmZmVjdDtcclxuXHJcbiAgICAgICAgbGV0IG91dGVyID0gbmV3IGNjLk5vZGUoXCJfbXV6emxlT3V0ZXJcIik7XHJcbiAgICAgICAgb3V0ZXIucGFyZW50ID0gZWZmZWN0O1xyXG4gICAgICAgIGxldCBvdXRlckdyYXBoaWNzID0gb3V0ZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvci5yLCB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3IuZywgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yLmIsIDkwKTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNik7XHJcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lciA9IG5ldyBjYy5Ob2RlKFwiX211enpsZUlubmVyXCIpO1xyXG4gICAgICAgIGlubmVyLnBhcmVudCA9IGVmZmVjdDtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsQ29sb3IgPSB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3I7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgOCk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjIsIDEuMjIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMjIsIDIyMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjIsIDAuOSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4yMiwgMTUwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNb3ZlRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3ZlRWZmZWN0SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlRWZmZWN0SWQgPSBNdXNpY01hbmFnZXIucGxheUxvb3BFZmZlY3QoXCJ0YW5rTW92ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3RvcE1vdmVFZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmVFZmZlY3RJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5zdG9wRWZmZWN0KHRoaXMuX21vdmVFZmZlY3RJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOeCrueuoeWPqui3n+maj+WPs+S+p+WPkeWwhOaRh+adhuaWueWQkVxyXG4gICAgX3JlZnJlc2hCYXJyZWxEaXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob290SW5wdXREaXIgJiYgdGhpcy5fc2hvb3RJbnB1dERpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fc2hvb3RJbnB1dERpcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldERpc3BsYXlCYXJyZWxEaXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiAhdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUgJiYgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyICYmIHRoaXMuX2xvY2FsUHJldmlld0JhcnJlbERpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsUHJldmlld0JhcnJlbERpcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhcnJlbERpcjtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaERpc3BsYXlCYXJyZWxBbmdsZShkdCA9IDEgLyA2MCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8IHRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc3BsYXlEaXIgPSB0aGlzLl9nZXREaXNwbGF5QmFycmVsRGlyKCk7XHJcbiAgICAgICAgaWYgKCFkaXNwbGF5RGlyIHx8IGRpc3BsYXlEaXIubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZnJvbUFuZ2xlID0gdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGU7XHJcbiAgICAgICAgbGV0IHRvQW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKGRpc3BsYXlEaXIpO1xyXG4gICAgICAgIGxldCBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgaWYgKGRpc0FuZ2xlID4gMTgwKSB7XHJcbiAgICAgICAgICAgIGZyb21BbmdsZSA9IGZyb21BbmdsZSArIDM2MDtcclxuICAgICAgICAgICAgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkaXNBbmdsZSA8IC0xODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlIC0gMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWF4VHVybkFuZ2xlID0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkFuZ3VsYXJTcGVlZFwiLCAxMCwgZHQpICogMS42O1xyXG4gICAgICAgIGlmIChtYXhUdXJuQW5nbGUgPD0gMCB8fCBNYXRoLmFicyhkaXNBbmdsZSkgPD0gbWF4VHVybkFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmFuZ2xlID0gdG9BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSArIChkaXNBbmdsZSA+IDAgPyBtYXhUdXJuQW5nbGUgOiAtbWF4VHVybkFuZ2xlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSBVdGlscy5jb3JyZWN0aW9uQW5nbGUodGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWPs+S+p+aMiemSruaKrOi1t+aXtuebtOaOpeWPkeWwhOS4gOWPkSwg5LiN6LWw5oyJ5L2P5oyB57ut5Y+R5bCE6YC76L6RXHJcbiAgICBmaXJlT25jZSgpIHtcclxuICAgICAgICBsZXQgdHlwZSA9ICh0aGlzLl92aWV3TW9kZSB8fCB0aGlzLl9za2lsbDJUaW1lID4gMCkgPyB0aGlzLl9jb25maWcuQlR5cGUyIDogdGhpcy5fY29uZmlnLkJUeXBlMTtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fdmlld01vZGUgPyB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICogMC44IDp0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzO1xyXG4gICAgICAgIGxldCBtdXRhdGlvbkRhdGEgPSB0aGlzLl92aWV3TW9kZSA/IG51bGwgOiB0aGlzLl9nZXRDdXJyZW50QnVsbGV0TXV0YXRpb25EYXRhKCk7XHJcbiAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KHR5cGUsdGhpcy5ub2RlLnBvc2l0aW9uLHRoaXMuX2JhcnJlbERpcix0aGlzLl9maXJlLl9seUJhcnJlbC5oZWlnaHQrMjAsYXR0YWNrUmFkaXVzLHRoaXMuX2F0ayx0aGlzLl9jYW1wLHRoaXMubm9kZS5wYXJlbnQsdGhpcy5fbWFwLDgsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5pc1Nob290RWZmZWN0VGVzdE1vZGUgJiYgdGhpcy5fbWFwLmlzU2hvb3RFZmZlY3RUZXN0TW9kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXlTaG9vdEZlZWRiYWNrKHR5cGUsIG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmICh0aGlzLl92aWV3TW9kZSA9PSBmYWxzZSAmJiB0aGlzLl9tYXAuZW5lbXlDb3VudCgpID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZmlyZUJ5TXVsdGlwbGF5ZXJDb21tYW5kKGZpcmVEYXRhKSB7XHJcbiAgICAgICAgaWYgKCFmaXJlRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHlwZSA9IGZpcmVEYXRhLnR5cGUgfHwgdGhpcy5nZXRNdWx0aXBsYXllckZpcmVUeXBlKCk7XHJcbiAgICAgICAgbGV0IGF0dGFja1JhZGl1cyA9IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXM7XHJcbiAgICAgICAgbGV0IG11dGF0aW9uRGF0YSA9IHRoaXMuX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKTtcclxuICAgICAgICBsZXQgbmV0d29ya01ldGEgPSB7XHJcbiAgICAgICAgICAgIGJ1bGxldElkOiBmaXJlRGF0YS5pZCxcclxuICAgICAgICAgICAgb3duZXJQbGF5ZXJJZDogdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJJZCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeChcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIsXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCArIDIwLFxyXG4gICAgICAgICAgICBhdHRhY2tSYWRpdXMsXHJcbiAgICAgICAgICAgIHRoaXMuX2F0ayxcclxuICAgICAgICAgICAgdGhpcy5fY2FtcCxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCxcclxuICAgICAgICAgICAgdGhpcy5fbWFwLFxyXG4gICAgICAgICAgICA4LFxyXG4gICAgICAgICAgICBtdXRhdGlvbkRhdGEsXHJcbiAgICAgICAgICAgIG5ldHdvcmtNZXRhXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5U2hvb3RGZWVkYmFjayh0eXBlLCBtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcGxheVNob290RmVlZGJhY2soYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheUJhcnJlbFJlY29pbCgpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlNdXp6bGVGbGFzaChidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcclxuICAgICAgICB0aGlzLl9wbGF5U2hvb3RTaGFrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5QmFycmVsUmVjb2lsKCkge1xyXG4gICAgICAgIGxldCByZWNvaWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8ICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX2x5QmFycmVsKTtcclxuICAgICAgICBpZiAoIXJlY29pbE5vZGUgfHwgIWNjLmlzVmFsaWQocmVjb2lsTm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHJlY29pbE5vZGUucGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50Tm9kZSB8fCAhY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFzZVBvcyA9IHJlY29pbE5vZGVbXCJfc2hvb3RCYXNlUG9zXCJdO1xyXG4gICAgICAgIGlmICghYmFzZVBvcykge1xyXG4gICAgICAgICAgICBiYXNlUG9zID0gY2MudjMocmVjb2lsTm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHJlY29pbE5vZGVbXCJfc2hvb3RCYXNlUG9zXCJdID0gY2MudjMoYmFzZVBvcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFzZVdvcmxkUG9zID0gcGFyZW50Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYmFzZVBvcyk7XHJcbiAgICAgICAgbGV0IHJlY29pbERpciA9IHRoaXMuX2JhcnJlbERpciAmJiB0aGlzLl9iYXJyZWxEaXIubWFnU3FyKCkgPiAwID8gdGhpcy5fYmFycmVsRGlyLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgbGV0IHJlY29pbFdvcmxkUG9zID0gY2MudjIoYmFzZVdvcmxkUG9zKS5zdWIocmVjb2lsRGlyLm11bChTSE9PVF9SRUNPSUxfRElTVEFOQ0UpKTtcclxuICAgICAgICBsZXQgcmVjb2lsTG9jYWxQb3MgPSBwYXJlbnROb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHJlY29pbFdvcmxkUG9zKTtcclxuXHJcbiAgICAgICAgcmVjb2lsTm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAwNCk7XHJcbiAgICAgICAgcmVjb2lsTm9kZS5zZXRQb3NpdGlvbihiYXNlUG9zKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbyhTSE9PVF9SRUNPSUxfT1VUX1RJTUUsIHJlY29pbExvY2FsUG9zLngsIHJlY29pbExvY2FsUG9zLnkpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FLCBiYXNlUG9zLngsIGJhc2VQb3MueSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwNCk7XHJcbiAgICAgICAgcmVjb2lsTm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheU11enpsZUZsYXNoKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGlmICghYmFycmVsTm9kZSB8fCAhY2MuaXNWYWxpZChiYXJyZWxOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWZmZWN0Q29sb3IgPSB0aGlzLl9nZXRTaG9vdEVmZmVjdENvbG9yKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgbGV0IGZsYXNoID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVGbGFzaFwiKTtcclxuICAgICAgICBmbGFzaC5wYXJlbnQgPSBiYXJyZWxOb2RlO1xyXG4gICAgICAgIGZsYXNoLnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oNikpKTtcclxuICAgICAgICBmbGFzaC56SW5kZXggPSAxMTU7XHJcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZmxhc2guc2NhbGVYID0gMC4yODtcclxuICAgICAgICBmbGFzaC5zY2FsZVkgPSAwLjcyO1xyXG5cclxuICAgICAgICBsZXQgY29uZSA9IG5ldyBjYy5Ob2RlKFwiX2ZsYXNoQ29uZVwiKTtcclxuICAgICAgICBjb25lLnBhcmVudCA9IGZsYXNoO1xyXG4gICAgICAgIGxldCBjb25lR3JhcGhpY3MgPSBjb25lLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDIxMCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLm1vdmVUbygwLCAzNik7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygtMTcsIDgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oLTcsIC04KTtcclxuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKDAsIDQpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oNywgLTgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oMTcsIDgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5jbG9zZSgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfZmxhc2hDb3JlXCIpO1xyXG4gICAgICAgIGNvcmUucGFyZW50ID0gZmxhc2g7XHJcbiAgICAgICAgbGV0IGNvcmVHcmFwaGljcyA9IGNvcmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTAsIDIyMCwgMjM1KTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDExKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBmbGFzaC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDEuMSwgMS4xOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KFNIT09UX0ZMQVNIX0ZBREVfT1VUKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oU0hPT1RfRkxBU0hfRkFERV9PVVQsIDAuNTUsIDEuNjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5U2hvb3RHbG93KGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGxldCBlZmZlY3RDb2xvciA9IHRoaXMuX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtdXp6bGVHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVHbG93XCIpO1xyXG4gICAgICAgIG11enpsZUdsb3cucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBtdXp6bGVHbG93LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKDApKSk7XHJcbiAgICAgICAgbXV6emxlR2xvdy56SW5kZXggPSAyODU7XHJcbiAgICAgICAgbXV6emxlR2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBtdXp6bGVHbG93LnNjYWxlID0gMC41O1xyXG4gICAgICAgIGxldCBtdXp6bGVHbG93R3JhcGhpY3MgPSBtdXp6bGVHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbXV6emxlR2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDk1KTtcclxuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI4KTtcclxuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIG11enpsZUdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjAzLCAyMTApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjAzLCAxLjA1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjY1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbGV0IGJvZHlHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RCb2R5R2xvd1wiKTtcclxuICAgICAgICBib2R5R2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYm9keUdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgYm9keUdsb3cuekluZGV4ID0gMjYwO1xyXG4gICAgICAgIGJvZHlHbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJvZHlHbG93LnNjYWxlID0gMC43NTtcclxuICAgICAgICBsZXQgYm9keUdsb3dHcmFwaGljcyA9IGJvZHlHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihlZmZlY3RDb2xvci5yLCBlZmZlY3RDb2xvci5nLCBlZmZlY3RDb2xvci5iLCA3MCk7XHJcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjgpO1xyXG4gICAgICAgIGJvZHlHbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGJvZHlHbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4wNCwgMTUwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNCwgMS4wOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjM4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheVNob290U2hha2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTaG9vdEVmZmVjdENvbG9yKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGlmIChtdXRhdGlvbkRhdGEgJiYgbXV0YXRpb25EYXRhLmVmZmVjdENvbG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXRUeXBlID09IE9JTF9TSEVMTF9CVUxMRVRfVFlQRSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXRUeXBlID09IHRoaXMuX2NvbmZpZy5CVHlwZTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDEyMCwgMjI1LCAyNTUsIDIzMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcigyNTUsIDIwNSwgOTUsIDIzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUNoYXJnZUNhbm5vbihkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb29sZG93blByb2dyZXNzID0gMSAtIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAvIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNvb2xkb3duXCIsIHtwcm9ncmVzczogY29vbGRvd25Qcm9ncmVzc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIsIHt9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgKz0gZHQ7XHJcbiAgICAgICAgbGV0IG5lZWRUaW1lID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiVGltZVwiLCA1KTtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lIC8gbmVlZFRpbWU7XHJcbiAgICAgICAgaWYgKHByb2dyZXNzID4gMSkge1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IHByb2dyZXNzfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9PSBmYWxzZSAmJiB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID49IG5lZWRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0NoYXJnZUVmZmVjdCgpO1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZmlyZUNoYXJnZUNhbm5vbigpIHtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQXR0YWNrUmFkaXVzXCIsIHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAxLjQpO1xyXG4gICAgICAgIGxldCBhdGtSYXRpbyA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkF0a1JhdGlvXCIsIDMpO1xyXG4gICAgICAgIGxldCBzcGVlZCA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIlNwZWVkXCIsIDEyKTtcclxuICAgICAgICBsZXQgd2lwZUxlbiA9IHRoaXMuX2dldEJhcnJlbE11enpsZURpc3RhbmNlKDEyKTtcclxuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgoQ0hBUkdFX0NBTk5PTl9CVUxMRVRfVFlQRSwgdGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9iYXJyZWxEaXIsIHdpcGVMZW4sIGF0dGFja1JhZGl1cywgdGhpcy5fYXRrICogYXRrUmF0aW8sIHRoaXMuX2NhbXAsIHRoaXMubm9kZS5wYXJlbnQsIHRoaXMuX21hcCwgc3BlZWQpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlU2hvb3RcIik7XHJcbiAgICAgICAgdGhpcy5fc2hha2VTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkNvb2xkb3duXCIsIDgpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xyXG4gICAgfVxyXG5cclxuICAgIF9nYWluT2lsU2hlbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBNYXRoLm1pbihPSUxfU0hFTExfTUFYX0NPVU5ULCB0aGlzLl9vaWxTaGVsbENvdW50ICsgMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dPaWxQaWNrdXBGZWVkYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9maXJlT2lsU2hlbGwoKSB7XHJcbiAgICAgICAgbGV0IHdpcGVMZW4gPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZSg4KTtcclxuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgoT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX2JhcnJlbERpciwgd2lwZUxlbiwgdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAqIDEuOCwgMCwgdGhpcy5fY2FtcCwgdGhpcy5ub2RlLnBhcmVudCwgdGhpcy5fbWFwLCAxMCk7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMuX29pbFNoZWxsQ291bnQgLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhPSUxfU0hFTExfQlVMTEVUX1RZUEUsIHtlZmZlY3RDb2xvcjogY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCl9KTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJzaG9vdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRPaWxTaGVsbFByZXZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29pbFNoZWxsQ291bnQgPD0gMCB8fCAhdGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxQcmV2aWV3aW5nID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGVmYXVsdERpciA9IHRoaXMuX2JhcnJlbERpciAmJiB0aGlzLl9iYXJyZWxEaXIubWFnU3FyKCkgPiAwID8gY2MudjIodGhpcy5fYmFycmVsRGlyKS5ub3JtYWxpemUoKSA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQWltRGlyID0gZGVmYXVsdERpcjtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID0gMTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NhbmNlbE9pbFNoZWxsUHJldmlldygpIHtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmhpZGVPaWxTaGVsbFByZXZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmhpZGVPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbW1pdE9pbFNoZWxsVGhyb3coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcgfHwgdGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQgfHwgdGhpcy5fZ2V0T2lsU2hlbGxUaHJvd1RhcmdldCgpO1xyXG4gICAgICAgIGxldCBhaW1EaXIgPSBjYy52Mih0aGlzLl9vaWxTaGVsbEFpbURpciB8fCB0aGlzLl9iYXJyZWxEaXIgfHwgY2MudjIoMSwgMCkpO1xyXG4gICAgICAgIGlmIChhaW1EaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGFpbURpciA9IGFpbURpci5ub3JtYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYWltRGlyID0gY2MudjIoMSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhaW1SYXRpbyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPT0gbnVsbCA/IDEgOiB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvKSk7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmICF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm11bHRpcGxheWVyLXRocm93LXRhclwiLCB7XHJcbiAgICAgICAgICAgICAgICBkaXJYOiBOdW1iZXIoYWltRGlyLngudG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgICAgICBkaXJZOiBOdW1iZXIoYWltRGlyLnkudG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgICAgICByYXRpbzogTnVtYmVyKGFpbVJhdGlvLnRvRml4ZWQoNCkpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90aHJvd09pbFNoZWxsQXQodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0T2lsU2hlbGxUaHJvd1RhcmdldCgpIHtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fY29uZmlnICYmIHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgIT0gbnVsbCA/IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgOiA0MjA7XHJcbiAgICAgICAgbGV0IGRpciA9IHRoaXMuX29pbFNoZWxsQWltRGlyICYmIHRoaXMuX29pbFNoZWxsQWltRGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHRoaXMuX29pbFNoZWxsQWltRGlyKS5ub3JtYWxpemUoKSA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIGxldCByYXRpbyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPT0gbnVsbCA/IDEgOiB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvKSk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuYWRkKGRpci5tdWwoYXR0YWNrUmFkaXVzICogcmF0aW8pKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwICYmIHRoaXMuX21hcC5jbGFtcE1hcElubmVyUG9zaXRpb25cclxuICAgICAgICAgICAgPyB0aGlzLl9tYXAuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHRhcmdldCwgT0lMX1RIUk9XX0FSRUFfUkFESVVTICogMC41NSlcclxuICAgICAgICAgICAgOiB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZU9pbFNoZWxsQWltKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIgJiYgZXZlbnQuZGlyLm1hZ1NxcigpID4gMC4wMDAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQWltRGlyID0gY2MudjIoZXZlbnQuZGlyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIE51bWJlci5pc0Zpbml0ZShldmVudC5yYXRpbykpIHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1SYXRpbyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIE51bWJlcihldmVudC5yYXRpbykpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoT2lsU2hlbGxQcmV2aWV3KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fb2lsU2hlbGxQcmV2aWV3aW5nIHx8ICF0aGlzLl9tYXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQgPSB0aGlzLl9nZXRPaWxTaGVsbFRocm93VGFyZ2V0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcC5zaG93T2lsU2hlbGxQcmV2aWV3ICYmIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc2hvd09pbFNoZWxsUHJldmlldyh0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCwge1xyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiBPSUxfVEhST1dfUFJFVklFV19BUkNfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgYXJlYVJhZGl1czogT0lMX1RIUk9XX0FSRUFfUkFESVVTLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Rocm93T2lsU2hlbGxBdCh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIXRhcmdldCB8fCB0aGlzLl9vaWxTaGVsbENvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vaWxTaGVsbENvdW50ID0gTWF0aC5tYXgoMCwgdGhpcy5fb2lsU2hlbGxDb3VudCAtIDEpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5T2lsU2hlbGxUaHJvdykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheU9pbFNoZWxsVGhyb3codGhpcy5ub2RlLnBvc2l0aW9uLCB0YXJnZXQsIHtcclxuICAgICAgICAgICAgICAgIGFyZWFSYWRpdXM6IE9JTF9USFJPV19BUkVBX1JBRElVUyxcclxuICAgICAgICAgICAgICAgIGFyY0hlaWdodDogT0lMX1RIUk9XX1BSRVZJRVdfQVJDX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgIG9uTGFuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlT2lsU2hlbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhPSUxfU0hFTExfQlVMTEVUX1RZUEUsIHtlZmZlY3RDb2xvcjogY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCl9KTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJzaG9vdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmIHRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLCB7bW9kZTogdGhpcy5fb2lsU2hlbGxDb3VudCA+IDAgPyBcIm9pbFwiIDogXCJjaGFyZ2VcIn0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDaGFyZ2VDb25maWcoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBsZXQgZnVsbEtleSA9IFwiQ2hhcmdlXCIgKyBrZXk7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnW2Z1bGxLZXldIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZXNldENoYXJnZUNhbm5vbigpIHtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faGlkZUNoYXJnZUVmZmVjdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0NoYXJnZUVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XHJcbiAgICAgICAgbGV0IGVmZmVjdCA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZU11enpsZUVmZmVjdFwiKTtcclxuICAgICAgICBlZmZlY3QucGFyZW50ID0gYmFycmVsTm9kZTtcclxuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24oY2MudjModGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbig0KSkpO1xyXG4gICAgICAgIGVmZmVjdC56SW5kZXggPSAxMDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGVmZmVjdC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNDAsIDIwLCAxODApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxOCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNSwgMS4zNSksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNSwgMC45KVxyXG4gICAgICAgICkpKTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlID0gZWZmZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlQ2hhcmdlRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX3NoYWtlU2NyZWVuKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFwIHx8ICF0aGlzLl9tYXAubm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWFwTm9kZSA9IHRoaXMuX21hcC5ub2RlO1xyXG4gICAgICAgIGxldCBvcmlnaW4gPSBtYXBOb2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIG1hcE5vZGUuc3RvcEFjdGlvbkJ5VGFnKDkwMDEpO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDApLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgLTgsIDApLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgNCwgMyksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCAwLCAtMyksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBtYXBOb2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDkwMDEpO1xyXG4gICAgICAgIG1hcE5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKGV4dHJhT2Zmc2V0ID0gMCkge1xyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGxldCBhbmNob3JZID0gYmFycmVsTm9kZS5hbmNob3JZID09IG51bGwgPyAwLjUgOiBiYXJyZWxOb2RlLmFuY2hvclk7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKDAsIGJhcnJlbE5vZGUuaGVpZ2h0ICogKDEgLSBhbmNob3JZKSArIGV4dHJhT2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0QmFycmVsTXV6emxlUG9zaXRpb24oZXh0cmFPZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XHJcbiAgICAgICAgbGV0IGxvY2FsUG9zID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbihleHRyYU9mZnNldCk7XHJcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gYmFycmVsTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobG9jYWxQb3MpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0QmFycmVsTXV6emxlRGlzdGFuY2UoZXh0cmFPZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgbGV0IG11enpsZVBvcyA9IHRoaXMuX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKGV4dHJhT2Zmc2V0KTtcclxuICAgICAgICByZXR1cm4gbXV6emxlUG9zLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgfVxyXG5cclxuICAgIF90cnlGaXJlT25jZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0Q29kZVRpbWUgPCBQTEFZRVJfU0hPT1RfSU5URVJWQUwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8PSAwICYmIHRoaXMuX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TG93SHBTaG9vdFRpcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZmlyZU9uY2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50LS07XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbnN1bWVIcEZvclBhaWRCdWxsZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2FuTm90QWZmb3JkUGFpZEJ1bGxldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHAgPD0gUExBWUVSX1BBSURfU0hPVF9IUF9DT1NUO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93TG93SHBTaG9vdFRpcCgpIHtcclxuICAgICAgICBsZXQgY2hhbm5lbCA9IFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpO1xyXG4gICAgICAgIGlmIChjaGFubmVsICYmIGNoYW5uZWwuc2hvd1RvYXN0KSB7XHJcbiAgICAgICAgICAgIGNoYW5uZWwuc2hvd1RvYXN0KFwi6KGA6YeP6L+H5L2OLOaXoOazleWPkeWwhOWtkOW8uVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY2MubG9nKFwi6KGA6YeP6L+H5L2OLOaXoOazleWPkeWwhOWtkOW8uVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbnN1bWVIcEZvclBhaWRCdWxsZXQoKSB7XHJcbiAgICAgICAgdGhpcy5faHAgLT0gUExBWUVSX1BBSURfU0hPVF9IUF9DT1NUO1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5faHAgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrblj5flh7vkuI3po5jkvKTlrrPmlbDlrZcsIOeUqOWMuuWIq+S6juaVjOS6uueahOiTneiJsumXquWFieihqOeOsFxyXG4gICAgYmVIaXQoZGFtYWdlKXtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XHJcbiAgICAgICAgaWYgKGRhbWFnZSA8IDApIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hwIC09IGRhbWFnZTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd1BsYXllckhpdEVmZmVjdCgpO1xyXG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5TXVsdGlwbGF5ZXJIaXQoZGFtYWdlLCBocCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVIaXQoZGFtYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRIcCA9IGhwO1xyXG4gICAgICAgIGlmIChuZXh0SHAgPT0gbnVsbCB8fCBuZXh0SHAgPCAwKSB7XHJcbiAgICAgICAgICAgIG5leHRIcCA9IHRoaXMuX2hwIC0gTWF0aC5tYXgoMCwgZGFtYWdlIHx8IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICBuZXh0SHAgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpZFRha2VEYW1hZ2UgPSBuZXh0SHAgPCB0aGlzLl9ocDtcclxuICAgICAgICB0aGlzLl9ocCA9IG5leHRIcDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG5cclxuICAgICAgICBpZiAoZGlkVGFrZURhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93UGxheWVySGl0RWZmZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY011bHRpcGxheWVySHAoaHAsIG1heEhwID0gbnVsbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXhIcCAhPSBudWxsICYmIG1heEhwID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhIcCA9IG1heEhwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRIcCA9IGhwO1xyXG4gICAgICAgIGlmIChuZXh0SHAgPCAwKSB7XHJcbiAgICAgICAgICAgIG5leHRIcCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXhIcCA+IDAgJiYgbmV4dEhwID4gdGhpcy5fbWF4SHApIHtcclxuICAgICAgICAgICAgbmV4dEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGlkVGFrZURhbWFnZSA9IG5leHRIcCA8IHRoaXMuX2hwO1xyXG4gICAgICAgIHRoaXMuX2hwID0gbmV4dEhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcblxyXG4gICAgICAgIGlmIChkaWRUYWtlRGFtYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ocCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzeW5jTXVsdGlwbGF5ZXJTdGF0ZShzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgIXN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcmV2SHAgPSB0aGlzLl9ocDtcclxuICAgICAgICBsZXQgcHJldk1heEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgbGV0IHByZXZBdGsgPSB0aGlzLl9hdGs7XHJcbiAgICAgICAgbGV0IHByZXZNb3ZlU3BlZWRTY2FsZSA9IHRoaXMuX21vdmVTcGVlZFNjYWxlO1xyXG4gICAgICAgIGxldCBwcmV2RW5lcmd5TGV2ZWwgPSB0aGlzLl9lbmVyZ3lMZXZlbDtcclxuICAgICAgICBpZiAoc3RhdGUubWF4SHAgIT0gbnVsbCAmJiBzdGF0ZS5tYXhIcCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SHAgPSBzdGF0ZS5tYXhIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmhwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRIcCA9IHN0YXRlLmhwO1xyXG4gICAgICAgICAgICBpZiAobmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEhwID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4SHAgPiAwICYmIG5leHRIcCA+IHRoaXMuX21heEhwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0SHAgPSB0aGlzLl9tYXhIcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IG5leHRIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmF0ayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0ayA9IHN0YXRlLmF0aztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLm1vdmVTcGVlZFNjYWxlICE9IG51bGwgJiYgc3RhdGUubW92ZVNwZWVkU2NhbGUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlID0gc3RhdGUubW92ZVNwZWVkU2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS50YXJBbW1vQ291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dFRhckFtbW9Db3VudCA9IE1hdGgubWF4KDAsIHN0YXRlLnRhckFtbW9Db3VudCk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0VGFyQW1tb0NvdW50ICE9IHRoaXMuX29pbFNoZWxsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBuZXh0VGFyQW1tb0NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5lbmVyZ3lMZXZlbCAhPSBudWxsICYmIHN0YXRlLmVuZXJneUxldmVsID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lMZXZlbCA9IHN0YXRlLmVuZXJneUxldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuZW5lcmd5RXhwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5RXhwID0gTWF0aC5tYXgoMCwgc3RhdGUuZW5lcmd5RXhwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmVuZXJneU5lZWRFeHAgIT0gbnVsbCAmJiBzdGF0ZS5lbmVyZ3lOZWVkRXhwID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lOZWVkRXhwID0gc3RhdGUuZW5lcmd5TmVlZEV4cDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9lbmVyZ3lMZXZlbCA+IHByZXZFbmVyZ3lMZXZlbCkge1xyXG4gICAgICAgICAgICBsZXQgY2hvaWNlID0gdGhpcy5fYnVpbGRVcGdyYWRlQ2hvaWNlRnJvbVN0YXRlRGVsdGEocHJldk1heEhwLCBwcmV2QXRrLCBwcmV2TW92ZVNwZWVkU2NhbGUpO1xyXG4gICAgICAgICAgICBpZiAoY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93VXBncmFkZUZsb2F0KGNob2ljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKGNob2ljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dVcGdyYWRlVG9hc3QoY2hvaWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpZFRha2VEYW1hZ2UgPSB0aGlzLl9ocCA8IHByZXZIcDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xyXG5cclxuICAgICAgICBpZiAoZGlkVGFrZURhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93UGxheWVySGl0RWZmZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkVXBncmFkZUNob2ljZUZyb21TdGF0ZURlbHRhKHByZXZNYXhIcCwgcHJldkF0aywgcHJldk1vdmVTcGVlZFNjYWxlKSB7XHJcbiAgICAgICAgbGV0IGhwRGVsdGEgPSB0aGlzLl9tYXhIcCAtIHByZXZNYXhIcDtcclxuICAgICAgICBsZXQgYXRrRGVsdGEgPSB0aGlzLl9hdGsgLSBwcmV2QXRrO1xyXG4gICAgICAgIGxldCBzcGVlZFJhdGlvRGVsdGEgPSB0aGlzLl9tb3ZlU3BlZWRTY2FsZSAtIHByZXZNb3ZlU3BlZWRTY2FsZTtcclxuICAgICAgICBsZXQgc3BlZWREZWx0YSA9IE1hdGgucm91bmQoc3BlZWRSYXRpb0RlbHRhICogMTAwKTtcclxuXHJcbiAgICAgICAgaWYgKGhwRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJocFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi6KOF55Sy5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIueUn+WRveS4iumZkOaPkOWNh+W5tueri+WIu+Wbnua7oVwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJIUFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIGhwRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGhwRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMTIwLCAyNTUsIDE3MCwgMjU1KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF0a0RlbHRhID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYXRrXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLngavlipvlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5pS75Ye75Yqb5o+Q5Y2HLCDovpPlh7rmm7Tpq5hcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiQVRLXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgYXRrRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGF0a0RlbHRhLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDI1NSwgMTg1LCA5MCwgMjU1KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNwZWVkRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJzcGVlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5o6o6L+b5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuenu+WKqOmAn+W6puaPkOWNhywg6LWw5L2N5pu054G15rS7XCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIlNQRFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIHNwZWVkRGVsdGEgKyBcIiVcIixcclxuICAgICAgICAgICAgICAgIGFtb3VudDogc3BlZWREZWx0YSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMTAsIDIxMCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfc2hvd1BsYXllckhpdEVmZmVjdCgpIHtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfcGxheWVySGl0RWZmZWN0XCIpO1xyXG4gICAgICAgIGVmZmVjdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGVmZmVjdC56SW5kZXggPSAzMDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGVmZmVjdC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig4MCwgMjEwLCAyNTUsIDIzMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE2KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3MCwgMTcwLCAyNTUsIDU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgZWZmZWN0LnNjYWxlID0gMC42NTtcclxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS4yNSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xOCwgNjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUxvd0hwUGxheWVyRmVlZGJhY2soKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbkdhbWUgfHwgIXRoaXMuaXNMb3dIcCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0TG93SHBTY3JlZW5FZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9zdGFydExvd0hwSGVhcnRiZWF0U291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRMb3dIcEhlYXJ0YmVhdFNvdW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IE11c2ljTWFuYWdlci5wbGF5TG9vcEVmZmVjdChcImhlYXJ0YmVhdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RvcExvd0hwSGVhcnRiZWF0U291bmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPj0gMCkge1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuc3RvcEVmZmVjdCh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkKTtcclxuICAgICAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRMb3dIcFNjcmVlbkVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVmZmVjdFJvb3QgPSBuZXcgY2MuTm9kZShcIl9sb3dIcFNjcmVlbkVmZmVjdFwiKTtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMuX21hcCAmJiB0aGlzLl9tYXAubm9kZSAmJiB0aGlzLl9tYXAubm9kZS5wYXJlbnQgPyB0aGlzLl9tYXAubm9kZS5wYXJlbnQgOiB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGVmZmVjdFJvb3QucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICBlZmZlY3RSb290LnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGVmZmVjdFJvb3QuekluZGV4ID0gMTYwMDtcclxuICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCA9IGVmZmVjdFJvb3Q7XHJcblxyXG4gICAgICAgIGxldCBib3JkZXJOb2RlID0gbmV3IGNjLk5vZGUoXCJfbG93SHBCb3JkZXJcIik7XHJcbiAgICAgICAgYm9yZGVyTm9kZS5wYXJlbnQgPSBlZmZlY3RSb290O1xyXG4gICAgICAgIGJvcmRlck5vZGUub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIGxldCBjcmVhdGVFZGdlID0gZnVuY3Rpb24obmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICBsZXQgZWRnZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgICAgICBlZGdlLnBhcmVudCA9IGJvcmRlck5vZGU7XHJcbiAgICAgICAgICAgIGVkZ2Uuc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IGVkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA2MCwgNjAsIDI1NSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlZGdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfdG9wRWRnZVwiLCAwLCAzNTEsIDEyODAsIDE4KTtcclxuICAgICAgICBjcmVhdGVFZGdlKFwiX2JvdHRvbUVkZ2VcIiwgMCwgLTM1MSwgMTI4MCwgMTgpO1xyXG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfbGVmdEVkZ2VcIiwgLTYzMSwgMCwgMTgsIDcyMCk7XHJcbiAgICAgICAgY3JlYXRlRWRnZShcIl9yaWdodEVkZ2VcIiwgNjMxLCAwLCAxOCwgNzIwKTtcclxuXHJcbiAgICAgICAgbGV0IGlkbGVUaW1lID0gTWF0aC5tYXgoMCwgTE9XX0hQX1NDUkVFTl9GTEFTSF9MT09QIC0gTE9XX0hQX1NDUkVFTl9GTEFTSF9JTiAtIExPV19IUF9TQ1JFRU5fRkxBU0hfT1VUKTtcclxuICAgICAgICBib3JkZXJOb2RlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2MucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhMT1dfSFBfU0NSRUVOX0ZMQVNIX0lOLCAyMTApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhMT1dfSFBfU0NSRUVOX0ZMQVNIX09VVCwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGlkbGVUaW1lKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUxvd0hwU2NyZWVuRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5fc3RvcExvd0hwSGVhcnRiZWF0U291bmQoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95TG93SHBTY3JlZW5FZmZlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlRnJlZUJ1bGxldFJlY292ZXIoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID49IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9zdG9wRmlyZVRpbWUgPCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgKz0gZHQ7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTFxyXG4gICAgICAgICAgICAmJiB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSAtPSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTDtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID49IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCkge1xyXG4gICAgICAgIGxldCBidWxsZXRCYXJzID0gW1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl96aWRhbmJhcjEsXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMixcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5femlkYW5iYXIzLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IHJlY292ZXJQcm9ncmVzcyA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYXHJcbiAgICAgICAgICAgICYmIHRoaXMuX3N0b3BGaXJlVGltZSA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSkge1xyXG4gICAgICAgICAgICByZWNvdmVyUHJvZ3Jlc3MgPSB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgLyBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTDtcclxuICAgICAgICAgICAgaWYgKHJlY292ZXJQcm9ncmVzcyA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlY292ZXJQcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1bGxldEJhcnMuZm9yRWFjaCgoYmFyTm9kZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFiYXJOb2RlIHx8ICFiYXJOb2RlLiRQcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCB0aGlzLl9mcmVlQnVsbGV0Q291bnQpIHtcclxuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PSB0aGlzLl9mcmVlQnVsbGV0Q291bnQgJiYgcmVjb3ZlclByb2dyZXNzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFyTm9kZS4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSByZWNvdmVyUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCE5Ye7XHJcbiAgICBzaG9vdGluZyhkdCl7XHJcbiAgICAgICAgbGV0IGp1ZGdlQ0QgPSB0aGlzLl9za2lsbDJUaW1lID4gMCA/IHRoaXMuX2NvbmZpZy5CdWxsZXRDb2RlVGltZS80IDogdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lO1xyXG5cclxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0Q29kZVRpbWUgPj0ganVkZ2VDRCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpcmVPbmNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aJp+ihjOatu+S6oVxyXG4gICAgZG9EZWF0aCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmZvcmNlRGV0YWNoQ292ZXJUZXN0RnJvbVBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuZm9yY2VEZXRhY2hDb3ZlclRlc3RGcm9tUGxheWVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xyXG4gICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHN1cGVyLmRvRGVhdGgoKTtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwibXVsdGlwbGF5ZXItcGxheWVyLWRlYXRoXCIsIHtcclxuICAgICAgICAgICAgICAgIHBsYXllcklkOiB0aGlzLl9tdWx0aXBsYXllclBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NhbDogIXRoaXMuX211bHRpcGxheWVyUmVtb3RlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInBsYXllci1kZWF0aFwiLHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTsgXHJcbiAgICAgICAgLy8g54iG54K45pWI5p6cXHJcbiAgICAgICAgLy8g5pi+56S657uT5p2f55WM6Z2iXHJcbiAgICB9XHJcblxyXG4gICAgZGVidWdTZXRMb3dIcCgpIHtcclxuICAgICAgICBsZXQgaHAgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHRoaXMuX21heEhwICogMC4xMikpO1xyXG4gICAgICAgIGlmIChocCA+PSB0aGlzLl9tYXhIcCkge1xyXG4gICAgICAgICAgICBocCA9IE1hdGgubWF4KDEsIHRoaXMuX21heEhwIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hwID0gaHA7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbkdhbWUoKXtcclxuICAgICAgICB0aGlzLl9pbkdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+W56Kw5pKe5qGGXHJcbiAgICBnZXRQbGF5ZXJCb3VuZGluZ0JveCgpe1xyXG4gICAgICAgIHJldHVybiBVdGlscy5nZXRXb3JsZEJvdW5kaW5nQm94KHRoaXMuX2N1cnJlbnRCZyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Vmlld01vZGUoKXtcclxuICAgICAgICB0aGlzLl92aWV3TW9kZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==