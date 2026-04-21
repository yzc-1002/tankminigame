"use strict";
cc._RF.push(module, 'dbabbX0rV9PjJigEqJVSggt', 'AdmobShare');
// script/ad/admob/AdmobShare.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmobShare = void 0;
var AdmobShare = /** @class */ (function () {
    function AdmobShare(list) {
        //由于微信无法得到分享结果，所以以时间来判断是否成功。
        this.time = 0;
        this._list = [];
        this._list = list;
        var self = this;
        console.log('AndroidShare ' + JSON.stringify(this._list));
        //注册回调函数
        var AndroidShare = {
            shared: function (ret) {
                console.log("AndroidShare js1 ", ret);
                if (self.callback) {
                    console.log("AndroidShare js2 ", ret);
                    self.callback(ret);
                }
            }
        };
        window["AndroidShareJs"] = AndroidShare;
    }
    //回调函数,分享的id
    AdmobShare.prototype.share = function (func, index, arg) {
        this.callback = func;
        var config = this._list[index];
        var msg = config.Title;
        var url = config.ImageUrl;
        if (config.UseArg == 1) {
            msg = msg.replace("{0}", arg);
        }
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "doShare", "(Ljava/lang/String;Ljava/lang/String;)V", msg, url);
    };
    return AdmobShare;
}());
exports.AdmobShare = AdmobShare;

cc._RF.pop();