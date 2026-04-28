
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e97ecu80ttNFr9kT3GtI0W3', 'Player');
// script/Player.ts

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
exports.Player = void 0;
var TankE_1 = require("./TankE");
var Utils_1 = require("./base/Utils");
var BulletE_1 = require("./BulletE");
var MusicManager_1 = require("./base/MusicManager");
var SDKManager_1 = require("./sdk/sdk/SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PLAYER_SHOOT_INTERVAL = 0.35;
var PLAYER_FREE_BULLET_MAX = 3;
var PLAYER_FREE_BULLET_RECOVER_DELAY = 0.8;
var PLAYER_FREE_BULLET_RECOVER_INTERVAL = 0.6;
var PLAYER_PAID_SHOT_HP_COST = 5 * (1 - 0.1);
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //内部变量
        _this._level = 1; //玩家等级
        _this._bulletCodeTime = 0; //射击冷却时间
        _this._isHighBullet = false; //三发高频子弹
        _this._skill2Time = 0; //技能2(超级子弹)剩余时间
        _this._skill3Time = 0; //技能3(无敌防御)剩余时间
        _this._inGame = false; //在游戏中中使用
        _this._viewMode = false; //展示模式
        _this._freeBulletCount = PLAYER_FREE_BULLET_MAX; //当前免费子弹数量
        _this._stopFireTime = 0; //停火计时
        _this._freeBulletRecoverTime = 0; //免费子弹恢复计时
        _this._moveInputDir = cc.v2(1, 0); //移动摇杆目标方向
        _this._moveInputRatio = 0; //移动摇杆目标速率
        return _this;
    }
    Player.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //初始化变量
        this._initVariable();
        //初始化UI
        this._initUI();
        //初始化接收事件
        this._initEvent();
    };
    //初始化变量
    Player.prototype._initVariable = function () {
        this._camp = "player"; //阵营
        this._radius = this._radius * 2; //玩家的碰撞检测范围*2
        this._bulletCodeTime = PLAYER_SHOOT_INTERVAL;
        this._freeBulletCount = PLAYER_FREE_BULLET_MAX;
        this._stopFireTime = 0;
        this._freeBulletRecoverTime = 0;
        this._currentSpeed = 0;
        this._moveInputDir = this._dir;
        this._moveInputRatio = 0;
    };
    //设置坦克类型
    Player.prototype.setPlayerType = function (tankType, playerLevel) {
        _super.prototype.setTankType.call(this, tankType);
        //计算玩家血量 攻击
        this._level = playerLevel;
        this._hp = this._maxHp = this._config.HP * (this._level + 1);
        this._atk = this._config.ATK * (this._level + 1);
    };
    //初始化UI
    Player.prototype._initUI = function () {
        this._fire._lifebar.active = false;
        this._fire._spArmour.active = false;
        this._fire._spSkill2.active = false;
        this._fire._spSkill3.active = false;
        this._refreshFreeBulletBar();
    };
    //初始化接收事件
    Player.prototype._initEvent = function () {
        yyp.eventCenter.on('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.on('joy-stick-shoot', this._doShootJoyStick, this); //射击摇杆事件
        yyp.eventCenter.on('trigger-skill', this._doSkill, this); //触发技能
    };
    //销毁事件
    Player.prototype._destroyEvent = function () {
        yyp.eventCenter.off('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.off('joy-stick-shoot', this._doShootJoyStick, this); //射击摇杆事件
        yyp.eventCenter.off('trigger-skill', this._doSkill, this); //触发技能
    };
    //摇杆事件
    Player.prototype._doJoyStick = function (event) {
        if (this._inGame) {
            if (event.dir && event.dir.magSqr() > 0) {
                this._moveInputDir = event.dir; //方向
            }
            this._moveInputRatio = event.ratio; //速率
        }
    };
    //射击摇杆事件
    Player.prototype._doShootJoyStick = function (event) {
        if (this._inGame == false)
            return;
        if (event.fire === true) {
            this._tryFireOnce();
        }
    };
    //触发技能
    Player.prototype._doSkill = function (event) {
        if (this._inGame) {
            var skillId = event.skillId; //方向
            // cc.log("触发了技能 ",skillId);
            if (skillId == 0) {
                yyp.eventCenter.emit('add-coin', { count: this._config.Coin / 10, position: Utils_1.Utils.getWorldPosition(this.node) });
            }
            else if (skillId == 1) {
                this._hp += this._maxHp / 2;
                if (this._hp > this._maxHp) {
                    this._hp == this._maxHp;
                }
                this.refreshHp();
            }
            else if (skillId == 2) {
                this._skill2Time += 15;
            }
            else if (skillId == 3) {
                this._skill3Time += 15;
            }
        }
    };
    Player.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //刷新玩家位置
    Player.prototype._refreshPosition = function (dt) {
        this._refreshMoveSpeed(dt);
        if (this._currentSpeed <= 0) {
            return;
        }
        if (this._moveInputRatio > 0) {
            this._turnDirTo(this._moveInputDir, dt);
        }
        var currPosition = this.node.position;
        //碰撞测试
        var willPosition = this._getWillPosition(currPosition, this._dir, this._currentSpeed);
        var colliderItems = this._map.testColliders(willPosition, this._radius);
        if (colliderItems.length > 0) {
            var testDir = this._getTestDir(currPosition, this._radius, this._dir, colliderItems);
            if (testDir) {
                willPosition = this._getWillPosition(currPosition, testDir, this._currentSpeed);
            }
            else {
                this._currentSpeed = 0;
                return;
            }
        }
        willPosition = this._map.clampMapInnerPosition(willPosition, this._radius);
        this.node.setPosition(willPosition);
    };
    Player.prototype._refreshMoveSpeed = function (dt) {
        var maxSpeed = this._getConfigValue("Speed", 0);
        var targetSpeed = this._moveInputRatio > 0 ? maxSpeed * this._moveInputRatio : 0;
        if (this._currentSpeed < targetSpeed) {
            this._currentSpeed += this._getFrameValue("Acceleration", maxSpeed, dt);
            if (this._currentSpeed > targetSpeed) {
                this._currentSpeed = targetSpeed;
            }
        }
        else if (this._currentSpeed > targetSpeed) {
            this._currentSpeed -= this._getFrameValue("Deceleration", maxSpeed, dt);
            if (this._currentSpeed < targetSpeed) {
                this._currentSpeed = targetSpeed;
            }
        }
    };
    Player.prototype.update = function (dt) {
        if (this._inGame) {
            if (this._map._pause)
                return;
            this._bulletCodeTime += dt;
            this._updateFreeBulletRecover(dt);
            //玩家和技能icon,碰撞检测
            this._map.playerSkillIconCollisionTest();
            this._refreshPosition(dt);
            this._refreshBarrelDir();
            this._refreshAngle(dt, false);
            // 技能2(超级子弹)
            this._skill2Time -= dt;
            this._skill2Time = this._skill2Time < 0 ? 0 : this._skill2Time;
            this._fire._spSkill2.active = this._skill2Time > 0;
            // 技能3(无敌防御)
            this._skill3Time -= dt;
            this._skill3Time = this._skill3Time < 0 ? 0 : this._skill3Time;
            this._fire._spSkill3.active = this._skill3Time > 0;
            //显示铠甲
            this._fire._spArmour.active = this._skill3Time > 0;
            this._def = this._skill3Time > 0 ? 10000000 : 0;
            this.node.zIndex = this._map.judgezIndex(this.node.y);
        }
        else if (this._viewMode) {
            this._dir = Utils_1.Utils.vectorsRotateDegress(this._dir, -0.5);
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir);
            this._barrelDir = this._dir;
            this.shooting(dt);
        }
    };
    // 炮管始终跟随坦克整体方向
    Player.prototype._refreshBarrelDir = function () {
        this._barrelDir = this._dir;
    };
    // 右侧按钮抬起时直接发射一发, 不走按住持续发射逻辑
    Player.prototype.fireOnce = function () {
        var type = (this._viewMode || this._skill2Time > 0) ? this._config.BType2 : this._config.BType1;
        var attackRadius = this._viewMode ? this._config.AttackRadius * 0.8 : this._config.AttackRadius;
        BulletE_1.Bullet.createBulletEx(type, this.node.position, this._barrelDir, this._fire._lyBarrel.height + 20, attackRadius, this._atk, this._camp, this.node.parent, this._map);
        if (this._viewMode == false && this._map.enemyCount() > 0) {
            MusicManager_1.MusicManager.playEffect("shoot");
        }
    };
    Player.prototype._tryFireOnce = function () {
        if (this._bulletCodeTime < PLAYER_SHOOT_INTERVAL) {
            return;
        }
        if (this._freeBulletCount <= 0 && this._canNotAffordPaidBullet()) {
            this._showLowHpShootTip();
            return;
        }
        this._bulletCodeTime = 0;
        this._stopFireTime = 0;
        this._freeBulletRecoverTime = 0;
        this.fireOnce();
        if (this._freeBulletCount > 0) {
            this._freeBulletCount--;
            this._refreshFreeBulletBar();
            return;
        }
        this._consumeHpForPaidBullet();
    };
    Player.prototype._canNotAffordPaidBullet = function () {
        return this._hp <= PLAYER_PAID_SHOT_HP_COST;
    };
    Player.prototype._showLowHpShootTip = function () {
        var channel = SDKManager_1.default.getChannel();
        if (channel && channel.showToast) {
            channel.showToast("血量过低,无法发射子弹");
        }
        else {
            cc.log("血量过低,无法发射子弹");
        }
    };
    Player.prototype._consumeHpForPaidBullet = function () {
        this._hp -= PLAYER_PAID_SHOT_HP_COST;
        if (this._hp < 0) {
            this._hp = 0;
        }
        this.refreshHp();
        if (this._hp <= 0) {
            this.doDeath();
        }
    };
    Player.prototype._updateFreeBulletRecover = function (dt) {
        if (this._freeBulletCount >= PLAYER_FREE_BULLET_MAX) {
            this._stopFireTime = 0;
            this._freeBulletRecoverTime = 0;
            this._refreshFreeBulletBar();
            return;
        }
        this._stopFireTime += dt;
        if (this._stopFireTime < PLAYER_FREE_BULLET_RECOVER_DELAY) {
            this._freeBulletRecoverTime = 0;
            this._refreshFreeBulletBar();
            return;
        }
        this._freeBulletRecoverTime += dt;
        while (this._freeBulletRecoverTime >= PLAYER_FREE_BULLET_RECOVER_INTERVAL
            && this._freeBulletCount < PLAYER_FREE_BULLET_MAX) {
            this._freeBulletRecoverTime -= PLAYER_FREE_BULLET_RECOVER_INTERVAL;
            this._freeBulletCount++;
        }
        if (this._freeBulletCount >= PLAYER_FREE_BULLET_MAX) {
            this._freeBulletRecoverTime = 0;
        }
        this._refreshFreeBulletBar();
    };
    Player.prototype._refreshFreeBulletBar = function () {
        var _this = this;
        var bulletBars = [
            this._fire._zidanbar1,
            this._fire._zidanbar2,
            this._fire._zidanbar3,
        ];
        var recoverProgress = 0;
        if (this._freeBulletCount < PLAYER_FREE_BULLET_MAX
            && this._stopFireTime >= PLAYER_FREE_BULLET_RECOVER_DELAY) {
            recoverProgress = this._freeBulletRecoverTime / PLAYER_FREE_BULLET_RECOVER_INTERVAL;
            if (recoverProgress > 1) {
                recoverProgress = 1;
            }
        }
        bulletBars.forEach(function (barNode, index) {
            if (!barNode || !barNode.$ProgressBar) {
                return;
            }
            if (index < _this._freeBulletCount) {
                barNode.$ProgressBar.progress = 1;
            }
            else if (index == _this._freeBulletCount && recoverProgress > 0) {
                barNode.$ProgressBar.progress = recoverProgress;
            }
            else {
                barNode.$ProgressBar.progress = 0;
            }
        });
    };
    //射击
    Player.prototype.shooting = function (dt) {
        var judgeCD = this._skill2Time > 0 ? this._config.BulletCodeTime / 4 : this._config.BulletCodeTime;
        this._bulletCodeTime += dt;
        if (this._bulletCodeTime >= judgeCD) {
            this._bulletCodeTime = 0;
            this.fireOnce();
        }
    };
    //执行死亡
    Player.prototype.doDeath = function () {
        _super.prototype.doDeath.call(this);
        yyp.eventCenter.emit("player-death", {});
        this.node.destroy();
        // 爆炸效果
        // 显示结束界面
    };
    Player.prototype.setInGame = function () {
        this._inGame = true;
        this._fire._lifebar.active = true;
    };
    //获取碰撞框
    Player.prototype.getPlayerBoundingBox = function () {
        return Utils_1.Utils.getWorldBoundingBox(this._currentBg);
    };
    Player.prototype.setViewMode = function () {
        this._viewMode = true;
    };
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(TankE_1.Tank));
exports.Player = Player;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUNuRCxtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDakMsSUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUM7QUFDN0MsSUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUM7QUFDaEQsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFHL0M7SUFBNEIsMEJBQUk7SUFBaEM7UUFBQSxxRUF3WEM7UUF0WEcsTUFBTTtRQUNOLFlBQU0sR0FBWSxDQUFDLENBQUMsQ0FBUSxNQUFNO1FBRWxDLHFCQUFlLEdBQUcsQ0FBQyxDQUFDLENBQVEsUUFBUTtRQUVwQyxtQkFBYSxHQUFLLEtBQUssQ0FBQyxDQUFJLFFBQVE7UUFFcEMsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBUSxlQUFlO1FBQzNDLGlCQUFXLEdBQU8sQ0FBQyxDQUFDLENBQVEsZUFBZTtRQUUzQyxhQUFPLEdBQVcsS0FBSyxDQUFDLENBQUksU0FBUztRQUNyQyxlQUFTLEdBQVMsS0FBSyxDQUFDLENBQUksTUFBTTtRQUNsQyxzQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQyxDQUFFLFVBQVU7UUFDdEQsbUJBQWEsR0FBRyxDQUFDLENBQUMsQ0FBVSxNQUFNO1FBQ2xDLDRCQUFzQixHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7UUFDdEMsbUJBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMs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Q0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLE9BQU87UUFDUCxTQUFTO0lBQ2IsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxPQUFPO0lBQ1AscUNBQW9CLEdBQXBCO1FBQ0ksT0FBTyxhQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQXZYUSxNQUFNO1FBRGxCLE9BQU87T0FDSyxNQUFNLENBd1hsQjtJQUFELGFBQUM7Q0F4WEQsQUF3WEMsQ0F4WDJCLFlBQUksR0F3WC9CO0FBeFhZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYW5rfSBmcm9tIFwiLi9UYW5rRVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xuaW1wb3J0IHtCdWxsZXR9IGZyb20gXCIuL0J1bGxldEVcIjtcbmltcG9ydCB7IE11c2ljTWFuYWdlciB9IGZyb20gXCIuL2Jhc2UvTXVzaWNNYW5hZ2VyXCI7XG5pbXBvcnQgU0RLTWFuYWdlciBmcm9tIFwiLi9zZGsvc2RrL1NES01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBQTEFZRVJfU0hPT1RfSU5URVJWQUwgPSAwLjM1O1xuY29uc3QgUExBWUVSX0ZSRUVfQlVMTEVUX01BWCA9IDM7XG5jb25zdCBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9ERUxBWSA9IDAuODtcbmNvbnN0IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMID0gMC42O1xuY29uc3QgUExBWUVSX1BBSURfU0hPVF9IUF9DT1NUID0gNSAqICgxIC0gMC4xKTtcblxuQGNjY2xhc3NcbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBUYW5rIHtcblxuICAgIC8v5YaF6YOo5Y+Y6YePXG4gICAgX2xldmVsICAgICAgICAgID0gMTsgICAgICAgIC8v546p5a62562J57qnXG5cbiAgICBfYnVsbGV0Q29kZVRpbWUgPSAwOyAgICAgICAgLy/lsITlh7vlhrfljbTml7bpl7RcblxuICAgIF9pc0hpZ2hCdWxsZXQgICA9IGZhbHNlOyAgICAvL+S4ieWPkemrmOmikeWtkOW8uVxuXG4gICAgX3NraWxsMlRpbWUgICAgID0gMDsgICAgICAgIC8v5oqA6IO9MijotoXnuqflrZDlvLkp5Ymp5L2Z5pe26Ze0XG4gICAgX3NraWxsM1RpbWUgICAgID0gMDsgICAgICAgIC8v5oqA6IO9Myjml6DmlYzpmLLlvqEp5Ymp5L2Z5pe26Ze0XG5cbiAgICBfaW5HYW1lICAgICAgICAgPSBmYWxzZTsgICAgLy/lnKjmuLjmiI/kuK3kuK3kvb/nlKhcbiAgICBfdmlld01vZGUgICAgICAgPSBmYWxzZTsgICAgLy/lsZXnpLrmqKHlvI9cbiAgICBfZnJlZUJ1bGxldENvdW50ID0gUExBWUVSX0ZSRUVfQlVMTEVUX01BWDsgIC8v5b2T5YmN5YWN6LS55a2Q5by55pWw6YePXG4gICAgX3N0b3BGaXJlVGltZSA9IDA7ICAgICAgICAgIC8v5YGc54Gr6K6h5pe2XG4gICAgX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7IC8v5YWN6LS55a2Q5by55oGi5aSN6K6h5pe2XG4gICAgX21vdmVJbnB1dERpciA9IGNjLnYyKDEsIDApOyAvL+enu+WKqOaRh+adhuebruagh+aWueWQkVxuICAgIF9tb3ZlSW5wdXRSYXRpbyA9IDA7ICAgICAgICAvL+enu+WKqOaRh+adhuebruagh+mAn+eOh1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIFxuICAgICAgICAvL+WIneWni+WMluWPmOmHj1xuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcblxuICAgICAgICAvL+WIneWni+WMllVJXG4gICAgICAgIHRoaXMuX2luaXRVSSgpO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xuICAgIH1cblxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcbiAgICAgICAgdGhpcy5fY2FtcCA9IFwicGxheWVyXCI7ICAvL+mYteiQpVxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLl9yYWRpdXMgKiAyOyAgICAvL+eOqeWutueahOeisOaSnuajgOa1i+iMg+WbtCoyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gUExBWUVSX1NIT09UX0lOVEVSVkFMO1xuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0Q291bnQgPSBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYO1xuICAgICAgICB0aGlzLl9zdG9wRmlyZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLl9tb3ZlSW5wdXREaXIgPSB0aGlzLl9kaXI7XG4gICAgICAgIHRoaXMuX21vdmVJbnB1dFJhdGlvID0gMDtcbiAgICB9XG5cbiAgICAvL+iuvue9ruWdpuWFi+exu+Wei1xuICAgIHNldFBsYXllclR5cGUodGFua1R5cGUscGxheWVyTGV2ZWwpIHtcbiAgICAgICAgc3VwZXIuc2V0VGFua1R5cGUodGFua1R5cGUpO1xuICAgICAgICBcbiAgICAgICAgLy/orqHnrpfnjqnlrrbooYDph48g5pS75Ye7XG4gICAgICAgIHRoaXMuX2xldmVsID0gcGxheWVyTGV2ZWw7XG4gICAgICAgIHRoaXMuX2hwID0gdGhpcy5fbWF4SHAgPSB0aGlzLl9jb25maWcuSFAgKiAodGhpcy5fbGV2ZWwrMSk7XG4gICAgICAgIHRoaXMuX2F0ayA9IHRoaXMuX2NvbmZpZy5BVEsgKiAodGhpcy5fbGV2ZWwrMSk7XG4gICAgfVxuXG4gICAgLy/liJ3lp4vljJZVSVxuICAgIF9pbml0VUkoKXtcbiAgICAgICAgdGhpcy5fZmlyZS5fbGlmZWJhci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZmlyZS5fc3BBcm1vdXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcbiAgICB9XG5cbiAgICAvL+WIneWni+WMluaOpeaUtuS6i+S7tlxuICAgIF9pbml0RXZlbnQoKSB7XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgIC8v5pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrLXNob290Jyx0aGlzLl9kb1Nob290Sm95U3RpY2ssdGhpcyk7IC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbigndHJpZ2dlci1za2lsbCcsdGhpcy5fZG9Ta2lsbCx0aGlzKTsgICAgIC8v6Kem5Y+R5oqA6IO9XG4gICAgfVxuICAgICAgIFxuICAgIC8v6ZSA5q+B5LqL5Lu2XG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgLy/mkYfmnYbkuovku7ZcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignam95LXN0aWNrLXNob290Jyx0aGlzLl9kb1Nob290Sm95U3RpY2ssdGhpcyk7IC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vZmYoJ3RyaWdnZXItc2tpbGwnLHRoaXMuX2RvU2tpbGwsdGhpcyk7ICAgIC8v6Kem5Y+R5oqA6IO9XG4gICAgfVxuICAgIFxuICAgIC8v5pGH5p2G5LqL5Lu2XG4gICAgX2RvSm95U3RpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRpciAmJiBldmVudC5kaXIubWFnU3FyKCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUlucHV0RGlyID0gZXZlbnQuZGlyOyAgICAgIC8v5pa55ZCRXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tb3ZlSW5wdXRSYXRpbyA9IGV2ZW50LnJhdGlvOyAgLy/pgJ/njodcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5bCE5Ye75pGH5p2G5LqL5Lu2XG4gICAgX2RvU2hvb3RKb3lTdGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGlmIChldmVudC5maXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl90cnlGaXJlT25jZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8v6Kem5Y+R5oqA6IO9XG4gICAgX2RvU2tpbGwoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luR2FtZSkge1xuICAgICAgICAgICAgbGV0IHNraWxsSWQgPSBldmVudC5za2lsbElkOyAgICAvL+aWueWQkVxuICAgICAgICAgICAgLy8gY2MubG9nKFwi6Kem5Y+R5LqG5oqA6IO9IFwiLHNraWxsSWQpO1xuICAgICAgICAgICAgaWYgKHNraWxsSWQgPT0gMCkge1xuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KCdhZGQtY29pbicse2NvdW50OnRoaXMuX2NvbmZpZy5Db2luLzEwLHBvc2l0aW9uOlV0aWxzLmdldFdvcmxkUG9zaXRpb24odGhpcy5ub2RlKX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpbGxJZCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faHAgKz0gdGhpcy5fbWF4SHAvMjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faHAgPiB0aGlzLl9tYXhIcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ocCA9PSB0aGlzLl9tYXhIcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoSHAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsMlRpbWUgKz0gMTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lICs9IDE1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICAvL+mUgOavgeS6i+S7tlxuICAgICAgICB0aGlzLl9kZXN0cm95RXZlbnQoKTtcbiAgICB9XG5cbiAgICAvL+WIt+aWsOeOqeWutuS9jee9rlxuICAgIF9yZWZyZXNoUG9zaXRpb24oZHQpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaE1vdmVTcGVlZChkdCk7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdHVybkRpclRvKHRoaXMuX21vdmVJbnB1dERpciwgZHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcblxuICAgICAgICAvL+eisOaSnua1i+ivlVxuICAgICAgICBsZXQgd2lsbFBvc2l0aW9uID0gdGhpcy5fZ2V0V2lsbFBvc2l0aW9uKGN1cnJQb3NpdGlvbiwgdGhpcy5fZGlyLCB0aGlzLl9jdXJyZW50U3BlZWQpO1xuICAgICAgICBsZXQgY29sbGlkZXJJdGVtcyA9IHRoaXMuX21hcC50ZXN0Q29sbGlkZXJzKHdpbGxQb3NpdGlvbiwgdGhpcy5fcmFkaXVzKTtcbiAgICAgICAgaWYgKGNvbGxpZGVySXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBsZXQgdGVzdERpciA9IHRoaXMuX2dldFRlc3REaXIoY3VyclBvc2l0aW9uLCB0aGlzLl9yYWRpdXMsIHRoaXMuX2RpciwgY29sbGlkZXJJdGVtcyk7XG4gICAgICAgICAgICBpZiAodGVzdERpcikge1xuICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRlc3REaXIsIHRoaXMuX2N1cnJlbnRTcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2lsbFBvc2l0aW9uID0gdGhpcy5fbWFwLmNsYW1wTWFwSW5uZXJQb3NpdGlvbih3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih3aWxsUG9zaXRpb24pO1xuICAgIH1cblxuICAgIF9yZWZyZXNoTW92ZVNwZWVkKGR0KSB7XG4gICAgICAgIGxldCBtYXhTcGVlZCA9IHRoaXMuX2dldENvbmZpZ1ZhbHVlKFwiU3BlZWRcIiwgMCk7XG4gICAgICAgIGxldCB0YXJnZXRTcGVlZCA9IHRoaXMuX21vdmVJbnB1dFJhdGlvID4gMCA/IG1heFNwZWVkICogdGhpcy5fbW92ZUlucHV0UmF0aW8gOiAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPCB0YXJnZXRTcGVlZCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkICs9IHRoaXMuX2dldEZyYW1lVmFsdWUoXCJBY2NlbGVyYXRpb25cIiwgbWF4U3BlZWQsIGR0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U3BlZWQgPiB0YXJnZXRTcGVlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTcGVlZCA9IHRhcmdldFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA+IHRhcmdldFNwZWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3BlZWQgLT0gdGhpcy5fZ2V0RnJhbWVWYWx1ZShcIkRlY2VsZXJhdGlvblwiLCBtYXhTcGVlZCwgZHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTcGVlZCA8IHRhcmdldFNwZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNwZWVkID0gdGFyZ2V0U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpe1xuXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAuX3BhdXNlKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSArPSBkdDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZyZWVCdWxsZXRSZWNvdmVyKGR0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy/njqnlrrblkozmioDog71pY29uLOeisOaSnuajgOa1i1xuICAgICAgICAgICAgdGhpcy5fbWFwLnBsYXllclNraWxsSWNvbkNvbGxpc2lvblRlc3QoKTtcblxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFBvc2l0aW9uKGR0KTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hCYXJyZWxEaXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hBbmdsZShkdCwgZmFsc2UpO1xuICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9MijotoXnuqflrZDlvLkpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDJUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSA9IHRoaXMuX3NraWxsMlRpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsMlRpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMi5hY3RpdmUgPSB0aGlzLl9za2lsbDJUaW1lID4gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g5oqA6IO9Myjml6DmlYzpmLLlvqEpXG4gICAgICAgICAgICB0aGlzLl9za2lsbDNUaW1lIC09IGR0O1xuICAgICAgICAgICAgdGhpcy5fc2tpbGwzVGltZSA9IHRoaXMuX3NraWxsM1RpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsM1RpbWU7XG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICBcbiAgICAgICAgICAgIC8v5pi+56S66ZOg55SyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcbiAgICAgICAgICAgIHRoaXMuX2RlZiA9IHRoaXMuX3NraWxsM1RpbWUgPiAwID8gMTAwMDAwMDAgOiAwO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuX3ZpZXdNb2RlKXtcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKHRoaXMuX2RpciwtMC41KTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKTtcbiAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IHRoaXMuX2RpcjtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RpbmcoZHQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICAvLyDngq7nrqHlp4vnu4jot5/pmo/lnablhYvmlbTkvZPmlrnlkJFcbiAgICBfcmVmcmVzaEJhcnJlbERpcigpIHtcbiAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gdGhpcy5fZGlyO1xuICAgIH1cblxuICAgIC8vIOWPs+S+p+aMiemSruaKrOi1t+aXtuebtOaOpeWPkeWwhOS4gOWPkSwg5LiN6LWw5oyJ5L2P5oyB57ut5Y+R5bCE6YC76L6RXG4gICAgZmlyZU9uY2UoKSB7XG4gICAgICAgIGxldCB0eXBlID0gKHRoaXMuX3ZpZXdNb2RlIHx8IHRoaXMuX3NraWxsMlRpbWUgPiAwKSA/IHRoaXMuX2NvbmZpZy5CVHlwZTIgOiB0aGlzLl9jb25maWcuQlR5cGUxO1xuICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fdmlld01vZGUgPyB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICogMC44IDp0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzO1xuICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgodHlwZSx0aGlzLm5vZGUucG9zaXRpb24sdGhpcy5fYmFycmVsRGlyLHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCsyMCxhdHRhY2tSYWRpdXMsdGhpcy5fYXRrLHRoaXMuX2NhbXAsdGhpcy5ub2RlLnBhcmVudCx0aGlzLl9tYXApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlICYmIHRoaXMuX21hcC5lbmVteUNvdW50KCkgPiAwKSB7XG4gICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyeUZpcmVPbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5fYnVsbGV0Q29kZVRpbWUgPCBQTEFZRVJfU0hPT1RfSU5URVJWQUwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPD0gMCAmJiB0aGlzLl9jYW5Ob3RBZmZvcmRQYWlkQnVsbGV0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dMb3dIcFNob290VGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9idWxsZXRDb2RlVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XG4gICAgICAgIHRoaXMuZmlyZU9uY2UoKTtcblxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50LS07XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29uc3VtZUhwRm9yUGFpZEJ1bGxldCgpO1xuICAgIH1cblxuICAgIF9jYW5Ob3RBZmZvcmRQYWlkQnVsbGV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHAgPD0gUExBWUVSX1BBSURfU0hPVF9IUF9DT1NUO1xuICAgIH1cblxuICAgIF9zaG93TG93SHBTaG9vdFRpcCgpIHtcbiAgICAgICAgbGV0IGNoYW5uZWwgPSBTREtNYW5hZ2VyLmdldENoYW5uZWwoKTtcbiAgICAgICAgaWYgKGNoYW5uZWwgJiYgY2hhbm5lbC5zaG93VG9hc3QpIHtcbiAgICAgICAgICAgIGNoYW5uZWwuc2hvd1RvYXN0KFwi6KGA6YeP6L+H5L2OLOaXoOazleWPkeWwhOWtkOW8uVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY2MubG9nKFwi6KGA6YeP6L+H5L2OLOaXoOazleWPkeWwhOWtkOW8uVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jb25zdW1lSHBGb3JQYWlkQnVsbGV0KCkge1xuICAgICAgICB0aGlzLl9ocCAtPSBQTEFZRVJfUEFJRF9TSE9UX0hQX0NPU1Q7XG4gICAgICAgIGlmICh0aGlzLl9ocCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEhwKCk7XG4gICAgICAgIGlmICh0aGlzLl9ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF91cGRhdGVGcmVlQnVsbGV0UmVjb3ZlcihkdCkge1xuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID49IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3N0b3BGaXJlVGltZSArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMuX3N0b3BGaXJlVGltZSA8IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0RFTEFZKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlQnVsbGV0UmVjb3ZlclRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEZyZWVCdWxsZXRCYXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSArPSBkdDtcbiAgICAgICAgd2hpbGUgKHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA+PSBQTEFZRVJfRlJFRV9CVUxMRVRfUkVDT1ZFUl9JTlRFUlZBTFxuICAgICAgICAgICAgJiYgdGhpcy5fZnJlZUJ1bGxldENvdW50IDwgUExBWUVSX0ZSRUVfQlVMTEVUX01BWCkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldFJlY292ZXJUaW1lIC09IFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMO1xuICAgICAgICAgICAgdGhpcy5fZnJlZUJ1bGxldENvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZnJlZUJ1bGxldENvdW50ID49IFBMQVlFUl9GUkVFX0JVTExFVF9NQVgpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZWZyZXNoRnJlZUJ1bGxldEJhcigpO1xuICAgIH1cblxuICAgIF9yZWZyZXNoRnJlZUJ1bGxldEJhcigpIHtcbiAgICAgICAgbGV0IGJ1bGxldEJhcnMgPSBbXG4gICAgICAgICAgICB0aGlzLl9maXJlLl96aWRhbmJhcjEsXG4gICAgICAgICAgICB0aGlzLl9maXJlLl96aWRhbmJhcjIsXG4gICAgICAgICAgICB0aGlzLl9maXJlLl96aWRhbmJhcjMsXG4gICAgICAgIF07XG4gICAgICAgIGxldCByZWNvdmVyUHJvZ3Jlc3MgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9mcmVlQnVsbGV0Q291bnQgPCBQTEFZRVJfRlJFRV9CVUxMRVRfTUFYXG4gICAgICAgICAgICAmJiB0aGlzLl9zdG9wRmlyZVRpbWUgPj0gUExBWUVSX0ZSRUVfQlVMTEVUX1JFQ09WRVJfREVMQVkpIHtcbiAgICAgICAgICAgIHJlY292ZXJQcm9ncmVzcyA9IHRoaXMuX2ZyZWVCdWxsZXRSZWNvdmVyVGltZSAvIFBMQVlFUl9GUkVFX0JVTExFVF9SRUNPVkVSX0lOVEVSVkFMO1xuICAgICAgICAgICAgaWYgKHJlY292ZXJQcm9ncmVzcyA+IDEpIHtcbiAgICAgICAgICAgICAgICByZWNvdmVyUHJvZ3Jlc3MgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnVsbGV0QmFycy5mb3JFYWNoKChiYXJOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFiYXJOb2RlIHx8ICFiYXJOb2RlLiRQcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5fZnJlZUJ1bGxldENvdW50KSB7XG4gICAgICAgICAgICAgICAgYmFyTm9kZS4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT0gdGhpcy5fZnJlZUJ1bGxldENvdW50ICYmIHJlY292ZXJQcm9ncmVzcyA+IDApIHtcbiAgICAgICAgICAgICAgICBiYXJOb2RlLiRQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHJlY292ZXJQcm9ncmVzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgYmFyTm9kZS4kUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL+WwhOWHu1xuICAgIHNob290aW5nKGR0KXtcbiAgICAgICAgbGV0IGp1ZGdlQ0QgPSB0aGlzLl9za2lsbDJUaW1lID4gMCA/IHRoaXMuX2NvbmZpZy5CdWxsZXRDb2RlVGltZS80IDogdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lO1xuXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0O1xuICAgICAgICBpZiAodGhpcy5fYnVsbGV0Q29kZVRpbWUgPj0ganVkZ2VDRCkge1xuICAgICAgICAgICAgdGhpcy5fYnVsbGV0Q29kZVRpbWUgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmZpcmVPbmNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy/miafooYzmrbvkuqFcbiAgICBkb0RlYXRoKCl7XG4gICAgICAgIHN1cGVyLmRvRGVhdGgoKTtcbiAgICAgICAgXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KFwicGxheWVyLWRlYXRoXCIse30pO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpOyBcbiAgICAgICAgLy8g54iG54K45pWI5p6cXG4gICAgICAgIC8vIOaYvuekuue7k+adn+eVjOmdolxuICAgIH1cblxuICAgIHNldEluR2FtZSgpe1xuICAgICAgICB0aGlzLl9pbkdhbWUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9maXJlLl9saWZlYmFyLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8v6I635Y+W56Kw5pKe5qGGXG4gICAgZ2V0UGxheWVyQm91bmRpbmdCb3goKXtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmdldFdvcmxkQm91bmRpbmdCb3godGhpcy5fY3VycmVudEJnKTtcbiAgICB9XG5cbiAgICBzZXRWaWV3TW9kZSgpe1xuICAgICAgICB0aGlzLl92aWV3TW9kZSA9IHRydWU7XG4gICAgfVxufVxuIl19