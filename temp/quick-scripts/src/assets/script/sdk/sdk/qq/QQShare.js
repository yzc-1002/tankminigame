"use strict";
cc._RF.push(module, 'e7bc8FdkVdKwabSiRAa80Vq', 'QQShare');
// script/sdk/sdk/qq/QQShare.ts

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
var QQShare = /** @class */ (function (_super) {
    __extends(QQShare, _super);
    function QQShare(channel) {
        var _this = _super.call(this, channel) || this;
        _this.time = 0;
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
            return _this.getData(0);
        });
        return _this;
    }
    QQShare.prototype.share = function (site, func, isShowRecorder) {
        this.callback = func;
        wx.shareAppMessage(this.getData(site));
        this.state = SDKConfig_1.SDKState.open;
        this.time = Date.now();
    };
    QQShare.prototype.getData = function (site) {
        var data = {
            title: this.channel.getParam(site, SDKConfig_1.ADName.shareTitle),
            imageUrl: this.channel.getParam(site, SDKConfig_1.ADName.shareImage),
            imageUrlId: ''
        };
        return data;
    };
    QQShare.prototype.backGame = function () {
        if (this.state == SDKConfig_1.SDKState.open) {
            this.state = SDKConfig_1.SDKState.close;
            if (this.callback) {
                var disTime = Date.now() - this.time;
                if (disTime >= 3000) {
                    this.callback(SDKConfig_1.ResultState.YES);
                }
                else {
                    this.callback(SDKConfig_1.ResultState.NO);
                }
                this.callback = null;
            }
        }
    };
    QQShare.prototype.getShareInfo = function (shareTicket, func) {
        if (shareTicket) {
            wx.getShareInfo({
                shareTicket: shareTicket,
                success: function (res) {
                    func(res);
                },
                fail: function () {
                }
            });
        }
    };
    return QQShare;
}(BaseShare_1.BaseShare));
exports.default = QQShare;

cc._RF.pop();