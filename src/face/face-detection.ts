import * as path from "path";
import * as faceApi from "face-api.js";
import { FaceDetection, TinyFaceDetectorOptions } from "face-api.js";

export async function loadFaceDetection(): Promise<void> {
  const modelsPath = path.join(__dirname, "/models");

  await faceApi.nets.tinyFaceDetector.loadFromUri(modelsPath);
}

export async function detectFace(
  videoElement: HTMLVideoElement
): Promise<FaceDetection | undefined> {
  const options = new TinyFaceDetectorOptions();

  return faceApi.detectSingleFace(videoElement, options);
}
