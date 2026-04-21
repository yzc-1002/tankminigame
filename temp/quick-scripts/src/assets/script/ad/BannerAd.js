"use strict";
cc._RF.push(module, '95cb7n9JthOQ48dkDAi+AWv', 'BannerAd');
// script/ad/BannerAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerAd = void 0;
var WechatBannerAd_1 = require("./wechat/WechatBannerAd");
var TTBannerAd_1 = require("./bytedance/TTBannerAd");
var AdmobBannerAd_1 = require("./admob/AdmobBannerAd");
// @ccclass
var BannerAd = /** @class */ (function () {
    function BannerAd() {
        this._banner = null; //横幅广告实例
        this._useBanner = true; //banner是否开启,未开启的不会显示广告(由配置表配置)
        this._useBanner = yyp.config.AD.banner['Use'] == 1;
        if (this._useBanner) {
            var height = yyp.config.AD.banner['Height'];
            var bannerHeight = height + (yyp.gameFrameSize.height - 1136) / 2;
            cc.log('BannerAd ', height, bannerHeight);
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                var adid = yyp.config.AD.banner['WxAdid'];
                this._banner = new WechatBannerAd_1.WechatBannerAd(adid, bannerHeight);
            }
            else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                var adid = yyp.config.AD.banner['TTAdid'];
                this._banner = new TTBannerAd_1.TTBannerAd(adid, bannerHeight);
            }
            else if (cc.sys.platform === cc.sys.ANDROID) {
                this._banner = new AdmobBannerAd_1.AdmobBannerAd();
            }
        }
        this.show();
    }
    BannerAd.getInstance = function () {
        if (BannerAd._sInstance == null) {
            BannerAd._sInstance = new BannerAd();
        }
        return BannerAd._sInstance;
    };
    /**
     * 展示广告
     */
    BannerAd.prototype.show = function () {
        if (this._useBanner) {
            if (this._banner) {
                this._banner._show();
            }
        }
    };
    /**
     * 隐藏广告
     */
    BannerAd.prototype.hide = function () {
        if (this._banner) {
            this._banner._hide();
        }
    };
    BannerAd.prototype.onDestroy = function () {
        if (this._banner) {
            this._banner._destroy();
        }
    };
    BannerAd._sInstance = null; //静态实例
    return BannerAd;
}());
exports.BannerAd = BannerAd;

cc._RF.pop();