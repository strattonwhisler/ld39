export class Sprite {
    private image: HTMLImageElement;

    private ready: any;

    constructor(src: any) {
        this.image = new Image();
        this.image.src = src;

        this.ready = null;

        this.image.onload = () => { this.ready = true; };
        this.image.onerror = () => { this.ready = false; };
    }

    get(): HTMLImageElement {
        if(this.ready) {
            return this.image;
        } else {
            return new Image(1, 1);
        }
    };
}
