import { Renderer } from "./renderer.js";
import { Dungeon } from "./game/dungeon.js";
import { Player } from "./game/player.js";
import { Enemy } from "./game/enemy.js";

export class Game {
    constructor() {
        this.renderer = new Renderer();
        this.dungeon = new Dungeon();
        this.player = new Player();
        this.enemies = [new Enemy(5, 5), new Enemy(-3, 4)];
        this.lastFrame = performance.now();
    }
    start() {
        this.dungeon.generate();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    gameLoop(currentTime) {
        let delta = (currentTime - this.lastFrame) / 1000;
        this.lastFrame = currentTime;
        this.player.update(delta);
        this.enemies.forEach(enemy => enemy.update(delta, this.player));
        this.renderer.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}