
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/resources/shader/flash-light.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzb3VyY2VzXFxzaGFkZXJcXGZsYXNoLWxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBMkMsRUFBRSxDQUFDLFVBQVUsRUFBdEQsT0FBTyxhQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSS9EO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBcUhDO1FBcEhHLE1BQU07UUFFRSxpQkFBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBUXRDLE1BQU07UUFFRSxpQkFBVyxHQUFHLEdBQUcsQ0FBQztRQVExQixNQUFNO1FBRUUsaUJBQVcsR0FBRyxHQUFHLENBQUM7UUFRMUIsTUFBTTtRQUVFLGlCQUFXLEdBQUcsSUFBSSxDQUFDO1FBUTNCLE1BQU07UUFDTixVQUFJLEdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBTSxRQUFRO1FBQ3hDLGVBQVMsR0FBSyxJQUFJLENBQUMsQ0FBYSxJQUFJO1FBQ3BDLGNBQVEsR0FBTSxJQUFJLENBQUMsQ0FBYSxRQUFROztJQXlFNUMsQ0FBQztJQWhIRyxzQkFBSSxrQ0FBVTthQUlkLGNBQWtCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFKNUMsVUFBZSxLQUFLO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQU9ELHNCQUFJLGtDQUFVO2FBSWQsY0FBa0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzthQUo1QyxVQUFlLEtBQUs7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNC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LE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBQyxDQUFDO2dEQUkvQztJQUtEO1FBREMsUUFBUSxFQUFFO21EQUNnQjtJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBQyxDQUFDO2dEQUkvQztJQXRDZ0IsVUFBVTtRQUY5QixPQUFPO1FBQ1AsaUJBQWlCO09BQ0csVUFBVSxDQXFIOUI7SUFBRCxpQkFBQztDQXJIRCxBQXFIQyxDQXJIdUMsRUFBRSxDQUFDLFNBQVMsR0FxSG5EO2tCQXJIb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgZXhlY3V0ZUluRWRpdE1vZGUsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGV4ZWN1dGVJbkVkaXRNb2RlXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFzaExpZ2h0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICAvL+aJq+WFieminOiJslxuICAgIEBwcm9wZXJ0eSgpXG4gICAgcHJpdmF0ZSBfbGlnaHRDb2xvciA9IGNjLkNvbG9yLllFTExPVztcbiAgICBAcHJvcGVydHkoe3Zpc2libGU6IHRydWUsIGRpc3BsYXlOYW1lOiBcImFuZ2xlIDB+MTgwXCJ9KVxuICAgIHNldCBsaWdodENvbG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xpZ2h0Q29sb3IgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvcGVydHkoKTsgXG4gICAgfVxuICAgIGdldCBsaWdodENvbG9yKCl7IHJldHVybiB0aGlzLl9saWdodENvbG9yOyB9XG5cbiAgICAvL+aJq+WFieinkuW6plxuICAgIEBwcm9wZXJ0eSgpXG4gICAgcHJpdmF0ZSBfbGlnaHRBbmdsZSA9IDEzNTtcbiAgICBAcHJvcGVydHkoe3Zpc2libGU6IHRydWUsIGRpc3BsYXlOYW1lOiBcImFuZ2xlIDB+MTgwXCJ9KVxuICAgIHNldCBsaWdodEFuZ2xlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xpZ2h0QW5nbGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvcGVydHkoKTsgXG4gICAgfVxuICAgIGdldCBsaWdodEFuZ2xlKCl7IHJldHVybiB0aGlzLl9saWdodEFuZ2xlOyB9XG5cbiAgICAvL+aJq+WFieWuveW6plxuICAgIEBwcm9wZXJ0eSgpXG4gICAgcHJpdmF0ZSBfbGlnaHRXaWR0aCA9IDAuMjtcbiAgICBAcHJvcGVydHkoe3Zpc2libGU6IHRydWUsIGRpc3BsYXlOYW1lOiBcIndpZHRoXCJ9KVxuICAgIHNldCBsaWdodFdpZHRoKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xpZ2h0V2lkdGggPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvcGVydHkoKTsgXG4gICAgfVxuICAgIGdldCBsaWdodFdpZHRoKCl7IHJldHVybiB0aGlzLl9saWdodFdpZHRoOyB9XG4gICAgXG4gICAgLy/miavlhYnpgJ/luqZcbiAgICBAcHJvcGVydHkoKVxuICAgIHByaXZhdGUgX2xpZ2h0U3BlZWQgPSAwLjAxO1xuICAgIEBwcm9wZXJ0eSh7dmlzaWJsZTogdHJ1ZSwgZGlzcGxheU5hbWU6IFwid2lkdGhcIn0pXG4gICAgc2V0IGxpZ2h0U3BlZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGlnaHRTcGVlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9wZXJ0eSgpOyBcbiAgICB9XG4gICAgZ2V0IGxpZ2h0U3BlZWQoKXsgcmV0dXJuIHRoaXMuX2xpZ2h0U3BlZWQ7IH1cblxuICAgIC8v5omr5YWJ5L2N572uXG4gICAgX3BvcyAgICAgICAgPSBjYy52MigwLCAxKTsgICAgICAvL+aJq+WFieWIneWni+S9jee9rlxuICAgIF9tYXRlcmlhbCAgID0gbnVsbDsgICAgICAgICAgICAgLy/mnZDotKhcbiAgICBfcnVubmluZyAgICA9IHRydWU7ICAgICAgICAgICAgIC8v5piv5ZCm5q2j5Zyo5omr5YWJXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuZW5hYmxlZCA9IGZhbHNlOyAvL+WFs+mXreW8leaTjueahOWKqOaAgeWbvumbhueahOWKn+iDvSzkuI3nhLZzaGFkZXLml6DmlYhcblxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwic2hhZGVyL2ZsYXNoLWxpZ2h0XCIsIGNjLk1hdGVyaWFsLCBmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIHNlbGYuX21hdGVyaWFsID0gcmVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgIH1cbiAgICBcbiAgICAvL+abtOaWsOWxnuaApy3nvJbovpHlmahcbiAgICBfdXBkYXRlUHJvcGVydHkoKXtcbiAgICAgICAgLy8g6LCD5pW06KeS5bqmXG4gICAgICAgIGlmICh0aGlzLl9saWdodEFuZ2xlID4gMTgwKSB0aGlzLl9saWdodEFuZ2xlID0gMTgwO1xuICAgICAgICBpZiAodGhpcy5fbGlnaHRBbmdsZSA8IDAgKSB0aGlzLl9saWdodEFuZ2xlID0gMDtcblxuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZU1hdGVyaWFsKCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIHRoaXMuX21hdGVyaWFsID09IG51bGwpIHJldHVybjtcblxuICAgICAgICAvLyBsZXQgYWFhID0gdGhpcy5nZXRDb21wb25lbnRzKGNjLlJlbmRlckNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50cyhjYy5SZW5kZXJDb21wb25lbnQpLmZvckVhY2gocmVuZGVyQ29tcG9uZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbDogY2MuTWF0ZXJpYWwgPSByZW5kZXJDb21wb25lbnQuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eShcImxpZ2h0Q29sb3JcIiwgdGhpcy5fbGlnaHRDb2xvcik7XG4gICAgICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eShcImxpZ2h0Q2VudGVyUG9pbnRcIiwgdGhpcy5fcG9zKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwibGlnaHRBbmdsZVwiLCB0aGlzLl9saWdodEFuZ2xlKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwibGlnaHRXaWR0aFwiLCB0aGlzLl9saWdodFdpZHRoKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwiZW5hYmxlR3JhZGllbnRcIiwgMSk7ICAvL+aYr+WQpuWQr+eUqOWFieadn+a4kOWPmFxuICAgICAgICAgICAgcmVuZGVyQ29tcG9uZW50LnNldE1hdGVyaWFsKDAsIG1hdGVyaWFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCB0aGlzLl9tYXRlcmlhbCk7XG4gICAgICAgICAgICB0aGlzLl9wb3MueCA9IDAuNTtcbiAgICAgICAgICAgIHRoaXMuX3Bvcy55ID0gMC41O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpZiAodGhpcy5fcnVubmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Bvcy54ID0gdGhpcy5fcG9zLnggKyB0aGlzLl9saWdodFNwZWVkO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3MueCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zLnggPSAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvcy55ID0gMSAtIHRoaXMuX3Bvcy54O1xuICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvL+W8gOWni+aJq+WFiVxuICAgIHNldFN0YXJ0KCl7XG4gICAgICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wb3MgPSBjYy52MigwLCAxKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcbiAgICB9XG5cbiAgICAvL+WBnOatouaJq+WFiVxuICAgIHNldFBhdXNlKCl7XG4gICAgICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcG9zID0gY2MudjIoLTEsIDIpO1xuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgIH1cbn1cblxuIl19