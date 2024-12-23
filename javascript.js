function GameBoard()
{
    let row = 3;
    let col = 3;
    let boardArr = [];

    function createBoard()
    {
        for(let rowIndex = 0; rowIndex < row; rowIndex++)
        {
            boardArr[rowIndex] = [];
            for(let colIndex = 0; colIndex < col; colIndex++)
            {
                boardArr[rowIndex][colIndex] = 0
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

const gameBoard = GameBoard()
gameBoard.printBoard()



