"use strict";
cc._RF.push(module, 'b4ffdmsikRMbqO8DCVlIjkE', 'TTShare');
// script/sdk/sdk/tt/TTShare.ts

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
var BaseShare_1 = require("../base/BaseShare");
var SDKConfig_1 = require("../SDKConfig");
var TTShare = /** @class */ (function (_super) {
    __extends(TTShare, _super);
    function TTShare(channel) {
        var _this = _super.call(this, channel) || this;
        // GlobalEvent.instance().addEventListener(GlobalEvent.EVENT_SHOW, this.backGame, this)
        tt.showShareMenu({
            withShareTicket: true,
        });
        tt.updateShareMenu({
            withShareTicket: true
        });
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            // let visibleOrigin = Laya.Browser.clientWidth
            // let visibleSize = Laya.Browser.clientHeight
            return {
                title: this.channel.getParam(0, SDKConfig_1.ADName.shareTitle),
                imageUrl: this.channel.getParam(0, SDKConfig_1.ADName.shareImage),
                imageUrlId: '',
                success: function () {
                    console.log('onShareAppMessage 分享成功');
                },
                fail: function (e) {
                    console.log('分享失败', e);
                }
                // imageUrl: canvas.toTempFilePathSync({
                //     x: visibleOrigin.x,
                //     y: visibleOrigin.y,
                //     destWidth: visibleSize.width,
                //     destHeight: visibleSize.height
                // }),
                // success: () => {
                //     console.log('分享成功')
                //     this.shareSuccess();
                // },
                // fail: (e) => {
                //     console.log('分享失败', e)
                // }
            };
        });
        return _this;
    }
    TTShare.prototype.getData = function (site) {
        var data = {
            title: this.channel.getParam(site, SDKConfig_1.ADName.shareTitle),
            imageUrl: this.channel.getParam(site, SDKConfig_1.ADName.shareImage),
            imageUrlId: ''
        };
        return data;
    };
    TTShare.prototype.share = function (index, func, isShowRecorder) {
        var _this = this;
        // this.callback = func;
        var title = this.channel.getParam(index, SDKConfig_1.ADName.shareTitle);
        var videoPath = this.channel.getRecorder().getVideoPath();
        if (isShowRecorder && videoPath) {
            tt.shareAppMessage({
                channel: 'video',
                title: title,
                extra: {
                    videoPath: videoPath,
                },
                success: function () {
                    console.log('分享成功');
                    if (func) {
                        func(SDKConfig_1.ResultState.YES);
                    }
                    // this.shareSuccess();
                    _this.channel.getRecorder().clear();
                },
                fail: function (e) {
                    console.log('分享失败', e);
                    if (e.errMsg.indexOf('short') >= 0) {
                        _this.share(0, func, false);
                    }
                    else {
                        func(SDKConfig_1.ResultState.NO);
                        // ToastController.instance().showLayerByText("分享失败")
                    }
                }
                // x: visibleOrigin.x,
                // y: visibleOrigin.y,
                // imageUrl: canvas.toTempFilePathSync({
                //   destWidth: visibleSize.width,
                //   destHeight: visibleSize.height
                // })
            });
        }
        else {
            tt.shareAppMessage({
                desc: title,
                imageUrl: this.channel.getParam(index, SDKConfig_1.ADName.shareImage),
                title: '分享有礼',
                imageUrlId: '',
                success: function () {
                    console.log('分享成功');
                    if (func) {
                        func(SDKConfig_1.ResultState.YES);
                    }
                    // this.shareSuccess();
                },
                fail: function (e) {
                    console.log('分享失败');
                    func(SDKConfig_1.ResultState.NO);
                    // ToastController.instance().showLayerByText("分享失败")
                }
            });
        }
    };
    TTShare.prototype.getShareInfo = function (shareTicket, func) {
        if (shareTicket) {
            tt.getShareInfo({
                shareTicket: shareTicket,
                success: function () {
                },
                fail: function () {
                }
            });
        }
    };
    return TTShare;
}(BaseShare_1.BaseShare));
exports.default = TTShare;

cc._RF.pop();