"use strict";
cc._RF.push(module, 'ba9e4D8MXtDqrZhhjfccJIh', 'TTShareEx');
// script/ad/bytedance/TTShareEx.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTShareEx = void 0;
var TTShareEx = /** @class */ (function () {
    function TTShareEx(list) {
        this._list = [];
        this._list = list;
        tt.showShareMenu({
            withShareTicket: true,
        });
        tt.updateShareMenu({
            withShareTicket: true
        });
        var self = this;
        tt.onShareAppMessage(function (res) {
            console.log(res.channel);
            return {
                desc: self._list[0].Title,
                imageUrl: self._list[0].ImageUrl,
                title: '分享有礼',
                imageUrlId: '',
                success: function () {
                    console.log('onShareAppMessage 分享成功');
                },
                fail: function (e) {
                    console.log('分享失败', e);
                }
            };
        });
    }
    TTShareEx.prototype.share = function (func, index) {
        console.log('TTShareEx showa ', index);
        // index = index ? index : Math.floor(Math.random()*this._list.length);
        console.log('TTShareEx showb ', index);
        tt.shareAppMessage({
            desc: this._list[index].Title,
            imageUrl: this._list[index].ImageUrl,
            title: '分享有礼',
            imageUrlId: '',
            success: function (ret) {
                console.log('TTShareEx 分享成功 ', JSON.stringify(ret));
                if (func) {
                    func(true); //字节开发者工具返回结果不准确,要是用真机调试
                }
            },
            fail: function (e) {
                console.log('TTShareEx 分享失败 ', JSON.stringify(e));
                if (func) {
                    func(false);
                }
            }
        });
    };
    return TTShareEx;
}());
exports.TTShareEx = TTShareEx;

cc._RF.pop();