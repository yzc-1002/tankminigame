
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/wish/Wish.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '526b4bIbZhJ+qWxvAdc+XIQ', 'Wish');
// wish/Wish.ts

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
exports.Wish = void 0;
var Utils_1 = require("../script/base/Utils");
var Dialogs_1 = require("../script/base/Dialogs");
var MusicManager_1 = require("../script/base/MusicManager");
var RewardAd_1 = require("../script/ad/RewardAd");
var Analytics_1 = require("../script/ad/Analytics");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
var Wish = /** @class */ (function (_super) {
    __extends(Wish, _super);
    function Wish() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._inRotation = false; //正在旋转
        _this._rotationTime = 0;
        _this._baseAngle = 360 / 8;
        _this._accelerate = 0.25;
        _this._deceleration = 0; //减速度
        _this._speed = 0;
        _this._speedType = 0; //0 空闲 1 加速 2 高速匀速 3 减速
        _this._resultIndex = 3;
        return _this;
    }
    //加载完成
    Wish.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化事件
        this._initEvent();
    };
    Wish.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    Wish.prototype._initVariable = function () {
    };
    //初始化UI
    Wish.prototype._initUI = function () {
        Utils_1.Utils.doQAction(this._fire._btnStart);
        for (var i = 1; i <= 8; i++) {
            var element = this._fire["_award" + i];
            var angle = this._baseAngle * (i - 1);
            element.angle = angle - 90;
            var dir = Utils_1.Utils.degressToVectors(angle);
            element.position = dir.mul(150);
        }
    };
    //初始化事件
    Wish.prototype._initEvent = function () {
    };
    //销毁事件
    Wish.prototype._destroyEvent = function () {
    };
    Wish.prototype.onStartClick = function (event) {
        MusicManager_1.MusicManager.playEffect("btn"); //按钮音效
        this._resultIndex = Utils_1.Utils.randomInt(1, 9);
        if (RewardAd_1.RewardAd.getInstance().isLoad()) {
            var self_1 = this;
            RewardAd_1.RewardAd.getInstance().show(function (complete) {
                if (complete) {
                    Analytics_1.Analytics.getInstance().event('wish_video');
                    self_1._start();
                }
            });
        }
        else {
            // this._start();
        }
    };
    Wish.prototype._start = function () {
        this._speedType = 1;
        this._inRotation = true;
        this._fire._btnStart.stopAllActions();
        this._fire._btnStart.$Button.interactable = false;
    };
    //获取目标角度
    Wish.prototype.getAngle = function (index) {
        var ret = (this._baseAngle * (index - 1) * -1) + 90;
        return Utils_1.Utils.correctionAngle360(ret);
    };
    //获取减速度
    Wish.prototype.getDeceleration = function (resultAngle) {
        if (resultAngle > this._fire._wishPanel.angle) {
            resultAngle -= 360;
        }
        var diffAngle = Math.abs(resultAngle - this._fire._wishPanel.angle);
        if (diffAngle < 180) {
            diffAngle += 360;
        }
        cc.log(diffAngle);
        var a = (this._speed * this._speed) / (diffAngle * 2 + this._speed);
        return a;
    };
    //重置
    Wish.prototype._reset = function () {
        this._fire._btnStart.$Button.interactable = true;
        Utils_1.Utils.doQAction(this._fire._btnStart);
        this._speedType = 0;
        this._speed == 0;
        this._inRotation = false;
        this._rotationTime = 0;
    };
    //经过缝隙
    Wish.prototype.afterGap = function (preAngle, nextAngle) {
        for (var i = 1; i <= 8; i++) {
            var angle = this._baseAngle * (i - 0.5);
            if (preAngle >= angle && nextAngle <= angle) {
                return true;
            }
        }
        return false;
    };
    Wish.prototype.update = function (dt) {
        if (this._inRotation) {
            this._rotationTime += dt;
            if (this._speedType == 1) {
                this._speed += this._accelerate;
                if (this._rotationTime >= 1) {
                    this._speedType = 2;
                }
            }
            else if (this._speedType == 2) {
                if (this._rotationTime >= 2) {
                    this._speedType = 3;
                    var resultAngle = this.getAngle(this._resultIndex);
                    this._deceleration = this.getDeceleration(resultAngle);
                    return;
                }
            }
            else if (this._speedType == 3) {
                this._speed -= this._deceleration;
                this._speed = this._speed < 0 ? 0 : this._speed;
                if (this._speed == 0) {
                    yyp.eventCenter.emit('add-coin', { count: this._resultIndex * 100, position: Utils_1.Utils.getWorldPosition(this._fire["_award" + this._resultIndex]), p: "转盘获取" });
                    this._reset();
                }
            }
            var preAngle = this._fire._wishPanel.angle;
            var nextAngle = Utils_1.Utils.correctionAngle360(this._fire._wishPanel.angle - this._speed);
            this._fire._wishPanel.angle = nextAngle;
            //拨片
            if (this.afterGap(preAngle, nextAngle)) {
                this._fire._wishArrow.stopAllActions();
                this._fire._wishArrow.runAction(cc.sequence(cc.rotateTo(0.03, -30), cc.rotateTo(0.03, 0)));
            }
        }
    };
    Wish = __decorate([
        ccclass
    ], Wish);
    return Wish;
}(Dialogs_1.Dialogs));
exports.Wish = Wish;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUV4QyxJQUFJO1lBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN2QyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUNyQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FDdEIsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUF2S1EsSUFBSTtRQURoQixPQUFPO09BQ0ssSUFBSSxDQXdLaEI7SUFBRCxXQUFDO0NBeEtELEFBd0tDLENBeEt5QixpQkFBTyxHQXdLaEM7QUF4S1ksb0JBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1V0aWxzfSBmcm9tIFwiLi4vc2NyaXB0L2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHtEaWFsb2dzfSBmcm9tIFwiLi4vc2NyaXB0L2Jhc2UvRGlhbG9nc1wiO1xyXG5pbXBvcnQge011c2ljTWFuYWdlcn0gZnJvbSBcIi4uL3NjcmlwdC9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5cclxuaW1wb3J0IHtSZXdhcmRBZH0gZnJvbSBcIi4uL3NjcmlwdC9hZC9SZXdhcmRBZFwiO1xyXG5pbXBvcnQge0FuYWx5dGljc30gZnJvbSBcIi4uL3NjcmlwdC9hZC9BbmFseXRpY3NcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLy/np4HmnInlh73mlbAs6K+35L2/55SoJ18n5byA5aS0XHJcbi8v6K+35L+u5pS5J05ld0NsYXNzJyA9PiDoh6rlt7HnmoTnsbvlkI1cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFdpc2ggZXh0ZW5kcyBEaWFsb2dzIHtcclxuXHJcbiAgICBfaW5Sb3RhdGlvbiA9IGZhbHNlOyAgICAvL+ato+WcqOaXi+i9rFxyXG4gICAgX3JvdGF0aW9uVGltZSA9IDA7XHJcbiAgICBfYmFzZUFuZ2xlID0gMzYwLzg7XHJcbiAgICBfYWNjZWxlcmF0ZSA9IDAuMjU7XHJcbiAgICBfZGVjZWxlcmF0aW9uID0gMDsgIC8v5YeP6YCf5bqmXHJcbiAgICBfc3BlZWQgPSAwO1xyXG4gICAgX3NwZWVkVHlwZSA9IDA7IC8vMCDnqbrpl7IgMSDliqDpgJ8gMiDpq5jpgJ/ljIDpgJ8gMyDlh4/pgJ9cclxuXHJcbiAgICBfcmVzdWx0SW5kZXggPSAzO1xyXG5cclxuICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZVSVxyXG4gICAgICAgIHRoaXMuX2luaXRVSSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWVUlcclxuICAgIF9pbml0VUkoKXtcclxuICAgICAgICBVdGlscy5kb1FBY3Rpb24odGhpcy5fZmlyZS5fYnRuU3RhcnQpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA4OyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2ZpcmVbXCJfYXdhcmRcIiArIGldO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLl9iYXNlQW5nbGUgKiAoaS0xKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hbmdsZSA9IGFuZ2xlIC0gOTA7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlyID0gVXRpbHMuZGVncmVzc1RvVmVjdG9ycyhhbmdsZSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucG9zaXRpb24gPSBkaXIubXVsKDE1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvblN0YXJ0Q2xpY2soZXZlbnQpe1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpOyAgICAvL+aMiemSrumfs+aViFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Jlc3VsdEluZGV4ID0gVXRpbHMucmFuZG9tSW50KDEsOSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChSZXdhcmRBZC5nZXRJbnN0YW5jZSgpLmlzTG9hZCgpKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgUmV3YXJkQWQuZ2V0SW5zdGFuY2UoKS5zaG93KGZ1bmN0aW9uKGNvbXBsZXRlKXtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50KCd3aXNoX3ZpZGVvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX3N0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBfc3RhcnQoKXtcclxuICAgICAgICB0aGlzLl9zcGVlZFR5cGUgPSAxO1xyXG4gICAgICAgIHRoaXMuX2luUm90YXRpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2J0blN0YXJ0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYnRuU3RhcnQuJEJ1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluebruagh+inkuW6plxyXG4gICAgZ2V0QW5nbGUoaW5kZXgpe1xyXG4gICAgICAgIGxldCByZXQgPSAodGhpcy5fYmFzZUFuZ2xlICogKGluZGV4LTEpICogLTEpICsgOTBcclxuICAgICAgICByZXR1cm4gVXRpbHMuY29ycmVjdGlvbkFuZ2xlMzYwKHJldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blh4/pgJ/luqZcclxuICAgIGdldERlY2VsZXJhdGlvbihyZXN1bHRBbmdsZSl7XHJcbiAgICAgICAgaWYgKHJlc3VsdEFuZ2xlID4gdGhpcy5fZmlyZS5fd2lzaFBhbmVsLmFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdEFuZ2xlIC09IDM2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpZmZBbmdsZSA9IE1hdGguYWJzKHJlc3VsdEFuZ2xlIC0gdGhpcy5fZmlyZS5fd2lzaFBhbmVsLmFuZ2xlKTtcclxuICAgICAgICBpZiAoZGlmZkFuZ2xlIDwgMTgwKSB7XHJcbiAgICAgICAgICAgIGRpZmZBbmdsZSArPSAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmxvZyhkaWZmQW5nbGUpO1xyXG4gICAgICAgIGxldCBhID0gKHRoaXMuX3NwZWVkKnRoaXMuX3NwZWVkKS8oZGlmZkFuZ2xlKjIrdGhpcy5fc3BlZWQpO1xyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+mHjee9rlxyXG4gICAgX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fYnRuU3RhcnQuJEJ1dHRvbi5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgIFV0aWxzLmRvUUFjdGlvbih0aGlzLl9maXJlLl9idG5TdGFydCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NwZWVkVHlwZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPT0gMDtcclxuICAgICAgICB0aGlzLl9pblJvdGF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcm90YXRpb25UaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+e7j+i/h+e8nemamVxyXG4gICAgYWZ0ZXJHYXAocHJlQW5nbGUsIG5leHRBbmdsZSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gODsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHRoaXMuX2Jhc2VBbmdsZSAqIChpLTAuNSk7XHJcbiAgICAgICAgICAgIGlmIChwcmVBbmdsZSA+PSBhbmdsZSAmJiBuZXh0QW5nbGUgPD0gYW5nbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpe1xyXG4gICAgICAgIGlmICh0aGlzLl9pblJvdGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0aW9uVGltZSArPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NwZWVkVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZCArPSB0aGlzLl9hY2NlbGVyYXRlO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JvdGF0aW9uVGltZSA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BlZWRUeXBlID0gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9zcGVlZFR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JvdGF0aW9uVGltZSA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BlZWRUeXBlID0gMztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0QW5nbGUgPSB0aGlzLmdldEFuZ2xlKHRoaXMuX3Jlc3VsdEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWNlbGVyYXRpb24gPSB0aGlzLmdldERlY2VsZXJhdGlvbihyZXN1bHRBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NwZWVkVHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZCAtPSB0aGlzLl9kZWNlbGVyYXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZCA9IHRoaXMuX3NwZWVkIDwgMCA/IDAgOiB0aGlzLl9zcGVlZDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NwZWVkID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgnYWRkLWNvaW4nLHtjb3VudDp0aGlzLl9yZXN1bHRJbmRleCoxMDAscG9zaXRpb246VXRpbHMuZ2V0V29ybGRQb3NpdGlvbih0aGlzLl9maXJlW1wiX2F3YXJkXCIgKyB0aGlzLl9yZXN1bHRJbmRleF0pLHA6XCLovaznm5jojrflj5ZcIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwcmVBbmdsZSA9IHRoaXMuX2ZpcmUuX3dpc2hQYW5lbC5hbmdsZTtcclxuICAgICAgICAgICAgbGV0IG5leHRBbmdsZSA9IFV0aWxzLmNvcnJlY3Rpb25BbmdsZTM2MCh0aGlzLl9maXJlLl93aXNoUGFuZWwuYW5nbGUgLSB0aGlzLl9zcGVlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3dpc2hQYW5lbC5hbmdsZSA9IG5leHRBbmdsZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5ouo54mHXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyR2FwKHByZUFuZ2xlLCBuZXh0QW5nbGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl93aXNoQXJyb3cuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3dpc2hBcnJvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4wMywtMzApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMDMsMClcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==