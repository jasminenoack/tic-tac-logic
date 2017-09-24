import { Board } from "./board";
import { ComparisonManager } from "./comparisonManager";
import { IndexManager } from "./indexManager";

interface IComparisonStep {
    checkEmpty: number[];
    columns: number[][];
    currentPair: number[];
    currentType: string;
    insertOpposite: number[];
    rows: number[][];
}

interface IStep {
    consecutivePairs: IComparisonStep;
    oneSep: IComparisonStep;
    madeAChange: boolean;
}

const consecutivePairs = "consecutivePairs";
const oneSep = "oneSep";

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
            oneSep: {
                checkEmpty: [],
                columns: [],
                currentPair: [],
                currentType: "",
                insertOpposite: [],
                rows: [],
            },
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
        this.state.oneSep.rows = IndexManager.getOneSepRowPairs(
            this.board.width,
            this.board.height,
        );
        this.state.oneSep.columns = IndexManager.getOneSepColumnPairs(
            this.board.width,
            this.board.height,
        );
        this.state.madeAChange = false;
    }

    public flag(index) {
        switch (this.currentStep()) {
            case consecutivePairs:
                return this.getFlagFromCompareData(this.state.consecutivePairs, index);
            case oneSep:
                return this.getFlagFromCompareData(this.state.oneSep, index);
        }
    }

    public currentStep() {
        if (
            this.checkCompareStep(this.state.consecutivePairs)
        ) {
            return consecutivePairs;
        } else if (
            this.checkCompareStep(this.state.oneSep)
        ) {
            return oneSep;
        }
    }

    public checkCompareStep(data) {
        return data.rows.length ||
            data.columns.length ||
            data.currentType ||
            data.currentPair.length;
    }

    public done() {
        return !(this.currentStep() || this.state.madeAChange);
    }

    public stepText() {
        switch (this.currentStep()) {
            case consecutivePairs:
                // tslint:disable-next-line:max-line-length
                return "For this step we are looking for consecutive squares that have the same value. If we find them we check if the squares on either side are empty. If they are empty then we can insert the opposite symbol into those squares";
            case oneSep:
                // tslint:disable-next-line:max-line-length
                return "For this step we are looking at places where a square is equal to the square 2 away from it. If these are equal the item between must be the opposite or there would be 3 in a row.";
        }
    }

    public takeStep() {
        switch (this.currentStep()) {
            case consecutivePairs:
                this.takeConsecutivePairsStep();
                break;
            case oneSep:
                this.takeOneSepStep();
                break;
            default:
                if (this.state.madeAChange) {
                    this.setUp();
                }
        }
    }

    public resetComparison(data) {
        data.currentType = "";
        data.currentPair = [];
        data.insertOpposite = [];
        data.checkEmpty = [];
    }

    private getFlagFromCompareData(data, index) {
        if (data.insertOpposite.indexOf(index) !== -1) {
            return flags.insert;
        } else if (data.checkEmpty.indexOf(index) !== -1) {
            return flags.compare;
        } else if (data.currentPair.indexOf(index) !== -1) {
            return flags.active;
        }
    }

    private takeConsecutivePairsStep() {
        if (this.state.consecutivePairs.currentPair.length) {
            this.handleCurrentConsecutivePair();
        } else {
            this.setNext(this.state.consecutivePairs);
        }
    }

    private takeOneSepStep() {
        if (this.state.oneSep.currentPair.length) {
            this.handleOneSepPair();
        } else {
            this.setNext(this.state.oneSep);
        }
    }

    private setNext(data) {
        if (data.rows.length) {
            data.currentPair = data.rows.shift();
            data.currentType = "row";
        } else if (data.columns.length) {
            data.currentPair = data.columns.shift();
            data.currentType = "column";
        }
    }

    private handleOneSepPair() {
        this.handleCompareStep(this.state.oneSep);
    }

    private handleCurrentConsecutivePair() {
        this.handleCompareStep(this.state.consecutivePairs);
    }

    private findNodesToCompare(pair, data) {
        switch (this.currentStep()) {
            case consecutivePairs:
                return IndexManager.getNeighbors(pair, data.currentType, this.board.width, this.board.height);
            case oneSep:
                return IndexManager.getBetween(pair, data.currentType);
        }
    }

    private handleCompareStep(data) {
        const pair = data.currentPair;
        const spots = this.board.spots;
        if (data.insertOpposite.length) {
            const value = this.board.value(pair[0]) === "O" ? "X" : "O";
            data.insertOpposite.forEach((index) => {
                this.board.setSpot(value, index);
            });
            this.resetComparison(data);
            this.state.madeAChange = true;
        } else if (data.checkEmpty.length) {
            const empty = data.checkEmpty;
            empty.forEach((index) => {
                if (!this.board.value(index)) {
                    data.insertOpposite.push(index);
                }
            });
            if (!data.insertOpposite.length) {
                this.resetComparison(data);
            }
        } else if (ComparisonManager.compareTwo(spots[pair[0]], spots[pair[1]])) {
            data.checkEmpty = this.findNodesToCompare(pair, data);
        } else {
            this.resetComparison(data);
        }
    }
}
