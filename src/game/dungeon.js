export class Dungeon {
    generate() {
        console.log("Generating dungeon...");
        this.map = Array.from({ length: 10 }, () => Array(10).fill(0));
        console.log("Dungeon Map:", this.map);
    }

    isWall(x, y) {
        const gridX = Math.floor(x);
        const gridY = Math.floor(y);
        return this.map[gridY] && this.map[gridY][gridX] === 1; // Assuming 1 is a wall
    }
    
}