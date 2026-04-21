
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/qq/QQVideoAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9ca6qSnFZEZpx91B6FlWmB', 'QQVideoAd');
// script/sdk/sdk/qq/QQVideoAd.ts

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
var QQVideoAd = /** @class */ (function (_super) {
    __extends(QQVideoAd, _super);
    function QQVideoAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    QQVideoAd.prototype.onError = function (err) {
        console.log('QQVideoAd error ', err);
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
    QQVideoAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        if (this.loadCount == 0) {
            this.instance.show();
            this.setState(SDKConfig_1.SDKState.loadSucess);
        }
        this.loadCount++;
        // sel
    };
    QQVideoAd.prototype.onClose = function (res) {
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
    QQVideoAd.prototype.create = function (id) {
        this.loadCount = 0;
        this.adUnitID = id;
        console.log(' 不支持多例');
        if (this.instance == null) {
            this.instance = qq.createRewardedVideoAd({ adUnitId: id });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
        }
        else {
            this.instance.load();
        }
    };
    QQVideoAd.prototype.open = function (adID, callback) {
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
            this.show();
        }
    };
    QQVideoAd.prototype.show = function () {
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
    return QQVideoAd;
}(BaseAd_1.default));
exports.default = QQVideoAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xccXFcXFFRVmlkZW9BZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0M7QUFDcEMsMENBQWdGO0FBRWhGO0lBQXVDLDZCQUFNO0lBQTdDO1FBQUEscUVBNEdDO1FBekdhLGVBQVMsR0FBVyxDQUFDLENBQUM7O0lBeUdwQyxDQUFDO0lBdkdHLDJCQUFPLEdBQVAsVUFBUSxHQUFHO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNwQyxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLElBQUkscUJBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDM0M7YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLHlEQUF5RDthQUM1RDtTQUNKO0lBQ0wsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUNyQztRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixNQUFNO0lBQ1YsQ0FBQztJQUVELDJCQUFP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LENBQUMsSUFBSSxFQUFFO2lCQUNmLElBQUksQ0FBQztnQkFDRixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUNwQixLQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNoQyxrQkFBa0I7Z0JBQ2xCLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFFNUMsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHTCxnQkFBQztBQUFELENBNUdBLEFBNEdDLENBNUdzQyxnQkFBTSxHQTRHNUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJhc2VBZCBmcm9tIFwiLi4vYmFzZS9CYXNlQWRcIjtcclxuaW1wb3J0IHsgU0RLU3RhdGUsIFJlc3VsdENhbGxiYWNrLCBSZXN1bHRTdGF0ZSwgVVNFX1NIQVJFIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUVFWaWRlb0FkIGV4dGVuZHMgQmFzZUFkIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5zdGFuY2U6IHFxLlJld2FyZGVkVmlkZW9BZDtcclxuICAgIHByb3RlY3RlZCBsb2FkQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2s6IFJlc3VsdENhbGxiYWNrO1xyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUVFWaWRlb0FkIGVycm9yICcsIGVycilcclxuICAgICAgICAvLyBUb2FzdENvbnRyb2xsZXIuaW5zdGFuY2UoKS5zaG93KCfop4bpopHliqDovb3lpLHotKXvvIzml6Dms5XojrflvpflpZblirEnKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZEZhaWwpXHJcbiAgICAgICAgaWYgKFVTRV9TSEFSRSAmJiB0aGlzLmNoYW5uZWwuaGFzU2hhcmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuc2hvd1NoYXJlKDAsIHRoaXMuY2FsbGJhY2spXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9hc3RDb250cm9sbGVyLmluc3RhbmNlKCkuaW50b0xheWVyKCd1aS5ub3RfZmluaXNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHliqDovb3miJDlip8gJywgdGhpcy5sb2FkQ291bnQpXHJcbiAgICAgICAgaWYgKHRoaXMubG9hZENvdW50ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZFN1Y2VzcylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkQ291bnQrKztcclxuICAgICAgICAvLyBzZWxcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKHJlcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUuY2xvc2UpXHJcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR57uT5p2f5YWz6ZetICcpXHJcbiAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5ZRVMpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHkuK3pgJTlhbPpl60gJylcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9hc3RDb250cm9sbGVyLmluc3RhbmNlKCkuaW50b0xheWVyKCd1aS5ub3RfZmluaXNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3JlYXRlKGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvYWRDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5hZFVuaXRJRCA9IGlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcg5LiN5pSv5oyB5aSa5L6LJylcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBxcS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoeyBhZFVuaXRJZDogaWQgfSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uQ2xvc2UodGhpcy5vbkNsb3NlLmJpbmQodGhpcykpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb3BlbihhZElEOiBzdHJpbmcsIGNhbGxiYWNrOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgc2hvd1Jld2FyZCBhZElEICcsIGFkSUQpXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU0RLU3RhdGUubG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRpbmcpXHJcbiAgICAgICAgaWYgKHRoaXMuYWRVbml0SUQgIT0gYWRJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZShhZElEKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNob3coKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuTk8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUub3BlbilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyDmv4DlirHop4bpopHlsZXnpLrmiJDlip8gJylcclxuXHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyBzaG93ICDmv4DlirHop4bpopEg5pKt5pS+5aSx6LSl6YeN6K+VJylcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5sb2FkKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUub3BlbilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIOa/gOWKseinhumikemHjeivleWksei0pSBlcnIgJywgZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZEZhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGJhY2soZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFubmVsLnNob3dTaGFyZSgwLCB0aGlzLmNhbGxiYWNrKVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==