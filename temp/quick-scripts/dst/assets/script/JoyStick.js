
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
        _this._skillTouchPos = cc.v2(0, 0); //焦油按钮拖拽初始位置
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
        _this._oilAimDir = cc.v2(1, 0);
        _this._chargeProgressValue = 0;
        _this._chargeProgressColor = cc.color(255, 90, 55, 255);
        return _this;
    }
    JoyStick.prototype.onLoad = function () {
        this._moveTouchPos = this._fire._sprBg.position.clone();
        this._shootTouchPos = this._fire._sprBg02.position.clone();
        var oilBtn = this._fire._skilloilBtn || this._fire._skillBtn;
        this._skillTouchPos = oilBtn ? oilBtn.position.clone() : cc.v2(0, 0);
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
            if (this._skillMode != "charge") {
                yyp.eventCenter.emit("oil-shell-trigger", { pressed: true });
                this._updateOilSkillDrag(pos, true);
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
        else if (touchId == this._skillTouchId && this._skillMode != "charge") {
            this._updateOilSkillDrag(pos, false);
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
            this._resetSkillButtonPosition();
            if (this._skillMode != "charge") {
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
        this._resetSkillButtonPosition();
        this._refreshChargeProgress(this._chargeProgressValue, this._chargeProgressColor);
        this._setSacrificeButtonPressed(false);
        this._setCoverButtonPressed(false);
        if (this._skillMode != "charge") {
            yyp.eventCenter.emit("oil-shell-trigger", { pressed: false, cancelled: true });
        }
        yyp.eventCenter.emit("joy-stick", { dir: this._moveDir, ratio: 0 });
    };
    JoyStick.prototype._getCurrentSkillButton = function () {
        if (this._skillMode != "charge" && this._fire._skilloilBtn) {
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
    JoyStick.prototype._resetSkillButtonPosition = function () {
        var skillBtn = this._getCurrentSkillButton();
        if (!skillBtn) {
            return;
        }
        skillBtn.setPosition(this._skillTouchPos);
    };
    JoyStick.prototype._updateOilSkillDrag = function (pos, isStart) {
        var skillBtn = this._getCurrentSkillButton();
        if (!skillBtn) {
            return;
        }
        if (isStart) {
            this._skillTouchPos = skillBtn.position.clone();
        }
        var delta = pos.sub(this._skillTouchPos);
        var len = delta.mag();
        if (len > 0.001) {
            this._oilAimDir = delta.normalize();
        }
        var maxLen = Math.max(skillBtn.width * 0.95, 56);
        var ratio = maxLen > 0 ? len / maxLen : 0;
        if (ratio > 1) {
            ratio = 1;
            delta = this._oilAimDir.mul(maxLen);
        }
        skillBtn.setPosition(this._skillTouchPos.add(delta));
        yyp.eventCenter.emit("oil-shell-trigger", {
            aiming: true,
            dir: cc.v2(this._oilAimDir),
            ratio: ratio,
        });
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
        var nextMode = "charge";
        if (mode == "oil" || mode == "blackHole" || mode == "portal" || mode == "speedDouble" || mode == "damageDouble") {
            nextMode = mode;
        }
        var prevMode = this._skillMode;
        this._skillMode = nextMode;
        if (prevMode != this._skillMode) {
            this._skillTouchId = null;
            this._resetSkillButtonPosition();
        }
        if (this._fire._skillBtn) {
            this._fire._skillBtn.active = this._skillMode == "charge";
        }
        if (this._fire._skilloilBtn) {
            this._fire._skilloilBtn.active = this._skillMode != "charge";
            if (this._skillMode == "blackHole") {
                this._fire._skilloilBtn.color = cc.color(166, 120, 255, 255);
            }
            else if (this._skillMode == "portal") {
                this._fire._skilloilBtn.color = cc.color(120, 220, 255, 255);
            }
            else if (this._skillMode == "speedDouble") {
                this._fire._skilloilBtn.color = cc.color(110, 210, 255, 255);
            }
            else if (this._skillMode == "damageDouble") {
                this._fire._skilloilBtn.color = cc.color(255, 140, 100, 255);
            }
            else {
                this._fire._skilloilBtn.color = cc.color(255, 255, 255, 255);
            }
        }
        var skillBtn = this._getCurrentSkillButton();
        if (skillBtn) {
            this._skillTouchPos = skillBtn.position.clone();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBdWpCQztRQXJqQkcsY0FBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQVMsWUFBWTtRQUM1QyxlQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBUSxRQUFRO1FBQ3hDLG1CQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBSSxVQUFVO1FBQzFDLG9CQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRyxVQUFVO1FBQzFDLG9CQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRyxZQUFZO1FBQzVDLFdBQUssR0FBRyxJQUFJLENBQUMsQ0FBbUIsVUFBVTtRQUMxQyxrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQix1QkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsdUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHlCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1QixzQkFBZ0IsR0FBRyxRQUFRLENBQUM7UUFDNUIsZ0JBQVUsR0FBRyxRQUFRLENBQUM7UUFDdEIsZ0JBQVUsR0FBRyxFQUFFLENB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UyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQztTQUM3RDtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDO1lBQzdELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxXQUFXLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hFO2lCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hFO2lCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxhQUFhLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hFO2lCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxjQUFjLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hFO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENB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QUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBdGpCUSxRQUFRO1FBRHBCLE9BQU87T0FDSyxRQUFRLENBdWpCcEI7SUFBRCxlQUFDO0NBdmpCRCxBQXVqQkMsQ0F2akI2Qiw2QkFBYSxHQXVqQjFDO0FBdmpCWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEpveVN0aWNrIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgX21vdmVEaXIgPSBjYy52MigwLCAxKTsgICAgICAgICAvL+enu+WKqOaRh+adhuaWueWQkSjlkJHkuIopXHJcbiAgICBfc2hvb3REaXIgPSBjYy52MigxLCAwKTsgICAgICAgIC8v5bCE5Ye75pGH5p2G5pa55ZCRXHJcbiAgICBfbW92ZVRvdWNoUG9zID0gY2MudjIoMCwgMCk7ICAgIC8v56e75Yqo5pGH5p2G5Yid5aeL5L2N572uXHJcbiAgICBfc2hvb3RUb3VjaFBvcyA9IGNjLnYyKDAsIDApOyAgIC8v5bCE5Ye75pGH5p2G5Yid5aeL5L2N572uXHJcbiAgICBfc2tpbGxUb3VjaFBvcyA9IGNjLnYyKDAsIDApOyAgIC8v54Sm5rK55oyJ6ZKu5ouW5ou95Yid5aeL5L2N572uXHJcbiAgICBfZnJlZSA9IHRydWU7ICAgICAgICAgICAgICAgICAgIC8v6Ieq55Sx56e75Yqo5pGH5p2G5L2N572uXHJcbiAgICBfbW92ZVRvdWNoSWQgPSBudWxsO1xyXG4gICAgX3Nob290VG91Y2hJZCA9IG51bGw7XHJcbiAgICBfc2tpbGxUb3VjaElkID0gbnVsbDtcclxuICAgIF9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcclxuICAgIF9jb3ZlclRvdWNoSWQgPSBudWxsO1xyXG4gICAgX3NhY3JpZmljZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgIF9jb3ZlckJ1dHRvblZpc2libGUgPSBmYWxzZTtcclxuICAgIF9jb3ZlckJ1dHRvbk1vZGUgPSBcImF0dGFjaFwiO1xyXG4gICAgX3NraWxsTW9kZSA9IFwiY2hhcmdlXCI7XHJcbiAgICBfb2lsQWltRGlyID0gY2MudjIoMSwgMCk7XHJcbiAgICBfY2hhcmdlUHJvZ3Jlc3NWYWx1ZSA9IDA7XHJcbiAgICBfY2hhcmdlUHJvZ3Jlc3NDb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLl9zaG9vdFRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcwMi5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIGxldCBvaWxCdG4gPSB0aGlzLl9maXJlLl9za2lsbG9pbEJ0biB8fCB0aGlzLl9maXJlLl9za2lsbEJ0bjtcclxuICAgICAgICB0aGlzLl9za2lsbFRvdWNoUG9zID0gb2lsQnRuID8gb2lsQnRuLnBvc2l0aW9uLmNsb25lKCkgOiBjYy52MigwLCAwKTtcclxuICAgICAgICB0aGlzLl9pbml0U2tpbGxCdXR0b24oKTtcclxuICAgICAgICB0aGlzLl9zZXRTa2lsbEJ1dHRvbk1vZGUoXCJjaGFyZ2VcIik7XHJcbiAgICAgICAgdGhpcy5faW5pdFNhY3JpZmljZUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMuX2luaXRDb3ZlckJ1dHRvbigpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwgdGhpcy5fb25DaGFyZ2VQcm9ncmVzcywgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB0aGlzLl9vbkNoYXJnZUNvb2xkb3duLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJjaGFyZ2UtY2Fubm9uLXJlYWR5XCIsIHRoaXMuX29uQ2hhcmdlUmVhZHksIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwgdGhpcy5fb25DaGFyZ2VDbGVhciwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwic2tpbGwtYnV0dG9uLW1vZGVcIiwgdGhpcy5fb25Ta2lsbEJ1dHRvbk1vZGUsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLCB0aGlzLl9vblNhY3JpZmljZUJ1dHRvblZpc2libGUsIHRoaXMpO1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLCB0aGlzLl9vbkNvdmVyQnV0dG9uU3RhdGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5fb25Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5fb25Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwgdGhpcy5fb25DaGFyZ2VQcm9ncmVzcywgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwgdGhpcy5fb25DaGFyZ2VSZWFkeSwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwgdGhpcy5fb25DaGFyZ2VDbGVhciwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNraWxsLWJ1dHRvbi1tb2RlXCIsIHRoaXMuX29uU2tpbGxCdXR0b25Nb2RlLCB0aGlzKTtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIsIHRoaXMuX29uU2FjcmlmaWNlQnV0dG9uVmlzaWJsZSwgdGhpcyk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNvdmVyLWJ1dHRvbi1zdGF0ZVwiLCB0aGlzLl9vbkNvdmVyQnV0dG9uU3RhdGUsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcclxuICAgICAgICBsZXQgY29udHJvbFR5cGUgPSB0aGlzLl9nZXRDb250cm9sVHlwZShwb3MpO1xyXG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcInNraWxsXCIgJiYgdGhpcy5fc2tpbGxUb3VjaElkID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gdG91Y2hJZDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSAhPSBcImNoYXJnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHsgcHJlc3NlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU9pbFNraWxsRHJhZyhwb3MsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcHJlc3NcIiwge30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2FjcmlmaWNlXCIgJiYgdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCAmJiB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IHRvdWNoSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwiY292ZXJcIiAmJiB0aGlzLl9jb3ZlckJ1dHRvblZpc2libGUgJiYgdGhpcy5fY292ZXJUb3VjaElkID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY292ZXJUb3VjaElkID0gdG91Y2hJZDtcclxuICAgICAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25QcmVzc2VkKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJtb3ZlXCIgJiYgdGhpcy5fbW92ZVRvdWNoSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcInNob290XCIgJiYgdGhpcy5fc2hvb3RUb3VjaElkID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gdG91Y2hJZDtcclxuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbW92ZVRvdWNoSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zaG9vdFRvdWNoSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmVzc1Nob290QnV0dG9uKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9vblRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHRvdWNoSWQgPSBldmVudC5nZXRJRCgpO1xyXG4gICAgICAgIGlmICh0b3VjaElkID09IHRoaXMuX21vdmVUb3VjaElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zaG9vdFRvdWNoSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hvb3RTdGljayhwb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3NraWxsVG91Y2hJZCAmJiB0aGlzLl9za2lsbE1vZGUgIT0gXCJjaGFyZ2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVPaWxTa2lsbERyYWcocG9zLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9vblRvdWNoRW5kKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRvdWNoSWQgPSBldmVudC5nZXRJRCgpO1xyXG4gICAgICAgIGlmICh0b3VjaElkID09IHRoaXMuX21vdmVUb3VjaElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fcmVzZXRNb3ZlU3RpY2soKTtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOjB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zaG9vdFRvdWNoSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fcmVzZXRTaG9vdFN0aWNrKCk7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2ZpcmU6dHJ1ZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3NraWxsVG91Y2hJZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNldFNraWxsQnV0dG9uUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSAhPSBcImNoYXJnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHsgcHJlc3NlZDogZmFsc2UsIHJlbGVhc2U6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCIpIHtcclxuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1yZWxlYXNlXCIsIHt9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3NhY3JpZmljZVRvdWNoSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInRyaWdnZXItc2FjcmlmaWNlXCIsIHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9jb3ZlclRvdWNoSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY292ZXJUb3VjaElkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25QcmVzc2VkKGZhbHNlKTtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJ0cmlnZ2VyLWNvdmVyLWFjdGlvblwiLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBsZXQgbW92ZVJhdGlvID0gdGhpcy5fbGltaXRTdGlja1JhbmdlKHRoaXMuX2ZpcmUuX3NwckJnLCB0aGlzLl9maXJlLl9zcHJKb3lzdGljaywgdGhpcy5fbW92ZVRvdWNoUG9zLCB0aGlzLl9tb3ZlRGlyKTtcclxuICAgICAgICBpZiAobW92ZVJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6dGhpcy5fbW92ZURpciwgcmF0aW86bW92ZVJhdGlvfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzaG9vdFJhdGlvID0gdGhpcy5fbGltaXRTdGlja1JhbmdlKHRoaXMuX2ZpcmUuX3NwckJnMDIsIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIsIHRoaXMuX3Nob290VG91Y2hQb3MsIHRoaXMuX3Nob290RGlyKTtcclxuICAgICAgICBpZiAodGhpcy5fc2hvb3RUb3VjaElkICE9IG51bGwgJiYgc2hvb3RSYXRpbyA+IDAgJiYgdGhpcy5fc2hvb3REaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2Rpcjp0aGlzLl9zaG9vdERpciwgcmF0aW86c2hvb3RSYXRpb30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyVG91Y2hJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRNb3ZlU3RpY2soKTtcclxuICAgICAgICB0aGlzLl9yZXNldFNob290U3RpY2soKTtcclxuICAgICAgICB0aGlzLl9yZXNldFNraWxsQnV0dG9uUG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3ModGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgdGhpcy5fY2hhcmdlUHJvZ3Jlc3NDb2xvcik7XHJcbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25QcmVzc2VkKGZhbHNlKTtcclxuICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlICE9IFwiY2hhcmdlXCIpIHtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJvaWwtc2hlbGwtdHJpZ2dlclwiLCB7IHByZXNzZWQ6IGZhbHNlLCBjYW5jZWxsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2Rpcjp0aGlzLl9tb3ZlRGlyLCByYXRpbzowfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEN1cnJlbnRTa2lsbEJ1dHRvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlICE9IFwiY2hhcmdlXCIgJiYgdGhpcy5fZmlyZS5fc2tpbGxvaWxCdG4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyZS5fc2tpbGxCdG47XHJcbiAgICB9XHJcblxyXG4gICAgX2dldENvbnRyb2xUeXBlKHBvcykge1xyXG4gICAgICAgIGlmICh0aGlzLl9zYWNyaWZpY2VFbmFibGVkICYmIHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0biAmJiB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBzYWNyaWZpY2VEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgaWYgKHNhY3JpZmljZURpc3RhbmNlIDw9IHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi53aWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInNhY3JpZmljZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jb3ZlckJ1dHRvblZpc2libGUgJiYgdGhpcy5fZmlyZS5fZmVubGlfeGlmdSAmJiB0aGlzLl9maXJlLl9mZW5saV94aWZ1LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY292ZXJEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fZmVubGlfeGlmdS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgIGlmIChjb3ZlckRpc3RhbmNlIDw9IHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUud2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb3ZlclwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBza2lsbEJ0biA9IHRoaXMuX2dldEN1cnJlbnRTa2lsbEJ1dHRvbigpO1xyXG4gICAgICAgIGlmIChza2lsbEJ0biAmJiBza2lsbEJ0bi5hY3RpdmUpIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsRGlzdGFuY2UgPSBwb3Muc3ViKHNraWxsQnRuLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICAgICAgaWYgKHNraWxsRGlzdGFuY2UgPD0gc2tpbGxCdG4ud2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJza2lsbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbW92ZURpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zcHJCZy5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgbGV0IHNob290RGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgIHJldHVybiBtb3ZlRGlzdGFuY2UgPD0gc2hvb3REaXN0YW5jZSA/IFwibW92ZVwiIDogXCJzaG9vdFwiO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVNb3ZlU3RpY2socG9zLCBpc1N0YXJ0KSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2suc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBpZiAoaXNTdGFydCAmJiB0aGlzLl9mcmVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwckJnLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaFBvcyA9IHBvcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21vdmVEaXIgPSBwb3Muc3ViKHRoaXMuX21vdmVUb3VjaFBvcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIubWFnU3FyKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVEaXIgPSB0aGlzLl9tb3ZlRGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcHJlc3NTaG9vdEJ1dHRvbihwb3MpIHtcclxuICAgICAgICBpZiAocG9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNob290U3RpY2socG9zKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLnNldFBvc2l0aW9uKHRoaXMuX3Nob290VG91Y2hQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVTaG9vdFN0aWNrKHBvcykge1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICB0aGlzLl9zaG9vdERpciA9IHBvcy5zdWIodGhpcy5fc2hvb3RUb3VjaFBvcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob290RGlyLm1hZ1NxcigpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9vdERpciA9IHRoaXMuX3Nob290RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNob290UmF0aW8gPSB0aGlzLl9saW1pdFN0aWNrUmFuZ2UodGhpcy5fZmlyZS5fc3ByQmcwMiwgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMiwgdGhpcy5fc2hvb3RUb3VjaFBvcywgdGhpcy5fc2hvb3REaXIpO1xyXG4gICAgICAgIGlmIChzaG9vdFJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGljay1zaG9vdFwiLHtkaXI6dGhpcy5fc2hvb3REaXIsIHJhdGlvOnNob290UmF0aW99KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0TW92ZVN0aWNrKCkge1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLnNldFBvc2l0aW9uKHRoaXMuX21vdmVUb3VjaFBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0U2hvb3RTdGljaygpIHtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLnNldFBvc2l0aW9uKHRoaXMuX3Nob290VG91Y2hQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZXNldFNraWxsQnV0dG9uUG9zaXRpb24oKSB7XHJcbiAgICAgICAgbGV0IHNraWxsQnRuID0gdGhpcy5fZ2V0Q3VycmVudFNraWxsQnV0dG9uKCk7XHJcbiAgICAgICAgaWYgKCFza2lsbEJ0bikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNraWxsQnRuLnNldFBvc2l0aW9uKHRoaXMuX3NraWxsVG91Y2hQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVPaWxTa2lsbERyYWcocG9zLCBpc1N0YXJ0KSB7XHJcbiAgICAgICAgbGV0IHNraWxsQnRuID0gdGhpcy5fZ2V0Q3VycmVudFNraWxsQnV0dG9uKCk7XHJcbiAgICAgICAgaWYgKCFza2lsbEJ0bikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hQb3MgPSBza2lsbEJ0bi5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGVsdGEgPSBwb3Muc3ViKHRoaXMuX3NraWxsVG91Y2hQb3MpO1xyXG4gICAgICAgIGxldCBsZW4gPSBkZWx0YS5tYWcoKTtcclxuICAgICAgICBpZiAobGVuID4gMC4wMDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fb2lsQWltRGlyID0gZGVsdGEubm9ybWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXhMZW4gPSBNYXRoLm1heChza2lsbEJ0bi53aWR0aCAqIDAuOTUsIDU2KTtcclxuICAgICAgICBsZXQgcmF0aW8gPSBtYXhMZW4gPiAwID8gbGVuIC8gbWF4TGVuIDogMDtcclxuICAgICAgICBpZiAocmF0aW8gPiAxKSB7XHJcbiAgICAgICAgICAgIHJhdGlvID0gMTtcclxuICAgICAgICAgICAgZGVsdGEgPSB0aGlzLl9vaWxBaW1EaXIubXVsKG1heExlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNraWxsQnRuLnNldFBvc2l0aW9uKHRoaXMuX3NraWxsVG91Y2hQb3MuYWRkKGRlbHRhKSk7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJvaWwtc2hlbGwtdHJpZ2dlclwiLCB7XHJcbiAgICAgICAgICAgIGFpbWluZzogdHJ1ZSxcclxuICAgICAgICAgICAgZGlyOiBjYy52Mih0aGlzLl9vaWxBaW1EaXIpLFxyXG4gICAgICAgICAgICByYXRpbzogcmF0aW8sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2xpbWl0U3RpY2tSYW5nZShiZ05vZGUsIGpveXN0aWNrTm9kZSwgdG91Y2hQb3MsIGRpcikge1xyXG4gICAgICAgIC8vIOmZkOWumuaRh+adhuWcqOiMg+WbtOWGheenu+WKqFxyXG4gICAgICAgIGxldCBsZW4gPSBqb3lzdGlja05vZGUucG9zaXRpb24uc3ViKHRvdWNoUG9zKS5tYWcoKTsgICAvLyDov5Tlm57lkJHph4/nmoTplb/luqZcclxuICAgICAgICBsZXQgbWF4TGVuID0gYmdOb2RlLndpZHRoIC8gMjsgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5pyA5aSn5Y+v56e75Yqo6Led56a7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gbWF4TGVuID4gMCA/IGxlbiAvIG1heExlbiA6IDA7ICAgICAgICAgICAgIC8vIOW9k+WJjeS9jee9ruWSjOacgOWkp+WPr+enu+WKqOi3neemu+avlOeOh1xyXG5cclxuICAgICAgICAvLyDmr5TnjoflpKfkuo4xLOivtOaYjuW3sue7j+i2heWHuuacgOWkp+WPr+enu+WKqOi3neemu+S6hlxyXG4gICAgICAgIGlmIChsZW4gPiBtYXhMZW4pIHtcclxuICAgICAgICAgICAgam95c3RpY2tOb2RlLnNldFBvc2l0aW9uKHRvdWNoUG9zLmFkZChkaXIubXVsKG1heExlbikpKTtcclxuICAgICAgICAgICAgcmF0aW8gPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJhdGlvO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0U2tpbGxCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9za2lsbEJ0bikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmdOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlUHJvZ3Jlc3NCZ1wiKTtcclxuICAgICAgICBiZ05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XHJcbiAgICAgICAgYmdOb2RlLnpJbmRleCA9IDk7XHJcbiAgICAgICAgbGV0IGJnR3JhcGhpY3MgPSBiZ05vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBsZXQgYmdSYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA4O1xyXG4gICAgICAgIGJnR3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNzAsIDcwLCA3MCwgMTgwKTtcclxuICAgICAgICBiZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCBiZ1JhZGl1cyk7XHJcbiAgICAgICAgYmdHcmFwaGljcy5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzc0JnID0gYmdOb2RlO1xyXG5cclxuICAgICAgICBsZXQgcHJvZ3Jlc3NOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlUHJvZ3Jlc3NcIik7XHJcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuO1xyXG4gICAgICAgIHByb2dyZXNzTm9kZS56SW5kZXggPSAxMDtcclxuICAgICAgICBwcm9ncmVzc05vZGUuc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fc2tpbGxCdG4uZ2V0Q29udGVudFNpemUoKSk7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gcHJvZ3Jlc3NOb2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgcHJvZ3Jlc3NOb2RlW1wiJEdyYXBoaWNzXCJdID0gZ3JhcGhpY3M7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MgPSBwcm9ncmVzc05vZGU7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXRTa2lsbEJ1dHRvbk1vZGUobW9kZSkge1xyXG4gICAgICAgIGxldCBuZXh0TW9kZSA9IFwiY2hhcmdlXCI7XHJcbiAgICAgICAgaWYgKG1vZGUgPT0gXCJvaWxcIiB8fCBtb2RlID09IFwiYmxhY2tIb2xlXCIgfHwgbW9kZSA9PSBcInBvcnRhbFwiIHx8IG1vZGUgPT0gXCJzcGVlZERvdWJsZVwiIHx8IG1vZGUgPT0gXCJkYW1hZ2VEb3VibGVcIikge1xyXG4gICAgICAgICAgICBuZXh0TW9kZSA9IG1vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcmV2TW9kZSA9IHRoaXMuX3NraWxsTW9kZTtcclxuICAgICAgICB0aGlzLl9za2lsbE1vZGUgPSBuZXh0TW9kZTtcclxuICAgICAgICBpZiAocHJldk1vZGUgIT0gdGhpcy5fc2tpbGxNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2tpbGxCdXR0b25Qb3NpdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fc2tpbGxCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc2tpbGxCdG4uYWN0aXZlID0gdGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9za2lsbG9pbEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9za2lsbG9pbEJ0bi5hY3RpdmUgPSB0aGlzLl9za2lsbE1vZGUgIT0gXCJjaGFyZ2VcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSA9PSBcImJsYWNrSG9sZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9za2lsbG9pbEJ0bi5jb2xvciA9IGNjLmNvbG9yKDE2NiwgMTIwLCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwicG9ydGFsXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuLmNvbG9yID0gY2MuY29sb3IoMTIwLCAyMjAsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9za2lsbE1vZGUgPT0gXCJzcGVlZERvdWJsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9za2lsbG9pbEJ0bi5jb2xvciA9IGNjLmNvbG9yKDExMCwgMjEwLCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwiZGFtYWdlRG91YmxlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuLmNvbG9yID0gY2MuY29sb3IoMjU1LCAxNDAsIDEwMCwgMjU1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fc2tpbGxvaWxCdG4uY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBza2lsbEJ0biA9IHRoaXMuX2dldEN1cnJlbnRTa2lsbEJ1dHRvbigpO1xyXG4gICAgICAgIGlmIChza2lsbEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoUG9zID0gc2tpbGxCdG4ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3NCZy5hY3RpdmUgPSB0aGlzLl9za2lsbE1vZGUgPT0gXCJjaGFyZ2VcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLmFjdGl2ZSA9IHRoaXMuX3NraWxsTW9kZSA9PSBcImNoYXJnZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3ModGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgdGhpcy5fY2hhcmdlUHJvZ3Jlc3NDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRTYWNyaWZpY2VCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9za2lsbEJ0biB8fCB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ0biA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZUJ0blwiKTtcclxuICAgICAgICBidG4ucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJ0bi56SW5kZXggPSB0aGlzLl9maXJlLl9za2lsbEJ0bi56SW5kZXggfHwgMDtcclxuICAgICAgICBidG4uc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fc2tpbGxCdG4uZ2V0Q29udGVudFNpemUoKSk7XHJcbiAgICAgICAgYnRuLnNldFBvc2l0aW9uKHRoaXMuX2ZpcmUuX3NraWxsQnRuLnBvc2l0aW9uLmFkZChjYy52MygwLCAxMTgsIDApKSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuID0gYnRuO1xyXG5cclxuICAgICAgICBsZXQgb3V0ZXIgPSBidG4uYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBidG5bXCIkR3JhcGhpY3NcIl0gPSBvdXRlcjtcclxuXHJcbiAgICAgICAgbGV0IGlubmVyID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlSW5uZXJcIik7XHJcbiAgICAgICAgaW5uZXIucGFyZW50ID0gYnRuO1xyXG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpbm5lcltcIiRHcmFwaGljc1wiXSA9IGlubmVyR3JhcGhpY3M7XHJcbiAgICAgICAgYnRuW1wiJElubmVyXCJdID0gaW5uZXI7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VMYWJlbFwiKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYnRuO1xyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZShidG4ud2lkdGggLSAxMiwgYnRuLmhlaWdodCAtIDEyKTtcclxuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuelrVwiO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMzQ7XHJcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDM4O1xyXG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQ1LCAyMzIsIDI1NSk7XHJcbiAgICAgICAgYnRuW1wiJExhYmVsTm9kZVwiXSA9IGxhYmVsTm9kZTtcclxuXHJcbiAgICAgICAgbGV0IHRpcE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VUaXBcIik7XHJcbiAgICAgICAgdGlwTm9kZS5wYXJlbnQgPSBidG47XHJcbiAgICAgICAgdGlwTm9kZS5zZXRQb3NpdGlvbigwLCAtNTgpO1xyXG4gICAgICAgIHRpcE5vZGUuc2V0Q29udGVudFNpemUoMTIwLCAyOCk7XHJcbiAgICAgICAgbGV0IHRpcExhYmVsID0gdGlwTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpcExhYmVsLnN0cmluZyA9IFwi54yu56WtXCI7XHJcbiAgICAgICAgdGlwTGFiZWwuZm9udFNpemUgPSAxODtcclxuICAgICAgICB0aXBMYWJlbC5saW5lSGVpZ2h0ID0gMjI7XHJcbiAgICAgICAgdGlwTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcclxuICAgICAgICB0aXBMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgdGlwTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMTg0LCAxNjAsIDIzNSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblZpc2libGUoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0Q292ZXJCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9mZW5saV94aWZ1KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1LnNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvbk1vZGUoXCJhdHRhY2hcIik7XHJcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25WaXNpYmxlKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChwcmVzc2VkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4gfHwgIXRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi4kR3JhcGhpY3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ0biA9IHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bjtcclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidG4uJEdyYXBoaWNzO1xyXG4gICAgICAgIGxldCByYWRpdXMgPSBidG4ud2lkdGggLyAyO1xyXG4gICAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gcHJlc3NlZCA/IGNjLmNvbG9yKDEzNSwgMjAsIDM1LCAyNDUpIDogY2MuY29sb3IoOTUsIDIyLCAzMCwgMjMwKTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcclxuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IHByZXNzZWQgPyBjYy5jb2xvcigyNTUsIDE5MCwgMTc1LCAyNTUpIDogY2MuY29sb3IoMjU1LCAxMjYsIDEwOCwgMjU1KTtcclxuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzIC0gMyk7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGlmIChidG4uJElubmVyICYmIGJ0bi4kSW5uZXIuJEdyYXBoaWNzKSB7XHJcbiAgICAgICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gYnRuLiRJbm5lci4kR3JhcGhpY3M7XHJcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsQ29sb3IgPSBwcmVzc2VkID8gY2MuY29sb3IoMjU1LCAxMDYsIDkyLCAyNTUpIDogY2MuY29sb3IoMjIwLCA3MiwgNjYsIDI0NSk7XHJcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDEzKTtcclxuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYnRuLiRMYWJlbE5vZGUpIHtcclxuICAgICAgICAgICAgYnRuLiRMYWJlbE5vZGUuc2NhbGUgPSBwcmVzc2VkID8gMC45NCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ0bi5zY2FsZSA9IHByZXNzZWQgPyAwLjk2IDogMTtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0U2FjcmlmaWNlQnV0dG9uVmlzaWJsZSh2aXNpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCA9ICEhdmlzaWJsZTtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4uYWN0aXZlID0gdGhpcy5fc2FjcmlmaWNlRW5hYmxlZDtcclxuICAgICAgICBpZiAoIXRoaXMuX3NhY3JpZmljZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2V0Q292ZXJCdXR0b25QcmVzc2VkKHByZXNzZWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1LnNjYWxlID0gcHJlc3NlZCA/IDAuOTQgOiAxO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUub3BhY2l0eSA9IHByZXNzZWQgPyAyMTUgOiAyNTU7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldENvdmVyQnV0dG9uTW9kZShtb2RlKSB7XHJcbiAgICAgICAgdGhpcy5fY292ZXJCdXR0b25Nb2RlID0gbW9kZSA9PSBcImRldGFjaFwiID8gXCJkZXRhY2hcIiA6IFwiYXR0YWNoXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2J0bkxhYmVsICYmIHRoaXMuX2ZpcmUuX2J0bkxhYmVsLiRMYWJlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9idG5MYWJlbC4kTGFiZWwuc3RyaW5nID0gdGhpcy5fY292ZXJCdXR0b25Nb2RlID09IFwiZGV0YWNoXCIgPyBcIuWIhuemu1wiIDogXCLlkLjpmYRcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NldENvdmVyQnV0dG9uVmlzaWJsZSh2aXNpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fY292ZXJCdXR0b25WaXNpYmxlID0gISF2aXNpYmxlO1xyXG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fZmVubGlfeGlmdSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1LmFjdGl2ZSA9IHRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZTtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb3ZlclRvdWNoSWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvblByZXNzZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfb25TYWNyaWZpY2VCdXR0b25WaXNpYmxlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uVmlzaWJsZShldmVudCAmJiBldmVudC52aXNpYmxlID09PSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Db3ZlckJ1dHRvblN0YXRlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25Nb2RlKGV2ZW50ICYmIGV2ZW50Lm1vZGUgPyBldmVudC5tb2RlIDogXCJhdHRhY2hcIik7XHJcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25WaXNpYmxlKGV2ZW50ICYmIGV2ZW50LnZpc2libGUgPT09IHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MocHJvZ3Jlc3MsIGNvbG9yID0gY2MuY29sb3IoMjU1LCA5MCwgNTUsIDI1NSkpIHtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3MgfHwgMDtcclxuICAgICAgICB0aGlzLl9jaGFyZ2VQcm9ncmVzc0NvbG9yID0gY29sb3I7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcyB8fCAhdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuJEdyYXBoaWNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSAhPSBcImNoYXJnZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLiRHcmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy4kR3JhcGhpY3M7XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuLndpZHRoIC8gMiAtIDY7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XHJcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzLCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogdGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMjAsIDIwMCwgMTgwKTtcclxuICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzLCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogdGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblNraWxsQnV0dG9uTW9kZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuX3NldFNraWxsQnV0dG9uTW9kZShldmVudCAmJiBldmVudC5tb2RlID8gZXZlbnQubW9kZSA6IFwiY2hhcmdlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkNoYXJnZVByb2dyZXNzKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKGV2ZW50LnByb2dyZXNzIHx8IDAsIGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25DaGFyZ2VDb29sZG93bihldmVudCkge1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhldmVudC5wcm9ncmVzcyB8fCAwLCBjYy5jb2xvcigxMjAsIDE2MCwgMjU1LCAyMjApKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25DaGFyZ2VSZWFkeSgpIHtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMSwgY2MuY29sb3IoMjU1LCA0MCwgMjUsIDI1NSkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkNoYXJnZUNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcclxuICAgIH1cclxufVxyXG4iXX0=