"use strict";
cc._RF.push(module, '3c251EiNWtDyJSDMJ4+5EbR', 'QQChannel');
// script/sdk/sdk/qq/QQChannel.ts

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
var QQVideoAd_1 = require("./QQVideoAd");
var QQBanner_1 = require("./QQBanner");
var QQShare_1 = require("./QQShare");
var QQInterstitialAd_1 = require("./QQInterstitialAd");
var QQAppBoxAd_1 = require("./QQAppBoxAd");
var QQScreenshot_1 = require("./QQScreenshot");
var QQSubPackage_1 = require("./QQSubPackage");
var QQChannel = /** @class */ (function (_super) {
    __extends(QQChannel, _super);
    function QQChannel(id) {
        var _this = _super.call(this, id) || this;
        qq.onShow(function () {
        });
        qq.onHide(function () {
        });
        _this.share = new QQShare_1.default(_this);
        if (qq.createInterstitialAd) {
            _this.insertAd = new QQInterstitialAd_1.default(_this);
        }
        if (qq.createRewardedVideoAd) {
            _this.rewardAd = new QQVideoAd_1.default(_this);
        }
        if (qq.createBannerAd) {
            _this.bannerAd = new QQBanner_1.default(_this);
        }
        if (qq.createAppBox) {
            _this.appBoxAd = new QQAppBoxAd_1.default(_this);
        }
        _this.screenshot = new QQScreenshot_1.default(_this);
        _this.subPackage = new QQSubPackage_1.default(_this);
        return _this;
    }
    QQChannel.prototype.showToast = function (title) {
        qq.showToast({ title: title });
    };
    QQChannel.prototype.vibrateShort = function () {
        qq.vibrateShort();
    };
    QQChannel.prototype.postMessage = function (message) {
    };
    QQChannel.prototype.previewImage = function (imgUrl) {
        qq.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    QQChannel.prototype.navigateToMiniProgram = function (appID) {
        qq.navigateToMiniProgram({
            appId: appID,
            success: function () {
            }
        });
    };
    return QQChannel;
}(BaseChannel_1.default));
exports.default = QQChannel;

cc._RF.pop();