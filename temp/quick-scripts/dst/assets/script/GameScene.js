
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/GameScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'GameScene');
// script/GameScene.ts

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
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var MusicManager_1 = require("./base/MusicManager");
// import {BannerAd} from "./ad/BannerAd";
var InsertAd_1 = require("./ad/InsertAd");
var RewardAd_1 = require("./ad/RewardAd");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        return _this;
    }
    GameScene.prototype.onLoad = function () {
        Utils_1.Utils.initMusicEffect();
        MusicManager_1.MusicManager.initConfig();
        this._fire._lyCoin.y = yyp.safeTopBottom - 30;
        this._fire._lyCoin.zIndex = 1001;
        var prefabNode = cc.instantiate(this.prefab);
        prefabNode.x = 0;
        prefabNode.y = 0;
        prefabNode.zIndex = 1000;
        prefabNode.parent = this.node;
        this._initEvent();
    };
    GameScene.prototype.start = function () {
        // BannerAd.getInstance().showBottom();   
        InsertAd_1.InsertAd.getInstance();
        RewardAd_1.RewardAd.getInstance();
    };
    //初始化接收事件
    GameScene.prototype._initEvent = function () {
        // this._fire._lyStart.on(cc.Node.EventType.TOUCH_END, this.onStartClick, this);
    };
    //销毁事件
    GameScene.prototype._destroyEvent = function () {
        // this._fire._lyStart.off(cc.Node.EventType.TOUCH_END, this.onStartClick, this);
    };
    GameScene.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //开始按钮
    GameScene.prototype.onStartClick = function () {
        var a = 1;
    };
    __decorate([
        property(cc.Prefab)
    ], GameScene.prototype, "prefab", void 0);
    GameScene = __decorate([
        ccclass
    ], GameScene);
    return GameScene;
}(BaseComponent_1.BaseComponent));
exports.default = GameScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxHYW1lU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFFbkQsMENBQTBDO0FBQzFDLDBDQUF1QztBQUN2QywwQ0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQWE7SUFBcEQ7UUFBQSxxRUE4Q0M7UUEzQ0csWUFBTSxHQUFjLElBQUksQ0FBQzs7SUEyQzdCLENBQUM7SUF6Q0csMEJBQU0sR0FBTjtRQUNJLGFBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QiwyQkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFDLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWpDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHlCQUFLLEdBQUw7UUFDSSwwQ0FBMEM7UUFDMUMsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTO0lBQ1QsOEJBQVUsR0FBVjtRQUNJLGdGQUFnRjtJQUNwRixDQUFDO0lBRUQsTUFBTTtJQUNOLGlDQUFhLEdBQWI7UUFDSSxpRkFBaUY7SUFDckYsQ0FBQztJQUVELDZCQUFTLEdBQVQ7UUFDSSxNQUFNO1FBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNO0lBQ04sZ0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxHQUFFLENBQUMsQ0FBQztJQUNiLENBQUM7SUF6Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDSztJQUhSLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E4QzdCO0lBQUQsZ0JBQUM7Q0E5Q0QsQUE4Q0MsQ0E5Q3NDLDZCQUFhLEdBOENuRDtrQkE5Q29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9iYXNlL1V0aWxzXCI7XHJcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XHJcblxyXG4vLyBpbXBvcnQge0Jhbm5lckFkfSBmcm9tIFwiLi9hZC9CYW5uZXJBZFwiO1xyXG5pbXBvcnQge0luc2VydEFkfSBmcm9tIFwiLi9hZC9JbnNlcnRBZFwiO1xyXG5pbXBvcnQge1Jld2FyZEFkfSBmcm9tIFwiLi9hZC9SZXdhcmRBZFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKSBcclxuICAgIHByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIFV0aWxzLmluaXRNdXNpY0VmZmVjdCgpO1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5pbml0Q29uZmlnKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlDb2luLnkgPSB5eXAuc2FmZVRvcEJvdHRvbS0zMDtcclxuICAgICAgICB0aGlzLl9maXJlLl9seUNvaW4uekluZGV4ID0gMTAwMTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJlZmFiTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcclxuICAgICAgICBwcmVmYWJOb2RlLnggPSAwO1xyXG4gICAgICAgIHByZWZhYk5vZGUueSA9IDA7XHJcbiAgICAgICAgcHJlZmFiTm9kZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIHByZWZhYk5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgLy8gQmFubmVyQWQuZ2V0SW5zdGFuY2UoKS5zaG93Qm90dG9tKCk7ICAgXHJcbiAgICAgICAgSW5zZXJ0QWQuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBSZXdhcmRBZC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIC8vIHRoaXMuX2ZpcmUuX2x5U3RhcnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5fZmlyZS5fbHlTdGFydC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uU3RhcnRDbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vmjInpkq5cclxuICAgIG9uU3RhcnRDbGljaygpe1xyXG4gICAgICAgIGxldCBhID0xO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=