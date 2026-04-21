
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoSubPackage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01af5Bb3JpOyKWXhClcNWpc', 'OppoSubPackage');
// script/sdk/sdk/oppo/OppoSubPackage.ts

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
var BaseSubPackage_1 = require("../base/BaseSubPackage");
var SDKConfig_1 = require("../SDKConfig");
var OppoSubPackage = /** @class */ (function (_super) {
    __extends(OppoSubPackage, _super);
    function OppoSubPackage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OppoSubPackage.prototype.loadSingle = function (subname, callback) {
        var loadTask = qg.loadSubpackage({
            name: subname,
            success: function (res) {
                // 分包加载成功后通过 success 回调
                callback(SDKConfig_1.ResultState.YES, null);
            },
            fail: function (res) {
                // 分包加载失败通过 fail 回调
                callback(SDKConfig_1.ResultState.NO, null);
            },
        });
        loadTask.onProgressUpdate(function (res) {
            callback(SDKConfig_1.ResultState.PROGRESS, res.progress);
        });
    };
    return OppoSubPackage;
}(BaseSubPackage_1.default));
exports.default = OppoSubPackage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb1N1YlBhY2thZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9EO0FBQ3BELDBDQUF5RDtBQUd6RDtJQUE0QyxrQ0FBYztJQUExRDs7SUF1QkEsQ0FBQztJQXBCRyxtQ0FBVSxHQUFWLFVBQVcsT0FBZSxFQUFFLFFBQXNCO1FBRTlDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDL0IsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNULHVCQUF1QjtnQkFDdkIsUUFBUSxDQUFDLHVCQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ25DLENBQUM7WUFDRCxJQUFJLEVBQUUsVUFBQyxHQUFHO2dCQUNOLG1CQUFtQjtnQkFDbkIsUUFBUSxDQUFDLHVCQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ2xDLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBQyxHQUEwQjtZQUNqRCxRQUFRLENBQUMsdUJBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hELENBQUMsQ0FBQyxDQUFBO0lBR04sQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsQ0F2QjJDLHdCQUFjLEdBdUJ6RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlU3ViUGFja2FnZSBmcm9tIFwiLi4vYmFzZS9CYXNlU3ViUGFja2FnZVwiO1xyXG5pbXBvcnQgeyBSZXN1bHRTdGF0ZSwgRGF0YUNhbGxiYWNrIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wcG9TdWJQYWNrYWdlIGV4dGVuZHMgQmFzZVN1YlBhY2thZ2Uge1xyXG5cclxuXHJcbiAgICBsb2FkU2luZ2xlKHN1Ym5hbWU6IHN0cmluZywgY2FsbGJhY2s6IERhdGFDYWxsYmFjaykge1xyXG5cclxuICAgICAgICBjb25zdCBsb2FkVGFzayA9IHFnLmxvYWRTdWJwYWNrYWdlKHtcclxuICAgICAgICAgICAgbmFtZTogc3VibmFtZSwgLy8gbmFtZSDlj6/ku6XloasgbmFtZSDmiJbogIUgcm9vdFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDliIbljIXliqDovb3miJDlip/lkI7pgJrov4cgc3VjY2VzcyDlm57osINcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUywgbnVsbClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5YiG5YyF5Yqg6L295aSx6LSl6YCa6L+HIGZhaWwg5Zue6LCDXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHRTdGF0ZS5OTywgbnVsbClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbG9hZFRhc2sub25Qcm9ncmVzc1VwZGF0ZSgocmVzOiB7IHByb2dyZXNzOiBudW1iZXIsIH0pID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0U3RhdGUuUFJPR1JFU1MsIHJlcy5wcm9ncmVzcylcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=