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

const consecutivePairs = "consecutivePairs";

const flags = {
    active: "current",
    compare: "compare",
    insert: "insert",
};

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

    public flag(index) {
        switch (this.currentStep()) {
            case consecutivePairs:
                const consecData = this.state.consecutivePairs;
                if (consecData.insertOpposite.indexOf(index) !== -1) {
                    return flags.insert;
                } else if (consecData.checkEmpty.indexOf(index) !== -1) {
                    return flags.compare;
                } else if (consecData.currentPair.indexOf(index) !== -1) {
                    return flags.active;
                }
                break;
        }
    }

    public currentStep() {
        if (
            this.state.consecutivePairs.rows.length ||
            this.state.consecutivePairs.columns.length ||
            this.state.consecutivePairs.currentType ||
            this.state.consecutivePairs.currentPair.length
        ) {
            return consecutivePairs;
        }
    }

    public takeStep() {
        switch (this.currentStep()) {
            case consecutivePairs:
                this.takeConsecutivePairsStep();
                break;
            default:
                if (this.state.madeAChange) {
                    this.setUp();
                }
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
            this.handleCurrentConsecutivePair();
        } else if (this.state.consecutivePairs.rows.length) {
            this.state.consecutivePairs.currentPair = this.state.consecutivePairs.rows.shift();
            this.state.consecutivePairs.currentType = "row";
        } else if (this.state.consecutivePairs.columns.length) {
            this.state.consecutivePairs.currentPair = this.state.consecutivePairs.columns.shift();
            this.state.consecutivePairs.currentType = "column";
        }
    }

    private handleCurrentConsecutivePair() {
        const pair = this.state.consecutivePairs.currentPair;
        const spots = this.board.spots;
        if (this.state.consecutivePairs.insertOpposite.length) {
            const value = this.board.value(pair[0]) === "O" ? "X" : "O";
            this.state.consecutivePairs.insertOpposite.forEach((index) => {
                this.board.setSpot(value, index);
            });
            this.resetConsecutivePairs();
            this.state.madeAChange = true;
        } else if (this.state.consecutivePairs.checkEmpty.length) {
            const empty = this.state.consecutivePairs.checkEmpty;
            empty.forEach((index) => {
                if (!this.board.value(index)) {
                    this.state.consecutivePairs.insertOpposite.push(index);
                }
            });
            if (!this.state.consecutivePairs.insertOpposite.length) {
                this.resetConsecutivePairs();
            }
        } else if (ComparisonManager.compareTwo(spots[pair[0]], spots[pair[1]])) {
            this.state.consecutivePairs.checkEmpty = IndexManager.getNeighbors(
                pair, this.state.consecutivePairs.currentType, this.board.width, this.board.height,
            );
        } else {
            this.resetConsecutivePairs();
        }
    }
}
