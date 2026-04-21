
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/RewardAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2fce4woZnpI2oe7zPSqFJki', 'RewardAd');
// script/ad/RewardAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardAd = void 0;
var WechatRewardAd_1 = require("./wechat/WechatRewardAd");
var TTRewardAd_1 = require("./bytedance/TTRewardAd");
var AdmobRewardAd_1 = require("./admob/AdmobRewardAd");
var RewardAd = /** @class */ (function () {
    function RewardAd() {
        this._reward = null; //视频广告实例
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (yyp.config.AD.reward['Use'] == 1) {
                var adid = yyp.config.AD.reward['WxAdid'];
                this._reward = new WechatRewardAd_1.WechatRewardAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            if (yyp.config.AD.reward['Use'] == 1) {
                var adid = yyp.config.AD.reward['TTAdid'];
                this._reward = new TTRewardAd_1.TTRewardAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this._reward = new AdmobRewardAd_1.AdmobRewardAd();
        }
    }
    RewardAd.getInstance = function () {
        if (RewardAd._sInstance == null) {
            RewardAd._sInstance = new RewardAd();
        }
        return RewardAd._sInstance;
    };
    /**
     * 广告是否已经加载成功
     */
    RewardAd.prototype.isLoad = function () {
        if (this._reward) {
            return this._reward._isLoad();
        }
        return false;
    };
    /**
     * /展示广告
     * @param callback :广告播放后的状态回调
     */
    RewardAd.prototype.show = function (callback) {
        console.log("AdManager RewardAd show1 ", callback);
        if (this._reward) {
            console.log("AdManager RewardAd show2 ", callback);
            this._reward._show(callback);
        }
    };
    RewardAd._sInstance = null; //静态实例
    return RewardAd;
}());
exports.RewardAd = RewardAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcUmV3YXJkQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQXVEO0FBQ3ZELHFEQUFrRDtBQUNsRCx1REFBb0Q7QUFFcEQ7SUFLSTtRQUZBLFlBQU8sR0FBZSxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBSWhDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUM7WUFDdkMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7YUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDO1lBQy9DLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QztTQUNKO2FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1NBQ3RDO0lBRUwsQ0FBQztJQUVNLG9CQUFXLEdBQWxCO1FBQ0ksSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUM3QixRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7U0FDeEM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUJBQU0sR0FBTjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSCx1QkFBSSxHQUFKLFVBQUssUUFBUTtRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUMvQjtJQUNMLENBQUM7SUFsRE0sbUJBQVUsR0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNO0lBb0R0QyxlQUFDO0NBdERELEFBc0RDLElBQUE7QUF0RFksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1dlY2hhdFJld2FyZEFkfSBmcm9tIFwiLi93ZWNoYXQvV2VjaGF0UmV3YXJkQWRcIjtcclxuaW1wb3J0IHtUVFJld2FyZEFkfSBmcm9tIFwiLi9ieXRlZGFuY2UvVFRSZXdhcmRBZFwiO1xyXG5pbXBvcnQge0FkbW9iUmV3YXJkQWR9IGZyb20gXCIuL2FkbW9iL0FkbW9iUmV3YXJkQWRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXdhcmRBZCAge1xyXG5cclxuICAgIHN0YXRpYyBfc0luc3RhbmNlICAgPSBudWxsOyAvL+mdmeaAgeWunuS+i1xyXG4gICAgX3Jld2FyZCAgICAgICAgICAgICA9IG51bGw7IC8v6KeG6aKR5bm/5ZGK5a6e5L6LXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKXtcclxuICAgICAgICAgICAgaWYgKHl5cC5jb25maWcuQUQucmV3YXJkWydVc2UnXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRpZCA9IHl5cC5jb25maWcuQUQucmV3YXJkWydXeEFkaWQnXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmV3YXJkID0gbmV3IFdlY2hhdFJld2FyZEFkKGFkaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXtcclxuICAgICAgICAgICAgaWYgKHl5cC5jb25maWcuQUQucmV3YXJkWydVc2UnXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRpZCA9IHl5cC5jb25maWcuQUQucmV3YXJkWydUVEFkaWQnXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmV3YXJkID0gbmV3IFRUUmV3YXJkQWQoYWRpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQU5EUk9JRCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jld2FyZCA9IG5ldyBBZG1vYlJld2FyZEFkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpSZXdhcmRBZHtcclxuICAgICAgICBpZiAoUmV3YXJkQWQuX3NJbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFJld2FyZEFkLl9zSW5zdGFuY2UgPSBuZXcgUmV3YXJkQWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJld2FyZEFkLl9zSW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5bm/5ZGK5piv5ZCm5bey57uP5Yqg6L295oiQ5YqfXHJcbiAgICAgKi9cclxuICAgIGlzTG9hZCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV3YXJkLl9pc0xvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIC/lsZXnpLrlub/lkYpcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayA65bm/5ZGK5pKt5pS+5ZCO55qE54q25oCB5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHNob3coY2FsbGJhY2spIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFkTWFuYWdlciBSZXdhcmRBZCBzaG93MSBcIixjYWxsYmFjayk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Jld2FyZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRNYW5hZ2VyIFJld2FyZEFkIHNob3cyIFwiLGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkLl9zaG93KGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19