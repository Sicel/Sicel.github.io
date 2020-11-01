//"use strict";
import {
    Character
} from './player.js';
import {
    Label,
    Button,
    inGameMusic
} from './utilities.js';
import {
    createGround,
    ground,
    updateGround
} from './stage.js';
import {
    app,
    appWidth,
    appHeight
} from './main.js';


let stage;
let gameStarted = false;

let paused = false;
let startScene, playButton, ipod, currentSong;
let gameScene, character, pauseButton, backGround, middleGround, time, time2, timeLabel, groundSlide;
let endScene, stopButton, replayButton, timeSurvived, end;
let song;

export function init() {

    stage = app.stage;
    startScene = new PIXI.Container();
    gameScene = new PIXI.Container();
    endScene = new PIXI.Container();

    pauseButton = new Button("pause");
    stopButton = new Button("stop");
    replayButton = new Button("replay");

    startScene.visible = true;
    gameScene.visible = false;
    endScene.visible = false;

    stage.addChild(startScene);
    stage.addChild(gameScene);
    stage.addChild(endScene);

    // Start Scene
    playButton = new Button("play", appWidth / 2, 3 * appHeight / 4);
    playButton.anchor.set(0.5, 0.5);
    playButton.on("mousedown", startGame);

    ipod = new PIXI.Sprite(PIXI.Texture.fromImage("AudioRun/images/Audio Run/title_audioRun_1.png"));
    ipod.width = appWidth;
    ipod.height = appHeight;
    ipod.x = 0;
    ipod.y = 0;

    startScene.addChild(ipod);
    startScene.addChild(playButton);

    // End Scene
    timeSurvived = new Label(`Time Survived: `, appWidth / 2, appHeight / 5, 36, "Verdana", 0xFFFFFF);
    timeSurvived.anchor.set(0.5, 0.5);

    end = new PIXI.Sprite(PIXI.Texture.fromImage("AudioRun/images/Audio Run/end_audioRun_1.png"));
    end.width = appWidth;
    end.height = appHeight;
    end.x = 0;
    end.y = 0;

    replayButton = new Button("replay", appWidth / 2, 3 * appHeight / 5);
    stopButton = new Button("stop", appWidth / 2, 4 * appHeight / 5);

    replayButton.on("mousedown", restart);
    stopButton.on("mousedown", returnToMain);

    endScene.addChild(end);
    endScene.addChild(replayButton);
    endScene.addChild(stopButton);
    endScene.addChild(timeSurvived);
}

export function gameSetup(stages) {
    time = 0;
    time2 = 0;

    groundSlide = 5;

    backGround = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage("AudioRun/images/Cyber Punk/far-buildings.png"), appWidth, 192);
    backGround.scale.set(3.5);
    backGround.x = 0;
    backGround.y = 0;
    backGround.tilePosition.x = 0;
    backGround.tilePosition.y = 0;

    middleGround = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage("AudioRun/images/Cyber Punk/back-buildings.png"), appWidth, 192);
    middleGround.scale.set(2.5);
    middleGround.x = 0;
    middleGround.y = 100;
    middleGround.tilePosition.x = 0;
    middleGround.tilePosition.y = 0;

    character = new Character(300, 200);

    pauseButton = new Button("pause", appWidth, 0);
    pauseButton.anchor.set(1, 0);
    pauseButton.scale.set(1.5);
    pauseButton.on("mousedown", pause);

    timeLabel = new Label("Time: ", appWidth / 2, 5, 20, "Verdana", 0xFFFFFF);
    timeLabel.anchor.set(0.5, 0);

    gameScene.addChild(backGround);
    gameScene.addChild(middleGround);
    gameScene.addChild(timeLabel);
    gameScene.addChild(pauseButton);
    gameScene.addChild(character);

    createGround();
}


export function startGame() {
    startScene.visible = false;
    gameScene.visible = true;
    restart();
    gameStarted = true;
}

// Pause
export function pause() {
    if (paused) {
        gameStarted = true;
        paused = false;
        song.paused = false;

    } else {
        gameStarted = false;
        paused = true;
        song.paused = true;
    }
}


export function returnToMain() {
    endScene.visible = false;
    startScene.visible = true;
}

export function gameOver() {
    createjs.Sound.stop();
    gameScene.visible = false;
    endScene.visible = true;
    gameStarted = false;
}

function restart() {
    ground.forEach(function (floor) {
        gameScene.removeChild(floor);
    })
    updateGround([]);
    currentSong = 'game' + Math.floor(Math.random() * inGameMusic.length);
    song = createjs.Sound.play(currentSong);
    song.volume = 0.2;
    createGround();
    time = 0;
    time2 = 0;
    character.x = 300;
    character.y = 200;
    character.vy = 0;
    character.speed = 7;
    groundSlide = 5;
    backGround.tilePosition.x = 0;
    middleGround.tilePosition.x = 0;
    endScene.visible = false;
    gameScene.visible = true;
    gameStarted = true;
}

export function updateTime(value) {
    time = value;
}

export function updateTime2(value) {
    time2 = value;
}

export function updateGroundSlide(value) {
    groundSlide = value;
}

export function updateTimeSurvived() {
    timeSurvived.text = `You Survived for\n  ${time.toFixed(2)} seconds`;
}

export {
    gameStarted,
    startScene,
    playButton,
    ipod,
    currentSong,
    gameScene,
    character,
    pauseButton,
    backGround,
    middleGround,
    time,
    time2,
    timeLabel,
    groundSlide,
    timeSurvived
}
