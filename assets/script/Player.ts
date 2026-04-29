import {Tank} from "./TankE";
import {Utils} from "./base/Utils";
import {Bullet} from "./BulletE";
import { MusicManager } from "./base/MusicManager";
import SDKManager from "./sdk/sdk/SDKManager";

const {ccclass, property} = cc._decorator;
const PLAYER_SHOOT_INTERVAL = 0.35;
const PLAYER_FREE_BULLET_MAX = 3;
const PLAYER_FREE_BULLET_RECOVER_DELAY = 0.8;
const PLAYER_FREE_BULLET_RECOVER_INTERVAL = 0.6;
const PLAYER_PAID_SHOT_HP_COST = 5 * (1 - 0.1);
const PLAYER_EXP_BASE = 30;
const PLAYER_EXP_STEP = 15;
const CHARGE_CANNON_BULLET_TYPE = 99;

@ccclass
export class Player extends Tank {

    //内部变量
    _level          = 1;        //玩家等级

    _bulletCodeTime = 0;        //射击冷却时间

    _isHighBullet   = false;    //三发高频子弹

    _skill2Time     = 0;        //技能2(超级子弹)剩余时间
    _skill3Time     = 0;        //技能3(无敌防御)剩余时间

    _inGame         = false;    //在游戏中中使用
    _viewMode       = false;    //展示模式
    _freeBulletCount = PLAYER_FREE_BULLET_MAX;  //当前免费子弹数量
    _stopFireTime = 0;          //停火计时
    _freeBulletRecoverTime = 0; //免费子弹恢复计时
    _moveInputDir = cc.v2(1, 0); //移动摇杆目标方向
    _moveInputRatio = 0;        //移动摇杆目标速率
    _moveSpeedScale = 1;        //局内移速倍率
    _energyLevel = 1;           //局内能量等级
    _energyExp = 0;             //当前经验
    _energyNeedExp = PLAYER_EXP_BASE; //升级所需经验
    _chargeCannonTime = 0;      //蓄力炮蓄力时间
    _chargeCannonCdTime = 0;    //蓄力炮冷却
    _chargeCannonCooldown = 0;  //蓄力炮冷却总时长
    _chargeCannonCharging = false;
    _chargeCannonReady = false;
    _chargeEffectNode = null;
    _bulletMutationType = "";
    _bulletMutationData = null;
    _bulletMutationEffectNode = null;
    _moveEffectId = -1;

    onLoad () {
        super.onLoad();
        
        //初始化变量
        this._initVariable();

        //初始化UI
        this._initUI();

        //初始化接收事件
        this._initEvent();
    }

    //初始化变量
    _initVariable() {
        this._camp = "player";  //阵营
        this._radius = this._radius * 2;    //玩家的碰撞检测范围*2
        this._bulletCodeTime = PLAYER_SHOOT_INTERVAL;
        this._freeBulletCount = PLAYER_FREE_BULLET_MAX;
        this._stopFireTime = 0;
        this._freeBulletRecoverTime = 0;
        this._currentSpeed = 0;
        this._moveInputDir = this._dir;
        this._moveInputRatio = 0;
        this._moveSpeedScale = 1;
        this._energyLevel = 1;
        this._energyExp = 0;
        this._energyNeedExp = this._getEnergyNeedExp();
        this._chargeCannonTime = 0;
        this._chargeCannonCdTime = 0;
        this._chargeCannonCooldown = 0;
        this._chargeCannonCharging = false;
        this._chargeCannonReady = false;
        this._bulletMutationType = "";
        this._bulletMutationData = null;
        this._bulletMutationEffectNode = null;
        this._moveEffectId = -1;
    }

    //设置坦克类型
    setPlayerType(tankType,playerLevel) {
        super.setTankType(tankType);
        
        //计算玩家血量 攻击
        this._level = playerLevel;
        this._hp = this._maxHp = this._config.HP * (this._level+1);
        this._atk = this._config.ATK * (this._level+1);
        this._refreshEnergyUI();
    }

    //初始化UI
    _initUI(){
        this._fire._lifebar.active = false;
        this._fire._spArmour.active = false;
        this._fire._spSkill2.active = false;
        this._fire._spSkill3.active = false;
        this._refreshFreeBulletBar();
        this._initEnergyUI();
        this._refreshEnergyUI();
    }

