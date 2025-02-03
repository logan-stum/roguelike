import { Renderer } from "./renderer.js";
import { Dungeon } from "./game/dungeon.js";
import { Player } from "./game/player.js";
import { Enemy } from "./game/enemy.js";

export class Game {
    constructor() {
        this.renderer = new Renderer();
        this.dungeon = new Dungeon();
        this.player = new Player();
        this.enemies = [new Enemy(5, 0), new Enemy(-3, 0)];
        this.lastFrame = performance.now();

        // Add objects to scene
        this.renderer.addObject(this.player.mesh);
        this.enemies.forEach(enemy => this.renderer.addObject(enemy.mesh));
        
        this.keysPressed = {}; 

        window.addEventListener('keydown', (event) => {
        this.keysPressed[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
        delete this.keysPressed[event.key];
        });
    }
    start() {
        this.dungeon.generate();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    gameLoop(currentTime) {
        let delta = {x, y, z};

        if (this.keysPressed['d']) {
            delta.x + 1;
            }
        
        if (this.keysPressed['a']) {
            delta.x - 1;
            }

        if (this.keysPressed['w']) {
            delta.y + 1;
            }

        if (this.keysPressed['d']) {
            delta.y - 1;
            }  

        if (this.keysPressed['space']) {
            delta.z + 1;
            }  
        this.lastFrame = currentTime;
        this.player.update(delta);
        this.enemies.forEach(enemy => enemy.update(delta, this.player));
        this.renderer.updateCamera(this.player);
        this.renderer.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}