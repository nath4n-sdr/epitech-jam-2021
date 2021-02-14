import React, { FC } from "react";

type Props = {
  onClick: (epoque: string) => void;
};

export const ControlsComponent: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <div className="d-flex justify-content-around buttons flex-grow-0">
      <button type="button" className="btn" onClick={() => onClick("past")}>
        Past
      </button>
      <button type="button" className="btn" onClick={() => onClick("present")}>
        Present
      </button>
      <button type="button" className="btn" onClick={() => onClick("future")}>
        Future
      </button>
    </div>
  );
};
