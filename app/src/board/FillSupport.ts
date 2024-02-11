import {
  Color,
  Fill,
  FillEmpty,
  FillHiddenBlock,
  FillMarkedEmpty,
  FillBlockBlack,
  ColorKeyEmpty,
  ColorKeyBlack,
  ColorKeyRed,
  FillBlockRed,
  ColorKeyViolet,
  FillBlockViolet,
  ColorKeyBlue,
  FillBlockBlue,
  ColorKeyGreen,
  FillBlockGreen,
  ColorKeyYellow,
  FillBlockYellow,
  ColorKeyOrange,
  FillBlockOrange,
  ColorKeyBrown,
  FillBlockMaroon,
  ColorKeyDarkBlue,
  FillBlockDarkBlue,
  ColorKeyDarkGreen,
  FillBlockDarkGreen,
  ColorKeyDarkYellow,
  FillBlockDarkYellow,
  ColorKeyDarkMaroon,
  FillBlockDarkMaroon,
  ColorKey,
  FillBlockWhite,
} from "./Board";

export class FillSupport {
  static fillEmptyToMarkedEmpty(fill: Fill) {
    return fill === FillEmpty ? FillMarkedEmpty : fill;
  }

  static fillMarkedEmptyToEmpty(fill: Fill) {
    return fill === FillMarkedEmpty ? FillEmpty : fill;
  }

  static isEmptyOrMarkedEmpty(fill: Fill) {
    return fill === null || fill === FillEmpty || fill === FillMarkedEmpty;
  }

  static mapColorKeyToColor(colorKey: ColorKey): Color {
    switch (colorKey) {
      case ColorKeyEmpty:
        return FillEmpty;
      case ColorKeyBlack:
        return FillBlockBlack;
      case ColorKeyRed:
        return FillBlockRed;
      case ColorKeyViolet:
        return FillBlockViolet;
      case ColorKeyBlue:
        return FillBlockBlue;
      case ColorKeyGreen:
        return FillBlockGreen;
      case ColorKeyYellow:
        return FillBlockYellow;
      case ColorKeyOrange:
        return FillBlockOrange;
      case ColorKeyBrown:
        return FillBlockMaroon;
      case ColorKeyDarkBlue:
        return FillBlockDarkBlue;
      case ColorKeyDarkGreen:
        return FillBlockDarkGreen;
      case ColorKeyDarkYellow:
        return FillBlockDarkYellow;
      case ColorKeyDarkMaroon:
        return FillBlockDarkMaroon;
      default:
        return FillEmpty;
    }
  }

  static toColor(
    fill: Fill,
    hide = false,
    emptyColor: Color = FillBlockWhite,
    hiddenBlockColor: Color = FillBlockBlack
  ): Color {
    if (hide || this.isEmptyOrMarkedEmpty(fill)) {
      return emptyColor;
    }
    if (fill === FillHiddenBlock) {
      return hiddenBlockColor;
    }
    return fill as Color;
  }

  static hideColor(fill: Fill) {
    if (this.isEmptyOrMarkedEmpty(fill)) {
      return fill;
    }
    return FillHiddenBlock;
  }

  static equals(fill1: Fill, fill2: Fill, withHiddenColors: boolean): boolean {
    const fill1Hidden = this.fillMarkedEmptyToEmpty(
      withHiddenColors ? this.hideColor(fill1) : fill1
    );
    const fill2Hidden = this.fillMarkedEmptyToEmpty(
      withHiddenColors ? this.hideColor(fill2) : fill2
    );
    return fill1Hidden === fill2Hidden;
  }

  static matricesEquals(
    fillMatrix1: Fill[][],
    fillMatrix2: Fill[][],
    withHiddenColors = false
  ) {
    if (fillMatrix1.length !== fillMatrix2.length) {
      return false;
    }
    if (fillMatrix1[0]?.length !== fillMatrix2[0]?.length) {
      return false;
    }
    for (let rowIndex = 0; rowIndex !== fillMatrix1.length; rowIndex++) {
      const row1 = fillMatrix1[rowIndex];
      const row2 = fillMatrix2[rowIndex];
      for (let colIndex = 0; colIndex !== fillMatrix1[0].length; colIndex++) {
        if (!this.equals(row1[colIndex], row2[colIndex], true)) {
          return false;
        }
      }
    }
    return true;
  }

  static flipMatrixH(matrix: Fill[][]): Fill[][] {
    const result = new Array<Fill[]>();
    for (let rowIndex = 0; rowIndex !== matrix.length; rowIndex++) {
      result.push([...matrix[rowIndex].reverse()]);
    }
    return result;
  }

  static flipMatrixV(matrix: Fill[][]): Fill[][] {
    const result = new Array<Fill[]>();
    const colLength = matrix.length;
    for (let rowIndex = 0; rowIndex !== matrix.length; rowIndex++) {
      result.push([...matrix[colLength - rowIndex - 1]]);
    }
    return result;
  }
}
