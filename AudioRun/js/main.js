//"use strict";
//$.getScript("AudioRun/js/stage.js");
//$.getScript("AudioRun/js/scenes.js");

import * as stage from './stage.js';
import * as scenes from './scenes.js';
import {
    utilInit,
    detectCollision
} from './utilities.js';

let game;

export const app = new PIXI.Application(1024, 576);

export const appWidth = app.screen.width;
export const appHeight = app.screen.height;

export function init() {
    utilInit();
    scenes.init();

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    game = document.querySelector("#game");
    game.appendChild(app.view);

    PIXI.loader.add(["AudioRun/images/New Piskel.png"]).on("progress", e => {
        console.log(`progress=${e.progress}`)
    }).load(Setup);
}

function Setup() {
    scenes.gameSetup(stage);

    app.ticker.add(delta => GameLoop(delta));
}

function inBounds() {
    if (scenes.character.x <= 0) {
        scenes.character.x = 0;
    }
    if (scenes.character.x >= appWidth - scenes.character.width) {
        scenes.character.x = appWidth - scenes.character.width;
    }
}

function GameLoop(delta) {

    if (scenes.gameStarted) {
        let grav = 1.5;
        let x, y;
        let onGround = false;
        let speedIncrease = 0.3;

        scenes.backGround.tilePosition.x -= 0.128;
        scenes.middleGround.tilePosition.x -= 0.64;

        scenes.updateTime(scenes.time + 1 / app.ticker.FPS);
        scenes.updateTime2(scenes.time2 + 1 / app.ticker.FPS);
        scenes.timeLabel.text = `Time: ${scenes.time.toFixed(2)}`;

        scenes.character.vy += grav * delta;
        scenes.character.move(delta);

        stage.updateGround(stage.ground.filter(g => g.onScreen));

        stage.ground.forEach(function (floor) {
            floor.x -= scenes.groundSlide * delta;
            if (detectCollision(scenes.character, floor)) {
                if (scenes.character.prevY <= floor.y - scenes.character.height) {
                    scenes.character.vy = 0;
                    scenes.character.y = floor.y - scenes.character.height;
                    scenes.character.x -= scenes.groundSlide;
                    onGround = true;
                } else {
                    if (scenes.character.prevX > floor.x + (2 * floor.width / 3)) {
                        scenes.character.x = floor.x + floor.width;
                    }
                    if (scenes.character.prevX < floor.x + 50) {
                        scenes.character.x = floor.x - scenes.character.width;
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
                stage.createGround(x, y, Math.floor(Math.random() * appWidth * 4 / 3) + 100);
                floor.pastBounds = true;
            }

            if (floor.x <= -floor.width) {
                floor.onScreen = false;
                scenes.gameScene.removeChild(floor);
            }

        });

        scenes.character.onGround = onGround;

        inBounds();

        if (scenes.time2 >= 1) {
            scenes.updateGroundSlide(scenes.groundSlide + speedIncrease);
            scenes.character.speed += speedIncrease;
            scenes.updateTime2(0);
        }

        if (scenes.character.y > appHeight) {
            scenes.updateTimeSurvived();
            scenes.gameOver();
        }
    }
}
