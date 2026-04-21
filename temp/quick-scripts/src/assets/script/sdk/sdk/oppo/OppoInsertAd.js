"use strict";
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