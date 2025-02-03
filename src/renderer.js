import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js";

export class Renderer {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);
        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}