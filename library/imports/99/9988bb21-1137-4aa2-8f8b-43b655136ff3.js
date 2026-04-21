"use strict";
cc._RF.push(module, '9988bshETdKoo+LQ7ZVE2/z', 'QQBanner');
// script/sdk/sdk/qq/QQBanner.ts

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
var QQBanner = /** @class */ (function (_super) {
    __extends(QQBanner, _super);
    function QQBanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QQBanner.prototype.open = function (adID) {
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
    QQBanner.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        // if (this.state == AdState.close) {
        //     return;
        // }
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    QQBanner.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    QQBanner.prototype.onLoad = function () {
        console.log('banner onLoad');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    QQBanner.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    QQBanner.prototype.create = function (adID) {
        var winSize = qq.getSystemInfoSync();
        this.adUnitID = adID;
        // console.log(winSize);
        var bannerHeight = 130;
        var bannerWidth = 350;
        this.instance = qq.createBannerAd({
            adUnitId: this.adUnitID,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: winSize.windowHeight - bannerHeight,
                width: bannerWidth
            }
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onResize(this.onResize.bind(this));
    };
    QQBanner.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
    };
    QQBanner.prototype.hide = function () {
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    QQBanner.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
        }
    };
    return QQBanner;
}(BaseAd_1.default));
exports.default = QQBanner;

cc._RF.pop();