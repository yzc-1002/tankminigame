
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFFbkQsNENBQXlDO0FBQ3pDLDBDQUF1QztBQUN2QywwQ0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQWE7SUFBbkQ7UUFBQSxxRUFrNEJDO1FBLzNCRyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFlLElBQUksQ0FBQyxDQUFJLElBQUk7UUFHdEMsa0JBQVksR0FBZSxJQUFJLENBQUMsQ0FBSSxJQUFJO1FBRXhDLG1CQUFtQjtRQUNuQixjQUFRLEdBQVEsQ0FBQyxDQUFDLENBQU0sTUFBTTtRQUU5QixpQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVSxHQUFHLElBQUksQ0FBQztRQUNsQix5QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0Isd0JBQWtCLEdBQUcsU0FBUyxDQUFDOztJQTgyQm5DLENBQUM7SUE1MkJHLHlCQUFNLEdBQU47UUFDSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixTQUFTO1FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPO0lBQ1AsZ0NBQWEsR0FBYjtJQUNBLENBQUM7SUFFRCxPQUFPO0lBQ1AsMEJBQU8sR0FBUDtRQUNJLFFBQVE7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLElBQUks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QUFFLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUI7UUFDSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ2xFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBOTNCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNZO0lBWmYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQWs0QjVCO0lBQUQsZUFBQztDQWw0QkQsQUFrNEJDLENBbDRCcUMsNkJBQWEsR0FrNEJsRDtrQkFsNEJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtMb2NhbGl6ZWREYXRhfSBmcm9tIFwiLi9iYXNlL0xvY2FsaXplZERhdGFcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5cclxuaW1wb3J0IHtBbmFseXRpY3N9IGZyb20gXCIuL2FkL0FuYWx5dGljc1wiO1xyXG5pbXBvcnQge0luc2VydEFkfSBmcm9tIFwiLi9hZC9JbnNlcnRBZFwiO1xyXG5pbXBvcnQge1Jld2FyZEFkfSBmcm9tIFwiLi9hZC9SZXdhcmRBZFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFpbiBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpIFxyXG4gICAgZmluaXNoUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBzZXR0aW5nUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB3aXNoUHJlZmFiIDogY2MuUHJlZmFiID0gbnVsbDsgICAgLy/ovaznm5hcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcmV2aXZlUHJlZmFiIDogY2MuUHJlZmFiID0gbnVsbDsgICAgLy/ovaznm5hcclxuXHJcbiAgICAvLyBfY3NiIDogYW55ID0ge307XHJcbiAgICBfbGV2ZWxJZCAgICA9ICAgMTsgICAgICAvL+W9k+WJjeWFs+WNoVxyXG5cclxuICAgIF9zdGFydENvdW50ID0gMDtcclxuICAgIF90ZXN0UGFuZWwgPSBudWxsO1xyXG4gICAgX3VwZ3JhZGVDaG9pY2VQYW5lbCA9IG51bGw7XHJcbiAgICBfdXBncmFkZUNob2ljZU1vZGUgPSBcInVwZ3JhZGVcIjtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpIHtcclxuICAgICAgICAvL+makOiXj+W8gOWni+aMiemSrlxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieXlwLnNhZmVUb3BCb3R0b21cIix5eXAuc2FmZVRvcEJvdHRvbSlcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnkgPSB5eXAuc2FmZVRvcEJvdHRvbS0zMDtcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5TZXR0aW5nLnpJbmRleCA9IDEwMDE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2J0blRlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuVGVzdC55ID0geXlwLnNhZmVUb3BCb3R0b20tMzA7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0blRlc3QuekluZGV4ID0gMTAwMTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdFRlc3RCdXR0b25WaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgVXRpbHMuZG9RQWN0aW9uKHRoaXMuX2ZpcmUuX2J0bldpc2gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3ByZURlZmVuc2Uuc2NyaXB0LnNldEluU3RhcnQoMyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcHJlQnVsbGV0LnNjcmlwdC5zZXRJblN0YXJ0KDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIC8vIHl5cC5ldmVudENlbnRlci5vbignY29uZmlnLWxvYWRlZCcsdGhpcy5fcHJlcGFyZSx0aGlzKTsgICAgICAgICAgICAgICAgIC8v6YWN572u5Yqg6L295a6M5q+VXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdjdXJyZW50LWxldmVsaWQnLHRoaXMuX3VwZGF0ZUxldmVsaWQsdGhpcyk7ICAgICAgICAgLy/lvZPliY3lhbPljaFcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ2N1cnJlbnQtZW5lbXljb3VudCcsdGhpcy5fdXBkYXRlRW5lbXlDb3VudCx0aGlzKTsgICAvL+aVjOS6uuaVsOmHj1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigncGxheWVyLWRlYXRoJyx0aGlzLl9wbGF5ZXJEZWF0aCx0aGlzKTsgICAgICAgICAgICAgIC8vcGxheWVy5q275LqhXHJcbiAgICAgICAgLy8geXlwLmV2ZW50Q2VudGVyLm9uKCdhZGQtY29pbicsdGhpcy5fYWRkQ29pbix0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3Jlc3RhcnQnLHRoaXMuX3ByZXBhcmUsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndXBkYXRlJyx0aGlzLl91cGRhdGVNc2csdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpS/pgIDlh7rljYfnuqfnlYzpnaJcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJwbGF5ZXItcmV2aXZlXCIsdGhpcy5fcGxheWVyUmV2aXZlLHRoaXMpOyAgICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImdhbWUtcGF1c2VcIix0aGlzLl9nYW1lUGF1c2UsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mmoLlgZxcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJnYW1lLXJlc3VtZVwiLHRoaXMuX2dhbWVSZXN1bWUsdGhpcyk7ICAgICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25TdGFydENsaWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjb25maWctbG9hZGVkJyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgLy/phY3nva7liqDovb3lrozmr5VcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjdXJyZW50LWxldmVsaWQnLHRoaXMuX3VwZGF0ZUxldmVsaWQsdGhpcyk7ICAgICAgICAgLy/lvZPliY3lhbPljaFcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdjdXJyZW50LWVuZW15Y291bnQnLHRoaXMuX3VwZGF0ZUVuZW15Q291bnQsdGhpcyk7ICAgLy/mlYzkurrmlbDph49cclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdwbGF5ZXItZGVhdGgnLHRoaXMuX3BsYXllckRlYXRoLHRoaXMpOyAgICAgICAgICAgICAgLy9wbGF5ZXLmrbvkuqFcclxuICAgICAgICAvLyB5eXAuZXZlbnRDZW50ZXIub2ZmKCdhZGQtY29pbicsdGhpcy5fYWRkQ29pbix0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCdyZXN0YXJ0Jyx0aGlzLl9wcmVwYXJlLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAgLy/ph43mlrDlvIDlp4tcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd1cGRhdGUnLHRoaXMuX3VwZGF0ZU1zZyx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b5YWlL+mAgOWHuuWNh+e6p+eVjOmdolxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJwbGF5ZXItcmV2aXZlXCIsdGhpcy5fcGxheWVyUmV2aXZlLHRoaXMpOyAgICAgICAgICAgICAvL+Wkjea0u1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJnYW1lLXBhdXNlXCIsdGhpcy5fZ2FtZVBhdXNlLHRoaXMpOyAgICAgICAgICAgICAgICAgIC8v5pqC5YGcXHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImdhbWUtcmVzdW1lXCIsdGhpcy5fZ2FtZVJlc3VtZSx0aGlzKTsgICAgICAgICAgICAgICAgICAvL+aBouWkjVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5U3RhcnQub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25TdGFydENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95VGVzdFBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDlvZPliY3lhbPljaFcclxuICAgIF91cGRhdGVMZXZlbGlkKGV2ZW50KXtcclxuICAgICAgICB0aGlzLl9sZXZlbElkID0gZXZlbnQubGV2ZWxpZDtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYkxldmVsLiRMYWJlbC5zdHJpbmcgPSBcIkxldmVsOlwiICsgZXZlbnQubGV2ZWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmlYzkurrmlbDph49cclxuICAgIF91cGRhdGVFbmVteUNvdW50KGV2ZW50KXtcclxuICAgICAgICB0aGlzLl9maXJlLl9sYkVuZW15LiRMYWJlbC5zdHJpbmcgPSBldmVudC5lbmVteWNvdW50O1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuaXNUZXN0TW9kZSAmJiB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuaXNUZXN0TW9kZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LmVuZW15Y291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBMb2NhbGl6ZWREYXRhLnNldEludEl0ZW0oXCJfbGV2ZWwxX1wiLCB0aGlzLl9sZXZlbElkICsgMSk7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIndpbiEhISEhISEhISEhXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fam95c3RpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLnNjcmlwdC5yZWZyZXNoTGV2ZWxJbmZvKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc2V0RmluaXNoKCk7XHJcblxyXG4gICAgICAgICAgICAvL+aYvuekuuiDnOWIqeeVjOmdolxyXG4gICAgICAgICAgICBsZXQgZmluaXNoID0gY2MuaW5zdGFudGlhdGUodGhpcy5maW5pc2hQcmVmYWIpO1xyXG4gICAgICAgICAgICBmaW5pc2guekluZGV4ID0gMTAwMDtcclxuICAgICAgICAgICAgVXRpbHMuYWRkdG9DdXJyZW50U2NlbmUoZmluaXNoKTtcclxuICAgICAgICAgICAgZmluaXNoLnNjcmlwdC5zZXRSZXN1bHQodGhpcy5fbGV2ZWxJZCx0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g546p5a625q275LqhXHJcbiAgICBfcGxheWVyRGVhdGgoZXZlbnQpe1xyXG4gICAgICAgIC8vIGNjLmxvZyhcImZhaWxlZCEhISEhISEhISEhXCIpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKFJld2FyZEFkLmdldEluc3RhbmNlKCkuaXNMb2FkKCkpIHtcclxuICAgICAgICAgICAgLy/mmL7npLrlpI3mtLvnlYzpnaJcclxuICAgICAgICAgICAgbGV0IHJldml2ZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmV2aXZlUHJlZmFiKTtcclxuICAgICAgICAgICAgcmV2aXZlLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgICAgIFV0aWxzLmFkZHRvQ3VycmVudFNjZW5lKHJldml2ZSk7XHJcbiAgICAgICAgICAgIHJldml2ZS5zY3JpcHQuaW5pdCh0aGlzLl9sZXZlbElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyUmV2aXZlKHt0eXBlOmZhbHNlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIF9wbGF5ZXJSZXZpdmUoZXZlbnQpe1xyXG4gICAgICAgIGlmIChldmVudC50eXBlID09IHRydWUpIHtcclxuICAgICAgICAgICAgLy/lpI3mtLtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnJldml2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuc2NyaXB0LnJlZnJlc2hMZXZlbEluZm8oKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnNldEZpbmlzaCgpO1xyXG5cclxuICAgICAgICAgICAgLy/mmL7npLrlpLHotKXnlYzpnaJcclxuICAgICAgICAgICAgbGV0IGZpbmlzaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmluaXNoUHJlZmFiKTtcclxuICAgICAgICAgICAgZmluaXNoLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgICAgIFV0aWxzLmFkZHRvQ3VycmVudFNjZW5lKGZpbmlzaCk7XHJcbiAgICAgICAgICAgIGZpbmlzaC5zY3JpcHQuc2V0UmVzdWx0KHRoaXMuX2xldmVsSWQsZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX2dhbWVQYXVzZSgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5wYXVzZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfZ2FtZVJlc3VtZSgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5yZXN1bWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDph5HluIHlop7liqBcclxuICAgIC8vIF9hZGRDb2luKGV2ZW50KXtcclxuICAgIC8vICAgICB0aGlzLl9maXJlLl9seUNvaW4uc2NyaXB0LnJlZnJlc2goZXZlbnQuY291bnQsZXZlbnQucG9zaXRpb24pO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvL+WHhuWkh+W8gOWni1xyXG4gICAgX3ByZXBhcmUoZXZlbnQpe1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLHttb2RlOlwiY2hhcmdlXCJ9KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25VcGRhdGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDmuIXnqbrlnLrmma9cclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuY2xlYW5NYXAoKTsgIFxyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl90b2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGFydENvdW50Kys7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0Q291bnQgPj0zKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKEluc2VydEFkLmdldEluc3RhbmNlKCkuaXNMb2FkKCkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3N0YXJ0Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgSW5zZXJ0QWQuZ2V0SW5zdGFuY2UoKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfdXBkYXRlTXNnKGV2ZW50KXtcclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PSAnaW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC50eXBlID09ICdvdXQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3JlY29tbWVuZEJ0bnMucnVuQWN0aW9uKGNjLm1vdmVUbygwLjEsNjAwLDEyMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+aMiemSrlxyXG4gICAgX29uU3RhcnRDbGljaygpe1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJza2lsbC1idXR0b24tbW9kZVwiLHttb2RlOlwiY2hhcmdlXCJ9KTtcclxuICAgICAgICB0aGlzLl9maXJlLl9yZWNvbW1lbmRCdG5zLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4xLDYwMCwxMjApKTtcclxuXHJcbiAgICAgICAgLy/pmpDol4/lvIDlp4vmjInpkq5cclxuICAgICAgICB0aGlzLl9maXJlLl9seVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2pveXN0aWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdWkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl9hZERlZmVuc2Uuc2NyaXB0LnNldEFEKDMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2FkQnVsbGV0LnNjcmlwdC5zZXRBRCgyKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9hZExpZmUuc2NyaXB0LnNldEFEKDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOW8gOWni+a4uOaIj1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90b2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3ByZURlZmVuc2Uuc2NyaXB0LmVtaXRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fcHJlQnVsbGV0LnNjcmlwdC5lbWl0U2tpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5oyJ6ZKuXHJcbiAgICBvblNldHRpbmdDbGljaygpe1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIFV0aWxzLnNob3dEaWFsb2dzKHRoaXMuc2V0dGluZ1ByZWZhYik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v54K55Ye75pi+56S66L2s55uY5oyJ6ZKuXHJcbiAgICBvbldpc2hCdG5DbGljaygpe1xyXG4gICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50KCdlbnRlcl93aXNoJyk7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7ICAgIC8v5oyJ6ZKu6Z+z5pWIXHJcbiAgICAgICAgVXRpbHMuc2hvd0RpYWxvZ3ModGhpcy53aXNoUHJlZmFiKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dUZXN0UGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFRlc3RCdXR0b25WaWV3KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9idG5UZXN0LmdldENoaWxkQnlOYW1lKFwiX2xiVGVzdEJ0blwiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfbGJUZXN0QnRuXCIpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9idG5UZXN0O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSh0aGlzLl9maXJlLl9idG5UZXN0LndpZHRoLCB0aGlzLl9maXJlLl9idG5UZXN0LmhlaWdodCk7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLmtYtcIjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI4O1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAzMjtcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuICAgIH1cclxuXHJcbiAgICBfc2hvd1Rlc3RQYW5lbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGVzdFBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdGVzdFBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXN0UGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVsID0gbmV3IGNjLk5vZGUoXCJfdGVzdFBhbmVsXCIpO1xyXG4gICAgICAgIHBhbmVsLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBwYW5lbC5zZXRDb250ZW50U2l6ZSgxMjgwLCA3MjApO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDIwMDA7XHJcbiAgICAgICAgdGhpcy5fdGVzdFBhbmVsID0gcGFuZWw7XHJcblxyXG4gICAgICAgIGxldCBtYXNrID0gbmV3IGNjLk5vZGUoXCJfdGVzdE1hc2tcIik7XHJcbiAgICAgICAgbWFzay5wYXJlbnQgPSBwYW5lbDtcclxuICAgICAgICBtYXNrLnNldENvbnRlbnRTaXplKDEyODAsIDcyMCk7XHJcbiAgICAgICAgbGV0IG1hc2tHcmFwaGljcyA9IG1hc2suYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMCwgMCwgMCwgMTUwKTtcclxuICAgICAgICBtYXNrR3JhcGhpY3MucmVjdCgtNjQwLCAtMzYwLCAxMjgwLCA3MjApO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgbWFzay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX2hpZGVUZXN0UGFuZWwsIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgZGlhbG9nID0gbmV3IGNjLk5vZGUoXCJfdGVzdERpYWxvZ1wiKTtcclxuICAgICAgICBkaWFsb2cucGFyZW50ID0gcGFuZWw7XHJcbiAgICAgICAgZGlhbG9nLnNldENvbnRlbnRTaXplKDEwNjAsIDgyMCk7XHJcbiAgICAgICAgZGlhbG9nLnpJbmRleCA9IDE7XHJcbiAgICAgICAgbGV0IGRpYWxvZ0dyYXBoaWNzID0gZGlhbG9nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMzUsIDM2LCA0NSwgMjQ1KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTUzMCwgLTQxMCwgMTA2MCwgODIwLCAxOCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAxODApO1xyXG4gICAgICAgIGRpYWxvZ0dyYXBoaWNzLnJvdW5kUmVjdCgtNTMwLCAtNDEwLCAxMDYwLCA4MjAsIDE4KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICBkaWFsb2cub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RMYWJlbChkaWFsb2csIFwiX2xiVGVzdFRpdGxlXCIsIFwi5rWL6K+V6Z2i5p2/XCIsIGNjLnYyKDAsIDI3NiksIDM0LCBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0TGFiZWwoZGlhbG9nLCBcIl9sYlRlc3RUaXBzXCIsIFwi5Lya5YWI6YeN572u5b2T5YmN5ri45oiP54q25oCB77yM5YaN6L+b5YWl5rWL6K+V5Zy65pmvXCIsIGNjLnYyKDAsIDIzNCksIDIyLCBjYy5jb2xvcigyMTAsIDIxMCwgMjIwLCAyNTUpKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbldpZHRoID0gMjIwO1xyXG4gICAgICAgIGxldCBidXR0b25IZWlnaHQgPSA1NDtcclxuICAgICAgICBsZXQgYnV0dG9uRm9udFNpemUgPSAyMjtcclxuICAgICAgICBsZXQgY29sdW1ucyA9IFstMzYwLCAtMTIwLCAxMjAsIDM2MF07XHJcbiAgICAgICAgbGV0IHJvd3MgPSBbMTQ0LCA3MiwgMCwgLTcyLCAtMTQ0LCAtMjE2XTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bktpbGxFZmZlY3RUZXN0XCIsIFwi5Ye75p2A5pWI5p6c5rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbMF0pLCBjYy5jb2xvcigyNTUsIDkwLCA3MCwgMjU1KSwgdGhpcy5fb25LaWxsVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkhpdFRlc3RcIiwgXCLlj5flh7vmlYjmnpzmtYvor5VcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1swXSksIGNjLmNvbG9yKDgwLCAxODAsIDI1NSwgMjU1KSwgdGhpcy5fb25IaXRUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuVXBncmFkZVRlc3RcIiwgXCLljYfnuqfmtYvor5VcIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1swXSksIGNjLmNvbG9yKDExNSwgMjU1LCAxNzAsIDI1NSksIHRoaXMuX29uVXBncmFkZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5NdXRhdGlvblRlc3RcIiwgXCLlrZDlvLnotKjlj5jmtYvor5VcIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1swXSksIGNjLmNvbG9yKDI1NSwgMTIwLCAyMTAsIDI1NSksIHRoaXMuX29uQnVsbGV0TXV0YXRpb25UZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blNob290RWZmZWN0VGVzdFwiLCBcIuWtkOW8ueWwhOWHu+a1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzFdKSwgY2MuY29sb3IoMjU1LCAyMDUsIDkwLCAyNTUpLCB0aGlzLl9vblNob290RWZmZWN0VGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blBsYXllckxvd0hwVGVzdFwiLCBcIuiHquW3seihgOmHj+WRiuaApVwiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzFdKSwgY2MuY29sb3IoMjU1LCAxMTAsIDExMCwgMjU1KSwgdGhpcy5fb25QbGF5ZXJMb3dIcFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5FbmVteUxvd0hwVGVzdFwiLCBcIuaVjOS6uuihgOmHj+WRiuaApVwiLCBjYy52Mihjb2x1bW5zWzJdLCByb3dzWzFdKSwgY2MuY29sb3IoMjU1LCAxNjUsIDcwLCAyNTUpLCB0aGlzLl9vbkVuZW15TG93SHBUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuS2lsbEJyb2FkY2FzdFRlc3RcIiwgXCLlh7vmnYDlub/mkq1cIiwgY2MudjIoY29sdW1uc1szXSwgcm93c1sxXSksIGNjLmNvbG9yKDE3NSwgMTIwLCAyNTUsIDI1NSksIHRoaXMuX29uS2lsbEJyb2FkY2FzdFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuU2FjcmlmaWNlVGVzdFwiLCBcIueMruelrea1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzBdLCByb3dzWzJdKSwgY2MuY29sb3IoMjU1LCA5MiwgOTIsIDI1NSksIHRoaXMuX29uU2FjcmlmaWNlVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0blBvcnRhbFRlc3RcIiwgXCLkvKDpgIHpl6jmtYvor5VcIiwgY2MudjIoY29sdW1uc1sxXSwgcm93c1syXSksIGNjLmNvbG9yKDExMCwgMjU1LCAyNDUsIDI1NSksIHRoaXMuX29uUG9ydGFsVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkNlbnRyaWZ1Z2FsUmluZ1Rlc3RcIiwgXCLnprvlv4PlipvlnIjmtYvor5VcIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1syXSksIGNjLmNvbG9yKDI1NSwgMTYwLCA5MCwgMjU1KSwgdGhpcy5fb25DZW50cmlmdWdhbFJpbmdUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuT2lsU3BpbGxUZXN0XCIsIFwi54Sm5rK55by55rWL6K+VXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbMl0pLCBjYy5jb2xvcigxNjUsIDExOCwgNzIsIDI1NSksIHRoaXMuX29uT2lsU3BpbGxUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkVuZXJneUVnZ1Rlc3RcIiwgXCLog73ph4/om4vmlLbol49cIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1szXSksIGNjLmNvbG9yKDEyNiwgMjMyLCAxNDMsIDI1NSksIHRoaXMuX29uRW5lcmd5RWdnVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkNvdmVyVGVzdFwiLCBcIuaOqeS9k+a1i+ivlVwiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzNdKSwgY2MuY29sb3IoMTk5LCAxNTEsIDk2LCAyNTUpLCB0aGlzLl9vbkNvdmVyVGVzdENsaWNrLCBidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0LCBidXR0b25Gb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVzdEJ1dHRvbihkaWFsb2csIFwiX2J0bkNsb3NlVGVzdFwiLCBcIuWFs+mXrVwiLCBjYy52Mihjb2x1bW5zWzJdLCByb3dzWzNdKSwgY2MuY29sb3IoMTgwLCAxODAsIDE5MCwgMjU1KSwgdGhpcy5faGlkZVRlc3RQYW5lbCwgMTgwLCA0OCwgMjQpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5EYW1hZ2VEb3VibGVUZXN0XCIsIFwi5Lyk5a6z57+75YCN5Yy65Z+fXCIsIGNjLnYyKGNvbHVtbnNbM10sIHJvd3NbM10pLCBjYy5jb2xvcigyNTUsIDUwLCA1MCwgMjU1KSwgdGhpcy5fb25EYW1hZ2VEb3VibGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuU3BlZWREb3VibGVUZXN0XCIsIFwi6YCf5bqm57+75YCN5Yy65Z+fXCIsIGNjLnYyKGNvbHVtbnNbMF0sIHJvd3NbNF0pLCBjYy5jb2xvcig1MCwgMTUwLCAyNTUsIDI1NSksIHRoaXMuX29uU3BlZWREb3VibGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuU3ByZWFkQnVsbGV0VGVzdFwiLCBcIuWtkOW8ueaJqeaVo+WMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzFdLCByb3dzWzRdKSwgY2MuY29sb3IoNTAsIDIzMCwgMTAwLCAyNTUpLCB0aGlzLl9vblNwcmVhZEJ1bGxldFRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5Cb3VuY2VPYnN0YWNsZVRlc3RcIiwgXCLlrZDlvLnlj43lvLnpmpznoo1cIiwgY2MudjIoY29sdW1uc1syXSwgcm93c1s0XSksIGNjLmNvbG9yKDI1NSwgMTAwLCAyMDAsIDI1NSksIHRoaXMuX29uQm91bmNlT2JzdGFjbGVUZXN0Q2xpY2ssIGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQsIGJ1dHRvbkZvbnRTaXplKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVUZXN0QnV0dG9uKGRpYWxvZywgXCJfYnRuQmxhY2tIb2xlVGVzdFwiLCBcIum7kea0nuWMuuWfn1wiLCBjYy52Mihjb2x1bW5zWzNdLCByb3dzWzRdKSwgY2MuY29sb3IoMTIwLCA0MCwgMTgwLCAyNTUpLCB0aGlzLl9vbkJsYWNrSG9sZVRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRlc3RCdXR0b24oZGlhbG9nLCBcIl9idG5DbHVzdGVyQm9tYlRlc3RcIiwgXCLpm4bmnZ/ngrjlvLlcIiwgY2MudjIoY29sdW1uc1swXSwgcm93c1s1XSksIGNjLmNvbG9yKDIyMCwgMTYwLCA0MCwgMjU1KSwgdGhpcy5fb25DbHVzdGVyQm9tYlRlc3RDbGljaywgYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCwgYnV0dG9uRm9udFNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVUZXN0TGFiZWwocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIGZvbnRTaXplLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg0MjAsIDQyKTtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjb2xvcjtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSBmb250U2l6ZSArIDY7XHJcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVGVzdEJ1dHRvbihwYXJlbnQsIG5hbWUsIHRleHQsIHBvcywgc3Ryb2tlQ29sb3IsIGhhbmRsZXIsIHdpZHRoID0gMjYwLCBoZWlnaHQgPSA1OCwgZm9udFNpemUgPSAyOCkge1xyXG4gICAgICAgIGxldCBidG4gPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBidG4ucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGJ0bi5zZXRDb250ZW50U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBidG4uc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBidG4uekluZGV4ID0gMTAwO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidG4uYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcig0OCwgNDgsIDU1LCAyMzApO1xyXG4gICAgICAgIGdyYXBoaWNzLnJvdW5kUmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCwgMTIpO1xyXG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gc3Ryb2tlQ29sb3I7XHJcbiAgICAgICAgZ3JhcGhpY3Mucm91bmRSZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0LCAxMik7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShuYW1lICsgXCJMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYnRuO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gZm9udFNpemU7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IGZvbnRTaXplICsgNDtcclxuICAgICAgICAvLyBsYWJlbC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93LlNIUklOSztcclxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgYnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgaGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGJ0bjtcclxuICAgIH1cclxuXHJcbiAgICBfb25LaWxsVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImtpbGxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uSGl0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImhpdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25VcGdyYWRlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInVwZ3JhZGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQnVsbGV0TXV0YXRpb25UZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwibXV0YXRpb25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU2hvb3RFZmZlY3RUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwic2hvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uUGxheWVyTG93SHBUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwicGxheWVyTG93SHBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uRW5lbXlMb3dIcFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJlbmVteUxvd0hwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbktpbGxCcm9hZGNhc3RUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwia2lsbEJyb2FkY2FzdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Qb3J0YWxUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwicG9ydGFsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkNlbnRyaWZ1Z2FsUmluZ1Rlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJjZW50cmlmdWdhbFJpbmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU2FjcmlmaWNlVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNhY3JpZmljZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25PaWxTcGlsbFRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJvaWxTcGlsbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Db3ZlclRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJjb3ZlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25FbmVyZ3lFZ2dUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiZW5lcmd5RWdnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkRhbWFnZURvdWJsZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJkYW1hZ2VEb3VibGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU3BlZWREb3VibGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwic3BlZWREb3VibGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX29uU3ByZWFkQnVsbGV0VGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcInNwcmVhZEJ1bGxldFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Cb3VuY2VPYnN0YWNsZVRlc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGVzdEdhbWUoXCJib3VuY2VPYnN0YWNsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25CbGFja0hvbGVUZXN0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydFRlc3RHYW1lKFwiYmxhY2tIb2xlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkNsdXN0ZXJCb21iVGVzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUZXN0R2FtZShcImNsdXN0ZXJCb21iXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zdGFydFRlc3RHYW1lKHR5cGUpIHtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTtcclxuICAgICAgICB0aGlzLl9oaWRlVGVzdFBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5faGlkZVVwZ3JhZGVDaG9pY2VQYW5lbChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRHYW1lQmVmb3JlVGVzdCgpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6dHlwZSA9PSBcInNhY3JpZmljZVwifSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjb3Zlci1idXR0b24tc3RhdGVcIix7dmlzaWJsZTpmYWxzZX0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2tpbGwtYnV0dG9uLW1vZGVcIix7bW9kZTpcImNoYXJnZVwifSk7XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY29tcGxldGUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLl9maXJlLl91aS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09IFwia2lsbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEtpbGxFZmZlY3RUZXN0R2FtZShjb21wbGV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJ1cGdyYWRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fc2hvd1VwZ3JhZGVDaG9pY2VQYW5lbChcInVwZ3JhZGVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwibXV0YXRpb25cIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zaG93VXBncmFkZUNob2ljZVBhbmVsKFwibXV0YXRpb25cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic2hvb3RcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRTaG9vdEVmZmVjdFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInBsYXllckxvd0hwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHNlbGYuX2dldEN1cnJlbnRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLnNjcmlwdCAmJiBwbGF5ZXIuc2NyaXB0LmRlYnVnU2V0TG93SHApIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2NyaXB0LmRlYnVnU2V0TG93SHAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJlbmVteUxvd0hwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0VXBncmFkZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2ZpcmUuX3RpbGVkICYmIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuY3JlYXRlTG93SHBUZXN0RW5lbXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQuY3JlYXRlTG93SHBUZXN0RW5lbXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJzYWNyaWZpY2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRVcGdyYWRlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwia2lsbEJyb2FkY2FzdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydEtpbGxCcm9hZGNhc3RUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJwb3J0YWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRQb3J0YWxUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjZW50cmlmdWdhbFJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRDZW50cmlmdWdhbFJpbmdUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJvaWxTcGlsbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFVwZ3JhZGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9maXJlLl90aWxlZCAmJiBzZWxmLl9maXJlLl90aWxlZC5zY3JpcHQgJiYgc2VsZi5fZmlyZS5fdGlsZWQuc2NyaXB0LnNwYXduT2lsVGVzdFBpY2t1cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zcGF3bk9pbFRlc3RQaWNrdXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjb3ZlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENvdmVyVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiZW5lcmd5RWdnXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0RW5lcmd5RWdnVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwiZGFtYWdlRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0RGFtYWdlRG91YmxlVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic3BlZWREb3VibGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRTcGVlZERvdWJsZVRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInNwcmVhZEJ1bGxldFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydFNwcmVhZEJ1bGxldFRlc3RHYW1lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImJvdW5jZU9ic3RhY2xlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0LnN0YXJ0Qm91bmNlT2JzdGFjbGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJibGFja0hvbGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRCbGFja0hvbGVUZXN0R2FtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJjbHVzdGVyQm9tYlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5zdGFydENsdXN0ZXJCb21iVGVzdEdhbWUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQuc3RhcnRQbGF5ZXJIaXRUZXN0R2FtZShjb21wbGV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZXNldEdhbWVCZWZvcmVUZXN0KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIse3Zpc2libGU6ZmFsc2V9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLHt2aXNpYmxlOmZhbHNlfSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fcmVjb21tZW5kQnRucy5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMSw2MDAsMTIwKSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlTdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9qb3lzdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl91aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9uVXBkYXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fdGlsZWQgJiYgdGhpcy5fZmlyZS5fdGlsZWQuc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3RpbGVkLnNjcmlwdC5jbGVhbk1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl90aWxlZC5zY3JpcHQucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2RpcjpjYy52MigwLCAxKSwgcmF0aW86MH0pO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLHt9KTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInNraWxsLWJ1dHRvbi1tb2RlXCIse21vZGU6XCJjaGFyZ2VcIn0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlVGVzdFBhbmVsKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl90ZXN0UGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl90ZXN0UGFuZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlc3RQYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Rlc3Ryb3lUZXN0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Rlc3RQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGVzdFBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGVzdFBhbmVsID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q3VycmVudFBsYXllcigpIHtcclxuICAgICAgICBsZXQgdGlsZWQgPSB0aGlzLl9maXJlLl90aWxlZDtcclxuICAgICAgICBpZiAoIXRpbGVkIHx8ICF0aWxlZC5zY3JpcHQgfHwgIXRpbGVkLnNjcmlwdC5fcGxheWVyIHx8ICFjYy5pc1ZhbGlkKHRpbGVkLnNjcmlwdC5fcGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbGVkLnNjcmlwdC5fcGxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93VXBncmFkZUNob2ljZVBhbmVsKG1vZGUgPSBcInVwZ3JhZGVcIikge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID0gbW9kZTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImdhbWUtcGF1c2VcIix7fSk7XHJcblxyXG4gICAgICAgIGxldCBwYW5lbCA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VQYW5lbFwiKTtcclxuICAgICAgICBwYW5lbC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcGFuZWwuc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAyMTAwO1xyXG4gICAgICAgIHBhbmVsLmFkZENvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKTtcclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBwYW5lbDtcclxuXHJcbiAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZShcIl91cGdyYWRlQ2hvaWNlTWFza1wiKTtcclxuICAgICAgICBtYXNrLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIG1hc2suc2V0Q29udGVudFNpemUoMTI4MCwgNzIwKTtcclxuICAgICAgICBsZXQgbWFza0dyYXBoaWNzID0gbWFzay5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigwLCAwLCAwLCAxNjgpO1xyXG4gICAgICAgIG1hc2tHcmFwaGljcy5yZWN0KC02NDAsIC0zNjAsIDEyODAsIDcyMCk7XHJcbiAgICAgICAgbWFza0dyYXBoaWNzLmZpbGwoKTtcclxuXHJcbiAgICAgICAgbGV0IGRpYWxvZyA9IG5ldyBjYy5Ob2RlKFwiX3VwZ3JhZGVDaG9pY2VEaWFsb2dcIik7XHJcbiAgICAgICAgZGlhbG9nLnBhcmVudCA9IHBhbmVsO1xyXG4gICAgICAgIGRpYWxvZy5zZXRDb250ZW50U2l6ZSg5ODAsIDQzMCk7XHJcbiAgICAgICAgZGlhbG9nLnpJbmRleCA9IDE7XHJcbiAgICAgICAgbGV0IGRpYWxvZ0dyYXBoaWNzID0gZGlhbG9nLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjIsIDI2LCAzOCwgMjQ1KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5yb3VuZFJlY3QoLTQ5MCwgLTIxNSwgOTgwLCA0MzAsIDI0KTtcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBkaWFsb2dHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDEyMCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Mucm91bmRSZWN0KC00OTAsIC0yMTUsIDk4MCwgNDMwLCAyNCk7XHJcbiAgICAgICAgZGlhbG9nR3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgZGlhbG9nLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBtb2RlID09IFwibXV0YXRpb25cIiA/IFwi6YCJ5oup5LiA56eN5a2Q5by56LSo5Y+YXCIgOiBcIumAieaLqeS4gOmhueWNh+e6p1wiO1xyXG4gICAgICAgIGxldCB0aXBzID0gbW9kZSA9PSBcIm11dGF0aW9uXCIgPyBcIjPpgIkx77yM6YCJ5Lit5ZCO56uL5Yi75pu/5o2i5b2T5YmN5a2Q5by5XCIgOiBcIjPpgIkx77yM56uL5Y2z55Sf5pWIXCI7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwoZGlhbG9nLCBcIl9sYlVwZ3JhZGVUaXRsZVwiLCB0aXRsZSwgY2MudjIoMCwgMTYwKSwgMzYsIGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSkpO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVVwZ3JhZGVQYW5lbExhYmVsKGRpYWxvZywgXCJfbGJVcGdyYWRlVGlwc1wiLCB0aXBzLCBjYy52MigwLCAxMTgpLCAyMiwgY2MuY29sb3IoMjAwLCAyMTAsIDIyNSwgMjU1KSk7XHJcblxyXG4gICAgICAgIGxldCBjaG9pY2VzID0gbW9kZSA9PSBcIm11dGF0aW9uXCJcclxuICAgICAgICAgICAgPyBwbGF5ZXIuc2NyaXB0LmdldFRlc3RCdWxsZXRNdXRhdGlvbkNob2ljZXMoKVxyXG4gICAgICAgICAgICA6IHBsYXllci5zY3JpcHQuZ2V0VGVzdFVwZ3JhZGVDaG9pY2VzKCk7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9IC0yODA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaG9pY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXJkID0gdGhpcy5fY3JlYXRlVXBncmFkZUNob2ljZUNhcmQoZGlhbG9nLCBjaG9pY2VzW2ldLCBjYy52MihzdGFydFggKyBpICogMjgwLCAtMTApKTtcclxuICAgICAgICAgICAgY2FyZC5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgY2FyZC5zY2FsZVggPSAwLjA1O1xyXG4gICAgICAgICAgICBjYXJkLnNjYWxlWSA9IDAuOTI7XHJcbiAgICAgICAgICAgIGNhcmQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGkgKiAwLjA1KSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjA4KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMTIsIDEuMTIsIDEuMDYpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA3LCAwLjk2LCAxLjAyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNiwgMS4wMywgMC45OSksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDUsIDEsIDEpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlVXBncmFkZVBhbmVsTGFiZWwocGFyZW50LCBuYW1lLCB0ZXh0LCBwb3MsIGZvbnRTaXplLCBjb2xvcikge1xyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShuYW1lKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSg3MDAsIGZvbnRTaXplICsgMTApO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gZm9udFNpemUgKyA0O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIHJldHVybiBsYWJlbE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVVwZ3JhZGVDaG9pY2VDYXJkKHBhcmVudCwgY2hvaWNlLCBwb3MpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRfXCIgKyBjaG9pY2UuaWQpO1xyXG4gICAgICAgIGNhcmQucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGNhcmQuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBjYXJkLnNldENvbnRlbnRTaXplKDI0MCwgMjcwKTtcclxuICAgICAgICBjYXJkW1wiX191cGdyYWRlQ2hvaWNlXCJdID0gY2hvaWNlO1xyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBjYXJkLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMzgsIDQzLCA1OCwgMjQ1KTtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTEyMCwgLTEzNSwgMjQwLCAyNzAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNDtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNob2ljZS5jb2xvcjtcclxuICAgICAgICBncmFwaGljcy5yb3VuZFJlY3QoLTEyMCwgLTEzNSwgMjQwLCAyNzAsIDE4KTtcclxuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGdsb3cgPSBuZXcgY2MuTm9kZShcIl9jYXJkR2xvd1wiKTtcclxuICAgICAgICBnbG93LnBhcmVudCA9IGNhcmQ7XHJcbiAgICAgICAgbGV0IGdsb3dHcmFwaGljcyA9IGdsb3cuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoY2hvaWNlLmNvbG9yLnIsIGNob2ljZS5jb2xvci5nLCBjaG9pY2UuY29sb3IuYiwgMzQpO1xyXG4gICAgICAgIGdsb3dHcmFwaGljcy5yb3VuZFJlY3QoLTExMiwgLTEyNywgMjI0LCAyNTQsIDE2KTtcclxuICAgICAgICBnbG93R3JhcGhpY3MuZmlsbCgpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbiA9IG5ldyBjYy5Ob2RlKFwiX2NhcmRJY29uXCIpO1xyXG4gICAgICAgIGljb24ucGFyZW50ID0gY2FyZDtcclxuICAgICAgICBpY29uLnNldFBvc2l0aW9uKDAsIDc0KTtcclxuICAgICAgICBsZXQgaWNvbkdyYXBoaWNzID0gaWNvbi5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5maWxsQ29sb3IgPSBjaG9pY2UuY29sb3I7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmNpcmNsZSgwLCAwLCAzNCk7XHJcbiAgICAgICAgaWNvbkdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICBpY29uR3JhcGhpY3MubGluZVdpZHRoID0gMztcclxuICAgICAgICBpY29uR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyMjApO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5jaXJjbGUoMCwgMCwgMzQpO1xyXG4gICAgICAgIGljb25HcmFwaGljcy5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgbGV0IGljb25MYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9jYXJkSWNvbkxhYmVsXCIpO1xyXG4gICAgICAgIGljb25MYWJlbE5vZGUucGFyZW50ID0gaWNvbjtcclxuICAgICAgICBpY29uTGFiZWxOb2RlLnNldENvbnRlbnRTaXplKDc4LCA0MCk7XHJcbiAgICAgICAgbGV0IGljb25MYWJlbCA9IGljb25MYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBpY29uTGFiZWwuc3RyaW5nID0gY2hvaWNlLnNob3J0TGFiZWw7XHJcbiAgICAgICAgaWNvbkxhYmVsLmZvbnRTaXplID0gY2hvaWNlLnNob3J0TGFiZWwubGVuZ3RoID4gMiA/IDE4IDogMjI7XHJcbiAgICAgICAgaWNvbkxhYmVsLmxpbmVIZWlnaHQgPSAyNDtcclxuICAgICAgICBpY29uTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICBpY29uTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChjYXJkLCBcIl9jYXJkVGl0bGVcIiwgY2hvaWNlLnRpdGxlLCBjYy52MigwLCAxNiksIDI4LCBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVVcGdyYWRlUGFuZWxMYWJlbChjYXJkLCBcIl9jYXJkVmFsdWVcIiwgY2hvaWNlLnZhbHVlVGV4dCwgY2MudjIoMCwgLTM0KSwgNDAsIGNob2ljZS5jb2xvcik7XHJcblxyXG4gICAgICAgIGxldCBkZXNjTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NhcmREZXNjXCIpO1xyXG4gICAgICAgIGRlc2NOb2RlLnBhcmVudCA9IGNhcmQ7XHJcbiAgICAgICAgZGVzY05vZGUuc2V0UG9zaXRpb24oMCwgLTkyKTtcclxuICAgICAgICBkZXNjTm9kZS5zZXRDb250ZW50U2l6ZSgxOTAsIDU2KTtcclxuICAgICAgICBkZXNjTm9kZS5jb2xvciA9IGNjLmNvbG9yKDIwMCwgMjEwLCAyMjUsIDIyMCk7XHJcbiAgICAgICAgbGV0IGRlc2NMYWJlbCA9IGRlc2NOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgZGVzY0xhYmVsLnN0cmluZyA9IGNob2ljZS5kZXNjO1xyXG4gICAgICAgIGRlc2NMYWJlbC5mb250U2l6ZSA9IDIwO1xyXG4gICAgICAgIGRlc2NMYWJlbC5saW5lSGVpZ2h0ID0gMjY7XHJcbiAgICAgICAgZGVzY0xhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgZGVzY0xhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcclxuXHJcbiAgICAgICAgY2FyZC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVXBncmFkZUNob2ljZVNlbGVjdCwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGNhcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgX29uVXBncmFkZUNob2ljZVNlbGVjdChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FyZCA9IGV2ZW50ID8gZXZlbnQuY3VycmVudFRhcmdldCA6IG51bGw7XHJcbiAgICAgICAgbGV0IGNob2ljZSA9IGNhcmQgPyBjYXJkW1wiX191cGdyYWRlQ2hvaWNlXCJdIDogbnVsbDtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFwbGF5ZXIgfHwgIXBsYXllci5zY3JpcHQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZVVwZ3JhZGVDaG9pY2VQYW5lbCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0bkxVcFwiKTtcclxuICAgICAgICB0aGlzLl9oaWRlVXBncmFkZUNob2ljZVBhbmVsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID09IFwibXV0YXRpb25cIiAmJiBwbGF5ZXIuc2NyaXB0LmFwcGx5VGVzdEJ1bGxldE11dGF0aW9uQ2hvaWNlKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5zY3JpcHQuYXBwbHlUZXN0QnVsbGV0TXV0YXRpb25DaG9pY2UoY2hvaWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGxheWVyLnNjcmlwdC5hcHBseVRlc3RVcGdyYWRlQ2hvaWNlKGNob2ljZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9oaWRlVXBncmFkZUNob2ljZVBhbmVsKHJlc3VtZUdhbWUgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3VwZ3JhZGVDaG9pY2VQYW5lbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdXBncmFkZUNob2ljZVBhbmVsID0gbnVsbDtcclxuICAgICAgICBpZiAocmVzdW1lR2FtZSkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImdhbWUtcmVzdW1lXCIse30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZGVzdHJveVVwZ3JhZGVDaG9pY2VQYW5lbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5fdXBncmFkZUNob2ljZVBhbmVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGdyYWRlQ2hvaWNlUGFuZWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDaG9pY2VNb2RlID0gXCJ1cGdyYWRlXCI7XHJcbiAgICB9XHJcbn1cclxuIl19