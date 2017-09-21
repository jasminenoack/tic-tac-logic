import { ComparisonManager } from "../src/comparisonManager";
import { Spot } from "../src/spot";

describe("spots match", () => {
    let oSpotOne;
    let oSpotTwo;
    let xSpotOne;
    let xSpotTwo;
    let undefinedSpotOne;
    let undefinedSpotTwo;

    beforeEach(() => {
        oSpotOne = new Spot("O");
        oSpotTwo = new Spot("O");
        xSpotOne = new Spot("X");
        xSpotTwo = new Spot("X");
        undefinedSpotOne = new Spot();
        undefinedSpotTwo = new Spot();
    });

    it("should think 2 spots with Os are equal", () => {
        expect(ComparisonManager.compareTwo(oSpotOne, oSpotTwo)).toBeTruthy();
    });

    it("should think 2 spots with Xs are equal", () => {
        expect(ComparisonManager.compareTwo(xSpotOne, xSpotTwo)).toBeTruthy();
    });

    it("should think 2 spots that are not known are not equal", () => {
        expect(ComparisonManager.compareTwo(undefinedSpotOne, undefinedSpotTwo)).toBeFalsy();
    });

    it("should think an X spot and an O spot are not equal", () => {
        expect(ComparisonManager.compareTwo(xSpotOne, oSpotOne)).toBeFalsy();
        expect(ComparisonManager.compareTwo(xSpotTwo, oSpotTwo)).toBeFalsy();
        expect(ComparisonManager.compareTwo(xSpotOne, oSpotTwo)).toBeFalsy();
        expect(ComparisonManager.compareTwo(xSpotTwo, oSpotOne)).toBeFalsy();
    });

    it("should think an X spot and an undefined spot are not equal", () => {
        expect(ComparisonManager.compareTwo(xSpotOne, undefinedSpotOne)).toBeFalsy();
        expect(ComparisonManager.compareTwo(xSpotOne, undefinedSpotTwo)).toBeFalsy();
        expect(ComparisonManager.compareTwo(xSpotTwo, undefinedSpotOne)).toBeFalsy();
        expect(ComparisonManager.compareTwo(xSpotTwo, undefinedSpotTwo)).toBeFalsy();
    });

    it("should think an O spot and an undefined spot are not equal", () => {
        expect(ComparisonManager.compareTwo(oSpotOne, undefinedSpotOne)).toBeFalsy();
        expect(ComparisonManager.compareTwo(oSpotOne, undefinedSpotTwo)).toBeFalsy();
        expect(ComparisonManager.compareTwo(oSpotTwo, undefinedSpotOne)).toBeFalsy();
        expect(ComparisonManager.compareTwo(oSpotTwo, undefinedSpotTwo)).toBeFalsy();
    });
});
