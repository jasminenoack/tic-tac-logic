import { Board } from "./board";
import { IndexManager } from "./indexManager";

interface IConsecutivePairs {
    checkEmpty: number[];
    columns: number[][];
    currentPair: number[];
    insertOpposite: number[];
    rows: number[][];
}

interface IStep {
    consecutivePairs: IConsecutivePairs;
    madeAChange: true;
}

export class StepManager {
    public state: IStep;

    constructor(public board: Board) {
        this.resetState();
    }

    public resetState() {
        this.state = {
            consecutivePairs: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                insertOpposite: [],
                rows: [],
            },
            madeAChange: true,
        };
    }

    public setUp() {
        this.resetState();
        this.state.consecutivePairs.rows = IndexManager.getConsecutiveRowPairs(
            this.board.width,
            this.board.height,
        );
        this.state.consecutivePairs.columns = IndexManager.getConsecutiveColumnPairs(
            this.board.width,
            this.board.height,
        );
    }
}
