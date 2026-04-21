"use strict";
cc._RF.push(module, 'ba7d34HXbdKK7LgmMkHINH9', 'BaseNativeAdItemModel');
// script/sdk/sdk/base/BaseNativeAdItemModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseNativeAdItemModel = /** @class */ (function () {
    function BaseNativeAdItemModel() {
    }
    BaseNativeAdItemModel.prototype.getID = function () {
    };
    BaseNativeAdItemModel.prototype.getTitle = function () {
        return '';
    };
    BaseNativeAdItemModel.prototype.getIcon = function () {
        var list = this.getIconList();
        if (list && list.length > 0) {
            return list[0];
        }
        return null;
    };
    BaseNativeAdItemModel.prototype.getDesc = function () {
    };
    BaseNativeAdItemModel.prototype.getIconList = function () {
        return [];
    };
    BaseNativeAdItemModel.prototype.getImgList = function () {
        return [];
    };
    BaseNativeAdItemModel.prototype.getButtonText = function () {
    };
    BaseNativeAdItemModel.prototype.getShowImageList = function () {
        return [];
    };
    return BaseNativeAdItemModel;
}());
exports.default = BaseNativeAdItemModel;

cc._RF.pop();