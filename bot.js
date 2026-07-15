import { CoolColors } from "./colors.js";

export class Bot {
    constructor(x, y) {
        this.position = { x:x, y:y };
        this.radius = 20;
    }

    render(ctx) {
        ctx.fillStyle = CoolColors.MAGENTA;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(deltaTime) {
        this.position.x += 50 * deltaTime;
    }
}
