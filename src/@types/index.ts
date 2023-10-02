import {
  Question,
  TestCardProps,
  UserAnswer,
  MBTIData,
  UserResponseProps,
  QuestionText,
} from "./Question";
import { Board, BoardPostData } from "./Board";
import { Color } from "./Color";
import { ResMbti } from "./ResMbti";
import { StatsAll } from "./Stats";
import { ResultData } from "./ResultData";
interface ResData<D> {
  error: string | null;
  data: D;
}

export type {
  ResData,
  Question,
  TestCardProps,
  UserAnswer,
  MBTIData,
  UserResponseProps,
  QuestionText,
  Board,
  BoardPostData,
  Color,
  ResMbti,
  StatsAll,
  ResultData,
};