    //初始化接收事件
    _initEvent() {
        yyp.eventCenter.on('joy-stick',this._doJoyStick,this);      //摇杆事件
        yyp.eventCenter.on('joy-stick-shoot',this._doShootJoyStick,this); //射击摇杆事件
        yyp.eventCenter.on('charge-cannon-press',this._doChargeCannonPress,this); //蓄力炮按下
        yyp.eventCenter.on('charge-cannon-release',this._doChargeCannonRelease,this); //蓄力炮松开
        yyp.eventCenter.on('trigger-skill',this._doSkill,this);     //触发技能
    }
       
    //销毁事件
    _destroyEvent() {
        yyp.eventCenter.off('joy-stick',this._doJoyStick,this);     //摇杆事件
        yyp.eventCenter.off('joy-stick-shoot',this._doShootJoyStick,this); //射击摇杆事件
        yyp.eventCenter.off('charge-cannon-press',this._doChargeCannonPress,this); //蓄力炮按下
        yyp.eventCenter.off('charge-cannon-release',this._doChargeCannonRelease,this); //蓄力炮松开
        yyp.eventCenter.off('trigger-skill',this._doSkill,this);    //触发技能
    }
    
    //摇杆事件
    _doJoyStick(event) {
        if (this._inGame) {
            if (event.dir && event.dir.magSqr() > 0) {
                this._moveInputDir = event.dir;      //方向
            }
            this._moveInputRatio = event.ratio;  //速率
        }
    }

    //射击摇杆事件
    _doShootJoyStick(event) {
        if (this._inGame == false) return;
        if (event.fire === true) {
            this._tryFireOnce();
        }
    }

    _doChargeCannonPress(event) {
        if (this._inGame == false || this._chargeCannonCdTime > 0 || this._chargeCannonCharging) {
            return;
        }

        this._chargeCannonTime = 0;
        this._chargeCannonCharging = true;
        this._chargeCannonReady = false;
        this._hideChargeEffect();
        yyp.eventCenter.emit("charge-cannon-progress", {progress: 0});
        MusicManager.playEffect("chargeCannon");
    }

    _doChargeCannonRelease(event) {
        if (this._inGame == false || this._chargeCannonCharging == false) {
            return;
        }

        if (this._chargeCannonReady) {
            this._fireChargeCannon();
        }

        this._resetChargeCannon();
    }
    
    //触发技能
    _doSkill(event) {
        if (this._inGame) {
            let skillId = event.skillId;    //方向
            // cc.log("触发了技能 ",skillId);
            if (skillId == 0) {
                yyp.eventCenter.emit('add-coin',{count:this._config.Coin/10,position:Utils.getWorldPosition(this.node)});
            }
            else if (skillId == 1) {
                this.addEnergy(this._maxHp / 2);
            }
            else if (skillId == 2) {
                this._skill2Time += 15;
            }
            else if (skillId == 3) {
                this._skill3Time += 15;
            }
        }
    }

    onDestroy() {
        //销毁事件
        this._destroyEvent();
        this._stopMoveEffect();
        this._hideBulletMutationEffect();
    }

    //刷新玩家位置
    _refreshPosition(dt) {
        this._refreshMoveSpeed(dt);
        if (this._currentSpeed <= 0) {
            return;
        }

        if (this._moveInputRatio > 0) {
            this._turnDirTo(this._moveInputDir, dt);
        }

        let currPosition = this.node.position;

        //碰撞测试
        let willPosition = this._getWillPosition(currPosition, this._dir, this._currentSpeed);
        let colliderItems = this._map.testColliders(willPosition, this._radius);
        if (colliderItems.length > 0){
            let testDir = this._getTestDir(currPosition, this._radius, this._dir, colliderItems);
            if (testDir) {
                willPosition = this._getWillPosition(currPosition, testDir, this._currentSpeed);
            }
            else{
                this._currentSpeed = 0;
                return;
            }
        }

        willPosition = this._map.clampMapInnerPosition(willPosition, this._radius);
        this.node.setPosition(willPosition);
    }

    _refreshMoveSpeed(dt) {
        let maxSpeed = this._getConfigValue("Speed", 0) * this._moveSpeedScale;
        let targetSpeed = this._moveInputRatio > 0 ? maxSpeed * this._moveInputRatio : 0;

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
    }

    addEnergy(value) {
        if (value <= 0) {
            return;
        }

        let recoverHp = this._maxHp - this._hp;
        if (recoverHp > 0) {
            let addHp = Math.min(recoverHp, value);
            this._hp += addHp;
            value -= addHp;
            this.refreshHp();
        }

        if (value > 0) {
            this._addEnergyExp(value);
        }

        this._refreshEnergyUI();
    }

