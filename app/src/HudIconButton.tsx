import React from "react";
import "./HudIconButton.scss";
import classNames from "./classNames";

type Props = {
  onClick: () => void;
  title: string;
  iconSrc: string;
  justify?: "Start" | "End";
  push?: "0" | "1";
  additionalClassName?: string;
};

export const HudIconButton = ({
  onClick,
  title,
  iconSrc,
  justify = "Start",
  push = "0",
  additionalClassName = "",
}: Props) => {
  const className = classNames("HudIconButton", {
    [`${justify}--${push}`]: true,
  });
  return (
    <div className={`${className} ${additionalClassName}`}>
      <button type="button" onClick={onClick} title={title}>
        <img src={iconSrc} alt={title} />
      </button>
    </div>
  );
};
