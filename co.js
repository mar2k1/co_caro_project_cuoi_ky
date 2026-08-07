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
