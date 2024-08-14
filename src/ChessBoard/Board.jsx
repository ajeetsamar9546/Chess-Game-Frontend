import React, { useState } from 'react';
import './Board.css';


const initialBoard = [
  [
    { type: 'rook', image: 'Chess Pieces/Black/black rook.png' },
    { type: 'knight', image: 'Chess Pieces/Black/black knight.png' },
    { type: 'bishop', image: 'Chess Pieces/Black/black bishop.png' },
    { type: 'queen', image: 'Chess Pieces/Black/black queen.png' },
    { type: 'king', image: 'Chess Pieces/Black/black king.png' },
    { type: 'bishop', image: 'Chess Pieces/Black/black bishop.png' },
    { type: 'knight', image: 'Chess Pieces/Black/black knight.png' },
    { type: 'rook', image: 'Chess Pieces/Black/black rook.png' },
  ],
  [{ type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' },
  { type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' },
  { type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' },
  { type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' },
  { type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' },
  { type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' },
  { type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' },
  { type: 'pawn', image: 'Chess Pieces/Black/black pawn.png' }],

  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],

  [{ type: 'pawn', image: './Chess Pieces/White/white pawn.png' },
  { type: 'pawn', image: './Chess Pieces/White/white pawn.png' },
  { type: 'pawn', image: './Chess Pieces/White/white pawn.png' },
  { type: 'pawn', image: './Chess Pieces/White/white pawn.png' },
  { type: 'pawn', image: './Chess Pieces/White/white pawn.png' },
  { type: 'pawn', image: './Chess Pieces/White/white pawn.png' },
  { type: 'pawn', image: './Chess Pieces/White/white pawn.png' },
  { type: 'pawn', image: './Chess Pieces/White/white pawn.png' },],

  [{ type: 'rook', image: 'Chess Pieces/White/white rook.png' },
  { type: 'knight', image: 'Chess Pieces/White/white knight.png' },
  { type: 'bishop', image: 'Chess Pieces/White/white bishop.png' },
  { type: 'queen', image: 'Chess Pieces/White/white queen.png' },
  { type: 'king', image: 'Chess Pieces/White/white king.png' },
  { type: 'bishop', image: 'Chess Pieces/White/white bishop.png' },
  { type: 'knight', image: 'Chess Pieces/White/white knight.png' },
  { type: 'rook', image: 'Chess Pieces/White/white rook.png' },],
];



const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [rowToPass, setRowToPass] = useState(null);
  const [colToPass, setColToPass] = useState(null);

  const handleDragStart = (event, row, col, tileType) => {
    event.dataTransfer.setData('piece', JSON.stringify({ row, col, tileType }));
    console.log(row * 8 + col + 1) // position of square in board like 1 2 3 4
  };

  const handleDrop = (event, row1, col1) => {
    event.preventDefault();
    const { row: fromRow, col: fromCol } = JSON.parse(event.dataTransfer.getData('piece'));

    setRowToPass(row1);
    setColToPass(col1);

    console.log(row1 * 8 + col1 + 1) // position of square in board like 1 2 3 4

    if (fromRow !== row1 || fromCol !== col1) {
      const newBoard = [...board];
      newBoard[row1][col1] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;
      setBoard(newBoard);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };


  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((square, colIndex) => (
            <div key={colIndex} className="square" id={`${rowIndex}${colIndex}`} onDrop={(event) => handleDrop(event, rowIndex, colIndex)} onDragOver={handleDragOver}>
              <div className="piece" draggable onDragStart={(event) => handleDragStart(event, rowIndex, colIndex)}>
                {square ? <img src={square.image} alt={square.type} /> : null}
              </div>
            </div>
          ))}
        </div>
      ))}

      {rowToPass}
      {colToPass}
    </div>
  );

};

export default Board;








