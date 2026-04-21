"use strict";
cc._RF.push(module, '338d2kroLJIwbxydW5tAYQb', 'Finish');
// script/Finish.ts

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
var Utils_1 = require("./base/Utils");
var BaseComponent_1 = require("./base/BaseComponent");
var MusicManager_1 = require("./base/MusicManager");
var Analytics_1 = require("./ad/Analytics");
var RewardAd_1 = require("../script/ad/RewardAd");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Finish = /** @class */ (function (_super) {
    __extends(Finish, _super);
    function Finish() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._levelId = 1; //关卡id
        _this._result = true; //true 胜利 false 失败
        _this._coinCount = 0;
        return _this;
    }
    Finish.prototype.onLoad = function () {
    };
    Finish.prototype.start = function () {
    };
    Finish.prototype._aniFinished = function () {
        this._fire._btnGet.runAction(cc.sequence(cc.delayTime(1), cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1), cc.scaleTo(0.05, 1.05, 1.05), cc.scaleTo(0.02, 1, 1)).repeatForever());
        var self = this;
        this._fire._nToggle.runAction(cc.sequence(cc.delayTime(3), cc.fadeIn(0.1), cc.callFunc(function () {
            self._fire._toggle.active = true;
        })));
    };
    Finish.prototype.setResult = function (levelId, result) {
        this._levelId = levelId;
        this._result = result;
        //关卡
        this._fire._lbLevel.$Label.string = levelId;
        //金币
        var levelConfig = yyp.config.Level[0];
        var coinCount = levelConfig.CoinCount * levelId * 1.5;
        this._coinCount = this._result ? coinCount : Math.floor(coinCount / 3);
        this._fire._lbCoin.$Label.string = this._coinCount * 3;
        //title
        this._fire._sprWinBg.active = this._result;
        this._fire._sprWin.active = this._result;
        this._fire._sprFail.active = !this._result;
        //按钮
        this._fire._nToggle.opacity = 0;
        this._fire._toggle.active = false;
        if (this._result == true) {
            Analytics_1.Analytics.getInstance().eventEx('win_game', { "level": this._levelId });
            MusicManager_1.MusicManager.playEffect("win");
        }
        else {
            Analytics_1.Analytics.getInstance().eventEx('failed_game', { "level": this._levelId });
            MusicManager_1.MusicManager.playEffect("failed");
        }
        var ani = this.node.getComponent(cc.Animation);
        ani.play("Finish");
        ani.on("finished", this._aniFinished, this);
    };
    Finish.prototype.onBtnClick = function (event) {
        MusicManager_1.MusicManager.playEffect("btn");
        var coin = this._coinCount;
        if (this._fire._toggle.$Toggle.isChecked) {
            if (RewardAd_1.RewardAd.getInstance().isLoad()) {
                Analytics_1.Analytics.getInstance().eventEx('finish_video', { "level": this._levelId });
                var self_1 = this;
                RewardAd_1.RewardAd.getInstance().show(function (complete) {
                    yyp.eventCenter.emit('add-coin', { count: (complete ? coin * 3 : coin), position: Utils_1.Utils.getWorldPosition(self_1._fire._sprCoin) });
                    yyp.eventCenter.emit('restart', {});
                    self_1.node.destroy();
                });
            }
            else {
                yyp.eventCenter.emit('add-coin', { count: coin, position: Utils_1.Utils.getWorldPosition(this._fire._sprCoin) });
                yyp.eventCenter.emit('restart', {});
                this.node.destroy();
            }
        }
        else {
            yyp.eventCenter.emit('add-coin', { count: coin, position: Utils_1.Utils.getWorldPosition(this._fire._sprCoin) });
            yyp.eventCenter.emit('restart', {});
            this.node.destroy();
        }
    };
    Finish.prototype.onToggleClick = function (event) {
        MusicManager_1.MusicManager.playEffect("btn");
        if (this._fire._toggle.$Toggle.isChecked) {
            this._fire._lbRewardsTIps.active = true;
            this._fire._lbCoin.$Label.string = this._coinCount * 3;
        }
        else {
            this._fire._lbRewardsTIps.active = false;
            this._fire._lbCoin.$Label.string = this._coinCount;
        }
    };
    Finish = __decorate([
        ccclass
    ], Finish);
    return Finish;
}(BaseComponent_1.BaseComponent));
exports.default = Finish;

cc._RF.pop();