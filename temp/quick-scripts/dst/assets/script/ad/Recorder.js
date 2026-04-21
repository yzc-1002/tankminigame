
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/Recorder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcUmVjb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLHlEQUFzRDtBQUV0RDtJQU1JO1FBSEEsY0FBUyxHQUFhLElBQUksQ0FBQyxDQUFDLE1BQU07UUFDbEMsYUFBUSxHQUFjLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFJaEMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1NBQ3ZDO2FBQ0c7WUFDQSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUVMLENBQUM7SUFFTSxvQkFBVyxHQUFsQjtRQUNJLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDN0IsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUFLLEdBQUw7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUJBQUksR0FBSjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBQztZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3QkFBSyxHQUFMO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBSSxHQUFKO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsNkJBQVUsR0FBVixVQUFXLFFBQWE7UUFBYix5QkFBQSxFQUFBLGVBQWE7UUFDcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBbEZNLG1CQUFVLEdBQUssSUFBSSxDQUFDLENBQUMsTUFBTTtJQW1GdEMsZUFBQztDQXJGRCxBQXFGQyxJQUFBO0FBckZZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/lsY/luZXlvZXliLZcclxuaW1wb3J0IHtUVFJlY29yZGVyRXh9IGZyb20gXCIuL2J5dGVkYW5jZS9UVFJlY29yZGVyRXhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWNvcmRlciAge1xyXG5cclxuICAgIHN0YXRpYyBfc0luc3RhbmNlICAgPSBudWxsOyAvL+mdmeaAgeWunuS+i1xyXG4gICAgX3JlY29yZGVyICAgICAgICAgICA9IG51bGw7IC8v5b2V5bGP5a6e5L6LXHJcbiAgICBfZW5hYmxlZCAgICAgICAgICAgID0gdHJ1ZTsgLy/mmK/lkKblhYHorrjlvZXlsY9cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRlciA9IG5ldyBUVFJlY29yZGVyRXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6UmVjb3JkZXJ7XHJcbiAgICAgICAgaWYgKFJlY29yZGVyLl9zSW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBSZWNvcmRlci5fc0luc3RhbmNlID0gbmV3IFJlY29yZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBSZWNvcmRlci5fc0luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZGVyKXtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5PmnZ/lvZXlsY9cclxuICAgICAqL1xyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmRlcil7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmoLlgZxcclxuICAgICAqL1xyXG4gICAgcGF1c2UoKXtcclxuICAgICAgICBpZiAodGhpcy5fcmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmgaLlpI1cclxuICAgICAqL1xyXG4gICAgcmVzdW1lKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOijgeWJqlxyXG4gICAgICovXHJcbiAgICBjbGlwKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLmNsaXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIbkuqvop4bpopFcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayA6IOWIhuS6q+eahOWbnuiwg+WHveaVsFxyXG4gICAgICovXHJcbiAgICBzaGFyZVZpZGVvKGNhbGxiYWNrPW51bGwpe1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5zaGFyZVZpZGVvKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblhYHorrjlvZXlsY9cclxuICAgICAqL1xyXG4gICAgZW5hYmxlZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==