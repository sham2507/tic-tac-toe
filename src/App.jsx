import {useState} from "react";

import Player from './Components/Player.jsx';
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import GameOver from "./Components/GameOver.jsx";

import {WINNING_COMBINATIONS} from "./winning-combinations.js"

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "O";
  }    
  return currentPlayer;
}

function deriveWinner(gameBoard,players){
  let winner = null;
  WINNING_COMBINATIONS.map((combinations) => {
  let firstSquareSymbol  = gameBoard[combinations[0].row][combinations[0].column];
  let secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
  let thirdSquareSymbol  = gameBoard[combinations[2].row][combinations[2].column];

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
    winner = players[firstSquareSymbol];     
  }
});
return winner;  
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  gameTurns.map((turn) => {
    let {square , player} = turn;
    let {row , col}= square;        
    gameBoard[row][col] = player;
  });

  return gameBoard;
}
function App() {

  let [players,setPlayers] = useState(PLAYERS);  
  let [gameTurns,setGameTurns] = useState([]);  


  let activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);  
  let winner = deriveWinner(gameBoard,players);
  let hasDraw = gameTurns.length === 9 && !winner;

  

  function handleSelectSquare(rowIndex,colIndex){    
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);      
      let updatedTurns = [{square:{row: rowIndex , col:colIndex},player:currentPlayer},...prevTurns];
      return updatedTurns;
    });
  }

  function handleGameRestart(){
    setGameTurns([]);
  }


  function handlePlayerNameChange(symbol,newName){
    setPlayers((prev) => {
      return{
        ...prev,
        [symbol]:newName
      }
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >               
          <Player initialName = {PLAYERS.X} symbol="X" isActive={activePlayer === "X" ? true : false} onSelect={handlePlayerNameChange}/>
          <Player initialName = {PLAYERS.O} symbol="O" isActive={activePlayer === "O" ? true : false} onSelect={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} hasDraw= {hasDraw} onRestart = {handleGameRestart}/>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board = {gameBoard}
        />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  );
}

export default App
