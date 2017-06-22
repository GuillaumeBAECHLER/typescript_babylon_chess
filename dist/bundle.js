(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceEnum = Object.freeze({
    KING: 'king',
    QUEEN: 'queen',
    ROOK: 'rook',
    BISHOP: 'bishop',
    KNIGHT: 'knight',
    PAWN: 'pawn',
});
exports.PieceEnum = PieceEnum;
// crée le board par défaut (placement initial)
/*
  TODO : refactor avec array.filter() ??; ex:  [2, 4, 6].filter(gt4).map(double); [8, 12]
*/
function getDefaultPieces() {
    // définit la couleur de la pièce
    var definePlayer = function definePlayer(i) {
        if (i < 16) {
            return 'black';
        }
        else if (63 - i < 16) {
            return ('white');
        }
        return undefined;
    };
    // on définit le type de la pièce (grâce à la symétrie)
    // 63-x = symétrie centrale
    var definePiece = function definePiece(i) {
        // les rois et dames ne sont pas symétriques
        switch (i) {
            case 3:
            case 59:
                return PieceEnum.QUEEN;
            case 4:
            case 60:
                return PieceEnum.KING;
            default: break;
        }
        var half = function half(j) {
            if (j >= 8 && j <= 15) {
                return PieceEnum.PAWN;
            }
            switch (j) {
                case 0:
                case 7 - 0:
                    return PieceEnum.ROOK;
                case 1:
                case 7 - 1:
                    return PieceEnum.KNIGHT;
                case 2:
                case 7 - 2:
                    return PieceEnum.BISHOP;
                default:
                    return undefined;
            }
        };
        if (i < 16)
            return half(i);
        else if (63 - i < 16)
            return half(63 - i);
        return undefined;
    };
    // on déclare un Array de 64 élements
    // puis on applique les fonctions de définition sur chacun des squares
    return Array(64).fill(undefined).map(function (_, i) { return ({
        player: definePlayer(i),
        piece: definePiece(i),
    }); });
}
exports.getDefaultPieces = getDefaultPieces;
function getX(i) {
    return i % 8;
}
exports.getX = getX;
function getY(i) {
    return parseInt(i / 8, 10);
}
exports.getY = getY;
function getId(x, y) {
    return (y * 8) + x;
}
exports.getId = getId;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene_1 = require("./ressources/Scene");
var Game_1 = require("./ressources/Game");
var Engine_1 = require("./ressources/Engine");
var RenderEngine = new Engine_1.Engine("renderCanvas");
var myScene = new Scene_1.Scene(RenderEngine.getEngine());
var myGame = new Game_1.Game(myScene);
myGame.initBoard();
myScene.getEngine().runRenderLoop(function () {
    myScene.getScene().render();
});
window.addEventListener("resize", function () {
    RenderEngine.getEngine().resize();
});
document.getElementById("toggle").addEventListener("click", function () {
    myScene.getEngine().switchFullscreen(true);
});

},{"./ressources/Engine":5,"./ressources/Game":6,"./ressources/Scene":7}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChestSquare_1 = require("./ChestSquare");
var util_js_1 = require("../../js/util.js");
var Board = (function () {
    function Board(scene) {
        this.iNbXSquare = 8;
        this.iNbYSquare = 8;
        this.squares = new Array();
        for (var i = 0; i < this.iNbXSquare * this.iNbYSquare; i += 1) {
            var newSquare = new ChestSquare_1.ChestSquare(scene);
            newSquare.getObject().position.x = (Math.floor(i / 8) - 3.5) * 2;
            newSquare.getObject().position.z = (i % 8 - 3.5) * 2;
            var wood = new BABYLON.PBRMaterial("wood", scene.getScene());
            wood.reflectionTexture = scene.getHdr();
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
            }
            else {
                wood.albedoColor = new BABYLON.Color3(0.47, 0.24, 0);
            }
            newSquare.getObject().material = wood;
            this.squares.push(newSquare);
        }
        this.initPieces();
    }
    Board.prototype.getSquares = function () {
        return this.squares;
    };
    Board.prototype.setSquares = function (squares) {
        this.squares = squares;
    };
    Board.prototype.initPieces = function () {
        var tab = util_js_1.getDefaultPieces();
        this.squares.map(function (square, i) {
            if (tab[i].piece) {
                var scene_1 = square.getScene();
                var filepath = tab[i].piece.concat(".babylon");
                BABYLON.SceneLoader.ImportMesh("", "textures/", filepath, scene_1.getScene(), function (newMeshes) {
                    newMeshes[0].position.x = (Math.floor(i / 8) - 3.5) * 2;
                    newMeshes[0].position.y = 0.5;
                    newMeshes[0].position.z = (i % 8 - 3.5) * 2;
                    color(newMeshes[0], scene_1);
                    newMeshes[0].actionManager = new BABYLON.ActionManager(scene_1.getScene());
                    var newpos = newMeshes[0].position.x + 2;
                    newMeshes[0].actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickTrigger, newMeshes[0].position, "x", newpos));
                });
            }
            var color = function (mesh, scene) {
                var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene.getScene());
                // const colorMaterial = new BABYLON.StandardMaterial("pawn", scene);
                if (tab[i].player === "white") {
                    materialSphere1.diffuseColor = new BABYLON.Color3(0.89, 0.73, 0.53);
                }
                else {
                    materialSphere1.diffuseColor = new BABYLON.Color3(0.36, 0.16, 0.07);
                }
                mesh.material = materialSphere1;
            };
        });
    };
    return Board;
}());
exports.Board = Board;

},{"../../js/util.js":1,"./ChestSquare":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChestSquare = (function () {
    function ChestSquare(scene) {
        this.object = BABYLON.MeshBuilder.CreateBox("plane", { width: 2, height: 1, depth: 2 }, scene.getScene());
        this.scene = scene;
    }
    ChestSquare.prototype.getObject = function () {
        return this.object;
    };
    ChestSquare.prototype.getScene = function () {
        return this.scene;
    };
    return ChestSquare;
}());
exports.ChestSquare = ChestSquare;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine = (function () {
    function Engine(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);
    }
    Engine.prototype.getEngine = function () {
        return this.engine;
    };
    return Engine;
}());
exports.Engine = Engine;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
var Game = (function () {
    function Game(scene) {
        this.scene = scene;
    }
    Game.prototype.getBoard = function () {
        return this.board;
    };
    Game.prototype.setBoard = function (board) {
        this.board = board;
    };
    Game.prototype.initBoard = function () {
        this.board = new Board_1.Board(this.scene);
    };
    Game.prototype.initScene = function () {
    };
    return Game;
}());
exports.Game = Game;

},{"./Board":3}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = (function () {
    function Scene(engine) {
        this.cameras = new Array();
        this.lights = new Array();
        this.engine = engine;
        this.scene = new BABYLON.Scene(engine);
        this.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 60, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.engine.getRenderingCanvas());
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 80;
        this.addCamera(camera);
        this.lights.push(new BABYLON.HemisphericLight("mainLight", new BABYLON.Vector3(0, 1, 0), this.scene));
        // Environment Texture
        var hdrTexture = new BABYLON.HDRCubeTexture("textures/room.hdr", this.scene, 512);
        var exposure = 0.6;
        var contrast = 1.6;
        // Skybox
        var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, this.scene);
        var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", this.scene);
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
    Scene.prototype.drawScene = function () {
        for (var i = 0; i < this.cameras.length; i += 1) {
            this.cameras[i].attachControl(this.engine.getRenderingCanvas(), false);
        }
    };
    Scene.prototype.addCamera = function (newCamera) {
        this.cameras.push(newCamera);
    };
    Scene.prototype.getScene = function () {
        return this.scene;
    };
    Scene.prototype.getEngine = function () {
        return this.engine;
    };
    Scene.prototype.getHdr = function () {
        return this.hdr;
    };
    return Scene;
}());
exports.Scene = Scene;

},{}]},{},[2]);
