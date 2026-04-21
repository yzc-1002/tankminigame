
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/TankE.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d4625LDClId779nLg+yGmj', 'TankE');
// script/TankE.ts

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
exports.Tank = void 0;
var BaseComponent_1 = require("./base/BaseComponent");
var Utils_1 = require("./base/Utils");
var MusicManager_1 = require("./base/MusicManager");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tank = /** @class */ (function (_super) {
    __extends(Tank, _super);
    function Tank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.boomPrefab = null;
        //移动,碰撞检测
        _this._camp = ""; //阵营
        _this._radius = 10; //碰撞检测半径
        _this._dir = cc.v2(1, 0); //当前行进方向
        _this._barrelDir = cc.v2(1, 0); //炮管方向
        _this._ratio = 0; //当前速率
        _this._map = null; //tile map 节点
        _this._hp = 0; //当前血量
        _this._maxHp = 0; //最大血量血量
        _this._atk = 0; //攻击力
        _this._def = 0; //防御
        _this._config = {};
        _this._tankType = 1; //坦克类型
        _this._currentBg = null;
        return _this;
    }
    Tank.prototype.onLoad = function () {
        this._radius = this.node["$CircleCollider"].radius;
        this._dir = Utils_1.Utils.degressToVectors(this._fire._lyBg.angle);
        this._barrelDir = this._dir;
    };
    //设置tiled map
    Tank.prototype.setMap = function (map) {
        this._map = map;
    };
    //设置坦克类型
    Tank.prototype.setTankType = function (tankType) {
        var _this = this;
        this._tankType = tankType;
        this._config = yyp.config.Tank[this._tankType];
        //炮身
        this._fire._lyBg.children.forEach(function (child) {
            if (child.name != "_sprBg" + _this._tankType) {
                child.active = false;
            }
            else {
                child.active = true;
            }
        });
        //炮筒
        this._fire._lyBarrel.children.forEach(function (child) {
            if (child.name != "_sprBarrel" + _this._tankType) {
                child.active = false;
            }
            else {
                child.active = true;
                _this._currentBg = child;
            }
        });
    };
    //获取碰撞检测半径
    Tank.prototype.getRadius = function () {
        return this._radius;
    };
    //获取玩家的新位置
    Tank.prototype._getWillPosition = function (currPosition, dir, ratio) {
        var dis = dir.mul(ratio * this._config.Speed);
        return currPosition.add(dis);
    };
    // 获取碰撞后的尝试方向
    Tank.prototype._getTestDir = function (P, radius, dir, colliderItems) {
        var testDirs = [];
        //获取尝试方向
        if (this._camp == "enemy") {
            for (var i = 1; i < 6; i++) {
                var testDir = Utils_1.Utils.vectorsRotateDegress(dir, 30 * i);
                testDirs.push(testDir);
            }
            for (var i = 1; i < 7; i++) {
                var testDir = Utils_1.Utils.vectorsRotateDegress(dir, -30 * i);
                testDirs.push(testDir);
            }
        }
        else {
            //按最优获取
            for (var i = 0; i < colliderItems.length; i++) {
                var colliderItem = colliderItems[i];
                this._getTestDirs(P, dir, colliderItem, testDirs);
            }
        }
        //检测尝试方向
        for (var i = 0; i < testDirs.length; i++) {
            var testDir = testDirs[i];
            if (this._circlePassColliderItems(P, radius, testDir, colliderItems) == false) {
                return testDir;
            }
        }
        return null;
    };
    //点p为圆心,radius为半径,方向dir的圆,是否会经过colliderItems中的一条线段
    Tank.prototype._circlePassColliderItems = function (P, radius, dir, colliderItems) {
        for (var i = 0; i < colliderItems.length; i++) {
            var colliderItem = colliderItems[i];
            var A = colliderItem.collider.offset.add(colliderItem.collider.points[0]);
            var B = colliderItem.collider.offset.add(colliderItem.collider.points[1]);
            if (Utils_1.Utils.circlePassLine(P, radius, dir, A, B)) {
                return true;
            }
        }
        return false;
    };
    //射线起始点P,方向dir,与线段AB(colliderItem组成)碰撞后的尝试方向列表
    Tank.prototype._getTestDirs = function (P, dir, colliderItem, retDirs) {
        var P1 = colliderItem.point; //collider上距离P最近的点
        var dirPP1 = P1.sub(P).normalize();
        var radianPP1 = cc.v2(dirPP1).signAngle(dir); // 求方向向量与对比向量间的弧度
        var baseDir = dir;
        var maxDir = radianPP1 > 0 ? Utils_1.Utils.vectorsRotateDegress(baseDir, 90) : Utils_1.Utils.vectorsRotateDegress(baseDir, -90);
        var parallelDegree = this._getParallelDegree(baseDir, maxDir, colliderItem.collider);
        var symbol = radianPP1 > 0 ? 1 : -1;
        for (var i = 1; i <= 6; i++) {
            var offsetDegree = i * 15 * symbol;
            if (parallelDegree) {
                if (symbol > 0 && parallelDegree < offsetDegree) {
                    var testDir_1 = Utils_1.Utils.vectorsRotateDegress(baseDir, parallelDegree);
                    retDirs.push(testDir_1);
                    parallelDegree = null;
                }
                else if (symbol < 0 && parallelDegree > offsetDegree) {
                    var testDir_2 = Utils_1.Utils.vectorsRotateDegress(baseDir, parallelDegree);
                    retDirs.push(testDir_2);
                    parallelDegree = null;
                }
            }
            var testDir = Utils_1.Utils.vectorsRotateDegress(baseDir, offsetDegree);
            retDirs.push(testDir);
        }
    };
    //获取平行于collider,且包含在baseDegree,maxDegree的角度(相对baseDir)
    Tank.prototype._getParallelDegree = function (baseDir, maxDir, collider) {
        var A = collider.offset.add(collider.points[0]);
        var B = collider.offset.add(collider.points[1]);
        var AB = B.sub(A).normalize();
        var BA = A.sub(B).normalize();
        var radianMax = maxDir.signAngle(baseDir);
        var radianAB = AB.signAngle(baseDir);
        var radianBA = BA.signAngle(baseDir);
        if (radianMax > 0) {
            if (radianAB > 0 && radianAB < radianMax) {
                return -cc.misc.radiansToDegrees(radianAB);
            }
            if (radianBA > 0 && radianBA < radianMax) {
                return -cc.misc.radiansToDegrees(radianBA);
            }
        }
        else if (radianMax < 0) {
            if (radianAB < 0 && radianAB > radianMax) {
                return -cc.misc.radiansToDegrees(radianAB);
            }
            if (radianBA < 0 && radianBA > radianMax) {
                return -cc.misc.radiansToDegrees(radianBA);
            }
        }
        return null;
    };
    //刷新玩家角度
    Tank.prototype._refreshAngle = function () {
        //动态修改player角度
        var fromAngle = this._fire._lyBg.angle;
        var toAngle = Utils_1.Utils.vectorsToDegress(this._dir);
        var disAngle = toAngle - fromAngle;
        //使当前角度和目标角度处于同一个维度,以便算出来的偏移角度是最小的
        if (disAngle > 180) {
            fromAngle = fromAngle + 360;
            disAngle = toAngle - fromAngle;
        }
        else if (disAngle < -180) {
            fromAngle = fromAngle - 360;
            disAngle = toAngle - fromAngle;
        }
        //每帧最多只向目标角度旋转10度
        if (disAngle > 10) {
            this._fire._lyBg.angle = this._fire._lyBg.angle + 10;
        }
        else if (disAngle < -10) {
            this._fire._lyBg.angle = this._fire._lyBg.angle - 10;
        }
        else {
            this._fire._lyBg.angle = toAngle;
        }
        //修正角度在-180~180范围内
        this._fire._lyBg.angle = Utils_1.Utils.correctionAngle(this._fire._lyBg.angle);
        //调整炮管角度
        this._fire._lyBarrel.angle = Utils_1.Utils.vectorsToDegress(this._barrelDir);
    };
    //被攻击到()
    Tank.prototype.beHit = function (damage) {
        // cc.log("enemy behit");
        if (this._camp == "player") {
            var a = 1;
            // damage = 10000000000000000;
        }
        else {
            var a = 1;
        }
        //计算伤害
        damage = damage - this._def;
        if (damage < 0) {
            damage = 0;
        }
        //计算最新血量
        this._hp -= damage;
        if (this._hp < 0) {
            this._hp = 0;
        }
        //计算血量条显示百分百
        this.refreshHp();
        //血量等于0,进入死亡逻辑
        if (this._hp == 0) {
            this.doDeath();
        }
    };
    //计算血量条显示百分百
    Tank.prototype.refreshHp = function () {
        var percent = this._hp / this._maxHp;
        this._fire._lifebar.$ProgressBar.progress = percent;
    };
    //执行死亡
    Tank.prototype.doDeath = function () {
        var boom = cc.instantiate(this.boomPrefab);
        boom.parent = this.node.parent;
        boom.position = this.node.position;
        boom.zIndex = 1000;
        var ani = boom.getComponent(cc.Animation);
        ani.play("boom2");
        MusicManager_1.MusicManager.playEffect("boom");
        Utils_1.Utils.vibrate();
    };
    __decorate([
        property(cc.Prefab)
    ], Tank.prototype, "bulletPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Tank.prototype, "boomPrefab", void 0);
    Tank = __decorate([
        ccclass
    ], Tank);
    return Tank;
}(BaseComponent_1.BaseComponent));
exports.Tank = Tank;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxUYW5rRS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBQ25ELHNDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDNUIsMENBQTBDO0FBQ3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBCLHdCQUFhO0lBQXZDO1FBQUEscUVBNFFDO1FBelFHLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLFNBQVM7UUFDVCxXQUFLLEdBQVMsRUFBRSxDQUFDLENBQVcsSUFBSTtRQUNoQyxhQUFPLEdBQU8sRUFBRSxDQUFDLENBQVcsUUFBUTtRQUNwQyxVQUFJLEdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxRQUFRO1FBQ3BDLGdCQUFVLEdBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxNQUFNO1FBQ2xDLFlBQU0sR0FBUSxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ2xDLFVBQUksR0FBVSxJQUFJLENBQUMsQ0FBUyxhQUFhO1FBRXpDLFNBQUcsR0FBVyxDQUFDLENBQUMsQ0FBWSxNQUFNO1FBQ2xDLFlBQU0sR0FBUSxDQUFDLENBQUMsQ0FBWSxRQUFRO1FBQ3BDLFVBQUksR0FBVSxDQUFDLENBQUMsQ0FBWSxLQUFLO1FBQ2pDLFVBQUksR0FBVSxDQUFDLENBQUMsQ0FBWSxJQUFJO1FBQ2hDLGFBQU8sR0FBTyxFQUFFLENBQUM7UUFFakIsZUFBUyxHQUFLLENBQUMsQ0FBQyxDQUFZLE1BQU07UUFDbEMsZ0JBQVUsR0FBSSxJQUFJLENBQUM7O0lBcVB2QixD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QUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xCLDJCQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLGFBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBeFFEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDUztJQU5wQixJQUFJO1FBRGhCLE9BQU87T0FDSyxJQUFJLENBNFFoQjtJQUFELFdBQUM7Q0E1UUQsQUE0UUMsQ0E1UXlCLDZCQUFhLEdBNFF0QztBQTVRWSxvQkFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4vYmFzZS9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL2Jhc2UvVXRpbHNcIjtcclxuaW1wb3J0IHsgTXVzaWNNYW5hZ2VyIH0gZnJvbSBcIi4vYmFzZS9NdXNpY01hbmFnZXJcIjtcclxuLy/nlLXlrZDpgq7ku7ZwdWhhbHNraWpzZW1lbkBnbWFpbC5jb21cclxuLy/mupDnoIHnvZHnq5kg5byAdnBu5YWo5bGA5qih5byP5omT5byAIGh0dHA6Ly93ZWIzaW5jdWJhdG9ycy5jb20vXHJcbi8v55S15oqlaHR0cHM6Ly90Lm1lL2dhbWVjb2RlOTk5XHJcbi8v572R6aG15a6i5pyNIGh0dHA6Ly93ZWIzaW5jdWJhdG9ycy5jb20va2VmdS5odG1sXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFRhbmsgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYm9vbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+enu+WKqCznorDmkp7mo4DmtYtcclxuICAgIF9jYW1wICAgICAgID0gXCJcIjsgICAgICAgICAgIC8v6Zi16JClXHJcbiAgICBfcmFkaXVzICAgICA9IDEwOyAgICAgICAgICAgLy/norDmkp7mo4DmtYvljYrlvoRcclxuICAgIF9kaXIgICAgICAgID0gY2MudjIoMSwwKTsgICAvL+W9k+WJjeihjOi/m+aWueWQkVxyXG4gICAgX2JhcnJlbERpciAgPSBjYy52MigxLDApOyAgIC8v54Ku566h5pa55ZCRXHJcbiAgICBfcmF0aW8gICAgICA9IDA7ICAgICAgICAgICAgLy/lvZPliY3pgJ/njodcclxuICAgIF9tYXAgICAgICAgID0gbnVsbDsgICAgICAgICAvL3RpbGUgbWFwIOiKgueCuVxyXG5cclxuICAgIF9ocCAgICAgICAgID0gMDsgICAgICAgICAgICAvL+W9k+WJjeihgOmHj1xyXG4gICAgX21heEhwICAgICAgPSAwOyAgICAgICAgICAgIC8v5pyA5aSn6KGA6YeP6KGA6YePXHJcbiAgICBfYXRrICAgICAgICA9IDA7ICAgICAgICAgICAgLy/mlLvlh7vliptcclxuICAgIF9kZWYgICAgICAgID0gMDsgICAgICAgICAgICAvL+mYsuW+oVxyXG4gICAgX2NvbmZpZzphbnkgPSB7fTtcclxuXHJcbiAgICBfdGFua1R5cGUgICA9IDE7ICAgICAgICAgICAgLy/lnablhYvnsbvlnotcclxuICAgIF9jdXJyZW50QmcgID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHRoaXMubm9kZVtcIiRDaXJjbGVDb2xsaWRlclwiXS5yYWRpdXM7XHJcbiAgICAgICAgdGhpcy5fZGlyID0gVXRpbHMuZGVncmVzc1RvVmVjdG9ycyh0aGlzLl9maXJlLl9seUJnLmFuZ2xlKTtcclxuICAgICAgICB0aGlzLl9iYXJyZWxEaXIgPSB0aGlzLl9kaXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K6+572udGlsZWQgbWFwXHJcbiAgICBzZXRNYXAobWFwKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iuvue9ruWdpuWFi+exu+Wei1xyXG4gICAgc2V0VGFua1R5cGUodGFua1R5cGUpIHtcclxuICAgICAgICB0aGlzLl90YW5rVHlwZSA9IHRhbmtUeXBlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHl5cC5jb25maWcuVGFua1t0aGlzLl90YW5rVHlwZV07XHJcblxyXG4gICAgICAgIC8v54Ku6LqrXHJcbiAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSAhPSBcIl9zcHJCZ1wiICsgdGhpcy5fdGFua1R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ngq7nrZJcclxuICAgICAgICB0aGlzLl9maXJlLl9seUJhcnJlbC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSAhPSBcIl9zcHJCYXJyZWxcIiArIHRoaXMuX3RhbmtUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRCZyA9IGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bnorDmkp7mo4DmtYvljYrlvoRcclxuICAgIGdldFJhZGl1cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W546p5a6255qE5paw5L2N572uXHJcbiAgICBfZ2V0V2lsbFBvc2l0aW9uKGN1cnJQb3NpdGlvbiwgZGlyLCByYXRpbykge1xyXG4gICAgICAgIGxldCBkaXMgPSBkaXIubXVsKHJhdGlvICogdGhpcy5fY29uZmlnLlNwZWVkKTtcclxuICAgICAgICByZXR1cm4gY3VyclBvc2l0aW9uLmFkZChkaXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDojrflj5bnorDmkp7lkI7nmoTlsJ3or5XmlrnlkJFcclxuICAgIF9nZXRUZXN0RGlyKFAscmFkaXVzLGRpcixjb2xsaWRlckl0ZW1zKXtcclxuICAgICAgICBsZXQgdGVzdERpcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy/ojrflj5blsJ3or5XmlrnlkJFcclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcImVuZW15XCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLCAzMCAqIGkpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsIC0zMCAqIGkpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERpcnMucHVzaCh0ZXN0RGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvL+aMieacgOS8mOiOt+WPllxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbGxpZGVySXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlckl0ZW0gPSBjb2xsaWRlckl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0VGVzdERpcnMoUCxkaXIsY29sbGlkZXJJdGVtLHRlc3REaXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mo4DmtYvlsJ3or5XmlrnlkJFcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlc3REaXJzLmxlbmd0aDsgaSsrKSB7IFxyXG4gICAgICAgICAgICBsZXQgdGVzdERpciA9IHRlc3REaXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2lyY2xlUGFzc0NvbGxpZGVySXRlbXMoUCxyYWRpdXMsdGVzdERpcixjb2xsaWRlckl0ZW1zKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdERpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ngrlw5Li65ZyG5b+DLHJhZGl1c+S4uuWNiuW+hCzmlrnlkJFkaXLnmoTlnIYs5piv5ZCm5Lya57uP6L+HY29sbGlkZXJJdGVtc+S4reeahOS4gOadoee6v+autVxyXG4gICAgX2NpcmNsZVBhc3NDb2xsaWRlckl0ZW1zKFAscmFkaXVzLGRpcixjb2xsaWRlckl0ZW1zKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbGxpZGVySXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGVySXRlbSA9IGNvbGxpZGVySXRlbXNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgQSA9IGNvbGxpZGVySXRlbS5jb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVySXRlbS5jb2xsaWRlci5wb2ludHNbMF0pO1xyXG4gICAgICAgICAgICBsZXQgQiA9IGNvbGxpZGVySXRlbS5jb2xsaWRlci5vZmZzZXQuYWRkKGNvbGxpZGVySXRlbS5jb2xsaWRlci5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMuY2lyY2xlUGFzc0xpbmUoUCxyYWRpdXMsZGlyLEEsQikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lsITnur/otbflp4vngrlQLOaWueWQkWRpcizkuI7nur/mrrVBQihjb2xsaWRlckl0ZW3nu4TmiJAp56Kw5pKe5ZCO55qE5bCd6K+V5pa55ZCR5YiX6KGoXHJcbiAgICBfZ2V0VGVzdERpcnMoUCxkaXIsY29sbGlkZXJJdGVtLHJldERpcnMpe1xyXG4gICAgICAgIGxldCBQMSA9IGNvbGxpZGVySXRlbS5wb2ludDsgICAgLy9jb2xsaWRlcuS4iui3neemu1DmnIDov5HnmoTngrlcclxuICAgICAgICBsZXQgZGlyUFAxID0gUDEuc3ViKFApLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCByYWRpYW5QUDEgPSBjYy52MihkaXJQUDEpLnNpZ25BbmdsZShkaXIpOyAgICAvLyDmsYLmlrnlkJHlkJHph4/kuI7lr7nmr5TlkJHph4/pl7TnmoTlvKfluqZcclxuXHJcbiAgICAgICAgbGV0IGJhc2VEaXIgPSBkaXI7XHJcbiAgICAgICAgbGV0IG1heERpciA9IHJhZGlhblBQMSA+IDAgPyBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCA5MCkgOiBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCAtOTApO1xyXG4gICAgICAgIGxldCBwYXJhbGxlbERlZ3JlZSA9IHRoaXMuX2dldFBhcmFsbGVsRGVncmVlKGJhc2VEaXIsbWF4RGlyLGNvbGxpZGVySXRlbS5jb2xsaWRlcik7XHJcbiAgICAgICAgbGV0IHN5bWJvbCA9IHJhZGlhblBQMSA+IDAgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0RGVncmVlID0gaSAqIDE1ICogc3ltYm9sO1xyXG4gICAgICAgICAgICBpZiAocGFyYWxsZWxEZWdyZWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzeW1ib2wgPiAwICYmIHBhcmFsbGVsRGVncmVlIDwgb2Zmc2V0RGVncmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3REaXIgPSBVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhiYXNlRGlyLCBwYXJhbGxlbERlZ3JlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGVsRGVncmVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN5bWJvbCA8IDAgJiYgcGFyYWxsZWxEZWdyZWUgPiBvZmZzZXREZWdyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdERpciA9IFV0aWxzLnZlY3RvcnNSb3RhdGVEZWdyZXNzKGJhc2VEaXIsIHBhcmFsbGVsRGVncmVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXREaXJzLnB1c2godGVzdERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsZWxEZWdyZWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0ZXN0RGlyID0gVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoYmFzZURpciwgb2Zmc2V0RGVncmVlKTtcclxuICAgICAgICAgICAgcmV0RGlycy5wdXNoKHRlc3REaXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blubPooYzkuo5jb2xsaWRlcizkuJTljIXlkKvlnKhiYXNlRGVncmVlLG1heERlZ3JlZeeahOinkuW6pijnm7jlr7liYXNlRGlyKVxyXG4gICAgX2dldFBhcmFsbGVsRGVncmVlKGJhc2VEaXIsbWF4RGlyLGNvbGxpZGVyKXtcclxuICAgICAgICBsZXQgQSA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzBdKTtcclxuICAgICAgICBsZXQgQiA9IGNvbGxpZGVyLm9mZnNldC5hZGQoY29sbGlkZXIucG9pbnRzWzFdKTtcclxuICAgICAgICBsZXQgQUIgPSBCLnN1YihBKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgQkEgPSBBLnN1YihCKS5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhZGlhbk1heCA9IG1heERpci5zaWduQW5nbGUoYmFzZURpcik7XHJcbiAgICAgICAgbGV0IHJhZGlhbkFCID0gQUIuc2lnbkFuZ2xlKGJhc2VEaXIpO1xyXG4gICAgICAgIGxldCByYWRpYW5CQSA9IEJBLnNpZ25BbmdsZShiYXNlRGlyKTtcclxuXHJcbiAgICAgICAgaWYgKHJhZGlhbk1heCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHJhZGlhbkFCID4gMCAmJiByYWRpYW5BQiA8IHJhZGlhbk1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuQUIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYWRpYW5CQSA+IDAgJiYgcmFkaWFuQkEgPCByYWRpYW5NYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhbkJBKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyYWRpYW5NYXggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChyYWRpYW5BQiA8IDAgJiYgcmFkaWFuQUIgPiByYWRpYW5NYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhbkFCKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmFkaWFuQkEgPCAwICYmIHJhZGlhbkJBID4gcmFkaWFuTWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5CQSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yi35paw546p5a626KeS5bqmXHJcbiAgICBfcmVmcmVzaEFuZ2xlKCl7XHJcbiAgICAgICAgLy/liqjmgIHkv67mlLlwbGF5ZXLop5LluqZcclxuICAgICAgICBsZXQgZnJvbUFuZ2xlID0gdGhpcy5fZmlyZS5fbHlCZy5hbmdsZTtcclxuICAgICAgICBsZXQgdG9BbmdsZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3ModGhpcy5fZGlyKTtcclxuICAgICAgICBsZXQgZGlzQW5nbGUgPSB0b0FuZ2xlIC0gZnJvbUFuZ2xlO1xyXG5cclxuICAgICAgICAvL+S9v+W9k+WJjeinkuW6puWSjOebruagh+inkuW6puWkhOS6juWQjOS4gOS4que7tOW6pizku6Xkvr/nrpflh7rmnaXnmoTlgY/np7vop5LluqbmmK/mnIDlsI/nmoRcclxuICAgICAgICBpZiAoZGlzQW5nbGUgPiAxODApIHtcclxuICAgICAgICAgICAgZnJvbUFuZ2xlID0gZnJvbUFuZ2xlICsgMzYwO1xyXG4gICAgICAgICAgICBkaXNBbmdsZSA9IHRvQW5nbGUgLSBmcm9tQW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpc0FuZ2xlIDwgLTE4MCkge1xyXG4gICAgICAgICAgICBmcm9tQW5nbGUgPSBmcm9tQW5nbGUgLSAzNjA7XHJcbiAgICAgICAgICAgIGRpc0FuZ2xlID0gdG9BbmdsZSAtIGZyb21BbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5q+P5bin5pyA5aSa5Y+q5ZCR55uu5qCH6KeS5bqm5peL6L2sMTDluqZcclxuICAgICAgICBpZiAoZGlzQW5nbGUgPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlLl9seUJnLmFuZ2xlID0gdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSsxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzQW5nbGUgPCAtMTApIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZS5fbHlCZy5hbmdsZSA9IHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUtMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgPSB0b0FuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kv67mraPop5LluqblnKgtMTgwfjE4MOiMg+WbtOWGhVxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmcuYW5nbGUgPSBVdGlscy5jb3JyZWN0aW9uQW5nbGUodGhpcy5fZmlyZS5fbHlCZy5hbmdsZSk7XHJcblxyXG5cclxuICAgICAgICAvL+iwg+aVtOeCrueuoeinkuW6plxyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2x5QmFycmVsLmFuZ2xlID0gVXRpbHMudmVjdG9yc1RvRGVncmVzcyh0aGlzLl9iYXJyZWxEaXIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iiq+aUu+WHu+WIsCgpXHJcbiAgICBiZUhpdChkYW1hZ2Upe1xyXG4gICAgICAgIC8vIGNjLmxvZyhcImVuZW15IGJlaGl0XCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FtcCA9PSBcInBsYXllclwiKSB7XHJcbiAgICAgICAgICAgIGxldCBhPSAxO1xyXG4gICAgICAgICAgICAvLyBkYW1hZ2UgPSAxMDAwMDAwMDAwMDAwMDAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGE9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6K6h566X5Lyk5a6zXHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlIC0gdGhpcy5fZGVmO1xyXG4gICAgICAgIGlmIChkYW1hZ2UgPCAwKSB7IGRhbWFnZSA9IDA7fVxyXG5cclxuICAgICAgICAvL+iuoeeul+acgOaWsOihgOmHj1xyXG4gICAgICAgIHRoaXMuX2hwIC09IGRhbWFnZTtcclxuICAgICAgICBpZiAodGhpcy5faHAgPCAwKSB7IHRoaXMuX2hwID0gMDt9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/orqHnrpfooYDph4/mnaHmmL7npLrnmb7liIbnmb5cclxuICAgICAgICB0aGlzLnJlZnJlc2hIcCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6KGA6YeP562J5LqOMCzov5vlhaXmrbvkuqHpgLvovpFcclxuICAgICAgICBpZiAodGhpcy5faHAgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvRGVhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K6h566X6KGA6YeP5p2h5pi+56S655m+5YiG55m+XHJcbiAgICByZWZyZXNoSHAoKXtcclxuICAgICAgICBsZXQgcGVyY2VudCA9IHRoaXMuX2hwL3RoaXMuX21heEhwO1xyXG4gICAgICAgIHRoaXMuX2ZpcmUuX2xpZmViYXIuJFByb2dyZXNzQmFyLnByb2dyZXNzID0gcGVyY2VudDtcclxuICAgIH1cclxuXHJcbiAgICAvL+aJp+ihjOatu+S6oVxyXG4gICAgZG9EZWF0aCgpe1xyXG4gICAgICAgIGxldCBib29tID0gY2MuaW5zdGFudGlhdGUodGhpcy5ib29tUHJlZmFiKTtcclxuICAgICAgICBib29tLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgYm9vbS5wb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICBib29tLnpJbmRleCA9IDEwMDA7XHJcblxyXG4gICAgICAgIGxldCBhbmkgPSBib29tLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGFuaS5wbGF5KFwiYm9vbTJcIik7XHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnBsYXlFZmZlY3QoXCJib29tXCIpO1xyXG4gICAgICAgIFV0aWxzLnZpYnJhdGUoKTtcclxuICAgIH1cclxufVxyXG4iXX0=