import {BaseComponent} from "./base/BaseComponent";
import {Utils} from "./base/Utils";

const {ccclass} = cc._decorator;

@ccclass
export class OilPickup extends BaseComponent {

    _lifeTime = 12;
    _floatBaseY = 0;
    _floatTime = 0;

    onLoad() {
        this._buildView();
    }

    _buildView() {
        this.node.setContentSize(92, 92);

        let outer = new cc.Node("_oilPickupOuter");
        outer.parent = this.node;
        let outerGraphics = outer.addComponent(cc.Graphics);
        outerGraphics.fillColor = cc.color(60, 42, 28, 235);
        outerGraphics.circle(0, 0, 44);
        outerGraphics.fill();
        outerGraphics.lineWidth = 4;
        outerGraphics.strokeColor = cc.color(255, 208, 122, 220);
        outerGraphics.circle(0, 0, 40);
        outerGraphics.stroke();

        let core = new cc.Node("_oilPickupCore");
        core.parent = this.node;
        let coreGraphics = core.addComponent(cc.Graphics);
        coreGraphics.fillColor = cc.color(30, 20, 16, 245);
        coreGraphics.circle(0, 0, 28);
        coreGraphics.fill();

        let labelNode = new cc.Node("_oilPickupLabel");
        labelNode.parent = this.node;
        labelNode.setContentSize(84, 30);
        labelNode.setPosition(0, 0);
        labelNode.color = cc.color(255, 227, 164, 255);
        let label = labelNode.addComponent(cc.Label);
        label.string = "焦油";
        label.fontSize = 20;
        label.lineHeight = 24;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;

        let tipNode = new cc.Node("_oilPickupTip");
        tipNode.parent = this.node;
        tipNode.setContentSize(120, 24);
        tipNode.setPosition(0, -56);
        tipNode.color = cc.color(220, 220, 220, 210);
        let tip = tipNode.addComponent(cc.Label);
        tip.string = "拾取焦油弹";
        tip.fontSize = 16;
        tip.lineHeight = 20;
        tip.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        tip.verticalAlign = cc.Label.VerticalAlign.CENTER;

        this._floatBaseY = this.node.y;
    }

    update(dt) {
        this._floatTime += dt;
        this.node.y = this._floatBaseY + Math.sin(this._floatTime * 2.8) * 6;

        let lifeProgress = this._lifeTime > 0 ? Math.min(1, this._floatTime / this._lifeTime) : 0;
        if (lifeProgress > 0.78) {
            let blink = Math.sin(this._floatTime * 16);
            this.node.opacity = blink > 0 ? 255 : 110;
        }
        else{
            this.node.opacity = 255;
        }

        if (this._floatTime >= this._lifeTime) {
            this.node.destroy();
        }
    }

    emitSkill() {
        yyp.eventCenter.emit("trigger-skill", {skillId: 4});
    }

    getSkillBoundingBox() {
        return Utils.getWorldBoundingBox(this.node, 0.85);
    }

    setInGame(lifeTime = 12) {
        this._lifeTime = lifeTime;
        this._floatTime = 0;
        this._floatBaseY = this.node.y;
    }
}
