import {BaseComponent} from "./base/BaseComponent";
import {Utils} from "./base/Utils";
import {LocalizedData} from "./base/LocalizedData";
import {EnergyItem} from "./EnergyItem";
import { MusicManager } from "./base/MusicManager";
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
import {Analytics} from "./ad/Analytics";
const {ccclass, property} = cc._decorator;

//私有函数,请使用'_'开头
//请修改'NewClass' => 自己的类名
@ccclass
export class GameMap extends BaseComponent {

    @property(cc.Prefab)
    tree01Prefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    tree02Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    mountain01Prefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    mountain02Prefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    mountain03Prefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private enemyPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    private playerPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    private skillPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private energyPrefab: cc.Prefab = null;

    //内部变量
    _tiledMap   = null;     //Tiled Map
    _tmGroup    = null;     //普通层
    _tmObj      = null;     //对象层(障碍物)
    _tmBorn     = null;     //对象层(出生点)
    _tmSize     = null;     //地图尺寸
    _tileSize   = null;     //瓦片尺寸

    _colliders  = [];       //碰撞检测列表
    _checkList  = {};       //A*检测列表
    _logicArea  = [];       //逻辑碰撞分区

    _player             = null;     //玩家
    _enemys             = [];       //敌人列表
    _playerBornPos      = null;     //player出生点
    _enemyBornPos       = [];       //敌人出生点列表
    _bornCdTime         = 0;        //敌人生成间隔时间
    _bornEnemyCount     = 0;        //已经出生的敌人数量
    _deathEnemyCount    = 0;        //已经死亡的敌人数量
    _maxEnemyCount      = 0;        //最大敌人数量
    _timeMaxEnemyCount  = 0;        //同屏最大敌人数量
    _skills             = [];       //随机生成的技能
    _energys            = [];       //地图上的能量
    _energyCdTime       = 0;        //能量生成间隔时间

    _pause          = false;    //是否处于暂停状态
    _gaming         = false;    //是否处于游戏中 
    _killEffectTestMode = false; //击杀效果测试模式
    _playerHitTestMode = false; //受击测试模式
    _upgradeTestMode = false; //升级测试模式
    _levelId        = 1;        //当前关卡id
    _levelConfig    = null;     //当前关卡配置

    _roamFlg        = false;          //漫游标记
    _roamDir        = cc.v2(1,0);     //漫游方向

    _playerLastPos  = 0;

    //加载完成
    onLoad () {
        //开启碰撞监听
        // cc.director.getCollisionManager().enabled = true;

        // //开启绘制碰撞组件的形状
        // cc.director.getCollisionManager().enabledDebugDraw  = true;

        // // 显示碰撞组件的包围盒
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        //初始化变量
        this._initVariable();

        //初始化事件
        this._initEvent();

        //初始化tiled map 的对象(障碍物)
        this._initTmObstacle();
        
        //初始化tiled map 的对象(出生点)
        this._initTmBorn();

    }

    onDestroy() {
        //销毁事件
        this._destroyEvent();
    }
    
    //初始化变量
    _initVariable() {
        this._tiledMap = this.node["$TiledMap"];
        this._tmGroup = this._fire._tmLayerGroup.$TiledLayer;
        // this._fire._tmLayerGroup.active = false;
        this._tmObj = this._fire._tmLayerObstacle.$TiledObjectGroup;
        this._tmBorn = this._fire._tmLayerBorn.$TiledObjectGroup;
        this._tmSize = this.node.getContentSize();
        // this._tmSize = new cc.Size(this._tiledMap.getMapSize().width * this._tiledMap.getTileSize().width, this._tiledMap.getMapSize().height * this._tiledMap.getTileSize().height);
        this._tileSize = this._tiledMap.getTileSize();
    }

