"use strict";
cc._RF.push(module, '429cd3tYJdCx6j1iCB9oCTu', 'BaseScreenshot');
// script/sdk/sdk/base/BaseScreenshot.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureRenderUtils_1 = require("../../engine/TextureRenderUtils");
var BaseScrennshot = /** @class */ (function () {
    function BaseScrennshot(channel) {
        this.channel = channel;
    }
    BaseScrennshot.prototype.capture = function (show) {
        if (show === void 0) { show = true; }
        // create the capture
        // setTimeout(() => {
        // console.log(' CaptureOppo capture ')
        TextureRenderUtils_1.default.instance().createCanvas();
        // console.log(' CaptureOppo createCanvas ', canvas)
        // let img = this.createImg();
        // console.log(' CaptureOppo capture img ',img)
        this.saveFile(this.createImage(), show);
        // }, 1000);
    };
    BaseScrennshot.prototype.getCanvas = function () {
        return TextureRenderUtils_1.default.instance().getCanvas();
    };
    BaseScrennshot.prototype.showImage = function (img) {
    };
    BaseScrennshot.prototype.createImage = function () {
    };
    BaseScrennshot.prototype.saveFile = function (data, show) {
    };
    return BaseScrennshot;
}());
exports.default = BaseScrennshot;

cc._RF.pop();