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
    }

    //设置坦克类型
    setPlayerType(tankType,playerLevel) {
        super.setTankType(tankType);
        
        //计算玩家血量 攻击
        this._level = playerLevel;
        this._hp = this._maxHp = this._config.HP * (this._level+1);
        this._atk = this._config.ATK * (this._level+1);
    }

    //初始化UI
    _initUI(){
        this._fire._lifebar.active = false;
        this._fire._spArmour.active = false;
        this._fire._spSkill2.active = false;
        this._fire._spSkill3.active = false;
        this._refreshFreeBulletBar();
    }

    //初始化接收事件
    _initEvent() {
        yyp.eventCenter.on('joy-stick',this._doJoyStick,this);      //摇杆事件
        yyp.eventCenter.on('joy-stick-shoot',this._doShootJoyStick,this); //射击摇杆事件
        yyp.eventCenter.on('trigger-skill',this._doSkill,this);     //触发技能
    }
       
    //销毁事件
    _destroyEvent() {
        yyp.eventCenter.off('joy-stick',this._doJoyStick,this);     //摇杆事件
        yyp.eventCenter.off('joy-stick-shoot',this._doShootJoyStick,this); //射击摇杆事件
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
    
    //触发技能
    _doSkill(event) {
        if (this._inGame) {
            let skillId = event.skillId;    //方向
            // cc.log("触发了技能 ",skillId);
            if (skillId == 0) {
                yyp.eventCenter.emit('add-coin',{count:this._config.Coin/10,position:Utils.getWorldPosition(this.node)});
            }
            else if (skillId == 1) {
                this._hp += this._maxHp/2;
                if (this._hp > this._maxHp) {
                    this._hp == this._maxHp;
                }
                this.refreshHp();
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

    update(dt){

        if (this._inGame) {
            if (this._map._pause) return;
            this._bulletCodeTime += dt;
            this._updateFreeBulletRecover(dt);
            
            //玩家和技能icon,碰撞检测
            this._map.playerSkillIconCollisionTest();

            this._refreshPosition(dt);
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
            this._dir = Utils.vectorsRotateDegress(this._dir,-0.5);
            this.node.angle = Utils.vectorsToDegress(this._dir);
            this._barrelDir = this._dir;
            this.shooting(dt);
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
