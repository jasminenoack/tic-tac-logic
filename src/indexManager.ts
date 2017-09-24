import { Board } from "./board";

const rowName = "row";
const columnName = "column";
const x = "X";
const o = "O";

export class IndexManager {
    public static getRowIndexes(row: number, width: number): number[] {
        const baseIndex = row * width;
        const indexes = [];

        for (let i = baseIndex; i < baseIndex + width; i++) {
            indexes.push(i);
        }

        return indexes;
    }

    public static getColumnIndexes(column: number, width: number, height: number): number[] {
        const elementCount = width * height;
        const indexes = [];
        for (let i = column; i < elementCount; i += width) {
            indexes.push(i);
        }
        return indexes;
    }

    public static findIndex(row: number, column: number, width: number): number {
        return row * width + column;
    }

    public static getConsecutiveRowPairs(width: number, height: number): number[][] {
        const results = [];
        for (let i = 0; i < height; i++) {
            const rowIndexes = this.getRowIndexes(i, width);
            for (let j = 1; j < rowIndexes.length; j++) {
                results.push([rowIndexes[j - 1], rowIndexes[j]]);
            }
        }
        return results;
    }

    public static getConsecutiveColumnPairs(width: number, height: number): number[][] {
        const results = [];
        for (let i = 0; i < width; i++) {
            const columnIndexes = this.getColumnIndexes(i, width, height);
            for (let j = 1; j < columnIndexes.length; j++) {
                results.push([columnIndexes[j - 1], columnIndexes[j]]);
            }
        }
        return results;
    }

    public static getOneSepRowPairs(width: number, height: number) {
        const results = [];
        for (let i = 0; i < height; i++) {
            const rowIndexes = this.getRowIndexes(i, width);
            for (let j = 2; j < rowIndexes.length; j++) {
                results.push([rowIndexes[j - 2], rowIndexes[j]]);
            }
        }
        return results;
    }

    public static getOneSepColumnPairs(width: number, height: number) {
        const results = [];
        for (let i = 0; i < width; i++) {
            const columnIndexes = this.getColumnIndexes(i, width, height);
            for (let j = 2; j < columnIndexes.length; j++) {
                results.push([columnIndexes[j - 2], columnIndexes[j]]);
            }
        }
        return results;
    }

    public static getBetween(pair: number[], type: string) {
        return [(pair[0] + pair[1]) / 2];
    }

    public static getNeighbors(indexes: number[], type: string, width: number, height: number) {
        const firstProcessedIndex = indexes[0];
        const lastProcessedIndex = indexes[indexes.length - 1];
        let currentIndexes;
        if (type === rowName) {
            currentIndexes = this.getRowIndexes(this.getRowStart(firstProcessedIndex, width), width);
        } else if (type === columnName) {
            currentIndexes = this.getColumnIndexes(this.getColumnStart(firstProcessedIndex, width), width, height);
        }
        const startIndex = currentIndexes.indexOf(firstProcessedIndex);
        const endIndex = currentIndexes.indexOf(lastProcessedIndex);

        const results = [];
        if (startIndex) {
            results.push(currentIndexes[startIndex - 1]);
        }
        if (endIndex < currentIndexes.length - 1) {
            results.push(currentIndexes[endIndex + 1]);
        }
        return results;
    }

    public static getBlanks(board: Board, type: string, index: number) {
        const indexes = this.getSectionIndexes(type, index, board.width, board.height);
        const result = [];
        indexes.forEach((currentIndex) => {
            if (!board.value(currentIndex)) {
                result.push(currentIndex);
            }
        });
        return result;
    }

    public static blankGroups(board: Board, type: string, index: number) {
        const indexes = this.getSectionIndexes(type, index, board.width, board.height);
        const blanks = this.getBlanks(board, type, index);

        const result = [];
        let currentSeries = [];
        let blankIndex = 0;

        indexes.forEach((currentIndex) => {
            if (currentIndex === blanks[blankIndex]) {
                currentSeries.push(currentIndex);
                blankIndex++;
            } else {
                if (currentSeries.length) {
                    result.push(currentSeries);
                    currentSeries = [];
                }
            }
        });
        if (currentSeries.length) {
            result.push(currentSeries);
            currentSeries = [];
        }
        return result;
    }

    public static blanksInOrder(board: Board, type: string, index: number) {
        const indexes = this.getSectionIndexes(type, index, board.width, board.height);
        const blanks = this.getBlanks(board, type, index);
        if (blanks.length) {
            const firstBlankIndex = indexes.indexOf(blanks[0]);
            for (let i = firstBlankIndex; i < blanks.length; i++) {
                if (indexes[firstBlankIndex + i] !== blanks[i]) {
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }

    public static countValues(board: Board, type: string, index: number) {
        const indexes = this.getSectionIndexes(type, index, board.width, board.height);
        const result = {
            o: 0,
            x: 0,
        };
        indexes.forEach((currentIndex: number) => {
            const value = board.value(currentIndex);
            if (value === x) {
                result.x += 1;
            } else if (value === o) {
                result.o += 1;
            }
        });
        return result;
    }

    public static leftOver(board: Board, type: string, index: number) {
        const counts = this.countValues(board, type, index);
        const expectedCount = board.width / 2;
        // tslint:disable-next-line:forin
        for (const currentType in counts) {
            counts[currentType] = expectedCount - counts[currentType];
        }
        return counts;
    }

    public static getSectionIndexes(type: string, index: number, width: number, height: number) {
        if (type === rowName) {
            return this.getRowIndexes(index, width);
        } else if (type === columnName) {
            return this.getColumnIndexes(index, width, height);
        }
    }

    private static getRowStart(index: number, width: number) {
        return Math.floor(index / width);
    }

    private static getColumnStart(index: number, width: number) {
        return index % width;
    }
}
