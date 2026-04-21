
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseScreenshot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZVNjcmVlbnNob3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxzRUFBaUU7QUFFakU7SUFHSSx3QkFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBQ0QsZ0NBQU8sR0FBUCxVQUFRLElBQW1CO1FBQW5CLHFCQUFBLEVBQUEsV0FBbUI7UUFDdkIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQix1Q0FBdUM7UUFDdkMsNEJBQWtCLENBQUMsUUFBUSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0Msb0RBQW9EO1FBQ3BELDhCQUE4QjtRQUM5QiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsWUFBWTtJQUNoQixDQUFDO0lBRUQsa0NBQVMsR0FBVDtRQUNJLE9BQVEsNEJBQWtCLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDckQsQ0FBQztJQUVELGtDQUFTLEdBQVQsVUFBVSxHQUFRO0lBRWxCLENBQUM7SUFFRCxvQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxJQUFJLEVBQUUsSUFBYTtJQUU1QixDQUFDO0lBRUwscUJBQUM7QUFBRCxDQWxDQSxBQWtDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCYXNlQ2hhbm5lbCBmcm9tIFwiLi9CYXNlQ2hhbm5lbFwiO1xyXG5pbXBvcnQgVGV4dHVyZVJlbmRlclV0aWxzIGZyb20gXCIuLi8uLi9lbmdpbmUvVGV4dHVyZVJlbmRlclV0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlU2NyZW5uc2hvdCB7XHJcbiAgICBwcm90ZWN0ZWQgY2hhbm5lbDogQmFzZUNoYW5uZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhbm5lbDogQmFzZUNoYW5uZWwpIHtcclxuICAgICAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xyXG4gICAgfVxyXG4gICAgY2FwdHVyZShzaG93OmJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjYXB0dXJlXHJcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJyBDYXB0dXJlT3BwbyBjYXB0dXJlICcpXHJcbiAgICAgICAgVGV4dHVyZVJlbmRlclV0aWxzLmluc3RhbmNlKCkuY3JlYXRlQ2FudmFzKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJyBDYXB0dXJlT3BwbyBjcmVhdGVDYW52YXMgJywgY2FudmFzKVxyXG4gICAgICAgIC8vIGxldCBpbWcgPSB0aGlzLmNyZWF0ZUltZygpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCcgQ2FwdHVyZU9wcG8gY2FwdHVyZSBpbWcgJyxpbWcpXHJcbiAgICAgICAgdGhpcy5zYXZlRmlsZSh0aGlzLmNyZWF0ZUltYWdlKCksIHNob3cpO1xyXG4gICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhbnZhcygpe1xyXG4gICAgICAgIHJldHVybiAgVGV4dHVyZVJlbmRlclV0aWxzLmluc3RhbmNlKCkuZ2V0Q2FudmFzKClcclxuICAgIH1cclxuXHJcbiAgICBzaG93SW1hZ2UoaW1nOiBhbnkpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlSW1hZ2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVGaWxlKGRhdGEsIHNob3c6IGJvb2xlYW4pIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==