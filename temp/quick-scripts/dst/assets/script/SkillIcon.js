
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/SkillIcon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cfc3bTK9bNJM5ZEWj/OGjM+', 'SkillIcon');
// script/SkillIcon.ts

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
exports.SkillIcon = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var RewardAd_1 = require("./ad/RewardAd");
var Analytics_1 = require("./ad/Analytics");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillIcon = /** @class */ (function (_super) {
    __extends(SkillIcon, _super);
    function SkillIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //编辑器属性
        _this.skillSpriteFrames = [];
        //私有属性,请使用'_'开头,驼峰命名
        _this._skillId = 0; //0 金币 1 生命 2 超级子弹 3 无敌防御 
        _this._type = -1; //-1 准备状态 0 待使用 1 切换技能中
        _this._inUI = true; //在UI层(点击后切换到使用状态)
        _this._inStart = true; //在开始界面
        _this._useTime = 0; //使用剩余时间
        _this._AD = false; //点击播放广告
        _this._readyNeedTime = 30; //准备状态需要耗时
        _this._readyTime = 0; //准备状态已经用时
        _this._changeNeedTime = 10; //切换技能需要耗时
        _this._changeTime = 0; //切换技能已经用时
        _this._boundingBox = null;
        return _this;
    }
    //加载完成
    SkillIcon.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化事件
        this._initEvent();
    };
    SkillIcon.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    SkillIcon.prototype._initVariable = function () {
        this._skillId = Math.floor(Math.random() * 4);
    };
    //初始化UI
    SkillIcon.prototype._initUI = function () {
        this._resetSpriteFrame();
        this._refreshType();
    };
    //初始化事件
    SkillIcon.prototype._initEvent = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    };
    //销毁事件
    SkillIcon.prototype._destroyEvent = function () {
    };
    //替换icon
    SkillIcon.prototype._resetSpriteFrame = function () {
        this._fire._spDark.getComponent(cc.Sprite).spriteFrame = this.skillSpriteFrames[this._skillId];
        this._fire._spLight.getComponent(cc.Sprite).spriteFrame = this.skillSpriteFrames[this._skillId];
    };
    //每帧调用
    SkillIcon.prototype.update = function (dt) {
        if (this._type == -1) {
            if (this._readyTime >= this._readyNeedTime) {
                this._type = 0;
                this._refreshType();
            }
            else {
                //设置进度
                this._readyTime += dt;
                if (this._readyTime >= this._readyNeedTime) {
                    this._readyTime = this._readyNeedTime;
                }
                this._fire._spDark.$ProgressBar.progress = (this._readyNeedTime - this._readyTime) / this._readyNeedTime;
            }
        }
        else if (this._type == 1) {
            this._changeTime += dt;
            if (this._changeTime >= this._changeNeedTime) {
                this._type = -1;
                this._refreshType();
            }
        }
    };
    //切换显示状态
    SkillIcon.prototype._refreshType = function () {
        if (this._type == -1) {
            this._fire._lb.$Label.string = "准备中" + this._skillId;
            //显示icon
            this._fire._spDark.active = true;
            this._fire._spLight.active = true;
            this._fire._spLight["$flash-light"].setPause(); //暂停扫光
            this._readyTime = 0; //准备状态用时重置为0
        }
        else if (this._type == 0) {
            this._fire._lb.$Label.string = "点击使用" + this._skillId;
            this._fire._spLight["$flash-light"].setStart(); //开始扫光
            this._fire._spDark.$ProgressBar.progress = 0;
        }
        else if (this._type == 1) {
            this._fire._lb.$Label.string = "切换技能中";
            //隐藏icon
            this._fire._spDark.active = false;
            this._fire._spLight.active = false;
            //随机新的技能
            this._skillId = Math.floor(Math.random() * 4);
            this._resetSpriteFrame();
            this._fire._spDark.$ProgressBar.progress = 1;
            this._fire._spLight["$flash-light"].setPause(); //暂停扫光
            this._changeTime = 0; //切换技能用时重置为0
        }
    };
    SkillIcon.prototype._onTouchEnd = function (event) {
        if (this._type == 0) {
            if (this._inUI) {
                this.emitSkill();
                this._type = 1;
                this._refreshType();
                Analytics_1.Analytics.getInstance().eventEx('use_skill_random', { "skillId": this._skillId });
            }
            else if (this._AD) {
                if (RewardAd_1.RewardAd.getInstance().isLoad()) {
                    Analytics_1.Analytics.getInstance().eventEx('use_skill_video', { "skillId": this._skillId });
                    var self_1 = this;
                    yyp.eventCenter.emit('game-pause', {});
                    RewardAd_1.RewardAd.getInstance().show(function (complete) {
                        yyp.eventCenter.emit('game-resume', {});
                        if (complete) {
                            self_1.emitSkill();
                        }
                    });
                }
            }
        }
    };
    //发送技能事件
    SkillIcon.prototype.emitSkill = function () {
        yyp.eventCenter.emit('trigger-skill', { skillId: this._skillId });
    };
    //获取碰撞框
    SkillIcon.prototype.getSkillBoundingBox = function () {
        return Utils_1.Utils.getWorldBoundingBox(this._fire._spLight, 0.8);
    };
    //设置为可使用状态
    SkillIcon.prototype.setInGame = function () {
        this._inUI = false;
        this._type = 0;
        this._refreshType();
        this.node.runAction(cc.sequence(cc.delayTime(5), cc.fadeOut(1), cc.removeSelf()));
    };
    //设置为可使用状态
    SkillIcon.prototype.setInStart = function (skillId) {
        this._inUI = false;
        this._skillId = skillId;
        this._inStart = true;
        this._type = 0;
        this._refreshType();
        this._resetSpriteFrame();
    };
    //设置为可使用状态
    SkillIcon.prototype.setAD = function (skillId) {
        this._inUI = false;
        this._skillId = skillId;
        this._AD = true;
        this._type = 0;
        this._refreshType();
        this._resetSpriteFrame();
        this._fire._ad.active = true;
    };
    __decorate([
        property(cc.SpriteFrame)
    ], SkillIcon.prototype, "skillSpriteFrames", void 0);
    SkillIcon = __decorate([
        ccclass
    ], SkillIcon);
    return SkillIcon;
}(BaseComponent_1.BaseComponent));
exports.SkillIcon = SkillIcon;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxTa2lsbEljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFtRDtBQUNuRCxzQ0FBbUM7QUFDbkMsMENBQXVDO0FBQ3ZDLDRDQUF5QztBQUVuQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUErQiw2QkFBYTtJQUE1QztRQUFBLHFFQXdNQztRQXRNRyxPQUFPO1FBRVAsdUJBQWlCLEdBQXFCLEVBQUUsQ0FBQztRQUV6QyxvQkFBb0I7UUFDcEIsY0FBUSxHQUFNLENBQUMsQ0FBQyxDQUFPLDBCQUEwQjtRQUVqRCxXQUFLLEdBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBTyx1QkFBdUI7UUFDL0MsV0FBSyxHQUFTLElBQUksQ0FBQyxDQUFLLGtCQUFrQjtRQUMxQyxjQUFRLEdBQU0sSUFBSSxDQUFDLENBQUssT0FBTztRQUMvQixjQUFRLEdBQU0sQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUNoQyxTQUFHLEdBQVcsS0FBSyxDQUFDLENBQUksUUFBUTtRQUVoQyxvQkFBYyxHQUFJLEVBQUUsQ0FBQyxDQUFHLFVBQVU7UUFDbEMsZ0JBQVUsR0FBUSxDQUFDLENBQUMsQ0FBSSxVQUFVO1FBRWxDLHFCQUFlLEdBQUksRUFBRSxDQUFDLENBQUUsVUFBVTtRQUNsQyxpQkFBVyxHQUFRLENBQUMsQ0FBQyxDQUFHLFVBQVU7UUFFbEMsa0JBQVksR0FBTSxJQUFJLENBQUM7O0lBbUwzQixDQUFDO0lBakxHLE1BQU07SUFDTiwwQkFBTSxHQUFOO1FBQ0ksT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixPQUFPO1FBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsT0FBTztRQUNQLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lB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LENBQUM7UUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBbk1EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0RBQ2dCO0lBSmhDLFNBQVM7UUFEckIsT0FBTztPQUNLLFNBQVMsQ0F3TXJCO0lBQUQsZ0JBQUM7Q0F4TUQsQUF3TUMsQ0F4TThCLDZCQUFhLEdBd00zQztBQXhNWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHtSZXdhcmRBZH0gZnJvbSBcIi4vYWQvUmV3YXJkQWRcIjtcclxuaW1wb3J0IHtBbmFseXRpY3N9IGZyb20gXCIuL2FkL0FuYWx5dGljc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU2tpbGxJY29uIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgLy/nvJbovpHlmajlsZ7mgKdcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHNraWxsU3ByaXRlRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgLy/np4HmnInlsZ7mgKcs6K+35L2/55SoJ18n5byA5aS0LOmpvOWzsOWRveWQjVxyXG4gICAgX3NraWxsSWQgICAgPSAwOyAgICAgICAvLzAg6YeR5biBIDEg55Sf5ZG9IDIg6LaF57qn5a2Q5by5IDMg5peg5pWM6Ziy5b6hIFxyXG5cclxuICAgIF90eXBlICAgICAgID0gLTE7ICAgICAgIC8vLTEg5YeG5aSH54q25oCBIDAg5b6F5L2/55SoIDEg5YiH5o2i5oqA6IO95LitXHJcbiAgICBfaW5VSSAgICAgICA9IHRydWU7ICAgICAvL+WcqFVJ5bGCKOeCueWHu+WQjuWIh+aNouWIsOS9v+eUqOeKtuaAgSlcclxuICAgIF9pblN0YXJ0ICAgID0gdHJ1ZTsgICAgIC8v5Zyo5byA5aeL55WM6Z2iXHJcbiAgICBfdXNlVGltZSAgICA9IDA7ICAgICAgICAvL+S9v+eUqOWJqeS9meaXtumXtFxyXG4gICAgX0FEICAgICAgICAgPSBmYWxzZTsgICAgLy/ngrnlh7vmkq3mlL7lub/lkYpcclxuXHJcbiAgICBfcmVhZHlOZWVkVGltZSAgPSAzMDsgICAvL+WHhuWkh+eKtuaAgemcgOimgeiAl+aXtlxyXG4gICAgX3JlYWR5VGltZSAgICAgID0gMDsgICAgLy/lh4blpIfnirbmgIHlt7Lnu4/nlKjml7ZcclxuXHJcbiAgICBfY2hhbmdlTmVlZFRpbWUgID0gMTA7ICAvL+WIh+aNouaKgOiDvemcgOimgeiAl+aXtlxyXG4gICAgX2NoYW5nZVRpbWUgICAgICA9IDA7ICAgLy/liIfmjaLmioDog73lt7Lnu4/nlKjml7ZcclxuXHJcbiAgICBfYm91bmRpbmdCb3ggICAgPSBudWxsO1xyXG5cclxuICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liJ3lp4vljJZVSVxyXG4gICAgICAgIHRoaXMuX2luaXRVSSgpO1xyXG5cclxuICAgICAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX3NraWxsSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJZVSVxyXG4gICAgX2luaXRVSSgpe1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0U3ByaXRlRnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoVHlwZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICBfZGVzdHJveUV2ZW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pu/5o2iaWNvblxyXG4gICAgX3Jlc2V0U3ByaXRlRnJhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BEYXJrLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5za2lsbFNwcml0ZUZyYW1lc1t0aGlzLl9za2lsbElkXTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcExpZ2h0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5za2lsbFNwcml0ZUZyYW1lc1t0aGlzLl9za2lsbElkXTtcclxuICAgIH1cclxuXHJcbiAgICAvL+avj+W4p+iwg+eUqFxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90eXBlID09IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWFkeVRpbWUgPj0gdGhpcy5fcmVhZHlOZWVkVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHlwZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoVHlwZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+iuvue9rui/m+W6plxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZHlUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlYWR5VGltZSA+PSB0aGlzLl9yZWFkeU5lZWRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVhZHlUaW1lID0gdGhpcy5fcmVhZHlOZWVkVGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwRGFyay4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAodGhpcy5fcmVhZHlOZWVkVGltZS10aGlzLl9yZWFkeVRpbWUpL3RoaXMuX3JlYWR5TmVlZFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hhbmdlVGltZSA+PSB0aGlzLl9jaGFuZ2VOZWVkVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHlwZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFR5cGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/liIfmjaLmmL7npLrnirbmgIFcclxuICAgIF9yZWZyZXNoVHlwZSgpe1xyXG4gICAgICAgIGlmICh0aGlzLl90eXBlID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2xiLiRMYWJlbC5zdHJpbmcgPSBcIuWHhuWkh+S4rVwiK3RoaXMuX3NraWxsSWQ7XHJcblxyXG4gICAgICAgICAgICAvL+aYvuekumljb25cclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3BEYXJrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwTGlnaHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwTGlnaHRbXCIkZmxhc2gtbGlnaHRcIl0uc2V0UGF1c2UoKTsgLy/mmoLlgZzmiavlhYlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWR5VGltZSA9IDA7ICAgIC8v5YeG5aSH54q25oCB55So5pe26YeN572u5Li6MFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl90eXBlID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGIuJExhYmVsLnN0cmluZyA9IFwi54K55Ye75L2/55SoXCIrdGhpcy5fc2tpbGxJZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwTGlnaHRbXCIkZmxhc2gtbGlnaHRcIl0uc2V0U3RhcnQoKTsgLy/lvIDlp4vmiavlhYlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwRGFyay4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGIuJExhYmVsLnN0cmluZyA9IFwi5YiH5o2i5oqA6IO95LitXCI7XHJcblxyXG4gICAgICAgICAgICAvL+makOiXj2ljb25cclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3BEYXJrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcExpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy/pmo/mnLrmlrDnmoTmioDog71cclxuICAgICAgICAgICAgdGhpcy5fc2tpbGxJZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo0KTtcclxuICAgICAgICAgICAgdGhpcy5fcmVzZXRTcHJpdGVGcmFtZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fc3BEYXJrLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDE7ICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwTGlnaHRbXCIkZmxhc2gtbGlnaHRcIl0uc2V0UGF1c2UoKTsgLy/mmoLlgZzmiavlhYlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVRpbWUgPSAwOyAgICAvL+WIh+aNouaKgOiDveeUqOaXtumHjee9ruS4ujBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9vblRvdWNoRW5kKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2luVUkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90eXBlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICBBbmFseXRpY3MuZ2V0SW5zdGFuY2UoKS5ldmVudEV4KCd1c2Vfc2tpbGxfcmFuZG9tJyx7XCJza2lsbElkXCI6dGhpcy5fc2tpbGxJZH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX0FEKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUmV3YXJkQWQuZ2V0SW5zdGFuY2UoKS5pc0xvYWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ3VzZV9za2lsbF92aWRlbycse1wic2tpbGxJZFwiOnRoaXMuX3NraWxsSWR9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2dhbWUtcGF1c2UnLHt9KTtcclxuICAgICAgICAgICAgICAgICAgICBSZXdhcmRBZC5nZXRJbnN0YW5jZSgpLnNob3coZnVuY3Rpb24oY29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgnZ2FtZS1yZXN1bWUnLHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB5oqA6IO95LqL5Lu2XHJcbiAgICBlbWl0U2tpbGwoKXtcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgndHJpZ2dlci1za2lsbCcse3NraWxsSWQ6dGhpcy5fc2tpbGxJZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5qGGXHJcbiAgICBnZXRTa2lsbEJvdW5kaW5nQm94KCl7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLmdldFdvcmxkQm91bmRpbmdCb3godGhpcy5fZmlyZS5fc3BMaWdodCwwLjgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iuvue9ruS4uuWPr+S9v+eUqOeKtuaAgVxyXG4gICAgc2V0SW5HYW1lKCl7XHJcbiAgICAgICAgdGhpcy5faW5VSSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSAwO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hUeXBlKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDUpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDEpLFxyXG4gICAgICAgICAgICBjYy5yZW1vdmVTZWxmKClcclxuICAgICAgICApKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/orr7nva7kuLrlj6/kvb/nlKjnirbmgIFcclxuICAgIHNldEluU3RhcnQoc2tpbGxJZCl7XHJcbiAgICAgICAgdGhpcy5faW5VSSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NraWxsSWQgPSBza2lsbElkO1xyXG4gICAgICAgIHRoaXMuX2luU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSAwO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2hUeXBlKCk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRTcHJpdGVGcmFtZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iuvue9ruS4uuWPr+S9v+eUqOeKtuaAgVxyXG4gICAgc2V0QUQoc2tpbGxJZCl7XHJcbiAgICAgICAgdGhpcy5faW5VSSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NraWxsSWQgPSBza2lsbElkO1xyXG4gICAgICAgIHRoaXMuX0FEID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90eXBlID0gMDtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoVHlwZSgpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0U3ByaXRlRnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9maXJlLl9hZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==