    _addEnergyExp(exp) {
        this._energyExp += exp;
        while (this._energyExp >= this._energyNeedExp) {
            this._energyExp -= this._energyNeedExp;
            this._energyLevel++;
            this._energyNeedExp = this._getEnergyNeedExp();
            this._levelUpByEnergy();
        }
    }

    _getEnergyNeedExp() {
        let config = yyp.config.Energy || {};
        let base = config.ExpBase == null ? PLAYER_EXP_BASE : config.ExpBase;
        let step = config.ExpStep == null ? PLAYER_EXP_STEP : config.ExpStep;
        return base + (this._energyLevel - 1) * step;
    }

    _levelUpByEnergy() {
        let config = yyp.config.Energy || {};
        let hpAdd = config.LevelHpAdd == null ? Math.max(1, Math.floor(this._config.HP * 0.3)) : config.LevelHpAdd;
        let atkAdd = config.LevelAtkAdd == null ? this._config.ATK * 0.2 : config.LevelAtkAdd;

        this._maxHp += hpAdd;
        this._hp = this._maxHp;
        this._atk += atkAdd;
        this.refreshHp();
    }

    _initEnergyUI() {
        if (!this._fire._lifebar || this._fire._lbHpLevel) {
            return;
        }

        let levelNode = new cc.Node("_lbHpLevel");
        levelNode.parent = this._fire._lifebar;
        levelNode.setPosition(-34, 0);
        levelNode.setContentSize(36, 24);
        levelNode.zIndex = 10;
        let levelLabel = levelNode.addComponent(cc.Label);
        levelLabel.fontSize = 18;
        levelLabel.lineHeight = 20;
        levelLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        levelLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        levelNode["$Label"] = levelLabel;
        this._fire._lbHpLevel = levelNode;

        let expNode = new cc.Node("_expBar");
        expNode.parent = this._fire._lifebar;
        expNode.setPosition(-34, 0);
        expNode.setContentSize(44, 44);
        expNode.zIndex = 0;

        let bg = new cc.Node("_expBg");
        bg.parent = expNode;
        let bgGraphics = bg.addComponent(cc.Graphics);
        bgGraphics.lineWidth = 5;
        bgGraphics.strokeColor = cc.color(50, 68, 75, 220);
        bgGraphics.circle(0, 0, 18);
        bgGraphics.stroke();

        let bar = new cc.Node("_expProgress");
        bar.parent = expNode;
        let barGraphics = bar.addComponent(cc.Graphics);
        barGraphics.lineWidth = 5;
        barGraphics.strokeColor = cc.color(90, 255, 140, 255);
        this._fire._expBar = expNode;
        this._fire._expProgress = bar;
        bar["$Graphics"] = barGraphics;
    }

    _refreshEnergyUI() {
        if (this._fire._lbHpLevel && this._fire._lbHpLevel.$Label) {
            this._fire._lbHpLevel.$Label.string = this._energyLevel.toString();
        }

        if (this._fire._expProgress && this._fire._expProgress.$Graphics) {
            let progress = this._energyNeedExp > 0 ? this._energyExp / this._energyNeedExp : 0;
            let graphics = this._fire._expProgress.$Graphics;
            graphics.clear();
            graphics.lineWidth = 5;
            graphics.strokeColor = cc.color(90, 255, 140, 255);
            graphics.arc(0, 0, 18, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress, false);
            graphics.stroke();
        }
        else if (this._fire._expBar && this._fire._expBar.$ProgressBar) {
            this._fire._expBar.$ProgressBar.progress = this._energyNeedExp > 0 ? this._energyExp / this._energyNeedExp : 0;
        }
    }

