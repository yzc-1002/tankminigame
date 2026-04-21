"use strict";
cc._RF.push(module, '0e1e1ulXMhKe7eY+D8Y2Y+t', 'AdmobBannerAd');
// script/ad/admob/AdmobBannerAd.ts

"use strict";
/**
 * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createBannerAd.html
 * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion
 * 判断基础库版本号 >= 2.0.4 后再使用该 API。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmobBannerAd = void 0;
var AdmobBannerAd = /** @class */ (function () {
    function AdmobBannerAd() {
    }
    //展示广告(加载成功后直接显示)
    AdmobBannerAd.prototype._show = function () {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "showBannerAd", "()V");
    };
    //隐藏(直接销毁)
    AdmobBannerAd.prototype._hide = function () {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "hideBannerAd", "()V");
    };
    return AdmobBannerAd;
}());
exports.AdmobBannerAd = AdmobBannerAd;

cc._RF.pop();