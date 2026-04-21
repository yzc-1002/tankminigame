"use strict";
cc._RF.push(module, '013b6VSdcxI/a2QHln1RZlK', 'OppoScreenshot');
// script/sdk/sdk/oppo/OppoScreenshot.ts

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
var TextureRenderUtils_1 = require("../../engine/TextureRenderUtils");
var OppoScreenshot = /** @class */ (function (_super) {
    __extends(OppoScreenshot, _super);
    function OppoScreenshot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OppoScreenshot.prototype.showImage = function (_tempFilePath) {
        this.channel.previewImage(_tempFilePath);
    };
    OppoScreenshot.prototype.createImage = function () {
        console.log(' createImage ');
        var canvas = this.getCanvas();
        var texture = TextureRenderUtils_1.default.instance().getTexture();
        var width = texture.width;
        var height = texture.height;
        var bytes = new Uint8Array(width * height * 4);
        texture.readPixels(bytes);
        var data = {
            data: bytes,
            width: canvas.width,
            height: canvas.height,
            fileType: 'png',
            reverse: true,
        };
        return data;
    };
    OppoScreenshot.prototype.saveFile = function (data, show) {
        var _this = this;
        if (qg.saveImageTempSync) {
            // https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/media/image.html?h=saveImageToPhotosAlbum
            var _tempFilePath_1 = qg.saveImageTempSync(data);
            console.log('_tempFilePath ', _tempFilePath_1);
            qg.saveImageToPhotosAlbum({
                filePath: _tempFilePath_1,
                success: function () {
                    console.log("save success" + _tempFilePath_1);
                    if (show) {
                        _this.showImage(_tempFilePath_1);
                    }
                },
                fail: function (data, code) {
                    console.log("handling fail, code = " + code);
                }
            });
        }
    };
    return OppoScreenshot;
}(BaseScreenshot_1.default));
exports.default = OppoScreenshot;

cc._RF.pop();