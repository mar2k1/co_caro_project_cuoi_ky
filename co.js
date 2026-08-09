const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restart = document.querySelector('#restart');
const pvp = document.querySelector('#pvp');
const pve = document.querySelector('#pve');
const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "O";
let gameMode = "pvp";
let running = false;

initGame();

function initGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restart.addEventListener('click', restartGame);
    pvp.addEventListener('click', () => setGameMode('pvp'));
    pve.addEventListener('click', () => setGameMode('pve'));
    statusText.innerHTML = `Đến lượt của: ${currentPlayer}`;
    running = true;
}

function setGameMode(mode) {
    if (gameMode === mode) return;
    gameMode = mode;
    pvp.classList.toggle('active', mode === 'pvp');
    pve.classList.toggle('active', mode === 'pve');
    restartGame();
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');
    if (options[cellIndex] !== "" || !running || (gameMode === 'pve' && currentPlayer === 'O')) {
    return;
    }
    makeMove(this, cellIndex);
    if (gameMode === 'pve' && running && currentPlayer === 'O') {
        setTimeout(computerMove, 400);
    }
}

function makeMove(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    checkWinner();
}

function computerMove() {
    if (!running) return;
    let move = findBestMove('X');
    if (move === -1) move = findBestMove('O');
    if (move === -1 && options[4] === "") move = 4;
    if (move === -1) {
        const
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = (currentPlayer === "O") ? "X" : "O";
    statusText.innerHTML = `Đến lượt của: ${currentPlayer}`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
    if (cellA === "" || cellB === "" || cellC === "") {
        continue;
    }
    if (cellA === cellB && cellB === cellC) {
        roundWon = true;
        break;
    }
}
    if (roundWon) {
        statusText.textContent = `Người chơi ${currentPlayer} chiến thắng!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "Hòa nhau!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "O";
    options = ["","","","","","","","",""];
    statusText.innerHTML = `Đến lượt của: <span id="turn">O</span>`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
    running = true;
}