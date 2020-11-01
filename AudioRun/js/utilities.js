// "use strict";
export let left, up, right, down, a, w, d, s;
let menuMusic = [];
export let inGameMusic = [];
export let sound;
export let allSongsLoaded = false;
let endMusic = [];
let songsLoaded = 0;
let loadCircle;
let gameWindow;

//inGameMusic = [
//    {
//        src: 'InGame/Punch Deck - Feel the Pulse.wav',
//        id: 'game0'
//    },
//    {
//        src: 'InGame/Punch Deck - Organic to Synthetic.wav',
//        id: 'game1'
//    },
//    {
//        src: 'InGame/Signal in the Noise.wav',
//        id: 'game2'
//    }
//];


function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
        if (event.code === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    key.upHandler = event => {
        if (event.code === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

export function utilInit() {
    gameWindow = document.querySelector("#game");
    loadCircle = document.querySelector("#loader");

    inGameMusic = [
        {
            src: 'InGame/Punch Deck - Feel the Pulse.wav',
            id: 'game0'
    },
        {
            src: 'InGame/Punch Deck - Organic to Synthetic.wav',
            id: 'game1'
    },
        {
            src: 'InGame/Signal in the Noise.wav',
            id: 'game2'
    }
];
    createjs.Sound.registerSounds(inGameMusic, "AudioRun/music/");
    createjs.Sound.on('fileload', loadAudio);
    createjs.Sound.volume = 0.25;
    left = keyboard("ArrowLeft");
    up = keyboard("ArrowUp");
    right = keyboard("ArrowRight");
    down = keyboard("ArrowDown");
    a = keyboard("KeyA");
    w = keyboard("KeyW");
    d = keyboard("KeyD");
    s = keyboard("KeyS");
}

function loadAudio(event) {
    songsLoaded++;
    if (songsLoaded == inGameMusic.length) {
        loadCircle.style.display = "none";
        gameWindow.style.display = "block";
    }
}

export function detectCollision(obj1, obj2) {
    let collision, combinedHalfWidths, combinedHalfHeights, vx, vy;

    collision = false;

    obj1.centerX = obj1.x + obj1.width / 2;
    obj1.centerY = obj1.y + obj1.height / 2;
    obj2.centerX = obj2.x + obj2.width / 2;
    obj2.centerY = obj2.y + obj2.height / 2;

    obj1.halfWidth = obj1.width / 2;
    obj1.halfHeight = obj1.height / 2;
    obj2.halfWidth = obj2.width / 2;
    obj2.halfHeight = obj2.height / 2;

    vx = obj1.centerX - obj2.centerX;
    vy = obj1.centerY - obj2.centerY;

    combinedHalfWidths = obj1.halfWidth + obj2.halfWidth;
    combinedHalfHeights = obj1.halfHeight + obj2.halfHeight;

    if (Math.abs(vx) < combinedHalfWidths) {
        if (Math.abs(vy) < combinedHalfHeights) {
            collision = true;
        } else {
            collision = false;
        }
    } else {
        collision = false;
    }

    return collision;
}

export class Label extends PIXI.Text {
    constructor(text = "", x = 0, y = 0, fontSize = 40, fontFamily = "Verdana", textColor = 0x000000) {
        super(text);
        this.x = x;
        this.y = y;
        this.style = new PIXI.TextStyle({
            fill: textColor,
            fontSize: fontSize,
            fontFamily: fontFamily
        })
    }
}

export class Button extends PIXI.Sprite {
    constructor(type = "", x = 0, y = 0, width = 300, height = 150, color = 0xD3D3D3) {
        super();
        switch (type) {
            case "play":
                this.button = [
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Play Button/play_0.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Play Button/play_1.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Play Button/play_2.png")
                ];
                break;

            case "pause":
                this.button = [
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Pause Button/pause_0.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Pause Button/pause_1.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Pause Button/pause_2.png")
                ];
                break;

            case "stop":
                this.button = [
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Stop Button/stop_0.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Stop Button/stop_1.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Stop Button/stop_2.png")
                ];
                break;

            case "replay":
                this.button = [
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Replay Button/replay_0.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Replay Button/replay_1.png"),
                    new PIXI.Texture.fromImage("AudioRun/images/Buttons/Replay Button/replay_2.png")
                ];
                break;
        }
        this.texture = this.button[0];
        this.scale.set(3);
        this.anchor.set(0.5, 0.5);
        this.x = x;
        this.y = y;
        this.buttonMode = true;
        this.interactive = true;
        this.on('mousedown', this.onButtonDown)
            .on('mouseup', this.onButtonUp)
            .on('mouseupoutside', this.onButtonUp)
            .on('mouseover', this.onButtonOver)
            .on('mouseout', this.onButtonOut);
    }

    onButtonDown() {
        this.isdown = true;
        this.texture = this.button[2];
        this.alpha = 1;
    }

    onButtonUp() {
        this.isdown = false;
        if (this.isOver) {
            this.texture = this.button[1];
        } else {
            this.texture = this.button[0];
        }
    }

    onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this.button[1];
    }

    onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this.button[0];
    }
}
