"use strict";
cc._RF.push(module, '1320cHWXIJHbIB2uNbyxzgW', 'BaseShare');
// script/sdk/sdk/base/BaseShare.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseShare = void 0;
var SDKConfig_1 = require("../SDKConfig");
var BaseShare = /** @class */ (function () {
    function BaseShare(channel) {
        this.state = SDKConfig_1.SDKState.close;
        this.callback = null;
        this.channel = channel;
    }
    BaseShare.prototype.getShareInfo = function (shareTicket, func) { };
    return BaseShare;
}());
exports.BaseShare = BaseShare;

cc._RF.pop();