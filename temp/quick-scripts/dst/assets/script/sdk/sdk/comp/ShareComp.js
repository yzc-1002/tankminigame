
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/ShareComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9961wS8edMJJ/nGD6ISrSG', 'ShareComp');
// script/sdk/sdk/comp/ShareComp.ts

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
var ShareComp = /** @class */ (function (_super) {
    __extends(ShareComp, _super);
    function ShareComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adSite = 0;
        _this.callback = new cc.Component.EventHandler();
        return _this;
    }
    ShareComp.prototype.start = function () {
        var hasShare = SDKManager_1.default.hasShare();
        if (hasShare) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
        }
        else {
            this.node.active = hasShare;
        }
    };
    ShareComp.prototype.onButtonClick = function () {
        var _this = this;
        SDKManager_1.default.getChannel().showShare(this.adSite, function (result) {
            _this.callback.emit([result]);
        });
    };
    __decorate([
        property
    ], ShareComp.prototype, "adSite", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            displayName: "回调函数"
        })
    ], ShareComp.prototype, "callback", void 0);
    ShareComp = __decorate([
        ccclass,
        requireComponent(cc.Button)
    ], ShareComp);
    return ShareComp;
}(cc.Component));
exports.default = ShareComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcU2hhcmVDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUdqQyxJQUFBLEtBQTBDLEVBQUUsQ0FBQyxVQUFVLEVBQXJELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBa0IsQ0FBQztBQUk5RDtJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTJCQztRQXhCRyxZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBTW5CLGNBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7O0lBa0IvQyxDQUFDO0lBaEJHLHlCQUFLLEdBQUw7UUFDSSxJQUFJLFFBQVEsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDdEU7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQTtTQUM5QjtJQUVMLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBQUEsaUJBSUM7UUFIRyxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsTUFBbUI7WUFDL0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRCRDtRQURDLFFBQVE7NkNBQ1U7SUFNbkI7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZO1lBQy9CLFdBQVcsRUFBRSxNQUFNO1NBQ3RCLENBQUM7K0NBQ3lDO0lBVDFCLFNBQVM7UUFGN0IsT0FBTztRQUNQLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDUCxTQUFTLENBMkI3QjtJQUFELGdCQUFDO0NBM0JELEFBMkJDLENBM0JzQyxFQUFFLENBQUMsU0FBUyxHQTJCbEQ7a0JBM0JvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNES01hbmFnZXIgZnJvbSBcIi4uL1NES01hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmVzdWx0U3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCByZXF1aXJlQ29tcG9uZW50IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuQnV0dG9uKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZUNvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgYWRTaXRlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcclxuICAgICAgICBkaXNwbGF5TmFtZTogXCLlm57osIPlh73mlbBcIlxyXG4gICAgfSlcclxuICAgIGNhbGxiYWNrID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgaGFzU2hhcmUgPSBTREtNYW5hZ2VyLmhhc1NoYXJlKCk7XHJcbiAgICAgICAgaWYgKGhhc1NoYXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25CdXR0b25DbGljaywgdGhpcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gaGFzU2hhcmVcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uQnV0dG9uQ2xpY2soKSB7XHJcbiAgICAgICAgU0RLTWFuYWdlci5nZXRDaGFubmVsKCkuc2hvd1NoYXJlKHRoaXMuYWRTaXRlLCAocmVzdWx0OiBSZXN1bHRTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmVtaXQoW3Jlc3VsdF0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==