"use strict";
cc._RF.push(module, 'a91ca7oPCxA3YUKQd9qWrWd', 'VivoNativeAd');
// script/sdk/sdk/vivo/VivoNativeAd.ts

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
var OppoNativeAdItemModel_1 = require("../oppo/OppoNativeAdItemModel");
var BaseAd_1 = require("../base/BaseAd");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://minigame.vivo.com.cn/documents/#/api/da/native-ad
 */
var VivoNativeAd = /** @class */ (function (_super) {
    __extends(VivoNativeAd, _super);
    function VivoNativeAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adItems = [];
        return _this;
    }
    VivoNativeAd.prototype.open = function (adUnitID, callback) {
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.callback = callback;
        this.create(adUnitID);
        this.load();
    };
    VivoNativeAd.prototype.create = function (adUnitID) {
        this.adUnitID = adUnitID;
        this.destroy();
        // if (!this.instanceMap.has(adUnitID)) {
        console.log('VivoNativeAd create adUnitID ', adUnitID);
        this.instance = qg.createNativeAd({
            posId: adUnitID,
        });
        console.log(' VivoNativeAd  this.instance  ', this.instance);
        if (this.instance) {
            this.instance.onLoad(this.onLoad.bind(this));
        }
    };
    VivoNativeAd.prototype.close = function () {
        this.callback = null;
    };
    VivoNativeAd.prototype.onLoad = function (res) {
        // console.log('onLoad ', res.adList)
        this.adItems.length = 0;
        if (res && res.adList) {
            this.setState(SDKConfig_1.SDKState.loadSucess);
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
        else {
            this.onError(null);
        }
    };
    VivoNativeAd.prototype.onError = function (err) {
        this.setState(SDKConfig_1.SDKState.loadFail);
        console.log(' BaseNativeAd onError err ', err);
        if (this.callback) {
            this.callback([]);
        }
    };
    VivoNativeAd.prototype.load = function () {
        if (this.instance)
            this.instance.load();
    };
    VivoNativeAd.prototype.reportAdClick = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdClick ', adId);
        this.instance.reportAdClick({
            adId: adId
        });
    };
    VivoNativeAd.prototype.reportAdShow = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdShow ', adId);
        this.instance.reportAdShow({
            adId: adId
        });
    };
    VivoNativeAd.prototype.destroy = function () {
        if (this.instance) {
            if (this.instance.offLoad) {
                this.instance.offLoad(this.onLoad.bind(this));
            }
            if (this.instance.offError) {
                this.instance.offError(this.onError.bind(this));
            }
            if (this.instance.destroy) {
                this.instance.destroy();
            }
            this.instance = null;
        }
    };
    return VivoNativeAd;
}(BaseAd_1.default));
exports.default = VivoNativeAd;

cc._RF.pop();