import "./EditorPage.scss";
import React, { useState } from "react";
import NextSvg from "../assets/next.svg";
import { Fill, FillColors, FillEmpty, GridPosition } from "../board/Board";
import { BoardBuilder } from "../board/BoardBuilder";
import { BoardSupport } from "../board/BoardSupport";
import { FillSupport } from "../board/FillSupport";
import { GridView } from "../board/GridView";
import { PaletteView } from "../board/PaletteView";
import { IconButton } from "../IconButton";
import EmptyBlockSvg from "../assets/empty-block.svg";
import { BoardSpec } from "../registry/BoardSpec";
// import inspireImage from "../registry/inspire/f.png";

const width = 18;
const height = 18;

const emptySpec: BoardSpec = {
  boardId: "board--edit",
  positionInPack: 1,
  cellSpecs: "",
  palette: {
    ".": FillEmpty,
    "#": FillColors.Black,
    R: FillColors.Red,
    Y: FillColors.Yellow,
    G: FillColors.Green,
    B: FillColors.Blue,
    V: FillColors.Violet,
    O: FillColors.Orange,
  },
  difficulty: 1,
  withHiddenColors: false,
};

const emptyFillMatrix = Array.from({ length: height }).map((_) =>
  Array.from({ length: width }).map((_) => FillEmpty)
);

const emptyEditBoard = BoardBuilder.buildBoardFromFillMatrix(
  "pack--edit",
  emptySpec,
  emptyFillMatrix
);

const palette = BoardBuilder.buildPaletteFromSpec(emptySpec.palette, false);

const firstPaletteFill = BoardBuilder.getFirstColorFill(palette);

function findPaletteKey(fill: Fill) {
  return (
    Array.from(Object.entries(emptySpec.palette)).find(
      ([k, v]) => v === fill
    )?.[0] ?? "."
  );
}

export const EditorPage = () => {
  const [board, setBoard] = useState(emptyEditBoard);
  const [selectedFill, setSelectedFill] = useState(firstPaletteFill);
  const [generated, setGenerated] = useState("");

  const cellSize = 32;

  const handleOnCellClick = (position: GridPosition) => {
    setBoard({
      ...board,
      grid: BoardSupport.replaceGridZone(
        board.grid,
        position,
        position,
        selectedFill,
        selectedFill
      ),
    });
  };

  const handleCellZoneSelect = (from: GridPosition, to: GridPosition) => {
    setBoard({
      ...board,
      grid: BoardSupport.replaceGridZone(
        board.grid,
        from,
        to,
        selectedFill,
        selectedFill
      ),
    });
  };

  const handleOnFillChange = (fill: Fill) => {
    setSelectedFill(fill);
  };

  const handleGenerateOnClick = () => {
    const generated = Array.from({ length: height })
      .map((_, rowIndex) =>
        Array.from({ length: width })
          .map((_, colIndex) =>
            findPaletteKey(
              board.grid[BoardSupport.gridCoordinate(rowIndex, colIndex)]
                .guessed
            )
          )
          .reduce((p, c) => `${p}${c}`, "")
      )
      .reduce((p, c) => `${p}\n${c}`, "");
    setGenerated(generated);
  };

  const handleClearOnClick = () => {
    setBoard(emptyEditBoard);
    setGenerated("");
  };

  return (
    <div className="EditorPage">
      <div className="EditorPage--Grid">
        <div>
          {/*<img src={inspireImage} width="500px" alt="Inspiration" />*/}
        </div>
        <GridView
          board={board}
          cellSize={cellSize}
          onCellClick={handleOnCellClick}
          selectionBackgroundColor={FillSupport.toColor(selectedFill)}
          onCellZoneSelect={handleCellZoneSelect}
        />
      </div>
      <div
        className="EditorPage--Palette"
        style={{ marginTop: `${cellSize / 2}px` }}
      >
        <PaletteView
          cellSize={cellSize}
          palette={palette}
          currentFill={selectedFill}
          onFillChange={handleOnFillChange}
        />
      </div>
      <div
        className="EditorPage--Buttons"
        style={{ marginTop: `${cellSize / 2}px` }}
      >
        <IconButton
          icon={<img src={EmptyBlockSvg} alt="Clear All" />}
          size={"Small"}
          onClick={handleClearOnClick}
        />
        <IconButton
          icon={<img src={NextSvg} alt="Generate" />}
          size={"Small"}
          onClick={handleGenerateOnClick}
        />
      </div>
      <div className="EditorPage--Generated">
        <pre>{generated}</pre>
      </div>
    </div>
  );
};
