import "./HomePage.scss";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { selectBoardAction } from "../actions/SelectBoardAction";
import { BoardSupport } from "../board/BoardSupport";
import { GameContext } from "../GameContext";
import { BoardRegistry } from "../registry/BoardRegistry";
import { AchievementsView } from "./AchievementsView";
import { HomeBoardView } from "./HomeBoardView";

export const HomePage = () => {
  const { state, dispatch } = useContext(GameContext);
  const { nextBoard, completedBoards } = state;
  const history = useHistory();

  const handleBoardOnClick = async (id: string) => {
    await dispatch(selectBoardAction(id));
    history.push(`/board`);
  };

  return (
    <div className="Home">
      <div className="Home--Current">
        {nextBoard ? (
          <HomeBoardView
            board={nextBoard}
            completed={false}
            onClick={() => handleBoardOnClick(nextBoard.id)}
          />
        ) : null}
      </div>
      <div className="Home--Achievements">
        <AchievementsView completedBoards={completedBoards} />
      </div>
      <div className="Home--Completed">
        {completedBoards.map((board) => (
          <HomeBoardView
            key={board.id}
            board={board}
            completed={true}
            onClick={() => handleBoardOnClick(board.id)}
          />
        ))}
      </div>
    </div>
  );
};
