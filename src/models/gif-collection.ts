import { Gif } from "./gif";
import { GifExpression } from "./gif-expression";

export type GifCollection = {
  expression: GifExpression;
  gifs: Gif[];
};
