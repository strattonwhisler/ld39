import { Engine } from './engine/engine';

import { LD39 } from './ld39';

function onload() {
    const config = {
        width: 800,
        height: 500
    };

    const engine = new Engine<LD39>();

    engine.start(new LD39(), config);
}
window.onload = onload;
