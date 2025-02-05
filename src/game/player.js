import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js";

export class Player {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.speed = 0.1;
        this.jumpForce = 0.3;
        this.gravity = -0.01;
        this.isJumping = false;

        this.health = 100;
        this.attackCooldown = 500; // 0.5s cooldown
        this.lastAttackTime = 0;
    
        window.addEventListener("click", () => this.attack());

        this.health = 100; 
        this.mesh = this.createMesh();
        this.createHealthBar(); 
        this.createGameOverScreen(); 

    }

    createMesh() {
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        return mesh;
    }

    createHealthBar() {
        this.healthBar = document.createElement("div");
        this.healthBar.style.position = "absolute";
        this.healthBar.style.top = "20px";
        this.healthBar.style.left = "20px";
        this.healthBar.style.width = "200px";
        this.healthBar.style.height = "20px";
        this.healthBar.style.border = "2px solid black";
        this.healthBar.style.backgroundColor = "green"; // ✅ Starts green
        document.body.appendChild(this.healthBar);
    }

    createGameOverScreen() {
        this.gameOverScreen = document.createElement("div");
        this.gameOverScreen.style.position = "absolute";
        this.gameOverScreen.style.top = "50%";
        this.gameOverScreen.style.left = "50%";
        this.gameOverScreen.style.transform = "translate(-50%, -50%)";
        this.gameOverScreen.style.fontSize = "48px";
        this.gameOverScreen.style.color = "red";
        this.gameOverScreen.style.fontWeight = "bold";
        this.gameOverScreen.style.textAlign = "center";
        this.gameOverScreen.style.display = "none"; // ✅ Hidden initially
        this.gameOverScreen.innerHTML = "GAME OVER<br><button id='restartBtn'>Restart</button>";
        document.body.appendChild(this.gameOverScreen);
    
        // ✅ Add Restart Button Functionality
        document.getElementById('restartBtn').addEventListener('click', () => {
            location.reload(); // ✅ Reloads the game
        });
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        this.updateHealthBar();
    
        if (this.health === 0) {
            this.gameOver(); // ✅ Call game over when HP is 0
        }
    }
    
    gameOver() {
        this.gameOverScreen.style.display = "block"; // ✅ Show "Game Over"
        window.removeEventListener('keydown', this.keydownHandler);
        window.removeEventListener('keyup', this.keyupHandler);
    }
    

    updateHealthBar() {
        const percentage = this.health / 100;
        this.healthBar.style.width = `${200 * percentage}px`;
    
        // ✅ Smooth color transition from green to red
        const red = Math.min(255, 255 - percentage * 100);
        const green = Math.max(0, percentage * 255);
        this.healthBar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;
    }

    update(delta) {
        this.velocity.x = delta.x * this.speed;
        this.velocity.z = delta.y * this.speed;

        if (delta.z > 0 && !this.isJumping) {
            this.velocity.y = this.jumpForce;
            this.isJumping = true;
        }

        this.velocity.y += this.gravity;
        if (this.position.y + this.velocity.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
            this.isJumping = false;
        } else {
            this.position.y += this.velocity.y;
        }

        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;

        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    applyKnockback(enemyPosition) {
        const dx = this.position.x - enemyPosition.x;
        const dz = this.position.z - enemyPosition.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
    
        this.position.x += (dx / distance) * 0.5; // ✅ Push back slightly
        this.position.z += (dz / distance) * 0.5;
    }

    attack() {
        const currentTime = performance.now();
        if (currentTime - this.lastAttackTime < this.attackCooldown) return; // ✅ Prevent spam
    
        this.lastAttackTime = currentTime;
        this.swingArmAnimation();
    
        // ✅ Check for nearby enemies
        game.enemies.forEach(enemy => {
            const distance = Math.hypot(this.position.x - enemy.position.x, this.position.z - enemy.position.z);
            if (distance < 2) { 
                enemy.takeDamage(10); // ✅ Deal damage
                enemy.applyKnockback(this.position); // ✅ Knockback effect
            }
        });
    }
    swingArmAnimation() {
        let direction = 1;
        const swingInterval = setInterval(() => {
            this.mesh.rotation.z += direction * 0.1;
            if (Math.abs(this.mesh.rotation.z) > 0.5) direction *= -1;
        }, 50);
    
        setTimeout(() => clearInterval(swingInterval), 300); // ✅ Stops after 0.3s
    }
}
