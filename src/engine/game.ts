import { Node } from './node';
import { Engine } from './engine';

export abstract class Game {
    public rootNode: Node;
    public engine: Engine<this>;

    constructor() {
        this.rootNode = new Node();
    }

    public abstract init(): void;
    public abstract update(delta: number): void;
    public abstract draw(ctx: CanvasRenderingContext2D): void;
    public abstract drawUi(ctx: CanvasRenderingContext2D): void;
}
