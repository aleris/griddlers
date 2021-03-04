import "./PackBoardView.scss";
import React  from "react";
import { Board } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import { DifficultyView } from "./DifficultyView";
import { PackGridView } from "./PackGridView";

type Props = {
  board: Board;
  completed: boolean;
};

export const PackBoardView = ({ board, completed }: Props) => {
  return (
    <div className="PackBoard">
        <div className="PackBoard--Grid">
          <PackGridView
            board={board}
            hideFills={!completed}
          />
        </div>
        <div className="PackBoard--Difficulty">
          <DifficultyView
            rating={BoardSupport.difficultyShown(board)}
            completed={completed}
          />
        </div>
    </div>
  );
};
