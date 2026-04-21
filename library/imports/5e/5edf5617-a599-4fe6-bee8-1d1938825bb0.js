"use strict";
cc._RF.push(module, '5edf5YXpZlP5r7oHRk4gluw', 'BDRewardAd');
// script/sdk/sdk/bd/BDRewardAd.ts

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
var BDRewardAd = /** @class */ (function (_super) {
    __extends(BDRewardAd, _super);
    function BDRewardAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    BDRewardAd.prototype.open = function (adID, callback) {
        console.log(' showReward adID ', adID);
        if (this.state == SDKConfig_1.SDKState.loading) {
            return;
        }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        if (this.adUnitID != adID) {
            this.adUnitID = adID;
            this.create(adID);
        }
        else {
            this.show();
        }
    };
    BDRewardAd.prototype.show = function () {
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
            })
                .catch(function (err) {
                console.log(' 激励视频重试失败 err ', err);
                _this.setState(SDKConfig_1.SDKState.loadFail);
                // callback(false)
                _this.channel.showShare(0, _this.callback);
            });
        });
    };
    BDRewardAd.prototype.create = function (id) {
        this.adUnitID = id;
        if (!this.instance) {
            console.log('createVideoAd id ', id);
            this.instance = swan.createRewardedVideoAd({ adUnitId: id, appSid: 'bfbff884' });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
        }
    };
    BDRewardAd.prototype.onError = function (err) {
        console.log('BDRewardAd error ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (this.callback) {
            this.callback(SDKConfig_1.ResultState.NO);
        }
    };
    BDRewardAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        if (this.loadCount == 0) {
            this.instance.show();
            this.setState(SDKConfig_1.SDKState.loadSucess);
        }
        this.loadCount++;
        // sel
    };
    BDRewardAd.prototype.onClose = function (res) {
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
    return BDRewardAd;
}(BaseAd_1.default));
exports.default = BDRewardAd;

cc._RF.pop();