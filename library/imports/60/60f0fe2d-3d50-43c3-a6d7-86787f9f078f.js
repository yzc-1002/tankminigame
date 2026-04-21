"use strict";
cc._RF.push(module, '60f0f4tPVBDw6bXhnh/nweP', 'VivoChannel');
// script/sdk/sdk/vivo/VivoChannel.ts

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
var VivoRewardAd_1 = require("./VivoRewardAd");
var VivoBannerAd_1 = require("./VivoBannerAd");
var VIvoInsertAd_1 = require("./VIvoInsertAd");
var VivoNativeAd_1 = require("./VivoNativeAd");
var VivoChannel = /** @class */ (function (_super) {
    __extends(VivoChannel, _super);
    function VivoChannel(id) {
        var _this = _super.call(this, id) || this;
        qg.onShow(function () {
            console.log('VivoChannel  onShow ');
        });
        qg.onHide(function () {
            console.log('VivoChannel  onHide ');
        });
        console.log('qg ', qg);
        // this.bannerAd = new WXBanner()
        if (qg.createRewardedVideoAd) {
            _this.rewardAd = new VivoRewardAd_1.default(_this);
        }
        if (qg.createBannerAd) {
            _this.bannerAd = new VivoBannerAd_1.default(_this);
        }
        if (qg.createInsertAd) {
            _this.insertAd = new VIvoInsertAd_1.default(_this);
        }
        if (qg.createNativeAd) {
            _this.nativeAd = new VivoNativeAd_1.default(_this);
        }
        return _this;
    }
    VivoChannel.prototype.showToast = function (title) {
        qg.showToast({
            message: title
        });
    };
    VivoChannel.prototype.vibrateShort = function () {
        qg.vibrateShort({
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        });
    };
    VivoChannel.prototype.canInstallShortcut = function (func) {
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
    VivoChannel.prototype.previewImage = function (_tempFilePath) {
        qg.previewImage({
            uris: [_tempFilePath],
            success: function (res) {
                cc.log('Preview image success.');
                // self.label = '';
            }
        });
    };
    VivoChannel.prototype.installShortcut = function (result) {
        qg.installShortcut({
            success: function () {
                // 执行用户创建图标奖励
                console.log(' 安装成功 ');
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
    VivoChannel.prototype.navigateToMiniProgram = function (appID) {
        qg.navigateToMiniGame({
            pkgName: appID,
            success: function () { },
            fail: function (res) {
                // console.log(JSON.stringify(res))
            }
        });
    };
    return VivoChannel;
}(BaseChannel_1.default));
exports.default = VivoChannel;

cc._RF.pop();