import { Board } from "./board";
import * as puzzles from "./puzzles";
import { StepManager } from "./stepManager";

const windowSearch = window.location.search;
const boardElement = document.getElementById("tic-tac-puzzle");
const stepElement = document.getElementById("step-text");
const start = document.getElementById("start");
const title = document.getElementById("title");
const links = document.getElementById("links");

function createBoard(board) {
    boardElement.className = `width-${board.width}`;
    const rowCounts = document.createElement("div");
    rowCounts.className = "row-counts";
    for (let i = 0; i < board.height; i++) {
        const rowCount = document.createElement("div");
        rowCount.className = "row-count";
        rowCounts.appendChild(rowCount);
    }
    const columnCounts = document.createElement("div");
    columnCounts.className = "column-counts";
    for (let i = 0; i < board.width; i++) {
        const columnCount = document.createElement("div");
        columnCount.className = "column-count";
        columnCounts.appendChild(columnCount);
    }
    boardElement.appendChild(rowCounts);
    boardElement.appendChild(columnCounts);

    const boardWrapper = document.createElement("div");
    boardWrapper.className = "board-wrapper";
    boardElement.appendChild(boardWrapper);
    for (let i = 0; i < board.width * board.height; i++) {
        const subElement = document.createElement("div");
        subElement.className = "spot";
        boardWrapper.appendChild(subElement);
    }
}

function updateSpot(board, index, manager) {
    const spots = boardElement.getElementsByClassName("spot");
    if (spots && spots[index]) {
        const spot = spots[index];
        const value = board.value(index);
        (spot as HTMLElement).innerText = value;
        const flag = manager.flag(index);
        spot.className = `spot ${value} ${flag ? flag : ""}`;
    }
}

function updateStep(manager) {
    if (manager.stepText()) {
        stepElement.innerText = manager.stepText();
    }
}

function updateRowCounts(board) {
    const counts = board.getRowCounts();
    const locations = boardElement.getElementsByClassName("row-count");
    counts.forEach((count, index) => {
        locations[index].innerHTML = `<div class="x">${count.x}</div><div class="o">${count.o}</div>`;
    });
}

function updateColumnCounts(board) {
    const counts = board.getColumnCounts();
    const locations = boardElement.getElementsByClassName("column-count");
    counts.forEach((count, index) => {
        locations[index].innerHTML = `<div class="x">${count.x}</div><div class="o">${count.o}</div>`;
    });
}

function updateAllSpots(board, manager) {
    for (let i = 0; i < board.width * board.height; i++) {
        updateSpot(board, i, manager);
    }
    updateRowCounts(board);
    updateColumnCounts(board);
}

let puzzleName;
puzzleName = windowSearch && windowSearch.split("p=").length > 1
    ? windowSearch.split("p=")[1].split("&")[0]
    : Object.keys(puzzles)[0];

title.innerText = puzzleName;

Object.keys(puzzles).forEach((name) => {
    if (name !== puzzleName) {
        const linkWrapper = document.createElement("div");
        const link = document.createElement("a");
        linkWrapper.appendChild(link);
        link.innerText = name;
        link.href = `/?p=${name}`;
        links.appendChild(linkWrapper);
    }
});

if (puzzleName) {
    const puzzleData = puzzles[puzzleName];
    const board = new Board(
        puzzleData.width,
        puzzleData.height,
        puzzleData.xs,
        puzzleData.os,
    );
    const manager = new StepManager(board);
    createBoard(board);
    updateAllSpots(board, manager);
    updateStep(manager);

    let interval;
    start.addEventListener("click", () => {
        if (!interval) {
            interval = setInterval(() => {
                manager.takeStep();
                updateAllSpots(board, manager);
                updateStep(manager);

                if (manager.done()) {
                    clearInterval(interval);
                }
            }, 100);
        } else {
            clearInterval(interval);
            interval = null;
        }
    });
}
