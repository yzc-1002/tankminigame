"use strict";
cc._RF.push(module, '9dc3enmr+lLBKPCv14QkBkW', 'AdmobRewardAd');
// script/ad/admob/AdmobRewardAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmobRewardAd = void 0;
var AdmobRewardAd = /** @class */ (function () {
    function AdmobRewardAd() {
        this._loaded = false;
        this._callback = null; //奖励回调
        var self = this;
        var AdmobReward = {
            loaded: function () {
                console.log("AdManager js loaded");
                self._loaded = true;
            },
            reward: function (ret) {
                console.log("AdManager js reward ", ret);
                if (self._callback) {
                    console.log("AdManager js reward callback ", ret);
                    self._callback(ret);
                }
            }
        };
        window["AdmobRewardJs"] = AdmobReward;
    }
    //销毁广告
    AdmobRewardAd.prototype._destroy = function () {
    };
    AdmobRewardAd.prototype._isLoad = function () {
        return this._loaded;
    };
    //展示广告(加载成功后直接显示)
    AdmobRewardAd.prototype._show = function (callback) {
        this._callback = callback;
        this._loaded = false;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "RewardedVideoAdPlay", "()V");
    };
    return AdmobRewardAd;
}());
exports.AdmobRewardAd = AdmobRewardAd;

cc._RF.pop();