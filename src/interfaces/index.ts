import {
  question,
  testCardProps,
  userAnswer,
  MBTIData,
  userResponseProps,
  questionText,
} from "./question";
import { board, boardPost } from "./board";
import { color } from "./color";
import { resMbti } from "./resMbti";
import { stats } from "./stats";
interface resData<D> {
  error: string | null;
  data: D;
}

export type {
  resData,
  question,
  testCardProps,
  userAnswer,
  MBTIData,
  userResponseProps,
  questionText,
  board,
  boardPost,
  color,
  resMbti,
  stats,
};
