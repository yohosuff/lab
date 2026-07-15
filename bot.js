import { CoolColors } from "./colors.js";

export class Bot {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.radius = 50;
        this.speed = { x: 0, y: 0 };
        this.color = CoolColors.ELECTRIC_BLUE;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(deltaTime) {
        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;
    }

    teleportToRandomPosition(width, height) {
        this.position.x = Math.random() * width;
        this.position.y = Math.random() * height;
    }
}
