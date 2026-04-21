
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/base/LocalizedData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxMb2NhbGl6ZWREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyxpQ0FBWTtJQUEvQzs7SUE0RkEsQ0FBQztzQkE1RlksYUFBYTtJQU90QiwyQkFBMkI7SUFDcEIsc0JBQVEsR0FBZixVQUFnQixLQUFLO1FBRWpCLElBQUksS0FBSyxLQUFLLElBQUksRUFBQztZQUNmLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixJQUFJO1FBRUosSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFDO1lBQ2hCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07SUFDQyxzQkFBUSxHQUFmLFVBQWdCLEdBQUc7UUFDZixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFVBQVU7SUFDSCx3QkFBVSxHQUFqQixVQUFrQixHQUFHLEVBQUMsWUFBWTtRQUM5QixJQUFJLEdBQUcsR0FBRyxlQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQzNCLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7SUFDSiwyQkFBYSxHQUFwQixVQUFxQixHQUFHLEVBQUMsWUFBWTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxlQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNiLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWTtJQUNMLHlCQUFXLEdBQWxCLFVBQW1CLEdBQUcsRUFBQyxZQUFZO1FBQy9CLElBQUksR0FBRyxHQUFHLGVBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU07SUFDQyxzQkFBUSxHQUFmLFVBQWdCLEdBQUcsRUFBQyxLQUFLO1FBQ3JCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFVBQVU7SUFDSCx3QkFBVSxHQUFqQixVQUFrQixHQUFHLEVBQUMsS0FBSztRQUN2QixlQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsV0FBVztJQUNKLDJCQUFhLEdBQXBCLFVBQXFCLEdBQUcsRUFBQyxLQUFLO1FBQzFCLGVBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxZQUFZO0lBQ0wseUJBQVcsR0FBbEIsVUFBbUIsR0FBRyxFQUFDLEtBQUs7UUFDeEIsZUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxPQUFPO0lBQ0Esd0JBQVUsR0FBakIsVUFBa0IsR0FBRztRQUNqQixFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7SUExRk0sd0JBQVUsR0FBRyxLQUFLLENBQUE7SUFDbEIsdUJBQVMsR0FBRyxLQUFLLENBQUE7SUFDakIsd0JBQVUsR0FBRyxDQUFDLENBQUE7SUFDZCx1QkFBUyxHQUFHLENBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUN0QyxxQkFBTyxHQUFHLEVBQUUsQ0FBQTtJQUxWLGFBQWE7UUFEekIsT0FBTztPQUNLLGFBQWEsQ0E0RnpCO0lBQUQsb0JBQUM7Q0E1RkQsQUE0RkMsQ0E1RmtDLEVBQUUsQ0FBQyxTQUFTLEdBNEY5QztBQTVGWSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIExvY2FsaXplZERhdGEgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIF9zdGFydExvYWQgPSBmYWxzZVxyXG4gICAgc3RhdGljIF9pc0xvYWRlZCA9IGZhbHNlXHJcbiAgICBzdGF0aWMgX2xvYWRJbmRleCA9IDBcclxuICAgIHN0YXRpYyBfbG9hZExpc3QgPSBbXCJMZXZlbFwiLFwiUGxheWVyXCIsXCJFbmVteVwiXVxyXG4gICAgc3RhdGljIF9jb25maWcgPSB7fVxyXG5cclxuICAgIC8v5Yik5pat5LuObG9jYWxTdG9yYWdl5Y+W5Ye655qE5YC85piv5ZCm5piv5pyJ5pWI55qEXHJcbiAgICBzdGF0aWMgX2lzVmFsaWQodmFsdWUpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBpZiAodmFsdWUgPT09IFwiXCIpe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUgPT09IFwiTmFOXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaVsOaNrlxyXG4gICAgc3RhdGljIF9nZXRJdGVtKGtleSl7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzVmFsaWQodmFsdWUpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaVsOWtl+exu+Wei+aVsOaNrlxyXG4gICAgc3RhdGljIGdldEludEl0ZW0oa2V5LGRlZmF1bHRWYWx1ZSl7XHJcbiAgICAgICAgbGV0IHJldCA9IExvY2FsaXplZERhdGEuX2dldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZiAocmV0ICE9IG51bGwgJiYgcmV0ICE9PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQocmV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blrZfnrKbkuLLnsbvlnovmlbDmja5cclxuICAgIHN0YXRpYyBnZXRTdHJpbmdJdGVtKGtleSxkZWZhdWx0VmFsdWUpe1xyXG4gICAgICAgIGxldCByZXQgPSBMb2NhbGl6ZWREYXRhLl9nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYgKHJldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iOt+WPlkpTT07nsbvlnovmlbDmja5cclxuICAgIHN0YXRpYyBnZXRKc29uSXRlbShrZXksZGVmYXVsdFZhbHVlKXtcclxuICAgICAgICBsZXQgcmV0ID0gTG9jYWxpemVkRGF0YS5fZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmIChyZXQgIT0gbnVsbCAmJiByZXQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+S/neWtmOaVsOaNrlxyXG4gICAgc3RhdGljIF9zZXRJdGVtKGtleSx2YWx1ZSl7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+S/neWtmOaVsOWtl+exu+Wei+aVsOaNrlxyXG4gICAgc3RhdGljIHNldEludEl0ZW0oa2V5LHZhbHVlKXtcclxuICAgICAgICBMb2NhbGl6ZWREYXRhLl9zZXRJdGVtKGtleSx2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5L+d5a2Y5a2X56ym5Liy57G75Z6L5pWw5o2uXHJcbiAgICBzdGF0aWMgc2V0U3RyaW5nSXRlbShrZXksdmFsdWUpe1xyXG4gICAgICAgIExvY2FsaXplZERhdGEuX3NldEl0ZW0oa2V5LHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmEpTT07nsbvlnovmlbDmja5cclxuICAgIHN0YXRpYyBzZXRKc29uSXRlbShrZXksdmFsdWUpe1xyXG4gICAgICAgIExvY2FsaXplZERhdGEuX3NldEl0ZW0oa2V5LEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Yig6Zmka2V5XHJcbiAgICBzdGF0aWMgcmVtb3ZlSXRlbShrZXkpe1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==