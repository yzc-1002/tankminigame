
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/base/BaseComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e9b8fq2vVGVIafsHHtKZTM', 'BaseComponent');
// script/base/BaseComponent.ts

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
exports.BaseComponent = void 0;
var LinkPrefab_1 = require("./LinkPrefab");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fire = {}; //保存所有从ui布局文件中解析出来的节点
        return _this;
    }
    BaseComponent.prototype.__preload = function () {
        Utils_1.Utils._initBaseSize();
        // cc.log("BaseScript __preload start");
        this._bind(this.node);
        // cc.log("BaseScript __preload end");
    };
    //绑定
    BaseComponent.prototype._bind = function (node) {
        var _this = this;
        var changeZindex = 0;
        this._bindComponent(node);
        node.children.forEach(function (child) {
            var name = child.name;
            //动态调整zindex
            child.zIndex = changeZindex;
            changeZindex = changeZindex + 10;
            // cc.log("    " + name,child.zIndex);
            // child.rootNode = this.node;
            //名字前缀是_的导出
            if (name[0] == "_") {
                if (_this._fire[name]) {
                    cc.warn("BaseComponent WARNNING : [" + name + "(" + node.parent.name + ")] is already exists!");
                }
                _this._fire[name] = child;
            }
            _this._bind(child);
        });
    };
    //绑定组件至节点
    BaseComponent.prototype._bindComponent = function (node) {
        var _this = this;
        node._components.forEach(function (component) {
            var name = component.__classname__.replace("cc.", "");
            node["$" + name] = component;
            //如果节点挂了LinkPrefab组件,说明此节点是为了引用prefab而存在的
            if (component.__classname__ == "LinkPrefab") {
                node["__RootScript__"] = _this;
            }
        });
    };
    BaseComponent = __decorate([
        ccclass
    ], BaseComponent);
    return BaseComponent;
}(cc.Component));
exports.BaseComponent = BaseComponent;
// node.script可以获取第一个自定义脚本
cc.js.get(cc.Node.prototype, 'script', function () {
    var LinkPrefabScript = this.getComponent(LinkPrefab_1.LinkPrefab);
    if (LinkPrefabScript) {
        if (LinkPrefabScript._prefabNode) {
            return LinkPrefabScript._prefabNode.script;
        }
    }
    return this.getComponent(BaseComponent);
}, true, true);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxCYXNlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsaUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW1DLGlDQUFZO0lBQS9DO1FBQUEscUVBaURDO1FBL0NJLFdBQUssR0FBUyxFQUFFLENBQUMsQ0FBTSxxQkFBcUI7O0lBK0NqRCxDQUFDO0lBN0NHLGlDQUFTLEdBQVQ7UUFDSSxhQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLHNDQUFzQztJQUMxQyxDQUFDO0lBRUQsSUFBSTtJQUNKLDZCQUFLLEdBQUwsVUFBTSxJQUFJO1FBQVYsaUJBc0JDO1FBckJHLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUN4QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBRXRCLFlBQVk7WUFDWixLQUFLLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztZQUM1QixZQUFZLEdBQUcsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUNqQyxzQ0FBc0M7WUFFdEMsOEJBQThCO1lBQzlCLFdBQVc7WUFDWCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbEIsRUFBRSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDLENBQUM7aUJBQ25HO2dCQUNELEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1lBQ0QsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTO0lBQ1Qsc0NBQWMsR0FBZCxVQUFlLElBQUk7UUFBbkIsaUJBVUM7UUFURyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDL0IsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBRTdCLHlDQUF5QztZQUN6QyxJQUFJLFNBQVMsQ0FBQyxhQUFhLElBQUksWUFBWSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxLQUFJLENBQUM7YUFDakM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEvQ1EsYUFBYTtRQUR6QixPQUFPO09BQ0ssYUFBYSxDQWlEekI7SUFBRCxvQkFBQztDQWpERCxBQWlEQyxDQWpEa0MsRUFBRSxDQUFDLFNBQVMsR0FpRDlDO0FBakRZLHNDQUFhO0FBb0QxQiwwQkFBMEI7QUFDMUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFO0lBQ25DLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBVSxDQUFDLENBQUM7SUFDckQsSUFBSSxnQkFBZ0IsRUFBRTtRQUNsQixJQUFJLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtZQUM5QixPQUFPLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDOUM7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM1QyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaW5rUHJlZmFifSBmcm9tIFwiLi9MaW5rUHJlZmFiXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBCYXNlQ29tcG9uZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAgX2ZpcmUgOiBhbnkgPSB7fTsgICAgICAvL+S/neWtmOaJgOacieS7jnVp5biD5bGA5paH5Lu25Lit6Kej5p6Q5Ye65p2l55qE6IqC54K5XHJcblxyXG4gICAgX19wcmVsb2FkKCkge1xyXG4gICAgICAgIFV0aWxzLl9pbml0QmFzZVNpemUoKTtcclxuICAgICAgICAvLyBjYy5sb2coXCJCYXNlU2NyaXB0IF9fcHJlbG9hZCBzdGFydFwiKTtcclxuICAgICAgICB0aGlzLl9iaW5kKHRoaXMubm9kZSk7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiQmFzZVNjcmlwdCBfX3ByZWxvYWQgZW5kXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+e7keWumlxyXG4gICAgX2JpbmQobm9kZSkge1xyXG4gICAgICAgIGxldCBjaGFuZ2VaaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuX2JpbmRDb21wb25lbnQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGNoaWxkLm5hbWU7XHJcblxyXG4gICAgICAgICAgICAvL+WKqOaAgeiwg+aVtHppbmRleFxyXG4gICAgICAgICAgICBjaGlsZC56SW5kZXggPSBjaGFuZ2VaaW5kZXg7XHJcbiAgICAgICAgICAgIGNoYW5nZVppbmRleCA9IGNoYW5nZVppbmRleCArIDEwO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCIgICAgXCIgKyBuYW1lLGNoaWxkLnpJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGlsZC5yb290Tm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgLy/lkI3lrZfliY3nvIDmmK9f55qE5a+85Ye6XHJcbiAgICAgICAgICAgIGlmIChuYW1lWzBdID09IFwiX1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmlyZVtuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJCYXNlQ29tcG9uZW50IFdBUk5OSU5HIDogW1wiICsgbmFtZSArIFwiKFwiICsgbm9kZS5wYXJlbnQubmFtZSArIFwiKV0gaXMgYWxyZWFkeSBleGlzdHMhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZVtuYW1lXSA9IGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2JpbmQoY2hpbGQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/nu5Hlrprnu4Tku7boh7PoioLngrlcclxuICAgIF9iaW5kQ29tcG9uZW50KG5vZGUpIHsgXHJcbiAgICAgICAgbm9kZS5fY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBjb21wb25lbnQuX19jbGFzc25hbWVfXy5yZXBsYWNlKFwiY2MuXCIsXCJcIik7XHJcbiAgICAgICAgICAgIG5vZGVbXCIkXCIgKyBuYW1lXSA9IGNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgICAgIC8v5aaC5p6c6IqC54K55oyC5LqGTGlua1ByZWZhYue7hOS7tizor7TmmI7mraToioLngrnmmK/kuLrkuoblvJXnlKhwcmVmYWLogIzlrZjlnKjnmoRcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5fX2NsYXNzbmFtZV9fID09IFwiTGlua1ByZWZhYlwiKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlW1wiX19Sb290U2NyaXB0X19cIl0gPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuLy8gbm9kZS5zY3JpcHTlj6/ku6Xojrflj5bnrKzkuIDkuKroh6rlrprkuYnohJrmnKxcclxuY2MuanMuZ2V0KGNjLk5vZGUucHJvdG90eXBlLCAnc2NyaXB0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IExpbmtQcmVmYWJTY3JpcHQgPSB0aGlzLmdldENvbXBvbmVudChMaW5rUHJlZmFiKTtcclxuICAgIGlmIChMaW5rUHJlZmFiU2NyaXB0KSB7XHJcbiAgICAgICAgaWYgKExpbmtQcmVmYWJTY3JpcHQuX3ByZWZhYk5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIExpbmtQcmVmYWJTY3JpcHQuX3ByZWZhYk5vZGUuc2NyaXB0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmdldENvbXBvbmVudChCYXNlQ29tcG9uZW50KTtcclxufSx0cnVlLHRydWUpOyJdfQ==