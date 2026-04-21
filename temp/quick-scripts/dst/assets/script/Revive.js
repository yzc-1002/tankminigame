
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Revive.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxSZXZpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFtRDtBQUNuRCwwQ0FBMEM7QUFDMUMsc0NBQW1DO0FBRW5DLDRDQUF5QztBQUN6QywwQ0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsZUFBZTtBQUNmLHdCQUF3QjtBQUN4QixlQUFlO0FBRWY7SUFBNEIsMEJBQWE7SUFBekM7UUFFSSxvQkFBb0I7UUFDcEIseUJBQXlCO1FBSDdCLHFFQTZFQztRQXhFRyxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFFZixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsWUFBTSxHQUFHLEtBQUssQ0FBQzs7SUFvRW5CLENBQUM7SUFsRUcsTUFBTTtJQUNOLHVCQUFNLEdBQU47UUFDSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBQ0ksTUFBTTtRQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTztJQUNQLDhCQUFhLEdBQWI7SUFDQSxDQUFDO0lBRUQsT0FBTztJQUNQLHdCQUFPLEdBQVA7SUFFQSxDQUFDO0lBRUQsT0FBTztJQUNQLDJCQUFVLEdBQVY7SUFDQSxDQUFDO0lBRUQsTUFBTTtJQUNOLDhCQUFhLEdBQWI7SUFDQSxDQUFDO0lBRUQsTUFBTTtJQUNOLHVCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUMsSUFBSSxDQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFL0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFFdkI7U0FDSjtJQUNMLENBQUM7SUFFRCxxQkFBSSxHQUFKLFVBQUssT0FBTztRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsYUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCw4QkFBYSxHQUFiO1FBQ0ksSUFBSSxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pDLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztZQUN2RSxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLFFBQVE7Z0JBQ3pDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBQyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUE1RVEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQTZFbEI7SUFBRCxhQUFDO0NBN0VELEFBNkVDLENBN0UyQiw2QkFBYSxHQTZFeEM7QUE3RVksd0JBQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG4vLyBpbXBvcnQge0RpYWxvZ3N9IGZyb20gXCIuL2Jhc2UvRGlhbG9nc1wiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcblxyXG5pbXBvcnQge0FuYWx5dGljc30gZnJvbSBcIi4vYWQvQW5hbHl0aWNzXCI7XHJcbmltcG9ydCB7UmV3YXJkQWR9IGZyb20gXCIuL2FkL1Jld2FyZEFkXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbi8v5by556qX6ZyA6KaB57un5om/RGlhbG9nc1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgUmV2aXZlIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgLy/np4HmnInlsZ7mgKcs6K+35L2/55SoJ18n5byA5aS0LOmpvOWzsOWRveWQjVxyXG4gICAgLy8gX21heFNwZWVkID0gMzsgIC8v5pyA5aSn6YCf5bqmXHJcblxyXG4gICAgX2FsbFRpbWUgPSAzO1xyXG4gICAgX3N0YXJ0VGltZSA9IDA7XHJcblxyXG4gICAgX2xldmVsSWQgPSAwO1xyXG4gICAgX3N0YXJ0ID0gZmFsc2U7XHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMllVJXHJcbiAgICAgICAgdGhpcy5faW5pdFVJKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgX2luaXRFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+avj+W4p+iwg+eUqFxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydCkge1xyXG4gICAgICAgICAgICBsZXQgY29zdCA9ICgobmV3IERhdGUoKSkudmFsdWVPZigpIC0gdGhpcy5fc3RhcnRUaW1lKS8xMDAwO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9iZy4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAodGhpcy5fYWxsVGltZS1jb3N0KS90aGlzLl9hbGxUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9sYi4kTGFiZWwuc3RyaW5nID0gTWF0aC5jZWlsKHRoaXMuX2FsbFRpbWUgLSBjb3N0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChNYXRoLmNlaWwodGhpcy5fYWxsVGltZSAtIGNvc3QpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInBsYXllci1yZXZpdmVcIix7dHlwZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChsZXZlbElkKXtcclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG4gICAgICAgIHRoaXMuX2xldmVsSWQgPSBsZXZlbElkO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICBVdGlscy5kb1FBY3Rpb24odGhpcy5fZmlyZS5fYnRuUmV2aXZlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJldml2ZUNsaWNrKCl7XHJcbiAgICAgICAgaWYgKFJld2FyZEFkLmdldEluc3RhbmNlKCkuaXNMb2FkKCkpIHtcclxuICAgICAgICAgICAgQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnRFeCgncmV2aXZlX2dhbWUnLHtcImxldmVsXCI6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgICAgICBSZXdhcmRBZC5nZXRJbnN0YW5jZSgpLnNob3coZnVuY3Rpb24oY29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoXCJwbGF5ZXItcmV2aXZlXCIse3R5cGU6Y29tcGxldGV9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuIl19