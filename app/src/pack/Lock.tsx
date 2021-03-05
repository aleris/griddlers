import "./Lock.scss";
import React from "react";
import LockSvg from "../assets/lock.svg";

export const Lock = () => {
  return (
    <div className="Lock">
      <img src={LockSvg} alt="Locked" />
    </div>
  );
};
