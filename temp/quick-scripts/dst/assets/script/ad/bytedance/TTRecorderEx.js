
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/bytedance/TTRecorderEx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcYnl0ZWRhbmNlXFxUVFJlY29yZGVyRXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFRSTtRQU5BLGNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBTyxJQUFJO1FBQzVCLGVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBSyxLQUFLO1FBQzdCLFVBQUssR0FBRyxDQUFDLENBQUMsQ0FBYyxNQUFNO1FBQzlCLFVBQUssR0FBRyxFQUFFLENBQUMsQ0FBYSxNQUFNO1FBQzlCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDLENBQU0sbUJBQW1CO1FBR3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFN0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUc7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFT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QVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDVCxLQUFLLEVBQUUsTUFBTTtxQkFDaEIsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDRixDQUFDO1lBQ0osc0NBQXNDO1lBQ3RDLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQWpKQSxBQWlKQyxJQUFBO0FBakpZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRUUmVjb3JkZXJFeCB7XHJcblxyXG4gICAgX3JlY29yZGVyID0gbnVsbDsgICAgICAgLy/lrp7kvotcclxuICAgIF9yZWNvcmRpbmcgPSBmYWxzZTsgICAgIC8v5b2V5bGP5LitXHJcbiAgICBfdGltZSA9IDA7ICAgICAgICAgICAgICAvL+W9leWxj+aXtumXtFxyXG4gICAgX3BhdGggPSAnJzsgICAgICAgICAgICAgLy/lvZXlsY/lnLDlnYBcclxuICAgIF9yZWNvcmRlclR5cGUgPSAwOyAgICAgIC8vMCDnqbrpl7IgMSDmraPlnKjlvZXliLYgMiDmmoLlgZzkuK1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9yZWNvcmRlciA9IHR0LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fcmVjb3JkZXIub25TdGFydCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvblN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2VsZi5fcmVjb3JkZXJUeXBlID0gMTtcclxuICAgICAgICAgICAgc2VsZi5fdGltZSA9IDA7XHJcbiAgICAgICAgICAgIHNlbGYuX3BhdGggPSAnJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVjb3JkZXIub25TdG9wKChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uU3RvcCcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgc2VsZi5fcmVjb3JkZXJUeXBlID0gMDtcclxuICAgICAgICAgICAgc2VsZi5fcGF0aCA9IHJlcy52aWRlb1BhdGg7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlY29yZGVyLm9uUGF1c2UoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25QYXVzZScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgc2VsZi5fcmVjb3JkZXJUeXBlID0gMjtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9yZWNvcmRlci5vblJlc3VtZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvblJlc3VtZScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgc2VsZi5fcmVjb3JkZXJUeXBlID0gMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9yZWNvcmRlci5vbkludGVycnVwdGlvbkJlZ2luKChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uSW50ZXJydXB0aW9uQmVnaW4nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuX3JlY29yZGVyVHlwZSA9IDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcmVjb3JkZXIub25JbnRlcnJ1cHRpb25FbmQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25JbnRlcnJ1cHRpb25FbmQnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuX3JlY29yZGVyVHlwZSA9IDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcmVjb3JkZXIub25FcnJvcigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkVycm9yJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2VsZi5fcmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuX3JlY29yZGVyVHlwZSA9IDA7XHJcbiAgICAgICAgICAgIHNlbGYuX3RpbWUgPSAwO1xyXG4gICAgICAgICAgICBzZWxmLl9wYXRoID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vlvZXlsY9cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZGluZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5zdGFydCh7ZHVyYXRpb246IDMwMH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+e7k+adn+W9leWxj1xyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLnN0b3AoKTtcclxuXHJcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLl90aW1lLHRoaXMuX3BhdGgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pqC5YGcXHJcbiAgICBwYXVzZSgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mgaLlpI1cclxuICAgIHJlc3VtZSgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+ijgeWJqlxyXG4gICAgY2xpcCgpe1xyXG4gICAgICAgIC8vIGlmICh0aGlzLl9yZWNvcmRlcikge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLmNsaXBWaWRlbyh7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBzZWxmLl9wYXRoLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgLy8g55Sx5byA5aeLNeenkiAr5pyA5ZCOMTDnp5Ig5ou85o6l5ZCI5oiQ55qE6KeG6aKRXHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGlwICcgKyByZXMudmlkZW9QYXRoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKGUpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignY2xpcCAnICsgZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liIbkuqvop4bpopFcclxuICAgIHNoYXJlVmlkZW8oY2FsbGJhY2spe1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXRoICE9ICcnKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgY2hhbm5lbDogXCJ2aWRlb1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5b+r5p2l5ZKM5oiR5LiA6LW3546p6ICNXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuW/q+adpeWSjOaIkeS4gOi1t+eOqeiAjVwiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUlkOiBcIlwiLCAvLyDmm7/mjaLmiJDpgJrov4flrqHmoLjnmoTliIbkuqtJRFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBleHRyYToge1xyXG4gICAgICAgICAgICAgICAgICB2aWRlb1BhdGg6IHRoaXMuX3BhdGgsIC8vIOWPr+abv+aNouaIkOW9leWxj+W+l+WIsOeahOinhumikeWcsOWdgFxyXG4gICAgICAgICAgICAgICAgLy8gICB2aWRlb1RvcGljczogW1wi6K+d6aKYMVwiLCBcIuivnemimDJcIl0sIC8v6K+l5a2X5q615bey57uP6KKraGFzaHRhZ19saXN05Luj5pu/77yM5Li65L+d6K+B5YW85a655oCn77yM5bu66K6u5Lik5Liq6YO95aGr5YaZ44CCXHJcbiAgICAgICAgICAgICAgICAvLyAgIGhhc2h0YWdfbGlzdDogW1wi6K+d6aKYMVwiLCBcIuivnemimDJcIl0sXHJcbiAgICAgICAgICAgICAgICAvLyAgIHZpZGVvX3RpdGxlOiBcIuaIkeWSjFhYWCDkuIDotbflkIjllLHkuobvvIzlpb3lkKzlkJfvvJ9cIiwgLy/nlJ/miJDnmoTpu5jorqTlhoXlrrlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5oiQ5YqfIFwiLEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvop4bpopHlpLHotKUgXCIsSlNPTi5zdHJpbmdpZnkoZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0dC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLliIbkuqvlpLHotKVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2UoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==