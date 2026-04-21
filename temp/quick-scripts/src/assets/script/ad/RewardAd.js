"use strict";
cc._RF.push(module, '2fce4woZnpI2oe7zPSqFJki', 'RewardAd');
// script/ad/RewardAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardAd = void 0;
var WechatRewardAd_1 = require("./wechat/WechatRewardAd");
var TTRewardAd_1 = require("./bytedance/TTRewardAd");
var AdmobRewardAd_1 = require("./admob/AdmobRewardAd");
var RewardAd = /** @class */ (function () {
    function RewardAd() {
        this._reward = null; //视频广告实例
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (yyp.config.AD.reward['Use'] == 1) {
                var adid = yyp.config.AD.reward['WxAdid'];
                this._reward = new WechatRewardAd_1.WechatRewardAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            if (yyp.config.AD.reward['Use'] == 1) {
                var adid = yyp.config.AD.reward['TTAdid'];
                this._reward = new TTRewardAd_1.TTRewardAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this._reward = new AdmobRewardAd_1.AdmobRewardAd();
        }
    }
    RewardAd.getInstance = function () {
        if (RewardAd._sInstance == null) {
            RewardAd._sInstance = new RewardAd();
        }
        return RewardAd._sInstance;
    };
    /**
     * 广告是否已经加载成功
     */
    RewardAd.prototype.isLoad = function () {
        if (this._reward) {
            return this._reward._isLoad();
        }
        return false;
    };
    /**
     * /展示广告
     * @param callback :广告播放后的状态回调
     */
    RewardAd.prototype.show = function (callback) {
        console.log("AdManager RewardAd show1 ", callback);
        if (this._reward) {
            console.log("AdManager RewardAd show2 ", callback);
            this._reward._show(callback);
        }
    };
    RewardAd._sInstance = null; //静态实例
    return RewardAd;
}());
exports.RewardAd = RewardAd;

cc._RF.pop();