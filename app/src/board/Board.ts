export type Empty = "";

export type Color = string;

export type Fill = Color | Empty | null;

export const FillEmpty = "";

export enum Reveal {
  Guessed,
  Fill,
  Incorrect,
}

export type Cell = {
  fill: Fill;
  guessed: Fill | null;
  reveal: Reveal;
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
  id: string;
  cluesV: ClueLine[];
  cluesH: ClueLine[];
  grid: Grid;
  palette: Palette;
  currentPaletteFill: Fill;
  completed: boolean;
};
