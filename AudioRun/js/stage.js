"use strict";
let ground = [];

let buildings = [
    new PIXI.Texture.fromImage("AudioRun/images/Buildings/Buildings/large_building_1.png"),
    new PIXI.Texture.fromImage("AudioRun/images/Buildings/Buildings/medium_building_1.png"),
    new PIXI.Texture.fromImage("AudioRun/images/Buildings/Buildings/small_building_1.png")
];

function createGround(x = 0, y = 350, width = 600, height = 250) {
    let texture;
    if (width <= 455) {
        texture = buildings[2];
        height = width / (68 / 185);
    } else if (width <= 910 && width > 455) {
        texture = buildings[1];
        height = width / (120 / 185);
    } else {
        texture = buildings[0];
        height = width / (142 / 196);
    }
    let ground1 = new PIXI.Sprite(texture);
    ground1.width = width;
    ground1.height = height;
    ground1.x = x;
    ground1.y = y;
    ground1.max = 395;
    ground1.min = appHeight - 30;
    ground1.pastBounds = false;
    ground1.onScreen = true;
    ground.push(ground1);
    gameScene.addChild(ground1);
}
