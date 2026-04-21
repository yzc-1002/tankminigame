
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/vivo/VivoChannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60f0f4tPVBDw6bXhnh/nweP', 'VivoChannel');
// script/sdk/sdk/vivo/VivoChannel.ts

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
var BaseChannel_1 = require("../base/BaseChannel");
var SDKConfig_1 = require("../SDKConfig");
var VivoRewardAd_1 = require("./VivoRewardAd");
var VivoBannerAd_1 = require("./VivoBannerAd");
var VIvoInsertAd_1 = require("./VIvoInsertAd");
var VivoNativeAd_1 = require("./VivoNativeAd");
var VivoChannel = /** @class */ (function (_super) {
    __extends(VivoChannel, _super);
    function VivoChannel(id) {
        var _this = _super.call(this, id) || this;
        qg.onShow(function () {
            console.log('VivoChannel  onShow ');
        });
        qg.onHide(function () {
            console.log('VivoChannel  onHide ');
        });
        console.log('qg ', qg);
        // this.bannerAd = new WXBanner()
        if (qg.createRewardedVideoAd) {
            _this.rewardAd = new VivoRewardAd_1.default(_this);
        }
        if (qg.createBannerAd) {
            _this.bannerAd = new VivoBannerAd_1.default(_this);
        }
        if (qg.createInsertAd) {
            _this.insertAd = new VIvoInsertAd_1.default(_this);
        }
        if (qg.createNativeAd) {
            _this.nativeAd = new VivoNativeAd_1.default(_this);
        }
        return _this;
    }
    VivoChannel.prototype.showToast = function (title) {
        qg.showToast({
            message: title
        });
    };
    VivoChannel.prototype.vibrateShort = function () {
        qg.vibrateShort({
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        });
    };
    VivoChannel.prototype.canInstallShortcut = function (func) {
        qg.hasShortcutInstalled({
            success: function (res) {
                // 判断图标未存在时，创建图标
                if (res == false) {
                    func(SDKConfig_1.ResultState.YES);
                }
                else {
                    func(SDKConfig_1.ResultState.NO);
                }
            },
            fail: function (err) {
                func(SDKConfig_1.ResultState.NO);
            },
            complete: function () {
                // func(false)
            }
        });
    };
    VivoChannel.prototype.previewImage = function (_tempFilePath) {
        qg.previewImage({
            uris: [_tempFilePath],
            success: function (res) {
                cc.log('Preview image success.');
                // self.label = '';
            }
        });
    };
    VivoChannel.prototype.installShortcut = function (result) {
        qg.installShortcut({
            success: function () {
                // 执行用户创建图标奖励
                console.log(' 安装成功 ');
                result(SDKConfig_1.ResultState.YES);
            },
            fail: function (err) {
                console.log(' 安装失败 ', err);
                result(SDKConfig_1.ResultState.NO);
            },
            complete: function () {
                // result(false)
            }
        });
    };
    VivoChannel.prototype.navigateToMiniProgram = function (appID) {
        qg.navigateToMiniGame({
            pkgName: appID,
            success: function () { },
            fail: function (res) {
                // console.log(JSON.stringify(res))
            }
        });
    };
    return VivoChannel;
}(BaseChannel_1.default));
exports.default = VivoChannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdml2b1xcVml2b0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDBDQUEyRDtBQUMzRCwrQ0FBMEM7QUFDMUMsK0NBQTBDO0FBQzFDLCtDQUEwQztBQUMxQywrQ0FBMEM7QUFDMUM7SUFBeUMsK0JBQVc7SUFFaEQscUJBQVksRUFBVTtRQUF0QixZQUNJLGtCQUFNLEVBQUUsQ0FBQyxTQWdDWjtRQTlCRyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBRXZDLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUV2QyxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3JCLGlDQUFpQztRQUNqQyxJQUFJLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN6QztRQUVELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN6QztRQUdELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN6QztRQUVELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN6Qzs7SUFHTCxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLEtBQVk7UUFDbEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNULE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUdELGtDQUFZLEdBQVo7UUFDSSxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ1osT0FBTyxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDeEIsUUFBUSxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDL0IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHdDQUFrQixHQUFsQixVQUFtQixJQUFvQjtRQUNuQyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDcEIsT0FBTyxFQUFFLFVBQVUsR0FBRztnQkFDbEIsZ0JBQWdCO2dCQUNoQixJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLHVCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ3hCO3FCQUFNO29CQUNILElBQUksQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2lCQUN2QjtZQUNMLENBQUM7WUFDRCxJQUFJLEVBQUUsVUFBVSxHQUFHO2dCQUNmLElBQUksQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3hCLENBQUM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sY0FBYztZQUNsQixDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGtDQUFZLEdBQVosVUFBYSxhQUFxQjtRQUM5QixFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ1osSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1QsRUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUNqQyxtQkFBbUI7WUFDdkIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxxQ0FBZSxHQUFmLFVBQWdCLE1BQXNCO1FBQ2xDLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDZixPQUFPLEVBQUU7Z0JBQ0wsYUFBYTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNyQixNQUFNLENBQUMsdUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixDQUFDO1lBQ0QsSUFBSSxFQUFFLFVBQVUsR0FBRztnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDMUIsTUFBTSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDMUIsQ0FBQztZQUNELFFBQVEsRUFBRTtnQkFDTixnQkFBZ0I7WUFDcEIsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFJRCwyQ0FBcUIsR0FBckIsVUFBc0IsS0FBYTtRQUMvQixFQUFFLENBQUMsa0JBQWtCLENBQUM7WUFDbEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDO1lBQ3hCLElBQUksRUFBRSxVQUFVLEdBQUc7Z0JBQ2YsbUNBQW1DO1lBQ3ZDLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBSUwsa0JBQUM7QUFBRCxDQWxIQSxBQWtIQyxDQWxId0MscUJBQVcsR0FrSG5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDaGFubmVsIGZyb20gXCIuLi9iYXNlL0Jhc2VDaGFubmVsXCI7XHJcbmltcG9ydCB7IFJlc3VsdENhbGxiYWNrLCBSZXN1bHRTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuaW1wb3J0IFZpdm9SZXdhcmRBZCBmcm9tIFwiLi9WaXZvUmV3YXJkQWRcIjtcclxuaW1wb3J0IFZpdm9CYW5uZXJBZCBmcm9tIFwiLi9WaXZvQmFubmVyQWRcIjtcclxuaW1wb3J0IFZpdm9JbnNlcnRBZCBmcm9tIFwiLi9WSXZvSW5zZXJ0QWRcIjtcclxuaW1wb3J0IFZpdm9OYXRpdmVBZCBmcm9tIFwiLi9WaXZvTmF0aXZlQWRcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVml2b0NoYW5uZWwgZXh0ZW5kcyBCYXNlQ2hhbm5lbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGlkKTtcclxuXHJcbiAgICAgICAgcWcub25TaG93KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Zpdm9DaGFubmVsICBvblNob3cgJylcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcWcub25IaWRlKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Zpdm9DaGFubmVsICBvbkhpZGUgJylcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3FnICcscWcpXHJcbiAgICAgICAgLy8gdGhpcy5iYW5uZXJBZCA9IG5ldyBXWEJhbm5lcigpXHJcbiAgICAgICAgaWYgKHFnLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZEFkID0gbmV3IFZpdm9SZXdhcmRBZCh0aGlzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHFnLmNyZWF0ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQgPSBuZXcgVml2b0Jhbm5lckFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICBcclxuXHJcbiAgICAgICAgaWYgKHFnLmNyZWF0ZUluc2VydEFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QWQgPSBuZXcgVml2b0luc2VydEFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgaWYgKHFnLmNyZWF0ZU5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQgPSBuZXcgVml2b05hdGl2ZUFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICBcclxuIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dUb2FzdCh0aXRsZTpzdHJpbmcpe1xyXG4gICAgICAgIHFnLnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRpdGxlXHJcbiAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2aWJyYXRlU2hvcnQoKSB7XHJcbiAgICAgICAgcWcudmlicmF0ZVNob3J0KHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykgeyB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7IH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7IH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNhbkluc3RhbGxTaG9ydGN1dChmdW5jOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIHFnLmhhc1Nob3J0Y3V0SW5zdGFsbGVkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5Zu+5qCH5pyq5a2Y5Zyo5pe277yM5Yib5bu65Zu+5qCHXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5ZRVMpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmdW5jKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aWV3SW1hZ2UoX3RlbXBGaWxlUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgcWcucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgdXJpczogW190ZW1wRmlsZVBhdGhdLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ1ByZXZpZXcgaW1hZ2Ugc3VjY2Vzcy4nKTtcclxuICAgICAgICAgICAgICAgIC8vIHNlbGYubGFiZWwgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbnN0YWxsU2hvcnRjdXQocmVzdWx0OiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIHFnLmluc3RhbGxTaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIOaJp+ihjOeUqOaIt+WIm+W7uuWbvuagh+WlluWKsVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyDlronoo4XmiJDlip8gJylcclxuICAgICAgICAgICAgICAgIHJlc3VsdChSZXN1bHRTdGF0ZS5ZRVMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5a6J6KOF5aSx6LSlICcsIGVycilcclxuICAgICAgICAgICAgICAgIHJlc3VsdChSZXN1bHRTdGF0ZS5OTylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdChmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgbmF2aWdhdGVUb01pbmlQcm9ncmFtKGFwcElEOiBzdHJpbmcpIHtcclxuICAgICAgICBxZy5uYXZpZ2F0ZVRvTWluaUdhbWUoe1xyXG4gICAgICAgICAgICBwa2dOYW1lOiBhcHBJRCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxufSJdfQ==