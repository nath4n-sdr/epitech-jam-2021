import * as path from "path";
import * as faceApi from "face-api.js";
import { TinyFaceDetectorOptions } from "face-api.js";

export async function loadFaceExpression(): Promise<void> {
  const modelsPath = path.join(__dirname, "/models");

  await faceApi.nets.faceExpressionNet.loadFromUri(modelsPath);
}

export async function detectFaceExpression(
  videoElement: HTMLVideoElement
): Promise<string | undefined> {
  const options = new TinyFaceDetectorOptions();

  const expressions = await faceApi
    .detectSingleFace(videoElement, options)
    .withFaceExpressions();
  const sortedExpressions = expressions?.expressions.asSortedArray();

  return sortedExpressions?.[0].expression;
}
