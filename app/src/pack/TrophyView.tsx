import "./TrophyView.scss";
import React from "react";
import TrophyBw from "../assets/trophy-bw.svg";
import TrophyColor from "../assets/trophy-color.svg";

type Props = {
  completedPercent: number;
};

export const TrophyView = ({ completedPercent }: Props) => {
  return (
    <div className="Trophy">
      <img
        src={TrophyBw}
        style={{ clipPath: `inset(0 0 ${completedPercent}% 0)` }}
        alt="Trophy Completed"
      />
      <img
        src={TrophyColor}
        style={{ clipPath: `inset(${100 - completedPercent}% 0 0 0)` }}
        alt="Trophy Completed"
      />
    </div>
  );
};
