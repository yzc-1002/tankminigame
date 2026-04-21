
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/wx/WXlogin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcd3hcXFdYbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLDBDQUF5RTtBQUV6RTs7R0FFRztBQUNIO0lBQXFDLDJCQUFTO0lBQTlDOztJQXdEQSxDQUFDO0lBckRHLDhCQUFZLEdBQVosVUFBYSxRQUF3QjtRQUNqQyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ1osT0FBTyxZQUFDLEdBQUc7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBWSxDQUFDLENBQUM7Z0JBQzFCLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFDRCxJQUFJLFlBQUMsR0FBRztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHFFQUFtQixDQUFDLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsdUJBQUssR0FBTCxVQUFNLE9BQWUsRUFBRSxJQUFvQjtRQUN2QyxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7UUFDN0IsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNMLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxZQUFDLEdBQUc7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBWSxHQUFHLENBQUMsSUFBSSxTQUFJLEdBQUcsQ0FBQyxhQUFlLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLHVCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDekIsQ0FBQztZQUNELElBQUksWUFBQyxHQUFHO2dCQUNKLDRCQUE0QjtnQkFDNUIsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7aUJBQ3ZCO3FCQUFNO29CQUNILElBQUksQ0FBQyx1QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUN4QjtZQUVMLENBQUM7U0FDSixDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsNkJBQVcsR0FBWCxVQUFZLGVBQXVCLEVBQUUsSUFBWSxFQUFFLElBQWtCO1FBQ2pFLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDWCxlQUFlLEVBQUUsZUFBZTtZQUNoQyxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sWUFBQyxHQUFHO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQWtCLEdBQUcsQ0FBQyxRQUFVLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLHVCQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQzlCLENBQUM7WUFDRCxJQUFJLFlBQUMsR0FBRztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx3QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQXhEQSxBQXdEQyxDQXhEb0MsbUJBQVMsR0F3RDdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VMb2dpbiBmcm9tIFwiLi4vYmFzZS9CYXNlTG9naW5cIjtcclxuaW1wb3J0IHsgUmVzdWx0Q2FsbGJhY2ssIFJlc3VsdFN0YXRlLCBEYXRhQ2FsbGJhY2sgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG4vKipcclxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vbWluaWdhbWUvZGV2L2FwaS9vcGVuLWFwaS9sb2dpbi93eC5sb2dpbi5odG1sXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXWExvZ2luIGV4dGVuZHMgQmFzZUxvZ2luIHtcclxuXHJcblxyXG4gICAgY2hlY2tTZXNzaW9uKGNhbGxiYWNrOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIHd4LmNoZWNrU2Vzc2lvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgc2Vzc2lvbuacqui/h+acn2ApO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0U3RhdGUuWUVTKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzZXNzaW9u5bey6L+H5pyf77yM6ZyA6KaB6YeN5paw55m75b2VYCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHRTdGF0ZS5OTyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbG9naW4oYWNjb3VudDogc3RyaW5nLCBmdW5jOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBpc0ZvcmNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICBmb3JjZTogaXNGb3JjZSxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBsb2dpbuiwg+eUqOaIkOWKnyR7cmVzLmNvZGV9ICR7cmVzLmFub255bW91c0NvZGV9YCk7XHJcbiAgICAgICAgICAgICAgICBmdW5jKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBsb2dpbuiwg+eUqOWksei0pWApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRm9yY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jKFJlc3VsdFN0YXRlLk5PKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckluZm8od2l0aENyZWRlbnRpYWxzOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgZnVuYzogRGF0YUNhbGxiYWNrKSB7XHJcbiAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHdpdGhDcmVkZW50aWFscyxcclxuICAgICAgICAgICAgbGFuZzogbGFuZyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBnZXRVc2VySW5mb+iwg+eUqOaIkOWKnyR7cmVzLnVzZXJJbmZvfWApO1xyXG4gICAgICAgICAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5ZRVMsIHJlcylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBnZXRVc2VySW5mb+iwg+eUqOWksei0pWAsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICBmdW5jKFJlc3VsdFN0YXRlLk5PLCBudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=