function GameBoard()
{
    let numberOfRows = 3;
    let numberOfCols = 3;
    let boardArr = [];

    function createBoard()
    {
        for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++)
        {
            boardArr[rowIndex] = [];
            for(let colIndex = 0; colIndex < numberOfCols; colIndex++)
            {
                boardArr[rowIndex][colIndex] = Token()
            }
        }
        return boardArr
    }
    
    // Initialize board once
    const board = createBoard() 
    
    /**
     * function handle userinput and modify the cell value
     */
    function dropTokenInCell(playerToken, row, col)
    {
        // loop through the array and find the cellsValue equal to 0
        // modify the cellvalue from user input
        if(board[row][col].getToken() === 0)
        {
            board[row][col].setToken(playerToken)
            // successful placed token
            return true
        }
        else if(board[row][col].getToken() !== 0)
        {
            console.log(`Unavaliable choose a different cell from ${row}${col}`)
            // cell is occupied
            return false
        }
    }

    function printBoard()
    {
        // print out each cell value in the board
        const printBoardWithCells = board.map((row) => row.map((cell) => cell.getToken()))
        console.table(printBoardWithCells)
        return printBoardWithCells
    }

    function resetBoard()
    {
        const resetBoardWithCell0 = board.forEach((row) => row.forEach((cell) => cell.setToken(0)))
        console.log("Board has been reset")
        return resetBoardWithCell0
    }

    return {dropTokenInCell,printBoard, resetBoard}
}

function Token()
{
    let initToken = 0
    function setToken(token)
    {
        return initToken = token
    }

    function getToken()
    {
        return initToken
    }

    return {setToken, getToken}
}

function GameController()
{
    const gameBoard = GameBoard()
    const playerOne = "Player"
    const playerTwo = "Comp"
    
    
    let gameOver = false
    let listOfPlayers = 
    [
        {
            name: playerOne,
            token: "X"
        },
        {
            name: playerTwo,
            token: "O"
        }
    ]

    // init let active player be the first element in the listOfPlayers arr
    let activePlayer = listOfPlayers[0]

    function switchPlayerTurns()
    {
        console.log(`Switched turns. Now it's ${activePlayer.name}'s turn.`);
        return activePlayer = activePlayer === listOfPlayers[0] ? listOfPlayers[1] : listOfPlayers[0]
    }

    function getActivePlayer()
    {
        return activePlayer
    }

    function printNewRound()
    {
        console.log(`It's ${getActivePlayer().name}'s turn.`);
        gameBoard.printBoard()
    }

    /**
     * Check the board state for a winner
     */
    function checkWinner(boardState)
    {
        // check the rows
        for(let row = 0; row < boardState.length; row++)
        {
            if (boardState[row][0] === activePlayer.token && 
                boardState[row][1] === activePlayer.token &&
                boardState[row][2] === activePlayer.token)
            {
                return true
            }
        }

        // check cols
        for (let col = 0; col < 3; col++) {
            if (boardState[0][col] === activePlayer.token &&
                boardState[1][col] === activePlayer.token &&
                boardState[2][col] === activePlayer.token) {
                return true;
            }
        }

        // check by diags
        if (boardState[0][0] === activePlayer.token &&
            boardState[1][1] === activePlayer.token &&
            boardState[2][2] === activePlayer.token) {
            return true;
        }

        if (boardState[0][2] === activePlayer.token &&
            boardState[1][1] === activePlayer.token &&
            boardState[2][0] === activePlayer.token) {
            return true;
        }
        // No winner found
        return false 
    }

    function resetGame()
    {
        gameBoard.resetBoard()
        activePlayer = listOfPlayers[0]
        gameOver = false
        console.log("Game has been reseted")
        // printNewRound()
    }

    function playRound(player,row,col)
    {
        if (gameOver) {
            console.log("The game is over! Please reset the board to start a new game.");
            return;
        }

        player = getActivePlayer()
        console.log(`Dropping ${player.name}'s token: "${player.token}" into (row,col): ${row}${col}`)
        let successCellDrop = gameBoard.dropTokenInCell(player.token, row, col);
        if(!successCellDrop)
        {
            console.log("Invalid moves. Cell already occupied Try again!")
            // Don't switch turns if move is invalid
            return
        }

         // Get the updated board state and display it
        const boardState = gameBoard.printBoard();

        if(checkWinner(boardState))
        {
            console.log(`Congrats the game has been won by ${player.name}`)
            gameOver = true
        }
        else
        {
            switchPlayerTurns()
            printNewRound()
        }
    }

    return {playRound,getActivePlayer,resetGame}
}

const game = GameController()

// test 1 Player wins on rows
game.playRound(game.getActivePlayer().name, 0, 0)
game.playRound(game.getActivePlayer().name, 1, 0)
game.playRound(game.getActivePlayer().name, 0, 1)
game.playRound(game.getActivePlayer().name, 1, 1)
game.playRound(game.getActivePlayer().name, 0, 2)
game.resetGame()
game.playRound(game.getActivePlayer().name, 2, 1)
game.playRound(game.getActivePlayer().name, 1, 1)


// test 2 Comp wins via cols
// game.playRound(game.getActivePlayer().name, 0, 1)
// game.playRound(game.getActivePlayer().name, 0, 0)
// game.playRound(game.getActivePlayer().name, 1, 1)
// game.playRound(game.getActivePlayer().name, 1, 2)
// game.playRound(game.getActivePlayer().name, 2, 1)
// game.playRound(game.getActivePlayer().name, 2, 2)
// game.resetGame()

// test 3 Player wins via diags
// game.playRound(game.getActivePlayer().name, 0, 0)
// game.playRound(game.getActivePlayer().name, 0, 2)
// game.playRound(game.getActivePlayer().name, 1, 1)
// game.playRound(game.getActivePlayer().name, 1, 2)
// game.playRound(game.getActivePlayer().name, 2, 2)
// game.playRound(game.getActivePlayer().name, 2, 1)

// test 4 player selects same cell
// game.playRound(game.getActivePlayer().name, 0, 1)
// game.playRound(game.getActivePlayer().name, 0, 1)













