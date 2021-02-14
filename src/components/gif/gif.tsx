import React, { FC } from "react";
import { Gif } from "../../models/gif";

type Props = {
  gif: Gif;
};

export const GifComponent: FC<Props> = (props) => {
  const { gif } = props;

  return <img className={"gif-image"} src={gif.url} alt={gif.alt} />;
};
