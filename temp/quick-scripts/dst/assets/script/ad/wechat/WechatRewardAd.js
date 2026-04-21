
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/wechat/WechatRewardAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcd2VjaGF0XFxXZWNoYXRSZXdhcmRBZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRzs7O0FBRUg7SUFRSSx3QkFBWSxJQUFJO1FBTmhCLGtCQUFhLEdBQXFCLEVBQUUsQ0FBQyxDQUFPLFNBQVM7UUFDckQsVUFBSyxHQUE2QixFQUFFLENBQUMsQ0FBTyxNQUFNO1FBQ2xELGNBQVMsR0FBeUIsSUFBSSxDQUFDLENBQUssTUFBTTtRQUNsRCxZQUFPLEdBQTJCLEtBQUssQ0FBQyxDQUFJLFFBQVE7UUFDcEQsY0FBUyxHQUF5QixJQUFJLENBQUMsQ0FBSyxNQUFNO1FBRzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxNQUFNO0lBQ04sOEJBQUssR0FBTDtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDO1lBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7Z0JBRXhCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2lCQUN0RjtxQkFBTTtvQkFDSCxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO29CQUN0QixJQUFJLENBQUMs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QyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDZjtRQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDcEIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNmO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRTVCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDYixPQUFPLENBQUMsQ0FBQTthQUNYO2lCQUFNLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUNaO1NBQ0o7UUFFRCxPQUFPLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFDTCxxQkFBQztBQUFELENBNUdBLEFBNEdDLElBQUE7QUE1R1ksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vbWluaWdhbWUvZGV2L2FwaS9hZC93eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQuaHRtbFxyXG4gKiDliJvlu7ogYmFubmVyIOW5v+WRiue7hOS7tuOAguivt+mAmui/hyB3eC5nZXRTeXN0ZW1JbmZvU3luYygpIOi/lOWbnuWvueixoeeahCBTREtWZXJzaW9uIFxyXG4gKiDliKTmlq3ln7rnoYDlupPniYjmnKzlj7cgPj0gMi4wLjQg5ZCO5YaN5L2/55So6K+lIEFQSeOAglxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBXZWNoYXRSZXdhcmRBZCB7XHJcblxyXG4gICAgX3d4U3lzdGVtSW5mbzogYW55ICAgICAgICAgICAgICA9IHt9OyAgICAgICAvL+W+ruS/oei/lOWbnueahOS/oeaBr1xyXG4gICAgX2FkSUQ6IHN0cmluZyAgICAgICAgICAgICAgICAgICA9ICcnOyAgICAgICAvL+W5v+WRimlkXHJcbiAgICBfaW5zdGFuY2U6IHd4LkludGVyc3RpdGlhbEFkICAgID0gbnVsbDsgICAgIC8v5bm/5ZGK5a6e5L6LXHJcbiAgICBfbG9hZGVkOmJvb2xlYW4gICAgICAgICAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5Yqg6L295a6M5oiQXHJcbiAgICBfY2FsbGJhY2sgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDsgICAgIC8v5aWW5Yqx5Zue6LCDXHJcblxyXG4gICAgY29uc3RydWN0b3IoYWRpZCkge1xyXG4gICAgICAgIHRoaXMuX3d4U3lzdGVtSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdGhpcy5fYWRJRCA9IGFkaWQ7XHJcbiAgICAgICAgdGhpcy5fbG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu65bm/5ZGKXHJcbiAgICBfbG9hZCgpIHtcclxuICAgICAgICBjYy5sb2coJ1Jld2FyZCBsb2FkICcsdGhpcy5fYWxsb3dBZCgpKVxyXG4gICAgICAgIGlmICh0aGlzLl9hbGxvd0FkKCkpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb21wYXJlVmVyc2lvbih0aGlzLl93eFN5c3RlbUluZm9bJ1NES1ZlcnNpb24nXSwnMi44LjAnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHsgYWRVbml0SWQ6IHRoaXMuX2FkSUQsIG11bHRpdG9uOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnUmV3YXJkIOS4jeaUr+aMgeWkmuS+iycpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoeyBhZFVuaXRJZDogdGhpcy5fYWRJRCB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub25Mb2FkKHRoaXMuX29uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub25FcnJvcih0aGlzLl9vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbkNsb3NlKHRoaXMuX29uQ2xvc2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UubG9hZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lub/lkYrlt7Lnu4/liqDovb1cclxuICAgIF9vbkxvYWQoKSB7XHJcbiAgICAgICAgY2MubG9nKCdSZXdhcmQgb25Mb2FkJylcclxuICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bm/5ZGK5Yqg6L295Ye66ZSZXHJcbiAgICBfb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjYy5sb2coJ1Jld2FyZCBvbkVycm9yJywgZXJyKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WFs+mXreW5v+WRilxyXG4gICAgX29uQ2xvc2UocmV0KSB7XHJcbiAgICAgICAgY2MubG9nKCdSZXdhcmQgb25DbG9zZSAnLHJldC5pc0VuZGVkKVxyXG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayhyZXQuaXNFbmRlZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hlub/lkYpcclxuICAgIF9kZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vZmZMb2FkKHRoaXMuX29uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vZmZFcnJvcih0aGlzLl9vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkNsb3NlKHRoaXMuX29uQ2xvc2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmK/lkKblhYHorrjlub/lkYpcclxuICAgIF9hbGxvd0FkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVWZXJzaW9uKHRoaXMuX3d4U3lzdGVtSW5mb1snU0RLVmVyc2lvbiddLCcyLjAuNCcpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBfaXNMb2FkKCl7XHJcbiAgICAgICAgLy8gY2MubG9nKCdSZXdhcmQgX2lzTG9hZCAnLHRoaXMuX2xvYWRlZClcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S65bm/5ZGKKOWKoOi9veaIkOWKn+WQjuebtOaOpeaYvuekuilcclxuICAgIF9zaG93KGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFja1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIF9jb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcclxuICAgICAgICB2MSA9IHYxLnNwbGl0KCcuJylcclxuICAgICAgICB2MiA9IHYyLnNwbGl0KCcuJylcclxuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcclxuICAgIFxyXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSlcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAobnVtMSA+IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtMSA8IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxufVxyXG4iXX0=