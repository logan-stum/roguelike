export class Loot {
    generateLoot() {
        const lootItems = ["Sword", "Shield", "Potion", "Gold"];
        const randomLoot = lootItems[Math.floor(Math.random() * lootItems.length)];
        console.log("Found loot:", randomLoot);
        return randomLoot;
    }
}