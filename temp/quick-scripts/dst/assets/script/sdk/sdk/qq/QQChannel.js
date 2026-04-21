
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/qq/QQChannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3c251EiNWtDyJSDMJ4+5EbR', 'QQChannel');
// script/sdk/sdk/qq/QQChannel.ts

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
var BaseChannel_1 = require("../base/BaseChannel");
var QQVideoAd_1 = require("./QQVideoAd");
var QQBanner_1 = require("./QQBanner");
var QQShare_1 = require("./QQShare");
var QQInterstitialAd_1 = require("./QQInterstitialAd");
var QQAppBoxAd_1 = require("./QQAppBoxAd");
var QQScreenshot_1 = require("./QQScreenshot");
var QQSubPackage_1 = require("./QQSubPackage");
var QQChannel = /** @class */ (function (_super) {
    __extends(QQChannel, _super);
    function QQChannel(id) {
        var _this = _super.call(this, id) || this;
        qq.onShow(function () {
        });
        qq.onHide(function () {
        });
        _this.share = new QQShare_1.default(_this);
        if (qq.createInterstitialAd) {
            _this.insertAd = new QQInterstitialAd_1.default(_this);
        }
        if (qq.createRewardedVideoAd) {
            _this.rewardAd = new QQVideoAd_1.default(_this);
        }
        if (qq.createBannerAd) {
            _this.bannerAd = new QQBanner_1.default(_this);
        }
        if (qq.createAppBox) {
            _this.appBoxAd = new QQAppBoxAd_1.default(_this);
        }
        _this.screenshot = new QQScreenshot_1.default(_this);
        _this.subPackage = new QQSubPackage_1.default(_this);
        return _this;
    }
    QQChannel.prototype.showToast = function (title) {
        qq.showToast({ title: title });
    };
    QQChannel.prototype.vibrateShort = function () {
        qq.vibrateShort();
    };
    QQChannel.prototype.postMessage = function (message) {
    };
    QQChannel.prototype.previewImage = function (imgUrl) {
        qq.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        });
    };
    QQChannel.prototype.navigateToMiniProgram = function (appID) {
        qq.navigateToMiniProgram({
            appId: appID,
            success: function () {
            }
        });
    };
    return QQChannel;
}(BaseChannel_1.default));
exports.default = QQChannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xccXFcXFFRQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLHVDQUFrQztBQUNsQyxxQ0FBZ0M7QUFDaEMsdURBQWtEO0FBQ2xELDJDQUFzQztBQUN0QywrQ0FBMEM7QUFDMUMsK0NBQTBDO0FBRTFDO0lBQXVDLDZCQUFXO0lBQzlDLG1CQUFZLEVBQVU7UUFBdEIsWUFDSSxrQkFBTSxFQUFFLENBQUMsU0FnQ1o7UUE5QkcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUVWLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUVWLENBQUMsQ0FBQyxDQUFBO1FBRUYsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGlCQUFPLENBQUMsS0FBSSxDQUFDLENBQUM7UUFFL0IsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUU7WUFDekIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDBCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFBO1NBQzdDO1FBRUQsSUFBSSxFQUFFLENBQUMscUJBQXFCLEVBQUU7WUFDMUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFTLENBQUMsS0FBSSxDQUFDLENBQUE7U0FDdEM7UUFDRCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUU7WUFDbkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsS0FBSSxDQUFDLENBQUE7U0FDckM7UUFFRCxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUU7WUFDakIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG9CQUFVLENBQUMsS0FBSSxDQUFDLENBQUE7U0FDdkM7UUFFRCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTtRQUV4QyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQTs7SUFHNUMsQ0FBQztJQUNELDZCQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ25CLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBQ0QsZ0NBQVksR0FBWjtRQUNJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLE9BQU87SUFFbkIsQ0FBQztJQUlELGdDQUFZLEdBQVosVUFBYSxNQUFjO1FBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQjtTQUNwQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQseUNBQXFCLEdBQXJCLFVBQXNCLEtBQWE7UUFDL0IsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ3JCLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFO1lBRVQsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxnQkFBQztBQUFELENBL0RBLEFBK0RDLENBL0RzQyxxQkFBVyxHQStEakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNoYW5uZWwgZnJvbSBcIi4uL2Jhc2UvQmFzZUNoYW5uZWxcIjtcclxuaW1wb3J0IFFRVmlkZW9BZCBmcm9tIFwiLi9RUVZpZGVvQWRcIjtcclxuaW1wb3J0IFFRQmFubmVyIGZyb20gXCIuL1FRQmFubmVyXCI7XHJcbmltcG9ydCBRUVNoYXJlIGZyb20gXCIuL1FRU2hhcmVcIjtcclxuaW1wb3J0IFFRSW50ZXJzdGl0aWFsQWQgZnJvbSBcIi4vUVFJbnRlcnN0aXRpYWxBZFwiO1xyXG5pbXBvcnQgUVFBcHBCb3hBZCBmcm9tIFwiLi9RUUFwcEJveEFkXCI7XHJcbmltcG9ydCBRUVNjcmVlbnNob3QgZnJvbSBcIi4vUVFTY3JlZW5zaG90XCI7XHJcbmltcG9ydCBRUVN1YlBhY2thZ2UgZnJvbSBcIi4vUVFTdWJQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRUUNoYW5uZWwgZXh0ZW5kcyBCYXNlQ2hhbm5lbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoaWQpO1xyXG5cclxuICAgICAgICBxcS5vblNob3coKCkgPT4ge1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBxcS5vbkhpZGUoKCkgPT4ge1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnNoYXJlID0gbmV3IFFRU2hhcmUodGhpcyk7XHJcblxyXG4gICAgICAgIGlmIChxcS5jcmVhdGVJbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICB0aGlzLmluc2VydEFkID0gbmV3IFFRSW50ZXJzdGl0aWFsQWQodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChxcS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRBZCA9IG5ldyBRUVZpZGVvQWQodGhpcylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHFxLmNyZWF0ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQgPSBuZXcgUVFCYW5uZXIodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChxcS5jcmVhdGVBcHBCb3gpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBCb3hBZCA9IG5ldyBRUUFwcEJveEFkKHRoaXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNjcmVlbnNob3QgPSBuZXcgUVFTY3JlZW5zaG90KHRoaXMpXHJcblxyXG4gICAgICAgIHRoaXMuc3ViUGFja2FnZSA9IG5ldyBRUVN1YlBhY2thZ2UodGhpcylcclxuXHJcblxyXG4gICAgfVxyXG4gICAgc2hvd1RvYXN0KHRpdGxlOiBzdHJpbmcpIHtcclxuICAgICAgICBxcS5zaG93VG9hc3QoeyB0aXRsZTogdGl0bGUgfSlcclxuICAgIH1cclxuICAgIHZpYnJhdGVTaG9ydCgpIHtcclxuICAgICAgICBxcS52aWJyYXRlU2hvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0TWVzc2FnZShtZXNzYWdlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJldmlld0ltYWdlKGltZ1VybDogc3RyaW5nKSB7XHJcbiAgICAgICAgcXEucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgY3VycmVudDogaW1nVXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgICAgICAgIHVybHM6IFtpbWdVcmxdIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlVG9NaW5pUHJvZ3JhbShhcHBJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgcXEubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6IGFwcElELFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSJdfQ==