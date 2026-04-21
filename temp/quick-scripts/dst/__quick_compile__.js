
(function () {
var scripts = [{"deps":{"./assets/script/ad/admob/AdmobBannerAd":5,"./assets/resources/shader/flash-light":7,"./assets/script/sdk/cfw/interface/TextureRenderInterface":10,"./assets/script/ad/bytedance/TTRecorderEx":11,"./assets/script/ad/wechat/WechatShare":12,"./assets/script/config/AD":13,"./assets/script/sdk/sdk/data/ChannelItemModel":19,"./assets/script/sdk/test/FunctionView":25,"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":26,"./assets/script/StartScene":32,"./assets/script/ad/JumpMini":37,"./assets/script/ad/admob/AdmobInsertAd":38,"./assets/script/ad/admob/AdmobShare":40,"./assets/script/ad/bytedance/TTInsertAd":44,"./assets/script/ad/admob/AdmobRewardAd":45,"./assets/script/ad/bytedance/TTBannerAd":47,"./assets/script/ad/wechat/WechatAnalytics":48,"./assets/script/ad/wechat/WechatRewardAd":49,"./assets/script/ad/wechat/WechatBannerAd":50,"./assets/script/base/LocalizedData":51,"./assets/script/ad/bytedance/TTShareEx":52,"./assets/script/ad/bytedance/TTRewardAd":53,"./assets/script/ad/wechat/WechatInsertAd":55,"./assets/script/base/LinkPrefab":56,"./assets/script/config/Tank":57,"./assets/script/base/MusicManager":58,"./assets/script/config/Bullet":59,"./assets/script/config/Level":61,"./assets/script/config/Music":62,"./assets/script/config/ADConfig":63,"./assets/script/sdk/sdk/base/BaseNativeAdItemModel":65,"./assets/script/sdk/sdk/SDKConfig":66,"./assets/script/sdk/engine/TextureRenderUtils":68,"./assets/script/sdk/sdk/base/BaseSDK":72,"./assets/script/sdk/test/BannerView":117,"./assets/script/sdk/test/HomeView":119,"./assets/script/sdk/sdk/base/BaseLogin":123,"./assets/script/Player":1,"./assets/script/SkillIcon":3,"./assets/script/base/Utils":2,"./assets/script/TankE":4,"./assets/script/Upgrade":8,"./assets/script/Revive":9,"./assets/wish/Wish":27,"./assets/script/Finish":28,"./assets/script/GameScene":29,"./assets/script/JoyStick":31,"./assets/script/GameMap":30,"./assets/script/Setting":34,"./assets/script/CoinItem":35,"./assets/script/Enemy":116,"./assets/script/GameMain":115,"./assets/script/BulletE":121,"./assets/script/ad/RewardAd":33,"./assets/script/ad/Analytics":36,"./assets/script/ad/InsertAd":39,"./assets/script/ad/Recorder":42,"./assets/script/ad/BannerAd":41,"./assets/script/ad/Share":43,"./assets/script/base/BaseComponent":54,"./assets/script/base/Dialogs":46,"./assets/script/sdk/Main":60,"./assets/script/sdk/sdk/base/BaseScreenshot":6,"./assets/script/sdk/engine/ScreenshotComp":15,"./assets/script/sdk/sdk/SDKManager":14,"./assets/script/sdk/sdk/bd/BDSubPackage":16,"./assets/script/sdk/sdk/comp/BannerAdComp":18,"./assets/script/sdk/sdk/oppo/OppoChannel":17,"./assets/script/sdk/sdk/dev/DevChannel":20,"./assets/script/sdk/sdk/qq/QQShare":21,"./assets/script/sdk/sdk/vivo/VivoBannerAd":23,"./assets/script/sdk/sdk/tt/TTChannel":22,"./assets/script/sdk/test/NativeView":120,"./assets/script/sdk/sdk/wx/WXChannel":24,"./assets/script/sdk/sdk/base/BaseRecorder":64,"./assets/script/sdk/sdk/base/BaseSubPackage":69,"./assets/script/sdk/sdk/base/BaseShare":67,"./assets/script/sdk/sdk/base/BaseAd":73,"./assets/script/sdk/sdk/bd/BDRewardAd":74,"./assets/script/sdk/sdk/bd/BDScreenshot":70,"./assets/script/sdk/sdk/bd/BDChannel":71,"./assets/script/sdk/sdk/comp/RecorderComp":76,"./assets/script/sdk/sdk/comp/ScreenshotComponent":79,"./assets/script/sdk/sdk/comp/JumpMiniComp":77,"./assets/script/sdk/sdk/comp/NativeAdItemView":78,"./assets/script/sdk/sdk/oppo/OppoScreenshot":80,"./assets/script/sdk/sdk/comp/ShareComp":82,"./assets/script/sdk/sdk/comp/RewardAdComp":83,"./assets/script/sdk/sdk/comp/InsertAdComp":81,"./assets/script/sdk/sdk/comp/NativeComp":84,"./assets/script/sdk/sdk/comp/InstallIconComp":75,"./assets/script/sdk/sdk/oppo/OppoRewardAd":85,"./assets/script/sdk/sdk/oppo/OppoInsertAd":86,"./assets/script/sdk/sdk/qq/QQInterstitialAd":89,"./assets/script/sdk/sdk/oppo/OppoSubPackage":90,"./assets/script/sdk/sdk/qq/QQSubPackage":91,"./assets/script/sdk/sdk/oppo/OppoNativeAd":88,"./assets/script/sdk/sdk/qq/QQScreenshot":93,"./assets/script/sdk/sdk/oppo/OppoBannerAd":92,"./assets/script/sdk/sdk/qq/QQAppBoxAd":95,"./assets/script/sdk/sdk/qq/QQVideoAd":94,"./assets/script/sdk/sdk/tt/TTVideoAd":97,"./assets/script/sdk/sdk/tt/TTScreenshot":99,"./assets/script/sdk/sdk/tt/TTRecorder":98,"./assets/script/sdk/sdk/qq/QQBanner":100,"./assets/script/sdk/sdk/qq/QQChannel":96,"./assets/script/sdk/sdk/tt/TTLogin":101,"./assets/script/sdk/sdk/tt/TTShare":103,"./assets/script/sdk/sdk/vivo/VivoNativeAd":104,"./assets/script/sdk/sdk/wx/WXScreenshot":105,"./assets/script/sdk/sdk/vivo/VIvoInsertAd":108,"./assets/script/sdk/sdk/wx/WXlogin":106,"./assets/script/sdk/sdk/vivo/VivoRewardAd":107,"./assets/script/sdk/sdk/wx/WXShare":110,"./assets/script/sdk/sdk/wx/WXRewardedVideoAd":111,"./assets/script/sdk/sdk/vivo/VivoChannel":109,"./assets/script/sdk/sdk/wx/WXInterstitialAd":112,"./assets/script/sdk/sdk/oppo/OppoNativeAdItemModel":87,"./assets/script/sdk/sdk/wx/WXBannerAd":113,"./assets/script/sdk/sdk/wx/WXSubPackage":114,"./assets/script/sdk/sdk/tt/TTInsertAd1":118,"./assets/script/sdk/sdk/base/BaseChannel":122,"./assets/script/sdk/sdk/tt/TTBanner":102},"path":"preview-scripts/__qc_index__.js"},{"deps":{"./TankE":4,"./base/MusicManager":58,"./BulletE":121,"./base/Utils":2},"path":"preview-scripts/assets/script/Player.js"},{"deps":{"./LocalizedData":51},"path":"preview-scripts/assets/script/base/Utils.js"},{"deps":{"./base/BaseComponent":54,"./ad/RewardAd":33,"./ad/Analytics":36,"./base/Utils":2},"path":"preview-scripts/assets/script/SkillIcon.js"},{"deps":{"./base/BaseComponent":54,"./base/Utils":2,"./base/MusicManager":58},"path":"preview-scripts/assets/script/TankE.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobBannerAd.js"},{"deps":{"../../engine/TextureRenderUtils":68},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseScreenshot.js"},{"deps":{},"path":"preview-scripts/assets/resources/shader/flash-light.js"},{"deps":{"./base/BaseComponent":54,"./ad/Analytics":36,"./base/MusicManager":58,"./base/LocalizedData":51},"path":"preview-scripts/assets/script/Upgrade.js"},{"deps":{"./ad/Analytics":36,"./base/BaseComponent":54,"./ad/RewardAd":33,"./base/Utils":2},"path":"preview-scripts/assets/script/Revive.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/cfw/interface/TextureRenderInterface.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTRecorderEx.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatShare.js"},{"deps":{},"path":"preview-scripts/assets/script/config/AD.js"},{"deps":{"./wx/WXChannel":24,"./SDKConfig":66,"./oppo/OppoChannel":17,"./qq/QQChannel":96,"./tt/TTChannel":22,"./bd/BDChannel":71,"./dev/DevChannel":20,"./vivo/VivoChannel":109},"path":"preview-scripts/assets/script/sdk/sdk/SDKManager.js"},{"deps":{"./TextureRenderUtils":68},"path":"preview-scripts/assets/script/sdk/engine/ScreenshotComp.js"},{"deps":{"../base/BaseSubPackage":69,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDSubPackage.js"},{"deps":{"../base/BaseChannel":122,"../SDKConfig":66,"./OppoBannerAd":92,"./OppoNativeAd":88,"./OppoRewardAd":85,"./OppoScreenshot":80,"./OppoInsertAd":86,"./OppoSubPackage":90},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoChannel.js"},{"deps":{"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/BannerAdComp.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/data/ChannelItemModel.js"},{"deps":{"../base/BaseChannel":122},"path":"preview-scripts/assets/script/sdk/sdk/dev/DevChannel.js"},{"deps":{"../SDKConfig":66,"../base/BaseShare":67},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQShare.js"},{"deps":{"../base/BaseChannel":122,"./TTRecorder":98,"./TTBanner":102,"./TTLogin":101,"./TTVideoAd":97,"./TTShare":103,"./TTInsertAd1":118,"./TTScreenshot":99,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTChannel.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoBannerAd.js"},{"deps":{"../base/BaseChannel":122,"./WXRewardedVideoAd":111,"./WXBannerAd":113,"./WXScreenshot":105,"./WXShare":110,"./WXlogin":106},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXChannel.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/FunctionView.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{"../script/base/Dialogs":46,"../script/base/Utils":2,"../script/base/MusicManager":58,"../script/ad/Analytics":36,"../script/ad/RewardAd":33},"path":"preview-scripts/assets/wish/Wish.js"},{"deps":{"./base/Utils":2,"./base/MusicManager":58,"../script/ad/RewardAd":33,"./ad/Analytics":36,"./base/BaseComponent":54},"path":"preview-scripts/assets/script/Finish.js"},{"deps":{"./base/BaseComponent":54,"./base/MusicManager":58,"./ad/InsertAd":39,"./ad/RewardAd":33,"./base/Utils":2},"path":"preview-scripts/assets/script/GameScene.js"},{"deps":{"./base/BaseComponent":54,"./base/Utils":2,"./ad/Analytics":36,"./base/LocalizedData":51},"path":"preview-scripts/assets/script/GameMap.js"},{"deps":{"./base/BaseComponent":54},"path":"preview-scripts/assets/script/JoyStick.js"},{"deps":{},"path":"preview-scripts/assets/script/StartScene.js"},{"deps":{"./wechat/WechatRewardAd":49,"./bytedance/TTRewardAd":53,"./admob/AdmobRewardAd":45},"path":"preview-scripts/assets/script/ad/RewardAd.js"},{"deps":{"./base/LocalizedData":51,"./base/Dialogs":46},"path":"preview-scripts/assets/script/Setting.js"},{"deps":{"./base/BaseComponent":54,"./ad/Share":43,"./base/Utils":2,"./base/LocalizedData":51,"./base/MusicManager":58},"path":"preview-scripts/assets/script/CoinItem.js"},{"deps":{"./wechat/WechatAnalytics":48},"path":"preview-scripts/assets/script/ad/Analytics.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/JumpMini.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobInsertAd.js"},{"deps":{"./wechat/WechatInsertAd":55,"./admob/AdmobInsertAd":38,"./bytedance/TTInsertAd":44},"path":"preview-scripts/assets/script/ad/InsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobShare.js"},{"deps":{"./bytedance/TTBannerAd":47,"./wechat/WechatBannerAd":50,"./admob/AdmobBannerAd":5},"path":"preview-scripts/assets/script/ad/BannerAd.js"},{"deps":{"./bytedance/TTRecorderEx":11},"path":"preview-scripts/assets/script/ad/Recorder.js"},{"deps":{"./wechat/WechatShare":12,"./bytedance/TTShareEx":52,"./admob/AdmobShare":40},"path":"preview-scripts/assets/script/ad/Share.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTInsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobRewardAd.js"},{"deps":{"./BaseComponent":54,"./Utils":2},"path":"preview-scripts/assets/script/base/Dialogs.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTBannerAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatAnalytics.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatRewardAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatBannerAd.js"},{"deps":{},"path":"preview-scripts/assets/script/base/LocalizedData.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTShareEx.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTRewardAd.js"},{"deps":{"./LinkPrefab":56,"./Utils":2},"path":"preview-scripts/assets/script/base/BaseComponent.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatInsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/base/LinkPrefab.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Tank.js"},{"deps":{},"path":"preview-scripts/assets/script/base/MusicManager.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Bullet.js"},{"deps":{"./sdk/SDKManager":14},"path":"preview-scripts/assets/script/sdk/Main.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Level.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Music.js"},{"deps":{},"path":"preview-scripts/assets/script/config/ADConfig.js"},{"deps":{"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseRecorder.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseNativeAdItemModel.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/SDKConfig.js"},{"deps":{"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseShare.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/engine/TextureRenderUtils.js"},{"deps":{"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseSubPackage.js"},{"deps":{"../base/BaseScreenshot":6},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDScreenshot.js"},{"deps":{"../base/BaseChannel":122,"./BDRewardAd":74,"./BDSubPackage":16,"./BDScreenshot":70},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDChannel.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseSDK.js"},{"deps":{"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseAd.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDRewardAd.js"},{"deps":{"../SDKManager":14,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/comp/InstallIconComp.js"},{"deps":{"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/RecorderComp.js"},{"deps":{"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/JumpMiniComp.js"},{"deps":{"../SDKConfig":66,"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/NativeAdItemView.js"},{"deps":{"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/ScreenshotComponent.js"},{"deps":{"../base/BaseScreenshot":6,"../../engine/TextureRenderUtils":68},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoScreenshot.js"},{"deps":{"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/InsertAdComp.js"},{"deps":{"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/ShareComp.js"},{"deps":{"../SDKManager":14},"path":"preview-scripts/assets/script/sdk/sdk/comp/RewardAdComp.js"},{"deps":{"../SDKManager":14,"./NativeAdItemView":78},"path":"preview-scripts/assets/script/sdk/sdk/comp/NativeComp.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoRewardAd.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoInsertAd.js"},{"deps":{"../base/BaseNativeAdItemModel":65},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAdItemModel.js"},{"deps":{"./OppoNativeAdItemModel":87,"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAd.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQInterstitialAd.js"},{"deps":{"../base/BaseSubPackage":69,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoSubPackage.js"},{"deps":{"../base/BaseSubPackage":69,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQSubPackage.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoBannerAd.js"},{"deps":{"../base/BaseScreenshot":6},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQScreenshot.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQVideoAd.js"},{"deps":{"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQAppBoxAd.js"},{"deps":{"../base/BaseChannel":122,"./QQVideoAd":94,"./QQShare":21,"./QQBanner":100,"./QQInterstitialAd":89,"./QQSubPackage":91,"./QQScreenshot":93,"./QQAppBoxAd":95},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQChannel.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTVideoAd.js"},{"deps":{"../SDKConfig":66,"../base/BaseRecorder":64},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTRecorder.js"},{"deps":{"../base/BaseScreenshot":6},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTScreenshot.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQBanner.js"},{"deps":{"../SDKConfig":66,"../base/BaseLogin":123},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTLogin.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTBanner.js"},{"deps":{"../base/BaseShare":67,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTShare.js"},{"deps":{"../oppo/OppoNativeAdItemModel":87,"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoNativeAd.js"},{"deps":{"../base/BaseScreenshot":6},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXScreenshot.js"},{"deps":{"../base/BaseLogin":123,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXlogin.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoRewardAd.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VIvoInsertAd.js"},{"deps":{"../base/BaseChannel":122,"../SDKConfig":66,"./VIvoInsertAd":108,"./VivoRewardAd":107,"./VivoBannerAd":23,"./VivoNativeAd":104},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoChannel.js"},{"deps":{"../SDKConfig":66,"../base/BaseShare":67},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXShare.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXRewardedVideoAd.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXInterstitialAd.js"},{"deps":{"../base/BaseAd":73,"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXBannerAd.js"},{"deps":{"../SDKConfig":66,"../base/BaseSubPackage":69},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXSubPackage.js"},{"deps":{"./base/BaseComponent":54,"./base/LocalizedData":51,"./base/Utils":2,"./ad/InsertAd":39,"./ad/Analytics":36,"./ad/RewardAd":33,"./base/MusicManager":58},"path":"preview-scripts/assets/script/GameMain.js"},{"deps":{"./TankE":4,"./BulletE":121,"./base/Utils":2},"path":"preview-scripts/assets/script/Enemy.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/BannerView.js"},{"deps":{"../SDKConfig":66,"../base/BaseAd":73},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTInsertAd1.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/HomeView.js"},{"deps":{"../sdk/SDKManager":14},"path":"preview-scripts/assets/script/sdk/test/NativeView.js"},{"deps":{"./base/Utils":2,"./base/BaseComponent":54,"./base/LocalizedData":51},"path":"preview-scripts/assets/script/BulletE.js"},{"deps":{"../SDKConfig":66},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseChannel.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseLogin.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    