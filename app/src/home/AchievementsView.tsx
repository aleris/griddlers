import "./AchievementsView.scss";
import React from "react";
import MedalColor from "../assets/medal-color.svg";
import { Board } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import { BoardRegistry } from "../registry/BoardRegistry";
import { TrophyView } from "./TrophyView";

type Props = {
  completedBoards: Board[];
};

export const AchievementsView = ({ completedBoards }: Props) => {
  const medalCount = BoardSupport.countMedals(completedBoards);
  const completedPercent = Math.round(
    (medalCount * 100) / BoardRegistry.pictureSpecs.length
  );

  return medalCount !== 0 ? (
    <div className="Achievements">
      <div className="Achievements--Medals">
        <div className="Count">{medalCount}</div>
        <img className="Icon" src={MedalColor} />
      </div>
      <div className="Achievements--Trophy">
        <div className="Icon">
          <TrophyView completedPercent={completedPercent} />
        </div>
        <div className="Count">{completedPercent}%</div>
      </div>
    </div>
  ) : null;
};
