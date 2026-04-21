
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1320cHWXIJHbIB2uNbyxzgW', 'BaseShare');
// script/sdk/sdk/base/BaseShare.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseShare = void 0;
var SDKConfig_1 = require("../SDKConfig");
var BaseShare = /** @class */ (function () {
    function BaseShare(channel) {
        this.state = SDKConfig_1.SDKState.close;
        this.callback = null;
        this.channel = channel;
    }
    BaseShare.prototype.getShareInfo = function (shareTicket, func) { };
    return BaseShare;
}());
exports.BaseShare = BaseShare;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZVNoYXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF3RDtBQUl4RDtJQVFJLG1CQUFZLE9BQW9CO1FBTnRCLFVBQUssR0FBYSxvQkFBUSxDQUFDLEtBQUssQ0FBQztRQUVqQyxhQUFRLEdBQW1CLElBQUksQ0FBQTtRQUtyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBU0QsZ0NBQVksR0FBWixVQUFhLFdBQW1CLEVBQUUsSUFBc0IsSUFBRyxDQUFDO0lBQ2hFLGdCQUFDO0FBQUQsQ0FwQkEsQUFvQkMsSUFBQTtBQXBCcUIsOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXN1bHRDYWxsYmFjaywgU0RLU3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcbmltcG9ydCBCYXNlQ2hhbm5lbCBmcm9tIFwiLi9CYXNlQ2hhbm5lbFwiO1xyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2hhcmUge1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGF0ZTogU0RLU3RhdGUgPSBTREtTdGF0ZS5jbG9zZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2s6IFJlc3VsdENhbGxiYWNrID0gbnVsbFxyXG5cclxuICAgIHByb3RlY3RlZCBjaGFubmVsOiBCYXNlQ2hhbm5lbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsOiBCYXNlQ2hhbm5lbCkge1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRpdGxlICDliIbkuqvmoIfpophcclxuICAgICAqIEBwYXJhbSBmdW5jIOWIhuS6q+Wbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIGlzU2hvd1JlY29yZGVyIOaYr+WQpuWIhuS6q+W9leWxjyBcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2hhcmUoc2l0ZTogbnVtYmVyLCBmdW5jPzogUmVzdWx0Q2FsbGJhY2ssIGlzU2hvd1JlY29yZGVyPzogYm9vbGVhbilcclxuICAgIFxyXG4gICAgZ2V0U2hhcmVJbmZvKHNoYXJlVGlja2V0OiBzdHJpbmcsIGZ1bmM6IChyZXN1bHQpID0+IHZvaWQpIHt9XHJcbn1cclxuIl19