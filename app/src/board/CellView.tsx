import "./CellView.scss";
import React from "react";
import classNames from "../classNames";
import { Cell, Color, FillMarkedEmpty } from "./Board";
import { FillSupport } from "./FillSupport";

type Props = {
  cell: Cell;
  selected: boolean;
  selectionBackgroundColor: Color;
  selectionTip: string | null;
  onClick: () => void;
  onMouseDown: () => void;
  onMouseMove: () => void;
  onMouseUp: () => void;
};

export const CellView = ({
  cell,
  selected,
  selectionBackgroundColor,
  selectionTip,
  onClick,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: Props) => {
  const fillColor = FillSupport.toColor(cell.guessed);
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      className={classNames("Cell", {
        MarkedEmpty: cell.guessed === FillMarkedEmpty,
      })}
      style={{
        backgroundColor: selected ? selectionBackgroundColor : fillColor,
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onDragStart={handleOnDragStart}
      onSelect={handleOnDragStart}
    >
      {selectionTip !== null ? (
        <span className="Cell--SelectionTip">{selectionTip}</span>
      ) : null}
    </div>
  );
};
