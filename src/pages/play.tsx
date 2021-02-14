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
import { AudioComponent } from "../components/audio/audio";
import { FaceWebcam } from "../components/face/face";
import { FaceWrapper } from "../components/face/face-wrapper";
import { SplashScreenComponent } from "../components/splash/splash";

const Play: FC = () => {
  const gifProvider = new GifProvider(
    expressions,
    [new GiphyGifService(), new TenorGifService()],
    localStorage
  );

  const [displaySplash, setDisplaySplash] = useState(true);

  const [audioStart, setAudioStart] = useState(0);
  const [epoque, setEpoque] = useState("present");
  const [expression, setExpression] = useState("neutral");

  const [gifCollection, setGifCollection] = useState<GifCollection>();
  const [randomGifs, setRandomGifs] = useState<Gif[]>();

  const audioRef = useRef<HTMLAudioElement>(null);

  const switchAudio = (epoque: string, newEpoque: string) => {
    if (!audioRef.current) return;

    let audioStart = audioRef.current.currentTime;

    if (newEpoque === "future") {
      audioStart *= 0.91;
    }

    if (epoque === "future") {
      audioStart *= 1 / 0.91;
    }

    setAudioStart(audioStart);
  };

  const switchFavicon = (newEpoque: string) => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement;

    if (!favicon) return;

    favicon.href = `favicons/${newEpoque}.png`;
  };

  const onControlsClick = (newEpoque: string) => {
    switchAudio(epoque, newEpoque);
    switchFavicon(newEpoque);

    setEpoque(newEpoque);
  };

  const onReady = () => {
    setDisplaySplash(false);
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
    <div className={`play flex flex-col h-screen ${epoque}`}>
      <GifGridComponent gifs={randomGifs || []}>
        <FaceWrapper>
          <FaceWebcam onReady={onReady} onExpression={onExpression} />
          <canvas className={"face-filter"} />
        </FaceWrapper>
      </GifGridComponent>
      <ControlsComponent onClick={onControlsClick} />
      <AudioComponent
        url={audioEpoque[epoque]}
        start={audioStart}
        volume={0.2}
        audioRef={audioRef}
      />
      <SplashScreenComponent display={displaySplash} />
    </div>
  );
};

export default Play;
