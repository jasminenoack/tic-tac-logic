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
                blanks: [],
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
                blanks: [],
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
            stepManager.state.multiGroup.rows = [0, 1];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                currentIndex: 0,
                currentType: "row",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [1],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [1],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                currentIndex: 1,
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

        xit("finds blanks and groups in a row");

        xit("handles rows with blanks in a row but bad counts", () => {
            stepManager.state.multiGroup.rows = [0, 1];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: 0,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [1],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            // find the blanks
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [4, 5],
                columns: [],
                count: {},
                currentIndex: 0,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [1],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            // if counts are not 1 and > 1 give up;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [1],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        xit("handles blanks not in order", () => {
            stepManager.state.multiGroup.rows = [1, 2];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            board.setSpot("X", 8);
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: 1,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [6, 7, 10],
                columns: [],
                count: {},
                currentIndex: 1,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [2],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        xit("handles with blanks, good counts, but right neighbors", () => {
            stepManager.state.multiGroup.columns = [3, 4];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [4],
                count: {},
                currentIndex: 3,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [21, 27, 33],
                columns: [4],
                count: {},
                currentIndex: 3,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            // sets counts and blanks, finds neighbor to compare
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [21, 27, 33],
                columns: [4],
                count: { o: 1, x: 2 },
                currentIndex: 3,
                currentType: "column",
                insertValue: [],
                mainValue: "X",
                neighbors: [15],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);

            // if numbers fail then it's over
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [4],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        xit("handles that is actually going to work without neighbors", () => {
            stepManager.state.madeAChange = false;
            board.setSpot("O", 5);
            stepManager.state.multiGroup.columns = [5];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: 5,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [17, 23, 29, 35],
                columns: [],
                count: {},
                currentIndex: 5,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [17, 23, 29, 35],
                columns: [],
                count: { x: 3, o: 1 },
                currentIndex: 5,
                currentType: "column",
                insertValue: [],
                mainValue: "X",
                neighbors: [11],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [17, 23, 29, 35],
                columns: [],
                count: { x: 3, o: 1 },
                currentIndex: 5,
                currentType: "column",
                insertValue: [17, 35],
                mainValue: "X",
                neighbors: [11],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
            expect(board.value(17)).toEqual("X");
            expect(board.value(35)).toEqual("X");
        });

        xit("handles a that is actually going to work with neighbors", () => {
            stepManager.state.madeAChange = false;
            stepManager.state.multiGroup.columns = [4];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: 4,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [4, 10, 16],
                columns: [],
                count: {},
                currentIndex: 4,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [4, 10, 16],
                columns: [],
                count: { x: 2, o: 1 },
                currentIndex: 4,
                currentType: "column",
                insertValue: [],
                mainValue: "X",
                neighbors: [22],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [4, 10, 16],
                columns: [],
                count: { x: 2, o: 1 },
                currentIndex: 4,
                currentType: "column",
                insertValue: [4],
                mainValue: "X",
                neighbors: [22],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
            expect(board.value(22)).toEqual("X");
        });

        xit("handles a that is actually going to work with top neighbors", () => {
            stepManager.state.madeAChange = false;
            board.setSpot("O", 5);
            board.setSpot("X", 17);
            stepManager.state.multiGroup.columns = [5];
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: 5,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [23, 29, 35],
                columns: [],
                count: {},
                currentIndex: 5,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [23, 29, 35],
                columns: [],
                count: { x: 2, o: 1 },
                currentIndex: 5,
                currentType: "column",
                insertValue: [],
                mainValue: "X",
                neighbors: [17],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [23, 29, 35],
                columns: [],
                count: { x: 2, o: 1 },
                currentIndex: 5,
                currentType: "column",
                insertValue: [35],
                mainValue: "X",
                neighbors: [17],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
            expect(board.value(35)).toEqual("X");
        });

        xit("handles a row with no other values", () => {
            stepManager.state.madeAChange = false;
            board.setSpot("X", 5);
            stepManager.state.multiGroup.rows = [0];
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: 0,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [4],
                columns: [],
                count: {},
                currentIndex: 0,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [4],
                columns: [],
                count: { o: 1, x: 0 },
                currentIndex: 0,
                currentType: "row",
                insertValue: [],
                mainValue: "O",
                neighbors: [3, 5],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [4],
                columns: [],
                count: { o: 1, x: 0 },
                currentIndex: 0,
                currentType: "row",
                insertValue: [4],
                mainValue: "O",
                neighbors: [3, 5],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
            expect(board.value(4)).toEqual("O");
        });

        xit("switches from rows to columns", () => {
            stepManager.state.multiGroup.rows = [5];
            stepManager.state.multiGroup.columns = [3];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [3],
                count: {},
                currentIndex: 5,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [30, 31, 32, 33, 35],
                columns: [3],
                count: {},
                currentIndex: 5,
                currentType: "row",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [3],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: 3,
                currentType: "column",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        xit("knows to try again if a change has been made", () => {
            stepManager.setUp();
            const rows = stepManager.state.multiGroup.rows;
            const columns = stepManager.state.multiGroup.columns;
            const newStepManager = new StepManager(board);
            newStepManager.state.madeAChange = true;
            newStepManager.takeStep();
            expect(newStepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [0, 1, 2, 3, 4, 5],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [0, 1, 2, 3, 4, 5],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        xit("knows to stop if no change has been made", () => {
            stepManager.state.madeAChange = false;
            stepManager.takeStep();
            expect(stepManager.state.multiGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertValue: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });
    });

    xdescribe("flags", () => {
        it("knows the flags no step", () => {
            stepManager.state.multiGroup.currentPair = [];
            stepManager.state.multiGroup.checkEmpty = [];
            stepManager.state.multiGroup.insertOpposite = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual(undefined);
            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(3)).toEqual(undefined);
            expect(stepManager.flag(4)).toEqual(undefined);
        });

        it("knows the flags when on current pair", () => {
            stepManager.state.multiGroup.currentPair = [1, 2];
            stepManager.state.multiGroup.checkEmpty = [];
            stepManager.state.multiGroup.insertOpposite = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual(undefined);
            expect(stepManager.flag(4)).toEqual(undefined);
        });

        it("knows the flags when check empty", () => {
            stepManager.state.multiGroup.currentPair = [1, 2];
            stepManager.state.multiGroup.checkEmpty = [0, 3];
            stepManager.state.multiGroup.insertOpposite = [];

            expect(stepManager.flag(0)).toEqual("compare");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("compare");
            expect(stepManager.flag(4)).toEqual(undefined);
        });

        it("knows the flags on insert", () => {
            stepManager.state.multiGroup.currentPair = [1, 2];
            stepManager.state.multiGroup.checkEmpty = [0, 3];
            stepManager.state.multiGroup.insertOpposite = [0];

            expect(stepManager.flag(0)).toEqual("insert");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("compare");
            expect(stepManager.flag(4)).toEqual(undefined);
        });
    });
});
