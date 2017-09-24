import { Board } from "../src/board";
import { StepManager } from "../src/stepManager";

describe("StepManager group", () => {
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
            expect(stepManager.state.group).toEqual({
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
        });
    });

    describe("set up", () => {
        it("sets up the new state for the board", () => {
            stepManager.setUp();
            expect(stepManager.state.group).toEqual({
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
    });

    it("handles no blanks", () => {
        board.setSpot("O", 4);
        board.setSpot("X", 5);
        stepManager.state.group.rows = [0, 1];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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

        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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

        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
            blanks: [],
            columns: [],
            count: {},
            currentIndex: 1,
            currentType: "row",
            insertValue: [],
            mainValue: "",
            neighbors: [],
            rows: [],
        });
        expect(stepManager.state.madeAChange).toEqual(false);
    });

    it("handles rows with blanks in a row but bad counts", () => {
        stepManager.state.group.rows = [0, 1];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("handles blanks not in order", () => {
        stepManager.state.group.rows = [1, 2];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        board.setSpot("X", 8);
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("handles with blanks, good counts, but right neighbors", () => {
        stepManager.state.group.columns = [3, 4];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("handles that is actually going to work without neighbors", () => {
        stepManager.state.madeAChange = false;
        board.setSpot("O", 5);
        stepManager.state.group.columns = [5];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("handles a that is actually going to work with neighbors", () => {
        stepManager.state.madeAChange = false;
        stepManager.state.group.columns = [4];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("handles a that is actually going to work with top neighbors", () => {
        stepManager.state.madeAChange = false;
        board.setSpot("O", 5);
        board.setSpot("X", 17);
        stepManager.state.group.columns = [5];
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("handles a row with no other values", () => {
        stepManager.state.madeAChange = false;
        board.setSpot("X", 5);
        stepManager.state.group.rows = [0];
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("switches from rows to columns", () => {
        stepManager.state.group.rows = [5];
        stepManager.state.group.columns = [3];
        stepManager.state.madeAChange = false;

        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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
        expect(stepManager.state.group).toEqual({
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

    it("knows to try again if a change has been made", () => {
        stepManager.setUp();
        const rows = stepManager.state.group.rows;
        const columns = stepManager.state.group.columns;
        const newStepManager = new StepManager(board);
        newStepManager.state.madeAChange = true;
        newStepManager.takeStep();
        expect(newStepManager.state.group).toEqual({
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

    it("knows to stop if no change has been made", () => {
        stepManager.state.madeAChange = false;
        stepManager.takeStep();
        expect(stepManager.state.group).toEqual({
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

    describe("flags", () => {
        it("knows the flags no step", () => {
            stepManager.state.group.currentIndex = null;
            stepManager.state.group.blanks = [];
            stepManager.state.group.currentType = "";
            stepManager.state.group.neighbors = [];
            stepManager.state.group.insertValue = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual(undefined);
            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(3)).toEqual(undefined);
            expect(stepManager.flag(4)).toEqual(undefined);
            expect(stepManager.flag(5)).toEqual(undefined);
        });

        it("knows the current row", () => {
            stepManager.state.group.currentIndex = 0;
            stepManager.state.group.blanks = [];
            stepManager.state.group.currentType = "row";
            stepManager.state.group.neighbors = [];
            stepManager.state.group.insertValue = [];

            expect(stepManager.flag(0)).toEqual("current");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual("current");
            expect(stepManager.flag(5)).toEqual("current");
        });

        it("knows the blanks", () => {
            stepManager.state.group.currentIndex = 0;
            stepManager.state.group.blanks = [1, 2, 3];
            stepManager.state.group.currentType = "row";
            stepManager.state.group.neighbors = [];
            stepManager.state.group.insertValue = [];

            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual(undefined);
            expect(stepManager.flag(5)).toEqual(undefined);
        });

        it("knows the neighbors", () => {
            stepManager.state.group.currentIndex = 0;
            stepManager.state.group.blanks = [1, 2, 3];
            stepManager.state.group.currentType = "row";
            stepManager.state.group.neighbors = [0, 4];
            stepManager.state.group.insertValue = [];

            expect(stepManager.flag(0)).toEqual("compare");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual("compare");
            expect(stepManager.flag(5)).toEqual(undefined);
        });

        it("knows the flags on insert", () => {
            stepManager.state.group.currentIndex = 0;
            stepManager.state.group.blanks = [1, 2, 3];
            stepManager.state.group.currentType = "row";
            stepManager.state.group.neighbors = [0, 4];
            stepManager.state.group.insertValue = [0];

            expect(stepManager.flag(0)).toEqual("insert");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual("compare");
            expect(stepManager.flag(5)).toEqual(undefined);
        });
    });
});
