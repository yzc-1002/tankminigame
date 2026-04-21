"use strict";
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