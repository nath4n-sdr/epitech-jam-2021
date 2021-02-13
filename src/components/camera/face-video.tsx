import React, { FC, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { FaceExpressions, FaceLandmarks68 } from "face-api.js";

import "@tensorflow/tfjs-backend-webgl";
import * as path from "path";

type Props = {
  url: string;
  width?: number;
  height?: number;
};

export const FaceVideoComp: FC<Props> = (props) => {
  const { url, width = 640, height = 480 } = props;
  const [currentExpression, setCurrentExpression] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    console.log("LOADED!!!");

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
      <video
        autoPlay={true}
        loop={true}
        src={url}
        ref={videoRef}
        onLoadedData={onLoadedData}
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
