import {
  question,
  question2,
  currentChoiceList,
  answer,
  MBTIData,
  userResponseProps,
} from "./question";
import { board, boardPost } from "./board";

interface resData<D> {
  error: string | null;
  data: D;
}

export type {
  resData,
  question,
  question2,
  currentChoiceList,
  answer,
  MBTIData,
  userResponseProps,
  board,
  boardPost,
};
