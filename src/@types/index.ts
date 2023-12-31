import {
  Question,
  TestCardProps,
  UserAnswer,
  MBTIData,
  UserResponseProps,
  UpdatedUserResponseProps,
  QuestionText
} from "./Question";
import { Board, BoardPostData, BoardPassword, BoardPatchMsg } from "./Board";
import { Color } from "./Color";
import { ResMbti } from "./ResMbti";
import { StatsAll } from "./Stats";
import { ResultData } from "./ResultData";
import { Comment, CommentPostData, CommentEditProps } from "./Comment";
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
  UpdatedUserResponseProps,
  QuestionText,
  Board,
  BoardPostData,
  BoardPassword,
  BoardPatchMsg,
  Color,
  ResMbti,
  StatsAll,
  ResultData,
  Comment,
  CommentPostData,
  CommentEditProps
};
