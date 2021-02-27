import { PaletteSpec, PictureSpec } from "../registry/PictureSpec";
import { Board, Fill, FillEmpty, Grid, Reveal } from "./Board";
import { BoardClues } from "./BoardClues";
import { BoardSupport } from "./BoardSupport";

export class BoardBuilder {
  static buildBoardFromPictureSpec(pictureSpec: PictureSpec): Board {
    const fillMatrix = this.buildFillMatrixFromPictureSpec(pictureSpec);
    return this.buildBoardFromFillMatrix(
      pictureSpec.id,
      fillMatrix,
      pictureSpec.palette
    );
  }

  static buildGridFromPictureSpec(pictureSpec: PictureSpec): Grid {
    const fillMatrix = this.buildFillMatrixFromPictureSpec(pictureSpec);
    return this.buildGridFromFillMatrix(fillMatrix);
  }

  private static buildFillMatrixFromPictureSpec({
    cellSpecs,
    palette,
  }: PictureSpec): Fill[][] {
    const rows = cellSpecs.trim().split("\n");
    const grid: Fill[][] = [];
    for (let ri = 0; ri !== rows.length; ri++) {
      const rowSpec = rows[ri].split("");
      const row = rowSpec.map((colSpec) => {
        const color = palette[colSpec];
        return color !== undefined ? color : FillEmpty;
      });
      grid.push(row);
    }
    return grid;
  }

  static buildBoardFromFillMatrix(
    id: string,
    fillMatrix: Fill[][],
    paletteSpec: PaletteSpec
  ): Board {
    const grid: Grid = this.buildGridFromFillMatrix(fillMatrix);
    const cluesV = BoardClues.extractCluesV(fillMatrix);
    const cluesH = BoardClues.extractCluesH(fillMatrix);
    const palette = Object.values(paletteSpec) as Fill[];
    const currentPaletteFill =
      palette.filter((fill) => fill !== FillEmpty)[0] ??
      palette[0] ??
      FillEmpty;
    return {
      id,
      cluesV,
      cluesH,
      grid,
      palette,
      currentPaletteFill,
      completed: false,
    };
  }

  static mapGuessedToFillMatrix(board: Board) {
    const fillMatrix = new Array<Array<Fill>>();
    Array.from({ length: BoardSupport.height(board) }).forEach(() =>
      fillMatrix.push(new Array<Fill>())
    );
    BoardSupport.mapEachCell(
      board,
      (cell, coordinateKey, rowIndex, colIndex) =>
        (fillMatrix[rowIndex][colIndex] = cell.guessed)
    );
    return fillMatrix;
  }

  private static buildGridFromFillMatrix(fillGrid: Fill[][]): Grid {
    const grid: Grid = {};
    for (let ri = 0; ri !== fillGrid.length; ri++) {
      const row = fillGrid[ri];
      for (let ci = 0; ci !== row.length; ci++) {
        const fill = row[ci];
        const coordinateKey = BoardSupport.gridCoordinate(ri, ci);
        grid[coordinateKey] = {
          fill,
          guessed: FillEmpty,
          reveal: Reveal.Guessed,
        };
      }
    }
    return grid;
  }
}
