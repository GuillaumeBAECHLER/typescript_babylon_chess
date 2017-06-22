import { Scene } from "./Scene";
export class ChestSquare {
    private object: BABYLON.Mesh;
    private scene: Scene;
    public constructor(scene: Scene) {
        this.object = BABYLON.MeshBuilder.CreateBox("plane", { width: 2, height: 1, depth: 2 }, scene.getScene());
        this.scene = scene;
    }
    public getObject(): BABYLON.Mesh {
        return this.object;
    }
    public getScene(): Scene {
        return this.scene;
    }
}
