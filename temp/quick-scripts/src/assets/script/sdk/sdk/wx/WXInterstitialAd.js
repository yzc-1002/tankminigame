"use strict";
cc._RF.push(module, 'c26b7kpHKpF0bNLjT06c43E', 'WXInterstitialAd');
// script/sdk/sdk/wx/WXInterstitialAd.ts

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
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createInterstitialAd.html
 */
var WXInterstitialAd = /** @class */ (function (_super) {
    __extends(WXInterstitialAd, _super);
    function WXInterstitialAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXInterstitialAd.prototype.open = function (adID) {
        if (this.state == SDKConfig_1.SDKState.open) {
            return;
        }
        if (this.state == SDKConfig_1.SDKState.loading) {
            return;
        }
        console.log('BaseInterstitialAd showAd adUnitID ', this.adUnitID);
        this.state = SDKConfig_1.SDKState.loading;
        this.create(adID);
        this.load();
    };
    WXInterstitialAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    WXInterstitialAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    WXInterstitialAd.prototype.onClose = function () {
        this.setState(SDKConfig_1.SDKState.close);
    };
    WXInterstitialAd.prototype.load = function () {
        if (this.instance) {
            this.instance.load();
        }
    };
    WXInterstitialAd.prototype.show = function () {
        if (this.instance) {
            this.setState(SDKConfig_1.SDKState.open);
            this.instance.show();
        }
    };
    WXInterstitialAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offClose(this.onClose.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.destroy();
            this.instanceMap[this.adUnitID] = null;
            this.instance = null;
        }
    };
    WXInterstitialAd.prototype.create = function (id) {
        this.adUnitID = id;
        // 创建插屏广告实例，提前初始化
        if (!this.instanceMap[id]) {
            this.instance = wx.createInterstitialAd({
                adUnitId: id
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            this.instanceMap[id] = this.instance;
        }
    };
    return WXInterstitialAd;
}(BaseAd_1.default));
exports.default = WXInterstitialAd;

cc._RF.pop();