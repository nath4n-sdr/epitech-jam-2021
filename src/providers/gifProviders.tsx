import axios from "axios";

export default async function fetchGifFromKeyWord(
  keyWord: string,
  limit: number
) {
  const response = await axios.get(
    "https://g.tenor.com/v1/search?q=" +
      keyWord +
      "&key=YVJGH7MJKJYB&limit=" +
      limit
  );
  return response.data;
}
