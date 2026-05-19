
(function () {
var scripts = [{"deps":{"./assets/script/CoinItem":32,"./assets/script/GameMain":127,"./assets/script/EnergyEgg":119,"./assets/script/Finish":112,"./assets/script/GameMap":129,"./assets/script/EnergyItem":8,"./assets/script/GameScene":31,"./assets/script/Setting":33,"./assets/script/Revive":37,"./assets/script/JoyStick":27,"./assets/script/SkillIcon":1,"./assets/script/TankE":10,"./assets/script/OilPickup":30,"./assets/script/Player":128,"./assets/script/StartScene":35,"./assets/script/Upgrade":11,"./assets/script/BulletE":124,"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":29,"./assets/script/ad/Recorder":42,"./assets/script/ad/Share":38,"./assets/script/ad/Analytics":41,"./assets/script/ad/RewardAd":44,"./assets/script/ad/JumpMini":39,"./assets/script/ad/BannerAd":34,"./assets/script/ad/InsertAd":43,"./assets/script/ad/admob/AdmobBannerAd":49,"./assets/script/ad/admob/AdmobRewardAd":46,"./assets/script/ad/admob/AdmobShare":4,"./assets/script/ad/admob/AdmobInsertAd":47,"./assets/script/ad/bytedance/TTShareEx":12,"./assets/script/ad/bytedance/TTRecorderEx":53,"./assets/script/ad/bytedance/TTBannerAd":45,"./assets/script/ad/bytedance/TTRewardAd":40,"./assets/script/ad/bytedance/TTInsertAd":51,"./assets/script/base/LinkPrefab":60,"./assets/script/base/MusicManager":56,"./assets/script/base/LocalizedData":108,"./assets/script/base/Dialogs":59,"./assets/script/base/Utils":2,"./assets/script/base/BaseComponent":48,"./assets/script/config/Bullet":62,"./assets/script/config/Level":58,"./assets/script/config/ADConfig":67,"./assets/script/config/Energy":57,"./assets/script/config/Music":14,"./assets/script/config/Tank":63,"./assets/script/config/AD":64,"./assets/script/ad/wechat/WechatAnalytics":54,"./assets/script/ad/wechat/WechatShare":52,"./assets/script/ad/wechat/WechatRewardAd":13,"./assets/script/ad/wechat/WechatInsertAd":50,"./assets/script/ad/wechat/WechatBannerAd":55,"./assets/script/effect/RippleShockwave":16,"./assets/script/sdk/Main":61,"./assets/script/network/NetworkManager":3,"./assets/script/sdk/sdk/SDKManager":15,"./assets/script/sdk/sdk/SDKConfig":70,"./assets/script/sdk/engine/TextureRenderUtils":17,"./assets/script/sdk/engine/ScreenshotComp":65,"./assets/script/sdk/sdk/base/BaseLogin":66,"./assets/script/sdk/sdk/base/BaseNativeAdItemModel":72,"./assets/script/sdk/sdk/base/BaseAd":75,"./assets/script/sdk/sdk/base/BaseSubPackage":68,"./assets/script/sdk/sdk/base/BaseRecorder":69,"./assets/script/sdk/sdk/base/BaseShare":5,"./assets/script/sdk/sdk/base/BaseScreenshot":73,"./assets/script/sdk/sdk/base/BaseSDK":71,"./assets/script/sdk/sdk/base/BaseChannel":126,"./assets/script/sdk/sdk/bd/BDRewardAd":76,"./assets/script/sdk/sdk/bd/BDScreenshot":18,"./assets/script/sdk/sdk/bd/BDSubPackage":77,"./assets/script/sdk/sdk/bd/BDChannel":74,"./assets/script/sdk/sdk/comp/JumpMiniComp":87,"./assets/script/sdk/sdk/comp/NativeAdItemView":84,"./assets/script/sdk/sdk/comp/InsertAdComp":78,"./assets/script/sdk/sdk/comp/InstallIconComp":80,"./assets/script/sdk/sdk/comp/ScreenshotComponent":81,"./assets/script/sdk/sdk/comp/NativeComp":83,"./assets/script/sdk/sdk/comp/RewardAdComp":19,"./assets/script/sdk/sdk/comp/RecorderComp":79,"./assets/script/sdk/sdk/comp/ShareComp":86,"./assets/script/sdk/sdk/comp/BannerAdComp":85,"./assets/script/sdk/sdk/data/ChannelItemModel":23,"./assets/script/sdk/sdk/dev/DevChannel":21,"./assets/script/sdk/sdk/oppo/OppoChannel":82,"./assets/script/sdk/sdk/oppo/OppoNativeAd":88,"./assets/script/sdk/sdk/oppo/OppoNativeAdItemModel":89,"./assets/script/sdk/sdk/oppo/OppoInsertAd":20,"./assets/script/sdk/sdk/oppo/OppoScreenshot":111,"./assets/script/sdk/sdk/oppo/OppoRewardAd":93,"./assets/script/sdk/sdk/oppo/OppoSubPackage":125,"./assets/script/sdk/sdk/oppo/OppoBannerAd":96,"./assets/script/sdk/sdk/qq/QQAppBoxAd":22,"./assets/script/sdk/sdk/qq/QQChannel":91,"./assets/script/sdk/sdk/qq/QQInterstitialAd":94,"./assets/script/sdk/sdk/qq/QQShare":97,"./assets/script/sdk/sdk/qq/QQSubPackage":123,"./assets/script/sdk/sdk/qq/QQVideoAd":92,"./assets/script/sdk/sdk/qq/QQScreenshot":90,"./assets/script/sdk/sdk/qq/QQBanner":95,"./assets/script/sdk/sdk/tt/TTLogin":99,"./assets/script/sdk/sdk/tt/TTChannel":98,"./assets/script/sdk/sdk/tt/TTScreenshot":36,"./assets/script/sdk/sdk/tt/TTRecorder":100,"./assets/script/sdk/sdk/tt/TTVideoAd":102,"./assets/script/sdk/sdk/tt/TTInsertAd1":107,"./assets/script/sdk/sdk/tt/TTShare":113,"./assets/script/sdk/sdk/tt/TTBanner":101,"./assets/script/sdk/sdk/vivo/VivoBannerAd":104,"./assets/script/sdk/sdk/vivo/VivoNativeAd":106,"./assets/script/sdk/sdk/vivo/VivoRewardAd":24,"./assets/script/sdk/sdk/vivo/VivoChannel":105,"./assets/script/sdk/sdk/vivo/VIvoInsertAd":109,"./assets/script/sdk/sdk/wx/WXChannel":115,"./assets/script/sdk/sdk/wx/WXScreenshot":122,"./assets/script/sdk/sdk/wx/WXBannerAd":103,"./assets/script/sdk/sdk/wx/WXSubPackage":121,"./assets/script/sdk/sdk/wx/WXlogin":114,"./assets/script/sdk/sdk/wx/WXRewardedVideoAd":117,"./assets/script/sdk/sdk/wx/WXShare":110,"./assets/script/sdk/sdk/wx/WXInterstitialAd":25,"./assets/script/sdk/test/FunctionView":120,"./assets/script/sdk/test/NativeView":28,"./assets/script/sdk/test/HomeView":116,"./assets/script/sdk/test/BannerView":118,"./assets/resources/shader/flash-light":6,"./assets/script/Enemy":7,"./assets/wish/Wish":26,"./assets/script/sdk/cfw/interface/TextureRenderInterface":9},"path":"preview-scripts/__qc_index__.js"},{"deps":{"./base/BaseComponent":48,"./ad/Analytics":41,"./base/Utils":2,"./ad/RewardAd":44},"path":"preview-scripts/assets/script/SkillIcon.js"},{"deps":{"./MusicManager":56,"./LocalizedData":108},"path":"preview-scripts/assets/script/base/Utils.js"},{"deps":{},"path":"preview-scripts/assets/script/network/NetworkManager.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobShare.js"},{"deps":{"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseShare.js"},{"deps":{},"path":"preview-scripts/assets/resources/shader/flash-light.js"},{"deps":{"./TankE":10,"./BulletE":124,"./base/Utils":2},"path":"preview-scripts/assets/script/Enemy.js"},{"deps":{"./base/Utils":2,"./base/BaseComponent":48},"path":"preview-scripts/assets/script/EnergyItem.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/cfw/interface/TextureRenderInterface.js"},{"deps":{"./base/Utils":2,"./base/BaseComponent":48,"./base/MusicManager":56},"path":"preview-scripts/assets/script/TankE.js"},{"deps":{"./ad/Analytics":41,"./base/LocalizedData":108,"./base/BaseComponent":48,"./base/MusicManager":56},"path":"preview-scripts/assets/script/Upgrade.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTShareEx.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatRewardAd.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Music.js"},{"deps":{"./SDKConfig":70,"./oppo/OppoChannel":82,"./vivo/VivoChannel":105,"./qq/QQChannel":91,"./wx/WXChannel":115,"./tt/TTChannel":98,"./bd/BDChannel":74,"./dev/DevChannel":21},"path":"preview-scripts/assets/script/sdk/sdk/SDKManager.js"},{"deps":{},"path":"preview-scripts/assets/script/effect/RippleShockwave.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/engine/TextureRenderUtils.js"},{"deps":{"../base/BaseScreenshot":73},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDScreenshot.js"},{"deps":{"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/RewardAdComp.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoInsertAd.js"},{"deps":{"../base/BaseChannel":126},"path":"preview-scripts/assets/script/sdk/sdk/dev/DevChannel.js"},{"deps":{"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQAppBoxAd.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/data/ChannelItemModel.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoRewardAd.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXInterstitialAd.js"},{"deps":{"../script/base/Utils":2,"../script/base/Dialogs":59,"../script/ad/RewardAd":44,"../script/base/MusicManager":56,"../script/ad/Analytics":41},"path":"preview-scripts/assets/wish/Wish.js"},{"deps":{"./base/BaseComponent":48},"path":"preview-scripts/assets/script/JoyStick.js"},{"deps":{"../sdk/SDKManager":15},"path":"preview-scripts/assets/script/sdk/test/NativeView.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2},"path":"preview-scripts/assets/script/OilPickup.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2,"./ad/InsertAd":43,"./ad/RewardAd":44,"./base/MusicManager":56},"path":"preview-scripts/assets/script/GameScene.js"},{"deps":{"./base/Utils":2,"./base/LocalizedData":108,"./base/BaseComponent":48,"./base/MusicManager":56,"./ad/Share":38},"path":"preview-scripts/assets/script/CoinItem.js"},{"deps":{"./base/Dialogs":59,"./base/MusicManager":56,"./base/LocalizedData":108},"path":"preview-scripts/assets/script/Setting.js"},{"deps":{"./wechat/WechatBannerAd":55,"./bytedance/TTBannerAd":45,"./admob/AdmobBannerAd":49},"path":"preview-scripts/assets/script/ad/BannerAd.js"},{"deps":{},"path":"preview-scripts/assets/script/StartScene.js"},{"deps":{"../base/BaseScreenshot":73},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTScreenshot.js"},{"deps":{"./base/Utils":2,"./ad/RewardAd":44,"./base/BaseComponent":48,"./ad/Analytics":41},"path":"preview-scripts/assets/script/Revive.js"},{"deps":{"./wechat/WechatShare":52,"./bytedance/TTShareEx":12,"./admob/AdmobShare":4},"path":"preview-scripts/assets/script/ad/Share.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/JumpMini.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTRewardAd.js"},{"deps":{"./wechat/WechatAnalytics":54},"path":"preview-scripts/assets/script/ad/Analytics.js"},{"deps":{"./bytedance/TTRecorderEx":53},"path":"preview-scripts/assets/script/ad/Recorder.js"},{"deps":{"./wechat/WechatInsertAd":50,"./admob/AdmobInsertAd":47,"./bytedance/TTInsertAd":51},"path":"preview-scripts/assets/script/ad/InsertAd.js"},{"deps":{"./admob/AdmobRewardAd":46,"./bytedance/TTRewardAd":40,"./wechat/WechatRewardAd":13},"path":"preview-scripts/assets/script/ad/RewardAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTBannerAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobRewardAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobInsertAd.js"},{"deps":{"./LinkPrefab":60,"./Utils":2},"path":"preview-scripts/assets/script/base/BaseComponent.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/admob/AdmobBannerAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatInsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTInsertAd.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatShare.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/bytedance/TTRecorderEx.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatAnalytics.js"},{"deps":{},"path":"preview-scripts/assets/script/ad/wechat/WechatBannerAd.js"},{"deps":{"./LocalizedData":108},"path":"preview-scripts/assets/script/base/MusicManager.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Energy.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Level.js"},{"deps":{"./BaseComponent":48,"./Utils":2},"path":"preview-scripts/assets/script/base/Dialogs.js"},{"deps":{},"path":"preview-scripts/assets/script/base/LinkPrefab.js"},{"deps":{"./sdk/SDKManager":15},"path":"preview-scripts/assets/script/sdk/Main.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Bullet.js"},{"deps":{},"path":"preview-scripts/assets/script/config/Tank.js"},{"deps":{},"path":"preview-scripts/assets/script/config/AD.js"},{"deps":{"./TextureRenderUtils":17},"path":"preview-scripts/assets/script/sdk/engine/ScreenshotComp.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseLogin.js"},{"deps":{},"path":"preview-scripts/assets/script/config/ADConfig.js"},{"deps":{"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseSubPackage.js"},{"deps":{"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseRecorder.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/SDKConfig.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseSDK.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseNativeAdItemModel.js"},{"deps":{"../../engine/TextureRenderUtils":17},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseScreenshot.js"},{"deps":{"../base/BaseChannel":126,"./BDRewardAd":76,"./BDScreenshot":18,"./BDSubPackage":77},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDChannel.js"},{"deps":{"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseAd.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDRewardAd.js"},{"deps":{"../base/BaseSubPackage":68,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/bd/BDSubPackage.js"},{"deps":{"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/InsertAdComp.js"},{"deps":{"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/RecorderComp.js"},{"deps":{"../SDKConfig":70,"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/InstallIconComp.js"},{"deps":{"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/ScreenshotComponent.js"},{"deps":{"../base/BaseChannel":126,"./OppoBannerAd":96,"./OppoNativeAd":88,"./OppoRewardAd":93,"./OppoScreenshot":111,"./OppoInsertAd":20,"./OppoSubPackage":125,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoChannel.js"},{"deps":{"../SDKManager":15,"./NativeAdItemView":84},"path":"preview-scripts/assets/script/sdk/sdk/comp/NativeComp.js"},{"deps":{"../SDKConfig":70,"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/NativeAdItemView.js"},{"deps":{"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/BannerAdComp.js"},{"deps":{"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/ShareComp.js"},{"deps":{"../SDKManager":15},"path":"preview-scripts/assets/script/sdk/sdk/comp/JumpMiniComp.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70,"./OppoNativeAdItemModel":89},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAd.js"},{"deps":{"../base/BaseNativeAdItemModel":72},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAdItemModel.js"},{"deps":{"../base/BaseScreenshot":73},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQScreenshot.js"},{"deps":{"../base/BaseChannel":126,"./QQVideoAd":92,"./QQSubPackage":123,"./QQInterstitialAd":94,"./QQScreenshot":90,"./QQAppBoxAd":22,"./QQShare":97,"./QQBanner":95},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQChannel.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQVideoAd.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoRewardAd.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQInterstitialAd.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQBanner.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoBannerAd.js"},{"deps":{"../SDKConfig":70,"../base/BaseShare":5},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQShare.js"},{"deps":{"./TTBanner":101,"../base/BaseChannel":126,"./TTVideoAd":102,"../SDKConfig":70,"./TTShare":113,"./TTRecorder":100,"./TTScreenshot":36,"./TTInsertAd1":107,"./TTLogin":99},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTChannel.js"},{"deps":{"../base/BaseLogin":66,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTLogin.js"},{"deps":{"../base/BaseRecorder":69,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTRecorder.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTBanner.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTVideoAd.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXBannerAd.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoBannerAd.js"},{"deps":{"./VivoBannerAd":104,"./VIvoInsertAd":109,"../SDKConfig":70,"../base/BaseChannel":126,"./VivoRewardAd":24,"./VivoNativeAd":106},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoChannel.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70,"../oppo/OppoNativeAdItemModel":89},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VivoNativeAd.js"},{"deps":{"../SDKConfig":70,"../base/BaseAd":75},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTInsertAd1.js"},{"deps":{},"path":"preview-scripts/assets/script/base/LocalizedData.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/vivo/VIvoInsertAd.js"},{"deps":{"../SDKConfig":70,"../base/BaseShare":5},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXShare.js"},{"deps":{"../base/BaseScreenshot":73,"../../engine/TextureRenderUtils":17},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoScreenshot.js"},{"deps":{"./base/Utils":2,"./base/BaseComponent":48,"./base/MusicManager":56,"../script/ad/RewardAd":44,"./ad/Analytics":41},"path":"preview-scripts/assets/script/Finish.js"},{"deps":{"../SDKConfig":70,"../base/BaseShare":5},"path":"preview-scripts/assets/script/sdk/sdk/tt/TTShare.js"},{"deps":{"../base/BaseLogin":66,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXlogin.js"},{"deps":{"../base/BaseChannel":126,"./WXBannerAd":103,"./WXRewardedVideoAd":117,"./WXShare":110,"./WXlogin":114,"./WXScreenshot":122},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXChannel.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/HomeView.js"},{"deps":{"../base/BaseAd":75,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXRewardedVideoAd.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/BannerView.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2},"path":"preview-scripts/assets/script/EnergyEgg.js"},{"deps":{},"path":"preview-scripts/assets/script/sdk/test/FunctionView.js"},{"deps":{"../SDKConfig":70,"../base/BaseSubPackage":68},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXSubPackage.js"},{"deps":{"../base/BaseScreenshot":73},"path":"preview-scripts/assets/script/sdk/sdk/wx/WXScreenshot.js"},{"deps":{"../base/BaseSubPackage":68,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/qq/QQSubPackage.js"},{"deps":{"./base/BaseComponent":48,"./base/Utils":2,"./base/LocalizedData":108},"path":"preview-scripts/assets/script/BulletE.js"},{"deps":{"../base/BaseSubPackage":68,"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/oppo/OppoSubPackage.js"},{"deps":{"../SDKConfig":70},"path":"preview-scripts/assets/script/sdk/sdk/base/BaseChannel.js"},{"deps":{"./base/MusicManager":56,"./base/LocalizedData":108,"./base/Utils":2,"./base/BaseComponent":48,"./ad/InsertAd":43,"./ad/Analytics":41,"./ad/RewardAd":44,"./network/NetworkManager":3},"path":"preview-scripts/assets/script/GameMain.js"},{"deps":{"./TankE":10,"./BulletE":124,"./sdk/sdk/SDKManager":15,"./base/MusicManager":56,"./base/Utils":2},"path":"preview-scripts/assets/script/Player.js"},{"deps":{"./EnergyItem":8,"./OilPickup":30,"./base/BaseComponent":48,"./base/LocalizedData":108,"./base/Utils":2,"./EnergyEgg":119,"./base/MusicManager":56,"./effect/RippleShockwave":16,"./ad/Analytics":41},"path":"preview-scripts/assets/script/GameMap.js"}];
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
    