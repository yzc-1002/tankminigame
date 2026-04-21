"use strict";
cc._RF.push(module, '14f3adYYatC0oQw94pDs1Kf', 'Share');
// script/ad/Share.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Share = void 0;
var WechatShare_1 = require("./wechat/WechatShare");
var TTShareEx_1 = require("./bytedance/TTShareEx");
var AdmobShare_1 = require("./admob/AdmobShare");
var Share = /** @class */ (function () {
    function Share() {
        this._share = null; //分享实例
        this._list = []; //分享内容列表
        this._enabled = true; //是否允许分享
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this._getShareList('wx');
            this._share = new WechatShare_1.WechatShare(this._list);
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            this._getShareList('tt');
            this._share = new TTShareEx_1.TTShareEx(this._list);
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this._getShareList('admob');
            this._share = new AdmobShare_1.AdmobShare(this._list);
        }
        else {
            this._enabled = false;
        }
    }
    Share.getInstance = function () {
        if (Share._sInstance == null) {
            Share._sInstance = new Share();
        }
        return Share._sInstance;
    };
    //获取分享参数
    Share.prototype._getShareList = function (channle) {
        for (var key in yyp.config.SHARE) {
            if (yyp.config.SHARE.hasOwnProperty(key)) {
                var element = yyp.config.SHARE[key];
                if (element['Channel'] == channle) {
                    this._list.push(element);
                }
            }
        }
    };
    /**
     * 分享一条指定的内容
     * @param callback : 分享的回调函数
     * @param index : 分享内容的索引
     * @param arg : 目前只有安卓平台可能需要传递(替换分享内容中的{0})
     */
    Share.prototype.share = function (callback, index, arg) {
        if (arg === void 0) { arg = 1; }
        console.log("AndroidShare Share show1 ", index);
        if (this._share) {
            console.log("AndroidShare Share show2 ", index);
            this._share.share(callback, index, arg);
        }
    };
    /**
     * 是否允许分享
     */
    Share.prototype.enabled = function () {
        return this._enabled;
    };
    Share._sInstance = null; //静态实例
    return Share;
}());
exports.Share = Share;

cc._RF.pop();