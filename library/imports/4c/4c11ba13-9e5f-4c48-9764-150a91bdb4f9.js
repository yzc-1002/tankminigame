"use strict";
cc._RF.push(module, '4c11boTnl9MSJdkFQqRvbT5', 'OppoRewardAd');
// script/sdk/sdk/oppo/OppoRewardAd.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var SDKConfig_1 = require("../SDKConfig");
var BaseAd_1 = require("../base/BaseAd");
// import SDKManager from "../SDKManager";
// import ToastController from "../../logic/toast/ToastController";
//https://open.oppomobile.com/wiki/doc#id=10537
var OppoRewardAd = /** @class */ (function (_super) {
    __extends(OppoRewardAd, _super);
    function OppoRewardAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    OppoRewardAd.prototype.onError = function (err) {
        console.log('QQVideoAd error ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (this.callback) {
            // SDKManager.getChannel().showShare(this.rewardCallback)
            this.callback(SDKConfig_1.ResultState.NO);
        }
    };
    OppoRewardAd.prototype.show = function () {
        this.instance.show();
    };
    //oppo渠道需要自己主动加载视频
    OppoRewardAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        // if (this.loadCount == 0) {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
        // }
        this.loadCount++;
        // sel
    };
    OppoRewardAd.prototype.onClose = function (res) {
        this.setState(SDKConfig_1.SDKState.close);
        if (res && res.isEnded || res === undefined) {
            console.log('视频结束关闭 ');
            // 正常播放结束，可以下发游戏奖励
            if (this.callback) {
                this.callback(SDKConfig_1.ResultState.YES);
            }
        }
        else {
            // 播放中途退出，不下发游戏奖励
            console.log('视频中途关闭 ');
            if (this.callback) {
                this.callback(SDKConfig_1.ResultState.NO);
                // ToastController.instance().intoLayer('ui.not_finish');
            }
        }
    };
    OppoRewardAd.prototype.create = function (id) {
        this.loadCount = 0;
        this.adUnitID = id;
        console.log(' 不支持多例');
        if (this.instance == null) {
            this.instance = qg.createRewardedVideoAd({ adUnitId: id });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            console.log(' 创建成功');
        }
        else {
            // this.instance.load();
            console.log(' 主动加载');
        }
        this.instance.load();
    };
    OppoRewardAd.prototype.open = function (adID, callback) {
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        // if (this.adUnitID != adID) {
        //     this.adUnitID = adID
        this.create(adID);
        // } else {
        //     this.show()
        // }
    };
    return OppoRewardAd;
}(BaseAd_1.default));
exports.default = OppoRewardAd;

cc._RF.pop();