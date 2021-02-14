import React, { FC } from "react";
import { Gif } from "../../models/gif";
import { GifComponent } from "./gif";

type Props = {
  gifs: Gif[];
};

export const GifGridComponent: FC<Props> = (props) => {
  const { gifs, children } = props;
  const startGifs = gifs.slice(0, gifs.length / 2);
  const endGifs = gifs.slice(gifs.length / 2);

  return (
    <div className="row row-cols-3 m-0">
      {startGifs.map((gif) => {
        return (
          <div key={gif.url} className="col p-0 gif-item">
            <GifComponent gif={gif} />
          </div>
        );
      })}
      <div className="col p-0 gif-item">{children}</div>
      {endGifs.map((gif) => {
        return (
          <div key={gif.url} className="col p-0 gif-item">
            <GifComponent gif={gif} />
          </div>
        );
      })}
    </div>
  );
};
