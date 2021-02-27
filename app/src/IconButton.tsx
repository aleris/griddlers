import "./IconButton.scss";
import React, { ReactNode, useState } from "react";
import classNames from "./classNames";

type Props = {
  type: "Primary" | "Secondary";
  disabled?: boolean;
  icon: ReactNode;
  onAnimationStarted?: () => void;
  onAnimationFinished: () => void;
};

export const IconButton = ({
  type,
  disabled = false,
  icon,
  onAnimationStarted,
  onAnimationFinished,
}: Props) => {
  const [animate, setAnimate] = useState(false);
  const handleButtonOnClick = () => {
    if (onAnimationStarted) {
      onAnimationStarted();
    }
    setAnimate(true);
    setTimeout(onAnimationFinished, 250);
  };

  const buttonClassName = classNames("IconButton", {
    Animate: animate,
    [type]: true,
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
