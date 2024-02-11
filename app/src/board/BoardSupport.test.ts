import { BoardSpec } from "../registry/BoardSpec";
import { FillEmpty, FillHiddenBlock } from "./Board";
import { BoardBuilder } from "./BoardBuilder";
import { BoardSupport } from "./BoardSupport";
import { FillSupport } from "./FillSupport";
import { describe, expect, test } from "vitest";

describe("BoardWinChecker", () => {
  const testSpec: BoardSpec = {
    boardId: "test",
    positionInPack: 1,
    difficulty: 1,
    cellSpecs: `
⬛⬜
🟦🟥
`,
    withHiddenColors: true,
  };
  const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);

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

  test("revealHiddenColors no flips", () => {
    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);
    board.grid["0:0"].guessed = FillHiddenBlock;
    board.grid["1:0"].guessed = FillHiddenBlock;
    board.grid["1:1"].guessed = FillHiddenBlock;

    const boardAsMatrix = BoardBuilder.mapToFillMatrix(board, false, false);
    const result = BoardSupport.revealHiddenColors(board);
    const resultAsMatrix = BoardBuilder.mapToFillMatrix(result, true, false);
    expect(FillSupport.matricesEquals(boardAsMatrix, resultAsMatrix));
  });

  test("revealHiddenColors flip H", () => {
    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);
    board.grid["0:1"].guessed = FillHiddenBlock;
    board.grid["1:0"].guessed = FillHiddenBlock;
    board.grid["1:1"].guessed = FillHiddenBlock;

    const boardAsMatrix = BoardBuilder.mapToFillMatrix(board, false, false);
    const result = BoardSupport.revealHiddenColors(board);
    const resultAsMatrix = BoardBuilder.mapToFillMatrix(result, true, false);
    expect(
      FillSupport.matricesEquals(
        FillSupport.flipMatrixH(boardAsMatrix),
        resultAsMatrix
      )
    );
  });

  test("revealHiddenColors flip V", () => {
    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);
    board.grid["0:0"].guessed = FillHiddenBlock;
    board.grid["0:1"].guessed = FillHiddenBlock;
    board.grid["1:0"].guessed = FillHiddenBlock;

    const boardAsMatrix = BoardBuilder.mapToFillMatrix(board, false, false);
    const result = BoardSupport.revealHiddenColors(board);
    const resultAsMatrix = BoardBuilder.mapToFillMatrix(result, true, false);
    expect(
      FillSupport.matricesEquals(
        FillSupport.flipMatrixV(boardAsMatrix),
        resultAsMatrix
      )
    );
  });

  test("revealHiddenColors flip H and V", () => {
    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);
    board.grid["0:0"].guessed = FillHiddenBlock;
    board.grid["0:1"].guessed = FillHiddenBlock;
    board.grid["1:1"].guessed = FillHiddenBlock;

    const boardAsMatrix = BoardBuilder.mapToFillMatrix(board, false, false);
    const result = BoardSupport.revealHiddenColors(board);
    const resultAsMatrix = BoardBuilder.mapToFillMatrix(result, true, false);
    expect(
      FillSupport.matricesEquals(
        FillSupport.flipMatrixH(FillSupport.flipMatrixV(boardAsMatrix)),
        resultAsMatrix
      )
    );
  });

  test("revealHiddenColors maps to just guessed if no match", () => {
    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);
    board.grid["1:1"].guessed = FillHiddenBlock;

    const boardAsMatrix = BoardBuilder.mapToFillMatrix(board, true, false);
    const result = BoardSupport.revealHiddenColors(board);
    const resultAsMatrix = BoardBuilder.mapToFillMatrix(result, true, false);
    expect(FillSupport.matricesEquals(boardAsMatrix, resultAsMatrix));
  });
});
