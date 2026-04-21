
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/wechat/WechatBannerAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcd2VjaGF0XFxXZWNoYXRCYW5uZXJBZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRzs7O0FBRUg7SUFTSSx3QkFBWSxJQUFJLEVBQUMsU0FBUztRQVAxQixrQkFBYSxHQUFhLEVBQUUsQ0FBQyxDQUFPLFNBQVM7UUFDN0MsVUFBSyxHQUFxQixFQUFFLENBQUMsQ0FBTyxNQUFNO1FBQzFDLGVBQVUsR0FBZ0IsR0FBRyxDQUFDLENBQU0sTUFBTTtRQUMxQyxjQUFTLEdBQWlCLElBQUksQ0FBQyxDQUFLLE1BQU07UUFFMUMsaUJBQVksR0FBYyxLQUFLLENBQUM7UUFJNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU3RSxFQUFFLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkksQ0FBQztJQUVELE1BQU07SUFDTixrQ0FBUyxHQUFUO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDcEIsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxDQUFDO29CQUNQLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVTtvQkFDdEQsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUNyRDs7WUFDRyxDQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQ3hCLENBQUE7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLGdDQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQjthQUNHO1lBQ0EsRUFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLGlDQUFRLEdBQVIsVUFBUyxHQUFHO1FBQ1IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVELGVBQWU7SUFDZixrQ0FBUyxHQUFULFVBQVUsTUFBTTtRQUNaLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFHcEQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUU7WUFFdkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO1lBQ3ZDLEVBQUUsQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ2xEO2FBQ0c7WUFDQSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDNUI7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFBO2dCQUNoRixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO2dCQUM3RSxFQUFFLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3pGLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsTUFBTTtJQUNOLGlDQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFRCxRQUFRO0lBQ1IsaUNBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsUUFBUTtJQUNSLGdDQUFPLEdBQVA7UUFBQSxpQkFPQztRQU5HLFlBQVk7UUFDWixJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDaEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBQ2hCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDYixDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLDhCQUFLLEdBQUw7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQztZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDbkI7SUFDTCxDQUFDO0lBRUQsVUFBVTtJQUNWLDhCQUFLLEdBQUw7UUFDSSxrQkFBa0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDeEI7SUFDTCxDQUFDO0lBRUQsd0NBQWUsR0FBZixVQUFnQixFQUFFLEVBQUUsRUFBRTtRQUNsQixFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRTFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDcEIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNmO1FBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNwQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxDQUFBO2FBQ1g7aUJBQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO2dCQUNwQixPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ1o7U0FDSjtRQUVELE9BQU8sQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F2SkEsQUF1SkMsSUFBQTtBQXZKWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBodHRwczovL2RldmVsb3BlcnMud2VpeGluLnFxLmNvbS9taW5pZ2FtZS9kZXYvYXBpL2FkL3d4LmNyZWF0ZUJhbm5lckFkLmh0bWxcclxuICog5Yib5bu6IGJhbm5lciDlub/lkYrnu4Tku7bjgILor7fpgJrov4cgd3guZ2V0U3lzdGVtSW5mb1N5bmMoKSDov5Tlm57lr7nosaHnmoQgU0RLVmVyc2lvbiBcclxuICog5Yik5pat5Z+656GA5bqT54mI5pys5Y+3ID49IDIuMC40IOWQjuWGjeS9v+eUqOivpSBBUEnjgIJcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgV2VjaGF0QmFubmVyQWQge1xyXG5cclxuICAgIF93eFN5c3RlbUluZm86IGFueSAgICAgID0ge307ICAgICAgIC8v5b6u5L+h6L+U5Zue55qE5L+h5oGvXHJcbiAgICBfYWRJRDogc3RyaW5nICAgICAgICAgICA9ICcnOyAgICAgICAvL+W5v+WRimlkXHJcbiAgICBfbWF4SGVpZ2h0OiBudW1iZXIgICAgICA9IDEwMDsgICAgICAvL+acgOWkp+mrmOW6plxyXG4gICAgX2luc3RhbmNlOiB3eC5CYW5uZXJBZCAgPSBudWxsOyAgICAgLy/lub/lkYrlrp7kvotcclxuXHJcbiAgICBfaGVpZ2h0RXJyb3IgICAgICAgICAgICA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFkaWQsbWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd3hTeXN0ZW1JbmZvID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICB0aGlzLl9hZElEID0gYWRpZDtcclxuXHJcbiAgICAgICAgdGhpcy5fbWF4SGVpZ2h0ID0gTWF0aC5mbG9vcihtYXhIZWlnaHQqKHRoaXMuX3d4U3lzdGVtSW5mby53aW5kb3dXaWR0aC82NDApKTtcclxuXHJcbiAgICAgICAgY2MubG9nKCdXZWNoYXRCYW5uZXJBZCBjb25zdHJ1Y3RvciAnLHRoaXMuX3d4U3lzdGVtSW5mby53aW5kb3dXaWR0aCx0aGlzLl93eFN5c3RlbUluZm8ud2luZG93SGVpZ2h0LG1heEhlaWdodCx0aGlzLl9tYXhIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu65bm/5ZGKXHJcbiAgICBfY3JlYXRlQUQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB3eC5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fYWRJRCxcclxuICAgICAgICAgICAgICAgIGFkSW50ZXJ2YWxzOiAzMCxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuX3d4U3lzdGVtSW5mby53aW5kb3dIZWlnaHQgLSB0aGlzLl9tYXhIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub25Mb2FkKHRoaXMuX29uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbkVycm9yKHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub25SZXNpemUodGhpcy5fb25SZXNpemUuYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZShcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uuc2hvdygpXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bm/5ZGK5bey57uP5Yqg6L29XHJcbiAgICBfb25Mb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9oZWlnaHRFcnJvcikge1xyXG4gICAgICAgICAgICBjYy5sb2coJ2Jhbm5lciBvbkxvYWQgZXJyb3InKVxyXG4gICAgICAgICAgICB0aGlzLl9oZWlnaHRFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9yZUxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY2MubG9nKCdiYW5uZXIgb25Mb2FkIHNob3cnKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bm/5ZGK5Yqg6L295Ye66ZSZXHJcbiAgICBfb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjYy5sb2coJ2Jhbm5lciBvbkVycm9yJywgZXJyKVxyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9yZUxvYWQoKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL2Jhbm5lciDlub/lkYrlsLrlr7jlj5jljJZcclxuICAgIF9vblJlc2l6ZShyZXNpemUpIHtcclxuICAgICAgICBjYy5sb2coJ2Jhbm5lciBvblJlc2l6ZScscmVzaXplLndpZHRoLHJlc2l6ZS5oZWlnaHQpXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChyZXNpemUuaGVpZ2h0ID4gdGhpcy5fbWF4SGVpZ2h0ICYmIHJlc2l6ZS53aWR0aCA+IDMwMCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJhdGUgPSB0aGlzLl9tYXhIZWlnaHQvcmVzaXplLmhlaWdodFxyXG4gICAgICAgICAgICBsZXQgcmV3aWR0aCA9IE1hdGgubWF4KHJlc2l6ZS53aWR0aCAqIHJhdGUsMzAwKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZVsnc3R5bGUnXS53aWR0aCA9IHJld2lkdGhcclxuICAgICAgICAgICAgY2MubG9nKCdiYW5uZXIgX29uUmVzaXplIHNjYWxlICcsIHJhdGUscmV3aWR0aClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKHJlc2l6ZS5oZWlnaHQgPiB0aGlzLl9tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VbJ3N0eWxlJ10ubGVmdCA9ICh0aGlzLl93eFN5c3RlbUluZm8ud2luZG93V2lkdGggLSByZXNpemUud2lkdGgpLzJcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlWydzdHlsZSddLnRvcCA9IHRoaXMuX3d4U3lzdGVtSW5mby53aW5kb3dIZWlnaHQgLSByZXNpemUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ2Jhbm5lciBfb25SZXNpemUgc2V0ICcsIHRoaXMuX2luc3RhbmNlWydzdHlsZSddLmxlZnQsdGhpcy5faW5zdGFuY2VbJ3N0eWxlJ10udG9wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0RXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeW5v+WRilxyXG4gICAgX2Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkxvYWQodGhpcy5fb25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLm9mZkVycm9yKHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uub2ZmUmVzaXplKHRoaXMuX29uUmVzaXplLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5piv5ZCm5YWB6K645bm/5ZGKXHJcbiAgICBfYWxsb3dBZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlVmVyc2lvbih0aGlzLl93eFN5c3RlbUluZm9bJ1NES1ZlcnNpb24nXSwnMi4wLjQnKSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6YeN5paw5Yqg6L295bm/5ZGKXHJcbiAgICBfcmVMb2FkKCkge1xyXG4gICAgICAgIC8v5bu26L+fNXPlho3mrKHliqDovb3lub/lkYpcclxuICAgICAgICBsZXQgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVBRCgpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZClcclxuICAgICAgICB9LCAxMDAwMClcclxuICAgIH1cclxuXHJcbiAgICAvL+WxleekuuW5v+WRiijliqDovb3miJDlip/lkI7nm7TmjqXmmL7npLopXHJcbiAgICBfc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWxsb3dBZCgpKXtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlQUQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+makOiXjyjnm7TmjqXplIDmr4EpXHJcbiAgICBfaGlkZSgpIHtcclxuICAgICAgICAvLyB0aGlzLl9kZXN0cm95KClcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaGlkZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcclxuICAgICAgICB2MSA9IHYxLnNwbGl0KCcuJylcclxuICAgICAgICB2MiA9IHYyLnNwbGl0KCcuJylcclxuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcclxuICAgIFxyXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSlcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAobnVtMSA+IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtMSA8IG51bTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxufVxyXG4iXX0=