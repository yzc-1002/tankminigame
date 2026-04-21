
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/RewardAdComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '784e3t3Ae9Ac7G211tFRRaE', 'RewardAdComp');
// script/sdk/sdk/comp/RewardAdComp.ts

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
var SDKManager_1 = require("../SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var RewardAdComp = /** @class */ (function (_super) {
    __extends(RewardAdComp, _super);
    function RewardAdComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //广告位索引
        _this.adSite = 0;
        _this.callback = new cc.Component.EventHandler();
        return _this;
    }
    RewardAdComp.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    };
    RewardAdComp.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    };
    RewardAdComp.prototype.onButtonClick = function () {
        var _this = this;
        SDKManager_1.default.getChannel().showRewardAd(this.adSite, function (result) {
            _this.callback.emit([result]);
        });
    };
    __decorate([
        property
    ], RewardAdComp.prototype, "adSite", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            displayName: "回调函数"
        })
    ], RewardAdComp.prototype, "callback", void 0);
    RewardAdComp = __decorate([
        ccclass,
        requireComponent(cc.Button)
    ], RewardAdComp);
    return RewardAdComp;
}(cc.Component));
exports.default = RewardAdComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcUmV3YXJkQWRDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUdqQyxJQUFBLEtBQTBDLEVBQUUsQ0FBQyxVQUFVLEVBQXJELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBa0IsQ0FBQztBQUk5RDtJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQTJCQztRQXpCRyxPQUFPO1FBRVAsWUFBTSxHQUFXLENBQUMsQ0FBQztRQU9uQixjQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDOztJQWdCL0MsQ0FBQztJQWRHLDRCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFRCxvQ0FBYSxHQUFiO1FBQUEsaUJBSUM7UUFIRyxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsTUFBbUI7WUFDbEUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJCRDtRQURDLFFBQVE7Z0RBQ1U7SUFPbkI7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZO1lBQy9CLFdBQVcsRUFBRSxNQUFNO1NBQ3RCLENBQUM7a0RBQ3lDO0lBWDFCLFlBQVk7UUFGaEMsT0FBTztRQUNQLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDUCxZQUFZLENBMkJoQztJQUFELG1CQUFDO0NBM0JELEFBMkJDLENBM0J5QyxFQUFFLENBQUMsU0FBUyxHQTJCckQ7a0JBM0JvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNES01hbmFnZXIgZnJvbSBcIi4uL1NES01hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmVzdWx0U3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCByZXF1aXJlQ29tcG9uZW50IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuQnV0dG9uKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXdhcmRBZENvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8v5bm/5ZGK5L2N57Si5byVXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFkU2l0ZTogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuWbnuiwg+WHveaVsFwiXHJcbiAgICB9KVxyXG4gICAgY2FsbGJhY2sgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25CdXR0b25DbGljaywgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25CdXR0b25DbGljaywgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1dHRvbkNsaWNrKCkge1xyXG4gICAgICAgIFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpLnNob3dSZXdhcmRBZCh0aGlzLmFkU2l0ZSwgKHJlc3VsdDogUmVzdWx0U3RhdGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5lbWl0KFtyZXN1bHRdKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=