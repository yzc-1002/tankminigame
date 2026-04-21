"use strict";
cc._RF.push(module, 'c340935TdpCLZNAXdb8LwJ7', 'VivoRewardAd');
// script/sdk/sdk/vivo/VivoRewardAd.ts

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
/**
 * https://minigame.vivo.com.cn/documents/#/api/da/incentive-video-da
 *  第一次创建视频广告对象时，已自动加载一次广告，请勿重新加载
 */
var VivoRewardAd = /** @class */ (function (_super) {
    __extends(VivoRewardAd, _super);
    function VivoRewardAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    VivoRewardAd.prototype.open = function (adID, callback) {
        console.log(' showReward adID ', adID);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        if (this.adUnitID != adID) {
            this.adUnitID = adID;
            this.createVideoAd(adID);
        }
        else {
            this.show();
        }
    };
    VivoRewardAd.prototype.createVideoAd = function (id) {
        this.loadCount = 0;
        console.log(' 不支持多例');
        if (this.instance == null) {
            this.instance = qg.createRewardedVideoAd({ posId: id });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            console.log(' 创建成功');
        }
        else {
            console.log(' 主动加载');
            this.instance.load();
        }
    };
    VivoRewardAd.prototype.onError = function (err) {
        console.log('QQVideoAd error ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (this.callback) {
            // SDKManager.getChannel().showShare(this.rewardCallback)
            this.callback(SDKConfig_1.ResultState.NO);
        }
    };
    //oppo渠道需要自己主动加载视频
    VivoRewardAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        // if (this.loadCount == 0) {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
        // }
        this.loadCount++;
        // sel
    };
    VivoRewardAd.prototype.onClose = function (res) {
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
    VivoRewardAd.prototype.show = function () {
        var _this = this;
        if (!this.instance) {
            this.callback(SDKConfig_1.ResultState.NO);
            return;
        }
        this.instance.show().then(function () {
            _this.setState(SDKConfig_1.SDKState.open);
            console.log(' 激励视频展示成功 ');
        }).catch(function () {
            // 失败重试
            console.log(' show  激励视频 播放失败重试');
            _this.instance.load()
                .then(function () {
                _this.instance.show();
                _this.setState(SDKConfig_1.SDKState.open);
                // GlobalEvent.instance().publish(ADEventName.CHANGE_REWARD_AD_STATE, this.state)
            })
                .catch(function (err) {
                console.log(' 激励视频重试失败 err ', err);
                _this.setState(SDKConfig_1.SDKState.loadFail);
                // callback(false)
                // SDKManager.getChannel().showShare(this.rewardCallback)
            });
        });
    };
    return VivoRewardAd;
}(BaseAd_1.default));
exports.default = VivoRewardAd;

cc._RF.pop();