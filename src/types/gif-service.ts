export interface GifService {
  fetch(keywords: string, limit?: number): Promise<string[]>;
}
