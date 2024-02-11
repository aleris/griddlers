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
  LoadPacksActionCode,
  LoadPacksActionType,
  loadPacksReducer,
} from "./actions/LoadPacksAction";
import {
  SelectBoardActionCode,
  SelectBoardActionType,
  selectBoardReducer,
} from "./actions/SelectBoardAction";
import {
  SelectPackActionCode,
  SelectPackActionType,
  selectPackReducer,
} from "./actions/SelectPackAction";
import { Board } from "./board/Board";
import { BoardBuilder } from "./board/BoardBuilder";
import { PackWithProgress } from "./home/PackWithProgress";
import { BoardRegistry } from "./registry/BoardRegistry";
import {
  CleanBoardActionCode,
  CleanBoardActionType,
  cleanBoardReducer,
} from "./actions/CleanBoardAction";

export type GameActionType =
  | LoadPacksActionType
  | SelectPackActionType
  | SelectBoardActionType
  | ChangePaletteFillActionType
  | FillCellActionType
  | CleanBoardActionType
  | CompleteBoardActionType;

export type GameState = {
  selectedPack: PackWithProgress | null;
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

const dispatchWithGameAction =
  (state: GameState, dispatch: Dispatch<GameActionType>) =>
  async (action: GameAction | GameActionType) => {
    if (action instanceof Function) {
      // console.log('action', action.name, '->')
      await action(state, dispatchWithGameAction(state, dispatch));
    } else {
      // console.log('action', action.code, action)
      await dispatch(action);
    }
  };

type Context = {
  state: GameState;
  dispatch: GameActionDispatch;
};

const gameReducer = (state: GameState, action: GameActionType): GameState => {
  switch (action.code) {
    case LoadPacksActionCode:
      return loadPacksReducer(state, action);

    case SelectBoardActionCode:
      return selectBoardReducer(state, action);

    case SelectPackActionCode:
      return selectPackReducer(state, action);

    case FillCellActionCode:
      return fillCellReducer(state, action);

    case ChangePaletteFillActionCode:
      return changePaletteFillReducer(state, action);

    case CleanBoardActionCode:
      return cleanBoardReducer(state, action);

    case CompleteBoardActionCode:
      return completeBoardReducer(state, action);

    default:
      return state;
  }
};

const firstPack = BoardRegistry.packs[0];
const firstBoard: Board = BoardBuilder.buildBoardFromSpec(
  firstPack.id,
  firstPack.boardSpecs[0]
);

const initialState: GameState = {
  selectedPack: null,
  selectedBoard: null,
  nextBoard: firstBoard,
  completedBoards: [],
  packs: [],
};

export const GameContext = createContext<Context>({
  state: initialState,
  dispatch: () => () => {},
});

type GameProviderProps = {
  children: React.ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
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
