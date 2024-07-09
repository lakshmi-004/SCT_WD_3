

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');
const toggleModeButton = document.getElementById('toggle-mode');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);
let vsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    if (checkWin()) {
        statusDiv.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        statusDiv.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.innerText = `Player ${currentPlayer}'s turn`;

    if (vsComputer && currentPlayer === 'O') {
        handleComputerMove();
    }
}

function handleComputerMove() {
    const emptyCells = gameState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomCellIndex] = 'O';
    document.querySelector(`.cell[data-index='${randomCellIndex}']`).innerText = 'O';

    if (checkWin()) {
        statusDiv.innerText = "Computer wins!";
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        statusDiv.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    statusDiv.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== null && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.innerText = `Player ${currentPlayer}'s turn`;
}

function toggleMode() {
    vsComputer = !vsComputer;
    toggleModeButton.innerText = vsComputer ? 'Player vs Player' : 'Player vs Computer';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
toggleModeButton.addEventListener('click', toggleMode);

statusDiv.innerText = `Player ${currentPlayer}'s turn`;
