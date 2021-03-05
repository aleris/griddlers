import "./BoardPage.scss";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { changePaletteFillAction } from "../actions/ChangePaletteFillAction";
import { fillCellAction } from "../actions/FillCellAction";
import { selectBoardAction } from "../actions/SelectBoardAction";
import { BackButton } from "../BackButton";
import { GameContext } from "../GameContext";
import { Fill, GridPosition } from "./Board";
import { BoardView } from "./BoardView";

export const BoardPage = () => {
  const { state, dispatch } = useContext(GameContext);
  const board = state.selectedBoard;
  const history = useHistory();

  useEffect(() => {
    console.log("BoardPage useEffect");
    if (board === null) {
      history.replace("/");
    }
  }, [board, history]);

  const handleOnPaletteFillChange = (fill: Fill) => {
    dispatch(changePaletteFillAction(fill));
  };
  const handleOnCellClick = (position: GridPosition) => {
    if (state.selectedBoard === null) {
      console.error("BoardPage handleOnCellClick selectedBoard is null");
      return;
    }
    dispatch(
      fillCellAction(position, position, state.selectedBoard.currentPaletteFill)
    );
  };
  const handleCellZoneSelect = (from: GridPosition, to: GridPosition) => {
    if (state.selectedBoard === null) {
      console.error("BoardPage handleCellZoneSelect selectedBoard is null");
      return;
    }
    dispatch(fillCellAction(from, to, state.selectedBoard.currentPaletteFill));
  };
  const handleOnNextClick = () => {
    if (state.nextBoard !== null) {
      dispatch(selectBoardAction(state.nextBoard.spec.boardId));
    }
    history.go(-1);
  };
  const handleBackButtonClick = () => {
    history.go(-1);
  };

  return (
    <div className="BoardPage">
      <div className="BoardPage--Back">
        <BackButton onClick={handleBackButtonClick} />
      </div>
      {board ? (
        <BoardView
          board={board}
          onPaletteFillChange={handleOnPaletteFillChange}
          onCellClick={handleOnCellClick}
          onCellZoneSelect={handleCellZoneSelect}
          onNextClick={handleOnNextClick}
        />
      ) : (
        <span>...</span>
      )}
    </div>
  );
};
