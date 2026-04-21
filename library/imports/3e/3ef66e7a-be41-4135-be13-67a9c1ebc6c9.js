"use strict";
cc._RF.push(module, '3ef6656vkFBNb4TZ6nB68bJ', 'WXScreenshot');
// script/sdk/sdk/wx/WXScreenshot.ts

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
var WXScreenshot = /** @class */ (function (_super) {
    __extends(WXScreenshot, _super);
    function WXScreenshot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXScreenshot.prototype.showImage = function (_tempFilePath) {
        this.channel.previewImage(_tempFilePath);
    };
    WXScreenshot.prototype.createImage = function () {
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
    WXScreenshot.prototype.saveFile = function (data, show) {
        var _this = this;
        console.log(' saveFile data ', data, show);
        var canvas = this.getCanvas();
        if (canvas.toTempFilePathSync) {
            // https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.toTempFilePathSync.html
            var _tempFilePath_1 = canvas.toTempFilePathSync(data);
            console.log(' _tempFilePath ', _tempFilePath_1);
            wx.saveImageToPhotosAlbum({
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
    return WXScreenshot;
}(BaseScreenshot_1.default));
exports.default = WXScreenshot;

cc._RF.pop();