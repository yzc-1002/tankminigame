
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/wx/WXSubPackage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '858acKXiSNAE4ZwqCwA4rZw', 'WXSubPackage');
// script/sdk/sdk/wx/WXSubPackage.ts

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
var WXSubPackage = /** @class */ (function (_super) {
    __extends(WXSubPackage, _super);
    function WXSubPackage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXSubPackage.prototype.loadSingle = function (subname, callback) {
        var loadTask = wx.loadSubpackage({
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
    return WXSubPackage;
}(BaseSubPackage_1.default));
exports.default = WXSubPackage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcd3hcXFdYU3ViUGFja2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBb0Q7QUFDcEQsMENBQXlEO0FBR3pEO0lBQTBDLGdDQUFjO0lBQXhEOztJQXVCQSxDQUFDO0lBcEJHLGlDQUFVLEdBQVYsVUFBVyxPQUFlLEVBQUUsUUFBc0I7UUFFOUMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUMvQixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1QsdUJBQXVCO2dCQUN2QixRQUFRLENBQUMsdUJBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUNELElBQUksRUFBRSxVQUFDLEdBQUc7Z0JBQ04sbUJBQW1CO2dCQUNuQixRQUFRLENBQUMsdUJBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbEMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFDLEdBQTBCO1lBQ2pELFFBQVEsQ0FBQyx1QkFBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEQsQ0FBQyxDQUFDLENBQUE7SUFHTixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXZCQSxBQXVCQyxDQXZCeUMsd0JBQWMsR0F1QnZEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VTdWJQYWNrYWdlIGZyb20gXCIuLi9iYXNlL0Jhc2VTdWJQYWNrYWdlXCI7XHJcbmltcG9ydCB7IFJlc3VsdFN0YXRlLCBEYXRhQ2FsbGJhY2sgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1hTdWJQYWNrYWdlIGV4dGVuZHMgQmFzZVN1YlBhY2thZ2Uge1xyXG5cclxuXHJcbiAgICBsb2FkU2luZ2xlKHN1Ym5hbWU6IHN0cmluZywgY2FsbGJhY2s6IERhdGFDYWxsYmFjaykge1xyXG5cclxuICAgICAgICBjb25zdCBsb2FkVGFzayA9IHd4LmxvYWRTdWJwYWNrYWdlKHtcclxuICAgICAgICAgICAgbmFtZTogc3VibmFtZSwgLy8gbmFtZSDlj6/ku6XloasgbmFtZSDmiJbogIUgcm9vdFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDliIbljIXliqDovb3miJDlip/lkI7pgJrov4cgc3VjY2VzcyDlm57osINcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUywgbnVsbClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5YiG5YyF5Yqg6L295aSx6LSl6YCa6L+HIGZhaWwg5Zue6LCDXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHRTdGF0ZS5OTywgbnVsbClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbG9hZFRhc2sub25Qcm9ncmVzc1VwZGF0ZSgocmVzOiB7IHByb2dyZXNzOiBudW1iZXIsIH0pID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0U3RhdGUuUFJPR1JFU1MsIHJlcy5wcm9ncmVzcylcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIl19