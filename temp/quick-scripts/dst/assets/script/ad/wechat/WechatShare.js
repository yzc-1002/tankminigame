
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/wechat/WechatShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7a7a6YUSYRCF6NtrL3/Bxt+', 'WechatShare');
// script/ad/wechat/WechatShare.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatShare = void 0;
/**
 * https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html
 */
var WechatShare = /** @class */ (function () {
    function WechatShare(list) {
        var _this = this;
        //由于微信无法得到分享结果，所以以时间来判断是否成功。
        this.time = 0;
        this._list = [];
        this._list = list;
        wx.showShareMenu({
            withShareTicket: true,
        });
        wx.updateShareMenu({
            withShareTicket: true
        });
        wx.onShow(function () {
            _this.backGame();
        });
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return _this._getData(0);
        });
    }
    //回调函数,分享的id
    WechatShare.prototype.share = function (func, index) {
        this.callback = func;
        // index = index ? index : Math.floor(Math.random()*this._list.length);
        wx.shareAppMessage(this._getData(index));
        this.time = Date.now();
    };
    //获取分享参数
    WechatShare.prototype._getData = function (index) {
        var data = {
            title: this._list[index].Title,
            imageUrl: this._list[index].ImageUrl,
            imageUrlId: this._list[index].ImageId
        };
        data = wx.uma['trackShare'](data); //友盟统计
        return data;
    };
    WechatShare.prototype.backGame = function () {
        if (this.callback) {
            var disTime = Date.now() - this.time;
            if (disTime >= 4000) {
                this.callback(true);
            }
            else {
                this.callback(false);
            }
            this.callback = null;
        }
    };
    return WechatShare;
}());
exports.WechatShare = WechatShare;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcd2VjaGF0XFxXZWNoYXRTaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNIO0lBT0kscUJBQVksSUFBSTtRQUFoQixpQkFpQkM7UUF0QkQsNEJBQTRCO1FBQ2xCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFFakIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUVqQixFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ2IsZUFBZSxFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNmLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDTixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDakIsY0FBYztZQUNkLE9BQU8sS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxZQUFZO0lBQ1osMkJBQUssR0FBTCxVQUFNLElBQUksRUFBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsdUVBQXVFO1FBRXZFLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO0lBQ0UsOEJBQVEsR0FBbEIsVUFBbUIsS0FBSztRQUNwQixJQUFJLElBQUksR0FBRztZQUNQLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUs7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUTtZQUNwQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPO1NBQ3hDLENBQUE7UUFFRCxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLE1BQU07UUFDMUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUlTLDhCQUFRLEdBQWxCO1FBRUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7WUFDcEMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO2dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFTCxrQkFBQztBQUFELENBOURBLEFBOERDLElBQUE7QUE5RFksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vbWluaWdhbWUvZGV2L2FwaS9zaGFyZS93eC5zaGFyZUFwcE1lc3NhZ2UuaHRtbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdlY2hhdFNoYXJlIHtcclxuXHJcbiAgICAvL+eUseS6juW+ruS/oeaXoOazleW+l+WIsOWIhuS6q+e7k+aenO+8jOaJgOS7peS7peaXtumXtOadpeWIpOaWreaYr+WQpuaIkOWKn+OAglxyXG4gICAgcHJvdGVjdGVkIHRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2s7XHJcbiAgICBwcm90ZWN0ZWQgX2xpc3QgPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IGxpc3RcclxuXHJcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd3gudXBkYXRlU2hhcmVNZW51KHtcclxuICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5vblNob3coKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tHYW1lKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHd4Lm9uU2hhcmVBcHBNZXNzYWdlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG4oCc6L2s5Y+R4oCd5oyJ6ZKuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXREYXRhKDApXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+Wbnuiwg+WHveaVsCzliIbkuqvnmoRpZFxyXG4gICAgc2hhcmUoZnVuYyxpbmRleCkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jO1xyXG4gICAgICAgIC8vIGluZGV4ID0gaW5kZXggPyBpbmRleCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLl9saXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHRoaXMuX2dldERhdGEoaW5kZXgpKVxyXG4gICAgICAgIHRoaXMudGltZSA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bliIbkuqvlj4LmlbBcclxuICAgIHByb3RlY3RlZCBfZ2V0RGF0YShpbmRleCk6IGFueSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLl9saXN0W2luZGV4XS5UaXRsZSxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IHRoaXMuX2xpc3RbaW5kZXhdLkltYWdlVXJsLFxyXG4gICAgICAgICAgICBpbWFnZVVybElkOiB0aGlzLl9saXN0W2luZGV4XS5JbWFnZUlkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGRhdGEgPSB3eC51bWFbJ3RyYWNrU2hhcmUnXShkYXRhKTsgIC8v5Y+L55uf57uf6K6hXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgYmFja0dhbWUoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXNUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMudGltZVxyXG4gICAgICAgICAgICBpZiAoZGlzVGltZSA+PSA0MDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=