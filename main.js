import { Renderer } from "./src/renderer.js";
import { Game } from "./src/game.js";

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    game.start();
});