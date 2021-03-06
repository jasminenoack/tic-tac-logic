import { Board } from "../src/board";
import { StepManager } from "../src/stepManager";

describe("StepManager one group", () => {
    let stepManager;
    let board;
    beforeEach(() => {
        const height = 6;
        const width = 6;
        const xs = [
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 0],
            [3, 4],
            [4, 2],
        ];
        const os = [
            [0, 0],
            [0, 3],
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
            expect(stepManager.state.oneGroup).toEqual({
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertInto: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            });
            expect(stepManager.state.madeAChange).toEqual(true);
        });
    });

    describe("set up", () => {
        it("sets up the new state for the board", () => {
            stepManager.setUp();
            expect(stepManager.state.oneGroup).toEqual({
                blanks: [],
                columns: [0, 1, 2, 3, 4, 5],
                count: {},
                currentIndex: null,
                currentType: "",
                insertInto: [],
                mainValue: "",
                neighbors: [],
                rows: [0, 1, 2, 3, 4, 5],
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });
    });

    it("handles no blanks", () => {
        board.setSpot("O", 4);
        board.setSpot("X", 5);
        stepManager.state.oneGroup.rows = [0, 1];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 1,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("handles rows with blanks in a row but bad counts", () => {
        stepManager.state.oneGroup.rows = [0, 1];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [1],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        // find the blanks
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [4, 5],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [1],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        // if counts are not 1 and > 1 give up;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [1],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("handles blanks not in order", () => {
        stepManager.state.oneGroup.rows = [1, 2];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        board.setSpot("X", 8);
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 1,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [2],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [6, 7, 10],
            columns: [],
            count: {},
            currentIndex: 1,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [2],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [2],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("handles with blanks, good counts, but right neighbors", () => {
        stepManager.state.oneGroup.columns = [3, 4];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [4],
            count: {},
            currentIndex: 3,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [21, 27, 33],
            columns: [4],
            count: {},
            currentIndex: 3,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        // sets counts and blanks, finds neighbor to compare
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [21, 27, 33],
            columns: [4],
            count: { o: 1, x: 2 },
            currentIndex: 3,
            currentType: "column",
            insertInto: [],
            mainValue: "X",
            neighbors: [15],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        // if numbers fail then it's over
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [4],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("handles that is actually going to work without neighbors", () => {
        stepManager.state.madeAChange = false;
        board.setSpot("O", 5);
        stepManager.state.oneGroup.columns = [5];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 5,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [17, 23, 29, 35],
            columns: [],
            count: {},
            currentIndex: 5,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [17, 23, 29, 35],
            columns: [],
            count: { x: 3, o: 1 },
            currentIndex: 5,
            currentType: "column",
            insertInto: [],
            mainValue: "X",
            neighbors: [11],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [17, 23, 29, 35],
            columns: [],
            count: { x: 3, o: 1 },
            currentIndex: 5,
            currentType: "column",
            insertInto: [17, 35],
            mainValue: "X",
            neighbors: [11],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(17)).toEqual("X");
        expect(board.value(35)).toEqual("X");
    });

    it("handles a that is actually going to work with neighbors", () => {
        stepManager.state.madeAChange = false;
        stepManager.state.oneGroup.columns = [4];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 4,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [4, 10, 16],
            columns: [],
            count: {},
            currentIndex: 4,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [4, 10, 16],
            columns: [],
            count: { x: 2, o: 1 },
            currentIndex: 4,
            currentType: "column",
            insertInto: [],
            mainValue: "X",
            neighbors: [22],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [4, 10, 16],
            columns: [],
            count: { x: 2, o: 1 },
            currentIndex: 4,
            currentType: "column",
            insertInto: [4],
            mainValue: "X",
            neighbors: [22],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(22)).toEqual("X");
    });

    it("handles a that is actually going to work with top neighbors", () => {
        stepManager.state.madeAChange = false;
        board.setSpot("O", 5);
        board.setSpot("X", 17);
        stepManager.state.oneGroup.columns = [5];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 5,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [23, 29, 35],
            columns: [],
            count: {},
            currentIndex: 5,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [23, 29, 35],
            columns: [],
            count: { x: 2, o: 1 },
            currentIndex: 5,
            currentType: "column",
            insertInto: [],
            mainValue: "X",
            neighbors: [17],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [23, 29, 35],
            columns: [],
            count: { x: 2, o: 1 },
            currentIndex: 5,
            currentType: "column",
            insertInto: [35],
            mainValue: "X",
            neighbors: [17],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(35)).toEqual("X");
    });

    it("handles a row with no other values", () => {
        stepManager.state.madeAChange = false;
        board.setSpot("X", 5);
        stepManager.state.oneGroup.rows = [0];
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [4],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [4],
            columns: [],
            count: { o: 1, x: 0 },
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "O",
            neighbors: [3, 5],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [4],
            columns: [],
            count: { o: 1, x: 0 },
            currentIndex: 0,
            currentType: "row",
            insertInto: [4],
            mainValue: "O",
            neighbors: [3, 5],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(true);
        expect(board.value(4)).toEqual("O");
    });

    it("switches from rows to columns", () => {
        stepManager.state.oneGroup.rows = [5];
        stepManager.state.oneGroup.columns = [3];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [3],
            count: {},
            currentIndex: 5,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [30, 31, 32, 33, 35],
            columns: [3],
            count: {},
            currentIndex: 5,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [3],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 3,
            currentType: "column",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("knows to try again if a change has been made", () => {
        stepManager.setUp();
        const rows = stepManager.state.oneGroup.rows;
        const columns = stepManager.state.oneGroup.columns;
        const newStepManager = new StepManager(board);
        newStepManager.state.madeAChange = true;
        newStepManager.takeStep();
        expect(newStepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [0, 1, 2, 3, 4, 5],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [0, 1, 2, 3, 4, 5],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("knows to stop if no change has been made", () => {
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("doesn't have a bug", () => {
        const height = 10;
        const width = 8;
        const xs = [
            [0, 2],
            [0, 5],
        ];
        const os = [
            [0, 0],
            [0, 1],
            [0, 4],
        ];
        board = new Board(width, height, xs, os);
        stepManager = new StepManager(board);
        stepManager.state.oneGroup.rows = [0];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [3, 6, 7],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: null,
            currentType: "",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("handles fiver", () => {
        const height = 10;
        const width = 8;
        const xs = [
            [0, 0],
            [0, 1],
            [0, 7],
        ];
        const os = [
            [0, 2],
            [0, 6],
        ];
        board = new Board(width, height, xs, os);
        stepManager = new StepManager(board);
        stepManager.state.oneGroup.rows = [0];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [3, 4, 5],
            columns: [],
            count: {},
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [3, 4, 5],
            columns: [],
            count: { o: 2, x: 1 },
            currentIndex: 0,
            currentType: "row",
            insertInto: [],
            mainValue: "O",
            neighbors: [2, 6],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);

        stepManager.takeStep();
        expect(stepManager.state.oneGroup).toEqual({
            blanks: [3, 4, 5],
            columns: [],
            count: { o: 2, x: 1 },
            currentIndex: 0,
            currentType: "row",
            insertInto: [5, 3],
            mainValue: "O",
            neighbors: [2, 6],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    describe("flags", () => {
        it("knows the flags no step", () => {
            stepManager.state.oneGroup.currentIndex = null;
            stepManager.state.oneGroup.blanks = [];
            stepManager.state.oneGroup.currentType = "";
            stepManager.state.oneGroup.neighbors = [];
            stepManager.state.oneGroup.insertInto = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual(undefined);
            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(3)).toEqual(undefined);
            expect(stepManager.flag(4)).toEqual(undefined);
            expect(stepManager.flag(5)).toEqual(undefined);
        });

        it("knows the current row", () => {
            stepManager.state.oneGroup.currentIndex = 0;
            stepManager.state.oneGroup.blanks = [];
            stepManager.state.oneGroup.currentType = "row";
            stepManager.state.oneGroup.neighbors = [];
            stepManager.state.oneGroup.insertInto = [];

            expect(stepManager.flag(0)).toEqual("current");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual("current");
            expect(stepManager.flag(5)).toEqual("current");
        });

        it("knows the blanks", () => {
            stepManager.state.oneGroup.currentIndex = 0;
            stepManager.state.oneGroup.blanks = [1, 2, 3];
            stepManager.state.oneGroup.currentType = "row";
            stepManager.state.oneGroup.neighbors = [];
            stepManager.state.oneGroup.insertInto = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual(undefined);
            expect(stepManager.flag(5)).toEqual(undefined);
        });

        it("knows the neighbors", () => {
            stepManager.state.oneGroup.currentIndex = 0;
            stepManager.state.oneGroup.blanks = [1, 2, 3];
            stepManager.state.oneGroup.currentType = "row";
            stepManager.state.oneGroup.neighbors = [0, 4];
            stepManager.state.oneGroup.insertInto = [];

            expect(stepManager.flag(0)).toEqual("compare");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual("compare");
            expect(stepManager.flag(5)).toEqual(undefined);
        });

        it("knows the flags on insert", () => {
            stepManager.state.oneGroup.currentIndex = 0;
            stepManager.state.oneGroup.blanks = [1, 2, 3];
            stepManager.state.oneGroup.currentType = "row";
            stepManager.state.oneGroup.neighbors = [0, 4];
            stepManager.state.oneGroup.insertInto = [0];

            expect(stepManager.flag(0)).toEqual("insert");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual("compare");
            expect(stepManager.flag(5)).toEqual(undefined);
        });
    });
});
