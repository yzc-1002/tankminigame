
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
var PLAYER_BOUNCE_UNLOCK_ENERGY_LEVEL = 2;
var PLAYER_BOUNCE_MAX_COUNT = 5;
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
        _this._bulletBounceCount = 0;
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
        this._bulletBounceCount = 0;
    };
    //设置坦克类型
    Player.prototype.setPlayerType = function (tankType, playerLevel) {
        _super.prototype.setTankType.call(this, tankType);
        //计算玩家血量 攻击
        this._level = playerLevel;
        this._hp = this._maxHp = this._config.HP * (this._level + 1);
        this._atk = this._config.ATK * (this._level + 1);
        this._refreshEnergyUI();
        this._syncBulletBounceState(false);
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
        this._syncBulletBounceState(true);
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
        var bounceCount = this.getCurrentBulletBounceCount();
        if (bounceCount > 0) {
            return {
                id: "bounce",
                title: "反弹子弹",
                desc: "碰墙后自动反弹, 反弹后命中伤害翻倍",
                shortLabel: "反",
                valueText: "x" + bounceCount,
                bounceCount: bounceCount,
                penetrateCount: 0,
                damageRatio: 1,
                scale: 1,
                color: cc.color(90, 180, 255, 255),
                effectColor: cc.color(90, 180, 255, 210),
            };
        }
        if (!this._bulletMutationData) {
            return null;
        }
        var data = Object.assign({}, this._bulletMutationData);
        data.color = this._bulletMutationData.color;
        data.effectColor = this._bulletMutationData.effectColor;
        return data;
    };
    Player.prototype._getBounceCountByEnergyLevel = function (energyLevel) {
        if (energyLevel === void 0) { energyLevel = null; }
        var level = energyLevel == null ? this._energyLevel : energyLevel;
        if (level < PLAYER_BOUNCE_UNLOCK_ENERGY_LEVEL) {
            return 0;
        }
        return Math.min(PLAYER_BOUNCE_MAX_COUNT, level - PLAYER_BOUNCE_UNLOCK_ENERGY_LEVEL + 1);
    };
    Player.prototype.getCurrentBulletBounceCount = function () {
        return Math.max(0, this._bulletBounceCount || this._getBounceCountByEnergyLevel());
    };
    Player.prototype._syncBulletBounceState = function (showFeedback) {
        if (showFeedback === void 0) { showFeedback = false; }
        var prevBounceCount = this._bulletBounceCount || 0;
        var nextBounceCount = this._getBounceCountByEnergyLevel();
        this._bulletBounceCount = nextBounceCount;
        if (nextBounceCount > 0) {
            var choice = this._getCurrentBulletMutationData();
            if (choice) {
                if (showFeedback && nextBounceCount > prevBounceCount) {
                    this._showBulletMutationMedal(choice);
                    this._playUpgradeSelectFeedback(choice);
                    this.showUpgradeToast(choice);
                }
                this._refreshBulletMutationEffect();
            }
        }
        else {
            this._hideBulletMutationEffect();
        }
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
        if (mutationData && mutationData.id == "bounce" && Number.isFinite(fireData.bounceCount)) {
            mutationData.bounceCount = Math.max(0, Math.min(PLAYER_BOUNCE_MAX_COUNT, fireData.bounceCount));
            mutationData.valueText = "x" + mutationData.bounceCount;
        }
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
        if (state.bulletBounceCount != null) {
            this._bulletBounceCount = Math.max(0, Math.min(PLAYER_BOUNCE_MAX_COUNT, state.bulletBounceCount));
        }
        else {
            this._bulletBounceCount = this._getBounceCountByEnergyLevel(this._energyLevel);
        }
        this._multiplayerInBush = !!state.inBush;
        this._multiplayerBushId = state.bushId == null ? null : state.bushId;
        this._syncBulletBounceState(false);
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
        var bounceCount = this.getCurrentBulletBounceCount();
        var prevBounceCount = this._getBounceCountByEnergyLevel(this._energyLevel - 1);
        if (bounceCount > prevBounceCount) {
            return {
                id: "bounce",
                title: "反弹子弹",
                desc: "碰墙后自动反弹, 反弹后命中伤害翻倍",
                shortLabel: "反",
                valueText: "x" + bounceCount,
                amount: bounceCount,
                color: cc.color(90, 180, 255, 255),
            };
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLGlDQUFpQyxHQUFHLENBQUMsQ0FBQztBQUM1QyxJQUFNLHVCQUF1QixHQUFHLENBQUMsQ0FBQztBQUNsQyxJQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUM5QixJQUFNLDBCQUEwQixHQUFHLENBQUMsQ0FBQztBQUNyQyxJQUFNLDRCQUE0QixHQUFHLEdBQUcsQ0FBQztBQUN6QyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUNsQyxJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxJQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUNwQyxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztB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QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsSDtJQUNMLENBQUM7SUFFRCx5Q0FBd0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDbEQsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDeEIsU0FBUyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDMUIsU0FBUyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDNUQsU0FBUyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDeEQsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ3hDLENBQUM7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Q0FBQyxDQUFDO1FBRXZCLElBQUksVUFBVSxHQUFHLFVBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU07WUFDL0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFRixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSx3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SUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQWo1RVEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQW01RWxCO0lBQUQsYUFBQztDQW41RUQsQUFtNUVDLENBbjVFMkIsWUFBSSxHQW01RS9CO0FBbjVFWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFua30gZnJvbSBcIi4vVGFua0VcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0J1bGxldH0gZnJvbSBcIi4vQnVsbGV0RVwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi9zZGsvc2RrL1NES01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBQTEFZRVJfU0hPT1RfSU5URVJWQUwgPSAwLjM1O1xyXG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYID0gMztcclxuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkgPSAwLjg7XHJcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMID0gMC42O1xyXG5jb25zdCBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1QgPSA1ICogKDEgLSAwLjEpO1xyXG5jb25zdCBQTEFZRVJfRVhQX0JBU0UgPSAzMDtcclxuY29uc3QgUExBWUVSX0VYUF9TVEVQID0gMTU7XHJcbmNvbnN0IFBMQVlFUl9CT1VOQ0VfVU5MT0NLX0VORVJHWV9MRVZFTCA9IDI7XHJcbmNvbnN0IFBMQVlFUl9CT1VOQ0VfTUFYX0NPVU5UID0gNTtcclxuY29uc3QgQ0hBUkdFX0NBTk5PTl9CVUxMRVRfVFlQRSA9IDk5O1xyXG5jb25zdCBPSUxfU0hFTExfQlVMTEVUX1RZUEUgPSAxMDA7XHJcbmNvbnN0IE9JTF9TSEVMTF9NQVhfQ09VTlQgPSAxO1xyXG5jb25zdCBCTEFDS19IT0xFX1NIRUxMX01BWF9DT1VOVCA9IDE7XHJcbmNvbnN0IE9JTF9USFJPV19QUkVWSUVXX0FSQ19IRUlHSFQgPSAxMTA7XHJcbmNvbnN0IE9JTF9USFJPV19BUkVBX1JBRElVUyA9IDEyMDtcclxuY29uc3QgTE9XX0hQX1NDUkVFTl9GTEFTSF9JTiA9IDAuMjtcclxuY29uc3QgTE9XX0hQX1NDUkVFTl9GTEFTSF9PVVQgPSAwLjU7XHJcbmNvbnN0IExPV19IUF9TQ1JFRU5fRkxBU0hfTE9PUCA9IDM7XHJcbmNvbnN0IFNIT09UX1JFQ09JTF9ESVNUQU5DRSA9IDEwO1xyXG5jb25zdCBTSE9PVF9SRUNPSUxfT1VUX1RJTUUgPSAwLjA0O1xyXG5jb25zdCBTSE9PVF9SRUNPSUxfUkVUVVJOX1RJTUUgPSAwLjExO1xyXG5jb25zdCBTSE9PVF9GTEFTSF9GQURFX0lOID0gMC4wMjtcclxuY29uc3QgU0hPT1RfRkxBU0hfRkFERV9PVVQgPSAwLjA3O1xyXG5jb25zdCBTQUNSSUZJQ0VfSFBfUkFUSU8gPSAwLjU7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgVGFuayB7XHJcblxyXG4gICAgLy/lhoXpg6jlj5jph49cclxuICAgIF9sZXZlbCAgICAgICAgICA9IDE7ICAgICAgICAvL+eOqeWutuetiee6p1xyXG5cclxuICAgIF9idWxsZXRDb2RlVGltZSA9IDA7ICAgICAgICAvL+WwhOWHu+WGt+WNtOaXtumXtFxyXG5cclxuICAgIF9pc0hpZ2hCdWxsZXQgICA9IGZhbHNlOyAgICAvL+S4ieWPkemrmOmikeWtkOW8uVxyXG5cclxuICAgIF9za2lsbDJUaW1lICAgICA9IDA7ICAgICAgICAvL+aKgOiDvTIo6LaF57qn5a2Q5by5KeWJqeS9meaXtumXtFxyXG4gICAgX3NraWxsM1RpbWUgICAgID0gMDsgICAgICAgIC8v5oqA6IO9Myjml6DmlYzpmLLlvqEp5Ymp5L2Z5pe26Ze0XHJcblxyXG4gICAgX2luR2FtZSAgICAgICAgID0gZmFsc2U7ICAgIC8v5Zyo5ri45oiP5Lit5Lit5L2/55SoXHJcbiAgICBfdmlld01vZGUgICAgICAgPSBmYWxzZTsgICAgLy/lsZXnpLrmqKHlvI9cclxuICAgIF9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYOyAgLy/lvZPliY3lhY3otLnlrZDlvLnmlbDph49cclxuICAgIF9zdG9wRmlyZVRpbWUgPSAwOyAgICAgICAgICAvL+WBnOeBq+iuoeaXtlxyXG4gICAgX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7IC8v5YWN6LS55a2Q5by55oGi5aSN6K6h5pe2XHJcbiAgICBfbW92ZUlucHV0RGlyID0gY2MudjIoMSwgMCk7IC8v56e75Yqo5pGH5p2G55uu5qCH5pa55ZCRXHJcbiAgICBfbW92ZUlucHV0UmF0aW8gPSAwOyAgICAgICAgLy/np7vliqjmkYfmnYbnm67moIfpgJ/njodcclxuICAgIF9tb3ZlU3BlZWRTY2FsZSA9IDE7ICAgICAgICAvL+WxgOWGheenu+mAn+WAjeeOh1xyXG4gICAgX2VuZXJneUxldmVsID0gMTsgICAgICAgICAgIC8v5bGA5YaF6IO96YeP562J57qnXHJcbiAgICBfZW5lcmd5RXhwID0gMDsgICAgICAgICAgICAgLy/lvZPliY3nu4/pqoxcclxuICAgIF9lbmVyZ3lOZWVkRXhwID0gUExBWUVSX0VYUF9CQVNFOyAvL+WNh+e6p+aJgOmcgOe7j+mqjFxyXG4gICAgX2NoYXJnZUNhbm5vblRpbWUgPSAwOyAgICAgIC8v6JOE5Yqb54Ku6JOE5Yqb5pe26Ze0XHJcbiAgICBfY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDsgICAgLy/ok4Tlipvngq7lhrfljbRcclxuICAgIF9jaGFyZ2VDYW5ub25Db29sZG93biA9IDA7ICAvL+iThOWKm+eCruWGt+WNtOaAu+aXtumVv1xyXG4gICAgX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XHJcbiAgICBfY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcclxuICAgIF9jaGFyZ2VFZmZlY3ROb2RlID0gbnVsbDtcclxuICAgIF9vaWxTaGVsbENvdW50ID0gMDtcclxuICAgIF9ibGFja0hvbGVTaGVsbENvdW50ID0gMDtcclxuICAgIF9vaWxTaGVsbFByZXZpZXdpbmcgPSBmYWxzZTtcclxuICAgIF9vaWxTaGVsbFByZXZpZXdUYXJnZXQgPSBudWxsO1xyXG4gICAgX29pbFNoZWxsQWltRGlyID0gY2MudjIoMSwgMCk7XHJcbiAgICBfb2lsU2hlbGxBaW1SYXRpbyA9IDE7XHJcbiAgICBfYWN0aXZlVGhyb3dTa2lsbFR5cGUgPSBcIlwiO1xyXG4gICAgX2J1bGxldE11dGF0aW9uVHlwZSA9IFwiXCI7XHJcbiAgICBfYnVsbGV0TXV0YXRpb25EYXRhID0gbnVsbDtcclxuICAgIF9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUgPSBudWxsO1xyXG4gICAgX21vdmVFZmZlY3RJZCA9IC0xO1xyXG4gICAgX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPSAtMTtcclxuICAgIF9sb3dIcFNjcmVlbkVmZmVjdCA9IG51bGw7XHJcbiAgICBfc2hvb3RJbnB1dERpciA9IGNjLnYyKDEsIDApOyAgIC8v5bCE5Ye75pGH5p2G55uu5qCH5pa55ZCRXHJcbiAgICBfbG9jYWxQcmV2aWV3QmFycmVsRGlyID0gbnVsbDsgICAvL+acrOWcsOiBlOacuueOqeWutueCrueuoemihOiniOaWueWQkSjku4XooajnjrDlsYIpXHJcbiAgICBfZnJhbWVJbnB1dCA9IG51bGw7ICAgICAgICAgICAgIC8v572R57uc5bin6L6T5YWlKOWkmuS6uilcclxuICAgIF9tdWx0aXBsYXllck1vZGUgPSBmYWxzZTsgICAgICAgLy/lpJrkurrmqKHlvI8o56aB55So5pys5Zyw5pGH5p2GKVxyXG4gICAgX211bHRpcGxheWVyUmVtb3RlID0gZmFsc2U7ICAgICAvL+WkmuS6uui/nOerr+eOqeWutlxyXG4gICAgX211bHRpcGxheWVyUGxheWVySWQgPSAtMTsgICAgICAvL+WkmuS6uueOqeWutklEXHJcbiAgICBfbXVsdGlwbGF5ZXJJbkJ1c2ggPSBmYWxzZTtcclxuICAgIF9tdWx0aXBsYXllckJ1c2hJZCA9IG51bGw7XHJcbiAgICBfYnVzaFZpc2liaWxpdHlNb2RlID0gXCJub3JtYWxcIjtcclxuICAgIF9idWxsZXRCb3VuY2VDb3VudCA9IDA7XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwicGxheWVyXCI7ICAvL+mYteiQpVxyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHRoaXMuX3JhZGl1cyAqIDI7ICAgIC8v546p5a6255qE56Kw5pKe5qOA5rWL6IyD5Zu0KjJcclxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IFBMQVlFUl9TSE9PVF9JTlRFUlZBTDtcclxuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYO1xyXG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuX21vdmVJbnB1dERpciA9IHRoaXMuX2RpcjtcclxuICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5fbW92ZVNwZWVkU2NhbGUgPSAxO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUxldmVsID0gMTtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgPSAwO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSB0aGlzLl9nZXRFbmVyZ3lOZWVkRXhwKCk7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1EaXIgPSB0aGlzLl9iYXJyZWxEaXIgJiYgdGhpcy5fYmFycmVsRGlyLm1hZ1NxcigpID4gMCA/IGNjLnYyKHRoaXMuX2JhcnJlbERpcikubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID0gMTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHJvd1NraWxsVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25UeXBlID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldE11dGF0aW9uRWZmZWN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbW92ZUVmZmVjdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zaG9vdElucHV0RGlyID0gdGhpcy5fYmFycmVsRGlyO1xyXG4gICAgICAgIHRoaXMuX2xvY2FsUHJldmlld0JhcnJlbERpciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbkJ1c2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1c2hJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYnVzaFZpc2liaWxpdHlNb2RlID0gXCJub3JtYWxcIjtcclxuICAgICAgICB0aGlzLl9idWxsZXRCb3VuY2VDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lnablhYvnsbvlnotcclxuICAgIHNldFBsYXllclR5cGUodGFua1R5cGUscGxheWVyTGV2ZWwpIHtcclxuICAgICAgICBzdXBlci5zZXRUYW5rVHlwZSh0YW5rVHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/orqHnrpfnjqnlrrbooYDph48g5pS75Ye7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBwbGF5ZXJMZXZlbDtcclxuICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX21heEhwID0gdGhpcy5fY29uZmlnLkhQICogKHRoaXMuX2xldmVsKzEpO1xyXG4gICAgICAgIHRoaXMuX2F0ayA9IHRoaXMuX2NvbmZpZy5BVEsgKiAodGhpcy5fbGV2ZWwrMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XHJcbiAgICAgICAgdGhpcy5fc3luY0J1bGxldEJvdW5jZVN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNdWx0aXBsYXllclNldHVwUGF5bG9hZCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YW5rVHlwZTogdGhpcy5fdGFua1R5cGUsXHJcbiAgICAgICAgICAgIHBsYXllckxldmVsOiB0aGlzLl9sZXZlbCxcclxuICAgICAgICAgICAgYmFzZUhwOiB0aGlzLl9tYXhIcCxcclxuICAgICAgICAgICAgYmFzZUF0azogdGhpcy5fYXRrLFxyXG4gICAgICAgICAgICBiYXNlU3BlZWQ6IHRoaXMuX2dldENvbmZpZ1ZhbHVlKFwiU3BlZWRcIiwgMCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMllVJXHJcbiAgICBfaW5pdFVJKCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgICAgIHRoaXMuX2luaXRFbmVyZ3lVSSgpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hFbmVyZ3lVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgIC8v5pGH5p2G5LqL5Lu2XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdqb3ktc3RpY2stc2hvb3QnLHRoaXMuX2RvU2hvb3RKb3lTdGljayx0aGlzKTsgLy/lsITlh7vmkYfmnYbkuovku7ZcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2NoYXJnZS1jYW5ub24tcHJlc3MnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUHJlc3MsdGhpcyk7IC8v6JOE5Yqb54Ku5oyJ5LiLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjaGFyZ2UtY2Fubm9uLXJlbGVhc2UnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUmVsZWFzZSx0aGlzKTsgLy/ok4Tlipvngq7mnb7lvIBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ29pbC1zaGVsbC10cmlnZ2VyJyx0aGlzLl9kb09pbFNoZWxsVHJpZ2dlcix0aGlzKTsgLy/nhKbmsrnlvLnlj5HlsIRcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItc2FjcmlmaWNlJyx0aGlzLl9kb1NhY3JpZmljZSx0aGlzKTsgLy/njK7npa3mjInpkq5cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItY292ZXItYWN0aW9uJyx0aGlzLl9kb0NvdmVyQWN0aW9uLHRoaXMpOyAvL+aOqeS9k+WQuOmZhC/liIbnprtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3RyaWdnZXItc2tpbGwnLHRoaXMuX2RvU2tpbGwsdGhpcyk7ICAgICAvL+inpuWPkeaKgOiDvVxyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdqb3ktc3RpY2snLHRoaXMuX2RvSm95U3RpY2ssdGhpcyk7ICAgICAvL+aRh+adhuS6i+S7tlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2pveS1zdGljay1zaG9vdCcsdGhpcy5fZG9TaG9vdEpveVN0aWNrLHRoaXMpOyAvL+WwhOWHu+aRh+adhuS6i+S7tlxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2NoYXJnZS1jYW5ub24tcHJlc3MnLHRoaXMuX2RvQ2hhcmdlQ2Fubm9uUHJlc3MsdGhpcyk7IC8v6JOE5Yqb54Ku5oyJ5LiLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY2hhcmdlLWNhbm5vbi1yZWxlYXNlJyx0aGlzLl9kb0NoYXJnZUNhbm5vblJlbGVhc2UsdGhpcyk7IC8v6JOE5Yqb54Ku5p2+5byAXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignb2lsLXNoZWxsLXRyaWdnZXInLHRoaXMuX2RvT2lsU2hlbGxUcmlnZ2VyLHRoaXMpOyAvL+eEpuayueW8ueWPkeWwhFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItc2FjcmlmaWNlJyx0aGlzLl9kb1NhY3JpZmljZSx0aGlzKTsgLy/njK7npa3mjInpkq5cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd0cmlnZ2VyLWNvdmVyLWFjdGlvbicsdGhpcy5fZG9Db3ZlckFjdGlvbix0aGlzKTsgLy/mjqnkvZPlkLjpmYQv5YiG56a7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndHJpZ2dlci1za2lsbCcsdGhpcy5fZG9Ta2lsbCx0aGlzKTsgICAgLy/op6blj5HmioDog71cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mkYfmnYbkuovku7ZcclxuICAgIF9kb0pveVN0aWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSBldmVudC5kaXI7ICAgICAgLy/mlrnlkJFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IGV2ZW50LnJhdGlvOyAgLy/pgJ/njodcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsITlh7vmkYfmnYbkuovku7ZcclxuICAgIF9kb1Nob290Sm95U3RpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHJldHVybjtcclxuICAgICAgICBpZiAoZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvb3RJbnB1dERpciA9IGV2ZW50LmRpcjtcclxuICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gZXZlbnQuZGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuZmlyZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90cnlGaXJlT25jZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNdWx0aXBsYXllckxvY2FsQWltUHJldmlldyhkaXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyTW9kZSB8fCB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGlyIHx8IGRpci5tYWdTcXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyID0gY2MudjIoZGlyKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+e9kee7nOW4p+i+k+WFpSjlpJrkurrmqKHlvI8pXHJcbiAgICBzZXRGcmFtZUlucHV0KGlucHV0cykge1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lSW5wdXQgPSBpbnB1dHM7XHJcbiAgICAgICAgaWYgKGlucHV0cyAmJiBpbnB1dHMudGhyb3dUYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1SYXRpbyA9IE51bWJlci5pc0Zpbml0ZShpbnB1dHMudGhyb3dUYXIucmF0aW8pID8gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgaW5wdXRzLnRocm93VGFyLnJhdGlvKSkgOiB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvO1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGlucHV0cy50aHJvd1Rhci5kaXJYKSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLnRocm93VGFyLmRpclkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyRGlyID0gY2MudjIoaW5wdXRzLnRocm93VGFyLmRpclgsIGlucHV0cy50aHJvd1Rhci5kaXJZKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJEaXIubWFnU3FyKCkgPiAwLjAwMDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbURpciA9IHRhckRpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgaWYgKGlucHV0cy51cCkgZGlyLnkgKz0gMTtcclxuICAgICAgICBpZiAoaW5wdXRzLmRvd24pIGRpci55IC09IDE7XHJcbiAgICAgICAgaWYgKGlucHV0cy5sZWZ0KSBkaXIueCAtPSAxO1xyXG4gICAgICAgIGlmIChpbnB1dHMucmlnaHQpIGRpci54ICs9IDE7XHJcbiAgICAgICAgaWYgKGRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gZGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5wdXRzLmFpbSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLmFpbS54KSAmJiBOdW1iZXIuaXNGaW5pdGUoaW5wdXRzLmFpbS55KSkge1xyXG4gICAgICAgICAgICBsZXQgYWltRGlyID0gY2MudjIoaW5wdXRzLmFpbS54LCBpbnB1dHMuYWltLnkpO1xyXG4gICAgICAgICAgICBpZiAoYWltRGlyLm1hZ1NxcigpID4gMC4wMDAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9vdElucHV0RGlyID0gYWltRGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fc2hvb3RJbnB1dERpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNldEZyYW1lSW5wdXQtLS1pbnB1dHNcIixpbnB1dHMpXHJcbiAgICAgICAgaWYgKGlucHV0cy5maXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVCeU11bHRpcGxheWVyQ29tbWFuZChpbnB1dHMuZmlyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE11bHRpcGxheWVyRmlyZVR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9za2lsbDJUaW1lID4gMCkgPyB0aGlzLl9jb25maWcuQlR5cGUyIDogdGhpcy5fY29uZmlnLkJUeXBlMTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9DaGFyZ2VDYW5ub25QcmVzcyhldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUgJiYgdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlIHx8IHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA+IDAgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faGlkZUNoYXJnZUVmZmVjdCgpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IDB9KTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImNoYXJnZUNhbm5vblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9DaGFyZ2VDYW5ub25SZWxlYXNlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgdGhpcy5fY2hhcmdlQ2Fubm9uQ2hhcmdpbmcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFyZ2VDYW5ub24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2RvU2FjcmlmaWNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9PaWxTaGVsbFRyaWdnZXIoZXZlbnQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vaWxTaGVsbENvdW50IDw9IDAgJiYgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJlc3NlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LnByZXNzZWQgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCBhaW1pbmcgPSAhIShldmVudCAmJiBldmVudC5haW1pbmcgPT09IHRydWUpO1xyXG4gICAgICAgIGxldCByZWxlYXNlID0gISEoZXZlbnQgJiYgZXZlbnQucmVsZWFzZSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9ICEhKGV2ZW50ICYmIGV2ZW50LmNhbmNlbGxlZCA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHByZXNzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWltaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU9pbFNoZWxsQWltKGV2ZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVsZWFzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21taXRPaWxTaGVsbFRocm93KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2RvQ292ZXJBY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUgPT0gZmFsc2UgfHwgIXRoaXMuX21hcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAuaXNNdWx0aXBsYXllck1vZGUgJiYgdGhpcy5fbWFwLmlzTXVsdGlwbGF5ZXJNb2RlKCkpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJtdWx0aXBsYXllci1jb3Zlci1hY3Rpb25cIiwge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySWQ6IHRoaXMuX211bHRpcGxheWVyUGxheWVySWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fbWFwLnRyeVRvZ2dsZUNvdmVyVGVzdEF0dGFjaG1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXAudHJ5VG9nZ2xlQ292ZXJUZXN0QXR0YWNobWVudCh0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/op6blj5HmioDog71cclxuICAgIF9kb1NraWxsKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGxJZCA9IGV2ZW50LnNraWxsSWQ7ICAgIC8v5pa55ZCRXHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIuinpuWPkeS6huaKgOiDvSBcIixza2lsbElkKTtcclxuICAgICAgICAgICAgaWYgKHNraWxsSWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6dGhpcy5fY29uZmlnLkNvaW4vMTAscG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLm5vZGUpfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVuZXJneSh0aGlzLl9tYXhIcCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSArPSAxNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgKz0gMTU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYWluT2lsU2hlbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5CbGFja0hvbGVTaGVsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKTtcclxuICAgICAgICB0aGlzLl9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIt+aWsOeOqeWutuS9jee9rlxyXG4gICAgX3JlZnJlc2hQb3NpdGlvbihkdCkge1xyXG4gICAgICAgIC8v5aSa5Lq65qih5byP77ya5Zyoc2V0RnJhbWVJbnB1dOaYvuW8j+iwg+eUqOWJjeaLkue7neS4gOWIh+enu+WKqFxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lSW5wdXQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9mcmFtZUlucHV0LnVwICYmICF0aGlzLl9mcmFtZUlucHV0LmRvd24gJiYgIXRoaXMuX2ZyYW1lSW5wdXQubGVmdCAmJiAhdGhpcy5fZnJhbWVJbnB1dC5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0UmF0aW8gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZWZyZXNoTW92ZVNwZWVkKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90dXJuRGlyVG8odGhpcy5fbW92ZUlucHV0RGlyLCBkdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VyclBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICAvL+eisOaSnua1i+ivlVxyXG4gICAgICAgIGxldCB3aWxsUG9zaXRpb24gPSB0aGlzLl9nZXRXaWxsUG9zaXRpb24oY3VyclBvc2l0aW9uLCB0aGlzLl9kaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVySXRlbXMgPSB0aGlzLl9tYXAudGVzdENvbGxpZGVycyh3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XHJcbiAgICAgICAgaWYgKGNvbGxpZGVySXRlbXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gdGhpcy5fZ2V0VGVzdERpcihjdXJyUG9zaXRpb24sIHRoaXMuX3JhZGl1cywgdGhpcy5fZGlyLCBjb2xsaWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHRlc3REaXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRlc3REaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX21hcC5jbGFtcE1hcElubmVyUG9zaXRpb24od2lsbFBvc2l0aW9uLCB0aGlzLl9yYWRpdXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoTW92ZVNwZWVkKGR0KSB7XHJcbiAgICAgICAgbGV0IHRlcnJhaW5GYWN0b3IgPSB0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmdldFRlcnJhaW5TcGVlZEZhY3RvclxyXG4gICAgICAgICAgICA/IHRoaXMuX21hcC5nZXRUZXJyYWluU3BlZWRGYWN0b3IodGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9yYWRpdXMpXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBsZXQgbWF4U3BlZWQgPSB0aGlzLl9nZXRDb25maWdWYWx1ZShcIlNwZWVkXCIsIDApICogdGhpcy5fbW92ZVNwZWVkU2NhbGUgKiB0ZXJyYWluRmFjdG9yO1xyXG4gICAgICAgIGxldCB0YXJnZXRTcGVlZCA9IHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCA/IG1heFNwZWVkICogdGhpcy5fbW92ZUlucHV0UmF0aW8gOiAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkICs9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBY2NlbGVyYXRpb25cIiwgbWF4U3BlZWQsIGR0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IHRhcmdldFNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSB0YXJnZXRTcGVlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiB0YXJnZXRTcGVlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgLT0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkRlY2VsZXJhdGlvblwiLCBtYXhTcGVlZCwgZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNwZWVkIDwgdGFyZ2V0U3BlZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IHRhcmdldFNwZWVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEVuZXJneSh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNvdmVySHAgPSB0aGlzLl9tYXhIcCAtIHRoaXMuX2hwO1xyXG4gICAgICAgIGlmIChyZWNvdmVySHAgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGRIcCA9IE1hdGgubWluKHJlY292ZXJIcCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9ocCArPSBhZGRIcDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gYWRkSHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoRW5lcmd5VUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdHJ5U2FjcmlmaWNlSHBGb3JFbmVyZ3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1NhY3JpZmljZVRpcChcIuihgOmHj+i/h+S9jizml6Dms5XnjK7npa1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXhTYWNyaWZpY2VIcCA9IHRoaXMuX2hwIC0gMTtcclxuICAgICAgICBsZXQgc2FjcmlmaWNlSHAgPSBNYXRoLm1pbih0aGlzLl9ocCAqIFNBQ1JJRklDRV9IUF9SQVRJTywgbWF4U2FjcmlmaWNlSHApO1xyXG4gICAgICAgIGlmIChzYWNyaWZpY2VIcCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTYWNyaWZpY2VUaXAoXCLlvZPliY3ml6Dms5XnjK7npa1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hwIC09IHNhY3JpZmljZUhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FkZEVuZXJneUV4cChzYWNyaWZpY2VIcCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheVNhY3JpZmljZUZlZWRiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FkZEVuZXJneUV4cChleHApIHtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgKz0gZXhwO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9lbmVyZ3lFeHAgPj0gdGhpcy5fZW5lcmd5TmVlZEV4cCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgLT0gdGhpcy5fZW5lcmd5TmVlZEV4cDtcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TGV2ZWwrKztcclxuICAgICAgICAgICAgdGhpcy5fZW5lcmd5TmVlZEV4cCA9IHRoaXMuX2dldEVuZXJneU5lZWRFeHAoKTtcclxuICAgICAgICAgICAgdGhpcy5fbGV2ZWxVcEJ5RW5lcmd5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRFbmVyZ3lOZWVkRXhwKCkge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkVuZXJneSB8fCB7fTtcclxuICAgICAgICBsZXQgYmFzZSA9IGNvbmZpZy5FeHBCYXNlID09IG51bGwgPyBQTEFZRVJfRVhQX0JBU0UgOiBjb25maWcuRXhwQmFzZTtcclxuICAgICAgICBsZXQgc3RlcCA9IGNvbmZpZy5FeHBTdGVwID09IG51bGwgPyBQTEFZRVJfRVhQX1NURVAgOiBjb25maWcuRXhwU3RlcDtcclxuICAgICAgICByZXR1cm4gYmFzZSArICh0aGlzLl9lbmVyZ3lMZXZlbCAtIDEpICogc3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBfbGV2ZWxVcEJ5RW5lcmd5KCkge1xyXG4gICAgICAgIHRoaXMuX3N5bmNCdWxsZXRCb3VuY2VTdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdEVuZXJneVVJKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fbGlmZWJhciB8fCB0aGlzLl9maXJlLl9sYkhwTGV2ZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxldmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiSHBMZXZlbFwiKTtcclxuICAgICAgICBsZXZlbE5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fbGlmZWJhcjtcclxuICAgICAgICBsZXZlbE5vZGUuc2V0UG9zaXRpb24oLTM0LCAwKTtcclxuICAgICAgICBsZXZlbE5vZGUuc2V0Q29udGVudFNpemUoMzYsIDI0KTtcclxuICAgICAgICBsZXZlbE5vZGUuekluZGV4ID0gMTA7XHJcbiAgICAgICAgbGV0IGxldmVsTGFiZWwgPSBsZXZlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXZlbExhYmVsLmZvbnRTaXplID0gMTg7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5saW5lSGVpZ2h0ID0gMjA7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxldmVsTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxldmVsTm9kZVtcIiRMYWJlbFwiXSA9IGxldmVsTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJIcExldmVsID0gbGV2ZWxOb2RlO1xyXG5cclxuICAgICAgICBsZXQgZXhwTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2V4cEJhclwiKTtcclxuICAgICAgICBleHBOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX2xpZmViYXI7XHJcbiAgICAgICAgZXhwTm9kZS5zZXRQb3NpdGlvbigtMzQsIDApO1xyXG4gICAgICAgIGV4cE5vZGUuc2V0Q29udGVudFNpemUoNDQsIDQ0KTtcclxuICAgICAgICBleHBOb2RlLnpJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKFwiX2V4cEJnXCIpO1xyXG4gICAgICAgIGJnLnBhcmVudCA9IGV4cE5vZGU7XHJcbiAgICAgICAgbGV0IGJnR3JhcGhpY3MgPSBiZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnR3JhcGhpY3MubGluZVdpZHRoID0gNTtcclxuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNTAsIDY4LCA3NSwgMjIwKTtcclxuICAgICAgICBiZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCAxOCk7XHJcbiAgICAgICAgYmdHcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGJhciA9IG5ldyBjYy5Ob2RlKFwiX2V4cFByb2dyZXNzXCIpO1xyXG4gICAgICAgIGJhci5wYXJlbnQgPSBleHBOb2RlO1xyXG4gICAgICAgIGxldCBiYXJHcmFwaGljcyA9IGJhci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJhckdyYXBoaWNzLmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgYmFyR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig5MCwgMjU1LCAxNDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fZXhwQmFyID0gZXhwTm9kZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9leHBQcm9ncmVzcyA9IGJhcjtcclxuICAgICAgICBiYXJbXCIkR3JhcGhpY3NcIl0gPSBiYXJHcmFwaGljcztcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaEVuZXJneVVJKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9sYkhwTGV2ZWwgJiYgdGhpcy5fZmlyZS5fbGJIcExldmVsLiRMYWJlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9sYkhwTGV2ZWwuJExhYmVsLnN0cmluZyA9IHRoaXMuX2VuZXJneUxldmVsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MgJiYgdGhpcy5fZmlyZS5fZXhwUHJvZ3Jlc3MuJEdyYXBoaWNzKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuX2VuZXJneU5lZWRFeHAgPiAwID8gdGhpcy5fZW5lcmd5RXhwIC8gdGhpcy5fZW5lcmd5TmVlZEV4cCA6IDA7XHJcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IHRoaXMuX2ZpcmUuX2V4cFByb2dyZXNzLiRHcmFwaGljcztcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNTtcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig5MCwgMjU1LCAxNDAsIDI1NSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmFyYygwLCAwLCAxOCwgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBNYXRoLlBJICogMiAqIHByb2dyZXNzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9maXJlLl9leHBCYXIgJiYgdGhpcy5fZmlyZS5fZXhwQmFyLiRQcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9leHBCYXIuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gdGhpcy5fZW5lcmd5TmVlZEV4cCA+IDAgPyB0aGlzLl9lbmVyZ3lFeHAgLyB0aGlzLl9lbmVyZ3lOZWVkRXhwIDogMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZU11bHRpcGxheWVyTmFtZVVJKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fbGlmZWJhciB8fCB0aGlzLl9maXJlLl9sYlBsYXllck5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5hbWVOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJQbGF5ZXJOYW1lXCIpO1xyXG4gICAgICAgIG5hbWVOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX2xpZmViYXI7XHJcbiAgICAgICAgbmFtZU5vZGUuc2V0UG9zaXRpb24oMCwgMjYpO1xyXG4gICAgICAgIG5hbWVOb2RlLnNldENvbnRlbnRTaXplKDEyMCwgMjQpO1xyXG4gICAgICAgIG5hbWVOb2RlLnpJbmRleCA9IDEyO1xyXG4gICAgICAgIGxldCBuYW1lTGFiZWwgPSBuYW1lTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIG5hbWVMYWJlbC5mb250U2l6ZSA9IDE4O1xyXG4gICAgICAgIG5hbWVMYWJlbC5saW5lSGVpZ2h0ID0gMjA7XHJcbiAgICAgICAgbmFtZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbmFtZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBuYW1lTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgbmFtZU5vZGVbXCIkTGFiZWxcIl0gPSBuYW1lTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lID0gbmFtZU5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXVsdGlwbGF5ZXJEaXNwbGF5TmFtZShuYW1lLCBpc0xvY2FsID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLl9lbnN1cmVNdWx0aXBsYXllck5hbWVVSSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fbGJQbGF5ZXJOYW1lIHx8ICF0aGlzLl9maXJlLl9sYlBsYXllck5hbWUuJExhYmVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzaG93TmFtZSA9IG5hbWUgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYlBsYXllck5hbWUuJExhYmVsLnN0cmluZyA9IHNob3dOYW1lO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiUGxheWVyTmFtZS5jb2xvciA9IGlzTG9jYWwgPyBjYy5jb2xvcigxODAsIDI1NSwgMTgwLCAyNTUpIDogY2MuY29sb3IoMjEwLCAyMzAsIDI1NSwgMjU1KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYlBsYXllck5hbWUuYWN0aXZlID0gc2hvd05hbWUubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdXNoVmlzaWJpbGl0eU1vZGUobW9kZSA9IFwibm9ybWFsXCIpIHtcclxuICAgICAgICBsZXQgbmV4dE1vZGUgPSBtb2RlID09IFwiaGlkZGVuXCIgPyBcImhpZGRlblwiIDogKG1vZGUgPT0gXCJzZWxmQnVzaFwiID8gXCJzZWxmQnVzaFwiIDogXCJub3JtYWxcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2hWaXNpYmlsaXR5TW9kZSA9PT0gbmV4dE1vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9idXNoVmlzaWJpbGl0eU1vZGUgPSBuZXh0TW9kZTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQnVzaFZpc2liaWxpdHlTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoQnVzaFZpc2liaWxpdHlTdGF0ZSgpIHtcclxuICAgICAgICBsZXQgbW9kZSA9IHRoaXMuX2J1c2hWaXNpYmlsaXR5TW9kZSB8fCBcIm5vcm1hbFwiO1xyXG4gICAgICAgIGxldCBib2R5T3BhY2l0eSA9IG1vZGUgPT0gXCJoaWRkZW5cIiA/IDAgOiAobW9kZSA9PSBcInNlbGZCdXNoXCIgPyAxMjAgOiAyNTUpO1xyXG4gICAgICAgIGxldCBiYXJyZWxPcGFjaXR5ID0gbW9kZSA9PSBcImhpZGRlblwiID8gMCA6IChtb2RlID09IFwic2VsZkJ1c2hcIiA/IDEyMCA6IDI1NSk7XHJcbiAgICAgICAgbGV0IGh1ZFZpc2libGUgPSBtb2RlICE9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBib2R5T3BhY2l0eTtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl9seUJhcnJlbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2ZpcmUuX2x5QmFycmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJhcnJlbC5vcGFjaXR5ID0gYmFycmVsT3BhY2l0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fbGlmZWJhciAmJiBjYy5pc1ZhbGlkKHRoaXMuX2ZpcmUuX2xpZmViYXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gaHVkVmlzaWJsZSAmJiB0aGlzLl9pbkdhbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIub3BhY2l0eSA9IG1vZGUgPT0gXCJzZWxmQnVzaFwiID8gMTY4IDogMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd1NhY3JpZmljZVRpcCh0ZXh0KSB7XHJcbiAgICAgICAgbGV0IGNoYW5uZWwgPSBTREtNYW5hZ2VyLmdldENoYW5uZWwoKTtcclxuICAgICAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnNob3dUb2FzdCkge1xyXG4gICAgICAgICAgICBjaGFubmVsLnNob3dUb2FzdCh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY2MubG9nKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcGxheVNhY3JpZmljZUZlZWRiYWNrKCkge1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xyXG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuXHJcbiAgICAgICAgbGV0IHdhdmUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VXYXZlXCIpO1xyXG4gICAgICAgIHdhdmUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHdhdmUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgd2F2ZS56SW5kZXggPSAyODY7XHJcbiAgICAgICAgd2F2ZS5vcGFjaXR5ID0gMjEwO1xyXG4gICAgICAgIHdhdmUuc2NhbGUgPSAwLjcyO1xyXG4gICAgICAgIGxldCB3YXZlR3JhcGhpY3MgPSB3YXZlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDc7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCA4OCwgODIsIDIzNSk7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMgKyAxNik7XHJcbiAgICAgICAgd2F2ZUdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIHdhdmUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yNiwgMi4zKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yNilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBnbG93LnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGdsb3cuekluZGV4ID0gMjg1O1xyXG4gICAgICAgIGdsb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA3MiwgNjgsIDcwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDIwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEsIDE5MCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMS4yMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTgpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjE4LCAxLjc4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpe1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XHJcbiAgICAgICAgICAgIC8v5aSa5Lq65qih5byP77ya5pyq5pyJ5bin6L6T5YWl5YmN77yM5a6M5YWo5LiN5aSE55CG5Lu75L2V6YC76L6RXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1vZGUgJiYgdGhpcy5fZnJhbWVJbnB1dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgKz0gZHQ7IC8vIOS7jemcgOe0r+iuoeWGt+WNtOmBv+WFjemmluW4p+WwseiDvei/nuWwhFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAuX3BhdXNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVGcmVlQnVsbGV0UmVjb3ZlcihkdCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNoYXJnZUNhbm5vbihkdCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTG93SHBWaXN1YWwoZHQpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMb3dIcFBsYXllckZlZWRiYWNrKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5ZXJTa2lsbEljb25Db2xsaXNpb25UZXN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoUG9zaXRpb24oZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb2lsU2hlbGxQcmV2aWV3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaE1vdmVFZmZlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEJhcnJlbERpcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQW5nbGUoZHQsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaERpc3BsYXlCYXJyZWxBbmdsZShkdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnN5bmNBdHRhY2hlZENvdmVyVGVzdENvdmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXAuc3luY0F0dGFjaGVkQ292ZXJUZXN0Q292ZXIodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucmVmcmVzaENvdmVyVGVzdEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgIXRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnJlZnJlc2hDb3ZlclRlc3RCdXR0b24odGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvLyDmioDog70yKOi2hee6p+WtkOW8uSlcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSA9IHRoaXMuX3NraWxsMlRpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsMlRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwyLmFjdGl2ZSA9IHRoaXMuX3NraWxsMlRpbWUgPiAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8g5oqA6IO9Myjml6DmlYzpmLLlvqEpXHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgPSB0aGlzLl9za2lsbDNUaW1lIDwgMCA/IDAgOiB0aGlzLl9za2lsbDNUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcclxuICAgIFxyXG4gICAgICAgICAgICAvL+aYvuekuumToOeUslxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGVmID0gdGhpcy5fc2tpbGwzVGltZSA+IDAgPyAxMDAwMDAwMCA6IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLl92aWV3TW9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKHRoaXMuX2RpciwtMC41KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9kaXI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wTW92ZUVmZmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBfYnVpbGRFbmVyZ3lVcGdyYWRlQ2hvaWNlcygpIHtcclxuICAgICAgICBsZXQgY29uZmlnID0geXlwLmNvbmZpZy5FbmVyZ3kgfHwge307XHJcbiAgICAgICAgbGV0IGhwQWRkID0gY29uZmlnLkxldmVsSHBBZGQgPT0gbnVsbCA/IE1hdGgubWF4KDI1LCBNYXRoLnJvdW5kKHRoaXMuX21heEhwICogMC4yMikpIDogY29uZmlnLkxldmVsSHBBZGQ7XHJcbiAgICAgICAgbGV0IGF0a0FkZCA9IGNvbmZpZy5MZXZlbERhbWFnZUFkZCA9PSBudWxsXHJcbiAgICAgICAgICAgID8gKGNvbmZpZy5MZXZlbEF0a0FkZCA9PSBudWxsID8gTWF0aC5tYXgoOCwgTWF0aC5yb3VuZCh0aGlzLl9hdGsgKiAwLjE4KSkgOiBjb25maWcuTGV2ZWxBdGtBZGQpXHJcbiAgICAgICAgICAgIDogY29uZmlnLkxldmVsRGFtYWdlQWRkO1xyXG4gICAgICAgIGxldCBzcGVlZEFkZCA9IGNvbmZpZy5MZXZlbFNwZWVkQWRkID09IG51bGwgPyAxOCA6IGNvbmZpZy5MZXZlbFNwZWVkQWRkO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJocFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi6KOF55Sy5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIueUn+WRveS4iumZkOaPkOWNh+W5tueri+WIu+Wbnua7oVwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJIUFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIGhwQWRkLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBocEFkZCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMjAsIDI1NSwgMTcwLCAyNTUpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJhdGtcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIueBq+WKm+W8uuWMllwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLmlLvlh7vlipvmj5DljYcsIOi+k+WHuuabtOmrmFwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJBVEtcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCIrXCIgKyBhdGtBZGQsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGF0a0FkZCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigyNTUsIDE4NSwgOTAsIDI1NSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcInNwZWVkXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmjqjov5vlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi56e75Yqo6YCf5bqm5o+Q5Y2HLCDotbDkvY3mm7TngbXmtLtcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiU1BEXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgc3BlZWRBZGQgKyBcIiVcIixcclxuICAgICAgICAgICAgICAgIGFtb3VudDogc3BlZWRBZGQsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMTEwLCAyMTAsIDI1NSwgMjU1KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRlc3RVcGdyYWRlQ2hvaWNlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRFbmVyZ3lVcGdyYWRlQ2hvaWNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYm91bmNlXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLlj43lvLnlrZDlvLlcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi56Kw5aKZ5ZCO6Ieq5Yqo5Y+N5by5MeasoVwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCLlj41cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCJ4MVwiLFxyXG4gICAgICAgICAgICAgICAgYm91bmNlQ291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoOTAsIDE4MCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDkwLCAxODAsIDI1NSwgMjEwKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwicGVuZXRyYXRlXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLnqb/pgI/lrZDlvLlcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi6L+e57ut56m/6YCPM+S4quebruagh+WQjua2iOWksVwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCLnqb9cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCJ4M1wiLFxyXG4gICAgICAgICAgICAgICAgcGVuZXRyYXRlQ291bnQ6IDMsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMjU1LCA5MiwgOTIsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBlZmZlY3RDb2xvcjogY2MuY29sb3IoMjU1LCA5MiwgOTIsIDIxMCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImhlYXZ5XCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLph43ngq7lrZDlvLlcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Lyk5a6z5o+Q5Y2HNjAlLCDlrZDlvLnmm7TlpKdcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwi6YeNXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiKzYwJVwiLFxyXG4gICAgICAgICAgICAgICAgZGFtYWdlUmF0aW86IDEuNixcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAxLjM1LFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDI1NSwgMjEwLCA5MCwgMjU1KSxcclxuICAgICAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjYy5jb2xvcigyNTUsIDIxMCwgOTAsIDIxMCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseVRlc3RVcGdyYWRlQ2hvaWNlKGNob2ljZSkge1xyXG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFjaG9pY2UuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNob2ljZS5pZCA9PSBcImhwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SHAgKz0gY2hvaWNlLmFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9tYXhIcDtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2hvaWNlLmlkID09IFwiYXRrXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXRrICs9IGNob2ljZS5hbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNob2ljZS5pZCA9PSBcInNwZWVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZVNwZWVkU2NhbGUgKz0gY2hvaWNlLmFtb3VudCAvIDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Nob3dVcGdyYWRlRmxvYXQoY2hvaWNlKTtcclxuICAgICAgICB0aGlzLl9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKGNob2ljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2UoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIWNob2ljZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvblR5cGUgPSBjaG9pY2UuaWQ7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogY2hvaWNlLmlkLFxyXG4gICAgICAgICAgICB0aXRsZTogY2hvaWNlLnRpdGxlLFxyXG4gICAgICAgICAgICBzaG9ydExhYmVsOiBjaG9pY2Uuc2hvcnRMYWJlbCxcclxuICAgICAgICAgICAgdmFsdWVUZXh0OiBjaG9pY2UudmFsdWVUZXh0LFxyXG4gICAgICAgICAgICBib3VuY2VDb3VudDogY2hvaWNlLmJvdW5jZUNvdW50IHx8IDAsXHJcbiAgICAgICAgICAgIHBlbmV0cmF0ZUNvdW50OiBjaG9pY2UucGVuZXRyYXRlQ291bnQgfHwgMCxcclxuICAgICAgICAgICAgZGFtYWdlUmF0aW86IGNob2ljZS5kYW1hZ2VSYXRpbyB8fCAxLFxyXG4gICAgICAgICAgICBzY2FsZTogY2hvaWNlLnNjYWxlIHx8IDEsXHJcbiAgICAgICAgICAgIGNvbG9yOiBjaG9pY2UuY29sb3IsXHJcbiAgICAgICAgICAgIGVmZmVjdENvbG9yOiBjaG9pY2UuZWZmZWN0Q29sb3IgfHwgY2hvaWNlLmNvbG9yLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX3Nob3dCdWxsZXRNdXRhdGlvbk1lZGFsKHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEJ1bGxldE11dGF0aW9uRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fcGxheVVwZ3JhZGVTZWxlY3RGZWVkYmFjayh0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDdXJyZW50QnVsbGV0TXV0YXRpb25EYXRhKCkge1xyXG4gICAgICAgIGxldCBib3VuY2VDb3VudCA9IHRoaXMuZ2V0Q3VycmVudEJ1bGxldEJvdW5jZUNvdW50KCk7XHJcbiAgICAgICAgaWYgKGJvdW5jZUNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYm91bmNlXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLlj43lvLnlrZDlvLlcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi56Kw5aKZ5ZCO6Ieq5Yqo5Y+N5by5LCDlj43lvLnlkI7lkb3kuK3kvKTlrrPnv7vlgI1cIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwi5Y+NXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwieFwiICsgYm91bmNlQ291bnQsXHJcbiAgICAgICAgICAgICAgICBib3VuY2VDb3VudDogYm91bmNlQ291bnQsXHJcbiAgICAgICAgICAgICAgICBwZW5ldHJhdGVDb3VudDogMCxcclxuICAgICAgICAgICAgICAgIGRhbWFnZVJhdGlvOiAxLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDEsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoOTAsIDE4MCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDkwLCAxODAsIDI1NSwgMjEwKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIGRhdGEuY29sb3IgPSB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuY29sb3I7XHJcbiAgICAgICAgZGF0YS5lZmZlY3RDb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Qm91bmNlQ291bnRCeUVuZXJneUxldmVsKGVuZXJneUxldmVsID0gbnVsbCkge1xyXG4gICAgICAgIGxldCBsZXZlbCA9IGVuZXJneUxldmVsID09IG51bGwgPyB0aGlzLl9lbmVyZ3lMZXZlbCA6IGVuZXJneUxldmVsO1xyXG4gICAgICAgIGlmIChsZXZlbCA8IFBMQVlFUl9CT1VOQ0VfVU5MT0NLX0VORVJHWV9MRVZFTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKFBMQVlFUl9CT1VOQ0VfTUFYX0NPVU5ULCBsZXZlbCAtIFBMQVlFUl9CT1VOQ0VfVU5MT0NLX0VORVJHWV9MRVZFTCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRCdWxsZXRCb3VuY2VDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgdGhpcy5fYnVsbGV0Qm91bmNlQ291bnQgfHwgdGhpcy5fZ2V0Qm91bmNlQ291bnRCeUVuZXJneUxldmVsKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zeW5jQnVsbGV0Qm91bmNlU3RhdGUoc2hvd0ZlZWRiYWNrID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgcHJldkJvdW5jZUNvdW50ID0gdGhpcy5fYnVsbGV0Qm91bmNlQ291bnQgfHwgMDtcclxuICAgICAgICBsZXQgbmV4dEJvdW5jZUNvdW50ID0gdGhpcy5fZ2V0Qm91bmNlQ291bnRCeUVuZXJneUxldmVsKCk7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0Qm91bmNlQ291bnQgPSBuZXh0Qm91bmNlQ291bnQ7XHJcblxyXG4gICAgICAgIGlmIChuZXh0Qm91bmNlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjaG9pY2UgPSB0aGlzLl9nZXRDdXJyZW50QnVsbGV0TXV0YXRpb25EYXRhKCk7XHJcbiAgICAgICAgICAgIGlmIChjaG9pY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzaG93RmVlZGJhY2sgJiYgbmV4dEJvdW5jZUNvdW50ID4gcHJldkJvdW5jZUNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd0J1bGxldE11dGF0aW9uTWVkYWwoY2hvaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5VXBncmFkZVNlbGVjdEZlZWRiYWNrKGNob2ljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VXBncmFkZVRvYXN0KGNob2ljZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9oaWRlQnVsbGV0TXV0YXRpb25FZmZlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dVcGdyYWRlRmxvYXQoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmbG9hdE5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlRmxvYXRcIik7XHJcbiAgICAgICAgZmxvYXROb2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgZmxvYXROb2RlLnNldFBvc2l0aW9uKGNjLnYzKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSArIDExMCwgMCkpO1xyXG4gICAgICAgIGZsb2F0Tm9kZS56SW5kZXggPSA2NTAwO1xyXG4gICAgICAgIGZsb2F0Tm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBmbG9hdE5vZGUuc2NhbGUgPSAwLjgyO1xyXG5cclxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQmFkZ2VcIik7XHJcbiAgICAgICAgYmFkZ2UucGFyZW50ID0gZmxvYXROb2RlO1xyXG4gICAgICAgIGJhZGdlLnNldFBvc2l0aW9uKC00NCwgNCk7XHJcbiAgICAgICAgbGV0IGJhZGdlR3JhcGhpY3MgPSBiYWRnZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbENvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI0KTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjQpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBiYWRnZUxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVCYWRnZUxhYmVsXCIpO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDU0LCAzMik7XHJcbiAgICAgICAgbGV0IGJhZGdlTGFiZWwgPSBiYWRnZUxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnNob3J0TGFiZWw7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC5mb250U2l6ZSA9IGNob2ljZS5zaG9ydExhYmVsLmxlbmd0aCA+IDIgPyAxNSA6IDE4O1xyXG4gICAgICAgIGJhZGdlTGFiZWwubGluZUhlaWdodCA9IDIwO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBiYWRnZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVWYWx1ZVwiKTtcclxuICAgICAgICB2YWx1ZU5vZGUucGFyZW50ID0gZmxvYXROb2RlO1xyXG4gICAgICAgIHZhbHVlTm9kZS5zZXRQb3NpdGlvbigyMiwgOCk7XHJcbiAgICAgICAgdmFsdWVOb2RlLmNvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIHZhbHVlTm9kZS5zZXRDb250ZW50U2l6ZSgxNzAsIDM4KTtcclxuICAgICAgICBsZXQgdmFsdWVMYWJlbCA9IHZhbHVlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHZhbHVlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnZhbHVlVGV4dDtcclxuICAgICAgICB2YWx1ZUxhYmVsLmZvbnRTaXplID0gMzQ7XHJcbiAgICAgICAgdmFsdWVMYWJlbC5saW5lSGVpZ2h0ID0gMzg7XHJcbiAgICAgICAgdmFsdWVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcclxuICAgICAgICB2YWx1ZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVUaXRsZVwiKTtcclxuICAgICAgICB0aXRsZU5vZGUucGFyZW50ID0gZmxvYXROb2RlO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRQb3NpdGlvbigxNiwgLTI0KTtcclxuICAgICAgICB0aXRsZU5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRDb250ZW50U2l6ZSgyMjAsIDI4KTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnRpdGxlO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAyNDtcclxuICAgICAgICB0aXRsZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5MRUZUO1xyXG4gICAgICAgIHRpdGxlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBmbG9hdE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4wNCksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuNTUsIDAsIDcyKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC41NSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1VwZ3JhZGVUb2FzdChjaG9pY2UpIHtcclxuICAgICAgICBpZiAoIWNob2ljZSB8fCAhdGhpcy5ub2RlIHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvYXN0ID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZVRvYXN0XCIpO1xyXG4gICAgICAgIHRvYXN0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICB0b2FzdC5zZXRQb3NpdGlvbigwLCB0aGlzLl9yYWRpdXMgKyA3Nik7XHJcbiAgICAgICAgdG9hc3QuekluZGV4ID0gMzYwO1xyXG4gICAgICAgIHRvYXN0Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRvYXN0LnNjYWxlID0gMC44ODtcclxuXHJcbiAgICAgICAgbGV0IGJnID0gdG9hc3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiZy5maWxsQ29sb3IgPSBjYy5jb2xvcigyMCwgMjQsIDM0LCAyMjgpO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtMTEwLCAtMjAsIDIyMCwgNDAsIDE0KTtcclxuICAgICAgICBiZy5maWxsKCk7XHJcbiAgICAgICAgYmcubGluZVdpZHRoID0gMztcclxuICAgICAgICBiZy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBiZy5yb3VuZFJlY3QoLTExMCwgLTIwLCAyMjAsIDQwLCAxNCk7XHJcbiAgICAgICAgYmcuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlVG9hc3RMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gdG9hc3Q7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDIwNCwgMzApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gY2hvaWNlLnRpdGxlICsgXCIgXCIgKyBjaG9pY2UudmFsdWVUZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMTg7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDIyO1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICB0b2FzdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjEyLCAwLCAxMClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNyksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIyKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjIyLCAwLCAxOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dPaWxQaWNrdXBGZWVkYmFjaygpIHtcclxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl9vaWxQaWNrdXBSZWFkeVwiKTtcclxuICAgICAgICBiYWRnZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oMCwgdGhpcy5fcmFkaXVzICsgNDgpO1xyXG4gICAgICAgIGJhZGdlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJhZGdlLnNjYWxlID0gMC43O1xyXG4gICAgICAgIGJhZGdlLnpJbmRleCA9IDMyMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYmFkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3OCwgNTIsIDI2LCAyMzUpO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtNjgsIC0xOCwgMTM2LCAzNiwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMDUsIDEyMiwgMjM1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTY4LCAtMTgsIDEzNiwgMzYsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX29pbFBpY2t1cFJlYWR5TGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgxMjQsIDI4KTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDIzMiwgMTcyLCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi54Sm5rK55by55bCx57uqXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGJhZGdlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDEyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC42KSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yLCAwLCAxNilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dCbGFja0hvbGVQaWNrdXBGZWVkYmFjaygpIHtcclxuICAgICAgICBsZXQgYmFkZ2UgPSBuZXcgY2MuTm9kZShcIl9ibGFja0hvbGVQaWNrdXBSZWFkeVwiKTtcclxuICAgICAgICBiYWRnZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYmFkZ2Uuc2V0UG9zaXRpb24oMCwgdGhpcy5fcmFkaXVzICsgNDgpO1xyXG4gICAgICAgIGJhZGdlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJhZGdlLnNjYWxlID0gMC43O1xyXG4gICAgICAgIGJhZGdlLnpJbmRleCA9IDMyMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYmFkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig0MiwgMjQsIDg4LCAyMzUpO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtNzQsIC0xOCwgMTQ4LCAzNiwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMTk4LCAxMzgsIDI1NSwgMjM1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTc0LCAtMTgsIDE0OCwgMzYsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2JsYWNrSG9sZVBpY2t1cFJlYWR5TGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgxMzYsIDI4KTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyMzQsIDIxNCwgMjU1LCAyNTUpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi6buR5rSe5by55bCx57uqXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGJhZGdlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4xMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMTIsIDAsIDEyKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC42KSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4yLCAwLCAxNilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHdhdmUgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlV2F2ZVwiKTtcclxuICAgICAgICB3YXZlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICB3YXZlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIHdhdmUuekluZGV4ID0gMjgwO1xyXG4gICAgICAgIHdhdmUub3BhY2l0eSA9IDIyMDtcclxuICAgICAgICB3YXZlLnNjYWxlID0gMC41NTtcclxuICAgICAgICBsZXQgd2F2ZUdyYXBoaWNzID0gd2F2ZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5saW5lV2lkdGggPSA4O1xyXG4gICAgICAgIHdhdmVHcmFwaGljcy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICB3YXZlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE4KTtcclxuICAgICAgICB3YXZlR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgd2F2ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjMsIDMuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMylcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZ2xvdy5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBnbG93LnpJbmRleCA9IDI3NTtcclxuICAgICAgICBnbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGdsb3cuc2NhbGUgPSAwLjc1O1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNob2ljZS5jb2xvci5yLCBjaG9pY2UuY29sb3IuZywgY2hvaWNlLmNvbG9yLmIsIDkwKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDI2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjEyLCAxODApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjI4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xOCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTgsIDEuOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTMwMSk7XHJcbiAgICAgICAgbGV0IHB1bmNoID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjA4KSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDEpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBwdW5jaC5zZXRUYWcoOTMwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihwdW5jaCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0J1bGxldE11dGF0aW9uTWVkYWwoY2hvaWNlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZWRhbCA9IG5ldyBjYy5Ob2RlKFwiX2J1bGxldE11dGF0aW9uTWVkYWxcIik7XHJcbiAgICAgICAgbWVkYWwucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBtZWRhbC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxMTIsIDApKTtcclxuICAgICAgICBtZWRhbC56SW5kZXggPSA2NjAwO1xyXG4gICAgICAgIG1lZGFsLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIG1lZGFsLnNjYWxlID0gMC44ODtcclxuXHJcbiAgICAgICAgbGV0IGJhZGdlID0gbmV3IGNjLk5vZGUoXCJfbWVkYWxCYWRnZVwiKTtcclxuICAgICAgICBiYWRnZS5wYXJlbnQgPSBtZWRhbDtcclxuICAgICAgICBsZXQgYmFkZ2VHcmFwaGljcyA9IGJhZGdlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5maWxsQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5jaXJjbGUoMCwgMCwgMjgpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGJhZGdlR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcclxuICAgICAgICBiYWRnZUdyYXBoaWNzLmNpcmNsZSgwLCAwLCAyOCk7XHJcbiAgICAgICAgYmFkZ2VHcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGJhZGdlTGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbWVkYWxCYWRnZUxhYmVsXCIpO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnBhcmVudCA9IGJhZGdlO1xyXG4gICAgICAgIGJhZGdlTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDUyLCAzMik7XHJcbiAgICAgICAgbGV0IGJhZGdlTGFiZWwgPSBiYWRnZUxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGJhZGdlTGFiZWwuc3RyaW5nID0gY2hvaWNlLnNob3J0TGFiZWw7XHJcbiAgICAgICAgYmFkZ2VMYWJlbC5mb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIGJhZGdlTGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGJhZGdlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBiYWRnZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX21lZGFsVGl0bGVcIik7XHJcbiAgICAgICAgdGl0bGVOb2RlLnBhcmVudCA9IG1lZGFsO1xyXG4gICAgICAgIHRpdGxlTm9kZS5zZXRQb3NpdGlvbigwLCAtNDgpO1xyXG4gICAgICAgIHRpdGxlTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIzNSk7XHJcbiAgICAgICAgdGl0bGVOb2RlLnNldENvbnRlbnRTaXplKDIyMCwgMzIpO1xyXG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gdGl0bGVOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5zdHJpbmcgPSBjaG9pY2UudGl0bGU7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIHRpdGxlTGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIHRpdGxlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgbWVkYWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4wMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC4xMiwgMCwgMTYpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxLjg4KSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMzUpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMzUsIDAsIDM0KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaEJ1bGxldE11dGF0aW9uRWZmZWN0KCkge1xyXG4gICAgICAgIHRoaXMuX2hpZGVCdWxsZXRNdXRhdGlvbkVmZmVjdCgpO1xyXG4gICAgICAgIGlmICghdGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGxldCBlZmZlY3QgPSBuZXcgY2MuTm9kZShcIl9idWxsZXRNdXRhdGlvbk11enpsZUVmZmVjdFwiKTtcclxuICAgICAgICBlZmZlY3QucGFyZW50ID0gYmFycmVsTm9kZTtcclxuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24oY2MudjModGhpcy5fZ2V0QmFycmVsTXV6emxlTG9jYWxQb3NpdGlvbigtMikpKTtcclxuICAgICAgICBlZmZlY3QuekluZGV4ID0gOTY7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gZWZmZWN0O1xyXG5cclxuICAgICAgICBsZXQgb3V0ZXIgPSBuZXcgY2MuTm9kZShcIl9tdXp6bGVPdXRlclwiKTtcclxuICAgICAgICBvdXRlci5wYXJlbnQgPSBlZmZlY3Q7XHJcbiAgICAgICAgbGV0IG91dGVyR3JhcGhpY3MgPSBvdXRlci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IodGhpcy5fYnVsbGV0TXV0YXRpb25EYXRhLmVmZmVjdENvbG9yLnIsIHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvci5nLCB0aGlzLl9idWxsZXRNdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3IuYiwgOTApO1xyXG4gICAgICAgIG91dGVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE2KTtcclxuICAgICAgICBvdXRlckdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyID0gbmV3IGNjLk5vZGUoXCJfbXV6emxlSW5uZXJcIik7XHJcbiAgICAgICAgaW5uZXIucGFyZW50ID0gZWZmZWN0O1xyXG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGxDb2xvciA9IHRoaXMuX2J1bGxldE11dGF0aW9uRGF0YS5lZmZlY3RDb2xvcjtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmNpcmNsZSgwLCAwLCA4KTtcclxuICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yMiwgMS4yMiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4yMiwgMjIwKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yMiwgMC45KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjIyLCAxNTApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVCdWxsZXRNdXRhdGlvbkVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRNdXRhdGlvbkVmZmVjdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0TXV0YXRpb25FZmZlY3ROb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaE1vdmVFZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdmVFZmZlY3RJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVFZmZlY3RJZCA9IE11c2ljTWFuYWdlci5wbGF5TG9vcEVmZmVjdChcInRhbmtNb3ZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zdG9wTW92ZUVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbW92ZUVmZmVjdElkID49IDApIHtcclxuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnN0b3BFZmZlY3QodGhpcy5fbW92ZUVmZmVjdElkKTtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUVmZmVjdElkID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g54Ku566h5Y+q6Lef6ZqP5Y+z5L6n5Y+R5bCE5pGH5p2G5pa55ZCRXHJcbiAgICBfcmVmcmVzaEJhcnJlbERpcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvb3RJbnB1dERpciAmJiB0aGlzLl9zaG9vdElucHV0RGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9zaG9vdElucHV0RGlyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZ2V0RGlzcGxheUJhcnJlbERpcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlICYmICF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSAmJiB0aGlzLl9sb2NhbFByZXZpZXdCYXJyZWxEaXIgJiYgdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxQcmV2aWV3QmFycmVsRGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFycmVsRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoRGlzcGxheUJhcnJlbEFuZ2xlKGR0ID0gMSAvIDYwKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlzcGxheURpciA9IHRoaXMuX2dldERpc3BsYXlCYXJyZWxEaXIoKTtcclxuICAgICAgICBpZiAoIWRpc3BsYXlEaXIgfHwgZGlzcGxheURpci5tYWdTcXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmcm9tQW5nbGUgPSB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZTtcclxuICAgICAgICBsZXQgdG9BbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3MoZGlzcGxheURpcik7XHJcbiAgICAgICAgbGV0IGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICBpZiAoZGlzQW5nbGUgPiAxODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlICsgMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLTE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgLSAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXhUdXJuQW5nbGUgPSB0aGlzLl9nZXRGcmFtZVZhbHVlKFwiQW5ndWxhclNwZWVkXCIsIDEwLCBkdCkgKiAxLjY7XHJcbiAgICAgICAgaWYgKG1heFR1cm5BbmdsZSA8PSAwIHx8IE1hdGguYWJzKGRpc0FuZ2xlKSA8PSBtYXhUdXJuQW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCYXJyZWwuYW5nbGUgPSB0b0FuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmFycmVsLmFuZ2xlICsgKGRpc0FuZ2xlID4gMCA/IG1heFR1cm5BbmdsZSA6IC1tYXhUdXJuQW5nbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSA9IFV0aWxzLmNvcnJlY3Rpb25BbmdsZSh0aGlzLl9maXJlLl9seUJhcnJlbC5hbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Y+z5L6n5oyJ6ZKu5oqs6LW35pe255u05o6l5Y+R5bCE5LiA5Y+RLCDkuI3otbDmjInkvY/mjIHnu63lj5HlsITpgLvovpFcclxuICAgIGZpcmVPbmNlKCkge1xyXG4gICAgICAgIGxldCB0eXBlID0gKHRoaXMuX3ZpZXdNb2RlIHx8IHRoaXMuX3NraWxsMlRpbWUgPiAwKSA/IHRoaXMuX2NvbmZpZy5CVHlwZTIgOiB0aGlzLl9jb25maWcuQlR5cGUxO1xyXG4gICAgICAgIGxldCBhdHRhY2tSYWRpdXMgPSB0aGlzLl92aWV3TW9kZSA/IHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAwLjggOnRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXM7XHJcbiAgICAgICAgbGV0IG11dGF0aW9uRGF0YSA9IHRoaXMuX3ZpZXdNb2RlID8gbnVsbCA6IHRoaXMuX2dldEN1cnJlbnRCdWxsZXRNdXRhdGlvbkRhdGEoKTtcclxuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgodHlwZSx0aGlzLm5vZGUucG9zaXRpb24sdGhpcy5fYmFycmVsRGlyLHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCsyMCxhdHRhY2tSYWRpdXMsdGhpcy5fYXRrLHRoaXMuX2NhbXAsdGhpcy5ub2RlLnBhcmVudCx0aGlzLl9tYXAsOCxtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmlzU2hvb3RFZmZlY3RUZXN0TW9kZSAmJiB0aGlzLl9tYXAuaXNTaG9vdEVmZmVjdFRlc3RNb2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGxheVNob290RmVlZGJhY2sodHlwZSwgbXV0YXRpb25EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlICYmIHRoaXMuX21hcC5lbmVteUNvdW50KCkgPiAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9maXJlQnlNdWx0aXBsYXllckNvbW1hbmQoZmlyZURhdGEpIHtcclxuICAgICAgICBpZiAoIWZpcmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eXBlID0gZmlyZURhdGEudHlwZSB8fCB0aGlzLmdldE11bHRpcGxheWVyRmlyZVR5cGUoKTtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fY29uZmlnLkF0dGFja1JhZGl1cztcclxuICAgICAgICBsZXQgbXV0YXRpb25EYXRhID0gdGhpcy5fZ2V0Q3VycmVudEJ1bGxldE11dGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGlmIChtdXRhdGlvbkRhdGEgJiYgbXV0YXRpb25EYXRhLmlkID09IFwiYm91bmNlXCIgJiYgTnVtYmVyLmlzRmluaXRlKGZpcmVEYXRhLmJvdW5jZUNvdW50KSkge1xyXG4gICAgICAgICAgICBtdXRhdGlvbkRhdGEuYm91bmNlQ291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihQTEFZRVJfQk9VTkNFX01BWF9DT1VOVCwgZmlyZURhdGEuYm91bmNlQ291bnQpKTtcclxuICAgICAgICAgICAgbXV0YXRpb25EYXRhLnZhbHVlVGV4dCA9IFwieFwiICsgbXV0YXRpb25EYXRhLmJvdW5jZUNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV0d29ya01ldGEgPSB7XHJcbiAgICAgICAgICAgIGJ1bGxldElkOiBmaXJlRGF0YS5pZCxcclxuICAgICAgICAgICAgb3duZXJQbGF5ZXJJZDogdGhpcy5fbXVsdGlwbGF5ZXJQbGF5ZXJJZCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEJ1bGxldC5jcmVhdGVCdWxsZXRFeChcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIsXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCArIDIwLFxyXG4gICAgICAgICAgICBhdHRhY2tSYWRpdXMsXHJcbiAgICAgICAgICAgIHRoaXMuX2F0ayxcclxuICAgICAgICAgICAgdGhpcy5fY2FtcCxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCxcclxuICAgICAgICAgICAgdGhpcy5fbWFwLFxyXG4gICAgICAgICAgICA4LFxyXG4gICAgICAgICAgICBtdXRhdGlvbkRhdGEsXHJcbiAgICAgICAgICAgIG5ldHdvcmtNZXRhXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5U2hvb3RGZWVkYmFjayh0eXBlLCBtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYW5BZmZvcmRNdWx0aXBsYXllckZpcmUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA8IFBMQVlFUl9TSE9PVF9JTlRFUlZBTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIXRoaXMuX2Nhbk5vdEFmZm9yZFBhaWRCdWxsZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheVNob290RmVlZGJhY2soYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheUJhcnJlbFJlY29pbCgpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlNdXp6bGVGbGFzaChidWxsZXRUeXBlLCBtdXRhdGlvbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcclxuICAgICAgICB0aGlzLl9wbGF5U2hvb3RTaGFrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5QmFycmVsUmVjb2lsKCkge1xyXG4gICAgICAgIGxldCByZWNvaWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8ICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX2x5QmFycmVsKTtcclxuICAgICAgICBpZiAoIXJlY29pbE5vZGUgfHwgIWNjLmlzVmFsaWQocmVjb2lsTm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHJlY29pbE5vZGUucGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50Tm9kZSB8fCAhY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFzZVBvcyA9IHJlY29pbE5vZGVbXCJfc2hvb3RCYXNlUG9zXCJdO1xyXG4gICAgICAgIGlmICghYmFzZVBvcykge1xyXG4gICAgICAgICAgICBiYXNlUG9zID0gY2MudjMocmVjb2lsTm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHJlY29pbE5vZGVbXCJfc2hvb3RCYXNlUG9zXCJdID0gY2MudjMoYmFzZVBvcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFzZVdvcmxkUG9zID0gcGFyZW50Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYmFzZVBvcyk7XHJcbiAgICAgICAgbGV0IHJlY29pbERpciA9IHRoaXMuX2JhcnJlbERpciAmJiB0aGlzLl9iYXJyZWxEaXIubWFnU3FyKCkgPiAwID8gdGhpcy5fYmFycmVsRGlyLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgbGV0IHJlY29pbFdvcmxkUG9zID0gY2MudjIoYmFzZVdvcmxkUG9zKS5zdWIocmVjb2lsRGlyLm11bChTSE9PVF9SRUNPSUxfRElTVEFOQ0UpKTtcclxuICAgICAgICBsZXQgcmVjb2lsTG9jYWxQb3MgPSBwYXJlbnROb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHJlY29pbFdvcmxkUG9zKTtcclxuXHJcbiAgICAgICAgcmVjb2lsTm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAwNCk7XHJcbiAgICAgICAgcmVjb2lsTm9kZS5zZXRQb3NpdGlvbihiYXNlUG9zKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbyhTSE9PVF9SRUNPSUxfT1VUX1RJTUUsIHJlY29pbExvY2FsUG9zLngsIHJlY29pbExvY2FsUG9zLnkpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlVG8oU0hPT1RfUkVDT0lMX1JFVFVSTl9USU1FLCBiYXNlUG9zLngsIGJhc2VQb3MueSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwNCk7XHJcbiAgICAgICAgcmVjb2lsTm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheU11enpsZUZsYXNoKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGxldCBiYXJyZWxOb2RlID0gdGhpcy5fY3VycmVudEJnIHx8IHRoaXMuX2ZpcmUuX2x5QmFycmVsO1xyXG4gICAgICAgIGlmICghYmFycmVsTm9kZSB8fCAhY2MuaXNWYWxpZChiYXJyZWxOb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWZmZWN0Q29sb3IgPSB0aGlzLl9nZXRTaG9vdEVmZmVjdENvbG9yKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSk7XHJcbiAgICAgICAgbGV0IGZsYXNoID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVGbGFzaFwiKTtcclxuICAgICAgICBmbGFzaC5wYXJlbnQgPSBiYXJyZWxOb2RlO1xyXG4gICAgICAgIGZsYXNoLnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oNikpKTtcclxuICAgICAgICBmbGFzaC56SW5kZXggPSAxMTU7XHJcbiAgICAgICAgZmxhc2gub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgZmxhc2guc2NhbGVYID0gMC4yODtcclxuICAgICAgICBmbGFzaC5zY2FsZVkgPSAwLjcyO1xyXG5cclxuICAgICAgICBsZXQgY29uZSA9IG5ldyBjYy5Ob2RlKFwiX2ZsYXNoQ29uZVwiKTtcclxuICAgICAgICBjb25lLnBhcmVudCA9IGZsYXNoO1xyXG4gICAgICAgIGxldCBjb25lR3JhcGhpY3MgPSBjb25lLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDIxMCk7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLm1vdmVUbygwLCAzNik7XHJcbiAgICAgICAgY29uZUdyYXBoaWNzLmxpbmVUbygtMTcsIDgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oLTcsIC04KTtcclxuICAgICAgICBjb25lR3JhcGhpY3MubGluZVRvKDAsIDQpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oNywgLTgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5saW5lVG8oMTcsIDgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5jbG9zZSgpO1xyXG4gICAgICAgIGNvbmVHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBjb3JlID0gbmV3IGNjLk5vZGUoXCJfZmxhc2hDb3JlXCIpO1xyXG4gICAgICAgIGNvcmUucGFyZW50ID0gZmxhc2g7XHJcbiAgICAgICAgbGV0IGNvcmVHcmFwaGljcyA9IGNvcmUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTAsIDIyMCwgMjM1KTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDExKTtcclxuICAgICAgICBjb3JlR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBmbGFzaC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDI1NSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKFNIT09UX0ZMQVNIX0ZBREVfSU4sIDEuMSwgMS4xOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KFNIT09UX0ZMQVNIX0ZBREVfT1VUKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oU0hPT1RfRkxBU0hfRkFERV9PVVQsIDAuNTUsIDEuNjUpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5U2hvb3RHbG93KGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGxldCBlZmZlY3RDb2xvciA9IHRoaXMuX2dldFNob290RWZmZWN0Q29sb3IoYnVsbGV0VHlwZSwgbXV0YXRpb25EYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50IHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtdXp6bGVHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RNdXp6bGVHbG93XCIpO1xyXG4gICAgICAgIG11enpsZUdsb3cucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBtdXp6bGVHbG93LnNldFBvc2l0aW9uKGNjLnYzKHRoaXMuX2dldEJhcnJlbE11enpsZVBvc2l0aW9uKDApKSk7XHJcbiAgICAgICAgbXV6emxlR2xvdy56SW5kZXggPSAyODU7XHJcbiAgICAgICAgbXV6emxlR2xvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICBtdXp6bGVHbG93LnNjYWxlID0gMC41O1xyXG4gICAgICAgIGxldCBtdXp6bGVHbG93R3JhcGhpY3MgPSBtdXp6bGVHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbXV6emxlR2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGVmZmVjdENvbG9yLnIsIGVmZmVjdENvbG9yLmcsIGVmZmVjdENvbG9yLmIsIDk1KTtcclxuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI4KTtcclxuICAgICAgICBtdXp6bGVHbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIG11enpsZUdsb3cucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjAzLCAyMTApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjAzLCAxLjA1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxLjY1KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbGV0IGJvZHlHbG93ID0gbmV3IGNjLk5vZGUoXCJfc2hvb3RCb2R5R2xvd1wiKTtcclxuICAgICAgICBib2R5R2xvdy5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYm9keUdsb3cuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgYm9keUdsb3cuekluZGV4ID0gMjYwO1xyXG4gICAgICAgIGJvZHlHbG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGJvZHlHbG93LnNjYWxlID0gMC43NTtcclxuICAgICAgICBsZXQgYm9keUdsb3dHcmFwaGljcyA9IGJvZHlHbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihlZmZlY3RDb2xvci5yLCBlZmZlY3RDb2xvci5nLCBlZmZlY3RDb2xvci5iLCA3MCk7XHJcbiAgICAgICAgYm9keUdsb3dHcmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMjgpO1xyXG4gICAgICAgIGJvZHlHbG93R3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGJvZHlHbG93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4wNCwgMTUwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNCwgMS4wOClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuMTIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjM4KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGxheVNob290U2hha2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTaG9vdEVmZmVjdENvbG9yKGJ1bGxldFR5cGUsIG11dGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGlmIChtdXRhdGlvbkRhdGEgJiYgbXV0YXRpb25EYXRhLmVmZmVjdENvbG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtdXRhdGlvbkRhdGEuZWZmZWN0Q29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXRUeXBlID09IE9JTF9TSEVMTF9CVUxMRVRfVFlQRSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuY29sb3IoMTMwLCA5MiwgNTIsIDIyMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXRUeXBlID09IHRoaXMuX2NvbmZpZy5CVHlwZTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDEyMCwgMjI1LCAyNTUsIDIzMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcigyNTUsIDIwNSwgOTUsIDIzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUNoYXJnZUNhbm5vbihkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb29sZG93blByb2dyZXNzID0gMSAtIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSAvIHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNvb2xkb3duXCIsIHtwcm9ncmVzczogY29vbGRvd25Qcm9ncmVzc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25DZFRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uQ29vbGRvd24gPSAwO1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIsIHt9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgKz0gZHQ7XHJcbiAgICAgICAgbGV0IG5lZWRUaW1lID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiVGltZVwiLCA1KTtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lIC8gbmVlZFRpbWU7XHJcbiAgICAgICAgaWYgKHByb2dyZXNzID4gMSkge1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB7cHJvZ3Jlc3M6IHByb2dyZXNzfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VDYW5ub25SZWFkeSA9PSBmYWxzZSAmJiB0aGlzLl9jaGFyZ2VDYW5ub25UaW1lID49IG5lZWRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0NoYXJnZUVmZmVjdCgpO1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZmlyZUNoYXJnZUNhbm5vbigpIHtcclxuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fZ2V0Q2hhcmdlQ29uZmlnKFwiQXR0YWNrUmFkaXVzXCIsIHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAxLjQpO1xyXG4gICAgICAgIGxldCBhdGtSYXRpbyA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkF0a1JhdGlvXCIsIDMpO1xyXG4gICAgICAgIGxldCBzcGVlZCA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIlNwZWVkXCIsIDEyKTtcclxuICAgICAgICBsZXQgd2lwZUxlbiA9IHRoaXMuX2dldEJhcnJlbE11enpsZURpc3RhbmNlKDEyKTtcclxuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgoQ0hBUkdFX0NBTk5PTl9CVUxMRVRfVFlQRSwgdGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9iYXJyZWxEaXIsIHdpcGVMZW4sIGF0dGFja1JhZGl1cywgdGhpcy5fYXRrICogYXRrUmF0aW8sIHRoaXMuX2NhbXAsIHRoaXMubm9kZS5wYXJlbnQsIHRoaXMuX21hcCwgc3BlZWQpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiY2hhcmdlU2hvb3RcIik7XHJcbiAgICAgICAgdGhpcy5fc2hha2VTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VDYW5ub25Db29sZG93biA9IHRoaXMuX2dldENoYXJnZUNvbmZpZyhcIkNvb2xkb3duXCIsIDgpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA9IHRoaXMuX2NoYXJnZUNhbm5vbkNvb2xkb3duO1xyXG4gICAgfVxyXG5cclxuICAgIF9nYWluT2lsU2hlbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBNYXRoLm1pbihPSUxfU0hFTExfTUFYX0NPVU5ULCB0aGlzLl9vaWxTaGVsbENvdW50ICsgMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dPaWxQaWNrdXBGZWVkYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nYWluQmxhY2tIb2xlU2hlbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0Q2hhcmdlQ2Fubm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPSBNYXRoLm1pbihCTEFDS19IT0xFX1NIRUxMX01BWF9DT1VOVCwgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCArIDEpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKTtcclxuICAgICAgICB0aGlzLl9zaG93QmxhY2tIb2xlUGlja3VwRmVlZGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBfZmlyZU9pbFNoZWxsKCkge1xyXG4gICAgICAgIGxldCB3aXBlTGVuID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlRGlzdGFuY2UoOCk7XHJcbiAgICAgICAgQnVsbGV0LmNyZWF0ZUJ1bGxldEV4KE9JTF9TSEVMTF9CVUxMRVRfVFlQRSwgdGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9iYXJyZWxEaXIsIHdpcGVMZW4sIHRoaXMuX2NvbmZpZy5BdHRhY2tSYWRpdXMgKiAxLjgsIDAsIHRoaXMuX2NhbXAsIHRoaXMubm9kZS5wYXJlbnQsIHRoaXMuX21hcCwgMTApO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBNYXRoLm1heCgwLCB0aGlzLl9vaWxTaGVsbENvdW50IC0gMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB7ZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDEzMCwgOTIsIDUyLCAyMjApfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0T2lsU2hlbGxQcmV2aWV3KCkge1xyXG4gICAgICAgIGlmICgodGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwICYmIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPD0gMCkgfHwgIXRoaXMuX21hcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRocm93U2tpbGxUeXBlID0gdGhpcy5fb2lsU2hlbGxDb3VudCA+IDAgPyBcIm9pbFwiIDogXCJibGFja0hvbGVcIjtcclxuICAgICAgICB0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcgPSB0cnVlO1xyXG4gICAgICAgIGxldCBkZWZhdWx0RGlyID0gdGhpcy5fYmFycmVsRGlyICYmIHRoaXMuX2JhcnJlbERpci5tYWdTcXIoKSA+IDAgPyBjYy52Mih0aGlzLl9iYXJyZWxEaXIpLm5vcm1hbGl6ZSgpIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxBaW1EaXIgPSBkZWZhdWx0RGlyO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPSAxO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCkge1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGhyb3dTa2lsbFR5cGUgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmhpZGVPaWxTaGVsbFByZXZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmhpZGVPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbW1pdE9pbFNoZWxsVGhyb3coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vaWxTaGVsbFByZXZpZXdpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX29pbFNoZWxsUHJldmlld1RhcmdldCB8fCB0aGlzLl9nZXRPaWxTaGVsbFRocm93VGFyZ2V0KCk7XHJcbiAgICAgICAgbGV0IGFjdGl2ZVRocm93U2tpbGxUeXBlID0gdGhpcy5fYWN0aXZlVGhyb3dTa2lsbFR5cGUgfHwgKHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPiAwICYmIHRoaXMuX29pbFNoZWxsQ291bnQgPD0gMCA/IFwiYmxhY2tIb2xlXCIgOiBcIm9pbFwiKTtcclxuICAgICAgICBsZXQgYWltRGlyID0gY2MudjIodGhpcy5fb2lsU2hlbGxBaW1EaXIgfHwgdGhpcy5fYmFycmVsRGlyIHx8IGNjLnYyKDEsIDApKTtcclxuICAgICAgICBpZiAoYWltRGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICBhaW1EaXIgPSBhaW1EaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGFpbURpciA9IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWltUmF0aW8gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID09IG51bGwgPyAxIDogdGhpcy5fb2lsU2hlbGxBaW1SYXRpbykpO1xyXG4gICAgICAgIHRoaXMuX2NhbmNlbE9pbFNoZWxsUHJldmlldygpO1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiAhdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgbGV0IHRocm93RXZlbnROYW1lID0gYWN0aXZlVGhyb3dTa2lsbFR5cGUgPT0gXCJibGFja0hvbGVcIiA/IFwibXVsdGlwbGF5ZXItdGhyb3ctYmxhY2staG9sZVwiIDogXCJtdWx0aXBsYXllci10aHJvdy10YXJcIjtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQodGhyb3dFdmVudE5hbWUsIHtcclxuICAgICAgICAgICAgICAgIGRpclg6IE51bWJlcihhaW1EaXIueC50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgICAgIGRpclk6IE51bWJlcihhaW1EaXIueS50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgICAgIHJhdGlvOiBOdW1iZXIoYWltUmF0aW8udG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3RpdmVUaHJvd1NraWxsVHlwZSA9PSBcImJsYWNrSG9sZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rocm93QmxhY2tIb2xlU2hlbGxBdCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90aHJvd09pbFNoZWxsQXQodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldE9pbFNoZWxsVGhyb3dUYXJnZXQoKSB7XHJcbiAgICAgICAgbGV0IGF0dGFja1JhZGl1cyA9IHRoaXMuX2NvbmZpZyAmJiB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICE9IG51bGwgPyB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzIDogNDIwO1xyXG4gICAgICAgIGxldCBkaXIgPSB0aGlzLl9vaWxTaGVsbEFpbURpciAmJiB0aGlzLl9vaWxTaGVsbEFpbURpci5tYWdTcXIoKSA+IDAgPyBjYy52Mih0aGlzLl9vaWxTaGVsbEFpbURpcikubm9ybWFsaXplKCkgOiBjYy52MigxLCAwKTtcclxuICAgICAgICBsZXQgcmF0aW8gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0aGlzLl9vaWxTaGVsbEFpbVJhdGlvID09IG51bGwgPyAxIDogdGhpcy5fb2lsU2hlbGxBaW1SYXRpbykpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pLmFkZChkaXIubXVsKGF0dGFja1JhZGl1cyAqIHJhdGlvKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuY2xhbXBNYXBJbm5lclBvc2l0aW9uXHJcbiAgICAgICAgICAgID8gdGhpcy5fbWFwLmNsYW1wTWFwSW5uZXJQb3NpdGlvbih0YXJnZXQsIE9JTF9USFJPV19BUkVBX1JBRElVUyAqIDAuNTUpXHJcbiAgICAgICAgICAgIDogdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVPaWxTaGVsbEFpbShldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fb2lsU2hlbGxQcmV2aWV3aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDAuMDAwMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vaWxTaGVsbEFpbURpciA9IGNjLnYyKGV2ZW50LmRpcikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudCAmJiBOdW1iZXIuaXNGaW5pdGUoZXZlbnQucmF0aW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQWltUmF0aW8gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBOdW1iZXIoZXZlbnQucmF0aW8pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hPaWxTaGVsbFByZXZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaE9pbFNoZWxsUHJldmlldygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX29pbFNoZWxsUHJldmlld2luZyB8fCAhdGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxQcmV2aWV3VGFyZ2V0ID0gdGhpcy5fZ2V0T2lsU2hlbGxUaHJvd1RhcmdldCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAuc2hvd09pbFNoZWxsUHJldmlldyAmJiB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnNob3dPaWxTaGVsbFByZXZpZXcodGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9vaWxTaGVsbFByZXZpZXdUYXJnZXQsIHtcclxuICAgICAgICAgICAgICAgIHJhZGl1czogT0lMX1RIUk9XX1BSRVZJRVdfQVJDX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgIGFyZWFSYWRpdXM6IE9JTF9USFJPV19BUkVBX1JBRElVUyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF90aHJvd0JsYWNrSG9sZVNoZWxsQXQodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYmxhY2tIb2xlU2hlbGxDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheU9pbFNoZWxsVGhyb3cpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlPaWxTaGVsbFRocm93KHRoaXMubm9kZS5wb3NpdGlvbiwgdGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICBhcmVhUmFkaXVzOiBPSUxfVEhST1dfQVJFQV9SQURJVVMsXHJcbiAgICAgICAgICAgICAgICBhcmNIZWlnaHQ6IE9JTF9USFJPV19QUkVWSUVXX0FSQ19IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICBvbkxhbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zcGF3bkJsYWNrSG9sZVpvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNwYXduQmxhY2tIb2xlWm9uZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB7ZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDEzMCwgOTIsIDE4MCwgMjIwKX0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5TGlnaHRTY3JlZW5TaGFrZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF90aHJvd09pbFNoZWxsQXQodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgdGhpcy5fb2lsU2hlbGxDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMuX29pbFNoZWxsQ291bnQgLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheU9pbFNoZWxsVGhyb3cpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlPaWxTaGVsbFRocm93KHRoaXMubm9kZS5wb3NpdGlvbiwgdGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICBhcmVhUmFkaXVzOiBPSUxfVEhST1dfQVJFQV9SQURJVVMsXHJcbiAgICAgICAgICAgICAgICBhcmNIZWlnaHQ6IE9JTF9USFJPV19QUkVWSUVXX0FSQ19IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICBvbkxhbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5zcGF3bk9pbFNwaWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcC5zcGF3bk9pbFNwaWxsKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZU9pbFNoZWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BsYXlTaG9vdEdsb3coT0lMX1NIRUxMX0JVTExFVF9UWVBFLCB7ZWZmZWN0Q29sb3I6IGNjLmNvbG9yKDEzMCwgOTIsIDUyLCAyMjApfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAucGxheUxpZ2h0U2NyZWVuU2hha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXlMaWdodFNjcmVlblNoYWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwic2hvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hTa2lsbEJ1dHRvbk1vZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyTW9kZSAmJiB0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtb2RlID0gXCJjaGFyZ2VcIjtcclxuICAgICAgICBpZiAodGhpcy5fb2lsU2hlbGxDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgbW9kZSA9IFwib2lsXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIG1vZGUgPSBcImJsYWNrSG9sZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIsIHttb2RlOiBtb2RlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldENoYXJnZUNvbmZpZyhrZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGxldCBmdWxsS2V5ID0gXCJDaGFyZ2VcIiArIGtleTtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWdbZnVsbEtleV0gOiBudWxsO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0Q2hhcmdlQ2Fubm9uKCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vblRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUNhbm5vbkNoYXJnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2hhcmdlQ2Fubm9uUmVhZHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9oaWRlQ2hhcmdlRWZmZWN0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUNhbm5vbkNkVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93Q2hhcmdlRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fY2hhcmdlRWZmZWN0Tm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcmdlRWZmZWN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlTXV6emxlRWZmZWN0XCIpO1xyXG4gICAgICAgIGVmZmVjdC5wYXJlbnQgPSBiYXJyZWxOb2RlO1xyXG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbihjYy52Myh0aGlzLl9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKDQpKSk7XHJcbiAgICAgICAgZWZmZWN0LnpJbmRleCA9IDEwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gZWZmZWN0LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA0MCwgMjAsIDE4MCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGVmZmVjdC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAxLjM1KSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjI1LCAwLjkpXHJcbiAgICAgICAgKSkpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgPSBlZmZlY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVDaGFyZ2VFZmZlY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJnZUVmZmVjdE5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jaGFyZ2VFZmZlY3ROb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfc2hha2VTY3JlZW4oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXAgfHwgIXRoaXMuX21hcC5ub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXBOb2RlID0gdGhpcy5fbWFwLm5vZGU7XHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IG1hcE5vZGUucG9zaXRpb247XHJcbiAgICAgICAgbWFwTm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAwMSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC4wMywgNCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCAtOCwgMCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjAzLCA0LCAzKSxcclxuICAgICAgICAgICAgY2MubW92ZUJ5KDAuMDMsIDAsIC0zKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIG1hcE5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAwMSk7XHJcbiAgICAgICAgbWFwTm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEJhcnJlbE11enpsZUxvY2FsUG9zaXRpb24oZXh0cmFPZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgbGV0IGJhcnJlbE5vZGUgPSB0aGlzLl9jdXJyZW50QmcgfHwgdGhpcy5fZmlyZS5fbHlCYXJyZWw7XHJcbiAgICAgICAgbGV0IGFuY2hvclkgPSBiYXJyZWxOb2RlLmFuY2hvclkgPT0gbnVsbCA/IDAuNSA6IGJhcnJlbE5vZGUuYW5jaG9yWTtcclxuICAgICAgICByZXR1cm4gY2MudjIoMCwgYmFycmVsTm9kZS5oZWlnaHQgKiAoMSAtIGFuY2hvclkpICsgZXh0cmFPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRCYXJyZWxNdXp6bGVQb3NpdGlvbihleHRyYU9mZnNldCA9IDApIHtcclxuICAgICAgICBsZXQgYmFycmVsTm9kZSA9IHRoaXMuX2N1cnJlbnRCZyB8fCB0aGlzLl9maXJlLl9seUJhcnJlbDtcclxuICAgICAgICBsZXQgbG9jYWxQb3MgPSB0aGlzLl9nZXRCYXJyZWxNdXp6bGVMb2NhbFBvc2l0aW9uKGV4dHJhT2Zmc2V0KTtcclxuICAgICAgICBsZXQgd29ybGRQb3MgPSBiYXJyZWxOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihsb2NhbFBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRCYXJyZWxNdXp6bGVEaXN0YW5jZShleHRyYU9mZnNldCA9IDApIHtcclxuICAgICAgICBsZXQgbXV6emxlUG9zID0gdGhpcy5fZ2V0QmFycmVsTXV6emxlUG9zaXRpb24oZXh0cmFPZmZzZXQpO1xyXG4gICAgICAgIHJldHVybiBtdXp6bGVQb3Muc3ViKHRoaXMubm9kZS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RyeUZpcmVPbmNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA8IFBMQVlFUl9TSE9PVF9JTlRFUlZBTCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50IDw9IDAgJiYgdGhpcy5fY2FuTm90QWZmb3JkUGFpZEJ1bGxldCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dMb3dIcFNob290VGlwKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5maXJlT25jZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQtLTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY29uc3VtZUhwRm9yUGFpZEJ1bGxldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jYW5Ob3RBZmZvcmRQYWlkQnVsbGV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ocCA8PSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dMb3dIcFNob290VGlwKCkge1xyXG4gICAgICAgIGxldCBjaGFubmVsID0gU0RLTWFuYWdlci5nZXRDaGFubmVsKCk7XHJcbiAgICAgICAgaWYgKGNoYW5uZWwgJiYgY2hhbm5lbC5zaG93VG9hc3QpIHtcclxuICAgICAgICAgICAgY2hhbm5lbC5zaG93VG9hc3QoXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYy5sb2coXCLooYDph4/ov4fkvY4s5peg5rOV5Y+R5bCE5a2Q5by5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY29uc3VtZUhwRm9yUGFpZEJ1bGxldCgpIHtcclxuICAgICAgICB0aGlzLl9ocCAtPSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBseU11bHRpcGxheWVyRmlyZVN0YXRlKGNvbW1hbmQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlIHx8ICFjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb21tYW5kLm1heEhwICE9IG51bGwgJiYgY29tbWFuZC5tYXhIcCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SHAgPSBjb21tYW5kLm1heEhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC5ocCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0SHAgPSBNYXRoLm1heCgwLCBjb21tYW5kLmhwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21heEhwID4gMCAmJiBuZXh0SHAgPiB0aGlzLl9tYXhIcCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faHAgPSBuZXh0SHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLmZyZWVCdWxsZXRDb3VudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRDb3VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKFBMQVlFUl9GUkVFX0JVTExFVF9NQVgsIGNvbW1hbmQuZnJlZUJ1bGxldENvdW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLnN0b3BGaXJlVGltZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IE1hdGgubWF4KDAsIGNvbW1hbmQuc3RvcEZpcmVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbW1hbmQuZnJlZUJ1bGxldFJlY292ZXJUaW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gTWF0aC5tYXgoMCwgY29tbWFuZC5mcmVlQnVsbGV0UmVjb3ZlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC5zaG90Q29vbGRvd25SZW1haW5pbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dENvb2xkb3duID0gTWF0aC5tYXgoMCwgY29tbWFuZC5zaG90Q29vbGRvd25SZW1haW5pbmcpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IE1hdGgubWF4KDAsIFBMQVlFUl9TSE9PVF9JTlRFUlZBTCAtIG5leHRDb29sZG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrblj5flh7vkuI3po5jkvKTlrrPmlbDlrZcsIOeUqOWMuuWIq+S6juaVjOS6uueahOiTneiJsumXquWFieihqOeOsFxyXG4gICAgYmVIaXQoZGFtYWdlKXtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgLSB0aGlzLl9kZWY7XHJcbiAgICAgICAgaWYgKGRhbWFnZSA8IDApIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hwIC09IGRhbWFnZTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd1BsYXllckhpdEVmZmVjdCgpO1xyXG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5TXVsdGlwbGF5ZXJIaXQoZGFtYWdlLCBocCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVIaXQoZGFtYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRIcCA9IGhwO1xyXG4gICAgICAgIGlmIChuZXh0SHAgPT0gbnVsbCB8fCBuZXh0SHAgPCAwKSB7XHJcbiAgICAgICAgICAgIG5leHRIcCA9IHRoaXMuX2hwIC0gTWF0aC5tYXgoMCwgZGFtYWdlIHx8IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICBuZXh0SHAgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpZFRha2VEYW1hZ2UgPSBuZXh0SHAgPCB0aGlzLl9ocDtcclxuICAgICAgICB0aGlzLl9ocCA9IG5leHRIcDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG5cclxuICAgICAgICBpZiAoZGlkVGFrZURhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93UGxheWVySGl0RWZmZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwicGxheWVySGl0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY011bHRpcGxheWVySHAoaHAsIG1heEhwID0gbnVsbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXhIcCAhPSBudWxsICYmIG1heEhwID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhIcCA9IG1heEhwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5leHRIcCA9IGhwO1xyXG4gICAgICAgIGlmIChuZXh0SHAgPCAwKSB7XHJcbiAgICAgICAgICAgIG5leHRIcCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXhIcCA+IDAgJiYgbmV4dEhwID4gdGhpcy5fbWF4SHApIHtcclxuICAgICAgICAgICAgbmV4dEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGlkVGFrZURhbWFnZSA9IG5leHRIcCA8IHRoaXMuX2hwO1xyXG4gICAgICAgIHRoaXMuX2hwID0gbmV4dEhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcblxyXG4gICAgICAgIGlmIChkaWRUYWtlRGFtYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dQbGF5ZXJIaXRFZmZlY3QoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllclJlbW90ZSkge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMudmlicmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJwbGF5ZXJIaXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ocCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9EZWF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzeW5jTXVsdGlwbGF5ZXJTdGF0ZShzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllck1vZGUgfHwgIXN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcmV2SHAgPSB0aGlzLl9ocDtcclxuICAgICAgICBsZXQgcHJldk1heEhwID0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgbGV0IHByZXZBdGsgPSB0aGlzLl9hdGs7XHJcbiAgICAgICAgbGV0IHByZXZNb3ZlU3BlZWRTY2FsZSA9IHRoaXMuX21vdmVTcGVlZFNjYWxlO1xyXG4gICAgICAgIGxldCBwcmV2RW5lcmd5TGV2ZWwgPSB0aGlzLl9lbmVyZ3lMZXZlbDtcclxuICAgICAgICBpZiAoc3RhdGUubWF4SHAgIT0gbnVsbCAmJiBzdGF0ZS5tYXhIcCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SHAgPSBzdGF0ZS5tYXhIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmhwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRIcCA9IHN0YXRlLmhwO1xyXG4gICAgICAgICAgICBpZiAobmV4dEhwIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEhwID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4SHAgPiAwICYmIG5leHRIcCA+IHRoaXMuX21heEhwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0SHAgPSB0aGlzLl9tYXhIcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IG5leHRIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmF0ayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0ayA9IHN0YXRlLmF0aztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLm1vdmVTcGVlZFNjYWxlICE9IG51bGwgJiYgc3RhdGUubW92ZVNwZWVkU2NhbGUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZFNjYWxlID0gc3RhdGUubW92ZVNwZWVkU2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS50YXJBbW1vQ291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dFRhckFtbW9Db3VudCA9IE1hdGgubWF4KDAsIHN0YXRlLnRhckFtbW9Db3VudCk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0VGFyQW1tb0NvdW50ICE9IHRoaXMuX29pbFNoZWxsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29pbFNoZWxsQ291bnQgPSBuZXh0VGFyQW1tb0NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5ibGFja0hvbGVBbW1vQ291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dEJsYWNrSG9sZUFtbW9Db3VudCA9IE1hdGgubWF4KDAsIHN0YXRlLmJsYWNrSG9sZUFtbW9Db3VudCk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0QmxhY2tIb2xlQW1tb0NvdW50ICE9IHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JsYWNrSG9sZVNoZWxsQ291bnQgPSBuZXh0QmxhY2tIb2xlQW1tb0NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5mcmVlQnVsbGV0Q291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihQTEFZRVJfRlJFRV9CVUxMRVRfTUFYLCBzdGF0ZS5mcmVlQnVsbGV0Q291bnQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLnN0b3BGaXJlVGltZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IE1hdGgubWF4KDAsIHN0YXRlLnN0b3BGaXJlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5mcmVlQnVsbGV0UmVjb3ZlclRpbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSBNYXRoLm1heCgwLCBzdGF0ZS5mcmVlQnVsbGV0UmVjb3ZlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuc2hvdENvb2xkb3duUmVtYWluaW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRDb29sZG93biA9IE1hdGgubWF4KDAsIHN0YXRlLnNob3RDb29sZG93blJlbWFpbmluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gTWF0aC5tYXgoMCwgUExBWUVSX1NIT09UX0lOVEVSVkFMIC0gbmV4dENvb2xkb3duKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmVuZXJneUxldmVsICE9IG51bGwgJiYgc3RhdGUuZW5lcmd5TGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneUxldmVsID0gc3RhdGUuZW5lcmd5TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5lbmVyZ3lFeHAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVyZ3lFeHAgPSBNYXRoLm1heCgwLCBzdGF0ZS5lbmVyZ3lFeHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuZW5lcmd5TmVlZEV4cCAhPSBudWxsICYmIHN0YXRlLmVuZXJneU5lZWRFeHAgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZXJneU5lZWRFeHAgPSBzdGF0ZS5lbmVyZ3lOZWVkRXhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGUuYnVsbGV0Qm91bmNlQ291bnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRCb3VuY2VDb3VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKFBMQVlFUl9CT1VOQ0VfTUFYX0NPVU5ULCBzdGF0ZS5idWxsZXRCb3VuY2VDb3VudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRCb3VuY2VDb3VudCA9IHRoaXMuX2dldEJvdW5jZUNvdW50QnlFbmVyZ3lMZXZlbCh0aGlzLl9lbmVyZ3lMZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySW5CdXNoID0gISFzdGF0ZS5pbkJ1c2g7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdXNoSWQgPSBzdGF0ZS5idXNoSWQgPT0gbnVsbCA/IG51bGwgOiBzdGF0ZS5idXNoSWQ7XHJcbiAgICAgICAgdGhpcy5fc3luY0J1bGxldEJvdW5jZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2VuZXJneUxldmVsID4gcHJldkVuZXJneUxldmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBjaG9pY2UgPSB0aGlzLl9idWlsZFVwZ3JhZGVDaG9pY2VGcm9tU3RhdGVEZWx0YShwcmV2TWF4SHAsIHByZXZBdGssIHByZXZNb3ZlU3BlZWRTY2FsZSk7XHJcbiAgICAgICAgICAgIGlmIChjaG9pY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dVcGdyYWRlRmxvYXQoY2hvaWNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlVcGdyYWRlU2VsZWN0RmVlZGJhY2soY2hvaWNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1VwZ3JhZGVUb2FzdChjaG9pY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGlkVGFrZURhbWFnZSA9IHRoaXMuX2hwIDwgcHJldkhwO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEVuZXJneVVJKCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuXHJcbiAgICAgICAgaWYgKGRpZFRha2VEYW1hZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd1BsYXllckhpdEVmZmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyUmVtb3RlKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlscy52aWJyYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInBsYXllckhpdFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb0RlYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hCdXNoVmlzaWJpbGl0eVN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkVXBncmFkZUNob2ljZUZyb21TdGF0ZURlbHRhKHByZXZNYXhIcCwgcHJldkF0aywgcHJldk1vdmVTcGVlZFNjYWxlKSB7XHJcbiAgICAgICAgbGV0IGhwRGVsdGEgPSB0aGlzLl9tYXhIcCAtIHByZXZNYXhIcDtcclxuICAgICAgICBsZXQgYXRrRGVsdGEgPSB0aGlzLl9hdGsgLSBwcmV2QXRrO1xyXG4gICAgICAgIGxldCBzcGVlZFJhdGlvRGVsdGEgPSB0aGlzLl9tb3ZlU3BlZWRTY2FsZSAtIHByZXZNb3ZlU3BlZWRTY2FsZTtcclxuICAgICAgICBsZXQgc3BlZWREZWx0YSA9IE1hdGgucm91bmQoc3BlZWRSYXRpb0RlbHRhICogMTAwKTtcclxuICAgICAgICBsZXQgYm91bmNlQ291bnQgPSB0aGlzLmdldEN1cnJlbnRCdWxsZXRCb3VuY2VDb3VudCgpO1xyXG4gICAgICAgIGxldCBwcmV2Qm91bmNlQ291bnQgPSB0aGlzLl9nZXRCb3VuY2VDb3VudEJ5RW5lcmd5TGV2ZWwodGhpcy5fZW5lcmd5TGV2ZWwgLSAxKTtcclxuXHJcbiAgICAgICAgaWYgKGJvdW5jZUNvdW50ID4gcHJldkJvdW5jZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJib3VuY2VcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWPjeW8ueWtkOW8uVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnorDlopnlkI7oh6rliqjlj43lvLksIOWPjeW8ueWQjuWRveS4reS8pOWus+e/u+WAjVwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCLlj41cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlVGV4dDogXCJ4XCIgKyBib3VuY2VDb3VudCxcclxuICAgICAgICAgICAgICAgIGFtb3VudDogYm91bmNlQ291bnQsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoOTAsIDE4MCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJocFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi6KOF55Sy5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIueUn+WRveS4iumZkOaPkOWNh+W5tueri+WIu+Wbnua7oVwiLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogXCJIUFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIGhwRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGhwRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoMTIwLCAyNTUsIDE3MCwgMjU1KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF0a0RlbHRhID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYXRrXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLngavlipvlvLrljJZcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5pS75Ye75Yqb5o+Q5Y2HLCDovpPlh7rmm7Tpq5hcIixcclxuICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6IFwiQVRLXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6IFwiK1wiICsgYXRrRGVsdGEsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGF0a0RlbHRhLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNjLmNvbG9yKDI1NSwgMTg1LCA5MCwgMjU1KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNwZWVkRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJzcGVlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5o6o6L+b5by65YyWXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuenu+WKqOmAn+W6puaPkOWNhywg6LWw5L2N5pu054G15rS7XCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiBcIlNQRFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVUZXh0OiBcIitcIiArIHNwZWVkRGVsdGEgKyBcIiVcIixcclxuICAgICAgICAgICAgICAgIGFtb3VudDogc3BlZWREZWx0YSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigxMTAsIDIxMCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfc2hvd1BsYXllckhpdEVmZmVjdCgpIHtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gbmV3IGNjLk5vZGUoXCJfcGxheWVySGl0RWZmZWN0XCIpO1xyXG4gICAgICAgIGVmZmVjdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGVmZmVjdC56SW5kZXggPSAzMDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGVmZmVjdC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig4MCwgMjEwLCAyNTUsIDIzMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyArIDE2KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig3MCwgMTcwLCAyNTUsIDU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzICsgMTApO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgZWZmZWN0LnNjYWxlID0gMC42NTtcclxuICAgICAgICBlZmZlY3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xOCwgMS4yNSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4xOCwgNjApXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4xKSxcclxuICAgICAgICAgICAgY2MucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUxvd0hwUGxheWVyRmVlZGJhY2soKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbkdhbWUgfHwgIXRoaXMuaXNMb3dIcCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BMb3dIcFBsYXllckZlZWRiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0TG93SHBTY3JlZW5FZmZlY3QoKTtcclxuICAgICAgICB0aGlzLl9zdGFydExvd0hwSGVhcnRiZWF0U291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRMb3dIcEhlYXJ0YmVhdFNvdW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IE11c2ljTWFuYWdlci5wbGF5TG9vcEVmZmVjdChcImhlYXJ0YmVhdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RvcExvd0hwSGVhcnRiZWF0U291bmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvd0hwSGVhcnRiZWF0RWZmZWN0SWQgPj0gMCkge1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuc3RvcEVmZmVjdCh0aGlzLl9sb3dIcEhlYXJ0YmVhdEVmZmVjdElkKTtcclxuICAgICAgICAgICAgdGhpcy5fbG93SHBIZWFydGJlYXRFZmZlY3RJZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRMb3dIcFNjcmVlbkVmZmVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG93SHBTY3JlZW5FZmZlY3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVmZmVjdFJvb3QgPSBuZXcgY2MuTm9kZShcIl9sb3dIcFNjcmVlbkVmZmVjdFwiKTtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMuX21hcCAmJiB0aGlzLl9tYXAubm9kZSAmJiB0aGlzLl9tYXAubm9kZS5wYXJlbnQgPyB0aGlzLl9tYXAubm9kZS5wYXJlbnQgOiB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGVmZmVjdFJvb3QucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICBlZmZlY3RSb290LnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIGVmZmVjdFJvb3QuekluZGV4ID0gMTYwMDtcclxuICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCA9IGVmZmVjdFJvb3Q7XHJcblxyXG4gICAgICAgIGxldCBib3JkZXJOb2RlID0gbmV3IGNjLk5vZGUoXCJfbG93SHBCb3JkZXJcIik7XHJcbiAgICAgICAgYm9yZGVyTm9kZS5wYXJlbnQgPSBlZmZlY3RSb290O1xyXG4gICAgICAgIGJvcmRlck5vZGUub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIGxldCBjcmVhdGVFZGdlID0gZnVuY3Rpb24obmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICBsZXQgZWRnZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgICAgICBlZGdlLnBhcmVudCA9IGJvcmRlck5vZGU7XHJcbiAgICAgICAgICAgIGVkZ2Uuc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgICAgIGxldCBncmFwaGljcyA9IGVkZ2UuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCA2MCwgNjAsIDI1NSk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlZGdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfdG9wRWRnZVwiLCAwLCAzNTEsIDEyODAsIDE4KTtcclxuICAgICAgICBjcmVhdGVFZGdlKFwiX2JvdHRvbUVkZ2VcIiwgMCwgLTM1MSwgMTI4MCwgMTgpO1xyXG4gICAgICAgIGNyZWF0ZUVkZ2UoXCJfbGVmdEVkZ2VcIiwgLTYzMSwgMCwgMTgsIDcyMCk7XHJcbiAgICAgICAgY3JlYXRlRWRnZShcIl9yaWdodEVkZ2VcIiwgNjMxLCAwLCAxOCwgNzIwKTtcclxuXHJcbiAgICAgICAgbGV0IGlkbGVUaW1lID0gTWF0aC5tYXgoMCwgTE9XX0hQX1NDUkVFTl9GTEFTSF9MT09QIC0gTE9XX0hQX1NDUkVFTl9GTEFTSF9JTiAtIExPV19IUF9TQ1JFRU5fRkxBU0hfT1VUKTtcclxuICAgICAgICBib3JkZXJOb2RlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2MucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhMT1dfSFBfU0NSRUVOX0ZMQVNIX0lOLCAyMTApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhMT1dfSFBfU0NSRUVOX0ZMQVNIX09VVCwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGlkbGVUaW1lKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveUxvd0hwU2NyZWVuRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb3dIcFNjcmVlbkVmZmVjdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvd0hwU2NyZWVuRWZmZWN0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfc3RvcExvd0hwUGxheWVyRmVlZGJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5fc3RvcExvd0hwSGVhcnRiZWF0U291bmQoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95TG93SHBTY3JlZW5FZmZlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlRnJlZUJ1bGxldFJlY292ZXIoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID49IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RvcEZpcmVUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9zdG9wRmlyZVRpbWUgPCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgKz0gZHQ7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTFxyXG4gICAgICAgICAgICAmJiB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSAtPSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTDtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID49IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hGcmVlQnVsbGV0QmFyKCkge1xyXG4gICAgICAgIGxldCBidWxsZXRCYXJzID0gW1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl96aWRhbmJhcjEsXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ppZGFuYmFyMixcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5femlkYW5iYXIzLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IHJlY292ZXJQcm9ncmVzcyA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYXHJcbiAgICAgICAgICAgICYmIHRoaXMuX3N0b3BGaXJlVGltZSA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSkge1xyXG4gICAgICAgICAgICByZWNvdmVyUHJvZ3Jlc3MgPSB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgLyBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTDtcclxuICAgICAgICAgICAgaWYgKHJlY292ZXJQcm9ncmVzcyA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlY292ZXJQcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1bGxldEJhcnMuZm9yRWFjaCgoYmFyTm9kZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFiYXJOb2RlIHx8ICFiYXJOb2RlLiRQcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCB0aGlzLl9mcmVlQnVsbGV0Q291bnQpIHtcclxuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PSB0aGlzLl9mcmVlQnVsbGV0Q291bnQgJiYgcmVjb3ZlclByb2dyZXNzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFyTm9kZS4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSByZWNvdmVyUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGJhck5vZGUuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCE5Ye7XHJcbiAgICBzaG9vdGluZyhkdCl7XHJcbiAgICAgICAgbGV0IGp1ZGdlQ0QgPSB0aGlzLl9za2lsbDJUaW1lID4gMCA/IHRoaXMuX2NvbmZpZy5CdWxsZXRDb2RlVGltZS80IDogdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lO1xyXG5cclxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0Q29kZVRpbWUgPj0ganVkZ2VDRCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpcmVPbmNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aJp+ihjOatu+S6oVxyXG4gICAgZG9EZWF0aCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmZvcmNlRGV0YWNoQ292ZXJUZXN0RnJvbVBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuZm9yY2VEZXRhY2hDb3ZlclRlc3RGcm9tUGxheWVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdG9wTG93SHBQbGF5ZXJGZWVkYmFjaygpO1xyXG4gICAgICAgIHRoaXMuX3N0b3BNb3ZlRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fb2lsU2hlbGxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsT2lsU2hlbGxQcmV2aWV3KCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFNraWxsQnV0dG9uTW9kZSgpO1xyXG4gICAgICAgIHN1cGVyLmRvRGVhdGgoKTtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwibXVsdGlwbGF5ZXItcGxheWVyLWRlYXRoXCIsIHtcclxuICAgICAgICAgICAgICAgIHBsYXllcklkOiB0aGlzLl9tdWx0aXBsYXllclBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NhbDogIXRoaXMuX211bHRpcGxheWVyUmVtb3RlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInBsYXllci1kZWF0aFwiLHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTsgXHJcbiAgICAgICAgLy8g54iG54K45pWI5p6cXHJcbiAgICAgICAgLy8g5pi+56S657uT5p2f55WM6Z2iXHJcbiAgICB9XHJcblxyXG4gICAgZGVidWdTZXRMb3dIcCgpIHtcclxuICAgICAgICBsZXQgaHAgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHRoaXMuX21heEhwICogMC4xMikpO1xyXG4gICAgICAgIGlmIChocCA+PSB0aGlzLl9tYXhIcCkge1xyXG4gICAgICAgICAgICBocCA9IE1hdGgubWF4KDEsIHRoaXMuX21heEhwIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hwID0gaHA7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbkdhbWUoKXtcclxuICAgICAgICB0aGlzLl9pbkdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoU2tpbGxCdXR0b25Nb2RlKCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEJ1c2hWaXNpYmlsaXR5U3RhdGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ojrflj5bnorDmkp7moYZcclxuICAgIGdldFBsYXllckJvdW5kaW5nQm94KCl7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLmdldFdvcmxkQm91bmRpbmdCb3godGhpcy5fY3VycmVudEJnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3TW9kZSgpe1xyXG4gICAgICAgIHRoaXMuX3ZpZXdNb2RlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19