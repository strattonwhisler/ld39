import { Vector } from './vector';

export class Node {
    public position: Vector;
    public globalPosition: Vector;

    public doUpdate: boolean;

    public parent: Node;

    public children: Array<Node>;

    constructor() {
        this.position = new Vector();
        this.globalPosition = new Vector();

        this.doUpdate = true;

        this.parent = null;
        this.children = [];
    }

    public nupdate(delta: number): void {
        if(this.doUpdate) {
            this.update(delta);

            if(this.parent) {
                this.globalPosition = Vector.clone(this.parent.globalPosition).add(this.position);
            }

            for(const child of this.children) {
                child.nupdate(delta);
            }
        }
    }

    public ndraw(ctx: CanvasRenderingContext2D): void {
        this.draw(ctx);

        for(const child of this.children) {
            child.ndraw(ctx);
        }
    }

    public update(delta: number): void {};
    public draw(ctx: CanvasRenderingContext2D): void {};

    public addChild(child: Node): void {
        child.parent = this;
        child.globalPosition = Vector.clone(this.globalPosition).add(child.position);
        this.children.push(child);
    }

    public removeChild(child: Node): void {
        child.parent = null;
        child.globalPosition = Vector.clone(child.position);
        this.children.splice(this.children.indexOf(child), 1)
    }
}
