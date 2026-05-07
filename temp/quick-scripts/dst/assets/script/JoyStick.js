
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/JoyStick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bc875ktMFVGNbtVpXco3gMo', 'JoyStick');
// script/JoyStick.ts

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
exports.JoyStick = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JoyStick = /** @class */ (function (_super) {
    __extends(JoyStick, _super);
    function JoyStick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._moveDir = cc.v2(0, 1); //移动摇杆方向(向上)
        _this._shootDir = cc.v2(1, 0); //射击摇杆方向
        _this._moveTouchPos = cc.v2(0, 0); //移动摇杆初始位置
        _this._shootTouchPos = cc.v2(0, 0); //射击摇杆初始位置
        _this._free = true; //自由移动摇杆位置
        _this._moveTouchId = null;
        _this._shootTouchId = null;
        _this._skillTouchId = null;
        _this._sacrificeTouchId = null;
        _this._sacrificeEnabled = false;
        _this._skillMode = "charge";
        _this._chargeProgressValue = 0;
        _this._chargeProgressColor = cc.color(255, 90, 55, 255);
        return _this;
    }
    JoyStick.prototype.onLoad = function () {
        this._moveTouchPos = this._fire._sprBg.position.clone();
        this._shootTouchPos = this._fire._sprBg02.position.clone();
        this._initSkillButton();
        this._setSkillButtonMode("charge");
        this._initSacrificeButton();
        yyp.eventCenter.on("charge-cannon-progress", this._onChargeProgress, this);
        yyp.eventCenter.on("charge-cannon-cooldown", this._onChargeCooldown, this);
        yyp.eventCenter.on("charge-cannon-ready", this._onChargeReady, this);
        yyp.eventCenter.on("charge-cannon-clear", this._onChargeClear, this);
        yyp.eventCenter.on("skill-button-mode", this._onSkillButtonMode, this);
        yyp.eventCenter.on("sacrifice-button-visible", this._onSacrificeButtonVisible, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
    };
    JoyStick.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
        yyp.eventCenter.off("charge-cannon-progress", this._onChargeProgress, this);
        yyp.eventCenter.off("charge-cannon-cooldown", this._onChargeCooldown, this);
        yyp.eventCenter.off("charge-cannon-ready", this._onChargeReady, this);
        yyp.eventCenter.off("charge-cannon-clear", this._onChargeClear, this);
        yyp.eventCenter.off("skill-button-mode", this._onSkillButtonMode, this);
        yyp.eventCenter.off("sacrifice-button-visible", this._onSacrificeButtonVisible, this);
    };
    JoyStick.prototype._onTouchStart = function (event) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var touchId = event.getID();
        var controlType = this._getControlType(pos);
        if (controlType == "skill" && this._skillTouchId == null) {
            this._skillTouchId = touchId;
            if (this._skillMode == "oil") {
                yyp.eventCenter.emit("oil-shell-trigger", {});
            }
            else {
                this._refreshChargeProgress(0);
                yyp.eventCenter.emit("charge-cannon-press", {});
            }
            return;
        }
        if (controlType == "sacrifice" && this._sacrificeEnabled && this._sacrificeTouchId == null) {
            this._sacrificeTouchId = touchId;
            this._setSacrificeButtonPressed(true);
            return;
        }
        if (controlType == "move" && this._moveTouchId == null) {
            this._moveTouchId = touchId;
            this._updateMoveStick(pos, true);
            return;
        }
        if (controlType == "shoot" && this._shootTouchId == null) {
            this._shootTouchId = touchId;
            this._pressShootButton(pos);
            return;
        }
        if (this._moveTouchId == null) {
            this._moveTouchId = touchId;
            this._updateMoveStick(pos, true);
        }
        else if (this._shootTouchId == null) {
            this._shootTouchId = touchId;
            this._pressShootButton(pos);
        }
    };
    JoyStick.prototype._onTouchMove = function (event) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var touchId = event.getID();
        if (touchId == this._moveTouchId) {
            this._updateMoveStick(pos, false);
        }
        else if (touchId == this._shootTouchId) {
            this._updateShootStick(pos);
        }
    };
    JoyStick.prototype._onTouchEnd = function (event) {
        var touchId = event.getID();
        if (touchId == this._moveTouchId) {
            this._moveTouchId = null;
            this._resetMoveStick();
            yyp.eventCenter.emit("joy-stick", { dir: this._moveDir, ratio: 0 });
        }
        else if (touchId == this._shootTouchId) {
            this._shootTouchId = null;
            this._resetShootStick();
            yyp.eventCenter.emit("joy-stick-shoot", { fire: true });
        }
        else if (touchId == this._skillTouchId) {
            this._skillTouchId = null;
            if (this._skillMode == "charge") {
                yyp.eventCenter.emit("charge-cannon-release", {});
            }
        }
        else if (touchId == this._sacrificeTouchId) {
            this._sacrificeTouchId = null;
            this._setSacrificeButtonPressed(false);
            yyp.eventCenter.emit("trigger-sacrifice", {});
        }
    };
    JoyStick.prototype.update = function (dt) {
        var moveRatio = this._limitStickRange(this._fire._sprBg, this._fire._sprJoystick, this._moveTouchPos, this._moveDir);
        if (moveRatio > 0) {
            yyp.eventCenter.emit("joy-stick", { dir: this._moveDir, ratio: moveRatio });
        }
    };
    JoyStick.prototype.onDisable = function () {
        this._moveTouchId = null;
        this._shootTouchId = null;
        this._skillTouchId = null;
        this._sacrificeTouchId = null;
        this._resetMoveStick();
        this._resetShootStick();
        this._refreshChargeProgress(this._chargeProgressValue, this._chargeProgressColor);
        this._setSacrificeButtonPressed(false);
        yyp.eventCenter.emit("joy-stick", { dir: this._moveDir, ratio: 0 });
    };
    JoyStick.prototype._getCurrentSkillButton = function () {
        if (this._skillMode == "oil" && this._fire._skilloilBtn) {
            return this._fire._skilloilBtn;
        }
        return this._fire._skillBtn;
    };
    JoyStick.prototype._getControlType = function (pos) {
        if (this._sacrificeEnabled && this._fire._sacrificeBtn && this._fire._sacrificeBtn.active) {
            var sacrificeDistance = pos.sub(this._fire._sacrificeBtn.position).mag();
            if (sacrificeDistance <= this._fire._sacrificeBtn.width / 2) {
                return "sacrifice";
            }
        }
        var skillBtn = this._getCurrentSkillButton();
        if (skillBtn && skillBtn.active) {
            var skillDistance = pos.sub(skillBtn.position).mag();
            if (skillDistance <= skillBtn.width / 2) {
                return "skill";
            }
        }
        var moveDistance = pos.sub(this._fire._sprBg.position).mag();
        var shootDistance = pos.sub(this._fire._sprBg02.position).mag();
        return moveDistance <= shootDistance ? "move" : "shoot";
    };
    JoyStick.prototype._updateMoveStick = function (pos, isStart) {
        this._fire._sprJoystick.setPosition(pos);
        if (isStart && this._free) {
            this._fire._sprBg.setPosition(pos);
            this._moveTouchPos = pos;
        }
        this._moveDir = pos.sub(this._moveTouchPos);
        if (this._moveDir.magSqr() > 0) {
            this._moveDir = this._moveDir.normalize();
        }
    };
    JoyStick.prototype._pressShootButton = function (pos) {
        if (pos) {
            this._updateShootStick(pos);
            return;
        }
        this._fire._sprJoystick02.setPosition(this._shootTouchPos);
    };
    JoyStick.prototype._updateShootStick = function (pos) {
        this._fire._sprJoystick02.setPosition(pos);
        this._shootDir = pos.sub(this._shootTouchPos);
        if (this._shootDir.magSqr() > 0) {
            this._shootDir = this._shootDir.normalize();
        }
        var shootRatio = this._limitStickRange(this._fire._sprBg02, this._fire._sprJoystick02, this._shootTouchPos, this._shootDir);
        if (shootRatio > 0) {
            yyp.eventCenter.emit("joy-stick-shoot", { dir: this._shootDir, ratio: shootRatio });
        }
    };
    JoyStick.prototype._resetMoveStick = function () {
        this._fire._sprJoystick.setPosition(this._moveTouchPos);
    };
    JoyStick.prototype._resetShootStick = function () {
        this._fire._sprJoystick02.setPosition(this._shootTouchPos);
    };
    JoyStick.prototype._limitStickRange = function (bgNode, joystickNode, touchPos, dir) {
        // 限定摇杆在范围内移动
        var len = joystickNode.position.sub(touchPos).mag(); // 返回向量的长度
        var maxLen = bgNode.width / 2; // 获取最大可移动距离
        var ratio = maxLen > 0 ? len / maxLen : 0; // 当前位置和最大可移动距离比率
        // 比率大于1,说明已经超出最大可移动距离了
        if (len > maxLen) {
            joystickNode.setPosition(touchPos.add(dir.mul(maxLen)));
            ratio = 1;
        }
        return ratio;
    };
    JoyStick.prototype._initSkillButton = function () {
        if (!this._fire._skillBtn) {
            return;
        }
        var bgNode = new cc.Node("_chargeProgressBg");
        bgNode.parent = this._fire._skillBtn;
        bgNode.zIndex = 9;
        var bgGraphics = bgNode.addComponent(cc.Graphics);
        var bgRadius = this._fire._skillBtn.width / 2 - 8;
        bgGraphics.lineWidth = 6;
        bgGraphics.strokeColor = cc.color(70, 70, 70, 180);
        bgGraphics.circle(0, 0, bgRadius);
        bgGraphics.stroke();
        this._fire._chargeProgressBg = bgNode;
        var progressNode = new cc.Node("_chargeProgress");
        progressNode.parent = this._fire._skillBtn;
        progressNode.zIndex = 10;
        progressNode.setContentSize(this._fire._skillBtn.getContentSize());
        var graphics = progressNode.addComponent(cc.Graphics);
        progressNode["$Graphics"] = graphics;
        this._fire._chargeProgress = progressNode;
        this._refreshChargeProgress(0);
    };
    JoyStick.prototype._setSkillButtonMode = function (mode) {
        this._skillMode = mode == "oil" ? "oil" : "charge";
        this._skillTouchId = null;
        if (this._fire._skillBtn) {
            this._fire._skillBtn.active = this._skillMode == "charge";
        }
        if (this._fire._skilloilBtn) {
            this._fire._skilloilBtn.active = this._skillMode == "oil";
        }
        if (this._fire._chargeProgressBg) {
            this._fire._chargeProgressBg.active = this._skillMode == "charge";
        }
        if (this._fire._chargeProgress) {
            this._fire._chargeProgress.active = this._skillMode == "charge";
        }
        this._refreshChargeProgress(this._chargeProgressValue, this._chargeProgressColor);
    };
    JoyStick.prototype._initSacrificeButton = function () {
        if (!this._fire._skillBtn || this._fire._sacrificeBtn) {
            return;
        }
        var btn = new cc.Node("_sacrificeBtn");
        btn.parent = this.node;
        btn.zIndex = this._fire._skillBtn.zIndex || 0;
        btn.setContentSize(this._fire._skillBtn.getContentSize());
        btn.setPosition(this._fire._skillBtn.position.add(cc.v3(0, 118, 0)));
        this._fire._sacrificeBtn = btn;
        var outer = btn.addComponent(cc.Graphics);
        btn["$Graphics"] = outer;
        var inner = new cc.Node("_sacrificeInner");
        inner.parent = btn;
        var innerGraphics = inner.addComponent(cc.Graphics);
        inner["$Graphics"] = innerGraphics;
        btn["$Inner"] = inner;
        var labelNode = new cc.Node("_sacrificeLabel");
        labelNode.parent = btn;
        labelNode.setContentSize(btn.width - 12, btn.height - 12);
        var label = labelNode.addComponent(cc.Label);
        label.string = "祭";
        label.fontSize = 34;
        label.lineHeight = 38;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        labelNode.color = cc.color(255, 245, 232, 255);
        btn["$LabelNode"] = labelNode;
        var tipNode = new cc.Node("_sacrificeTip");
        tipNode.parent = btn;
        tipNode.setPosition(0, -58);
        tipNode.setContentSize(120, 28);
        var tipLabel = tipNode.addComponent(cc.Label);
        tipLabel.string = "献祭";
        tipLabel.fontSize = 18;
        tipLabel.lineHeight = 22;
        tipLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        tipLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        tipNode.color = cc.color(255, 184, 160, 235);
        this._setSacrificeButtonPressed(false);
        this._setSacrificeButtonVisible(false);
    };
    JoyStick.prototype._setSacrificeButtonPressed = function (pressed) {
        if (!this._fire._sacrificeBtn || !this._fire._sacrificeBtn.$Graphics) {
            return;
        }
        var btn = this._fire._sacrificeBtn;
        var graphics = btn.$Graphics;
        var radius = btn.width / 2;
        graphics.clear();
        graphics.fillColor = pressed ? cc.color(135, 20, 35, 245) : cc.color(95, 22, 30, 230);
        graphics.circle(0, 0, radius);
        graphics.fill();
        graphics.lineWidth = 6;
        graphics.strokeColor = pressed ? cc.color(255, 190, 175, 255) : cc.color(255, 126, 108, 255);
        graphics.circle(0, 0, radius - 3);
        graphics.stroke();
        if (btn.$Inner && btn.$Inner.$Graphics) {
            var innerGraphics = btn.$Inner.$Graphics;
            innerGraphics.clear();
            innerGraphics.fillColor = pressed ? cc.color(255, 106, 92, 255) : cc.color(220, 72, 66, 245);
            innerGraphics.circle(0, 0, radius - 13);
            innerGraphics.fill();
        }
        if (btn.$LabelNode) {
            btn.$LabelNode.scale = pressed ? 0.94 : 1;
        }
        btn.scale = pressed ? 0.96 : 1;
    };
    JoyStick.prototype._setSacrificeButtonVisible = function (visible) {
        this._sacrificeEnabled = !!visible;
        if (!this._fire._sacrificeBtn) {
            return;
        }
        this._fire._sacrificeBtn.active = this._sacrificeEnabled;
        if (!this._sacrificeEnabled) {
            this._sacrificeTouchId = null;
            this._setSacrificeButtonPressed(false);
        }
    };
    JoyStick.prototype._onSacrificeButtonVisible = function (event) {
        this._setSacrificeButtonVisible(event && event.visible === true);
    };
    JoyStick.prototype._refreshChargeProgress = function (progress, color) {
        if (color === void 0) { color = cc.color(255, 90, 55, 255); }
        this._chargeProgressValue = progress || 0;
        this._chargeProgressColor = color;
        if (!this._fire._chargeProgress || !this._fire._chargeProgress.$Graphics) {
            return;
        }
        if (this._skillMode != "charge") {
            this._fire._chargeProgress.$Graphics.clear();
            return;
        }
        var graphics = this._fire._chargeProgress.$Graphics;
        var radius = this._fire._skillBtn.width / 2 - 6;
        graphics.clear();
        if (this._chargeProgressValue <= 0) {
            return;
        }
        graphics.lineWidth = 8;
        graphics.strokeColor = color;
        graphics.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * this._chargeProgressValue, false);
        graphics.stroke();
        graphics.lineWidth = 3;
        graphics.strokeColor = cc.color(255, 220, 200, 180);
        graphics.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * this._chargeProgressValue, false);
        graphics.stroke();
    };
    JoyStick.prototype._onSkillButtonMode = function (event) {
        this._setSkillButtonMode(event && event.mode ? event.mode : "charge");
    };
    JoyStick.prototype._onChargeProgress = function (event) {
        this._refreshChargeProgress(event.progress || 0, cc.color(255, 90, 55, 255));
    };
    JoyStick.prototype._onChargeCooldown = function (event) {
        this._refreshChargeProgress(event.progress || 0, cc.color(120, 160, 255, 220));
    };
    JoyStick.prototype._onChargeReady = function () {
        this._refreshChargeProgress(1, cc.color(255, 40, 25, 255));
    };
    JoyStick.prototype._onChargeClear = function () {
        this._refreshChargeProgress(0);
    };
    JoyStick = __decorate([
        ccclass
    ], JoyStick);
    return JoyStick;
}(BaseComponent_1.BaseComponent));
exports.JoyStick = JoyStick;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBaWFDO1FBL1pHLGNBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFTLFlBQVk7UUFDNUMsZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUN4QyxtQkFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksVUFBVTtRQUMxQyxvQkFBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUcsVUFBVTtRQUMxQyxXQUFLLEdBQUcsSUFBSSxDQUFDLENBQW1CLFVBQVU7UUFDMUMsa0JBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsdUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixnQkFBVSxHQUFHLFFBQVEsQ0FBQztRQUN0QiwwQkFBb0IsR0FBRyxDQUFDLENBQUM7UUFDekIsMEJBQW9CLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7SUFtWnRELENBQUM7SUFqWkcseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUss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RSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxvQ0FBaUIsR0FBakIsVUFBa0IsS0FBSztRQUNuQixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWhhUSxRQUFRO1FBRHBCLE9BQU87T0FDSyxRQUFRLENBaWFwQjtJQUFELGVBQUM7Q0FqYUQsQUFpYUMsQ0FqYTZCLDZCQUFhLEdBaWExQztBQWphWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIEpveVN0aWNrIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBfbW92ZURpciA9IGNjLnYyKDAsIDEpOyAgICAgICAgIC8v56e75Yqo5pGH5p2G5pa55ZCRKOWQkeS4iilcbiAgICBfc2hvb3REaXIgPSBjYy52MigxLCAwKTsgICAgICAgIC8v5bCE5Ye75pGH5p2G5pa55ZCRXG4gICAgX21vdmVUb3VjaFBvcyA9IGNjLnYyKDAsIDApOyAgICAvL+enu+WKqOaRh+adhuWIneWni+S9jee9rlxuICAgIF9zaG9vdFRvdWNoUG9zID0gY2MudjIoMCwgMCk7ICAgLy/lsITlh7vmkYfmnYbliJ3lp4vkvY3nva5cbiAgICBfZnJlZSA9IHRydWU7ICAgICAgICAgICAgICAgICAgIC8v6Ieq55Sx56e75Yqo5pGH5p2G5L2N572uXG4gICAgX21vdmVUb3VjaElkID0gbnVsbDtcbiAgICBfc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICBfc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICBfc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgX3NhY3JpZmljZUVuYWJsZWQgPSBmYWxzZTtcbiAgICBfc2tpbGxNb2RlID0gXCJjaGFyZ2VcIjtcbiAgICBfY2hhcmdlUHJvZ3Jlc3NWYWx1ZSA9IDA7XG4gICAgX2NoYXJnZVByb2dyZXNzQ29sb3IgPSBjYy5jb2xvcigyNTUsIDkwLCA1NSwgMjU1KTtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuX21vdmVUb3VjaFBvcyA9IHRoaXMuX2ZpcmUuX3NwckJnLnBvc2l0aW9uLmNsb25lKCk7XG4gICAgICAgIHRoaXMuX3Nob290VG91Y2hQb3MgPSB0aGlzLl9maXJlLl9zcHJCZzAyLnBvc2l0aW9uLmNsb25lKCk7XG4gICAgICAgIHRoaXMuX2luaXRTa2lsbEJ1dHRvbigpO1xuICAgICAgICB0aGlzLl9zZXRTa2lsbEJ1dHRvbk1vZGUoXCJjaGFyZ2VcIik7XG4gICAgICAgIHRoaXMuX2luaXRTYWNyaWZpY2VCdXR0b24oKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB0aGlzLl9vbkNoYXJnZUNvb2xkb3duLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB0aGlzLl9vbkNoYXJnZVJlYWR5LCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwic2tpbGwtYnV0dG9uLW1vZGVcIiwgdGhpcy5fb25Ta2lsbEJ1dHRvbk1vZGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIiwgdGhpcy5fb25TYWNyaWZpY2VCdXR0b25WaXNpYmxlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5fb25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLXByb2dyZXNzXCIsIHRoaXMuX29uQ2hhcmdlUHJvZ3Jlc3MsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB0aGlzLl9vbkNoYXJnZUNvb2xkb3duLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwgdGhpcy5fb25DaGFyZ2VSZWFkeSwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLWNsZWFyXCIsIHRoaXMuX29uQ2hhcmdlQ2xlYXIsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwic2tpbGwtYnV0dG9uLW1vZGVcIiwgdGhpcy5fb25Ta2lsbEJ1dHRvbk1vZGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIsIHRoaXMuX29uU2FjcmlmaWNlQnV0dG9uVmlzaWJsZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX29uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGxldCBjb250cm9sVHlwZSA9IHRoaXMuX2dldENvbnRyb2xUeXBlKHBvcyk7XG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcInNraWxsXCIgJiYgdGhpcy5fc2tpbGxUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCIpIHtcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcmVzc1wiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2FjcmlmaWNlXCIgJiYgdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCAmJiB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcIm1vdmVcIiAmJiB0aGlzLl9tb3ZlVG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJzaG9vdFwiICYmIHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21vdmVUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcbiAgICAgICAgaWYgKHRvdWNoSWQgPT0gdGhpcy5fbW92ZVRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3Nob290VG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hvb3RTdGljayhwb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoSWQgPSBldmVudC5nZXRJRCgpO1xuICAgICAgICBpZiAodG91Y2hJZCA9PSB0aGlzLl9tb3ZlVG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRNb3ZlU3RpY2soKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2Rpcjp0aGlzLl9tb3ZlRGlyLCByYXRpbzowfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zaG9vdFRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290VG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFNob290U3RpY2soKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2ZpcmU6dHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2tpbGxUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSA9PSBcImNoYXJnZVwiKSB7XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLXJlbGVhc2VcIiwge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwidHJpZ2dlci1zYWNyaWZpY2VcIiwge30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBsZXQgbW92ZVJhdGlvID0gdGhpcy5fbGltaXRTdGlja1JhbmdlKHRoaXMuX2ZpcmUuX3NwckJnLCB0aGlzLl9maXJlLl9zcHJKb3lzdGljaywgdGhpcy5fbW92ZVRvdWNoUG9zLCB0aGlzLl9tb3ZlRGlyKTtcbiAgICAgICAgaWYgKG1vdmVSYXRpbyA+IDApIHtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2Rpcjp0aGlzLl9tb3ZlRGlyLCByYXRpbzptb3ZlUmF0aW99KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpe1xuICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Nob290VG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNldE1vdmVTdGljaygpO1xuICAgICAgICB0aGlzLl9yZXNldFNob290U3RpY2soKTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUsIHRoaXMuX2NoYXJnZVByb2dyZXNzQ29sb3IpO1xuICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOjB9KTtcbiAgICB9XG5cbiAgICBfZ2V0Q3VycmVudFNraWxsQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCIgJiYgdGhpcy5fZmlyZS5fc2tpbGxvaWxCdG4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maXJlLl9za2lsbG9pbEJ0bjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgfVxuXG4gICAgX2dldENvbnRyb2xUeXBlKHBvcykge1xuICAgICAgICBpZiAodGhpcy5fc2FjcmlmaWNlRW5hYmxlZCAmJiB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4gJiYgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLmFjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IHNhY3JpZmljZURpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4ucG9zaXRpb24pLm1hZygpO1xuICAgICAgICAgICAgaWYgKHNhY3JpZmljZURpc3RhbmNlIDw9IHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzYWNyaWZpY2VcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgc2tpbGxCdG4gPSB0aGlzLl9nZXRDdXJyZW50U2tpbGxCdXR0b24oKTtcbiAgICAgICAgaWYgKHNraWxsQnRuICYmIHNraWxsQnRuLmFjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IHNraWxsRGlzdGFuY2UgPSBwb3Muc3ViKHNraWxsQnRuLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgICAgIGlmIChza2lsbERpc3RhbmNlIDw9IHNraWxsQnRuLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInNraWxsXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbW92ZURpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zcHJCZy5wb3NpdGlvbikubWFnKCk7XG4gICAgICAgIGxldCBzaG9vdERpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zcHJCZzAyLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIG1vdmVEaXN0YW5jZSA8PSBzaG9vdERpc3RhbmNlID8gXCJtb3ZlXCIgOiBcInNob290XCI7XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1vdmVTdGljayhwb3MsIGlzU3RhcnQpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2suc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgdGhpcy5fZnJlZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3ByQmcuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaFBvcyA9IHBvcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vdmVEaXIgPSBwb3Muc3ViKHRoaXMuX21vdmVUb3VjaFBvcyk7XG4gICAgICAgIGlmICh0aGlzLl9tb3ZlRGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZURpciA9IHRoaXMuX21vdmVEaXIubm9ybWFsaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcHJlc3NTaG9vdEJ1dHRvbihwb3MpIHtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hvb3RTdGljayhwb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24odGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZVNob290U3RpY2socG9zKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgdGhpcy5fc2hvb3REaXIgPSBwb3Muc3ViKHRoaXMuX3Nob290VG91Y2hQb3MpO1xuICAgICAgICBpZiAodGhpcy5fc2hvb3REaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdERpciA9IHRoaXMuX3Nob290RGlyLm5vcm1hbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNob290UmF0aW8gPSB0aGlzLl9saW1pdFN0aWNrUmFuZ2UodGhpcy5fZmlyZS5fc3ByQmcwMiwgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMiwgdGhpcy5fc2hvb3RUb3VjaFBvcywgdGhpcy5fc2hvb3REaXIpO1xuICAgICAgICBpZiAoc2hvb3RSYXRpbyA+IDApIHtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2Rpcjp0aGlzLl9zaG9vdERpciwgcmF0aW86c2hvb3RSYXRpb30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Jlc2V0TW92ZVN0aWNrKCkge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljay5zZXRQb3NpdGlvbih0aGlzLl9tb3ZlVG91Y2hQb3MpO1xuICAgIH1cblxuICAgIF9yZXNldFNob290U3RpY2soKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24odGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX2xpbWl0U3RpY2tSYW5nZShiZ05vZGUsIGpveXN0aWNrTm9kZSwgdG91Y2hQb3MsIGRpcikge1xuICAgICAgICAvLyDpmZDlrprmkYfmnYblnKjojIPlm7TlhoXnp7vliqhcbiAgICAgICAgbGV0IGxlbiA9IGpveXN0aWNrTm9kZS5wb3NpdGlvbi5zdWIodG91Y2hQb3MpLm1hZygpOyAgIC8vIOi/lOWbnuWQkemHj+eahOmVv+W6plxuICAgICAgICBsZXQgbWF4TGVuID0gYmdOb2RlLndpZHRoIC8gMjsgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5pyA5aSn5Y+v56e75Yqo6Led56a7XG4gICAgICAgIGxldCByYXRpbyA9IG1heExlbiA+IDAgPyBsZW4gLyBtYXhMZW4gOiAwOyAgICAgICAgICAgICAvLyDlvZPliY3kvY3nva7lkozmnIDlpKflj6/np7vliqjot53nprvmr5TnjodcblxuICAgICAgICAvLyDmr5TnjoflpKfkuo4xLOivtOaYjuW3sue7j+i2heWHuuacgOWkp+WPr+enu+WKqOi3neemu+S6hlxuICAgICAgICBpZiAobGVuID4gbWF4TGVuKSB7XG4gICAgICAgICAgICBqb3lzdGlja05vZGUuc2V0UG9zaXRpb24odG91Y2hQb3MuYWRkKGRpci5tdWwobWF4TGVuKSkpO1xuICAgICAgICAgICAgcmF0aW8gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhdGlvO1xuICAgIH1cblxuICAgIF9pbml0U2tpbGxCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2tpbGxCdG4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiZ05vZGUgPSBuZXcgY2MuTm9kZShcIl9jaGFyZ2VQcm9ncmVzc0JnXCIpO1xuICAgICAgICBiZ05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIGJnTm9kZS56SW5kZXggPSA5O1xuICAgICAgICBsZXQgYmdHcmFwaGljcyA9IGJnTm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBsZXQgYmdSYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA4O1xuICAgICAgICBiZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig3MCwgNzAsIDcwLCAxODApO1xuICAgICAgICBiZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCBiZ1JhZGl1cyk7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcgPSBiZ05vZGU7XG5cbiAgICAgICAgbGV0IHByb2dyZXNzTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZVByb2dyZXNzXCIpO1xuICAgICAgICBwcm9ncmVzc05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIHByb2dyZXNzTm9kZS56SW5kZXggPSAxMDtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnNldENvbnRlbnRTaXplKHRoaXMuX2ZpcmUuX3NraWxsQnRuLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBwcm9ncmVzc05vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlW1wiJEdyYXBoaWNzXCJdID0gZ3JhcGhpY3M7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzID0gcHJvZ3Jlc3NOb2RlO1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XG4gICAgfVxuXG4gICAgX3NldFNraWxsQnV0dG9uTW9kZShtb2RlKSB7XG4gICAgICAgIHRoaXMuX3NraWxsTW9kZSA9IG1vZGUgPT0gXCJvaWxcIiA/IFwib2lsXCIgOiBcImNoYXJnZVwiO1xuICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5fZmlyZS5fc2tpbGxCdG4pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NraWxsQnRuLmFjdGl2ZSA9IHRoaXMuX3NraWxsTW9kZSA9PSBcImNoYXJnZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9za2lsbG9pbEJ0bikge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc2tpbGxvaWxCdG4uYWN0aXZlID0gdGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcuYWN0aXZlID0gdGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy5hY3RpdmUgPSB0aGlzLl9za2lsbE1vZGUgPT0gXCJjaGFyZ2VcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3ModGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgdGhpcy5fY2hhcmdlUHJvZ3Jlc3NDb2xvcik7XG4gICAgfVxuXG4gICAgX2luaXRTYWNyaWZpY2VCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2tpbGxCdG4gfHwgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnRuID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlQnRuXCIpO1xuICAgICAgICBidG4ucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBidG4uekluZGV4ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG4uekluZGV4IHx8IDA7XG4gICAgICAgIGJ0bi5zZXRDb250ZW50U2l6ZSh0aGlzLl9maXJlLl9za2lsbEJ0bi5nZXRDb250ZW50U2l6ZSgpKTtcbiAgICAgICAgYnRuLnNldFBvc2l0aW9uKHRoaXMuX2ZpcmUuX3NraWxsQnRuLnBvc2l0aW9uLmFkZChjYy52MygwLCAxMTgsIDApKSk7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0biA9IGJ0bjtcblxuICAgICAgICBsZXQgb3V0ZXIgPSBidG4uYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgYnRuW1wiJEdyYXBoaWNzXCJdID0gb3V0ZXI7XG5cbiAgICAgICAgbGV0IGlubmVyID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlSW5uZXJcIik7XG4gICAgICAgIGlubmVyLnBhcmVudCA9IGJ0bjtcbiAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBpbm5lci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBpbm5lcltcIiRHcmFwaGljc1wiXSA9IGlubmVyR3JhcGhpY3M7XG4gICAgICAgIGJ0bltcIiRJbm5lclwiXSA9IGlubmVyO1xuXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VMYWJlbFwiKTtcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ0bjtcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKGJ0bi53aWR0aCAtIDEyLCBidG4uaGVpZ2h0IC0gMTIpO1xuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLnpa1cIjtcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDM4O1xuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQ1LCAyMzIsIDI1NSk7XG4gICAgICAgIGJ0bltcIiRMYWJlbE5vZGVcIl0gPSBsYWJlbE5vZGU7XG5cbiAgICAgICAgbGV0IHRpcE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VUaXBcIik7XG4gICAgICAgIHRpcE5vZGUucGFyZW50ID0gYnRuO1xuICAgICAgICB0aXBOb2RlLnNldFBvc2l0aW9uKDAsIC01OCk7XG4gICAgICAgIHRpcE5vZGUuc2V0Q29udGVudFNpemUoMTIwLCAyOCk7XG4gICAgICAgIGxldCB0aXBMYWJlbCA9IHRpcE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgdGlwTGFiZWwuc3RyaW5nID0gXCLnjK7npa1cIjtcbiAgICAgICAgdGlwTGFiZWwuZm9udFNpemUgPSAxODtcbiAgICAgICAgdGlwTGFiZWwubGluZUhlaWdodCA9IDIyO1xuICAgICAgICB0aXBMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICB0aXBMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XG4gICAgICAgIHRpcE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDE4NCwgMTYwLCAyMzUpO1xuXG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25WaXNpYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChwcmVzc2VkKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuIHx8ICF0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4uJEdyYXBoaWNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnRuID0gdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidG4uJEdyYXBoaWNzO1xuICAgICAgICBsZXQgcmFkaXVzID0gYnRuLndpZHRoIC8gMjtcbiAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gcHJlc3NlZCA/IGNjLmNvbG9yKDEzNSwgMjAsIDM1LCAyNDUpIDogY2MuY29sb3IoOTUsIDIyLCAzMCwgMjMwKTtcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBwcmVzc2VkID8gY2MuY29sb3IoMjU1LCAxOTAsIDE3NSwgMjU1KSA6IGNjLmNvbG9yKDI1NSwgMTI2LCAxMDgsIDI1NSk7XG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSAzKTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG5cbiAgICAgICAgaWYgKGJ0bi4kSW5uZXIgJiYgYnRuLiRJbm5lci4kR3JhcGhpY3MpIHtcbiAgICAgICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gYnRuLiRJbm5lci4kR3JhcGhpY3M7XG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGxDb2xvciA9IHByZXNzZWQgPyBjYy5jb2xvcigyNTUsIDEwNiwgOTIsIDI1NSkgOiBjYy5jb2xvcigyMjAsIDcyLCA2NiwgMjQ1KTtcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDEzKTtcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJ0bi4kTGFiZWxOb2RlKSB7XG4gICAgICAgICAgICBidG4uJExhYmVsTm9kZS5zY2FsZSA9IHByZXNzZWQgPyAwLjk0IDogMTtcbiAgICAgICAgfVxuICAgICAgICBidG4uc2NhbGUgPSBwcmVzc2VkID8gMC45NiA6IDE7XG4gICAgfVxuXG4gICAgX3NldFNhY3JpZmljZUJ1dHRvblZpc2libGUodmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9zYWNyaWZpY2VFbmFibGVkID0gISF2aXNpYmxlO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLmFjdGl2ZSA9IHRoaXMuX3NhY3JpZmljZUVuYWJsZWQ7XG4gICAgICAgIGlmICghdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9vblNhY3JpZmljZUJ1dHRvblZpc2libGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uVmlzaWJsZShldmVudCAmJiBldmVudC52aXNpYmxlID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBfcmVmcmVzaENoYXJnZVByb2dyZXNzKHByb2dyZXNzLCBjb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpKSB7XG4gICAgICAgIHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUgPSBwcm9ncmVzcyB8fCAwO1xuICAgICAgICB0aGlzLl9jaGFyZ2VQcm9ncmVzc0NvbG9yID0gY29sb3I7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MgfHwgIXRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLiRHcmFwaGljcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9za2lsbE1vZGUgIT0gXCJjaGFyZ2VcIikge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuJEdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy4kR3JhcGhpY3M7XG4gICAgICAgIGxldCByYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA2O1xuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA4O1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xuICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzLCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogdGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgZmFsc2UpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcblxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjIwLCAyMDAsIDE4MCk7XG4gICAgICAgIGdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiB0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlLCBmYWxzZSk7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgIH1cblxuICAgIF9vblNraWxsQnV0dG9uTW9kZShldmVudCkge1xuICAgICAgICB0aGlzLl9zZXRTa2lsbEJ1dHRvbk1vZGUoZXZlbnQgJiYgZXZlbnQubW9kZSA/IGV2ZW50Lm1vZGUgOiBcImNoYXJnZVwiKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VQcm9ncmVzcyhldmVudCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoZXZlbnQucHJvZ3Jlc3MgfHwgMCwgY2MuY29sb3IoMjU1LCA5MCwgNTUsIDI1NSkpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZUNvb2xkb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhldmVudC5wcm9ncmVzcyB8fCAwLCBjYy5jb2xvcigxMjAsIDE2MCwgMjU1LCAyMjApKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VSZWFkeSgpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDEsIGNjLmNvbG9yKDI1NSwgNDAsIDI1LCAyNTUpKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VDbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgIH1cbn1cbiJdfQ==