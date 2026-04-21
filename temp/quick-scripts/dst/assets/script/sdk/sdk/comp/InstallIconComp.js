
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/InstallIconComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b40c9rO1iJJxKjy/wv6WQWD', 'InstallIconComp');
// script/sdk/sdk/comp/InstallIconComp.ts

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
var SDKConfig_1 = require("../SDKConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InstallIconComp = /** @class */ (function (_super) {
    __extends(InstallIconComp, _super);
    function InstallIconComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.callback = new cc.Component.EventHandler();
        return _this;
    }
    InstallIconComp.prototype.start = function () {
        var _this = this;
        SDKManager_1.default.getChannel().canInstallShortcut(function (result) {
            _this.node.active = result == SDKConfig_1.ResultState.NO ? false : true;
            if (_this.node.active) {
                _this.node.on(cc.Node.EventType.TOUCH_END, _this.onButtonClick, _this);
            }
        });
    };
    InstallIconComp.prototype.onButtonClick = function () {
        var _this = this;
        SDKManager_1.default.getChannel().installShortcut(function (result) {
            _this.node.active = result == SDKConfig_1.ResultState.YES ? false : true;
            cc.log(' this.node.active ', _this.node.active);
            _this.callback.emit([result]);
        });
    };
    __decorate([
        property({
            type: cc.Component.EventHandler,
            displayName: "回调函数"
        })
    ], InstallIconComp.prototype, "callback", void 0);
    InstallIconComp = __decorate([
        ccclass
    ], InstallIconComp);
    return InstallIconComp;
}(cc.Component));
exports.default = InstallIconComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcSW5zdGFsbEljb25Db21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUN2QywwQ0FBMkM7QUFFckMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUE0QkM7UUFyQkcsY0FBUSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFxQi9DLENBQUM7SUFwQkcsK0JBQUssR0FBTDtRQUFBLGlCQVFDO1FBUEcsb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFDLE1BQW1CO1lBQzNELEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSx1QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDMUQsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLENBQUE7YUFDdEU7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFJRCx1Q0FBYSxHQUFiO1FBQUEsaUJBTUM7UUFMRyxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFDLE1BQW1CO1lBQ3hELEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSx1QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDM0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBQyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuQkQ7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZO1lBQy9CLFdBQVcsRUFBRSxNQUFNO1NBQ3RCLENBQUM7cURBQ3lDO0lBUDFCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0E0Qm5DO0lBQUQsc0JBQUM7Q0E1QkQsQUE0QkMsQ0E1QjRDLEVBQUUsQ0FBQyxTQUFTLEdBNEJ4RDtrQkE1Qm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi4vU0RLTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZXN1bHRTdGF0ZSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnN0YWxsSWNvbkNvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5Zue6LCD5Ye95pWwXCJcclxuICAgIH0pXHJcbiAgICBjYWxsYmFjayA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5jYW5JbnN0YWxsU2hvcnRjdXQoKHJlc3VsdDogUmVzdWx0U3RhdGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHJlc3VsdCA9PSBSZXN1bHRTdGF0ZS5OTyA/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkJ1dHRvbkNsaWNrLCB0aGlzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgb25CdXR0b25DbGljaygpIHtcclxuICAgICAgICBTREtNYW5hZ2VyLmdldENoYW5uZWwoKS5pbnN0YWxsU2hvcnRjdXQoKHJlc3VsdDogUmVzdWx0U3RhdGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHJlc3VsdCA9PSBSZXN1bHRTdGF0ZS5ZRVMgPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgY2MubG9nKCcgdGhpcy5ub2RlLmFjdGl2ZSAnLHRoaXMubm9kZS5hY3RpdmUpXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suZW1pdChbcmVzdWx0XSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19