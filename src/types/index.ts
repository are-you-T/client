import { Database } from "@/types/supabase";

export type MemoType = Database["public"]["Tables"]["Memo"]["Row"];
export type CommentType = Database["public"]["Tables"]["Comment"]["Row"];
export type QuestionType = Database["public"]["Tables"]["Question"]["Row"];
export type AnswerType = Database["public"]["Tables"]["Answer"]["Row"];
export type QuestionWithAnswersType = Database["public"]["Tables"]["Question"]["Row"] & {
  Answer: AnswerType[];
};
export type MbtiType = Database["public"]["Enums"]["Mbti_Type"];
export type MbtiDimensionType = Database["public"]["Enums"]["MBTIType"];

export type MBTIElementOption_Energy = Database["public"]["Enums"]["MBTIElementOption_Energy"];
export type MBTIElementOption_Awareness =
  Database["public"]["Enums"]["MBTIElementOption_Awareness"];
export type MBTIElementOption_Judgement =
  Database["public"]["Enums"]["MBTIElementOption_Judgement"];
export type MBTIElementOption_Life = Database["public"]["Enums"]["MBTIElementOption_Life"];

export type MBTIElementOption =
  | MBTIElementOption_Energy
  | MBTIElementOption_Awareness
  | MBTIElementOption_Judgement
  | MBTIElementOption_Life;

export type MBTIProportion = {
  type: string;
  rate: number;
};

export type MBTIProportions = {
  energy: MBTIProportion[];
  awareness: MBTIProportion[];
  judgement: MBTIProportion[];
  life: MBTIProportion[];
};
