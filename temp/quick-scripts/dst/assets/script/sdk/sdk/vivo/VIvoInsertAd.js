
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/vivo/VIvoInsertAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01e79N9N55Np5E06BvpOlBi', 'VIvoInsertAd');
// script/sdk/sdk/vivo/VIvoInsertAd.ts

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
var SDKConfig_1 = require("../SDKConfig");
var BaseAd_1 = require("../base/BaseAd");
/**
 * https://minigame.vivo.com.cn/documents/#/api/da/interstitial-da
 * 插屏广告实例不能复用，每次需要重新加载时要重新create
 */
var VivoInsertAd = /** @class */ (function (_super) {
    __extends(VivoInsertAd, _super);
    function VivoInsertAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VivoInsertAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    VivoInsertAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    VivoInsertAd.prototype.create = function (id) {
        var _this = this;
        this.adUnitID = id;
        console.log(' show insert ad ');
        // if (!this.instance) {
        this.instance = qg.createInsertAd({
            posId: id
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onError(function (err) {
            console.log("插屏广告加载失败", err);
        });
        this.instance.show().then(function () {
            console.log('插屏广告展示完成');
            _this.state = SDKConfig_1.SDKState.open;
        }).catch(function (err) {
            _this.state = SDKConfig_1.SDKState.close;
            console.log('插屏广告展示失败', JSON.stringify(err));
        });
        // }
    };
    VivoInsertAd.prototype.open = function (ad, func) {
        console.log('BaseInterstitialAd showAd this.state ', this.state);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.create(ad);
        // this.load()
    };
    VivoInsertAd.prototype.load = function () {
        console.log(' load ad ');
        this.instance.load();
    };
    VivoInsertAd.prototype.show = function () {
        console.log(' show ad ');
        this.instance.show();
    };
    return VivoInsertAd;
}(BaseAd_1.default));
exports.default = VivoInsertAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdml2b1xcVkl2b0luc2VydEFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUF3RDtBQUN4RCx5Q0FBb0M7QUFDcEM7OztHQUdHO0FBQ0g7SUFBMEMsZ0NBQU07SUFBaEQ7O0lBdURBLENBQUM7SUF0RGEsNkJBQU0sR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRVMsOEJBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVTLDZCQUFNLEdBQWhCLFVBQWlCLEVBQVU7UUFBM0IsaUJBcUJDO1FBcEJHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMvQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzlCLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEIsS0FBSSxDQUFDLEtBQUssR0FBRyxvQkFBUSxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1QsS0FBSSxDQUFDLEtBQUssR0FBRyxvQkFBUSxDQUFDLEtBQUssQ0FBQztZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJO0lBQ1IsQ0FBQztJQUVELDJCQUFJLEdBQUosVUFBSyxFQUFVLEVBQUUsSUFBb0I7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEUsdUNBQXVDO1FBQ3ZDLGNBQWM7UUFDZCxJQUFJO1FBRUosSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBUSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2YsY0FBYztJQUNsQixDQUFDO0lBRVMsMkJBQUksR0FBZDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMsMkJBQUksR0FBZDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXZEQSxBQXVEQyxDQXZEeUMsZ0JBQU0sR0F1RC9DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFJlc3VsdENhbGxiYWNrLCBTREtTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuaW1wb3J0IEJhc2VBZCBmcm9tIFwiLi4vYmFzZS9CYXNlQWRcIjtcclxuLyoqXHJcbiAqIGh0dHBzOi8vbWluaWdhbWUudml2by5jb20uY24vZG9jdW1lbnRzLyMvYXBpL2RhL2ludGVyc3RpdGlhbC1kYVxyXG4gKiDmj5LlsY/lub/lkYrlrp7kvovkuI3og73lpI3nlKjvvIzmr4/mrKHpnIDopoHph43mlrDliqDovb3ml7bopoHph43mlrBjcmVhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpdm9JbnNlcnRBZCBleHRlbmRzIEJhc2VBZCB7XHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcg5o+S5bGP5bm/5ZGK5Yqg6L295oiQ5YqfJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRTdWNlc3MpXHJcbiAgICAgICAgdGhpcy5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIOaPkuWxj+W5v+WRiuWKoOi9veWksei0pSAnLCBlcnIpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmFkVW5pdElEID0gaWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBzaG93IGluc2VydCBhZCAnKVxyXG4gICAgICAgIC8vIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBxZy5jcmVhdGVJbnNlcnRBZCh7XHJcbiAgICAgICAgICAgIHBvc0lkOiBpZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uub25Mb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuWKoOi9veWksei0pVwiLCBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiuWxleekuuWujOaIkCcpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU0RLU3RhdGUub3BlbjtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5jbG9zZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiuWxleekuuWksei0pScsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvcGVuKGFkOiBzdHJpbmcsIGZ1bmM6IFJlc3VsdENhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Jhc2VJbnRlcnN0aXRpYWxBZCBzaG93QWQgdGhpcy5zdGF0ZSAnLCB0aGlzLnN0YXRlKVxyXG4gICAgICAgIC8vIGlmICh0aGlzLnN0YXRlID09IEFkU3RhdGUubG9hZGluZykge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0gU0RLU3RhdGUubG9hZGluZztcclxuICAgICAgICB0aGlzLmNyZWF0ZShhZClcclxuICAgICAgICAvLyB0aGlzLmxvYWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgbG9hZCBhZCAnKVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgc2hvdyBhZCAnKVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpXHJcbiAgICB9XHJcbn0iXX0=