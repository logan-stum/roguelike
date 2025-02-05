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

    update(delta, dungeon) {
        const nextX = this.position.x + delta.x * this.speed;
        const nextY = this.position.y + delta.y * this.speed;

        let isMoving = delta.x !== 0 || delta.y !== 0;
    
    // Play walking animation
        if (isMoving && this.position.z === 0) {
            this.mesh.playAnimation("walk");
        } else if (!isMoving) {
            this.mesh.playAnimation("idle");
        }

        // Jump animation
        if (delta.z > 0 && !this.isJumping) {
            this.mesh.playAnimation("jump");
        }
        
        // Check if next position is inside a wall
        if (!dungeon.isWall(nextX, nextY)) {
            this.position.x = nextX;
            this.position.y = nextY;
        }
    
        // Gravity & jumping
        this.velocity.z += this.gravity;
        if (this.position.z <= 0) {
            this.position.z = 0;
            this.isJumping = false;
        }
        
        this.position.z += this.velocity.z;
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
    
}
