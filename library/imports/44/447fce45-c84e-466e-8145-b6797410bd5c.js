"use strict";
cc._RF.push(module, '447fc5FyE5GboFFtnl0EL1c', 'Dialogs');
// script/base/Dialogs.ts

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
exports.Dialogs = void 0;
var BaseComponent_1 = require("./BaseComponent");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Dialogs = /** @class */ (function (_super) {
    __extends(Dialogs, _super);
    function Dialogs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bottomLayout_ = null; //底层遮罩
        _this._topLayout_ = null; //顶层遮罩
        _this._maskOpacity_ = 160; //遮罩透明度
        _this._maskDuration_ = 0.2; //遮罩渐变时间
        return _this;
    }
    Dialogs.prototype.__preload = function () {
        _super.prototype.__preload.call(this);
        this._bottomLayout_ = Utils_1.Utils.createLayout(yyp.gameFrameSize.width * 2, yyp.gameFrameSize.height * 2, new cc.Color(0, 0, 0, 255), this.node);
        this._bottomLayout_.addComponent(cc.BlockInputEvents);
        this._bottomLayout_.zIndex = -1;
        this._bottomLayout_.opacity = 0;
        this._topLayout_ = Utils_1.Utils.createLayout(yyp.gameFrameSize.width * 2, yyp.gameFrameSize.height * 2, new cc.Color(0, 0, 0, 255), this.node);
        this._topLayout_.zIndex = 9999;
        this._topLayout_.opacity = 0;
    };
    /**
    显示弹窗
    */
    Dialogs.prototype.show = function () {
        this._showMask_();
        this._doShowAnimation_();
    };
    /**
    关闭弹窗
    */
    Dialogs.prototype.close = function () {
        this._hideMask_();
        this._doCloseAnimation_();
        this._doCloseHide_();
    };
    //显示遮罩
    Dialogs.prototype._showMask_ = function () {
        this._bottomLayout_.stopAllActions();
        this._bottomLayout_.runAction(cc.fadeTo(this._maskDuration_, this._maskOpacity_));
        this._topLayout_.addComponent(cc.BlockInputEvents);
    };
    //隐藏遮罩
    Dialogs.prototype._hideMask_ = function () {
        this._bottomLayout_.stopAllActions();
        this._bottomLayout_.runAction(cc.fadeTo(this._maskDuration_, 0));
        this._topLayout_.addComponent(cc.BlockInputEvents);
    };
    //显示动画
    Dialogs.prototype._doShowAnimation_ = function () {
        var self = this;
        var onDialogOpened = function () {
            // cc.log("onDialogOpened");
            self._topLayout_.removeComponent(cc.BlockInputEvents);
            self._openedCallback();
        };
        var saveScale = this.node.scale;
        this.node.stopAllActions();
        this.node.scale = saveScale * 0.8;
        this.node.opacity = 0;
        this.node.runAction(cc.fadeIn(this._maskDuration_ + 0.1));
        this.node.runAction(cc.sequence(cc.scaleTo(this._maskDuration_ + 0.1, saveScale).easing(cc.easeBackInOut()), cc.callFunc(onDialogOpened)));
    };
    //关闭动画
    Dialogs.prototype._doCloseAnimation_ = function () {
        var self = this;
        var onDialogClosed = function () {
            // cc.log("closedCallback");
            self._closedCallback();
        };
        var onDialogWillClose = function () {
            // cc.log("onDialogWillClose");
            self._willCloseCallback();
        };
        var saveScale = this.node.scale;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.callFunc(onDialogWillClose), cc.spawn(cc.fadeOut(this._maskDuration_), cc.scaleTo(this._maskDuration_, saveScale * 0.8).easing(cc.easeBackIn())), cc.callFunc(onDialogClosed)));
    };
    //销毁
    Dialogs.prototype._doCloseHide_ = function () {
        this.node.runAction(cc.sequence(cc.delayTime(this._maskDuration_ + 0.1), cc.removeSelf()));
    };
    /**
    打开完成回调
    */
    Dialogs.prototype._openedCallback = function () {
        // cc.log("Dialogs openedCallback")
    };
    /**
    关闭完成回调
    */
    Dialogs.prototype._closedCallback = function () {
        // cc.log("Dialogs closedCallback")
    };
    /**
    将要关闭回调
    */
    Dialogs.prototype._willCloseCallback = function () {
        // cc.log("Dialogs willCloseCallback")
    };
    Dialogs = __decorate([
        ccclass
    ], Dialogs);
    return Dialogs;
}(BaseComponent_1.BaseComponent));
exports.Dialogs = Dialogs;

cc._RF.pop();