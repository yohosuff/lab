import { CoolColors } from "./colors.js";

export class Bot {
    constructor(x, y) {
        this.position = { x:x, y:y };
    }

    render(ctx) {
        ctx.fillStyle = CoolColors.MAGENTA;
        ctx.fillRect(this.position.x, this.position.y, 50, 50);
    }

    update(deltaTime) {
        this.position.x += 50 * deltaTime;
    }
}
