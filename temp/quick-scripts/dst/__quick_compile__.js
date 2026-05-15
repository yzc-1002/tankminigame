
(function () {
var scripts = [{"deps":{"./assets/script/Enemy":115,"./assets/script/EnergyEgg":128,"./assets/script/EnergyItem":124,"./assets/script/JoyStick":35,"./assets/script/GameMap":28,"./assets/script/OilPickup":127,"./assets/script/GameMain":119,"./assets/script/Revive":31,"./assets/script/GameScene":27,"./assets/script/Finish":8,"./assets/script/Setting":32,"./assets/script/SkillIcon":120,"./assets/script/StartScene":34,"./assets/script/Upgrade":9,"./assets/script/TankE":3,"./assets/script/Player":1,"./assets/script/BulletE":4,"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":26,"./assets/script/ad/Analytics":42,"./assets/script/ad/InsertAd":43,"./assets/script/ad/JumpMini":38,"./assets/script/ad/Share":37,"./assets/script/ad/Recorder":40,"./assets/script/ad/RewardAd":33,"./assets/script/ad/BannerAd":36,"./assets/script/ad/admob/AdmobBannerAd":5,"./assets/script/ad/admob/AdmobShare":41,"./assets/script/ad/admob/AdmobInsertAd":45,"./assets/script/ad/admob/AdmobRewardAd":39,"./assets/script/ad/bytedance/TTInsertAd":10,"./assets/script/ad/bytedance/TTRecorderEx":53,"./assets/script/ad/bytedance/TTRewardAd":46,"./assets/script/ad/bytedance/TTShareEx":44,"./assets/script/ad/bytedance/TTBannerAd":57,"./assets/script/ad/wechat/WechatBannerAd":51,"./assets/script/ad/wechat/WechatAnalytics":11,"./assets/script/ad/wechat/WechatShare":47,"./assets/script/ad/wechat/WechatRewardAd":50,"./assets/script/ad/wechat/WechatInsertAd":49,"./assets/script/base/LinkPrefab":54,"./assets/script/base/BaseComponent":48,"./assets/script/base/MusicManager":65,"./assets/script/base/LocalizedData":63,"./assets/script/base/Utils":2,"./assets/script/base/Dialogs":52,"./assets/script/config/Level":58,"./assets/script/config/ADConfig":13,"./assets/script/config/Music":56,"./assets/script/config/Bullet":55,"./assets/script/config/Tank":59,"./assets/script/config/Energy":125,"./assets/script/config/AD":60,"./assets/script/network/NetworkManager":129,"./assets/script/effect/RippleShockwave":126,"./assets/script/sdk/engine/ScreenshotComp":64,"./assets/script/sdk/engine/TextureRenderUtils":14,"./assets/script/sdk/sdk/SDKManager":62,"./assets/script/sdk/sdk/SDKConfig":15,"./assets/script/sdk/sdk/base/BaseNativeAdItemModel":69,"./assets/script/sdk/sdk/base/BaseChannel":123,"./assets/script/sdk/sdk/base/BaseRecorder":67,"./assets/script/sdk/sdk/base/BaseLogin":66,"./assets/script/sdk/sdk/base/BaseScreenshot":77,"./assets/script/sdk/sdk/base/BaseSDK":72,"./assets/script/sdk/sdk/base/BaseShare":68,"./assets/script/sdk/sdk/base/BaseSubPackage":6,"./assets/script/sdk/sdk/base/BaseAd":78,"./assets/script/sdk/Main":61,"./assets/script/sdk/sdk/bd/BDChannel":74,"./assets/script/sdk/sdk/bd/BDScreenshot":73,"./assets/script/sdk/sdk/bd/BDSubPackage":70,"./assets/script/sdk/sdk/bd/BDRewardAd":16,"./assets/script/sdk/sdk/comp/InstallIconComp":80,"./assets/script/sdk/sdk/comp/NativeAdItemView":76,"./assets/script/sdk/sdk/comp/InsertAdComp":86,"./assets/script/sdk/sdk/comp/NativeComp":82,"./assets/script/sdk/sdk/comp/JumpMiniComp":85,"./assets/script/sdk/sdk/comp/RecorderComp":71,"./assets/script/sdk/sdk/comp/RewardAdComp":17,"./assets/script/sdk/sdk/comp/ShareComp":79,"./assets/script/sdk/sdk/comp/ScreenshotComponent":83,"./assets/script/sdk/sdk/comp/BannerAdComp":75,"./assets/script/sdk/sdk/data/ChannelItemModel":18,"./assets/script/sdk/sdk/oppo/OppoInsertAd":90,"./assets/script/sdk/sdk/oppo/OppoRewardAd":81,"./assets/script/sdk/sdk/oppo/OppoNativeAdItemModel":91,"./assets/script/sdk/sdk/oppo/OppoBannerAd":19,"./assets/script/sdk/sdk/oppo/OppoSubPackage":87,"./assets/script/sdk/sdk/oppo/OppoChannel":84,"./assets/script/sdk/sdk/oppo/OppoScreenshot":92,"./assets/script/sdk/sdk/oppo/OppoNativeAd":93,"./assets/script/sdk/sdk/dev/DevChannel":21,"./assets/script/sdk/sdk/qq/QQBanner":88,"./assets/script/sdk/sdk/qq/QQChannel":95,"./assets/script/sdk/sdk/qq/QQScreenshot":96,"./assets/script/sdk/sdk/qq/QQSubPackage":20,"./assets/script/sdk/sdk/qq/QQInterstitialAd":94,"./assets/script/sdk/sdk/qq/QQShare":89,"./assets/script/sdk/sdk/qq/QQVideoAd":99,"./assets/script/sdk/sdk/qq/QQAppBoxAd":97,"./assets/script/sdk/sdk/tt/TTChannel":98,"./assets/script/sdk/sdk/tt/TTRecorder":100,"./assets/script/sdk/sdk/tt/TTScreenshot":29,"./assets/script/sdk/sdk/tt/TTBanner":116,"./assets/script/sdk/sdk/tt/TTLogin":103,"./assets/script/sdk/sdk/tt/TTVideoAd":113,"./assets/script/sdk/sdk/tt/TTShare":101,"./assets/script/sdk/sdk/tt/TTInsertAd1":105,"./assets/script/sdk/sdk/vivo/VivoChannel":106,"./assets/script/sdk/sdk/vivo/VivoRewardAd":104,"./assets/script/sdk/sdk/vivo/VivoBannerAd":107,"./assets/script/sdk/sdk/vivo/VIvoInsertAd":102,"./assets/script/sdk/sdk/vivo/VivoNativeAd":22,"./assets/script/sdk/sdk/wx/WXInterstitialAd":112,"./assets/script/sdk/sdk/wx/WXScreenshot":114,"./assets/script/sdk/sdk/wx/WXChannel":117,"./assets/script/sdk/sdk/wx/WXShare":121,"./assets/script/sdk/sdk/wx/WXRewardedVideoAd":23,"./assets/script/sdk/sdk/wx/WXSubPackage":109,"./assets/script/sdk/sdk/wx/WXlogin":108,"./assets/script/sdk/sdk/wx/WXBannerAd":111,"./assets/script/sdk/test/FunctionView":25,"./assets/script/sdk/test/NativeView":118,"./assets/script/sdk/test/HomeView":110,"./assets/script/sdk/test/BannerView":122,"./assets/script/CoinItem":30,"./assets/resources/shader/flash-light":7,"./assets/wish/Wish":24,"./assets/script/sdk/cfw/interface/TextureRenderInterface":12},"path":"preview-scripts/__qc_index__.js"},{"deps":{"./TankE":3,"./BulletE":4,"./base/Utils":2,"./base/MusicManager":65,"./sdk/sdk/SDKManager":62},"path":"preview-scripts/assets/script/Player.js"},{"deps":{"./MusicManager":65,"./LocalizedData":63},"path":"preview-scripts/assets/script/base/Utils.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2,"./base/MusicManager":65},"path":"preview-scripts/assets/script/TankE.js"},{"deps":{"./base/LocalizedData":63,"./base/BaseComponent":48,"./base/Utils":2},"path":"preview-scripts/assets/script/BulletE.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobBannerAd.js"},{"deps":{"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseSubPackage.js"},{"deps":{},"path":"preview-scripts/assets/resources/shader/flash-light.js"},{"deps":{"./base/Utils":2,"./base/MusicManager":65,"./base/BaseComponent":48,"./ad/Analytics":42,"../script/ad/RewardAd":33},"path":"preview-scripts/assets/script/Finish.js"},{"deps":{"./base/BaseComponent":48,"./base/LocalizedData":63,"./base/MusicManager":65,"./ad/Analytics":42},"path":"preview-scripts/assets/script/Upgrade.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTInsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatAnalytics.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/cfw/interface/TextureRenderInterface.js"},{"deps":{},"path":"preview-scripts/assets/script/config/ADConfig.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/engine/TextureRenderUtils.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/SDKConfig.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDRewardAd.js"},{"deps":{"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/RewardAdComp.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/data/ChannelItemModel.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoBannerAd.js"},{"deps":{"../base/BaseSubPackage":6,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQSubPackage.js"},{"deps":{"../base/BaseChannel":123},"path":"preview-scripts/assets/script/sdk/sdk/dev/DevChannel.js"},{"deps":{"../oppo/OppoNativeAdItemModel":91,"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoNativeAd.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXRewardedVideoAd.js"},{"deps":{"../script/base/Utils":2,"../script/base/Dialogs":52,"../script/base/MusicManager":65,"../script/ad/Analytics":42,"../script/ad/RewardAd":33},"path":"preview-scripts/assets/wish/Wish.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/FunctionView.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{"./base/MusicManager":65,"./ad/InsertAd":43,"./base/BaseComponent":48,"./base/Utils":2,"./ad/RewardAd":33},"path":"preview-scripts/assets/script/GameScene.js"},{"deps":{"./EnergyItem":124,"./base/Utils":2,"./base/BaseComponent":48,"./base/MusicManager":65,"./base/LocalizedData":63,"./EnergyEgg":128,"./OilPickup":127,"./effect/RippleShockwave":126,"./ad/Analytics":42},"path":"preview-scripts/assets/script/GameMap.js"},{"deps":{"../base/BaseScreenshot":77},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTScreenshot.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2,"./base/LocalizedData":63,"./base/MusicManager":65,"./ad/Share":37},"path":"preview-scripts/assets/script/CoinItem.js"},{"deps":{"./base/BaseComponent":48,"./ad/RewardAd":33,"./base/Utils":2,"./ad/Analytics":42},"path":"preview-scripts/assets/script/Revive.js"},{"deps":{"./base/LocalizedData":63,"./base/Dialogs":52,"./base/MusicManager":65},"path":"preview-scripts/assets/script/Setting.js"},{"deps":{"./admob/AdmobRewardAd":39,"./wechat/WechatRewardAd":50,"./bytedance/TTRewardAd":46},"path":"preview-scripts/assets/script/ad/RewardAd.js"},{"deps":{},"path":"preview-scripts/assets/script/StartScene.js"},{"deps":{"./base/BaseComponent":48},"path":"preview-scripts/assets/script/JoyStick.js"},{"deps":{"./wechat/WechatBannerAd":51,"./bytedance/TTBannerAd":57,"./admob/AdmobBannerAd":5},"path":"preview-scripts/assets/script/ad/BannerAd.js"},{"deps":{"./wechat/WechatShare":47,"./bytedance/TTShareEx":44,"./admob/AdmobShare":41},"path":"preview-scripts/assets/script/ad/Share.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/JumpMini.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobRewardAd.js"},{"deps":{"./bytedance/TTRecorderEx":53},"path":"preview-scripts/assets/script/ad/Recorder.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobShare.js"},{"deps":{"./wechat/WechatAnalytics":11},"path":"preview-scripts/assets/script/ad/Analytics.js"},{"deps":{"./wechat/WechatInsertAd":49,"./admob/AdmobInsertAd":45,"./bytedance/TTInsertAd":10},"path":"preview-scripts/assets/script/ad/InsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTShareEx.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobInsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTRewardAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatShare.js"},{"deps":{"./LinkPrefab":54,"./Utils":2},"path":"preview-scripts/assets/script/base/BaseComponent.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatInsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatRewardAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatBannerAd.js"},{"deps":{"./BaseComponent":48,"./Utils":2},"path":"preview-scripts/assets/script/base/Dialogs.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTRecorderEx.js"},{"deps":{},"path":"preview-scripts/assets/script/base/LinkPrefab.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Bullet.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Music.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTBannerAd.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Level.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Tank.js"},{"deps":{},"path":"preview-scripts/assets/script/config/AD.js"},{"deps":{"./sdk/SDKManager":62},"path":"preview-scripts/assets/script/sdk/Main.js"},{"deps":{"./wx/WXChannel":117,"./vivo/VivoChannel":106,"./oppo/OppoChannel":84,"./bd/BDChannel":74,"./qq/QQChannel":95,"./SDKConfig":15,"./tt/TTChannel":98,"./dev/DevChannel":21},"path":"preview-scripts/assets/script/sdk/sdk/SDKManager.js"},{"deps":{},"path":"preview-scripts/assets/script/base/LocalizedData.js"},{"deps":{"./TextureRenderUtils":14},"path":"preview-scripts/assets/script/sdk/engine/ScreenshotComp.js"},{"deps":{"./LocalizedData":63},"path":"preview-scripts/assets/script/base/MusicManager.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseLogin.js"},{"deps":{"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseRecorder.js"},{"deps":{"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseShare.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseNativeAdItemModel.js"},{"deps":{"../base/BaseSubPackage":6,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDSubPackage.js"},{"deps":{"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/RecorderComp.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseSDK.js"},{"deps":{"../base/BaseScreenshot":77},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDScreenshot.js"},{"deps":{"../base/BaseChannel":123,"./BDScreenshot":73,"./BDSubPackage":70,"./BDRewardAd":16},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDChannel.js"},{"deps":{"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/BannerAdComp.js"},{"deps":{"../SDKConfig":15,"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/NativeAdItemView.js"},{"deps":{"../../engine/TextureRenderUtils":14},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseScreenshot.js"},{"deps":{"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseAd.js"},{"deps":{"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/ShareComp.js"},{"deps":{"../SDKManager":62,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/InstallIconComp.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoRewardAd.js"},{"deps":{"./NativeAdItemView":76,"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/NativeComp.js"},{"deps":{"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/ScreenshotComponent.js"},{"deps":{"../base/BaseChannel":123,"./OppoRewardAd":81,"./OppoBannerAd":19,"./OppoInsertAd":90,"./OppoNativeAd":93,"./OppoSubPackage":87,"./OppoScreenshot":92,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoChannel.js"},{"deps":{"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/JumpMiniComp.js"},{"deps":{"../SDKManager":62},"path":"preview-scripts/assets/script/sdk/sdk/comp/InsertAdComp.js"},{"deps":{"../base/BaseSubPackage":6,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoSubPackage.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQBanner.js"},{"deps":{"../base/BaseShare":68,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQShare.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoInsertAd.js"},{"deps":{"../base/BaseNativeAdItemModel":69},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAdItemModel.js"},{"deps":{"../base/BaseScreenshot":77,"../../engine/TextureRenderUtils":14},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoScreenshot.js"},{"deps":{"./OppoNativeAdItemModel":91,"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAd.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQInterstitialAd.js"},{"deps":{"../base/BaseChannel":123,"./QQBanner":88,"./QQVideoAd":99,"./QQInterstitialAd":94,"./QQShare":89,"./QQAppBoxAd":97,"./QQScreenshot":96,"./QQSubPackage":20},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQChannel.js"},{"deps":{"../base/BaseScreenshot":77},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQScreenshot.js"},{"deps":{"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQAppBoxAd.js"},{"deps":{"../base/BaseChannel":123,"./TTBanner":116,"./TTVideoAd":113,"./TTShare":101,"./TTRecorder":100,"./TTLogin":103,"./TTInsertAd1":105,"../SDKConfig":15,"./TTScreenshot":29},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTChannel.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQVideoAd.js"},{"deps":{"../base/BaseRecorder":67,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTRecorder.js"},{"deps":{"../base/BaseShare":68,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTShare.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VIvoInsertAd.js"},{"deps":{"../SDKConfig":15,"../base/BaseLogin":66},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTLogin.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoRewardAd.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTInsertAd1.js"},{"deps":{"./VivoRewardAd":104,"./VIvoInsertAd":102,"./VivoBannerAd":107,"../base/BaseChannel":123,"../SDKConfig":15,"./VivoNativeAd":22},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoChannel.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoBannerAd.js"},{"deps":{"../base/BaseLogin":66,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXlogin.js"},{"deps":{"../base/BaseSubPackage":6,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXSubPackage.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/HomeView.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXBannerAd.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXInterstitialAd.js"},{"deps":{"../base/BaseAd":78,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTVideoAd.js"},{"deps":{"../base/BaseScreenshot":77},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXScreenshot.js"},{"deps":{"./TankE":3,"./base/Utils":2,"./BulletE":4},"path":"preview-scripts/assets/script/Enemy.js"},{"deps":{"../SDKConfig":15,"../base/BaseAd":78},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTBanner.js"},{"deps":{"./WXRewardedVideoAd":23,"../base/BaseChannel":123,"./WXShare":121,"./WXlogin":108,"./WXBannerAd":111,"./WXScreenshot":114},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXChannel.js"},{"deps":{"../sdk/SDKManager":62},"path":"preview-scripts/assets/script/sdk/test/NativeView.js"},{"deps":{"./base/LocalizedData":63,"./base/BaseComponent":48,"./base/Utils":2,"./base/MusicManager":65,"./network/NetworkManager":129,"./ad/Analytics":42,"./ad/InsertAd":43,"./ad/RewardAd":33},"path":"preview-scripts/assets/script/GameMain.js"},{"deps":{"./base/Utils":2,"./base/BaseComponent":48,"./ad/RewardAd":33,"./ad/Analytics":42},"path":"preview-scripts/assets/script/SkillIcon.js"},{"deps":{"../base/BaseShare":68,"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXShare.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/BannerView.js"},{"deps":{"../SDKConfig":15},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseChannel.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2},"path":"preview-scripts/assets/script/EnergyItem.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Energy.js"},{"deps":{},"path":"preview-scripts/assets/script/effect/RippleShockwave.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2},"path":"preview-scripts/assets/script/OilPickup.js"},{"deps":{"./base/Utils":2,"./base/BaseComponent":48},"path":"preview-scripts/assets/script/EnergyEgg.js"},{"deps":{},"path":"preview-scripts/assets/script/network/NetworkManager.js"}];
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
    