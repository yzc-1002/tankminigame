
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
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
    };
    //初始化接收事件
    Player.prototype._initEvent = function () {
        yyp.eventCenter.on('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.on('trigger-skill', this._doSkill, this); //触发技能
    };
    //销毁事件
    Player.prototype._destroyEvent = function () {
        yyp.eventCenter.off('joy-stick', this._doJoyStick, this); //摇杆事件
        yyp.eventCenter.off('trigger-skill', this._doSkill, this); //触发技能
    };
    //摇杆事件
    Player.prototype._doJoyStick = function (event) {
        if (this._inGame) {
            this._dir = event.dir; //方向
            this._ratio = event.ratio; //速率
            this._refreshPosition();
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
    Player.prototype._refreshPosition = function () {
        var currPosition = this.node.position;
        //碰撞测试
        var willPosition = this._getWillPosition(currPosition, this._dir, this._ratio);
        var colliderItems = this._map.testColliders(willPosition, this._radius);
        if (colliderItems.length > 0) {
            var testDir = this._getTestDir(currPosition, this._radius, this._dir, colliderItems);
            if (testDir) {
                willPosition = this._getWillPosition(currPosition, testDir, this._ratio);
            }
            else {
                return;
            }
        }
        this.node.setPosition(willPosition);
    };
    Player.prototype.update = function (dt) {
        if (this._inGame) {
            if (this._map._pause)
                return;
            //玩家和技能icon,碰撞检测
            this._map.playerSkillIconCollisionTest();
            //计算炮管方向
            var enemy = this._map.getNearEnemy();
            if (enemy) {
                var enemyPos = cc.v2(enemy.position);
                var playerPos = cc.v2(this.node.position);
                this._barrelDir = enemyPos.sub(playerPos).normalize();
            }
            else {
                this._barrelDir = this._dir;
            }
            this._refreshAngle();
            // 技能2(超级子弹)
            this._skill2Time -= dt;
            this._skill2Time = this._skill2Time < 0 ? 0 : this._skill2Time;
            this._fire._spSkill2.active = this._skill2Time > 0;
            // 技能3(无敌防御)
            this._skill3Time -= dt;
            this._skill3Time = this._skill3Time < 0 ? 0 : this._skill3Time;
            this._fire._spSkill3.active = this._skill3Time > 0;
            //射击
            this.shooting(dt);
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
    //射击
    Player.prototype.shooting = function (dt) {
        var judgeCD = this._skill2Time > 0 ? this._config.BulletCodeTime / 4 : this._config.BulletCodeTime;
        this._bulletCodeTime += dt;
        if (this._bulletCodeTime >= judgeCD) {
            this._bulletCodeTime = 0;
            //创建子弹
            var type = (this._viewMode || this._skill2Time > 0) ? this._config.BType2 : this._config.BType1;
            var attackRadius = this._viewMode ? this._config.AttackRadius * 0.8 : this._config.AttackRadius;
            BulletE_1.Bullet.createBulletEx(type, this.node.position, this._barrelDir, this._fire._lyBarrel.height + 20, attackRadius, this._atk, this._camp, this.node.parent, this._map);
            if (this._viewMode == false && this._map.enemyCount() > 0) {
                MusicManager_1.MusicManager.playEffect("shoot");
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLG9EQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QiwwQkFBSTtJQUFoQztRQUFBLHFFQXNOQztRQXBORyxNQUFNO1FBQ04sWUFBTSxHQUFZLENBQUMsQ0FBQyxDQUFRLE1BQU07UUFFbEMscUJBQWUsR0FBRyxDQUFDLENBQUMsQ0FBUSxRQUFRO1FBRXBDLG1CQUFhLEdBQUssS0FBSyxDQUFDLENBQUksUUFBUTtRQUVwQyxpQkFBVyxHQUFPLENBQUMsQ0FBQyxDQUFRLGVBQWU7UUFDM0MsaUJBQVcsR0FBTyxDQUFDLENBQUMsQ0FBUSxlQUFlO1FBRTNDLGFBQU8sR0FBVyxLQUFLLENBQUMsQ0FBSSxTQUFTO1FBQ3JDLGVBQVMsR0FBUyxLQUFLLENBQUMsQ0FBSSxNQUFNOztJQXlNdEMsQ0FBQztJQXZNRyx1QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFFZixPQUFPO1FBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLE9BQU87UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixTQUFTO1FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPO0lBQ1AsOEJBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUUsSUFBSTtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUksYUFBYTtJQUNyRCxDQUFDO0lBRUQsUUFBUTtJQUNSLDhCQUFhLEdBQWIsVUFB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RSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixPQUFPO1FBQ1AsU0FBUztJQUNiLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQsT0FBTztJQUNQLHFDQUFvQixHQUFwQjtRQUNJLE9BQU8sYUFBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsNEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFyTlEsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQXNObEI7SUFBRCxhQUFDO0NBdE5ELEFBc05DLENBdE4yQixZQUFJLEdBc04vQjtBQXROWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFua30gZnJvbSBcIi4vVGFua0VcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0J1bGxldH0gZnJvbSBcIi4vQnVsbGV0RVwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL011c2ljTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgVGFuayB7XHJcblxyXG4gICAgLy/lhoXpg6jlj5jph49cclxuICAgIF9sZXZlbCAgICAgICAgICA9IDE7ICAgICAgICAvL+eOqeWutuetiee6p1xyXG5cclxuICAgIF9idWxsZXRDb2RlVGltZSA9IDA7ICAgICAgICAvL+WwhOWHu+WGt+WNtOaXtumXtFxyXG5cclxuICAgIF9pc0hpZ2hCdWxsZXQgICA9IGZhbHNlOyAgICAvL+S4ieWPkemrmOmikeWtkOW8uVxyXG5cclxuICAgIF9za2lsbDJUaW1lICAgICA9IDA7ICAgICAgICAvL+aKgOiDvTIo6LaF57qn5a2Q5by5KeWJqeS9meaXtumXtFxyXG4gICAgX3NraWxsM1RpbWUgICAgID0gMDsgICAgICAgIC8v5oqA6IO9Myjml6DmlYzpmLLlvqEp5Ymp5L2Z5pe26Ze0XHJcblxyXG4gICAgX2luR2FtZSAgICAgICAgID0gZmFsc2U7ICAgIC8v5Zyo5ri45oiP5Lit5Lit5L2/55SoXHJcbiAgICBfdmlld01vZGUgICAgICAgPSBmYWxzZTsgICAgLy/lsZXnpLrmqKHlvI9cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5faW5pdFZhcmlhYmxlKCk7XHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyWVUlcclxuICAgICAgICB0aGlzLl9pbml0VUkoKTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJbmjqXmlLbkuovku7ZcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWPmOmHj1xyXG4gICAgX2luaXRWYXJpYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9jYW1wID0gXCJwbGF5ZXJcIjsgIC8v6Zi16JClXHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gdGhpcy5fcmFkaXVzICogMjsgICAgLy/njqnlrrbnmoTnorDmkp7mo4DmtYvojIPlm7QqMlxyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5Z2m5YWL57G75Z6LXHJcbiAgICBzZXRQbGF5ZXJUeXBlKHRhbmtUeXBlLHBsYXllckxldmVsKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VGFua1R5cGUodGFua1R5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6K6h566X546p5a626KGA6YePIOaUu+WHu1xyXG4gICAgICAgIHRoaXMuX2xldmVsID0gcGxheWVyTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9tYXhIcCA9IHRoaXMuX2NvbmZpZy5IUCAqICh0aGlzLl9sZXZlbCsxKTtcclxuICAgICAgICB0aGlzLl9hdGsgPSB0aGlzLl9jb25maWcuQVRLICogKHRoaXMuX2xldmVsKzEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyWVUlcclxuICAgIF9pbml0VUkoKXtcclxuICAgICAgICB0aGlzLl9maXJlLl9saWZlYmFyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwQXJtb3VyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5o6l5pS25LqL5Lu2XHJcbiAgICBfaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHl5cC5ldmVudENlbnRlci5vbignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgIC8v5pGH5p2G5LqL5Lu2XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9uKCd0cmlnZ2VyLXNraWxsJyx0aGlzLl9kb1NraWxsLHRoaXMpOyAgICAgLy/op6blj5HmioDog71cclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgLy/plIDmr4Hkuovku7ZcclxuICAgIF9kZXN0cm95RXZlbnQoKSB7XHJcbiAgICAgICAgeXlwLmV2ZW50Q2VudGVyLm9mZignam95LXN0aWNrJyx0aGlzLl9kb0pveVN0aWNrLHRoaXMpOyAgICAgLy/mkYfmnYbkuovku7ZcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIub2ZmKCd0cmlnZ2VyLXNraWxsJyx0aGlzLl9kb1NraWxsLHRoaXMpOyAgICAvL+inpuWPkeaKgOiDvVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aRh+adhuS6i+S7tlxyXG4gICAgX2RvSm95U3RpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IGV2ZW50LmRpcjsgICAgICAvL+aWueWQkVxyXG4gICAgICAgICAgICB0aGlzLl9yYXRpbyA9IGV2ZW50LnJhdGlvOyAgLy/pgJ/njodcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoUG9zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6Kem5Y+R5oqA6IO9XHJcbiAgICBfZG9Ta2lsbChldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsSWQgPSBldmVudC5za2lsbElkOyAgICAvL+aWueWQkVxyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCLop6blj5HkuobmioDog70gXCIsc2tpbGxJZCk7XHJcbiAgICAgICAgICAgIGlmIChza2lsbElkID09IDApIHtcclxuICAgICAgICAgICAgICAgIHl5cC5ldmVudENlbnRlci5lbWl0KCdhZGQtY29pbicse2NvdW50OnRoaXMuX2NvbmZpZy5Db2luLzEwLHBvc2l0aW9uOlV0aWxzLmdldFdvcmxkUG9zaXRpb24odGhpcy5ub2RlKX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faHAgKz0gdGhpcy5fbWF4SHAvMjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ocCA+IHRoaXMuX21heEhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faHAgPT0gdGhpcy5fbWF4SHA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNraWxsSWQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSArPSAxNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChza2lsbElkID09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgKz0gMTU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v6ZSA5q+B5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liLfmlrDnjqnlrrbkvY3nva5cclxuICAgIF9yZWZyZXNoUG9zaXRpb24oKSB7XHJcbiAgICAgICAgbGV0IGN1cnJQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuXHJcbiAgICAgICAgLy/norDmkp7mtYvor5VcclxuICAgICAgICBsZXQgd2lsbFBvc2l0aW9uID0gdGhpcy5fZ2V0V2lsbFBvc2l0aW9uKGN1cnJQb3NpdGlvbiwgdGhpcy5fZGlyLCB0aGlzLl9yYXRpbyk7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVySXRlbXMgPSB0aGlzLl9tYXAudGVzdENvbGxpZGVycyh3aWxsUG9zaXRpb24sIHRoaXMuX3JhZGl1cyk7XHJcbiAgICAgICAgaWYgKGNvbGxpZGVySXRlbXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gdGhpcy5fZ2V0VGVzdERpcihjdXJyUG9zaXRpb24sIHRoaXMuX3JhZGl1cywgdGhpcy5fZGlyLCBjb2xsaWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHRlc3REaXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbGxQb3NpdGlvbiA9IHRoaXMuX2dldFdpbGxQb3NpdGlvbihjdXJyUG9zaXRpb24sIHRlc3REaXIsIHRoaXMuX3JhdGlvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24od2lsbFBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpe1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAuX3BhdXNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+eOqeWutuWSjOaKgOiDvWljb24s56Kw5pKe5qOA5rWLXHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5wbGF5ZXJTa2lsbEljb25Db2xsaXNpb25UZXN0KCk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy/orqHnrpfngq7nrqHmlrnlkJFcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5fbWFwLmdldE5lYXJFbmVteSgpO1xyXG4gICAgICAgICAgICBpZiAoZW5lbXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmVteVBvcyA9IGNjLnYyKGVuZW15LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJQb3MgPSBjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFycmVsRGlyID0gZW5lbXlQb3Muc3ViKHBsYXllclBvcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhcnJlbERpciA9IHRoaXMuX2RpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQW5nbGUoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyDmioDog70yKOi2hee6p+WtkOW8uSlcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwyVGltZSA9IHRoaXMuX3NraWxsMlRpbWUgPCAwID8gMCA6IHRoaXMuX3NraWxsMlRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX3NwU2tpbGwyLmFjdGl2ZSA9IHRoaXMuX3NraWxsMlRpbWUgPiAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8g5oqA6IO9Myjml6DmlYzpmLLlvqEpXHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsM1RpbWUgPSB0aGlzLl9za2lsbDNUaW1lIDwgMCA/IDAgOiB0aGlzLl9za2lsbDNUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcFNraWxsMy5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcclxuICAgIFxyXG4gICAgICAgICAgICAvL+WwhOWHu1xyXG4gICAgICAgICAgICB0aGlzLnNob290aW5nKGR0KTtcclxuICAgIFxyXG4gICAgICAgICAgICAvL+aYvuekuumToOeUslxyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9zcEFybW91ci5hY3RpdmUgPSB0aGlzLl9za2lsbDNUaW1lID4gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGVmID0gdGhpcy5fc2tpbGwzVGltZSA+IDAgPyAxMDAwMDAwMCA6IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy5fbWFwLmp1ZGdlekluZGV4KHRoaXMubm9kZS55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLl92aWV3TW9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKHRoaXMuX2RpciwtMC41KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9kaXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9kaXI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/lsITlh7tcclxuICAgIHNob290aW5nKGR0KXtcclxuICAgICAgICBsZXQganVkZ2VDRCA9IHRoaXMuX3NraWxsMlRpbWUgPiAwID8gdGhpcy5fY29uZmlnLkJ1bGxldENvZGVUaW1lLzQgOiB0aGlzLl9jb25maWcuQnVsbGV0Q29kZVRpbWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRDb2RlVGltZSA+PSBqdWRnZUNEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldENvZGVUaW1lID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8v5Yib5bu65a2Q5by5XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gKHRoaXMuX3ZpZXdNb2RlIHx8IHRoaXMuX3NraWxsMlRpbWUgPiAwKSA/IHRoaXMuX2NvbmZpZy5CVHlwZTIgOiB0aGlzLl9jb25maWcuQlR5cGUxO1xyXG4gICAgICAgICAgICBsZXQgYXR0YWNrUmFkaXVzID0gdGhpcy5fdmlld01vZGUgPyB0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzICogMC44IDp0aGlzLl9jb25maWcuQXR0YWNrUmFkaXVzO1xyXG4gICAgICAgICAgICBCdWxsZXQuY3JlYXRlQnVsbGV0RXgodHlwZSx0aGlzLm5vZGUucG9zaXRpb24sdGhpcy5fYmFycmVsRGlyLHRoaXMuX2ZpcmUuX2x5QmFycmVsLmhlaWdodCsyMCxhdHRhY2tSYWRpdXMsdGhpcy5fYXRrLHRoaXMuX2NhbXAsdGhpcy5ub2RlLnBhcmVudCx0aGlzLl9tYXApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09IGZhbHNlICYmIHRoaXMuX21hcC5lbmVteUNvdW50KCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBNdXNpY01hbmFnZXIucGxheUVmZmVjdChcInNob290XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aJp+ihjOatu+S6oVxyXG4gICAgZG9EZWF0aCgpe1xyXG4gICAgICAgIHN1cGVyLmRvRGVhdGgoKTtcclxuICAgICAgICBcclxuICAgICAgICB5eXAuZXZlbnRDZW50ZXIuZW1pdChcInBsYXllci1kZWF0aFwiLHt9KTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpOyBcclxuICAgICAgICAvLyDniIbngrjmlYjmnpxcclxuICAgICAgICAvLyDmmL7npLrnu5PmnZ/nlYzpnaJcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbkdhbWUoKXtcclxuICAgICAgICB0aGlzLl9pbkdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ojrflj5bnorDmkp7moYZcclxuICAgIGdldFBsYXllckJvdW5kaW5nQm94KCl7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLmdldFdvcmxkQm91bmRpbmdCb3godGhpcy5fY3VycmVudEJnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3TW9kZSgpe1xyXG4gICAgICAgIHRoaXMuX3ZpZXdNb2RlID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=