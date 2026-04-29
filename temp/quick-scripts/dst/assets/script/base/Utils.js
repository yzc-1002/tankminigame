
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
var MusicManager_1 = require("./MusicManager");
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
        MusicManager_1.MusicManager.refreshMusicVolume();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXNlXFxVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQThDO0FBQzlDLCtDQUE4QztBQUV4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQix5QkFBWTtJQUF2Qzs7SUF5WUEsQ0FBQztjQXpZWSxLQUFLO0lBRWQsWUFBWTtJQUNMLG1CQUFhLEdBQXBCO1FBQ0ksSUFBSSxHQUFHLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtZQUMzQixNQUFNO1lBQ04sR0FBRyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRTdDLE1BQU07WUFDTixHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFFL0Usc0RBQXNEO1lBQ3RELGdEQUFnRDtZQUVoRCxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUM1QyxHQUFHLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDcEQsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQztnQkFDdkMsNEJBQTRCO2dCQUU5QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsK0JBQStCLEVBQUUsQ0FBQztnQkFDOUMsbUNBQW1DO2dCQUNuQyx5Q0FBeUM7Z0JBQzNDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUMvQiwyQ0FB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SUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUN0QixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFDdkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUNuQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQzFCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FDdkIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7O0lBdllRLEtBQUs7UUFEakIsT0FBTztPQUNLLEtBQUssQ0F5WWpCO0lBQUQsWUFBQztDQXpZRCxBQXlZQyxDQXpZMEIsRUFBRSxDQUFDLFNBQVMsR0F5WXRDO0FBellZLHNCQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7TG9jYWxpemVkRGF0YX0gZnJvbSBcIi4vTG9jYWxpemVkRGF0YVwiO1xyXG5pbXBvcnQgeyBNdXNpY01hbmFnZXIgfSBmcm9tIFwiLi9NdXNpY01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFV0aWxzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL+WIneWni+WMluWfuuehgOeahOS9jee9ruS/oeaBr1xyXG4gICAgc3RhdGljIF9pbml0QmFzZVNpemUgKCkge1xyXG4gICAgICAgIGlmICh5eXAuZ2FtZUZyYW1lU2l6ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8v5bGP5bmV5aSn5bCPXHJcbiAgICAgICAgICAgIHl5cC5nYW1lRnJhbWVTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8v57yp5pS+5q+U5L6LXHJcbiAgICAgICAgICAgIHl5cC5nYW1lRmFjdG9yID0geXlwLmdhbWVGcmFtZVNpemUud2lkdGgvY2Mudmlldy5nZXRWaXNpYmxlU2l6ZUluUGl4ZWwoKS53aWR0aDtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IGdhbWVGcmFtZVNpemUgXCIseXlwLmdhbWVGcmFtZVNpemUpO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IGdhbWVGYWN0b3IgXCIseXlwLmdhbWVGYWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgeXlwLnNhZmVUb3BUb3AgPSB5eXAuZ2FtZUZyYW1lU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICAgICAgeXlwLnNhZmVUb3BCb3R0b20gPSB5eXAuZ2FtZUZyYW1lU2l6ZS5oZWlnaHQvMiAtIDMwO1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSB3eCBzdGFydCBcIik7XHJcbiAgICBcclxuICAgICAgICAgICAg44CA44CAbGV0IG1lbnUgPSB3eC5nZXRNZW51QnV0dG9uQm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IHRvcCBcIixtZW51LnRvcCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHd4IGJvdHRvbSBcIixtZW51LmJvdHRvbSk7XHJcbiAgICAgICAgICAgIOOAgOOAgGxldCByZXMgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSB3eCByYXRpbyBcIixyZXMucGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBtZW51LnRvcCAqIHJlcy5waXhlbFJhdGlvICogeXlwLmdhbWVGYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm90dG9tID0gbWVudS5ib3R0b20gKiByZXMucGl4ZWxSYXRpbyAqIHl5cC5nYW1lRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSBhZnRlciB0b3AgXCIsdG9wKTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIkJhc2UgYWZ0ZXIgYm90dG9tIFwiLGJvdHRvbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHl5cC5zYWZlVG9wVG9wID0geXlwLmdhbWVGcmFtZVNpemUuaGVpZ2h0LzIgLSB0b3A7XHJcbiAgICAgICAgICAgICAgICB5eXAuc2FmZVRvcEJvdHRvbSA9IHl5cC5nYW1lRnJhbWVTaXplLmhlaWdodC8yIC0gYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSBzYWZlVG9wVG9wIHRvcCBcIix5eXAuc2FmZVRvcFRvcCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJCYXNlIHNhZmVUb3BCb3R0b20gYm90dG9tIFwiLHl5cC5zYWZlVG9wQm90dG9tKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQmFzZSB3eCBlbmQgXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8gIOmfs+S5kCDpn7PmlYggIC8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqXHJcbiAgICDliJ3lp4vljJbpn7PkuZAg6Z+z5pWIXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGluaXRNdXNpY0VmZmVjdCAoKSB7XHJcbiAgICAgICAgbGV0IF9tdXNpY0ZsZyA9IExvY2FsaXplZERhdGEuZ2V0SW50SXRlbShcIl9tdXNpY19mbGdfXCIsMSk7XHJcbiAgICAgICAgbGV0IF9lZmZlY3RGbGcgPSBMb2NhbGl6ZWREYXRhLmdldEludEl0ZW0oXCJfZWZmZWN0X2ZsZ19cIiwxKTtcclxuXHJcbiAgICAgICAgTXVzaWNNYW5hZ2VyLnJlZnJlc2hNdXNpY1ZvbHVtZSgpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUoX2VmZmVjdEZsZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDpnIfliqhcclxuICAgICovXHJcbiAgICBzdGF0aWMgdmlicmF0ZSgpe1xyXG4gICAgICAgIGxldCBfc2hha2VfZmxnID0gTG9jYWxpemVkRGF0YS5nZXRJbnRJdGVtKFwiX3NoYWtlX2ZsZ19cIiwxKTtcclxuICAgICAgICBpZiAoX3NoYWtlX2ZsZyA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgIHd4LnZpYnJhdGVTaG9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8gIOmfs+S5kCDpn7PmlYggIC8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLyAg6KeS5bqmIOaVsOWtpiAgLy8vLy8vLy8vLy8vLy8vXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAg5L+u5q2j6KeS5bqm5ZyoLTE4MH4xODDojIPlm7TlhoVcclxuICAgICovXHJcbiAgICBzdGF0aWMgY29ycmVjdGlvbkFuZ2xlKGFuZ2xlKXtcclxuICAgICAgICBpZiAoYW5nbGUgPiAxODApXHJcbiAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgLSAzNjA7XHJcbiAgICAgICAgZWxzZSBpZiAoYW5nbGUgPCAtMTgwKVxyXG4gICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgMzYwO1xyXG5cclxuICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDkv67mraPop5LluqblnKgwfjM2MOiMg+WbtOWGhVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBjb3JyZWN0aW9uQW5nbGUzNjAoYW5nbGUpe1xyXG4gICAgICAgIGlmIChhbmdsZSA8IDApXHJcbiAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgKyAzNjA7XHJcblxyXG4gICAgICAgIGlmIChhbmdsZSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5jb3JyZWN0aW9uQW5nbGUzNjAoYW5nbGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDlkJHph4/ovazop5LluqZcclxuICAgICovXHJcbiAgICBzdGF0aWMgdmVjdG9yc1RvRGVncmVzcyhkaXIpIHtcclxuICAgICAgICBsZXQgcmFkaWFuID0gY2MudjIoZGlyKS5zaWduQW5nbGUoY2MudjIoMSwgMCkpOyAgICAvLyDmsYLmlrnlkJHlkJHph4/kuI7lr7nmr5TlkJHph4/pl7TnmoTlvKfluqZcclxuICAgICAgICBsZXQgZGVncmVlID0gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW4pOyAgICAvLyDlsIblvKfluqbovazmjaLkuLrop5LluqYo6L+U5Zue6KeS5bqm5ZyoLTE4MH4xODDojIPlm7TlhoUpXHJcblxyXG4gICAgICAgIHJldHVybiBkZWdyZWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAg6KeS5bqm6L2s5ZCR6YePXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGRlZ3Jlc3NUb1ZlY3RvcnMoZGVncmVlKSB7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyhkZWdyZWUpO1xyXG4gICAgICAgIGxldCBkaXIgPSBjYy52MigxLCAwKS5yb3RhdGUocmFkaWFuKTtcclxuICAgICAgICByZXR1cm4gZGlyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg6I635Y+W5ZCR6YeP5peL6L2s5oyH5a6a6KeS5bqm5ZCO55qE5ZCR6YePXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHZlY3RvcnNSb3RhdGVEZWdyZXNzKGRpciwgcm90YXRlRGVncmVlKSB7XHJcbiAgICAgICAgbGV0IGRlZ3JlZSA9IFV0aWxzLnZlY3RvcnNUb0RlZ3Jlc3MoZGlyKTtcclxuICAgICAgICBkZWdyZWUgPSBkZWdyZWUgKyByb3RhdGVEZWdyZWU7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLmRlZ3Jlc3NUb1ZlY3RvcnMoZGVncmVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOiOt+WPlueCueWIsOe6v+auteeahOacgOefrei3neemuyzmnIDov5HngrnlnZDmoIdcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0UG9pbnRMaW5lU2hvcnRlc3RJbmZvKFAsIEEsIEIpe1xyXG4gICAgICAgIGxldCByZXQ6YW55ID0ge307XHJcblxyXG4gICAgICAgIGxldCBjcm9zcyA9IChCLnggLSBBLngpICogKFAueCAtIEEueCkgKyAoQi55IC0gQS55KSAqIChQLnkgLSBBLnkpO1xyXG4gICAgICAgIGlmIChjcm9zcyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldC5wb2ludCA9IEE7XHJcbiAgICAgICAgICAgIHJldC5sZW4gPSBQLnN1YihyZXQucG9pbnQpLm1hZygpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGQyID0gQi5zdWIoQSkubWFnU3FyKCk7XHJcbiAgICAgICAgaWYgKGNyb3NzID49IGQyKSAge1xyXG4gICAgICAgICAgICByZXQucG9pbnQgPSBCO1xyXG4gICAgICAgICAgICByZXQubGVuID0gUC5zdWIocmV0LnBvaW50KS5tYWcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByID0gY3Jvc3MgLyBkMjtcclxuICAgICAgICBsZXQgcDF4ID0gQS54ICsgKEIueCAtIEEueCkgKiByO1xyXG4gICAgICAgIGxldCBwMXkgPSBBLnkgKyAoQi55IC0gQS55KSAqIHI7XHJcbiAgICAgICAgcmV0LnBvaW50ID0gY2MudjIocDF4LHAxeSk7XHJcbiAgICAgICAgcmV0LmxlbiA9IFAuc3ViKHJldC5wb2ludCkubWFnKCk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAg54K5cOS4uuWchuW/gyxyYWRpdXPkuLrljYrlvoQs5pa55ZCRZGly55qE5ZyGLOS8muS4jeS8mue7j+i/h+eCuUJcclxuICAgICovXHJcbiAgICBzdGF0aWMgY2lyY2xlUGFzc1BvaW50KFAscmFkaXVzLGRpcixCKXtcclxuICAgICAgICBsZXQgUDEgPSBQLmFkZChVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsIDkwKS5tdWwocmFkaXVzKSk7ICAgIC8v5bem6L2sOTDluqbnmoTlnIbkuIrnmoTngrlcclxuICAgICAgICBsZXQgUDIgPSBQLmFkZChVdGlscy52ZWN0b3JzUm90YXRlRGVncmVzcyhkaXIsIC05MCkubXVsKHJhZGl1cykpOyAgIC8v5Y+z6L2sOTDluqbnmoTlnIbkuIrnmoTngrlcclxuXHJcbiAgICAgICAgbGV0IFAxQiA9IEIuc3ViKFAxKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgUDFQMiA9IFAyLnN1YihQMSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IHJhZGlhblAxUDIgPSBjYy52MihQMVAyKS5zaWduQW5nbGUoUDFCKTtcclxuICAgICAgICBsZXQgZGVncmVlUDFQMiA9IGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5QMVAyKTtcclxuXHJcbiAgICAgICAgbGV0IFAyQiA9IEIuc3ViKFAyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgUDJQMSA9IFAxLnN1YihQMikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbGV0IHJhZGlhblAyUDFiID0gY2MudjIoUDJCKS5zaWduQW5nbGUoUDJQMSk7XHJcbiAgICAgICAgbGV0IGRlZ3JlZVAyUDFiID0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKHJhZGlhblAyUDFiKTtcclxuXHJcbiAgICAgICAgaWYgKGRlZ3JlZVAxUDIgPj0wICYmIGRlZ3JlZVAxUDIgPD0gOTAgJiYgZGVncmVlUDJQMWIgPj0wICYmIGRlZ3JlZVAyUDFiIDw9IDkwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDlsITnur/otbflp4vngrlQLOaWueWQkWRpcizmmK/lkKbnu4/ov4fnur/mrrVBQlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyByYWRpYWxQYXNzTGluZShQLGRpcixBLEIpe1xyXG4gICAgICAgIGxldCByYWRpYW5QQSA9IEEuc3ViKFApLm5vcm1hbGl6ZSgpLnNpZ25BbmdsZShkaXIpO1xyXG4gICAgICAgIGxldCByYWRpYW5QQiA9IEIuc3ViKFApLm5vcm1hbGl6ZSgpLnNpZ25BbmdsZShkaXIpO1xyXG5cclxuICAgICAgICBsZXQgZGVncmVlUEEgPSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFuUEEpO1xyXG4gICAgICAgIGxldCBkZWdyZWVQQiA9IGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW5QQik7XHJcblxyXG4gICAgICAgIC8vIOWwhOe6v+S4jkFC6YeN5ZCIXHJcbiAgICAgICAgaWYgKHJhZGlhblBBID09IDAgfHwgcmFkaWFuUEIgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJhZGlhblBBKnJhZGlhblBCPD0wICYmIChNYXRoLmFicyhkZWdyZWVQQikgKyBNYXRoLmFicyhkZWdyZWVQQSkpIDw9IDE4MCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIOeCuVDkuLrlnIblv4MscmFkaXVz5Li65Y2K5b6ELOaWueWQkWRpcueahOWchizkvJrkuI3kvJrnu4/ov4fnur/mrrVBQlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBjaXJjbGVQYXNzTGluZShQLHJhZGl1cyxkaXIsQSxCKXtcclxuICAgICAgICBpZiAoVXRpbHMuY2lyY2xlUGFzc1BvaW50KFAscmFkaXVzLGRpcixBKSB8fCBVdGlscy5jaXJjbGVQYXNzUG9pbnQoUCxyYWRpdXMsZGlyLEIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoVXRpbHMucmFkaWFsUGFzc0xpbmUoUCxkaXIsQSxCKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICDngrlQLFAx5Li65ZyG5b+DLHJhZGl1c+S4uuWNiuW+hOeahOWchizkvJrkuI3kvJrnu4/ov4fnur/mrrVBQlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBjaXJjbGVDaXJjbGVQYXNzTGluZShQLFAxLHJhZGl1cyxBLEIpe1xyXG4gICAgICAgIGlmIChVdGlscy5jaXJjbGVQYXNzTGluZShQLHJhZGl1cyxQMS5zdWIoUCkubm9ybWFsaXplKCksQSxCKSAmJiBVdGlscy5jaXJjbGVQYXNzTGluZShQMSxyYWRpdXMsUC5zdWIoUDEpLm5vcm1hbGl6ZSgpLEEsQikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAg57q/5q61UFAxLOaYr+WQpue7j+i/h+e6v+autUFCXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGxpbmVQYXNzTGluZShQLFAxLEEsQil7XHJcbiAgICAgICAgaWYgKHRoaXMucmFkaWFsUGFzc0xpbmUoUCxQMS5zdWIoUCkubm9ybWFsaXplKCksQSxCKSAmJiB0aGlzLnJhZGlhbFBhc3NMaW5lKFAxLFAuc3ViKFAxKS5ub3JtYWxpemUoKSxBLEIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8gIOinkuW6piDmlbDlraYgIC8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIFxyXG4gICAgLy8vLy8vLy8vLy8vLy8vICDluLjnlKjlh73mlbAgIC8vLy8vLy8vLy8vLy8vL1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOWIm+W7uuS4gOS4quaMh+WumuminOiJsueahGxheW91dFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVMYXlvdXQod2lkdGgsaGVpZ2h0LGNvbG9yLHBhcmVudD1udWxsKSB7XHJcbiAgICAgICAgd2lkdGggPSB3aWR0aCB8fCAyMDtcclxuICAgICAgICBoZWlnaHQgPSBoZWlnaHQgfHwgMjA7XHJcbiAgICAgICAgY29sb3IgPSBjb2xvciB8fCBjYy5Db2xvci5XSElURTtcclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIG5vZGUuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICBpZiAocGFyZW50KSB7IG5vZGUucGFyZW50ID0gcGFyZW50OyB9XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJkZWZhdWx0L3BhbmVsXCIsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAvL+WKoOi9veWksei0pSzmiZPljbDml6Xlv5dcclxuICAgICAgICAgICAgaWYoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ2NyZWF0ZUxheW91dCBmYWlsZWQ6ICcgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICBzcHJpdGUudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNMSUNFRDtcclxuICAgICAgICAgICAgbm9kZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICBub2RlLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDojrflj5blvZPliY3lnLrmma/nmoR1aeagueiKgueCuVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBnZXRDdXJyZW50U2NlbmVDYW52YXMoKXtcclxuICAgICAgICBsZXQgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBjYy5maW5kKFwiQ2FudmFzXCIsc2NlbmUpO1xyXG4gICAgICAgIHJldHVybiBjYW52YXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAg5re75Yqg5Yiw5b2T5YmN5Zy65pmv55qEdWnmoLnoioLngrlcclxuICAgICovXHJcbiAgICBzdGF0aWMgYWRkdG9DdXJyZW50U2NlbmUobm9kZSwgcG9zID0gbnVsbCl7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IFV0aWxzLmdldEN1cnJlbnRTY2VuZUNhbnZhcygpO1xyXG4gICAgICAgIGNhbnZhcy5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBpZiAocG9zICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYy5sb2cobm9kZS54LG5vZGUueSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAg5pi+56S65by556qXXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHNob3dEaWFsb2dzKHByZWZhYil7XHJcbiAgICAgICAgbGV0IGRpYWxvZ3MgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgIGRpYWxvZ3MuekluZGV4ID0gMTAwMDtcclxuICAgICAgICBVdGlscy5hZGR0b0N1cnJlbnRTY2VuZShkaWFsb2dzKTtcclxuICAgICAgICBkaWFsb2dzLnNjcmlwdC5zaG93KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWFsb2dzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOWIl+ihqOS4reaYr+WQpuWtmOWcqGl0ZW1cclxuICAgICovXHJcbiAgICBzdGF0aWMgaXRlbUluTGlzdChpdGVtLGxpc3Qpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGlzdFtpXSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDojrflj5bnorDmkp7moYYt5omA5pS+5YC8XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldFdvcmxkQm91bmRpbmdCb3gobm9kZSxzY2FsZT0xKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IG5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XHJcbiAgICAgICAgaWYgKHNjYWxlICE9IDEpIHtcclxuICAgICAgICAgICAgcmV0LnggPSByZXQueCArIHJldC53aWR0aCooMS1zY2FsZSkvMjtcclxuICAgICAgICAgICAgcmV0LnkgPSByZXQueSArIHJldC5oZWlnaHQqKDEtc2NhbGUpLzI7XHJcbiAgICAgICAgICAgIHJldC53aWR0aCA9IHJldC53aWR0aCAqIHNjYWxlO1xyXG4gICAgICAgICAgICByZXQuaGVpZ2h0ID0gcmV0LmhlaWdodCAqIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIOaKiuaVsOWtl+i9rOS4uuWNg+i/m+S9jVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1OdW1iZXIobnVtKXtcclxuICAgICAgICBpZiAobnVtID49IDEwMDApIHtcclxuICAgICAgICAgICAgbGV0IHFpYW4gPSBNYXRoLmZsb29yKG51bS8xMDAwKTtcclxuICAgICAgICAgICAgbnVtID0gKG51bSUxMDAwKTtcclxuICAgICAgICAgICAgbGV0IGJhaSA9IE1hdGguZmxvb3IobnVtLzEwMCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcWlhbiArIFwiLlwiICsgYmFpICsgXCJLXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICDojrflj5bkuJbnlYzlnZDmoIdcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0V29ybGRQb3NpdGlvbihub2RlKXtcclxuICAgICAgICByZXR1cm4gbm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG5vZGUucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5Lqn55SfIGEtYijkuI3ljIXlkKspIOS5i+mXtOeahOmaj+acuuaVtOaVsFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyByYW5kb21JbnQoYSxiKXtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihiLWEpKSArIGE7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgIOS6p+eUnyBhWzBdLWFbMV0o5LiN5YyF5ZCrKSDkuYvpl7TnmoTpmo/mnLrmlbTmlbBcclxuICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RXgoYSl7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLnJhbmRvbUludChhWzBdLGFbMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5Lqn55SfIGEtYijkuI3ljIXlkKspIOS5i+mXtOeahOmaj+acuua1rueCueaVsFxyXG4gICAgZGVjaW1hbHM65bCP5pWw5L+d55WZ5L2N572uXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHJhbmRvbUZsb2F0KGEsYixkZWNpbWFscz0zKXtcclxuICAgICAgICBsZXQgbXVsdGlwbGVhID0gTWF0aC5wb3coMTAsZGVjaW1hbHMpO1xyXG4gICAgICAgIGEgPSBNYXRoLmZsb29yKGEqbXVsdGlwbGVhKTtcclxuICAgICAgICBiID0gTWF0aC5mbG9vcihiKm11bHRpcGxlYSk7XHJcbiAgICAgICAgbGV0IHJldCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooYi1hKSkgKyBhO1xyXG4gICAgICAgIHJldHVybiByZXQvbXVsdGlwbGVhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAg5Lqn55SfIGFbMF0tYVsxXSjkuI3ljIXlkKspIOS5i+mXtOeahOmaj+acuua1rueCueaVsFxyXG4gICAgZGVjaW1hbHM65bCP5pWw5L+d55WZ5L2N572uXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHJhbmRvbUZsb2F0RXgoYSxkZWNpbWFscz0zKXtcclxuICAgICAgICByZXR1cm4gVXRpbHMucmFuZG9tRmxvYXQoYVswXSxhWzFdLGRlY2ltYWxzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICBR5by55pWI5p6cXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGRvUUFjdGlvbihub2RlKXtcclxuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwxLjIsMS4yKSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsMSwxKSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjA1LDEuMDUsMS4wNSksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4wMiwxLDEpXHJcbiAgICAgICAgKS5yZXBlYXRGb3JldmVyKCkpO1xyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vICDluLjnlKjlh73mlbAgIC8vLy8vLy8vLy8vLy8vL1xyXG59XHJcbiJdfQ==