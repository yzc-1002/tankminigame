"use strict";
cc._RF.push(module, '0678cKubnZM2r4DRIrHZco2', 'SDKManager');
// script/sdk/sdk/SDKManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDKConfig_1 = require("./SDKConfig");
var WXChannel_1 = require("./wx/WXChannel");
var OppoChannel_1 = require("./oppo/OppoChannel");
var QQChannel_1 = require("./qq/QQChannel");
var VivoChannel_1 = require("./vivo/VivoChannel");
var TTChannel_1 = require("./tt/TTChannel");
var BDChannel_1 = require("./bd/BDChannel");
var DevChannel_1 = require("./dev/DevChannel");
var SDKManager = /** @class */ (function () {
    function SDKManager() {
        this.channel = null;
    }
    SDKManager.getChannel = function () {
        return this.channel;
    };
    SDKManager.init = function (id) {
        var channelID = id;
        switch (channelID) {
            case SDKConfig_1.ChannelID.WX:
                this.channel = new WXChannel_1.default(channelID);
                break;
            case SDKConfig_1.ChannelID.BD:
                this.channel = new BDChannel_1.default(channelID);
                break;
            case SDKConfig_1.ChannelID.TT:
                this.channel = new TTChannel_1.default(channelID);
                break;
            case SDKConfig_1.ChannelID.VIVO:
                this.channel = new VivoChannel_1.default(channelID);
                break;
            case SDKConfig_1.ChannelID.OPPO:
                this.channel = new OppoChannel_1.default(channelID);
                break;
            case SDKConfig_1.ChannelID.QQ:
                this.channel = new QQChannel_1.default(channelID);
                break;
            default:
                this.channel = new DevChannel_1.default(channelID);
                break;
        }
    };
    //是否有分享能力
    SDKManager.hasShare = function () {
        return this.channel.hasShare();
    };
    //分享
    SDKManager.showShare = function (site, callback, isShowRecorder) {
        return this.channel.showShare(site, callback, isShowRecorder);
    };
    return SDKManager;
}());
exports.default = SDKManager;

cc._RF.pop();