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

interface IOneGroup {
    blanks: number[];
    columns: number[];
    count: { [key: string]: number };
    currentIndex: number | null;
    currentType: string;
    insertInto: number[];
    mainValue: string;
    neighbors: number[];
    rows: number[];
}

interface IMultiGroup {
    columns: number[];
    groups: number[][];
    higherCount: number;
    higherValue: string;
    currentIndex: number | null;
    currentType: string;
    insertInto: number[];
    lowerCount: number;
    lowerValue: string;
    rows: number[];
}

interface IStep {
    consecutivePairs: IComparisonStep;
    oneSep: IComparisonStep;
    madeAChange: boolean;
    multiGroup: IMultiGroup;
    oneGroup: IOneGroup;
}

const consecutivePairs = "consecutivePairs";
const oneSep = "oneSep";
const oneGroup = "oneGroup";
const multiGroup = "multiGroup";

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
            multiGroup: {
                columns: [],
                currentIndex: null,
                currentType: "",
                groups: [],
                higherCount: null,
                higherValue: "",
                insertInto: [],
                lowerCount: null,
                lowerValue: "",
                rows: [],
            },
            oneGroup: {
                blanks: [],
                columns: [],
                count: {},
                currentIndex: null,
                currentType: "",
                insertInto: [],
                mainValue: "",
                neighbors: [],
                rows: [],
            },
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

        const rows = [];
        const columns = [];
        for (let i = 0; i < this.board.height; i++) {
            rows.push(i);
        }
        for (let i = 0; i < this.board.width; i++) {
            columns.push(i);
        }
        this.state.oneGroup.rows = rows.slice();
        this.state.oneGroup.columns = columns.slice();

        this.state.multiGroup.rows = rows.slice();
        this.state.multiGroup.columns = columns.slice();

        this.state.madeAChange = false;
    }

    public flag(index) {
        switch (this.currentStep()) {
            case consecutivePairs:
                return this.getFlagFromCompareData(this.state.consecutivePairs, index);
            case oneSep:
                return this.getFlagFromCompareData(this.state.oneSep, index);
            case oneGroup:
                return this.getFlagFromGroupData(this.state.oneGroup, index);
            case multiGroup:
                return this.getFlagFromGroupData(this.state.multiGroup, index);
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
        } else if (
            this.checkGroupStep(this.state.oneGroup)
        ) {
            return oneGroup;
        } else if (
            this.checkGroupStep(this.state.multiGroup)
        ) {
            return multiGroup;
        }
    }

    public checkGroupStep(data) {
        return data.rows.length ||
            data.columns.length ||
            data.currentIndex !== null;
    }

    public checkCompareStep(data) {
        return data.rows.length ||
            data.columns.length ||
            data.currentType ||
            data.currentPair.length;
    }

    public done() {
        let filled = true;
        this.board.spots.forEach((spot) => {
            if (!spot.get()) {
                filled = false;
            }
        });
        return filled || !(this.currentStep() || this.state.madeAChange);
    }

    public stepText() {
        switch (this.currentStep()) {
            case consecutivePairs:
                // tslint:disable-next-line:max-line-length
                return "If squares next to each other both have the same value the squares on either side should be the opposite value.";
            case oneSep:
                // tslint:disable-next-line:max-line-length
                return "If two squares with one square between them have the same value the square between them should be the opposite value";
            case oneGroup:
                // tslint:disable-next-line:max-line-length
                return "If there is only one value left in a row, it should be filled in. If there is a group of blanks where 3 of the same value and one of the other value need to be placed. The value there is 3 of goes on the outsides.";
            case multiGroup:
                // tslint:disable-next-line:max-line-length
                return "If in a series of groups some require a value. If the number of times the value is required is equal to the number to place any other groups are the other value.";
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
            case oneGroup:
                this.takeOneGroupStep();
                break;
            case multiGroup:
                this.takeMultiGroupStep();
                break;
            default:
                if (this.state.madeAChange) {
                    this.setUp();
                }
        }
    }

    public takeOneGroupStep() {
        const data = this.state.oneGroup;
        if (data.currentIndex !== null) {
            this.processCurrentOneGroup(data);
        } else {
            this.groupFindNext(data);
        }
    }

    public takeMultiGroupStep() {
        const data = this.state.multiGroup;
        if (data.currentIndex !== null) {
            this.processMultiGroup(data);
        } else {
            this.groupFindNext(data);
        }
    }

    public groupFindNext(data) {
        if (data.rows.length) {
            data.currentIndex = data.rows.shift();
            data.currentType = "row";
        } else if (data.columns.length) {
            data.currentIndex = data.columns.shift();
            data.currentType = "column";
        }
    }

    public processCurrentOneGroup(data) {
        if (data.insertInto.length) {
            this.insert(data.insertInto, data.mainValue);
            this.resetOneGroup();
        } else if (Object.keys(data.count).length) {
            this.groupDetermineInsert(data);
        } else if (data.blanks.length) {
            this.groupProcessBlanks(data);
        } else {
            this.oneGroupGetBlanks(data);
        }
    }

    public insert(indexes, value) {
        let changed = false;
        indexes.forEach((index) => {
            if (!this.board.value(index)) {
                this.board.setSpot(value, index);
                changed = true;
            }
        });
        if (changed) {
            this.state.madeAChange = true;
        }
    }

    public processMultiGroup(data) {
        if (data.insertInto.length) {
            this.insert(data.insertInto, data.higherValue);
            this.resetMultiGroup(data);
        } else if (data.groups.length) {
            this.checkForInsertsMultiGroup(data);
        } else {
            this.multiGroupGetBlanks(data);
        }
    }

    public checkForInsertsMultiGroup(data) {
        let countGroupsHigher3 = 0;
        // inserts from greater than 3s
        data.groups.forEach((group) => {
            if (group.length > 2) {
                countGroupsHigher3++;
            }
        });
        if (countGroupsHigher3 === data.lowerCount) {
            data.groups.forEach((group) => {
                if (group.length <= 2) {
                    data.insertInto = data.insertInto.concat(group);
                }
            });
        }

        // find inserts for groups of 2
        let countGroupsHigher2 = countGroupsHigher3;
        data.groups.forEach((group) => {
            if (group.length === 2) {
                const neighbors = IndexManager.getNeighbors(
                    group, data.currentType, this.board.width, this.board.height,
                );
                let surrounded = false;
                neighbors.forEach((neighbor) => {
                    if (this.board.value(neighbor) === data.higherValue) {
                        surrounded = true;
                    }
                });
                if (surrounded) {
                    countGroupsHigher2++;
                }
            }
        });

        if (countGroupsHigher2 === data.lowerCount) {
            data.groups.forEach((group) => {
                if (group.length < 2) {
                    if (data.insertInto.indexOf(group[0]) === -1) {
                        data.insertInto = data.insertInto.concat(group);
                    }
                }
            });
        }

        if (!data.insertInto.length) {
            this.resetMultiGroup(data);
        }
    }

    public groupDetermineInsert(data) {
        const leftOver = data.count;
        if (
            leftOver.o === 0 || leftOver.x === 0
        ) {
            data.insertInto = data.blanks;
        } else if (
            leftOver.o === 1 && leftOver.x > 2
            || leftOver.x === 1 && leftOver.o > 2
        ) {
            data.insertInto = [data.blanks[0], data.blanks[data.blanks.length - 1]];
        } else if (
            (
                data.neighbors[0] && this.board.value(data.neighbors[0]) === data.mainValue
            ) || (
                data.neighbors[1] && this.board.value(data.neighbors[1]) === data.mainValue
            )
        ) {
            data.neighbors.forEach((neighbor) => {
                if (this.board.value(neighbor) === data.mainValue) {
                    if (neighbor < data.blanks[0]) {
                        data.insertInto.push(data.blanks[data.blanks.length - 1]);
                    } else {
                        data.insertInto.push(data.blanks[0]);
                    }
                }
            });
        } else {
            this.resetOneGroup();
        }
    }

    public groupProcessBlanks(data) {
        const leftOver = IndexManager.leftOver(this.board, data.currentType, data.currentIndex);
        const blanksInOrder = IndexManager.blanksInOrder(
            this.board, data.currentType, data.currentIndex,
        );
        const oneLeft = (
            leftOver.o === 1 && leftOver.x > 1
            || leftOver.x === 1 && leftOver.o > 1
        );
        const onlyOne = (
            leftOver.o === 0 || leftOver.x === 0
        );

        if (
            (blanksInOrder && oneLeft) || onlyOne
        ) {
            data.count = leftOver;
            data.neighbors = IndexManager.getNeighbors(
                data.blanks, data.currentType, this.board.width, this.board.height,
            );
            if (data.count.o > data.count.x) {
                data.mainValue = "O";
            } else {
                data.mainValue = "X";
            }
        } else {
            this.resetOneGroup();
        }
    }

    public multiGroupGetBlanks(data) {
        const blanks = IndexManager.blankGroups(this.board, data.currentType, data.currentIndex);
        if (blanks.length) {
            data.groups = blanks;
            const leftOver = IndexManager.leftOver(this.board, data.currentType, data.currentIndex);
            if (leftOver.o > leftOver.x) {
                data.higherValue = "O";
                data.higherCount = leftOver.o;
                data.lowerValue = "X";
                data.lowerCount = leftOver.x;
            } else {
                data.higherValue = "X";
                data.higherCount = leftOver.x;
                data.lowerValue = "O";
                data.lowerCount = leftOver.o;
            }
        } else {
            this.resetMultiGroup(data);
        }
    }

    public resetMultiGroup(data) {
        data.currentIndex = null;
        data.currentType = "";
        data.groups = [];
        data.higherCount = null;
        data.higherValue = "";
        data.insertInto = [];
        data.lowerCount = null;
        data.lowerValue = "";
    }

    public oneGroupGetBlanks(data) {
        const blanks = IndexManager.getBlanks(this.board, data.currentType, data.currentIndex);
        if (blanks.length) {
            data.blanks = blanks;
        } else {
            this.resetOneGroup();
        }
    }

    public resetComparison(data) {
        data.currentType = "";
        data.currentPair = [];
        data.insertOpposite = [];
        data.checkEmpty = [];
    }

    private resetOneGroup() {
        const data = this.state.oneGroup;
        data.blanks = [];
        data.count = {};
        data.currentIndex = null;
        data.currentType = "";
        data.neighbors = [];
        data.mainValue = "";
        data.insertInto = [];
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

    private getFlagFromGroupData(data, index) {
        let blanks = data.blanks || [];
        if (!blanks.length && data.groups && data.groups.length) {
            data.groups.forEach((group) => {
                blanks = blanks.concat(group);
            });
        }

        if (data.insertInto.indexOf(index) !== -1) {
            return flags.insert;
        } else if (
            data.neighbors && data.neighbors.indexOf(index) !== -1
        ) {
            return flags.compare;
        } else if (
            blanks.indexOf(index) !== -1 ||
            (
                !blanks.length && data.currentType &&
                IndexManager.getSectionIndexes(
                    data.currentType, data.currentIndex, this.board.width, this.board.height,
                ).indexOf(index) !== -1
            )
        ) {
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
            this.insert(data.insertOpposite, value);
            this.resetComparison(data);
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
