define("ressources/Square", ["require", "exports"], function (require, exports) {
    "use strict";
    var Square = (function () {
        function Square() {
        }
        return Square;
    }());
    exports.Square = Square;
});
define("ressources/Board", ["require", "exports", "ressources/Square"], function (require, exports, Square_1) {
    "use strict";
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
});
define("ressources/Game", ["require", "exports", "ressources/Board"], function (require, exports, Board_1) {
    "use strict";
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
});
define("app", ["require", "exports", "ressources/Game"], function (require, exports, Game_1) {
    "use strict";
    var myGame = new Game_1.Game();
    myGame.initBoard();
});
