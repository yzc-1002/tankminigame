
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoRewardAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c11boTnl9MSJdkFQqRvbT5', 'OppoRewardAd');
// script/sdk/sdk/oppo/OppoRewardAd.ts

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
var SDKConfig_1 = require("../SDKConfig");
var BaseAd_1 = require("../base/BaseAd");
// import SDKManager from "../SDKManager";
// import ToastController from "../../logic/toast/ToastController";
//https://open.oppomobile.com/wiki/doc#id=10537
var OppoRewardAd = /** @class */ (function (_super) {
    __extends(OppoRewardAd, _super);
    function OppoRewardAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    OppoRewardAd.prototype.onError = function (err) {
        console.log('QQVideoAd error ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (this.callback) {
            // SDKManager.getChannel().showShare(this.rewardCallback)
            this.callback(SDKConfig_1.ResultState.NO);
        }
    };
    OppoRewardAd.prototype.show = function () {
        this.instance.show();
    };
    //oppo渠道需要自己主动加载视频
    OppoRewardAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        // if (this.loadCount == 0) {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
        // }
        this.loadCount++;
        // sel
    };
    OppoRewardAd.prototype.onClose = function (res) {
        this.setState(SDKConfig_1.SDKState.close);
        if (res && res.isEnded || res === undefined) {
            console.log('视频结束关闭 ');
            // 正常播放结束，可以下发游戏奖励
            if (this.callback) {
                this.callback(SDKConfig_1.ResultState.YES);
            }
        }
        else {
            // 播放中途退出，不下发游戏奖励
            console.log('视频中途关闭 ');
            if (this.callback) {
                this.callback(SDKConfig_1.ResultState.NO);
                // ToastController.instance().intoLayer('ui.not_finish');
            }
        }
    };
    OppoRewardAd.prototype.create = function (id) {
        this.loadCount = 0;
        this.adUnitID = id;
        console.log(' 不支持多例');
        if (this.instance == null) {
            this.instance = qg.createRewardedVideoAd({ adUnitId: id });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            console.log(' 创建成功');
        }
        else {
            // this.instance.load();
            console.log(' 主动加载');
        }
        this.instance.load();
    };
    OppoRewardAd.prototype.open = function (adID, callback) {
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        // if (this.adUnitID != adID) {
        //     this.adUnitID = adID
        this.create(adID);
        // } else {
        //     this.show()
        // }
    };
    return OppoRewardAd;
}(BaseAd_1.default));
exports.default = OppoRewardAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb1Jld2FyZEFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFxRTtBQUNyRSx5Q0FBb0M7QUFFcEMsMENBQTBDO0FBQzFDLG1FQUFtRTtBQUNuRSwrQ0FBK0M7QUFDL0M7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUFzRkM7UUFwRmEsZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUFvRnBDLENBQUM7SUEvRUcsOEJBQU8sR0FBUCxVQUFRLEdBQUc7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBRXBDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZix5REFBeUQ7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ2hDO0lBQ0wsQ0FBQztJQUVTLDJCQUFJLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQkFBa0I7SUFDbEIsNkJBQU0sR0FBTjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0Qyw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUVYLElBQUk7UUFDSixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsTUFBTTtJQUNWLENBQUM7SUFFRCw4QkFBTyxHQUFQLFVBQVEsR0FBRztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN0QixrQkFBa0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNqQztTQUVKO2FBQU07WUFDSCxpQkFBaUI7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5Qix5REFBeUQ7YUFDNUQ7U0FFSjtJQUNMLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sRUFBVTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDdkI7YUFBTTtZQUNILHdCQUF3QjtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV6QixDQUFDO0lBQ0QsMkJBQUksR0FBSixVQUFLLElBQVksRUFBRSxRQUF3QjtRQUN2Qyx1Q0FBdUM7UUFDdkMsY0FBYztRQUNkLElBQUk7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDL0IsK0JBQStCO1FBQy9CLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLFdBQVc7UUFDWCxrQkFBa0I7UUFDbEIsSUFBSTtJQUdSLENBQUM7SUFDTCxtQkFBQztBQUFELENBdEZBLEFBc0ZDLENBdEZ5QyxnQkFBTSxHQXNGL0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgUmVzdWx0Q2FsbGJhY2ssIFNES1N0YXRlLCBSZXN1bHRTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuaW1wb3J0IEJhc2VBZCBmcm9tIFwiLi4vYmFzZS9CYXNlQWRcIjtcclxuXHJcbi8vIGltcG9ydCBTREtNYW5hZ2VyIGZyb20gXCIuLi9TREtNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCBUb2FzdENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL2xvZ2ljL3RvYXN0L1RvYXN0Q29udHJvbGxlclwiO1xyXG4vL2h0dHBzOi8vb3Blbi5vcHBvbW9iaWxlLmNvbS93aWtpL2RvYyNpZD0xMDUzN1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHBvUmV3YXJkQWQgZXh0ZW5kcyBCYXNlQWQge1xyXG4gICAgcHJvdGVjdGVkIGNhbGxiYWNrOiBSZXN1bHRDYWxsYmFjaztcclxuICAgIHByb3RlY3RlZCBsb2FkQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG5cclxuXHJcblxyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUVFWaWRlb0FkIGVycm9yICcsIGVycilcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLyBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5zaG93U2hhcmUodGhpcy5yZXdhcmRDYWxsYmFjaylcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5OTylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNob3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9vcHBv5rig6YGT6ZyA6KaB6Ieq5bex5Li75Yqo5Yqg6L296KeG6aKRXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+inhumikeWKoOi9veaIkOWKnyAnLCB0aGlzLmxvYWRDb3VudClcclxuICAgICAgICAvLyBpZiAodGhpcy5sb2FkQ291bnQgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZFN1Y2VzcylcclxuICAgICAgICB0aGlzLnNob3coKVxyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5sb2FkQ291bnQrKztcclxuICAgICAgICAvLyBzZWxcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKHJlcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUuY2xvc2UpXHJcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR57uT5p2f5YWz6ZetICcpXHJcbiAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5ZRVMpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHkuK3pgJTlhbPpl60gJylcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9hc3RDb250cm9sbGVyLmluc3RhbmNlKCkuaW50b0xheWVyKCd1aS5ub3RfZmluaXNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgICAgICBjb25zb2xlLmxvZygnIOS4jeaUr+aMgeWkmuS+iycpXHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gcWcuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHsgYWRVbml0SWQ6IGlkIH0pXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25Mb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25FcnJvcih0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkNsb3NlKHRoaXMub25DbG9zZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIOWIm+W7uuaIkOWKnycpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbnN0YW5jZS5sb2FkKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5Li75Yqo5Yqg6L29JylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UubG9hZCgpO1xyXG5cclxuICAgIH1cclxuICAgIG9wZW4oYWRJRDogc3RyaW5nLCBjYWxsYmFjazogUmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5zdGF0ZSA9PSBBZFN0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkaW5nKVxyXG4gICAgICAgIC8vIGlmICh0aGlzLmFkVW5pdElEICE9IGFkSUQpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5hZFVuaXRJRCA9IGFkSURcclxuICAgICAgICB0aGlzLmNyZWF0ZShhZElEKVxyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvdygpXHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=