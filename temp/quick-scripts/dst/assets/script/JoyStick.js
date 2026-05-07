
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
        return _this;
    }
    JoyStick.prototype.onLoad = function () {
        this._moveTouchPos = this._fire._sprBg.position.clone();
        this._shootTouchPos = this._fire._sprBg02.position.clone();
        this._initSkillButton();
        yyp.eventCenter.on("charge-cannon-progress", this._onChargeProgress, this);
        yyp.eventCenter.on("charge-cannon-cooldown", this._onChargeCooldown, this);
        yyp.eventCenter.on("charge-cannon-ready", this._onChargeReady, this);
        yyp.eventCenter.on("charge-cannon-clear", this._onChargeClear, this);
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
        this._resetMoveStick();
        this._resetShootStick();
        this._refreshChargeProgress(0);
        yyp.eventCenter.emit("joy-stick", { dir: this._moveDir, ratio: 0 });
    };
    JoyStick.prototype._getControlType = function (pos) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBd1BDO1FBdFBHLGNBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFTLFlBQVk7UUFDNUMsZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUN4QyxtQkFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksVUFBVTtRQUMxQyxvQkFBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUcsVUFBVTtRQUMxQyxXQUFLLEdBQUcsSUFBSSxDQUFDLENBQW1CLFVBQVU7UUFDMUMsa0JBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsbUJBQWEsR0FBRyxJQUFJLENBQUM7O0lBK096QixDQUFDO0lBN09HLHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsS0FBSztRQUNmLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxXQUFXLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1lBQzdCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFdBQVcsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLFdBQVcsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO2FBQ0ksSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsOEJBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDbEU7YUFDSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7U0FDdkQ7YUFDSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JILElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNmLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxFQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO1NBQzFFO0lBQ0wsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxFQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLEdBQUc7UUFDZixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3RCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakUsSUFBSSxhQUFhLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDakQsT0FBTyxPQUFPLENBQUM7YUFDbEI7U0FDSjtRQUVELElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0QsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoRSxPQUFPLFlBQVksSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzVELENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBRyxFQUFFLE9BQU87UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFRCxvQ0FBaUIsR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLEdBQUcsRUFBRTtZQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxvQ0FBaUIsR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUMvQztRQUVELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1SCxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDaEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztTQUNsRjtJQUNMLENBQUM7SUFFRCxrQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsbUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsbUNBQWdCLEdBQWhCLFVBQWlCLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEdBQUc7UUFDaEQsYUFBYTtRQUNiLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUcsVUFBVTtRQUNqRSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUF5QixZQUFZO1FBQ25FLElBQUksS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFhLGlCQUFpQjtRQUV4RSx1QkFBdUI7UUFDdkIsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFO1lBQ2QsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEtBQUssR0FBRyxDQUFDLENBQUM7U0FDYjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN6QixVQUFVLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztRQUV0QyxJQUFJLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzNDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQztRQUMxQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHlDQUFzQixHQUF0QixVQUF1QixRQUFRLEVBQUUsS0FBa0M7UUFBbEMsc0JBQUEsRUFBQSxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtZQUN0RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDcEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ25CLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ25CLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBdlBRLFFBQVE7UUFEcEIsT0FBTztPQUNLLFFBQVEsQ0F3UHBCO0lBQUQsZUFBQztDQXhQRCxBQXdQQyxDQXhQNkIsNkJBQWEsR0F3UDFDO0FBeFBZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgY2xhc3MgSm95U3RpY2sgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIF9tb3ZlRGlyID0gY2MudjIoMCwgMSk7ICAgICAgICAgLy/np7vliqjmkYfmnYbmlrnlkJEo5ZCR5LiKKVxuICAgIF9zaG9vdERpciA9IGNjLnYyKDEsIDApOyAgICAgICAgLy/lsITlh7vmkYfmnYbmlrnlkJFcbiAgICBfbW92ZVRvdWNoUG9zID0gY2MudjIoMCwgMCk7ICAgIC8v56e75Yqo5pGH5p2G5Yid5aeL5L2N572uXG4gICAgX3Nob290VG91Y2hQb3MgPSBjYy52MigwLCAwKTsgICAvL+WwhOWHu+aRh+adhuWIneWni+S9jee9rlxuICAgIF9mcmVlID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgLy/oh6rnlLHnp7vliqjmkYfmnYbkvY3nva5cbiAgICBfbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgIF9zaG9vdFRvdWNoSWQgPSBudWxsO1xuICAgIF9za2lsbFRvdWNoSWQgPSBudWxsO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaFBvcyA9IHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5faW5pdFNraWxsQnV0dG9uKCk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwgdGhpcy5fb25DaGFyZ2VQcm9ncmVzcywgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwgdGhpcy5fb25DaGFyZ2VSZWFkeSwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwgdGhpcy5fb25DaGFyZ2VDbGVhciwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLXJlYWR5XCIsIHRoaXMuX29uQ2hhcmdlUmVhZHksIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICB9XG5cbiAgICBfb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcbiAgICAgICAgbGV0IGNvbnRyb2xUeXBlID0gdGhpcy5fZ2V0Q29udHJvbFR5cGUocG9zKTtcbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2tpbGxcIiAmJiB0aGlzLl9za2lsbFRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcmVzc1wiLCB7fSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJtb3ZlXCIgJiYgdGhpcy5fbW92ZVRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTW92ZVN0aWNrKHBvcywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2hvb3RcIiAmJiB0aGlzLl9zaG9vdFRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNzU2hvb3RCdXR0b24ocG9zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tb3ZlVG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zaG9vdFRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNzU2hvb3RCdXR0b24ocG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9vblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGlmICh0b3VjaElkID09IHRoaXMuX21vdmVUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9zaG9vdFRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNob290U3RpY2socG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9vblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcbiAgICAgICAgaWYgKHRvdWNoSWQgPT0gdGhpcy5fbW92ZVRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0TW92ZVN0aWNrKCk7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6dGhpcy5fbW92ZURpciwgcmF0aW86MH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvdWNoSWQgPT0gdGhpcy5fc2hvb3RUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRTaG9vdFN0aWNrKCk7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGljay1zaG9vdFwiLHtmaXJlOnRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3NraWxsVG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1yZWxlYXNlXCIsIHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgbGV0IG1vdmVSYXRpbyA9IHRoaXMuX2xpbWl0U3RpY2tSYW5nZSh0aGlzLl9maXJlLl9zcHJCZywgdGhpcy5fZmlyZS5fc3BySm95c3RpY2ssIHRoaXMuX21vdmVUb3VjaFBvcywgdGhpcy5fbW92ZURpcik7XG4gICAgICAgIGlmIChtb3ZlUmF0aW8gPiAwKSB7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6dGhpcy5fbW92ZURpciwgcmF0aW86bW92ZVJhdGlvfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKXtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG9vdFRvdWNoSWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9za2lsbFRvdWNoSWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNldE1vdmVTdGljaygpO1xuICAgICAgICB0aGlzLl9yZXNldFNob290U3RpY2soKTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6dGhpcy5fbW92ZURpciwgcmF0aW86MH0pO1xuICAgIH1cblxuICAgIF9nZXRDb250cm9sVHlwZShwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3NraWxsQnRuKSB7XG4gICAgICAgICAgICBsZXQgc2tpbGxEaXN0YW5jZSA9IHBvcy5zdWIodGhpcy5fZmlyZS5fc2tpbGxCdG4ucG9zaXRpb24pLm1hZygpO1xuICAgICAgICAgICAgaWYgKHNraWxsRGlzdGFuY2UgPD0gdGhpcy5fZmlyZS5fc2tpbGxCdG4ud2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic2tpbGxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb3ZlRGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NwckJnLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgbGV0IHNob290RGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24pLm1hZygpO1xuICAgICAgICByZXR1cm4gbW92ZURpc3RhbmNlIDw9IHNob290RGlzdGFuY2UgPyBcIm1vdmVcIiA6IFwic2hvb3RcIjtcbiAgICB9XG5cbiAgICBfdXBkYXRlTW92ZVN0aWNrKHBvcywgaXNTdGFydCkge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljay5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICBpZiAoaXNTdGFydCAmJiB0aGlzLl9mcmVlKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcHJCZy5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gcG9zO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW92ZURpciA9IHBvcy5zdWIodGhpcy5fbW92ZVRvdWNoUG9zKTtcbiAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlRGlyID0gdGhpcy5fbW92ZURpci5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wcmVzc1Nob290QnV0dG9uKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaG9vdFN0aWNrKHBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbih0aGlzLl9zaG9vdFRvdWNoUG9zKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlU2hvb3RTdGljayhwb3MpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICB0aGlzLl9zaG9vdERpciA9IHBvcy5zdWIodGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgICAgIGlmICh0aGlzLl9zaG9vdERpci5tYWdTcXIoKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob290RGlyID0gdGhpcy5fc2hvb3REaXIubm9ybWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hvb3RSYXRpbyA9IHRoaXMuX2xpbWl0U3RpY2tSYW5nZSh0aGlzLl9maXJlLl9zcHJCZzAyLCB0aGlzLl9maXJlLl9zcHJKb3lzdGljazAyLCB0aGlzLl9zaG9vdFRvdWNoUG9zLCB0aGlzLl9zaG9vdERpcik7XG4gICAgICAgIGlmIChzaG9vdFJhdGlvID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2stc2hvb3RcIix7ZGlyOnRoaXMuX3Nob290RGlyLCByYXRpbzpzaG9vdFJhdGlvfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcmVzZXRNb3ZlU3RpY2soKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLnNldFBvc2l0aW9uKHRoaXMuX21vdmVUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX3Jlc2V0U2hvb3RTdGljaygpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2swMi5zZXRQb3NpdGlvbih0aGlzLl9zaG9vdFRvdWNoUG9zKTtcbiAgICB9XG5cbiAgICBfbGltaXRTdGlja1JhbmdlKGJnTm9kZSwgam95c3RpY2tOb2RlLCB0b3VjaFBvcywgZGlyKSB7XG4gICAgICAgIC8vIOmZkOWumuaRh+adhuWcqOiMg+WbtOWGheenu+WKqFxuICAgICAgICBsZXQgbGVuID0gam95c3RpY2tOb2RlLnBvc2l0aW9uLnN1Yih0b3VjaFBvcykubWFnKCk7ICAgLy8g6L+U5Zue5ZCR6YeP55qE6ZW/5bqmXG4gICAgICAgIGxldCBtYXhMZW4gPSBiZ05vZGUud2lkdGggLyAyOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5bmnIDlpKflj6/np7vliqjot53nprtcbiAgICAgICAgbGV0IHJhdGlvID0gbWF4TGVuID4gMCA/IGxlbiAvIG1heExlbiA6IDA7ICAgICAgICAgICAgIC8vIOW9k+WJjeS9jee9ruWSjOacgOWkp+WPr+enu+WKqOi3neemu+avlOeOh1xuXG4gICAgICAgIC8vIOavlOeOh+Wkp+S6jjEs6K+05piO5bey57uP6LaF5Ye65pyA5aSn5Y+v56e75Yqo6Led56a75LqGXG4gICAgICAgIGlmIChsZW4gPiBtYXhMZW4pIHtcbiAgICAgICAgICAgIGpveXN0aWNrTm9kZS5zZXRQb3NpdGlvbih0b3VjaFBvcy5hZGQoZGlyLm11bChtYXhMZW4pKSk7XG4gICAgICAgICAgICByYXRpbyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmF0aW87XG4gICAgfVxuXG4gICAgX2luaXRTa2lsbEJ1dHRvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJlLl9za2lsbEJ0bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJnTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZVByb2dyZXNzQmdcIik7XG4gICAgICAgIGJnTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9za2lsbEJ0bjtcbiAgICAgICAgYmdOb2RlLnpJbmRleCA9IDk7XG4gICAgICAgIGxldCBiZ0dyYXBoaWNzID0gYmdOb2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGxldCBiZ1JhZGl1cyA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuLndpZHRoIC8gMiAtIDg7XG4gICAgICAgIGJnR3JhcGhpY3MubGluZVdpZHRoID0gNjtcbiAgICAgICAgYmdHcmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDcwLCA3MCwgNzAsIDE4MCk7XG4gICAgICAgIGJnR3JhcGhpY3MuY2lyY2xlKDAsIDAsIGJnUmFkaXVzKTtcbiAgICAgICAgYmdHcmFwaGljcy5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3NCZyA9IGJnTm9kZTtcblxuICAgICAgICBsZXQgcHJvZ3Jlc3NOb2RlID0gbmV3IGNjLk5vZGUoXCJfY2hhcmdlUHJvZ3Jlc3NcIik7XG4gICAgICAgIHByb2dyZXNzTm9kZS5wYXJlbnQgPSB0aGlzLl9maXJlLl9za2lsbEJ0bjtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnpJbmRleCA9IDEwO1xuICAgICAgICBwcm9ncmVzc05vZGUuc2V0Q29udGVudFNpemUodGhpcy5fZmlyZS5fc2tpbGxCdG4uZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICAgIGxldCBncmFwaGljcyA9IHByb2dyZXNzTm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBwcm9ncmVzc05vZGVbXCIkR3JhcGhpY3NcIl0gPSBncmFwaGljcztcbiAgICAgICAgdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MgPSBwcm9ncmVzc05vZGU7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcbiAgICB9XG5cbiAgICBfcmVmcmVzaENoYXJnZVByb2dyZXNzKHByb2dyZXNzLCBjb2xvciA9IGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MgfHwgIXRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLiRHcmFwaGljcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5fZmlyZS5fY2hhcmdlUHJvZ3Jlc3MuJEdyYXBoaWNzO1xuICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5fZmlyZS5fc2tpbGxCdG4ud2lkdGggLyAyIC0gNjtcbiAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDg7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gY29sb3I7XG4gICAgICAgIGdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiBwcm9ncmVzcywgZmFsc2UpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcblxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSAzO1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjIwLCAyMDAsIDE4MCk7XG4gICAgICAgIGdyYXBoaWNzLmFyYygwLCAwLCByYWRpdXMsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiBwcm9ncmVzcywgZmFsc2UpO1xuICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VQcm9ncmVzcyhldmVudCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoZXZlbnQucHJvZ3Jlc3MgfHwgMCwgY2MuY29sb3IoMjU1LCA5MCwgNTUsIDI1NSkpO1xuICAgIH1cblxuICAgIF9vbkNoYXJnZUNvb2xkb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhldmVudC5wcm9ncmVzcyB8fCAwLCBjYy5jb2xvcigxMjAsIDE2MCwgMjU1LCAyMjApKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VSZWFkeSgpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDEsIGNjLmNvbG9yKDI1NSwgNDAsIDI1LCAyNTUpKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VDbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKDApO1xuICAgIH1cbn1cbiJdfQ==