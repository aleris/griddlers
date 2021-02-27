import "./CluesHRegionView.scss";
import React from "react";
import { ClueLine } from "./Board";
import { ClueCellView } from "./ClueCellView";

type Props = {
  clueLines: ClueLine[];
  cellSize: number;
};

export const CluesHRegionView = ({ clueLines, cellSize }: Props) => {
  return (
    <div className="CluesHRegion">
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
