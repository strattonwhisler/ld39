import { Node } from './engine/node';
import { Sprite } from './engine/sprite';

import { LD39 } from './ld39';
import { Player } from './player';
import { Neon } from './neon';
import { Front } from './front';

export class Obstacle extends Node {
    private sprite: Sprite;

    private obstacleType: number;

    private collisions: any = {
        'top': false,
        'up': false,
        'mid': false,
        'bottom': false
    };

    private loseOn: any;

    private game: LD39;
    private player: Player;

    constructor(game: LD39, obstacleType: number) {
        super();

        this.game = game;
        this.player = game.player;

        this.position.y = - 15;

        this.sprite = new Sprite('');

        this.obstacleType = obstacleType;
        switch(this.obstacleType) {
            case 1: {
                this.sprite = new Sprite(require('./assets/obstacle1.png'));
                this.game.neonNode.addChild(new Neon(this, require('./assets/obstacle1_neon.png'), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                this.loseOn = {
                    'top': false,
                    'up': false,
                    'mid': false,
                    'bottom': true
                };
                break;
            }
            case 2: {
                this.sprite = new Sprite(require('./assets/obstacle2.png'));
                this.game.neonNode.addChild(new Neon(this, require('./assets/obstacle2_neon.png'), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                this.game.frontNode.addChild(new Front(this, require('./assets/obstacle2_front.png'), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                this.loseOn = {
                    'top': true,
                    'up': true,
                    'mid': false,
                    'bottom': false
                };
                break;
            }
            case 3: {
                this.sprite = new Sprite(require('./assets/obstacle3.png'));
                this.game.neonNode.addChild(new Neon(this, require('./assets/obstacle3_neon.png'), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                this.loseOn = {
                    'top': false,
                    'up': false,
                    'mid': true,
                    'bottom': true
                };
                break;
            }
            case 4: {
                this.sprite = new Sprite(require('./assets/obstacle4.png'));
                this.game.neonNode.addChild(new Neon(this, require('./assets/obstacle4_neon.png'), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                this.game.frontNode.addChild(new Front(this, require('./assets/obstacle4_front.png'), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                this.loseOn = {
                    'top': true,
                    'up': true,
                    'mid': true,
                    'bottom': false
                };
                break;
            }
        }
    }

    public update(delta: number): void {
        // Hit range
        // top    0     , -101.6
        // up     -101.6, -203.8
        // mid    -203.8, -305
        // bottom -305  , -406.6

        // Check for domain
        if(
            ((this.player.col.x >= this.position.x) && (this.player.col.x <= this.position.x + 75)) ||
            ((this.player.col.x + this.player.colSize.x >= this.position.x) && (this.player.col.x + this.player.colSize.x <= this.position.x + 75))
        ) {
            if(
                ((this.player.col.y <= 0) && (this.player.col.y >= -101.6)) ||
                ((this.player.col.y - this.player.colSize.y <= 0) && (this.player.col.y - this.player.colSize.y >= -101.6))
            ) {
                this.collisions['top'] = true;
            }
            if(
                ((this.player.col.y <= -101.6) && (this.player.col.y >= -203.8)) ||
                ((this.player.col.y - this.player.colSize.y <= -101.6) && (this.player.col.y - this.player.colSize.y >= -203.8))
            ) {
                this.collisions['up'] = true;
            }
            if(
                ((this.player.col.y <= -203.8) && (this.player.col.y >= -305)) ||
                ((this.player.col.y - this.player.colSize.y <= -203.8) && (this.player.col.y - this.player.colSize.y >= -305))
            ) {
                this.collisions['mid'] = true;
            }
            if(
                ((this.player.col.y <= -305) && (this.player.col.y >= -406.6)) ||
                ((this.player.col.y - this.player.colSize.y <= -305) && (this.player.col.y - this.player.colSize.y >= -406.6))
            ) {
                this.collisions['bottom'] = true;
            }

            if(
                (this.loseOn['top'] && this.collisions['top']) ||
                (this.loseOn['up'] && this.collisions['up']) ||
                (this.loseOn['mid'] && this.collisions['mid']) ||
                (this.loseOn['bottom'] && this.collisions['bottom'])
            ) {
                this.game.gameOver();
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 95, 400);

        // let i = 0;
        // for(const collision in this.collisions) {
        //     if(this.loseOn[collision]) {
        //         if(this.collisions[collision]) {
        //             ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
        //         } else {
        //             ctx.fillStyle = 'rgba(0, 0, 255, 0.4)';
        //         }
        //         ctx.fillRect(this.globalPosition.x + 10, -this.globalPosition.y + (i * 100), 15 * 5, 20 * 5);
        //     }
        //     i++;
        // }
    }
}
