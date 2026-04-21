"use strict";
cc._RF.push(module, '36399GjzH5Jo7pzNfN6omeX', 'TTInsertAd');
// script/ad/bytedance/TTInsertAd.ts

"use strict";
/**
 * https://https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createInterstitialAd.html
 * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion
 * 判断基础库版本号 >= 2.6.0 后再使用该 API。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTInsertAd = void 0;
var TTInsertAd = /** @class */ (function () {
    function TTInsertAd(adid) {
        this._wxSystemInfo = {}; //微信返回的信息
        this._adID = ''; //广告id
        this._instance = null; //广告实例
        this._loaded = false;
        this._timeAllow = false; //游戏看15s内不能播放广告
        this._wxSystemInfo = tt.getSystemInfoSync();
        this._adID = adid;
        this._load();
    }
    //创建广告
    TTInsertAd.prototype._load = function () {
        cc.log('insert load ', this._allowAd());
        if (this._allowAd()) {
            if (this._instance == null) {
                this._instance = tt.createInterstitialAd({
                    adUnitId: this._adID
                });
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
    TTInsertAd.prototype._onLoad = function () {
        var _this = this;
        cc.log('insert onLoad');
        this._loaded = true;
        //延迟15s(微信的限制,不允许短时间内连续播放广告)
        var id = setTimeout(function () {
            _this._timeAllow = true;
            clearTimeout(id);
        }, 15000);
    };
    //广告加载出错
    TTInsertAd.prototype._onError = function (err) {
        cc.log('insert onError', err);
    };
    //关闭广告
    TTInsertAd.prototype._onClose = function () {
        cc.log('insert onClose');
    };
    //销毁广告
    TTInsertAd.prototype._destroy = function () {
        if (this._instance) {
            this._instance.offLoad(this._onLoad.bind(this));
            this._instance.offError(this._onError.bind(this));
            this._instance.offClose(this._onClose.bind(this));
            this._instance.destroy();
            this._instance = null;
        }
    };
    //是否允许广告
    TTInsertAd.prototype._allowAd = function () {
        var isToutiaio = tt.getSystemInfoSync().appName === "Toutiao";
        // 插屏广告仅今日头条安卓客户端支持
        return isToutiaio;
    };
    TTInsertAd.prototype._isLoad = function () {
        cc.log('insert _isLoad ', this._loaded, this._timeAllow);
        return this._loaded && this._timeAllow;
    };
    //展示广告(加载成功后直接显示)
    TTInsertAd.prototype._show = function () {
        this._instance.show();
    };
    TTInsertAd.prototype._compareVersion = function (v1, v2) {
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
    return TTInsertAd;
}());
exports.TTInsertAd = TTInsertAd;

cc._RF.pop();