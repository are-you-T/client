import { question, question2 } from "./question";
import { board, boardPost } from "./board";
import { color } from "./color";
import { resMbti } from "./resMbti";
interface resData<D> {
  error: string | null;
  data: D;
}

export type { resData, question, question2, board, boardPost, color, resMbti };
