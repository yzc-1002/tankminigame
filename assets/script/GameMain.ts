import {BaseComponent} from "./base/BaseComponent";
import {LocalizedData} from "./base/LocalizedData";
import {Utils} from "./base/Utils";
import { MusicManager } from "./base/MusicManager";

import {Analytics} from "./ad/Analytics";
import {InsertAd} from "./ad/InsertAd";
import {RewardAd} from "./ad/RewardAd";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends BaseComponent {

    @property(cc.Prefab) 
    finishPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    settingPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    wishPrefab : cc.Prefab = null;    //转盘

    @property(cc.Prefab)
    revivePrefab : cc.Prefab = null;    //转盘

    // _csb : any = {};
    _levelId    =   1;      //当前关卡

    _startCount = 0;
    _testPanel = null;

    onLoad() {
        //初始化变量
        this._initVariable();
        
        //初始化UI
        this._initUI();

        //初始化接收事件
        this._initEvent();
    }

    //初始化变量
    _initVariable() {
    }

    //初始化UI
    _initUI() {
        //隐藏开始按钮
        this._fire._joystick.active = false;
        this._fire._ui.active = false;
        console.log("yyp.safeTopBottom",yyp.safeTopBottom)
        this._fire._btnSetting.y = yyp.safeTopBottom-30;
        this._fire._btnSetting.zIndex = 1001;
        if (this._fire._btnTest) {
            this._fire._btnTest.y = yyp.safeTopBottom-30;
            this._fire._btnTest.zIndex = 1001;
            this._initTestButtonView();
        }
                
        this._fire._recommendBtns.runAction(cc.moveTo(0.1,600,120));
        Utils.doQAction(this._fire._btnWish);
    }
    
    start(){
        this._fire._preDefense.script.setInStart(3);
        this._fire._preBullet.script.setInStart(2);
    }

    //初始化接收事件
    _initEvent() {
        // yyp.eventCenter.on('config-loaded',this._prepare,this);                 //配置加载完毕
        yyp.eventCenter.on('current-levelid',this._updateLevelid,this);         //当前关卡
        yyp.eventCenter.on('current-enemycount',this._updateEnemyCount,this);   //敌人数量
        yyp.eventCenter.on('player-death',this._playerDeath,this);              //player死亡
        // yyp.eventCenter.on('add-coin',this._addCoin,this);                      //金币增加
        yyp.eventCenter.on('restart',this._prepare,this);                       //重新开始
        yyp.eventCenter.on('update',this._updateMsg,this);                       //进入/退出升级界面
        yyp.eventCenter.on("player-revive",this._playerRevive,this);             //复活
        yyp.eventCenter.on("game-pause",this._gamePause,this);                  //暂停
        yyp.eventCenter.on("game-resume",this._gameResume,this);                  //恢复
        this._fire._lyStart.on(cc.Node.EventType.TOUCH_END, this._onStartClick, this);
    }

    //销毁事件
    _destroyEvent() {
        // yyp.eventCenter.off('config-loaded',this._prepare,this);                 //配置加载完毕
        yyp.eventCenter.off('current-levelid',this._updateLevelid,this);         //当前关卡
        yyp.eventCenter.off('current-enemycount',this._updateEnemyCount,this);   //敌人数量
        yyp.eventCenter.off('player-death',this._playerDeath,this);              //player死亡
        // yyp.eventCenter.off('add-coin',this._addCoin,this);                      //金币增加
        yyp.eventCenter.off('restart',this._prepare,this);                       //重新开始
        yyp.eventCenter.off('update',this._updateMsg,this);                       //进入/退出升级界面
        yyp.eventCenter.off("player-revive",this._playerRevive,this);             //复活
        yyp.eventCenter.off("game-pause",this._gamePause,this);                  //暂停
        yyp.eventCenter.off("game-resume",this._gameResume,this);                  //恢复
        this._fire._lyStart.off(cc.Node.EventType.TOUCH_END, this._onStartClick, this);
        this._destroyTestPanel();
    }

    onDestroy() {
        //销毁事件
        this._destroyEvent();
    }


    // 当前关卡
    _updateLevelid(event){
        this._levelId = event.levelid;
        this._fire._lbLevel.$Label.string = "Level:" + event.levelid;
    }

    // 敌人数量
    _updateEnemyCount(event){
        this._fire._lbEnemy.$Label.string = event.enemycount;
        if (this._fire._tiled.script.isTestMode && this._fire._tiled.script.isTestMode()) {
            return;
        }
        if (event.enemycount == 0) {
            LocalizedData.setIntItem("_level1_", this._levelId + 1);
            // cc.log("win!!!!!!!!!!!");

            this._fire._lyStart.active = false;
            this._fire._joystick.active = false;
            this._fire._ui.active = false;
            this._fire._nUpdate.script.refreshLevelInfo();

            this._fire._tiled.script.setFinish();

            //显示胜利界面
            let finish = cc.instantiate(this.finishPrefab);
            finish.zIndex = 1000;
            Utils.addtoCurrentScene(finish);
            finish.script.setResult(this._levelId,true);
        }
    }

    // 玩家死亡
    _playerDeath(event){
        // cc.log("failed!!!!!!!!!!!");
            

        
        if (RewardAd.getInstance().isLoad()) {
            //显示复活界面
            let revive = cc.instantiate(this.revivePrefab);
            revive.zIndex = 1000;
            Utils.addtoCurrentScene(revive);
            revive.script.init(this._levelId);
        }
        else{
            this._playerRevive({type:false});
        }
        
    }

    _playerRevive(event){
        if (event.type == true) {
            //复活
            this._fire._tiled.script.revive();
        }
        else{
            this._fire._lyStart.active = false;
            this._fire._joystick.active = false;
            this._fire._ui.active = false;
            this._fire._nUpdate.script.refreshLevelInfo();
            this._fire._tiled.script.setFinish();

            //显示失败界面
            let finish = cc.instantiate(this.finishPrefab);
            finish.zIndex = 1000;
            Utils.addtoCurrentScene(finish);
            finish.script.setResult(this._levelId,false);
        }
    }
    
    _gamePause(){
        this._fire._tiled.script.pause();
    }
    
    _gameResume(){
        this._fire._tiled.script.resume();
    }

    // 金币增加
    // _addCoin(event){
    //     this._fire._lyCoin.script.refresh(event.count,event.position);
    // }
    
    //准备开始
    _prepare(event){
        this._fire._recommendBtns.runAction(cc.moveTo(0.1,600,120));

        this._fire._lyStart.active = true;
        this._fire._nUpdate.active = true;
        
        // 清空场景
        this._fire._tiled.script.cleanMap();  

        this._fire._toggle.$Toggle.isChecked = true;

        this._startCount++;
        if (this._startCount >=3) {
            let self = this;
            if (InsertAd.getInstance().isLoad()) {
                self._startCount = 0;
                InsertAd.getInstance().show();
            }
        }
    }
    _updateMsg(event){
        if (event.type == 'in') {
            this._fire._recommendBtns.runAction(cc.moveTo(0.1,600,120));
        }
        else if (event.type == 'out') {
            this._fire._recommendBtns.runAction(cc.moveTo(0.1,600,120));
        }
    }

    //开始按钮
    _onStartClick(){
        MusicManager.playEffect("btn");
        this._fire._recommendBtns.runAction(cc.moveTo(0.1,600,120));

        //隐藏开始按钮
        this._fire._lyStart.active = false;
        this._fire._joystick.active = true;
        this._fire._ui.active = true;
        this._fire._nUpdate.active = false;

        this._fire._adDefense.script.setAD(3);
        this._fire._adBullet.script.setAD(2);
        this._fire._adLife.script.setAD(1);
        
        
        // 开始游戏
        let self = this;
        this._fire._tiled.script.startGame(function(){
            if (self._fire._toggle.$Toggle.isChecked) {
                self._fire._preDefense.script.emitSkill();
                self._fire._preBullet.script.emitSkill();
            }
        });   
        
    }

    //开始按钮
    onSettingClick(){
        MusicManager.playEffect("btn");
        Utils.showDialogs(this.settingPrefab);
    }
    
    //点击显示转盘按钮
    onWishBtnClick(){
        Analytics.getInstance().event('enter_wish');
        MusicManager.playEffect("btn");    //按钮音效
        Utils.showDialogs(this.wishPrefab);
    }

    onTestClick(event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        MusicManager.playEffect("btn");
        this._showTestPanel();
    }

    _initTestButtonView() {
        if (this._fire._btnTest.getChildByName("_lbTestBtn")) {
            return;
        }

        let labelNode = new cc.Node("_lbTestBtn");
        labelNode.parent = this._fire._btnTest;
        labelNode.setContentSize(this._fire._btnTest.width, this._fire._btnTest.height);
        let label = labelNode.addComponent(cc.Label);
        label.string = "测";
        label.fontSize = 28;
        label.lineHeight = 32;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
    }

    _showTestPanel() {
        if (this._testPanel && cc.isValid(this._testPanel)) {
            this._testPanel.active = true;
            return;
        }

        let panel = new cc.Node("_testPanel");
        panel.parent = this.node;
        panel.setContentSize(1280, 720);
        panel.zIndex = 2000;
        this._testPanel = panel;

        let mask = new cc.Node("_testMask");
        mask.parent = panel;
        mask.setContentSize(1280, 720);
        let maskGraphics = mask.addComponent(cc.Graphics);
        maskGraphics.fillColor = cc.color(0, 0, 0, 150);
        maskGraphics.rect(-640, -360, 1280, 720);
        maskGraphics.fill();
        mask.on(cc.Node.EventType.TOUCH_END, this._hideTestPanel, this);

        let dialog = new cc.Node("_testDialog");
        dialog.parent = panel;
        dialog.setContentSize(460, 330);
        dialog.zIndex = 1;
        let dialogGraphics = dialog.addComponent(cc.Graphics);
        dialogGraphics.fillColor = cc.color(35, 36, 45, 245);
        dialogGraphics.roundRect(-230, -165, 460, 330, 18);
        dialogGraphics.fill();
        dialogGraphics.lineWidth = 3;
        dialogGraphics.strokeColor = cc.color(255, 255, 255, 180);
        dialogGraphics.roundRect(-230, -165, 460, 330, 18);
        dialogGraphics.stroke();
        dialog.on(cc.Node.EventType.TOUCH_END, function(event){
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
        }, this);

        this._createTestLabel(dialog, "_lbTestTitle", "测试面板", cc.v2(0, 112), 34, cc.color(255, 255, 255, 255));
        this._createTestLabel(dialog, "_lbTestTips", "会先重置当前游戏状态，再进入测试场景", cc.v2(0, 70), 22, cc.color(210, 210, 220, 255));
        this._createTestButton(dialog, "_btnKillEffectTest", "击杀效果测试", cc.v2(0, 18), cc.color(255, 90, 70, 255), this._onKillTestClick);
        this._createTestButton(dialog, "_btnHitTest", "受击效果测试", cc.v2(0, -62), cc.color(80, 180, 255, 255), this._onHitTestClick);
        this._createTestButton(dialog, "_btnCloseTest", "关闭", cc.v2(0, -130), cc.color(180, 180, 190, 255), this._hideTestPanel, 160, 46, 24);
    }

    _createTestLabel(parent, name, text, pos, fontSize, color) {
        let labelNode = new cc.Node(name);
        labelNode.parent = parent;
        labelNode.setContentSize(420, 42);
        labelNode.setPosition(pos);
        labelNode.color = color;

        let label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = fontSize + 6;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return labelNode;
    }

    _createTestButton(parent, name, text, pos, strokeColor, handler, width = 260, height = 58, fontSize = 28) {
        let btn = new cc.Node(name);
        btn.parent = parent;
        btn.setContentSize(width, height);
        btn.setPosition(pos);
        btn.zIndex = 100;

        let graphics = btn.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(48, 48, 55, 230);
        graphics.roundRect(-width / 2, -height / 2, width, height, 12);
        graphics.fill();
        graphics.lineWidth = 3;
        graphics.strokeColor = strokeColor;
        graphics.roundRect(-width / 2, -height / 2, width, height, 12);
        graphics.stroke();

        let labelNode = new cc.Node(name + "Label");
        labelNode.parent = btn;
        labelNode.setContentSize(width, height);
        let label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = fontSize + 4;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;

        btn.on(cc.Node.EventType.TOUCH_END, handler, this);
        return btn;
    }

    _onKillTestClick(event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("kill");
    }

    _onHitTestClick(event) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._startTestGame("hit");
    }

    _startTestGame(type) {
        MusicManager.playEffect("btn");
        this._hideTestPanel();
        this._resetGameBeforeTest();

        let self = this;
        let complete = function(){
            self._fire._joystick.active = true;
            self._fire._ui.active = true;
        };

        if (type == "kill") {
            this._fire._tiled.script.startKillEffectTestGame(complete);
        }
        else{
            this._fire._tiled.script.startPlayerHitTestGame(complete);
        }
    }

    _resetGameBeforeTest() {
        this._fire._recommendBtns.runAction(cc.moveTo(0.1,600,120));
        this._fire._lyStart.active = false;
        this._fire._joystick.active = false;
        this._fire._ui.active = false;
        this._fire._nUpdate.active = false;

        if (this._fire._tiled && this._fire._tiled.script) {
            this._fire._tiled.script.cleanMap();
            this._fire._tiled.script.resume();
        }
        yyp.eventCenter.emit("joy-stick",{dir:cc.v2(0, 1), ratio:0});
        yyp.eventCenter.emit("charge-cannon-clear",{});
    }

    _hideTestPanel(event = null) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        if (this._testPanel && cc.isValid(this._testPanel)) {
            this._testPanel.active = false;
        }
    }

    _destroyTestPanel() {
        if (this._testPanel && cc.isValid(this._testPanel)) {
            this._testPanel.destroy();
        }
        this._testPanel = null;
    }
}
