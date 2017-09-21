import { IndexManager } from "../src/indexManager";

describe("IndexManager", () => {
    it("finds the indexes for rows in a 6 * 6", () => {
        expect(IndexManager.getRowIndexes(0, 6)).toEqual([0, 1, 2, 3, 4, 5]);
        expect(IndexManager.getRowIndexes(1, 6)).toEqual([6, 7, 8, 9, 10, 11]);
        expect(IndexManager.getRowIndexes(2, 6)).toEqual([12, 13, 14, 15, 16, 17]);
        expect(IndexManager.getRowIndexes(3, 6)).toEqual([18, 19, 20, 21, 22, 23]);
        expect(IndexManager.getRowIndexes(4, 6)).toEqual([24, 25, 26, 27, 28, 29]);
        expect(IndexManager.getRowIndexes(5, 6)).toEqual([30, 31, 32, 33, 34, 35]);
    });

    it("finds the indexes for rows in a 4 * 4", () => {
        expect(IndexManager.getRowIndexes(0, 4)).toEqual([0, 1, 2, 3]);
        expect(IndexManager.getRowIndexes(1, 4)).toEqual([4, 5, 6, 7]);
        expect(IndexManager.getRowIndexes(2, 4)).toEqual([8, 9, 10, 11]);
        expect(IndexManager.getRowIndexes(3, 4)).toEqual([12, 13, 14, 15]);
    });

    it("finds the indexes for columns in a 6 * 6", () => {
        expect(IndexManager.getColumnIndexes(0, 6, 6)).toEqual([0, 6, 12, 18, 24, 30]);
        expect(IndexManager.getColumnIndexes(1, 6, 6)).toEqual([1, 7, 13, 19, 25, 31]);
        expect(IndexManager.getColumnIndexes(2, 6, 6)).toEqual([2, 8, 14, 20, 26, 32]);
        expect(IndexManager.getColumnIndexes(3, 6, 6)).toEqual([3, 9, 15, 21, 27, 33]);
        expect(IndexManager.getColumnIndexes(4, 6, 6)).toEqual([4, 10, 16, 22, 28, 34]);
        expect(IndexManager.getColumnIndexes(5, 6, 6)).toEqual([5, 11, 17, 23, 29, 35]);
    });

    it("finds the indexes for columns in a 4 * 4", () => {
        expect(IndexManager.getColumnIndexes(0, 4, 4)).toEqual([0, 4, 8, 12]);
        expect(IndexManager.getColumnIndexes(1, 4, 4)).toEqual([1, 5, 9, 13]);
        expect(IndexManager.getColumnIndexes(2, 4, 4)).toEqual([2, 6, 10, 14]);
        expect(IndexManager.getColumnIndexes(3, 4, 4)).toEqual([3, 7, 11, 15]);
    });

    it("finds the indexes for columns in a 6 * 4", () => {
        expect(IndexManager.getColumnIndexes(0, 4, 6)).toEqual([0, 4, 8, 12, 16, 20]);
        expect(IndexManager.getColumnIndexes(1, 4, 6)).toEqual([1, 5, 9, 13, 17, 21]);
        expect(IndexManager.getColumnIndexes(2, 4, 6)).toEqual([2, 6, 10, 14, 18, 22]);
        expect(IndexManager.getColumnIndexes(3, 4, 6)).toEqual([3, 7, 11, 15, 19, 23]);
    });
});
