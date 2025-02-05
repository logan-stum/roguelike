import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js";

export class Renderer {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Add lighting
        const light = new THREE.AmbientLight(0x404040, 2);
        this.scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        this.scene.add(directionalLight);

        // Add floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        this.scene.add(floor);
    }
    addObject(object) {
        this.scene.add(object);
    }
    updateCamera(player) {
        this.camera.position.set(player.mesh.position.x, 5, player.mesh.position.z + 10);
        this.camera.lookAt(player.mesh.position);
    }
    updateCameraRotation(yaw, pitch) {
        this.camera.rotation.y = yaw;
        this.camera.rotation.x = pitch;
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}