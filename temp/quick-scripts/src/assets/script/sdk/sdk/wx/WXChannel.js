"use strict";
cc._RF.push(module, '67a54mTFKVHuIpoWbc32QeK', 'WXChannel');
// script/sdk/sdk/wx/WXChannel.ts

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
var WXBannerAd_1 = require("./WXBannerAd");
var WXRewardedVideoAd_1 = require("./WXRewardedVideoAd");
var WXShare_1 = require("./WXShare");
var WXlogin_1 = require("./WXlogin");
var WXScreenshot_1 = require("./WXScreenshot");
var WXChannel = /** @class */ (function (_super) {
    __extends(WXChannel, _super);
    function WXChannel(id) {
        var _this = _super.call(this, id) || this;
        if (wx.createBannerAd) {
            _this.bannerAd = new WXBannerAd_1.default(_this);
        }
        // if (wx.createInterstitialAd) {
        //     this.insertAd = new WXInterstitialAd(this)
        // }
        if (wx.createRewardedVideoAd) {
            _this.rewardAd = new WXRewardedVideoAd_1.default(_this);
        }
        if (wx.shareAppMessage) {
            _this.share = new WXShare_1.default(_this);
        }
        _this.loginMgr = new WXlogin_1.default(_this);
        _this.screenshot = new WXScreenshot_1.default(_this);
        return _this;
    }
    WXChannel.prototype.vibrateShort = function () {
        wx.vibrateShort();
    };
    //展示网络图片
    WXChannel.prototype.previewImage = function (imgUrl) {
        wx.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    //跳转能力
    WXChannel.prototype.navigateToMiniProgram = function (appID) {
        wx.navigateToMiniProgram({
            appId: appID,
            success: function () {
                cc.log('wx navigateToMiniProgram succ');
            }
        });
    };
    WXChannel.prototype.showToast = function (title) {
        wx.showToast({ title: title });
    };
    WXChannel.prototype.postMessage = function (msg) {
        var context = wx.getOpenDataContext();
        if (context) {
            msg.channelID = this.channelID;
            context.postMessage(msg);
        }
    };
    return WXChannel;
}(BaseChannel_1.default));
exports.default = WXChannel;

cc._RF.pop();