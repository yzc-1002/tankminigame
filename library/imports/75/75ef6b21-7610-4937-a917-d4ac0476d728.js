"use strict";
cc._RF.push(module, '75ef6shdhBJN6kX1KwEdtco', 'RecorderComp');
// script/sdk/sdk/comp/RecorderComp.ts

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
var RecorderComp = /** @class */ (function (_super) {
    __extends(RecorderComp, _super);
    function RecorderComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.isRunning = false;
        return _this;
    }
    RecorderComp.prototype.start = function () {
        this.node.active = SDKManager_1.default.getChannel().hasRecorder();
        if (this.node.active) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
        }
    };
    // update (dt) {}
    RecorderComp.prototype.onButtonClick = function () {
        if (!this.isRunning) {
            SDKManager_1.default.getChannel().recorderStart();
            this.label.string = "录屏分享";
            this.isRunning = true;
        }
        else {
            this.isRunning = false;
            this.label.string = "屏幕录制";
            SDKManager_1.default.getChannel().recorderStop();
            SDKManager_1.default.getChannel().showShare(0, function (result) {
                SDKManager_1.default.getChannel().showToast('录频分享结果：' + result);
            }, true);
        }
    };
    __decorate([
        property(cc.Label)
    ], RecorderComp.prototype, "label", void 0);
    RecorderComp = __decorate([
        ccclass
    ], RecorderComp);
    return RecorderComp;
}(cc.Component));
exports.default = RecorderComp;

cc._RF.pop();