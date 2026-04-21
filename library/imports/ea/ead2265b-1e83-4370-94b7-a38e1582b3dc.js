"use strict";
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