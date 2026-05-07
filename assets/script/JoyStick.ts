import {BaseComponent} from "./base/BaseComponent";
import {Utils} from "./base/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export class JoyStick extends BaseComponent {

    _moveDir = cc.v2(0, 1);         //移动摇杆方向(向上)
    _shootDir = cc.v2(1, 0);        //射击摇杆方向
    _moveTouchPos = cc.v2(0, 0);    //移动摇杆初始位置
    _shootTouchPos = cc.v2(0, 0);   //射击摇杆初始位置
    _free = true;                   //自由移动摇杆位置
    _moveTouchId = null;
    _shootTouchId = null;
    _skillTouchId = null;

    onLoad () {
        this._moveTouchPos = this._fire._sprBg.position.clone();
        this._shootTouchPos = this._fire._sprBg02.position.clone();
        this._initSkillButton();
        yyp.eventCenter.on("charge-cannon-progress", this._onChargeProgress, this);
        yyp.eventCenter.on("charge-cannon-cooldown", this._onChargeCooldown, this);
        yyp.eventCenter.on("charge-cannon-ready", this._onChargeReady, this);
        yyp.eventCenter.on("charge-cannon-clear", this._onChargeClear, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
        yyp.eventCenter.off("charge-cannon-progress", this._onChargeProgress, this);
        yyp.eventCenter.off("charge-cannon-cooldown", this._onChargeCooldown, this);
        yyp.eventCenter.off("charge-cannon-ready", this._onChargeReady, this);
        yyp.eventCenter.off("charge-cannon-clear", this._onChargeClear, this);
    }

    _onTouchStart(event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        let touchId = event.getID();
        let controlType = this._getControlType(pos);
        if (controlType == "skill" && this._skillTouchId == null) {
            this._skillTouchId = touchId;
            this._refreshChargeProgress(0);
            yyp.eventCenter.emit("charge-cannon-press", {});
            return;
        }

        if (controlType == "move" && this._moveTouchId == null) {
            this._moveTouchId = touchId;
            this._updateMoveStick(pos, true);
            return;
        }
        if (controlType == "shoot" && this._shootTouchId == null) {
            this._shootTouchId = touchId;
            this._pressShootButton(pos);
            return;
        }

        if (this._moveTouchId == null) {
            this._moveTouchId = touchId;
            this._updateMoveStick(pos, true);
        }
        else if (this._shootTouchId == null) {
            this._shootTouchId = touchId;
            this._pressShootButton(pos);
        }
    }

    _onTouchMove(event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        let touchId = event.getID();
        if (touchId == this._moveTouchId) {
            this._updateMoveStick(pos, false);
        }
        else if (touchId == this._shootTouchId) {
            this._updateShootStick(pos);
        }
    }

    _onTouchEnd(event) {
        let touchId = event.getID();
        if (touchId == this._moveTouchId) {
            this._moveTouchId = null;
            this._resetMoveStick();
            yyp.eventCenter.emit("joy-stick",{dir:this._moveDir, ratio:0});
        }
        else if (touchId == this._shootTouchId) {
            this._shootTouchId = null;
            this._resetShootStick();
            yyp.eventCenter.emit("joy-stick-shoot",{fire:true});
        }
        else if (touchId == this._skillTouchId) {
            this._skillTouchId = null;
            yyp.eventCenter.emit("charge-cannon-release", {});
        }
    }

    update (dt) {
        let moveRatio = this._limitStickRange(this._fire._sprBg, this._fire._sprJoystick, this._moveTouchPos, this._moveDir);
        if (moveRatio > 0) {
            yyp.eventCenter.emit("joy-stick",{dir:this._moveDir, ratio:moveRatio});
        }
    }

    onDisable(){
        this._moveTouchId = null;
        this._shootTouchId = null;
        this._skillTouchId = null;
        this._resetMoveStick();
        this._resetShootStick();
        this._refreshChargeProgress(0);
        yyp.eventCenter.emit("joy-stick",{dir:this._moveDir, ratio:0});
    }

    _getControlType(pos) {
        if (this._fire._skillBtn) {
            let skillDistance = pos.sub(this._fire._skillBtn.position).mag();
            if (skillDistance <= this._fire._skillBtn.width / 2) {
                return "skill";
            }
        }

        let moveDistance = pos.sub(this._fire._sprBg.position).mag();
        let shootDistance = pos.sub(this._fire._sprBg02.position).mag();
        return moveDistance <= shootDistance ? "move" : "shoot";
    }

    _updateMoveStick(pos, isStart) {
        this._fire._sprJoystick.setPosition(pos);
        if (isStart && this._free) {
            this._fire._sprBg.setPosition(pos);
            this._moveTouchPos = pos;
        }

        this._moveDir = pos.sub(this._moveTouchPos);
        if (this._moveDir.magSqr() > 0) {
            this._moveDir = this._moveDir.normalize();
        }
    }

    _pressShootButton(pos) {
        if (pos) {
            this._updateShootStick(pos);
            return;
        }
        this._fire._sprJoystick02.setPosition(this._shootTouchPos);
    }

    _updateShootStick(pos) {
        this._fire._sprJoystick02.setPosition(pos);
        this._shootDir = pos.sub(this._shootTouchPos);
        if (this._shootDir.magSqr() > 0) {
            this._shootDir = this._shootDir.normalize();
        }

        let shootRatio = this._limitStickRange(this._fire._sprBg02, this._fire._sprJoystick02, this._shootTouchPos, this._shootDir);
        if (shootRatio > 0) {
            yyp.eventCenter.emit("joy-stick-shoot",{dir:this._shootDir, ratio:shootRatio});
        }
    }

    _resetMoveStick() {
        this._fire._sprJoystick.setPosition(this._moveTouchPos);
    }

    _resetShootStick() {
        this._fire._sprJoystick02.setPosition(this._shootTouchPos);
    }

    _limitStickRange(bgNode, joystickNode, touchPos, dir) {
        // 限定摇杆在范围内移动
        let len = joystickNode.position.sub(touchPos).mag();   // 返回向量的长度
        let maxLen = bgNode.width / 2;                         // 获取最大可移动距离
        let ratio = maxLen > 0 ? len / maxLen : 0;             // 当前位置和最大可移动距离比率

        // 比率大于1,说明已经超出最大可移动距离了
        if (len > maxLen) {
            joystickNode.setPosition(touchPos.add(dir.mul(maxLen)));
            ratio = 1;
        }

        return ratio;
    }

    _initSkillButton() {
        if (!this._fire._skillBtn) {
            return;
        }

        let bgNode = new cc.Node("_chargeProgressBg");
        bgNode.parent = this._fire._skillBtn;
        bgNode.zIndex = 9;
        let bgGraphics = bgNode.addComponent(cc.Graphics);
        let bgRadius = this._fire._skillBtn.width / 2 - 8;
        bgGraphics.lineWidth = 6;
        bgGraphics.strokeColor = cc.color(70, 70, 70, 180);
        bgGraphics.circle(0, 0, bgRadius);
        bgGraphics.stroke();
        this._fire._chargeProgressBg = bgNode;

        let progressNode = new cc.Node("_chargeProgress");
        progressNode.parent = this._fire._skillBtn;
        progressNode.zIndex = 10;
        progressNode.setContentSize(this._fire._skillBtn.getContentSize());
        let graphics = progressNode.addComponent(cc.Graphics);
        progressNode["$Graphics"] = graphics;
        this._fire._chargeProgress = progressNode;
        this._refreshChargeProgress(0);
    }

    _refreshChargeProgress(progress, color = cc.color(255, 90, 55, 255)) {
        if (!this._fire._chargeProgress || !this._fire._chargeProgress.$Graphics) {
            return;
        }

        let graphics = this._fire._chargeProgress.$Graphics;
        let radius = this._fire._skillBtn.width / 2 - 6;
        graphics.clear();
        if (progress <= 0) {
            return;
        }

        graphics.lineWidth = 8;
        graphics.strokeColor = color;
        graphics.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress, false);
        graphics.stroke();

        graphics.lineWidth = 3;
        graphics.strokeColor = cc.color(255, 220, 200, 180);
        graphics.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress, false);
        graphics.stroke();
    }

    _onChargeProgress(event) {
        this._refreshChargeProgress(event.progress || 0, cc.color(255, 90, 55, 255));
    }

    _onChargeCooldown(event) {
        this._refreshChargeProgress(event.progress || 0, cc.color(120, 160, 255, 220));
    }

    _onChargeReady() {
        this._refreshChargeProgress(1, cc.color(255, 40, 25, 255));
    }

    _onChargeClear() {
        this._refreshChargeProgress(0);
    }
}
