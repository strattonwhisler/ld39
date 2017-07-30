import { Node } from './engine/node';
import { Sprite } from './engine/sprite';
import { Vector } from './engine/vector';

import { LD39 } from './ld39';

export class Scoreboard extends Node {
    private bgSprite: Sprite;
    private barSpriteOn: Sprite;
    private barSpriteOff: Sprite;

    public isOn: boolean;

    private game: LD39;

    constructor(game: LD39) {
        super();

        this.game = game;

        this.isOn = true;

        this.bgSprite = new Sprite(require('./assets/scoreboard.png'));
        this.barSpriteOn = new Sprite(require('./assets/powerbar_on.png'));
        this.barSpriteOff = new Sprite(require('./assets/powerbar_off.png'));
    }

    public update(delta: number): void {
        this.position.x = -this.game.rootNode.globalPosition.x;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.bgSprite.get(), 0, 0, 800, 500);

        const width = 6 + (50 * this.game.powerLevel);
        if(this.isOn) {
            ctx.drawImage(this.barSpriteOn.get(), 0, 0, width, 100, 0, 0, width * 5, 500);
        } else {
            ctx.drawImage(this.barSpriteOff.get(), 0, 0, width, 100, 0, 0, width * 5, 500);
        }

        ctx.font = '46px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.floor(this.game.distance).toString().split('.')[0] + 'm', 300, 476);
    }
}
