
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/StartScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc07f3Kh8RHNIbJLhJgW5a6', 'StartScene');
// script/StartScene.ts

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
exports.StartScene = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //加载完成
    StartScene.prototype.onLoad = function () {
        this.scheduleOnce(function () {
            cc.director.loadScene('GameScene');
        });
    };
    StartScene = __decorate([
        ccclass
    ], StartScene);
    return StartScene;
}(cc.Component));
exports.StartScene = StartScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxTdGFydFNjZW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFnQyw4QkFBWTtJQUE1Qzs7SUFRQSxDQUFDO0lBTkcsTUFBTTtJQUNOLDJCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBUFEsVUFBVTtRQUR0QixPQUFPO09BQ0ssVUFBVSxDQVF0QjtJQUFELGlCQUFDO0NBUkQsQUFRQyxDQVIrQixFQUFFLENBQUMsU0FBUyxHQVEzQztBQVJZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==