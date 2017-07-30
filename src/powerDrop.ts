import { Node } from './engine/node';
import { Sprite } from './engine/sprite';

import { LD39 } from './ld39';
import { Player } from './player';
import { Neon } from './neon';

export class PowerDrop extends Node {
    private sprite: Sprite;

    private game: LD39;
    private player: Player;

    public neon: Neon;

    private time: number;
    public startY: number;

    constructor(game: LD39) {
        super();

        this.game = game;
        this.player = game.player;

        this.sprite = new Sprite(require('./assets/powerdrop.png'));

        this.neon = new Neon(this, require('./assets/powerdrop_neon.png'), { offsetX: 0, offsetY: 0, width: 75, height: 75 });
        this.neon.alwaysOn = true;
        this.game.neonNode.addChild(this.neon);

        this.time = Math.random();
    }

    public update(delta: number): void {
        this.time += delta;
        this.position.y = this.startY + (Math.sin(2 * Math.PI * this.time) * 20);

        if(
            ((this.player.col.x >= this.position.x) && (this.player.col.x <= this.position.x + 75)) ||
            ((this.player.col.x + this.player.colSize.x >= this.position.x) && (this.player.col.x + this.player.colSize.x <= this.position.x + 75))
        ) {
            if(
                ((this.player.col.y <= this.position.y) && (this.player.col.y >= this.position.y - 75)) ||
                ((this.player.col.y - this.player.colSize.y <= this.position.y) && (this.player.col.y - this.player.colSize.y >= this.position.y - 75))
            ) {
                this.game.collectPower(this);
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 75, 75);
    }
}
