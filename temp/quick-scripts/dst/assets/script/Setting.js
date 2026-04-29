
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
var MusicManager_1 = require("./base/MusicManager");
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
        MusicManager_1.MusicManager.refreshMusicVolume();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxTZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBdUM7QUFDdkMsc0RBQW1EO0FBQ25ELG9EQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyw4QkFBOEI7QUFDOUIsNENBQTRDO0FBQzVDLDRCQUE0QjtBQUM1QiwwQ0FBMEM7QUFDMUMsZUFBZTtBQUNmLHdCQUF3QjtBQUV4QjtJQUE2QiwyQkFBTztJQUFwQztRQUVJLE9BQU87UUFDUCx1QkFBdUI7UUFDdkIsb0NBQW9DO1FBSnhDLHFFQThGQztRQXhGRyxvQkFBb0I7UUFDcEIseUJBQXlCO1FBRXpCLGVBQVMsR0FBRyxDQUFDLENBQUMsQ0FBRyxJQUFJO1FBQ3JCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUUsSUFBSTtRQUNyQixlQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUcsSUFBSTs7SUFtRnpCLENBQUM7SUFqRkcsTUFBTTtJQUNOLHdCQUFNLEdBQU47UUFDSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwyQkFBUyxHQUFUO1FBQ0ksTUFBTTtRQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTztJQUNQLCtCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLDZCQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLDZCQUFhLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLDZCQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsT0FBTztJQUNQLHlCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU87SUFDUCw0QkFBVSxHQUFWO0lBQ0EsQ0FBQztJQUVELE1BQU07SUFDTiwrQkFBYSxHQUFiO0lBQ0EsQ0FBQztJQUVELE1BQU07SUFDTixnQkFBZ0I7SUFDaEIsSUFBSTtJQUVKLDRCQUFVLEdBQVY7UUFDSSx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbEUsNkJBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCw2QkFBYSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELDZCQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkQsMkJBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxvQ0FBa0IsR0FBbEIsVUFBb0IsS0FBSztRQUNyQiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHFDQUFtQixHQUFuQixVQUFxQixLQUFLO1FBQ3RCLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsb0NBQWtCLEdBQWxCLFVBQW9CLEtBQUs7UUFDckIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWMsS0FBSztRQUNmLHlCQUF5QjtRQUV6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQTdGUSxPQUFPO1FBRG5CLE9BQU87T0FDSyxPQUFPLENBOEZuQjtJQUFELGNBQUM7Q0E5RkQsQUE4RkMsQ0E5RjRCLGlCQUFPLEdBOEZuQztBQTlGWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7RGlhbG9nc30gZnJvbSBcIi4vYmFzZS9EaWFsb2dzXCI7XHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vYmFzZS9Mb2NhbGl6ZWREYXRhXCI7XHJcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLy/nlLXlrZDpgq7ku7ZwdWhhbHNraWpzZW1lbkBnbWFpbC5jb21cclxuLy/mupDnoIHnvZHnq5kg5byAdnBu5YWo5bGA5qih5byP5omT5byAIGh0dHA6Ly93ZWIzaW5jdWJhdG9ycy5jb20vXHJcbi8v55S15oqlaHR0cHM6Ly90Lm1lL2dhbWVjb2RlOTk5XHJcbi8v572R6aG15a6i5pyNIGh0dHA6Ly93ZWIzaW5jdWJhdG9ycy5jb20va2VmdS5odG1sXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nIGV4dGVuZHMgRGlhbG9ncyB7XHJcblxyXG4gICAgLy/nvJbovpHlmajlsZ7mgKdcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICAvLyBwcml2YXRlIHByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+engeacieWxnuaApyzor7fkvb/nlKgnXyflvIDlpLQs6am85bOw5ZG95ZCNXHJcbiAgICAvLyBfbWF4U3BlZWQgPSAzOyAgLy/mnIDlpKfpgJ/luqZcclxuXHJcbiAgICBfbXVzaWNGbGcgPSAxOyAgIC8v6Z+z5LmQXHJcbiAgICBfZWZmZWN0RmxnID0gMTsgIC8v6Z+z5pWIXHJcbiAgICBfc2hha2VGbGcgPSAxOyAgIC8v6ZyH5YqoXHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fbXVzaWNGbGcgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfbXVzaWNfZmxnX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdEZsZyA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9lZmZlY3RfZmxnX1wiLDEpO1xyXG4gICAgICAgIHRoaXMuX3NoYWtlRmxnID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX3NoYWtlX2ZsZ19cIiwxKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMllVJXHJcbiAgICBfaW5pdFVJKCl7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHtcclxuICAgIC8vIH1cclxuXHJcbiAgICBfcmVmcmVzaFVJKCl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiX3JlZnJlc2hVSVwiKVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX211c2ljVG9nZ2xlLiRUb2dnbGUuaXNDaGVja2VkID0gKHRoaXMuX211c2ljRmxnID09IDEpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2VmZmVjdFRvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCA9ICh0aGlzLl9lZmZlY3RGbGcgPT0gMSk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc2hha2VUb2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQgPSAodGhpcy5fc2hha2VGbGcgPT0gMSk7XHJcblxyXG4gICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9tdXNpY19mbGdfXCIsdGhpcy5fbXVzaWNGbGcpO1xyXG4gICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9lZmZlY3RfZmxnX1wiLHRoaXMuX2VmZmVjdEZsZyk7XHJcbiAgICAgICAgTG9jYWxpemVkRGF0YS5zZXRJbnRJdGVtKFwiX3NoYWtlX2ZsZ19cIix0aGlzLl9zaGFrZUZsZyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnJlZnJlc2hNdXNpY1ZvbHVtZSgpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUodGhpcy5fZWZmZWN0RmxnKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk11c2ljVG9nZ2xlQ2xpY2sgKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gY2MubG9nKFwib25Ub2dnbGVDbGlja1wiKVxyXG4gICAgICAgIHRoaXMuX211c2ljRmxnID0gdGhpcy5fZmlyZS5fbXVzaWNUb2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFVJKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uRWZmZWN0VG9nZ2xlQ2xpY2sgKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gY2MubG9nKFwib25FZmZlY3RUb2dnbGVDbGlja1wiKVxyXG4gICAgICAgIHRoaXMuX2VmZmVjdEZsZyA9IHRoaXMuX2ZpcmUuX2VmZmVjdFRvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCA/IDEgOiAwO1xyXG5cclxuICAgICAgICB0aGlzLl9yZWZyZXNoVUkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25TaGFrZVRvZ2dsZUNsaWNrIChldmVudCkge1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIm9uU2hha2VUb2dnbGVDbGlja1wiKVxyXG4gICAgICAgIHRoaXMuX3NoYWtlRmxnID0gdGhpcy5fZmlyZS5fc2hha2VUb2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaFVJKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQ2xvc2VDbGljayAoZXZlbnQpIHtcclxuICAgICAgICAvLyBjYy5sb2coXCJvbkNsb3NlQ2xpY2tcIilcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==