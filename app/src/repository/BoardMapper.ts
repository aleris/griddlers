import { Board } from "../board/Board";
import { BoardBuilder } from "../board/BoardBuilder";
import { BoardRegistry } from "../registry/BoardRegistry";
import { PersistedBoard } from "./PersistedBoard";

export class BoardMapper {
  static toPersistedGuessed(board: Board): PersistedBoard {
    const guessedFillMatrix = BoardBuilder.mapToFillMatrix(board, true);
    return {
      packId: board.packId,
      id: board.spec.boardId,
      grid: guessedFillMatrix,
    };
  }

  static fromPersisted(board: PersistedBoard): Board {
    const spec = BoardRegistry.getSpecById(board.packId, board.id);
    const paletteSpec = BoardBuilder.resolvePaletteSpecFromBoard(
      spec.cellSpecs
    );
    return BoardBuilder.buildBoardFromFillMatrix(
      board.packId,
      spec,
      paletteSpec,
      board.grid
    );
  }
}
