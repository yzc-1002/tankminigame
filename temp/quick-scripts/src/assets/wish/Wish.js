"use strict";
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