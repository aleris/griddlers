import "./ProgressView.scss";
import React from "react";
import {PackWithProgress} from '../home/PackWithProgress'
import { TrophyView } from "./TrophyView";
import MedalColor from "../assets/medal-color.svg"

type Props = {
  pack: PackWithProgress
};

export const ProgressView = ({ pack }: Props) => {
  return pack.completedMedals !== 0 ? (
    <div className="Progress">
      <div className="Progress--Trophy">
        <TrophyView completedPercent={pack.completedPercent} />
      </div>
      <div className="Progress--Medal">
        <img src={MedalColor} alt="Medals" />
      </div>
      <div className="Progress--Count">{pack.completedMedals}/{pack.totalMedals}</div>
    </div>
  ) : null;
};
