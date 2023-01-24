window.addEventListener('DOMContentLoaded', () =>{
   const tiles = Array.from(document.querySelectorAll('.tile'));
   const playerDisplay = Array.from(document.querySelectorAll('.player-display'));
   const resetButton = Array.from(document.querySelectorAll('.#reset'));
   const announcer = Array.from(document.querySelectorAll('.announcer'));

   let board = ['','','','','','','','',''];
   let currentPlayer = 'X';
   isGameActive = true;

   const PLAYERX_WON = 'PLAYER X WON';
   const PLAYERO_WON = 'PLAYER O WON';
   const TIE = 'TIE';

   resetButton.addEventListener('click', resetBoard);

   const winningConditions = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6],

   ];

   const changePlayer = () =>{
    playerDisplay.classList.remove(`Player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X'  ? 'O' : 'X';
    playerDisplay.innerText =currentPlayer;
    playerDisplay.classList.add(`Player${currentPlayer}`)
   }

   const usrAction = (tile, index) =>{
    if(isValidAction(tile) && isGameActive){
        tile.innerText = currentPlayer;
        tile.classList.add(`Player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
   }
});