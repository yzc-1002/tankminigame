
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/wx/WXInterstitialAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c26b7kpHKpF0bNLjT06c43E', 'WXInterstitialAd');
// script/sdk/sdk/wx/WXInterstitialAd.ts

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
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createInterstitialAd.html
 */
var WXInterstitialAd = /** @class */ (function (_super) {
    __extends(WXInterstitialAd, _super);
    function WXInterstitialAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXInterstitialAd.prototype.open = function (adID) {
        if (this.state == SDKConfig_1.SDKState.open) {
            return;
        }
        if (this.state == SDKConfig_1.SDKState.loading) {
            return;
        }
        console.log('BaseInterstitialAd showAd adUnitID ', this.adUnitID);
        this.state = SDKConfig_1.SDKState.loading;
        this.create(adID);
        this.load();
    };
    WXInterstitialAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    WXInterstitialAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    WXInterstitialAd.prototype.onClose = function () {
        this.setState(SDKConfig_1.SDKState.close);
    };
    WXInterstitialAd.prototype.load = function () {
        if (this.instance) {
            this.instance.load();
        }
    };
    WXInterstitialAd.prototype.show = function () {
        if (this.instance) {
            this.setState(SDKConfig_1.SDKState.open);
            this.instance.show();
        }
    };
    WXInterstitialAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offClose(this.onClose.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.destroy();
            this.instanceMap[this.adUnitID] = null;
            this.instance = null;
        }
    };
    WXInterstitialAd.prototype.create = function (id) {
        this.adUnitID = id;
        // 创建插屏广告实例，提前初始化
        if (!this.instanceMap[id]) {
            this.instance = wx.createInterstitialAd({
                adUnitId: id
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            this.instanceMap[id] = this.instance;
        }
    };
    return WXInterstitialAd;
}(BaseAd_1.default));
exports.default = WXInterstitialAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcd3hcXFdYSW50ZXJzdGl0aWFsQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qzs7R0FFRztBQUNIO0lBQThDLG9DQUFNO0lBQXBEOztJQXFFQSxDQUFDO0lBakVHLCtCQUFJLEdBQUosVUFBSyxJQUFZO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLG9CQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxvQkFBUSxDQUFDLE9BQU8sRUFBRTtZQUNoQyxPQUFPO1NBQ1Y7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNqRSxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFRLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVTLGlDQUFNLEdBQWhCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVTLGtDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFUyxrQ0FBTyxHQUFqQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRVMsK0JBQUksR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDdkI7SUFDTCxDQUFDO0lBRVMsK0JBQUksR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVTLGtDQUFPLEdBQWpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRVMsaUNBQU0sR0FBaEIsVUFBaUIsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDcEMsUUFBUSxFQUFFLEVBQUU7YUFDZixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQXJFQSxBQXFFQyxDQXJFNkMsZ0JBQU0sR0FxRW5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES1N0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG4vKipcclxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vbWluaWdhbWUvZGV2L2FwaS9hZC93eC5jcmVhdGVJbnRlcnN0aXRpYWxBZC5odG1sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXWEludGVyc3RpdGlhbEFkIGV4dGVuZHMgQmFzZUFkIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5zdGFuY2U6IHd4LkludGVyc3RpdGlhbEFkO1xyXG5cclxuICAgIG9wZW4oYWRJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU0RLU3RhdGUub3Blbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNES1N0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygnQmFzZUludGVyc3RpdGlhbEFkIHNob3dBZCBhZFVuaXRJRCAnLCB0aGlzLmFkVW5pdElEKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5sb2FkaW5nO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKGFkSUQpXHJcbiAgICAgICAgdGhpcy5sb2FkKClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcg5o+S5bGP5bm/5ZGK5Yqg6L295oiQ5YqfJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRTdWNlc3MpXHJcbiAgICAgICAgdGhpcy5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIOaPkuWxj+W5v+WRiuWKoOi9veWksei0pSAnLCBlcnIpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmNsb3NlKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UubG9hZCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUub3BlbilcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZMb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmQ2xvc2UodGhpcy5vbkNsb3NlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VNYXBbdGhpcy5hZFVuaXRJRF0gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZShpZCkge1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgICAgICAvLyDliJvlu7rmj5LlsY/lub/lkYrlrp7kvovvvIzmj5DliY3liJ3lp4vljJZcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VNYXBbaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSB3eC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogaWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uQ2xvc2UodGhpcy5vbkNsb3NlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VNYXBbaWRdID0gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19