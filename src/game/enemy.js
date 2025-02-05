import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js";

export class Enemy {
    constructor(x, z) {
        this.position = { x, y: 0, z }; // Ensure y is 0 so they are on the ground
        this.mesh = this.createMesh();
    }

    createMesh() {
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color for enemies
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        return mesh;
    }

    update(delta, player) {
        // Example: Make enemy slowly move toward the player
        const speed = 0.02;
        const dx = player.position.x - this.position.x;
        const dz = player.position.z - this.position.z;
        const length = Math.sqrt(dx * dx + dz * dz);
        
        if (length > 0.1) { // Prevent jittering when close to player
            this.position.x += (dx / length) * speed;
            this.position.z += (dz / length) * speed;
        }

        // Update Mesh Position
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
}
