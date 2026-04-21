"use strict";
cc._RF.push(module, '7a7a6YUSYRCF6NtrL3/Bxt+', 'WechatShare');
// script/ad/wechat/WechatShare.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatShare = void 0;
/**
 * https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html
 */
var WechatShare = /** @class */ (function () {
    function WechatShare(list) {
        var _this = this;
        //由于微信无法得到分享结果，所以以时间来判断是否成功。
        this.time = 0;
        this._list = [];
        this._list = list;
        wx.showShareMenu({
            withShareTicket: true,
        });
        wx.updateShareMenu({
            withShareTicket: true
        });
        wx.onShow(function () {
            _this.backGame();
        });
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return _this._getData(0);
        });
    }
    //回调函数,分享的id
    WechatShare.prototype.share = function (func, index) {
        this.callback = func;
        // index = index ? index : Math.floor(Math.random()*this._list.length);
        wx.shareAppMessage(this._getData(index));
        this.time = Date.now();
    };
    //获取分享参数
    WechatShare.prototype._getData = function (index) {
        var data = {
            title: this._list[index].Title,
            imageUrl: this._list[index].ImageUrl,
            imageUrlId: this._list[index].ImageId
        };
        data = wx.uma['trackShare'](data); //友盟统计
        return data;
    };
    WechatShare.prototype.backGame = function () {
        if (this.callback) {
            var disTime = Date.now() - this.time;
            if (disTime >= 4000) {
                this.callback(true);
            }
            else {
                this.callback(false);
            }
            this.callback = null;
        }
    };
    return WechatShare;
}());
exports.WechatShare = WechatShare;

cc._RF.pop();