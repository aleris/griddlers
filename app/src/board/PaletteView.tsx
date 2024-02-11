import React, { useEffect } from "react";
import "./PaletteView.scss";
import { Fill, FillEmpty, Palette } from "./Board";
import { PaletteCellView } from "./PaletteCellView";

export type Props = {
  palette: Palette;
  currentFill: Fill;
  cellSize: number;
  onFillChange: (fill: Fill) => void;
  interactive?: boolean;
};

export const PaletteView = ({
  palette,
  currentFill,
  cellSize,
  onFillChange,
  interactive = true,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // console.log('PaletteView handleKeyDown', e.key);
      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          const index = parseInt(e.key) - 1;
          if (index < palette.length) {
            onFillChange(palette[index]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div
      className="Palette"
      style={{
        gridTemplateColumns: `repeat(${palette.length + 1}, ${cellSize}px)`,
        gridTemplateRows: `${cellSize}px`,
      }}
    >
      {palette.map((fill, index) => {
        const keyboardShortcut = index < 10 ? `${(index + 1) % 10}` : null;
        return (
          <PaletteCellView
            key={index}
            fill={fill}
            checked={fill === currentFill}
            onClick={() => onFillChange(fill)}
            interactive={interactive}
            keyboardShortcut={keyboardShortcut}
          />
        );
      })}
    </div>
  );
};
