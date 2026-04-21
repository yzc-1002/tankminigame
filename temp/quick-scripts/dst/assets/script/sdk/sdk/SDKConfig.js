
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/SDKConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcU0RLQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFNBQWdCLE1BQU0sQ0FBQyxHQUFRO0lBQzNCLE9BQU8sR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDO0FBQzNDLENBQUM7QUFGRCx3QkFFQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxLQUFhLEVBQUUsR0FBWTtJQUM5QyxJQUFJLEdBQUcsRUFBRTtRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUE7S0FDM0Q7U0FBTTtRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7S0FDNUM7QUFDTCxDQUFDO0FBTkQsd0JBTUM7QUFDRCxTQUFnQixjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUU7SUFDakMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbEIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbEIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUxQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDZjtJQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7UUFDcEIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNmO0lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVB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QUFhLENBQUM7UUFDN0IsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQy9CO0lBQ0Q7UUFDSSxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDcEIsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ3JCLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQ3hDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztLQUN2QjtJQUNEO1FBQ0ksUUFBUSxFQUFFLENBQUMsa0NBQWtDLENBQUM7UUFDOUMsUUFBUSxFQUFFLENBQUMsa0NBQWtDLENBQUM7UUFDOUMsUUFBUSxFQUFFLENBQUMsa0NBQWtDLENBQUM7UUFDOUMsUUFBUSxFQUFFLENBQUMsa0NBQWtDLENBQUM7S0FDakQ7SUFDRDtRQUNJLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNkLFFBQVEsRUFBRTtZQUNOLFNBQVM7U0FDWjtLQUNKO0NBR0osQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTmF0aXZlQWRJdGVtTW9kZWwgZnJvbSBcIi4vYmFzZS9CYXNlTmF0aXZlQWRJdGVtTW9kZWxcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbChvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iaiA9PSB1bmRlZmluZWQgfHwgb2JqID09IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb20oc3RhcnQ6IG51bWJlciwgZW5kPzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmIChlbmQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGVuZCAtIHN0YXJ0KSArIHN0YXJ0KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3RhcnQpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcclxuICAgIHYxID0gdjEuc3BsaXQoJy4nKVxyXG4gICAgdjIgPSB2Mi5zcGxpdCgnLicpXHJcbiAgICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcclxuXHJcbiAgICB3aGlsZSAodjEubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICB9XHJcbiAgICB3aGlsZSAodjIubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG51bTEgPSBwYXJzZUludCh2MVtpXSlcclxuICAgICAgICBjb25zdCBudW0yID0gcGFyc2VJbnQodjJbaV0pXHJcblxyXG4gICAgICAgIGlmIChudW0xID4gbnVtMikge1xyXG4gICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtMSA8IG51bTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAwXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIERhdGFDYWxsYmFjayA9IChyZXN1bHQ6IFJlc3VsdFN0YXRlLCBkYXRhOiBhbnkpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIFJlc3VsdENhbGxiYWNrID0gKHJlc3VsdDogUmVzdWx0U3RhdGUpID0+IHZvaWRcclxuZXhwb3J0IHR5cGUgTmF0aXZlQWRDYWxsYmFjayA9IChsaXN0OiBCYXNlTmF0aXZlQWRJdGVtTW9kZWxbXSkgPT4gdm9pZDtcclxuLy/lub/lkYrlkI3np7DvvIzlr7nlupRTREtDT25maWfkuK3nmoRrZXlcclxuZXhwb3J0IGNsYXNzIEFETmFtZSB7XHJcbiAgICBzdGF0aWMgYmFubmVyOiBzdHJpbmcgPSAnYmFubmVyJy8vYmFuZGVyIOW5v+WRilxyXG4gICAgc3RhdGljIHJld2FyZDogc3RyaW5nID0gJ3Jld2FyZCcvL+a/gOWKseinhumikVxyXG4gICAgc3RhdGljIGluc2VydDogc3RyaW5nID0gJ2luc2VydCcvL+aPkuWxj+W5v+WRilxyXG4gICAgc3RhdGljIG5hdGl2ZTogc3RyaW5nID0gJ25hdGl2ZScvL+WOn+eUn+W5v+WRilxyXG4gICAgc3RhdGljIGFwcGJveDogc3RyaW5nID0gJ2FwcGJveCcvL+ebkuWtkOW5v+WRilxyXG4gICAgc3RhdGljIHNoYXJlVGl0bGU6IHN0cmluZyA9ICdzaGFyZVRpdGxlJy8v5YiG5Lqr5qCH6aKYXHJcbiAgICBzdGF0aWMgc2hhcmVJbWFnZTogc3RyaW5nID0gJ3NoYXJlSW1hZ2UnLy/liIbkuqvlm77niYfmiJbogIVJRFxyXG4gICAgc3RhdGljIHNoYXJlSW1hZ2VJZDogc3RyaW5nID0gJ3NoYXJlSW1hZ2VJZCcvL+WIhuS6q+WbvueJh+eahElEXHJcbn1cclxuXHJcblxyXG4vL+W5v+WRiuaLieWPluWksei0peaYr+WQpuS9v+eUqOWIhuS6q1xyXG5leHBvcnQgbGV0IFVTRV9TSEFSRTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cclxuZXhwb3J0IGVudW0gUmVzdWx0U3RhdGUge1xyXG4gICAgTk8sXHJcbiAgICBZRVMsXHJcbiAgICBQUk9HUkVTUyxcclxufVxyXG4vKipcclxuICog5bm/5ZGK54q25oCBXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGVudW0gU0RLU3RhdGUge1xyXG4gICAgY2xvc2UsLy/lhbPpl63nirbmgIFcclxuICAgIGxvYWRpbmcsLy/liqDovb3nirbmgIFcclxuICAgIGxvYWRTdWNlc3MsLy/liqDovb3miJDlip9cclxuICAgIGxvYWRGYWlsLC8v5Yqg6L295aSx6LSlXHJcbiAgICBvcGVuLC8v5pKt5pS+54q25oCBXHJcblxyXG59XHJcblxyXG4vKipcclxuMFx05byA5Y+RXHJcbjFcdOW+ruS/oVxyXG4yXHRRUVxyXG4zXHTlpLTmnaFcclxuNFx0T1BQT1xyXG41XHRWSVZPXHJcbjZcdOeZvuW6plxyXG4gKi9cclxuZXhwb3J0IGVudW0gQ2hhbm5lbElEIHtcclxuICAgIERFVixcclxuICAgIFdYLFxyXG4gICAgUVEsXHJcbiAgICBUVCxcclxuICAgIE9QUE8sXHJcbiAgICBWSVZPLFxyXG4gICAgQkQsLy/nmb7luqZcclxufVxyXG5cclxuXHJcbmV4cG9ydCBsZXQgU0RLQ29uZmlnOiBhbnlbXSA9IFtcclxuICAgIHt9LC8vZGV2XHJcbiAgICB7Ly/lvq7kv6FcclxuICAgICAgICAnYmFubmVyJzogWydhZHVuaXQtMzA5MTFmOWYxYzU0NDY0MSddLFxyXG4gICAgICAgICdyZXdhcmQnOiBbJ2FkdW5pdC1hNTdlYTBlNmFlMjQ5YzIzJ10sXHJcbiAgICAgICAgJ3NoYXJlVGl0bGUnOiBbJ+aLvOWbvuWkp+aImCzkvaDlh4blpIflpb3kuoblkJc/Jywn5Y+v54ix55qE5bCP54yr5ZKqLOW/q+adpeW4ruW4ruWluSEnXSxcclxuICAgICAgICAnc2hhcmVJbWFnZSc6IFsnaHR0cHM6Ly9tbW9jZ2FtZS5xcGljLmNuL3dlY2hhdGdhbWUvWWMwSzBndGF2OFpON2diTVNTM0VyUzRLcmRTb2NmNzVBSjlLdk5MM0xVUk1jSVFVVVl6S1FaRzBzazU5bWljOTMvMCcsJ2h0dHBzOi8vbW1vY2dhbWUucXBpYy5jbi93ZWNoYXRnYW1lL1ljMEswZ3RhdjhaUDVmZG9mUEZScXdmc0c2OUl1c0o2QTZpYlcwQ01JMDJkUmNYVE1rSm04OFRMc2tlSkk0MFYxLzAnXSxcclxuICAgICAgICAnc2hhcmVJbWFnZUlkJzogWydmQjB5MWxHdVJ3dTkzNWpJRzBtRk53PT0nLCdPNWlSUDkwa1FQV2dHRkdkNC9QUmp3PT0nXVxyXG4gICAgfSxcclxuICAgIHsvL3FxXHJcbiAgICAgICAgJ2Jhbm5lcic6IFsnM2RjNmZjZmVlNDYyODg5MDMxNWQxNzM0NGIzMDQxOTgnXSxcclxuICAgICAgICAnaW5zZXJ0JzogWydlYjZhOGQ1MzY5YWQ3NTY4Y2UwM2RjMjk0MTA2M2JkNCddLFxyXG4gICAgICAgICdyZXdhcmQnOiBbJzFjYmYyMTA0OTE4ZGMzZmNlMzUyOGU0ZTUwZDVkZTNmJyxdLFxyXG4gICAgICAgICdhcHBib3gnOiBbJzNjMWRiYWVkOTY2NTI3YmI0MGM0Y2ZkYTllOTc4OWQxJ10sXHJcbiAgICAgICAgJ3NoYXJlVGl0bGUnOiBbJ1vmnInkurpA5L2gXeW/q+adpeaMkeaImOWQpyddLFxyXG4gICAgICAgICdzaGFyZUltYWdlJzogWydzaGFyZTQuanBnJ10sXHJcbiAgICB9LFxyXG4gICAgey8vdHRcclxuICAgICAgICAnYmFubmVyJzogWycxMWtnZGllNTVrYWU2MTF4b2InXSxcclxuICAgICAgICAncmV3YXJkJzogWyczZGNmbGJjYW84ZGgxOGc2amEnLF0sXHJcbiAgICAgICAgJ2luc2VydCc6IFsnOTQwNmVmYmZrOGVoMmhjY2VsJ10sXHJcbiAgICAgICAgJ3NoYXJlVGl0bGUnOiBbJ1vmnInkurpA5L2gXeW/q+adpeaMkeaImOWQpyddLFxyXG4gICAgICAgICdzaGFyZUltYWdlJzogWydzaGFyZTQuanBnJ10sXHJcbiAgICB9LFxyXG4gICAgey8vb3Bwb1xyXG4gICAgICAgICdiYW5uZXInOiBbJzE4NDU5MSddLFxyXG4gICAgICAgICdyZXdhcmQnOiBbJzE4NDYwMCcsXSxcclxuICAgICAgICAnbmF0aXZlJzogWycxODQ1OTknLCAnMTg0NTk4JywgJzE4NDU5NyddLFxyXG4gICAgICAgICdpbnNlcnQnOiBbJzE4NDU5MyddXHJcbiAgICB9LFxyXG4gICAgey8vdml2b1xyXG4gICAgICAgICdiYW5uZXInOiBbJ2EwZDk5NWM4ZTNlOTQ1ZTg5NDU1NjEyYjE1YTJkMjRjJ10sXHJcbiAgICAgICAgJ3Jld2FyZCc6IFsnODNjMGUzMGJmN2IwNDczYzljYmZjZjliNjY0NDUyN2MnXSxcclxuICAgICAgICAnaW5zZXJ0JzogWyc0ZjlkOWZmZjcyYjY0Zjg2OGU0OGEzYmUyNjc0ZjM0NCddLFxyXG4gICAgICAgICduYXRpdmUnOiBbJzhlOTViOTAyMjBjMDRmYTU5MzRjZDRhMDc5YWQ4ZjUzJ11cclxuICAgIH0sXHJcbiAgICB7Ly9iYWlkdVxyXG4gICAgICAgICdiYW5uZXInOiBbJyddLFxyXG4gICAgICAgICdyZXdhcmQnOiBbXHJcbiAgICAgICAgICAgICc3MDUyMDkxJywvL+Wkjea0u1xyXG4gICAgICAgIF1cclxuICAgIH0sXHJcblxyXG5cclxuXSJdfQ==