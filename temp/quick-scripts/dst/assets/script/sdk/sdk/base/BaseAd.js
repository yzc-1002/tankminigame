
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ea138DvGXFFKYrZjdreh9jN', 'BaseAd');
// script/sdk/sdk/base/BaseAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDKConfig_1 = require("../SDKConfig");
/**
 * 所有广告的父类
 *
 */
var BaseAd = /** @class */ (function () {
    function BaseAd(channel) {
        //广告状态
        this.state = SDKConfig_1.SDKState.close;
        //当前使用的广告ID
        this.adUnitID = '';
        //游戏逻辑状态
        this.logicState = SDKConfig_1.SDKState.open;
        //当前广告实例
        this.instance = null;
        //广告实例保存位置
        this.instanceMap = {};
        //连续点击次数
        this.clickCount = 0;
        //广告展示次数
        this.showCount = 0;
        this.channel = channel;
    }
    BaseAd.prototype.setState = function (s) {
        this.state = s;
    };
    BaseAd.prototype.getState = function () {
        return this.state;
    };
    BaseAd.prototype.close = function () {
    };
    BaseAd.prototype.reportAdClick = function (adId) { };
    BaseAd.prototype.reportAdShow = function (adId) { };
    return BaseAd;
}());
exports.default = BaseAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZUFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXdEO0FBRXhEOzs7R0FHRztBQUNIO0lBcUJJLGdCQUFZLE9BQW9CO1FBcEJoQyxNQUFNO1FBQ0ksVUFBSyxHQUFhLG9CQUFRLENBQUMsS0FBSyxDQUFDO1FBQzNDLFdBQVc7UUFDRCxhQUFRLEdBQVcsRUFBRSxDQUFBO1FBQy9CLFFBQVE7UUFDRSxlQUFVLEdBQWEsb0JBQVEsQ0FBQyxJQUFJLENBQUE7UUFDOUMsUUFBUTtRQUNFLGFBQVEsR0FBUSxJQUFJLENBQUM7UUFDL0IsVUFBVTtRQUNBLGdCQUFXLEdBQUcsRUFBRSxDQUFBO1FBRTFCLFFBQVE7UUFDRSxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRWpDLFFBQVE7UUFDRSxjQUFTLEdBQVcsQ0FBQyxDQUFBO1FBTTNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFDRCx5QkFBUSxHQUFSLFVBQVMsQ0FBVztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQseUJBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBS0Qsc0JBQUssR0FBTDtJQUVBLENBQUM7SUFDRCw4QkFBYSxHQUFiLFVBQWMsSUFBSSxJQUFJLENBQUM7SUFFdkIsNkJBQVksR0FBWixVQUFhLElBQUksSUFBSSxDQUFDO0lBQzFCLGFBQUM7QUFBRCxDQXpDQSxBQXlDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU0RLU3RhdGUsIFJlc3VsdENhbGxiYWNrIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5pbXBvcnQgQmFzZUNoYW5uZWwgZnJvbSBcIi4vQmFzZUNoYW5uZWxcIjtcclxuLyoqXHJcbiAqIOaJgOacieW5v+WRiueahOeItuexu1xyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VBZCB7XHJcbiAgICAvL+W5v+WRiueKtuaAgVxyXG4gICAgcHJvdGVjdGVkIHN0YXRlOiBTREtTdGF0ZSA9IFNES1N0YXRlLmNsb3NlO1xyXG4gICAgLy/lvZPliY3kvb/nlKjnmoTlub/lkYpJRFxyXG4gICAgcHJvdGVjdGVkIGFkVW5pdElEOiBzdHJpbmcgPSAnJ1xyXG4gICAgLy/muLjmiI/pgLvovpHnirbmgIFcclxuICAgIHByb3RlY3RlZCBsb2dpY1N0YXRlOiBTREtTdGF0ZSA9IFNES1N0YXRlLm9wZW5cclxuICAgIC8v5b2T5YmN5bm/5ZGK5a6e5L6LXHJcbiAgICBwcm90ZWN0ZWQgaW5zdGFuY2U6IGFueSA9IG51bGw7XHJcbiAgICAvL+W5v+WRiuWunuS+i+S/neWtmOS9jee9rlxyXG4gICAgcHJvdGVjdGVkIGluc3RhbmNlTWFwID0ge31cclxuXHJcbiAgICAvL+i/nue7reeCueWHu+asoeaVsFxyXG4gICAgcHJvdGVjdGVkIGNsaWNrQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy/lub/lkYrlsZXnpLrmrKHmlbBcclxuICAgIHByb3RlY3RlZCBzaG93Q291bnQ6IG51bWJlciA9IDBcclxuXHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2s6IGFueTtcclxuICAgIHByb3RlY3RlZCBjaGFubmVsOiBCYXNlQ2hhbm5lbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsOiBCYXNlQ2hhbm5lbCkge1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICB9XHJcbiAgICBzZXRTdGF0ZShzOiBTREtTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhYnN0cmFjdCBvcGVuKGFkSUQ6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbilcclxuXHJcbiAgICBjbG9zZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICByZXBvcnRBZENsaWNrKGFkSWQpIHsgfVxyXG5cclxuICAgIHJlcG9ydEFkU2hvdyhhZElkKSB7IH1cclxufSJdfQ==