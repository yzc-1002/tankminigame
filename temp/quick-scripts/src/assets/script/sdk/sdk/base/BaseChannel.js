"use strict";
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