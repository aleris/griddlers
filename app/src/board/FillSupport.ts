import { Color, Fill, FillEmpty, FillMarkedEmpty } from "./Board";

export class FillSupport {
  static fillEmptyToMarkedEmpty(fill: Fill) {
    return fill === FillEmpty ? FillMarkedEmpty : fill;
  }

  static fillMarkedEmptyToEmpty(fill: Fill) {
    return fill === FillMarkedEmpty ? FillEmpty : fill;
  }

  static isEmptyOrMarkedEmpty(fill: Fill) {
    return fill === FillEmpty || fill === FillMarkedEmpty;
  }

  static toColor(fill: Fill): Color {
    if (fill === undefined || this.isEmptyOrMarkedEmpty(fill)) {
      return "#fff";
    }
    return fill as Color;
  }
}
