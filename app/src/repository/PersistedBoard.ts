import { Fill } from "../board/Board";

export type PersistedBoard = {
  packId: string;
  id: string;
  grid: Fill[][];
};
