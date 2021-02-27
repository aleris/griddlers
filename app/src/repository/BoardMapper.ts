import { Board } from "../board/Board";
import { BoardBuilder } from "../board/BoardBuilder";
import { BoardRegistry } from "../registry/BoardRegistry";
import { PersistedBoard } from "./PersistedBoard";

export class BoardMapper {
  static toPersistedGuessed(board: Board): PersistedBoard {
    const guessedFillMatrix = BoardBuilder.mapGuessedToFillMatrix(board);
    return {
      id: board.id,
      grid: guessedFillMatrix,
    };
  }

  static fromPersisted(board: PersistedBoard): Board {
    const spec = BoardRegistry.pictureSpecsMapById.get(board.id);
    if (spec === undefined) {
      throw new Error(`${board.id} picture spec not found`);
    }
    return BoardBuilder.buildBoardFromFillMatrix(
      board.id,
      board.grid,
      spec.palette
    );
  }
}
