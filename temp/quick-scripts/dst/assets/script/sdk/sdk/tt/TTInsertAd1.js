
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/tt/TTInsertAd1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ea50ddZNkZL9LBSpwQ0XXKA', 'TTInsertAd1');
// script/sdk/sdk/tt/TTInsertAd1.ts

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
 * auth 游子陈
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/open-capacity/ads/tt.createinterstitialad
 */
var TTInsertAd = /** @class */ (function (_super) {
    __extends(TTInsertAd, _super);
    function TTInsertAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TTInsertAd.prototype.open = function (adID) {
        console.log('BaseInterstitialAd showAd this.state ', this.state);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.create(adID);
        this.load();
    };
    TTInsertAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    TTInsertAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    TTInsertAd.prototype.onClose = function () {
        console.log(' 插屏广告关闭');
    };
    TTInsertAd.prototype.load = function () {
        // if (this.instance) {
        //     console.log(' Insert load ')
        //     this.instance.load()
        // }
    };
    TTInsertAd.prototype.show = function () {
        // if (this.instance) {
        //     this.instance.show()
        // }
    };
    TTInsertAd.prototype.destroy = function () {
        // if (this.instance != null) {
        //     this.instance.offLoad(this.onLoad.bind(this))
        //     this.instance.offError(this.onError.bind(this))
        //     this.instance.offClose(this.onClose.bind(this))
        //     this.instance.destroy();
        //     this.instance = null;
        // }
    };
    TTInsertAd.prototype.create = function (id) {
        this.adUnitID = id;
        // 创建插屏广告实例，提前初始化
        var isToutiaio = tt.getSystemInfoSync().appName === "Toutiao";
        // 插屏广告仅今日头条安卓客户端支持
        console.log(" isToutiaio ", isToutiaio);
        if (isToutiaio) {
            var interstitialAd_1 = tt.createInterstitialAd({
                adUnitId: this.adUnitID
            });
            interstitialAd_1
                .load()
                .then(function () {
                console.log("interstitialAd  show ");
                interstitialAd_1.show();
            })
                .catch(function (err) {
                console.log(err);
            });
        }
    };
    return TTInsertAd;
}(BaseAd_1.default));
exports.default = TTInsertAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdHRcXFRUSW5zZXJ0QWQxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywwQ0FBd0M7QUFFeEM7OztHQUdHO0FBQ0g7SUFBd0MsOEJBQU07SUFBOUM7O0lBMEVBLENBQUM7SUF4RUMseUJBQUksR0FBSixVQUFLLElBQVk7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoRSx1Q0FBdUM7UUFDdkMsY0FBYztRQUNkLElBQUk7UUFFSixJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFRLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVTLDJCQUFNLEdBQWhCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVTLDRCQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFUyw0QkFBTyxHQUFqQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVTLHlCQUFJLEdBQWQ7UUFDRSx1QkFBdUI7UUFDdkIsbUNBQW1DO1FBQ25DLDJCQUEyQjtRQUMzQixJQUFJO0lBQ04sQ0FBQztJQUVTLHlCQUFJLEdBQWQ7UUFDRSx1QkFBdUI7UUFDdkIsMkJBQTJCO1FBQzNCLElBQUk7SUFDTixDQUFDO0lBRUQsNEJBQU8sR0FBUDtRQUNFLCtCQUErQjtRQUMvQixvREFBb0Q7UUFDcEQsc0RBQXNEO1FBQ3RELHNEQUFzRDtRQUN0RCwrQkFBK0I7UUFDL0IsNEJBQTRCO1FBQzVCLElBQUk7SUFDTixDQUFDO0lBRVMsMkJBQU0sR0FBaEIsVUFBaUIsRUFBRTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixpQkFBaUI7UUFFakIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztRQUNoRSxtQkFBbUI7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDdkMsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFNLGdCQUFjLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUM3QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWM7aUJBQ1gsSUFBSSxFQUFFO2lCQUNOLElBQUksQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7Z0JBQ3BDLGdCQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVILGlCQUFDO0FBQUQsQ0ExRUEsQUEwRUMsQ0ExRXVDLGdCQUFNLEdBMEU3QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES1N0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuLyoqXHJcbiAqIGF1dGgg5ri45a2Q6ZmIXHJcbiAqIGh0dHBzOi8vbWljcm9hcHAuYnl0ZWRhbmNlLmNvbS9kZXYvY24vbWluaS1nYW1lL2RldmVsb3Avb3Blbi1jYXBhY2l0eS9hZHMvdHQuY3JlYXRlaW50ZXJzdGl0aWFsYWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRUSW5zZXJ0QWQgZXh0ZW5kcyBCYXNlQWQge1xyXG5cclxuICBvcGVuKGFkSUQ6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2coJ0Jhc2VJbnRlcnN0aXRpYWxBZCBzaG93QWQgdGhpcy5zdGF0ZSAnLCB0aGlzLnN0YXRlKVxyXG4gICAgLy8gaWYgKHRoaXMuc3RhdGUgPT0gQWRTdGF0ZS5sb2FkaW5nKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5sb2FkaW5nO1xyXG4gICAgdGhpcy5jcmVhdGUoYWRJRClcclxuICAgIHRoaXMubG9hZCgpXHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coJyDmj5LlsY/lub/lkYrliqDovb3miJDlip8nKVxyXG4gICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkU3VjZXNzKVxyXG4gICAgdGhpcy5zaG93KClcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkVycm9yKGVycikge1xyXG4gICAgY29uc29sZS5sb2coJyDmj5LlsY/lub/lkYrliqDovb3lpLHotKUgJywgZXJyKVxyXG4gICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgY29uc29sZS5sb2coJyDmj5LlsY/lub/lkYrlhbPpl60nKVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGxvYWQoKSB7XHJcbiAgICAvLyBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCcgSW5zZXJ0IGxvYWQgJylcclxuICAgIC8vICAgICB0aGlzLmluc3RhbmNlLmxvYWQoKVxyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNob3coKSB7XHJcbiAgICAvLyBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgLy8gICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpXHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgLy8gaWYgKHRoaXMuaW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgLy8gICAgIHRoaXMuaW5zdGFuY2Uub2ZmTG9hZCh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgLy8gICAgIHRoaXMuaW5zdGFuY2Uub2ZmRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAvLyAgICAgdGhpcy5pbnN0YW5jZS5vZmZDbG9zZSh0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKSlcclxuICAgIC8vICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgIC8vICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGUoaWQpIHtcclxuICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgIC8vIOWIm+W7uuaPkuWxj+W5v+WRiuWunuS+i++8jOaPkOWJjeWIneWni+WMllxyXG5cclxuICAgIGNvbnN0IGlzVG91dGlhaW8gPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpLmFwcE5hbWUgPT09IFwiVG91dGlhb1wiO1xyXG4gICAgLy8g5o+S5bGP5bm/5ZGK5LuF5LuK5pel5aS05p2h5a6J5Y2T5a6i5oi356uv5pSv5oyBXHJcbiAgICBjb25zb2xlLmxvZyhcIiBpc1RvdXRpYWlvIFwiLCBpc1RvdXRpYWlvKVxyXG4gICAgaWYgKGlzVG91dGlhaW8pIHtcclxuICAgICAgY29uc3QgaW50ZXJzdGl0aWFsQWQgPSB0dC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgYWRVbml0SWQ6IHRoaXMuYWRVbml0SURcclxuICAgICAgfSk7XHJcbiAgICAgIGludGVyc3RpdGlhbEFkXHJcbiAgICAgICAgLmxvYWQoKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW50ZXJzdGl0aWFsQWQgIHNob3cgXCIpXHJcbiAgICAgICAgICBpbnRlcnN0aXRpYWxBZC5zaG93KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=