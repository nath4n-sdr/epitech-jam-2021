import { GifService } from "../../types/gif-service";
import axios from "axios";

const TENOR_API_KEY = "T5aMxdeIqAybu1IpAhDQE9HreZbvotCP";

export class TenorGifService implements GifService {
  async fetch(keywords: string, limit = 50): Promise<string[]> {
    const response = await axios.get(
      `https://g.tenor.com/v1/search?q=${keywords}&key=${TENOR_API_KEY}&limit=${limit}`
    );

    return response.data.results.map((result: any) => {
      return result.media[0].gif.url;
    });
  }
}
