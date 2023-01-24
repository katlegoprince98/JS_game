window.addEventListener('DOMContentLoaded', () =>{
   const tiles = Array.from(document.querySelectorAll('.tile'));
   const playerDisplay = document.querySelectorAll('.player-display');
   const resetButton = document.querySelectorAll('.#reset');
   const announcer = document.querySelectorAll('.announcer');

   let board = ['','','','','','','','',''];
   let currentPlayer = 'X';
   isGameActive = true;

   const PLAYERX_WON = 'PLAYER X WON';
   const PLAYERO_WON = 'PLAYER O WON';
   const TIE = 'TIE';



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

   function handleResultValidation() {
    let roundWom = false;
    for(let i = 0;i<=7;i++){
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if(a === '' || b === '' || c == ''){
            continue;
        }
        if(a === b && b===c){
            roundWom = true;
            break;
        }

    }
    if(roundWom){
        announce(currentPlayer == 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    if(!board.includes('')){
      announce('TIE');
}
   }

   const announce = (type)  =>{
    switch(type){
        case PLAYERO_WON:
            announce.innerText = 'Congradutions player<span class= "playerO">O</span> you won';
            break; 
            case PLAYERX_WON:
                announce.innerText = 'Congradutions player<span class= "playerX">X</span> you won';
                break;
                case TIE:
                    announce.innerText = 'TIE';
                    break
    }
    announcer.classList.remove('hide');
   };
    
    const isValidAction =(tile) =>{
        if(tile.innerText === 'X' ||tile.innerText === 'O' ){
            return false;
        }
        return true;
    }

   const updateBoard = (index) =>{
    board[index] = currentPlayer;
   }

   const changePlayer = () =>{
    playerDisplay.classList.remove(`Player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X'  ? 'O' : 'X';
    playerDisplay.innerText =currentPlayer;
    playerDisplay.classList.add(`Player${currentPlayer}`)
   }

   const userAction = (tile, index) =>{
    if(isValidAction(tile) && isGameActive){
        tile.innerText = currentPlayer;
        tile.classList.add(`Player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
   }

   const resetBoard = () =>{
    board = ['','','','','','','','',''];
    isGameActive = true;
    announcer.classList.add('hide');

    if(currentPlayer === 'O'){
        changePlayer();
    }

    tiles.forEach(tile => {
         tiles.innerText = '';
         tile.classList.remove('playerX');
         tile.classList.remove('playerO');
    });
   }


   tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
   });
   resetButton.addEventListener('click', resetBoard);
});