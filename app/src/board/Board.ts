import { BoardSpec } from "../registry/BoardSpec";

type Empty = "";
type MarkedEmpty = "X";
type HiddenBlock = "?";

export type Color = string;

export type Fill = Color | Empty | HiddenBlock | null;

export const ColorKeyEmpty = "⬜";
export const ColorKeyBlack = "⬛";
export const ColorKeyRed = "🟥";
export const ColorKeyViolet = "🟪";
export const ColorKeyBlue = "🟦";
export const ColorKeyGreen = "🟩";
export const ColorKeyYellow = "🟨";
export const ColorKeyOrange = "🟧";
export const ColorKeyBrown = "🟫";
export const ColorKeyDarkBlue = "🔵";
export const ColorKeyDarkGreen = "🟢";
export const ColorKeyDarkYellow = "🟡";
export const ColorKeyDarkMaroon = "🟤";

export type ColorKey =
  | typeof ColorKeyEmpty
  | typeof ColorKeyBlack
  | typeof ColorKeyRed
  | typeof ColorKeyViolet
  | typeof ColorKeyBlue
  | typeof ColorKeyGreen
  | typeof ColorKeyYellow
  | typeof ColorKeyOrange
  | typeof ColorKeyBrown
  | typeof ColorKeyDarkBlue
  | typeof ColorKeyDarkGreen
  | typeof ColorKeyDarkYellow
  | typeof ColorKeyDarkMaroon;

export const FillEmpty: Empty = "";
export const FillMarkedEmpty: MarkedEmpty = "X";
export const FillHiddenBlock: HiddenBlock = "?";

export const FillBlockWhite = "#ffffff";
export const FillBlockBlack = "#333333";
export const FillBlockRed = "#ef5350";
export const FillBlockViolet = "#ab47bc";
export const FillBlockBlue = "#42a5f5";
export const FillBlockGreen = "#66bb6a";
export const FillBlockYellow = "#ffeb3b";
export const FillBlockOrange = "#ffa726";
export const FillBlockMaroon = "#A52A2A";
export const FillBlockDarkBlue = "#00008b";
export const FillBlockDarkGreen = "#006400";
export const FillBlockDarkYellow = "#d5b122";
export const FillBlockDarkMaroon = "#5d0101";

export type Cell = {
  fill: Fill;
  guessed: Fill | null;
};

export type CoordinateKey = `${number}:${number}`;

export type Grid = {
  [key: string]: Cell;
};

export type GridPosition = {
  rowIndex: number;
  colIndex: number;
};

export type Clue = {
  count: number;
  fill: Fill;
};

export type ClueLine = Clue[];

export type Palette = Fill[];

export type Board = {
  packId: string;
  spec: BoardSpec;
  cluesV: ClueLine[];
  cluesH: ClueLine[];
  grid: Grid;
  palette: Palette;
  currentPaletteFill: Fill;
  completed: boolean;
};
