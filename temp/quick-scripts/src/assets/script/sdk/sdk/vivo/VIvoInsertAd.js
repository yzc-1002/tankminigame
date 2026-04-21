"use strict";
cc._RF.push(module, '01e79N9N55Np5E06BvpOlBi', 'VIvoInsertAd');
// script/sdk/sdk/vivo/VIvoInsertAd.ts

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
 * https://minigame.vivo.com.cn/documents/#/api/da/interstitial-da
 * 插屏广告实例不能复用，每次需要重新加载时要重新create
 */
var VivoInsertAd = /** @class */ (function (_super) {
    __extends(VivoInsertAd, _super);
    function VivoInsertAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VivoInsertAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    VivoInsertAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    VivoInsertAd.prototype.create = function (id) {
        var _this = this;
        this.adUnitID = id;
        console.log(' show insert ad ');
        // if (!this.instance) {
        this.instance = qg.createInsertAd({
            posId: id
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onError(function (err) {
            console.log("插屏广告加载失败", err);
        });
        this.instance.show().then(function () {
            console.log('插屏广告展示完成');
            _this.state = SDKConfig_1.SDKState.open;
        }).catch(function (err) {
            _this.state = SDKConfig_1.SDKState.close;
            console.log('插屏广告展示失败', JSON.stringify(err));
        });
        // }
    };
    VivoInsertAd.prototype.open = function (ad, func) {
        console.log('BaseInterstitialAd showAd this.state ', this.state);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.create(ad);
        // this.load()
    };
    VivoInsertAd.prototype.load = function () {
        console.log(' load ad ');
        this.instance.load();
    };
    VivoInsertAd.prototype.show = function () {
        console.log(' show ad ');
        this.instance.show();
    };
    return VivoInsertAd;
}(BaseAd_1.default));
exports.default = VivoInsertAd;

cc._RF.pop();