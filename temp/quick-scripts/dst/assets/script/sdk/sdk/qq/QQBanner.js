
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/qq/QQBanner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9988bshETdKoo+LQ7ZVE2/z', 'QQBanner');
// script/sdk/sdk/qq/QQBanner.ts

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
var QQBanner = /** @class */ (function (_super) {
    __extends(QQBanner, _super);
    function QQBanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QQBanner.prototype.open = function (adID) {
        //逻辑要求开
        this.logicState = SDKConfig_1.SDKState.open;
        //如果banner已经已经显示 则返回。
        // if (this.state == AdState.loading) {
        //     return;
        // }
        // this.state = AdState.loading;
        if (this.adUnitID != adID) {
            this.destroy();
            this.create(adID);
        }
        else {
            this.showCount++;
            if (this.showCount > 3) { //展示超过3次 从新加载
                this.showCount = 0;
                this.destroy();
                this.create(adID);
            }
            else {
                this.show();
            }
        }
    };
    QQBanner.prototype.close = function () {
        this.logicState = SDKConfig_1.SDKState.close;
        // if (this.state == AdState.close) {
        //     return;
        // }
        if (!this.instance) {
            return;
        }
        this.hide();
    };
    QQBanner.prototype.onError = function (err) {
        console.log('banner onError', err);
        this.setState(SDKConfig_1.SDKState.loadFail);
    };
    QQBanner.prototype.onLoad = function () {
        console.log('banner onLoad');
        this.setState(SDKConfig_1.SDKState.loadSucess);
        if (this.logicState == SDKConfig_1.SDKState.open) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    QQBanner.prototype.onResize = function (data) {
        console.log('banner onResize', data);
    };
    QQBanner.prototype.create = function (adID) {
        var winSize = qq.getSystemInfoSync();
        this.adUnitID = adID;
        // console.log(winSize);
        var bannerHeight = 130;
        var bannerWidth = 350;
        this.instance = qq.createBannerAd({
            adUnitId: this.adUnitID,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: winSize.windowHeight - bannerHeight,
                width: bannerWidth
            }
        });
        this.instance.onLoad(this.onLoad.bind(this));
        this.instance.onError(this.onError.bind(this));
        this.instance.onResize(this.onResize.bind(this));
    };
    QQBanner.prototype.show = function () {
        this.state = SDKConfig_1.SDKState.open;
        if (this.instance)
            this.instance.show();
    };
    QQBanner.prototype.hide = function () {
        this.state = SDKConfig_1.SDKState.close;
        if (this.instance)
            this.instance.hide();
    };
    QQBanner.prototype.destroy = function () {
        if (this.instance) {
            this.instance.offLoad(this.onLoad.bind(this));
            this.instance.offError(this.onError.bind(this));
            this.instance.offResize(this.onResize.bind(this));
            this.instance.destroy();
        }
    };
    return QQBanner;
}(BaseAd_1.default));
exports.default = QQBanner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xccXFcXFFRQmFubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUNwQywwQ0FBd0M7QUFDeEM7SUFBc0MsNEJBQU07SUFBNUM7O0lBc0dBLENBQUM7SUFsR0csdUJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxxQkFBcUI7UUFDckIsdUNBQXVDO1FBQ3ZDLGNBQWM7UUFDZCxJQUFJO1FBQ0osZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNwQjthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBQyxhQUFhO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDcEI7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO2FBQ2Q7U0FDSjtJQUNMLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBUSxDQUFDLEtBQUssQ0FBQztRQUVqQyxxQ0FBcUM7UUFDckMsY0FBYztRQUNkLElBQUk7UUFFSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBQ0QsMEJBQU8sR0FBUCxVQUFRLEdBQUc7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUVwQyxDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxvQkFBUSxDQUFDLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDZDthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQ2Q7SUFDTCxDQUFDO0lBQ0QsMkJBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFUyx5QkFBTSxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLHdCQUF3QjtRQUN4QixJQUFJLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBSXRCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLE9BQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWTtnQkFDeEMsS0FBSyxFQUFFLFdBQVc7YUFDckI7U0FDSixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBRVMsdUJBQUksR0FBZDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxJQUFJLENBQUE7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVTLHVCQUFJLEdBQWQ7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFUywwQkFBTyxHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDMUI7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBdEdBLEFBc0dDLENBdEdxQyxnQkFBTSxHQXNHM0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJhc2VBZCBmcm9tIFwiLi4vYmFzZS9CYXNlQWRcIjtcclxuaW1wb3J0IHsgU0RLU3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFFRQmFubmVyIGV4dGVuZHMgQmFzZUFkIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5zdGFuY2U6IHFxLkJhbm5lckFkO1xyXG5cclxuICAgIG9wZW4oYWRJRCkge1xyXG4gICAgICAgIC8v6YC76L6R6KaB5rGC5byAXHJcbiAgICAgICAgdGhpcy5sb2dpY1N0YXRlID0gU0RLU3RhdGUub3BlbjtcclxuXHJcbiAgICAgICAgLy/lpoLmnpxiYW5uZXLlt7Lnu4/lt7Lnu4/mmL7npLog5YiZ6L+U5Zue44CCXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUgPT0gQWRTdGF0ZS5sb2FkaW5nKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5zdGF0ZSA9IEFkU3RhdGUubG9hZGluZztcclxuICAgICAgICBpZiAodGhpcy5hZFVuaXRJRCAhPSBhZElEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKGFkSUQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0NvdW50ID4gMykgey8v5bGV56S66LaF6L+HM+asoSDku47mlrDliqDovb1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZShhZElEKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpY1N0YXRlID0gU0RLU3RhdGUuY2xvc2U7XHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLnN0YXRlID09IEFkU3RhdGUuY2xvc2UpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgfVxyXG4gICAgb25FcnJvcihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYmFubmVyIG9uRXJyb3InLCBlcnIpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTREtTdGF0ZS5sb2FkRmFpbClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdiYW5uZXIgb25Mb2FkJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFNES1N0YXRlLmxvYWRTdWNlc3MpXHJcbiAgICAgICAgaWYgKHRoaXMubG9naWNTdGF0ZSA9PSBTREtTdGF0ZS5vcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblJlc2l6ZShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jhbm5lciBvblJlc2l6ZScsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZShhZElEKSB7XHJcbiAgICAgICAgbGV0IHdpblNpemUgPSBxcS5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgIHRoaXMuYWRVbml0SUQgPSBhZElEXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cod2luU2l6ZSk7XHJcbiAgICAgICAgbGV0IGJhbm5lckhlaWdodCA9IDEzMDtcclxuICAgICAgICBsZXQgYmFubmVyV2lkdGggPSAzNTA7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHFxLmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuYWRVbml0SUQsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2luU2l6ZS53aW5kb3dXaWR0aCAtIGJhbm5lcldpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICB0b3A6IHdpblNpemUud2luZG93SGVpZ2h0IC0gYmFubmVySGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGJhbm5lcldpZHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uub25Mb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5vbkVycm9yKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uub25SZXNpemUodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5vcGVuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTREtTdGF0ZS5jbG9zZTtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5vZmZMb2FkKHRoaXMub25Mb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmRXJyb3IodGhpcy5vbkVycm9yLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uub2ZmUmVzaXplKHRoaXMub25SZXNpemUuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19