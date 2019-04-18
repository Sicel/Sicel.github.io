"use strict";
class Character extends PIXI.Sprite {
    constructor(x = 300, y = 300) {
        super(PIXI.loader.resources["project4/images/New Piskel.png"].texture);
        this.scale.set(1);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.prevY = 0;
        this.prevX = 0;
        this.speed = 7;
        this.jumpHeight = 20;
        this.inAir = false;
        this.onGround = false;
    }

    move(delta) {
        this.prevY = this.y;
        this.prevX = this.x;
        this.vx = 0;

        if (left.isDown || a.isDown) {
            this.vx = -this.speed * delta;
        }

        if (up.isDown || w.isDown) {
            this.jump(delta);
        }

        if (right.isDown || d.isDown) {
            this.vx = this.speed * delta;
        }

        if (down.isDown || s.isDown) {
            this.y += this.speed;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    jump(delta) {
        if (this.onGround) {
            this.vy = -this.jumpHeight * delta;
        }
    }
}
