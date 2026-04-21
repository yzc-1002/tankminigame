
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/vivo/VivoBannerAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5446ellTGFAC45GcFa4DRaK', 'VivoBannerAd');
// script/sdk/sdk/vivo/VivoBannerAd.ts

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
var BaseAd_1 = require("../base/BaseAd");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://minigame.vivo.com.cn/documents/#/api/da/banner-da
 * banner广告实例不能复用，每次需要重新加载时要重新create
1、如果先调用createBannerAd()后 不能立马调用hide()方法，要等Ad创建成功后，在某个需要的场景下调hide()

2、如果有场景需要再次展示广告，如果广告被关闭了或者调了close()，必须重新创建才能展示出来，此时show()无效

3、广告调试时，会有可能因为填充率不足而展示不出来，具体请查看教程中的错误码信息

4、Banner广告创建间隔不得少于10s
 */
var VivoBannerAd = /** @class */ (function (_super) {
    __extends(VivoBannerAd, _super);
    function VivoBannerAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VivoBannerAd.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
        // this.reLoad()
    };
    VivoBannerAd.prototype.onLoad = function () {
        console.log('banner onLoad this.logicState ', this.logicState);
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            // this.show()
        }
        else {
            this.hide();
        }
    };
    VivoBannerAd.prototype.open = function (adID) {
        //逻辑要求开
        this.logicState = SDKConfig_1.SDKState.open;
        //如果banner已经已经显示 则返回。
        if (this.state == SDKConfig_1.SDKState.loading) {
            console.log('showBanner 正在加载中');
            return;
        }
        this.state = SDKConfig_1.SDKState.loading;
        // if (this.adUnitID != adID) {
        this.destroy();
        this.create(adID);
    };
    VivoBannerAd.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        if (this.state == SDKConfig_1.SDKState.loading) {
            console.log('hideBanner 正在加载中');
            //如果先调用createBannerAd()后 不能立马调用hide()方法，要等Ad创建成功后，在某个需要的场景下调hide()
            return;
        }
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    VivoBannerAd.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    VivoBannerAd.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
        console.log(' banner show ');
    };
    VivoBannerAd.prototype.hide = function () {
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    VivoBannerAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offSize(this.onResize.bind(this));
            this.instance.destroy();
            this.instance = null;
        }
    };
    VivoBannerAd.prototype.create = function (adID) {
        var _this = this;
        this.adUnitID = adID;
        var winSize = qg.getSystemInfoSync();
        this.instance = qg.createBannerAd({
            posId: adID,
            style: {}
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onSize(this.onResize.bind(this));
        this.instance.show().then(function () {
            console.log('banner广告展示完成');
            _this.setState(SDKConfig_1.SDKState.open);
        }).catch(function (err) {
            _this.setState(SDKConfig_1.SDKState.close);
            console.log('banner广告展示失败', JSON.stringify(err));
        });
    };
    return VivoBannerAd;
}(BaseAd_1.default));
exports.default = VivoBannerAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdml2b1xcVml2b0Jhbm5lckFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywwQ0FBd0M7QUFHeEM7Ozs7Ozs7Ozs7R0FVRztBQUNIO0lBQTBDLGdDQUFNO0lBQWhEOztJQThGQSxDQUFDO0lBNUZHLDhCQUFPLEdBQVAsVUFBUSxHQUFHO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEMsZ0JBQWdCO0lBQ3BCLENBQUM7SUFFRCw2QkFBTSxHQUFOO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxvQkFBUSxDQUFDLElBQUksRUFBRTtZQUNsQyxjQUFjO1NBQ2pCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDZDtJQUNMLENBQUM7SUFDRCwyQkFBSSxHQUFKLFVBQUssSUFBSTtRQUNMLE9BQU87UUFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFRLENBQUMsSUFBSSxDQUFDO1FBRWhDLHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksb0JBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1lBQy9CLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxPQUFPLENBQUM7UUFDOUIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxPQUFPLEVB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VUFBQyxHQUFHO1lBQ1QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxtQkFBQztBQUFELENBOUZBLEFBOEZDLENBOUZ5QyxnQkFBTSxHQThGL0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUFkIGZyb20gXCIuLi9iYXNlL0Jhc2VBZFwiO1xyXG5pbXBvcnQgeyBTREtTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuXHJcblxyXG4vKipcclxuICogaHR0cHM6Ly9taW5pZ2FtZS52aXZvLmNvbS5jbi9kb2N1bWVudHMvIy9hcGkvZGEvYmFubmVyLWRhXHJcbiAqIGJhbm5lcuW5v+WRiuWunuS+i+S4jeiDveWkjeeUqO+8jOavj+asoemcgOimgemHjeaWsOWKoOi9veaXtuimgemHjeaWsGNyZWF0ZVxyXG4x44CB5aaC5p6c5YWI6LCD55SoY3JlYXRlQmFubmVyQWQoKeWQjiDkuI3og73nq4vpqazosIPnlKhoaWRlKCnmlrnms5XvvIzopoHnrYlBZOWIm+W7uuaIkOWKn+WQju+8jOWcqOafkOS4qumcgOimgeeahOWcuuaZr+S4i+iwg2hpZGUoKVxyXG5cclxuMuOAgeWmguaenOacieWcuuaZr+mcgOimgeWGjeasoeWxleekuuW5v+WRiu+8jOWmguaenOW5v+WRiuiiq+WFs+mXreS6huaIluiAheiwg+S6hmNsb3NlKCnvvIzlv4Xpobvph43mlrDliJvlu7rmiY3og73lsZXnpLrlh7rmnaXvvIzmraTml7ZzaG93KCnml6DmlYhcclxuXHJcbjPjgIHlub/lkYrosIPor5Xml7bvvIzkvJrmnInlj6/og73lm6DkuLrloavlhYXnjofkuI3otrPogIzlsZXnpLrkuI3lh7rmnaXvvIzlhbfkvZPor7fmn6XnnIvmlZnnqIvkuK3nmoTplJnor6/noIHkv6Hmga9cclxuXHJcbjTjgIFCYW5uZXLlub/lkYrliJvlu7rpl7TpmpTkuI3lvpflsJHkuo4xMHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpdm9CYW5uZXJBZCBleHRlbmRzIEJhc2VBZCB7XHJcblxyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYmFubmVyIG9uRXJyb3InLCBlcnIpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuICAgICAgICAvLyB0aGlzLnJlTG9hZCgpXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdiYW5uZXIgb25Mb2FkIHRoaXMubG9naWNTdGF0ZSAnLCB0aGlzLmxvZ2ljU3RhdGUpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkU3VjZXNzKVxyXG4gICAgICAgIGlmICh0aGlzLmxvZ2ljU3RhdGUgPT0gU0RLU3RhdGUub3Blbikge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3coKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb3BlbihhZElEKSB7XHJcbiAgICAgICAgLy/pgLvovpHopoHmsYLlvIBcclxuICAgICAgICB0aGlzLmxvZ2ljU3RhdGUgPSBTREtTdGF0ZS5vcGVuO1xyXG5cclxuICAgICAgICAvL+WmguaenGJhbm5lcuW3sue7j+W3sue7j+aYvuekuiDliJnov5Tlm57jgIJcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTREtTdGF0ZS5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93QmFubmVyIOato+WcqOWKoOi9veS4rScpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNES1N0YXRlLmxvYWRpbmc7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYWRVbml0SUQgIT0gYWRJRCkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKGFkSUQpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2ljU3RhdGUgPSBTREtTdGF0ZS5jbG9zZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU0RLU3RhdGUubG9hZGluZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGlkZUJhbm5lciDmraPlnKjliqDovb3kuK0nKVxyXG4gICAgICAgICAgICAvL+WmguaenOWFiOiwg+eUqGNyZWF0ZUJhbm5lckFkKCnlkI4g5LiN6IO956uL6ams6LCD55SoaGlkZSgp5pa55rOV77yM6KaB562JQWTliJvlu7rmiJDlip/lkI7vvIzlnKjmn5DkuKrpnIDopoHnmoTlnLrmma/kuIvosINoaWRlKClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvblJlc2l6ZShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jhbm5lciBvblJlc2l6ZScsIGRhdGEpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBzaG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5vcGVuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgYmFubmVyIHNob3cgJylcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU0RLU3RhdGUuY2xvc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmTG9hZCh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9mZkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9mZlNpemUodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlKGFkSUQpIHtcclxuICAgICAgICB0aGlzLmFkVW5pdElEID0gYWRJRDtcclxuICAgICAgICBsZXQgd2luU2l6ZSA9IHFnLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHFnLmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgcG9zSWQ6IGFkSUQsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7fVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLmluc3RhbmNlLm9uRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5vblNpemUodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYmFubmVy5bm/5ZGK5bGV56S65a6M5oiQJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUub3BlbilcclxuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUuY2xvc2UpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiYW5uZXLlub/lkYrlsZXnpLrlpLHotKUnLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19