import React, { FC, useRef } from "react";
import Webcam from "react-webcam";
import { loadFaceDetection } from "../../face/face-detection";
import "../../styles/global.scss";
import {
  detectFaceExpression,
  loadFaceExpression,
} from "../../face/face-expression";

type Props = {
  onExpression: (expression: string) => void;
  epoque: string;
};

export const FaceWebcam: FC<Props> = (props) => {
  const { onExpression, epoque } = props;
  const webcamRef = useRef<Webcam>(null);

  const onUserMedia = async () => {
    await loadFaceDetection();
    await loadFaceExpression();

    const loop = async () => {
      if (!webcamRef.current?.video) return;

      const expression = await detectFaceExpression(webcamRef.current.video);

      if (expression) {
        onExpression(expression);
      }

      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  };

  return (
    <Webcam
      className={`webcam ${epoque}`}
      ref={webcamRef}
      onUserMedia={onUserMedia}
    />
  );
};
