
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
        this._fire._lyStart.off(cc.Node.EventType.TOUCH_END, this._onStartClick, this);
        this._destroyTestPanel();
        this._destroyUpgradeChoicePanel();
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
        dialog.setContentSize(1060, 700);
        dialog.zIndex = 1;
        var dialogGraphics = dialog.addComponent(cc.Graphics);
        dialogGraphics.fillColor = cc.color(35, 36, 45, 245);
        dialogGraphics.roundRect(-530, -350, 1060, 700, 18);
        dialogGraphics.fill();
        dialogGraphics.lineWidth = 3;
        dialogGraphics.strokeColor = cc.color(255, 255, 255, 180);
        dialogGraphics.roundRect(-530, -350, 1060, 700, 18);
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
        var rows = [144, 72, 0, -72];
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
        this._createTestButton(dialog, "_btnCoverTest", "掩体测试", cc.v2(columns[1], rows[3]), cc.color(199, 151, 96, 255), this._onCoverTestClick, buttonWidth, buttonHeight, buttonFontSize);
        this._createTestButton(dialog, "_btnCloseTest", "关闭", cc.v2(columns[2], rows[3]), cc.color(180, 180, 190, 255), this._hideTestPanel, 180, 48, 24);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFFbkQsNENBQXlDO0FBQ3pDLDBDQUF1QztBQUN2QywwQ0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQWE7SUFBbkQ7UUFBQSxxRUF1eUJDO1FBcHlCRyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFlLElBQUksQ0FBQyxDQUFJLElBQUk7UUFHdEMsa0JBQVksR0FBZSxJQUFJLENBQUMsQ0FBSSxJQUFJO1FBRXhDLG1CQUFtQjtRQUNuQixjQUFRLEdBQVEsQ0FBQyxDQUFDLENBQU0sTUFBTTtRQUU5QixpQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVSxHQUFHLElBQUksQ0FBQztRQUNsQix5QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0Isd0JBQWtCLEdBQUcsU0FBUyxDQUFDOztJQW14Qm5DLENBQUM7SUFqeEJHLHlCQUFNLEdBQU47UUFDSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixTQUFTO1FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPO0lBQ1AsZ0NBQWEsR0FBYjtJQUNBLENBQUM7SUFFRCxPQUFPO0lBQ1AsMEJBQU8sR0FBUDtRQUNJLFFBQVE7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLElBQUks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RUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDWTtJQVpmLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F1eUI1QjtJQUFELGVBQUM7Q0F2eUJELEFBdXlCQyxDQXZ5QnFDLDZCQUFhLEdBdXlCbEQ7a0JBdnlCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHsgTXVzaWNNYW5hZ2VyIH0gZnJvbSBcIi4vYmFzZS9NdXNpY01hbmFnZXJcIjtcclxuXHJcbmltcG9ydCB7QW5hbHl0aWNzfSBmcm9tIFwiLi9hZC9BbmFseXRpY3NcIjtcclxuaW1wb3J0IHtJbnNlcnRBZH0gZnJvbSBcIi4vYWQvSW5zZXJ0QWRcIjtcclxuaW1wb3J0IHtSZXdhcmRBZH0gZnJvbSBcIi4vYWQvUmV3YXJkQWRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1haW4gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKSBcclxuICAgIGZpbmlzaFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgc2V0dGluZ1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgd2lzaFByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHJldml2ZVByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7ICAgIC8v6L2s55uYXHJcblxyXG4gICAgLy8gX2NzYiA6IGFueSA9IHt9O1xyXG4gICAgX2xldmVsSWQgICAgPSAgIDE7ICAgICAgLy/lvZPliY3lhbPljaFcclxuXHJcbiAgICBfc3RhcnRDb3VudCA9IDA7XHJcbiAgICBfdGVzdFBhbmVsID0gbnVsbDtcclxuICAgIF91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgX3VwZ3JhZGVDaG9pY2VNb2RlID0gXCJ1cGdyYWRlXCI7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZVSVxyXG4gICAgICAgIHRoaXMuX2luaXRVSSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluaOpeaUtuS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWVUlcclxuICAgIF9pbml0VUkoKSB7XHJcbiAgICAgICAgLy/pmpDol4/lvIDlp4vmjInpkq5cclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInl5cC5zYWZlVG9wQm90dG9tXCIseXlwLnNhZmVUb3BCb3R0b20pXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYnRuU2V0dGluZy55ID0geXlwLnNhZmVUb3BCb3R0b20tMzA7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYnRuU2V0dGluZy56SW5kZXggPSAxMDAxO1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9idG5UZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0blRlc3QueSA9IHl5cC5zYWZlVG9wQm90dG9tLTMwO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9idG5UZXN0LnpJbmRleCA9IDEwMDE7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRUZXN0QnV0dG9uVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG4gICAgICAgIFV0aWxzLmRvUUFjdGlvbih0aGlzLl9maXJlLl9idG5XaXNoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl9wcmVEZWZlbnNlLnNjcmlwdC5zZXRJblN0YXJ0KDMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3ByZUJ1bGxldC5zY3JpcHQuc2V0SW5TdGFydCgyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluaOpeaUtuS6i+S7tlxyXG4gICAgX2luaXRFdmVudCgpIHtcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub24oJ2NvbmZpZy1sb2FkZWQnLHRoaXMuX3ByZXBhcmUsdGhpcyk7ICAgICAgICAgICAgICAgICAvL+mFjee9ruWKoOi9veWujOavlVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignY3VycmVudC1sZXZlbGlkJyx0aGlzLl91cGRhdGVMZXZlbGlkLHRoaXMpOyAgICAgICAgIC8v5b2T5YmN5YWz5Y2hXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjdXJyZW50LWVuZW15Y291bnQnLHRoaXMuX3VwZGF0ZUVuZW15Q291bnQsdGhpcyk7ICAgLy/mlYzkurrmlbDph49cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3BsYXllci1kZWF0aCcsdGhpcy5fcGxheWVyRGVhdGgsdGhpcyk7ICAgICAgICAgICAgICAvL3BsYXllcuatu+S6oVxyXG4gICAgICAgIC8vIHl5cC5ldmVudENlbnRlci5vbignYWRkLWNvaW4nLHRoaXMuX2FkZENvaW4sdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5aKe5YqgXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdyZXN0YXJ0Jyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAgLy/ph43mlrDlvIDlp4tcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3VwZGF0ZScsdGhpcy5fdXBkYXRlTXNnLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAgLy/ov5vlhaUv6YCA5Ye65Y2H57qn55WM6Z2iXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwicGxheWVyLXJldml2ZVwiLHRoaXMuX3BsYXllclJldml2ZSx0aGlzKTsgICAgICAgICAgICAgLy/lpI3mtLtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJnYW1lLXBhdXNlXCIsdGhpcy5fZ2FtZVBhdXNlLHRoaXMpOyAgICAgICAgICAgICAgICAgIC8v5pqC5YGcXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiZ2FtZS1yZXN1bWVcIix0aGlzLl9nYW1lUmVzdW1lLHRoaXMpOyAgICAgICAgICAgICAgICAgIC8v5oGi5aSNXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9mZignY29uZmlnLWxvYWRlZCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgIC8v6YWN572u5Yqg6L295a6M5q+VXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY3VycmVudC1sZXZlbGlkJyx0aGlzLl91cGRhdGVMZXZlbGlkLHRoaXMpOyAgICAgICAgIC8v5b2T5YmN5YWz5Y2hXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignY3VycmVudC1lbmVteWNvdW50Jyx0aGlzLl91cGRhdGVFbmVteUNvdW50LHRoaXMpOyAgIC8v5pWM5Lq65pWw6YePXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigncGxheWVyLWRlYXRoJyx0aGlzLl9wbGF5ZXJEZWF0aCx0aGlzKTsgICAgICAgICAgICAgIC8vcGxheWVy5q275LqhXHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9mZignYWRkLWNvaW4nLHRoaXMuX2FkZENvaW4sdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5aKe5YqgXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigncmVzdGFydCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZigndXBkYXRlJyx0aGlzLl91cGRhdGVNc2csdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpS/pgIDlh7rljYfnuqfnlYzpnaJcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwicGxheWVyLXJldml2ZVwiLHRoaXMuX3BsYXllclJldml2ZSx0aGlzKTsgICAgICAgICAgICAgLy/lpI3mtLtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiZ2FtZS1wYXVzZVwiLHRoaXMuX2dhbWVQYXVzZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aaguWBnFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJnYW1lLXJlc3VtZVwiLHRoaXMuX2dhbWVSZXN1bWUsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVRlc3RQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lVcGdyYWRlQ2hvaWNlUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcclxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g5b2T5YmN5YWz5Y2hXHJcbiAgICBfdXBkYXRlTGV2ZWxpZChldmVudCl7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IGV2ZW50LmxldmVsaWQ7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJMZXZlbC4kTGFiZWwuc3RyaW5nID0gXCJMZXZlbDpcIiArIGV2ZW50LmxldmVsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pWM5Lq65pWw6YePXHJcbiAgICBfdXBkYXRlRW5lbXlDb3VudChldmVudCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJFbmVteS4kTGFiZWwuc3RyaW5nID0gZXZlbnQuZW5lbXljb3VudDtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmlzVGVzdE1vZGUgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmlzVGVzdE1vZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC5lbmVteWNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgTG9jYWxpemVkRGF0YS5zZXRJbnRJdGVtKFwiX2xldmVsMV9cIiwgdGhpcy5fbGV2ZWxJZCArIDEpO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJ3aW4hISEhISEhISEhIVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5zY3JpcHQucmVmcmVzaExldmVsSW5mbygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnNldEZpbmlzaCgpO1xyXG5cclxuICAgICAgICAgICAgLy/mmL7npLrog5zliKnnlYzpnaJcclxuICAgICAgICAgICAgbGV0IGZpbmlzaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmluaXNoUHJlZmFiKTtcclxuICAgICAgICAgICAgZmluaXNoLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgICAgIFV0aWxzLmFkZHRvQ3VycmVudFNjZW5lKGZpbmlzaCk7XHJcbiAgICAgICAgICAgIGZpbmlzaC5zY3JpcHQuc2V0UmVzdWx0KHRoaXMuX2xldmVsSWQsdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeOqeWutuatu+S6oVxyXG4gICAgX3BsYXllckRlYXRoKGV2ZW50KXtcclxuICAgICAgICAvLyBjYy5sb2coXCJmYWlsZWQhISEhISEhISEhIVwiKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChSZXdhcmRBZC5nZXRJbnN0YW5jZSgpLmlzTG9hZCgpKSB7XHJcbiAgICAgICAgICAgIC8v5pi+56S65aSN5rS755WM6Z2iXHJcbiAgICAgICAgICAgIGxldCByZXZpdmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJldml2ZVByZWZhYik7XHJcbiAgICAgICAgICAgIHJldml2ZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShyZXZpdmUpO1xyXG4gICAgICAgICAgICByZXZpdmUuc2NyaXB0LmluaXQodGhpcy5fbGV2ZWxJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXllclJldml2ZSh7dHlwZTpmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBfcGxheWVyUmV2aXZlKGV2ZW50KXtcclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8v5aSN5rS7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5yZXZpdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLnNjcmlwdC5yZWZyZXNoTGV2ZWxJbmZvKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zZXRGaW5pc2goKTtcclxuXHJcbiAgICAgICAgICAgIC8v5pi+56S65aSx6LSl55WM6Z2iXHJcbiAgICAgICAgICAgIGxldCBmaW5pc2ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmlzaFByZWZhYik7XHJcbiAgICAgICAgICAgIGZpbmlzaC56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShmaW5pc2gpO1xyXG4gICAgICAgICAgICBmaW5pc2guc2NyaXB0LnNldFJlc3VsdCh0aGlzLl9sZXZlbElkLGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9nYW1lUGF1c2UoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucGF1c2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgX2dhbWVSZXN1bWUoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucmVzdW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YeR5biB5aKe5YqgXHJcbiAgICAvLyBfYWRkQ29pbihldmVudCl7XHJcbiAgICAvLyAgICAgdGhpcy5fZmlyZS5fbHlDb2luLnNjcmlwdC5yZWZyZXNoKGV2ZW50LmNvdW50LGV2ZW50LnBvc2l0aW9uKTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy/lh4blpIflvIDlp4tcclxuICAgIF9wcmVwYXJlKGV2ZW50KXtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5riF56m65Zy65pmvXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmNsZWFuTWFwKCk7ICBcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRDb3VudCsrO1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydENvdW50ID49Mykge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChJbnNlcnRBZC5nZXRJbnN0YW5jZSgpLmlzTG9hZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGFydENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIEluc2VydEFkLmdldEluc3RhbmNlKCkuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3VwZGF0ZU1zZyhldmVudCl7XHJcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT0gJ2luJykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PSAnb3V0Jykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmjInpkq5cclxuICAgIF9vblN0YXJ0Q2xpY2soKXtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcblxyXG4gICAgICAgIC8v6ZqQ6JeP5byA5aeL5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fblVwZGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYWREZWZlbnNlLnNjcmlwdC5zZXRBRCgzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9hZEJ1bGxldC5zY3JpcHQuc2V0QUQoMik7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYWRMaWZlLnNjcmlwdC5zZXRBRCgxKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyDlvIDlp4vmuLjmiI9cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl9wcmVEZWZlbnNlLnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3ByZUJ1bGxldC5zY3JpcHQuZW1pdFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+aMiemSrlxyXG4gICAgb25TZXR0aW5nQ2xpY2soKXtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICBVdGlscy5zaG93RGlhbG9ncyh0aGlzLnNldHRpbmdQcmVmYWIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eCueWHu+aYvuekuui9rOebmOaMiemSrlxyXG4gICAgb25XaXNoQnRuQ2xpY2soKXtcclxuICAgICAgICBBbmFseXRpY3MuZ2V0SW5zdGFuY2UoKS5ldmVudCgnZW50ZXJfd2lzaCcpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpOyAgICAvL+aMiemSrumfs+aViFxyXG4gICAgICAgIFV0aWxzLnNob3dEaWFsb2dzKHRoaXMud2lzaFByZWZhYik7XHJcbiAgICB9XHJcblxyXG4gICAgb25UZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB0aGlzLl9zaG93VGVzdFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRUZXN0QnV0dG9uVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fYnRuVGVzdC5nZXRDaGlsZEJ5TmFtZShcIl9sYlRlc3RCdG5cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2xiVGVzdEJ0blwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fYnRuVGVzdDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fYnRuVGVzdC53aWR0aCwgdGhpcy5fZmlyZS5fYnRuVGVzdC5oZWlnaHQpO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi5rWLXCI7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyODtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMzI7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dUZXN0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYW5lbCA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3RQYW5lbFwiKTtcclxuICAgICAgICBwYW5lbC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcGFuZWwuc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAyMDAwO1xyXG4gICAgICAgIHRoaXMuX3Rlc3RQYW5lbCA9IHBhbmVsO1xyXG5cclxuICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3RNYXNrXCIpO1xyXG4gICAgICAgIG1hc2sucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgbWFzay5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIGxldCBtYXNrR3JhcGhpY3MgPSBtYXNrLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDE1MCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLnJlY3QoLTY0MCwgLTM2MCwgMTI4MCwgNzIwKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIG1hc2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9oaWRlVGVzdFBhbmVsLCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGRpYWxvZyA9IG5ldyBjYy5Ob2RlKFwiX3Rlc3REaWFsb2dcIik7XHJcbiAgICAgICAgZGlhbG9nLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIGRpYWxvZy5zZXRDb250ZW50U2l6ZSgxMDYwLCA3MDApO1xyXG4gICAgICAgIGRpYWxvZy56SW5kZXggPSAxO1xyXG4gICAgICAgIGxldCBkaWFsb2dHcmFwaGljcyA9IGRpYWxvZy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDM1LCAzNiwgNDUsIDI0NSk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC01MzAsIC0zNTAsIDEwNjAsIDcwMCwgMTgpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMTgwKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTUzMCwgLTM1MCwgMTA2MCwgNzAwLCAxOCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZGlhbG9nLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0TGFiZWwoZGlhbG9nLCBcIl9sYlRlc3RUaXRsZVwiLCBcIua1i+ivlemdouadv1wiLCBjYy52MigwLCAyNzYpLCAzNCwgY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdExhYmVsKGRpYWxvZywgXCJfbGJUZXN0VGlwc1wiLCBcIuS8muWFiOmHjee9ruW9k+WJjea4uOaIj+eKtuaAge+8jOWGjei/m+WFpea1i+ivleWcuuaZr1wiLCBjYy52MigwLCAyMzQpLCAyMiwgY2MuY29sb3IoMjEwLCAyMTAsIDIyMCwgMjU1KSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25XaWR0aCA9IDIyMDtcclxuICAgICAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gNTQ7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkZvbnRTaXplID0gMjI7XHJcbiAgICAgICAgbGV0IGNvbHVtbnMgPSBbLTM2MCwgLTEyMCwgMTIwLCAzNjBdO1xyXG4gICAgICAgIGxldCByb3dzID0gWzE0NCwgNzIsIDAsIC03Ml07XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5LaWxsRWZmZWN0VGVzdFwiLCBcIuWHu+adgOaViOaenOa1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzBdKSwgY2MuY29sb3IoMjU1LCA5MCwgNzAsIDI1NSksIHRoaXMuX29uS2lsbFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5IaXRUZXN0XCIsIFwi5Y+X5Ye75pWI5p6c5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbMF0pLCBjYy5jb2xvcig4MCwgMTgwLCAyNTUsIDI1NSksIHRoaXMuX29uSGl0VGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blVwZ3JhZGVUZXN0XCIsIFwi5Y2H57qn5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbMF0pLCBjYy5jb2xvcigxMTUsIDI1NSwgMTcwLCAyNTUpLCB0aGlzLl9vblVwZ3JhZGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuTXV0YXRpb25UZXN0XCIsIFwi5a2Q5by56LSo5Y+Y5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMF0pLCBjYy5jb2xvcigyNTUsIDEyMCwgMjEwLCAyNTUpLCB0aGlzLl9vbkJ1bGxldE11dGF0aW9uVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5TaG9vdEVmZmVjdFRlc3RcIiwgXCLlrZDlvLnlsITlh7vmtYvor5VcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMjA1LCA5MCwgMjU1KSwgdGhpcy5fb25TaG9vdEVmZmVjdFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5QbGF5ZXJMb3dIcFRlc3RcIiwgXCLoh6rlt7HooYDph4/lkYrmgKVcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMTEwLCAxMTAsIDI1NSksIHRoaXMuX29uUGxheWVyTG93SHBUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuRW5lbXlMb3dIcFRlc3RcIiwgXCLmlYzkurrooYDph4/lkYrmgKVcIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1sxXSksIGNjLmNvbG9yKDI1NSwgMTY1LCA3MCwgMjU1KSwgdGhpcy5fb25FbmVteUxvd0hwVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bktpbGxCcm9hZGNhc3RUZXN0XCIsIFwi5Ye75p2A5bm/5pKtXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMV0pLCBjYy5jb2xvcigxNzUsIDEyMCwgMjU1LCAyNTUpLCB0aGlzLl9vbktpbGxCcm9hZGNhc3RUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNhY3JpZmljZVRlc3RcIiwgXCLnjK7npa3mtYvor5VcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1syXSksIGNjLmNvbG9yKDI1NSwgOTIsIDkyLCAyNTUpLCB0aGlzLl9vblNhY3JpZmljZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Qb3J0YWxUZXN0XCIsIFwi5Lyg6YCB6Zeo5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMV0sIHJvd3NbMl0pLCBjYy5jb2xvcigxMTAsIDI1NSwgMjQ1LCAyNTUpLCB0aGlzLl9vblBvcnRhbFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DZW50cmlmdWdhbFJpbmdUZXN0XCIsIFwi56a75b+D5Yqb5ZyI5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMl0sIHJvd3NbMl0pLCBjYy5jb2xvcigyNTUsIDE2MCwgOTAsIDI1NSksIHRoaXMuX29uQ2VudHJpZnVnYWxSaW5nVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bk9pbFNwaWxsVGVzdFwiLCBcIueEpuayueW8uea1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzJdKSwgY2MuY29sb3IoMTY1LCAxMTgsIDcyLCAyNTUpLCB0aGlzLl9vbk9pbFNwaWxsVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Db3ZlclRlc3RcIiwgXCLmjqnkvZPmtYvor5VcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1szXSksIGNjLmNvbG9yKDE5OSwgMTUxLCA5NiwgMjU1KSwgdGhpcy5fb25Db3ZlclRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DbG9zZVRlc3RcIiwgXCLlhbPpl61cIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1szXSksIGNjLmNvbG9yKDE4MCwgMTgwLCAxOTAsIDI1NSksIHRoaXMuX2hpZGVUZXN0UGFuZWwsIDE4MCwgNDgsIDI0KTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVGVzdExhYmVsKHBhcmVudCwgbmFtZSwgdGV4dCwgcG9zLCBmb250U2l6ZSwgY29sb3IpIHtcclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNDIwLCA0Mik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY29sb3I7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gZm9udFNpemUgKyA2O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBsYWJlbE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVRlc3RCdXR0b24ocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIHN0cm9rZUNvbG9yLCBoYW5kbGVyLCB3aWR0aCA9IDI2MCwgaGVpZ2h0ID0gNTgsIGZvbnRTaXplID0gMjgpIHtcclxuICAgICAgICBsZXQgYnRuID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgYnRuLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBidG4uc2V0Q29udGVudFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgYnRuLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgYnRuLnpJbmRleCA9IDEwMDtcclxuXHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYnRuLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoNDgsIDQ4LCA1NSwgMjMwKTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQsIDEyKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IHN0cm9rZUNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUobmFtZSArIFwiTGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ0bjtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSBmb250U2l6ZSArIDQ7XHJcbiAgICAgICAgLy8gbGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5TSFJJTks7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIGJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBidG47XHJcbiAgICB9XHJcblxyXG4gICAgX29uS2lsbFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJraWxsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkhpdFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJoaXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uVXBncmFkZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJ1cGdyYWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkJ1bGxldE11dGF0aW9uVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcIm11dGF0aW9uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNob290RWZmZWN0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNob290XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblBsYXllckxvd0hwVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInBsYXllckxvd0hwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkVuZW15TG93SHBUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiZW5lbXlMb3dIcFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25LaWxsQnJvYWRjYXN0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImtpbGxCcm9hZGNhc3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uUG9ydGFsVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInBvcnRhbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25DZW50cmlmdWdhbFJpbmdUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiY2VudHJpZnVnYWxSaW5nXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNhY3JpZmljZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJzYWNyaWZpY2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uT2lsU3BpbGxUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwib2lsU3BpbGxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQ292ZXJUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiY292ZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX3N0YXJ0VGVzdEdhbWUodHlwZSkge1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVUZXN0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9yZXNldEdhbWVCZWZvcmVUZXN0KCk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIix7dmlzaWJsZTp0eXBlID09IFwic2FjcmlmaWNlXCJ9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLHttb2RlOlwiY2hhcmdlXCJ9KTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb21wbGV0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3VpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJraWxsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0S2lsbEVmZmVjdFRlc3RHYW1lKGNvbXBsZXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInVwZ3JhZGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zaG93VXBncmFkZUNob2ljZVBhbmVsKFwidXBncmFkZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJtdXRhdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3Nob3dVcGdyYWRlQ2hvaWNlUGFuZWwoXCJtdXRhdGlvblwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJzaG9vdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFNob290RWZmZWN0VGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwicGxheWVyTG93SHBcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gc2VsZi5fZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllciAmJiBwbGF5ZXIuc2NyaXB0ICYmIHBsYXllci5zY3JpcHQuZGVidWdTZXRMb3dIcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5zY3JpcHQuZGVidWdTZXRMb3dIcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImVuZW15TG93SHBcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fZmlyZS5fdGlsZWQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0ICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jcmVhdGVMb3dIcFRlc3RFbmVteSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jcmVhdGVMb3dIcFRlc3RFbmVteSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInNhY3JpZmljZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJraWxsQnJvYWRjYXN0XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0S2lsbEJyb2FkY2FzdFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInBvcnRhbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFBvcnRhbFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImNlbnRyaWZ1Z2FsUmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENlbnRyaWZ1Z2FsUmluZ1Rlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcIm9pbFNwaWxsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RpbGVkICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuc3Bhd25PaWxUZXN0UGlja3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LnNwYXduT2lsVGVzdFBpY2t1cCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImNvdmVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0Q292ZXJUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFBsYXllckhpdFRlc3RHYW1lKGNvbXBsZXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0R2FtZUJlZm9yZVRlc3QoKSB7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY292ZXItYnV0dG9uLXN0YXRlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl90aWxlZCAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LmNsZWFuTWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOmNjLnYyKDAsIDEpLCByYXRpbzowfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIse30pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVUZXN0UGFuZWwoZXZlbnQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveVRlc3RQYW5lbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGVzdFBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdGVzdFBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXN0UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90ZXN0UGFuZWwgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDdXJyZW50UGxheWVyKCkge1xyXG4gICAgICAgIGxldCB0aWxlZCA9IHRoaXMuX2ZpcmUuX3RpbGVkO1xyXG4gICAgICAgIGlmICghdGlsZWQgfHwgIXRpbGVkLnNjcmlwdCB8fCAhdGlsZWQuc2NyaXB0Ll9wbGF5ZXIgfHwgIWNjLmlzVmFsaWQodGlsZWQuc2NyaXB0Ll9wbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGlsZWQuc2NyaXB0Ll9wbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dVcGdyYWRlQ2hvaWNlUGFuZWwobW9kZSA9IFwidXBncmFkZVwiKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX2dldEN1cnJlbnRQbGF5ZXIoKTtcclxuICAgICAgICBpZiAoIXBsYXllcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kZXN0cm95VXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZU1vZGUgPSBtb2RlO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiZ2FtZS1wYXVzZVwiLHt9KTtcclxuXHJcbiAgICAgICAgbGV0IHBhbmVsID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUNob2ljZVBhbmVsXCIpO1xyXG4gICAgICAgIHBhbmVsLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBwYW5lbC5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDIxMDA7XHJcbiAgICAgICAgcGFuZWwuYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCA9IHBhbmVsO1xyXG5cclxuICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VNYXNrXCIpO1xyXG4gICAgICAgIG1hc2sucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgbWFzay5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIGxldCBtYXNrR3JhcGhpY3MgPSBtYXNrLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGxDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDE2OCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLnJlY3QoLTY0MCwgLTM2MCwgMTI4MCwgNzIwKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgZGlhbG9nID0gbmV3IGNjLk5vZGUoXCJfdXBncmFkZUNob2ljZURpYWxvZ1wiKTtcclxuICAgICAgICBkaWFsb2cucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgZGlhbG9nLnNldENvbnRlbnRTaXplKDk4MCwgNDMwKTtcclxuICAgICAgICBkaWFsb2cuekluZGV4ID0gMTtcclxuICAgICAgICBsZXQgZGlhbG9nR3JhcGhpY3MgPSBkaWFsb2cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyMiwgMjYsIDM4LCAyNDUpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnJvdW5kUmVjdCgtNDkwLCAtMjE1LCA5ODAsIDQzMCwgMjQpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMTIwKTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTQ5MCwgLTIxNSwgOTgwLCA0MzAsIDI0KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBkaWFsb2cub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZSA9IG1vZGUgPT0gXCJtdXRhdGlvblwiID8gXCLpgInmi6nkuIDnp43lrZDlvLnotKjlj5hcIiA6IFwi6YCJ5oup5LiA6aG55Y2H57qnXCI7XHJcbiAgICAgICAgbGV0IHRpcHMgPSBtb2RlID09IFwibXV0YXRpb25cIiA/IFwiM+mAiTHvvIzpgInkuK3lkI7nq4vliLvmm7/mjaLlvZPliY3lrZDlvLlcIiA6IFwiM+mAiTHvvIznq4vljbPnlJ/mlYhcIjtcclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChkaWFsb2csIFwiX2xiVXBncmFkZVRpdGxlXCIsIHRpdGxlLCBjYy52MigwLCAxNjApLCAzNiwgY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwoZGlhbG9nLCBcIl9sYlVwZ3JhZGVUaXBzXCIsIHRpcHMsIGNjLnYyKDAsIDExOCksIDIyLCBjYy5jb2xvcigyMDAsIDIxMCwgMjI1LCAyNTUpKTtcclxuXHJcbiAgICAgICAgbGV0IGNob2ljZXMgPSBtb2RlID09IFwibXV0YXRpb25cIlxyXG4gICAgICAgICAgICA/IHBsYXllci5zY3JpcHQuZ2V0VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlcygpXHJcbiAgICAgICAgICAgIDogcGxheWVyLnNjcmlwdC5nZXRUZXN0VXBncmFkZUNob2ljZXMoKTtcclxuICAgICAgICBsZXQgc3RhcnRYID0gLTI4MDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNob2ljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLl9jcmVhdGVVcGdyYWRlQ2hvaWNlQ2FyZChkaWFsb2csIGNob2ljZXNbaV0sIGNjLnYyKHN0YXJ0WCArIGkgKiAyODAsIC0xMCkpO1xyXG4gICAgICAgICAgICBjYXJkLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBjYXJkLnNjYWxlWCA9IDAuMDU7XHJcbiAgICAgICAgICAgIGNhcmQuc2NhbGVZID0gMC45MjtcclxuICAgICAgICAgICAgY2FyZC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoaSAqIDAuMDUpLFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMDgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xMiwgMS4xMiwgMS4wNilcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDcsIDAuOTYsIDEuMDIpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA2LCAxLjAzLCAwLjk5KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNSwgMSwgMSlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChwYXJlbnQsIG5hbWUsIHRleHQsIHBvcywgZm9udFNpemUsIGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDcwMCwgZm9udFNpemUgKyAxMCk7XHJcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSBmb250U2l6ZSArIDQ7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVXBncmFkZUNob2ljZUNhcmQocGFyZW50LCBjaG9pY2UsIHBvcykge1xyXG4gICAgICAgIGxldCBjYXJkID0gbmV3IGNjLk5vZGUoXCJfY2FyZF9cIiArIGNob2ljZS5pZCk7XHJcbiAgICAgICAgY2FyZC5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgY2FyZC5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGNhcmQuc2V0Q29udGVudFNpemUoMjQwLCAyNzApO1xyXG4gICAgICAgIGNhcmRbXCJfX3VwZ3JhZGVDaG9pY2VcIl0gPSBjaG9pY2U7XHJcblxyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGNhcmQuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigzOCwgNDMsIDU4LCAyNDUpO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtMTIwLCAtMTM1LCAyNDAsIDI3MCwgMTgpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2hvaWNlLmNvbG9yO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtMTIwLCAtMTM1LCAyNDAsIDI3MCwgMTgpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgZ2xvdyA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRHbG93XCIpO1xyXG4gICAgICAgIGdsb3cucGFyZW50ID0gY2FyZDtcclxuICAgICAgICBsZXQgZ2xvd0dyYXBoaWNzID0gZ2xvdy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcihjaG9pY2UuY29sb3IuciwgY2hvaWNlLmNvbG9yLmcsIGNob2ljZS5jb2xvci5iLCAzNCk7XHJcbiAgICAgICAgZ2xvd0dyYXBoaWNzLnJvdW5kUmVjdCgtMTEyLCAtMTI3LCAyMjQsIDI1NCwgMTYpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpY29uID0gbmV3IGNjLk5vZGUoXCJfY2FyZEljb25cIik7XHJcbiAgICAgICAgaWNvbi5wYXJlbnQgPSBjYXJkO1xyXG4gICAgICAgIGljb24uc2V0UG9zaXRpb24oMCwgNzQpO1xyXG4gICAgICAgIGxldCBpY29uR3JhcGhpY3MgPSBpY29uLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmZpbGxDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBpY29uR3JhcGhpY3MuY2lyY2xlKDAsIDAsIDM0KTtcclxuICAgICAgICBpY29uR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDIyMCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmNpcmNsZSgwLCAwLCAzNCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbkxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRJY29uTGFiZWxcIik7XHJcbiAgICAgICAgaWNvbkxhYmVsTm9kZS5wYXJlbnQgPSBpY29uO1xyXG4gICAgICAgIGljb25MYWJlbE5vZGUuc2V0Q29udGVudFNpemUoNzgsIDQwKTtcclxuICAgICAgICBsZXQgaWNvbkxhYmVsID0gaWNvbkxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGljb25MYWJlbC5zdHJpbmcgPSBjaG9pY2Uuc2hvcnRMYWJlbDtcclxuICAgICAgICBpY29uTGFiZWwuZm9udFNpemUgPSBjaG9pY2Uuc2hvcnRMYWJlbC5sZW5ndGggPiAyID8gMTggOiAyMjtcclxuICAgICAgICBpY29uTGFiZWwubGluZUhlaWdodCA9IDI0O1xyXG4gICAgICAgIGljb25MYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGljb25MYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGNhcmQsIFwiX2NhcmRUaXRsZVwiLCBjaG9pY2UudGl0bGUsIGNjLnYyKDAsIDE2KSwgMjgsIGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGNhcmQsIFwiX2NhcmRWYWx1ZVwiLCBjaG9pY2UudmFsdWVUZXh0LCBjYy52MigwLCAtMzQpLCA0MCwgY2hvaWNlLmNvbG9yKTtcclxuXHJcbiAgICAgICAgbGV0IGRlc2NOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2FyZERlc2NcIik7XHJcbiAgICAgICAgZGVzY05vZGUucGFyZW50ID0gY2FyZDtcclxuICAgICAgICBkZXNjTm9kZS5zZXRQb3NpdGlvbigwLCAtOTIpO1xyXG4gICAgICAgIGRlc2NOb2RlLnNldENvbnRlbnRTaXplKDE5MCwgNTYpO1xyXG4gICAgICAgIGRlc2NOb2RlLmNvbG9yID0gY2MuY29sb3IoMjAwLCAyMTAsIDIyNSwgMjIwKTtcclxuICAgICAgICBsZXQgZGVzY0xhYmVsID0gZGVzY05vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBkZXNjTGFiZWwuc3RyaW5nID0gY2hvaWNlLmRlc2M7XHJcbiAgICAgICAgZGVzY0xhYmVsLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgZGVzY0xhYmVsLmxpbmVIZWlnaHQgPSAyNjtcclxuICAgICAgICBkZXNjTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBkZXNjTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICBjYXJkLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25VcGdyYWRlQ2hvaWNlU2VsZWN0LCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gY2FyZDtcclxuICAgIH1cclxuXHJcbiAgICBfb25VcGdyYWRlQ2hvaWNlU2VsZWN0KGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYXJkID0gZXZlbnQgPyBldmVudC5jdXJyZW50VGFyZ2V0IDogbnVsbDtcclxuICAgICAgICBsZXQgY2hvaWNlID0gY2FyZCA/IGNhcmRbXCJfX3VwZ3JhZGVDaG9pY2VcIl0gOiBudWxsO1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgIXBsYXllciB8fCAhcGxheWVyLnNjcmlwdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuTFVwXCIpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwoKTtcclxuICAgICAgICBpZiAodGhpcy5fdXBncmFkZUNob2ljZU1vZGUgPT0gXCJtdXRhdGlvblwiICYmIHBsYXllci5zY3JpcHQuYXBwbHlUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2UpIHtcclxuICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5hcHBseVRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZShjaG9pY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LmFwcGx5VGVzdFVwZ3JhZGVDaG9pY2UoY2hvaWNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hpZGVVcGdyYWRlQ2hvaWNlUGFuZWwocmVzdW1lR2FtZSA9IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgICAgIGlmIChyZXN1bWVHYW1lKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiZ2FtZS1yZXN1bWVcIix7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9kZXN0cm95VXBncmFkZUNob2ljZVBhbmVsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZU1vZGUgPSBcInVwZ3JhZGVcIjtcclxuICAgIH1cclxufVxyXG4iXX0=