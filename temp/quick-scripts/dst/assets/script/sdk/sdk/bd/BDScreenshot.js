
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/bd/BDScreenshot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8833eWftKNISLLGT2kugk3y', 'BDScreenshot');
// script/sdk/sdk/bd/BDScreenshot.ts

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
var BaseScreenshot_1 = require("../base/BaseScreenshot");
var BDScreenshot = /** @class */ (function (_super) {
    __extends(BDScreenshot, _super);
    function BDScreenshot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BDScreenshot.prototype.showImage = function (_tempFilePath) {
        this.channel.previewImage(_tempFilePath);
    };
    BDScreenshot.prototype.createImage = function () {
        console.log(' createImage ');
        var canvas = this.getCanvas();
        var data = {
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
            // destination file sizes
            destWidth: canvas.width,
            destHeight: canvas.height,
            fileType: 'png',
            quality: 1
        };
        return data;
    };
    BDScreenshot.prototype.saveFile = function (data, show) {
        var _this = this;
        console.log(' saveFile data ', data, show);
        var canvas = this.getCanvas();
        if (canvas.toTempFilePathSync) {
            // https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.toTempFilePathSync.html
            var _tempFilePath_1 = canvas.toTempFilePathSync(data);
            console.log(' _tempFilePath ', _tempFilePath_1);
            swan.saveImageToPhotosAlbum({
                filePath: _tempFilePath_1,
                success: function (res) {
                    console.log("Capture file success!" + _tempFilePath_1, res);
                    // self.label = '图片加载完成，等待本地预览';
                    // https://developers.weixin.qq.com/minigame/dev/api/media/image/wx.previewImage.html
                    if (show) {
                        _this.showImage(_tempFilePath_1);
                    }
                },
            });
        }
    };
    return BDScreenshot;
}(BaseScreenshot_1.default));
exports.default = BDScreenshot;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmRcXEJEU2NyZWVuc2hvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBb0Q7QUFHcEQ7SUFBMEMsZ0NBQWM7SUFBeEQ7O0lBaURBLENBQUM7SUE5Q0csZ0NBQVMsR0FBVCxVQUFVLGFBQWE7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUM3QixJQUFJLElBQUksR0FBRztZQUNQLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLHlCQUF5QjtZQUN6QixTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDdkIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsT0FBTyxFQUFFLENBQUM7U0FDYixDQUFBO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxJQUFJLEVBQUUsSUFBYTtRQUE1QixpQkF1QkM7UUF0QkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQzdCLElBQUksTUFBTSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLGlHQUFpRztZQUNqRyxJQUFJLGVBQWEsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBQyxlQUFhLENBQUMsQ0FBQTtZQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUM7Z0JBQ3hCLFFBQVEsRUFBRSxlQUFhO2dCQUN2QixPQUFPLEVBQUUsVUFBQyxHQUFHO29CQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQXdCLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDMUQsZ0NBQWdDO29CQUNoQyxxRkFBcUY7b0JBQ3JGLElBQUksSUFBSSxFQUFFO3dCQUNOLEtBQUksQ0FBQyxTQUFTLENBQUMsZUFBYSxDQUFDLENBQUE7cUJBQ2hDO2dCQUNMLENBQUM7YUFDSixDQUFDLENBQUE7U0FHTDtJQUdMLENBQUM7SUFFTCxtQkFBQztBQUFELENBakRBLEFBaURDLENBakR5Qyx3QkFBYyxHQWlEdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVNjcmVubnNob3QgZnJvbSBcIi4uL2Jhc2UvQmFzZVNjcmVlbnNob3RcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCRFNjcmVlbnNob3QgZXh0ZW5kcyBCYXNlU2NyZW5uc2hvdCB7XHJcblxyXG4gICAgXHJcbiAgICBzaG93SW1hZ2UoX3RlbXBGaWxlUGF0aCkge1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5wcmV2aWV3SW1hZ2UoX3RlbXBGaWxlUGF0aClcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVJbWFnZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGNyZWF0ZUltYWdlICcpXHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKClcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgICAgICAvLyBkZXN0aW5hdGlvbiBmaWxlIHNpemVzXHJcbiAgICAgICAgICAgIGRlc3RXaWR0aDogY2FudmFzLndpZHRoLFxyXG4gICAgICAgICAgICBkZXN0SGVpZ2h0OiBjYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgICAgICBmaWxlVHlwZTogJ3BuZycsXHJcbiAgICAgICAgICAgIHF1YWxpdHk6IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUZpbGUoZGF0YSwgc2hvdzogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgc2F2ZUZpbGUgZGF0YSAnLGRhdGEsc2hvdylcclxuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5nZXRDYW52YXMoKVxyXG4gICAgICAgIGlmIChjYW52YXMudG9UZW1wRmlsZVBhdGhTeW5jKSB7XHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL21pbmlnYW1lL2Rldi9hcGkvcmVuZGVyL2NhbnZhcy9DYW52YXMudG9UZW1wRmlsZVBhdGhTeW5jLmh0bWxcclxuICAgICAgICAgICAgbGV0IF90ZW1wRmlsZVBhdGggPSBjYW52YXMudG9UZW1wRmlsZVBhdGhTeW5jKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIF90ZW1wRmlsZVBhdGggJyxfdGVtcEZpbGVQYXRoKVxyXG4gICAgICAgICAgICBzd2FuLnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IF90ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYENhcHR1cmUgZmlsZSBzdWNjZXNzISR7X3RlbXBGaWxlUGF0aH1gLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYubGFiZWwgPSAn5Zu+54mH5Yqg6L295a6M5oiQ77yM562J5b6F5pys5Zyw6aKE6KeIJztcclxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3BlcnMud2VpeGluLnFxLmNvbS9taW5pZ2FtZS9kZXYvYXBpL21lZGlhL2ltYWdlL3d4LnByZXZpZXdJbWFnZS5odG1sXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SW1hZ2UoX3RlbXBGaWxlUGF0aClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==