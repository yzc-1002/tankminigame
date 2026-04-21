"use strict";
cc._RF.push(module, 'ce350lbm49GIrbM/reYsLzn', 'WechatBannerAd');
// script/ad/wechat/WechatBannerAd.ts

"use strict";
/**
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createBannerAd.html
 * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion
 * 判断基础库版本号 >= 2.0.4 后再使用该 API。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatBannerAd = void 0;
var WechatBannerAd = /** @class */ (function () {
    function WechatBannerAd(adid, maxHeight) {
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
    WechatBannerAd.prototype._createAD = function () {
        if (this._instance == null) {
            this._instance = wx.createBannerAd({
                adUnitId: this._adID,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: this._wxSystemInfo.windowHeight - this._maxHeight,
                    width: 1000
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
    WechatBannerAd.prototype._onLoad = function () {
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
    WechatBannerAd.prototype._onError = function (err) {
        cc.log('banner onError', err);
        this._instance = null;
        this._reLoad();
    };
    //banner 广告尺寸变化
    WechatBannerAd.prototype._onResize = function (resize) {
        cc.log('banner onResize', resize.width, resize.height);
        if (resize.height > this._maxHeight && resize.width > 300) {
            var rate = this._maxHeight / resize.height;
            var rewidth = Math.max(resize.width * rate, 300);
            this._instance['style'].width = rewidth;
            cc.log('banner _onResize scale ', rate, rewidth);
        }
        else {
            if (resize.height > this._maxHeight) {
                this._heightError = true;
            }
            else {
                this._instance['style'].left = (this._wxSystemInfo.windowWidth - resize.width) / 2;
                this._instance['style'].top = this._wxSystemInfo.windowHeight - resize.height;
                cc.log('banner _onResize set ', this._instance['style'].left, this._instance['style'].top);
                this._heightError = false;
            }
        }
    };
    //销毁广告
    WechatBannerAd.prototype._destroy = function () {
        if (this._instance) {
            this._instance.offLoad(this._onLoad.bind(this));
            this._instance.offError(this._onError.bind(this));
            this._instance.offResize(this._onResize.bind(this));
            this._instance.destroy();
            this._instance = null;
        }
    };
    //是否允许广告
    WechatBannerAd.prototype._allowAd = function () {
        return this._compareVersion(this._wxSystemInfo['SDKVersion'], '2.0.4') >= 0;
    };
    //重新加载广告
    WechatBannerAd.prototype._reLoad = function () {
        var _this = this;
        //延迟5s再次加载广告
        var id = setTimeout(function () {
            _this._instance = null;
            _this._createAD();
            clearTimeout(id);
        }, 10000);
    };
    //展示广告(加载成功后直接显示)
    WechatBannerAd.prototype._show = function () {
        if (this._allowAd()) {
            this._createAD();
        }
    };
    //隐藏(直接销毁)
    WechatBannerAd.prototype._hide = function () {
        // this._destroy()
        if (this._instance) {
            this._instance.hide();
        }
    };
    WechatBannerAd.prototype._compareVersion = function (v1, v2) {
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
    return WechatBannerAd;
}());
exports.WechatBannerAd = WechatBannerAd;

cc._RF.pop();