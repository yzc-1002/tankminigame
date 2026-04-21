
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoBannerAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8df7dERVnZPybGdUJkGZeHh', 'OppoBannerAd');
// script/sdk/sdk/oppo/OppoBannerAd.ts

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
//https://open.oppomobile.com/wiki/doc#id=10536
var OppoBannerAd = /** @class */ (function (_super) {
    __extends(OppoBannerAd, _super);
    function OppoBannerAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OppoBannerAd.prototype.open = function (adID) {
        //逻辑要求开
        this.destroy();
        this.create(adID);
        this.show();
    };
    OppoBannerAd.prototype.onError = function (err) {
        this.channel.showToast('banner onError' + err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    OppoBannerAd.prototype.onLoad = function () {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.channel.showToast('banner onLoad');
    };
    OppoBannerAd.prototype.close = function () {
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    OppoBannerAd.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    OppoBannerAd.prototype.create = function (id) {
        this.adUnitID = id;
        var winSize = qg.getSystemInfoSync();
        this.instance = qg.createBannerAd({
            adUnitId: this.adUnitID,
            style: {}
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onResize(this.onResize.bind(this));
    };
    OppoBannerAd.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
        console.log(' banner show ');
    };
    OppoBannerAd.prototype.hide = function () {
        console.log(' banner hide ');
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    OppoBannerAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
            this.instance = null;
        }
    };
    return OppoBannerAd;
}(BaseAd_1.default));
exports.default = OppoBannerAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb0Jhbm5lckFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUNwQywwQ0FBd0M7QUFFeEMsK0NBQStDO0FBQy9DO0lBQTBDLGdDQUFNO0lBQWhEOztJQW9FQSxDQUFDO0lBakVHLDJCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsT0FBTztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBRWYsQ0FBQztJQUNELDhCQUFPLEdBQVAsVUFBUSxHQUFHO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFDRCw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFHRCw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRVMsNkJBQU0sR0FBaEIsVUFBaUIsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBSVMsMkJBQUksR0FBZDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxJQUFJLENBQUE7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRVMsMkJBQUksR0FBZDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRVMsOEJBQU8sR0FBakI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FwRUEsQUFvRUMsQ0FwRXlDLGdCQUFNLEdBb0UvQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQmFzZUFkIGZyb20gXCIuLi9iYXNlL0Jhc2VBZFwiO1xyXG5pbXBvcnQgeyBTREtTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuXHJcbi8vaHR0cHM6Ly9vcGVuLm9wcG9tb2JpbGUuY29tL3dpa2kvZG9jI2lkPTEwNTM2XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wcG9CYW5uZXJBZCBleHRlbmRzIEJhc2VBZCB7XHJcblxyXG5cclxuICAgIG9wZW4oYWRJRCkge1xyXG4gICAgICAgIC8v6YC76L6R6KaB5rGC5byAXHJcbiAgICAgICAgdGhpcy5kZXN0cm95KClcclxuICAgICAgICB0aGlzLmNyZWF0ZShhZElEKVxyXG4gICAgICAgIHRoaXMuc2hvdygpXHJcblxyXG4gICAgfVxyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICB0aGlzLmNoYW5uZWwuc2hvd1RvYXN0KCdiYW5uZXIgb25FcnJvcicgKyBlcnIpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRTdWNlc3MpXHJcbiAgICAgICAgdGhpcy5jaGFubmVsLnNob3dUb2FzdCgnYmFubmVyIG9uTG9hZCcpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWRlKClcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jhbm5lciBvblJlc2l6ZScsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZShpZCkge1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgICAgICBsZXQgd2luU2l6ZSA9IHFnLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHFnLmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuYWRVbml0SUQsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7fVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLmluc3RhbmNlLm9uRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5vblJlc2l6ZSh0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU0RLU3RhdGUub3BlblxyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLnNob3coKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGJhbm5lciBzaG93ICcpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBiYW5uZXIgaGlkZSAnKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5jbG9zZTtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZMb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmUmVzaXplKHRoaXMub25SZXNpemUuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KClcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19