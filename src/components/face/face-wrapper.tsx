import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};
export const FaceWrapper: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
