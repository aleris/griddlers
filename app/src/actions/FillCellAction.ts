import { CoordinateKey, Fill, Grid } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import { GameState, GameActionDispatch } from "../GameContext";
import { completeBoardAction } from "./CompleteBoardAction";

export const FillCellActionCode = "FillCell";

export type FillCellActionType = {
  code: typeof FillCellActionCode;
  coordinate: CoordinateKey;
  fill: Fill;
};

export const fillCellReducer = (
  state: GameState,
  { coordinate, fill }: FillCellActionType
): GameState => {
  if (state.selectedBoard === null) {
    console.error("fillCellReducer selectedBoard is null");
    return state;
  }
  const grid = mutateGridWithGuessFill(
    state.selectedBoard.grid,
    coordinate,
    fill
  );
  console.log("fillCellReducer grid after", grid);
  return {
    ...state,
    selectedBoard: {
      ...state.selectedBoard,
      grid,
    },
  };
};

function mutateGridWithGuessFill(
  grid: Grid,
  coordinate: CoordinateKey,
  fill: Fill
) {
  const gridWithNewFill: Grid = {
    ...grid,
    [coordinate]: {
      ...grid[coordinate],
      guessed: fill,
    },
  };
  return gridWithNewFill;
}

export const fillCellAction = (coordinate: CoordinateKey, fill: Fill) => async (
  state: GameState,
  dispatch: GameActionDispatch
) => {
  if (state.selectedBoard === null) {
    console.error("fillCellAction selectedBoard is null");
    return;
  }
  const grid = mutateGridWithGuessFill(
    state.selectedBoard.grid,
    coordinate,
    fill
  );
  const board = { ...state.selectedBoard, grid };
  const completed = BoardSupport.isCompleted(board);
  await dispatch({
    code: FillCellActionCode,
    coordinate,
    fill,
  });
  if (completed) {
    const completeBoardActionDispatch = await completeBoardAction(board);
    await dispatch(completeBoardActionDispatch);
  }
};
