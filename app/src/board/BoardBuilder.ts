import { BoardSpec } from "../registry/BoardSpec";
import { PaletteSpec } from "../registry/PaletteSpec";
import { Board, Fill, FillEmpty, FillHiddenBlock, Grid } from "./Board";
import { BoardClues } from "./BoardClues";
import { BoardSupport } from "./BoardSupport";
import { FillSupport } from "./FillSupport";

export class BoardBuilder {
  static buildBoardFromSpec(packId: string, boardSpec: BoardSpec): Board {
    const fillMatrix = this.buildFillMatrixFromSpec(boardSpec);
    return this.buildBoardFromFillMatrix(packId, boardSpec, fillMatrix);
  }

  static buildGridFromPictureSpec(boardSpec: BoardSpec): Grid {
    const fillMatrix = this.buildFillMatrixFromSpec(boardSpec);
    return this.buildGridFromFillMatrix(fillMatrix);
  }

  private static buildFillMatrixFromSpec({
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
    boardSpec: BoardSpec,
    fillMatrix: Fill[][]
  ): Board {
    const grid: Grid = this.buildGridFromFillMatrix(fillMatrix);
    const cluesV = BoardClues.extractCluesV(
      fillMatrix,
      boardSpec.withHiddenColors
    );
    const cluesH = BoardClues.extractCluesH(
      fillMatrix,
      boardSpec.withHiddenColors
    );
    const palette = this.buildPaletteFromSpec(
      boardSpec.palette,
      boardSpec.withHiddenColors
    );
    const currentPaletteFill = this.getFirstColorFill(palette);
    return {
      packId,
      spec: boardSpec,
      cluesV,
      cluesH,
      grid,
      palette,
      currentPaletteFill,
      completed: false,
    };
  }

  static mapToFillMatrix(
    board: Board,
    fromGuessed: boolean,
    hideColors = false
  ) {
    const fillMatrix = new Array<Array<Fill>>();
    Array.from({ length: BoardSupport.height(board) }).forEach(() =>
      fillMatrix.push(new Array<Fill>())
    );
    BoardSupport.mapEachCell(
      board,
      (cell, coordinateKey, rowIndex, colIndex) => {
        const fill = fromGuessed ? cell.guessed : cell.fill;
        const hiddenFill = hideColors ? FillSupport.hideColor(fill) : fill;
        return (fillMatrix[rowIndex][
          colIndex
        ] = FillSupport.fillMarkedEmptyToEmpty(hiddenFill));
      }
    );
    return fillMatrix;
  }

  static buildPaletteFromSpec(
    paletteSpec: PaletteSpec,
    withHiddenColors: boolean
  ) {
    const palette = (Object.values(paletteSpec) as Fill[]).map((fill) =>
      FillSupport.fillEmptyToMarkedEmpty(fill)
    );
    if (withHiddenColors) {
      return [palette[0], FillHiddenBlock];
    }
    return palette;
  }

  static getFirstColorFill(palette: (string | null)[]): Fill {
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
