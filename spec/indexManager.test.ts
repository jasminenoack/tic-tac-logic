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
});
