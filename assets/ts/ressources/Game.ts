import { Scene } from "./Scene";
import { Board } from './Board';

export class Game{
    private board : Board;
    private scene : Scene;

    public constructor(scene : Scene){
        this.scene = scene;
    }

    public getBoard() : Board{
        return this.board;
    }

    public setBoard(board : Board) : void{
        this.board = board;
    }

    public initBoard() : void{
        this.board = new Board(this.scene);
    }

    public initScene() : void{

    }
}
