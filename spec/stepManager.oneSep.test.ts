import { Board } from "../src/board";
import { ComparisonManager } from "../src/comparisonManager";
import { StepManager } from "../src/stepManager";

describe("StepManager one seperated", () => {
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

        // - X X - - -
        // - - - - - O
        // X - - O - -
        // - O - - - -
        // - X - - O -
        // - - - - O -
    });

    describe("create", () => {
        it("has a state object", () => {
            expect(stepManager.state.oneSep).toEqual({
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
            expect(stepManager.state.oneSep).toEqual({
                checkEmpty: [],
                columns: [
                    [0, 12], [6, 18], [12, 24], [18, 30],
                    [1, 13], [7, 19], [13, 25], [19, 31],
                    [2, 14], [8, 20], [14, 26], [20, 32],
                    [3, 15], [9, 21], [15, 27], [21, 33],
                    [4, 16], [10, 22], [16, 28], [22, 34],
                    [5, 17], [11, 23], [17, 29], [23, 35],
                ],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [
                    [0, 2], [1, 3], [2, 4], [3, 5],
                    [6, 8], [7, 9], [8, 10], [9, 11],
                    [12, 14], [13, 15], [14, 16], [15, 17],
                    [18, 20], [19, 21], [20, 22], [21, 23],
                    [24, 26], [25, 27], [26, 28], [27, 29],
                    [30, 32], [31, 33], [32, 34], [33, 35],
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
        board.setSpot("O", 4);
        board.setSpot("O", 9);
        stepManager.state.oneSep.rows = [
            [0, 2], [1, 3], [2, 4], [3, 5],
            [6, 8], [7, 9], [8, 10], [9, 11],
        ];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [2, 4],
            currentType: "row",
            insertOpposite: [],
            rows: [[3, 5], [6, 8], [7, 9], [8, 10], [9, 11]],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [[3, 5], [6, 8], [7, 9], [8, 10], [9, 11]],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [9, 11],
            currentType: "row",
            insertOpposite: [],
            rows: [],

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
        board.setSpot("O", 14);
        stepManager.state.oneSep.rows = [[12, 14]];
        stepManager.state.oneSep.columns = [[2, 14]];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [[2, 14]],
            currentPair: [12, 14],
            currentType: "row",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [[2, 14]],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [2, 14],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("fills in from column", () => {
        stepManager.state.oneSep.columns = [[3, 15]];
        stepManager.state.madeAChange = false;
        board.setSpot("O", 3);
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [3, 15],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [9],
            columns: [],
            currentPair: [3, 15],
            currentType: "column",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [9],
            columns: [],
            currentPair: [3, 15],
            currentType: "column",
            insertOpposite: [9],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(9)).toEqual("X");
    });

    it("iterates over columns", () => {
        board.setSpot("O", 0);
        board.setSpot("O", 24);
        stepManager.state.oneSep.columns = [[0, 12], [6, 18], [12, 24]];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [[6, 18], [12, 24]],
            currentPair: [0, 12],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [[6, 18], [12, 24]],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [12, 24],
            currentType: "column",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("fills in row", () => {
        board.setSpot("X", 4);
        stepManager.state.oneSep.rows = [[2, 4]];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [2, 4],
            currentType: "row",
            insertOpposite: [],
            rows: [],

        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [3],
            columns: [],
            currentPair: [2, 4],
            currentType: "row",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [3],
            columns: [],
            currentPair: [2, 4],
            currentType: "row",
            insertOpposite: [3],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(3)).toEqual("O");
    });

    it("knows to try again if a change has been made", () => {
        stepManager.setUp();
        const rows = stepManager.state.oneSep.rows;
        const columns = stepManager.state.oneSep.columns;
        const newStepManager = new StepManager(board);
        newStepManager.state.madeAChange = true;
        newStepManager.takeStep();
        expect(newStepManager.state.oneSep).toEqual({
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
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("manages no empty or not filled", () => {
        // - X X - - -
        // - - - - - O
        // X - - O - -
        // - O - - - -
        // - X - - O -
        // - - - - O -
        board.setSpot("O", 3);
        board.setSpot("X", 9);
        board.setSpot("X", 27);
        // - X X O - -
        // - - - X - O
        // X - - O - -
        // - O - - - -
        // - X - - O -
        // - - - - O -

        // 1 and 2 == x already
        stepManager.state.oneSep.rows = [];
        stepManager.state.oneSep.columns = [[3, 15], [9, 21], [15, 27]];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [15, 27],
            currentType: "column",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneSep).toEqual({
            checkEmpty: [],
            columns: [],
            currentPair: [],
            currentType: "",
            insertOpposite: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    describe("flags", () => {
        it("knows the flags no step", () => {
            stepManager.state.oneSep.currentPair = [];
            stepManager.state.oneSep.checkEmpty = [];
            stepManager.state.oneSep.insertOpposite = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual(undefined);
            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(3)).toEqual(undefined);
            expect(stepManager.flag(4)).toEqual(undefined);
        });

        it("knows the flags when on current pair", () => {
            stepManager.state.oneSep.currentPair = [1, 2];
            stepManager.state.oneSep.checkEmpty = [];
            stepManager.state.oneSep.insertOpposite = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual(undefined);
            expect(stepManager.flag(4)).toEqual(undefined);
        });

        it("knows the flags when check empty", () => {
            stepManager.state.oneSep.currentPair = [1, 2];
            stepManager.state.oneSep.checkEmpty = [0, 3];
            stepManager.state.oneSep.insertOpposite = [];

            expect(stepManager.flag(0)).toEqual("compare");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("compare");
            expect(stepManager.flag(4)).toEqual(undefined);
        });

        it("knows the flags on insert", () => {
            stepManager.state.oneSep.currentPair = [1, 2];
            stepManager.state.oneSep.checkEmpty = [0, 3];
            stepManager.state.oneSep.insertOpposite = [0];

            expect(stepManager.flag(0)).toEqual("insert");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("compare");
            expect(stepManager.flag(4)).toEqual(undefined);
        });
    });
});
