"use strict";
cc._RF.push(module, '679e8aRck9EWL+tCDsGjFaM', 'Setting');
// script/Setting.ts

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
exports.Setting = void 0;
var Dialogs_1 = require("./base/Dialogs");
var LocalizedData_1 = require("./base/LocalizedData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
var Setting = /** @class */ (function (_super) {
    __extends(Setting, _super);
    function Setting() {
        //编辑器属性
        // @property(cc.Prefab)
        // private prefab: cc.Prefab = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //私有属性,请使用'_'开头,驼峰命名
        // _maxSpeed = 3;  //最大速度
        _this._musicFlg = 1; //音乐
        _this._effectFlg = 1; //音效
        _this._shakeFlg = 1; //震动
        return _this;
    }
    //加载完成
    Setting.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化事件
        this._initEvent();
    };
    Setting.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    Setting.prototype._initVariable = function () {
        this._musicFlg = LocalizedData_1.LocalizedData.getIntItem("_music_flg_", 1);
        this._effectFlg = LocalizedData_1.LocalizedData.getIntItem("_effect_flg_", 1);
        this._shakeFlg = LocalizedData_1.LocalizedData.getIntItem("_shake_flg_", 1);
    };
    //初始化UI
    Setting.prototype._initUI = function () {
        this._refreshUI();
    };
    //初始化事件
    Setting.prototype._initEvent = function () {
    };
    //销毁事件
    Setting.prototype._destroyEvent = function () {
    };
    //每帧调用
    // update (dt) {
    // }
    Setting.prototype._refreshUI = function () {
        // cc.log("_refreshUI")
        this._fire._musicToggle.$Toggle.isChecked = (this._musicFlg == 1);
        this._fire._effectToggle.$Toggle.isChecked = (this._effectFlg == 1);
        this._fire._shakeToggle.$Toggle.isChecked = (this._shakeFlg == 1);
        LocalizedData_1.LocalizedData.setIntItem("_music_flg_", this._musicFlg);
        LocalizedData_1.LocalizedData.setIntItem("_effect_flg_", this._effectFlg);
        LocalizedData_1.LocalizedData.setIntItem("_shake_flg_", this._shakeFlg);
        cc.audioEngine.setMusicVolume(this._musicFlg);
        cc.audioEngine.setEffectsVolume(this._effectFlg);
    };
    Setting.prototype.onMusicToggleClick = function (event) {
        // cc.log("onToggleClick")
        this._musicFlg = this._fire._musicToggle.$Toggle.isChecked ? 1 : 0;
        this._refreshUI();
    };
    Setting.prototype.onEffectToggleClick = function (event) {
        // cc.log("onEffectToggleClick")
        this._effectFlg = this._fire._effectToggle.$Toggle.isChecked ? 1 : 0;
        this._refreshUI();
    };
    Setting.prototype.onShakeToggleClick = function (event) {
        // cc.log("onShakeToggleClick")
        this._shakeFlg = this._fire._shakeToggle.$Toggle.isChecked ? 1 : 0;
        this._refreshUI();
    };
    Setting.prototype.onCloseClick = function (event) {
        // cc.log("onCloseClick")
        this.close();
    };
    Setting = __decorate([
        ccclass
    ], Setting);
    return Setting;
}(Dialogs_1.Dialogs));
exports.Setting = Setting;

cc._RF.pop();