"use strict";
cc._RF.push(module, 'c6336oumGpJO5cAryKABjdb', 'BaseSDK');
// script/sdk/sdk/base/BaseSDK.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseSDK = /** @class */ (function () {
    function BaseSDK(sdk) {
        this.setSDK(sdk);
    }
    BaseSDK.prototype.setSDK = function (sdk) {
        this.sdk = sdk;
    };
    return BaseSDK;
}());
exports.default = BaseSDK;

cc._RF.pop();