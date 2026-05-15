
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
            if (this._skillMode == "oil") {
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
        else if (touchId == this._skillTouchId && this._skillMode == "oil") {
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
        this._resetSkillButtonPosition();
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
        var nextMode = mode == "oil" ? "oil" : "charge";
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
            this._fire._skilloilBtn.active = this._skillMode == "oil";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBcWlCQztRQW5pQkcsY0FBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQVMsWUFBWTtRQUM1QyxlQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBUSxRQUFRO1FBQ3hDLG1CQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBSSxVQUFVO1FBQzFDLG9CQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRyxVQUFVO1FBQzFDLG9CQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRyxZQUFZO1FBQzVDLFdBQUssR0FBRyxJQUFJLENBQUMsQ0FBbUIsVUFBVTtRQUMxQyxrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQix1QkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsdUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHlCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1QixzQkFBZ0IsR0FBRyxRQUFRLENBQUM7UUFDNUIsZ0JBQVUsR0FBRyxRQUFRLENBQUM7UUFDdEIsZ0JBQVUsR0FBRyxFQUFFLENB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RyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFwaUJRLFFBQVE7UUFEcEIsT0FBTztPQUNLLFFBQVEsQ0FxaUJwQjtJQUFELGVBQUM7Q0FyaUJELEFBcWlCQyxDQXJpQjZCLDZCQUFhLEdBcWlCMUM7QUFyaUJZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgY2xhc3MgSm95U3RpY2sgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIF9tb3ZlRGlyID0gY2MudjIoMCwgMSk7ICAgICAgICAgLy/np7vliqjmkYfmnYbmlrnlkJEo5ZCR5LiKKVxuICAgIF9zaG9vdERpciA9IGNjLnYyKDEsIDApOyAgICAgICAgLy/lsITlh7vmkYfmnYbmlrnlkJFcbiAgICBfbW92ZVRvdWNoUG9zID0gY2MudjIoMCwgMCk7ICAgIC8v56e75Yqo5pGH5p2G5Yid5aeL5L2N572uXG4gICAgX3Nob290VG91Y2hQb3MgPSBjYy52MigwLCAwKTsgICAvL+WwhOWHu+aRh+adhuWIneWni+S9jee9rlxuICAgIF9za2lsbFRvdWNoUG9zID0gY2MudjIoMCwgMCk7ICAgLy/nhKbmsrnmjInpkq7mi5bmi73liJ3lp4vkvY3nva5cbiAgICBfZnJlZSA9IHRydWU7ICAgICAgICAgICAgICAgICAgIC8v6Ieq55Sx56e75Yqo5pGH5p2G5L2N572uXG4gICAgX21vdmVUb3VjaElkID0gbnVsbDtcbiAgICBfc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICBfc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICBfc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgX2NvdmVyVG91Y2hJZCA9IG51bGw7XG4gICAgX3NhY3JpZmljZUVuYWJsZWQgPSBmYWxzZTtcbiAgICBfY292ZXJCdXR0b25WaXNpYmxlID0gZmFsc2U7XG4gICAgX2NvdmVyQnV0dG9uTW9kZSA9IFwiYXR0YWNoXCI7XG4gICAgX3NraWxsTW9kZSA9IFwiY2hhcmdlXCI7XG4gICAgX29pbEFpbURpciA9IGNjLnYyKDEsIDApO1xuICAgIF9jaGFyZ2VQcm9ncmVzc1ZhbHVlID0gMDtcbiAgICBfY2hhcmdlUHJvZ3Jlc3NDb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaFBvcyA9IHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgbGV0IG9pbEJ0biA9IHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuIHx8IHRoaXMuX2ZpcmUuX3NraWxsQnRuO1xuICAgICAgICB0aGlzLl9za2lsbFRvdWNoUG9zID0gb2lsQnRuID8gb2lsQnRuLnBvc2l0aW9uLmNsb25lKCkgOiBjYy52MigwLCAwKTtcbiAgICAgICAgdGhpcy5faW5pdFNraWxsQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuX3NldFNraWxsQnV0dG9uTW9kZShcImNoYXJnZVwiKTtcbiAgICAgICAgdGhpcy5faW5pdFNhY3JpZmljZUJ1dHRvbigpO1xuICAgICAgICB0aGlzLl9pbml0Q292ZXJCdXR0b24oKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB0aGlzLl9vbkNoYXJnZUNvb2xkb3duLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB0aGlzLl9vbkNoYXJnZVJlYWR5LCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwic2tpbGwtYnV0dG9uLW1vZGVcIiwgdGhpcy5fb25Ta2lsbEJ1dHRvbk1vZGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIiwgdGhpcy5fb25TYWNyaWZpY2VCdXR0b25WaXNpYmxlLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY292ZXItYnV0dG9uLXN0YXRlXCIsIHRoaXMuX29uQ292ZXJCdXR0b25TdGF0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLXJlYWR5XCIsIHRoaXMuX29uQ2hhcmdlUmVhZHksIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNraWxsLWJ1dHRvbi1tb2RlXCIsIHRoaXMuX29uU2tpbGxCdXR0b25Nb2RlLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLCB0aGlzLl9vblNhY3JpZmljZUJ1dHRvblZpc2libGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY292ZXItYnV0dG9uLXN0YXRlXCIsIHRoaXMuX29uQ292ZXJCdXR0b25TdGF0ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX29uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGxldCBjb250cm9sVHlwZSA9IHRoaXMuX2dldENvbnRyb2xUeXBlKHBvcyk7XG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcInNraWxsXCIgJiYgdGhpcy5fc2tpbGxUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCIpIHtcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHsgcHJlc3NlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVPaWxTa2lsbERyYWcocG9zLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcmVzc1wiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2FjcmlmaWNlXCIgJiYgdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCAmJiB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJjb3ZlclwiICYmIHRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZSAmJiB0aGlzLl9jb3ZlclRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY292ZXJUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uUHJlc3NlZCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcIm1vdmVcIiAmJiB0aGlzLl9tb3ZlVG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJzaG9vdFwiICYmIHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21vdmVUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcbiAgICAgICAgaWYgKHRvdWNoSWQgPT0gdGhpcy5fbW92ZVRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3Nob290VG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hvb3RTdGljayhwb3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2tpbGxUb3VjaElkICYmIHRoaXMuX3NraWxsTW9kZSA9PSBcIm9pbFwiKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVPaWxTa2lsbERyYWcocG9zLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25Ub3VjaEVuZChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGlmICh0b3VjaElkID09IHRoaXMuX21vdmVUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldE1vdmVTdGljaygpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOjB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3Nob290VG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2hvb3RTdGljaygpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2stc2hvb3RcIix7ZmlyZTp0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9za2lsbFRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFNraWxsQnV0dG9uUG9zaXRpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9za2lsbE1vZGUgPT0gXCJvaWxcIikge1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwib2lsLXNoZWxsLXRyaWdnZXJcIiwgeyBwcmVzc2VkOiBmYWxzZSwgcmVsZWFzZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NraWxsTW9kZSA9PSBcImNoYXJnZVwiKSB7XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLXJlbGVhc2VcIiwge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwidHJpZ2dlci1zYWNyaWZpY2VcIiwge30pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fY292ZXJUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9jb3ZlclRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwidHJpZ2dlci1jb3Zlci1hY3Rpb25cIiwge30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBsZXQgbW92ZVJhdGlvID0gdGhpcy5fbGltaXRTdGlja1JhbmdlKHRoaXMuX2ZpcmUuX3NwckJnLCB0aGlzLl9maXJlLl9zcHJKb3lzdGljaywgdGhpcy5fbW92ZVRvdWNoUG9zLCB0aGlzLl9tb3ZlRGlyKTtcbiAgICAgICAgaWYgKG1vdmVSYXRpbyA+IDApIHtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2Rpcjp0aGlzLl9tb3ZlRGlyLCByYXRpbzptb3ZlUmF0aW99KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hvb3RSYXRpbyA9IHRoaXMuX2xpbWl0U3RpY2tSYW5nZSh0aGlzLl9maXJlLl9zcHJCZzAyLCB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLCB0aGlzLl9zaG9vdFRvdWNoUG9zLCB0aGlzLl9zaG9vdERpcik7XG4gICAgICAgIGlmICh0aGlzLl9zaG9vdFRvdWNoSWQgIT0gbnVsbCAmJiBzaG9vdFJhdGlvID4gMCAmJiB0aGlzLl9zaG9vdERpci5tYWdTcXIoKSA+IDApIHtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2Rpcjp0aGlzLl9zaG9vdERpciwgcmF0aW86c2hvb3RSYXRpb30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCl7XG4gICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvdmVyVG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0TW92ZVN0aWNrKCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0U2hvb3RTdGljaygpO1xuICAgICAgICB0aGlzLl9yZXNldFNraWxsQnV0dG9uUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUsIHRoaXMuX2NoYXJnZVByb2dyZXNzQ29sb3IpO1xuICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSA9PSBcIm9pbFwiKSB7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHsgcHJlc3NlZDogZmFsc2UsIGNhbmNlbGxlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6dGhpcy5fbW92ZURpciwgcmF0aW86MH0pO1xuICAgIH1cblxuICAgIF9nZXRDdXJyZW50U2tpbGxCdXR0b24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9za2lsbE1vZGUgPT0gXCJvaWxcIiAmJiB0aGlzLl9maXJlLl9za2lsbG9pbEJ0bikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJlLl9za2lsbEJ0bjtcbiAgICB9XG5cbiAgICBfZ2V0Q29udHJvbFR5cGUocG9zKSB7XG4gICAgICAgIGlmICh0aGlzLl9zYWNyaWZpY2VFbmFibGVkICYmIHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0biAmJiB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4uYWN0aXZlKSB7XG4gICAgICAgICAgICBsZXQgc2FjcmlmaWNlRGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi5wb3NpdGlvbikubWFnKCk7XG4gICAgICAgICAgICBpZiAoc2FjcmlmaWNlRGlzdGFuY2UgPD0gdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInNhY3JpZmljZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jb3ZlckJ1dHRvblZpc2libGUgJiYgdGhpcy5fZmlyZS5fZmVubGlfeGlmdSAmJiB0aGlzLl9maXJlLl9mZW5saV94aWZ1LmFjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IGNvdmVyRGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUucG9zaXRpb24pLm1hZygpO1xuICAgICAgICAgICAgaWYgKGNvdmVyRGlzdGFuY2UgPD0gdGhpcy5fZmlyZS5fZmVubGlfeGlmdS53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb3ZlclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBza2lsbEJ0biA9IHRoaXMuX2dldEN1cnJlbnRTa2lsbEJ1dHRvbigpO1xuICAgICAgICBpZiAoc2tpbGxCdG4gJiYgc2tpbGxCdG4uYWN0aXZlKSB7XG4gICAgICAgICAgICBsZXQgc2tpbGxEaXN0YW5jZSA9IHBvcy5zdWIoc2tpbGxCdG4ucG9zaXRpb24pLm1hZygpO1xuICAgICAgICAgICAgaWYgKHNraWxsRGlzdGFuY2UgPD0gc2tpbGxCdG4ud2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic2tpbGxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb3ZlRGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NwckJnLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgbGV0IHNob290RGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24pLm1hZygpO1xuICAgICAgICByZXR1cm4gbW92ZURpc3RhbmNlIDw9IHNob290RGlzdGFuY2UgPyBcIm1vdmVcIiA6IFwic2hvb3RcIjtcbiAgICB9XG5cbiAgICBfdXBkYXRlTW92ZVN0aWNrKHBvcywgaXNTdGFydCkge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljay5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICBpZiAoaXNTdGFydCAmJiB0aGlzLl9mcmVlKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcHJCZy5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gcG9zO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW92ZURpciA9IHBvcy5zdWIodGhpcy5fbW92ZVRvdWNoUG9zKTtcbiAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlRGlyID0gdGhpcy5fbW92ZURpci5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wcmVzc1Nob290QnV0dG9uKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaG9vdFN0aWNrKHBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbih0aGlzLl9zaG9vdFRvdWNoUG9zKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlU2hvb3RTdGljayhwb3MpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICB0aGlzLl9zaG9vdERpciA9IHBvcy5zdWIodGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgICAgIGlmICh0aGlzLl9zaG9vdERpci5tYWdTcXIoKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290RGlyID0gdGhpcy5fc2hvb3REaXIubm9ybWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hvb3RSYXRpbyA9IHRoaXMuX2xpbWl0U3RpY2tSYW5nZSh0aGlzLl9maXJlLl9zcHJCZzAyLCB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLCB0aGlzLl9zaG9vdFRvdWNoUG9zLCB0aGlzLl9zaG9vdERpcik7XG4gICAgICAgIGlmIChzaG9vdFJhdGlvID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2stc2hvb3RcIix7ZGlyOnRoaXMuX3Nob290RGlyLCByYXRpbzpzaG9vdFJhdGlvfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcmVzZXRNb3ZlU3RpY2soKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLnNldFBvc2l0aW9uKHRoaXMuX21vdmVUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX3Jlc2V0U2hvb3RTdGljaygpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbih0aGlzLl9zaG9vdFRvdWNoUG9zKTtcbiAgICB9XG5cbiAgICBfcmVzZXRTa2lsbEJ1dHRvblBvc2l0aW9uKCkge1xuICAgICAgICBsZXQgc2tpbGxCdG4gPSB0aGlzLl9nZXRDdXJyZW50U2tpbGxCdXR0b24oKTtcbiAgICAgICAgaWYgKCFza2lsbEJ0bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNraWxsQnRuLnNldFBvc2l0aW9uKHRoaXMuX3NraWxsVG91Y2hQb3MpO1xuICAgIH1cblxuICAgIF91cGRhdGVPaWxTa2lsbERyYWcocG9zLCBpc1N0YXJ0KSB7XG4gICAgICAgIGxldCBza2lsbEJ0biA9IHRoaXMuX2dldEN1cnJlbnRTa2lsbEJ1dHRvbigpO1xuICAgICAgICBpZiAoIXNraWxsQnRuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hQb3MgPSBza2lsbEJ0bi5wb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZWx0YSA9IHBvcy5zdWIodGhpcy5fc2tpbGxUb3VjaFBvcyk7XG4gICAgICAgIGxldCBsZW4gPSBkZWx0YS5tYWcoKTtcbiAgICAgICAgaWYgKGxlbiA+IDAuMDAxKSB7XG4gICAgICAgICAgICB0aGlzLl9vaWxBaW1EaXIgPSBkZWx0YS5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF4TGVuID0gTWF0aC5tYXgoc2tpbGxCdG4ud2lkdGggKiAwLjk1LCA1Nik7XG4gICAgICAgIGxldCByYXRpbyA9IG1heExlbiA+IDAgPyBsZW4gLyBtYXhMZW4gOiAwO1xuICAgICAgICBpZiAocmF0aW8gPiAxKSB7XG4gICAgICAgICAgICByYXRpbyA9IDE7XG4gICAgICAgICAgICBkZWx0YSA9IHRoaXMuX29pbEFpbURpci5tdWwobWF4TGVuKTtcbiAgICAgICAgfVxuICAgICAgICBza2lsbEJ0bi5zZXRQb3NpdGlvbih0aGlzLl9za2lsbFRvdWNoUG9zLmFkZChkZWx0YSkpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHtcbiAgICAgICAgICAgIGFpbWluZzogdHJ1ZSxcbiAgICAgICAgICAgIGRpcjogY2MudjIodGhpcy5fb2lsQWltRGlyKSxcbiAgICAgICAgICAgIHJhdGlvOiByYXRpbyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2xpbWl0U3RpY2tSYW5nZShiZ05vZGUsIGpveXN0aWNrTm9kZSwgdG91Y2hQb3MsIGRpcikge1xuICAgICAgICAvLyDpmZDlrprmkYfmnYblnKjojIPlm7TlhoXnp7vliqhcbiAgICAgICAgbGV0IGxlbiA9IGpveXN0aWNrTm9kZS5wb3NpdGlvbi5zdWIodG91Y2hQb3MpLm1hZygpOyAgIC8vIOi/lOWbnuWQkemHj+eahOmVv+W6plxuICAgICAgICBsZXQgbWF4TGVuID0gYmdOb2RlLndpZHRoIC8gMjsgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5pyA5aSn5Y+v56e75Yqo6Led56a7XG4gICAgICAgIGxldCByYXRpbyA9IG1heExlbiA+IDAgPyBsZW4gLyBtYXhMZW4gOiAwOyAgICAgICAgICAgICAvLyDlvZPliY3kvY3nva7lkozmnIDlpKflj6/np7vliqjot53nprvmr5TnjodcblxuICAgICAgICAvLyDmr5TnjoflpKfkuo4xLOivtOaYjuW3sue7j+i2heWHuuacgOWkp+WPr+enu+WKqOi3neemu+S6hlxuICAgICAgICBpZiAobGVuID4gbWF4TGVuKSB7XG4gICAgICAgICAgICBqb3lzdGlja05vZGUuc2V0UG9zaXRpb24odG91Y2hQb3MuYWRkKGRpci5tdWwobWF4TGVuKSkpO1xuICAgICAgICAgICAgcmF0aW8gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhdGlvO1xuICAgIH1cblxuICAgIF9pbml0U2tpbGxCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2tpbGxCdG4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiZ05vZGUgPSBuZXcgY2MuTm9kZShcIl9jaGFyZ2VQcm9ncmVzc0JnXCIpO1xuICAgICAgICBiZ05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIGJnTm9kZS56SW5kZXggPSA5O1xuICAgICAgICBsZXQgYmdHcmFwaGljcyA9IGJnTm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBsZXQgYmdSYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA4O1xuICAgICAgICBiZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig3MCwgNzAsIDcwLCAxODApO1xuICAgICAgICBiZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCBiZ1JhZGl1cyk7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcgPSBiZ05vZGU7XG5cbiAgICAgICAgbGV0IHByb2dyZXNzTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZVByb2dyZXNzXCIpO1xuICAgICAgICBwcm9ncmVzc05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIHByb2dyZXNzTm9kZS56SW5kZXggPSAxMDtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnNldENvbnRlbnRTaXplKHRoaXMuX2ZpcmUuX3NraWxsQnRuLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBwcm9ncmVzc05vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlW1wiJEdyYXBoaWNzXCJdID0gZ3JhcGhpY3M7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzID0gcHJvZ3Jlc3NOb2RlO1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XG4gICAgfVxuXG4gICAgX3NldFNraWxsQnV0dG9uTW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBuZXh0TW9kZSA9IG1vZGUgPT0gXCJvaWxcIiA/IFwib2lsXCIgOiBcImNoYXJnZVwiO1xuICAgICAgICBsZXQgcHJldk1vZGUgPSB0aGlzLl9za2lsbE1vZGU7XG4gICAgICAgIHRoaXMuX3NraWxsTW9kZSA9IG5leHRNb2RlO1xuICAgICAgICBpZiAocHJldk1vZGUgIT0gdGhpcy5fc2tpbGxNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRTa2lsbEJ1dHRvblBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3NraWxsQnRuKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9za2lsbEJ0bi5hY3RpdmUgPSB0aGlzLl9za2lsbE1vZGUgPT0gXCJjaGFyZ2VcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fc2tpbGxvaWxCdG4pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuLmFjdGl2ZSA9IHRoaXMuX3NraWxsTW9kZSA9PSBcIm9pbFwiO1xuICAgICAgICB9XG4gICAgICAgIGxldCBza2lsbEJ0biA9IHRoaXMuX2dldEN1cnJlbnRTa2lsbEJ1dHRvbigpO1xuICAgICAgICBpZiAoc2tpbGxCdG4pIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hQb3MgPSBza2lsbEJ0bi5wb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzc0JnKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzc0JnLmFjdGl2ZSA9IHRoaXMuX3NraWxsTW9kZSA9PSBcImNoYXJnZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcykge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuYWN0aXZlID0gdGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUsIHRoaXMuX2NoYXJnZVByb2dyZXNzQ29sb3IpO1xuICAgIH1cblxuICAgIF9pbml0U2FjcmlmaWNlQnV0dG9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3NraWxsQnRuIHx8IHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJ0biA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZUJ0blwiKTtcbiAgICAgICAgYnRuLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgYnRuLnpJbmRleCA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuLnpJbmRleCB8fCAwO1xuICAgICAgICBidG4uc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fc2tpbGxCdG4uZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICAgIGJ0bi5zZXRQb3NpdGlvbih0aGlzLl9maXJlLl9za2lsbEJ0bi5wb3NpdGlvbi5hZGQoY2MudjMoMCwgMTE4LCAwKSkpO1xuICAgICAgICB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4gPSBidG47XG5cbiAgICAgICAgbGV0IG91dGVyID0gYnRuLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGJ0bltcIiRHcmFwaGljc1wiXSA9IG91dGVyO1xuXG4gICAgICAgIGxldCBpbm5lciA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZUlubmVyXCIpO1xuICAgICAgICBpbm5lci5wYXJlbnQgPSBidG47XG4gICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gaW5uZXIuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgaW5uZXJbXCIkR3JhcGhpY3NcIl0gPSBpbm5lckdyYXBoaWNzO1xuICAgICAgICBidG5bXCIkSW5uZXJcIl0gPSBpbm5lcjtcblxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlTGFiZWxcIik7XG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBidG47XG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZShidG4ud2lkdGggLSAxMiwgYnRuLmhlaWdodCAtIDEyKTtcbiAgICAgICAgbGV0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwi56WtXCI7XG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMzQ7XG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAzODtcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI0NSwgMjMyLCAyNTUpO1xuICAgICAgICBidG5bXCIkTGFiZWxOb2RlXCJdID0gbGFiZWxOb2RlO1xuXG4gICAgICAgIGxldCB0aXBOb2RlID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlVGlwXCIpO1xuICAgICAgICB0aXBOb2RlLnBhcmVudCA9IGJ0bjtcbiAgICAgICAgdGlwTm9kZS5zZXRQb3NpdGlvbigwLCAtNTgpO1xuICAgICAgICB0aXBOb2RlLnNldENvbnRlbnRTaXplKDEyMCwgMjgpO1xuICAgICAgICBsZXQgdGlwTGFiZWwgPSB0aXBOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIHRpcExhYmVsLnN0cmluZyA9IFwi54yu56WtXCI7XG4gICAgICAgIHRpcExhYmVsLmZvbnRTaXplID0gMTg7XG4gICAgICAgIHRpcExhYmVsLmxpbmVIZWlnaHQgPSAyMjtcbiAgICAgICAgdGlwTGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgdGlwTGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuICAgICAgICB0aXBOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAxODQsIDE2MCwgMjM1KTtcblxuICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uVmlzaWJsZShmYWxzZSk7XG4gICAgfVxuXG4gICAgX2luaXRDb3ZlckJ1dHRvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9mZW5saV94aWZ1KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1Lm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvbk1vZGUoXCJhdHRhY2hcIik7XG4gICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uVmlzaWJsZShmYWxzZSk7XG4gICAgfVxuXG4gICAgX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQocHJlc3NlZCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0biB8fCAhdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLiRHcmFwaGljcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJ0biA9IHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bjtcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gYnRuLiRHcmFwaGljcztcbiAgICAgICAgbGV0IHJhZGl1cyA9IGJ0bi53aWR0aCAvIDI7XG4gICAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IHByZXNzZWQgPyBjYy5jb2xvcigxMzUsIDIwLCAzNSwgMjQ1KSA6IGNjLmNvbG9yKDk1LCAyMiwgMzAsIDIzMCk7XG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMpO1xuICAgICAgICBncmFwaGljcy5maWxsKCk7XG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gcHJlc3NlZCA/IGNjLmNvbG9yKDI1NSwgMTkwLCAxNzUsIDI1NSkgOiBjYy5jb2xvcigyNTUsIDEyNiwgMTA4LCAyNTUpO1xuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzIC0gMyk7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGlmIChidG4uJElubmVyICYmIGJ0bi4kSW5uZXIuJEdyYXBoaWNzKSB7XG4gICAgICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGJ0bi4kSW5uZXIuJEdyYXBoaWNzO1xuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5jbGVhcigpO1xuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsQ29sb3IgPSBwcmVzc2VkID8gY2MuY29sb3IoMjU1LCAxMDYsIDkyLCAyNTUpIDogY2MuY29sb3IoMjIwLCA3MiwgNjYsIDI0NSk7XG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSAxMyk7XG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChidG4uJExhYmVsTm9kZSkge1xuICAgICAgICAgICAgYnRuLiRMYWJlbE5vZGUuc2NhbGUgPSBwcmVzc2VkID8gMC45NCA6IDE7XG4gICAgICAgIH1cbiAgICAgICAgYnRuLnNjYWxlID0gcHJlc3NlZCA/IDAuOTYgOiAxO1xuICAgIH1cblxuICAgIF9zZXRTYWNyaWZpY2VCdXR0b25WaXNpYmxlKHZpc2libGUpIHtcbiAgICAgICAgdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCA9ICEhdmlzaWJsZTtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi5hY3RpdmUgPSB0aGlzLl9zYWNyaWZpY2VFbmFibGVkO1xuICAgICAgICBpZiAoIXRoaXMuX3NhY3JpZmljZUVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0Q292ZXJCdXR0b25QcmVzc2VkKHByZXNzZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9mZW5saV94aWZ1KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZS5fZmVubGlfeGlmdS5zY2FsZSA9IHByZXNzZWQgPyAwLjk0IDogMTtcbiAgICAgICAgdGhpcy5fZmlyZS5fZmVubGlfeGlmdS5vcGFjaXR5ID0gcHJlc3NlZCA/IDIxNSA6IDI1NTtcbiAgICB9XG5cbiAgICBfc2V0Q292ZXJCdXR0b25Nb2RlKG1vZGUpIHtcbiAgICAgICAgdGhpcy5fY292ZXJCdXR0b25Nb2RlID0gbW9kZSA9PSBcImRldGFjaFwiID8gXCJkZXRhY2hcIiA6IFwiYXR0YWNoXCI7XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9idG5MYWJlbCAmJiB0aGlzLl9maXJlLl9idG5MYWJlbC4kTGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2J0bkxhYmVsLiRMYWJlbC5zdHJpbmcgPSB0aGlzLl9jb3ZlckJ1dHRvbk1vZGUgPT0gXCJkZXRhY2hcIiA/IFwi5YiG56a7XCIgOiBcIuWQuOmZhFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3NldENvdmVyQnV0dG9uVmlzaWJsZSh2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZSA9ICEhdmlzaWJsZTtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9mZW5saV94aWZ1KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1LmFjdGl2ZSA9IHRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZTtcbiAgICAgICAgaWYgKCF0aGlzLl9jb3ZlckJ1dHRvblZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uU2FjcmlmaWNlQnV0dG9uVmlzaWJsZShldmVudCkge1xuICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25WaXNpYmxlKGV2ZW50ICYmIGV2ZW50LnZpc2libGUgPT09IHRydWUpO1xuICAgIH1cblxuICAgIF9vbkNvdmVyQnV0dG9uU3RhdGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25Nb2RlKGV2ZW50ICYmIGV2ZW50Lm1vZGUgPyBldmVudC5tb2RlIDogXCJhdHRhY2hcIik7XG4gICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uVmlzaWJsZShldmVudCAmJiBldmVudC52aXNpYmxlID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBfcmVmcmVzaENoYXJnZVByb2dyZXNzKHByb2dyZXNzLCBjb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpKSB7XG4gICAgICAgIHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUgPSBwcm9ncmVzcyB8fCAwO1xuICAgICAgICB0aGlzLl9jaGFyZ2VQcm9ncmVzc0NvbG9yID0gY29sb3I7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MgfHwgIXRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLiRHcmFwaGljcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9za2lsbE1vZGUgIT0gXCJjaGFyZ2VcIikge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuJEdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy4kR3JhcGhpY3M7XG4gICAgICAgIGxldCByYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA2O1xuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA4O1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xuICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzLCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogdGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgZmFsc2UpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcblxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjIwLCAyMDAsIDE4MCk7XG4gICAgICAgIGdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiB0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlLCBmYWxzZSk7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgIH1cblxuICAgIF9vblNraWxsQnV0dG9uTW9kZShldmVudCkge1xuICAgICAgICB0aGlzLl9zZXRTa2lsbEJ1dHRvbk1vZGUoZXZlbnQgJiYgZXZlbnQubW9kZSA/IGV2ZW50Lm1vZGUgOiBcImNoYXJnZVwiKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VQcm9ncmVzcyhldmVudCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoZXZlbnQucHJvZ3Jlc3MgfHwgMCwgY2MuY29sb3IoMjU1LCA5MCwgNTUsIDI1NSkpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZUNvb2xkb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhldmVudC5wcm9ncmVzcyB8fCAwLCBjYy5jb2xvcigxMjAsIDE2MCwgMjU1LCAyMjApKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VSZWFkeSgpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDEsIGNjLmNvbG9yKDI1NSwgNDAsIDI1LCAyNTUpKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VDbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgIH1cbn1cbiJdfQ==