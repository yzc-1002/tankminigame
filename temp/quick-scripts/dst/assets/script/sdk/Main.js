
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f8e6cwGUzNBA6DqiaH2fJSX', 'Main');
// script/sdk/Main.ts

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
var SDKManager_1 = require("./sdk/SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BannerView = null;
        _this.nativeView = null;
        _this.insertView = null;
        return _this;
    }
    Main.prototype.start = function () {
        cc.log(cc.sys.MOBILE_BROWSER);
        cc.log(cc.sys.DESKTOP_BROWSER);
        cc.log(cc.sys.EDITOR_PAGE);
        cc.log(cc.sys.EDITOR_CORE);
        cc.log(cc.sys.WECHAT_GAME);
        cc.log(cc.sys.QQ_PLAY);
        cc.log(cc.sys.FB_PLAYABLE_ADS);
        cc.log(cc.sys.BAIDU_GAME);
        cc.log(cc.sys.VIVO_GAME);
        cc.log(cc.sys.OPPO_GAME);
        cc.log(cc.sys.HUAWEI_GAME);
        cc.log(cc.sys.XIAOMI_GAME);
        cc.log(cc.sys.JKW_GAME);
        cc.log(cc.sys.ALIPAY_GAME);
        cc.log(cc.sys.WECHAT_GAME_SUB);
        cc.log(cc.sys.BAIDU_GAME_SUB);
        cc.log(cc.sys.QTT_GAME);
        cc.log(cc.sys.BYTEDANCE_GAME);
        cc.log(cc.sys.BYTEDANCE_GAME_SUB);
        cc.log(cc.sys.LINKSURE);
        cc.log(cc.sys.BROWSER_TYPE_WECHAT);
        cc.log(cc.sys.BROWSER_TYPE_ANDROID);
        cc.log(cc.sys.BROWSER_TYPE_IE);
        cc.log(cc.sys.BROWSER_TYPE_EDGE);
        cc.log(cc.sys.BROWSER_TYPE_QQ);
        cc.log(cc.sys.BROWSER_TYPE_MOBILE_QQ);
        cc.log(cc.sys.BROWSER_TYPE_UC);
        cc.log(cc.sys.BROWSER_TYPE_UCBS);
        cc.log(cc.sys.BROWSER_TYPE_360);
        cc.log(cc.sys.BROWSER_TYPE_BAIDU_APP);
        cc.log(cc.sys.BROWSER_TYPE_BAIDU);
        cc.log(cc.sys.BROWSER_TYPE_MAXTHON);
        cc.log(cc.sys.BROWSER_TYPE_OPERA);
        cc.log(cc.sys.BROWSER_TYPE_OUPENG);
        cc.log(cc.sys.BROWSER_TYPE_MIUI);
        cc.log(cc.sys.BROWSER_TYPE_FIREFOX);
        cc.log(cc.sys.BROWSER_TYPE_SAFARI);
        cc.log(cc.sys.BROWSER_TYPE_CHROME);
        cc.log(cc.sys.BROWSER_TYPE_LIEBAO);
        cc.log(cc.sys.BROWSER_TYPE_QZONE);
        cc.log(cc.sys.BROWSER_TYPE_SOUGOU);
        cc.log(cc.sys.BROWSER_TYPE_UNKNOWN);
    };
    Main.prototype.onShareResult = function (state) {
        SDKManager_1.default.getChannel().showToast("分享：" + state);
    };
    Main.prototype.onButtonOpenBannerClick = function () {
        this.node.addChild(cc.instantiate(this.BannerView));
    };
    Main.prototype.onButtonInsertClick = function () {
        this.node.addChild(cc.instantiate(this.insertView));
    };
    Main.prototype.onButtonNativeClick = function () {
        this.node.addChild(cc.instantiate(this.nativeView));
    };
    Main.prototype.onRewardAdResult = function (state) {
        SDKManager_1.default.getChannel().showToast("激励视频展示：" + state);
    };
    Main.prototype.onInstallIconResult = function (state) {
        SDKManager_1.default.getChannel().showToast("安装图标：" + state);
    };
    Main.prototype.onBtnClick = function (event) {
    };
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "BannerView", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "nativeView", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "insertView", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXE1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBSXBDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBdUZDO1FBbkZHLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWMsSUFBSSxDQUFDOztJQTZFakMsQ0FBQztJQTNFRyxvQkFBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzdCLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM5QixFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDMUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzFCLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMxQixFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDdEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN6QixFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDeEIsRUFB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QyxDQUFBO0lBQ3RELENBQUM7SUFFRCx5QkFBVSxHQUFWLFVBQVcsS0FBSztJQUNoQixDQUFDO0lBbEZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNTO0lBVlosSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXVGeEI7SUFBRCxXQUFDO0NBdkZELEFBdUZDLENBdkZpQyxFQUFFLENBQUMsU0FBUyxHQXVGN0M7a0JBdkZvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNES01hbmFnZXIgZnJvbSBcIi4vc2RrL1NES01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ2hhbm5lbElELCBSZXN1bHRTdGF0ZSB9IGZyb20gXCIuL3Nkay9TREtDb25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBCYW5uZXJWaWV3OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBuYXRpdmVWaWV3OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBpbnNlcnRWaWV3OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuTU9CSUxFX0JST1dTRVIpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5ERVNLVE9QX0JST1dTRVIpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5FRElUT1JfUEFHRSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkVESVRPUl9DT1JFKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuV0VDSEFUX0dBTUUpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5RUV9QTEFZKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuRkJfUExBWUFCTEVfQURTKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQkFJRFVfR0FNRSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLlZJVk9fR0FNRSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLk9QUE9fR0FNRSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkhVQVdFSV9HQU1FKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuWElBT01JX0dBTUUpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5KS1dfR0FNRSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkFMSVBBWV9HQU1FKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuV0VDSEFUX0dBTUVfU1VCKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQkFJRFVfR0FNRV9TVUIpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5RVFRfR0FNRSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkJZVEVEQU5DRV9HQU1FKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQllURURBTkNFX0dBTUVfU1VCKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuTElOS1NVUkUpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfV0VDSEFUKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQlJPV1NFUl9UWVBFX0FORFJPSUQpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfSUUpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfRURHRSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkJST1dTRVJfVFlQRV9RUSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkJST1dTRVJfVFlQRV9NT0JJTEVfUVEpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfVUMpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfVUNCUylcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkJST1dTRVJfVFlQRV8zNjApXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfQkFJRFVfQVBQKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQlJPV1NFUl9UWVBFX0JBSURVKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQlJPV1NFUl9UWVBFX01BWFRIT04pXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfT1BFUkEpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfT1VQRU5HKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQlJPV1NFUl9UWVBFX01JVUkpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfRklSRUZPWClcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkJST1dTRVJfVFlQRV9TQUZBUkkpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfQ0hST01FKVxyXG4gICAgICAgIGNjLmxvZyhjYy5zeXMuQlJPV1NFUl9UWVBFX0xJRUJBTylcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkJST1dTRVJfVFlQRV9RWk9ORSlcclxuICAgICAgICBjYy5sb2coY2Muc3lzLkJST1dTRVJfVFlQRV9TT1VHT1UpXHJcbiAgICAgICAgY2MubG9nKGNjLnN5cy5CUk9XU0VSX1RZUEVfVU5LTk9XTilcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uU2hhcmVSZXN1bHQoc3RhdGU6IFJlc3VsdFN0YXRlKSB7XHJcbiAgICAgICAgU0RLTWFuYWdlci5nZXRDaGFubmVsKCkuc2hvd1RvYXN0KFwi5YiG5Lqr77yaXCIgKyBzdGF0ZSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25CdXR0b25PcGVuQmFubmVyQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGNjLmluc3RhbnRpYXRlKHRoaXMuQmFubmVyVmlldykpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uQnV0dG9uSW5zZXJ0Q2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGNjLmluc3RhbnRpYXRlKHRoaXMuaW5zZXJ0VmlldykpXHJcbiAgICB9XHJcblxyXG4gICAgb25CdXR0b25OYXRpdmVDbGljaygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoY2MuaW5zdGFudGlhdGUodGhpcy5uYXRpdmVWaWV3KSlcclxuICAgIH1cclxuXHJcbiAgICBvblJld2FyZEFkUmVzdWx0KHN0YXRlOiBSZXN1bHRTdGF0ZSkge1xyXG4gICAgICAgIFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpLnNob3dUb2FzdChcIua/gOWKseinhumikeWxleekuu+8mlwiICsgc3RhdGUpXHJcbiAgICB9XHJcblxyXG4gICAgb25JbnN0YWxsSWNvblJlc3VsdChzdGF0ZTogUmVzdWx0U3RhdGUpIHtcclxuICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5zaG93VG9hc3QoXCLlronoo4Xlm77moIfvvJpcIiArIHN0YXRlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuQ2xpY2soZXZlbnQpe1xyXG4gICAgfVxyXG59XHJcbiJdfQ==