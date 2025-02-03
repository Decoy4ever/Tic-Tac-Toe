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
    
    function getBoard()
    {
        return board
    }

    /**
     * function handle userinput and modify the cell value
     */
    function dropTokenInCell(playerToken, row, col)
    {
        // loop through the array and find the cellsValue equal to 0
        // modify the cellvalue to user input
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

    return {getBoard, dropTokenInCell, printBoard, resetBoard}
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
                boardState[2][col] === activePlayer.token) 
            {
                return true;
            }
        }

        // check by diags and anti-diag
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

    // check if each element has token in their cell
    function checkBoardisFull(board)
    {
        const boardIsFull = board.every((cell) => cell.every((el) => el !== 0))
        return boardIsFull
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
            return
        }
        else if(checkBoardisFull(boardState))
        {
            console.log('The board is full. All cells are occupied. Game is Tied')
            gameOver = true;
            return
        }
        else
        {
            switchPlayerTurns()
            printNewRound()
        }
    }

    return {getBoard: gameBoard.getBoard, playRound, getActivePlayer, resetGame, checkWinner, checkBoardisFull}
}

/**
 * Handle the display/DOM logics
 */
function ScreenController()
{
    // retrieve the classess for interaction for the board
    const game = GameController()
    const boardDiv = document.querySelector('.board')
    const winnerDiv = document.querySelector('.winner')
    const turnDiv = document.querySelector('.turn')
    const resetBtn = document.querySelector('.reset')
 
    // use a loop to create the grid and create buttons
    function updateScreen()
    {
        // retreive the latest version of the board
        const currentBoard = game.getBoard()
        let activePlayer = game.getActivePlayer()
        const boardState = currentBoard.map(row => row.map(cell => cell.getToken()));

        // clear previous msg
        if(winnerDiv)
        {
            winnerDiv.textContent = ""
        }

        boardDiv.textContent = ""

        if(game.checkWinner(boardState))
        {
            // display active winner msg
            winnerDiv.textContent = `${activePlayer.name} Wins the Game`
        }
        else if(game.checkBoardisFull(boardState))
        {
            winnerDiv.textContent = `Game is a Tie. Reset if you want to play again`
        }
        else
        {
            turnDiv.textContent = `${activePlayer.name}'s turn`
        }
        
        // render board square
        currentBoard.forEach((rowEl,rowIndex) => {
            rowEl.forEach((colEl,colIndex) => {
                const btnCell = document.createElement('button')
                btnCell.classList.add("cell")
                btnCell.dataset.row = rowIndex; 
                btnCell.dataset.column = colIndex;
                
                // display only player token, leave empty cells blank
                btnCell.textContent = colEl.getToken() === 0 ? "" : colEl.getToken()            
                boardDiv.appendChild(btnCell)
            })
        })
    }

    function resetHandler()
    {
        game.resetGame()
        updateScreen()
    }

    function clickHandler(e)
    {
        const selectedCol = e.target.dataset.column
        const selectedRow = e.target.dataset.row 
        game.playRound(game.getActivePlayer().name,selectedRow, selectedCol)
        updateScreen()
    }

    boardDiv.addEventListener("click", clickHandler)
    resetBtn.addEventListener("click", resetHandler)
    updateScreen()

}
const screenGame = ScreenController()
















