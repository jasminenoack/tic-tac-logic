import { Spot } from '../src/spot'
import { ComparisonManager } from '../src/comparisonManager'

describe('spots match', () => {
    let oSpotOne, oSpotTwo, xSpotOne, xSpotTwo, undefinedSpotOne, undefinedSpotTwo
    beforeEach(() => {
        oSpotOne = new Spot('O')
        oSpotTwo = new Spot('O')
        xSpotOne = new Spot('X')
        xSpotTwo = new Spot('X')
        undefinedSpotOne = new Spot()
        undefinedSpotTwo = new Spot()
    })

    xit('should think 2 spots with Os are equal', () => {
        expect(ComparisonManager.compareTwo(oSpotOne, oSpotTwo)).toBeTruthy()
    })

    xit('should think 2 spots with Xs are equal', () => {
        expect(ComparisonManager.compareTwo(xSpotOne, xSpotTwo)).toBeTruthy()
    })

    xit('should think 2 spots that are not known are not equal', () => {
        expect(ComparisonManager.compareTwo(undefinedSpotOne, undefinedSpotTwo)).toBeFalsy()
    })

    xit('should think an X spot and an O spot are not equal', () => {
        expect(ComparisonManager.compareTwo(xSpotOne, oSpotOne)).toBeFalsy()
        expect(ComparisonManager.compareTwo(xSpotTwo, oSpotTwo)).toBeFalsy()
        expect(ComparisonManager.compareTwo(xSpotOne, oSpotTwo)).toBeFalsy()
        expect(ComparisonManager.compareTwo(xSpotTwo, oSpotOne)).toBeFalsy()
    })

    xit('should think an X spot and an undefined spot are not equal', () => {
        expect(ComparisonManager.compareTwo(xSpotOne, undefinedSpotOne)).toBeFalsy()
        expect(ComparisonManager.compareTwo(xSpotOne, undefinedSpotTwo)).toBeFalsy()
        expect(ComparisonManager.compareTwo(xSpotTwo, undefinedSpotOne)).toBeFalsy()
        expect(ComparisonManager.compareTwo(xSpotTwo, undefinedSpotTwo)).toBeFalsy()
    })

    xit('should think an O spot and an undefined spot are not equal', () => {
        expect(ComparisonManager.compareTwo(oSpotOne, undefinedSpotOne)).toBeFalsy()
        expect(ComparisonManager.compareTwo(oSpotOne, undefinedSpotTwo)).toBeFalsy()
        expect(ComparisonManager.compareTwo(oSpotTwo, undefinedSpotOne)).toBeFalsy()
        expect(ComparisonManager.compareTwo(oSpotTwo, undefinedSpotTwo)).toBeFalsy()
    })
})