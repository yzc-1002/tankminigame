"use strict";
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