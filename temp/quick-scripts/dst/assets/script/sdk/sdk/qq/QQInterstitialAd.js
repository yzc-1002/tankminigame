
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/qq/QQInterstitialAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b36f9ugg7NBdYQeAvSvVijv', 'QQInterstitialAd');
// script/sdk/sdk/qq/QQInterstitialAd.ts

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
var QQInterstitialAd = /** @class */ (function (_super) {
    __extends(QQInterstitialAd, _super);
    function QQInterstitialAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private interstitialAd = null;
    QQInterstitialAd.prototype.open = function (id) {
        console.log('BaseInterstitialAd showAd this.state ', this.state);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.create(id);
        this.load();
    };
    QQInterstitialAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    QQInterstitialAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    QQInterstitialAd.prototype.onClose = function () {
        console.log(' 插屏广告关闭');
    };
    QQInterstitialAd.prototype.load = function () {
        if (this.instance) {
            this.instance.load();
        }
    };
    QQInterstitialAd.prototype.show = function () {
        if (this.instance) {
            this.instance.show();
        }
    };
    QQInterstitialAd.prototype.create = function (id) {
        // 创建插屏广告实例，提前初始化
        this.adUnitID = id;
        if (!this.instance) {
            this.instance = qq.createInterstitialAd({
                adUnitId: id
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
        }
    };
    return QQInterstitialAd;
}(BaseAd_1.default));
exports.default = QQInterstitialAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xccXFcXFFRSW50ZXJzdGl0aWFsQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLDBDQUF3QztBQUV4QztJQUE4QyxvQ0FBTTtJQUFwRDs7SUFxREEsQ0FBQztJQXBERyxpQ0FBaUM7SUFFakMsK0JBQUksR0FBSixVQUFLLEVBQUU7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoRSx1Q0FBdUM7UUFDdkMsY0FBYztRQUNkLElBQUk7UUFFSixJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFRLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDZixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRVMsaUNBQU0sR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRVMsa0NBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUNTLGtDQUFPLEdBQWpCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRVMsK0JBQUksR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDdkI7SUFDTCxDQUFDO0lBRVMsK0JBQUksR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDdkI7SUFDTCxDQUFDO0lBRVMsaUNBQU0sR0FBaEIsVUFBaUIsRUFBRTtRQUNmLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDcEMsUUFBUSxFQUFFLEVBQUU7YUFDZixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUNqRDtJQUNMLENBQUM7SUFFTCx1QkFBQztBQUFELENBckRBLEFBcURDLENBckQ2QyxnQkFBTSxHQXFEbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJhc2VBZCBmcm9tIFwiLi4vYmFzZS9CYXNlQWRcIjtcclxuaW1wb3J0IHsgU0RLU3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRUUludGVyc3RpdGlhbEFkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIC8vIHByaXZhdGUgaW50ZXJzdGl0aWFsQWQgPSBudWxsO1xyXG5cclxuICAgIG9wZW4oaWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQmFzZUludGVyc3RpdGlhbEFkIHNob3dBZCB0aGlzLnN0YXRlICcsIHRoaXMuc3RhdGUpXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUgPT0gQWRTdGF0ZS5sb2FkaW5nKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5sb2FkaW5nO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKGlkKVxyXG4gICAgICAgIHRoaXMubG9hZCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIOaPkuWxj+W5v+WRiuWKoOi9veaIkOWKnycpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkU3VjZXNzKVxyXG4gICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyDmj5LlsY/lub/lkYrliqDovb3lpLHotKUgJywgZXJyKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZEZhaWwpXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIOaPkuWxj+W5v+WRiuWFs+mXrScpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5sb2FkKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZShpZCkge1xyXG4gICAgICAgIC8vIOWIm+W7uuaPkuWxj+W5v+WRiuWunuS+i++8jOaPkOWJjeWIneWni+WMllxyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHFxLmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiBpZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uTG9hZCh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25DbG9zZSh0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==