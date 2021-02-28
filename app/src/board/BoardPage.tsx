import "./BoardPage.scss";
import React, { useContext, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import { changePaletteFillAction } from "../actions/ChangePaletteFillAction";
import { fillCellAction } from "../actions/FillCellAction";
import { loadFromLocalStorageAction } from "../actions/LoadFromLocalStorageAction";
import { selectBoardAction } from "../actions/SelectBoardAction";
import { GameContext } from "../GameContext";
import { CoordinateKey, Fill } from "./Board";
import { BoardView } from "./BoardView";

export const BoardPage = () => {
  const { state, dispatch } = useContext(GameContext);
  useEffect(() => {
    console.log("BoardPage useEffect");
    if (state.selectedBoard === null) {
      console.log(
        "BoardPage useEffect selectedBoard is null, loading from local storage..."
      );
      dispatch(loadFromLocalStorageAction());
    }
  }, [state.selectedBoard?.id, state.selectedBoard, dispatch]);
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
    if (state.nextBoard === null) {
      console.error("BoardPage handleOnNextClick nextBoard is null");
      return;
    }
    console.log("handleOnNextClick", state.nextBoard.id);
    dispatch(selectBoardAction(state.nextBoard.id));
    history.push('/')
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
