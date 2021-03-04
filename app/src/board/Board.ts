import {BoardSpec} from '../registry/BoardSpec'

type Empty = "";
type MarkedEmpty = "X";

export type Color = string;

export type Fill = Color | Empty | null;

export const FillEmpty: Empty = "";
export const FillMarkedEmpty: MarkedEmpty = "X";

export type Cell = {
  fill: Fill;
  guessed: Fill | null;
};

export type CoordinateKey = `${number}:${number}`;

export type Grid = {
  [key: string]: Cell;
};

export type Clue = {
  count: number;
  fill: Fill;
};

export type ClueLine = Clue[];

export type Palette = Fill[];

export type Board = {
  packId: string,
  spec: BoardSpec,
  cluesV: ClueLine[];
  cluesH: ClueLine[];
  grid: Grid;
  palette: Palette;
  currentPaletteFill: Fill;
  completed: boolean;
};
