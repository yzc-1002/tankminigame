"use strict";
cc._RF.push(module, 'c344fHsPLNGi6PHeLlbxSr/', 'BDChannel');
// script/sdk/sdk/bd/BDChannel.ts

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
var BDRewardAd_1 = require("./BDRewardAd");
var BDSubPackage_1 = require("./BDSubPackage");
var BDScreenshot_1 = require("./BDScreenshot");
var BDChannel = /** @class */ (function (_super) {
    __extends(BDChannel, _super);
    function BDChannel(id) {
        var _this = _super.call(this, id) || this;
        swan.onShow(function () {
        });
        swan.onHide(function () {
        });
        if (swan.createRewardedVideoAd) {
            _this.rewardAd = new BDRewardAd_1.default(_this);
        }
        _this.subPackage = new BDSubPackage_1.default(_this);
        _this.screenshot = new BDScreenshot_1.default(_this);
        return _this;
    }
    BDChannel.prototype.vibrateShort = function () {
        swan.vibrateShort();
    };
    BDChannel.prototype.showToast = function (title) {
        swan.showToast({ title: title });
    };
    //展示网络图片
    BDChannel.prototype.previewImage = function (imgUrl) {
        swan.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    BDChannel.prototype.navigateToMiniProgram = function (appID) {
        swan.navigateToMiniProgram({
            appKey: appID,
            success: function () {
                console.log(' jump ok');
            },
            fail: function () {
                console.log(' jump fail');
            }
        });
    };
    return BDChannel;
}(BaseChannel_1.default));
exports.default = BDChannel;

cc._RF.pop();