
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
        _this._dir = cc.v2(0, 1); //初始方向(向上)
        _this._touchPos = cc.v2(0, 0); //初始位置
        _this._free = true; //自由移动摇杆位置
        return _this;
    }
    JoyStick.prototype.onLoad = function () {
        this._touchPos = this._fire._sprBg.position;
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
    };
    JoyStick.prototype._onTouchStart = function (event) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this._fire._sprJoystick.setPosition(pos);
        if (this._free) {
            this._fire._sprBg.setPosition(pos);
            this._touchPos = pos;
        }
        // 获取当前坐标的向量
        this._dir = (pos.sub(this._touchPos)).normalize();
    };
    JoyStick.prototype._onTouchMove = function (event) {
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this._fire._sprJoystick.setPosition(pos);
        // 获取当前坐标的向量
        this._dir = (pos.sub(this._touchPos)).normalize();
    };
    JoyStick.prototype._onTouchEnd = function (event) {
        // reset
        this._fire._sprJoystick.setPosition(this._touchPos);
    };
    JoyStick.prototype.update = function (dt) {
        // 限定摇杆在范围内移动
        var len = this._fire._sprJoystick.position.sub(this._touchPos).mag(); // 返回向量的长度
        var maxLen = this._fire._sprBg.width / 2; // 获取最大可移动距离
        var ratio = len / maxLen; // 当前位置和最大可移动距离比率
        // 比率大于1,说明已经超出最大可移动距离了
        if (len > maxLen) {
            //相当于x/ratio,y/ratio
            this._fire._sprJoystick.setPosition(this._touchPos.add(this._dir.mul(maxLen)));
            ratio = 1;
        }
        if (ratio > 0) {
            yyp.eventCenter.emit("joy-stick", { dir: this._dir, ratio: ratio });
        }
    };
    JoyStick.prototype.onDisable = function () {
        // reset
        this._fire._sprJoystick.setPosition(this._touchPos);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThCLDRCQUFhO0lBQTNDO1FBQUEscUVBcUVDO1FBbkVHLFVBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFTLFVBQVU7UUFDdEMsZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksTUFBTTtRQUNsQyxXQUFLLEdBQUcsSUFBSSxDQUFDLENBQWUsVUFBVTs7SUFpRTFDLENBQUM7SUEvREcseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxD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Q0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDLENBQUM7WUFDakYsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNiO1FBRUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLFFBQVE7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFwRVEsUUFBUTtRQURwQixPQUFPO09BQ0ssUUFBUSxDQXFFcEI7SUFBRCxlQUFDO0NBckVELEFBcUVDLENBckU2Qiw2QkFBYSxHQXFFMUM7QUFyRVksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBKb3lTdGljayBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIF9kaXIgPSBjYy52MigwLCAxKTsgICAgICAgICAvL+WIneWni+aWueWQkSjlkJHkuIopXHJcbiAgICBfdG91Y2hQb3MgPSBjYy52MigwLCAwKTsgICAgLy/liJ3lp4vkvY3nva5cclxuICAgIF9mcmVlID0gdHJ1ZTsgICAgICAgICAgICAgICAvL+iHqueUseenu+WKqOaRh+adhuS9jee9rlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fdG91Y2hQb3MgPSB0aGlzLl9maXJlLl9zcHJCZy5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZyZWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3ByQmcuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fdG91Y2hQb3MgPSBwb3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDojrflj5blvZPliY3lnZDmoIfnmoTlkJHph49cclxuICAgICAgICB0aGlzLl9kaXIgPSAocG9zLnN1Yih0aGlzLl90b3VjaFBvcykpLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vblRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2suc2V0UG9zaXRpb24ocG9zKTtcclxuXHJcbiAgICAgICAgLy8g6I635Y+W5b2T5YmN5Z2Q5qCH55qE5ZCR6YePXHJcbiAgICAgICAgdGhpcy5fZGlyID0gKHBvcy5zdWIodGhpcy5fdG91Y2hQb3MpKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Ub3VjaEVuZChldmVudCkge1xyXG4gICAgICAgIC8vIHJlc2V0XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BySm95c3RpY2suc2V0UG9zaXRpb24odGhpcy5fdG91Y2hQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICAvLyDpmZDlrprmkYfmnYblnKjojIPlm7TlhoXnp7vliqhcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5fZmlyZS5fc3BySm95c3RpY2sucG9zaXRpb24uc3ViKHRoaXMuX3RvdWNoUG9zKS5tYWcoKTsgICAvLyDov5Tlm57lkJHph4/nmoTplb/luqZcclxuICAgICAgICBsZXQgbWF4TGVuID0gdGhpcy5fZmlyZS5fc3ByQmcud2lkdGggLyAyOyAgICAgICAgICAgICAgICAgICAvLyDojrflj5bmnIDlpKflj6/np7vliqjot53nprtcclxuICAgICAgICBsZXQgcmF0aW8gPSBsZW4gLyBtYXhMZW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5b2T5YmN5L2N572u5ZKM5pyA5aSn5Y+v56e75Yqo6Led56a75q+U546HXHJcblxyXG4gICAgICAgIC8vIOavlOeOh+Wkp+S6jjEs6K+05piO5bey57uP6LaF5Ye65pyA5aSn5Y+v56e75Yqo6Led56a75LqGXHJcbiAgICAgICAgaWYgKGxlbiA+IG1heExlbikge1xyXG4gICAgICAgICAgICAvL+ebuOW9k+S6jngvcmF0aW8seS9yYXRpb1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcHJKb3lzdGljay5zZXRQb3NpdGlvbih0aGlzLl90b3VjaFBvcy5hZGQoIHRoaXMuX2Rpci5tdWwobWF4TGVuKSApKTtcclxuICAgICAgICAgICAgcmF0aW8gPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcImpveS1zdGlja1wiLHtkaXI6dGhpcy5fZGlyLCByYXRpbzpyYXRpb30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKXtcclxuICAgICAgICAvLyByZXNldFxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckpveXN0aWNrLnNldFBvc2l0aW9uKHRoaXMuX3RvdWNoUG9zKTtcclxuICAgIH1cclxufVxyXG4iXX0=