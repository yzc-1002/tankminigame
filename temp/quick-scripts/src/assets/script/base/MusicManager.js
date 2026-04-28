"use strict";
cc._RF.push(module, '6a2c785fGJFQZNpmhySQEsV', 'MusicManager');
// script/base/MusicManager.ts

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
exports.MusicManager = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MusicManager = /** @class */ (function (_super) {
    __extends(MusicManager, _super);
    function MusicManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MusicManager_1 = MusicManager;
    //初始化
    MusicManager.initConfig = function () {
        if (MusicManager_1._startLoad == false) {
            MusicManager_1._startLoad = true;
            //获取key
            MusicManager_1._loadList = [];
            for (var key in yyp.config.Music) {
                if (yyp.config.Music.hasOwnProperty(key)) {
                    var element = yyp.config.Music[key];
                    MusicManager_1._loadList.push(key);
                }
            }
            //预加载音效
            MusicManager_1._preload();
        }
    };
    //预加载音效
    MusicManager._preload = function () {
        var effectKey = MusicManager_1._loadList[MusicManager_1._loadIndex];
        // cc.log("_preload ",effectKey);
        var onResourceLoaded = function (err, content) {
            MusicManager_1._loadIndex += 1;
            // cc.log("_preload ",effectKey,"finish");
            if (content instanceof cc.AudioClip) {
                var element_1 = yyp.config.Music[effectKey];
                element_1["content"] = content;
                if (element_1.PlayOnload == 1) {
                    MusicManager_1.playMusic(effectKey);
                }
            }
            if (MusicManager_1._loadIndex >= MusicManager_1._loadList.length) {
                // cc.log("_preload complete ",(new Date()).valueOf());
            }
            else {
                MusicManager_1._preload();
            }
        };
        var element = yyp.config.Music[effectKey];
        var path = element && element.Path ? element.Path : effectKey;
        path = path.replace(/\.[^/.]+$/, "");
        cc.resources.load("sfx/" + path, cc.AudioClip, onResourceLoaded);
    };
    //播放背景音乐
    MusicManager.playMusic = function (key) {
        var element = yyp.config.Music[key];
        if (element && element["content"]) {
            cc.audioEngine.playMusic(element["content"], true);
        }
    };
    //播放音效
    MusicManager.playEffect = function (key) {
        var element = yyp.config.Music[key];
        if (element && element["content"]) {
            cc.audioEngine.playEffect(element["content"], false);
        }
    };
    var MusicManager_1;
    MusicManager._startLoad = false;
    MusicManager._loadIndex = 0;
    MusicManager._loadList = [];
    MusicManager = MusicManager_1 = __decorate([
        ccclass
    ], MusicManager);
    return MusicManager;
}(cc.Component));
exports.MusicManager = MusicManager;

cc._RF.pop();