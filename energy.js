import { CoolColors } from "./colors.js";
import { Vector2 } from "./vector2.js";

export class Energy {
    constructor() {
        this.position = new Vector2();
        this.radius = 10;
        this.speed = new Vector2();
        this.color = CoolColors.YELLOW;
        this.energy = 25;
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

    teleport(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}
