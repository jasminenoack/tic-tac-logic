import { Board } from "./board";
import { ComparisonManager } from "./comparisonManager";
import { IndexManager } from "./indexManager";

interface IConsecutivePairs {
    checkEmpty: number[];
    columns: number[][];
    currentPair: number[];
    currentType: string;
    insertOpposite: number[];
    rows: number[][];
}

interface IStep {
    consecutivePairs: IConsecutivePairs;
    madeAChange: boolean;
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
                currentType: "",
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
        this.state.madeAChange = false;
    }

    public currentStep() {
        if (
            this.state.consecutivePairs.rows.length ||
            this.state.consecutivePairs.columns.length ||
            this.state.consecutivePairs.currentType
        ) {
            return "consecutivePairs";
        }
    }

    public takeStep() {
        switch (this.currentStep()) {
            case "consecutivePairs":
                this.takeConsecutivePairsStep();
                break;
        }
    }

    public resetConsecutivePairs() {
        this.state.consecutivePairs.currentType = "";
        this.state.consecutivePairs.currentPair = [];
        this.state.consecutivePairs.insertOpposite = [];
        this.state.consecutivePairs.checkEmpty = [];
    }

    private takeConsecutivePairsStep() {
        if (this.state.consecutivePairs.currentPair.length) {
            const pair = this.state.consecutivePairs.currentPair;
            const spots = this.board.spots;
            if (this.state.consecutivePairs.insertOpposite.length) {
                console.log("INSERT OPPOSITE");
            } else if (this.state.consecutivePairs.checkEmpty.length) {
                console.log("CHECK EMPTY");
            } else if (ComparisonManager.compareTwo(spots[pair[0]], spots[pair[1]])) {
                this.state.consecutivePairs.checkEmpty = IndexManager.getNeighbors(
                    pair, this.state.consecutivePairs.currentType, this.board.width, this.board.height,
                );
            } else {
                this.resetConsecutivePairs();
            }
        } else if (this.state.consecutivePairs.rows.length) {
            this.state.consecutivePairs.currentPair = this.state.consecutivePairs.rows.shift();
            this.state.consecutivePairs.currentType = "row";
        } else if (this.state.consecutivePairs.columns.length) {
            this.state.consecutivePairs.currentPair = this.state.consecutivePairs.columns.shift();
            this.state.consecutivePairs.currentType = "column";
        }
    }
}
