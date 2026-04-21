
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/JumpMiniComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0601fxXK2FCfJ4UMQjVX2bd', 'JumpMiniComp');
// script/sdk/sdk/comp/JumpMiniComp.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var JumpMiniComp = /** @class */ (function (_super) {
    __extends(JumpMiniComp, _super);
    function JumpMiniComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appid = '';
        return _this;
    }
    JumpMiniComp.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    };
    JumpMiniComp.prototype.onButtonClick = function () {
        SDKManager_1.default.getChannel().navigateToMiniProgram(this.appid);
    };
    __decorate([
        property
    ], JumpMiniComp.prototype, "appid", void 0);
    JumpMiniComp = __decorate([
        ccclass,
        requireComponent(cc.Button)
    ], JumpMiniComp);
    return JumpMiniComp;
}(cc.Component));
exports.default = JumpMiniComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcSnVtcE1pbmlDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUdqQyxJQUFBLEtBQTBDLEVBQUUsQ0FBQyxVQUFVLEVBQXJELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBa0IsQ0FBQztBQUk5RDtJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQWFDO1FBVkcsV0FBSyxHQUFXLEVBQUUsQ0FBQzs7SUFVdkIsQ0FBQztJQVJHLDRCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsb0NBQWEsR0FBYjtRQUNJLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFSRDtRQURDLFFBQVE7K0NBQ1U7SUFIRixZQUFZO1FBRmhDLE9BQU87UUFDUCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ1AsWUFBWSxDQWFoQztJQUFELG1CQUFDO0NBYkQsQUFhQyxDQWJ5QyxFQUFFLENBQUMsU0FBUyxHQWFyRDtrQkFib0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTREtNYW5hZ2VyIGZyb20gXCIuLi9TREtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgcmVxdWlyZUNvbXBvbmVudCB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkByZXF1aXJlQ29tcG9uZW50KGNjLkJ1dHRvbilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVtcE1pbmlDb21wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFwcGlkOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQnV0dG9uQ2xpY2ssIHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgb25CdXR0b25DbGljaygpIHtcclxuICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0odGhpcy5hcHBpZCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==