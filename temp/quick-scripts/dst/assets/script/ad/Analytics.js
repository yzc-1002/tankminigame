
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/Analytics.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcQW5hbHl0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF5RDtBQUV6RDtJQUtJO1FBRkEsZUFBVSxHQUFZLElBQUksQ0FBQyxDQUFDLE1BQU07UUFJOUIsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO1NBQzNDO2FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQztTQUNsRDthQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUM7U0FDM0M7YUFDRztZQUNBLDJDQUEyQztTQUM5QztJQUVMLENBQUM7SUFFTSxxQkFBVyxHQUFsQjtRQUNJLElBQUksU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDOUIsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFHRDs7O09BR0c7SUFDSCx5QkFBSyxHQUFMLFVBQU0sR0FBRztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQkFBTyxHQUFQLFVBQVEsR0FBRyxFQUFDLElBQUk7UUFDWixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBL0NNLG9CQUFVLEdBQUssSUFBSSxDQUFDLENBQUMsTUFBTTtJQWdEdEMsZ0JBQUM7Q0FsREQsQUFrREMsSUFBQTtBQWxEWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7V2VjaGF0QW5hbHl0aWNzfSBmcm9tIFwiLi93ZWNoYXQvV2VjaGF0QW5hbHl0aWNzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzICB7XHJcblxyXG4gICAgc3RhdGljIF9zSW5zdGFuY2UgICA9IG51bGw7IC8v6Z2Z5oCB5a6e5L6LXHJcbiAgICBfYW5hbHl0aWNzICAgICAgICAgID0gbnVsbDsgLy/nu5/orqHlrp7kvotcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICB0aGlzLl9hbmFseXRpY3MgPSBuZXcgV2VjaGF0QW5hbHl0aWNzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQU5EUk9JRCl7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2FuYWx5dGljcyA9IG5ldyBXZWNoYXRBbmFseXRpY3MoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkFuYWx5dGljc3tcclxuICAgICAgICBpZiAoQW5hbHl0aWNzLl9zSW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBBbmFseXRpY3MuX3NJbnN0YW5jZSA9IG5ldyBBbmFseXRpY3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFuYWx5dGljcy5fc0luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDln4vngrnkuovku7ZcclxuICAgICAqIEBwYXJhbSBrZXkgOuS6i+S7tmtleVxyXG4gICAgICovXHJcbiAgICBldmVudChrZXkpIHtcclxuICAgICAgICBpZiAodGhpcy5fYW5hbHl0aWNzKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbmFseXRpY3MgZXZlbnQgXCIgKyBrZXkpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbmFseXRpY3MuZXZlbnQoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDln4vngrnkuovku7ZcclxuICAgICAqIEBwYXJhbSBrZXkgOuS6i+S7tmtleVxyXG4gICAgICogQHBhcmFtIGRhdGEgOuS6i+S7tuaVsOaNriB7ICdrZXkxJzondmFsdWUxJywna2V5Mic6J3ZhbHVlMicgfVxyXG4gICAgICovXHJcbiAgICBldmVudEV4KGtleSxkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuYWx5dGljcyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQW5hbHl0aWNzIGV2ZW50IFwiICsga2V5KTtcclxuICAgICAgICAgICAgdGhpcy5fYW5hbHl0aWNzLmV2ZW50KGtleSxkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19