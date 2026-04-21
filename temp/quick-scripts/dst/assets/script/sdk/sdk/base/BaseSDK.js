
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/base/BaseSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcYmFzZVxcQmFzZVNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0lBRUksaUJBQVksR0FBRztRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVELHdCQUFNLEdBQU4sVUFBTyxHQUFRO1FBQ1gsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVNESyB7XHJcbiAgICBwcm90ZWN0ZWQgc2RrOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihzZGspIHtcclxuICAgICAgICB0aGlzLnNldFNESyhzZGspXHJcbiAgICB9XHJcblxyXG4gICAgc2V0U0RLKHNkazogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZGsgPSBzZGs7XHJcbiAgICB9XHJcbn0iXX0=