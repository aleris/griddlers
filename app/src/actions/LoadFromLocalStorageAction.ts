import { Dispatch } from "react";
import { Board } from "../board/Board";
import { GameState } from "../GameContext";
import { BoardRegistry } from "../registry/BoardRegistry";

export const LoadFromLocalStorageActionCode = "LoadFromLocalStorage";

export type LoadFromLocalStorageActionType = {
  code: typeof LoadFromLocalStorageActionCode;
  nextBoard: Board;
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

export const loadFromLocalStorageAction = () => async (
  state: GameState,
  dispatch: Dispatch<LoadFromLocalStorageActionType>
) => {
  const nextBoard = await BoardRegistry.getNext();
  const completedBoards = await BoardRegistry.getCompleted();
  await dispatch({
    code: LoadFromLocalStorageActionCode,
    nextBoard,
    completedBoards,
  });
};
