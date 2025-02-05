import { Renderer } from "./renderer.js";
import { Dungeon } from "./game/dungeon.js";
import { Player } from "./game/player.js";
import { Enemy } from "./game/enemy.js";

export class Game {
    constructor() {
        this.renderer = new Renderer();
        this.dungeon = new Dungeon();
        this.player = new Player();
        this.enemies = [
            new Enemy(this.player.position.x + 5, this.player.position.z + 5),
            new Enemy(this.player.position.x - 3, this.player.position.z - 3)
        ];
        this.lastFrame = performance.now();

        // Add objects to scene
        this.renderer.addObject(this.player.mesh);
        this.enemies.forEach(enemy => this.renderer.addObject(enemy.mesh));
        
        this.keysPressed = {}; 

        // ✅ Event Listeners for Key Presses
        window.addEventListener('keydown', (event) => {
            this.keysPressed[event.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (event) => {
            delete this.keysPressed[event.key.toLowerCase()];
        });
    }

    start() {
        this.dungeon.generate();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(currentTime) {
        const delta = { x: 0, y: 0, z: 0 };

        // ✅ WASD Controls
        if (this.keysPressed['w']) delta.y -= 1;  // Move forward
        if (this.keysPressed['s']) delta.y += 1;  // Move backward
        if (this.keysPressed['a']) delta.x -= 1;  // Move left
        if (this.keysPressed['d']) delta.x += 1;  // Move right
        if (this.keysPressed[' ']) delta.z += 1;  // Jump (Space bar)

        this.lastFrame = currentTime;
        this.player.update(delta);  
        this.enemies.forEach(enemy => enemy.update(delta, this.player));
        this.renderer.updateCamera(this.player);
        this.renderer.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
