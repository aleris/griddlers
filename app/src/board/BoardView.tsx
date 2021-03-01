import "./BoardView.scss";
import React from "react";
import classNames from "../classNames";
import { IconButton } from "../IconButton";
import { IconNext } from "../Icons";
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

  const cellSize = 2;
  const borderWidth = 0.03125;
  const fontSize = Math.round(100 * cellSize * 0.75) / 100;

  return (
    <SuccessAnimationContainer animate={board.completed}>
      <div className="Board">
        <div
          className="Board--Sheet"
          style={{
            width: `${(cluesHSize + gridWidth) * cellSize}rem`,
            fontSize: `${fontSize}rem`,
          }}
        >
          <div
            style={{
              width: `${cluesHSize * cellSize}rem`,
              height: `${cluesVSize * cellSize}rem`,
            }}
          >
            <CornerView />
          </div>
          <div
            style={{
              width: `${gridWidth * cellSize}rem`,
              height: `${cluesVSize * cellSize}rem`,
            }}
          >
            <CluesVRegionView clueLines={board.cluesV} cellSize={cellSize} />
          </div>
          <div
            style={{
              width: `${cluesHSize * cellSize}rem`,
              height: `${gridHeight * cellSize}rem`,
            }}
          >
            <CluesHRegionView clueLines={board.cluesH} cellSize={cellSize} />
          </div>
          <div
            style={{
              width: `${gridWidth * cellSize}rem`,
              height: `${gridHeight * cellSize}rem`,
            }}
          >
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
            width: `${gridWidth * cellSize}rem`,
            height: `${cellSize + borderWidth}rem`,
            marginLeft: `${cluesHSize * cellSize}rem`,
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
