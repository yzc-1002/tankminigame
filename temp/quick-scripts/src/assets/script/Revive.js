"use strict";
cc._RF.push(module, 'ca2351PNUtMv6kYz8DqgRHt', 'Revive');
// script/Revive.ts

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
exports.Revive = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
// import {Dialogs} from "./base/Dialogs";
var Utils_1 = require("./base/Utils");
var Analytics_1 = require("./ad/Analytics");
var RewardAd_1 = require("./ad/RewardAd");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
//弹窗需要继承Dialogs
var Revive = /** @class */ (function (_super) {
    __extends(Revive, _super);
    function Revive() {
        //私有属性,请使用'_'开头,驼峰命名
        // _maxSpeed = 3;  //最大速度
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._allTime = 3;
        _this._startTime = 0;
        _this._levelId = 0;
        _this._start = false;
        return _this;
    }
    //加载完成
    Revive.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化事件
        this._initEvent();
    };
    Revive.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    Revive.prototype._initVariable = function () {
    };
    //初始化UI
    Revive.prototype._initUI = function () {
    };
    //初始化事件
    Revive.prototype._initEvent = function () {
    };
    //销毁事件
    Revive.prototype._destroyEvent = function () {
    };
    //每帧调用
    Revive.prototype.update = function (dt) {
        if (this._start) {
            var cost = ((new Date()).valueOf() - this._startTime) / 1000;
            this._fire._bg.$ProgressBar.progress = (this._allTime - cost) / this._allTime;
            this._fire._lb.$Label.string = Math.ceil(this._allTime - cost);
            if (Math.ceil(this._allTime - cost) == 0) {
                this._start = false;
                yyp.eventCenter.emit("player-revive", { type: false });
                this.node.destroy();
            }
        }
    };
    Revive.prototype.init = function (levelId) {
        this._startTime = (new Date()).valueOf();
        this._levelId = levelId;
        this._start = true;
        Utils_1.Utils.doQAction(this._fire._btnRevive);
    };
    Revive.prototype.onReviveClick = function () {
        if (RewardAd_1.RewardAd.getInstance().isLoad()) {
            Analytics_1.Analytics.getInstance().eventEx('revive_game', { "level": this._levelId });
            RewardAd_1.RewardAd.getInstance().show(function (complete) {
                yyp.eventCenter.emit("player-revive", { type: complete });
            });
        }
        this.node.destroy();
    };
    Revive = __decorate([
        ccclass
    ], Revive);
    return Revive;
}(BaseComponent_1.BaseComponent));
exports.Revive = Revive;

cc._RF.pop();