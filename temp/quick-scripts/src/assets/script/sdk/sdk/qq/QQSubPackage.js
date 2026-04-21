"use strict";
cc._RF.push(module, '5a17c1/Jl1GOKao56H7y3HV', 'QQSubPackage');
// script/sdk/sdk/qq/QQSubPackage.ts

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
var QQSubPackage = /** @class */ (function (_super) {
    __extends(QQSubPackage, _super);
    function QQSubPackage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QQSubPackage.prototype.loadSingle = function (subname, callback) {
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
    return QQSubPackage;
}(BaseSubPackage_1.default));
exports.default = QQSubPackage;

cc._RF.pop();