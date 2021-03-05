import { PaletteSpec } from "./PaletteSpec";

export type BoardSpec = {
  positionInPack: number;
  boardId: string;
  cellSpecs: string;
  palette: PaletteSpec;
  difficulty: number;
  withHiddenColors: boolean;
};
