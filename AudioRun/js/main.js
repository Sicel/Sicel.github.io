"use strict";
$.getScript("project4/js/stage.js");
$.getScript("project4/js/scenes.js");
const app = new PIXI.Application(1024, 576);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let game = document.querySelector("#game");

game.appendChild(app.view);

const appWidth = app.screen.width;
const appHeight = app.screen.height;

PIXI.loader.add(["project4/images/New Piskel.png"]).on("progress", e => {
    console.log(`progress=${e.progress}`)
}).load(Setup);

function Setup() {
    time = 0;
    time2 = 0;

    groundSlide = 5;

    backGround = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage("project4/images/Cyber Punk/far-buildings.png"), appWidth, 192);
    backGround.scale.set(3.5);
    backGround.x = 0;
    backGround.y = 0;
    backGround.tilePosition.x = 0;
    backGround.tilePosition.y = 0;

    middleGround = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage("project4/images/Cyber Punk/back-buildings.png"), appWidth, 192);
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

    app.ticker.add(delta => GameLoop(delta));
}

function inBounds() {
    if (character.x <= 0) {
        character.x = 0;
    }
    if (character.x >= appWidth - character.width) {
        character.x = appWidth - character.width;
    }
}

function GameLoop(delta) {

    if (gameStarted) {
        let grav = 1.5;
        let x, y;
        let onGround = false;
        let speedIncrease = 0.3;

        backGround.tilePosition.x -= 0.128;
        middleGround.tilePosition.x -= 0.64;

        time += 1 / app.ticker.FPS;
        time2 += 1 / app.ticker.FPS;
        timeLabel.text = `Time: ${time.toFixed(2)}`;

        character.vy += grav * delta;
        character.move(delta);

        ground = ground.filter(g => g.onScreen);

        ground.forEach(function (floor) {
            floor.x -= groundSlide * delta;
            if (detectCollision(character, floor)) {
                if (character.prevY <= floor.y - character.height) {
                    character.vy = 0;
                    character.y = floor.y - character.height;
                    character.x -= groundSlide;
                    onGround = true;
                } else {
                    if (character.prevX > floor.x + (2 * floor.width / 3)) {
                        character.x = floor.x + floor.width;
                    }
                    if (character.prevX < floor.x + 50) {
                        character.x = floor.x - character.width;
                    }
                }
            } else {
                if (onGround) {
                    onGround = true;
                }
            }

            if (floor.x <= appWidth - 90 && floor.pastBounds == false) {
                y = Math.floor(Math.random() * (floor.max - floor.min)) + floor.min;
                x = floor.x + floor.width + Math.floor(Math.random() * (1 * appWidth / 4)) + 30;
                createGround(x, y, Math.floor(Math.random() * appWidth * 4 / 3) + 100);
                floor.pastBounds = true;
            }

            if (floor.x <= -floor.width) {
                floor.onScreen = false;
                gameScene.removeChild(floor);
            }

        });

        character.onGround = onGround;

        inBounds();

        if (time2 >= 1) {
            groundSlide += speedIncrease;
            character.speed += speedIncrease;
            time2 = 0;
        }

        if (character.y > appHeight) {
            timeSurvived.text = `You Survived for\n  ${time.toFixed(2)} seconds`;
            gameOver();
        }
    }
}
