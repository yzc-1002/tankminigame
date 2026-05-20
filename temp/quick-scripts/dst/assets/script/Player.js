
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
        _this._multiplayerInBush = false;
        _this._multiplayerBushId = null;
        _this._bushVisibilityMode = "normal";
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
        this._multiplayerInBush = false;
        this._multiplayerBushId = null;
        this._bushVisibilityMode = "normal";
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
        if (this._multiplayerMode && this._multiplayerRemote) {
            return;
        }
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
        if (this._multiplayerMode && this._multiplayerRemote) {
            return;
        }
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
        if (this._multiplayerMode && this._multiplayerRemote) {
            return;
        }
        if (this._inGame == false || !this._map) {
            return;
        }
        if (this._map.isMultiplayerMode && this._map.isMultiplayerMode()) {
            yyp.eventCenter.emit("multiplayer-cover-action", {
                playerId: this._multiplayerPlayerId,
            });
            return;
        }
        if (!this._map.tryToggleCoverTestAttachment) {
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
    Player.prototype.setBushVisibilityMode = function (mode) {
        if (mode === void 0) { mode = "normal"; }
        var nextMode = mode == "hidden" ? "hidden" : (mode == "selfBush" ? "selfBush" : "normal");
        if (this._bushVisibilityMode === nextMode) {
            return;
        }
        this._bushVisibilityMode = nextMode;
        this._refreshBushVisibilityState();
    };
    Player.prototype._refreshBushVisibilityState = function () {
        var mode = this._bushVisibilityMode || "normal";
        var bodyOpacity = mode == "hidden" ? 0 : (mode == "selfBush" ? 120 : 255);
        var barrelOpacity = mode == "hidden" ? 0 : (mode == "selfBush" ? 120 : 255);
        var hudVisible = mode != "hidden";
        this.node.opacity = bodyOpacity;
        if (this._fire && this._fire._lyBarrel && cc.isValid(this._fire._lyBarrel)) {
            this._fire._lyBarrel.opacity = barrelOpacity;
        }
        if (this._fire && this._fire._lifebar && cc.isValid(this._fire._lifebar)) {
            this._fire._lifebar.active = hudVisible && this._inGame;
            this._fire._lifebar.opacity = mode == "selfBush" ? 168 : 255;
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
                if (!this._multiplayerMode || !this._multiplayerRemote) {
                    this._map.refreshCoverTestButton(this);
                }
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
    Player.prototype.canAffordMultiplayerFire = function () {
        if (!this._multiplayerMode || this._multiplayerRemote) {
            return true;
        }
        if (this._bulletCodeTime < PLAYER_SHOOT_INTERVAL) {
            return false;
        }
        if (this._freeBulletCount > 0) {
            return true;
        }
        return !this._canNotAffordPaidBullet();
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
    Player.prototype.applyMultiplayerFireState = function (command) {
        if (!this._multiplayerMode || !command) {
            return;
        }
        if (command.maxHp != null && command.maxHp > 0) {
            this._maxHp = command.maxHp;
        }
        if (command.hp != null) {
            var nextHp = Math.max(0, command.hp);
            if (this._maxHp > 0 && nextHp > this._maxHp) {
                nextHp = this._maxHp;
            }
            this._hp = nextHp;
        }
        if (command.freeBulletCount != null) {
            this._freeBulletCount = Math.max(0, Math.min(PLAYER_FREE_BULLET_MAX, command.freeBulletCount));
        }
        if (command.stopFireTime != null) {
            this._stopFireTime = Math.max(0, command.stopFireTime);
        }
        if (command.freeBulletRecoverTime != null) {
            this._freeBulletRecoverTime = Math.max(0, command.freeBulletRecoverTime);
        }
        if (command.shotCooldownRemaining != null) {
            var nextCooldown = Math.max(0, command.shotCooldownRemaining);
            this._bulletCodeTime = Math.max(0, PLAYER_SHOOT_INTERVAL - nextCooldown);
        }
        this.refreshHp();
        this._refreshFreeBulletBar();
        if (this._hp == 0) {
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
        if (state.freeBulletCount != null) {
            this._freeBulletCount = Math.max(0, Math.min(PLAYER_FREE_BULLET_MAX, state.freeBulletCount));
        }
        if (state.stopFireTime != null) {
            this._stopFireTime = Math.max(0, state.stopFireTime);
        }
        if (state.freeBulletRecoverTime != null) {
            this._freeBulletRecoverTime = Math.max(0, state.freeBulletRecoverTime);
        }
        if (state.shotCooldownRemaining != null) {
            var nextCooldown = Math.max(0, state.shotCooldownRemaining);
            this._bulletCodeTime = Math.max(0, PLAYER_SHOOT_INTERVAL - nextCooldown);
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
        this._multiplayerInBush = !!state.inBush;
        this._multiplayerBushId = state.bushId == null ? null : state.bushId;
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
        this._refreshFreeBulletBar();
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
        this._refreshBushVisibilityState();
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
        this._refreshBushVisibilityState();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUM5QixJQUFNLDBCQUEwQixHQUFHLENBQUMsQ0FBQztBQUNyQyxJQUFNLDRCQUE0QixHQUFHLEdBQUcsQ0FBQztBQUN6QyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxJQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUNwQyxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNqQyxJQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUNuQyxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUN0QyxJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUNqQyxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUNsQyxJQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztBQUcvQjtJQUE0QiwwQkFBSTtJQUFoQztRQUFBLHFFQTIwRUM7UUF6MEVHLE1BQU07UUFDTixZQUFNLEdBQVksQ0FBQyxDQUFDLENBQVEsTUFBTTtRQUVsQyxxQkFBZSxHQUFHLENBQUMsQ0FBQyxDQUFRLFFBQVE7UUFFcEMsbUJBQWEsR0FBSyxLQUFLLENBQUMsQ0FBSSxRQUFRO1FBRXBDLGlCQUFXLEdBQU8sQ0FBQyxDQUFDLENBQVEsZUFBZTtRQUMzQyxpQkFBVyxHQUFPLENBQUMsQ0FBQyxDQUFRLGVBQWU7UUFFM0MsYUFBTyxHQUFXLEtBQUssQ0FBQyxDQUFJLFNBQVM7UUFDckMsZUFBUyxHQUFTLEtBQUssQ0FBQyxDQUFJLE1BQU07UUFDbEMsc0JBQWdCLEdBQUcsc0JBQXNCLENBQUMsQ0FBRSxVQUFVO1FBQ3RELG1CQUFhLEdBQUcsQ0FBQyxDQUFDLENBQVUsTUFBTTtRQUNsQyw0QkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO1FBQ3RDLG1CQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO1FBQ3ZDLHFCQUFlLEdBQUcsQ0FBQyxDQUFDLENBQVEsVUFBVTtRQUN0QyxxQkFBZSxHQUFHLENBQUMsQ0FBQyxDQUFRLFFBQVE7UUFDcEMsa0JBQVksR0FBRyxDQUFDLENBQUMsQ0FBVyxRQUFRO1FBQ3BDLGdCQUFVLEdBQUcsQ0FBQyxDQUFDLENBQWEsTUFBTTtRQUNsQyxvQkFBYyxHQUFHLGVBQWUsQ0FBQyxDQUFDLFFBQVE7UUFDMUMsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQU0sU0FBUztRQUNyQyx5QkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBSSxPQUFPO1FBQ25DLDJCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFFLFVBQVU7UUFDdEMsMkJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQix1QkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsb0JBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsMEJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHlCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1Qiw0QkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDOUIscUJBQWUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5Qix1QkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsMkJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLHlCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUN6Qix5QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IsK0JBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLG1CQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsNkJBQXVCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0Isd0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLG9CQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRyxVQUFVO1FBQzFDLDRCQUFzQixHQUFHLElBQUksQ0FBQyxDQUFHLG9CQUFvQjtRQUNyRCxpQkFBVyxHQUFHLElBQUksQ0FBQyxDQUFhLFdBQVc7UUFDM0Msc0JBQWdCLEdBQUcsS0FBSyxDQUFDLENBQU8sY0FBYztRQUM5Qyx3QkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBSyxRQUFRO1FBQ3hDLDBCQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQU0sUUFBUTtRQUN4Qyx3QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0Isd0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLHlCQUFtQixHQUFHLFFBQVEsQ0FBQzs7SUF5eEVuQyxDQUFDO0lBdnhFRyx1QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixTQUFTO1FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPO0lBQ1AsOEJBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUUsSUFBSTtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUksYUFBYTtRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLHFCQUFxQixDQUFDO1FBQzdDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQztRQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBRUQsUUFBUTtJQUNSLDhCQUFhLEdBQWIsVUFBYyxRQUFRLEVBQUMsV0FBVztRQUM5QixpQkFBTSxXQUFXLFlBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsV0FBVztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELDJDQUEwQixHQUExQjtRQUNJLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDeEIsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5QyxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU87SUFDUCx3QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFNBQVM7SUFDVCwyQkFBVSxHQUFWO1FBQ0ksR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxNQUFNO1FBQ2xFLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDMUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTztRQUNqRixHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPO1FBQ3JGLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDN0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDdEUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDOUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBSyxNQUFNO0lBQ3RFLENBQUM7SUFFRCxNQUFNO0lBQ04sOEJBQWEsR0FBYjtRQUNJLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUssTUFBTTtRQUNsRSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQzNFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDbEYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTztRQUN0RixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPO1FBQzlFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQ3ZFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQy9FLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUksTUFBTTtJQUN0RSxDQUFDO0lBRUQsTUFBTTtJQUNOLDRCQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsT0FBTztRQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFNLElBQUk7YUFDNUM7WUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBRSxJQUFJO1NBQzVDO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixpQ0FBZ0IsR0FBaEIsVUFBaUIsS0FBSztRQUNsQixJQUFJLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPO1FBQ2xDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLO1lBQUUsT0FBTztRQUNsQyxJQUFJLElBQUksQ0FBQyxtQkFBbUI7WUFBRSxPQUFPO1FBQ3JDLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsaURBQWdDLEdBQWhDLFVBQWlDLEdBQUc7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDbkQsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzNCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxhQUFhO0lBQ2IsOEJBQWEsR0FBYixVQUFjLE1BQU07UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUMzSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxFQUFFO29CQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDN0M7YUFDSjtTQUNKO1FBQ0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxNQUFNLENBQUMsRUFBRTtZQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLE1BQU0sQ0FBQyxJQUFJO1lBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxNQUFNLENBQUMsS0FBSztZQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxFQUFFO2dCQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ3pDO1NBQ0o7UUFDRCwrQ0FBK0M7UUFDL0MsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7SUFFRCx1Q0FBc0IsR0FBdEI7UUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzlFLENBQUM7SUFFRCxxQ0FBb0IsR0FBcEIsVUFBcUIsS0FBSztRQUN0QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDbEQsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNyRixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzlELDJCQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCx1Q0FBc0IsR0FBdEIsVUFBdUIsS0FBSztRQUN4QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDbEQsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksS0FBSyxFQUFFO1lBQzlELE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDZCQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxtQ0FBa0IsR0FBbEIsVUFBbUIsS0FBWTtRQUFaLHNCQUFBLEVBQUEsWUFBWTtRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFO1lBQ3ZCLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUN0RCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDVjtRQUNELElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLE9BQU87U0FDVjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCwrQkFBYyxHQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2xELE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3JDLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDOUQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUU7Z0JBQzdDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CO2FBQ3RDLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFO1lBQ3pDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE1BQU07SUFDTix5QkFBUSxHQUFSLFVBQVMsS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBSSxJQUFJO1lBQ3BDLDRCQUE0QjtZQUM1QixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7Z0JBQ2QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsYUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDNUc7aUJBQ0ksSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbkM7aUJBQ0ksSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtpQkFDSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO2FBQzFCO2lCQUNJLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO2lCQUNJLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDOUI7U0FDSjtJQUNMLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBQ0ksTUFBTTtRQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELFFBQVE7SUFDUixpQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBRTtRQUNmLGdDQUFnQztRQUNoQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDckcsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtZQUN6QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXRDLE1BQU07UUFDTixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztZQUN6QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDckYsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNuRjtpQkFDRztnQkFDQSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztnQkFDdkIsT0FBTzthQUNWO1NBQ0o7UUFFRCxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxrQ0FBaUIsR0FBakIsVUFBa0IsRUFBRTtRQUNoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCO1lBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDO1FBQ3ZGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpGLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7YUFDcEM7U0FDSjthQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7YUFDcEM7U0FDSjtJQUNMLENBQUM7SUFFRCwwQkFBUyxHQUFULFVBQVUsS0FBSztRQUNYLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNaLE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQztZQUNsQixLQUFLLElBQUksS0FBSyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx5Q0FBd0IsR0FBeEI7UUFDSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLE9BQU87U0FDVjtRQUVELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMxRSxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCw4QkFBYSxHQUFiLFVBQWMsR0FBRztRQUNiLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN2QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRCxrQ0FBaUIsR0FBakI7UUFDSSxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNyRSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDakQsQ0FBQztJQUVELGlDQUFnQixHQUFoQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDakMsT0FBTztTQUNWO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsOEJBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUMvQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN2QyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzdELFVBQVUsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3pELFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRWxDLElBQUksT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFbkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ3BCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXBCLElBQUksR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUNyQixJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxXQUFXLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUMxQixXQUFXLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUM5QixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdEU7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRTtZQUM5RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkYsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUN2QixRQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25GLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNyQjthQUNJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xIO0lBQ0wsQ0FBQztJQUVELHlDQUF3QixHQUF4QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUNsRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxTQUFTLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN4QixTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMxQixTQUFTLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM1RCxTQUFTLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUN4RCxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7SUFDeEMsQ0FBQztJQUVELDBDQUF5QixHQUF6QixVQUEwQixJQUFJLEVBQUUsT0FBZTtRQUFmLHdCQUFBLEVBQUEsZUFBZTtRQUMzQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDL0QsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsc0NBQXFCLEdBQXJCLFVBQXNCLElBQWU7UUFBZixxQkFBQSxFQUFBLGVBQWU7UUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUYsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELDRDQUEyQixHQUEzQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxRQUFRLENBQUM7UUFDaEQsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUUsSUFBSSxhQUFhLEdBQUcsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUUsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVELGtDQUFpQixHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksT0FBTyxHQUFHLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUM5QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO2FBQ0c7WUFDQSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVELHVDQUFzQixHQUF0QjtRQUNJLDJCQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLGFBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVoQixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3RCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQ3JCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ25CLEVBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUNsQixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3RCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQ25CLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUN4QixFQUNELEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFDaEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLEVBQUU7UUFFTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCx1QkFBdUI7WUFDdkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLENBQUMsaUJBQWlCO2dCQUM3QyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBRWxDLGdCQUFnQjtZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFFekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUMxQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO29CQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMxQzthQUNKO1lBRUQsWUFBWTtZQUNaLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFFbkQsWUFBWTtZQUNaLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFFbkQsTUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO2FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ25CLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQjthQUNHO1lBQ0EsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBRUwsQ0FBQztJQUVELDJDQUEwQixHQUExQjtRQUNJLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDekcsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJO1lBQ3RDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUMvRixDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUM1QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBRXhFLE9BQU87WUFDSDtnQkFDSSxFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFNBQVMsRUFBRSxHQUFHLEdBQUcsS0FBSztnQkFDdEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO2FBQ3RDO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixTQUFTLEVBQUUsR0FBRyxHQUFHLE1BQU07Z0JBQ3ZCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQzthQUNyQztZQUNEO2dCQUNJLEVBQUUsRUFBRSxPQUFPO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxlQUFlO2dCQUNyQixVQUFVLEVBQUUsS0FBSztnQkFDakIsU0FBUyxFQUFFLEdBQUcsR0FBRyxRQUFRLEdBQUcsR0FBRztnQkFDL0IsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUN0QztTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsc0NBQXFCLEdBQXJCO1FBQ0ksT0FBTyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsNkNBQTRCLEdBQTVCO1FBQ0ksT0FBTztZQUNIO2dCQUNJLEVBQUUsRUFBRSxRQUFRO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixVQUFVLEVBQUUsR0FBRztnQkFDZixTQUFTLEVBQUUsSUFBSTtnQkFDZixXQUFXLEVBQUUsQ0FBQztnQkFDZCxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Z0JBQ2xDLFdBQVcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUMzQztZQUNEO2dCQUNJLEVBQUUsRUFBRSxXQUFXO2dCQUNmLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxhQUFhO2dCQUNuQixVQUFVLEVBQUUsR0FBRztnQkFDZixTQUFTLEVBQUUsSUFBSTtnQkFDZixjQUFjLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO2dCQUNqQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7YUFDMUM7WUFDRDtnQkFDSSxFQUFFLEVBQUUsT0FBTztnQkFDWCxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsZUFBZTtnQkFDckIsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLFdBQVcsRUFBRSxHQUFHO2dCQUNoQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7Z0JBQ2xDLFdBQVcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQzthQUMzQztTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsdUNBQXNCLEdBQXRCLFVBQXVCLE1BQU07UUFDekIsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxNQUFNLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjthQUNJLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxLQUFLLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQzlCO2FBQ0ksSUFBSSxNQUFNLENBQUMsRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQy9DO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsOENBQTZCLEdBQTdCLFVBQThCLE1BQU07UUFDaEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQ3ZCLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7WUFDN0IsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUM7WUFDcEMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQztZQUMxQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxDQUFDO1lBQ3BDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUM7WUFDeEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxLQUFLO1NBQ2xELENBQUM7UUFFRixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCw4Q0FBNkIsR0FBN0I7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxrQ0FBaUIsR0FBakIsVUFBa0IsTUFBTTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEQsT0FBTztTQUNWO1FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELGFBQWEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLGFBQWEsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXZCLElBQUksY0FBYyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZELGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzlCLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxVQUFVLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0QsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDM0IsVUFBVSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDN0QsVUFBVSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFekQsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMvQixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckMsVUFBVSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDekIsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDM0IsVUFBVSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDM0QsVUFBVSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFekQsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUMzRCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV6RCxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQzNCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDZixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUN6QixFQUNELEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUN0QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUNuQixFQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGlDQUFnQixHQUFoQixVQUFpQixNQUFNO1FBQ25CLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakQsT0FBTztTQUNWO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6QixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ25CLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDakIsRUFBRSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFWixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRCxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JELEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXBELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdkIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUNuQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDakIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNoQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsdUNBQXNCLEdBQXRCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbEIsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFbkIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEQsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXBELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdkIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUN0QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3pCLEVBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDakIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUNmLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDeEIsRUFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBNEIsR0FBNUI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDekIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNsQixLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNsQixLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUVuQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2QixRQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVsQixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDdkIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEQsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFcEQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN2QixFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQ2YsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDekIsRUFDRCxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUNqQixFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQ2YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUN4QixFQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUEwQixHQUExQixVQUEyQixNQUFNO1FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3RCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQ3BCLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2xCLEVBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUNsQixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM3QyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN0QixFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDekIsRUFDRCxFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ2hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUN4QixFQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDbkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQ3JCLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUNyQixDQUFDO1FBQ0YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQseUNBQXdCLEdBQXhCLFVBQXlCLE1BQU07UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BELE9BQU87U0FDVjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxhQUFhLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdkMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixhQUFhLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUM1QixhQUFhLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV2QixJQUFJLGNBQWMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRCxjQUFjLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDekIsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDM0IsVUFBVSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDN0QsVUFBVSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFekQsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV6RCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3ZCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDZixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUN6QixFQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ2xCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFDaEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUN6QixFQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUE0QixHQUE1QjtRQUNJLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDM0IsT0FBTztTQUNWO1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxNQUFNLENBQUM7UUFFeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvSixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXJCLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7UUFDL0QsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVyQixNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDekMsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQ3ZCLEVBQ0QsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFDckIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQ3ZCLENBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsMENBQXlCLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMseUJBQXlCLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsRUFBRTtZQUM5RSxJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQztJQUMxQyxDQUFDO0lBRUQsbUNBQWtCLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLDJCQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hFO1NBQ0o7YUFDRztZQUNBLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxnQ0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtZQUN6QiwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFDRCxnQkFBZ0I7SUFDaEIsa0NBQWlCLEdBQWpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCxxQ0FBb0IsR0FBcEI7UUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsc0JBQXNCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM5SCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsMkNBQTBCLEdBQTFCLFVBQTJCLEVBQVc7UUFBWCxtQkFBQSxFQUFBLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDbkQsT0FBTztTQUNWO1FBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3pDLE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLE9BQU8sR0FBRyxhQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNuQyxJQUFJLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDaEIsU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDNUIsUUFBUSxHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUM7U0FDbEM7YUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUN0QixTQUFTLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUM1QixRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckUsSUFBSSxZQUFZLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxFQUFFO1lBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDeEM7YUFDRztZQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDM0c7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsNEJBQTRCO0lBQzVCLHlCQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hHLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDL0YsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNoRixnQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUssSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO1lBQ25GLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDL0M7UUFFRCwrREFBK0Q7UUFDL0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRTtZQUN6QiwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCwwQ0FBeUIsR0FBekIsVUFBMEIsUUFBUTtRQUM5QixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUM3QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUN4RCxJQUFJLFdBQVcsR0FBRztZQUNkLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRTtZQUNyQixhQUFhLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtTQUMzQyxDQUFDO1FBQ0YsZ0JBQU0sQ0FBQyxjQUFjLENBQ2pCLElBQUksRUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDbEIsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUNoQyxZQUFZLEVBQ1osSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNoQixJQUFJLENBQUMsSUFBSSxFQUNULENBQUMsRUFDRCxZQUFZLEVBQ1osV0FBVyxDQUNkLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzFCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDNUMsMkJBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQseUNBQXdCLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDbkQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsRUFBRTtZQUM5QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxtQ0FBa0IsR0FBbEIsVUFBbUIsVUFBVSxFQUFFLFlBQVk7UUFDdkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGtDQUFpQixHQUFqQjtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDeEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN4QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFckUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQ3BCLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQ3BFLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQzVELENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlDQUFnQixHQUFoQixVQUFpQixVQUFVLEVBQUUsWUFBWTtRQUNyQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3hDLE9BQU87U0FDVjtRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDMUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwRixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RCxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdkIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxFQUNuQyxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FDN0MsRUFDRCxFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFDaEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQy9DLEVBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0JBQWMsR0FBZCxVQUFlLFVBQVUsRUFBRSxZQUFZO1FBQ25DLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BELE9BQU87U0FDVjtRQUVELElBQUksVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pELFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDeEIsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDdkIsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQ3BCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUN6QixFQUNELEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDZixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FDeEIsRUFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN0QixRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNyQixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELGdCQUFnQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDakQsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUMxQixFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDekIsRUFDRCxFQUFFLENBQUMsS0FBSyxDQUNKLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ2hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUN6QixFQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQscUNBQW9CLEdBQXBCLFVBQXFCLFVBQVUsRUFBRSxZQUFZO1FBQ3pDLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDMUMsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxVQUFVLElBQUkscUJBQXFCLEVBQUU7WUFDckMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxvQ0FBbUIsR0FBbkIsVUFBb0IsRUFBRTtRQUNsQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQztZQUMvQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7YUFDaEM7WUFFRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0JBQ2pGLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQzthQUNoRjtZQUNELElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztnQkFDL0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbkQ7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLEtBQUssRUFBRTtZQUNyQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUNqRCxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDZCxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUVyRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtZQUN4RSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVELGtDQUFpQixHQUFqQjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDMUYsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxnQkFBTSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25MLDJCQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0lBQzFELENBQUM7SUFFRCw4QkFBYSxHQUFiO1FBQ0ksSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsb0NBQW1CLEdBQW5CO1FBQ0ksSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELDhCQUFhLEdBQWI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsZ0JBQU0sQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUssSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsRUFBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsMkJBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHNDQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzVFLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDM0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEgsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsdUNBQXNCLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVELHFDQUFvQixHQUFwQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzNFLElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNyQixNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQy9CO2FBQ0c7WUFDQSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDeEI7UUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ25ELElBQUksY0FBYyxHQUFHLG9CQUFvQixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO1lBQ3BILEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDakMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JDLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUNELElBQUksb0JBQW9CLElBQUksV0FBVyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QzthQUNHO1lBQ0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELHdDQUF1QixHQUF2QjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3ZHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1SCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDbEcsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQjtZQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDakIsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixLQUFLO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDM0IsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sRUFBRTtZQUN2RSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3ZEO1FBQ0QsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHdDQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3pDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUM3RCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUMzRSxNQUFNLEVBQUUsNEJBQTRCO2dCQUNwQyxVQUFVLEVBQUUscUJBQXFCO2FBQ3BDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELHVDQUFzQixHQUF0QixVQUF1QixNQUFNO1FBQTdCLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQUU7WUFDM0MsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDcEQsVUFBVSxFQUFFLHFCQUFxQjtnQkFDakMsU0FBUyxFQUFFLDRCQUE0QjtnQkFDdkMsTUFBTSxFQUFFO29CQUNKLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO3dCQUMzQyxLQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN4QztnQkFDTCxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLEVBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUNwQztRQUNELDJCQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxpQ0FBZ0IsR0FBaEIsVUFBaUIsTUFBTTtRQUF2QixpQkF5QkM7UUF4QkcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBRTtZQUNyQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ3BELFVBQVUsRUFBRSxxQkFBcUI7Z0JBQ2pDLFNBQVMsRUFBRSw0QkFBNEI7Z0JBQ3ZDLE1BQU0sRUFBRTtvQkFDSixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3RDLEtBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNuQztnQkFDTCxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047YUFDRztZQUNBLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsRUFBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsMkJBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHdDQUF1QixHQUF2QjtRQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNsRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ2hCO2FBQ0ksSUFBSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFO1lBQ3BDLElBQUksR0FBRyxXQUFXLENBQUM7U0FDdEI7UUFDRCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxpQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBRyxFQUFFLFlBQVk7UUFDOUIsSUFBSSxPQUFPLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEQsT0FBTyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNoRCxDQUFDO0lBRUQsbUNBQWtCLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQy9CLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVELGtDQUFpQixHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckMsT0FBTztTQUNWO1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUVwQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVoQixNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDekMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUN4QixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVELGtDQUFpQixHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVELDZCQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQy9CLE9BQU87U0FDVjtRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDOUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUNwQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN0QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUN0QixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLGFBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsOENBQTZCLEdBQTdCLFVBQThCLFdBQWU7UUFBZiw0QkFBQSxFQUFBLGVBQWU7UUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ3BFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQseUNBQXdCLEdBQXhCLFVBQXlCLFdBQWU7UUFBZiw0QkFBQSxFQUFBLGVBQWU7UUFDcEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELHlDQUF3QixHQUF4QixVQUF5QixXQUFlO1FBQWYsNEJBQUEsRUFBQSxlQUFlO1FBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsNkJBQVksR0FBWjtRQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsRUFBRTtZQUM5QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCx3Q0FBdUIsR0FBdkI7UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLElBQUksd0JBQXdCLENBQUM7SUFDaEQsQ0FBQztJQUVELG1DQUFrQixHQUFsQjtRQUNJLElBQUksT0FBTyxHQUFHLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUM5QixPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3BDO2FBQ0c7WUFDQSxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVELHdDQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksd0JBQXdCLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQsMENBQXlCLEdBQXpCLFVBQTBCLE9BQVk7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUMvQjtRQUNELElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7U0FDckI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxlQUFlLElBQUksSUFBSSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1NBQ2xHO1FBQ0QsSUFBSSxPQUFPLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksT0FBTyxDQUFDLHFCQUFxQixJQUFJLElBQUksRUFBRTtZQUN2QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDNUU7UUFDRCxJQUFJLE9BQU8sQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLEVBQUU7WUFDdkMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxxQkFBcUIsR0FBRyxZQUFZLENBQUMsQ0FBQztTQUM1RTtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixzQkFBSyxHQUFMLFVBQU0sTUFBTTtRQUNSLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDWixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLDJCQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXJDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQsb0NBQW1CLEdBQW5CLFVBQW9CLE1BQU0sRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ1osTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNkO1FBRUQsSUFBSSxhQUFhLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDMUIsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQiwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN4QztTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCxrQ0FBaUIsR0FBakIsVUFBa0IsRUFBRSxFQUFFLEtBQVk7UUFBWixzQkFBQSxFQUFBLFlBQVk7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUVELElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNaLE9BQU87U0FDVjtRQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDWixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxhQUFhLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDMUIsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQiwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN4QztTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCxxQ0FBb0IsR0FBcEIsVUFBcUIsS0FBVTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2xDLE9BQU87U0FDVjtRQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxLQUFLLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RCLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDWixNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN4QjtZQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDekI7UUFDRCxJQUFJLEtBQUssQ0FBQyxjQUFjLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztTQUMvQztRQUNELElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkQsSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDO2dCQUN2QyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzthQUNsQztTQUNKO1FBQ0QsSUFBSSxLQUFLLENBQUMsa0JBQWtCLElBQUksSUFBSSxFQUFFO1lBQ2xDLElBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbkUsSUFBSSxzQkFBc0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDbEM7U0FDSjtRQUNELElBQUksS0FBSyxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDaEc7UUFDRCxJQUFJLEtBQUssQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUMxRTtRQUNELElBQUksS0FBSyxDQUFDLHFCQUFxQixJQUFJLElBQUksRUFBRTtZQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLHFCQUFxQixHQUFHLFlBQVksQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7U0FDekM7UUFDRCxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7U0FDN0M7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFckUsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsRUFBRTtZQUNyQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQzVGLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakM7U0FDSjtRQUVELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQzFCLGFBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsMkJBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDeEM7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsa0RBQWlDLEdBQWpDLFVBQWtDLFNBQVMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCO1FBQ3BFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ25DLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsa0JBQWtCLENBQUM7UUFDaEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFbkQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsT0FBTztnQkFDSCxFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFNBQVMsRUFBRSxHQUFHLEdBQUcsT0FBTztnQkFDeEIsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO2FBQ3RDLENBQUM7U0FDTDtRQUNELElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNkLE9BQU87Z0JBQ0gsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixTQUFTLEVBQUUsR0FBRyxHQUFHLFFBQVE7Z0JBQ3pCLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7YUFDckMsQ0FBQztTQUNMO1FBQ0QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLE9BQU87Z0JBQ0gsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixTQUFTLEVBQUUsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHO2dCQUNqQyxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO2FBQ3RDLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxxQ0FBb0IsR0FBcEI7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFcEIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWhCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDeEIsRUFBRSxDQUFDLEtBQUssQ0FDSixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQ3RCLEVBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDZixFQUFFLENBQUMsVUFBVSxFQUFFLENBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQ0FBMEIsR0FBMUI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNoQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMENBQXlCLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsdUJBQXVCLElBQUksQ0FBQyxFQUFFO1lBQ25DLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyx1QkFBdUIsR0FBRywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQseUNBQXdCLEdBQXhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsdUJBQXVCLElBQUksQ0FBQyxFQUFFO1lBQ25DLDJCQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCx3Q0FBdUIsR0FBdkI7UUFDSSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2hFLE9BQU87U0FDVjtRQUVELElBQUksVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pILFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUM7UUFFckMsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLElBQUksVUFBVSxHQUFHLFVBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU07WUFDL0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFRixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSx3QkFBd0IsR0FBRyxzQkFBc0IsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3hHLFVBQVUsQ0FBQyxTQUFTLENBQ2hCLEVBQUUsQ0FBQyxhQUFhLENBQ1osRUFBRSxDQUFDLFFBQVEsQ0FDUCxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxFQUN0QyxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxFQUNyQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUN6QixDQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCwwQ0FBeUIsR0FBekI7UUFDSSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELHlDQUF3QixHQUF4QjtRQUNJLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCx5Q0FBd0IsR0FBeEIsVUFBeUIsRUFBRTtRQUN2QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxzQkFBc0IsRUFBRTtZQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxnQ0FBZ0MsRUFBRTtZQUN2RCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxzQkFBc0IsSUFBSSxFQUFFLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsc0JBQXNCLElBQUksbUNBQW1DO2VBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBc0IsRUFBRTtZQUNuRCxJQUFJLENBQUMsc0JBQXNCLElBQUksbUNBQW1DLENBQUM7WUFDbkUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxzQkFBc0IsRUFBRTtZQUNqRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELHNDQUFxQixHQUFyQjtRQUFBLGlCQStCQztRQTlCRyxJQUFJLFVBQVUsR0FBRztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO1NBQ3hCLENBQUM7UUFDRixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsc0JBQXNCO2VBQzNDLElBQUksQ0FBQyxhQUFhLElBQUksZ0NBQWdDLEVBQUU7WUFDM0QsZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxtQ0FBbUMsQ0FBQztZQUNwRixJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLGVBQWUsR0FBRyxDQUFDLENBQUM7YUFDdkI7U0FDSjtRQUVELFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSztZQUM5QixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDbkMsT0FBTzthQUNWO1lBRUQsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMvQixPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDckM7aUJBQ0ksSUFBSSxLQUFLLElBQUksS0FBSSxDQUFDLGdCQUFnQixJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUU7Z0JBQzVELE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQzthQUNuRDtpQkFDRztnQkFDQSxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDckM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO0lBQ0oseUJBQVEsR0FBUixVQUFTLEVBQUU7UUFDUCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUVqRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksT0FBTyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBRXpCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCxNQUFNO0lBQ04sd0JBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFO1lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUU7Z0JBQzdDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BDLENBQUMsQ0FBQztTQUNOO2FBQ0c7WUFDQSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLE9BQU87UUFDUCxTQUFTO0lBQ2IsQ0FBQztJQUVELDhCQUFhLEdBQWI7UUFDSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPO0lBQ1AscUNBQW9CLEdBQXBCO1FBQ0ksT0FBTyxhQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQXowRVEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQTIwRWxCO0lBQUQsYUFBQztDQTMwRUQsQUEyMEVDLENBMzBFMkIsWUFBSSxHQTIwRS9CO0FBMzBFWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFua30gZnJvbSBcIi4vVGFua0VcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0J1bGxldH0gZnJvbSBcIi4vQnVsbGV0RVwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi9zZGsvc2RrL1NES01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBQTEFZRVJfU0hPT1RfSU5URVJWQUwgPSAwLjM1O1xyXG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYID0gMztcclxuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkgPSAwLjg7XHJcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMID0gMC42O1xyXG5jb25zdCBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1QgPSA1ICogKDEgLSAwLjEpO1xyXG5jb25zdCBQTEFZRVJfRVhQX0JBU0UgPSAzMDtcclxuY29uc3QgUExBWUVSX0VYUF9TVEVQID0gMTU7XHJcbmNvbnN0IENIQVJHRV9DQU5OT05fQlVMTEVUX1RZUEUgPSA5OTtcclxuY29uc3QgT0lMX1NIRUxMX0JVTExFVF9UWVBFID0gMTAwO1xyXG5jb25zdCBPSUxfU0hFTExfTUFYX0NPVU5UID0gMTtcclxuY29uc3QgQkxBQ0tfSE9MRV9TSEVMTF9NQVhfQ09VTlQgPSAxO1xyXG5jb25zdCBPSUxfVEhST1dfUFJFVklFV19BUkNfSEVJR0hUID0gMTEwO1xyXG5jb25zdCBPSUxfVEhST1dfQVJFQV9SQURJVVMgPSAxMjA7XHJcbmNvbnN0IExPV19IUF9TQ1JFRU5fRkxBU0hfSU4gPSAwLjI7XHJcbmNvbnN0IExPV19IUF9TQ1JFRU5fRkxBU0hfT1VUID0gMC41O1xyXG5jb25zdCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0xPT1AgPSAzO1xyXG5jb25zdCBTSE9PVF9SRUNPSUxfRElTVEFOQ0UgPSAxMDtcclxuY29uc3QgU0hPT1RfUkVDT0lMX09VVF9USU1FID0gMC4wNDtcclxuY29uc3QgU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FID0gMC4xMTtcclxuY29uc3QgU0hPT1RfRkxBU0hfRkFERV9JTiA9IDAuMDI7XHJcbmNvbnN0IFNIT09UX0ZMQVNIX0ZBREVfT1VUID0gMC4wNztcclxuY29uc3QgU0FDUklGSUNFX0hQX1JBVElPID0gMC41O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFRhbmsge1xyXG5cclxuICAgIC8v5YaF6YOo5Y+Y6YePXHJcbiAgICBfbGV2ZWwgICAgICAgICAgPSAxOyAgICAgICAgLy/njqnlrrbnrYnnuqdcclxuXHJcbiAgICBfYnVsbGV0Q29kZVRpbWUgPSAwOyAgICAgICAgLy/lsITlh7vlhrfljbTml7bpl7RcclxuXHJcbiAgICBfaXNIaWdoQnVsbGV0ICAgPSBmYWxzZTsgICAgLy/kuInlj5Hpq5jpopHlrZDlvLlcclxuXHJcbiAgICBfc2tpbGwyVGltZSAgICAgPSAwOyAgICAgICAgLy/mioDog70yKOi2hee6p+WtkOW8uSnliankvZnml7bpl7RcclxuICAgIF9za2lsbDNUaW1lICAgICA9IDA7ICAgICAgICAvL+aKgOiDvTMo5peg5pWM6Ziy5b6hKeWJqeS9meaXtumXtFxyXG5cclxuICAgIF9pbkdhbWUgICAgICAgICA9IGZhbHNlOyAgICAvL+WcqOa4uOaIj+S4reS4reS9v+eUqFxyXG4gICAgX3ZpZXdNb2RlICAgICAgID0gZmFsc2U7ICAgIC8v5bGV56S65qih5byPXHJcbiAgICBfZnJlZUJ1bGxldENvdW50ID0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWDsgIC8v5b2T5YmN5YWN6LS55a2Q5by55pWw6YePXHJcbiAgICBfc3RvcEZpcmVUaW1lID0gMDsgICAgICAgICAgLy/lgZzngavorqHml7ZcclxuICAgIF9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwOyAvL+WFjei0ueWtkOW8ueaBouWkjeiuoeaXtlxyXG4gICAgX21vdmVJbnB1dERpciA9IGNjLnYyKDEsIDApOyAvL+enu+WKqOaRh+adhuebruagh+aWueWQkVxyXG4gICAgX21vdmVJbnB1dFJhdGlvID0gMDsgICAgICAgIC8v56e75Yqo5pGH5p2G55uu5qCH6YCf546HXHJcbiAgICBfbW92ZVNwZWVkU2NhbGUgPSAxOyAgICAgICAgLy/lsYDlhoXnp7vpgJ/lgI3njodcclxuICAgIF9lbmVyZ3lMZXZlbCA9IDE7ICAgICAgICAgICAvL+WxgOWGheiDvemHj+etiee6p1xyXG4gICAgX2VuZXJneUV4cCA9IDA7ICAgICAgICAgICAgIC8v5b2T5YmN57uP6aqMXHJcbiAgICBfZW5lcmd5TmVlZEV4cCA9IFBMQVlFUl9FWFBfQkFTRTsgLy/ljYfnuqfmiYDpnIDnu4/pqoxcclxuICAgIF9jaGFyZ2VDYW5ub25UaW1lID0gMDsgICAgICAvL+iThOWKm+eCruiThOWKm+aXtumXtFxyXG4gICAgX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7ICAgIC8v6JOE5Yqb54Ku5Ya35Y20XHJcbiAgICBfY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwOyAgLy/ok4Tlipvngq7lhrfljbTmgLvml7bplb9cclxuICAgIF9jaGFyZ2VDYW5ub25DaGFyZ2luZyA9IGZhbHNlO1xyXG4gICAgX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XHJcbiAgICBfY2hhcmdlRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICBfb2lsU2hlbGxDb3VudCA9IDA7XHJcbiAgICBfYmxhY2tIb2xlU2hlbGxDb3VudCA9IDA7XHJcbiAgICBfb2lsU2hlbGxQcmV2aWV3aW5nID0gZmFsc2U7XHJcbiAgICBfb2lsU2hlbGxQcmV2aWV3VGFyZ2V0ID0gbnVsbDtcclxuICAgIF9vaWxTaGVsbEFpbURpciA9IGNjLnYyKDEsIDApO1xyXG4gICAgX29pbFNoZWxsQWltUmF0aW8gPSAxO1xyXG4gICAgX2FjdGl2ZVRocm93U2tpbGxUeXBlID0gXCJcIjtcclxuICAgIF9idWxsZXRNdXRhdGlvblR5cGUgPSBcIlwiO1xyXG4gICAgX2J1bGxldE11dGF0aW9uRGF0YSA9IG51bGw7XHJcbiAgICBfYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcclxuICAgIF9tb3ZlRWZmZWN0SWQgPSAtMTtcclxuICAgIF9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID0gLTE7XHJcbiAgICBfbG93SHBTY3JlZW5FZmZlY3QgPSBudWxsO1xyXG4gICAgX3Nob290SW5wdXREaXIgPSBjYy52MigxLCAwKTsgICAvL+WwhOWHu+aRh+adhuebruagh+aWueWQkVxyXG4gICAgX2xvY2FsUHJldmlld0JhcnJlbERpciA9IG51bGw7ICAgLy/mnKzlnLDogZTmnLrnjqnlrrbngq7nrqHpooTop4jmlrnlkJEo5LuF6KGo546w5bGCKVxyXG4gICAgX2ZyYW1lSW5wdXQgPSBudWxsOyAgICAgICAgICAgICAvL+e9kee7nOW4p+i+k+WFpSjlpJrkuropXHJcbiAgICBfbXVsdGlwbGF5ZXJNb2RlID0gZmFsc2U7ICAgICAgIC8v5aSa5Lq65qih5byPKOemgeeUqOacrOWcsOaRh+adhilcclxuICAgIF9tdWx0aXBsYXllclJlbW90ZSA9IGZhbHNlOyAgICAgLy/lpJrkurrov5znq6/njqnlrrZcclxuICAgIF9tdWx0aXBsYXllclBsYXllcklkID0gLTE7ICAgICAgLy/lpJrkurrnjqnlrrZJRFxyXG4gICAgX211bHRpcGxheWVySW5CdXNoID0gZmFsc2U7XHJcbiAgICBfbXVsdGlwbGF5ZXJCdXNoSWQgPSBudWxsO1xyXG4gICAgX2J1c2hWaXNpYmlsaXR5TW9kZSA9IFwibm9ybWFsXCI7XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwicGxheWVyXCI7ICAvL+mYteiQpVxyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHRoaXMuX3JhZGl1cyAqIDI7ICAgIC8v546p5a6255qE56Kw5pKe5qOA5rWL6IyD5Zu0KjJcclxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IFBMQVlFUl9TSE9PVF9JTlRFUlZBTDtcclxuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYO1xyXG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuX21vdmVJbnB1dERpciA9IHRoaXMuX2RpcjtcclxuICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5fbW92ZVNwZWVkU2NhbGUgPSAxO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUxldmVsID0gMTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgPSAwO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSB0aGlzLl9nZXRFbmVyZ3lOZWVkRXhwKCk7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1EaXIgPSB0aGlzLl9iYXJyZWxEaXIgJiYgdGhpcy5fYmFycmVsRGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHRoaXMuX2JhcnJlbERpcikubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID0gMTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHJvd1NraWxsVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25UeXBlID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbW92ZUVmZmVjdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zaG9vdElucHV0RGlyID0gdGhpcy5fYmFycmVsRGlyO1xyXG4gICAgICAgIHRoaXMuX2xvY2FsUHJldmlld0JhcnJlbERpciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbkJ1c2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1c2hJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYnVzaFZpc2liaWxpdHlNb2RlID0gXCJub3JtYWxcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWdpuWFi+exu+Wei1xyXG4gICAgc2V0UGxheWVyVHlwZSh0YW5rVHlwZSxwbGF5ZXJMZXZlbCkge1xyXG4gICAgICAgIHN1cGVyLnNldFRhbmtUeXBlKHRhbmtUeXBlKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+iuoeeul+eOqeWutuihgOmHjyDmlLvlh7tcclxuICAgICAgICB0aGlzLl9sZXZlbCA9IHBsYXllckxldmVsO1xyXG4gICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHAgPSB0aGlzLl9jb25maWcuSFAgKiAodGhpcy5fbGV2ZWwrMSk7XHJcbiAgICAgICAgdGhpcy5fYXRrID0gdGhpcy5fY29uZmlnLkFUSyAqICh0aGlzLl9sZXZlbCsxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNdWx0aXBsYXllclNldHVwUGF5bG9hZCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YW5rVHlwZTogdGhpcy5fdGFua1R5cGUsXHJcbiAgICAgICAgICAgIHBsYXllckxldmVsOiB0aGlzLl9sZXZlbCxcclxuICAgICAgICAgICAgYmFzZUhwOiB0aGlzLl9tYXhIcCxcclxuICAgICAgICAgICAgYmFzZUF0azogdGhpcy5fYXRrLFxyXG4gICAgICAgICAgICBiYXNlU3BlZWQ6IHRoaXMuX2dldENvbmZpZ1ZhbHVlKFwiU3BlZWRcIiwgMCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMllVJXHJcbiAgICBfaW5pdFVJKCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgICAgIHRoaXMuX2luaXRFbmVyZ3lVSSgpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgIC8v5pGH5p2G5LqL5Lu2XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdqb3ktc3RpY2stc2hvb3QnLHRoaXMuX2RvU2hvb3RKb3lTdGljayx0aGlzKTsgLy/lsITlh7vmkYfmnYbkuovku7ZcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2NoYXJnZS1jYW5ub24tcHJlc3MnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUHJlc3MsdGhpcyk7IC8v6JOE5Yqb54Ku5oyJ5LiLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjaGFyZ2UtY2Fubm9uLXJlbGVhc2UnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZSx0aGlzKTsgLy/ok4Tlipvngq7mnb7lvIBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ29pbC1zaGVsbC10cmlnZ2VyJyx0aGlzLl9kb09pbFNoZWxsVHJpZ2dlcix0aGlzKTsgLy/nhKbmsrnlvLnlj5HlsIRcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItc2FjcmlmaWNlJyx0aGlzLl9kb1NhY3JpZmljZSx0aGlzKTsgLy/njK7npa3mjInpkq5cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItY292ZXItYWN0aW9uJyx0aGlzLl9kb0NvdmVyQWN0aW9uLHRoaXMpOyAvL+aOqeS9k+WQuOmZhC/liIbnprtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItc2tpbGwnLHRoaXMuX2RvU2tpbGwsdGhpcyk7ICAgICAvL+inpuWPkeaKgOiDvVxyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdqb3ktc3RpY2snLHRoaXMuX2RvSm95U3RpY2ssdGhpcyk7ICAgICAvL+aRh+adhuS6i+S7tlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2pveS1zdGljay1zaG9vdCcsdGhpcy5fZG9TaG9vdEpveVN0aWNrLHRoaXMpOyAvL+WwhOWHu+aRh+adhuS6i+S7tlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2NoYXJnZS1jYW5ub24tcHJlc3MnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUHJlc3MsdGhpcyk7IC8v6JOE5Yqb54Ku5oyJ5LiLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY2hhcmdlLWNhbm5vbi1yZWxlYXNlJyx0aGlzLl9kb0NoYXJnZUNhbm5vblJlbGVhc2UsdGhpcyk7IC8v6JOE5Yqb54Ku5p2+5byAXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignb2lsLXNoZWxsLXRyaWdnZXInLHRoaXMuX2RvT2lsU2hlbGxUcmlnZ2VyLHRoaXMpOyAvL+eEpuayueW8ueWPkeWwhFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItc2FjcmlmaWNlJyx0aGlzLl9kb1NhY3JpZmljZSx0aGlzKTsgLy/njK7npa3mjInpkq5cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd0cmlnZ2VyLWNvdmVyLWFjdGlvbicsdGhpcy5fZG9Db3ZlckFjdGlvbix0aGlzKTsgLy/mjqnkvZPlkLjpmYQv5YiG56a7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndHJpZ2dlci1za2lsbCcsdGhpcy5fZG9Ta2lsbCx0aGlzKTsgICAgLy/op6blj5HmioDog71cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mkYfmnYbkuovku7ZcclxuICAgIF9kb0pveVN0aWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSBldmVudC5kaXI7ICAgICAgLy/mlrnlkJFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IGV2ZW50LnJhdGlvOyAgLy/pgJ/njodcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsITlh7vmkYfmnYbkuovku7ZcclxuICAgIF9kb1Nob290Sm95U3RpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHJldHVybjtcclxuICAgICAgICBpZiAoZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvb3RJbnB1dERpciA9IGV2ZW50LmRpcjtcclxuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gZXZlbnQuZGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuZmlyZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90cnlGaXJlT25jZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNdWx0aXBsYXllckxvY2FsQWltUHJldmlldyhkaXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGlyIHx8IGRpci5tYWdTcXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyID0gY2MudjIoZGlyKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+e9kee7nOW4p+i+k+WFpSjlpJrkurrmqKHlvI8pXHJcbiAgICBzZXRGcmFtZUlucHV0KGlucHV0cykge1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lSW5wdXQgPSBpbnB1dHM7XHJcbiAgICAgICAgaWYgKGlucHV0cyAmJiBpbnB1dHMudGhyb3dUYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1SYXRpbyA9IE51bWJlci5pc0Zpbml0ZShpbnB1dHMudGhyb3dUYXIucmF0aW8pID8gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgaW5wdXRzLnRocm93VGFyLnJhdGlvKSkgOiB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvO1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGlucHV0cy50aHJvd1Rhci5kaXJYKSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLnRocm93VGFyLmRpclkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyRGlyID0gY2MudjIoaW5wdXRzLnRocm93VGFyLmRpclgsIGlucHV0cy50aHJvd1Rhci5kaXJZKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJEaXIubWFnU3FyKCkgPiAwLjAwMDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbURpciA9IHRhckRpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgaWYgKGlucHV0cy51cCkgZGlyLnkgKz0gMTtcclxuICAgICAgICBpZiAoaW5wdXRzLmRvd24pIGRpci55IC09IDE7XHJcbiAgICAgICAgaWYgKGlucHV0cy5sZWZ0KSBkaXIueCAtPSAxO1xyXG4gICAgICAgIGlmIChpbnB1dHMucmlnaHQpIGRpci54ICs9IDE7XHJcbiAgICAgICAgaWYgKGRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gZGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5wdXRzLmFpbSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLmFpbS54KSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLmFpbS55KSkge1xyXG4gICAgICAgICAgICBsZXQgYWltRGlyID0gY2MudjIoaW5wdXRzLmFpbS54LCBpbnB1dHMuYWltLnkpO1xyXG4gICAgICAgICAgICBpZiAoYWltRGlyLm1hZ1NxcigpID4gMC4wMDAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9vdElucHV0RGlyID0gYWltRGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fc2hvb3RJbnB1dERpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNldEZyYW1lSW5wdXQtLS1pbnB1dHNcIixpbnB1dHMpXHJcbiAgICAgICAgaWYgKGlucHV0cy5maXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVCeU11bHRpcGxheWVyQ29tbWFuZChpbnB1dHMuZmlyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE11bHRpcGxheWVyRmlyZVR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9za2lsbDJUaW1lID4gMCkgPyB0aGlzLl9jb25maWcuQlR5cGUyIDogdGhpcy5fY29uZmlnLkJUeXBlMTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9DaGFyZ2VDYW5ub25QcmVzcyhldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUgJiYgdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlIHx8IHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA+IDAgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faGlkZUNoYXJnZUVmZmVjdCgpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IDB9KTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImNoYXJnZUNhbm5vblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9DaGFyZ2VDYW5ub25SZWxlYXNlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFyZ2VDYW5ub24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2RvU2FjcmlmaWNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9PaWxTaGVsbFRyaWdnZXIoZXZlbnQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbENvdW50IDw9IDAgJiYgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJlc3NlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LnByZXNzZWQgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCBhaW1pbmcgPSAhIShldmVudCAmJiBldmVudC5haW1pbmcgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCByZWxlYXNlID0gISEoZXZlbnQgJiYgZXZlbnQucmVsZWFzZSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LmNhbmNlbGxlZCA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHByZXNzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWltaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU9pbFNoZWxsQWltKGV2ZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVsZWFzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21taXRPaWxTaGVsbFRocm93KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2RvQ292ZXJBY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgIXRoaXMuX21hcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAuaXNNdWx0aXBsYXllck1vZGUgJiYgdGhpcy5fbWFwLmlzTXVsdGlwbGF5ZXJNb2RlKCkpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJtdWx0aXBsYXllci1jb3Zlci1hY3Rpb25cIiwge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySWQ6IHRoaXMuX211bHRpcGxheWVyUGxheWVySWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fbWFwLnRyeVRvZ2dsZUNvdmVyVGVzdEF0dGFjaG1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXAudHJ5VG9nZ2xlQ292ZXJUZXN0QXR0YWNobWVudCh0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/op6blj5HmioDog71cclxuICAgIF9kb1NraWxsKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGxJZCA9IGV2ZW50LnNraWxsSWQ7ICAgIC8v5pa55ZCRXHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIuinpuWPkeS6huaKgOiDvSBcIixza2lsbElkKTtcclxuICAgICAgICAgICAgaWYgKHNraWxsSWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6dGhpcy5fY29uZmlnLkNvaW4vMTAscG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLm5vZGUpfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVuZXJneSh0aGlzLl9tYXhIcCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSArPSAxNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgKz0gMTU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYWluT2lsU2hlbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5CbGFja0hvbGVTaGVsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICB0aGlzLl9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIt+aWsOeOqeWutuS9jee9rlxyXG4gICAgX3JlZnJlc2hQb3NpdGlvbihkdCkge1xyXG4gICAgICAgIC8v5aSa5Lq65qih5byP77ya5Zyoc2V0RnJhbWVJbnB1dOaYvuW8j+iwg+eUqOWJjeaLkue7neS4gOWIh+enu+WKqFxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lSW5wdXQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9mcmFtZUlucHV0LnVwICYmICF0aGlzLl9mcmFtZUlucHV0LmRvd24gJiYgIXRoaXMuX2ZyYW1lSW5wdXQubGVmdCAmJiAhdGhpcy5fZnJhbWVJbnB1dC5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZWZyZXNoTW92ZVNwZWVkKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90dXJuRGlyVG8odGhpcy5fbW92ZUlucHV0RGlyLCBkdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VyclBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICAvL+eisOaSnua1i+ivlVxyXG4gICAgICAgIGxldCB3aWxsUG9zaXRpb24gPSB0aGlzLl9nZXRXaWxsUG9zaXRpb24oY3VyclBvc2l0aW9uLCB0aGlzLl9kaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVySXRlbXMgPSB0aGlzLl9tYXAudGVzdENvbGxpZGVycyh3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XHJcbiAgICAgICAgaWYgKGNvbGxpZGVySXRlbXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gdGhpcy5fZ2V0VGVzdERpcihjdXJyUG9zaXRpb24sIHRoaXMuX3JhZGl1cywgdGhpcy5fZGlyLCBjb2xsaWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHRlc3REaXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRlc3REaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX21hcC5jbGFtcE1hcElubmVyUG9zaXRpb24od2lsbFBvc2l0aW9uLCB0aGlzLl9yYWRpdXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoTW92ZVNwZWVkKGR0KSB7XHJcbiAgICAgICAgbGV0IHRlcnJhaW5GYWN0b3IgPSB0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmdldFRlcnJhaW5TcGVlZEZhY3RvclxyXG4gICAgICAgICAgICA/IHRoaXMuX21hcC5nZXRUZXJyYWluU3BlZWRGYWN0b3IodGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9yYWRpdXMpXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBsZXQgbWF4U3BlZWQgPSB0aGlzLl9nZXRDb25maWdWYWx1ZShcIlNwZWVkXCIsIDApICogdGhpcy5fbW92ZVNwZWVkU2NhbGUgKiB0ZXJyYWluRmFjdG9yO1xyXG4gICAgICAgIGxldCB0YXJnZXRTcGVlZCA9IHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCA/IG1heFNwZWVkICogdGhpcy5fbW92ZUlucHV0UmF0aW8gOiAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkICs9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBY2NlbGVyYXRpb25cIiwgbWF4U3BlZWQsIGR0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IHRhcmdldFNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSB0YXJnZXRTcGVlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiB0YXJnZXRTcGVlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgLT0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkRlY2VsZXJhdGlvblwiLCBtYXhTcGVlZCwgZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IHRhcmdldFNwZWVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEVuZXJneSh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNvdmVySHAgPSB0aGlzLl9tYXhIcCAtIHRoaXMuX2hwO1xyXG4gICAgICAgIGlmIChyZWNvdmVySHAgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGRIcCA9IE1hdGgubWluKHJlY292ZXJIcCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9ocCArPSBhZGRIcDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gYWRkSHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1NhY3JpZmljZVRpcChcIuihgOmHj+i/h+S9jizml6Dms5XnjK7npa1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXhTYWNyaWZpY2VIcCA9IHRoaXMuX2hwIC0gMTtcclxuICAgICAgICBsZXQgc2FjcmlmaWNlSHAgPSBNYXRoLm1pbih0aGlzLl9ocCAqIFNBQ1JJRklDRV9IUF9SQVRJTywgbWF4U2FjcmlmaWNlSHApO1xyXG4gICAgICAgIGlmIChzYWNyaWZpY2VIcCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTYWNyaWZpY2VUaXAoXCLlvZPliY3ml6Dms5XnjK7npa1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hwIC09IHNhY3JpZmljZUhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cChzYWNyaWZpY2VIcCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheVNhY3JpZmljZUZlZWRiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FkZEVuZXJneUV4cChleHApIHtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgKz0gZXhwO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9lbmVyZ3lFeHAgPj0gdGhpcy5fZW5lcmd5TmVlZEV4cCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgLT0gdGhpcy5fZW5lcmd5TmVlZEV4cDtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwrKztcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TmVlZEV4cCA9IHRoaXMuX2dldEVuZXJneU5lZWRFeHAoKTtcclxuICAgICAgICAgICAgdGhpcy5fbGV2ZWxVcEJ5RW5lcmd5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRFbmVyZ3lOZWVkRXhwKCkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgYmFzZSA9IGNvbmZpZy5FeHBCYXNlID09IG51bGwgPyBQTEFZRVJfRVhQX0JBU0UgOiBjb25maWcuRXhwQmFzZTtcclxuICAgICAgICBsZXQgc3RlcCA9IGNvbmZpZy5FeHBTdGVwID09IG51bGwgPyBQTEFZRVJfRVhQX1NURVAgOiBjb25maWcuRXhwU3RlcDtcclxuICAgICAgICByZXR1cm4gYmFzZSArICh0aGlzLl9lbmVyZ3lMZXZlbCAtIDEpICogc3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBfbGV2ZWxVcEJ5RW5lcmd5KCkge1xyXG4gICAgICAgIGxldCBjaG9pY2VzID0gdGhpcy5fYnVpbGRFbmVyZ3lVcGdyYWRlQ2hvaWNlcygpO1xyXG4gICAgICAgIGlmICghY2hvaWNlcyB8fCBjaG9pY2VzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNob2ljZXMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlc1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0RW5lcmd5VUkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9saWZlYmFyIHx8IHRoaXMuX2ZpcmUuX2xiSHBMZXZlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGV2ZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJIcExldmVsXCIpO1xyXG4gICAgICAgIGxldmVsTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9saWZlYmFyO1xyXG4gICAgICAgIGxldmVsTm9kZS5zZXRQb3NpdGlvbigtMzQsIDApO1xyXG4gICAgICAgIGxldmVsTm9kZS5zZXRDb250ZW50U2l6ZSgzNiwgMjQpO1xyXG4gICAgICAgIGxldmVsTm9kZS56SW5kZXggPSAxMDtcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IGxldmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZm9udFNpemUgPSAxODtcclxuICAgICAgICBsZXZlbExhYmVsLmxpbmVIZWlnaHQgPSAyMDtcclxuICAgICAgICBsZXZlbExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGV2ZWxOb2RlW1wiJExhYmVsXCJdID0gbGV2ZWxMYWJlbDtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYkhwTGV2ZWwgPSBsZXZlbE5vZGU7XHJcblxyXG4gICAgICAgIGxldCBleHBOb2RlID0gbmV3IGNjLk5vZGUoXCJfZXhwQmFyXCIpO1xyXG4gICAgICAgIGV4cE5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fbGlmZWJhcjtcclxuICAgICAgICBleHBOb2RlLnNldFBvc2l0aW9uKC0zNCwgMCk7XHJcbiAgICAgICAgZXhwTm9kZS5zZXRDb250ZW50U2l6ZSg0NCwgNDQpO1xyXG4gICAgICAgIGV4cE5vZGUuekluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoXCJfZXhwQmdcIik7XHJcbiAgICAgICAgYmcucGFyZW50ID0gZXhwTm9kZTtcclxuICAgICAgICBsZXQgYmdHcmFwaGljcyA9IGJnLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmdHcmFwaGljcy5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig1MCwgNjgsIDc1LCAyMjApO1xyXG4gICAgICAgIGJnR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE4KTtcclxuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgYmFyID0gbmV3IGNjLk5vZGUoXCJfZXhwUHJvZ3Jlc3NcIik7XHJcbiAgICAgICAgYmFyLnBhcmVudCA9IGV4cE5vZGU7XHJcbiAgICAgICAgbGV0IGJhckdyYXBoaWNzID0gYmFyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmFyR3JhcGhpY3MubGluZVdpZHRoID0gNTtcclxuICAgICAgICBiYXJHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDkwLCAyNTUsIDE0MCwgMjU1KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9leHBCYXIgPSBleHBOb2RlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzID0gYmFyO1xyXG4gICAgICAgIGJhcltcIiRHcmFwaGljc1wiXSA9IGJhckdyYXBoaWNzO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoRW5lcmd5VUkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2xiSHBMZXZlbCAmJiB0aGlzLl9maXJlLl9sYkhwTGV2ZWwuJExhYmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2xiSHBMZXZlbC4kTGFiZWwuc3RyaW5nID0gdGhpcy5fZW5lcmd5TGV2ZWwudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9leHBQcm9ncmVzcyAmJiB0aGlzLl9maXJlLl9leHBQcm9ncmVzcy4kR3JhcGhpY3MpIHtcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5fZW5lcmd5TmVlZEV4cCA+IDAgPyB0aGlzLl9lbmVyZ3lFeHAgLyB0aGlzLl9lbmVyZ3lOZWVkRXhwIDogMDtcclxuICAgICAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MuJEdyYXBoaWNzO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDkwLCAyNTUsIDE0MCwgMjU1KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuYXJjKDAsIDAsIDE4LCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogcHJvZ3Jlc3MsIGZhbHNlKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2ZpcmUuX2V4cEJhciAmJiB0aGlzLl9maXJlLl9leHBCYXIuJFByb2dyZXNzQmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2V4cEJhci4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLl9lbmVyZ3lOZWVkRXhwID4gMCA/IHRoaXMuX2VuZXJneUV4cCAvIHRoaXMuX2VuZXJneU5lZWRFeHAgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZW5zdXJlTXVsdGlwbGF5ZXJOYW1lVUkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9saWZlYmFyIHx8IHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmFtZU5vZGUgPSBuZXcgY2MuTm9kZShcIl9sYlBsYXllck5hbWVcIik7XHJcbiAgICAgICAgbmFtZU5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fbGlmZWJhcjtcclxuICAgICAgICBuYW1lTm9kZS5zZXRQb3NpdGlvbigwLCAyNik7XHJcbiAgICAgICAgbmFtZU5vZGUuc2V0Q29udGVudFNpemUoMTIwLCAyNCk7XHJcbiAgICAgICAgbmFtZU5vZGUuekluZGV4ID0gMTI7XHJcbiAgICAgICAgbGV0IG5hbWVMYWJlbCA9IG5hbWVOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbmFtZUxhYmVsLmZvbnRTaXplID0gMTg7XHJcbiAgICAgICAgbmFtZUxhYmVsLmxpbmVIZWlnaHQgPSAyMDtcclxuICAgICAgICBuYW1lTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBuYW1lTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIG5hbWVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICBuYW1lTm9kZVtcIiRMYWJlbFwiXSA9IG5hbWVMYWJlbDtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYlBsYXllck5hbWUgPSBuYW1lTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNdWx0aXBsYXllckRpc3BsYXlOYW1lKG5hbWUsIGlzTG9jYWwgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuX2Vuc3VyZU11bHRpcGxheWVyTmFtZVVJKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9sYlBsYXllck5hbWUgfHwgIXRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZS4kTGFiZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNob3dOYW1lID0gbmFtZSB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZS4kTGFiZWwuc3RyaW5nID0gc2hvd05hbWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lLmNvbG9yID0gaXNMb2NhbCA/IGNjLmNvbG9yKDE4MCwgMjU1LCAxODAsIDI1NSkgOiBjYy5jb2xvcigyMTAsIDIzMCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZS5hY3RpdmUgPSBzaG93TmFtZS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ1c2hWaXNpYmlsaXR5TW9kZShtb2RlID0gXCJub3JtYWxcIikge1xyXG4gICAgICAgIGxldCBuZXh0TW9kZSA9IG1vZGUgPT0gXCJoaWRkZW5cIiA/IFwiaGlkZGVuXCIgOiAobW9kZSA9PSBcInNlbGZCdXNoXCIgPyBcInNlbGZCdXNoXCIgOiBcIm5vcm1hbFwiKTtcclxuICAgICAgICBpZiAodGhpcy5fYnVzaFZpc2liaWxpdHlNb2RlID09PSBuZXh0TW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2J1c2hWaXNpYmlsaXR5TW9kZSA9IG5leHRNb2RlO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hCdXNoVmlzaWJpbGl0eVN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hCdXNoVmlzaWJpbGl0eVN0YXRlKCkge1xyXG4gICAgICAgIGxldCBtb2RlID0gdGhpcy5fYnVzaFZpc2liaWxpdHlNb2RlIHx8IFwibm9ybWFsXCI7XHJcbiAgICAgICAgbGV0IGJvZHlPcGFjaXR5ID0gbW9kZSA9PSBcImhpZGRlblwiID8gMCA6IChtb2RlID09IFwic2VsZkJ1c2hcIiA/IDEyMCA6IDI1NSk7XHJcbiAgICAgICAgbGV0IGJhcnJlbE9wYWNpdHkgPSBtb2RlID09IFwiaGlkZGVuXCIgPyAwIDogKG1vZGUgPT0gXCJzZWxmQnVzaFwiID8gMTIwIDogMjU1KTtcclxuICAgICAgICBsZXQgaHVkVmlzaWJsZSA9IG1vZGUgIT0gXCJoaWRkZW5cIjtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IGJvZHlPcGFjaXR5O1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX2x5QmFycmVsICYmIGNjLmlzVmFsaWQodGhpcy5fZmlyZS5fbHlCYXJyZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLm9wYWNpdHkgPSBiYXJyZWxPcGFjaXR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl9saWZlYmFyICYmIGNjLmlzVmFsaWQodGhpcy5fZmlyZS5fbGlmZWJhcikpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5hY3RpdmUgPSBodWRWaXNpYmxlICYmIHRoaXMuX2luR2FtZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5vcGFjaXR5ID0gbW9kZSA9PSBcInNlbGZCdXNoXCIgPyAxNjggOiAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93U2FjcmlmaWNlVGlwKHRleHQpIHtcclxuICAgICAgICBsZXQgY2hhbm5lbCA9IFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpO1xyXG4gICAgICAgIGlmIChjaGFubmVsICYmIGNoYW5uZWwuc2hvd1RvYXN0KSB7XHJcbiAgICAgICAgICAgIGNoYW5uZWwuc2hvd1RvYXN0KHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYy5sb2codGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5U2FjcmlmaWNlRmVlZGJhY2soKSB7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XHJcbiAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xyXG5cclxuICAgICAgICBsZXQgd2F2ZSA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZVdhdmVcIik7XHJcbiAgICAgICAgd2F2ZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgd2F2ZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB3YXZlLnpJbmRleCA9IDI4NjtcclxuICAgICAgICB3YXZlLm9wYWNpdHkgPSAyMTA7XHJcbiAgICAgICAgd2F2ZS5zY2FsZSA9IDAuNzI7XHJcbiAgICAgICAgbGV0IHdhdmVHcmFwaGljcyA9IHdhdmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICB3YXZlR3JhcGhpY3MubGluZVdpZHRoID0gNztcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDg4LCA4MiwgMjM1KTtcclxuICAgICAgICB3YXZlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE2KTtcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI2LCAyLjMpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjI2KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZ2xvdy56SW5kZXggPSAyODU7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDcyLCA2OCwgNzApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjApO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ2xvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMSwgMTkwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjIyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xOCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuNzgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCl7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcclxuICAgICAgICAgICAgLy/lpJrkurrmqKHlvI/vvJrmnKrmnInluKfovpPlhaXliY3vvIzlrozlhajkuI3lpITnkIbku7vkvZXpgLvovpFcclxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9mcmFtZUlucHV0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDsgLy8g5LuN6ZyA57Sv6K6h5Ya35Y206YG/5YWN6aaW5bin5bCx6IO96L+e5bCEXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcC5fcGF1c2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZyZWVCdWxsZXRSZWNvdmVyKGR0KTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2hhcmdlQ2Fubm9uKGR0KTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMb3dIcFZpc3VhbChkdCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v546p5a625ZKM5oqA6IO9aWNvbiznorDmkp7mo4DmtYtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXllclNraWxsSWNvbkNvbGxpc2lvblRlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hQb3NpdGlvbihkdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQmFycmVsRGlyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hBbmdsZShkdCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRGlzcGxheUJhcnJlbEFuZ2xlKGR0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuc3luY0F0dGFjaGVkQ292ZXJUZXN0Q292ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5zeW5jQXR0YWNoZWRDb3ZlclRlc3RDb3Zlcih0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5yZWZyZXNoQ292ZXJUZXN0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCAhdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXAucmVmcmVzaENvdmVyVGVzdEJ1dHRvbih0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIOaKgOiDvTIo6LaF57qn5a2Q5by5KVxyXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lID0gdGhpcy5fc2tpbGwyVGltZSA8IDAgPyAwIDogdGhpcy5fc2tpbGwyVGltZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3BTa2lsbDIuYWN0aXZlID0gdGhpcy5fc2tpbGwyVGltZSA+IDA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyDmioDog70zKOaXoOaVjOmYsuW+oSlcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSA9IHRoaXMuX3NraWxsM1RpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsM1RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwzLmFjdGl2ZSA9IHRoaXMuX3NraWxsM1RpbWUgPiAwO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8v5pi+56S66ZOg55SyXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwQXJtb3VyLmFjdGl2ZSA9IHRoaXMuX3NraWxsM1RpbWUgPiAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWYgPSB0aGlzLl9za2lsbDNUaW1lID4gMCA/IDEwMDAwMDAwIDogMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB0aGlzLl9tYXAuanVkZ2V6SW5kZXgodGhpcy5ub2RlLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX3ZpZXdNb2RlKXtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3ModGhpcy5fZGlyLC0wLjUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IHRoaXMuX2RpcjtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdGluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZEVuZXJneVVwZ3JhZGVDaG9pY2VzKCkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgaHBBZGQgPSBjb25maWcuTGV2ZWxIcEFkZCA9PSBudWxsID8gTWF0aC5tYXgoMjUsIE1hdGgucm91bmQodGhpcy5fbWF4SHAgKiAwLjIyKSkgOiBjb25maWcuTGV2ZWxIcEFkZDtcclxuICAgICAgICBsZXQgYXRrQWRkID0gY29uZmlnLkxldmVsRGFtYWdlQWRkID09IG51bGxcclxuICAgICAgICAgICAgPyAoY29uZmlnLkxldmVsQXRrQWRkID09IG51bGwgPyBNYXRoLm1heCg4LCBNYXRoLnJvdW5kKHRoaXMuX2F0ayAqIDAuMTgpKSA6IGNvbmZpZy5MZXZlbEF0a0FkZClcclxuICAgICAgICAgICAgOiBjb25maWcuTGV2ZWxEYW1hZ2VBZGQ7XHJcbiAgICAgICAgbGV0IHNwZWVkQWRkID0gY29uZmlnLkxldmVsU3BlZWRBZGQgPT0gbnVsbCA/IDE4IDogY29uZmlnLkxldmVsU3BlZWRBZGQ7XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImhwXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLoo4XnlLLlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi55Sf5ZG95LiK6ZmQ5o+Q5Y2H5bm256uL5Yi75Zue5ruhXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIkhQXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgaHBBZGQsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGhwQWRkLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDEyMCwgMjU1LCAxNzAsIDI1NSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImF0a1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi54Gr5Yqb5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuaUu+WHu+WKm+aPkOWNhywg6L6T5Ye65pu06auYXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIkFUS1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIGF0a0FkZCxcclxuICAgICAgICAgICAgICAgIGFtb3VudDogYXRrQWRkLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDI1NSwgMTg1LCA5MCwgMjU1KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwic3BlZWRcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaOqOi/m+W8uuWMllwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnp7vliqjpgJ/luqbmj5DljYcsIOi1sOS9jeabtOeBtea0u1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJTUERcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBzcGVlZEFkZCArIFwiJVwiLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBzcGVlZEFkZCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMTAsIDIxMCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVzdFVwZ3JhZGVDaG9pY2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWlsZEVuZXJneVVwZ3JhZGVDaG9pY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlcygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJib3VuY2VcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWPjeW8ueWtkOW8uVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnorDlopnlkI7oh6rliqjlj43lvLkx5qyhXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIuWPjVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIngxXCIsXHJcbiAgICAgICAgICAgICAgICBib3VuY2VDb3VudDogMSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcig5MCwgMTgwLCAyNTUsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBlZmZlY3RDb2xvcjogY2MuY29sb3IoOTAsIDE4MCwgMjU1LCAyMTApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJwZW5ldHJhdGVcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuepv+mAj+WtkOW8uVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLov57nu63nqb/pgI8z5Liq55uu5qCH5ZCO5raI5aSxXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIuepv1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIngzXCIsXHJcbiAgICAgICAgICAgICAgICBwZW5ldHJhdGVDb3VudDogMyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigyNTUsIDkyLCA5MiwgMjU1KSxcclxuICAgICAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjYy5jb2xvcigyNTUsIDkyLCA5MiwgMjEwKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiaGVhdnlcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIumHjeeCruWtkOW8uVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLkvKTlrrPmj5DljYc2MCUsIOWtkOW8ueabtOWkp1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCLph41cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrNjAlXCIsXHJcbiAgICAgICAgICAgICAgICBkYW1hZ2VSYXRpbzogMS42LFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDEuMzUsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCAyMTAsIDkwLCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDI1NSwgMjEwLCA5MCwgMjEwKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIWNob2ljZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hvaWNlLmlkID09IFwiaHBcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhIcCArPSBjaG9pY2UuYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX21heEhwO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjaG9pY2UuaWQgPT0gXCJhdGtcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9hdGsgKz0gY2hvaWNlLmFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2hvaWNlLmlkID09IFwic3BlZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlU3BlZWRTY2FsZSArPSBjaG9pY2UuYW1vdW50IC8gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2hvd1VwZ3JhZGVGbG9hdChjaG9pY2UpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseVRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZShjaG9pY2UpIHtcclxuICAgICAgICBpZiAoIWNob2ljZSB8fCAhY2hvaWNlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uVHlwZSA9IGNob2ljZS5pZDtcclxuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgIGlkOiBjaG9pY2UuaWQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBjaG9pY2UudGl0bGUsXHJcbiAgICAgICAgICAgIHNob3J0TGFiZWw6IGNob2ljZS5zaG9ydExhYmVsLFxyXG4gICAgICAgICAgICB2YWx1ZVRleHQ6IGNob2ljZS52YWx1ZVRleHQsXHJcbiAgICAgICAgICAgIGJvdW5jZUNvdW50OiBjaG9pY2UuYm91bmNlQ291bnQgfHwgMCxcclxuICAgICAgICAgICAgcGVuZXRyYXRlQ291bnQ6IGNob2ljZS5wZW5ldHJhdGVDb3VudCB8fCAwLFxyXG4gICAgICAgICAgICBkYW1hZ2VSYXRpbzogY2hvaWNlLmRhbWFnZVJhdGlvIHx8IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiBjaG9pY2Uuc2NhbGUgfHwgMSxcclxuICAgICAgICAgICAgY29sb3I6IGNob2ljZS5jb2xvcixcclxuICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNob2ljZS5lZmZlY3RDb2xvciB8fCBjaG9pY2UuY29sb3IsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2hvd0J1bGxldE11dGF0aW9uTWVkYWwodGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgZGF0YS5jb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5jb2xvcjtcclxuICAgICAgICBkYXRhLmVmZmVjdENvbG9yID0gdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93VXBncmFkZUZsb2F0KGNob2ljZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlLnBhcmVudCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZmxvYXROb2RlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUZsb2F0XCIpO1xyXG4gICAgICAgIGZsb2F0Tm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGZsb2F0Tm9kZS5zZXRQb3NpdGlvbihjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxMTAsIDApKTtcclxuICAgICAgICBmbG9hdE5vZGUuekluZGV4ID0gNjUwMDtcclxuICAgICAgICBmbG9hdE5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZmxvYXROb2RlLnNjYWxlID0gMC44MjtcclxuXHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUJhZGdlXCIpO1xyXG4gICAgICAgIGJhZGdlLnBhcmVudCA9IGZsb2F0Tm9kZTtcclxuICAgICAgICBiYWRnZS5zZXRQb3NpdGlvbigtNDQsIDQpO1xyXG4gICAgICAgIGxldCBiYWRnZUdyYXBoaWNzID0gYmFkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyNCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI0KTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgYmFkZ2VMYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQmFkZ2VMYWJlbFwiKTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg1NCwgMzIpO1xyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsID0gYmFkZ2VMYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBiYWRnZUxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuZm9udFNpemUgPSBjaG9pY2Uuc2hvcnRMYWJlbC5sZW5ndGggPiAyID8gMTUgOiAxODtcclxuICAgICAgICBiYWRnZUxhYmVsLmxpbmVIZWlnaHQgPSAyMDtcclxuICAgICAgICBiYWRnZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVmFsdWVcIik7XHJcbiAgICAgICAgdmFsdWVOb2RlLnBhcmVudCA9IGZsb2F0Tm9kZTtcclxuICAgICAgICB2YWx1ZU5vZGUuc2V0UG9zaXRpb24oMjIsIDgpO1xyXG4gICAgICAgIHZhbHVlTm9kZS5jb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICB2YWx1ZU5vZGUuc2V0Q29udGVudFNpemUoMTcwLCAzOCk7XHJcbiAgICAgICAgbGV0IHZhbHVlTGFiZWwgPSB2YWx1ZU5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB2YWx1ZUxhYmVsLnN0cmluZyA9IGNob2ljZS52YWx1ZVRleHQ7XHJcbiAgICAgICAgdmFsdWVMYWJlbC5mb250U2l6ZSA9IDM0O1xyXG4gICAgICAgIHZhbHVlTGFiZWwubGluZUhlaWdodCA9IDM4O1xyXG4gICAgICAgIHZhbHVlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ7XHJcbiAgICAgICAgdmFsdWVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZU5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVGl0bGVcIik7XHJcbiAgICAgICAgdGl0bGVOb2RlLnBhcmVudCA9IGZsb2F0Tm9kZTtcclxuICAgICAgICB0aXRsZU5vZGUuc2V0UG9zaXRpb24oMTYsIC0yNCk7XHJcbiAgICAgICAgdGl0bGVOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcclxuICAgICAgICB0aXRsZU5vZGUuc2V0Q29udGVudFNpemUoMjIwLCAyOCk7XHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWwgPSB0aXRsZU5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IGNob2ljZS50aXRsZTtcclxuICAgICAgICB0aXRsZUxhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcclxuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgZmxvYXROb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDQpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDE4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjU1LCAwLCA3MiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuNTUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVcGdyYWRlVG9hc3QoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIXRoaXMubm9kZSB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b2FzdCA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVUb2FzdFwiKTtcclxuICAgICAgICB0b2FzdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgdG9hc3Quc2V0UG9zaXRpb24oMCwgdGhpcy5fcmFkaXVzICsgNzYpO1xyXG4gICAgICAgIHRvYXN0LnpJbmRleCA9IDM2MDtcclxuICAgICAgICB0b2FzdC5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0b2FzdC5zY2FsZSA9IDAuODg7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IHRvYXN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmcuZmlsbENvbG9yID0gY2MuY29sb3IoMjAsIDI0LCAzNCwgMjI4KTtcclxuICAgICAgICBiZy5yb3VuZFJlY3QoLTExMCwgLTIwLCAyMjAsIDQwLCAxNCk7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG4gICAgICAgIGJnLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgYmcuc3Ryb2tlQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgYmcucm91bmRSZWN0KC0xMTAsIC0yMCwgMjIwLCA0MCwgMTQpO1xyXG4gICAgICAgIGJnLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZVRvYXN0TGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHRvYXN0O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgyMDQsIDMwKTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IGNob2ljZS50aXRsZSArIFwiIFwiICsgY2hvaWNlLnZhbHVlVGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDE4O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyMjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgdG9hc3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjcpLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yMiwgMCwgMTgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93T2lsUGlja3VwRmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfb2lsUGlja3VwUmVhZHlcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJhZGdlLnNldFBvc2l0aW9uKDAsIHRoaXMuX3JhZGl1cyArIDQ4KTtcclxuICAgICAgICBiYWRnZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBiYWRnZS5zY2FsZSA9IDAuNztcclxuICAgICAgICBiYWRnZS56SW5kZXggPSAzMjA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGJhZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNzgsIDUyLCAyNiwgMjM1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTY4LCAtMTgsIDEzNiwgMzYsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjA1LCAxMjIsIDIzNSk7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC02OCwgLTE4LCAxMzYsIDM2LCAxMik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9vaWxQaWNrdXBSZWFkeUxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTI0LCAyOCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyMzIsIDE3MiwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIueEpuayueW8ueWwsee7qlwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBiYWRnZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjAyKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNiksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMiwgMCwgMTYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93QmxhY2tIb2xlUGlja3VwRmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfYmxhY2tIb2xlUGlja3VwUmVhZHlcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJhZGdlLnNldFBvc2l0aW9uKDAsIHRoaXMuX3JhZGl1cyArIDQ4KTtcclxuICAgICAgICBiYWRnZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBiYWRnZS5zY2FsZSA9IDAuNztcclxuICAgICAgICBiYWRnZS56SW5kZXggPSAzMjA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGJhZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNDIsIDI0LCA4OCwgMjM1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTc0LCAtMTgsIDE0OCwgMzYsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDE5OCwgMTM4LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC03NCwgLTE4LCAxNDgsIDM2LCAxMik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9ibGFja0hvbGVQaWNrdXBSZWFkeUxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoMTM2LCAyOCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjM0LCAyMTQsIDI1NSwgMjU1KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIum7kea0nuW8ueWwsee7qlwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI0O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBiYWRnZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjAyKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNiksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMiwgMCwgMTYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKGNob2ljZSkge1xyXG4gICAgICAgIGxldCB3YXZlID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZVdhdmVcIik7XHJcbiAgICAgICAgd2F2ZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgd2F2ZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB3YXZlLnpJbmRleCA9IDI4MDtcclxuICAgICAgICB3YXZlLm9wYWNpdHkgPSAyMjA7XHJcbiAgICAgICAgd2F2ZS5zY2FsZSA9IDAuNTU7XHJcbiAgICAgICAgbGV0IHdhdmVHcmFwaGljcyA9IHdhdmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICB3YXZlR3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxOCk7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIHdhdmUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4zLCAzLjIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjMpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZ2xvdy56SW5kZXggPSAyNzU7XHJcbiAgICAgICAgZ2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBnbG93LnNjYWxlID0gMC43NTtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihjaG9pY2UuY29sb3IuciwgY2hvaWNlLmNvbG9yLmcsIGNob2ljZS5jb2xvci5iLCA5MCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAyNik7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBnbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xMiwgMTgwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4yOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTgpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjE4LCAxLjgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKDkzMDEpO1xyXG4gICAgICAgIGxldCBwdW5jaCA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMS4wOCksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLCAxKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcHVuY2guc2V0VGFnKDkzMDEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24ocHVuY2gpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dCdWxsZXRNdXRhdGlvbk1lZGFsKGNob2ljZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlLnBhcmVudCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUucGFyZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWVkYWwgPSBuZXcgY2MuTm9kZShcIl9idWxsZXRNdXRhdGlvbk1lZGFsXCIpO1xyXG4gICAgICAgIG1lZGFsLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgbWVkYWwuc2V0UG9zaXRpb24oY2MudjModGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgMTEyLCAwKSk7XHJcbiAgICAgICAgbWVkYWwuekluZGV4ID0gNjYwMDtcclxuICAgICAgICBtZWRhbC5vcGFjaXR5ID0gMDtcclxuICAgICAgICBtZWRhbC5zY2FsZSA9IDAuODg7XHJcblxyXG4gICAgICAgIGxldCBiYWRnZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsQmFkZ2VcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gbWVkYWw7XHJcbiAgICAgICAgbGV0IGJhZGdlR3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbENvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI4KTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsQmFkZ2VMYWJlbFwiKTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5wYXJlbnQgPSBiYWRnZTtcclxuICAgICAgICBiYWRnZUxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg1MiwgMzIpO1xyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsID0gYmFkZ2VMYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBiYWRnZUxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICBiYWRnZUxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBiYWRnZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZU5vZGUgPSBuZXcgY2MuTm9kZShcIl9tZWRhbFRpdGxlXCIpO1xyXG4gICAgICAgIHRpdGxlTm9kZS5wYXJlbnQgPSBtZWRhbDtcclxuICAgICAgICB0aXRsZU5vZGUuc2V0UG9zaXRpb24oMCwgLTQ4KTtcclxuICAgICAgICB0aXRsZU5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMzUpO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRDb250ZW50U2l6ZSgyMjAsIDMyKTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnRpdGxlO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICB0aXRsZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgdGl0bGVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIG1lZGFsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDE2KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMS44OCksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjM1KSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjM1LCAwLCAzNClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hCdWxsZXRNdXRhdGlvbkVmZmVjdCgpIHtcclxuICAgICAgICB0aGlzLl9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfYnVsbGV0TXV0YXRpb25NdXp6bGVFZmZlY3RcIik7XHJcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IGJhcnJlbE5vZGU7XHJcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oLTIpKSk7XHJcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDk2O1xyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IGVmZmVjdDtcclxuXHJcbiAgICAgICAgbGV0IG91dGVyID0gbmV3IGNjLk5vZGUoXCJfbXV6emxlT3V0ZXJcIik7XHJcbiAgICAgICAgb3V0ZXIucGFyZW50ID0gZWZmZWN0O1xyXG4gICAgICAgIGxldCBvdXRlckdyYXBoaWNzID0gb3V0ZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvci5yLCB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3IuZywgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yLmIsIDkwKTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNik7XHJcbiAgICAgICAgb3V0ZXJHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbm5lciA9IG5ldyBjYy5Ob2RlKFwiX211enpsZUlubmVyXCIpO1xyXG4gICAgICAgIGlubmVyLnBhcmVudCA9IGVmZmVjdDtcclxuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsQ29sb3IgPSB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3I7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgOCk7XHJcbiAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjIsIDEuMjIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuMjIsIDIyMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMjIsIDAuOSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4yMiwgMTUwKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNb3ZlRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3ZlRWZmZWN0SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlRWZmZWN0SWQgPSBNdXNpY01hbmFnZXIucGxheUxvb3BFZmZlY3QoXCJ0YW5rTW92ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3RvcE1vdmVFZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmVFZmZlY3RJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5zdG9wRWZmZWN0KHRoaXMuX21vdmVFZmZlY3RJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOeCrueuoeWPqui3n+maj+WPs+S+p+WPkeWwhOaRh+adhuaWueWQkVxyXG4gICAgX3JlZnJlc2hCYXJyZWxEaXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob290SW5wdXREaXIgJiYgdGhpcy5fc2hvb3RJbnB1dERpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fc2hvb3RJbnB1dERpcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldERpc3BsYXlCYXJyZWxEaXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiAhdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUgJiYgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyICYmIHRoaXMuX2xvY2FsUHJldmlld0JhcnJlbERpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsUHJldmlld0JhcnJlbERpcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhcnJlbERpcjtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaERpc3BsYXlCYXJyZWxBbmdsZShkdCA9IDEgLyA2MCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8IHRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc3BsYXlEaXIgPSB0aGlzLl9nZXREaXNwbGF5QmFycmVsRGlyKCk7XHJcbiAgICAgICAgaWYgKCFkaXNwbGF5RGlyIHx8IGRpc3BsYXlEaXIubWFnU3FyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZnJvbUFuZ2xlID0gdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGU7XHJcbiAgICAgICAgbGV0IHRvQW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKGRpc3BsYXlEaXIpO1xyXG4gICAgICAgIGxldCBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgaWYgKGRpc0FuZ2xlID4gMTgwKSB7XHJcbiAgICAgICAgICAgIGZyb21BbmdsZSA9IGZyb21BbmdsZSArIDM2MDtcclxuICAgICAgICAgICAgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkaXNBbmdsZSA8IC0xODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlIC0gMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWF4VHVybkFuZ2xlID0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkFuZ3VsYXJTcGVlZFwiLCAxMCwgZHQpICogMS42O1xyXG4gICAgICAgIGlmIChtYXhUdXJuQW5nbGUgPD0gMCB8fCBNYXRoLmFicyhkaXNBbmdsZSkgPD0gbWF4VHVybkFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmFuZ2xlID0gdG9BbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSArIChkaXNBbmdsZSA+IDAgPyBtYXhUdXJuQW5nbGUgOiAtbWF4VHVybkFuZ2xlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSBVdGlscy5jb3JyZWN0aW9uQW5nbGUodGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWPs+S+p+aMiemSruaKrOi1t+aXtuebtOaOpeWPkeWwhOS4gOWPkSwg5LiN6LWw5oyJ5L2P5oyB57ut5Y+R5bCE6YC76L6RXHJcbiAgICBmaXJlT25jZSgpIHtcclxuICAgICAgICBsZXQgdHlwZSA9ICh0aGlzLl92aWV3TW9kZSB8fCB0aGlzLl9za2lsbDJUaW1lID4gMCkgPyB0aGlzLl9jb25maWcuQlR5cGUyIDogdGhpcy5fY29uZmlnLkJUeXBlMTtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fdmlld01vZGUgPyB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICogMC44IDp0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzO1xyXG4gICAgICAgIGxldCBtdXRhdGlvbkRhdGEgPSB0aGlzLl92aWV3TW9kZSA/IG51bGwgOiB0aGlzLl9nZXRDdXJyZW50QnVsbGV0TXV0YXRpb25EYXRhKCk7XHJcbiAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KHR5cGUsdGhpcy5ub2RlLnBvc2l0aW9uLHRoaXMuX2JhcnJlbERpcix0aGlzLl9maXJlLl9seUJhcnJlbC5oZWlnaHQrMjAsYXR0YWNrUmFkaXVzLHRoaXMuX2F0ayx0aGlzLl9jYW1wLHRoaXMubm9kZS5wYXJlbnQsdGhpcy5fbWFwLDgsbXV0YXRpb25EYXRhKTtcclxuICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5pc1Nob290RWZmZWN0VGVzdE1vZGUgJiYgdGhpcy5fbWFwLmlzU2hvb3RFZmZlY3RUZXN0TW9kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXlTaG9vdEZlZWRiYWNrKHR5cGUsIG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmICh0aGlzLl92aWV3TW9kZSA9PSBmYWxzZSAmJiB0aGlzLl9tYXAuZW5lbXlDb3VudCgpID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZmlyZUJ5TXVsdGlwbGF5ZXJDb21tYW5kKGZpcmVEYXRhKSB7XHJcbiAgICAgICAgaWYgKCFmaXJlRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHlwZSA9IGZpcmVEYXRhLnR5cGUgfHwgdGhpcy5nZXRNdWx0aXBsYXllckZpcmVUeXBlKCk7XHJcbiAgICAgICAgbGV0IGF0dGFja1JhZGl1cyA9IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXM7XHJcbiAgICAgICAgbGV0IG11dGF0aW9uRGF0YSA9IHRoaXMuX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKTtcclxuICAgICAgICBsZXQgbmV0d29ya01ldGEgPSB7XHJcbiAgICAgICAgICAgIGJ1bGxldElkOiBmaXJlRGF0YS5pZCxcclxuICAgICAgICAgICAgb3duZXJQbGF5ZXJJZDogdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJJZCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeChcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIsXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCArIDIwLFxyXG4gICAgICAgICAgICBhdHRhY2tSYWRpdXMsXHJcbiAgICAgICAgICAgIHRoaXMuX2F0ayxcclxuICAgICAgICAgICAgdGhpcy5fY2FtcCxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCxcclxuICAgICAgICAgICAgdGhpcy5fbWFwLFxyXG4gICAgICAgICAgICA4LFxyXG4gICAgICAgICAgICBtdXRhdGlvbkRhdGEsXHJcbiAgICAgICAgICAgIG5ldHdvcmtNZXRhXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5U2hvb3RGZWVkYmFjayh0eXBlLCBtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYW5BZmZvcmRNdWx0aXBsYXllckZpcmUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA8IFBMQVlFUl9TSE9PVF9JTlRFUlZBTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIXRoaXMuX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheVNob290RmVlZGJhY2soYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheUJhcnJlbFJlY29pbCgpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlNdXp6bGVGbGFzaChidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcclxuICAgICAgICB0aGlzLl9wbGF5U2hvb3RTaGFrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5QmFycmVsUmVjb2lsKCkge1xyXG4gICAgICAgIGxldCByZWNvaWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8ICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX2x5QmFycmVsKTtcclxuICAgICAgICBpZiAoIXJlY29pbE5vZGUgfHwgIWNjLmlzVmFsaWQocmVjb2lsTm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHJlY29pbE5vZGUucGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50Tm9kZSB8fCAhY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFzZVBvcyA9IHJlY29pbE5vZGVbXCJfc2hvb3RCYXNlUG9zXCJdO1xyXG4gICAgICAgIGlmICghYmFzZVBvcykge1xyXG4gICAgICAgICAgICBiYXNlUG9zID0gY2MudjMocmVjb2lsTm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHJlY29pbE5vZGVbXCJfc2hvb3RCYXNlUG9zXCJdID0gY2MudjMoYmFzZVBvcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFzZVdvcmxkUG9zID0gcGFyZW50Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYmFzZVBvcyk7XHJcbiAgICAgICAgbGV0IHJlY29pbERpciA9IHRoaXMuX2JhcnJlbERpciAmJiB0aGlzLl9iYXJyZWxEaXIubWFnU3FyKCkgPiAwID8gdGhpcy5fYmFycmVsRGlyLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgbGV0IHJlY29pbFdvcmxkUG9zID0gY2MudjIoYmFzZVdvcmxkUG9zKS5zdWIocmVjb2lsRGlyLm11bChTSE9PVF9SRUNPSUxfRElTVEFOQ0UpKTtcclxuICAgICAgICBsZXQgcmVjb2lsTG9jYWxQb3MgPSBwYXJlbnROb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHJlY29pbFdvcmxkUG9zKTtcclxuXHJcbiAgICAgICAgcmVjb2lsTm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAwNCk7XHJcbiAgICAgICAgcmVjb2lsTm9kZS5zZXRQb3NpdGlvbihiYXNlUG9zKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbyhTSE9PVF9SRUNPSUxfT1VUX1RJTUUsIHJlY29pbExvY2FsUG9zLngsIHJlY29pbExvY2FsUG9zLnkpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FLCBiYXNlUG9zLngsIGJhc2VQb3MueSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwNCk7XHJcbiAgICAgICAgcmVjb2lsTm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheU11enpsZUZsYXNoKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGlmICghYmFycmVsTm9kZSB8fCAhY2MuaXNWYWxpZChiYXJyZWxOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWZmZWN0Q29sb3IgPSB0aGlzLl9nZXRTaG9vdEVmZmVjdENvbG9yKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgbGV0IGZsYXNoID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVGbGFzaFwiKTtcclxuICAgICAgICBmbGFzaC5wYXJlbnQgPSBiYXJyZWxOb2RlO1xyXG4gICAgICAgIGZsYXNoLnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oNikpKTtcclxuICAgICAgICBmbGFzaC56SW5kZXggPSAxMTU7XHJcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZmxhc2guc2NhbGVYID0gMC4yODtcclxuICAgICAgICBmbGFzaC5zY2FsZVkgPSAwLjcyO1xyXG5cclxuICAgICAgICBsZXQgY29uZSA9IG5ldyBjYy5Ob2RlKFwiX2ZsYXNoQ29uZVwiKTtcclxuICAgICAgICBjb25lLnBhcmVudCA9IGZsYXNoO1xyXG4gICAgICAgIGxldCBjb25lR3JhcGhpY3MgPSBjb25lLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDIxMCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLm1vdmVUbygwLCAzNik7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygtMTcsIDgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oLTcsIC04KTtcclxuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKDAsIDQpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oNywgLTgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oMTcsIDgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5jbG9zZSgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfZmxhc2hDb3JlXCIpO1xyXG4gICAgICAgIGNvcmUucGFyZW50ID0gZmxhc2g7XHJcbiAgICAgICAgbGV0IGNvcmVHcmFwaGljcyA9IGNvcmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTAsIDIyMCwgMjM1KTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDExKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBmbGFzaC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDEuMSwgMS4xOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KFNIT09UX0ZMQVNIX0ZBREVfT1VUKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oU0hPT1RfRkxBU0hfRkFERV9PVVQsIDAuNTUsIDEuNjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5U2hvb3RHbG93KGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGxldCBlZmZlY3RDb2xvciA9IHRoaXMuX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtdXp6bGVHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVHbG93XCIpO1xyXG4gICAgICAgIG11enpsZUdsb3cucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBtdXp6bGVHbG93LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKDApKSk7XHJcbiAgICAgICAgbXV6emxlR2xvdy56SW5kZXggPSAyODU7XHJcbiAgICAgICAgbXV6emxlR2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBtdXp6bGVHbG93LnNjYWxlID0gMC41O1xyXG4gICAgICAgIGxldCBtdXp6bGVHbG93R3JhcGhpY3MgPSBtdXp6bGVHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbXV6emxlR2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDk1KTtcclxuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI4KTtcclxuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIG11enpsZUdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjAzLCAyMTApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjAzLCAxLjA1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjY1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbGV0IGJvZHlHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RCb2R5R2xvd1wiKTtcclxuICAgICAgICBib2R5R2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYm9keUdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgYm9keUdsb3cuekluZGV4ID0gMjYwO1xyXG4gICAgICAgIGJvZHlHbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJvZHlHbG93LnNjYWxlID0gMC43NTtcclxuICAgICAgICBsZXQgYm9keUdsb3dHcmFwaGljcyA9IGJvZHlHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihlZmZlY3RDb2xvci5yLCBlZmZlY3RDb2xvci5nLCBlZmZlY3RDb2xvci5iLCA3MCk7XHJcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjgpO1xyXG4gICAgICAgIGJvZHlHbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGJvZHlHbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4wNCwgMTUwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNCwgMS4wOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjM4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheVNob290U2hha2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTaG9vdEVmZmVjdENvbG9yKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGlmIChtdXRhdGlvbkRhdGEgJiYgbXV0YXRpb25EYXRhLmVmZmVjdENvbG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXRUeXBlID09IE9JTF9TSEVMTF9CVUxMRVRfVFlQRSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXRUeXBlID09IHRoaXMuX2NvbmZpZy5CVHlwZTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDEyMCwgMjI1LCAyNTUsIDIzMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcigyNTUsIDIwNSwgOTUsIDIzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUNoYXJnZUNhbm5vbihkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb29sZG93blByb2dyZXNzID0gMSAtIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAvIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNvb2xkb3duXCIsIHtwcm9ncmVzczogY29vbGRvd25Qcm9ncmVzc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIsIHt9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgKz0gZHQ7XHJcbiAgICAgICAgbGV0IG5lZWRUaW1lID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiVGltZVwiLCA1KTtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lIC8gbmVlZFRpbWU7XHJcbiAgICAgICAgaWYgKHByb2dyZXNzID4gMSkge1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IHByb2dyZXNzfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9PSBmYWxzZSAmJiB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID49IG5lZWRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0NoYXJnZUVmZmVjdCgpO1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZmlyZUNoYXJnZUNhbm5vbigpIHtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQXR0YWNrUmFkaXVzXCIsIHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAxLjQpO1xyXG4gICAgICAgIGxldCBhdGtSYXRpbyA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkF0a1JhdGlvXCIsIDMpO1xyXG4gICAgICAgIGxldCBzcGVlZCA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIlNwZWVkXCIsIDEyKTtcclxuICAgICAgICBsZXQgd2lwZUxlbiA9IHRoaXMuX2dldEJhcnJlbE11enpsZURpc3RhbmNlKDEyKTtcclxuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgoQ0hBUkdFX0NBTk5PTl9CVUxMRVRfVFlQRSwgdGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9iYXJyZWxEaXIsIHdpcGVMZW4sIGF0dGFja1JhZGl1cywgdGhpcy5fYXRrICogYXRrUmF0aW8sIHRoaXMuX2NhbXAsIHRoaXMubm9kZS5wYXJlbnQsIHRoaXMuX21hcCwgc3BlZWQpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlU2hvb3RcIik7XHJcbiAgICAgICAgdGhpcy5fc2hha2VTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkNvb2xkb3duXCIsIDgpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xyXG4gICAgfVxyXG5cclxuICAgIF9nYWluT2lsU2hlbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBNYXRoLm1pbihPSUxfU0hFTExfTUFYX0NPVU5ULCB0aGlzLl9vaWxTaGVsbENvdW50ICsgMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dPaWxQaWNrdXBGZWVkYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nYWluQmxhY2tIb2xlU2hlbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPSBNYXRoLm1pbihCTEFDS19IT0xFX1NIRUxMX01BWF9DT1VOVCwgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCArIDEpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICB0aGlzLl9zaG93QmxhY2tIb2xlUGlja3VwRmVlZGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBfZmlyZU9pbFNoZWxsKCkge1xyXG4gICAgICAgIGxldCB3aXBlTGVuID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlRGlzdGFuY2UoOCk7XHJcbiAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KE9JTF9TSEVMTF9CVUxMRVRfVFlQRSwgdGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9iYXJyZWxEaXIsIHdpcGVMZW4sIHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAxLjgsIDAsIHRoaXMuX2NhbXAsIHRoaXMubm9kZS5wYXJlbnQsIHRoaXMuX21hcCwgMTApO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBNYXRoLm1heCgwLCB0aGlzLl9vaWxTaGVsbENvdW50IC0gMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB7ZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDEzMCwgOTIsIDUyLCAyMjApfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0T2lsU2hlbGxQcmV2aWV3KCkge1xyXG4gICAgICAgIGlmICgodGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwICYmIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPD0gMCkgfHwgIXRoaXMuX21hcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRocm93U2tpbGxUeXBlID0gdGhpcy5fb2lsU2hlbGxDb3VudCA+IDAgPyBcIm9pbFwiIDogXCJibGFja0hvbGVcIjtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcgPSB0cnVlO1xyXG4gICAgICAgIGxldCBkZWZhdWx0RGlyID0gdGhpcy5fYmFycmVsRGlyICYmIHRoaXMuX2JhcnJlbERpci5tYWdTcXIoKSA+IDAgPyBjYy52Mih0aGlzLl9iYXJyZWxEaXIpLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1EaXIgPSBkZWZhdWx0RGlyO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPSAxO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCkge1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGhyb3dTa2lsbFR5cGUgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmhpZGVPaWxTaGVsbFByZXZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmhpZGVPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbW1pdE9pbFNoZWxsVGhyb3coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCB8fCB0aGlzLl9nZXRPaWxTaGVsbFRocm93VGFyZ2V0KCk7XHJcbiAgICAgICAgbGV0IGFjdGl2ZVRocm93U2tpbGxUeXBlID0gdGhpcy5fYWN0aXZlVGhyb3dTa2lsbFR5cGUgfHwgKHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPiAwICYmIHRoaXMuX29pbFNoZWxsQ291bnQgPD0gMCA/IFwiYmxhY2tIb2xlXCIgOiBcIm9pbFwiKTtcclxuICAgICAgICBsZXQgYWltRGlyID0gY2MudjIodGhpcy5fb2lsU2hlbGxBaW1EaXIgfHwgdGhpcy5fYmFycmVsRGlyIHx8IGNjLnYyKDEsIDApKTtcclxuICAgICAgICBpZiAoYWltRGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICBhaW1EaXIgPSBhaW1EaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGFpbURpciA9IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWltUmF0aW8gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID09IG51bGwgPyAxIDogdGhpcy5fb2lsU2hlbGxBaW1SYXRpbykpO1xyXG4gICAgICAgIHRoaXMuX2NhbmNlbE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiAhdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgbGV0IHRocm93RXZlbnROYW1lID0gYWN0aXZlVGhyb3dTa2lsbFR5cGUgPT0gXCJibGFja0hvbGVcIiA/IFwibXVsdGlwbGF5ZXItdGhyb3ctYmxhY2staG9sZVwiIDogXCJtdWx0aXBsYXllci10aHJvdy10YXJcIjtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQodGhyb3dFdmVudE5hbWUsIHtcclxuICAgICAgICAgICAgICAgIGRpclg6IE51bWJlcihhaW1EaXIueC50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgICAgIGRpclk6IE51bWJlcihhaW1EaXIueS50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgICAgIHJhdGlvOiBOdW1iZXIoYWltUmF0aW8udG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3RpdmVUaHJvd1NraWxsVHlwZSA9PSBcImJsYWNrSG9sZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rocm93QmxhY2tIb2xlU2hlbGxBdCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90aHJvd09pbFNoZWxsQXQodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldE9pbFNoZWxsVGhyb3dUYXJnZXQoKSB7XHJcbiAgICAgICAgbGV0IGF0dGFja1JhZGl1cyA9IHRoaXMuX2NvbmZpZyAmJiB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICE9IG51bGwgPyB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzIDogNDIwO1xyXG4gICAgICAgIGxldCBkaXIgPSB0aGlzLl9vaWxTaGVsbEFpbURpciAmJiB0aGlzLl9vaWxTaGVsbEFpbURpci5tYWdTcXIoKSA+IDAgPyBjYy52Mih0aGlzLl9vaWxTaGVsbEFpbURpcikubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcclxuICAgICAgICBsZXQgcmF0aW8gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID09IG51bGwgPyAxIDogdGhpcy5fb2lsU2hlbGxBaW1SYXRpbykpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLmFkZChkaXIubXVsKGF0dGFja1JhZGl1cyAqIHJhdGlvKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuY2xhbXBNYXBJbm5lclBvc2l0aW9uXHJcbiAgICAgICAgICAgID8gdGhpcy5fbWFwLmNsYW1wTWFwSW5uZXJQb3NpdGlvbih0YXJnZXQsIE9JTF9USFJPV19BUkVBX1JBRElVUyAqIDAuNTUpXHJcbiAgICAgICAgICAgIDogdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVPaWxTaGVsbEFpbShldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fb2lsU2hlbGxQcmV2aWV3aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDAuMDAwMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbURpciA9IGNjLnYyKGV2ZW50LmRpcikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudCAmJiBOdW1iZXIuaXNGaW5pdGUoZXZlbnQucmF0aW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBOdW1iZXIoZXZlbnQucmF0aW8pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaE9pbFNoZWxsUHJldmlldygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX29pbFNoZWxsUHJldmlld2luZyB8fCAhdGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxQcmV2aWV3VGFyZ2V0ID0gdGhpcy5fZ2V0T2lsU2hlbGxUaHJvd1RhcmdldCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAuc2hvd09pbFNoZWxsUHJldmlldyAmJiB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnNob3dPaWxTaGVsbFByZXZpZXcodGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQsIHtcclxuICAgICAgICAgICAgICAgIHJhZGl1czogT0lMX1RIUk9XX1BSRVZJRVdfQVJDX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgIGFyZWFSYWRpdXM6IE9JTF9USFJPV19BUkVBX1JBRElVUyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF90aHJvd0JsYWNrSG9sZVNoZWxsQXQodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheU9pbFNoZWxsVGhyb3cpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlPaWxTaGVsbFRocm93KHRoaXMubm9kZS5wb3NpdGlvbiwgdGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICBhcmVhUmFkaXVzOiBPSUxfVEhST1dfQVJFQV9SQURJVVMsXHJcbiAgICAgICAgICAgICAgICBhcmNIZWlnaHQ6IE9JTF9USFJPV19QUkVWSUVXX0FSQ19IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICBvbkxhbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zcGF3bkJsYWNrSG9sZVpvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduQmxhY2tIb2xlWm9uZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB7ZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDEzMCwgOTIsIDE4MCwgMjIwKX0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF90aHJvd09pbFNoZWxsQXQodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgdGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMuX29pbFNoZWxsQ291bnQgLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheU9pbFNoZWxsVGhyb3cpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlPaWxTaGVsbFRocm93KHRoaXMubm9kZS5wb3NpdGlvbiwgdGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICBhcmVhUmFkaXVzOiBPSUxfVEhST1dfQVJFQV9SQURJVVMsXHJcbiAgICAgICAgICAgICAgICBhcmNIZWlnaHQ6IE9JTF9USFJPV19QUkVWSUVXX0FSQ19IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICBvbkxhbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zcGF3bk9pbFNwaWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3bk9pbFNwaWxsKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZU9pbFNoZWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB7ZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDEzMCwgOTIsIDUyLCAyMjApfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtb2RlID0gXCJjaGFyZ2VcIjtcclxuICAgICAgICBpZiAodGhpcy5fb2lsU2hlbGxDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgbW9kZSA9IFwib2lsXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIG1vZGUgPSBcImJsYWNrSG9sZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIsIHttb2RlOiBtb2RlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldENoYXJnZUNvbmZpZyhrZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGxldCBmdWxsS2V5ID0gXCJDaGFyZ2VcIiArIGtleTtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWdbZnVsbEtleV0gOiBudWxsO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0Q2hhcmdlQ2Fubm9uKCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9oaWRlQ2hhcmdlRWZmZWN0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93Q2hhcmdlRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlTXV6emxlRWZmZWN0XCIpO1xyXG4gICAgICAgIGVmZmVjdC5wYXJlbnQgPSBiYXJyZWxOb2RlO1xyXG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLl9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKDQpKSk7XHJcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDEwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZWZmZWN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA0MCwgMjAsIDE4MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAxLjM1KSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAwLjkpXHJcbiAgICAgICAgKSkpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgPSBlZmZlY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVDaGFyZ2VFZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfc2hha2VTY3JlZW4oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5ub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXBOb2RlID0gdGhpcy5fbWFwLm5vZGU7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IG1hcE5vZGUucG9zaXRpb247XHJcbiAgICAgICAgbWFwTm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAwMSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgNCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCAtOCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAzKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDAsIC0zKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIG1hcE5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwMSk7XHJcbiAgICAgICAgbWFwTm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oZXh0cmFPZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XHJcbiAgICAgICAgbGV0IGFuY2hvclkgPSBiYXJyZWxOb2RlLmFuY2hvclkgPT0gbnVsbCA/IDAuNSA6IGJhcnJlbE5vZGUuYW5jaG9yWTtcclxuICAgICAgICByZXR1cm4gY2MudjIoMCwgYmFycmVsTm9kZS5oZWlnaHQgKiAoMSAtIGFuY2hvclkpICsgZXh0cmFPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRCYXJyZWxNdXp6bGVQb3NpdGlvbihleHRyYU9mZnNldCA9IDApIHtcclxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcclxuICAgICAgICBsZXQgbG9jYWxQb3MgPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKGV4dHJhT2Zmc2V0KTtcclxuICAgICAgICBsZXQgd29ybGRQb3MgPSBiYXJyZWxOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihsb2NhbFBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZShleHRyYU9mZnNldCA9IDApIHtcclxuICAgICAgICBsZXQgbXV6emxlUG9zID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlUG9zaXRpb24oZXh0cmFPZmZzZXQpO1xyXG4gICAgICAgIHJldHVybiBtdXp6bGVQb3Muc3ViKHRoaXMubm9kZS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RyeUZpcmVPbmNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA8IFBMQVlFUl9TSE9PVF9JTlRFUlZBTCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50IDw9IDAgJiYgdGhpcy5fY2FuTm90QWZmb3JkUGFpZEJ1bGxldCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dMb3dIcFNob290VGlwKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5maXJlT25jZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQtLTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY29uc3VtZUhwRm9yUGFpZEJ1bGxldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jYW5Ob3RBZmZvcmRQYWlkQnVsbGV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ocCA8PSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dMb3dIcFNob290VGlwKCkge1xyXG4gICAgICAgIGxldCBjaGFubmVsID0gU0RLTWFuYWdlci5nZXRDaGFubmVsKCk7XHJcbiAgICAgICAgaWYgKGNoYW5uZWwgJiYgY2hhbm5lbC5zaG93VG9hc3QpIHtcclxuICAgICAgICAgICAgY2hhbm5lbC5zaG93VG9hc3QoXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYy5sb2coXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY29uc3VtZUhwRm9yUGFpZEJ1bGxldCgpIHtcclxuICAgICAgICB0aGlzLl9ocCAtPSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBseU11bHRpcGxheWVyRmlyZVN0YXRlKGNvbW1hbmQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb21tYW5kLm1heEhwICE9IG51bGwgJiYgY29tbWFuZC5tYXhIcCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SHAgPSBjb21tYW5kLm1heEhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC5ocCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0SHAgPSBNYXRoLm1heCgwLCBjb21tYW5kLmhwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21heEhwID4gMCAmJiBuZXh0SHAgPiB0aGlzLl9tYXhIcCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faHAgPSBuZXh0SHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLmZyZWVCdWxsZXRDb3VudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKFBMQVlFUl9GUkVFX0JVTExFVF9NQVgsIGNvbW1hbmQuZnJlZUJ1bGxldENvdW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLnN0b3BGaXJlVGltZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IE1hdGgubWF4KDAsIGNvbW1hbmQuc3RvcEZpcmVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbW1hbmQuZnJlZUJ1bGxldFJlY292ZXJUaW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gTWF0aC5tYXgoMCwgY29tbWFuZC5mcmVlQnVsbGV0UmVjb3ZlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC5zaG90Q29vbGRvd25SZW1haW5pbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dENvb2xkb3duID0gTWF0aC5tYXgoMCwgY29tbWFuZC5zaG90Q29vbGRvd25SZW1haW5pbmcpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IE1hdGgubWF4KDAsIFBMQVlFUl9TSE9PVF9JTlRFUlZBTCAtIG5leHRDb29sZG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrblj5flh7vkuI3po5jkvKTlrrPmlbDlrZcsIOeUqOWMuuWIq+S6juaVjOS6uueahOiTneiJsumXquWFieihqOeOsFxyXG4gICAgYmVIaXQoZGFtYWdlKXtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XHJcbiAgICAgICAgaWYgKGRhbWFnZSA8IDApIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hwIC09IGRhbWFnZTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd1BsYXllckhpdEVmZmVjdCgpO1xyXG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5TXVsdGlwbGF5ZXJIaXQoZGFtYWdlLCBocCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVIaXQoZGFtYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRIcCA9IGhwO1xyXG4gICAgICAgIGlmIChuZXh0SHAgPT0gbnVsbCB8fCBuZXh0SHAgPCAwKSB7XHJcbiAgICAgICAgICAgIG5leHRIcCA9IHRoaXMuX2hwIC0gTWF0aC5tYXgoMCwgZGFtYWdlIHx8IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICBuZXh0SHAgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpZFRha2VEYW1hZ2UgPSBuZXh0SHAgPCB0aGlzLl9ocDtcclxuICAgICAgICB0aGlzLl9ocCA9IG5leHRIcDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG5cclxuICAgICAgICBpZiAoZGlkVGFrZURhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93UGxheWVySGl0RWZmZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY011bHRpcGxheWVySHAoaHAsIG1heEhwID0gbnVsbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXhIcCAhPSBudWxsICYmIG1heEhwID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhIcCA9IG1heEhwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRIcCA9IGhwO1xyXG4gICAgICAgIGlmIChuZXh0SHAgPCAwKSB7XHJcbiAgICAgICAgICAgIG5leHRIcCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXhIcCA+IDAgJiYgbmV4dEhwID4gdGhpcy5fbWF4SHApIHtcclxuICAgICAgICAgICAgbmV4dEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGlkVGFrZURhbWFnZSA9IG5leHRIcCA8IHRoaXMuX2hwO1xyXG4gICAgICAgIHRoaXMuX2hwID0gbmV4dEhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcblxyXG4gICAgICAgIGlmIChkaWRUYWtlRGFtYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ocCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzeW5jTXVsdGlwbGF5ZXJTdGF0ZShzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgIXN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcmV2SHAgPSB0aGlzLl9ocDtcclxuICAgICAgICBsZXQgcHJldk1heEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgbGV0IHByZXZBdGsgPSB0aGlzLl9hdGs7XHJcbiAgICAgICAgbGV0IHByZXZNb3ZlU3BlZWRTY2FsZSA9IHRoaXMuX21vdmVTcGVlZFNjYWxlO1xyXG4gICAgICAgIGxldCBwcmV2RW5lcmd5TGV2ZWwgPSB0aGlzLl9lbmVyZ3lMZXZlbDtcclxuICAgICAgICBpZiAoc3RhdGUubWF4SHAgIT0gbnVsbCAmJiBzdGF0ZS5tYXhIcCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SHAgPSBzdGF0ZS5tYXhIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmhwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRIcCA9IHN0YXRlLmhwO1xyXG4gICAgICAgICAgICBpZiAobmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEhwID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4SHAgPiAwICYmIG5leHRIcCA+IHRoaXMuX21heEhwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0SHAgPSB0aGlzLl9tYXhIcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IG5leHRIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmF0ayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0ayA9IHN0YXRlLmF0aztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLm1vdmVTcGVlZFNjYWxlICE9IG51bGwgJiYgc3RhdGUubW92ZVNwZWVkU2NhbGUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlID0gc3RhdGUubW92ZVNwZWVkU2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS50YXJBbW1vQ291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dFRhckFtbW9Db3VudCA9IE1hdGgubWF4KDAsIHN0YXRlLnRhckFtbW9Db3VudCk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0VGFyQW1tb0NvdW50ICE9IHRoaXMuX29pbFNoZWxsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBuZXh0VGFyQW1tb0NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5ibGFja0hvbGVBbW1vQ291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dEJsYWNrSG9sZUFtbW9Db3VudCA9IE1hdGgubWF4KDAsIHN0YXRlLmJsYWNrSG9sZUFtbW9Db3VudCk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0QmxhY2tIb2xlQW1tb0NvdW50ICE9IHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPSBuZXh0QmxhY2tIb2xlQW1tb0NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5mcmVlQnVsbGV0Q291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihQTEFZRVJfRlJFRV9CVUxMRVRfTUFYLCBzdGF0ZS5mcmVlQnVsbGV0Q291bnQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLnN0b3BGaXJlVGltZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IE1hdGgubWF4KDAsIHN0YXRlLnN0b3BGaXJlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5mcmVlQnVsbGV0UmVjb3ZlclRpbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSBNYXRoLm1heCgwLCBzdGF0ZS5mcmVlQnVsbGV0UmVjb3ZlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuc2hvdENvb2xkb3duUmVtYWluaW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRDb29sZG93biA9IE1hdGgubWF4KDAsIHN0YXRlLnNob3RDb29sZG93blJlbWFpbmluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gTWF0aC5tYXgoMCwgUExBWUVSX1NIT09UX0lOVEVSVkFMIC0gbmV4dENvb2xkb3duKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmVuZXJneUxldmVsICE9IG51bGwgJiYgc3RhdGUuZW5lcmd5TGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUxldmVsID0gc3RhdGUuZW5lcmd5TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5lbmVyZ3lFeHAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgPSBNYXRoLm1heCgwLCBzdGF0ZS5lbmVyZ3lFeHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuZW5lcmd5TmVlZEV4cCAhPSBudWxsICYmIHN0YXRlLmVuZXJneU5lZWRFeHAgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSBzdGF0ZS5lbmVyZ3lOZWVkRXhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckluQnVzaCA9ICEhc3RhdGUuaW5CdXNoO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVzaElkID0gc3RhdGUuYnVzaElkID09IG51bGwgPyBudWxsIDogc3RhdGUuYnVzaElkO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZW5lcmd5TGV2ZWwgPiBwcmV2RW5lcmd5TGV2ZWwpIHtcclxuICAgICAgICAgICAgbGV0IGNob2ljZSA9IHRoaXMuX2J1aWxkVXBncmFkZUNob2ljZUZyb21TdGF0ZURlbHRhKHByZXZNYXhIcCwgcHJldkF0aywgcHJldk1vdmVTcGVlZFNjYWxlKTtcclxuICAgICAgICAgICAgaWYgKGNob2ljZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1VwZ3JhZGVGbG9hdChjaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheVVwZ3JhZGVTZWxlY3RGZWVkYmFjayhjaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VXBncmFkZVRvYXN0KGNob2ljZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkaWRUYWtlRGFtYWdlID0gdGhpcy5faHAgPCBwcmV2SHA7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG5cclxuICAgICAgICBpZiAoZGlkVGFrZURhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93UGxheWVySGl0RWZmZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEJ1c2hWaXNpYmlsaXR5U3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfYnVpbGRVcGdyYWRlQ2hvaWNlRnJvbVN0YXRlRGVsdGEocHJldk1heEhwLCBwcmV2QXRrLCBwcmV2TW92ZVNwZWVkU2NhbGUpIHtcclxuICAgICAgICBsZXQgaHBEZWx0YSA9IHRoaXMuX21heEhwIC0gcHJldk1heEhwO1xyXG4gICAgICAgIGxldCBhdGtEZWx0YSA9IHRoaXMuX2F0ayAtIHByZXZBdGs7XHJcbiAgICAgICAgbGV0IHNwZWVkUmF0aW9EZWx0YSA9IHRoaXMuX21vdmVTcGVlZFNjYWxlIC0gcHJldk1vdmVTcGVlZFNjYWxlO1xyXG4gICAgICAgIGxldCBzcGVlZERlbHRhID0gTWF0aC5yb3VuZChzcGVlZFJhdGlvRGVsdGEgKiAxMDApO1xyXG5cclxuICAgICAgICBpZiAoaHBEZWx0YSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImhwXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLoo4XnlLLlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi55Sf5ZG95LiK6ZmQ5o+Q5Y2H5bm256uL5Yi75Zue5ruhXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIkhQXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgaHBEZWx0YSxcclxuICAgICAgICAgICAgICAgIGFtb3VudDogaHBEZWx0YSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMjAsIDI1NSwgMTcwLCAyNTUpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXRrRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJhdGtcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIueBq+WKm+W8uuWMllwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLmlLvlh7vlipvmj5DljYcsIOi+k+WHuuabtOmrmFwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJBVEtcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBhdGtEZWx0YSxcclxuICAgICAgICAgICAgICAgIGFtb3VudDogYXRrRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCAxODUsIDkwLCAyNTUpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3BlZWREZWx0YSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcInNwZWVkXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmjqjov5vlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi56e75Yqo6YCf5bqm5o+Q5Y2HLCDotbDkvY3mm7TngbXmtLtcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiU1BEXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgc3BlZWREZWx0YSArIFwiJVwiLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBzcGVlZERlbHRhLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDExMCwgMjEwLCAyNTUsIDI1NSksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93UGxheWVySGl0RWZmZWN0KCkge1xyXG4gICAgICAgIGxldCBlZmZlY3QgPSBuZXcgY2MuTm9kZShcIl9wbGF5ZXJIaXRFZmZlY3RcIik7XHJcbiAgICAgICAgZWZmZWN0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDMwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZWZmZWN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDgwLCAyMTAsIDI1NSwgMjMwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTYpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDcwLCAxNzAsIDI1NSwgNTUpO1xyXG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBlZmZlY3Qub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBlZmZlY3Quc2NhbGUgPSAwLjY1O1xyXG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjE4LCAxLjI1KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjE4LCA2MClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjEpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTG93SHBQbGF5ZXJGZWVkYmFjaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luR2FtZSB8fCAhdGhpcy5pc0xvd0hwKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRMb3dIcFNjcmVlbkVmZmVjdCgpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0TG93SHBIZWFydGJlYXRTb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydExvd0hwSGVhcnRiZWF0U291bmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID0gTXVzaWNNYW5hZ2VyLnBsYXlMb29wRWZmZWN0KFwiaGVhcnRiZWF0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdG9wTG93SHBIZWFydGJlYXRTb3VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5zdG9wRWZmZWN0KHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydExvd0hwU2NyZWVuRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWZmZWN0Um9vdCA9IG5ldyBjYy5Ob2RlKFwiX2xvd0hwU2NyZWVuRWZmZWN0XCIpO1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy5fbWFwICYmIHRoaXMuX21hcC5ub2RlICYmIHRoaXMuX21hcC5ub2RlLnBhcmVudCA/IHRoaXMuX21hcC5ub2RlLnBhcmVudCA6IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgZWZmZWN0Um9vdC5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIGVmZmVjdFJvb3Quc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgZWZmZWN0Um9vdC56SW5kZXggPSAxNjAwO1xyXG4gICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ID0gZWZmZWN0Um9vdDtcclxuXHJcbiAgICAgICAgbGV0IGJvcmRlck5vZGUgPSBuZXcgY2MuTm9kZShcIl9sb3dIcEJvcmRlclwiKTtcclxuICAgICAgICBib3JkZXJOb2RlLnBhcmVudCA9IGVmZmVjdFJvb3Q7XHJcbiAgICAgICAgYm9yZGVyTm9kZS5vcGFjaXR5ID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGNyZWF0ZUVkZ2UgPSBmdW5jdGlvbihuYW1lLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGxldCBlZGdlID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgICAgIGVkZ2UucGFyZW50ID0gYm9yZGVyTm9kZTtcclxuICAgICAgICAgICAgZWRnZS5zZXRQb3NpdGlvbih4LCB5KTtcclxuICAgICAgICAgICAgbGV0IGdyYXBoaWNzID0gZWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDYwLCA2MCwgMjU1KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MucmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVkZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3JlYXRlRWRnZShcIl90b3BFZGdlXCIsIDAsIDM1MSwgMTI4MCwgMTgpO1xyXG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfYm90dG9tRWRnZVwiLCAwLCAtMzUxLCAxMjgwLCAxOCk7XHJcbiAgICAgICAgY3JlYXRlRWRnZShcIl9sZWZ0RWRnZVwiLCAtNjMxLCAwLCAxOCwgNzIwKTtcclxuICAgICAgICBjcmVhdGVFZGdlKFwiX3JpZ2h0RWRnZVwiLCA2MzEsIDAsIDE4LCA3MjApO1xyXG5cclxuICAgICAgICBsZXQgaWRsZVRpbWUgPSBNYXRoLm1heCgwLCBMT1dfSFBfU0NSRUVOX0ZMQVNIX0xPT1AgLSBMT1dfSFBfU0NSRUVOX0ZMQVNIX0lOIC0gTE9XX0hQX1NDUkVFTl9GTEFTSF9PVVQpO1xyXG4gICAgICAgIGJvcmRlck5vZGUucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKExPV19IUF9TQ1JFRU5fRkxBU0hfSU4sIDIxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKExPV19IUF9TQ1JFRU5fRkxBU0hfT1VULCAwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoaWRsZVRpbWUpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95TG93SHBTY3JlZW5FZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ICYmIGNjLmlzVmFsaWQodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpIHtcclxuICAgICAgICB0aGlzLl9zdG9wTG93SHBIZWFydGJlYXRTb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lMb3dIcFNjcmVlbkVmZmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVGcmVlQnVsbGV0UmVjb3ZlcihkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0b3BGaXJlVGltZSA8IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0RFTEFZKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSArPSBkdDtcclxuICAgICAgICB3aGlsZSAodGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID49IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMXHJcbiAgICAgICAgICAgICYmIHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lIC09IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMO1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaEZyZWVCdWxsZXRCYXIoKSB7XHJcbiAgICAgICAgbGV0IGJ1bGxldEJhcnMgPSBbXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMSxcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5femlkYW5iYXIyLFxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl96aWRhbmJhcjMsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBsZXQgcmVjb3ZlclByb2dyZXNzID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA8IFBMQVlFUl9GUkVFX0JVTExFVF9NQVhcclxuICAgICAgICAgICAgJiYgdGhpcy5fc3RvcEZpcmVUaW1lID49IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0RFTEFZKSB7XHJcbiAgICAgICAgICAgIHJlY292ZXJQcm9ncmVzcyA9IHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSAvIFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMO1xyXG4gICAgICAgICAgICBpZiAocmVjb3ZlclByb2dyZXNzID4gMSkge1xyXG4gICAgICAgICAgICAgICAgcmVjb3ZlclByb2dyZXNzID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVsbGV0QmFycy5mb3JFYWNoKChiYXJOb2RlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJhck5vZGUgfHwgIWJhck5vZGUuJFByb2dyZXNzQmFyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuX2ZyZWVCdWxsZXRDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgYmFyTm9kZS4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09IHRoaXMuX2ZyZWVCdWxsZXRDb3VudCAmJiByZWNvdmVyUHJvZ3Jlc3MgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHJlY292ZXJQcm9ncmVzcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYmFyTm9kZS4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsITlh7tcclxuICAgIHNob290aW5nKGR0KXtcclxuICAgICAgICBsZXQganVkZ2VDRCA9IHRoaXMuX3NraWxsMlRpbWUgPiAwID8gdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lLzQgOiB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA+PSBqdWRnZUNEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZU9uY2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5omn6KGM5q275LqhXHJcbiAgICBkb0RlYXRoKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuZm9yY2VEZXRhY2hDb3ZlclRlc3RGcm9tUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5mb3JjZURldGFjaENvdmVyVGVzdEZyb21QbGF5ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcE1vdmVFZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9jYW5jZWxPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgc3VwZXIuZG9EZWF0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJtdWx0aXBsYXllci1wbGF5ZXItZGVhdGhcIiwge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySWQ6IHRoaXMuX211bHRpcGxheWVyUGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2FsOiAhdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwicGxheWVyLWRlYXRoXCIse30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpOyBcclxuICAgICAgICAvLyDniIbngrjmlYjmnpxcclxuICAgICAgICAvLyDmmL7npLrnu5PmnZ/nlYzpnaJcclxuICAgIH1cclxuXHJcbiAgICBkZWJ1Z1NldExvd0hwKCkge1xyXG4gICAgICAgIGxldCBocCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IodGhpcy5fbWF4SHAgKiAwLjEyKSk7XHJcbiAgICAgICAgaWYgKGhwID49IHRoaXMuX21heEhwKSB7XHJcbiAgICAgICAgICAgIGhwID0gTWF0aC5tYXgoMSwgdGhpcy5fbWF4SHAgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faHAgPSBocDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluR2FtZSgpe1xyXG4gICAgICAgIHRoaXMuX2luR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQnVzaFZpc2liaWxpdHlTdGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iOt+WPlueisOaSnuahhlxyXG4gICAgZ2V0UGxheWVyQm91bmRpbmdCb3goKXtcclxuICAgICAgICByZXR1cm4gVXRpbHMuZ2V0V29ybGRCb3VuZGluZ0JveCh0aGlzLl9jdXJyZW50QmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZpZXdNb2RlKCl7XHJcbiAgICAgICAgdGhpcy5fdmlld01vZGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=