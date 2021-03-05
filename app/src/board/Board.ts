import { BoardSpec } from "../registry/BoardSpec";

type Empty = "";
type MarkedEmpty = "X";
type HiddenBlock = "?";

export type Color = string;

export type Fill = Color | Empty | HiddenBlock | null;

export const FillEmpty: Empty = "";
export const FillMarkedEmpty: MarkedEmpty = "X";
export const FillHiddenBlock: HiddenBlock = "?";
export enum FillColors {
  White = "#fff",
  Black = "#444",
  Red = "#ef5350",
  Violet = "#ab47bc",
  Blue = "#42a5f5",
  Green = "#66bb6a",
  Yellow = "#ffeb3b",
  Orange = "#ffa726",
}

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
