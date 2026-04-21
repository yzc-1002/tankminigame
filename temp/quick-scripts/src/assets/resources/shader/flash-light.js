"use strict";
cc._RF.push(module, 'c2ceddD0pBJkqpnFbp7yO9h', 'flash-light');
// resources/shader/flash-light.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, executeInEditMode = _a.executeInEditMode, property = _a.property;
var FlashLight = /** @class */ (function (_super) {
    __extends(FlashLight, _super);
    function FlashLight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //扫光颜色
        _this._lightColor = cc.Color.YELLOW;
        //扫光角度
        _this._lightAngle = 135;
        //扫光宽度
        _this._lightWidth = 0.2;
        //扫光速度
        _this._lightSpeed = 0.01;
        //扫光位置
        _this._pos = cc.v2(0, 1); //扫光初始位置
        _this._material = null; //材质
        _this._running = true; //是否正在扫光
        return _this;
    }
    Object.defineProperty(FlashLight.prototype, "lightColor", {
        get: function () { return this._lightColor; },
        set: function (value) {
            this._lightColor = value;
            this._updateProperty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlashLight.prototype, "lightAngle", {
        get: function () { return this._lightAngle; },
        set: function (value) {
            this._lightAngle = value;
            this._updateProperty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlashLight.prototype, "lightWidth", {
        get: function () { return this._lightWidth; },
        set: function (value) {
            this._lightWidth = value;
            this._updateProperty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlashLight.prototype, "lightSpeed", {
        get: function () { return this._lightSpeed; },
        set: function (value) {
            this._lightSpeed = value;
            this._updateProperty();
        },
        enumerable: false,
        configurable: true
    });
    FlashLight.prototype.onLoad = function () {
        cc.dynamicAtlasManager.enabled = false; //关闭引擎的动态图集的功能,不然shader无效
        if (CC_EDITOR) {
            var self = this;
            cc.loader.loadRes("shader/flash-light", cc.Material, function (err, res) {
                self._material = res;
            });
        }
        this._updateMaterial();
    };
    //更新属性-编辑器
    FlashLight.prototype._updateProperty = function () {
        // 调整角度
        if (this._lightAngle > 180)
            this._lightAngle = 180;
        if (this._lightAngle < 0)
            this._lightAngle = 0;
        this._updateMaterial();
    };
    FlashLight.prototype._updateMaterial = function () {
        var _this = this;
        if (CC_EDITOR && this._material == null)
            return;
        // let aaa = this.getComponents(cc.RenderComponent);
        this.getComponents(cc.RenderComponent).forEach(function (renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("lightColor", _this._lightColor);
            material.setProperty("lightCenterPoint", _this._pos);
            material.setProperty("lightAngle", _this._lightAngle);
            material.setProperty("lightWidth", _this._lightWidth);
            material.setProperty("enableGradient", 1); //是否启用光束渐变
            renderComponent.setMaterial(0, material);
        });
    };
    FlashLight.prototype.update = function () {
        if (CC_EDITOR) {
            this.node.getComponent(cc.Sprite).setMaterial(0, this._material);
            this._pos.x = 0.5;
            this._pos.y = 0.5;
        }
        else {
            if (this._running) {
                this._pos.x = this._pos.x + this._lightSpeed;
                if (this._pos.x > 2) {
                    this._pos.x = 0;
                }
                this._pos.y = 1 - this._pos.x;
            }
        }
        this._updateMaterial();
    };
    //开始扫光
    FlashLight.prototype.setStart = function () {
        this._running = true;
        this._pos = cc.v2(0, 1);
        this._updateMaterial();
    };
    //停止扫光
    FlashLight.prototype.setPause = function () {
        this._running = false;
        this._pos = cc.v2(-1, 2);
        this._updateMaterial();
    };
    __decorate([
        property()
    ], FlashLight.prototype, "_lightColor", void 0);
    __decorate([
        property({ visible: true, displayName: "angle 0~180" })
    ], FlashLight.prototype, "lightColor", null);
    __decorate([
        property()
    ], FlashLight.prototype, "_lightAngle", void 0);
    __decorate([
        property({ visible: true, displayName: "angle 0~180" })
    ], FlashLight.prototype, "lightAngle", null);
    __decorate([
        property()
    ], FlashLight.prototype, "_lightWidth", void 0);
    __decorate([
        property({ visible: true, displayName: "width" })
    ], FlashLight.prototype, "lightWidth", null);
    __decorate([
        property()
    ], FlashLight.prototype, "_lightSpeed", void 0);
    __decorate([
        property({ visible: true, displayName: "width" })
    ], FlashLight.prototype, "lightSpeed", null);
    FlashLight = __decorate([
        ccclass,
        executeInEditMode
    ], FlashLight);
    return FlashLight;
}(cc.Component));
exports.default = FlashLight;

cc._RF.pop();