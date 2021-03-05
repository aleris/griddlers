import "./IconButton.scss";
import React, { ReactNode, useState } from "react";
import classNames from "./classNames";

type Props = {
  type?: "Primary" | "Default";
  size?: "Default" | "Small";
  disabled?: boolean;
  icon: ReactNode;
  onClick: () => void;
  clickDelayMs?: number;
};

export const IconButton = ({
  type = "Default",
  size = "Default",
  disabled = false,
  icon,
  onClick,
  clickDelayMs = 250,
}: Props) => {
  const [animate, setAnimate] = useState(false);
  const handleButtonOnClick = () => {
    setAnimate(true);
    setTimeout(onClick, clickDelayMs);
  };

  const buttonClassName = classNames("IconButton", {
    Animate: animate,
    [type]: true,
    [`Size${size}`]: true,
  });

  return (
    <button
      type="button"
      className={buttonClassName}
      disabled={disabled}
      onClick={handleButtonOnClick}
    >
      {icon}
    </button>
  );
};
