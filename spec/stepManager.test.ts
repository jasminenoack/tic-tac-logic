import { Board } from "../src/board";
import { StepManager } from "../src/stepManager";

describe("StepManager", () => {
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
                madeAChange: true,
            });
        });
    });
});
