"use strict";
cc._RF.push(module, 'fc242NhTUFHnriapzBONtNd', 'QQAppBoxAd');
// script/sdk/sdk/qq/QQAppBoxAd.ts

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
var QQAppBoxAd = /** @class */ (function (_super) {
    __extends(QQAppBoxAd, _super);
    function QQAppBoxAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QQAppBoxAd.prototype.open = function (id) {
        this.create(id);
    };
    QQAppBoxAd.prototype.create = function (id) {
        this.adUnitID = id;
        this.instance = qq.createAppBox({ adUnitId: id });
        this.load();
    };
    QQAppBoxAd.prototype.load = function () {
        if (this.instance) {
            this.instance.load();
        }
    };
    QQAppBoxAd.prototype.show = function () {
        if (this.instance) {
            this.instance.show();
        }
    };
    QQAppBoxAd.prototype.destroy = function () {
        if (this.instance) {
            this.instance.destroy();
        }
    };
    return QQAppBoxAd;
}(BaseAd_1.default));
exports.default = QQAppBoxAd;

cc._RF.pop();