export class Dungeon {
    generate() {
        console.log("Generating dungeon...");
        this.map = Array.from({ length: 10 }, () => Array(10).fill(0));
        console.log("Dungeon Map:", this.map);
    }
}