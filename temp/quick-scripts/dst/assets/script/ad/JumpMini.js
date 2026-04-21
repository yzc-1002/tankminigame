
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ad/JumpMini.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3887dLR7aRE37dHQaqoJTXN', 'JumpMini');
// script/ad/JumpMini.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var JumpMini = /** @class */ (function (_super) {
    __extends(JumpMini, _super);
    function JumpMini() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appid = '';
        return _this;
    }
    JumpMini.prototype.start = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // do nothig
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            this.node.active = false;
            return;
        }
        else if (cc.sys.platform === cc.sys.ANDROID) {
            this.node.active = false;
            return;
        }
        else {
        }
        this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    };
    JumpMini.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    };
    JumpMini.prototype.onButtonClick = function () {
        this.navigateToMiniProgram(this.appid);
    };
    //跳转小游戏
    JumpMini.prototype.navigateToMiniProgram = function (appid) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.wxJumpToMiniProgram(appid);
        }
    };
    //微信跳转小游戏
    JumpMini.prototype.wxJumpToMiniProgram = function (appid) {
        wx.navigateToMiniProgram({
            appId: appid,
            success: function () {
                cc.log('wx navigateToMiniProgram succ');
            }
        });
    };
    __decorate([
        property
    ], JumpMini.prototype, "appid", void 0);
    JumpMini = __decorate([
        ccclass,
        requireComponent(cc.Button)
    ], JumpMini);
    return JumpMini;
}(cc.Component));
exports.default = JumpMini;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhZFxcSnVtcE1pbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUEwQyxFQUFFLENBQUMsVUFBVSxFQUFyRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFJOUQ7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFnREM7UUE3Q0csV0FBSyxHQUFXLEVBQUUsQ0FBQzs7SUE2Q3ZCLENBQUM7SUEzQ0csd0JBQUssR0FBTDtRQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUM7WUFDdkMsWUFBWTtTQUNmO2FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDekIsT0FBTztTQUNWO2FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDekIsT0FBTztTQUNWO2FBQ0c7U0FDSDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxPQUFPO0lBQ1Asd0NBQXFCLEdBQXJCLFVBQXNCLEtBQUs7UUFDdkIsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQztZQUN2QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQsU0FBUztJQUNULHNDQUFtQixHQUFuQixVQUFvQixLQUFLO1FBQ3JCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRTtnQkFDTCxFQUFFLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDNUMsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUVOLENBQUM7SUE1Q0Q7UUFEQyxRQUFROzJDQUNVO0lBSEYsUUFBUTtRQUY1QixPQUFPO1FBQ1AsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNQLFFBQVEsQ0FnRDVCO0lBQUQsZUFBQztDQWhERCxBQWdEQyxDQWhEcUMsRUFBRSxDQUFDLFNBQVMsR0FnRGpEO2tCQWhEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIHJlcXVpcmVDb21wb25lbnQgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AcmVxdWlyZUNvbXBvbmVudChjYy5CdXR0b24pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1bXBNaW5pIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFwcGlkOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICAvLyBkbyBub3RoaWdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQU5EUk9JRCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkJ1dHRvbkNsaWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkJ1dHRvbkNsaWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1dHRvbkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGVUb01pbmlQcm9ncmFtKHRoaXMuYXBwaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6Lez6L2s5bCP5ri45oiPXHJcbiAgICBuYXZpZ2F0ZVRvTWluaVByb2dyYW0oYXBwaWQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICB0aGlzLnd4SnVtcFRvTWluaVByb2dyYW0oYXBwaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lvq7kv6Hot7PovazlsI/muLjmiI9cclxuICAgIHd4SnVtcFRvTWluaVByb2dyYW0oYXBwaWQpIHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogYXBwaWQsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygnd3ggbmF2aWdhdGVUb01pbmlQcm9ncmFtIHN1Y2MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==