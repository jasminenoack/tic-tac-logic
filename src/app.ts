import { Board } from "./board";
import * as puzzles from "./puzzles";
import { StepManager } from "./stepManager";

const windowSearch = window.location.search;
const element = document.getElementById("tic-tac-puzzle");

function createBoard(board) {
    element.className = `width-${board.width}`;
    for (let i = 0; i < board.width * board.height; i++) {
        const subElement = document.createElement("div");
        subElement.className = "spot";
        element.appendChild(subElement);
    }
}

function updateSpot(board, index) {
    const spots = element.getElementsByClassName("spot");
    if (spots && spots[index]) {
        (spots[index] as HTMLElement).innerText = board.value(index);
    }
}

function updateAllSpots(board) {
    for (let i = 0; i < board.width * board.height; i++) {
        updateSpot(board, i);
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
        createBoard(board);
        updateAllSpots(board);

        const manager = new StepManager(board);

        // setInterval()
    }
}
