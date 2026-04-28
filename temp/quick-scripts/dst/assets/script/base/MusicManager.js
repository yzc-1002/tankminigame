
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxNdXNpY01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLGdDQUFZO0lBQTlDOztJQXNFQSxDQUFDO3FCQXRFWSxZQUFZO0lBS3JCLEtBQUs7SUFDRSx1QkFBVSxHQUFqQjtRQUNJLElBQUksY0FBWSxDQUFDLFVBQVUsSUFBSSxLQUFLLEVBQUU7WUFDbEMsY0FBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFL0IsT0FBTztZQUNQLGNBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzVCLEtBQUssSUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN0QyxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEMsY0FBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3BDO2FBQ0o7WUFFRCxPQUFPO1lBQ1AsY0FBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFDQSxxQkFBUSxHQUFmO1FBQ0ksSUFBSSxTQUFTLEdBQUcsY0FBWSxDQUFDLFNBQVMsQ0FBQyxjQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsaUNBQWlDO1FBQ2pDLElBQUksZ0JBQWdCLEdBQUcsVUFBUyxHQUFHLEVBQUUsT0FBTztZQUV4QyxjQUFZLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQztZQUM3QiwwQ0FBMEM7WUFFMUMsSUFBRyxPQUFPLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRTtnQkFDaEMsSUFBTSxTQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVDLFNBQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQzdCLElBQUcsU0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUM7b0JBQ3ZCLGNBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7WUFDRCxJQUFJLGNBQVksQ0FBQyxVQUFVLElBQUksY0FBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQzFELHVEQUF1RDthQUMxRDtpQkFDRztnQkFDQSxjQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzlELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBR0QsUUFBUTtJQUNELHNCQUFTLEdBQWhCLFVBQWlCLEdBQUc7UUFDaEIsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQy9CLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFFRCxNQUFNO0lBQ0MsdUJBQVUsR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQzs7SUFwRU0sdUJBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsdUJBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixzQkFBUyxHQUFHLEVBQUUsQ0FBQztJQUhiLFlBQVk7UUFEeEIsT0FBTztPQUNLLFlBQVksQ0FzRXhCO0lBQUQsbUJBQUM7Q0F0RUQsQUFzRUMsQ0F0RWlDLEVBQUUsQ0FBQyxTQUFTLEdBc0U3QztBQXRFWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIE11c2ljTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgX3N0YXJ0TG9hZCA9IGZhbHNlO1xyXG4gICAgc3RhdGljIF9sb2FkSW5kZXggPSAwO1xyXG4gICAgc3RhdGljIF9sb2FkTGlzdCA9IFtdO1xyXG5cclxuICAgIC8v5Yid5aeL5YyWXHJcbiAgICBzdGF0aWMgaW5pdENvbmZpZygpIHtcclxuICAgICAgICBpZiAoTXVzaWNNYW5hZ2VyLl9zdGFydExvYWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLl9zdGFydExvYWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy/ojrflj5ZrZXlcclxuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLl9sb2FkTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB5eXAuY29uZmlnLk11c2ljKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeXlwLmNvbmZpZy5NdXNpYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHl5cC5jb25maWcuTXVzaWNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBNdXNpY01hbmFnZXIuX2xvYWRMaXN0LnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/pooTliqDovb3pn7PmlYhcclxuICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLl9wcmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6aKE5Yqg6L296Z+z5pWIXHJcbiAgICBzdGF0aWMgX3ByZWxvYWQoKSB7XHJcbiAgICAgICAgbGV0IGVmZmVjdEtleSA9IE11c2ljTWFuYWdlci5fbG9hZExpc3RbTXVzaWNNYW5hZ2VyLl9sb2FkSW5kZXhdO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIl9wcmVsb2FkIFwiLGVmZmVjdEtleSk7XHJcbiAgICAgICAgbGV0IG9uUmVzb3VyY2VMb2FkZWQgPSBmdW5jdGlvbihlcnIsIGNvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIuX2xvYWRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJfcHJlbG9hZCBcIixlZmZlY3RLZXksXCJmaW5pc2hcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjb250ZW50IGluc3RhbmNlb2YgY2MuQXVkaW9DbGlwKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHl5cC5jb25maWcuTXVzaWNbZWZmZWN0S2V5XTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJjb250ZW50XCJdID0gY29udGVudDtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuUGxheU9ubG9hZCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheU11c2ljKGVmZmVjdEtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE11c2ljTWFuYWdlci5fbG9hZEluZGV4ID49IE11c2ljTWFuYWdlci5fbG9hZExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJfcHJlbG9hZCBjb21wbGV0ZSBcIiwobmV3IERhdGUoKSkudmFsdWVPZigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgTXVzaWNNYW5hZ2VyLl9wcmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHl5cC5jb25maWcuTXVzaWNbZWZmZWN0S2V5XTtcclxuICAgICAgICBsZXQgcGF0aCA9IGVsZW1lbnQgJiYgZWxlbWVudC5QYXRoID8gZWxlbWVudC5QYXRoIDogZWZmZWN0S2V5O1xyXG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcLlteLy5dKyQvLCBcIlwiKTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInNmeC9cIiArIHBhdGgsIGNjLkF1ZGlvQ2xpcCwgb25SZXNvdXJjZUxvYWRlZCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvL+aSreaUvuiDjOaZr+mfs+S5kFxyXG4gICAgc3RhdGljIHBsYXlNdXNpYyhrZXkpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0geXlwLmNvbmZpZy5NdXNpY1trZXldO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnRbXCJjb250ZW50XCJdKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhlbGVtZW50W1wiY29udGVudFwiXSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aSreaUvumfs+aViFxyXG4gICAgc3RhdGljIHBsYXlFZmZlY3Qoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHl5cC5jb25maWcuTXVzaWNba2V5XTtcclxuICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50W1wiY29udGVudFwiXSkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGVsZW1lbnRbXCJjb250ZW50XCJdLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==