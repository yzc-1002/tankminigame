
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/sdk/comp/NativeAdItemView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c9e62RqghDEYmPrNN+Re2/', 'NativeAdItemView');
// script/sdk/sdk/comp/NativeAdItemView.ts

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
var NativeAdItemView = /** @class */ (function (_super) {
    __extends(NativeAdItemView, _super);
    function NativeAdItemView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adImage = null;
        _this.title = null;
        return _this;
    }
    NativeAdItemView.prototype.start = function () {
    };
    NativeAdItemView.prototype.setModel = function (item) {
        var _this = this;
        this.model = item;
        // console.log('item.imgUrl =========== ', this.model.getIcon())
        this.title.string = this.model.getTitle();
        var imageList = this.model.getImgList();
        if (imageList) {
            cc.assetManager.loadRemote(imageList[SDKConfig_1.random(0, imageList.length)], function (err, texture) {
                if (err) {
                    console.log(' err ', err);
                    return;
                }
                _this.adImage.spriteFrame = new cc.SpriteFrame(texture);
                SDKManager_1.default.getChannel().reportAdShow(_this.model.getID());
            });
        }
    };
    NativeAdItemView.prototype.onButtonClick = function () {
        SDKManager_1.default.getChannel().reportAdClick(this.model.getID());
    };
    __decorate([
        property(cc.Sprite)
    ], NativeAdItemView.prototype, "adImage", void 0);
    __decorate([
        property(cc.Label)
    ], NativeAdItemView.prototype, "title", void 0);
    NativeAdItemView = __decorate([
        ccclass
    ], NativeAdItemView);
    return NativeAdItemView;
}(cc.Component));
exports.default = NativeAdItemView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzZGtcXHNka1xcY29tcFxcTmF0aXZlQWRJdGVtVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBdUM7QUFDdkMsMENBQXNDO0FBRWhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBa0NDO1FBL0JHLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFHMUIsV0FBSyxHQUFhLElBQUksQ0FBQzs7SUE0QjNCLENBQUM7SUF6QkcsZ0NBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxtQ0FBUSxHQUFSLFVBQVMsSUFBSTtRQUFiLGlCQWdCQztRQWZHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGdFQUFnRTtRQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFDLElBQUksU0FBUyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEQsSUFBSSxTQUFTLEVBQUU7WUFDWCxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztnQkFDNUUsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7b0JBQ3pCLE9BQU87aUJBQ1Y7Z0JBQ0QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUN0RCxvQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDNUQsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUVMLENBQUM7SUFFRCx3Q0FBYSxHQUFiO1FBQ0ksb0JBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUE5QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDTTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNJO0lBTk4sZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FrQ3BDO0lBQUQsdUJBQUM7Q0FsQ0QsQUFrQ0MsQ0FsQzZDLEVBQUUsQ0FBQyxTQUFTLEdBa0N6RDtrQkFsQ29CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTmF0aXZlQWRJdGVtTW9kZWwgZnJvbSBcIi4uL2Jhc2UvQmFzZU5hdGl2ZUFkSXRlbU1vZGVsXCI7XHJcbmltcG9ydCBTREtNYW5hZ2VyIGZyb20gXCIuLi9TREtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHJhbmRvbSB9IGZyb20gXCIuLi9TREtDb25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXRpdmVBZEl0ZW1WaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgYWRJbWFnZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICB0aXRsZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBtb2RlbDogQmFzZU5hdGl2ZUFkSXRlbU1vZGVsO1xyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGVsKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gaXRlbTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnaXRlbS5pbWdVcmwgPT09PT09PT09PT0gJywgdGhpcy5tb2RlbC5nZXRJY29uKCkpXHJcbiAgICAgICAgdGhpcy50aXRsZS5zdHJpbmcgPSB0aGlzLm1vZGVsLmdldFRpdGxlKCk7XHJcbiAgICAgICAgbGV0IGltYWdlTGlzdDogc3RyaW5nW10gPSB0aGlzLm1vZGVsLmdldEltZ0xpc3QoKTtcclxuICAgICAgICBpZiAoaW1hZ2VMaXN0KSB7XHJcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKGltYWdlTGlzdFtyYW5kb20oMCwgaW1hZ2VMaXN0Lmxlbmd0aCldLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyBlcnIgJywgZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRJbWFnZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKVxyXG4gICAgICAgICAgICAgICAgU0RLTWFuYWdlci5nZXRDaGFubmVsKCkucmVwb3J0QWRTaG93KHRoaXMubW9kZWwuZ2V0SUQoKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkJ1dHRvbkNsaWNrKCkge1xyXG4gICAgICAgIFNES01hbmFnZXIuZ2V0Q2hhbm5lbCgpLnJlcG9ydEFkQ2xpY2sodGhpcy5tb2RlbC5nZXRJRCgpKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==