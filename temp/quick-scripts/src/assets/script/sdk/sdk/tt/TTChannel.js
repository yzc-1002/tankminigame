"use strict";
cc._RF.push(module, 'b2fc0KseANNTLL9TPU0t7M3', 'TTChannel');
// script/sdk/sdk/tt/TTChannel.ts

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
var BaseChannel_1 = require("../base/BaseChannel");
var TTBanner_1 = require("./TTBanner");
var TTVideoAd_1 = require("./TTVideoAd");
var TTRecorder_1 = require("./TTRecorder");
var TTShare_1 = require("./TTShare");
var TTLogin_1 = require("./TTLogin");
var TTInsertAd1_1 = require("./TTInsertAd1");
var SDKConfig_1 = require("../SDKConfig");
var TTScreenshot_1 = require("./TTScreenshot");
var TTChannel = /** @class */ (function (_super) {
    __extends(TTChannel, _super);
    function TTChannel(id) {
        var _this = _super.call(this, id) || this;
        // this.canSubPackage = true;
        if (tt.createBannerAd) {
            _this.bannerAd = new TTBanner_1.default(_this);
        }
        if (tt.createRewardedVideoAd) {
            _this.rewardAd = new TTVideoAd_1.default(_this);
        }
        else {
            console.log(' TTChannel createRewardedVideoAd   is null ', tt);
        }
        if (tt.getGameRecorderManager) {
            _this.recorder = new TTRecorder_1.default();
        }
        if (tt.shareAppMessage) {
            _this.share = new TTShare_1.default(_this);
        }
        _this.loginMgr = new TTLogin_1.default(_this);
        if (tt.createInterstitialAd) {
            _this.insertAd = new TTInsertAd1_1.default(_this.configData[SDKConfig_1.ADName.insert][0]);
        }
        _this.screenshot = new TTScreenshot_1.default(_this);
        return _this;
    }
    TTChannel.prototype.vibrateShort = function () {
        tt.vibrateShort({
            success: function (res) {
                //   console.log(`${res}`);
            },
            fail: function (res) {
                //   console.log(`vibrateShort调用失败`);
            }
        });
    };
    TTChannel.prototype.showToast = function (title) {
        tt.showToast({ title: title });
    };
    //展示网络图片
    TTChannel.prototype.previewImage = function (imgUrl) {
        tt.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    TTChannel.prototype.checkForUpdate = function (callback) {
        //小游戏官方的分包加载方式
        if (tt.getUpdateManager) {
            var updateManager_1 = tt.getUpdateManager();
            console.log("getUpdateManager", updateManager_1);
            updateManager_1.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log("onCheckForUpdate", res.hasUpdate);
                if (res.hasUpdate) {
                    tt.showToast({
                        title: "即将有更新请留意"
                    });
                }
                else {
                    callback(SDKConfig_1.ResultState.YES);
                }
            });
            updateManager_1.onUpdateReady(function () {
                tt.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否立即使用？",
                    success: function (res) {
                        if (res.confirm) {
                            // 调用 applyUpdate 应用新版本并重启
                            updateManager_1.applyUpdate();
                        }
                        else {
                            tt.showToast({
                                icon: "none",
                                title: "小程序下一次「冷启动」时会使用新版本"
                            });
                            callback(SDKConfig_1.ResultState.YES);
                        }
                    }
                });
            });
            updateManager_1.onUpdateFailed(function () {
                tt.showToast({
                    title: "更新失败，下次启动继续..."
                });
                callback(SDKConfig_1.ResultState.YES);
            });
        }
        else {
            callback(SDKConfig_1.ResultState.YES);
        }
    };
    return TTChannel;
}(BaseChannel_1.default));
exports.default = TTChannel;

cc._RF.pop();