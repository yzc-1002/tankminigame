
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/base/Dialogs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxEaWFsb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBOEM7QUFDOUMsaUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTZCLDJCQUFhO0lBQTFDO1FBQUEscUVBd0hDO1FBdEhHLG9CQUFjLEdBQUksSUFBSSxDQUFDLENBQUssTUFBTTtRQUNsQyxpQkFBVyxHQUFPLElBQUksQ0FBQyxDQUFLLE1BQU07UUFDbEMsbUJBQWEsR0FBSyxHQUFHLENBQUMsQ0FBTSxPQUFPO1FBQ25DLG9CQUFjLEdBQUksR0FBRyxDQUFDLENBQU0sUUFBUTs7SUFtSHhDLENBQUM7SUFqSEcsMkJBQVMsR0FBVDtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFD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O0lBQUQsY0FBQztDQXhIRCxBQXdIQyxDQXhINEIsNkJBQWEsR0F3SHpDO0FBeEhZLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dzIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgX2JvdHRvbUxheW91dF8gID0gbnVsbDsgICAgIC8v5bqV5bGC6YGu572pXHJcbiAgICBfdG9wTGF5b3V0XyAgICAgPSBudWxsOyAgICAgLy/pobblsYLpga7nvalcclxuICAgIF9tYXNrT3BhY2l0eV8gICA9IDE2MDsgICAgICAvL+mBrue9qemAj+aYjuW6plxyXG4gICAgX21hc2tEdXJhdGlvbl8gID0gMC4yOyAgICAgIC8v6YGu572p5riQ5Y+Y5pe26Ze0XHJcbiAgICBcclxuICAgIF9fcHJlbG9hZCgpIHtcclxuICAgICAgICBzdXBlci5fX3ByZWxvYWQoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9ib3R0b21MYXlvdXRfID0gVXRpbHMuY3JlYXRlTGF5b3V0KHl5cC5nYW1lRnJhbWVTaXplLndpZHRoKjIseXlwLmdhbWVGcmFtZVNpemUuaGVpZ2h0KjIsbmV3IGNjLkNvbG9yKDAsMCwwLDI1NSksdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl9ib3R0b21MYXlvdXRfLmFkZENvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKTtcclxuICAgICAgICB0aGlzLl9ib3R0b21MYXlvdXRfLnpJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuX2JvdHRvbUxheW91dF8ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdG9wTGF5b3V0XyA9IFV0aWxzLmNyZWF0ZUxheW91dCh5eXAuZ2FtZUZyYW1lU2l6ZS53aWR0aCoyLHl5cC5nYW1lRnJhbWVTaXplLmhlaWdodCoyLG5ldyBjYy5Db2xvcigwLDAsMCwyNTUpLHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5fdG9wTGF5b3V0Xy56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgIHRoaXMuX3RvcExheW91dF8ub3BhY2l0eSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDmmL7npLrlvLnnqpdcclxuICAgICovXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuX3Nob3dNYXNrXygpO1xyXG4gICAgICAgIHRoaXMuX2RvU2hvd0FuaW1hdGlvbl8oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOWFs+mXreW8ueeql1xyXG4gICAgKi9cclxuICAgIGNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5faGlkZU1hc2tfKCk7XHJcbiAgICAgICAgdGhpcy5fZG9DbG9zZUFuaW1hdGlvbl8oKTtcclxuICAgICAgICB0aGlzLl9kb0Nsb3NlSGlkZV8oKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aYvuekuumBrue9qVxyXG4gICAgX3Nob3dNYXNrXygpIHtcclxuICAgICAgICB0aGlzLl9ib3R0b21MYXlvdXRfLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fYm90dG9tTGF5b3V0Xy5ydW5BY3Rpb24oY2MuZmFkZVRvKHRoaXMuX21hc2tEdXJhdGlvbl8sIHRoaXMuX21hc2tPcGFjaXR5XykpO1xyXG4gICAgICAgIHRoaXMuX3RvcExheW91dF8uYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZqQ6JeP6YGu572pXHJcbiAgICBfaGlkZU1hc2tfKCkge1xyXG4gICAgICAgIHRoaXMuX2JvdHRvbUxheW91dF8uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9ib3R0b21MYXlvdXRfLnJ1bkFjdGlvbihjYy5mYWRlVG8odGhpcy5fbWFza0R1cmF0aW9uXywgMCkpO1xyXG4gICAgICAgIHRoaXMuX3RvcExheW91dF8uYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aYvuekuuWKqOeUu1xyXG4gICAgX2RvU2hvd0FuaW1hdGlvbl8oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvbkRpYWxvZ09wZW5lZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIm9uRGlhbG9nT3BlbmVkXCIpO1xyXG4gICAgICAgICAgICBzZWxmLl90b3BMYXlvdXRfLnJlbW92ZUNvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKTtcclxuICAgICAgICAgICAgc2VsZi5fb3BlbmVkQ2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNhdmVTY2FsZSA9IHRoaXMubm9kZS5zY2FsZTtcclxuXHJcblx0XHR0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuXHRcdHRoaXMubm9kZS5zY2FsZSA9IHNhdmVTY2FsZSAqIDAuODtcclxuXHRcdHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcclxuXHRcdHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKHRoaXMuX21hc2tEdXJhdGlvbl8gKyAwLjEpKVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8odGhpcy5fbWFza0R1cmF0aW9uXyArIDAuMSwgc2F2ZVNjYWxlKS5lYXNpbmcoY2MuZWFzZUJhY2tJbk91dCgpKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMob25EaWFsb2dPcGVuZWQpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl63liqjnlLtcclxuICAgIF9kb0Nsb3NlQW5pbWF0aW9uXygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9uRGlhbG9nQ2xvc2VkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwiY2xvc2VkQ2FsbGJhY2tcIik7XHJcbiAgICAgICAgICAgIHNlbGYuX2Nsb3NlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvbkRpYWxvZ1dpbGxDbG9zZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIm9uRGlhbG9nV2lsbENsb3NlXCIpO1xyXG4gICAgICAgICAgICBzZWxmLl93aWxsQ2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2F2ZVNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xyXG5cclxuXHRcdHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG5cdFx0dGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuXHRcdFx0Y2MuY2FsbEZ1bmMob25EaWFsb2dXaWxsQ2xvc2UpLFxyXG5cdFx0XHRjYy5zcGF3bihcclxuXHRcdFx0XHRjYy5mYWRlT3V0KHRoaXMuX21hc2tEdXJhdGlvbl8pLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyh0aGlzLl9tYXNrRHVyYXRpb25fLCBzYXZlU2NhbGUqMC44KS5lYXNpbmcoY2MuZWFzZUJhY2tJbigpKSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKG9uRGlhbG9nQ2xvc2VkKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+BXHJcbiAgICBfZG9DbG9zZUhpZGVfKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKHRoaXMuX21hc2tEdXJhdGlvbl8gKyAwLjEpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOaJk+W8gOWujOaIkOWbnuiwg1xyXG4gICAgKi9cclxuICAgIF9vcGVuZWRDYWxsYmFjaygpe1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIkRpYWxvZ3Mgb3BlbmVkQ2FsbGJhY2tcIilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOWFs+mXreWujOaIkOWbnuiwg1xyXG4gICAgKi9cclxuICAgX2Nsb3NlZENhbGxiYWNrKCl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiRGlhbG9ncyBjbG9zZWRDYWxsYmFja1wiKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5bCG6KaB5YWz6Zet5Zue6LCDXHJcbiAgICAqL1xyXG4gICAgX3dpbGxDbG9zZUNhbGxiYWNrKCl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiRGlhbG9ncyB3aWxsQ2xvc2VDYWxsYmFja1wiKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==