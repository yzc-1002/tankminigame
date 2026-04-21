
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseChannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '36132I/b2FI2YNTWY0/RoWQ', 'BaseChannel');
// script/sdk/sdk/base/BaseChannel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDKConfig_1 = require("../SDKConfig");
var BaseChannel = /** @class */ (function () {
    function BaseChannel(cID) {
        //渠道号
        this.channelID = 0;
        //激励视频
        this.rewardAd = null;
        //banner广告实例
        this.bannerAd = null;
        //插屏广告
        this.insertAd = null;
        //分享实例
        this.share = null;
        //小游戏分包
        this.subPackage = null;
        //原生广告
        this.nativeAd = null;
        //盒子广告
        this.appBoxAd = null;
        //登陆
        this.loginMgr = null;
        //录屏功能
        this.recorder = null;
        //截屏功能
        this.screenshot = null;
        this.channelID = cID;
        this.configData = SDKConfig_1.SDKConfig[this.channelID];
    }
    BaseChannel.prototype.hasParam = function (name) {
        var param = this.configData[name];
        if (param == undefined || param == null) {
            return false;
        }
        if (Array.isArray(param)) {
            return param.length > 0;
        }
        return true;
    };
    BaseChannel.prototype.getParam = function (site, adName) {
        var list = this.configData[adName];
        if (list.length > 0) {
            if (list.length > site) {
                return list[site];
            }
            else {
                return list[0];
            }
        }
        else {
            return null;
        }
    };
    /**
     * 是否有banner广告
     */
    BaseChannel.prototype.hasBanner = function () {
        return this.hasParam(SDKConfig_1.ADName.banner) && this.bannerAd != null;
    };
    /**
     * 显示banner广告
     * @param site 广告位索引
     */
    BaseChannel.prototype.showBanner = function (site) {
        if (this.hasBanner()) {
            var ad = this.getParam(site, SDKConfig_1.ADName.banner);
            if (ad) {
                this.bannerAd.open(ad);
            }
        }
    };
    //隐藏banner广告
    BaseChannel.prototype.hideBanner = function () {
        if (this.hasBanner()) {
            this.bannerAd.close();
        }
    };
    /**
     * 是否有插屏广告
     */
    BaseChannel.prototype.hasInsertAd = function () {
        return this.hasParam(SDKConfig_1.ADName.insert) && this.insertAd != null;
    };
    /**
     * 展示插屏广告
     */
    BaseChannel.prototype.showInsertAd = function (site) {
        if (this.hasInsertAd()) {
            var adId = this.getParam(site, SDKConfig_1.ADName.insert);
            if (adId) {
                this.insertAd.open(adId);
            }
        }
    };
    //是否有激励视频广告
    BaseChannel.prototype.hasRewardAd = function () {
        return this.hasParam(SDKConfig_1.ADName.reward) && this.rewardAd != null;
    };
    //展示激励视频广告
    BaseChannel.prototype.showRewardAd = function (site, callback) {
        if (this.hasRewardAd()) {
            var adID = this.getParam(site, SDKConfig_1.ADName.reward);
            if (adID) {
                this.rewardAd.open(adID, callback);
            }
        }
    };
    //是否有分享能力
    BaseChannel.prototype.hasShare = function () {
        return this.share != null;
    };
    /**
     * 分享
     * @param site
     * @param callback
     */
    BaseChannel.prototype.showShare = function (site, callback, isShowRecorder) {
        if (this.hasShare()) {
            site = Math.floor(Math.random() * 2); //0,1
            // cc.log('showshare ',site)
            this.share.share(site, callback, isShowRecorder);
        }
    };
    //短震动
    BaseChannel.prototype.vibrateShort = function () {
    };
    //展示网络图片
    BaseChannel.prototype.previewImage = function (imgUrl) {
    };
    //跳转能力
    BaseChannel.prototype.navigateToMiniProgram = function (appID) {
    };
    BaseChannel.prototype.hasLogin = function () {
        return !SDKConfig_1.isNull(this.loginMgr);
    };
    /**
     * 登陆游戏
     * @param account
     * @param func
     */
    BaseChannel.prototype.login = function (account, func) {
        if (this.hasLogin()) {
            this.loginMgr.login(account, func);
        }
        else {
            func(SDKConfig_1.ResultState.YES);
        }
    };
    /**
     * 获取用户信息
     * @param withCredentials
     * @param lang
     * @param func
     */
    BaseChannel.prototype.getUserInfo = function (withCredentials, lang, func) {
        if (this.hasLogin()) {
            this.loginMgr.getUserInfo(withCredentials, lang, func);
        }
    };
    /**
     * 检查登陆状态
     * @param callback
     */
    BaseChannel.prototype.checkSession = function (callback) {
        if (this.hasLogin()) {
            this.loginMgr.checkSession(callback);
        }
        else {
            callback(SDKConfig_1.ResultState.YES);
        }
    };
    BaseChannel.prototype.postMessage = function (msg) {
    };
    BaseChannel.prototype.hasSubPackage = function () {
        return this.subPackage != null;
    };
    BaseChannel.prototype.loadSubPackage = function (subNames, callback) {
        if (this.hasSubPackage()) {
            this.subPackage.loadList(subNames, callback);
        }
        else {
            callback(SDKConfig_1.ResultState.YES, null);
        }
    };
    BaseChannel.prototype.hasScreenshot = function () {
        return this.screenshot != null;
    };
    BaseChannel.prototype.showScreenshot = function () {
        if (this.hasScreenshot()) {
            this.screenshot.capture();
        }
    };
    BaseChannel.prototype.hasNativeAd = function () {
        return this.hasParam(SDKConfig_1.ADName.native) && this.nativeAd != null;
    };
    BaseChannel.prototype.showNativeAd = function (index, callback) {
        if (this.hasNativeAd()) {
            var ad = this.getParam(index, SDKConfig_1.ADName.native);
            if (ad) {
                this.nativeAd.open(ad, callback);
            }
        }
    };
    BaseChannel.prototype.hideNativeAd = function () {
        if (this.hasNativeAd()) {
            this.nativeAd.close();
        }
    };
    BaseChannel.prototype.reportAdClick = function (adId) {
        if (this.hasNativeAd()) {
            this.nativeAd.reportAdClick(adId);
        }
    };
    BaseChannel.prototype.reportAdShow = function (adId) {
        if (this.hasNativeAd()) {
            this.nativeAd.reportAdShow(adId);
        }
    };
    BaseChannel.prototype.hasRecorder = function () {
        return this.recorder != null;
    };
    BaseChannel.prototype.recorderStart = function (obj) {
        if (this.hasRecorder()) {
            this.recorder.start(obj);
        }
    };
    BaseChannel.prototype.getRecorder = function () {
        return this.recorder;
    };
    BaseChannel.prototype.recorderStop = function (isSave) {
        if (isSave === void 0) { isSave = true; }
        if (this.hasRecorder()) {
            this.recorder.stop(isSave);
        }
    };
    BaseChannel.prototype.hasAppBox = function () {
        return this.hasParam(SDKConfig_1.ADName.appbox) && this.appBoxAd != null;
    };
    BaseChannel.prototype.showAppBoxAd = function (index) {
        if (this.hasAppBox()) {
            var ad = this.getParam(index, SDKConfig_1.ADName.appbox);
            if (ad) {
                this.appBoxAd.open(ad);
            }
        }
    };
    BaseChannel.prototype.showToast = function (title) {
    };
    BaseChannel.prototype.canInstallShortcut = function (func) {
        func(SDKConfig_1.ResultState.NO);
    };
    /**
     * 安装图标到桌面
     * @param result
     */
    BaseChannel.prototype.installShortcut = function (result) {
        result(SDKConfig_1.ResultState.NO);
    };
    return BaseChannel;
}());
exports.default = BaseChannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZUNoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBc0g7QUFPdEg7SUE0QkkscUJBQVksR0FBVztRQTFCdkIsS0FBSztRQUNLLGNBQVMsR0FBVyxDQUFDLENBQUE7UUFDL0IsTUFBTTtRQUNJLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDbEMsWUFBWTtRQUNGLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDbEMsTUFBTTtRQUNJLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDbEMsTUFBTTtRQUNJLFVBQUssR0FBYyxJQUFJLENBQUM7UUFDbEMsT0FBTztRQUNHLGVBQVUsR0FBbUIsSUFBSSxDQUFDO1FBQzVDLE1BQU07UUFDSSxhQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ2xDLE1BQU07UUFDSSxhQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ2xDLElBQUk7UUFDTSxhQUFRLEdBQWMsSUFBSSxDQUFDO1FBQ3JDLE1BQU07UUFDSSxhQUFRLEdBQWlCLElBQUksQ0FBQztRQUN4QyxNQUFNO1FBQ0ksZUFBVSxHQUFtQixJQUFJLENBQUM7UUFNeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVk7UUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxD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a0NBQVksR0FBWixVQUFhLEtBQWE7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsa0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxJQUFJLEVBQUUsRUFBRTtnQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUN6QjtTQUVKO0lBQ0wsQ0FBQztJQUdELCtCQUFTLEdBQVQsVUFBVSxLQUFhO0lBRXZCLENBQUM7SUFDRCx3Q0FBa0IsR0FBbEIsVUFBbUIsSUFBb0I7UUFDbkMsSUFBSSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFDQUFlLEdBQWYsVUFBZ0IsTUFBc0I7UUFDbEMsTUFBTSxDQUFDLHVCQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FoVEEsQUFnVEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQWQgZnJvbSBcIi4vQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES0NvbmZpZywgQUROYW1lLCBSZXN1bHRDYWxsYmFjaywgUmVzdWx0U3RhdGUsIE5hdGl2ZUFkQ2FsbGJhY2ssIGlzTnVsbCwgRGF0YUNhbGxiYWNrIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBCYXNlU2hhcmUgfSBmcm9tIFwiLi9CYXNlU2hhcmVcIjtcclxuaW1wb3J0IEJhc2VMb2dpbiBmcm9tIFwiLi9CYXNlTG9naW5cIjtcclxuaW1wb3J0IEJhc2VTdWJQYWNrYWdlIGZyb20gXCIuL0Jhc2VTdWJQYWNrYWdlXCI7XHJcbmltcG9ydCBCYXNlU2NyZW5uc2hvdCBmcm9tIFwiLi9CYXNlU2NyZWVuc2hvdFwiO1xyXG5pbXBvcnQgQmFzZVJlY29yZGVyIGZyb20gXCIuL0Jhc2VSZWNvcmRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUNoYW5uZWwge1xyXG5cclxuICAgIC8v5rig6YGT5Y+3XHJcbiAgICBwcm90ZWN0ZWQgY2hhbm5lbElEOiBudW1iZXIgPSAwXHJcbiAgICAvL+a/gOWKseinhumikVxyXG4gICAgcHJvdGVjdGVkIHJld2FyZEFkOiBCYXNlQWQgPSBudWxsO1xyXG4gICAgLy9iYW5uZXLlub/lkYrlrp7kvotcclxuICAgIHByb3RlY3RlZCBiYW5uZXJBZDogQmFzZUFkID0gbnVsbDtcclxuICAgIC8v5o+S5bGP5bm/5ZGKXHJcbiAgICBwcm90ZWN0ZWQgaW5zZXJ0QWQ6IEJhc2VBZCA9IG51bGw7XHJcbiAgICAvL+WIhuS6q+WunuS+i1xyXG4gICAgcHJvdGVjdGVkIHNoYXJlOiBCYXNlU2hhcmUgPSBudWxsO1xyXG4gICAgLy/lsI/muLjmiI/liIbljIVcclxuICAgIHByb3RlY3RlZCBzdWJQYWNrYWdlOiBCYXNlU3ViUGFja2FnZSA9IG51bGw7XHJcbiAgICAvL+WOn+eUn+W5v+WRilxyXG4gICAgcHJvdGVjdGVkIG5hdGl2ZUFkOiBCYXNlQWQgPSBudWxsO1xyXG4gICAgLy/nm5LlrZDlub/lkYpcclxuICAgIHByb3RlY3RlZCBhcHBCb3hBZDogQmFzZUFkID0gbnVsbDtcclxuICAgIC8v55m76ZmGXHJcbiAgICBwcm90ZWN0ZWQgbG9naW5NZ3I6IEJhc2VMb2dpbiA9IG51bGw7XHJcbiAgICAvL+W9leWxj+WKn+iDvVxyXG4gICAgcHJvdGVjdGVkIHJlY29yZGVyOiBCYXNlUmVjb3JkZXIgPSBudWxsO1xyXG4gICAgLy/miKrlsY/lip/og71cclxuICAgIHByb3RlY3RlZCBzY3JlZW5zaG90OiBCYXNlU2NyZW5uc2hvdCA9IG51bGw7XHJcblxyXG4gICAgLy/muKDpgZPphY3nva7mlbDmja5cclxuICAgIHByb3RlY3RlZCBjb25maWdEYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY0lEOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNoYW5uZWxJRCA9IGNJRDtcclxuICAgICAgICB0aGlzLmNvbmZpZ0RhdGEgPSBTREtDb25maWdbdGhpcy5jaGFubmVsSURdXHJcbiAgICB9XHJcblxyXG4gICAgaGFzUGFyYW0obmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0gdGhpcy5jb25maWdEYXRhW25hbWVdXHJcbiAgICAgICAgaWYgKHBhcmFtID09IHVuZGVmaW5lZCB8fCBwYXJhbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbS5sZW5ndGggPiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRQYXJhbShzaXRlOiBudW1iZXIsIGFkTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IHN0cmluZ1tdID0gdGhpcy5jb25maWdEYXRhW2FkTmFtZV1cclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IHNpdGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0W3NpdGVdXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdFswXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuaciWJhbm5lcuW5v+WRilxyXG4gICAgICovXHJcbiAgICBoYXNCYW5uZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzUGFyYW0oQUROYW1lLmJhbm5lcikgJiYgdGhpcy5iYW5uZXJBZCAhPSBudWxsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLpiYW5uZXLlub/lkYpcclxuICAgICAqIEBwYXJhbSBzaXRlIOW5v+WRiuS9jee0ouW8lVxyXG4gICAgICovXHJcbiAgICBzaG93QmFubmVyKHNpdGU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0Jhbm5lcigpKSB7XHJcbiAgICAgICAgICAgIGxldCBhZCA9IHRoaXMuZ2V0UGFyYW0oc2l0ZSwgQUROYW1lLmJhbm5lcilcclxuICAgICAgICAgICAgaWYgKGFkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9wZW4oYWQpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/pmpDol49iYW5uZXLlub/lkYpcclxuICAgIGhpZGVCYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQmFubmVyKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5jbG9zZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pyJ5o+S5bGP5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIGhhc0luc2VydEFkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhc1BhcmFtKEFETmFtZS5pbnNlcnQpICYmIHRoaXMuaW5zZXJ0QWQgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWxleekuuaPkuWxj+W5v+WRilxyXG4gICAgICovXHJcbiAgICBzaG93SW5zZXJ0QWQoc2l0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzSW5zZXJ0QWQoKSkge1xyXG4gICAgICAgICAgICBsZXQgYWRJZCA9IHRoaXMuZ2V0UGFyYW0oc2l0ZSwgQUROYW1lLmluc2VydClcclxuICAgICAgICAgICAgaWYgKGFkSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QWQub3BlbihhZElkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuaciea/gOWKseinhumikeW5v+WRilxyXG4gICAgaGFzUmV3YXJkQWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzUGFyYW0oQUROYW1lLnJld2FyZCkgJiYgdGhpcy5yZXdhcmRBZCAhPSBudWxsO1xyXG4gICAgfVxyXG4gICAgLy/lsZXnpLrmv4DlirHop4bpopHlub/lkYpcclxuICAgIHNob3dSZXdhcmRBZChzaXRlOiBudW1iZXIsIGNhbGxiYWNrOiBSZXN1bHRDYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1Jld2FyZEFkKCkpIHtcclxuICAgICAgICAgICAgbGV0IGFkSUQgPSB0aGlzLmdldFBhcmFtKHNpdGUsIEFETmFtZS5yZXdhcmQpXHJcbiAgICAgICAgICAgIGlmIChhZElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZEFkLm9wZW4oYWRJRCwgY2FsbGJhY2spXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5piv5ZCm5pyJ5YiG5Lqr6IO95YqbXHJcbiAgICBoYXNTaGFyZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5LqrXHJcbiAgICAgKiBAcGFyYW0gc2l0ZSBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgc2hvd1NoYXJlKHNpdGU6IG51bWJlciwgY2FsbGJhY2s6IFJlc3VsdENhbGxiYWNrLCBpc1Nob3dSZWNvcmRlcj86IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNTaGFyZSgpKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzaXRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjIpOy8vMCwxXHJcbiAgICAgICAgICAgIC8vIGNjLmxvZygnc2hvd3NoYXJlICcsc2l0ZSlcclxuICAgICAgICAgICAgdGhpcy5zaGFyZS5zaGFyZShzaXRlLCBjYWxsYmFjaywgaXNTaG93UmVjb3JkZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/nn63pnIfliqhcclxuICAgIHZpYnJhdGVTaG9ydCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICAvL+Wxleekuue9kee7nOWbvueJh1xyXG4gICAgcHJldmlld0ltYWdlKGltZ1VybDogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG4gICAgLy/ot7Povazog73liptcclxuICAgIG5hdmlnYXRlVG9NaW5pUHJvZ3JhbShhcHBJRDogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhhc0xvZ2luKCkge1xyXG4gICAgICAgIHJldHVybiAhaXNOdWxsKHRoaXMubG9naW5NZ3IpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnmbvpmYbmuLjmiI9cclxuICAgICAqIEBwYXJhbSBhY2NvdW50IFxyXG4gICAgICogQHBhcmFtIGZ1bmMgXHJcbiAgICAgKi9cclxuICAgIGxvZ2luKGFjY291bnQ6IHN0cmluZywgZnVuYzogUmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNMb2dpbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW5NZ3IubG9naW4oYWNjb3VudCwgZnVuYylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmdW5jKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAqIEBwYXJhbSB3aXRoQ3JlZGVudGlhbHMgXHJcbiAgICAgKiBAcGFyYW0gbGFuZyBcclxuICAgICAqIEBwYXJhbSBmdW5jIFxyXG4gICAgICovXHJcbiAgICBnZXRVc2VySW5mbyh3aXRoQ3JlZGVudGlhbHM6IHN0cmluZywgbGFuZzogc3RyaW5nLCBmdW5jOiBEYXRhQ2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNMb2dpbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW5NZ3IuZ2V0VXNlckluZm8od2l0aENyZWRlbnRpYWxzLCBsYW5nLCBmdW5jKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qOA5p+l55m76ZmG54q25oCBXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIGNoZWNrU2Vzc2lvbihjYWxsYmFjazogUmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNMb2dpbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW5NZ3IuY2hlY2tTZXNzaW9uKGNhbGxiYWNrKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdE1lc3NhZ2UobXNnOiBhbnkpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaGFzU3ViUGFja2FnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJQYWNrYWdlICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFN1YlBhY2thZ2Uoc3ViTmFtZXM6IHN0cmluZ1tdLCBjYWxsYmFjazogRGF0YUNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzU3ViUGFja2FnZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViUGFja2FnZS5sb2FkTGlzdChzdWJOYW1lcywgY2FsbGJhY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdFN0YXRlLllFUywgbnVsbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2NyZWVuc2hvdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5zaG90ICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NjcmVlbnNob3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzU2NyZWVuc2hvdCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NyZWVuc2hvdC5jYXB0dXJlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGhhc05hdGl2ZUFkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhc1BhcmFtKEFETmFtZS5uYXRpdmUpICYmIHRoaXMubmF0aXZlQWQgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TmF0aXZlQWQoaW5kZXg6IG51bWJlciwgY2FsbGJhY2s6IE5hdGl2ZUFkQ2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNOYXRpdmVBZCgpKSB7XHJcbiAgICAgICAgICAgIGxldCBhZCA9IHRoaXMuZ2V0UGFyYW0oaW5kZXgsIEFETmFtZS5uYXRpdmUpXHJcbiAgICAgICAgICAgIGlmIChhZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVBZC5vcGVuKGFkLCBjYWxsYmFjaylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZU5hdGl2ZUFkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc05hdGl2ZUFkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVBZC5jbG9zZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVwb3J0QWRDbGljayhhZElkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzTmF0aXZlQWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soYWRJZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVwb3J0QWRTaG93KGFkSWQpIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNOYXRpdmVBZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQucmVwb3J0QWRTaG93KGFkSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhc1JlY29yZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY29yZGVyICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVjb3JkZXJTdGFydChvYmo/KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzUmVjb3JkZXIoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLnN0YXJ0KG9iailcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjb3JkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjb3JkZXI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlY29yZGVyU3RvcChpc1NhdmU6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzUmVjb3JkZXIoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLnN0b3AoaXNTYXZlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaGFzQXBwQm94KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhc1BhcmFtKEFETmFtZS5hcHBib3gpICYmIHRoaXMuYXBwQm94QWQgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QXBwQm94QWQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0FwcEJveCgpKSB7XHJcbiAgICAgICAgICAgIGxldCBhZCA9IHRoaXMuZ2V0UGFyYW0oaW5kZXgsIEFETmFtZS5hcHBib3gpO1xyXG4gICAgICAgICAgICBpZiAoYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwQm94QWQub3BlbihhZClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dUb2FzdCh0aXRsZTogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG4gICAgY2FuSW5zdGFsbFNob3J0Y3V0KGZ1bmM6IFJlc3VsdENhbGxiYWNrKSB7XHJcbiAgICAgICAgZnVuYyhSZXN1bHRTdGF0ZS5OTylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWuieijheWbvuagh+WIsOahjOmdolxyXG4gICAgICogQHBhcmFtIHJlc3VsdCBcclxuICAgICAqL1xyXG4gICAgaW5zdGFsbFNob3J0Y3V0KHJlc3VsdDogUmVzdWx0Q2FsbGJhY2spIHtcclxuICAgICAgICByZXN1bHQoUmVzdWx0U3RhdGUuTk8pXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==