import { Node } from './engine/node';

import { LD39 } from './ld39';

export class Darkness extends Node {
    private game: LD39;

    public level: number;

    constructor(game: LD39) {
        super();

        this.game = game;

        this.level = 0;
    }

    public update(delta: number): void {
        this.position.x = -this.game.rootNode.globalPosition.x;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'rgba(0, 0, 0, ' + (this.level * 0.8) + ')';
        ctx.fillRect(0, 0, 800, 500);
    }
}
