import { Board } from "../src/board";
import { IndexManager } from "../src/indexManager";

describe("IndexManager", () => {
    describe("find indexes for rows", () => {
        it("6 * 6", () => {
            expect(IndexManager.getRowIndexes(0, 6)).toEqual([0, 1, 2, 3, 4, 5]);
            expect(IndexManager.getRowIndexes(1, 6)).toEqual([6, 7, 8, 9, 10, 11]);
            expect(IndexManager.getRowIndexes(2, 6)).toEqual([12, 13, 14, 15, 16, 17]);
            expect(IndexManager.getRowIndexes(3, 6)).toEqual([18, 19, 20, 21, 22, 23]);
            expect(IndexManager.getRowIndexes(4, 6)).toEqual([24, 25, 26, 27, 28, 29]);
            expect(IndexManager.getRowIndexes(5, 6)).toEqual([30, 31, 32, 33, 34, 35]);
        });

        it("4 * 4", () => {
            expect(IndexManager.getRowIndexes(0, 4)).toEqual([0, 1, 2, 3]);
            expect(IndexManager.getRowIndexes(1, 4)).toEqual([4, 5, 6, 7]);
            expect(IndexManager.getRowIndexes(2, 4)).toEqual([8, 9, 10, 11]);
            expect(IndexManager.getRowIndexes(3, 4)).toEqual([12, 13, 14, 15]);
        });
    });

    describe("finds indexes for columns", () => {
        it("6 * 6", () => {
            expect(IndexManager.getColumnIndexes(0, 6, 6)).toEqual([0, 6, 12, 18, 24, 30]);
            expect(IndexManager.getColumnIndexes(1, 6, 6)).toEqual([1, 7, 13, 19, 25, 31]);
            expect(IndexManager.getColumnIndexes(2, 6, 6)).toEqual([2, 8, 14, 20, 26, 32]);
            expect(IndexManager.getColumnIndexes(3, 6, 6)).toEqual([3, 9, 15, 21, 27, 33]);
            expect(IndexManager.getColumnIndexes(4, 6, 6)).toEqual([4, 10, 16, 22, 28, 34]);
            expect(IndexManager.getColumnIndexes(5, 6, 6)).toEqual([5, 11, 17, 23, 29, 35]);
        });

        it("4 * 4", () => {
            expect(IndexManager.getColumnIndexes(0, 4, 4)).toEqual([0, 4, 8, 12]);
            expect(IndexManager.getColumnIndexes(1, 4, 4)).toEqual([1, 5, 9, 13]);
            expect(IndexManager.getColumnIndexes(2, 4, 4)).toEqual([2, 6, 10, 14]);
            expect(IndexManager.getColumnIndexes(3, 4, 4)).toEqual([3, 7, 11, 15]);
        });

        it("6 * 4", () => {
            expect(IndexManager.getColumnIndexes(0, 4, 6)).toEqual([0, 4, 8, 12, 16, 20]);
            expect(IndexManager.getColumnIndexes(1, 4, 6)).toEqual([1, 5, 9, 13, 17, 21]);
            expect(IndexManager.getColumnIndexes(2, 4, 6)).toEqual([2, 6, 10, 14, 18, 22]);
            expect(IndexManager.getColumnIndexes(3, 4, 6)).toEqual([3, 7, 11, 15, 19, 23]);
        });
    });

    describe("finds the index location for a row column combination", () => {
        it("6 * 6", () => {
            expect(IndexManager.findIndex(0, 0, 6)).toEqual(0);
            expect(IndexManager.findIndex(0, 1, 6)).toEqual(1);
            expect(IndexManager.findIndex(0, 2, 6)).toEqual(2);
            expect(IndexManager.findIndex(0, 3, 6)).toEqual(3);
            expect(IndexManager.findIndex(0, 4, 6)).toEqual(4);
            expect(IndexManager.findIndex(0, 5, 6)).toEqual(5);

            expect(IndexManager.findIndex(1, 0, 6)).toEqual(6);
            expect(IndexManager.findIndex(1, 1, 6)).toEqual(7);
            expect(IndexManager.findIndex(1, 2, 6)).toEqual(8);
            expect(IndexManager.findIndex(1, 3, 6)).toEqual(9);
            expect(IndexManager.findIndex(1, 4, 6)).toEqual(10);
            expect(IndexManager.findIndex(1, 5, 6)).toEqual(11);

            expect(IndexManager.findIndex(2, 0, 6)).toEqual(12);
            expect(IndexManager.findIndex(2, 1, 6)).toEqual(13);
            expect(IndexManager.findIndex(2, 2, 6)).toEqual(14);
            expect(IndexManager.findIndex(2, 3, 6)).toEqual(15);
            expect(IndexManager.findIndex(2, 4, 6)).toEqual(16);
            expect(IndexManager.findIndex(2, 5, 6)).toEqual(17);

            expect(IndexManager.findIndex(3, 0, 6)).toEqual(18);
            expect(IndexManager.findIndex(3, 1, 6)).toEqual(19);
            expect(IndexManager.findIndex(3, 2, 6)).toEqual(20);
            expect(IndexManager.findIndex(3, 3, 6)).toEqual(21);
            expect(IndexManager.findIndex(3, 4, 6)).toEqual(22);
            expect(IndexManager.findIndex(3, 5, 6)).toEqual(23);

            expect(IndexManager.findIndex(4, 0, 6)).toEqual(24);
            expect(IndexManager.findIndex(4, 1, 6)).toEqual(25);
            expect(IndexManager.findIndex(4, 2, 6)).toEqual(26);
            expect(IndexManager.findIndex(4, 3, 6)).toEqual(27);
            expect(IndexManager.findIndex(4, 4, 6)).toEqual(28);
            expect(IndexManager.findIndex(4, 5, 6)).toEqual(29);

            expect(IndexManager.findIndex(5, 0, 6)).toEqual(30);
            expect(IndexManager.findIndex(5, 1, 6)).toEqual(31);
            expect(IndexManager.findIndex(5, 2, 6)).toEqual(32);
            expect(IndexManager.findIndex(5, 3, 6)).toEqual(33);
            expect(IndexManager.findIndex(5, 4, 6)).toEqual(34);
            expect(IndexManager.findIndex(5, 5, 6)).toEqual(35);
        });

        it("4 * 5", () => {
            expect(IndexManager.findIndex(0, 0, 4)).toEqual(0);
            expect(IndexManager.findIndex(0, 1, 4)).toEqual(1);
            expect(IndexManager.findIndex(0, 2, 4)).toEqual(2);
            expect(IndexManager.findIndex(0, 3, 4)).toEqual(3);

            expect(IndexManager.findIndex(1, 0, 4)).toEqual(4);
            expect(IndexManager.findIndex(1, 1, 4)).toEqual(5);
            expect(IndexManager.findIndex(1, 2, 4)).toEqual(6);
            expect(IndexManager.findIndex(1, 3, 4)).toEqual(7);

            expect(IndexManager.findIndex(2, 0, 4)).toEqual(8);
            expect(IndexManager.findIndex(2, 1, 4)).toEqual(9);
            expect(IndexManager.findIndex(2, 2, 4)).toEqual(10);
            expect(IndexManager.findIndex(2, 3, 4)).toEqual(11);

            expect(IndexManager.findIndex(3, 0, 4)).toEqual(12);
            expect(IndexManager.findIndex(3, 1, 4)).toEqual(13);
            expect(IndexManager.findIndex(3, 2, 4)).toEqual(14);
            expect(IndexManager.findIndex(3, 3, 4)).toEqual(15);

            expect(IndexManager.findIndex(4, 0, 4)).toEqual(16);
            expect(IndexManager.findIndex(4, 1, 4)).toEqual(17);
            expect(IndexManager.findIndex(4, 2, 4)).toEqual(18);
            expect(IndexManager.findIndex(4, 3, 4)).toEqual(19);
        });
    });

    describe("gets the consecutive row pairs", () => {
        it("6 * 6", () => {
            expect(IndexManager.getConsecutiveRowPairs(6, 6)).toEqual([
                [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
                [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
                [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
                [18, 19], [19, 20], [20, 21], [21, 22], [22, 23],
                [24, 25], [25, 26], [26, 27], [27, 28], [28, 29],
                [30, 31], [31, 32], [32, 33], [33, 34], [34, 35],
            ]);
        });

        it("4 * 4", () => {
            expect(IndexManager.getConsecutiveRowPairs(4, 4)).toEqual([
                [0, 1], [1, 2], [2, 3],
                [4, 5], [5, 6], [6, 7],
                [8, 9], [9, 10], [10, 11],
                [12, 13], [13, 14], [14, 15],
            ]);
        });

        it("5 * 4", () => {
            expect(IndexManager.getConsecutiveRowPairs(5, 4)).toEqual([
                [0, 1], [1, 2], [2, 3], [3, 4],
                [5, 6], [6, 7], [7, 8], [8, 9],
                [10, 11], [11, 12], [12, 13], [13, 14],
                [15, 16], [16, 17], [17, 18], [18, 19],
            ]);
        });
    });

    describe("gets the consecutive column pairs", () => {
        it("6 * 6", () => {
            expect(IndexManager.getConsecutiveColumnPairs(6, 6)).toEqual([
                [0, 6], [6, 12], [12, 18], [18, 24], [24, 30],
                [1, 7], [7, 13], [13, 19], [19, 25], [25, 31],
                [2, 8], [8, 14], [14, 20], [20, 26], [26, 32],
                [3, 9], [9, 15], [15, 21], [21, 27], [27, 33],
                [4, 10], [10, 16], [16, 22], [22, 28], [28, 34],
                [5, 11], [11, 17], [17, 23], [23, 29], [29, 35],
            ]);
        });

        it("4 * 4", () => {
            expect(IndexManager.getConsecutiveColumnPairs(4, 4)).toEqual([
                [0, 4], [4, 8], [8, 12],
                [1, 5], [5, 9], [9, 13],
                [2, 6], [6, 10], [10, 14],
                [3, 7], [7, 11], [11, 15],
            ]);
        });

        it("5 * 4", () => {
            expect(IndexManager.getConsecutiveColumnPairs(5, 4)).toEqual([
                [0, 5], [5, 10], [10, 15],
                [1, 6], [6, 11], [11, 16],
                [2, 7], [7, 12], [12, 17],
                [3, 8], [8, 13], [13, 18],
                [4, 9], [9, 14], [14, 19],
            ]);
        });
    });

    describe("gets one sep row pairs", () => {
        it("6 * 6", () => {
            expect(IndexManager.getOneSepRowPairs(6, 6)).toEqual([
                [0, 2], [1, 3], [2, 4], [3, 5],
                [6, 8], [7, 9], [8, 10], [9, 11],
                [12, 14], [13, 15], [14, 16], [15, 17],
                [18, 20], [19, 21], [20, 22], [21, 23],
                [24, 26], [25, 27], [26, 28], [27, 29],
                [30, 32], [31, 33], [32, 34], [33, 35],
            ]);
        });

        it("4 * 4", () => {
            expect(IndexManager.getOneSepRowPairs(4, 4)).toEqual([
                [0, 2], [1, 3],
                [4, 6], [5, 7],
                [8, 10], [9, 11],
                [12, 14], [13, 15],
            ]);
        });

        it("5 * 4", () => {
            expect(IndexManager.getOneSepRowPairs(5, 4)).toEqual([
                [0, 2], [1, 3], [2, 4],
                [5, 7], [6, 8], [7, 9],
                [10, 12], [11, 13], [12, 14],
                [15, 17], [16, 18], [17, 19],
            ]);
        });
    });

    describe("gets the one sep column pairs", () => {
        it("6 * 6", () => {
            expect(IndexManager.getOneSepColumnPairs(6, 6)).toEqual([
                [0, 12], [6, 18], [12, 24], [18, 30],
                [1, 13], [7, 19], [13, 25], [19, 31],
                [2, 14], [8, 20], [14, 26], [20, 32],
                [3, 15], [9, 21], [15, 27], [21, 33],
                [4, 16], [10, 22], [16, 28], [22, 34],
                [5, 17], [11, 23], [17, 29], [23, 35],
            ]);
        });

        it("4 * 4", () => {
            expect(IndexManager.getOneSepColumnPairs(4, 4)).toEqual([
                [0, 8], [4, 12],
                [1, 9], [5, 13],
                [2, 10], [6, 14],
                [3, 11], [7, 15],
            ]);
        });

        it("5 * 4", () => {
            expect(IndexManager.getOneSepColumnPairs(5, 4)).toEqual([
                [0, 10], [5, 15],
                [1, 11], [6, 16],
                [2, 12], [7, 17],
                [3, 13], [8, 18],
                [4, 14], [9, 19],
            ]);
        });
    });

    describe("getNeighbors", () => {
        describe("for pairs in rows", () => {
            it("0", () => {
                expect(IndexManager.getNeighbors([0, 1], "row", 6, 6)).toEqual([2]);
                expect(IndexManager.getNeighbors([1, 2], "row", 6, 6)).toEqual([0, 3]);
                expect(IndexManager.getNeighbors([2, 3], "row", 6, 6)).toEqual([1, 4]);
                expect(IndexManager.getNeighbors([3, 4], "row", 6, 6)).toEqual([2, 5]);
                expect(IndexManager.getNeighbors([4, 5], "row", 6, 6)).toEqual([3]);
            });

            it("1", () => {
                expect(IndexManager.getNeighbors([6, 7], "row", 6, 6)).toEqual([8]);
                expect(IndexManager.getNeighbors([7, 8], "row", 6, 6)).toEqual([6, 9]);
                expect(IndexManager.getNeighbors([8, 9], "row", 6, 6)).toEqual([7, 10]);
                expect(IndexManager.getNeighbors([9, 10], "row", 6, 6)).toEqual([8, 11]);
                expect(IndexManager.getNeighbors([10, 11], "row", 6, 6)).toEqual([9]);
            });

            it("2", () => {
                expect(IndexManager.getNeighbors([12, 13], "row", 6, 6)).toEqual([14]);
                expect(IndexManager.getNeighbors([13, 14], "row", 6, 6)).toEqual([12, 15]);
                expect(IndexManager.getNeighbors([14, 15], "row", 6, 6)).toEqual([13, 16]);
                expect(IndexManager.getNeighbors([15, 16], "row", 6, 6)).toEqual([14, 17]);
                expect(IndexManager.getNeighbors([16, 17], "row", 6, 6)).toEqual([15]);
            });

            it("3", () => {
                expect(IndexManager.getNeighbors([18, 19], "row", 6, 6)).toEqual([20]);
                expect(IndexManager.getNeighbors([19, 20], "row", 6, 6)).toEqual([18, 21]);
                expect(IndexManager.getNeighbors([20, 21], "row", 6, 6)).toEqual([19, 22]);
                expect(IndexManager.getNeighbors([21, 22], "row", 6, 6)).toEqual([20, 23]);
                expect(IndexManager.getNeighbors([22, 23], "row", 6, 6)).toEqual([21]);
            });

            it("4", () => {
                expect(IndexManager.getNeighbors([24, 25], "row", 6, 6)).toEqual([26]);
                expect(IndexManager.getNeighbors([25, 26], "row", 6, 6)).toEqual([24, 27]);
                expect(IndexManager.getNeighbors([26, 27], "row", 6, 6)).toEqual([25, 28]);
                expect(IndexManager.getNeighbors([27, 28], "row", 6, 6)).toEqual([26, 29]);
                expect(IndexManager.getNeighbors([28, 29], "row", 6, 6)).toEqual([27]);
            });

            it("5", () => {
                expect(IndexManager.getNeighbors([30, 31], "row", 6, 6)).toEqual([32]);
                expect(IndexManager.getNeighbors([31, 32], "row", 6, 6)).toEqual([30, 33]);
                expect(IndexManager.getNeighbors([32, 33], "row", 6, 6)).toEqual([31, 34]);
                expect(IndexManager.getNeighbors([33, 34], "row", 6, 6)).toEqual([32, 35]);
                expect(IndexManager.getNeighbors([34, 35], "row", 6, 6)).toEqual([33]);
            });
        });

        describe("for pairs in columns", () => {
            it("0", () => {
                expect(IndexManager.getNeighbors([0, 6], "column", 6, 6)).toEqual([12]);
                expect(IndexManager.getNeighbors([6, 12], "column", 6, 6)).toEqual([0, 18]);
                expect(IndexManager.getNeighbors([12, 18], "column", 6, 6)).toEqual([6, 24]);
                expect(IndexManager.getNeighbors([18, 24], "column", 6, 6)).toEqual([12, 30]);
                expect(IndexManager.getNeighbors([24, 30], "column", 6, 6)).toEqual([18]);
            });

            it("1", () => {
                expect(IndexManager.getNeighbors([1, 7], "column", 6, 6)).toEqual([13]);
                expect(IndexManager.getNeighbors([7, 13], "column", 6, 6)).toEqual([1, 19]);
                expect(IndexManager.getNeighbors([13, 19], "column", 6, 6)).toEqual([7, 25]);
                expect(IndexManager.getNeighbors([19, 25], "column", 6, 6)).toEqual([13, 31]);
                expect(IndexManager.getNeighbors([25, 31], "column", 6, 6)).toEqual([19]);
            });

            it("2", () => {
                expect(IndexManager.getNeighbors([2, 8], "column", 6, 6)).toEqual([14]);
                expect(IndexManager.getNeighbors([8, 14], "column", 6, 6)).toEqual([2, 20]);
                expect(IndexManager.getNeighbors([14, 20], "column", 6, 6)).toEqual([8, 26]);
                expect(IndexManager.getNeighbors([20, 26], "column", 6, 6)).toEqual([14, 32]);
                expect(IndexManager.getNeighbors([26, 32], "column", 6, 6)).toEqual([20]);
            });

            it("3", () => {
                expect(IndexManager.getNeighbors([3, 9], "column", 6, 6)).toEqual([15]);
                expect(IndexManager.getNeighbors([9, 15], "column", 6, 6)).toEqual([3, 21]);
                expect(IndexManager.getNeighbors([15, 21], "column", 6, 6)).toEqual([9, 27]);
                expect(IndexManager.getNeighbors([21, 27], "column", 6, 6)).toEqual([15, 33]);
                expect(IndexManager.getNeighbors([27, 33], "column", 6, 6)).toEqual([21]);
            });

            it("4", () => {
                expect(IndexManager.getNeighbors([4, 10], "column", 6, 6)).toEqual([16]);
                expect(IndexManager.getNeighbors([10, 16], "column", 6, 6)).toEqual([4, 22]);
                expect(IndexManager.getNeighbors([16, 22], "column", 6, 6)).toEqual([10, 28]);
                expect(IndexManager.getNeighbors([22, 28], "column", 6, 6)).toEqual([16, 34]);
                expect(IndexManager.getNeighbors([28, 34], "column", 6, 6)).toEqual([22]);
            });

            it("5", () => {
                expect(IndexManager.getNeighbors([5, 11], "column", 6, 6)).toEqual([17]);
                expect(IndexManager.getNeighbors([11, 17], "column", 6, 6)).toEqual([5, 23]);
                expect(IndexManager.getNeighbors([17, 23], "column", 6, 6)).toEqual([11, 29]);
                expect(IndexManager.getNeighbors([23, 29], "column", 6, 6)).toEqual([17, 35]);
                expect(IndexManager.getNeighbors([29, 35], "column", 6, 6)).toEqual([23]);
            });
        });
    });

    describe("find between", () => {
        describe("row", () => {
            it("0", () => {
                expect(IndexManager.getBetween([0, 2], "row")).toEqual([1]);
                expect(IndexManager.getBetween([1, 3], "row")).toEqual([2]);
                expect(IndexManager.getBetween([2, 4], "row")).toEqual([3]);
                expect(IndexManager.getBetween([3, 5], "row")).toEqual([4]);
            });

            it("1", () => {
                expect(IndexManager.getBetween([6, 8], "row")).toEqual([7]);
                expect(IndexManager.getBetween([7, 9], "row")).toEqual([8]);
                expect(IndexManager.getBetween([8, 10], "row")).toEqual([9]);
                expect(IndexManager.getBetween([9, 11], "row")).toEqual([10]);
            });

            it("2", () => {
                expect(IndexManager.getBetween([12, 14], "row")).toEqual([13]);
                expect(IndexManager.getBetween([13, 15], "row")).toEqual([14]);
                expect(IndexManager.getBetween([14, 16], "row")).toEqual([15]);
                expect(IndexManager.getBetween([15, 17], "row")).toEqual([16]);
            });

            it("3", () => {
                expect(IndexManager.getBetween([18, 20], "row")).toEqual([19]);
                expect(IndexManager.getBetween([19, 21], "row")).toEqual([20]);
                expect(IndexManager.getBetween([20, 22], "row")).toEqual([21]);
                expect(IndexManager.getBetween([21, 23], "row")).toEqual([22]);
            });

            it("4", () => {
                expect(IndexManager.getBetween([24, 26], "row")).toEqual([25]);
                expect(IndexManager.getBetween([25, 27], "row")).toEqual([26]);
                expect(IndexManager.getBetween([26, 28], "row")).toEqual([27]);
                expect(IndexManager.getBetween([27, 29], "row")).toEqual([28]);
            });

            it("5", () => {
                expect(IndexManager.getBetween([30, 32], "row")).toEqual([31]);
                expect(IndexManager.getBetween([31, 33], "row")).toEqual([32]);
                expect(IndexManager.getBetween([32, 34], "row")).toEqual([33]);
                expect(IndexManager.getBetween([33, 35], "row")).toEqual([34]);
            });
        });

        describe("column", () => {
            it("0", () => {
                expect(IndexManager.getBetween([0, 12], "column")).toEqual([6]);
                expect(IndexManager.getBetween([6, 18], "column")).toEqual([12]);
                expect(IndexManager.getBetween([12, 24], "column")).toEqual([18]);
                expect(IndexManager.getBetween([18, 30], "column")).toEqual([24]);
            });

            it("1", () => {
                expect(IndexManager.getBetween([1, 13], "column")).toEqual([7]);
                expect(IndexManager.getBetween([7, 19], "column")).toEqual([13]);
                expect(IndexManager.getBetween([13, 25], "column")).toEqual([19]);
                expect(IndexManager.getBetween([19, 31], "column")).toEqual([25]);
            });

            it("2", () => {
                expect(IndexManager.getBetween([2, 14], "column")).toEqual([8]);
                expect(IndexManager.getBetween([8, 20], "column")).toEqual([14]);
                expect(IndexManager.getBetween([14, 26], "column")).toEqual([20]);
                expect(IndexManager.getBetween([20, 32], "column")).toEqual([26]);
            });

            it("3", () => {
                expect(IndexManager.getBetween([3, 15], "column")).toEqual([9]);
                expect(IndexManager.getBetween([9, 21], "column")).toEqual([15]);
                expect(IndexManager.getBetween([15, 27], "column")).toEqual([21]);
                expect(IndexManager.getBetween([21, 33], "column")).toEqual([27]);
            });

            it("4", () => {
                expect(IndexManager.getBetween([4, 16], "column")).toEqual([10]);
                expect(IndexManager.getBetween([10, 22], "column")).toEqual([16]);
                expect(IndexManager.getBetween([16, 28], "column")).toEqual([22]);
                expect(IndexManager.getBetween([22, 34], "column")).toEqual([28]);
            });

            it("5", () => {
                expect(IndexManager.getBetween([5, 17], "column")).toEqual([11]);
                expect(IndexManager.getBetween([11, 23], "column")).toEqual([17]);
                expect(IndexManager.getBetween([17, 29], "column")).toEqual([23]);
                expect(IndexManager.getBetween([23, 35], "column")).toEqual([29]);
            });

            it("5*5 0", () => {
                expect(IndexManager.getBetween([0, 10], "column")).toEqual([5]);
                expect(IndexManager.getBetween([5, 15], "column")).toEqual([10]);
                expect(IndexManager.getBetween([10, 20], "column")).toEqual([15]);
                expect(IndexManager.getBetween([15, 25], "column")).toEqual([20]);
            });
        });
    });

    describe("find blanks", () => {
        let board;
        beforeEach(() => {
            const height = 6;
            const width = 6;
            const xs = [
                [0, 1],
                [0, 2],
                [2, 0],
                [4, 2],
            ];
            const os = [
                [1, 5],
                [2, 3],
                [3, 1],
                [4, 4],
                [5, 4],
            ];
            board = new Board(width, height, xs, os);
        });

        describe("row", () => {
            it("0", () => {
                expect(IndexManager.getBlanks(board, "row", 0)).toEqual([0, 3, 4, 5]);
            });

            it("1", () => {
                expect(IndexManager.getBlanks(board, "row", 1)).toEqual([6, 7, 8, 9, 10]);
            });

            it("2", () => {
                expect(IndexManager.getBlanks(board, "row", 2)).toEqual([13, 14, 16, 17]);
            });

            it("3", () => {
                expect(IndexManager.getBlanks(board, "row", 3)).toEqual([18, 20, 21, 22, 23]);
            });

            it("4", () => {
                expect(IndexManager.getBlanks(board, "row", 4)).toEqual([24, 25, 27, 29]);
            });

            it("5", () => {
                expect(IndexManager.getBlanks(board, "row", 5)).toEqual([30, 31, 32, 33, 35]);
            });
        });

        describe("column", () => {
            it("0", () => {
                expect(IndexManager.getBlanks(board, "column", 0)).toEqual([0, 6, 18, 24, 30]);
            });

            it("1", () => {
                expect(IndexManager.getBlanks(board, "column", 1)).toEqual([7, 13, 25, 31]);
            });

            it("2", () => {
                expect(IndexManager.getBlanks(board, "column", 2)).toEqual([8, 14, 20, 32]);
            });

            it("3", () => {
                expect(IndexManager.getBlanks(board, "column", 3)).toEqual([3, 9, 21, 27, 33]);
            });

            it("4", () => {
                expect(IndexManager.getBlanks(board, "column", 4)).toEqual([4, 10, 16, 22]);
            });

            it("5", () => {
                expect(IndexManager.getBlanks(board, "column", 5)).toEqual([5, 17, 23, 29, 35]);
            });
        });
    });

    describe("blanks in order", () => {
        let board;
        beforeEach(() => {
            const height = 6;
            const width = 6;
            const xs = [
                [0, 1],
                [0, 2],
                [2, 0],
                [4, 2],
            ];
            const os = [
                [1, 5],
                [2, 3],
                [3, 1],
                [4, 4],
                [5, 4],
            ];
            board = new Board(width, height, xs, os);
        });

        describe("row", () => {
            it("0", () => {
                expect(IndexManager.blanksInOrder(board, "row", 0)).toEqual(false);
            });

            it("1", () => {
                expect(IndexManager.blanksInOrder(board, "row", 1)).toEqual(true);
            });

            it("2", () => {
                expect(IndexManager.blanksInOrder(board, "row", 2)).toEqual(false);
            });

            it("3", () => {
                expect(IndexManager.blanksInOrder(board, "row", 3)).toEqual(false);
            });

            it("4", () => {
                expect(IndexManager.blanksInOrder(board, "row", 4)).toEqual(false);
            });

            it("5", () => {
                expect(IndexManager.blanksInOrder(board, "row", 5)).toEqual(false);
            });
        });

        describe("column", () => {
            it("0", () => {
                expect(IndexManager.blanksInOrder(board, "column", 0)).toEqual(false);
            });

            it("1", () => {
                expect(IndexManager.blanksInOrder(board, "column", 1)).toEqual(false);
            });

            it("2", () => {
                expect(IndexManager.blanksInOrder(board, "column", 2)).toEqual(false);
            });

            it("3", () => {
                expect(IndexManager.blanksInOrder(board, "column", 3)).toEqual(false);
            });

            it("4", () => {
                expect(IndexManager.blanksInOrder(board, "column", 4)).toEqual(true);
            });

            it("5", () => {
                expect(IndexManager.blanksInOrder(board, "column", 5)).toEqual(false);
            });
        });

        it("check bug", () => {
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
            expect(IndexManager.blanksInOrder(board, "row", 0)).toEqual(false);
        });

        it("check bug 2", () => {
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
            expect(IndexManager.blanksInOrder(board, "row", 0)).toEqual(true);
        });
    });

    describe("count types", () => {
        let board;
        beforeEach(() => {
            const height = 6;
            const width = 6;
            const xs = [
                [0, 1],
                [0, 2],
                [2, 0],
                [4, 2],
            ];
            const os = [
                [1, 5],
                [2, 3],
                [3, 1],
                [4, 4],
                [5, 4],
            ];
            board = new Board(width, height, xs, os);
        });

        describe("row", () => {
            it("0", () => {
                expect(IndexManager.countValues(board, "row", 0)).toEqual({ x: 2, o: 0 });
            });

            it("1", () => {
                expect(IndexManager.countValues(board, "row", 1)).toEqual({ x: 0, o: 1 });
            });

            it("2", () => {
                expect(IndexManager.countValues(board, "row", 2)).toEqual({ x: 1, o: 1 });
            });

            it("3", () => {
                expect(IndexManager.countValues(board, "row", 3)).toEqual({ x: 0, o: 1 });
            });

            it("4", () => {
                expect(IndexManager.countValues(board, "row", 4)).toEqual({ x: 1, o: 1 });
            });

            it("5", () => {
                expect(IndexManager.countValues(board, "row", 5)).toEqual({ x: 0, o: 1 });
            });
        });

        describe("column", () => {
            it("0", () => {
                expect(IndexManager.countValues(board, "column", 0)).toEqual({ x: 1, o: 0 });
            });

            it("1", () => {
                expect(IndexManager.countValues(board, "column", 1)).toEqual({ x: 1, o: 1 });
            });

            it("2", () => {
                expect(IndexManager.countValues(board, "column", 2)).toEqual({ x: 2, o: 0 });
            });

            it("3", () => {
                expect(IndexManager.countValues(board, "column", 3)).toEqual({ x: 0, o: 1 });
            });

            it("4", () => {
                expect(IndexManager.countValues(board, "column", 4)).toEqual({ x: 0, o: 2 });
            });

            it("5", () => {
                expect(IndexManager.countValues(board, "column", 5)).toEqual({ x: 0, o: 1 });
            });
        });
    });

    describe("left over", () => {
        let board;
        beforeEach(() => {
            const height = 6;
            const width = 6;
            const xs = [
                [0, 1],
                [0, 2],
                [2, 0],
                [4, 2],
            ];
            const os = [
                [1, 5],
                [2, 3],
                [3, 1],
                [4, 4],
                [5, 4],
            ];
            board = new Board(width, height, xs, os);
        });

        describe("row", () => {
            it("0", () => {
                expect(IndexManager.leftOver(board, "row", 0)).toEqual({ x: 1, o: 3 });
            });

            it("1", () => {
                expect(IndexManager.leftOver(board, "row", 1)).toEqual({ x: 3, o: 2 });
            });

            it("2", () => {
                expect(IndexManager.leftOver(board, "row", 2)).toEqual({ x: 2, o: 2 });
            });

            it("3", () => {
                expect(IndexManager.leftOver(board, "row", 3)).toEqual({ x: 3, o: 2 });
            });

            it("4", () => {
                expect(IndexManager.leftOver(board, "row", 4)).toEqual({ x: 2, o: 2 });
            });

            it("5", () => {
                expect(IndexManager.leftOver(board, "row", 5)).toEqual({ x: 3, o: 2 });
            });
        });

        describe("column", () => {
            it("0", () => {
                expect(IndexManager.leftOver(board, "column", 0)).toEqual({ x: 2, o: 3 });
            });

            it("1", () => {
                expect(IndexManager.leftOver(board, "column", 1)).toEqual({ x: 2, o: 2 });
            });

            it("2", () => {
                expect(IndexManager.leftOver(board, "column", 2)).toEqual({ x: 1, o: 3 });
            });

            it("3", () => {
                expect(IndexManager.leftOver(board, "column", 3)).toEqual({ x: 3, o: 2 });
            });

            it("4", () => {
                expect(IndexManager.leftOver(board, "column", 4)).toEqual({ x: 3, o: 1 });
            });

            it("5", () => {
                expect(IndexManager.leftOver(board, "column", 5)).toEqual({ x: 3, o: 2 });
            });
        });
    });

    describe("get locations", () => {
        let board;
        beforeEach(() => {
            const height = 6;
            const width = 6;
            const xs = [
                [0, 1],
                [0, 2],
                [2, 0],
                [4, 2],
            ];
            const os = [
                [1, 5],
                [2, 3],
                [3, 1],
                [4, 4],
                [5, 4],
            ];
            // - X X - - -
            // - - - - - O
            // X - - O - -
            // - O - - - -
            // - - X - O -
            // - - - - O -
            board = new Board(width, height, xs, os);
        });

        describe("row", () => {
            it("0", () => {
                expect(IndexManager.indexIndexesForValue(board, "row", 0, "X")).toEqual([1 % 6, 2 % 6]);
                expect(IndexManager.indexIndexesForValue(board, "row", 0, "O")).toEqual([]);
            });

            it("1", () => {
                expect(IndexManager.indexIndexesForValue(board, "row", 1, "X")).toEqual([]);
                expect(IndexManager.indexIndexesForValue(board, "row", 1, "O")).toEqual([11 % 6]);
            });

            it("2", () => {
                expect(IndexManager.indexIndexesForValue(board, "row", 2, "X")).toEqual([12 % 6]);
                expect(IndexManager.indexIndexesForValue(board, "row", 2, "O")).toEqual([15 % 6]);
            });

            it("3", () => {
                expect(IndexManager.indexIndexesForValue(board, "row", 3, "X")).toEqual([]);
                expect(IndexManager.indexIndexesForValue(board, "row", 3, "O")).toEqual([19 % 6]);
            });

            it("4", () => {
                expect(IndexManager.indexIndexesForValue(board, "row", 4, "X")).toEqual([26 % 6]);
                expect(IndexManager.indexIndexesForValue(board, "row", 4, "O")).toEqual([28 % 6]);
            });

            it("5", () => {
                expect(IndexManager.indexIndexesForValue(board, "row", 5, "X")).toEqual([]);
                expect(IndexManager.indexIndexesForValue(board, "row", 5, "O")).toEqual([34 % 6]);
            });
        });

        describe("column", () => {
            it("0", () => {
                expect(IndexManager.indexIndexesForValue(board, "column", 0, "X")).toEqual([Math.floor(12 / 6)]);
                expect(IndexManager.indexIndexesForValue(board, "column", 0, "O")).toEqual([]);
            });

            it("1", () => {
                expect(IndexManager.indexIndexesForValue(board, "column", 1, "X")).toEqual([Math.floor(1 / 6)]);
                expect(IndexManager.indexIndexesForValue(board, "column", 1, "O")).toEqual([Math.floor(19 / 6)]);
            });

            it("2", () => {
                newFunction(board);
                expect(IndexManager.indexIndexesForValue(board, "column", 2, "O")).toEqual([]);
            });

            it("3", () => {
                expect(IndexManager.indexIndexesForValue(board, "column", 3, "X")).toEqual([]);
                expect(IndexManager.indexIndexesForValue(board, "column", 3, "O")).toEqual([Math.floor(15 / 6)]);
            });

            it("4", () => {
                expect(IndexManager.indexIndexesForValue(board, "column", 4, "X")).toEqual([]);
                // tslint:disable-next-line:max-line-length
                expect(IndexManager.indexIndexesForValue(board, "column", 4, "O")).toEqual([Math.floor(28 / 6), Math.floor(34 / 6)]);
            });

            it("5", () => {
                expect(IndexManager.indexIndexesForValue(board, "column", 5, "X")).toEqual([]);
                expect(IndexManager.indexIndexesForValue(board, "column", 5, "O")).toEqual([Math.floor(11 / 6)]);
            });
        });
    });

    describe("blanks groups", () => {
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
        });

        describe("row", () => {
            it("0", () => {
                expect(IndexManager.blankGroups(board, "row", 0)).toEqual([]);
            });

            it("1", () => {
                expect(IndexManager.blankGroups(board, "row", 1)).toEqual([[6, 7, 8], [10]]);
            });

            it("2", () => {
                expect(IndexManager.blankGroups(board, "row", 2)).toEqual([[13, 14], [16]]);
            });

            it("3", () => {
                expect(IndexManager.blankGroups(board, "row", 3)).toEqual([[18], [20, 21], [23]]);
            });

            it("4", () => {
                expect(IndexManager.blankGroups(board, "row", 4)).toEqual([[24, 25], [27], [29]]);
            });

            it("5", () => {
                expect(IndexManager.blankGroups(board, "row", 5)).toEqual([[30, 31, 32, 33]]);
            });
        });

        describe("column", () => {
            it("0", () => {
                expect(IndexManager.blankGroups(board, "column", 0)).toEqual([[6], [18, 24, 30]]);
            });

            it("1", () => {
                expect(IndexManager.blankGroups(board, "column", 1)).toEqual([[7, 13], [25, 31]]);
            });

            it("2", () => {
                expect(IndexManager.blankGroups(board, "column", 2)).toEqual([[8, 14, 20], [32]]);
            });

            it("3", () => {
                expect(IndexManager.blankGroups(board, "column", 3)).toEqual([[21, 27, 33]]);
            });

            it("4", () => {
                expect(IndexManager.blankGroups(board, "column", 4)).toEqual([[10, 16]]);
            });

            it("5", () => {
                expect(IndexManager.blankGroups(board, "column", 5)).toEqual([[23, 29]]);
            });
        });
    });

    describe("get section comparison matches", () => {
        it("2", () => {
            expect(IndexManager.sectionComparisonMatches(2)).toEqual([
                [0, 1],
            ]);
        });

        it("3", () => {
            expect(IndexManager.sectionComparisonMatches(3)).toEqual([
                [0, 1], [0, 2],
                [1, 2],
            ]);
        });

        it("4", () => {
            expect(IndexManager.sectionComparisonMatches(4)).toEqual([
                [0, 1], [0, 2], [0, 3],
                [1, 2], [1, 3],
                [2, 3],
            ]);
        });

        xit("5", () => {
            expect(IndexManager.sectionComparisonMatches(5)).toEqual([
                [0, 1], [0, 2], [0, 3], [0, 4],
                [1, 2], [1, 3], [1, 4],
                [2, 3], [2, 4],
                [3, 4],
            ]);
        });

        xit("6", () => {
            expect(IndexManager.sectionComparisonMatches(6)).toEqual([
                [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
                [1, 2], [1, 3], [1, 4], [1, 5],
                [2, 3], [2, 4], [2, 5],
                [3, 4], [3, 5],
                [4, 5],
            ]);
        });

        it("7", () => {
            expect(IndexManager.sectionComparisonMatches(7)).toEqual([
                [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
                [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
                [2, 3], [2, 4], [2, 5], [2, 6],
                [3, 4], [3, 5], [3, 6],
                [4, 5], [4, 6],
                [5, 6],
            ]);
        });
    });
});
function newFunction(board: any) {
    expect(IndexManager.indexIndexesForValue(board, "column", 2, "X")).toEqual([Math.floor(2 / 6), Math.floor(26 / 6)]);
}
