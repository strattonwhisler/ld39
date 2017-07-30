import { Game } from './engine/game';
import { Vector } from './engine/vector';
import { Sprite } from './engine/sprite';
import { input } from './engine/input';
import { Node } from './engine/node';

import { Title } from './title';
import { Controls } from './controls';
import { GameOver } from './gameover';
import { Pause } from './pause';
import { Scoreboard } from './scoreboard';
import { Player } from './player';
import { BgFactories } from './bgFactories';
import { BgClouds } from './bgClouds';
import { Platform } from './platform';
import { Obstacle } from './obstacle';
import { PowerDrop } from './powerdrop';
import { Darkness } from './darkness';
import { Neon } from './neon';

export class LD39 extends Game {
    private state: string;
    private animating: string;

    public player: Player;

    private difficulty: number;
    public difficultySpeed: number;
    private difficultyTimer: number;
    private difficultyRate: number;
    private tickTime: number;
    private obstacleTypeI: IterableIterator<number>;
    private obstacleNode: Node;

    private ticksWithoutObstacle: number;

    public powerLevel: number;
    private powerTick: number;
    private powerNode: Node;

    public distance: number;

    private title: Title;
    private controls: Controls;
    private gameover: GameOver;
    private pause: Pause;
    private scoreboard: Scoreboard;

    private bgSprite: Sprite;

    private bgClouds1: BgClouds;
    private bgClouds2: BgClouds;

    private bgFactories1: BgFactories;
    private bgFactories2: BgFactories;

    private platform1: Platform;
    private platform2: Platform;

    private darkness: Darkness;
    public neonNode: Node;
    private blackout: boolean;
    private blackoutTimer: number;

    public frontNode: Node;

    private dTime: number;
    private dFps: number;
    private dSFps: number;

    public init(): void {
        this.state = 'menu';
        this.animating = 'in';

        this.title = new Title();
        this.title.position.y = 200;
        this.controls = new Controls();
        this.controls.position.x = 350;
        this.gameover = new GameOver();
        this.gameover.position.y = 250;
        this.pause = new Pause();
        this.scoreboard = new Scoreboard(this);

        this.bgSprite = new Sprite(require('./assets/bg.png'));

        this.player = new Player(this);
        this.player.position = new Vector(125, -305);
        this.player.lockInput = true;

        this.distance = 0;

        this.difficulty = 0.35;
        this.difficultySpeed = 1;
        this.difficultyTimer = 30;
        this.difficultyRate = 1 / this.difficultyTimer;
        this.tickTime = 0;
        this.obstacleTypeI = this.obstacleTypeG();
        this.obstacleNode = new Node();

        this.ticksWithoutObstacle = 0;

        this.powerLevel = 0.3;
        this.powerTick = 0;
        this.powerNode = new Node();

        this.bgClouds1 = new BgClouds(this.player, 0, '');
        this.bgClouds2 = new BgClouds(this.player, 800, '2');
        this.bgFactories1 = new BgFactories(this);
        this.bgFactories2 = new BgFactories(this);
        this.bgFactories2.position = new Vector(800, 0);

        this.platform1 = new Platform(this.player);
        this.platform2 = new Platform(this.player);
        this.platform2.position = new Vector(800, 0);

        this.darkness = new Darkness(this);
        this.neonNode = new Node();
        this.blackout = false;
        this.blackoutTimer = 0;

        this.frontNode = new Node();

        // Add in order of render (back to front)
        this.rootNode.addChild(this.bgClouds1);
        this.rootNode.addChild(this.bgClouds2);
        this.rootNode.addChild(this.bgFactories1);
        this.rootNode.addChild(this.bgFactories2);
        this.rootNode.addChild(this.platform1);
        this.rootNode.addChild(this.platform2);

        this.rootNode.addChild(this.obstacleNode);
        this.rootNode.addChild(this.powerNode);

        this.rootNode.addChild(this.player);

        this.rootNode.addChild(this.frontNode);

        this.rootNode.addChild(this.darkness);
        this.rootNode.addChild(this.neonNode);

        this.rootNode.addChild(this.title);
        this.rootNode.addChild(this.controls);

        this.dTime = 0;
        this.dFps = 0;
        this.dSFps = 0;
    }

