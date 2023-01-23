let counter = 0;
let tracker = new Array(9).fill('');
let isGameOver = false;
const winningCombo = [
    // Horizontal winning combos
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical winning combos
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal winning combos
    [0, 4, 8],
    [2, 4, 6]
];

function cellWasClicked() {
    if (isGameOver) {
        return;
    }
    if (this.innerText === 'X' || this.innerText === 'O') {
        return;
    }

    const elementIndex = parseInt(this.dataset.index);
    let player = 'X';
    counter++;
    
    if (counter % 2 === 0) {
        player = 'O';
    }

    tracker[elementIndex] = player;
    this.innerText = player;

    if (counter >= 5) {
        checkForWinner(player)
    }
}

function checkForWinner(player) {
    let playerIndexes = [];

    for (let index = 0; index < tracker.length; index++) {
        const mark = tracker[index];
        
        if (mark === player) {
            playerIndexes.push(index);
        }
    }

    let foundWinningCombo;
    for (const combo of winningCombo) {
        let matchesFound = 0;

        for (const index of combo) {
            if (!playerIndexes.includes(index)) {
                break;
            }
            matchesFound++;
        }

        if (matchesFound === 3) {
            // WE FOUND A WINNING COMBO!
            foundWinningCombo = combo;
            break;
        }
    }

    if (!foundWinningCombo) {
        if (counter === 9) {
            announceDraw();
        }
        return;
    }

    announceWinner(player, foundWinningCombo);
}

function announceWinner(player, combo) {
    const statusText = document.querySelector('#status');

    statusText.innerText = `Player ${player} has won the game!`;

    for (const index of combo) {
        const cell = document.querySelector(`#cell-${index}`);

        cell.classList.add('active');
    }
    endGame();
}

function announceDraw() {
    const statusText = document.querySelector('#status');

    statusText.innerText = 'Game has ended in a draw';

    endGame();
}

function endGame() {
    const restartButton = document.querySelector('#reset');
    
    restartButton.classList.add('active');
    isGameOver = true;
}

function restartGame() {
    const restartButton = document.querySelector('#reset');
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('#status');

    cells.forEach(
        (cell) => {
            cell.innerText = '';
            cell.classList.remove('active');
        }
    );

    restartButton.classList.remove('active');
    statusText.innerText = '';
    tracker = new Array(9).fill('');
    counter = 0;
    isGameOver = false;
}

function main() {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.querySelector('#reset');

    restartButton.addEventListener('click', restartGame);
    cells.forEach(
        (cell) => {
            cell.addEventListener('click', cellWasClicked)
        }
    );
}

window.onload = main();