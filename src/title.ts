import { Node } from './engine/node';
import { Sprite } from './engine/sprite';

export class Title extends Node {
    private spriteOn: Sprite;
    private spriteOff: Sprite;

    private isOn: boolean;
    private timer: number;

    constructor() {
        super();

        this.isOn = true;
        this.timer = 0;

        this.spriteOn = new Sprite(require('./assets/title_on.png'));
        this.spriteOff = new Sprite(require('./assets/title_off.png'));
    }

    public update(delta: number): void {
        if(this.timer <= 0) {
            if(this.isOn) {
                this.timer = (Math.random() * 0.4) + 0.1;
            } else {
                this.timer = (Math.random() * 2.5) + 0.5;
            }

            this.isOn = !this.isOn;
        }

        this.timer -= delta;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if(this.isOn) {
            ctx.drawImage(this.spriteOn.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        } else {
            ctx.drawImage(this.spriteOff.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
    }
}
