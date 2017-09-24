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
var row = "row";
var column = "column";
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
        if (type === row) {
            currentIndexes = this.getRowIndexes(this.getRowStart(firstProcessedIndex, width), width);
        }
        else if (type === column) {
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
    IndexManager.blanksInOrder = function (board, type, index) {
        var indexes = this.getSectionIndexes(type, index, board.width, board.height);
        var blanks = this.getBlanks(board, type, index);
        if (blanks.length) {
            var firstBlankIndex = indexes.indexOf(blanks[0]);
            for (var i = firstBlankIndex; i < blanks.length; i++) {
                if (indexes[firstBlankIndex + i] !== blanks[i]) {
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
        var expectedCount = board.width / 2;
        // tslint:disable-next-line:forin
        for (var currentType in counts) {
            counts[currentType] = expectedCount - counts[currentType];
        }
        return counts;
    };
    IndexManager.getSectionIndexes = function (type, index, width, height) {
        if (type === row) {
            return this.getRowIndexes(index, width);
        }
        else if (type === column) {
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

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = __webpack_require__(2);
var puzzles = __webpack_require__(4);
var stepManager_1 = __webpack_require__(5);
var windowSearch = window.location.search;
var boardElement = document.getElementById("tic-tac-puzzle");
var stepElement = document.getElementById("step-text");
var start = document.getElementById("start");
function createBoard(board) {
    boardElement.className = "width-" + board.width;
    for (var i = 0; i < board.width * board.height; i++) {
        var subElement = document.createElement("div");
        subElement.className = "spot";
        boardElement.appendChild(subElement);
    }
}
function updateSpot(board, index, manager) {
    var spots = boardElement.getElementsByClassName("spot");
    if (spots && spots[index]) {
        var spot = spots[index];
        spot.innerText = board.value(index);
        var flag = manager.flag(index);
        spot.className = "spot " + (flag ? flag : "");
    }
}
function updateStep(manager) {
    if (manager.stepText()) {
        stepElement.innerText = manager.stepText();
    }
}
function updateAllSpots(board, manager) {
    for (var i = 0; i < board.width * board.height; i++) {
        updateSpot(board, i, manager);
    }
}
if (windowSearch) {
    var puzzleName = void 0;
    if (windowSearch.split("p=").length > 1) {
        puzzleName = windowSearch.split("p=")[1].split("&")[0];
    }
    if (puzzleName) {
        var puzzleData = puzzles[puzzleName];
        var board_2 = new board_1.Board(puzzleData.width, puzzleData.height, puzzleData.xs, puzzleData.os);
        var manager_1 = new stepManager_1.StepManager(board_2);
        createBoard(board_2);
        updateAllSpots(board_2, manager_1);
        updateStep(manager_1);
        start.addEventListener("click", function () {
            var interval = setInterval(function () {
                manager_1.takeStep();
                updateAllSpots(board_2, manager_1);
                updateStep(manager_1);
                if (manager_1.done()) {
                    clearInterval(interval);
                }
            }, 100);
        });
    }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var indexManager_1 = __webpack_require__(0);
var spot_1 = __webpack_require__(3);
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comparisonManager_1 = __webpack_require__(6);
var indexManager_1 = __webpack_require__(0);
var consecutivePairs = "consecutivePairs";
var oneSep = "oneSep";
var group = "group";
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
            group: {
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            },
            madeAChange: true,
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
        this.state.group.rows = rows;
        this.state.group.columns = columns;
        this.state.madeAChange = false;
    };
    StepManager.prototype.flag = function (index) {
        switch (this.currentStep()) {
            case consecutivePairs:
                return this.getFlagFromCompareData(this.state.consecutivePairs, index);
            case oneSep:
                return this.getFlagFromCompareData(this.state.oneSep, index);
            case group:
                return this.getFlagFromGroupData(this.state.group, index);
        }
    };
    StepManager.prototype.currentStep = function () {
        if (this.checkCompareStep(this.state.consecutivePairs)) {
            return consecutivePairs;
        }
        else if (this.checkCompareStep(this.state.oneSep)) {
            return oneSep;
        }
        else if (this.state.group.rows.length ||
            this.state.group.columns.length ||
            this.state.group.currentIndex !== null) {
            return group;
        }
    };
    StepManager.prototype.checkCompareStep = function (data) {
        return data.rows.length ||
            data.columns.length ||
            data.currentType ||
            data.currentPair.length;
    };
    StepManager.prototype.done = function () {
        return !(this.currentStep() || this.state.madeAChange);
    };
    StepManager.prototype.stepText = function () {
        switch (this.currentStep()) {
            case consecutivePairs:
                // tslint:disable-next-line:max-line-length
                return "For this step we are looking for consecutive squares that have the same value. If we find them we check if the squares on either side are empty. If they are empty then we can insert the opposite symbol into those squares";
            case oneSep:
                // tslint:disable-next-line:max-line-length
                return "For this step we are looking at places where a square is equal to the square 2 away from it. If these are equal the item between must be the opposite or there would be 3 in a row.";
            case group:
                // tslint:disable-next-line:max-line-length
                return "For this step we are attempting to determine if we can make any assumptions based on the numbers we need to place. If we need to place one of a particular type and multiple of the other type we may be able to assume the outside elements are of the type with a greater number. If in a section of 4 we need 3 Os and 1 X in a row them Xs are on the outside. Otherwise we would end up with 3 Xs in a row. It will also fill in a group if all of one value is used up.";
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
            case group:
                this.takeGroupStep();
                break;
            default:
                if (this.state.madeAChange) {
                    this.setUp();
                }
        }
    };
    StepManager.prototype.takeGroupStep = function () {
        var data = this.state.group;
        if (data.currentIndex !== null) {
            this.processCurrentGroup(data);
        }
        else if (data.rows.length) {
            data.currentIndex = data.rows.shift();
            data.currentType = "row";
        }
        else if (data.columns.length) {
            data.currentIndex = data.columns.shift();
            data.currentType = "column";
        }
    };
    StepManager.prototype.processCurrentGroup = function (data) {
        var _this = this;
        if (data.insertValue.length) {
            data.insertValue.forEach(function (index) {
                _this.board.setSpot(data.mainValue, index);
            });
            this.state.madeAChange = true;
            this.resetGroup();
        }
        else if (Object.keys(data.count).length) {
            this.groupDetermineInsert(data);
        }
        else if (data.blanks.length) {
            this.groupProcessBlanks(data);
        }
        else {
            this.groupGetBlanks(data);
        }
    };
    StepManager.prototype.groupDetermineInsert = function (data) {
        var _this = this;
        var leftOver = data.count;
        if (leftOver.o === 0 || leftOver.x === 0) {
            data.insertValue = data.blanks;
        }
        else if (leftOver.o === 1 && leftOver.x > 2
            || leftOver.x === 1 && leftOver.o > 2) {
            data.insertValue = [data.blanks[0], data.blanks[data.blanks.length - 1]];
        }
        else if ((data.neighbors[0] && this.board.value(data.neighbors[0]) === data.mainValue) || (data.neighbors[1] && this.board.value(data.neighbors[1]) === data.mainValue)) {
            data.neighbors.forEach(function (neighbor) {
                if (_this.board.value(neighbor) === data.mainValue) {
                    if (neighbor < data.blanks[0]) {
                        data.insertValue.push(data.blanks[data.blanks.length - 1]);
                    }
                    else {
                        data.insertValue.push(data.blanks[0]);
                    }
                }
            });
        }
        else {
            this.resetGroup();
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
            this.resetGroup();
        }
    };
    StepManager.prototype.groupGetBlanks = function (data) {
        var blanks = indexManager_1.IndexManager.getBlanks(this.board, data.currentType, data.currentIndex);
        if (blanks.length) {
            data.blanks = blanks;
        }
        else {
            this.resetGroup();
        }
    };
    StepManager.prototype.resetComparison = function (data) {
        data.currentType = "";
        data.currentPair = [];
        data.insertOpposite = [];
        data.checkEmpty = [];
    };
    StepManager.prototype.resetGroup = function () {
        var data = this.state.group;
        data.blanks = [];
        data.count = {};
        data.currentIndex = null;
        data.currentType = "";
        data.neighbors = [];
        data.mainValue = "";
        data.insertValue = [];
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
        if (data.insertValue.indexOf(index) !== -1) {
            return flags.insert;
        }
        else if (data.neighbors.indexOf(index) !== -1) {
            return flags.compare;
        }
        else if (data.blanks.indexOf(index) !== -1 ||
            (!data.blanks.length && data.currentType &&
                indexManager_1.IndexManager.getSectionIndexes(data.currentType, data.currentIndex, this.board.width, this.board.height).indexOf(index) !== -1)) {
            return flags.active;
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
        if (data.rows.length) {
            data.currentPair = data.rows.shift();
            data.currentType = "row";
        }
        else if (data.columns.length) {
            data.currentPair = data.columns.shift();
            data.currentType = "column";
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
            var value_1 = this.board.value(pair[0]) === "O" ? "X" : "O";
            data.insertOpposite.forEach(function (index) {
                _this.board.setSpot(value_1, index);
            });
            this.resetComparison(data);
            this.state.madeAChange = true;
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