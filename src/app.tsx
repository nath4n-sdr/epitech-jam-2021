import React, { FC, useEffect, useRef, useState } from "react";
import { GifCollectionStore } from "./store/gifCollectionStore";
import { shuffle } from "./utilities/array";
import { GifCollection } from "./models/gifCollection";
import { FaceCamera2Comp } from "./components/camera/face-camera-2";

const App: FC = () => {
  const [currentExpression, setCurrentExpression] = useState("neutral");
  const [startGifs, setStartGifs] = useState<string[]>([]);
  const [endGifs, setEndGifs] = useState<string[]>([]);
  const gifCollectionStore = new GifCollectionStore();
  const gifCollections: GifCollection[] = [];
  const videoRef = useRef<HTMLVideoElement>(null);

  const verifyStore = async () => {
    if (!gifCollectionStore.get()) {
      await gifCollectionStore.fetch();
    }

    const localGifCollections = gifCollectionStore.get();

    if (localGifCollections) {
      gifCollections.push(...localGifCollections);
    }
  };

  const setGifsByExpression = (expression: string) => {
    const gifCollection = gifCollections.find(
      (gifCollection) => gifCollection.expression === expression
    );

    if (!gifCollection) return;

    const shuffledGifs = shuffle(gifCollection.gifs);

    setStartGifs(shuffledGifs.slice(0, 4));
    setEndGifs(shuffledGifs.slice(4, 8));
  };

  useEffect(() => {
    (async () => {
      await verifyStore();

      setGifsByExpression(currentExpression);
    })();
  }, [currentExpression]);

  return (
    <div className="d-flex flex-column">
      <div className="row row-cols-3 flex-grow-1 m-0" style={{}}>
        {startGifs?.map((gif) => {
          return (
            <div key={gif} className={"col p-0"} style={{ height: "30vh" }}>
              <img src={gif} className="rounded gif" alt={"Gif"} />
            </div>
          );
        })}
        <div className="col p-0" style={{ height: "30vh" }}>
          <FaceCamera2Comp
            constraints={{ video: true }}
            videoRef={videoRef}
            width={"100%"}
            height={"100%"}
            onExpression={setCurrentExpression}
          />
        </div>
        {endGifs?.map((gif) => {
          return (
            <div key={gif} className={"col p-0"} style={{ height: "30vh" }}>
              <img src={gif} className="rounded gif" alt={"Gif"} />
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-around buttons flex-grow-0">
        <button type="button" className="btn button-past">
          Past
        </button>
        <button type="button" className="btn button-present">
          Present
        </button>
        <button type="button" className="btn button-future">
          Future
        </button>
      </div>
    </div>
  );
};

export default App;
