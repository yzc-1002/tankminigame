"use strict";
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