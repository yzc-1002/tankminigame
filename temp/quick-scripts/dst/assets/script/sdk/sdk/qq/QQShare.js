
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/qq/QQShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7bc8FdkVdKwabSiRAa80Vq', 'QQShare');
// script/sdk/sdk/qq/QQShare.ts

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
var QQShare = /** @class */ (function (_super) {
    __extends(QQShare, _super);
    function QQShare(channel) {
        var _this = _super.call(this, channel) || this;
        _this.time = 0;
        wx.showShareMenu({
            withShareTicket: true,
        });
        wx.updateShareMenu({
            withShareTicket: true
        });
        wx.onShow(function () {
            _this.backGame();
        });
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return _this.getData(0);
        });
        return _this;
    }
    QQShare.prototype.share = function (site, func, isShowRecorder) {
        this.callback = func;
        wx.shareAppMessage(this.getData(site));
        this.state = SDKConfig_1.SDKState.open;
        this.time = Date.now();
    };
    QQShare.prototype.getData = function (site) {
        var data = {
            title: this.channel.getParam(site, SDKConfig_1.ADName.shareTitle),
            imageUrl: this.channel.getParam(site, SDKConfig_1.ADName.shareImage),
            imageUrlId: ''
        };
        return data;
    };
    QQShare.prototype.backGame = function () {
        if (this.state == SDKConfig_1.SDKState.open) {
            this.state = SDKConfig_1.SDKState.close;
            if (this.callback) {
                var disTime = Date.now() - this.time;
                if (disTime >= 3000) {
                    this.callback(SDKConfig_1.ResultState.YES);
                }
                else {
                    this.callback(SDKConfig_1.ResultState.NO);
                }
                this.callback = null;
            }
        }
    };
    QQShare.prototype.getShareInfo = function (shareTicket, func) {
        if (shareTicket) {
            wx.getShareInfo({
                shareTicket: shareTicket,
                success: function (res) {
                    func(res);
                },
                fail: function () {
                }
            });
        }
    };
    return QQShare;
}(BaseShare_1.BaseShare));
exports.default = QQShare;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xccXFcXFFRU2hhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLDBDQUE2RTtBQUU3RTtJQUFxQywyQkFBUztJQUcxQyxpQkFBWSxPQUFPO1FBQW5CLFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBZWpCO1FBakJTLFVBQUksR0FBVyxDQUFDLENBQUM7UUFHdkIsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNiLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDZixlQUFlLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ04sS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pCLGNBQWM7WUFDZCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7O0lBQ04sQ0FBQztJQUlELHVCQUFLLEdBQUwsVUFBTSxJQUFZLEVBQUUsSUFBcUIsRUFBRSxjQUF3QjtRQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFRLENBQUMsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFUyx5QkFBTyxHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksSUFBSSxHQUFHO1lBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxrQkFBTSxDQUFDLFVBQVUsQ0FBQztZQUNyRCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGtCQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3hELFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBSVMsMEJBQVEsR0FBbEI7UUFFSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksb0JBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBUSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7Z0JBQ3BDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtvQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2pDO2dCQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLFdBQW1CLEVBQUUsSUFBc0I7UUFDcEQsSUFBSSxXQUFXLEVBQUU7WUFDYixFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNaLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixPQUFPLEVBQUUsVUFBQyxHQUFHO29CQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDYixDQUFDO2dCQUNELElBQUksRUFBRTtnQkFFTixDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047SUFFTCxDQUFDO0lBQ0wsY0FBQztBQUFELENBdkVBLEFBdUVDLENBdkVvQyxxQkFBUyxHQXVFN0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2hhcmUgfSBmcm9tIFwiLi4vYmFzZS9CYXNlU2hhcmVcIjtcclxuaW1wb3J0IHsgUmVzdWx0Q2FsbGJhY2ssIEFETmFtZSwgU0RLU3RhdGUsIFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUVFTaGFyZSBleHRlbmRzIEJhc2VTaGFyZSB7XHJcblxyXG4gICAgcHJvdGVjdGVkIHRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsKSB7XHJcbiAgICAgICAgc3VwZXIoY2hhbm5lbCk7XHJcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd3gudXBkYXRlU2hhcmVNZW51KHtcclxuICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5vblNob3coKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tHYW1lKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHd4Lm9uU2hhcmVBcHBNZXNzYWdlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG4oCc6L2s5Y+R4oCd5oyJ6ZKuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2hhcmUoc2l0ZTogbnVtYmVyLCBmdW5jPzogUmVzdWx0Q2FsbGJhY2ssIGlzU2hvd1JlY29yZGVyPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jO1xyXG4gICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZSh0aGlzLmdldERhdGEoc2l0ZSkpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNES1N0YXRlLm9wZW47XHJcbiAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0RGF0YShzaXRlKTogYW55IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuY2hhbm5lbC5nZXRQYXJhbShzaXRlLCBBRE5hbWUuc2hhcmVUaXRsZSksXHJcbiAgICAgICAgICAgIGltYWdlVXJsOiB0aGlzLmNoYW5uZWwuZ2V0UGFyYW0oc2l0ZSwgQUROYW1lLnNoYXJlSW1hZ2UpLFxyXG4gICAgICAgICAgICBpbWFnZVVybElkOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBiYWNrR2FtZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU0RLU3RhdGUub3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU0RLU3RhdGUuY2xvc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzVGltZSA9IERhdGUubm93KCkgLSB0aGlzLnRpbWVcclxuICAgICAgICAgICAgICAgIGlmIChkaXNUaW1lID49IDMwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hhcmVJbmZvKHNoYXJlVGlja2V0OiBzdHJpbmcsIGZ1bmM6IChyZXN1bHQpID0+IHZvaWQpIHtcclxuICAgICAgICBpZiAoc2hhcmVUaWNrZXQpIHtcclxuICAgICAgICAgICAgd3guZ2V0U2hhcmVJbmZvKHtcclxuICAgICAgICAgICAgICAgIHNoYXJlVGlja2V0OiBzaGFyZVRpY2tldCxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jKHJlcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==