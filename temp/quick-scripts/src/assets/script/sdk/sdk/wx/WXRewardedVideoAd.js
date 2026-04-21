"use strict";
cc._RF.push(module, '2c39ebadvVIFZO5Wxs+RyzC', 'WXRewardedVideoAd');
// script/sdk/sdk/wx/WXRewardedVideoAd.ts

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
var BaseAd_1 = require("../base/BaseAd");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createRewardedVideoAd.html
 * 调用该方法创建的激励视频广告是一个单例
 * 默认是隐藏的，需要调用 RewardedVideoAd.show() 将其显示。
 * 每次创建自动加载
 */
var WXRewardedVideoAd = /** @class */ (function (_super) {
    __extends(WXRewardedVideoAd, _super);
    function WXRewardedVideoAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //第几次load，第一次默认load
        _this.loadCount = 0;
        return _this;
    }
    WXRewardedVideoAd.prototype.open = function (adID, callback) {
        console.log(' showReward adID ', adID);
        if (this.state == SDKConfig_1.SDKState.loading) {
            return;
        }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        if (this.adUnitID != adID) {
            this.create(adID);
        }
        else {
            //由于关闭后微信会自动加载，所以这里不需要手动load。
            this.show();
        }
    };
    WXRewardedVideoAd.prototype.onError = function (err) {
        console.log('WXVideoAd error ', err);
        // ToastController.instance().show('视频加载失败，无法获得奖励')
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (SDKConfig_1.USE_SHARE && this.channel.hasShare()) {
            this.channel.showShare(0, this.callback);
        }
        else {
            if (this.callback) {
                this.callback(SDKConfig_1.ResultState.NO);
                // ToastController.instance().intoLayer('ui.not_finish');
            }
        }
    };
    WXRewardedVideoAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        if (this.loadCount == 0) {
            this.instance.show();
            this.setState(SDKConfig_1.SDKState.loadSucess);
        }
        this.loadCount++;
        // sel
    };
    WXRewardedVideoAd.prototype.onClose = function (res) {
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
            }
        }
    };
    WXRewardedVideoAd.prototype.destroy = function () {
        if (this.instance) {
            // console.log('清理开始 ')
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offClose(this.onClose.bind(this));
            this.instance.destroy();
            this.instanceMap[this.adUnitID] = null;
            this.instance = null;
            // this.instance = null;
        }
    };
    WXRewardedVideoAd.prototype.create = function (adID) {
        this.adUnitID = adID;
        this.loadCount = 0;
        var sdkVersion = wx.getSystemInfoSync().SDKVersion;
        if (!this.instanceMap[adID]) {
            if (SDKConfig_1.compareVersion(sdkVersion, '2.8.0')) {
                this.instance = wx.createRewardedVideoAd({ adUnitId: adID, multiton: true });
            }
            else {
                console.log(' 不支持多例');
                this.instance = wx.createRewardedVideoAd({ adUnitId: adID });
            }
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            this.instanceMap[adID] = this.instance;
        }
        else {
            //微信会在第一次创建的时候默认load一次。
            this.instance.load();
        }
    };
    WXRewardedVideoAd.prototype.show = function () {
        var _this = this;
        this.instance.show().then(function () {
            _this.setState(SDKConfig_1.SDKState.open);
            console.log(' 激励视频展示成功 ');
        }).catch(function () {
            // 失败重试
            console.log(' show  激励视频 播放失败重试');
            _this.instance.load()
                .then(function () {
                _this.setState(SDKConfig_1.SDKState.open);
                _this.instance.show();
            })
                .catch(function (err) {
                console.log(' 激励视频重试失败 err ', err);
                _this.setState(SDKConfig_1.SDKState.loadFail);
            });
        });
    };
    return WXRewardedVideoAd;
}(BaseAd_1.default));
exports.default = WXRewardedVideoAd;

cc._RF.pop();