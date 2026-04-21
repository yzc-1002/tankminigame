"use strict";
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