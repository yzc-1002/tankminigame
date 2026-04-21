"use strict";
cc._RF.push(module, '3887dLR7aRE37dHQaqoJTXN', 'JumpMini');
// script/ad/JumpMini.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var JumpMini = /** @class */ (function (_super) {
    __extends(JumpMini, _super);
    function JumpMini() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appid = '';
        return _this;
    }
    JumpMini.prototype.start = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // do nothig
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            this.node.active = false;
            return;
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this.node.active = false;
            return;
        }
        else {
        }
        this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    };
    JumpMini.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    };
    JumpMini.prototype.onButtonClick = function () {
        this.navigateToMiniProgram(this.appid);
    };
    //跳转小游戏
    JumpMini.prototype.navigateToMiniProgram = function (appid) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.wxJumpToMiniProgram(appid);
        }
    };
    //微信跳转小游戏
    JumpMini.prototype.wxJumpToMiniProgram = function (appid) {
        wx.navigateToMiniProgram({
            appId: appid,
            success: function () {
                cc.log('wx navigateToMiniProgram succ');
            }
        });
    };
    __decorate([
        property
    ], JumpMini.prototype, "appid", void 0);
    JumpMini = __decorate([
        ccclass,
        requireComponent(cc.Button)
    ], JumpMini);
    return JumpMini;
}(cc.Component));
exports.default = JumpMini;

cc._RF.pop();