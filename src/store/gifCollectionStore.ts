import generateGifsBank from "../providers/gifProviders";
import {GifCollection} from "../models/gifCollection";

export class GifCollectionStore {
  async fetch(): Promise<void> {
    const gifCollections = await generateGifsBank();

    const json = JSON.stringify(gifCollections);

    localStorage.setItem("gifCollections", json);
  }

  get(): GifCollection[] | undefined {
    const raw = localStorage.getItem("gifCollections");

    return raw ? JSON.parse(raw) : undefined;
  }
}
