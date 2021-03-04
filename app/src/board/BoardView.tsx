import "./BoardView.scss";
import React from "react";
import classNames from "../classNames";
import { IconButton } from "../IconButton";
import { IconNext } from "../Icons";
import useWindowSize from '../useWindowSize'
import { Board, CoordinateKey, Fill } from "./Board";
import { BoardSupport } from "./BoardSupport";
import { CluesHRegionView } from "./CluesHRegionView";
import { CluesVRegionView } from "./CluesVRegionView";
import { CornerView } from "./CornerView";
import { GridView } from "./GridView";
import { PaletteView } from "./PaletteView";
import { SuccessAnimationContainer } from "./SuccessAnimationContainerView";
import MedalColor from "../assets/medal-color.svg";

type Props = {
  board: Board;
  onCellClick: (coordinateKey: CoordinateKey) => void;
  onPaletteFillChange: (fill: Fill) => void;
  onNextClick: () => void;
};

export const BoardView = ({
  board,
  onCellClick,
  onPaletteFillChange,
  onNextClick,
}: Props) => {
  const gridWidth = BoardSupport.width(board);
  const gridHeight = BoardSupport.height(board);
  const cluesHSize = BoardSupport.cluesHSize(board);
  const cluesVSize = BoardSupport.cluesVSize(board);
  const {windowWidth, windowHeight} = useWindowSize()
  const windowMin = Math.min(windowWidth, windowHeight)

  const cellSize = Math.min(48, windowMin / Math.max(gridWidth + cluesHSize, gridHeight + cluesVSize + 2));
  const borderWidth = 1;
  const fontSize = Math.round(100 * cellSize * 0.75) / 100;

  return (
    <SuccessAnimationContainer animate={board.completed}>
      <div className="Board">
        <div
          className="Board--Sheet"
          style={{
            gridTemplateColumns: `${cluesHSize * (cellSize + borderWidth)}px ${gridWidth * (cellSize + borderWidth) + borderWidth}px`,
            gridTemplateRows: `${cluesVSize * (cellSize + borderWidth)}px ${gridHeight * (cellSize + borderWidth) + borderWidth}px`,
            fontSize: `${fontSize}px`,
          }}
        >
          <div>
            <CornerView />
          </div>
          <div>
            <CluesVRegionView board={board} cellSize={cellSize} />
          </div>
          <div>
            <CluesHRegionView board={board} cellSize={cellSize} />
          </div>
          <div>
            <GridView
              board={board}
              cellSize={cellSize}
              onCellClick={onCellClick}
            />
          </div>
        </div>
        <div
          className={classNames("Board--Palette", {
            Won: board.completed,
          })}
          style={{
            marginTop: `${Math.round(cellSize / 2)}px`,
            paddingLeft: `${cluesHSize * (cellSize + borderWidth)}px`,
          }}
        >
          <PaletteView
            palette={board.palette}
            cellSize={cellSize}
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
            {Array.from({ length: BoardSupport.difficultyShown(board) }).map(
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
              icon={IconNext}
              onAnimationFinished={onNextClick}
            />
          </div>
        </div>
      </div>
    </SuccessAnimationContainer>
  );
};
