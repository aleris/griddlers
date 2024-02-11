import {
  FillBlockBlack,
  FillBlockBlue,
  FillBlockOrange,
  FillBlockRed,
  FillBlockYellow,
  FillEmpty,
  FillMarkedEmpty,
} from "./Board";
import { FillSupport } from "./FillSupport";
import { describe, expect, test } from "vitest";

describe("FillSupport", () => {
  test("matricesEquals true", () => {
    const test1 = [
      [FillBlockBlack, FillBlockRed, FillEmpty],
      [FillEmpty, FillBlockYellow, FillBlockOrange],
    ];
    const test2 = [
      [FillBlockBlack, FillBlockRed, FillEmpty],
      [FillEmpty, FillBlockYellow, FillBlockOrange],
    ];
    expect(FillSupport.matricesEquals(test1, test2)).toStrictEqual(true);
  });

  test("matricesEquals false", () => {
    const test1 = [
      [FillBlockBlack, FillBlockRed, FillEmpty],
      [FillEmpty, FillBlockYellow, FillBlockOrange],
    ];
    const test2 = [
      [FillBlockBlack, FillBlockRed, FillEmpty],
      [FillEmpty, FillBlockYellow, FillMarkedEmpty],
    ];
    expect(FillSupport.matricesEquals(test1, test2)).toStrictEqual(false);
  });

  test("flipMatrixH", () => {
    const test = [
      [FillBlockBlack, FillBlockRed, FillEmpty, FillEmpty, FillEmpty],
      [FillBlockRed, FillBlockBlack, FillBlockRed, FillEmpty, FillEmpty],
      [FillEmpty, FillBlockRed, FillBlockRed, FillBlockRed, FillBlockRed],
    ];
    const result = FillSupport.flipMatrixH(test);
    expect(result[0]).toStrictEqual([
      FillEmpty,
      FillEmpty,
      FillEmpty,
      FillBlockRed,
      FillBlockBlack,
    ]);
    expect(result[1]).toStrictEqual([
      FillEmpty,
      FillEmpty,
      FillBlockRed,
      FillBlockBlack,
      FillBlockRed,
    ]);
    expect(result[2]).toStrictEqual([
      FillBlockRed,
      FillBlockRed,
      FillBlockRed,
      FillBlockRed,
      FillEmpty,
    ]);
  });

  test("flipMatrixV", () => {
    const test = [
      [FillBlockBlack, FillBlockYellow, FillEmpty, FillEmpty, FillEmpty],
      [FillBlockRed, FillBlockBlack, FillBlockRed, FillEmpty, FillEmpty],
      [FillEmpty, FillBlockRed, FillBlockRed, FillBlockRed, FillBlockBlue],
    ];
    const result = FillSupport.flipMatrixV(test);
    expect(result[0]).toStrictEqual([
      FillEmpty,
      FillBlockRed,
      FillBlockRed,
      FillBlockRed,
      FillBlockBlue,
    ]);
    expect(result[1]).toStrictEqual([
      FillBlockRed,
      FillBlockBlack,
      FillBlockRed,
      FillEmpty,
      FillEmpty,
    ]);
    expect(result[2]).toStrictEqual([
      FillBlockBlack,
      FillBlockYellow,
      FillEmpty,
      FillEmpty,
      FillEmpty,
    ]);
  });
});
