"use strict";
cc._RF.push(module, 'ea50ddZNkZL9LBSpwQ0XXKA', 'TTInsertAd1');
// script/sdk/sdk/tt/TTInsertAd1.ts

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
 * auth 游子陈
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/open-capacity/ads/tt.createinterstitialad
 */
var TTInsertAd = /** @class */ (function (_super) {
    __extends(TTInsertAd, _super);
    function TTInsertAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TTInsertAd.prototype.open = function (adID) {
        console.log('BaseInterstitialAd showAd this.state ', this.state);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.create(adID);
        this.load();
    };
    TTInsertAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    TTInsertAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    TTInsertAd.prototype.onClose = function () {
        console.log(' 插屏广告关闭');
    };
    TTInsertAd.prototype.load = function () {
        // if (this.instance) {
        //     console.log(' Insert load ')
        //     this.instance.load()
        // }
    };
    TTInsertAd.prototype.show = function () {
        // if (this.instance) {
        //     this.instance.show()
        // }
    };
    TTInsertAd.prototype.destroy = function () {
        // if (this.instance != null) {
        //     this.instance.offLoad(this.onLoad.bind(this))
        //     this.instance.offError(this.onError.bind(this))
        //     this.instance.offClose(this.onClose.bind(this))
        //     this.instance.destroy();
        //     this.instance = null;
        // }
    };
    TTInsertAd.prototype.create = function (id) {
        this.adUnitID = id;
        // 创建插屏广告实例，提前初始化
        var isToutiaio = tt.getSystemInfoSync().appName === "Toutiao";
        // 插屏广告仅今日头条安卓客户端支持
        console.log(" isToutiaio ", isToutiaio);
        if (isToutiaio) {
            var interstitialAd_1 = tt.createInterstitialAd({
                adUnitId: this.adUnitID
            });
            interstitialAd_1
                .load()
                .then(function () {
                console.log("interstitialAd  show ");
                interstitialAd_1.show();
            })
                .catch(function (err) {
                console.log(err);
            });
        }
    };
    return TTInsertAd;
}(BaseAd_1.default));
exports.default = TTInsertAd;

cc._RF.pop();