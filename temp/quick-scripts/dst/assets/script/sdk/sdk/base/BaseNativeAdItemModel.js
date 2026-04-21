
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseNativeAdItemModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZU5hdGl2ZUFkSXRlbU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQW9DQSxDQUFDO0lBbkNHLHFDQUFLLEdBQUw7SUFDQSxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNJLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDakI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0QsdUNBQU8sR0FBUDtJQUVBLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0ksT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsMENBQVUsR0FBVjtRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELDZDQUFhLEdBQWI7SUFFQSxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCO1FBQ0ksT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQXBDQSxBQW9DQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZU5hdGl2ZUFkSXRlbU1vZGVsIHtcclxuICAgIGdldElEKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SWNvbigpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZ2V0SWNvbkxpc3QoKTtcclxuICAgICAgICBpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RbMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldERlc2MoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEljb25MaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW1nTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1dHRvblRleHQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFNob3dJbWFnZUxpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdXHJcbiAgICB9XHJcbn0iXX0=