"use strict";
cc._RF.push(module, 'f9961wS8edMJJ/nGD6ISrSG', 'ShareComp');
// script/sdk/sdk/comp/ShareComp.ts

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
var ShareComp = /** @class */ (function (_super) {
    __extends(ShareComp, _super);
    function ShareComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adSite = 0;
        _this.callback = new cc.Component.EventHandler();
        return _this;
    }
    ShareComp.prototype.start = function () {
        var hasShare = SDKManager_1.default.hasShare();
        if (hasShare) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
        }
        else {
            this.node.active = hasShare;
        }
    };
    ShareComp.prototype.onButtonClick = function () {
        var _this = this;
        SDKManager_1.default.getChannel().showShare(this.adSite, function (result) {
            _this.callback.emit([result]);
        });
    };
    __decorate([
        property
    ], ShareComp.prototype, "adSite", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            displayName: "回调函数"
        })
    ], ShareComp.prototype, "callback", void 0);
    ShareComp = __decorate([
        ccclass,
        requireComponent(cc.Button)
    ], ShareComp);
    return ShareComp;
}(cc.Component));
exports.default = ShareComp;

cc._RF.pop();