import "./PackProgressView.scss";
import React from "react";
import MedalColor from "../assets/medal-color.svg";
import { PackWithProgress } from "./PackWithProgress";
import { TrophyView } from "../pack/TrophyView";

type Props = {
  pack: PackWithProgress;
};

export const PackProgressView = ({ pack }: Props) => {
  return (
    <div className="PackProgress">
      {pack.completedMedals === pack.totalMedals ? (
        <div className="PackProgress--Trophy">
          <TrophyView completedPercent={pack.completedPercent} />
        </div>
      ) : (
        <div className="PackProgress--Medals">
          <div className="PackProgress--Medal">
            <img src={MedalColor} alt="Medals" />
          </div>
          <div className="PackProgress--Count">
            {pack.completedMedals}/{pack.totalMedals}
          </div>
        </div>
      )}
    </div>
  );
};
