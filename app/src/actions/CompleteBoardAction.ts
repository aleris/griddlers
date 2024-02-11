import { Board } from "../board/Board";
import { GameState, GameActionDispatch } from "../GameContext";
import { PackWithProgress } from "../home/PackWithProgress";
import { BoardRegistry } from "../registry/BoardRegistry";

export const CompleteBoardActionCode = "CompleteBoard";

export type CompleteBoardActionType = {
  code: typeof CompleteBoardActionCode;
  board: Board;
  nextBoard: Board | null;
  completedBoards: Board[];
  pack: PackWithProgress;
};

export const completeBoardReducer = (
  state: GameState,
  { board, nextBoard, completedBoards, pack }: CompleteBoardActionType
): GameState => {
  if (state.selectedBoard === null) {
    console.error("completeBoardReducer selectedBoard is null");
    return state;
  }
  return {
    ...state,
    selectedBoard: {
      ...board,
      completed: true,
    },
    nextBoard,
    completedBoards,
    selectedPack: pack,
  };
};

export const completeBoardAction =
  (board: Board) => async (state: GameState, dispatch: GameActionDispatch) => {
    const nextBoard = await BoardRegistry.completeBoard(board);
    const completedBoards = await BoardRegistry.getCompleted(board.packId);
    const pack = await BoardRegistry.getPackWithProgress(board.packId);
    await dispatch({
      code: CompleteBoardActionCode,
      board,
      nextBoard,
      completedBoards,
      pack,
    });
  };
