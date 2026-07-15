import { CoolColors } from "./colors.js";
import { Vector2 } from "./vector2.js";

export class Bar {
    constructor(x, y) {
        this.position = new Vector2(x, y);
        this.color = CoolColors.LAVENDER;
        this.value = 0; // between 0 and 1
        this.size = new Vector2(100, 20);
    }

    render(ctx) {
        
        ctx.fillStyle = this.color;
        
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x * this.value,
            this.size.y
        );
    }
}
