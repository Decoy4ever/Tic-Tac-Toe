function GameBoard()
{
    let numberOfRows = 3;
    let numberOfCols = 3;
    let boardArr = [];
    // let initToken = 0
    const token = Token()

    function createBoard(row,col)
    {
        for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++)
        {
            boardArr[rowIndex] = [];
            for(let colIndex = 0; colIndex < numberOfCols; colIndex++)
            {
                boardArr[rowIndex][colIndex] = token.setToken(token)
            }
        }
        return boardArr
    }

    function printBoard()
    {
        const board = createBoard()
        console.table(board)
        return board
    }

    return {printBoard}
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


const gameBoard = GameBoard()
gameBoard.printBoard()



