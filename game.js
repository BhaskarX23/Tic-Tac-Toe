function resetGameStatus()
{
    activePlayer=0;
    currentRound=1;
    gameIsOver=false;
    gameOverElement.style.display='none';
    let gameBoardIndex=0;
    for(let i=0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            gameData[i][j]=0;
            gameFieldElements[gameBoardIndex].textContent='';
            gameFieldElements[gameBoardIndex].classList.remove('disabled');
            gameBoardIndex++;
        }
    }
    
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please enter player name(s)');
        return;
    }

    resetGameStatus(); 

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}



function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    }
    else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field');
        return;
    }
    if(gameIsOver)
    {
        alert('Game is over');
        return;
    }
    selectedField.textContent = players[activePlayer].symbol;  //players[0]
    selectedField.classList.add('disabled');


    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    const winnerId=checkForGameOver();
    // console.log(winnerId);
    if(winnerId!==0)
    {
        endGame(winnerId);
    }
    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    // Checking the rows for equality
    for(let i=0;i<3;i++)
    {
        if (gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2]) 
            {
            return gameData[i][0];
        }
    }
    // Checking the columns for equality
    for(let i=0;i<3;i++)
    {
        if (gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]) 
             {
            return gameData[0][i];
        }
    }

    if( gameData[0][0]>0 &&
        gameData[0][0]===gameData[1][1] && 
        gameData[1][1]===gameData[2][2])
    {
        return gameData[0][0];
    }
    
    if( gameData[0][2]>0 &&
        gameData[0][2]===gameData[1][1] && 
        gameData[1][1]===gameData[2][0])
    {
        return gameData[0][2];
    }
    if(currentRound===9)
    {
        return -1;
    }
    return 0;
}


function endGame(winnerId)
{
    gameIsOver=true;
    gameOverElement.style.display='block';
    if(winnerId>0)
    {
        document.getElementById('winner-name').textContent=players[winnerId-1].name;

    }
    else
    {
        document.querySelector('#game-over h2').textContent="It's a draw!";
    }
}