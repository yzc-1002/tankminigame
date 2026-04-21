
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/wx/WXChannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67a54mTFKVHuIpoWbc32QeK', 'WXChannel');
// script/sdk/sdk/wx/WXChannel.ts

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
var WXBannerAd_1 = require("./WXBannerAd");
var WXRewardedVideoAd_1 = require("./WXRewardedVideoAd");
var WXShare_1 = require("./WXShare");
var WXlogin_1 = require("./WXlogin");
var WXScreenshot_1 = require("./WXScreenshot");
var WXChannel = /** @class */ (function (_super) {
    __extends(WXChannel, _super);
    function WXChannel(id) {
        var _this = _super.call(this, id) || this;
        if (wx.createBannerAd) {
            _this.bannerAd = new WXBannerAd_1.default(_this);
        }
        // if (wx.createInterstitialAd) {
        //     this.insertAd = new WXInterstitialAd(this)
        // }
        if (wx.createRewardedVideoAd) {
            _this.rewardAd = new WXRewardedVideoAd_1.default(_this);
        }
        if (wx.shareAppMessage) {
            _this.share = new WXShare_1.default(_this);
        }
        _this.loginMgr = new WXlogin_1.default(_this);
        _this.screenshot = new WXScreenshot_1.default(_this);
        return _this;
    }
    WXChannel.prototype.vibrateShort = function () {
        wx.vibrateShort();
    };
    //展示网络图片
    WXChannel.prototype.previewImage = function (imgUrl) {
        wx.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    //跳转能力
    WXChannel.prototype.navigateToMiniProgram = function (appID) {
        wx.navigateToMiniProgram({
            appId: appID,
            success: function () {
                cc.log('wx navigateToMiniProgram succ');
            }
        });
    };
    WXChannel.prototype.showToast = function (title) {
        wx.showToast({ title: title });
    };
    WXChannel.prototype.postMessage = function (msg) {
        var context = wx.getOpenDataContext();
        if (context) {
            msg.channelID = this.channelID;
            context.postMessage(msg);
        }
    };
    return WXChannel;
}(BaseChannel_1.default));
exports.default = WXChannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcd3hcXFdYQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFFOUMsMkNBQXNDO0FBRXRDLHlEQUFvRDtBQUNwRCxxQ0FBZ0M7QUFDaEMscUNBQWdDO0FBQ2hDLCtDQUEwQztBQUUxQztJQUF1Qyw2QkFBVztJQUk5QyxtQkFBWSxFQUFhO1FBQXpCLFlBQ0ksa0JBQU0sRUFBRSxDQUFDLFNBcUJaO1FBcEJHLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQVUsQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUN2QztRQUVELGlDQUFpQztRQUNqQyxpREFBaUQ7UUFDakQsSUFBSTtRQUVKLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFFO1lBQzFCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUM5QztRQUVELElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRTtZQUNwQixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQU8sQ0FBQyxLQUFJLENBQUMsQ0FBQTtTQUNqQztRQUVELEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBTyxDQUFDLEtBQUksQ0FBQyxDQUFBO1FBRWpDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBWSxDQUFDLEtBQUksQ0FBQyxDQUFBOztJQUU1QyxDQUFDO0lBSUQsZ0NBQVksR0FBWjtRQUNJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUTtJQUNSLGdDQUFZLEdBQVosVUFBYSxNQUFjO1FBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQjtTQUNwQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsTUFBTTtJQUNOLHlDQUFxQixHQUFyQixVQUFzQixLQUFhO1FBQy9CLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRTtnQkFDTCxFQUFFLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDNUMsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCw2QkFBUyxHQUFULFVBQVUsS0FBWTtRQUNsQixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUNELCtCQUFXLEdBQVgsVUFBWSxHQUFRO1FBQ2hCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO1FBQ3JDLElBQUksT0FBTyxFQUFFO1lBQ1QsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDM0I7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQTdEQSxBQTZEQyxDQTdEc0MscUJBQVcsR0E2RGpEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDaGFubmVsIGZyb20gXCIuLi9iYXNlL0Jhc2VDaGFubmVsXCI7XHJcbmltcG9ydCB7IENoYW5uZWxJRCB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuaW1wb3J0IFdYQmFubmVyQWQgZnJvbSBcIi4vV1hCYW5uZXJBZFwiO1xyXG5pbXBvcnQgV1hJbnRlcnN0aXRpYWxBZCBmcm9tIFwiLi9XWEludGVyc3RpdGlhbEFkXCI7XHJcbmltcG9ydCBXWFJld2FyZGVkVmlkZW9BZCBmcm9tIFwiLi9XWFJld2FyZGVkVmlkZW9BZFwiO1xyXG5pbXBvcnQgV1hTaGFyZSBmcm9tIFwiLi9XWFNoYXJlXCI7XHJcbmltcG9ydCBXWExvZ2luIGZyb20gXCIuL1dYbG9naW5cIjtcclxuaW1wb3J0IFdYU2NyZWVuc2hvdCBmcm9tIFwiLi9XWFNjcmVlbnNob3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdYQ2hhbm5lbCBleHRlbmRzIEJhc2VDaGFubmVsIHtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBDaGFubmVsSUQpIHtcclxuICAgICAgICBzdXBlcihpZClcclxuICAgICAgICBpZiAod3guY3JlYXRlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZCA9IG5ldyBXWEJhbm5lckFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiAod3guY3JlYXRlSW50ZXJzdGl0aWFsQWQpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5pbnNlcnRBZCA9IG5ldyBXWEludGVyc3RpdGlhbEFkKHRoaXMpXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAod3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkQWQgPSBuZXcgV1hSZXdhcmRlZFZpZGVvQWQodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh3eC5zaGFyZUFwcE1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZSA9IG5ldyBXWFNoYXJlKHRoaXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvZ2luTWdyID0gbmV3IFdYTG9naW4odGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5zaG90ID0gbmV3IFdYU2NyZWVuc2hvdCh0aGlzKVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHZpYnJhdGVTaG9ydCgpIHtcclxuICAgICAgICB3eC52aWJyYXRlU2hvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wxleekuue9kee7nOWbvueJh1xyXG4gICAgcHJldmlld0ltYWdlKGltZ1VybDogc3RyaW5nKSB7XHJcbiAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgY3VycmVudDogaW1nVXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgICAgICAgIHVybHM6IFtpbWdVcmxdIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v6Lez6L2s6IO95YqbXHJcbiAgICBuYXZpZ2F0ZVRvTWluaVByb2dyYW0oYXBwSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiBhcHBJRCxcclxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKCd3eCBuYXZpZ2F0ZVRvTWluaVByb2dyYW0gc3VjYycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNob3dUb2FzdCh0aXRsZTpzdHJpbmcpe1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6dGl0bGV9KVxyXG4gICAgfVxyXG4gICAgcG9zdE1lc3NhZ2UobXNnOiBhbnkpIHtcclxuICAgICAgICBsZXQgY29udGV4dCA9IHd4LmdldE9wZW5EYXRhQ29udGV4dCgpXHJcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgbXNnLmNoYW5uZWxJRCA9IHRoaXMuY2hhbm5lbElEO1xyXG4gICAgICAgICAgICBjb250ZXh0LnBvc3RNZXNzYWdlKG1zZylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19