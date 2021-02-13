import * as path from "path";

import React, { FC, RefObject, useEffect, useRef, useState } from "react";

import { CameraComp } from "./camera";

import * as faceapi from "@vladmandic/face-api";
import { FaceExpressions, FaceLandmarks68 } from "@vladmandic/face-api";

import * as faceDetection from "@tensorflow-models/face-landmarks-detection";

import "@tensorflow/tfjs-backend-webgl";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import {
  AnnotatedPrediction,
  MediaPipeFaceMesh,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import { Coords3D } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";

type Props = {
  constraints: MediaStreamConstraints;
  videoRef: RefObject<HTMLVideoElement>;
  width?: number | string;
  height?: number | string;
  onExpression: (expression: string) => void;
};

export const SuperCameraComp: FC<Props> = (props) => {
  let singlePrint = false;

  const {
    width = 640,
    height = 480,
    constraints,
    videoRef,
    onExpression,
  } = props;
  const [currentExpression, setCurrentExpression] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeRef = useRef<HTMLCanvasElement>(null);
  const videoConstraints: MediaTrackConstraints = {
    ...(constraints.video as MediaTrackConstraints | undefined),
  };
  let renderer: WebGLRenderer;

  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  const cubeMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
  const object = new Mesh(cubeGeometry, cubeMaterial);

  camera.position.z = 0;

  scene.add(object);

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

      if (!singlePrint) {
        console.log(detection.unshiftedLandmarks.getMouth());
        singlePrint = true;
      }

      return [detection.expressions, detection.landmarks];
    }
  };

  const predict = async (
    model: MediaPipeFaceMesh
  ): Promise<AnnotatedPrediction[] | undefined> => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      return model.estimateFaces({
        input: videoRef.current,
        returnTensors: false,
      });
    }
  };

  const updateSize = () => {
    if (!threeRef.current) return;

    const width = threeRef.current.clientWidth;
    const height = threeRef.current.clientHeight;

    if (threeRef.current.width === width && threeRef.current.height === height)
      return;

    camera.aspect = width / height;

    renderer.setSize(width, height, false);

    camera.updateProjectionMatrix();
  };

  const track = async (predictions: AnnotatedPrediction[]) => {
    for (const prediction of predictions) {
      if (!("annotations" in prediction)) continue;
      if (!prediction.annotations) continue;

      object.position.x =
        prediction.annotations.midwayBetweenEyes[0][0] || object.position.x;
      object.position.y =
        prediction.annotations.midwayBetweenEyes[0][1] || object.position.y;
      object.position.z =
        prediction.annotations.midwayBetweenEyes[0][2] || object.position.z;

      const eyeDist = Math.sqrt(
        (prediction.annotations.leftEyeUpper1[3][0] -
          prediction.annotations.rightEyeUpper1[3][0]) **
          2 +
          (prediction.annotations.leftEyeUpper1[3][1] -
            prediction.annotations.rightEyeUpper1[3][1]) **
            2 +
          (prediction.annotations.leftEyeUpper1[3][2] -
            prediction.annotations.rightEyeUpper1[3][2]) **
            2
      );

      object.scale.x = eyeDist / 6;
      object.scale.y = eyeDist / 6;
      object.scale.z = eyeDist / 6;

      console.log(object.position);
      console.log(object.scale);

      return;
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
    await faceapi.nets.tinyFaceDetector.loadFromUri(
      path.join(__dirname, "/models")
    );
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
      path.join(__dirname, "/models")
    );
    await faceapi.nets.faceExpressionNet.loadFromUri(
      path.join(__dirname, "/models")
    );

    const model = await faceDetection.load(
      faceDetection.SupportedPackages.mediapipeFacemesh
    );

    if (videoRef.current && canvasRef.current) {
      videoRef.current.width = videoRef.current.videoWidth;
      videoRef.current.height = videoRef.current.videoHeight;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
    }

    if (threeRef.current) {
      renderer = new WebGLRenderer({
        canvas: threeRef.current,
        alpha: true,
      });
    }

    const loop = async () => {
      updateSize();

      renderer.render(scene, camera);

      const detection = await detect();

      if (detection) {
        const expressions = detection[0].asSortedArray();

        setCurrentExpression(expressions[0].expression);
      }

      const predictions = await predict(model);

      if (predictions) {
        await draw(predictions);
        await track(predictions);
      }

      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    onExpression(currentExpression);
  }, [currentExpression]);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
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
          style: {
            width,
            height,
            objectFit: "cover",
          },
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 5,
          width,
          height,
          objectFit: "cover",
        }}
      />
      <canvas
        ref={threeRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          width,
          height,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 15,
          backgroundColor: "red",
          color: "white",
        }}
      >
        {currentExpression}
      </div>
    </div>
  );
};
