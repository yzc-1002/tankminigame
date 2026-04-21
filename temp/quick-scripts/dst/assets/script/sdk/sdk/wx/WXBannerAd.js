
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/wx/WXBannerAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed6a9ih0F9DNr3E+yW0RPQi', 'WXBannerAd');
// script/sdk/sdk/wx/WXBannerAd.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAd_1 = require("../base/BaseAd");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createBannerAd.html
 * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion
 * 判断基础库版本号 >= 2.0.4 后再使用该 API。每次调用该方法创建 banner 广告都会返回一个全新的实例。
 */
var WXBannerAd = /** @class */ (function (_super) {
    __extends(WXBannerAd, _super);
    function WXBannerAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXBannerAd.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    WXBannerAd.prototype.reLoad = function () {
        var _this = this;
        var id = setTimeout(function () {
            _this.create(_this.adUnitID);
            clearTimeout(id);
        }, 8000);
    };
    WXBannerAd.prototype.open = function (adID) {
        this.logicState = SDKConfig_1.SDKState.open;
        //正在展示
        if (this.state == SDKConfig_1.SDKState.open) {
            return;
        }
        //逻辑要求展示
        //如果banner已经已经显示 则返回。
        if (this.state == SDKConfig_1.SDKState.loading) {
            this.clickCount++;
            if (this.clickCount < 3) { //防止平台无法触发onLoad onError 时使用。
                return;
            }
        }
        this.clickCount = 0;
        this.state = SDKConfig_1.SDKState.loading;
        if (this.adUnitID != adID) {
            this.destroy();
            this.create(adID);
        }
        else {
            this.showCount++;
            if (this.showCount > 3) { //展示超过3次 从新加载
                this.showCount = 0;
                this.destroy();
                this.create(adID);
            }
            else {
                this.show();
            }
        }
    };
    WXBannerAd.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        //已经关闭
        if (this.state == SDKConfig_1.SDKState.close) {
            return;
        }
        //逻辑要求关闭
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    WXBannerAd.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
    };
    WXBannerAd.prototype.hide = function () {
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    WXBannerAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
            this.instanceMap[this.adUnitID] = null;
        }
    };
    WXBannerAd.prototype.create = function (adID, param) {
        this.adUnitID = adID;
        var winSize = wx.getSystemInfoSync();
        // console.log(winSize);
        var bannerHeight = 130;
        var bannerWidth = 350;
        if (!this.instanceMap[adID]) {
            this.instance = wx.createBannerAd({
                adUnitId: adID,
                adIntervals: 30,
                style: {
                    left: (winSize.windowWidth - bannerWidth) / 2,
                    top: winSize.windowHeight - bannerHeight,
                    width: bannerWidth
                }
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onResize(this.onResize.bind(this));
            this.instanceMap[adID] = this.instance;
        }
    };
    WXBannerAd.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        this.reLoad();
    };
    WXBannerAd.prototype.onLoad = function () {
        console.log('banner onLoad');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    return WXBannerAd;
}(BaseAd_1.default));
exports.default = WXBannerAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcd3hcXFdYQmFubmVyQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qzs7OztHQUlHO0FBQ0g7SUFBd0MsOEJBQU07SUFBOUM7O0lBZ0lBLENBQUM7SUE1SGEsNkJBQVEsR0FBbEIsVUFBbUIsSUFBSTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFUywyQkFBTSxHQUFoQjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzFCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBRUQseUJBQUksR0FBSixVQUFLLElBQVk7UUFFYixJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hDLE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksb0JBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDN0IsT0FBTztTQUNWO1FBQ0QsUUFBUTtRQUVSLHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksb0JBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsRUFBQyw2QkFBNkI7Z0JBQ25ELE9BQU87YUFDVjtTQUNKO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBUSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLElBQUks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QTtZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUMxQztJQUdMLENBQUM7SUFHUyw0QkFBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBRVMsMkJBQU0sR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksb0JBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQ2Q7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUNkO0lBQ0wsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FoSUEsQUFnSUMsQ0FoSXVDLGdCQUFNLEdBZ0k3QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES1N0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG4vKipcclxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vbWluaWdhbWUvZGV2L2FwaS9hZC93eC5jcmVhdGVCYW5uZXJBZC5odG1sXHJcbiAqIOWIm+W7uiBiYW5uZXIg5bm/5ZGK57uE5Lu244CC6K+36YCa6L+HIHd4LmdldFN5c3RlbUluZm9TeW5jKCkg6L+U5Zue5a+56LGh55qEIFNES1ZlcnNpb24gXHJcbiAqIOWIpOaWreWfuuehgOW6k+eJiOacrOWPtyA+PSAyLjAuNCDlkI7lho3kvb/nlKjor6UgQVBJ44CC5q+P5qyh6LCD55So6K+l5pa55rOV5Yib5bu6IGJhbm5lciDlub/lkYrpg73kvJrov5Tlm57kuIDkuKrlhajmlrDnmoTlrp7kvovjgIJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdYQmFubmVyQWQgZXh0ZW5kcyBCYXNlQWQge1xyXG5cclxuICAgIHByb3RlY3RlZCBpbnN0YW5jZTogd3guQmFubmVyQWQ7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYmFubmVyIG9uUmVzaXplJywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVMb2FkKCkge1xyXG4gICAgICAgIGxldCBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZSh0aGlzLmFkVW5pdElEKVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICAgICAgfSwgODAwMClcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKGFkSUQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2ljU3RhdGUgPSBTREtTdGF0ZS5vcGVuO1xyXG4gICAgICAgIC8v5q2j5Zyo5bGV56S6XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU0RLU3RhdGUub3Blbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YC76L6R6KaB5rGC5bGV56S6XHJcblxyXG4gICAgICAgIC8v5aaC5p6cYmFubmVy5bey57uP5bey57uP5pi+56S6IOWImei/lOWbnuOAglxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNES1N0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0NvdW50Kys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrQ291bnQgPCAzKSB7Ly/pmLLmraLlubPlj7Dml6Dms5Xop6blj5FvbkxvYWQgb25FcnJvciDml7bkvb/nlKjjgIJcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsaWNrQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5sb2FkaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLmFkVW5pdElEICE9IGFkSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKGFkSUQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0NvdW50ID4gMykgey8v5bGV56S66LaF6L+HM+asoSDku47mlrDliqDovb1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGUoYWRJRClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpY1N0YXRlID0gU0RLU3RhdGUuY2xvc2U7XHJcbiAgICAgICAgLy/lt7Lnu4/lhbPpl61cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTREtTdGF0ZS5jbG9zZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YC76L6R6KaB5rGC5YWz6ZetXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWRlKClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU0RLU3RhdGUub3BlblxyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU0RLU3RhdGUuY2xvc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9mZkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZFcnJvcih0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZSZXNpemUodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlTWFwW3RoaXMuYWRVbml0SURdID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlKGFkSUQsIHBhcmFtPyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBhZElEO1xyXG5cclxuICAgICAgICBsZXQgd2luU2l6ZSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHdpblNpemUpO1xyXG4gICAgICAgIGxldCBiYW5uZXJIZWlnaHQgPSAxMzA7XHJcbiAgICAgICAgbGV0IGJhbm5lcldpZHRoID0gMzUwO1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZU1hcFthZElEXSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gd3guY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IGFkSUQsXHJcbiAgICAgICAgICAgICAgICBhZEludGVydmFsczogMzAsXHJcbiAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aW5TaXplLndpbmRvd1dpZHRoIC0gYmFubmVyV2lkdGgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHdpblNpemUud2luZG93SGVpZ2h0IC0gYmFubmVySGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBiYW5uZXJXaWR0aFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uTG9hZCh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25SZXNpemUodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlTWFwW2FkSURdID0gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jhbm5lciBvbkVycm9yJywgZXJyKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZEZhaWwpXHJcbiAgICAgICAgdGhpcy5yZUxvYWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jhbm5lciBvbkxvYWQnKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZFN1Y2VzcylcclxuICAgICAgICBpZiAodGhpcy5sb2dpY1N0YXRlID09IFNES1N0YXRlLm9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19