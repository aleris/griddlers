import { Board, Cell, CoordinateKey } from "./Board";
import { BoardBuilder } from "./BoardBuilder";
import { BoardClues } from "./BoardClues";

export class BoardSupport {
  static gridCoordinate(rowIndex: number, colIndex: number): CoordinateKey {
    return `${rowIndex}:${colIndex}` as CoordinateKey;
  }

  static width(board: Board): number {
    return board.cluesV.length;
  }

  static height(board: Board): number {
    return board.cluesH.length;
  }

  static cluesVSize(board: Board): number {
    return board.cluesV[0].length;
  }

  static cluesHSize(board: Board): number {
    return board.cluesH[0].length;
  }

  static difficultyShown(board: Board): number {
    return Math.ceil(this.difficulty(board) / 24);
  }

  static difficulty(board: Board): number {
    return (
      (this.cluesVSize(board) + this.cluesHSize(board)) * 4 +
      this.height(board) +
      this.width(board)
    );
  }

  static mapEachCell<T>(
    board: Board,
    callbackFn: (
      cell: Cell,
      coordinateKey: CoordinateKey,
      rowIndex: number,
      colIndex: number
    ) => T
  ) {
    const gridWidth = this.width(board);
    const gridHeight = this.height(board);
    const rowIndexes = Array.from({ length: gridHeight }).map(
      (_, index) => index
    );
    const colIndexes = Array.from({ length: gridWidth }).map(
      (_, index) => index
    );
    return rowIndexes.map((rowIndex) =>
      colIndexes.map((colIndex) => {
        const coordinateKey = this.gridCoordinate(rowIndex, colIndex);
        const cell = board.grid[coordinateKey];
        return callbackFn(cell, coordinateKey, rowIndex, colIndex);
      })
    );
  }

  static isCompleted(board: Board) {
    const guessedFillMatrix = BoardBuilder.mapGuessedToFillMatrix(board);
    const cluesV = BoardClues.extractCluesV(guessedFillMatrix);
    if (!BoardClues.equals(cluesV, board.cluesV)) {
      return false;
    }
    const cluesH = BoardClues.extractCluesH(guessedFillMatrix);
    if (!BoardClues.equals(cluesH, board.cluesH)) {
      return false;
    }
    return true;
  }

  static countMedals(completedBoards: Board[]): number {
    return completedBoards
      .map((board) => this.difficultyShown(board))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }
}
