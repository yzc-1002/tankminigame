"use strict";
cc._RF.push(module, 'e13e3wJeFJC/reKX1GgxvJF', 'NativeComp');
// script/sdk/sdk/comp/NativeComp.ts

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
var NativeAdItemView_1 = require("./NativeAdItemView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var NativeComp = /** @class */ (function (_super) {
    __extends(NativeComp, _super);
    function NativeComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adSite = 0;
        _this.nativeAdItemView = null;
        _this.pageView = null;
        return _this;
    }
    NativeComp.prototype.start = function () {
        var _this = this;
        SDKManager_1.default.getChannel().showNativeAd(this.adSite, function (list) {
            if (list.length > 0) {
                for (var index = 0; index < list.length; index++) {
                    var item = list[index];
                    var node = cc.instantiate(_this.nativeAdItemView);
                    var comp = node.getComponent(NativeAdItemView_1.default);
                    _this.pageView.addPage(node);
                    if (comp) {
                        comp.setModel(item);
                    }
                }
            }
        });
    };
    NativeComp.prototype.onDestroy = function () {
        SDKManager_1.default.getChannel().hideNativeAd();
    };
    NativeComp.prototype.onButtonClick = function () {
    };
    __decorate([
        property
    ], NativeComp.prototype, "adSite", void 0);
    __decorate([
        property(cc.Prefab)
    ], NativeComp.prototype, "nativeAdItemView", void 0);
    __decorate([
        property(cc.PageView)
    ], NativeComp.prototype, "pageView", void 0);
    NativeComp = __decorate([
        ccclass
    ], NativeComp);
    return NativeComp;
}(cc.Component));
exports.default = NativeComp;

cc._RF.pop();