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
}
