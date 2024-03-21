import {useState} from "react";

function GameBoard({onSelectSquare, board}){

    

    // let [gameBoard,setGameBoard] = useState(initialGameBoard);
    
    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const prevGameBoard2 = [...prevGameBoard];
    //         prevGameBoard2[rowIndex][colIndex] = activePlayerSymbol;
    //         return prevGameBoard2;            
    //     });

    //     onSelectSquare();
    // }
    return(        
        <ol id="game-board">
            {board.map((row,rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={board[rowIndex][colIndex] !== null ? true : false}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}


export default GameBoard;