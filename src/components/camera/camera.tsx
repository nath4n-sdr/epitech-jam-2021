import React, { FC, RefObject, useEffect, VideoHTMLAttributes } from "react";
import { Camera } from "../../core/camera";

type Props = {
  constraints: MediaStreamConstraints;
  videoRef: RefObject<HTMLVideoElement>;
  videoProps: VideoHTMLAttributes<HTMLVideoElement>;
};

export const CameraComp: FC<Props> = (props) => {
  const { constraints, videoRef, videoProps } = props;
  const camera = new Camera(constraints);

  useEffect(() => {
    camera
      .start()
      .then(() => {
        if (videoRef.current && camera.stream) {
          videoRef.current.srcObject = camera.stream;
        }
      })
      .catch(console.error);
  }, []);

  return <video autoPlay={true} ref={videoRef} {...videoProps} />;
};
