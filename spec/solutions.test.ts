import { Board } from "../src/board";
import * as puzzles from "../src/puzzles";
import { StepManager } from "../src/stepManager";

describe("Solutions", () => {
    function test(solution, puzzleData) {
        expect(solution.length).toBeTruthy();
        if (!solution.length) {
            return;
        }
        const board = new Board(
            puzzleData.width,
            puzzleData.height,
            puzzleData.xs,
            puzzleData.os,
        );
        const manager = new StepManager(board);
        while (!manager.done()) {
            manager.takeStep();
        }
        solution.forEach((letter, index) => {
            expect(letter).toEqual(board.value(index));
        });
    }

    it(("solves puzzle easy 1"), () => {
        const solution = "OXXOXOOXOXXOXOXOOXXOOXXOOXXOOXXOOXOX".split("");
        const puzzleData = puzzles.easy1;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 2"), () => {
        const solution = "OXOXXOXOOXXOOXXOOXXOXOXOOXOXOXXOXOOX".split("");
        const puzzleData = puzzles.easy2;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 3"), () => {
        const solution = "OXXOOXXOOXOXXOXOXOOXXOXOOXOXOXXOOXXO".split("");
        const puzzleData = puzzles.easy3;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 4"), () => {
        const solution = "XOXOOXOXXOOXXOOXXOXOXOXOOXOXOXOXOXXO".split("");
        const puzzleData = puzzles.easy4;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 5"), () => {
        const solution = "XXOOXOXOOXXOOOXXOXOXXOXOXOOXOXOOXOXXXXOXOOOXXOOX".split("");
        const puzzleData = puzzles.easy5;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 6"), () => {
        const solution = "OXOXOXOXXOXOXOXOOXOXOXXOXOOXOXOOXOXXXXOOXOXOXXOO".split("");
        const puzzleData = puzzles.easy6;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 7"), () => {
        const solution = "XOXXOOOXOOXXOXOXOXXOXOXOOXXOXOXOOXOXXXOOXOOOXXOX".split("");
        const puzzleData = puzzles.easy7;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 8"), () => {
        const solution = "XOOXXOXXOOXOOOXXOXOXOXOXXOXOXOXOOXOXOXXOXOOXXOOX".split("");
        const puzzleData = puzzles.easy8;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 9"), () => {
        const solution = "OOXOXXXOOXOXXXOOXOOXXOXOOOXXOXXXOXOOOXOOXXXOXXOO".split("");
        const puzzleData = puzzles.easy9;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 10"), () => {
        const solution = "OOXOXXOXXOXOXOOXOXOXOXOXXOXOXOXOOXXOOXXOOXXXOXOO".split("");
        const puzzleData = puzzles.easy10;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 11"), () => {
        const solution = "XOXOOXOXXXOXOXOOOXOXXOXOXOXOXOOXXOXXOXOOOXOXOXXOOOXOXOXXXOXOXXOOOXOXOOXXOXOOXOXX".split("");
        const puzzleData = puzzles.easy11;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 12"), () => {
        const solution = "XOXXOOXOXOXOXOXOOXOXOXOXOXOXOXXOXOXOXOOXOOXXOXOXXXOOXOXOXOOXXOXOOXXOOXOXOXOOXXOX".split("");
        const puzzleData = puzzles.easy12;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 13"), () => {
        const solution = "OXOOXOXXOXOOXXOXXOXXOXOOXOOXXOXOOXXOOXOXXOOXOOXXXOXOXXOOOXOXOXOXXOXXOOXOOXXOXOXO".split("");
        const puzzleData = puzzles.easy13;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 14"), () => {
        const solution = "XOXOXXOOOXOXOXOXXOXXOOXOXOXOXOOXOXOOXXOXXOOXOXXOOXXOXOXOXXOOXOOXOOXXOXXOOXOXOOXX".split("");
        const puzzleData = puzzles.easy14;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 15"), () => {
        const solution = "OXXOOXXOXOOXOXOXOXOXXOOXOXXOXOXOXOXOOXOXOXOXXOXOXOOXXOOXXOXOOXXOOXOXOOXXXOXOXXOO".split("");
        const puzzleData = puzzles.easy15;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 16"), () => {
        const solution = "OXOOXXOXOOXXOOXXXOXXOOXOXXOOXXOOOXOXOXOXOOXOXOXXXXOXOOXOXOXOXXOOOXOOXOXXXOXXOXOO".split("");
        const puzzleData = puzzles.easy16;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 17"), () => {
        const solution = "XOOXOXXOOOXXOXOXOXXOXOOXXXOOXOXOXOXXOXOOOXXOOXOXOXOOXOXXXOXXOOXOOXOOXXOXXOOXXOXO".split("");
        const puzzleData = puzzles.easy17;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 18"), () => {
        const solution = "OOXOXOXXOXXOOXOXXOOXOXXOXOXOXOOXOXOXXOOXOXOXOXXOXOXOXOXOXOOXOXOXOXXOXXOOXXOXOOXO".split("");
        const puzzleData = puzzles.easy18;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 19"), () => {
        const solution = "XOOXOOXXXOXOXOOXOXXOXXOOOXOXOOXXXOXOXOXOOXOOXXOXOXOXOXXOXOXXOOXOOOXOXXOXXXOXOXOO".split("");
        const puzzleData = puzzles.easy19;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 20"), () => {
        const solution = "XOXXOXOOOXOOXOXXOOXXOXXOXXOOXXOOXXOOXOOXOOXXOOXXXOXOXXOOXXOXOXOOOOXOXOXXOXOXOOXX".split("");
        const puzzleData = puzzles.easy20;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 21"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOXOXOOXOXOXXOXOXOXOXOOXOXOXOXOXOXOXOXOXXOXOXOXOXOXOOXOXOXXOOXXOXOOXOXXXOOXOXOOXOOXXOXXOXOXXOOXXOXOOOXOXOOXOXXXOXOXOXOOXOOXXOXOXXOOXOXOXXOXO".split("");
        const puzzleData = puzzles.easy21;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 22"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OXXOOXOXOXXOXOOXXOOXOXOXXOOXXOOXXOOXOXXOXOXOXOXOOXXOOXXOOXXOOXOXOXOXXOOXXOXOXOOXXOXOXOOXXOOXOXOXXOOXXOOXXOXOOXOOXOXXOXXOXXOXOOXOOXXOOXOXXOXO".split("");
        const puzzleData = puzzles.easy22;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 23"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OXXOXXOXOOXOOXOXXOXOXXOOXOXOOXOXXOXOOXOXXOOXOXOXXOOOXXOXXOXOXXOOXOOXOXXOXOXOXOOXOXOXOXXOXOOXOXXOOXOXXOXOOXOOXXOXXOXOXOXOXOOXOOXXOXOOXXOXOXXO".split("");
        const puzzleData = puzzles.easy23;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 24"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOOXOXXOOXOXXOOXOOXXOXOXXOOXXOXOXOXOXOOXOXOXOXOXOXXOOXXOOXXOXOXOXOXOXOOXXOOXXOOXXXOXOXOXOOXOXOXOOXXOOXOXOXXOOXOXXOXOXOXOXOOXOXOXXOOOXOXOXXOX".split("");
        const puzzleData = puzzles.easy24;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 25"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OXXOXOOXXOOXXOOXOOXXXOOXXOXOOXXOOXOXOXXOOXXOXOXXOOXXOOXOXOOXXOOXOXOOXXOXXOXXOXOOXOOXOOXOXXOXOOXXOXOXXOXXOOXXOOOOXOXOXOXXXXOXOXOXOOOOXXOXXOXO".split("");
        const puzzleData = puzzles.easy25;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 26"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OXXOXOOXOXOXXOOXXOXOXOOXOXXOOXXOOXXOOXOXOXXOXOXOXOXOOXOXOXXOOOXXOOXXOXOXOOXXOOXXXOXOOXXOXOXOOXXOXXOOOXXOOXOOXXOXOXXOOXXOXOXOOXXOOXXXOXXOOXOO".split("");
        const puzzleData = puzzles.easy26;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 27"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOXOXXOXOOXOXOXOXXOOOXOXOOXOXXOOXXOXOXOXXXOOXOXXOOOXXOOXOOXXXOOXXOXOXOOXOXXOXXOOXOXOOXOOXXOOXXOXXOXOXXOOXOOXOXXOXOXXOOXOOXOXOOXXOXOXOXOXOOXX".split("");
        const puzzleData = puzzles.easy27;
        test(solution, puzzleData);
    });

    it(("solves puzzle easy 28"), () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OOXXOOXXOXXXOOXXOOXOOXXOXXOOXOXOOXOOXXOXXOXOXXOOXOOXOXOXOOXXOXOXOOXXOXXOXOXOOXXOXOOXOXXOOXOXOOXXOOXXXOXXOOXXOOXOXOXOXOOXOXOXOXOXXOOXXOXOXXOO".split("");
        const puzzleData = puzzles.easy28;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 29", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XXOOXXOXOOXOXOOXXOXOOXOXOOXOXXOXOXXOOXOXXOXOXXOOXOXOOXOOXXOXOXOXOXOXXOOXXOXOXOXOXOOXOXXOOXOOXXOXOXOXOXXOXOOXXOXXOXOOXOXOOOXOXXOXOXXOXOXOXOOX".split("");
        const puzzleData = puzzles.easy29;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 30", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOXOOXOXOXOXOOXOXOXXXXOXOOXOXOOOXXOXOXOXXXOOXXOOXOOXXOXOXOOXXOXXOOXXOOOXOOXXOOXXXOOXOXOXXOOOXXOOXXOXOXXOXOXOXOXXOOXXOXOOOOXXOXXOOXXOOXXOOXXO".split("");
        const puzzleData = puzzles.easy30;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 31", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OOXOXXOXOXXOXOXOOXXOXOOXOXOXXOOXOOXXOXXOXOXXOXOOXOOXOXOOXXOXOXXOOXOOXOXXXXOOXOXXOOXOOOXXOXXOXXOOOXOOXXOOXOXXXOXXOOXXOXOOXOXXOOXOXOXOOXOOXXOOXXOXXOOXOOXXOXXOXOXOXXOOXOOXOXOXXOOXOXOXXXOXOOXXOOXO".split("");
        const puzzleData = puzzles.easy31;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 32", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OOXOXXOXXOXOXOOXXOXXOXOOXXOXOOXOXOOXOXXOOXOXXOXOXOXOXOXOOXXOXOOXOXOOXXOXOXXOXOOXOOXXXOXXOOXXOOXOXXOXOXOOXXOOOXOOXXOXOXOXXOXOXOXOXOXOOOXXOOXXOXOXOXOOXXOOXOXXXOOXXOOXOXXOOXXOOXXOOXOXOXOXOXXOXOOX".split("");
        const puzzleData = puzzles.easy32;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 33", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OOXOXOXOXXOXOXOOXXOOXOXXXXOXOXOXOXOOXOXXOOXOXOXOOXOOXXOXOXOXXXOOXOOXXOXOOOXXOXXOXOOXOXOXOXXOOXXOXXOOXOOXXOOXXOXOXOXOOXOXOOXXOXOXOXXOOXOOXOOXXOXXXOXXOXXOOXOOXOXOOXOXOXXOOXOXXOXOXOOXXOXXOOXXOOXO".split("");
        const puzzleData = puzzles.easy33;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 34", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OXXOOXOXOXXOXOOXOXOXOXXOOXOXXOXOXOOXXOXOOXXOXOXOOXOXXOOXOXOXXXOXXOOXOXOOOOXOOXXOXOXXOXXOOXOXXOXOXOOXXOOXOXOXXOXOXOXOXXOOOXXOOXXOXOXOXOOXOXOXOXOXOXOOXOXOXOXXOXXOXXOXOOXOXOXXOOXOOXOXXOOXXOXOXOOX".split("");
        const puzzleData = puzzles.easy34;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 35", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OXOXOXXOOXXOOOXXOXOXOXOXXXOOXOXOXOXOOXOXXOXOXOOXOOXXOXOXOXXOXXOOXOOXXOOXOXXOOXXOXOXOXOOXOXXOOXOXXOOXXOOXOXOXOXXOXOXOXOXOOXOXOXXOXXOOXOXOOXOXOXOXXOXOXOOXXOXOOXOXOXXOXOOXXOXOXOOXOXXOXOXOXOOXOOXX".split("");
        const puzzleData = puzzles.easy35;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 36", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XXOXOXOOXXOOXXOOXXOXOXOOOOXXOOXOXOXXXXOXOXXOOXOOXXOOXOOXXOOXOOXXOOXXOXXOXOXOOXXOOXXOOXOXXOOXXOOXXOOXXOOXXOOXOXXOOXXOOXXOXOOXOOXXOOXXOOXOXXOOXXOXOXXOXOXOXOXOXXOXOOXXOOXOOOXOXXOXOXOXOOXOXXOOXOXX".split("");
        const puzzleData = puzzles.easy36;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 37", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOOXXOXXOOXOOXOXOOXXOOXXOXXOOXOOXXOXXOXOXXOOXXOOOXOXXOXXOOXOOXOXOXXOXOOXXOXOOXOXOXOXXXOOXOXOOXXOOXOXOXOOXOXXXOXOXOXXOXOOXOXOXOXOOXXOOXOXOXOXXOOXXOXOOXOOXOXXOXXOXOXXOXOOXOOXXOOXXOXOOOXXOXOOXXOX".split("");
        const puzzleData = puzzles.easy37;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 38", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOOXOXXOOXOXOXXOXOOXXOOXOOXXOXXOOXXOXXOXOXOOXXOOXOXOXOOXXOOXOOXOXOXXOOXXOXOXOXXOXXOOXOXXOXOOXOXOXOXOXOOXOOXXOXOOXOXXOXOXXXOXOXOOXOXOXOXOXOXOXOXOOXOXOOXXOXOXOOXXOXOOXXOXXXOOXOXXOOXOOXOOXXOXOXXO".split("");
        const puzzleData = puzzles.easy38;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 39", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOXOXOXOOXOXOOXOXXOXXOOXXXOXOOXXOOXOOXXOOXOOXXOXOOXOXOXOXOXXXOOXXOOXOXXOXXOXOXXOOXOOOXXOXOXOXOOXXOOXXOOXOOXXXXOXOXOXOXOOOXXOOXXOXXOOOOXOXOOXXOXXXOOXOXXOOXXOOXOOXXOXOXOXXOXXOOXOXOXOOXOXOXOXXOXO".split("");
        const puzzleData = puzzles.easy39;
        test(solution, puzzleData);
    });

    it("solves puzzle easy 40", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XXOXXOOXOXOOXOOXOXXOOXOXOOXOXXOOXOXXXXOXOOXXOXOOXOXOXOOXOXOXOXOXOXOOXOXXOXOOXOXXOXXOXOXOXOOXXOOXXOXXOXOOXOOXOXOXOOXXOXXOOXOOXXOXOXXOXOXOXOXOXOOXOOXXOXXOXOXOOXOXXOOXOXXOXOXOOXXOXOOXOXXOOXXOXOXO".split("");
        const puzzleData = puzzles.easy40;
        test(solution, puzzleData);
    });

    it("solves puzzle medium 1", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOOXOOXXXOOXXOXOOXXOOXOXXOXOOXOXOXOXXOXOXOXOXOOXOXXOOXXOOXOXOXXOXOOXXOOXOXXOXXOO".split("");
        const puzzleData = puzzles.medium1;
        test(solution, puzzleData);
    });

    it("solves puzzle medium 2", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "OXXOOXOXXOXOXOOXOXOXOXXOXOXXOXOOOOXOXOXXOXOXXOOXXOOXOXXOXOXOXOXOOXOXOXOXXXOOXOXO".split("");
        const puzzleData = puzzles.medium2;
        test(solution, puzzleData);
    });

    it("solves puzzle medium 3", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XXOXOXOOXOXXOOXOOXOOXXOXOOXXOOXXXOXOOXXOXXOOXXOOOXOXXOOXOOXXOXXOXOXOXOOXOXOOXOXX".split("");
        const puzzleData = puzzles.medium3;
        test(solution, puzzleData);
    });

    it("solves puzzle hard 1", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "XOXXOOXOOXOXOXXOOXXOXXOOXXOOXOOOXXOOXXOXOXOXXOXOOXXOXOOXOXXOXOOXOXXOXOOXXOXOOXOXXXOOXOXOOXXOOXOXOXXOOXXOOXOOXXOXXOXOXXOOXOOXOXXOOXOOXOXXOXXO".split("");
        const puzzleData = puzzles.hard1;
        test(solution, puzzleData);
    });

    it("solves puzzle hard 40", () => {
        // tslint:disable-next-line:max-line-length
        const solution = "".split("");
        const puzzleData = puzzles.hard40;
        test(solution, puzzleData);
    });
});
