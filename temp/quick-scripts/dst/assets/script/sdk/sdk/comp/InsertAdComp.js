
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/InsertAdComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '014c474E+pLKZ+HOD+39uZf', 'InsertAdComp');
// script/sdk/sdk/comp/InsertAdComp.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SDKManager_1 = require("../SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InsertAdComp = /** @class */ (function (_super) {
    __extends(InsertAdComp, _super);
    function InsertAdComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adSite = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    InsertAdComp.prototype.onLoad = function () {
        this.node.active = SDKManager_1.default.getChannel().hasInsertAd();
        if (this.node.active) {
            SDKManager_1.default.getChannel().showInsertAd(this.adSite);
        }
    };
    InsertAdComp.prototype.onDestroy = function () {
    };
    __decorate([
        property
    ], InsertAdComp.prototype, "adSite", void 0);
    InsertAdComp = __decorate([
        ccclass
    ], InsertAdComp);
    return InsertAdComp;
}(cc.Component));
exports.default = InsertAdComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcSW5zZXJ0QWRDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUVqQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQXFCQztRQWpCRyxZQUFNLEdBQVcsQ0FBQyxDQUFDOztJQWlCdkIsQ0FBQztJQWZHLHdCQUF3QjtJQUV4Qiw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN4RCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2xCLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNwRDtJQUVMLENBQUM7SUFJRCxnQ0FBUyxHQUFUO0lBRUEsQ0FBQztJQWhCRDtRQURDLFFBQVE7Z0RBQ1U7SUFKRixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBcUJoQztJQUFELG1CQUFDO0NBckJELEFBcUJDLENBckJ5QyxFQUFFLENBQUMsU0FBUyxHQXFCckQ7a0JBckJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNES01hbmFnZXIgZnJvbSBcIi4uL1NES01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnNlcnRBZENvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFkU2l0ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpLmhhc0luc2VydEFkKClcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5zaG93SW5zZXJ0QWQodGhpcy5hZFNpdGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==