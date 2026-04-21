
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/vivo/VivoRewardAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c340935TdpCLZNAXdb8LwJ7', 'VivoRewardAd');
// script/sdk/sdk/vivo/VivoRewardAd.ts

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
/**
 * https://minigame.vivo.com.cn/documents/#/api/da/incentive-video-da
 *  第一次创建视频广告对象时，已自动加载一次广告，请勿重新加载
 */
var VivoRewardAd = /** @class */ (function (_super) {
    __extends(VivoRewardAd, _super);
    function VivoRewardAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadCount = 0;
        return _this;
    }
    VivoRewardAd.prototype.open = function (adID, callback) {
        console.log(' showReward adID ', adID);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.callback = callback;
        this.setState(SDKConfig_1.SDKState.loading);
        if (this.adUnitID != adID) {
            this.adUnitID = adID;
            this.createVideoAd(adID);
        }
        else {
            this.show();
        }
    };
    VivoRewardAd.prototype.createVideoAd = function (id) {
        this.loadCount = 0;
        console.log(' 不支持多例');
        if (this.instance == null) {
            this.instance = qg.createRewardedVideoAd({ posId: id });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instance.onClose(this.onClose.bind(this));
            console.log(' 创建成功');
        }
        else {
            console.log(' 主动加载');
            this.instance.load();
        }
    };
    VivoRewardAd.prototype.onError = function (err) {
        console.log('QQVideoAd error ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        if (this.callback) {
            // SDKManager.getChannel().showShare(this.rewardCallback)
            this.callback(SDKConfig_1.ResultState.NO);
        }
    };
    //oppo渠道需要自己主动加载视频
    VivoRewardAd.prototype.onLoad = function () {
        console.log('视频加载成功 ', this.loadCount);
        // if (this.loadCount == 0) {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
        // }
        this.loadCount++;
        // sel
    };
    VivoRewardAd.prototype.onClose = function (res) {
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
    VivoRewardAd.prototype.show = function () {
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
                // GlobalEvent.instance().publish(ADEventName.CHANGE_REWARD_AD_STATE, this.state)
            })
                .catch(function (err) {
                console.log(' 激励视频重试失败 err ', err);
                _this.setState(SDKConfig_1.SDKState.loadFail);
                // callback(false)
                // SDKManager.getChannel().showShare(this.rewardCallback)
            });
        });
    };
    return VivoRewardAd;
}(BaseAd_1.default));
exports.default = VivoRewardAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdml2b1xcVml2b1Jld2FyZEFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFxRTtBQUNyRSx5Q0FBb0M7QUFFcEM7OztHQUdHO0FBQ0g7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUEwR0M7UUF2R1csZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUF1R2xDLENBQUM7SUF0R0csMkJBQUksR0FBSixVQUFLLElBQVksRUFBRSxRQUF3QjtRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3RDLHVDQUF1QztRQUN2QyxjQUFjO1FBQ2QsSUFBSTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1lBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDM0I7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUNkO0lBR0wsQ0FBQztJQUNELG9DQUFhLEdBQWIsVUFBYyxFQUFVO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDdkI7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUV4QjtJQUlMLENBQUM7SUFDRCw4QkFBTyxHQUFQLFVBQVEsR0FBRztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDaEM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ2xCLDZCQUFNLEdBQU47UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEMsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDWCxJQUFJO1FBQ0osSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE1BQU07SUFDVixDQUFDO0lBRUQsOEJBQU8sR0FBUCxVQUFRLEdBQUc7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDN0IsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdEIsa0JBQWtCO1lBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDakM7U0FFSjthQUFNO1lBQ0gsaUJBQWlCO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIseURBQXlEO2FBQzVEO1NBRUo7SUFDTCxDQUFDO0lBRVMsMkJBQUksR0FBZDtRQUFBLGlCQTBCQztRQXpCRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDN0IsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ0wsT0FBTztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtZQUNqQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtpQkFDZixJQUFJLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDcEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM1QixpRkFBaUY7WUFDckYsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNoQyxrQkFBa0I7Z0JBQ2xCLHlEQUF5RDtZQUU3RCxDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0ExR0EsQUEwR0MsQ0ExR3lDLGdCQUFNLEdBMEcvQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBSZXN1bHRDYWxsYmFjaywgU0RLU3RhdGUsIFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5pbXBvcnQgQmFzZUFkIGZyb20gXCIuLi9iYXNlL0Jhc2VBZFwiO1xyXG5cclxuLyoqXHJcbiAqIGh0dHBzOi8vbWluaWdhbWUudml2by5jb20uY24vZG9jdW1lbnRzLyMvYXBpL2RhL2luY2VudGl2ZS12aWRlby1kYVxyXG4gKiAg56ys5LiA5qyh5Yib5bu66KeG6aKR5bm/5ZGK5a+56LGh5pe277yM5bey6Ieq5Yqo5Yqg6L295LiA5qyh5bm/5ZGK77yM6K+35Yu/6YeN5paw5Yqg6L29XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXZvUmV3YXJkQWQgZXh0ZW5kcyBCYXNlQWQge1xyXG5cclxuICAgIHByb3RlY3RlZCBjYWxsYmFjazogUmVzdWx0Q2FsbGJhY2s7XHJcbiAgICBwcml2YXRlIGxvYWRDb3VudDogbnVtYmVyID0gMDtcclxuICAgIG9wZW4oYWRJRDogc3RyaW5nLCBjYWxsYmFjazogUmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIHNob3dSZXdhcmQgYWRJRCAnLCBhZElEKVxyXG4gICAgICAgIC8vIGlmICh0aGlzLnN0YXRlID09IEFkU3RhdGUubG9hZGluZykge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRpbmcpXHJcbiAgICAgICAgaWYgKHRoaXMuYWRVbml0SUQgIT0gYWRJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkVW5pdElEID0gYWRJRFxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZGVvQWQoYWRJRClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3coKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgY3JlYXRlVmlkZW9BZChpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ291bnQgPSAwO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnIOS4jeaUr+aMgeWkmuS+iycpXHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gcWcuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHsgcG9zSWQ6IGlkIH0pXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25Mb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub25FcnJvcih0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkNsb3NlKHRoaXMub25DbG9zZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIOWIm+W7uuaIkOWKnycpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyDkuLvliqjliqDovb0nKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmxvYWQoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUVFWaWRlb0FkIGVycm9yICcsIGVycilcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLyBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5zaG93U2hhcmUodGhpcy5yZXdhcmRDYWxsYmFjaylcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5OTylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL29wcG/muKDpgZPpnIDopoHoh6rlt7HkuLvliqjliqDovb3op4bpopFcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR5Yqg6L295oiQ5YqfICcsIHRoaXMubG9hZENvdW50KVxyXG4gICAgICAgIC8vIGlmICh0aGlzLmxvYWRDb3VudCA9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkU3VjZXNzKVxyXG4gICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMubG9hZENvdW50Kys7XHJcbiAgICAgICAgLy8gc2VsXHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZShyZXMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmNsb3NlKVxyXG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+inhumikee7k+adn+WFs+mXrSAnKVxyXG4gICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soUmVzdWx0U3RhdGUuWUVTKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR5Lit6YCU5YWz6ZetICcpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKFJlc3VsdFN0YXRlLk5PKTtcclxuICAgICAgICAgICAgICAgIC8vIFRvYXN0Q29udHJvbGxlci5pbnN0YW5jZSgpLmludG9MYXllcigndWkubm90X2ZpbmlzaCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhSZXN1bHRTdGF0ZS5OTylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluc3RhbmNlLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5vcGVuKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIOa/gOWKseinhumikeWxleekuuaIkOWKnyAnKVxyXG5cclxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOWksei0pemHjeivlVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIHNob3cgIOa/gOWKseinhumikSDmkq3mlL7lpLHotKXph43or5UnKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmxvYWQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5vcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdsb2JhbEV2ZW50Lmluc3RhbmNlKCkucHVibGlzaChBREV2ZW50TmFtZS5DSEFOR0VfUkVXQVJEX0FEX1NUQVRFLCB0aGlzLnN0YXRlKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcg5r+A5Yqx6KeG6aKR6YeN6K+V5aSx6LSlIGVyciAnLCBlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayhmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5zaG93U2hhcmUodGhpcy5yZXdhcmRDYWxsYmFjaylcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=