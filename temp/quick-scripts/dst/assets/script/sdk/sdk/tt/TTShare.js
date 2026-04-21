
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/tt/TTShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b4ffdmsikRMbqO8DCVlIjkE', 'TTShare');
// script/sdk/sdk/tt/TTShare.ts

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
var BaseShare_1 = require("../base/BaseShare");
var SDKConfig_1 = require("../SDKConfig");
var TTShare = /** @class */ (function (_super) {
    __extends(TTShare, _super);
    function TTShare(channel) {
        var _this = _super.call(this, channel) || this;
        // GlobalEvent.instance().addEventListener(GlobalEvent.EVENT_SHOW, this.backGame, this)
        tt.showShareMenu({
            withShareTicket: true,
        });
        tt.updateShareMenu({
            withShareTicket: true
        });
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            // let visibleOrigin = Laya.Browser.clientWidth
            // let visibleSize = Laya.Browser.clientHeight
            return {
                title: this.channel.getParam(0, SDKConfig_1.ADName.shareTitle),
                imageUrl: this.channel.getParam(0, SDKConfig_1.ADName.shareImage),
                imageUrlId: '',
                success: function () {
                    console.log('onShareAppMessage 分享成功');
                },
                fail: function (e) {
                    console.log('分享失败', e);
                }
                // imageUrl: canvas.toTempFilePathSync({
                //     x: visibleOrigin.x,
                //     y: visibleOrigin.y,
                //     destWidth: visibleSize.width,
                //     destHeight: visibleSize.height
                // }),
                // success: () => {
                //     console.log('分享成功')
                //     this.shareSuccess();
                // },
                // fail: (e) => {
                //     console.log('分享失败', e)
                // }
            };
        });
        return _this;
    }
    TTShare.prototype.getData = function (site) {
        var data = {
            title: this.channel.getParam(site, SDKConfig_1.ADName.shareTitle),
            imageUrl: this.channel.getParam(site, SDKConfig_1.ADName.shareImage),
            imageUrlId: ''
        };
        return data;
    };
    TTShare.prototype.share = function (index, func, isShowRecorder) {
        var _this = this;
        // this.callback = func;
        var title = this.channel.getParam(index, SDKConfig_1.ADName.shareTitle);
        var videoPath = this.channel.getRecorder().getVideoPath();
        if (isShowRecorder && videoPath) {
            tt.shareAppMessage({
                channel: 'video',
                title: title,
                extra: {
                    videoPath: videoPath,
                },
                success: function () {
                    console.log('分享成功');
                    if (func) {
                        func(SDKConfig_1.ResultState.YES);
                    }
                    // this.shareSuccess();
                    _this.channel.getRecorder().clear();
                },
                fail: function (e) {
                    console.log('分享失败', e);
                    if (e.errMsg.indexOf('short') >= 0) {
                        _this.share(0, func, false);
                    }
                    else {
                        func(SDKConfig_1.ResultState.NO);
                        // ToastController.instance().showLayerByText("分享失败")
                    }
                }
                // x: visibleOrigin.x,
                // y: visibleOrigin.y,
                // imageUrl: canvas.toTempFilePathSync({
                //   destWidth: visibleSize.width,
                //   destHeight: visibleSize.height
                // })
            });
        }
        else {
            tt.shareAppMessage({
                desc: title,
                imageUrl: this.channel.getParam(index, SDKConfig_1.ADName.shareImage),
                title: '分享有礼',
                imageUrlId: '',
                success: function () {
                    console.log('分享成功');
                    if (func) {
                        func(SDKConfig_1.ResultState.YES);
                    }
                    // this.shareSuccess();
                },
                fail: function (e) {
                    console.log('分享失败');
                    func(SDKConfig_1.ResultState.NO);
                    // ToastController.instance().showLayerByText("分享失败")
                }
            });
        }
    };
    TTShare.prototype.getShareInfo = function (shareTicket, func) {
        if (shareTicket) {
            tt.getShareInfo({
                shareTicket: shareTicket,
                success: function () {
                },
                fail: function () {
                }
            });
        }
    };
    return TTShare;
}(BaseShare_1.BaseShare));
exports.default = TTShare;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdHRcXFRUU2hhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBRzlDLDBDQUE2RTtBQUU3RTtJQUFxQywyQkFBUztJQUcxQyxpQkFBWSxPQUFPO1FBQW5CLFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBc0NqQjtRQXJDRyx1RkFBdUY7UUFDdkYsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNiLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDZixlQUFlLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDakIsY0FBYztZQUNkLCtDQUErQztZQUMvQyw4Q0FBOEM7WUFFOUMsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGtCQUFNLENBQUMsVUFBVSxDQUFDO2dCQUNsRCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGtCQUFNLENBQUMsVUFBVSxDQUFDO2dCQUNyRCxVQUFVLEVBQUUsRUFBRTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNELElBQUksRUFBRSxVQUFDLENBQUM7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0Qsd0NBQXdDO2dCQUN4QywwQkFBMEI7Z0JBQzFCLDBCQUEwQjtnQkFDMUIsb0NBQW9DO2dCQUNwQyxxQ0FBcUM7Z0JBQ3JDLE1BQU07Z0JBQ04sbUJBQW1CO2dCQUNuQiwwQkFBMEI7Z0JBQzFCLDJCQUEyQjtnQkFDM0IsS0FBSztnQkFD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O0lBQ0wsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxXQUFtQixFQUFFLElBQXNCO1FBQ3BELElBQUksV0FBVyxFQUFFO1lBQ2IsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDWixXQUFXLEVBQUUsV0FBVztnQkFDeEIsT0FBTyxFQUFFO2dCQUVULENBQUM7Z0JBQ0QsSUFBSSxFQUFFO2dCQUVOLENBQUM7YUFDSixDQUFDLENBQUM7U0FDTjtJQUVMLENBQUM7SUFHTCxjQUFDO0FBQUQsQ0FsSUEsQUFrSUMsQ0FsSW9DLHFCQUFTLEdBa0k3QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VTaGFyZSB9IGZyb20gXCIuLi9iYXNlL0Jhc2VTaGFyZVwiO1xyXG5cclxuaW1wb3J0IFNES01hbmFnZXIgZnJvbSBcIi4uL1NES01hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmVzdWx0Q2FsbGJhY2ssIFNES1N0YXRlLCBBRE5hbWUsIFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVFRTaGFyZSBleHRlbmRzIEJhc2VTaGFyZSB7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYW5uZWwpIHtcclxuICAgICAgICBzdXBlcihjaGFubmVsKTtcclxuICAgICAgICAvLyBHbG9iYWxFdmVudC5pbnN0YW5jZSgpLmFkZEV2ZW50TGlzdGVuZXIoR2xvYmFsRXZlbnQuRVZFTlRfU0hPVywgdGhpcy5iYWNrR2FtZSwgdGhpcylcclxuICAgICAgICB0dC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHR0LnVwZGF0ZVNoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd3gub25TaGFyZUFwcE1lc3NhZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyDnlKjmiLfngrnlh7vkuobigJzovazlj5HigJ3mjInpkq5cclxuICAgICAgICAgICAgLy8gbGV0IHZpc2libGVPcmlnaW4gPSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGhcclxuICAgICAgICAgICAgLy8gbGV0IHZpc2libGVTaXplID0gTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmNoYW5uZWwuZ2V0UGFyYW0oMCwgQUROYW1lLnNoYXJlVGl0bGUpLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHRoaXMuY2hhbm5lbC5nZXRQYXJhbSgwLCBBRE5hbWUuc2hhcmVJbWFnZSksXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybElkOiAnJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25TaGFyZUFwcE1lc3NhZ2Ug5YiG5Lqr5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiG5Lqr5aSx6LSlJywgZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbWFnZVVybDogY2FudmFzLnRvVGVtcEZpbGVQYXRoU3luYyh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeDogdmlzaWJsZU9yaWdpbi54LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHk6IHZpc2libGVPcmlnaW4ueSxcclxuICAgICAgICAgICAgICAgIC8vICAgICBkZXN0V2lkdGg6IHZpc2libGVTaXplLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRlc3RIZWlnaHQ6IHZpc2libGVTaXplLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgLy8gfSksXHJcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ+WIhuS6q+aIkOWKnycpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zaGFyZVN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBmYWlsOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCfliIbkuqvlpLHotKUnLCBlKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXREYXRhKHNpdGUpOiBhbnkge1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5jaGFubmVsLmdldFBhcmFtKHNpdGUsIEFETmFtZS5zaGFyZVRpdGxlKSxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IHRoaXMuY2hhbm5lbC5nZXRQYXJhbShzaXRlLCBBRE5hbWUuc2hhcmVJbWFnZSksXHJcbiAgICAgICAgICAgIGltYWdlVXJsSWQ6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2hhcmUoaW5kZXg6IG51bWJlciwgZnVuYz86IFJlc3VsdENhbGxiYWNrLCBpc1Nob3dSZWNvcmRlcj86IGJvb2xlYW4pIHtcclxuICAgICAgICAvLyB0aGlzLmNhbGxiYWNrID0gZnVuYztcclxuICAgICAgICBsZXQgdGl0bGUgPSB0aGlzLmNoYW5uZWwuZ2V0UGFyYW0oaW5kZXgsIEFETmFtZS5zaGFyZVRpdGxlKTtcclxuICAgICAgICBsZXQgdmlkZW9QYXRoID0gdGhpcy5jaGFubmVsLmdldFJlY29yZGVyKCkuZ2V0VmlkZW9QYXRoKCk7XHJcbiAgICAgICAgaWYgKGlzU2hvd1JlY29yZGVyICYmIHZpZGVvUGF0aCkge1xyXG5cclxuICAgICAgICAgICAgdHQuc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWw6ICd2aWRlbycsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBleHRyYToge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvUGF0aDogdmlkZW9QYXRoLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiG5Lqr5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5ZRVMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNoYXJlU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5nZXRSZWNvcmRlcigpLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiG5Lqr5aSx6LSlJywgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuZXJyTXNnLmluZGV4T2YoJ3Nob3J0JykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlKDAsIGZ1bmMsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuTk8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb2FzdENvbnRyb2xsZXIuaW5zdGFuY2UoKS5zaG93TGF5ZXJCeVRleHQoXCLliIbkuqvlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8geDogdmlzaWJsZU9yaWdpbi54LFxyXG4gICAgICAgICAgICAgICAgLy8geTogdmlzaWJsZU9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgLy8gaW1hZ2VVcmw6IGNhbnZhcy50b1RlbXBGaWxlUGF0aFN5bmMoe1xyXG4gICAgICAgICAgICAgICAgLy8gICBkZXN0V2lkdGg6IHZpc2libGVTaXplLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgLy8gICBkZXN0SGVpZ2h0OiB2aXNpYmxlU2l6ZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHQuc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHRoaXMuY2hhbm5lbC5nZXRQYXJhbShpbmRleCwgQUROYW1lLnNoYXJlSW1hZ2UpLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliIbkuqvmnInnpLwnLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmxJZDogJycsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WIhuS6q+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuWUVTKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaGFyZVN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliIbkuqvlpLHotKUnKTtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jKFJlc3VsdFN0YXRlLk5PKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUb2FzdENvbnRyb2xsZXIuaW5zdGFuY2UoKS5zaG93TGF5ZXJCeVRleHQoXCLliIbkuqvlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNoYXJlSW5mbyhzaGFyZVRpY2tldDogc3RyaW5nLCBmdW5jOiAocmVzdWx0KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKHNoYXJlVGlja2V0KSB7XHJcbiAgICAgICAgICAgIHR0LmdldFNoYXJlSW5mbyh7XHJcbiAgICAgICAgICAgICAgICBzaGFyZVRpY2tldDogc2hhcmVUaWNrZXQsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=