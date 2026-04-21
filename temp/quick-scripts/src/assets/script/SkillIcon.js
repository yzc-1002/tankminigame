"use strict";
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