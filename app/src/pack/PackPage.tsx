import "./PackPage.scss";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { selectBoardAction } from "../actions/SelectBoardAction";
import { GameContext } from "../GameContext";
import {PACK_LEVEL_COUNT} from '../registry/Pack'
import { ProgressView } from "./ProgressView";
import {BoardButtonView} from './BoardButtonView'
import { PackBoardView } from "./PackBoardView";
import { IconLock } from "../Icons";

export const PackPage = () => {
  const { state, dispatch } = useContext(GameContext);
  const { nextBoard, completedBoards, selectedPack } = state;
  const history = useHistory();

  const handleBoardOnClick = async (id: string) => {
    await dispatch(selectBoardAction(id));
    history.push(`/board`);
  };

  const remaining = PACK_LEVEL_COUNT - completedBoards.length - (nextBoard === null ? 0 : 1)

  return (
    <div className="PackPage">
      <div className="PackPage--Progress">
        <ProgressView pack={selectedPack} />
      </div>
      <div className="PackPage--Boards">
        {completedBoards.map((board, index) => (
          <div key={board.spec.boardId} style={{animationDelay: `${50 * (15 - index)}ms`}}>
            <BoardButtonView
                onClick={() => handleBoardOnClick(board.spec.boardId)}>
              <PackBoardView
                board={board}
                completed={true}
              />
            </BoardButtonView>
          </div>
        ))}
        {nextBoard ? (
          <div key={"next"} style={{animationDelay: `${50 * (15 - completedBoards.length)}ms`}}>
            <BoardButtonView
              onClick={() => handleBoardOnClick(nextBoard.spec.boardId)}
              highlight={true}
            >
              <PackBoardView
                board={nextBoard}
                completed={false}
              />
            </BoardButtonView>
          </div>
        ) : null}
        {
          Array.from({length: remaining}).map((_, index) =>
            <div key={`remaining${index}`} style={{animationDelay: `${50 * (15 - completedBoards.length - 1 - index)}ms`}}>
              <BoardButtonView disabled={true}>
                {IconLock}
              </BoardButtonView>
            </div>
          )
        }
      </div>
    </div>
  );
};
