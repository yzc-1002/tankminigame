
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseLogin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01df4wsmwlMRa1d2XMM37DS', 'BaseLogin');
// script/sdk/sdk/base/BaseLogin.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseLogin = /** @class */ (function () {
    function BaseLogin(channel) {
        this.channel = channel;
    }
    BaseLogin.prototype.login = function (account, func) {
    };
    BaseLogin.prototype.getUserInfo = function (withCredentials, lang, func) {
    };
    BaseLogin.prototype.checkSession = function (callback) {
    };
    return BaseLogin;
}());
exports.default = BaseLogin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZUxvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7SUFHSSxtQkFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQseUJBQUssR0FBTCxVQUFNLE9BQWUsRUFBRSxJQUFvQjtJQUUzQyxDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLGVBQXNCLEVBQUMsSUFBVyxFQUFDLElBQWtCO0lBRWpFLENBQUM7SUFFRCxnQ0FBWSxHQUFaLFVBQWEsUUFBd0I7SUFFckMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFDYWxsYmFjaywgUmVzdWx0Q2FsbGJhY2sgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcbmltcG9ydCBCYXNlQ2hhbm5lbCBmcm9tIFwiLi9CYXNlQ2hhbm5lbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUxvZ2luIHtcclxuICAgIHByb3RlY3RlZCBjaGFubmVsOiBCYXNlQ2hhbm5lbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsOiBCYXNlQ2hhbm5lbCkge1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4oYWNjb3VudDogc3RyaW5nLCBmdW5jOiBSZXN1bHRDYWxsYmFjaykge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VySW5mbyh3aXRoQ3JlZGVudGlhbHM6c3RyaW5nLGxhbmc6c3RyaW5nLGZ1bmM6IERhdGFDYWxsYmFjaykge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1Nlc3Npb24oY2FsbGJhY2s6IFJlc3VsdENhbGxiYWNrKSB7XHJcblxyXG4gICAgfVxyXG59Il19