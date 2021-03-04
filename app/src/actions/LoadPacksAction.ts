import { Dispatch } from "react";
import { Board } from "../board/Board";
import { GameState } from "../GameContext";
import {PackWithProgress} from '../home/PackWithProgress'
import { BoardRegistry } from "../registry/BoardRegistry";

export const LoadPacksActionCode = "LoadPacks";

export type LoadPacksActionType = {
  code: typeof LoadPacksActionCode;
  packs: PackWithProgress[]
};

export const loadPacksReducer = (
  state: GameState,
  { packs }: LoadPacksActionType
): GameState => {
  return {
    ...state,
    packs
  };
};

export const loadPacksAction = () => async (
  state: GameState,
  dispatch: Dispatch<LoadPacksActionType>
) => {
  const packs = await BoardRegistry.getPacksWithProgress();
  await dispatch({
    code: LoadPacksActionCode,
    packs
  });
};
