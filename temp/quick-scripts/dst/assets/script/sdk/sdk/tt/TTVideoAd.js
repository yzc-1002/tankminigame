
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/tt/TTVideoAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1671F+5OpMZYt/gSX5kGVV', 'TTVideoAd');
// script/sdk/sdk/tt/TTVideoAd.ts

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
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/open-capacity/ads/tt.createrewardedvideoad
 */
var TTVideoAd = /** @class */ (function (_super) {
    __extends(TTVideoAd, _super);
    function TTVideoAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    TTVideoAd.prototype.onError = function (err) {
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
    TTVideoAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        if (this.loadCount == 0) {
            this.instance.show();
            this.setState(SDKConfig_1.SDKState.loadSucess);
        }
        this.loadCount++;
        // sel
    };
    TTVideoAd.prototype.onClose = function (res) {
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
    TTVideoAd.prototype.create = function (id) {
        this.adUnitID = id;
        this.loadCount = 0;
        console.log(' 不支持多例');
        if (this.instance == null) {
            this.instance = tt.createRewardedVideoAd({ adUnitId: id });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
        }
        else {
            this.instance.load();
        }
    };
    TTVideoAd.prototype.open = function (adID, callback) {
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
    TTVideoAd.prototype.show = function () {
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
    return TTVideoAd;
}(BaseAd_1.default));
exports.default = TTVideoAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdHRcXFRUVmlkZW9BZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBb0M7QUFDcEMsMENBQWdGO0FBQ2hGOztHQUVHO0FBQ0g7SUFBdUMsNkJBQU07SUFBN0M7UUFBQSxxRUE0R0M7UUF4R2EsZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUF3R3BDLENBQUM7SUF2R0csMkJBQU8sR0FBUCxVQUFRLEdBQUc7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3BDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEMsSUFBSSxxQkFBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUMzQzthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIseURBQXlEO2FBQzVEO1NBQ0o7SUFDTCxDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0QyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE1BQU07SUFDVixDQUFD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R0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7WUFDakMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7aUJBQ2YsSUFBSSxDQUFDO2dCQUNGLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVoQyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUNsQyxLQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ2hDLGtCQUFrQjtnQkFDbEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUU1QyxDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdMLGdCQUFDO0FBQUQsQ0E1R0EsQUE0R0MsQ0E1R3NDLGdCQUFNLEdBNEc1QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi4vU0RLTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzZUFkIGZyb20gXCIuLi9iYXNlL0Jhc2VBZFwiO1xyXG5pbXBvcnQgeyBTREtTdGF0ZSwgUmVzdWx0Q2FsbGJhY2ssIFJlc3VsdFN0YXRlLCBVU0VfU0hBUkUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcbi8qKlxyXG4gKiBodHRwczovL21pY3JvYXBwLmJ5dGVkYW5jZS5jb20vZGV2L2NuL21pbmktZ2FtZS9kZXZlbG9wL29wZW4tY2FwYWNpdHkvYWRzL3R0LmNyZWF0ZXJld2FyZGVkdmlkZW9hZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVFRWaWRlb0FkIGV4dGVuZHMgQmFzZUFkIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5zdGFuY2U6IHR0LlJld2FyZGVkVmlkZW9BZDtcclxuICAgIHByb3RlY3RlZCBjYWxsYmFjazogUmVzdWx0Q2FsbGJhY2s7XHJcbiAgICBwcm90ZWN0ZWQgbG9hZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnV1hWaWRlb0FkIGVycm9yICcsIGVycilcclxuICAgICAgICAvLyBUb2FzdENvbnRyb2xsZXIuaW5zdGFuY2UoKS5zaG93KCfop4bpopHliqDovb3lpLHotKXvvIzml6Dms5XojrflvpflpZblirEnKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZEZhaWwpXHJcbiAgICAgICAgaWYgKFVTRV9TSEFSRSAmJiB0aGlzLmNoYW5uZWwuaGFzU2hhcmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuc2hvd1NoYXJlKDAsIHRoaXMuY2FsbGJhY2spXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9hc3RDb250cm9sbGVyLmluc3RhbmNlKCkuaW50b0xheWVyKCd1aS5ub3RfZmluaXNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHliqDovb3miJDlip8gJywgdGhpcy5sb2FkQ291bnQpXHJcbiAgICAgICAgaWYgKHRoaXMubG9hZENvdW50ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZFN1Y2VzcylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkQ291bnQrKztcclxuICAgICAgICAvLyBzZWxcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKHJlcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUuY2xvc2UpXHJcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR57uT5p2f5YWz6ZetICcpXHJcbiAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5ZRVMpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHkuK3pgJTlhbPpl60gJylcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9hc3RDb250cm9sbGVyLmluc3RhbmNlKCkuaW50b0xheWVyKCd1aS5ub3RfZmluaXNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3JlYXRlKGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkVW5pdElEID0gaWQ7XHJcbiAgICAgICAgdGhpcy5sb2FkQ291bnQgPSAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcg5LiN5pSv5oyB5aSa5L6LJylcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0dC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoeyBhZFVuaXRJZDogaWQgfSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uQ2xvc2UodGhpcy5vbkNsb3NlLmJpbmQodGhpcykpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIG9wZW4oYWRJRDogc3RyaW5nLCBjYWxsYmFjazogUmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIHNob3dSZXdhcmQgYWRJRCAnLCBhZElEKVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNES1N0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkaW5nKVxyXG4gICAgICAgIGlmICh0aGlzLmFkVW5pdElEICE9IGFkSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5hZFVuaXRJRCA9IGFkSURcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUoYWRJRClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3coKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKFJlc3VsdFN0YXRlLk5PKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLm9wZW4pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5r+A5Yqx6KeG6aKR5bGV56S65oiQ5YqfICcpXHJcblxyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgLy8g5aSx6LSl6YeN6K+VXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgc2hvdyAg5r+A5Yqx6KeG6aKRIOaSreaUvuWksei0pemHjeivlScpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLm9wZW4pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5r+A5Yqx6KeG6aKR6YeN6K+V5aSx6LSlIGVyciAnLCBlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayhmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5uZWwuc2hvd1NoYXJlKDAsIHRoaXMuY2FsbGJhY2spXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19