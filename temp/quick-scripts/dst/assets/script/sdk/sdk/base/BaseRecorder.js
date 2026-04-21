
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseRecorder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZVJlY29yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXdDO0FBSXhDO0lBQUE7UUFLYyxjQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLFVBQUssR0FBYSxvQkFBUSxDQUFDLEtBQUssQ0FBQTtJQWdDOUMsQ0FBQztJQS9CRyw0QkFBSyxHQUFMLFVBQU0sR0FBUyxJQUFJLENBQUM7SUFDcEIsNEJBQUssR0FBTCxjQUFVLENBQUM7SUFDWCw2QkFBTSxHQUFOLGNBQVcsQ0FBQztJQUNaLDJCQUFJLEdBQUosVUFBSyxNQUFzQjtRQUF0Qix1QkFBQSxFQUFBLGFBQXNCO0lBQUksQ0FBQztJQUNoQyxXQUFXO0lBQ1gsaUNBQVUsR0FBVixVQUFXLE1BQU0sSUFBSSxDQUFDO0lBRXRCLGtDQUFXLEdBQVgsVUFBWSxDQUFDO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELG1DQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELDRCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxvQkFBUSxDQUFDLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsOEJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxvQkFBUSxDQUFDLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQXZDQSxBQXVDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU0RLU3RhdGUgfSBmcm9tIFwiLi4vU0RLQ29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VSZWNvcmRlciB7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCByZWNvcmRlcjogYW55O1xyXG5cclxuICAgIHByb3RlY3RlZCB2aWRlb1BhdGg6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXRlOiBTREtTdGF0ZSA9IFNES1N0YXRlLmNsb3NlXHJcbiAgICBzdGFydChvYmo/OiBhbnkpIHsgfVxyXG4gICAgcGF1c2UoKSB7IH1cclxuICAgIHJlc3VtZSgpIHsgfVxyXG4gICAgc3RvcChpc1NhdmU6IGJvb2xlYW4gPSB0cnVlKSB7IH1cclxuICAgIC8v6K6w5b2V57K+5b2p55qE6KeG6aKR54mH5q61XHJcbiAgICByZWNvcmRDbGlwKG9iamVjdCkgeyB9XHJcblxyXG4gICAgY2hhbmdlU3RhdGUocykge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpZGVvUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aWRlb1BhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlb1BhdGggPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT3BlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PSBTREtTdGF0ZS5vcGVuO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ2xvc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT0gU0RLU3RhdGUuY2xvc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==