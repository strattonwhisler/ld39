import { Node } from './engine/node';
import { Vector } from './engine/vector';
import { Sprite } from './engine/sprite';

import { LD39 } from './ld39';
import { Player } from './player';

export class BgFactories extends Node {
    private spriteOn: Sprite;
    private spriteOff: Sprite;

    public isOn: boolean;

    private game: LD39;
    private player: Player

    public parallax: boolean;

    constructor(game: LD39) {
        super();

        this.game = game;
        this.player = game.player;

        this.isOn = true;

        this.parallax = false;

        this.spriteOn = new Sprite(require('./assets/factories_on.png'));
        this.spriteOff = new Sprite(require('./assets/factories_off.png'));
    }

    public update(delta: number): void {
        if(this.parallax) {
            this.position.x += (650 * this.game.difficultySpeed) * delta
        }

        const dist = this.position.x - this.player.position.x;
        if(dist <= -800 - 125) {
            this.position.add(new Vector(1600, 0));
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if(this.isOn) {
            ctx.drawImage(this.spriteOn.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        } else {
            ctx.drawImage(this.spriteOff.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
    }
}
