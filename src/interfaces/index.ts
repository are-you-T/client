import { question, question2 } from "./question";
import { board } from "./board";

interface resData<D> {
  error: string | null;
  data: D;
}

export type { resData, question, question2, board };
