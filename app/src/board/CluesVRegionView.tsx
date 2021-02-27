import "./CluesVRegionView.scss";
import React from "react";
import { ClueLine } from "./Board";
import { ClueCellView } from "./ClueCellView";

type Props = {
  clueLines: ClueLine[];
  cellSize: number;
};

export const CluesVRegionView = ({ clueLines, cellSize }: Props) => {
  const length = clueLines[0].length;
  const indexes = Array.from({ length }).map((_, index) => index);
  return (
    <div className="CluesVRegion">
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
