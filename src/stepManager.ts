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

interface ICompareSections {
    columns: number[][];
    compareFirst: number[];
    compareSecond: number[];
    first: number;
    firstCount: { [key: string]: number };
    rows: number[][];
    second: number;
    secondCount: { [key: string]: number };
    type: string;
    insertPatterns: Array<{ [index: number]: string }>;
}

interface IStep {
    compareSections: ICompareSections;
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
const compareSections = "compareSections";

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
            compareSections: {
                columns: [],
                compareFirst: [],
                compareSecond: [],
                first: null,
                firstCount: {},
                insertPatterns: [],
                rows: [],
                second: null,
                secondCount: {},
                type: "",
            },
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

        this.state.compareSections.rows = IndexManager.sectionComparisonMatches(this.board.height);
        this.state.compareSections.columns = IndexManager.sectionComparisonMatches(this.board.width);
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
            case compareSections:
                return this.getFlagFromCompareSection(this.state.compareSections, index);
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
        } else if (
            this.checkCompareSectionStep(this.state.compareSections)
        ) {
            return compareSections;
        }
    }

    public checkCompareSectionStep(data) {
        return data.columns.length || data.rows.length || data.first !== null;
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
            case compareSections:
                // tslint:disable-next-line:max-line-length
                return "Two rows or columns can't be the same. So if we have 2 columns one with all of a value one missing one and they match. Then we know that last spot must be the opposite value";
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
            case compareSections:
                this.takeCompareSectionStep();
                break;
            default:
                if (this.state.madeAChange) {
                    this.setUp();
                }
        }
    }

    public takeCompareSectionStep() {
        const data = this.state.compareSections;
        if (data.first !== null) {
            this.processCompareSectionStep(data);
        } else {
            this.nextCompareStep(data);
        }
    }

    public checkIfValidCompareSections(data, value) {
        // check that there is a 1 -- 0 relationship
        if (
            value === "X" &&
            !(
                (data.firstCount.x === 0 && data.secondCount.x === 1)
                || (data.firstCount.x === 1 && data.secondCount.x === 0)
            )
        ) {
            return false;
        }
        if (
            value === "O" &&
            !(
                (data.firstCount.o === 0 && data.secondCount.o === 1)
                || (data.firstCount.o === 1 && data.secondCount.o === 0)
            )
        ) {
            return false;
        }
        // check if the sections already conflict
        const firstIndexes = IndexManager.getSectionIndexes(
            data.type, data.first, this.board.width, this.board.height,
        );
        const secondIndexes = IndexManager.getSectionIndexes(
            data.type, data.second, this.board.width, this.board.height,
        );
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < firstIndexes.length; i++) {
            const firstValue = this.board.value(firstIndexes[i]);
            const secondValue = this.board.value(secondIndexes[i]);
            if (firstValue && secondValue && firstValue !== secondValue) {
                return false;
            }
        }
        return true;
    }

    public findLocationToInsertFromComparison(value, data) {
        const firstIndexIndexes = IndexManager.indexIndexesForValue(
            this.board, data.type, data.first, value,
        );
        const secondIndexIndexes = IndexManager.indexIndexesForValue(
            this.board, data.type, data.second, value,
        );

        const union = [];
        let difference = [];

        while (firstIndexIndexes.length && secondIndexIndexes.length) {
            const firstIndex = firstIndexIndexes[0];
            const secondIndex = secondIndexIndexes[0];
            if (firstIndex === secondIndex) {
                union.push(firstIndexIndexes.shift());
                secondIndexIndexes.shift();
            } else if (firstIndex < secondIndex) {
                difference.push(firstIndexIndexes.shift());
            } else {
                difference.push(secondIndexIndexes.shift());
            }
        }
        difference = difference.concat(firstIndexIndexes).concat(secondIndexIndexes);
        if (difference.length === 1) {
            const firstIndexes = IndexManager.getSectionIndexes(
                data.type, data.first, this.board.width, this.board.height,
            );
            const secondIndexes = IndexManager.getSectionIndexes(
                data.type, data.second, this.board.width, this.board.height,
            );
            const diffIndex = difference[0];
            if (!this.board.value(firstIndexes[diffIndex])) {
                return firstIndexes[diffIndex];
            } else if (!this.board.value(secondIndexes[diffIndex])) {
                return secondIndexes[diffIndex];
            }
        }
    }

    public processCompareSectionStep(data) {
        if (data.insertPatterns.length) {
            data.insertPatterns.forEach((pattern) => {
                this.insert([pattern.index], pattern.value);
            });
            this.resetCompareSectionStep(data);
        } else if (data.first || data.second) {
            if (this.checkIfValidCompareSections(data, "X")) {
                const insertLocation = this.findLocationToInsertFromComparison("X", data);
                if (insertLocation !== undefined) {
                    data.insertPatterns.push({ index: insertLocation, value: "O" });
                }
            }
            if (this.checkIfValidCompareSections(data, "O")) {
                const insertLocation = this.findLocationToInsertFromComparison("O", data);
                if (insertLocation !== undefined) {
                    data.insertPatterns.push({ index: insertLocation, value: "X" });
                }
            }
            if (!data.insertPatterns.length) {
                this.resetCompareSectionStep(data);
            }
        } else {
            this.resetCompareSectionStep(data);
        }
    }

    public nextCompareStep(data) {
        let first;
        let second;
        let type;
        if (data.rows.length) {
            type = "row";
            [first, second] = data.rows.shift();
        } else {
            type = "column";
            [first, second] = data.columns.shift() || [0, 0];
        }

        const firstLeft = IndexManager.leftOver(this.board, type, first);
        const secondLeft = IndexManager.leftOver(this.board, type, second);
        if (
            (first || second) &&
            !(
                (
                    firstLeft.x <= 1 || firstLeft.o <= 1
                ) && (
                    secondLeft.x <= 1 || secondLeft.o <= 1
                ) && (
                    firstLeft.x + firstLeft.o + secondLeft.x + secondLeft.o !== 0
                )
            )
        ) {
            this.nextCompareStep(data);
            return;
        } else if (first || second) {
            data.first = first;
            data.second = second;
            data.type = type;
            data.firstCount = firstLeft;
            data.secondCount = secondLeft;
        } else {
            this.resetCompareSectionStep(data);
        }
    }

    public resetCompareSectionStep(data) {
        data.first = null;
        data.second = null;
        data.type = "";
        data.firstCount = {};
        data.secondCount = {};
        data.insertPatterns = [];
        data.compareFirst = [];
        data.compareSecond = [];
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
        let currentIndex;
        let currentType;
        if (data.rows.length) {
            currentIndex = data.rows.shift();
            currentType = "row";
        } else if (data.columns.length) {
            currentIndex = data.columns.shift();
            currentType = "column";
        }
        if (currentIndex === undefined || !currentType) {
            return;
        }
        if (
            !IndexManager.getBlanks(this.board, currentType, currentIndex).length
        ) {
            this.groupFindNext(data);
        } else {
            data.currentIndex = currentIndex;
            data.currentType = currentType;
        }
    }

    public processCurrentOneGroup(data) {
        if (data.insertInto.length) {
            this.insert(data.insertInto, data.mainValue);
            this.resetOneGroup();
        } else if (Object.keys(data.count).length) {
            this.groupOneDetermineInsert(data);
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
        const possibleInserts = [];
        const needSmallValue = [];

        data.groups.forEach((group) => {
            if (group.length > 2) {
                needSmallValue.push(group);
                return;
            }
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
                    needSmallValue.push(group);
                    return;
                }
            }
            possibleInserts.push(group);
        });

        // look at the groups for insert starting at 1 from the end.
        // If two groups are separated by 1 and the center matches
        // the value we need a lot of then we can create a group with the two
        // in need smaller values.
        for (let i = possibleInserts.length - 2; i >= 0; i--) {
            // if we've removed the next number
            if (!possibleInserts[i + 1]) {
                continue;
            }
            // if they aren't groups of 1
            if (possibleInserts[i].length > 1 || possibleInserts[i + 1].length > 1) {
                continue;
            }
            const indexes = IndexManager.getSectionIndexes(
                data.currentType, data.currentIndex,
                this.board.width, this.board.height,
            );
            // if they aren't separated by 1.
            const firstLocation = indexes.indexOf(possibleInserts[i][0]);
            if (firstLocation + 2 !== indexes.indexOf(possibleInserts[i + 1][0])) {
                continue;
            }
            // if the center isn't the high value
            if (data.higherValue !== this.board.value(indexes[firstLocation + 1])) {
                continue;
            }

            const newGroup = possibleInserts.splice(i, 2);
            needSmallValue.push(newGroup);
        }

        if (
            data.lowerCount
            && needSmallValue.length === data.lowerCount
        ) {
            possibleInserts.forEach((group) => {
                data.insertInto = data.insertInto.concat(group);
            });

            needSmallValue.forEach((group) => {
                if (group.length > 3) {
                    data.insertInto.push(group[0]);
                    data.insertInto.push(group[group.length - 1]);
                } else if (group.length === 3) {
                    const neighbors = IndexManager.getNeighbors(
                        group, data.currentType, this.board.width, this.board.height,
                    );

                    neighbors.forEach((neighbor) => {
                        if (this.board.value(neighbor) === data.higherValue) {
                            if (neighbor < group[0]) {
                                data.insertInto.push(group[group.length - 1]);
                            } else {
                                data.insertInto.push(group[0]);
                            }
                        }
                    });
                }
            });
        }
        if (!data.insertInto.length) {
            this.resetMultiGroup(data);
        }
    }

    public groupOneDetermineInsert(data) {
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

    private getFlagFromCompareSection(data, index) {
        if (data.insertPatterns.length) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.insertPatterns.length; i++) {
                if (index === data.insertPatterns[i].index) {
                    return "insert";
                }
            }
        }
        if (data.first !== null) {
            const indexes = IndexManager.getSectionIndexes(
                data.type, data.first, this.board.width, this.board.height,
            );
            if (indexes.indexOf(index) !== -1) {
                return "current";
            }
        }

        if (data.second !== null) {
            const indexes = IndexManager.getSectionIndexes(
                data.type, data.second, this.board.width, this.board.height,
            );
            if (indexes.indexOf(index) !== -1) {
                return "compare";
            }
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
        const step = this.currentStep();
        let currentPair;
        let currentType;
        if (data.rows.length) {
            currentPair = data.rows.shift();
            currentType = "row";
        } else if (data.columns.length) {
            currentPair = data.columns.shift();
            currentType = "column";
        }

        if (!(currentPair && currentType)) {
            return;
        }
        let comparisonFilled = true;
        currentPair.forEach((index) => {
            if (!this.board.value(index)) {
                comparisonFilled = false;
            }
        });

        let hasEmptyToFill = false;
        switch (step) {
            case oneSep:
                const midIndex = (currentPair[0] + currentPair[1]) / 2;
                if (!this.board.value(midIndex)) {
                    hasEmptyToFill = true;
                }
                break;
            case consecutivePairs:
                const neighbors = IndexManager.getNeighbors(
                    currentPair, currentType, this.board.width, this.board.height,
                );
                neighbors.forEach((index) => {
                    if (!this.board.value(index)) {
                        hasEmptyToFill = true;
                    }
                });
                break;
            default:
                return;
        }
        if (
            currentPair && currentType && !(hasEmptyToFill && comparisonFilled)
        ) {
            this.setNext(data);
        } else {
            data.currentPair = currentPair;
            data.currentType = currentType;
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
