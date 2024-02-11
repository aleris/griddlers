import "./EditorPage.scss";
import React, { useState } from "react";
import NextSvg from "../assets/next.svg";
import {
  Fill,
  FillBlockBlack,
  FillBlockBlue,
  FillBlockDarkBlue,
  FillBlockDarkGreen,
  FillBlockDarkMaroon,
  FillBlockDarkYellow,
  FillBlockGreen,
  FillBlockMaroon,
  FillBlockOrange,
  FillBlockRed,
  FillBlockViolet,
  FillBlockYellow,
  FillEmpty,
  GridPosition,
} from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import { FillSupport } from "../board/FillSupport";
import { GridView } from "../board/GridView";
import { PaletteView } from "../board/PaletteView";
import { IconButton } from "../IconButton";
import ClearAllIcon from "../assets/rubber.svg";
// import inspireImage from '../registry/inspire/t.png'
import { BoardSpec } from "../registry/BoardSpec";
import { PaletteSpec } from "../registry/PaletteSpec";
import { BoardBuilder } from "../board/BoardBuilder";

export const EditorPage = () => {
  const width = 25;
  const height = 25;

  const emptySpec: BoardSpec = {
    boardId: "board--edit",
    positionInPack: 1,
    cellSpecs: "",
    difficulty: 1,
    withHiddenColors: false,
  };

  const emptyFillMatrix = Array.from({ length: height }).map((_) =>
    Array.from({ length: width }).map((_) => FillEmpty)
  );

  const paletteSpec: PaletteSpec = {
    "⬛": FillBlockBlack,
    "🟥": FillBlockRed,
    "🟪": FillBlockViolet,
    "🟦": FillBlockBlue,
    "🟩": FillBlockGreen,
    "🟨": FillBlockYellow,
    "🟧": FillBlockOrange,
    "🟫": FillBlockMaroon,
    "🔵": FillBlockDarkBlue,
    "🟢": FillBlockDarkGreen,
    "🟡": FillBlockDarkYellow,
    "🟤": FillBlockDarkMaroon,
  };

  const emptyEditBoard = BoardBuilder.buildBoardFromFillMatrix(
    "pack--edit",
    emptySpec,
    paletteSpec,
    emptyFillMatrix
  );

  const palette = BoardBuilder.buildPaletteFromSpec(paletteSpec, false);

  const firstPaletteFill = BoardBuilder.getFirstColorFill(palette);

  function findPaletteKey(fill: Fill) {
    return (
      Array.from(Object.entries(paletteSpec)).find(
        ([k, v]) => v === fill
      )?.[0] ?? "⬜"
    );
  }

  const [board, setBoard] = useState(emptyEditBoard);
  const [selectedFill, setSelectedFill] = useState(firstPaletteFill);
  const [generated, setGenerated] = useState("");

  const cellSize = 24;

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
          icon={<img src={ClearAllIcon} alt="Clear All" />}
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
