
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/vivo/VivoNativeAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a91ca7oPCxA3YUKQd9qWrWd', 'VivoNativeAd');
// script/sdk/sdk/vivo/VivoNativeAd.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var OppoNativeAdItemModel_1 = require("../oppo/OppoNativeAdItemModel");
var BaseAd_1 = require("../base/BaseAd");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://minigame.vivo.com.cn/documents/#/api/da/native-ad
 */
var VivoNativeAd = /** @class */ (function (_super) {
    __extends(VivoNativeAd, _super);
    function VivoNativeAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adItems = [];
        return _this;
    }
    VivoNativeAd.prototype.open = function (adUnitID, callback) {
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.callback = callback;
        this.create(adUnitID);
        this.load();
    };
    VivoNativeAd.prototype.create = function (adUnitID) {
        this.adUnitID = adUnitID;
        this.destroy();
        // if (!this.instanceMap.has(adUnitID)) {
        console.log('VivoNativeAd create adUnitID ', adUnitID);
        this.instance = qg.createNativeAd({
            posId: adUnitID,
        });
        console.log(' VivoNativeAd  this.instance  ', this.instance);
        if (this.instance) {
            this.instance.onLoad(this.onLoad.bind(this));
        }
    };
    VivoNativeAd.prototype.close = function () {
        this.callback = null;
    };
    VivoNativeAd.prototype.onLoad = function (res) {
        // console.log('onLoad ', res.adList)
        this.adItems.length = 0;
        if (res && res.adList) {
            this.setState(SDKConfig_1.SDKState.loadSucess);
            for (var index = 0; index < res.adList.length; index++) {
                var element = res.adList[index];
                var adItem = new OppoNativeAdItemModel_1.default();
                adItem.initWithOppo(element);
                this.reportAdShow(adItem.getID());
                this.adItems.push(adItem);
            }
            if (this.callback) {
                this.callback(this.adItems);
            }
        }
        else {
            this.onError(null);
        }
    };
    VivoNativeAd.prototype.onError = function (err) {
        this.setState(SDKConfig_1.SDKState.loadFail);
        console.log(' BaseNativeAd onError err ', err);
        if (this.callback) {
            this.callback([]);
        }
    };
    VivoNativeAd.prototype.load = function () {
        if (this.instance)
            this.instance.load();
    };
    VivoNativeAd.prototype.reportAdClick = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdClick ', adId);
        this.instance.reportAdClick({
            adId: adId
        });
    };
    VivoNativeAd.prototype.reportAdShow = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdShow ', adId);
        this.instance.reportAdShow({
            adId: adId
        });
    };
    VivoNativeAd.prototype.destroy = function () {
        if (this.instance) {
            if (this.instance.offLoad) {
                this.instance.offLoad(this.onLoad.bind(this));
            }
            if (this.instance.offError) {
                this.instance.offError(this.onError.bind(this));
            }
            if (this.instance.destroy) {
                this.instance.destroy();
            }
            this.instance = null;
        }
    };
    return VivoNativeAd;
}(BaseAd_1.default));
exports.default = VivoNativeAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdml2b1xcVml2b05hdGl2ZUFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVFQUFrRTtBQUNsRSx5Q0FBb0M7QUFDcEMsMENBQTBEO0FBRzFEOztHQUVHO0FBQ0g7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUFxR0M7UUFwR2EsYUFBTyxHQUE0QixFQUFFLENBQUE7O0lBb0duRCxDQUFDO0lBbkdHLDJCQUFJLEdBQUosVUFBSyxRQUFnQixFQUFFLFFBQTBCO1FBQzdDLHVDQUF1QztRQUN2QyxjQUFjO1FBQ2QsSUFBSTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLFFBQVE7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZCx5Q0FBeUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDOUIsS0FBSyxFQUFFLFFBQVE7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENB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YUFDbkQ7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzNCO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFFTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXJHQSxBQXFHQyxDQXJHeUMsZ0JBQU0sR0FxRy9DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBPcHBvTmF0aXZlQWRJdGVtTW9kZWwgZnJvbSBcIi4uL29wcG8vT3Bwb05hdGl2ZUFkSXRlbU1vZGVsXCI7XHJcbmltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES1N0YXRlLCBOYXRpdmVBZENhbGxiYWNrIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5pbXBvcnQgQmFzZU5hdGl2ZUFkSXRlbU1vZGVsIGZyb20gXCIuLi9iYXNlL0Jhc2VOYXRpdmVBZEl0ZW1Nb2RlbFwiO1xyXG5cclxuLyoqXHJcbiAqIGh0dHBzOi8vbWluaWdhbWUudml2by5jb20uY24vZG9jdW1lbnRzLyMvYXBpL2RhL25hdGl2ZS1hZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVml2b05hdGl2ZUFkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIHByb3RlY3RlZCBhZEl0ZW1zOiBCYXNlTmF0aXZlQWRJdGVtTW9kZWxbXSA9IFtdXHJcbiAgICBvcGVuKGFkVW5pdElEOiBzdHJpbmcsIGNhbGxiYWNrOiBOYXRpdmVBZENhbGxiYWNrKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUgPT0gQWRTdGF0ZS5sb2FkaW5nKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNES1N0YXRlLmxvYWRpbmc7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKGFkVW5pdElEKTtcclxuICAgICAgICB0aGlzLmxvYWQoKVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShhZFVuaXRJRCkge1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBhZFVuaXRJRFxyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpXHJcbiAgICAgICAgLy8gaWYgKCF0aGlzLmluc3RhbmNlTWFwLmhhcyhhZFVuaXRJRCkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnVml2b05hdGl2ZUFkIGNyZWF0ZSBhZFVuaXRJRCAnLCBhZFVuaXRJRClcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICBwb3NJZDogYWRVbml0SUQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBWaXZvTmF0aXZlQWQgIHRoaXMuaW5zdGFuY2UgICcsIHRoaXMuaW5zdGFuY2UpXHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xvc2UoKXtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcclxuICAgIH1cclxuICAgIG9uTG9hZChyZXMpIHtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTG9hZCAnLCByZXMuYWRMaXN0KVxyXG4gICAgICAgIHRoaXMuYWRJdGVtcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRTdWNlc3MpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZXMuYWRMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlcy5hZExpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkSXRlbSA9IG5ldyBPcHBvTmF0aXZlQWRJdGVtTW9kZWwoKVxyXG4gICAgICAgICAgICAgICAgYWRJdGVtLmluaXRXaXRoT3BwbyhlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRBZFNob3coYWRJdGVtLmdldElEKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkSXRlbXMucHVzaChhZEl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5hZEl0ZW1zKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yKG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgICAgICBjb25zb2xlLmxvZygnIEJhc2VOYXRpdmVBZCBvbkVycm9yIGVyciAnLCBlcnIpXHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhbXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5sb2FkKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICByZXBvcnRBZENsaWNrKGFkSWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXBvcnRBZENsaWNrICcsIGFkSWQpXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5yZXBvcnRBZENsaWNrKHtcclxuICAgICAgICAgICAgYWRJZDogYWRJZFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVwb3J0QWRTaG93KGFkSWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXBvcnRBZFNob3cgJywgYWRJZClcclxuICAgICAgICB0aGlzLmluc3RhbmNlLnJlcG9ydEFkU2hvdyh7XHJcbiAgICAgICAgICAgIGFkSWQ6IGFkSWRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2Uub2ZmTG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZMb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlLm9mZkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9mZkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5kZXN0cm95KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==