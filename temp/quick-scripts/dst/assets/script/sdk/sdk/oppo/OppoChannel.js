
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoChannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '110a7uMgSZCoqUyV+OgKQih', 'OppoChannel');
// script/sdk/sdk/oppo/OppoChannel.ts

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
var OppoRewardAd_1 = require("./OppoRewardAd");
var OppoBannerAd_1 = require("./OppoBannerAd");
var OppoInsertAd_1 = require("./OppoInsertAd");
var OppoNativeAd_1 = require("./OppoNativeAd");
var OppoSubPackage_1 = require("./OppoSubPackage");
var OppoScreenshot_1 = require("./OppoScreenshot");
var OppoChannel = /** @class */ (function (_super) {
    __extends(OppoChannel, _super);
    function OppoChannel(id) {
        var _this = _super.call(this, id) || this;
        console.log('OppoChannel  constructor ');
        qg.onShow(function () {
            console.log('OppoChannel  onShow ');
        });
        qg.onHide(function () {
            console.log('OppoChannel  onHide ');
        });
        // this.bannerAd = new WXBanner()
        if (qg.createRewardedVideoAd) {
            _this.rewardAd = new OppoRewardAd_1.default(_this);
        }
        if (qg.createBannerAd) {
            _this.bannerAd = new OppoBannerAd_1.default(_this);
        }
        if (qg.createInsertAd) {
            _this.insertAd = new OppoInsertAd_1.default(_this);
        }
        if (qg.createNativeAd) {
            _this.nativeAd = new OppoNativeAd_1.default(_this);
        }
        console.log('OppoChannel  constructor  222222');
        _this.subPackage = new OppoSubPackage_1.default(_this);
        _this.screenshot = new OppoScreenshot_1.default(_this);
        return _this;
    }
    OppoChannel.prototype.showToast = function (title) {
        qg.showToast({ title: title });
    };
    OppoChannel.prototype.vibrateShort = function () {
        qg.vibrateShort({
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        });
    };
    OppoChannel.prototype.canInstallShortcut = function (func) {
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
    OppoChannel.prototype.installShortcut = function (result) {
        qg.installShortcut({
            success: function (param) {
                // 执行用户创建图标奖励
                console.log(' 安装成功 ', param);
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
    OppoChannel.prototype.setLoadingProgress = function (progress) {
        qg.setLoadingProgress({
            progress: progress
        });
    };
    OppoChannel.prototype.loadingComplete = function () {
        qg.loadingComplete({
            complete: function (res) { }
        });
    };
    OppoChannel.prototype.navigateToMiniGame = function (appID) {
        qg.navigateToMiniGame({
            pkgName: appID,
            success: function () { },
            fail: function (res) {
                // console.log(JSON.stringify(res))
            }
        });
    };
    OppoChannel.prototype.previewImage = function (_tempFilePath) {
        qg.previewImage({
            urls: [_tempFilePath],
            success: function (res) {
                cc.log('Preview image success.');
                // self.label = '';
            }
        });
    };
    return OppoChannel;
}(BaseChannel_1.default));
exports.default = OppoChannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDBDQUEyRDtBQUMzRCwrQ0FBMEM7QUFDMUMsK0NBQTBDO0FBQzFDLCtDQUEwQztBQUMxQywrQ0FBMEM7QUFDMUMsbURBQThDO0FBQzlDLG1EQUE4QztBQUc5QztJQUF5QywrQkFBVztJQUNoRCxxQkFBWSxFQUFVO1FBQXRCLFlBQ0ksa0JBQU0sRUFBRSxDQUFDLFNBOEJaO1FBN0JHLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUN4QyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBRXZDLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUV2QyxDQUFDLENBQUMsQ0FBQTtRQUVGLGlDQUFpQztRQUNqQyxJQUFJLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN6QztRQUNELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN6QztRQUVELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN6QztRQUNELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtT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LENBQUM7SUFHTCxrQkFBQztBQUFELENBdkhBLEFBdUhDLENBdkh3QyxxQkFBVyxHQXVIbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNoYW5uZWwgZnJvbSBcIi4uL2Jhc2UvQmFzZUNoYW5uZWxcIjtcclxuaW1wb3J0IHsgUmVzdWx0Q2FsbGJhY2ssIFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5pbXBvcnQgT3Bwb1Jld2FyZEFkIGZyb20gXCIuL09wcG9SZXdhcmRBZFwiO1xyXG5pbXBvcnQgT3Bwb0Jhbm5lckFkIGZyb20gXCIuL09wcG9CYW5uZXJBZFwiO1xyXG5pbXBvcnQgT3Bwb0luc2VydEFkIGZyb20gXCIuL09wcG9JbnNlcnRBZFwiO1xyXG5pbXBvcnQgT3Bwb05hdGl2ZUFkIGZyb20gXCIuL09wcG9OYXRpdmVBZFwiO1xyXG5pbXBvcnQgT3Bwb1N1YlBhY2thZ2UgZnJvbSBcIi4vT3Bwb1N1YlBhY2thZ2VcIjtcclxuaW1wb3J0IE9wcG9TY3JlZW5zaG90IGZyb20gXCIuL09wcG9TY3JlZW5zaG90XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb0NoYW5uZWwgZXh0ZW5kcyBCYXNlQ2hhbm5lbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdPcHBvQ2hhbm5lbCAgY29uc3RydWN0b3IgJylcclxuICAgICAgICBxZy5vblNob3coKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3Bwb0NoYW5uZWwgIG9uU2hvdyAnKVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBxZy5vbkhpZGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3Bwb0NoYW5uZWwgIG9uSGlkZSAnKVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyB0aGlzLmJhbm5lckFkID0gbmV3IFdYQmFubmVyKClcclxuICAgICAgICBpZiAocWcuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkQWQgPSBuZXcgT3Bwb1Jld2FyZEFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChxZy5jcmVhdGVCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkID0gbmV3IE9wcG9CYW5uZXJBZCh0aGlzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHFnLmNyZWF0ZUluc2VydEFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QWQgPSBuZXcgT3Bwb0luc2VydEFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChxZy5jcmVhdGVOYXRpdmVBZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkID0gbmV3IE9wcG9OYXRpdmVBZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygnT3Bwb0NoYW5uZWwgIGNvbnN0cnVjdG9yICAyMjIyMjInKVxyXG4gICAgICAgIHRoaXMuc3ViUGFja2FnZSA9IG5ldyBPcHBvU3ViUGFja2FnZSh0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLnNjcmVlbnNob3QgPSBuZXcgT3Bwb1NjcmVlbnNob3QodGhpcylcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd1RvYXN0KHRpdGxlOiBzdHJpbmcpIHtcclxuICAgICAgICBxZy5zaG93VG9hc3QoeyB0aXRsZTogdGl0bGUgfSlcclxuICAgIH1cclxuXHJcbiAgICB2aWJyYXRlU2hvcnQoKSB7XHJcbiAgICAgICAgcWcudmlicmF0ZVNob3J0KHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykgeyB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7IH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7IH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNhbkluc3RhbGxTaG9ydGN1dChmdW5jOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIHFnLmhhc1Nob3J0Y3V0SW5zdGFsbGVkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5Zu+5qCH5pyq5a2Y5Zyo5pe277yM5Yib5bu65Zu+5qCHXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5ZRVMpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmdW5jKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGluc3RhbGxTaG9ydGN1dChyZXN1bHQ6IFJlc3VsdENhbGxiYWNrKSB7XHJcbiAgICAgICAgcWcuaW5zdGFsbFNob3J0Y3V0KHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmiafooYznlKjmiLfliJvlu7rlm77moIflpZblirFcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5a6J6KOF5oiQ5YqfICcscGFyYW0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQoUmVzdWx0U3RhdGUuWUVTKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIOWuieijheWksei0pSAnLCBlcnIpXHJcbiAgICAgICAgICAgICAgICByZXN1bHQoUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXN1bHQoZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRMb2FkaW5nUHJvZ3Jlc3MocHJvZ3Jlc3M6IG51bWJlcikge1xyXG4gICAgICAgIHFnLnNldExvYWRpbmdQcm9ncmVzcyh7XHJcbiAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRpbmdDb21wbGV0ZSgpIHtcclxuICAgICAgICBxZy5sb2FkaW5nQ29tcGxldGUoe1xyXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykgeyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVUb01pbmlHYW1lKGFwcElEOiBzdHJpbmcpIHtcclxuICAgICAgICBxZy5uYXZpZ2F0ZVRvTWluaUdhbWUoe1xyXG4gICAgICAgICAgICBwa2dOYW1lOiBhcHBJRCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aWV3SW1hZ2UoX3RlbXBGaWxlUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgcWcucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgdXJsczogW190ZW1wRmlsZVBhdGhdLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ1ByZXZpZXcgaW1hZ2Ugc3VjY2Vzcy4nKTtcclxuICAgICAgICAgICAgICAgIC8vIHNlbGYubGFiZWwgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=