
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/tt/TTLogin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdHRcXFRUTG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLDBDQUF5RTtBQUV6RTs7R0FFRztBQUNIO0lBQXFDLDJCQUFTO0lBQTlDOztJQWdFQSxDQUFDO0lBN0RHLDhCQUFZLEdBQVosVUFBYSxRQUF3QjtRQUNqQyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ1osT0FBTyxZQUFDLEdBQUc7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBWSxDQUFDLENBQUM7Z0JBQzFCLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFDRCxJQUFJLFlBQUMsR0FBRztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHFFQUFtQixDQUFDLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsdUJBQUssR0FBTCxVQUFNLE9BQWUsRUFBRSxJQUFrQjtRQUNyQyxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7UUFDN0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNwQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxFQUFFO1lBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ0wsS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLFlBQUMsR0FBRztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFZLEdBQUcsQ0FBQyxJQUFJLFNBQUksR0FBRyxDQUFDLGFBQWUsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsdUJBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDOUIsQ0FBQztZQUNELElBQUksWUFBQyxHQUFHO2dCQUNKLDRCQUE0QjtnQkFDNUIsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLHVCQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO2lCQUM3QjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsdUJBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7aUJBQzlCO1lBRUwsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCw2QkFBVyxHQUFYLFVBQVksZUFBdUIsRUFBRSxJQUFZLEVBQUUsSUFBa0I7UUFDakUsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNYLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxZQUFDLEdBQUc7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBa0IsR0FBRyxDQUFDLFFBQVUsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDOUIsQ0FBQztZQUNELElBQUksWUFBQyxHQUFHO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyx1QkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdELHdCQUFNLEdBQU47SUFFQSxDQUFDO0lBR0wsY0FBQztBQUFELENBaEVBLEFBZ0VDLENBaEVvQyxtQkFBUyxHQWdFN0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUxvZ2luIGZyb20gXCIuLi9iYXNlL0Jhc2VMb2dpblwiO1xyXG5pbXBvcnQgeyBSZXN1bHRDYWxsYmFjaywgRGF0YUNhbGxiYWNrLCBSZXN1bHRTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuXHJcbi8qKlxyXG4gKiBodHRwczovL21pY3JvYXBwLmJ5dGVkYW5jZS5jb20vZGV2L2NuL21pbmktZ2FtZS9kZXZlbG9wL211bHRpLXNlcnZlci1zdXBwb3J0L3VzaW5nLXJlc3RyaWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUVExvZ2luIGV4dGVuZHMgQmFzZUxvZ2luIHtcclxuXHJcblxyXG4gICAgY2hlY2tTZXNzaW9uKGNhbGxiYWNrOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIHR0LmNoZWNrU2Vzc2lvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgc2Vzc2lvbuacqui/h+acn2ApO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0U3RhdGUuWUVTKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzZXNzaW9u5bey6L+H5pyf77yM6ZyA6KaB6YeN5paw55m75b2VYCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHRTdGF0ZS5OTyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbG9naW4oYWNjb3VudDogc3RyaW5nLCBmdW5jOiBEYXRhQ2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaXNGb3JjZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGxvZ2luID09IGluZm8gJywgaW5mbylcclxuICAgICAgICBpZiAoaW5mby5hcHBOYW1lID09ICdEb3V5aW4nKSB7XHJcbiAgICAgICAgICAgIGlzRm9yY2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0dC5sb2dpbih7XHJcbiAgICAgICAgICAgIGZvcmNlOiBpc0ZvcmNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGxvZ2lu6LCD55So5oiQ5YqfJHtyZXMuY29kZX0gJHtyZXMuYW5vbnltb3VzQ29kZX1gKTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuWUVTLCByZXMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgbG9naW7osIPnlKjlpLHotKVgKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0ZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5OTywgbnVsbClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5ZRVMsIG51bGwpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJbmZvKHdpdGhDcmVkZW50aWFsczogc3RyaW5nLCBsYW5nOiBzdHJpbmcsIGZ1bmM6IERhdGFDYWxsYmFjaykge1xyXG4gICAgICAgIHR0LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgIGxhbmc6IGxhbmcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZ2V0VXNlckluZm/osIPnlKjmiJDlip8ke3Jlcy51c2VySW5mb31gKTtcclxuICAgICAgICAgICAgICAgIGZ1bmMoUmVzdWx0U3RhdGUuWUVTLCByZXMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZ2V0VXNlckluZm/osIPnlKjlpLHotKVgLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5OTywgbnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19