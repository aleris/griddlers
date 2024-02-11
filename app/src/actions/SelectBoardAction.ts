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

export const selectBoardAction =
  (id: string) =>
  async (state: GameState, dispatch: Dispatch<SelectBoardActionType>) => {
    if (state.selectedPack === null) {
      console.error("selectBoardAction selectedPack is null");
      return;
    }
    const board = await BoardRegistry.getCurrentOrLoad(
      state.selectedPack.packId,
      id
    );
    await dispatch({
      code: SelectBoardActionCode,
      board,
    });
  };
