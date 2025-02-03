export class Combat {
    attack(attacker, defender) {
        console.log(`${attacker} attacks ${defender}`);
        defender.health -= 10;
        if (defender.health <= 0) {
            console.log(`${defender} is defeated`);
        }
    }
}