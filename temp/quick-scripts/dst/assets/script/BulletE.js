
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/BulletE.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '57473eDU7tGaJ4TPSJC4Ori', 'BulletE');
// script/BulletE.ts

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
exports.Bullet = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var LocalizedData_1 = require("./base/LocalizedData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bulletType = 1; //子弹类型
        _this._bulletLevel = 1; //子弹等级
        _this._map = null; //tile map 节点
        _this._dir = cc.v2(1, 0); //当前行进方向
        _this._speed = 5;
        _this._gunshot = 10; //射程
        _this._damage = 0; //攻击力
        _this._destroyTime = -1; //销毁时间
        _this._camp = ""; //阵营(player/enemy)
        _this._inGame = false;
        _this._currenBullet = null;
        _this._isStop = false;
        return _this;
    }
    Bullet_1 = Bullet;
    //加载完成
    Bullet.prototype.onLoad = function () {
        //初始化变量
        this._initVariable();
        //初始化事件
        this._initEvent();
    };
    Bullet.prototype.onDestroy = function () {
        //销毁事件
        this._destroyEvent();
    };
    //初始化变量
    Bullet.prototype._initVariable = function () {
        this._fire._sprBoom.active = false;
        this._fire._sprBoom.opacity = 0;
        this._fire._sprBoom.scale = 0;
    };
    //初始化事件
    Bullet.prototype._initEvent = function () {
    };
    //销毁事件
    Bullet.prototype._destroyEvent = function () {
    };
    //初始化子弹(方向/射程/伤害值/速度/阵营/当前关卡)
    Bullet.prototype.initBullet = function (dir, gunshot, atk, speed, camp, levelId, bulletType) {
        if (bulletType === void 0) { bulletType = null; }
        this._dir = dir;
        this._gunshot = gunshot;
        this._speed = speed;
        this._damage = atk;
        this._camp = camp;
        this._destroyTime = this._gunshot / this._speed / 60;
        //子弹类型
        if (camp == "enemy") {
            this._bulletType = 0;
            this._bulletLevel = levelId;
        }
        else if (bulletType != null) {
            this._bulletType = bulletType;
            this._bulletLevel = LocalizedData_1.LocalizedData.getIntItem("_bullet_" + this._bulletType + "_", 1);
        }
        else {
            this._bulletType = LocalizedData_1.LocalizedData.getIntItem("_current_bullet_type_", 1);
            this._bulletLevel = LocalizedData_1.LocalizedData.getIntItem("_bullet_" + this._bulletType + "_", 1);
        }
        //子弹杀害加成
        var config = yyp.config.Bullet[this._bulletType];
        this._damage += config.ATK * (this._bulletLevel + 1);
        this._inGame = true;
        this.setBulletType(this._bulletType);
    };
    Bullet.prototype.setBulletType = function (type) {
        var _this = this;
        this._bulletType = type;
        this._currenBullet = null;
        //子弹
        this.node.children.forEach(function (child) {
            if (child.name != "_sprBullet" + _this._bulletType) {
                child.active = false;
            }
            else {
                child.active = true;
                _this._currenBullet = child;
            }
        });
        if (this._currenBullet == null) {
            this._currenBullet = this._createDefaultBullet(type);
        }
        if (type == 99 && this._currenBullet) {
            this._currenBullet.setScale(0.85);
            this._currenBullet.color = cc.color(255, 90, 60, 255);
            this._currenBullet.opacity = 255;
        }
        //调整子弹角度
        if (this._inGame) {
            this.node.angle = Utils_1.Utils.vectorsToDegress(this._dir) - 90;
        }
    };
    Bullet.prototype._createDefaultBullet = function (type) {
        var bullet = new cc.Node("_sprBullet" + type);
        bullet.parent = this.node;
        bullet.setContentSize(70, 70);
        var graphics = bullet.addComponent(cc.Graphics);
        if (type == 99) {
            graphics.fillColor = cc.color(255, 55, 35, 240);
            graphics.circle(0, 0, 28);
            graphics.fill();
            graphics.fillColor = cc.color(255, 230, 120, 230);
            graphics.circle(0, 0, 13);
            graphics.fill();
            bullet.scale = 1.4;
        }
        else {
            graphics.fillColor = cc.color(255, 240, 0, 240);
            graphics.circle(0, 0, 14);
            graphics.fill();
        }
        return bullet;
    };
    //设置tiled map
    Bullet.prototype.setMap = function (map) {
        this._map = map;
    };
    Bullet.prototype.start = function () {
    };
    //每帧调用
    Bullet.prototype.update = function (dt) {
        if (this._inGame == true && this._isStop == false) {
            if (this._destroyTime != -1) {
                this._destroyTime -= dt;
                if (this._destroyTime <= 0) {
                    //销毁
                    this.doDestroy();
                }
                else {
                    //更新位置
                    var currPosition = this.node.position;
                    var willPosition = currPosition.add(cc.v3(this._dir.mul(this._speed)));
                    this.node.setPosition(willPosition);
                    if (this._map.isMap()) {
                        //子弹和坦克检测
                        var hitTank = this._map.bulletEnemyCollisionTest(willPosition, this._camp);
                        if (hitTank) {
                            //击中坦克
                            hitTank.script.beHit(this._damage);
                            //销毁
                            this.doDestroy();
                        }
                        else {
                            //子弹和障碍物检测
                            if (this._map.bulletObstacleCollisionTest(currPosition, willPosition)) {
                                //销毁
                                this.doDestroy();
                            }
                        }
                    }
                }
            }
        }
    };
    //销毁
    Bullet.prototype.doDestroy = function () {
        this._isStop = true;
        this._currenBullet.active = false;
        this._fire._sprBoom.active = true;
        //爆炸动画
        var self = this;
        this._fire._sprBoom.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.2, 0.5, 0.5)), cc.callFunc(function () {
            //销毁
            self.node.destroy();
        })));
    };
    //创建子弹
    Bullet.createBullet = function (pos, dir, gunshot, atk, speed, camp, parentNode, map, bulletType) {
        if (bulletType === void 0) { bulletType = null; }
        speed = (camp == "enemy") ? speed * 0.8 : speed;
        var bullet = cc.instantiate(map.bulletPrefab);
        bullet.parent = parentNode;
        bullet.setPosition(cc.v3(pos));
        bullet.zIndex = 5000;
        bullet.script.initBullet(dir, gunshot, atk, speed, camp, map._levelId, bulletType);
        bullet.script.setMap(map);
        return bullet;
    };
    //创建子弹(类型/位置/方向/炮管长度/射程/攻击力/目标阵营)
    Bullet.createBulletEx = function (bulletType, pos, dir, wipeLen, gunshot, atk, camp, parentNode, map, speed) {
        if (speed === void 0) { speed = 8; }
        gunshot = gunshot - wipeLen;
        var bdir = dir;
        var bpos = pos;
        var bullet = null;
        switch (bulletType) {
            case 1: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map);
                break;
            }
            case 2: {
                for (var i = 0; i <= 1; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 2.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map);
                }
                break;
            }
            case 3: {
                for (var i = 0; i <= 2; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map);
                }
                break;
            }
            case 4: {
                for (var i = 0; i <= 3; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 7.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map);
                }
                break;
            }
            case 5: {
                for (var i = 0; i <= 5; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 5 - 12.5);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map);
                }
                break;
            }
            case 99: {
                bdir = bdir;
                bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, speed, camp, parentNode, map, bulletType);
                break;
            }
            case 11: {
                for (var i = 0; i <= 3; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, i * 90);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, 3, camp, parentNode, map);
                }
                break;
            }
            case 12: {
                for (var i = 0; i < 10; i++) {
                    bdir = Utils_1.Utils.vectorsRotateDegress(dir, 36 * i);
                    bpos = cc.v2(pos).add(bdir.mul(wipeLen));
                    bullet = Bullet_1.createBullet(bpos, bdir, gunshot, atk, 1.5, camp, parentNode, map);
                }
                break;
            }
        }
    };
    var Bullet_1;
    Bullet = Bullet_1 = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(BaseComponent_1.BaseComponent));
