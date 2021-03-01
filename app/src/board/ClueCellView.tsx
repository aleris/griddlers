import "./ClueCellView.scss";
import React from "react";
import { Clue, FillEmpty } from "./Board";

export type Props = {
  clue: Clue;
  cellSize: number;
};

export const ClueCellView = ({ clue, cellSize }: Props) => {
  return (
    <div
      className="ClueCell"
      style={{
        width: `${cellSize}rem`,
        height: `${cellSize}rem`,
        color: clue.fill ?? "none",
      }}
    >
      {clue.fill !== FillEmpty ? clue.count : null}
    </div>
  );
};
