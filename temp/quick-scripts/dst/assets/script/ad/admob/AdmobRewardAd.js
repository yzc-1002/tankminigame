
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/admob/AdmobRewardAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYWRtb2JcXEFkbW9iUmV3YXJkQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFJSTtRQUhBLFlBQU8sR0FBMkIsS0FBSyxDQUFDO1FBQ3hDLGNBQVMsR0FBeUIsSUFBSSxDQUFDLENBQUssTUFBTTtRQUc5QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxXQUFXLEdBQUc7WUFDZCxNQUFNLEVBQUc7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN4QixDQUFDO1lBQ0QsTUFBTSxFQUFHLFVBQVMsR0FBRztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUN0QjtZQUNMLENBQUM7U0FDSixDQUFBO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFDLFdBQVcsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTTtJQUNOLGdDQUFRLEdBQVI7SUFFQSxDQUFDO0lBR0QsK0JBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLDZCQUFLLEdBQUwsVUFBTSxRQUFRO1FBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxtQ0FBbUMsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQXZDQSxBQXVDQyxJQUFBO0FBdkNZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFkbW9iUmV3YXJkQWQge1xyXG4gICAgX2xvYWRlZDpib29sZWFuICAgICAgICAgICAgICAgICA9IGZhbHNlO1xyXG4gICAgX2NhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7ICAgICAvL+WlluWKseWbnuiwg1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgQWRtb2JSZXdhcmQgPSB7XHJcbiAgICAgICAgICAgIGxvYWRlZCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkTWFuYWdlciBqcyBsb2FkZWRcIik7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXdhcmQgOiBmdW5jdGlvbihyZXQpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZE1hbmFnZXIganMgcmV3YXJkIFwiLHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkTWFuYWdlciBqcyByZXdhcmQgY2FsbGJhY2sgXCIscmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9jYWxsYmFjayhyZXQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93W1wiQWRtb2JSZXdhcmRKc1wiXT1BZG1vYlJld2FyZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeW5v+WRilxyXG4gICAgX2Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9pc0xvYWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S65bm/5ZGKKOWKoOi9veaIkOWKn+WQjuebtOaOpeaYvuekuilcclxuICAgIF9zaG93KGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFja1xyXG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BZE1hbmFnZXJcIiwgXCJSZXdhcmRlZFZpZGVvQWRQbGF5XCIsIFwiKClWXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=