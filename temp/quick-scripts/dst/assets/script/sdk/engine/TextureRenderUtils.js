
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/engine/TextureRenderUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '77eb3cQ1EtF74+TCHrZ6dp9', 'TextureRenderUtils');
// script/sdk/engine/TextureRenderUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://github.com/cocos-creator/example-cases/tree/master/assets/cases/07_capture_texture
 */
var TextureRenderUtils = /** @class */ (function () {
    function TextureRenderUtils() {
        this.camera = null;
        this.renderNode = null;
        this._canvas = null;
    }
    TextureRenderUtils.instance = function () {
        if (!this.ins) {
            this.ins = new TextureRenderUtils();
        }
        return this.ins;
    };
    TextureRenderUtils.prototype.getTexture = function () {
        return this.texture;
    };
    TextureRenderUtils.prototype.init = function (camera, renderNode) {
        this.camera = camera;
        this.renderNode = renderNode;
        // this.label = '';
        var texture = new cc.RenderTexture();
        // cc.log(' cc.game ', cc.game)
        var gl = cc.game._renderContext;
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        this.camera.targetTexture = texture;
        this.texture = texture;
    };
    // create the img element
    // create the canvas and context, filpY the image Data
    TextureRenderUtils.prototype.createCanvas = function () {
        var width = this.texture.width;
        var height = this.texture.height;
        // logInfo('createCanvas ==============11111 ', document)
        if (!this._canvas) {
            this._canvas = document.createElement('canvas');
            this._canvas.width = width;
            this._canvas.height = height;
        }
        else {
            this.clearCanvas();
        }
        // logInfo('createCanvas ==============222222 ')
        this.camera.render(this.renderNode);
        this.setData();
    };
    TextureRenderUtils.prototype.getCanvas = function () {
        return this._canvas;
    };
    TextureRenderUtils.prototype.stopCamera = function () {
        this.camera.node.active = false;
    };
    /**
     * 获取截取的图片
     */
    TextureRenderUtils.prototype.getSpriteFrame = function () {
        this.createCanvas();
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(this.texture);
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        return node;
    };
    TextureRenderUtils.prototype.setData = function () {
        // logInfo('createCanvas ==============33333 ', this._canvas)
        var width = this.texture.width;
        var height = this.texture.height;
        var ctx = this._canvas.getContext('2d');
        // console.log(' ctx ', ctx)
        var data = this.texture.readPixels();
        // write the render data
        var rowBytes = width * 4;
        for (var row = 0; row < height; row++) {
            var srow = height - 1 - row;
            var imageData = ctx.createImageData(width, 1);
            var start = srow * width * 4;
            for (var i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }
            ctx.putImageData(imageData, 0, row);
        }
        // logInfo('createCanvas ==============444444 ')
        return data;
    };
    // show on the canvas
    TextureRenderUtils.prototype.clearCanvas = function () {
        var ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    return TextureRenderUtils;
}());
exports.default = TextureRenderUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXGVuZ2luZVxcVGV4dHVyZVJlbmRlclV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0dBRUc7QUFDSDtJQUFBO1FBY2MsV0FBTSxHQUFjLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLFlBQU8sR0FBUSxJQUFJLENBQUM7SUE0RmxDLENBQUM7SUF0R1UsMkJBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUE7U0FDdEM7UUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQVFELHVDQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUdELGlDQUFJLEdBQUosVUFBSyxNQUFpQixFQUFFLFVBQW1CO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLG1CQUFtQjtRQUNuQixJQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQywrQkFBK0I7UUFDL0IsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDaEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFDRCx5QkFBeUI7SUFDekIsc0RBQXNEO0lB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Qix3Q0FBVyxHQUFYO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E1R0EsQUE0R0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0dXJlUmVuZGVySW50ZXJmYWNlIGZyb20gXCIuLi9jZncvaW50ZXJmYWNlL1RleHR1cmVSZW5kZXJJbnRlcmZhY2VcIjtcclxuXHJcblxyXG4vKipcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2NvY29zLWNyZWF0b3IvZXhhbXBsZS1jYXNlcy90cmVlL21hc3Rlci9hc3NldHMvY2FzZXMvMDdfY2FwdHVyZV90ZXh0dXJlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlUmVuZGVyVXRpbHMgaW1wbGVtZW50cyBUZXh0dXJlUmVuZGVySW50ZXJmYWNle1xyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zOiBUZXh0dXJlUmVuZGVyVXRpbHM7XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnMgPSBuZXcgVGV4dHVyZVJlbmRlclV0aWxzKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2FtZXJhOiBjYy5DYW1lcmEgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHJlbmRlck5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIF9jYW52YXM6IGFueSA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgdGV4dHVyZTogY2MuUmVuZGVyVGV4dHVyZTtcclxuXHJcbiAgICBnZXRUZXh0dXJlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluaXQoY2FtZXJhOiBjYy5DYW1lcmEsIHJlbmRlck5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB0aGlzLnJlbmRlck5vZGUgPSByZW5kZXJOb2RlO1xyXG4gICAgICAgIC8vIHRoaXMubGFiZWwgPSAnJztcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgLy8gY2MubG9nKCcgY2MuZ2FtZSAnLCBjYy5nYW1lKVxyXG4gICAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XHJcbiAgICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUoY2MudmlzaWJsZVJlY3Qud2lkdGgsIGNjLnZpc2libGVSZWN0LmhlaWdodCwgZ2wuU1RFTkNJTF9JTkRFWDgpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRhcmdldFRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICB9XHJcbiAgICAvLyBjcmVhdGUgdGhlIGltZyBlbGVtZW50XHJcbiAgICAvLyBjcmVhdGUgdGhlIGNhbnZhcyBhbmQgY29udGV4dCwgZmlscFkgdGhlIGltYWdlIERhdGFcclxuICAgIGNyZWF0ZUNhbnZhcygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLnRleHR1cmUud2lkdGg7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMudGV4dHVyZS5oZWlnaHQ7XHJcbiAgICAgICAgLy8gbG9nSW5mbygnY3JlYXRlQ2FudmFzID09PT09PT09PT09PT09MTExMTEgJywgZG9jdW1lbnQpXHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW52YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsb2dJbmZvKCdjcmVhdGVDYW52YXMgPT09PT09PT09PT09PT0yMjIyMjIgJylcclxuICAgICAgICB0aGlzLmNhbWVyYS5yZW5kZXIodGhpcy5yZW5kZXJOb2RlKTtcclxuICAgICAgICB0aGlzLnNldERhdGEoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldENhbnZhcygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcENhbWVyYSgpIHtcclxuICAgICAgICB0aGlzLmNhbWVyYS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaIquWPlueahOWbvueJh1xyXG4gICAgICovXHJcbiAgICBnZXRTcHJpdGVGcmFtZSgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNhbnZhcygpXHJcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKCk7XHJcbiAgICAgICAgc3ByaXRlRnJhbWUuc2V0VGV4dHVyZSh0aGlzLnRleHR1cmUpO1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKCk6IGFueSB7XHJcbiAgICAgICAgLy8gbG9nSW5mbygnY3JlYXRlQ2FudmFzID09PT09PT09PT09PT09MzMzMzMgJywgdGhpcy5fY2FudmFzKVxyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMudGV4dHVyZS53aWR0aDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy50ZXh0dXJlLmhlaWdodDtcclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJyBjdHggJywgY3R4KVxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy50ZXh0dXJlLnJlYWRQaXhlbHMoKTtcclxuICAgICAgICAvLyB3cml0ZSB0aGUgcmVuZGVyIGRhdGFcclxuICAgICAgICBsZXQgcm93Qnl0ZXMgPSB3aWR0aCAqIDQ7XHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgaGVpZ2h0OyByb3crKykge1xyXG4gICAgICAgICAgICBsZXQgc3JvdyA9IGhlaWdodCAtIDEgLSByb3c7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZURhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCAxKTtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gc3JvdyAqIHdpZHRoICogNDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dCeXRlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpXSA9IGRhdGFbc3RhcnQgKyBpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxvZ0luZm8oJ2NyZWF0ZUNhbnZhcyA9PT09PT09PT09PT09PTQ0NDQ0NCAnKVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIHNob3cgb24gdGhlIGNhbnZhc1xyXG5cclxuICAgIGNsZWFyQ2FudmFzKCkge1xyXG4gICAgICAgIGxldCBjdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuIl19