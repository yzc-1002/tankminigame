"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'GameScene');
// script/GameScene.ts

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
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var MusicManager_1 = require("./base/MusicManager");
// import {BannerAd} from "./ad/BannerAd";
var InsertAd_1 = require("./ad/InsertAd");
var RewardAd_1 = require("./ad/RewardAd");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        return _this;
    }
    GameScene.prototype.onLoad = function () {
        Utils_1.Utils.initMusicEffect();
        MusicManager_1.MusicManager.initConfig();
        this._fire._lyCoin.y = yyp.safeTopBottom - 30;
        this._fire._lyCoin.zIndex = 1001;
        var prefabNode = cc.instantiate(this.prefab);
        prefabNode.x = 0;
        prefabNode.y = 0;
        prefabNode.zIndex = 1000;
        prefabNode.parent = this.node;
        this._initEvent();
    };
    GameScene.prototype.start = function () {
        // BannerAd.getInstance().showBottom();   
        InsertAd_1.InsertAd.getInstance();
        RewardAd_1.RewardAd.getInstance();
    };
    //初始化接收事件
    GameScene.prototype._initEvent = function () {
        // this._fire._lyStart.on(cc.Node.EventType.TOUCH_END, this.onStartClick, this);
    };
    //销毁事件
    GameScene.prototype._destroyEvent = function () {
        // this._fire._lyStart.off(cc.Node.EventType.TOUCH_END, this.onStartClick, this);
    };
    GameScene.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //开始按钮
    GameScene.prototype.onStartClick = function () {
        var a = 1;
    };
    __decorate([
        property(cc.Prefab)
    ], GameScene.prototype, "prefab", void 0);
    GameScene = __decorate([
        ccclass
    ], GameScene);
    return GameScene;
}(BaseComponent_1.BaseComponent));
exports.default = GameScene;

cc._RF.pop();