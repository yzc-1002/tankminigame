
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/wx/WXShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3021cGmrJJI5p9na6gvQ1F', 'WXShare');
// script/sdk/sdk/wx/WXShare.ts

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
/**
 * auth 游子陈
 * https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html
 */
var WXShare = /** @class */ (function (_super) {
    __extends(WXShare, _super);
    function WXShare(channel) {
        var _this = _super.call(this, channel) || this;
        //由于微信无法得到分享结果，所以以时间来判断是否成功。
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
    WXShare.prototype.share = function (site, func, isShowRecorder) {
        this.callback = func;
        wx.shareAppMessage(this.getData(site));
        this.state = SDKConfig_1.SDKState.open;
        this.time = Date.now();
    };
    WXShare.prototype.getData = function (site) {
        var data = {
            title: this.channel.getParam(site, SDKConfig_1.ADName.shareTitle),
            imageUrl: this.channel.getParam(site, SDKConfig_1.ADName.shareImage),
            imageUrlId: this.channel.getParam(site, SDKConfig_1.ADName.shareImageId)
        };
        // cc.log(site);
        // cc.log(data);
        return data;
    };
    WXShare.prototype.backGame = function () {
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
    WXShare.prototype.getShareInfo = function (shareTicket, func) {
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
    return WXShare;
}(BaseShare_1.BaseShare));
exports.default = WXShare;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcd3hcXFdYU2hhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBRTlDLDBDQUE2RTtBQUU3RTs7O0dBR0c7QUFDSDtJQUFxQywyQkFBUztJQUkxQyxpQkFBWSxPQUFvQjtRQUFoQyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQWdCakI7UUFwQkQsNEJBQTRCO1FBQ2xCLFVBQUksR0FBVyxDQUFDLENBQUM7UUFLdkIsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNiLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDZixlQUFlLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ04sS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pCLGNBQWM7WUFDZCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7O0lBQ04sQ0FBQztJQUdELHVCQUFLLEdBQUwsVUFBTSxJQUFZLEVBQUUsSUFBcUIsRUFBRSxjQUF3QjtRQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFRLENBQUMsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFUyx5QkFBTyxHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksSUFBSSxHQUFHO1lBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxrQkFBTSxDQUFDLFVBQVUsQ0FBQztZQUNyRCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGtCQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3hELFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQU0sQ0FBQyxZQUFZLENBQUM7U0FDL0QsQ0FBQTtRQUNELGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUlTLDBCQUFRLEdBQWxCO1FBRUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLG9CQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO2dCQUNwQyxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNqQztnQkFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUN4QjtTQUNKO0lBQ0wsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxXQUFtQixFQUFFLElBQXNCO1FBQ3BELElBQUksV0FBVyxFQUFFO1lBQ2IsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDWixXQUFXLEVBQUUsV0FBVztnQkFDeEIsT0FBTyxFQUFFLFVBQUMsR0FBRztvQkFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2IsQ0FBQztnQkFDRCxJQUFJLEVBQUU7Z0JBRU4sQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNOO0lBRUwsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQTFFQSxBQTBFQyxDQTFFb0MscUJBQVMsR0EwRTdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNoYXJlIH0gZnJvbSBcIi4uL2Jhc2UvQmFzZVNoYXJlXCI7XHJcblxyXG5pbXBvcnQgeyBSZXN1bHRDYWxsYmFjaywgQUROYW1lLCBTREtTdGF0ZSwgUmVzdWx0U3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcbmltcG9ydCBCYXNlQ2hhbm5lbCBmcm9tIFwiLi4vYmFzZS9CYXNlQ2hhbm5lbFwiO1xyXG4vKipcclxuICogYXV0aCDmuLjlrZDpmYhcclxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vbWluaWdhbWUvZGV2L2FwaS9zaGFyZS93eC5zaGFyZUFwcE1lc3NhZ2UuaHRtbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1hTaGFyZSBleHRlbmRzIEJhc2VTaGFyZSB7XHJcbiAgICAvL+eUseS6juW+ruS/oeaXoOazleW+l+WIsOWIhuS6q+e7k+aenO+8jOaJgOS7peS7peaXtumXtOadpeWIpOaWreaYr+WQpuaIkOWKn+OAglxyXG4gICAgcHJvdGVjdGVkIHRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2s6UmVzdWx0Q2FsbGJhY2s7XHJcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsOiBCYXNlQ2hhbm5lbCkge1xyXG4gICAgICAgIHN1cGVyKGNoYW5uZWwpO1xyXG5cclxuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3eC51cGRhdGVTaGFyZU1lbnUoe1xyXG4gICAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHd4Lm9uU2hvdygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFja0dhbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd3gub25TaGFyZUFwcE1lc3NhZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDnlKjmiLfngrnlh7vkuobigJzovazlj5HigJ3mjInpkq5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgwKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNoYXJlKHNpdGU6IG51bWJlciwgZnVuYz86IFJlc3VsdENhbGxiYWNrLCBpc1Nob3dSZWNvcmRlcj86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gZnVuYztcclxuICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2UodGhpcy5nZXREYXRhKHNpdGUpKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5vcGVuO1xyXG4gICAgICAgIHRoaXMudGltZSA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldERhdGEoc2l0ZSk6IGFueSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmNoYW5uZWwuZ2V0UGFyYW0oc2l0ZSwgQUROYW1lLnNoYXJlVGl0bGUpLFxyXG4gICAgICAgICAgICBpbWFnZVVybDogdGhpcy5jaGFubmVsLmdldFBhcmFtKHNpdGUsIEFETmFtZS5zaGFyZUltYWdlKSxcclxuICAgICAgICAgICAgaW1hZ2VVcmxJZDogdGhpcy5jaGFubmVsLmdldFBhcmFtKHNpdGUsIEFETmFtZS5zaGFyZUltYWdlSWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmxvZyhzaXRlKTtcclxuICAgICAgICAvLyBjYy5sb2coZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgYmFja0dhbWUoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNES1N0YXRlLm9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNES1N0YXRlLmNsb3NlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc1RpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy50aW1lXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzVGltZSA+PSAzMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5ZRVMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKFJlc3VsdFN0YXRlLk5PKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNoYXJlSW5mbyhzaGFyZVRpY2tldDogc3RyaW5nLCBmdW5jOiAocmVzdWx0KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKHNoYXJlVGlja2V0KSB7XHJcbiAgICAgICAgICAgIHd4LmdldFNoYXJlSW5mbyh7XHJcbiAgICAgICAgICAgICAgICBzaGFyZVRpY2tldDogc2hhcmVUaWNrZXQsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYyhyZXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=