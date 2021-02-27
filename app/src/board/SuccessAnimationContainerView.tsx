import "./SuccessAnimationContainerView.scss";
import React from "react";

type Props = {
  animate: boolean;
};

export const SuccessAnimationContainer = ({
  animate,
  children,
}: React.PropsWithChildren<Props>) => {
  const className = animate ? "SuccessAnimationContainer" : undefined;
  return <div className={className}>{children}</div>;
};