    private reset(): void {
        this.title.position.y = 200;
        this.controls.position.x = 350;
        this.gameover.position.y = 250;

        this.difficulty = 0.35;
        this.difficultySpeed = 1;
        this.difficultyTimer = 30;
        this.difficultyRate = 1 / this.difficultyTimer;
        this.tickTime = 0;
        this.obstacleTypeI = this.obstacleTypeG();

        this.ticksWithoutObstacle = 0;

        this.powerLevel = 1;
        this.powerTick = 0;
        this.blackout = false;
        this.blackoutTimer = 0;
        this.darkness.level = 1 - this.powerLevel;

        this.distance = 0;

        this.player.position = new Vector(125, -305);

        this.bgFactories1.position = new Vector();
        this.bgFactories2.position = new Vector(800, 0);

        this.platform1.position = new Vector();
        this.platform2.position = new Vector(800, 0);

        this.obstacleNode.children = [];
        this.obstacleNode.doUpdate = true;
        this.powerNode.children = [];
        this.neonNode.children = [];
        this.frontNode.children = [];

        this.rootNode.globalPosition = new Vector();
    }

    private lastKey: any = {
        'go': false,
        'pause': false
    };

    public update(delta: number): void {
        this.dTime += delta;
        this.dFps++;

        if(this.dTime >= 1) {
            this.dSFps = this.dFps;
            this.dFps = 0;
            this.dTime %= 1;
        }

        switch(this.state) {
            case 'game': {
                const nextDistance = (800 * this.difficultySpeed) * delta;
                this.distance += nextDistance / 100;
                this.player.position.add(new Vector( nextDistance, 0));
                this.rootNode.globalPosition = new Vector(this.player.position.x, 0).mul(-1).add(new Vector(125, 0));

                this.difficultyTimer -= delta;
                if(this.difficultyTimer <= 0) {
                    this.difficultyTimer = (Math.random() * 10) + 30;
                    this.difficultyRate = 1 / this.difficultyTimer;
                }

                this.difficulty += 0.1 * this.difficultyRate * delta;
                this.difficultySpeed += 0.2 * this.difficultyRate * delta;

                this.tickTime += delta;
                if(this.tickTime >= (0.6 * this.difficultySpeed)) {
                    if(this.powerTick == 20) {
                        this.addPowerDrop();
                        this.powerTick = 0;
                    } else {
                        if(Math.random() <= this.difficulty) {
                            this.addObstacle();
                        } else {
                            this.ticksWithoutObstacle++;

                            if((1 / this.ticksWithoutObstacle) <= this.difficulty) {
                                this.addObstacle();
                                this.ticksWithoutObstacle = 0;
                            }
                        }
                    }

                    this.powerTick++;
                    this.tickTime = 0;
                }

                for(const obstacle of this.obstacleNode.children) {
                    const dist = obstacle.position.x - this.player.position.x;
                    if(dist <= -200) {
                        this.obstacleNode.removeChild(obstacle);
                    }
                }

                for(const powerDrop of this.powerNode.children) {
                    const dist = powerDrop.position.x - this.player.position.x;
                    if(dist <= -200) {
                        this.powerNode.removeChild(powerDrop);
                    }
                }

                this.powerLevel -= 0.02 * delta;
                this.darkness.level = 1 - this.powerLevel;

                if(this.powerLevel >= 0.5) {
                    this.blackout = false;
                } else if(this.powerLevel <= 0.1) {
                    this.blackout = true;
                } else {
                    this.blackoutTimer -= delta;
                    if(this.blackoutTimer <= 0) {
                        this.blackout = !this.blackout;
                        this.blackoutTimer = Math.random() * 0.5;
                    }
                }

                if(this.powerLevel <= 0) {
                    this.gameOver();
                }

                this.scoreboard.isOn = !this.blackout;
                this.bgFactories1.isOn = !this.blackout;
                this.bgFactories2.isOn = !this.blackout;

                for(const neon of this.neonNode.children as Array<Neon>) {
                    neon.isOn = !this.blackout;
                }

                if(input.isDown('Escape') && !this.lastKey['pause']) {
                    this.lastKey['pause'] = true;
                    this.state = 'pause';
                    this.pause.position.x = -this.rootNode.globalPosition.x;
                    this.rootNode.addChild(this.pause);
                    this.player.doUpdate = false;
                }
                if(!input.isDown('Escape')) {
                    this.lastKey['pause'] = false;
                }

                break;
            }
            case 'pause': {
                if(input.isDown('Escape') && !this.lastKey['pause']) {
                    this.lastKey['pause'] = true;
                    this.state = 'game';
                    this.rootNode.removeChild(this.pause);
                    this.player.doUpdate = true;
                }
                if(!input.isDown('Escape')) {
                    this.lastKey['pause'] = false;
                }

                break;
            }
            case 'menu': {
                if(this.animating === 'out') {
                    if(this.title.position.y > 200) {
                        this.state = 'game';
                        this.rootNode.removeChild(this.title);
                        this.rootNode.removeChild(this.controls);
                        this.player.lockInput = false;
                        this.player.animating = 'run';
                        this.rootNode.addChild(this.scoreboard);
                        this.bgFactories1.parallax = true;
                        this.bgFactories2.parallax = true;
                    } else {
                        this.title.position.y += 8;
                        this.controls.position.x += 14;
                    }
                } else {
                    if(this.title.position.y > 0) {
                        this.title.position.y -= 8;
                    }

                    if(this.controls.position.x > 0) {
                        this.controls.position.x -= 14;
                    }
                }

                if(input.isDown('Space') && !this.lastKey['go']) {
                    this.lastKey['go'] = true;
                    this.animating = 'out';
                }
                if(!input.isDown('Space')) {
                    this.lastKey['go'] = false;
                }

                break;
            }
            case 'gameover': {
                if(this.animating === 'out') {
                    if(this.gameover.position.y > 250) {
                        this.state = 'menu';
                        this.animating = 'in';
                        this.rootNode.removeChild(this.gameover);
                        this.rootNode.removeChild(this.scoreboard);
                        this.rootNode.addChild(this.title);
                        this.rootNode.addChild(this.controls);
                        this.player.animating = 'idle';
                        this.player.resetAnimations();
                        this.reset();
                    } else {
                        this.gameover.position.y += 8;
                    }
                } else {
                    if(this.gameover.position.y > 0) {
                        this.gameover.position.y -= 8;
                    }
                }

                if(input.isDown('Space') && !this.lastKey['go']) {
                    this.lastKey['go'] = true;
                    this.animating = 'out';
                }
                if(!input.isDown('Space')) {
                    this.lastKey['go'] = false;
                }

                break;
            }
        }
    }

