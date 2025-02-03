export class Enemy {
    constructor(x, y) {
        this.position = { x, y };
    }
    update(delta, player) {
        console.log("Enemy moving towards", player.position);
        if (player.position.x > this.position.x) this.position.x += delta;
        if (player.position.x < this.position.x) this.position.x -= delta;
        if (player.position.y > this.position.y) this.position.y += delta;
        if (player.position.y < this.position.y) this.position.y -= delta;
    }
}