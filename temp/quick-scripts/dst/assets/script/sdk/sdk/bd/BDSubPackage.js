
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/bd/BDSubPackage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e66aeVyDzJEJJsoIlJX/ZM0', 'BDSubPackage');
// script/sdk/sdk/bd/BDSubPackage.ts

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
var BDSubPackage = /** @class */ (function (_super) {
    __extends(BDSubPackage, _super);
    function BDSubPackage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BDSubPackage.prototype.loadSingle = function (subname, callback) {
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
    return BDSubPackage;
}(BaseSubPackage_1.default));
exports.default = BDSubPackage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmRcXEJEU3ViUGFja2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBb0Q7QUFDcEQsMENBQXlEO0FBR3pEO0lBQTBDLGdDQUFjO0lBQXhEOztJQXdCQSxDQUFDO0lBcEJHLGlDQUFVLEdBQVYsVUFBVyxPQUFlLEVBQUUsUUFBc0I7UUFFOUMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUMvQixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1QsdUJBQXVCO2dCQUN2QixRQUFRLENBQUMsdUJBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUNELElBQUksRUFBRSxVQUFDLEdBQUc7Z0JBQ04sbUJBQW1CO2dCQUNuQixRQUFRLENBQUMsdUJBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbEMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFDLEdBQTBCO1lBQ2pELFFBQVEsQ0FBQyx1QkFBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEQsQ0FBQyxDQUFDLENBQUE7SUFHTixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXhCQSxBQXdCQyxDQXhCeUMsd0JBQWMsR0F3QnZEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VTdWJQYWNrYWdlIGZyb20gXCIuLi9iYXNlL0Jhc2VTdWJQYWNrYWdlXCI7XHJcbmltcG9ydCB7IFJlc3VsdFN0YXRlLCBEYXRhQ2FsbGJhY2sgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkRTdWJQYWNrYWdlIGV4dGVuZHMgQmFzZVN1YlBhY2thZ2Uge1xyXG5cclxuXHJcblxyXG4gICAgbG9hZFNpbmdsZShzdWJuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBEYXRhQ2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgY29uc3QgbG9hZFRhc2sgPSB3eC5sb2FkU3VicGFja2FnZSh7XHJcbiAgICAgICAgICAgIG5hbWU6IHN1Ym5hbWUsIC8vIG5hbWUg5Y+v5Lul5aGrIG5hbWUg5oiW6ICFIHJvb3RcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5YiG5YyF5Yqg6L295oiQ5Yqf5ZCO6YCa6L+HIHN1Y2Nlc3Mg5Zue6LCDXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHRTdGF0ZS5ZRVMsIG51bGwpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOWIhuWMheWKoOi9veWksei0pemAmui/hyBmYWlsIOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8sIG51bGwpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxvYWRUYXNrLm9uUHJvZ3Jlc3NVcGRhdGUoKHJlczogeyBwcm9ncmVzczogbnVtYmVyLCB9KSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLlBST0dSRVNTLCByZXMucHJvZ3Jlc3MpXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgfVxyXG59Il19