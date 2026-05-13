export class NetworkManager {
    private ws: WebSocket = null;
    private _connected: boolean = false;
    private _playerId: number = -1;
    private _roomId: string = "";
    private _tickRate: number = 20;
    private _frameCallbacks: Array<{ frame: number, inputs: Array<{ playerId: number, inputs: any }> }> = [];
    private _inputQueue: Array<{ frame: number, inputs: any }> = [];
    private _currentFrame: number = 0;
    private _expectingFrame: number = 1;
    private _disconnectCallback: () => void = null;
    private _frameCallback: (frameData: any) => void = null;
    private _gameStartCallback: (playerId: number, playerCount: number) => void = null;
    private _playerCountCallback: (count: number, max: number) => void = null;
    private _countdownCallback: (seconds: number) => void = null;

    connect(url: string) {
        if (this.ws) {
            this.ws.close();
        }

        this._connected = false;
        this._playerId = -1;
        this._currentFrame = 0;
        this._expectingFrame = 1;
        this._inputQueue = [];
        this._frameCallbacks = [];

        try {
            this.ws = new WebSocket(url);

            this.ws.onopen = () => {
                console.log("[Network] Connected to server");
                this._connected = true;
                this.ws.send(JSON.stringify({ type: "join" }));
            };

            this.ws.onmessage = (evt) => {
                try {
                    const msg = JSON.parse(evt.data);
                    // console.log("onmessage", msg);
                    this._handleMessage(msg);
                } catch (e) {
                    console.warn("[Network] Invalid message:", e);
                }
            };

            this.ws.onclose = () => {
                console.log("[Network] Disconnected");
                this._connected = false;
                if (this._disconnectCallback) {
                    this._disconnectCallback();
                }
            };

            this.ws.onerror = (e) => {
                console.error("[Network] Error:", e);
            };
        } catch (e) {
            console.error("[Network] Connection failed:", e);
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this._connected = false;
    }

    sendInput(inputs: any) {
        if (!this._connected || !this.ws) return;

        this._currentFrame++;
        // 必须发送“全 false”包，否则服务端会沿用 lastInputs，松手后坦克不会停
        const msg = {
            type: "input",
            frame: this._currentFrame,
            inputs: this._normalizeInputs(inputs),
        };
        this.ws.send(JSON.stringify(msg));
    }

    get connected(): boolean { return this._connected; }
    get playerId(): number { return this._playerId; }
    get tickRate(): number { return this._tickRate; }
    get currentFrame(): number { return this._currentFrame; }

    set onDisconnect(cb: () => void) { this._disconnectCallback = cb; }
    set onGameStart(cb: (playerId: number, playerCount: number) => void) { this._gameStartCallback = cb; }
    set onFrame(cb: (frameData: any) => void) { this._frameCallback = cb; }
    set onPlayerCount(cb: (count: number, max: number) => void) { this._playerCountCallback = cb; }
    set onCountdown(cb: (seconds: number) => void) { this._countdownCallback = cb; }

    private _normalizeInputs(inputs: any) {
        const source = inputs || {};
        return {
            up: !!source.up,
            down: !!source.down,
            left: !!source.left,
            right: !!source.right,
            fire: source.fire ? source.fire : false,
            hit: source.hit ? source.hit : false,
        };
    }

    private _handleMessage(msg: any) {
        switch (msg.type) {
            case "joined":
                console.log(`[Network] Joined room ${msg.roomId}`);
                break;

            case "playerCount":
                console.log(`[Network] Players: ${msg.count}/${msg.max}`);
                if (this._playerCountCallback) {
                    this._playerCountCallback(msg.count, msg.max);
                }
                break;

            case "countdown":
                console.log(`[Network] Countdown: ${msg.seconds}`);
                if (this._countdownCallback) {
                    this._countdownCallback(msg.seconds);
                }
                break;

            case "gameStart":
                this._playerId = msg.playerId;
                this._roomId = msg.roomId;
                this._tickRate = msg.tickRate || 20;
                this._currentFrame = 0;
                console.log(`[Network] Game started as player ${this._playerId}`);
                if (this._gameStartCallback) {
                    this._gameStartCallback(this._playerId, msg.playerCount || 2);
                }
                break;

            case "frame":
                if (this._frameCallback) {
                    this._frameCallback(msg);
                }
                break;

            case "playerLeft":
                console.log(`[Network] Player ${msg.playerId} left`);
                break;

            case "pong":
                break;
        }
    }
}
