
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
var BLACK_HOLE_SHELL_MAX_COUNT = 1;
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
        _this._blackHoleShellCount = 0;
        _this._oilShellPreviewing = false;
        _this._oilShellPreviewTarget = null;
        _this._oilShellAimDir = cc.v2(1, 0);
        _this._oilShellAimRatio = 1;
        _this._activeThrowSkillType = "";
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
        this._blackHoleShellCount = 0;
        this._oilShellPreviewing = false;
        this._oilShellPreviewTarget = null;
        this._oilShellAimDir = this._barrelDir && this._barrelDir.magSqr() > 0 ? cc.v2(this._barrelDir).normalize() : cc.v2(1, 0);
        this._oilShellAimRatio = 1;
        this._activeThrowSkillType = "";
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
        if (this._oilShellCount <= 0 && this._blackHoleShellCount <= 0) {
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
            else if (skillId == 5) {
                this._gainBlackHoleShell();
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
    Player.prototype._showBlackHolePickupFeedback = function () {
        var badge = new cc.Node("_blackHolePickupReady");
        badge.parent = this.node;
        badge.setPosition(0, this._radius + 48);
        badge.opacity = 0;
        badge.scale = 0.7;
        badge.zIndex = 320;
        var graphics = badge.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(42, 24, 88, 235);
        graphics.roundRect(-74, -18, 148, 36, 12);
        graphics.fill();
        graphics.lineWidth = 3;
        graphics.strokeColor = cc.color(198, 138, 255, 235);
        graphics.roundRect(-74, -18, 148, 36, 12);
        graphics.stroke();
        var labelNode = new cc.Node("_blackHolePickupReadyLabel");
        labelNode.parent = badge;
        labelNode.setContentSize(136, 28);
        labelNode.color = cc.color(234, 214, 255, 255);
        var label = labelNode.addComponent(cc.Label);
        label.string = "黑洞弹就绪";
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
    Player.prototype._gainBlackHoleShell = function () {
        if (this._chargeCannonCharging) {
            this._resetChargeCannon();
        }
        this._blackHoleShellCount = Math.min(BLACK_HOLE_SHELL_MAX_COUNT, this._blackHoleShellCount + 1);
        this._refreshSkillButtonMode();
        this._showBlackHolePickupFeedback();
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
        if ((this._oilShellCount <= 0 && this._blackHoleShellCount <= 0) || !this._map) {
            return;
        }
        this._activeThrowSkillType = this._oilShellCount > 0 ? "oil" : "blackHole";
        this._oilShellPreviewing = true;
        var defaultDir = this._barrelDir && this._barrelDir.magSqr() > 0 ? cc.v2(this._barrelDir).normalize() : cc.v2(1, 0);
        this._oilShellAimDir = defaultDir;
        this._oilShellAimRatio = 1;
        this._refreshOilShellPreview();
    };
    Player.prototype._cancelOilShellPreview = function () {
        this._oilShellPreviewing = false;
        this._oilShellPreviewTarget = null;
        this._activeThrowSkillType = "";
        if (this._map && this._map.hideOilShellPreview) {
            this._map.hideOilShellPreview();
        }
    };
    Player.prototype._commitOilShellThrow = function () {
        if (!this._oilShellPreviewing) {
            this._cancelOilShellPreview();
            return;
        }
        var target = this._oilShellPreviewTarget || this._getOilShellThrowTarget();
        var activeThrowSkillType = this._activeThrowSkillType || (this._blackHoleShellCount > 0 && this._oilShellCount <= 0 ? "blackHole" : "oil");
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
            var throwEventName = activeThrowSkillType == "blackHole" ? "multiplayer-throw-black-hole" : "multiplayer-throw-tar";
            yyp.eventCenter.emit(throwEventName, {
                dirX: Number(aimDir.x.toFixed(4)),
                dirY: Number(aimDir.y.toFixed(4)),
                ratio: Number(aimRatio.toFixed(4)),
            });
            return;
        }
        if (activeThrowSkillType == "blackHole") {
            this._throwBlackHoleShellAt(target);
        }
        else {
            this._throwOilShellAt(target);
        }
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
    Player.prototype._throwBlackHoleShellAt = function (target) {
        var _this = this;
        if (!target || this._blackHoleShellCount <= 0) {
            return;
        }
        this._blackHoleShellCount = Math.max(0, this._blackHoleShellCount - 1);
        this._refreshSkillButtonMode();
        if (this._map && this._map.playOilShellThrow) {
            this._map.playOilShellThrow(this.node.position, target, {
                areaRadius: OIL_THROW_AREA_RADIUS,
                arcHeight: OIL_THROW_PREVIEW_ARC_HEIGHT,
                onLand: function () {
                    if (_this._map && _this._map.spawnBlackHoleZone) {
                        _this._map.spawnBlackHoleZone(target);
                    }
                }
            });
        }
        this._playShootGlow(OIL_SHELL_BULLET_TYPE, { effectColor: cc.color(130, 92, 180, 220) });
        if (this._map && this._map.playLightScreenShake) {
            this._map.playLightScreenShake();
        }
        MusicManager_1.MusicManager.playEffect("shoot");
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
        var mode = "charge";
        if (this._oilShellCount > 0) {
            mode = "oil";
        }
        else if (this._blackHoleShellCount > 0) {
            mode = "blackHole";
        }
        yyp.eventCenter.emit("skill-button-mode", { mode: mode });
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
        if (state.blackHoleAmmoCount != null) {
            var nextBlackHoleAmmoCount = Math.max(0, state.blackHoleAmmoCount);
            if (nextBlackHoleAmmoCount != this._blackHoleShellCount) {
                this._blackHoleShellCount = nextBlackHoleAmmoCount;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUM5QixJQUFNLDBCQUEwQixHQUFHLENBQUMsQ0FBQztBQUNyQyxJQUFNLDRCQUE0QixHQUFHLEdBQUcsQ0FBQztBQUN6QyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxJQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUNwQyxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNqQyxJQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUNuQyxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztB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QyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEQsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXBELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdkIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUN0QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDakIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUNmLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDeEIsRUFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBNEIsR0FBNUI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDekIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNsQixLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNsQixLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUVuQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2QixRQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVsQixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDdkIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FB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LEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FB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SUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPO0lBQ1AscUNBQW9CLEdBQXBCO1FBQ0ksT0FBTyxhQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQXJ0RVEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQXV0RWxCO0lBQUQsYUFBQztDQXZ0RUQsQUF1dEVDLENBdnRFMkIsWUFBSSxHQXV0RS9CO0FBdnRFWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFua30gZnJvbSBcIi4vVGFua0VcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0J1bGxldH0gZnJvbSBcIi4vQnVsbGV0RVwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi9zZGsvc2RrL1NES01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBQTEFZRVJfU0hPT1RfSU5URVJWQUwgPSAwLjM1O1xyXG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYID0gMztcclxuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkgPSAwLjg7XHJcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMID0gMC42O1xyXG5jb25zdCBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1QgPSA1ICogKDEgLSAwLjEpO1xyXG5jb25zdCBQTEFZRVJfRVhQX0JBU0UgPSAzMDtcclxuY29uc3QgUExBWUVSX0VYUF9TVEVQID0gMTU7XHJcbmNvbnN0IENIQVJHRV9DQU5OT05fQlVMTEVUX1RZUEUgPSA5OTtcclxuY29uc3QgT0lMX1NIRUxMX0JVTExFVF9UWVBFID0gMTAwO1xyXG5jb25zdCBPSUxfU0hFTExfTUFYX0NPVU5UID0gMTtcclxuY29uc3QgQkxBQ0tfSE9MRV9TSEVMTF9NQVhfQ09VTlQgPSAxO1xyXG5jb25zdCBPSUxfVEhST1dfUFJFVklFV19BUkNfSEVJR0hUID0gMTEwO1xyXG5jb25zdCBPSUxfVEhST1dfQVJFQV9SQURJVVMgPSAxMjA7XHJcbmNvbnN0IExPV19IUF9TQ1JFRU5fRkxBU0hfSU4gPSAwLjI7XHJcbmNvbnN0IExPV19IUF9TQ1JFRU5fRkxBU0hfT1VUID0gMC41O1xyXG5jb25zdCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0xPT1AgPSAzO1xyXG5jb25zdCBTSE9PVF9SRUNPSUxfRElTVEFOQ0UgPSAxMDtcclxuY29uc3QgU0hPT1RfUkVDT0lMX09VVF9USU1FID0gMC4wNDtcclxuY29uc3QgU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FID0gMC4xMTtcclxuY29uc3QgU0hPT1RfRkxBU0hfRkFERV9JTiA9IDAuMDI7XHJcbmNvbnN0IFNIT09UX0ZMQVNIX0ZBREVfT1VUID0gMC4wNztcclxuY29uc3QgU0FDUklGSUNFX0hQX1JBVElPID0gMC41O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFRhbmsge1xyXG5cclxuICAgIC8v5YaF6YOo5Y+Y6YePXHJcbiAgICBfbGV2ZWwgICAgICAgICAgPSAxOyAgICAgICAgLy/njqnlrrbnrYnnuqdcclxuXHJcbiAgICBfYnVsbGV0Q29kZVRpbWUgPSAwOyAgICAgICAgLy/lsITlh7vlhrfljbTml7bpl7RcclxuXHJcbiAgICBfaXNIaWdoQnVsbGV0ICAgPSBmYWxzZTsgICAgLy/kuInlj5Hpq5jpopHlrZDlvLlcclxuXHJcbiAgICBfc2tpbGwyVGltZSAgICAgPSAwOyAgICAgICAgLy/mioDog70yKOi2hee6p+WtkOW8uSnliankvZnml7bpl7RcclxuICAgIF9za2lsbDNUaW1lICAgICA9IDA7ICAgICAgICAvL+aKgOiDvTMo5peg5pWM6Ziy5b6hKeWJqeS9meaXtumXtFxyXG5cclxuICAgIF9pbkdhbWUgICAgICAgICA9IGZhbHNlOyAgICAvL+WcqOa4uOaIj+S4reS4reS9v+eUqFxyXG4gICAgX3ZpZXdNb2RlICAgICAgID0gZmFsc2U7ICAgIC8v5bGV56S65qih5byPXHJcbiAgICBfZnJlZUJ1bGxldENvdW50ID0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWDsgIC8v5b2T5YmN5YWN6LS55a2Q5by55pWw6YePXHJcbiAgICBfc3RvcEZpcmVUaW1lID0gMDsgICAgICAgICAgLy/lgZzngavorqHml7ZcclxuICAgIF9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwOyAvL+WFjei0ueWtkOW8ueaBouWkjeiuoeaXtlxyXG4gICAgX21vdmVJbnB1dERpciA9IGNjLnYyKDEsIDApOyAvL+enu+WKqOaRh+adhuebruagh+aWueWQkVxyXG4gICAgX21vdmVJbnB1dFJhdGlvID0gMDsgICAgICAgIC8v56e75Yqo5pGH5p2G55uu5qCH6YCf546HXHJcbiAgICBfbW92ZVNwZWVkU2NhbGUgPSAxOyAgICAgICAgLy/lsYDlhoXnp7vpgJ/lgI3njodcclxuICAgIF9lbmVyZ3lMZXZlbCA9IDE7ICAgICAgICAgICAvL+WxgOWGheiDvemHj+etiee6p1xyXG4gICAgX2VuZXJneUV4cCA9IDA7ICAgICAgICAgICAgIC8v5b2T5YmN57uP6aqMXHJcbiAgICBfZW5lcmd5TmVlZEV4cCA9IFBMQVlFUl9FWFBfQkFTRTsgLy/ljYfnuqfmiYDpnIDnu4/pqoxcclxuICAgIF9jaGFyZ2VDYW5ub25UaW1lID0gMDsgICAgICAvL+iThOWKm+eCruiThOWKm+aXtumXtFxyXG4gICAgX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7ICAgIC8v6JOE5Yqb54Ku5Ya35Y20XHJcbiAgICBfY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwOyAgLy/ok4Tlipvngq7lhrfljbTmgLvml7bplb9cclxuICAgIF9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IGZhbHNlO1xyXG4gICAgX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XHJcbiAgICBfY2hhcmdlRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICBfb2lsU2hlbGxDb3VudCA9IDA7XHJcbiAgICBfYmxhY2tIb2xlU2hlbGxDb3VudCA9IDA7XHJcbiAgICBfb2lsU2hlbGxQcmV2aWV3aW5nID0gZmFsc2U7XHJcbiAgICBfb2lsU2hlbGxQcmV2aWV3VGFyZ2V0ID0gbnVsbDtcclxuICAgIF9vaWxTaGVsbEFpbURpciA9IGNjLnYyKDEsIDApO1xyXG4gICAgX29pbFNoZWxsQWltUmF0aW8gPSAxO1xyXG4gICAgX2FjdGl2ZVRocm93U2tpbGxUeXBlID0gXCJcIjtcclxuICAgIF9idWxsZXRNdXRhdGlvblR5cGUgPSBcIlwiO1xyXG4gICAgX2J1bGxldE11dGF0aW9uRGF0YSA9IG51bGw7XHJcbiAgICBfYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcclxuICAgIF9tb3ZlRWZmZWN0SWQgPSAtMTtcclxuICAgIF9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID0gLTE7XHJcbiAgICBfbG93SHBTY3JlZW5FZmZlY3QgPSBudWxsO1xyXG4gICAgX3Nob290SW5wdXREaXIgPSBjYy52MigxLCAwKTsgICAvL+WwhOWHu+aRh+adhuebruagh+aWueWQkVxyXG4gICAgX2xvY2FsUHJldmlld0JhcnJlbERpciA9IG51bGw7ICAgLy/mnKzlnLDogZTmnLrnjqnlrrbngq7nrqHpooTop4jmlrnlkJEo5LuF6KGo546w5bGCKVxyXG4gICAgX2ZyYW1lSW5wdXQgPSBudWxsOyAgICAgICAgICAgICAvL+e9kee7nOW4p+i+k+WFpSjlpJrkuropXHJcbiAgICBfbXVsdGlwbGF5ZXJNb2RlID0gZmFsc2U7ICAgICAgIC8v5aSa5Lq65qih5byPKOemgeeUqOacrOWcsOaRh+adhilcclxuICAgIF9tdWx0aXBsYXllclJlbW90ZSA9IGZhbHNlOyAgICAgLy/lpJrkurrov5znq6/njqnlrrZcclxuICAgIF9tdWx0aXBsYXllclBsYXllcklkID0gLTE7ICAgICAgLy/lpJrkurrnjqnlrrZJRFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJZVSVxyXG4gICAgICAgIHRoaXMuX2luaXRVSSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluaOpeaUtuS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX2NhbXAgPSBcInBsYXllclwiOyAgLy/pmLXokKVcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLl9yYWRpdXMgKiAyOyAgICAvL+eOqeWutueahOeisOaSnuajgOa1i+iMg+WbtCoyXHJcbiAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgPSBQTEFZRVJfU0hPT1RfSU5URVJWQUw7XHJcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50ID0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWDtcclxuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcclxuICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSB0aGlzLl9kaXI7XHJcbiAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xyXG4gICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lMZXZlbCA9IDE7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5RXhwID0gMDtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lOZWVkRXhwID0gdGhpcy5fZ2V0RW5lcmd5TmVlZEV4cCgpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVTaGVsbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQWltRGlyID0gdGhpcy5fYmFycmVsRGlyICYmIHRoaXMuX2JhcnJlbERpci5tYWdTcXIoKSA+IDAgPyBjYy52Mih0aGlzLl9iYXJyZWxEaXIpLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1SYXRpbyA9IDE7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGhyb3dTa2lsbFR5cGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSAtMTtcclxuICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RJbnB1dERpciA9IHRoaXMuX2JhcnJlbERpcjtcclxuICAgICAgICB0aGlzLl9sb2NhbFByZXZpZXdCYXJyZWxEaXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5Z2m5YWL57G75Z6LXHJcbiAgICBzZXRQbGF5ZXJUeXBlKHRhbmtUeXBlLHBsYXllckxldmVsKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VGFua1R5cGUodGFua1R5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6K6h566X546p5a626KGA6YePIOaUu+WHu1xyXG4gICAgICAgIHRoaXMuX2xldmVsID0gcGxheWVyTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9tYXhIcCA9IHRoaXMuX2NvbmZpZy5IUCAqICh0aGlzLl9sZXZlbCsxKTtcclxuICAgICAgICB0aGlzLl9hdGsgPSB0aGlzLl9jb25maWcuQVRLICogKHRoaXMuX2xldmVsKzEpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE11bHRpcGxheWVyU2V0dXBQYXlsb2FkKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRhbmtUeXBlOiB0aGlzLl90YW5rVHlwZSxcclxuICAgICAgICAgICAgcGxheWVyTGV2ZWw6IHRoaXMuX2xldmVsLFxyXG4gICAgICAgICAgICBiYXNlSHA6IHRoaXMuX21heEhwLFxyXG4gICAgICAgICAgICBiYXNlQXRrOiB0aGlzLl9hdGssXHJcbiAgICAgICAgICAgIGJhc2VTcGVlZDogdGhpcy5fZ2V0Q29uZmlnVmFsdWUoXCJTcGVlZFwiLCAwKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWVUlcclxuICAgIF9pbml0VUkoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl9saWZlYmFyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwQXJtb3VyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEVuZXJneVVJKCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbmjqXmlLbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdqb3ktc3RpY2snLHRoaXMuX2RvSm95U3RpY2ssdGhpcyk7ICAgICAgLy/mkYfmnYbkuovku7ZcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2pveS1zdGljay1zaG9vdCcsdGhpcy5fZG9TaG9vdEpveVN0aWNrLHRoaXMpOyAvL+WwhOWHu+aRh+adhuS6i+S7tlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignY2hhcmdlLWNhbm5vbi1wcmVzcycsdGhpcy5fZG9DaGFyZ2VDYW5ub25QcmVzcyx0aGlzKTsgLy/ok4Tlipvngq7mjInkuItcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2NoYXJnZS1jYW5ub24tcmVsZWFzZScsdGhpcy5fZG9DaGFyZ2VDYW5ub25SZWxlYXNlLHRoaXMpOyAvL+iThOWKm+eCruadvuW8gFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignb2lsLXNoZWxsLXRyaWdnZXInLHRoaXMuX2RvT2lsU2hlbGxUcmlnZ2VyLHRoaXMpOyAvL+eEpuayueW8ueWPkeWwhFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndHJpZ2dlci1zYWNyaWZpY2UnLHRoaXMuX2RvU2FjcmlmaWNlLHRoaXMpOyAvL+eMruelreaMiemSrlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndHJpZ2dlci1jb3Zlci1hY3Rpb24nLHRoaXMuX2RvQ292ZXJBY3Rpb24sdGhpcyk7IC8v5o6p5L2T5ZC46ZmEL+WIhuemu1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndHJpZ2dlci1za2lsbCcsdGhpcy5fZG9Ta2lsbCx0aGlzKTsgICAgIC8v6Kem5Y+R5oqA6IO9XHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2pveS1zdGljaycsdGhpcy5fZG9Kb3lTdGljayx0aGlzKTsgICAgIC8v5pGH5p2G5LqL5Lu2XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignam95LXN0aWNrLXNob290Jyx0aGlzLl9kb1Nob290Sm95U3RpY2ssdGhpcyk7IC8v5bCE5Ye75pGH5p2G5LqL5Lu2XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY2hhcmdlLWNhbm5vbi1wcmVzcycsdGhpcy5fZG9DaGFyZ2VDYW5ub25QcmVzcyx0aGlzKTsgLy/ok4Tlipvngq7mjInkuItcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjaGFyZ2UtY2Fubm9uLXJlbGVhc2UnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZSx0aGlzKTsgLy/ok4Tlipvngq7mnb7lvIBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdvaWwtc2hlbGwtdHJpZ2dlcicsdGhpcy5fZG9PaWxTaGVsbFRyaWdnZXIsdGhpcyk7IC8v54Sm5rK55by55Y+R5bCEXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndHJpZ2dlci1zYWNyaWZpY2UnLHRoaXMuX2RvU2FjcmlmaWNlLHRoaXMpOyAvL+eMruelreaMiemSrlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItY292ZXItYWN0aW9uJyx0aGlzLl9kb0NvdmVyQWN0aW9uLHRoaXMpOyAvL+aOqeS9k+WQuOmZhC/liIbnprtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd0cmlnZ2VyLXNraWxsJyx0aGlzLl9kb1NraWxsLHRoaXMpOyAgICAvL+inpuWPkeaKgOiDvVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aRh+adhuS6i+S7tlxyXG4gICAgX2RvSm95U3RpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVJbnB1dERpciA9IGV2ZW50LmRpcjsgICAgICAvL+aWueWQkVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVJbnB1dFJhdGlvID0gZXZlbnQucmF0aW87ICAvL+mAn+eOh1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WwhOWHu+aRh+adhuS6i+S7tlxyXG4gICAgX2RvU2hvb3RKb3lTdGljayhldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX29pbFNoZWxsUHJldmlld2luZykgcmV0dXJuO1xyXG4gICAgICAgIGlmIChldmVudC5kaXIgJiYgZXZlbnQuZGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9vdElucHV0RGlyID0gZXZlbnQuZGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSBldmVudC5kaXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC5maXJlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyeUZpcmVPbmNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU11bHRpcGxheWVyTG9jYWxBaW1QcmV2aWV3KGRpcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8IHRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkaXIgfHwgZGlyLm1hZ1NxcigpIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2NhbFByZXZpZXdCYXJyZWxEaXIgPSBjYy52MihkaXIpLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v572R57uc5bin6L6T5YWlKOWkmuS6uuaooeW8jylcclxuICAgIHNldEZyYW1lSW5wdXQoaW5wdXRzKSB7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVJbnB1dCA9IGlucHV0cztcclxuICAgICAgICBpZiAoaW5wdXRzICYmIGlucHV0cy50aHJvd1Rhcikge1xyXG4gICAgICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID0gTnVtYmVyLmlzRmluaXRlKGlucHV0cy50aHJvd1Rhci5yYXRpbykgPyBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBpbnB1dHMudGhyb3dUYXIucmF0aW8pKSA6IHRoaXMuX29pbFNoZWxsQWltUmF0aW87XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLnRocm93VGFyLmRpclgpICYmIE51bWJlci5pc0Zpbml0ZShpbnB1dHMudGhyb3dUYXIuZGlyWSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJEaXIgPSBjYy52MihpbnB1dHMudGhyb3dUYXIuZGlyWCwgaW5wdXRzLnRocm93VGFyLmRpclkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhckRpci5tYWdTcXIoKSA+IDAuMDAwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQWltRGlyID0gdGFyRGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkaXIgPSBjYy52MigwLCAwKTtcclxuICAgICAgICBpZiAoaW5wdXRzLnVwKSBkaXIueSArPSAxO1xyXG4gICAgICAgIGlmIChpbnB1dHMuZG93bikgZGlyLnkgLT0gMTtcclxuICAgICAgICBpZiAoaW5wdXRzLmxlZnQpIGRpci54IC09IDE7XHJcbiAgICAgICAgaWYgKGlucHV0cy5yaWdodCkgZGlyLnggKz0gMTtcclxuICAgICAgICBpZiAoZGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSBkaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVJbnB1dFJhdGlvID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbnB1dHMuYWltICYmIE51bWJlci5pc0Zpbml0ZShpbnB1dHMuYWltLngpICYmIE51bWJlci5pc0Zpbml0ZShpbnB1dHMuYWltLnkpKSB7XHJcbiAgICAgICAgICAgIGxldCBhaW1EaXIgPSBjYy52MihpbnB1dHMuYWltLngsIGlucHV0cy5haW0ueSk7XHJcbiAgICAgICAgICAgIGlmIChhaW1EaXIubWFnU3FyKCkgPiAwLjAwMDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob290SW5wdXREaXIgPSBhaW1EaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9zaG9vdElucHV0RGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2V0RnJhbWVJbnB1dC0tLWlucHV0c1wiLGlucHV0cylcclxuICAgICAgICBpZiAoaW5wdXRzLmZpcmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZUJ5TXVsdGlwbGF5ZXJDb21tYW5kKGlucHV0cy5maXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXVsdGlwbGF5ZXJGaXJlVHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX3NraWxsMlRpbWUgPiAwKSA/IHRoaXMuX2NvbmZpZy5CVHlwZTIgOiB0aGlzLl9jb25maWcuQlR5cGUxO1xyXG4gICAgfVxyXG5cclxuICAgIF9kb0NoYXJnZUNhbm5vblByZXNzKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSB8fCB0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPiAwIHx8IHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2hpZGVDaGFyZ2VFZmZlY3QoKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwge3Byb2dyZXNzOiAwfSk7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJjaGFyZ2VDYW5ub25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZShldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFyZ2VDYW5ub24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2RvU2FjcmlmaWNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9PaWxTaGVsbFRyaWdnZXIoZXZlbnQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbENvdW50IDw9IDAgJiYgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJlc3NlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LnByZXNzZWQgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCBhaW1pbmcgPSAhIShldmVudCAmJiBldmVudC5haW1pbmcgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCByZWxlYXNlID0gISEoZXZlbnQgJiYgZXZlbnQucmVsZWFzZSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LmNhbmNlbGxlZCA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHByZXNzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWltaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU9pbFNoZWxsQWltKGV2ZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVsZWFzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21taXRPaWxTaGVsbFRocm93KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2RvQ292ZXJBY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSB8fCAhdGhpcy5fbWFwIHx8ICF0aGlzLl9tYXAudHJ5VG9nZ2xlQ292ZXJUZXN0QXR0YWNobWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcC50cnlUb2dnbGVDb3ZlclRlc3RBdHRhY2htZW50KHRoaXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+inpuWPkeaKgOiDvVxyXG4gICAgX2RvU2tpbGwoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbElkID0gZXZlbnQuc2tpbGxJZDsgICAgLy/mlrnlkJFcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwi6Kem5Y+R5LqG5oqA6IO9IFwiLHNraWxsSWQpO1xyXG4gICAgICAgICAgICBpZiAoc2tpbGxJZCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgnYWRkLWNvaW4nLHtjb3VudDp0aGlzLl9jb25maWcuQ29pbi8xMCxwb3NpdGlvbjpVdGlscy5nZXRXb3JsZFBvc2l0aW9uKHRoaXMubm9kZSl9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRW5lcmd5KHRoaXMuX21heEhwIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lICs9IDE1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSArPSAxNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PaWxTaGVsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FpbkJsYWNrSG9sZVNoZWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yi35paw546p5a625L2N572uXHJcbiAgICBfcmVmcmVzaFBvc2l0aW9uKGR0KSB7XHJcbiAgICAgICAgLy/lpJrkurrmqKHlvI/vvJrlnKhzZXRGcmFtZUlucHV05pi+5byP6LCD55So5YmN5ouS57ud5LiA5YiH56e75YqoXHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZnJhbWVJbnB1dCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2ZyYW1lSW5wdXQudXAgJiYgIXRoaXMuX2ZyYW1lSW5wdXQuZG93biAmJiAhdGhpcy5fZnJhbWVJbnB1dC5sZWZ0ICYmICF0aGlzLl9mcmFtZUlucHV0LnJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hNb3ZlU3BlZWQoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbW92ZUlucHV0UmF0aW8gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R1cm5EaXJUbyh0aGlzLl9tb3ZlSW5wdXREaXIsIGR0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyUG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcblxyXG4gICAgICAgIC8v56Kw5pKe5rWL6K+VXHJcbiAgICAgICAgbGV0IHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRoaXMuX2RpciwgdGhpcy5fY3VycmVudFNwZWVkKTtcclxuICAgICAgICBsZXQgY29sbGlkZXJJdGVtcyA9IHRoaXMuX21hcC50ZXN0Q29sbGlkZXJzKHdpbGxQb3NpdGlvbiwgdGhpcy5fcmFkaXVzKTtcclxuICAgICAgICBpZiAoY29sbGlkZXJJdGVtcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IHRlc3REaXIgPSB0aGlzLl9nZXRUZXN0RGlyKGN1cnJQb3NpdGlvbiwgdGhpcy5fcmFkaXVzLCB0aGlzLl9kaXIsIGNvbGxpZGVySXRlbXMpO1xyXG4gICAgICAgICAgICBpZiAodGVzdERpcikge1xyXG4gICAgICAgICAgICAgICAgd2lsbFBvc2l0aW9uID0gdGhpcy5fZ2V0V2lsbFBvc2l0aW9uKGN1cnJQb3NpdGlvbiwgdGVzdERpciwgdGhpcy5fY3VycmVudFNwZWVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2lsbFBvc2l0aW9uID0gdGhpcy5fbWFwLmNsYW1wTWFwSW5uZXJQb3NpdGlvbih3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHdpbGxQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNb3ZlU3BlZWQoZHQpIHtcclxuICAgICAgICBsZXQgdGVycmFpbkZhY3RvciA9IHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuZ2V0VGVycmFpblNwZWVkRmFjdG9yXHJcbiAgICAgICAgICAgID8gdGhpcy5fbWFwLmdldFRlcnJhaW5TcGVlZEZhY3Rvcih0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX3JhZGl1cylcclxuICAgICAgICAgICAgOiAxO1xyXG4gICAgICAgIGxldCBtYXhTcGVlZCA9IHRoaXMuX2dldENvbmZpZ1ZhbHVlKFwiU3BlZWRcIiwgMCkgKiB0aGlzLl9tb3ZlU3BlZWRTY2FsZSAqIHRlcnJhaW5GYWN0b3I7XHJcbiAgICAgICAgbGV0IHRhcmdldFNwZWVkID0gdGhpcy5fbW92ZUlucHV0UmF0aW8gPiAwID8gbWF4U3BlZWQgKiB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA6IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPCB0YXJnZXRTcGVlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgKz0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkFjY2VsZXJhdGlvblwiLCBtYXhTcGVlZCwgZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkID4gdGFyZ2V0U3BlZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IHRhcmdldFNwZWVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IHRhcmdldFNwZWVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCAtPSB0aGlzLl9nZXRGcmFtZVZhbHVlKFwiRGVjZWxlcmF0aW9uXCIsIG1heFNwZWVkLCBkdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPCB0YXJnZXRTcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gdGFyZ2V0U3BlZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRW5lcmd5KHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY292ZXJIcCA9IHRoaXMuX21heEhwIC0gdGhpcy5faHA7XHJcbiAgICAgICAgaWYgKHJlY292ZXJIcCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGFkZEhwID0gTWF0aC5taW4ocmVjb3ZlckhwLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hwICs9IGFkZEhwO1xyXG4gICAgICAgICAgICB2YWx1ZSAtPSBhZGRIcDtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYWRkRW5lcmd5RXhwKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF90cnlTYWNyaWZpY2VIcEZvckVuZXJneSgpIHtcclxuICAgICAgICBpZiAodGhpcy5faHAgPD0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93U2FjcmlmaWNlVGlwKFwi6KGA6YeP6L+H5L2OLOaXoOazleeMruelrVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1heFNhY3JpZmljZUhwID0gdGhpcy5faHAgLSAxO1xyXG4gICAgICAgIGxldCBzYWNyaWZpY2VIcCA9IE1hdGgubWluKHRoaXMuX2hwICogU0FDUklGSUNFX0hQX1JBVElPLCBtYXhTYWNyaWZpY2VIcCk7XHJcbiAgICAgICAgaWYgKHNhY3JpZmljZUhwIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1NhY3JpZmljZVRpcChcIuW9k+WJjeaXoOazleeMruelrVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faHAgLT0gc2FjcmlmaWNlSHA7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWRkRW5lcmd5RXhwKHNhY3JpZmljZUhwKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuICAgICAgICB0aGlzLl9wbGF5U2FjcmlmaWNlRmVlZGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBfYWRkRW5lcmd5RXhwKGV4cCkge1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUV4cCArPSBleHA7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2VuZXJneUV4cCA+PSB0aGlzLl9lbmVyZ3lOZWVkRXhwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUV4cCAtPSB0aGlzLl9lbmVyZ3lOZWVkRXhwO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lMZXZlbCsrO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lOZWVkRXhwID0gdGhpcy5fZ2V0RW5lcmd5TmVlZEV4cCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9sZXZlbFVwQnlFbmVyZ3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEVuZXJneU5lZWRFeHAoKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHl5cC5jb25maWcuRW5lcmd5IHx8IHt9O1xyXG4gICAgICAgIGxldCBiYXNlID0gY29uZmlnLkV4cEJhc2UgPT0gbnVsbCA/IFBMQVlFUl9FWFBfQkFTRSA6IGNvbmZpZy5FeHBCYXNlO1xyXG4gICAgICAgIGxldCBzdGVwID0gY29uZmlnLkV4cFN0ZXAgPT0gbnVsbCA/IFBMQVlFUl9FWFBfU1RFUCA6IGNvbmZpZy5FeHBTdGVwO1xyXG4gICAgICAgIHJldHVybiBiYXNlICsgKHRoaXMuX2VuZXJneUxldmVsIC0gMSkgKiBzdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIF9sZXZlbFVwQnlFbmVyZ3koKSB7XHJcbiAgICAgICAgbGV0IGNob2ljZXMgPSB0aGlzLl9idWlsZEVuZXJneVVwZ3JhZGVDaG9pY2VzKCk7XHJcbiAgICAgICAgaWYgKCFjaG9pY2VzIHx8IGNob2ljZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hvaWNlcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlUZXN0VXBncmFkZUNob2ljZShjaG9pY2VzW2luZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRFbmVyZ3lVSSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2xpZmViYXIgfHwgdGhpcy5fZmlyZS5fbGJIcExldmVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsZXZlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9sYkhwTGV2ZWxcIik7XHJcbiAgICAgICAgbGV2ZWxOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX2xpZmViYXI7XHJcbiAgICAgICAgbGV2ZWxOb2RlLnNldFBvc2l0aW9uKC0zNCwgMCk7XHJcbiAgICAgICAgbGV2ZWxOb2RlLnNldENvbnRlbnRTaXplKDM2LCAyNCk7XHJcbiAgICAgICAgbGV2ZWxOb2RlLnpJbmRleCA9IDEwO1xyXG4gICAgICAgIGxldCBsZXZlbExhYmVsID0gbGV2ZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5mb250U2l6ZSA9IDE4O1xyXG4gICAgICAgIGxldmVsTGFiZWwubGluZUhlaWdodCA9IDIwO1xyXG4gICAgICAgIGxldmVsTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsZXZlbExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsZXZlbE5vZGVbXCIkTGFiZWxcIl0gPSBsZXZlbExhYmVsO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiSHBMZXZlbCA9IGxldmVsTm9kZTtcclxuXHJcbiAgICAgICAgbGV0IGV4cE5vZGUgPSBuZXcgY2MuTm9kZShcIl9leHBCYXJcIik7XHJcbiAgICAgICAgZXhwTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9saWZlYmFyO1xyXG4gICAgICAgIGV4cE5vZGUuc2V0UG9zaXRpb24oLTM0LCAwKTtcclxuICAgICAgICBleHBOb2RlLnNldENvbnRlbnRTaXplKDQ0LCA0NCk7XHJcbiAgICAgICAgZXhwTm9kZS56SW5kZXggPSAwO1xyXG5cclxuICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZShcIl9leHBCZ1wiKTtcclxuICAgICAgICBiZy5wYXJlbnQgPSBleHBOb2RlO1xyXG4gICAgICAgIGxldCBiZ0dyYXBoaWNzID0gYmcuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgYmdHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDUwLCA2OCwgNzUsIDIyMCk7XHJcbiAgICAgICAgYmdHcmFwaGljcy5jaXJjbGUoMCwgMCwgMTgpO1xyXG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBiYXIgPSBuZXcgY2MuTm9kZShcIl9leHBQcm9ncmVzc1wiKTtcclxuICAgICAgICBiYXIucGFyZW50ID0gZXhwTm9kZTtcclxuICAgICAgICBsZXQgYmFyR3JhcGhpY3MgPSBiYXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiYXJHcmFwaGljcy5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgIGJhckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoOTAsIDI1NSwgMTQwLCAyNTUpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2V4cEJhciA9IGV4cE5vZGU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MgPSBiYXI7XHJcbiAgICAgICAgYmFyW1wiJEdyYXBoaWNzXCJdID0gYmFyR3JhcGhpY3M7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hFbmVyZ3lVSSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fbGJIcExldmVsICYmIHRoaXMuX2ZpcmUuX2xiSHBMZXZlbC4kTGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGJIcExldmVsLiRMYWJlbC5zdHJpbmcgPSB0aGlzLl9lbmVyZ3lMZXZlbC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzICYmIHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzLiRHcmFwaGljcykge1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLl9lbmVyZ3lOZWVkRXhwID4gMCA/IHRoaXMuX2VuZXJneUV4cCAvIHRoaXMuX2VuZXJneU5lZWRFeHAgOiAwO1xyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSB0aGlzLl9maXJlLl9leHBQcm9ncmVzcy4kR3JhcGhpY3M7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoOTAsIDI1NSwgMTQwLCAyNTUpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgMTgsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiBwcm9ncmVzcywgZmFsc2UpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fZmlyZS5fZXhwQmFyICYmIHRoaXMuX2ZpcmUuX2V4cEJhci4kUHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fZXhwQmFyLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHRoaXMuX2VuZXJneU5lZWRFeHAgPiAwID8gdGhpcy5fZW5lcmd5RXhwIC8gdGhpcy5fZW5lcmd5TmVlZEV4cCA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9lbnN1cmVNdWx0aXBsYXllck5hbWVVSSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2xpZmViYXIgfHwgdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuYW1lTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiUGxheWVyTmFtZVwiKTtcclxuICAgICAgICBuYW1lTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9saWZlYmFyO1xyXG4gICAgICAgIG5hbWVOb2RlLnNldFBvc2l0aW9uKDAsIDI2KTtcclxuICAgICAgICBuYW1lTm9kZS5zZXRDb250ZW50U2l6ZSgxMjAsIDI0KTtcclxuICAgICAgICBuYW1lTm9kZS56SW5kZXggPSAxMjtcclxuICAgICAgICBsZXQgbmFtZUxhYmVsID0gbmFtZU5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBuYW1lTGFiZWwuZm9udFNpemUgPSAxODtcclxuICAgICAgICBuYW1lTGFiZWwubGluZUhlaWdodCA9IDIwO1xyXG4gICAgICAgIG5hbWVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIG5hbWVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbmFtZU5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgIG5hbWVOb2RlW1wiJExhYmVsXCJdID0gbmFtZUxhYmVsO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZSA9IG5hbWVOb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE11bHRpcGxheWVyRGlzcGxheU5hbWUobmFtZSwgaXNMb2NhbCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5fZW5zdXJlTXVsdGlwbGF5ZXJOYW1lVUkoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZSB8fCAhdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lLiRMYWJlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2hvd05hbWUgPSBuYW1lIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lLiRMYWJlbC5zdHJpbmcgPSBzaG93TmFtZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYlBsYXllck5hbWUuY29sb3IgPSBpc0xvY2FsID8gY2MuY29sb3IoMTgwLCAyNTUsIDE4MCwgMjU1KSA6IGNjLmNvbG9yKDIxMCwgMjMwLCAyNTUsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lLmFjdGl2ZSA9IHNob3dOYW1lLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dTYWNyaWZpY2VUaXAodGV4dCkge1xyXG4gICAgICAgIGxldCBjaGFubmVsID0gU0RLTWFuYWdlci5nZXRDaGFubmVsKCk7XHJcbiAgICAgICAgaWYgKGNoYW5uZWwgJiYgY2hhbm5lbC5zaG93VG9hc3QpIHtcclxuICAgICAgICAgICAgY2hhbm5lbC5zaG93VG9hc3QodGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNjLmxvZyh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlTYWNyaWZpY2VGZWVkYmFjaygpIHtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcclxuICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcblxyXG4gICAgICAgIGxldCB3YXZlID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlV2F2ZVwiKTtcclxuICAgICAgICB3YXZlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICB3YXZlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIHdhdmUuekluZGV4ID0gMjg2O1xyXG4gICAgICAgIHdhdmUub3BhY2l0eSA9IDIxMDtcclxuICAgICAgICB3YXZlLnNjYWxlID0gMC43MjtcclxuICAgICAgICBsZXQgd2F2ZUdyYXBoaWNzID0gd2F2ZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5saW5lV2lkdGggPSA3O1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgODgsIDgyLCAyMzUpO1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTYpO1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB3YXZlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjYsIDIuMyksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMjYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZUdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZ2xvdy5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBnbG93LnpJbmRleCA9IDI4NTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNzIsIDY4LCA3MCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAyMCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xLCAxOTApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuMjIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjE4KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS43OClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KXtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xyXG4gICAgICAgICAgICAvL+WkmuS6uuaooeW8j++8muacquacieW4p+i+k+WFpeWJje+8jOWujOWFqOS4jeWkhOeQhuS7u+S9lemAu+i+kVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmIHRoaXMuX2ZyYW1lSW5wdXQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0OyAvLyDku43pnIDntK/orqHlhrfljbTpgb/lhY3pppbluKflsLHog73ov57lsIRcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwLl9wYXVzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlRnJlZUJ1bGxldFJlY292ZXIoZHQpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDaGFyZ2VDYW5ub24oZHQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxvd0hwVmlzdWFsKGR0KTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/njqnlrrblkozmioDog71pY29uLOeisOaSnuajgOa1i1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheWVyU2tpbGxJY29uQ29sbGlzaW9uVGVzdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFBvc2l0aW9uKGR0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29pbFNoZWxsUHJldmlld2luZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hCYXJyZWxEaXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEFuZ2xlKGR0LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hEaXNwbGF5QmFycmVsQW5nbGUoZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zeW5jQXR0YWNoZWRDb3ZlclRlc3RDb3Zlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwLnN5bmNBdHRhY2hlZENvdmVyVGVzdENvdmVyKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnJlZnJlc2hDb3ZlclRlc3RCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8g5oqA6IO9MijotoXnuqflrZDlvLkpXHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsMlRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsMlRpbWUgPSB0aGlzLl9za2lsbDJUaW1lIDwgMCA/IDAgOiB0aGlzLl9za2lsbDJUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSB0aGlzLl9za2lsbDJUaW1lID4gMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOaKgOiDvTMo5peg5pWM6Ziy5b6hKVxyXG4gICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lID0gdGhpcy5fc2tpbGwzVGltZSA8IDAgPyAwIDogdGhpcy5fc2tpbGwzVGltZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3BTa2lsbDMuYWN0aXZlID0gdGhpcy5fc2tpbGwzVGltZSA+IDA7XHJcbiAgICBcclxuICAgICAgICAgICAgLy/mmL7npLrpk6DnlLJcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3BBcm1vdXIuYWN0aXZlID0gdGhpcy5fc2tpbGwzVGltZSA+IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZiA9IHRoaXMuX3NraWxsM1RpbWUgPiAwID8gMTAwMDAwMDAgOiAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IHRoaXMuX21hcC5qdWRnZXpJbmRleCh0aGlzLm5vZGUueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fdmlld01vZGUpe1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyh0aGlzLl9kaXIsLTAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xyXG4gICAgICAgICAgICB0aGlzLnNob290aW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkRW5lcmd5VXBncmFkZUNob2ljZXMoKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHl5cC5jb25maWcuRW5lcmd5IHx8IHt9O1xyXG4gICAgICAgIGxldCBocEFkZCA9IGNvbmZpZy5MZXZlbEhwQWRkID09IG51bGwgPyBNYXRoLm1heCgyNSwgTWF0aC5yb3VuZCh0aGlzLl9tYXhIcCAqIDAuMjIpKSA6IGNvbmZpZy5MZXZlbEhwQWRkO1xyXG4gICAgICAgIGxldCBhdGtBZGQgPSBjb25maWcuTGV2ZWxEYW1hZ2VBZGQgPT0gbnVsbFxyXG4gICAgICAgICAgICA/IChjb25maWcuTGV2ZWxBdGtBZGQgPT0gbnVsbCA/IE1hdGgubWF4KDgsIE1hdGgucm91bmQodGhpcy5fYXRrICogMC4xOCkpIDogY29uZmlnLkxldmVsQXRrQWRkKVxyXG4gICAgICAgICAgICA6IGNvbmZpZy5MZXZlbERhbWFnZUFkZDtcclxuICAgICAgICBsZXQgc3BlZWRBZGQgPSBjb25maWcuTGV2ZWxTcGVlZEFkZCA9PSBudWxsID8gMTggOiBjb25maWcuTGV2ZWxTcGVlZEFkZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiaHBcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuijheeUsuW8uuWMllwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnlJ/lkb3kuIrpmZDmj5DljYflubbnq4vliLvlm57mu6FcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiSFBcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBocEFkZCxcclxuICAgICAgICAgICAgICAgIGFtb3VudDogaHBBZGQsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMTIwLCAyNTUsIDE3MCwgMjU1KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYXRrXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLngavlipvlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5pS75Ye75Yqb5o+Q5Y2HLCDovpPlh7rmm7Tpq5hcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiQVRLXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgYXRrQWRkLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBhdGtBZGQsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCAxODUsIDkwLCAyNTUpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJzcGVlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5o6o6L+b5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuenu+WKqOmAn+W6puaPkOWNhywg6LWw5L2N5pu054G15rS7XCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIlNQRFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIHNwZWVkQWRkICsgXCIlXCIsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IHNwZWVkQWRkLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDExMCwgMjEwLCAyNTUsIDI1NSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXN0VXBncmFkZUNob2ljZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkRW5lcmd5VXBncmFkZUNob2ljZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2VzKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImJvdW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5Y+N5by55a2Q5by5XCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIueisOWimeWQjuiHquWKqOWPjeW8uTHmrKFcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwi5Y+NXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwieDFcIixcclxuICAgICAgICAgICAgICAgIGJvdW5jZUNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDkwLCAxODAsIDI1NSwgMjU1KSxcclxuICAgICAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjYy5jb2xvcig5MCwgMTgwLCAyNTUsIDIxMCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcInBlbmV0cmF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi56m/6YCP5a2Q5by5XCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIui/nue7reepv+mAjzPkuKrnm67moIflkI7mtojlpLFcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwi56m/XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwieDNcIixcclxuICAgICAgICAgICAgICAgIHBlbmV0cmF0ZUNvdW50OiAzLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDI1NSwgOTIsIDkyLCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDI1NSwgOTIsIDkyLCAyMTApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJoZWF2eVwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi6YeN54Ku5a2Q5by5XCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuS8pOWus+aPkOWNhzYwJSwg5a2Q5by55pu05aSnXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIumHjVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIis2MCVcIixcclxuICAgICAgICAgICAgICAgIGRhbWFnZVJhdGlvOiAxLjYsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMS4zNSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigyNTUsIDIxMCwgOTAsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBlZmZlY3RDb2xvcjogY2MuY29sb3IoMjU1LCAyMTAsIDkwLCAyMTApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlUZXN0VXBncmFkZUNob2ljZShjaG9pY2UpIHtcclxuICAgICAgICBpZiAoIWNob2ljZSB8fCAhY2hvaWNlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaG9pY2UuaWQgPT0gXCJocFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21heEhwICs9IGNob2ljZS5hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNob2ljZS5pZCA9PSBcImF0a1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0ayArPSBjaG9pY2UuYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjaG9pY2UuaWQgPT0gXCJzcGVlZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlICs9IGNob2ljZS5hbW91bnQgLyAxMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zaG93VXBncmFkZUZsb2F0KGNob2ljZSk7XHJcbiAgICAgICAgdGhpcy5fcGxheVVwZ3JhZGVTZWxlY3RGZWVkYmFjayhjaG9pY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlKGNob2ljZSkge1xyXG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFjaG9pY2UuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25UeXBlID0gY2hvaWNlLmlkO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgaWQ6IGNob2ljZS5pZCxcclxuICAgICAgICAgICAgdGl0bGU6IGNob2ljZS50aXRsZSxcclxuICAgICAgICAgICAgc2hvcnRMYWJlbDogY2hvaWNlLnNob3J0TGFiZWwsXHJcbiAgICAgICAgICAgIHZhbHVlVGV4dDogY2hvaWNlLnZhbHVlVGV4dCxcclxuICAgICAgICAgICAgYm91bmNlQ291bnQ6IGNob2ljZS5ib3VuY2VDb3VudCB8fCAwLFxyXG4gICAgICAgICAgICBwZW5ldHJhdGVDb3VudDogY2hvaWNlLnBlbmV0cmF0ZUNvdW50IHx8IDAsXHJcbiAgICAgICAgICAgIGRhbWFnZVJhdGlvOiBjaG9pY2UuZGFtYWdlUmF0aW8gfHwgMSxcclxuICAgICAgICAgICAgc2NhbGU6IGNob2ljZS5zY2FsZSB8fCAxLFxyXG4gICAgICAgICAgICBjb2xvcjogY2hvaWNlLmNvbG9yLFxyXG4gICAgICAgICAgICBlZmZlY3RDb2xvcjogY2hvaWNlLmVmZmVjdENvbG9yIHx8IGNob2ljZS5jb2xvcixcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9zaG93QnVsbGV0TXV0YXRpb25NZWRhbCh0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2sodGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q3VycmVudEJ1bGxldE11dGF0aW9uRGF0YSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKTtcclxuICAgICAgICBkYXRhLmNvbG9yID0gdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmNvbG9yO1xyXG4gICAgICAgIGRhdGEuZWZmZWN0Q29sb3IgPSB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3I7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dVcGdyYWRlRmxvYXQoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmbG9hdE5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlRmxvYXRcIik7XHJcbiAgICAgICAgZmxvYXROb2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgZmxvYXROb2RlLnNldFBvc2l0aW9uKGNjLnYzKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSArIDExMCwgMCkpO1xyXG4gICAgICAgIGZsb2F0Tm9kZS56SW5kZXggPSA2NTAwO1xyXG4gICAgICAgIGZsb2F0Tm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBmbG9hdE5vZGUuc2NhbGUgPSAwLjgyO1xyXG5cclxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQmFkZ2VcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gZmxvYXROb2RlO1xyXG4gICAgICAgIGJhZGdlLnNldFBvc2l0aW9uKC00NCwgNCk7XHJcbiAgICAgICAgbGV0IGJhZGdlR3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbENvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI0KTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjQpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVCYWRnZUxhYmVsXCIpO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDU0LCAzMik7XHJcbiAgICAgICAgbGV0IGJhZGdlTGFiZWwgPSBiYWRnZUxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnNob3J0TGFiZWw7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC5mb250U2l6ZSA9IGNob2ljZS5zaG9ydExhYmVsLmxlbmd0aCA+IDIgPyAxNSA6IDE4O1xyXG4gICAgICAgIGJhZGdlTGFiZWwubGluZUhlaWdodCA9IDIwO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBiYWRnZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVWYWx1ZVwiKTtcclxuICAgICAgICB2YWx1ZU5vZGUucGFyZW50ID0gZmxvYXROb2RlO1xyXG4gICAgICAgIHZhbHVlTm9kZS5zZXRQb3NpdGlvbigyMiwgOCk7XHJcbiAgICAgICAgdmFsdWVOb2RlLmNvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIHZhbHVlTm9kZS5zZXRDb250ZW50U2l6ZSgxNzAsIDM4KTtcclxuICAgICAgICBsZXQgdmFsdWVMYWJlbCA9IHZhbHVlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHZhbHVlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnZhbHVlVGV4dDtcclxuICAgICAgICB2YWx1ZUxhYmVsLmZvbnRTaXplID0gMzQ7XHJcbiAgICAgICAgdmFsdWVMYWJlbC5saW5lSGVpZ2h0ID0gMzg7XHJcbiAgICAgICAgdmFsdWVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcclxuICAgICAgICB2YWx1ZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVUaXRsZVwiKTtcclxuICAgICAgICB0aXRsZU5vZGUucGFyZW50ID0gZmxvYXROb2RlO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRQb3NpdGlvbigxNiwgLTI0KTtcclxuICAgICAgICB0aXRsZU5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRDb250ZW50U2l6ZSgyMjAsIDI4KTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnRpdGxlO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAyNDtcclxuICAgICAgICB0aXRsZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5MRUZUO1xyXG4gICAgICAgIHRpdGxlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBmbG9hdE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4wNCksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuNTUsIDAsIDcyKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC41NSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1VwZ3JhZGVUb2FzdChjaG9pY2UpIHtcclxuICAgICAgICBpZiAoIWNob2ljZSB8fCAhdGhpcy5ub2RlIHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvYXN0ID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZVRvYXN0XCIpO1xyXG4gICAgICAgIHRvYXN0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICB0b2FzdC5zZXRQb3NpdGlvbigwLCB0aGlzLl9yYWRpdXMgKyA3Nik7XHJcbiAgICAgICAgdG9hc3QuekluZGV4ID0gMzYwO1xyXG4gICAgICAgIHRvYXN0Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRvYXN0LnNjYWxlID0gMC44ODtcclxuXHJcbiAgICAgICAgbGV0IGJnID0gdG9hc3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiZy5maWxsQ29sb3IgPSBjYy5jb2xvcigyMCwgMjQsIDM0LCAyMjgpO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtMTEwLCAtMjAsIDIyMCwgNDAsIDE0KTtcclxuICAgICAgICBiZy5maWxsKCk7XHJcbiAgICAgICAgYmcubGluZVdpZHRoID0gMztcclxuICAgICAgICBiZy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBiZy5yb3VuZFJlY3QoLTExMCwgLTIwLCAyMjAsIDQwLCAxNCk7XHJcbiAgICAgICAgYmcuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVG9hc3RMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gdG9hc3Q7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDIwNCwgMzApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gY2hvaWNlLnRpdGxlICsgXCIgXCIgKyBjaG9pY2UudmFsdWVUZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMTg7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDIyO1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICB0b2FzdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNyksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIyKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjIyLCAwLCAxOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dPaWxQaWNrdXBGZWVkYmFjaygpIHtcclxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl9vaWxQaWNrdXBSZWFkeVwiKTtcclxuICAgICAgICBiYWRnZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oMCwgdGhpcy5fcmFkaXVzICsgNDgpO1xyXG4gICAgICAgIGJhZGdlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJhZGdlLnNjYWxlID0gMC43O1xyXG4gICAgICAgIGJhZGdlLnpJbmRleCA9IDMyMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYmFkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3OCwgNTIsIDI2LCAyMzUpO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtNjgsIC0xOCwgMTM2LCAzNiwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMDUsIDEyMiwgMjM1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTY4LCAtMTgsIDEzNiwgMzYsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX29pbFBpY2t1cFJlYWR5TGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgxMjQsIDI4KTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDIzMiwgMTcyLCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi54Sm5rK55by55bCx57uqXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGJhZGdlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDEyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC42KSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yLCAwLCAxNilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dCbGFja0hvbGVQaWNrdXBGZWVkYmFjaygpIHtcclxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl9ibGFja0hvbGVQaWNrdXBSZWFkeVwiKTtcclxuICAgICAgICBiYWRnZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oMCwgdGhpcy5fcmFkaXVzICsgNDgpO1xyXG4gICAgICAgIGJhZGdlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJhZGdlLnNjYWxlID0gMC43O1xyXG4gICAgICAgIGJhZGdlLnpJbmRleCA9IDMyMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYmFkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig0MiwgMjQsIDg4LCAyMzUpO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtNzQsIC0xOCwgMTQ4LCAzNiwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTk4LCAxMzgsIDI1NSwgMjM1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTc0LCAtMTgsIDE0OCwgMzYsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2JsYWNrSG9sZVBpY2t1cFJlYWR5TGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgxMzYsIDI4KTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyMzQsIDIxNCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi6buR5rSe5by55bCx57uqXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGJhZGdlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDEyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC42KSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yLCAwLCAxNilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHdhdmUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlV2F2ZVwiKTtcclxuICAgICAgICB3YXZlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICB3YXZlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIHdhdmUuekluZGV4ID0gMjgwO1xyXG4gICAgICAgIHdhdmUub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICB3YXZlLnNjYWxlID0gMC41NTtcclxuICAgICAgICBsZXQgd2F2ZUdyYXBoaWNzID0gd2F2ZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5saW5lV2lkdGggPSA4O1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICB3YXZlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE4KTtcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjMsIDMuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMylcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZ2xvdy5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBnbG93LnpJbmRleCA9IDI3NTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjc1O1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNob2ljZS5jb2xvci5yLCBjaG9pY2UuY29sb3IuZywgY2hvaWNlLmNvbG9yLmIsIDkwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDI2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEyLCAxODApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjI4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xOCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTMwMSk7XHJcbiAgICAgICAgbGV0IHB1bmNoID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjA4KSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDEpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBwdW5jaC5zZXRUYWcoOTMwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihwdW5jaCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0J1bGxldE11dGF0aW9uTWVkYWwoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZWRhbCA9IG5ldyBjYy5Ob2RlKFwiX2J1bGxldE11dGF0aW9uTWVkYWxcIik7XHJcbiAgICAgICAgbWVkYWwucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBtZWRhbC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxMTIsIDApKTtcclxuICAgICAgICBtZWRhbC56SW5kZXggPSA2NjAwO1xyXG4gICAgICAgIG1lZGFsLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIG1lZGFsLnNjYWxlID0gMC44ODtcclxuXHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfbWVkYWxCYWRnZVwiKTtcclxuICAgICAgICBiYWRnZS5wYXJlbnQgPSBtZWRhbDtcclxuICAgICAgICBsZXQgYmFkZ2VHcmFwaGljcyA9IGJhZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5maWxsQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGJhZGdlTGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbWVkYWxCYWRnZUxhYmVsXCIpO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDUyLCAzMik7XHJcbiAgICAgICAgbGV0IGJhZGdlTGFiZWwgPSBiYWRnZUxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnNob3J0TGFiZWw7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC5mb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIGJhZGdlTGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGJhZGdlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBiYWRnZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsVGl0bGVcIik7XHJcbiAgICAgICAgdGl0bGVOb2RlLnBhcmVudCA9IG1lZGFsO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRQb3NpdGlvbigwLCAtNDgpO1xyXG4gICAgICAgIHRpdGxlTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgdGl0bGVOb2RlLnNldENvbnRlbnRTaXplKDIyMCwgMzIpO1xyXG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gdGl0bGVOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5zdHJpbmcgPSBjaG9pY2UudGl0bGU7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIHRpdGxlTGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIHRpdGxlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbWVkYWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4wMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxLjg4KSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMzUpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMzUsIDAsIDM0KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaEJ1bGxldE11dGF0aW9uRWZmZWN0KCkge1xyXG4gICAgICAgIHRoaXMuX2hpZGVCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xyXG4gICAgICAgIGlmICghdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGxldCBlZmZlY3QgPSBuZXcgY2MuTm9kZShcIl9idWxsZXRNdXRhdGlvbk11enpsZUVmZmVjdFwiKTtcclxuICAgICAgICBlZmZlY3QucGFyZW50ID0gYmFycmVsTm9kZTtcclxuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24oY2MudjModGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbigtMikpKTtcclxuICAgICAgICBlZmZlY3QuekluZGV4ID0gOTY7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gZWZmZWN0O1xyXG5cclxuICAgICAgICBsZXQgb3V0ZXIgPSBuZXcgY2MuTm9kZShcIl9tdXp6bGVPdXRlclwiKTtcclxuICAgICAgICBvdXRlci5wYXJlbnQgPSBlZmZlY3Q7XHJcbiAgICAgICAgbGV0IG91dGVyR3JhcGhpY3MgPSBvdXRlci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IodGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yLnIsIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvci5nLCB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3IuYiwgOTApO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE2KTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyID0gbmV3IGNjLk5vZGUoXCJfbXV6emxlSW5uZXJcIik7XHJcbiAgICAgICAgaW5uZXIucGFyZW50ID0gZWZmZWN0O1xyXG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGxDb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmNpcmNsZSgwLCAwLCA4KTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yMiwgMS4yMiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4yMiwgMjIwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yMiwgMC45KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjIyLCAxNTApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVCdWxsZXRNdXRhdGlvbkVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaE1vdmVFZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdmVFZmZlY3RJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IE11c2ljTWFuYWdlci5wbGF5TG9vcEVmZmVjdChcInRhbmtNb3ZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zdG9wTW92ZUVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbW92ZUVmZmVjdElkID49IDApIHtcclxuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnN0b3BFZmZlY3QodGhpcy5fbW92ZUVmZmVjdElkKTtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUVmZmVjdElkID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g54Ku566h5Y+q6Lef6ZqP5Y+z5L6n5Y+R5bCE5pGH5p2G5pa55ZCRXHJcbiAgICBfcmVmcmVzaEJhcnJlbERpcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvb3RJbnB1dERpciAmJiB0aGlzLl9zaG9vdElucHV0RGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9zaG9vdElucHV0RGlyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZ2V0RGlzcGxheUJhcnJlbERpcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmICF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSAmJiB0aGlzLl9sb2NhbFByZXZpZXdCYXJyZWxEaXIgJiYgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFycmVsRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoRGlzcGxheUJhcnJlbEFuZ2xlKGR0ID0gMSAvIDYwKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlzcGxheURpciA9IHRoaXMuX2dldERpc3BsYXlCYXJyZWxEaXIoKTtcclxuICAgICAgICBpZiAoIWRpc3BsYXlEaXIgfHwgZGlzcGxheURpci5tYWdTcXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmcm9tQW5nbGUgPSB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZTtcclxuICAgICAgICBsZXQgdG9BbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3MoZGlzcGxheURpcik7XHJcbiAgICAgICAgbGV0IGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICBpZiAoZGlzQW5nbGUgPiAxODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlICsgMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLTE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgLSAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXhUdXJuQW5nbGUgPSB0aGlzLl9nZXRGcmFtZVZhbHVlKFwiQW5ndWxhclNwZWVkXCIsIDEwLCBkdCkgKiAxLjY7XHJcbiAgICAgICAgaWYgKG1heFR1cm5BbmdsZSA8PSAwIHx8IE1hdGguYWJzKGRpc0FuZ2xlKSA8PSBtYXhUdXJuQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSB0b0FuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmFycmVsLmFuZ2xlICsgKGRpc0FuZ2xlID4gMCA/IG1heFR1cm5BbmdsZSA6IC1tYXhUdXJuQW5nbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSA9IFV0aWxzLmNvcnJlY3Rpb25BbmdsZSh0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Y+z5L6n5oyJ6ZKu5oqs6LW35pe255u05o6l5Y+R5bCE5LiA5Y+RLCDkuI3otbDmjInkvY/mjIHnu63lj5HlsITpgLvovpFcclxuICAgIGZpcmVPbmNlKCkge1xyXG4gICAgICAgIGxldCB0eXBlID0gKHRoaXMuX3ZpZXdNb2RlIHx8IHRoaXMuX3NraWxsMlRpbWUgPiAwKSA/IHRoaXMuX2NvbmZpZy5CVHlwZTIgOiB0aGlzLl9jb25maWcuQlR5cGUxO1xyXG4gICAgICAgIGxldCBhdHRhY2tSYWRpdXMgPSB0aGlzLl92aWV3TW9kZSA/IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAwLjggOnRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXM7XHJcbiAgICAgICAgbGV0IG11dGF0aW9uRGF0YSA9IHRoaXMuX3ZpZXdNb2RlID8gbnVsbCA6IHRoaXMuX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKTtcclxuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgodHlwZSx0aGlzLm5vZGUucG9zaXRpb24sdGhpcy5fYmFycmVsRGlyLHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCsyMCxhdHRhY2tSYWRpdXMsdGhpcy5fYXRrLHRoaXMuX2NhbXAsdGhpcy5ub2RlLnBhcmVudCx0aGlzLl9tYXAsOCxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmlzU2hvb3RFZmZlY3RUZXN0TW9kZSAmJiB0aGlzLl9tYXAuaXNTaG9vdEVmZmVjdFRlc3RNb2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGxheVNob290RmVlZGJhY2sodHlwZSwgbXV0YXRpb25EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlICYmIHRoaXMuX21hcC5lbmVteUNvdW50KCkgPiAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9maXJlQnlNdWx0aXBsYXllckNvbW1hbmQoZmlyZURhdGEpIHtcclxuICAgICAgICBpZiAoIWZpcmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eXBlID0gZmlyZURhdGEudHlwZSB8fCB0aGlzLmdldE11bHRpcGxheWVyRmlyZVR5cGUoKTtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cztcclxuICAgICAgICBsZXQgbXV0YXRpb25EYXRhID0gdGhpcy5fZ2V0Q3VycmVudEJ1bGxldE11dGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGxldCBuZXR3b3JrTWV0YSA9IHtcclxuICAgICAgICAgICAgYnVsbGV0SWQ6IGZpcmVEYXRhLmlkLFxyXG4gICAgICAgICAgICBvd25lclBsYXllcklkOiB0aGlzLl9tdWx0aXBsYXllclBsYXllcklkLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KFxyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24sXHJcbiAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpcixcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuaGVpZ2h0ICsgMjAsXHJcbiAgICAgICAgICAgIGF0dGFja1JhZGl1cyxcclxuICAgICAgICAgICAgdGhpcy5fYXRrLFxyXG4gICAgICAgICAgICB0aGlzLl9jYW1wLFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LFxyXG4gICAgICAgICAgICB0aGlzLl9tYXAsXHJcbiAgICAgICAgICAgIDgsXHJcbiAgICAgICAgICAgIG11dGF0aW9uRGF0YSxcclxuICAgICAgICAgICAgbmV0d29ya01ldGFcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXlTaG9vdEZlZWRiYWNrKHR5cGUsIG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5U2hvb3RGZWVkYmFjayhidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpIHtcclxuICAgICAgICB0aGlzLl9wbGF5QmFycmVsUmVjb2lsKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheU11enpsZUZsYXNoKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdFNoYWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlCYXJyZWxSZWNvaWwoKSB7XHJcbiAgICAgICAgbGV0IHJlY29pbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgKHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fbHlCYXJyZWwpO1xyXG4gICAgICAgIGlmICghcmVjb2lsTm9kZSB8fCAhY2MuaXNWYWxpZChyZWNvaWxOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gcmVjb2lsTm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKCFwYXJlbnROb2RlIHx8ICFjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYXNlUG9zID0gcmVjb2lsTm9kZVtcIl9zaG9vdEJhc2VQb3NcIl07XHJcbiAgICAgICAgaWYgKCFiYXNlUG9zKSB7XHJcbiAgICAgICAgICAgIGJhc2VQb3MgPSBjYy52MyhyZWNvaWxOb2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgcmVjb2lsTm9kZVtcIl9zaG9vdEJhc2VQb3NcIl0gPSBjYy52MyhiYXNlUG9zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYXNlV29ybGRQb3MgPSBwYXJlbnROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihiYXNlUG9zKTtcclxuICAgICAgICBsZXQgcmVjb2lsRGlyID0gdGhpcy5fYmFycmVsRGlyICYmIHRoaXMuX2JhcnJlbERpci5tYWdTcXIoKSA+IDAgPyB0aGlzLl9iYXJyZWxEaXIubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcclxuICAgICAgICBsZXQgcmVjb2lsV29ybGRQb3MgPSBjYy52MihiYXNlV29ybGRQb3MpLnN1YihyZWNvaWxEaXIubXVsKFNIT09UX1JFQ09JTF9ESVNUQU5DRSkpO1xyXG4gICAgICAgIGxldCByZWNvaWxMb2NhbFBvcyA9IHBhcmVudE5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocmVjb2lsV29ybGRQb3MpO1xyXG5cclxuICAgICAgICByZWNvaWxOb2RlLnN0b3BBY3Rpb25CeVRhZyg5MDA0KTtcclxuICAgICAgICByZWNvaWxOb2RlLnNldFBvc2l0aW9uKGJhc2VQb3MpO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MubW92ZVRvKFNIT09UX1JFQ09JTF9PVVRfVElNRSwgcmVjb2lsTG9jYWxQb3MueCwgcmVjb2lsTG9jYWxQb3MueSksXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbyhTSE9PVF9SRUNPSUxfUkVUVVJOX1RJTUUsIGJhc2VQb3MueCwgYmFzZVBvcy55KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYWN0aW9uLnNldFRhZyg5MDA0KTtcclxuICAgICAgICByZWNvaWxOb2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5TXV6emxlRmxhc2goYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XHJcbiAgICAgICAgaWYgKCFiYXJyZWxOb2RlIHx8ICFjYy5pc1ZhbGlkKGJhcnJlbE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlZmZlY3RDb2xvciA9IHRoaXMuX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcclxuICAgICAgICBsZXQgZmxhc2ggPSBuZXcgY2MuTm9kZShcIl9zaG9vdE11enpsZUZsYXNoXCIpO1xyXG4gICAgICAgIGZsYXNoLnBhcmVudCA9IGJhcnJlbE5vZGU7XHJcbiAgICAgICAgZmxhc2guc2V0UG9zaXRpb24oY2MudjModGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbig2KSkpO1xyXG4gICAgICAgIGZsYXNoLnpJbmRleCA9IDExNTtcclxuICAgICAgICBmbGFzaC5vcGFjaXR5ID0gMDtcclxuICAgICAgICBmbGFzaC5zY2FsZVggPSAwLjI4O1xyXG4gICAgICAgIGZsYXNoLnNjYWxlWSA9IDAuNzI7XHJcblxyXG4gICAgICAgIGxldCBjb25lID0gbmV3IGNjLk5vZGUoXCJfZmxhc2hDb25lXCIpO1xyXG4gICAgICAgIGNvbmUucGFyZW50ID0gZmxhc2g7XHJcbiAgICAgICAgbGV0IGNvbmVHcmFwaGljcyA9IGNvbmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjb25lR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoZWZmZWN0Q29sb3IuciwgZWZmZWN0Q29sb3IuZywgZWZmZWN0Q29sb3IuYiwgMjEwKTtcclxuICAgICAgICBjb25lR3JhcGhpY3MubW92ZVRvKDAsIDM2KTtcclxuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKC0xNywgOCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygtNywgLTgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oMCwgNCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbyg3LCAtOCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygxNywgOCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmNsb3NlKCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGNvcmUgPSBuZXcgY2MuTm9kZShcIl9mbGFzaENvcmVcIik7XHJcbiAgICAgICAgY29yZS5wYXJlbnQgPSBmbGFzaDtcclxuICAgICAgICBsZXQgY29yZUdyYXBoaWNzID0gY29yZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1MCwgMjIwLCAyMzUpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5jaXJjbGUoMCwgMCwgMTEpO1xyXG4gICAgICAgIGNvcmVHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGZsYXNoLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oU0hPT1RfRkxBU0hfRkFERV9JTiwgMjU1KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oU0hPT1RfRkxBU0hfRkFERV9JTiwgMS4xLCAxLjE4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoU0hPT1RfRkxBU0hfRkFERV9PVVQpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhTSE9PVF9GTEFTSF9GQURFX09VVCwgMC41NSwgMS42NSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlTaG9vdEdsb3coYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgbGV0IGVmZmVjdENvbG9yID0gdGhpcy5fZ2V0U2hvb3RFZmZlY3RDb2xvcihidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMubm9kZS5wYXJlbnQgfHwgIWNjLmlzVmFsaWQodGhpcy5ub2RlLnBhcmVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG11enpsZUdsb3cgPSBuZXcgY2MuTm9kZShcIl9zaG9vdE11enpsZUdsb3dcIik7XHJcbiAgICAgICAgbXV6emxlR2xvdy5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIG11enpsZUdsb3cuc2V0UG9zaXRpb24oY2MudjModGhpcy5fZ2V0QmFycmVsTXV6emxlUG9zaXRpb24oMCkpKTtcclxuICAgICAgICBtdXp6bGVHbG93LnpJbmRleCA9IDI4NTtcclxuICAgICAgICBtdXp6bGVHbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIG11enpsZUdsb3cuc2NhbGUgPSAwLjU7XHJcbiAgICAgICAgbGV0IG11enpsZUdsb3dHcmFwaGljcyA9IG11enpsZUdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoZWZmZWN0Q29sb3IuciwgZWZmZWN0Q29sb3IuZywgZWZmZWN0Q29sb3IuYiwgOTUpO1xyXG4gICAgICAgIG11enpsZUdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xyXG4gICAgICAgIG11enpsZUdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgbXV6emxlR2xvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMDMsIDIxMCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDMsIDEuMDUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuNjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgYm9keUdsb3cgPSBuZXcgY2MuTm9kZShcIl9zaG9vdEJvZHlHbG93XCIpO1xyXG4gICAgICAgIGJvZHlHbG93LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBib2R5R2xvdy5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBib2R5R2xvdy56SW5kZXggPSAyNjA7XHJcbiAgICAgICAgYm9keUdsb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgYm9keUdsb3cuc2NhbGUgPSAwLjc1O1xyXG4gICAgICAgIGxldCBib2R5R2xvd0dyYXBoaWNzID0gYm9keUdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBib2R5R2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDcwKTtcclxuICAgICAgICBib2R5R2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAyOCk7XHJcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgYm9keUdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjA0LCAxNTApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA0LCAxLjA4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMzgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5U2hvb3RTaGFrZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uRGF0YSAmJiBtdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1bGxldFR5cGUgPT0gT0lMX1NIRUxMX0JVTExFVF9UWVBFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5jb2xvcigxMzAsIDkyLCA1MiwgMjIwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1bGxldFR5cGUgPT0gdGhpcy5fY29uZmlnLkJUeXBlMikge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuY29sb3IoMTIwLCAyMjUsIDI1NSwgMjMwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDI1NSwgMjA1LCA5NSwgMjMwKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlQ2hhcmdlQ2Fubm9uKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvb2xkb3duUHJvZ3Jlc3MgPSAxIC0gdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIC8gdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd247XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwge3Byb2dyZXNzOiBjb29sZG93blByb2dyZXNzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IDA7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwge30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSArPSBkdDtcclxuICAgICAgICBsZXQgbmVlZFRpbWUgPSB0aGlzLl9nZXRDaGFyZ2VDb25maWcoXCJUaW1lXCIsIDUpO1xyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgLyBuZWVkVGltZTtcclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPiAxKSB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLXByb2dyZXNzXCIsIHtwcm9ncmVzczogcHJvZ3Jlc3N9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID09IGZhbHNlICYmIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPj0gbmVlZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93Q2hhcmdlRWZmZWN0KCk7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9maXJlQ2hhcmdlQ2Fubm9uKCkge1xyXG4gICAgICAgIGxldCBhdHRhY2tSYWRpdXMgPSB0aGlzLl9nZXRDaGFyZ2VDb25maWcoXCJBdHRhY2tSYWRpdXNcIiwgdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAqIDEuNCk7XHJcbiAgICAgICAgbGV0IGF0a1JhdGlvID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQXRrUmF0aW9cIiwgMyk7XHJcbiAgICAgICAgbGV0IHNwZWVkID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiU3BlZWRcIiwgMTIpO1xyXG4gICAgICAgIGxldCB3aXBlTGVuID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlRGlzdGFuY2UoMTIpO1xyXG4gICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeChDSEFSR0VfQ0FOTk9OX0JVTExFVF9UWVBFLCB0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX2JhcnJlbERpciwgd2lwZUxlbiwgYXR0YWNrUmFkaXVzLCB0aGlzLl9hdGsgKiBhdGtSYXRpbywgdGhpcy5fY2FtcCwgdGhpcy5ub2RlLnBhcmVudCwgdGhpcy5fbWFwLCBzcGVlZCk7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJjaGFyZ2VTaG9vdFwiKTtcclxuICAgICAgICB0aGlzLl9zaGFrZVNjcmVlbigpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQ29vbGRvd25cIiwgOCk7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd247XHJcbiAgICB9XHJcblxyXG4gICAgX2dhaW5PaWxTaGVsbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzZXRDaGFyZ2VDYW5ub24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IE1hdGgubWluKE9JTF9TSEVMTF9NQVhfQ09VTlQsIHRoaXMuX29pbFNoZWxsQ291bnQgKyAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd09pbFBpY2t1cEZlZWRiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dhaW5CbGFja0hvbGVTaGVsbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzZXRDaGFyZ2VDYW5ub24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA9IE1hdGgubWluKEJMQUNLX0hPTEVfU0hFTExfTUFYX0NPVU5ULCB0aGlzLl9ibGFja0hvbGVTaGVsbENvdW50ICsgMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dCbGFja0hvbGVQaWNrdXBGZWVkYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9maXJlT2lsU2hlbGwoKSB7XHJcbiAgICAgICAgbGV0IHdpcGVMZW4gPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZSg4KTtcclxuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgoT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX2JhcnJlbERpciwgd2lwZUxlbiwgdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cyAqIDEuOCwgMCwgdGhpcy5fY2FtcCwgdGhpcy5ub2RlLnBhcmVudCwgdGhpcy5fbWFwLCAxMCk7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMuX29pbFNoZWxsQ291bnQgLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhPSUxfU0hFTExfQlVMTEVUX1RZUEUsIHtlZmZlY3RDb2xvcjogY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCl9KTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJzaG9vdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRPaWxTaGVsbFByZXZpZXcoKSB7XHJcbiAgICAgICAgaWYgKCh0aGlzLl9vaWxTaGVsbENvdW50IDw9IDAgJiYgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA8PSAwKSB8fCAhdGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGhyb3dTa2lsbFR5cGUgPSB0aGlzLl9vaWxTaGVsbENvdW50ID4gMCA/IFwib2lsXCIgOiBcImJsYWNrSG9sZVwiO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld2luZyA9IHRydWU7XHJcbiAgICAgICAgbGV0IGRlZmF1bHREaXIgPSB0aGlzLl9iYXJyZWxEaXIgJiYgdGhpcy5fYmFycmVsRGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHRoaXMuX2JhcnJlbERpcikubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbURpciA9IGRlZmF1bHREaXI7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1SYXRpbyA9IDE7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jYW5jZWxPaWxTaGVsbFByZXZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxQcmV2aWV3aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxQcmV2aWV3VGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHJvd1NraWxsVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuaGlkZU9pbFNoZWxsUHJldmlldykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuaGlkZU9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY29tbWl0T2lsU2hlbGxUaHJvdygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX29pbFNoZWxsUHJldmlld2luZykge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5fb2lsU2hlbGxQcmV2aWV3VGFyZ2V0IHx8IHRoaXMuX2dldE9pbFNoZWxsVGhyb3dUYXJnZXQoKTtcclxuICAgICAgICBsZXQgYWN0aXZlVGhyb3dTa2lsbFR5cGUgPSB0aGlzLl9hY3RpdmVUaHJvd1NraWxsVHlwZSB8fCAodGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA+IDAgJiYgdGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwID8gXCJibGFja0hvbGVcIiA6IFwib2lsXCIpO1xyXG4gICAgICAgIGxldCBhaW1EaXIgPSBjYy52Mih0aGlzLl9vaWxTaGVsbEFpbURpciB8fCB0aGlzLl9iYXJyZWxEaXIgfHwgY2MudjIoMSwgMCkpO1xyXG4gICAgICAgIGlmIChhaW1EaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGFpbURpciA9IGFpbURpci5ub3JtYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYWltRGlyID0gY2MudjIoMSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhaW1SYXRpbyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPT0gbnVsbCA/IDEgOiB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvKSk7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmICF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICBsZXQgdGhyb3dFdmVudE5hbWUgPSBhY3RpdmVUaHJvd1NraWxsVHlwZSA9PSBcImJsYWNrSG9sZVwiID8gXCJtdWx0aXBsYXllci10aHJvdy1ibGFjay1ob2xlXCIgOiBcIm11bHRpcGxheWVyLXRocm93LXRhclwiO1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCh0aHJvd0V2ZW50TmFtZSwge1xyXG4gICAgICAgICAgICAgICAgZGlyWDogTnVtYmVyKGFpbURpci54LnRvRml4ZWQoNCkpLFxyXG4gICAgICAgICAgICAgICAgZGlyWTogTnVtYmVyKGFpbURpci55LnRvRml4ZWQoNCkpLFxyXG4gICAgICAgICAgICAgICAgcmF0aW86IE51bWJlcihhaW1SYXRpby50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGl2ZVRocm93U2tpbGxUeXBlID09IFwiYmxhY2tIb2xlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGhyb3dCbGFja0hvbGVTaGVsbEF0KHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rocm93T2lsU2hlbGxBdCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZ2V0T2lsU2hlbGxUaHJvd1RhcmdldCgpIHtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fY29uZmlnICYmIHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgIT0gbnVsbCA/IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgOiA0MjA7XHJcbiAgICAgICAgbGV0IGRpciA9IHRoaXMuX29pbFNoZWxsQWltRGlyICYmIHRoaXMuX29pbFNoZWxsQWltRGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHRoaXMuX29pbFNoZWxsQWltRGlyKS5ub3JtYWxpemUoKSA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIGxldCByYXRpbyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPT0gbnVsbCA/IDEgOiB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvKSk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikuYWRkKGRpci5tdWwoYXR0YWNrUmFkaXVzICogcmF0aW8pKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwICYmIHRoaXMuX21hcC5jbGFtcE1hcElubmVyUG9zaXRpb25cclxuICAgICAgICAgICAgPyB0aGlzLl9tYXAuY2xhbXBNYXBJbm5lclBvc2l0aW9uKHRhcmdldCwgT0lMX1RIUk9XX0FSRUFfUkFESVVTICogMC41NSlcclxuICAgICAgICAgICAgOiB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZU9pbFNoZWxsQWltKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIgJiYgZXZlbnQuZGlyLm1hZ1NxcigpID4gMC4wMDAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQWltRGlyID0gY2MudjIoZXZlbnQuZGlyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIE51bWJlci5pc0Zpbml0ZShldmVudC5yYXRpbykpIHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1SYXRpbyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIE51bWJlcihldmVudC5yYXRpbykpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoT2lsU2hlbGxQcmV2aWV3KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fb2lsU2hlbGxQcmV2aWV3aW5nIHx8ICF0aGlzLl9tYXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQgPSB0aGlzLl9nZXRPaWxTaGVsbFRocm93VGFyZ2V0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcC5zaG93T2lsU2hlbGxQcmV2aWV3ICYmIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuc2hvd09pbFNoZWxsUHJldmlldyh0aGlzLm5vZGUucG9zaXRpb24sIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCwge1xyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiBPSUxfVEhST1dfUFJFVklFV19BUkNfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgYXJlYVJhZGl1czogT0lMX1RIUk9XX0FSRUFfUkFESVVTLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Rocm93QmxhY2tIb2xlU2hlbGxBdCh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIXRhcmdldCB8fCB0aGlzLl9ibGFja0hvbGVTaGVsbENvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ibGFja0hvbGVTaGVsbENvdW50ID0gTWF0aC5tYXgoMCwgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCAtIDEpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5T2lsU2hlbGxUaHJvdykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheU9pbFNoZWxsVGhyb3codGhpcy5ub2RlLnBvc2l0aW9uLCB0YXJnZXQsIHtcclxuICAgICAgICAgICAgICAgIGFyZWFSYWRpdXM6IE9JTF9USFJPV19BUkVBX1JBRElVUyxcclxuICAgICAgICAgICAgICAgIGFyY0hlaWdodDogT0lMX1RIUk9XX1BSRVZJRVdfQVJDX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgIG9uTGFuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduQmxhY2tIb2xlWm9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXAuc3Bhd25CbGFja0hvbGVab25lKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhPSUxfU0hFTExfQlVMTEVUX1RZUEUsIHtlZmZlY3RDb2xvcjogY2MuY29sb3IoMTMwLCA5MiwgMTgwLCAyMjApfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3Rocm93T2lsU2hlbGxBdCh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIXRhcmdldCB8fCB0aGlzLl9vaWxTaGVsbENvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vaWxTaGVsbENvdW50ID0gTWF0aC5tYXgoMCwgdGhpcy5fb2lsU2hlbGxDb3VudCAtIDEpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5T2lsU2hlbGxUaHJvdykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheU9pbFNoZWxsVGhyb3codGhpcy5ub2RlLnBvc2l0aW9uLCB0YXJnZXQsIHtcclxuICAgICAgICAgICAgICAgIGFyZWFSYWRpdXM6IE9JTF9USFJPV19BUkVBX1JBRElVUyxcclxuICAgICAgICAgICAgICAgIGFyY0hlaWdodDogT0lMX1RIUk9XX1BSRVZJRVdfQVJDX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgIG9uTGFuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduT2lsU3BpbGwodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlT2lsU2hlbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGxheVNob290R2xvdyhPSUxfU0hFTExfQlVMTEVUX1RZUEUsIHtlZmZlY3RDb2xvcjogY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCl9KTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJzaG9vdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmIHRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1vZGUgPSBcImNoYXJnZVwiO1xyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBtb2RlID0gXCJvaWxcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgbW9kZSA9IFwiYmxhY2tIb2xlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIiwge21vZGU6IG1vZGV9KTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q2hhcmdlQ29uZmlnKGtleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGZ1bGxLZXkgPSBcIkNoYXJnZVwiICsga2V5O1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZ1tmdWxsS2V5XSA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVzZXRDaGFyZ2VDYW5ub24oKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2hpZGVDaGFyZ2VFZmZlY3QoKTtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIsIHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dDaGFyZ2VFZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGxldCBlZmZlY3QgPSBuZXcgY2MuTm9kZShcIl9jaGFyZ2VNdXp6bGVFZmZlY3RcIik7XHJcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IGJhcnJlbE5vZGU7XHJcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oNCkpKTtcclxuICAgICAgICBlZmZlY3QuekluZGV4ID0gMTAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBlZmZlY3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDQwLCAyMCwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjUsIDEuMzUpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjUsIDAuOSlcclxuICAgICAgICApKSk7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSA9IGVmZmVjdDtcclxuICAgIH1cclxuXHJcbiAgICBfaGlkZUNoYXJnZUVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaGFrZVNjcmVlbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcCB8fCAhdGhpcy5fbWFwLm5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1hcE5vZGUgPSB0aGlzLl9tYXAubm9kZTtcclxuICAgICAgICBsZXQgb3JpZ2luID0gbWFwTm9kZS5wb3NpdGlvbjtcclxuICAgICAgICBtYXBOb2RlLnN0b3BBY3Rpb25CeVRhZyg5MDAxKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIC04LCAwKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDQsIDMpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgMCwgLTMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbWFwTm9kZS5zZXRQb3NpdGlvbihvcmlnaW4pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYWN0aW9uLnNldFRhZyg5MDAxKTtcclxuICAgICAgICBtYXBOb2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbihleHRyYU9mZnNldCA9IDApIHtcclxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcclxuICAgICAgICBsZXQgYW5jaG9yWSA9IGJhcnJlbE5vZGUuYW5jaG9yWSA9PSBudWxsID8gMC41IDogYmFycmVsTm9kZS5hbmNob3JZO1xyXG4gICAgICAgIHJldHVybiBjYy52MigwLCBiYXJyZWxOb2RlLmhlaWdodCAqICgxIC0gYW5jaG9yWSkgKyBleHRyYU9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKGV4dHJhT2Zmc2V0ID0gMCkge1xyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGxldCBsb2NhbFBvcyA9IHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oZXh0cmFPZmZzZXQpO1xyXG4gICAgICAgIGxldCB3b3JsZFBvcyA9IGJhcnJlbE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGxvY2FsUG9zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEJhcnJlbE11enpsZURpc3RhbmNlKGV4dHJhT2Zmc2V0ID0gMCkge1xyXG4gICAgICAgIGxldCBtdXp6bGVQb3MgPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVQb3NpdGlvbihleHRyYU9mZnNldCk7XHJcbiAgICAgICAgcmV0dXJuIG11enpsZVBvcy5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdHJ5RmlyZU9uY2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldENvZGVUaW1lIDwgUExBWUVSX1NIT09UX0lOVEVSVkFMKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPD0gMCAmJiB0aGlzLl9jYW5Ob3RBZmZvcmRQYWlkQnVsbGV0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0xvd0hwU2hvb3RUaXAoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmZpcmVPbmNlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRDb3VudC0tO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jb25zdW1lSHBGb3JQYWlkQnVsbGV0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwIDw9IFBMQVlFUl9QQUlEX1NIT1RfSFBfQ09TVDtcclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0xvd0hwU2hvb3RUaXAoKSB7XHJcbiAgICAgICAgbGV0IGNoYW5uZWwgPSBTREtNYW5hZ2VyLmdldENoYW5uZWwoKTtcclxuICAgICAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnNob3dUb2FzdCkge1xyXG4gICAgICAgICAgICBjaGFubmVsLnNob3dUb2FzdChcIuihgOmHj+i/h+S9jizml6Dms5Xlj5HlsITlrZDlvLlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuihgOmHj+i/h+S9jizml6Dms5Xlj5HlsITlrZDlvLlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jb25zdW1lSHBGb3JQYWlkQnVsbGV0KCkge1xyXG4gICAgICAgIHRoaXMuX2hwIC09IFBMQVlFUl9QQUlEX1NIT1RfSFBfQ09TVDtcclxuICAgICAgICBpZiAodGhpcy5faHAgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625Y+X5Ye75LiN6aOY5Lyk5a6z5pWw5a2XLCDnlKjljLrliKvkuo7mlYzkurrnmoTok53oibLpl6rlhYnooajnjrBcclxuICAgIGJlSGl0KGRhbWFnZSl7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlIC0gdGhpcy5fZGVmO1xyXG4gICAgICAgIGlmIChkYW1hZ2UgPCAwKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9ocCAtPSBkYW1hZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKTtcclxuICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ocCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBseU11bHRpcGxheWVySGl0KGRhbWFnZSwgaHApIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJlSGl0KGRhbWFnZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0SHAgPSBocDtcclxuICAgICAgICBpZiAobmV4dEhwID09IG51bGwgfHwgbmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICBuZXh0SHAgPSB0aGlzLl9ocCAtIE1hdGgubWF4KDAsIGRhbWFnZSB8fCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5leHRIcCA8IDApIHtcclxuICAgICAgICAgICAgbmV4dEhwID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkaWRUYWtlRGFtYWdlID0gbmV4dEhwIDwgdGhpcy5faHA7XHJcbiAgICAgICAgdGhpcy5faHAgPSBuZXh0SHA7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuXHJcbiAgICAgICAgaWYgKGRpZFRha2VEYW1hZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckhpdEVmZmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNNdWx0aXBsYXllckhwKGhwLCBtYXhIcCA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF4SHAgIT0gbnVsbCAmJiBtYXhIcCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SHAgPSBtYXhIcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChocCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0SHAgPSBocDtcclxuICAgICAgICBpZiAobmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICBuZXh0SHAgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbWF4SHAgPiAwICYmIG5leHRIcCA+IHRoaXMuX21heEhwKSB7XHJcbiAgICAgICAgICAgIG5leHRIcCA9IHRoaXMuX21heEhwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpZFRha2VEYW1hZ2UgPSBuZXh0SHAgPCB0aGlzLl9ocDtcclxuICAgICAgICB0aGlzLl9ocCA9IG5leHRIcDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG5cclxuICAgICAgICBpZiAoZGlkVGFrZURhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93UGxheWVySGl0RWZmZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY011bHRpcGxheWVyU3RhdGUoc3RhdGU6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFzdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcHJldkhwID0gdGhpcy5faHA7XHJcbiAgICAgICAgbGV0IHByZXZNYXhIcCA9IHRoaXMuX21heEhwO1xyXG4gICAgICAgIGxldCBwcmV2QXRrID0gdGhpcy5fYXRrO1xyXG4gICAgICAgIGxldCBwcmV2TW92ZVNwZWVkU2NhbGUgPSB0aGlzLl9tb3ZlU3BlZWRTY2FsZTtcclxuICAgICAgICBsZXQgcHJldkVuZXJneUxldmVsID0gdGhpcy5fZW5lcmd5TGV2ZWw7XHJcbiAgICAgICAgaWYgKHN0YXRlLm1heEhwICE9IG51bGwgJiYgc3RhdGUubWF4SHAgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21heEhwID0gc3RhdGUubWF4SHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5ocCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0SHAgPSBzdGF0ZS5ocDtcclxuICAgICAgICAgICAgaWYgKG5leHRIcCA8IDApIHtcclxuICAgICAgICAgICAgICAgIG5leHRIcCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21heEhwID4gMCAmJiBuZXh0SHAgPiB0aGlzLl9tYXhIcCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faHAgPSBuZXh0SHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5hdGsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hdGsgPSBzdGF0ZS5hdGs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5tb3ZlU3BlZWRTY2FsZSAhPSBudWxsICYmIHN0YXRlLm1vdmVTcGVlZFNjYWxlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlU3BlZWRTY2FsZSA9IHN0YXRlLm1vdmVTcGVlZFNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUudGFyQW1tb0NvdW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRUYXJBbW1vQ291bnQgPSBNYXRoLm1heCgwLCBzdGF0ZS50YXJBbW1vQ291bnQpO1xyXG4gICAgICAgICAgICBpZiAobmV4dFRhckFtbW9Db3VudCAhPSB0aGlzLl9vaWxTaGVsbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vaWxTaGVsbENvdW50ID0gbmV4dFRhckFtbW9Db3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuYmxhY2tIb2xlQW1tb0NvdW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRCbGFja0hvbGVBbW1vQ291bnQgPSBNYXRoLm1heCgwLCBzdGF0ZS5ibGFja0hvbGVBbW1vQ291bnQpO1xyXG4gICAgICAgICAgICBpZiAobmV4dEJsYWNrSG9sZUFtbW9Db3VudCAhPSB0aGlzLl9ibGFja0hvbGVTaGVsbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ibGFja0hvbGVTaGVsbENvdW50ID0gbmV4dEJsYWNrSG9sZUFtbW9Db3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuZW5lcmd5TGV2ZWwgIT0gbnVsbCAmJiBzdGF0ZS5lbmVyZ3lMZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwgPSBzdGF0ZS5lbmVyZ3lMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmVuZXJneUV4cCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUV4cCA9IE1hdGgubWF4KDAsIHN0YXRlLmVuZXJneUV4cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5lbmVyZ3lOZWVkRXhwICE9IG51bGwgJiYgc3RhdGUuZW5lcmd5TmVlZEV4cCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TmVlZEV4cCA9IHN0YXRlLmVuZXJneU5lZWRFeHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5TGV2ZWwgPiBwcmV2RW5lcmd5TGV2ZWwpIHtcclxuICAgICAgICAgICAgbGV0IGNob2ljZSA9IHRoaXMuX2J1aWxkVXBncmFkZUNob2ljZUZyb21TdGF0ZURlbHRhKHByZXZNYXhIcCwgcHJldkF0aywgcHJldk1vdmVTcGVlZFNjYWxlKTtcclxuICAgICAgICAgICAgaWYgKGNob2ljZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1VwZ3JhZGVGbG9hdChjaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheVVwZ3JhZGVTZWxlY3RGZWVkYmFjayhjaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VXBncmFkZVRvYXN0KGNob2ljZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkaWRUYWtlRGFtYWdlID0gdGhpcy5faHAgPCBwcmV2SHA7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuXHJcbiAgICAgICAgaWYgKGRpZFRha2VEYW1hZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckhpdEVmZmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZFVwZ3JhZGVDaG9pY2VGcm9tU3RhdGVEZWx0YShwcmV2TWF4SHAsIHByZXZBdGssIHByZXZNb3ZlU3BlZWRTY2FsZSkge1xyXG4gICAgICAgIGxldCBocERlbHRhID0gdGhpcy5fbWF4SHAgLSBwcmV2TWF4SHA7XHJcbiAgICAgICAgbGV0IGF0a0RlbHRhID0gdGhpcy5fYXRrIC0gcHJldkF0aztcclxuICAgICAgICBsZXQgc3BlZWRSYXRpb0RlbHRhID0gdGhpcy5fbW92ZVNwZWVkU2NhbGUgLSBwcmV2TW92ZVNwZWVkU2NhbGU7XHJcbiAgICAgICAgbGV0IHNwZWVkRGVsdGEgPSBNYXRoLnJvdW5kKHNwZWVkUmF0aW9EZWx0YSAqIDEwMCk7XHJcblxyXG4gICAgICAgIGlmIChocERlbHRhID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiaHBcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuijheeUsuW8uuWMllwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnlJ/lkb3kuIrpmZDmj5DljYflubbnq4vliLvlm57mu6FcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiSFBcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBocERlbHRhLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBocERlbHRhLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDEyMCwgMjU1LCAxNzAsIDI1NSksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdGtEZWx0YSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImF0a1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi54Gr5Yqb5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuaUu+WHu+WKm+aPkOWNhywg6L6T5Ye65pu06auYXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIkFUS1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIGF0a0RlbHRhLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBhdGtEZWx0YSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigyNTUsIDE4NSwgOTAsIDI1NSksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcGVlZERlbHRhID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwic3BlZWRcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaOqOi/m+W8uuWMllwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnp7vliqjpgJ/luqbmj5DljYcsIOi1sOS9jeabtOeBtea0u1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJTUERcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBzcGVlZERlbHRhICsgXCIlXCIsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IHNwZWVkRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMTEwLCAyMTAsIDI1NSwgMjU1KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKSB7XHJcbiAgICAgICAgbGV0IGVmZmVjdCA9IG5ldyBjYy5Ob2RlKFwiX3BsYXllckhpdEVmZmVjdFwiKTtcclxuICAgICAgICBlZmZlY3QucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBlZmZlY3QuekluZGV4ID0gMzAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBlZmZlY3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA4O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoODAsIDIxMCwgMjU1LCAyMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxNik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNzAsIDE3MCwgMjU1LCA1NSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDEwKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGVmZmVjdC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGVmZmVjdC5zY2FsZSA9IDAuNjU7XHJcbiAgICAgICAgZWZmZWN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuMjUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMTgsIDYwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMSksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVMb3dIcFBsYXllckZlZWRiYWNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5HYW1lIHx8ICF0aGlzLmlzTG93SHAoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdGFydExvd0hwU2NyZWVuRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRMb3dIcEhlYXJ0YmVhdFNvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0TG93SHBIZWFydGJlYXRTb3VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSBNdXNpY01hbmFnZXIucGxheUxvb3BFZmZlY3QoXCJoZWFydGJlYXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0b3BMb3dIcEhlYXJ0YmVhdFNvdW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID49IDApIHtcclxuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnN0b3BFZmZlY3QodGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0TG93SHBTY3JlZW5FZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ICYmIGNjLmlzVmFsaWQodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlZmZlY3RSb290ID0gbmV3IGNjLk5vZGUoXCJfbG93SHBTY3JlZW5FZmZlY3RcIik7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLm5vZGUgJiYgdGhpcy5fbWFwLm5vZGUucGFyZW50ID8gdGhpcy5fbWFwLm5vZGUucGFyZW50IDogdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBlZmZlY3RSb290LnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgZWZmZWN0Um9vdC5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBlZmZlY3RSb290LnpJbmRleCA9IDE2MDA7XHJcbiAgICAgICAgdGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgPSBlZmZlY3RSb290O1xyXG5cclxuICAgICAgICBsZXQgYm9yZGVyTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xvd0hwQm9yZGVyXCIpO1xyXG4gICAgICAgIGJvcmRlck5vZGUucGFyZW50ID0gZWZmZWN0Um9vdDtcclxuICAgICAgICBib3JkZXJOb2RlLm9wYWNpdHkgPSAwO1xyXG5cclxuICAgICAgICBsZXQgY3JlYXRlRWRnZSA9IGZ1bmN0aW9uKG5hbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgbGV0IGVkZ2UgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICAgICAgZWRnZS5wYXJlbnQgPSBib3JkZXJOb2RlO1xyXG4gICAgICAgICAgICBlZGdlLnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSBlZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgNjAsIDYwLCAyNTUpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5yZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZWRnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjcmVhdGVFZGdlKFwiX3RvcEVkZ2VcIiwgMCwgMzUxLCAxMjgwLCAxOCk7XHJcbiAgICAgICAgY3JlYXRlRWRnZShcIl9ib3R0b21FZGdlXCIsIDAsIC0zNTEsIDEyODAsIDE4KTtcclxuICAgICAgICBjcmVhdGVFZGdlKFwiX2xlZnRFZGdlXCIsIC02MzEsIDAsIDE4LCA3MjApO1xyXG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfcmlnaHRFZGdlXCIsIDYzMSwgMCwgMTgsIDcyMCk7XHJcblxyXG4gICAgICAgIGxldCBpZGxlVGltZSA9IE1hdGgubWF4KDAsIExPV19IUF9TQ1JFRU5fRkxBU0hfTE9PUCAtIExPV19IUF9TQ1JFRU5fRkxBU0hfSU4gLSBMT1dfSFBfU0NSRUVOX0ZMQVNIX09VVCk7XHJcbiAgICAgICAgYm9yZGVyTm9kZS5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oTE9XX0hQX1NDUkVFTl9GTEFTSF9JTiwgMjEwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlVG8oTE9XX0hQX1NDUkVFTl9GTEFTSF9PVVQsIDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShpZGxlVGltZSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgX2Rlc3Ryb3lMb3dIcFNjcmVlbkVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG93SHBTY3JlZW5FZmZlY3QuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3BMb3dIcEhlYXJ0YmVhdFNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUxvd0hwU2NyZWVuRWZmZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUZyZWVCdWxsZXRSZWNvdmVyKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5fc3RvcEZpcmVUaW1lIDwgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lICs9IGR0O1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUxcclxuICAgICAgICAgICAgJiYgdGhpcy5fZnJlZUJ1bGxldENvdW50IDwgUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgLT0gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUw7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRDb3VudCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoRnJlZUJ1bGxldEJhcigpIHtcclxuICAgICAgICBsZXQgYnVsbGV0QmFycyA9IFtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5femlkYW5iYXIxLFxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl96aWRhbmJhcjIsXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMyxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGxldCByZWNvdmVyUHJvZ3Jlc3MgPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50IDwgUExBWUVSX0ZSRUVfQlVMTEVUX01BWFxyXG4gICAgICAgICAgICAmJiB0aGlzLl9zdG9wRmlyZVRpbWUgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkpIHtcclxuICAgICAgICAgICAgcmVjb3ZlclByb2dyZXNzID0gdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lIC8gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfSU5URVJWQUw7XHJcbiAgICAgICAgICAgIGlmIChyZWNvdmVyUHJvZ3Jlc3MgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICByZWNvdmVyUHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidWxsZXRCYXJzLmZvckVhY2goKGJhck5vZGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYmFyTm9kZSB8fCAhYmFyTm9kZS4kUHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5fZnJlZUJ1bGxldENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT0gdGhpcy5fZnJlZUJ1bGxldENvdW50ICYmIHJlY292ZXJQcm9ncmVzcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gcmVjb3ZlclByb2dyZXNzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhOWHu1xyXG4gICAgc2hvb3RpbmcoZHQpe1xyXG4gICAgICAgIGxldCBqdWRnZUNEID0gdGhpcy5fc2tpbGwyVGltZSA+IDAgPyB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWUvNCA6IHRoaXMuX2NvbmZpZy5CdWxsZXRDb2RlVGltZTtcclxuXHJcbiAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldENvZGVUaW1lID49IGp1ZGdlQ0QpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maXJlT25jZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/miafooYzmrbvkuqFcclxuICAgIGRvRGVhdGgoKXtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5mb3JjZURldGFjaENvdmVyVGVzdEZyb21QbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmZvcmNlRGV0YWNoQ292ZXJUZXN0RnJvbVBsYXllcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NhbmNlbE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICBzdXBlci5kb0RlYXRoKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm11bHRpcGxheWVyLXBsYXllci1kZWF0aFwiLCB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJJZDogdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgIGlzTG9jYWw6ICF0aGlzLl9tdWx0aXBsYXllclJlbW90ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJwbGF5ZXItZGVhdGhcIix7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7IFxyXG4gICAgICAgIC8vIOeIhueCuOaViOaenFxyXG4gICAgICAgIC8vIOaYvuekuue7k+adn+eVjOmdolxyXG4gICAgfVxyXG5cclxuICAgIGRlYnVnU2V0TG93SHAoKSB7XHJcbiAgICAgICAgbGV0IGhwID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcih0aGlzLl9tYXhIcCAqIDAuMTIpKTtcclxuICAgICAgICBpZiAoaHAgPj0gdGhpcy5fbWF4SHApIHtcclxuICAgICAgICAgICAgaHAgPSBNYXRoLm1heCgxLCB0aGlzLl9tYXhIcCAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ocCA9IGhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5HYW1lKCl7XHJcbiAgICAgICAgdGhpcy5faW5HYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9saWZlYmFyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iOt+WPlueisOaSnuahhlxyXG4gICAgZ2V0UGxheWVyQm91bmRpbmdCb3goKXtcclxuICAgICAgICByZXR1cm4gVXRpbHMuZ2V0V29ybGRCb3VuZGluZ0JveCh0aGlzLl9jdXJyZW50QmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZpZXdNb2RlKCl7XHJcbiAgICAgICAgdGhpcy5fdmlld01vZGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=