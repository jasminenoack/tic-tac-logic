import { Spot } from '../src/spot'

describe('spot', () => {
    xit('should create a spot', () => {
        const spot = new Spot()
        expect(spot).toBeTruthy()
        expect(spot.get()).toBeFalsy()
    })

    xit('should create an X spot', () => {
        const spot = new Spot()
        expect(spot).toBeTruthy()
    })

    xit('should create an O spot', () => {
        const spot = new Spot()
        expect(spot).toBeTruthy()
    })

    xit('should mark a spot as given if its value is known', () => {
        const spot = new Spot()
        expect(spot).toBeTruthy()
    })

    xit('should not mark a spot as given if its value is not known', () => {
        const spot = new Spot()
        expect(spot).toBeTruthy()
    })

    xit('should allow setting a spots value', () => {
        const spot = new Spot()
        expect(spot).toBeTruthy()
    })

    xit('should not set as a given if value is set later', () => {
        const spot = new Spot()
        expect(spot).toBeTruthy()
    })
})