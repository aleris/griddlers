import "./CluesVRegionView.scss";
import React from "react";
import { Board } from "./Board";
import { BoardSupport } from "./BoardSupport";
import { ClueCellView } from "./ClueCellView";

type Props = {
  board: Board;
  cellSize: number;
};

export const CluesVRegionView = ({ board, cellSize }: Props) => {
  const clueLines = board.cluesV;
  const length = clueLines[0].length;
  const width = BoardSupport.width(board);
  const height = BoardSupport.cluesVSize(board);
  const indexes = Array.from({ length }).map((_, index) => index);
  return (
    <div
      className="CluesVRegion"
      style={{
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
      }}
    >
      {indexes.map((rowIndex) =>
        clueLines.map((colClueLine, colIndex) => (
          <ClueCellView
            key={`cy-${rowIndex}${colIndex}`}
            clue={colClueLine[rowIndex]}
            cellSize={cellSize}
          />
        ))
      )}
    </div>
  );
};
