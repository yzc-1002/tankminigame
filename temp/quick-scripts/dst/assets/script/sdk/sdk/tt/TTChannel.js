
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/tt/TTChannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2fc0KseANNTLL9TPU0t7M3', 'TTChannel');
// script/sdk/sdk/tt/TTChannel.ts

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
var TTBanner_1 = require("./TTBanner");
var TTVideoAd_1 = require("./TTVideoAd");
var TTRecorder_1 = require("./TTRecorder");
var TTShare_1 = require("./TTShare");
var TTLogin_1 = require("./TTLogin");
var TTInsertAd1_1 = require("./TTInsertAd1");
var SDKConfig_1 = require("../SDKConfig");
var TTScreenshot_1 = require("./TTScreenshot");
var TTChannel = /** @class */ (function (_super) {
    __extends(TTChannel, _super);
    function TTChannel(id) {
        var _this = _super.call(this, id) || this;
        // this.canSubPackage = true;
        if (tt.createBannerAd) {
            _this.bannerAd = new TTBanner_1.default(_this);
        }
        if (tt.createRewardedVideoAd) {
            _this.rewardAd = new TTVideoAd_1.default(_this);
        }
        else {
            console.log(' TTChannel createRewardedVideoAd   is null ', tt);
        }
        if (tt.getGameRecorderManager) {
            _this.recorder = new TTRecorder_1.default();
        }
        if (tt.shareAppMessage) {
            _this.share = new TTShare_1.default(_this);
        }
        _this.loginMgr = new TTLogin_1.default(_this);
        if (tt.createInterstitialAd) {
            _this.insertAd = new TTInsertAd1_1.default(_this.configData[SDKConfig_1.ADName.insert][0]);
        }
        _this.screenshot = new TTScreenshot_1.default(_this);
        return _this;
    }
    TTChannel.prototype.vibrateShort = function () {
        tt.vibrateShort({
            success: function (res) {
                //   console.log(`${res}`);
            },
            fail: function (res) {
                //   console.log(`vibrateShort调用失败`);
            }
        });
    };
    TTChannel.prototype.showToast = function (title) {
        tt.showToast({ title: title });
    };
    //展示网络图片
    TTChannel.prototype.previewImage = function (imgUrl) {
        tt.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    TTChannel.prototype.checkForUpdate = function (callback) {
        //小游戏官方的分包加载方式
        if (tt.getUpdateManager) {
            var updateManager_1 = tt.getUpdateManager();
            console.log("getUpdateManager", updateManager_1);
            updateManager_1.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log("onCheckForUpdate", res.hasUpdate);
                if (res.hasUpdate) {
                    tt.showToast({
                        title: "即将有更新请留意"
                    });
                }
                else {
                    callback(SDKConfig_1.ResultState.YES);
                }
            });
            updateManager_1.onUpdateReady(function () {
                tt.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否立即使用？",
                    success: function (res) {
                        if (res.confirm) {
                            // 调用 applyUpdate 应用新版本并重启
                            updateManager_1.applyUpdate();
                        }
                        else {
                            tt.showToast({
                                icon: "none",
                                title: "小程序下一次「冷启动」时会使用新版本"
                            });
                            callback(SDKConfig_1.ResultState.YES);
                        }
                    }
                });
            });
            updateManager_1.onUpdateFailed(function () {
                tt.showToast({
                    title: "更新失败，下次启动继续..."
                });
                callback(SDKConfig_1.ResultState.YES);
            });
        }
        else {
            callback(SDKConfig_1.ResultState.YES);
        }
    };
    return TTChannel;
}(BaseChannel_1.default));
exports.default = TTChannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdHRcXFRUQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsdUNBQWtDO0FBQ2xDLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMscUNBQWdDO0FBQ2hDLHFDQUFnQztBQUNoQyw2Q0FBdUM7QUFDdkMsMENBQW1FO0FBQ25FLCtDQUEwQztBQUUxQztJQUF1Qyw2QkFBVztJQUc5QyxtQkFBWSxFQUFVO1FBQXRCLFlBQ0ksa0JBQU0sRUFBRSxDQUFDLFNBNEJaO1FBM0JHLDZCQUE2QjtRQUM3QixJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUU7WUFDbkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsS0FBSSxDQUFDLENBQUE7U0FDckM7UUFDRCxJQUFJLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVMsQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN0QzthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxFQUFFLENBQUMsQ0FBQTtTQUNqRTtRQUVELElBQUksRUFBRSxDQUFDLHNCQUFzQixFQUFFO1lBQzNCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUE7U0FDbkM7UUFFRCxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUU7WUFDcEIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGlCQUFPLENBQUMsS0FBSSxDQUFDLENBQUE7U0FDakM7UUFFRCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQU8sQ0FBQyxLQUFJLENBQUMsQ0FBQTtRQUVqQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtZQUN6QixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscUJBQVUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNwRTtRQUVELEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBWSxDQUFDLEtBQUksQ0FBQyxDQUFBOztJQUc1QyxDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUNJLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDWixPQUFPLFlBQUMsR0FBRztnQkFDUCwyQkFBMkI7WUFDL0IsQ0FBQztZQUNELElBQUksWUFBQyxHQUFHO2dCQUNKLHFDQUFxQztZQUN6QyxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDZCQUFTLEdBQVQsVUFBVSxLQUFZO1FBQ2xCLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsUUFBUTtJQUNSLGdDQUFZLEdBQVosVUFBYSxNQUFjO1FBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQjtTQUNwQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0Qsa0NBQWMsR0FBZCxVQUFlLFFBQXdCO1FBQ25DLGNBQWM7UUFDZCxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQixJQUFNLGVBQWEsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGVBQWEsQ0FBQyxDQUFDO1lBQy9DLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFDLEdBQUc7Z0JBQy9CLGNBQWM7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9DLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtvQkFDZixFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUNULEtBQUssRUFBRSxVQUFVO3FCQUNwQixDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsUUFBUSxDQUFDLHVCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQzVCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxlQUFhLENBQUMsYUFBYSxDQUFDO2dCQUN4QixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNULEtBQUssRUFBRSxNQUFNO29CQUNiLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLE9BQU8sRUFBRSxVQUFVLEdBQUc7d0JBQ2xCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDYiwwQkFBMEI7NEJBQzFCLGVBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt5QkFDL0I7NkJBQU07NEJBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDVCxJQUFJLEVBQUUsTUFBTTtnQ0FDWixLQUFLLEVBQUUsb0JBQW9COzZCQUM5QixDQUFDLENBQUM7NEJBQ0gsUUFBUSxDQUFDLHVCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7eUJBQzVCO29CQUNMLENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxlQUFhLENBQUMsY0FBYyxDQUFDO2dCQUN6QixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNULEtBQUssRUFBRSxnQkFBZ0I7aUJBQzFCLENBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUMsdUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM3QixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxRQUFRLENBQUMsdUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUM1QjtJQUNMLENBQUM7SUFDTCxnQkFBQztBQUFELENBckdBLEFBcUdDLENBckdzQyxxQkFBVyxHQXFHakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNoYW5uZWwgZnJvbSBcIi4uL2Jhc2UvQmFzZUNoYW5uZWxcIjtcclxuaW1wb3J0IFRUQmFubmVyIGZyb20gXCIuL1RUQmFubmVyXCI7XHJcbmltcG9ydCBUVFZpZGVvQWQgZnJvbSBcIi4vVFRWaWRlb0FkXCI7XHJcbmltcG9ydCBUVFJlY29yZGVyIGZyb20gXCIuL1RUUmVjb3JkZXJcIjtcclxuaW1wb3J0IFRUU2hhcmUgZnJvbSBcIi4vVFRTaGFyZVwiO1xyXG5pbXBvcnQgVFRMb2dpbiBmcm9tIFwiLi9UVExvZ2luXCI7XHJcbmltcG9ydCBUVEluc2VydEFkIGZyb20gXCIuL1RUSW5zZXJ0QWQxXCI7XHJcbmltcG9ydCB7IFJlc3VsdENhbGxiYWNrLCBBRE5hbWUsIFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5pbXBvcnQgVFRTY3JlZW5zaG90IGZyb20gXCIuL1RUU2NyZWVuc2hvdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVFRDaGFubmVsIGV4dGVuZHMgQmFzZUNoYW5uZWwge1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoaWQpXHJcbiAgICAgICAgLy8gdGhpcy5jYW5TdWJQYWNrYWdlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHQuY3JlYXRlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZCA9IG5ldyBUVEJhbm5lcih0aGlzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHQuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkQWQgPSBuZXcgVFRWaWRlb0FkKHRoaXMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyBUVENoYW5uZWwgY3JlYXRlUmV3YXJkZWRWaWRlb0FkICAgaXMgbnVsbCAnLCB0dClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0dC5nZXRHYW1lUmVjb3JkZXJNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSBuZXcgVFRSZWNvcmRlcigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHQuc2hhcmVBcHBNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmUgPSBuZXcgVFRTaGFyZSh0aGlzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2dpbk1nciA9IG5ldyBUVExvZ2luKHRoaXMpXHJcblxyXG4gICAgICAgIGlmICh0dC5jcmVhdGVJbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICB0aGlzLmluc2VydEFkID0gbmV3IFRUSW5zZXJ0QWQodGhpcy5jb25maWdEYXRhW0FETmFtZS5pbnNlcnRdWzBdKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5zaG90ID0gbmV3IFRUU2NyZWVuc2hvdCh0aGlzKVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdmlicmF0ZVNob3J0KCkge1xyXG4gICAgICAgIHR0LnZpYnJhdGVTaG9ydCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGAke3Jlc31gKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coYHZpYnJhdGVTaG9ydOiwg+eUqOWksei0pWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzaG93VG9hc3QodGl0bGU6c3RyaW5nKXtcclxuICAgICAgICB0dC5zaG93VG9hc3Qoe3RpdGxlOnRpdGxlfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+Wxleekuue9kee7nOWbvueJh1xyXG4gICAgcHJldmlld0ltYWdlKGltZ1VybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHQucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgY3VycmVudDogaW1nVXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgICAgICAgIHVybHM6IFtpbWdVcmxdIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcclxuICAgICAgICB9KVxyXG4gICAgfSAgICBcclxuICAgIGNoZWNrRm9yVXBkYXRlKGNhbGxiYWNrOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIC8v5bCP5ri45oiP5a6Y5pa555qE5YiG5YyF5Yqg6L295pa55byPXHJcbiAgICAgICAgaWYgKHR0LmdldFVwZGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlTWFuYWdlciA9IHR0LmdldFVwZGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRVcGRhdGVNYW5hZ2VyXCIsIHVwZGF0ZU1hbmFnZXIpO1xyXG4gICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g6K+35rGC5a6M5paw54mI5pys5L+h5oGv55qE5Zue6LCDXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uQ2hlY2tGb3JVcGRhdGVcIiwgcmVzLmhhc1VwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmhhc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWNs+WwhuacieabtOaWsOivt+eVmeaEj1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHQuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLmm7TmlrDmj5DnpLpcIixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIuaWsOeJiOacrOW3sue7j+WHhuWkh+Wlve+8jOaYr+WQpueri+WNs+S9v+eUqO+8n1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDosIPnlKggYXBwbHlVcGRhdGUg5bqU55So5paw54mI5pys5bm26YeN5ZCvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWwj+eoi+W6j+S4i+S4gOasoeOAjOWGt+WQr+WKqOOAjeaXtuS8muS9v+eUqOaWsOeJiOacrFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVGYWlsZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLmm7TmlrDlpLHotKXvvIzkuIvmrKHlkK/liqjnu6fnu60uLi5cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHRTdGF0ZS5ZRVMpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=