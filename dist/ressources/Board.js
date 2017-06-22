"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Square_1 = require("./Square");
var Board = (function () {
    function Board() {
        this.iNbXSquare = 8;
        this.iNbYSquare = 8;
    }
    Board.prototype.Board = function () {
        for (var i = 0; i < this.iNbXSquare * this.iNbYSquare; i += 1) {
            this.squares.push(new Square_1.Square());
        }
        console.log(this.squares.length);
    };
    Board.prototype.getSquares = function () {
        return this.squares;
    };
    Board.prototype.setSquares = function (squares) {
        this.squares = squares;
    };
    return Board;
}());
exports.Board = Board;
