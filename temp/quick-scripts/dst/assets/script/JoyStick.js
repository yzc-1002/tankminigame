
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBK2VDO1FBN2VHLGNBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFTLFlBQVk7UUFDNUMsZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUN4QyxtQkFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksVUFBVTtRQUMxQyxvQkFBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUcsVUFBVTtRQUMxQyxXQUFLLEdBQUcsSUFBSSxDQUFDLENBQW1CLFVBQVU7UUFDMUMsa0JBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsdUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLG1CQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix5QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQzVCLGdCQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLDBCQUFvQixHQUFHLENBQUMsQ0FBQztRQUN6QiwwQkFBb0IsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdB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QUs7UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDbkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDbkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUE5ZVEsUUFBUTtRQURwQixPQUFPO09BQ0ssUUFBUSxDQStlcEI7SUFBRCxlQUFDO0NBL2VELEFBK2VDLENBL2U2Qiw2QkFBYSxHQStlMUM7QUEvZVksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBjbGFzcyBKb3lTdGljayBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgX21vdmVEaXIgPSBjYy52MigwLCAxKTsgICAgICAgICAvL+enu+WKqOaRh+adhuaWueWQkSjlkJHkuIopXG4gICAgX3Nob290RGlyID0gY2MudjIoMSwgMCk7ICAgICAgICAvL+WwhOWHu+aRh+adhuaWueWQkVxuICAgIF9tb3ZlVG91Y2hQb3MgPSBjYy52MigwLCAwKTsgICAgLy/np7vliqjmkYfmnYbliJ3lp4vkvY3nva5cbiAgICBfc2hvb3RUb3VjaFBvcyA9IGNjLnYyKDAsIDApOyAgIC8v5bCE5Ye75pGH5p2G5Yid5aeL5L2N572uXG4gICAgX2ZyZWUgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAvL+iHqueUseenu+WKqOaRh+adhuS9jee9rlxuICAgIF9tb3ZlVG91Y2hJZCA9IG51bGw7XG4gICAgX3Nob290VG91Y2hJZCA9IG51bGw7XG4gICAgX3NraWxsVG91Y2hJZCA9IG51bGw7XG4gICAgX3NhY3JpZmljZVRvdWNoSWQgPSBudWxsO1xuICAgIF9jb3ZlclRvdWNoSWQgPSBudWxsO1xuICAgIF9zYWNyaWZpY2VFbmFibGVkID0gZmFsc2U7XG4gICAgX2NvdmVyQnV0dG9uVmlzaWJsZSA9IGZhbHNlO1xuICAgIF9jb3ZlckJ1dHRvbk1vZGUgPSBcImF0dGFjaFwiO1xuICAgIF9za2lsbE1vZGUgPSBcImNoYXJnZVwiO1xuICAgIF9jaGFyZ2VQcm9ncmVzc1ZhbHVlID0gMDtcbiAgICBfY2hhcmdlUHJvZ3Jlc3NDb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaFBvcyA9IHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5faW5pdFNraWxsQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuX3NldFNraWxsQnV0dG9uTW9kZShcImNoYXJnZVwiKTtcbiAgICAgICAgdGhpcy5faW5pdFNhY3JpZmljZUJ1dHRvbigpO1xuICAgICAgICB0aGlzLl9pbml0Q292ZXJCdXR0b24oKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB0aGlzLl9vbkNoYXJnZUNvb2xkb3duLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB0aGlzLl9vbkNoYXJnZVJlYWR5LCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwic2tpbGwtYnV0dG9uLW1vZGVcIiwgdGhpcy5fb25Ta2lsbEJ1dHRvbk1vZGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oXCJzYWNyaWZpY2UtYnV0dG9uLXZpc2libGVcIiwgdGhpcy5fb25TYWNyaWZpY2VCdXR0b25WaXNpYmxlLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY292ZXItYnV0dG9uLXN0YXRlXCIsIHRoaXMuX29uQ292ZXJCdXR0b25TdGF0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLXJlYWR5XCIsIHRoaXMuX29uQ2hhcmdlUmVhZHksIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNraWxsLWJ1dHRvbi1tb2RlXCIsIHRoaXMuX29uU2tpbGxCdXR0b25Nb2RlLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLCB0aGlzLl9vblNhY3JpZmljZUJ1dHRvblZpc2libGUsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY292ZXItYnV0dG9uLXN0YXRlXCIsIHRoaXMuX29uQ292ZXJCdXR0b25TdGF0ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX29uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGxldCBjb250cm9sVHlwZSA9IHRoaXMuX2dldENvbnRyb2xUeXBlKHBvcyk7XG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcInNraWxsXCIgJiYgdGhpcy5fc2tpbGxUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCIpIHtcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcIm9pbC1zaGVsbC10cmlnZ2VyXCIsIHsgcHJlc3NlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcmVzc1wiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2FjcmlmaWNlXCIgJiYgdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCAmJiB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJjb3ZlclwiICYmIHRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZSAmJiB0aGlzLl9jb3ZlclRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY292ZXJUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uUHJlc3NlZCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcIm1vdmVcIiAmJiB0aGlzLl9tb3ZlVG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJzaG9vdFwiICYmIHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21vdmVUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3Nob290VG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NTaG9vdEJ1dHRvbihwb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcbiAgICAgICAgaWYgKHRvdWNoSWQgPT0gdGhpcy5fbW92ZVRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3Nob290VG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hvb3RTdGljayhwb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoSWQgPSBldmVudC5nZXRJRCgpO1xuICAgICAgICBpZiAodG91Y2hJZCA9PSB0aGlzLl9tb3ZlVG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRNb3ZlU3RpY2soKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2Rpcjp0aGlzLl9tb3ZlRGlyLCByYXRpbzowfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zaG9vdFRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290VG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFNob290U3RpY2soKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrLXNob290XCIse2ZpcmU6dHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2tpbGxUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSA9PSBcIm9pbFwiKSB7XG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJvaWwtc2hlbGwtdHJpZ2dlclwiLCB7IHByZXNzZWQ6IGZhbHNlLCByZWxlYXNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCIpIHtcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVsZWFzZVwiLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zYWNyaWZpY2VUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJ0cmlnZ2VyLXNhY3JpZmljZVwiLCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9jb3ZlclRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdmVyVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJ0cmlnZ2VyLWNvdmVyLWFjdGlvblwiLCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGxldCBtb3ZlUmF0aW8gPSB0aGlzLl9saW1pdFN0aWNrUmFuZ2UodGhpcy5fZmlyZS5fc3ByQmcsIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLCB0aGlzLl9tb3ZlVG91Y2hQb3MsIHRoaXMuX21vdmVEaXIpO1xuICAgICAgICBpZiAobW92ZVJhdGlvID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOm1vdmVSYXRpb30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCl7XG4gICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvdmVyVG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0TW92ZVN0aWNrKCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0U2hvb3RTdGljaygpO1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3ModGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgdGhpcy5fY2hhcmdlUHJvZ3Jlc3NDb2xvcik7XG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCIpIHtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwib2lsLXNoZWxsLXRyaWdnZXJcIiwgeyBwcmVzc2VkOiBmYWxzZSwgY2FuY2VsbGVkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiam95LXN0aWNrXCIse2Rpcjp0aGlzLl9tb3ZlRGlyLCByYXRpbzowfSk7XG4gICAgfVxuXG4gICAgX2dldEN1cnJlbnRTa2lsbEJ1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSA9PSBcIm9pbFwiICYmIHRoaXMuX2ZpcmUuX3NraWxsb2lsQnRuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlyZS5fc2tpbGxvaWxCdG47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcmUuX3NraWxsQnRuO1xuICAgIH1cblxuICAgIF9nZXRDb250cm9sVHlwZShwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NhY3JpZmljZUVuYWJsZWQgJiYgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuICYmIHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi5hY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBzYWNyaWZpY2VEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgICAgIGlmIChzYWNyaWZpY2VEaXN0YW5jZSA8PSB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4ud2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic2FjcmlmaWNlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZSAmJiB0aGlzLl9maXJlLl9mZW5saV94aWZ1ICYmIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUuYWN0aXZlKSB7XG4gICAgICAgICAgICBsZXQgY292ZXJEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fZmVubGlfeGlmdS5wb3NpdGlvbikubWFnKCk7XG4gICAgICAgICAgICBpZiAoY292ZXJEaXN0YW5jZSA8PSB0aGlzLl9maXJlLl9mZW5saV94aWZ1LndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvdmVyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNraWxsQnRuID0gdGhpcy5fZ2V0Q3VycmVudFNraWxsQnV0dG9uKCk7XG4gICAgICAgIGlmIChza2lsbEJ0biAmJiBza2lsbEJ0bi5hY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBza2lsbERpc3RhbmNlID0gcG9zLnN1Yihza2lsbEJ0bi5wb3NpdGlvbikubWFnKCk7XG4gICAgICAgICAgICBpZiAoc2tpbGxEaXN0YW5jZSA8PSBza2lsbEJ0bi53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJza2lsbFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1vdmVEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24pLm1hZygpO1xuICAgICAgICBsZXQgc2hvb3REaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fc3ByQmcwMi5wb3NpdGlvbikubWFnKCk7XG4gICAgICAgIHJldHVybiBtb3ZlRGlzdGFuY2UgPD0gc2hvb3REaXN0YW5jZSA/IFwibW92ZVwiIDogXCJzaG9vdFwiO1xuICAgIH1cblxuICAgIF91cGRhdGVNb3ZlU3RpY2socG9zLCBpc1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIGlmIChpc1N0YXJ0ICYmIHRoaXMuX2ZyZWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwckJnLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hQb3MgPSBwb3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tb3ZlRGlyID0gcG9zLnN1Yih0aGlzLl9tb3ZlVG91Y2hQb3MpO1xuICAgICAgICBpZiAodGhpcy5fbW92ZURpci5tYWdTcXIoKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVEaXIgPSB0aGlzLl9tb3ZlRGlyLm5vcm1hbGl6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3ByZXNzU2hvb3RCdXR0b24ocG9zKSB7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNob290U3RpY2socG9zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLnNldFBvc2l0aW9uKHRoaXMuX3Nob290VG91Y2hQb3MpO1xuICAgIH1cblxuICAgIF91cGRhdGVTaG9vdFN0aWNrKHBvcykge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHRoaXMuX3Nob290RGlyID0gcG9zLnN1Yih0aGlzLl9zaG9vdFRvdWNoUG9zKTtcbiAgICAgICAgaWYgKHRoaXMuX3Nob290RGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3REaXIgPSB0aGlzLl9zaG9vdERpci5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzaG9vdFJhdGlvID0gdGhpcy5fbGltaXRTdGlja1JhbmdlKHRoaXMuX2ZpcmUuX3NwckJnMDIsIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIsIHRoaXMuX3Nob290VG91Y2hQb3MsIHRoaXMuX3Nob290RGlyKTtcbiAgICAgICAgaWYgKHNob290UmF0aW8gPiAwKSB7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGljay1zaG9vdFwiLHtkaXI6dGhpcy5fc2hvb3REaXIsIHJhdGlvOnNob290UmF0aW99KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZXNldE1vdmVTdGljaygpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2suc2V0UG9zaXRpb24odGhpcy5fbW92ZVRvdWNoUG9zKTtcbiAgICB9XG5cbiAgICBfcmVzZXRTaG9vdFN0aWNrKCkge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLnNldFBvc2l0aW9uKHRoaXMuX3Nob290VG91Y2hQb3MpO1xuICAgIH1cblxuICAgIF9saW1pdFN0aWNrUmFuZ2UoYmdOb2RlLCBqb3lzdGlja05vZGUsIHRvdWNoUG9zLCBkaXIpIHtcbiAgICAgICAgLy8g6ZmQ5a6a5pGH5p2G5Zyo6IyD5Zu05YaF56e75YqoXG4gICAgICAgIGxldCBsZW4gPSBqb3lzdGlja05vZGUucG9zaXRpb24uc3ViKHRvdWNoUG9zKS5tYWcoKTsgICAvLyDov5Tlm57lkJHph4/nmoTplb/luqZcbiAgICAgICAgbGV0IG1heExlbiA9IGJnTm9kZS53aWR0aCAvIDI7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluacgOWkp+WPr+enu+WKqOi3neemu1xuICAgICAgICBsZXQgcmF0aW8gPSBtYXhMZW4gPiAwID8gbGVuIC8gbWF4TGVuIDogMDsgICAgICAgICAgICAgLy8g5b2T5YmN5L2N572u5ZKM5pyA5aSn5Y+v56e75Yqo6Led56a75q+U546HXG5cbiAgICAgICAgLy8g5q+U546H5aSn5LqOMSzor7TmmI7lt7Lnu4/otoXlh7rmnIDlpKflj6/np7vliqjot53nprvkuoZcbiAgICAgICAgaWYgKGxlbiA+IG1heExlbikge1xuICAgICAgICAgICAgam95c3RpY2tOb2RlLnNldFBvc2l0aW9uKHRvdWNoUG9zLmFkZChkaXIubXVsKG1heExlbikpKTtcbiAgICAgICAgICAgIHJhdGlvID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByYXRpbztcbiAgICB9XG5cbiAgICBfaW5pdFNraWxsQnV0dG9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3NraWxsQnRuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmdOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlUHJvZ3Jlc3NCZ1wiKTtcbiAgICAgICAgYmdOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuO1xuICAgICAgICBiZ05vZGUuekluZGV4ID0gOTtcbiAgICAgICAgbGV0IGJnR3JhcGhpY3MgPSBiZ05vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgbGV0IGJnUmFkaXVzID0gdGhpcy5fZmlyZS5fc2tpbGxCdG4ud2lkdGggLyAyIC0gODtcbiAgICAgICAgYmdHcmFwaGljcy5saW5lV2lkdGggPSA2O1xuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoNzAsIDcwLCA3MCwgMTgwKTtcbiAgICAgICAgYmdHcmFwaGljcy5jaXJjbGUoMCwgMCwgYmdSYWRpdXMpO1xuICAgICAgICBiZ0dyYXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzc0JnID0gYmdOb2RlO1xuXG4gICAgICAgIGxldCBwcm9ncmVzc05vZGUgPSBuZXcgY2MuTm9kZShcIl9jaGFyZ2VQcm9ncmVzc1wiKTtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnBhcmVudCA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuO1xuICAgICAgICBwcm9ncmVzc05vZGUuekluZGV4ID0gMTA7XG4gICAgICAgIHByb2dyZXNzTm9kZS5zZXRDb250ZW50U2l6ZSh0aGlzLl9maXJlLl9za2lsbEJ0bi5nZXRDb250ZW50U2l6ZSgpKTtcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gcHJvZ3Jlc3NOb2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIHByb2dyZXNzTm9kZVtcIiRHcmFwaGljc1wiXSA9IGdyYXBoaWNzO1xuICAgICAgICB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcyA9IHByb2dyZXNzTm9kZTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgIH1cblxuICAgIF9zZXRTa2lsbEJ1dHRvbk1vZGUobW9kZSkge1xuICAgICAgICBsZXQgbmV4dE1vZGUgPSBtb2RlID09IFwib2lsXCIgPyBcIm9pbFwiIDogXCJjaGFyZ2VcIjtcbiAgICAgICAgbGV0IHByZXZNb2RlID0gdGhpcy5fc2tpbGxNb2RlO1xuICAgICAgICB0aGlzLl9za2lsbE1vZGUgPSBuZXh0TW9kZTtcbiAgICAgICAgaWYgKHByZXZNb2RlICE9IHRoaXMuX3NraWxsTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZmlyZS5fc2tpbGxCdG4pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NraWxsQnRuLmFjdGl2ZSA9IHRoaXMuX3NraWxsTW9kZSA9PSBcImNoYXJnZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9za2lsbG9pbEJ0bikge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc2tpbGxvaWxCdG4uYWN0aXZlID0gdGhpcy5fc2tpbGxNb2RlID09IFwib2lsXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcuYWN0aXZlID0gdGhpcy5fc2tpbGxNb2RlID09IFwiY2hhcmdlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy5hY3RpdmUgPSB0aGlzLl9za2lsbE1vZGUgPT0gXCJjaGFyZ2VcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3ModGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSwgdGhpcy5fY2hhcmdlUHJvZ3Jlc3NDb2xvcik7XG4gICAgfVxuXG4gICAgX2luaXRTYWNyaWZpY2VCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2tpbGxCdG4gfHwgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnRuID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlQnRuXCIpO1xuICAgICAgICBidG4ucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBidG4uekluZGV4ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG4uekluZGV4IHx8IDA7XG4gICAgICAgIGJ0bi5zZXRDb250ZW50U2l6ZSh0aGlzLl9maXJlLl9za2lsbEJ0bi5nZXRDb250ZW50U2l6ZSgpKTtcbiAgICAgICAgYnRuLnNldFBvc2l0aW9uKHRoaXMuX2ZpcmUuX3NraWxsQnRuLnBvc2l0aW9uLmFkZChjYy52MygwLCAxMTgsIDApKSk7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0biA9IGJ0bjtcblxuICAgICAgICBsZXQgb3V0ZXIgPSBidG4uYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgYnRuW1wiJEdyYXBoaWNzXCJdID0gb3V0ZXI7XG5cbiAgICAgICAgbGV0IGlubmVyID0gbmV3IGNjLk5vZGUoXCJfc2FjcmlmaWNlSW5uZXJcIik7XG4gICAgICAgIGlubmVyLnBhcmVudCA9IGJ0bjtcbiAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBpbm5lci5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBpbm5lcltcIiRHcmFwaGljc1wiXSA9IGlubmVyR3JhcGhpY3M7XG4gICAgICAgIGJ0bltcIiRJbm5lclwiXSA9IGlubmVyO1xuXG4gICAgICAgIGxldCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VMYWJlbFwiKTtcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ0bjtcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKGJ0bi53aWR0aCAtIDEyLCBidG4uaGVpZ2h0IC0gMTIpO1xuICAgICAgICBsZXQgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLnpa1cIjtcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNDtcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDM4O1xuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQ1LCAyMzIsIDI1NSk7XG4gICAgICAgIGJ0bltcIiRMYWJlbE5vZGVcIl0gPSBsYWJlbE5vZGU7XG5cbiAgICAgICAgbGV0IHRpcE5vZGUgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VUaXBcIik7XG4gICAgICAgIHRpcE5vZGUucGFyZW50ID0gYnRuO1xuICAgICAgICB0aXBOb2RlLnNldFBvc2l0aW9uKDAsIC01OCk7XG4gICAgICAgIHRpcE5vZGUuc2V0Q29udGVudFNpemUoMTIwLCAyOCk7XG4gICAgICAgIGxldCB0aXBMYWJlbCA9IHRpcE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgdGlwTGFiZWwuc3RyaW5nID0gXCLnjK7npa1cIjtcbiAgICAgICAgdGlwTGFiZWwuZm9udFNpemUgPSAxODtcbiAgICAgICAgdGlwTGFiZWwubGluZUhlaWdodCA9IDIyO1xuICAgICAgICB0aXBMYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICB0aXBMYWJlbC52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XG4gICAgICAgIHRpcE5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDE4NCwgMTYwLCAyMzUpO1xuXG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25WaXNpYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfaW5pdENvdmVyQnV0dG9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgdGhpcy5fZmlyZS5fZmVubGlfeGlmdS5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uTW9kZShcImF0dGFjaFwiKTtcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25WaXNpYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChwcmVzc2VkKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuIHx8ICF0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4uJEdyYXBoaWNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnRuID0gdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBidG4uJEdyYXBoaWNzO1xuICAgICAgICBsZXQgcmFkaXVzID0gYnRuLndpZHRoIC8gMjtcbiAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gcHJlc3NlZCA/IGNjLmNvbG9yKDEzNSwgMjAsIDM1LCAyNDUpIDogY2MuY29sb3IoOTUsIDIyLCAzMCwgMjMwKTtcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyk7XG4gICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gNjtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBwcmVzc2VkID8gY2MuY29sb3IoMjU1LCAxOTAsIDE3NSwgMjU1KSA6IGNjLmNvbG9yKDI1NSwgMTI2LCAxMDgsIDI1NSk7XG4gICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCByYWRpdXMgLSAzKTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG5cbiAgICAgICAgaWYgKGJ0bi4kSW5uZXIgJiYgYnRuLiRJbm5lci4kR3JhcGhpY3MpIHtcbiAgICAgICAgICAgIGxldCBpbm5lckdyYXBoaWNzID0gYnRuLiRJbm5lci4kR3JhcGhpY3M7XG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgICAgICBpbm5lckdyYXBoaWNzLmZpbGxDb2xvciA9IHByZXNzZWQgPyBjYy5jb2xvcigyNTUsIDEwNiwgOTIsIDI1NSkgOiBjYy5jb2xvcigyMjAsIDcyLCA2NiwgMjQ1KTtcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDEzKTtcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJ0bi4kTGFiZWxOb2RlKSB7XG4gICAgICAgICAgICBidG4uJExhYmVsTm9kZS5zY2FsZSA9IHByZXNzZWQgPyAwLjk0IDogMTtcbiAgICAgICAgfVxuICAgICAgICBidG4uc2NhbGUgPSBwcmVzc2VkID8gMC45NiA6IDE7XG4gICAgfVxuXG4gICAgX3NldFNhY3JpZmljZUJ1dHRvblZpc2libGUodmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9zYWNyaWZpY2VFbmFibGVkID0gISF2aXNpYmxlO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLmFjdGl2ZSA9IHRoaXMuX3NhY3JpZmljZUVuYWJsZWQ7XG4gICAgICAgIGlmICghdGhpcy5fc2FjcmlmaWNlRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zZXRDb3ZlckJ1dHRvblByZXNzZWQocHJlc3NlZCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1LnNjYWxlID0gcHJlc3NlZCA/IDAuOTQgOiAxO1xuICAgICAgICB0aGlzLl9maXJlLl9mZW5saV94aWZ1Lm9wYWNpdHkgPSBwcmVzc2VkID8gMjE1IDogMjU1O1xuICAgIH1cblxuICAgIF9zZXRDb3ZlckJ1dHRvbk1vZGUobW9kZSkge1xuICAgICAgICB0aGlzLl9jb3ZlckJ1dHRvbk1vZGUgPSBtb2RlID09IFwiZGV0YWNoXCIgPyBcImRldGFjaFwiIDogXCJhdHRhY2hcIjtcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX2J0bkxhYmVsICYmIHRoaXMuX2ZpcmUuX2J0bkxhYmVsLiRMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fYnRuTGFiZWwuJExhYmVsLnN0cmluZyA9IHRoaXMuX2NvdmVyQnV0dG9uTW9kZSA9PSBcImRldGFjaFwiID8gXCLliIbnprtcIiA6IFwi5ZC46ZmEXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0Q292ZXJCdXR0b25WaXNpYmxlKHZpc2libGUpIHtcbiAgICAgICAgdGhpcy5fY292ZXJCdXR0b25WaXNpYmxlID0gISF2aXNpYmxlO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZpcmUuX2ZlbmxpX3hpZnUuYWN0aXZlID0gdGhpcy5fY292ZXJCdXR0b25WaXNpYmxlO1xuICAgICAgICBpZiAoIXRoaXMuX2NvdmVyQnV0dG9uVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fY292ZXJUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NldENvdmVyQnV0dG9uUHJlc3NlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25TYWNyaWZpY2VCdXR0b25WaXNpYmxlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblZpc2libGUoZXZlbnQgJiYgZXZlbnQudmlzaWJsZSA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgX29uQ292ZXJCdXR0b25TdGF0ZShldmVudCkge1xuICAgICAgICB0aGlzLl9zZXRDb3ZlckJ1dHRvbk1vZGUoZXZlbnQgJiYgZXZlbnQubW9kZSA/IGV2ZW50Lm1vZGUgOiBcImF0dGFjaFwiKTtcbiAgICAgICAgdGhpcy5fc2V0Q292ZXJCdXR0b25WaXNpYmxlKGV2ZW50ICYmIGV2ZW50LnZpc2libGUgPT09IHRydWUpO1xuICAgIH1cblxuICAgIF9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MocHJvZ3Jlc3MsIGNvbG9yID0gY2MuY29sb3IoMjU1LCA5MCwgNTUsIDI1NSkpIHtcbiAgICAgICAgdGhpcy5fY2hhcmdlUHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzIHx8IDA7XG4gICAgICAgIHRoaXMuX2NoYXJnZVByb2dyZXNzQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcyB8fCAhdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuJEdyYXBoaWNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3NraWxsTW9kZSAhPSBcImNoYXJnZVwiKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy4kR3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncmFwaGljcyA9IHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLiRHcmFwaGljcztcbiAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuLndpZHRoIC8gMiAtIDY7XG4gICAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY29sb3I7XG4gICAgICAgIGdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiB0aGlzLl9jaGFyZ2VQcm9ncmVzc1ZhbHVlLCBmYWxzZSk7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMjAsIDIwMCwgMTgwKTtcbiAgICAgICAgZ3JhcGhpY3MuYXJjKDAsIDAsIHJhZGl1cywgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBNYXRoLlBJICogMiAqIHRoaXMuX2NoYXJnZVByb2dyZXNzVmFsdWUsIGZhbHNlKTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgX29uU2tpbGxCdXR0b25Nb2RlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3NldFNraWxsQnV0dG9uTW9kZShldmVudCAmJiBldmVudC5tb2RlID8gZXZlbnQubW9kZSA6IFwiY2hhcmdlXCIpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZVByb2dyZXNzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhldmVudC5wcm9ncmVzcyB8fCAwLCBjYy5jb2xvcigyNTUsIDkwLCA1NSwgMjU1KSk7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlQ29vbGRvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKGV2ZW50LnByb2dyZXNzIHx8IDAsIGNjLmNvbG9yKDEyMCwgMTYwLCAyNTUsIDIyMCkpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZVJlYWR5KCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMSwgY2MuY29sb3IoMjU1LCA0MCwgMjUsIDI1NSkpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZUNsZWFyKCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XG4gICAgfVxufVxuIl19