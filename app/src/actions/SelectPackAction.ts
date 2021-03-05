import { Dispatch } from "react";
import { Board } from "../board/Board";
import { GameState } from "../GameContext";
import { PackWithProgress } from "../home/PackWithProgress";
import { BoardRegistry } from "../registry/BoardRegistry";

export const SelectPackActionCode = "SelectPack";

export type SelectPackActionType = {
  code: typeof SelectPackActionCode;
  pack: PackWithProgress;
  completedBoards: Board[];
  nextBoard: Board | null;
};

export const selectPackReducer = (
  state: GameState,
  { pack, completedBoards, nextBoard }: SelectPackActionType
): GameState => {
  return {
    ...state,
    selectedPack: pack,
    nextBoard,
    completedBoards,
  };
};

export const selectPackAction = (packId: string) => async (
  state: GameState,
  dispatch: Dispatch<SelectPackActionType>
) => {
  const pack = await BoardRegistry.getPackWithProgress(packId);
  const completedBoards = await BoardRegistry.getCompleted(packId);
  const nextBoard = await BoardRegistry.next(packId);
  await dispatch({
    code: SelectPackActionCode,
    pack,
    completedBoards,
    nextBoard,
  });
};
