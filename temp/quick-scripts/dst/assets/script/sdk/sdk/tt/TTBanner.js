
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/tt/TTBanner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e8f44Sd/iVPoJbM0GnJtUWf', 'TTBanner');
// script/sdk/sdk/tt/TTBanner.ts

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
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/open-capacity/ads/tt.createbannerad
 */
var TTBanner = /** @class */ (function (_super) {
    __extends(TTBanner, _super);
    function TTBanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // protected instance: any;
    TTBanner.prototype.open = function (adID) {
        //逻辑要求开
        this.logicState = SDKConfig_1.SDKState.open;
        //如果banner已经已经显示 则返回。
        // if (this.state == AdState.loading) {
        //     return;
        // }
        // this.state = AdState.loading;
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
    TTBanner.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        // if (this.state == AdState.close) {
        //     return;
        // }
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    TTBanner.prototype.onResize = function (size) {
        var winSize = tt.getSystemInfoSync();
        console.log(size.width, size.height);
        if (size.width != 0 && size.height != 0) {
            this.instance.style.top = winSize.windowHeight - size.height;
            this.instance.style.left = (winSize.windowWidth - size.width) / 2;
        }
    };
    TTBanner.prototype.create = function (adId) {
        this.adUnitID = adId;
        var winSize = tt.getSystemInfoSync();
        // console.log(winSize);
        // let bannerHeight = 200;
        var bannerWidth = 200;
        this.instance = tt.createBannerAd({
            adUnitId: this.adUnitID,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: winSize.windowHeight - (bannerWidth / 16 * 9),
                width: bannerWidth
            }
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onResize(this.onResize.bind(this));
    };
    TTBanner.prototype.show = function () {
        if (this.instance) {
            this.state = SDKConfig_1.SDKState.open;
            this.instance.show();
        }
    };
    TTBanner.prototype.hide = function () {
        if (this.instance) {
            this.state = SDKConfig_1.SDKState.close;
            this.instance.hide();
        }
    };
    TTBanner.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    TTBanner.prototype.onLoad = function () {
        console.log('banner onLoad');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    TTBanner.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
        }
    };
    return TTBanner;
}(BaseAd_1.default));
exports.default = TTBanner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdHRcXFRUQmFubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHlDQUFvQztBQUNwQywwQ0FBd0M7QUFDeEM7O0dBRUc7QUFDSDtJQUFzQyw0QkFBTTtJQUE1Qzs7SUFpSEEsQ0FBQztJQS9HRywyQkFBMkI7SUFDM0IsdUJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxxQkFBcUI7UUFDckIsdUNBQXVDO1FBQ3ZDLGNBQWM7UUFDZCxJQUFJO1FBQ0osZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNwQjthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBQyxhQUFhO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDcEI7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO2FBQ2Q7U0FDSjtJQUNMLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBUSxDQUFDLEtBQUssQ0FBQztRQUVqQyxxQ0FBcUM7UUFDckMsY0FBYztRQUNkLElBQUk7UUFFSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENB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SSxFQUFFLENBQUE7U0FDZDtJQUNMLENBQUM7SUFFUywwQkFBTyxHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDMUI7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBakhBLEFBaUhDLENBakhxQyxnQkFBTSxHQWlIM0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES1N0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG4vKipcclxuICogaHR0cHM6Ly9taWNyb2FwcC5ieXRlZGFuY2UuY29tL2Rldi9jbi9taW5pLWdhbWUvZGV2ZWxvcC9vcGVuLWNhcGFjaXR5L2Fkcy90dC5jcmVhdGViYW5uZXJhZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVFRCYW5uZXIgZXh0ZW5kcyBCYXNlQWQge1xyXG5cclxuICAgIC8vIHByb3RlY3RlZCBpbnN0YW5jZTogYW55O1xyXG4gICAgb3BlbihhZElEKSB7XHJcbiAgICAgICAgLy/pgLvovpHopoHmsYLlvIBcclxuICAgICAgICB0aGlzLmxvZ2ljU3RhdGUgPSBTREtTdGF0ZS5vcGVuO1xyXG5cclxuICAgICAgICAvL+WmguaenGJhbm5lcuW3sue7j+W3sue7j+aYvuekuiDliJnov5Tlm57jgIJcclxuICAgICAgICAvLyBpZiAodGhpcy5zdGF0ZSA9PSBBZFN0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLnN0YXRlID0gQWRTdGF0ZS5sb2FkaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLmFkVW5pdElEICE9IGFkSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95KClcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUoYWRJRClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDb3VudCsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93Q291bnQgPiAzKSB7Ly/lsZXnpLrotoXov4cz5qyhIOS7juaWsOWKoOi9vVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlKGFkSUQpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2ljU3RhdGUgPSBTREtTdGF0ZS5jbG9zZTtcclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUgPT0gQWRTdGF0ZS5jbG9zZSkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICB9XHJcbiAgICBvblJlc2l6ZShzaXplKSB7XHJcbiAgICAgICAgbGV0IHdpblNpemUgPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICBpZiAoc2l6ZS53aWR0aCAhPSAwICYmIHNpemUuaGVpZ2h0ICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zdHlsZS50b3AgPSB3aW5TaXplLndpbmRvd0hlaWdodCAtIHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLnN0eWxlLmxlZnQgPSAod2luU2l6ZS53aW5kb3dXaWR0aCAtIHNpemUud2lkdGgpIC8gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZShhZElkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmFkVW5pdElEID0gYWRJZDtcclxuICAgICAgICBsZXQgd2luU2l6ZSA9IHR0LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHdpblNpemUpO1xyXG4gICAgICAgIC8vIGxldCBiYW5uZXJIZWlnaHQgPSAyMDA7XHJcbiAgICAgICAgbGV0IGJhbm5lcldpZHRoID0gMjAwO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0dC5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLmFkVW5pdElELFxyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpblNpemUud2luZG93V2lkdGggLSBiYW5uZXJXaWR0aCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgdG9wOiB3aW5TaXplLndpbmRvd0hlaWdodCAtIChiYW5uZXJXaWR0aCAvIDE2ICogOSksIC8vIOagueaNruezu+e7n+e6puWumuWwuuWvuOiuoeeul+WHuuW5v+WRiumrmOW6plxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGJhbm5lcldpZHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uub25Mb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uub25SZXNpemUodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5vcGVuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGhpZGUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5jbG9zZTtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkVycm9yKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdiYW5uZXIgb25FcnJvcicsIGVycilcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRGYWlsKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jhbm5lciBvbkxvYWQnKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZFN1Y2VzcylcclxuICAgICAgICBpZiAodGhpcy5sb2dpY1N0YXRlID09IFNES1N0YXRlLm9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9mZkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZFcnJvcih0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZSZXNpemUodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=