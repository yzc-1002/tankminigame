
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/bd/BDRewardAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5edf5YXpZlP5r7oHRk4gluw', 'BDRewardAd');
// script/sdk/sdk/bd/BDRewardAd.ts

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
var BDRewardAd = /** @class */ (function (_super) {
    __extends(BDRewardAd, _super);
    function BDRewardAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    BDRewardAd.prototype.open = function (adID, callback) {
        console.log(' showReward adID ', adID);
        if (this.state == SDKConfig_1.SDKState.loading) {
            return;
        }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        if (this.adUnitID != adID) {
            this.adUnitID = adID;
            this.create(adID);
        }
        else {
            this.show();
        }
    };
    BDRewardAd.prototype.show = function () {
        var _this = this;
        if (!this.instance) {
            this.callback(SDKConfig_1.ResultState.NO);
            return;
        }
        this.instance.show().then(function () {
            _this.setState(SDKConfig_1.SDKState.open);
            console.log(' 激励视频展示成功 ');
        }).catch(function () {
            // 失败重试
            console.log(' show  激励视频 播放失败重试');
            _this.instance.load()
                .then(function () {
                _this.instance.show();
                _this.setState(SDKConfig_1.SDKState.open);
            })
                .catch(function (err) {
                console.log(' 激励视频重试失败 err ', err);
                _this.setState(SDKConfig_1.SDKState.loadFail);
                // callback(false)
                _this.channel.showShare(0, _this.callback);
            });
        });
    };
    BDRewardAd.prototype.create = function (id) {
        this.adUnitID = id;
        if (!this.instance) {
            console.log('createVideoAd id ', id);
            this.instance = swan.createRewardedVideoAd({ adUnitId: id, appSid: 'bfbff884' });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
        }
    };
    BDRewardAd.prototype.onError = function (err) {
        console.log('BDRewardAd error ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (this.callback) {
            this.callback(SDKConfig_1.ResultState.NO);
        }
    };
    BDRewardAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        if (this.loadCount == 0) {
            this.instance.show();
            this.setState(SDKConfig_1.SDKState.loadSucess);
        }
        this.loadCount++;
        // sel
    };
    BDRewardAd.prototype.onClose = function (res) {
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
    return BDRewardAd;
}(BaseAd_1.default));
exports.default = BDRewardAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmRcXEJEUmV3YXJkQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLDBDQUFxRTtBQUVyRTtJQUF3Qyw4QkFBTTtJQUE5QztRQUFBLHFFQWdHQztRQS9GYSxlQUFTLEdBQVcsQ0FBQyxDQUFDOztJQStGcEMsQ0FBQztJQTdGRyx5QkFBSSxHQUFKLFVBQUssSUFBWSxFQUFFLFFBQXdCO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLG9CQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDcEI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUNkO0lBR0wsQ0FBQztJQUVTLHlCQUFJLEdBQWQ7UUFBQSxpQkEwQkM7UUF6QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzdCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QixPQUFPLENBQUMsR0FBRyxD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QUFDLHVCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDakM7U0FFSjthQUFNO1lBQ0gsaUJBQWlCO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIseURBQXlEO2FBQzVEO1NBRUo7SUFDTCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQWhHQSxBQWdHQyxDQWhHdUMsZ0JBQU0sR0FnRzdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES1N0YXRlLCBSZXN1bHRDYWxsYmFjaywgUmVzdWx0U3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCRFJld2FyZEFkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIHByb3RlY3RlZCBsb2FkQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2s6IFJlc3VsdENhbGxiYWNrO1xyXG4gICAgb3BlbihhZElEOiBzdHJpbmcsIGNhbGxiYWNrOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgc2hvd1Jld2FyZCBhZElEICcsIGFkSUQpXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU0RLU3RhdGUubG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRpbmcpXHJcbiAgICAgICAgaWYgKHRoaXMuYWRVbml0SUQgIT0gYWRJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkVW5pdElEID0gYWRJRFxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZShhZElEKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNob3coKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUub3BlbilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyDmv4DlirHop4bpopHlsZXnpLrmiJDlip8gJylcclxuXHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyBzaG93ICDmv4DlirHop4bpopEg5pKt5pS+5aSx6LSl6YeN6K+VJylcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5sb2FkKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUub3BlbilcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyDmv4DlirHop4bpopHph43or5XlpLHotKUgZXJyICcsIGVycilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRGYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5zaG93U2hhcmUoMCwgdGhpcy5jYWxsYmFjaylcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBjcmVhdGUoaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZVZpZGVvQWQgaWQgJywgaWQpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBzd2FuLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7IGFkVW5pdElkOiBpZCwgYXBwU2lkOiAnYmZiZmY4ODQnIH0pXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25Mb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25FcnJvcih0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkNsb3NlKHRoaXMub25DbG9zZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVycm9yKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdCRFJld2FyZEFkIGVycm9yICcsIGVycilcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRGYWlsKVxyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR5Yqg6L295oiQ5YqfICcsIHRoaXMubG9hZENvdW50KVxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRDb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRTdWNlc3MpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZENvdW50Kys7XHJcbiAgICAgICAgLy8gc2VsXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uQ2xvc2UocmVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5jbG9zZSlcclxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHnu5PmnZ/lhbPpl60gJylcclxuICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+inhumikeS4remAlOWFs+mXrSAnKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5OTyk7XHJcbiAgICAgICAgICAgICAgICAvLyBUb2FzdENvbnRyb2xsZXIuaW5zdGFuY2UoKS5pbnRvTGF5ZXIoJ3VpLm5vdF9maW5pc2gnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=