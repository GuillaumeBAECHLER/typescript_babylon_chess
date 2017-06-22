import { Scene } from "./ressources/Scene";
import { Game } from "./ressources/Game";
import { Engine } from "./ressources/Engine";

const RenderEngine = new Engine("renderCanvas");
const myScene = new Scene(RenderEngine.getEngine());
const myGame = new Game(myScene);

myGame.initBoard();

myScene.getEngine().runRenderLoop(function() {
    myScene.getScene().render();
});
window.addEventListener("resize", function() {
    RenderEngine.getEngine().resize();
});

document.getElementById("toggle").addEventListener("click", function() {
    myScene.getEngine().switchFullscreen(true);
});