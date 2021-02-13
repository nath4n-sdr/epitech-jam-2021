import axios from "axios";
import {GifCollection} from "../models/gifCollection";

const GIPHY_API_KEY = "T5aMxdeIqAybu1IpAhDQE9HreZbvotCP";
const TENOR_API_KEY = "YVJGH7MJKJYB";

async function fetchTenorsGifs(keyWord: string, limit: number) {
  const response = await axios.get(
    `https://g.tenor.com/v1/search?q=${keyWord}&key=${TENOR_API_KEY}&limit=${limit}`
  );
  return response.data;
}

async function fetchGiphyGifs(keyWord: string, limit: number) {
  const response = await axios.get(
    `https://api.giphy.com/v1/gifs/search?q=${keyWord}&api_key=${GIPHY_API_KEY}&limit=${limit}`
  );
  return response.data;
}

async function getGifsUrls(keyWord: string, limit: number): Promise<string[]> {
  const tenors = await fetchTenorsGifs(keyWord, limit);
  const giphy = await fetchGiphyGifs(keyWord, limit);
  const urlsList: string[] = [];

  tenors["results"].forEach((gifs: any) => {
    urlsList.push(gifs["media"][0]["gif"]["url"]);
  });
  giphy["data"].forEach((gifs: any) => {
    urlsList.push(gifs["images"]["original"]["url"]);
  });

  return urlsList;
}

export default async function generateGifsBank() {
  const bank: GifCollection[] = [
    {expression: "happy", gifs: await getGifsUrls("happy monkey", 50)},
    {expression: "neutral", gifs: await getGifsUrls("monkey", 50)},
    {expression: "angry", gifs: await getGifsUrls("angry monkey", 50)},
    {expression: "sad", gifs: await getGifsUrls("sad monkey", 50)},
    {expression: "fearful", gifs: await getGifsUrls("fearful monkey", 50)},
    {expression: "surprised", gifs: await getGifsUrls("surprised monkey", 50)},
  ];

  return bank;
}
