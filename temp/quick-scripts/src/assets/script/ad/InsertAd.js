"use strict";
cc._RF.push(module, '4b229P1IDtDt6FoKw25umUv', 'InsertAd');
// script/ad/InsertAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertAd = void 0;
var WechatInsertAd_1 = require("./wechat/WechatInsertAd");
var TTInsertAd_1 = require("./bytedance/TTInsertAd");
var AdmobInsertAd_1 = require("./admob/AdmobInsertAd");
var InsertAd = /** @class */ (function () {
    function InsertAd() {
        this._insert = null; //插屏广告实例
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (yyp.config.AD.insert['Use'] == 1) {
                var adid = yyp.config.AD.insert['WxAdid'];
                this._insert = new WechatInsertAd_1.WechatInsertAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            if (yyp.config.AD.insert['Use'] == 1) {
                var adid = yyp.config.AD.insert['TTAdid'];
                this._insert = new TTInsertAd_1.TTInsertAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this._insert = new AdmobInsertAd_1.AdmobInsertAd();
        }
    }
    InsertAd.getInstance = function () {
        if (InsertAd._sInstance == null) {
            InsertAd._sInstance = new InsertAd();
        }
        return InsertAd._sInstance;
    };
    /**
     * 广告是否已经加载成功
     */
    InsertAd.prototype.isLoad = function () {
        if (this._insert) {
            return this._insert._isLoad();
        }
        return false;
    };
    /**
     * 展示广告
     */
    InsertAd.prototype.show = function () {
        if (this._insert) {
            this._insert._show();
        }
    };
    InsertAd._sInstance = null; //静态实例
    return InsertAd;
}());
exports.InsertAd = InsertAd;

cc._RF.pop();