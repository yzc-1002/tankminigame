"use strict";
cc._RF.push(module, '00fdfW6aSJMnqLc36laqyZ/', 'TTRecorder');
// script/sdk/sdk/tt/TTRecorder.ts

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
var BaseRecorder_1 = require("../base/BaseRecorder");
var SDKConfig_1 = require("../SDKConfig");
/**
 * https://microapp.bytedance.com/dev/cn/mini-game/develop/open-capacity/video-camera/request-method
 */
var TTRecorder = /** @class */ (function (_super) {
    __extends(TTRecorder, _super);
    function TTRecorder() {
        var _this = _super.call(this) || this;
        _this.isSave = true;
        _this.recorder = tt.getGameRecorderManager();
        _this.recorder.onStart(function (res) {
            console.log('录屏开始', res);
            _this.changeState(SDKConfig_1.SDKState.open);
            // do somethine;
        });
        _this.recorder.onStop(function (res) {
            // console.log(res.videoPath);
            // do somethine;
            console.log('录屏结束', res);
            _this.clipVideo(res, [15, 0], function (r) {
                if (r) {
                    // if (this.isSave) {
                    _this.videoPath = r.videoPath;
                    // }
                }
                else {
                    _this.videoPath = null;
                }
                _this.changeState(SDKConfig_1.SDKState.close);
            });
        });
        _this.recorder.onResume(function () {
            console.log('TTRecorder onResume');
        });
        _this.recorder.onPause(function () {
            console.log('TTRecorder onPuase');
        });
        _this.recorder.onError(function (res) {
            console.log('TTRecorder onPuase');
            _this.videoPath = null;
        });
        return _this;
    }
    TTRecorder.prototype.clipVideo = function (res, timeRange, func) {
        this.recorder.clipVideo({
            path: res.videoPath,
            timeRange: timeRange,
            success: function (r) {
                console.log(r.videoPath);
                func(r);
            },
            fail: function () {
                func(null);
            }
        });
    };
    TTRecorder.prototype.recordClip = function (func) {
        this.recorder.recordClip({
            timeRange: [30, 0],
            success: function (r) {
                console.log(r.index); // 裁剪唯一索引
                func(r);
            }
        });
    };
    TTRecorder.prototype.start = function () {
        if (this.isOpen()) {
            return;
        }
        // this.changeState(ItemState.GOT)
        this.recorder.start({
            duration: 300,
        });
    };
    TTRecorder.prototype.stop = function (isSave) {
        if (isSave === void 0) { isSave = true; }
        if (this.isClose()) {
            return;
        }
        // this.changeState(ItemState.NOT_GET)
        this.isSave = isSave;
        this.recorder.stop();
    };
    TTRecorder.prototype.pause = function () {
        this.recorder.pause();
    };
    TTRecorder.prototype.resume = function () {
        this.recorder.resume();
    };
    return TTRecorder;
}(BaseRecorder_1.default));
exports.default = TTRecorder;

cc._RF.pop();