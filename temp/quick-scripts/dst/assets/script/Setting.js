
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Setting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxTZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBdUM7QUFDdkMsc0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQzFDLDhCQUE4QjtBQUM5Qiw0Q0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTZCLDJCQUFPO0lBQXBDO1FBRUksT0FBTztRQUNQLHVCQUF1QjtRQUN2QixvQ0FBb0M7UUFKeEMscUVBOEZDO1FBeEZHLG9CQUFvQjtRQUNwQix5QkFBeUI7UUFFekIsZUFBUyxHQUFHLENBQUMsQ0FBQyxDQUFHLElBQUk7UUFDckIsZ0JBQVUsR0FBRyxDQUFDLENBQUMsQ0FBRSxJQUFJO1FBQ3JCLGVBQVMsR0FBRyxDQUFDLENBQUMsQ0FBRyxJQUFJOztJQW1GekIsQ0FBQztJQWpGRyxNQUFNO0lBQ04sd0JBQU0sR0FBTjtRQUNJLE9BQU87UUFDUCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsT0FBTztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVmLE9BQU87UUFDUCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDJCQUFTLEdBQVQ7UUFDSSxNQUFNO1FBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPO0lBQ1AsK0JBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsNkJBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsNkJBQWEsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsNkJBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxPQUFPO0lBQ1AseUJBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsT0FBTztJQUNQLDRCQUFVLEdBQVY7SUFDQSxDQUFDO0lBRUQsTUFBTTtJQUNOLCtCQUFhLEdBQWI7SUFDQSxDQUFDO0lBRUQsTUFBTTtJQUNOLGdCQUFnQjtJQUNoQixJQUFJO0lBRUosNEJBQVUsR0FBVjtRQUNJLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVsRSw2QkFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELDZCQUFhLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsNkJBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2RCxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELG9DQUFrQixHQUFsQixVQUFvQixLQUFLO1FBQ3JCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQscUNBQW1CLEdBQW5CLFVBQXFCLEtBQUs7UUFDdEIsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxvQ0FBa0IsR0FBbEIsVUFBb0IsS0FBSztRQUNyQiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYyxLQUFLO1FBQ2YseUJBQXlCO1FBRXpCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBN0ZRLE9BQU87UUFEbkIsT0FBTztPQUNLLE9BQU8sQ0E4Rm5CO0lBQUQsY0FBQztDQTlGRCxBQThGQyxDQTlGNEIsaUJBQU8sR0E4Rm5DO0FBOUZZLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtEaWFsb2dzfSBmcm9tIFwiLi9iYXNlL0RpYWxvZ3NcIjtcclxuaW1wb3J0IHtMb2NhbGl6ZWREYXRhfSBmcm9tIFwiLi9iYXNlL0xvY2FsaXplZERhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuLy/nvZHpobXlrqLmnI0gaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9rZWZ1Lmh0bWxcclxuLy/np4HmnInlh73mlbAs6K+35L2/55SoJ18n5byA5aS0XHJcbi8v6K+35L+u5pS5J05ld0NsYXNzJyA9PiDoh6rlt7HnmoTnsbvlkI1cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBEaWFsb2dzIHtcclxuXHJcbiAgICAvL+e8lui+keWZqOWxnuaAp1xyXG4gICAgLy8gQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIC8vIHByaXZhdGUgcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8v56eB5pyJ5bGe5oCnLOivt+S9v+eUqCdfJ+W8gOWktCzpqbzls7Dlkb3lkI1cclxuICAgIC8vIF9tYXhTcGVlZCA9IDM7ICAvL+acgOWkp+mAn+W6plxyXG5cclxuICAgIF9tdXNpY0ZsZyA9IDE7ICAgLy/pn7PkuZBcclxuICAgIF9lZmZlY3RGbGcgPSAxOyAgLy/pn7PmlYhcclxuICAgIF9zaGFrZUZsZyA9IDE7ICAgLy/pnIfliqhcclxuXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyWVUlcclxuICAgICAgICB0aGlzLl9pbml0VUkoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/plIDmr4Hkuovku7ZcclxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9tdXNpY0ZsZyA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9tdXNpY19mbGdfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0RmxnID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2VmZmVjdF9mbGdfXCIsMSk7XHJcbiAgICAgICAgdGhpcy5fc2hha2VGbGcgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfc2hha2VfZmxnX1wiLDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWVUlcclxuICAgIF9pbml0VUkoKXtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgX2luaXRFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+avj+W4p+iwg+eUqFxyXG4gICAgLy8gdXBkYXRlIChkdCkge1xyXG4gICAgLy8gfVxyXG5cclxuICAgIF9yZWZyZXNoVUkoKXtcclxuICAgICAgICAvLyBjYy5sb2coXCJfcmVmcmVzaFVJXCIpXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbXVzaWNUb2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQgPSAodGhpcy5fbXVzaWNGbGcgPT0gMSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fZWZmZWN0VG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkID0gKHRoaXMuX2VmZmVjdEZsZyA9PSAxKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zaGFrZVRvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCA9ICh0aGlzLl9zaGFrZUZsZyA9PSAxKTtcclxuXHJcbiAgICAgICAgTG9jYWxpemVkRGF0YS5zZXRJbnRJdGVtKFwiX211c2ljX2ZsZ19cIix0aGlzLl9tdXNpY0ZsZyk7XHJcbiAgICAgICAgTG9jYWxpemVkRGF0YS5zZXRJbnRJdGVtKFwiX2VmZmVjdF9mbGdfXCIsdGhpcy5fZWZmZWN0RmxnKTtcclxuICAgICAgICBMb2NhbGl6ZWREYXRhLnNldEludEl0ZW0oXCJfc2hha2VfZmxnX1wiLHRoaXMuX3NoYWtlRmxnKTtcclxuICAgICAgICBcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSh0aGlzLl9tdXNpY0ZsZyk7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZSh0aGlzLl9lZmZlY3RGbGcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTXVzaWNUb2dnbGVDbGljayAoZXZlbnQpIHtcclxuICAgICAgICAvLyBjYy5sb2coXCJvblRvZ2dsZUNsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5fbXVzaWNGbGcgPSB0aGlzLl9maXJlLl9tdXNpY1RvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCA/IDEgOiAwO1xyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoVUkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25FZmZlY3RUb2dnbGVDbGljayAoZXZlbnQpIHtcclxuICAgICAgICAvLyBjYy5sb2coXCJvbkVmZmVjdFRvZ2dsZUNsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5fZWZmZWN0RmxnID0gdGhpcy5fZmlyZS5fZWZmZWN0VG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkID8gMSA6IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hVSSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblNoYWtlVG9nZ2xlQ2xpY2sgKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gY2MubG9nKFwib25TaGFrZVRvZ2dsZUNsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5fc2hha2VGbGcgPSB0aGlzLl9maXJlLl9zaGFrZVRvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCA/IDEgOiAwO1xyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoVUkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25DbG9zZUNsaWNrIChldmVudCkge1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIm9uQ2xvc2VDbGlja1wiKVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19