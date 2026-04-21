"use strict";
cc._RF.push(module, 'ac713Xan2xA2rnXoXvRl473', 'TTRecorderEx');
// script/ad/bytedance/TTRecorderEx.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTRecorderEx = void 0;
var TTRecorderEx = /** @class */ (function () {
    function TTRecorderEx() {
        this._recorder = null; //实例
        this._recording = false; //录屏中
        this._time = 0; //录屏时间
        this._path = ''; //录屏地址
        this._recorderType = 0; //0 空闲 1 正在录制 2 暂停中
        this._recorder = tt.getGameRecorderManager();
        var self = this;
        this._recorder.onStart(function (res) {
            console.log('onStart');
            console.log(JSON.stringify(res));
            self._recorderType = 1;
            self._time = 0;
            self._path = '';
        });
        this._recorder.onStop(function (res) {
            console.log('onStop');
            console.log(JSON.stringify(res));
            self._recorderType = 0;
            self._path = res.videoPath;
        });
        this._recorder.onPause(function (res) {
            console.log('onPause');
            console.log(JSON.stringify(res));
            self._recorderType = 2;
        });
        this._recorder.onResume(function (res) {
            console.log('onResume');
            console.log(JSON.stringify(res));
            self._recorderType = 1;
        });
        this._recorder.onInterruptionBegin(function (res) {
            console.log('onInterruptionBegin');
            console.log(JSON.stringify(res));
            // self._recorderType = 1;
        });
        this._recorder.onInterruptionEnd(function (res) {
            console.log('onInterruptionEnd');
            console.log(JSON.stringify(res));
            // self._recorderType = 1;
        });
        this._recorder.onError(function (res) {
            console.log('onError');
            console.log(JSON.stringify(res));
            self._recording = false;
            self._recorderType = 0;
            self._time = 0;
            self._path = '';
        });
    }
    //开始录屏
    TTRecorderEx.prototype.start = function () {
        if (this._recording == false) {
            this._recording = true;
            this._recorder.start({ duration: 300 });
        }
    };
    //结束录屏
    TTRecorderEx.prototype.stop = function () {
        if (this._recording) {
            this._recording = false;
            this._recorder.stop();
            cc.log(this._time, this._path);
        }
    };
    //暂停
    TTRecorderEx.prototype.pause = function () {
        if (this._recording) {
            this._recorder.pause();
        }
    };
    //恢复
    TTRecorderEx.prototype.resume = function () {
        if (this._recording) {
            this._recorder.resume();
        }
    };
    //裁剪
    TTRecorderEx.prototype.clip = function () {
        // if (this._recorder) {
        var self = this;
        this._recorder.clipVideo({
            path: self._path,
            success: function (res) {
                // 由开始5秒 +最后10秒 拼接合成的视频
                console.log('clip ' + res.videoPath);
            },
            fail: function (e) {
                console.error('clip ' + e);
            },
        });
        // }
    };
    //分享视频
    TTRecorderEx.prototype.shareVideo = function (callback) {
        if (this._path != '') {
            var data = {
                channel: "video",
                title: "快来和我一起玩耍",
                desc: "快来和我一起玩耍",
                imageUrl: "",
                templateId: "",
                query: "",
                extra: {
                    videoPath: this._path,
                },
                success: function (res) {
                    console.log("分享视频成功 ", JSON.stringify(res));
                    if (callback) {
                        callback(true);
                    }
                },
                fail: function (e) {
                    console.log("分享视频失败 ", JSON.stringify(e));
                    callback(false);
                    tt.showToast({
                        title: "分享失败"
                    });
                },
            };
            //   console.log(JSON.stringify(data))
            tt.shareAppMessage(data);
        }
    };
    return TTRecorderEx;
}());
exports.TTRecorderEx = TTRecorderEx;

cc._RF.pop();