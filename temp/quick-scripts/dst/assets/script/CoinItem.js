
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/CoinItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ead22ZbHoNDcJS3o44VgrPc', 'CoinItem');
// script/CoinItem.ts

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
exports.CoinItem = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var LocalizedData_1 = require("./base/LocalizedData");
var MusicManager_1 = require("./base/MusicManager");
var Share_1 = require("./ad/Share");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
var CoinItem = /** @class */ (function (_super) {
    __extends(CoinItem, _super);
    function CoinItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._viewCount = -1; //显示数量
        _this._realCount = -1; //实际数量
        return _this;
    }
    //加载完成
    CoinItem.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化事件
        this._initEvent();
    };
    CoinItem.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    CoinItem.prototype._initVariable = function () {
        this._viewCount = this._realCount = LocalizedData_1.LocalizedData.getIntItem("_coin_", 0);
        this._refreshLabel();
    };
    //初始化事件
    CoinItem.prototype._initEvent = function () {
        yyp.eventCenter.on('add-coin', this._refresh, this); //金币增加
        yyp.eventCenter.on('reduce-coin', this._reduce, this); //金币减少
    };
    //销毁事件
    CoinItem.prototype._destroyEvent = function () {
        yyp.eventCenter.off('add-coin', this._refresh, this); //金币增加
        yyp.eventCenter.off('reduce-coin', this._reduce, this); //金币减少
    };
    /**
    获取金币数量
    */
    CoinItem.prototype.count = function () {
        return this._realCount;
    };
    CoinItem.prototype._reduce = function (event) {
        event.count *= -1;
        this._refresh(event);
    };
    /**
    刷新金币数量(数量,世界坐标)
    */
    CoinItem.prototype._refresh = function (event) {
        var count = event.count;
        var position = event.position;
        var reason = event.p;
        if (this._viewCount < 0 && this._realCount < 0) { //第一次刷新
            this._realCount = count;
            this._viewCount = this._realCount;
            this._refreshLabel();
            LocalizedData_1.LocalizedData.setIntItem("_coin_", this._realCount);
        }
        else if (count <= 0 || position == null) { //没有传位置或者是减少
            this._realCount += count;
            this._viewCount = this._realCount;
            this._refreshLabel();
            LocalizedData_1.LocalizedData.setIntItem("_coin_", this._realCount);
        }
        else {
            position = this._fire._sprCoin.parent.convertToNodeSpaceAR(position);
            for (var i = 0; i < 4; i++) {
                this._createCoin(Math.floor(count / 4), position, 1 + i * 0.1);
            }
        }
    };
    //刷新显示
    CoinItem.prototype._refreshLabel = function () {
        this._fire._lbCoin.$Label.string = Utils_1.Utils.transformNumber(this._viewCount);
    };
    CoinItem.prototype.update = function (dt) {
        if (this._viewCount < this._realCount) {
            this._viewCount += this._viewCount < 1000 ? 9 : 100;
            if (this._viewCount > this._realCount) {
                this._viewCount = this._realCount;
            }
            this._refreshLabel();
        }
    };
    //创建飞行金币,并以贝塞尔曲线方式方向目标
    CoinItem.prototype._createCoin = function (count, position, time) {
        var coin = new cc.Node();
        coin.position = position;
        coin.parent = this._fire._sprCoin.parent;
        coin.scale = 0.5;
        coin.zIndex = 100;
        var sprite = coin.addComponent(cc.Sprite);
        sprite.spriteFrame = this._fire._sprCoin.$Sprite.spriteFrame;
        var now = coin.position;
        var to = this._fire._sprCoin.position;
        var len = Math.random() * 300 + 200;
        var dir = Utils_1.Utils.degressToVectors(Math.random() * 360);
        var control = cc.v2(now).add(dir.mul(len));
        var self = this;
        coin.runAction(cc.sequence(cc.spawn(cc.bezierTo(time, [now, control, to]), cc.scaleTo(time, 0.8, 0.8)), cc.callFunc(function () {
            MusicManager_1.MusicManager.playEffect("coin"); //收金币音效
            self._realCount += count;
            LocalizedData_1.LocalizedData.setIntItem("_coin_", self._realCount);
        }), cc.removeSelf()));
    };
    CoinItem.prototype.onAddClick = function (event) {
        // Analytics.getInstance().event('coin_share');
        MusicManager_1.MusicManager.playEffect("btn"); //按钮音效
        Share_1.Share.getInstance().share(function (res) {
            if (res) {
                yyp.eventCenter.emit('add-coin', { count: 50, p: "金币加号" });
            }
        }, 0);
    };
    CoinItem = __decorate([
        ccclass
    ], CoinItem);
    return CoinItem;
}(BaseComponent_1.BaseComponent));
exports.CoinItem = CoinItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxDb2luSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHNDQUFxQztBQUNyQyxzREFBbUQ7QUFDbkQsb0RBQWlEO0FBQ2pELG9DQUFpQztBQUNqQyw4QkFBOEI7QUFDOUIsNENBQTRDO0FBQzVDLDRCQUE0QjtBQUM1QiwwQ0FBMEM7QUFDcEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsZUFBZTtBQUNmLHdCQUF3QjtBQUV4QjtJQUE4Qiw0QkFBYTtJQUEzQztRQUFBLHFFQXVJQztRQXJJRyxnQkFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUksTUFBTTtRQUMxQixnQkFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUksTUFBTTs7SUFvSTlCLENBQUM7SUFsSUcsTUFBTTtJQUNOLHlCQUFNLEdBQU47UUFDSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxNQUFNO1FBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPO0lBQ1AsZ0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyw2QkFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPO0lBQ1AsNkJBQVUsR0FBVjtRQUNJLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FB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LCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHtMb2NhbGl6ZWREYXRhfSBmcm9tIFwiLi9iYXNlL0xvY2FsaXplZERhdGFcIjtcclxuaW1wb3J0IHtNdXNpY01hbmFnZXJ9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7U2hhcmV9IGZyb20gXCIuL2FkL1NoYXJlXCI7XHJcbi8v55S15a2Q6YKu5Lu2cHVoYWxza2lqc2VtZW5AZ21haWwuY29tXHJcbi8v5rqQ56CB572R56uZIOW8gHZwbuWFqOWxgOaooeW8j+aJk+W8gCBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL1xyXG4vL+eUteaKpWh0dHBzOi8vdC5tZS9nYW1lY29kZTk5OVxyXG4vL+e9kemhteWuouacjSBodHRwOi8vd2ViM2luY3ViYXRvcnMuY29tL2tlZnUuaHRtbFxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8v56eB5pyJ5Ye95pWwLOivt+S9v+eUqCdfJ+W8gOWktFxyXG4vL+ivt+S/ruaUuSdOZXdDbGFzcycgPT4g6Ieq5bex55qE57G75ZCNXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBDb2luSXRlbSBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIF92aWV3Q291bnQgPSAtMTsgICAgLy/mmL7npLrmlbDph49cclxuICAgIF9yZWFsQ291bnQgPSAtMTsgICAgLy/lrp7pmYXmlbDph49cclxuXHJcbiAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgICAgIHRoaXMuX2luaXRWYXJpYWJsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJblj5jph49cclxuICAgIF9pbml0VmFyaWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fdmlld0NvdW50ID0gdGhpcy5fcmVhbENvdW50ID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX2NvaW5fXCIsMCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaExhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbkuovku7ZcclxuICAgIF9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCdhZGQtY29pbicsdGhpcy5fcmVmcmVzaCx0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHlop7liqBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub24oJ3JlZHVjZS1jb2luJyx0aGlzLl9yZWR1Y2UsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geWHj+WwkVxyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ2FkZC1jb2luJyx0aGlzLl9yZWZyZXNoLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geWinuWKoFxyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3JlZHVjZS1jb2luJyx0aGlzLl9yZWR1Y2UsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geWHj+WwkVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg6I635Y+W6YeR5biB5pWw6YePXHJcbiAgICAqL1xyXG4gICAgY291bnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVhbENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWR1Y2UoZXZlbnQpe1xyXG4gICAgICAgIGV2ZW50LmNvdW50ICo9IC0xO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2goZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5Yi35paw6YeR5biB5pWw6YePKOaVsOmHjyzkuJbnlYzlnZDmoIcpXHJcbiAgICAqL1xyXG4gICAgX3JlZnJlc2goZXZlbnQpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IGV2ZW50LmNvdW50O1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGV2ZW50LnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCByZWFzb24gPSBldmVudC5wO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdmlld0NvdW50IDwgMCAmJiB0aGlzLl9yZWFsQ291bnQgPCAwKSB7ICAgLy/nrKzkuIDmrKHliLfmlrBcclxuICAgICAgICAgICAgdGhpcy5fcmVhbENvdW50ID0gY291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdDb3VudCA9IHRoaXMuX3JlYWxDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaExhYmVsKCk7XHJcbiAgICAgICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9jb2luX1wiLHRoaXMuX3JlYWxDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvdW50IDw9IDAgfHwgcG9zaXRpb24gPT0gbnVsbCkgeyAgICAgICAgICAvL+ayoeacieS8oOS9jee9ruaIluiAheaYr+WHj+WwkVxyXG4gICAgICAgICAgICB0aGlzLl9yZWFsQ291bnQgKz0gY291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdDb3VudCA9IHRoaXMuX3JlYWxDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaExhYmVsKCk7XHJcbiAgICAgICAgICAgIExvY2FsaXplZERhdGEuc2V0SW50SXRlbShcIl9jb2luX1wiLHRoaXMuX3JlYWxDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5fZmlyZS5fc3ByQ29pbi5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocG9zaXRpb24pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQ29pbihNYXRoLmZsb29yKGNvdW50LzQpLCBwb3NpdGlvbiwgMSArIGkqMC4xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WIt+aWsOaYvuekulxyXG4gICAgX3JlZnJlc2hMYWJlbCgpe1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xiQ29pbi4kTGFiZWwuc3RyaW5nID0gVXRpbHMudHJhbnNmb3JtTnVtYmVyKHRoaXMuX3ZpZXdDb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KXtcclxuICAgICAgICBpZiAodGhpcy5fdmlld0NvdW50IDwgdGhpcy5fcmVhbENvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdDb3VudCArPSB0aGlzLl92aWV3Q291bnQgPCAxMDAwID8gOSA6IDEwMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZXdDb3VudCA+IHRoaXMuX3JlYWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld0NvdW50ID0gdGhpcy5fcmVhbENvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hMYWJlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uumjnuihjOmHkeW4gSzlubbku6XotJ3loZ7lsJTmm7Lnur/mlrnlvI/mlrnlkJHnm67moIdcclxuICAgIF9jcmVhdGVDb2luKGNvdW50LHBvc2l0aW9uLHRpbWUpe1xyXG4gICAgICAgIGxldCBjb2luID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBjb2luLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgY29pbi5wYXJlbnQgPSB0aGlzLl9maXJlLl9zcHJDb2luLnBhcmVudDtcclxuICAgICAgICBjb2luLnNjYWxlID0gMC41O1xyXG4gICAgICAgIGNvaW4uekluZGV4ID0gMTAwO1xyXG4gICAgICAgIGxldCBzcHJpdGUgPSBjb2luLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuX2ZpcmUuX3NwckNvaW4uJFNwcml0ZS5zcHJpdGVGcmFtZTtcclxuXHJcblx0XHRsZXQgbm93ID0gY29pbi5wb3NpdGlvbjtcclxuICAgICAgICBsZXQgdG8gPSB0aGlzLl9maXJlLl9zcHJDb2luLnBvc2l0aW9uO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBsZW4gPSBNYXRoLnJhbmRvbSgpKjMwMCArIDIwMDtcclxuICAgICAgICBsZXQgZGlyID0gVXRpbHMuZGVncmVzc1RvVmVjdG9ycyhNYXRoLnJhbmRvbSgpKjM2MCk7XHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjYy52Mihub3cpLmFkZChkaXIubXVsKGxlbikpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBjb2luLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5iZXppZXJUbyh0aW1lLCBbbm93LCBjb250cm9sLCB0b10pLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyh0aW1lLCAwLjgsMC44KVxyXG4gICAgICAgICAgICApLFxyXG5cdFx0XHRjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJjb2luXCIpOyAgICAvL+aUtumHkeW4gemfs+aViFxyXG4gICAgICAgICAgICAgICAgc2VsZi5fcmVhbENvdW50ICs9IGNvdW50O1xyXG4gICAgICAgICAgICAgICAgTG9jYWxpemVkRGF0YS5zZXRJbnRJdGVtKFwiX2NvaW5fXCIsc2VsZi5fcmVhbENvdW50KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYoKVxyXG5cdFx0KSlcclxuICAgIH1cclxuXHJcbiAgICBvbkFkZENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnQoJ2NvaW5fc2hhcmUnKTtcclxuICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImJ0blwiKTsgICAgLy/mjInpkq7pn7PmlYhcclxuICAgICAgICBcclxuICAgICAgICBTaGFyZS5nZXRJbnN0YW5jZSgpLnNoYXJlKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KCdhZGQtY29pbicse2NvdW50OjUwLHA6XCLph5HluIHliqDlj7dcIn0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwwKVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=