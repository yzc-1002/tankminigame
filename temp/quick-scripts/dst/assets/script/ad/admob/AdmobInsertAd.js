
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/admob/AdmobInsertAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab153+ktDhDRqJZBJwesRvx', 'AdmobInsertAd');
// script/ad/admob/AdmobInsertAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmobInsertAd = void 0;
var AdmobInsertAd = /** @class */ (function () {
    function AdmobInsertAd() {
        this._loaded = false;
        var self = this;
        var AdmobInsert = {
            loaded: function () {
                console.log("AdManager js loaded");
                self._loaded = true;
            }
        };
        window["AdmobInsertJs"] = AdmobInsert;
    }
    //销毁广告
    AdmobInsertAd.prototype._destroy = function () {
    };
    AdmobInsertAd.prototype._isLoad = function () {
        return this._loaded;
    };
    //展示广告(加载成功后直接显示)
    AdmobInsertAd.prototype._show = function () {
        this._loaded = false;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "InterstitialAdPlay", "()V");
    };
    return AdmobInsertAd;
}());
exports.AdmobInsertAd = AdmobInsertAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYWRtb2JcXEFkbW9iSW5zZXJ0QWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFHSTtRQUZBLFlBQU8sR0FBMkIsS0FBSyxDQUFDO1FBR3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLFdBQVcsR0FBRztZQUNkLE1BQU0sRUFBRztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUM7U0FDSixDQUFBO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFDLFdBQVcsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTTtJQUNOLGdDQUFRLEdBQVI7SUFFQSxDQUFDO0lBR0QsK0JBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLDZCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLG1DQUFtQyxFQUFFLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFFTCxvQkFBQztBQUFELENBOUJBLEFBOEJDLElBQUE7QUE5Qlksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQWRtb2JJbnNlcnRBZCB7XHJcbiAgICBfbG9hZGVkOmJvb2xlYW4gICAgICAgICAgICAgICAgID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBBZG1vYkluc2VydCA9IHtcclxuICAgICAgICAgICAgbG9hZGVkIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRNYW5hZ2VyIGpzIGxvYWRlZFwiKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93W1wiQWRtb2JJbnNlcnRKc1wiXT1BZG1vYkluc2VydDtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeW5v+WRilxyXG4gICAgX2Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9pc0xvYWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S65bm/5ZGKKOWKoOi9veaIkOWKn+WQjuebtOaOpeaYvuekuilcclxuICAgIF9zaG93KCkge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BZE1hbmFnZXJcIiwgXCJJbnRlcnN0aXRpYWxBZFBsYXlcIiwgXCIoKVZcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==