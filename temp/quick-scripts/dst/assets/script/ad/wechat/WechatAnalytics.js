
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/wechat/WechatAnalytics.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d718RBPpdCErLcAEHSQpx/', 'WechatAnalytics');
// script/ad/wechat/WechatAnalytics.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatAnalytics = void 0;
var WechatAnalytics = /** @class */ (function () {
    function WechatAnalytics() {
    }
    //埋点
    WechatAnalytics.prototype.event = function (key, data) {
        if (data === undefined) {
            wx.uma['trackEvent'](key);
        }
        else {
            wx.uma['trackEvent'](key, data);
        }
    };
    return WechatAnalytics;
}());
exports.WechatAnalytics = WechatAnalytics;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcd2VjaGF0XFxXZWNoYXRBbmFseXRpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFHSTtJQUNBLENBQUM7SUFFRCxJQUFJO0lBQ0osK0JBQUssR0FBTCxVQUFNLEdBQUcsRUFBQyxJQUFJO1FBQ1YsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0I7YUFDRztZQUNBLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUdMLHNCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSwwQ0FBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgY2xhc3MgV2VjaGF0QW5hbHl0aWNzIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ln4vngrlcclxuICAgIGV2ZW50KGtleSxkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB3eC51bWFbJ3RyYWNrRXZlbnQnXShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB3eC51bWFbJ3RyYWNrRXZlbnQnXShrZXksZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19