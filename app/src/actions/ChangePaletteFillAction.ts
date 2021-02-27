import { Dispatch } from "react";
import { Fill } from "../board/Board";
import { GameState } from "../GameContext";

export const ChangePaletteFillActionCode = "ChangePaletteFill";

export type ChangePaletteFillActionType = {
  code: typeof ChangePaletteFillActionCode;
  fill: Fill;
};

export const changePaletteFillReducer = (
  state: GameState,
  { fill }: ChangePaletteFillActionType
): GameState => {
  if (state.selectedBoard === null) {
    console.warn("changePaletteFillReducer selectedBoard is null");
    return state;
  }
  return {
    ...state,
    selectedBoard: {
      ...state.selectedBoard,
      currentPaletteFill: fill,
    },
  };
};

export const changePaletteFillAction = (fill: Fill) => async (
  state: GameState,
  dispatch: Dispatch<ChangePaletteFillActionType>
) => {
  await dispatch({
    code: ChangePaletteFillActionCode,
    fill,
  });
};
