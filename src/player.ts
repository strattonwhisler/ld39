import { Node } from './engine/node';
import { Vector } from './engine/vector';
import { input } from './engine/input';
import { Sprite } from './engine/sprite';

import { LD39 } from './ld39';

export class Player extends Node {
    private sprite: Sprite;

    private game: LD39;

    public col: Vector;
    public colSize: Vector;

    public lockInput: boolean;

    public animating: string;
    private frameTick: number;
    private frameLength: number;
    private frameId: number;

    private lastY: number = null;
    private jumpTime: number = null;
    private slideTime: number = null;

    constructor(game: LD39) {
        super();

        this.game = game;

        this.col = new Vector();
        this.colSize = new Vector();

        this.lockInput = false;

        this.animating = 'idle';
        this.frameTick = 0;
        this.frameLength = 0.1;
        this.frameId = 2;
        this.resetAnimations();

        this.sprite = new Sprite(require('./assets/player.png'));
    }

    private lastKey: any = {
        'jump': false,
        'slide': false
    };
    public update(delta: number): void {
        this.col = Vector.clone(this.position);
        this.colSize = new Vector(75, 100);

        const speed = 1000 * delta;

        if(!this.lockInput) {
            if((input.isDown('KeyW') || input.isDown('ArrowUp')) && !this.lastKey['jump']) {
                this.lastKey['jump'] = true;
                if(this.jumpTime === null) {
                    this.jumpTime = 0;
                    this.animating = 'jump';
                    this.resetAnimations();
                }
            }
            if(!(input.isDown('KeyW') || input.isDown('ArrowUp'))) {
                this.lastKey['jump'] = false;
            }
            if((input.isDown('KeyS') || input.isDown('ArrowDown')) && !this.lastKey['slide']) {
                this.lastKey['slide'] = true;
                if(this.slideTime === null) {
                    this.slideTime = 0;
                    this.animating = 'slide';
                    this.resetAnimations();
                }
            }
            if(!(input.isDown('KeyS') || input.isDown('ArrowDown'))) {
                this.lastKey['slide'] = false;
            }
        }

        this.position.y = this.jump(delta);

        if(this.slideTime !== null) {
            this.slideTime += delta;

            this.col.y -= 25;
            this.colSize.y = 50;

            if(this.slideTime >= 0.4) {
                this.slideTime = null;

            }
        }

        this.frameTick += delta;
        if(this.frameTick >= this.frameLength) {
            this.frameId++;
            this.onFrameTick();
            this.frameTick = 0;
        }
    }

    private onFrameTick(): void {
        switch(this.animating) {
            case 'run': {
                this.frameLength = 0.067 * this.game.difficultySpeed;
                this.frameId = this.runI.next().value;
                break;
            }
            case 'jump': {
                this.frameLength = 0.08;
                this.frameId = this.jumpI.next().value;
                if(this.frameId == undefined) {
                    this.animating = 'run';
                    this.resetAnimations();
                }
                break;
            }
            case 'slide': {
                this.frameLength = 0.08;
                this.frameId = this.slideI.next().value;
                if(this.frameId == undefined) {
                    this.animating = 'run';
                    this.resetAnimations();
                }
                break;
            }
            case 'idle': {
                this.frameLength = 0.25;
                this.frameId = this.idleI.next().value;
                break;
            }
            case 'death': {
                this.frameLength = 0.12;
                this.frameId = this.deathI.next().value;
                break;
            }
        }
    }

    public resetAnimations(): void {
        this.runI = this.runG();
        this.jumpI = this.jumpG();
        this.slideI = this.slideG();
        this.idleI = this.idleG();
        this.deathI = this.deathG();
        this.onFrameTick();
    }

    private runI: IterableIterator<number>;
    private *runG(): IterableIterator<number> {
        while(true) {
            yield* [2, 3, 4, 3, 2, 1, 0, 1];
        }
    }

    private jumpI: IterableIterator<number>;
    private *jumpG(): IterableIterator<number> {
        yield* [5, 6];
        while(this.position.y > this.lastY) {
            yield 7;
        }
        yield* [8, 9];
    }

    private slideI: IterableIterator<number>;
    private *slideG(): IterableIterator<number> {
        yield* [10, 11];
        while(this.slideTime !== null) {
            yield 12;
        }
        yield* [13, 14];
    }

    private idleI: IterableIterator<number>;
    private *idleG(): IterableIterator<number> {
        while(true) {
            yield* [15, 16, 17, 18];
        }
    }

    private deathI: IterableIterator<number>;
    private *deathG(): IterableIterator<number> {
        yield* [20, 21, 22, 23];
        while(true) {
            yield 24;
        }
    }

    private readonly jumpVel: number = 2000;
    private jump(delta: number): number {
        if(this.lastY === null) {
            this.lastY = this.position.y;
        }
        if(this.jumpTime === null) {
            return this.lastY;
        }
        let y = this.lastY + ((this.jumpVel * this.jumpTime) - (0.5 * (this.jumpVel * 3.6) * this.jumpTime * this.jumpTime));
        if(y < this.lastY) {
            y = this.lastY;
            this.jumpTime = null;
            this.lastY = null;
        } else {
            this.jumpTime += delta;
        }
        return y;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const x = this.frameId % 5;
        const y = Math.floor(this.frameId / 5);
        ctx.drawImage(this.sprite.get(), (x * 15), (y * 25), 15, 25, this.globalPosition.x, -this.globalPosition.y - 25, 75, 125);

        // ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
        // ctx.fillRect(this.globalPosition.x, -this.globalPosition.y, this.colSize.x, this.colSize.y);
    }
}
