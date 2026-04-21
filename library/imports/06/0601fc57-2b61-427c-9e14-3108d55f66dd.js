"use strict";
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