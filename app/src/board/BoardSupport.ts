import { Board, Cell, CoordinateKey, Fill, Grid, GridPosition } from "./Board";
import { BoardBuilder } from "./BoardBuilder";
import { BoardClues } from "./BoardClues";
import { FillSupport } from "./FillSupport";

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
    const guessedFillMatrix = BoardBuilder.mapToFillMatrix(board, true);
    const cluesV = BoardClues.extractCluesV(
      guessedFillMatrix,
      board.spec.withHiddenColors
    );
    if (!BoardClues.equals(cluesV, board.cluesV)) {
      return false;
    }
    const cluesH = BoardClues.extractCluesH(
      guessedFillMatrix,
      board.spec.withHiddenColors
    );
    if (!BoardClues.equals(cluesH, board.cluesH)) {
      return false;
    }
    return true;
  }

  static countMedals(boards: Board[]): number {
    return boards
      .map((board) => board.spec.difficulty)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  static replaceGridZone(
    grid: Grid,
    from: GridPosition,
    to: GridPosition,
    fill?: Fill,
    guessed?: Fill
  ) {
    const newGrid = { ...grid };
    Array.from({ length: to.rowIndex - from.rowIndex + 1 }).forEach(
      (_, rowIndex) =>
        Array.from({ length: to.colIndex - from.colIndex + 1 }).forEach(
          (_, colIndex) => {
            const key = BoardSupport.gridCoordinate(
              from.rowIndex + rowIndex,
              from.colIndex + colIndex
            );
            if (fill !== undefined) {
              newGrid[key].fill = fill;
            }
            if (guessed !== undefined) {
              newGrid[key].guessed = guessed;
            }
          }
        )
    );
    return newGrid;
  }

  static revealHiddenColors(board: Board): Board {
    const fillMatrix = BoardBuilder.mapToFillMatrix(board, false);
    const guessMatrix = BoardBuilder.mapToFillMatrix(board, true);

    if (FillSupport.matricesEquals(fillMatrix, guessMatrix, true)) {
      return this.mapGuessedFromFillMatrix(board, fillMatrix);
    }

    const fillMatrixFlippedH = FillSupport.flipMatrixH(fillMatrix);
    if (FillSupport.matricesEquals(fillMatrixFlippedH, guessMatrix, true)) {
      return this.mapGuessedFromFillMatrix(board, fillMatrixFlippedH);
    }

    const fillMatrixFlippedV = FillSupport.flipMatrixV(fillMatrix);
    if (FillSupport.matricesEquals(fillMatrixFlippedV, guessMatrix, true)) {
      return this.mapGuessedFromFillMatrix(board, fillMatrixFlippedV);
    }

    const fillMatrixFlippedVH = FillSupport.flipMatrixV(fillMatrixFlippedH);
    if (FillSupport.matricesEquals(fillMatrixFlippedVH, guessMatrix, true)) {
      return this.mapGuessedFromFillMatrix(board, fillMatrixFlippedVH);
    }

    return board;
  }

  private static mapGuessedFromFillMatrix(
    board: Board,
    fillMatrix: Fill[][]
  ): Board {
    const newGrid = { ...board.grid };
    this.mapEachCell(board, (cell, coordinateKey, rowIndex, colIndex) => {
      newGrid[coordinateKey].guessed = fillMatrix[rowIndex][colIndex];
    });
    return { ...board, grid: newGrid };
  }
}
