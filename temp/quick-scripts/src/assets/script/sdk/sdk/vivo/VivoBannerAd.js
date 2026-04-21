"use strict";
cc._RF.push(module, '5446ellTGFAC45GcFa4DRaK', 'VivoBannerAd');
// script/sdk/sdk/vivo/VivoBannerAd.ts

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
 * https://minigame.vivo.com.cn/documents/#/api/da/banner-da
 * banner广告实例不能复用，每次需要重新加载时要重新create
1、如果先调用createBannerAd()后 不能立马调用hide()方法，要等Ad创建成功后，在某个需要的场景下调hide()

2、如果有场景需要再次展示广告，如果广告被关闭了或者调了close()，必须重新创建才能展示出来，此时show()无效

3、广告调试时，会有可能因为填充率不足而展示不出来，具体请查看教程中的错误码信息

4、Banner广告创建间隔不得少于10s
 */
var VivoBannerAd = /** @class */ (function (_super) {
    __extends(VivoBannerAd, _super);
    function VivoBannerAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VivoBannerAd.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        // this.reLoad()
    };
    VivoBannerAd.prototype.onLoad = function () {
        console.log('banner onLoad this.logicState ', this.logicState);
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            // this.show()
        }
        else {
            this.hide();
        }
    };
    VivoBannerAd.prototype.open = function (adID) {
        //逻辑要求开
        this.logicState = SDKConfig_1.SDKState.open;
        //如果banner已经已经显示 则返回。
        if (this.state == SDKConfig_1.SDKState.loading) {
            console.log('showBanner 正在加载中');
            return;
        }
        this.state = SDKConfig_1.SDKState.loading;
        // if (this.adUnitID != adID) {
        this.destroy();
        this.create(adID);
    };
    VivoBannerAd.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        if (this.state == SDKConfig_1.SDKState.loading) {
            console.log('hideBanner 正在加载中');
            //如果先调用createBannerAd()后 不能立马调用hide()方法，要等Ad创建成功后，在某个需要的场景下调hide()
            return;
        }
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    VivoBannerAd.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    VivoBannerAd.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
        console.log(' banner show ');
    };
    VivoBannerAd.prototype.hide = function () {
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    VivoBannerAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offSize(this.onResize.bind(this));
            this.instance.destroy();
            this.instance = null;
        }
    };
    VivoBannerAd.prototype.create = function (adID) {
        var _this = this;
        this.adUnitID = adID;
        var winSize = qg.getSystemInfoSync();
        this.instance = qg.createBannerAd({
            posId: adID,
            style: {}
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onSize(this.onResize.bind(this));
        this.instance.show().then(function () {
            console.log('banner广告展示完成');
            _this.setState(SDKConfig_1.SDKState.open);
        }).catch(function (err) {
            _this.setState(SDKConfig_1.SDKState.close);
            console.log('banner广告展示失败', JSON.stringify(err));
        });
    };
    return VivoBannerAd;
}(BaseAd_1.default));
exports.default = VivoBannerAd;

cc._RF.pop();