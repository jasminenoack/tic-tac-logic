import { IndexManager } from "./indexManager";
import { Spot } from "./spot";

export class Board {
    public spots: Spot[];

    constructor(public width: number, public height: number, xs: number[][], os: number[][]) {
        const tempValues = [];
        xs.forEach((location) => {
            const index = IndexManager.findIndex(location[0], location[1], width);
            tempValues[index] = "X";
        });
        os.forEach((location) => {
            const index = IndexManager.findIndex(location[0], location[1], width);
            tempValues[index] = "O";
        });
        this.spots = [];
        for (let i = 0; i < width * height; i++) {
            this.spots.push(new Spot(tempValues[i]));
        }
    }

    public value(index): string {
        return this.spots[index].get();
    }

    public setSpot(value: string, index: number) {
        if (this.spots[index]) {
            this.spots[index].set(value);
        }
    }
}
