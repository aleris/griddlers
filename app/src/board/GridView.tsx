import "./GridView.scss";
import React, { useState } from "react";
import { Board, Color, GridPosition } from "./Board";
import { BoardSupport } from "./BoardSupport";
import { CellView } from "./CellView";

type Props = {
  board: Board;
  cellSize: number;
  onCellClick: (position: GridPosition) => void;
  selectionBackgroundColor: Color;
  onCellZoneSelect: (from: GridPosition, to: GridPosition) => void;
  interactive?: boolean;
};

type SelectionZone = {
  start: GridPosition;
  end: GridPosition;
};

export const GridView = ({
  board,
  cellSize,
  onCellClick,
  selectionBackgroundColor,
  onCellZoneSelect,
  interactive = true,
}: Props) => {
  const [selectionStart, setSelectionStart] = useState<GridPosition | null>(
    null
  );
  const [selection, setSelection] = useState<SelectionZone | null>(null);
  const [selectionCurrent, setSelectionCurrent] = useState<GridPosition | null>(
    null
  );

  const width = BoardSupport.width(board);
  const height = BoardSupport.height(board);

  const handleOnMouseDown = (rowIndex: number, colIndex: number) => {
    if (interactive) {
      setSelectionStart({ rowIndex, colIndex });
    }
  };

  const handleOnMouseMove = (rowIndex: number, colIndex: number) => {
    if (selectionStart === null) {
      return;
    }
    const minRowIndex = Math.min(selectionStart.rowIndex, rowIndex);
    const maxRowIndex = Math.max(selectionStart.rowIndex, rowIndex);
    const minColIndex = Math.min(selectionStart.colIndex, colIndex);
    const maxColIndex = Math.max(selectionStart.colIndex, colIndex);
    setSelection({
      start: { rowIndex: minRowIndex, colIndex: minColIndex },
      end: { rowIndex: maxRowIndex, colIndex: maxColIndex },
    });
    setSelectionCurrent({ rowIndex, colIndex });
  };

  const handleOnMouseUp = (rowIndex: number, colIndex: number) => {
    if (selection === null) {
      return;
    }
    onCellZoneSelect(selection.start, selection.end);
    setSelectionStart(null);
    setSelection(null);
    setSelectionCurrent(null);
  };

  const handleOnCellClick = (rowIndex: number, colIndex: number) => {
    setSelectionStart(null);
    setSelection(null);
    setSelectionCurrent(null);
    onCellClick({ rowIndex, colIndex });
  };

  function inDragZone(rowIndex: number, colIndex: number): boolean {
    if (selection === null) {
      return false;
    }
    return (
      selection.start.rowIndex <= rowIndex &&
      rowIndex <= selection.end.rowIndex &&
      selection.start.colIndex <= colIndex &&
      colIndex <= selection.end.colIndex
    );
  }

  function getSelectionTip(rowIndex: number, colIndex: number): string | null {
    if (selection === null || selectionCurrent === null) {
      return null;
    }

    function getSelectionSize(selection: SelectionZone) {
      if (selection.start.rowIndex === selection.end.rowIndex) {
        return `${selection.end.colIndex - selection.start.colIndex + 1}`;
      } else if (selection.start.colIndex === selection.end.colIndex) {
        return `${selection.end.rowIndex - selection.start.rowIndex + 1}`;
      } else {
        return `${selection.end.rowIndex - selection.start.rowIndex + 1}x${
          selection.end.colIndex - selection.start.colIndex + 1
        }`;
      }
    }

    if (
      selectionCurrent.rowIndex === rowIndex &&
      selectionCurrent.colIndex === colIndex
    ) {
      return getSelectionSize(selection);
    }

    return null;
  }

  return (
    <div
      className="Grid"
      style={{
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
      }}
    >
      {BoardSupport.mapEachCell(
        board,
        (cell, coordinateKey, rowIndex, colIndex) => (
          <CellView
            key={coordinateKey}
            cell={cell}
            selected={inDragZone(rowIndex, colIndex)}
            selectionTip={getSelectionTip(rowIndex, colIndex)}
            selectionBackgroundColor={selectionBackgroundColor}
            onClick={() => handleOnCellClick(rowIndex, colIndex)}
            onMouseDown={() => handleOnMouseDown(rowIndex, colIndex)}
            onMouseMove={() => handleOnMouseMove(rowIndex, colIndex)}
            onMouseUp={() => handleOnMouseUp(rowIndex, colIndex)}
            interactive={interactive}
          />
        )
      )}
    </div>
  );
};
