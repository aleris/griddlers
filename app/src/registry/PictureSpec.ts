import { Color } from "../board/Board";

export type PaletteSpec = { [key: string]: Color };

export type PictureSpec = {
  id: string;
  cellSpecs: string;
  palette: PaletteSpec;
};
