import React from "react";
import "./PaletteCellView.scss";
import classNames from "../classNames";
import { Fill, FillEmpty, FillMarkedEmpty } from "./Board";
import { FillSupport } from "./FillSupport";
import TriangleUp from "../assets/triangle-up.svg";

type Props = {
  fill: Fill;
  checked: boolean;
  onClick: () => void;
  interactive?: boolean;
  keyboardShortcut: string | null;
};

export const PaletteCellView = ({
  fill,
  checked,
  onClick,
  interactive = true,
  keyboardShortcut = null,
}: Props) => {
  const fillColor = FillSupport.toColor(fill);
  const classNameFill = classNames("PaletteCell--Fill", {
    Color: !FillSupport.isEmptyOrMarkedEmpty(fill),
    Empty: fill === FillEmpty,
    MarkedEmpty: fill === FillMarkedEmpty,
    Interactive: interactive,
  });
  const getTitle = (fill: Fill) => {
    switch (fill) {
      case FillEmpty:
        return "Clear cell";
      case FillMarkedEmpty:
        return "Mark cell as space";
      default:
        return "Fill cell";
    }
  };
  return (
    <div className="PaletteCell" onClick={onClick}>
      <div
        className={classNameFill}
        style={{ backgroundColor: fillColor, borderColor: fillColor }}
        title={getTitle(fill)}
      >
        {checked ? <img src={TriangleUp} alt={"marker"} /> : null}
        {keyboardShortcut ? (
          <div
            className="PaletteCell--KeyboardShortcut"
            title={`Keyboard shortcut. Press ${keyboardShortcut} to select.`}
          >
            {keyboardShortcut}
          </div>
        ) : null}
      </div>
    </div>
  );
};
