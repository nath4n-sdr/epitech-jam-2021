import React, { FC } from "react";

type Props = {
  onClick: (epoque: string) => void;
};

export const ControlsComponent: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <div className={"controls flex-grow flex justify-around items-center"}>
      <button type="button" className="button" onClick={() => onClick("past")}>
        <span className={"text"}>Past</span>
      </button>
      <button
        type="button"
        className="button"
        onClick={() => onClick("present")}
      >
        <span className={"text"}>Present</span>
      </button>
      <button
        type="button"
        className="button"
        onClick={() => onClick("future")}
      >
        <span className={"text"}>Future</span>
      </button>
    </div>
  );
};
