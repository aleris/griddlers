import { FillColors, FillEmpty, FillMarkedEmpty } from "./Board";
import { FillSupport } from "./FillSupport";

describe("FillSupport", () => {
  test("matricesEquals true", () => {
    const test1 = [
      [FillColors.Black, FillColors.Red, FillEmpty],
      [FillEmpty, FillColors.Yellow, FillColors.Orange],
    ];
    const test2 = [
      [FillColors.Black, FillColors.Red, FillEmpty],
      [FillEmpty, FillColors.Yellow, FillColors.Orange],
    ];
    expect(FillSupport.matricesEquals(test1, test2)).toStrictEqual(true);
  });

  test("matricesEquals false", () => {
    const test1 = [
      [FillColors.Black, FillColors.Red, FillEmpty],
      [FillEmpty, FillColors.Yellow, FillColors.Orange],
    ];
    const test2 = [
      [FillColors.Black, FillColors.Red, FillEmpty],
      [FillEmpty, FillColors.Yellow, FillMarkedEmpty],
    ];
    expect(FillSupport.matricesEquals(test1, test2)).toStrictEqual(false);
  });

  test("flipMatrixH", () => {
    const test = [
      [FillColors.Black, FillColors.Red, FillEmpty, FillEmpty, FillEmpty],
      [FillColors.Red, FillColors.Black, FillColors.Red, FillEmpty, FillEmpty],
      [
        FillEmpty,
        FillColors.Red,
        FillColors.Red,
        FillColors.Red,
        FillColors.Red,
      ],
    ];
    const result = FillSupport.flipMatrixH(test);
    expect(result[0]).toStrictEqual([
      FillEmpty,
      FillEmpty,
      FillEmpty,
      FillColors.Red,
      FillColors.Black,
    ]);
    expect(result[1]).toStrictEqual([
      FillEmpty,
      FillEmpty,
      FillColors.Red,
      FillColors.Black,
      FillColors.Red,
    ]);
    expect(result[2]).toStrictEqual([
      FillColors.Red,
      FillColors.Red,
      FillColors.Red,
      FillColors.Red,
      FillEmpty,
    ]);
  });

  test("flipMatrixV", () => {
    const test = [
      [FillColors.Black, FillColors.Yellow, FillEmpty, FillEmpty, FillEmpty],
      [FillColors.Red, FillColors.Black, FillColors.Red, FillEmpty, FillEmpty],
      [
        FillEmpty,
        FillColors.Red,
        FillColors.Red,
        FillColors.Red,
        FillColors.Blue,
      ],
    ];
    const result = FillSupport.flipMatrixV(test);
    expect(result[0]).toStrictEqual([
      FillEmpty,
      FillColors.Red,
      FillColors.Red,
      FillColors.Red,
      FillColors.Blue,
    ]);
    expect(result[1]).toStrictEqual([
      FillColors.Red,
      FillColors.Black,
      FillColors.Red,
      FillEmpty,
      FillEmpty,
    ]);
    expect(result[2]).toStrictEqual([
      FillColors.Black,
      FillColors.Yellow,
      FillEmpty,
      FillEmpty,
      FillEmpty,
    ]);
  });
});
