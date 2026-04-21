
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/admob/AdmobShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYWRtb2JcXEFkbW9iU2hhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFPSSxvQkFBWSxJQUFJO1FBTGhCLDRCQUE0QjtRQUNsQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRWpCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFMUQsUUFBUTtRQUNSLElBQUksWUFBWSxHQUFHO1lBQ2YsTUFBTSxFQUFHLFVBQVMsR0FBRztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3RCO1lBQ0wsQ0FBQztTQUNKLENBQUE7UUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUVELFlBQVk7SUFDWiwwQkFBSyxHQUFMLFVBQU0sSUFBSSxFQUFDLEtBQUssRUFBQyxHQUFHO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzFCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLEVBQUUseUNBQXlDLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pJLENBQUM7SUFHTCxpQkFBQztBQUFELENBekNBLEFBeUNDLElBQUE7QUF6Q1ksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIEFkbW9iU2hhcmUge1xyXG5cclxuICAgIC8v55Sx5LqO5b6u5L+h5peg5rOV5b6X5Yiw5YiG5Lqr57uT5p6c77yM5omA5Lul5Lul5pe26Ze05p2l5Yik5pat5piv5ZCm5oiQ5Yqf44CCXHJcbiAgICBwcm90ZWN0ZWQgdGltZTogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBjYWxsYmFjaztcclxuICAgIHByb3RlY3RlZCBfbGlzdCA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcclxuICAgICAgICB0aGlzLl9saXN0ID0gbGlzdDtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBbmRyb2lkU2hhcmUgJyArIEpTT04uc3RyaW5naWZ5KHRoaXMuX2xpc3QpKTtcclxuXHJcbiAgICAgICAgLy/ms6jlhozlm57osIPlh73mlbBcclxuICAgICAgICBsZXQgQW5kcm9pZFNoYXJlID0ge1xyXG4gICAgICAgICAgICBzaGFyZWQgOiBmdW5jdGlvbihyZXQpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbmRyb2lkU2hhcmUganMxIFwiLHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQW5kcm9pZFNoYXJlIGpzMiBcIixyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2socmV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3dbXCJBbmRyb2lkU2hhcmVKc1wiXT1BbmRyb2lkU2hhcmU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lm57osIPlh73mlbAs5YiG5Lqr55qEaWRcclxuICAgIHNoYXJlKGZ1bmMsaW5kZXgsYXJnKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuX2xpc3RbaW5kZXhdO1xyXG4gICAgICAgIGxldCBtc2cgPSBjb25maWcuVGl0bGU7XHJcbiAgICAgICAgbGV0IHVybCA9IGNvbmZpZy5JbWFnZVVybDtcclxuICAgICAgICBpZiAoY29uZmlnLlVzZUFyZyA9PSAxKSB7XHJcbiAgICAgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKFwiezB9XCIsYXJnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImRvU2hhcmVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIixtc2csdXJsKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==