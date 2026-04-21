"use strict";
cc._RF.push(module, '03b01HwIPNGV7JD50XMCOLy', 'Upgrade');
// script/Upgrade.ts

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
exports.Upgrade = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var LocalizedData_1 = require("./base/LocalizedData");
var MusicManager_1 = require("./base/MusicManager");
var Analytics_1 = require("./ad/Analytics");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
var Upgrade = /** @class */ (function (_super) {
    __extends(Upgrade, _super);
    function Upgrade() {
        //编辑器属性
        // @property(cc.Prefab)
        // private prefab: cc.Prefab = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //私有属性,请使用'_'开头,驼峰命名
        // _maxSpeed = 3;  //最大速度
        _this.bulletPrefab = null;
        _this._showType = 0; //0 未显示任何 1 显示坦克 2 显示子弹
        _this._moving = false; //正在移动
        _this._playerType = 1; //玩家当前坦克类型
        _this._bulletType = 1; //玩家当前子弹类型
        _this._levelId = 1; //当前关卡
        return _this;
    }
    //加载完成
    Upgrade.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化事件
        this._initEvent();
    };
    Upgrade.prototype.start = function () {
        this._refreshTankUI();
        this._refreshBulletUI();
    };
    Upgrade.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    Upgrade.prototype._initVariable = function () {
    };
    //初始化UI
    Upgrade.prototype._initUI = function () {
        this._fire._lyClose.active = false;
        this._fire._lyUpgrade.opacity = 0;
        this._fire._upgradeEffect.active = false;
        this._fire._lyParent.active = false;
        this._fire._viewTank.active = false;
        this.changeEnabled(false);
        this.refreshLevelInfo();
    };
    //初始化事件
    Upgrade.prototype._initEvent = function () {
        this._fire._lyTankClick.on(cc.Node.EventType.TOUCH_END, this._onChangeClick, this);
        this._fire._lyBulletClick.on(cc.Node.EventType.TOUCH_END, this._onChangeClick, this);
        this._fire._lyClose.on(cc.Node.EventType.TOUCH_END, this._onChangeClick, this);
        this._fire._tankTouch1.on(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch2.on(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch3.on(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch4.on(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch5.on(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._bulletTouch1.on(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
        this._fire._bulletTouch2.on(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
        this._fire._bulletTouch3.on(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
        this._fire._bulletTouch4.on(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
    };
    //销毁事件
    Upgrade.prototype._destroyEvent = function () {
        this._fire._lyTankClick.off(cc.Node.EventType.TOUCH_END, this._onChangeClick, this);
        this._fire._lyBulletClick.off(cc.Node.EventType.TOUCH_END, this._onChangeClick, this);
        this._fire._lyClose.off(cc.Node.EventType.TOUCH_END, this._onChangeClick, this);
        this._fire._tankTouch1.off(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch2.off(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch3.off(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch4.off(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._tankTouch5.off(cc.Node.EventType.TOUCH_END, this._onTankClick, this);
        this._fire._bulletTouch1.off(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
        this._fire._bulletTouch2.off(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
        this._fire._bulletTouch3.off(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
        this._fire._bulletTouch4.off(cc.Node.EventType.TOUCH_END, this._onBulletClick, this);
    };
    Upgrade.prototype.changeEnabled = function (bool) {
        this._fire._tankTouch1.active = bool;
        this._fire._tankTouch2.active = bool;
        this._fire._tankTouch3.active = bool;
        this._fire._tankTouch4.active = bool;
        this._fire._tankTouch5.active = bool;
        this._fire._bulletTouch1.active = bool;
        this._fire._bulletTouch2.active = bool;
        this._fire._bulletTouch3.active = bool;
        this._fire._bulletTouch4.active = bool;
        this._fire._sprUpBg.$BlockInputEvents.enabled = bool;
    };
    Upgrade.prototype._onChangeClick = function (event) {
        var self = this;
        if (this._moving == false) {
            this._moving = true;
            if (this._showType == 0) {
                yyp.eventCenter.emit('update', { type: 'in' });
                MusicManager_1.MusicManager.playEffect("btn");
                this._fire._lyTankCan.active = false;
                this._fire._lyBulletCan.active = false;
                this._fire._lyClose.active = true;
                this._fire._lyClose.runAction(cc.fadeTo(0.2, 160));
                this._fire._viewTank.runAction(cc.moveTo(0.2, 0, 200));
                this._fire._lyUpgrade.runAction(cc.fadeIn(0.2));
                this.changeEnabled(true);
                if (event.target == this._fire._lyTankClick) {
                    Analytics_1.Analytics.getInstance().event('enter_update_tank');
                    //刷新坦克升级信息
                    this._refreshTankUI();
                    this._fire._lyTankIcon.active = true;
                    this._fire._lyBulletIcon.active = false;
                    this._fire._lyParent.runAction(cc.sequence(cc.moveBy(0.2, 65, 0), cc.callFunc(function () {
                        self._moving = false;
                        self._showType = 1;
                    })));
                }
                else if (event.target == this._fire._lyBulletClick) {
                    Analytics_1.Analytics.getInstance().event('enter_update_bullet');
                    //刷新子弹升级信息
                    this._refreshBulletUI();
                    this._fire._lyTankIcon.active = false;
                    this._fire._lyBulletIcon.active = true;
                    this._fire._lyUpgrade.runAction(cc.fadeIn(0.2));
                    this.changeEnabled(true);
                    this._fire._lyParent.runAction(cc.sequence(cc.moveBy(0.2, -65, 0), cc.callFunc(function () {
                        self._moving = false;
                        self._showType = 2;
                    })));
                }
            }
            else {
                yyp.eventCenter.emit('update', { type: 'out' });
                this._fire._lyClose.runAction(cc.fadeTo(0.2, 0));
                this._fire._viewTank.runAction(cc.moveTo(0.2, 0, 0));
                this._fire._lyUpgrade.runAction(cc.fadeOut(0.2));
                this.changeEnabled(false);
                this.refreshLevelInfo();
                this._fire._lyParent.runAction(cc.sequence(cc.moveTo(0.2, 0, 0), cc.callFunc(function () {
                    self._moving = false;
                    self._showType = 0;
                    self._fire._lyClose.active = false;
                })));
            }
        }
    };
    //点击切换坦克
    Upgrade.prototype._onTankClick = function (event) {
        if (this._moving == false) {
            if (this._showType == 1) { //坦克
                MusicManager_1.MusicManager.playEffect("btn");
                // cc.log("++++++++++++++++++++")
                var clickType = 1;
                if (event.target == this._fire._tankTouch1)
                    clickType = 1;
                else if (event.target == this._fire._tankTouch2)
                    clickType = 2;
                else if (event.target == this._fire._tankTouch3)
                    clickType = 3;
                else if (event.target == this._fire._tankTouch4)
                    clickType = 4;
                else if (event.target == this._fire._tankTouch5)
                    clickType = 5;
                var tankConfig = yyp.config.Tank[clickType];
                if (this._levelId >= tankConfig.UnLock) {
                    Analytics_1.Analytics.getInstance().eventEx('update_change_tank', { "tankId": clickType });
                    this._playerType = clickType;
                    this._fire._preTank.script.setPlayerType(this._playerType, 1);
                    this._fire._viewTank.script.setPlayerType(this._playerType, 1);
                    LocalizedData_1.LocalizedData.setIntItem("_current_player_type_", this._playerType);
                    this._refreshTankUI();
                }
                else {
                    // cc.log(clickType,"还没有解锁");
                }
            }
        }
    };
    //点击切换子弹
    Upgrade.prototype._onBulletClick = function (event) {
        if (this._moving == false) {
            if (this._showType == 2) { //子弹
                MusicManager_1.MusicManager.playEffect("btn");
                // cc.log("++++++++++++++++++++")
                var clickType = 1;
                if (event.target == this._fire._bulletTouch1)
                    clickType = 1;
                else if (event.target == this._fire._bulletTouch2)
                    clickType = 2;
                else if (event.target == this._fire._bulletTouch3)
                    clickType = 3;
                else if (event.target == this._fire._bulletTouch4)
                    clickType = 4;
                var bulletConfig = yyp.config.Tank[clickType];
                if (this._levelId >= bulletConfig.UnLock) {
                    Analytics_1.Analytics.getInstance().eventEx('update_change_bullet', { "bulletId": clickType });
                    this._bulletType = clickType;
                    this._refreshPreBullet();
                    LocalizedData_1.LocalizedData.setIntItem("_current_bullet_type_", this._bulletType);
                    this._refreshBulletUI();
                }
                else {
                    // cc.log(clickType,"还没有解锁");
                }
            }
        }
    };
    //点击升级按钮
    Upgrade.prototype.onUpdateClick = function (event) {
        if (this._moving == false) {
            MusicManager_1.MusicManager.playEffect("btnLUp");
            this._fire._upgradeEffect.active = true;
            this._fire._upgradeEffect["$sp.Skeleton"].setAnimation(0, "a_1", false);
            if (this._showType == 1) { //坦克
                Analytics_1.Analytics.getInstance().eventEx('update_tank', { "level": this._fire._btnATK.level + 1, "cost": this._fire._btnATK.coin });
                yyp.eventCenter.emit('add-coin', { count: this._fire._btnATK.coin * -1 });
                LocalizedData_1.LocalizedData.setIntItem("_player_" + this._playerType + "_", this._fire._btnATK.level + 1);
                this._refreshTankUI();
            }
            else if (this._showType == 2) { //子弹
                Analytics_1.Analytics.getInstance().eventEx('update_bullet', { "level": this._fire._btnATK.level + 1, "cost": this._fire._btnATK.coin });
                yyp.eventCenter.emit('add-coin', { count: this._fire._btnATK.coin * -1 });
                LocalizedData_1.LocalizedData.setIntItem("_bullet_" + this._bulletType + "_", this._fire._btnATK.level + 1);
                this._refreshBulletUI();
            }
        }
    };
    //刷新坦克子弹等级信息
    Upgrade.prototype.refreshLevelInfo = function () {
        this._fire._lyParent.active = true;
        this._fire._viewTank.active = true;
        this._levelId = LocalizedData_1.LocalizedData.getIntItem("_level1_", 1);
        this._playerType = LocalizedData_1.LocalizedData.getIntItem("_current_player_type_", 1);
        this._bulletType = LocalizedData_1.LocalizedData.getIntItem("_current_bullet_type_", 1);
        //坦克
        if (this._tankCanUpgradeEx()) {
            this._fire._lyTankCan.active = true;
        }
        else {
            this._fire._lyTankCan.active = false;
        }
        //子弹
        if (this._bulletCanUpgradeEx()) {
            this._fire._lyBulletCan.active = true;
        }
        else {
            this._fire._lyBulletCan.active = false;
        }
        this._fire._preTank.script.setPlayerType(this._playerType, 1);
        this._fire._viewTank.script.setPlayerType(this._playerType, 1);
        this._fire._viewTank.script.setMap(this);
        this._fire._viewTank.script.setViewMode();
        this._fire._preBullet._saveScale = this._fire._preBullet._saveScale || this._fire._preBullet.scale;
        this._fire._preBullet._savePosition = this._fire._preBullet._savePosition || this._fire._preBullet.position;
        this._refreshPreBullet();
    };
    Upgrade.prototype._refreshPreBullet = function () {
        this._fire._preBullet.script.setBulletType(this._bulletType);
        if (this._bulletType == 1) {
            this._fire._preBullet.scale = 2;
            this._fire._preBullet.x = this._fire._preBullet._savePosition.x - 7;
            this._fire._preBullet.y = this._fire._preBullet._savePosition.y - 7;
        }
        else {
            this._fire._preBullet.scale = this._fire._preBullet._saveScale;
            this._fire._preBullet.position = this._fire._preBullet._savePosition;
        }
    };
    //坦克是否可以升级
    Upgrade.prototype._tankCanUpgradeEx = function () {
        for (var i = 1; i <= 5; i++) {
            if (this._tankCanUpgrade(i) == true) {
                return true;
            }
        }
        return false;
    };
    //坦克是否可以升级
    Upgrade.prototype._tankCanUpgrade = function (playerType) {
        var coinCount = LocalizedData_1.LocalizedData.getIntItem("_coin_", 0);
        var tankConfig = yyp.config.Tank[playerType];
        var level = LocalizedData_1.LocalizedData.getIntItem("_player_" + playerType + "_", 1);
        if (this._levelId >= tankConfig.UnLock && coinCount >= tankConfig.Coin * (level + 1)) {
            return true;
        }
        return false;
    };
    //子弹是否可以升级
    Upgrade.prototype._bulletCanUpgradeEx = function () {
        for (var i = 1; i <= 4; i++) {
            if (this._bulletCanUpgrade(i) == true) {
                return true;
            }
        }
        return false;
    };
    //子弹是否可以升级
    Upgrade.prototype._bulletCanUpgrade = function (bulletType) {
        var coinCount = LocalizedData_1.LocalizedData.getIntItem("_coin_", 0);
        var bulletConfig = yyp.config.Tank[bulletType];
        var level = LocalizedData_1.LocalizedData.getIntItem("_bullet_" + bulletType + "_", 1);
        if (this._levelId >= bulletConfig.UnLock && coinCount >= bulletConfig.Coin * (level + 1)) {
            return true;
        }
        return false;
    };
    // 刷新坦克升级信息
    Upgrade.prototype._refreshTankUI = function () {
        for (var i = 1; i <= 5; i++) {
            var tank = this._fire["_tank" + i];
            tank.script.setPlayerType(i, 1);
            var tanklb = this._fire["_lbtank" + i];
            var tankConfig = yyp.config.Tank[i];
            if (i == this._playerType) {
                this._fire._tankSelect.x = tank.x;
                var level = LocalizedData_1.LocalizedData.getIntItem("_player_" + this._playerType + "_", 1);
                this._fire._lbATK.$Label.string = tankConfig.ATK * (level + 1);
                this._fire._lbCoin.$Label.string = tankConfig.Coin * (level + 1);
                this._fire._btnATK.level = level;
                this._fire._btnATK.coin = tankConfig.Coin * (level + 1);
                if (this._tankCanUpgrade(i)) {
                    this._fire._btnATK.$Button.interactable = true;
                    this.setNormal(this._fire._btnATK);
                }
                else {
                    this._fire._btnATK.$Button.interactable = false;
                    this.setGrey(this._fire._btnATK);
                }
            }
            if (this._levelId >= tankConfig.UnLock) {
                var level = LocalizedData_1.LocalizedData.getIntItem("_player_" + i + "_", 1);
                tanklb.$Label.string = "Lv." + level;
            }
            else {
                tanklb.$Label.string = tankConfig.UnLock + "关解锁";
            }
        }
    };
    // 刷新子弹升级信息
    Upgrade.prototype._refreshBulletUI = function () {
        for (var i = 1; i <= 4; i++) {
            var bullet = this._fire["_bullet" + i];
            bullet.script.setBulletType(i);
            var bulletlb = this._fire["_lbbullet" + i];
            var bulletConfig = yyp.config.Tank[i];
            if (i == this._bulletType) {
                this._fire._bulletSelect.x = bullet.x - 10;
                var level = LocalizedData_1.LocalizedData.getIntItem("_bullet_" + this._bulletType + "_", 1);
                this._fire._lbATK.$Label.string = bulletConfig.ATK * (level + 1);
                this._fire._lbCoin.$Label.string = bulletConfig.Coin * (level + 1);
                this._fire._btnATK.level = level;
                this._fire._btnATK.coin = bulletConfig.Coin * (level + 1);
                if (this._bulletCanUpgrade(i)) {
                    this._fire._btnATK.$Button.interactable = true;
                    this.setNormal(this._fire._btnATK);
                }
                else {
                    this._fire._btnATK.$Button.interactable = false;
                    this.setGrey(this._fire._btnATK);
                }
            }
            if (this._levelId >= bulletConfig.UnLock) {
                var level = LocalizedData_1.LocalizedData.getIntItem("_bullet_" + i + "_", 1);
                bulletlb.$Label.string = "Lv." + level;
            }
            else {
                bulletlb.$Label.string = bulletConfig.UnLock + "关解锁";
            }
        }
    };
    Upgrade.prototype.setGrey = function (node) {
        cc.loader.loadRes("shader/material-grey", cc.Material, function (err, res) {
            node.getComponents(cc.RenderComponent).forEach(function (renderComponent) {
                renderComponent.setMaterial(0, res);
            });
            node.children.forEach(function (child) {
                child.getComponents(cc.RenderComponent).forEach(function (renderComponent) {
                    renderComponent.setMaterial(0, res);
                });
            });
        });
    };
    Upgrade.prototype.setNormal = function (node) {
        cc.loader.loadRes("shader/material-normal", cc.Material, function (err, res) {
            node.getComponents(cc.RenderComponent).forEach(function (renderComponent) {
                renderComponent.setMaterial(0, res);
            });
            node.children.forEach(function (child) {
                child.getComponents(cc.RenderComponent).forEach(function (renderComponent) {
                    renderComponent.setMaterial(0, res);
                });
            });
        });
    };
    //每帧调用
    // update (dt) {
    // }
    Upgrade.prototype.isMap = function () {
        return false;
    };
    __decorate([
        property(cc.Prefab)
    ], Upgrade.prototype, "bulletPrefab", void 0);
    Upgrade = __decorate([
        ccclass
    ], Upgrade);
    return Upgrade;
}(BaseComponent_1.BaseComponent));
exports.Upgrade = Upgrade;

cc._RF.pop();