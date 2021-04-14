let gameStatus = true ;
let currentPlayer = 'X' ;
let gameBoard = ['', '', '', '', '', '', '', '', '',] ;
const display = document.querySelector('.game-status');

//set hiển thị thông báo
const winMessage = () => `Player ${currentPlayer} won` ;
const drawMessage = () => `Game draw!` ;
const playerTurn = () => `It's ${currentPlayer} turn` ;

display.innerHTML = playerTurn() ;

//điều kiện thắng
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
const arr = [1,2,5,1,5,8,4,5] ;

// xử lí người chơi đã click vào ô
function cellClicked(clicked, clickedCellDataIndex) {
    gameBoard[clickedCellDataIndex] = currentPlayer ;
    clicked.innerHTML = currentPlayer ;

}
// xử lí tới lượt người chơi
function playerClicked() {
    currentPlayer = currentPlayer === 'X' ? 'O' :'X';
    display.innerHTML = playerTurn();

}
// xử lí chiến thắng trò chơi
function handleResult() {
    let win = false ;
    for( let i = 0 ; i <= 7 ; i++ ) {
        const winCondition = winningConditions[i];
        if(gameBoard[winCondition[0]]=== '' || gameBoard[winCondition[1]] === '' || gameBoard[winCondition[2]] === '') {
            continue;
        }
        if(gameBoard[winCondition[0]] === gameBoard[winCondition[1]] && gameBoard[winCondition[1]] === gameBoard[winCondition[2]]) {
            win = true ;
            break ;
        }
    }
    
        if(win) {
            display.innerHTML = winMessage() ;
            gameStatus = false ;
            return ;
        }

        let draw = !gameBoard.includes('');
        if(draw) {
            display.innerHTML = drawMessage() ;
            gameStatus = false ;
            return;
        }

    playerClicked();
}
// xử lí click vào ô
function handleClick(e) {
    const clicked = e.target ;

    const clickedCellDataIndex = parseInt(clicked.getAttribute('data-cell-index')) ;
    console.log(clickedCellDataIndex) ;

    if (gameBoard[clickedCellDataIndex] !== '' || !gameStatus) {
        return ;
    }
    cellClicked(clicked, clickedCellDataIndex);
    handleResult();

}
// xử lí restart lại trò chơi
function restartGame() {
    gameStatus = true;
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    display.innerHTML = playerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}



document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
document.querySelector('.game-restart').addEventListener('click', restartGame);