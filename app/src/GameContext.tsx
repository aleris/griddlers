import React, { createContext, Dispatch, useEffect, useReducer } from "react";
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
  GameFinishedActionCode,
  GameFinishedActionType,
  gameFinishedReducer,
} from "./actions/GameFinishedAction";
import {
  loadFromLocalStorageAction,
  LoadFromLocalStorageActionCode,
  LoadFromLocalStorageActionType,
  loadFromLocalStorageReducer,
} from "./actions/LoadFromLocalStorageAction";
import {
  SelectBoardActionCode,
  SelectBoardActionType,
  selectBoardReducer,
} from "./actions/SelectBoardAction";
import { Board } from "./board/Board";
import { BoardBuilder } from "./board/BoardBuilder";
import { BoardRegistry } from "./registry/BoardRegistry";

export type GameActionType =
  | LoadFromLocalStorageActionType
  | SelectBoardActionType
  | ChangePaletteFillActionType
  | FillCellActionType
  | GameFinishedActionType
  | CompleteBoardActionType;

export type GameState = {
  selectedBoard: Board | null;
  nextBoard: Board | null;
  completedBoards: Board[];
  gameFinished: boolean;
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
    case FillCellActionCode:
      return fillCellReducer(state, action);

    case ChangePaletteFillActionCode:
      return changePaletteFillReducer(state, action);

    case LoadFromLocalStorageActionCode:
      return loadFromLocalStorageReducer(state, action);

    case GameFinishedActionCode:
      return gameFinishedReducer(state, action);

    case SelectBoardActionCode:
      return selectBoardReducer(state, action);

    case CompleteBoardActionCode:
      return completeBoardReducer(state, action);

    default:
      return state;
  }
};

const firstBoard: Board = BoardBuilder.buildBoardFromPictureSpec(
  BoardRegistry.pictureSpecs[0]
);

const initialState: GameState = {
  selectedBoard: null,
  nextBoard: firstBoard,
  completedBoards: [],
  gameFinished: false,
};

export const GameContext = createContext<Context>({
  state: initialState,
  dispatch: () => () => {},
});

export const GameProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    console.log("GameProvider LoadCurrentBoardActionCode");
    // dispatchWithGameAction(state, loadFromLocalStorageAction)
    (async () => await loadFromLocalStorageAction()(state, dispatch))();
  }, []);

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
