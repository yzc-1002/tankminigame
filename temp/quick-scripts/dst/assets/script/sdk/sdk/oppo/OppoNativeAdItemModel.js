
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAdItemModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb05hdGl2ZUFkSXRlbU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFrRTtBQUdsRTtJQUFtRCx5Q0FBcUI7SUFBeEU7O0lBdUVBLENBQUM7SUEzQ0csNENBQVksR0FBWixVQUFhLEdBQUc7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsZ0RBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUNELHFDQUFLLEdBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVELDBDQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDMUIsQ0FBQztJQUVELDZDQUFhLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQU9MLDRCQUFDO0FBQUQsQ0F2RUEsQUF1RUMsQ0F2RWtELCtCQUFxQixHQXVFdkUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZU5hdGl2ZUFkSXRlbU1vZGVsIGZyb20gXCIuLi9iYXNlL0Jhc2VOYXRpdmVBZEl0ZW1Nb2RlbFwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wcG9OYXRpdmVBZEl0ZW1Nb2RlbCBleHRlbmRzIEJhc2VOYXRpdmVBZEl0ZW1Nb2RlbCB7XHJcblxyXG4gICAgLy/lub/lkYrmoIfor4bvvIznlKjmnaXkuIrmiqXmm53lhYnkuI7ngrnlh7tcclxuICAgIGFkSWQ7XHJcblxyXG4gICAgLy/lub/lkYrmoIfpophcclxuICAgIHRpdGxlO1xyXG5cclxuICAgIC8v5bm/5ZGK5o+P6L+wXHJcbiAgICBkZXNjO1xyXG5cclxuICAgIC8v5o6o5bm/5bqU55So55qESWNvbuWbvuagh1xyXG4gICAgaWNvblVybExpc3Q7XHJcblxyXG4gICAgLy/lub/lkYrlm77niYdcclxuICAgIGltZ1VybExpc3Q7XHJcblxyXG4gICAgLy/igJzlub/lkYrigJ3moIfnrb7lm77niYdcclxuICAgIGxvZ29Vcmw7XHJcblxyXG4gICAgLy/ngrnlh7vmjInpkq7mlofmnKzmj4/ov7BcclxuICAgIGNsaWNrQnRuVHh0O1xyXG5cclxuICAgIC8v6I635Y+W5bm/5ZGK57G75Z6L77yM5Y+W5YC86K+05piO77yaMO+8muaXoCAx77ya57qv5paH5a2XIDLvvJrlm77niYcgM++8muWbvuaWh+a3t+WQiCA077ya6KeG6aKRXHJcbiAgICBjcmVhdGl2ZVR5cGU7XHJcbiAgICAvL+iOt+WPluW5v+WRiueCueWHu+S5i+WQjueahOS6pOS6kuexu+Wei++8jOWPluWAvOivtOaYju+8miAw77ya5pegIDHvvJrmtY/op4jnsbsgMu+8muS4i+i9veexuyAz77ya5rWP6KeI5Zmo77yI5LiL6L295Lit6Ze06aG15bm/5ZGK77yJIDTvvJrmiZPlvIDlupTnlKjpppbpobUgNe+8muaJk+W8gOW6lOeUqOivpuaDhemhtVxyXG4gICAgaW50ZXJhY3Rpb25UeXBlO1xyXG5cclxuICAgIGluaXRXaXRoT3BwbyhyZXMpe1xyXG4gICAgICAgIHRoaXMuYWRJZCA9IHJlcy5hZElkO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSByZXMudGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gcmVzLmRlc2M7XHJcbiAgICAgICAgdGhpcy5pY29uVXJsTGlzdCA9IHJlcy5pY29uVXJsTGlzdDtcclxuICAgICAgICB0aGlzLmltZ1VybExpc3QgPSByZXMuaW1nVXJsTGlzdDtcclxuICAgICAgICB0aGlzLmxvZ29VcmwgPSByZXMubG9nb1VybDtcclxuICAgICAgICB0aGlzLmNsaWNrQnRuVHh0ID0gcmVzLmNsaWNrQnRuVHh0O1xyXG4gICAgICAgIHRoaXMuY3JlYXRpdmVUeXBlID0gcmVzLmNyZWF0aXZlVHlwZTtcclxuICAgICAgICB0aGlzLmludGVyYWN0aW9uVHlwZSA9IHJlcy5pbnRlcmFjdGlvblR5cGU7XHJcbiAgICB9XHJcbiAgICBnZXRTaG93SW1hZ2VMaXN0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW1nTGlzdCgpXHJcbiAgICB9XHJcbiAgICBnZXRJRCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkSWRcclxuICAgIH1cclxuXHJcbiAgICBnZXRUaXRsZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlc2MoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZXNjO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEljb25MaXN0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvblVybExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW1nTGlzdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltZ1VybExpc3RcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdXR0b25UZXh0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpY2tCdG5UeHQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19