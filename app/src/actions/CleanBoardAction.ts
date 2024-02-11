import { Board, FillEmpty } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import { GameActionDispatch, GameState } from "../GameContext";

export const CleanBoardActionCode = "CleanBoard";

export type CleanBoardActionType = {
  code: typeof CleanBoardActionCode;
};

export const cleanBoardReducer = (
  state: GameState,
  {}: CleanBoardActionType
): GameState => {
  if (state.selectedBoard === null) {
    return state;
  }
  const grid = cleanGrid(state.selectedBoard);
  return {
    ...state,
    selectedBoard: {
      ...state.selectedBoard,
      grid,
    },
  };
};

function cleanGrid(inBoard: Board) {
  return BoardSupport.replaceGridZone(
    inBoard.grid,
    { rowIndex: 0, colIndex: 0 },
    {
      rowIndex: inBoard.cluesH.length - 1,
      colIndex: inBoard.cluesV.length - 1,
    },
    FillEmpty,
    null
  );
}

export const cleanBoardAction =
  () => async (state: GameState, dispatch: GameActionDispatch) => {
    await dispatch({ code: CleanBoardActionCode });
  };
