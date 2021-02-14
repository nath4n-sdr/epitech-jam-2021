import React, { FC, RefObject, useEffect, useRef } from "react";

type Props = {
  url: string;
  start?: number;
  stop?: number;
  volume?: number;
  audioRef?: RefObject<HTMLAudioElement>;
};

export const AudioComponent: FC<Props> = (props) => {
  const { url, start, stop, volume, audioRef } = props;
  let ref = useRef<HTMLAudioElement>(null);
  let src = url;
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
