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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rowName = "row";
var columnName = "column";
var x = "X";
var o = "O";
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
    IndexManager.getOneSepRowPairs = function (width, height) {
        var results = [];
        for (var i = 0; i < height; i++) {
            var rowIndexes = this.getRowIndexes(i, width);
            for (var j = 2; j < rowIndexes.length; j++) {
                results.push([rowIndexes[j - 2], rowIndexes[j]]);
            }
        }
        return results;
    };
    IndexManager.getOneSepColumnPairs = function (width, height) {
        var results = [];
        for (var i = 0; i < width; i++) {
            var columnIndexes = this.getColumnIndexes(i, width, height);
            for (var j = 2; j < columnIndexes.length; j++) {
                results.push([columnIndexes[j - 2], columnIndexes[j]]);
            }
        }
        return results;
    };
    IndexManager.getBetween = function (pair, type) {
        return [(pair[0] + pair[1]) / 2];
    };
    IndexManager.getNeighbors = function (indexes, type, width, height) {
        var firstProcessedIndex = indexes[0];
        var lastProcessedIndex = indexes[indexes.length - 1];
        var currentIndexes;
        if (type === rowName) {
            currentIndexes = this.getRowIndexes(this.getRowStart(firstProcessedIndex, width), width);
        }
        else if (type === columnName) {
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
    IndexManager.getBlanks = function (board, type, index) {
        var indexes = this.getSectionIndexes(type, index, board.width, board.height);
        var result = [];
        indexes.forEach(function (currentIndex) {
            if (!board.value(currentIndex)) {
                result.push(currentIndex);
            }
        });
        return result;
    };
    IndexManager.blankGroups = function (board, type, index) {
        var indexes = this.getSectionIndexes(type, index, board.width, board.height);
        var blanks = this.getBlanks(board, type, index);
        var result = [];
        var currentSeries = [];
        var blankIndex = 0;
        indexes.forEach(function (currentIndex) {
            if (currentIndex === blanks[blankIndex]) {
                currentSeries.push(currentIndex);
                blankIndex++;
            }
            else {
                if (currentSeries.length) {
                    result.push(currentSeries);
                    currentSeries = [];
                }
            }
        });
        if (currentSeries.length) {
            result.push(currentSeries);
            currentSeries = [];
        }
        return result;
    };
    IndexManager.indexIndexesForValue = function (board, type, index, value) {
        var indexes = this.getSectionIndexes(type, index, board.width, board.height);
        var result = [];
        indexes.forEach(function (currentIndex, subIndex) {
            if (board.value(currentIndex) === value) {
                result.push(subIndex);
            }
        });
        return result;
    };
    IndexManager.blanksInOrder = function (board, type, index) {
        var indexes = this.getSectionIndexes(type, index, board.width, board.height);
        var blanks = this.getBlanks(board, type, index);
        if (blanks.length) {
            var firstBlankIndex = indexes.indexOf(blanks[0]);
            for (var i = 0; i < blanks.length; i++) {
                var indexIndex = firstBlankIndex + i;
                if (indexes[indexIndex] !== blanks[i]) {
                    return false;
                }
            }
        }
        else {
            return false;
        }
        return true;
    };
    IndexManager.countValues = function (board, type, index) {
        var indexes = this.getSectionIndexes(type, index, board.width, board.height);
        var result = {
            o: 0,
            x: 0,
        };
        indexes.forEach(function (currentIndex) {
            var value = board.value(currentIndex);
            if (value === x) {
                result.x += 1;
            }
            else if (value === o) {
                result.o += 1;
            }
        });
        return result;
    };
    IndexManager.leftOver = function (board, type, index) {
        var counts = this.countValues(board, type, index);
        var expectedCount;
        if (type === rowName) {
            expectedCount = board.width / 2;
        }
        else {
            expectedCount = board.height / 2;
        }
        // tslint:disable-next-line:forin
        for (var currentType in counts) {
            counts[currentType] = expectedCount - counts[currentType];
        }
        return counts;
    };
    IndexManager.sectionComparisonMatches = function (count) {
        var results = [];
        for (var i = 0; i < count; i++) {
            for (var j = i + 1; j < count; j++) {
                results.push([i, j]);
            }
        }
        return results;
    };
    IndexManager.getSectionIndexes = function (type, index, width, height) {
        if (type === rowName) {
            return this.getRowIndexes(index, width);
        }
        else if (type === columnName) {
            return this.getColumnIndexes(index, width, height);
        }
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(8);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = __webpack_require__(3);
var puzzles = __webpack_require__(5);
var stepManager_1 = __webpack_require__(6);
var windowSearch = window.location.search;
var boardElement = document.getElementById("tic-tac-puzzle");
var stepElement = document.getElementById("step-text");
var start = document.getElementById("start");
var title = document.getElementById("title");
var links = document.getElementById("links");
function createBoard(board) {
    boardElement.className = "width-" + board.width;
    var rowCounts = document.createElement("div");
    rowCounts.className = "row-counts";
    for (var i = 0; i < board.height; i++) {
        var rowCount = document.createElement("div");
        rowCount.className = "row-count";
        rowCounts.appendChild(rowCount);
    }
    var columnCounts = document.createElement("div");
    columnCounts.className = "column-counts";
    for (var i = 0; i < board.width; i++) {
        var columnCount = document.createElement("div");
        columnCount.className = "column-count";
        columnCounts.appendChild(columnCount);
    }
    boardElement.appendChild(rowCounts);
    boardElement.appendChild(columnCounts);
    var boardWrapper = document.createElement("div");
    boardWrapper.className = "board-wrapper";
    boardElement.appendChild(boardWrapper);
    for (var i = 0; i < board.width * board.height; i++) {
        var subElement = document.createElement("div");
        subElement.className = "spot";
        boardWrapper.appendChild(subElement);
    }
}
function updateSpot(board, index, manager) {
    var spots = boardElement.getElementsByClassName("spot");
    if (spots && spots[index]) {
        var spot = spots[index];
        var value = board.value(index);
        spot.innerText = value;
        var flag = manager.flag(index);
        spot.className = "spot " + value + " " + (flag ? flag : "");
    }
}
function updateStep(manager) {
    if (manager.stepText()) {
        stepElement.innerText = manager.stepText();
    }
}
function updateRowCounts(board) {
    var counts = board.getRowCounts();
    var locations = boardElement.getElementsByClassName("row-count");
    counts.forEach(function (count, index) {
        locations[index].innerHTML = "<div class=\"x\">" + count.x + "</div><div class=\"o\">" + count.o + "</div>";
    });
}
function updateColumnCounts(board) {
    var counts = board.getColumnCounts();
    var locations = boardElement.getElementsByClassName("column-count");
    counts.forEach(function (count, index) {
        locations[index].innerHTML = "<div class=\"x\">" + count.x + "</div><div class=\"o\">" + count.o + "</div>";
    });
}
function updateAllSpots(board, manager) {
    for (var i = 0; i < board.width * board.height; i++) {
        updateSpot(board, i, manager);
    }
    updateRowCounts(board);
    updateColumnCounts(board);
}
var puzzleName;
puzzleName = windowSearch && windowSearch.split("p=").length > 1
    ? windowSearch.split("p=")[1].split("&")[0]
    : Object.keys(puzzles)[0];
title.innerText = puzzleName;
Object.keys(puzzles).forEach(function (name) {
    if (name !== puzzleName) {
        var linkWrapper = document.createElement("div");
        var link = document.createElement("a");
        linkWrapper.appendChild(link);
        link.innerText = name;
        link.href = "?p=" + name;
        links.appendChild(linkWrapper);
    }
});
if (puzzleName) {
    var puzzleData = puzzles[puzzleName];
    var board_2 = new board_1.Board(puzzleData.width, puzzleData.height, puzzleData.xs, puzzleData.os);
    var manager_1 = new stepManager_1.StepManager(board_2);
    createBoard(board_2);
    updateAllSpots(board_2, manager_1);
    updateStep(manager_1);
    var interval_1;
    start.addEventListener("click", function () {
        if (!interval_1) {
            interval_1 = setInterval(function () {
                manager_1.takeStep();
                updateAllSpots(board_2, manager_1);
                updateStep(manager_1);
                if (manager_1.done()) {
                    clearInterval(interval_1);
                }
            }, 100);
        }
        else {
            clearInterval(interval_1);
            interval_1 = null;
        }
    });
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var indexManager_1 = __webpack_require__(0);
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
    Board.prototype.getRowCounts = function () {
        var result = [];
        for (var i = 0; i < this.height; i++) {
            result.push(indexManager_1.IndexManager.countValues(this, "row", i));
        }
        return result;
    };
    Board.prototype.getColumnCounts = function () {
        var result = [];
        for (var i = 0; i < this.width; i++) {
            result.push(indexManager_1.IndexManager.countValues(this, "column", i));
        }
        return result;
    };
    return Board;
}());
exports.Board = Board;


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
exports.easy1 = {
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
        [4, 2],
    ],
};
exports.easy2 = {
    height: 6,
    os: [
        [1, 1],
        [1, 2],
        [2, 0],
    ],
    width: 6,
    xs: [
        [0, 3],
        [2, 5],
        [4, 1],
        [4, 3],
        [4, 5],
        [5, 0],
        [5, 5],
    ],
};
exports.easy3 = {
    height: 6,
    os: [
        [3, 0],
        [4, 0],
        [4, 2],
        [4, 4],
        [5, 2],
    ],
    width: 6,
    xs: [
        [0, 1],
        [0, 5],
        [1, 5],
        [2, 2],
    ],
};
exports.easy4 = {
    height: 6,
    os: [
        [0, 3],
        [2, 1],
        [3, 5],
        [5, 0],
    ],
    width: 6,
    xs: [
        [0, 5],
        [1, 2],
        [1, 5],
        [4, 1],
        [4, 3],
    ],
};
exports.easy5 = {
    height: 8,
    os: [
        [0, 5],
        [1, 1],
        [6, 2],
        [6, 4],
    ],
    width: 6,
    xs: [
        [1, 4],
        [2, 2],
        [2, 3],
        [3, 2],
        [3, 4],
        [5, 5],
    ],
};
exports.easy6 = {
    height: 8,
    os: [
        [0, 0],
        [2, 3],
        [5, 0],
        [6, 3],
    ],
    width: 6,
    xs: [
        [1, 1],
        [1, 2],
        [1, 4],
        [3, 1],
        [7, 2],
    ],
};
exports.easy7 = {
    height: 8,
    os: [
        [1, 3],
        [3, 3],
        [5, 1],
    ],
    width: 6,
    xs: [
        [0, 0],
        [0, 2],
        [2, 1],
        [2, 5],
        [4, 2],
        [4, 4],
        [7, 2],
        [7, 3],
        [7, 5],
    ],
};
exports.easy8 = {
    height: 8,
    os: [
        [0, 2],
        [1, 3],
        [4, 1],
        [6, 0],
        [6, 5],
    ],
    width: 6,
    xs: [
        [1, 0],
        [1, 1],
        [3, 3],
        [3, 5],
        [6, 2],
        [7, 1],
        [7, 5],
    ],
};
exports.easy9 = {
    height: 8,
    os: [
        [0, 0],
        [0, 1],
        [2, 3],
        [5, 4],
    ],
    width: 6,
    xs: [
        [0, 4],
        [3, 1],
        [3, 2],
        [5, 1],
        [6, 5],
        [7, 2],
    ],
};
exports.easy10 = {
    height: 8,
    os: [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 3],
        [3, 4],
        [6, 3],
    ],
    width: 6,
    xs: [
        [2, 5],
        [4, 0],
        [4, 2],
        [5, 4],
        [6, 1],
        [7, 3],
    ],
};
exports.easy11 = {
    height: 10,
    os: [
        [0, 4],
        [1, 4],
        [4, 7],
        [5, 4],
        [5, 7],
        [8, 4],
        [9, 0],
    ],
    width: 8,
    xs: [
        [1, 1],
        [2, 3],
        [3, 0],
        [4, 0],
        [6, 6],
        [8, 1],
        [8, 7],
        [9, 1],
    ],
};
exports.easy12 = {
    height: 10,
    os: [
        [1, 3],
        [1, 5],
        [1, 7],
        [3, 0],
        [3, 2],
        [5, 6],
        [6, 2],
        [6, 7],
        [7, 1],
        [8, 3],
        [8, 4],
        [8, 6],
        [9, 3],
        [9, 6],
    ],
    width: 8,
    xs: [
        [0, 0],
        [0, 2],
        [2, 1],
        [3, 5],
        [4, 7],
        [5, 3],
    ],
};
exports.easy13 = {
    height: 10,
    os: [
        [2, 6],
        [5, 1],
        [6, 1],
        [9, 0],
    ],
    width: 8,
    xs: [
        [0, 7],
        [1, 4],
        [1, 5],
        [1, 7],
        [2, 2],
        [3, 3],
        [3, 4],
        [6, 5],
        [7, 3],
        [7, 5],
        [8, 3],
    ],
};
exports.easy14 = {
    height: 10,
    os: [
        [2, 1],
        [3, 6],
        [6, 0],
        [6, 7],
        [8, 0],
        [9, 0],
    ],
    width: 8,
    xs: [
        [0, 2],
        [0, 4],
        [0, 5],
        [3, 2],
        [4, 4],
        [4, 5],
        [5, 5],
        [7, 1],
    ],
};
exports.easy15 = {
    height: 10,
    os: [
        [0, 0],
        [0, 7],
        [1, 2],
        [2, 0],
        [2, 6],
        [5, 0],
        [5, 7],
        [6, 5],
    ],
    width: 8,
    xs: [
        [0, 5],
        [1, 5],
        [2, 3],
        [3, 1],
        [5, 3],
        [6, 3],
        [7, 0],
        [7, 6],
        [9, 4],
        [9, 5],
    ],
};
exports.easy16 = {
    height: 10,
    os: [
        [0, 6],
        [1, 4],
        [2, 1],
        [2, 4],
        [2, 7],
        [4, 6],
        [5, 0],
        [5, 3],
        [6, 2],
        [8, 2],
        [9, 4],
        [9, 6],
    ],
    width: 8,
    xs: [
        [0, 7],
        [1, 2],
        [3, 5],
        [4, 1],
        [4, 7],
        [6, 3],
        [7, 5],
        [8, 7],
    ],
};
exports.easy17 = {
    height: 10,
    os: [
        [0, 2],
        [0, 4],
        [2, 5],
        [3, 3],
        [5, 3],
        [5, 4],
        [7, 5],
        [8, 2],
        [9, 2],
    ],
    width: 8,
    xs: [
        [0, 6],
        [1, 7],
        [6, 6],
        [6, 7],
        [9, 0],
    ],
};
exports.easy18 = {
    height: 10,
    os: [
        [0, 0],
        [1, 3],
        [2, 1],
        [3, 3],
        [3, 5],
        [6, 1],
        [6, 5],
        [9, 5],
    ],
    width: 8,
    xs: [
        [0, 4],
        [4, 1],
        [4, 4],
        [5, 6],
        [6, 2],
        [8, 1],
        [8, 2],
        [9, 1],
    ],
};
exports.easy19 = {
    height: 10,
    os: [
        [0, 1],
        [0, 2],
        [1, 1],
        [2, 6],
        [6, 0],
        [6, 4],
        [7, 1],
        [7, 4],
        [8, 1],
    ],
    width: 8,
    xs: [
        [0, 7],
        [1, 7],
        [4, 6],
        [5, 5],
        [5, 7],
        [9, 0],
        [9, 3],
    ],
};
exports.easy20 = {
    height: 10,
    os: [
        [0, 6],
        [2, 0],
        [2, 1],
        [3, 3],
        [5, 1],
        [6, 7],
        [7, 6],
        [8, 3],
        [9, 2],
        [9, 5],
    ],
    width: 8,
    xs: [
        [0, 2],
        [1, 4],
        [4, 0],
        [4, 7],
        [6, 0],
        [6, 2],
        [7, 0],
        [7, 3],
    ],
};
exports.easy21 = {
    height: 14,
    os: [
        [0, 3],
        [2, 4],
        [4, 1],
        [4, 3],
        [4, 9],
        [6, 3],
        [6, 5],
        [7, 3],
        [8, 9],
        [9, 2],
        [11, 7],
        [11, 8],
        [12, 4],
        [13, 2],
    ],
    width: 10,
    xs: [
        [1, 1],
        [1, 2],
        [1, 6],
        [1, 8],
        [3, 5],
        [5, 0],
        [5, 8],
        [7, 6],
        [8, 6],
        [9, 0],
        [9, 5],
        [10, 1],
        [10, 3],
        [13, 5],
        [13, 6],
        [13, 8],
    ],
};
exports.easy22 = {
    height: 14,
    os: [
        [0, 0],
        [0, 3],
        [0, 4],
        [0, 6],
        [1, 3],
        [3, 0],
        [3, 6],
        [3, 9],
        [5, 2],
        [5, 6],
        [5, 9],
        [7, 0],
        [8, 3],
        [8, 6],
        [11, 9],
        [12, 4],
        [12, 5],
    ],
    width: 10,
    xs: [
        [1, 5],
        [2, 1],
        [2, 7],
        [2, 8],
        [3, 2],
        [4, 4],
        [5, 0],
        [6, 7],
        [6, 8],
        [7, 2],
        [9, 1],
        [9, 5],
        [9, 9],
        [13, 5],
        [13, 8],
    ],
};
exports.easy23 = {
    height: 14,
    os: [
        [1, 1],
        [1, 2],
        [2, 2],
        [3, 6],
        [4, 4],
        [5, 9],
        [6, 6],
        [7, 1],
        [7, 5],
        [7, 7],
        [8, 2],
        [9, 2],
        [11, 9],
        [13, 0],
        [13, 9],
    ],
    width: 10,
    xs: [
        [1, 8],
        [4, 7],
        [4, 8],
        [5, 2],
        [5, 3],
        [6, 0],
        [10, 0],
        [10, 9],
        [11, 6],
        [12, 6],
        [12, 7],
        [12, 0],
        [13, 3],
    ],
};
exports.easy24 = {
    height: 14,
    os: [
        [0, 1],
        [0, 2],
        [0, 4],
        [1, 6],
        [3, 1],
        [4, 6],
        [4, 8],
        [5, 1],
        [5, 2],
        [5, 5],
        [6, 7],
        [6, 9],
        [8, 8],
        [9, 6],
        [10, 2],
        [12, 2],
    ],
    width: 10,
    xs: [
        [2, 3],
        [2, 7],
        [2, 8],
        [4, 3],
        [6, 0],
        [6, 4],
        [8, 0],
        [8, 1],
        [8, 5],
        [11, 1],
        [11, 4],
        [12, 7],
        [13, 7],
    ],
};
exports.easy25 = {
    height: 14,
    os: [
        [0, 5],
        [2, 1],
        [2, 2],
        [2, 8],
        [3, 2],
        [3, 4],
        [5, 2],
        [5, 3],
        [6, 2],
        [6, 7],
        [8, 2],
        [9, 2],
        [10, 8],
        [11, 1],
        [11, 5],
    ],
    width: 10,
    xs: [
        [3, 7],
        [4, 6],
        [5, 6],
        [5, 9],
        [7, 1],
        [8, 6],
        [9, 4],
        [9, 7],
        [9, 9],
        [10, 6],
        [11, 9],
        [12, 3],
        [13, 6],
    ],
};
exports.easy26 = {
    height: 14,
    os: [
        [0, 0],
        [0, 8],
        [1, 0],
        [1, 4],
        [2, 8],
        [3, 5],
        [3, 8],
        [5, 4],
        [7, 3],
        [8, 3],
        [9, 1],
        [9, 2],
        [9, 9],
        [11, 2],
        [11, 6],
        [12, 8],
        [13, 8],
    ],
    width: 10,
    xs: [
        [1, 6],
        [2, 3],
        [2, 6],
        [3, 3],
        [5, 7],
        [6, 2],
        [6, 7],
        [6, 9],
        [8, 0],
        [12, 0],
        [12, 5],
    ],
};
exports.easy27 = {
    height: 14,
    os: [
        [1, 1],
        [1, 5],
        [1, 8],
        [3, 8],
        [4, 2],
        [4, 3],
        [7, 2],
        [7, 9],
        [9, 0],
        [9, 1],
        [9, 9],
        [12, 2],
        [12, 5],
        [12, 8],
        [13, 0],
    ],
    width: 10,
    xs: [
        [0, 7],
        [2, 3],
        [2, 6],
        [2, 9],
        [3, 9],
        [5, 8],
        [6, 0],
        [6, 3],
        [6, 4],
        [6, 8],
        [8, 0],
        [10, 7],
        [11, 0],
        [11, 4],
        [13, 1],
        [13, 3],
    ],
};
exports.easy28 = {
    height: 14,
    os: [
        [0, 5],
        [1, 3],
        [3, 1],
        [4, 1],
        [4, 3],
        [5, 7],
        [6, 0],
        [6, 5],
        [7, 5],
        [7, 6],
        [9, 2],
        [9, 7],
        [10, 4],
        [11, 8],
        [12, 2],
        [13, 0],
        [13, 3],
    ],
    width: 10,
    xs: [
        [0, 2],
        [0, 7],
        [0, 9],
        [2, 2],
        [2, 4],
        [5, 9],
        [9, 5],
        [11, 4],
        [12, 1],
        [12, 7],
        [13, 6],
        [13, 7],
    ],
};
exports.easy29 = {
    height: 14,
    os: [
        [0, 2],
        [0, 3],
        [2, 0],
        [2, 7],
        [4, 1],
        [4, 6],
        [4, 7],
        [4, 9],
        [7, 3],
        [7, 7],
        [8, 7],
        [8, 8],
        [9, 4],
        [10, 9],
        [12, 3],
        [13, 3],
        [13, 7],
        [13, 8],
    ],
    width: 10,
    xs: [
        [0, 0],
        [0, 5],
        [1, 5],
        [1, 6],
        [2, 1],
        [5, 0],
        [10, 1],
        [11, 0],
        [11, 1],
        [12, 9],
        [13, 4],
    ],
};
exports.easy30 = {
    height: 14,
    os: [
        [0, 1],
        [0, 6],
        [2, 4],
        [2, 9],
        [4, 6],
        [8, 1],
        [8, 2],
        [9, 1],
        [11, 3],
        [13, 6],
    ],
    width: 10,
    xs: [
        [1, 8],
        [2, 8],
        [3, 5],
        [4, 0],
        [4, 4],
        [5, 4],
        [6, 7],
        [7, 5],
        [7, 9],
        [8, 5],
        [10, 2],
        [10, 6],
        [12, 5],
        [13, 0],
        [13, 3],
    ],
};
exports.easy31 = {
    height: 16,
    os: [
        [1, 3],
        [1, 4],
        [1, 9],
        [2, 8],
        [2, 9],
        [5, 4],
        [6, 2],
        [8, 7],
        [8, 9],
        [9, 4],
        [10, 4],
        [10, 11],
        [13, 6],
        [13, 10],
        [14, 8],
    ],
    width: 12,
    xs: [
        [0, 2],
        [0, 5],
        [0, 10],
        [2, 1],
        [3, 2],
        [3, 6],
        [3, 7],
        [4, 3],
        [5, 10],
        [6, 6],
        [6, 10],
        [7, 3],
        [7, 5],
        [7, 6],
        [9, 0],
        [9, 2],
        [10, 6],
        [11, 9],
        [12, 0],
        [12, 9],
        [14, 1],
        [15, 1],
        [15, 6],
        [15, 7],
        [15, 10],
    ],
};
exports.easy32 = {
    height: 16,
    os: [
        [2, 5],
        [2, 9],
        [3, 11],
        [4, 7],
        [4, 8],
        [5, 1],
        [7, 9],
        [8, 11],
        [9, 2],
        [10, 9],
        [11, 1],
        [13, 6],
        [13, 8],
        [14, 3],
    ],
    width: 12,
    xs: [
        [0, 4],
        [0, 8],
        [1, 3],
        [1, 4],
        [1, 6],
        [4, 0],
        [4, 2],
        [4, 4],
        [4, 10],
        [7, 7],
        [8, 1],
        [9, 4],
        [10, 4],
        [10, 6],
        [10, 8],
        [11, 11],
        [12, 4],
        [12, 5],
        [13, 4],
        [15, 5],
        [15, 6],
        [15, 8],
    ],
};
exports.easy33 = {
    height: 16,
    os: [
        [0, 0],
        [2, 2],
        [2, 8],
        [2, 11],
        [3, 11],
        [5, 5],
        [7, 7],
        [8, 5],
        [9, 7],
        [9, 8],
        [10, 8],
        [10, 11],
        [12, 7],
        [12, 8],
        [12, 10],
        [12, 11],
        [13, 6],
        [14, 10],
        [15, 4],
        [15, 8],
    ],
    width: 12,
    xs: [
        [1, 1],
        [1, 5],
        [1, 10],
        [2, 3],
        [2, 5],
        [2, 9],
        [4, 4],
        [5, 8],
        [5, 10],
        [6, 3],
        [6, 6],
        [7, 1],
        [7, 9],
        [7, 10],
        [9, 2],
        [9, 4],
        [10, 2],
        [12, 2],
        [13, 0],
        [13, 9],
        [14, 3],
        [14, 4],
        [15, 2],
        [15, 10],
    ],
};
exports.easy34 = {
    height: 16,
    os: [
        [0, 4],
        [0, 8],
        [0, 11],
        [2, 9],
        [3, 7],
        [5, 6],
        [5, 10],
        [5, 11],
        [7, 6],
        [9, 1],
        [9, 5],
        [10, 7],
        [11, 1],
        [12, 3],
        [13, 8],
        [14, 1],
        [14, 7],
        [14, 8],
        [15, 10],
    ],
    width: 12,
    xs: [
        [0, 7],
        [1, 0],
        [1, 3],
        [2, 3],
        [2, 4],
        [2, 6],
        [2, 11],
        [4, 1],
        [4, 3],
        [4, 4],
        [4, 9],
        [4, 11],
        [6, 5],
        [7, 1],
        [7, 5],
        [8, 11],
        [9, 9],
        [11, 5],
        [11, 9],
        [12, 10],
        [12, 11],
        [13, 2],
        [15, 0],
        [15, 3],
        [15, 4],
    ],
};
exports.easy35 = {
    height: 16,
    os: [
        [0, 0],
        [0, 2],
        [0, 4],
        [0, 8],
        [0, 11],
        [3, 0],
        [3, 2],
        [3, 5],
        [4, 0],
        [4, 11],
        [5, 6],
        [6, 11],
        [7, 4],
        [7, 8],
        [8, 10],
        [9, 7],
        [10, 0],
        [10, 11],
        [11, 4],
        [12, 3],
        [12, 9],
        [13, 4],
        [13, 9],
        [15, 3],
    ],
    width: 12,
    xs: [
        [0, 6],
        [1, 9],
        [2, 1],
        [2, 6],
        [2, 8],
        [2, 10],
        [4, 7],
        [6, 2],
        [6, 5],
        [7, 0],
        [7, 6],
        [9, 1],
        [9, 2],
        [10, 5],
        [10, 8],
        [10, 9],
        [11, 2],
        [14, 2],
        [14, 10],
    ],
};
exports.easy36 = {
    height: 16,
    os: [
        [0, 6],
        [0, 10],
        [0, 11],
        [1, 10],
        [2, 4],
        [3, 2],
        [3, 7],
        [3, 10],
        [4, 10],
        [7, 0],
        [7, 9],
        [9, 7],
        [9, 8],
        [11, 0],
        [12, 0],
        [12, 11],
        [14, 1],
        [14, 8],
        [15, 0],
        [15, 1],
        [15, 3],
        [15, 6],
    ],
    width: 12,
    xs: [
        [0, 8],
        [1, 5],
        [2, 8],
        [4, 0],
        [4, 1],
        [6, 2],
        [6, 10],
        [8, 0],
        [8, 3],
        [8, 4],
        [8, 11],
        [11, 8],
        [13, 7],
        [14, 4],
        [14, 5],
        [14, 9],
    ],
};
exports.easy37 = {
    height: 16,
    os: [
        [0, 1],
        [0, 2],
        [0, 8],
        [0, 9],
        [1, 8],
        [3, 11],
        [5, 9],
        [6, 4],
        [7, 7],
        [7, 8],
        [8, 2],
        [8, 7],
        [11, 4],
        [11, 6],
        [13, 0],
        [15, 6],
    ],
    width: 12,
    xs: [
        [1, 6],
        [1, 10],
        [1, 11],
        [3, 8],
        [3, 9],
        [4, 3],
        [5, 1],
        [5, 3],
        [7, 0],
        [7, 1],
        [7, 10],
        [9, 4],
        [9, 6],
        [10, 0],
        [10, 9],
        [10, 10],
        [12, 2],
        [12, 10],
        [12, 11],
        [13, 2],
        [14, 4],
        [14, 10],
    ],
};
exports.easy38 = {
    height: 16,
    os: [
        [0, 8],
        [0, 10],
        [1, 3],
        [1, 10],
        [4, 1],
        [4, 3],
        [4, 5],
        [4, 9],
        [4, 10],
        [5, 1],
        [5, 9],
        [6, 0],
        [7, 1],
        [7, 11],
        [9, 3],
        [9, 8],
        [10, 6],
        [11, 1],
        [12, 4],
        [12, 8],
        [12, 10],
        [13, 10],
        [15, 2],
        [15, 3],
        [15, 6],
    ],
    width: 12,
    xs: [
        [0, 0],
        [1, 7],
        [3, 0],
        [3, 8],
        [5, 4],
        [7, 5],
        [7, 8],
        [7, 10],
        [8, 0],
        [8, 2],
        [11, 0],
        [12, 6],
        [13, 3],
        [14, 0],
        [14, 1],
        [14, 7],
    ],
};
exports.easy39 = {
    height: 16,
    os: [
        [3, 7],
        [4, 1],
        [5, 1],
        [5, 5],
        [5, 6],
        [5, 8],
        [9, 4],
        [9, 6],
        [10, 11],
        [11, 0],
        [11, 1],
        [11, 6],
        [12, 1],
        [13, 2],
        [13, 8],
        [14, 4],
        [14, 5],
        [15, 0],
        [15, 2],
        [15, 6],
    ],
    width: 12,
    xs: [
        [0, 0],
        [0, 4],
        [0, 11],
        [1, 4],
        [1, 5],
        [1, 8],
        [1, 11],
        [2, 1],
        [4, 6],
        [5, 3],
        [6, 0],
        [7, 4],
        [8, 3],
        [8, 10],
        [9, 3],
        [10, 5],
        [12, 10],
        [14, 0],
    ],
};
exports.easy40 = {
    height: 16,
    os: [
        [1, 1],
        [1, 2],
        [1, 7],
        [1, 8],
        [1, 10],
        [2, 1],
        [2, 7],
        [3, 10],
        [4, 1],
        [4, 8],
        [5, 9],
        [6, 3],
        [7, 1],
        [7, 9],
        [7, 10],
        [8, 4],
        [8, 6],
        [8, 7],
        [8, 10],
        [10, 6],
        [11, 3],
        [11, 9],
        [12, 9],
        [12, 11],
        [13, 0],
        [13, 5],
        [13, 11],
        [15, 9],
    ],
    width: 12,
    xs: [
        [0, 0],
        [0, 4],
        [2, 11],
        [4, 4],
        [8, 2],
        [9, 3],
        [9, 9],
        [10, 1],
        [12, 2],
        [12, 6],
        [14, 0],
        [14, 6],
        [15, 6],
    ],
};
exports.medium1 = {
    height: 10,
    os: [
        [0, 1],
        [0, 5],
        [3, 4],
        [3, 6],
        [4, 0],
        [7, 2],
    ],
    width: 8,
    xs: [
        [0, 0],
        [1, 3],
        [1, 4],
        [1, 6],
        [5, 0],
        [5, 4],
        [5, 7],
        [7, 1],
        [8, 3],
        [8, 4],
        [8, 7],
        [9, 4],
    ],
};
exports.medium2 = {
    height: 10,
    os: [
        [2, 0],
        [4, 5],
        [5, 2],
        [6, 2],
        [7, 5],
        [7, 7],
    ],
    width: 8,
    xs: [
        [0, 1],
        [0, 7],
        [2, 3],
        [2, 5],
        [3, 0],
        [5, 4],
        [6, 6],
        [8, 1],
        [8, 3],
        [9, 0],
        [9, 1],
        [9, 4],
    ],
};
exports.medium3 = {
    height: 10,
    os: [
        [0, 7],
        [1, 5],
        [2, 2],
        [3, 4],
        [6, 6],
        [8, 1],
        [9, 3],
    ],
    width: 8,
    xs: [
        [0, 1],
        [4, 5],
        [5, 0],
        [5, 1],
        [5, 5],
        [7, 5],
        [9, 6],
    ],
};
exports.hard1 = {
    height: 14,
    os: [
        [0, 5],
        [0, 8],
        [1, 2],
        [1, 5],
        [1, 9],
        [2, 2],
        [3, 0],
        [3, 5],
        [6, 4],
        [6, 9],
        [8, 2],
        [9, 9],
        [10, 6],
        [12, 4],
    ],
    width: 10,
    xs: [
        [1, 4],
        [3, 3],
        [3, 7],
        [4, 3],
        [5, 0],
        [5, 5],
        [5, 7],
        [5, 8],
        [7, 1],
        [7, 7],
        [10, 2],
        [11, 2],
        [11, 7],
        [12, 0],
        [12, 6],
        [12, 9],
        [13, 4],
    ],
};
exports.hard40 = {
    height: 24,
    os: [
        [1, 2],
        [1, 4],
        [1, 6],
        [1, 11],
        [1, 13],
        [2, 6],
        [2, 11],
        [2, 17],
        [3, 10],
        [3, 15],
        [3, 17],
        [4, 4],
        [4, 6],
        [4, 8],
        [4, 10],
        [4, 15],
        [5, 6],
        [6, 13],
        [7, 15],
        [7, 17],
        [8, 2],
        [8, 8],
        [8, 10],
        [10, 2],
        [10, 8],
        [10, 16],
        [10, 17],
        [11, 0],
        [11, 2],
        [12, 4],
        [12, 12],
        [12, 16],
        [13, 8],
        [13, 12],
        [14, 3],
        [14, 10],
        [14, 11],
        [15, 4],
        [15, 9],
        [15, 10],
        [15, 16],
        [15, 17],
        [16, 6],
        [18, 4],
        [18, 8],
        [19, 6],
        [19, 14],
        [19, 16],
        [21, 4],
        [21, 8],
        [22, 5],
        [22, 12],
        [23, 8],
        [23, 10],
        [23, 12],
        [23, 16],
    ],
    width: 18,
    xs: [
        [0, 1],
        [1, 1],
        [1, 7],
        [1, 10],
        [1, 16],
        [3, 0],
        [3, 2],
        [3, 14],
        [6, 1],
        [6, 2],
        [6, 11],
        [6, 16],
        [8, 13],
        [8, 14],
        [9, 1],
        [9, 6],
        [9, 13],
        [11, 3],
        [12, 1],
        [12, 10],
        [12, 13],
        [13, 2],
        [13, 13],
        [15, 1],
        [17, 3],
        [19, 0],
        [19, 1],
        [19, 3],
        [19, 8],
        [19, 13],
        [19, 17],
        [20, 0],
        [20, 2],
        [20, 9],
        [20, 13],
        [20, 15],
        [20, 17],
        [21, 7],
        [22, 0],
        [22, 2],
        [22, 14],
        [22, 15],
        [23, 0],
        [23, 3],
        [23, 5],
    ],
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comparisonManager_1 = __webpack_require__(7);
var indexManager_1 = __webpack_require__(0);
var consecutivePairs = "consecutivePairs";
var oneSep = "oneSep";
var oneGroup = "oneGroup";
var multiGroup = "multiGroup";
var compareSections = "compareSections";
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
            compareSections: {
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: null,
                firstCount: {},
                insertPatterns: [],
                rows: [],
                second: null,
                secondCount: {},
                type: "",
            },
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: true,
            multiGroup: {
                columns: [],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            },
            oneGroup: {
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertInto: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            },
            oneSep: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
        };
    };
    StepManager.prototype.setUp = function () {
        this.resetState();
        this.state.consecutivePairs.rows = indexManager_1.IndexManager.getConsecutiveRowPairs(this.board.width, this.board.height);
        this.state.consecutivePairs.columns = indexManager_1.IndexManager.getConsecutiveColumnPairs(this.board.width, this.board.height);
        this.state.oneSep.rows = indexManager_1.IndexManager.getOneSepRowPairs(this.board.width, this.board.height);
        this.state.oneSep.columns = indexManager_1.IndexManager.getOneSepColumnPairs(this.board.width, this.board.height);
        var rows = [];
        var columns = [];
        for (var i = 0; i < this.board.height; i++) {
            rows.push(i);
        }
        for (var i = 0; i < this.board.width; i++) {
            columns.push(i);
        }
        this.state.oneGroup.rows = rows.slice();
        this.state.oneGroup.columns = columns.slice();
        this.state.multiGroup.rows = rows.slice();
        this.state.multiGroup.columns = columns.slice();
        this.state.madeAChange = false;
        this.state.compareSections.rows = indexManager_1.IndexManager.sectionComparisonMatches(this.board.height);
        this.state.compareSections.columns = indexManager_1.IndexManager.sectionComparisonMatches(this.board.width);
    };
    StepManager.prototype.flag = function (index) {
        switch (this.currentStep()) {
            case consecutivePairs:
                return this.getFlagFromCompareData(this.state.consecutivePairs, index);
            case oneSep:
                return this.getFlagFromCompareData(this.state.oneSep, index);
            case oneGroup:
                return this.getFlagFromGroupData(this.state.oneGroup, index);
            case multiGroup:
                return this.getFlagFromGroupData(this.state.multiGroup, index);
            case compareSections:
                return this.getFlagFromCompareSection(this.state.compareSections, index);
        }
    };
    StepManager.prototype.currentStep = function () {
        if (this.checkCompareStep(this.state.consecutivePairs)) {
            return consecutivePairs;
        }
        else if (this.checkCompareStep(this.state.oneSep)) {
            return oneSep;
        }
        else if (this.checkGroupStep(this.state.oneGroup)) {
            return oneGroup;
        }
        else if (this.checkGroupStep(this.state.multiGroup)) {
            return multiGroup;
        }
        else if (this.checkCompareSectionStep(this.state.compareSections)) {
            return compareSections;
        }
    };
    StepManager.prototype.checkCompareSectionStep = function (data) {
        return data.columns.length || data.rows.length || data.first !== null;
    };
    StepManager.prototype.checkGroupStep = function (data) {
        return data.rows.length ||
            data.columns.length ||
            data.currentIndex !== null;
    };
    StepManager.prototype.checkCompareStep = function (data) {
        return data.rows.length ||
            data.columns.length ||
            data.currentType ||
            data.currentPair.length;
    };
    StepManager.prototype.done = function () {
        var filled = true;
        this.board.spots.forEach(function (spot) {
            if (!spot.get()) {
                filled = false;
            }
        });
        return filled || !(this.currentStep() || this.state.madeAChange);
    };
    StepManager.prototype.stepText = function () {
        switch (this.currentStep()) {
            case consecutivePairs:
                // tslint:disable-next-line:max-line-length
                return "If squares next to each other both have the same value the squares on either side should be the opposite value.";
            case oneSep:
                // tslint:disable-next-line:max-line-length
                return "If two squares with one square between them have the same value the square between them should be the opposite value";
            case oneGroup:
                // tslint:disable-next-line:max-line-length
                return "If there is only one value left in a row, it should be filled in. If there is a group of blanks where 3 of the same value and one of the other value need to be placed. The value there is 3 of goes on the outsides.";
            case multiGroup:
                // tslint:disable-next-line:max-line-length
                return "If in a series of groups some require a value. If the number of times the value is required is equal to the number to place any other groups are the other value.";
            case compareSections:
                // tslint:disable-next-line:max-line-length
                return "Two rows or columns can't be the same. So if we have 2 columns one with all of a value one missing one and they match. Then we know that last spot must be the opposite value";
        }
    };
    StepManager.prototype.takeStep = function () {
        switch (this.currentStep()) {
            case consecutivePairs:
                this.takeConsecutivePairsStep();
                break;
            case oneSep:
                this.takeOneSepStep();
                break;
            case oneGroup:
                this.takeOneGroupStep();
                break;
            case multiGroup:
                this.takeMultiGroupStep();
                break;
            case compareSections:
                this.takeCompareSectionStep();
                break;
            default:
                if (this.state.madeAChange) {
                    this.setUp();
                }
        }
    };
    StepManager.prototype.takeCompareSectionStep = function () {
        var data = this.state.compareSections;
        if (data.first !== null) {
            this.processCompareSectionStep(data);
        }
        else {
            this.nextCompareStep(data);
        }
    };
    StepManager.prototype.checkIfValidCompareSections = function (data, value) {
        // check that there is a 1 -- 0 relationship
        if (value === "X" &&
            !((data.firstCount.x === 0 && data.secondCount.x === 1)
                || (data.firstCount.x === 1 && data.secondCount.x === 0))) {
            return false;
        }
        if (value === "O" &&
            !((data.firstCount.o === 0 && data.secondCount.o === 1)
                || (data.firstCount.o === 1 && data.secondCount.o === 0))) {
            return false;
        }
        // check if the sections already conflict
        var firstIndexes = indexManager_1.IndexManager.getSectionIndexes(data.type, data.first, this.board.width, this.board.height);
        var secondIndexes = indexManager_1.IndexManager.getSectionIndexes(data.type, data.second, this.board.width, this.board.height);
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < firstIndexes.length; i++) {
            var firstValue = this.board.value(firstIndexes[i]);
            var secondValue = this.board.value(secondIndexes[i]);
            if (firstValue && secondValue && firstValue !== secondValue) {
                return false;
            }
        }
        return true;
    };
    StepManager.prototype.findLocationToInsertFromComparison = function (value, data) {
        var firstIndexIndexes = indexManager_1.IndexManager.indexIndexesForValue(this.board, data.type, data.first, value);
        var secondIndexIndexes = indexManager_1.IndexManager.indexIndexesForValue(this.board, data.type, data.second, value);
        var union = [];
        var difference = [];
        while (firstIndexIndexes.length && secondIndexIndexes.length) {
            var firstIndex = firstIndexIndexes[0];
            var secondIndex = secondIndexIndexes[0];
            if (firstIndex === secondIndex) {
                union.push(firstIndexIndexes.shift());
                secondIndexIndexes.shift();
            }
            else if (firstIndex < secondIndex) {
                difference.push(firstIndexIndexes.shift());
            }
            else {
                difference.push(secondIndexIndexes.shift());
            }
        }
        difference = difference.concat(firstIndexIndexes).concat(secondIndexIndexes);
        if (difference.length === 1) {
            var firstIndexes = indexManager_1.IndexManager.getSectionIndexes(data.type, data.first, this.board.width, this.board.height);
            var secondIndexes = indexManager_1.IndexManager.getSectionIndexes(data.type, data.second, this.board.width, this.board.height);
            var diffIndex = difference[0];
            if (!this.board.value(firstIndexes[diffIndex])) {
                return firstIndexes[diffIndex];
            }
            else if (!this.board.value(secondIndexes[diffIndex])) {
                return secondIndexes[diffIndex];
            }
        }
    };
    StepManager.prototype.processCompareSectionStep = function (data) {
        var _this = this;
        if (data.insertPatterns.length) {
            data.insertPatterns.forEach(function (pattern) {
                _this.insert([pattern.index], pattern.value);
            });
            this.resetCompareSectionStep(data);
        }
        else if (data.first || data.second) {
            if (this.checkIfValidCompareSections(data, "X")) {
                var insertLocation = this.findLocationToInsertFromComparison("X", data);
                if (insertLocation !== undefined) {
                    data.insertPatterns.push({ index: insertLocation, value: "O" });
                }
            }
            if (this.checkIfValidCompareSections(data, "O")) {
                var insertLocation = this.findLocationToInsertFromComparison("O", data);
                if (insertLocation !== undefined) {
                    data.insertPatterns.push({ index: insertLocation, value: "X" });
                }
            }
            if (!data.insertPatterns.length) {
                this.resetCompareSectionStep(data);
            }
        }
        else {
            this.resetCompareSectionStep(data);
        }
    };
    StepManager.prototype.nextCompareStep = function (data) {
        var first;
        var second;
        var type;
        if (data.rows.length) {
            type = "row";
            _a = data.rows.shift(), first = _a[0], second = _a[1];
        }
        else {
            type = "column";
            _b = data.columns.shift() || [0, 0], first = _b[0], second = _b[1];
        }
        var firstLeft = indexManager_1.IndexManager.leftOver(this.board, type, first);
        var secondLeft = indexManager_1.IndexManager.leftOver(this.board, type, second);
        if ((first || second) &&
            !((firstLeft.x <= 1 || firstLeft.o <= 1) && (secondLeft.x <= 1 || secondLeft.o <= 1) && (firstLeft.x + firstLeft.o + secondLeft.x + secondLeft.o !== 0))) {
            this.nextCompareStep(data);
            return;
        }
        else if (first || second) {
            data.first = first;
            data.second = second;
            data.type = type;
            data.firstCount = firstLeft;
            data.secondCount = secondLeft;
        }
        else {
            this.resetCompareSectionStep(data);
        }
        var _a, _b;
    };
    StepManager.prototype.resetCompareSectionStep = function (data) {
        data.first = null;
        data.second = null;
        data.type = "";
        data.firstCount = {};
        data.secondCount = {};
        data.insertPatterns = [];
        data.compareFirst = [];
        data.compareSecond = [];
    };
    StepManager.prototype.takeOneGroupStep = function () {
        var data = this.state.oneGroup;
        if (data.currentIndex !== null) {
            this.processCurrentOneGroup(data);
        }
        else {
            this.groupFindNext(data);
        }
    };
    StepManager.prototype.takeMultiGroupStep = function () {
        var data = this.state.multiGroup;
        if (data.currentIndex !== null) {
            this.processMultiGroup(data);
        }
        else {
            this.groupFindNext(data);
        }
    };
    StepManager.prototype.groupFindNext = function (data) {
        var currentIndex;
        var currentType;
        if (data.rows.length) {
            currentIndex = data.rows.shift();
            currentType = "row";
        }
        else if (data.columns.length) {
            currentIndex = data.columns.shift();
            currentType = "column";
        }
        if (currentIndex === undefined || !currentType) {
            return;
        }
        if (!indexManager_1.IndexManager.getBlanks(this.board, currentType, currentIndex).length) {
            this.groupFindNext(data);
        }
        else {
            data.currentIndex = currentIndex;
            data.currentType = currentType;
        }
    };
    StepManager.prototype.processCurrentOneGroup = function (data) {
        if (data.insertInto.length) {
            this.insert(data.insertInto, data.mainValue);
            this.resetOneGroup();
        }
        else if (Object.keys(data.count).length) {
            this.groupOneDetermineInsert(data);
        }
        else if (data.blanks.length) {
            this.groupProcessBlanks(data);
        }
        else {
            this.oneGroupGetBlanks(data);
        }
    };
    StepManager.prototype.insert = function (indexes, value) {
        var _this = this;
        var changed = false;
        indexes.forEach(function (index) {
            if (!_this.board.value(index)) {
                _this.board.setSpot(value, index);
                changed = true;
            }
        });
        if (changed) {
            this.state.madeAChange = true;
        }
    };
    StepManager.prototype.processMultiGroup = function (data) {
        if (data.insertInto.length) {
            this.insert(data.insertInto, data.higherValue);
            this.resetMultiGroup(data);
        }
        else if (data.groups.length) {
            this.checkForInsertsMultiGroup(data);
        }
        else {
            this.multiGroupGetBlanks(data);
        }
    };
    StepManager.prototype.checkForInsertsMultiGroup = function (data) {
        var _this = this;
        var possibleInserts = [];
        var needSmallValue = [];
        data.groups.forEach(function (group) {
            if (group.length > 2) {
                needSmallValue.push(group);
                return;
            }
            if (group.length === 2) {
                var neighbors = indexManager_1.IndexManager.getNeighbors(group, data.currentType, _this.board.width, _this.board.height);
                var surrounded_1 = false;
                neighbors.forEach(function (neighbor) {
                    if (_this.board.value(neighbor) === data.higherValue) {
                        surrounded_1 = true;
                    }
                });
                if (surrounded_1) {
                    needSmallValue.push(group);
                    return;
                }
            }
            possibleInserts.push(group);
        });
        // look at the groups for insert starting at 1 from the end.
        // If two groups are separated by 1 and the center matches
        // the value we need a lot of then we can create a group with the two
        // in need smaller values.
        for (var i = possibleInserts.length - 2; i >= 0; i--) {
            // if we've removed the next number
            if (!possibleInserts[i + 1]) {
                continue;
            }
            // if they aren't groups of 1
            if (possibleInserts[i].length > 1 || possibleInserts[i + 1].length > 1) {
                continue;
            }
            var indexes = indexManager_1.IndexManager.getSectionIndexes(data.currentType, data.currentIndex, this.board.width, this.board.height);
            // if they aren't separated by 1.
            var firstLocation = indexes.indexOf(possibleInserts[i][0]);
            if (firstLocation + 2 !== indexes.indexOf(possibleInserts[i + 1][0])) {
                continue;
            }
            // if the center isn't the high value
            if (data.higherValue !== this.board.value(indexes[firstLocation + 1])) {
                continue;
            }
            var newGroup = possibleInserts.splice(i, 2);
            needSmallValue.push(newGroup);
        }
        if (data.lowerCount
            && needSmallValue.length === data.lowerCount) {
            possibleInserts.forEach(function (group) {
                data.insertInto = data.insertInto.concat(group);
            });
            needSmallValue.forEach(function (group) {
                if (group.length > 3) {
                    data.insertInto.push(group[0]);
                    data.insertInto.push(group[group.length - 1]);
                }
                else if (group.length === 3) {
                    var neighbors = indexManager_1.IndexManager.getNeighbors(group, data.currentType, _this.board.width, _this.board.height);
                    neighbors.forEach(function (neighbor) {
                        if (_this.board.value(neighbor) === data.higherValue) {
                            if (neighbor < group[0]) {
                                data.insertInto.push(group[group.length - 1]);
                            }
                            else {
                                data.insertInto.push(group[0]);
                            }
                        }
                    });
                }
            });
        }
        if (!data.insertInto.length) {
            this.resetMultiGroup(data);
        }
    };
    StepManager.prototype.groupOneDetermineInsert = function (data) {
        var _this = this;
        var leftOver = data.count;
        if (leftOver.o === 0 || leftOver.x === 0) {
            data.insertInto = data.blanks;
        }
        else if (leftOver.o === 1 && leftOver.x > 2
            || leftOver.x === 1 && leftOver.o > 2) {
            data.insertInto = [data.blanks[0], data.blanks[data.blanks.length - 1]];
        }
        else if ((data.neighbors[0] && this.board.value(data.neighbors[0]) === data.mainValue) || (data.neighbors[1] && this.board.value(data.neighbors[1]) === data.mainValue)) {
            data.neighbors.forEach(function (neighbor) {
                if (_this.board.value(neighbor) === data.mainValue) {
                    if (neighbor < data.blanks[0]) {
                        data.insertInto.push(data.blanks[data.blanks.length - 1]);
                    }
                    else {
                        data.insertInto.push(data.blanks[0]);
                    }
                }
            });
        }
        else {
            this.resetOneGroup();
        }
    };
    StepManager.prototype.groupProcessBlanks = function (data) {
        var leftOver = indexManager_1.IndexManager.leftOver(this.board, data.currentType, data.currentIndex);
        var blanksInOrder = indexManager_1.IndexManager.blanksInOrder(this.board, data.currentType, data.currentIndex);
        var oneLeft = (leftOver.o === 1 && leftOver.x > 1
            || leftOver.x === 1 && leftOver.o > 1);
        var onlyOne = (leftOver.o === 0 || leftOver.x === 0);
        if ((blanksInOrder && oneLeft) || onlyOne) {
            data.count = leftOver;
            data.neighbors = indexManager_1.IndexManager.getNeighbors(data.blanks, data.currentType, this.board.width, this.board.height);
            if (data.count.o > data.count.x) {
                data.mainValue = "O";
            }
            else {
                data.mainValue = "X";
            }
        }
        else {
            this.resetOneGroup();
        }
    };
    StepManager.prototype.multiGroupGetBlanks = function (data) {
        var blanks = indexManager_1.IndexManager.blankGroups(this.board, data.currentType, data.currentIndex);
        if (blanks.length) {
            data.groups = blanks;
            var leftOver = indexManager_1.IndexManager.leftOver(this.board, data.currentType, data.currentIndex);
            if (leftOver.o > leftOver.x) {
                data.higherValue = "O";
                data.higherCount = leftOver.o;
                data.lowerValue = "X";
                data.lowerCount = leftOver.x;
            }
            else {
                data.higherValue = "X";
                data.higherCount = leftOver.x;
                data.lowerValue = "O";
                data.lowerCount = leftOver.o;
            }
        }
        else {
            this.resetMultiGroup(data);
        }
    };
    StepManager.prototype.resetMultiGroup = function (data) {
        data.currentIndex = null;
        data.currentType = "";
        data.groups = [];
        data.higherCount = null;
        data.higherValue = "";
        data.insertInto = [];
        data.lowerCount = null;
        data.lowerValue = "";
    };
    StepManager.prototype.oneGroupGetBlanks = function (data) {
        var blanks = indexManager_1.IndexManager.getBlanks(this.board, data.currentType, data.currentIndex);
        if (blanks.length) {
            data.blanks = blanks;
        }
        else {
            this.resetOneGroup();
        }
    };
    StepManager.prototype.resetComparison = function (data) {
        data.currentType = "";
        data.currentPair = [];
        data.insertOpposite = [];
        data.checkEmpty = [];
    };
    StepManager.prototype.resetOneGroup = function () {
        var data = this.state.oneGroup;
        data.blanks = [];
        data.count = {};
        data.currentIndex = null;
        data.currentType = "";
        data.neighbors = [];
        data.mainValue = "";
        data.insertInto = [];
    };
    StepManager.prototype.getFlagFromCompareData = function (data, index) {
        if (data.insertOpposite.indexOf(index) !== -1) {
            return flags.insert;
        }
        else if (data.checkEmpty.indexOf(index) !== -1) {
            return flags.compare;
        }
        else if (data.currentPair.indexOf(index) !== -1) {
            return flags.active;
        }
    };
    StepManager.prototype.getFlagFromGroupData = function (data, index) {
        var blanks = data.blanks || [];
        if (!blanks.length && data.groups && data.groups.length) {
            data.groups.forEach(function (group) {
                blanks = blanks.concat(group);
            });
        }
        if (data.insertInto.indexOf(index) !== -1) {
            return flags.insert;
        }
        else if (data.neighbors && data.neighbors.indexOf(index) !== -1) {
            return flags.compare;
        }
        else if (blanks.indexOf(index) !== -1 ||
            (!blanks.length && data.currentType &&
                indexManager_1.IndexManager.getSectionIndexes(data.currentType, data.currentIndex, this.board.width, this.board.height).indexOf(index) !== -1)) {
            return flags.active;
        }
    };
    StepManager.prototype.getFlagFromCompareSection = function (data, index) {
        if (data.insertPatterns.length) {
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < data.insertPatterns.length; i++) {
                if (index === data.insertPatterns[i].index) {
                    return "insert";
                }
            }
        }
        if (data.first !== null) {
            var indexes = indexManager_1.IndexManager.getSectionIndexes(data.type, data.first, this.board.width, this.board.height);
            if (indexes.indexOf(index) !== -1) {
                return "current";
            }
        }
        if (data.second !== null) {
            var indexes = indexManager_1.IndexManager.getSectionIndexes(data.type, data.second, this.board.width, this.board.height);
            if (indexes.indexOf(index) !== -1) {
                return "compare";
            }
        }
    };
    StepManager.prototype.takeConsecutivePairsStep = function () {
        if (this.state.consecutivePairs.currentPair.length) {
            this.handleCurrentConsecutivePair();
        }
        else {
            this.setNext(this.state.consecutivePairs);
        }
    };
    StepManager.prototype.takeOneSepStep = function () {
        if (this.state.oneSep.currentPair.length) {
            this.handleOneSepPair();
        }
        else {
            this.setNext(this.state.oneSep);
        }
    };
    StepManager.prototype.setNext = function (data) {
        var _this = this;
        var step = this.currentStep();
        var currentPair;
        var currentType;
        if (data.rows.length) {
            currentPair = data.rows.shift();
            currentType = "row";
        }
        else if (data.columns.length) {
            currentPair = data.columns.shift();
            currentType = "column";
        }
        if (!(currentPair && currentType)) {
            return;
        }
        var comparisonFilled = true;
        currentPair.forEach(function (index) {
            if (!_this.board.value(index)) {
                comparisonFilled = false;
            }
        });
        var hasEmptyToFill = false;
        switch (step) {
            case oneSep:
                var midIndex = (currentPair[0] + currentPair[1]) / 2;
                if (!this.board.value(midIndex)) {
                    hasEmptyToFill = true;
                }
                break;
            case consecutivePairs:
                var neighbors = indexManager_1.IndexManager.getNeighbors(currentPair, currentType, this.board.width, this.board.height);
                neighbors.forEach(function (index) {
                    if (!_this.board.value(index)) {
                        hasEmptyToFill = true;
                    }
                });
                break;
            default:
                return;
        }
        if (currentPair && currentType && !(hasEmptyToFill && comparisonFilled)) {
            this.setNext(data);
        }
        else {
            data.currentPair = currentPair;
            data.currentType = currentType;
        }
    };
    StepManager.prototype.handleOneSepPair = function () {
        this.handleCompareStep(this.state.oneSep);
    };
    StepManager.prototype.handleCurrentConsecutivePair = function () {
        this.handleCompareStep(this.state.consecutivePairs);
    };
    StepManager.prototype.findNodesToCompare = function (pair, data) {
        switch (this.currentStep()) {
            case consecutivePairs:
                return indexManager_1.IndexManager.getNeighbors(pair, data.currentType, this.board.width, this.board.height);
            case oneSep:
                return indexManager_1.IndexManager.getBetween(pair, data.currentType);
        }
    };
    StepManager.prototype.handleCompareStep = function (data) {
        var _this = this;
        var pair = data.currentPair;
        var spots = this.board.spots;
        if (data.insertOpposite.length) {
            var value = this.board.value(pair[0]) === "O" ? "X" : "O";
            this.insert(data.insertOpposite, value);
            this.resetComparison(data);
        }
        else if (data.checkEmpty.length) {
            var empty = data.checkEmpty;
            empty.forEach(function (index) {
                if (!_this.board.value(index)) {
                    data.insertOpposite.push(index);
                }
            });
            if (!data.insertOpposite.length) {
                this.resetComparison(data);
            }
        }
        else if (comparisonManager_1.ComparisonManager.compareTwo(spots[pair[0]], spots[pair[1]])) {
            data.checkEmpty = this.findNodesToCompare(pair, data);
        }
        else {
            this.resetComparison(data);
        }
    };
    return StepManager;
}());
exports.StepManager = StepManager;


