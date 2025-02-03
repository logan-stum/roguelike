export class Player {
    constructor() {
        this.position = { x: 0, y: 0 };
    }
    update(delta) {
        console.log("Player moving", delta);
        this.position.x += delta;
        this.position.y += delta;
    }
}