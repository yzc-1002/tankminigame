
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Upgrade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxVcGdyYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBQ25ELG9EQUFtRDtBQUNuRCw0Q0FBeUM7QUFFbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsZUFBZTtBQUNmLHdCQUF3QjtBQUV4QjtJQUE2QiwyQkFBYTtJQUExQztRQUVJLE9BQU87UUFDUCx1QkFBdUI7UUFDdkIsb0NBQW9DO1FBSnhDLHFFQThjQztRQXhjRyxvQkFBb0I7UUFDcEIseUJBQXlCO1FBR3pCLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRS9CLGVBQVMsR0FBRyxDQUFDLENBQUMsQ0FBVSx1QkFBdUI7UUFDL0MsYUFBTyxHQUFHLEtBQUssQ0FBQyxDQUFJLE1BQU07UUFFMUIsaUJBQVcsR0FBRyxDQUFDLENBQUMsQ0FBUSxVQUFVO1FBRWxDLGlCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQVEsVUFBVTtRQUVsQyxjQUFRLEdBQVEsQ0FBQyxDQUFDLENBQU0sTUFBTTs7SUEyYmxDLENBQUM7SUF6YkcsTUFBTTtJQUNOLHdCQUFNLEdBQU47UUFDSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDRCwyQkFBUyxHQUFUO1FBQ0ksTUFBTTtRQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQs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QUFPLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHO1lBQ3RFLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGVBQWU7Z0JBQzFELGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO2dCQUN4QixLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxlQUFlO29CQUMzRCxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07SUFDTixnQkFBZ0I7SUFDaEIsSUFBSTtJQUVKLHVCQUFLLEdBQUw7UUFDSSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBbmNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1c7SUFWdEIsT0FBTztRQURuQixPQUFPO09BQ0ssT0FBTyxDQThjbkI7SUFBRCxjQUFDO0NBOWNELEFBOGNDLENBOWM0Qiw2QkFBYSxHQThjekM7QUE5Y1ksMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5pbXBvcnQge0FuYWx5dGljc30gZnJvbSBcIi4vYWQvQW5hbHl0aWNzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBVcGdyYWRlIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgLy/nvJbovpHlmajlsZ7mgKdcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICAvLyBwcml2YXRlIHByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+engeacieWxnuaApyzor7fkvb/nlKgnXyflvIDlpLQs6am85bOw5ZG95ZCNXHJcbiAgICAvLyBfbWF4U3BlZWQgPSAzOyAgLy/mnIDlpKfpgJ/luqZcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIF9zaG93VHlwZSA9IDA7ICAgICAgICAgIC8vMCDmnKrmmL7npLrku7vkvZUgMSDmmL7npLrlnablhYsgMiDmmL7npLrlrZDlvLlcclxuICAgIF9tb3ZpbmcgPSBmYWxzZTsgICAgLy/mraPlnKjnp7vliqhcclxuICAgIFxyXG4gICAgX3BsYXllclR5cGUgPSAxOyAgICAgICAgLy/njqnlrrblvZPliY3lnablhYvnsbvlnotcclxuXHJcbiAgICBfYnVsbGV0VHlwZSA9IDE7ICAgICAgICAvL+eOqeWutuW9k+WJjeWtkOW8ueexu+Wei1xyXG5cclxuICAgIF9sZXZlbElkICAgICAgPSAxOyAgICAgIC8v5b2T5YmN5YWz5Y2hXHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hUYW5rVUkoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQnVsbGV0VUkoKTtcclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWVUlcclxuICAgIF9pbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlDbG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVVwZ3JhZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdXBncmFkZUVmZmVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVBhcmVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl92aWV3VGFuay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYW5nZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaExldmVsSW5mbygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5VGFua0NsaWNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25DaGFuZ2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCdWxsZXRDbGljay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQ2hhbmdlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5Q2xvc2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkNoYW5nZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2gxLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25UYW5rQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RhbmtUb3VjaDIub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRhbmtDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGFua1RvdWNoMy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVGFua0NsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2g0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25UYW5rQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RhbmtUb3VjaDUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRhbmtDbGljaywgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J1bGxldFRvdWNoMS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnVsbGV0Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J1bGxldFRvdWNoMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnVsbGV0Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J1bGxldFRvdWNoMy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnVsbGV0Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J1bGxldFRvdWNoNC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnVsbGV0Q2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5VGFua0NsaWNrLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQ2hhbmdlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QnVsbGV0Q2xpY2sub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25DaGFuZ2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlDbG9zZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkNoYW5nZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2gxLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVGFua0NsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2gyLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVGFua0NsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2gzLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVGFua0NsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2g0Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVGFua0NsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2g1Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVGFua0NsaWNrLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYnVsbGV0VG91Y2gxLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnVsbGV0Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J1bGxldFRvdWNoMi5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkJ1bGxldENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9idWxsZXRUb3VjaDMub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25CdWxsZXRDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYnVsbGV0VG91Y2g0Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnVsbGV0Q2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUVuYWJsZWQoYm9vbCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGFua1RvdWNoMS5hY3RpdmUgPSBib29sO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RhbmtUb3VjaDIuYWN0aXZlID0gYm9vbDtcclxuICAgICAgICB0aGlzLl9maXJlLl90YW5rVG91Y2gzLmFjdGl2ZSA9IGJvb2w7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdGFua1RvdWNoNC5hY3RpdmUgPSBib29sO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3RhbmtUb3VjaDUuYWN0aXZlID0gYm9vbDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9maXJlLl9idWxsZXRUb3VjaDEuYWN0aXZlID0gYm9vbDtcclxuICAgICAgICB0aGlzLl9maXJlLl9idWxsZXRUb3VjaDIuYWN0aXZlID0gYm9vbDtcclxuICAgICAgICB0aGlzLl9maXJlLl9idWxsZXRUb3VjaDMuYWN0aXZlID0gYm9vbDtcclxuICAgICAgICB0aGlzLl9maXJlLl9idWxsZXRUb3VjaDQuYWN0aXZlID0gYm9vbDtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByVXBCZy4kQmxvY2tJbnB1dEV2ZW50cy5lbmFibGVkID0gYm9vbDtcclxuICAgIH1cclxuXHJcbiAgICBfb25DaGFuZ2VDbGljayhldmVudCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5fbW92aW5nID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2hvd1R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ3VwZGF0ZScse3R5cGU6J2luJ30pO1xyXG4gICAgICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9seVRhbmtDYW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9seUJ1bGxldENhbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5Q2xvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5Q2xvc2UucnVuQWN0aW9uKGNjLmZhZGVUbygwLjIsMTYwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl92aWV3VGFuay5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMiwwLDIwMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlVcGdyYWRlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4yKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUVuYWJsZWQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLl9maXJlLl9seVRhbmtDbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50KCdlbnRlcl91cGRhdGVfdGFuaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yi35paw5Z2m5YWL5Y2H57qn5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFRhbmtVSSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5VGFua0ljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9seUJ1bGxldEljb24uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5UGFyZW50LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMiw2NSwwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX21vdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hvd1R5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuX2ZpcmUuX2x5QnVsbGV0Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBBbmFseXRpY3MuZ2V0SW5zdGFuY2UoKS5ldmVudCgnZW50ZXJfdXBkYXRlX2J1bGxldCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yi35paw5a2Q5by55Y2H57qn5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEJ1bGxldFVJKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlUYW5rSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9seUJ1bGxldEljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9seVVwZ3JhZGUucnVuQWN0aW9uKGNjLmZhZGVJbigwLjIpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUVuYWJsZWQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5UGFyZW50LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KDAuMiwtNjUsMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9tb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3Nob3dUeXBlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgndXBkYXRlJyx7dHlwZTonb3V0J30pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9seUNsb3NlLnJ1bkFjdGlvbihjYy5mYWRlVG8oMC4yLDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ZpZXdUYW5rLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLDAsMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlVcGdyYWRlLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDAuMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VFbmFibGVkKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hMZXZlbEluZm8oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5UGFyZW50LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLDAsMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fbW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3Nob3dUeXBlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fbHlDbG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eCueWHu+WIh+aNouWdpuWFi1xyXG4gICAgX29uVGFua0NsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmluZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2hvd1R5cGUgPT0gMSkgeyAgLy/lnablhYtcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiKysrKysrKysrKysrKysrKysrKytcIilcclxuICAgICAgICAgICAgICAgIGxldCBjbGlja1R5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLl9maXJlLl90YW5rVG91Y2gxKSBjbGlja1R5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuX2ZpcmUuX3RhbmtUb3VjaDIpIGNsaWNrVHlwZSA9IDI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5fZmlyZS5fdGFua1RvdWNoMykgY2xpY2tUeXBlID0gMztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLl9maXJlLl90YW5rVG91Y2g0KSBjbGlja1R5cGUgPSA0O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuX2ZpcmUuX3RhbmtUb3VjaDUpIGNsaWNrVHlwZSA9IDU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhbmtDb25maWcgPSB5eXAuY29uZmlnLlRhbmtbY2xpY2tUeXBlXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sZXZlbElkID49IHRhbmtDb25maWcuVW5Mb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnRFeCgndXBkYXRlX2NoYW5nZV90YW5rJyx7XCJ0YW5rSWRcIjpjbGlja1R5cGV9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJUeXBlID0gY2xpY2tUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3ByZVRhbmsuc2NyaXB0LnNldFBsYXllclR5cGUodGhpcy5fcGxheWVyVHlwZSwxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl92aWV3VGFuay5zY3JpcHQuc2V0UGxheWVyVHlwZSh0aGlzLl9wbGF5ZXJUeXBlLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9jdXJyZW50X3BsYXllcl90eXBlX1wiLHRoaXMuX3BsYXllclR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hUYW5rVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKGNsaWNrVHlwZSxcIui/mOayoeacieino+mUgVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v54K55Ye75YiH5o2i5a2Q5by5XHJcbiAgICBfb25CdWxsZXRDbGljayhldmVudCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmluZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2hvd1R5cGUgPT0gMikgeyAgLy/lrZDlvLlcclxuICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiKysrKysrKysrKysrKysrKysrKytcIilcclxuICAgICAgICAgICAgICAgIGxldCBjbGlja1R5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLl9maXJlLl9idWxsZXRUb3VjaDEpIGNsaWNrVHlwZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5fZmlyZS5fYnVsbGV0VG91Y2gyKSBjbGlja1R5cGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuX2ZpcmUuX2J1bGxldFRvdWNoMykgY2xpY2tUeXBlID0gMztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLl9maXJlLl9idWxsZXRUb3VjaDQpIGNsaWNrVHlwZSA9IDQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldENvbmZpZyA9IHl5cC5jb25maWcuVGFua1tjbGlja1R5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xldmVsSWQgPj0gYnVsbGV0Q29uZmlnLlVuTG9jaykge1xyXG4gICAgICAgICAgICAgICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ3VwZGF0ZV9jaGFuZ2VfYnVsbGV0Jyx7XCJidWxsZXRJZFwiOmNsaWNrVHlwZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSBjbGlja1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFByZUJ1bGxldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9jdXJyZW50X2J1bGxldF90eXBlX1wiLHRoaXMuX2J1bGxldFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hCdWxsZXRVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coY2xpY2tUeXBlLFwi6L+Y5rKh5pyJ6Kej6ZSBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v54K55Ye75Y2H57qn5oyJ6ZKuXHJcbiAgICBvblVwZGF0ZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmluZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0bkxVcFwiKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fdXBncmFkZUVmZmVjdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl91cGdyYWRlRWZmZWN0W1wiJHNwLlNrZWxldG9uXCJdLnNldEFuaW1hdGlvbigwLFwiYV8xXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2hvd1R5cGUgPT0gMSkgeyAgLy/lnablhYtcclxuICAgICAgICAgICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ3VwZGF0ZV90YW5rJyx7XCJsZXZlbFwiOnRoaXMuX2ZpcmUuX2J0bkFUSy5sZXZlbCArIDEsXCJjb3N0XCI6dGhpcy5fZmlyZS5fYnRuQVRLLmNvaW59KTtcclxuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KCdhZGQtY29pbicse2NvdW50OnRoaXMuX2ZpcmUuX2J0bkFUSy5jb2luKi0xfSk7XHJcbiAgICAgICAgICAgICAgICBMb2NhbGl6ZWREYXRhLnNldEludEl0ZW0oYF9wbGF5ZXJfJHt0aGlzLl9wbGF5ZXJUeXBlfV9gLCB0aGlzLl9maXJlLl9idG5BVEsubGV2ZWwgKyAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hUYW5rVUkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9zaG93VHlwZSA9PSAyKSB7ICAvL+WtkOW8uVxyXG4gICAgICAgICAgICAgICAgQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnRFeCgndXBkYXRlX2J1bGxldCcse1wibGV2ZWxcIjp0aGlzLl9maXJlLl9idG5BVEsubGV2ZWwgKyAxLFwiY29zdFwiOnRoaXMuX2ZpcmUuX2J0bkFUSy5jb2lufSk7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgnYWRkLWNvaW4nLHtjb3VudDp0aGlzLl9maXJlLl9idG5BVEsuY29pbiotMX0pO1xyXG4gICAgICAgICAgICAgICAgTG9jYWxpemVkRGF0YS5zZXRJbnRJdGVtKGBfYnVsbGV0XyR7dGhpcy5fYnVsbGV0VHlwZX1fYCwgdGhpcy5fZmlyZS5fYnRuQVRLLmxldmVsICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoQnVsbGV0VUkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/liLfmlrDlnablhYvlrZDlvLnnrYnnuqfkv6Hmga9cclxuICAgIHJlZnJlc2hMZXZlbEluZm8oKXtcclxuICAgICAgICB0aGlzLl9maXJlLl9seVBhcmVudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3ZpZXdUYW5rLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9sZXZlbDFfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyVHlwZSA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9jdXJyZW50X3BsYXllcl90eXBlX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldFR5cGUgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfY3VycmVudF9idWxsZXRfdHlwZV9cIiwxKTtcclxuXHJcbiAgICAgICAgLy/lnablhYtcclxuICAgICAgICBpZiAodGhpcy5fdGFua0NhblVwZ3JhZGVFeCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5VGFua0Nhbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seVRhbmtDYW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5a2Q5by5XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldENhblVwZ3JhZGVFeCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QnVsbGV0Q2FuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QnVsbGV0Q2FuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXJlLl9wcmVUYW5rLnNjcmlwdC5zZXRQbGF5ZXJUeXBlKHRoaXMuX3BsYXllclR5cGUsMSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdmlld1Rhbmsuc2NyaXB0LnNldFBsYXllclR5cGUodGhpcy5fcGxheWVyVHlwZSwxKTtcclxuICAgICAgICB0aGlzLl9maXJlLl92aWV3VGFuay5zY3JpcHQuc2V0TWFwKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3ZpZXdUYW5rLnNjcmlwdC5zZXRWaWV3TW9kZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQuX3NhdmVTY2FsZSA9IHRoaXMuX2ZpcmUuX3ByZUJ1bGxldC5fc2F2ZVNjYWxlIHx8IHRoaXMuX2ZpcmUuX3ByZUJ1bGxldC5zY2FsZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQuX3NhdmVQb3NpdGlvbiA9IHRoaXMuX2ZpcmUuX3ByZUJ1bGxldC5fc2F2ZVBvc2l0aW9uIHx8IHRoaXMuX2ZpcmUuX3ByZUJ1bGxldC5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoUHJlQnVsbGV0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZnJlc2hQcmVCdWxsZXQoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQuc2NyaXB0LnNldEJ1bGxldFR5cGUodGhpcy5fYnVsbGV0VHlwZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bGxldFR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQuc2NhbGUgPSAyO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQueCA9IHRoaXMuX2ZpcmUuX3ByZUJ1bGxldC5fc2F2ZVBvc2l0aW9uLnggLSA3O1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQueSA9IHRoaXMuX2ZpcmUuX3ByZUJ1bGxldC5fc2F2ZVBvc2l0aW9uLnkgLSA3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9wcmVCdWxsZXQuc2NhbGUgPSB0aGlzLl9maXJlLl9wcmVCdWxsZXQuX3NhdmVTY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fcHJlQnVsbGV0LnBvc2l0aW9uID0gdGhpcy5fZmlyZS5fcHJlQnVsbGV0Ll9zYXZlUG9zaXRpb247XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Z2m5YWL5piv5ZCm5Y+v5Lul5Y2H57qnXHJcbiAgICBfdGFua0NhblVwZ3JhZGVFeCgpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGFua0NhblVwZ3JhZGUoaSkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Z2m5YWL5piv5ZCm5Y+v5Lul5Y2H57qnXHJcbiAgICBfdGFua0NhblVwZ3JhZGUocGxheWVyVHlwZSl7XHJcbiAgICAgICAgbGV0IGNvaW5Db3VudCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9jb2luX1wiLDApO1xyXG4gICAgICAgIGxldCB0YW5rQ29uZmlnID0geXlwLmNvbmZpZy5UYW5rW3BsYXllclR5cGVdO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX3BsYXllcl8ke3BsYXllclR5cGV9X2AsIDEpXHJcbiAgICAgICAgaWYgKHRoaXMuX2xldmVsSWQgPj0gdGFua0NvbmZpZy5VbkxvY2sgJiYgY29pbkNvdW50ID49IHRhbmtDb25maWcuQ29pbiAqIChsZXZlbCsxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/lrZDlvLnmmK/lkKblj6/ku6XljYfnuqdcclxuICAgIF9idWxsZXRDYW5VcGdyYWRlRXgoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1bGxldENhblVwZ3JhZGUoaSkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Q5by55piv5ZCm5Y+v5Lul5Y2H57qnXHJcbiAgICBfYnVsbGV0Q2FuVXBncmFkZShidWxsZXRUeXBlKXtcclxuICAgICAgICBsZXQgY29pbkNvdW50ID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2NvaW5fXCIsMCk7XHJcbiAgICAgICAgbGV0IGJ1bGxldENvbmZpZyA9IHl5cC5jb25maWcuVGFua1tidWxsZXRUeXBlXTtcclxuICAgICAgICBsZXQgbGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9idWxsZXRfJHtidWxsZXRUeXBlfV9gLCAxKVxyXG4gICAgICAgIGlmICh0aGlzLl9sZXZlbElkID49IGJ1bGxldENvbmZpZy5VbkxvY2sgJiYgY29pbkNvdW50ID49IGJ1bGxldENvbmZpZy5Db2luICogKGxldmVsKzEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yi35paw5Z2m5YWL5Y2H57qn5L+h5oGvXHJcbiAgICBfcmVmcmVzaFRhbmtVSSgpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGFuayA9IHRoaXMuX2ZpcmVbXCJfdGFua1wiICsgaV07XHJcbiAgICAgICAgICAgIHRhbmsuc2NyaXB0LnNldFBsYXllclR5cGUoaSwxKTtcclxuICAgICAgICAgICAgbGV0IHRhbmtsYiA9IHRoaXMuX2ZpcmVbXCJfbGJ0YW5rXCIgKyBpXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0YW5rQ29uZmlnID0geXlwLmNvbmZpZy5UYW5rW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5fcGxheWVyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fdGFua1NlbGVjdC54ID0gdGFuay54O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9wbGF5ZXJfJHt0aGlzLl9wbGF5ZXJUeXBlfV9gLCAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGJBVEsuJExhYmVsLnN0cmluZyA9IHRhbmtDb25maWcuQVRLICogKGxldmVsKzEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGJDb2luLiRMYWJlbC5zdHJpbmcgPSB0YW5rQ29uZmlnLkNvaW4gKiAobGV2ZWwrMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuQVRLLmxldmVsID0gbGV2ZWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9idG5BVEsuY29pbiA9IHRhbmtDb25maWcuQ29pbiAqIChsZXZlbCsxKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90YW5rQ2FuVXBncmFkZShpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0bkFUSy4kQnV0dG9uLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb3JtYWwodGhpcy5fZmlyZS5fYnRuQVRLKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuQVRLLiRCdXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHcmV5KHRoaXMuX2ZpcmUuX2J0bkFUSyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sZXZlbElkID49IHRhbmtDb25maWcuVW5Mb2NrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9wbGF5ZXJfJHtpfV9gLCAxKVxyXG4gICAgICAgICAgICAgICAgdGFua2xiLiRMYWJlbC5zdHJpbmcgPSBcIkx2LlwiICsgbGV2ZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRhbmtsYi4kTGFiZWwuc3RyaW5nID0gdGFua0NvbmZpZy5VbkxvY2sgKyBcIuWFs+ino+mUgVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDliLfmlrDlrZDlvLnljYfnuqfkv6Hmga9cclxuICAgIF9yZWZyZXNoQnVsbGV0VUkoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuX2ZpcmVbXCJfYnVsbGV0XCIgKyBpXTtcclxuICAgICAgICAgICAgYnVsbGV0LnNjcmlwdC5zZXRCdWxsZXRUeXBlKGkpO1xyXG4gICAgICAgICAgICBsZXQgYnVsbGV0bGIgPSB0aGlzLl9maXJlW1wiX2xiYnVsbGV0XCIgKyBpXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBidWxsZXRDb25maWcgPSB5eXAuY29uZmlnLlRhbmtbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA9PSB0aGlzLl9idWxsZXRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9idWxsZXRTZWxlY3QueCA9IGJ1bGxldC54IC0gMTA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX2J1bGxldF8ke3RoaXMuX2J1bGxldFR5cGV9X2AsIDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9sYkFUSy4kTGFiZWwuc3RyaW5nID0gYnVsbGV0Q29uZmlnLkFUSyAqIChsZXZlbCsxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2xiQ29pbi4kTGFiZWwuc3RyaW5nID0gYnVsbGV0Q29uZmlnLkNvaW4gKiAobGV2ZWwrMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuQVRLLmxldmVsID0gbGV2ZWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9idG5BVEsuY29pbiA9IGJ1bGxldENvbmZpZy5Db2luICogKGxldmVsKzEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1bGxldENhblVwZ3JhZGUoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9idG5BVEsuJEJ1dHRvbi5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9ybWFsKHRoaXMuX2ZpcmUuX2J0bkFUSyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0bkFUSy4kQnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JleSh0aGlzLl9maXJlLl9idG5BVEspO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGV2ZWxJZCA+PSBidWxsZXRDb25maWcuVW5Mb2NrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oYF9idWxsZXRfJHtpfV9gLCAxKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0bGIuJExhYmVsLnN0cmluZyA9IFwiTHYuXCIgKyBsZXZlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0bGIuJExhYmVsLnN0cmluZyA9IGJ1bGxldENvbmZpZy5VbkxvY2sgKyBcIuWFs+ino+mUgVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRHcmV5KG5vZGUpe1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwic2hhZGVyL21hdGVyaWFsLWdyZXlcIiwgY2MuTWF0ZXJpYWwsIGZ1bmN0aW9uKGVyciwgcmVzKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50cyhjYy5SZW5kZXJDb21wb25lbnQpLmZvckVhY2gocmVuZGVyQ29tcG9uZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlbmRlckNvbXBvbmVudC5zZXRNYXRlcmlhbCgwLCByZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmdldENvbXBvbmVudHMoY2MuUmVuZGVyQ29tcG9uZW50KS5mb3JFYWNoKHJlbmRlckNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29tcG9uZW50LnNldE1hdGVyaWFsKDAsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXROb3JtYWwobm9kZSl7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJzaGFkZXIvbWF0ZXJpYWwtbm9ybWFsXCIsIGNjLk1hdGVyaWFsLCBmdW5jdGlvbihlcnIsIHJlcykge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudHMoY2MuUmVuZGVyQ29tcG9uZW50KS5mb3JFYWNoKHJlbmRlckNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJDb21wb25lbnQuc2V0TWF0ZXJpYWwoMCwgcmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5nZXRDb21wb25lbnRzKGNjLlJlbmRlckNvbXBvbmVudCkuZm9yRWFjaChyZW5kZXJDb21wb25lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbXBvbmVudC5zZXRNYXRlcmlhbCgwLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8v5q+P5bin6LCD55SoXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgaXNNYXAoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19