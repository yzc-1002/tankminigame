
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/ScreenshotComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b35fdW6yMBOFL7ZdtWNCbkx', 'ScreenshotComponent');
// script/sdk/sdk/comp/ScreenshotComponent.ts

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
var ScreenshotComponent = /** @class */ (function (_super) {
    __extends(ScreenshotComponent, _super);
    function ScreenshotComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenshotComponent.prototype.start = function () {
        this.node.active = SDKManager_1.default.getChannel().hasScreenshot();
        if (this.node.active) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
        }
    };
    ScreenshotComponent.prototype.onButtonClick = function () {
        SDKManager_1.default.getChannel().showScreenshot();
    };
    ScreenshotComponent = __decorate([
        ccclass
    ], ScreenshotComponent);
    return ScreenshotComponent;
}(cc.Component));
exports.default = ScreenshotComponent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcU2NyZWVuc2hvdENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBaUQsdUNBQVk7SUFBN0Q7O0lBY0EsQ0FBQztJQVhHLG1DQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQzFELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDdEU7SUFDTCxDQUFDO0lBRUQsMkNBQWEsR0FBYjtRQUNJLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDNUMsQ0FBQztJQVpnQixtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQWN2QztJQUFELDBCQUFDO0NBZEQsQUFjQyxDQWRnRCxFQUFFLENBQUMsU0FBUyxHQWM1RDtrQkFkb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNES01hbmFnZXIgZnJvbSBcIi4uL1NES01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuc2hvdENvbXBvbmVudCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gU0RLTWFuYWdlci5nZXRDaGFubmVsKCkuaGFzU2NyZWVuc2hvdCgpXHJcbiAgICAgICAgaWYodGhpcy5ub2RlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25CdXR0b25DbGljaywgdGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CdXR0b25DbGljaygpe1xyXG4gICAgICAgIFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpLnNob3dTY3JlZW5zaG90KCkgICAgXHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==