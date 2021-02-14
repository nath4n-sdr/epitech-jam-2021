import { GifService } from "../../types/gif-service";
import axios from "axios";

const GIPHY_API_KEY = "T5aMxdeIqAybu1IpAhDQE9HreZbvotCP";

export class GiphyGifService implements GifService {
  async fetch(keywords: string, limit = 50): Promise<string[]> {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=${keywords}&api_key=${GIPHY_API_KEY}&limit=${limit}`
    );

    return response.data.data.map((result: any) => {
      return result.images.original.url;
    });
  }
}
