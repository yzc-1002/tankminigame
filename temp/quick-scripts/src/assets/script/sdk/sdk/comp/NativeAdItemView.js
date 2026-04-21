"use strict";
cc._RF.push(module, '4c9e62RqghDEYmPrNN+Re2/', 'NativeAdItemView');
// script/sdk/sdk/comp/NativeAdItemView.ts

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
var SDKConfig_1 = require("../SDKConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NativeAdItemView = /** @class */ (function (_super) {
    __extends(NativeAdItemView, _super);
    function NativeAdItemView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adImage = null;
        _this.title = null;
        return _this;
    }
    NativeAdItemView.prototype.start = function () {
    };
    NativeAdItemView.prototype.setModel = function (item) {
        var _this = this;
        this.model = item;
        // console.log('item.imgUrl =========== ', this.model.getIcon())
        this.title.string = this.model.getTitle();
        var imageList = this.model.getImgList();
        if (imageList) {
            cc.assetManager.loadRemote(imageList[SDKConfig_1.random(0, imageList.length)], function (err, texture) {
                if (err) {
                    console.log(' err ', err);
                    return;
                }
                _this.adImage.spriteFrame = new cc.SpriteFrame(texture);
                SDKManager_1.default.getChannel().reportAdShow(_this.model.getID());
            });
        }
    };
    NativeAdItemView.prototype.onButtonClick = function () {
        SDKManager_1.default.getChannel().reportAdClick(this.model.getID());
    };
    __decorate([
        property(cc.Sprite)
    ], NativeAdItemView.prototype, "adImage", void 0);
    __decorate([
        property(cc.Label)
    ], NativeAdItemView.prototype, "title", void 0);
    NativeAdItemView = __decorate([
        ccclass
    ], NativeAdItemView);
    return NativeAdItemView;
}(cc.Component));
exports.default = NativeAdItemView;

cc._RF.pop();