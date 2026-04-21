"use strict";
cc._RF.push(module, 'ab153+ktDhDRqJZBJwesRvx', 'AdmobInsertAd');
// script/ad/admob/AdmobInsertAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmobInsertAd = void 0;
var AdmobInsertAd = /** @class */ (function () {
    function AdmobInsertAd() {
        this._loaded = false;
        var self = this;
        var AdmobInsert = {
            loaded: function () {
                console.log("AdManager js loaded");
                self._loaded = true;
            }
        };
        window["AdmobInsertJs"] = AdmobInsert;
    }
    //销毁广告
    AdmobInsertAd.prototype._destroy = function () {
    };
    AdmobInsertAd.prototype._isLoad = function () {
        return this._loaded;
    };
    //展示广告(加载成功后直接显示)
    AdmobInsertAd.prototype._show = function () {
        this._loaded = false;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "InterstitialAdPlay", "()V");
    };
    return AdmobInsertAd;
}());
exports.AdmobInsertAd = AdmobInsertAd;

cc._RF.pop();