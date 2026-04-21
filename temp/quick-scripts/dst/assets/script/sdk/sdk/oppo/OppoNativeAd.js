
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoNativeAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd473bHVlWxI+LFxetCJxJBF', 'OppoNativeAd');
// script/sdk/sdk/oppo/OppoNativeAd.ts

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
var OppoNativeAdItemModel_1 = require("./OppoNativeAdItemModel");
var SDKConfig_1 = require("../SDKConfig");
var BaseAd_1 = require("../base/BaseAd");
/**
 * https://open.oppomobile.com/wiki/doc#id=10539
 */
var OppoNativeAd = /** @class */ (function (_super) {
    __extends(OppoNativeAd, _super);
    function OppoNativeAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adItems = [];
        return _this;
    }
    OppoNativeAd.prototype.open = function (adUnitID, callback) {
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.callback = callback;
        this.create(adUnitID);
        this.load();
    };
    OppoNativeAd.prototype.close = function () {
        this.callback = null;
    };
    OppoNativeAd.prototype.onError = function (err) {
        this.setState(SDKConfig_1.SDKState.loadFail);
        console.log(' BaseNativeAd onError err ', err);
        if (this.callback) {
            this.callback([]);
        }
    };
    OppoNativeAd.prototype.onLoad = function (res) {
        this.setState(SDKConfig_1.SDKState.loadSucess);
        console.log('onLoad ', res.adList);
        this.adItems.length = 0;
        if (res.adList) {
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
    };
    OppoNativeAd.prototype.create = function (adUnitID) {
        if (!this.instanceMap[adUnitID]) {
            this.instance = qg.createNativeAd({
                adUnitId: adUnitID,
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
            this.instanceMap[adUnitID] = this.instance;
        }
        else {
            this.instance = this.instanceMap[adUnitID];
        }
    };
    OppoNativeAd.prototype.load = function () {
        this.instance.load();
    };
    OppoNativeAd.prototype.reportAdClick = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdClick ', adId);
        this.instance.reportAdClick({
            adId: adId
        });
    };
    OppoNativeAd.prototype.reportAdShow = function (adId) {
        if (!this.instance) {
            return;
        }
        console.log('reportAdShow ', adId);
        this.instance.reportAdShow({
            adId: adId
        });
    };
    OppoNativeAd.prototype.destroy = function () {
        this.instance.destroy();
    };
    return OppoNativeAd;
}(BaseAd_1.default));
exports.default = OppoNativeAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb05hdGl2ZUFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGlFQUE0RDtBQUM1RCwwQ0FBMEQ7QUFDMUQseUNBQW9DO0FBRXBDOztHQUVHO0FBQ0g7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUF1RkM7UUF0RmEsYUFBTyxHQUE0QixFQUFFLENBQUE7O0lBc0ZuRCxDQUFDO0lBckZHLDJCQUFJLEdBQUosVUFBSyxRQUFnQixFQUFFLFFBQTBCO1FBQzdDLHVDQUF1QztRQUN2QyxjQUFjO1FBQ2QsSUFBSTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBR0QsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFHRCw4QkFBTyxHQUFQLFVBQVEsR0FBRztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzlDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDcEI7SUFDTCxDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLEdBQUc7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDWixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3BELElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksK0JBQXFCLEVBQUUsQ0FBQTtnQkFDeEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDNUI7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDOUI7U0FDSjtJQUNMLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sUUFBUTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsUUFBUSxFQUFFLFFBQVE7YUFDckIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUM3QzthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzdDO0lBRUwsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFJRCxvQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE9BQU07U0FDVDtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDeEIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsbUNBQVksR0FBWixVQUFhLElBQUk7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixPQUFNO1NBQ1Q7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUN2QixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCw4QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXZGQSxBQXVGQyxDQXZGeUMsZ0JBQU0sR0F1Ri9DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgT3Bwb05hdGl2ZUFkSXRlbU1vZGVsIGZyb20gJy4vT3Bwb05hdGl2ZUFkSXRlbU1vZGVsJztcclxuaW1wb3J0IHsgU0RLU3RhdGUsIE5hdGl2ZUFkQ2FsbGJhY2sgfSBmcm9tICcuLi9TREtDb25maWcnO1xyXG5pbXBvcnQgQmFzZUFkIGZyb20gJy4uL2Jhc2UvQmFzZUFkJztcclxuaW1wb3J0IEJhc2VOYXRpdmVBZEl0ZW1Nb2RlbCBmcm9tICcuLi9iYXNlL0Jhc2VOYXRpdmVBZEl0ZW1Nb2RlbCc7XHJcbi8qKlxyXG4gKiBodHRwczovL29wZW4ub3Bwb21vYmlsZS5jb20vd2lraS9kb2MjaWQ9MTA1MzlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wcG9OYXRpdmVBZCBleHRlbmRzIEJhc2VBZCB7XHJcbiAgICBwcm90ZWN0ZWQgYWRJdGVtczogQmFzZU5hdGl2ZUFkSXRlbU1vZGVsW10gPSBbXVxyXG4gICAgb3BlbihhZFVuaXRJRDogc3RyaW5nLCBjYWxsYmFjazogTmF0aXZlQWRDYWxsYmFjaykge1xyXG4gICAgICAgIC8vIGlmICh0aGlzLnN0YXRlID09IEFkU3RhdGUubG9hZGluZykge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5sb2FkaW5nO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmNyZWF0ZShhZFVuaXRJRCk7XHJcbiAgICAgICAgdGhpcy5sb2FkKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xvc2UoKXtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRGYWlsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgQmFzZU5hdGl2ZUFkIG9uRXJyb3IgZXJyICcsIGVycilcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKFtdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQocmVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkU3VjZXNzKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQgJywgcmVzLmFkTGlzdClcclxuICAgICAgICB0aGlzLmFkSXRlbXMubGVuZ3RoID0gMDtcclxuICAgICAgICBpZiAocmVzLmFkTGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmVzLmFkTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXMuYWRMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGxldCBhZEl0ZW0gPSBuZXcgT3Bwb05hdGl2ZUFkSXRlbU1vZGVsKClcclxuICAgICAgICAgICAgICAgIGFkSXRlbS5pbml0V2l0aE9wcG8oZWxlbWVudClcclxuICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0QWRTaG93KGFkSXRlbS5nZXRJRCgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZEl0ZW1zLnB1c2goYWRJdGVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMuYWRJdGVtcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoYWRVbml0SUQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VNYXBbYWRVbml0SURdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogYWRVbml0SUQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uTG9hZCh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VNYXBbYWRVbml0SURdID0gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlTWFwW2FkVW5pdElEXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmxvYWQoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHJlcG9ydEFkQ2xpY2soYWRJZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcG9ydEFkQ2xpY2sgJywgYWRJZClcclxuICAgICAgICB0aGlzLmluc3RhbmNlLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICBhZElkOiBhZElkXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXBvcnRBZFNob3coYWRJZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcG9ydEFkU2hvdyAnLCBhZElkKVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UucmVwb3J0QWRTaG93KHtcclxuICAgICAgICAgICAgYWRJZDogYWRJZFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgIH1cclxufSJdfQ==