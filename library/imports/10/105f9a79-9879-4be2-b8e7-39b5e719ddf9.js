"use strict";
cc._RF.push(module, '105f9p5mHlL4rjnObXnGd35', 'WechatRewardAd');
// script/ad/wechat/WechatRewardAd.ts

"use strict";
/**
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createRewardedVideoAd.html
 * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion
 * 判断基础库版本号 >= 2.0.4 后再使用该 API。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatRewardAd = void 0;
var WechatRewardAd = /** @class */ (function () {
    function WechatRewardAd(adid) {
        this._wxSystemInfo = {}; //微信返回的信息
        this._adID = ''; //广告id
        this._instance = null; //广告实例
        this._loaded = false; //是否加载完成
        this._callback = null; //奖励回调
        this._wxSystemInfo = wx.getSystemInfoSync();
        this._adID = adid;
        this._load();
    }
    //创建广告
    WechatRewardAd.prototype._load = function () {
        cc.log('Reward load ', this._allowAd());
        if (this._allowAd()) {
            if (this._instance == null) {
                if (this._compareVersion(this._wxSystemInfo['SDKVersion'], '2.8.0')) {
                    this._instance = wx.createRewardedVideoAd({ adUnitId: this._adID, multiton: true });
                }
                else {
                    cc.log('Reward 不支持多例');
                    this._instance = wx.createRewardedVideoAd({ adUnitId: this._adID });
                }
                this._instance.onLoad(this._onLoad.bind(this));
                this._instance.onError(this._onError.bind(this));
                this._instance.onClose(this._onClose.bind(this));
            }
            else {
                this._instance.load();
            }
        }
    };
    //广告已经加载
    WechatRewardAd.prototype._onLoad = function () {
        cc.log('Reward onLoad');
        this._loaded = true;
    };
    //广告加载出错
    WechatRewardAd.prototype._onError = function (err) {
        cc.log('Reward onError', err);
    };
    //关闭广告
    WechatRewardAd.prototype._onClose = function (ret) {
        cc.log('Reward onClose ', ret.isEnded);
        if (this._callback) {
            this._callback(ret.isEnded);
        }
    };
    //销毁广告
    WechatRewardAd.prototype._destroy = function () {
        if (this._instance) {
            this._instance.offLoad(this._onLoad.bind(this));
            this._instance.offError(this._onError.bind(this));
            this._instance.offClose(this._onClose.bind(this));
            this._instance.destroy();
            this._instance = null;
        }
    };
    //是否允许广告
    WechatRewardAd.prototype._allowAd = function () {
        return this._compareVersion(this._wxSystemInfo['SDKVersion'], '2.0.4') >= 0;
    };
    WechatRewardAd.prototype._isLoad = function () {
        // cc.log('Reward _isLoad ',this._loaded)
        return this._loaded;
    };
    //展示广告(加载成功后直接显示)
    WechatRewardAd.prototype._show = function (callback) {
        this._callback = callback;
        this._instance.show();
    };
    WechatRewardAd.prototype._compareVersion = function (v1, v2) {
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
    return WechatRewardAd;
}());
exports.WechatRewardAd = WechatRewardAd;

cc._RF.pop();