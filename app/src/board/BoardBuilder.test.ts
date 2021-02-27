import { PictureSpec } from "../registry/BoardRegistry";
import { FillEmpty } from "./Board";
import { BoardBuilder } from "./BoardBuilder";

describe("BoardBuilder", () => {
  test("fromPictureSpec returns correct grid and clues with 1x1 mono", () => {
    const testSpec: PictureSpec = {
      id: "test",
      cellSpecs: `
#.
##
`,
      palette: {
        ".": FillEmpty,
        "#": "black",
      },
    };
    const black = testSpec.palette["#"];

    const board = BoardBuilder.buildBoardFromPictureSpec(testSpec);

    expect(board.grid["0:0"].fill).toStrictEqual(black);
    expect(board.grid["0:1"].fill).toStrictEqual(FillEmpty);
    expect(board.grid["1:0"].fill).toStrictEqual(black);
    expect(board.grid["1:1"].fill).toStrictEqual(black);
    expect(board.cluesV.length).toStrictEqual(2);
    expect(board.cluesV[0]).toStrictEqual([{ count: 2, fill: black }]);
    expect(board.cluesV[1]).toStrictEqual([{ count: 1, fill: black }]);
    expect(board.cluesH.length).toStrictEqual(2);
    expect(board.cluesH[0]).toStrictEqual([{ count: 1, fill: black }]);
    expect(board.cluesH[1]).toStrictEqual([{ count: 2, fill: black }]);
  });

  test("fromPictureSpec returns correct grid and clues with 3x2 mono", () => {
    const testSpec: PictureSpec = {
      id: "test",
      cellSpecs: `
..........
..##..##..
.#..##..#.
.#......#.
..#....#..
...#..#...
....##....
..........
`,
      palette: {
        ".": FillEmpty,
        "#": "red",
      },
    };
    const red = testSpec.palette["#"];

    const board = BoardBuilder.buildBoardFromPictureSpec(testSpec);

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

  test("fromPictureSpec returns correct grid and color clues", () => {
    const testSpec: PictureSpec = {
      id: "test",
      cellSpecs: `
.GG.
Y.B.
....
..GB
`,
      palette: {
        ".": FillEmpty,
        G: "green",
        Y: "yellow",
        B: "blue",
      },
    };
    const green = testSpec.palette["G"];
    const yellow = testSpec.palette["Y"];
    const blue = testSpec.palette["B"];

    const board = BoardBuilder.buildBoardFromPictureSpec(testSpec);

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
});
