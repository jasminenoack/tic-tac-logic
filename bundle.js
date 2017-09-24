/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = __webpack_require__(2);
var puzzles = __webpack_require__(1);
var stepManager_1 = __webpack_require__(5);
var windowSearch = window.location.search;
var element = document.getElementById("tic-tac-puzzle");
function createBoard(board) {
    element.className = "width-" + board.width;
    for (var i = 0; i < board.width * board.height; i++) {
        var subElement = document.createElement("div");
        subElement.className = "spot";
        element.appendChild(subElement);
    }
}
function updateSpot(board, index) {
    var spots = element.getElementsByClassName("spot");
    if (spots && spots[index]) {
        spots[index].innerText = board.value(index);
    }
}
function updateAllSpots(board) {
    for (var i = 0; i < board.width * board.height; i++) {
        updateSpot(board, i);
    }
}
if (windowSearch) {
    var puzzleName = void 0;
    if (windowSearch.split("p=").length > 1) {
        puzzleName = windowSearch.split("p=")[1].split("&")[0];
    }
    if (puzzleName) {
        var puzzleData = puzzles[puzzleName];
        var board = new board_1.Board(puzzleData.width, puzzleData.height, puzzleData.xs, puzzleData.os);
        createBoard(board);
        updateAllSpots(board);
        var manager = new stepManager_1.StepManager(board);
        // setInterval()
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleBoard1 = {
    height: 6,
    os: [
        [1, 5],
        [2, 3],
        [3, 1],
        [4, 4],
        [5, 4],
    ],
    width: 6,
    xs: [
        [0, 1],
        [0, 2],
        [2, 0],
        [4, 1],
    ],
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var indexManager_1 = __webpack_require__(3);
var spot_1 = __webpack_require__(4);
var Board = /** @class */ (function () {
    function Board(width, height, xs, os) {
        this.width = width;
        this.height = height;
        var tempValues = [];
        xs.forEach(function (location) {
            var index = indexManager_1.IndexManager.findIndex(location[0], location[1], width);
            tempValues[index] = "X";
        });
        os.forEach(function (location) {
            var index = indexManager_1.IndexManager.findIndex(location[0], location[1], width);
            tempValues[index] = "O";
        });
        this.spots = [];
        for (var i = 0; i < width * height; i++) {
            this.spots.push(new spot_1.Spot(tempValues[i]));
        }
    }
    Board.prototype.value = function (index) {
        return this.spots[index].get();
    };
    Board.prototype.setSpot = function (value, index) {
        if (this.spots[index]) {
            this.spots[index].set(value);
        }
    };
    return Board;
}());
exports.Board = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IndexManager = /** @class */ (function () {
    function IndexManager() {
    }
    IndexManager.getRowIndexes = function (row, width) {
        var baseIndex = row * width;
        var indexes = [];
        for (var i = baseIndex; i < baseIndex + width; i++) {
            indexes.push(i);
        }
        return indexes;
    };
    IndexManager.getColumnIndexes = function (column, width, height) {
        var elementCount = width * height;
        var indexes = [];
        for (var i = column; i < elementCount; i += width) {
            indexes.push(i);
        }
        return indexes;
    };
    IndexManager.findIndex = function (row, column, width) {
        return row * width + column;
    };
    IndexManager.getConsecutiveRowPairs = function (width, height) {
        var results = [];
        for (var i = 0; i < height; i++) {
            var rowIndexes = this.getRowIndexes(i, width);
            for (var j = 1; j < rowIndexes.length; j++) {
                results.push([rowIndexes[j - 1], rowIndexes[j]]);
            }
        }
        return results;
    };
    IndexManager.getConsecutiveColumnPairs = function (width, height) {
        var results = [];
        for (var i = 0; i < width; i++) {
            var columnIndexes = this.getColumnIndexes(i, width, height);
            for (var j = 1; j < columnIndexes.length; j++) {
                results.push([columnIndexes[j - 1], columnIndexes[j]]);
            }
        }
        return results;
    };
    IndexManager.getNeighbors = function (indexes, type, width, height) {
        var firstProcessedIndex = indexes[0];
        var lastProcessedIndex = indexes[indexes.length - 1];
        var currentIndexes;
        if (type === "row") {
            currentIndexes = this.getRowIndexes(this.getRowStart(firstProcessedIndex, width), width);
        }
        else if (type === "column") {
            currentIndexes = this.getColumnIndexes(this.getColumnStart(firstProcessedIndex, width), width, height);
        }
        var startIndex = currentIndexes.indexOf(firstProcessedIndex);
        var endIndex = currentIndexes.indexOf(lastProcessedIndex);
        var results = [];
        if (startIndex) {
            results.push(currentIndexes[startIndex - 1]);
        }
        if (endIndex < currentIndexes.length - 1) {
            results.push(currentIndexes[endIndex + 1]);
        }
        return results;
    };
    IndexManager.getRowStart = function (index, width) {
        return Math.floor(index / width);
    };
    IndexManager.getColumnStart = function (index, width) {
        return index % width;
    };
    return IndexManager;
}());
exports.IndexManager = IndexManager;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Spot = /** @class */ (function () {
    function Spot(value) {
        if (value === void 0) { value = ""; }
        this.isGiven = false;
        this.set(value);
        if (value) {
            this.isGiven = true;
        }
    }
    Spot.prototype.get = function () {
        return this.value;
    };
    Spot.prototype.set = function (value) {
        if (value !== "X" && value !== "O" && value !== "") {
            throw new Error(("Invalid value"));
        }
        if (!this.given()) {
            this.value = value;
        }
    };
    Spot.prototype.given = function () {
        return this.isGiven;
    };
    return Spot;
}());
exports.Spot = Spot;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comparisonManager_1 = __webpack_require__(6);
var indexManager_1 = __webpack_require__(3);
var consecutivePairs = "consecutivePairs";
var flags = {
    active: "current",
    compare: "compare",
    insert: "insert",
};
var StepManager = /** @class */ (function () {
    function StepManager(board) {
        this.board = board;
        this.resetState();
    }
    StepManager.prototype.resetState = function () {
        this.state = {
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: true,
        };
    };
    StepManager.prototype.setUp = function () {
        this.resetState();
        this.state.consecutivePairs.rows = indexManager_1.IndexManager.getConsecutiveRowPairs(this.board.width, this.board.height);
        this.state.consecutivePairs.columns = indexManager_1.IndexManager.getConsecutiveColumnPairs(this.board.width, this.board.height);
        this.state.madeAChange = false;
    };
    StepManager.prototype.flag = function (index) {
        switch (this.currentStep()) {
            case consecutivePairs:
                var consecData = this.state.consecutivePairs;
                if (consecData.insertOpposite.indexOf(index) !== -1) {
                    return flags.insert;
                }
                else if (consecData.checkEmpty.indexOf(index) !== -1) {
                    return flags.compare;
                }
                else if (consecData.currentPair.indexOf(index) !== -1) {
                    return flags.active;
                }
                break;
        }
    };
    StepManager.prototype.currentStep = function () {
        if (this.state.consecutivePairs.rows.length ||
            this.state.consecutivePairs.columns.length ||
            this.state.consecutivePairs.currentType ||
            this.state.consecutivePairs.currentPair.length) {
            return consecutivePairs;
        }
    };
    StepManager.prototype.takeStep = function () {
        switch (this.currentStep()) {
            case consecutivePairs:
                this.takeConsecutivePairsStep();
                break;
            default:
                if (this.state.madeAChange) {
                    this.setUp();
                }
        }
    };
    StepManager.prototype.resetConsecutivePairs = function () {
        this.state.consecutivePairs.currentType = "";
        this.state.consecutivePairs.currentPair = [];
        this.state.consecutivePairs.insertOpposite = [];
        this.state.consecutivePairs.checkEmpty = [];
    };
    StepManager.prototype.takeConsecutivePairsStep = function () {
        if (this.state.consecutivePairs.currentPair.length) {
            this.handleCurrentConsecutivePair();
        }
        else if (this.state.consecutivePairs.rows.length) {
            this.state.consecutivePairs.currentPair = this.state.consecutivePairs.rows.shift();
            this.state.consecutivePairs.currentType = "row";
        }
        else if (this.state.consecutivePairs.columns.length) {
            this.state.consecutivePairs.currentPair = this.state.consecutivePairs.columns.shift();
            this.state.consecutivePairs.currentType = "column";
        }
    };
    StepManager.prototype.handleCurrentConsecutivePair = function () {
        var _this = this;
        var pair = this.state.consecutivePairs.currentPair;
        var spots = this.board.spots;
        if (this.state.consecutivePairs.insertOpposite.length) {
            var value_1 = this.board.value(pair[0]) === "O" ? "X" : "O";
            this.state.consecutivePairs.insertOpposite.forEach(function (index) {
                _this.board.setSpot(value_1, index);
            });
            this.resetConsecutivePairs();
            this.state.madeAChange = true;
        }
        else if (this.state.consecutivePairs.checkEmpty.length) {
            var empty = this.state.consecutivePairs.checkEmpty;
            empty.forEach(function (index) {
                if (!_this.board.value(index)) {
                    _this.state.consecutivePairs.insertOpposite.push(index);
                }
            });
            if (!this.state.consecutivePairs.insertOpposite.length) {
                this.resetConsecutivePairs();
            }
        }
        else if (comparisonManager_1.ComparisonManager.compareTwo(spots[pair[0]], spots[pair[1]])) {
            this.state.consecutivePairs.checkEmpty = indexManager_1.IndexManager.getNeighbors(pair, this.state.consecutivePairs.currentType, this.board.width, this.board.height);
        }
        else {
            this.resetConsecutivePairs();
        }
    };
    return StepManager;
}());
exports.StepManager = StepManager;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComparisonManager = /** @class */ (function () {
    function ComparisonManager() {
    }
    ComparisonManager.compareTwo = function (firstSpot, secondSpot) {
        var firstValue = firstSpot.get();
        var secondValue = secondSpot.get();
        return !!(firstValue && secondValue && firstValue === secondValue);
    };
    return ComparisonManager;
}());
exports.ComparisonManager = ComparisonManager;


/***/ })
/******/ ]);