import { Board } from "../board/Board";
import { GameState, GameActionDispatch } from "../GameContext";
import { BoardRegistry } from "../registry/BoardRegistry";

export const CompleteBoardActionCode = "CompleteBoard";

export type CompleteBoardActionType = {
  code: typeof CompleteBoardActionCode;
  completed: true;
  nextBoard: Board | null;
  completedBoards: Board[];
  gameFinished: boolean;
};

export const completeBoardReducer = (
  state: GameState,
  {
    completed,
    nextBoard,
    completedBoards,
    gameFinished,
  }: CompleteBoardActionType
): GameState => {
  if (state.selectedBoard === null) {
    console.error("completeBoardReducer selectedBoard is null");
    return state;
  }
  return {
    ...state,
    selectedBoard: {
      ...state.selectedBoard,
      completed,
    },
    nextBoard,
    completedBoards,
    gameFinished,
  };
};

export const completeBoardAction = (board: Board) => async (
  state: GameState,
  dispatch: GameActionDispatch
) => {
  const completed = true;
  const nextBoard = await BoardRegistry.completeBoard(board);
  const completedBoards = await BoardRegistry.getCompleted();
  const gameFinished = nextBoard === null;
  await dispatch({
    code: CompleteBoardActionCode,
    completed,
    nextBoard,
    completedBoards,
    gameFinished,
  });
};
