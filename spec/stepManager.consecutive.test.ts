import { Board } from "../src/board";
import { ComparisonManager } from "../src/comparisonManager";
import { StepManager } from "../src/stepManager";

describe("StepManager consecutive", () => {
    let stepManager;
    let board;
    beforeEach(() => {
        const height = 6;
        const width = 6;
        const xs = [
            [0, 1],
            [0, 2],
            [2, 0],
            [4, 1],
        ];
        const os = [
            [1, 5],
            [2, 3],
            [3, 1],
            [4, 4],
            [5, 4],
        ];
        board = new Board(width, height, xs, os);
        stepManager = new StepManager(board);
    });

    describe("create", () => {
        it("has a state object", () => {
            expect(stepManager.state).toEqual({
                consecutivePairs: {
                    checkEmpty: [],
                    columns: [],
                    currentPair: [],
                    currentType: "",
                    insertOpposite: [],
                    rows: [],
                },
                madeAChange: true,
            });
        });
    });

    describe("set up", () => {
        it("sets up the new state for the board", () => {
            stepManager.setUp();
            expect(stepManager.state).toEqual({
                consecutivePairs: {
                    checkEmpty: [],
                    columns: [
                        [0, 6], [6, 12], [12, 18], [18, 24], [24, 30],
                        [1, 7], [7, 13], [13, 19], [19, 25], [25, 31],
                        [2, 8], [8, 14], [14, 20], [20, 26], [26, 32],
                        [3, 9], [9, 15], [15, 21], [21, 27], [27, 33],
                        [4, 10], [10, 16], [16, 22], [22, 28], [28, 34],
                        [5, 11], [11, 17], [17, 23], [23, 29], [29, 35],
                    ],
                    currentPair: [],
                    currentType: "",
                    insertOpposite: [],
                    rows: [
                        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
                        [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
                        [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
                        [18, 19], [19, 20], [20, 21], [21, 22], [22, 23],
                        [24, 25], [25, 26], [26, 27], [27, 28], [28, 29],
                        [30, 31], [31, 32], [32, 33], [33, 34], [34, 35],
                    ],
                },
                madeAChange: false,
            });
        });
    });

    it("step through a full round consecutive pairs", () => {
        const rows = [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
            [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
            [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
            [18, 19], [19, 20], [20, 21], [21, 22], [22, 23],
            [24, 25], [25, 26], [26, 27], [27, 28], [28, 29],
            [30, 31], [31, 32], [32, 33], [33, 34], [34, 35],
        ];
        const columns = [
            [0, 6], [6, 12], [12, 18], [18, 24], [24, 30],
            [1, 7], [7, 13], [13, 19], [19, 25], [25, 31],
            [2, 8], [8, 14], [14, 20], [20, 26], [26, 32],
            [3, 9], [9, 15], [15, 21], [21, 27], [27, 33],
            [4, 10], [10, 16], [16, 22], [22, 28], [28, 34],
            [5, 11], [11, 17], [17, 23], [23, 29], [29, 35],
        ];
        stepManager.setUp();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: false,
        });

        // moves to look at the current pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [0, 1],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: false,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: false,
        });

        // move to looking at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: false,
        });

        // move find the indexes that need to be checked
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [0, 3],
                columns,
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: false,
        });

        // move find the empty squares to insert
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [0, 3],
                columns,
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [0, 3],
                rows,
            },
            madeAChange: false,
        });

        // remove the data and insert into the board
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        expect(board.value(0)).toEqual("O");
        expect(board.value(3)).toEqual("O");

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [2, 3],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [3, 4],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [4, 5],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns: [
                    [0, 6], [6, 12], [12, 18], [18, 24], [24, 30],
                    [1, 7], [7, 13], [13, 19], [19, 25], [25, 31],
                    [2, 8], [8, 14], [14, 20], [20, 26], [26, 32],
                    [3, 9], [9, 15], [15, 21], [21, 27], [27, 33],
                    [4, 10], [10, 16], [16, 22], [22, 28], [28, 34],
                    [5, 11], [11, 17], [17, 23], [23, 29], [29, 35],
                ],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [
                    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
                    [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
                    [18, 19], [19, 20], [20, 21], [21, 22], [22, 23],
                    [24, 25], [25, 26], [26, 27], [27, 28], [28, 29],
                    [30, 31], [31, 32], [32, 33], [33, 34], [34, 35],
                ],
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [6, 7],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [7, 8],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [8, 9],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [9, 10],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [10, 11],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [12, 13],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [13, 14],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [14, 15],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [15, 16],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [16, 17],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [18, 19],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [19, 20],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [20, 21],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [21, 22],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [22, 23],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [24, 25],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [25, 26],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [26, 27],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [27, 28],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [28, 29],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [30, 31],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [31, 32],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [32, 33],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [33, 34],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        rows.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [34, 35],
                currentType: "row",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // switch to columns
        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [0, 6],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [6, 12],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [12, 18],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [18, 24],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [24, 30],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [1, 7],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [7, 13],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [13, 19],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [19, 25],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [25, 31],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [2, 8],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [8, 14],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [14, 20],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [20, 26],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [26, 32],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [3, 9],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [9, 15],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [15, 21],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [21, 27],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [27, 33],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [4, 10],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [10, 16],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [16, 22],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [22, 28],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [28, 34],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [22],
                columns,
                currentPair: [28, 34],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [22],
                columns,
                currentPair: [28, 34],
                currentType: "column",
                insertOpposite: [22],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        expect(board.value(22)).toEqual("X");

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [5, 11],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [11, 17],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [17, 23],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [23, 29],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // look at the next pair
        stepManager.takeStep();
        columns.shift();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [29, 35],
                currentType: "column",
                insertOpposite: [],
                rows,
            },
            madeAChange: true,
        });

        // remove current pair if they don't match
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: true,
        });

        // O X X O _ _
        // _ _ _ _ _ O
        // X _ _ O _ _
        // _ O _ _ X _
        // _ X _ _ O _
        // _ _ _ _ O _
    });

    it("knows to try again if a change has been made", () => {
        stepManager.setUp();
        const rows = stepManager.state.consecutivePairs.rows;
        const columns = stepManager.state.consecutivePairs.columns;
        stepManager.state.consecutivePairs.rows = [];
        stepManager.state.consecutivePairs.columns = [];
        stepManager.state.madeAChange = true;

        stepManager.takeStep();

        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns,
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows,
            },
            madeAChange: false,
        });
    });

    it("knows to stop if no change has been made", () => {
        stepManager.setUp();
        const rows = stepManager.state.consecutivePairs.rows;
        const columns = stepManager.state.consecutivePairs.columns;
        stepManager.state.consecutivePairs.rows = [];
        stepManager.state.consecutivePairs.columns = [];

        stepManager.takeStep();

        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: false,
        });
    });

    it("manages no sides empty", () => {
        board.setSpot("O", 0);
        // 1 and 2 == x already
        board.setSpot("O", 3);
        stepManager.setUp();
        stepManager.state.consecutivePairs.rows = [[1, 2]];
        stepManager.state.consecutivePairs.columns = [];

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: false,
        });

        const spots = board.spots;
        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [0, 3],
                columns: [],
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: false,
        });

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: false,
        });
    });

    it("manages only one side empty", () => {
        board.setSpot("O", 3);
        stepManager.setUp();
        stepManager.state.consecutivePairs.rows = [[1, 2]];
        stepManager.state.consecutivePairs.columns = [];

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: false,
        });

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [0, 3],
                columns: [],
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: false,
        });

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [0, 3],
                columns: [],
                currentPair: [1, 2],
                currentType: "row",
                insertOpposite: [0],
                rows: [],
            },
            madeAChange: false,
        });

        stepManager.takeStep();
        expect(stepManager.state).toEqual({
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
            madeAChange: true,
        });
        expect(board.value(0)).toEqual("O");
    });

    it("knows the flags no step", () => {
        stepManager.state.consecutivePairs.currentPair = [];
        stepManager.state.consecutivePairs.checkEmpty = [];
        stepManager.state.consecutivePairs.insertOpposite = [];

        expect(stepManager.flag(0)).toEqual(undefined);
        expect(stepManager.flag(1)).toEqual(undefined);
        expect(stepManager.flag(2)).toEqual(undefined);
        expect(stepManager.flag(3)).toEqual(undefined);
        expect(stepManager.flag(4)).toEqual(undefined);
    });

    it("knows the flags when on current pair", () => {
        stepManager.state.consecutivePairs.currentPair = [1, 2];
        stepManager.state.consecutivePairs.checkEmpty = [];
        stepManager.state.consecutivePairs.insertOpposite = [];

        expect(stepManager.flag(0)).toEqual(undefined);
        expect(stepManager.flag(1)).toEqual("current");
        expect(stepManager.flag(2)).toEqual("current");
        expect(stepManager.flag(3)).toEqual(undefined);
        expect(stepManager.flag(4)).toEqual(undefined);
    });

    it("knows the flags when check empty", () => {
        stepManager.state.consecutivePairs.currentPair = [1, 2];
        stepManager.state.consecutivePairs.checkEmpty = [0, 3];
        stepManager.state.consecutivePairs.insertOpposite = [];

        expect(stepManager.flag(0)).toEqual("compare");
        expect(stepManager.flag(1)).toEqual("current");
        expect(stepManager.flag(2)).toEqual("current");
        expect(stepManager.flag(3)).toEqual("compare");
        expect(stepManager.flag(4)).toEqual(undefined);
    });

    it("knows the flags on insert", () => {
        stepManager.state.consecutivePairs.currentPair = [1, 2];
        stepManager.state.consecutivePairs.checkEmpty = [0, 3];
        stepManager.state.consecutivePairs.insertOpposite = [0];

        expect(stepManager.flag(0)).toEqual("insert");
        expect(stepManager.flag(1)).toEqual("current");
        expect(stepManager.flag(2)).toEqual("current");
        expect(stepManager.flag(3)).toEqual("compare");
        expect(stepManager.flag(4)).toEqual(undefined);
    });
});
