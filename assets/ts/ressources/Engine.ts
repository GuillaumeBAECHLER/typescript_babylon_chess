export class Engine {

    private engine: BABYLON.Engine;
    private canvas: HTMLCanvasElement;

    public constructor(canvasId: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);
    }

    public getEngine() : BABYLON.Engine{
        return this.engine;
    }
}