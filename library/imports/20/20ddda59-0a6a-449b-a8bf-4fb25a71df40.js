"use strict";
cc._RF.push(module, '20dddpZCmpEm6i/T7Jacd9A', 'SDKConfig');
// script/sdk/sdk/SDKConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDKConfig = exports.ChannelID = exports.SDKState = exports.ResultState = exports.USE_SHARE = exports.ADName = exports.compareVersion = exports.random = exports.isNull = void 0;
function isNull(obj) {
    return obj == undefined || obj == null;
}
exports.isNull = isNull;
function random(start, end) {
    if (end) {
        return Math.floor(Math.random() * (end - start) + start);
    }
    else {
        return Math.floor(Math.random() * start);
    }
}
exports.random = random;
function compareVersion(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    var len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }
    for (var i = 0; i < len; i++) {
        var num1 = parseInt(v1[i]);
        var num2 = parseInt(v2[i]);
        if (num1 > num2) {
            return 1;
        }
        else if (num1 < num2) {
            return -1;
        }
    }
    return 0;
}
exports.compareVersion = compareVersion;
//广告名称，对应SDKCOnfig中的key
var ADName = /** @class */ (function () {
    function ADName() {
    }
    ADName.banner = 'banner'; //bander 广告
    ADName.reward = 'reward'; //激励视频
    ADName.insert = 'insert'; //插屏广告
    ADName.native = 'native'; //原生广告
    ADName.appbox = 'appbox'; //盒子广告
    ADName.shareTitle = 'shareTitle'; //分享标题
    ADName.shareImage = 'shareImage'; //分享图片或者ID
    ADName.shareImageId = 'shareImageId'; //分享图片的ID
    return ADName;
}());
exports.ADName = ADName;
//广告拉取失败是否使用分享
exports.USE_SHARE = true;
var ResultState;
(function (ResultState) {
    ResultState[ResultState["NO"] = 0] = "NO";
    ResultState[ResultState["YES"] = 1] = "YES";
    ResultState[ResultState["PROGRESS"] = 2] = "PROGRESS";
})(ResultState = exports.ResultState || (exports.ResultState = {}));
/**
 * 广告状态
 *
 */
var SDKState;
(function (SDKState) {
    SDKState[SDKState["close"] = 0] = "close";
    SDKState[SDKState["loading"] = 1] = "loading";
    SDKState[SDKState["loadSucess"] = 2] = "loadSucess";
    SDKState[SDKState["loadFail"] = 3] = "loadFail";
    SDKState[SDKState["open"] = 4] = "open";
})(SDKState = exports.SDKState || (exports.SDKState = {}));
/**
0	开发
1	微信
2	QQ
3	头条
4	OPPO
5	VIVO
6	百度
 */
var ChannelID;
(function (ChannelID) {
    ChannelID[ChannelID["DEV"] = 0] = "DEV";
    ChannelID[ChannelID["WX"] = 1] = "WX";
    ChannelID[ChannelID["QQ"] = 2] = "QQ";
    ChannelID[ChannelID["TT"] = 3] = "TT";
    ChannelID[ChannelID["OPPO"] = 4] = "OPPO";
    ChannelID[ChannelID["VIVO"] = 5] = "VIVO";
    ChannelID[ChannelID["BD"] = 6] = "BD";
})(ChannelID = exports.ChannelID || (exports.ChannelID = {}));
exports.SDKConfig = [
    {},
    {
        'banner': ['adunit-30911f9f1c544641'],
        'reward': ['adunit-a57ea0e6ae249c23'],
        'shareTitle': ['拼图大战,你准备好了吗?', '可爱的小猫咪,快来帮帮她!'],
        'shareImage': ['https://mmocgame.qpic.cn/wechatgame/Yc0K0gtav8ZN7gbMSS3ErS4KrdSocf75AJ9KvNL3LURMcIQUUYzKQZG0sk59mic93/0', 'https://mmocgame.qpic.cn/wechatgame/Yc0K0gtav8ZP5fdofPFRqwfsG69IusJ6A6ibW0CMI02dRcXTMkJm88TLskeJI40V1/0'],
        'shareImageId': ['fB0y1lGuRwu935jIG0mFNw==', 'O5iRP90kQPWgGFGd4/PRjw==']
    },
    {
        'banner': ['3dc6fcfee4628890315d17344b304198'],
        'insert': ['eb6a8d5369ad7568ce03dc2941063bd4'],
        'reward': ['1cbf2104918dc3fce3528e4e50d5de3f',],
        'appbox': ['3c1dbaed966527bb40c4cfda9e9789d1'],
        'shareTitle': ['[有人@你]快来挑战吧'],
        'shareImage': ['share4.jpg'],
    },
    {
        'banner': ['11kgdie55kae611xob'],
        'reward': ['3dcflbcao8dh18g6ja',],
        'insert': ['9406efbfk8eh2hccel'],
        'shareTitle': ['[有人@你]快来挑战吧'],
        'shareImage': ['share4.jpg'],
    },
    {
        'banner': ['184591'],
        'reward': ['184600',],
        'native': ['184599', '184598', '184597'],
        'insert': ['184593']
    },
    {
        'banner': ['a0d995c8e3e945e89455612b15a2d24c'],
        'reward': ['83c0e30bf7b0473c9cbfcf9b6644527c'],
        'insert': ['4f9d9fff72b64f868e48a3be2674f344'],
        'native': ['8e95b90220c04fa5934cd4a079ad8f53']
    },
    {
        'banner': [''],
        'reward': [
            '7052091',
        ]
    },
];

cc._RF.pop();