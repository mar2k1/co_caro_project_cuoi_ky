const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const turnText = document.querySelector('#turn');
const restart = document.querySelector('#restart');

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "O";
let running = false;

initGame();

function initGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restart.addEventListener('click', restartGame);
    statusText.innerHTML = 'Đến lượt của: <span id="turn">${curentPlayer}</span>';
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');
    if (options[cellIndex] !== "" || !running) {
    return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = (currentPlayer === "O") ? "O" : "X";
    statusText.innerHTML = 'Đến lượt của: <span id="turn">${curentPlayer}</span>'
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
    }
    if (cellA === "" || cellB === "" || cellC === "") {
        continue;
    }
    if (cellA === cellB && cellB === cellC) {
        roundWon = true;
        break;
    }
    if (roundWon) {
        statusText.textContent = `Người chơi ${currentPlayer} chiến thắng!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = 'Hòa nhau!';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "O";
    options = ["","","","","","","","",];
    statusText.innerHTML = 'Đến lượt của: <span id="turn">O</span>';
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
    running = true;
}