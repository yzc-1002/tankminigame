
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/wechat/WechatInsertAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b8eab3a7FEf6zqURZ2b0Cs', 'WechatInsertAd');
// script/ad/wechat/WechatInsertAd.ts

"use strict";
/**
 * https://https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createInterstitialAd.html
 * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion
 * 判断基础库版本号 >= 2.6.0 后再使用该 API。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatInsertAd = void 0;
var WechatInsertAd = /** @class */ (function () {
    function WechatInsertAd(adid) {
        this._wxSystemInfo = {}; //微信返回的信息
        this._adID = ''; //广告id
        this._instance = null; //广告实例
        this._loaded = false;
        this._timeAllow = false; //游戏看15s内不能播放广告
        this._wxSystemInfo = wx.getSystemInfoSync();
        this._adID = adid;
        this._load();
    }
    //创建广告
    WechatInsertAd.prototype._load = function () {
        cc.log('insert load ', this._allowAd());
        if (this._allowAd()) {
            if (this._instance == null) {
                this._instance = wx.createInterstitialAd({
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
    WechatInsertAd.prototype._onLoad = function () {
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
    WechatInsertAd.prototype._onError = function (err) {
        cc.log('insert onError', err);
    };
    //关闭广告
    WechatInsertAd.prototype._onClose = function () {
        cc.log('insert onClose');
    };
    //销毁广告
    WechatInsertAd.prototype._destroy = function () {
        if (this._instance) {
            this._instance.offLoad(this._onLoad.bind(this));
            this._instance.offError(this._onError.bind(this));
            this._instance.offClose(this._onClose.bind(this));
            this._instance.destroy();
            this._instance = null;
        }
    };
    //是否允许广告
    WechatInsertAd.prototype._allowAd = function () {
        return this._compareVersion(this._wxSystemInfo['SDKVersion'], '2.6.0') >= 0;
    };
    WechatInsertAd.prototype._isLoad = function () {
        cc.log('insert _isLoad ', this._loaded, this._timeAllow);
        return this._loaded && this._timeAllow;
    };
    //展示广告(加载成功后直接显示)
    WechatInsertAd.prototype._show = function () {
        this._instance.show();
    };
    WechatInsertAd.prototype._compareVersion = function (v1, v2) {
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
    return WechatInsertAd;
}());
exports.WechatInsertAd = WechatInsertAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcd2VjaGF0XFxXZWNoYXRJbnNlcnRBZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRzs7O0FBRUg7SUFRSSx3QkFBWSxJQUFJO1FBTmhCLGtCQUFhLEdBQXFCLEVBQUUsQ0FBQyxDQUFPLFNBQVM7UUFDckQsVUFBSyxHQUE2QixFQUFFLENBQUMsQ0FBTyxNQUFNO1FBQ2xELGNBQVMsR0FBeUIsSUFBSSxDQUFDLENBQUssTUFBTTtRQUNsRCxZQUFPLEdBQTJCLEtBQUssQ0FBQztRQUN4QyxlQUFVLEdBQXdCLEtBQUssQ0FBQyxDQUFJLGVBQWU7UUFHdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU07SUFDTiw4QkFBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUM7WUFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ3JDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDdkIsQ0FBQyxDQUFBO2dCQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7Z0JBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7Z0JBQ2hE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RUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxDQUFBO2FBQ1g7aUJBQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO2dCQUNwQixPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ1o7U0FDSjtRQUVELE9BQU8sQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F6R0EsQUF5R0MsSUFBQTtBQXpHWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBodHRwczovL2h0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL21pbmlnYW1lL2Rldi9hcGkvYWQvd3guY3JlYXRlSW50ZXJzdGl0aWFsQWQuaHRtbFxyXG4gKiDliJvlu7ogYmFubmVyIOW5v+WRiue7hOS7tuOAguivt+mAmui/hyB3eC5nZXRTeXN0ZW1JbmZvU3luYygpIOi/lOWbnuWvueixoeeahCBTREtWZXJzaW9uIFxyXG4gKiDliKTmlq3ln7rnoYDlupPniYjmnKzlj7cgPj0gMi42LjAg5ZCO5YaN5L2/55So6K+lIEFQSeOAglxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBXZWNoYXRJbnNlcnRBZCB7XHJcblxyXG4gICAgX3d4U3lzdGVtSW5mbzogYW55ICAgICAgICAgICAgICA9IHt9OyAgICAgICAvL+W+ruS/oei/lOWbnueahOS/oeaBr1xyXG4gICAgX2FkSUQ6IHN0cmluZyAgICAgICAgICAgICAgICAgICA9ICcnOyAgICAgICAvL+W5v+WRimlkXHJcbiAgICBfaW5zdGFuY2U6IHd4LkludGVyc3RpdGlhbEFkICAgID0gbnVsbDsgICAgIC8v5bm/5ZGK5a6e5L6LXHJcbiAgICBfbG9hZGVkOmJvb2xlYW4gICAgICAgICAgICAgICAgID0gZmFsc2U7XHJcbiAgICBfdGltZUFsbG93OmJvb2xlYW4gICAgICAgICAgICAgID0gZmFsc2U7ICAgIC8v5ri45oiP55yLMTVz5YaF5LiN6IO95pKt5pS+5bm/5ZGKXHJcblxyXG4gICAgY29uc3RydWN0b3IoYWRpZCkge1xyXG4gICAgICAgIHRoaXMuX3d4U3lzdGVtSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdGhpcy5fYWRJRCA9IGFkaWQ7XHJcbiAgICAgICAgdGhpcy5fbG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu65bm/5ZGKXHJcbiAgICBfbG9hZCgpIHtcclxuICAgICAgICBjYy5sb2coJ2luc2VydCBsb2FkICcsdGhpcy5fYWxsb3dBZCgpKVxyXG4gICAgICAgIGlmICh0aGlzLl9hbGxvd0FkKCkpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB3eC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuX2FkSURcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbkxvYWQodGhpcy5fb25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbkVycm9yKHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9uQ2xvc2UodGhpcy5fb25DbG9zZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5sb2FkKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W5v+WRiuW3sue7j+WKoOi9vVxyXG4gICAgX29uTG9hZCgpIHtcclxuICAgICAgICBjYy5sb2coJ2luc2VydCBvbkxvYWQnKVxyXG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lu7bov58xNXMo5b6u5L+h55qE6ZmQ5Yi2LOS4jeWFgeiuuOefreaXtumXtOWGhei/nue7reaSreaUvuW5v+WRiilcclxuICAgICAgICBsZXQgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUFsbG93ID0gdHJ1ZVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICAgICAgfSwgMTUwMDApXHJcbiAgICB9XHJcblxyXG4gICAgLy/lub/lkYrliqDovb3lh7rplJlcclxuICAgIF9vbkVycm9yKGVycikge1xyXG4gICAgICAgIGNjLmxvZygnaW5zZXJ0IG9uRXJyb3InLCBlcnIpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5YWz6Zet5bm/5ZGKXHJcbiAgICBfb25DbG9zZSgpIHtcclxuICAgICAgICBjYy5sb2coJ2luc2VydCBvbkNsb3NlJylcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeW5v+WRilxyXG4gICAgX2Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkxvYWQodGhpcy5fb25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkVycm9yKHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub2ZmQ2xvc2UodGhpcy5fb25DbG9zZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5kZXN0cm95KClcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuWFgeiuuOW5v+WRilxyXG4gICAgX2FsbG93QWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVZlcnNpb24odGhpcy5fd3hTeXN0ZW1JbmZvWydTREtWZXJzaW9uJ10sJzIuNi4wJykgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBfaXNMb2FkKCl7XHJcbiAgICAgICAgY2MubG9nKCdpbnNlcnQgX2lzTG9hZCAnLHRoaXMuX2xvYWRlZCwgdGhpcy5fdGltZUFsbG93KVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZWQgJiYgdGhpcy5fdGltZUFsbG93O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S65bm/5ZGKKOWKoOi9veaIkOWKn+WQjuebtOaOpeaYvuekuilcclxuICAgIF9zaG93KCkge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIF9jb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcclxuICAgICAgICB2MSA9IHYxLnNwbGl0KCcuJylcclxuICAgICAgICB2MiA9IHYyLnNwbGl0KCcuJylcclxuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcclxuICAgIFxyXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSlcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAobnVtMSA+IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtMSA8IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxufVxyXG4iXX0=