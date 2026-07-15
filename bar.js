import { CoolColors } from "./colors.js";
import { Vector2 } from "./vector2.js";

export class Bar {
    constructor(x, y, w, h, f, b) {
        this.position = new Vector2(x, y);
        this.fillColor = f;
        this.borderColor = b;
        this.value = 0; // between 0 and 1
        this.size = new Vector2(w, h);
    }

    render(ctx) {
        ctx.fillStyle = this.fillColor;
        
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x * this.value,
            this.size.y
        );

        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        )
    }
}
