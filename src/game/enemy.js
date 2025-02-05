import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js";

export class Enemy {
    constructor(x, z) {
        this.position = { x, y: 0, z };
        this.mesh = this.createMesh();
        this.speed = 0.02;
        this.attackRange = 1.5;
        this.attackCooldown = 2000; // 2 seconds
        this.lastAttackTime = 0; // Track last attack time
        this.health = 5;
    }

    createMesh() {
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        return mesh;
    }

    update(delta, player) {
        const dx = player.position.x - this.position.x;
        const dz = player.position.z - this.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance > this.attackRange) {
            // ✅ Move toward the player if too far away
            this.position.x += (dx / distance) * this.speed;
            this.position.z += (dz / distance) * this.speed;
        } else {
            // ✅ Enemy is close enough to attack
            this.attack(player);
        }

        // Update Mesh Position
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    attack(player) {
        const currentTime = performance.now();
    
        if (currentTime - this.lastAttackTime > this.attackCooldown) {
            this.lastAttackTime = currentTime;
            this.swingArmAnimation();
            
            setTimeout(() => {
                player.takeDamage(this.attackDamage); // ✅ Deals damage after animation
                player.applyKnockback(this.position); // ✅ Apply knockback
            }, 500);
        }
    }
    
    swingArmAnimation() {
        if (!this.arm) return; // ✅ Ensure enemy has an arm
    
        let direction = 1;
        const swingInterval = setInterval(() => {
            this.arm.rotation.z += direction * 0.1;
            if (Math.abs(this.arm.rotation.z) > 0.5) direction *= -1;
        }, 50);
    
        setTimeout(() => clearInterval(swingInterval), 500); // ✅ Stops after 0.5s
    }

    applyKnockback(playerPosition) {
        const dx = this.position.x - playerPosition.x;
        const dz = this.position.z - playerPosition.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
    
        this.position.x += (dx / distance) * 0.5; // ✅ Knockback effect
        this.position.z += (dz / distance) * 0.5;
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }
    
}
