import "./BoardPage.scss";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { changePaletteFillAction } from "../actions/ChangePaletteFillAction";
import { fillCellAction } from "../actions/FillCellAction";
import { selectBoardAction } from "../actions/SelectBoardAction";
import { GameContext } from "../GameContext";
import { Fill, GridPosition } from "./Board";
import { BoardView } from "./BoardView";
import { cleanBoardAction } from "../actions/CleanBoardAction";
import { HelpPage } from "./HelpPage";
import { HudIconButton } from "../HudIconButton";
import HelpIcon from "../assets/help.svg";
import RubberIcon from "../assets/rubber.svg";
import BackIcon from "../assets/back.svg";

export const BoardPage = () => {
  const { state, dispatch } = useContext(GameContext);
  const board = state.selectedBoard;
  const history = useHistory();
  const [isHelpPageOpen, setIsHelpPageOpen] = React.useState(false);

  useEffect(() => {
    if (board === null) {
      history.replace("/");
    }
  }, [board, history]);

  const handleOnPaletteFillChange = (fill: Fill) => {
    dispatch(changePaletteFillAction(fill));
  };
  const handleOnCellClick = (position: GridPosition) => {
    if (state.selectedBoard === null) {
      console.error("BoardPage handleOnCellClick selectedBoard is null");
      return;
    }
    dispatch(
      fillCellAction(position, position, state.selectedBoard.currentPaletteFill)
    );
  };
  const handleCellZoneSelect = (from: GridPosition, to: GridPosition) => {
    if (state.selectedBoard === null) {
      console.error("BoardPage handleCellZoneSelect selectedBoard is null");
      return;
    }
    dispatch(fillCellAction(from, to, state.selectedBoard.currentPaletteFill));
  };
  const handleOnNextClick = () => {
    if (state.nextBoard !== null) {
      dispatch(selectBoardAction(state.nextBoard.spec.boardId));
    }
    history.go(-1);
  };
  const handleBackButtonClick = () => {
    history.go(-1);
  };
  const handleClearButtonClick = () => {
    if (state.selectedBoard === null) {
      console.error("BoardPage handleClearButtonClick selectedBoard is null");
      return;
    }
    dispatch(cleanBoardAction());
  };

  return (
    <div className="BoardPage">
      <HudIconButton
        onClick={handleBackButtonClick}
        title="Go Back"
        iconSrc={BackIcon}
      />
      {board ? (
        <BoardView
          board={board}
          onPaletteFillChange={handleOnPaletteFillChange}
          onCellClick={handleOnCellClick}
          onCellZoneSelect={handleCellZoneSelect}
          onNextClick={handleOnNextClick}
        />
      ) : (
        <span>...</span>
      )}
      {!(board?.completed ?? false) ? (
        <HudIconButton
          onClick={handleClearButtonClick}
          title="Clear Board"
          iconSrc={RubberIcon}
          justify="End"
        />
      ) : null}
      <HudIconButton
        onClick={() => setIsHelpPageOpen(true)}
        title="Show Help Page"
        iconSrc={HelpIcon}
        justify="End"
        push="1"
      />
      <HelpPage
        isOpen={isHelpPageOpen}
        onClose={() => setIsHelpPageOpen(false)}
      />
    </div>
  );
};
