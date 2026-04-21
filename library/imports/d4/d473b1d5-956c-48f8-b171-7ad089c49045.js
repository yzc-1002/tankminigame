"use strict";
cc._RF.push(module, 'd473bHVlWxI+LFxetCJxJBF', 'OppoNativeAd');
// script/sdk/sdk/oppo/OppoNativeAd.ts

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
var OppoNativeAdItemModel_1 = require("./OppoNativeAdItemModel");
var SDKConfig_1 = require("../SDKConfig");
var BaseAd_1 = require("../base/BaseAd");
/**
 * https://open.oppomobile.com/wiki/doc#id=10539
 */
var OppoNativeAd = /** @class */ (function (_super) {
    __extends(OppoNativeAd, _super);
    function OppoNativeAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adItems = [];
        return _this;
    }
    OppoNativeAd.prototype.open = function (adUnitID, callback) {
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.callback = callback;
        this.create(adUnitID);
        this.load();
    };
    OppoNativeAd.prototype.close = function () {
        this.callback = null;
    };
    OppoNativeAd.prototype.onError = function (err) {
        this.setState(SDKConfig_1.SDKState.loadFail);
        console.log(' BaseNativeAd onError err ', err);
        if (this.callback) {
            this.callback([]);
        }
    };
    OppoNativeAd.prototype.onLoad = function (res) {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        console.log('onLoad ', res.adList);
        this.adItems.length = 0;
        if (res.adList) {
            for (var index = 0; index < res.adList.length; index++) {
                var element = res.adList[index];
                var adItem = new OppoNativeAdItemModel_1.default();
                adItem.initWithOppo(element);
                this.reportAdShow(adItem.getID());
                this.adItems.push(adItem);
            }
            if (this.callback) {
                this.callback(this.adItems);
            }
        }
    };
    OppoNativeAd.prototype.create = function (adUnitID) {
        if (!this.instanceMap[adUnitID]) {
            this.instance = qg.createNativeAd({
                adUnitId: adUnitID,
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instanceMap[adUnitID] = this.instance;
        }
        else {
            this.instance = this.instanceMap[adUnitID];
        }
    };
    OppoNativeAd.prototype.load = function () {
        this.instance.load();
    };
    OppoNativeAd.prototype.reportAdClick = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdClick ', adId);
        this.instance.reportAdClick({
            adId: adId
        });
    };
    OppoNativeAd.prototype.reportAdShow = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdShow ', adId);
        this.instance.reportAdShow({
            adId: adId
        });
    };
    OppoNativeAd.prototype.destroy = function () {
        this.instance.destroy();
    };
    return OppoNativeAd;
}(BaseAd_1.default));
exports.default = OppoNativeAd;

cc._RF.pop();