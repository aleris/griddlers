import React from "react";
import { BoardBuilder } from "./BoardBuilder";
import { packHelp } from "../registry/packHelp";
import { BoardSheetView } from "./BoardSheetView";
import { BoardSizing } from "./BoardSizing";
import "./HelpPage.scss";
import { BoardSupport } from "./BoardSupport";
import { HudIconButton } from "../HudIconButton";
import CloseIcon from "../assets/close.svg";
import { PaletteView } from "./PaletteView";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const HelpPage = ({ isOpen, onClose }: Props) => {
  if (!isOpen) {
    return null;
  }
  const boardHelp1 = BoardBuilder.buildBoardFromSpec(
    packHelp.id,
    packHelp.boardSpecs[0]
  );
  const boardHelp1Solution = BoardSupport.revealSolution(
    BoardBuilder.buildBoardFromSpec(packHelp.id, packHelp.boardSpecs[0])
  );

  const boardHelp2 = BoardSupport.revealSolution(
    BoardBuilder.buildBoardFromSpec(packHelp.id, packHelp.boardSpecs[1])
  );
  const boardHelp3 = BoardSupport.revealSolution(
    BoardBuilder.buildBoardFromSpec(packHelp.id, packHelp.boardSpecs[2])
  );

  return (
    <div className="HelpPage">
      <div className="HelpPage--Frame">
        <HudIconButton
          onClick={onClose}
          title="Close"
          iconSrc={CloseIcon}
          justify="End"
          additionalClassName="HelpPage--Frame--CloseButton"
        />
        <div className="HelpPage--Frame--Content">
          <h3>About</h3>

          <p>
            Color Griddlers is a logic puzzle in which cells in the grid must be
            colored or left blank according to numbers at the edges of the grid
            to reveal a hidden picture. The scope of the puzzle is to discover
            the hidden picture by following the edge clues and coloring the
            correct cells in the grid.
          </p>

          <h3>Clues</h3>

          <p>
            The numbers at the edges of the grid measures how many unbroken
            lines of filled-in squares there are in any given row or column. For
            example, the clue of <b>5</b> on the first row of the example below,
            means there are five filled consecutive squares. The clue of{" "}
            <b>3 1 2</b> on the next row means there are sets of three, one, and
            two filled squares, in this order, with at least one blank square
            between successive sets:
          </p>

          <div className="HelpPage--Frame--Content--Example">
            <BoardSizing
              board={boardHelp1}
              show={(boardSized) => (
                <BoardSheetView
                  boardSized={boardSized}
                  onCellClick={() => {}}
                  onCellZoneSelect={() => {}}
                  interactive={false}
                />
              )}
            />
          </div>

          <p>
            Similar clues are given for the columns of the grid. For example,
            the first column has <b>2</b> filled squares, and the last column
            has just <b>1</b> filled square.
          </p>

          <p>
            Given the clues above, the grid can be resolved as in the image
            below:
          </p>

          <div className="HelpPage--Frame--Content--Example">
            <BoardSizing
              board={boardHelp1Solution}
              show={(boardSized) => (
                <BoardSheetView
                  boardSized={boardSized}
                  onCellClick={() => {}}
                  onCellZoneSelect={() => {}}
                  interactive={false}
                />
              )}
            />
          </div>

          <h3>Controls</h3>

          <p>The palette is used to select the fill for the cells.</p>

          <div className="HelpPage--Frame--Content--Example">
            <BoardSizing
              board={boardHelp1}
              show={(boardSized) => (
                <PaletteView
                  palette={boardSized.board.palette}
                  currentFill={boardSized.board.currentPaletteFill}
                  onFillChange={() => {}}
                  cellSize={boardSized.size.cellSize}
                  interactive={false}
                />
              )}
            />
          </div>

          <ul>
            <li>
              The first cell in the palette is to clear the fill to a blank
              cell.
            </li>
            <li>
              The second cell is to explicitly mark the cell as a blank cell.
              You can use this as an aid for cells that are logically determined
              to be blanks.
            </li>
            <li>The third cell is to fill a cell.</li>
          </ul>

          <p>
            Click on a cell in palette to change the current fill mode. You can
            also switch between the selection using the keyboard: press <b>1</b>{" "}
            for clear to blank, <b>2</b> to explicitly mark the cell as blank,{" "}
            <b>3</b> to fill.
          </p>

          <p>You can also drag the mouse to fill multiple cells at once.</p>

          <h3>Solving</h3>

          <p>
            When all the clues from the edges are satisfied, the puzzle is
            solved. Start by looking for clues that are most restrictive and
            mark the cells according to the rules. Then you can start to make
            assumptions and see if they lead or not to a contradiction.
          </p>

          <p>
            It may be possible to have more than one solution for a puzzle, like
            in this simple example:
          </p>

          <div className="HelpPage--Frame--Content--ExampleGroup">
            <div className="HelpPage--Frame--Content--Example">
              <BoardSizing
                board={boardHelp2}
                show={(boardSized) => (
                  <BoardSheetView
                    boardSized={boardSized}
                    onCellClick={() => {}}
                    onCellZoneSelect={() => {}}
                    interactive={false}
                  />
                )}
              />
            </div>
            <div className="HelpPage--Frame--Content--Example">
              <BoardSizing
                board={boardHelp3}
                show={(boardSized) => (
                  <BoardSheetView
                    boardSized={boardSized}
                    onCellClick={() => {}}
                    onCellZoneSelect={() => {}}
                    interactive={false}
                  />
                )}
              />
            </div>
          </div>

          <p>When you solve a puzzle, the next puzzle will be unlocked.</p>

          <h3>Colors</h3>

          <p>
            The first level of the game is played with only two colors: black
            and white. The second level is still played with two colors, but
            when complete, it will reveal a colored picture. The next levels are
            played with more than two colors.
          </p>
        </div>
      </div>
    </div>
  );
};