/***/ }),
/* 7 */
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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(11)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, "body {\n  background: aliceblue;\n  text-align: center;\n  display: block !important; }\n\n#puzzle-data {\n  padding: 10px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  text-align: right;\n  width: 300px; }\n\n#tic-tac-puzzle {\n  box-sizing: border-box;\n  margin: 30px 0px 30px 330px;\n  position: relative; }\n  #tic-tac-puzzle .board-wrapper {\n    position: relative;\n    margin-left: 44px;\n    box-sizing: content-box;\n    border-right: 4px solid black;\n    border-bottom: 4px solid black; }\n    #tic-tac-puzzle .board-wrapper:after {\n      content: \"\";\n      display: block;\n      clear: both; }\n  #tic-tac-puzzle .spot {\n    height: 40px;\n    width: 40px;\n    box-sizing: border-box;\n    border: 1px solid black;\n    float: left;\n    text-align: center;\n    line-height: 40px;\n    font-size: 32px; }\n    #tic-tac-puzzle .spot.current {\n      background: lime; }\n    #tic-tac-puzzle .spot.compare {\n      background: tomato; }\n    #tic-tac-puzzle .spot.insert {\n      background: navy; }\n    #tic-tac-puzzle .spot.X {\n      color: deeppink; }\n    #tic-tac-puzzle .spot.O {\n      color: deepskyblue; }\n  #tic-tac-puzzle .row-counts {\n    width: 44px;\n    position: absolute;\n    margin-top: 40px;\n    border: 4px solid navy;\n    border-right: 0;\n    background: mistyrose; }\n    #tic-tac-puzzle .row-counts .row-count {\n      width: 40px;\n      height: 40px;\n      border: 1px solid black;\n      box-sizing: border-box;\n      position: relative; }\n      #tic-tac-puzzle .row-counts .row-count div {\n        font-size: 19.2px; }\n      #tic-tac-puzzle .row-counts .row-count .x {\n        color: deeppink;\n        height: 18px;\n        width: 18px;\n        line-height: 18px;\n        text-align: center; }\n      #tic-tac-puzzle .row-counts .row-count .o {\n        color: deepskyblue;\n        height: 18px;\n        width: 18px;\n        line-height: 18px;\n        text-align: center;\n        float: right; }\n  #tic-tac-puzzle .column-counts {\n    height: 44px;\n    position: relative;\n    margin-left: 40px;\n    border: 4px solid navy;\n    border-bottom: 0;\n    background: mistyrose; }\n    #tic-tac-puzzle .column-counts:after {\n      content: \"\";\n      display: block;\n      clear: both; }\n    #tic-tac-puzzle .column-counts .column-count {\n      width: 40px;\n      height: 40px;\n      border: 1px solid black;\n      box-sizing: border-box;\n      float: left; }\n      #tic-tac-puzzle .column-counts .column-count div {\n        font-size: 19.2px; }\n      #tic-tac-puzzle .column-counts .column-count .x {\n        color: deeppink;\n        height: 18px;\n        width: 18px;\n        line-height: 18px;\n        text-align: center; }\n      #tic-tac-puzzle .column-counts .column-count .o {\n        color: deepskyblue;\n        height: 18px;\n        width: 18px;\n        line-height: 18px;\n        text-align: center;\n        float: right; }\n  #tic-tac-puzzle.width-6 {\n    width: 288px; }\n    #tic-tac-puzzle.width-6 .board-wrapper {\n      width: 240px; }\n  #tic-tac-puzzle.width-8 {\n    width: 368px; }\n    #tic-tac-puzzle.width-8 .board-wrapper {\n      width: 320px; }\n  #tic-tac-puzzle.width-10 {\n    width: 448px; }\n    #tic-tac-puzzle.width-10 .board-wrapper {\n      width: 400px; }\n  #tic-tac-puzzle.width-12 {\n    width: 528px; }\n    #tic-tac-puzzle.width-12 .board-wrapper {\n      width: 480px; }\n  #tic-tac-puzzle.width-18 {\n    width: 768px; }\n    #tic-tac-puzzle.width-18 .board-wrapper {\n      width: 720px; }\n\n#step-text {\n  font-size: 20px;\n  margin: auto; }\n\n#start {\n  display: inline-block; }\n\n#links {\n  -webkit-columns: 50px 4;\n  -moz-columns: 50px 4;\n  columns: 50px 4;\n  margin-bottom: 20px; }\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(12);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);