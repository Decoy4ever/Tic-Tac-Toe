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
        }
        return {value} 
    }

    function printBoard()
    {

        // print out each cell value in the board
        const printBoardWithCells = board.map((row) => row.map((cell) => cell.getToken()))
        console.table(printBoardWithCells)
        // return printBoardWithCells
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
        gameBoard.printBoard()
        console.log(`New game. It is "${getActivePlayer().name}" turn to start`)
    }
    
    function playRound(player,row,col)
    {
        console.log(`Dropping ${getActivePlayer().name}'s token: "${getActivePlayer().token}" into (row,col): ${row}${col}`)
        gameBoard.dropTokenInCell(getActivePlayer().token, row, col);
        switchPlayerTurns()
        printNewRound()
    }
    printNewRound()

    return {playRound,getActivePlayer,switchPlayerTurns}

}

const game = GameController()
game.playRound(game.getActivePlayer().name, 0, 0)






