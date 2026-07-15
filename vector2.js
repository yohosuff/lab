export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const magnitude = this.magnitude();
        
        if (magnitude > 0) {
            this.x = this.x / magnitude;
            this.y = this.y / magnitude;
        }

        return this;
    }

    multiply(scalar) {
        this.x = this.x * scalar;
        this.y = this.y * scalar;
        return this;
    }
}
