export class Player {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.speed = 0.1;
        this.jumpForce = 0.3;
        this.gravity = -0.01;
        this.isJumping = false;

        this.mesh = this.createMesh(); 
    }

    createMesh() {
        const geometry = new THREE.BoxGeometry(1, 2, 1); 
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); 
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        return mesh;
    }

    update(delta) {
        this.velocity.x = delta.x * this.speed; // Left/Right (A/D)
        this.velocity.z = delta.y * this.speed; // Forward/Backward (W/S)

        if (delta.z > 0 && !this.isJumping) {
            this.velocity.y = this.jumpForce; // Jump up
            this.isJumping = true;
        }

        this.velocity.y += this.gravity;
        if (this.position.y <= 0) { 
            this.position.y = 0;
            this.isJumping = false;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;

        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
}
