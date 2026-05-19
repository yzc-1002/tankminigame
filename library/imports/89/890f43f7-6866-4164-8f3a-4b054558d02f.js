"use strict";
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