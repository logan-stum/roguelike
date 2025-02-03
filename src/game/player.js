import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js";

export class Player {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        this.mesh.position.set(this.position.x, 0.5, this.position.y);
    }
    update(delta) {
        console.log("Player moving", delta);
        this.mesh.position.x += delta.x;
        this.mesh.position.y += delta.y;
        this.mesh.position.z += delta.z;
    }
}