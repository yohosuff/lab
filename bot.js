import { CoolColors } from "./colors.js";

export class Bot {
    constructor(x, y) {
        this.position = { x, y };
        this.radius = 20;
        this.speed = { x: 0, y: 0 };
    }

    render(ctx) {
        ctx.fillStyle = CoolColors.MAGENTA;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(deltaTime) {
        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;
    }
}
