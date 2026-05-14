
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
        yyp.eventCenter.on("multiplayer-throw-tar", this._onMultiplayerThrowTar, this);
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
        yyp.eventCenter.off("multiplayer-throw-tar", this._onMultiplayerThrowTar, this);
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
            finish.script.setResult(this._levelId, true);
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
            finish.script.setResult(this._levelId, false);
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
            fire: false,
            hit: false,
            pickupEnergyId: null,
            pickupTarId: null,
            throwTar: false,
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
        if (this._multiplayerInputs.throwTar === undefined) {
            this._multiplayerInputs.throwTar = false;
        }
        return this._multiplayerInputs;
    };
    GameMain.prototype._clearMultiplayerOneShotInputs = function () {
        var inputs = this._ensureMultiplayerInputs();
        inputs.fire = false;
        inputs.hit = false;
        inputs.pickupEnergyId = null;
        inputs.pickupTarId = null;
        if (this._multiplayerTarThrowRepeat > 0) {
            this._multiplayerTarThrowRepeat--;
            if (this._multiplayerTarThrowRepeat <= 0) {
                this._multiplayerTarThrowRepeat = 0;
                inputs.throwTar = false;
            }
        }
        else {
            inputs.throwTar = false;
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
        return {
            up: !!source.up,
            down: !!source.down,
            left: !!source.left,
            right: !!source.right,
            fire: source.fire ? source.fire : false,
            hit: hit || false,
            bulletEvents: bulletEvents,
            pickupEnergyId: pickupEnergyId,
            pickupTarId: pickupTarId,
            throwTar: source.throwTar ? source.throwTar : false,
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
        var tankType = LocalizedData_1.LocalizedData.getIntItem("_current_player_type_", 1);
        var playerLevel = LocalizedData_1.LocalizedData.getIntItem("_player_" + tankType + "_", 1);
        var config = yyp.config.Tank && yyp.config.Tank[tankType] ? yyp.config.Tank[tankType] : {};
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
        return {
            tankType: tankType,
            playerLevel: playerLevel,
            baseHp: (config.HP == null ? 50 : config.HP) * (playerLevel + 1),
            baseAtk: (config.ATK == null ? 5 : config.ATK) * (playerLevel + 1),
            baseSpeed: config.Speed == null ? 4 : config.Speed,
            baseAttackRadius: config.AttackRadius == null ? 420 : config.AttackRadius,
            energySpawnPoints: energySpawnPoints,
            mapBounds: mapBounds,
            spawnCandidates: spawnCandidates,
        };
    };
    GameMain.prototype._onMultiplayerPlayerDeath = function (event) {
        if (!this._multiplayerActive || !event) {
            return;
        }
        if (event.isLocal) {
            this._multiplayerLocalDead = true;
            this._showMultiplayerStatus("你已被淘汰，等待本局结算...");
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
    GameMain.prototype._onMultiplayerThrowTar = function (event) {
        if (!this._multiplayerActive || this._multiplayerLocalDead || !event) {
            return;
        }
        var inputs = this._ensureMultiplayerInputs();
        inputs.throwTar = {
            x: event.x,
            y: event.y,
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
        finish.script.setResult(this._levelId, isWin);
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
        this._resetGameBeforeTest();
        this._hideUpgradeChoicePanel(false);
        this._showMultiplayerStatus("正在连接服务器 ws://localhost:2567 ...");
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
        this._netManager.onGameStart = function (playerId, playerCount, spawnSlots, energies, players, specialEvents, tarPickups, tarSpills, safeZone) {
            _this._startMultiplayerMatch(playerId, playerCount || 2, spawnSlots || [], energies || [], players || [], specialEvents || [], tarPickups || [], tarSpills || [], safeZone || null);
        };
        this._netManager.onGameEnded = function (payload) {
            _this._endMultiplayerMatch(payload);
        };
        this._netManager.onDisconnect = function () {
            _this._showMultiplayerStatus("连接断开");
            _this._multiplayerActive = false;
            _this._teardownMultiplayerInputLoop();
        };
        this._netManager.connect("ws://localhost:2567");
    };
    GameMain.prototype._startMultiplayerMatch = function (playerId, playerCount, spawnSlots, energies, players, specialEvents, tarPickups, tarSpills, safeZone) {
        if (players === void 0) { players = []; }
        if (specialEvents === void 0) { specialEvents = []; }
        if (tarPickups === void 0) { tarPickups = []; }
        if (tarSpills === void 0) { tarSpills = []; }
        if (safeZone === void 0) { safeZone = null; }
        this._hideMultiplayerStatus();
        this._multiplayerActive = true;
        this._multiplayerLocalDead = false;
        this._multiplayerHitQueue = [];
        this._multiplayerBulletEventQueue = [];
        this._multiplayerTarThrowRepeat = 0;
        this._multiplayerFireSeq = 1;
        this._multiplayerInputs = this._createDefaultMultiplayerInputs();
        var self = this;
        this._fire._tiled.script.startMultiplayerGame(playerCount || 2, playerId, spawnSlots || [], energies || [], players || [], specialEvents || [], tarPickups || [], tarSpills || [], safeZone || null, function () {
            self._fire._joystick.active = true;
            self._fire._ui.active = true;
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
            if (event.fire === true) {
                self._multiplayerInputs.fire = self._buildMultiplayerFireCommand();
            }
        };
        yyp.eventCenter.on("joy-stick-shoot", this._multiplayerJoyShootHandler);
        // Frame sync: listen for frame data from server
        this._netManager.onFrame = function (frameData) {
            if (!self._multiplayerActive)
                return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsMkRBQTBEO0FBRTFELDRDQUF5QztBQUN6QywwQ0FBdUM7QUFDdkMsMENBQXVDO0FBRWpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFhO0lBQW5EO1FBQUEscUVBbTNDQztRQWgzQ0csa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsZ0JBQVUsR0FBZSxJQUFJLENBQUMsQ0FBSSxJQUFJO1FBR3RDLGtCQUFZLEdBQWUsSUFBSSxDQUFDLENBQUksSUFBSTtRQUV4QyxtQkFBbUI7UUFDbkIsY0FBUSxHQUFRLENBQUMsQ0FBQyxDQUFNLE1BQU07UUFFOUIsaUJBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIseUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLHdCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQixpQkFBVyxHQUFHLElBQUksQ0FBQyxDQUFTLFdBQVc7UUFDdkMsd0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUUsUUFBUTtRQUNwQyx3QkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxTQUFTO1FBQ3JDLDJCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5Qiw4QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFDaEMsd0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLDBCQUFvQixHQUFHLEVBQUUsQ0FBQztRQUMxQixrQ0FBNEIsR0FBRyxFQUFFLENBQUM7UUFDbEMsZ0NBQTBCLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLHlC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LENBQUMsaUJBQWlCLENBQUMsR0FBRyxNQUFNLENBQUM7UUFFakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakQsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdEMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixZQUFZLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV0QixJQUFJLGFBQWEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRCxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDckMsU0FBUyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVELFNBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzVELFNBQVMsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXhELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRyxJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7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QVEsQ0FtM0M1QjtJQUFELGVBQUM7Q0FuM0NELEFBbTNDQyxDQW4zQ3FDLDZCQUFhLEdBbTNDbEQ7a0JBbjNDb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHsgTXVzaWNNYW5hZ2VyIH0gZnJvbSBcIi4vYmFzZS9NdXNpY01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTmV0d29ya01hbmFnZXIgfSBmcm9tIFwiLi9uZXR3b3JrL05ldHdvcmtNYW5hZ2VyXCI7XHJcblxyXG5pbXBvcnQge0FuYWx5dGljc30gZnJvbSBcIi4vYWQvQW5hbHl0aWNzXCI7XHJcbmltcG9ydCB7SW5zZXJ0QWR9IGZyb20gXCIuL2FkL0luc2VydEFkXCI7XHJcbmltcG9ydCB7UmV3YXJkQWR9IGZyb20gXCIuL2FkL1Jld2FyZEFkXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYWluIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYikgXHJcbiAgICBmaW5pc2hQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHNldHRpbmdQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHdpc2hQcmVmYWIgOiBjYy5QcmVmYWIgPSBudWxsOyAgICAvL+i9rOebmFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICByZXZpdmVQcmVmYWIgOiBjYy5QcmVmYWIgPSBudWxsOyAgICAvL+i9rOebmFxyXG5cclxuICAgIC8vIF9jc2IgOiBhbnkgPSB7fTtcclxuICAgIF9sZXZlbElkICAgID0gICAxOyAgICAgIC8v5b2T5YmN5YWz5Y2hXHJcblxyXG4gICAgX3N0YXJ0Q291bnQgPSAwO1xyXG4gICAgX3Rlc3RQYW5lbCA9IG51bGw7XHJcbiAgICBfdXBncmFkZUNob2ljZVBhbmVsID0gbnVsbDtcclxuICAgIF91cGdyYWRlQ2hvaWNlTW9kZSA9IFwidXBncmFkZVwiO1xyXG4gICAgX25ldE1hbmFnZXIgPSBudWxsOyAgICAgICAgIC8v572R57uc566h55CG5ZmoKOWkmuS6uilcclxuICAgIF9tdWx0aXBsYXllclN0YXR1cyA9IG51bGw7ICAvL+i/nuaOpeeKtuaAgeagh+etvlxyXG4gICAgX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7IC8v5aSa5Lq65ri45oiP6L+b6KGM5LitXHJcbiAgICBfbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSBmYWxzZTtcclxuICAgIF9tdWx0aXBsYXllcklucHV0TG9vcFRhZyA9IDc2MDE7XHJcbiAgICBfbXVsdGlwbGF5ZXJJbnB1dHMgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVySGl0UXVldWUgPSBbXTtcclxuICAgIF9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUgPSBbXTtcclxuICAgIF9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gMDtcclxuICAgIF9tdWx0aXBsYXllckZpcmVTZXEgPSAxO1xyXG4gICAgX211bHRpcGxheWVySm95TW92ZUhhbmRsZXIgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyID0gbnVsbDtcclxuICAgIF9tdWx0aXBsYXllckNhbWVyYUZvbGxvd0NhbGxiYWNrID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpIHtcclxuICAgICAgICAvL+makOiXj+W8gOWni+aMiemSrlxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieXlwLnNhZmVUb3BCb3R0b21cIix5eXAuc2FmZVRvcEJvdHRvbSlcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnkgPSB5eXAuc2FmZVRvcEJvdHRvbS0zMDtcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnpJbmRleCA9IDEwMDE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2J0blRlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuVGVzdC55ID0geXlwLnNhZmVUb3BCb3R0b20tMzA7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0blRlc3QuekluZGV4ID0gMTAwMTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdFRlc3RCdXR0b25WaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgVXRpbHMuZG9RQWN0aW9uKHRoaXMuX2ZpcmUuX2J0bldpc2gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3ByZURlZmVuc2Uuc2NyaXB0LnNldEluU3RhcnQoMyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcHJlQnVsbGV0LnNjcmlwdC5zZXRJblN0YXJ0KDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIC8vIHl5cC5ldmVudENlbnRlci5vbignY29uZmlnLWxvYWRlZCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgIC8v6YWN572u5Yqg6L295a6M5q+VXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjdXJyZW50LWxldmVsaWQnLHRoaXMuX3VwZGF0ZUxldmVsaWQsdGhpcyk7ICAgICAgICAgLy/lvZPliY3lhbPljaFcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2N1cnJlbnQtZW5lbXljb3VudCcsdGhpcy5fdXBkYXRlRW5lbXlDb3VudCx0aGlzKTsgICAvL+aVjOS6uuaVsOmHj1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigncGxheWVyLWRlYXRoJyx0aGlzLl9wbGF5ZXJEZWF0aCx0aGlzKTsgICAgICAgICAgICAgIC8vcGxheWVy5q275LqhXHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9uKCdhZGQtY29pbicsdGhpcy5fYWRkQ29pbix0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3Jlc3RhcnQnLHRoaXMuX3ByZXBhcmUsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndXBkYXRlJyx0aGlzLl91cGRhdGVNc2csdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpS/pgIDlh7rljYfnuqfnlYzpnaJcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJwbGF5ZXItcmV2aXZlXCIsdGhpcy5fcGxheWVyUmV2aXZlLHRoaXMpOyAgICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImdhbWUtcGF1c2VcIix0aGlzLl9nYW1lUGF1c2UsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mmoLlgZxcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJnYW1lLXJlc3VtZVwiLHRoaXMuX2dhbWVSZXN1bWUsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci1oaXRcIix0aGlzLl9vbk11bHRpcGxheWVySGl0UmVwb3J0LHRoaXMpOyAvL+WkmuS6uuWRveS4reS4iuaKpVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLWJ1bGxldC1ldmVudFwiLCB0aGlzLl9vbk11bHRpcGxheWVyQnVsbGV0RXZlbnQsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLXBsYXllci1kZWF0aFwiLCB0aGlzLl9vbk11bHRpcGxheWVyUGxheWVyRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLWVuZXJneS1waWNrdXBcIiwgdGhpcy5fb25NdWx0aXBsYXllckVuZXJneVBpY2t1cCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwibXVsdGlwbGF5ZXItdGFyLXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyVGFyUGlja3VwLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJtdWx0aXBsYXllci10aHJvdy10YXJcIiwgdGhpcy5fb25NdWx0aXBsYXllclRocm93VGFyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25TdGFydENsaWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjb25maWctbG9hZGVkJyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgLy/phY3nva7liqDovb3lrozmr5VcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjdXJyZW50LWxldmVsaWQnLHRoaXMuX3VwZGF0ZUxldmVsaWQsdGhpcyk7ICAgICAgICAgLy/lvZPliY3lhbPljaFcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjdXJyZW50LWVuZW15Y291bnQnLHRoaXMuX3VwZGF0ZUVuZW15Q291bnQsdGhpcyk7ICAgLy/mlYzkurrmlbDph49cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdwbGF5ZXItZGVhdGgnLHRoaXMuX3BsYXllckRlYXRoLHRoaXMpOyAgICAgICAgICAgICAgLy9wbGF5ZXLmrbvkuqFcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub2ZmKCdhZGQtY29pbicsdGhpcy5fYWRkQ29pbix0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdyZXN0YXJ0Jyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAgLy/ph43mlrDlvIDlp4tcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd1cGRhdGUnLHRoaXMuX3VwZGF0ZU1zZyx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b5YWlL+mAgOWHuuWNh+e6p+eVjOmdolxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJwbGF5ZXItcmV2aXZlXCIsdGhpcy5fcGxheWVyUmV2aXZlLHRoaXMpOyAgICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJnYW1lLXBhdXNlXCIsdGhpcy5fZ2FtZVBhdXNlLHRoaXMpOyAgICAgICAgICAgICAgICAgIC8v5pqC5YGcXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImdhbWUtcmVzdW1lXCIsdGhpcy5fZ2FtZVJlc3VtZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aBouWkjVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1oaXRcIix0aGlzLl9vbk11bHRpcGxheWVySGl0UmVwb3J0LHRoaXMpOyAvL+WkmuS6uuWRveS4reS4iuaKpVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1idWxsZXQtZXZlbnRcIiwgdGhpcy5fb25NdWx0aXBsYXllckJ1bGxldEV2ZW50LCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItcGxheWVyLWRlYXRoXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJQbGF5ZXJEZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcIm11bHRpcGxheWVyLWVuZXJneS1waWNrdXBcIiwgdGhpcy5fb25NdWx0aXBsYXllckVuZXJneVBpY2t1cCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcIm11bHRpcGxheWVyLXRhci1waWNrdXBcIiwgdGhpcy5fb25NdWx0aXBsYXllclRhclBpY2t1cCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcIm11bHRpcGxheWVyLXRocm93LXRhclwiLCB0aGlzLl9vbk11bHRpcGxheWVyVGhyb3dUYXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25TdGFydENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95VGVzdFBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcclxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g5b2T5YmN5YWz5Y2hXHJcbiAgICBfdXBkYXRlTGV2ZWxpZChldmVudCl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IGV2ZW50LmxldmVsaWQ7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJMZXZlbC4kTGFiZWwuc3RyaW5nID0gXCJMZXZlbDpcIiArIGV2ZW50LmxldmVsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pWM5Lq65pWw6YePXHJcbiAgICBfdXBkYXRlRW5lbXlDb3VudChldmVudCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJFbmVteS4kTGFiZWwuc3RyaW5nID0gZXZlbnQuZW5lbXljb3VudDtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmlzVGVzdE1vZGUgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmlzVGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC5lbmVteWNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgTG9jYWxpemVkRGF0YS5zZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwgdGhpcy5fbGV2ZWxJZCArIDEpO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJ3aW4hISEhISEhISEhIVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5zY3JpcHQucmVmcmVzaExldmVsSW5mbygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnNldEZpbmlzaCgpO1xyXG5cclxuICAgICAgICAgICAgLy/mmL7npLrog5zliKnnlYzpnaJcclxuICAgICAgICAgICAgbGV0IGZpbmlzaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmluaXNoUHJlZmFiKTtcclxuICAgICAgICAgICAgZmluaXNoLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgICAgIFV0aWxzLmFkZHRvQ3VycmVudFNjZW5lKGZpbmlzaCk7XHJcbiAgICAgICAgICAgIGZpbmlzaC5zY3JpcHQuc2V0UmVzdWx0KHRoaXMuX2xldmVsSWQsdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeOqeWutuatu+S6oVxyXG4gICAgX3BsYXllckRlYXRoKGV2ZW50KXtcclxuICAgICAgICAvLyBjYy5sb2coXCJmYWlsZWQhISEhISEhISEhIVwiKTtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKFJld2FyZEFkLmdldEluc3RhbmNlKCkuaXNMb2FkKCkpIHtcclxuICAgICAgICAgICAgLy/mmL7npLrlpI3mtLvnlYzpnaJcclxuICAgICAgICAgICAgbGV0IHJldml2ZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmV2aXZlUHJlZmFiKTtcclxuICAgICAgICAgICAgcmV2aXZlLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgICAgIFV0aWxzLmFkZHRvQ3VycmVudFNjZW5lKHJldml2ZSk7XHJcbiAgICAgICAgICAgIHJldml2ZS5zY3JpcHQuaW5pdCh0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyUmV2aXZlKHt0eXBlOmZhbHNlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5ZXJSZXZpdmUoZXZlbnQpe1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC50eXBlID09IHRydWUpIHtcclxuICAgICAgICAgICAgLy/lpI3mtLtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnJldml2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuc2NyaXB0LnJlZnJlc2hMZXZlbEluZm8oKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnNldEZpbmlzaCgpO1xyXG5cclxuICAgICAgICAgICAgLy/mmL7npLrlpLHotKXnlYzpnaJcclxuICAgICAgICAgICAgbGV0IGZpbmlzaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmluaXNoUHJlZmFiKTtcclxuICAgICAgICAgICAgZmluaXNoLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgICAgIFV0aWxzLmFkZHRvQ3VycmVudFNjZW5lKGZpbmlzaCk7XHJcbiAgICAgICAgICAgIGZpbmlzaC5zY3JpcHQuc2V0UmVzdWx0KHRoaXMuX2xldmVsSWQsZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX2dhbWVQYXVzZSgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5wYXVzZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfZ2FtZVJlc3VtZSgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5yZXN1bWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDph5HluIHlop7liqBcclxuICAgIC8vIF9hZGRDb2luKGV2ZW50KXtcclxuICAgIC8vICAgICB0aGlzLl9maXJlLl9seUNvaW4uc2NyaXB0LnJlZnJlc2goZXZlbnQuY291bnQsZXZlbnQucG9zaXRpb24pO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvL+WHhuWkh+W8gOWni1xyXG4gICAgX3ByZXBhcmUoZXZlbnQpe1xyXG4gICAgICAgIGlmICh0aGlzLl9uZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25EaXNjb25uZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPSAwO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLHttb2RlOlwiY2hhcmdlXCJ9KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDmuIXnqbrlnLrmma9cclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuY2xlYW5NYXAoKTsgIFxyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl90b2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGFydENvdW50Kys7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0Q291bnQgPj0zKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKEluc2VydEFkLmdldEluc3RhbmNlKCkuaXNMb2FkKCkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3N0YXJ0Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgSW5zZXJ0QWQuZ2V0SW5zdGFuY2UoKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfdXBkYXRlTXNnKGV2ZW50KXtcclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PSAnaW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC50eXBlID09ICdvdXQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+aMiemSrlxyXG4gICAgX29uU3RhcnRDbGljaygpe1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLHttb2RlOlwiY2hhcmdlXCJ9KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuXHJcbiAgICAgICAgLy/pmpDol4/lvIDlp4vmjInpkq5cclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl9hZERlZmVuc2Uuc2NyaXB0LnNldEFEKDMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2FkQnVsbGV0LnNjcmlwdC5zZXRBRCgyKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9hZExpZmUuc2NyaXB0LnNldEFEKDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOW8gOWni+a4uOaIj1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90b2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3ByZURlZmVuc2Uuc2NyaXB0LmVtaXRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fcHJlQnVsbGV0LnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5oyJ6ZKuXHJcbiAgICBvblNldHRpbmdDbGljaygpe1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIFV0aWxzLnNob3dEaWFsb2dzKHRoaXMuc2V0dGluZ1ByZWZhYik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v54K55Ye75pi+56S66L2s55uY5oyJ6ZKuXHJcbiAgICBvbldpc2hCdG5DbGljaygpe1xyXG4gICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50KCdlbnRlcl93aXNoJyk7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7ICAgIC8v5oyJ6ZKu6Z+z5pWIXHJcbiAgICAgICAgVXRpbHMuc2hvd0RpYWxvZ3ModGhpcy53aXNoUHJlZmFiKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dUZXN0UGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFRlc3RCdXR0b25WaWV3KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9idG5UZXN0LmdldENoaWxkQnlOYW1lKFwiX2xiVGVzdEJ0blwiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJUZXN0QnRuXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9idG5UZXN0O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSh0aGlzLl9maXJlLl9idG5UZXN0LndpZHRoLCB0aGlzLl9maXJlLl9idG5UZXN0LmhlaWdodCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLmtYtcIjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI4O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAzMjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgIH1cclxuXHJcbiAgICBfc2hvd1Rlc3RQYW5lbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGVzdFBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdGVzdFBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXN0UGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVsID0gbmV3IGNjLk5vZGUoXCJfdGVzdFBhbmVsXCIpO1xyXG4gICAgICAgIHBhbmVsLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBwYW5lbC5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDIwMDA7XHJcbiAgICAgICAgdGhpcy5fdGVzdFBhbmVsID0gcGFuZWw7XHJcblxyXG4gICAgICAgIGxldCBtYXNrID0gbmV3IGNjLk5vZGUoXCJfdGVzdE1hc2tcIik7XHJcbiAgICAgICAgbWFzay5wYXJlbnQgPSBwYW5lbDtcclxuICAgICAgICBtYXNrLnNldENvbnRlbnRTaXplKDEyODAsIDcyMCk7XHJcbiAgICAgICAgbGV0IG1hc2tHcmFwaGljcyA9IG1hc2suYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMTUwKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MucmVjdCgtNjQwLCAtMzYwLCAxMjgwLCA3MjApO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgbWFzay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX2hpZGVUZXN0UGFuZWwsIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgZGlhbG9nID0gbmV3IGNjLk5vZGUoXCJfdGVzdERpYWxvZ1wiKTtcclxuICAgICAgICBkaWFsb2cucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgZGlhbG9nLnNldENvbnRlbnRTaXplKDEwNjAsIDgyMCk7XHJcbiAgICAgICAgZGlhbG9nLnpJbmRleCA9IDE7XHJcbiAgICAgICAgbGV0IGRpYWxvZ0dyYXBoaWNzID0gZGlhbG9nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMzUsIDM2LCA0NSwgMjQ1KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTUzMCwgLTQxMCwgMTA2MCwgODIwLCAxOCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAxODApO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnJvdW5kUmVjdCgtNTMwLCAtNDEwLCAxMDYwLCA4MjAsIDE4KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBkaWFsb2cub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RMYWJlbChkaWFsb2csIFwiX2xiVGVzdFRpdGxlXCIsIFwi5rWL6K+V6Z2i5p2/XCIsIGNjLnYyKDAsIDI3NiksIDM0LCBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0TGFiZWwoZGlhbG9nLCBcIl9sYlRlc3RUaXBzXCIsIFwi5Lya5YWI6YeN572u5b2T5YmN5ri45oiP54q25oCB77yM5YaN6L+b5YWl5rWL6K+V5Zy65pmvXCIsIGNjLnYyKDAsIDIzNCksIDIyLCBjYy5jb2xvcigyMTAsIDIxMCwgMjIwLCAyNTUpKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbldpZHRoID0gMjIwO1xyXG4gICAgICAgIGxldCBidXR0b25IZWlnaHQgPSA1NDtcclxuICAgICAgICBsZXQgYnV0dG9uRm9udFNpemUgPSAyMjtcclxuICAgICAgICBsZXQgY29sdW1ucyA9IFstMzYwLCAtMTIwLCAxMjAsIDM2MF07XHJcbiAgICAgICAgbGV0IHJvd3MgPSBbMTQ0LCA3MiwgMCwgLTcyLCAtMTQ0LCAtMjE2XTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bktpbGxFZmZlY3RUZXN0XCIsIFwi5Ye75p2A5pWI5p6c5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbMF0pLCBjYy5jb2xvcigyNTUsIDkwLCA3MCwgMjU1KSwgdGhpcy5fb25LaWxsVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkhpdFRlc3RcIiwgXCLlj5flh7vmlYjmnpzmtYvor5VcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1swXSksIGNjLmNvbG9yKDgwLCAxODAsIDI1NSwgMjU1KSwgdGhpcy5fb25IaXRUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuVXBncmFkZVRlc3RcIiwgXCLljYfnuqfmtYvor5VcIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1swXSksIGNjLmNvbG9yKDExNSwgMjU1LCAxNzAsIDI1NSksIHRoaXMuX29uVXBncmFkZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5NdXRhdGlvblRlc3RcIiwgXCLlrZDlvLnotKjlj5jmtYvor5VcIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1swXSksIGNjLmNvbG9yKDI1NSwgMTIwLCAyMTAsIDI1NSksIHRoaXMuX29uQnVsbGV0TXV0YXRpb25UZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNob290RWZmZWN0VGVzdFwiLCBcIuWtkOW8ueWwhOWHu+a1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzFdKSwgY2MuY29sb3IoMjU1LCAyMDUsIDkwLCAyNTUpLCB0aGlzLl9vblNob290RWZmZWN0VGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blBsYXllckxvd0hwVGVzdFwiLCBcIuiHquW3seihgOmHj+WRiuaApVwiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzFdKSwgY2MuY29sb3IoMjU1LCAxMTAsIDExMCwgMjU1KSwgdGhpcy5fb25QbGF5ZXJMb3dIcFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5FbmVteUxvd0hwVGVzdFwiLCBcIuaVjOS6uuihgOmHj+WRiuaApVwiLCBjYy52Mihjb2x1bW5zWzJdLCByb3dzWzFdKSwgY2MuY29sb3IoMjU1LCAxNjUsIDcwLCAyNTUpLCB0aGlzLl9vbkVuZW15TG93SHBUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuS2lsbEJyb2FkY2FzdFRlc3RcIiwgXCLlh7vmnYDlub/mkq1cIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1sxXSksIGNjLmNvbG9yKDE3NSwgMTIwLCAyNTUsIDI1NSksIHRoaXMuX29uS2lsbEJyb2FkY2FzdFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuU2FjcmlmaWNlVGVzdFwiLCBcIueMruelrea1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzJdKSwgY2MuY29sb3IoMjU1LCA5MiwgOTIsIDI1NSksIHRoaXMuX29uU2FjcmlmaWNlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blBvcnRhbFRlc3RcIiwgXCLkvKDpgIHpl6jmtYvor5VcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1syXSksIGNjLmNvbG9yKDExMCwgMjU1LCAyNDUsIDI1NSksIHRoaXMuX29uUG9ydGFsVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkNlbnRyaWZ1Z2FsUmluZ1Rlc3RcIiwgXCLnprvlv4PlipvlnIjmtYvor5VcIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1syXSksIGNjLmNvbG9yKDI1NSwgMTYwLCA5MCwgMjU1KSwgdGhpcy5fb25DZW50cmlmdWdhbFJpbmdUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuT2lsU3BpbGxUZXN0XCIsIFwi54Sm5rK55by55rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMl0pLCBjYy5jb2xvcigxNjUsIDExOCwgNzIsIDI1NSksIHRoaXMuX29uT2lsU3BpbGxUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkVuZXJneUVnZ1Rlc3RcIiwgXCLog73ph4/om4vmlLbol49cIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1szXSksIGNjLmNvbG9yKDEyNiwgMjMyLCAxNDMsIDI1NSksIHRoaXMuX29uRW5lcmd5RWdnVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkNvdmVyVGVzdFwiLCBcIuaOqeS9k+a1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzNdKSwgY2MuY29sb3IoMTk5LCAxNTEsIDk2LCAyNTUpLCB0aGlzLl9vbkNvdmVyVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkNsb3NlVGVzdFwiLCBcIuWFs+mXrVwiLCBjYy52Mihjb2x1bW5zWzJdLCByb3dzWzNdKSwgY2MuY29sb3IoMTgwLCAxODAsIDE5MCwgMjU1KSwgdGhpcy5faGlkZVRlc3RQYW5lbCwgMTgwLCA0OCwgMjQpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5EYW1hZ2VEb3VibGVUZXN0XCIsIFwi5Lyk5a6z57+75YCN5Yy65Z+fXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbM10pLCBjYy5jb2xvcigyNTUsIDUwLCA1MCwgMjU1KSwgdGhpcy5fb25EYW1hZ2VEb3VibGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuU3BlZWREb3VibGVUZXN0XCIsIFwi6YCf5bqm57+75YCN5Yy65Z+fXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbNF0pLCBjYy5jb2xvcig1MCwgMTUwLCAyNTUsIDI1NSksIHRoaXMuX29uU3BlZWREb3VibGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuU3ByZWFkQnVsbGV0VGVzdFwiLCBcIuWtkOW8ueaJqeaVo+WMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzRdKSwgY2MuY29sb3IoNTAsIDIzMCwgMTAwLCAyNTUpLCB0aGlzLl9vblNwcmVhZEJ1bGxldFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Cb3VuY2VPYnN0YWNsZVRlc3RcIiwgXCLlrZDlvLnlj43lvLnpmpznoo1cIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1s0XSksIGNjLmNvbG9yKDI1NSwgMTAwLCAyMDAsIDI1NSksIHRoaXMuX29uQm91bmNlT2JzdGFjbGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQmxhY2tIb2xlVGVzdFwiLCBcIum7kea0nuWMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzRdKSwgY2MuY29sb3IoMTIwLCA0MCwgMTgwLCAyNTUpLCB0aGlzLl9vbkJsYWNrSG9sZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DbHVzdGVyQm9tYlRlc3RcIiwgXCLpm4bmnZ/ngrjlvLlcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1s1XSksIGNjLmNvbG9yKDIyMCwgMTYwLCA0MCwgMjU1KSwgdGhpcy5fb25DbHVzdGVyQm9tYlRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5NdWx0aXBsYXllclRlc3RcIiwgXCLogZTmnLrlr7nmiJhcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1s1XSksIGNjLmNvbG9yKDYwLCAyMjAsIDI1NSwgMjU1KSwgdGhpcy5fb25NdWx0aXBsYXllclRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVUZXN0TGFiZWwocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIGZvbnRTaXplLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg0MjAsIDQyKTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjb2xvcjtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSBmb250U2l6ZSArIDY7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVGVzdEJ1dHRvbihwYXJlbnQsIG5hbWUsIHRleHQsIHBvcywgc3Ryb2tlQ29sb3IsIGhhbmRsZXIsIHdpZHRoID0gMjYwLCBoZWlnaHQgPSA1OCwgZm9udFNpemUgPSAyOCkge1xyXG4gICAgICAgIGxldCBidG4gPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBidG4ucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGJ0bi5zZXRDb250ZW50U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBidG4uc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBidG4uekluZGV4ID0gMTAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidG4uYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig0OCwgNDgsIDU1LCAyMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gc3Ryb2tlQ29sb3I7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0LCAxMik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShuYW1lICsgXCJMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYnRuO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gZm9udFNpemU7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IGZvbnRTaXplICsgNDtcclxuICAgICAgICAvLyBsYWJlbC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93LlNIUklOSztcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgYnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgaGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGJ0bjtcclxuICAgIH1cclxuXHJcbiAgICBfb25LaWxsVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImtpbGxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uSGl0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImhpdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25VcGdyYWRlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInVwZ3JhZGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQnVsbGV0TXV0YXRpb25UZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwibXV0YXRpb25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU2hvb3RFZmZlY3RUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwic2hvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uUGxheWVyTG93SHBUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwicGxheWVyTG93SHBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uRW5lbXlMb3dIcFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJlbmVteUxvd0hwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbktpbGxCcm9hZGNhc3RUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwia2lsbEJyb2FkY2FzdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Qb3J0YWxUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwicG9ydGFsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkNlbnRyaWZ1Z2FsUmluZ1Rlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJjZW50cmlmdWdhbFJpbmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU2FjcmlmaWNlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNhY3JpZmljZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25PaWxTcGlsbFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJvaWxTcGlsbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Db3ZlclRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJjb3ZlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25FbmVyZ3lFZ2dUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiZW5lcmd5RWdnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkRhbWFnZURvdWJsZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJkYW1hZ2VEb3VibGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU3BlZWREb3VibGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwic3BlZWREb3VibGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU3ByZWFkQnVsbGV0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNwcmVhZEJ1bGxldFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Cb3VuY2VPYnN0YWNsZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJib3VuY2VPYnN0YWNsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25CbGFja0hvbGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiYmxhY2tIb2xlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkNsdXN0ZXJCb21iVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImNsdXN0ZXJCb21iXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk11bHRpcGxheWVyVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faGlkZVRlc3RQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0TXVsdGlwbGF5ZXJHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0VGVzdEdhbWUodHlwZSkge1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVUZXN0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9yZXNldEdhbWVCZWZvcmVUZXN0KCk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIix7dmlzaWJsZTp0eXBlID09IFwic2FjcmlmaWNlXCJ9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLHttb2RlOlwiY2hhcmdlXCJ9KTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb21wbGV0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3VpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJraWxsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0S2lsbEVmZmVjdFRlc3RHYW1lKGNvbXBsZXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInVwZ3JhZGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zaG93VXBncmFkZUNob2ljZVBhbmVsKFwidXBncmFkZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJtdXRhdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3Nob3dVcGdyYWRlQ2hvaWNlUGFuZWwoXCJtdXRhdGlvblwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJzaG9vdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFNob290RWZmZWN0VGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwicGxheWVyTG93SHBcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gc2VsZi5fZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllciAmJiBwbGF5ZXIuc2NyaXB0ICYmIHBsYXllci5zY3JpcHQuZGVidWdTZXRMb3dIcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5zY3JpcHQuZGVidWdTZXRMb3dIcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImVuZW15TG93SHBcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jcmVhdGVMb3dIcFRlc3RFbmVteSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jcmVhdGVMb3dIcFRlc3RFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInNhY3JpZmljZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJraWxsQnJvYWRjYXN0XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0S2lsbEJyb2FkY2FzdFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInBvcnRhbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFBvcnRhbFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImNlbnRyaWZ1Z2FsUmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENlbnRyaWZ1Z2FsUmluZ1Rlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcIm9pbFNwaWxsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RpbGVkICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuc3Bhd25PaWxUZXN0UGlja3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LnNwYXduT2lsVGVzdFBpY2t1cCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImNvdmVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0Q292ZXJUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJlbmVyZ3lFZ2dcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRFbmVyZ3lFZ2dUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJkYW1hZ2VEb3VibGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnREYW1hZ2VEb3VibGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJzcGVlZERvdWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFNwZWVkRG91YmxlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic3ByZWFkQnVsbGV0XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0U3ByZWFkQnVsbGV0VGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiYm91bmNlT2JzdGFjbGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRCb3VuY2VPYnN0YWNsZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImJsYWNrSG9sZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEJsYWNrSG9sZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImNsdXN0ZXJCb21iXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0Q2x1c3RlckJvbWJUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFBsYXllckhpdFRlc3RHYW1lKGNvbXBsZXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0R2FtZUJlZm9yZVRlc3QoKSB7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl90aWxlZCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmNsZWFuTWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOmNjLnYyKDAsIDEpLCByYXRpbzowfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIse30pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVUZXN0UGFuZWwoZXZlbnQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveVRlc3RQYW5lbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGVzdFBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdGVzdFBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXN0UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90ZXN0UGFuZWwgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDdXJyZW50UGxheWVyKCkge1xyXG4gICAgICAgIGxldCB0aWxlZCA9IHRoaXMuX2ZpcmUuX3RpbGVkO1xyXG4gICAgICAgIGlmICghdGlsZWQgfHwgIXRpbGVkLnNjcmlwdCB8fCAhdGlsZWQuc2NyaXB0Ll9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGlsZWQuc2NyaXB0Ll9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGlsZWQuc2NyaXB0Ll9wbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dVcGdyYWRlQ2hvaWNlUGFuZWwobW9kZSA9IFwidXBncmFkZVwiKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX2dldEN1cnJlbnRQbGF5ZXIoKTtcclxuICAgICAgICBpZiAoIXBsYXllcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kZXN0cm95VXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZU1vZGUgPSBtb2RlO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiZ2FtZS1wYXVzZVwiLHt9KTtcclxuXHJcbiAgICAgICAgbGV0IHBhbmVsID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUNob2ljZVBhbmVsXCIpO1xyXG4gICAgICAgIHBhbmVsLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBwYW5lbC5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDIxMDA7XHJcbiAgICAgICAgcGFuZWwuYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCA9IHBhbmVsO1xyXG5cclxuICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VNYXNrXCIpO1xyXG4gICAgICAgIG1hc2sucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgbWFzay5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIGxldCBtYXNrR3JhcGhpY3MgPSBtYXNrLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDE2OCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLnJlY3QoLTY0MCwgLTM2MCwgMTI4MCwgNzIwKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgZGlhbG9nID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUNob2ljZURpYWxvZ1wiKTtcclxuICAgICAgICBkaWFsb2cucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgZGlhbG9nLnNldENvbnRlbnRTaXplKDk4MCwgNDMwKTtcclxuICAgICAgICBkaWFsb2cuekluZGV4ID0gMTtcclxuICAgICAgICBsZXQgZGlhbG9nR3JhcGhpY3MgPSBkaWFsb2cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyMiwgMjYsIDM4LCAyNDUpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnJvdW5kUmVjdCgtNDkwLCAtMjE1LCA5ODAsIDQzMCwgMjQpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMTIwKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTQ5MCwgLTIxNSwgOTgwLCA0MzAsIDI0KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBkaWFsb2cub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZSA9IG1vZGUgPT0gXCJtdXRhdGlvblwiID8gXCLpgInmi6nkuIDnp43lrZDlvLnotKjlj5hcIiA6IFwi6YCJ5oup5LiA6aG55Y2H57qnXCI7XHJcbiAgICAgICAgbGV0IHRpcHMgPSBtb2RlID09IFwibXV0YXRpb25cIiA/IFwiM+mAiTHvvIzpgInkuK3lkI7nq4vliLvmm7/mjaLlvZPliY3lrZDlvLlcIiA6IFwiM+mAiTHvvIznq4vljbPnlJ/mlYhcIjtcclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChkaWFsb2csIFwiX2xiVXBncmFkZVRpdGxlXCIsIHRpdGxlLCBjYy52MigwLCAxNjApLCAzNiwgY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwoZGlhbG9nLCBcIl9sYlVwZ3JhZGVUaXBzXCIsIHRpcHMsIGNjLnYyKDAsIDExOCksIDIyLCBjYy5jb2xvcigyMDAsIDIxMCwgMjI1LCAyNTUpKTtcclxuXHJcbiAgICAgICAgbGV0IGNob2ljZXMgPSBtb2RlID09IFwibXV0YXRpb25cIlxyXG4gICAgICAgICAgICA/IHBsYXllci5zY3JpcHQuZ2V0VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlcygpXHJcbiAgICAgICAgICAgIDogcGxheWVyLnNjcmlwdC5nZXRUZXN0VXBncmFkZUNob2ljZXMoKTtcclxuICAgICAgICBsZXQgc3RhcnRYID0gLTI4MDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNob2ljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLl9jcmVhdGVVcGdyYWRlQ2hvaWNlQ2FyZChkaWFsb2csIGNob2ljZXNbaV0sIGNjLnYyKHN0YXJ0WCArIGkgKiAyODAsIC0xMCkpO1xyXG4gICAgICAgICAgICBjYXJkLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBjYXJkLnNjYWxlWCA9IDAuMDU7XHJcbiAgICAgICAgICAgIGNhcmQuc2NhbGVZID0gMC45MjtcclxuICAgICAgICAgICAgY2FyZC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoaSAqIDAuMDUpLFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMDgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4xMiwgMS4wNilcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDcsIDAuOTYsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA2LCAxLjAzLCAwLjk5KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNSwgMSwgMSlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChwYXJlbnQsIG5hbWUsIHRleHQsIHBvcywgZm9udFNpemUsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDcwMCwgZm9udFNpemUgKyAxMCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSBmb250U2l6ZSArIDQ7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVXBncmFkZUNob2ljZUNhcmQocGFyZW50LCBjaG9pY2UsIHBvcykge1xyXG4gICAgICAgIGxldCBjYXJkID0gbmV3IGNjLk5vZGUoXCJfY2FyZF9cIiArIGNob2ljZS5pZCk7XHJcbiAgICAgICAgY2FyZC5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgY2FyZC5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGNhcmQuc2V0Q29udGVudFNpemUoMjQwLCAyNzApO1xyXG4gICAgICAgIGNhcmRbXCJfX3VwZ3JhZGVDaG9pY2VcIl0gPSBjaG9pY2U7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGNhcmQuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigzOCwgNDMsIDU4LCAyNDUpO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtMTIwLCAtMTM1LCAyNDAsIDI3MCwgMTgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtMTIwLCAtMTM1LCAyNDAsIDI3MCwgMTgpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gY2FyZDtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihjaG9pY2UuY29sb3IuciwgY2hvaWNlLmNvbG9yLmcsIGNob2ljZS5jb2xvci5iLCAzNCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLnJvdW5kUmVjdCgtMTEyLCAtMTI3LCAyMjQsIDI1NCwgMTYpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpY29uID0gbmV3IGNjLk5vZGUoXCJfY2FyZEljb25cIik7XHJcbiAgICAgICAgaWNvbi5wYXJlbnQgPSBjYXJkO1xyXG4gICAgICAgIGljb24uc2V0UG9zaXRpb24oMCwgNzQpO1xyXG4gICAgICAgIGxldCBpY29uR3JhcGhpY3MgPSBpY29uLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmZpbGxDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBpY29uR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDM0KTtcclxuICAgICAgICBpY29uR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmNpcmNsZSgwLCAwLCAzNCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbkxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRJY29uTGFiZWxcIik7XHJcbiAgICAgICAgaWNvbkxhYmVsTm9kZS5wYXJlbnQgPSBpY29uO1xyXG4gICAgICAgIGljb25MYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNzgsIDQwKTtcclxuICAgICAgICBsZXQgaWNvbkxhYmVsID0gaWNvbkxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGljb25MYWJlbC5zdHJpbmcgPSBjaG9pY2Uuc2hvcnRMYWJlbDtcclxuICAgICAgICBpY29uTGFiZWwuZm9udFNpemUgPSBjaG9pY2Uuc2hvcnRMYWJlbC5sZW5ndGggPiAyID8gMTggOiAyMjtcclxuICAgICAgICBpY29uTGFiZWwubGluZUhlaWdodCA9IDI0O1xyXG4gICAgICAgIGljb25MYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGljb25MYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGNhcmQsIFwiX2NhcmRUaXRsZVwiLCBjaG9pY2UudGl0bGUsIGNjLnYyKDAsIDE2KSwgMjgsIGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGNhcmQsIFwiX2NhcmRWYWx1ZVwiLCBjaG9pY2UudmFsdWVUZXh0LCBjYy52MigwLCAtMzQpLCA0MCwgY2hvaWNlLmNvbG9yKTtcclxuXHJcbiAgICAgICAgbGV0IGRlc2NOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2FyZERlc2NcIik7XHJcbiAgICAgICAgZGVzY05vZGUucGFyZW50ID0gY2FyZDtcclxuICAgICAgICBkZXNjTm9kZS5zZXRQb3NpdGlvbigwLCAtOTIpO1xyXG4gICAgICAgIGRlc2NOb2RlLnNldENvbnRlbnRTaXplKDE5MCwgNTYpO1xyXG4gICAgICAgIGRlc2NOb2RlLmNvbG9yID0gY2MuY29sb3IoMjAwLCAyMTAsIDIyNSwgMjIwKTtcclxuICAgICAgICBsZXQgZGVzY0xhYmVsID0gZGVzY05vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBkZXNjTGFiZWwuc3RyaW5nID0gY2hvaWNlLmRlc2M7XHJcbiAgICAgICAgZGVzY0xhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgZGVzY0xhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBkZXNjTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBkZXNjTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBjYXJkLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25VcGdyYWRlQ2hvaWNlU2VsZWN0LCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gY2FyZDtcclxuICAgIH1cclxuXHJcbiAgICBfb25VcGdyYWRlQ2hvaWNlU2VsZWN0KGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYXJkID0gZXZlbnQgPyBldmVudC5jdXJyZW50VGFyZ2V0IDogbnVsbDtcclxuICAgICAgICBsZXQgY2hvaWNlID0gY2FyZCA/IGNhcmRbXCJfX3VwZ3JhZGVDaG9pY2VcIl0gOiBudWxsO1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIXBsYXllciB8fCAhcGxheWVyLnNjcmlwdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuTFVwXCIpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwoKTtcclxuICAgICAgICBpZiAodGhpcy5fdXBncmFkZUNob2ljZU1vZGUgPT0gXCJtdXRhdGlvblwiICYmIHBsYXllci5zY3JpcHQuYXBwbHlUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2UpIHtcclxuICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5hcHBseVRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZShjaG9pY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LmFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwocmVzdW1lR2FtZSA9IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgICAgIGlmIChyZXN1bWVHYW1lKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiZ2FtZS1yZXN1bWVcIix7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95VXBncmFkZUNob2ljZVBhbmVsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZU1vZGUgPSBcInVwZ3JhZGVcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tIOWkmuS6uuaooeW8jyAtLS0tLS0tLS0tXHJcbiAgICBfc2hvd011bHRpcGxheWVyU3RhdHVzKHRleHQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMgJiYgY2MuaXNWYWxpZCh0aGlzLl9tdWx0aXBsYXllclN0YXR1cykpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoXCJfbXVsdGlwbGF5ZXJTdGF0dXNcIik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52MigwLCAyMDApKTtcclxuICAgICAgICBub2RlLnNldENvbnRlbnRTaXplKDYwMCwgNjApO1xyXG4gICAgICAgIG5vZGUuekluZGV4ID0gMzAwMDtcclxuICAgICAgICBsZXQgbGFiZWwgPSBub2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDMyO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSA0MDtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBub2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDEwMCwgMjU1KTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclN0YXR1cyA9IG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVNdWx0aXBsYXllclN0YXR1cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMgJiYgY2MuaXNWYWxpZCh0aGlzLl9tdWx0aXBsYXllclN0YXR1cykpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclN0YXR1cyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJIaXRSZXBvcnQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCAhZXZlbnQuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogZXZlbnQuaWQsXHJcbiAgICAgICAgICAgIHRnaWQ6IGV2ZW50LnRnaWQsXHJcbiAgICAgICAgICAgIGhwOiBldmVudC5ocCA9PSBudWxsID8gLTEgOiBldmVudC5ocCxcclxuICAgICAgICAgICAgZGFtYWdlOiBldmVudC5kYW1hZ2UgPT0gbnVsbCA/IC0xIDogZXZlbnQuZGFtYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9uZXh0TXVsdGlwbGF5ZXJCdWxsZXRJZCgpIHtcclxuICAgICAgICBsZXQgcGxheWVySWQgPSB0aGlzLl9uZXRNYW5hZ2VyID8gdGhpcy5fbmV0TWFuYWdlci5wbGF5ZXJJZCA6IDA7XHJcbiAgICAgICAgbGV0IGlkID0gcGxheWVySWQgKyBcIl9cIiArIHRoaXMuX211bHRpcGxheWVyRmlyZVNlcTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckZpcmVTZXErKztcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEN1cnJlbnRQbGF5ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBfYnVpbGRNdWx0aXBsYXllckZpcmVDb21tYW5kKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRMb2NhbE11bHRpcGxheWVyUGxheWVyKCk7XHJcbiAgICAgICAgbGV0IGZpcmVUeXBlID0gMTtcclxuICAgICAgICBpZiAocGxheWVyICYmIHBsYXllci5zY3JpcHQgJiYgcGxheWVyLnNjcmlwdC5nZXRNdWx0aXBsYXllckZpcmVUeXBlKSB7XHJcbiAgICAgICAgICAgIGZpcmVUeXBlID0gcGxheWVyLnNjcmlwdC5nZXRNdWx0aXBsYXllckZpcmVUeXBlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLl9uZXh0TXVsdGlwbGF5ZXJCdWxsZXRJZCgpLFxyXG4gICAgICAgICAgICB0eXBlOiBmaXJlVHlwZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEZWZhdWx0TXVsdGlwbGF5ZXJJbnB1dHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdXA6IGZhbHNlLFxyXG4gICAgICAgICAgICBkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgICAgICAgICAgZmlyZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBpY2t1cEVuZXJneUlkOiBudWxsLFxyXG4gICAgICAgICAgICBwaWNrdXBUYXJJZDogbnVsbCxcclxuICAgICAgICAgICAgdGhyb3dUYXI6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMgPSB0aGlzLl9jcmVhdGVEZWZhdWx0TXVsdGlwbGF5ZXJJbnB1dHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySW5wdXRzLnBpY2t1cEVuZXJneUlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMucGlja3VwRW5lcmd5SWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMucGlja3VwVGFySWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllcklucHV0cy5waWNrdXBUYXJJZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllcklucHV0cy50aHJvd1RhciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzLnRocm93VGFyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsYXllcklucHV0cztcclxuICAgIH1cclxuXHJcbiAgICBfY2xlYXJNdWx0aXBsYXllck9uZVNob3RJbnB1dHMoKSB7XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHRoaXMuX2Vuc3VyZU11bHRpcGxheWVySW5wdXRzKCk7XHJcbiAgICAgICAgaW5wdXRzLmZpcmUgPSBmYWxzZTtcclxuICAgICAgICBpbnB1dHMuaGl0ID0gZmFsc2U7XHJcbiAgICAgICAgaW5wdXRzLnBpY2t1cEVuZXJneUlkID0gbnVsbDtcclxuICAgICAgICBpbnB1dHMucGlja3VwVGFySWQgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0LS07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRzLnRocm93VGFyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaW5wdXRzLnRocm93VGFyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9mbHVzaE11bHRpcGxheWVySW5wdXRzTm93KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgfHwgIXRoaXMuX25ldE1hbmFnZXIgfHwgIXRoaXMuX25ldE1hbmFnZXIuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5zZW5kSW5wdXQodGhpcy5fYnVpbGRNdWx0aXBsYXllcklucHV0UGFja2V0KCkpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyTXVsdGlwbGF5ZXJPbmVTaG90SW5wdXRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkTXVsdGlwbGF5ZXJJbnB1dFBhY2tldCgpIHtcclxuICAgICAgICBsZXQgc291cmNlID0gdGhpcy5fZW5zdXJlTXVsdGlwbGF5ZXJJbnB1dHMoKTtcclxuICAgICAgICBsZXQgaGl0ID0gdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZS5sZW5ndGggPiAwID8gdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZS5zaGlmdCgpIDogZmFsc2U7XHJcbiAgICAgICAgbGV0IGJ1bGxldEV2ZW50cyA9IHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgID8gdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlLnNwbGljZSgwLCB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUubGVuZ3RoKVxyXG4gICAgICAgICAgICA6IFtdO1xyXG4gICAgICAgIGxldCBwaWNrdXBFbmVyZ3lJZCA9IHNvdXJjZS5waWNrdXBFbmVyZ3lJZCA9PSBudWxsID8gbnVsbCA6IHNvdXJjZS5waWNrdXBFbmVyZ3lJZDtcclxuICAgICAgICBsZXQgcGlja3VwVGFySWQgPSBzb3VyY2UucGlja3VwVGFySWQgPT0gbnVsbCA/IG51bGwgOiBzb3VyY2UucGlja3VwVGFySWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdXA6ICEhc291cmNlLnVwLFxyXG4gICAgICAgICAgICBkb3duOiAhIXNvdXJjZS5kb3duLFxyXG4gICAgICAgICAgICBsZWZ0OiAhIXNvdXJjZS5sZWZ0LFxyXG4gICAgICAgICAgICByaWdodDogISFzb3VyY2UucmlnaHQsXHJcbiAgICAgICAgICAgIGZpcmU6IHNvdXJjZS5maXJlID8gc291cmNlLmZpcmUgOiBmYWxzZSxcclxuICAgICAgICAgICAgaGl0OiBoaXQgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGJ1bGxldEV2ZW50czogYnVsbGV0RXZlbnRzLFxyXG4gICAgICAgICAgICBwaWNrdXBFbmVyZ3lJZDogcGlja3VwRW5lcmd5SWQsXHJcbiAgICAgICAgICAgIHBpY2t1cFRhcklkOiBwaWNrdXBUYXJJZCxcclxuICAgICAgICAgICAgdGhyb3dUYXI6IHNvdXJjZS50aHJvd1RhciA/IHNvdXJjZS50aHJvd1RhciA6IGZhbHNlLFxyXG4gICAgICAgICAgICBwbGF5ZXJTbmFwc2hvdDogdGhpcy5fYnVpbGRMb2NhbE11bHRpcGxheWVyUGxheWVyU25hcHNob3QoKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXJTbmFwc2hvdCgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0TG9jYWxNdWx0aXBsYXllclBsYXllcigpO1xyXG4gICAgICAgIGlmICghcGxheWVyIHx8ICFwbGF5ZXIuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpciA9IHBsYXllci5zY3JpcHQuX2RpciAmJiBwbGF5ZXIuc2NyaXB0Ll9kaXIubWFnU3FyKCkgPiAwXHJcbiAgICAgICAgICAgID8gY2MudjIocGxheWVyLnNjcmlwdC5fZGlyKS5ub3JtYWxpemUoKVxyXG4gICAgICAgICAgICA6IGNjLnYyKDEsIDApO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IE1hdGgucm91bmQocGxheWVyLngpLFxyXG4gICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHBsYXllci55KSxcclxuICAgICAgICAgICAgZGlyWDogTnVtYmVyKGRpci54LnRvRml4ZWQoNCkpLFxyXG4gICAgICAgICAgICBkaXJZOiBOdW1iZXIoZGlyLnkudG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgIHNwZWVkOiBOdW1iZXIoKHBsYXllci5zY3JpcHQuX2N1cnJlbnRTcGVlZCB8fCAwKS50b0ZpeGVkKDMpKSxcclxuICAgICAgICAgICAgcmFkaXVzOiBwbGF5ZXIuc2NyaXB0LmdldFJhZGl1cyA/IHBsYXllci5zY3JpcHQuZ2V0UmFkaXVzKCkgOiAzOCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZE11bHRpcGxheWVyUGxheWVyU2V0dXAoKSB7XHJcbiAgICAgICAgbGV0IHRhbmtUeXBlID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2N1cnJlbnRfcGxheWVyX3R5cGVfXCIsMSk7XHJcbiAgICAgICAgbGV0IHBsYXllckxldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfcGxheWVyXyR7dGFua1R5cGV9X2AsIDEpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLlRhbmsgJiYgeXlwLmNvbmZpZy5UYW5rW3RhbmtUeXBlXSA/IHl5cC5jb25maWcuVGFua1t0YW5rVHlwZV0gOiB7fTtcclxuICAgICAgICBsZXQgZW5lcmd5U3Bhd25Qb2ludHMgPSBbXTtcclxuICAgICAgICBsZXQgbWFwQm91bmRzID0gbnVsbDtcclxuICAgICAgICBsZXQgc3Bhd25DYW5kaWRhdGVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fdGlsZWQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllckVuZXJneVNwYXduUG9pbnRzKSB7XHJcbiAgICAgICAgICAgIGVuZXJneVNwYXduUG9pbnRzID0gdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyRW5lcmd5U3Bhd25Qb2ludHMoNTEyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fdGlsZWQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllck1hcEJvdW5kcykge1xyXG4gICAgICAgICAgICBtYXBCb3VuZHMgPSB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJNYXBCb3VuZHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUgJiYgdGhpcy5fZmlyZS5fdGlsZWQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllclNwYXduQ2FuZGlkYXRlcykge1xyXG4gICAgICAgICAgICBzcGF3bkNhbmRpZGF0ZXMgPSB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJTcGF3bkNhbmRpZGF0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGFua1R5cGU6IHRhbmtUeXBlLFxyXG4gICAgICAgICAgICBwbGF5ZXJMZXZlbDogcGxheWVyTGV2ZWwsXHJcbiAgICAgICAgICAgIGJhc2VIcDogKGNvbmZpZy5IUCA9PSBudWxsID8gNTAgOiBjb25maWcuSFApICogKHBsYXllckxldmVsICsgMSksXHJcbiAgICAgICAgICAgIGJhc2VBdGs6IChjb25maWcuQVRLID09IG51bGwgPyA1IDogY29uZmlnLkFUSykgKiAocGxheWVyTGV2ZWwgKyAxKSxcclxuICAgICAgICAgICAgYmFzZVNwZWVkOiBjb25maWcuU3BlZWQgPT0gbnVsbCA/IDQgOiBjb25maWcuU3BlZWQsXHJcbiAgICAgICAgICAgIGJhc2VBdHRhY2tSYWRpdXM6IGNvbmZpZy5BdHRhY2tSYWRpdXMgPT0gbnVsbCA/IDQyMCA6IGNvbmZpZy5BdHRhY2tSYWRpdXMsXHJcbiAgICAgICAgICAgIGVuZXJneVNwYXduUG9pbnRzOiBlbmVyZ3lTcGF3blBvaW50cyxcclxuICAgICAgICAgICAgbWFwQm91bmRzOiBtYXBCb3VuZHMsXHJcbiAgICAgICAgICAgIHNwYXduQ2FuZGlkYXRlczogc3Bhd25DYW5kaWRhdGVzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJQbGF5ZXJEZWF0aChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgIWV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LmlzTG9jYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJMb2NhbERlYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLkvaDlt7Looqvmt5jmsbDvvIznrYnlvoXmnKzlsYDnu5PnrpcuLi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9vbk11bHRpcGxheWVyRW5lcmd5UGlja3VwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSB8fCB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCB8fCAhZXZlbnQgfHwgZXZlbnQuZW5lcmd5SWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbnB1dHMgPSB0aGlzLl9lbnN1cmVNdWx0aXBsYXllcklucHV0cygpO1xyXG4gICAgICAgIGlucHV0cy5waWNrdXBFbmVyZ3lJZCA9IGV2ZW50LmVuZXJneUlkO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk11bHRpcGxheWVyVGFyUGlja3VwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSB8fCB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCB8fCAhZXZlbnQgfHwgZXZlbnQucGlja3VwSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbnB1dHMgPSB0aGlzLl9lbnN1cmVNdWx0aXBsYXllcklucHV0cygpO1xyXG4gICAgICAgIGlucHV0cy5waWNrdXBUYXJJZCA9IGV2ZW50LnBpY2t1cElkO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk11bHRpcGxheWVyVGhyb3dUYXIoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbnB1dHMgPSB0aGlzLl9lbnN1cmVNdWx0aXBsYXllcklucHV0cygpO1xyXG4gICAgICAgIGlucHV0cy50aHJvd1RhciA9IHtcclxuICAgICAgICAgICAgeDogZXZlbnQueCxcclxuICAgICAgICAgICAgeTogZXZlbnQueSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPSA0O1xyXG4gICAgICAgIHRoaXMuX2ZsdXNoTXVsdGlwbGF5ZXJJbnB1dHNOb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25NdWx0aXBsYXllckJ1bGxldEV2ZW50KGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSB8fCB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCB8fCAhZXZlbnQgfHwgIWV2ZW50LnR5cGUgfHwgIWV2ZW50LmJ1bGxldElkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgICAgICAgICBidWxsZXRJZDogZXZlbnQuYnVsbGV0SWQsXHJcbiAgICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50LmV2ZW50SWQgPT0gbnVsbCA/IG51bGwgOiBldmVudC5ldmVudElkLFxyXG4gICAgICAgICAgICByZWFzb246IGV2ZW50LnJlYXNvbiB8fCBcIlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUubGVuZ3RoID4gMTIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlLnNwbGljZSgwLCB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUubGVuZ3RoIC0gMTIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTXVsdGlwbGF5ZXJTdGF0dXNGcm9tUm9vbVN0YXRlKHBheWxvYWQpIHtcclxuICAgICAgICBpZiAoIXBheWxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGF5bG9hZC5zdGF0ZSA9PSBcIndhaXRpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLnrYnlvoXnjqnlrrbliqDlhaUgKFwiICsgcGF5bG9hZC5wbGF5ZXJDb3VudCArIFwiL1wiICsgcGF5bG9hZC5taW5QbGF5ZXJzICsgXCItXCIgKyBwYXlsb2FkLm1heFBsYXllcnMgKyBcIilcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBheWxvYWQuc3RhdGUgPT0gXCJjb3VudGRvd25cIikge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmuLjmiI/lgJLorqHml7YgXCIgKyBwYXlsb2FkLmNvdW50ZG93biArIFwiIOenklwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGF5bG9hZC5zdGF0ZSA9PSBcImVuZGVkXCIgJiYgIXRoaXMuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuacrOWxgOW3sue7k+adn1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dNdWx0aXBsYXllckZpbmlzaChpc1dpbiwgd2lubmVyUGxheWVySWQpIHtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuc2NyaXB0LnJlZnJlc2hMZXZlbEluZm8oKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc2V0RmluaXNoKCk7XHJcblxyXG4gICAgICAgIGxldCBmaW5pc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmlzaFByZWZhYik7XHJcbiAgICAgICAgZmluaXNoLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgVXRpbHMuYWRkdG9DdXJyZW50U2NlbmUoZmluaXNoKTtcclxuICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLCBpc1dpbik7XHJcblxyXG4gICAgICAgIGlmICh3aW5uZXJQbGF5ZXJJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhpc1dpbiA/IFwi5L2g6I636IOc5LqGXCIgOiAoXCLnjqnlrrYgXCIgKyAod2lubmVyUGxheWVySWQgKyAxKSArIFwiIOiOt+iDnFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuacrOWxgOW5s+WxgFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2VuZE11bHRpcGxheWVyTWF0Y2gocGF5bG9hZCkge1xyXG4gICAgICAgIGxldCB3aW5uZXJQbGF5ZXJJZCA9IHBheWxvYWQgJiYgcGF5bG9hZC53aW5uZXJQbGF5ZXJJZCAhPSBudWxsID8gcGF5bG9hZC53aW5uZXJQbGF5ZXJJZCA6IC0xO1xyXG4gICAgICAgIGxldCBsb2NhbFBsYXllcklkID0gdGhpcy5fbmV0TWFuYWdlciA/IHRoaXMuX25ldE1hbmFnZXIucGxheWVySWQgOiAtMTtcclxuICAgICAgICBsZXQgaXNXaW4gPSB3aW5uZXJQbGF5ZXJJZCA+PSAwICYmIHdpbm5lclBsYXllcklkID09IGxvY2FsUGxheWVySWQ7XHJcblxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJCdWxsZXRFdmVudFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJUYXJUaHJvd1JlcGVhdCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkRpc2Nvbm5lY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllckZpbmlzaChpc1dpbiwgd2lubmVyUGxheWVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydE11bHRpcGxheWVyR2FtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmV0TWFuYWdlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uRGlzY29ubmVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySGl0UXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckJ1bGxldEV2ZW50UXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllclRhclRocm93UmVwZWF0ID0gMDtcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRHYW1lQmVmb3JlVGVzdCgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuato+WcqOi/nuaOpeacjeWKoeWZqCB3czovL2xvY2FsaG9zdDoyNTY3IC4uLlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG5ldyBOZXR3b3JrTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25Db3VudGRvd24gPSAoc2Vjb25kcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmuLjmiI/lgJLorqHml7YgXCIgKyBzZWNvbmRzICsgXCIg56eSXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vblBsYXllckNvdW50ID0gKGNvdW50LCBtYXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd011bHRpcGxheWVyU3RhdHVzKFwi5bey6L+e5o6l77yM562J5b6F546p5a62IChcIiArIGNvdW50ICsgXCIvXCIgKyBtYXggKyBcIilcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uUm9vbVN0YXRlID0gKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTXVsdGlwbGF5ZXJTdGF0dXNGcm9tUm9vbVN0YXRlKHBheWxvYWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkNvbm5lY3RlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuc2VuZFBsYXllclNldHVwKHRoaXMuX2J1aWxkTXVsdGlwbGF5ZXJQbGF5ZXJTZXR1cCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkdhbWVTdGFydCA9IChwbGF5ZXJJZCwgcGxheWVyQ291bnQsIHNwYXduU2xvdHMsIGVuZXJnaWVzLCBwbGF5ZXJzLCBzcGVjaWFsRXZlbnRzLCB0YXJQaWNrdXBzLCB0YXJTcGlsbHMsIHNhZmVab25lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0TXVsdGlwbGF5ZXJNYXRjaChwbGF5ZXJJZCwgcGxheWVyQ291bnQgfHwgMiwgc3Bhd25TbG90cyB8fCBbXSwgZW5lcmdpZXMgfHwgW10sIHBsYXllcnMgfHwgW10sIHNwZWNpYWxFdmVudHMgfHwgW10sIHRhclBpY2t1cHMgfHwgW10sIHRhclNwaWxscyB8fCBbXSwgc2FmZVpvbmUgfHwgbnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uR2FtZUVuZGVkID0gKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZW5kTXVsdGlwbGF5ZXJNYXRjaChwYXlsb2FkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25EaXNjb25uZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLov57mjqXmlq3lvIBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIuY29ubmVjdChcIndzOi8vbG9jYWxob3N0OjI1NjdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0TXVsdGlwbGF5ZXJNYXRjaChwbGF5ZXJJZCwgcGxheWVyQ291bnQsIHNwYXduU2xvdHMsIGVuZXJnaWVzLCBwbGF5ZXJzID0gW10sIHNwZWNpYWxFdmVudHMgPSBbXSwgdGFyUGlja3VwcyA9IFtdLCB0YXJTcGlsbHMgPSBbXSwgc2FmZVpvbmUgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVyU3RhdHVzKCk7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQnVsbGV0RXZlbnRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyVGFyVGhyb3dSZXBlYXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRmlyZVNlcSA9IDE7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMgPSB0aGlzLl9jcmVhdGVEZWZhdWx0TXVsdGlwbGF5ZXJJbnB1dHMoKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydE11bHRpcGxheWVyR2FtZShwbGF5ZXJDb3VudCB8fCAyLCBwbGF5ZXJJZCwgc3Bhd25TbG90cyB8fCBbXSwgZW5lcmdpZXMgfHwgW10sIHBsYXllcnMgfHwgW10sIHNwZWNpYWxFdmVudHMgfHwgW10sIHRhclBpY2t1cHMgfHwgW10sIHRhclNwaWxscyB8fCBbXSwgc2FmZVpvbmUgfHwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl91aS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLl9zZXR1cE11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZyh0aGlzLl9tdWx0aXBsYXllcklucHV0TG9vcFRhZyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySm95TW92ZUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImpveS1zdGlja1wiLCB0aGlzLl9tdWx0aXBsYXllckpveU1vdmVIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckpveVNob290SGFuZGxlcikge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiam95LXN0aWNrLXNob290XCIsIHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQ2FtZXJhRm9sbG93Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2V0dXBNdWx0aXBsYXllcklucHV0TG9vcCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG5cclxuICAgICAgICAvLyBUcmFjayBtb3ZlbWVudCB2aWEgam95LXN0aWNrIEVWRU5UIChmaXJlcyByYXRpbzowIG9uIHJlbGVhc2UsIHJlbGlhYmxlKVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySm95TW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLl9tdWx0aXBsYXllckFjdGl2ZSB8fCBzZWxmLl9tdWx0aXBsYXllckxvY2FsRGVhZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQucmF0aW8gPiAwICYmIGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy51cCA9IGV2ZW50LmRpci55ID4gMC4zO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJJbnB1dHMuZG93biA9IGV2ZW50LmRpci55IDwgLTAuMztcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmxlZnQgPSBldmVudC5kaXIueCA8IC0wLjM7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5yaWdodCA9IGV2ZW50LmRpci54ID4gMC4zO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmF0aW89PTAgbWVhbnMgZmluZ2VyIGxpZnRlZCDigJQgY2xlYXIgbW92ZW1lbnRcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5kb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5sZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5yaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJqb3ktc3RpY2tcIiwgdGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIFRyYWNrIGZpcmUgdmlhIGV2ZW50IChzaW5nbGUtc2hvdCBldmVudClcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckpveVNob290SGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX211bHRpcGxheWVyQWN0aXZlIHx8IHNlbGYuX211bHRpcGxheWVyTG9jYWxEZWFkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChldmVudC5maXJlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5maXJlID0gc2VsZi5fYnVpbGRNdWx0aXBsYXllckZpcmVDb21tYW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImpveS1zdGljay1zaG9vdFwiLCB0aGlzLl9tdWx0aXBsYXllckpveVNob290SGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIEZyYW1lIHN5bmM6IGxpc3RlbiBmb3IgZnJhbWUgZGF0YSBmcm9tIHNlcnZlclxyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25GcmFtZSA9IGZ1bmN0aW9uIChmcmFtZURhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLl9tdWx0aXBsYXllckFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zaW11bGF0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuc2ltdWxhdGVGcmFtZShmcmFtZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2VuZCBsb2NhbCBpbnB1dHMgYXQgdGljayByYXRlICgyMEh6KVxyXG4gICAgICAgIGxldCBpbnB1dExvb3AgPSBjYy5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxIC8gMjApLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgIXNlbGYuX25ldE1hbmFnZXIgfHwgIXNlbGYuX25ldE1hbmFnZXIuY29ubmVjdGVkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX211bHRpcGxheWVyTG9jYWxEZWFkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fbmV0TWFuYWdlci5zZW5kSW5wdXQoc2VsZi5fYnVpbGRNdWx0aXBsYXllcklucHV0UGFja2V0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFyTXVsdGlwbGF5ZXJPbmVTaG90SW5wdXRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbWVyYSBmb2xsb3dcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5fY2VudGVyT25Mb2NhbFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIGlucHV0TG9vcC5zZXRUYWcodGhpcy5fbXVsdGlwbGF5ZXJJbnB1dExvb3BUYWcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oaW5wdXRMb29wKTtcclxuXHJcbiAgICAgICAgLy8gU21vb3RoIGNhbWVyYSBmb2xsb3cgZXZlcnkgZnJhbWUgdmlhIHNjaGVkdWxlclxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQ2FtZXJhRm9sbG93Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RpbGVkICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0Ll9jZW50ZXJPbkxvY2FsUGxheWVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjaywgMC4wMTYsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH1cclxufVxyXG4iXX0=