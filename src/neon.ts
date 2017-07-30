import { Node } from './engine/node';
import { Sprite } from './engine/sprite';
import { Vector } from './engine/vector';

export class Neon extends Node {
    private sprite: Sprite;

    private owner: Node;

    public isOn: boolean;
    public alwaysOn: boolean;

    private drawOptions: any;

    constructor(owner: Node, src: any, drawOptions: any) {
        super();

        this.owner = owner;

        this.isOn = true;
        this.alwaysOn = false;

        this.drawOptions = drawOptions;

        this.sprite = new Sprite(src);
    }

    public update(delta: number): void {
        this.position = Vector.clone(this.owner.position);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if(this.isOn || this.alwaysOn) {
            ctx.drawImage(this.sprite.get(), this.globalPosition.x + this.drawOptions.offsetX, -this.globalPosition.y + this.drawOptions.offsetY, this.drawOptions.width, this.drawOptions.height);
        }
    }
}
