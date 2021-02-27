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
  return (
    <div className="Grid">
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
