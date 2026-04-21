
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/Share.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '14f3adYYatC0oQw94pDs1Kf', 'Share');
// script/ad/Share.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Share = void 0;
var WechatShare_1 = require("./wechat/WechatShare");
var TTShareEx_1 = require("./bytedance/TTShareEx");
var AdmobShare_1 = require("./admob/AdmobShare");
var Share = /** @class */ (function () {
    function Share() {
        this._share = null; //分享实例
        this._list = []; //分享内容列表
        this._enabled = true; //是否允许分享
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this._getShareList('wx');
            this._share = new WechatShare_1.WechatShare(this._list);
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            this._getShareList('tt');
            this._share = new TTShareEx_1.TTShareEx(this._list);
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this._getShareList('admob');
            this._share = new AdmobShare_1.AdmobShare(this._list);
        }
        else {
            this._enabled = false;
        }
    }
    Share.getInstance = function () {
        if (Share._sInstance == null) {
            Share._sInstance = new Share();
        }
        return Share._sInstance;
    };
    //获取分享参数
    Share.prototype._getShareList = function (channle) {
        for (var key in yyp.config.SHARE) {
            if (yyp.config.SHARE.hasOwnProperty(key)) {
                var element = yyp.config.SHARE[key];
                if (element['Channel'] == channle) {
                    this._list.push(element);
                }
            }
        }
    };
    /**
     * 分享一条指定的内容
     * @param callback : 分享的回调函数
     * @param index : 分享内容的索引
     * @param arg : 目前只有安卓平台可能需要传递(替换分享内容中的{0})
     */
    Share.prototype.share = function (callback, index, arg) {
        if (arg === void 0) { arg = 1; }
        console.log("AndroidShare Share show1 ", index);
        if (this._share) {
            console.log("AndroidShare Share show2 ", index);
            this._share.share(callback, index, arg);
        }
    };
    /**
     * 是否允许分享
     */
    Share.prototype.enabled = function () {
        return this._enabled;
    };
    Share._sInstance = null; //静态实例
    return Share;
}());
exports.Share = Share;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcU2hhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWlEO0FBQ2pELG1EQUFnRDtBQUNoRCxpREFBOEM7QUFFOUM7SUFPSTtRQUpBLFdBQU0sR0FBZ0IsSUFBSSxDQUFDLENBQUMsTUFBTTtRQUNsQyxVQUFLLEdBQWlCLEVBQUUsQ0FBQyxDQUFHLFFBQVE7UUFDcEMsYUFBUSxHQUFjLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFJaEMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSx5QkFBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QzthQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUM7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7YUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVDO2FBQ0c7WUFDQSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUVMLENBQUM7SUFFTSxpQkFBVyxHQUFsQjtRQUNJLElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDMUIsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRO0lBQ1IsNkJBQWEsR0FBYixVQUFjLE9BQU87UUFDakIsS0FBSyxJQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEMsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sRUFBRTtvQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzVCO2FBRUo7U0FDSjtJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHFCQUFLLEdBQUwsVUFBTSxRQUFRLEVBQUMsS0FBSyxFQUFDLEdBQUs7UUFBTCxvQkFBQSxFQUFBLE9BQUs7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBTyxHQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFoRU0sZ0JBQVUsR0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNO0lBaUV0QyxZQUFDO0NBbkVELEFBbUVDLElBQUE7QUFuRVksc0JBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1dlY2hhdFNoYXJlfSBmcm9tIFwiLi93ZWNoYXQvV2VjaGF0U2hhcmVcIjtcclxuaW1wb3J0IHtUVFNoYXJlRXh9IGZyb20gXCIuL2J5dGVkYW5jZS9UVFNoYXJlRXhcIjtcclxuaW1wb3J0IHtBZG1vYlNoYXJlfSBmcm9tIFwiLi9hZG1vYi9BZG1vYlNoYXJlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhcmUgIHtcclxuXHJcbiAgICBzdGF0aWMgX3NJbnN0YW5jZSAgID0gbnVsbDsgLy/pnZnmgIHlrp7kvotcclxuICAgIF9zaGFyZSAgICAgICAgICAgICAgPSBudWxsOyAvL+WIhuS6q+WunuS+i1xyXG4gICAgX2xpc3QgICAgICAgICAgICAgICA9IFtdOyAgIC8v5YiG5Lqr5YaF5a655YiX6KGoXHJcbiAgICBfZW5hYmxlZCAgICAgICAgICAgID0gdHJ1ZTsgLy/mmK/lkKblhYHorrjliIbkuqtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICB0aGlzLl9nZXRTaGFyZUxpc3QoJ3d4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlID0gbmV3IFdlY2hhdFNoYXJlKHRoaXMuX2xpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2dldFNoYXJlTGlzdCgndHQnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2hhcmUgPSBuZXcgVFRTaGFyZUV4KHRoaXMuX2xpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEKXtcclxuICAgICAgICAgICAgdGhpcy5fZ2V0U2hhcmVMaXN0KCdhZG1vYicpO1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFyZSA9IG5ldyBBZG1vYlNoYXJlKHRoaXMuX2xpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSA6IFNoYXJle1xyXG4gICAgICAgIGlmIChTaGFyZS5fc0luc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgU2hhcmUuX3NJbnN0YW5jZSA9IG5ldyBTaGFyZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gU2hhcmUuX3NJbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ojrflj5bliIbkuqvlj4LmlbBcclxuICAgIF9nZXRTaGFyZUxpc3QoY2hhbm5sZSl7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4geXlwLmNvbmZpZy5TSEFSRSkge1xyXG4gICAgICAgICAgICBpZiAoeXlwLmNvbmZpZy5TSEFSRS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0geXlwLmNvbmZpZy5TSEFSRVtrZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRbJ0NoYW5uZWwnXSA9PSBjaGFubmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIbkuqvkuIDmnaHmjIflrprnmoTlhoXlrrlcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayA6IOWIhuS6q+eahOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIGluZGV4IDog5YiG5Lqr5YaF5a6555qE57Si5byVXHJcbiAgICAgKiBAcGFyYW0gYXJnIDog55uu5YmN5Y+q5pyJ5a6J5Y2T5bmz5Y+w5Y+v6IO96ZyA6KaB5Lyg6YCSKOabv+aNouWIhuS6q+WGheWuueS4reeahHswfSlcclxuICAgICAqL1xyXG4gICAgc2hhcmUoY2FsbGJhY2ssaW5kZXgsYXJnPTEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFuZHJvaWRTaGFyZSBTaGFyZSBzaG93MSBcIixpbmRleCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NoYXJlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbmRyb2lkU2hhcmUgU2hhcmUgc2hvdzIgXCIsaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFyZS5zaGFyZShjYWxsYmFjayxpbmRleCxhcmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWFgeiuuOWIhuS6q1xyXG4gICAgICovXHJcbiAgICBlbmFibGVkKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcclxuICAgIH1cclxufVxyXG4iXX0=