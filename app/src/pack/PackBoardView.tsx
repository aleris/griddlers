import "./PackBoardView.scss";
import React from "react";
import { Board } from "../board/Board";
import { DifficultyView } from "./DifficultyView";
import { PackGridView } from "./PackGridView";

type Props = {
  board: Board;
  completed: boolean;
  showGrid?: boolean;
};

export const PackBoardView = ({ board, completed }: Props) => {
  return (
    <div className="PackBoard">
      <div className="PackBoard--Grid">
        <PackGridView
          board={board}
          hideFills={!completed}
          showGrid={!completed}
        />
      </div>
      <div className="PackBoard--Difficulty">
        <DifficultyView rating={board.spec.difficulty} completed={completed} />
      </div>
    </div>
  );
};
