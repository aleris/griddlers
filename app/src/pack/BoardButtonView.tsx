import "./BoardButtonView.scss";
import React from "react";
import classNames from "../classNames";

type Props = {
  onClick?: () => void;
  highlight?: boolean;
  disabled?: boolean;
};

export const BoardButtonView = ({
  children,
  onClick,
  highlight = false,
  disabled = false,
}: React.PropsWithChildren<Props>) => {
  function handleOnClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <div
      className={classNames("BoardButton", {
        Highlight: highlight,
      })}
    >
      <button type="button" onClick={handleOnClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};
