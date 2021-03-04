import "./PaletteCellView.scss";
import classNames from "../classNames";
import { Fill, FillEmpty, FillMarkedEmpty } from "./Board";
import { FillSupport } from "./FillSupport";

type Props = {
  fill: Fill;
  cellSize: number;
  checked: boolean;
  onClick: () => void;
};

const CheckElement = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -47 417 417">
    <path d="M159.988 318.582c-3.988 4.012-9.43 6.25-15.082 6.25s-11.094-2.238-15.082-6.25L9.375 198.113c-12.5-12.5-12.5-32.77 0-45.246l15.082-15.086c12.504-12.5 32.75-12.5 45.25 0l75.2 75.203L348.104 9.781c12.504-12.5 32.77-12.5 45.25 0l15.082 15.086c12.5 12.5 12.5 32.766 0 45.246zm0 0" />
  </svg>
);

export const PaletteCellView = ({
  fill,
  cellSize,
  checked,
  onClick,
}: Props) => {
  const fillColor = FillSupport.toColor(fill);
  const classNameFill = classNames("PaletteCell--Fill", {
    Color: !FillSupport.isEmptyOrMarkedEmpty(fill),
    Empty: fill === FillEmpty,
    MarkedEmpty: fill === FillMarkedEmpty,
  });
  return (
    <div
      className="PaletteCell"
      onClick={onClick}
    >
      <div
        className={classNameFill}
        style={{ backgroundColor: fillColor, borderColor: fillColor }}
      >
        {checked ? CheckElement : null}
      </div>
    </div>
  );
};
