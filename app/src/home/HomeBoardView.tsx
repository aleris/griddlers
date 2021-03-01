import "./HomeBoardView.scss";
import React, { useState } from "react";
import { Board } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import classNames from "../classNames";
import { IconButton } from "../IconButton";
import { IconNext } from "../Icons";
import { DifficultyView } from "./DifficultyView";
import { HomeBoardGridView } from "./HomeBoardGridView";

type Props = {
  board: Board;
  completed: boolean;
  onClick: () => void;
};

export const HomeBoardView = ({ board, completed, onClick }: Props) => {
  const [selected, setSelected] = useState(false);
  const gridClassName = classNames("HomeBoard--Grid", {
    Selected: selected,
  });
  return (
    <div className="HomeBoard">
      <div className={gridClassName}>
        <HomeBoardGridView
          board={board}
          hideFills={!completed}
          size={completed ? "Default" : "Large"}
        />
      </div>
      <div className="HomeBoard--Properties">
        <dl>
          <dt>Size:</dt>
          <dd>{`${BoardSupport.height(board)}x${BoardSupport.width(
            board
          )}`}</dd>
          <dt className="MedalsLabel">Medals:</dt>
          <dd>
            <DifficultyView
              rating={BoardSupport.difficultyShown(board)}
              completed={completed}
            />
          </dd>
        </dl>
        <div className="HomeBoard--Button">
          <IconButton
            type={completed ? "Default" : "Primary"}
            size={completed ? "Small" : "Default"}
            icon={IconNext}
            onAnimationStarted={() => setSelected(true)}
            onAnimationFinished={onClick}
          />
        </div>
      </div>
    </div>
  );
};