exports.Bullet = Bullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRFLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsc0NBQW1DO0FBQ25DLHNEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxlQUFlO0FBQ2Ysd0JBQXdCO0FBRXhCO0lBQTRCLDBCQUFhO0lBQXpDO1FBQUEscUVBOFJDO1FBNVJHLGlCQUFXLEdBQU8sQ0FBQyxDQUFDLENBQVksTUFBTTtRQUN0QyxrQkFBWSxHQUFNLENBQUMsQ0FBQyxDQUFZLE1BQU07UUFDdEMsVUFBSSxHQUFjLElBQUksQ0FBQyxDQUFTLGFBQWE7UUFDN0MsVUFBSSxHQUFjLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUcsUUFBUTtRQUN4QyxZQUFNLEdBQVksQ0FBQyxDQUFDO1FBQ3BCLGNBQVEsR0FBVSxFQUFFLENBQUMsQ0FBVyxJQUFJO1FBQ3BDLGFBQU8sR0FBVyxDQUFDLENBQUMsQ0FBWSxLQUFLO1FBQ3JDLGtCQUFZLEdBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBVyxNQUFNO1FBQ3RDLFdBQUssR0FBYSxFQUFFLENBQUMsQ0FBVyxrQkFBa0I7UUFDbEQsYUFBTyxHQUFXLEtBQUssQ0FBQztRQUV4QixtQkFBYSxHQUFLLElBQUksQ0FBQztRQUN2QixhQUFPLEdBQVcsS0FBSyxDQUFDOztJQWdSNUIsQ0FBQztlQTlSWSxNQUFNO0lBZ0JmLE1BQU07SUFDTix1QkFBTSxHQUFOO1FBQ0ksT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBQ0ksTUFBTTtRQUNOLElBQUksQ0FB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QWEsR0E4UnhDO0FBOVJZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi9iYXNlL0Jhc2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vYmFzZS9VdGlsc1wiO1xyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL2Jhc2UvTG9jYWxpemVkRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vL+engeacieWHveaVsCzor7fkvb/nlKgnXyflvIDlpLRcclxuLy/or7fkv67mlLknTmV3Q2xhc3MnID0+IOiHquW3seeahOexu+WQjVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XHJcblxyXG4gICAgX2J1bGxldFR5cGUgICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgX2J1bGxldExldmVsICAgID0gMTsgICAgICAgICAgICAvL+WtkOW8ueetiee6p1xyXG4gICAgX21hcCAgICAgICAgICAgID0gbnVsbDsgICAgICAgICAvL3RpbGUgbWFwIOiKgueCuVxyXG4gICAgX2RpciAgICAgICAgICAgID0gY2MudjIoMSwwKTsgICAvL+W9k+WJjeihjOi/m+aWueWQkVxyXG4gICAgX3NwZWVkICAgICAgICAgID0gNTtcclxuICAgIF9ndW5zaG90ICAgICAgICA9IDEwOyAgICAgICAgICAgLy/lsITnqItcclxuICAgIF9kYW1hZ2UgICAgICAgICA9IDA7ICAgICAgICAgICAgLy/mlLvlh7vliptcclxuICAgIF9kZXN0cm95VGltZSAgICA9IC0xOyAgICAgICAgICAgLy/plIDmr4Hml7bpl7RcclxuICAgIF9jYW1wICAgICAgICAgICA9IFwiXCI7ICAgICAgICAgICAvL+mYteiQpShwbGF5ZXIvZW5lbXkpXHJcbiAgICBfaW5HYW1lICAgICAgICAgPSBmYWxzZTtcclxuXHJcbiAgICBfY3VycmVuQnVsbGV0ICAgPSBudWxsO1xyXG4gICAgX2lzU3RvcCAgICAgICAgID0gZmFsc2U7XHJcblxyXG4gICAgLy/liqDovb3lrozmiJBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblj5jph49cclxuICAgICAgICB0aGlzLl9pbml0VmFyaWFibGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5Y+Y6YePXHJcbiAgICBfaW5pdFZhcmlhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX3NwckJvb20uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLnNjYWxlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgX2luaXRFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+mUgOavgeS6i+S7tlxyXG4gICAgX2Rlc3Ryb3lFdmVudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWtkOW8uSjmlrnlkJEv5bCE56iLL+S8pOWus+WAvC/pgJ/luqYv6Zi16JClL+W9k+WJjeWFs+WNoSlcclxuICAgIGluaXRCdWxsZXQoZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAsbGV2ZWxJZCxidWxsZXRUeXBlID0gbnVsbCl7XHJcbiAgICAgICAgdGhpcy5fZGlyID0gZGlyO1xyXG4gICAgICAgIHRoaXMuX2d1bnNob3QgPSBndW5zaG90O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlID0gYXRrO1xyXG4gICAgICAgIHRoaXMuX2NhbXAgPSBjYW1wO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lUaW1lID0gdGhpcy5fZ3Vuc2hvdC90aGlzLl9zcGVlZC82MDtcclxuICAgICAgICBcclxuICAgICAgICAvL+WtkOW8ueexu+Wei1xyXG4gICAgICAgIGlmIChjYW1wID09IFwiZW5lbXlcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRUeXBlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0TGV2ZWwgPSBsZXZlbElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChidWxsZXRUeXBlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IGJ1bGxldFR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldExldmVsID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKGBfYnVsbGV0XyR7dGhpcy5fYnVsbGV0VHlwZX1fYCwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9jdXJyZW50X2J1bGxldF90eXBlX1wiLDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRMZXZlbCA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShgX2J1bGxldF8ke3RoaXMuX2J1bGxldFR5cGV9X2AsMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WtkOW8ueadgOWus+WKoOaIkFxyXG4gICAgICAgIGxldCBjb25maWcgPSB5eXAuY29uZmlnLkJ1bGxldFt0aGlzLl9idWxsZXRUeXBlXTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UgKz0gY29uZmlnLkFUSyoodGhpcy5fYnVsbGV0TGV2ZWwrMSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2luR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRCdWxsZXRUeXBlKHRoaXMuX2J1bGxldFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ1bGxldFR5cGUodHlwZSl7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy/lrZDlvLlcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgIT0gXCJfc3ByQnVsbGV0XCIgKyB0aGlzLl9idWxsZXRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldCA9IGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW5CdWxsZXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5CdWxsZXQgPSB0aGlzLl9jcmVhdGVEZWZhdWx0QnVsbGV0KHR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gOTkgJiYgdGhpcy5fY3VycmVuQnVsbGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5zZXRTY2FsZSgwLjg1KTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuQnVsbGV0LmNvbG9yID0gY2MuY29sb3IoMjU1LCA5MCwgNjAsIDI1NSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+iwg+aVtOWtkOW8ueinkuW6plxyXG4gICAgICAgIGlmICh0aGlzLl9pbkdhbWUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKHRoaXMuX2RpciktOTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEZWZhdWx0QnVsbGV0KHR5cGUpIHtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gbmV3IGNjLk5vZGUoXCJfc3ByQnVsbGV0XCIgKyB0eXBlKTtcclxuICAgICAgICBidWxsZXQucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJ1bGxldC5zZXRDb250ZW50U2l6ZSg3MCwgNzApO1xyXG4gICAgICAgIGxldCBncmFwaGljcyA9IGJ1bGxldC5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PSA5OSkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDU1LCAzNSwgMjQwKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2lyY2xlKDAsIDAsIDI4KTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsQ29sb3IgPSBjYy5jb2xvcigyNTUsIDIzMCwgMTIwLCAyMzApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoMCwgMCwgMTMpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgICAgIGJ1bGxldC5zY2FsZSA9IDEuNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gY2MuY29sb3IoMjU1LCAyNDAsIDAsIDI0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmNpcmNsZSgwLCAwLCAxNCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva50aWxlZCBtYXBcclxuICAgIHNldE1hcChtYXApIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/mr4/luKfosIPnlKhcclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5HYW1lID09IHRydWUgJiYgdGhpcy5faXNTdG9wID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+abtOaWsOS9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyUG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpbGxQb3NpdGlvbiA9IGN1cnJQb3NpdGlvbi5hZGQoY2MudjModGhpcy5fZGlyLm11bCh0aGlzLl9zcGVlZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24od2lsbFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLmlzTWFwKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lrZDlvLnlkozlnablhYvmo4DmtYtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpdFRhbmsgPSB0aGlzLl9tYXAuYnVsbGV0RW5lbXlDb2xsaXNpb25UZXN0KHdpbGxQb3NpdGlvbix0aGlzLl9jYW1wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhpdFRhbmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Ye75Lit5Z2m5YWLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRUYW5rLnNjcmlwdC5iZUhpdCh0aGlzLl9kYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9EZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5a2Q5by55ZKM6Zqc56KN54mp5qOA5rWLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwLmJ1bGxldE9ic3RhY2xlQ29sbGlzaW9uVGVzdChjdXJyUG9zaXRpb24sd2lsbFBvc2l0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6ZSA5q+BXHJcbiAgICBkb0Rlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLl9pc1N0b3AgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbkJ1bGxldC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9maXJlLl9zcHJCb29tLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy/niIbngrjliqjnlLtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZmlyZS5fc3ByQm9vbS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwwLjUsMC41KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy/plIDmr4FcclxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIC8v5Yib5bu65a2Q5by5XHJcbiAgICBzdGF0aWMgY3JlYXRlQnVsbGV0KHBvcyxkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCxidWxsZXRUeXBlID0gbnVsbCl7XHJcbiAgICAgICAgc3BlZWQgPSAoY2FtcCA9PSBcImVuZW15XCIpID8gc3BlZWQqMC44IDogc3BlZWQ7XHJcblxyXG4gICAgICAgIGxldCBidWxsZXQgPSBjYy5pbnN0YW50aWF0ZShtYXAuYnVsbGV0UHJlZmFiKTtcclxuICAgICAgICBidWxsZXQucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICBidWxsZXQuc2V0UG9zaXRpb24oY2MudjMocG9zKSk7XHJcbiAgICAgICAgYnVsbGV0LnpJbmRleCA9IDUwMDA7XHJcbiAgICAgICAgYnVsbGV0LnNjcmlwdC5pbml0QnVsbGV0KGRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLG1hcC5fbGV2ZWxJZCxidWxsZXRUeXBlKTtcclxuICAgICAgICBidWxsZXQuc2NyaXB0LnNldE1hcChtYXApO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVsbGV0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WIm+W7uuWtkOW8uSjnsbvlnosv5L2N572uL+aWueWQkS/ngq7nrqHplb/luqYv5bCE56iLL+aUu+WHu+WKmy/nm67moIfpmLXokKUpXHJcbiAgICBzdGF0aWMgY3JlYXRlQnVsbGV0RXgoYnVsbGV0VHlwZSxwb3MsZGlyLHdpcGVMZW4sZ3Vuc2hvdCxhdGssY2FtcCxwYXJlbnROb2RlLG1hcCxzcGVlZCA9IDgpe1xyXG4gICAgICAgIGd1bnNob3QgPSBndW5zaG90IC0gd2lwZUxlbjtcclxuICAgICAgICBsZXQgYmRpciA9IGRpcjtcclxuICAgICAgICBsZXQgYnBvcyA9IHBvcztcclxuICAgICAgICBsZXQgYnVsbGV0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgc3dpdGNoKGJ1bGxldFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgYmRpciA9IGJkaXI7XHJcbiAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gMi41KTtcclxuICAgICAgICAgICAgICAgICAgICBicG9zID0gY2MudjIocG9zKS5hZGQoYmRpci5tdWwod2lwZUxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo1IC0gNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNDp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDcuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0ayxzcGVlZCxjYW1wLHBhcmVudE5vZGUsbWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNTp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLGkqNSAtIDEyLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssc3BlZWQsY2FtcCxwYXJlbnROb2RlLG1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDk5OntcclxuICAgICAgICAgICAgICAgIGJkaXIgPSBiZGlyO1xyXG4gICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IEJ1bGxldC5jcmVhdGVCdWxsZXQoYnBvcyxiZGlyLGd1bnNob3QsYXRrLHNwZWVkLGNhbXAscGFyZW50Tm9kZSxtYXAsYnVsbGV0VHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDExOntcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJkaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsaSo5MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnBvcyA9IGNjLnYyKHBvcykuYWRkKGJkaXIubXVsKHdpcGVMZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQgPSBCdWxsZXQuY3JlYXRlQnVsbGV0KGJwb3MsYmRpcixndW5zaG90LGF0aywzLGNhbXAscGFyZW50Tm9kZSxtYXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMjp7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiZGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLDM2KmkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJwb3MgPSBjYy52Mihwb3MpLmFkZChiZGlyLm11bCh3aXBlTGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0ID0gQnVsbGV0LmNyZWF0ZUJ1bGxldChicG9zLGJkaXIsZ3Vuc2hvdCxhdGssMS41LGNhbXAscGFyZW50Tm9kZSxtYXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==