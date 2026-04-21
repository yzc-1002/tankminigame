
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/qq/QQAppBoxAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xccXFcXFFRQXBwQm94QWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBRXBDO0lBQXdDLDhCQUFNO0lBQTlDOztJQWlDQSxDQUFDO0lBOUJHLHlCQUFJLEdBQUosVUFBSyxFQUFVO1FBRVgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNuQixDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLEVBQVU7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQseUJBQUksR0FBSjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDdkI7SUFDTCxDQUFDO0lBRUQseUJBQUksR0FBSjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDdkI7SUFDTCxDQUFDO0lBRUQsNEJBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDMUI7SUFDTCxDQUFDO0lBR0wsaUJBQUM7QUFBRCxDQWpDQSxBQWlDQyxDQWpDdUMsZ0JBQU0sR0FpQzdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCYXNlQWQgZnJvbSBcIi4uL2Jhc2UvQmFzZUFkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRUUFwcEJveEFkIGV4dGVuZHMgQmFzZUFkIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5zdGFuY2U6IHFxLkFwcEJveDtcclxuICAgIG9wZW4oaWQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZShpZClcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBpZDtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gcXEuY3JlYXRlQXBwQm94KHsgYWRVbml0SWQ6IGlkIH0pXHJcbiAgICAgICAgdGhpcy5sb2FkKClcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UubG9hZCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zaG93KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59Il19