    update(dt){

        if (this._inGame) {
            if (this._map._pause) {
                this._stopMoveEffect();
                return;
            }
            this._bulletCodeTime += dt;
            this._updateFreeBulletRecover(dt);
            this._updateChargeCannon(dt);
            
            //玩家和技能icon,碰撞检测
            this._map.playerSkillIconCollisionTest();

            this._refreshPosition(dt);
            this._refreshMoveEffect();
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
        else if(this._viewMode){
            this._stopMoveEffect();
            this._dir = Utils.vectorsRotateDegress(this._dir,-0.5);
            this.node.angle = Utils.vectorsToDegress(this._dir);
            this._barrelDir = this._dir;
            this.shooting(dt);
        }
        else{
            this._stopMoveEffect();
        }
        
    }

    getTestUpgradeChoices() {
        let hpAdd = Math.max(25, Math.round(this._maxHp * 0.22));
        let atkAdd = Math.max(8, Math.round(this._atk * 0.18));
        let speedAdd = 18;

        return [
            {
                id: "hp",
                title: "装甲强化",
                desc: "生命上限提升并立刻回满",
                shortLabel: "HP",
                valueText: "+" + hpAdd,
                amount: hpAdd,
                color: cc.color(120, 255, 170, 255),
            },
            {
                id: "atk",
                title: "火力强化",
                desc: "攻击力提升, 输出更高",
                shortLabel: "ATK",
                valueText: "+" + atkAdd,
                amount: atkAdd,
                color: cc.color(255, 185, 90, 255),
            },
            {
                id: "speed",
                title: "推进强化",
                desc: "移动速度提升, 走位更灵活",
                shortLabel: "SPD",
                valueText: "+" + speedAdd + "%",
                amount: speedAdd,
                color: cc.color(110, 210, 255, 255),
            },
        ];
    }

    getTestBulletMutationChoices() {
        return [
            {
                id: "bounce",
                title: "反弹子弹",
                desc: "碰墙后自动反弹1次",
                shortLabel: "反",
                valueText: "x1",
                bounceCount: 1,
                color: cc.color(90, 180, 255, 255),
                effectColor: cc.color(90, 180, 255, 210),
            },
            {
                id: "penetrate",
                title: "穿透子弹",
                desc: "连续穿透3个目标后消失",
                shortLabel: "穿",
                valueText: "x3",
                penetrateCount: 3,
                color: cc.color(255, 92, 92, 255),
                effectColor: cc.color(255, 92, 92, 210),
            },
            {
                id: "heavy",
                title: "重炮子弹",
                desc: "伤害提升60%, 子弹更大",
                shortLabel: "重",
                valueText: "+60%",
                damageRatio: 1.6,
                scale: 1.35,
                color: cc.color(255, 210, 90, 255),
                effectColor: cc.color(255, 210, 90, 210),
            },
        ];
    }

    applyTestUpgradeChoice(choice) {
        if (!choice || !choice.id) {
            return;
        }

        if (choice.id == "hp") {
            this._maxHp += choice.amount;
            this._hp = this._maxHp;
            this.refreshHp();
        }
        else if (choice.id == "atk") {
            this._atk += choice.amount;
        }
        else if (choice.id == "speed") {
            this._moveSpeedScale += choice.amount / 100;
        }

        this._showUpgradeFloat(choice);
        this._playUpgradeSelectFeedback(choice);
    }

    applyTestBulletMutationChoice(choice) {
        if (!choice || !choice.id) {
            return;
        }

        this._bulletMutationType = choice.id;
        this._bulletMutationData = {
            id: choice.id,
            title: choice.title,
            shortLabel: choice.shortLabel,
            valueText: choice.valueText,
            bounceCount: choice.bounceCount || 0,
            penetrateCount: choice.penetrateCount || 0,
            damageRatio: choice.damageRatio || 1,
            scale: choice.scale || 1,
            color: choice.color,
            effectColor: choice.effectColor || choice.color,
        };

        this._showBulletMutationMedal(this._bulletMutationData);
        this._refreshBulletMutationEffect();
        this._playUpgradeSelectFeedback(this._bulletMutationData);
    }

    _getCurrentBulletMutationData() {
        if (!this._bulletMutationData) {
            return null;
        }

        let data = Object.assign({}, this._bulletMutationData);
        data.color = this._bulletMutationData.color;
        data.effectColor = this._bulletMutationData.effectColor;
        return data;
    }

    _showUpgradeFloat(choice) {
        if (!this.node.parent || !cc.isValid(this.node.parent)) {
            return;
        }

        let floatNode = new cc.Node("_upgradeFloat");
        floatNode.parent = this.node.parent;
        floatNode.setPosition(cc.v3(this.node.x, this.node.y + 110, 0));
        floatNode.zIndex = 6500;
        floatNode.opacity = 0;
        floatNode.scale = 0.82;

        let badge = new cc.Node("_upgradeBadge");
        badge.parent = floatNode;
        badge.setPosition(-44, 4);
        let badgeGraphics = badge.addComponent(cc.Graphics);
        badgeGraphics.fillColor = choice.color;
        badgeGraphics.circle(0, 0, 24);
        badgeGraphics.fill();
        badgeGraphics.lineWidth = 3;
        badgeGraphics.strokeColor = cc.color(255, 255, 255, 220);
        badgeGraphics.circle(0, 0, 24);
        badgeGraphics.stroke();

        let badgeLabelNode = new cc.Node("_upgradeBadgeLabel");
        badgeLabelNode.parent = badge;
        badgeLabelNode.setContentSize(54, 32);
        let badgeLabel = badgeLabelNode.addComponent(cc.Label);
        badgeLabel.string = choice.shortLabel;
        badgeLabel.fontSize = choice.shortLabel.length > 2 ? 15 : 18;
        badgeLabel.lineHeight = 20;
        badgeLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        badgeLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        let valueNode = new cc.Node("_upgradeValue");
        valueNode.parent = floatNode;
        valueNode.setPosition(22, 8);
        valueNode.color = choice.color;
        valueNode.setContentSize(170, 38);
        let valueLabel = valueNode.addComponent(cc.Label);
        valueLabel.string = choice.valueText;
        valueLabel.fontSize = 34;
        valueLabel.lineHeight = 38;
        valueLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        valueLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        let titleNode = new cc.Node("_upgradeTitle");
        titleNode.parent = floatNode;
        titleNode.setPosition(16, -24);
        titleNode.color = cc.color(255, 255, 255, 220);
        titleNode.setContentSize(220, 28);
        let titleLabel = titleNode.addComponent(cc.Label);
        titleLabel.string = choice.title;
        titleLabel.fontSize = 20;
        titleLabel.lineHeight = 24;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        floatNode.runAction(cc.sequence(
            cc.spawn(
                cc.fadeIn(0.12),
                cc.scaleTo(0.12, 1.04),
                cc.moveBy(0.12, 0, 18)
            ),
            cc.spawn(
                cc.moveBy(0.55, 0, 72),
                cc.fadeOut(0.55)
            ),
            cc.removeSelf()
        ));
    }

    _playUpgradeSelectFeedback(choice) {
        let wave = new cc.Node("_upgradeWave");
        wave.parent = this.node;
        wave.setPosition(0, 0);
        wave.zIndex = 280;
        wave.opacity = 220;
        wave.scale = 0.55;
        let waveGraphics = wave.addComponent(cc.Graphics);
        waveGraphics.lineWidth = 8;
        waveGraphics.strokeColor = choice.color;
        waveGraphics.circle(0, 0, this._radius + 18);
        waveGraphics.stroke();
        wave.runAction(cc.sequence(
            cc.spawn(
                cc.scaleTo(0.3, 3.2),
                cc.fadeOut(0.3)
            ),
            cc.removeSelf()
        ));

        let glow = new cc.Node("_upgradeGlow");
        glow.parent = this.node;
        glow.setPosition(0, 0);
        glow.zIndex = 275;
        glow.opacity = 0;
        glow.scale = 0.75;
        let glowGraphics = glow.addComponent(cc.Graphics);
        glowGraphics.fillColor = cc.color(choice.color.r, choice.color.g, choice.color.b, 90);
        glowGraphics.circle(0, 0, this._radius + 26);
        glowGraphics.fill();
        glow.runAction(cc.sequence(
            cc.spawn(
                cc.fadeTo(0.12, 180),
                cc.scaleTo(0.12, 1.28)
            ),
            cc.spawn(
                cc.fadeOut(0.18),
                cc.scaleTo(0.18, 1.8)
            ),
            cc.removeSelf()
        ));

        this.node.stopActionByTag(9301);
        let punch = cc.sequence(
            cc.scaleTo(0.1, 1.08),
            cc.scaleTo(0.2, 1)
        );
        punch.setTag(9301);
        this.node.runAction(punch);

        if (this._map && this._map.playLightScreenShake) {
            this._map.playLightScreenShake();
        }
    }

    _showBulletMutationMedal(choice) {
        if (!this.node.parent || !cc.isValid(this.node.parent)) {
            return;
        }

        let medal = new cc.Node("_bulletMutationMedal");
        medal.parent = this.node.parent;
        medal.setPosition(cc.v3(this.node.x, this.node.y + 112, 0));
        medal.zIndex = 6600;
        medal.opacity = 0;
        medal.scale = 0.88;

        let badge = new cc.Node("_medalBadge");
        badge.parent = medal;
        let badgeGraphics = badge.addComponent(cc.Graphics);
        badgeGraphics.fillColor = choice.color;
        badgeGraphics.circle(0, 0, 28);
        badgeGraphics.fill();
        badgeGraphics.lineWidth = 3;
        badgeGraphics.strokeColor = cc.color(255, 255, 255, 220);
        badgeGraphics.circle(0, 0, 28);
        badgeGraphics.stroke();

        let badgeLabelNode = new cc.Node("_medalBadgeLabel");
        badgeLabelNode.parent = badge;
        badgeLabelNode.setContentSize(52, 32);
        let badgeLabel = badgeLabelNode.addComponent(cc.Label);
        badgeLabel.string = choice.shortLabel;
        badgeLabel.fontSize = 22;
        badgeLabel.lineHeight = 26;
        badgeLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        badgeLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        let titleNode = new cc.Node("_medalTitle");
        titleNode.parent = medal;
        titleNode.setPosition(0, -48);
        titleNode.color = cc.color(255, 255, 255, 235);
        titleNode.setContentSize(220, 32);
        let titleLabel = titleNode.addComponent(cc.Label);
        titleLabel.string = choice.title;
        titleLabel.fontSize = 22;
        titleLabel.lineHeight = 26;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        medal.runAction(cc.sequence(
            cc.spawn(
                cc.fadeIn(0.12),
                cc.scaleTo(0.12, 1.02),
                cc.moveBy(0.12, 0, 16)
            ),
            cc.delayTime(1.88),
            cc.spawn(
                cc.fadeOut(0.35),
                cc.moveBy(0.35, 0, 34)
            ),
            cc.removeSelf()
        ));
    }

    _refreshBulletMutationEffect() {
        this._hideBulletMutationEffect();
        if (!this._bulletMutationData) {
            return;
        }

        let barrelNode = this._currentBg || this._fire._lyBarrel;
        let effect = new cc.Node("_bulletMutationMuzzleEffect");
        effect.parent = barrelNode;
        effect.setPosition(cc.v3(this._getBarrelMuzzleLocalPosition(-2)));
        effect.zIndex = 96;
        this._bulletMutationEffectNode = effect;

        let outer = new cc.Node("_muzzleOuter");
        outer.parent = effect;
        let outerGraphics = outer.addComponent(cc.Graphics);
        outerGraphics.fillColor = cc.color(this._bulletMutationData.effectColor.r, this._bulletMutationData.effectColor.g, this._bulletMutationData.effectColor.b, 90);
        outerGraphics.circle(0, 0, 16);
        outerGraphics.fill();

        let inner = new cc.Node("_muzzleInner");
        inner.parent = effect;
        let innerGraphics = inner.addComponent(cc.Graphics);
        innerGraphics.fillColor = this._bulletMutationData.effectColor;
        innerGraphics.circle(0, 0, 8);
        innerGraphics.fill();

        effect.runAction(cc.repeatForever(cc.sequence(
            cc.spawn(
                cc.scaleTo(0.22, 1.22),
                cc.fadeTo(0.22, 220)
            ),
            cc.spawn(
                cc.scaleTo(0.22, 0.9),
                cc.fadeTo(0.22, 150)
            )
        )));
    }

    _hideBulletMutationEffect() {
        if (this._bulletMutationEffectNode && cc.isValid(this._bulletMutationEffectNode)) {
            this._bulletMutationEffectNode.stopAllActions();
            this._bulletMutationEffectNode.destroy();
        }
        this._bulletMutationEffectNode = null;
    }

    _refreshMoveEffect() {
        if (this._currentSpeed > 0) {
            if (this._moveEffectId < 0) {
                this._moveEffectId = MusicManager.playLoopEffect("tankMove");
            }
        }
        else{
            this._stopMoveEffect();
        }
    }

    _stopMoveEffect() {
        if (this._moveEffectId >= 0) {
            MusicManager.stopEffect(this._moveEffectId);
            this._moveEffectId = -1;
        }
    }
    // 炮管始终跟随坦克整体方向
    _refreshBarrelDir() {
        this._barrelDir = this._dir;
    }

    // 右侧按钮抬起时直接发射一发, 不走按住持续发射逻辑
    fireOnce() {
        let type = (this._viewMode || this._skill2Time > 0) ? this._config.BType2 : this._config.BType1;
        let attackRadius = this._viewMode ? this._config.AttackRadius * 0.8 :this._config.AttackRadius;
        let mutationData = this._viewMode ? null : this._getCurrentBulletMutationData();
        Bullet.createBulletEx(type,this.node.position,this._barrelDir,this._fire._lyBarrel.height+20,attackRadius,this._atk,this._camp,this.node.parent,this._map,8,mutationData);
        
        // if (this._viewMode == false && this._map.enemyCount() > 0) {
        if (this._viewMode == false) {
            MusicManager.playEffect("shoot");
        }
    }

    _updateChargeCannon(dt) {
        if (this._chargeCannonCdTime > 0) {
            this._chargeCannonCdTime -= dt;
            if (this._chargeCannonCdTime < 0) {
                this._chargeCannonCdTime = 0;
            }

            if (this._chargeCannonCooldown > 0) {
                let cooldownProgress = 1 - this._chargeCannonCdTime / this._chargeCannonCooldown;
                yyp.eventCenter.emit("charge-cannon-cooldown", {progress: cooldownProgress});
            }
            if (this._chargeCannonCdTime == 0) {
                this._chargeCannonCooldown = 0;
                yyp.eventCenter.emit("charge-cannon-clear", {});
            }
        }

        if (this._chargeCannonCharging == false) {
            return;
        }

        this._chargeCannonTime += dt;
        let needTime = this._getChargeConfig("Time", 5);
        let progress = this._chargeCannonTime / needTime;
        if (progress > 1) {
            progress = 1;
        }
        yyp.eventCenter.emit("charge-cannon-progress", {progress: progress});

        if (this._chargeCannonReady == false && this._chargeCannonTime >= needTime) {
            this._chargeCannonReady = true;
            this._showChargeEffect();
            yyp.eventCenter.emit("charge-cannon-ready", {});
        }
    }

    _fireChargeCannon() {
        let attackRadius = this._getChargeConfig("AttackRadius", this._config.AttackRadius * 1.4);
        let atkRatio = this._getChargeConfig("AtkRatio", 3);
        let speed = this._getChargeConfig("Speed", 12);
        let wipeLen = this._getBarrelMuzzleDistance(12);
        Bullet.createBulletEx(CHARGE_CANNON_BULLET_TYPE, this.node.position, this._barrelDir, wipeLen, attackRadius, this._atk * atkRatio, this._camp, this.node.parent, this._map, speed);
        MusicManager.playEffect("chargeShoot");
        this._shakeScreen();
        this._chargeCannonCooldown = this._getChargeConfig("Cooldown", 8);
        this._chargeCannonCdTime = this._chargeCannonCooldown;
    }

    _getChargeConfig(key, defaultValue) {
        let fullKey = "Charge" + key;
        let value = this._config ? this._config[fullKey] : null;
        return value == null ? defaultValue : value;
    }

    _resetChargeCannon() {
        this._chargeCannonTime = 0;
        this._chargeCannonCharging = false;
        this._chargeCannonReady = false;
        this._hideChargeEffect();
        if (this._chargeCannonCdTime <= 0) {
            yyp.eventCenter.emit("charge-cannon-clear", {});
        }
    }

    _showChargeEffect() {
        if (this._chargeEffectNode && cc.isValid(this._chargeEffectNode)) {
            this._chargeEffectNode.active = true;
            return;
        }

        let barrelNode = this._currentBg || this._fire._lyBarrel;
        let effect = new cc.Node("_chargeMuzzleEffect");
        effect.parent = barrelNode;
        effect.setPosition(cc.v3(this._getBarrelMuzzleLocalPosition(4)));
        effect.zIndex = 100;

        let graphics = effect.addComponent(cc.Graphics);
        graphics.fillColor = cc.color(255, 40, 20, 180);
        graphics.circle(0, 0, 18);
        graphics.fill();

        effect.runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.25, 1.35),
            cc.scaleTo(0.25, 0.9)
        )));
        this._chargeEffectNode = effect;
    }

    _hideChargeEffect() {
        if (this._chargeEffectNode && cc.isValid(this._chargeEffectNode)) {
            this._chargeEffectNode.stopAllActions();
            this._chargeEffectNode.destroy();
        }
        this._chargeEffectNode = null;
    }

    _shakeScreen() {
        if (!this._map || !this._map.node) {
            return;
        }

        let mapNode = this._map.node;
        let origin = mapNode.position;
        mapNode.stopActionByTag(9001);
        let action = cc.sequence(
            cc.moveBy(0.03, 4, 0),
            cc.moveBy(0.03, -8, 0),
            cc.moveBy(0.03, 4, 3),
            cc.moveBy(0.03, 0, -3),
            cc.callFunc(function(){
                mapNode.setPosition(origin);
            })
        );
        action.setTag(9001);
        mapNode.runAction(action);
        Utils.vibrate();
    }

    _getBarrelMuzzleLocalPosition(extraOffset = 0) {
        let barrelNode = this._currentBg || this._fire._lyBarrel;
        let anchorY = barrelNode.anchorY == null ? 0.5 : barrelNode.anchorY;
        return cc.v2(0, barrelNode.height * (1 - anchorY) + extraOffset);
    }

    _getBarrelMuzzlePosition(extraOffset = 0) {
        let barrelNode = this._currentBg || this._fire._lyBarrel;
        let localPos = this._getBarrelMuzzleLocalPosition(extraOffset);
        let worldPos = barrelNode.convertToWorldSpaceAR(localPos);
        return this.node.parent.convertToNodeSpaceAR(worldPos);
    }

    _getBarrelMuzzleDistance(extraOffset = 0) {
        let muzzlePos = this._getBarrelMuzzlePosition(extraOffset);
        return muzzlePos.sub(this.node.position).mag();
    }

    _tryFireOnce() {
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
    }

    _canNotAffordPaidBullet() {
        return this._hp <= PLAYER_PAID_SHOT_HP_COST;
    }

    _showLowHpShootTip() {
        let channel = SDKManager.getChannel();
        if (channel && channel.showToast) {
            channel.showToast("血量过低,无法发射子弹");
        }
        else{
            cc.log("血量过低,无法发射子弹");
        }
    }

    _consumeHpForPaidBullet() {
        this._hp -= PLAYER_PAID_SHOT_HP_COST;
        if (this._hp < 0) {
            this._hp = 0;
        }

        this.refreshHp();
        if (this._hp <= 0) {
            this.doDeath();
        }
    }

    //玩家受击不飘伤害数字, 用区别于敌人的蓝色闪光表现
    beHit(damage){
        damage = damage - this._def;
        if (damage < 0) {
            damage = 0;
        }

        this._hp -= damage;
        if (this._hp < 0) {
            this._hp = 0;
        }

        this.refreshHp();
        this._showPlayerHitEffect();
        Utils.vibrate();
        MusicManager.playEffect("playerHit");

        if (this._hp == 0) {
            this.doDeath();
        }
    }

    _showPlayerHitEffect() {
        let effect = new cc.Node("_playerHitEffect");
        effect.parent = this.node;
        effect.setPosition(0, 0);
        effect.zIndex = 300;

        let graphics = effect.addComponent(cc.Graphics);
        graphics.lineWidth = 8;
        graphics.strokeColor = cc.color(80, 210, 255, 230);
        graphics.circle(0, 0, this._radius + 16);
        graphics.stroke();
        graphics.fillColor = cc.color(70, 170, 255, 55);
        graphics.circle(0, 0, this._radius + 10);
        graphics.fill();

        effect.opacity = 255;
        effect.scale = 0.65;
        effect.runAction(cc.sequence(
            cc.spawn(
                cc.scaleTo(0.18, 1.25),
                cc.fadeTo(0.18, 60)
            ),
            cc.fadeOut(0.1),
            cc.removeSelf()
        ));
    }

    _updateFreeBulletRecover(dt) {
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
    }

    _refreshFreeBulletBar() {
        let bulletBars = [
            this._fire._zidanbar1,
            this._fire._zidanbar2,
            this._fire._zidanbar3,
        ];
        let recoverProgress = 0;

        if (this._freeBulletCount < PLAYER_FREE_BULLET_MAX
            && this._stopFireTime >= PLAYER_FREE_BULLET_RECOVER_DELAY) {
            recoverProgress = this._freeBulletRecoverTime / PLAYER_FREE_BULLET_RECOVER_INTERVAL;
            if (recoverProgress > 1) {
                recoverProgress = 1;
            }
        }

        bulletBars.forEach((barNode, index) => {
            if (!barNode || !barNode.$ProgressBar) {
                return;
            }

            if (index < this._freeBulletCount) {
                barNode.$ProgressBar.progress = 1;
            }
            else if (index == this._freeBulletCount && recoverProgress > 0) {
                barNode.$ProgressBar.progress = recoverProgress;
            }
            else{
                barNode.$ProgressBar.progress = 0;
            }
        });
    }

    //射击
    shooting(dt){
        let judgeCD = this._skill2Time > 0 ? this._config.BulletCodeTime/4 : this._config.BulletCodeTime;

        this._bulletCodeTime += dt;
        if (this._bulletCodeTime >= judgeCD) {
            this._bulletCodeTime = 0;

            this.fireOnce();
        }
    }
    
    //执行死亡
    doDeath(){
        this._stopMoveEffect();
        super.doDeath();
        
        yyp.eventCenter.emit("player-death",{});
        this.node.destroy(); 
        // 爆炸效果
        // 显示结束界面
    }

    setInGame(){
        this._inGame = true;
        this._fire._lifebar.active = true;
    }
    
    //获取碰撞框
    getPlayerBoundingBox(){
        return Utils.getWorldBoundingBox(this._currentBg);
    }

    setViewMode(){
        this._viewMode = true;
    }
}
