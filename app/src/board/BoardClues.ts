import { Clue, ClueLine, Fill, FillEmpty } from "./Board";
import { FillSupport } from "./FillSupport";

export class BoardClues {
  public static extractCluesH(
    fillGrid: Fill[][],
    withHiddenColors: boolean
  ): ClueLine[] {
    return this.padLineClues(
      fillGrid.map((row) => this.extractLineClues(row, withHiddenColors))
    );
  }

  public static extractCluesV(
    fillGrid: Fill[][],
    withHiddenColors: boolean
  ): ClueLine[] {
    const lineClues = fillGrid[0].map((_, colIndex) => {
      const col = fillGrid.map((_, rowIndex) => fillGrid[rowIndex][colIndex]);
      return this.extractLineClues(col, withHiddenColors);
    });
    return this.padLineClues(lineClues);
  }

  private static extractLineClues(
    line: Fill[],
    withHiddenColors: boolean
  ): ClueLine {
    const clueLine: ClueLine = [];
    let fill: Fill = null;
    let count = 0;

    function addClueIfNotEmpty() {
      if (count !== 0 && fill !== FillEmpty) {
        const clue: Clue = {
          count,
          fill,
        };
        clueLine.push(clue);
      }
    }

    for (let i = 0; i !== line.length; i++) {
      const lineFill = line[i];
      const hiddenFill = withHiddenColors
        ? FillSupport.hideColor(lineFill)
        : lineFill;
      if (fill !== hiddenFill) {
        addClueIfNotEmpty();
        count = 0;
      }
      fill = hiddenFill;
      count++;
    }
    addClueIfNotEmpty();
    return clueLine;
  }

  private static padLineClues(clueLines: ClueLine[]): ClueLine[] {
    const maxLength = Math.max(...clueLines.map((line) => line.length));
    for (const line of clueLines) {
      this.padLineClue(line, maxLength);
    }
    return clueLines;
  }

  private static padLineClue(line: Clue[], maxLength: number) {
    if (line.length < maxLength) {
      const pad = Array.from({ length: maxLength - line.length }).fill({
        count: 0,
        fill: FillEmpty,
      }) as ClueLine;
      line.unshift(...pad);
    }
  }

  static equals(a: ClueLine[], b: ClueLine[]): boolean {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((al, ai) => this.clueLineEquals(al, b[ai]));
  }

  static clueLineEquals(a: ClueLine, b: ClueLine): boolean {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((ac, ai) => {
      const bc = b[ai];
      if (ac.count !== bc.count) {
        return false;
      }
      if (ac.fill !== bc.fill) {
        return false;
      }
      return true;
    });
  }
}
