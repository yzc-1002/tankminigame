"use strict";
cc._RF.push(module, '110a7uMgSZCoqUyV+OgKQih', 'OppoChannel');
// script/sdk/sdk/oppo/OppoChannel.ts

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
var SDKConfig_1 = require("../SDKConfig");
var OppoRewardAd_1 = require("./OppoRewardAd");
var OppoBannerAd_1 = require("./OppoBannerAd");
var OppoInsertAd_1 = require("./OppoInsertAd");
var OppoNativeAd_1 = require("./OppoNativeAd");
var OppoSubPackage_1 = require("./OppoSubPackage");
var OppoScreenshot_1 = require("./OppoScreenshot");
var OppoChannel = /** @class */ (function (_super) {
    __extends(OppoChannel, _super);
    function OppoChannel(id) {
        var _this = _super.call(this, id) || this;
        console.log('OppoChannel  constructor ');
        qg.onShow(function () {
            console.log('OppoChannel  onShow ');
        });
        qg.onHide(function () {
            console.log('OppoChannel  onHide ');
        });
        // this.bannerAd = new WXBanner()
        if (qg.createRewardedVideoAd) {
            _this.rewardAd = new OppoRewardAd_1.default(_this);
        }
        if (qg.createBannerAd) {
            _this.bannerAd = new OppoBannerAd_1.default(_this);
        }
        if (qg.createInsertAd) {
            _this.insertAd = new OppoInsertAd_1.default(_this);
        }
        if (qg.createNativeAd) {
            _this.nativeAd = new OppoNativeAd_1.default(_this);
        }
        console.log('OppoChannel  constructor  222222');
        _this.subPackage = new OppoSubPackage_1.default(_this);
        _this.screenshot = new OppoScreenshot_1.default(_this);
        return _this;
    }
    OppoChannel.prototype.showToast = function (title) {
        qg.showToast({ title: title });
    };
    OppoChannel.prototype.vibrateShort = function () {
        qg.vibrateShort({
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        });
    };
    OppoChannel.prototype.canInstallShortcut = function (func) {
        qg.hasShortcutInstalled({
            success: function (res) {
                // 判断图标未存在时，创建图标
                if (res == false) {
                    func(SDKConfig_1.ResultState.YES);
                }
                else {
                    func(SDKConfig_1.ResultState.NO);
                }
            },
            fail: function (err) {
                func(SDKConfig_1.ResultState.NO);
            },
            complete: function () {
                // func(false)
            }
        });
    };
    OppoChannel.prototype.installShortcut = function (result) {
        qg.installShortcut({
            success: function (param) {
                // 执行用户创建图标奖励
                console.log(' 安装成功 ', param);
                result(SDKConfig_1.ResultState.YES);
            },
            fail: function (err) {
                console.log(' 安装失败 ', err);
                result(SDKConfig_1.ResultState.NO);
            },
            complete: function () {
                // result(false)
            }
        });
    };
    OppoChannel.prototype.setLoadingProgress = function (progress) {
        qg.setLoadingProgress({
            progress: progress
        });
    };
    OppoChannel.prototype.loadingComplete = function () {
        qg.loadingComplete({
            complete: function (res) { }
        });
    };
    OppoChannel.prototype.navigateToMiniGame = function (appID) {
        qg.navigateToMiniGame({
            pkgName: appID,
            success: function () { },
            fail: function (res) {
                // console.log(JSON.stringify(res))
            }
        });
    };
    OppoChannel.prototype.previewImage = function (_tempFilePath) {
        qg.previewImage({
            urls: [_tempFilePath],
            success: function (res) {
                cc.log('Preview image success.');
                // self.label = '';
            }
        });
    };
    return OppoChannel;
}(BaseChannel_1.default));
exports.default = OppoChannel;

cc._RF.pop();