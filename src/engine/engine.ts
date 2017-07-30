import { Game } from './game';

export class Engine<G extends Game> {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private aid: number;

    public game: G;

    public config: any;

    private requestFrame(callback: FrameRequestCallback): void {
        this.aid = window.requestAnimationFrame(callback);
    }

    private cancelFrame(id: number): void {
        window.cancelAnimationFrame(id);
    }

    private delta: number = 0;
    private startTime: number = window.performance.now();

    private loop(loopTime: number): void {
        this.game.update(this.delta);

        this.game.rootNode.nupdate(this.delta);

        this.ctx.clearRect(0, 0, this.config.width, this.config.height);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.config.width, this.config.height);

        this.game.draw(this.ctx);
        this.game.rootNode.ndraw(this.ctx);
        this.game.drawUi(this.ctx);

        this.delta = (loopTime - this.startTime) / 1000;
        this.startTime = loopTime;

        this.requestFrame((frameDelta) => { this.loop(frameDelta) });
    }

    public start(game: G, config: any): void {
        this.game = game;
        this.game.engine = this;
        this.config = config;

        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.game.init();

        this.requestFrame((frameDelta) => { this.loop(frameDelta) });
    }
}
