"use strict";
cc._RF.push(module, '8c1f19qe99Opa5d656lzl9Q', 'DevChannel');
// script/sdk/sdk/dev/DevChannel.ts

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
var BaseChannel_1 = require("../base/BaseChannel");
var DevChannel = /** @class */ (function (_super) {
    __extends(DevChannel, _super);
    function DevChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DevChannel;
}(BaseChannel_1.default));
exports.default = DevChannel;

cc._RF.pop();