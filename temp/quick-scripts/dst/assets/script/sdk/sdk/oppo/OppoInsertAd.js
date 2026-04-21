
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoInsertAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78be0K6ic9ODZHaOhUMUylU', 'OppoInsertAd');
// script/sdk/sdk/oppo/OppoInsertAd.ts

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
 * https://open.oppomobile.com/wiki/doc#id=10538
 */
var OppoInsertAd = /** @class */ (function (_super) {
    __extends(OppoInsertAd, _super);
    function OppoInsertAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OppoInsertAd.prototype.open = function (adId) {
        console.log('BaseInterstitialAd showAd this.state ', this.state);
        // if (this.state == AdState.loading) {
        //     return;
        // }
        this.state = SDKConfig_1.SDKState.loading;
        this.create(adId);
        this.load();
    };
    OppoInsertAd.prototype.onLoad = function () {
        console.log(' 插屏广告加载成功');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        this.show();
    };
    OppoInsertAd.prototype.onError = function (err) {
        console.log(' 插屏广告加载失败 ', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    OppoInsertAd.prototype.create = function (id) {
        console.log(' show insert ad ');
        this.adUnitID = id;
        if (!this.instance) {
            this.instance = qg.createInsertAd({
                adUnitId: id
            });
            this.instance.onLoad(this.onLoad.bind(this));
            this.instance.onError(this.onError.bind(this));
        }
    };
    OppoInsertAd.prototype.load = function () {
        console.log(' load ad ');
        this.instance.load();
    };
    OppoInsertAd.prototype.show = function () {
        console.log(' show ad ');
        this.instance.show();
    };
    return OppoInsertAd;
}(BaseAd_1.default));
exports.default = OppoInsertAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb0luc2VydEFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLHlDQUFvQztBQUNwQywwQ0FBd0M7QUFFeEM7O0dBRUc7QUFDSDtJQUEwQyxnQ0FBTTtJQUFoRDs7SUEyQ0EsQ0FBQztJQTFDRywyQkFBSSxHQUFKLFVBQUssSUFBSTtRQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hFLHVDQUF1QztRQUN2QyxjQUFjO1FBQ2QsSUFBSTtRQUVKLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRVMsNkJBQU0sR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRVMsOEJBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUNTLDZCQUFNLEdBQWhCLFVBQWlCLEVBQVU7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsUUFBUSxFQUFFLEVBQUU7YUFDZixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDakQ7SUFDTCxDQUFDO0lBRVMsMkJBQUksR0FBZDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMsMkJBQUksR0FBZDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQTNDQSxBQTJDQyxDQTNDeUMsZ0JBQU0sR0EyQy9DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuXHJcbmltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcbmltcG9ydCB7IFNES1N0YXRlIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5cclxuLyoqXHJcbiAqIGh0dHBzOi8vb3Blbi5vcHBvbW9iaWxlLmNvbS93aWtpL2RvYyNpZD0xMDUzOFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb0luc2VydEFkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIG9wZW4oYWRJZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdCYXNlSW50ZXJzdGl0aWFsQWQgc2hvd0FkIHRoaXMuc3RhdGUgJywgdGhpcy5zdGF0ZSlcclxuICAgICAgICAvLyBpZiAodGhpcy5zdGF0ZSA9PSBBZFN0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNES1N0YXRlLmxvYWRpbmc7XHJcbiAgICAgICAgdGhpcy5jcmVhdGUoYWRJZClcclxuICAgICAgICB0aGlzLmxvYWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyDmj5LlsY/lub/lkYrliqDovb3miJDlip8nKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU0RLU3RhdGUubG9hZFN1Y2VzcylcclxuICAgICAgICB0aGlzLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVycm9yKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcg5o+S5bGP5bm/5ZGK5Yqg6L295aSx6LSlICcsIGVycilcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRGYWlsKVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBzaG93IGluc2VydCBhZCAnKVxyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHFnLmNyZWF0ZUluc2VydEFkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiBpZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkxvYWQodGhpcy5vbkxvYWQuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGxvYWQgYWQgJylcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvdygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIHNob3cgYWQgJylcclxuICAgICAgICB0aGlzLmluc3RhbmNlLnNob3coKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==