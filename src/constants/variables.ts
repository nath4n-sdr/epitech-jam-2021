import { GifExpression } from "../models/gif-expression";

export const audioEpoque: Record<string, string> = {
  past: "medias/past.mp3",
  present: "medias/present.mp3",
  future: "medias/future.mp3",
};

export const expressions: GifExpression[] = [
  {
    type: "neutral-past",
    keywords: "monkey",
  },
  {
    type: "happy-past",
    keywords: "happy monkey",
  },
  {
    type: "angry-past",
    keywords: "angry monkey",
  },
  {
    type: "sad-past",
    keywords: "sad monkey",
  },
  {
    type: "fearful-past",
    keywords: "fearful monkey",
  },
  {
    type: "surprised-past",
    keywords: "surprised monkey",
  },
  {
    type: "disgusted-past",
    keywords: "disgusted monkey",
  },
  {
    type: "neutral-present",
    keywords: "jaded",
  },
  {
    type: "happy-present",
    keywords: "happy",
  },
  {
    type: "angry-present",
    keywords: "angry",
  },
  {
    type: "sad-present",
    keywords: "sad",
  },
  {
    type: "fearful-present",
    keywords: "fearful",
  },
  {
    type: "surprised-present",
    keywords: "surprised",
  },
  {
    type: "disgusted-present",
    keywords: "disgusted",
  },
  {
    type: "neutral-future",
    keywords: "robot",
  },
  {
    type: "happy-future",
    keywords: "happy robot",
  },
  {
    type: "angry-future",
    keywords: "angry robot",
  },
  {
    type: "sad-future",
    keywords: "sad robot",
  },
  {
    type: "fearful-future",
    keywords: "fearful robot",
  },
  {
    type: "surprised-future",
    keywords: "surprised robot",
  },
  {
    type: "disgusted-future",
    keywords: "disgusted robot",
  },
];
