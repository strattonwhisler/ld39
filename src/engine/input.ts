class Input {
    private down: Array<string>;

    constructor() {
        this.down = [];

        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.onKeyDown(event);
        });
        document.addEventListener('keyup', (event) => {
            event.preventDefault();
            this.onKeyUp(event);
        });
    }

    private onKeyDown(event: KeyboardEvent): void {
        if(!this.down.includes(event.code)) {
            this.down.push(event.code);
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if(this.down.includes(event.code)) {
            this.down.splice(this.down.indexOf(event.code), 1);
        }
    }

    public isDown(name: string): boolean {
        return this.down.includes(name);
    }
}

export const input = new Input();
