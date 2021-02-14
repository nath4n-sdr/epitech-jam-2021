import React, { FC, useRef } from "react";
import Webcam from "react-webcam";
import { loadFaceDetection } from "../../face/face-detection";
import {
  detectFaceExpression,
  loadFaceExpression,
} from "../../face/face-expression";

type Props = {
  onReady: () => void;
  onExpression: (expression: string) => void;
};

export const FaceWebcam: FC<Props> = (props) => {
  const { onReady, onExpression } = props;
  const webcamRef = useRef<Webcam>(null);

  const onUserMedia = async () => {
    await loadFaceDetection();
    await loadFaceExpression();

    onReady();

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

  return <Webcam ref={webcamRef} onUserMedia={onUserMedia} />;
};
