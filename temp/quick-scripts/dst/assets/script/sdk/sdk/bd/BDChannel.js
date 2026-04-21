
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/bd/BDChannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c344fHsPLNGi6PHeLlbxSr/', 'BDChannel');
// script/sdk/sdk/bd/BDChannel.ts

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
var BaseChannel_1 = require("../base/BaseChannel");
var BDRewardAd_1 = require("./BDRewardAd");
var BDSubPackage_1 = require("./BDSubPackage");
var BDScreenshot_1 = require("./BDScreenshot");
var BDChannel = /** @class */ (function (_super) {
    __extends(BDChannel, _super);
    function BDChannel(id) {
        var _this = _super.call(this, id) || this;
        swan.onShow(function () {
        });
        swan.onHide(function () {
        });
        if (swan.createRewardedVideoAd) {
            _this.rewardAd = new BDRewardAd_1.default(_this);
        }
        _this.subPackage = new BDSubPackage_1.default(_this);
        _this.screenshot = new BDScreenshot_1.default(_this);
        return _this;
    }
    BDChannel.prototype.vibrateShort = function () {
        swan.vibrateShort();
    };
    BDChannel.prototype.showToast = function (title) {
        swan.showToast({ title: title });
    };
    //展示网络图片
    BDChannel.prototype.previewImage = function (imgUrl) {
        swan.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    BDChannel.prototype.navigateToMiniProgram = function (appID) {
        swan.navigateToMiniProgram({
            appKey: appID,
            success: function () {
                console.log(' jump ok');
            },
            fail: function () {
                console.log(' jump fail');
            }
        });
    };
    return BDChannel;
}(BaseChannel_1.default));
exports.default = BDChannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmRcXEJEQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsMkNBQXNDO0FBQ3RDLCtDQUEwQztBQUMxQywrQ0FBMEM7QUFFMUM7SUFBdUMsNkJBQVc7SUFHOUMsbUJBQVksRUFBVTtRQUF0QixZQUNJLGtCQUFNLEVBQUUsQ0FBQyxTQWFaO1FBWkcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVaLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVaLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG9CQUFVLENBQUMsS0FBSSxDQUFDLENBQUE7U0FDdkM7UUFDRCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtRQUN4QyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTs7SUFDNUMsQ0FBQztJQUVELGdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUlELDZCQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QsUUFBUTtJQUNSLGdDQUFZLEdBQVosVUFBYSxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxPQUFPLEVBQUUsTUFBTTtZQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQjtTQUNwQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQseUNBQXFCLEdBQXJCLFVBQXNCLEtBQWE7UUFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDM0IsQ0FBQztZQUNELElBQUksRUFBRTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQzdCLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBR0wsZ0JBQUM7QUFBRCxDQWpEQSxBQWlEQyxDQWpEc0MscUJBQVcsR0FpRGpEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDaGFubmVsIGZyb20gXCIuLi9iYXNlL0Jhc2VDaGFubmVsXCI7XHJcbmltcG9ydCBCRFJld2FyZEFkIGZyb20gXCIuL0JEUmV3YXJkQWRcIjtcclxuaW1wb3J0IEJEU3ViUGFja2FnZSBmcm9tIFwiLi9CRFN1YlBhY2thZ2VcIjtcclxuaW1wb3J0IEJEU2NyZWVuc2hvdCBmcm9tIFwiLi9CRFNjcmVlbnNob3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJEQ2hhbm5lbCBleHRlbmRzIEJhc2VDaGFubmVsIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGlkKTtcclxuICAgICAgICBzd2FuLm9uU2hvdygoKSA9PiB7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHN3YW4ub25IaWRlKCgpID0+IHtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoc3dhbi5jcmVhdGVSZXdhcmRlZFZpZGVvQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRBZCA9IG5ldyBCRFJld2FyZEFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3ViUGFja2FnZSA9IG5ldyBCRFN1YlBhY2thZ2UodGhpcylcclxuICAgICAgICB0aGlzLnNjcmVlbnNob3QgPSBuZXcgQkRTY3JlZW5zaG90KHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgdmlicmF0ZVNob3J0KCkge1xyXG4gICAgICAgIHN3YW4udmlicmF0ZVNob3J0KClcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHNob3dUb2FzdCh0aXRsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dhbi5zaG93VG9hc3QoeyB0aXRsZTogdGl0bGUgfSlcclxuICAgIH1cclxuICAgIC8v5bGV56S6572R57uc5Zu+54mHXHJcbiAgICBwcmV2aWV3SW1hZ2UoaW1nVXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBzd2FuLnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IGltZ1VybCwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxyXG4gICAgICAgICAgICB1cmxzOiBbaW1nVXJsXSAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvTWluaVByb2dyYW0oYXBwSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHN3YW4ubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwS2V5OiBhcHBJRCxcclxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyBqdW1wIG9rJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyBqdW1wIGZhaWwnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG59Il19