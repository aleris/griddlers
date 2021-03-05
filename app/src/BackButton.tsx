import "./BackButton.scss";
import React from "react";
import BackIcon from "./assets/back.svg";

type Props = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: Props) => {
  return (
    <button type="button" className="BackButton" onClick={onClick}>
      <img src={BackIcon} alt="Back" />
    </button>
  );
};
