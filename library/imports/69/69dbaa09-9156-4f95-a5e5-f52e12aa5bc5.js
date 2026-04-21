"use strict";
cc._RF.push(module, '69dbaoJkVZPlaXl9S4SqlvF', 'WXlogin');
// script/sdk/sdk/wx/WXlogin.ts

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
var BaseLogin_1 = require("../base/BaseLogin");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://developers.weixin.qq.com/minigame/dev/api/open-api/login/wx.login.html
 */
var WXLogin = /** @class */ (function (_super) {
    __extends(WXLogin, _super);
    function WXLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXLogin.prototype.checkSession = function (callback) {
        wx.checkSession({
            success: function (res) {
                console.log("session\u672A\u8FC7\u671F");
                callback(SDKConfig_1.ResultState.YES);
            },
            fail: function (res) {
                console.log("session\u5DF2\u8FC7\u671F\uFF0C\u9700\u8981\u91CD\u65B0\u767B\u5F55");
                callback(SDKConfig_1.ResultState.NO);
            }
        });
    };
    WXLogin.prototype.login = function (account, func) {
        var isForce = false;
        wx.login({
            force: isForce,
            success: function (res) {
                console.log("login\u8C03\u7528\u6210\u529F" + res.code + " " + res.anonymousCode);
                func(SDKConfig_1.ResultState.YES);
            },
            fail: function (res) {
                // console.log(`login调用失败`);
                if (isForce) {
                    func(SDKConfig_1.ResultState.NO);
                }
                else {
                    func(SDKConfig_1.ResultState.YES);
                }
            }
        });
    };
    WXLogin.prototype.getUserInfo = function (withCredentials, lang, func) {
        wx.getUserInfo({
            withCredentials: withCredentials,
            lang: lang,
            success: function (res) {
                console.log("getUserInfo\u8C03\u7528\u6210\u529F" + res.userInfo);
                func(SDKConfig_1.ResultState.YES, res);
            },
            fail: function (res) {
                console.log("getUserInfo\u8C03\u7528\u5931\u8D25", res);
                func(SDKConfig_1.ResultState.NO, null);
            }
        });
    };
    WXLogin.prototype.logout = function () {
    };
    return WXLogin;
}(BaseLogin_1.default));
exports.default = WXLogin;

cc._RF.pop();