import React, { FC } from "react";

type Props = {
  display: boolean;
};

export const SplashScreenComponent: FC<Props> = (props) => {
  const { display } = props;

  return (
    <div
      className={`splash justify-center items-center w-screen h-screen ${
        display ? "flex" : "hidden"
      }`}
    >
      <img src="./medias/MONKE.gif" alt="logo" />
    </div>
  );
};
