
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/bytedance/TTInsertAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYnl0ZWRhbmNlXFxUVEluc2VydEFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztHQUlHOzs7QUFFSDtJQVFJLG9CQUFZLElBQUk7UUFOaEIsa0JBQWEsR0FBcUIsRUFBRSxDQUFDLENBQU8sU0FBUztRQUNyRCxVQUFLLEdBQTZCLEVBQUUsQ0FBQyxDQUFPLE1BQU07UUFDbEQsY0FBUyxHQUF5QixJQUFJLENBQUMsQ0FBSyxNQUFNO1FBQ2xELFlBQU8sR0FBMkIsS0FBSyxDQUFDO1FBQ3hDLGVBQVUsR0FBd0IsS0FBSyxDQUFDLENBQUksZUFBZTtRQUd2RCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTTtJQUNOLDBCQUFLLEdBQUw7UUFDSSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUN0QyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQztZQUNoQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUN2QixDQUFDLENBQUE7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtnQkFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtnQkFDaEQs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R0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRTVCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDYixPQUFPLENBQUMsQ0FBQTthQUNYO2lCQUFNLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUNaO1NBQ0o7UUFFRCxPQUFPLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFDTCxpQkFBQztBQUFELENBM0dBLEFBMkdDLElBQUE7QUEzR1ksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogaHR0cHM6Ly9odHRwczovL2RldmVsb3BlcnMud2VpeGluLnFxLmNvbS9taW5pZ2FtZS9kZXYvYXBpL2FkL3d4LmNyZWF0ZUludGVyc3RpdGlhbEFkLmh0bWxcclxuICog5Yib5bu6IGJhbm5lciDlub/lkYrnu4Tku7bjgILor7fpgJrov4cgd3guZ2V0U3lzdGVtSW5mb1N5bmMoKSDov5Tlm57lr7nosaHnmoQgU0RLVmVyc2lvbiBcclxuICog5Yik5pat5Z+656GA5bqT54mI5pys5Y+3ID49IDIuNi4wIOWQjuWGjeS9v+eUqOivpSBBUEnjgIJcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgVFRJbnNlcnRBZCB7XHJcblxyXG4gICAgX3d4U3lzdGVtSW5mbzogYW55ICAgICAgICAgICAgICA9IHt9OyAgICAgICAvL+W+ruS/oei/lOWbnueahOS/oeaBr1xyXG4gICAgX2FkSUQ6IHN0cmluZyAgICAgICAgICAgICAgICAgICA9ICcnOyAgICAgICAvL+W5v+WRimlkXHJcbiAgICBfaW5zdGFuY2UgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDsgICAgIC8v5bm/5ZGK5a6e5L6LXHJcbiAgICBfbG9hZGVkOmJvb2xlYW4gICAgICAgICAgICAgICAgID0gZmFsc2U7XHJcbiAgICBfdGltZUFsbG93OmJvb2xlYW4gICAgICAgICAgICAgID0gZmFsc2U7ICAgIC8v5ri45oiP55yLMTVz5YaF5LiN6IO95pKt5pS+5bm/5ZGKXHJcblxyXG4gICAgY29uc3RydWN0b3IoYWRpZCkge1xyXG4gICAgICAgIHRoaXMuX3d4U3lzdGVtSW5mbyA9IHR0LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdGhpcy5fYWRJRCA9IGFkaWQ7XHJcbiAgICAgICAgdGhpcy5fbG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu65bm/5ZGKXHJcbiAgICBfbG9hZCgpIHtcclxuICAgICAgICBjYy5sb2coJ2luc2VydCBsb2FkICcsdGhpcy5fYWxsb3dBZCgpKVxyXG4gICAgICAgIGlmICh0aGlzLl9hbGxvd0FkKCkpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0dC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuX2FkSURcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbkxvYWQodGhpcy5fb25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbkVycm9yKHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9uQ2xvc2UodGhpcy5fb25DbG9zZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5sb2FkKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W5v+WRiuW3sue7j+WKoOi9vVxyXG4gICAgX29uTG9hZCgpIHtcclxuICAgICAgICBjYy5sb2coJ2luc2VydCBvbkxvYWQnKVxyXG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lu7bov58xNXMo5b6u5L+h55qE6ZmQ5Yi2LOS4jeWFgeiuuOefreaXtumXtOWGhei/nue7reaSreaUvuW5v+WRiilcclxuICAgICAgICBsZXQgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUFsbG93ID0gdHJ1ZVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICAgICAgfSwgMTUwMDApXHJcbiAgICB9XHJcblxyXG4gICAgLy/lub/lkYrliqDovb3lh7rplJlcclxuICAgIF9vbkVycm9yKGVycikge1xyXG4gICAgICAgIGNjLmxvZygnaW5zZXJ0IG9uRXJyb3InLCBlcnIpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5YWz6Zet5bm/5ZGKXHJcbiAgICBfb25DbG9zZSgpIHtcclxuICAgICAgICBjYy5sb2coJ2luc2VydCBvbkNsb3NlJylcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeW5v+WRilxyXG4gICAgX2Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkxvYWQodGhpcy5fb25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkVycm9yKHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub2ZmQ2xvc2UodGhpcy5fb25DbG9zZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5kZXN0cm95KClcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuWFgeiuuOW5v+WRilxyXG4gICAgX2FsbG93QWQoKXtcclxuICAgICAgICBjb25zdCBpc1RvdXRpYWlvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKS5hcHBOYW1lID09PSBcIlRvdXRpYW9cIjtcclxuICAgICAgICAvLyDmj5LlsY/lub/lkYrku4Xku4rml6XlpLTmnaHlronljZPlrqLmiLfnq6/mlK/mjIFcclxuICAgICAgICByZXR1cm4gaXNUb3V0aWFpbztcclxuICAgIH1cclxuXHJcbiAgICBfaXNMb2FkKCl7XHJcbiAgICAgICAgY2MubG9nKCdpbnNlcnQgX2lzTG9hZCAnLHRoaXMuX2xvYWRlZCwgdGhpcy5fdGltZUFsbG93KVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZWQgJiYgdGhpcy5fdGltZUFsbG93O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S65bm/5ZGKKOWKoOi9veaIkOWKn+WQjuebtOaOpeaYvuekuilcclxuICAgIF9zaG93KCkge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIF9jb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcclxuICAgICAgICB2MSA9IHYxLnNwbGl0KCcuJylcclxuICAgICAgICB2MiA9IHYyLnNwbGl0KCcuJylcclxuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcclxuICAgIFxyXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSlcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAobnVtMSA+IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtMSA8IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxufVxyXG4iXX0=