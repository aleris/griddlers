import { Fill } from "../board/Board";

export type PersistedBoard = {
  id: string;
  grid: Fill[][];
};
