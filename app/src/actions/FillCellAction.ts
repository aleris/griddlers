import { Fill, Grid, GridPosition } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import { GameState, GameActionDispatch } from "../GameContext";
import { completeBoardAction } from "./CompleteBoardAction";

export const FillCellActionCode = "FillCell";

export type FillCellActionType = {
  code: typeof FillCellActionCode;
  from: GridPosition;
  to: GridPosition;
  fill: Fill;
};

export const fillCellReducer = (
  state: GameState,
  { from, to, fill }: FillCellActionType
): GameState => {
  if (state.selectedBoard === null) {
    return state;
  }
  const grid = mutateGridWithGuessFill(
    state.selectedBoard.grid,
    from,
    to,
    fill
  );
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
  from: GridPosition,
  to: GridPosition,
  guessFill: Fill
) {
  return BoardSupport.replaceGridZone(grid, from, to, undefined, guessFill);
}

export const fillCellAction =
  (from: GridPosition, to: GridPosition, fill: Fill) =>
  async (state: GameState, dispatch: GameActionDispatch) => {
    if (state.selectedBoard === null) {
      return;
    }
    const grid = mutateGridWithGuessFill(
      state.selectedBoard.grid,
      from,
      to,
      fill
    );
    const board = { ...state.selectedBoard, grid };
    const completed = BoardSupport.isCompleted(board);
    await dispatch({
      code: FillCellActionCode,
      from,
      to,
      fill,
    });
    if (completed) {
      const revealedBoard = board.spec.withHiddenColors
        ? BoardSupport.revealHiddenColors(board)
        : board;
      const completeBoardActionDispatch = await completeBoardAction(
        revealedBoard
      );
      await dispatch(completeBoardActionDispatch);
    }
  };
