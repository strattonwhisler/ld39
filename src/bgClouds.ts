import { Node } from './engine/node';
import { Vector } from './engine/vector';
import { Sprite } from './engine/sprite';

import { Player } from './player';

export class BgClouds extends Node {
    private sprite: Sprite;

    private player: Player

    private offset: number;
    private foff: number;

    constructor(player: Player, foff: number, ed: string) {
        super();

        this.player = player;
        this.offset = 125;
        this.foff = foff;

        this.sprite = new Sprite(require('./assets/clouds' + ed + '.png'));
    }

    public update(delta: number): void {
        this.position.x = this.player.position.x + this.foff;
        this.offset += 0.2;
        this.position.x -= this.offset;

        const dist = this.position.x - this.player.position.x;
        if(dist <= -800 - 125) {
            this.position.add(new Vector(1600, 0))
            this.offset = this.foff + dist + 125;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
    }
}
