
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/oppo/OppoScreenshot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcb3Bwb1xcT3Bwb1NjcmVlbnNob3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9EO0FBQ3BELHNFQUFpRTtBQUVqRTtJQUE0QyxrQ0FBYztJQUExRDs7SUE0Q0EsQ0FBQztJQTNDRyxrQ0FBUyxHQUFULFVBQVUsYUFBYTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDNUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQzdCLElBQUksT0FBTyxHQUFHLDRCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ3hELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUc7WUFDUCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsUUFBUSxFQUFFLEtBQUs7WUFDZixPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFBO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxJQUFJLEVBQUUsSUFBYTtRQUE1QixpQkFvQkM7UUFsQkcsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUU7WUFDdEIsK0hBQStIO1lBQy9ILElBQUksZUFBYSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGVBQWEsQ0FBQyxDQUFBO1lBQzVDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGVBQWE7Z0JBQ3ZCLE9BQU8sRUFBRTtvQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxlQUFhLENBQUMsQ0FBQTtvQkFDM0MsSUFBSSxJQUFJLEVBQUU7d0JBQ04sS0FBSSxDQUFDLFNBQVMsQ0FBQyxlQUFhLENBQUMsQ0FBQTtxQkFDaEM7Z0JBQ0wsQ0FBQztnQkFDRCxJQUFJLEVBQUUsVUFBVSxJQUFJLEVBQUUsSUFBSTtvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBeUIsSUFBTSxDQUFDLENBQUE7Z0JBQ2hELENBQUM7YUFDSixDQUFDLENBQUE7U0FDTDtJQUVMLENBQUM7SUFDTCxxQkFBQztBQUFELENBNUNBLEFBNENDLENBNUMyQyx3QkFBYyxHQTRDekQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVNjcmVubnNob3QgZnJvbSBcIi4uL2Jhc2UvQmFzZVNjcmVlbnNob3RcIjtcclxuaW1wb3J0IFRleHR1cmVSZW5kZXJVdGlscyBmcm9tIFwiLi4vLi4vZW5naW5lL1RleHR1cmVSZW5kZXJVdGlsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb1NjcmVlbnNob3QgZXh0ZW5kcyBCYXNlU2NyZW5uc2hvdCB7XHJcbiAgICBzaG93SW1hZ2UoX3RlbXBGaWxlUGF0aCkge1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5wcmV2aWV3SW1hZ2UoX3RlbXBGaWxlUGF0aClcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVJbWFnZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGNyZWF0ZUltYWdlICcpXHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKClcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IFRleHR1cmVSZW5kZXJVdGlscy5pbnN0YW5jZSgpLmdldFRleHR1cmUoKVxyXG4gICAgICAgIGxldCB3aWR0aCA9IHRleHR1cmUud2lkdGg7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IHRleHR1cmUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KHdpZHRoICogaGVpZ2h0ICogNCk7XHJcbiAgICAgICAgdGV4dHVyZS5yZWFkUGl4ZWxzKGJ5dGVzKTtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgZGF0YTogYnl0ZXMsXHJcbiAgICAgICAgICAgIHdpZHRoOiBjYW52YXMud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2FudmFzLmhlaWdodCxcclxuICAgICAgICAgICAgZmlsZVR5cGU6ICdwbmcnLFxyXG4gICAgICAgICAgICByZXZlcnNlOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlRmlsZShkYXRhLCBzaG93OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgIGlmIChxZy5zYXZlSW1hZ2VUZW1wU3luYykge1xyXG4gICAgICAgICAgICAvLyBodHRwczovL2Nkb2ZzLm9wcG9tb2JpbGUuY29tL2Nkby1hY3Rpdml0eS9zdGF0aWMvMjAxODEwLzI2L3F1aWNrZ2FtZS9kb2N1bWVudGF0aW9uL21lZGlhL2ltYWdlLmh0bWw/aD1zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtXHJcbiAgICAgICAgICAgIGxldCBfdGVtcEZpbGVQYXRoID0gcWcuc2F2ZUltYWdlVGVtcFN5bmMoZGF0YSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ190ZW1wRmlsZVBhdGggJywgX3RlbXBGaWxlUGF0aClcclxuICAgICAgICAgICAgcWcuc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XHJcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDogX3RlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgc2F2ZSBzdWNjZXNzYCArIF90ZW1wRmlsZVBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SW1hZ2UoX3RlbXBGaWxlUGF0aClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgaGFuZGxpbmcgZmFpbCwgY29kZSA9ICR7Y29kZX1gKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=