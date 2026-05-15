
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Finish.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '338d2kroLJIwbxydW5tAYQb', 'Finish');
// script/Finish.ts

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
var Utils_1 = require("./base/Utils");
var BaseComponent_1 = require("./base/BaseComponent");
var MusicManager_1 = require("./base/MusicManager");
var Analytics_1 = require("./ad/Analytics");
var RewardAd_1 = require("../script/ad/RewardAd");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Finish = /** @class */ (function (_super) {
    __extends(Finish, _super);
    function Finish() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._levelId = 1; //关卡id
        _this._result = true; //true 胜利 false 失败
        _this._coinCount = 0;
        return _this;
    }
    Finish.prototype.onLoad = function () {
    };
    Finish.prototype.start = function () {
    };
    Finish.prototype._aniFinished = function () {
        this._fire._btnGet.runAction(cc.sequence(cc.delayTime(1), cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1), cc.scaleTo(0.05, 1.05, 1.05), cc.scaleTo(0.02, 1, 1)).repeatForever());
        var self = this;
        this._fire._nToggle.runAction(cc.sequence(cc.delayTime(3), cc.fadeIn(0.1), cc.callFunc(function () {
            self._fire._toggle.active = true;
        })));
    };
    Finish.prototype.setResult = function (levelId, result, isMultiplayer, multiplayerResultText) {
        if (isMultiplayer === void 0) { isMultiplayer = false; }
        if (multiplayerResultText === void 0) { multiplayerResultText = ""; }
        this._levelId = levelId;
        this._result = result;
        //关卡
        this._fire._lbLevel.$Label.string = isMultiplayer ? ("多人对战") : levelId;
        //金币
        var levelConfig = yyp.config.Level[0];
        var coinCount = levelConfig.CoinCount * levelId * 1.5;
        this._coinCount = this._result ? coinCount : Math.floor(coinCount / 3);
        this._fire._lbCoin.$Label.string = this._coinCount * 3;
        //title
        this._fire._sprWinBg.active = this._result;
        this._fire._sprWin.active = this._result;
        this._fire._sprFail.active = !this._result;
        //按钮
        this._fire._nToggle.opacity = 0;
        this._fire._toggle.active = false;
        var multiplayerTips = multiplayerResultText || "";
        if (!multiplayerTips && isMultiplayer) {
            multiplayerTips = this._result ? "本局胜利，已完成多人结算" : "本局失利，等待下一局再战";
        }
        if (this._result == true) {
            Analytics_1.Analytics.getInstance().eventEx('win_game', { "level": this._levelId });
            MusicManager_1.MusicManager.playEffect("win");
            if (isMultiplayer && this._fire._lbRewardsTIps && this._fire._lbRewardsTIps.$Label) {
                this._fire._lbRewardsTIps.$Label.string = multiplayerTips;
            }
        }
        else {
            Analytics_1.Analytics.getInstance().eventEx('failed_game', { "level": this._levelId });
            MusicManager_1.MusicManager.playEffect("failed");
            if (isMultiplayer && this._fire._lbRewardsTIps && this._fire._lbRewardsTIps.$Label) {
                this._fire._lbRewardsTIps.$Label.string = multiplayerTips;
            }
        }
        var ani = this.node.getComponent(cc.Animation);
        ani.play("Finish");
        ani.on("finished", this._aniFinished, this);
    };
    Finish.prototype.onBtnClick = function (event) {
        MusicManager_1.MusicManager.playEffect("btn");
        var coin = this._coinCount;
        if (this._fire._toggle.$Toggle.isChecked) {
            if (RewardAd_1.RewardAd.getInstance().isLoad()) {
                Analytics_1.Analytics.getInstance().eventEx('finish_video', { "level": this._levelId });
                var self_1 = this;
                RewardAd_1.RewardAd.getInstance().show(function (complete) {
                    yyp.eventCenter.emit('add-coin', { count: (complete ? coin * 3 : coin), position: Utils_1.Utils.getWorldPosition(self_1._fire._sprCoin) });
                    yyp.eventCenter.emit('restart', {});
                    self_1.node.destroy();
                });
            }
            else {
                yyp.eventCenter.emit('add-coin', { count: coin, position: Utils_1.Utils.getWorldPosition(this._fire._sprCoin) });
                yyp.eventCenter.emit('restart', {});
                this.node.destroy();
            }
        }
        else {
            yyp.eventCenter.emit('add-coin', { count: coin, position: Utils_1.Utils.getWorldPosition(this._fire._sprCoin) });
            yyp.eventCenter.emit('restart', {});
            this.node.destroy();
        }
    };
    Finish.prototype.onToggleClick = function (event) {
        MusicManager_1.MusicManager.playEffect("btn");
        if (this._fire._toggle.$Toggle.isChecked) {
            this._fire._lbRewardsTIps.active = true;
            this._fire._lbCoin.$Label.string = this._coinCount * 3;
        }
        else {
            this._fire._lbRewardsTIps.active = false;
            this._fire._lbCoin.$Label.string = this._coinCount;
        }
    };
    Finish = __decorate([
        ccclass
    ], Finish);
    return Finish;
}(BaseComponent_1.BaseComponent));
exports.default = Finish;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxGaW5pc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1DO0FBQ25DLHNEQUFxRDtBQUNyRCxvREFBbUQ7QUFFbkQsNENBQXlDO0FBQ3pDLGtEQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBYTtJQUFqRDtRQUFBLHFFQXVIQztRQXJIRyxjQUFRLEdBQUksQ0FBQyxDQUFDLENBQU0sTUFBTTtRQUMxQixhQUFPLEdBQUcsSUFBSSxDQUFDLENBQUssa0JBQWtCO1FBQ3RDLGdCQUFVLEdBQUcsQ0FBQyxDQUFDOztJQW1IbkIsQ0FBQztJQWhIRyx1QkFBTSxHQUFOO0lBQ0EsQ0FBQztJQUVELHNCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsNkJBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUNwQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFDdkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUNuQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQzFCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FDdkIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRW5CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFD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QyxTQUFTLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDO1NBQ3hEO2FBQ0c7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUF0SGdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0F1SDFCO0lBQUQsYUFBQztDQXZIRCxBQXVIQyxDQXZIbUMsNkJBQWEsR0F1SGhEO2tCQXZIb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UvQmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5cclxuaW1wb3J0IHtBbmFseXRpY3N9IGZyb20gXCIuL2FkL0FuYWx5dGljc1wiO1xyXG5pbXBvcnQge1Jld2FyZEFkfSBmcm9tIFwiLi4vc2NyaXB0L2FkL1Jld2FyZEFkXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbmlzaCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xyXG5cclxuICAgIF9sZXZlbElkID0gIDE7ICAgICAgLy/lhbPljaFpZFxyXG4gICAgX3Jlc3VsdCA9IHRydWU7ICAgICAvL3RydWUg6IOc5YipIGZhbHNlIOWksei0pVxyXG4gICAgX2NvaW5Db3VudCA9IDA7XHJcbiAgICBcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX2FuaUZpbmlzaGVkICgpIHtcclxuICAgICAgICB0aGlzLl9maXJlLl9idG5HZXQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLDEuMiwxLjIpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwxLDEpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDUsMS4wNSwxLjA1KSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjAyLDEsMSlcclxuICAgICAgICApLnJlcGVhdEZvcmV2ZXIoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25Ub2dnbGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMyksXHJcbiAgICAgICAgICAgIGNjLmZhZGVJbigwLjEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZmlyZS5fdG9nZ2xlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVzdWx0KGxldmVsSWQscmVzdWx0LGlzTXVsdGlwbGF5ZXIgPSBmYWxzZSwgbXVsdGlwbGF5ZXJSZXN1bHRUZXh0ID0gXCJcIil7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJZCA9IGxldmVsSWRcclxuICAgICAgICB0aGlzLl9yZXN1bHQgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgIC8v5YWz5Y2hXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJMZXZlbC4kTGFiZWwuc3RyaW5nID0gaXNNdWx0aXBsYXllciA/IChcIuWkmuS6uuWvueaImFwiKSA6IGxldmVsSWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ph5HluIFcclxuICAgICAgICBsZXQgbGV2ZWxDb25maWcgPSB5eXAuY29uZmlnLkxldmVsWzBdO1xyXG4gICAgICAgIGxldCBjb2luQ291bnQgPSBsZXZlbENvbmZpZy5Db2luQ291bnQqbGV2ZWxJZCoxLjU7XHJcbiAgICAgICAgdGhpcy5fY29pbkNvdW50ID0gdGhpcy5fcmVzdWx0ID8gY29pbkNvdW50IDogTWF0aC5mbG9vcihjb2luQ291bnQvMyk7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbGJDb2luLiRMYWJlbC5zdHJpbmcgPSB0aGlzLl9jb2luQ291bnQqMztcclxuICAgICAgICBcclxuICAgICAgICAvL3RpdGxlXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByV2luQmcuYWN0aXZlID0gdGhpcy5fcmVzdWx0O1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3Nwcldpbi5hY3RpdmUgPSB0aGlzLl9yZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByRmFpbC5hY3RpdmUgPSAhdGhpcy5fcmVzdWx0O1xyXG5cclxuICAgICAgICAvL+aMiemSrlxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX25Ub2dnbGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fdG9nZ2xlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgbXVsdGlwbGF5ZXJUaXBzID0gbXVsdGlwbGF5ZXJSZXN1bHRUZXh0IHx8IFwiXCI7XHJcbiAgICAgICAgaWYgKCFtdWx0aXBsYXllclRpcHMgJiYgaXNNdWx0aXBsYXllcikge1xyXG4gICAgICAgICAgICBtdWx0aXBsYXllclRpcHMgPSB0aGlzLl9yZXN1bHQgPyBcIuacrOWxgOiDnOWIqe+8jOW3suWujOaIkOWkmuS6uue7k+eul1wiIDogXCLmnKzlsYDlpLHliKnvvIznrYnlvoXkuIvkuIDlsYDlho3miJhcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yZXN1bHQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBBbmFseXRpY3MuZ2V0SW5zdGFuY2UoKS5ldmVudEV4KCd3aW5fZ2FtZScse1wibGV2ZWxcIjp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwid2luXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNNdWx0aXBsYXllciAmJiB0aGlzLl9maXJlLl9sYlJld2FyZHNUSXBzICYmIHRoaXMuX2ZpcmUuX2xiUmV3YXJkc1RJcHMuJExhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLl9sYlJld2FyZHNUSXBzLiRMYWJlbC5zdHJpbmcgPSBtdWx0aXBsYXllclRpcHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgQW5hbHl0aWNzLmdldEluc3RhbmNlKCkuZXZlbnRFeCgnZmFpbGVkX2dhbWUnLHtcImxldmVsXCI6dGhpcy5fbGV2ZWxJZH0pO1xyXG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcImZhaWxlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGF5ZXIgJiYgdGhpcy5fZmlyZS5fbGJSZXdhcmRzVElwcyAmJiB0aGlzLl9maXJlLl9sYlJld2FyZHNUSXBzLiRMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGJSZXdhcmRzVElwcy4kTGFiZWwuc3RyaW5nID0gbXVsdGlwbGF5ZXJUaXBzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgYW5pLnBsYXkoXCJGaW5pc2hcIik7XHJcbiAgICAgICAgYW5pLm9uKFwiZmluaXNoZWRcIiwgdGhpcy5fYW5pRmluaXNoZWQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIG9uQnRuQ2xpY2sgKGV2ZW50KSB7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJidG5cIik7XHJcbiAgICAgICAgbGV0IGNvaW4gPSB0aGlzLl9jb2luQ291bnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcmUuX3RvZ2dsZS4kVG9nZ2xlLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKFJld2FyZEFkLmdldEluc3RhbmNlKCkuaXNMb2FkKCkpIHtcclxuICAgICAgICAgICAgICAgIEFuYWx5dGljcy5nZXRJbnN0YW5jZSgpLmV2ZW50RXgoJ2ZpbmlzaF92aWRlbycse1wibGV2ZWxcIjp0aGlzLl9sZXZlbElkfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBSZXdhcmRBZC5nZXRJbnN0YW5jZSgpLnNob3coZnVuY3Rpb24oY29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KCdhZGQtY29pbicse2NvdW50Oihjb21wbGV0ZSA/IGNvaW4qMyA6IGNvaW4pLHBvc2l0aW9uOlV0aWxzLmdldFdvcmxkUG9zaXRpb24oc2VsZi5fZmlyZS5fc3ByQ29pbil9KTtcclxuICAgICAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgncmVzdGFydCcse30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ2FkZC1jb2luJyx7Y291bnQ6Y29pbixwb3NpdGlvbjpVdGlscy5nZXRXb3JsZFBvc2l0aW9uKHRoaXMuX2ZpcmUuX3NwckNvaW4pfSk7XHJcbiAgICAgICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgncmVzdGFydCcse30pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdCgnYWRkLWNvaW4nLHtjb3VudDpjb2luLHBvc2l0aW9uOlV0aWxzLmdldFdvcmxkUG9zaXRpb24odGhpcy5fZmlyZS5fc3ByQ29pbil9KTtcclxuICAgICAgICAgICAgeXlwLmV2ZW50Q2VudGVyLmVtaXQoJ3Jlc3RhcnQnLHt9KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblRvZ2dsZUNsaWNrIChldmVudCkge1xyXG4gICAgICAgIE11c2ljTWFuYWdlci5wbGF5RWZmZWN0KFwiYnRuXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9maXJlLl90b2dnbGUuJFRvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbGJSZXdhcmRzVElwcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9sYkNvaW4uJExhYmVsLnN0cmluZyA9IHRoaXMuX2NvaW5Db3VudCozO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9sYlJld2FyZHNUSXBzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9sYkNvaW4uJExhYmVsLnN0cmluZyA9IHRoaXMuX2NvaW5Db3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19