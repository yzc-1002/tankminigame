"use strict";
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