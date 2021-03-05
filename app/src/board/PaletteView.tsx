import "./PaletteView.scss";
import { Fill, Palette } from "./Board";
import { PaletteCellView } from "./PaletteCellView";

export type Props = {
  palette: Palette;
  currentFill: Fill;
  cellSize: number;
  onFillChange: (fill: Fill) => void;
};

export const PaletteView = ({
  palette,
  currentFill,
  cellSize,
  onFillChange,
}: Props) => {
  return (
    <div
      className="Palette"
      style={{
        gridTemplateColumns: `repeat(${palette.length}, ${cellSize}px)`,
        gridTemplateRows: `${cellSize}px`,
      }}
    >
      {palette.map((fill, index) => (
        <PaletteCellView
          key={index}
          fill={fill}
          checked={fill === currentFill}
          onClick={() => onFillChange(fill)}
        />
      ))}
    </div>
  );
};
