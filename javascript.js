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

    const board = createBoard()
    /**
     * function handle userinput and modify the cell value
     */
    function dropTokenInCell(playerToken, row, col)
    {
        let value = 0
        // loop through the array and find the cellsValue equal to 0
        // modify the cellvalue from user input
        if(board[row][col].getToken() === 0)
        {
            value = board[row][col].setToken(playerToken)
            return value
        }
        else if(board[row][col].getToken() !== 0)
        {
            console.log(`Unavaliable choose a different cell from ${row}${col}`)
            return
        }
    }

    /**
     * Print the Current Board with cell values
     */
    function printBoard()
    {
        // print out each cell value in the board
        const printBoardWithCells = board.map((row) => row.map((cell) => cell.getToken()))
        console.table(printBoardWithCells)
        return printBoardWithCells
    }

    return {dropTokenInCell,printBoard}
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
        if(activePlayer === listOfPlayers[0])
        {
            return activePlayer = listOfPlayers[1]
        }
        else
        {
            return activePlayer = listOfPlayers[0]
        }
    }

    function getActivePlayer()
    {
        return activePlayer
    }

    function printNewRound()
    {
        const currentBoard = gameBoard.printBoard()
        console.log(`New game. It is "${getActivePlayer().name}" turn to start`)
        return currentBoard
    }


    /**
     * Check the board state for a winner
     */
    function checkWinner(currentBoard)
    {
        let winnerState = false
        // let winnerMsg = ""
        // check the rows
        for(let i =0; i < currentBoard.length; i++)
        {
            if(currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][1] === currentBoard[i][2])
            {
                winnerState = true
                // winnerMsg = "Won by Rows"
                // return currentBoard[i][0]
            }
        }

        // check cols
        for(let i =0; i < currentBoard.length; i++)
        {
            if(currentBoard[0][i] === currentBoard[1][i] && currentBoard[1][i] === currentBoard[2][i])
            {
                winnerState = true
                // winnerMsg = "Won by Cols"
            }
        }

        // check by diags
        if(currentBoard[0][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][2])
        {
            winnerState = true
        }

        return winnerState
    }

    function playRound(player,row,col)
    {
        console.log(`Dropping ${getActivePlayer().name}'s token: "${getActivePlayer().token}" into (row,col): ${row}${col}`)
        gameBoard.dropTokenInCell(getActivePlayer().token, row, col);
     
        let winner = checkWinner(gameBoard.printBoard())
        console.log(winner)
        if(winner === true)
        {
            console.log(`"${getActivePlayer().name}" has won the game. Congrats`)
        }
        else
        {
            switchPlayerTurns()
            console.log("No Winner. Game Continues")
        }
        printNewRound()
    }
    printNewRound()

    return {playRound,getActivePlayer}

}

const game = GameController()

// test 1 Player wins on rows
// game.playRound(game.getActivePlayer().name, 0, 0)
// game.playRound(game.getActivePlayer().name, 1, 0)
// game.playRound(game.getActivePlayer().name, 0, 1)
// game.playRound(game.getActivePlayer().name, 1, 1)
// game.playRound(game.getActivePlayer().name, 0, 2)

// test 2 Player wins via cols
// game.playRound(game.getActivePlayer().name, 0, 1)
// game.playRound(game.getActivePlayer().name, 0, 0)
// game.playRound(game.getActivePlayer().name, 1, 1)
// game.playRound(game.getActivePlayer().name, 1, 2)
// game.playRound(game.getActivePlayer().name, 2, 1)
// game.playRound(game.getActivePlayer().name, 2, 2)

// test 3 Player wins via diags
game.playRound(game.getActivePlayer().name, 0, 0)
game.playRound(game.getActivePlayer().name, 0, 2)
game.playRound(game.getActivePlayer().name, 1, 1)
game.playRound(game.getActivePlayer().name, 1, 2)
game.playRound(game.getActivePlayer().name, 2, 2)
game.playRound(game.getActivePlayer().name, 2, 1)












