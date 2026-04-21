
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseSubPackage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e5e6ErNQVCdbOnOCgox6Up', 'BaseSubPackage');
// script/sdk/sdk/base/BaseSubPackage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDKConfig_1 = require("../SDKConfig");
var BaseSubPackage = /** @class */ (function () {
    function BaseSubPackage(channel) {
        this.channel = channel;
    }
    /**
     * 加载单个分包
     * @param name
     * @param callback
     */
    BaseSubPackage.prototype.loadSingle = function (name, callback) {
    };
    /**
     * 根据给定的分包列表加载
     * @param subNames
     * @param callback
     */
    BaseSubPackage.prototype.loadList = function (subNames, callback) {
        var _this = this;
        this.loadSingle(subNames.shift(), function (state, progress) {
            switch (state) {
                case SDKConfig_1.ResultState.YES:
                    if (_this.subNames.length > 0) {
                        _this.loadList(subNames, callback);
                    }
                    else {
                        callback(state, progress);
                    }
                    break;
                case SDKConfig_1.ResultState.NO:
                    callback(state, progress);
                    break;
                case SDKConfig_1.ResultState.PROGRESS:
                    callback(state, progress);
                    break;
            }
        });
    };
    return BaseSubPackage;
}());
exports.default = BaseSubPackage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZVN1YlBhY2thZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBeUQ7QUFHekQ7SUFRSSx3QkFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG1DQUFVLEdBQVYsVUFBVyxJQUFZLEVBQUUsUUFBc0I7SUFFL0MsQ0FBQztJQUdEOzs7O09BSUc7SUFDSCxpQ0FBUSxHQUFSLFVBQVMsUUFBa0IsRUFBRSxRQUFzQjtRQUFuRCxpQkFtQkM7UUFsQkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxLQUFrQixFQUFFLFFBQVE7WUFDM0QsUUFBUSxLQUFLLEVBQUU7Z0JBQ1gsS0FBSyx1QkFBVyxDQUFDLEdBQUc7b0JBQ2hCLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtxQkFDcEM7eUJBQUk7d0JBQ0QsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtxQkFDNUI7b0JBQ0QsTUFBTTtnQkFDVixLQUFLLHVCQUFXLENBQUMsRUFBRTtvQkFDZixRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO29CQUN6QixNQUFNO2dCQUNWLEtBQUssdUJBQVcsQ0FBQyxRQUFRO29CQUNyQixRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO29CQUN6QixNQUFNO2FBQ2I7UUFFTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxxQkFBQztBQUFELENBL0NBLEFBK0NDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXN1bHRTdGF0ZSwgRGF0YUNhbGxiYWNrIH0gZnJvbSBcIi4uL1NES0NvbmZpZ1wiO1xyXG5pbXBvcnQgQmFzZUNoYW5uZWwgZnJvbSBcIi4vQmFzZUNoYW5uZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VTdWJQYWNrYWdlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3ViTmFtZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIHByb3RlY3RlZCBjYWxsYmFjazogRGF0YUNhbGxiYWNrO1xyXG5cclxuICAgIHByb3RlY3RlZCBjaGFubmVsOiBCYXNlQ2hhbm5lbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsOiBCYXNlQ2hhbm5lbCkge1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3ljZXkuKrliIbljIVcclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBsb2FkU2luZ2xlKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IERhdGFDYWxsYmFjaykge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7nu5nlrprnmoTliIbljIXliJfooajliqDovb1cclxuICAgICAqIEBwYXJhbSBzdWJOYW1lcyBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgbG9hZExpc3Qoc3ViTmFtZXM6IHN0cmluZ1tdLCBjYWxsYmFjazogRGF0YUNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkU2luZ2xlKHN1Yk5hbWVzLnNoaWZ0KCksIChzdGF0ZTogUmVzdWx0U3RhdGUsIHByb2dyZXNzKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgUmVzdWx0U3RhdGUuWUVTOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1Yk5hbWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTGlzdChzdWJOYW1lcywgY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHN0YXRlLCBwcm9ncmVzcylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJlc3VsdFN0YXRlLk5POlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHN0YXRlLCBwcm9ncmVzcylcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUmVzdWx0U3RhdGUuUFJPR1JFU1M6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soc3RhdGUsIHByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19