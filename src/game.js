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

        // ✅ Event Listeners for Key Presses
        window.addEventListener('keydown', (event) => {
            this.keysPressed[event.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (event) => {
            delete this.keysPressed[event.key.toLowerCase()];
        });
        this.mouseSensitivity = 0.002;
        this.yaw = 0; // Horizontal rotation
        this.pitch = 0; // Vertical rotation

        // Lock the mouse when clicking on the screen
        window.addEventListener("click", () => {
            document.body.requestPointerLock();
        });

        // Capture mouse movement
        window.addEventListener("mousemove", (event) => {
            if (document.pointerLockElement === document.body) {
                this.yaw -= event.movementX * this.mouseSensitivity;
                this.pitch -= event.movementY * this.mouseSensitivity;
                this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch)); // Limit up/down look
                this.renderer.updateCameraRotation(this.yaw, this.pitch);
            }
        });

    }

    start() {
        this.dungeon.generate();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(currentTime) {
        const delta = { x: 0, y: 0, z: 0 };

        // ✅ WASD Controls
        if (this.keysPressed['w']) delta.y += 1;  // Move forward
        if (this.keysPressed['s']) delta.y -= 1;  // Move backward
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
