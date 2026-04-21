"use strict";
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