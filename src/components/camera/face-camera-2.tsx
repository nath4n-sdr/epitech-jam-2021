import React, { FC, RefObject, useRef, useState } from "react";
import { CameraComp } from "./camera";
import * as faceapi from "face-api.js";
import { FaceExpressions, FaceLandmarks68 } from "face-api.js";

import "@tensorflow/tfjs-backend-webgl";
import * as path from "path";

type Props = {
  constraints: MediaStreamConstraints;
  videoRef: RefObject<HTMLVideoElement>;
  width?: number;
  height?: number;
};

export const FaceCamera2Comp: FC<Props> = (props) => {
  const { width = 640, height = 480, constraints, videoRef } = props;
  const [currentExpression, setCurrentExpression] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoConstraints: MediaTrackConstraints = {
    ...(constraints.video as MediaTrackConstraints | undefined),
    width,
    height,
  };

  const detect = async (): Promise<
    [FaceExpressions, FaceLandmarks68] | undefined
  > => {
    if (videoRef.current) {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks(true)
        .withFaceExpressions()
        .run();

      if (!detection?.expressions || !detection.landmarks) return;

      return [detection.expressions, detection.landmarks];
    }
  };

  const draw = async (landmarks: FaceLandmarks68) => {
    const canvasContext = canvasRef.current?.getContext("2d");

    if (canvasRef.current && canvasContext) {
      canvasContext.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      for (const position of landmarks.positions) {
        canvasContext.beginPath();
        canvasContext.arc(position.x, position.y, 1, 0, 3 * Math.PI);
        canvasContext.fillStyle = "aqua";
        canvasContext.fill();
      }
    }
  };

  const onLoadedData = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(
      path.join(__dirname, "/models")
    );
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
      path.join(__dirname, "/models")
    );
    await faceapi.nets.faceExpressionNet.loadFromUri(
      path.join(__dirname, "/models")
    );

    const loop = async () => {
      const detection = await detect();

      if (detection) {
        await draw(detection[1]);

        const expressions = detection[0].asSortedArray();

        setCurrentExpression(expressions[0].expression);
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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          backgroundColor: "red",
          color: "white",
        }}
      >
        {currentExpression}
      </div>
    </div>
  );
};
