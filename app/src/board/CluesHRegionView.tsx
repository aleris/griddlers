import "./CluesHRegionView.scss";
import React from "react";
import { Board } from "./Board";
import { BoardSupport } from "./BoardSupport";
import { ClueCellView } from "./ClueCellView";

type Props = {
  board: Board;
  cellSize: number;
};

export const CluesHRegionView = ({ board, cellSize }: Props) => {
  const clueLines = board.cluesH;
  const width = BoardSupport.cluesHSize(board);
  const height = BoardSupport.height(board);
  return (
    <div
      className="CluesHRegion"
      style={{
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
      }}
    >
      {clueLines.map((clueLine, rowIndex) =>
        clueLine.map((clue, colIndex) => (
          <ClueCellView
            key={`cx-${rowIndex}${colIndex}`}
            clue={clue}
            cellSize={cellSize}
          />
        ))
      )}
    </div>
  );
};
