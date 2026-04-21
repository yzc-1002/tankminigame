"use strict";
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