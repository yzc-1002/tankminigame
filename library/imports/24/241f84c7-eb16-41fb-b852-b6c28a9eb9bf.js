"use strict";
cc._RF.push(module, '241f8TH6xZB+7hStsKKnrm/', 'Recorder');
// script/ad/Recorder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recorder = void 0;
//屏幕录制
var TTRecorderEx_1 = require("./bytedance/TTRecorderEx");
var Recorder = /** @class */ (function () {
    function Recorder() {
        this._recorder = null; //录屏实例
        this._enabled = true; //是否允许录屏
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            this._recorder = new TTRecorderEx_1.TTRecorderEx();
        }
        else {
            this._enabled = false;
        }
    }
    Recorder.getInstance = function () {
        if (Recorder._sInstance == null) {
            Recorder._sInstance = new Recorder();
        }
        return Recorder._sInstance;
    };
    /**
     * 开始录屏
     */
    Recorder.prototype.start = function () {
        if (this._recorder) {
            this._recorder.start();
        }
    };
    /**
     * 结束录屏
     */
    Recorder.prototype.stop = function () {
        if (this._recorder) {
            this._recorder.stop();
        }
    };
    /**
     * 暂停
     */
    Recorder.prototype.pause = function () {
        if (this._recorder) {
            this._recorder.pause();
        }
    };
    /**
     * 恢复
     */
    Recorder.prototype.resume = function () {
        if (this._recorder) {
            this._recorder.resume();
        }
    };
    /**
     * 裁剪
     */
    Recorder.prototype.clip = function () {
        if (this._recorder) {
            this._recorder.clip();
        }
    };
    /**
     * 分享视频
     * @param callback : 分享的回调函数
     */
    Recorder.prototype.shareVideo = function (callback) {
        if (callback === void 0) { callback = null; }
        if (this._recorder) {
            this._recorder.shareVideo(callback);
        }
    };
    /**
     * 是否允许录屏
     */
    Recorder.prototype.enabled = function () {
        return this._enabled;
    };
    Recorder._sInstance = null; //静态实例
    return Recorder;
}());
exports.Recorder = Recorder;

cc._RF.pop();