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
        const emptyIndices = options.map((v,i) => v === "" ? i : null).filter(v => v!== null);
        move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
    if (move !== undefined && move !== -1) {
        const targetCell = document.querySelector(`.cell[data-index="${move}"]`);
        makeMove(targetCell,move);
    }
}

function findBestMove(player) {
    for (let pattern of winConditions) {
        const [a, b, c] = pattern;
        const values = [options[a],options[b],options[c]];
        if (values.filter(v => v === player).length === 2 && values.includes("")) {
            return pattern[values.indexOf("")];
        }
    }
    return -1;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "O") ? "X" : "O";
    const name = (gameMode === 'pve' && currentPlayer === 'X') ? "Máy (O)" : currentPlayer;
    statusText.innerHTML = `Đến lượt của: ${name}`;
}

function checkWinner() {
    let roundWon = false;
    for (let condition of winConditions) {
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
    if (cellA === "" || cellB === "" || cellC === "") continue;
    if (cellA === cellB && cellB === cellC) {
        roundWon = true;
        break;
    }
}
    if (roundWon) {
        const winnerName = (gameMode === 'pve' && currentPlayer === 'O') ? "Máy" : `Người chơi ${currentPlayer}`;
        statusText.textContent = `${winnerName} chiến thắng!`;
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