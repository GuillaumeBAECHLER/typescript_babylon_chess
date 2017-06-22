import { Scene } from "./Scene";
import { ChestSquare } from "./ChestSquare";
import { getDefaultPieces } from "../../js/utility/util.js";
import { pieceMoves } from "../../js/moves/index.js";
export class Board {
    private iNbXSquare: number = 8;
    private iNbYSquare: number = 8;
    private squares: Array<ChestSquare> = new Array();
    public constructor(scene: Scene) {
        for (let i = 0; i < this.iNbXSquare * this.iNbYSquare; i += 1) {
            const newSquare = new ChestSquare(scene);
            newSquare.getObject().position.x = (Math.floor(i / 8) - 3.5) * 2;
            newSquare.getObject().position.z = (i % 8 - 3.5) * 2;
            const wood = new BABYLON.PBRMaterial("wood", scene.getScene());
            wood.reflectionTexture = <BABYLON.BaseTexture>scene.getHdr();
            wood.environmentIntensity = 1;
            wood.specularIntensity = 0.3;
            wood.cameraExposure = 0.6;
            wood.cameraContrast = 1.6;
            wood.microSurface = 0.80;
            wood.reflectivityTexture = new BABYLON.Texture("textures/woodReflect.jpg", scene.getScene());
            wood.reflectivityTexture.uScale = 0.1;
            wood.reflectivityTexture.vScale = 0.1;
            wood.reflectivityTexture.vOffset = (Math.floor(i / 8)) * 0.1;
            wood.reflectivityTexture.uOffset = (i % 8) * 0.1;
            // wood.useMicroSurfaceFromReflectivityMapAlpha = true;
            wood.albedoTexture = new BABYLON.Texture("textures/woodTexture.jpg", scene.getScene());
            wood.albedoTexture.uScale = 0.1;
            wood.albedoTexture.vScale = 0.1;
            wood.albedoTexture.vOffset = (Math.floor(i / 8)) * 0.1;
            wood.albedoTexture.uOffset = (i % 8) * 0.1;
            if ((i + Math.floor(i / 8)) % 2 === 0) {
                wood.albedoColor = new BABYLON.Color3(0.90, 0.81, 0.73);
            } else {
                wood.albedoColor = new BABYLON.Color3(0.47, 0.24, 0);
            }
            newSquare.getObject().material = wood;
            this.squares.push(newSquare);
        }
        this.initPieces();
    }

    public getSquares(): Array<ChestSquare> {
        return this.squares;
    }

    public setSquares(squares: Array<ChestSquare>) {
        this.squares = squares;
    }

    public initPieces(): void {
        const tab = getDefaultPieces();
        this.squares.map((square, i) => {
            if (tab[i].piece) {
                const scene = square.getScene();
                const filepath = tab[i].piece.concat(".babylon");
                BABYLON.SceneLoader.ImportMesh("", "textures/", filepath, scene.getScene(), function(newMeshes) {
                    newMeshes[0].position.x = (Math.floor(i / 8) - 3.5) * 2;
                    newMeshes[0].position.y = 0.5;
                    newMeshes[0].position.z = (i % 8 - 3.5) * 2;
                    color(newMeshes[0], scene);
                    newMeshes[0].actionManager = new BABYLON.ActionManager(scene.getScene());
                    pieceMoves
                    // const newpos = newMeshes[0].position.x + 2;
                    // newMeshes[0].actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickTrigger, newMeshes[0].position, "x", newpos));
                });
            }
            const color = (mesh: BABYLON.AbstractMesh, scene: Scene) => {
                let materialSphere1 = new BABYLON.StandardMaterial("texture1", scene.getScene());
                // const colorMaterial = new BABYLON.StandardMaterial("pawn", scene);
                if (tab[i].player === "white") {
                    materialSphere1.diffuseColor = new BABYLON.Color3(0.89, 0.73, 0.53);
                } else {
                    materialSphere1.diffuseColor = new BABYLON.Color3(0.36, 0.16, 0.07);
                }
                mesh.material = materialSphere1;
            };
        });
    }

}
