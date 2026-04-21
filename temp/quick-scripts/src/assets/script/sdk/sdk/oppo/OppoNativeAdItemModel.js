"use strict";
cc._RF.push(module, '56342AtaTxBpIEHpKW79rW+', 'OppoNativeAdItemModel');
// script/sdk/sdk/oppo/OppoNativeAdItemModel.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var BaseNativeAdItemModel_1 = require("../base/BaseNativeAdItemModel");
var OppoNativeAdItemModel = /** @class */ (function (_super) {
    __extends(OppoNativeAdItemModel, _super);
    function OppoNativeAdItemModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OppoNativeAdItemModel.prototype.initWithOppo = function (res) {
        this.adId = res.adId;
        this.title = res.title;
        this.desc = res.desc;
        this.iconUrlList = res.iconUrlList;
        this.imgUrlList = res.imgUrlList;
        this.logoUrl = res.logoUrl;
        this.clickBtnTxt = res.clickBtnTxt;
        this.creativeType = res.creativeType;
        this.interactionType = res.interactionType;
    };
    OppoNativeAdItemModel.prototype.getShowImageList = function () {
        return this.getImgList();
    };
    OppoNativeAdItemModel.prototype.getID = function () {
        return this.adId;
    };
    OppoNativeAdItemModel.prototype.getTitle = function () {
        return this.title;
    };
    OppoNativeAdItemModel.prototype.getDesc = function () {
        return this.desc;
    };
    OppoNativeAdItemModel.prototype.getIconList = function () {
        return this.iconUrlList;
    };
    OppoNativeAdItemModel.prototype.getImgList = function () {
        return this.imgUrlList;
    };
    OppoNativeAdItemModel.prototype.getButtonText = function () {
        return this.clickBtnTxt;
    };
    return OppoNativeAdItemModel;
}(BaseNativeAdItemModel_1.default));
exports.default = OppoNativeAdItemModel;

cc._RF.pop();