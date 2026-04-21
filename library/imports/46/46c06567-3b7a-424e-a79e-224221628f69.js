"use strict";
cc._RF.push(module, '46c06VnO3pCTqeeIkIhYo9p', 'Analytics');
// script/ad/Analytics.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
var WechatAnalytics_1 = require("./wechat/WechatAnalytics");
var Analytics = /** @class */ (function () {
    function Analytics() {
        this._analytics = null; //统计实例
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this._analytics = new WechatAnalytics_1.WechatAnalytics();
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
        }
        else {
            // this._analytics = new WechatAnalytics();
        }
    }
    Analytics.getInstance = function () {
        if (Analytics._sInstance == null) {
            Analytics._sInstance = new Analytics();
        }
        return Analytics._sInstance;
    };
    /**
     * 埋点事件
     * @param key :事件key
     */
    Analytics.prototype.event = function (key) {
        if (this._analytics) {
            console.log("Analytics event " + key);
            this._analytics.event(key);
        }
    };
    /**
     * 埋点事件
     * @param key :事件key
     * @param data :事件数据 { 'key1':'value1','key2':'value2' }
     */
    Analytics.prototype.eventEx = function (key, data) {
        if (this._analytics) {
            console.log("Analytics event " + key);
            this._analytics.event(key, data);
        }
    };
    Analytics._sInstance = null; //静态实例
    return Analytics;
}());
exports.Analytics = Analytics;

cc._RF.pop();