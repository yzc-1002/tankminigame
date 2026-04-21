"use strict";
cc._RF.push(module, 'eacb8M5MWlGtZxDiM3Ou5vD', 'TTLogin');
// script/sdk/sdk/tt/TTLogin.ts

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
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/multi-server-support/using-restriction
 */
var TTLogin = /** @class */ (function (_super) {
    __extends(TTLogin, _super);
    function TTLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TTLogin.prototype.checkSession = function (callback) {
        tt.checkSession({
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
    TTLogin.prototype.login = function (account, func) {
        var isForce = false;
        var info = tt.getSystemInfoSync();
        console.log(' login == info ', info);
        if (info.appName == 'Douyin') {
            isForce = true;
        }
        tt.login({
            force: isForce,
            success: function (res) {
                console.log("login\u8C03\u7528\u6210\u529F" + res.code + " " + res.anonymousCode);
                func(SDKConfig_1.ResultState.YES, res);
            },
            fail: function (res) {
                // console.log(`login调用失败`);
                if (isForce) {
                    func(SDKConfig_1.ResultState.NO, null);
                }
                else {
                    func(SDKConfig_1.ResultState.YES, null);
                }
            }
        });
    };
    TTLogin.prototype.getUserInfo = function (withCredentials, lang, func) {
        tt.getUserInfo({
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
    TTLogin.prototype.logout = function () {
    };
    return TTLogin;
}(BaseLogin_1.default));
exports.default = TTLogin;

cc._RF.pop();