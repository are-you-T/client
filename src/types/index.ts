import { Database } from "@/types/supabase";

export type MemoType = Database["public"]["Tables"]["Memo"]["Row"];
export type CommentType = Database["public"]["Tables"]["Comment"]["Row"];
export type QuestionType = Database["public"]["Tables"]["Question"]["Row"];
export type AnswerType = Database["public"]["Tables"]["Answer"]["Row"];
export type QuestionWithAnswersType = Database["public"]["Tables"]["Question"]["Row"] & {
  Answer: AnswerType[];
};
export type MbtiType = Database["public"]["Enums"]["Mbti_Type"];
