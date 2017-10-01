import { Board } from "../src/board";
import { ComparisonManager } from "../src/comparisonManager";
import { StepManager } from "../src/stepManager";

describe("StepManager multi group", () => {
    let stepManager;
    let board;
    beforeEach(() => {
        const height = 6;
        const width = 6;
        const os = [
            [0, 1],
            [0, 3],
            [0, 5],
            [1, 0],
            [1, 3],
            [2, 1],
            [3, 0],
            [3, 4],
            [3, 5],
            [4, 0],
            [4, 4],
            [4, 5],
            [5, 1],
            [5, 2],
        ];
        const xs = [
            [1, 1],
            [1, 4],
            [1, 5],
            [2, 0],
            [2, 2],
            [2, 3],
            [2, 5],
            [3, 1],
            [4, 1],
            [4, 3],
            [5, 0],
            [5, 4],
            [5, 5],
        ];
        // - X - O - O
        // O X - O X X
        // X O X X - X
        // O X - - O O
        // O X - X O O
        // X O O - X X
        board = new Board(width, height, xs, os);
        stepManager = new StepManager(board);
    });

    describe("create", () => {
        it("has a state object", () => {
            expect(stepManager.state.compareSections).toEqual({
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
            });
            expect(stepManager.state.madeAChange).toEqual(true);
        });
    });

    describe("set up", () => {
        it("sets up the new state for the board", () => {
            stepManager.setUp();
            expect(stepManager.state.compareSections).toEqual({
                columns: [
                    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
                    [1, 2], [1, 3], [1, 4], [1, 5],
                    [2, 3], [2, 4], [2, 5],
                    [3, 4], [3, 5],
                    [4, 5],
                ],
                compareFirst: [],
                compareSecond: [],
                first: null,
                firstCount: {},
                insertPatterns: [],
                rows: [
                    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
                    [1, 2], [1, 3], [1, 4], [1, 5],
                    [2, 3], [2, 4], [2, 5],
                    [3, 4], [3, 5],
                    [4, 5],
                ],
                second: null,
                secondCount: {},
                type: "",
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });
    });

    describe("take steps", () => {
        // - X - O - O
        // O X - O X X
        // X O X X - X
        // O X - - O O
        // O X - X O O
        // X O O - X X

        it("skips if both full", () => {
            stepManager.state.compareSections.columns = [[1, 5], [0, 4]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: 0,
                firstCount: { o: 0, x: 1 },
                insertPatterns: [],
                rows: [],
                second: 4,
                secondCount: { o: 1, x: 1 },
                type: "column",
            });
        });

        it("skips if both don't have any with less than one left", () => {
            stepManager.state.compareSections.columns = [[2, 3], [0, 4]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: 0,
                firstCount: { o: 0, x: 1 },
                insertPatterns: [],
                rows: [],
                second: 4,
                secondCount: { o: 1, x: 1 },
                type: "column",
            });
        });

        it("skips if either don't have any with less than one left", () => {
            stepManager.state.compareSections.columns = [[0, 2], [0, 4]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: 0,
                firstCount: { o: 0, x: 1 },
                insertPatterns: [],
                rows: [],
                second: 4,
                secondCount: { o: 1, x: 1 },
                type: "column",
            });
        });

        it("handles the last is skipable", () => {
            const height = 6;
            const width = 6;
            const os = [];
            const xs = [];
            board = new Board(width, height, xs, os);
            stepManager = new StepManager(board);
            stepManager.state.compareSections.columns = [[0, 2]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
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
            });
        });

        it("handles already diff", () => {
            stepManager.state.compareSections.columns = [[0, 4]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: 0,
                firstCount: { o: 0, x: 1 },
                insertPatterns: [],
                rows: [],
                second: 4,
                secondCount: { o: 1, x: 1 },
                type: "column",
            });

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
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
            });
        });

        it("skips if neither has left 0", () => {
            stepManager.state.compareSections.columns = [[3, 4]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: 3,
                firstCount: { o: 1, x: 1 },
                insertPatterns: [],
                rows: [],
                second: 4,
                secondCount: { o: 1, x: 1 },
                type: "column",
            });

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
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
            });
        });

        it("ends if not matching values", () => {
            // X X X - - -
            // - - - - O O
            // - - - - - -
            // - - - - - -
            // - - - - - -
            // - - - - - -
            const height = 6;
            const width = 6;
            const os = [
                [1, 4],
                [1, 5],
            ];
            const xs = [
                [0, 0],
                [0, 1],
                [0, 2],
            ];
            board = new Board(width, height, xs, os);
            stepManager = new StepManager(board);

            stepManager.state.compareSections.rows = [[0, 1]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: 0,
                firstCount: { o: 3, x: 0 },
                insertPatterns: [],
                rows: [],
                second: 1,
                secondCount: { o: 1, x: 3 },
                type: "row",
            });

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
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
            });
            expect(stepManager.state.madeAChange).toEqual(false);
        });

        describe("places matches", () => {
            it("x", () => {
                // X - X X - -
                // X - X - - -
                // - - - - - -
                // - - - - - -
                // - - - - - -
                // - - - - - -
                const height = 6;
                const width = 6;
                const os = [
                ];
                const xs = [
                    [0, 0],
                    [0, 2],
                    [0, 3],

                    [1, 0],
                    [1, 2],
                ];
                board = new Board(width, height, xs, os);
                stepManager = new StepManager(board);

                stepManager.state.compareSections.rows = [[0, 1]];
                stepManager.state.madeAChange = false;

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
                    columns: [],
                    compareFirst: [],
                    compareSecond: [],
                    first: 0,
                    firstCount: { o: 3, x: 0 },
                    insertPatterns: [],
                    rows: [],
                    second: 1,
                    secondCount: { o: 3, x: 1 },
                    type: "row",
                });

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
                    columns: [],
                    compareFirst: [],
                    compareSecond: [],
                    first: 0,
                    firstCount: { o: 3, x: 0 },
                    insertPatterns: [{ index: 9, value: "O" }],
                    rows: [],
                    second: 1,
                    secondCount: { o: 3, x: 1 },
                    type: "row",
                });
                expect(stepManager.state.madeAChange).toEqual(false);

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
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
                });
                expect(stepManager.state.madeAChange).toEqual(true);
                expect(board.value(9)).toEqual("O");
            });

            it("o", () => {
                // O - O - - -
                // O - O O - -
                // - - - - - -
                // - - - - - -
                // - - - - - -
                // - - - - - -
                const height = 6;
                const width = 6;
                const os = [
                    [0, 0],
                    [0, 2],

                    [1, 0],
                    [1, 2],
                    [1, 3],
                ];
                const xs = [
                ];
                board = new Board(width, height, xs, os);
                stepManager = new StepManager(board);

                stepManager.state.compareSections.rows = [[0, 1]];
                stepManager.state.madeAChange = false;

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
                    columns: [],
                    compareFirst: [],
                    compareSecond: [],
                    first: 0,
                    firstCount: { o: 1, x: 3 },
                    insertPatterns: [],
                    rows: [],
                    second: 1,
                    secondCount: { o: 0, x: 3 },
                    type: "row",
                });

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
                    columns: [],
                    compareFirst: [],
                    compareSecond: [],
                    first: 0,
                    firstCount: { o: 1, x: 3 },
                    insertPatterns: [{ index: 3, value: "X" }],
                    rows: [],
                    second: 1,
                    secondCount: { o: 0, x: 3 },
                    type: "row",
                });
                expect(stepManager.state.madeAChange).toEqual(false);

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
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
                });
                expect(stepManager.state.madeAChange).toEqual(true);
                expect(board.value(3)).toEqual("X");
            });

            it("both available", () => {
                // O - O - X X
                // O X O O X X
                // - - - - - -
                // - - - - - -
                // - - - - - -
                // - - - - - -
                const height = 6;
                const width = 6;
                const os = [
                    [0, 0],
                    [0, 2],

                    [1, 0],
                    [1, 2],
                    [1, 3],
                ];
                const xs = [
                    [0, 4],
                    [0, 5],

                    [1, 1],
                    [1, 4],
                    [1, 5],
                ];
                board = new Board(width, height, xs, os);
                stepManager = new StepManager(board);

                stepManager.state.compareSections.rows = [[0, 1]];
                stepManager.state.madeAChange = false;

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
                    columns: [],
                    compareFirst: [],
                    compareSecond: [],
                    first: 0,
                    firstCount: { o: 1, x: 1 },
                    insertPatterns: [],
                    rows: [],
                    second: 1,
                    secondCount: { o: 0, x: 0 },
                    type: "row",
                });

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
                    columns: [],
                    compareFirst: [],
                    compareSecond: [],
                    first: 0,
                    firstCount: { o: 1, x: 1 },
                    insertPatterns: [
                        { index: 1, value: "O" },
                        { index: 3, value: "X" },
                    ],
                    rows: [],
                    second: 1,
                    secondCount: { o: 0, x: 0 },
                    type: "row",
                });
                expect(stepManager.state.madeAChange).toEqual(false);

                stepManager.takeStep();
                expect(stepManager.state.compareSections).toEqual({
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
                });
                expect(stepManager.state.madeAChange).toEqual(true);
                expect(board.value(3)).toEqual("X");
                expect(board.value(1)).toEqual("O");
            });
        });

        it("does not place if it's not actually a match", () => {
            // X X - - X -
            // - X - X - -
            // - - - - - -
            // - - - - - -
            // - - - - - -
            // - - - - - -
            const height = 6;
            const width = 6;
            const os = [
            ];
            const xs = [
                [0, 0],
                [0, 1],
                [0, 4],
                [1, 1],
                [1, 3],
            ];
            board = new Board(width, height, xs, os);
            stepManager = new StepManager(board);

            stepManager.state.compareSections.rows = [[0, 1]];
            stepManager.state.madeAChange = false;

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: 0,
                firstCount: { o: 3, x: 0 },
                insertPatterns: [],
                rows: [],
                second: 1,
                secondCount: { o: 3, x: 1 },
                type: "row",
            });

            stepManager.takeStep();
            expect(stepManager.state.compareSections).toEqual({
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
            });
        });
    });

    describe("flags", () => {
        it("knows the flags no step", () => {
            stepManager.state.compareSections.first = null;
            stepManager.state.compareSections.second = null;
            stepManager.state.compareSections.type = "";
            stepManager.state.compareSections.insertPatterns = [];
            expect(stepManager.flag(0)).toEqual(undefined);
            expect(stepManager.flag(1)).toEqual(undefined);
            expect(stepManager.flag(2)).toEqual(undefined);
            expect(stepManager.flag(3)).toEqual(undefined);
            expect(stepManager.flag(4)).toEqual(undefined);
            expect(stepManager.flag(5)).toEqual(undefined);

            expect(stepManager.flag(6)).toEqual(undefined);
            expect(stepManager.flag(7)).toEqual(undefined);
            expect(stepManager.flag(8)).toEqual(undefined);
            expect(stepManager.flag(9)).toEqual(undefined);
            expect(stepManager.flag(10)).toEqual(undefined);
            expect(stepManager.flag(11)).toEqual(undefined);

            expect(stepManager.flag(12)).toEqual(undefined);
            expect(stepManager.flag(13)).toEqual(undefined);
            expect(stepManager.flag(14)).toEqual(undefined);
            expect(stepManager.flag(15)).toEqual(undefined);
            expect(stepManager.flag(16)).toEqual(undefined);
            expect(stepManager.flag(17)).toEqual(undefined);
        });

        it("knows the current row", () => {
            stepManager.state.compareSections.first = 0;
            stepManager.state.compareSections.second = 2;
            stepManager.state.compareSections.type = "row";
            stepManager.state.compareSections.insertPatterns = [];
            expect(stepManager.flag(0)).toEqual("current");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("current");
            expect(stepManager.flag(4)).toEqual("current");
            expect(stepManager.flag(5)).toEqual("current");

            expect(stepManager.flag(6)).toEqual(undefined);
            expect(stepManager.flag(7)).toEqual(undefined);
            expect(stepManager.flag(8)).toEqual(undefined);
            expect(stepManager.flag(9)).toEqual(undefined);
            expect(stepManager.flag(10)).toEqual(undefined);
            expect(stepManager.flag(11)).toEqual(undefined);

            expect(stepManager.flag(12)).toEqual("compare");
            expect(stepManager.flag(13)).toEqual("compare");
            expect(stepManager.flag(14)).toEqual("compare");
            expect(stepManager.flag(15)).toEqual("compare");
            expect(stepManager.flag(16)).toEqual("compare");
            expect(stepManager.flag(17)).toEqual("compare");
        });

        it("knows the flags on insert", () => {
            stepManager.state.compareSections.first = 0;
            stepManager.state.compareSections.second = 2;
            stepManager.state.compareSections.type = "row";
            stepManager.state.compareSections.insertPatterns = [
                { index: 3, value: "O" },
                { index: 5, value: "X" },
            ];
            expect(stepManager.flag(0)).toEqual("current");
            expect(stepManager.flag(1)).toEqual("current");
            expect(stepManager.flag(2)).toEqual("current");
            expect(stepManager.flag(3)).toEqual("insert");
            expect(stepManager.flag(4)).toEqual("current");
            expect(stepManager.flag(5)).toEqual("insert");

            expect(stepManager.flag(6)).toEqual(undefined);
            expect(stepManager.flag(7)).toEqual(undefined);
            expect(stepManager.flag(8)).toEqual(undefined);
            expect(stepManager.flag(9)).toEqual(undefined);
            expect(stepManager.flag(10)).toEqual(undefined);
            expect(stepManager.flag(11)).toEqual(undefined);

            expect(stepManager.flag(12)).toEqual("compare");
            expect(stepManager.flag(13)).toEqual("compare");
            expect(stepManager.flag(14)).toEqual("compare");
            expect(stepManager.flag(15)).toEqual("compare");
            expect(stepManager.flag(16)).toEqual("compare");
            expect(stepManager.flag(17)).toEqual("compare");
        });
    });
});
