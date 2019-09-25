"use strict";

let stage = app.stage;
let gameStarted = false;

let paused = false;
let startScene, playButton, ipod, currentSong;
let gameScene, character, pauseButton, backGround, middleGround, time, time2, timeLabel, groundSlide;
let endScene, stopButton, replayButton, timeSurvived, end;

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

function startGame() {
    startScene.visible = false;
    gameScene.visible = true;
    restart();
    gameStarted = true;
}

// Pause
function pause() {
    if (paused) {
        gameStarted = true;
        paused = false;
    } else {
        gameStarted = false;
        paused = true;
    }
}

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

function returnToMain() {
    endScene.visible = false;
    startScene.visible = true;
}

function gameOver() {
    createjs.Sound.stop();
    gameScene.visible = false;
    endScene.visible = true;
    gameStarted = false;
}

function restart() {
    ground.forEach(function (floor) {
        gameScene.removeChild(floor);
    })
    ground = [];
    currentSong = 'game' + Math.floor(Math.random() * inGameMusic.length);
    createjs.Sound.play(currentSong);
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
