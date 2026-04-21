
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/base/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd992rerf9K5alt3vTH8x5g', 'Utils');
// script/base/Utils.ts

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
exports.Utils = void 0;
var LocalizedData_1 = require("./LocalizedData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Utils_1 = Utils;
    //初始化基础的位置信息
    Utils._initBaseSize = function () {
        if (yyp.gameFrameSize == null) {
            //屏幕大小
            yyp.gameFrameSize = cc.view.getVisibleSize();
            //缩放比例
            yyp.gameFactor = yyp.gameFrameSize.width / cc.view.getVisibleSizeInPixel().width;
            // cc.log("Base wx gameFrameSize ",yyp.gameFrameSize);
            // cc.log("Base wx gameFactor ",yyp.gameFactor);
            yyp.safeTopTop = yyp.gameFrameSize.height / 2;
            yyp.safeTopBottom = yyp.gameFrameSize.height / 2 - 30;
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                // cc.log("Base wx start ");
                var menu = wx.getMenuButtonBoundingClientRect();
                // cc.log("Base wx top ",menu.top);
                // cc.log("Base wx bottom ",menu.bottom);
                var res = wx.getSystemInfoSync();
                // cc.log("Base wx ratio ",res.pixelRatio);
                var top = menu.top * res.pixelRatio * yyp.gameFactor;
                var bottom = menu.bottom * res.pixelRatio * yyp.gameFactor;
                // cc.log("Base after top ",top);
                // cc.log("Base after bottom ",bottom);
                yyp.safeTopTop = yyp.gameFrameSize.height / 2 - top;
                yyp.safeTopBottom = yyp.gameFrameSize.height / 2 - bottom;
                // cc.log("Base safeTopTop top ",yyp.safeTopTop);
                // cc.log("Base safeTopBottom bottom ",yyp.safeTopBottom);
                // cc.log("Base wx end ");
            }
        }
    };
    ///////////////  音乐 音效  ///////////////
    /**
    初始化音乐 音效
    */
    Utils.initMusicEffect = function () {
        var _musicFlg = LocalizedData_1.LocalizedData.getIntItem("_music_flg_", 1);
        var _effectFlg = LocalizedData_1.LocalizedData.getIntItem("_effect_flg_", 1);
        cc.audioEngine.setMusicVolume(_musicFlg);
        cc.audioEngine.setEffectsVolume(_effectFlg);
    };
    /**
    震动
    */
    Utils.vibrate = function () {
        var _shake_flg = LocalizedData_1.LocalizedData.getIntItem("_shake_flg_", 1);
        if (_shake_flg == 0)
            return;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.vibrateShort();
        }
    };
    ///////////////  音乐 音效  ///////////////
    ///////////////  角度 数学  ///////////////
    /**
    修正角度在-180~180范围内
    */
    Utils.correctionAngle = function (angle) {
        if (angle > 180)
            angle = angle - 360;
        else if (angle < -180)
            angle = angle + 360;
        return angle;
    };
    /**
    修正角度在0~360范围内
    */
    Utils.correctionAngle360 = function (angle) {
        if (angle < 0)
            angle = angle + 360;
        if (angle < 0)
            return Utils_1.correctionAngle360(angle);
        return angle;
    };
    /**
    向量转角度
    */
    Utils.vectorsToDegress = function (dir) {
        var radian = cc.v2(dir).signAngle(cc.v2(1, 0)); // 求方向向量与对比向量间的弧度
        var degree = -cc.misc.radiansToDegrees(radian); // 将弧度转换为角度(返回角度在-180~180范围内)
        return degree;
    };
    /**
    角度转向量
    */
    Utils.degressToVectors = function (degree) {
        var radian = cc.misc.degreesToRadians(degree);
        var dir = cc.v2(1, 0).rotate(radian);
        return dir;
    };
    /**
    获取向量旋转指定角度后的向量
    */
    Utils.vectorsRotateDegress = function (dir, rotateDegree) {
        var degree = Utils_1.vectorsToDegress(dir);
        degree = degree + rotateDegree;
        return Utils_1.degressToVectors(degree);
    };
    /**
    获取点到线段的最短距离,最近点坐标
    */
    Utils.getPointLineShortestInfo = function (P, A, B) {
        var ret = {};
        var cross = (B.x - A.x) * (P.x - A.x) + (B.y - A.y) * (P.y - A.y);
        if (cross <= 0) {
            ret.point = A;
            ret.len = P.sub(ret.point).mag();
            return ret;
        }
        var d2 = B.sub(A).magSqr();
        if (cross >= d2) {
            ret.point = B;
            ret.len = P.sub(ret.point).mag();
            return ret;
        }
        var r = cross / d2;
        var p1x = A.x + (B.x - A.x) * r;
        var p1y = A.y + (B.y - A.y) * r;
        ret.point = cc.v2(p1x, p1y);
        ret.len = P.sub(ret.point).mag();
        return ret;
    };
    /**
    点p为圆心,radius为半径,方向dir的圆,会不会经过点B
    */
    Utils.circlePassPoint = function (P, radius, dir, B) {
        var P1 = P.add(Utils_1.vectorsRotateDegress(dir, 90).mul(radius)); //左转90度的圆上的点
        var P2 = P.add(Utils_1.vectorsRotateDegress(dir, -90).mul(radius)); //右转90度的圆上的点
        var P1B = B.sub(P1).normalize();
        var P1P2 = P2.sub(P1).normalize();
        var radianP1P2 = cc.v2(P1P2).signAngle(P1B);
        var degreeP1P2 = cc.misc.radiansToDegrees(radianP1P2);
        var P2B = B.sub(P2).normalize();
        var P2P1 = P1.sub(P2).normalize();
        var radianP2P1b = cc.v2(P2B).signAngle(P2P1);
        var degreeP2P1b = cc.misc.radiansToDegrees(radianP2P1b);
        if (degreeP1P2 >= 0 && degreeP1P2 <= 90 && degreeP2P1b >= 0 && degreeP2P1b <= 90) {
            return true;
        }
        return false;
    };
    /**
    射线起始点P,方向dir,是否经过线段AB
    */
    Utils.radialPassLine = function (P, dir, A, B) {
        var radianPA = A.sub(P).normalize().signAngle(dir);
        var radianPB = B.sub(P).normalize().signAngle(dir);
        var degreePA = cc.misc.radiansToDegrees(radianPA);
        var degreePB = cc.misc.radiansToDegrees(radianPB);
        // 射线与AB重合
        if (radianPA == 0 || radianPB == 0) {
            return true;
        }
        if (radianPA * radianPB <= 0 && (Math.abs(degreePB) + Math.abs(degreePA)) <= 180) {
            return true;
        }
        return false;
    };
    /**
    点P为圆心,radius为半径,方向dir的圆,会不会经过线段AB
    */
    Utils.circlePassLine = function (P, radius, dir, A, B) {
        if (Utils_1.circlePassPoint(P, radius, dir, A) || Utils_1.circlePassPoint(P, radius, dir, B)) {
            return true;
        }
        if (Utils_1.radialPassLine(P, dir, A, B)) {
            return true;
        }
        return false;
    };
    /**
    点P,P1为圆心,radius为半径的圆,会不会经过线段AB
    */
    Utils.circleCirclePassLine = function (P, P1, radius, A, B) {
        if (Utils_1.circlePassLine(P, radius, P1.sub(P).normalize(), A, B) && Utils_1.circlePassLine(P1, radius, P.sub(P1).normalize(), A, B)) {
            return true;
        }
        return false;
    };
    /**
    线段PP1,是否经过线段AB
    */
    Utils.linePassLine = function (P, P1, A, B) {
        if (this.radialPassLine(P, P1.sub(P).normalize(), A, B) && this.radialPassLine(P1, P.sub(P1).normalize(), A, B)) {
            return true;
        }
        return false;
    };
    ///////////////  角度 数学  ///////////////
    ///////////////  常用函数  ///////////////
    /**
    创建一个指定颜色的layout
    */
    Utils.createLayout = function (width, height, color, parent) {
        if (parent === void 0) { parent = null; }
        width = width || 20;
        height = height || 20;
        color = color || cc.Color.WHITE;
        var node = new cc.Node();
        node.color = color;
        if (parent) {
            node.parent = parent;
        }
        cc.loader.loadRes("default/panel", cc.SpriteFrame, function (err, spriteFrame) {
            //加载失败,打印日志
            if (err) {
                cc.log('createLayout failed: ' + err);
                return;
            }
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
            sprite.type = cc.Sprite.Type.SLICED;
            node.width = width;
            node.height = height;
        });
        return node;
    };
    /**
    获取当前场景的ui根节点
    */
    Utils.getCurrentSceneCanvas = function () {
        var scene = cc.director.getScene();
        var canvas = cc.find("Canvas", scene);
        return canvas;
    };
    /**
    添加到当前场景的ui根节点
    */
    Utils.addtoCurrentScene = function (node, pos) {
        if (pos === void 0) { pos = null; }
        var canvas = Utils_1.getCurrentSceneCanvas();
        canvas.addChild(node);
        if (pos != null) {
            node.setPosition(pos);
        }
        else {
            node.setPosition(new cc.Vec2(0, 0));
        }
        // cc.log(node.x,node.y);
    };
    /**
    显示弹窗
    */
    Utils.showDialogs = function (prefab) {
        var dialogs = cc.instantiate(prefab);
        dialogs.zIndex = 1000;
        Utils_1.addtoCurrentScene(dialogs);
        dialogs.script.show();
        return dialogs;
    };
    /**
    列表中是否存在item
    */
    Utils.itemInList = function (item, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == item) {
                return true;
            }
        }
        return false;
    };
    /**
    获取碰撞框-所放值
    */
    Utils.getWorldBoundingBox = function (node, scale) {
        if (scale === void 0) { scale = 1; }
        var ret = node.getBoundingBoxToWorld();
        if (scale != 1) {
            ret.x = ret.x + ret.width * (1 - scale) / 2;
            ret.y = ret.y + ret.height * (1 - scale) / 2;
            ret.width = ret.width * scale;
            ret.height = ret.height * scale;
        }
        return ret;
    };
    /**
    把数字转为千进位
    */
    Utils.transformNumber = function (num) {
        if (num >= 1000) {
            var qian = Math.floor(num / 1000);
            num = (num % 1000);
            var bai = Math.floor(num / 100);
            var ret = qian + "." + bai + "K";
            return ret;
        }
        return num;
    };
    /**
    获取世界坐标
    */
    Utils.getWorldPosition = function (node) {
        return node.parent.convertToWorldSpaceAR(node.position);
    };
    /**
    产生 a-b(不包含) 之间的随机整数
    */
    Utils.randomInt = function (a, b) {
        return Math.floor(Math.random() * (b - a)) + a;
    };
    /**
    产生 a[0]-a[1](不包含) 之间的随机整数
    */
    Utils.randomIntEx = function (a) {
        return Utils_1.randomInt(a[0], a[1]);
    };
    /**
    产生 a-b(不包含) 之间的随机浮点数
    decimals:小数保留位置
    */
    Utils.randomFloat = function (a, b, decimals) {
        if (decimals === void 0) { decimals = 3; }
        var multiplea = Math.pow(10, decimals);
        a = Math.floor(a * multiplea);
        b = Math.floor(b * multiplea);
        var ret = Math.floor(Math.random() * (b - a)) + a;
        return ret / multiplea;
    };
    /**
    产生 a[0]-a[1](不包含) 之间的随机浮点数
    decimals:小数保留位置
    */
    Utils.randomFloatEx = function (a, decimals) {
        if (decimals === void 0) { decimals = 3; }
        return Utils_1.randomFloat(a[0], a[1], decimals);
    };
    /**
    Q弹效果
    */
    Utils.doQAction = function (node) {
        node.runAction(cc.sequence(cc.delayTime(1), cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1), cc.scaleTo(0.05, 1.05, 1.05), cc.scaleTo(0.02, 1, 1)).repeatForever());
    };
    var Utils_1;
    Utils = Utils_1 = __decorate([
        ccclass
    ], Utils);
    return Utils;
}(cc.Component));
exports.Utils = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQThDO0FBRXhDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJCLHlCQUFZO0lBQXZDOztJQXlZQSxDQUFDO2NBellZLEtBQUs7SUFFZCxZQUFZO0lBQ0wsbUJBQWEsR0FBcEI7UUFDSSxJQUFJLEdBQUcsQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQzNCLE1BQU07WUFDTixHQUFHLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFN0MsTUFBTTtZQUNOLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUUvRSxzREFBc0Q7WUFDdEQsZ0RBQWdEO1lBRWhELEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1lBQzVDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNwRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFDO2dCQUN2Qyw0QkFBNEI7Z0JBRTlCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUM5QyxtQ0FBbUM7Z0JBQ25DLHlDQUF5QztnQkFDM0MsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQy9CLDJDQUEyQztnQkFFM0MsSUFB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Q2pCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDZixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQ3ZCLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDbkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUMxQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQ3ZCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDOztJQXZZUSxLQUFLO1FBRGpCLE9BQU87T0FDSyxLQUFLLENBeVlqQjtJQUFELFlBQUM7Q0F6WUQsQUF5WUMsQ0F6WTBCLEVBQUUsQ0FBQyxTQUFTLEdBeVl0QztBQXpZWSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge0xvY2FsaXplZERhdGF9IGZyb20gXCIuL0xvY2FsaXplZERhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFV0aWxzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL+WIneWni+WMluWfuuehgOeahOS9jee9ruS/oeaBr1xyXG4gICAgc3RhdGljIF9pbml0QmFzZVNpemUgKCkge1xyXG4gICAgICAgIGlmICh5eXAuZ2FtZUZyYW1lU2l6ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8v5bGP5bmV5aSn5bCPXHJcbiAgICAgICAgICAgIHl5cC5nYW1lRnJhbWVTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8v57yp5pS+5q+U5L6LXHJcbiAgICAgICAgICAgIHl5cC5nYW1lRmFjdG9yID0geXlwLmdhbWVGcmFtZVNpemUud2lkdGgvY2Mudmlldy5nZXRWaXNpYmxlU2l6ZUluUGl4ZWwoKS53aWR0aDtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IGdhbWVGcmFtZVNpemUgXCIseXlwLmdhbWVGcmFtZVNpemUpO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IGdhbWVGYWN0b3IgXCIseXlwLmdhbWVGYWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgeXlwLnNhZmVUb3BUb3AgPSB5eXAuZ2FtZUZyYW1lU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICAgICAgeXlwLnNhZmVUb3BCb3R0b20gPSB5eXAuZ2FtZUZyYW1lU2l6ZS5oZWlnaHQvMiAtIDMwO1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSB3eCBzdGFydCBcIik7XHJcbiAgICBcclxuICAgICAgICAgICAg44CA44CAbGV0IG1lbnUgPSB3eC5nZXRNZW51QnV0dG9uQm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IHRvcCBcIixtZW51LnRvcCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IGJvdHRvbSBcIixtZW51LmJvdHRvbSk7XHJcbiAgICAgICAgICAgIOOAgOOAgGxldCByZXMgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSB3eCByYXRpbyBcIixyZXMucGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBtZW51LnRvcCAqIHJlcy5waXhlbFJhdGlvICogeXlwLmdhbWVGYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm90dG9tID0gbWVudS5ib3R0b20gKiByZXMucGl4ZWxSYXRpbyAqIHl5cC5nYW1lRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSBhZnRlciB0b3AgXCIsdG9wKTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIkJhc2UgYWZ0ZXIgYm90dG9tIFwiLGJvdHRvbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHl5cC5zYWZlVG9wVG9wID0geXlwLmdhbWVGcmFtZVNpemUuaGVpZ2h0LzIgLSB0b3A7XHJcbiAgICAgICAgICAgICAgICB5eXAuc2FmZVRvcEJvdHRvbSA9IHl5cC5nYW1lRnJhbWVTaXplLmhlaWdodC8yIC0gYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSBzYWZlVG9wVG9wIHRvcCBcIix5eXAuc2FmZVRvcFRvcCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHNhZmVUb3BCb3R0b20gYm90dG9tIFwiLHl5cC5zYWZlVG9wQm90dG9tKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSB3eCBlbmQgXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8gIOmfs+S5kCDpn7PmlYggIC8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqXHJcbiAgICDliJ3lp4vljJbpn7PkuZAg6Z+z5pWIXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGluaXRNdXNpY0VmZmVjdCAoKSB7XHJcbiAgICAgICAgbGV0IF9tdXNpY0ZsZyA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9tdXNpY19mbGdfXCIsMSk7XHJcbiAgICAgICAgbGV0IF9lZmZlY3RGbGcgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfZWZmZWN0X2ZsZ19cIiwxKTtcclxuXHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoX211c2ljRmxnKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKF9lZmZlY3RGbGcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg6ZyH5YqoXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHZpYnJhdGUoKXtcclxuICAgICAgICBsZXQgX3NoYWtlX2ZsZyA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9zaGFrZV9mbGdfXCIsMSk7XHJcbiAgICAgICAgaWYgKF9zaGFrZV9mbGcgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICB3eC52aWJyYXRlU2hvcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vICDpn7PkuZAg6Z+z5pWIICAvLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8gIOinkuW6piDmlbDlraYgIC8vLy8vLy8vLy8vLy8vL1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOS/ruato+inkuW6puWcqC0xODB+MTgw6IyD5Zu05YaFXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNvcnJlY3Rpb25BbmdsZShhbmdsZSl7XHJcbiAgICAgICAgaWYgKGFuZ2xlID4gMTgwKVxyXG4gICAgICAgICAgICBhbmdsZSA9IGFuZ2xlIC0gMzYwO1xyXG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlIDwgLTE4MClcclxuICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSArIDM2MDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5L+u5q2j6KeS5bqm5ZyoMH4zNjDojIPlm7TlhoVcclxuICAgICovXHJcbiAgICBzdGF0aWMgY29ycmVjdGlvbkFuZ2xlMzYwKGFuZ2xlKXtcclxuICAgICAgICBpZiAoYW5nbGUgPCAwKVxyXG4gICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgMzYwO1xyXG5cclxuICAgICAgICBpZiAoYW5nbGUgPCAwKVxyXG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuY29ycmVjdGlvbkFuZ2xlMzYwKGFuZ2xlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5ZCR6YeP6L2s6KeS5bqmXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHZlY3RvcnNUb0RlZ3Jlc3MoZGlyKSB7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IGNjLnYyKGRpcikuc2lnbkFuZ2xlKGNjLnYyKDEsIDApKTsgICAgLy8g5rGC5pa55ZCR5ZCR6YeP5LiO5a+55q+U5ZCR6YeP6Ze055qE5byn5bqmXHJcbiAgICAgICAgbGV0IGRlZ3JlZSA9IC1jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuKTsgICAgLy8g5bCG5byn5bqm6L2s5o2i5Li66KeS5bqmKOi/lOWbnuinkuW6puWcqC0xODB+MTgw6IyD5Zu05YaFKVxyXG5cclxuICAgICAgICByZXR1cm4gZGVncmVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOinkuW6pui9rOWQkemHj1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBkZWdyZXNzVG9WZWN0b3JzKGRlZ3JlZSkge1xyXG4gICAgICAgIGxldCByYWRpYW4gPSBjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlKTtcclxuICAgICAgICBsZXQgZGlyID0gY2MudjIoMSwgMCkucm90YXRlKHJhZGlhbik7XHJcbiAgICAgICAgcmV0dXJuIGRpcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOiOt+WPluWQkemHj+aXi+i9rOaMh+WumuinkuW6puWQjueahOWQkemHj1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyB2ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsIHJvdGF0ZURlZ3JlZSkge1xyXG4gICAgICAgIGxldCBkZWdyZWUgPSBVdGlscy52ZWN0b3JzVG9EZWdyZXNzKGRpcik7XHJcbiAgICAgICAgZGVncmVlID0gZGVncmVlICsgcm90YXRlRGVncmVlO1xyXG4gICAgICAgIHJldHVybiBVdGlscy5kZWdyZXNzVG9WZWN0b3JzKGRlZ3JlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDojrflj5bngrnliLDnur/mrrXnmoTmnIDnn63ot53nprss5pyA6L+R54K55Z2Q5qCHXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldFBvaW50TGluZVNob3J0ZXN0SW5mbyhQLCBBLCBCKXtcclxuICAgICAgICBsZXQgcmV0OmFueSA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgY3Jvc3MgPSAoQi54IC0gQS54KSAqIChQLnggLSBBLngpICsgKEIueSAtIEEueSkgKiAoUC55IC0gQS55KTtcclxuICAgICAgICBpZiAoY3Jvc3MgPD0gMCkge1xyXG4gICAgICAgICAgICByZXQucG9pbnQgPSBBO1xyXG4gICAgICAgICAgICByZXQubGVuID0gUC5zdWIocmV0LnBvaW50KS5tYWcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkMiA9IEIuc3ViKEEpLm1hZ1NxcigpO1xyXG4gICAgICAgIGlmIChjcm9zcyA+PSBkMikgIHtcclxuICAgICAgICAgICAgcmV0LnBvaW50ID0gQjtcclxuICAgICAgICAgICAgcmV0LmxlbiA9IFAuc3ViKHJldC5wb2ludCkubWFnKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgciA9IGNyb3NzIC8gZDI7XHJcbiAgICAgICAgbGV0IHAxeCA9IEEueCArIChCLnggLSBBLngpICogcjtcclxuICAgICAgICBsZXQgcDF5ID0gQS55ICsgKEIueSAtIEEueSkgKiByO1xyXG4gICAgICAgIHJldC5wb2ludCA9IGNjLnYyKHAxeCxwMXkpO1xyXG4gICAgICAgIHJldC5sZW4gPSBQLnN1YihyZXQucG9pbnQpLm1hZygpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOeCuXDkuLrlnIblv4MscmFkaXVz5Li65Y2K5b6ELOaWueWQkWRpcueahOWchizkvJrkuI3kvJrnu4/ov4fngrlCXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNpcmNsZVBhc3NQb2ludChQLHJhZGl1cyxkaXIsQil7XHJcbiAgICAgICAgbGV0IFAxID0gUC5hZGQoVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLCA5MCkubXVsKHJhZGl1cykpOyAgICAvL+W3pui9rDkw5bqm55qE5ZyG5LiK55qE54K5XHJcbiAgICAgICAgbGV0IFAyID0gUC5hZGQoVXRpbHMudmVjdG9yc1JvdGF0ZURlZ3Jlc3MoZGlyLCAtOTApLm11bChyYWRpdXMpKTsgICAvL+WPs+i9rDkw5bqm55qE5ZyG5LiK55qE54K5XHJcblxyXG4gICAgICAgIGxldCBQMUIgPSBCLnN1YihQMSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IFAxUDIgPSBQMi5zdWIoUDEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCByYWRpYW5QMVAyID0gY2MudjIoUDFQMikuc2lnbkFuZ2xlKFAxQik7XHJcbiAgICAgICAgbGV0IGRlZ3JlZVAxUDIgPSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuUDFQMik7XHJcblxyXG4gICAgICAgIGxldCBQMkIgPSBCLnN1YihQMikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IFAyUDEgPSBQMS5zdWIoUDIpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGxldCByYWRpYW5QMlAxYiA9IGNjLnYyKFAyQikuc2lnbkFuZ2xlKFAyUDEpO1xyXG4gICAgICAgIGxldCBkZWdyZWVQMlAxYiA9IGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5QMlAxYik7XHJcblxyXG4gICAgICAgIGlmIChkZWdyZWVQMVAyID49MCAmJiBkZWdyZWVQMVAyIDw9IDkwICYmIGRlZ3JlZVAyUDFiID49MCAmJiBkZWdyZWVQMlAxYiA8PSA5MCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5bCE57q/6LW35aeL54K5UCzmlrnlkJFkaXIs5piv5ZCm57uP6L+H57q/5q61QUJcclxuICAgICovXHJcbiAgICBzdGF0aWMgcmFkaWFsUGFzc0xpbmUoUCxkaXIsQSxCKXtcclxuICAgICAgICBsZXQgcmFkaWFuUEEgPSBBLnN1YihQKS5ub3JtYWxpemUoKS5zaWduQW5nbGUoZGlyKTtcclxuICAgICAgICBsZXQgcmFkaWFuUEIgPSBCLnN1YihQKS5ub3JtYWxpemUoKS5zaWduQW5nbGUoZGlyKTtcclxuXHJcbiAgICAgICAgbGV0IGRlZ3JlZVBBID0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhblBBKTtcclxuICAgICAgICBsZXQgZGVncmVlUEIgPSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuUEIpO1xyXG5cclxuICAgICAgICAvLyDlsITnur/kuI5BQumHjeWQiFxyXG4gICAgICAgIGlmIChyYWRpYW5QQSA9PSAwIHx8IHJhZGlhblBCID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyYWRpYW5QQSpyYWRpYW5QQjw9MCAmJiAoTWF0aC5hYnMoZGVncmVlUEIpICsgTWF0aC5hYnMoZGVncmVlUEEpKSA8PSAxODApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDngrlQ5Li65ZyG5b+DLHJhZGl1c+S4uuWNiuW+hCzmlrnlkJFkaXLnmoTlnIYs5Lya5LiN5Lya57uP6L+H57q/5q61QUJcclxuICAgICovXHJcbiAgICBzdGF0aWMgY2lyY2xlUGFzc0xpbmUoUCxyYWRpdXMsZGlyLEEsQil7XHJcbiAgICAgICAgaWYgKFV0aWxzLmNpcmNsZVBhc3NQb2ludChQLHJhZGl1cyxkaXIsQSkgfHwgVXRpbHMuY2lyY2xlUGFzc1BvaW50KFAscmFkaXVzLGRpcixCKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKFV0aWxzLnJhZGlhbFBhc3NMaW5lKFAsZGlyLEEsQikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAg54K5UCxQMeS4uuWchuW/gyxyYWRpdXPkuLrljYrlvoTnmoTlnIYs5Lya5LiN5Lya57uP6L+H57q/5q61QUJcclxuICAgICovXHJcbiAgICBzdGF0aWMgY2lyY2xlQ2lyY2xlUGFzc0xpbmUoUCxQMSxyYWRpdXMsQSxCKXtcclxuICAgICAgICBpZiAoVXRpbHMuY2lyY2xlUGFzc0xpbmUoUCxyYWRpdXMsUDEuc3ViKFApLm5vcm1hbGl6ZSgpLEEsQikgJiYgVXRpbHMuY2lyY2xlUGFzc0xpbmUoUDEscmFkaXVzLFAuc3ViKFAxKS5ub3JtYWxpemUoKSxBLEIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOe6v+autVBQMSzmmK/lkKbnu4/ov4fnur/mrrVBQlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBsaW5lUGFzc0xpbmUoUCxQMSxBLEIpe1xyXG4gICAgICAgIGlmICh0aGlzLnJhZGlhbFBhc3NMaW5lKFAsUDEuc3ViKFApLm5vcm1hbGl6ZSgpLEEsQikgJiYgdGhpcy5yYWRpYWxQYXNzTGluZShQMSxQLnN1YihQMSkubm9ybWFsaXplKCksQSxCKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vICDop5LluqYg5pWw5a2mICAvLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBcclxuICAgIC8vLy8vLy8vLy8vLy8vLyAg5bi455So5Ye95pWwICAvLy8vLy8vLy8vLy8vLy9cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICDliJvlu7rkuIDkuKrmjIflrprpopzoibLnmoRsYXlvdXRcclxuICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlTGF5b3V0KHdpZHRoLGhlaWdodCxjb2xvcixwYXJlbnQ9bnVsbCkge1xyXG4gICAgICAgIHdpZHRoID0gd2lkdGggfHwgMjA7XHJcbiAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDIwO1xyXG4gICAgICAgIGNvbG9yID0gY29sb3IgfHwgY2MuQ29sb3IuV0hJVEU7XHJcblxyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBub2RlLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgaWYgKHBhcmVudCkgeyBub2RlLnBhcmVudCA9IHBhcmVudDsgfVxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwiZGVmYXVsdC9wYW5lbFwiLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgLy/liqDovb3lpLHotKUs5omT5Y2w5pel5b+XXHJcbiAgICAgICAgICAgIGlmKGVycikge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKCdjcmVhdGVMYXlvdXQgZmFpbGVkOiAnICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgc3ByaXRlLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRUQ7XHJcbiAgICAgICAgICAgIG5vZGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg6I635Y+W5b2T5YmN5Zy65pmv55qEdWnmoLnoioLngrlcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0Q3VycmVudFNjZW5lQ2FudmFzKCl7XHJcbiAgICAgICAgbGV0IHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICBsZXQgY2FudmFzID0gY2MuZmluZChcIkNhbnZhc1wiLHNjZW5lKTtcclxuICAgICAgICByZXR1cm4gY2FudmFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOa3u+WKoOWIsOW9k+WJjeWcuuaZr+eahHVp5qC56IqC54K5XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGFkZHRvQ3VycmVudFNjZW5lKG5vZGUsIHBvcyA9IG51bGwpe1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBVdGlscy5nZXRDdXJyZW50U2NlbmVDYW52YXMoKTtcclxuICAgICAgICBjYW52YXMuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgaWYgKHBvcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihuZXcgY2MuVmVjMigwLDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2MubG9nKG5vZGUueCxub2RlLnkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOaYvuekuuW8ueeql1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBzaG93RGlhbG9ncyhwcmVmYWIpe1xyXG4gICAgICAgIGxldCBkaWFsb2dzID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICBkaWFsb2dzLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgVXRpbHMuYWRkdG9DdXJyZW50U2NlbmUoZGlhbG9ncyk7XHJcbiAgICAgICAgZGlhbG9ncy5zY3JpcHQuc2hvdygpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlhbG9ncztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICDliJfooajkuK3mmK/lkKblrZjlnKhpdGVtXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGl0ZW1Jbkxpc3QoaXRlbSxsaXN0KXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbaV0gPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg6I635Y+W56Kw5pKe5qGGLeaJgOaUvuWAvFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBnZXRXb3JsZEJvdW5kaW5nQm94KG5vZGUsc2NhbGU9MSkge1xyXG4gICAgICAgIGxldCByZXQgPSBub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpO1xyXG4gICAgICAgIGlmIChzY2FsZSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHJldC54ID0gcmV0LnggKyByZXQud2lkdGgqKDEtc2NhbGUpLzI7XHJcbiAgICAgICAgICAgIHJldC55ID0gcmV0LnkgKyByZXQuaGVpZ2h0KigxLXNjYWxlKS8yO1xyXG4gICAgICAgICAgICByZXQud2lkdGggPSByZXQud2lkdGggKiBzY2FsZTtcclxuICAgICAgICAgICAgcmV0LmhlaWdodCA9IHJldC5oZWlnaHQgKiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICDmiormlbDlrZfovazkuLrljYPov5vkvY1cclxuICAgICovXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtTnVtYmVyKG51bSl7XHJcbiAgICAgICAgaWYgKG51bSA+PSAxMDAwKSB7XHJcbiAgICAgICAgICAgIGxldCBxaWFuID0gTWF0aC5mbG9vcihudW0vMTAwMCk7XHJcbiAgICAgICAgICAgIG51bSA9IChudW0lMTAwMCk7XHJcbiAgICAgICAgICAgIGxldCBiYWkgPSBNYXRoLmZsb29yKG51bS8xMDApO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJldCA9IHFpYW4gKyBcIi5cIiArIGJhaSArIFwiS1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg6I635Y+W5LiW55WM5Z2Q5qCHXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldFdvcmxkUG9zaXRpb24obm9kZSl7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihub2RlLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOS6p+eUnyBhLWIo5LiN5YyF5ZCrKSDkuYvpl7TnmoTpmo/mnLrmlbTmlbBcclxuICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50KGEsYil7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooYi1hKSkgKyBhO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICDkuqfnlJ8gYVswXS1hWzFdKOS4jeWMheWQqykg5LmL6Ze055qE6ZqP5py65pW05pWwXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHJhbmRvbUludEV4KGEpe1xyXG4gICAgICAgIHJldHVybiBVdGlscy5yYW5kb21JbnQoYVswXSxhWzFdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOS6p+eUnyBhLWIo5LiN5YyF5ZCrKSDkuYvpl7TnmoTpmo/mnLrmta7ngrnmlbBcclxuICAgIGRlY2ltYWxzOuWwj+aVsOS/neeVmeS9jee9rlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyByYW5kb21GbG9hdChhLGIsZGVjaW1hbHM9Myl7XHJcbiAgICAgICAgbGV0IG11bHRpcGxlYSA9IE1hdGgucG93KDEwLGRlY2ltYWxzKTtcclxuICAgICAgICBhID0gTWF0aC5mbG9vcihhKm11bHRpcGxlYSk7XHJcbiAgICAgICAgYiA9IE1hdGguZmxvb3IoYiptdWx0aXBsZWEpO1xyXG4gICAgICAgIGxldCByZXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGItYSkpICsgYTtcclxuICAgICAgICByZXR1cm4gcmV0L211bHRpcGxlYTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOS6p+eUnyBhWzBdLWFbMV0o5LiN5YyF5ZCrKSDkuYvpl7TnmoTpmo/mnLrmta7ngrnmlbBcclxuICAgIGRlY2ltYWxzOuWwj+aVsOS/neeVmeS9jee9rlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyByYW5kb21GbG9hdEV4KGEsZGVjaW1hbHM9Myl7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLnJhbmRvbUZsb2F0KGFbMF0sYVsxXSxkZWNpbWFscyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgUeW8ueaViOaenFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBkb1FBY3Rpb24obm9kZSl7XHJcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxKSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsMS4yLDEuMiksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLDEsMSksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wNSwxLjA1LDEuMDUpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMDIsMSwxKVxyXG4gICAgICAgICkucmVwZWF0Rm9yZXZlcigpKTtcclxuICAgIH1cclxuICAgIC8vLy8vLy8vLy8vLy8vLyAg5bi455So5Ye95pWwICAvLy8vLy8vLy8vLy8vLy9cclxufVxyXG4iXX0=