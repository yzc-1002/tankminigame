
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/SDKManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcU0RLTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUF3QztBQUN4Qyw0Q0FBdUM7QUFDdkMsa0RBQTZDO0FBQzdDLDRDQUF1QztBQUN2QyxrREFBNkM7QUFDN0MsNENBQXVDO0FBQ3ZDLDRDQUF1QztBQUN2QywrQ0FBMEM7QUFFMUM7SUFBQTtRQUVjLFlBQU8sR0FBZ0IsSUFBSSxDQUFDO0lBNEMxQyxDQUFDO0lBekNVLHFCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxlQUFJLEdBQVgsVUFBWSxFQUFhO1FBQ3JCLElBQUksU0FBUyxHQUFXLEVBQUUsQ0FBQTtRQUMxQixRQUFRLFNBQVMsRUFBRTtZQUNmLEtBQUsscUJBQVMsQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUN2QyxNQUFNO1lBQ1YsS0FBSyxxQkFBUyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1CQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3ZDLE1BQU07WUFDVixLQUFLLHFCQUFTLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksbUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDdkMsTUFBTTtZQUNWLEtBQUsscUJBQVMsQ0FBQyxJQUFJO2dCQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUN6QyxNQUFNO1lBQ1YsS0FBSyxxQkFBUyxDQUFDLElBQUk7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3pDLE1BQU07WUFDVixLQUFLLHFCQUFTLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksbUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDdkMsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxvQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUN4QyxNQUFNO1NBQ2I7SUFFTCxDQUFDO0lBRUQsU0FBUztJQUNGLG1CQUFRLEdBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUk7SUFDRyxvQkFBUyxHQUFoQixVQUFpQixJQUFJLEVBQUUsUUFBUSxFQUFFLGNBQXdCO1FBQ3JELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQTlDQSxBQThDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDaGFubmVsIGZyb20gXCIuL2Jhc2UvQmFzZUNoYW5uZWxcIjtcclxuaW1wb3J0IHsgQ2hhbm5lbElEIH0gZnJvbSBcIi4vU0RLQ29uZmlnXCI7XHJcbmltcG9ydCBXWENoYW5uZWwgZnJvbSBcIi4vd3gvV1hDaGFubmVsXCI7XHJcbmltcG9ydCBPcHBvQ2hhbm5lbCBmcm9tIFwiLi9vcHBvL09wcG9DaGFubmVsXCI7XHJcbmltcG9ydCBRUUNoYW5uZWwgZnJvbSBcIi4vcXEvUVFDaGFubmVsXCI7XHJcbmltcG9ydCBWaXZvQ2hhbm5lbCBmcm9tIFwiLi92aXZvL1Zpdm9DaGFubmVsXCI7XHJcbmltcG9ydCBUVENoYW5uZWwgZnJvbSBcIi4vdHQvVFRDaGFubmVsXCI7XHJcbmltcG9ydCBCRENoYW5uZWwgZnJvbSBcIi4vYmQvQkRDaGFubmVsXCI7XHJcbmltcG9ydCBEZXZDaGFubmVsIGZyb20gXCIuL2Rldi9EZXZDaGFubmVsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTREtNYW5hZ2VyIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY2hhbm5lbDogQmFzZUNoYW5uZWwgPSBudWxsO1xyXG5cclxuICAgIHN0YXRpYyBjaGFubmVsOiBCYXNlQ2hhbm5lbDtcclxuICAgIHN0YXRpYyBnZXRDaGFubmVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluaXQoaWQ6IENoYW5uZWxJRCkge1xyXG4gICAgICAgIGxldCBjaGFubmVsSUQ6IG51bWJlciA9IGlkXHJcbiAgICAgICAgc3dpdGNoIChjaGFubmVsSUQpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFubmVsSUQuV1g6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5uZWwgPSBuZXcgV1hDaGFubmVsKGNoYW5uZWxJRClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYW5uZWxJRC5CRDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbm5lbCA9IG5ldyBCRENoYW5uZWwoY2hhbm5lbElEKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhbm5lbElELlRUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFubmVsID0gbmV3IFRUQ2hhbm5lbChjaGFubmVsSUQpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFubmVsSUQuVklWTzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbm5lbCA9IG5ldyBWaXZvQ2hhbm5lbChjaGFubmVsSUQpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFubmVsSUQuT1BQTzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbm5lbCA9IG5ldyBPcHBvQ2hhbm5lbChjaGFubmVsSUQpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFubmVsSUQuUVE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5uZWwgPSBuZXcgUVFDaGFubmVsKGNoYW5uZWxJRClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFubmVsID0gbmV3IERldkNoYW5uZWwoY2hhbm5lbElEKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuacieWIhuS6q+iDveWKm1xyXG4gICAgc3RhdGljIGhhc1NoYXJlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWwuaGFzU2hhcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIhuS6q1xyXG4gICAgc3RhdGljIHNob3dTaGFyZShzaXRlLCBjYWxsYmFjaywgaXNTaG93UmVjb3JkZXI/OiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbC5zaG93U2hhcmUoc2l0ZSwgY2FsbGJhY2ssIGlzU2hvd1JlY29yZGVyKTtcclxuICAgIH1cclxufVxyXG4iXX0=