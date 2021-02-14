import React, { FC } from "react";
import { Gif } from "../../models/gif";

type Props = {
  gif: Gif;
};

export const GifComponent: FC<Props> = (props) => {
  const { gif } = props;

  return <img src={gif.url} alt={gif.alt} />;
};
