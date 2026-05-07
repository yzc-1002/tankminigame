
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
        return _this;
    }
    JoyStick.prototype.onLoad = function () {
        this._moveTouchPos = this._fire._sprBg.position.clone();
        this._shootTouchPos = this._fire._sprBg02.position.clone();
        this._initSkillButton();
        this._initSacrificeButton();
        yyp.eventCenter.on("charge-cannon-progress", this._onChargeProgress, this);
        yyp.eventCenter.on("charge-cannon-cooldown", this._onChargeCooldown, this);
        yyp.eventCenter.on("charge-cannon-ready", this._onChargeReady, this);
        yyp.eventCenter.on("charge-cannon-clear", this._onChargeClear, this);
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
        yyp.eventCenter.off("sacrifice-button-visible", this._onSacrificeButtonVisible, this);
    };
    JoyStick.prototype._onTouchStart = function (event) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var touchId = event.getID();
        var controlType = this._getControlType(pos);
        if (controlType == "skill" && this._skillTouchId == null) {
            this._skillTouchId = touchId;
            this._refreshChargeProgress(0);
            yyp.eventCenter.emit("charge-cannon-press", {});
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
            yyp.eventCenter.emit("charge-cannon-release", {});
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
        this._refreshChargeProgress(0);
        this._setSacrificeButtonPressed(false);
        yyp.eventCenter.emit("joy-stick", { dir: this._moveDir, ratio: 0 });
    };
    JoyStick.prototype._getControlType = function (pos) {
        if (this._sacrificeEnabled && this._fire._sacrificeBtn && this._fire._sacrificeBtn.active) {
            var sacrificeDistance = pos.sub(this._fire._sacrificeBtn.position).mag();
            if (sacrificeDistance <= this._fire._sacrificeBtn.width / 2) {
                return "sacrifice";
            }
        }
        if (this._fire._skillBtn) {
            var skillDistance = pos.sub(this._fire._skillBtn.position).mag();
            if (skillDistance <= this._fire._skillBtn.width / 2) {
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
        if (!this._fire._chargeProgress || !this._fire._chargeProgress.$Graphics) {
            return;
        }
        var graphics = this._fire._chargeProgress.$Graphics;
        var radius = this._fire._skillBtn.width / 2 - 6;
        graphics.clear();
        if (progress <= 0) {
            return;
        }
        graphics.lineWidth = 8;
        graphics.strokeColor = color;
        graphics.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress, false);
        graphics.stroke();
        graphics.lineWidth = 3;
        graphics.strokeColor = cc.color(255, 220, 200, 180);
        graphics.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress, false);
        graphics.stroke();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBZ1hDO1FBOVdHLGNBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFTLFlBQVk7UUFDNUMsZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUN4QyxtQkFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksVUFBVTtRQUMxQyxvQkFBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUcsVUFBVTtRQUMxQyxXQUFLLEdBQUcsSUFBSSxDQUFDLENBQW1CLFVBQVU7UUFDMUMsa0JBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsdUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLHVCQUFpQixHQUFHLEtBQUssQ0FBQzs7SUFxVzlCLENBQUM7SUFuV0cseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNELElBQUksQ0FBQyxn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Q0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBL1dRLFFBQVE7UUFEcEIsT0FBTztPQUNLLFFBQVEsQ0FnWHBCO0lBQUQsZUFBQztDQWhYRCxBQWdYQyxDQWhYNkIsNkJBQWEsR0FnWDFDO0FBaFhZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgY2xhc3MgSm95U3RpY2sgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIF9tb3ZlRGlyID0gY2MudjIoMCwgMSk7ICAgICAgICAgLy/np7vliqjmkYfmnYbmlrnlkJEo5ZCR5LiKKVxuICAgIF9zaG9vdERpciA9IGNjLnYyKDEsIDApOyAgICAgICAgLy/lsITlh7vmkYfmnYbmlrnlkJFcbiAgICBfbW92ZVRvdWNoUG9zID0gY2MudjIoMCwgMCk7ICAgIC8v56e75Yqo5pGH5p2G5Yid5aeL5L2N572uXG4gICAgX3Nob290VG91Y2hQb3MgPSBjYy52MigwLCAwKTsgICAvL+WwhOWHu+aRh+adhuWIneWni+S9jee9rlxuICAgIF9mcmVlID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgLy/oh6rnlLHnp7vliqjmkYfmnYbkvY3nva5cbiAgICBfbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgIF9zaG9vdFRvdWNoSWQgPSBudWxsO1xuICAgIF9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgIF9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcbiAgICBfc2FjcmlmaWNlRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaFBvcyA9IHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5faW5pdFNraWxsQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuX2luaXRTYWNyaWZpY2VCdXR0b24oKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jb29sZG93blwiLCB0aGlzLl9vbkNoYXJnZUNvb2xkb3duLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1yZWFkeVwiLCB0aGlzLl9vbkNoYXJnZVJlYWR5LCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKFwic2FjcmlmaWNlLWJ1dHRvbi12aXNpYmxlXCIsIHRoaXMuX29uU2FjcmlmaWNlQnV0dG9uVmlzaWJsZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLXJlYWR5XCIsIHRoaXMuX29uQ2hhcmdlUmVhZHksIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcInNhY3JpZmljZS1idXR0b24tdmlzaWJsZVwiLCB0aGlzLl9vblNhY3JpZmljZUJ1dHRvblZpc2libGUsIHRoaXMpO1xuICAgIH1cblxuICAgIF9vblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgbGV0IHRvdWNoSWQgPSBldmVudC5nZXRJRCgpO1xuICAgICAgICBsZXQgY29udHJvbFR5cGUgPSB0aGlzLl9nZXRDb250cm9sVHlwZShwb3MpO1xuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJza2lsbFwiICYmIHRoaXMuX3NraWxsVG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJjaGFyZ2UtY2Fubm9uLXByZXNzXCIsIHt9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJzYWNyaWZpY2VcIiAmJiB0aGlzLl9zYWNyaWZpY2VFbmFibGVkICYmIHRoaXMuX3NhY3JpZmljZVRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwibW92ZVwiICYmIHRoaXMuX21vdmVUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vdmVTdGljayhwb3MsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250cm9sVHlwZSA9PSBcInNob290XCIgJiYgdGhpcy5fc2hvb3RUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290VG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl9wcmVzc1Nob290QnV0dG9uKHBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbW92ZVRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTW92ZVN0aWNrKHBvcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2hvb3RUb3VjaElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290VG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl9wcmVzc1Nob290QnV0dG9uKHBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgbGV0IHRvdWNoSWQgPSBldmVudC5nZXRJRCgpO1xuICAgICAgICBpZiAodG91Y2hJZCA9PSB0aGlzLl9tb3ZlVG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTW92ZVN0aWNrKHBvcywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2hvb3RUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaG9vdFN0aWNrKHBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25Ub3VjaEVuZChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGlmICh0b3VjaElkID09IHRoaXMuX21vdmVUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldE1vdmVTdGljaygpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOjB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3Nob290VG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2hvb3RTdGljaygpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2stc2hvb3RcIix7ZmlyZTp0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9za2lsbFRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVsZWFzZVwiLCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zYWNyaWZpY2VUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJ0cmlnZ2VyLXNhY3JpZmljZVwiLCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGxldCBtb3ZlUmF0aW8gPSB0aGlzLl9saW1pdFN0aWNrUmFuZ2UodGhpcy5fZmlyZS5fc3ByQmcsIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLCB0aGlzLl9tb3ZlVG91Y2hQb3MsIHRoaXMuX21vdmVEaXIpO1xuICAgICAgICBpZiAobW92ZVJhdGlvID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOm1vdmVSYXRpb30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCl7XG4gICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2FjcmlmaWNlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0TW92ZVN0aWNrKCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0U2hvb3RTdGljaygpO1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6dGhpcy5fbW92ZURpciwgcmF0aW86MH0pO1xuICAgIH1cblxuICAgIF9nZXRDb250cm9sVHlwZShwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NhY3JpZmljZUVuYWJsZWQgJiYgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuICYmIHRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi5hY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBzYWNyaWZpY2VEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgICAgIGlmIChzYWNyaWZpY2VEaXN0YW5jZSA8PSB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4ud2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic2FjcmlmaWNlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3NraWxsQnRuKSB7XG4gICAgICAgICAgICBsZXQgc2tpbGxEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fc2tpbGxCdG4ucG9zaXRpb24pLm1hZygpO1xuICAgICAgICAgICAgaWYgKHNraWxsRGlzdGFuY2UgPD0gdGhpcy5fZmlyZS5fc2tpbGxCdG4ud2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic2tpbGxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb3ZlRGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NwckJnLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgbGV0IHNob290RGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24pLm1hZygpO1xuICAgICAgICByZXR1cm4gbW92ZURpc3RhbmNlIDw9IHNob290RGlzdGFuY2UgPyBcIm1vdmVcIiA6IFwic2hvb3RcIjtcbiAgICB9XG5cbiAgICBfdXBkYXRlTW92ZVN0aWNrKHBvcywgaXNTdGFydCkge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljay5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICBpZiAoaXNTdGFydCAmJiB0aGlzLl9mcmVlKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcHJCZy5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gcG9zO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW92ZURpciA9IHBvcy5zdWIodGhpcy5fbW92ZVRvdWNoUG9zKTtcbiAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlRGlyID0gdGhpcy5fbW92ZURpci5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wcmVzc1Nob290QnV0dG9uKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaG9vdFN0aWNrKHBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbih0aGlzLl9zaG9vdFRvdWNoUG9zKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlU2hvb3RTdGljayhwb3MpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICB0aGlzLl9zaG9vdERpciA9IHBvcy5zdWIodGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgICAgIGlmICh0aGlzLl9zaG9vdERpci5tYWdTcXIoKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290RGlyID0gdGhpcy5fc2hvb3REaXIubm9ybWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hvb3RSYXRpbyA9IHRoaXMuX2xpbWl0U3RpY2tSYW5nZSh0aGlzLl9maXJlLl9zcHJCZzAyLCB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLCB0aGlzLl9zaG9vdFRvdWNoUG9zLCB0aGlzLl9zaG9vdERpcik7XG4gICAgICAgIGlmIChzaG9vdFJhdGlvID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2stc2hvb3RcIix7ZGlyOnRoaXMuX3Nob290RGlyLCByYXRpbzpzaG9vdFJhdGlvfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcmVzZXRNb3ZlU3RpY2soKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLnNldFBvc2l0aW9uKHRoaXMuX21vdmVUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX3Jlc2V0U2hvb3RTdGljaygpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbih0aGlzLl9zaG9vdFRvdWNoUG9zKTtcbiAgICB9XG5cbiAgICBfbGltaXRTdGlja1JhbmdlKGJnTm9kZSwgam95c3RpY2tOb2RlLCB0b3VjaFBvcywgZGlyKSB7XG4gICAgICAgIC8vIOmZkOWumuaRh+adhuWcqOiMg+WbtOWGheenu+WKqFxuICAgICAgICBsZXQgbGVuID0gam95c3RpY2tOb2RlLnBvc2l0aW9uLnN1Yih0b3VjaFBvcykubWFnKCk7ICAgLy8g6L+U5Zue5ZCR6YeP55qE6ZW/5bqmXG4gICAgICAgIGxldCBtYXhMZW4gPSBiZ05vZGUud2lkdGggLyAyOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5bmnIDlpKflj6/np7vliqjot53nprtcbiAgICAgICAgbGV0IHJhdGlvID0gbWF4TGVuID4gMCA/IGxlbiAvIG1heExlbiA6IDA7ICAgICAgICAgICAgIC8vIOW9k+WJjeS9jee9ruWSjOacgOWkp+WPr+enu+WKqOi3neemu+avlOeOh1xuXG4gICAgICAgIC8vIOavlOeOh+Wkp+S6jjEs6K+05piO5bey57uP6LaF5Ye65pyA5aSn5Y+v56e75Yqo6Led56a75LqGXG4gICAgICAgIGlmIChsZW4gPiBtYXhMZW4pIHtcbiAgICAgICAgICAgIGpveXN0aWNrTm9kZS5zZXRQb3NpdGlvbih0b3VjaFBvcy5hZGQoZGlyLm11bChtYXhMZW4pKSk7XG4gICAgICAgICAgICByYXRpbyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmF0aW87XG4gICAgfVxuXG4gICAgX2luaXRTa2lsbEJ1dHRvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9za2lsbEJ0bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJnTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZVByb2dyZXNzQmdcIik7XG4gICAgICAgIGJnTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9za2lsbEJ0bjtcbiAgICAgICAgYmdOb2RlLnpJbmRleCA9IDk7XG4gICAgICAgIGxldCBiZ0dyYXBoaWNzID0gYmdOb2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGxldCBiZ1JhZGl1cyA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuLndpZHRoIC8gMiAtIDg7XG4gICAgICAgIGJnR3JhcGhpY3MubGluZVdpZHRoID0gNjtcbiAgICAgICAgYmdHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDcwLCA3MCwgNzAsIDE4MCk7XG4gICAgICAgIGJnR3JhcGhpY3MuY2lyY2xlKDAsIDAsIGJnUmFkaXVzKTtcbiAgICAgICAgYmdHcmFwaGljcy5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3NCZyA9IGJnTm9kZTtcblxuICAgICAgICBsZXQgcHJvZ3Jlc3NOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlUHJvZ3Jlc3NcIik7XG4gICAgICAgIHByb2dyZXNzTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9za2lsbEJ0bjtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnpJbmRleCA9IDEwO1xuICAgICAgICBwcm9ncmVzc05vZGUuc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fc2tpbGxCdG4uZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICAgIGxldCBncmFwaGljcyA9IHByb2dyZXNzTm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBwcm9ncmVzc05vZGVbXCIkR3JhcGhpY3NcIl0gPSBncmFwaGljcztcbiAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MgPSBwcm9ncmVzc05vZGU7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcbiAgICB9XG5cbiAgICBfaW5pdFNhY3JpZmljZUJ1dHRvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9za2lsbEJ0biB8fCB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBidG4gPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VCdG5cIik7XG4gICAgICAgIGJ0bi5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGJ0bi56SW5kZXggPSB0aGlzLl9maXJlLl9za2lsbEJ0bi56SW5kZXggfHwgMDtcbiAgICAgICAgYnRuLnNldENvbnRlbnRTaXplKHRoaXMuX2ZpcmUuX3NraWxsQnRuLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAgICBidG4uc2V0UG9zaXRpb24odGhpcy5fZmlyZS5fc2tpbGxCdG4ucG9zaXRpb24uYWRkKGNjLnYzKDAsIDExOCwgMCkpKTtcbiAgICAgICAgdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuID0gYnRuO1xuXG4gICAgICAgIGxldCBvdXRlciA9IGJ0bi5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBidG5bXCIkR3JhcGhpY3NcIl0gPSBvdXRlcjtcblxuICAgICAgICBsZXQgaW5uZXIgPSBuZXcgY2MuTm9kZShcIl9zYWNyaWZpY2VJbm5lclwiKTtcbiAgICAgICAgaW5uZXIucGFyZW50ID0gYnRuO1xuICAgICAgICBsZXQgaW5uZXJHcmFwaGljcyA9IGlubmVyLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGlubmVyW1wiJEdyYXBoaWNzXCJdID0gaW5uZXJHcmFwaGljcztcbiAgICAgICAgYnRuW1wiJElubmVyXCJdID0gaW5uZXI7XG5cbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZUxhYmVsXCIpO1xuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYnRuO1xuICAgICAgICBsYWJlbE5vZGUuc2V0Q29udGVudFNpemUoYnRuLndpZHRoIC0gMTIsIGJ0bi5oZWlnaHQgLSAxMik7XG4gICAgICAgIGxldCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuelrVwiO1xuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDM0O1xuICAgICAgICBsYWJlbC5saW5lSGVpZ2h0ID0gMzg7XG4gICAgICAgIGxhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNDUsIDIzMiwgMjU1KTtcbiAgICAgICAgYnRuW1wiJExhYmVsTm9kZVwiXSA9IGxhYmVsTm9kZTtcblxuICAgICAgICBsZXQgdGlwTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX3NhY3JpZmljZVRpcFwiKTtcbiAgICAgICAgdGlwTm9kZS5wYXJlbnQgPSBidG47XG4gICAgICAgIHRpcE5vZGUuc2V0UG9zaXRpb24oMCwgLTU4KTtcbiAgICAgICAgdGlwTm9kZS5zZXRDb250ZW50U2l6ZSgxMjAsIDI4KTtcbiAgICAgICAgbGV0IHRpcExhYmVsID0gdGlwTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aXBMYWJlbC5zdHJpbmcgPSBcIueMruelrVwiO1xuICAgICAgICB0aXBMYWJlbC5mb250U2l6ZSA9IDE4O1xuICAgICAgICB0aXBMYWJlbC5saW5lSGVpZ2h0ID0gMjI7XG4gICAgICAgIHRpcExhYmVsLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIHRpcExhYmVsLnZlcnRpY2FsQWxpZ24gPSBjYy5MYWJlbC5WZXJ0aWNhbEFsaWduLkNFTlRFUjtcbiAgICAgICAgdGlwTm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMTg0LCAxNjAsIDIzNSk7XG5cbiAgICAgICAgdGhpcy5fc2V0U2FjcmlmaWNlQnV0dG9uUHJlc3NlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblZpc2libGUoZmFsc2UpO1xuICAgIH1cblxuICAgIF9zZXRTYWNyaWZpY2VCdXR0b25QcmVzc2VkKHByZXNzZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4gfHwgIXRoaXMuX2ZpcmUuX3NhY3JpZmljZUJ0bi4kR3JhcGhpY3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBidG4gPSB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG47XG4gICAgICAgIGxldCBncmFwaGljcyA9IGJ0bi4kR3JhcGhpY3M7XG4gICAgICAgIGxldCByYWRpdXMgPSBidG4ud2lkdGggLyAyO1xuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xuICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBwcmVzc2VkID8gY2MuY29sb3IoMTM1LCAyMCwgMzUsIDI0NSkgOiBjYy5jb2xvcig5NSwgMjIsIDMwLCAyMzApO1xuICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA2O1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IHByZXNzZWQgPyBjYy5jb2xvcigyNTUsIDE5MCwgMTc1LCAyNTUpIDogY2MuY29sb3IoMjU1LCAxMjYsIDEwOCwgMjU1KTtcbiAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIHJhZGl1cyAtIDMpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcblxuICAgICAgICBpZiAoYnRuLiRJbm5lciAmJiBidG4uJElubmVyLiRHcmFwaGljcykge1xuICAgICAgICAgICAgbGV0IGlubmVyR3JhcGhpY3MgPSBidG4uJElubmVyLiRHcmFwaGljcztcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgICAgIGlubmVyR3JhcGhpY3MuZmlsbENvbG9yID0gcHJlc3NlZCA/IGNjLmNvbG9yKDI1NSwgMTA2LCA5MiwgMjU1KSA6IGNjLmNvbG9yKDIyMCwgNzIsIDY2LCAyNDUpO1xuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5jaXJjbGUoMCwgMCwgcmFkaXVzIC0gMTMpO1xuICAgICAgICAgICAgaW5uZXJHcmFwaGljcy5maWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnRuLiRMYWJlbE5vZGUpIHtcbiAgICAgICAgICAgIGJ0bi4kTGFiZWxOb2RlLnNjYWxlID0gcHJlc3NlZCA/IDAuOTQgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGJ0bi5zY2FsZSA9IHByZXNzZWQgPyAwLjk2IDogMTtcbiAgICB9XG5cbiAgICBfc2V0U2FjcmlmaWNlQnV0dG9uVmlzaWJsZSh2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuX3NhY3JpZmljZUVuYWJsZWQgPSAhIXZpc2libGU7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2FjcmlmaWNlQnRuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maXJlLl9zYWNyaWZpY2VCdG4uYWN0aXZlID0gdGhpcy5fc2FjcmlmaWNlRW5hYmxlZDtcbiAgICAgICAgaWYgKCF0aGlzLl9zYWNyaWZpY2VFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zYWNyaWZpY2VUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NldFNhY3JpZmljZUJ1dHRvblByZXNzZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uU2FjcmlmaWNlQnV0dG9uVmlzaWJsZShldmVudCkge1xuICAgICAgICB0aGlzLl9zZXRTYWNyaWZpY2VCdXR0b25WaXNpYmxlKGV2ZW50ICYmIGV2ZW50LnZpc2libGUgPT09IHRydWUpO1xuICAgIH1cblxuICAgIF9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MocHJvZ3Jlc3MsIGNvbG9yID0gY2MuY29sb3IoMjU1LCA5MCwgNTUsIDI1NSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcyB8fCAhdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuJEdyYXBoaWNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JhcGhpY3MgPSB0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy4kR3JhcGhpY3M7XG4gICAgICAgIGxldCByYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA2O1xuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gODtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgZ3JhcGhpY3MuYXJjKDAsIDAsIHJhZGl1cywgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBNYXRoLlBJICogMiAqIHByb2dyZXNzLCBmYWxzZSk7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDM7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyMjAsIDIwMCwgMTgwKTtcbiAgICAgICAgZ3JhcGhpY3MuYXJjKDAsIDAsIHJhZGl1cywgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBNYXRoLlBJICogMiAqIHByb2dyZXNzLCBmYWxzZSk7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZVByb2dyZXNzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhldmVudC5wcm9ncmVzcyB8fCAwLCBjYy5jb2xvcigyNTUsIDkwLCA1NSwgMjU1KSk7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlQ29vbGRvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKGV2ZW50LnByb2dyZXNzIHx8IDAsIGNjLmNvbG9yKDEyMCwgMTYwLCAyNTUsIDIyMCkpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZVJlYWR5KCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMSwgY2MuY29sb3IoMjU1LCA0MCwgMjUsIDI1NSkpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZUNsZWFyKCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XG4gICAgfVxufVxuIl19