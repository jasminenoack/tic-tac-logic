import { Spot } from "./spot";

export class ComparisonManager {
    public static compareTwo(firstSpot: Spot, secondSpot: Spot) {
        const firstValue = firstSpot.get();
        const secondValue = secondSpot.get();
        return !!(firstValue && secondValue && firstValue === secondValue);
    }
}
