import { Node } from './engine/node';
import { Vector } from './engine/vector';
import { Sprite } from './engine/sprite';

import { Player } from './player';

export class Platform extends Node {
    private sprite: Sprite;

    private player: Player

    constructor(player: Player) {
        super();

        this.player = player;

        this.sprite = new Sprite(require('./assets/platform.png'));
    }

    public update(delta: number): void {
        const dist = this.position.x - this.player.position.x;
        if(dist <= -800 - 125) {
            this.position.add(new Vector(1600, 0));
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
    }
}
