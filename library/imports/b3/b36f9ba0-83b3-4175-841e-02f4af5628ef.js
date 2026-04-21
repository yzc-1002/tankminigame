"use strict";
cc._RF.push(module, 'b36f9ugg7NBdYQeAvSvVijv', 'QQInterstitialAd');
// script/sdk/sdk/qq/QQInterstitialAd.ts

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
var QQInterstitialAd = /** @class */ (function (_super) {
    __extends(QQInterstitialAd, _super);
    function QQInterstitialAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private interstitialAd = null;
    QQInterstitialAd.prototype.open = function (id) {
        console.log('BaseInterstitialAd showAd this.state ', this.state);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.create(id);
        this.load();
    };
    QQInterstitialAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    QQInterstitialAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    QQInterstitialAd.prototype.onClose = function () {
        console.log(' 插屏广告关闭');
    };
    QQInterstitialAd.prototype.load = function () {
        if (this.instance) {
            this.instance.load();
        }
    };
    QQInterstitialAd.prototype.show = function () {
        if (this.instance) {
            this.instance.show();
        }
    };
    QQInterstitialAd.prototype.create = function (id) {
        // 创建插屏广告实例，提前初始化
        this.adUnitID = id;
        if (!this.instance) {
            this.instance = qq.createInterstitialAd({
                adUnitId: id
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
        }
    };
    return QQInterstitialAd;
}(BaseAd_1.default));
exports.default = QQInterstitialAd;

cc._RF.pop();