    //初始化事件
    _initEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    }

    //销毁事件
    _destroyEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    }

    //初始化tiled map 的对象(障碍物)
    _initTmObstacle(){
        let _startTime = (new Date()).valueOf();
        let objects = this._tmObj.getObjects();
        console.log("objects11",objects)
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            
            //获取位置
            let tiledPos = cc.v2(obj.offset.x + obj.width/2, obj.offset.y + obj.height/2);
            let offset = this._tilePosToGamePos(tiledPos);

            if (obj.name != "") {
                let obstacle;
                if (obj.name == "tree01") {
                    obstacle = cc.instantiate(this.tree01Prefab);
                }
                else if (obj.name == "tree02") {
                    obstacle = cc.instantiate(this.tree02Prefab);
                }
                else if (obj.name == "mountain01") {
                    obstacle = cc.instantiate(this.mountain01Prefab);
                }
                else if (obj.name == "mountain02") {
                    obstacle = cc.instantiate(this.mountain02Prefab);
                }
                else if (obj.name == "mountain03") {
                    obstacle = cc.instantiate(this.mountain03Prefab);
                }
                
                obstacle.parent = this._fire._tmLayerObstacle;
                obstacle.position = cc.v3(offset);
                obstacle.zIndex = this.judgezIndex(offset.y);
            }

            for (let j = 0; j < obj.polylinePoints.length - 1; j++) {
                let start = obj.polylinePoints[j];
                let end = obj.polylinePoints[j+1];
                
                //创建collider line
                let collider = this.node.addComponent(cc.PolygonCollider);
                collider.offset = offset;
                collider.tag = obj.name;
                collider.points[0] = cc.v2(start);
                collider.points[1] = cc.v2(end);
                collider.points.splice(2,2);
                this._colliders.push(collider);
            }

        }

        let _endTime = (new Date()).valueOf();
        let cost = _endTime - _startTime;
        // cc.log("++++++++++++_initTmObstacle time1 ",cost);
        _startTime = (new Date()).valueOf();

        /////////////////////
        let logicWidth = this._tmSize.width/4;
        let logicHeight = this._tmSize.height/4;
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 6; y++) {
                
                let area:any = [];
                area.x = x*logicWidth-this._tmSize.width/2;
                area.y = y*logicHeight-this._tmSize.height/2;
                area.width = logicWidth;
                area.height = logicHeight;

                let rect = new cc.Rect(area.x-10,area.y-10,logicWidth+20,logicHeight+20);
                
                for (let i = 0; i < this._colliders.length; i++) {
                    let collider = this._colliders[i];

                    let A = collider.offset.add(collider.points[0]);
                    let B = collider.offset.add(collider.points[1]);
                    if (this._lineInRect(A,B,rect)) {
                        area.push({A:A,B:B});
                    }
                }
                this._logicArea.push(area);

            }
        }
        /////////////////////

        _endTime = (new Date()).valueOf();
        cost = _endTime - _startTime;
        // cc.log("++++++++++++_initTmObstacle time2 ",cost);

    }

    //初始化tiled map 的对象(出生点)
    _initTmBorn(){
        let objects = this._tmBorn.getObjects();
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            let offset = this._tilePosToGamePos(obj.offset);
            if (obj.name == "player") {
                this._playerBornPos = offset;
            }
            else{
                let tile = this.gamePosToTile(offset);
                let pos = cc.v3(this.tileToGamePos(tile))
                this._enemyBornPos.push(pos);
                // this._tmGroup.setTileGIDAt(5, tile); 
            }
        }

    
    }

    start() {
        let _startTime = (new Date()).valueOf();
        this._checkList = this.initCheckList();
        let _endTime = (new Date()).valueOf();
        let cost = _endTime - _startTime;
        // cc.log("+cost time ",cost);
    }
    
    //生成player
    createPlayer() {
        let playerType = LocalizedData.getIntItem("_current_player_type_",1);
        let playerLevel = LocalizedData.getIntItem(`_player_${playerType}_`, 1);

        this._player = cc.instantiate(this.playerPrefab);
        this._player.parent = this._fire._tmLayerObstacle;
        this._player.position = this._playerBornPos;
        this._player.script.setMap(this);
        this._player.script.setPlayerType(playerType,playerLevel);
        this._player.script.setInGame();
    }

    //生成一个敌人
    createEnemy() {
        if (this.isTestMode()) {
            return;
        }

        //随机精英怪
        let ememyType = 11;
        let random = Math.random()*100;
        if (random < 4) { ememyType = 12; }
        if (random < 1)  { ememyType = 13; }

        let enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        enemy.position = this._enemyBornPos[Math.floor(Math.random()*this._enemyBornPos.length)];
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(ememyType,this._levelId);
        this._enemys.push(enemy);
    }

    //生成一个受击测试敌人
    createPlayerHitTestEnemy() {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }

        let enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        let pos = cc.v2(this._player.position).add(cc.v2(230, 0));
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 80));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11,this._levelId);
        enemy.script._config = Object.assign({}, enemy.script._config);
        enemy.script._config.AttackRadius = 520;
        enemy.script._config.BulletCodeTime = 0.45;
        enemy.script._bulletCodeTime = enemy.script._config.BulletCodeTime;
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
    }

    //生成一个残血测试敌人
    createKillEffectTestEnemy() {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }

        let enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this._fire._tmLayerObstacle;
        let pos = cc.v2(this._player.position).add(cc.v2(260, 0));
        enemy.position = cc.v3(this.clampMapInnerPosition(pos, 80));
        enemy.script.setMap(this);
        enemy.script.setTarget(this._player);
        enemy.script.setEnemyType(11,this._levelId);
        enemy.script._hp = 1;
        enemy.script.refreshHp();
        enemy.zIndex = this.judgezIndex(enemy.y);
        this._enemys.push(enemy);
    }

    //生成一个敌人
    deleteEnemy(delEnemy) {
        for (let i = 0; i < this._enemys.length; i++) {
            let enemy = this._enemys[i];
            if (enemy == delEnemy) {
                if (this._killEffectTestMode) {
                    this._deathEnemyCount +=1;
                    this._enemys.splice(i,1);
                    yyp.eventCenter.emit("current-enemycount",{enemycount:0});
                    break;
                }

                this.createSkillIcon(delEnemy.position);

                this._deathEnemyCount +=1;
                yyp.eventCenter.emit("current-enemycount",{enemycount:this._maxEnemyCount - this._deathEnemyCount});

                this._enemys.splice(i,1);
                break;
            }
        }
    }

    //获取敌人数量
    enemyCount() {
        return this._enemys.length;
    }

    //生成一个技能icon
    createSkillIcon(pos) {
        if (Math.random() < 0.06) {
            let skill = cc.instantiate(this.skillPrefab);
            skill.parent = this._fire._tmLayerObstacle;
            skill.position = pos;
            skill.script.setInGame();
            skill.zIndex = this.judgezIndex(skill.y);
            this._skills.push(skill);
        }
    }

    _getEnergyConfig(key, defaultValue) {
        let config = yyp.config.Energy || {};
        let value = config[key];
        return value == null ? defaultValue : value;
    }

    //随机生成一个能量
    createEnergy() {
        let tile = this._getRandomPassableTile();
        if (tile == null) {
            return;
        }

        let energy = this.energyPrefab ? cc.instantiate(this.energyPrefab) : this._createDefaultEnergy();
        energy.parent = this._fire._tmLayerObstacle;
        energy.position = cc.v3(this.tileToGamePos(tile));
        energy.zIndex = this.judgezIndex(energy.y);

        let energyScript = energy.getComponent(EnergyItem) || energy.addComponent(EnergyItem);
        let value = this._getEnergyConfig("Value", 10);
        let lifeTime = this._getEnergyConfig("LifeTime", 12);
        energyScript.init(value, lifeTime);

        this._energys.push(energy);
    }

    createEnergyAt(pos) {
        let energy = this.energyPrefab ? cc.instantiate(this.energyPrefab) : this._createDefaultEnergy();
        energy.parent = this._fire._tmLayerObstacle;
        energy.position = cc.v3(pos);
        energy.zIndex = this.judgezIndex(energy.y);

        let energyScript = energy.getComponent(EnergyItem) || energy.addComponent(EnergyItem);
        energyScript.init(this._getEnergyConfig("Value", 10), this._getEnergyConfig("LifeTime", 12));
        this._energys.push(energy);
        return energy;
    }

    _createDefaultEnergy() {
        let energy = new cc.Node("EnergyItem");
        energy.addComponent(EnergyItem);
        return energy;
    }

    _getRandomPassableTile() {
        let keys = Object.keys(this._checkList);
        if (keys.length == 0) {
            return null;
        }

        for (let i = 0; i < 20; i++) {
            let item = this._checkList[keys[Math.floor(Math.random() * keys.length)]];
            if (item && this._isEnergyTileEmpty(item)) {
                return cc.v2(item.x, item.y);
            }
        }

        return null;
    }

    _isEnergyTileEmpty(tile) {
        let pos = this.tileToGamePos(tile);
        let minDistance = this._getEnergyConfig("MinDistance", 120);

        if (this._player && cc.isValid(this._player)) {
            let playerLen = pos.sub(this._player.position).mag();
            if (playerLen < minDistance) {
                return false;
            }
        }

        for (let i = 0; i < this._energys.length; i++) {
            let energy = this._energys[i];
            if (cc.isValid(energy)) {
                let len = pos.sub(energy.position).mag();
                if (len < minDistance) {
                    return false;
                }
            }
        }

        return true;
    }

    //获取最近的敌人
    getNearEnemy() {
        let ret = null;
        let retLen = 0;
        for (let i = 0; i < this._enemys.length; i++) {
            let enemy = this._enemys[i];
            
            let enemyPos = cc.v2(enemy.position);
            let playerPos = cc.v2(this._player.position);
            let len = enemyPos.sub(playerPos).mag()
            if (ret == null || len < retLen) {
                ret = enemy;
                retLen = len;
            }
        }

        return ret;
    }
    
    //在同一个tile,还有其他敌人
    isHaveOtherEnemy(enemy) {
        for (let i = 0; i < this._enemys.length; i++) {
            let otherEnemy = this._enemys[i];
            if (otherEnemy != enemy) {
                let tile = this.gamePosToTile(enemy.position);
                let otherTile = this.gamePosToTile(otherEnemy.position);
                if (tile.x == otherTile.x && tile.y == otherTile.y) {
                    return true;       
                }
            }
        }

        return false;
    }

    //按下
    _onTouchStart(event) {
        let a =1;
        // let point = this.node.convertToNodeSpaceAR(event.getLocation());
        // let tile = this.gamePosToTile(point);

    }
    
    resetMap() {

        for (let row = 0; row < this._tiledMap.getMapSize().width; row++) {
            
            for (let col = 0; col < this._tiledMap.getMapSize().height; col++) {
                this._tmGroup.setTileGIDAt(1, cc.v2(row,col));
            }
        }
    }

    //tiled map坐标转换为游戏坐标
    _tilePosToGamePos(tiledPos) {
        let pos = cc.v2(tiledPos.x, this._tmSize.height - tiledPos.y);
        pos.x = pos.x - this._tmSize.width/2;
        pos.y = pos.y - this._tmSize.height/2;

        return pos;
    }

    //tile坐标转换为游戏坐标
    tileToGamePos(tile) {
        let x = tile.x * this._tileSize.width + this._tileSize.width/2;
        let y = tile.y * this._tileSize.height + this._tileSize.height/2;

        return this._tilePosToGamePos(cc.v2(x,y));
    }

    //游戏坐标转换为tiled map坐标
    _gamePosToTilePos(gamePos) {
        let pos = cc.v2(gamePos);
        pos.x = pos.x + this._tmSize.width/2;
        pos.y = pos.y + this._tmSize.height/2;
        pos.y = this._tmSize.height - pos.y;

        return pos;
    }

    //游戏坐标转换为tile坐标
    gamePosToTile(gamePos) {
        let tilePos = this._gamePosToTilePos(gamePos);
        let x = Math.floor(tilePos.x / this._tileSize.width);
        let y = Math.floor(tilePos.y / this._tileSize.height);
        return cc.v2(x, y);
    }


    //初始化A*检测列表
    initCheckList () {
        let ret = {};
        for (let x = 0; x < this._tiledMap.getMapSize().width; x++) {
            for (let y = 0; y < this._tiledMap.getMapSize().height; y++) {
                
                let pos = this.tileToGamePos(cc.v2(x, y));
                if (this.testColliders(pos,50).length == 0) {
                    let item : any= {};
                    item.x = x;
                    item.y = y;
                    item.G = 0;
                    item.H = 0;
                    item.father = null;
                    item.passable = {};
                    ret[x+"_"+y] = item;
                    // this._tmGroup.setTileGIDAt(3, cc.v2(x,y));
                }
            }
        }

        
        for (let x = 0; x < this._tiledMap.getMapSize().width; x++) {
            for (let y = 0; y < this._tiledMap.getMapSize().height; y++) {
                let item = ret[x+"_"+y];
                let pos = this.tileToGamePos(cc.v2(x, y));
                if (item) {
                    
                    for (let newx = x-1; newx <= x+1; newx++){
                        for (let newy = y-1; newy <= y+1; newy++){
                            let newItem = ret[newx+"_"+newy];
                            let newPassableItem = item.passable[newx+"_"+newy];
                            if ((x != newx || y != newy) && newItem && newPassableItem == null){
                                let newpos = this.tileToGamePos(cc.v2(newx, newy));
                                if (this.circleCirclePassColliders(pos,newpos,50) == false) {
                                    item.passable[newx+"_"+newy] = 1;
                                    newItem.passable[x+"_"+y] = 1;
                                }
                            }

                        }
                    }
                }
            }
        }
        return ret;
    }

    //获取A*检测列表
    getCheckList () {
        var objString = JSON.stringify(this._checkList);
        return JSON.parse(objString);
    }
    
    //获取pos所在tile,最近的可通行tile
    getPassableTile (tile,referTile) {
        //判断自己
        // if (this._checkList[tile.x + "_" + tile.y]) {
        //     return tile;
        // }

        //判断一环
        let retTile = null;
        let retLen = 0;
        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++){
                if (x != 0 || y!= 0) {
                    let newx = tile.x + x;
                    let newy = tile.y + y;
                    let newtile = this._checkList[newx + "_" + newy];
                    if (newtile){
                        let len = (referTile.x-newx)*(referTile.x-newx) + (referTile.y-newy)*(referTile.y-newy);
                        if (retTile == null || len < retLen) {
                            retTile = newtile;
                            retLen = len;
                        }
                    }
                    
                }
            }
        }
        if (retTile) {
            return retTile;
        }

        //判断二环
        retTile = null;
        retLen = 0;
        for (let x = -2; x <= 2; x++){
            for (let y = -2; y <= 2; y++){
                if (x == -2 || x == 2 || y == -2 || y == 2) {
                    let newx = tile.x + x;
                    let newy = tile.y + y;
                    let newtile = this._checkList[newx + "_" + newy];
                    if (newtile){
                        let len = (referTile.x-newx)*(referTile.x-newx) + (referTile.y-newy)*(referTile.y-newy);
                        if (retTile == null || len < retLen) {
                            retTile = newtile;
                            retLen = len;
                        }
                    }
                    
                }
            }
        }
        if (retTile) {
            return retTile;
        }

        return tile;
    }

    //获取pos所在tile,最近的可通行tile
    getPassableTileEx (tile) {
        //判断一环
        let retTiles = [];
        for (let x = -2; x <= 2; x++){
            for (let y = -2; y <= 2; y++){
                if (x != 0 || y!= 0) {
                    let newx = tile.x + x;
                    let newy = tile.y + y;
                    let newtile = this._checkList[newx + "_" + newy];
                    if (newtile){
                        retTiles.push(newtile);
                    }
                    
                }
            }
        }

        if (retTiles.length > 0) {
            let index = Math.floor(Math.random()*retTiles.length);
            return retTiles[index];
        }

        return tile;
    }

    // 线段PP1,是否会经过colliders中的一条线段
    lineLinePassColliders(P,P1){
        for (let i = 0; i < this._colliders.length; i++) {
            let collider = this._colliders[i];

            let A = collider.offset.add(collider.points[0]);
            let B = collider.offset.add(collider.points[1]);
            if (Utils.linePassLine(P,P1,A,B)){
                return true;
            }
        }

        return false;
    }

    // 点P,P1为圆心,radius为半径的圆,是否会经过colliders中的一条线段
    circleCirclePassColliders(P,P1,radius){
        for (let i = 0; i < this._colliders.length; i++) {
            let collider = this._colliders[i];

            let A = collider.offset.add(collider.points[0]);
            let B = collider.offset.add(collider.points[1]);
            if (Utils.circleCirclePassLine(P,P1,radius,A,B)){
                return true;
            }
        }

        return false;
    }

    //碰撞测试(以点P为圆心,半径为radius的圆,是否和colliders中的线段相交)
    testColliders(P, radius){
        let colliderItems = [];
        for (const key in this._colliders) {
            if (this._colliders.hasOwnProperty(key)) {
                let collider = this._colliders[key];
                
                let A = collider.offset.add(collider.points[0]);
                let B = collider.offset.add(collider.points[1]);
                let colliderItem = Utils.getPointLineShortestInfo(P, A, B);
                
                if (colliderItem.len <= radius) {
                    colliderItem.collider = collider;
                    colliderItems.push(colliderItem);
                }
            }
        }

        return colliderItems;
    }

    //每帧调用
    update(dt) {
        if (this._pause) return;
        
        if (this._gaming) {
            this._bornCdTime += dt;
            if (this.isTestMode() == false &&
                this._bornCdTime > 1 &&
                this._enemys.length < this._timeMaxEnemyCount &&
                this._bornEnemyCount < this._maxEnemyCount) {

                this._bornCdTime = 0;
                this.createEnemy();
                this._bornEnemyCount += 1;
            }
    
            //地图滚动
            this.rollMap();

            if (this.isTestMode() == false) {
                this._updateEnergy(dt);
            }

            if (this._player && cc.isValid(this._player)) {
                this._playerLastPos = this._player.position
            }
        }
        else{
            if (this._roamFlg) {
                let roamPosition = cc.v2(this.node.position).add(this._roamDir);
                roamPosition = this._correctMapPosition(roamPosition);
                if (roamPosition.x == this.node.x && roamPosition.y == this.node.y) {
                    this._roamDir.x = Math.floor(Math.random()*3)-1;
                    this._roamDir.y = Math.floor(Math.random()*3)-1;
                }
                else{
                    this.node.x = roamPosition.x;
                    this.node.y = roamPosition.y;
                }
            }
        }
    }

    //地图滚动
    rollMap(){
        if (this._player && cc.isValid(this._player)) {
            let ret = this._correctMapPosition(cc.v2(-this._player.x,-this._player.y));
            this.node.x = ret.x;
            this.node.y = ret.y;
        }
    }

    _getViewportSize() {
        let canvas = Utils.getCurrentSceneCanvas();
        if (canvas && cc.isValid(canvas)) {
            return canvas.getContentSize();
        }
        let visibleSize = cc.view.getVisibleSize();
        if (visibleSize && visibleSize.width > 0 && visibleSize.height > 0) {
            return visibleSize;
        }
        if (yyp.gameFrameSize) {
            return yyp.gameFrameSize;
        }
        return cc.winSize;
    }

    clampMapInnerPosition(pos, padding = 0) {
        let ret = cc.v2(pos);
        let halfWidth = Math.max(0, this._tmSize.width / 2 - padding);
        let halfHeight = Math.max(0, this._tmSize.height / 2 - padding);

        if (ret.x < -halfWidth) {
            ret.x = -halfWidth;
        }
        if (ret.x > halfWidth) {
            ret.x = halfWidth;
        }
        if (ret.y < -halfHeight) {
            ret.y = -halfHeight;
        }
        if (ret.y > halfHeight) {
            ret.y = halfHeight;
        }

        return ret;
    }
    
    _correctMapPosition(ret){
        let viewportSize = this._getViewportSize();
        let x = Math.max(0, (this._tmSize.width - viewportSize.width) / 2);
        let y = Math.max(0, (this._tmSize.height - viewportSize.height) / 2);
        let minPos = cc.v2(-x,-y);
        let maxPos = cc.v2(x,y);

        if (ret.x < minPos.x) {
            ret.x = minPos.x;
        }
        if (ret.x > maxPos.x) {
            ret.x = maxPos.x;
        }
        if (ret.y < minPos.y) {
            ret.y = minPos.y;
        }
        if (ret.y > maxPos.y) {
            ret.y = maxPos.y;
        }

        return ret;
    }

    //线段与矩形相交或者包含在矩形里面
    _lineInRect(A,B,rect){
        if ((A.x >= rect.x && A.x <= rect.x + rect.width && A.y >= rect.y && A.y <= rect.y + rect.height) ||
            (B.x >= rect.x && B.x <= rect.x + rect.width && B.y >= rect.y && B.y <= rect.y + rect.height) ||
            cc.Intersection.lineRect(A,B,rect) ) {
                return true;
        }
        return false;
    }

    //子弹,障碍物碰撞检测
    bulletObstacleCollisionTest(P,P1){
        return this.getBulletObstacleCollisionSegment(P, P1) != null;
    }

    getBulletObstacleCollisionSegment(P, P1) {
        //获取碰撞区
        let currArea = null;
        for (let i = 0; i < this._logicArea.length; i++) {
            let area = this._logicArea[i];
            if (P.x >= area.x && P.x <= area.x + area.width && P.y >= area.y && P.y <= area.y + area.height) {
                currArea = area;
                break;
            }
        }

        if (currArea) {
            for (let i = 0; i < currArea.length; i++) {
                let A = currArea[i].A;
                let B = currArea[i].B;
                if (cc.Intersection.lineLine(P,P1,A,B)) {
                    return {A: A, B: B};
                }
            }
        }
        else{
            // cc.log("未找到碰撞分区")
        }
        
        return null;
    }

    
    //子弹,碰撞检测
    bulletEnemyCollisionTest(P,camp){
        if (camp == "player") {
            for (let i = 0; i < this._enemys.length; i++) {
                let enemy = this._enemys[i];
                
                let len = P.sub(enemy.position).mag();
                let radius = enemy.script.getRadius();
                if (len < radius) {
                    return enemy;
                }
            }
        }
        else{
            if (this._player && cc.isValid(this._player)) {
                let len = P.sub(this._player.position).mag();
                let radius = this._player.script.getRadius();
                if (len < radius) {
                    return this._player;
                }
            }
        }

        return null;
    }

    //玩家和技能icon,碰撞检测
    playerSkillIconCollisionTest(){
        for (let i = 0; i < this._skills.length; i++) {
            let skill = this._skills[i];
            if (cc.isValid(skill)) {
                let playerRect = this._player.script.getPlayerBoundingBox();
                let skillRect = skill.script.getSkillBoundingBox();
                if (cc.Intersection.rectRect(playerRect,skillRect)) {
                    skill.script.emitSkill();
                    this._skills.splice(i,1);
                    skill.destroy();
                    return;
                }
            }
            else{
                this._skills.splice(i,1);
            }
        }

        this.playerEnergyCollisionTest();
    }

    //玩家和能量,碰撞检测
    playerEnergyCollisionTest(){
        for (let i = 0; i < this._energys.length; i++) {
            let energy = this._energys[i];
            if (cc.isValid(energy)) {
                let energyScript = energy.getComponent(EnergyItem);
                if (!energyScript) {
                    this._energys.splice(i, 1);
                    energy.destroy();
                    return;
                }
                let playerRect = this._player.script.getPlayerBoundingBox();
                let energyRect = energyScript.getEnergyBoundingBox();
                if (cc.Intersection.rectRect(playerRect, energyRect)) {
                    this._player.script.addEnergy(energyScript.getValue());
                    this._energys.splice(i, 1);
                    energy.destroy();
                    return;
                }
            }
            else{
                this._energys.splice(i,1);
            }
        }
    }

    _updateEnergy(dt) {
        this._energyCdTime += dt;
        let interval = this._getEnergyConfig("BornInterval", 4);
        let maxCount = this._getEnergyConfig("MaxCount", 6);
        if (this._energyCdTime < interval || this._energys.length >= maxCount) {
            return;
        }

        this._energyCdTime = 0;
        this.createEnergy();
    }

    //计算zIndex
    judgezIndex(y){
        return this._tmSize.height - Math.floor(y);
    }

    //开始游戏
    startGame(func){
        //获取关卡数据
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData.getIntItem("_level1_",1);
        this._killEffectTestMode = false;
        this._playerHitTestMode = false;
        this._maxEnemyCount = this._levelConfig.EnemyCount * this._levelId;
        this._timeMaxEnemyCount = this._levelConfig.Max + Math.floor(this._levelId/5);
        yyp.eventCenter.emit("current-levelid",{levelid:this._levelId});
        yyp.eventCenter.emit("current-enemycount",{enemycount:this._maxEnemyCount});

        this._roamFlg = false;
        
        let will = this._correctMapPosition(cc.v2(-this._playerBornPos.x,-this._playerBornPos.y));
        let self = this;
        this.node.runAction(cc.sequence(
            cc.moveTo(0.2,will),
            cc.callFunc(function(){
                self.createPlayer();
                self._gaming = true;
                func();
            })
        ));
        Analytics.getInstance().eventEx('start_game',{"level":this._levelId});
    }

    startKillEffectTestGame(func){
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData.getIntItem("_level1_",1);
        this._killEffectTestMode = true;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid",{levelid:this._levelId});
        yyp.eventCenter.emit("current-enemycount",{enemycount:1});

        this._roamFlg = false;
        let will = this._correctMapPosition(cc.v2(-this._playerBornPos.x,-this._playerBornPos.y));
        let self = this;
        this.node.runAction(cc.sequence(
            cc.moveTo(0.2,will),
            cc.callFunc(function(){
                self.createPlayer();
                self.createKillEffectTestEnemy();
                self._gaming = true;
                func();
            })
        ));
    }

    startPlayerHitTestGame(func){
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData.getIntItem("_level1_",1);
        this._killEffectTestMode = false;
        this._playerHitTestMode = true;
        this._upgradeTestMode = false;
        this._maxEnemyCount = 1;
        this._timeMaxEnemyCount = 1;
        this._bornEnemyCount = 1;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid",{levelid:this._levelId});
        yyp.eventCenter.emit("current-enemycount",{enemycount:1});

        this._roamFlg = false;
        let will = this._correctMapPosition(cc.v2(-this._playerBornPos.x,-this._playerBornPos.y));
        let self = this;
        this.node.runAction(cc.sequence(
            cc.moveTo(0.2,will),
            cc.callFunc(function(){
                self.createPlayer();
                self.createPlayerHitTestEnemy();
                self._gaming = true;
                func();
            })
        ));
    }

    startUpgradeTestGame(func){
        this._levelConfig = yyp.config.Level[0];
        this._levelId = LocalizedData.getIntItem("_level1_",1);
        this._killEffectTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = true;
        this._maxEnemyCount = 0;
        this._timeMaxEnemyCount = 0;
        this._bornEnemyCount = 0;
        this._deathEnemyCount = 0;
        this._bornCdTime = 0;
        yyp.eventCenter.emit("current-levelid",{levelid:this._levelId});
        yyp.eventCenter.emit("current-enemycount",{enemycount:0});

        this._roamFlg = false;
        let will = this._correctMapPosition(cc.v2(-this._playerBornPos.x,-this._playerBornPos.y));
        let self = this;
        this.node.runAction(cc.sequence(
            cc.moveTo(0.2,will),
            cc.callFunc(function(){
                self.createPlayer();
                self._gaming = true;
                func();
            })
        ));
    }

    isTestMode() {
        return this._killEffectTestMode || this._playerHitTestMode || this._upgradeTestMode;
    }

    isKillEffectTestMode() {
        return this._killEffectTestMode;
    }

    handleKillEffectTestEnemyDeath(enemyNode) {
        if (!enemyNode || !cc.isValid(enemyNode)) {
            return;
        }

        let deathPos = cc.v2(enemyNode.position);
        this.deleteEnemy(enemyNode);
        if (enemyNode.script) {
            enemyNode.script.enabled = false;
        }
        enemyNode.stopAllActions();
        this._showKillSkull(deathPos);
        this.node.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(() => {
                this._showPlayerBubble("就这？");
            })
        ));

        let self = this;
        this.node.runAction(cc.sequence(
            cc.delayTime(0.15),
            cc.callFunc(function(){
                self._showKillExplosion(deathPos);
                self._dropTestEnergy(deathPos);
                if (cc.isValid(enemyNode)) {
                    enemyNode.destroy();
                }
            })
        ));
    }

    _showKillSkull(pos) {
        let skull = new cc.Node("_killSkull");
        skull.parent = this._fire._tmLayerObstacle;
        skull.setPosition(cc.v3(pos.x, pos.y + 85, 0));
        skull.zIndex = 6000;
        skull.opacity = 0;
        skull.scale = 1;
        let label = skull.addComponent(cc.Label);
        label.string = "💀";
        label.fontSize = 48;
        label.lineHeight = 52;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        skull.runAction(cc.sequence(
            cc.spawn(
                cc.moveBy(0.1, 0, 34),
                cc.fadeTo(0.1, 255),
                cc.scaleTo(0.1, 0.5)
            ),
            cc.delayTime(0.3),
            cc.fadeOut(0.1),
            cc.removeSelf()
        ));
    }

    _showKillExplosion(pos) {
        let boom = cc.instantiate(this._player.script.boomPrefab);
        boom.parent = this._fire._tmLayerObstacle;
        boom.position = cc.v3(pos);
        boom.zIndex = 6000;
        let ani = boom.getComponent(cc.Animation);
        if (ani) {
            ani.play("boom2");
        }
        boom.runAction(cc.sequence(cc.delayTime(0.8), cc.removeSelf()));
        MusicManager.playEffect("boom");
        this.playLightScreenShake();
    }

    _dropTestEnergy(pos) {
        let fromPos = cc.v2(pos);
        let toPos = this.clampMapInnerPosition(fromPos.add(cc.v2(70, 35)), 40);
        let energy = this.createEnergyAt(fromPos);
        energy.scale = 0.2;
        energy.runAction(cc.spawn(
            cc.scaleTo(0.28, 1),
            cc.jumpTo(0.35, toPos, 42, 1)
        ));
    }

    _showPlayerBubble(text) {
        if (!this._player || !cc.isValid(this._player)) {
            return;
        }

        let bubble = new cc.Node("_killBubble");
        bubble.parent = this._fire._tmLayerObstacle;
        bubble.setPosition(cc.v3(this._player.x, this._player.y + 105, 0));
        bubble.zIndex = 6000;

        let bg = bubble.addComponent(cc.Graphics);
        bg.fillColor = cc.color(255, 255, 255, 235);
        bg.roundRect(-58, -24, 116, 48, 12);
        bg.fill();
        bg.strokeColor = cc.color(40, 40, 40, 240);
        bg.lineWidth = 2;
        bg.roundRect(-58, -24, 116, 48, 12);
        bg.stroke();

        let labelNode = new cc.Node("_lbBubble");
        labelNode.parent = bubble;
        labelNode.setContentSize(116, 48);
        let label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = 24;
        label.lineHeight = 28;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        labelNode.color = cc.color(20, 20, 20);

        bubble.runAction(cc.sequence(
            cc.spawn(cc.moveBy(0.15, 0, 12), cc.fadeIn(0.15)),
            cc.delayTime(1),
            cc.fadeOut(0.25),
            cc.removeSelf()
        ));
    }

    _shakeMap() {
        let origin = cc.v3(this.node.position);
        this.node.stopActionByTag(9101);
        let action = cc.sequence(
            cc.moveBy(0.03, 4, 0),
            cc.moveBy(0.03, -8, 0),
            cc.moveBy(0.03, 4, 3),
            cc.moveBy(0.03, 0, -3),
            cc.callFunc(() => {
                this.node.setPosition(origin);
            })
        );
        action.setTag(9101);
        this.node.runAction(action);
    }

    playPlayerCritFeedback() {
        let origin = cc.v3(this.node.position);
        this.node.stopActionByTag(9102);
        let action = cc.sequence(
            cc.moveBy(0.02, 2, 0),
            cc.moveBy(0.02, -4, 0),
            cc.moveBy(0.02, 2, 1),
            cc.moveBy(0.02, 0, -1),
            cc.callFunc(() => {
                this.node.setPosition(origin);
            })
        );
        action.setTag(9102);
        this.node.runAction(action);
    }

    playLightScreenShake() {
        let origin = cc.v3(this.node.position);
        this.node.stopActionByTag(9103);
        let action = cc.sequence(
            cc.moveBy(0.02, 2, 0),
            cc.moveBy(0.02, -4, 0),
            cc.moveBy(0.02, 2, 1),
            cc.moveBy(0.02, 0, -1),
            cc.callFunc(() => {
                this.node.setPosition(origin);
            })
        );
        action.setTag(9103);
        this.node.runAction(action);
    }

    //设置结束
    setFinish(){
        this._gaming = false;
    }

    cleanMap(){
        this.node.stopAllActions();
        this._gaming = false;
        this._pause = false;
        this._killEffectTestMode = false;
        this._playerHitTestMode = false;
        this._upgradeTestMode = false;
        if (this._player && cc.isValid(this._player)){
            this._player.destroy();
            this._player = null;
        }
        
        for (let i = 0; i < this._enemys.length; i++) {
            let enemy = this._enemys[i];
            enemy.destroy();
        }
        this._enemys = [];

        for (let i = 0; i < this._skills.length; i++) {
            let skill = this._skills[i];
            if (cc.isValid(skill)) {
                skill.destroy();
            }
        }
        this._skills = [];

        for (let i = 0; i < this._energys.length; i++) {
            let energy = this._energys[i];
            if (cc.isValid(energy)) {
                energy.destroy();
            }
        }
        this._energys = [];

        this._bornEnemyCount = 0;
        this._deathEnemyCount = 0;
        this._maxEnemyCount = 0;
        this._timeMaxEnemyCount = 0;
        this._energyCdTime = 0;
        this._roamFlg = true;
        this._clearRuntimeMapNodes();
    }

    _clearRuntimeMapNodes(){
        let runtimeNames = {
            "Player": true,
            "Enemy": true,
            "Bullet": true,
            "Boom": true,
            "SkillIcon": true,
            "EnergyItem": true,
            "_killSkull": true,
            "_killBubble": true,
            "_upgradeFloat": true,
            "_bulletMutationMedal": true
        };
        let children = this._fire._tmLayerObstacle.children.slice();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (cc.isValid(child) && runtimeNames[child.name]) {
                child.destroy();
            }
        }
    }
    
    isMap(){
        return true;
    }

    //复活
    revive(){
        this.createPlayer();
        this._player.position = this._playerLastPos;
        for (let i = 0; i < this._enemys.length; i++) {
            let enemy = this._enemys[i];
            enemy.script.setTarget(this._player);
        }
    }

    pause(){
        this._pause = true;
    }

    resume(){
        this._pause = false;
    }
}
