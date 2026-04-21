"use strict";
cc._RF.push(module, 'ed6a9ih0F9DNr3E+yW0RPQi', 'WXBannerAd');
// script/sdk/sdk/wx/WXBannerAd.ts

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
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createBannerAd.html
 * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion
 * 判断基础库版本号 >= 2.0.4 后再使用该 API。每次调用该方法创建 banner 广告都会返回一个全新的实例。
 */
var WXBannerAd = /** @class */ (function (_super) {
    __extends(WXBannerAd, _super);
    function WXBannerAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXBannerAd.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    WXBannerAd.prototype.reLoad = function () {
        var _this = this;
        var id = setTimeout(function () {
            _this.create(_this.adUnitID);
            clearTimeout(id);
        }, 8000);
    };
    WXBannerAd.prototype.open = function (adID) {
        this.logicState = SDKConfig_1.SDKState.open;
        //正在展示
        if (this.state == SDKConfig_1.SDKState.open) {
            return;
        }
        //逻辑要求展示
        //如果banner已经已经显示 则返回。
        if (this.state == SDKConfig_1.SDKState.loading) {
            this.clickCount++;
            if (this.clickCount < 3) { //防止平台无法触发onLoad onError 时使用。
                return;
            }
        }
        this.clickCount = 0;
        this.state = SDKConfig_1.SDKState.loading;
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
    WXBannerAd.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        //已经关闭
        if (this.state == SDKConfig_1.SDKState.close) {
            return;
        }
        //逻辑要求关闭
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    WXBannerAd.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
    };
    WXBannerAd.prototype.hide = function () {
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    WXBannerAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
            this.instanceMap[this.adUnitID] = null;
        }
    };
    WXBannerAd.prototype.create = function (adID, param) {
        this.adUnitID = adID;
        var winSize = wx.getSystemInfoSync();
        // console.log(winSize);
        var bannerHeight = 130;
        var bannerWidth = 350;
        if (!this.instanceMap[adID]) {
            this.instance = wx.createBannerAd({
                adUnitId: adID,
                adIntervals: 30,
                style: {
                    left: (winSize.windowWidth - bannerWidth) / 2,
                    top: winSize.windowHeight - bannerHeight,
                    width: bannerWidth
                }
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onResize(this.onResize.bind(this));
            this.instanceMap[adID] = this.instance;
        }
    };
    WXBannerAd.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        this.reLoad();
    };
    WXBannerAd.prototype.onLoad = function () {
        console.log('banner onLoad');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    return WXBannerAd;
}(BaseAd_1.default));
exports.default = WXBannerAd;

cc._RF.pop();