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
    <div className="Palette">
      {palette.map((fill, index) => (
        <PaletteCellView
          key={index}
          fill={fill}
          checked={fill === currentFill}
          cellSize={cellSize}
          onClick={() => onFillChange(fill)}
        />
      ))}
    </div>
  );
};
