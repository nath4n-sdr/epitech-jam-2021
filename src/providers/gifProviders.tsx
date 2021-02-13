import axios from "axios";

async function fetchTenorsGifs(keyWord: string, limit: number) {
  const response = await axios.get(
    "https://g.tenor.com/v1/search?q=" +
      keyWord +
      "&key=YVJGH7MJKJYB&limit=" +
      limit
  );
  return response.data;
}

async function fetchGiphyGifs(keyWord: string, limit: number) {
  const response = await axios.get(
    "https://api.giphy.com/v1/gifs/search?q=" +
      keyWord +
      "&api_key=T5aMxdeIqAybu1IpAhDQE9HreZbvotCP&limit=" +
      limit
  );
  return response.data;
}

async function getGifsUrls(keyWord: string, limit: number) {
  const tenors = await fetchTenorsGifs(keyWord, limit);
  const giphy = await fetchGiphyGifs(keyWord, limit);
  var urlsList: any[] = [];

  tenors["results"].map((gifs: any) => {
    urlsList.push(gifs["media"][0]["gif"]["url"]);
  });
  giphy["data"].map((gifs: any) => {
    urlsList.push(gifs["images"]["original"]["url"]);
  });
  console.log(urlsList);
}

export default async function generateGifsBank() {
  const bank: any[] = [
    { feeling: "happy", gifs: await getGifsUrls("happy monkey", 50) },
    { feeling: "neutral", gifs: await getGifsUrls("neutral monkey", 50) },
    { feeling: "angry", gifs: await getGifsUrls("angry monkey", 50) },
    { feeling: "sad", gifs: await getGifsUrls("sad monkey", 50) },
    { feeling: "fearful", gifs: await getGifsUrls("fearful monkey", 50) },
    { feeling: "surprised", gifs: await getGifsUrls("surprised monkey", 50) },
  ];

  return bank;
}
