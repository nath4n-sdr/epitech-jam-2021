import React, { FC, RefObject, useRef } from "react";
import { CameraComp } from "./camera";
import * as faceDetection from "@tensorflow-models/face-landmarks-detection";

import "@tensorflow/tfjs-backend-webgl";
import { Coords3D } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";
import {
  AnnotatedPrediction,
  MediaPipeFaceMesh,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";

type Props = {
  constraints: MediaStreamConstraints;
  videoRef: RefObject<HTMLVideoElement>;
  width?: number;
  height?: number;
};

export const FaceCameraComp: FC<Props> = (props) => {
  const { width = 640, height = 480, constraints, videoRef } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoConstraints: MediaTrackConstraints = {
    ...(constraints.video as MediaTrackConstraints | undefined),
    width,
    height,
  };

  const predict = async (
    model: MediaPipeFaceMesh
  ): Promise<AnnotatedPrediction[] | undefined> => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      return model.estimateFaces({
        input: videoRef.current,
      });
    }
  };

  const draw = async (predictions: AnnotatedPrediction[]) => {
    const canvasContext = canvasRef.current?.getContext("2d");

    if (canvasRef.current && canvasContext) {
      canvasContext.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      for (const prediction of predictions) {
        const keyPoints = prediction.scaledMesh as Coords3D;

        for (const keyPoint of keyPoints) {
          canvasContext.beginPath();
          canvasContext.arc(keyPoint[0], keyPoint[1], 1, 0, 3 * Math.PI);
          canvasContext.fillStyle = "aqua";
          canvasContext.fill();
        }
      }
    }
  };

  const onLoadedData = async () => {
    const model = await faceDetection.load(
      faceDetection.SupportedPackages.mediapipeFacemesh
    );

    const loop = async () => {
      const predictions = await predict(model);

      if (predictions) {
        await draw(predictions);
      }

      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <CameraComp
        constraints={{
          ...constraints,
          video: videoConstraints,
        }}
        videoRef={videoRef}
        videoProps={{
          onLoadedData,
        }}
      />
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};
