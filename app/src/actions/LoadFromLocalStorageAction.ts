import { Dispatch } from "react";
import { Board } from "../board/Board";
import { GameState } from "../GameContext";
import { BoardRegistry } from "../registry/BoardRegistry";

export const LoadFromLocalStorageActionCode = "LoadFromLocalStorage";

export type LoadFromLocalStorageActionType = {
  code: typeof LoadFromLocalStorageActionCode;
  nextBoard: Board | null;
  completedBoards: Board[];
};

export const loadFromLocalStorageReducer = (
  state: GameState,
  { nextBoard, completedBoards }: LoadFromLocalStorageActionType
): GameState => {
  const selectedBoard = nextBoard;
  return {
    ...state,
    nextBoard,
    selectedBoard,
    completedBoards,
  };
};

export const loadFromLocalStorageAction = (packId: string) => async (
  state: GameState,
  dispatch: Dispatch<LoadFromLocalStorageActionType>
) => {
  const nextBoard = await BoardRegistry.getNext(state.selectedPack.packId);
  const completedBoards = await BoardRegistry.getCompleted(state.selectedPack.packId);
  await dispatch({
    code: LoadFromLocalStorageActionCode,
    nextBoard,
    completedBoards,
  });
};
