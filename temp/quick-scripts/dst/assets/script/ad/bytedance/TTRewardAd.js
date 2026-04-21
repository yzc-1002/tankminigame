
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/bytedance/TTRewardAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '140a9wIqH9Ou6zcLz7ri93r', 'TTRewardAd');
// script/ad/bytedance/TTRewardAd.ts

"use strict";
/**
 * https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/open-capacity/ads/tt-create-rewarded-video-ad/
 * 不支持开发者工具,只能在真机调试
 * 判断基础库版本号 >= 1.3.0 后再使用该 API。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTRewardAd = void 0;
var TTRewardAd = /** @class */ (function () {
    function TTRewardAd(adid) {
        this._wxSystemInfo = {}; //微信返回的信息
        this._adID = ''; //广告id
        this._instance = null; //广告实例
        this._loaded = false; //是否加载完成
        this._callback = null; //奖励回调
        this._wxSystemInfo = tt.getSystemInfoSync();
        this._adID = adid;
        this._load();
    }
    //创建广告
    TTRewardAd.prototype._load = function () {
        cc.log('Reward load ', this._allowAd());
        if (this._allowAd()) {
            if (this._instance == null) {
                this._instance = tt.createRewardedVideoAd({ adUnitId: this._adID });
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
    TTRewardAd.prototype._onLoad = function () {
        cc.log('Reward onLoad');
        this._loaded = true;
    };
    //广告加载出错
    TTRewardAd.prototype._onError = function (err) {
        cc.log('Reward onError', err);
    };
    //关闭广告
    TTRewardAd.prototype._onClose = function (ret) {
        cc.log('Reward onClose ', ret.isEnded);
        if (this._callback) {
            this._callback(ret.isEnded);
        }
    };
    //销毁广告
    TTRewardAd.prototype._destroy = function () {
        if (this._instance) {
            this._instance.offLoad(this._onLoad.bind(this));
            this._instance.offError(this._onError.bind(this));
            this._instance.offClose(this._onClose.bind(this));
            this._instance.destroy();
            this._instance = null;
        }
    };
    //是否允许广告
    TTRewardAd.prototype._allowAd = function () {
        return this._compareVersion(this._wxSystemInfo['SDKVersion'], '1.3.0') >= 0;
    };
    TTRewardAd.prototype._isLoad = function () {
        cc.log('Reward _isLoad ', this._loaded);
        return this._loaded;
    };
    //展示广告(加载成功后直接显示)
    TTRewardAd.prototype._show = function (callback) {
        this._callback = callback;
        this._instance.show();
    };
    TTRewardAd.prototype._compareVersion = function (v1, v2) {
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
    return TTRewardAd;
}());
exports.TTRewardAd = TTRewardAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYnl0ZWRhbmNlXFxUVFJld2FyZEFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztHQUlHOzs7QUFFSDtJQVFJLG9CQUFZLElBQUk7UUFOaEIsa0JBQWEsR0FBcUIsRUFBRSxDQUFDLENBQU8sU0FBUztRQUNyRCxVQUFLLEdBQTZCLEVBQUUsQ0FBQyxDQUFPLE1BQU07UUFDbEQsY0FBUyxHQUF5QixJQUFJLENBQUMsQ0FBSyxNQUFNO1FBQ2xELFlBQU8sR0FBMkIsS0FBSyxDQUFDLENBQUksUUFBUTtRQUNwRCxjQUFTLEdBQXlCLElBQUksQ0FBQyxDQUFLLE1BQU07UUFHOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU07SUFDTiwwQkFBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUM7WUFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7Z0JBQ25FLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7Z0JBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7Z0JBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7YUFDbkQ7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTthQUN4QjtTQUNKO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUiw0QkFBTyxHQUFQO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUTtJQUNSLDZCQUFRLEdBQVIsVUFBUyxHQUFHO1FBQ1IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsTUFBTTtJQUNOLDZCQUFRLEdBQVIsVUFBUyxHQUFHO1FBQ1IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzlCO0lBQ0wsQ0FBQztJQUVELE1BQU07SUFDTiw2QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLDZCQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUdELDRCQUFPLEdBQVA7UUFDSSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN0QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELGlCQUFpQjtJQUNqQiwwQkFBSyxHQUFMLFVBQU0sUUFBUTtRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBZ0IsRUFBRSxFQUFFLEVBQUU7UUFDbEIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUUxQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDZjtRQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDcEIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNmO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRTVCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDYixPQUFPLENBQUMsQ0FBQTthQUNYO2lCQUFNLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUNaO1NBQ0o7UUFFRCxPQUFPLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFDTCxpQkFBQztBQUFELENBdEdBLEFBc0dDLElBQUE7QUF0R1ksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogaHR0cHM6Ly9taWNyb2FwcC5ieXRlZGFuY2UuY29tL2RvY3MvemgtQ04vbWluaS1nYW1lL2RldmVsb3Avb3Blbi1jYXBhY2l0eS9hZHMvdHQtY3JlYXRlLXJld2FyZGVkLXZpZGVvLWFkL1xyXG4gKiDkuI3mlK/mjIHlvIDlj5HogIXlt6Xlhbcs5Y+q6IO95Zyo55yf5py66LCD6K+VXHJcbiAqIOWIpOaWreWfuuehgOW6k+eJiOacrOWPtyA+PSAxLjMuMCDlkI7lho3kvb/nlKjor6UgQVBJ44CCXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFRUUmV3YXJkQWQge1xyXG5cclxuICAgIF93eFN5c3RlbUluZm86IGFueSAgICAgICAgICAgICAgPSB7fTsgICAgICAgLy/lvq7kv6Hov5Tlm57nmoTkv6Hmga9cclxuICAgIF9hZElEOiBzdHJpbmcgICAgICAgICAgICAgICAgICAgPSAnJzsgICAgICAgLy/lub/lkYppZFxyXG4gICAgX2luc3RhbmNlICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7ICAgICAvL+W5v+WRiuWunuS+i1xyXG4gICAgX2xvYWRlZDpib29sZWFuICAgICAgICAgICAgICAgICA9IGZhbHNlOyAgICAvL+aYr+WQpuWKoOi9veWujOaIkFxyXG4gICAgX2NhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7ICAgICAvL+WlluWKseWbnuiwg1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFkaWQpIHtcclxuICAgICAgICB0aGlzLl93eFN5c3RlbUluZm8gPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgIHRoaXMuX2FkSUQgPSBhZGlkO1xyXG4gICAgICAgIHRoaXMuX2xvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuW5v+WRilxyXG4gICAgX2xvYWQoKSB7XHJcbiAgICAgICAgY2MubG9nKCdSZXdhcmQgbG9hZCAnLHRoaXMuX2FsbG93QWQoKSlcclxuICAgICAgICBpZiAodGhpcy5fYWxsb3dBZCgpKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gdHQuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHsgYWRVbml0SWQ6IHRoaXMuX2FkSUQgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9uTG9hZCh0aGlzLl9vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9uRXJyb3IodGhpcy5fb25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub25DbG9zZSh0aGlzLl9vbkNsb3NlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmxvYWQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bm/5ZGK5bey57uP5Yqg6L29XHJcbiAgICBfb25Mb2FkKCkge1xyXG4gICAgICAgIGNjLmxvZygnUmV3YXJkIG9uTG9hZCcpXHJcbiAgICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+W5v+WRiuWKoOi9veWHuumUmVxyXG4gICAgX29uRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgY2MubG9nKCdSZXdhcmQgb25FcnJvcicsIGVycilcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lhbPpl63lub/lkYpcclxuICAgIF9vbkNsb3NlKHJldCkge1xyXG4gICAgICAgIGNjLmxvZygnUmV3YXJkIG9uQ2xvc2UgJyxyZXQuaXNFbmRlZClcclxuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2socmV0LmlzRW5kZWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5bm/5ZGKXHJcbiAgICBfZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub2ZmTG9hZCh0aGlzLl9vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub2ZmRXJyb3IodGhpcy5fb25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vZmZDbG9zZSh0aGlzLl9vbkNsb3NlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5piv5ZCm5YWB6K645bm/5ZGKXHJcbiAgICBfYWxsb3dBZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlVmVyc2lvbih0aGlzLl93eFN5c3RlbUluZm9bJ1NES1ZlcnNpb24nXSwnMS4zLjAnKSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgX2lzTG9hZCgpe1xyXG4gICAgICAgIGNjLmxvZygnUmV3YXJkIF9pc0xvYWQgJyx0aGlzLl9sb2FkZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WxleekuuW5v+WRiijliqDovb3miJDlip/lkI7nm7TmjqXmmL7npLopXHJcbiAgICBfc2hvdyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2tcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZS5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBfY29tcGFyZVZlcnNpb24odjEsIHYyKSB7XHJcbiAgICAgICAgdjEgPSB2MS5zcGxpdCgnLicpXHJcbiAgICAgICAgdjIgPSB2Mi5zcGxpdCgnLicpXHJcbiAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgodjEubGVuZ3RoLCB2Mi5sZW5ndGgpXHJcbiAgICBcclxuICAgICAgICB3aGlsZSAodjEubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIHYxLnB1c2goJzAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodjIubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIHYyLnB1c2goJzAnKVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbnVtMSA9IHBhcnNlSW50KHYxW2ldKVxyXG4gICAgICAgICAgICBjb25zdCBudW0yID0gcGFyc2VJbnQodjJbaV0pXHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKG51bTEgPiBudW0yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bTEgPCBudW0yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiAwXHJcbiAgICB9XHJcbn1cclxuIl19