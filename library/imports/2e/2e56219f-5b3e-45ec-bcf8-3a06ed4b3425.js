"use strict";
cc._RF.push(module, '2e562GfWz5F7Lz4OgbtSzQl', 'BaseRecorder');
// script/sdk/sdk/base/BaseRecorder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDKConfig_1 = require("../SDKConfig");
var BaseRecorder = /** @class */ (function () {
    function BaseRecorder() {
        this.videoPath = null;
        this.state = SDKConfig_1.SDKState.close;
    }
    BaseRecorder.prototype.start = function (obj) { };
    BaseRecorder.prototype.pause = function () { };
    BaseRecorder.prototype.resume = function () { };
    BaseRecorder.prototype.stop = function (isSave) {
        if (isSave === void 0) { isSave = true; }
    };
    //记录精彩的视频片段
    BaseRecorder.prototype.recordClip = function (object) { };
    BaseRecorder.prototype.changeState = function (s) {
        this.state = s;
    };
    BaseRecorder.prototype.getVideoPath = function () {
        return this.videoPath;
    };
    BaseRecorder.prototype.clear = function () {
        this.videoPath = null;
    };
    BaseRecorder.prototype.isOpen = function () {
        return this.state == SDKConfig_1.SDKState.open;
    };
    BaseRecorder.prototype.isClose = function () {
        return this.state == SDKConfig_1.SDKState.close;
    };
    BaseRecorder.prototype.getState = function () {
        return this.state;
    };
    return BaseRecorder;
}());
exports.default = BaseRecorder;

cc._RF.pop();