const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const turnText = document.querySelector('#turn');
const restart = document.querySelector('#restart');

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
let options = ["","","","","","","","","",];
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
    if (options[cellIndex]) !== "" || !running) {
    return;
    }
}
