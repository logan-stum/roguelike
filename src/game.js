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
        if (this.player.health <= 0) return;
        const delta = { x: 0, y: 0, z: 0 };
    
        if (this.keysPressed['w']) delta.y -= 1;
        if (this.keysPressed['s']) delta.y += 1;
        if (this.keysPressed['a']) delta.x -= 1;
        if (this.keysPressed['d']) delta.x += 1;
        if (this.keysPressed[' ']) delta.z += 1;
    
        this.lastFrame = currentTime;
        this.player.update(delta);
    
        this.enemies.forEach(enemy => {
            enemy.update(delta, this.player);
            
            // ✅ Check if the enemy is close enough to damage the player
            const distance = Math.sqrt(
                (enemy.position.x - this.player.position.x) ** 2 + 
                (enemy.position.z - this.player.position.z) ** 2
            );
    
            if (distance < 1.5) { // ✅ Enemy is close enough to hit
                this.player.takeDamage(2); // ✅ Deal 5 damage to the player
            }
        });
    
        this.renderer.updateCamera(this.player);
        this.renderer.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
}
