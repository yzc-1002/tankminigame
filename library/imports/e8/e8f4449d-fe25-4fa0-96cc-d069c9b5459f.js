"use strict";
cc._RF.push(module, 'e8f44Sd/iVPoJbM0GnJtUWf', 'TTBanner');
// script/sdk/sdk/tt/TTBanner.ts

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
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/open-capacity/ads/tt.createbannerad
 */
var TTBanner = /** @class */ (function (_super) {
    __extends(TTBanner, _super);
    function TTBanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // protected instance: any;
    TTBanner.prototype.open = function (adID) {
        //逻辑要求开
        this.logicState = SDKConfig_1.SDKState.open;
        //如果banner已经已经显示 则返回。
        // if (this.state == AdState.loading) {
        //     return;
        // }
        // this.state = AdState.loading;
        if (this.adUnitID != adID) {
            this.destroy();
            this.create(adID);
        }
        else {
            this.showCount++;
            if (this.showCount > 3) { //展示超过3次 从新加载
                this.showCount = 0;
                this.destroy();
                this.create(adID);
            }
            else {
                this.show();
            }
        }
    };
    TTBanner.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        // if (this.state == AdState.close) {
        //     return;
        // }
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    TTBanner.prototype.onResize = function (size) {
        var winSize = tt.getSystemInfoSync();
        console.log(size.width, size.height);
        if (size.width != 0 && size.height != 0) {
            this.instance.style.top = winSize.windowHeight - size.height;
            this.instance.style.left = (winSize.windowWidth - size.width) / 2;
        }
    };
    TTBanner.prototype.create = function (adId) {
        this.adUnitID = adId;
        var winSize = tt.getSystemInfoSync();
        // console.log(winSize);
        // let bannerHeight = 200;
        var bannerWidth = 200;
        this.instance = tt.createBannerAd({
            adUnitId: this.adUnitID,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: winSize.windowHeight - (bannerWidth / 16 * 9),
                width: bannerWidth
            }
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onResize(this.onResize.bind(this));
    };
    TTBanner.prototype.show = function () {
        if (this.instance) {
            this.state = SDKConfig_1.SDKState.open;
            this.instance.show();
        }
    };
    TTBanner.prototype.hide = function () {
        if (this.instance) {
            this.state = SDKConfig_1.SDKState.close;
            this.instance.hide();
        }
    };
    TTBanner.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    TTBanner.prototype.onLoad = function () {
        console.log('banner onLoad');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    TTBanner.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
        }
    };
    return TTBanner;
}(BaseAd_1.default));
exports.default = TTBanner;

cc._RF.pop();