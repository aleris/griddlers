import { BoardSpec } from "./BoardSpec";

export type Pack = {
  position: number;
  id: string;
  boardSpecs: BoardSpec[];
  coverBoardIndex: number;
};

export const PACK_LEVEL_COUNT = 15;
