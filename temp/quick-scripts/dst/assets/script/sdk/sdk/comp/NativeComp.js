
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/NativeComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e13e3wJeFJC/reKX1GgxvJF', 'NativeComp');
// script/sdk/sdk/comp/NativeComp.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SDKManager_1 = require("../SDKManager");
var NativeAdItemView_1 = require("./NativeAdItemView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var NativeComp = /** @class */ (function (_super) {
    __extends(NativeComp, _super);
    function NativeComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adSite = 0;
        _this.nativeAdItemView = null;
        _this.pageView = null;
        return _this;
    }
    NativeComp.prototype.start = function () {
        var _this = this;
        SDKManager_1.default.getChannel().showNativeAd(this.adSite, function (list) {
            if (list.length > 0) {
                for (var index = 0; index < list.length; index++) {
                    var item = list[index];
                    var node = cc.instantiate(_this.nativeAdItemView);
                    var comp = node.getComponent(NativeAdItemView_1.default);
                    _this.pageView.addPage(node);
                    if (comp) {
                        comp.setModel(item);
                    }
                }
            }
        });
    };
    NativeComp.prototype.onDestroy = function () {
        SDKManager_1.default.getChannel().hideNativeAd();
    };
    NativeComp.prototype.onButtonClick = function () {
    };
    __decorate([
        property
    ], NativeComp.prototype, "adSite", void 0);
    __decorate([
        property(cc.Prefab)
    ], NativeComp.prototype, "nativeAdItemView", void 0);
    __decorate([
        property(cc.PageView)
    ], NativeComp.prototype, "pageView", void 0);
    NativeComp = __decorate([
        ccclass
    ], NativeComp);
    return NativeComp;
}(cc.Component));
exports.default = NativeComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcTmF0aXZlQ29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFFdkMsdURBQWtEO0FBRTVDLElBQUEsS0FBMEMsRUFBRSxDQUFDLFVBQVUsRUFBckQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsZ0JBQWdCLHNCQUFrQixDQUFDO0FBRzlEO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBb0NDO1FBakNHLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFHbkIsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBSW5DLGNBQVEsR0FBZ0IsSUFBSSxDQUFDOztJQTBCakMsQ0FBQztJQXhCRywwQkFBSyxHQUFMO1FBQUEsaUJBY0M7UUFiRyxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBNkI7WUFDNUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQzlDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDdEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtvQkFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFBO29CQUM5QyxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDM0IsSUFBSSxJQUFJLEVBQUU7d0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtxQkFDdEI7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDSSxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQzFDLENBQUM7SUFFRCxrQ0FBYSxHQUFiO0lBRUEsQ0FBQztJQS9CRDtRQURDLFFBQVE7OENBQ1U7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDZTtJQUluQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2dEQUNPO0lBVlosVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW9DOUI7SUFBRCxpQkFBQztDQXBDRCxBQW9DQyxDQXBDdUMsRUFBRSxDQUFDLFNBQVMsR0FvQ25EO2tCQXBDb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTREtNYW5hZ2VyIGZyb20gXCIuLi9TREtNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNlTmF0aXZlQWRJdGVtTW9kZWwgZnJvbSBcIi4uL2Jhc2UvQmFzZU5hdGl2ZUFkSXRlbU1vZGVsXCI7XHJcbmltcG9ydCBOYXRpdmVBZEl0ZW1WaWV3IGZyb20gXCIuL05hdGl2ZUFkSXRlbVZpZXdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIHJlcXVpcmVDb21wb25lbnQgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXRpdmVDb21wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFkU2l0ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbmF0aXZlQWRJdGVtVmlldzogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlBhZ2VWaWV3KVxyXG4gICAgcGFnZVZpZXc6IGNjLlBhZ2VWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5zaG93TmF0aXZlQWQodGhpcy5hZFNpdGUsIChsaXN0OiBCYXNlTmF0aXZlQWRJdGVtTW9kZWxbXSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGxpc3RbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5hdGl2ZUFkSXRlbVZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXAgPSBub2RlLmdldENvbXBvbmVudChOYXRpdmVBZEl0ZW1WaWV3KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuYWRkUGFnZShub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXAuc2V0TW9kZWwoaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgU0RLTWFuYWdlci5nZXRDaGFubmVsKCkuaGlkZU5hdGl2ZUFkKClcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1dHRvbkNsaWNrKCkge1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19