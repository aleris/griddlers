import { BoardSpec } from "../registry/BoardSpec";
import {PaletteSpec} from '../registry/PaletteSpec'
import { Board, Fill, FillEmpty, Grid } from "./Board";
import { BoardClues } from "./BoardClues";
import { BoardSupport } from "./BoardSupport";
import { FillSupport } from "./FillSupport";

export class BoardBuilder {
  static buildBoardFromPictureSpec(packId: string, boardSpec: BoardSpec): Board {
    const fillMatrix = this.buildFillMatrixFromPictureSpec(boardSpec);
    return this.buildBoardFromFillMatrix(
      packId,
      boardSpec,
      fillMatrix
    );
  }

  static buildGridFromPictureSpec(pictureSpec: BoardSpec): Grid {
    const fillMatrix = this.buildFillMatrixFromPictureSpec(pictureSpec);
    return this.buildGridFromFillMatrix(fillMatrix);
  }

  private static buildFillMatrixFromPictureSpec({
    cellSpecs,
    palette,
  }: BoardSpec): Fill[][] {
    const rows = cellSpecs.trim().split("\n");
    const grid: Fill[][] = [];
    for (let ri = 0; ri !== rows.length; ri++) {
      const rowSpec = rows[ri].split("");
      const row = rowSpec.map((colSpec) => {
        const fill = palette[colSpec];
        return fill !== undefined ? fill : FillEmpty;
      });
      grid.push(row);
    }
    return grid;
  }

  static buildBoardFromFillMatrix(
    packId: string,
    spec: BoardSpec,
    fillMatrix: Fill[][]
  ): Board {
    const grid: Grid = this.buildGridFromFillMatrix(fillMatrix);
    const cluesV = BoardClues.extractCluesV(fillMatrix);
    const cluesH = BoardClues.extractCluesH(fillMatrix);
    const palette = this.buildPaletteFromSpec(spec.palette);
    const currentPaletteFill = this.getFirstColorFill(palette);
    return {
      packId,
      spec,
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
        (fillMatrix[rowIndex][colIndex] = FillSupport.fillMarkedEmptyToEmpty(
          cell.guessed
        ))
    );
    return fillMatrix;
  }

  private static buildPaletteFromSpec(paletteSpec: PaletteSpec) {
    return (Object.values(paletteSpec) as Fill[]).map((fill) =>
      FillSupport.fillEmptyToMarkedEmpty(fill)
    );
  }

  private static getFirstColorFill(palette: (string | null)[]) {
    return (
      palette.filter((fill) => !FillSupport.isEmptyOrMarkedEmpty(fill))[0] ??
      palette[0] ??
      FillEmpty
    );
  }

  private static buildGridFromFillMatrix(fillGrid: Fill[][]): Grid {
    const grid: Grid = {};
    for (let ri = 0; ri !== fillGrid.length; ri++) {
      const row = fillGrid[ri];
      for (let ci = 0; ci !== row.length; ci++) {
        const fill = FillSupport.fillMarkedEmptyToEmpty(row[ci]);
        const coordinateKey = BoardSupport.gridCoordinate(ri, ci);
        grid[coordinateKey] = {
          fill,
          guessed: FillEmpty,
        };
      }
    }
    return grid;
  }
}
