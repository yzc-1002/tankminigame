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
    _energyLevel = 1;           //局内能量等级
    _energyExp = 0;             //当前经验
    _energyNeedExp = PLAYER_EXP_BASE; //升级所需经验
    _chargeCannonTime = 0;      //蓄力炮蓄力时间
    _chargeCannonCdTime = 0;    //蓄力炮冷却
    _chargeCannonCooldown = 0;  //蓄力炮冷却总时长
    _chargeCannonCharging = false;
    _chargeCannonReady = false;
    _chargeEffectNode = null;
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
        this._energyLevel = 1;
        this._energyExp = 0;
        this._energyNeedExp = this._getEnergyNeedExp();
        this._chargeCannonTime = 0;
        this._chargeCannonCdTime = 0;
        this._chargeCannonCooldown = 0;
        this._chargeCannonCharging = false;
        this._chargeCannonReady = false;
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
        let maxSpeed = this._getConfigValue("Speed", 0);
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
        Bullet.createBulletEx(type,this.node.position,this._barrelDir,this._fire._lyBarrel.height+20,attackRadius,this._atk,this._camp,this.node.parent,this._map);
        
        if (this._viewMode == false && this._map.enemyCount() > 0) {
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
