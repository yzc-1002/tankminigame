"use strict";
cc._RF.push(module, 'a8258/WcnZHwLUVxMKYBjP+', 'LocalizedData');
// script/base/LocalizedData.ts

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
exports.LocalizedData = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LocalizedData = /** @class */ (function (_super) {
    __extends(LocalizedData, _super);
    function LocalizedData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalizedData_1 = LocalizedData;
    //判断从localStorage取出的值是否是有效的
    LocalizedData._isValid = function (value) {
        if (value === null) {
            return false;
        }
        if (value === undefined) {
            return false;
        }
        // if (value === ""){
        //     return false;
        // }
        if (value === "NaN") {
            return false;
        }
        return true;
    };
    //获取数据
    LocalizedData._getItem = function (key) {
        var value = cc.sys.localStorage.getItem(key);
        if (this._isValid(value)) {
            return value;
        }
        return null;
    };
    //获取数字类型数据
    LocalizedData.getIntItem = function (key, defaultValue) {
        var ret = LocalizedData_1._getItem(key);
        if (ret != null && ret !== '') {
            return parseInt(ret);
        }
        return defaultValue;
    };
    //获取字符串类型数据
    LocalizedData.getStringItem = function (key, defaultValue) {
        var ret = LocalizedData_1._getItem(key);
        if (ret != null) {
            return ret;
        }
        return defaultValue;
    };
    //获取JSON类型数据
    LocalizedData.getJsonItem = function (key, defaultValue) {
        var ret = LocalizedData_1._getItem(key);
        if (ret != null && ret !== '') {
            return JSON.parse(ret);
        }
        return defaultValue;
    };
    //保存数据
    LocalizedData._setItem = function (key, value) {
        cc.sys.localStorage.setItem(key, value);
    };
    //保存数字类型数据
    LocalizedData.setIntItem = function (key, value) {
        LocalizedData_1._setItem(key, value);
    };
    //保存字符串类型数据
    LocalizedData.setStringItem = function (key, value) {
        LocalizedData_1._setItem(key, value);
    };
    //保存JSON类型数据
    LocalizedData.setJsonItem = function (key, value) {
        LocalizedData_1._setItem(key, JSON.stringify(value));
    };
    //删除key
    LocalizedData.removeItem = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    var LocalizedData_1;
    LocalizedData._startLoad = false;
    LocalizedData._isLoaded = false;
    LocalizedData._loadIndex = 0;
    LocalizedData._loadList = ["Level", "Player", "Enemy"];
    LocalizedData._config = {};
    LocalizedData = LocalizedData_1 = __decorate([
        ccclass
    ], LocalizedData);
    return LocalizedData;
}(cc.Component));
exports.LocalizedData = LocalizedData;

cc._RF.pop();