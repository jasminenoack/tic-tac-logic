import { Spot } from "../src/spot";

describe("spot", () => {
    xit("should create a spot", () => {
        const spot = new Spot();
        expect(spot).toBeTruthy();
        expect(spot.get()).toBeFalsy();
    });

    xit("should create an X spot", () => {
        const spot = new Spot();
        expect(spot).toBeTruthy();
        expect(spot.get()).toEqual("X");
    });

    xit("should create an O spot", () => {
        const spot = new Spot();
        expect(spot).toBeTruthy();
        expect(spot.get()).toEqual("O");
    });

    xit("should mark a spot as given if its value is known", () => {
        const xSpot = new Spot("X");
        expect(xSpot).toBeTruthy();
        expect(xSpot.given()).toBeTruthy();

        const oSpot = new Spot("O");
        expect(oSpot).toBeTruthy();
        expect(oSpot.given()).toBeTruthy();
    });

    xit("should not accept a value other than X or O", () => {
        let error;
        try {
            const xSpot = new Spot("4");
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();
    });

    xit("should not mark a spot as given if its value is not known", () => {
        const spot = new Spot();
        expect(spot).toBeTruthy();
        expect(spot.given()).toBeFalsy();
    });

    xit("should allow setting a spots value", () => {
        const spot = new Spot();
        expect(spot).toBeTruthy();
        expect(spot.get()).toBeFalsy();
        spot.set("X");
        expect(spot.get()).toEqual("X");
        spot.set("O");
        expect(spot.get()).toEqual("O");
    });

    xit("should not allow setting a spots value to other than X or O", () => {
        const spot = new Spot();
        expect(spot).toBeTruthy();
        let error;
        try {
            spot.set("H");
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();
    });

    xit("should not set as a given if value is set later", () => {
        const spot = new Spot();
        expect(spot).toBeTruthy();
        spot.set("X");
        expect(spot.get()).toEqual("X");
        expect(spot.given()).toBeFalsy();
        spot.set("O");
        expect(spot.get()).toEqual("O");
        expect(spot.given()).toBeFalsy();
    });
});
