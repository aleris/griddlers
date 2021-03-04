import React, { createContext, Dispatch, useReducer } from "react";
import {
  ChangePaletteFillActionCode,
  ChangePaletteFillActionType,
  changePaletteFillReducer,
} from "./actions/ChangePaletteFillAction";
import {
  CompleteBoardActionCode,
  CompleteBoardActionType,
  completeBoardReducer,
} from "./actions/CompleteBoardAction";
import {
  FillCellActionCode,
  FillCellActionType,
  fillCellReducer,
} from "./actions/FillCellAction";
import {
  loadFromLocalStorageAction,
  LoadFromLocalStorageActionCode,
  LoadFromLocalStorageActionType,
  loadFromLocalStorageReducer,
} from "./actions/LoadFromLocalStorageAction";
import {LoadPacksActionCode, LoadPacksActionType, loadPacksReducer} from './actions/LoadPacksAction'
import {
  SelectBoardActionCode,
  SelectBoardActionType,
  selectBoardReducer,
} from "./actions/SelectBoardAction";
import {SelectPackActionCode, SelectPackActionType, selectPackReducer} from './actions/SelectPackAction'
import { Board } from "./board/Board";
import { BoardBuilder } from "./board/BoardBuilder";
import {PackWithProgress} from './home/PackWithProgress'
import { BoardRegistry } from "./registry/BoardRegistry";
import {Pack} from './registry/Pack'

export type GameActionType =
  | LoadPacksActionType
  | LoadFromLocalStorageActionType
  | SelectPackActionType
  | SelectBoardActionType
  | ChangePaletteFillActionType
  | FillCellActionType
  | CompleteBoardActionType;

export type GameState = {
  selectedPack: PackWithProgress;
  selectedBoard: Board | null;
  nextBoard: Board | null;
  completedBoards: Board[];
  packs: PackWithProgress[];
};

export type GameAction = (
  state: GameState,
  dispatch: GameActionDispatch
) => void;
export type GameActionDispatch = Dispatch<GameAction | GameActionType>;

const dispatchWithGameAction = (
  state: GameState,
  dispatch: Dispatch<GameActionType>
) => (action: GameAction | GameActionType) => {
  if (action instanceof Function) {
    console.log("action", action.name, "->");
    action(state, dispatchWithGameAction(state, dispatch));
  } else {
    console.log("action", action.code, action);
    dispatch(action);
  }
};

type Context = {
  state: GameState;
  dispatch: GameActionDispatch;
};

const gameReducer = (state: GameState, action: GameActionType): GameState => {
  console.log("reducer", action);
  switch (action.code) {
    case LoadPacksActionCode:
      return loadPacksReducer(state, action);

    case FillCellActionCode:
      return fillCellReducer(state, action);

    case ChangePaletteFillActionCode:
      return changePaletteFillReducer(state, action);

    case LoadFromLocalStorageActionCode:
      return loadFromLocalStorageReducer(state, action);

    case SelectBoardActionCode:
      return selectBoardReducer(state, action);

    case SelectPackActionCode:
      return selectPackReducer(state, action);

    case CompleteBoardActionCode:
      return completeBoardReducer(state, action);

    default:
      return state;
  }
};

const firstPack = BoardRegistry.packs[0]
const firstBoard: Board = BoardBuilder.buildBoardFromPictureSpec(
  firstPack.id,
  firstPack.pictureSpecs[0]
);

const initialState: GameState = {
  selectedPack: { packId: firstPack.id, coverBoard: firstBoard, completedPercent: 0, completedMedals: 0, totalMedals: 1 },
  selectedBoard: null,
  nextBoard: firstBoard,
  completedBoards: [],
  packs: []
};

export const GameContext = createContext<Context>({
  state: initialState,
  dispatch: () => () => {},
});

export const GameProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch: dispatchWithGameAction(state, dispatch),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
