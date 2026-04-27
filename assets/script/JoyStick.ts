import {BaseComponent} from "./base/BaseComponent";
import {Utils} from "./base/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export class JoyStick extends BaseComponent {

    _moveDir = cc.v2(0, 1);         //移动摇杆方向(向上)
    _moveTouchPos = cc.v2(0, 0);    //移动摇杆初始位置
    _shootTouchPos = cc.v2(0, 0);   //射击摇杆初始位置
    _free = true;                   //自由移动摇杆位置
    _moveTouchId = null;
    _shootTouchId = null;

    onLoad () {
        this._moveTouchPos = this._fire._sprBg.position.clone();
        this._shootTouchPos = this._fire._sprBg02.position.clone();
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
    }

    _onTouchStart(event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        let touchId = event.getID();
        let controlType = this._getControlType(pos);

        if (controlType == "move" && this._moveTouchId == null) {
            this._moveTouchId = touchId;
            this._updateMoveStick(pos, true);
            return;
        }
        if (controlType == "shoot" && this._shootTouchId == null) {
            this._shootTouchId = touchId;
            this._pressShootButton();
            return;
        }

        if (this._moveTouchId == null) {
            this._moveTouchId = touchId;
            this._updateMoveStick(pos, true);
        }
        else if (this._shootTouchId == null) {
            this._shootTouchId = touchId;
            this._pressShootButton();
        }
    }

    _onTouchMove(event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        let touchId = event.getID();
        if (touchId == this._moveTouchId) {
            this._updateMoveStick(pos, false);
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
        this._resetMoveStick();
        this._resetShootStick();
        yyp.eventCenter.emit("joy-stick",{dir:this._moveDir, ratio:0});
    }

    _getControlType(pos) {
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

    _pressShootButton() {
        // 右侧不再承担方向控制，只作为点击发射按钮使用
        this._fire._sprJoystick02.setPosition(this._shootTouchPos);
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
}
