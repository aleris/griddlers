import "./DifficultyView.scss";
import React from "react";
import MedalBw from "../assets/medal-bw.svg";
import MedalColor from "../assets/medal-color.svg";

type Props = {
  rating: number;
  completed: boolean;
};

export const DifficultyView = ({ rating, completed }: Props) => (
  <div className="Difficulty">
    {Array.from({ length: rating }).map((_, index) => (
      <div key={index} className="Difficulty--Cell">
        {completed ? (
          <img src={MedalColor} alt="Completed Medal" />
        ) : (
          <img src={MedalBw} alt="Uncompleted Medal Placeholder" />
        )}
      </div>
    ))}
  </div>
);
