import { Board } from "./board";
import * as puzzles from "./puzzles";
import { StepManager } from "./stepManager";

const windowSearch = window.location.search;
const boardElement = document.getElementById("tic-tac-puzzle");
const stepElement = document.getElementById("step-text");
const start = document.getElementById("start");

function createBoard(board) {
    boardElement.className = `width-${board.width}`;
    for (let i = 0; i < board.width * board.height; i++) {
        const subElement = document.createElement("div");
        subElement.className = "spot";
        boardElement.appendChild(subElement);
    }
}

function updateSpot(board, index, manager) {
    const spots = boardElement.getElementsByClassName("spot");
    if (spots && spots[index]) {
        const spot = spots[index];
        (spot as HTMLElement).innerText = board.value(index);
        const flag = manager.flag(index);
        spot.className = `spot ${flag ? flag : ""}`;
    }
}

function updateStep(manager) {
    if (manager.stepText()) {
        stepElement.innerText = manager.stepText();
    }
}

function updateAllSpots(board, manager) {
    for (let i = 0; i < board.width * board.height; i++) {
        updateSpot(board, i, manager);
    }
}

if (windowSearch) {
    let puzzleName;
    if (windowSearch.split("p=").length > 1) {
        puzzleName = windowSearch.split("p=")[1].split("&")[0];
    }

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

        start.addEventListener("click", () => {
            const interval = setInterval(() => {
                manager.takeStep();
                updateAllSpots(board, manager);
                updateStep(manager);

                if (manager.done()) {
                    clearInterval(interval);
                }
            }, 100);
        });
    }
}
