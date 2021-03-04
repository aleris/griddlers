import { Dispatch } from "react";
import { Board } from "../board/Board";
import { GameState } from "../GameContext";
import { BoardRegistry } from "../registry/BoardRegistry";

export const SelectBoardActionCode = "SelectBoard";

export type SelectBoardActionType = {
  code: typeof SelectBoardActionCode;
  board: Board;
};

export const selectBoardReducer = (
  state: GameState,
  { board }: SelectBoardActionType
): GameState => {
  return {
    ...state,
    selectedBoard: board,
  };
};

export const selectBoardAction = (id: string) => async (
  state: GameState,
  dispatch: Dispatch<SelectBoardActionType>
) => {
  const board = await BoardRegistry.getCompletedOrCurrentById(state.selectedPack.packId, id);
  console.log('selectBoardAction', id, board)
  await dispatch({
    code: SelectBoardActionCode,
    board,
  });
};
