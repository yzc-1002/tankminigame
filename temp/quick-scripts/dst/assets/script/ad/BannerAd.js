
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/BannerAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '95cb7n9JthOQ48dkDAi+AWv', 'BannerAd');
// script/ad/BannerAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerAd = void 0;
var WechatBannerAd_1 = require("./wechat/WechatBannerAd");
var TTBannerAd_1 = require("./bytedance/TTBannerAd");
var AdmobBannerAd_1 = require("./admob/AdmobBannerAd");
// @ccclass
var BannerAd = /** @class */ (function () {
    function BannerAd() {
        this._banner = null; //横幅广告实例
        this._useBanner = true; //banner是否开启,未开启的不会显示广告(由配置表配置)
        this._useBanner = yyp.config.AD.banner['Use'] == 1;
        if (this._useBanner) {
            var height = yyp.config.AD.banner['Height'];
            var bannerHeight = height + (yyp.gameFrameSize.height - 1136) / 2;
            cc.log('BannerAd ', height, bannerHeight);
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                var adid = yyp.config.AD.banner['WxAdid'];
                this._banner = new WechatBannerAd_1.WechatBannerAd(adid, bannerHeight);
            }
            else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                var adid = yyp.config.AD.banner['TTAdid'];
                this._banner = new TTBannerAd_1.TTBannerAd(adid, bannerHeight);
            }
            else if (cc.sys.platform === cc.sys.ANDROID) {
                this._banner = new AdmobBannerAd_1.AdmobBannerAd();
            }
        }
        this.show();
    }
    BannerAd.getInstance = function () {
        if (BannerAd._sInstance == null) {
            BannerAd._sInstance = new BannerAd();
        }
        return BannerAd._sInstance;
    };
    /**
     * 展示广告
     */
    BannerAd.prototype.show = function () {
        if (this._useBanner) {
            if (this._banner) {
                this._banner._show();
            }
        }
    };
    /**
     * 隐藏广告
     */
    BannerAd.prototype.hide = function () {
        if (this._banner) {
            this._banner._hide();
        }
    };
    BannerAd.prototype.onDestroy = function () {
        if (this._banner) {
            this._banner._destroy();
        }
    };
    BannerAd._sInstance = null; //静态实例
    return BannerAd;
}());
exports.BannerAd = BannerAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcQmFubmVyQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQXVEO0FBQ3ZELHFEQUFrRDtBQUNsRCx1REFBb0Q7QUFFcEQsV0FBVztBQUNYO0lBTUk7UUFIQSxZQUFPLEdBQWUsSUFBSSxDQUFDLENBQUMsUUFBUTtRQUNwQyxlQUFVLEdBQVksSUFBSSxDQUFDLENBQUMsK0JBQStCO1FBSXZELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksWUFBWSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztZQUNoRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsWUFBWSxDQUFDLENBQUM7WUFFeEMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQztnQkFDdkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksK0JBQWMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxDQUFDLENBQUM7YUFDeEQ7aUJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQztnQkFDL0MsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEQ7aUJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQztnQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQzthQUN0QztTQUVKO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLG9CQUFXLEdBQWxCO1FBQ0ksSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUM3QixRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7U0FDeEM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUJBQUksR0FBSjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUM7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUN2QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUJBQUksR0FBSjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7U0FDdkI7SUFDTCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDMUI7SUFDTCxDQUFDO0lBNURNLG1CQUFVLEdBQUssSUFBSSxDQUFDLENBQUMsTUFBTTtJQThEdEMsZUFBQztDQWhFRCxBQWdFQyxJQUFBO0FBaEVZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7V2VjaGF0QmFubmVyQWR9IGZyb20gXCIuL3dlY2hhdC9XZWNoYXRCYW5uZXJBZFwiO1xyXG5pbXBvcnQge1RUQmFubmVyQWR9IGZyb20gXCIuL2J5dGVkYW5jZS9UVEJhbm5lckFkXCI7XHJcbmltcG9ydCB7QWRtb2JCYW5uZXJBZH0gZnJvbSBcIi4vYWRtb2IvQWRtb2JCYW5uZXJBZFwiO1xyXG5cclxuLy8gQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEJhbm5lckFke1xyXG5cclxuICAgIHN0YXRpYyBfc0luc3RhbmNlICAgPSBudWxsOyAvL+mdmeaAgeWunuS+i1xyXG4gICAgX2Jhbm5lciAgICAgICAgICAgICA9IG51bGw7IC8v5qiq5bmF5bm/5ZGK5a6e5L6LXHJcbiAgICBfdXNlQmFubmVyICAgICAgICAgID0gdHJ1ZTsgLy9iYW5uZXLmmK/lkKblvIDlkK8s5pyq5byA5ZCv55qE5LiN5Lya5pi+56S65bm/5ZGKKOeUsemFjee9ruihqOmFjee9rilcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdXNlQmFubmVyID0geXlwLmNvbmZpZy5BRC5iYW5uZXJbJ1VzZSddID09IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZUJhbm5lcikge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0geXlwLmNvbmZpZy5BRC5iYW5uZXJbJ0hlaWdodCddO1xyXG4gICAgICAgICAgICBsZXQgYmFubmVySGVpZ2h0ID0gaGVpZ2h0ICsgKHl5cC5nYW1lRnJhbWVTaXplLmhlaWdodCAtIDExMzYpLzI7XHJcbiAgICAgICAgICAgIGNjLmxvZygnQmFubmVyQWQgJyxoZWlnaHQsYmFubmVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRpZCA9IHl5cC5jb25maWcuQUQuYmFubmVyWydXeEFkaWQnXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyID0gbmV3IFdlY2hhdEJhbm5lckFkKGFkaWQsYmFubmVySGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRpZCA9IHl5cC5jb25maWcuQUQuYmFubmVyWydUVEFkaWQnXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyID0gbmV3IFRUQmFubmVyQWQoYWRpZCxiYW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkFORFJPSUQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyID0gbmV3IEFkbW9iQmFubmVyQWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6QmFubmVyQWR7XHJcbiAgICAgICAgaWYgKEJhbm5lckFkLl9zSW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBCYW5uZXJBZC5fc0luc3RhbmNlID0gbmV3IEJhbm5lckFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBCYW5uZXJBZC5fc0luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bGV56S65bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZUJhbm5lcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lci5fc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/lub/lkYpcclxuICAgICAqL1xyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYmFubmVyKXtcclxuICAgICAgICAgICAgdGhpcy5fYmFubmVyLl9oaWRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Jhbm5lcil7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lci5fZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=