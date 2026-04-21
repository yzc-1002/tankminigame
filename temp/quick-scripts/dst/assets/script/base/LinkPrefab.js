
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/base/LinkPrefab.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2a5a9mBx69AKYA5qQIPfsGf', 'LinkPrefab');
// script/base/LinkPrefab.ts

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
exports.LinkPrefab = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, executeInEditMode = _a.executeInEditMode, property = _a.property;
// 屏蔽2.3.1版本prefab嵌套prefab的弹框问题
if (CC_EDITOR && !window["Editor"].isBuilder) {
    window["_Scene"].DetectConflict.beforeAddChild = function () {
        return false;
    };
}
var LinkPrefab = /** @class */ (function (_super) {
    __extends(LinkPrefab, _super);
    function LinkPrefab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._prefabNode = null;
        _this._prefab = null;
        return _this;
    }
    Object.defineProperty(LinkPrefab.prototype, "prefab", {
        get: function () {
            //编辑器状态下,此函数每帧都会调用,所以在这里做动态处理
            if (CC_EDITOR) {
                //编辑器状态下,此节点不能隐藏,锚点和尺寸不能修改
                this.node.active = true;
                if (this._prefabNode) {
                    this.node.setContentSize(this._prefabNode.getContentSize());
                    this.node.anchorX = this._prefabNode.anchorX;
                    this.node.anchorY = this._prefabNode.anchorY;
                }
            }
            return this._prefab;
        },
        set: function (value) {
            this._onPrefabChanged(this._prefab, value);
        },
        enumerable: false,
        configurable: true
    });
    LinkPrefab.prototype._onPrefabChanged = function (oldValue, newValue) {
        if (this._prefabNode) {
            this._prefabNode.destroy();
            this._prefabNode = null;
        }
        this._prefab = newValue;
        if (newValue) {
            var prefabNode = cc.instantiate(newValue);
            if (prefabNode) {
                this._prefabNode = prefabNode;
                // cc.Object["Flags"].DontSave          // 当前节点不会被保存到prefab文件里
                // cc.Object["Flags"].LockedInEditor    // 当前节点及子节点在编辑器里不会被点击到
                // cc.Object["Flags"].HideInHierarchy   // 当前节点及子节点在编辑器里不显示
                prefabNode["_objFlags"] |= (cc.Object["Flags"].DontSave | cc.Object["Flags"].LockedInEditor | cc.Object["Flags"].HideInHierarchy);
                prefabNode.x = 0;
                prefabNode.y = 0;
                this.node.addChild(prefabNode, -1); // 添加到最底层
                prefabNode.name = "prefabNode";
                this.node.setContentSize(prefabNode.getContentSize());
                this.node.anchorX = prefabNode.anchorX;
                this.node.anchorY = prefabNode.anchorY;
            }
        }
    };
    LinkPrefab.prototype.onLoad = function () {
        this._initPrefab();
    };
    LinkPrefab.prototype._initPrefab = function () {
        if (!this._prefab || this._prefabNode) {
            return;
        }
        if (CC_EDITOR) {
            this._onPrefabChanged(null, this._prefab);
        }
        else {
            var prefabNode = cc.instantiate(this._prefab);
            if (prefabNode) {
                //复制属性
                prefabNode.x = this.node.x;
                prefabNode.y = this.node.y;
                prefabNode.scale = this.node.scale;
                prefabNode.y = this.node.y;
                prefabNode.angle = this.node.angle;
                prefabNode.opacity = this.node.opacity;
                prefabNode.zIndex = this.node.zIndex;
                prefabNode.parent = this.node.parent;
                prefabNode.name = this.node.name;
                // 更新this.node所在的根节点脚本对应ui树中的引用
                if (this.node["__RootScript__"]) {
                    if (this.node["__RootScript__"]["_fire"]) {
                        if (this.node["__RootScript__"]["_fire"][prefabNode.name]) {
                            this.node["__RootScript__"]["_fire"][prefabNode.name] = prefabNode;
                        }
                    }
                }
                this._prefabNode = prefabNode;
                this.node.destroy();
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], LinkPrefab.prototype, "_prefab", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "预制体" })
    ], LinkPrefab.prototype, "prefab", null);
    LinkPrefab = __decorate([
        ccclass,
        executeInEditMode
    ], LinkPrefab);
    return LinkPrefab;
}(cc.Component));
exports.LinkPrefab = LinkPrefab;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxMaW5rUHJlZmFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXlDLEVBQUUsQ0FBQyxVQUFVLEVBQXJELE9BQU8sYUFBQSxFQUFFLGlCQUFpQix1QkFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUU3RCwrQkFBK0I7QUFDL0IsSUFBSSxTQUFTLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFO0lBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxHQUFHO1FBQzdDLE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtDQUNKO0FBS0Q7SUFBZ0MsOEJBQVk7SUFBNUM7UUFBQSxxRUE2RkM7UUEzRlcsaUJBQVcsR0FBWSxJQUFJLENBQUE7UUFHM0IsYUFBTyxHQUFjLElBQUksQ0FBQTs7SUF3RnJDLENBQUM7SUFyRkcsc0JBQUksOEJBQU07YUFJVjtZQUNJLDZCQUE2QjtZQUM3QixJQUFJLFNBQVMsRUFBRTtnQkFDWCwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO29CQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztpQkFDaEQ7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUN2QixDQUFDO2FBaEJELFVBQVcs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TUFBTSxDQUFDO2dCQUNyQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNqQywrQkFBK0I7Z0JBQy9CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQzt5QkFDdEU7cUJBQ0o7aUJBQ0o7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkI7U0FDSjtJQUNMLENBQUM7SUF2RkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDYTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBQyxDQUFDOzRDQUc5RDtJQVZRLFVBQVU7UUFGdEIsT0FBTztRQUNQLGlCQUFpQjtPQUNMLFVBQVUsQ0E2RnRCO0lBQUQsaUJBQUM7Q0E3RkQsQUE2RkMsQ0E3RitCLEVBQUUsQ0FBQyxTQUFTLEdBNkYzQztBQTdGWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBleGVjdXRlSW5FZGl0TW9kZSwgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8vIOWxj+iUvTIuMy4x54mI5pyscHJlZmFi5bWM5aWXcHJlZmFi55qE5by55qGG6Zeu6aKYXHJcbmlmIChDQ19FRElUT1IgJiYgIXdpbmRvd1tcIkVkaXRvclwiXS5pc0J1aWxkZXIpIHtcclxuICAgIHdpbmRvd1tcIl9TY2VuZVwiXS5EZXRlY3RDb25mbGljdC5iZWZvcmVBZGRDaGlsZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuQGNjY2xhc3NcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbmV4cG9ydCBjbGFzcyBMaW5rUHJlZmFiIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVmYWJOb2RlOiBjYy5Ob2RlID0gbnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIF9wcmVmYWI6IGNjLlByZWZhYiA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLlByZWZhYiwgdmlzaWJsZTogdHJ1ZSwgZGlzcGxheU5hbWU6IFwi6aKE5Yi25L2TXCJ9KVxyXG4gICAgc2V0IHByZWZhYih2YWx1ZTogY2MuUHJlZmFiKSB7XHJcbiAgICAgICAgdGhpcy5fb25QcmVmYWJDaGFuZ2VkKHRoaXMuX3ByZWZhYiwgdmFsdWUpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHByZWZhYigpOiBjYy5QcmVmYWIge1xyXG4gICAgICAgIC8v57yW6L6R5Zmo54q25oCB5LiLLOatpOWHveaVsOavj+W4p+mDveS8muiwg+eUqCzmiYDku6XlnKjov5nph4zlgZrliqjmgIHlpITnkIZcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIC8v57yW6L6R5Zmo54q25oCB5LiLLOatpOiKgueCueS4jeiDvemakOiXjyzplJrngrnlkozlsLrlr7jkuI3og73kv67mlLlcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcmVmYWJOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fcHJlZmFiTm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmNob3JYID0gdGhpcy5fcHJlZmFiTm9kZS5hbmNob3JYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuY2hvclkgPSB0aGlzLl9wcmVmYWJOb2RlLmFuY2hvclk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWZhYlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29uUHJlZmFiQ2hhbmdlZChvbGRWYWx1ZTpjYy5QcmVmYWIsIG5ld1ZhbHVlOmNjLlByZWZhYikge1xyXG4gICAgICAgIGlmICh0aGlzLl9wcmVmYWJOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZWZhYk5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmVmYWJOb2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcHJlZmFiID0gbmV3VmFsdWVcclxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IHByZWZhYk5vZGUgPSBjYy5pbnN0YW50aWF0ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmKHByZWZhYk5vZGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlZmFiTm9kZSA9IHByZWZhYk5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2MuT2JqZWN0W1wiRmxhZ3NcIl0uRG9udFNhdmUgICAgICAgICAgLy8g5b2T5YmN6IqC54K55LiN5Lya6KKr5L+d5a2Y5YiwcHJlZmFi5paH5Lu26YeMXHJcbiAgICAgICAgICAgICAgICAvLyBjYy5PYmplY3RbXCJGbGFnc1wiXS5Mb2NrZWRJbkVkaXRvciAgICAvLyDlvZPliY3oioLngrnlj4rlrZDoioLngrnlnKjnvJbovpHlmajph4zkuI3kvJrooqvngrnlh7vliLBcclxuICAgICAgICAgICAgICAgIC8vIGNjLk9iamVjdFtcIkZsYWdzXCJdLkhpZGVJbkhpZXJhcmNoeSAgIC8vIOW9k+WJjeiKgueCueWPiuWtkOiKgueCueWcqOe8lui+keWZqOmHjOS4jeaYvuekulxyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZVtcIl9vYmpGbGFnc1wiXSB8PSAoY2MuT2JqZWN0W1wiRmxhZ3NcIl0uRG9udFNhdmUgfCBjYy5PYmplY3RbXCJGbGFnc1wiXS5Mb2NrZWRJbkVkaXRvciB8IGNjLk9iamVjdFtcIkZsYWdzXCJdLkhpZGVJbkhpZXJhcmNoeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZS54ID0gMDtcclxuICAgICAgICAgICAgICAgIHByZWZhYk5vZGUueSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQocHJlZmFiTm9kZSwgLTEpIC8vIOa3u+WKoOWIsOacgOW6leWxglxyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZS5uYW1lID0gXCJwcmVmYWJOb2RlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUocHJlZmFiTm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmNob3JYID0gcHJlZmFiTm9kZS5hbmNob3JYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuY2hvclkgPSBwcmVmYWJOb2RlLmFuY2hvclk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXRQcmVmYWIoKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRQcmVmYWIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wcmVmYWIgfHwgdGhpcy5fcHJlZmFiTm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5fb25QcmVmYWJDaGFuZ2VkKG51bGwsIHRoaXMuX3ByZWZhYilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWJOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5fcHJlZmFiKTtcclxuICAgICAgICAgICAgaWYocHJlZmFiTm9kZSl7XHJcbiAgICAgICAgICAgICAgICAvL+WkjeWItuWxnuaAp1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwcmVmYWJOb2RlLnggPSB0aGlzLm5vZGUueDtcclxuICAgICAgICAgICAgICAgIHByZWZhYk5vZGUueSA9IHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZS5zY2FsZSA9IHRoaXMubm9kZS5zY2FsZTtcclxuICAgICAgICAgICAgICAgIHByZWZhYk5vZGUueSA9IHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZS5hbmdsZSA9IHRoaXMubm9kZS5hbmdsZTtcclxuICAgICAgICAgICAgICAgIHByZWZhYk5vZGUub3BhY2l0eSA9IHRoaXMubm9kZS5vcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZS56SW5kZXggPSB0aGlzLm5vZGUuekluZGV4O1xyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgcHJlZmFiTm9kZS5uYW1lID0gdGhpcy5ub2RlLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAvLyDmm7TmlrB0aGlzLm5vZGXmiYDlnKjnmoTmoLnoioLngrnohJrmnKzlr7nlupR1aeagkeS4reeahOW8leeUqFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZVtcIl9fUm9vdFNjcmlwdF9fXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZVtcIl9fUm9vdFNjcmlwdF9fXCJdW1wiX2ZpcmVcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZVtcIl9fUm9vdFNjcmlwdF9fXCJdW1wiX2ZpcmVcIl1bcHJlZmFiTm9kZS5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlW1wiX19Sb290U2NyaXB0X19cIl1bXCJfZmlyZVwiXVtwcmVmYWJOb2RlLm5hbWVdID0gcHJlZmFiTm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVmYWJOb2RlID0gcHJlZmFiTm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19