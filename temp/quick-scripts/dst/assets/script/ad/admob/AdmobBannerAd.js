
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/admob/AdmobBannerAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYWRtb2JcXEFkbW9iQmFubmVyQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0dBSUc7OztBQUVIO0lBR0k7SUFDQSxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLDZCQUFLLEdBQUw7UUFDSSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLG1DQUFtQyxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQsVUFBVTtJQUNWLDZCQUFLLEdBQUw7UUFDSSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLG1DQUFtQyxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBO0FBaEJZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL21pbmlnYW1lL2Rldi9hcGkvYWQvd3guY3JlYXRlQmFubmVyQWQuaHRtbFxyXG4gKiDliJvlu7ogYmFubmVyIOW5v+WRiue7hOS7tuOAguivt+mAmui/hyB3eC5nZXRTeXN0ZW1JbmZvU3luYygpIOi/lOWbnuWvueixoeeahCBTREtWZXJzaW9uIFxyXG4gKiDliKTmlq3ln7rnoYDlupPniYjmnKzlj7cgPj0gMi4wLjQg5ZCO5YaN5L2/55So6K+lIEFQSeOAglxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBBZG1vYkJhbm5lckFkIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsZXnpLrlub/lkYoo5Yqg6L295oiQ5Yqf5ZCO55u05o6l5pi+56S6KVxyXG4gICAgX3Nob3coKSB7XHJcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FkTWFuYWdlclwiLCBcInNob3dCYW5uZXJBZFwiLCBcIigpVlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+makOiXjyjnm7TmjqXplIDmr4EpXHJcbiAgICBfaGlkZSgpIHtcclxuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VyXCIsIFwiaGlkZUJhbm5lckFkXCIsIFwiKClWXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=