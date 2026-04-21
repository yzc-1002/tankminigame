
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/InsertAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b229P1IDtDt6FoKw25umUv', 'InsertAd');
// script/ad/InsertAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertAd = void 0;
var WechatInsertAd_1 = require("./wechat/WechatInsertAd");
var TTInsertAd_1 = require("./bytedance/TTInsertAd");
var AdmobInsertAd_1 = require("./admob/AdmobInsertAd");
var InsertAd = /** @class */ (function () {
    function InsertAd() {
        this._insert = null; //插屏广告实例
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (yyp.config.AD.insert['Use'] == 1) {
                var adid = yyp.config.AD.insert['WxAdid'];
                this._insert = new WechatInsertAd_1.WechatInsertAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            if (yyp.config.AD.insert['Use'] == 1) {
                var adid = yyp.config.AD.insert['TTAdid'];
                this._insert = new TTInsertAd_1.TTInsertAd(adid);
            }
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this._insert = new AdmobInsertAd_1.AdmobInsertAd();
        }
    }
    InsertAd.getInstance = function () {
        if (InsertAd._sInstance == null) {
            InsertAd._sInstance = new InsertAd();
        }
        return InsertAd._sInstance;
    };
    /**
     * 广告是否已经加载成功
     */
    InsertAd.prototype.isLoad = function () {
        if (this._insert) {
            return this._insert._isLoad();
        }
        return false;
    };
    /**
     * 展示广告
     */
    InsertAd.prototype.show = function () {
        if (this._insert) {
            this._insert._show();
        }
    };
    InsertAd._sInstance = null; //静态实例
    return InsertAd;
}());
exports.InsertAd = InsertAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcSW5zZXJ0QWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQXVEO0FBQ3ZELHFEQUFrRDtBQUNsRCx1REFBb0Q7QUFFcEQ7SUFLSTtRQUZBLFlBQU8sR0FBZSxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBSWhDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUM7WUFDdkMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7YUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDO1lBQy9DLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QztTQUNKO2FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1NBQ3RDO0lBRUwsQ0FBQztJQUVNLG9CQUFXLEdBQWxCO1FBQ0ksSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUM3QixRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7U0FDeEM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUJBQU0sR0FBTjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUFJLEdBQUo7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ3ZCO0lBQ0wsQ0FBQztJQS9DTSxtQkFBVSxHQUFLLElBQUksQ0FBQyxDQUFDLE1BQU07SUFpRHRDLGVBQUM7Q0FuREQsQUFtREMsSUFBQTtBQW5EWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7V2VjaGF0SW5zZXJ0QWR9IGZyb20gXCIuL3dlY2hhdC9XZWNoYXRJbnNlcnRBZFwiO1xyXG5pbXBvcnQge1RUSW5zZXJ0QWR9IGZyb20gXCIuL2J5dGVkYW5jZS9UVEluc2VydEFkXCI7XHJcbmltcG9ydCB7QWRtb2JJbnNlcnRBZH0gZnJvbSBcIi4vYWRtb2IvQWRtb2JJbnNlcnRBZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluc2VydEFkICB7XHJcblxyXG4gICAgc3RhdGljIF9zSW5zdGFuY2UgICA9IG51bGw7IC8v6Z2Z5oCB5a6e5L6LXHJcbiAgICBfaW5zZXJ0ICAgICAgICAgICAgID0gbnVsbDsgLy/mj5LlsY/lub/lkYrlrp7kvotcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICBpZiAoeXlwLmNvbmZpZy5BRC5pbnNlcnRbJ1VzZSddID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGlkID0geXlwLmNvbmZpZy5BRC5pbnNlcnRbJ1d4QWRpZCddXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnQgPSBuZXcgV2VjaGF0SW5zZXJ0QWQoYWRpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpe1xyXG4gICAgICAgICAgICBpZiAoeXlwLmNvbmZpZy5BRC5pbnNlcnRbJ1VzZSddID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGlkID0geXlwLmNvbmZpZy5BRC5pbnNlcnRbJ1RUQWRpZCddXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnQgPSBuZXcgVFRJbnNlcnRBZChhZGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEKXtcclxuICAgICAgICAgICAgdGhpcy5faW5zZXJ0ID0gbmV3IEFkbW9iSW5zZXJ0QWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkluc2VydEFke1xyXG4gICAgICAgIGlmIChJbnNlcnRBZC5fc0luc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgSW5zZXJ0QWQuX3NJbnN0YW5jZSA9IG5ldyBJbnNlcnRBZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSW5zZXJ0QWQuX3NJbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDlub/lkYrmmK/lkKblt7Lnu4/liqDovb3miJDlip9cclxuICAgICAqL1xyXG4gICAgaXNMb2FkKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc2VydCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnNlcnQuX2lzTG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5bGV56S65bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc2VydCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc2VydC5fc2hvdygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=