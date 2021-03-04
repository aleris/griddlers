import "./BoardPage.scss";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { changePaletteFillAction } from "../actions/ChangePaletteFillAction";
import { fillCellAction } from "../actions/FillCellAction";
import { selectBoardAction } from "../actions/SelectBoardAction";
import { GameContext } from "../GameContext";
import { CoordinateKey, Fill } from "./Board";
import { BoardView } from "./BoardView";

export const BoardPage = () => {
  const { state, dispatch } = useContext(GameContext);
  const handleOnPaletteFillChange = (fill: Fill) => {
    dispatch(changePaletteFillAction(fill));
  };
  const handleOnCellClick = async (coordinateKey: CoordinateKey) => {
    if (state.selectedBoard === null) {
      console.error("BoardPage handleOnCellClick selectedBoard is null");
      return;
    }
    dispatch(
      fillCellAction(coordinateKey, state.selectedBoard.currentPaletteFill)
    );
  };
  const history = useHistory();
  const handleOnNextClick = () => {
    if (state.nextBoard !== null) {
      dispatch(selectBoardAction(state.nextBoard.spec.boardId));
    }
    history.go(-1);
  };

  return (
    <div className="BoardPage">
      {state.selectedBoard ? (
        <BoardView
          board={state.selectedBoard}
          onPaletteFillChange={handleOnPaletteFillChange}
          onCellClick={handleOnCellClick}
          onNextClick={handleOnNextClick}
        />
      ) : (
        <span>...</span>
      )}
    </div>
  );
};
