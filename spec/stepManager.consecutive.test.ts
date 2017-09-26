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
            expect(stepManager.state.consecutivePairs).toEqual({
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
        });
    });

    describe("set up", () => {
        it("sets up the new state for the board", () => {
            stepManager.setUp();
            expect(stepManager.state.consecutivePairs).toEqual({
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
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });
    });

    it("iterates over rows", () => {
        // - X X - - -
        // - - - - - O
        // X - - O - -
        // - O - - - -
        // - X - - O -
        // - - - - O -
        board.setSpot("X", 14);
        board.setSpot("X", 20);
        stepManager.state.consecutivePairs.rows = [[0, 1], [14, 15], [15, 16], [19, 20], [20, 21]];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [14, 15],
            currentType: "row",
            insertOpposite: [],
            rows: [[15, 16], [19, 20], [20, 21]],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [[15, 16], [19, 20], [20, 21]],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [19, 20],
            currentType: "row",
            insertOpposite: [],
            rows: [[20, 21]],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("switches from rows to columns", () => {
        // - X X - - -
        // - - - - - O
        // X - - O - -
        // - O - - - -
        // - X - - O -
        // - - - - O -
        board.setSpot("X", 14);
        stepManager.state.consecutivePairs.rows = [[14, 15]];
        stepManager.state.consecutivePairs.columns = [[19, 25]];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [[19, 25]],
            currentPair: [14, 15],
            currentType: "row",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [[19, 25]],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [19, 25],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("fills in from column", () => {
        stepManager.state.consecutivePairs.columns = [[28, 34]];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [28, 34],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [22],
            columns: [],
            currentPair: [28, 34],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [22],
            columns: [],
            currentPair: [28, 34],
            currentType: "column",
            insertOpposite: [22],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(22)).toEqual("X");
    });

    it("iterates over columns", () => {
        // - X X - - -
        // - - - - - O
        // X - - O - -
        // - O - - - -
        // - X - - O -
        // - - - - O -
        board.setSpot("O", 6);
        stepManager.state.consecutivePairs.columns = [[0, 6], [6, 12], [12, 18], [19, 25]];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [[12, 18], [19, 25]],
            currentPair: [6, 12],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [[12, 18], [19, 25]],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [19, 25],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("fills in outer on row", () => {
        expect(board.value(0)).toEqual("");
        expect(board.value(3)).toEqual("");
        stepManager.state.consecutivePairs.rows = [[1, 2]];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [1, 2],
            currentType: "row",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [0, 3],
            columns: [],
            currentPair: [1, 2],
            currentType: "row",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [0, 3],
            columns: [],
            currentPair: [1, 2],
            currentType: "row",
            insertOpposite: [0, 3],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(0)).toEqual("O");
        expect(board.value(3)).toEqual("O");
    });

    it("knows to try again if a change has been made", () => {
        stepManager.setUp();
        const rows = stepManager.state.consecutivePairs.rows;
        const columns = stepManager.state.consecutivePairs.columns;
        const newStepManager = new StepManager(board);
        newStepManager.state.madeAChange = true;
        newStepManager.takeStep();
        expect(newStepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns,
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows,
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("knows to stop if no change has been made", () => {
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("manages no sides empty", () => {
        // - X X - - -
        // - - - - - O
        // X - - O - -
        // - O - - - -
        // - X - - O -
        // - - - - O -
        board.setSpot("O", 0);
        // 1 and 2 == x already
        board.setSpot("O", 3);
        board.setSpot("O", 7);
        // 1 and 2 == x already
        board.setSpot("O", 8);
        stepManager.setUp();
        stepManager.state.consecutivePairs.rows = [[1, 2], [7, 8]];
        stepManager.state.consecutivePairs.columns = [];
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [7, 8],
            currentType: "row",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [6, 9],
            columns: [],
            currentPair: [7, 8],
            currentType: "row",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("manages only one side empty", () => {
        board.setSpot("O", 3);
        stepManager.setUp();
        stepManager.state.consecutivePairs.rows = [[1, 2]];
        stepManager.state.consecutivePairs.columns = [];
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [1, 2],
            currentType: "row",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [0, 3],
            columns: [],
            currentPair: [1, 2],
            currentType: "row",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [0, 3],
            columns: [],
            currentPair: [1, 2],
            currentType: "row",
            insertOpposite: [0],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.consecutivePairs).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(0)).toEqual("O");
    });

    describe("flags", () => {
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
});
