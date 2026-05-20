
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
var MULTIPLAYER_SERVER_URL = "ws://127.0.0.1:2567";
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
        _this._multiplayerCoverToggleRepeat = 0;
        _this._multiplayerFireSeq = 1;
        _this._multiplayerCoverActionSeq = 1;
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
        yyp.eventCenter.on("multiplayer-cover-action", this._onMultiplayerCoverAction, this);
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
        yyp.eventCenter.off("multiplayer-cover-action", this._onMultiplayerCoverAction, this);
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
            toggleCover: false,
            coverAction: null,
            energyEggAction: null,
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
        if (this._multiplayerInputs.toggleCover === undefined) {
            this._multiplayerInputs.toggleCover = false;
        }
        if (this._multiplayerInputs.coverAction === undefined) {
            this._multiplayerInputs.coverAction = null;
        }
        if (this._multiplayerInputs.energyEggAction === undefined) {
            this._multiplayerInputs.energyEggAction = null;
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
        if (this._multiplayerCoverToggleRepeat > 0) {
            this._multiplayerCoverToggleRepeat--;
            if (this._multiplayerCoverToggleRepeat <= 0) {
                this._multiplayerCoverToggleRepeat = 0;
                inputs.toggleCover = false;
            }
        }
        else {
            inputs.toggleCover = false;
        }
        inputs.coverAction = null;
        inputs.energyEggAction = null;
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
            toggleCover: !!source.toggleCover,
            coverAction: source.coverAction ? source.coverAction : null,
            energyEggAction: source.energyEggAction ? source.energyEggAction : null,
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
    GameMain.prototype._onMultiplayerCoverAction = function () {
        if (!this._multiplayerActive || this._multiplayerLocalDead) {
            return;
        }
        var mapScript = this._fire && this._fire._tiled ? this._fire._tiled.script : null;
        if (mapScript && mapScript.isLocalMultiplayerCoverActionAvailable && !mapScript.isLocalMultiplayerCoverActionAvailable()) {
            return;
        }
        var actionPayload = null;
        if (mapScript && mapScript.buildLocalMultiplayerInteractionAction) {
            actionPayload = mapScript.buildLocalMultiplayerInteractionAction(this._multiplayerCoverActionSeq++);
        }
        else if (mapScript && mapScript.buildLocalMultiplayerCoverAction) {
            var coverAction = mapScript.buildLocalMultiplayerCoverAction(this._multiplayerCoverActionSeq++);
            actionPayload = coverAction ? { coverAction: coverAction } : null;
        }
        else if (mapScript && mapScript.notifyLocalMultiplayerCoverToggleRequested) {
            mapScript.notifyLocalMultiplayerCoverToggleRequested();
        }
        if (!actionPayload) {
            return;
        }
        var inputs = this._ensureMultiplayerInputs();
        inputs.toggleCover = false;
        inputs.coverAction = actionPayload.coverAction || null;
        inputs.energyEggAction = actionPayload.energyEggAction || null;
        this._multiplayerCoverToggleRepeat = 0;
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
        this._multiplayerCoverToggleRepeat = 0;
        this._multiplayerCoverActionSeq = 1;
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
        this._multiplayerCoverToggleRepeat = 0;
        this._multiplayerCoverActionSeq = 1;
        this._teardownMultiplayerInputLoop();
        this._hideMultiplayerAnnouncement();
        this._hideMultiplayerHud();
        this._resetGameBeforeTest();
        this._hideUpgradeChoicePanel(false);
        this._showMultiplayerStatus("正在连接服务器 " + MULTIPLAYER_SERVER_URL + " ...");
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
        this._netManager.onGameStart = function (playerId, playerCount, spawnSlots, energies, players, specialEvents, tarPickups, tarSpills, blackHolePickups, blackHoleZones, bushes, covers, safeZone) {
            _this._startMultiplayerMatch(playerId, playerCount || 2, spawnSlots || [], energies || [], players || [], specialEvents || [], tarPickups || [], tarSpills || [], blackHolePickups || [], blackHoleZones || [], bushes || [], covers || [], safeZone || null);
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
        this._netManager.connect(MULTIPLAYER_SERVER_URL);
    };
    GameMain.prototype._startMultiplayerMatch = function (playerId, playerCount, spawnSlots, energies, players, specialEvents, tarPickups, tarSpills, blackHolePickups, blackHoleZones, bushes, covers, safeZone) {
        if (players === void 0) { players = []; }
        if (specialEvents === void 0) { specialEvents = []; }
        if (tarPickups === void 0) { tarPickups = []; }
        if (tarSpills === void 0) { tarSpills = []; }
        if (blackHolePickups === void 0) { blackHolePickups = []; }
        if (blackHoleZones === void 0) { blackHoleZones = []; }
        if (bushes === void 0) { bushes = []; }
        if (covers === void 0) { covers = []; }
        if (safeZone === void 0) { safeZone = null; }
        this._hideMultiplayerStatus();
        this._hideMultiplayerAnnouncement();
        this._hideMultiplayerHud();
        this._multiplayerActive = true;
        this._multiplayerLocalDead = false;
        this._multiplayerHitQueue = [];
        this._multiplayerBulletEventQueue = [];
        this._multiplayerTarThrowRepeat = 0;
        this._multiplayerCoverToggleRepeat = 0;
        this._multiplayerFireSeq = 1;
        this._multiplayerCoverActionSeq = 1;
        this._multiplayerInputs = this._createDefaultMultiplayerInputs();
        var self = this;
        this._fire._tiled.script.startMultiplayerGame(playerCount || 2, playerId, spawnSlots || [], energies || [], players || [], specialEvents || [], tarPickups || [], tarSpills || [], blackHolePickups || [], blackHoleZones || [], bushes || [], covers || [], safeZone || null, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsMkRBQTBEO0FBRTFELDRDQUF5QztBQUN6QywwQ0FBdUM7QUFDdkMsMENBQXVDO0FBRWpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQzFDLElBQU0sNkJBQTZCLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLElBQU0sOEJBQThCLEdBQUcsQ0FBQyxDQUFDO0FBQ3pDLElBQU0seUJBQXlCLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLElBQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBQ3RDLElBQU0sNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sK0JBQStCLEdBQUcsR0FBRyxDQUFDO0FBQzVDLElBQU0seUJBQXlCLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLElBQU0sMEJBQTBCLEdBQUcsR0FBRyxDQUFDO0FBQ3ZDLElBQU0sZ0NBQWdDLEdBQUcsRUFBRSxDQUFDO0FBQzVDLElBQU0sOEJBQThCLEdBQUcsRUFBRSxDQUFDO0FBQzFDLElBQU0sMENBQTBDLEdBQUcsS0FBSyxDQUFDO0FBQ3pELElBQU0sc0JBQXNCLEdBQUcscUJBQXFCLENBQUM7QUFHckQ7SUFBc0MsNEJBQWE7SUFBbkQ7UUFBQSxxRUE0NkRDO1FBejZERyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFlLElBQUksQ0FBQyxDQUFJLElBQUk7UUFHdEMsa0JBQVksR0FBZSxJQUFJLENBQUMsQ0FBSSxJQUFJO1FBRXhDLG1CQUFtQjtRQUNuQixjQUFRLEdBQVEsQ0FBQyxDQUFDLENBQU0sTUFBTTtR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USIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHsgTXVzaWNNYW5hZ2VyIH0gZnJvbSBcIi4vYmFzZS9NdXNpY01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTmV0d29ya01hbmFnZXIgfSBmcm9tIFwiLi9uZXR3b3JrL05ldHdvcmtNYW5hZ2VyXCI7XHJcblxyXG5pbXBvcnQge0FuYWx5dGljc30gZnJvbSBcIi4vYWQvQW5hbHl0aWNzXCI7XHJcbmltcG9ydCB7SW5zZXJ0QWR9IGZyb20gXCIuL2FkL0luc2VydEFkXCI7XHJcbmltcG9ydCB7UmV3YXJkQWR9IGZyb20gXCIuL2FkL1Jld2FyZEFkXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuY29uc3QgTVVMVElQTEFZRVJfREVGQVVMVF9UQU5LX1RZUEUgPSAxO1xyXG5jb25zdCBNVUxUSVBMQVlFUl9GSVhFRF9QTEFZRVJfTEVWRUwgPSAxO1xyXG5jb25zdCBNVUxUSVBMQVlFUl9GSVhFRF9CQVNFX0hQID0gMTAwO1xyXG5jb25zdCBNVUxUSVBMQVlFUl9GSVhFRF9CQVNFX0FUSyA9IDEwO1xyXG5jb25zdCBNVUxUSVBMQVlFUl9GSVhFRF9CQVNFX1NQRUVEID0gNTtcclxuY29uc3QgTVVMVElQTEFZRVJfRklYRURfQVRUQUNLX1JBRElVUyA9IDQwMDtcclxuY29uc3QgTVVMVElQTEFZRVJfTUlOSU1BUF9XSURUSCA9IDIxNjtcclxuY29uc3QgTVVMVElQTEFZRVJfTUlOSU1BUF9IRUlHSFQgPSAxNDQ7XHJcbmNvbnN0IE1VTFRJUExBWUVSX01JTklNQVBfTUFSR0lOX1JJR0hUID0gMTg7XHJcbmNvbnN0IE1VTFRJUExBWUVSX01JTklNQVBfTUFSR0lOX1RPUCA9IDk2O1xyXG5jb25zdCBNVUxUSVBMQVlFUl9NSU5JTUFQX01BUktFUl9VUERBVEVfSU5URVJWQUwgPSAwLjAxNjtcclxuY29uc3QgTVVMVElQTEFZRVJfU0VSVkVSX1VSTCA9IFwid3M6Ly8xMjcuMC4wLjE6MjU2N1wiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1haW4gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKSBcclxuICAgIGZpbmlzaFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgc2V0dGluZ1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgd2lzaFByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHJldml2ZVByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgLy8gX2NzYiA6IGFueSA9IHt9O1xyXG4gICAgX2xldmVsSWQgICAgPSAgIDE7ICAgICAgLy/lvZPliY3lhbPljaFcclxuXHJcbiAgICBfc3RhcnRDb3VudCA9IDA7XHJcbiAgICBfdGVzdFBhbmVsID0gbnVsbDtcclxuICAgIF91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgX3VwZ3JhZGVDaG9pY2VNb2RlID0gXCJ1cGdyYWRlXCI7XHJcbiAgICBfbmV0TWFuYWdlciA9IG51bGw7ICAgICAgICAgLy/nvZHnu5znrqHnkIblmago5aSa5Lq6KVxyXG4gICAgX211bHRpcGxheWVyU3RhdHVzID0gbnVsbDsgIC8v6L+e5o6l54q25oCB5qCH562+XHJcbiAgICBfbXVsdGlwbGF5ZXJIdWQgPSBudWxsOyAgICAgLy/lpJrkurrmnIDnroBIVURcclxuICAgIF9tdWx0aXBsYXllckFubm91bmNlbWVudCA9IG51bGw7IC8v5aSa5Lq65pKt5oqlXHJcbiAgICBfbXVsdGlwbGF5ZXJIdWRTdGF0ZSA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTsgLy/lpJrkurrmuLjmiI/ov5vooYzkuK1cclxuICAgIF9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgX211bHRpcGxheWVySW5wdXRMb29wVGFnID0gNzYwMTtcclxuICAgIF9tdWx0aXBsYXllcklucHV0cyA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJIaXRRdWV1ZSA9IFtdO1xyXG4gICAgX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZSA9IFtdO1xyXG4gICAgX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPSAwO1xyXG4gICAgX211bHRpcGxheWVyQ292ZXJUb2dnbGVSZXBlYXQgPSAwO1xyXG4gICAgX211bHRpcGxheWVyRmlyZVNlcSA9IDE7XHJcbiAgICBfbXVsdGlwbGF5ZXJDb3ZlckFjdGlvblNlcSA9IDE7XHJcbiAgICBfbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlciA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyQ2FtZXJhRm9sbG93Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyTWluaW1hcCA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJNaW5pbWFwVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyTWluaW1hcFNhZmVab25lUmVuZGVyS2V5ID0gXCJcIjtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpIHtcclxuICAgICAgICAvL+makOiXj+W8gOWni+aMiemSrlxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieXlwLnNhZmVUb3BCb3R0b21cIix5eXAuc2FmZVRvcEJvdHRvbSlcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnkgPSB5eXAuc2FmZVRvcEJvdHRvbS0zMDtcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnpJbmRleCA9IDEwMDE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2J0blRlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuVGVzdC55ID0geXlwLnNhZmVUb3BCb3R0b20tMzA7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0blRlc3QuekluZGV4ID0gMTAwMTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdFRlc3RCdXR0b25WaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgVXRpbHMuZG9RQWN0aW9uKHRoaXMuX2ZpcmUuX2J0bldpc2gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3ByZURlZmVuc2Uuc2NyaXB0LnNldEluU3RhcnQoMyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcHJlQnVsbGV0LnNjcmlwdC5zZXRJblN0YXJ0KDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIC8vIHl5cC5ldmVudENlbnRlci5vbignY29uZmlnLWxvYWRlZCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgIC8v6YWN572u5Yqg6L295a6M5q+VXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjdXJyZW50LWxldmVsaWQnLHRoaXMuX3VwZGF0ZUxldmVsaWQsdGhpcyk7ICAgICAgICAgLy/lvZPliY3lhbPljaFcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2N1cnJlbnQtZW5lbXljb3VudCcsdGhpcy5fdXBkYXRlRW5lbXlDb3VudCx0aGlzKTsgICAvL+aVjOS6uuaVsOmHj1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigncGxheWVyLWRlYXRoJyx0aGlzLl9wbGF5ZXJEZWF0aCx0aGlzKTsgICAgICAgICAgICAgIC8vcGxheWVy5q275LqhXHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9uKCdhZGQtY29pbicsdGhpcy5fYWRkQ29pbix0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3Jlc3RhcnQnLHRoaXMuX3ByZXBhcmUsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndXBkYXRlJyx0aGlzLl91cGRhdGVNc2csdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpS/pgIDlh7rljYfnuqfnlYzpnaJcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJwbGF5ZXItcmV2aXZlXCIsdGhpcy5fcGxheWVyUmV2aXZlLHRoaXMpOyAgICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImdhbWUtcGF1c2VcIix0aGlzLl9nYW1lUGF1c2UsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mmoLlgZxcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJnYW1lLXJlc3VtZVwiLHRoaXMuX2dhbWVSZXN1bWUsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci1oaXRcIix0aGlzLl9vbk11bHRpcGxheWVySGl0UmVwb3J0LHRoaXMpOyAvL+WkmuS6uuWRveS4reS4iuaKpVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLWJ1bGxldC1ldmVudFwiLCB0aGlzLl9vbk11bHRpcGxheWVyQnVsbGV0RXZlbnQsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLXBsYXllci1kZWF0aFwiLCB0aGlzLl9vbk11bHRpcGxheWVyUGxheWVyRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLWVuZXJneS1waWNrdXBcIiwgdGhpcy5fb25NdWx0aXBsYXllckVuZXJneVBpY2t1cCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwibXVsdGlwbGF5ZXItdGFyLXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyVGFyUGlja3VwLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci1ibGFjay1ob2xlLXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyQmxhY2tIb2xlUGlja3VwLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci10aHJvdy10YXJcIiwgdGhpcy5fb25NdWx0aXBsYXllclRocm93VGFyLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci10aHJvdy1ibGFjay1ob2xlXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJUaHJvd0JsYWNrSG9sZSwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwibXVsdGlwbGF5ZXItY292ZXItYWN0aW9uXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJDb3ZlckFjdGlvbiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9mZignY29uZmlnLWxvYWRlZCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgIC8v6YWN572u5Yqg6L295a6M5q+VXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY3VycmVudC1sZXZlbGlkJyx0aGlzLl91cGRhdGVMZXZlbGlkLHRoaXMpOyAgICAgICAgIC8v5b2T5YmN5YWz5Y2hXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY3VycmVudC1lbmVteWNvdW50Jyx0aGlzLl91cGRhdGVFbmVteUNvdW50LHRoaXMpOyAgIC8v5pWM5Lq65pWw6YePXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigncGxheWVyLWRlYXRoJyx0aGlzLl9wbGF5ZXJEZWF0aCx0aGlzKTsgICAgICAgICAgICAgIC8vcGxheWVy5q275LqhXHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9mZignYWRkLWNvaW4nLHRoaXMuX2FkZENvaW4sdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5aKe5YqgXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigncmVzdGFydCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndXBkYXRlJyx0aGlzLl91cGRhdGVNc2csdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpS/pgIDlh7rljYfnuqfnlYzpnaJcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwicGxheWVyLXJldml2ZVwiLHRoaXMuX3BsYXllclJldml2ZSx0aGlzKTsgICAgICAgICAgICAgLy/lpI3mtLtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiZ2FtZS1wYXVzZVwiLHRoaXMuX2dhbWVQYXVzZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aaguWBnFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJnYW1lLXJlc3VtZVwiLHRoaXMuX2dhbWVSZXN1bWUsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItaGl0XCIsdGhpcy5fb25NdWx0aXBsYXllckhpdFJlcG9ydCx0aGlzKTsgLy/lpJrkurrlkb3kuK3kuIrmiqVcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItYnVsbGV0LWV2ZW50XCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJCdWxsZXRFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcIm11bHRpcGxheWVyLXBsYXllci1kZWF0aFwiLCB0aGlzLl9vbk11bHRpcGxheWVyUGxheWVyRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1lbmVyZ3ktcGlja3VwXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJFbmVyZ3lQaWNrdXAsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci10YXItcGlja3VwXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJUYXJQaWNrdXAsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1ibGFjay1ob2xlLXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyQmxhY2tIb2xlUGlja3VwLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItdGhyb3ctdGFyXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJUaHJvd1RhciwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcIm11bHRpcGxheWVyLXRocm93LWJsYWNrLWhvbGVcIiwgdGhpcy5fb25NdWx0aXBsYXllclRocm93QmxhY2tIb2xlLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItY292ZXItYWN0aW9uXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJDb3ZlckFjdGlvbiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblN0YXJ0Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lUZXN0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95VXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDlvZPliY3lhbPljaFcclxuICAgIF91cGRhdGVMZXZlbGlkKGV2ZW50KXtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gZXZlbnQubGV2ZWxpZDtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYkxldmVsLiRMYWJlbC5zdHJpbmcgPSBcIkxldmVsOlwiICsgZXZlbnQubGV2ZWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmlYzkurrmlbDph49cclxuICAgIF91cGRhdGVFbmVteUNvdW50KGV2ZW50KXtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYkVuZW15LiRMYWJlbC5zdHJpbmcgPSBldmVudC5lbmVteWNvdW50O1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuaXNUZXN0TW9kZSAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuaXNUZXN0TW9kZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LmVuZW15Y291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBMb2NhbGl6ZWREYXRhLnNldEludEl0ZW0oXCJfbGV2ZWwxX1wiLCB0aGlzLl9sZXZlbElkICsgMSk7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIndpbiEhISEhISEhISEhXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLnNjcmlwdC5yZWZyZXNoTGV2ZWxJbmZvKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc2V0RmluaXNoKCk7XHJcblxyXG4gICAgICAgICAgICAvL+aYvuekuuiDnOWIqeeVjOmdolxyXG4gICAgICAgICAgICBsZXQgZmluaXNoID0gY2MuaW5zdGFudGlhdGUodGhpcy5maW5pc2hQcmVmYWIpO1xyXG4gICAgICAgICAgICBmaW5pc2guekluZGV4ID0gMTAwMDtcclxuICAgICAgICAgICAgVXRpbHMuYWRkdG9DdXJyZW50U2NlbmUoZmluaXNoKTtcclxuICAgICAgICAgICAgZmluaXNoLnNjcmlwdC5zZXRSZXN1bHQodGhpcy5fbGV2ZWxJZCx0cnVlLGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g546p5a625q275LqhXHJcbiAgICBfcGxheWVyRGVhdGgoZXZlbnQpe1xyXG4gICAgICAgIC8vIGNjLmxvZyhcImZhaWxlZCEhISEhISEhISEhXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBpZiAoUmV3YXJkQWQuZ2V0SW5zdGFuY2UoKS5pc0xvYWQoKSkge1xyXG4gICAgICAgICAgICAvL+aYvuekuuWkjea0u+eVjOmdolxyXG4gICAgICAgICAgICBsZXQgcmV2aXZlID0gY2MuaW5zdGFudGlhdGUodGhpcy5yZXZpdmVQcmVmYWIpO1xyXG4gICAgICAgICAgICByZXZpdmUuekluZGV4ID0gMTAwMDtcclxuICAgICAgICAgICAgVXRpbHMuYWRkdG9DdXJyZW50U2NlbmUocmV2aXZlKTtcclxuICAgICAgICAgICAgcmV2aXZlLnNjcmlwdC5pbml0KHRoaXMuX2xldmVsSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXJSZXZpdmUoe3R5cGU6ZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgX3BsYXllclJldml2ZShldmVudCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucmV2aXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5zY3JpcHQucmVmcmVzaExldmVsSW5mbygpO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc2V0RmluaXNoKCk7XHJcblxyXG4gICAgICAgICAgICAvL+aYvuekuuWksei0peeVjOmdolxyXG4gICAgICAgICAgICBsZXQgZmluaXNoID0gY2MuaW5zdGFudGlhdGUodGhpcy5maW5pc2hQcmVmYWIpO1xyXG4gICAgICAgICAgICBmaW5pc2guekluZGV4ID0gMTAwMDtcclxuICAgICAgICAgICAgVXRpbHMuYWRkdG9DdXJyZW50U2NlbmUoZmluaXNoKTtcclxuICAgICAgICAgICAgZmluaXNoLnNjcmlwdC5zZXRSZXN1bHQodGhpcy5fbGV2ZWxJZCxmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfZ2FtZVBhdXNlKCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9nYW1lUmVzdW1lKCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnJlc3VtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmHkeW4geWinuWKoFxyXG4gICAgLy8gX2FkZENvaW4oZXZlbnQpe1xyXG4gICAgLy8gICAgIHRoaXMuX2ZpcmUuX2x5Q29pbi5zY3JpcHQucmVmcmVzaChldmVudC5jb3VudCxldmVudC5wb3NpdGlvbik7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8v5YeG5aSH5byA5aeLXHJcbiAgICBfcHJlcGFyZShldmVudCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkRpc2Nvbm5lY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVyQW5ub3VuY2VtZW50KCk7XHJcbiAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVySHVkKCk7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIse21vZGU6XCJjaGFyZ2VcIn0pO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOa4heepuuWcuuaZr1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jbGVhbk1hcCgpOyAgXHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0Q291bnQrKztcclxuICAgICAgICBpZiAodGhpcy5fc3RhcnRDb3VudCA+PTMpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoSW5zZXJ0QWQuZ2V0SW5zdGFuY2UoKS5pc0xvYWQoKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fc3RhcnRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBJbnNlcnRBZC5nZXRJbnN0YW5jZSgpLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF91cGRhdGVNc2coZXZlbnQpe1xyXG4gICAgICAgIGlmIChldmVudC50eXBlID09ICdpbicpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LnR5cGUgPT0gJ291dCcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5oyJ6ZKuXHJcbiAgICBfb25TdGFydENsaWNrKCl7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIse21vZGU6XCJjaGFyZ2VcIn0pO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG5cclxuICAgICAgICAvL+makOiXj+W8gOWni+aMiemSrlxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2FkRGVmZW5zZS5zY3JpcHQuc2V0QUQoMyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYWRCdWxsZXQuc2NyaXB0LnNldEFEKDIpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2FkTGlmZS5zY3JpcHQuc2V0QUQoMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5byA5aeL5ri45oiPXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fcHJlRGVmZW5zZS5zY3JpcHQuZW1pdFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl9wcmVCdWxsZXQuc2NyaXB0LmVtaXRTa2lsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmjInpkq5cclxuICAgIG9uU2V0dGluZ0NsaWNrKCl7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7XHJcbiAgICAgICAgVXRpbHMuc2hvd0RpYWxvZ3ModGhpcy5zZXR0aW5nUHJlZmFiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ngrnlh7vmmL7npLrovaznm5jmjInpkq5cclxuICAgIG9uV2lzaEJ0bkNsaWNrKCl7XHJcbiAgICAgICAgQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnQoJ2VudGVyX3dpc2gnKTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTsgICAgLy/mjInpkq7pn7PmlYhcclxuICAgICAgICBVdGlscy5zaG93RGlhbG9ncyh0aGlzLndpc2hQcmVmYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7XHJcbiAgICAgICAgdGhpcy5fc2hvd1Rlc3RQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0VGVzdEJ1dHRvblZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2J0blRlc3QuZ2V0Q2hpbGRCeU5hbWUoXCJfbGJUZXN0QnRuXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9sYlRlc3RCdG5cIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX2J0blRlc3Q7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKHRoaXMuX2ZpcmUuX2J0blRlc3Qud2lkdGgsIHRoaXMuX2ZpcmUuX2J0blRlc3QuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIua1i1wiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjg7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDMyO1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93VGVzdFBhbmVsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXN0UGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl90ZXN0UGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlc3RQYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFuZWwgPSBuZXcgY2MuTm9kZShcIl90ZXN0UGFuZWxcIik7XHJcbiAgICAgICAgcGFuZWwucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHBhbmVsLnNldENvbnRlbnRTaXplKDEyODAsIDcyMCk7XHJcbiAgICAgICAgcGFuZWwuekluZGV4ID0gMjAwMDtcclxuICAgICAgICB0aGlzLl90ZXN0UGFuZWwgPSBwYW5lbDtcclxuXHJcbiAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZShcIl90ZXN0TWFza1wiKTtcclxuICAgICAgICBtYXNrLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIG1hc2suc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBsZXQgbWFza0dyYXBoaWNzID0gbWFzay5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAwLCAwLCAxNTApO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5yZWN0KC02NDAsIC0zNjAsIDEyODAsIDcyMCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBtYXNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5faGlkZVRlc3RQYW5lbCwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCBkaWFsb2cgPSBuZXcgY2MuTm9kZShcIl90ZXN0RGlhbG9nXCIpO1xyXG4gICAgICAgIGRpYWxvZy5wYXJlbnQgPSBwYW5lbDtcclxuICAgICAgICBkaWFsb2cuc2V0Q29udGVudFNpemUoMTA2MCwgODIwKTtcclxuICAgICAgICBkaWFsb2cuekluZGV4ID0gMTtcclxuICAgICAgICBsZXQgZGlhbG9nR3JhcGhpY3MgPSBkaWFsb2cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigzNSwgMzYsIDQ1LCAyNDUpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnJvdW5kUmVjdCgtNTMwLCAtNDEwLCAxMDYwLCA4MjAsIDE4KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDE4MCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC01MzAsIC00MTAsIDEwNjAsIDgyMCwgMTgpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGRpYWxvZy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdExhYmVsKGRpYWxvZywgXCJfbGJUZXN0VGl0bGVcIiwgXCLmtYvor5XpnaLmnb9cIiwgY2MudjIoMCwgMjc2KSwgMzQsIGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RMYWJlbChkaWFsb2csIFwiX2xiVGVzdFRpcHNcIiwgXCLkvJrlhYjph43nva7lvZPliY3muLjmiI/nirbmgIHvvIzlho3ov5vlhaXmtYvor5XlnLrmma9cIiwgY2MudjIoMCwgMjM0KSwgMjIsIGNjLmNvbG9yKDIxMCwgMjEwLCAyMjAsIDI1NSkpO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSAyMjA7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkhlaWdodCA9IDU0O1xyXG4gICAgICAgIGxldCBidXR0b25Gb250U2l6ZSA9IDIyO1xyXG4gICAgICAgIGxldCBjb2x1bW5zID0gWy0zNjAsIC0xMjAsIDEyMCwgMzYwXTtcclxuICAgICAgICBsZXQgcm93cyA9IFsxNDQsIDcyLCAwLCAtNzIsIC0xNDQsIC0yMTZdO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuS2lsbEVmZmVjdFRlc3RcIiwgXCLlh7vmnYDmlYjmnpzmtYvor5VcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1swXSksIGNjLmNvbG9yKDI1NSwgOTAsIDcwLCAyNTUpLCB0aGlzLl9vbktpbGxUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuSGl0VGVzdFwiLCBcIuWPl+WHu+aViOaenOa1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzBdKSwgY2MuY29sb3IoODAsIDE4MCwgMjU1LCAyNTUpLCB0aGlzLl9vbkhpdFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5VcGdyYWRlVGVzdFwiLCBcIuWNh+e6p+a1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzJdLCByb3dzWzBdKSwgY2MuY29sb3IoMTE1LCAyNTUsIDE3MCwgMjU1KSwgdGhpcy5fb25VcGdyYWRlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bk11dGF0aW9uVGVzdFwiLCBcIuWtkOW8uei0qOWPmOa1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzBdKSwgY2MuY29sb3IoMjU1LCAxMjAsIDIxMCwgMjU1KSwgdGhpcy5fb25CdWxsZXRNdXRhdGlvblRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuU2hvb3RFZmZlY3RUZXN0XCIsIFwi5a2Q5by55bCE5Ye75rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbMV0pLCBjYy5jb2xvcigyNTUsIDIwNSwgOTAsIDI1NSksIHRoaXMuX29uU2hvb3RFZmZlY3RUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuUGxheWVyTG93SHBUZXN0XCIsIFwi6Ieq5bex6KGA6YeP5ZGK5oClXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbMV0pLCBjYy5jb2xvcigyNTUsIDExMCwgMTEwLCAyNTUpLCB0aGlzLl9vblBsYXllckxvd0hwVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkVuZW15TG93SHBUZXN0XCIsIFwi5pWM5Lq66KGA6YeP5ZGK5oClXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbMV0pLCBjYy5jb2xvcigyNTUsIDE2NSwgNzAsIDI1NSksIHRoaXMuX29uRW5lbXlMb3dIcFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5LaWxsQnJvYWRjYXN0VGVzdFwiLCBcIuWHu+adgOW5v+aSrVwiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzFdKSwgY2MuY29sb3IoMTc1LCAxMjAsIDI1NSwgMjU1KSwgdGhpcy5fb25LaWxsQnJvYWRjYXN0VGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5TYWNyaWZpY2VUZXN0XCIsIFwi54yu56Wt5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbMl0pLCBjYy5jb2xvcigyNTUsIDkyLCA5MiwgMjU1KSwgdGhpcy5fb25TYWNyaWZpY2VUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuUG9ydGFsVGVzdFwiLCBcIuS8oOmAgemXqOa1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzJdKSwgY2MuY29sb3IoMTEwLCAyNTUsIDI0NSwgMjU1KSwgdGhpcy5fb25Qb3J0YWxUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQ2VudHJpZnVnYWxSaW5nVGVzdFwiLCBcIuemu+W/g+WKm+WciOa1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzJdLCByb3dzWzJdKSwgY2MuY29sb3IoMjU1LCAxNjAsIDkwLCAyNTUpLCB0aGlzLl9vbkNlbnRyaWZ1Z2FsUmluZ1Rlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5PaWxTcGlsbFRlc3RcIiwgXCLnhKbmsrnlvLnmtYvor5VcIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1syXSksIGNjLmNvbG9yKDE2NSwgMTE4LCA3MiwgMjU1KSwgdGhpcy5fb25PaWxTcGlsbFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuRW5lcmd5RWdnVGVzdFwiLCBcIuiDvemHj+ibi+aUtuiXj1wiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzNdKSwgY2MuY29sb3IoMTI2LCAyMzIsIDE0MywgMjU1KSwgdGhpcy5fb25FbmVyZ3lFZ2dUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQ292ZXJUZXN0XCIsIFwi5o6p5L2T5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbM10pLCBjYy5jb2xvcigxOTksIDE1MSwgOTYsIDI1NSksIHRoaXMuX29uQ292ZXJUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQ2xvc2VUZXN0XCIsIFwi5YWz6ZetXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbM10pLCBjYy5jb2xvcigxODAsIDE4MCwgMTkwLCAyNTUpLCB0aGlzLl9oaWRlVGVzdFBhbmVsLCAxODAsIDQ4LCAyNCk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkRhbWFnZURvdWJsZVRlc3RcIiwgXCLkvKTlrrPnv7vlgI3ljLrln59cIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1szXSksIGNjLmNvbG9yKDI1NSwgNTAsIDUwLCAyNTUpLCB0aGlzLl9vbkRhbWFnZURvdWJsZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5TcGVlZERvdWJsZVRlc3RcIiwgXCLpgJ/luqbnv7vlgI3ljLrln59cIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1s0XSksIGNjLmNvbG9yKDUwLCAxNTAsIDI1NSwgMjU1KSwgdGhpcy5fb25TcGVlZERvdWJsZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5TcHJlYWRCdWxsZXRUZXN0XCIsIFwi5a2Q5by55omp5pWj5Yy65Z+fXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbNF0pLCBjYy5jb2xvcig1MCwgMjMwLCAxMDAsIDI1NSksIHRoaXMuX29uU3ByZWFkQnVsbGV0VGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkJvdW5jZU9ic3RhY2xlVGVzdFwiLCBcIuWtkOW8ueWPjeW8uemanOeijVwiLCBjYy52Mihjb2x1bW5zWzJdLCByb3dzWzRdKSwgY2MuY29sb3IoMjU1LCAxMDAsIDIwMCwgMjU1KSwgdGhpcy5fb25Cb3VuY2VPYnN0YWNsZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5CbGFja0hvbGVUZXN0XCIsIFwi6buR5rSe5Yy65Z+fXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbNF0pLCBjYy5jb2xvcigxMjAsIDQwLCAxODAsIDI1NSksIHRoaXMuX29uQmxhY2tIb2xlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkNsdXN0ZXJCb21iVGVzdFwiLCBcIumbhuadn+eCuOW8uVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzVdKSwgY2MuY29sb3IoMjIwLCAxNjAsIDQwLCAyNTUpLCB0aGlzLl9vbkNsdXN0ZXJCb21iVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bk11bHRpcGxheWVyVGVzdFwiLCBcIuiBlOacuuWvueaImFwiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzVdKSwgY2MuY29sb3IoNjAsIDIyMCwgMjU1LCAyNTUpLCB0aGlzLl9vbk11bHRpcGxheWVyVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVRlc3RMYWJlbChwYXJlbnQsIG5hbWUsIHRleHQsIHBvcywgZm9udFNpemUsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDQyMCwgNDIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNvbG9yO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gZm9udFNpemU7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IGZvbnRTaXplICsgNjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICByZXR1cm4gbGFiZWxOb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVUZXN0QnV0dG9uKHBhcmVudCwgbmFtZSwgdGV4dCwgcG9zLCBzdHJva2VDb2xvciwgaGFuZGxlciwgd2lkdGggPSAyNjAsIGhlaWdodCA9IDU4LCBmb250U2l6ZSA9IDI4KSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgIGJ0bi5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgYnRuLnNldENvbnRlbnRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGJ0bi5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGJ0bi56SW5kZXggPSAxMDA7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGJ0bi5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDQ4LCA0OCwgNTUsIDIzMCk7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0LCAxMik7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKG5hbWUgKyBcIkxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBidG47XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gZm9udFNpemUgKyA0O1xyXG4gICAgICAgIC8vIGxhYmVsLm92ZXJmbG93ID0gY2MuTGFiZWwuT3ZlcmZsb3cuU0hSSU5LO1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBidG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBoYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gYnRuO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbktpbGxUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwia2lsbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25IaXRUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiaGl0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblVwZ3JhZGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwidXBncmFkZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25CdWxsZXRNdXRhdGlvblRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJtdXRhdGlvblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25TaG9vdEVmZmVjdFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJzaG9vdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25QbGF5ZXJMb3dIcFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJwbGF5ZXJMb3dIcFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25FbmVteUxvd0hwVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImVuZW15TG93SHBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uS2lsbEJyb2FkY2FzdFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJraWxsQnJvYWRjYXN0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblBvcnRhbFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJwb3J0YWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQ2VudHJpZnVnYWxSaW5nVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImNlbnRyaWZ1Z2FsUmluZ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25TYWNyaWZpY2VUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwic2FjcmlmaWNlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk9pbFNwaWxsVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcIm9pbFNwaWxsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkNvdmVyVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImNvdmVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkVuZXJneUVnZ1Rlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJlbmVyZ3lFZ2dcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uRGFtYWdlRG91YmxlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImRhbWFnZURvdWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25TcGVlZERvdWJsZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJzcGVlZERvdWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25TcHJlYWRCdWxsZXRUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwic3ByZWFkQnVsbGV0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkJvdW5jZU9ic3RhY2xlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImJvdW5jZU9ic3RhY2xlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkJsYWNrSG9sZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJibGFja0hvbGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQ2x1c3RlckJvbWJUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiY2x1c3RlckJvbWJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9oaWRlVGVzdFBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRNdWx0aXBsYXllckdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRUZXN0R2FtZSh0eXBlKSB7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7XHJcbiAgICAgICAgdGhpcy5faGlkZVRlc3RQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0R2FtZUJlZm9yZVRlc3QoKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOnR5cGUgPT0gXCJzYWNyaWZpY2VcIn0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIse21vZGU6XCJjaGFyZ2VcIn0pO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbXBsZXRlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5fZmlyZS5fdWkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PSBcImtpbGxcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRLaWxsRWZmZWN0VGVzdEdhbWUoY29tcGxldGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwidXBncmFkZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3Nob3dVcGdyYWRlQ2hvaWNlUGFuZWwoXCJ1cGdyYWRlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcIm11dGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fc2hvd1VwZ3JhZGVDaG9pY2VQYW5lbChcIm11dGF0aW9uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInNob290XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0U2hvb3RFZmZlY3RUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJwbGF5ZXJMb3dIcFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIgPSBzZWxmLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyICYmIHBsYXllci5zY3JpcHQgJiYgcGxheWVyLnNjcmlwdC5kZWJ1Z1NldExvd0hwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5kZWJ1Z1NldExvd0hwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiZW5lbXlMb3dIcFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LmNyZWF0ZUxvd0hwVGVzdEVuZW15KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LmNyZWF0ZUxvd0hwVGVzdEVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic2FjcmlmaWNlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImtpbGxCcm9hZGNhc3RcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRLaWxsQnJvYWRjYXN0VGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwicG9ydGFsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0UG9ydGFsVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiY2VudHJpZnVnYWxSaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0Q2VudHJpZnVnYWxSaW5nVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwib2lsU3BpbGxcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zcGF3bk9pbFRlc3RQaWNrdXApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuc3Bhd25PaWxUZXN0UGlja3VwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiY292ZXJcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRDb3ZlclRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImVuZXJneUVnZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEVuZXJneUVnZ1Rlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImRhbWFnZURvdWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydERhbWFnZURvdWJsZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInNwZWVkRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0U3BlZWREb3VibGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJzcHJlYWRCdWxsZXRcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRTcHJlYWRCdWxsZXRUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJib3VuY2VPYnN0YWNsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEJvdW5jZU9ic3RhY2xlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiYmxhY2tIb2xlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0QmxhY2tIb2xlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiY2x1c3RlckJvbWJcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRDbHVzdGVyQm9tYlRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0UGxheWVySGl0VGVzdEdhbWUoY29tcGxldGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVzZXRHYW1lQmVmb3JlVGVzdCgpIHtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3RpbGVkICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuY2xlYW5NYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6Y2MudjIoMCwgMSksIHJhdGlvOjB9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tY2xlYXJcIix7fSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLHttb2RlOlwiY2hhcmdlXCJ9KTtcclxuICAgIH1cclxuXHJcbiAgICBfaGlkZVRlc3RQYW5lbChldmVudCA9IG51bGwpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdGVzdFBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdGVzdFBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXN0UGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95VGVzdFBhbmVsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXN0UGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl90ZXN0UGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlc3RQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Rlc3RQYW5lbCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEN1cnJlbnRQbGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IHRpbGVkID0gdGhpcy5fZmlyZS5fdGlsZWQ7XHJcbiAgICAgICAgaWYgKCF0aWxlZCB8fCAhdGlsZWQuc2NyaXB0IHx8ICF0aWxlZC5zY3JpcHQuX3BsYXllciB8fCAhY2MuaXNWYWxpZCh0aWxlZC5zY3JpcHQuX3BsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aWxlZC5zY3JpcHQuX3BsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBfc2hvd1VwZ3JhZGVDaG9pY2VQYW5lbChtb2RlID0gXCJ1cGdyYWRlXCIpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgIGlmICghcGxheWVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lVcGdyYWRlQ2hvaWNlUGFuZWwoKTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlTW9kZSA9IG1vZGU7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJnYW1lLXBhdXNlXCIse30pO1xyXG5cclxuICAgICAgICBsZXQgcGFuZWwgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQ2hvaWNlUGFuZWxcIik7XHJcbiAgICAgICAgcGFuZWwucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHBhbmVsLnNldENvbnRlbnRTaXplKDEyODAsIDcyMCk7XHJcbiAgICAgICAgcGFuZWwuekluZGV4ID0gMjEwMDtcclxuICAgICAgICBwYW5lbC5hZGRDb21wb25lbnQoY2MuQmxvY2tJbnB1dEV2ZW50cyk7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsID0gcGFuZWw7XHJcblxyXG4gICAgICAgIGxldCBtYXNrID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUNob2ljZU1hc2tcIik7XHJcbiAgICAgICAgbWFzay5wYXJlbnQgPSBwYW5lbDtcclxuICAgICAgICBtYXNrLnNldENvbnRlbnRTaXplKDEyODAsIDcyMCk7XHJcbiAgICAgICAgbGV0IG1hc2tHcmFwaGljcyA9IG1hc2suYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMTY4KTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MucmVjdCgtNjQwLCAtMzYwLCAxMjgwLCA3MjApO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBkaWFsb2cgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQ2hvaWNlRGlhbG9nXCIpO1xyXG4gICAgICAgIGRpYWxvZy5wYXJlbnQgPSBwYW5lbDtcclxuICAgICAgICBkaWFsb2cuc2V0Q29udGVudFNpemUoOTgwLCA0MzApO1xyXG4gICAgICAgIGRpYWxvZy56SW5kZXggPSAxO1xyXG4gICAgICAgIGxldCBkaWFsb2dHcmFwaGljcyA9IGRpYWxvZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDIyLCAyNiwgMzgsIDI0NSk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC00OTAsIC0yMTUsIDk4MCwgNDMwLCAyNCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAxMjApO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnJvdW5kUmVjdCgtNDkwLCAtMjE1LCA5ODAsIDQzMCwgMjQpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgICAgIGRpYWxvZy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlID0gbW9kZSA9PSBcIm11dGF0aW9uXCIgPyBcIumAieaLqeS4gOenjeWtkOW8uei0qOWPmFwiIDogXCLpgInmi6nkuIDpobnljYfnuqdcIjtcclxuICAgICAgICBsZXQgdGlwcyA9IG1vZGUgPT0gXCJtdXRhdGlvblwiID8gXCIz6YCJMe+8jOmAieS4reWQjueri+WIu+abv+aNouW9k+WJjeWtkOW8uVwiIDogXCIz6YCJMe+8jOeri+WNs+eUn+aViFwiO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGRpYWxvZywgXCJfbGJVcGdyYWRlVGl0bGVcIiwgdGl0bGUsIGNjLnYyKDAsIDE2MCksIDM2LCBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChkaWFsb2csIFwiX2xiVXBncmFkZVRpcHNcIiwgdGlwcywgY2MudjIoMCwgMTE4KSwgMjIsIGNjLmNvbG9yKDIwMCwgMjEwLCAyMjUsIDI1NSkpO1xyXG5cclxuICAgICAgICBsZXQgY2hvaWNlcyA9IG1vZGUgPT0gXCJtdXRhdGlvblwiXHJcbiAgICAgICAgICAgID8gcGxheWVyLnNjcmlwdC5nZXRUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2VzKClcclxuICAgICAgICAgICAgOiBwbGF5ZXIuc2NyaXB0LmdldFRlc3RVcGdyYWRlQ2hvaWNlcygpO1xyXG4gICAgICAgIGxldCBzdGFydFggPSAtMjgwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hvaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMuX2NyZWF0ZVVwZ3JhZGVDaG9pY2VDYXJkKGRpYWxvZywgY2hvaWNlc1tpXSwgY2MudjIoc3RhcnRYICsgaSAqIDI4MCwgLTEwKSk7XHJcbiAgICAgICAgICAgIGNhcmQub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGNhcmQuc2NhbGVYID0gMC4wNTtcclxuICAgICAgICAgICAgY2FyZC5zY2FsZVkgPSAwLjkyO1xyXG4gICAgICAgICAgICBjYXJkLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShpICogMC4wNSksXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4wOCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEyLCAxLjEyLCAxLjA2KVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNywgMC45NiwgMS4wMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDYsIDEuMDMsIDAuOTkpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA1LCAxLCAxKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKHBhcmVudCwgbmFtZSwgdGV4dCwgcG9zLCBmb250U2l6ZSwgY29sb3IpIHtcclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNzAwLCBmb250U2l6ZSArIDEwKTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gZm9udFNpemU7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IGZvbnRTaXplICsgNDtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICByZXR1cm4gbGFiZWxOb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVVcGdyYWRlQ2hvaWNlQ2FyZChwYXJlbnQsIGNob2ljZSwgcG9zKSB7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBuZXcgY2MuTm9kZShcIl9jYXJkX1wiICsgY2hvaWNlLmlkKTtcclxuICAgICAgICBjYXJkLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBjYXJkLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgY2FyZC5zZXRDb250ZW50U2l6ZSgyNDAsIDI3MCk7XHJcbiAgICAgICAgY2FyZFtcIl9fdXBncmFkZUNob2ljZVwiXSA9IGNob2ljZTtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gY2FyZC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDM4LCA0MywgNTgsIDI0NSk7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC0xMjAsIC0xMzUsIDI0MCwgMjcwLCAxOCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC0xMjAsIC0xMzUsIDI0MCwgMjcwLCAxOCk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBnbG93ID0gbmV3IGNjLk5vZGUoXCJfY2FyZEdsb3dcIik7XHJcbiAgICAgICAgZ2xvdy5wYXJlbnQgPSBjYXJkO1xyXG4gICAgICAgIGxldCBnbG93R3JhcGhpY3MgPSBnbG93LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKGNob2ljZS5jb2xvci5yLCBjaG9pY2UuY29sb3IuZywgY2hvaWNlLmNvbG9yLmIsIDM0KTtcclxuICAgICAgICBnbG93R3JhcGhpY3Mucm91bmRSZWN0KC0xMTIsIC0xMjcsIDIyNCwgMjU0LCAxNik7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGljb24gPSBuZXcgY2MuTm9kZShcIl9jYXJkSWNvblwiKTtcclxuICAgICAgICBpY29uLnBhcmVudCA9IGNhcmQ7XHJcbiAgICAgICAgaWNvbi5zZXRQb3NpdGlvbigwLCA3NCk7XHJcbiAgICAgICAgbGV0IGljb25HcmFwaGljcyA9IGljb24uYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpY29uR3JhcGhpY3MuZmlsbENvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5jaXJjbGUoMCwgMCwgMzQpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcclxuICAgICAgICBpY29uR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDM0KTtcclxuICAgICAgICBpY29uR3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBpY29uTGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2FyZEljb25MYWJlbFwiKTtcclxuICAgICAgICBpY29uTGFiZWxOb2RlLnBhcmVudCA9IGljb247XHJcbiAgICAgICAgaWNvbkxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg3OCwgNDApO1xyXG4gICAgICAgIGxldCBpY29uTGFiZWwgPSBpY29uTGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgaWNvbkxhYmVsLnN0cmluZyA9IGNob2ljZS5zaG9ydExhYmVsO1xyXG4gICAgICAgIGljb25MYWJlbC5mb250U2l6ZSA9IGNob2ljZS5zaG9ydExhYmVsLmxlbmd0aCA+IDIgPyAxOCA6IDIyO1xyXG4gICAgICAgIGljb25MYWJlbC5saW5lSGVpZ2h0ID0gMjQ7XHJcbiAgICAgICAgaWNvbkxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgaWNvbkxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwoY2FyZCwgXCJfY2FyZFRpdGxlXCIsIGNob2ljZS50aXRsZSwgY2MudjIoMCwgMTYpLCAyOCwgY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwoY2FyZCwgXCJfY2FyZFZhbHVlXCIsIGNob2ljZS52YWx1ZVRleHQsIGNjLnYyKDAsIC0zNCksIDQwLCBjaG9pY2UuY29sb3IpO1xyXG5cclxuICAgICAgICBsZXQgZGVzY05vZGUgPSBuZXcgY2MuTm9kZShcIl9jYXJkRGVzY1wiKTtcclxuICAgICAgICBkZXNjTm9kZS5wYXJlbnQgPSBjYXJkO1xyXG4gICAgICAgIGRlc2NOb2RlLnNldFBvc2l0aW9uKDAsIC05Mik7XHJcbiAgICAgICAgZGVzY05vZGUuc2V0Q29udGVudFNpemUoMTkwLCA1Nik7XHJcbiAgICAgICAgZGVzY05vZGUuY29sb3IgPSBjYy5jb2xvcigyMDAsIDIxMCwgMjI1LCAyMjApO1xyXG4gICAgICAgIGxldCBkZXNjTGFiZWwgPSBkZXNjTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGRlc2NMYWJlbC5zdHJpbmcgPSBjaG9pY2UuZGVzYztcclxuICAgICAgICBkZXNjTGFiZWwuZm9udFNpemUgPSAyMDtcclxuICAgICAgICBkZXNjTGFiZWwubGluZUhlaWdodCA9IDI2O1xyXG4gICAgICAgIGRlc2NMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGRlc2NMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGNhcmQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblVwZ3JhZGVDaG9pY2VTZWxlY3QsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBjYXJkO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblVwZ3JhZGVDaG9pY2VTZWxlY3QoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNhcmQgPSBldmVudCA/IGV2ZW50LmN1cnJlbnRUYXJnZXQgOiBudWxsO1xyXG4gICAgICAgIGxldCBjaG9pY2UgPSBjYXJkID8gY2FyZFtcIl9fdXBncmFkZUNob2ljZVwiXSA6IG51bGw7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX2dldEN1cnJlbnRQbGF5ZXIoKTtcclxuICAgICAgICBpZiAoIWNob2ljZSB8fCAhcGxheWVyIHx8ICFwbGF5ZXIuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5MVXBcIik7XHJcbiAgICAgICAgdGhpcy5faGlkZVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl91cGdyYWRlQ2hvaWNlTW9kZSA9PSBcIm11dGF0aW9uXCIgJiYgcGxheWVyLnNjcmlwdC5hcHBseVRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LmFwcGx5VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlKGNob2ljZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHBsYXllci5zY3JpcHQuYXBwbHlUZXN0VXBncmFkZUNob2ljZShjaG9pY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaGlkZVVwZ3JhZGVDaG9pY2VQYW5lbChyZXN1bWVHYW1lID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHJlc3VtZUdhbWUpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJnYW1lLXJlc3VtZVwiLHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Rlc3Ryb3lVcGdyYWRlQ2hvaWNlUGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsID0gbnVsbDtcclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlTW9kZSA9IFwidXBncmFkZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0g5aSa5Lq65qih5byPIC0tLS0tLS0tLS1cclxuICAgIF9zaG93TXVsdGlwbGF5ZXJTdGF0dXModGV4dCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllclN0YXR1cyAmJiBjYy5pc1ZhbGlkKHRoaXMuX211bHRpcGxheWVyU3RhdHVzKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllclN0YXR1cy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllclN0YXR1cy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZShcIl9tdWx0aXBsYXllclN0YXR1c1wiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIDIwMCkpO1xyXG4gICAgICAgIG5vZGUuc2V0Q29udGVudFNpemUoNjAwLCA2MCk7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSAzMDAwO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMzI7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDQwO1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIG5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMTAwLCAyNTUpO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzID0gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBfaGlkZU11bHRpcGxheWVyU3RhdHVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllclN0YXR1cyAmJiBjYy5pc1ZhbGlkKHRoaXMuX211bHRpcGxheWVyU3RhdHVzKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllclN0YXR1cy5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZW5zdXJlTXVsdGlwbGF5ZXJIdWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySHVkICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJIdWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsYXllckh1ZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgY2MuTm9kZShcIl9tdWx0aXBsYXllckh1ZFwiKTtcclxuICAgICAgICByb290LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICByb290LnpJbmRleCA9IDI5OTA7XHJcbiAgICAgICAgcm9vdC5zZXRQb3NpdGlvbigwLCB5eXAuc2FmZVRvcEJvdHRvbSAtIDc4KTtcclxuICAgICAgICByb290LnNldENvbnRlbnRTaXplKDY0MCwgNzIpO1xyXG5cclxuICAgICAgICBsZXQgYmcgPSByb290LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgYmcuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMTEwKTtcclxuICAgICAgICBiZy5yb3VuZFJlY3QoLTMyMCwgLTMyLCA2NDAsIDY0LCAxMik7XHJcbiAgICAgICAgYmcuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBuZXcgY2MuTm9kZShcIl90aXRsZVwiKTtcclxuICAgICAgICB0aXRsZS5wYXJlbnQgPSByb290O1xyXG4gICAgICAgIHRpdGxlLnNldFBvc2l0aW9uKDAsIDEyKTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDMwO1xyXG4gICAgICAgIHRpdGxlTGFiZWwubGluZUhlaWdodCA9IDM0O1xyXG4gICAgICAgIHRpdGxlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgIGxldCBzdWIgPSBuZXcgY2MuTm9kZShcIl9zdWJcIik7XHJcbiAgICAgICAgc3ViLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgc3ViLnNldFBvc2l0aW9uKDAsIC0xOCk7XHJcbiAgICAgICAgbGV0IHN1YkxhYmVsID0gc3ViLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgc3ViTGFiZWwuZm9udFNpemUgPSAyMjtcclxuICAgICAgICBzdWJMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgc3ViTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBzdWJMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgc3ViTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgcm9vdFtcIl90aXRsZUxhYmVsXCJdID0gdGl0bGVMYWJlbDtcclxuICAgICAgICByb290W1wiX3N1YkxhYmVsXCJdID0gc3ViTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIdWQgPSByb290O1xyXG4gICAgICAgIHJldHVybiByb290O1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlTXVsdGlwbGF5ZXJIdWQoKSB7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIdWRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVyTWluaW1hcCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckh1ZCAmJiBjYy5pc1ZhbGlkKHRoaXMuX211bHRpcGxheWVySHVkKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckh1ZC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySHVkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfYXBwbHlNdWx0aXBsYXllckh1ZFN0YXRlKGh1ZCkge1xyXG4gICAgICAgIGlmICghaHVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpZGVNdWx0aXBsYXllckh1ZCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySHVkU3RhdGUgPSBodWQ7XHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLl9lbnN1cmVNdWx0aXBsYXllckh1ZCgpO1xyXG4gICAgICAgIHJvb3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHJvb3RbXCJfdGl0bGVMYWJlbFwiXTtcclxuICAgICAgICBsZXQgc3ViTGFiZWwgPSByb290W1wiX3N1YkxhYmVsXCJdO1xyXG4gICAgICAgIGxldCBhbGl2ZUNvdW50ID0gaHVkLmFsaXZlQ291bnQgPT0gbnVsbCA/IDAgOiBodWQuYWxpdmVDb3VudDtcclxuICAgICAgICBsZXQgdG90YWxQbGF5ZXJzID0gaHVkLnRvdGFsUGxheWVycyA9PSBudWxsID8gMCA6IGh1ZC50b3RhbFBsYXllcnM7XHJcbiAgICAgICAgbGV0IHBoYXNlVGV4dCA9IGh1ZC5waGFzZVRleHQgfHwgXCLmiJjmlpfkuK1cIjtcclxuICAgICAgICBpZiAodGl0bGVMYWJlbCkge1xyXG4gICAgICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IHBoYXNlVGV4dCArIFwiICB8ICDliankvZkgXCIgKyBhbGl2ZUNvdW50ICsgXCIvXCIgKyB0b3RhbFBsYXllcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdWJMYWJlbCkge1xyXG4gICAgICAgICAgICBzdWJMYWJlbC5zdHJpbmcgPSBodWQuc2Vjb25kYXJ5VGV4dCB8fCBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd011bHRpcGxheWVyQW5ub3VuY2VtZW50KHRleHQsIHN1YlRleHQgPSBcIlwiLCBzdHlsZSA9IFwiaW5mb1wiLCBkdXJhdGlvbiA9IDIuMikge1xyXG4gICAgICAgIGlmICghdGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudCAmJiBjYy5pc1ZhbGlkKHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb290ID0gbmV3IGNjLk5vZGUoXCJfbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnRcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcm9vdC56SW5kZXggPSAzMTAwO1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24oMCwgMTEwKTtcclxuICAgICAgICByb290Lm9wYWNpdHkgPSAwO1xyXG5cclxuICAgICAgICBsZXQgYmcgPSByb290LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbGV0IHN0eWxlQ29sb3IgPSBjYy5jb2xvcig0NiwgMTIyLCAyNTUsIDE3MCk7XHJcbiAgICAgICAgaWYgKHN0eWxlID09PSBcIndhcm5pbmdcIikge1xyXG4gICAgICAgICAgICBzdHlsZUNvbG9yID0gY2MuY29sb3IoMjU1LCAxNTIsIDQ4LCAxODApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzdHlsZSA9PT0gXCJkYW5nZXJcIikge1xyXG4gICAgICAgICAgICBzdHlsZUNvbG9yID0gY2MuY29sb3IoMjU1LCA3NCwgNzQsIDE4NSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0eWxlID09PSBcImV2ZW50XCIpIHtcclxuICAgICAgICAgICAgc3R5bGVDb2xvciA9IGNjLmNvbG9yKDExMCwgODUsIDI1NSwgMTgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3R5bGUgPT09IFwibm90aWNlXCIpIHtcclxuICAgICAgICAgICAgc3R5bGVDb2xvciA9IGNjLmNvbG9yKDUyLCAxOTAsIDEyMCwgMTc1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYmcuZmlsbENvbG9yID0gc3R5bGVDb2xvcjtcclxuICAgICAgICBiZy5yb3VuZFJlY3QoLTI4MCwgLTUwLCA1NjAsIHN1YlRleHQgPyAxMDAgOiA2OCwgMTQpO1xyXG4gICAgICAgIGJnLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlID0gbmV3IGNjLk5vZGUoXCJfdGl0bGVcIik7XHJcbiAgICAgICAgdGl0bGUucGFyZW50ID0gcm9vdDtcclxuICAgICAgICB0aXRsZS5zZXRQb3NpdGlvbigwLCBzdWJUZXh0ID8gMTYgOiAwKTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbCA9IHRpdGxlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIHRpdGxlTGFiZWwuZm9udFNpemUgPSAzNDtcclxuICAgICAgICB0aXRsZUxhYmVsLmxpbmVIZWlnaHQgPSAzODtcclxuICAgICAgICB0aXRsZUxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgdGl0bGVMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGlmIChzdWJUZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBzdWIgPSBuZXcgY2MuTm9kZShcIl9zdWJcIik7XHJcbiAgICAgICAgICAgIHN1Yi5wYXJlbnQgPSByb290O1xyXG4gICAgICAgICAgICBzdWIuc2V0UG9zaXRpb24oMCwgLTIwKTtcclxuICAgICAgICAgICAgbGV0IHN1YkxhYmVsID0gc3ViLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIHN1YkxhYmVsLnN0cmluZyA9IHN1YlRleHQ7XHJcbiAgICAgICAgICAgIHN1YkxhYmVsLmZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgICAgIHN1YkxhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICAgICAgc3ViTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICAgICAgc3ViTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcm9vdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVJbigwLjEyKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKE1hdGgubWF4KDAuOCwgZHVyYXRpb24gfHwgMi4yKSksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4yKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQW5ub3VuY2VtZW50ID09PSByb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQocm9vdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByb290LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudCA9IHJvb3Q7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVNdWx0aXBsYXllckFubm91bmNlbWVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQgJiYgY2MuaXNWYWxpZCh0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFubm91bmNlbWVudCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZU11bHRpcGxheWVyTWluaW1hcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgY2MuTm9kZShcIl9tdWx0aXBsYXllck1pbmltYXBcIik7XHJcbiAgICAgICAgcm9vdC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcm9vdC56SW5kZXggPSAzMDA1O1xyXG4gICAgICAgIHJvb3Quc2V0UG9zaXRpb24odGhpcy5fZ2V0TXVsdGlwbGF5ZXJNaW5pbWFwUm9vdFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJvb3Quc2V0Q29udGVudFNpemUoTVVMVElQTEFZRVJfTUlOSU1BUF9XSURUSCwgTVVMVElQTEFZRVJfTUlOSU1BUF9IRUlHSFQpO1xyXG5cclxuICAgICAgICBsZXQgZnJhbWUgPSByb290LmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZnJhbWUuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMTIwKTtcclxuICAgICAgICBmcmFtZS5yb3VuZFJlY3QoLU1VTFRJUExBWUVSX01JTklNQVBfV0lEVEggLyAyLCAtTVVMVElQTEFZRVJfTUlOSU1BUF9IRUlHSFQgLyAyLCBNVUxUSVBMQVlFUl9NSU5JTUFQX1dJRFRILCBNVUxUSVBMQVlFUl9NSU5JTUFQX0hFSUdIVCwgMTApO1xyXG4gICAgICAgIGZyYW1lLmZpbGwoKTtcclxuICAgICAgICBmcmFtZS5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIGZyYW1lLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgOTApO1xyXG4gICAgICAgIGZyYW1lLnJvdW5kUmVjdCgtTVVMVElQTEFZRVJfTUlOSU1BUF9XSURUSCAvIDIsIC1NVUxUSVBMQVlFUl9NSU5JTUFQX0hFSUdIVCAvIDIsIE1VTFRJUExBWUVSX01JTklNQVBfV0lEVEgsIE1VTFRJUExBWUVSX01JTklNQVBfSEVJR0hULCAxMCk7XHJcbiAgICAgICAgZnJhbWUuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZSA9IG5ldyBjYy5Ob2RlKFwiX3RpdGxlXCIpO1xyXG4gICAgICAgIHRpdGxlLnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgdGl0bGUuc2V0UG9zaXRpb24oMCwgTVVMVElQTEFZRVJfTUlOSU1BUF9IRUlHSFQgLyAyICsgMTYpO1xyXG4gICAgICAgIGxldCB0aXRsZUxhYmVsID0gdGl0bGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aXRsZUxhYmVsLnN0cmluZyA9IFwi5oiY5Zy65oC76KeIXCI7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIHRpdGxlTGFiZWwubGluZUhlaWdodCA9IDIyO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXRsZUxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXRsZS5jb2xvciA9IGNjLmNvbG9yKDIyMCwgMjQwLCAyNTUsIDI1NSk7XHJcblxyXG4gICAgICAgIGxldCB2aWV3cG9ydCA9IG5ldyBjYy5Ob2RlKFwiX3ZpZXdwb3J0XCIpO1xyXG4gICAgICAgIHZpZXdwb3J0LnBhcmVudCA9IHJvb3Q7XHJcbiAgICAgICAgdmlld3BvcnQuc2V0Q29udGVudFNpemUoTVVMVElQTEFZRVJfTUlOSU1BUF9XSURUSCAtIDE0LCBNVUxUSVBMQVlFUl9NSU5JTUFQX0hFSUdIVCAtIDE0KTtcclxuXHJcbiAgICAgICAgbGV0IGJnID0gdmlld3BvcnQuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBiZy5maWxsQ29sb3IgPSBjYy5jb2xvcigyMiwgMzgsIDI4LCAyMjApO1xyXG4gICAgICAgIGJnLnJlY3QoLXZpZXdwb3J0LndpZHRoIC8gMiwgLXZpZXdwb3J0LmhlaWdodCAvIDIsIHZpZXdwb3J0LndpZHRoLCB2aWV3cG9ydC5oZWlnaHQpO1xyXG4gICAgICAgIGJnLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IHNhZmVab25lTGF5ZXIgPSBuZXcgY2MuTm9kZShcIl9zYWZlWm9uZUxheWVyXCIpO1xyXG4gICAgICAgIHNhZmVab25lTGF5ZXIucGFyZW50ID0gdmlld3BvcnQ7XHJcbiAgICAgICAgbGV0IHNhZmVab25lR3JhcGhpY3MgPSBzYWZlWm9uZUxheWVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5ZXJNYXJrZXIgPSBuZXcgY2MuTm9kZShcIl9wbGF5ZXJNYXJrZXJcIik7XHJcbiAgICAgICAgcGxheWVyTWFya2VyLnBhcmVudCA9IHZpZXdwb3J0O1xyXG4gICAgICAgIGxldCBwbGF5ZXJNYXJrZXJHcmFwaGljcyA9IHBsYXllck1hcmtlci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG5cclxuICAgICAgICByb290W1wiX3ZpZXdwb3J0XCJdID0gdmlld3BvcnQ7XHJcbiAgICAgICAgcm9vdFtcIl9zYWZlWm9uZUdyYXBoaWNzXCJdID0gc2FmZVpvbmVHcmFwaGljcztcclxuICAgICAgICByb290W1wiX3BsYXllck1hcmtlclwiXSA9IHBsYXllck1hcmtlcjtcclxuICAgICAgICByb290W1wiX3BsYXllck1hcmtlckdyYXBoaWNzXCJdID0gcGxheWVyTWFya2VyR3JhcGhpY3M7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwID0gcm9vdDtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllck1pbmltYXBTYWZlWm9uZVJlbmRlcktleSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE11bHRpcGxheWVyTWluaW1hcFZpZXdwb3J0KCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaE11bHRpcGxheWVyTWluaW1hcFNhZmVab25lKHRydWUpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hNdWx0aXBsYXllck1pbmltYXBNYXJrZXIoKTtcclxuICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxuXHJcbiAgICBfaGlkZU11bHRpcGxheWVyTWluaW1hcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwVXBkYXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuX211bHRpcGxheWVyTWluaW1hcFVwZGF0ZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllck1pbmltYXAuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllck1pbmltYXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTWluaW1hcFNhZmVab25lUmVuZGVyS2V5ID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0TXVsdGlwbGF5ZXJNaW5pbWFwUm9vdFBvc2l0aW9uKCkge1xyXG4gICAgICAgIGxldCBmcmFtZVNpemUgPSB5eXAuZ2FtZUZyYW1lU2l6ZSB8fCBjYy52aWV3LmdldFZpc2libGVTaXplKCkgfHwgY2Mud2luU2l6ZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBmcmFtZVNpemUgJiYgZnJhbWVTaXplLndpZHRoID4gMCA/IGZyYW1lU2l6ZS53aWR0aCA6IDEyODA7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGZyYW1lU2l6ZSAmJiBmcmFtZVNpemUuaGVpZ2h0ID4gMCA/IGZyYW1lU2l6ZS5oZWlnaHQgOiA3MjA7XHJcbiAgICAgICAgbGV0IHggPSB3aWR0aCAvIDIgLSBNVUxUSVBMQVlFUl9NSU5JTUFQX1dJRFRIIC8gMiAtIE1VTFRJUExBWUVSX01JTklNQVBfTUFSR0lOX1JJR0hUO1xyXG4gICAgICAgIGxldCB5ID0gaGVpZ2h0IC8gMiAtIE1VTFRJUExBWUVSX01JTklNQVBfSEVJR0hUIC8gMiAtIE1VTFRJUExBWUVSX01JTklNQVBfTUFSR0lOX1RPUDtcclxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NjaGVkdWxlTXVsdGlwbGF5ZXJNaW5pbWFwUmVmcmVzaCgpIHtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJNaW5pbWFwKCk7XHJcbiAgICAgICAgdGhpcy5fZW5zdXJlTXVsdGlwbGF5ZXJNaW5pbWFwKCk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTWluaW1hcFVwZGF0ZUNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlbGYuX211bHRpcGxheWVyTWluaW1hcCAmJiBjYy5pc1ZhbGlkKHNlbGYuX211bHRpcGxheWVyTWluaW1hcCkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVyTWluaW1hcC5zZXRQb3NpdGlvbihzZWxmLl9nZXRNdWx0aXBsYXllck1pbmltYXBSb290UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5fcmVmcmVzaE11bHRpcGxheWVyTWluaW1hcFZpZXdwb3J0KCk7XHJcbiAgICAgICAgICAgIHNlbGYuX3JlZnJlc2hNdWx0aXBsYXllck1pbmltYXBNYXJrZXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwVXBkYXRlQ2FsbGJhY2ssIE1VTFRJUExBWUVSX01JTklNQVBfTUFSS0VSX1VQREFURV9JTlRFUlZBTCwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoTXVsdGlwbGF5ZXJNaW5pbWFwVmlld3BvcnQoKSB7XHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLl9tdWx0aXBsYXllck1pbmltYXA7XHJcbiAgICAgICAgaWYgKCFyb290IHx8ICFjYy5pc1ZhbGlkKHJvb3QpIHx8ICF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb290LnBhcmVudCAhPT0gdGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb290LnNldFBvc2l0aW9uKHRoaXMuX2dldE11bHRpcGxheWVyTWluaW1hcFJvb3RQb3NpdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0TXVsdGlwbGF5ZXJNaW5pbWFwTWFwQ29udGV4dCgpIHtcclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMuX211bHRpcGxheWVyTWluaW1hcDtcclxuICAgICAgICBpZiAoIXJvb3QgfHwgIWNjLmlzVmFsaWQocm9vdCkgfHwgIXRoaXMuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmlld3BvcnQgPSByb290W1wiX3ZpZXdwb3J0XCJdO1xyXG4gICAgICAgIGxldCBzYWZlWm9uZUdyYXBoaWNzID0gcm9vdFtcIl9zYWZlWm9uZUdyYXBoaWNzXCJdO1xyXG4gICAgICAgIGxldCBwbGF5ZXJNYXJrZXIgPSByb290W1wiX3BsYXllck1hcmtlclwiXTtcclxuICAgICAgICBsZXQgcGxheWVyTWFya2VyR3JhcGhpY3MgPSByb290W1wiX3BsYXllck1hcmtlckdyYXBoaWNzXCJdO1xyXG4gICAgICAgIGlmICghdmlld3BvcnQgfHwgIXNhZmVab25lR3JhcGhpY3MgfHwgIXBsYXllck1hcmtlciB8fCAhcGxheWVyTWFya2VyR3JhcGhpY3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aWxlZCA9IHRoaXMuX2ZpcmUuX3RpbGVkO1xyXG4gICAgICAgIGxldCBtYXBTY3JpcHQgPSB0aWxlZCAmJiB0aWxlZC5zY3JpcHQgPyB0aWxlZC5zY3JpcHQgOiBudWxsO1xyXG4gICAgICAgIGxldCBtYXBCb3VuZHMgPSBtYXBTY3JpcHQgJiYgbWFwU2NyaXB0LmdldE1hcEJvdW5kcyA/IG1hcFNjcmlwdC5nZXRNYXBCb3VuZHMoKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKCFtYXBCb3VuZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoYWxmV2lkdGggPSBNYXRoLm1heCgxLCBtYXBCb3VuZHMuaGFsZldpZHRoIHx8IDEpO1xyXG4gICAgICAgIGxldCBoYWxmSGVpZ2h0ID0gTWF0aC5tYXgoMSwgbWFwQm91bmRzLmhhbGZIZWlnaHQgfHwgMSk7XHJcbiAgICAgICAgbGV0IG1hcFBvc1RvTWluaW1hcCA9IChwb3MpID0+IHtcclxuICAgICAgICAgICAgbGV0IHggPSAoKHBvcy54ICsgaGFsZldpZHRoKSAvIChoYWxmV2lkdGggKiAyKSkgKiB2aWV3cG9ydC53aWR0aCAtIHZpZXdwb3J0LndpZHRoIC8gMjtcclxuICAgICAgICAgICAgbGV0IHkgPSAoKHBvcy55ICsgaGFsZkhlaWdodCkgLyAoaGFsZkhlaWdodCAqIDIpKSAqIHZpZXdwb3J0LmhlaWdodCAtIHZpZXdwb3J0LmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy52MihcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KC12aWV3cG9ydC53aWR0aCAvIDIsIE1hdGgubWluKHZpZXdwb3J0LndpZHRoIC8gMiwgeCkpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoLXZpZXdwb3J0LmhlaWdodCAvIDIsIE1hdGgubWluKHZpZXdwb3J0LmhlaWdodCAvIDIsIHkpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcm9vdCxcclxuICAgICAgICAgICAgdmlld3BvcnQsXHJcbiAgICAgICAgICAgIHNhZmVab25lR3JhcGhpY3MsXHJcbiAgICAgICAgICAgIHBsYXllck1hcmtlcixcclxuICAgICAgICAgICAgcGxheWVyTWFya2VyR3JhcGhpY3MsXHJcbiAgICAgICAgICAgIG1hcFNjcmlwdCxcclxuICAgICAgICAgICAgbWFwQm91bmRzLFxyXG4gICAgICAgICAgICBoYWxmV2lkdGgsXHJcbiAgICAgICAgICAgIGhhbGZIZWlnaHQsXHJcbiAgICAgICAgICAgIG1hcFBvc1RvTWluaW1hcCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoTXVsdGlwbGF5ZXJNaW5pbWFwTWFya2VyKCkge1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5fZ2V0TXVsdGlwbGF5ZXJNaW5pbWFwTWFwQ29udGV4dCgpO1xyXG4gICAgICAgIGlmICghY29udGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRMb2NhbE11bHRpcGxheWVyUGxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIgfHwgIWNjLmlzVmFsaWQocGxheWVyKSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LnBsYXllck1hcmtlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGxheWVyUG9zID0gY29udGV4dC5tYXBQb3NUb01pbmltYXAocGxheWVyLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgcGxheWVyTWFya2VyID0gY29udGV4dC5wbGF5ZXJNYXJrZXI7XHJcbiAgICAgICAgbGV0IHBsYXllck1hcmtlckdyYXBoaWNzID0gY29udGV4dC5wbGF5ZXJNYXJrZXJHcmFwaGljcztcclxuICAgICAgICBwbGF5ZXJNYXJrZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBwbGF5ZXJNYXJrZXIuc2V0UG9zaXRpb24ocGxheWVyUG9zKTtcclxuICAgICAgICBwbGF5ZXJNYXJrZXJHcmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHBsYXllck1hcmtlckdyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjM1LCAxMTAsIDI1NSk7XHJcbiAgICAgICAgcGxheWVyTWFya2VyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDUpO1xyXG4gICAgICAgIHBsYXllck1hcmtlckdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBwbGF5ZXJNYXJrZXJHcmFwaGljcy5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgIHBsYXllck1hcmtlckdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjIwKTtcclxuICAgICAgICBwbGF5ZXJNYXJrZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgOCk7XHJcbiAgICAgICAgcGxheWVyTWFya2VyR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkTXVsdGlwbGF5ZXJNaW5pbWFwU2FmZVpvbmVSZW5kZXJLZXkoc2FmZVpvbmUsIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoIXNhZmVab25lIHx8ICFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgTWF0aC5yb3VuZCgoc2FmZVpvbmUuY2VudGVyWCB8fCAwKSAqIDEwKSAvIDEwLFxyXG4gICAgICAgICAgICBNYXRoLnJvdW5kKChzYWZlWm9uZS5jZW50ZXJZIHx8IDApICogMTApIC8gMTAsXHJcbiAgICAgICAgICAgIE1hdGgucm91bmQoKHNhZmVab25lLnJhZGl1cyB8fCAwKSAqIDEwKSAvIDEwLFxyXG4gICAgICAgICAgICAhIXNhZmVab25lLmFjdGl2ZSxcclxuICAgICAgICAgICAgISFzYWZlWm9uZS5maW5pc2hlZCxcclxuICAgICAgICAgICAgISFzYWZlWm9uZS5wb2lzb25BY3RpdmUsXHJcbiAgICAgICAgICAgIE1hdGgucm91bmQoKHNhZmVab25lLnBvaXNvblJlbWFpbmluZyB8fCAwKSAqIDEwKSAvIDEwLFxyXG4gICAgICAgICAgICBjb250ZXh0LnZpZXdwb3J0LndpZHRoLFxyXG4gICAgICAgICAgICBjb250ZXh0LnZpZXdwb3J0LmhlaWdodCxcclxuICAgICAgICAgICAgTWF0aC5yb3VuZChjb250ZXh0LmhhbGZXaWR0aCAqIDEwKSAvIDEwLFxyXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNvbnRleHQuaGFsZkhlaWdodCAqIDEwKSAvIDEwLFxyXG4gICAgICAgIF0uam9pbihcInxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hNdWx0aXBsYXllck1pbmltYXBTYWZlWm9uZShmb3JjZSA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLl9nZXRNdWx0aXBsYXllck1pbmltYXBNYXBDb250ZXh0KCk7XHJcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNhZmVab25lR3JhcGhpY3MgPSBjb250ZXh0LnNhZmVab25lR3JhcGhpY3M7XHJcbiAgICAgICAgbGV0IHNhZmVab25lID0gY29udGV4dC5tYXBTY3JpcHQgJiYgY29udGV4dC5tYXBTY3JpcHQuZ2V0TXVsdGlwbGF5ZXJTYWZlWm9uZVN0YXRlXHJcbiAgICAgICAgICAgID8gY29udGV4dC5tYXBTY3JpcHQuZ2V0TXVsdGlwbGF5ZXJTYWZlWm9uZVN0YXRlKClcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIGxldCByZW5kZXJLZXkgPSB0aGlzLl9idWlsZE11bHRpcGxheWVyTWluaW1hcFNhZmVab25lUmVuZGVyS2V5KHNhZmVab25lLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoIWZvcmNlICYmIHJlbmRlcktleSA9PT0gdGhpcy5fbXVsdGlwbGF5ZXJNaW5pbWFwU2FmZVpvbmVSZW5kZXJLZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllck1pbmltYXBTYWZlWm9uZVJlbmRlcktleSA9IHJlbmRlcktleTtcclxuICAgICAgICBzYWZlWm9uZUdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgaWYgKCFzYWZlWm9uZSB8fCAhTnVtYmVyLmlzRmluaXRlKHNhZmVab25lLnJhZGl1cykgfHwgc2FmZVpvbmUucmFkaXVzIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2VudGVyID0gY29udGV4dC5tYXBQb3NUb01pbmltYXAoY2MudjIoc2FmZVpvbmUuY2VudGVyWCB8fCAwLCBzYWZlWm9uZS5jZW50ZXJZIHx8IDApKTtcclxuICAgICAgICBsZXQgcmFkaXVzWCA9IE1hdGgubWF4KDIsIHNhZmVab25lLnJhZGl1cyAvIChjb250ZXh0LmhhbGZXaWR0aCAqIDIpICogY29udGV4dC52aWV3cG9ydC53aWR0aCk7XHJcbiAgICAgICAgbGV0IHJhZGl1c1kgPSBNYXRoLm1heCgyLCBzYWZlWm9uZS5yYWRpdXMgLyAoY29udGV4dC5oYWxmSGVpZ2h0ICogMikgKiBjb250ZXh0LnZpZXdwb3J0LmhlaWdodCk7XHJcbiAgICAgICAgc2FmZVpvbmVHcmFwaGljcy5maWxsQ29sb3IgPSBzYWZlWm9uZS5wb2lzb25BY3RpdmVcclxuICAgICAgICAgICAgPyBjYy5jb2xvcigyNTUsIDEyMCwgMTIwLCAxMClcclxuICAgICAgICAgICAgOiBjYy5jb2xvcig4OCwgMTcwLCAyNTUsIHNhZmVab25lLmFjdGl2ZSA/IDIyIDogMTApO1xyXG4gICAgICAgIHNhZmVab25lR3JhcGhpY3MuZWxsaXBzZShjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1c1gsIHJhZGl1c1kpO1xyXG4gICAgICAgIHNhZmVab25lR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIHNhZmVab25lR3JhcGhpY3MubGluZVdpZHRoID0gc2FmZVpvbmUucG9pc29uQWN0aXZlID8gMyA6IDI7XHJcbiAgICAgICAgc2FmZVpvbmVHcmFwaGljcy5zdHJva2VDb2xvciA9IHNhZmVab25lLnBvaXNvbkFjdGl2ZSA/IGNjLmNvbG9yKDI1NSwgMTMwLCAxMzAsIDIzMCkgOiBjYy5jb2xvcigxMjAsIDIyMCwgMjU1LCAyMzApO1xyXG4gICAgICAgIHNhZmVab25lR3JhcGhpY3MuZWxsaXBzZShjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1c1gsIHJhZGl1c1kpO1xyXG4gICAgICAgIHNhZmVab25lR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbnN1bWVNdWx0aXBsYXllckZyYW1lTWV0YShjb21tYW5kKSB7XHJcbiAgICAgICAgaWYgKCFjb21tYW5kIHx8ICFjb21tYW5kLnR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSBcImh1ZFN0YXRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwbHlNdWx0aXBsYXllckh1ZFN0YXRlKGNvbW1hbmQuaHVkIHx8IG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbW1hbmQudHlwZSA9PT0gXCJhbm5vdW5jZW1lbnRcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQoY29tbWFuZC50ZXh0IHx8IFwiXCIsIGNvbW1hbmQuc3ViVGV4dCB8fCBcIlwiLCBjb21tYW5kLnN0eWxlIHx8IFwiaW5mb1wiLCBjb21tYW5kLmR1cmF0aW9uIHx8IDIuMik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSBcInNhZmVab25lU3RhdGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoTXVsdGlwbGF5ZXJNaW5pbWFwU2FmZVpvbmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSBcIm1hdGNoUmVzdWx0XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfb25NdWx0aXBsYXllckhpdFJlcG9ydChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgfHwgIWV2ZW50IHx8ICFldmVudC5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySGl0UXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBldmVudC5pZCxcclxuICAgICAgICAgICAgdGdpZDogZXZlbnQudGdpZCxcclxuICAgICAgICAgICAgaHA6IGV2ZW50LmhwID09IG51bGwgPyAtMSA6IGV2ZW50LmhwLFxyXG4gICAgICAgICAgICBkYW1hZ2U6IGV2ZW50LmRhbWFnZSA9PSBudWxsID8gLTEgOiBldmVudC5kYW1hZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX25leHRNdWx0aXBsYXllckJ1bGxldElkKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJJZCA9IHRoaXMuX25ldE1hbmFnZXIgPyB0aGlzLl9uZXRNYW5hZ2VyLnBsYXllcklkIDogMDtcclxuICAgICAgICBsZXQgaWQgPSBwbGF5ZXJJZCArIFwiX1wiICsgdGhpcy5fbXVsdGlwbGF5ZXJGaXJlU2VxO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRmlyZVNlcSsrO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0TG9jYWxNdWx0aXBsYXllclBsYXllcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZE11bHRpcGxheWVyRmlyZUNvbW1hbmQoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX2dldExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXIoKTtcclxuICAgICAgICBsZXQgZmlyZVR5cGUgPSAxO1xyXG4gICAgICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLnNjcmlwdCAmJiBwbGF5ZXIuc2NyaXB0LmdldE11bHRpcGxheWVyRmlyZVR5cGUpIHtcclxuICAgICAgICAgICAgZmlyZVR5cGUgPSBwbGF5ZXIuc2NyaXB0LmdldE11bHRpcGxheWVyRmlyZVR5cGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHRoaXMuX25leHRNdWx0aXBsYXllckJ1bGxldElkKCksXHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmVUeXBlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZURlZmF1bHRNdWx0aXBsYXllcklucHV0cygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB1cDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgcmlnaHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBhaW06IG51bGwsXHJcbiAgICAgICAgICAgIGZpcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBwaWNrdXBFbmVyZ3lJZDogbnVsbCxcclxuICAgICAgICAgICAgcGlja3VwVGFySWQ6IG51bGwsXHJcbiAgICAgICAgICAgIHBpY2t1cEJsYWNrSG9sZUlkOiBudWxsLFxyXG4gICAgICAgICAgICB0aHJvd1RhcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHRocm93QmxhY2tIb2xlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9nZ2xlQ292ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb3ZlckFjdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgZW5lcmd5RWdnQWN0aW9uOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMgPSB0aGlzLl9jcmVhdGVEZWZhdWx0TXVsdGlwbGF5ZXJJbnB1dHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySW5wdXRzLnBpY2t1cEVuZXJneUlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMucGlja3VwRW5lcmd5SWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMucGlja3VwVGFySWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllcklucHV0cy5waWNrdXBUYXJJZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy5waWNrdXBCbGFja0hvbGVJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnBpY2t1cEJsYWNrSG9sZUlkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySW5wdXRzLmFpbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLmFpbSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy50aHJvd1RhciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnRocm93VGFyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy50aHJvd0JsYWNrSG9sZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnRocm93QmxhY2tIb2xlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy50b2dnbGVDb3ZlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnRvZ2dsZUNvdmVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy5jb3ZlckFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLmNvdmVyQWN0aW9uID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySW5wdXRzLmVuZXJneUVnZ0FjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLmVuZXJneUVnZ0FjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsYXllcklucHV0cztcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJNdWx0aXBsYXllck9uZVNob3RJbnB1dHMoKSB7XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLmZpcmUgPSBmYWxzZTtcclxuICAgICAgICBpbnB1dHMuaGl0ID0gZmFsc2U7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cEVuZXJneUlkID0gbnVsbDtcclxuICAgICAgICBpbnB1dHMucGlja3VwVGFySWQgPSBudWxsO1xyXG4gICAgICAgIGlucHV0cy5waWNrdXBCbGFja0hvbGVJZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQtLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbnB1dHMudGhyb3dUYXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlucHV0cy50aHJvd0JsYWNrSG9sZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlucHV0cy50aHJvd1RhciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnB1dHMudGhyb3dCbGFja0hvbGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQ292ZXJUb2dnbGVSZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQ292ZXJUb2dnbGVSZXBlYXQtLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQ292ZXJUb2dnbGVSZXBlYXQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDb3ZlclRvZ2dsZVJlcGVhdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbnB1dHMudG9nZ2xlQ292ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpbnB1dHMudG9nZ2xlQ292ZXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRzLmNvdmVyQWN0aW9uID0gbnVsbDtcclxuICAgICAgICBpbnB1dHMuZW5lcmd5RWdnQWN0aW9uID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZmx1c2hNdWx0aXBsYXllcklucHV0c05vdygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICF0aGlzLl9uZXRNYW5hZ2VyIHx8ICF0aGlzLl9uZXRNYW5hZ2VyLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIuc2VuZElucHV0KHRoaXMuX2J1aWxkTXVsdGlwbGF5ZXJJbnB1dFBhY2tldCgpKTtcclxuICAgICAgICB0aGlzLl9jbGVhck11bHRpcGxheWVyT25lU2hvdElucHV0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZE11bHRpcGxheWVySW5wdXRQYWNrZXQoKSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgbGV0IGhpdCA9IHRoaXMuX211bHRpcGxheWVySGl0UXVldWUubGVuZ3RoID4gMCA/IHRoaXMuX211bHRpcGxheWVySGl0UXVldWUuc2hpZnQoKSA6IGZhbHNlO1xyXG4gICAgICAgIGxldCBidWxsZXRFdmVudHMgPSB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICA/IHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZS5zcGxpY2UoMCwgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlLmxlbmd0aClcclxuICAgICAgICAgICAgOiBbXTtcclxuICAgICAgICBsZXQgcGlja3VwRW5lcmd5SWQgPSBzb3VyY2UucGlja3VwRW5lcmd5SWQgPT0gbnVsbCA/IG51bGwgOiBzb3VyY2UucGlja3VwRW5lcmd5SWQ7XHJcbiAgICAgICAgbGV0IHBpY2t1cFRhcklkID0gc291cmNlLnBpY2t1cFRhcklkID09IG51bGwgPyBudWxsIDogc291cmNlLnBpY2t1cFRhcklkO1xyXG4gICAgICAgIGxldCBwaWNrdXBCbGFja0hvbGVJZCA9IHNvdXJjZS5waWNrdXBCbGFja0hvbGVJZCA9PSBudWxsID8gbnVsbCA6IHNvdXJjZS5waWNrdXBCbGFja0hvbGVJZDtcclxuICAgICAgICBsZXQgYWltID0gbnVsbDtcclxuICAgICAgICBpZiAoc291cmNlLmFpbSAmJiBOdW1iZXIuaXNGaW5pdGUoc291cmNlLmFpbS54KSAmJiBOdW1iZXIuaXNGaW5pdGUoc291cmNlLmFpbS55KSkge1xyXG4gICAgICAgICAgICBhaW0gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBOdW1iZXIoc291cmNlLmFpbS54LnRvRml4ZWQoNCkpLFxyXG4gICAgICAgICAgICAgICAgeTogTnVtYmVyKHNvdXJjZS5haW0ueS50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdXA6ICEhc291cmNlLnVwLFxyXG4gICAgICAgICAgICBkb3duOiAhIXNvdXJjZS5kb3duLFxyXG4gICAgICAgICAgICBsZWZ0OiAhIXNvdXJjZS5sZWZ0LFxyXG4gICAgICAgICAgICByaWdodDogISFzb3VyY2UucmlnaHQsXHJcbiAgICAgICAgICAgIGFpbTogYWltLFxyXG4gICAgICAgICAgICBmaXJlOiBzb3VyY2UuZmlyZSA/IHNvdXJjZS5maXJlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpdDogaGl0IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBidWxsZXRFdmVudHM6IGJ1bGxldEV2ZW50cyxcclxuICAgICAgICAgICAgcGlja3VwRW5lcmd5SWQ6IHBpY2t1cEVuZXJneUlkLFxyXG4gICAgICAgICAgICBwaWNrdXBUYXJJZDogcGlja3VwVGFySWQsXHJcbiAgICAgICAgICAgIHBpY2t1cEJsYWNrSG9sZUlkOiBwaWNrdXBCbGFja0hvbGVJZCxcclxuICAgICAgICAgICAgdGhyb3dUYXI6IHNvdXJjZS50aHJvd1RhciA/IHNvdXJjZS50aHJvd1RhciA6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aHJvd0JsYWNrSG9sZTogc291cmNlLnRocm93QmxhY2tIb2xlID8gc291cmNlLnRocm93QmxhY2tIb2xlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvZ2dsZUNvdmVyOiAhIXNvdXJjZS50b2dnbGVDb3ZlcixcclxuICAgICAgICAgICAgY292ZXJBY3Rpb246IHNvdXJjZS5jb3ZlckFjdGlvbiA/IHNvdXJjZS5jb3ZlckFjdGlvbiA6IG51bGwsXHJcbiAgICAgICAgICAgIGVuZXJneUVnZ0FjdGlvbjogc291cmNlLmVuZXJneUVnZ0FjdGlvbiA/IHNvdXJjZS5lbmVyZ3lFZ2dBY3Rpb24gOiBudWxsLFxyXG4gICAgICAgICAgICBwbGF5ZXJTbmFwc2hvdDogdGhpcy5fYnVpbGRMb2NhbE11bHRpcGxheWVyUGxheWVyU25hcHNob3QoKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXJTbmFwc2hvdCgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0TG9jYWxNdWx0aXBsYXllclBsYXllcigpO1xyXG4gICAgICAgIGlmICghcGxheWVyIHx8ICFwbGF5ZXIuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpciA9IHBsYXllci5zY3JpcHQuX2RpciAmJiBwbGF5ZXIuc2NyaXB0Ll9kaXIubWFnU3FyKCkgPiAwXHJcbiAgICAgICAgICAgID8gY2MudjIocGxheWVyLnNjcmlwdC5fZGlyKS5ub3JtYWxpemUoKVxyXG4gICAgICAgICAgICA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IE1hdGgucm91bmQocGxheWVyLngpLFxyXG4gICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHBsYXllci55KSxcclxuICAgICAgICAgICAgZGlyWDogTnVtYmVyKGRpci54LnRvRml4ZWQoNCkpLFxyXG4gICAgICAgICAgICBkaXJZOiBOdW1iZXIoZGlyLnkudG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgIHNwZWVkOiBOdW1iZXIoKHBsYXllci5zY3JpcHQuX2N1cnJlbnRTcGVlZCB8fCAwKS50b0ZpeGVkKDMpKSxcclxuICAgICAgICAgICAgcmFkaXVzOiBwbGF5ZXIuc2NyaXB0LmdldFJhZGl1cyA/IHBsYXllci5zY3JpcHQuZ2V0UmFkaXVzKCkgOiAzOCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZE11bHRpcGxheWVyUGxheWVyU2V0dXAoKSB7XHJcbiAgICAgICAgbGV0IGVuZXJneVNwYXduUG9pbnRzID0gW107XHJcbiAgICAgICAgbGV0IG1hcEJvdW5kcyA9IG51bGw7XHJcbiAgICAgICAgbGV0IHNwYXduQ2FuZGlkYXRlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX3RpbGVkICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJFbmVyZ3lTcGF3blBvaW50cykge1xyXG4gICAgICAgICAgICBlbmVyZ3lTcGF3blBvaW50cyA9IHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllckVuZXJneVNwYXduUG9pbnRzKDUxMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX3RpbGVkICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJNYXBCb3VuZHMpIHtcclxuICAgICAgICAgICAgbWFwQm91bmRzID0gdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyTWFwQm91bmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlICYmIHRoaXMuX2ZpcmUuX3RpbGVkICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJTcGF3bkNhbmRpZGF0ZXMpIHtcclxuICAgICAgICAgICAgc3Bhd25DYW5kaWRhdGVzID0gdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyU3Bhd25DYW5kaWRhdGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBidXNoU3Bhd25Qb2ludHMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl90aWxlZCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyQnVzaFNwYXduUG9pbnRzKSB7XHJcbiAgICAgICAgICAgIGJ1c2hTcGF3blBvaW50cyA9IHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllckJ1c2hTcGF3blBvaW50cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YW5rVHlwZTogTVVMVElQTEFZRVJfREVGQVVMVF9UQU5LX1RZUEUsXHJcbiAgICAgICAgICAgIHBsYXllckxldmVsOiBNVUxUSVBMQVlFUl9GSVhFRF9QTEFZRVJfTEVWRUwsXHJcbiAgICAgICAgICAgIGJhc2VIcDogTVVMVElQTEFZRVJfRklYRURfQkFTRV9IUCxcclxuICAgICAgICAgICAgYmFzZUF0azogTVVMVElQTEFZRVJfRklYRURfQkFTRV9BVEssXHJcbiAgICAgICAgICAgIGJhc2VTcGVlZDogTVVMVElQTEFZRVJfRklYRURfQkFTRV9TUEVFRCxcclxuICAgICAgICAgICAgYmFzZUF0dGFja1JhZGl1czogTVVMVElQTEFZRVJfRklYRURfQVRUQUNLX1JBRElVUyxcclxuICAgICAgICAgICAgZW5lcmd5U3Bhd25Qb2ludHM6IGVuZXJneVNwYXduUG9pbnRzLFxyXG4gICAgICAgICAgICBtYXBCb3VuZHM6IG1hcEJvdW5kcyxcclxuICAgICAgICAgICAgc3Bhd25DYW5kaWRhdGVzOiBzcGF3bkNhbmRpZGF0ZXMsXHJcbiAgICAgICAgICAgIGJ1c2hTcGF3blBvaW50czogYnVzaFNwYXduUG9pbnRzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJQbGF5ZXJEZWF0aChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgIWV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LmlzTG9jYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLkvaDlt7Looqvmt5jmsbDvvIznrYnlvoXmnKzlsYDnu5PnrpcuLi5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllckFubm91bmNlbWVudChcIuS9oOW3suiiq+a3mOaxsFwiLCBcIuetieW+heWFtuS9meeOqeWutuWGs+WHuuiDnOi0n1wiLCBcIndhcm5pbmdcIiwgMi4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJFbmVyZ3lQaWNrdXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCBldmVudC5lbmVyZ3lJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cEVuZXJneUlkID0gZXZlbnQuZW5lcmd5SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJUYXJQaWNrdXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCBldmVudC5waWNrdXBJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cFRhcklkID0gZXZlbnQucGlja3VwSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJCbGFja0hvbGVQaWNrdXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCBldmVudC5waWNrdXBJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cEJsYWNrSG9sZUlkID0gZXZlbnQucGlja3VwSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJUaHJvd1RhcihldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgfHwgIWV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnRocm93VGFyID0ge1xyXG4gICAgICAgICAgICBkaXJYOiBldmVudC5kaXJYLFxyXG4gICAgICAgICAgICBkaXJZOiBldmVudC5kaXJZLFxyXG4gICAgICAgICAgICByYXRpbzogZXZlbnQucmF0aW8sXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gNDtcclxuICAgICAgICB0aGlzLl9mbHVzaE11bHRpcGxheWVySW5wdXRzTm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJUaHJvd0JsYWNrSG9sZShldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgfHwgIWV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLnRocm93QmxhY2tIb2xlID0ge1xyXG4gICAgICAgICAgICBkaXJYOiBldmVudC5kaXJYLFxyXG4gICAgICAgICAgICBkaXJZOiBldmVudC5kaXJZLFxyXG4gICAgICAgICAgICByYXRpbzogZXZlbnQucmF0aW8sXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gNDtcclxuICAgICAgICB0aGlzLl9mbHVzaE11bHRpcGxheWVySW5wdXRzTm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJDb3ZlckFjdGlvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1hcFNjcmlwdCA9IHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fdGlsZWQgPyB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQgOiBudWxsO1xyXG4gICAgICAgIGlmIChtYXBTY3JpcHQgJiYgbWFwU2NyaXB0LmlzTG9jYWxNdWx0aXBsYXllckNvdmVyQWN0aW9uQXZhaWxhYmxlICYmICFtYXBTY3JpcHQuaXNMb2NhbE11bHRpcGxheWVyQ292ZXJBY3Rpb25BdmFpbGFibGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhY3Rpb25QYXlsb2FkID0gbnVsbDtcclxuICAgICAgICBpZiAobWFwU2NyaXB0ICYmIG1hcFNjcmlwdC5idWlsZExvY2FsTXVsdGlwbGF5ZXJJbnRlcmFjdGlvbkFjdGlvbikge1xyXG4gICAgICAgICAgICBhY3Rpb25QYXlsb2FkID0gbWFwU2NyaXB0LmJ1aWxkTG9jYWxNdWx0aXBsYXllckludGVyYWN0aW9uQWN0aW9uKHRoaXMuX211bHRpcGxheWVyQ292ZXJBY3Rpb25TZXErKyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1hcFNjcmlwdCAmJiBtYXBTY3JpcHQuYnVpbGRMb2NhbE11bHRpcGxheWVyQ292ZXJBY3Rpb24pIHtcclxuICAgICAgICAgICAgbGV0IGNvdmVyQWN0aW9uID0gbWFwU2NyaXB0LmJ1aWxkTG9jYWxNdWx0aXBsYXllckNvdmVyQWN0aW9uKHRoaXMuX211bHRpcGxheWVyQ292ZXJBY3Rpb25TZXErKyk7XHJcbiAgICAgICAgICAgIGFjdGlvblBheWxvYWQgPSBjb3ZlckFjdGlvbiA/IHtjb3ZlckFjdGlvbjogY292ZXJBY3Rpb259IDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWFwU2NyaXB0ICYmIG1hcFNjcmlwdC5ub3RpZnlMb2NhbE11bHRpcGxheWVyQ292ZXJUb2dnbGVSZXF1ZXN0ZWQpIHtcclxuICAgICAgICAgICAgbWFwU2NyaXB0Lm5vdGlmeUxvY2FsTXVsdGlwbGF5ZXJDb3ZlclRvZ2dsZVJlcXVlc3RlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFjdGlvblBheWxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5wdXRzID0gdGhpcy5fZW5zdXJlTXVsdGlwbGF5ZXJJbnB1dHMoKTtcclxuICAgICAgICBpbnB1dHMudG9nZ2xlQ292ZXIgPSBmYWxzZTtcclxuICAgICAgICBpbnB1dHMuY292ZXJBY3Rpb24gPSBhY3Rpb25QYXlsb2FkLmNvdmVyQWN0aW9uIHx8IG51bGw7XHJcbiAgICAgICAgaW5wdXRzLmVuZXJneUVnZ0FjdGlvbiA9IGFjdGlvblBheWxvYWQuZW5lcmd5RWdnQWN0aW9uIHx8IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDb3ZlclRvZ2dsZVJlcGVhdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZmx1c2hNdWx0aXBsYXllcklucHV0c05vdygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk11bHRpcGxheWVyQnVsbGV0RXZlbnQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCAhZXZlbnQudHlwZSB8fCAhZXZlbnQuYnVsbGV0SWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICAgICAgICAgIGJ1bGxldElkOiBldmVudC5idWxsZXRJZCxcclxuICAgICAgICAgICAgZXZlbnRJZDogZXZlbnQuZXZlbnRJZCA9PSBudWxsID8gbnVsbCA6IGV2ZW50LmV2ZW50SWQsXHJcbiAgICAgICAgICAgIHJlYXNvbjogZXZlbnQucmVhc29uIHx8IFwiXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZS5sZW5ndGggPiAxMikge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUuc3BsaWNlKDAsIHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZS5sZW5ndGggLSAxMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVNdWx0aXBsYXllclN0YXR1c0Zyb21Sb29tU3RhdGUocGF5bG9hZCkge1xyXG4gICAgICAgIGlmICghcGF5bG9hZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXlsb2FkLnN0YXRlID09IFwid2FpdGluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuetieW+heeOqeWutuWKoOWFpSAoXCIgKyBwYXlsb2FkLnBsYXllckNvdW50ICsgXCIvXCIgKyBwYXlsb2FkLm1pblBsYXllcnMgKyBcIi1cIiArIHBheWxvYWQubWF4UGxheWVycyArIFwiKVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGF5bG9hZC5zdGF0ZSA9PSBcImNvdW50ZG93blwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIua4uOaIj+WAkuiuoeaXtiBcIiArIHBheWxvYWQuY291bnRkb3duICsgXCIg56eSXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwYXlsb2FkLnN0YXRlID09IFwiZW5kZWRcIiAmJiAhdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd011bHRpcGxheWVyU3RhdHVzKFwi5pys5bGA5bey57uT5p2fXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd011bHRpcGxheWVyRmluaXNoKGlzV2luLCB3aW5uZXJQbGF5ZXJJZCkge1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5zY3JpcHQucmVmcmVzaExldmVsSW5mbygpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zZXRGaW5pc2goKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbmlzaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmluaXNoUHJlZmFiKTtcclxuICAgICAgICBmaW5pc2guekluZGV4ID0gMTAwMDtcclxuICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShmaW5pc2gpO1xyXG4gICAgICAgIGxldCByZXN1bHRUZXh0ID0gXCJcIjtcclxuICAgICAgICBpZiAod2lubmVyUGxheWVySWQgPj0gMCkge1xyXG4gICAgICAgICAgICByZXN1bHRUZXh0ID0gaXNXaW4gPyBcIuacrOWxgOiDnOWIqe+8jOS9oOiOt+W+l+S6huacgOe7iOiDnOWIqVwiIDogKFwi5pys5bGA5aSx5Yip77yM546p5a62XCIgKyAod2lubmVyUGxheWVySWQgKyAxKSArIFwi6I636IOcXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXN1bHRUZXh0ID0gXCLmnKzlsYDlubPlsYDvvIznrYnlvoXkuIvkuIDlsYDlho3miJhcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluaXNoLnNjcmlwdC5zZXRSZXN1bHQodGhpcy5fbGV2ZWxJZCwgaXNXaW4sIHRydWUsIHJlc3VsdFRleHQpO1xyXG5cclxuICAgICAgICBpZiAod2lubmVyUGxheWVySWQgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoaXNXaW4gPyBcIuS9oOiOt+iDnOS6hlwiIDogKFwi546p5a62IFwiICsgKHdpbm5lclBsYXllcklkICsgMSkgKyBcIiDojrfog5xcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmnKzlsYDlubPlsYBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9lbmRNdWx0aXBsYXllck1hdGNoKHBheWxvYWQpIHtcclxuICAgICAgICBsZXQgd2lubmVyUGxheWVySWQgPSBwYXlsb2FkICYmIHBheWxvYWQud2lubmVyUGxheWVySWQgIT0gbnVsbCA/IHBheWxvYWQud2lubmVyUGxheWVySWQgOiAtMTtcclxuICAgICAgICBsZXQgbG9jYWxQbGF5ZXJJZCA9IHRoaXMuX25ldE1hbmFnZXIgPyB0aGlzLl9uZXRNYW5hZ2VyLnBsYXllcklkIDogLTE7XHJcbiAgICAgICAgbGV0IGlzV2luID0gd2lubmVyUGxheWVySWQgPj0gMCAmJiB3aW5uZXJQbGF5ZXJJZCA9PSBsb2NhbFBsYXllcklkO1xyXG5cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllcklucHV0cyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQ292ZXJUb2dnbGVSZXBlYXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQ292ZXJBY3Rpb25TZXEgPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLl9uZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25EaXNjb25uZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJIdWQoKTtcclxuICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJGaW5pc2goaXNXaW4sIHdpbm5lclBsYXllcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnRNdWx0aXBsYXllckdhbWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkRpc2Nvbm5lY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDb3ZlclRvZ2dsZVJlcGVhdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDb3ZlckFjdGlvblNlcSA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVNdWx0aXBsYXllckFubm91bmNlbWVudCgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVNdWx0aXBsYXllckh1ZCgpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0R2FtZUJlZm9yZVRlc3QoKTtcclxuICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmraPlnKjov57mjqXmnI3liqHlmaggXCIgKyBNVUxUSVBMQVlFUl9TRVJWRVJfVVJMICsgXCIgLi4uXCIpO1xyXG5cclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyID0gbmV3IE5ldHdvcmtNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkNvdW50ZG93biA9IChzZWNvbmRzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIua4uOaIj+WAkuiuoeaXtiBcIiArIHNlY29uZHMgKyBcIiDnp5JcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uUGxheWVyQ291bnQgPSAoY291bnQsIG1heCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLlt7Lov57mjqXvvIznrYnlvoXnjqnlrrYgKFwiICsgY291bnQgKyBcIi9cIiArIG1heCArIFwiKVwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25Sb29tU3RhdGUgPSAocGF5bG9hZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNdWx0aXBsYXllclN0YXR1c0Zyb21Sb29tU3RhdGUocGF5bG9hZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uQ29ubmVjdGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmV0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5zZW5kUGxheWVyU2V0dXAodGhpcy5fYnVpbGRNdWx0aXBsYXllclBsYXllclNldHVwKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uR2FtZVN0YXJ0ID0gKHBsYXllcklkLCBwbGF5ZXJDb3VudCwgc3Bhd25TbG90cywgZW5lcmdpZXMsIHBsYXllcnMsIHNwZWNpYWxFdmVudHMsIHRhclBpY2t1cHMsIHRhclNwaWxscywgYmxhY2tIb2xlUGlja3VwcywgYmxhY2tIb2xlWm9uZXMsIGJ1c2hlcywgY292ZXJzLCBzYWZlWm9uZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydE11bHRpcGxheWVyTWF0Y2gocGxheWVySWQsIHBsYXllckNvdW50IHx8IDIsIHNwYXduU2xvdHMgfHwgW10sIGVuZXJnaWVzIHx8IFtdLCBwbGF5ZXJzIHx8IFtdLCBzcGVjaWFsRXZlbnRzIHx8IFtdLCB0YXJQaWNrdXBzIHx8IFtdLCB0YXJTcGlsbHMgfHwgW10sIGJsYWNrSG9sZVBpY2t1cHMgfHwgW10sIGJsYWNrSG9sZVpvbmVzIHx8IFtdLCBidXNoZXMgfHwgW10sIGNvdmVycyB8fCBbXSwgc2FmZVpvbmUgfHwgbnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uR2FtZUVuZGVkID0gKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZW5kTXVsdGlwbGF5ZXJNYXRjaChwYXlsb2FkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25EaXNjb25uZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLov57mjqXmlq3lvIBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVyQW5ub3VuY2VtZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpZGVNdWx0aXBsYXllckh1ZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5jb25uZWN0KE1VTFRJUExBWUVSX1NFUlZFUl9VUkwpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydE11bHRpcGxheWVyTWF0Y2gocGxheWVySWQsIHBsYXllckNvdW50LCBzcGF3blNsb3RzLCBlbmVyZ2llcywgcGxheWVycyA9IFtdLCBzcGVjaWFsRXZlbnRzID0gW10sIHRhclBpY2t1cHMgPSBbXSwgdGFyU3BpbGxzID0gW10sIGJsYWNrSG9sZVBpY2t1cHMgPSBbXSwgYmxhY2tIb2xlWm9uZXMgPSBbXSwgYnVzaGVzID0gW10sIGNvdmVycyA9IFtdLCBzYWZlWm9uZSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJTdGF0dXMoKTtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJBbm5vdW5jZW1lbnQoKTtcclxuICAgICAgICB0aGlzLl9oaWRlTXVsdGlwbGF5ZXJIdWQoKTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDb3ZlclRvZ2dsZVJlcGVhdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJGaXJlU2VxID0gMTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckNvdmVyQWN0aW9uU2VxID0gMTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllcklucHV0cyA9IHRoaXMuX2NyZWF0ZURlZmF1bHRNdWx0aXBsYXllcklucHV0cygpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0TXVsdGlwbGF5ZXJHYW1lKHBsYXllckNvdW50IHx8IDIsIHBsYXllcklkLCBzcGF3blNsb3RzIHx8IFtdLCBlbmVyZ2llcyB8fCBbXSwgcGxheWVycyB8fCBbXSwgc3BlY2lhbEV2ZW50cyB8fCBbXSwgdGFyUGlja3VwcyB8fCBbXSwgdGFyU3BpbGxzIHx8IFtdLCBibGFja0hvbGVQaWNrdXBzIHx8IFtdLCBibGFja0hvbGVab25lcyB8fCBbXSwgYnVzaGVzIHx8IFtdLCBjb3ZlcnMgfHwgW10sIHNhZmVab25lIHx8IG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5fZmlyZS5fdWkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5fc2NoZWR1bGVNdWx0aXBsYXllck1pbmltYXBSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHNlbGYuX3NldHVwTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKHRoaXMuX211bHRpcGxheWVySW5wdXRMb29wVGFnKTtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlcikge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiam95LXN0aWNrXCIsIHRoaXMuX211bHRpcGxheWVySm95TW92ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckpveU1vdmVIYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJqb3ktc3RpY2stc2hvb3RcIiwgdGhpcy5fbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckpveVNob290SGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckNhbWVyYUZvbGxvd0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLl9tdWx0aXBsYXllckNhbWVyYUZvbGxvd0NhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zZXR1cE11bHRpcGxheWVySW5wdXRMb29wKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcblxyXG4gICAgICAgIC8vIFRyYWNrIG1vdmVtZW50IHZpYSBqb3ktc3RpY2sgRVZFTlQgKGZpcmVzIHJhdGlvOjAgb24gcmVsZWFzZSwgcmVsaWFibGUpXHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX211bHRpcGxheWVyQWN0aXZlIHx8IHNlbGYuX211bHRpcGxheWVyTG9jYWxEZWFkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChldmVudC5yYXRpbyA+IDAgJiYgZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnVwID0gZXZlbnQuZGlyLnkgPiAwLjM7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5kb3duID0gZXZlbnQuZGlyLnkgPCAtMC4zO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJJbnB1dHMubGVmdCA9IGV2ZW50LmRpci54IDwgLTAuMztcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnJpZ2h0ID0gZXZlbnQuZGlyLnggPiAwLjM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyByYXRpbz09MCBtZWFucyBmaW5nZXIgbGlmdGVkIOKAlCBjbGVhciBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJJbnB1dHMudXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImpveS1zdGlja1wiLCB0aGlzLl9tdWx0aXBsYXllckpveU1vdmVIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gVHJhY2sgZmlyZSB2aWEgZXZlbnQgKHNpbmdsZS1zaG90IGV2ZW50KVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgc2VsZi5fbXVsdGlwbGF5ZXJMb2NhbERlYWQpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGlucHV0cyA9IHNlbGYuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kaXIgJiYgZXZlbnQuZGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFpbURpciA9IGNjLnYyKGV2ZW50LmRpcikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gc2VsZi5fZ2V0TG9jYWxNdWx0aXBsYXllclBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllciAmJiBwbGF5ZXIuc2NyaXB0ICYmIHBsYXllci5zY3JpcHQudXBkYXRlTXVsdGlwbGF5ZXJMb2NhbEFpbVByZXZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LnVwZGF0ZU11bHRpcGxheWVyTG9jYWxBaW1QcmV2aWV3KGFpbURpcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnB1dHMuYWltID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGFpbURpci54LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGFpbURpci55LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZmlyZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHNlbGYuX2dldExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLnNjcmlwdCAmJiBwbGF5ZXIuc2NyaXB0LmNhbkFmZm9yZE11bHRpcGxheWVyRmlyZSAmJiAhcGxheWVyLnNjcmlwdC5jYW5BZmZvcmRNdWx0aXBsYXllckZpcmUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc2NyaXB0Ll9mcmVlQnVsbGV0Q291bnQgPD0gMCAmJiBwbGF5ZXIuc2NyaXB0Ll9zaG93TG93SHBTaG9vdFRpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2NyaXB0Ll9zaG93TG93SHBTaG9vdFRpcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnB1dHMuZmlyZSA9IHNlbGYuX2J1aWxkTXVsdGlwbGF5ZXJGaXJlQ29tbWFuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJqb3ktc3RpY2stc2hvb3RcIiwgdGhpcy5fbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyBGcmFtZSBzeW5jOiBsaXN0ZW4gZm9yIGZyYW1lIGRhdGEgZnJvbSBzZXJ2ZXJcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uRnJhbWUgPSBmdW5jdGlvbiAoZnJhbWVEYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGNvbW1hbmRzID0gZnJhbWVEYXRhICYmIEFycmF5LmlzQXJyYXkoZnJhbWVEYXRhLmNvbW1hbmRzKSA/IGZyYW1lRGF0YS5jb21tYW5kcyA6IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9jb25zdW1lTXVsdGlwbGF5ZXJGcmFtZU1ldGEoY29tbWFuZHNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LnNpbXVsYXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zaW11bGF0ZUZyYW1lKGZyYW1lRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZW5kIGxvY2FsIGlucHV0cyBhdCB0aWNrIHJhdGUgKDIwSHopXHJcbiAgICAgICAgbGV0IGlucHV0TG9vcCA9IGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEgLyAyMCksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLl9tdWx0aXBsYXllckFjdGl2ZSB8fCAhc2VsZi5fbmV0TWFuYWdlciB8fCAhc2VsZi5fbmV0TWFuYWdlci5jb25uZWN0ZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fbXVsdGlwbGF5ZXJMb2NhbERlYWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9uZXRNYW5hZ2VyLnNlbmRJbnB1dChzZWxmLl9idWlsZE11bHRpcGxheWVySW5wdXRQYWNrZXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2xlYXJNdWx0aXBsYXllck9uZVNob3RJbnB1dHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FtZXJhIGZvbGxvd1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0Ll9jZW50ZXJPbkxvY2FsUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaW5wdXRMb29wLnNldFRhZyh0aGlzLl9tdWx0aXBsYXllcklucHV0TG9vcFRhZyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihpbnB1dExvb3ApO1xyXG5cclxuICAgICAgICAvLyBTbW9vdGggY2FtZXJhIGZvbGxvdyBldmVyeSBmcmFtZSB2aWEgc2NoZWR1bGVyXHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLl9tdWx0aXBsYXllckFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuX2NlbnRlck9uTG9jYWxQbGF5ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLl9tdWx0aXBsYXllckNhbWVyYUZvbGxvd0NhbGxiYWNrLCAwLjAxNiwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==