    public gameOver() {
        this.state = 'gameover';
        this.obstacleNode.doUpdate = false;
        this.player.lockInput = true;
        this.player.animating = 'death';

        this.animating = 'in';
        this.gameover.position.x = -this.rootNode.globalPosition.x;
        this.rootNode.addChild(this.gameover);

        this.bgFactories1.parallax = false;
        this.bgFactories2.parallax = false;
    }

    public collectPower(powerDrop: PowerDrop): void {
        this.powerLevel += 0.4;
        if(this.powerLevel > 1) {
            this.powerLevel = 1;
        }

        this.powerNode.removeChild(powerDrop);
        this.neonNode.removeChild(powerDrop.neon);
    }

    private addPowerDrop(): void {
        const powerDrop = new PowerDrop(this);
        powerDrop.position.x = this.player.position.x + 800;
        powerDrop.position.y = -100;
        powerDrop.startY = -100;
        this.powerNode.addChild(powerDrop);
    }

    private addObstacle(): void {
        const obstacleType = this.obstacleTypeI.next().value;
        const obstacle = new Obstacle(this, obstacleType);
        obstacle.position.x = this.player.position.x + 800;
        this.obstacleNode.addChild(obstacle);
    }

    private *obstacleTypeG(): IterableIterator<number> {
        yield* [
            1, 1, 2, 1, 2, 3, 2, 1, 4
        ];
        while(true) {
            yield Math.ceil(Math.random() * 4);
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.bgSprite.get(), 0, 0, this.engine.config.width, this.engine.config.height);
    }

    public drawUi(ctx: CanvasRenderingContext2D): void {
        // ctx.font = '10px sans';
        //
        // ctx.fillStyle = 'yellow';
        // ctx.fillRect(0, 0    , 800, 1);
        // ctx.fillRect(0, 101.6, 800, 1);
        // ctx.fillRect(0, 203.8, 800, 1);
        // ctx.fillRect(0, 305  , 800, 1);
        // ctx.fillRect(0, 406.6, 800, 1);
        //
        // const messages = [
        //     'Debug',
        //     'fps: ' + this.dSFps,
        //     'sta: ' + this.state,
        //     'obs: ' + this.obstacleNode.children.length,
        //     'dif: ' + this.difficulty,
        //     'spd: ' + this.difficultySpeed,
        //     'pwr: ' + this.powerLevel
        // ];
        //
        // ctx.fillStyle = 'rgba(192, 192, 192, 0.8)';
        // ctx.fillRect(0, 0, 150, (messages.length * 15) + 3);
        //
        // ctx.fillStyle = '#000000';
        // for(let r = 0;r < messages.length;r++) {
        //     ctx.fillText(messages[r], 3, 13 + (r * 15));
        // }
    }
}
