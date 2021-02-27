import { Dispatch } from "react";
import { Board } from "../board/Board";
import { GameState } from "../GameContext";
import { BoardRegistry } from "../registry/BoardRegistry";

export const GameFinishedActionCode = "GameFinished";

export type GameFinishedActionType = {
  code: typeof GameFinishedActionCode;
};

export const gameFinishedReducer = (
  state: GameState,
  _: GameFinishedActionType
): GameState => {
  return {
    ...state,
    gameFinished: true,
  };
};

export const gameFinishedAction = () => async (
  state: GameState,
  dispatch: Dispatch<GameFinishedActionType>
) => {
  await dispatch({
    code: GameFinishedActionCode,
  });
};
