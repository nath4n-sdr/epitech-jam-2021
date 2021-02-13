import React, {FC, useEffect, useRef} from "react";
import {Camera} from "../../core/camera";

type Props = {
  constraints: MediaStreamConstraints;
}

export const CameraComp: FC<Props> = (props) => {
  const {constraints} = props;
  const camera = new Camera(constraints);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    camera.start().then(() => {
      if (videoRef.current && camera.stream) {
        videoRef.current.srcObject = camera.stream;
      }
    });
  }, []);

  return (
    <video autoPlay={true} ref={videoRef}/>
  )
}
