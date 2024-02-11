import "./BoardSheetView.scss";
import React from "react";
import { GridPosition } from "./Board";
import { CluesHRegionView } from "./CluesHRegionView";
import { CluesVRegionView } from "./CluesVRegionView";
import { CornerView } from "./CornerView";
import { FillSupport } from "./FillSupport";
import { GridView } from "./GridView";
import { BoardSized } from "./BoardSizing";

type Props = {
  boardSized: BoardSized;
  onCellClick: (position: GridPosition) => void;
  onCellZoneSelect: (from: GridPosition, to: GridPosition) => void;
  interactive?: boolean;
};

export const BoardSheetView = ({
  boardSized,
  onCellClick,
  onCellZoneSelect,
  interactive = true,
}: Props) => {
  const board = boardSized.board;
  const size = boardSized.size;
  return (
    <div
      className="BoardSheet"
      style={{
        gridTemplateColumns: `${
          size.cluesHSize * (size.cellSize + size.borderWidth)
        }px ${
          size.gridWidth * (size.cellSize + size.borderWidth) + size.borderWidth
        }px`,
        gridTemplateRows: `${
          size.cluesVSize * (size.cellSize + size.borderWidth)
        }px ${
          size.gridHeight * (size.cellSize + size.borderWidth) +
          size.borderWidth
        }px`,
        fontSize: `${size.fontSize}px`,
      }}
    >
      <div>
        <CornerView />
      </div>
      <div>
        <CluesVRegionView board={board} cellSize={size.cellSize} />
      </div>
      <div>
        <CluesHRegionView board={board} cellSize={size.cellSize} />
      </div>
      <div>
        <GridView
          board={board}
          cellSize={size.cellSize}
          onCellClick={onCellClick}
          selectionBackgroundColor={FillSupport.toColor(
            board.currentPaletteFill
          )}
          onCellZoneSelect={onCellZoneSelect}
          interactive={interactive}
        />
      </div>
    </div>
  );
};
