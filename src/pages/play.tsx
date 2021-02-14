import React, { FC, useEffect, useRef, useState } from "react";
import { GifProvider } from "../providers/gif";
import { audioEpoque, expressions } from "../constants/variables";
import { GiphyGifService } from "../providers/gif/giphy";
import { TenorGifService } from "../providers/gif/tenor";
import { GifCollection } from "../models/gif-collection";
import { Gif } from "../models/gif";
import { shuffle } from "../utilities/array";
import { GifGridComponent } from "../components/gif/grid";
import { ControlsComponent } from "../components/controls/controls";
import { AudioComponent } from "../components/audio/audioComponent";
import { FaceWebcam } from "../components/face/face";

const Play: FC = () => {
  const gifProvider = new GifProvider(
    expressions,
    [new GiphyGifService(), new TenorGifService()],
    localStorage
  );

  const [audioStart, setAudioStart] = useState(0);
  const [epoque, setEpoque] = useState("present");
  const [expression, setExpression] = useState("neutral");

  const [gifCollection, setGifCollection] = useState<GifCollection>();
  const [randomGifs, setRandomGifs] = useState<Gif[]>();

  const audioRef = useRef<HTMLAudioElement>(null);

  const switchAudio = () => {
    if (!audioRef.current) return;

    let audioStart = audioRef.current.currentTime;

    if (epoque === "future") {
      audioStart *= 0.91;
    }

    if (epoque === "future") {
      audioStart *= 1 / 0.91;
    }

    setAudioStart(audioStart);
  };

  const onControlsClick = (epoque: string) => {
    setEpoque(epoque);

    switchAudio();
  };

  const onExpression = (expression: string) => {
    setExpression(expression);
  };

  useEffect(() => {
    (async () => {
      const gifCollection = await gifProvider.get(`${expression}-${epoque}`);

      setGifCollection(gifCollection);
    })();
  }, [epoque, expression]);

  useEffect(() => {
    if (!gifCollection) return;

    const randomGifs = shuffle(gifCollection.gifs);

    setRandomGifs(randomGifs.slice(0, 8));
  }, [gifCollection]);

  return (
    <>
      <GifGridComponent gifs={randomGifs || []}>
        <FaceWebcam onExpression={onExpression} />
      </GifGridComponent>
      <ControlsComponent onClick={onControlsClick} />
      <AudioComponent
        url={audioEpoque[epoque]}
        start={audioStart}
        volume={0.2}
        audioRef={audioRef}
      />
    </>
  );
};

export default Play;