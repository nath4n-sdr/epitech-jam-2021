import React, { FC, RefObject, useEffect, useRef } from "react";

type AudioURLs = {
  past: string;
  present: string;
  future: string;
};

type Props = {
  music: AudioURLs;
  currentStyle: keyof AudioURLs;
  start?: number;
  stop?: number;
  volume?: number;
  audioRef?: RefObject<HTMLAudioElement>;
};

export const Audio: FC<Props> = (props) => {
  const { music, currentStyle, start, stop, volume, audioRef } = props;
  let ref = useRef<HTMLAudioElement>(null);
  let src = music[currentStyle];
  const timeRange = [];

  if (audioRef) {
    ref = audioRef;
  }

  if (start) {
    timeRange.push(start);
  }

  if (stop) {
    timeRange.push(stop);
  }

  if (timeRange.length) {
    src += "#t=" + timeRange.join(",");
  }

  useEffect(() => {
    if (ref.current && volume) {
      ref.current.volume = volume;
    }
  }, []);

  return <audio src={src} autoPlay={true} loop={true} ref={ref} />;
};
