import "./CellView.scss";
import React from "react";
import classNames from "../classNames";
import { Cell, FillMarkedEmpty } from "./Board";
import { FillSupport } from "./FillSupport";

type Props = {
  cell: Cell;
  cellSize: number;
  onClick: () => void;
};

export const CellView = ({ cell, cellSize, onClick }: Props) => {
  const fillColor = FillSupport.toColor(cell.guessed);
  return (
    <div
      className={classNames("Cell", {
        MarkedEmpty: cell.guessed === FillMarkedEmpty,
      })}
      style={{
        backgroundColor: fillColor
      }}
      onClick={onClick}
    />
  );
};
