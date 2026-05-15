
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
        _this._coverTouchId = null;
        _this._sacrificeEnabled = false;
        _this._coverButtonVisible = false;
        _this._coverButtonMode = "attach";
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
        this._initCoverButton();
        yyp.eventCenter.on("charge-cannon-progress", this._onChargeProgress, this);
        yyp.eventCenter.on("charge-cannon-cooldown", this._onChargeCooldown, this);
        yyp.eventCenter.on("charge-cannon-ready", this._onChargeReady, this);
        yyp.eventCenter.on("charge-cannon-clear", this._onChargeClear, this);
        yyp.eventCenter.on("skill-button-mode", this._onSkillButtonMode, this);
        yyp.eventCenter.on("sacrifice-button-visible", this._onSacrificeButtonVisible, this);
        yyp.eventCenter.on("cover-button-state", this._onCoverButtonState, this);
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
        yyp.eventCenter.off("cover-button-state", this._onCoverButtonState, this);
    };
    JoyStick.prototype._onTouchStart = function (event) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var touchId = event.getID();
        var controlType = this._getControlType(pos);
        if (controlType == "skill" && this._skillTouchId == null) {
            this._skillTouchId = touchId;
            if (this._skillMode == "oil") {
                yyp.eventCenter.emit("oil-shell-trigger", { pressed: true });
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
        if (controlType == "cover" && this._coverButtonVisible && this._coverTouchId == null) {
            this._coverTouchId = touchId;
            this._setCoverButtonPressed(true);
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
            if (this._skillMode == "oil") {
                yyp.eventCenter.emit("oil-shell-trigger", { pressed: false, release: true });
            }
            else if (this._skillMode == "charge") {
                yyp.eventCenter.emit("charge-cannon-release", {});
            }
        }
        else if (touchId == this._sacrificeTouchId) {
            this._sacrificeTouchId = null;
            this._setSacrificeButtonPressed(false);
            yyp.eventCenter.emit("trigger-sacrifice", {});
        }
        else if (touchId == this._coverTouchId) {
            this._coverTouchId = null;
            this._setCoverButtonPressed(false);
            yyp.eventCenter.emit("trigger-cover-action", {});
        }
    };
    JoyStick.prototype.update = function (dt) {
        var moveRatio = this._limitStickRange(this._fire._sprBg, this._fire._sprJoystick, this._moveTouchPos, this._moveDir);
        if (moveRatio > 0) {
            yyp.eventCenter.emit("joy-stick", { dir: this._moveDir, ratio: moveRatio });
        }
        var shootRatio = this._limitStickRange(this._fire._sprBg02, this._fire._sprJoystick02, this._shootTouchPos, this._shootDir);
        if (this._shootTouchId != null && shootRatio > 0 && this._shootDir.magSqr() > 0) {
            yyp.eventCenter.emit("joy-stick-shoot", { dir: this._shootDir, ratio: shootRatio });
        }
    };
    JoyStick.prototype.onDisable = function () {
        this._moveTouchId = null;
        this._shootTouchId = null;
        this._skillTouchId = null;
        this._sacrificeTouchId = null;
        this._coverTouchId = null;
        this._resetMoveStick();
        this._resetShootStick();
        this._refreshChargeProgress(this._chargeProgressValue, this._chargeProgressColor);
        this._setSacrificeButtonPressed(false);
        this._setCoverButtonPressed(false);
        if (this._skillMode == "oil") {
            yyp.eventCenter.emit("oil-shell-trigger", { pressed: false, cancelled: true });
        }
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
        if (this._coverButtonVisible && this._fire._fenli_xifu && this._fire._fenli_xifu.active) {
            var coverDistance = pos.sub(this._fire._fenli_xifu.position).mag();
            if (coverDistance <= this._fire._fenli_xifu.width / 2) {
                return "cover";
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
        var nextMode = mode == "oil" ? "oil" : "charge";
        var prevMode = this._skillMode;
        this._skillMode = nextMode;
        if (prevMode != this._skillMode) {
            this._skillTouchId = null;
        }
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
    JoyStick.prototype._initCoverButton = function () {
        if (!this._fire._fenli_xifu) {
            return;
        }
        this._fire._fenli_xifu.opacity = 255;
        this._fire._fenli_xifu.scale = 1;
        this._setCoverButtonMode("attach");
        this._setCoverButtonVisible(false);
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
    JoyStick.prototype._setCoverButtonPressed = function (pressed) {
        if (!this._fire._fenli_xifu) {
            return;
        }
        this._fire._fenli_xifu.scale = pressed ? 0.94 : 1;
        this._fire._fenli_xifu.opacity = pressed ? 215 : 255;
    };
    JoyStick.prototype._setCoverButtonMode = function (mode) {
        this._coverButtonMode = mode == "detach" ? "detach" : "attach";
        if (this._fire._btnLabel && this._fire._btnLabel.$Label) {
            this._fire._btnLabel.$Label.string = this._coverButtonMode == "detach" ? "分离" : "吸附";
        }
    };
    JoyStick.prototype._setCoverButtonVisible = function (visible) {
        this._coverButtonVisible = !!visible;
        if (!this._fire._fenli_xifu) {
            return;
        }
        this._fire._fenli_xifu.active = this._coverButtonVisible;
        if (!this._coverButtonVisible) {
            this._coverTouchId = null;
            this._setCoverButtonPressed(false);
        }
    };
    JoyStick.prototype._onSacrificeButtonVisible = function (event) {
        this._setSacrificeButtonVisible(event && event.visible === true);
    };
    JoyStick.prototype._onCoverButtonState = function (event) {
        this._setCoverButtonMode(event && event.mode ? event.mode : "attach");
        this._setCoverButtonVisible(event && event.visible === true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBbWZDO1FBamZHLGNBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFTLFlBQVk7UUFDNUMsZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUN4QyxtQkFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksVUFBVTtRQUMxQyxvQkFBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUcsVUFBVTtRQUMxQyxXQUFLLEdBQUcsSUFBSSxDQUFDLENBQW1CLFVBQVU7UUFDMUMsa0JBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsdUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLG1CQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix5QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQzVCLGdCQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLDBCQUFvQixHQUFHLENBQUMsQ0FBQztRQUN6QiwwQkFBb0IsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQWtldEQsQ0FBQztJQWhlRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFJLFdBQVcsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssRUFBRTtnQkFDMUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNoRTtpQkFDRztnQkFDQSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsT0FBTztTQUNWO1FBQ0QsSUFBSSxXQUFXLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxFQUFFO1lBQ3hGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7WUFDakMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE9BQU87U0FDVjtRQUNELElBQUksV0FBVyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDbEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE9BQU87U0FDVjtRQUVELElBQUksV0FBVyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUNwRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDVjtRQUNELElBQUksV0FBVyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtZQUN0RCxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BDO2FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsK0JBQVksR0FBWixVQUFhLEtBQUs7UUFDZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzlELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckM7YUFDSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQVksS0FBSztRQUNiLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNsRTthQUNJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUN2RDthQUNJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssRUFBRTtnQkFDMUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ2hGO2lCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3JEO1NBQ0o7YUFDSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakQ7YUFDSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFFRCx5QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNySCxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDZixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztTQUMxRTtRQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1SCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDN0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztTQUNsRjtJQUNMLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLEVBQUU7WUFDMUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELHlDQUFzQixHQUF0QjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDckQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztTQUNsQztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVELGtDQUFlLEdBQWYsVUFBZ0IsR0FBRztRQUNmLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN2RixJQUFJLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekUsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUN6RCxPQUFPLFdBQVcsQ0FBQzthQUN0QjtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3JGLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbkUsSUFBSSxhQUFhLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbkQsT0FBTyxPQUFPLENBQUM7YUFDbEI7U0FDSjtRQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzdDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckQsSUFBSSxhQUFhLElBQUksUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sT0FBTyxDQUFDO2FBQ2xCO1NBQ0o7UUFFRCxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdELElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEUsT0FBTyxZQUFZLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM1RCxDQUFDO0lBRUQsbUNBQWdCLEdBQWhCLFVBQWlCLEdBQUcsRUFBRSxPQUFPO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDL0M7UUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUgsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7U0FDbEY7SUFDTCxDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELG1DQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHO1FBQ2hELGFBQWE7UUFDYixJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFHLFVBQVU7UUFDakUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBeUIsWUFBWTtRQUNuRSxJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBYSxpQkFBaUI7UUFFeEUsdUJBQXVCO1FBQ3ZCLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRTtZQUNkLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsbUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDekIsVUFBVSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7UUFFdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMzQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN6QixZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUM7UUFDMUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxzQ0FBbUIsR0FBbkIsVUFBb0IsSUFBSTtRQUNwQixJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQztTQUM3RDtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7U0FDbkU7UUFDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCx1Q0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDbkQsT0FBTztTQUNWO1FBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzFELEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUUvQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxhQUFhLENBQUM7UUFDbkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN2QixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEQsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDcEQsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUM7UUFFOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsUUFBUSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDekIsUUFBUSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDM0QsUUFBUSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDdkQsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELG1DQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN6QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsNkNBQTBCLEdBQTFCLFVBQTJCLE9BQU87UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQ2xFLE9BQU87U0FDVjtRQUVELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ25DLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDN0IsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDM0IsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RGLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3BDLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3pDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3RixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtRQUVELElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUNoQixHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUIsVUFBMkIsT0FBTztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDM0IsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQUVELHlDQUFzQixHQUF0QixVQUF1QixPQUFPO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN6QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN6RCxDQUFDO0lBRUQsc0NBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDeEY7SUFDTCxDQUFDO0lBRUQseUNBQXNCLEdBQXRCLFVBQXVCLE9BQU87UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3pCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQsNENBQXlCLEdBQXpCLFVBQTBCLEtBQUs7UUFDM0IsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxzQ0FBbUIsR0FBbkIsVUFBb0IsS0FBSztRQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQseUNBQXNCLEdBQXRCLFVBQXVCLFFBQVEsRUFBRSxLQUFrQztRQUFsQyxzQkFBQSxFQUFBLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7UUFDL0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUU7WUFDdEUsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0MsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQUU7WUFDaEMsT0FBTztTQUNWO1FBRUQsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVsQixRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2QixRQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQscUNBQWtCLEdBQWxCLFVBQW1CLEtBQUs7UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDbkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDbkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFsZlEsUUFBUTtRQURwQixPQUFPO09BQ0ssUUFBUSxDQW1mcEI7SUFBRCxlQUFDO0NBbmZELEFBbWZDLENBbmY2Qiw2QkFBYSxHQW1mMUM7QUFuZlksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBjbGFzcyBKb3lTdGljayBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgX21vdmVEaXIgPSBjYy52MigwLCAxKTsgICAgICAgICAvL+enu+WKqOaRh+adhuaWueWQkSjlkJHkuIopXG4gICAgX3Nob290RGlyID0gY2MudjIoMSwgMCk7ICAgICAgICAvL+WwhOWHu+aRh+adhuaWueWQkVxuICAgIF9tb3ZlVG91Y2hQb3MgPSBjYy52MigwLCAwKTsgICAgLy/np7vliqjmkYfmnYbliJ3lp4vkvY3nva5cbiAgICBfc2hvb3RUb3VjaFBvcyA9IGNjLnYyKDAsIDApOyAgIC8v5bCE5Ye75pGH5p2G5Yid5aeL5L2N572uXG4gICAgX2ZyZWUgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAvL+iHqueUseenu+WKqOaRh+adhuS9jee9rlxuICAgIF9tb3ZlVG91Y2hJZCA9IG51bGw7XG4gICAgX3Nob290VG91Y2hJZCA9IG51bGw7XG4gICAgX3NraWxsVG91Y2hJZCA9IG51bGw7XG4gICAgX3NhY3JpZmljZVRvdWNoSWQgPSBudWxsO1xuICAgIF9jb3ZlclRvdWNoSWQgPSBudWxsO1xuICAgIF9zYWNyaWZpY2VFbmFibGVkID0gZmFsc2U7XG4gICAgX2NvdmVyQnV0dG9uVmlzaWJsZSA9IGZhbHNlO1xuICAgIF9jb3ZlckJ1dHRvbk1vZGUgPSBcImF0dGFjaFwiO1xuICAgIF9za2lsbE1vZGUgPSBcImNoYXJnZVwiO1xuICAgIF9jaGFyZ2VQcm9ncmVzc1ZhbHVlID0gMDtcbiAgICBfY2hhcmdlUHJvZ3Jlc3NDb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaFBvcyA9IHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5faW5pdFNraWxsQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuX3NldFNraWxsQnV0dG9uTW9kZShcImNoYXJnZVwiKTtcbiAgICAgICAgdGhpcy5faW5pdFNhY3JpZmljZUJ1dHRvbigpO1xuICAgICAgICB0aGlzLl9pbml0Q292ZXJCdXR0b24oKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB0aGlzLl9vbkNoYXJnZUNvb2xkb3duLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB0aGlzLl9vbkNoYXJnZVJlYWR5LCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwic2tpbGwtYnV0dG9uLW1vZGVcIiwgdGhpcy5fb25Ta2lsbEJ1dHRvbk1vZGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIiwgdGhpcy5fb25TYWNyaWZpY2VCdXR0b25WaXNpYmxlLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY292ZXItYnV0dG9uLXN0YXRlXCIsIHRoaXMuX29uQ292ZXJCdXR0b25TdGF0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLXJlYWR5XCIsIHRoaXMuX29uQ2hhcmdlUmVhZHksIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNraWxsLWJ1dHRvbi1tb2RlXCIsIHRoaXMuX29uU2tpbGxCdXR0b25Nb2RlLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLCB0aGlzLl9vblNhY3JpZmljZUJ1dHRvblZpc2libGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY292ZXItYnV0dG9uLXN0YXRlXCIsIHRoaXMuX29uQ292ZXJCdXR0b25TdGF0ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX29uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGxldCBjb250cm9sVHlwZSA9IHRoaXMuX2dldENvbnRyb2xUeXBlKHBvcyk7XG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcInNraWxsXCIgJiYgdGhpcy5fc2tpbGxUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCIpIHtcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHsgcHJlc3NlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcmVzc1wiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2FjcmlmaWNlXCIgJiYgdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCAmJiB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJjb3ZlclwiICYmIHRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZSAmJiB0aGlzLl9jb3ZlclRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY292ZXJUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uUHJlc3NlZCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcIm1vdmVcIiAmJiB0aGlzLl9tb3ZlVG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJzaG9vdFwiICYmIHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21vdmVUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcbiAgICAgICAgaWYgKHRvdWNoSWQgPT0gdGhpcy5fbW92ZVRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3Nob290VG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hvb3RTdGljayhwb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoSWQgPSBldmVudC5nZXRJRCgpO1xuICAgICAgICBpZiAodG91Y2hJZCA9PSB0aGlzLl9tb3ZlVG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRNb3ZlU3RpY2soKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2Rpcjp0aGlzLl9tb3ZlRGlyLCByYXRpbzowfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zaG9vdFRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290VG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFNob290U3RpY2soKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2ZpcmU6dHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2tpbGxUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSA9PSBcIm9pbFwiKSB7XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJvaWwtc2hlbGwtdHJpZ2dlclwiLCB7IHByZXNzZWQ6IGZhbHNlLCByZWxlYXNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCIpIHtcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVsZWFzZVwiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zYWNyaWZpY2VUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJ0cmlnZ2VyLXNhY3JpZmljZVwiLCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9jb3ZlclRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJ0cmlnZ2VyLWNvdmVyLWFjdGlvblwiLCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGxldCBtb3ZlUmF0aW8gPSB0aGlzLl9saW1pdFN0aWNrUmFuZ2UodGhpcy5fZmlyZS5fc3ByQmcsIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLCB0aGlzLl9tb3ZlVG91Y2hQb3MsIHRoaXMuX21vdmVEaXIpO1xuICAgICAgICBpZiAobW92ZVJhdGlvID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOm1vdmVSYXRpb30pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaG9vdFJhdGlvID0gdGhpcy5fbGltaXRTdGlja1JhbmdlKHRoaXMuX2ZpcmUuX3NwckJnMDIsIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIsIHRoaXMuX3Nob290VG91Y2hQb3MsIHRoaXMuX3Nob290RGlyKTtcbiAgICAgICAgaWYgKHRoaXMuX3Nob290VG91Y2hJZCAhPSBudWxsICYmIHNob290UmF0aW8gPiAwICYmIHRoaXMuX3Nob290RGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2stc2hvb3RcIix7ZGlyOnRoaXMuX3Nob290RGlyLCByYXRpbzpzaG9vdFJhdGlvfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKXtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY292ZXJUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNb3ZlU3RpY2soKTtcbiAgICAgICAgdGhpcy5fcmVzZXRTaG9vdFN0aWNrKCk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyh0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlLCB0aGlzLl9jaGFyZ2VQcm9ncmVzc0NvbG9yKTtcbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uUHJlc3NlZChmYWxzZSk7XG4gICAgICAgIGlmICh0aGlzLl9za2lsbE1vZGUgPT0gXCJvaWxcIikge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJvaWwtc2hlbGwtdHJpZ2dlclwiLCB7IHByZXNzZWQ6IGZhbHNlLCBjYW5jZWxsZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOjB9KTtcbiAgICB9XG5cbiAgICBfZ2V0Q3VycmVudFNraWxsQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCIgJiYgdGhpcy5fZmlyZS5fc2tpbGxvaWxCdG4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maXJlLl9za2lsbG9pbEJ0bjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgfVxuXG4gICAgX2dldENvbnRyb2xUeXBlKHBvcykge1xuICAgICAgICBpZiAodGhpcy5fc2FjcmlmaWNlRW5hYmxlZCAmJiB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4gJiYgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLmFjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IHNhY3JpZmljZURpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4ucG9zaXRpb24pLm1hZygpO1xuICAgICAgICAgICAgaWYgKHNhY3JpZmljZURpc3RhbmNlIDw9IHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzYWNyaWZpY2VcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY292ZXJCdXR0b25WaXNpYmxlICYmIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUgJiYgdGhpcy5fZmlyZS5fZmVubGlfeGlmdS5hY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBjb3ZlckRpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9mZW5saV94aWZ1LnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgICAgIGlmIChjb3ZlckRpc3RhbmNlIDw9IHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUud2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY292ZXJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgc2tpbGxCdG4gPSB0aGlzLl9nZXRDdXJyZW50U2tpbGxCdXR0b24oKTtcbiAgICAgICAgaWYgKHNraWxsQnRuICYmIHNraWxsQnRuLmFjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IHNraWxsRGlzdGFuY2UgPSBwb3Muc3ViKHNraWxsQnRuLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgICAgIGlmIChza2lsbERpc3RhbmNlIDw9IHNraWxsQnRuLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInNraWxsXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbW92ZURpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zcHJCZy5wb3NpdGlvbikubWFnKCk7XG4gICAgICAgIGxldCBzaG9vdERpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zcHJCZzAyLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIG1vdmVEaXN0YW5jZSA8PSBzaG9vdERpc3RhbmNlID8gXCJtb3ZlXCIgOiBcInNob290XCI7XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1vdmVTdGljayhwb3MsIGlzU3RhcnQpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2suc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgdGhpcy5fZnJlZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3ByQmcuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaFBvcyA9IHBvcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vdmVEaXIgPSBwb3Muc3ViKHRoaXMuX21vdmVUb3VjaFBvcyk7XG4gICAgICAgIGlmICh0aGlzLl9tb3ZlRGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZURpciA9IHRoaXMuX21vdmVEaXIubm9ybWFsaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcHJlc3NTaG9vdEJ1dHRvbihwb3MpIHtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hvb3RTdGljayhwb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24odGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZVNob290U3RpY2socG9zKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgdGhpcy5fc2hvb3REaXIgPSBwb3Muc3ViKHRoaXMuX3Nob290VG91Y2hQb3MpO1xuICAgICAgICBpZiAodGhpcy5fc2hvb3REaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdERpciA9IHRoaXMuX3Nob290RGlyLm5vcm1hbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNob290UmF0aW8gPSB0aGlzLl9saW1pdFN0aWNrUmFuZ2UodGhpcy5fZmlyZS5fc3ByQmcwMiwgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMiwgdGhpcy5fc2hvb3RUb3VjaFBvcywgdGhpcy5fc2hvb3REaXIpO1xuICAgICAgICBpZiAoc2hvb3RSYXRpbyA+IDApIHtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2Rpcjp0aGlzLl9zaG9vdERpciwgcmF0aW86c2hvb3RSYXRpb30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Jlc2V0TW92ZVN0aWNrKCkge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljay5zZXRQb3NpdGlvbih0aGlzLl9tb3ZlVG91Y2hQb3MpO1xuICAgIH1cblxuICAgIF9yZXNldFNob290U3RpY2soKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24odGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX2xpbWl0U3RpY2tSYW5nZShiZ05vZGUsIGpveXN0aWNrTm9kZSwgdG91Y2hQb3MsIGRpcikge1xuICAgICAgICAvLyDpmZDlrprmkYfmnYblnKjojIPlm7TlhoXnp7vliqhcbiAgICAgICAgbGV0IGxlbiA9IGpveXN0aWNrTm9kZS5wb3NpdGlvbi5zdWIodG91Y2hQb3MpLm1hZygpOyAgIC8vIOi/lOWbnuWQkemHj+eahOmVv+W6plxuICAgICAgICBsZXQgbWF4TGVuID0gYmdOb2RlLndpZHRoIC8gMjsgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5pyA5aSn5Y+v56e75Yqo6Led56a7XG4gICAgICAgIGxldCByYXRpbyA9IG1heExlbiA+IDAgPyBsZW4gLyBtYXhMZW4gOiAwOyAgICAgICAgICAgICAvLyDlvZPliY3kvY3nva7lkozmnIDlpKflj6/np7vliqjot53nprvmr5TnjodcblxuICAgICAgICAvLyDmr5TnjoflpKfkuo4xLOivtOaYjuW3sue7j+i2heWHuuacgOWkp+WPr+enu+WKqOi3neemu+S6hlxuICAgICAgICBpZiAobGVuID4gbWF4TGVuKSB7XG4gICAgICAgICAgICBqb3lzdGlja05vZGUuc2V0UG9zaXRpb24odG91Y2hQb3MuYWRkKGRpci5tdWwobWF4TGVuKSkpO1xuICAgICAgICAgICAgcmF0aW8gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhdGlvO1xuICAgIH1cblxuICAgIF9pbml0U2tpbGxCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2tpbGxCdG4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiZ05vZGUgPSBuZXcgY2MuTm9kZShcIl9jaGFyZ2VQcm9ncmVzc0JnXCIpO1xuICAgICAgICBiZ05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIGJnTm9kZS56SW5kZXggPSA5O1xuICAgICAgICBsZXQgYmdHcmFwaGljcyA9IGJnTm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBsZXQgYmdSYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA4O1xuICAgICAgICBiZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig3MCwgNzAsIDcwLCAxODApO1xuICAgICAgICBiZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCBiZ1JhZGl1cyk7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcgPSBiZ05vZGU7XG5cbiAgICAgICAgbGV0IHByb2dyZXNzTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZVByb2dyZXNzXCIpO1xuICAgICAgICBwcm9ncmVzc05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIHByb2dyZXNzTm9kZS56SW5kZXggPSAxMDtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnNldENvbnRlbnRTaXplKHRoaXMuX2ZpcmUuX3NraWxsQnRuLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBwcm9ncmVzc05vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlW1wiJEdyYXBoaWNzXCJdID0gZ3JhcGhpY3M7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzID0gcHJvZ3Jlc3NOb2RlO1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XG4gICAgfVxuXG4gICAgX3NldFNraWxsQnV0dG9uTW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBuZXh0TW9kZSA9IG1vZGUgPT0gXCJvaWxcIiA/IFwib2lsXCIgOiBcImNoYXJnZVwiO1xuICAgICAgICBsZXQgcHJldk1vZGUgPSB0aGlzLl9za2lsbE1vZGU7XG4gICAgICAgIHRoaXMuX3NraWxsTW9kZSA9IG5leHRNb2RlO1xuICAgICAgICBpZiAocHJldk1vZGUgIT0gdGhpcy5fc2tpbGxNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9za2lsbEJ0bikge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc2tpbGxCdG4uYWN0aXZlID0gdGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9za2lsbG9pbEJ0bi5hY3RpdmUgPSB0aGlzLl9za2lsbE1vZGUgPT0gXCJvaWxcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3NCZykge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3NCZy5hY3RpdmUgPSB0aGlzLl9za2lsbE1vZGUgPT0gXCJjaGFyZ2VcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLmFjdGl2ZSA9IHRoaXMuX3NraWxsTW9kZSA9PSBcImNoYXJnZVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyh0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlLCB0aGlzLl9jaGFyZ2VQcm9ncmVzc0NvbG9yKTtcbiAgICB9XG5cbiAgICBfaW5pdFNhY3JpZmljZUJ1dHRvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9za2lsbEJ0biB8fCB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBidG4gPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VCdG5cIik7XG4gICAgICAgIGJ0bi5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGJ0bi56SW5kZXggPSB0aGlzLl9maXJlLl9za2lsbEJ0bi56SW5kZXggfHwgMDtcbiAgICAgICAgYnRuLnNldENvbnRlbnRTaXplKHRoaXMuX2ZpcmUuX3NraWxsQnRuLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAgICBidG4uc2V0UG9zaXRpb24odGhpcy5fZmlyZS5fc2tpbGxCdG4ucG9zaXRpb24uYWRkKGNjLnYzKDAsIDExOCwgMCkpKTtcbiAgICAgICAgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuID0gYnRuO1xuXG4gICAgICAgIGxldCBvdXRlciA9IGJ0bi5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBidG5bXCIkR3JhcGhpY3NcIl0gPSBvdXRlcjtcblxuICAgICAgICBsZXQgaW5uZXIgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VJbm5lclwiKTtcbiAgICAgICAgaW5uZXIucGFyZW50ID0gYnRuO1xuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGlubmVyW1wiJEdyYXBoaWNzXCJdID0gaW5uZXJHcmFwaGljcztcbiAgICAgICAgYnRuW1wiJElubmVyXCJdID0gaW5uZXI7XG5cbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZUxhYmVsXCIpO1xuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYnRuO1xuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoYnRuLndpZHRoIC0gMTIsIGJ0bi5oZWlnaHQgLSAxMik7XG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuelrVwiO1xuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDM0O1xuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMzg7XG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNDUsIDIzMiwgMjU1KTtcbiAgICAgICAgYnRuW1wiJExhYmVsTm9kZVwiXSA9IGxhYmVsTm9kZTtcblxuICAgICAgICBsZXQgdGlwTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZVRpcFwiKTtcbiAgICAgICAgdGlwTm9kZS5wYXJlbnQgPSBidG47XG4gICAgICAgIHRpcE5vZGUuc2V0UG9zaXRpb24oMCwgLTU4KTtcbiAgICAgICAgdGlwTm9kZS5zZXRDb250ZW50U2l6ZSgxMjAsIDI4KTtcbiAgICAgICAgbGV0IHRpcExhYmVsID0gdGlwTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aXBMYWJlbC5zdHJpbmcgPSBcIueMruelrVwiO1xuICAgICAgICB0aXBMYWJlbC5mb250U2l6ZSA9IDE4O1xuICAgICAgICB0aXBMYWJlbC5saW5lSGVpZ2h0ID0gMjI7XG4gICAgICAgIHRpcExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIHRpcExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgdGlwTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMTg0LCAxNjAsIDIzNSk7XG5cbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblZpc2libGUoZmFsc2UpO1xuICAgIH1cblxuICAgIF9pbml0Q292ZXJCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fZmVubGlfeGlmdSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmlyZS5fZmVubGlfeGlmdS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1LnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25Nb2RlKFwiYXR0YWNoXCIpO1xuICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvblZpc2libGUoZmFsc2UpO1xuICAgIH1cblxuICAgIF9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKHByZXNzZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4gfHwgIXRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi4kR3JhcGhpY3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBidG4gPSB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG47XG4gICAgICAgIGxldCBncmFwaGljcyA9IGJ0bi4kR3JhcGhpY3M7XG4gICAgICAgIGxldCByYWRpdXMgPSBidG4ud2lkdGggLyAyO1xuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBwcmVzc2VkID8gY2MuY29sb3IoMTM1LCAyMCwgMzUsIDI0NSkgOiBjYy5jb2xvcig5NSwgMjIsIDMwLCAyMzApO1xuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA2O1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IHByZXNzZWQgPyBjYy5jb2xvcigyNTUsIDE5MCwgMTc1LCAyNTUpIDogY2MuY29sb3IoMjU1LCAxMjYsIDEwOCwgMjU1KTtcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDMpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcblxuICAgICAgICBpZiAoYnRuLiRJbm5lciAmJiBidG4uJElubmVyLiRHcmFwaGljcykge1xuICAgICAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBidG4uJElubmVyLiRHcmFwaGljcztcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbENvbG9yID0gcHJlc3NlZCA/IGNjLmNvbG9yKDI1NSwgMTA2LCA5MiwgMjU1KSA6IGNjLmNvbG9yKDIyMCwgNzIsIDY2LCAyNDUpO1xuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzIC0gMTMpO1xuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnRuLiRMYWJlbE5vZGUpIHtcbiAgICAgICAgICAgIGJ0bi4kTGFiZWxOb2RlLnNjYWxlID0gcHJlc3NlZCA/IDAuOTQgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGJ0bi5zY2FsZSA9IHByZXNzZWQgPyAwLjk2IDogMTtcbiAgICB9XG5cbiAgICBfc2V0U2FjcmlmaWNlQnV0dG9uVmlzaWJsZSh2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuX3NhY3JpZmljZUVuYWJsZWQgPSAhIXZpc2libGU7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4uYWN0aXZlID0gdGhpcy5fc2FjcmlmaWNlRW5hYmxlZDtcbiAgICAgICAgaWYgKCF0aGlzLl9zYWNyaWZpY2VFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3NldENvdmVyQnV0dG9uUHJlc3NlZChwcmVzc2VkKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fZmVubGlfeGlmdSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUuc2NhbGUgPSBwcmVzc2VkID8gMC45NCA6IDE7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUub3BhY2l0eSA9IHByZXNzZWQgPyAyMTUgOiAyNTU7XG4gICAgfVxuXG4gICAgX3NldENvdmVyQnV0dG9uTW9kZShtb2RlKSB7XG4gICAgICAgIHRoaXMuX2NvdmVyQnV0dG9uTW9kZSA9IG1vZGUgPT0gXCJkZXRhY2hcIiA/IFwiZGV0YWNoXCIgOiBcImF0dGFjaFwiO1xuICAgICAgICBpZiAodGhpcy5fZmlyZS5fYnRuTGFiZWwgJiYgdGhpcy5fZmlyZS5fYnRuTGFiZWwuJExhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9idG5MYWJlbC4kTGFiZWwuc3RyaW5nID0gdGhpcy5fY292ZXJCdXR0b25Nb2RlID09IFwiZGV0YWNoXCIgPyBcIuWIhuemu1wiIDogXCLlkLjpmYRcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zZXRDb3ZlckJ1dHRvblZpc2libGUodmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9jb3ZlckJ1dHRvblZpc2libGUgPSAhIXZpc2libGU7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fZmVubGlfeGlmdSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmlyZS5fZmVubGlfeGlmdS5hY3RpdmUgPSB0aGlzLl9jb3ZlckJ1dHRvblZpc2libGU7XG4gICAgICAgIGlmICghdGhpcy5fY292ZXJCdXR0b25WaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb3ZlclRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9vblNhY3JpZmljZUJ1dHRvblZpc2libGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uVmlzaWJsZShldmVudCAmJiBldmVudC52aXNpYmxlID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBfb25Db3ZlckJ1dHRvblN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uTW9kZShldmVudCAmJiBldmVudC5tb2RlID8gZXZlbnQubW9kZSA6IFwiYXR0YWNoXCIpO1xuICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvblZpc2libGUoZXZlbnQgJiYgZXZlbnQudmlzaWJsZSA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhwcm9ncmVzcywgY29sb3IgPSBjYy5jb2xvcigyNTUsIDkwLCA1NSwgMjU1KSkge1xuICAgICAgICB0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3MgfHwgMDtcbiAgICAgICAgdGhpcy5fY2hhcmdlUHJvZ3Jlc3NDb2xvciA9IGNvbG9yO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzIHx8ICF0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy4kR3JhcGhpY3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlICE9IFwiY2hhcmdlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLiRHcmFwaGljcy5jbGVhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuJEdyYXBoaWNzO1xuICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5fZmlyZS5fc2tpbGxCdG4ud2lkdGggLyAyIC0gNjtcbiAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgZ3JhcGhpY3MuYXJjKDAsIDAsIHJhZGl1cywgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBNYXRoLlBJICogMiAqIHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUsIGZhbHNlKTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG5cbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIyMCwgMjAwLCAxODApO1xuICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzLCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogdGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgZmFsc2UpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBfb25Ta2lsbEJ1dHRvbk1vZGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fc2V0U2tpbGxCdXR0b25Nb2RlKGV2ZW50ICYmIGV2ZW50Lm1vZGUgPyBldmVudC5tb2RlIDogXCJjaGFyZ2VcIik7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlUHJvZ3Jlc3MoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKGV2ZW50LnByb2dyZXNzIHx8IDAsIGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VDb29sZG93bihldmVudCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoZXZlbnQucHJvZ3Jlc3MgfHwgMCwgY2MuY29sb3IoMTIwLCAxNjAsIDI1NSwgMjIwKSk7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygxLCBjYy5jb2xvcigyNTUsIDQwLCAyNSwgMjU1KSk7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcbiAgICB9XG59XG4iXX0=