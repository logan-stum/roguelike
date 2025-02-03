import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js";

export class Enemy {
    constructor(x, y) {
        this.position = { x, y };
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.75, 0.75, 0.75),
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        this.mesh.position.set(this.position.x, 0.5, this.position.y);
    }
    update(delta, player) {
        console.log("Enemy moving towards", player.position);
        if (player.mesh.position.x > this.mesh.position.x) this.mesh.position.x += delta;
        if (player.mesh.position.x < this.mesh.position.x) this.mesh.position.x -= delta;
        if (player.mesh.position.z > this.mesh.position.z) this.mesh.position.z += delta;
        if (player.mesh.position.z < this.mesh.position.z) this.mesh.position.z -= delta;
    }
}