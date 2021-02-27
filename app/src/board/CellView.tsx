import "./CellView.scss";
import React from "react";
import { Cell, Fill, Reveal } from "./Board";

type Props = {
  cell: Cell;
  cellSize: number;
  onClick: () => void;
};

function getFillByReveal(cell: Cell): Fill {
  switch (cell.reveal) {
    case Reveal.Fill:
      return cell.fill;
    case Reveal.Guessed:
      return cell.guessed;
    case Reveal.Incorrect:
    default:
      return cell.fill;
  }
}

export const CellView = ({ cell, cellSize, onClick }: Props) => {
  const fill = getFillByReveal(cell);
  const fillColor = fill ?? "none";
  return (
    <div
      className="Cell"
      style={{
        width: `${cellSize}rem`,
        height: `${cellSize}rem`,
      }}
      onClick={onClick}
    >
      <div
        className="Cell--Fill"
        style={{
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
};
