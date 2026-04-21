
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/bytedance/TTShareEx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba9e4D8MXtDqrZhhjfccJIh', 'TTShareEx');
// script/ad/bytedance/TTShareEx.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTShareEx = void 0;
var TTShareEx = /** @class */ (function () {
    function TTShareEx(list) {
        this._list = [];
        this._list = list;
        tt.showShareMenu({
            withShareTicket: true,
        });
        tt.updateShareMenu({
            withShareTicket: true
        });
        var self = this;
        tt.onShareAppMessage(function (res) {
            console.log(res.channel);
            return {
                desc: self._list[0].Title,
                imageUrl: self._list[0].ImageUrl,
                title: '分享有礼',
                imageUrlId: '',
                success: function () {
                    console.log('onShareAppMessage 分享成功');
                },
                fail: function (e) {
                    console.log('分享失败', e);
                }
            };
        });
    }
    TTShareEx.prototype.share = function (func, index) {
        console.log('TTShareEx showa ', index);
        // index = index ? index : Math.floor(Math.random()*this._list.length);
        console.log('TTShareEx showb ', index);
        tt.shareAppMessage({
            desc: this._list[index].Title,
            imageUrl: this._list[index].ImageUrl,
            title: '分享有礼',
            imageUrlId: '',
            success: function (ret) {
                console.log('TTShareEx 分享成功 ', JSON.stringify(ret));
                if (func) {
                    func(true); //字节开发者工具返回结果不准确,要是用真机调试
                }
            },
            fail: function (e) {
                console.log('TTShareEx 分享失败 ', JSON.stringify(e));
                if (func) {
                    func(false);
                }
            }
        });
    };
    return TTShareEx;
}());
exports.TTShareEx = TTShareEx;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYnl0ZWRhbmNlXFxUVFNoYXJlRXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFJSSxtQkFBWSxJQUFJO1FBRk4sVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUVqQixFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ2IsZUFBZSxFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNmLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQTtRQUVGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixFQUFFLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXpCLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtnQkFDaEMsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsVUFBQyxDQUFDO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2FBQ0osQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELHlCQUFLLEdBQUwsVUFBTSxJQUFJLEVBQUMsS0FBSztRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsdUVBQXVFO1FBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdkMsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUs7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUTtZQUNwQyxLQUFLLEVBQUUsTUFBTTtZQUNiLFVBQVUsRUFBRSxFQUFFO1lBQ2QsT0FBTyxFQUFFLFVBQUMsR0FBRztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxJQUFJLEVBQUU7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUssd0JBQXdCO2lCQUMzQztZQUNMLENBQUM7WUFDRCxJQUFJLEVBQUUsVUFBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7WUFDTCxDQUFDO1NBRUosQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0E3REEsQUE2REMsSUFBQTtBQTdEWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUVFNoYXJlRXgge1xyXG5cclxuICAgIHByb3RlY3RlZCBfbGlzdCA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcclxuICAgICAgICB0aGlzLl9saXN0ID0gbGlzdFxyXG5cclxuICAgICAgICB0dC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHR0LnVwZGF0ZVNoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0dC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jaGFubmVsKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBzZWxmLl9saXN0WzBdLlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHNlbGYuX2xpc3RbMF0uSW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WIhuS6q+acieekvCcsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybElkOiAnJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25TaGFyZUFwcE1lc3NhZ2Ug5YiG5Lqr5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiG5Lqr5aSx6LSlJywgZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaGFyZShmdW5jLGluZGV4KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1RUU2hhcmVFeCBzaG93YSAnLCBpbmRleCk7XHJcbiAgICAgICAgLy8gaW5kZXggPSBpbmRleCA/IGluZGV4IDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuX2xpc3QubGVuZ3RoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnVFRTaGFyZUV4IHNob3diICcsIGluZGV4KTtcclxuXHJcbiAgICAgICAgdHQuc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgZGVzYzogdGhpcy5fbGlzdFtpbmRleF0uVGl0bGUsXHJcbiAgICAgICAgICAgIGltYWdlVXJsOiB0aGlzLl9saXN0W2luZGV4XS5JbWFnZVVybCxcclxuICAgICAgICAgICAgdGl0bGU6ICfliIbkuqvmnInnpLwnLFxyXG4gICAgICAgICAgICBpbWFnZVVybElkOiAnJyxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RUU2hhcmVFeCDliIbkuqvmiJDlip8gJyxKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChmdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYyh0cnVlKTsgICAgIC8v5a2X6IqC5byA5Y+R6ICF5bel5YW36L+U5Zue57uT5p6c5LiN5YeG56GuLOimgeaYr+eUqOecn+acuuiwg+ivlVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RUU2hhcmVFeCDliIbkuqvlpLHotKUgJyxKU09OLnN0cmluZ2lmeShlKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnVuYykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==