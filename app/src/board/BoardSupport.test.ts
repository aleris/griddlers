import { BoardSpec } from "../registry/BoardSpec";
import { FillEmpty } from "./Board";
import { BoardBuilder } from "./BoardBuilder";
import { BoardSupport } from "./BoardSupport";

describe("BoardWinChecker", () => {
  const testSpec: BoardSpec = {
    boardId: "test",
    cellSpecs: `
#.
##
`,
    palette: {
      ".": FillEmpty,
      "#": "black",
    },
  };
  const board = BoardBuilder.buildBoardFromPictureSpec(testSpec);

  test("isWin returns false if clues does not match", () => {
    BoardSupport.mapEachCell(
      board,
      (cell, coordinateKey, rowIndex, colIndex) => {
        cell.guessed = cell.fill;
      }
    );
    board.grid["1:0"].guessed = FillEmpty;
    expect(BoardSupport.isCompleted(board)).toStrictEqual(false);
  });

  test("isWin returns true if clues match", () => {
    BoardSupport.mapEachCell(
      board,
      (cell, coordinateKey, rowIndex, colIndex) => {
        cell.guessed = cell.fill;
      }
    );
    expect(BoardSupport.isCompleted(board)).toStrictEqual(true);
  });
});
