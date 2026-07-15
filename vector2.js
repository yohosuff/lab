export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const clone = this.clone();
        const magnitude = this.magnitude();
        
        if (magnitude > 0) {
            clone.x = clone.x / magnitude;
            clone.y = clone.y / magnitude;
        }

        return clone;
    }

    multiply(scalar) {
        const clone = this.clone();
        clone.x = clone.x * scalar;
        clone.y = clone.y * scalar;
        return clone;
    }

    clone() {
        const the_clone = new Vector2();
        the_clone.x = this.x;
        the_clone.y = this.y;
        return the_clone;
    }
}
