import React, { FC, useRef, useState } from "react";
import { Audio } from "./components/audio";

type style = "past" | "present" | "future";

const App: FC = () => {
  const [currentStyle, setCurrentStyle] = useState<style>("past");
  const [start, setStart] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const switchAudio = (style: style, start: number, volume?: number) => {
    if (style === "future") {
      start *= 0.91;
    }

    if (currentStyle === "future") {
      start *= 1 / 0.91;
    }

    setCurrentStyle(style);
    setStart(start);

    if (audioRef.current && volume) {
      audioRef.current.volume = volume;
    }
  };

  return (
    <div className="d-flex flex-column">
      <Audio
        music={{
          past: "audios/past.mp3",
          present: "audios/present.mp3",
          future: "audios/future.mp3",
        }}
        currentStyle={currentStyle}
        start={start}
        volume={0.2}
        audioRef={audioRef}
      />
      <div className="d-flex justify-content-around buttons flex-grow-0">
        <button
          type="button"
          className="btn button-past"
          onClick={() =>
            switchAudio("past", audioRef.current?.currentTime || 0, 0.3)
          }
        >
          Past
        </button>
        <button
          type="button"
          className="btn button-present"
          onClick={() =>
            switchAudio("present", audioRef.current?.currentTime || 0, 0.15)
          }
        >
          Present
        </button>
        <button
          type="button"
          className="btn button-future"
          onClick={() =>
            switchAudio("future", audioRef.current!.currentTime, 0.1)
          }
        >
          Future
        </button>
      </div>
    </div>
  );
};

export default App;
