
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
            this._pressShootButton();
            return;
        }
        if (this._moveTouchId == null) {
            this._moveTouchId = touchId;
            this._updateMoveStick(pos, true);
        }
        else if (this._shootTouchId == null) {
            this._shootTouchId = touchId;
            this._pressShootButton();
        }
    };
    JoyStick.prototype._onTouchMove = function (event) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var touchId = event.getID();
        if (touchId == this._moveTouchId) {
            this._updateMoveStick(pos, false);
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
    JoyStick.prototype._pressShootButton = function () {
        // 右侧不再承担方向控制，只作为点击发射按钮使用
        this._fire._sprJoystick02.setPosition(this._shootTouchPos);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBb09DO1FBbE9HLGNBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFTLFlBQVk7UUFDNUMsbUJBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFJLFVBQVU7UUFDMUMsb0JBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFHLFVBQVU7UUFDMUMsV0FBSyxHQUFHLElBQUksQ0FBQyxDQUFtQixVQUFVO1FBQzFDLGtCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLG1CQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG1CQUFhLEdBQUcsSUFBSSxDQUFDOztJQTROekIsQ0FBQztJQTFORyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxXQUFXLENBQUMs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S0FBSztRQUNuQixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxvQ0FBaUIsR0FBakIsVUFBa0IsS0FBSztRQUNuQixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQW5PUSxRQUFRO1FBRHBCLE9BQU87T0FDSyxRQUFRLENBb09wQjtJQUFELGVBQUM7Q0FwT0QsQUFvT0MsQ0FwTzZCLDZCQUFhLEdBb08xQztBQXBPWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIEpveVN0aWNrIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBfbW92ZURpciA9IGNjLnYyKDAsIDEpOyAgICAgICAgIC8v56e75Yqo5pGH5p2G5pa55ZCRKOWQkeS4iilcbiAgICBfbW92ZVRvdWNoUG9zID0gY2MudjIoMCwgMCk7ICAgIC8v56e75Yqo5pGH5p2G5Yid5aeL5L2N572uXG4gICAgX3Nob290VG91Y2hQb3MgPSBjYy52MigwLCAwKTsgICAvL+WwhOWHu+aRh+adhuWIneWni+S9jee9rlxuICAgIF9mcmVlID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgLy/oh6rnlLHnp7vliqjmkYfmnYbkvY3nva5cbiAgICBfbW92ZVRvdWNoSWQgPSBudWxsO1xuICAgIF9zaG9vdFRvdWNoSWQgPSBudWxsO1xuICAgIF9za2lsbFRvdWNoSWQgPSBudWxsO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5fbW92ZVRvdWNoUG9zID0gdGhpcy5fZmlyZS5fc3ByQmcucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaFBvcyA9IHRoaXMuX2ZpcmUuX3NwckJnMDIucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgdGhpcy5faW5pdFNraWxsQnV0dG9uKCk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tcHJvZ3Jlc3NcIiwgdGhpcy5fb25DaGFyZ2VQcm9ncmVzcywgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tcmVhZHlcIiwgdGhpcy5fb25DaGFyZ2VSZWFkeSwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbihcImNoYXJnZS1jYW5ub24tY2xlYXJcIiwgdGhpcy5fb25DaGFyZ2VDbGVhciwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1wcm9ncmVzc1wiLCB0aGlzLl9vbkNoYXJnZVByb2dyZXNzLCB0aGlzKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZihcImNoYXJnZS1jYW5ub24tY29vbGRvd25cIiwgdGhpcy5fb25DaGFyZ2VDb29sZG93biwgdGhpcyk7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoXCJjaGFyZ2UtY2Fubm9uLXJlYWR5XCIsIHRoaXMuX29uQ2hhcmdlUmVhZHksIHRoaXMpO1xuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKFwiY2hhcmdlLWNhbm5vbi1jbGVhclwiLCB0aGlzLl9vbkNoYXJnZUNsZWFyLCB0aGlzKTtcbiAgICB9XG5cbiAgICBfb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIGxldCB0b3VjaElkID0gZXZlbnQuZ2V0SUQoKTtcbiAgICAgICAgbGV0IGNvbnRyb2xUeXBlID0gdGhpcy5fZ2V0Q29udHJvbFR5cGUocG9zKTtcbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2tpbGxcIiAmJiB0aGlzLl9za2lsbFRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcbiAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwiY2hhcmdlLWNhbm5vbi1wcmVzc1wiLCB7fSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbFR5cGUgPT0gXCJtb3ZlXCIgJiYgdGhpcy5fbW92ZVRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvdWNoSWQgPSB0b3VjaElkO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTW92ZVN0aWNrKHBvcywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IFwic2hvb3RcIiAmJiB0aGlzLl9zaG9vdFRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNzU2hvb3RCdXR0b24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tb3ZlVG91Y2hJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IHRvdWNoSWQ7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zaG9vdFRvdWNoSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gdG91Y2hJZDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNzU2hvb3RCdXR0b24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9vblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGlmICh0b3VjaElkID09IHRoaXMuX21vdmVUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb3ZlU3RpY2socG9zLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25Ub3VjaEVuZChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGlmICh0b3VjaElkID09IHRoaXMuX21vdmVUb3VjaElkKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldE1vdmVTdGljaygpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOjB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaElkID09IHRoaXMuX3Nob290VG91Y2hJZCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2hvb3RTdGljaygpO1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2stc2hvb3RcIix7ZmlyZTp0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG91Y2hJZCA9PSB0aGlzLl9za2lsbFRvdWNoSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NraWxsVG91Y2hJZCA9IG51bGw7XG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImNoYXJnZS1jYW5ub24tcmVsZWFzZVwiLCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGxldCBtb3ZlUmF0aW8gPSB0aGlzLl9saW1pdFN0aWNrUmFuZ2UodGhpcy5fZmlyZS5fc3ByQmcsIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLCB0aGlzLl9tb3ZlVG91Y2hQb3MsIHRoaXMuX21vdmVEaXIpO1xuICAgICAgICBpZiAobW92ZVJhdGlvID4gMCkge1xuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOm1vdmVSYXRpb30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCl7XG4gICAgICAgIHRoaXMuX21vdmVUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvb3RUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2tpbGxUb3VjaElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNb3ZlU3RpY2soKTtcbiAgICAgICAgdGhpcy5fcmVzZXRTaG9vdFN0aWNrKCk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJqb3ktc3RpY2tcIix7ZGlyOnRoaXMuX21vdmVEaXIsIHJhdGlvOjB9KTtcbiAgICB9XG5cbiAgICBfZ2V0Q29udHJvbFR5cGUocG9zKSB7XG4gICAgICAgIGlmICh0aGlzLl9maXJlLl9za2lsbEJ0bikge1xuICAgICAgICAgICAgbGV0IHNraWxsRGlzdGFuY2UgPSBwb3Muc3ViKHRoaXMuX2ZpcmUuX3NraWxsQnRuLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgICAgIGlmIChza2lsbERpc3RhbmNlIDw9IHRoaXMuX2ZpcmUuX3NraWxsQnRuLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInNraWxsXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbW92ZURpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zcHJCZy5wb3NpdGlvbikubWFnKCk7XG4gICAgICAgIGxldCBzaG9vdERpc3RhbmNlID0gcG9zLnN1Yih0aGlzLl9maXJlLl9zcHJCZzAyLnBvc2l0aW9uKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIG1vdmVEaXN0YW5jZSA8PSBzaG9vdERpc3RhbmNlID8gXCJtb3ZlXCIgOiBcInNob290XCI7XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1vdmVTdGljayhwb3MsIGlzU3RhcnQpIHtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2suc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgdGhpcy5fZnJlZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3ByQmcuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgIHRoaXMuX21vdmVUb3VjaFBvcyA9IHBvcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vdmVEaXIgPSBwb3Muc3ViKHRoaXMuX21vdmVUb3VjaFBvcyk7XG4gICAgICAgIGlmICh0aGlzLl9tb3ZlRGlyLm1hZ1NxcigpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbW92ZURpciA9IHRoaXMuX21vdmVEaXIubm9ybWFsaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcHJlc3NTaG9vdEJ1dHRvbigpIHtcbiAgICAgICAgLy8g5Y+z5L6n5LiN5YaN5om/5ouF5pa55ZCR5o6n5Yi277yM5Y+q5L2c5Li654K55Ye75Y+R5bCE5oyJ6ZKu5L2/55SoXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24odGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX3Jlc2V0TW92ZVN0aWNrKCkge1xuICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljay5zZXRQb3NpdGlvbih0aGlzLl9tb3ZlVG91Y2hQb3MpO1xuICAgIH1cblxuICAgIF9yZXNldFNob290U3RpY2soKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrMDIuc2V0UG9zaXRpb24odGhpcy5fc2hvb3RUb3VjaFBvcyk7XG4gICAgfVxuXG4gICAgX2xpbWl0U3RpY2tSYW5nZShiZ05vZGUsIGpveXN0aWNrTm9kZSwgdG91Y2hQb3MsIGRpcikge1xuICAgICAgICAvLyDpmZDlrprmkYfmnYblnKjojIPlm7TlhoXnp7vliqhcbiAgICAgICAgbGV0IGxlbiA9IGpveXN0aWNrTm9kZS5wb3NpdGlvbi5zdWIodG91Y2hQb3MpLm1hZygpOyAgIC8vIOi/lOWbnuWQkemHj+eahOmVv+W6plxuICAgICAgICBsZXQgbWF4TGVuID0gYmdOb2RlLndpZHRoIC8gMjsgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5pyA5aSn5Y+v56e75Yqo6Led56a7XG4gICAgICAgIGxldCByYXRpbyA9IG1heExlbiA+IDAgPyBsZW4gLyBtYXhMZW4gOiAwOyAgICAgICAgICAgICAvLyDlvZPliY3kvY3nva7lkozmnIDlpKflj6/np7vliqjot53nprvmr5TnjodcblxuICAgICAgICAvLyDmr5TnjoflpKfkuo4xLOivtOaYjuW3sue7j+i2heWHuuacgOWkp+WPr+enu+WKqOi3neemu+S6hlxuICAgICAgICBpZiAobGVuID4gbWF4TGVuKSB7XG4gICAgICAgICAgICBqb3lzdGlja05vZGUuc2V0UG9zaXRpb24odG91Y2hQb3MuYWRkKGRpci5tdWwobWF4TGVuKSkpO1xuICAgICAgICAgICAgcmF0aW8gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhdGlvO1xuICAgIH1cblxuICAgIF9pbml0U2tpbGxCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlyZS5fc2tpbGxCdG4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiZ05vZGUgPSBuZXcgY2MuTm9kZShcIl9jaGFyZ2VQcm9ncmVzc0JnXCIpO1xuICAgICAgICBiZ05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIGJnTm9kZS56SW5kZXggPSA5O1xuICAgICAgICBsZXQgYmdHcmFwaGljcyA9IGJnTm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICBsZXQgYmdSYWRpdXMgPSB0aGlzLl9maXJlLl9za2lsbEJ0bi53aWR0aCAvIDIgLSA4O1xuICAgICAgICBiZ0dyYXBoaWNzLmxpbmVXaWR0aCA9IDY7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcig3MCwgNzAsIDcwLCAxODApO1xuICAgICAgICBiZ0dyYXBoaWNzLmNpcmNsZSgwLCAwLCBiZ1JhZGl1cyk7XG4gICAgICAgIGJnR3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzQmcgPSBiZ05vZGU7XG5cbiAgICAgICAgbGV0IHByb2dyZXNzTm9kZSA9IG5ldyBjYy5Ob2RlKFwiX2NoYXJnZVByb2dyZXNzXCIpO1xuICAgICAgICBwcm9ncmVzc05vZGUucGFyZW50ID0gdGhpcy5fZmlyZS5fc2tpbGxCdG47XG4gICAgICAgIHByb2dyZXNzTm9kZS56SW5kZXggPSAxMDtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlLnNldENvbnRlbnRTaXplKHRoaXMuX2ZpcmUuX3NraWxsQnRuLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBwcm9ncmVzc05vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcbiAgICAgICAgcHJvZ3Jlc3NOb2RlW1wiJEdyYXBoaWNzXCJdID0gZ3JhcGhpY3M7XG4gICAgICAgIHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzID0gcHJvZ3Jlc3NOb2RlO1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoMCk7XG4gICAgfVxuXG4gICAgX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcyhwcm9ncmVzcywgY29sb3IgPSBjYy5jb2xvcigyNTUsIDkwLCA1NSwgMjU1KSkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzIHx8ICF0aGlzLl9maXJlLl9jaGFyZ2VQcm9ncmVzcy4kR3JhcGhpY3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncmFwaGljcyA9IHRoaXMuX2ZpcmUuX2NoYXJnZVByb2dyZXNzLiRHcmFwaGljcztcbiAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMuX2ZpcmUuX3NraWxsQnRuLndpZHRoIC8gMiAtIDY7XG4gICAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBncmFwaGljcy5saW5lV2lkdGggPSA4O1xuICAgICAgICBncmFwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xuICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzLCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogcHJvZ3Jlc3MsIGZhbHNlKTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG5cbiAgICAgICAgZ3JhcGhpY3MubGluZVdpZHRoID0gMztcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIyMCwgMjAwLCAxODApO1xuICAgICAgICBncmFwaGljcy5hcmMoMCwgMCwgcmFkaXVzLCAtTWF0aC5QSSAvIDIsIC1NYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogcHJvZ3Jlc3MsIGZhbHNlKTtcbiAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlUHJvZ3Jlc3MoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaENoYXJnZVByb2dyZXNzKGV2ZW50LnByb2dyZXNzIHx8IDAsIGNjLmNvbG9yKDI1NSwgOTAsIDU1LCAyNTUpKTtcbiAgICB9XG5cbiAgICBfb25DaGFyZ2VDb29sZG93bihldmVudCkge1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2hhcmdlUHJvZ3Jlc3MoZXZlbnQucHJvZ3Jlc3MgfHwgMCwgY2MuY29sb3IoMTIwLCAxNjAsIDI1NSwgMjIwKSk7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygxLCBjYy5jb2xvcigyNTUsIDQwLCAyNSwgMjU1KSk7XG4gICAgfVxuXG4gICAgX29uQ2hhcmdlQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDaGFyZ2VQcm9ncmVzcygwKTtcbiAgICB9XG59XG4iXX0=