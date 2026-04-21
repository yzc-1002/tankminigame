"use strict";
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