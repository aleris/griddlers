import { BoardSpec } from "../registry/BoardSpec";
import {
  FillBlockBlack,
  FillBlockBlue,
  FillBlockGreen,
  FillBlockOrange,
  FillBlockRed,
  FillBlockYellow,
  FillEmpty,
} from "./Board";
import { BoardBuilder } from "./BoardBuilder";
import { describe, expect, test } from "vitest";

describe("BoardBuilder", () => {
  test("buildBoardFromSpec returns correct grid and clues with 1x1 mono", () => {
    const testSpec: BoardSpec = {
      positionInPack: 1,
      difficulty: 1,
      boardId: "test",
      cellSpecs: `
⬛⬜
⬛⬛
`,
      withHiddenColors: false,
    };
    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);

    expect(board.grid["0:0"].fill).toStrictEqual(FillBlockBlack);
    expect(board.grid["0:1"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["1:0"].fill).toStrictEqual(FillBlockBlack);
    expect(board.grid["1:1"].fill).toStrictEqual(FillBlockBlack);
    expect(board.cluesV.length).toStrictEqual(2);
    expect(board.cluesV[0]).toStrictEqual([{ count: 2, fill: FillBlockBlack }]);
    expect(board.cluesV[1]).toStrictEqual([{ count: 1, fill: FillBlockBlack }]);
    expect(board.cluesH.length).toStrictEqual(2);
    expect(board.cluesH[0]).toStrictEqual([{ count: 1, fill: FillBlockBlack }]);
    expect(board.cluesH[1]).toStrictEqual([{ count: 2, fill: FillBlockBlack }]);
  });

  test("buildBoardFromSpec returns correct grid and clues with 3x2 mono", () => {
    const testSpec: BoardSpec = {
      boardId: "test",
      positionInPack: 1,
      difficulty: 1,
      cellSpecs: `
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜⬜🟥🟥⬜⬜🟥🟥⬜⬜
⬜🟥⬜⬜🟥🟥⬜⬜🟥⬜
⬜🟥⬜⬜⬜⬜⬜⬜🟥⬜
⬜⬜🟥⬜⬜⬜⬜🟥⬜⬜
⬜⬜⬜🟥⬜⬜🟥⬜⬜⬜
⬜⬜⬜⬜🟥🟥⬜⬜⬜⬜
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
`,
      withHiddenColors: false,
    };
    const red = FillBlockRed;

    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);

    expect(board.grid["1:1"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["1:2"].fill).toStrictEqual(red);
    expect(board.grid["1:3"].fill).toStrictEqual(red);
    expect(board.grid["1:4"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["2:3"].fill).toStrictEqual(FillEmpty);
    expect(board.cluesV.length).toStrictEqual(10);
    expect(board.cluesV[0]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
    ]);
    expect(board.cluesV[1]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 2, fill: red },
    ]);
    expect(board.cluesV[2]).toStrictEqual([
      { count: 1, fill: red },
      { count: 1, fill: red },
    ]);
    expect(board.cluesH.length).toStrictEqual(8);
    expect(board.cluesH[0]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
    ]);
    expect(board.cluesH[1]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 2, fill: red },
      { count: 2, fill: red },
    ]);
    expect(board.cluesH[2]).toStrictEqual([
      { count: 1, fill: red },
      { count: 2, fill: red },
      { count: 1, fill: red },
    ]);
  });

  test("buildBoardFromSpec returns correct grid and color clues", () => {
    const testSpec: BoardSpec = {
      boardId: "test",
      positionInPack: 1,
      difficulty: 1,
      cellSpecs: `
⬜🟩🟩⬜
🟨⬜🟦⬜
⬜⬜⬜⬜
⬜⬜🟩🟦
`,
      withHiddenColors: false,
    };
    const green = FillBlockGreen;
    const yellow = FillBlockYellow;
    const blue = FillBlockBlue;

    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);

    expect(board.grid["0:0"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["0:1"].fill).toStrictEqual(green);
    expect(board.grid["0:2"].fill).toStrictEqual(green);
    expect(board.grid["0:3"].fill).toStrictEqual(FillEmpty);

    expect(board.grid["1:0"].fill).toStrictEqual(yellow);
    expect(board.grid["1:1"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["1:2"].fill).toStrictEqual(blue);
    expect(board.grid["1:3"].fill).toStrictEqual(FillEmpty);

    expect(board.grid["2:0"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["2:1"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["2:2"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["2:3"].fill).toStrictEqual(FillEmpty);

    expect(board.grid["3:0"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["3:1"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["3:2"].fill).toStrictEqual(green);
    expect(board.grid["3:3"].fill).toStrictEqual(blue);

    expect(board.cluesV.length).toStrictEqual(4);
    expect(board.cluesV[0]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
      { count: 1, fill: yellow },
    ]);
    expect(board.cluesV[1]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
      { count: 1, fill: green },
    ]);
    expect(board.cluesV[2]).toStrictEqual([
      { count: 1, fill: green },
      { count: 1, fill: blue },
      { count: 1, fill: green },
    ]);
    expect(board.cluesV[3]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
      { count: 1, fill: blue },
    ]);
    expect(board.cluesH.length).toStrictEqual(4);
    expect(board.cluesH[0]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 2, fill: green },
    ]);
    expect(board.cluesH[1]).toStrictEqual([
      { count: 1, fill: yellow },
      { count: 1, fill: blue },
    ]);
    expect(board.cluesH[2]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
    ]);
    expect(board.cluesH[3]).toStrictEqual([
      { count: 1, fill: green },
      { count: 1, fill: blue },
    ]);
  });

  test("buildBoardFromSpec resolves palette", () => {
    const cellSpecs = `
⬜🟩🟩⬜
🟨⬜🟦⬜
⬜⬜⬜⬜
⬜⬜🟩🟦
`;

    const paletteSpec = BoardBuilder.resolvePaletteSpecFromBoard(cellSpecs);

    expect(paletteSpec).toStrictEqual({
      "🟩": FillBlockGreen,
      "🟨": FillBlockYellow,
      "🟦": FillBlockBlue,
    });
  });

  test("buildBoardFromSpec returns correct with more complex grid and color clues", () => {
    const testSpec: BoardSpec = {
      boardId: "test",
      positionInPack: 1,
      difficulty: 1,
      cellSpecs: `
⬜🟦🟦🟦⬜⬜⬛🟧🟧🟧⬜⬜⬛🟩
⬛🟦⬜⬜🟦⬜⬛🟧⬜⬜🟧⬜⬛🟩
⬛🟦⬜⬜🟦⬜⬛🟧⬜⬜🟧⬜⬛🟩
⬛🟦🟦🟦🟦⬜⬛🟧⬜⬜🟧⬜⬛🟩
⬛🟦⬜⬜🟦⬜⬛🟧⬜⬜🟧⬜⬛🟩
⬛🟦⬜⬜🟦⬜⬛🟧🟧🟧⬜⬜⬛🟩
`,
      withHiddenColors: false,
    };

    const board = BoardBuilder.buildBoardFromSpec("pack", testSpec);

    expect(board.cluesV.length).toStrictEqual(14);
    expect(board.cluesV[1]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 6, fill: FillBlockBlue },
    ]);
    expect(board.cluesV[10]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 4, fill: FillBlockOrange },
    ]);
    expect(board.cluesV[13]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 6, fill: FillBlockGreen },
    ]);

    expect(board.cluesH.length).toStrictEqual(6);
    expect(board.cluesH[0]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
      { count: 0, fill: FillEmpty },
      { count: 3, fill: FillBlockBlue },
      { count: 1, fill: FillBlockBlack },
      { count: 3, fill: FillBlockOrange },
      { count: 1, fill: FillBlockBlack },
      { count: 1, fill: FillBlockGreen },
    ]);
    expect(board.cluesH[3]).toStrictEqual([
      { count: 0, fill: FillEmpty },
      { count: 1, fill: FillBlockBlack },
      { count: 4, fill: FillBlockBlue },
      { count: 1, fill: FillBlockBlack },
      { count: 1, fill: FillBlockOrange },
      { count: 1, fill: FillBlockOrange },
      { count: 1, fill: FillBlockBlack },
      { count: 1, fill: FillBlockGreen },
    ]);
  });
});
