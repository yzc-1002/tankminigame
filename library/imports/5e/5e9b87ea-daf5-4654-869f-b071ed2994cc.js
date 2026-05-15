"use strict";
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
    var LinkPrefabScript = null;
    if (LinkPrefab_1.LinkPrefab) {
        LinkPrefabScript = this.getComponent(LinkPrefab_1.LinkPrefab);
    }
    else if (this._components) {
        LinkPrefabScript = this._components.find(function (component) {
            return component && component.__classname__ == "LinkPrefab";
        }) || null;
    }
    if (LinkPrefabScript) {
        if (LinkPrefabScript._prefabNode) {
            return LinkPrefabScript._prefabNode.script;
        }
    }
    if (BaseComponent) {
        var baseComponent = this.getComponent(BaseComponent);
        if (baseComponent) {
            return baseComponent;
        }
    }
    if (this._components) {
        for (var i = 0; i < this._components.length; i++) {
            var component = this._components[i];
            if (component && component.__classname__ && component.__classname__.indexOf("cc.") != 0) {
                return component;
            }
        }
    }
    return null;
}, true, true);

cc._RF.pop();