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


    /**
     * function handle userinput and modify the cell value
     */
    function dropTokenInCell(row,col)
    {
        boardArr.forEach((row) => {
            // find all cells with value 0
            console.log(row)
            
        })

    }

    function printBoard()
    {
        const board = createBoard()
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
        return token = initToken
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
            return activePlayer === listOfPlayers[1]
        }
        else
        {
            return activePlayer === listOfPlayers[0]
        }
    }

    function getActivePlayer()
    {
        console.log(activePlayer)
        return activePlayer
    }

    function printNewRound()
    {
        gameBoard.printBoard()
        console.log(`New game. It is "${getActivePlayer().name}" turn to start`)
    }
    
    return {printNewRound,switchPlayerTurns}

}

const game = GameController()
game.printNewRound()




