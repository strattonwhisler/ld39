export class Vector {
    public x: number;
    public y: number;

    constructor(x: number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
    }

    public static clone(v: Vector): Vector {
        return new Vector(v.x, v.y);
    }

    public add(v: this): this {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    public sub(v: this): this {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    public mul(k: number): this {
        this.x *= k;
        this.y *= k;

        return this;
    }

    public div(k: number): this {
        this.x /= k;
        this.y /= k;

        return this;
    }

    public normalize(): this {
        var l = this.length;
        this.x /= l;
        this.y /= l
        return this;
    }

    public get length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}
