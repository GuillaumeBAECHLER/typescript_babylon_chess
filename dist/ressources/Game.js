"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
var Game = (function () {
    function Game() {
    }
    Game.prototype.getBoard = function () {
        return this.board;
    };
    Game.prototype.setBoard = function (board) {
        this.board = board;
    };
    Game.prototype.initBoard = function () {
        this.board = new Board_1.Board();
    };
    return Game;
}());
exports.Game = Game;
