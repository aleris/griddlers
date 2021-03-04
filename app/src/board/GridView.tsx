import "./GridView.scss";
import React from "react";
import { Board, CoordinateKey } from "./Board";
import { BoardSupport } from "./BoardSupport";
import { CellView } from "./CellView";

type Props = {
  board: Board;
  cellSize: number;
  onCellClick: (coordinateKey: CoordinateKey) => void;
};

export const GridView = ({ board, cellSize, onCellClick }: Props) => {
  const width = BoardSupport.width(board);
  const height = BoardSupport.height(board)
  return (
    <div className="Grid"
         style={{
           gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
           gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
         }}
    >
      {BoardSupport.mapEachCell(board, (cell, coordinateKey) => (
        <CellView
          key={coordinateKey}
          cell={cell}
          cellSize={cellSize}
          onClick={() => onCellClick(coordinateKey)}
        />
      ))}
    </div>
  );
};
