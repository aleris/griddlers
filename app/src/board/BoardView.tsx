import "./BoardView.scss";
import React from "react";
import classNames from "../classNames";
import { IconButton } from "../IconButton";
import NextSvg from "../assets/next.svg";
import { Board, Fill, GridPosition } from "./Board";
import { PaletteView } from "./PaletteView";
import { SuccessAnimationContainer } from "./SuccessAnimationContainerView";
import MedalColor from "../assets/medal-color.svg";
import { BoardSheetView } from "./BoardSheetView";
import { BoardSizing } from "./BoardSizing";

type Props = {
  board: Board;
  onCellClick: (position: GridPosition) => void;
  onCellZoneSelect: (from: GridPosition, to: GridPosition) => void;
  onPaletteFillChange: (fill: Fill) => void;
  onNextClick: () => void;
};

export const BoardView = ({
  board,
  onCellClick,
  onCellZoneSelect,
  onPaletteFillChange,
  onNextClick,
}: Props) => {
  return (
    <SuccessAnimationContainer animate={board.completed}>
      <BoardSizing
        board={board}
        show={(boardSized) => (
          <div className="Board">
            <BoardSheetView
              boardSized={boardSized}
              onCellClick={onCellClick}
              onCellZoneSelect={onCellZoneSelect}
            />
            <div
              className={classNames("Board--Palette", {
                Won: board.completed,
              })}
              style={{
                marginTop: `${Math.round(boardSized.size.cellSize / 2)}px`,
                paddingLeft: `${
                  boardSized.size.cluesHSize *
                  (boardSized.size.cellSize + boardSized.size.borderWidth)
                }px`,
              }}
            >
              <PaletteView
                palette={board.palette}
                cellSize={boardSized.size.cellSize}
                currentFill={board.currentPaletteFill}
                onFillChange={onPaletteFillChange}
              />
            </div>
            <div
              className={classNames("Board--Next", {
                Won: board.completed,
              })}
            >
              <div className="Medals">
                {Array.from({ length: board.spec.difficulty }).map(
                  (_, index) => (
                    <img
                      key={index}
                      src={MedalColor}
                      style={{ animationDelay: `${1.25 + index * 0.1}s` }}
                      alt={`Medal ${index + 1}`}
                    />
                  )
                )}
              </div>
              <div className="Button">
                <IconButton
                  type="Primary"
                  disabled={!board.completed}
                  icon={<img src={NextSvg} alt="Continue" />}
                  onClick={onNextClick}
                  title="Continue"
                />
              </div>
            </div>
          </div>
        )}
      />
    </SuccessAnimationContainer>
  );
};
