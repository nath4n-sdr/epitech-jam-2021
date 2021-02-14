import { GifService } from "../types/gif-service";
import { GifCollection } from "../models/gif-collection";
import { GifExpression } from "../models/gif-expression";
import { Gif } from "../models/gif";

const STORAGE_KEY = "gifCollections";

export class GifProvider {
  expressions: GifExpression[];
  services: GifService[];
  storage: Storage;

  constructor(
    expressions: GifExpression[],
    services: GifService[],
    storage: Storage
  ) {
    this.expressions = expressions;
    this.services = services;
    this.storage = storage;
  }

  async list(): Promise<GifCollection[]> {
    const gifCollectionsJson = this.storage.getItem(STORAGE_KEY);

    if (!gifCollectionsJson) {
      return this.fetch();
    }

    return JSON.parse(gifCollectionsJson);
  }

  async get(expression: string): Promise<GifCollection | undefined> {
    const gifCollections = await this.list();

    return gifCollections.find(
      (gifCollection) => gifCollection.expression.type === expression
    );
  }

  private async fetch(): Promise<GifCollection[]> {
    const gifCollections: GifCollection[] = [];

    for (const expression of this.expressions) {
      const gifCollection: GifCollection = {
        expression,
        gifs: [],
      };

      for (const service of this.services) {
        const urls = await service.fetch(expression.keywords);
        const gifs = urls.map(
          (url): Gif => {
            return { url: url, alt: expression.keywords };
          }
        );

        gifCollection.gifs.push(...gifs);
      }

      gifCollections.push(gifCollection);
    }

    this.storage.setItem(STORAGE_KEY, JSON.stringify(gifCollections));

    return gifCollections;
  }
}
