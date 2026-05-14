
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
        yyp.eventCenter.on("multiplayer-player-death", this._onMultiplayerPlayerDeath, this);
        yyp.eventCenter.on("multiplayer-energy-pickup", this._onMultiplayerEnergyPickup, this);
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
        yyp.eventCenter.off("multiplayer-player-death", this._onMultiplayerPlayerDeath, this);
        yyp.eventCenter.off("multiplayer-energy-pickup", this._onMultiplayerEnergyPickup, this);
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
    GameMain.prototype._buildMultiplayerInputPacket = function () {
        var source = this._multiplayerInputs || {};
        var hit = this._multiplayerHitQueue.length > 0 ? this._multiplayerHitQueue.shift() : false;
        var pickupEnergyId = source.pickupEnergyId == null ? null : source.pickupEnergyId;
        return {
            up: !!source.up,
            down: !!source.down,
            left: !!source.left,
            right: !!source.right,
            fire: source.fire ? source.fire : false,
            hit: hit || false,
            pickupEnergyId: pickupEnergyId,
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
        if (!this._multiplayerInputs) {
            this._multiplayerInputs = { up: false, down: false, left: false, right: false, fire: false, hit: false };
        }
        this._multiplayerInputs.pickupEnergyId = event.energyId;
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
        this._netManager.onGameStart = function (playerId, playerCount, spawnSlots, energies, players) {
            _this._startMultiplayerMatch(playerId, playerCount || 2, spawnSlots || [], energies || [], players || []);
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
    GameMain.prototype._startMultiplayerMatch = function (playerId, playerCount, spawnSlots, energies, players) {
        if (players === void 0) { players = []; }
        this._hideMultiplayerStatus();
        this._multiplayerActive = true;
        this._multiplayerLocalDead = false;
        this._multiplayerHitQueue = [];
        this._multiplayerFireSeq = 1;
        this._multiplayerInputs = { up: false, down: false, left: false, right: false, fire: false, hit: false };
        var self = this;
        this._fire._tiled.script.startMultiplayerGame(playerCount || 2, playerId, spawnSlots || [], energies || [], players || [], function () {
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
            self._multiplayerInputs.fire = false;
            self._multiplayerInputs.hit = false;
            self._multiplayerInputs.pickupEnergyId = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsMkRBQTBEO0FBRTFELDRDQUF5QztBQUN6QywwQ0FBdUM7QUFDdkMsMENBQXVDO0FBRWpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFhO0lBQW5EO1FBQUEscUVBbXdDQztRQWh3Q0csa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsZ0JBQVUsR0FBZSxJQUFJLENBQUMsQ0FBSSxJQUFJO1FBR3RDLGtCQUFZLEdBQWUsSUFBSSxDQUFDLENBQUksSUFBSTtRQUV4QyxtQkFBbUI7UUFDbkIsY0FBUSxHQUFRLENBQUMsQ0FBQyxDQUFNLE1BQU07UUFFOUIsaUJBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIseUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLHdCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQixpQkFBVyxHQUFHLElBQUksQ0FBQyxDQUFTLFdBQVc7UUFDdkMsd0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUUsUUFBUTtRQUNwQyx3QkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxTQUFTO1FBQ3JDLDJCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5Qiw4QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFDaEMsd0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLDBCQUFvQixHQUFHLEVBQUUsQ0FBQztRQUMxQix5QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDeEIsZ0NBQTBCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGlD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RyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRCxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDckMsU0FBUyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVELFNBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzVELFNBQVMsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXhELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRyxJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJ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QUFDO1FBRS9CLGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsZ0NBQWdDLEdBQUc7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQUUsT0FBTztZQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDbkQ7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBL3ZDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNZO0lBWmYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW13QzVCO0lBQUQsZUFBQztDQW53Q0QsQUFtd0NDLENBbndDcUMsNkJBQWEsR0Ftd0NsRDtrQkFud0NvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtMb2NhbGl6ZWREYXRhfSBmcm9tIFwiLi9iYXNlL0xvY2FsaXplZERhdGFcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBOZXR3b3JrTWFuYWdlciB9IGZyb20gXCIuL25ldHdvcmsvTmV0d29ya01hbmFnZXJcIjtcclxuXHJcbmltcG9ydCB7QW5hbHl0aWNzfSBmcm9tIFwiLi9hZC9BbmFseXRpY3NcIjtcclxuaW1wb3J0IHtJbnNlcnRBZH0gZnJvbSBcIi4vYWQvSW5zZXJ0QWRcIjtcclxuaW1wb3J0IHtSZXdhcmRBZH0gZnJvbSBcIi4vYWQvUmV3YXJkQWRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1haW4gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKSBcclxuICAgIGZpbmlzaFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgc2V0dGluZ1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgd2lzaFByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHJldml2ZVByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgLy8gX2NzYiA6IGFueSA9IHt9O1xyXG4gICAgX2xldmVsSWQgICAgPSAgIDE7ICAgICAgLy/lvZPliY3lhbPljaFcclxuXHJcbiAgICBfc3RhcnRDb3VudCA9IDA7XHJcbiAgICBfdGVzdFBhbmVsID0gbnVsbDtcclxuICAgIF91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgX3VwZ3JhZGVDaG9pY2VNb2RlID0gXCJ1cGdyYWRlXCI7XHJcbiAgICBfbmV0TWFuYWdlciA9IG51bGw7ICAgICAgICAgLy/nvZHnu5znrqHnkIblmago5aSa5Lq6KVxyXG4gICAgX211bHRpcGxheWVyU3RhdHVzID0gbnVsbDsgIC8v6L+e5o6l54q25oCB5qCH562+XHJcbiAgICBfbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTsgLy/lpJrkurrmuLjmiI/ov5vooYzkuK1cclxuICAgIF9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgX211bHRpcGxheWVySW5wdXRMb29wVGFnID0gNzYwMTtcclxuICAgIF9tdWx0aXBsYXllcklucHV0cyA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJIaXRRdWV1ZSA9IFtdO1xyXG4gICAgX211bHRpcGxheWVyRmlyZVNlcSA9IDE7XHJcbiAgICBfbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlciA9IG51bGw7XHJcbiAgICBfbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIgPSBudWxsO1xyXG4gICAgX211bHRpcGxheWVyQ2FtZXJhRm9sbG93Q2FsbGJhY2sgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyWVUlcclxuICAgICAgICB0aGlzLl9pbml0VUkoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJbmjqXmlLbkuovku7ZcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMllVJXHJcbiAgICBfaW5pdFVJKCkge1xyXG4gICAgICAgIC8v6ZqQ6JeP5byA5aeL5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5eXAuc2FmZVRvcEJvdHRvbVwiLHl5cC5zYWZlVG9wQm90dG9tKVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J0blNldHRpbmcueSA9IHl5cC5zYWZlVG9wQm90dG9tLTMwO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J0blNldHRpbmcuekluZGV4ID0gMTAwMTtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fYnRuVGVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9idG5UZXN0LnkgPSB5eXAuc2FmZVRvcEJvdHRvbS0zMDtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuVGVzdC56SW5kZXggPSAxMDAxO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0VGVzdEJ1dHRvblZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICBVdGlscy5kb1FBY3Rpb24odGhpcy5fZmlyZS5fYnRuV2lzaCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcHJlRGVmZW5zZS5zY3JpcHQuc2V0SW5TdGFydCgzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQuc2NyaXB0LnNldEluU3RhcnQoMik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbmjqXmlLbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9uKCdjb25maWctbG9hZGVkJyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgLy/phY3nva7liqDovb3lrozmr5VcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2N1cnJlbnQtbGV2ZWxpZCcsdGhpcy5fdXBkYXRlTGV2ZWxpZCx0aGlzKTsgICAgICAgICAvL+W9k+WJjeWFs+WNoVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignY3VycmVudC1lbmVteWNvdW50Jyx0aGlzLl91cGRhdGVFbmVteUNvdW50LHRoaXMpOyAgIC8v5pWM5Lq65pWw6YePXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdwbGF5ZXItZGVhdGgnLHRoaXMuX3BsYXllckRlYXRoLHRoaXMpOyAgICAgICAgICAgICAgLy9wbGF5ZXLmrbvkuqFcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub24oJ2FkZC1jb2luJyx0aGlzLl9hZGRDb2luLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geWinuWKoFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigncmVzdGFydCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCd1cGRhdGUnLHRoaXMuX3VwZGF0ZU1zZyx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b5YWlL+mAgOWHuuWNh+e6p+eVjOmdolxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcInBsYXllci1yZXZpdmVcIix0aGlzLl9wbGF5ZXJSZXZpdmUsdGhpcyk7ICAgICAgICAgICAgIC8v5aSN5rS7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiZ2FtZS1wYXVzZVwiLHRoaXMuX2dhbWVQYXVzZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aaguWBnFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImdhbWUtcmVzdW1lXCIsdGhpcy5fZ2FtZVJlc3VtZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aBouWkjVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcIm11bHRpcGxheWVyLWhpdFwiLHRoaXMuX29uTXVsdGlwbGF5ZXJIaXRSZXBvcnQsdGhpcyk7IC8v5aSa5Lq65ZG95Lit5LiK5oqlXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwibXVsdGlwbGF5ZXItcGxheWVyLWRlYXRoXCIsIHRoaXMuX29uTXVsdGlwbGF5ZXJQbGF5ZXJEZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwibXVsdGlwbGF5ZXItZW5lcmd5LXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyRW5lcmd5UGlja3VwLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25TdGFydENsaWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjb25maWctbG9hZGVkJyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgLy/phY3nva7liqDovb3lrozmr5VcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjdXJyZW50LWxldmVsaWQnLHRoaXMuX3VwZGF0ZUxldmVsaWQsdGhpcyk7ICAgICAgICAgLy/lvZPliY3lhbPljaFcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjdXJyZW50LWVuZW15Y291bnQnLHRoaXMuX3VwZGF0ZUVuZW15Q291bnQsdGhpcyk7ICAgLy/mlYzkurrmlbDph49cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdwbGF5ZXItZGVhdGgnLHRoaXMuX3BsYXllckRlYXRoLHRoaXMpOyAgICAgICAgICAgICAgLy9wbGF5ZXLmrbvkuqFcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub2ZmKCdhZGQtY29pbicsdGhpcy5fYWRkQ29pbix0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdyZXN0YXJ0Jyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAgLy/ph43mlrDlvIDlp4tcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd1cGRhdGUnLHRoaXMuX3VwZGF0ZU1zZyx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b5YWlL+mAgOWHuuWNh+e6p+eVjOmdolxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJwbGF5ZXItcmV2aXZlXCIsdGhpcy5fcGxheWVyUmV2aXZlLHRoaXMpOyAgICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJnYW1lLXBhdXNlXCIsdGhpcy5fZ2FtZVBhdXNlLHRoaXMpOyAgICAgICAgICAgICAgICAgIC8v5pqC5YGcXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImdhbWUtcmVzdW1lXCIsdGhpcy5fZ2FtZVJlc3VtZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aBouWkjVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1oaXRcIix0aGlzLl9vbk11bHRpcGxheWVySGl0UmVwb3J0LHRoaXMpOyAvL+WkmuS6uuWRveS4reS4iuaKpVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJtdWx0aXBsYXllci1wbGF5ZXItZGVhdGhcIiwgdGhpcy5fb25NdWx0aXBsYXllclBsYXllckRlYXRoLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwibXVsdGlwbGF5ZXItZW5lcmd5LXBpY2t1cFwiLCB0aGlzLl9vbk11bHRpcGxheWVyRW5lcmd5UGlja3VwLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVRlc3RQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lVcGdyYWRlQ2hvaWNlUGFuZWwoKTtcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOW9k+WJjeWFs+WNoVxyXG4gICAgX3VwZGF0ZUxldmVsaWQoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBldmVudC5sZXZlbGlkO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiTGV2ZWwuJExhYmVsLnN0cmluZyA9IFwiTGV2ZWw6XCIgKyBldmVudC5sZXZlbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaVjOS6uuaVsOmHj1xyXG4gICAgX3VwZGF0ZUVuZW15Q291bnQoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiRW5lbXkuJExhYmVsLnN0cmluZyA9IGV2ZW50LmVuZW15Y291bnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5pc1Rlc3RNb2RlICYmIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5pc1Rlc3RNb2RlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuZW5lbXljb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9sZXZlbDFfXCIsIHRoaXMuX2xldmVsSWQgKyAxKTtcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwid2luISEhISEhISEhISFcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuc2NyaXB0LnJlZnJlc2hMZXZlbEluZm8oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zZXRGaW5pc2goKTtcclxuXHJcbiAgICAgICAgICAgIC8v5pi+56S66IOc5Yip55WM6Z2iXHJcbiAgICAgICAgICAgIGxldCBmaW5pc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmlzaFByZWZhYik7XHJcbiAgICAgICAgICAgIGZpbmlzaC56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShmaW5pc2gpO1xyXG4gICAgICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDnjqnlrrbmrbvkuqFcclxuICAgIF9wbGF5ZXJEZWF0aChldmVudCl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiZmFpbGVkISEhISEhISEhISFcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChSZXdhcmRBZC5nZXRJbnN0YW5jZSgpLmlzTG9hZCgpKSB7XHJcbiAgICAgICAgICAgIC8v5pi+56S65aSN5rS755WM6Z2iXHJcbiAgICAgICAgICAgIGxldCByZXZpdmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJldml2ZVByZWZhYik7XHJcbiAgICAgICAgICAgIHJldml2ZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShyZXZpdmUpO1xyXG4gICAgICAgICAgICByZXZpdmUuc2NyaXB0LmluaXQodGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXllclJldml2ZSh7dHlwZTpmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBfcGxheWVyUmV2aXZlKGV2ZW50KXtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8v5aSN5rS7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5yZXZpdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLnNjcmlwdC5yZWZyZXNoTGV2ZWxJbmZvKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zZXRGaW5pc2goKTtcclxuXHJcbiAgICAgICAgICAgIC8v5pi+56S65aSx6LSl55WM6Z2iXHJcbiAgICAgICAgICAgIGxldCBmaW5pc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmlzaFByZWZhYik7XHJcbiAgICAgICAgICAgIGZpbmlzaC56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShmaW5pc2gpO1xyXG4gICAgICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9nYW1lUGF1c2UoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucGF1c2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgX2dhbWVSZXN1bWUoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucmVzdW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YeR5biB5aKe5YqgXHJcbiAgICAvLyBfYWRkQ29pbihldmVudCl7XHJcbiAgICAvLyAgICAgdGhpcy5fZmlyZS5fbHlDb2luLnNjcmlwdC5yZWZyZXNoKGV2ZW50LmNvdW50LGV2ZW50LnBvc2l0aW9uKTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy/lh4blpIflvIDlp4tcclxuICAgIF9wcmVwYXJlKGV2ZW50KXtcclxuICAgICAgICBpZiAodGhpcy5fbmV0TWFuYWdlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uRGlzY29ubmVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RlYXJkb3duTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5riF56m65Zy65pmvXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmNsZWFuTWFwKCk7ICBcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRDb3VudCsrO1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydENvdW50ID49Mykge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChJbnNlcnRBZC5nZXRJbnN0YW5jZSgpLmlzTG9hZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGFydENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIEluc2VydEFkLmdldEluc3RhbmNlKCkuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3VwZGF0ZU1zZyhldmVudCl7XHJcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT0gJ2luJykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PSAnb3V0Jykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmjInpkq5cclxuICAgIF9vblN0YXJ0Q2xpY2soKXtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcblxyXG4gICAgICAgIC8v6ZqQ6JeP5byA5aeL5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYWREZWZlbnNlLnNjcmlwdC5zZXRBRCgzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9hZEJ1bGxldC5zY3JpcHQuc2V0QUQoMik7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYWRMaWZlLnNjcmlwdC5zZXRBRCgxKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyDlvIDlp4vmuLjmiI9cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl9wcmVEZWZlbnNlLnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3ByZUJ1bGxldC5zY3JpcHQuZW1pdFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+aMiemSrlxyXG4gICAgb25TZXR0aW5nQ2xpY2soKXtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICBVdGlscy5zaG93RGlhbG9ncyh0aGlzLnNldHRpbmdQcmVmYWIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eCueWHu+aYvuekuui9rOebmOaMiemSrlxyXG4gICAgb25XaXNoQnRuQ2xpY2soKXtcclxuICAgICAgICBBbmFseXRpY3MuZ2V0SW5zdGFuY2UoKS5ldmVudCgnZW50ZXJfd2lzaCcpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpOyAgICAvL+aMiemSrumfs+aViFxyXG4gICAgICAgIFV0aWxzLnNob3dEaWFsb2dzKHRoaXMud2lzaFByZWZhYik7XHJcbiAgICB9XHJcblxyXG4gICAgb25UZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB0aGlzLl9zaG93VGVzdFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRUZXN0QnV0dG9uVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fYnRuVGVzdC5nZXRDaGlsZEJ5TmFtZShcIl9sYlRlc3RCdG5cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiVGVzdEJ0blwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fYnRuVGVzdDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fYnRuVGVzdC53aWR0aCwgdGhpcy5fZmlyZS5fYnRuVGVzdC5oZWlnaHQpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi5rWLXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyODtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMzI7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dUZXN0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYW5lbCA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3RQYW5lbFwiKTtcclxuICAgICAgICBwYW5lbC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcGFuZWwuc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAyMDAwO1xyXG4gICAgICAgIHRoaXMuX3Rlc3RQYW5lbCA9IHBhbmVsO1xyXG5cclxuICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3RNYXNrXCIpO1xyXG4gICAgICAgIG1hc2sucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgbWFzay5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIGxldCBtYXNrR3JhcGhpY3MgPSBtYXNrLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDE1MCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLnJlY3QoLTY0MCwgLTM2MCwgMTI4MCwgNzIwKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIG1hc2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9oaWRlVGVzdFBhbmVsLCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGRpYWxvZyA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3REaWFsb2dcIik7XHJcbiAgICAgICAgZGlhbG9nLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIGRpYWxvZy5zZXRDb250ZW50U2l6ZSgxMDYwLCA4MjApO1xyXG4gICAgICAgIGRpYWxvZy56SW5kZXggPSAxO1xyXG4gICAgICAgIGxldCBkaWFsb2dHcmFwaGljcyA9IGRpYWxvZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDM1LCAzNiwgNDUsIDI0NSk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC01MzAsIC00MTAsIDEwNjAsIDgyMCwgMTgpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMTgwKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTUzMCwgLTQxMCwgMTA2MCwgODIwLCAxOCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZGlhbG9nLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0TGFiZWwoZGlhbG9nLCBcIl9sYlRlc3RUaXRsZVwiLCBcIua1i+ivlemdouadv1wiLCBjYy52MigwLCAyNzYpLCAzNCwgY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdExhYmVsKGRpYWxvZywgXCJfbGJUZXN0VGlwc1wiLCBcIuS8muWFiOmHjee9ruW9k+WJjea4uOaIj+eKtuaAge+8jOWGjei/m+WFpea1i+ivleWcuuaZr1wiLCBjYy52MigwLCAyMzQpLCAyMiwgY2MuY29sb3IoMjEwLCAyMTAsIDIyMCwgMjU1KSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25XaWR0aCA9IDIyMDtcclxuICAgICAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gNTQ7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgbGV0IGNvbHVtbnMgPSBbLTM2MCwgLTEyMCwgMTIwLCAzNjBdO1xyXG4gICAgICAgIGxldCByb3dzID0gWzE0NCwgNzIsIDAsIC03MiwgLTE0NCwgLTIxNl07XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5LaWxsRWZmZWN0VGVzdFwiLCBcIuWHu+adgOaViOaenOa1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzBdKSwgY2MuY29sb3IoMjU1LCA5MCwgNzAsIDI1NSksIHRoaXMuX29uS2lsbFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5IaXRUZXN0XCIsIFwi5Y+X5Ye75pWI5p6c5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbMF0pLCBjYy5jb2xvcig4MCwgMTgwLCAyNTUsIDI1NSksIHRoaXMuX29uSGl0VGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blVwZ3JhZGVUZXN0XCIsIFwi5Y2H57qn5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbMF0pLCBjYy5jb2xvcigxMTUsIDI1NSwgMTcwLCAyNTUpLCB0aGlzLl9vblVwZ3JhZGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuTXV0YXRpb25UZXN0XCIsIFwi5a2Q5by56LSo5Y+Y5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMF0pLCBjYy5jb2xvcigyNTUsIDEyMCwgMjEwLCAyNTUpLCB0aGlzLl9vbkJ1bGxldE11dGF0aW9uVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5TaG9vdEVmZmVjdFRlc3RcIiwgXCLlrZDlvLnlsITlh7vmtYvor5VcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMjA1LCA5MCwgMjU1KSwgdGhpcy5fb25TaG9vdEVmZmVjdFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5QbGF5ZXJMb3dIcFRlc3RcIiwgXCLoh6rlt7HooYDph4/lkYrmgKVcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMTEwLCAxMTAsIDI1NSksIHRoaXMuX29uUGxheWVyTG93SHBUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuRW5lbXlMb3dIcFRlc3RcIiwgXCLmlYzkurrooYDph4/lkYrmgKVcIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMTY1LCA3MCwgMjU1KSwgdGhpcy5fb25FbmVteUxvd0hwVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bktpbGxCcm9hZGNhc3RUZXN0XCIsIFwi5Ye75p2A5bm/5pKtXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMV0pLCBjYy5jb2xvcigxNzUsIDEyMCwgMjU1LCAyNTUpLCB0aGlzLl9vbktpbGxCcm9hZGNhc3RUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNhY3JpZmljZVRlc3RcIiwgXCLnjK7npa3mtYvor5VcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1syXSksIGNjLmNvbG9yKDI1NSwgOTIsIDkyLCAyNTUpLCB0aGlzLl9vblNhY3JpZmljZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Qb3J0YWxUZXN0XCIsIFwi5Lyg6YCB6Zeo5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbMl0pLCBjYy5jb2xvcigxMTAsIDI1NSwgMjQ1LCAyNTUpLCB0aGlzLl9vblBvcnRhbFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DZW50cmlmdWdhbFJpbmdUZXN0XCIsIFwi56a75b+D5Yqb5ZyI5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbMl0pLCBjYy5jb2xvcigyNTUsIDE2MCwgOTAsIDI1NSksIHRoaXMuX29uQ2VudHJpZnVnYWxSaW5nVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bk9pbFNwaWxsVGVzdFwiLCBcIueEpuayueW8uea1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzJdKSwgY2MuY29sb3IoMTY1LCAxMTgsIDcyLCAyNTUpLCB0aGlzLl9vbk9pbFNwaWxsVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5FbmVyZ3lFZ2dUZXN0XCIsIFwi6IO96YeP6JuL5pS26JePXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbM10pLCBjYy5jb2xvcigxMjYsIDIzMiwgMTQzLCAyNTUpLCB0aGlzLl9vbkVuZXJneUVnZ1Rlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Db3ZlclRlc3RcIiwgXCLmjqnkvZPmtYvor5VcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1szXSksIGNjLmNvbG9yKDE5OSwgMTUxLCA5NiwgMjU1KSwgdGhpcy5fb25Db3ZlclRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DbG9zZVRlc3RcIiwgXCLlhbPpl61cIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1szXSksIGNjLmNvbG9yKDE4MCwgMTgwLCAxOTAsIDI1NSksIHRoaXMuX2hpZGVUZXN0UGFuZWwsIDE4MCwgNDgsIDI0KTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuRGFtYWdlRG91YmxlVGVzdFwiLCBcIuS8pOWus+e/u+WAjeWMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzNdKSwgY2MuY29sb3IoMjU1LCA1MCwgNTAsIDI1NSksIHRoaXMuX29uRGFtYWdlRG91YmxlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNwZWVkRG91YmxlVGVzdFwiLCBcIumAn+W6pue/u+WAjeWMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzRdKSwgY2MuY29sb3IoNTAsIDE1MCwgMjU1LCAyNTUpLCB0aGlzLl9vblNwZWVkRG91YmxlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNwcmVhZEJ1bGxldFRlc3RcIiwgXCLlrZDlvLnmianmlaPljLrln59cIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1s0XSksIGNjLmNvbG9yKDUwLCAyMzAsIDEwMCwgMjU1KSwgdGhpcy5fb25TcHJlYWRCdWxsZXRUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQm91bmNlT2JzdGFjbGVUZXN0XCIsIFwi5a2Q5by55Y+N5by56Zqc56KNXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbNF0pLCBjYy5jb2xvcigyNTUsIDEwMCwgMjAwLCAyNTUpLCB0aGlzLl9vbkJvdW5jZU9ic3RhY2xlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkJsYWNrSG9sZVRlc3RcIiwgXCLpu5HmtJ7ljLrln59cIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1s0XSksIGNjLmNvbG9yKDEyMCwgNDAsIDE4MCwgMjU1KSwgdGhpcy5fb25CbGFja0hvbGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQ2x1c3RlckJvbWJUZXN0XCIsIFwi6ZuG5p2f54K45by5XCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbNV0pLCBjYy5jb2xvcigyMjAsIDE2MCwgNDAsIDI1NSksIHRoaXMuX29uQ2x1c3RlckJvbWJUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuTXVsdGlwbGF5ZXJUZXN0XCIsIFwi6IGU5py65a+55oiYXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbNV0pLCBjYy5jb2xvcig2MCwgMjIwLCAyNTUsIDI1NSksIHRoaXMuX29uTXVsdGlwbGF5ZXJUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVGVzdExhYmVsKHBhcmVudCwgbmFtZSwgdGV4dCwgcG9zLCBmb250U2l6ZSwgY29sb3IpIHtcclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNDIwLCA0Mik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY29sb3I7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gZm9udFNpemUgKyA2O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBsYWJlbE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVRlc3RCdXR0b24ocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIHN0cm9rZUNvbG9yLCBoYW5kbGVyLCB3aWR0aCA9IDI2MCwgaGVpZ2h0ID0gNTgsIGZvbnRTaXplID0gMjgpIHtcclxuICAgICAgICBsZXQgYnRuID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgYnRuLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBidG4uc2V0Q29udGVudFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgYnRuLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgYnRuLnpJbmRleCA9IDEwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYnRuLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNDgsIDQ4LCA1NSwgMjMwKTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IHN0cm9rZUNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUobmFtZSArIFwiTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ0bjtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSBmb250U2l6ZSArIDQ7XHJcbiAgICAgICAgLy8gbGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5TSFJJTks7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBidG47XHJcbiAgICB9XHJcblxyXG4gICAgX29uS2lsbFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJraWxsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkhpdFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJoaXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uVXBncmFkZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJ1cGdyYWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkJ1bGxldE11dGF0aW9uVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcIm11dGF0aW9uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNob290RWZmZWN0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNob290XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblBsYXllckxvd0hwVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInBsYXllckxvd0hwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkVuZW15TG93SHBUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiZW5lbXlMb3dIcFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25LaWxsQnJvYWRjYXN0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImtpbGxCcm9hZGNhc3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uUG9ydGFsVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInBvcnRhbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25DZW50cmlmdWdhbFJpbmdUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiY2VudHJpZnVnYWxSaW5nXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNhY3JpZmljZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJzYWNyaWZpY2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uT2lsU3BpbGxUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwib2lsU3BpbGxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQ292ZXJUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiY292ZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uRW5lcmd5RWdnVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImVuZXJneUVnZ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25EYW1hZ2VEb3VibGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiZGFtYWdlRG91YmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNwZWVkRG91YmxlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNwZWVkRG91YmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNwcmVhZEJ1bGxldFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJzcHJlYWRCdWxsZXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQm91bmNlT2JzdGFjbGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiYm91bmNlT2JzdGFjbGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQmxhY2tIb2xlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImJsYWNrSG9sZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25DbHVzdGVyQm9tYlRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJjbHVzdGVyQm9tYlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25NdWx0aXBsYXllclRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hpZGVUZXN0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLl9zdGFydE11bHRpcGxheWVyR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydFRlc3RHYW1lKHR5cGUpIHtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB0aGlzLl9oaWRlVGVzdFBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5faGlkZVVwZ3JhZGVDaG9pY2VQYW5lbChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRHYW1lQmVmb3JlVGVzdCgpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6dHlwZSA9PSBcInNhY3JpZmljZVwifSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY29tcGxldGUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl91aS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09IFwia2lsbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEtpbGxFZmZlY3RUZXN0R2FtZShjb21wbGV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJ1cGdyYWRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fc2hvd1VwZ3JhZGVDaG9pY2VQYW5lbChcInVwZ3JhZGVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwibXV0YXRpb25cIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zaG93VXBncmFkZUNob2ljZVBhbmVsKFwibXV0YXRpb25cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic2hvb3RcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRTaG9vdEVmZmVjdFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInBsYXllckxvd0hwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHNlbGYuX2dldEN1cnJlbnRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLnNjcmlwdCAmJiBwbGF5ZXIuc2NyaXB0LmRlYnVnU2V0TG93SHApIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LmRlYnVnU2V0TG93SHAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJlbmVteUxvd0hwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RpbGVkICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuY3JlYXRlTG93SHBUZXN0RW5lbXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuY3JlYXRlTG93SHBUZXN0RW5lbXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJzYWNyaWZpY2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwia2lsbEJyb2FkY2FzdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEtpbGxCcm9hZGNhc3RUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJwb3J0YWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRQb3J0YWxUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjZW50cmlmdWdhbFJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRDZW50cmlmdWdhbFJpbmdUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJvaWxTcGlsbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LnNwYXduT2lsVGVzdFBpY2t1cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zcGF3bk9pbFRlc3RQaWNrdXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjb3ZlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENvdmVyVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiZW5lcmd5RWdnXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0RW5lcmd5RWdnVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiZGFtYWdlRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0RGFtYWdlRG91YmxlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic3BlZWREb3VibGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRTcGVlZERvdWJsZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInNwcmVhZEJ1bGxldFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFNwcmVhZEJ1bGxldFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImJvdW5jZU9ic3RhY2xlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0Qm91bmNlT2JzdGFjbGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJibGFja0hvbGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRCbGFja0hvbGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjbHVzdGVyQm9tYlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENsdXN0ZXJCb21iVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRQbGF5ZXJIaXRUZXN0R2FtZShjb21wbGV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZXNldEdhbWVCZWZvcmVUZXN0KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fdGlsZWQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jbGVhbk1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2RpcjpjYy52MigwLCAxKSwgcmF0aW86MH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLHt9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIse21vZGU6XCJjaGFyZ2VcIn0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlVGVzdFBhbmVsKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl90ZXN0UGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl90ZXN0UGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlc3RQYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Rlc3Ryb3lUZXN0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGVzdFBhbmVsID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q3VycmVudFBsYXllcigpIHtcclxuICAgICAgICBsZXQgdGlsZWQgPSB0aGlzLl9maXJlLl90aWxlZDtcclxuICAgICAgICBpZiAoIXRpbGVkIHx8ICF0aWxlZC5zY3JpcHQgfHwgIXRpbGVkLnNjcmlwdC5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRpbGVkLnNjcmlwdC5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbGVkLnNjcmlwdC5fcGxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93VXBncmFkZUNob2ljZVBhbmVsKG1vZGUgPSBcInVwZ3JhZGVcIikge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID0gbW9kZTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImdhbWUtcGF1c2VcIix7fSk7XHJcblxyXG4gICAgICAgIGxldCBwYW5lbCA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VQYW5lbFwiKTtcclxuICAgICAgICBwYW5lbC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcGFuZWwuc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAyMTAwO1xyXG4gICAgICAgIHBhbmVsLmFkZENvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBwYW5lbDtcclxuXHJcbiAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQ2hvaWNlTWFza1wiKTtcclxuICAgICAgICBtYXNrLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIG1hc2suc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBsZXQgbWFza0dyYXBoaWNzID0gbWFzay5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAwLCAwLCAxNjgpO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5yZWN0KC02NDAsIC0zNjAsIDEyODAsIDcyMCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGRpYWxvZyA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VEaWFsb2dcIik7XHJcbiAgICAgICAgZGlhbG9nLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIGRpYWxvZy5zZXRDb250ZW50U2l6ZSg5ODAsIDQzMCk7XHJcbiAgICAgICAgZGlhbG9nLnpJbmRleCA9IDE7XHJcbiAgICAgICAgbGV0IGRpYWxvZ0dyYXBoaWNzID0gZGlhbG9nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjIsIDI2LCAzOCwgMjQ1KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTQ5MCwgLTIxNSwgOTgwLCA0MzAsIDI0KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDEyMCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC00OTAsIC0yMTUsIDk4MCwgNDMwLCAyNCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZGlhbG9nLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBtb2RlID09IFwibXV0YXRpb25cIiA/IFwi6YCJ5oup5LiA56eN5a2Q5by56LSo5Y+YXCIgOiBcIumAieaLqeS4gOmhueWNh+e6p1wiO1xyXG4gICAgICAgIGxldCB0aXBzID0gbW9kZSA9PSBcIm11dGF0aW9uXCIgPyBcIjPpgIkx77yM6YCJ5Lit5ZCO56uL5Yi75pu/5o2i5b2T5YmN5a2Q5by5XCIgOiBcIjPpgIkx77yM56uL5Y2z55Sf5pWIXCI7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwoZGlhbG9nLCBcIl9sYlVwZ3JhZGVUaXRsZVwiLCB0aXRsZSwgY2MudjIoMCwgMTYwKSwgMzYsIGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGRpYWxvZywgXCJfbGJVcGdyYWRlVGlwc1wiLCB0aXBzLCBjYy52MigwLCAxMTgpLCAyMiwgY2MuY29sb3IoMjAwLCAyMTAsIDIyNSwgMjU1KSk7XHJcblxyXG4gICAgICAgIGxldCBjaG9pY2VzID0gbW9kZSA9PSBcIm11dGF0aW9uXCJcclxuICAgICAgICAgICAgPyBwbGF5ZXIuc2NyaXB0LmdldFRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZXMoKVxyXG4gICAgICAgICAgICA6IHBsYXllci5zY3JpcHQuZ2V0VGVzdFVwZ3JhZGVDaG9pY2VzKCk7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9IC0yODA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaG9pY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXJkID0gdGhpcy5fY3JlYXRlVXBncmFkZUNob2ljZUNhcmQoZGlhbG9nLCBjaG9pY2VzW2ldLCBjYy52MihzdGFydFggKyBpICogMjgwLCAtMTApKTtcclxuICAgICAgICAgICAgY2FyZC5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgY2FyZC5zY2FsZVggPSAwLjA1O1xyXG4gICAgICAgICAgICBjYXJkLnNjYWxlWSA9IDAuOTI7XHJcbiAgICAgICAgICAgIGNhcmQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGkgKiAwLjA1KSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjA4KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMTIsIDEuMDYpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA3LCAwLjk2LCAxLjAyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNiwgMS4wMywgMC45OSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDUsIDEsIDEpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIGZvbnRTaXplLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg3MDAsIGZvbnRTaXplICsgMTApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gZm9udFNpemUgKyA0O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBsYWJlbE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVVwZ3JhZGVDaG9pY2VDYXJkKHBhcmVudCwgY2hvaWNlLCBwb3MpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRfXCIgKyBjaG9pY2UuaWQpO1xyXG4gICAgICAgIGNhcmQucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGNhcmQuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBjYXJkLnNldENvbnRlbnRTaXplKDI0MCwgMjcwKTtcclxuICAgICAgICBjYXJkW1wiX191cGdyYWRlQ2hvaWNlXCJdID0gY2hvaWNlO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBjYXJkLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMzgsIDQzLCA1OCwgMjQ1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTEyMCwgLTEzNSwgMjQwLCAyNzAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTEyMCwgLTEzNSwgMjQwLCAyNzAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9jYXJkR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGNhcmQ7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY2hvaWNlLmNvbG9yLnIsIGNob2ljZS5jb2xvci5nLCBjaG9pY2UuY29sb3IuYiwgMzQpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5yb3VuZFJlY3QoLTExMiwgLTEyNywgMjI0LCAyNTQsIDE2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbiA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRJY29uXCIpO1xyXG4gICAgICAgIGljb24ucGFyZW50ID0gY2FyZDtcclxuICAgICAgICBpY29uLnNldFBvc2l0aW9uKDAsIDc0KTtcclxuICAgICAgICBsZXQgaWNvbkdyYXBoaWNzID0gaWNvbi5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5maWxsQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmNpcmNsZSgwLCAwLCAzNCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBpY29uR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpY29uR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5jaXJjbGUoMCwgMCwgMzQpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGljb25MYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9jYXJkSWNvbkxhYmVsXCIpO1xyXG4gICAgICAgIGljb25MYWJlbE5vZGUucGFyZW50ID0gaWNvbjtcclxuICAgICAgICBpY29uTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDc4LCA0MCk7XHJcbiAgICAgICAgbGV0IGljb25MYWJlbCA9IGljb25MYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBpY29uTGFiZWwuc3RyaW5nID0gY2hvaWNlLnNob3J0TGFiZWw7XHJcbiAgICAgICAgaWNvbkxhYmVsLmZvbnRTaXplID0gY2hvaWNlLnNob3J0TGFiZWwubGVuZ3RoID4gMiA/IDE4IDogMjI7XHJcbiAgICAgICAgaWNvbkxhYmVsLmxpbmVIZWlnaHQgPSAyNDtcclxuICAgICAgICBpY29uTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBpY29uTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChjYXJkLCBcIl9jYXJkVGl0bGVcIiwgY2hvaWNlLnRpdGxlLCBjYy52MigwLCAxNiksIDI4LCBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChjYXJkLCBcIl9jYXJkVmFsdWVcIiwgY2hvaWNlLnZhbHVlVGV4dCwgY2MudjIoMCwgLTM0KSwgNDAsIGNob2ljZS5jb2xvcik7XHJcblxyXG4gICAgICAgIGxldCBkZXNjTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NhcmREZXNjXCIpO1xyXG4gICAgICAgIGRlc2NOb2RlLnBhcmVudCA9IGNhcmQ7XHJcbiAgICAgICAgZGVzY05vZGUuc2V0UG9zaXRpb24oMCwgLTkyKTtcclxuICAgICAgICBkZXNjTm9kZS5zZXRDb250ZW50U2l6ZSgxOTAsIDU2KTtcclxuICAgICAgICBkZXNjTm9kZS5jb2xvciA9IGNjLmNvbG9yKDIwMCwgMjEwLCAyMjUsIDIyMCk7XHJcbiAgICAgICAgbGV0IGRlc2NMYWJlbCA9IGRlc2NOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgZGVzY0xhYmVsLnN0cmluZyA9IGNob2ljZS5kZXNjO1xyXG4gICAgICAgIGRlc2NMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGRlc2NMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgZGVzY0xhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgZGVzY0xhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgY2FyZC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVXBncmFkZUNob2ljZVNlbGVjdCwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGNhcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uVXBncmFkZUNob2ljZVNlbGVjdChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FyZCA9IGV2ZW50ID8gZXZlbnQuY3VycmVudFRhcmdldCA6IG51bGw7XHJcbiAgICAgICAgbGV0IGNob2ljZSA9IGNhcmQgPyBjYXJkW1wiX191cGdyYWRlQ2hvaWNlXCJdIDogbnVsbDtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFwbGF5ZXIgfHwgIXBsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0bkxVcFwiKTtcclxuICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID09IFwibXV0YXRpb25cIiAmJiBwbGF5ZXIuc2NyaXB0LmFwcGx5VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5zY3JpcHQuYXBwbHlUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2UoY2hvaWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5hcHBseVRlc3RVcGdyYWRlQ2hvaWNlKGNob2ljZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlVXBncmFkZUNob2ljZVBhbmVsKHJlc3VtZUdhbWUgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsID0gbnVsbDtcclxuICAgICAgICBpZiAocmVzdW1lR2FtZSkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImdhbWUtcmVzdW1lXCIse30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID0gXCJ1cGdyYWRlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLSDlpJrkurrmqKHlvI8gLS0tLS0tLS0tLVxyXG4gICAgX3Nob3dNdWx0aXBsYXllclN0YXR1cyh0ZXh0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyU3RhdHVzICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKFwiX211bHRpcGxheWVyU3RhdHVzXCIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgMjAwKSk7XHJcbiAgICAgICAgbm9kZS5zZXRDb250ZW50U2l6ZSg2MDAsIDYwKTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDMwMDA7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzMjtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gNDA7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAxMDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMgPSBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlTXVsdGlwbGF5ZXJTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVyU3RhdHVzICYmIGNjLmlzVmFsaWQodGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyU3RhdHVzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJTdGF0dXMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk11bHRpcGxheWVySGl0UmVwb3J0KGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSB8fCB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCB8fCAhZXZlbnQgfHwgIWV2ZW50LmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IGV2ZW50LmlkLFxyXG4gICAgICAgICAgICB0Z2lkOiBldmVudC50Z2lkLFxyXG4gICAgICAgICAgICBocDogZXZlbnQuaHAgPT0gbnVsbCA/IC0xIDogZXZlbnQuaHAsXHJcbiAgICAgICAgICAgIGRhbWFnZTogZXZlbnQuZGFtYWdlID09IG51bGwgPyAtMSA6IGV2ZW50LmRhbWFnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfbmV4dE11bHRpcGxheWVyQnVsbGV0SWQoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllcklkID0gdGhpcy5fbmV0TWFuYWdlciA/IHRoaXMuX25ldE1hbmFnZXIucGxheWVySWQgOiAwO1xyXG4gICAgICAgIGxldCBpZCA9IHBsYXllcklkICsgXCJfXCIgKyB0aGlzLl9tdWx0aXBsYXllckZpcmVTZXE7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJGaXJlU2VxKys7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRMb2NhbE11bHRpcGxheWVyUGxheWVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkTXVsdGlwbGF5ZXJGaXJlQ29tbWFuZCgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0TG9jYWxNdWx0aXBsYXllclBsYXllcigpO1xyXG4gICAgICAgIGxldCBmaXJlVHlwZSA9IDE7XHJcbiAgICAgICAgaWYgKHBsYXllciAmJiBwbGF5ZXIuc2NyaXB0ICYmIHBsYXllci5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJGaXJlVHlwZSkge1xyXG4gICAgICAgICAgICBmaXJlVHlwZSA9IHBsYXllci5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJGaXJlVHlwZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5fbmV4dE11bHRpcGxheWVyQnVsbGV0SWQoKSxcclxuICAgICAgICAgICAgdHlwZTogZmlyZVR5cGUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBfYnVpbGRNdWx0aXBsYXllcklucHV0UGFja2V0KCkge1xyXG4gICAgICAgIGxldCBzb3VyY2UgPSB0aGlzLl9tdWx0aXBsYXllcklucHV0cyB8fCB7fTtcclxuICAgICAgICBsZXQgaGl0ID0gdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZS5sZW5ndGggPiAwID8gdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZS5zaGlmdCgpIDogZmFsc2U7XHJcbiAgICAgICAgbGV0IHBpY2t1cEVuZXJneUlkID0gc291cmNlLnBpY2t1cEVuZXJneUlkID09IG51bGwgPyBudWxsIDogc291cmNlLnBpY2t1cEVuZXJneUlkO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVwOiAhIXNvdXJjZS51cCxcclxuICAgICAgICAgICAgZG93bjogISFzb3VyY2UuZG93bixcclxuICAgICAgICAgICAgbGVmdDogISFzb3VyY2UubGVmdCxcclxuICAgICAgICAgICAgcmlnaHQ6ICEhc291cmNlLnJpZ2h0LFxyXG4gICAgICAgICAgICBmaXJlOiBzb3VyY2UuZmlyZSA/IHNvdXJjZS5maXJlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpdDogaGl0IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBwaWNrdXBFbmVyZ3lJZDogcGlja3VwRW5lcmd5SWQsXHJcbiAgICAgICAgICAgIHBsYXllclNuYXBzaG90OiB0aGlzLl9idWlsZExvY2FsTXVsdGlwbGF5ZXJQbGF5ZXJTbmFwc2hvdCgpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkTG9jYWxNdWx0aXBsYXllclBsYXllclNuYXBzaG90KCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRMb2NhbE11bHRpcGxheWVyUGxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIgfHwgIXBsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGlyID0gcGxheWVyLnNjcmlwdC5fZGlyICYmIHBsYXllci5zY3JpcHQuX2Rpci5tYWdTcXIoKSA+IDBcclxuICAgICAgICAgICAgPyBjYy52MihwbGF5ZXIuc2NyaXB0Ll9kaXIpLm5vcm1hbGl6ZSgpXHJcbiAgICAgICAgICAgIDogY2MudjIoMSwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogTWF0aC5yb3VuZChwbGF5ZXIueCksXHJcbiAgICAgICAgICAgIHk6IE1hdGgucm91bmQocGxheWVyLnkpLFxyXG4gICAgICAgICAgICBkaXJYOiBOdW1iZXIoZGlyLngudG9GaXhlZCg0KSksXHJcbiAgICAgICAgICAgIGRpclk6IE51bWJlcihkaXIueS50b0ZpeGVkKDQpKSxcclxuICAgICAgICAgICAgc3BlZWQ6IE51bWJlcigocGxheWVyLnNjcmlwdC5fY3VycmVudFNwZWVkIHx8IDApLnRvRml4ZWQoMykpLFxyXG4gICAgICAgICAgICByYWRpdXM6IHBsYXllci5zY3JpcHQuZ2V0UmFkaXVzID8gcGxheWVyLnNjcmlwdC5nZXRSYWRpdXMoKSA6IDM4LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkTXVsdGlwbGF5ZXJQbGF5ZXJTZXR1cCgpIHtcclxuICAgICAgICBsZXQgdGFua1R5cGUgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfY3VycmVudF9wbGF5ZXJfdHlwZV9cIiwxKTtcclxuICAgICAgICBsZXQgcGxheWVyTGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9wbGF5ZXJfJHt0YW5rVHlwZX1fYCwgMSk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHl5cC5jb25maWcuVGFuayAmJiB5eXAuY29uZmlnLlRhbmtbdGFua1R5cGVdID8geXlwLmNvbmZpZy5UYW5rW3RhbmtUeXBlXSA6IHt9O1xyXG4gICAgICAgIGxldCBlbmVyZ3lTcGF3blBvaW50cyA9IFtdO1xyXG4gICAgICAgIGxldCBtYXBCb3VuZHMgPSBudWxsO1xyXG4gICAgICAgIGxldCBzcGF3bkNhbmRpZGF0ZXMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl90aWxlZCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyRW5lcmd5U3Bhd25Qb2ludHMpIHtcclxuICAgICAgICAgICAgZW5lcmd5U3Bhd25Qb2ludHMgPSB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuZ2V0TXVsdGlwbGF5ZXJFbmVyZ3lTcGF3blBvaW50cyg1MTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl90aWxlZCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyTWFwQm91bmRzKSB7XHJcbiAgICAgICAgICAgIG1hcEJvdW5kcyA9IHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllck1hcEJvdW5kcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZmlyZSAmJiB0aGlzLl9maXJlLl90aWxlZCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmdldE11bHRpcGxheWVyU3Bhd25DYW5kaWRhdGVzKSB7XHJcbiAgICAgICAgICAgIHNwYXduQ2FuZGlkYXRlcyA9IHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5nZXRNdWx0aXBsYXllclNwYXduQ2FuZGlkYXRlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0YW5rVHlwZTogdGFua1R5cGUsXHJcbiAgICAgICAgICAgIHBsYXllckxldmVsOiBwbGF5ZXJMZXZlbCxcclxuICAgICAgICAgICAgYmFzZUhwOiAoY29uZmlnLkhQID09IG51bGwgPyA1MCA6IGNvbmZpZy5IUCkgKiAocGxheWVyTGV2ZWwgKyAxKSxcclxuICAgICAgICAgICAgYmFzZUF0azogKGNvbmZpZy5BVEsgPT0gbnVsbCA/IDUgOiBjb25maWcuQVRLKSAqIChwbGF5ZXJMZXZlbCArIDEpLFxyXG4gICAgICAgICAgICBiYXNlU3BlZWQ6IGNvbmZpZy5TcGVlZCA9PSBudWxsID8gNCA6IGNvbmZpZy5TcGVlZCxcclxuICAgICAgICAgICAgZW5lcmd5U3Bhd25Qb2ludHM6IGVuZXJneVNwYXduUG9pbnRzLFxyXG4gICAgICAgICAgICBtYXBCb3VuZHM6IG1hcEJvdW5kcyxcclxuICAgICAgICAgICAgc3Bhd25DYW5kaWRhdGVzOiBzcGF3bkNhbmRpZGF0ZXMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBfb25NdWx0aXBsYXllclBsYXllckRlYXRoKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSB8fCAhZXZlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuaXNMb2NhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuS9oOW3suiiq+a3mOaxsO+8jOetieW+heacrOWxgOe7k+euly4uLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX29uTXVsdGlwbGF5ZXJFbmVyZ3lQaWNrdXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX211bHRpcGxheWVyQWN0aXZlIHx8IHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkIHx8ICFldmVudCB8fCBldmVudC5lbmVyZ3lJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aXBsYXllcklucHV0cykge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllcklucHV0cyA9IHsgdXA6IGZhbHNlLCBkb3duOiBmYWxzZSwgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgZmlyZTogZmFsc2UsIGhpdDogZmFsc2UgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMucGlja3VwRW5lcmd5SWQgPSBldmVudC5lbmVyZ3lJZDtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTXVsdGlwbGF5ZXJTdGF0dXNGcm9tUm9vbVN0YXRlKHBheWxvYWQpIHtcclxuICAgICAgICBpZiAoIXBheWxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGF5bG9hZC5zdGF0ZSA9PSBcIndhaXRpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLnrYnlvoXnjqnlrrbliqDlhaUgKFwiICsgcGF5bG9hZC5wbGF5ZXJDb3VudCArIFwiL1wiICsgcGF5bG9hZC5taW5QbGF5ZXJzICsgXCItXCIgKyBwYXlsb2FkLm1heFBsYXllcnMgKyBcIilcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBheWxvYWQuc3RhdGUgPT0gXCJjb3VudGRvd25cIikge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmuLjmiI/lgJLorqHml7YgXCIgKyBwYXlsb2FkLmNvdW50ZG93biArIFwiIOenklwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGF5bG9hZC5zdGF0ZSA9PSBcImVuZGVkXCIgJiYgIXRoaXMuX211bHRpcGxheWVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuacrOWxgOW3sue7k+adn1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dNdWx0aXBsYXllckZpbmlzaChpc1dpbiwgd2lubmVyUGxheWVySWQpIHtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuc2NyaXB0LnJlZnJlc2hMZXZlbEluZm8oKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc2V0RmluaXNoKCk7XHJcblxyXG4gICAgICAgIGxldCBmaW5pc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmlzaFByZWZhYik7XHJcbiAgICAgICAgZmluaXNoLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgVXRpbHMuYWRkdG9DdXJyZW50U2NlbmUoZmluaXNoKTtcclxuICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLCBpc1dpbik7XHJcblxyXG4gICAgICAgIGlmICh3aW5uZXJQbGF5ZXJJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhpc1dpbiA/IFwi5L2g6I636IOc5LqGXCIgOiAoXCLnjqnlrrYgXCIgKyAod2lubmVyUGxheWVySWQgKyAxKSArIFwiIOiOt+iDnFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuacrOWxgOW5s+WxgFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2VuZE11bHRpcGxheWVyTWF0Y2gocGF5bG9hZCkge1xyXG4gICAgICAgIGxldCB3aW5uZXJQbGF5ZXJJZCA9IHBheWxvYWQgJiYgcGF5bG9hZC53aW5uZXJQbGF5ZXJJZCAhPSBudWxsID8gcGF5bG9hZC53aW5uZXJQbGF5ZXJJZCA6IC0xO1xyXG4gICAgICAgIGxldCBsb2NhbFBsYXllcklkID0gdGhpcy5fbmV0TWFuYWdlciA/IHRoaXMuX25ldE1hbmFnZXIucGxheWVySWQgOiAtMTtcclxuICAgICAgICBsZXQgaXNXaW4gPSB3aW5uZXJQbGF5ZXJJZCA+PSAwICYmIHdpbm5lclBsYXllcklkID09IGxvY2FsUGxheWVySWQ7XHJcblxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySW5wdXRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckhpdFF1ZXVlID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkRpc2Nvbm5lY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllckZpbmlzaChpc1dpbiwgd2lubmVyUGxheWVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydE11bHRpcGxheWVyR2FtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmV0TWFuYWdlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uRGlzY29ubmVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckxvY2FsRGVhZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySGl0UXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRHYW1lQmVmb3JlVGVzdCgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dNdWx0aXBsYXllclN0YXR1cyhcIuato+WcqOi/nuaOpeacjeWKoeWZqCB3czovL2xvY2FsaG9zdDoyNTY3IC4uLlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlciA9IG5ldyBOZXR3b3JrTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuX25ldE1hbmFnZXIub25Db3VudGRvd24gPSAoc2Vjb25kcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TXVsdGlwbGF5ZXJTdGF0dXMoXCLmuLjmiI/lgJLorqHml7YgXCIgKyBzZWNvbmRzICsgXCIg56eSXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vblBsYXllckNvdW50ID0gKGNvdW50LCBtYXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd011bHRpcGxheWVyU3RhdHVzKFwi5bey6L+e5o6l77yM562J5b6F546p5a62IChcIiArIGNvdW50ICsgXCIvXCIgKyBtYXggKyBcIilcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uUm9vbVN0YXRlID0gKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTXVsdGlwbGF5ZXJTdGF0dXNGcm9tUm9vbVN0YXRlKHBheWxvYWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkNvbm5lY3RlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25ldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25ldE1hbmFnZXIuc2VuZFBsYXllclNldHVwKHRoaXMuX2J1aWxkTXVsdGlwbGF5ZXJQbGF5ZXJTZXR1cCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkdhbWVTdGFydCA9IChwbGF5ZXJJZCwgcGxheWVyQ291bnQsIHNwYXduU2xvdHMsIGVuZXJnaWVzLCBwbGF5ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0TXVsdGlwbGF5ZXJNYXRjaChwbGF5ZXJJZCwgcGxheWVyQ291bnQgfHwgMiwgc3Bhd25TbG90cyB8fCBbXSwgZW5lcmdpZXMgfHwgW10sIHBsYXllcnMgfHwgW10pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkdhbWVFbmRlZCA9IChwYXlsb2FkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZE11bHRpcGxheWVyTWF0Y2gocGF5bG9hZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLm9uRGlzY29ubmVjdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd011bHRpcGxheWVyU3RhdHVzKFwi6L+e5o6l5pat5byAXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9uZXRNYW5hZ2VyLmNvbm5lY3QoXCJ3czovL2xvY2FsaG9zdDoyNTY3XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydE11bHRpcGxheWVyTWF0Y2gocGxheWVySWQsIHBsYXllckNvdW50LCBzcGF3blNsb3RzLCBlbmVyZ2llcywgcGxheWVycyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5faGlkZU11bHRpcGxheWVyU3RhdHVzKCk7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyTG9jYWxEZWFkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJIaXRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVyRmlyZVNlcSA9IDE7XHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJJbnB1dHMgPSB7IHVwOiBmYWxzZSwgZG93bjogZmFsc2UsIGxlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIGZpcmU6IGZhbHNlLCBoaXQ6IGZhbHNlIH07XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRNdWx0aXBsYXllckdhbWUocGxheWVyQ291bnQgfHwgMiwgcGxheWVySWQsIHNwYXduU2xvdHMgfHwgW10sIGVuZXJnaWVzIHx8IFtdLCBwbGF5ZXJzIHx8IFtdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3VpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuX3NldHVwTXVsdGlwbGF5ZXJJbnB1dExvb3AoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfdGVhcmRvd25NdWx0aXBsYXllcklucHV0TG9vcCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKHRoaXMuX211bHRpcGxheWVySW5wdXRMb29wVGFnKTtcclxuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlcikge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiam95LXN0aWNrXCIsIHRoaXMuX211bHRpcGxheWVySm95TW92ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckpveU1vdmVIYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJqb3ktc3RpY2stc2hvb3RcIiwgdGhpcy5fbXVsdGlwbGF5ZXJKb3lTaG9vdEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckpveVNob290SGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsYXllckNhbWVyYUZvbGxvd0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLl9tdWx0aXBsYXllckNhbWVyYUZvbGxvd0NhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zZXR1cE11bHRpcGxheWVySW5wdXRMb29wKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk11bHRpcGxheWVySW5wdXRMb29wKCk7XHJcblxyXG4gICAgICAgIC8vIFRyYWNrIG1vdmVtZW50IHZpYSBqb3ktc3RpY2sgRVZFTlQgKGZpcmVzIHJhdGlvOjAgb24gcmVsZWFzZSwgcmVsaWFibGUpXHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJKb3lNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX211bHRpcGxheWVyQWN0aXZlIHx8IHNlbGYuX211bHRpcGxheWVyTG9jYWxEZWFkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChldmVudC5yYXRpbyA+IDAgJiYgZXZlbnQuZGlyICYmIGV2ZW50LmRpci5tYWdTcXIoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnVwID0gZXZlbnQuZGlyLnkgPiAwLjM7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9tdWx0aXBsYXllcklucHV0cy5kb3duID0gZXZlbnQuZGlyLnkgPCAtMC4zO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJJbnB1dHMubGVmdCA9IGV2ZW50LmRpci54IDwgLTAuMztcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnJpZ2h0ID0gZXZlbnQuZGlyLnggPiAwLjM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyByYXRpbz09MCBtZWFucyBmaW5nZXIgbGlmdGVkIOKAlCBjbGVhciBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJJbnB1dHMudXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImpveS1zdGlja1wiLCB0aGlzLl9tdWx0aXBsYXllckpveU1vdmVIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gVHJhY2sgZmlyZSB2aWEgZXZlbnQgKHNpbmdsZS1zaG90IGV2ZW50KVxyXG4gICAgICAgIHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5fbXVsdGlwbGF5ZXJBY3RpdmUgfHwgc2VsZi5fbXVsdGlwbGF5ZXJMb2NhbERlYWQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmZpcmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmZpcmUgPSBzZWxmLl9idWlsZE11bHRpcGxheWVyRmlyZUNvbW1hbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiam95LXN0aWNrLXNob290XCIsIHRoaXMuX211bHRpcGxheWVySm95U2hvb3RIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gRnJhbWUgc3luYzogbGlzdGVuIGZvciBmcmFtZSBkYXRhIGZyb20gc2VydmVyXHJcbiAgICAgICAgdGhpcy5fbmV0TWFuYWdlci5vbkZyYW1lID0gZnVuY3Rpb24gKGZyYW1lRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX211bHRpcGxheWVyQWN0aXZlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LnNpbXVsYXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zaW11bGF0ZUZyYW1lKGZyYW1lRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZW5kIGxvY2FsIGlucHV0cyBhdCB0aWNrIHJhdGUgKDIwSHopXHJcbiAgICAgICAgbGV0IGlucHV0TG9vcCA9IGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEgLyAyMCksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLl9tdWx0aXBsYXllckFjdGl2ZSB8fCAhc2VsZi5fbmV0TWFuYWdlciB8fCAhc2VsZi5fbmV0TWFuYWdlci5jb25uZWN0ZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fbXVsdGlwbGF5ZXJMb2NhbERlYWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9uZXRNYW5hZ2VyLnNlbmRJbnB1dChzZWxmLl9idWlsZE11bHRpcGxheWVySW5wdXRQYWNrZXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fbXVsdGlwbGF5ZXJJbnB1dHMuZmlyZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLmhpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX211bHRpcGxheWVySW5wdXRzLnBpY2t1cEVuZXJneUlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FtZXJhIGZvbGxvd1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0Ll9jZW50ZXJPbkxvY2FsUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaW5wdXRMb29wLnNldFRhZyh0aGlzLl9tdWx0aXBsYXllcklucHV0TG9vcFRhZyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihpbnB1dExvb3ApO1xyXG5cclxuICAgICAgICAvLyBTbW9vdGggY2FtZXJhIGZvbGxvdyBldmVyeSBmcmFtZSB2aWEgc2NoZWR1bGVyXHJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDYW1lcmFGb2xsb3dDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLl9tdWx0aXBsYXllckFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuX2NlbnRlck9uTG9jYWxQbGF5ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLl9tdWx0aXBsYXllckNhbWVyYUZvbGxvd0NhbGxiYWNrLCAwLjAxNiwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==