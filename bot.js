import { CoolColors } from "./colors.js";
import { Vector2 } from "./vector2.js";

export class Bot {
    constructor() {
        this.position = new Vector2();
        this.radius = 50;
        this.speed = 50;
        this.acceleration = new Vector2();
        this.velocity = new Vector2();
        this.color = CoolColors.ELECTRIC_BLUE;
        this.maxEnergy = 100;
        this.energy = this.maxEnergy;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(deltaTime) {
        this.energy -= 0.05;

        if (this.energy <= 0) {
            this.energy = 0;
            return;
        }

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
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
