import * as THREE from 'three';

export class Player {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.speed = 0.1;
        this.jumpForce = 0.3;
        this.gravity = -0.01;
        this.isJumping = false;

        this.mesh = this.createMesh(); // Create 3D mesh
    }

    createMesh() {
        const geometry = new THREE.BoxGeometry(1, 2, 1); // 1x2x1 cube (like a character)
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green color
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        return mesh;
    }

    update(delta) {
        this.velocity.x = delta.x * this.speed;
        this.velocity.y = delta.y * this.speed;

        if (delta.z > 0 && !this.isJumping) {
            this.velocity.z = this.jumpForce;
            this.isJumping = true;
        }

        this.velocity.z += this.gravity;
        if (this.position.z <= 0) { 
            this.position.z = 0;
            this.isJumping = false;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;

        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
}
