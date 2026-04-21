
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/bytedance/TTBannerAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYnl0ZWRhbmNlXFxUVEJhbm5lckFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0dBR0c7OztBQUdIO0lBU0ksb0JBQVksSUFBSSxFQUFDLFNBQVM7UUFQMUIsa0JBQWEsR0FBYSxFQUFFLENBQUMsQ0FBTyxTQUFTO1FBQzdDLFVBQUssR0FBcUIsRUFBRSxDQUFDLENBQU8sTUFBTTtRQUMxQyxlQUFVLEdBQWdCLEdBQUcsQ0FBQyxDQUFNLE1BQU07UUFDMUMsY0FBUyxHQUFpQixJQUFJLENBQUMsQ0FBSyxNQUFNO1FBRTFDLGlCQUFZLEdBQWMsS0FBSyxDQUFDO1FBSTVCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFN0UsRUFBRSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25JLENBQUM7SUFFRCxNQUFNO0lBQ04sOEJBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDeEIsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNwQixXQUFXLEVBQUUsRUFBRTtnQkFDZixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxF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QUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNmO1FBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNwQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxDQUFBO2FBQ1g7aUJBQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO2dCQUNwQixPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ1o7U0FDSjtRQUVELE9BQU8sQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FoSkEsQUFnSkMsSUFBQTtBQWhKWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBodHRwczovL21pY3JvYXBwLmJ5dGVkYW5jZS5jb20vZGV2L2NuL21pbmktZ2FtZS9kZXZlbG9wL29wZW4tY2FwYWNpdHkvYWRzL3R0LmNyZWF0ZWJhbm5lcmFkXHJcbiAqIOWIm+W7uiBiYW5uZXIg5bm/5ZGK57uE5Lu244CC6K+36YCa6L+HIHR0LmdldFN5c3RlbUluZm9TeW5jKCkg6L+U5Zue5a+56LGh55qEIFNES1ZlcnNpb24gXHJcbiAqL1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUVEJhbm5lckFkIHtcclxuXHJcbiAgICBfd3hTeXN0ZW1JbmZvOiBhbnkgICAgICA9IHt9OyAgICAgICAvL+W+ruS/oei/lOWbnueahOS/oeaBr1xyXG4gICAgX2FkSUQ6IHN0cmluZyAgICAgICAgICAgPSAnJzsgICAgICAgLy/lub/lkYppZFxyXG4gICAgX21heEhlaWdodDogbnVtYmVyICAgICAgPSAxMDA7ICAgICAgLy/mnIDlpKfpq5jluqZcclxuICAgIF9pbnN0YW5jZTogd3guQmFubmVyQWQgID0gbnVsbDsgICAgIC8v5bm/5ZGK5a6e5L6LXHJcblxyXG4gICAgX2hlaWdodEVycm9yICAgICAgICAgICAgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhZGlkLG1heEhlaWdodCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3d4U3lzdGVtSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdGhpcy5fYWRJRCA9IGFkaWQ7XHJcblxyXG4gICAgICAgIHRoaXMuX21heEhlaWdodCA9IE1hdGguZmxvb3IobWF4SGVpZ2h0Kih0aGlzLl93eFN5c3RlbUluZm8ud2luZG93V2lkdGgvNjQwKSk7XHJcblxyXG4gICAgICAgIGNjLmxvZygnV2VjaGF0QmFubmVyQWQgY29uc3RydWN0b3IgJyx0aGlzLl93eFN5c3RlbUluZm8ud2luZG93V2lkdGgsdGhpcy5fd3hTeXN0ZW1JbmZvLndpbmRvd0hlaWdodCxtYXhIZWlnaHQsdGhpcy5fbWF4SGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuW5v+WRilxyXG4gICAgX2NyZWF0ZUFEKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBiYW5uZXJXaWR0aCA9IDIwMDtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0dC5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fYWRJRCxcclxuICAgICAgICAgICAgICAgIGFkSW50ZXJ2YWxzOiAzMCxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogKHRoaXMuX3d4U3lzdGVtSW5mby53aW5kb3dXaWR0aCAtIGJhbm5lcldpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLl93eFN5c3RlbUluZm8ud2luZG93SGVpZ2h0IC0gKGJhbm5lcldpZHRoIC8gMTYgKiA5KSwgLy8g5qC55o2u57O757uf57qm5a6a5bC65a+46K6h566X5Ye65bm/5ZGK6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGJhbm5lcldpZHRoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9uTG9hZCh0aGlzLl9vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub25FcnJvcih0aGlzLl9vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9uUmVzaXplKHRoaXMuX29uUmVzaXplLmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UoXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnNob3coKVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvL+W5v+WRiuW3sue7j+WKoOi9vVxyXG4gICAgX29uTG9hZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faGVpZ2h0RXJyb3IpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdiYW5uZXIgb25Mb2FkIGVycm9yJylcclxuICAgICAgICAgICAgdGhpcy5faGVpZ2h0RXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fcmVMb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNjLmxvZygnYmFubmVyIG9uTG9hZCBzaG93JylcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W5v+WRiuWKoOi9veWHuumUmVxyXG4gICAgX29uRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgY2MubG9nKCdiYW5uZXIgb25FcnJvcicsIGVycilcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcmVMb2FkKClcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9iYW5uZXIg5bm/5ZGK5bC65a+45Y+Y5YyWXHJcbiAgICBfb25SZXNpemUocmVzaXplKSB7XHJcbiAgICAgICAgY2MubG9nKCdiYW5uZXIgb25SZXNpemUnLCByZXNpemUud2lkdGgscmVzaXplLmhlaWdodClcclxuXHJcbiAgICAgICAgaWYgKHJlc2l6ZS53aWR0aCAhPSAwICYmIHJlc2l6ZS5oZWlnaHQgIT0gMCkge1xyXG4gICAgICAgICAgICAvLyBpZiAocmVzaXplLmhlaWdodCA+IHRoaXMuX21heEhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5faGVpZ2h0RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZVsnc3R5bGUnXS50b3AgPSB0aGlzLl93eFN5c3RlbUluZm8ud2luZG93SGVpZ2h0IC0gcmVzaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlWydzdHlsZSddLmxlZnQgPSAodGhpcy5fd3hTeXN0ZW1JbmZvLndpbmRvd1dpZHRoIC0gcmVzaXplLndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeW5v+WRilxyXG4gICAgX2Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkxvYWQodGhpcy5fb25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkVycm9yKHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub2ZmUmVzaXplKHRoaXMuX29uUmVzaXplLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5piv5ZCm5YWB6K645bm/5ZGKXHJcbiAgICBfYWxsb3dBZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlVmVyc2lvbih0aGlzLl93eFN5c3RlbUluZm9bJ1NES1ZlcnNpb24nXSwnMS4zLjAnKSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6YeN5paw5Yqg6L295bm/5ZGKXHJcbiAgICBfcmVMb2FkKCkge1xyXG4gICAgICAgIC8v5bu26L+fNXPlho3mrKHliqDovb3lub/lkYpcclxuICAgICAgICBsZXQgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVBRCgpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZClcclxuICAgICAgICB9LCAxMDAwMClcclxuICAgIH1cclxuXHJcbiAgICAvL+WxleekuuW5v+WRiijliqDovb3miJDlip/lkI7nm7TmjqXmmL7npLopXHJcbiAgICBfc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWxsb3dBZCgpKXtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlQUQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+makOiXjyjnm7TmjqXplIDmr4EpXHJcbiAgICBfaGlkZSgpIHtcclxuICAgICAgICAvLyB0aGlzLl9kZXN0cm95KClcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaGlkZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcclxuICAgICAgICB2MSA9IHYxLnNwbGl0KCcuJylcclxuICAgICAgICB2MiA9IHYyLnNwbGl0KCcuJylcclxuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcclxuICAgIFxyXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSlcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAobnVtMSA+IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtMSA8IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxufVxyXG4iXX0=