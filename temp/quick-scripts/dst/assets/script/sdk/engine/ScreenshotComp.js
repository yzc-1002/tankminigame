
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/engine/ScreenshotComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fbdda0+loFGKJzy5aXcog6Y', 'ScreenshotComp');
// script/sdk/engine/ScreenshotComp.ts

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
var TextureRenderUtils_1 = require("./TextureRenderUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScreenshotComp = /** @class */ (function (_super) {
    __extends(ScreenshotComp, _super);
    function ScreenshotComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        _this.renderNode = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    ScreenshotComp.prototype.start = function () {
        TextureRenderUtils_1.default.instance().init(this.camera, this.renderNode);
    };
    __decorate([
        property(cc.Camera)
    ], ScreenshotComp.prototype, "camera", void 0);
    __decorate([
        property(cc.Node)
    ], ScreenshotComp.prototype, "renderNode", void 0);
    ScreenshotComp = __decorate([
        ccclass
    ], ScreenshotComp);
    return ScreenshotComp;
}(cc.Component));
exports.default = ScreenshotComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXGVuZ2luZVxcU2NyZWVuc2hvdENvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBR2hELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBaUJDO1FBZEcsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFZLElBQUksQ0FBQzs7UUFVM0IsaUJBQWlCO0lBQ3JCLENBQUM7SUFURyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLDhCQUFLLEdBQUw7UUFDSSw0QkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbkUsQ0FBQztJQVhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ0s7SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDUztJQU5WLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FpQmxDO0lBQUQscUJBQUM7Q0FqQkQsQUFpQkMsQ0FqQjJDLEVBQUUsQ0FBQyxTQUFTLEdBaUJ2RDtrQkFqQm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGV4dHVyZVJlbmRlclV0aWxzIGZyb20gXCIuL1RleHR1cmVSZW5kZXJVdGlsc1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuc2hvdENvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5DYW1lcmEpXHJcbiAgICBjYW1lcmE6IGNjLkNhbWVyYSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByZW5kZXJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgVGV4dHVyZVJlbmRlclV0aWxzLmluc3RhbmNlKCkuaW5pdCh0aGlzLmNhbWVyYSx0aGlzLnJlbmRlck5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=