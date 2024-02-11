import "./BackButton.scss";
import React from "react";
import BackIcon from "./assets/back.svg";

type Props = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: Props) => {
  return (
    <div className="BackButton">
      <button type="button" onClick={onClick} title="Go Back">
        <img src={BackIcon} alt="Back" />
      </button>
    </div>
  );
};
