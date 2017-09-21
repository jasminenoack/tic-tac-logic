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
}
