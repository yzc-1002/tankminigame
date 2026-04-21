
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/wx/WXRewardedVideoAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2c39ebadvVIFZO5Wxs+RyzC', 'WXRewardedVideoAd');
// script/sdk/sdk/wx/WXRewardedVideoAd.ts

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
var BaseAd_1 = require("../base/BaseAd");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createRewardedVideoAd.html
 * 调用该方法创建的激励视频广告是一个单例
 * 默认是隐藏的，需要调用 RewardedVideoAd.show() 将其显示。
 * 每次创建自动加载
 */
var WXRewardedVideoAd = /** @class */ (function (_super) {
    __extends(WXRewardedVideoAd, _super);
    function WXRewardedVideoAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //第几次load，第一次默认load
        _this.loadCount = 0;
        return _this;
    }
    WXRewardedVideoAd.prototype.open = function (adID, callback) {
        console.log(' showReward adID ', adID);
        if (this.state == SDKConfig_1.SDKState.loading) {
            return;
        }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        if (this.adUnitID != adID) {
            this.create(adID);
        }
        else {
            //由于关闭后微信会自动加载，所以这里不需要手动load。
            this.show();
        }
    };
    WXRewardedVideoAd.prototype.onError = function (err) {
        console.log('WXVideoAd error ', err);
        // ToastController.instance().show('视频加载失败，无法获得奖励')
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (SDKConfig_1.USE_SHARE && this.channel.hasShare()) {
            this.channel.showShare(0, this.callback);
        }
        else {
            if (this.callback) {
                this.callback(SDKConfig_1.ResultState.NO);
                // ToastController.instance().intoLayer('ui.not_finish');
            }
        }
    };
    WXRewardedVideoAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        if (this.loadCount == 0) {
            this.instance.show();
            this.setState(SDKConfig_1.SDKState.loadSucess);
        }
        this.loadCount++;
        // sel
    };
    WXRewardedVideoAd.prototype.onClose = function (res) {
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
            }
        }
    };
    WXRewardedVideoAd.prototype.destroy = function () {
        if (this.instance) {
            // console.log('清理开始 ')
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offClose(this.onClose.bind(this));
            this.instance.destroy();
            this.instanceMap[this.adUnitID] = null;
            this.instance = null;
            // this.instance = null;
        }
    };
    WXRewardedVideoAd.prototype.create = function (adID) {
        this.adUnitID = adID;
        this.loadCount = 0;
        var sdkVersion = wx.getSystemInfoSync().SDKVersion;
        if (!this.instanceMap[adID]) {
            if (SDKConfig_1.compareVersion(sdkVersion, '2.8.0')) {
                this.instance = wx.createRewardedVideoAd({ adUnitId: adID, multiton: true });
            }
            else {
                console.log(' 不支持多例');
                this.instance = wx.createRewardedVideoAd({ adUnitId: adID });
            }
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            this.instanceMap[adID] = this.instance;
        }
        else {
            //微信会在第一次创建的时候默认load一次。
            this.instance.load();
        }
    };
    WXRewardedVideoAd.prototype.show = function () {
        var _this = this;
        this.instance.show().then(function () {
            _this.setState(SDKConfig_1.SDKState.open);
            console.log(' 激励视频展示成功 ');
        }).catch(function () {
            // 失败重试
            console.log(' show  激励视频 播放失败重试');
            _this.instance.load()
                .then(function () {
                _this.setState(SDKConfig_1.SDKState.open);
                _this.instance.show();
            })
                .catch(function (err) {
                console.log(' 激励视频重试失败 err ', err);
                _this.setState(SDKConfig_1.SDKState.loadFail);
            });
        });
    };
    return WXRewardedVideoAd;
}(BaseAd_1.default));
exports.default = WXRewardedVideoAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcd3hcXFdYUmV3YXJkZWRWaWRlb0FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywwQ0FBZ0c7QUFDaEc7Ozs7O0dBS0c7QUFDSDtJQUErQyxxQ0FBTTtJQUFyRDtRQUFBLHFFQXVIQztRQXJIRyxtQkFBbUI7UUFDVCxlQUFTLEdBQVcsQ0FBQyxDQUFDOztJQW9IcEMsQ0FBQztJQWxIRyxnQ0FBSSxHQUFKLFVBQUssSUFBWSxFQUFFLFFBQXdCO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLG9CQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDcEI7YUFBTTtZQUNILDZCQUE2QjtZQUM3QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDZDtJQUVMLENBQUM7SUFHUyxtQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDcEMsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQyxJQUFHLHFCQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVB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QUc7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQXZIQSxBQXVIQyxDQXZIOEMsZ0JBQU0sR0F1SHBEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VBZCBmcm9tIFwiLi4vYmFzZS9CYXNlQWRcIjtcclxuaW1wb3J0IHsgUmVzdWx0Q2FsbGJhY2ssIFNES1N0YXRlLCBSZXN1bHRTdGF0ZSwgY29tcGFyZVZlcnNpb24sIFVTRV9TSEFSRSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuLyoqXHJcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL21pbmlnYW1lL2Rldi9hcGkvYWQvd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkLmh0bWxcclxuICog6LCD55So6K+l5pa55rOV5Yib5bu655qE5r+A5Yqx6KeG6aKR5bm/5ZGK5piv5LiA5Liq5Y2V5L6LXHJcbiAqIOm7mOiupOaYr+makOiXj+eahO+8jOmcgOimgeiwg+eUqCBSZXdhcmRlZFZpZGVvQWQuc2hvdygpIOWwhuWFtuaYvuekuuOAglxyXG4gKiDmr4/mrKHliJvlu7roh6rliqjliqDovb1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdYUmV3YXJkZWRWaWRlb0FkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIHByb3RlY3RlZCBpbnN0YW5jZTogd3guUmV3YXJkZWRWaWRlb0FkO1xyXG4gICAgLy/nrKzlh6DmrKFsb2Fk77yM56ys5LiA5qyh6buY6K6kbG9hZFxyXG4gICAgcHJvdGVjdGVkIGxvYWRDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBvcGVuKGFkSUQ6IHN0cmluZywgY2FsbGJhY2s6IFJlc3VsdENhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBzaG93UmV3YXJkIGFkSUQgJywgYWRJRClcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTREtTdGF0ZS5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZGluZylcclxuICAgICAgICBpZiAodGhpcy5hZFVuaXRJRCAhPSBhZElEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKGFkSUQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/nlLHkuo7lhbPpl63lkI7lvq7kv6HkvJroh6rliqjliqDovb3vvIzmiYDku6Xov5nph4zkuI3pnIDopoHmiYvliqhsb2Fk44CCXHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dYVmlkZW9BZCBlcnJvciAnLCBlcnIpXHJcbiAgICAgICAgLy8gVG9hc3RDb250cm9sbGVyLmluc3RhbmNlKCkuc2hvdygn6KeG6aKR5Yqg6L295aSx6LSl77yM5peg5rOV6I635b6X5aWW5YqxJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRGYWlsKVxyXG4gICAgICAgIGlmKFVTRV9TSEFSRSAmJiB0aGlzLmNoYW5uZWwuaGFzU2hhcmUoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5zaG93U2hhcmUoMCx0aGlzLmNhbGxiYWNrKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5OTyk7XHJcbiAgICAgICAgICAgICAgICAvLyBUb2FzdENvbnRyb2xsZXIuaW5zdGFuY2UoKS5pbnRvTGF5ZXIoJ3VpLm5vdF9maW5pc2gnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR5Yqg6L295oiQ5YqfICcsIHRoaXMubG9hZENvdW50KVxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRDb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRTdWNlc3MpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZENvdW50Kys7XHJcbiAgICAgICAgLy8gc2VsXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UocmVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5jbG9zZSlcclxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHnu5PmnZ/lhbPpl60gJylcclxuICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+inhumikeS4remAlOWFs+mXrSAnKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5OTyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmuIXnkIblvIDlp4sgJylcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZMb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmQ2xvc2UodGhpcy5vbkNsb3NlLmJpbmQodGhpcykpXHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZU1hcFt0aGlzLmFkVW5pdElEXSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlKGFkSUQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBhZElEXHJcbiAgICAgICAgdGhpcy5sb2FkQ291bnQgPSAwO1xyXG4gICAgICAgIGxldCBzZGtWZXJzaW9uID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5TREtWZXJzaW9uO1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZU1hcFthZElEXSkge1xyXG4gICAgICAgICAgICBpZiAoY29tcGFyZVZlcnNpb24oc2RrVmVyc2lvbiwgJzIuOC4wJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoeyBhZFVuaXRJZDogYWRJRCwgbXVsdGl0b246IHRydWUgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5LiN5pSv5oyB5aSa5L6LJylcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoeyBhZFVuaXRJZDogYWRJRCB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uTG9hZCh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25DbG9zZSh0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZU1hcFthZElEXSA9IHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/lvq7kv6HkvJrlnKjnrKzkuIDmrKHliJvlu7rnmoTml7blgJnpu5jorqRsb2Fk5LiA5qyh44CCXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UubG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzaG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLm9wZW4pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5r+A5Yqx6KeG6aKR5bGV56S65oiQ5YqfICcpXHJcblxyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgLy8g5aSx6LSl6YeN6K+VXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgc2hvdyAg5r+A5Yqx6KeG6aKRIOaSreaUvuWksei0pemHjeivlScpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5vcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyDmv4DlirHop4bpopHph43or5XlpLHotKUgZXJyICcsIGVycilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRGYWlsKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==