
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/RecorderComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '75ef6shdhBJN6kX1KwEdtco', 'RecorderComp');
// script/sdk/sdk/comp/RecorderComp.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecorderComp = /** @class */ (function (_super) {
    __extends(RecorderComp, _super);
    function RecorderComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.isRunning = false;
        return _this;
    }
    RecorderComp.prototype.start = function () {
        this.node.active = SDKManager_1.default.getChannel().hasRecorder();
        if (this.node.active) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
        }
    };
    // update (dt) {}
    RecorderComp.prototype.onButtonClick = function () {
        if (!this.isRunning) {
            SDKManager_1.default.getChannel().recorderStart();
            this.label.string = "录屏分享";
            this.isRunning = true;
        }
        else {
            this.isRunning = false;
            this.label.string = "屏幕录制";
            SDKManager_1.default.getChannel().recorderStop();
            SDKManager_1.default.getChannel().showShare(0, function (result) {
                SDKManager_1.default.getChannel().showToast('录频分享结果：' + result);
            }, true);
        }
    };
    __decorate([
        property(cc.Label)
    ], RecorderComp.prototype, "label", void 0);
    RecorderComp = __decorate([
        ccclass
    ], RecorderComp);
    return RecorderComp;
}(cc.Component));
exports.default = RecorderComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcUmVjb3JkZXJDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUdqQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQStCQztRQTVCRyxXQUFLLEdBQWEsSUFBSSxDQUFDO1FBR2YsZUFBUyxHQUFZLEtBQUssQ0FBQzs7SUF5QnZDLENBQUM7SUF4QkcsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUN0RTtJQUVMLENBQUM7SUFFRCxpQkFBaUI7SUFFakIsb0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7WUFDMUIsb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUN0QyxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBQyxNQUFtQjtnQkFDckQsb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFBO1lBQ3pELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNYO0lBQ0wsQ0FBQztJQTNCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNJO0lBSE4sWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQStCaEM7SUFBRCxtQkFBQztDQS9CRCxBQStCQyxDQS9CeUMsRUFBRSxDQUFDLFNBQVMsR0ErQnJEO2tCQS9Cb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTREtNYW5hZ2VyIGZyb20gXCIuLi9TREtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZGVyQ29tcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBpc1J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5oYXNSZWNvcmRlcigpXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkJ1dHRvbkNsaWNrLCB0aGlzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICBvbkJ1dHRvbkNsaWNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgU0RLTWFuYWdlci5nZXRDaGFubmVsKCkucmVjb3JkZXJTdGFydCgpXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCLlvZXlsY/liIbkuqtcIlxyXG4gICAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIuWxj+W5leW9leWItlwiXHJcbiAgICAgICAgICAgIFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpLnJlY29yZGVyU3RvcCgpXHJcbiAgICAgICAgICAgIFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpLnNob3dTaGFyZSgwLCAocmVzdWx0OiBSZXN1bHRTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgU0RLTWFuYWdlci5nZXRDaGFubmVsKCkuc2hvd1RvYXN0KCflvZXpopHliIbkuqvnu5PmnpzvvJonICsgcmVzdWx0KVxyXG4gICAgICAgICAgICB9LCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=