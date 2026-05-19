
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/GameMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '890f4P3aGZBZI86SwVFWNAv', 'GameMain');
// script/GameMain.ts

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
var BaseComponent_1 = require("./base/BaseComponent");
var LocalizedData_1 = require("./base/LocalizedData");
var Utils_1 = require("./base/Utils");
var MusicManager_1 = require("./base/MusicManager");
var NetworkManager_1 = require("./network/NetworkManager");
var Analytics_1 = require("./ad/Analytics");
var InsertAd_1 = require("./ad/InsertAd");
var RewardAd_1 = require("./ad/RewardAd");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MULTIPLAYER_DEFAULT_TANK_TYPE = 1;
var MULTIPLAYER_FIXED_PLAYER_LEVEL = 1;
var MULTIPLAYER_FIXED_BASE_HP = 100;
var MULTIPLAYER_FIXED_BASE_ATK = 10;
var MULTIPLAYER_FIXED_BASE_SPEED = 5;
var MULTIPLAYER_FIXED_ATTACK_RADIUS = 400;
var MULTIPLAYER_MINIMAP_WIDTH = 216;
var MULTIPLAYER_MINIMAP_HEIGHT = 144;
var MULTIPLAYER_MINIMAP_MARGIN_RIGHT = 18;
var MULTIPLAYER_MINIMAP_MARGIN_TOP = 96;
var MULTIPLAYER_MINIMAP_MARKER_UPDATE_INTERVAL = 0.016;
var GameMain = /** @class */ (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.finishPrefab = null;
        _this.settingPrefab = null;
        _this.wishPrefab = null; //转盘
        _this.revivePrefab = null; //转盘
        // _csb : any = {};
        _this._levelId = 1; //当前关卡
        _this._startCount = 0;
        _this._testPanel = null;
        _this._upgradeChoicePanel = null;
        _this._upgradeChoiceMode = "upgrade";
        _this._netManager = null; //网络管理器(多人)
        _this._multiplayerStatus = null; //连接状态标签
        _this._multiplayerHud = null; //多人最简HUD
        _this._multiplayerAnnouncement = null; //多人播报
        _this._multiplayerHudState = null;
        _this._multiplayerActive = false; //多人游戏进行中
        _this._multiplayerLocalDead = false;
        _this._multiplayerInputLoopTag = 7601;
        _this._multiplayerInputs = null;
        _this._multiplayerHitQueue = [];
        _this._multiplayerBulletEventQueue = [];
        _this._multiplayerTarThrowRepeat = 0;
        _this._multiplayerFireSeq = 1;
        _this._multiplayerJoyMoveHandler = null;
        _this._multiplayerJoyShootHandler = null;
        _this._multiplayerCameraFollowCallback = null;
        _this._multiplayerMinimap = null;
        _this._multiplayerMinimapUpdateCallback = null;
        _this._multiplayerMinimapSafeZoneRenderKey = "";
        return _this;
    }
    GameMain.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化接收事件
        this._initEvent();
    };
    //初始化变量
    GameMain.prototype._initVariable = function () {
    };
    //初始化UI
    GameMain.prototype._initUI = function () {
        //隐藏开始按钮
        this._fire._joystick.active = false;
        this._fire._ui.active = false;
        console.log("yyp.safeTopBottom", yyp.safeTopBottom);
        this._fire._btnSetting.y = yyp.safeTopBottom - 30;
        this._fire._btnSetting.zIndex = 1001;
        if (this._fire._btnTest) {
            this._fire._btnTest.y = yyp.safeTopBottom - 30;
            this._fire._btnTest.zIndex = 1001;
            this._initTestButtonView();
        }
        this._fire._recommendBtns.runAction(cc.moveTo(0.1, 600, 120));
        Utils_1.Utils.doQAction(this._fire._btnWish);
    };
    GameMain.prototype.start = function () {
        this._fire._preDefense.script.setInStart(3);
        this._fire._preBullet.script.setInStart(2);
    };
    //初始化接收事件
    GameMain.prototype._initEvent = function () {
        // yyp.eventCenter.on('config-loaded',this._prepare,this);                 //配置加载完毕
        yyp.eventCenter.on('current-levelid', this._updateLevelid, this); //当前关卡
        yyp.eventCenter.on('current-enemycount', this._updateEnemyCount, this); //敌人数量
        yyp.eventCenter.on('player-death', this._playerDeath, this); //player死亡
        // yyp.eventCenter.on('add-coin',this._addCoin,this);                      //金币增加
        yyp.eventCenter.on('restart', this._prepare, this); //重新开始
        yyp.eventCenter.on('update', this._updateMsg, this); //进入/退出升级界面
        yyp.eventCenter.on("player-revive", this._playerRevive, this); //复活
        yyp.eventCenter.on("game-pause", this._gamePause, this); //暂停
        yyp.eventCenter.on("game-resume", this._gameResume, this); //恢复
        yyp.eventCenter.on("multiplayer-hit", this._onMultiplayerHitReport, this); //多人命中上报
        yyp.eventCenter.on("multiplayer-bullet-event", this._onMultiplayerBulletEvent, this);
        yyp.eventCenter.on("multiplayer-player-death", this._onMultiplayerPlayerDeath, this);
        yyp.eventCenter.on("multiplayer-energy-pickup", this._onMultiplayerEnergyPickup, this);
        yyp.eventCenter.on("multiplayer-tar-pickup", this._onMultiplayerTarPickup, this);
        yyp.eventCenter.on("multiplayer-black-hole-pickup", this._onMultiplayerBlackHolePickup, this);
        yyp.eventCenter.on("multiplayer-throw-tar", this._onMultiplayerThrowTar, this);
        yyp.eventCenter.on("multiplayer-throw-black-hole", this._onMultiplayerThrowBlackHole, this);
        this._fire._lyStart.on(cc.Node.EventType.TOUCH_END, this._onStartClick, this);
    };
    //销毁事件
    GameMain.prototype._destroyEvent = function () {
        // yyp.eventCenter.off('config-loaded',this._prepare,this);                 //配置加载完毕
        yyp.eventCenter.off('current-levelid', this._updateLevelid, this); //当前关卡
        yyp.eventCenter.off('current-enemycount', this._updateEnemyCount, this); //敌人数量
        yyp.eventCenter.off('player-death', this._playerDeath, this); //player死亡
        // yyp.eventCenter.off('add-coin',this._addCoin,this);                      //金币增加
        yyp.eventCenter.off('restart', this._prepare, this); //重新开始
        yyp.eventCenter.off('update', this._updateMsg, this); //进入/退出升级界面
        yyp.eventCenter.off("player-revive", this._playerRevive, this); //复活
        yyp.eventCenter.off("game-pause", this._gamePause, this); //暂停
        yyp.eventCenter.off("game-resume", this._gameResume, this); //恢复
        yyp.eventCenter.off("multiplayer-hit", this._onMultiplayerHitReport, this); //多人命中上报
        yyp.eventCenter.off("multiplayer-bullet-event", this._onMultiplayerBulletEvent, this);
        yyp.eventCenter.off("multiplayer-player-death", this._onMultiplayerPlayerDeath, this);
        yyp.eventCenter.off("multiplayer-energy-pickup", this._onMultiplayerEnergyPickup, this);
        yyp.eventCenter.off("multiplayer-tar-pickup", this._onMultiplayerTarPickup, this);
        yyp.eventCenter.off("multiplayer-black-hole-pickup", this._onMultiplayerBlackHolePickup, this);
        yyp.eventCenter.off("multiplayer-throw-tar", this._onMultiplayerThrowTar, this);
        yyp.eventCenter.off("multiplayer-throw-black-hole", this._onMultiplayerThrowBlackHole, this);
        this._fire._lyStart.off(cc.Node.EventType.TOUCH_END, this._onStartClick, this);
        this._destroyTestPanel();
        this._destroyUpgradeChoicePanel();
        this._teardownMultiplayerInputLoop();
    };
    GameMain.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    // 当前关卡
    GameMain.prototype._updateLevelid = function (event) {
        this._levelId = event.levelid;
        this._fire._lbLevel.$Label.string = "Level:" + event.levelid;
    };
    // 敌人数量
    GameMain.prototype._updateEnemyCount = function (event) {
        this._fire._lbEnemy.$Label.string = event.enemycount;
        if (this._fire._tiled.script.isTestMode && this._fire._tiled.script.isTestMode()) {
            return;
        }
        if (event.enemycount == 0) {
            LocalizedData_1.LocalizedData.setIntItem("_level1_", this._levelId + 1);
            // cc.log("win!!!!!!!!!!!");
            this._fire._lyStart.active = false;
            this._fire._joystick.active = false;
            this._fire._ui.active = false;
            this._fire._nUpdate.script.refreshLevelInfo();
            this._fire._tiled.script.setFinish();
            //显示胜利界面
            var finish = cc.instantiate(this.finishPrefab);
            finish.zIndex = 1000;
            Utils_1.Utils.addtoCurrentScene(finish);
            finish.script.setResult(this._levelId, true, false);
        }
    };
    // 玩家死亡
    GameMain.prototype._playerDeath = function (event) {
        // cc.log("failed!!!!!!!!!!!");
        if (this._multiplayerActive) {
            return;
        }
        if (RewardAd_1.RewardAd.getInstance().isLoad()) {
            //显示复活界面
            var revive = cc.instantiate(this.revivePrefab);
            revive.zIndex = 1000;
            Utils_1.Utils.addtoCurrentScene(revive);
            revive.script.init(this._levelId);
        }
        else {
            this._playerRevive({ type: false });
        }
    };
    GameMain.prototype._playerRevive = function (event) {
        if (this._multiplayerActive) {
            return;
        }
        if (event.type == true) {
            //复活
            this._fire._tiled.script.revive();
        }
        else {
            this._fire._lyStart.active = false;
            this._fire._joystick.active = false;
            this._fire._ui.active = false;
            this._fire._nUpdate.script.refreshLevelInfo();
            this._fire._tiled.script.setFinish();
            //显示失败界面
            var finish = cc.instantiate(this.finishPrefab);
            finish.zIndex = 1000;
            Utils_1.Utils.addtoCurrentScene(finish);
            finish.script.setResult(this._levelId, false, false);
        }
    };
    GameMain.prototype._gamePause = function () {
        this._fire._tiled.script.pause();
    };
    GameMain.prototype._gameResume = function () {
        this._fire._tiled.script.resume();
    };
    // 金币增加
    // _addCoin(event){
    //     this._fire._lyCoin.script.refresh(event.count,event.position);
    // }
    //准备开始
    GameMain.prototype._prepare = function (event) {
        if (this._netManager) {
            this._netManager.onDisconnect = null;
            this._netManager.disconnect();
            this._netManager = null;
        }
        this._multiplayerActive = false;
        this._multiplayerLocalDead = false;
        this._teardownMultiplayerInputLoop();
        this._hideMultiplayerAnnouncement();
        this._hideMultiplayerHud();
        this._multiplayerBulletEventQueue = [];
        this._multiplayerTarThrowRepeat = 0;
        yyp.eventCenter.emit("sacrifice-button-visible", { visible: false });
        yyp.eventCenter.emit("cover-button-state", { visible: false });
        yyp.eventCenter.emit("skill-button-mode", { mode: "charge" });
        this._fire._recommendBtns.runAction(cc.moveTo(0.1, 600, 120));
        this._fire._lyStart.active = true;
        this._fire._nUpdate.active = true;
        // 清空场景
        this._fire._tiled.script.cleanMap();
        this._fire._toggle.$Toggle.isChecked = true;
        this._startCount++;
        if (this._startCount >= 3) {
            var self = this;
            if (InsertAd_1.InsertAd.getInstance().isLoad()) {
                self._startCount = 0;
                InsertAd_1.InsertAd.getInstance().show();
            }
        }
    };
    GameMain.prototype._updateMsg = function (event) {
        if (event.type == 'in') {
            this._fire._recommendBtns.runAction(cc.moveTo(0.1, 600, 120));
        }
        else if (event.type == 'out') {
            this._fire._recommendBtns.runAction(cc.moveTo(0.1, 600, 120));
        }
    };
    //开始按钮
    GameMain.prototype._onStartClick = function () {
        MusicManager_1.MusicManager.playEffect("btn");
        yyp.eventCenter.emit("sacrifice-button-visible", { visible: false });
        yyp.eventCenter.emit("cover-button-state", { visible: false });
        yyp.eventCenter.emit("skill-button-mode", { mode: "charge" });
        this._fire._recommendBtns.runAction(cc.moveTo(0.1, 600, 120));
        //隐藏开始按钮
        this._fire._lyStart.active = false;
        this._fire._joystick.active = true;
        this._fire._ui.active = true;
        this._fire._nUpdate.active = false;
        this._fire._adDefense.script.setAD(3);
        this._fire._adBullet.script.setAD(2);
        this._fire._adLife.script.setAD(1);
        // 开始游戏
        var self = this;
        this._fire._tiled.script.startGame(function () {
            if (self._fire._toggle.$Toggle.isChecked) {
                self._fire._preDefense.script.emitSkill();
                self._fire._preBullet.script.emitSkill();
            }
        });
    };
    //开始按钮
    GameMain.prototype.onSettingClick = function () {
        MusicManager_1.MusicManager.playEffect("btn");
        Utils_1.Utils.showDialogs(this.settingPrefab);
    };
    //点击显示转盘按钮
    GameMain.prototype.onWishBtnClick = function () {
        Analytics_1.Analytics.getInstance().event('enter_wish');
        MusicManager_1.MusicManager.playEffect("btn"); //按钮音效
        Utils_1.Utils.showDialogs(this.wishPrefab);
    };
    GameMain.prototype.onTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        MusicManager_1.MusicManager.playEffect("btn");
        this._showTestPanel();
    };
    GameMain.prototype._initTestButtonView = function () {
        if (this._fire._btnTest.getChildByName("_lbTestBtn")) {
            return;
        }
        var labelNode = new cc.Node("_lbTestBtn");
        labelNode.parent = this._fire._btnTest;
        labelNode.setContentSize(this._fire._btnTest.width, this._fire._btnTest.height);
        var label = labelNode.addComponent(cc.Label);
        label.string = "测";
        label.fontSize = 28;
        label.lineHeight = 32;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
    };
    GameMain.prototype._showTestPanel = function () {
        if (this._testPanel && cc.isValid(this._testPanel)) {
            this._testPanel.active = true;
            return;
        }
        var panel = new cc.Node("_testPanel");
        panel.parent = this.node;
        panel.setContentSize(1280, 720);
        panel.zIndex = 2000;
        this._testPanel = panel;
        var mask = new cc.Node("_testMask");
        mask.parent = panel;
        mask.setContentSize(1280, 720);
        var maskGraphics = mask.addComponent(cc.Graphics);
        maskGraphics.fillColor = cc.color(0, 0, 0, 150);
        maskGraphics.rect(-640, -360, 1280, 720);
        maskGraphics.fill();
        mask.on(cc.Node.EventType.TOUCH_END, this._hideTestPanel, this);
        var dialog = new cc.Node("_testDialog");
        dialog.parent = panel;
        dialog.setContentSize(1060, 820);
        dialog.zIndex = 1;
        var dialogGraphics = dialog.addComponent(cc.Graphics);
        dialogGraphics.fillColor = cc.color(35, 36, 45, 245);
        dialogGraphics.roundRect(-530, -410, 1060, 820, 18);
        dialogGraphics.fill();
        dialogGraphics.lineWidth = 3;
        dialogGraphics.strokeColor = cc.color(255, 255, 255, 180);
        dialogGraphics.roundRect(-530, -410, 1060, 820, 18);
        dialogGraphics.stroke();
        dialog.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
        }, this);
        this._createTestLabel(dialog, "_lbTestTitle", "测试面板", cc.v2(0, 276), 34, cc.color(255, 255, 255, 255));
        this._createTestLabel(dialog, "_lbTestTips", "会先重置当前游戏状态，再进入测试场景", cc.v2(0, 234), 22, cc.color(210, 210, 220, 255));
        var buttonWidth = 220;
        var buttonHeight = 54;
        var buttonFontSize = 22;
        var columns = [-360, -120, 120, 360];
        var rows = [144, 72, 0, -72, -144, -216];
        this._createTestButton(dialog, "_btnKillEffectTest", "击杀效果测试", cc.v2(columns[0], rows[0]), cc.color(255, 90, 70, 255), this._onKillTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnHitTest", "受击效果测试", cc.v2(columns[1], rows[0]), cc.color(80, 180, 255, 255), this._onHitTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnUpgradeTest", "升级测试", cc.v2(columns[2], rows[0]), cc.color(115, 255, 170, 255), this._onUpgradeTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnMutationTest", "子弹质变测试", cc.v2(columns[3], rows[0]), cc.color(255, 120, 210, 255), this._onBulletMutationTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnShootEffectTest", "子弹射击测试", cc.v2(columns[0], rows[1]), cc.color(255, 205, 90, 255), this._onShootEffectTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnPlayerLowHpTest", "自己血量告急", cc.v2(columns[1], rows[1]), cc.color(255, 110, 110, 255), this._onPlayerLowHpTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnEnemyLowHpTest", "敌人血量告急", cc.v2(columns[2], rows[1]), cc.color(255, 165, 70, 255), this._onEnemyLowHpTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnKillBroadcastTest", "击杀广播", cc.v2(columns[3], rows[1]), cc.color(175, 120, 255, 255), this._onKillBroadcastTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnSacrificeTest", "献祭测试", cc.v2(columns[0], rows[2]), cc.color(255, 92, 92, 255), this._onSacrificeTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnPortalTest", "传送门测试", cc.v2(columns[1], rows[2]), cc.color(110, 255, 245, 255), this._onPortalTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnCentrifugalRingTest", "离心力圈测试", cc.v2(columns[2], rows[2]), cc.color(255, 160, 90, 255), this._onCentrifugalRingTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnOilSpillTest", "焦油弹测试", cc.v2(columns[3], rows[2]), cc.color(165, 118, 72, 255), this._onOilSpillTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnEnergyEggTest", "能量蛋收藏", cc.v2(columns[0], rows[3]), cc.color(126, 232, 143, 255), this._onEnergyEggTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnCoverTest", "掩体测试", cc.v2(columns[1], rows[3]), cc.color(199, 151, 96, 255), this._onCoverTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnCloseTest", "关闭", cc.v2(columns[2], rows[3]), cc.color(180, 180, 190, 255), this._hideTestPanel, 180, 48, 24);
        this._createTestButton(dialog, "_btnDamageDoubleTest", "伤害翻倍区域", cc.v2(columns[3], rows[3]), cc.color(255, 50, 50, 255), this._onDamageDoubleTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnSpeedDoubleTest", "速度翻倍区域", cc.v2(columns[0], rows[4]), cc.color(50, 150, 255, 255), this._onSpeedDoubleTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnSpreadBulletTest", "子弹扩散区域", cc.v2(columns[1], rows[4]), cc.color(50, 230, 100, 255), this._onSpreadBulletTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnBounceObstacleTest", "子弹反弹障碍", cc.v2(columns[2], rows[4]), cc.color(255, 100, 200, 255), this._onBounceObstacleTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnBlackHoleTest", "黑洞区域", cc.v2(columns[3], rows[4]), cc.color(120, 40, 180, 255), this._onBlackHoleTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnClusterBombTest", "集束炸弹", cc.v2(columns[0], rows[5]), cc.color(220, 160, 40, 255), this._onClusterBombTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnMultiplayerTest", "联机对战", cc.v2(columns[1], rows[5]), cc.color(60, 220, 255, 255), this._onMultiplayerTestClick, buttonWidth, buttonHeight, buttonFontSize);
    };
    GameMain.prototype._createTestLabel = function (parent, name, text, pos, fontSize, color) {
        var labelNode = new cc.Node(name);
        labelNode.parent = parent;
        labelNode.setContentSize(420, 42);
        labelNode.setPosition(pos);
        labelNode.color = color;
        var label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = fontSize + 6;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return labelNode;
    };
    GameMain.prototype._createTestButton = function (parent, name, text, pos, strokeColor, handler, width, height, fontSize) {
        if (width === void 0) { width = 260; }
        if (height === void 0) { height = 58; }
        if (fontSize === void 0) { fontSize = 28; }
        var btn = new cc.Node(name);
        btn.parent = parent;
        btn.setContentSize(width, height);
        btn.setPosition(pos);
        btn.zIndex = 100;
        var graphics = btn.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(48, 48, 55, 230);
        graphics.roundRect(-width / 2, -height / 2, width, height, 12);
        graphics.fill();
        graphics.lineWidth = 3;
        graphics.strokeColor = strokeColor;
        graphics.roundRect(-width / 2, -height / 2, width, height, 12);
        graphics.stroke();
        var labelNode = new cc.Node(name + "Label");
        labelNode.parent = btn;
        labelNode.setContentSize(width, height);
        var label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = fontSize + 4;
        // label.overflow = cc.Label.Overflow.SHRINK;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        btn.on(cc.Node.EventType.TOUCH_END, handler, this);
        return btn;
    };
    GameMain.prototype._onKillTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("kill");
    };
    GameMain.prototype._onHitTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("hit");
    };
    GameMain.prototype._onUpgradeTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("upgrade");
    };
    GameMain.prototype._onBulletMutationTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("mutation");
    };
    GameMain.prototype._onShootEffectTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("shoot");
    };
    GameMain.prototype._onPlayerLowHpTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("playerLowHp");
    };
    GameMain.prototype._onEnemyLowHpTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("enemyLowHp");
    };
    GameMain.prototype._onKillBroadcastTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("killBroadcast");
    };
    GameMain.prototype._onPortalTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("portal");
    };
    GameMain.prototype._onCentrifugalRingTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("centrifugalRing");
    };
    GameMain.prototype._onSacrificeTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("sacrifice");
    };
    GameMain.prototype._onOilSpillTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("oilSpill");
    };
    GameMain.prototype._onCoverTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("cover");
    };
    GameMain.prototype._onEnergyEggTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("energyEgg");
    };
    GameMain.prototype._onDamageDoubleTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("damageDouble");
    };
    GameMain.prototype._onSpeedDoubleTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("speedDouble");
    };
    GameMain.prototype._onSpreadBulletTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("spreadBullet");
    };
    GameMain.prototype._onBounceObstacleTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("bounceObstacle");
    };
    GameMain.prototype._onBlackHoleTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("blackHole");
    };
    GameMain.prototype._onClusterBombTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("clusterBomb");
    };
    GameMain.prototype._onMultiplayerTestClick = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._hideTestPanel();
        this._startMultiplayerGame();
    };
    GameMain.prototype._startTestGame = function (type) {
        MusicManager_1.MusicManager.playEffect("btn");
        this._hideTestPanel();
        this._hideUpgradeChoicePanel(false);
        this._resetGameBeforeTest();
        yyp.eventCenter.emit("sacrifice-button-visible", { visible: type == "sacrifice" });
        yyp.eventCenter.emit("cover-button-state", { visible: false });
        yyp.eventCenter.emit("skill-button-mode", { mode: "charge" });
        var self = this;
        var complete = function () {
            self._fire._joystick.active = true;
            self._fire._ui.active = true;
        };
        if (type == "kill") {
            this._fire._tiled.script.startKillEffectTestGame(complete);
        }
        else if (type == "upgrade") {
            this._fire._tiled.script.startUpgradeTestGame(function () {
                complete();
                self._showUpgradeChoicePanel("upgrade");
            });
        }
        else if (type == "mutation") {
            this._fire._tiled.script.startUpgradeTestGame(function () {
                complete();
                self._showUpgradeChoicePanel("mutation");
            });
        }
        else if (type == "shoot") {
            this._fire._tiled.script.startShootEffectTestGame(function () {
                complete();
            });
        }
        else if (type == "playerLowHp") {
            this._fire._tiled.script.startUpgradeTestGame(function () {
                complete();
                var player = self._getCurrentPlayer();
                if (player && player.script && player.script.debugSetLowHp) {
                    player.script.debugSetLowHp();
                }
            });
        }
        else if (type == "enemyLowHp") {
            this._fire._tiled.script.startUpgradeTestGame(function () {
                complete();
                if (self._fire._tiled && self._fire._tiled.script && self._fire._tiled.script.createLowHpTestEnemy) {
                    self._fire._tiled.script.createLowHpTestEnemy();
                }
            });
        }
        else if (type == "sacrifice") {
            this._fire._tiled.script.startUpgradeTestGame(function () {
                complete();
            });
        }
        else if (type == "killBroadcast") {
            this._fire._tiled.script.startKillBroadcastTestGame(function () {
                complete();
            });
        }
        else if (type == "portal") {
            this._fire._tiled.script.startPortalTestGame(function () {
                complete();
            });
        }
        else if (type == "centrifugalRing") {
            this._fire._tiled.script.startCentrifugalRingTestGame(function () {
                complete();
            });
        }
        else if (type == "oilSpill") {
            this._fire._tiled.script.startUpgradeTestGame(function () {
                complete();
                if (self._fire._tiled && self._fire._tiled.script && self._fire._tiled.script.spawnOilTestPickup) {
                    self._fire._tiled.script.spawnOilTestPickup();
                }
            });
        }
        else if (type == "cover") {
            this._fire._tiled.script.startCoverTestGame(function () {
                complete();
            });
        }
        else if (type == "energyEgg") {
            this._fire._tiled.script.startEnergyEggTestGame(function () {
                complete();
            });
        }
        else if (type == "damageDouble") {
            this._fire._tiled.script.startDamageDoubleTestGame(function () {
                complete();
            });
        }
        else if (type == "speedDouble") {
            this._fire._tiled.script.startSpeedDoubleTestGame(function () {
                complete();
            });
        }
        else if (type == "spreadBullet") {
            this._fire._tiled.script.startSpreadBulletTestGame(function () {
                complete();
            });
        }
        else if (type == "bounceObstacle") {
            this._fire._tiled.script.startBounceObstacleTestGame(function () {
                complete();
            });
        }
        else if (type == "blackHole") {
            this._fire._tiled.script.startBlackHoleTestGame(function () {
                complete();
            });
        }
        else if (type == "clusterBomb") {
            this._fire._tiled.script.startClusterBombTestGame(function () {
                complete();
            });
        }
        else {
            this._fire._tiled.script.startPlayerHitTestGame(complete);
        }
    };
    GameMain.prototype._resetGameBeforeTest = function () {
        yyp.eventCenter.emit("sacrifice-button-visible", { visible: false });
        yyp.eventCenter.emit("cover-button-state", { visible: false });
        this._fire._recommendBtns.runAction(cc.moveTo(0.1, 600, 120));
        this._fire._lyStart.active = false;
        this._fire._joystick.active = false;
        this._fire._ui.active = false;
        this._fire._nUpdate.active = false;
        if (this._fire._tiled && this._fire._tiled.script) {
            this._fire._tiled.script.cleanMap();
            this._fire._tiled.script.resume();
        }
        yyp.eventCenter.emit("joy-stick", { dir: cc.v2(0, 1), ratio: 0 });
        yyp.eventCenter.emit("charge-cannon-clear", {});
        yyp.eventCenter.emit("skill-button-mode", { mode: "charge" });
    };
    GameMain.prototype._hideTestPanel = function (event) {
        if (event === void 0) { event = null; }
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        if (this._testPanel && cc.isValid(this._testPanel)) {
            this._testPanel.active = false;
        }
    };
    GameMain.prototype._destroyTestPanel = function () {
        if (this._testPanel && cc.isValid(this._testPanel)) {
            this._testPanel.destroy();
        }
        this._testPanel = null;
    };
    GameMain.prototype._getCurrentPlayer = function () {
        var tiled = this._fire._tiled;
        if (!tiled || !tiled.script || !tiled.script._player || !cc.isValid(tiled.script._player)) {
            return null;
        }
        return tiled.script._player;
    };
    GameMain.prototype._showUpgradeChoicePanel = function (mode) {
        if (mode === void 0) { mode = "upgrade"; }
        var player = this._getCurrentPlayer();
        if (!player) {
            return;
        }
        this._destroyUpgradeChoicePanel();
        this._upgradeChoiceMode = mode;
        yyp.eventCenter.emit("game-pause", {});
        var panel = new cc.Node("_upgradeChoicePanel");
        panel.parent = this.node;
        panel.setContentSize(1280, 720);
        panel.zIndex = 2100;
        panel.addComponent(cc.BlockInputEvents);
        this._upgradeChoicePanel = panel;
        var mask = new cc.Node("_upgradeChoiceMask");
        mask.parent = panel;
        mask.setContentSize(1280, 720);
        var maskGraphics = mask.addComponent(cc.Graphics);
        maskGraphics.fillColor = cc.color(0, 0, 0, 168);
        maskGraphics.rect(-640, -360, 1280, 720);
        maskGraphics.fill();
        var dialog = new cc.Node("_upgradeChoiceDialog");
        dialog.parent = panel;
        dialog.setContentSize(980, 430);
        dialog.zIndex = 1;
        var dialogGraphics = dialog.addComponent(cc.Graphics);
        dialogGraphics.fillColor = cc.color(22, 26, 38, 245);
        dialogGraphics.roundRect(-490, -215, 980, 430, 24);
        dialogGraphics.fill();
        dialogGraphics.lineWidth = 3;
        dialogGraphics.strokeColor = cc.color(255, 255, 255, 120);
        dialogGraphics.roundRect(-490, -215, 980, 430, 24);
        dialogGraphics.stroke();
        dialog.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
        }, this);
        var title = mode == "mutation" ? "选择一种子弹质变" : "选择一项升级";
        var tips = mode == "mutation" ? "3选1，选中后立刻替换当前子弹" : "3选1，立即生效";
        this._createUpgradePanelLabel(dialog, "_lbUpgradeTitle", title, cc.v2(0, 160), 36, cc.color(255, 255, 255, 255));
        this._createUpgradePanelLabel(dialog, "_lbUpgradeTips", tips, cc.v2(0, 118), 22, cc.color(200, 210, 225, 255));
        var choices = mode == "mutation"
            ? player.script.getTestBulletMutationChoices()
            : player.script.getTestUpgradeChoices();
        var startX = -280;
        for (var i = 0; i < choices.length; i++) {
            var card = this._createUpgradeChoiceCard(dialog, choices[i], cc.v2(startX + i * 280, -10));
            card.opacity = 0;
            card.scaleX = 0.05;
            card.scaleY = 0.92;
            card.runAction(cc.sequence(cc.delayTime(i * 0.05), cc.spawn(cc.fadeIn(0.08), cc.scaleTo(0.12, 1.12, 1.06)), cc.scaleTo(0.07, 0.96, 1.02), cc.scaleTo(0.06, 1.03, 0.99), cc.scaleTo(0.05, 1, 1)));
        }
    };
    GameMain.prototype._createUpgradePanelLabel = function (parent, name, text, pos, fontSize, color) {
        var labelNode = new cc.Node(name);
        labelNode.parent = parent;
        labelNode.setPosition(pos);
        labelNode.setContentSize(700, fontSize + 10);
        labelNode.color = color;
        var label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = fontSize + 4;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return labelNode;
    };
    GameMain.prototype._createUpgradeChoiceCard = function (parent, choice, pos) {
        var card = new cc.Node("_card_" + choice.id);
        card.parent = parent;
        card.setPosition(pos);
        card.setContentSize(240, 270);
        card["__upgradeChoice"] = choice;
        var graphics = card.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(38, 43, 58, 245);
        graphics.roundRect(-120, -135, 240, 270, 18);
        graphics.fill();
        graphics.lineWidth = 4;
        graphics.strokeColor = choice.color;
        graphics.roundRect(-120, -135, 240, 270, 18);
        graphics.stroke();
        var glow = new cc.Node("_cardGlow");
        glow.parent = card;
        var glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(choice.color.r, choice.color.g, choice.color.b, 34);
        glowGraphics.roundRect(-112, -127, 224, 254, 16);
        glowGraphics.fill();
        var icon = new cc.Node("_cardIcon");
        icon.parent = card;
        icon.setPosition(0, 74);
        var iconGraphics = icon.addComponent(cc.Graphics);
        iconGraphics.fillColor = choice.color;
        iconGraphics.circle(0, 0, 34);
        iconGraphics.fill();
        iconGraphics.lineWidth = 3;
        iconGraphics.strokeColor = cc.color(255, 255, 255, 220);
        iconGraphics.circle(0, 0, 34);
        iconGraphics.stroke();
        var iconLabelNode = new cc.Node("_cardIconLabel");
        iconLabelNode.parent = icon;
        iconLabelNode.setContentSize(78, 40);
        var iconLabel = iconLabelNode.addComponent(cc.Label);
        iconLabel.string = choice.shortLabel;
        iconLabel.fontSize = choice.shortLabel.length > 2 ? 18 : 22;
        iconLabel.lineHeight = 24;
        iconLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        iconLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        this._createUpgradePanelLabel(card, "_cardTitle", choice.title, cc.v2(0, 16), 28, cc.color(255, 255, 255, 255));
        this._createUpgradePanelLabel(card, "_cardValue", choice.valueText, cc.v2(0, -34), 40, choice.color);
        var descNode = new cc.Node("_cardDesc");
        descNode.parent = card;
        descNode.setPosition(0, -92);
        descNode.setContentSize(190, 56);
        descNode.color = cc.color(200, 210, 225, 220);
        var descLabel = descNode.addComponent(cc.Label);
        descLabel.string = choice.desc;
        descLabel.fontSize = 20;
        descLabel.lineHeight = 26;
        descLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        descLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        card.on(cc.Node.EventType.TOUCH_END, this._onUpgradeChoiceSelect, this);
        return card;
    };
    GameMain.prototype._onUpgradeChoiceSelect = function (event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        var card = event ? event.currentTarget : null;
        var choice = card ? card["__upgradeChoice"] : null;
        var player = this._getCurrentPlayer();
        if (!choice || !player || !player.script) {
            this._hideUpgradeChoicePanel();
            return;
        }
        MusicManager_1.MusicManager.playEffect("btnLUp");
        this._hideUpgradeChoicePanel();
        if (this._upgradeChoiceMode == "mutation" && player.script.applyTestBulletMutationChoice) {
            player.script.applyTestBulletMutationChoice(choice);
        }
        else {
            player.script.applyTestUpgradeChoice(choice);
        }
    };
    GameMain.prototype._hideUpgradeChoicePanel = function (resumeGame) {
        if (resumeGame === void 0) { resumeGame = true; }
        if (this._upgradeChoicePanel && cc.isValid(this._upgradeChoicePanel)) {
            this._upgradeChoicePanel.destroy();
        }
        this._upgradeChoicePanel = null;
        if (resumeGame) {
            yyp.eventCenter.emit("game-resume", {});
        }
    };
    GameMain.prototype._destroyUpgradeChoicePanel = function () {
        if (this._upgradeChoicePanel && cc.isValid(this._upgradeChoicePanel)) {
            this._upgradeChoicePanel.destroy();
        }
        this._upgradeChoicePanel = null;
        this._upgradeChoiceMode = "upgrade";
    };
    // ---------- 多人模式 ----------
    GameMain.prototype._showMultiplayerStatus = function (text) {
        if (this._multiplayerStatus && cc.isValid(this._multiplayerStatus)) {
            this._multiplayerStatus.active = true;
            this._multiplayerStatus.getComponent(cc.Label).string = text;
            return;
        }
        var node = new cc.Node("_multiplayerStatus");
        node.parent = this.node;
        node.setPosition(cc.v2(0, 200));
        node.setContentSize(600, 60);
        node.zIndex = 3000;
        var label = node.addComponent(cc.Label);
        label.string = text;
        label.fontSize = 32;
        label.lineHeight = 40;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        node.color = cc.color(255, 255, 100, 255);
        this._multiplayerStatus = node;
    };
    GameMain.prototype._hideMultiplayerStatus = function () {
        if (this._multiplayerStatus && cc.isValid(this._multiplayerStatus)) {
            this._multiplayerStatus.destroy();
        }
        this._multiplayerStatus = null;
    };
    GameMain.prototype._ensureMultiplayerHud = function () {
        if (this._multiplayerHud && cc.isValid(this._multiplayerHud)) {
            return this._multiplayerHud;
        }
        var root = new cc.Node("_multiplayerHud");
        root.parent = this.node;
        root.zIndex = 2990;
        root.setPosition(0, yyp.safeTopBottom - 78);
        root.setContentSize(640, 72);
        var bg = root.addComponent(cc.Graphics);
        bg.fillColor = cc.color(0, 0, 0, 110);
        bg.roundRect(-320, -32, 640, 64, 12);
        bg.fill();
        var title = new cc.Node("_title");
        title.parent = root;
        title.setPosition(0, 12);
        var titleLabel = title.addComponent(cc.Label);
        titleLabel.fontSize = 30;
        titleLabel.lineHeight = 34;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        titleLabel.string = "";
        var sub = new cc.Node("_sub");
        sub.parent = root;
        sub.setPosition(0, -18);
        var subLabel = sub.addComponent(cc.Label);
        subLabel.fontSize = 22;
        subLabel.lineHeight = 26;
        subLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        subLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        subLabel.string = "";
        root["_titleLabel"] = titleLabel;
        root["_subLabel"] = subLabel;
        this._multiplayerHud = root;
        return root;
    };
    GameMain.prototype._hideMultiplayerHud = function () {
        this._multiplayerHudState = null;
        this._hideMultiplayerMinimap();
        if (this._multiplayerHud && cc.isValid(this._multiplayerHud)) {
            this._multiplayerHud.destroy();
        }
        this._multiplayerHud = null;
    };
    GameMain.prototype._applyMultiplayerHudState = function (hud) {
        if (!hud) {
            this._hideMultiplayerHud();
            return;
        }
        this._multiplayerHudState = hud;
        var root = this._ensureMultiplayerHud();
        root.active = true;
        var titleLabel = root["_titleLabel"];
        var subLabel = root["_subLabel"];
        var aliveCount = hud.aliveCount == null ? 0 : hud.aliveCount;
        var totalPlayers = hud.totalPlayers == null ? 0 : hud.totalPlayers;
        var phaseText = hud.phaseText || "战斗中";
        if (titleLabel) {
            titleLabel.string = phaseText + "  |  剩余 " + aliveCount + "/" + totalPlayers;
        }
        if (subLabel) {
            subLabel.string = hud.secondaryText || "";
        }
    };
    GameMain.prototype._showMultiplayerAnnouncement = function (text, subText, style, duration) {
        var _this = this;
        if (subText === void 0) { subText = ""; }
        if (style === void 0) { style = "info"; }
        if (duration === void 0) { duration = 2.2; }
        if (!text) {
            return;
        }
        if (this._multiplayerAnnouncement && cc.isValid(this._multiplayerAnnouncement)) {
            this._multiplayerAnnouncement.stopAllActions();
            this._multiplayerAnnouncement.destroy();
            this._multiplayerAnnouncement = null;
        }
        var root = new cc.Node("_multiplayerAnnouncement");
        root.parent = this.node;
        root.zIndex = 3100;
        root.setPosition(0, 110);
        root.opacity = 0;
        var bg = root.addComponent(cc.Graphics);
        var styleColor = cc.color(46, 122, 255, 170);
        if (style === "warning") {
            styleColor = cc.color(255, 152, 48, 180);
        }
        else if (style === "danger") {
            styleColor = cc.color(255, 74, 74, 185);
        }
        else if (style === "event") {
            styleColor = cc.color(110, 85, 255, 180);
        }
        else if (style === "notice") {
            styleColor = cc.color(52, 190, 120, 175);
        }
        bg.fillColor = styleColor;
        bg.roundRect(-280, -50, 560, subText ? 100 : 68, 14);
        bg.fill();
        var title = new cc.Node("_title");
        title.parent = root;
        title.setPosition(0, subText ? 16 : 0);
        var titleLabel = title.addComponent(cc.Label);
        titleLabel.string = text;
        titleLabel.fontSize = 34;
        titleLabel.lineHeight = 38;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        if (subText) {
            var sub = new cc.Node("_sub");
            sub.parent = root;
            sub.setPosition(0, -20);
            var subLabel = sub.addComponent(cc.Label);
            subLabel.string = subText;
            subLabel.fontSize = 22;
            subLabel.lineHeight = 26;
            subLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            subLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        }
        root.runAction(cc.sequence(cc.fadeIn(0.12), cc.delayTime(Math.max(0.8, duration || 2.2)), cc.fadeOut(0.2), cc.callFunc(function () {
            if (_this._multiplayerAnnouncement === root) {
                _this._multiplayerAnnouncement = null;
            }
            if (cc.isValid(root)) {
                root.destroy();
            }
        })));
        this._multiplayerAnnouncement = root;
    };
    GameMain.prototype._hideMultiplayerAnnouncement = function () {
        if (this._multiplayerAnnouncement && cc.isValid(this._multiplayerAnnouncement)) {
            this._multiplayerAnnouncement.stopAllActions();
            this._multiplayerAnnouncement.destroy();
        }
        this._multiplayerAnnouncement = null;
    };
    GameMain.prototype._ensureMultiplayerMinimap = function () {
        if (this._multiplayerMinimap && cc.isValid(this._multiplayerMinimap)) {
            return this._multiplayerMinimap;
        }
        var root = new cc.Node("_multiplayerMinimap");
        root.parent = this.node;
        root.zIndex = 3005;
        root.setPosition(this._getMultiplayerMinimapRootPosition());
        root.setContentSize(MULTIPLAYER_MINIMAP_WIDTH, MULTIPLAYER_MINIMAP_HEIGHT);
        var frame = root.addComponent(cc.Graphics);
        frame.fillColor = cc.color(0, 0, 0, 120);
        frame.roundRect(-MULTIPLAYER_MINIMAP_WIDTH / 2, -MULTIPLAYER_MINIMAP_HEIGHT / 2, MULTIPLAYER_MINIMAP_WIDTH, MULTIPLAYER_MINIMAP_HEIGHT, 10);
        frame.fill();
        frame.lineWidth = 2;
        frame.strokeColor = cc.color(255, 255, 255, 90);
        frame.roundRect(-MULTIPLAYER_MINIMAP_WIDTH / 2, -MULTIPLAYER_MINIMAP_HEIGHT / 2, MULTIPLAYER_MINIMAP_WIDTH, MULTIPLAYER_MINIMAP_HEIGHT, 10);
        frame.stroke();
        var title = new cc.Node("_title");
        title.parent = root;
        title.setPosition(0, MULTIPLAYER_MINIMAP_HEIGHT / 2 + 16);
        var titleLabel = title.addComponent(cc.Label);
        titleLabel.string = "战场总览";
        titleLabel.fontSize = 20;
        titleLabel.lineHeight = 22;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        title.color = cc.color(220, 240, 255, 255);
        var viewport = new cc.Node("_viewport");
        viewport.parent = root;
        viewport.setContentSize(MULTIPLAYER_MINIMAP_WIDTH - 14, MULTIPLAYER_MINIMAP_HEIGHT - 14);
        var bg = viewport.addComponent(cc.Graphics);
        bg.fillColor = cc.color(22, 38, 28, 220);
        bg.rect(-viewport.width / 2, -viewport.height / 2, viewport.width, viewport.height);
        bg.fill();
        var safeZoneLayer = new cc.Node("_safeZoneLayer");
        safeZoneLayer.parent = viewport;
        var safeZoneGraphics = safeZoneLayer.addComponent(cc.Graphics);
        var playerMarker = new cc.Node("_playerMarker");
        playerMarker.parent = viewport;
        var playerMarkerGraphics = playerMarker.addComponent(cc.Graphics);
        root["_viewport"] = viewport;
        root["_safeZoneGraphics"] = safeZoneGraphics;
        root["_playerMarker"] = playerMarker;
        root["_playerMarkerGraphics"] = playerMarkerGraphics;
        this._multiplayerMinimap = root;
        this._multiplayerMinimapSafeZoneRenderKey = "";
        this._refreshMultiplayerMinimapViewport();
        this._refreshMultiplayerMinimapSafeZone(true);
        this._refreshMultiplayerMinimapMarker();
        return root;
    };
    GameMain.prototype._hideMultiplayerMinimap = function () {
        if (this._multiplayerMinimapUpdateCallback) {
            this.unschedule(this._multiplayerMinimapUpdateCallback);
            this._multiplayerMinimapUpdateCallback = null;
        }
        if (this._multiplayerMinimap && cc.isValid(this._multiplayerMinimap)) {
            this._multiplayerMinimap.destroy();
        }
        this._multiplayerMinimap = null;
        this._multiplayerMinimapSafeZoneRenderKey = "";
    };
    GameMain.prototype._getMultiplayerMinimapRootPosition = function () {
        var frameSize = yyp.gameFrameSize || cc.view.getVisibleSize() || cc.winSize;
        var width = frameSize && frameSize.width > 0 ? frameSize.width : 1280;
        var height = frameSize && frameSize.height > 0 ? frameSize.height : 720;
        var x = width / 2 - MULTIPLAYER_MINIMAP_WIDTH / 2 - MULTIPLAYER_MINIMAP_MARGIN_RIGHT;
        var y = height / 2 - MULTIPLAYER_MINIMAP_HEIGHT / 2 - MULTIPLAYER_MINIMAP_MARGIN_TOP;
        return cc.v2(x, y);
    };
    GameMain.prototype._scheduleMultiplayerMinimapRefresh = function () {
        this._hideMultiplayerMinimap();
        this._ensureMultiplayerMinimap();
        var self = this;
        this._multiplayerMinimapUpdateCallback = function () {
            if (!self._multiplayerActive) {
                return;
            }
            if (self._multiplayerMinimap && cc.isValid(self._multiplayerMinimap)) {
                self._multiplayerMinimap.setPosition(self._getMultiplayerMinimapRootPosition());
            }
            self._refreshMultiplayerMinimapViewport();
            self._refreshMultiplayerMinimapMarker();
        };
        this.schedule(this._multiplayerMinimapUpdateCallback, MULTIPLAYER_MINIMAP_MARKER_UPDATE_INTERVAL, cc.macro.REPEAT_FOREVER);
    };
    GameMain.prototype._refreshMultiplayerMinimapViewport = function () {
        var root = this._multiplayerMinimap;
        if (!root || !cc.isValid(root) || !this._multiplayerActive) {
            return;
        }
        if (root.parent !== this.node) {
            root.parent = this.node;
        }
        root.setPosition(this._getMultiplayerMinimapRootPosition());
    };
    GameMain.prototype._getMultiplayerMinimapMapContext = function () {
        var root = this._multiplayerMinimap;
        if (!root || !cc.isValid(root) || !this._multiplayerActive) {
            return null;
        }
        var viewport = root["_viewport"];
        var safeZoneGraphics = root["_safeZoneGraphics"];
        var playerMarker = root["_playerMarker"];
        var playerMarkerGraphics = root["_playerMarkerGraphics"];
        if (!viewport || !safeZoneGraphics || !playerMarker || !playerMarkerGraphics) {
            return null;
        }
        var tiled = this._fire._tiled;
        var mapScript = tiled && tiled.script ? tiled.script : null;
        var mapBounds = mapScript && mapScript.getMapBounds ? mapScript.getMapBounds() : null;
        if (!mapBounds) {
            return null;
        }
        var halfWidth = Math.max(1, mapBounds.halfWidth || 1);
        var halfHeight = Math.max(1, mapBounds.halfHeight || 1);
        var mapPosToMinimap = function (pos) {
            var x = ((pos.x + halfWidth) / (halfWidth * 2)) * viewport.width - viewport.width / 2;
            var y = ((pos.y + halfHeight) / (halfHeight * 2)) * viewport.height - viewport.height / 2;
            return cc.v2(Math.max(-viewport.width / 2, Math.min(viewport.width / 2, x)), Math.max(-viewport.height / 2, Math.min(viewport.height / 2, y)));
        };
        return {
            root: root,
            viewport: viewport,
            safeZoneGraphics: safeZoneGraphics,
            playerMarker: playerMarker,
            playerMarkerGraphics: playerMarkerGraphics,
            mapScript: mapScript,
            mapBounds: mapBounds,
            halfWidth: halfWidth,
            halfHeight: halfHeight,
            mapPosToMinimap: mapPosToMinimap,
        };
    };
    GameMain.prototype._refreshMultiplayerMinimapMarker = function () {
        var context = this._getMultiplayerMinimapMapContext();
        if (!context) {
            return;
        }
        var player = this._getLocalMultiplayerPlayer();
        if (!player || !cc.isValid(player)) {
            context.playerMarker.active = false;
            return;
        }
        var playerPos = context.mapPosToMinimap(player.position);
        var playerMarker = context.playerMarker;
        var playerMarkerGraphics = context.playerMarkerGraphics;
        playerMarker.active = true;
        playerMarker.setPosition(playerPos);
        playerMarkerGraphics.clear();
        playerMarkerGraphics.fillColor = cc.color(255, 235, 110, 255);
        playerMarkerGraphics.circle(0, 0, 5);
        playerMarkerGraphics.fill();
        playerMarkerGraphics.lineWidth = 2;
        playerMarkerGraphics.strokeColor = cc.color(255, 255, 255, 220);
        playerMarkerGraphics.circle(0, 0, 8);
        playerMarkerGraphics.stroke();
    };
    GameMain.prototype._buildMultiplayerMinimapSafeZoneRenderKey = function (safeZone, context) {
        if (!safeZone || !context) {
            return "none";
        }
        return [
            Math.round((safeZone.centerX || 0) * 10) / 10,
            Math.round((safeZone.centerY || 0) * 10) / 10,
            Math.round((safeZone.radius || 0) * 10) / 10,
            !!safeZone.active,
            !!safeZone.finished,
            !!safeZone.poisonActive,
            Math.round((safeZone.poisonRemaining || 0) * 10) / 10,
            context.viewport.width,
            context.viewport.height,
            Math.round(context.halfWidth * 10) / 10,
            Math.round(context.halfHeight * 10) / 10,
        ].join("|");
    };
    GameMain.prototype._refreshMultiplayerMinimapSafeZone = function (force) {
        if (force === void 0) { force = false; }
        var context = this._getMultiplayerMinimapMapContext();
        if (!context) {
            return;
        }
        var safeZoneGraphics = context.safeZoneGraphics;
        var safeZone = context.mapScript && context.mapScript.getMultiplayerSafeZoneState
            ? context.mapScript.getMultiplayerSafeZoneState()
            : null;
        var renderKey = this._buildMultiplayerMinimapSafeZoneRenderKey(safeZone, context);
        if (!force && renderKey === this._multiplayerMinimapSafeZoneRenderKey) {
            return;
        }
        this._multiplayerMinimapSafeZoneRenderKey = renderKey;
        safeZoneGraphics.clear();
        if (!safeZone || !Number.isFinite(safeZone.radius) || safeZone.radius <= 0) {
            return;
        }
        var center = context.mapPosToMinimap(cc.v2(safeZone.centerX || 0, safeZone.centerY || 0));
        var radiusX = Math.max(2, safeZone.radius / (context.halfWidth * 2) * context.viewport.width);
        var radiusY = Math.max(2, safeZone.radius / (context.halfHeight * 2) * context.viewport.height);
        safeZoneGraphics.fillColor = safeZone.poisonActive
            ? cc.color(255, 120, 120, 10)
            : cc.color(88, 170, 255, safeZone.active ? 22 : 10);
        safeZoneGraphics.ellipse(center.x, center.y, radiusX, radiusY);
        safeZoneGraphics.fill();
        safeZoneGraphics.lineWidth = safeZone.poisonActive ? 3 : 2;
        safeZoneGraphics.strokeColor = safeZone.poisonActive ? cc.color(255, 130, 130, 230) : cc.color(120, 220, 255, 230);
        safeZoneGraphics.ellipse(center.x, center.y, radiusX, radiusY);
        safeZoneGraphics.stroke();
    };
    GameMain.prototype._consumeMultiplayerFrameMeta = function (command) {
        if (!command || !command.type) {
            return false;
        }
        if (command.type === "hudState") {
            this._applyMultiplayerHudState(command.hud || null);
            return true;
        }
        if (command.type === "announcement") {
            this._showMultiplayerAnnouncement(command.text || "", command.subText || "", command.style || "info", command.duration || 2.2);
            return true;
        }
        if (command.type === "safeZoneState") {
            this._refreshMultiplayerMinimapSafeZone();
            return false;
        }
        if (command.type === "matchResult") {
            return true;
        }
        return false;
    };
    GameMain.prototype._onMultiplayerHitReport = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event || !event.id) {
            return;
        }
        this._multiplayerHitQueue.push({
            id: event.id,
            tgid: event.tgid,
            hp: event.hp == null ? -1 : event.hp,
            damage: event.damage == null ? -1 : event.damage,
        });
    };
    GameMain.prototype._nextMultiplayerBulletId = function () {
        var playerId = this._netManager ? this._netManager.playerId : 0;
        var id = playerId + "_" + this._multiplayerFireSeq;
        this._multiplayerFireSeq++;
        return id;
    };
    GameMain.prototype._getLocalMultiplayerPlayer = function () {
        return this._getCurrentPlayer();
    };
    GameMain.prototype._buildMultiplayerFireCommand = function () {
        var player = this._getLocalMultiplayerPlayer();
        var fireType = 1;
        if (player && player.script && player.script.getMultiplayerFireType) {
            fireType = player.script.getMultiplayerFireType();
        }
        return {
            id: this._nextMultiplayerBulletId(),
            type: fireType,
        };
    };
    GameMain.prototype._createDefaultMultiplayerInputs = function () {
        return {
            up: false,
            down: false,
            left: false,
            right: false,
            aim: null,
            fire: false,
            hit: false,
            pickupEnergyId: null,
            pickupTarId: null,
            pickupBlackHoleId: null,
            throwTar: false,
            throwBlackHole: false,
        };
    };
    GameMain.prototype._ensureMultiplayerInputs = function () {
        if (!this._multiplayerInputs) {
            this._multiplayerInputs = this._createDefaultMultiplayerInputs();
        }
        if (this._multiplayerInputs.pickupEnergyId === undefined) {
            this._multiplayerInputs.pickupEnergyId = null;
        }
        if (this._multiplayerInputs.pickupTarId === undefined) {
            this._multiplayerInputs.pickupTarId = null;
        }
        if (this._multiplayerInputs.pickupBlackHoleId === undefined) {
            this._multiplayerInputs.pickupBlackHoleId = null;
        }
        if (this._multiplayerInputs.aim === undefined) {
            this._multiplayerInputs.aim = null;
        }
        if (this._multiplayerInputs.throwTar === undefined) {
            this._multiplayerInputs.throwTar = false;
        }
        if (this._multiplayerInputs.throwBlackHole === undefined) {
            this._multiplayerInputs.throwBlackHole = false;
        }
        return this._multiplayerInputs;
    };
    GameMain.prototype._clearMultiplayerOneShotInputs = function () {
        var inputs = this._ensureMultiplayerInputs();
        inputs.fire = false;
        inputs.hit = false;
        inputs.pickupEnergyId = null;
        inputs.pickupTarId = null;
        inputs.pickupBlackHoleId = null;
        if (this._multiplayerTarThrowRepeat > 0) {
            this._multiplayerTarThrowRepeat--;
            if (this._multiplayerTarThrowRepeat <= 0) {
                this._multiplayerTarThrowRepeat = 0;
                inputs.throwTar = false;
                inputs.throwBlackHole = false;
            }
        }
        else {
            inputs.throwTar = false;
            inputs.throwBlackHole = false;
        }
    };
    GameMain.prototype._flushMultiplayerInputsNow = function () {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !this._netManager || !this._netManager.connected) {
            return;
        }
        this._netManager.sendInput(this._buildMultiplayerInputPacket());
        this._clearMultiplayerOneShotInputs();
    };
    GameMain.prototype._buildMultiplayerInputPacket = function () {
        var source = this._ensureMultiplayerInputs();
        var hit = this._multiplayerHitQueue.length > 0 ? this._multiplayerHitQueue.shift() : false;
        var bulletEvents = this._multiplayerBulletEventQueue.length > 0
            ? this._multiplayerBulletEventQueue.splice(0, this._multiplayerBulletEventQueue.length)
            : [];
        var pickupEnergyId = source.pickupEnergyId == null ? null : source.pickupEnergyId;
        var pickupTarId = source.pickupTarId == null ? null : source.pickupTarId;
        var pickupBlackHoleId = source.pickupBlackHoleId == null ? null : source.pickupBlackHoleId;
        var aim = null;
        if (source.aim && Number.isFinite(source.aim.x) && Number.isFinite(source.aim.y)) {
            aim = {
                x: Number(source.aim.x.toFixed(4)),
                y: Number(source.aim.y.toFixed(4)),
            };
        }
        return {
            up: !!source.up,
            down: !!source.down,
            left: !!source.left,
            right: !!source.right,
            aim: aim,
            fire: source.fire ? source.fire : false,
            hit: hit || false,
            bulletEvents: bulletEvents,
            pickupEnergyId: pickupEnergyId,
            pickupTarId: pickupTarId,
            pickupBlackHoleId: pickupBlackHoleId,
            throwTar: source.throwTar ? source.throwTar : false,
            throwBlackHole: source.throwBlackHole ? source.throwBlackHole : false,
            playerSnapshot: this._buildLocalMultiplayerPlayerSnapshot(),
        };
    };
    GameMain.prototype._buildLocalMultiplayerPlayerSnapshot = function () {
        var player = this._getLocalMultiplayerPlayer();
        if (!player || !player.script) {
            return null;
        }
        var dir = player.script._dir && player.script._dir.magSqr() > 0
            ? cc.v2(player.script._dir).normalize()
            : cc.v2(1, 0);
        return {
            x: Math.round(player.x),
            y: Math.round(player.y),
            dirX: Number(dir.x.toFixed(4)),
            dirY: Number(dir.y.toFixed(4)),
            speed: Number((player.script._currentSpeed || 0).toFixed(3)),
            radius: player.script.getRadius ? player.script.getRadius() : 38,
        };
    };
    GameMain.prototype._buildMultiplayerPlayerSetup = function () {
        var energySpawnPoints = [];
        var mapBounds = null;
        var spawnCandidates = [];
        if (this._fire && this._fire._tiled && this._fire._tiled.script && this._fire._tiled.script.getMultiplayerEnergySpawnPoints) {
            energySpawnPoints = this._fire._tiled.script.getMultiplayerEnergySpawnPoints(512);
        }
        if (this._fire && this._fire._tiled && this._fire._tiled.script && this._fire._tiled.script.getMultiplayerMapBounds) {
            mapBounds = this._fire._tiled.script.getMultiplayerMapBounds();
        }
        if (this._fire && this._fire._tiled && this._fire._tiled.script && this._fire._tiled.script.getMultiplayerSpawnCandidates) {
            spawnCandidates = this._fire._tiled.script.getMultiplayerSpawnCandidates();
        }
        var bushSpawnPoints = [];
        if (this._fire && this._fire._tiled && this._fire._tiled.script && this._fire._tiled.script.getMultiplayerBushSpawnPoints) {
            bushSpawnPoints = this._fire._tiled.script.getMultiplayerBushSpawnPoints();
        }
        return {
            tankType: MULTIPLAYER_DEFAULT_TANK_TYPE,
            playerLevel: MULTIPLAYER_FIXED_PLAYER_LEVEL,
            baseHp: MULTIPLAYER_FIXED_BASE_HP,
            baseAtk: MULTIPLAYER_FIXED_BASE_ATK,
            baseSpeed: MULTIPLAYER_FIXED_BASE_SPEED,
            baseAttackRadius: MULTIPLAYER_FIXED_ATTACK_RADIUS,
            energySpawnPoints: energySpawnPoints,
            mapBounds: mapBounds,
            spawnCandidates: spawnCandidates,
            bushSpawnPoints: bushSpawnPoints,
        };
    };
    GameMain.prototype._onMultiplayerPlayerDeath = function (event) {
        if (!this._multiplayerActive || !event) {
            return;
        }
        if (event.isLocal) {
            this._multiplayerLocalDead = true;
            this._showMultiplayerStatus("你已被淘汰，等待本局结算...");
            this._showMultiplayerAnnouncement("你已被淘汰", "等待其余玩家决出胜负", "warning", 2.2);
        }
    };
    GameMain.prototype._onMultiplayerEnergyPickup = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event || event.energyId == null) {
            return;
        }
        var inputs = this._ensureMultiplayerInputs();
        inputs.pickupEnergyId = event.energyId;
    };
    GameMain.prototype._onMultiplayerTarPickup = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event || event.pickupId == null) {
            return;
        }
        var inputs = this._ensureMultiplayerInputs();
        inputs.pickupTarId = event.pickupId;
    };
    GameMain.prototype._onMultiplayerBlackHolePickup = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event || event.pickupId == null) {
            return;
        }
        var inputs = this._ensureMultiplayerInputs();
        inputs.pickupBlackHoleId = event.pickupId;
    };
    GameMain.prototype._onMultiplayerThrowTar = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event) {
            return;
        }
        var inputs = this._ensureMultiplayerInputs();
        inputs.throwTar = {
            dirX: event.dirX,
            dirY: event.dirY,
            ratio: event.ratio,
        };
        this._multiplayerTarThrowRepeat = 4;
        this._flushMultiplayerInputsNow();
    };
    GameMain.prototype._onMultiplayerThrowBlackHole = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event) {
            return;
        }
        var inputs = this._ensureMultiplayerInputs();
        inputs.throwBlackHole = {
            dirX: event.dirX,
            dirY: event.dirY,
            ratio: event.ratio,
        };
        this._multiplayerTarThrowRepeat = 4;
        this._flushMultiplayerInputsNow();
    };
    GameMain.prototype._onMultiplayerBulletEvent = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event || !event.type || !event.bulletId) {
            return;
        }
        this._multiplayerBulletEventQueue.push({
            type: event.type,
            bulletId: event.bulletId,
            eventId: event.eventId == null ? null : event.eventId,
            reason: event.reason || "",
        });
        if (this._multiplayerBulletEventQueue.length > 12) {
            this._multiplayerBulletEventQueue.splice(0, this._multiplayerBulletEventQueue.length - 12);
        }
    };
    GameMain.prototype._updateMultiplayerStatusFromRoomState = function (payload) {
        if (!payload) {
            return;
        }
        if (payload.state == "waiting") {
            this._showMultiplayerStatus("等待玩家加入 (" + payload.playerCount + "/" + payload.minPlayers + "-" + payload.maxPlayers + ")");
        }
        else if (payload.state == "countdown") {
            this._showMultiplayerStatus("游戏倒计时 " + payload.countdown + " 秒");
        }
        else if (payload.state == "ended" && !this._multiplayerActive) {
            this._showMultiplayerStatus("本局已结束");
        }
    };
    GameMain.prototype._showMultiplayerFinish = function (isWin, winnerPlayerId) {
        this._fire._lyStart.active = false;
        this._fire._joystick.active = false;
        this._fire._ui.active = false;
        this._fire._nUpdate.script.refreshLevelInfo();
        this._fire._tiled.script.setFinish();
        var finish = cc.instantiate(this.finishPrefab);
        finish.zIndex = 1000;
        Utils_1.Utils.addtoCurrentScene(finish);
        var resultText = "";
        if (winnerPlayerId >= 0) {
            resultText = isWin ? "本局胜利，你获得了最终胜利" : ("本局失利，玩家" + (winnerPlayerId + 1) + "获胜");
        }
        else {
            resultText = "本局平局，等待下一局再战";
        }
        finish.script.setResult(this._levelId, isWin, true, resultText);
        if (winnerPlayerId >= 0) {
            this._showMultiplayerStatus(isWin ? "你获胜了" : ("玩家 " + (winnerPlayerId + 1) + " 获胜"));
        }
        else {
            this._showMultiplayerStatus("本局平局");
        }
    };
    GameMain.prototype._endMultiplayerMatch = function (payload) {
        var winnerPlayerId = payload && payload.winnerPlayerId != null ? payload.winnerPlayerId : -1;
        var localPlayerId = this._netManager ? this._netManager.playerId : -1;
        var isWin = winnerPlayerId >= 0 && winnerPlayerId == localPlayerId;
        this._multiplayerActive = false;
        this._teardownMultiplayerInputLoop();
        this._multiplayerInputs = null;
        this._multiplayerHitQueue = [];
        this._multiplayerBulletEventQueue = [];
        this._multiplayerTarThrowRepeat = 0;
        if (this._netManager) {
            this._netManager.onDisconnect = null;
            this._netManager.disconnect();
            this._netManager = null;
        }
        this._hideMultiplayerHud();
        this._showMultiplayerFinish(isWin, winnerPlayerId);
    };
    GameMain.prototype._startMultiplayerGame = function () {
        var _this = this;
        if (this._netManager) {
            this._netManager.onDisconnect = null;
            this._netManager.disconnect();
            this._netManager = null;
        }
        this._multiplayerActive = false;
        this._multiplayerLocalDead = false;
        this._multiplayerHitQueue = [];
        this._multiplayerBulletEventQueue = [];
        this._multiplayerTarThrowRepeat = 0;
        this._teardownMultiplayerInputLoop();
        this._hideMultiplayerAnnouncement();
        this._hideMultiplayerHud();
        this._resetGameBeforeTest();
        this._hideUpgradeChoicePanel(false);
        this._showMultiplayerStatus("正在连接服务器 ws://172.16.50.45:2567 ...");
        this._netManager = new NetworkManager_1.NetworkManager();
        this._netManager.onCountdown = function (seconds) {
            _this._showMultiplayerStatus("游戏倒计时 " + seconds + " 秒");
        };
        this._netManager.onPlayerCount = function (count, max) {
            _this._showMultiplayerStatus("已连接，等待玩家 (" + count + "/" + max + ")");
        };
        this._netManager.onRoomState = function (payload) {
            _this._updateMultiplayerStatusFromRoomState(payload);
        };
        this._netManager.onConnected = function () {
            if (_this._netManager) {
                _this._netManager.sendPlayerSetup(_this._buildMultiplayerPlayerSetup());
            }
        };
        this._netManager.onGameStart = function (playerId, playerCount, spawnSlots, energies, players, specialEvents, tarPickups, tarSpills, blackHolePickups, blackHoleZones, bushes, safeZone) {
            _this._startMultiplayerMatch(playerId, playerCount || 2, spawnSlots || [], energies || [], players || [], specialEvents || [], tarPickups || [], tarSpills || [], blackHolePickups || [], blackHoleZones || [], bushes || [], safeZone || null);
        };
        this._netManager.onGameEnded = function (payload) {
            _this._endMultiplayerMatch(payload);
        };
        this._netManager.onDisconnect = function () {
            _this._showMultiplayerStatus("连接断开");
            _this._multiplayerActive = false;
            _this._teardownMultiplayerInputLoop();
            _this._hideMultiplayerAnnouncement();
            _this._hideMultiplayerHud();
        };
        this._netManager.connect("ws://172.16.50.45:2567");
    };
    GameMain.prototype._startMultiplayerMatch = function (playerId, playerCount, spawnSlots, energies, players, specialEvents, tarPickups, tarSpills, blackHolePickups, blackHoleZones, bushes, safeZone) {
        if (players === void 0) { players = []; }
        if (specialEvents === void 0) { specialEvents = []; }
        if (tarPickups === void 0) { tarPickups = []; }
        if (tarSpills === void 0) { tarSpills = []; }
        if (blackHolePickups === void 0) { blackHolePickups = []; }
        if (blackHoleZones === void 0) { blackHoleZones = []; }
        if (bushes === void 0) { bushes = []; }
        if (safeZone === void 0) { safeZone = null; }
        this._hideMultiplayerStatus();
        this._hideMultiplayerAnnouncement();
        this._hideMultiplayerHud();
        this._multiplayerActive = true;
        this._multiplayerLocalDead = false;
        this._multiplayerHitQueue = [];
        this._multiplayerBulletEventQueue = [];
        this._multiplayerTarThrowRepeat = 0;
        this._multiplayerFireSeq = 1;
        this._multiplayerInputs = this._createDefaultMultiplayerInputs();
        var self = this;
        this._fire._tiled.script.startMultiplayerGame(playerCount || 2, playerId, spawnSlots || [], energies || [], players || [], specialEvents || [], tarPickups || [], tarSpills || [], blackHolePickups || [], blackHoleZones || [], bushes || [], safeZone || null, function () {
            self._fire._joystick.active = true;
            self._fire._ui.active = true;
            self._scheduleMultiplayerMinimapRefresh();
            self._setupMultiplayerInputLoop();
        });
    };
    GameMain.prototype._teardownMultiplayerInputLoop = function () {
        this.node.stopActionByTag(this._multiplayerInputLoopTag);
        if (this._multiplayerJoyMoveHandler) {
            yyp.eventCenter.off("joy-stick", this._multiplayerJoyMoveHandler);
            this._multiplayerJoyMoveHandler = null;
        }
        if (this._multiplayerJoyShootHandler) {
            yyp.eventCenter.off("joy-stick-shoot", this._multiplayerJoyShootHandler);
            this._multiplayerJoyShootHandler = null;
        }
        if (this._multiplayerCameraFollowCallback) {
            this.unschedule(this._multiplayerCameraFollowCallback);
            this._multiplayerCameraFollowCallback = null;
        }
    };
    GameMain.prototype._setupMultiplayerInputLoop = function () {
        var self = this;
        this._teardownMultiplayerInputLoop();
        // Track movement via joy-stick EVENT (fires ratio:0 on release, reliable)
        this._multiplayerJoyMoveHandler = function (event) {
            if (!self._multiplayerActive || self._multiplayerLocalDead)
                return;
            if (event.ratio > 0 && event.dir && event.dir.magSqr() > 0) {
                self._multiplayerInputs.up = event.dir.y > 0.3;
                self._multiplayerInputs.down = event.dir.y < -0.3;
                self._multiplayerInputs.left = event.dir.x < -0.3;
                self._multiplayerInputs.right = event.dir.x > 0.3;
            }
            else {
                // ratio==0 means finger lifted — clear movement
                self._multiplayerInputs.up = false;
                self._multiplayerInputs.down = false;
                self._multiplayerInputs.left = false;
                self._multiplayerInputs.right = false;
            }
        };
        yyp.eventCenter.on("joy-stick", this._multiplayerJoyMoveHandler);
        // Track fire via event (single-shot event)
        this._multiplayerJoyShootHandler = function (event) {
            if (!self._multiplayerActive || self._multiplayerLocalDead)
                return;
            var inputs = self._ensureMultiplayerInputs();
            if (event.dir && event.dir.magSqr() > 0) {
                var aimDir = cc.v2(event.dir).normalize();
                var player = self._getLocalMultiplayerPlayer();
                if (player && player.script && player.script.updateMultiplayerLocalAimPreview) {
                    player.script.updateMultiplayerLocalAimPreview(aimDir);
                }
                inputs.aim = {
                    x: aimDir.x,
                    y: aimDir.y,
                };
            }
            if (event.fire === true) {
                var player = self._getLocalMultiplayerPlayer();
                if (player && player.script && player.script.canAffordMultiplayerFire && !player.script.canAffordMultiplayerFire()) {
                    if (player.script._freeBulletCount <= 0 && player.script._showLowHpShootTip) {
                        player.script._showLowHpShootTip();
                    }
                    return;
                }
                inputs.fire = self._buildMultiplayerFireCommand();
            }
        };
        yyp.eventCenter.on("joy-stick-shoot", this._multiplayerJoyShootHandler);
        // Frame sync: listen for frame data from server
        this._netManager.onFrame = function (frameData) {
            if (!self._multiplayerActive)
                return;
            var commands = frameData && Array.isArray(frameData.commands) ? frameData.commands : [];
            for (var i = 0; i < commands.length; i++) {
                self._consumeMultiplayerFrameMeta(commands[i]);
            }
            if (self._fire._tiled && self._fire._tiled.script && self._fire._tiled.script.simulateFrame) {
                self._fire._tiled.script.simulateFrame(frameData);
            }
        };
        // Send local inputs at tick rate (20Hz)
        var inputLoop = cc.repeatForever(cc.sequence(cc.delayTime(1 / 20), cc.callFunc(function () {
            if (!self._multiplayerActive || !self._netManager || !self._netManager.connected)
                return;
            if (self._multiplayerLocalDead)
                return;
            self._netManager.sendInput(self._buildMultiplayerInputPacket());
            self._clearMultiplayerOneShotInputs();
            // Camera follow
            if (self._fire._tiled && self._fire._tiled.script) {
                self._fire._tiled.script._centerOnLocalPlayer();
            }
        })));
        inputLoop.setTag(this._multiplayerInputLoopTag);
        this.node.runAction(inputLoop);
        // Smooth camera follow every frame via scheduler
        this._multiplayerCameraFollowCallback = function () {
            if (!self._multiplayerActive)
                return;
            if (self._fire._tiled && self._fire._tiled.script) {
                self._fire._tiled.script._centerOnLocalPlayer();
            }
        };
        this.schedule(this._multiplayerCameraFollowCallback, 0.016, cc.macro.REPEAT_FOREVER);
    };
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "finishPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "settingPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "wishPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "revivePrefab", void 0);
    GameMain = __decorate([
        ccclass
    ], GameMain);
    return GameMain;
}(BaseComponent_1.BaseComponent));
exports.default = GameMain;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsMkRBQTBEO0FBRTFELDRDQUF5QztBQUN6QywwQ0FBdUM7QUFDdkMsMENBQXVDO0FBRWpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQzFDLElBQU0sNkJBQTZCLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLElBQU0sOEJBQThCLEdBQUcsQ0FBQyxDQUFDO0FBQ3pDLElBQU0seUJBQXlCLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLElBQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBQ3RDLElBQU0sNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sK0JBQStCLEdBQUcsR0FBRyxDQUFDO0FBQzVDLElBQU0seUJBQXlCLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLElBQU0sMEJBQTBCLEdBQUcsR0FBRyxDQUFDO0FBQ3ZDLElBQU0sZ0NBQWdDLEdBQUcsRUFBRSxDQUFDO0FBQzVDLElBQU0sOEJBQThCLEdBQUcsRUFBRSxDQUFDO0FBQzFDLElBQU0sMENBQTBDLEdBQUcsS0FBSyxDQUFDO0FBR3pEO0lBQXNDLDRCQUFhO0lBQW5EO1FBQUEscUVBeTJEQztRQXQyREcsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsZ0JBQVUsR0FBZSxJQUFJLENBQUMsQ0FBSSxJQUFJO1FBR3RDLGtCQUFZLEdBQWUsSUFBSSxDQUFDLENBQUksSUFBSTtRQUV4QyxtQkFBbUI7UUFDbkIsY0FBUSxHQUFRLENBQUMsQ0FBQyxDQUFNLE1BQU07UUFFOUIsaUJBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIseUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLHdCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQixpQkFBVyxHQUFHLElBQUksQ0FBQyxDQUFTLFdBQVc7UUFDdkMsd0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUUsUUFBUTtRQUNwQyxxQkFBZSxHQUFHLElBQUksQ0FBQyxDQUFLLFNBQVM7UUFDckMsOEJBQXdCLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTTtRQUN2QywwQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsd0JBQWtCLEdBQUcsS0FBSyxDQUFDLENBQUMsU0FBUztRQUNyQywyQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsOEJBQXdCLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLHdCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQiwwQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFDMUIsa0NBQTRCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLGdDQUEwQixHQUFHLENBQUMsQ0FBQztRQUMvQix5QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDeEIsZ0NBQTBCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGlDQUEyQixHQUFHLElBQUksQ0FBQztRQUNuQyxzQ0FBZ0MsR0FBRyxJQUFJLENBQUM7UUFDeEMseUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLHVDQUFpQyxHQUFHLElBQUksQ0FBQztRQUN6QywwQ0FBb0MsR0FBRyxFQUFFLENBQUM7O0lBazBEOUMsQ0FBQztJQWgwREcseUJBQU0sR0FBTjtRQUNJLE9BQU87UUFDUCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsT0FBTztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVmLFNBQVM7UUFDVCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU87SUFDUCxnQ0FBYSxHQUFiO0lBQ0EsQ0FBQztJQUVELE9BQU87SUFDUCwwQkFBTyxHQUFQO1FBQ0ksUUFBUTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBQyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFDLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELGFBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsU0FBUztJQUNULDZCQUFVLEdBQVY7UUFDSSxtRkFBbUY7UUFDbkYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLE1BQU07UUFDOUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUcsTUFBTTtRQUM5RSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFjLFVBQVU7UUFDbEYsaUZBQWlGO1FBQ2pGLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQXVCLE1BQU07UUFDOUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBdUIsV0FBVztRQUNwRixHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFhLElBQUk7UUFDN0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBa0IsSUFBSTtRQUM1RSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFrQixJQUFJO1FBQzlFLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDakYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JGLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRixHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pGLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RixHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsTUFBTTtJQUNOLGdDQUFhLEdBQWI7UUFDSSxvRkFBb0Y7UUFDcEYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLE1BQU07UUFDL0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUcsTUFBTTtRQUMvRSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFjLFVBQVU7UUFDbkYsa0ZBQWtGO1FBQ2xGLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQXVCLE1BQU07UUFDL0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBdUIsV0FBVztRQUNyRixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFhLElBQUk7UUFDOUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBa0IsSUFBSTtRQUM3RSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFrQixJQUFJO1FBQy9FLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDbEYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RGLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xGLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLE1BQU07UUFDTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUdELE9BQU87SUFDUCxpQ0FBYyxHQUFkLFVBQWUsS0FBSztRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUNqRSxDQUFDO0lBRUQsT0FBTztJQUNQLG9DQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzlFLE9BQU87U0FDVjtRQUNELElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUU7WUFDdkIsNkJBQWEsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsNEJBQTRCO1lBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRTlDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVyQyxRQUFRO1lBQ1IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckIsYUFBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFDUCwrQkFBWSxHQUFaLFVBQWEsS0FBSztRQUNkLCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QixPQUFPO1NBQ1Y7UUFHRCxJQUFJLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakMsUUFBUTtZQUNSLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLGFBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7YUFDRztZQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUNwQztJQUVMLENBQUM7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsS0FBSztRQUNmLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pCLE9BQU87U0FDVjtRQUNELElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBSTtZQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNyQzthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRXJDLFFBQVE7WUFDUixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNyQixhQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBRUQsNkJBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsT0FBTztJQUNQLG1CQUFtQjtJQUNuQixxRUFBcUU7SUFDckUsSUFBSTtJQUVKLE1BQU07SUFDTiwyQkFBUSxHQUFSLFVBQVMsS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLENBQUM7UUFDcEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNqRSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzNELEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFDLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTVDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsNkJBQVUsR0FBVixVQUFXLEtBQUs7UUFDWixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMvRDthQUNJLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVELE1BQU07SUFDTixnQ0FBYSxHQUFiO1FBQ0ksMkJBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNqRSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzNELEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFDLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTVELFFBQVE7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRW5DLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR25DLE9BQU87UUFDUCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzVDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsTUFBTTtJQUNOLGlDQUFjLEdBQWQ7UUFDSSwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixhQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsVUFBVTtJQUNWLGlDQUFjLEdBQWQ7UUFDSSxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFJLE1BQU07UUFDekMsYUFBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2IsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELHNDQUFtQixHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2xELE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hGLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ25CLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ3hELENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM5QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELGNBQWMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLGNBQWMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLGNBQWMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVMsS0FBSztZQUNqRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO2dCQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXBILElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNsTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFbk0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNsTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ25NLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDaE0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVyTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDeEwsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMxTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRTNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDOUwsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEwsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbk0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNsTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3BNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDek0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1TCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2hNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDcE0sQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUs7UUFDckQsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDMUIsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3BELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQ0FBaUIsR0FBakIsVUFBa0IsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBVyxFQUFFLE1BQVcsRUFBRSxRQUFhO1FBQXZDLHNCQUFBLEVBQUEsV0FBVztRQUFFLHVCQUFBLEVBQUEsV0FBVztRQUFFLHlCQUFBLEVBQUEsYUFBYTtRQUNwRyxJQUFJLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUVqQixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0QsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVsQixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLFNBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNoQyw2Q0FBNkM7UUFDN0MsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEQsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFcEQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQ2xCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsa0NBQWUsR0FBZixVQUFnQixLQUFLO1FBQ2pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0NBQW1CLEdBQW5CLFVBQW9CLEtBQUs7UUFDckIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUIsVUFBMkIsS0FBSztRQUM1QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDBDQUF1QixHQUF2QixVQUF3QixLQUFLO1FBQ3pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsMENBQXVCLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx5Q0FBc0IsR0FBdEIsVUFBdUIsS0FBSztRQUN4QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELDRDQUF5QixHQUF6QixVQUEwQixLQUFLO1FBQzNCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQscUNBQWtCLEdBQWxCLFVBQW1CLEtBQUs7UUFDcEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCw4Q0FBMkIsR0FBM0IsVUFBNEIsS0FBSztRQUM3QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsd0NBQXFCLEdBQXJCLFVBQXNCLEtBQUs7UUFDdkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx1Q0FBb0IsR0FBcEIsVUFBcUIsS0FBSztRQUN0QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ25CLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0NBQXFCLEdBQXJCLFVBQXNCLEtBQUs7UUFDdkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwyQ0FBd0IsR0FBeEIsVUFBeUIsS0FBSztRQUMxQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDBDQUF1QixHQUF2QixVQUF3QixLQUFLO1FBQ3pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkNBQXdCLEdBQXhCLFVBQXlCLEtBQUs7UUFDMUIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUIsVUFBMkIsS0FBSztRQUM1QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsd0NBQXFCLEdBQXJCLFVBQXNCLEtBQUs7UUFDdkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQ0FBdUIsR0FBdkIsVUFBd0IsS0FBSztRQUN6QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDBDQUF1QixHQUF2QixVQUF3QixLQUFLO1FBQ3pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLDJCQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxJQUFJLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDL0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUMzRCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBQyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBRTFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLFFBQVEsR0FBRztZQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNqQyxDQUFDLENBQUM7UUFFRixJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlEO2FBQ0ksSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztnQkFDMUMsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDSSxJQUFJLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO2dCQUMxQyxRQUFRLEVBQUUsQ0FBQztnQkFDWCxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7Z0JBQzlDLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLGFBQWEsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7Z0JBQzFDLFFBQVEsRUFBRSxDQUFDO2dCQUNYLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO29CQUN4RCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUNqQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDSSxJQUFJLElBQUksSUFBSSxZQUFZLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO2dCQUMxQyxRQUFRLEVBQUUsQ0FBQztnQkFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7b0JBQ2hHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2lCQUNuRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDSSxJQUFJLElBQUksSUFBSSxXQUFXLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO2dCQUMxQyxRQUFRLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDSSxJQUFJLElBQUksSUFBSSxlQUFlLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO2dCQUNoRCxRQUFRLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDSSxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDO2dCQUN6QyxRQUFRLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDSSxJQUFJLElBQUksSUFBSSxpQkFBaUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUM7Z0JBQ2xELFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7Z0JBQzFDLFFBQVEsRUFBRSxDQUFDO2dCQUNYLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTtvQkFDOUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQ2pEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3hDLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLFdBQVcsRUFBRTtZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7Z0JBQzVDLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLGNBQWMsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUM7Z0JBQy9DLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLGFBQWEsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7Z0JBQzlDLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLGNBQWMsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUM7Z0JBQy9DLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJLElBQUksSUFBSSxJQUFJLGdCQUFnQixFQUFFO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztnQkFDakQsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQ0ksSUFBSSxJQUFJLElBQUksV0FBVyxFQUFFO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztnQkFDNUMsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQ0ksSUFBSSxJQUFJLElBQUksYUFBYSxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztnQkFDOUMsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQ0c7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBRUQsdUNBQW9CLEdBQXBCO1FBQ0ksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNqRSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckM7UUFDRCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDN0QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUMsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsaUNBQWMsR0FBZCxVQUFlLEtBQVk7UUFBWixzQkFBQSxFQUFBLFlBQVk7UUFDdkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELG9DQUFpQixHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELG9DQUFpQixHQUFqQjtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkYsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQUVELDBDQUF1QixHQUF2QixVQUF3QixJQUFnQjtRQUFoQixxQkFBQSxFQUFBLGdCQUFnQjtRQUNwQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFFdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUVqQyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLElBQUksTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELGNBQWMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLGNBQWMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLGNBQWMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVMsS0FBSztZQUNqRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO2dCQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN2RCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQy9ELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakgsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvRyxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksVUFBVTtZQUM1QixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRTtZQUM5QyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVDLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQ3RCLEVBQUUsQ0FBQyxLQUFLLENBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDZixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQy9CLEVBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUM1QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQzVCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDekIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsMkNBQXdCLEdBQXhCLFVBQXlCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSztRQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDMUIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDMUIsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3BELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyQ0FBd0IsR0FBeEIsVUFBeUIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHO1FBQ3hDLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsTUFBTSxDQUFDO1FBRWpDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNwQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWxCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEYsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVwQixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsWUFBWSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QixZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1RCxTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMxQixTQUFTLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM1RCxTQUFTLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV4RCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEgsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckcsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMvQixTQUFTLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN4QixTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMxQixTQUFTLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM1RCxTQUFTLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV4RCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHlDQUFzQixHQUF0QixVQUF1QixLQUFLO1FBQ3hCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDOUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25ELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQy9CLE9BQU87U0FDVjtRQUVELDJCQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLFVBQVUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RGLE1BQU0sQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkQ7YUFDRztZQUNBLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0lBRUQsMENBQXVCLEdBQXZCLFVBQXdCLFVBQWlCO1FBQWpCLDJCQUFBLEVBQUEsaUJBQWlCO1FBQ3JDLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLFVBQVUsRUFBRTtZQUNaLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxFQUFFLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUI7UUFDSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ2xFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsNkJBQTZCO0lBQzdCLHlDQUFzQixHQUF0QixVQUF1QixJQUFJO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDaEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM3RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCx5Q0FBc0IsR0FBdEI7UUFDSSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELHdDQUFxQixHQUFyQjtRQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUMxRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0I7UUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU3QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVWLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUN6RCxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUV2QixJQUFJLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN6QixRQUFRLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUMzRCxRQUFRLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUN2RCxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHNDQUFtQixHQUFuQjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsNENBQXlCLEdBQXpCLFVBQTBCLEdBQUc7UUFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNOLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQzdELElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDbkUsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7UUFDdkMsSUFBSSxVQUFVLEVBQUU7WUFDWixVQUFVLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxVQUFVLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUM7U0FDaEY7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNWLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsK0NBQTRCLEdBQTVCLFVBQTZCLElBQUksRUFBRSxPQUFZLEVBQUUsS0FBYyxFQUFFLFFBQWM7UUFBL0UsaUJBc0VDO1FBdEVrQyx3QkFBQSxFQUFBLFlBQVk7UUFBRSxzQkFBQSxFQUFBLGNBQWM7UUFBRSx5QkFBQSxFQUFBLGNBQWM7UUFDM0UsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7WUFDNUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO2FBQ0ksSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ3pCLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO2FBQ0ksSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFO1lBQ3hCLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO2FBQ0ksSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ3pCLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsRUFBRSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDMUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFVixJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzdELFVBQVUsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXpELElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDMUIsUUFBUSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDekIsUUFBUSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFDM0QsUUFBUSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7U0FDMUQ7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQ2YsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLElBQUksR0FBRyxDQUFDLENBQUMsRUFDNUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDZixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ1IsSUFBSSxLQUFJLENBQUMsd0JBQXdCLEtBQUssSUFBSSxFQUFFO2dCQUN4QyxLQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEI7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFRCwrQ0FBNEIsR0FBNUI7UUFDSSxJQUFJLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQzVFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0M7UUFDRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFRCw0Q0FBeUIsR0FBekI7UUFDSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ2xFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFFM0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsR0FBRyxDQUFDLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsR0FBRyxDQUFDLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLDBCQUEwQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMzQixVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxVQUFVLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUN6RCxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFM0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxjQUFjLENBQUMseUJBQXlCLEdBQUcsRUFBRSxFQUFFLDBCQUEwQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRXpGLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRixFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFVixJQUFJLGFBQWEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRCxhQUFhLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUNoQyxJQUFJLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9ELElBQUksWUFBWSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxZQUFZLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxvQkFBb0IsQ0FBQztRQUNyRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxvQ0FBb0MsR0FBRyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQ0FBdUIsR0FBdkI7UUFDSSxJQUFJLElBQUksQ0FBQyxpQ0FBaUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxJQUFJLENBQUM7U0FDakQ7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ2xFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLG9DQUFvQyxHQUFHLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQscURBQWtDLEdBQWxDO1FBQ0ksSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDNUUsSUFBSSxLQUFLLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdEUsSUFBSSxNQUFNLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEUsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyx5QkFBeUIsR0FBRyxDQUFDLEdBQUcsZ0NBQWdDLENBQUM7UUFDckYsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRywwQkFBMEIsR0FBRyxDQUFDLEdBQUcsOEJBQThCLENBQUM7UUFDckYsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQscURBQWtDLEdBQWxDO1FBQ0ksSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxpQ0FBaUMsR0FBRztZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMxQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7YUFDbkY7WUFDRCxJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztRQUM1QyxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSwwQ0FBMEMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9ILENBQUM7SUFFRCxxREFBa0MsR0FBbEM7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDeEQsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxtREFBZ0MsR0FBaEM7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDeEQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzFFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLFNBQVMsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVELElBQUksU0FBUyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN0RixJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLGVBQWUsR0FBRyxVQUFDLEdBQUc7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMxRixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDbkUsQ0FBQztRQUNOLENBQUMsQ0FBQztRQUNGLE9BQU87WUFDSCxJQUFJLE1BQUE7WUFDSixRQUFRLFVBQUE7WUFDUixnQkFBZ0Isa0JBQUE7WUFDaEIsWUFBWSxjQUFBO1lBQ1osb0JBQW9CLHNCQUFBO1lBQ3BCLFNBQVMsV0FBQTtZQUNULFNBQVMsV0FBQTtZQUNULFNBQVMsV0FBQTtZQUNULFVBQVUsWUFBQTtZQUNWLGVBQWUsaUJBQUE7U0FDbEIsQ0FBQztJQUNOLENBQUM7SUFFRCxtREFBZ0MsR0FBaEM7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTztTQUNWO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLE9BQU87U0FDVjtRQUNELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDeEMsSUFBSSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDeEQsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDM0IsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5RCxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLG9CQUFvQixDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCw0REFBeUMsR0FBekMsVUFBMEMsUUFBUSxFQUFFLE9BQU87UUFDdkQsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUNELE9BQU87WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUM1QyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDakIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRO1lBQ25CLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ3JELE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSztZQUN0QixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUU7U0FDM0MsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELHFEQUFrQyxHQUFsQyxVQUFtQyxLQUFhO1FBQWIsc0JBQUEsRUFBQSxhQUFhO1FBQzVDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixPQUFPO1NBQ1Y7UUFDRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsMkJBQTJCO1lBQzdFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFO1lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDWCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMseUNBQXlDLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxvQ0FBb0MsRUFBRTtZQUNuRSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsb0NBQW9DLEdBQUcsU0FBUyxDQUFDO1FBQ3RELGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN4RSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVk7WUFDOUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0QsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELGdCQUFnQixDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCwrQ0FBNEIsR0FBNUIsVUFBNkIsT0FBTztRQUNoQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7WUFDcEQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7WUFDakMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLENBQUM7WUFDL0gsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7WUFDMUMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsMENBQXVCLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQy9FLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7WUFDM0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ25ELENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQ0FBd0IsR0FBeEI7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksRUFBRSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ25ELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELDZDQUEwQixHQUExQjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELCtDQUE0QixHQUE1QjtRQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQy9DLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUU7WUFDakUsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNyRDtRQUNELE9BQU87WUFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ25DLElBQUksRUFBRSxRQUFRO1NBQ2pCLENBQUM7SUFDTixDQUFDO0lBRUQsa0RBQStCLEdBQS9CO1FBQ0ksT0FBTztZQUNILEVBQUUsRUFBRSxLQUFLO1lBQ1QsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFFLElBQUk7WUFDVCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBRSxLQUFLO1lBQ1YsY0FBYyxFQUFFLElBQUk7WUFDcEIsV0FBVyxFQUFFLElBQUk7WUFDakIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixRQUFRLEVBQUUsS0FBSztZQUNmLGNBQWMsRUFBRSxLQUFLO1NBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQsMkNBQXdCLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7U0FDcEU7UUFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ3RELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNuRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUM5QztRQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixLQUFLLFNBQVMsRUFBRTtZQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUN0QztRQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDNUM7UUFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ3RELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbkMsQ0FBQztJQUVELGlEQUE4QixHQUE5QjtRQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ2xDLElBQUksSUFBSSxDQUFDLDBCQUEwQixJQUFJLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2FBQ2pDO1NBQ0o7YUFDRztZQUNBLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELDZDQUEwQixHQUExQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQzVHLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELCtDQUE0QixHQUE1QjtRQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQzdDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMzRixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUM7WUFDdkYsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDbEYsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN6RSxJQUFJLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQzNGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlFLEdBQUcsR0FBRztnQkFDRixDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckMsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ25CLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDbkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztZQUNyQixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ3ZDLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBSztZQUNqQixZQUFZLEVBQUUsWUFBWTtZQUMxQixjQUFjLEVBQUUsY0FBYztZQUM5QixXQUFXLEVBQUUsV0FBVztZQUN4QixpQkFBaUIsRUFBRSxpQkFBaUI7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDbkQsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDckUsY0FBYyxFQUFFLElBQUksQ0FBQyxvQ0FBb0MsRUFBRTtTQUM5RCxDQUFDO0lBQ04sQ0FBQztJQUVELHVEQUFvQyxHQUFwQztRQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO1lBQzNELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ3ZDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUNuRSxDQUFDO0lBQ04sQ0FBQztJQUVELCtDQUE0QixHQUE1QjtRQUNJLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsK0JBQStCLEVBQUU7WUFDekgsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLCtCQUErQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUU7WUFDakgsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2xFO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUU7WUFDdkgsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1NBQzlFO1FBQ0QsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLDZCQUE2QixFQUFFO1lBQ3ZILGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztTQUM5RTtRQUNELE9BQU87WUFDSCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsTUFBTSxFQUFFLHlCQUF5QjtZQUNqQyxPQUFPLEVBQUUsMEJBQTBCO1lBQ25DLFNBQVMsRUFBRSw0QkFBNEI7WUFDdkMsZ0JBQWdCLEVBQUUsK0JBQStCO1lBQ2pELGlCQUFpQixFQUFFLGlCQUFpQjtZQUNwQyxTQUFTLEVBQUUsU0FBUztZQUNwQixlQUFlLEVBQUUsZUFBZTtZQUNoQyxlQUFlLEVBQUUsZUFBZTtTQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVELDRDQUF5QixHQUF6QixVQUEwQixLQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDNUU7SUFDTCxDQUFDO0lBRUQsNkNBQTBCLEdBQTFCLFVBQTJCLEtBQUs7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDNUYsT0FBTztTQUNWO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDN0MsTUFBTSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzNDLENBQUM7SUFFRCwwQ0FBdUIsR0FBdkIsVUFBd0IsS0FBSztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUM1RixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUM3QyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDeEMsQ0FBQztJQUVELGdEQUE2QixHQUE3QixVQUE4QixLQUFLO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQzVGLE9BQU87U0FDVjtRQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzlDLENBQUM7SUFFRCx5Q0FBc0IsR0FBdEIsVUFBdUIsS0FBSztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNsRSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUM3QyxNQUFNLENBQUMsUUFBUSxHQUFHO1lBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7U0FDckIsQ0FBQztRQUNGLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELCtDQUE0QixHQUE1QixVQUE2QixLQUFLO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2xFLE9BQU87U0FDVjtRQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxjQUFjLEdBQUc7WUFDcEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7U0FDckIsQ0FBQztRQUNGLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELDRDQUF5QixHQUF6QixVQUEwQixLQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDcEcsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTztZQUNyRCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFO1NBQzdCLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM5RjtJQUNMLENBQUM7SUFFRCx3REFBcUMsR0FBckMsVUFBc0MsT0FBTztRQUN6QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDN0g7YUFDSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksV0FBVyxFQUFFO1lBQ25DLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNwRTthQUNJLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVELHlDQUFzQixHQUF0QixVQUF1QixLQUFLLEVBQUUsY0FBYztRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDckIsYUFBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLGNBQWMsSUFBSSxDQUFDLEVBQUU7WUFDckIsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNwRjthQUNHO1lBQ0EsVUFBVSxHQUFHLGNBQWMsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVoRSxJQUFJLGNBQWMsSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hGO2FBQ0c7WUFDQSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQsdUNBQW9CLEdBQXBCLFVBQXFCLE9BQU87UUFDeEIsSUFBSSxjQUFjLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxLQUFLLEdBQUcsY0FBYyxJQUFJLENBQUMsSUFBSSxjQUFjLElBQUksYUFBYSxDQUFDO1FBRW5FLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCx3Q0FBcUIsR0FBckI7UUFBQSxpQkErQ0M7UUE5Q0csSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLDRCQUE0QixHQUFHLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLFVBQUMsT0FBTztZQUNuQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsR0FBRyxVQUFDLEtBQUssRUFBRSxHQUFHO1lBQ3hDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsVUFBQyxPQUFPO1lBQ25DLEtBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRztZQUMzQixJQUFJLEtBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLENBQUM7YUFDekU7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxVQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxRQUFRO1lBQzFLLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxJQUFJLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxhQUFhLElBQUksRUFBRSxFQUFFLFVBQVUsSUFBSSxFQUFFLEVBQUUsU0FBUyxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLEVBQUUsY0FBYyxJQUFJLEVBQUUsRUFBRSxNQUFNLElBQUksRUFBRSxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNuUCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxVQUFDLE9BQU87WUFDbkMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHO1lBQzVCLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1lBQ3JDLEtBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELHlDQUFzQixHQUF0QixVQUF1QixRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsVUFBZSxFQUFFLFNBQWMsRUFBRSxnQkFBcUIsRUFBRSxjQUFtQixFQUFFLE1BQVcsRUFBRSxRQUFlO1FBQTNJLHdCQUFBLEVBQUEsWUFBWTtRQUFFLDhCQUFBLEVBQUEsa0JBQWtCO1FBQUUsMkJBQUEsRUFBQSxlQUFlO1FBQUUsMEJBQUEsRUFBQSxjQUFjO1FBQUUsaUNBQUEsRUFBQSxxQkFBcUI7UUFBRSwrQkFBQSxFQUFBLG1CQUFtQjtRQUFFLHVCQUFBLEVBQUEsV0FBVztRQUFFLHlCQUFBLEVBQUEsZUFBZTtRQUMzTSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7UUFFakUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLElBQUksRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxhQUFhLElBQUksRUFBRSxFQUFFLFVBQVUsSUFBSSxFQUFFLEVBQUUsU0FBUyxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLEVBQUUsY0FBYyxJQUFJLEVBQUUsRUFBRSxNQUFNLElBQUksRUFBRSxFQUFFLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDN1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdEQUE2QixHQUE3QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLDBCQUEwQixFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsMkJBQTJCLEVBQUU7WUFDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztTQUMzQztRQUNELElBQUksSUFBSSxDQUFDLGdDQUFnQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLElBQUksQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFFckMsMEVBQTBFO1FBQzFFLElBQUksQ0FBQywwQkFBMEIsR0FBRyxVQUFVLEtBQUs7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMscUJBQXFCO2dCQUFFLE9BQU87WUFDbkUsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsZ0RBQWdEO2dCQUNoRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUN6QztRQUNMLENBQUMsQ0FBQztRQUNGLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUVqRSwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLDJCQUEyQixHQUFHLFVBQVUsS0FBSztZQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxxQkFBcUI7Z0JBQUUsT0FBTztZQUNuRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUM3QyxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztnQkFDL0MsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGdDQUFnQyxFQUFFO29CQUMzRSxNQUFNLENBQUMsTUFBTSxDQUFDLGdDQUFnQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxRDtnQkFDRCxNQUFNLENBQUMsR0FBRyxHQUFHO29CQUNULENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDWCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ2QsQ0FBQzthQUNMO1lBQ0QsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7Z0JBQy9DLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsRUFBRTtvQkFDaEgsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFO3dCQUN6RSxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7cUJBQ3RDO29CQUNELE9BQU87aUJBQ1Y7Z0JBQ0QsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQzthQUNyRDtRQUNMLENBQUMsQ0FBQztRQUNGLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRXhFLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxVQUFVLFNBQVM7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQUUsT0FBTztZQUNyQyxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN4RixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDekYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNyRDtRQUNMLENBQUMsQ0FBQztRQUVGLHdDQUF3QztRQUN4QyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUM1QixFQUFFLENBQUMsUUFBUSxDQUNQLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUNwQixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQUUsT0FBTztZQUN6RixJQUFJLElBQUksQ0FBQyxxQkFBcUI7Z0JBQUUsT0FBTztZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1lBRXRDLGdCQUFnQjtZQUNoQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDbkQ7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUNKLENBQUM7UUFDRixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRS9CLGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsZ0NBQWdDLEdBQUc7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQUUsT0FBTztZQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDbkQ7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBcjJERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNZO0lBWmYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXkyRDVCO0lBQUQsZUFBQztDQXoyREQsQUF5MkRDLENBejJEcUMsNkJBQWEsR0F5MkRsRDtrQkF6MkRvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtMb2NhbGl6ZWREYXRhfSBmcm9tIFwiLi9iYXNlL0xvY2FsaXplZERhdGFcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBOZXR3b3JrTWFuYWdlciB9IGZyb20gXCIuL25ldHdvcmsvTmV0d29ya01hbmFnZXJcIjtcclxuXHJcbmltcG9ydCB7QW5hbHl0aWNzfSBmcm9tIFwiLi9hZC9BbmFseXRpY3NcIjtcclxuaW1wb3J0IHtJbnNlcnRBZH0gZnJvbSBcIi4vYWQvSW5zZXJ0QWRcIjtcclxuaW1wb3J0IHtSZXdhcmRBZH0gZnJvbSBcIi4vYWQvUmV3YXJkQWRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBNVUxUSVBMQVlFUl9ERUZBVUxUX1RBTktfVFlQRSA9IDE7XHJcbmNvbnN0IE1VTFRJUExBWUVSX0ZJWEVEX1BMQVlFUl9MRVZFTCA9IDE7XHJcbmNvbnN0IE1VTFRJUExBWUVSX0ZJWEVEX0JBU0VfSFAgPSAxMDA7XHJcbmNvbnN0IE1VTFRJUExBWUVSX0ZJWEVEX0JBU0VfQVRLID0gMTA7XHJcbmNvbnN0IE1VTFRJUExBWUVSX0ZJWEVEX0JBU0VfU1BFRUQgPSA1O1xyXG5jb25zdCBNVUxUSVBMQVlFUl9GSVhFRF9BVFRBQ0tfUkFESVVTID0gNDAwO1xyXG5jb25zdCBNVUxUSVBMQVlFUl9NSU5JTUFQX1dJRFRIID0gMjE2O1xyXG5jb25zdCBNVUxUSVBMQVlFUl9NSU5JTUFQX0hFSUdIVCA9IDE0NDtcclxuY29uc3QgTVVMVElQTEFZRVJfTUlOSU1BUF9NQVJHSU5fUklHSFQgPSAxODtcclxuY29uc3QgTVVMVElQTEFZRVJfTUlOSU1BUF9NQVJHSU5fVE9QID0gOTY7XHJcbmNvbnN0IE1VTFRJUExBWUVSX01JTklNQVBfTUFSS0VSX1VQREFURV9JTlRFUlZBTCA9IDAuMDE2O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1haW4gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKSBcclxuICAgIGZpbmlzaFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgc2V0dGluZ1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgd2lzaFByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHJldml2ZVByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgLy8gX2NzYiA6IGFueSA9IHt9O1xyXG4gICAgX2xldmVsSWQgICAgPSAgIDE7ICAgICAgLy/lvZPliY3lhbPljaFcclxuXHJcbiAgICBfc3RhcnRDb3VudCA9IDA7XHJcbiAgICBfdGVzdFBhbmVsID0gbnVsbDtcclxuICAgIF91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgX3VwZ3JhZGVDaG9pY2VNb2RlID0gXCJ1cGdyYWRlXCI7XHJcbiAgICBfbmV0TWFuYWdlciA9IG51bGw7ICAgICAgICAgLy/nvZHnu5znrqHnkIblmago5aSa5Lq6KVxyXG4gICAgX211bHRpcGxheWVyU3RhdHVzID0gbnVsbDsgIC8v6L+e5o6l54q25oCB5qCH562+XHJcbiAgICBfbXVsdGlwbGF5ZXJIdWQgPSBudWxsOyAgICAgLy/lpJrkurrmnIDnroBIVURcclxuICAgIF9tdWx0aXBsYXllckFubm91bmNlbWVudCA9IG51bGw7IC8v5aSa5Lq65pKt5oqlXHJcbiAgICBfbXVsdGlwbGF5ZXJIdWRTdGF0ZSA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTsgLy/lpJrkurrmuLjmiI/ov5vooYzkuK1cclxuICAgIF9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgX211bHRpcGxheWVySW5wdXRMb29wVGFnID0gNzYwMTtcclxuICAgIF9tdWx0aXBsYXllcklucHV0cyA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJIaXRRdWV1ZSA9IFtdO1xyXG4gICAgX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZSA9IFtdO1xyXG4gICAgX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPSAwO1xyXG4gICAgX211bHRpcGxheWVyRmlyZVNlcSA9IDE7XHJcbiAgICBfbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlciA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyQ2FtZXJhRm9sbG93Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyTWluaW1hcCA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJNaW5pbWFwVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyTWluaW1hcFNhZmVab25lUmVuZGVyS2V5ID0gXCJcIjtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpIHtcclxuICAgICAgICAvL+makOiXj+W8gOWni+aMiemSrlxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieXlwLnNhZmVUb3BCb3R0b21cIix5eXAuc2FmZVRvcEJvdHRvbSlcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnkgPSB5eXAuc2FmZVRvcEJvdHRvbS0zMDtcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnpJbmRleCA9IDEwMDE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2J0blRlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuVGVzdC55ID0geXlwLnNhZmVUb3BCb3R0b20tMzA7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0blRlc3QuekluZGV4ID0gMTAwMTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdFRlc3RCdXR0b25WaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgVXRpbHMuZG9RQWN0aW9uKHRoaXMuX2ZpcmUuX2J0bldpc2gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3ByZURlZmVuc2Uuc2NyaXB0LnNldEluU3RhcnQoMyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcHJlQnVsbGV0LnNjcmlwdC5zZXRJblN0YXJ0KDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIC8vIHl5cC5ldmVudENlbnRlci5vbignY29uZmlnLWxvYWRlZCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgIC8v6YWN572u5Yqg6L295a6M5q+VXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjdXJyZW50LWxldmVsaWQnLHRoaXMuX3VwZGF0ZUxldmVsaWQsdGhpcyk7ICAgICAgICAgLy/lvZPliY3lhbPljaFcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2N1cnJlbnQtZW5lbXljb3VudCcsdGhpcy5fdXBkYXRlRW5lbXlDb3VudCx0aGlzKTsgICAvL+aVjOS6uuaVsOmHj1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigncGxheWVyLWRlYXRoJyx0aGlzLl9wbGF5ZXJEZWF0aCx0aGlzKTsgICAgICAgICAgICAgIC8vcGxheWVy5q275LqhXHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9uKCdhZGQtY29pbicsdGhpcy5fYWRkQ29pbix0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3Jlc3RhcnQnLHRoaXMuX3ByZXBhcmUsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndXBkYXRlJyx0aGlzLl91cGRhdGVNc2csdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpS/pgIDlh7rljYfnuqfnlYzpnaJcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJwbGF5ZXItcmV2aXZlXCIsdGhpcy5fcGxheWVyUmV2aXZlLHRoaXMpOyAgICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImdhbWUtcGF1c2VcIix0aGlzLl9nYW1lUGF1c2UsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mmoLlgZxcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJnYW1lLXJlc3VtZVwiLHRoaXMuX2dhbWVSZXN1bWUsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci1oaXRcIix0aGlzLl9vbk11bHRpcGxheWVySGl0UmVwb3J0LHRoaXMpOyAvL+WkmuS6uuWRveS4reS4iuaKpVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLWJ1bGxldC1ldmVudFwiLCB0aGlzLl9vbk11bHRpcGxheWVyQnVsbGV0RXZlbnQsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLXBsYXllci1kZWF0aFwiLCB0aGlzLl9vbk11bHRpcGxheWVyUGxheWVyRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLWVuZXJneS1waWNrdXBcIiwgdGhpcy5fb25NdWx0aXBsYXllckVuZXJneVBpY2t1cCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwibXVsdGlwbGF5ZXItdGFyLXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyVGFyUGlja3VwLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci1ibGFjay1ob2xlLXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyQmxhY2tIb2xlUGlja3VwLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci10aHJvdy10YXJcIiwgdGhpcy5fb25NdWx0aXBsYXllclRocm93VGFyLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci10aHJvdy1ibGFjay1ob2xlXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJUaHJvd0JsYWNrSG9sZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9mZignY29uZmlnLWxvYWRlZCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgIC8v6YWN572u5Yqg6L295a6M5q+VXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY3VycmVudC1sZXZlbGlkJyx0aGlzLl91cGRhdGVMZXZlbGlkLHRoaXMpOyAgICAgICAgIC8v5b2T5YmN5YWz5Y2hXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY3VycmVudC1lbmVteWNvdW50Jyx0aGlzLl91cGRhdGVFbmVteUNvdW50LHRoaXMpOyAgIC8v5pWM5Lq65pWw6YePXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigncGxheWVyLWRlYXRoJyx0aGlzLl9wbGF5ZXJEZWF0aCx0aGlzKTsgICAgICAgICAgICAgIC8vcGxheWVy5q275LqhXHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9mZignYWRkLWNvaW4nLHRoaXMuX2FkZENvaW4sdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5aKe5YqgXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigncmVzdGFydCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndXBkYXRlJyx0aGlzLl91cGRhdGVNc2csdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpS/pgIDlh7rljYfnuqfnlYzpnaJcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwicGxheWVyLXJldml2ZVwiLHRoaXMuX3BsYXllclJldml2ZSx0aGlzKTsgICAgICAgICAgICAgLy/lpI3mtLtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiZ2FtZS1wYXVzZVwiLHRoaXMuX2dhbWVQYXVzZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aaguWBnFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJnYW1lLXJlc3VtZVwiLHRoaXMuX2dhbWVSZXN1bWUsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItaGl0XCIsdGhpcy5fb25NdWx0aXBsYXllckhpdFJlcG9ydCx0aGlzKTsgLy/lpJrkurrlkb3kuK3kuIrmiqVcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItYnVsbGV0LWV2ZW50XCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJCdWxsZXRFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcIm11bHRpcGxheWVyLXBsYXllci1kZWF0aFwiLCB0aGlzLl9vbk11bHRpcGxheWVyUGxheWVyRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1lbmVyZ3ktcGlja3VwXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJFbmVyZ3lQaWNrdXAsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci10YXItcGlja3VwXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJUYXJQaWNrdXAsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1ibGFjay1ob2xlLXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyQmxhY2tIb2xlUGlja3VwLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItdGhyb3ctdGFyXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJUaHJvd1RhciwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcIm11bHRpcGxheWVyLXRocm93LWJsYWNrLWhvbGVcIiwgdGhpcy5fb25NdWx0aXBsYXllclRocm93QmxhY2tIb2xlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVRlc3RQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lVcGdyYWRlQ2hvaWNlUGFuZWwoKTtcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOW9k+WJjeWFs+WNoVxyXG4gICAgX3VwZGF0ZUxldmVsaWQoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBldmVudC5sZXZlbGlkO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiTGV2ZWwuJExhYmVsLnN0cmluZyA9IFwiTGV2ZWw6XCIgKyBldmVudC5sZXZlbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaVjOS6uuaVsOmHj1xyXG4gICAgX3VwZGF0ZUVuZW15Q291bnQoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiRW5lbXkuJExhYmVsLnN0cmluZyA9IGV2ZW50LmVuZW15Y291bnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5pc1Rlc3RNb2RlICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5pc1Rlc3RNb2RlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuZW5lbXljb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9sZXZlbDFfXCIsIHRoaXMuX2xldmVsSWQgKyAxKTtcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwid2luISEhISEhISEhISFcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuc2NyaXB0LnJlZnJlc2hMZXZlbEluZm8oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zZXRGaW5pc2goKTtcclxuXHJcbiAgICAgICAgICAgIC8v5pi+56S66IOc5Yip55WM6Z2iXHJcbiAgICAgICAgICAgIGxldCBmaW5pc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmlzaFByZWZhYik7XHJcbiAgICAgICAgICAgIGZpbmlzaC56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShmaW5pc2gpO1xyXG4gICAgICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLHRydWUsZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDnjqnlrrbmrbvkuqFcclxuICAgIF9wbGF5ZXJEZWF0aChldmVudCl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiZmFpbGVkISEhISEhISEhISFcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChSZXdhcmRBZC5nZXRJbnN0YW5jZSgpLmlzTG9hZCgpKSB7XHJcbiAgICAgICAgICAgIC8v5pi+56S65aSN5rS755WM6Z2iXHJcbiAgICAgICAgICAgIGxldCByZXZpdmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJldml2ZVByZWZhYik7XHJcbiAgICAgICAgICAgIHJldml2ZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShyZXZpdmUpO1xyXG4gICAgICAgICAgICByZXZpdmUuc2NyaXB0LmluaXQodGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXllclJldml2ZSh7dHlwZTpmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBfcGxheWVyUmV2aXZlKGV2ZW50KXtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8v5aSN5rS7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5yZXZpdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLnNjcmlwdC5yZWZyZXNoTGV2ZWxJbmZvKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zZXRGaW5pc2goKTtcclxuXHJcbiAgICAgICAgICAgIC8v5pi+56S65aSx6LSl55WM6Z2iXHJcbiAgICAgICAgICAgIGxldCBmaW5pc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmlzaFByZWZhYik7XHJcbiAgICAgICAgICAgIGZpbmlzaC56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShmaW5pc2gpO1xyXG4gICAgICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLGZhbHNlLGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9nYW1lUGF1c2UoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucGF1c2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgX2dhbWVSZXN1bWUoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucmVzdW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YeR5biB5aKe5YqgXHJcbiAgICAvLyBfYWRkQ29pbihldmVudCl7XHJcbiAgICAvLyAgICAgdGhpcy5fZmlyZS5fbHlDb2luLnNjcmlwdC5yZWZyZXNoKGV2ZW50LmNvdW50LGV2ZW50LnBvc2l0aW9uKTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy/lh4blpIflvIDlp4tcclxuICAgIF9wcmVwYXJlKGV2ZW50KXtcclxuICAgICAgICBpZiAodGhpcy5fbmV0TWFuYWdlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uRGlzY29ubmVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQoKTtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJIdWQoKTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gMDtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5riF56m65Zy65pmvXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmNsZWFuTWFwKCk7ICBcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRDb3VudCsrO1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydENvdW50ID49Mykge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChJbnNlcnRBZC5nZXRJbnN0YW5jZSgpLmlzTG9hZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGFydENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIEluc2VydEFkLmdldEluc3RhbmNlKCkuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3VwZGF0ZU1zZyhldmVudCl7XHJcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT0gJ2luJykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PSAnb3V0Jykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmjInpkq5cclxuICAgIF9vblN0YXJ0Q2xpY2soKXtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcblxyXG4gICAgICAgIC8v6ZqQ6JeP5byA5aeL5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYWREZWZlbnNlLnNjcmlwdC5zZXRBRCgzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9hZEJ1bGxldC5zY3JpcHQuc2V0QUQoMik7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYWRMaWZlLnNjcmlwdC5zZXRBRCgxKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyDlvIDlp4vmuLjmiI9cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl9wcmVEZWZlbnNlLnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3ByZUJ1bGxldC5zY3JpcHQuZW1pdFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+aMiemSrlxyXG4gICAgb25TZXR0aW5nQ2xpY2soKXtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICBVdGlscy5zaG93RGlhbG9ncyh0aGlzLnNldHRpbmdQcmVmYWIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eCueWHu+aYvuekuui9rOebmOaMiemSrlxyXG4gICAgb25XaXNoQnRuQ2xpY2soKXtcclxuICAgICAgICBBbmFseXRpY3MuZ2V0SW5zdGFuY2UoKS5ldmVudCgnZW50ZXJfd2lzaCcpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpOyAgICAvL+aMiemSrumfs+aViFxyXG4gICAgICAgIFV0aWxzLnNob3dEaWFsb2dzKHRoaXMud2lzaFByZWZhYik7XHJcbiAgICB9XHJcblxyXG4gICAgb25UZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB0aGlzLl9zaG93VGVzdFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRUZXN0QnV0dG9uVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fYnRuVGVzdC5nZXRDaGlsZEJ5TmFtZShcIl9sYlRlc3RCdG5cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiVGVzdEJ0blwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fYnRuVGVzdDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fYnRuVGVzdC53aWR0aCwgdGhpcy5fZmlyZS5fYnRuVGVzdC5oZWlnaHQpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi5rWLXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyODtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMzI7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dUZXN0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYW5lbCA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3RQYW5lbFwiKTtcclxuICAgICAgICBwYW5lbC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcGFuZWwuc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAyMDAwO1xyXG4gICAgICAgIHRoaXMuX3Rlc3RQYW5lbCA9IHBhbmVsO1xyXG5cclxuICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3RNYXNrXCIpO1xyXG4gICAgICAgIG1hc2sucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgbWFzay5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIGxldCBtYXNrR3JhcGhpY3MgPSBtYXNrLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDE1MCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLnJlY3QoLTY0MCwgLTM2MCwgMTI4MCwgNzIwKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIG1hc2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9oaWRlVGVzdFBhbmVsLCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGRpYWxvZyA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3REaWFsb2dcIik7XHJcbiAgICAgICAgZGlhbG9nLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIGRpYWxvZy5zZXRDb250ZW50U2l6ZSgxMDYwLCA4MjApO1xyXG4gICAgICAgIGRpYWxvZy56SW5kZXggPSAxO1xyXG4gICAgICAgIGxldCBkaWFsb2dHcmFwaGljcyA9IGRpYWxvZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDM1LCAzNiwgNDUsIDI0NSk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC01MzAsIC00MTAsIDEwNjAsIDgyMCwgMTgpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMTgwKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTUzMCwgLTQxMCwgMTA2MCwgODIwLCAxOCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZGlhbG9nLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0TGFiZWwoZGlhbG9nLCBcIl9sYlRlc3RUaXRsZVwiLCBcIua1i+ivlemdouadv1wiLCBjYy52MigwLCAyNzYpLCAzNCwgY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdExhYmVsKGRpYWxvZywgXCJfbGJUZXN0VGlwc1wiLCBcIuS8muWFiOmHjee9ruW9k+WJjea4uOaIj+eKtuaAge+8jOWGjei/m+WFpea1i+ivleWcuuaZr1wiLCBjYy52MigwLCAyMzQpLCAyMiwgY2MuY29sb3IoMjEwLCAyMTAsIDIyMCwgMjU1KSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25XaWR0aCA9IDIyMDtcclxuICAgICAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gNTQ7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgbGV0IGNvbHVtbnMgPSBbLTM2MCwgLTEyMCwgMTIwLCAzNjBdO1xyXG4gICAgICAgIGxldCByb3dzID0gWzE0NCwgNzIsIDAsIC03MiwgLTE0NCwgLTIxNl07XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5LaWxsRWZmZWN0VGVzdFwiLCBcIuWHu+adgOaViOaenOa1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzBdKSwgY2MuY29sb3IoMjU1LCA5MCwgNzAsIDI1NSksIHRoaXMuX29uS2lsbFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5IaXRUZXN0XCIsIFwi5Y+X5Ye75pWI5p6c5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbMF0pLCBjYy5jb2xvcig4MCwgMTgwLCAyNTUsIDI1NSksIHRoaXMuX29uSGl0VGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blVwZ3JhZGVUZXN0XCIsIFwi5Y2H57qn5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbMF0pLCBjYy5jb2xvcigxMTUsIDI1NSwgMTcwLCAyNTUpLCB0aGlzLl9vblVwZ3JhZGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuTXV0YXRpb25UZXN0XCIsIFwi5a2Q5by56LSo5Y+Y5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMF0pLCBjYy5jb2xvcigyNTUsIDEyMCwgMjEwLCAyNTUpLCB0aGlzLl9vbkJ1bGxldE11dGF0aW9uVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5TaG9vdEVmZmVjdFRlc3RcIiwgXCLlrZDlvLnlsITlh7vmtYvor5VcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMjA1LCA5MCwgMjU1KSwgdGhpcy5fb25TaG9vdEVmZmVjdFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5QbGF5ZXJMb3dIcFRlc3RcIiwgXCLoh6rlt7HooYDph4/lkYrmgKVcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMTEwLCAxMTAsIDI1NSksIHRoaXMuX29uUGxheWVyTG93SHBUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuRW5lbXlMb3dIcFRlc3RcIiwgXCLmlYzkurrooYDph4/lkYrmgKVcIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMTY1LCA3MCwgMjU1KSwgdGhpcy5fb25FbmVteUxvd0hwVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bktpbGxCcm9hZGNhc3RUZXN0XCIsIFwi5Ye75p2A5bm/5pKtXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMV0pLCBjYy5jb2xvcigxNzUsIDEyMCwgMjU1LCAyNTUpLCB0aGlzLl9vbktpbGxCcm9hZGNhc3RUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNhY3JpZmljZVRlc3RcIiwgXCLnjK7npa3mtYvor5VcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1syXSksIGNjLmNvbG9yKDI1NSwgOTIsIDkyLCAyNTUpLCB0aGlzLl9vblNhY3JpZmljZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Qb3J0YWxUZXN0XCIsIFwi5Lyg6YCB6Zeo5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbMl0pLCBjYy5jb2xvcigxMTAsIDI1NSwgMjQ1LCAyNTUpLCB0aGlzLl9vblBvcnRhbFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DZW50cmlmdWdhbFJpbmdUZXN0XCIsIFwi56a75b+D5Yqb5ZyI5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbMl0pLCBjYy5jb2xvcigyNTUsIDE2MCwgOTAsIDI1NSksIHRoaXMuX29uQ2VudHJpZnVnYWxSaW5nVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bk9pbFNwaWxsVGVzdFwiLCBcIueEpuayueW8uea1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzJdKSwgY2MuY29sb3IoMTY1LCAxMTgsIDcyLCAyNTUpLCB0aGlzLl9vbk9pbFNwaWxsVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5FbmVyZ3lFZ2dUZXN0XCIsIFwi6IO96YeP6JuL5pS26JePXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbM10pLCBjYy5jb2xvcigxMjYsIDIzMiwgMTQzLCAyNTUpLCB0aGlzLl9vbkVuZXJneUVnZ1Rlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Db3ZlclRlc3RcIiwgXCLmjqnkvZPmtYvor5VcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1szXSksIGNjLmNvbG9yKDE5OSwgMTUxLCA5NiwgMjU1KSwgdGhpcy5fb25Db3ZlclRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DbG9zZVRlc3RcIiwgXCLlhbPpl61cIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1szXSksIGNjLmNvbG9yKDE4MCwgMTgwLCAxOTAsIDI1NSksIHRoaXMuX2hpZGVUZXN0UGFuZWwsIDE4MCwgNDgsIDI0KTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuRGFtYWdlRG91YmxlVGVzdFwiLCBcIuS8pOWus+e/u+WAjeWMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzNdKSwgY2MuY29sb3IoMjU1LCA1MCwgNTAsIDI1NSksIHRoaXMuX29uRGFtYWdlRG91YmxlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNwZWVkRG91YmxlVGVzdFwiLCBcIumAn+W6pue/u+WAjeWMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzRdKSwgY2MuY29sb3IoNTAsIDE1MCwgMjU1LCAyNTUpLCB0aGlzLl9vblNwZWVkRG91YmxlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNwcmVhZEJ1bGxldFRlc3RcIiwgXCLlrZDlvLnmianmlaPljLrln59cIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1s0XSksIGNjLmNvbG9yKDUwLCAyMzAsIDEwMCwgMjU1KSwgdGhpcy5fb25TcHJlYWRCdWxsZXRUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQm91bmNlT2JzdGFjbGVUZXN0XCIsIFwi5a2Q5by55Y+N5by56Zqc56KNXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbNF0pLCBjYy5jb2xvcigyNTUsIDEwMCwgMjAwLCAyNTUpLCB0aGlzLl9vbkJvdW5jZU9ic3RhY2xlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkJsYWNrSG9sZVRlc3RcIiwgXCLpu5HmtJ7ljLrln59cIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1s0XSksIGNjLmNvbG9yKDEyMCwgNDAsIDE4MCwgMjU1KSwgdGhpcy5fb25CbGFja0hvbGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQ2x1c3RlckJvbWJUZXN0XCIsIFwi6ZuG5p2f54K45by5XCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbNV0pLCBjYy5jb2xvcigyMjAsIDE2MCwgNDAsIDI1NSksIHRoaXMuX29uQ2x1c3RlckJvbWJUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuTXVsdGlwbGF5ZXJUZXN0XCIsIFwi6IGU5py65a+55oiYXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbNV0pLCBjYy5jb2xvcig2MCwgMjIwLCAyNTUsIDI1NSksIHRoaXMuX29uTXVsdGlwbGF5ZXJUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVGVzdExhYmVsKHBhcmVudCwgbmFtZSwgdGV4dCwgcG9zLCBmb250U2l6ZSwgY29sb3IpIHtcclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNDIwLCA0Mik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY29sb3I7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gZm9udFNpemUgKyA2O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBsYWJlbE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVRlc3RCdXR0b24ocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIHN0cm9rZUNvbG9yLCBoYW5kbGVyLCB3aWR0aCA9IDI2MCwgaGVpZ2h0ID0gNTgsIGZvbnRTaXplID0gMjgpIHtcclxuICAgICAgICBsZXQgYnRuID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgYnRuLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBidG4uc2V0Q29udGVudFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgYnRuLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgYnRuLnpJbmRleCA9IDEwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYnRuLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNDgsIDQ4LCA1NSwgMjMwKTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IHN0cm9rZUNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUobmFtZSArIFwiTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ0bjtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSBmb250U2l6ZSArIDQ7XHJcbiAgICAgICAgLy8gbGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5TSFJJTks7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBidG47XHJcbiAgICB9XHJcblxyXG4gICAgX29uS2lsbFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJraWxsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkhpdFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJoaXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uVXBncmFkZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJ1cGdyYWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkJ1bGxldE11dGF0aW9uVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcIm11dGF0aW9uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNob290RWZmZWN0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNob290XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblBsYXllckxvd0hwVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInBsYXllckxvd0hwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkVuZW15TG93SHBUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiZW5lbXlMb3dIcFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25LaWxsQnJvYWRjYXN0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImtpbGxCcm9hZGNhc3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uUG9ydGFsVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInBvcnRhbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25DZW50cmlmdWdhbFJpbmdUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiY2VudHJpZnVnYWxSaW5nXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNhY3JpZmljZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJzYWNyaWZpY2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uT2lsU3BpbGxUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwib2lsU3BpbGxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQ292ZXJUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiY292ZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uRW5lcmd5RWdnVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImVuZXJneUVnZ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25EYW1hZ2VEb3VibGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiZGFtYWdlRG91YmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNwZWVkRG91YmxlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNwZWVkRG91YmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNwcmVhZEJ1bGxldFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJzcHJlYWRCdWxsZXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQm91bmNlT2JzdGFjbGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiYm91bmNlT2JzdGFjbGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQmxhY2tIb2xlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImJsYWNrSG9sZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25DbHVzdGVyQm9tYlRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJjbHVzdGVyQm9tYlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25NdWx0aXBsYXllclRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hpZGVUZXN0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLl9zdGFydE11bHRpcGxheWVyR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydFRlc3RHYW1lKHR5cGUpIHtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB0aGlzLl9oaWRlVGVzdFBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5faGlkZVVwZ3JhZGVDaG9pY2VQYW5lbChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRHYW1lQmVmb3JlVGVzdCgpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6dHlwZSA9PSBcInNhY3JpZmljZVwifSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY29tcGxldGUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl91aS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09IFwia2lsbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEtpbGxFZmZlY3RUZXN0R2FtZShjb21wbGV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJ1cGdyYWRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fc2hvd1VwZ3JhZGVDaG9pY2VQYW5lbChcInVwZ3JhZGVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwibXV0YXRpb25cIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zaG93VXBncmFkZUNob2ljZVBhbmVsKFwibXV0YXRpb25cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic2hvb3RcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRTaG9vdEVmZmVjdFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInBsYXllckxvd0hwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHNlbGYuX2dldEN1cnJlbnRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLnNjcmlwdCAmJiBwbGF5ZXIuc2NyaXB0LmRlYnVnU2V0TG93SHApIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LmRlYnVnU2V0TG93SHAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJlbmVteUxvd0hwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RpbGVkICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuY3JlYXRlTG93SHBUZXN0RW5lbXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuY3JlYXRlTG93SHBUZXN0RW5lbXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJzYWNyaWZpY2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwia2lsbEJyb2FkY2FzdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEtpbGxCcm9hZGNhc3RUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJwb3J0YWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRQb3J0YWxUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjZW50cmlmdWdhbFJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRDZW50cmlmdWdhbFJpbmdUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJvaWxTcGlsbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LnNwYXduT2lsVGVzdFBpY2t1cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zcGF3bk9pbFRlc3RQaWNrdXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjb3ZlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENvdmVyVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiZW5lcmd5RWdnXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0RW5lcmd5RWdnVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiZGFtYWdlRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0RGFtYWdlRG91YmxlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic3BlZWREb3VibGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRTcGVlZERvdWJsZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInNwcmVhZEJ1bGxldFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFNwcmVhZEJ1bGxldFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImJvdW5jZU9ic3RhY2xlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0Qm91bmNlT2JzdGFjbGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJibGFja0hvbGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRCbGFja0hvbGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjbHVzdGVyQm9tYlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENsdXN0ZXJCb21iVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRQbGF5ZXJIaXRUZXN0R2FtZShjb21wbGV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZXNldEdhbWVCZWZvcmVUZXN0KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fdGlsZWQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jbGVhbk1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2RpcjpjYy52MigwLCAxKSwgcmF0aW86MH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLHt9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIse21vZGU6XCJjaGFyZ2VcIn0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlVGVzdFBhbmVsKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl90ZXN0UGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl90ZXN0UGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlc3RQYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Rlc3Ryb3lUZXN0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGVzdFBhbmVsID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q3VycmVudFBsYXllcigpIHtcclxuICAgICAgICBsZXQgdGlsZWQgPSB0aGlzLl9maXJlLl90aWxlZDtcclxuICAgICAgICBpZiAoIXRpbGVkIHx8ICF0aWxlZC5zY3JpcHQgfHwgIXRpbGVkLnNjcmlwdC5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRpbGVkLnNjcmlwdC5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbGVkLnNjcmlwdC5fcGxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93VXBncmFkZUNob2ljZVBhbmVsKG1vZGUgPSBcInVwZ3JhZGVcIikge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID0gbW9kZTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImdhbWUtcGF1c2VcIix7fSk7XHJcblxyXG4gICAgICAgIGxldCBwYW5lbCA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VQYW5lbFwiKTtcclxuICAgICAgICBwYW5lbC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcGFuZWwuc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAyMTAwO1xyXG4gICAgICAgIHBhbmVsLmFkZENvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBwYW5lbDtcclxuXHJcbiAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQ2hvaWNlTWFza1wiKTtcclxuICAgICAgICBtYXNrLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIG1hc2suc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBsZXQgbWFza0dyYXBoaWNzID0gbWFzay5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAwLCAwLCAxNjgpO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5yZWN0KC02NDAsIC0zNjAsIDEyODAsIDcyMCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGRpYWxvZyA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VEaWFsb2dcIik7XHJcbiAgICAgICAgZGlhbG9nLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIGRpYWxvZy5zZXRDb250ZW50U2l6ZSg5ODAsIDQzMCk7XHJcbiAgICAgICAgZGlhbG9nLnpJbmRleCA9IDE7XHJcbiAgICAgICAgbGV0IGRpYWxvZ0dyYXBoaWNzID0gZGlhbG9nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjIsIDI2LCAzOCwgMjQ1KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTQ5MCwgLTIxNSwgOTgwLCA0MzAsIDI0KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDEyMCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC00OTAsIC0yMTUsIDk4MCwgNDMwLCAyNCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZGlhbG9nLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBtb2RlID09IFwibXV0YXRpb25cIiA/IFwi6YCJ5oup5LiA56eN5a2Q5by56LSo5Y+YXCIgOiBcIumAieaLqeS4gOmhueWNh+e6p1wiO1xyXG4gICAgICAgIGxldCB0aXBzID0gbW9kZSA9PSBcIm11dGF0aW9uXCIgPyBcIjPpgIkx77yM6YCJ5Lit5ZCO56uL5Yi75pu/5o2i5b2T5YmN5a2Q5by5XCIgOiBcIjPpgIkx77yM56uL5Y2z55Sf5pWIXCI7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwoZGlhbG9nLCBcIl9sYlVwZ3JhZGVUaXRsZVwiLCB0aXRsZSwgY2MudjIoMCwgMTYwKSwgMzYsIGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGRpYWxvZywgXCJfbGJVcGdyYWRlVGlwc1wiLCB0aXBzLCBjYy52MigwLCAxMTgpLCAyMiwgY2MuY29sb3IoMjAwLCAyMTAsIDIyNSwgMjU1KSk7XHJcblxyXG4gICAgICAgIGxldCBjaG9pY2VzID0gbW9kZSA9PSBcIm11dGF0aW9uXCJcclxuICAgICAgICAgICAgPyBwbGF5ZXIuc2NyaXB0LmdldFRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZXMoKVxyXG4gICAgICAgICAgICA6IHBsYXllci5zY3JpcHQuZ2V0VGVzdFVwZ3JhZGVDaG9pY2VzKCk7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9IC0yODA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaG9pY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXJkID0gdGhpcy5fY3JlYXRlVXBncmFkZUNob2ljZUNhcmQoZGlhbG9nLCBjaG9pY2VzW2ldLCBjYy52MihzdGFydFggKyBpICogMjgwLCAtMTApKTtcclxuICAgICAgICAgICAgY2FyZC5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgY2FyZC5zY2FsZVggPSAwLjA1O1xyXG4gICAgICAgICAgICBjYXJkLnNjYWxlWSA9IDAuOTI7XHJcbiAgICAgICAgICAgIGNhcmQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGkgKiAwLjA1KSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjA4KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMTIsIDEuMDYpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA3LCAwLjk2LCAxLjAyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNiwgMS4wMywgMC45OSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDUsIDEsIDEpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIGZvbnRTaXplLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg3MDAsIGZvbnRTaXplICsgMTApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gZm9udFNpemUgKyA0O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBsYWJlbE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVVwZ3JhZGVDaG9pY2VDYXJkKHBhcmVudCwgY2hvaWNlLCBwb3MpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRfXCIgKyBjaG9pY2UuaWQpO1xyXG4gICAgICAgIGNhcmQucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGNhcmQuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBjYXJkLnNldENvbnRlbnRTaXplKDI0MCwgMjcwKTtcclxuICAgICAgICBjYXJkW1wiX191cGdyYWRlQ2hvaWNlXCJdID0gY2hvaWNlO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBjYXJkLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMzgsIDQzLCA1OCwgMjQ1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTEyMCwgLTEzNSwgMjQwLCAyNzAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTEyMCwgLTEzNSwgMjQwLCAyNzAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9jYXJkR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGNhcmQ7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY2hvaWNlLmNvbG9yLnIsIGNob2ljZS5jb2xvci5nLCBjaG9pY2UuY29sb3IuYiwgMzQpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5yb3VuZFJlY3QoLTExMiwgLTEyNywgMjI0LCAyNTQsIDE2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbiA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRJY29uXCIpO1xyXG4gICAgICAgIGljb24ucGFyZW50ID0gY2FyZDtcclxuICAgICAgICBpY29uLnNldFBvc2l0aW9uKDAsIDc0KTtcclxuICAgICAgICBsZXQgaWNvbkdyYXBoaWNzID0gaWNvbi5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5maWxsQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmNpcmNsZSgwLCAwLCAzNCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBpY29uR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpY29uR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5jaXJjbGUoMCwgMCwgMzQpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGljb25MYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9jYXJkSWNvbkxhYmVsXCIpO1xyXG4gICAgICAgIGljb25MYWJlbE5vZGUucGFyZW50ID0gaWNvbjtcclxuICAgICAgICBpY29uTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDc4LCA0MCk7XHJcbiAgICAgICAgbGV0IGljb25MYWJlbCA9IGljb25MYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBpY29uTGFiZWwuc3RyaW5nID0gY2hvaWNlLnNob3J0TGFiZWw7XHJcbiAgICAgICAgaWNvbkxhYmVsLmZvbnRTaXplID0gY2hvaWNlLnNob3J0TGFiZWwubGVuZ3RoID4gMiA/IDE4IDogMjI7XHJcbiAgICAgICAgaWNvbkxhYmVsLmxpbmVIZWlnaHQgPSAyNDtcclxuICAgICAgICBpY29uTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBpY29uTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChjYXJkLCBcIl9jYXJkVGl0bGVcIiwgY2hvaWNlLnRpdGxlLCBjYy52MigwLCAxNiksIDI4LCBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChjYXJkLCBcIl9jYXJkVmFsdWVcIiwgY2hvaWNlLnZhbHVlVGV4dCwgY2MudjIoMCwgLTM0KSwgNDAsIGNob2ljZS5jb2xvcik7XHJcblxyXG4gICAgICAgIGxldCBkZXNjTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NhcmREZXNjXCIpO1xyXG4gICAgICAgIGRlc2NOb2RlLnBhcmVudCA9IGNhcmQ7XHJcbiAgICAgICAgZGVzY05vZGUuc2V0UG9zaXRpb24oMCwgLTkyKTtcclxuICAgICAgICBkZXNjTm9kZS5zZXRDb250ZW50U2l6ZSgxOTAsIDU2KTtcclxuICAgICAgICBkZXNjTm9kZS5jb2xvciA9IGNjLmNvbG9yKDIwMCwgMjEwLCAyMjUsIDIyMCk7XHJcbiAgICAgICAgbGV0IGRlc2NMYWJlbCA9IGRlc2NOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgZGVzY0xhYmVsLnN0cmluZyA9IGNob2ljZS5kZXNjO1xyXG4gICAgICAgIGRlc2NMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGRlc2NMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgZGVzY0xhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgZGVzY0xhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgY2FyZC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVXBncmFkZUNob2ljZVNlbGVjdCwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGNhcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uVXBncmFkZUNob2ljZVNlbGVjdChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FyZCA9IGV2ZW50ID8gZXZlbnQuY3VycmVudFRhcmdldCA6IG51bGw7XHJcbiAgICAgICAgbGV0IGNob2ljZSA9IGNhcmQgPyBjYXJkW1wiX191cGdyYWRlQ2hvaWNlXCJdIDogbnVsbDtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFwbGF5ZXIgfHwgIXBsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0bkxVcFwiKTtcclxuICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID09IFwibXV0YXRpb25cIiAmJiBwbGF5ZXIuc2NyaXB0LmFwcGx5VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5zY3JpcHQuYXBwbHlUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2UoY2hvaWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5hcHBseVRlc3RVcGdyYWRlQ2hvaWNlKGNob2ljZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlVXBncmFkZUNob2ljZVBhbmVsKHJlc3VtZUdhbWUgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsID0gbnVsbDtcclxuICAgICAgICBpZiAocmVzdW1lR2FtZSkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImdhbWUtcmVzdW1lXCIse30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID0gXCJ1cGdyYWRlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLSDlpJrkurrmqKHlvI8gLS0tLS0tLS0tLVxyXG4gICAgX3Nob3dNdWx0aXBsYXllclN0YXR1cyh0ZXh0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyU3RhdHVzICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKFwiX211bHRpcGxheWVyU3RhdHVzXCIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgMjAwKSk7XHJcbiAgICAgICAgbm9kZS5zZXRDb250ZW50U2l6ZSg2MDAsIDYwKTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDMwMDA7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzMjtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAxMDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMgPSBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlTXVsdGlwbGF5ZXJTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyU3RhdHVzICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9lbnN1cmVNdWx0aXBsYXllckh1ZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJIdWQgJiYgY2MuaXNWYWxpZCh0aGlzLl9tdWx0aXBsYXllckh1ZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpcGxheWVySHVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiX211bHRpcGxheWVySHVkXCIpO1xyXG4gICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHJvb3QuekluZGV4ID0gMjk5MDtcclxuICAgICAgICByb290LnNldFBvc2l0aW9uKDAsIHl5cC5zYWZlVG9wQm90dG9tIC0gNzgpO1xyXG4gICAgICAgIHJvb3Quc2V0Q29udGVudFNpemUoNjQwLCA3Mik7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IHJvb3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiZy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAwLCAwLCAxMTApO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtMzIwLCAtMzIsIDY0MCwgNjQsIDEyKTtcclxuICAgICAgICBiZy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZSA9IG5ldyBjYy5Ob2RlKFwiX3RpdGxlXCIpO1xyXG4gICAgICAgIHRpdGxlLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgdGl0bGUuc2V0UG9zaXRpb24oMCwgMTIpO1xyXG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gdGl0bGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmZvbnRTaXplID0gMzA7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5saW5lSGVpZ2h0ID0gMzQ7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHRpdGxlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgbGV0IHN1YiA9IG5ldyBjYy5Ob2RlKFwiX3N1YlwiKTtcclxuICAgICAgICBzdWIucGFyZW50ID0gcm9vdDtcclxuICAgICAgICBzdWIuc2V0UG9zaXRpb24oMCwgLTE4KTtcclxuICAgICAgICBsZXQgc3ViTGFiZWwgPSBzdWIuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBzdWJMYWJlbC5mb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIHN1YkxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBzdWJMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHN1YkxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBzdWJMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgICAgICByb290W1wiX3RpdGxlTGFiZWxcIl0gPSB0aXRsZUxhYmVsO1xyXG4gICAgICAgIHJvb3RbXCJfc3ViTGFiZWxcIl0gPSBzdWJMYWJlbDtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckh1ZCA9IHJvb3Q7XHJcbiAgICAgICAgcmV0dXJuIHJvb3Q7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVNdWx0aXBsYXllckh1ZCgpIHtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckh1ZFN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJNaW5pbWFwKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySHVkICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJIdWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySHVkLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIdWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9hcHBseU11bHRpcGxheWVySHVkU3RhdGUoaHVkKSB7XHJcbiAgICAgICAgaWYgKCFodWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVySHVkKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIdWRTdGF0ZSA9IGh1ZDtcclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySHVkKCk7XHJcbiAgICAgICAgcm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gcm9vdFtcIl90aXRsZUxhYmVsXCJdO1xyXG4gICAgICAgIGxldCBzdWJMYWJlbCA9IHJvb3RbXCJfc3ViTGFiZWxcIl07XHJcbiAgICAgICAgbGV0IGFsaXZlQ291bnQgPSBodWQuYWxpdmVDb3VudCA9PSBudWxsID8gMCA6IGh1ZC5hbGl2ZUNvdW50O1xyXG4gICAgICAgIGxldCB0b3RhbFBsYXllcnMgPSBodWQudG90YWxQbGF5ZXJzID09IG51bGwgPyAwIDogaHVkLnRvdGFsUGxheWVycztcclxuICAgICAgICBsZXQgcGhhc2VUZXh0ID0gaHVkLnBoYXNlVGV4dCB8fCBcIuaImOaWl+S4rVwiO1xyXG4gICAgICAgIGlmICh0aXRsZUxhYmVsKSB7XHJcbiAgICAgICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gcGhhc2VUZXh0ICsgXCIgIHwgIOWJqeS9mSBcIiArIGFsaXZlQ291bnQgKyBcIi9cIiArIHRvdGFsUGxheWVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN1YkxhYmVsKSB7XHJcbiAgICAgICAgICAgIHN1YkxhYmVsLnN0cmluZyA9IGh1ZC5zZWNvbmRhcnlUZXh0IHx8IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93TXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQodGV4dCwgc3ViVGV4dCA9IFwiXCIsIHN0eWxlID0gXCJpbmZvXCIsIGR1cmF0aW9uID0gMi4yKSB7XHJcbiAgICAgICAgaWYgKCF0ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50ICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgY2MuTm9kZShcIl9tdWx0aXBsYXllckFubm91bmNlbWVudFwiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICByb290LnpJbmRleCA9IDMxMDA7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbigwLCAxMTApO1xyXG4gICAgICAgIHJvb3Qub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIGxldCBiZyA9IHJvb3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBsZXQgc3R5bGVDb2xvciA9IGNjLmNvbG9yKDQ2LCAxMjIsIDI1NSwgMTcwKTtcclxuICAgICAgICBpZiAoc3R5bGUgPT09IFwid2FybmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDE1MiwgNDgsIDE4MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0eWxlID09PSBcImRhbmdlclwiKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDc0LCA3NCwgMTg1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3R5bGUgPT09IFwiZXZlbnRcIikge1xyXG4gICAgICAgICAgICBzdHlsZUNvbG9yID0gY2MuY29sb3IoMTEwLCA4NSwgMjU1LCAxODApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzdHlsZSA9PT0gXCJub3RpY2VcIikge1xyXG4gICAgICAgICAgICBzdHlsZUNvbG9yID0gY2MuY29sb3IoNTIsIDE5MCwgMTIwLCAxNzUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBiZy5maWxsQ29sb3IgPSBzdHlsZUNvbG9yO1xyXG4gICAgICAgIGJnLnJvdW5kUmVjdCgtMjgwLCAtNTAsIDU2MCwgc3ViVGV4dCA/IDEwMCA6IDY4LCAxNCk7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBuZXcgY2MuTm9kZShcIl90aXRsZVwiKTtcclxuICAgICAgICB0aXRsZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHRpdGxlLnNldFBvc2l0aW9uKDAsIHN1YlRleHQgPyAxNiA6IDApO1xyXG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gdGl0bGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDM0O1xyXG4gICAgICAgIHRpdGxlTGFiZWwubGluZUhlaWdodCA9IDM4O1xyXG4gICAgICAgIHRpdGxlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgaWYgKHN1YlRleHQpIHtcclxuICAgICAgICAgICAgbGV0IHN1YiA9IG5ldyBjYy5Ob2RlKFwiX3N1YlwiKTtcclxuICAgICAgICAgICAgc3ViLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgICAgIHN1Yi5zZXRQb3NpdGlvbigwLCAtMjApO1xyXG4gICAgICAgICAgICBsZXQgc3ViTGFiZWwgPSBzdWIuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgc3ViTGFiZWwuc3RyaW5nID0gc3ViVGV4dDtcclxuICAgICAgICAgICAgc3ViTGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICAgICAgc3ViTGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgICAgICBzdWJMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgICAgICBzdWJMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByb290LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZUluKDAuMTIpLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoTWF0aC5tYXgoMC44LCBkdXJhdGlvbiB8fCAyLjIpKSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjIpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQgPT09IHJvb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChyb290KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3QuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50ID0gcm9vdDtcclxuICAgIH1cclxuXHJcbiAgICBfaGlkZU11bHRpcGxheWVyQW5ub3VuY2VtZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudCAmJiBjYy5pc1ZhbGlkKHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZW5zdXJlTXVsdGlwbGF5ZXJNaW5pbWFwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1pbmltYXAgJiYgY2MuaXNWYWxpZCh0aGlzLl9tdWx0aXBsYXllck1pbmltYXApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsYXllck1pbmltYXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdCA9IG5ldyBjYy5Ob2RlKFwiX211bHRpcGxheWVyTWluaW1hcFwiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICByb290LnpJbmRleCA9IDMwMDU7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbih0aGlzLl9nZXRNdWx0aXBsYXllck1pbmltYXBSb290UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcm9vdC5zZXRDb250ZW50U2l6ZShNVUxUSVBMQVlFUl9NSU5JTUFQX1dJRFRILCBNVUxUSVBMQVlFUl9NSU5JTUFQX0hFSUdIVCk7XHJcblxyXG4gICAgICAgIGxldCBmcmFtZSA9IHJvb3QuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBmcmFtZS5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAwLCAwLCAxMjApO1xyXG4gICAgICAgIGZyYW1lLnJvdW5kUmVjdCgtTVVMVElQTEFZRVJfTUlOSU1BUF9XSURUSCAvIDIsIC1NVUxUSVBMQVlFUl9NSU5JTUFQX0hFSUdIVCAvIDIsIE1VTFRJUExBWUVSX01JTklNQVBfV0lEVEgsIE1VTFRJUExBWUVSX01JTklNQVBfSEVJR0hULCAxMCk7XHJcbiAgICAgICAgZnJhbWUuZmlsbCgpO1xyXG4gICAgICAgIGZyYW1lLmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgICAgZnJhbWUuc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCA5MCk7XHJcbiAgICAgICAgZnJhbWUucm91bmRSZWN0KC1NVUxUSVBMQVlFUl9NSU5JTUFQX1dJRFRIIC8gMiwgLU1VTFRJUExBWUVSX01JTklNQVBfSEVJR0hUIC8gMiwgTVVMVElQTEFZRVJfTUlOSU1BUF9XSURUSCwgTVVMVElQTEFZRVJfTUlOSU1BUF9IRUlHSFQsIDEwKTtcclxuICAgICAgICBmcmFtZS5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlID0gbmV3IGNjLk5vZGUoXCJfdGl0bGVcIik7XHJcbiAgICAgICAgdGl0bGUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICB0aXRsZS5zZXRQb3NpdGlvbigwLCBNVUxUSVBMQVlFUl9NSU5JTUFQX0hFSUdIVCAvIDIgKyAxNik7XHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWwgPSB0aXRsZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nID0gXCLmiJjlnLrmgLvop4hcIjtcclxuICAgICAgICB0aXRsZUxhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5saW5lSGVpZ2h0ID0gMjI7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHRpdGxlTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHRpdGxlLmNvbG9yID0gY2MuY29sb3IoMjIwLCAyNDAsIDI1NSwgMjU1KTtcclxuXHJcbiAgICAgICAgbGV0IHZpZXdwb3J0ID0gbmV3IGNjLk5vZGUoXCJfdmlld3BvcnRcIik7XHJcbiAgICAgICAgdmlld3BvcnQucGFyZW50ID0gcm9vdDtcclxuICAgICAgICB2aWV3cG9ydC5zZXRDb250ZW50U2l6ZShNVUxUSVBMQVlFUl9NSU5JTUFQX1dJRFRIIC0gMTQsIE1VTFRJUExBWUVSX01JTklNQVBfSEVJR0hUIC0gMTQpO1xyXG5cclxuICAgICAgICBsZXQgYmcgPSB2aWV3cG9ydC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGJnLmZpbGxDb2xvciA9IGNjLmNvbG9yKDIyLCAzOCwgMjgsIDIyMCk7XHJcbiAgICAgICAgYmcucmVjdCgtdmlld3BvcnQud2lkdGggLyAyLCAtdmlld3BvcnQuaGVpZ2h0IC8gMiwgdmlld3BvcnQud2lkdGgsIHZpZXdwb3J0LmhlaWdodCk7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgc2FmZVpvbmVMYXllciA9IG5ldyBjYy5Ob2RlKFwiX3NhZmVab25lTGF5ZXJcIik7XHJcbiAgICAgICAgc2FmZVpvbmVMYXllci5wYXJlbnQgPSB2aWV3cG9ydDtcclxuICAgICAgICBsZXQgc2FmZVpvbmVHcmFwaGljcyA9IHNhZmVab25lTGF5ZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXllck1hcmtlciA9IG5ldyBjYy5Ob2RlKFwiX3BsYXllck1hcmtlclwiKTtcclxuICAgICAgICBwbGF5ZXJNYXJrZXIucGFyZW50ID0gdmlld3BvcnQ7XHJcbiAgICAgICAgbGV0IHBsYXllck1hcmtlckdyYXBoaWNzID0gcGxheWVyTWFya2VyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgIHJvb3RbXCJfdmlld3BvcnRcIl0gPSB2aWV3cG9ydDtcclxuICAgICAgICByb290W1wiX3NhZmVab25lR3JhcGhpY3NcIl0gPSBzYWZlWm9uZUdyYXBoaWNzO1xyXG4gICAgICAgIHJvb3RbXCJfcGxheWVyTWFya2VyXCJdID0gcGxheWVyTWFya2VyO1xyXG4gICAgICAgIHJvb3RbXCJfcGxheWVyTWFya2VyR3JhcGhpY3NcIl0gPSBwbGF5ZXJNYXJrZXJHcmFwaGljcztcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllck1pbmltYXAgPSByb290O1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTWluaW1hcFNhZmVab25lUmVuZGVyS2V5ID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoTXVsdGlwbGF5ZXJNaW5pbWFwVmlld3BvcnQoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoTXVsdGlwbGF5ZXJNaW5pbWFwU2FmZVpvbmUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE11bHRpcGxheWVyTWluaW1hcE1hcmtlcigpO1xyXG4gICAgICAgIHJldHVybiByb290O1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlTXVsdGlwbGF5ZXJNaW5pbWFwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1pbmltYXBVcGRhdGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwVXBkYXRlQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllck1pbmltYXBVcGRhdGVDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllck1pbmltYXAgJiYgY2MuaXNWYWxpZCh0aGlzLl9tdWx0aXBsYXllck1pbmltYXApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyTWluaW1hcC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTWluaW1hcCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwU2FmZVpvbmVSZW5kZXJLZXkgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRNdWx0aXBsYXllck1pbmltYXBSb290UG9zaXRpb24oKSB7XHJcbiAgICAgICAgbGV0IGZyYW1lU2l6ZSA9IHl5cC5nYW1lRnJhbWVTaXplIHx8IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKSB8fCBjYy53aW5TaXplO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGZyYW1lU2l6ZSAmJiBmcmFtZVNpemUud2lkdGggPiAwID8gZnJhbWVTaXplLndpZHRoIDogMTI4MDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gZnJhbWVTaXplICYmIGZyYW1lU2l6ZS5oZWlnaHQgPiAwID8gZnJhbWVTaXplLmhlaWdodCA6IDcyMDtcclxuICAgICAgICBsZXQgeCA9IHdpZHRoIC8gMiAtIE1VTFRJUExBWUVSX01JTklNQVBfV0lEVEggLyAyIC0gTVVMVElQTEFZRVJfTUlOSU1BUF9NQVJHSU5fUklHSFQ7XHJcbiAgICAgICAgbGV0IHkgPSBoZWlnaHQgLyAyIC0gTVVMVElQTEFZRVJfTUlOSU1BUF9IRUlHSFQgLyAyIC0gTVVMVElQTEFZRVJfTUlOSU1BUF9NQVJHSU5fVE9QO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICBfc2NoZWR1bGVNdWx0aXBsYXllck1pbmltYXBSZWZyZXNoKCkge1xyXG4gICAgICAgIHRoaXMuX2hpZGVNdWx0aXBsYXllck1pbmltYXAoKTtcclxuICAgICAgICB0aGlzLl9lbnN1cmVNdWx0aXBsYXllck1pbmltYXAoKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwVXBkYXRlQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZi5fbXVsdGlwbGF5ZXJNaW5pbWFwICYmIGNjLmlzVmFsaWQoc2VsZi5fbXVsdGlwbGF5ZXJNaW5pbWFwKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJNaW5pbWFwLnNldFBvc2l0aW9uKHNlbGYuX2dldE11bHRpcGxheWVyTWluaW1hcFJvb3RQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLl9yZWZyZXNoTXVsdGlwbGF5ZXJNaW5pbWFwVmlld3BvcnQoKTtcclxuICAgICAgICAgICAgc2VsZi5fcmVmcmVzaE11bHRpcGxheWVyTWluaW1hcE1hcmtlcigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLl9tdWx0aXBsYXllck1pbmltYXBVcGRhdGVDYWxsYmFjaywgTVVMVElQTEFZRVJfTUlOSU1BUF9NQVJLRVJfVVBEQVRFX0lOVEVSVkFMLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNdWx0aXBsYXllck1pbmltYXBWaWV3cG9ydCgpIHtcclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMuX211bHRpcGxheWVyTWluaW1hcDtcclxuICAgICAgICBpZiAoIXJvb3QgfHwgIWNjLmlzVmFsaWQocm9vdCkgfHwgIXRoaXMuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvb3QucGFyZW50ICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24odGhpcy5fZ2V0TXVsdGlwbGF5ZXJNaW5pbWFwUm9vdFBvc2l0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRNdWx0aXBsYXllck1pbmltYXBNYXBDb250ZXh0KCkge1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwO1xyXG4gICAgICAgIGlmICghcm9vdCB8fCAhY2MuaXNWYWxpZChyb290KSB8fCAhdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2aWV3cG9ydCA9IHJvb3RbXCJfdmlld3BvcnRcIl07XHJcbiAgICAgICAgbGV0IHNhZmVab25lR3JhcGhpY3MgPSByb290W1wiX3NhZmVab25lR3JhcGhpY3NcIl07XHJcbiAgICAgICAgbGV0IHBsYXllck1hcmtlciA9IHJvb3RbXCJfcGxheWVyTWFya2VyXCJdO1xyXG4gICAgICAgIGxldCBwbGF5ZXJNYXJrZXJHcmFwaGljcyA9IHJvb3RbXCJfcGxheWVyTWFya2VyR3JhcGhpY3NcIl07XHJcbiAgICAgICAgaWYgKCF2aWV3cG9ydCB8fCAhc2FmZVpvbmVHcmFwaGljcyB8fCAhcGxheWVyTWFya2VyIHx8ICFwbGF5ZXJNYXJrZXJHcmFwaGljcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbGVkID0gdGhpcy5fZmlyZS5fdGlsZWQ7XHJcbiAgICAgICAgbGV0IG1hcFNjcmlwdCA9IHRpbGVkICYmIHRpbGVkLnNjcmlwdCA/IHRpbGVkLnNjcmlwdCA6IG51bGw7XHJcbiAgICAgICAgbGV0IG1hcEJvdW5kcyA9IG1hcFNjcmlwdCAmJiBtYXBTY3JpcHQuZ2V0TWFwQm91bmRzID8gbWFwU2NyaXB0LmdldE1hcEJvdW5kcygpIDogbnVsbDtcclxuICAgICAgICBpZiAoIW1hcEJvdW5kcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhhbGZXaWR0aCA9IE1hdGgubWF4KDEsIG1hcEJvdW5kcy5oYWxmV2lkdGggfHwgMSk7XHJcbiAgICAgICAgbGV0IGhhbGZIZWlnaHQgPSBNYXRoLm1heCgxLCBtYXBCb3VuZHMuaGFsZkhlaWdodCB8fCAxKTtcclxuICAgICAgICBsZXQgbWFwUG9zVG9NaW5pbWFwID0gKHBvcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeCA9ICgocG9zLnggKyBoYWxmV2lkdGgpIC8gKGhhbGZXaWR0aCAqIDIpKSAqIHZpZXdwb3J0LndpZHRoIC0gdmlld3BvcnQud2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgeSA9ICgocG9zLnkgKyBoYWxmSGVpZ2h0KSAvIChoYWxmSGVpZ2h0ICogMikpICogdmlld3BvcnQuaGVpZ2h0IC0gdmlld3BvcnQuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoLXZpZXdwb3J0LndpZHRoIC8gMiwgTWF0aC5taW4odmlld3BvcnQud2lkdGggLyAyLCB4KSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCgtdmlld3BvcnQuaGVpZ2h0IC8gMiwgTWF0aC5taW4odmlld3BvcnQuaGVpZ2h0IC8gMiwgeSkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb290LFxyXG4gICAgICAgICAgICB2aWV3cG9ydCxcclxuICAgICAgICAgICAgc2FmZVpvbmVHcmFwaGljcyxcclxuICAgICAgICAgICAgcGxheWVyTWFya2VyLFxyXG4gICAgICAgICAgICBwbGF5ZXJNYXJrZXJHcmFwaGljcyxcclxuICAgICAgICAgICAgbWFwU2NyaXB0LFxyXG4gICAgICAgICAgICBtYXBCb3VuZHMsXHJcbiAgICAgICAgICAgIGhhbGZXaWR0aCxcclxuICAgICAgICAgICAgaGFsZkhlaWdodCxcclxuICAgICAgICAgICAgbWFwUG9zVG9NaW5pbWFwLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNdWx0aXBsYXllck1pbmltYXBNYXJrZXIoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLl9nZXRNdWx0aXBsYXllck1pbmltYXBNYXBDb250ZXh0KCk7XHJcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX2dldExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXIoKTtcclxuICAgICAgICBpZiAoIXBsYXllciB8fCAhY2MuaXNWYWxpZChwbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQucGxheWVyTWFya2VyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjb250ZXh0Lm1hcFBvc1RvTWluaW1hcChwbGF5ZXIucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBwbGF5ZXJNYXJrZXIgPSBjb250ZXh0LnBsYXllck1hcmtlcjtcclxuICAgICAgICBsZXQgcGxheWVyTWFya2VyR3JhcGhpY3MgPSBjb250ZXh0LnBsYXllck1hcmtlckdyYXBoaWNzO1xyXG4gICAgICAgIHBsYXllck1hcmtlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHBsYXllck1hcmtlci5zZXRQb3NpdGlvbihwbGF5ZXJQb3MpO1xyXG4gICAgICAgIHBsYXllck1hcmtlckdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgcGxheWVyTWFya2VyR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyMzUsIDExMCwgMjU1KTtcclxuICAgICAgICBwbGF5ZXJNYXJrZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgNSk7XHJcbiAgICAgICAgcGxheWVyTWFya2VyR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIHBsYXllck1hcmtlckdyYXBoaWNzLmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgICAgcGxheWVyTWFya2VyR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIHBsYXllck1hcmtlckdyYXBoaWNzLmNpcmNsZSgwLCAwLCA4KTtcclxuICAgICAgICBwbGF5ZXJNYXJrZXJHcmFwaGljcy5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBfYnVpbGRNdWx0aXBsYXllck1pbmltYXBTYWZlWm9uZVJlbmRlcktleShzYWZlWm9uZSwgY29udGV4dCkge1xyXG4gICAgICAgIGlmICghc2FmZVpvbmUgfHwgIWNvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBNYXRoLnJvdW5kKChzYWZlWm9uZS5jZW50ZXJYIHx8IDApICogMTApIC8gMTAsXHJcbiAgICAgICAgICAgIE1hdGgucm91bmQoKHNhZmVab25lLmNlbnRlclkgfHwgMCkgKiAxMCkgLyAxMCxcclxuICAgICAgICAgICAgTWF0aC5yb3VuZCgoc2FmZVpvbmUucmFkaXVzIHx8IDApICogMTApIC8gMTAsXHJcbiAgICAgICAgICAgICEhc2FmZVpvbmUuYWN0aXZlLFxyXG4gICAgICAgICAgICAhIXNhZmVab25lLmZpbmlzaGVkLFxyXG4gICAgICAgICAgICAhIXNhZmVab25lLnBvaXNvbkFjdGl2ZSxcclxuICAgICAgICAgICAgTWF0aC5yb3VuZCgoc2FmZVpvbmUucG9pc29uUmVtYWluaW5nIHx8IDApICogMTApIC8gMTAsXHJcbiAgICAgICAgICAgIGNvbnRleHQudmlld3BvcnQud2lkdGgsXHJcbiAgICAgICAgICAgIGNvbnRleHQudmlld3BvcnQuaGVpZ2h0LFxyXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNvbnRleHQuaGFsZldpZHRoICogMTApIC8gMTAsXHJcbiAgICAgICAgICAgIE1hdGgucm91bmQoY29udGV4dC5oYWxmSGVpZ2h0ICogMTApIC8gMTAsXHJcbiAgICAgICAgXS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVmcmVzaE11bHRpcGxheWVyTWluaW1hcFNhZmVab25lKGZvcmNlID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuX2dldE11bHRpcGxheWVyTWluaW1hcE1hcENvbnRleHQoKTtcclxuICAgICAgICBpZiAoIWNvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2FmZVpvbmVHcmFwaGljcyA9IGNvbnRleHQuc2FmZVpvbmVHcmFwaGljcztcclxuICAgICAgICBsZXQgc2FmZVpvbmUgPSBjb250ZXh0Lm1hcFNjcmlwdCAmJiBjb250ZXh0Lm1hcFNjcmlwdC5nZXRNdWx0aXBsYXllclNhZmVab25lU3RhdGVcclxuICAgICAgICAgICAgPyBjb250ZXh0Lm1hcFNjcmlwdC5nZXRNdWx0aXBsYXllclNhZmVab25lU3RhdGUoKVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgbGV0IHJlbmRlcktleSA9IHRoaXMuX2J1aWxkTXVsdGlwbGF5ZXJNaW5pbWFwU2FmZVpvbmVSZW5kZXJLZXkoc2FmZVpvbmUsIGNvbnRleHQpO1xyXG4gICAgICAgIGlmICghZm9yY2UgJiYgcmVuZGVyS2V5ID09PSB0aGlzLl9tdWx0aXBsYXllck1pbmltYXBTYWZlWm9uZVJlbmRlcktleSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTWluaW1hcFNhZmVab25lUmVuZGVyS2V5ID0gcmVuZGVyS2V5O1xyXG4gICAgICAgIHNhZmVab25lR3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICBpZiAoIXNhZmVab25lIHx8ICFOdW1iZXIuaXNGaW5pdGUoc2FmZVpvbmUucmFkaXVzKSB8fCBzYWZlWm9uZS5yYWRpdXMgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjZW50ZXIgPSBjb250ZXh0Lm1hcFBvc1RvTWluaW1hcChjYy52MihzYWZlWm9uZS5jZW50ZXJYIHx8IDAsIHNhZmVab25lLmNlbnRlclkgfHwgMCkpO1xyXG4gICAgICAgIGxldCByYWRpdXNYID0gTWF0aC5tYXgoMiwgc2FmZVpvbmUucmFkaXVzIC8gKGNvbnRleHQuaGFsZldpZHRoICogMikgKiBjb250ZXh0LnZpZXdwb3J0LndpZHRoKTtcclxuICAgICAgICBsZXQgcmFkaXVzWSA9IE1hdGgubWF4KDIsIHNhZmVab25lLnJhZGl1cyAvIChjb250ZXh0LmhhbGZIZWlnaHQgKiAyKSAqIGNvbnRleHQudmlld3BvcnQuaGVpZ2h0KTtcclxuICAgICAgICBzYWZlWm9uZUdyYXBoaWNzLmZpbGxDb2xvciA9IHNhZmVab25lLnBvaXNvbkFjdGl2ZVxyXG4gICAgICAgICAgICA/IGNjLmNvbG9yKDI1NSwgMTIwLCAxMjAsIDEwKVxyXG4gICAgICAgICAgICA6IGNjLmNvbG9yKDg4LCAxNzAsIDI1NSwgc2FmZVpvbmUuYWN0aXZlID8gMjIgOiAxMCk7XHJcbiAgICAgICAgc2FmZVpvbmVHcmFwaGljcy5lbGxpcHNlKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzWCwgcmFkaXVzWSk7XHJcbiAgICAgICAgc2FmZVpvbmVHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgc2FmZVpvbmVHcmFwaGljcy5saW5lV2lkdGggPSBzYWZlWm9uZS5wb2lzb25BY3RpdmUgPyAzIDogMjtcclxuICAgICAgICBzYWZlWm9uZUdyYXBoaWNzLnN0cm9rZUNvbG9yID0gc2FmZVpvbmUucG9pc29uQWN0aXZlID8gY2MuY29sb3IoMjU1LCAxMzAsIDEzMCwgMjMwKSA6IGNjLmNvbG9yKDEyMCwgMjIwLCAyNTUsIDIzMCk7XHJcbiAgICAgICAgc2FmZVpvbmVHcmFwaGljcy5lbGxpcHNlKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzWCwgcmFkaXVzWSk7XHJcbiAgICAgICAgc2FmZVpvbmVHcmFwaGljcy5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY29uc3VtZU11bHRpcGxheWVyRnJhbWVNZXRhKGNvbW1hbmQpIHtcclxuICAgICAgICBpZiAoIWNvbW1hbmQgfHwgIWNvbW1hbmQudHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT09IFwiaHVkU3RhdGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9hcHBseU11bHRpcGxheWVySHVkU3RhdGUoY29tbWFuZC5odWQgfHwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSBcImFubm91bmNlbWVudFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllckFubm91bmNlbWVudChjb21tYW5kLnRleHQgfHwgXCJcIiwgY29tbWFuZC5zdWJUZXh0IHx8IFwiXCIsIGNvbW1hbmQuc3R5bGUgfHwgXCJpbmZvXCIsIGNvbW1hbmQuZHVyYXRpb24gfHwgMi4yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT09IFwic2FmZVpvbmVTdGF0ZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hNdWx0aXBsYXllck1pbmltYXBTYWZlWm9uZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT09IFwibWF0Y2hSZXN1bHRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk11bHRpcGxheWVySGl0UmVwb3J0KGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSB8fCB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCB8fCAhZXZlbnQgfHwgIWV2ZW50LmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IGV2ZW50LmlkLFxyXG4gICAgICAgICAgICB0Z2lkOiBldmVudC50Z2lkLFxyXG4gICAgICAgICAgICBocDogZXZlbnQuaHAgPT0gbnVsbCA/IC0xIDogZXZlbnQuaHAsXHJcbiAgICAgICAgICAgIGRhbWFnZTogZXZlbnQuZGFtYWdlID09IG51bGwgPyAtMSA6IGV2ZW50LmRhbWFnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfbmV4dE11bHRpcGxheWVyQnVsbGV0SWQoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllcklkID0gdGhpcy5fbmV0TWFuYWdlciA/IHRoaXMuX25ldE1hbmFnZXIucGxheWVySWQgOiAwO1xyXG4gICAgICAgIGxldCBpZCA9IHBsYXllcklkICsgXCJfXCIgKyB0aGlzLl9tdWx0aXBsYXllckZpcmVTZXE7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJGaXJlU2VxKys7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRMb2NhbE11bHRpcGxheWVyUGxheWVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkTXVsdGlwbGF5ZXJGaXJlQ29tbWFuZCgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0TG9jYWxNdWx0aXBsYXllclBsYXllcigpO1xyXG4gICAgICAgIGxldCBmaXJlVHlwZSA9IDE7XHJcbiAgICAgICAgaWYgKHBsYXllciAmJiBwbGF5ZXIuc2NyaXB0ICYmIHBsYXllci5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJGaXJlVHlwZSkge1xyXG4gICAgICAgICAgICBmaXJlVHlwZSA9IHBsYXllci5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJGaXJlVHlwZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5fbmV4dE11bHRpcGxheWVyQnVsbGV0SWQoKSxcclxuICAgICAgICAgICAgdHlwZTogZmlyZVR5cGUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlRGVmYXVsdE11bHRpcGxheWVySW5wdXRzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVwOiBmYWxzZSxcclxuICAgICAgICAgICAgZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByaWdodDogZmFsc2UsXHJcbiAgICAgICAgICAgIGFpbTogbnVsbCxcclxuICAgICAgICAgICAgZmlyZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBpY2t1cEVuZXJneUlkOiBudWxsLFxyXG4gICAgICAgICAgICBwaWNrdXBUYXJJZDogbnVsbCxcclxuICAgICAgICAgICAgcGlja3VwQmxhY2tIb2xlSWQ6IG51bGwsXHJcbiAgICAgICAgICAgIHRocm93VGFyOiBmYWxzZSxcclxuICAgICAgICAgICAgdGhyb3dCbGFja0hvbGU6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMgPSB0aGlzLl9jcmVhdGVEZWZhdWx0TXVsdGlwbGF5ZXJJbnB1dHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySW5wdXRzLnBpY2t1cEVuZXJneUlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMucGlja3VwRW5lcmd5SWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMucGlja3VwVGFySWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllcklucHV0cy5waWNrdXBUYXJJZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy5waWNrdXBCbGFja0hvbGVJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnBpY2t1cEJsYWNrSG9sZUlkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySW5wdXRzLmFpbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLmFpbSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy50aHJvd1RhciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnRocm93VGFyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy50aHJvd0JsYWNrSG9sZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnRocm93QmxhY2tIb2xlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsYXllcklucHV0cztcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJNdWx0aXBsYXllck9uZVNob3RJbnB1dHMoKSB7XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLmZpcmUgPSBmYWxzZTtcclxuICAgICAgICBpbnB1dHMuaGl0ID0gZmFsc2U7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cEVuZXJneUlkID0gbnVsbDtcclxuICAgICAgICBpbnB1dHMucGlja3VwVGFySWQgPSBudWxsO1xyXG4gICAgICAgIGlucHV0cy5waWNrdXBCbGFja0hvbGVJZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQtLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbnB1dHMudGhyb3dUYXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlucHV0cy50aHJvd0JsYWNrSG9sZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlucHV0cy50aHJvd1RhciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnB1dHMudGhyb3dCbGFja0hvbGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2ZsdXNoTXVsdGlwbGF5ZXJJbnB1dHNOb3coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSB8fCB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCB8fCAhdGhpcy5fbmV0TWFuYWdlciB8fCAhdGhpcy5fbmV0TWFuYWdlci5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLnNlbmRJbnB1dCh0aGlzLl9idWlsZE11bHRpcGxheWVySW5wdXRQYWNrZXQoKSk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJNdWx0aXBsYXllck9uZVNob3RJbnB1dHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBfYnVpbGRNdWx0aXBsYXllcklucHV0UGFja2V0KCkge1xyXG4gICAgICAgIGxldCBzb3VyY2UgPSB0aGlzLl9lbnN1cmVNdWx0aXBsYXllcklucHV0cygpO1xyXG4gICAgICAgIGxldCBoaXQgPSB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlLmxlbmd0aCA+IDAgPyB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlLnNoaWZ0KCkgOiBmYWxzZTtcclxuICAgICAgICBsZXQgYnVsbGV0RXZlbnRzID0gdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgPyB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUuc3BsaWNlKDAsIHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZS5sZW5ndGgpXHJcbiAgICAgICAgICAgIDogW107XHJcbiAgICAgICAgbGV0IHBpY2t1cEVuZXJneUlkID0gc291cmNlLnBpY2t1cEVuZXJneUlkID09IG51bGwgPyBudWxsIDogc291cmNlLnBpY2t1cEVuZXJneUlkO1xyXG4gICAgICAgIGxldCBwaWNrdXBUYXJJZCA9IHNvdXJjZS5waWNrdXBUYXJJZCA9PSBudWxsID8gbnVsbCA6IHNvdXJjZS5waWNrdXBUYXJJZDtcclxuICAgICAgICBsZXQgcGlja3VwQmxhY2tIb2xlSWQgPSBzb3VyY2UucGlja3VwQmxhY2tIb2xlSWQgPT0gbnVsbCA/IG51bGwgOiBzb3VyY2UucGlja3VwQmxhY2tIb2xlSWQ7XHJcbiAgICAgICAgbGV0IGFpbSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5haW0gJiYgTnVtYmVyLmlzRmluaXRlKHNvdXJjZS5haW0ueCkgJiYgTnVtYmVyLmlzRmluaXRlKHNvdXJjZS5haW0ueSkpIHtcclxuICAgICAgICAgICAgYWltID0ge1xyXG4gICAgICAgICAgICAgICAgeDogTnVtYmVyKHNvdXJjZS5haW0ueC50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgICAgIHk6IE51bWJlcihzb3VyY2UuYWltLnkudG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVwOiAhIXNvdXJjZS51cCxcclxuICAgICAgICAgICAgZG93bjogISFzb3VyY2UuZG93bixcclxuICAgICAgICAgICAgbGVmdDogISFzb3VyY2UubGVmdCxcclxuICAgICAgICAgICAgcmlnaHQ6ICEhc291cmNlLnJpZ2h0LFxyXG4gICAgICAgICAgICBhaW06IGFpbSxcclxuICAgICAgICAgICAgZmlyZTogc291cmNlLmZpcmUgPyBzb3VyY2UuZmlyZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaXQ6IGhpdCB8fCBmYWxzZSxcclxuICAgICAgICAgICAgYnVsbGV0RXZlbnRzOiBidWxsZXRFdmVudHMsXHJcbiAgICAgICAgICAgIHBpY2t1cEVuZXJneUlkOiBwaWNrdXBFbmVyZ3lJZCxcclxuICAgICAgICAgICAgcGlja3VwVGFySWQ6IHBpY2t1cFRhcklkLFxyXG4gICAgICAgICAgICBwaWNrdXBCbGFja0hvbGVJZDogcGlja3VwQmxhY2tIb2xlSWQsXHJcbiAgICAgICAgICAgIHRocm93VGFyOiBzb3VyY2UudGhyb3dUYXIgPyBzb3VyY2UudGhyb3dUYXIgOiBmYWxzZSxcclxuICAgICAgICAgICAgdGhyb3dCbGFja0hvbGU6IHNvdXJjZS50aHJvd0JsYWNrSG9sZSA/IHNvdXJjZS50aHJvd0JsYWNrSG9sZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBwbGF5ZXJTbmFwc2hvdDogdGhpcy5fYnVpbGRMb2NhbE11bHRpcGxheWVyUGxheWVyU25hcHNob3QoKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXJTbmFwc2hvdCgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0TG9jYWxNdWx0aXBsYXllclBsYXllcigpO1xyXG4gICAgICAgIGlmICghcGxheWVyIHx8ICFwbGF5ZXIuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpciA9IHBsYXllci5zY3JpcHQuX2RpciAmJiBwbGF5ZXIuc2NyaXB0Ll9kaXIubWFnU3FyKCkgPiAwXHJcbiAgICAgICAgICAgID8gY2MudjIocGxheWVyLnNjcmlwdC5fZGlyKS5ub3JtYWxpemUoKVxyXG4gICAgICAgICAgICA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IE1hdGgucm91bmQocGxheWVyLngpLFxyXG4gICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHBsYXllci55KSxcclxuICAgICAgICAgICAgZGlyWDogTnVtYmVyKGRpci54LnRvRml4ZWQoNCkpLFxyXG4gICAgICAgICAgICBkaXJZOiBOdW1iZXIoZGlyLnkudG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgIHNwZWVkOiBOdW1iZXIoKHBsYXllci5zY3JpcHQuX2N1cnJlbnRTcGVlZCB8fCAwKS50b0ZpeGVkKDMpKSxcclxuICAgICAgICAgICAgcmFkaXVzOiBwbGF5ZXIuc2NyaXB0LmdldFJhZGl1cyA/IHBsYXllci5zY3JpcHQuZ2V0UmFkaXVzKCkgOiAzOCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZE11bHRpcGxheWVyUGxheWVyU2V0dXAoKSB7XHJcbiAgICAgICAgbGV0IGVuZXJneVNwYXduUG9pbnRzID0gW107XHJcbiAgICAgICAgbGV0IG1hcEJvdW5kcyA9IG51bGw7XHJcbiAgICAgICAgbGV0IHNwYXduQ2FuZGlkYXRlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX3RpbGVkICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJFbmVyZ3lTcGF3blBvaW50cykge1xyXG4gICAgICAgICAgICBlbmVyZ3lTcGF3blBvaW50cyA9IHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllckVuZXJneVNwYXduUG9pbnRzKDUxMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX3RpbGVkICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJNYXBCb3VuZHMpIHtcclxuICAgICAgICAgICAgbWFwQm91bmRzID0gdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyTWFwQm91bmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX3RpbGVkICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJTcGF3bkNhbmRpZGF0ZXMpIHtcclxuICAgICAgICAgICAgc3Bhd25DYW5kaWRhdGVzID0gdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyU3Bhd25DYW5kaWRhdGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBidXNoU3Bhd25Qb2ludHMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl90aWxlZCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyQnVzaFNwYXduUG9pbnRzKSB7XHJcbiAgICAgICAgICAgIGJ1c2hTcGF3blBvaW50cyA9IHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllckJ1c2hTcGF3blBvaW50cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YW5rVHlwZTogTVVMVElQTEFZRVJfREVGQVVMVF9UQU5LX1RZUEUsXHJcbiAgICAgICAgICAgIHBsYXllckxldmVsOiBNVUxUSVBMQVlFUl9GSVhFRF9QTEFZRVJfTEVWRUwsXHJcbiAgICAgICAgICAgIGJhc2VIcDogTVVMVElQTEFZRVJfRklYRURfQkFTRV9IUCxcclxuICAgICAgICAgICAgYmFzZUF0azogTVVMVElQTEFZRVJfRklYRURfQkFTRV9BVEssXHJcbiAgICAgICAgICAgIGJhc2VTcGVlZDogTVVMVElQTEFZRVJfRklYRURfQkFTRV9TUEVFRCxcclxuICAgICAgICAgICAgYmFzZUF0dGFja1JhZGl1czogTVVMVElQTEFZRVJfRklYRURfQVRUQUNLX1JBRElVUyxcclxuICAgICAgICAgICAgZW5lcmd5U3Bhd25Qb2ludHM6IGVuZXJneVNwYXduUG9pbnRzLFxyXG4gICAgICAgICAgICBtYXBCb3VuZHM6IG1hcEJvdW5kcyxcclxuICAgICAgICAgICAgc3Bhd25DYW5kaWRhdGVzOiBzcGF3bkNhbmRpZGF0ZXMsXHJcbiAgICAgICAgICAgIGJ1c2hTcGF3blBvaW50czogYnVzaFNwYXduUG9pbnRzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJQbGF5ZXJEZWF0aChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgIWV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LmlzTG9jYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLkvaDlt7Looqvmt5jmsbDvvIznrYnlvoXmnKzlsYDnu5PnrpcuLi5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllckFubm91bmNlbWVudChcIuS9oOW3suiiq+a3mOaxsFwiLCBcIuetieW+heWFtuS9meeOqeWutuWGs+WHuuiDnOi0n1wiLCBcIndhcm5pbmdcIiwgMi4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJFbmVyZ3lQaWNrdXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCBldmVudC5lbmVyZ3lJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cEVuZXJneUlkID0gZXZlbnQuZW5lcmd5SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJUYXJQaWNrdXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCBldmVudC5waWNrdXBJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cFRhcklkID0gZXZlbnQucGlja3VwSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJCbGFja0hvbGVQaWNrdXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCBldmVudC5waWNrdXBJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cEJsYWNrSG9sZUlkID0gZXZlbnQucGlja3VwSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJUaHJvd1RhcihldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgfHwgIWV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnRocm93VGFyID0ge1xyXG4gICAgICAgICAgICBkaXJYOiBldmVudC5kaXJYLFxyXG4gICAgICAgICAgICBkaXJZOiBldmVudC5kaXJZLFxyXG4gICAgICAgICAgICByYXRpbzogZXZlbnQucmF0aW8sXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gNDtcclxuICAgICAgICB0aGlzLl9mbHVzaE11bHRpcGxheWVySW5wdXRzTm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJUaHJvd0JsYWNrSG9sZShldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgfHwgIWV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnRocm93QmxhY2tIb2xlID0ge1xyXG4gICAgICAgICAgICBkaXJYOiBldmVudC5kaXJYLFxyXG4gICAgICAgICAgICBkaXJZOiBldmVudC5kaXJZLFxyXG4gICAgICAgICAgICByYXRpbzogZXZlbnQucmF0aW8sXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gNDtcclxuICAgICAgICB0aGlzLl9mbHVzaE11bHRpcGxheWVySW5wdXRzTm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJCdWxsZXRFdmVudChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgfHwgIWV2ZW50IHx8ICFldmVudC50eXBlIHx8ICFldmVudC5idWxsZXRJZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgICAgICAgICAgYnVsbGV0SWQ6IGV2ZW50LmJ1bGxldElkLFxyXG4gICAgICAgICAgICBldmVudElkOiBldmVudC5ldmVudElkID09IG51bGwgPyBudWxsIDogZXZlbnQuZXZlbnRJZCxcclxuICAgICAgICAgICAgcmVhc29uOiBldmVudC5yZWFzb24gfHwgXCJcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlLmxlbmd0aCA+IDEyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZS5zcGxpY2UoMCwgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlLmxlbmd0aCAtIDEyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZU11bHRpcGxheWVyU3RhdHVzRnJvbVJvb21TdGF0ZShwYXlsb2FkKSB7XHJcbiAgICAgICAgaWYgKCFwYXlsb2FkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBheWxvYWQuc3RhdGUgPT0gXCJ3YWl0aW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd011bHRpcGxheWVyU3RhdHVzKFwi562J5b6F546p5a625Yqg5YWlIChcIiArIHBheWxvYWQucGxheWVyQ291bnQgKyBcIi9cIiArIHBheWxvYWQubWluUGxheWVycyArIFwiLVwiICsgcGF5bG9hZC5tYXhQbGF5ZXJzICsgXCIpXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwYXlsb2FkLnN0YXRlID09IFwiY291bnRkb3duXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd011bHRpcGxheWVyU3RhdHVzKFwi5ri45oiP5YCS6K6h5pe2IFwiICsgcGF5bG9hZC5jb3VudGRvd24gKyBcIiDnp5JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBheWxvYWQuc3RhdGUgPT0gXCJlbmRlZFwiICYmICF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmnKzlsYDlt7Lnu5PmnZ9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93TXVsdGlwbGF5ZXJGaW5pc2goaXNXaW4sIHdpbm5lclBsYXllcklkKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLnNjcmlwdC5yZWZyZXNoTGV2ZWxJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnNldEZpbmlzaCgpO1xyXG5cclxuICAgICAgICBsZXQgZmluaXNoID0gY2MuaW5zdGFudGlhdGUodGhpcy5maW5pc2hQcmVmYWIpO1xyXG4gICAgICAgIGZpbmlzaC56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIFV0aWxzLmFkZHRvQ3VycmVudFNjZW5lKGZpbmlzaCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdFRleHQgPSBcIlwiO1xyXG4gICAgICAgIGlmICh3aW5uZXJQbGF5ZXJJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFRleHQgPSBpc1dpbiA/IFwi5pys5bGA6IOc5Yip77yM5L2g6I635b6X5LqG5pyA57uI6IOc5YipXCIgOiAoXCLmnKzlsYDlpLHliKnvvIznjqnlrrZcIiArICh3aW5uZXJQbGF5ZXJJZCArIDEpICsgXCLojrfog5xcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJlc3VsdFRleHQgPSBcIuacrOWxgOW5s+WxgO+8jOetieW+heS4i+S4gOWxgOWGjeaImFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLCBpc1dpbiwgdHJ1ZSwgcmVzdWx0VGV4dCk7XHJcblxyXG4gICAgICAgIGlmICh3aW5uZXJQbGF5ZXJJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhpc1dpbiA/IFwi5L2g6I636IOc5LqGXCIgOiAoXCLnjqnlrrYgXCIgKyAod2lubmVyUGxheWVySWQgKyAxKSArIFwiIOiOt+iDnFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuacrOWxgOW5s+WxgFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2VuZE11bHRpcGxheWVyTWF0Y2gocGF5bG9hZCkge1xyXG4gICAgICAgIGxldCB3aW5uZXJQbGF5ZXJJZCA9IHBheWxvYWQgJiYgcGF5bG9hZC53aW5uZXJQbGF5ZXJJZCAhPSBudWxsID8gcGF5bG9hZC53aW5uZXJQbGF5ZXJJZCA6IC0xO1xyXG4gICAgICAgIGxldCBsb2NhbFBsYXllcklkID0gdGhpcy5fbmV0TWFuYWdlciA/IHRoaXMuX25ldE1hbmFnZXIucGxheWVySWQgOiAtMTtcclxuICAgICAgICBsZXQgaXNXaW4gPSB3aW5uZXJQbGF5ZXJJZCA+PSAwICYmIHdpbm5lclBsYXllcklkID09IGxvY2FsUGxheWVySWQ7XHJcblxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkRpc2Nvbm5lY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hpZGVNdWx0aXBsYXllckh1ZCgpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllckZpbmlzaChpc1dpbiwgd2lubmVyUGxheWVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydE11bHRpcGxheWVyR2FtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmV0TWFuYWdlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uRGlzY29ubmVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySGl0UXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gMDtcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVyQW5ub3VuY2VtZW50KCk7XHJcbiAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVySHVkKCk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRHYW1lQmVmb3JlVGVzdCgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuato+WcqOi/nuaOpeacjeWKoeWZqCB3czovLzE3Mi4xNi41MC40NToyNTY3IC4uLlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG5ldyBOZXR3b3JrTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25Db3VudGRvd24gPSAoc2Vjb25kcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmuLjmiI/lgJLorqHml7YgXCIgKyBzZWNvbmRzICsgXCIg56eSXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vblBsYXllckNvdW50ID0gKGNvdW50LCBtYXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd011bHRpcGxheWVyU3RhdHVzKFwi5bey6L+e5o6l77yM562J5b6F546p5a62IChcIiArIGNvdW50ICsgXCIvXCIgKyBtYXggKyBcIilcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uUm9vbVN0YXRlID0gKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTXVsdGlwbGF5ZXJTdGF0dXNGcm9tUm9vbVN0YXRlKHBheWxvYWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkNvbm5lY3RlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuc2VuZFBsYXllclNldHVwKHRoaXMuX2J1aWxkTXVsdGlwbGF5ZXJQbGF5ZXJTZXR1cCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkdhbWVTdGFydCA9IChwbGF5ZXJJZCwgcGxheWVyQ291bnQsIHNwYXduU2xvdHMsIGVuZXJnaWVzLCBwbGF5ZXJzLCBzcGVjaWFsRXZlbnRzLCB0YXJQaWNrdXBzLCB0YXJTcGlsbHMsIGJsYWNrSG9sZVBpY2t1cHMsIGJsYWNrSG9sZVpvbmVzLCBidXNoZXMsIHNhZmVab25lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0TXVsdGlwbGF5ZXJNYXRjaChwbGF5ZXJJZCwgcGxheWVyQ291bnQgfHwgMiwgc3Bhd25TbG90cyB8fCBbXSwgZW5lcmdpZXMgfHwgW10sIHBsYXllcnMgfHwgW10sIHNwZWNpYWxFdmVudHMgfHwgW10sIHRhclBpY2t1cHMgfHwgW10sIHRhclNwaWxscyB8fCBbXSwgYmxhY2tIb2xlUGlja3VwcyB8fCBbXSwgYmxhY2tIb2xlWm9uZXMgfHwgW10sIGJ1c2hlcyB8fCBbXSwgc2FmZVpvbmUgfHwgbnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uR2FtZUVuZGVkID0gKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZW5kTXVsdGlwbGF5ZXJNYXRjaChwYXlsb2FkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25EaXNjb25uZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLov57mjqXmlq3lvIBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVyQW5ub3VuY2VtZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpZGVNdWx0aXBsYXllckh1ZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5jb25uZWN0KFwid3M6Ly8xNzIuMTYuNTAuNDU6MjU2N1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRNdWx0aXBsYXllck1hdGNoKHBsYXllcklkLCBwbGF5ZXJDb3VudCwgc3Bhd25TbG90cywgZW5lcmdpZXMsIHBsYXllcnMgPSBbXSwgc3BlY2lhbEV2ZW50cyA9IFtdLCB0YXJQaWNrdXBzID0gW10sIHRhclNwaWxscyA9IFtdLCBibGFja0hvbGVQaWNrdXBzID0gW10sIGJsYWNrSG9sZVpvbmVzID0gW10sIGJ1c2hlcyA9IFtdLCBzYWZlWm9uZSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJTdGF0dXMoKTtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQoKTtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJIdWQoKTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJGaXJlU2VxID0gMTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllcklucHV0cyA9IHRoaXMuX2NyZWF0ZURlZmF1bHRNdWx0aXBsYXllcklucHV0cygpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0TXVsdGlwbGF5ZXJHYW1lKHBsYXllckNvdW50IHx8IDIsIHBsYXllcklkLCBzcGF3blNsb3RzIHx8IFtdLCBlbmVyZ2llcyB8fCBbXSwgcGxheWVycyB8fCBbXSwgc3BlY2lhbEV2ZW50cyB8fCBbXSwgdGFyUGlja3VwcyB8fCBbXSwgdGFyU3BpbGxzIHx8IFtdLCBibGFja0hvbGVQaWNrdXBzIHx8IFtdLCBibGFja0hvbGVab25lcyB8fCBbXSwgYnVzaGVzIHx8IFtdLCBzYWZlWm9uZSB8fCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3VpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuX3NjaGVkdWxlTXVsdGlwbGF5ZXJNaW5pbWFwUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICBzZWxmLl9zZXR1cE11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyh0aGlzLl9tdWx0aXBsYXllcklucHV0TG9vcFRhZyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySm95TW92ZUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImpveS1zdGlja1wiLCB0aGlzLl9tdWx0aXBsYXllckpveU1vdmVIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckpveVNob290SGFuZGxlcikge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiam95LXN0aWNrLXNob290XCIsIHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQ2FtZXJhRm9sbG93Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2V0dXBNdWx0aXBsYXllcklucHV0TG9vcCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG5cclxuICAgICAgICAvLyBUcmFjayBtb3ZlbWVudCB2aWEgam95LXN0aWNrIEVWRU5UIChmaXJlcyByYXRpbzowIG9uIHJlbGVhc2UsIHJlbGlhYmxlKVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySm95TW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLl9tdWx0aXBsYXllckFjdGl2ZSB8fCBzZWxmLl9tdWx0aXBsYXllckxvY2FsRGVhZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQucmF0aW8gPiAwICYmIGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy51cCA9IGV2ZW50LmRpci55ID4gMC4zO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJJbnB1dHMuZG93biA9IGV2ZW50LmRpci55IDwgLTAuMztcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmxlZnQgPSBldmVudC5kaXIueCA8IC0wLjM7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5yaWdodCA9IGV2ZW50LmRpci54ID4gMC4zO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmF0aW89PTAgbWVhbnMgZmluZ2VyIGxpZnRlZCDigJQgY2xlYXIgbW92ZW1lbnRcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5kb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5sZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5yaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJqb3ktc3RpY2tcIiwgdGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIFRyYWNrIGZpcmUgdmlhIGV2ZW50IChzaW5nbGUtc2hvdCBldmVudClcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckpveVNob290SGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX211bHRpcGxheWVyQWN0aXZlIHx8IHNlbGYuX211bHRpcGxheWVyTG9jYWxEZWFkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBpbnB1dHMgPSBzZWxmLl9lbnN1cmVNdWx0aXBsYXllcklucHV0cygpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBhaW1EaXIgPSBjYy52MihldmVudC5kaXIpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHNlbGYuX2dldExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLnNjcmlwdCAmJiBwbGF5ZXIuc2NyaXB0LnVwZGF0ZU11bHRpcGxheWVyTG9jYWxBaW1QcmV2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNjcmlwdC51cGRhdGVNdWx0aXBsYXllckxvY2FsQWltUHJldmlldyhhaW1EaXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5wdXRzLmFpbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBhaW1EaXIueCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBhaW1EaXIueSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmZpcmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIgPSBzZWxmLl9nZXRMb2NhbE11bHRpcGxheWVyUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyICYmIHBsYXllci5zY3JpcHQgJiYgcGxheWVyLnNjcmlwdC5jYW5BZmZvcmRNdWx0aXBsYXllckZpcmUgJiYgIXBsYXllci5zY3JpcHQuY2FuQWZmb3JkTXVsdGlwbGF5ZXJGaXJlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnNjcmlwdC5fZnJlZUJ1bGxldENvdW50IDw9IDAgJiYgcGxheWVyLnNjcmlwdC5fc2hvd0xvd0hwU2hvb3RUaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5fc2hvd0xvd0hwU2hvb3RUaXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5wdXRzLmZpcmUgPSBzZWxmLl9idWlsZE11bHRpcGxheWVyRmlyZUNvbW1hbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiam95LXN0aWNrLXNob290XCIsIHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gRnJhbWUgc3luYzogbGlzdGVuIGZvciBmcmFtZSBkYXRhIGZyb20gc2VydmVyXHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkZyYW1lID0gZnVuY3Rpb24gKGZyYW1lRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX211bHRpcGxheWVyQWN0aXZlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBjb21tYW5kcyA9IGZyYW1lRGF0YSAmJiBBcnJheS5pc0FycmF5KGZyYW1lRGF0YS5jb21tYW5kcykgPyBmcmFtZURhdGEuY29tbWFuZHMgOiBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fY29uc3VtZU11bHRpcGxheWVyRnJhbWVNZXRhKGNvbW1hbmRzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zaW11bGF0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuc2ltdWxhdGVGcmFtZShmcmFtZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2VuZCBsb2NhbCBpbnB1dHMgYXQgdGljayByYXRlICgyMEh6KVxyXG4gICAgICAgIGxldCBpbnB1dExvb3AgPSBjYy5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxIC8gMjApLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgIXNlbGYuX25ldE1hbmFnZXIgfHwgIXNlbGYuX25ldE1hbmFnZXIuY29ubmVjdGVkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX211bHRpcGxheWVyTG9jYWxEZWFkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fbmV0TWFuYWdlci5zZW5kSW5wdXQoc2VsZi5fYnVpbGRNdWx0aXBsYXllcklucHV0UGFja2V0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFyTXVsdGlwbGF5ZXJPbmVTaG90SW5wdXRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbWVyYSBmb2xsb3dcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5fY2VudGVyT25Mb2NhbFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIGlucHV0TG9vcC5zZXRUYWcodGhpcy5fbXVsdGlwbGF5ZXJJbnB1dExvb3BUYWcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oaW5wdXRMb29wKTtcclxuXHJcbiAgICAgICAgLy8gU21vb3RoIGNhbWVyYSBmb2xsb3cgZXZlcnkgZnJhbWUgdmlhIHNjaGVkdWxlclxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQ2FtZXJhRm9sbG93Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RpbGVkICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0Ll9jZW50ZXJPbkxvY2FsUGxheWVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjaywgMC4wMTYsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH1cclxufVxyXG4iXX0=