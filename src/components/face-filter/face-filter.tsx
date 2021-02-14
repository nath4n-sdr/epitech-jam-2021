import React, { FC } from "react";
import CSS from "csstype";

type Props = {
  epoque: string;
};
export const FaceFilter: FC<Props> = (props) => {
  const { epoque } = props;
  const past: CSS.Properties = {
    filter: "sepia(100%)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  const future: CSS.Properties = {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow:
      "inset 0 0 60px whitesmoke,inset 20px 0 80px #f0f,inset -20px 0 80px #0ff,inset 20px 0 300px #f0f,inset -20px 0 300px #0ff,0 0 50px #fff,-10px 0 80px #f0f,10px 0 80px #0ff",
  };
  return <canvas style={epoque === "future" ? future : past} />;
};
