"use strict";
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