"use strict";
cc._RF.push(module, 'b40c9rO1iJJxKjy/wv6WQWD', 'InstallIconComp');
// script/sdk/sdk/comp/InstallIconComp.ts

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
var SDKConfig_1 = require("../SDKConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InstallIconComp = /** @class */ (function (_super) {
    __extends(InstallIconComp, _super);
    function InstallIconComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.callback = new cc.Component.EventHandler();
        return _this;
    }
    InstallIconComp.prototype.start = function () {
        var _this = this;
        SDKManager_1.default.getChannel().canInstallShortcut(function (result) {
            _this.node.active = result == SDKConfig_1.ResultState.NO ? false : true;
            if (_this.node.active) {
                _this.node.on(cc.Node.EventType.TOUCH_END, _this.onButtonClick, _this);
            }
        });
    };
    InstallIconComp.prototype.onButtonClick = function () {
        var _this = this;
        SDKManager_1.default.getChannel().installShortcut(function (result) {
            _this.node.active = result == SDKConfig_1.ResultState.YES ? false : true;
            cc.log(' this.node.active ', _this.node.active);
            _this.callback.emit([result]);
        });
    };
    __decorate([
        property({
            type: cc.Component.EventHandler,
            displayName: "回调函数"
        })
    ], InstallIconComp.prototype, "callback", void 0);
    InstallIconComp = __decorate([
        ccclass
    ], InstallIconComp);
    return InstallIconComp;
}(cc.Component));
exports.default = InstallIconComp;

cc._RF.pop();