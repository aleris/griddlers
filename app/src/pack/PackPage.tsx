import "./PackPage.scss";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { selectBoardAction } from "../actions/SelectBoardAction";
import { BackButton } from "../BackButton";
import { GameContext } from "../GameContext";
import { PACK_LEVEL_COUNT } from "../registry/Pack";
import { Lock } from "./Lock";
import { ProgressView } from "./ProgressView";
import { BoardButtonView } from "./BoardButtonView";
import { PackBoardView } from "./PackBoardView";

export const PackPage = () => {
  const { state, dispatch } = useContext(GameContext);
  const { nextBoard, completedBoards, selectedPack } = state;
  const history = useHistory();

  useEffect(() => {
    console.log("PackPage useEffect");
    if (selectedPack === null) {
      history.replace("/");
    }
  }, [selectedPack, history]);

  const handleBoardOnClick = async (id: string) => {
    await dispatch(selectBoardAction(id));
    history.push(`/board`);
  };

  const handleBackButtonOnClick = () => {
    history.go(-1);
  };

  const remaining =
    PACK_LEVEL_COUNT - completedBoards.length - (nextBoard === null ? 0 : 1);

  return (
    <div className="PackPage">
      <BackButton onClick={handleBackButtonOnClick} />
      <div className="PackPage--Progress">
        {selectedPack ? <ProgressView pack={selectedPack} /> : null}
      </div>
      <div className="PackPage--Boards">
        {completedBoards.map((board, index) => (
          <div
            key={board.spec.boardId}
            style={{ animationDelay: `${50 * (15 - index)}ms` }}
          >
            <BoardButtonView
              onClick={() => handleBoardOnClick(board.spec.boardId)}
            >
              <PackBoardView board={board} completed={true} />
            </BoardButtonView>
          </div>
        ))}
        {nextBoard ? (
          <div
            key={"next"}
            style={{
              animationDelay: `${50 * (15 - completedBoards.length)}ms`,
            }}
          >
            <BoardButtonView
              onClick={() => handleBoardOnClick(nextBoard.spec.boardId)}
              highlight={true}
            >
              <PackBoardView board={nextBoard} completed={false} />
            </BoardButtonView>
          </div>
        ) : null}
        {Array.from({ length: remaining }).map((_, index) => (
          <div
            key={`remaining${index}`}
            style={{
              animationDelay: `${
                50 * (15 - completedBoards.length - 1 - index)
              }ms`,
            }}
          >
            <BoardButtonView disabled={true}>
              <Lock />
            </BoardButtonView>
          </div>
        ))}
      </div>
    </div>
  );
};
