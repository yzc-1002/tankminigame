"use strict";
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