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
    <div className="gif-grid grid grid-rows-3 grid-flow-col auto-cols-fr">
      {startGifs.map((gif) => {
        return (
          <div key={gif.url} className="item">
            <GifComponent gif={gif} />
          </div>
        );
      })}
      <div className="item">{children}</div>
      {endGifs.map((gif) => {
        return (
          <div key={gif.url} className="item">
            <GifComponent gif={gif} />
          </div>
        );
      })}
    </div>
  );
};
