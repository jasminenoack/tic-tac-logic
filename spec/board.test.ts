import { Board } from "../src/board";
import { Spot } from "../src/spot";

describe("board", () => {
    let height;
    let width;
    let xs;
    let os;
    let board;

    beforeEach(() => {
        height = 6;
        width = 6;
        xs = [
            [0, 1],
            [0, 2],
            [2, 0],
            [4, 1],
        ];
        os = [
            [1, 5],
            [2, 3],
            [3, 1],
            [4, 4],
            [5, 4],
        ];
        board = new Board(width, height, xs, os);
    });

    describe("create", () => {
        it("creates a board", () => {
            expect(board).toBeTruthy();
        });

        it("creates spots for the board", () => {
            expect(board.spots[0] instanceof Spot).toBeTruthy();
        });

        it("sets the values on the board", () => {
            expect(board.value(0)).toBeFalsy();
            expect(board.value(1)).toEqual("X");
            expect(board.value(2)).toEqual("X");
            expect(board.value(3)).toBeFalsy();
            expect(board.value(4)).toBeFalsy();
            expect(board.value(5)).toBeFalsy();

            expect(board.value(6)).toBeFalsy();
            expect(board.value(7)).toBeFalsy();
            expect(board.value(8)).toBeFalsy();
            expect(board.value(9)).toBeFalsy();
            expect(board.value(10)).toBeFalsy();
            expect(board.value(11)).toEqual("O");

            expect(board.value(12)).toEqual("X");
            expect(board.value(13)).toBeFalsy();
            expect(board.value(14)).toBeFalsy();
            expect(board.value(15)).toEqual("O");
            expect(board.value(16)).toBeFalsy();
            expect(board.value(17)).toBeFalsy();

            expect(board.value(18)).toBeFalsy();
            expect(board.value(19)).toEqual("O");
            expect(board.value(20)).toBeFalsy();
            expect(board.value(21)).toBeFalsy();
            expect(board.value(22)).toBeFalsy();
            expect(board.value(23)).toBeFalsy();

            expect(board.value(24)).toBeFalsy();
            expect(board.value(25)).toEqual("X");
            expect(board.value(26)).toBeFalsy();
            expect(board.value(27)).toBeFalsy();
            expect(board.value(28)).toEqual("O");
            expect(board.value(29)).toBeFalsy();

            expect(board.value(30)).toBeFalsy();
            expect(board.value(31)).toBeFalsy();
            expect(board.value(32)).toBeFalsy();
            expect(board.value(33)).toBeFalsy();
            expect(board.value(34)).toEqual("O");
            expect(board.value(35)).toBeFalsy();
        });

        it("creates a 4 * 5 board", () => {
            height = 4;
            width = 5;
            xs = [
                [0, 0],
                [1, 3],
                [1, 4],
                [3, 4],
            ];
            os = [
                [0, 1],
                [2, 3],
                [3, 1],
            ];
            board = new Board(width, height, xs, os);

            expect(board.value(0)).toEqual("X");
            expect(board.value(1)).toEqual("O");
            expect(board.value(2)).toBeFalsy();
            expect(board.value(3)).toBeFalsy();
            expect(board.value(4)).toBeFalsy();

            expect(board.value(5)).toBeFalsy();
            expect(board.value(6)).toBeFalsy();
            expect(board.value(7)).toBeFalsy();
            expect(board.value(8)).toEqual("X");
            expect(board.value(9)).toEqual("X");

            expect(board.value(10)).toBeFalsy();
            expect(board.value(11)).toBeFalsy();
            expect(board.value(12)).toBeFalsy();
            expect(board.value(13)).toEqual("O");
            expect(board.value(14)).toBeFalsy();

            expect(board.value(15)).toBeFalsy();
            expect(board.value(16)).toEqual("O");
            expect(board.value(17)).toBeFalsy();
            expect(board.value(18)).toBeFalsy();
            expect(board.value(19)).toEqual("X");
        });

        it("sets the width and height of the board", () => {
            expect(board.width).toEqual(6);
            expect(board.height).toEqual(6);
        });
    });

    it("sets a board", () => {
        board.setSpot("O", 0);
        expect(board.value(0)).toEqual("O");
        board.setSpot("X", 8);
        expect(board.value(8)).toEqual("X");
        board.setSpot("O", 13);
        expect(board.value(13)).toEqual("O");
        board.setSpot("X", 30);
        expect(board.value(30)).toEqual("X");
    });

    it("gets row counts", () => {
        expect(board.getRowCounts()).toEqual([
            { x: 2, o: 0 },
            { x: 0, o: 1 },
            { x: 1, o: 1 },
            { x: 0, o: 1 },
            { x: 1, o: 1 },
            { x: 0, o: 1 },
        ]);
    });

    it("gets column counts", () => {
        expect(board.getColumnCounts()).toEqual([
            { x: 1, o: 0 },
            { x: 2, o: 1 },
            { x: 1, o: 0 },
            { x: 0, o: 1 },
            { x: 0, o: 2 },
            { x: 0, o: 1 },
        ]);
    });
});
