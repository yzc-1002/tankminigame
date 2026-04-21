
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/test/NativeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '91bcfffA9FGIIahW5aa4fRQ', 'NativeView');
// script/sdk/test/NativeView.ts

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
var SDKManager_1 = require("../sdk/SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NativeView = /** @class */ (function (_super) {
    __extends(NativeView, _super);
    function NativeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeView.prototype.start = function () {
    };
    NativeView.prototype.onButtonBackClick = function () {
        this.node.destroy();
        SDKManager_1.default.getChannel().showToast("关闭NativeView");
    };
    NativeView = __decorate([
        ccclass
    ], NativeView);
    return NativeView;
}(cc.Component));
exports.default = NativeView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHRlc3RcXE5hdGl2ZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBRXJDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEOztJQWFBLENBQUM7SUFWRywwQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELHNDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDbkIsb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQVZlLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FhOUI7SUFBRCxpQkFBQztDQWJELEFBYUMsQ0FidUMsRUFBRSxDQUFDLFNBQVMsR0FhbkQ7a0JBYm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi4vc2RrL1NES01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXRpdmVWaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uQnV0dG9uQmFja0NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KClcclxuICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5zaG93VG9hc3QoXCLlhbPpl61OYXRpdmVWaWV3XCIpXHJcbiAgICAgfVxyXG4gXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==