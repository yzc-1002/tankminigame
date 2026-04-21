"use strict";
cc._RF.push(module, '8df7dERVnZPybGdUJkGZeHh', 'OppoBannerAd');
// script/sdk/sdk/oppo/OppoBannerAd.ts

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
//https://open.oppomobile.com/wiki/doc#id=10536
var OppoBannerAd = /** @class */ (function (_super) {
    __extends(OppoBannerAd, _super);
    function OppoBannerAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OppoBannerAd.prototype.open = function (adID) {
        //逻辑要求开
        this.destroy();
        this.create(adID);
        this.show();
    };
    OppoBannerAd.prototype.onError = function (err) {
        this.channel.showToast('banner onError' + err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    OppoBannerAd.prototype.onLoad = function () {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.channel.showToast('banner onLoad');
    };
    OppoBannerAd.prototype.close = function () {
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    OppoBannerAd.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    OppoBannerAd.prototype.create = function (id) {
        this.adUnitID = id;
        var winSize = qg.getSystemInfoSync();
        this.instance = qg.createBannerAd({
            adUnitId: this.adUnitID,
            style: {}
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onResize(this.onResize.bind(this));
    };
    OppoBannerAd.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
        console.log(' banner show ');
    };
    OppoBannerAd.prototype.hide = function () {
        console.log(' banner hide ');
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    OppoBannerAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
            this.instance = null;
        }
    };
    return OppoBannerAd;
}(BaseAd_1.default));
exports.default = OppoBannerAd;

cc._RF.pop();