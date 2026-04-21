"use strict";
cc._RF.push(module, '6f53aYV689GVoXug2DA+r5M', 'TTBannerAd');
// script/ad/bytedance/TTBannerAd.ts

"use strict";
/**
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/open-capacity/ads/tt.createbannerad
 * 创建 banner 广告组件。请通过 tt.getSystemInfoSync() 返回对象的 SDKVersion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTBannerAd = void 0;
var TTBannerAd = /** @class */ (function () {
    function TTBannerAd(adid, maxHeight) {
        this._wxSystemInfo = {}; //微信返回的信息
        this._adID = ''; //广告id
        this._maxHeight = 100; //最大高度
        this._instance = null; //广告实例
        this._heightError = false;
        this._wxSystemInfo = wx.getSystemInfoSync();
        this._adID = adid;
        this._maxHeight = Math.floor(maxHeight * (this._wxSystemInfo.windowWidth / 640));
        cc.log('WechatBannerAd constructor ', this._wxSystemInfo.windowWidth, this._wxSystemInfo.windowHeight, maxHeight, this._maxHeight);
    }
    //创建广告
    TTBannerAd.prototype._createAD = function () {
        if (this._instance == null) {
            var bannerWidth = 200;
            this._instance = tt.createBannerAd({
                adUnitId: this._adID,
                adIntervals: 30,
                style: {
                    left: (this._wxSystemInfo.windowWidth - bannerWidth) / 2,
                    top: this._wxSystemInfo.windowHeight - (bannerWidth / 16 * 9),
                    width: bannerWidth
                }
            });
            this._instance.onLoad(this._onLoad.bind(this));
            this._instance.onError(this._onError.bind(this));
            this._instance.onResize(this._onResize.bind(this));
        }
        else
            (this._instance.show());
    };
    //广告已经加载
    TTBannerAd.prototype._onLoad = function () {
        if (this._heightError) {
            cc.log('banner onLoad error');
            this._heightError = false;
            this._reLoad();
        }
        else {
            cc.log('banner onLoad show');
            this._instance.show();
        }
    };
    //广告加载出错
    TTBannerAd.prototype._onError = function (err) {
        cc.log('banner onError', err);
        this._instance = null;
        this._reLoad();
    };
    //banner 广告尺寸变化
    TTBannerAd.prototype._onResize = function (resize) {
        cc.log('banner onResize', resize.width, resize.height);
        if (resize.width != 0 && resize.height != 0) {
            // if (resize.height > this._maxHeight) {
            //     this._heightError = true;
            // }
            // else{
            this._instance['style'].top = this._wxSystemInfo.windowHeight - resize.height;
            this._instance['style'].left = (this._wxSystemInfo.windowWidth - resize.width) / 2;
            // }
        }
    };
    //销毁广告
    TTBannerAd.prototype._destroy = function () {
        if (this._instance) {
            this._instance.offLoad(this._onLoad.bind(this));
            this._instance.offError(this._onError.bind(this));
            this._instance.offResize(this._onResize.bind(this));
            this._instance.destroy();
            this._instance = null;
        }
    };
    //是否允许广告
    TTBannerAd.prototype._allowAd = function () {
        return this._compareVersion(this._wxSystemInfo['SDKVersion'], '1.3.0') >= 0;
    };
    //重新加载广告
    TTBannerAd.prototype._reLoad = function () {
        var _this = this;
        //延迟5s再次加载广告
        var id = setTimeout(function () {
            _this._instance = null;
            _this._createAD();
            clearTimeout(id);
        }, 10000);
    };
    //展示广告(加载成功后直接显示)
    TTBannerAd.prototype._show = function () {
        if (this._allowAd()) {
            this._createAD();
        }
    };
    //隐藏(直接销毁)
    TTBannerAd.prototype._hide = function () {
        // this._destroy()
        if (this._instance) {
            this._instance.hide();
        }
    };
    TTBannerAd.prototype._compareVersion = function (v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    };
    return TTBannerAd;
}());
exports.TTBannerAd = TTBannerAd;

cc._RF.pop();