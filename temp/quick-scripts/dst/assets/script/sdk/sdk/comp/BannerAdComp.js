
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/BannerAdComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da5554xQDNN06YPcLNHIdI8', 'BannerAdComp');
// script/sdk/sdk/comp/BannerAdComp.ts

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
var BannerAdComp = /** @class */ (function (_super) {
    __extends(BannerAdComp, _super);
    function BannerAdComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adSite = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    BannerAdComp.prototype.onLoad = function () {
        this.node.active = SDKManager_1.default.getChannel().hasBanner();
        if (this.node.active) {
            SDKManager_1.default.getChannel().showBanner(this.adSite);
        }
    };
    BannerAdComp.prototype.onDestroy = function () {
        SDKManager_1.default.getChannel().hideBanner();
    };
    __decorate([
        property
    ], BannerAdComp.prototype, "adSite", void 0);
    BannerAdComp = __decorate([
        ccclass
    ], BannerAdComp);
    return BannerAdComp;
}(cc.Component));
exports.default = BannerAdComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcQmFubmVyQWRDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUVqQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQXFCQztRQWpCRyxZQUFNLEdBQVcsQ0FBQyxDQUFDOztJQWlCdkIsQ0FBQztJQWZHLHdCQUF3QjtJQUV4Qiw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0RCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ2hCLG9CQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNsRDtJQUVMLENBQUM7SUFJRCxnQ0FBUyxHQUFUO1FBQ0ksb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUN4QyxDQUFDO0lBaEJEO1FBREMsUUFBUTtnREFDVTtJQUpGLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FxQmhDO0lBQUQsbUJBQUM7Q0FyQkQsQUFxQkMsQ0FyQnlDLEVBQUUsQ0FBQyxTQUFTLEdBcUJyRDtrQkFyQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi4vU0RLTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbm5lckFkQ29tcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgYWRTaXRlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gU0RLTWFuYWdlci5nZXRDaGFubmVsKCkuaGFzQmFubmVyKClcclxuICAgICAgICBpZih0aGlzLm5vZGUuYWN0aXZlKXtcclxuICAgICAgICAgICAgU0RLTWFuYWdlci5nZXRDaGFubmVsKCkuc2hvd0Jhbm5lcih0aGlzLmFkU2l0ZSlcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5oaWRlQmFubmVyKClcclxuICAgIH1cclxufVxyXG4iXX0=