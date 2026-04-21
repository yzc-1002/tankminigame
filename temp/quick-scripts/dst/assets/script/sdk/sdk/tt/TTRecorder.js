
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/tt/TTRecorder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcdHRcXFRUUmVjb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDBDQUF3QztBQUV4Qzs7R0FFRztBQUNIO0lBQXdDLDhCQUFZO0lBR2hEO1FBQUEsWUFDSSxpQkFBTyxTQW1DVjtRQXJDUyxZQUFNLEdBQVksSUFBSSxDQUFDO1FBRzdCLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDNUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvQixnQkFBZ0I7UUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFDRixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7WUFDcEIsOEJBQThCO1lBQzlCLGdCQUFnQjtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxFQUFFO29CQUNILHFCQUFxQjtvQkFDckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFBO29CQUM1QixJQUFJO2lCQUNQO3FCQUFNO29CQUNILEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2lCQUN6QjtnQkFFRCxLQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDcEMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUVGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQTtRQUNGLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQTtRQUVGLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUE7O0lBQ04sQ0FBQztJQUdELDhCQUFTLEdBQVQsVUFBVSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQWM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxTQUFTO1lBQ25CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxVQUFDLENBQUM7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNYLENBQUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2QsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRCwrQkFBVSxHQUFWLFVBQVcsSUFBSTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ3JCLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEIsT0FBTyxFQUFFLFVBQUMsQ0FBQztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFFLFNBQVM7Z0JBRS9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNYLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBQ0Qsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFFBQVEsRUFBRSxHQUFHO1NBQ2hCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRCx5QkFBSSxHQUFKLFVBQUssTUFBc0I7UUFBdEIsdUJBQUEsRUFBQSxhQUFzQjtRQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNoQixPQUFPO1NBQ1Y7UUFDRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDJCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTCxpQkFBQztBQUFELENBaEdBLEFBZ0dDLENBaEd1QyxzQkFBWSxHQWdHbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVJlY29yZGVyIGZyb20gXCIuLi9iYXNlL0Jhc2VSZWNvcmRlclwiO1xyXG5pbXBvcnQgeyBTREtTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuXHJcbi8qKlxyXG4gKiBodHRwczovL21pY3JvYXBwLmJ5dGVkYW5jZS5jb20vZGV2L2NuL21pbmktZ2FtZS9kZXZlbG9wL29wZW4tY2FwYWNpdHkvdmlkZW8tY2FtZXJhL3JlcXVlc3QtbWV0aG9kXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUVFJlY29yZGVyIGV4dGVuZHMgQmFzZVJlY29yZGVyIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaXNTYXZlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRlciA9IHR0LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnJlY29yZGVyLm9uU3RhcnQocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9leWxj+W8gOWniycsIHJlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoU0RLU3RhdGUub3BlbilcclxuICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5lO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZWNvcmRlci5vblN0b3AocmVzID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnZpZGVvUGF0aCk7XHJcbiAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9leWxj+e7k+adnycsIHJlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpcFZpZGVvKHJlcywgWzE1LCAwXSwgKHIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuaXNTYXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb1BhdGggPSByLnZpZGVvUGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb1BhdGggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoU0RLU3RhdGUuY2xvc2UpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5yZWNvcmRlci5vblJlc3VtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUVFJlY29yZGVyIG9uUmVzdW1lJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnJlY29yZGVyLm9uUGF1c2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVFRSZWNvcmRlciBvblB1YXNlJyk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5yZWNvcmRlci5vbkVycm9yKChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RUUmVjb3JkZXIgb25QdWFzZScpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvUGF0aCA9IG51bGw7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xpcFZpZGVvKHJlcywgdGltZVJhbmdlLCBmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucmVjb3JkZXIuY2xpcFZpZGVvKHtcclxuICAgICAgICAgICAgcGF0aDogcmVzLnZpZGVvUGF0aCxcclxuICAgICAgICAgICAgdGltZVJhbmdlOiB0aW1lUmFuZ2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyLnZpZGVvUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBmdW5jKHIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZ1bmMobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlY29yZENsaXAoZnVuYykge1xyXG4gICAgICAgIHRoaXMucmVjb3JkZXIucmVjb3JkQ2xpcCh7XHJcbiAgICAgICAgICAgIHRpbWVSYW5nZTogWzMwLCAwXSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHIuaW5kZXgpICAvLyDoo4HliarllK/kuIDntKLlvJVcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jKHIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5jaGFuZ2VTdGF0ZShJdGVtU3RhdGUuR09UKVxyXG4gICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0b3AoaXNTYXZlOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ2xvc2UoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuY2hhbmdlU3RhdGUoSXRlbVN0YXRlLk5PVF9HRVQpXHJcbiAgICAgICAgdGhpcy5pc1NhdmUgPSBpc1NhdmU7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRlci5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRlci5wYXVzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3VtZSgpIHtcclxuICAgICAgICB0aGlzLnJlY29yZGVyLnJlc3VtZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=