import { Board } from "../src/board";
import { ComparisonManager } from "../src/comparisonManager";
import { StepManager } from "../src/stepManager";

describe("StepManager multi group", () => {
    let stepManager;
    let board;
    beforeEach(() => {
        const height = 6;
        const width = 6;
        const xs = [
            [0, 1],
            [0, 2],
            [0, 4],

            [1, 3],

            [2, 0],
            [2, 5],

            [3, 4],

            [4, 2],

            [5, 5],
        ];
        const os = [
            [0, 0],
            [0, 3],
            [0, 5],

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
            expect(stepManager.state.multiGroup).toEqual({
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
            });
            expect(stepManager.state.madeAChange).toEqual(true);
        });
    });

    describe("set up", () => {
        it("sets up the new state for the board", () => {
            stepManager.setUp();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [0, 1, 2, 3, 4, 5],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [0, 1, 2, 3, 4, 5],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });
    });

    describe("take steps", () => {
        // O X X O X O
        // - - - X - O
        // X - - O - X
        // - O - - X -
        // - - X - O -
        // - - - - O X
        it("handles no blanks", () => {
            stepManager.state.multiGroup.rows = [0, 1, 2];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 1,
                currentType: "row",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 1,
                currentType: "row",
                groups: [[6, 7, 8], [10]],
                higherCount: 2,
                higherValue: "X",
                insertInto: [],
                lowerCount: 2,
                lowerValue: "O",
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        it("finds blanks and groups in a row", () => {
            stepManager.state.multiGroup.rows = [1, 2];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 1,
                currentType: "row",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 1,
                currentType: "row",
                groups: [[6, 7, 8], [10]],
                higherCount: 2,
                higherValue: "X",
                insertInto: [],
                lowerCount: 2,
                lowerValue: "O",
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 2,
                currentType: "row",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        it("handles finding values to place", () => {
            stepManager.state.multiGroup.columns = [2, 3];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [3],
                currentIndex: 2,
                currentType: "column",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [3],
                currentIndex: 2,
                currentType: "column",
                groups: [[8, 14, 20], [32]],
                higherCount: 3,
                higherValue: "O",
                insertInto: [],
                lowerCount: 1,
                lowerValue: "X",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [3],
                currentIndex: 2,
                currentType: "column",
                groups: [[8, 14, 20], [32]],
                higherCount: 3,
                higherValue: "O",
                insertInto: [32],
                lowerCount: 1,
                lowerValue: "X",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [3],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
            expect(board.value(32)).toEqual("O");
        });

        it("handles a row that should not be inserted into", () => {
            stepManager.state.multiGroup.columns = [3, 4];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [4],
                currentIndex: 3,
                currentType: "column",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [4],
                currentIndex: 3,
                currentType: "column",
                groups: [[21, 27, 33]],
                higherCount: 2,
                higherValue: "X",
                insertInto: [],
                lowerCount: 1,
                lowerValue: "O",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [4],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        it("handles a 2 with a neighbor", () => {
            stepManager.state.multiGroup.rows = [2, 3];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 2,
                currentType: "row",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [3],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 2,
                currentType: "row",
                groups: [[13, 14], [16]],
                higherCount: 2,
                higherValue: "O",
                insertInto: [],
                lowerCount: 1,
                lowerValue: "X",
                rows: [3],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 2,
                currentType: "row",
                groups: [[13, 14], [16]],
                higherCount: 2,
                higherValue: "O",
                insertInto: [16],
                lowerCount: 1,
                lowerValue: "X",
                rows: [3],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [3],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
            expect(board.value(16)).toEqual("O");
        });

        it("handles 2 sets of 2", () => {
            const height = 10;
            const width = 8;
            const xs = [
                [2, 4],
                [9, 4],
            ];
            const os = [
                [0, 4],
                [1, 4],
                [5, 4],
                [8, 4],
            ];
            board = new Board(width, height, xs, os);
            stepManager = new StepManager(board);

            stepManager.state.multiGroup.columns = [4];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 4,
                currentType: "column",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 4,
                currentType: "column",
                groups: [[28, 36], [52, 60]],
                higherCount: 3,
                higherValue: "X",
                insertInto: [],
                lowerCount: 1,
                lowerValue: "O",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 4,
                currentType: "column",
                groups: [[28, 36], [52, 60]],
                higherCount: 3,
                higherValue: "X",
                insertInto: [52, 60],
                lowerCount: 1,
                lowerValue: "O",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        it("handles sep by 1 with main in the center", () => {
            const height = 14;
            const width = 6;
            const xs = [
                [2, 0],
                [6, 0],
                [8, 0],
                [9, 0],
                [12, 0],
                [13, 0],
            ];
            const os = [
                [4, 0],
                [7, 0],
                [10, 0],
                [11, 0],
            ];
            board = new Board(width, height, xs, os);
            stepManager = new StepManager(board);

            stepManager.state.multiGroup.columns = [0];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 0,
                currentType: "column",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 0,
                currentType: "column",
                groups: [[0, 6], [18], [30]],
                higherCount: 3,
                higherValue: "O",
                insertInto: [],
                lowerCount: 1,
                lowerValue: "X",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                columns: [],
                currentIndex: 0,
                currentType: "column",
                groups: [[0, 6], [18], [30]],
                higherCount: 3,
                higherValue: "O",
                insertInto: [0, 6],
                lowerCount: 1,
                lowerValue: "X",
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
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
            });
            expect(stepManager.state.madeAChange).toEqual(true);

            expect(board.value(0)).toEqual("O");
            expect(board.value(6)).toEqual("O");
        });
    });

    describe("flags", () => {
        it("knows the flags no step", () => {
            stepManager.state.multiGroup.currentIndex = null;
            stepManager.state.multiGroup.blanks = [];
            stepManager.state.multiGroup.currentType = "";
            stepManager.state.multiGroup.neighbors = [];
            stepManager.state.multiGroup.insertValue = [];

            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(8)).toEqual(undefined);
            expect(stepManager.flag(14)).toEqual(undefined);
            expect(stepManager.flag(20)).toEqual(undefined);
            expect(stepManager.flag(26)).toEqual(undefined);
            expect(stepManager.flag(32)).toEqual(undefined);
        });

        it("knows the current row", () => {
            stepManager.state.multiGroup.currentIndex = 2;
            stepManager.state.multiGroup.groups = [];
            stepManager.state.multiGroup.currentType = "column";
            stepManager.state.multiGroup.insertValue = [];

            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(8)).toEqual("current");
            expect(stepManager.flag(14)).toEqual("current");
            expect(stepManager.flag(20)).toEqual("current");
            expect(stepManager.flag(26)).toEqual("current");
            expect(stepManager.flag(32)).toEqual("current");
        });

        it("knows the blanks", () => {
            stepManager.state.multiGroup.currentIndex = 2;
            stepManager.state.multiGroup.groups = [[8, 14, 20]];
            stepManager.state.multiGroup.currentType = "column";
            stepManager.state.multiGroup.insertValue = [];

            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(8)).toEqual("current");
            expect(stepManager.flag(14)).toEqual("current");
            expect(stepManager.flag(20)).toEqual("current");
            expect(stepManager.flag(26)).toEqual(undefined);
            expect(stepManager.flag(32)).toEqual(undefined);
        });

        it("knows the flags on insert", () => {
            stepManager.state.multiGroup.currentIndex = 2;
            stepManager.state.multiGroup.groups = [[8, 14, 20]];
            stepManager.state.multiGroup.currentType = "column";
            stepManager.state.multiGroup.insertInto = [20];

            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(8)).toEqual("current");
            expect(stepManager.flag(14)).toEqual("current");
            expect(stepManager.flag(20)).toEqual("insert");
            expect(stepManager.flag(26)).toEqual(undefined);
            expect(stepManager.flag(32)).toEqual(undefined);
        });
    });
});
