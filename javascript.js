
function gameBoard(){
    const boardArr = [];

    // construct the 2D Grid
    function create2Darr(row, col)
    {
        for(let i = 0; i < row; i++)
        {
            // each row create an empty value
            boardArr[i] = [];
    
            // loop through each col and add value j
            for(let j = 0; j < col; j++)
            {
                // fill all the rows with X
                boardArr[i][j] = "X";
            }
        }
        // repalce element with "O"
        boardArr[0][1] = "O"
        boardArr[1][2] = "O"
        return boardArr;
    }
    // const grid = create2Darr(3,3);
    // console.log(grid)

    function getRows(arr,firstIndex, secondIndex, thirdIndex)
    {   
        return arr.map((subArr, index) => 
        {
            return subArr[firstIndex]
            // return [subArr[firstIndex]]
        })
    }
    // const findRows = getRows(grid, 0);
    // console.log(findRows)
    
  

    return {create2Darr, getRows}
}

// const game = gameBoard()



function gameController()
{
    // create a new board
    const board = gameBoard();
    const createBoard = board.create2Darr(3,3);
    console.log(createBoard)

    // get the rows
    const getRowFromBoard = board.getRows(createBoard,0);
    console.log(getRowFromBoard) 

    // const findWinner = board.getRows();
    // console.log(findWinner);

    function isWinner(pattern)
    {
        // comapre all the elements from  
        let winningPattern = pattern.every((element,index) => element === getRowFromBoard[index])
        console.log(winningPattern)

        // print the winner
        if(winningPattern === true)
        {
            return "You Won"
        }
        else
        {
            return "You Lost"
        }
    }
    let notsAndCrossWinPattern = ["X","X","X"];
    const winner = isWinner(notsAndCrossWinPattern)
    console.log(winner)

    // function createPlayer(name, id)
    // {   
    //     return {name, id}
    // }

    // let listOfPlayers = [];
    // const playerOne = createPlayer("Jon", 1)
    // const playerTwo = createPlayer("Comp", 2)

    // listOfPlayers.push(playerOne, playerTwo);
    // console.log(listOfPlayers);

    return {winner}

}

const game = gameController();
