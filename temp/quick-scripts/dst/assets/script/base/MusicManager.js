
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/base/MusicManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var LocalizedData_1 = require("./LocalizedData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BG_MUSIC_VOLUME = 0.35;
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
            MusicManager_1.refreshMusicVolume();
        }
    };
    MusicManager.refreshMusicVolume = function () {
        var musicFlg = LocalizedData_1.LocalizedData.getIntItem("_music_flg_", 1);
        cc.audioEngine.setMusicVolume(musicFlg == 1 ? BG_MUSIC_VOLUME : 0);
    };
    //播放音效
    MusicManager.playEffect = function (key) {
        var element = yyp.config.Music[key];
        if (element && element["content"]) {
            cc.audioEngine.playEffect(element["content"], false);
        }
    };
    MusicManager.playLoopEffect = function (key) {
        var element = yyp.config.Music[key];
        if (element && element["content"]) {
            return cc.audioEngine.playEffect(element["content"], true);
        }
        return -1;
    };
    MusicManager.stopEffect = function (audioId) {
        if (audioId != null && audioId >= 0) {
            cc.audioEngine.stopEffect(audioId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxNdXNpY01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE4QztBQUV4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFHN0I7SUFBa0MsZ0NBQVk7SUFBOUM7O0lBMEZBLENBQUM7cUJBMUZZLFlBQVk7SUFLckIsS0FBSztJQUNFLHVCQUFVLEdBQWpCO1FBQ0ksSUFBSSxjQUFZLENBQUMsVUFBVSxJQUFJLEtBQUssRUFBRTtZQUNsQyxjQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUUvQixPQUFPO1lBQ1AsY0FBWSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDNUIsS0FBSyxJQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDaEMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3RDLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxjQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEM7YUFDSjtZQUVELE9BQU87WUFDUCxjQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsT0FBTztJQUNBLHFCQUFRLEdBQWY7UUFDSSxJQUFJLFNBQVMsR0FBRyxjQUFZLENBQUMsU0FBUyxDQUFDLGNBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRSxpQ0FBaUM7UUFDakMsSUFBSSxnQkFBZ0IsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPO1lBRXhDLGNB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Q0FBQyxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQzs7SUF4Rk0sdUJBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsdUJBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixzQkFBUyxHQUFHLEVBQUUsQ0FBQztJQUhiLFlBQVk7UUFEeEIsT0FBTztPQUNLLFlBQVksQ0EwRnhCO0lBQUQsbUJBQUM7Q0ExRkQsQUEwRkMsQ0ExRmlDLEVBQUUsQ0FBQyxTQUFTLEdBMEY3QztBQTFGWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vTG9jYWxpemVkRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IEJHX01VU0lDX1ZPTFVNRSA9IDAuMzU7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgTXVzaWNNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBfc3RhcnRMb2FkID0gZmFsc2U7XHJcbiAgICBzdGF0aWMgX2xvYWRJbmRleCA9IDA7XHJcbiAgICBzdGF0aWMgX2xvYWRMaXN0ID0gW107XHJcblxyXG4gICAgLy/liJ3lp4vljJZcclxuICAgIHN0YXRpYyBpbml0Q29uZmlnKCkge1xyXG4gICAgICAgIGlmIChNdXNpY01hbmFnZXIuX3N0YXJ0TG9hZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuX3N0YXJ0TG9hZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL+iOt+WPlmtleVxyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuX2xvYWRMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHl5cC5jb25maWcuTXVzaWMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh5eXAuY29uZmlnLk11c2ljLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0geXlwLmNvbmZpZy5NdXNpY1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5fbG9hZExpc3QucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+mihOWKoOi9vemfs+aViFxyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuX3ByZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/pooTliqDovb3pn7PmlYhcclxuICAgIHN0YXRpYyBfcHJlbG9hZCgpIHtcclxuICAgICAgICBsZXQgZWZmZWN0S2V5ID0gTXVzaWNNYW5hZ2VyLl9sb2FkTGlzdFtNdXNpY01hbmFnZXIuX2xvYWRJbmRleF07XHJcbiAgICAgICAgLy8gY2MubG9nKFwiX3ByZWxvYWQgXCIsZWZmZWN0S2V5KTtcclxuICAgICAgICBsZXQgb25SZXNvdXJjZUxvYWRlZCA9IGZ1bmN0aW9uKGVyciwgY29udGVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5fbG9hZEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIl9wcmVsb2FkIFwiLGVmZmVjdEtleSxcImZpbmlzaFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGNvbnRlbnQgaW5zdGFuY2VvZiBjYy5BdWRpb0NsaXApIHsgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0geXlwLmNvbmZpZy5NdXNpY1tlZmZlY3RLZXldO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFtcImNvbnRlbnRcIl0gPSBjb250ZW50O1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5QbGF5T25sb2FkID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5TXVzaWMoZWZmZWN0S2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTXVzaWNNYW5hZ2VyLl9sb2FkSW5kZXggPj0gTXVzaWNNYW5hZ2VyLl9sb2FkTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIl9wcmVsb2FkIGNvbXBsZXRlIFwiLChuZXcgRGF0ZSgpKS52YWx1ZU9mKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBNdXNpY01hbmFnZXIuX3ByZWxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50ID0geXlwLmNvbmZpZy5NdXNpY1tlZmZlY3RLZXldO1xyXG4gICAgICAgIGxldCBwYXRoID0gZWxlbWVudCAmJiBlbGVtZW50LlBhdGggPyBlbGVtZW50LlBhdGggOiBlZmZlY3RLZXk7XHJcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwuW14vLl0rJC8sIFwiXCIpO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwic2Z4L1wiICsgcGF0aCwgY2MuQXVkaW9DbGlwLCBvblJlc291cmNlTG9hZGVkKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8v5pKt5pS+6IOM5pmv6Z+z5LmQXHJcbiAgICBzdGF0aWMgcGxheU11c2ljKGtleSkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB5eXAuY29uZmlnLk11c2ljW2tleV07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudFtcImNvbnRlbnRcIl0pIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKGVsZW1lbnRbXCJjb250ZW50XCJdLCB0cnVlKTtcclxuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLnJlZnJlc2hNdXNpY1ZvbHVtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVmcmVzaE11c2ljVm9sdW1lKCkge1xyXG4gICAgICAgIGxldCBtdXNpY0ZsZyA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9tdXNpY19mbGdfXCIsMSk7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUobXVzaWNGbGcgPT0gMSA/IEJHX01VU0lDX1ZPTFVNRSA6IDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aSreaUvumfs+aViFxyXG4gICAgc3RhdGljIHBsYXlFZmZlY3Qoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHl5cC5jb25maWcuTXVzaWNba2V5XTtcclxuICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50W1wiY29udGVudFwiXSkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGVsZW1lbnRbXCJjb250ZW50XCJdLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwbGF5TG9vcEVmZmVjdChrZXkpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0geXlwLmNvbmZpZy5NdXNpY1trZXldO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnRbXCJjb250ZW50XCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGVsZW1lbnRbXCJjb250ZW50XCJdLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzdG9wRWZmZWN0KGF1ZGlvSWQpIHtcclxuICAgICAgICBpZiAoYXVkaW9JZCAhPSBudWxsICYmIGF1ZGlvSWQgPj0gMCkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wRWZmZWN0KGF1ZGlvSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=