export class Scene {

    private scene: BABYLON.Scene;
    private cameras: Array<BABYLON.Camera> = new Array();
    private lights: Array<BABYLON.Light> = new Array();
    private engine: BABYLON.Engine;
    private hdr: BABYLON.HDRCubeTexture;

    public constructor(engine: BABYLON.Engine) {
        this.engine = engine;
        this.scene = new BABYLON.Scene(engine);
        this.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 60, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.engine.getRenderingCanvas());
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 80;
        this.addCamera(camera);
        this.lights.push(new BABYLON.HemisphericLight("mainLight", new BABYLON.Vector3(0, 1, 0), this.scene));
        // Environment Texture
        const hdrTexture = new BABYLON.HDRCubeTexture("textures/room.hdr", this.scene, 512);
        const exposure = 0.6;
        const contrast = 1.6;
        // Skybox
        const hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, this.scene);
        const hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", this.scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.cameraExposure = exposure;
        hdrSkyboxMaterial.cameraContrast = contrast;
        hdrSkyboxMaterial.disableLighting = true;
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = true;
        this.hdr = hdrTexture;
    }

    public drawScene(): void {
        for (let i = 0; i < this.cameras.length; i += 1) {
            this.cameras[i].attachControl(this.engine.getRenderingCanvas(), false);
        }
    }

    public addCamera(newCamera: BABYLON.Camera): void {
        this.cameras.push(newCamera);
    }

    public getScene(): BABYLON.Scene {
        return this.scene;
    }

    public getEngine(): BABYLON.Engine {
        return this.engine;
    }

    public getHdr(): BABYLON.HDRCubeTexture {
        return this.hdr;
    }
}
