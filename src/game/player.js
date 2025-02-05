export class Player {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.velocity = { x: 0, y: 0, z: 0 }; // Movement velocity
        this.speed = 0.1; // Movement speed
        this.jumpForce = 0.3; // Jump force
        this.gravity = -0.01; // Gravity (if needed)
        this.isJumping = false; 

        this.mesh = this.createMesh(); // Assuming you have a function to create a 3D mesh
    }

    createMesh() {
        // Create and return a mesh (Three.js or other framework)
    }

    update(delta) {
        // Apply movement based on delta
        this.velocity.x = delta.x * this.speed;
        this.velocity.y = delta.y * this.speed;

        // Apply jump logic
        if (delta.z > 0 && !this.isJumping) {
            this.velocity.z = this.jumpForce;
            this.isJumping = true;
        }

        // Apply gravity
        this.velocity.z += this.gravity;
        if (this.position.z <= 0) { // Prevent falling below ground
            this.position.z = 0;
            this.isJumping = false;
        }

        // Update position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;

        // Update mesh position
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
}
